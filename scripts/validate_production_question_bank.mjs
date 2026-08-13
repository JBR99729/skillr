import fs from "node:fs";

const file = process.argv[2];
if (!file) throw new Error("Usage: node scripts/validate_production_question_bank.mjs <bank.json>");
const items = JSON.parse(fs.readFileSync(file, "utf8"));
if (!Array.isArray(items) || !items.length) throw new Error("Bank must be a non-empty JSON array");

const errors = [];
const ids = new Set();
const prompts = new Map();
const distributions = {};
const bankCounts = {};
const required = ["id", "subject", "year_level", "curriculum_code", "bank", "skill", "question", "audio_prompt", "visual", "answers", "correct_index", "explanation"];
const filler = /all of the above|none of the above|because magic|the result is magic|random answer|digit order never matters|longer numeral is always greater|why does everything happen|ignore all instructions|it must disappear/i;

for (const [index, item] of items.entries()) {
  const where = item.id || `item ${index + 1}`;
  for (const key of required) if (!(key in item)) errors.push(`${where}: missing ${key}`);
  if (ids.has(item.id)) errors.push(`${where}: duplicate id`);
  ids.add(item.id);
  const promptKey = [
    item.bank,
    String(item.question).toLowerCase().replace(/\s+/g, " ").trim(),
    String(item.visual?.alt_text || "").toLowerCase().replace(/\s+/g, " ").trim(),
    (item.answers || []).map((answer) => String(answer.text).toLowerCase()).sort().join("|")
  ].join("|");
  if (prompts.has(promptKey)) errors.push(`${where}: duplicate prompt with ${prompts.get(promptKey)}`);
  prompts.set(promptKey, where);
  if (!Array.isArray(item.answers) || item.answers.length !== 3) errors.push(`${where}: early-years item must have exactly 3 answers`);
  if (new Set((item.answers || []).map((answer) => String(answer.text).trim().toLowerCase())).size !== (item.answers || []).length) errors.push(`${where}: duplicate answer choices`);
  const correct = (item.answers || []).filter((answer) => answer.is_correct);
  if (correct.length !== 1) errors.push(`${where}: expected exactly one correct answer`);
  if (!Number.isInteger(item.correct_index) || item.correct_index < 0 || item.correct_index > 2) errors.push(`${where}: invalid correct_index`);
  if (item.answers?.[item.correct_index]?.is_correct !== true) errors.push(`${where}: correct_index does not match answers`);
  if ((item.answers || []).some((answer) => !String(answer.text).trim() || filler.test(answer.text))) errors.push(`${where}: empty or filler answer`);
  if (!item.explanation?.summary || !item.explanation?.hint) errors.push(`${where}: incomplete two-part explanation`);
  if (item.audio_prompt !== item.question) errors.push(`${where}: audio_prompt must match visible prompt for system TTS`);
  if (!item.visual || !["svg", "none"].includes(item.visual.type)) errors.push(`${where}: invalid visual type`);
  if (item.visual?.type === "svg" && (!item.visual.asset_path || !item.visual.alt_text)) errors.push(`${where}: SVG requires asset_path and alt_text`);
  const key = `${item.curriculum_code}|${item.bank}`;
  distributions[key] ||= [0, 0, 0];
  distributions[key][item.correct_index] += 1;
  bankCounts[item.curriculum_code] ||= { practice: 0, test: 0 };
  if (item.bank === "practice" || item.bank === "test") bankCounts[item.curriculum_code][item.bank] += 1;
}

for (const [key, counts] of Object.entries(distributions)) {
  if (Math.max(...counts) - Math.min(...counts) > 1) errors.push(`${key}: unbalanced correct positions ${counts.join("/")}`);
  if (counts.some((count) => count === 0)) errors.push(`${key}: one correct position is unused`);
}

for (const [code, counts] of Object.entries(bankCounts)) {
  if (counts.practice < 24) errors.push(`${code}: Practice bank has ${counts.practice}; minimum is 24`);
  if (counts.test < 16) errors.push(`${code}: Test bank has ${counts.test}; minimum is 16`);
}

const practice = items.filter((item) => item.bank === "practice");
const test = items.filter((item) => item.bank === "test");
const practiceKeys = new Set(practice.map((item) => `${item.question}|${item.answers.map((answer) => answer.text).join("|")}`));
for (const item of test) {
  const key = `${item.question}|${item.answers.map((answer) => answer.text).join("|")}`;
  if (practiceKeys.has(key)) errors.push(`${item.id}: verbatim Practice/Test duplicate`);
}

if (errors.length) {
  console.error(JSON.stringify({ file, items: items.length, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ file, items: items.length, unique_ids: ids.size, bank_counts: bankCounts, correct_index_distribution: distributions, status: "PASS" }, null, 2));
