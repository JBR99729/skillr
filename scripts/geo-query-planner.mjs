#!/usr/bin/env node
/**
 * SkillrHub GEO keyword inventory and citation-opportunity planner.
 *
 * Inputs: Google Search Console/Bing Webmaster CSV or JSON export(s), optionally
 * Bing AI Performance query/citation CSV or JSON. This script never publishes
 * pages, changes metadata or sends query data to an external service.
 *
 * Example:
 *   node scripts/geo-query-planner.mjs \
 *     --google ../private/gsc-six-months.csv \
 *     --bing ../private/bing-six-months.csv \
 *     --ai ../private/bing-ai-six-months.csv
 *
 * Use the full six-month exports where available. Without input files, the
 * dated 2026-09-20..10-17 sample in the repo is used as a LIMITED demonstration.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const inputs = { google: [], bing: [], ai: [] };
let destination = ".geo-local/query-opportunity-audit.json";
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (["--google", "--bing", "--ai"].includes(arg)) {
    if (!args[i + 1]) throw Error("Missing file for " + arg);
    inputs[arg.slice(2)].push(args[++i]);
  } else if (arg === "--out") {
    if (!args[i + 1]) throw Error("Missing output path");
    destination = args[++i];
  } else if (arg === "--help") {
    console.log("Usage: node scripts/geo-query-planner.mjs [--google FILE] [--bing FILE] [--ai FILE] [--out FILE]");
    process.exit(0);
  } else throw Error("Unknown option: " + arg);
}
const isDemo = Object.values(inputs).every(v => v.length === 0);
if (isDemo) {
  inputs.google.push("docs/qa/seo-study-2026-10-19/australia-query_pages.json");
  inputs.ai.push("data/geo-bing-theme-evidence-20260928.json");
}
const cleanKey = value => String(value || "").toLowerCase().replace(/[\s_.-]+/g, "");
const asNumber = value => {
  const n = Number(String(value ?? "0").trim().replace(/,/g, "").replace(/%$/, ""));
  return Number.isFinite(n) ? n : 0;
};
function csvParse(source) {
  const rows = []; let row = []; let field = ""; let quoted = false;
  source = source.replace(/^\uFEFF/, "");
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted && ch === '"' && source[i + 1] === '"') { field += '"'; i++; }
    else if (ch === '"') quoted = !quoted;
    else if (!quoted && ch === ",") { row.push(field); field = ""; }
    else if (!quoted && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && source[i + 1] === "\n") i++;
      row.push(field); if (row.some(v => v.trim())) rows.push(row);
      row = []; field = "";
    } else field += ch;
  }
  row.push(field); if (row.some(v => v.trim())) rows.push(row);
  if (rows.length < 2) return [];
  // Search Console CSV exports may prepend labels/blank rows; find actual header.
  const idx = rows.findIndex(r => r.some(x => ["query", "topqueries", "keyword", "keywords", "groundingquery", "searchterm", "querytheme"].includes(cleanKey(x))));
  if (idx < 0) throw Error("CSV has no query/keyword header");
  const headers = rows[idx].map(cleanKey);
  return rows.slice(idx + 1).filter(r => r.some(v => v.trim())).map(r =>
    Object.fromEntries(headers.map((h, j) => [h, r[j] ?? ""])));
}
function value(obj, ...names) {
  const keys = Object.keys(obj);
  for (const name of names) {
    const k = keys.find(key => cleanKey(key) === cleanKey(name));
    if (k !== undefined && obj[k] !== "") return obj[k];
  }
  return "";
}
function parseFile(name, source) {
  const full = path.isAbsolute(name) ? name : path.join(root, name);
  const raw = fs.readFileSync(full, "utf8");
  const parsed = name.toLowerCase().endsWith(".json") ? JSON.parse(raw) : csvParse(raw);
  if (Array.isArray(parsed)) return { rows: parsed, period: "unspecified" };
  if (Array.isArray(parsed.rows)) return { rows: parsed.rows, period: [parsed.start, parsed.end].filter(Boolean).join(" to ") || "unspecified", country: parsed.country || "" };
  if (Array.isArray(parsed.themes)) return { rows: parsed.themes, period: parsed.source_period || "unspecified", themes: true };
  throw Error("Unsupported file layout: " + name);
}
function canonicalPage(page) {
  if (!page) return "";
  try {
    const u = new URL(String(page), "https://skillrhub.com");
    if (!["skillrhub.com", "www.skillrhub.com", "app.skillrhub.com"].includes(u.hostname)) return "";
    return u.origin + u.pathname.replace(/\/+/g, "/");
  } catch { return ""; }
}
function classifyQuery(query, source, isTheme) {
  const s = query.toLowerCase().trim();
  const diagnostic = !isTheme && (
    /(?:^|\s)(?:site:|inurl:|intitle:|filetype:|cache:|related:|allinurl:|allintitle:)/.test(s) ||
    /^["'+%]/.test(s) ||
    /^ac9[a-z0-9]+$/.test(s)
  );
  const intent = /\b(?:alternative|alternatives|vs|versus|compare|comparison|like ixl|like khan|like twinkl)\b/.test(s) ? "comparison"
    : /homeschool|home school|home learning/.test(s) ? "homeschool"
    : /worksheet|printable|pdf|workbook/.test(s) ? "worksheet"
    : /lesson|teach|teaching|slide|explain/.test(s) ? "teaching"
    : /assessment|test|exam|quiz/.test(s) ? "assessment"
    : /practice|practise|question|activity|exercise/.test(s) ? "practice"
    : /curriculum|acara|syllabus|content code/.test(s) ? "curriculum"
    : "topic";
  const years = [...s.matchAll(/\b(?:year|grade|yr)\s*([1-9]|10)\b/g)].map(m => Number(m[1]));
  const year = years.length ? years[0] : /\bfoundation\b|\bkindergarten\b/.test(s) ? 0 : null;
  const subject = /\bmaths?\b|multiplication|percent|fraction|decimal|time|coordinates|addition|subtract|odd and even|pattern/.test(s) ? "Maths"
    : /\benglish\b|literacy|reading|grammar|spelling|phonics/.test(s) ? "English"
    : /\bscience\b|scientific|experiment/.test(s) ? "Science" : "";
  return { diagnostic, intent, year, subject, branded: /skillrhub|skillr hub|skillr-app/.test(s) };
}
const records = []; const errors = []; const sources = [];
for (const [source, files] of Object.entries(inputs)) {
  for (const name of files) {
    try {
      const parsed = parseFile(name, source);
      sources.push({ source, filename: path.basename(name), period: parsed.period, rows: parsed.rows.length, exactQueries: !parsed.themes });
      for (const row of parsed.rows) {
        const isTheme = Boolean(parsed.themes) || source === "ai"; // AI grounding phrases are NOT exact user prompts.
        const query = String(value(row, "query", "top_queries", "keyword", "keywords", "search_term", "grounding_query", "query_theme", "theme")).trim();
        if (!query) continue;
        const page = canonicalPage(value(row, "page", "url", "landing_page", "landingpage", "page_url"));
        const country = String(value(row, "country", "country_name", "countryname") || parsed.country || "").trim();
        const impressions = asNumber(value(row, "impressions", "impression"));
        const clicks = asNumber(value(row, "clicks", "click"));
        const citations = asNumber(value(row, "citations", "cited", "citationcount"));
        const position = asNumber(value(row, "position", "averageposition", "avgposition"));
        const tags = classifyQuery(query, source, isTheme);
        records.push({
          source, query, exact_query: !isTheme,
          page, country, impressions, clicks, position: position || null,
          citations, citation_share_pct: asNumber(value(row, "citation_share_pct", "citationshare")),
          codes: Array.isArray(row.codes) ? row.codes : [],
          ...tags
        });
      }
    } catch (e) { errors.push({ source, file: name, error: String(e.message || e) }); }
  }
}
if (errors.length) { console.error(JSON.stringify(errors, null, 2)); process.exit(1); }
const merged = new Map();
for (const rec of records) {
  const key = [rec.source, rec.exact_query, rec.query.toLowerCase().replace(/\s+/g, " "), rec.page, rec.country].join("\u0000");
  const old = merged.get(key);
  if (!old) { merged.set(key, { ...rec }); continue; }
  const total = old.impressions + rec.impressions;
  old.position = total ? ((old.position || 0) * old.impressions + (rec.position || 0) * rec.impressions) / total : old.position;
  old.impressions = total;
  old.clicks += rec.clicks;
  old.citations += rec.citations;
  old.citation_share_pct = Math.max(old.citation_share_pct, rec.citation_share_pct);
}
const items = [...merged.values()].map(x => {
  // Heuristic opportunity score; NOT a search-volume estimate or predicted ranking.
  const rankOpportunity = x.position && x.position >= 5 && x.position <= 40 ? 1.5 : 1;
  const score = (Math.log1p(x.impressions) * 3 + Math.log1p(x.clicks) * 5 + Math.log1p(x.citations) * 7)
    * rankOpportunity * (x.diagnostic ? 0.08 : 1);
  return { ...x, opportunity_score: Math.round(score * 100) / 100,
    review_status: x.diagnostic ? "diagnostic-like: manual review before excluding from demand KPI" : x.exact_query ? "verify page and answer fit" : "Bing AI grouped grounding phrase, not exact user prompt" };
}).sort((a, b) => b.opportunity_score - a.opportunity_score || a.query.localeCompare(b.query));
const output = {
  generated_at: new Date().toISOString(),
  mode: isDemo ? "LIMITED HISTORICAL SAMPLE: replace with six-month exports" : "SUPPLIED EXPORTS",
  scope: "Search-query evidence inventory for GEO and organic-search editorial review; never auto-publishes or stuffs page text",
  sources,
  summary: {
    retained_query_page_rows: items.length,
    exact_query_rows: items.filter(x => x.exact_query).length,
    theme_only_rows: items.filter(x => !x.exact_query).length,
    diagnostic_rows: items.filter(x => x.diagnostic).length,
    unique_exact_queries: new Set(items.filter(x => x.exact_query).map(x => x.query.toLowerCase())).size,
    page_specific_rows: items.filter(x => x.page).length,
    australia_rows: items.filter(x => /^(australia|au)$/i.test(x.country)).length
  },
  queue: items
};
const outputPath = path.isAbsolute(destination) ? destination : path.join(root, destination);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ output: outputPath, mode: output.mode, summary: output.summary, sources }, null, 2));
