import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year2", "science");
const codes = ["AC9S2U01", "AC9S2U02", "AC9S2U03", "AC9S2H01", "AC9S2I01", "AC9S2I02", "AC9S2I03", "AC9S2I04", "AC9S2I05", "AC9S2I06"];
const problems = [];
const totals = { practice: 0, test: 0 };
const allIds = new Set();
const norm = (value) => String(value).toLowerCase().replace(/[“”'’".,:;!?—–-]/g, " ").replace(/\s+/g, " ").trim();

function syntaxCheck(file, label = path.relative(ROOT, file)) {
  try { execFileSync(process.execPath, ["--check", file], { stdio: "pipe" }); }
  catch { problems.push(`${label}: syntax check failed`); }
}

function validateProductionJson(code) {
  const file = path.join(BANK_ROOT, `${code.toLowerCase()}.json`);
  let items;
  try { items = JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { problems.push(`${code}: invalid JSON (${error.message})`); return; }
  const byBank = {
    practice: items.filter((item) => item.bank === "practice"),
    test: items.filter((item) => item.bank === "test")
  };
  // AC9S2U01 now has a hand-authored live override. Its historical production JSON
  // is retained for compatibility, so the live override is validated separately below.
  if (code !== "AC9S2U01") {
    if (byBank.practice.length !== 24) problems.push(`${code}: expected 24 Practice, found ${byBank.practice.length}`);
    if (byBank.test.length !== 16) problems.push(`${code}: expected 16 Test, found ${byBank.test.length}`);
  }
  for (const bank of ["practice", "test"]) {
    totals[bank] += byBank[bank].length;
    const localPrompts = new Set();
    for (const item of byBank[bank]) {
      const tag = `${code} ${item.id}`;
      if (item.curriculum_code !== code || item.subject !== "science" || item.year_level !== "Year 2") problems.push(`${tag}: identity fields mismatch`);
      if (!item.id || allIds.has(item.id)) problems.push(`${tag}: duplicate or missing ID`);
      allIds.add(item.id);
      const prompt = norm(item.question);
      if (!prompt || localPrompts.has(prompt)) problems.push(`${tag}: duplicate or missing prompt`);
      localPrompts.add(prompt);
      if (item.audio_prompt !== item.question) problems.push(`${tag}: audio_prompt does not match question`);
      if (!Array.isArray(item.answers) || item.answers.length < 3) problems.push(`${tag}: must have at least 3 answers`);
      const correct = item.answers?.filter((answer) => answer.is_correct) || [];
      if (!Number.isInteger(item.correct_index) || item.correct_index < 0 || item.correct_index >= (item.answers?.length || 0) || correct.length !== 1 || !item.answers?.[item.correct_index]?.is_correct) problems.push(`${tag}: incorrect answer key`);
      if (new Set((item.answers || []).map((answer) => norm(answer.text))).size !== (item.answers || []).length) problems.push(`${tag}: duplicate answer text`);
      if (!item.explanation?.summary || !item.explanation?.hint) problems.push(`${tag}: missing structured explanation`);
      if (/curriculum code|matches? (?:this|the) code|what does ac9s2/i.test(item.question)) problems.push(`${tag}: curriculum-definition prompt`);
    }
  }
  const practicePrompts = new Set(byBank.practice.map((item) => norm(item.question)));
  for (const item of byBank.test) if (practicePrompts.has(norm(item.question))) problems.push(`${code}: Practice/Test JSON prompt overlap at ${item.id}`);
}

function loadLiveBank(file, globalName) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: path.relative(ROOT, file) });
  return context.window[globalName];
}

function validateLiveOverride(code, bank, expectedCount, attemptCount) {
  const route = path.join(ROOT, "quiz", "year-2", "science", code.toLowerCase());
  const jsFile = path.join(route, bank, "questions.js");
  const htmlFile = path.join(route, bank, "index.html");
  syntaxCheck(jsFile, `${code} ${bank} questions.js`);
  let questions;
  try { questions = loadLiveBank(jsFile, bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions"); }
  catch (error) { problems.push(`${code} ${bank}: cannot evaluate live bank (${error.message})`); return []; }
  if (!Array.isArray(questions)) { problems.push(`${code} ${bank}: live bank is not an array`); return []; }
  if (questions.length !== expectedCount) problems.push(`${code} ${bank}: expected ${expectedCount} live questions, found ${questions.length}`);
  const ids = new Set(), prompts = new Set(), positions = Array(4).fill(0);
  for (const item of questions) {
    const tag = `${code} ${bank} ${item.id}`;
    if (item.curriculumCode !== code || item.bank !== bank) problems.push(`${tag}: live identity mismatch`);
    if (!item.id || ids.has(item.id)) problems.push(`${tag}: duplicate or missing live ID`);
    ids.add(item.id);
    const prompt = norm(item.question);
    if (!prompt || prompts.has(prompt)) problems.push(`${tag}: duplicate or missing live prompt`);
    prompts.add(prompt);
    if (item.audioPrompt !== item.question) problems.push(`${tag}: audio prompt mismatch`);
    if (!Array.isArray(item.answers) || item.answers.length !== 4) problems.push(`${tag}: expected 4 authored answer options`);
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= (item.answers?.length || 0)) problems.push(`${tag}: invalid correct index`);
    else positions[item.correct]++;
    if (!item.structuredExplanation?.summary || !item.structuredExplanation?.hint) problems.push(`${tag}: missing question-specific explanation or hint`);
    if (/Look for the observation, pattern or result that directly answers the question\.?$/i.test(item.structuredExplanation?.hint || "")) problems.push(`${tag}: generic legacy hint remains`);
  }
  if (Math.max(...positions) - Math.min(...positions) > 1) problems.push(`${code} ${bank}: unbalanced answer positions ${positions.join("/")}`);
  const html = fs.readFileSync(htmlFile, "utf8");
  if (!html.includes(`"maxQuestions":${attemptCount}`)) problems.push(`${code} ${bank}: expected maxQuestions ${attemptCount}`);
  if (!html.includes(`>${expectedCount}</span><span class="summary-label">Question bank`)) problems.push(`${code} ${bank}: displayed bank count is not ${expectedCount}`);
  if (!html.includes('"shuffleQuestions":true') || !html.includes('"questionCycle":true')) problems.push(`${code} ${bank}: rotation config mismatch`);
  return questions;
}

for (const code of codes) validateProductionJson(code);

const livePractice = validateLiveOverride("AC9S2U01", "practice", 49, 10);
const liveTest = validateLiveOverride("AC9S2U01", "test", 32, 15);
const livePracticePrompts = new Set(livePractice.map((item) => norm(item.question)));
for (const item of liveTest) if (livePracticePrompts.has(norm(item.question))) problems.push(`AC9S2U01: live Practice/Test prompt overlap at ${item.id}`);

// The remaining Year 2 Science routes continue to use the standard 24/16 banks and 8/12 attempts.
for (const code of codes.filter((value) => value !== "AC9S2U01")) {
  const route = path.join(ROOT, "quiz", "year-2", "science", code.toLowerCase());
  for (const [bank, attempt, count] of [["practice", 8, 24], ["test", 12, 16]]) {
    const html = fs.readFileSync(path.join(route, bank, "index.html"), "utf8");
    if (!html.includes(`"maxQuestions":${attempt}`) || !html.includes('"shuffleQuestions":true') || !html.includes('"questionCycle":true')) problems.push(`${code} ${bank}: attempt rotation config mismatch`);
    if (!html.includes(`>${count}</span><span class="summary-label">Question bank`)) problems.push(`${code} ${bank}: bank count presentation mismatch`);
    syntaxCheck(path.join(route, bank, "questions.js"), `${code} ${bank} questions.js`);
    if (bank === "practice") syntaxCheck(path.join(route, bank, "practice-questions.js"), `${code} practice practice-questions.js`);
  }
}

for (const script of ["scripts/build_year2_science_quality_banks.mjs", "scripts/publish_year2_science_quality_banks.mjs", "scripts/validate_year2_science_quality_banks.mjs"]) syntaxCheck(path.join(ROOT, script), script);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({
  status: "PASS",
  codes: `${codes.length}/${codes.length}`,
  legacyProductionJsonTotals: totals,
  AC9S2U01Live: { practice: livePractice.length, practiceAttempt: 10, test: liveTest.length, testAttempt: 15 },
  checks: ["schema", "syntax", "unique IDs", "unique prompts", "Practice/Test separation", "answer keys", "balanced correct positions", "audio prompts", "question-specific explanations", "rotation config"]
}, null, 2));
