import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const bank = JSON.parse(read("assets/assessment-banks/year8/science/ac9s8u01.json"));
const practice = bank.filter((q) => q.bank === "practice");
const test = bank.filter((q) => q.bank === "test");

if (bank.length !== 40) errors.push(`Expected 40 questions, found ${bank.length}`);
if (practice.length !== 24) errors.push(`Expected 24 practice questions, found ${practice.length}`);
if (test.length !== 16) errors.push(`Expected 16 test questions, found ${test.length}`);
if (new Set(bank.map((q) => q.id)).size !== 40) errors.push("Question IDs are not unique");
if (new Set(bank.map((q) => q.question)).size !== 40) errors.push("Question stems are not unique");

for (const q of bank) {
  if (q.curriculum_code !== "AC9S8U01") errors.push(`${q.id}: wrong curriculum code`);
  if (!Array.isArray(q.answers) || q.answers.length !== 4) errors.push(`${q.id}: expected four answer options`);
  if ((q.answers || []).filter((a) => a.is_correct).length !== 1) errors.push(`${q.id}: expected exactly one correct answer`);
  if (/^During\s+(?:a|an|the)\b/i.test(q.question)) errors.push(`${q.id}: synthetic scenario wrapper remains`);
  if (/museum evidence|ethics committee|policy evidence hearing|community science meeting/i.test(q.question)) errors.push(`${q.id}: legacy artificial framing remains`);
}

function loadLive(file, key) {
  const box = { window: { quizConfig: {} } };
  vm.runInNewContext(read(file), box, { filename: file });
  return { questions: box.window[key], config: box.window.quizConfig };
}
const livePractice = loadLive("quiz/year-8/science/ac9s8u01/practice/questions.js", "skillrPracticeQuestions");
const liveTest = loadLive("quiz/year-8/science/ac9s8u01/test/questions.js", "skillrTestQuestions");
if (livePractice.questions?.length !== 24) errors.push("Live practice JS does not expose 24 questions");
if (liveTest.questions?.length !== 16) errors.push("Live test JS does not expose 16 questions");
if (liveTest.config.maxQuestions !== 8) errors.push("Live test JS must enforce an 8-question attempt");
for (const q of [...(livePractice.questions || []), ...(liveTest.questions || [])]) {
  if (!Array.isArray(q.answers) || q.answers.length !== 4) errors.push(`${q.id}: live bank does not have four options`);
  if (q.qualitySchema !== "production-v2") errors.push(`${q.id}: live question missing production-v2 schema`);
}

const practiceHtml = read("quiz/year-8/science/ac9s8u01/practice/index.html");
const testHtml = read("quiz/year-8/science/ac9s8u01/test/index.html");
if (!practiceHtml.includes('"maxQuestions":8')) errors.push("Practice HTML maxQuestions is not 8");
if (!testHtml.includes('"maxQuestions":8')) errors.push("Test HTML maxQuestions is not 8");
if (!practiceHtml.includes("20260820-production-v2")) errors.push("Practice page does not load v2 bank");
if (!testHtml.includes("20260820-production-v2")) errors.push("Test page does not load v2 bank");
if (!testHtml.includes("an 8-question")) errors.push("Test page metadata does not describe the 8-question attempt");

const publisher = read("scripts/publish_year8_science_quality_banks.mjs");
if (!publisher.includes('code === "AC9S8U01" ? 8 : 12')) errors.push("Publisher does not preserve the AC9S8U01 8-question test rotation");
if (!publisher.includes('code === "AC9S8U01" ? "20260820-production-v2"')) errors.push("Publisher does not preserve the AC9S8U01 v2 cache key");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("PASS: AC9S8U01 v2 — 24 Practice + 16 Test, four-option authored MCQs, no synthetic wrappers, and 8-question non-repeating cycles (3 Practice attempts / 2 Test attempts). ");
