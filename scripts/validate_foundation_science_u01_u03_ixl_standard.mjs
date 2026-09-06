import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9sfu01", "ac9sfu02", "ac9sfu03"];
const version = "20260906-foundation-science-ixl-u01-u03";

function load(file, key, extraFiles = []) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  for (const extraFile of extraFiles) {
    vm.runInContext(fs.readFileSync(extraFile, "utf8"), sandbox, { filename: extraFile });
  }
  return sandbox.window[key];
}

for (const code of codes) {
  const across = [];
  for (const bankName of ["practice", "test"]) {
    const key = bankName === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions";
    const file = path.join(root, "quiz/grade-k/science", code, bankName, "questions.js");
    const extraFiles = code === "ac9sfu02"
      ? [path.join(root, "assets/quiz-visuals/foundation-science/ac9sfu02-visual-overrides.js")]
      : [];
    const questions = load(file, key, extraFiles);
    assert.equal(questions.length, bankName === "practice" ? 24 : 16, `${code} ${bankName} count`);
    assert.equal(new Set(questions.map((q) => q.id)).size, questions.length, `${code} duplicate IDs`);
    assert.equal(new Set(questions.map((q) => q.question.toLowerCase())).size, questions.length, `${code} duplicate stems`);
    const positions = [0, 1, 2].map((index) => questions.filter((q) => q.correct === index).length);
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${code} ${bankName} answer imbalance: ${positions}`);
    for (const [index, question] of questions.entries()) {
      assert.equal(question.curriculumCode, code.toUpperCase());
      assert.equal(question.bank, bankName);
      assert.equal(question.sequencePriority, index + 1);
      assert.equal(question.qualitySchema, "foundation-science-ixl-standard-v1");
      assert.equal(question.answers.length, 3);
      assert.equal(new Set(question.answers).size, 3);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 3);
      assert.ok(question.explanation.length >= 35, `${question.id} weak explanation`);
      assert.equal(question.audioPrompt, question.question, `${question.id} audio prompt mismatch`);
      assert.equal(question.structuredExplanation?.summary, question.explanation, `${question.id} feedback mismatch`);
      assert.ok(question.structuredExplanation?.hint?.length >= 20, `${question.id} missing hint`);
      assert.ok(!/which response would correctly|this matches the task/i.test(question.question));
    }
    across.push(...questions.map((q) => q.question.toLowerCase()));

    const html = fs.readFileSync(path.join(root, "quiz/grade-k/science", code, bankName, "index.html"), "utf8");
    assert.match(html, new RegExp(`questions\\.js\\?v=${version}`));
    assert.match(html, /"shuffleQuestions":true/);
    assert.match(html, /"avoidSameCorrectPosition":true/);
    assert.match(html, /"questionCycle":true/);
    assert.match(html, new RegExp(`"maxQuestions":${bankName === "practice" ? 8 : 12}`));
  }
  assert.equal(new Set(across).size, 40, `${code} repeats a stem across Practice/Test`);
}

console.log("PASS: 120 original Foundation Science questions; balanced answers, 24/16 banks, clean explanations and rotating 8/12 attempts.");
