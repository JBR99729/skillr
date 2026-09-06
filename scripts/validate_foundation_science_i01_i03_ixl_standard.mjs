import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9sfu01", "ac9sfu02", "ac9sfu03", "ac9sfi01", "ac9sfi02", "ac9sfi03"];
const inquiryCodes = new Set(["ac9sfi01", "ac9sfi02", "ac9sfi03"]);
const version = "20260906-foundation-science-ixl-i01-i03";
const expectedVisuals = { ac9sfu01: 2, ac9sfu02: 3, ac9sfu03: 2, ac9sfi01: 2, ac9sfi02: 2, ac9sfi03: 2 };

function loadLive(code, bankName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const file = path.join(root, "quiz/grade-k/science", code, bankName, "questions.js");
  const override = path.join(root, "assets/quiz-visuals/foundation-science", `${code}-visual-overrides.js`);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  vm.runInContext(fs.readFileSync(override, "utf8"), sandbox, { filename: override });
  return sandbox.window[bankName === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions"];
}

for (const code of codes) {
  const across = [];
  let visualCount = 0;
  for (const bankName of ["practice", "test"]) {
    const questions = loadLive(code, bankName);
    assert.equal(questions.length, bankName === "practice" ? 24 : 16, `${code} ${bankName} count`);
    assert.equal(new Set(questions.map((q) => q.id)).size, questions.length, `${code} duplicate IDs`);
    assert.equal(new Set(questions.map((q) => q.question.toLowerCase())).size, questions.length, `${code} duplicate stems`);
    const positions = [0, 1, 2].map((index) => questions.filter((q) => q.correct === index).length);
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${code} ${bankName} answer imbalance: ${positions}`);
    for (const [index, question] of questions.entries()) {
      assert.equal(question.curriculumCode, code.toUpperCase());
      assert.equal(question.bank, bankName);
      assert.equal(question.answers.length, 3, `${question.id} answer count`);
      assert.equal(new Set(question.answers).size, 3, `${question.id} duplicate answers`);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 3);
      assert.equal(question.audioPrompt, question.question, `${question.id} audio mismatch`);
      assert.equal(question.structuredExplanation?.summary, question.explanation, `${question.id} feedback mismatch`);
      assert.ok(question.explanation.length >= 30, `${question.id} weak explanation`);
      assert.ok(question.structuredExplanation?.hint?.length >= 20, `${question.id} weak hint`);
      if (inquiryCodes.has(code)) {
        assert.equal(question.sequencePriority, index + 1);
        assert.equal(question.qualitySchema, "foundation-science-ixl-standard-v1");
      }
      if (question.image) {
        visualCount += 1;
        assert.ok(question.imageAlt?.length >= 25, `${question.id} weak image alt`);
        const asset = path.join(root, question.image.replace(/^\//, ""));
        assert.ok(fs.existsSync(asset), `${question.id} missing visual asset`);
      }
    }
    across.push(...questions.map((q) => q.question.toLowerCase()));

    const htmlFile = path.join(root, "quiz/grade-k/science", code, bankName, "index.html");
    const html = fs.readFileSync(htmlFile, "utf8");
    assert.match(html, new RegExp(`${code}-visual-overrides\\.js\\?v=${version}`));
    if (inquiryCodes.has(code)) {
      assert.match(html, new RegExp(`questions\\.js\\?v=${version}`));
      assert.match(html, /"shuffleQuestions":true/);
      assert.match(html, /"avoidSameCorrectPosition":true/);
      assert.match(html, /"questionCycle":true/);
      assert.match(html, new RegExp(`"maxQuestions":${bankName === "practice" ? 8 : 12}`));
    }
  }
  assert.equal(new Set(across).size, 40, `${code} repeats a stem across Practice/Test`);
  assert.equal(visualCount, expectedVisuals[code], `${code} visual count`);
}

for (const code of inquiryCodes) {
  const index = fs.readFileSync(path.join(root, "quiz/grade-k/science", code, "index.html"), "utf8");
  assert.match(index, /24-question learning bank/);
  assert.match(index, /separate 16-question auto-marked bank/);
}

console.log("PASS: AC9SFI01-03 hold 24/16 original banks with rotating 8/12 attempts; AC9SFU01-03 and AC9SFI01-03 expose 13 matched SVG questions with complete accessible packages.");
