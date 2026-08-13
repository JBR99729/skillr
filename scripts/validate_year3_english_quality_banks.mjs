import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year3", "english");
const codes = [...Array.from({ length: 11 }, (_, i) => `AC9E3LA${String(i + 1).padStart(2, "0")}`), ...Array.from({ length: 5 }, (_, i) => `AC9E3LE${String(i + 1).padStart(2, "0")}`), ...Array.from({ length: 12 }, (_, i) => `AC9E3LY${String(i + 1).padStart(2, "0")}`)];
const problems = [], totals = { practice: 0, test: 0 }, allIds = new Set(), allPrompts = new Set();
const norm = (value) => String(value).toLowerCase().replace(/[“”'’".,:;!?—–-]/g, " ").replace(/\s+/g, " ").trim();
const spoken = (value) => norm(value).replace(/[^a-z0-9 ]/g, "").trim();
const qaBadge = /qa[ -]?(?:reviewed|complete|approved|passed)\s*(?:badge)?/i;
const rawPhoneme = /\/[a-z][^/\n]{0,10}\//i;
const blankMarker = /_{2,}|-{3,}/;
const slashPhrase = /\b[\p{L}\p{N}]+\s*\/\s*[\p{L}\p{N}]+\b/u;

for (const code of codes) {
  const file = path.join(BANK_ROOT, `${code.toLowerCase()}.json`);
  let items;
  try { items = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { problems.push(`${code}: invalid JSON (${error.message})`); continue; }
  const byBank = { practice: items.filter((x) => x.bank === "practice"), test: items.filter((x) => x.bank === "test") };
  if (byBank.practice.length !== 24) problems.push(`${code}: expected 24 Practice, found ${byBank.practice.length}`);
  if (byBank.test.length !== 16) problems.push(`${code}: expected 16 Test, found ${byBank.test.length}`);
  const localIds = new Set(), localPrompts = new Set();
  for (const bank of ["practice", "test"]) {
    totals[bank] += byBank[bank].length;
    const positions = [0, 0, 0];
    for (const item of byBank[bank]) {
      const tag = `${code} ${item.id}`;
      if (item.curriculum_code !== code || item.subject !== "english" || item.year_level !== "Year 3") problems.push(`${tag}: identity fields mismatch`);
      if (!item.id || localIds.has(item.id) || allIds.has(item.id)) problems.push(`${tag}: duplicate or missing ID`);
      localIds.add(item.id); allIds.add(item.id);
      const prompt = norm(item.question);
      if (!prompt || localPrompts.has(prompt) || allPrompts.has(prompt)) problems.push(`${tag}: duplicate or missing prompt`);
      localPrompts.add(prompt); allPrompts.add(prompt);
      if (item.audio_prompt !== item.question) problems.push(`${tag}: audio_prompt does not match visible question`);
      if (!Array.isArray(item.answers) || item.answers.length !== 3) problems.push(`${tag}: must have exactly 3 answers`);
      const correct = item.answers?.filter((a) => a.is_correct) || [];
      if (!Number.isInteger(item.correct_index) || item.correct_index < 0 || item.correct_index > 2 || correct.length !== 1 || !item.answers?.[item.correct_index]?.is_correct) problems.push(`${tag}: incorrect answer key`); else positions[item.correct_index]++;
      if (new Set((item.answers || []).map((a) => norm(a.text))).size !== 3) problems.push(`${tag}: duplicate answer text`);
      const speechOptions = (item.answers || []).map((a) => spoken(a.text));
      if (speechOptions.some((x) => !x) || new Set(speechOptions).size !== speechOptions.length || speechOptions.some((x) => /^[a-z]$/.test(x))) problems.push(`${tag}: answer choices are not reliably distinguishable in browser TTS`);
      const ttsText = [item.question, ...(item.answers || []).map((a) => a.text)].join(" ");
      if (rawPhoneme.test(ttsText) || blankMarker.test(ttsText) || slashPhrase.test(ttsText)) problems.push(`${tag}: browser-TTS risk marker`);
      if (!item.explanation?.summary || !item.explanation?.hint) problems.push(`${tag}: missing structured explanation`);
      if (/curriculum code|matches? (?:this|the) code|what does ac9e3/i.test(item.question)) problems.push(`${tag}: curriculum-definition prompt`);
      if (qaBadge.test(JSON.stringify(item))) problems.push(`${tag}: QA badge language present`);
      if (item.visual != null) {
        if (!item.visual.asset_path || !item.visual.alt_text || item.visual.alt_text.length < 30) problems.push(`${tag}: incomplete visual metadata`);
        const [asset, symbol] = String(item.visual.asset_path || "").split("#"), assetFile = path.join(ROOT, asset.replace(/^\//, ""));
        if (!fs.existsSync(assetFile)) problems.push(`${tag}: missing visual asset ${asset}`);
        else if (!symbol || !fs.readFileSync(assetFile, "utf8").includes(`id="${symbol}"`)) problems.push(`${tag}: missing SVG symbol ${symbol || "(none)"}`);
      }
    }
    if (Math.max(...positions) - Math.min(...positions) > 1) problems.push(`${code} ${bank}: unbalanced correct positions ${positions.join("/")}`);
  }
  const practicePrompts = new Set(byBank.practice.map((x) => norm(x.question)));
  for (const item of byBank.test) if (practicePrompts.has(norm(item.question))) problems.push(`${code}: Practice/Test prompt overlap at ${item.id}`);

  const route = path.join(ROOT, "quiz", "year-3", "english", code.toLowerCase());
  for (const [bank, attempt, count] of [["practice", 8, 24], ["test", 12, 16]]) {
    const htmlFile = path.join(route, bank, "index.html"), html = fs.readFileSync(htmlFile, "utf8");
    if (!html.includes(`"maxQuestions":${attempt}`) || !html.includes('"shuffleQuestions":true') || !html.includes('"questionCycle":true')) problems.push(`${code} ${bank}: attempt rotation config mismatch`);
    if (!html.includes(`>${count}</span><span class="summary-label">Question bank`)) problems.push(`${code} ${bank}: bank count presentation mismatch`);
    if (bank === "test" && (!html.includes('"certificateOnPass":true') || !html.includes('"requireStudentName":true'))) problems.push(`${code} test: certificate configuration not preserved`);
    if (bank === "practice" && html.includes('"certificateOnPass":true')) problems.push(`${code} practice: certificate unexpectedly enabled`);
    if (/\.\.\.|…/.test((html.match(/<h1[^>]*>(.*?)<\/h1>/) || [])[1] || "")) problems.push(`${code} ${bank}: truncated heading`);
    if (qaBadge.test(html)) problems.push(`${code} ${bank}: QA badge language present`);
    for (const script of [path.join(route, bank, "questions.js"), ...(bank === "practice" ? [path.join(route, bank, "practice-questions.js")] : [])]) {
      try { execFileSync(process.execPath, ["--check", script], { stdio: "pipe" }); } catch { problems.push(`${code} ${bank}: invalid generated JavaScript ${path.basename(script)}`); }
    }
  }
  for (const htmlFile of walkHtml(route)) {
    const html = fs.readFileSync(htmlFile, "utf8"), heading = (html.match(/<h1[^>]*>(.*?)<\/h1>/) || [])[1] || "";
    if (/\.\.\.|…/.test(heading)) problems.push(`${code}: truncated heading in ${path.relative(route, htmlFile)}`);
    if (qaBadge.test(html)) problems.push(`${code}: QA badge language in ${path.relative(route, htmlFile)}`);
  }
}

function walkHtml(root) {
  const out = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) out.push(...walkHtml(full)); else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

if (totals.practice !== 672 || totals.test !== 448) problems.push(`aggregate totals mismatch: ${totals.practice}/${totals.test}`);
for (const script of ["scripts/build_year3_english_quality_banks.mjs", "scripts/publish_year3_english_quality_banks.mjs", "scripts/validate_year3_english_quality_banks.mjs"]) {
  try { execFileSync(process.execPath, ["--check", path.join(ROOT, script)], { stdio: "pipe" }); } catch { problems.push(`${script}: syntax check failed`); }
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(JSON.stringify({ status: "PASS", codes: "28/28", totals, combined: 1120, checks: ["schema", "syntax", "unique IDs/prompts", "Practice/Test separation", "3 choices", "answer keys and A/B/C balance", "audio parity", "browser-TTS risk markers", "feedback", "visual assets/SVG/alt", "full headings", "QA badges absent", "8/12 behaviour", "certificate preservation"] }, null, 2));
