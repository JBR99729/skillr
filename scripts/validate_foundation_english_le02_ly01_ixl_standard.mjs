import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9efle02", "ac9efle03", "ac9efle04", "ac9efle05", "ac9efly01"];
const visualCodes = new Set(["ac9efle03", "ac9efle05", "ac9efly01"]);
const version = "20260906-foundation-english-le02-ly01-ixl-standard";

function load(code, bank) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const file = path.join(root, "quiz/grade-k/english", code, bank, "questions.js");
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window[bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions"];
}

for (const code of codes) {
  let visuals = 0;
  for (const bank of ["practice", "test"]) {
    const questions = load(code, bank);
    assert.equal(questions.length, bank === "practice" ? 24 : 16, `${code} ${bank} count`);
    assert.equal(new Set(questions.map((q) => q.id)).size, questions.length, `${code} duplicate IDs`);
    assert.equal(new Set(questions.map((q) => q.question.toLowerCase())).size, questions.length, `${code} duplicate stems`);
    const positions = [0, 1, 2].map((i) => questions.filter((q) => q.correct === i).length);
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${code} ${bank} answer imbalance ${positions}`);

    for (const [index, question] of questions.entries()) {
      assert.equal(question.curriculumCode, code.toUpperCase());
      assert.equal(question.bank, bank);
      assert.equal(question.sourceType, "Multiple choice");
      assert.equal(question.type, "single");
      assert.equal(question.answers.length, 3, `${question.id} answer count`);
      assert.equal(new Set(question.answers).size, 3, `${question.id} duplicate answers`);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 3, `${question.id} correct range`);
      assert.ok(question.explanation.length >= 38, `${question.id} weak explanation`);
      assert.equal(question.structuredExplanation?.reasoning, question.explanation, `${question.id} feedback mismatch`);
      assert.equal(question.sequencePriority, index + 1, `${question.id} sequence`);
      assert.match(question.qualitySchema, new RegExp(version));
      assert.doesNotMatch(JSON.stringify(question), /\[Show the picture/i, `${question.id} placeholder visual text`);
      if (question.image) {
        visuals++;
        assert.ok(visualCodes.has(code), `${question.id} unexpected visual`);
        assert.ok(question.imageAlt?.length >= 38, `${question.id} weak image alt`);
        const asset = path.join(root, question.image.replace(/^\//, ""));
        assert.ok(fs.existsSync(asset), `${question.id} missing visual asset`);
        assert.match(fs.readFileSync(asset, "utf8"), /<svg[^>]+role="img"/, `${question.id} inaccessible SVG`);
      } else {
        for (const field of ["imageUrl", "visual", "diagram", "svg", "art"]) {
          assert.equal(Object.hasOwn(question, field), false, `${question.id} unwanted visual field ${field}`);
        }
      }
    }

    const html = fs.readFileSync(path.join(root, "quiz/grade-k/english", code, bank, "index.html"), "utf8");
    assert.match(html, new RegExp(`questions\\.js\\?v=${version}`));
    assert.match(html, /"shuffleQuestions":true/);
    assert.match(html, /"avoidSameCorrectPosition":true/);
    assert.match(html, /"questionCycle":true/);
    assert.match(html, new RegExp(`"maxQuestions":${bank === "practice" ? 8 : 12}`));
  }
  if (visualCodes.has(code)) assert.ok(visuals >= 2, `${code} needs targeted visuals`);
  else assert.equal(visuals, 0, `${code} should be text-only`);
}

console.log("PASS: Foundation English AC9EFLE02-AC9EFLY01 hold 24/16 IXL-standard banks with targeted visuals and rotating 8/12 attempts.");
