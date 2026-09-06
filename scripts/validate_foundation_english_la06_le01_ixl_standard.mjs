import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9efla06", "ac9efla07", "ac9efla08", "ac9efla09", "ac9efle01"];
const visualCodes = new Set(["ac9efla07", "ac9efle01"]);
const version = "20260906-foundation-english-la06-le01-ixl-standard";

function loadQuestions(code, bankName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const file = path.join(root, "quiz/grade-k/english", code, bankName, "questions.js");
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window[bankName === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions"];
}

for (const code of codes) {
  let visualCount = 0;
  for (const bankName of ["practice", "test"]) {
    let bankVisualCount = 0;
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
      assert.ok(question.explanation.length >= 35, `${question.id} weak explanation`);
      assert.equal(question.structuredExplanation?.reasoning, question.explanation, `${question.id} feedback mismatch`);
      assert.equal(question.sequencePriority, index + 1, `${question.id} sequence`);
      assert.match(question.qualitySchema, new RegExp(version));
      assert.doesNotMatch(question.question, /\[Show the picture/i, `${question.id} placeholder visual text`);
      if (question.image) {
        visualCount++;
        bankVisualCount++;
        assert.ok(visualCodes.has(code), `${question.id} unexpected visual`);
        assert.ok(question.imageAlt?.length >= 35, `${question.id} weak image alt`);
        const asset = path.join(root, question.image.replace(/^\//, ""));
        assert.ok(fs.existsSync(asset), `${question.id} missing visual asset`);
        assert.match(fs.readFileSync(asset, "utf8"), /<svg[^>]+role="img"/, `${question.id} inaccessible SVG`);
      } else {
        for (const field of ["imageUrl", "visual", "diagram", "svg", "art"]) {
          assert.equal(Object.hasOwn(question, field), false, `${question.id} unwanted visual field ${field}`);
        }
      }
    }
    const htmlFile = path.join(root, "quiz/grade-k/english", code, bankName, "index.html");
    const html = fs.readFileSync(htmlFile, "utf8");
    assert.match(html, new RegExp(`questions\\.js\\?v=${version}`), `${code} ${bankName} cache version`);
    assert.match(html, /"shuffleQuestions":true/, `${code} ${bankName} shuffle`);
    assert.match(html, /"avoidSameCorrectPosition":true/, `${code} ${bankName} answer-position guard`);
    assert.match(html, /"questionCycle":true/, `${code} ${bankName} question cycle`);
    assert.match(html, new RegExp(`"maxQuestions":${bankName === "practice" ? 8 : 12}`), `${code} ${bankName} max questions`);
    if (visualCodes.has(code)) assert.ok(bankVisualCount >= 1, `${code} ${bankName} needs targeted visuals`);
  }
  if (visualCodes.has(code)) assert.ok(visualCount >= 2, `${code} needs targeted visuals`);
  else assert.equal(visualCount, 0, `${code} should be text-only`);
}

console.log("PASS: Foundation English AC9EFLA06-AC9EFLE01 hold 24/16 IXL-standard banks with targeted accessible visuals and rotating 8/12 attempts.");
