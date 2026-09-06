import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9efly07", "ac9efly08", "ac9efly09", "ac9efly10", "ac9efly11"];
const visualCodes = new Set(codes);
const version = "20260906-foundation-english-ly07-ly11-ixl-standard";

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
    assert.equal(new Set(questions.map((q) => q.id)).size, questions.length, `${code} ${bank} duplicate IDs`);
    assert.equal(new Set(questions.map((q) => q.question.toLowerCase())).size, questions.length, `${code} ${bank} duplicate stems`);

    const positions = [0, 1, 2].map((i) => questions.filter((q) => q.correct === i).length);
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${code} ${bank} answer imbalance ${positions}`);

    for (const [index, question] of questions.entries()) {
      assert.equal(question.curriculumCode, code.toUpperCase(), `${question.id} curriculum code`);
      assert.equal(question.bank, bank, `${question.id} bank`);
      assert.equal(question.sourceType, "Multiple choice", `${question.id} source type`);
      assert.equal(question.type, "single", `${question.id} type`);
      assert.equal(question.answers.length, 3, `${question.id} answer count`);
      assert.equal(new Set(question.answers).size, 3, `${question.id} duplicate answers`);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 3, `${question.id} correct range`);
      assert.ok(question.explanation.length >= 38, `${question.id} weak explanation`);
      assert.equal(question.structuredExplanation?.reasoning, question.explanation, `${question.id} structured explanation mismatch`);
      assert.equal(question.feedback?.reasoning, question.explanation, `${question.id} feedback mismatch`);
      assert.equal(question.sequencePriority, index + 1, `${question.id} sequence`);
      assert.match(question.qualitySchema, new RegExp(version), `${question.id} quality schema`);
      assert.doesNotMatch(question.question + " " + question.explanation, /Learn with an example|SmartScore|IXL/i, `${question.id} copied IXL scaffolding`);
      assert.doesNotMatch(JSON.stringify(question), /\[Show the picture/i, `${question.id} placeholder visual text`);

      if (question.image) {
        visuals++;
        assert.ok(visualCodes.has(code), `${question.id} unexpected visual`);
        assert.ok(question.imageAlt?.length >= 30, `${question.id} weak image alt`);
        const asset = path.join(root, question.image.replace(/^\//, ""));
        assert.ok(fs.existsSync(asset), `${question.id} missing visual asset`);
        assert.match(fs.readFileSync(asset, "utf8"), /<svg[^>]+role="img"/, `${question.id} inaccessible SVG`);
      }
    }

    const html = fs.readFileSync(path.join(root, "quiz/grade-k/english", code, bank, "index.html"), "utf8");
    assert.match(html, new RegExp(`questions\\.js\\?v=${version}`), `${code} ${bank} script version`);
    assert.match(html, /"shuffleQuestions":true/, `${code} ${bank} shuffle`);
    assert.match(html, /"avoidSameCorrectPosition":true/, `${code} ${bank} avoid same correct`);
    assert.match(html, /"questionCycle":true/, `${code} ${bank} cycle`);
    assert.match(html, new RegExp(`"maxQuestions":${bank === "practice" ? 8 : 12}`), `${code} ${bank} maxQuestions`);
    assert.match(html, new RegExp(`id="questionCount">${bank === "practice" ? 8 : 12}</span>`), `${code} ${bank} visible question count`);
  }
  assert.ok(visuals >= 2, `${code} needs targeted visuals`);
}

console.log("PASS: Foundation English AC9EFLY07-AC9EFLY11 hold 24/16 IXL-standard banks with targeted visuals and rotating 8/12 attempts.");
