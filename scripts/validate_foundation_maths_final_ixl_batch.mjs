import fs from "node:fs";
import vm from "node:vm";

const codes = [
  "AC9MFA01",
  "AC9MFM01",
  "AC9MFM02",
  "AC9MFSP01",
  "AC9MFSP02",
  "AC9MFST01"
];

const slugs = Object.fromEntries(codes.map((code) => [code, code.toLowerCase()]));

function readQuestions(file, globalName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window[globalName];
}

function normalise(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\d+/g, "#")
    .replace(/\s+/g, " ")
    .trim();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const code of codes) {
  const slug = slugs[code];
  const practiceFile = `quiz/grade-k/math/${slug}/practice/questions.js`;
  const testFile = `quiz/grade-k/math/${slug}/test/questions.js`;
  const rootFile = `quiz/grade-k/math/${slug}/questions.js`;
  const practiceHtml = fs.readFileSync(`quiz/grade-k/math/${slug}/practice/index.html`, "utf8");
  const testHtml = fs.readFileSync(`quiz/grade-k/math/${slug}/test/index.html`, "utf8");

  const practice = readQuestions(practiceFile, "skillrPracticeQuestions");
  const test = readQuestions(testFile, "skillrTestQuestions");

  assert(Array.isArray(practice), `${code} practice bank did not load`);
  assert(Array.isArray(test), `${code} test bank did not load`);
  assert(practice.length === 24, `${code} practice expected 24, found ${practice.length}`);
  assert(test.length === 16, `${code} test expected 16, found ${test.length}`);
  assert(/"maxQuestions":8/.test(practiceHtml), `${code} practice page must serve 8 questions`);
  assert(/"maxQuestions":12/.test(testHtml), `${code} test page must serve 12 questions`);
  assert(/questionCycle":true/.test(practiceHtml), `${code} practice cycle must be enabled`);
  assert(/questionCycle":true/.test(testHtml), `${code} test cycle must be enabled`);
  assert(/finalReview \? 24 : 56/.test(fs.readFileSync(rootFile, "utf8")), `${code} root builder not normalised`);

  for (const [bankName, bank] of [["practice", practice], ["test", test]]) {
    const ids = new Set();
    const signatures = new Set();
    const correctPositions = [0, 0, 0, 0];
    for (const item of bank) {
      assert(item.curriculumCode === code, `${code} ${bankName} item has wrong curriculum code`);
      assert(item.bank === bankName, `${code} ${bankName} item has wrong bank`);
      assert(!ids.has(item.id), `${code} ${bankName} duplicate id ${item.id}`);
      ids.add(item.id);
      const visiblePrompt = `${item.question || ""} ${item.visual || ""}`.trim();
      assert(typeof item.question === "string" && visiblePrompt.length >= 18, `${code} ${bankName} has weak question text`);
      assert(typeof item.explanation === "string" && item.explanation.length >= 20, `${code} ${bankName} has weak explanation`);
      if (Array.isArray(item.answers) && typeof item.correct === "number") {
        assert(item.answers.length >= 2, `${code} ${bankName} ${item.id} needs at least 2 options`);
        correctPositions[item.correct] = (correctPositions[item.correct] || 0) + 1;
      }
      const signature = normalise(`${visiblePrompt} ${(item.answers || []).join(" ")}`);
      assert(!signatures.has(signature), `${code} ${bankName} repeated question pattern: ${item.question}`);
      signatures.add(signature);
    }
    const usedPositions = correctPositions.filter(Boolean).length;
    assert(usedPositions >= 3, `${code} ${bankName} answer positions are not balanced enough`);
  }
}

console.log(`Foundation Maths final IXL batch OK: ${codes.length} codes, 24 practice + 16 test each.`);
