import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data", "curriculum-units.json"), "utf8"));
const byCode = new Map(manifest.units.map((unit) => [unit.code.toUpperCase(), unit]));
const roots = ["foundation", ...Array.from({ length: 10 }, (_, index) => `year${index + 1}`)];

const strip = (value) => String(value || "")
  .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&ndash;/g, "–")
  .replace(/&mdash;/g, "—")
  .replace(/\s+/g, " ")
  .trim();

const esc = (value) => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const concise = (value, limit) => {
  const clean = String(value || "").replace(/\s+/g, " ").trim().replace(/[ .]+$/, "");
  if (clean.length <= limit) return clean;
  return `${clean.slice(0, limit + 1).replace(/\s+\S*$/, "").replace(/[ ,;:]+$/, "")}…`;
};

const first = (source, patterns) => {
  for (const pattern of patterns) {
    const value = strip(source.match(pattern)?.[1] || "");
    if (value) return value;
  }
  return "";
};

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name === "index.html" && /[\\/]teacher-slides[\\/]index\.html$/i.test(full)) files.push(full);
  }
  return files;
};

const topicCopy = (unit, classroomFile, classroomHtml) => {
  const hubFile = path.join(root, unit.yearFolder, "curriculum", unit.subjectSlug, "index.html");
  const hub = fs.existsSync(hubFile) ? fs.readFileSync(hubFile, "utf8") : "";
  const hubCards = hub.match(/<article\b[^>]*class="[^"]*curriculum-unit-card[^"]*"[^>]*>[\s\S]*?<\/article>/gi) || [];
  const hubCard = hubCards.find((card) => new RegExp(`>${unit.code}<`, "i").test(card)) || "";
  const hubTitle = first(hubCard, [/<h3\b[^>]*>([\s\S]*?)<\/h3>/i]);
  const hubSummary = first(hubCard, [/<p\b[^>]*class="[^"]*skill-summary[^"]*"[^>]*>([\s\S]*?)<\/p>/i]);
  if (hubTitle && hubSummary) return { title: hubTitle, summary: concise(hubSummary, 220) };

  const topicFile = path.join(path.dirname(path.dirname(classroomFile)), "index.html");
  const source = fs.existsSync(topicFile) ? fs.readFileSync(topicFile, "utf8") : "";
  let title = first(source, [/<h1\b[^>]*>([\s\S]*?)<\/h1>/i])
    || first(classroomHtml, [/<p\b[^>]*class="[^"]*display-topic-title[^"]*"[^>]*>([\s\S]*?)<\/p>/i])
    || unit.title
    || unit.description;
  title = title
    .replace(new RegExp(`^${unit.code}\\s*[:—–-]?\\s*`, "i"), "")
    .replace(new RegExp(`\\s*[—–-]\\s*${unit.code}$`, "i"), "");
  const summary = first(source, [
    /<p\b[^>]*class="[^"]*curriculum-hero__lead[^"]*"[^>]*>([\s\S]*?)<\/p>/i,
    /<details\b[^>]*(?:id="learn"|open)[^>]*>[\s\S]*?<div\b[^>]*class="[^"]*curriculum-detail-body[^"]*"[^>]*>\s*<p\b[^>]*>([\s\S]*?)<\/p>/i,
  ]) || unit.description;
  return { title, summary: concise(summary, 220) };
};

const ensureStylesheet = (html) => {
  if (html.includes('/assets/css/classroom-view.css')) return html;
  const link = '<link rel="stylesheet" href="/assets/css/classroom-view.css">';
  const lastStyle = html.lastIndexOf("</style>");
  if (lastStyle >= 0) return `${html.slice(0, lastStyle + 8)}\n${link}${html.slice(lastStyle + 8)}`;
  return html.replace(/<\/head>/i, `${link}\n</head>`);
};

const addBodyClass = (html) => html.replace(/<body(?:\s+class="([^"]*)")?\s*>/i, (_match, classes = "") => {
  const tokens = new Set(classes.split(/\s+/).filter(Boolean));
  tokens.add("classroom-view-v2");
  return `<body class="${[...tokens].join(" ")}">`;
});

let changed = 0;
let canonical = 0;
let compatibility = 0;
const missingCodes = [];

for (const file of roots.flatMap((folder) => walk(path.join(root, folder)))) {
  const before = fs.readFileSync(file, "utf8");
  const code = (before.match(/\bAC9[A-Z0-9]+\b/i)?.[0] || "").toUpperCase();
  const unit = byCode.get(code);
  let html = ensureStylesheet(addBodyClass(before));

  if (unit) {
    const copy = topicCopy(unit, file, before);
    const mappingId = html.match(/id=["'](curriculum-mapping|curriculum-equivalents)["']/i)?.[1] || "";
    const mappingLink = mappingId ? `<a href="#${mappingId}">Curriculum mapping</a>` : "";
    const nav = `<nav class="display-nav" aria-label="Classroom View navigation"><a href="../">← Topic guide</a><div class="display-nav-group">${mappingLink}<a href="${esc(unit.practiceUrl)}">Practice</a><a class="primary" href="${esc(unit.testUrl)}">Quick check</a></div></nav>`;
    const header = `<header class="display-header"><div><p class="display-eyebrow">${esc(unit.levelLabel)} ${esc(unit.learningArea)} · ${esc(unit.code)}</p><h1 id="page-title">${esc(copy.title)}</h1><p class="display-subtitle">${esc(copy.summary)}</p><!-- Teacher Display Page --></div><p class="display-mode">Ready to project and teach</p></header>`;
    html = html
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(unit.code)} Classroom View | SkillrHub</title>`)
      .replace(/<nav\b[^>]*class="[^"]*display-nav[^"]*"[\s\S]*?<\/nav>/i, nav)
      .replace(/<header\b[^>]*class="[^"]*display-header[^"]*"[\s\S]*?<\/header>/i, header);
    canonical++;
  } else {
    compatibility++;
    if (!code) missingCodes.push(path.relative(root, file));
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed++;
  }
}

console.log(JSON.stringify({ changed, canonical, compatibility, missingCodes }, null, 2));
