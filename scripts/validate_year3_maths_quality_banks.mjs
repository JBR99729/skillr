import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year3", "math");
const codes = ["AC9M3A01", "AC9M3A02", "AC9M3A03", "AC9M3M01", "AC9M3M02", "AC9M3M03", "AC9M3M04", "AC9M3M05", "AC9M3M06", "AC9M3N01", "AC9M3N02", "AC9M3N03", "AC9M3N04", "AC9M3N05", "AC9M3N06", "AC9M3N07", "AC9M3P01", "AC9M3P02", "AC9M3SP01", "AC9M3SP02", "AC9M3ST01", "AC9M3ST02", "AC9M3ST03"];
const problems = [];
const totals = { practice: 0, test: 0 };
const allIds = new Set();
const allPrompts = new Set();
const norm = (value) => String(value).toLowerCase().replace(/[“”'’".,:;!?—–-]/g, " ").replace(/\s+/g, " ").trim();

for (const code of codes) {
  const file = path.join(BANK_ROOT, `${code.toLowerCase()}.json`);
  let items;
  try { items = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { problems.push(`${code}: invalid JSON (${error.message})`); continue; }
  const byBank = { practice: items.filter((item) => item.bank === "practice"), test: items.filter((item) => item.bank === "test") };
  if (byBank.practice.length !== 24) problems.push(`${code}: expected 24 Practice, found ${byBank.practice.length}`);
  if (byBank.test.length !== 16) problems.push(`${code}: expected 16 Test, found ${byBank.test.length}`);
  const localIds = new Set(), localPrompts = new Set();
  for (const bank of ["practice", "test"]) {
    totals[bank] += byBank[bank].length;
    const positions = [0, 0, 0];
    for (const item of byBank[bank]) {
      const tag = `${code} ${item.id}`;
      if (item.curriculum_code !== code || item.subject !== "math" || item.year_level !== "Year 3") problems.push(`${tag}: identity fields mismatch`);
      if (!item.id || localIds.has(item.id) || allIds.has(item.id)) problems.push(`${tag}: duplicate or missing ID`);
      localIds.add(item.id); allIds.add(item.id);
      const prompt = norm(item.question);
      if (!prompt || localPrompts.has(prompt) || allPrompts.has(prompt)) problems.push(`${tag}: duplicate or missing prompt`);
      localPrompts.add(prompt); allPrompts.add(prompt);
      if (item.audio_prompt !== item.question) problems.push(`${tag}: audio_prompt does not match question`);
      if (!Array.isArray(item.answers) || item.answers.length !== 3) problems.push(`${tag}: must have exactly 3 answers`);
      const correct = item.answers?.filter((answer) => answer.is_correct) || [];
      if (!Number.isInteger(item.correct_index) || item.correct_index < 0 || item.correct_index > 2 || correct.length !== 1 || !item.answers?.[item.correct_index]?.is_correct) problems.push(`${tag}: incorrect answer key`);
      else positions[item.correct_index]++;
      if (new Set((item.answers || []).map((answer) => norm(answer.text))).size !== 3) problems.push(`${tag}: duplicate answer text`);
      if (!item.explanation?.summary || !item.explanation?.hint) problems.push(`${tag}: missing structured explanation`);
      if (/curriculum code|matches? (?:this|the) code|what does ac9m3/i.test(item.question)) problems.push(`${tag}: curriculum-definition prompt`);
      if (!item.visual?.asset_path || !item.visual?.alt_text || item.visual.alt_text.length < 30) problems.push(`${tag}: incomplete visual metadata`);
      const [asset, symbol] = String(item.visual?.asset_path || "").split("#");
      const assetFile = path.join(ROOT, asset.replace(/^\//, ""));
      if (!fs.existsSync(assetFile)) problems.push(`${tag}: missing visual asset ${asset}`);
      else if (!symbol || !fs.readFileSync(assetFile, "utf8").includes(`id="${symbol}"`)) problems.push(`${tag}: missing SVG symbol ${symbol || "(none)"}`);
    }
    const spread = Math.max(...positions) - Math.min(...positions);
    if (spread > 1) problems.push(`${code} ${bank}: unbalanced correct positions ${positions.join("/")}`);
  }
  const practicePrompts = new Set(byBank.practice.map((item) => norm(item.question)));
  for (const item of byBank.test) if (practicePrompts.has(norm(item.question))) problems.push(`${code}: Practice/Test prompt overlap at ${item.id}`);
  const route = path.join(ROOT, "quiz", "year-3", "math", code.toLowerCase());
  for (const [bank, attempt, count] of [["practice", 8, 24], ["test", 12, 16]]) {
    const html = fs.readFileSync(path.join(route, bank, "index.html"), "utf8");
    if (!html.includes(`"maxQuestions":${attempt}`) || !html.includes('"shuffleQuestions":true') || !html.includes('"questionCycle":true')) problems.push(`${code} ${bank}: attempt rotation config mismatch`);
    if (!html.includes(`>${count}</span><span class="summary-label">Question bank`)) problems.push(`${code} ${bank}: bank count presentation mismatch`);
    if (/\.\.\.|…/.test((html.match(/<h1[^>]*>(.*?)<\/h1>/) || [])[1] || "")) problems.push(`${code} ${bank}: truncated heading`);
    for (const script of [path.join(route, bank, "questions.js"), ...(bank === "practice" ? [path.join(route, bank, "practice-questions.js")] : [])]) {
      try { execFileSync(process.execPath, ["--check", script], { stdio: "pipe" }); } catch { problems.push(`${code} ${bank}: invalid generated JavaScript ${path.basename(script)}`); }
    }
  }
}

for (const script of ["scripts/build_year3_maths_quality_banks.mjs", "scripts/publish_year3_maths_quality_banks.mjs", "scripts/validate_year3_maths_quality_banks.mjs"]) {
  try { execFileSync(process.execPath, ["--check", path.join(ROOT, script)], { stdio: "pipe" }); } catch { problems.push(`${script}: syntax check failed`); }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({ status: "PASS", codes: `${codes.length}/${codes.length}`, totals, combined: totals.practice + totals.test, checks: ["schema", "syntax", "unique IDs", "unique prompts", "Practice/Test separation", "3 options", "answer keys", "balanced correct positions", "visual paths", "SVG symbols", "alt text", "audio prompts", "full headings", "8/12 rotation"] }, null, 2));
