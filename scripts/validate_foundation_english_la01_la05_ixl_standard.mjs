import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9efla01", "ac9efla02", "ac9efla03", "ac9efla04", "ac9efla05"];
const version = "20260906-foundation-english-la01-la05-ixl-standard";

function loadQuestions(code, bankName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const file = path.join(root, "quiz/grade-k/english", code, bankName, "questions.js");
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window[bankName === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions"];
}

for (const code of codes) {
  for (const bankName of ["practice", "test"]) {
    const questions = loadQuestions(code, bankName);
    assert.equal(questions.length, bankName === "practice" ? 24 : 16, `${code} ${bankName} count`);
    assert.equal(new Set(questions.map((q) => q.id)).size, questions.length, `${code} ${bankName} duplicate IDs`);
    assert.equal(new Set(questions.map((q) => q.question.toLowerCase())).size, questions.length, `${code} ${bankName} duplicate stems`);

    const positions = [0, 1, 2].map((index) => questions.filter((q) => q.correct === index).length);
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${code} ${bankName} answer imbalance: ${positions}`);

    for (const [index, question] of questions.entries()) {
      assert.equal(question.curriculumCode, code.toUpperCase());
      assert.equal(question.bank, bankName);
      assert.equal(question.type, "single");
      assert.equal(question.answers.length, 3, `${question.id} answer count`);
      assert.equal(new Set(question.answers).size, 3, `${question.id} duplicate answers`);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 3, `${question.id} correct range`);
      assert.ok(question.explanation.length >= 30, `${question.id} weak explanation`);
      assert.equal(question.sequencePriority, index + 1, `${question.id} sequence`);
      assert.match(question.qualitySchema, new RegExp(version));
      for (const field of ["image", "imageUrl", "visual", "diagram", "svg", "art"]) {
        assert.equal(Object.hasOwn(question, field), false, `${question.id} has unwanted visual field ${field}`);
      }
      assert.doesNotMatch(JSON.stringify(question), /<svg/i, `${question.id} has inline SVG markup`);
    }

    const htmlFile = path.join(root, "quiz/grade-k/english", code, bankName, "index.html");
    const html = fs.readFileSync(htmlFile, "utf8");
    assert.match(html, new RegExp(`questions\\.js\\?v=${version}`), `${code} ${bankName} cache version`);
    assert.match(html, /"shuffleQuestions":true/, `${code} ${bankName} shuffle`);
    assert.match(html, /"avoidSameCorrectPosition":true/, `${code} ${bankName} answer-position guard`);
    assert.match(html, /"questionCycle":true/, `${code} ${bankName} question cycle`);
    assert.match(html, new RegExp(`"maxQuestions":${bankName === "practice" ? 8 : 12}`), `${code} ${bankName} max questions`);
  }
}

console.log("PASS: Foundation English AC9EFLA01-05 hold 24/16 text-only IXL-standard banks with rotating 8/12 attempts.");
