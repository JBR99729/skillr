import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const CODES = ["ac9sfh01", "ac9sfi04", "ac9sfi05"];
const STAMP = "20260906-foundation-science-ixl-h01-i04-i05";
const SVG = [
  "ac9sfh01-observation-question.svg",
  "ac9sfh01-nature-record.svg",
  "ac9sfi04-chart-compare.svg",
  "ac9sfi04-prediction-result.svg",
  "ac9sfi05-labelled-shadow.svg",
  "ac9sfi05-share-card.svg"
];

const failures = [];

function loadQuestions(file) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context.window.skillrPracticeQuestions || context.window.skillrTestQuestions;
}

function normalise(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\b(a|an|the|child|class|group|student|learner|mia|lee|alex)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a, b) {
  const left = new Set(normalise(a).split(" ").filter(Boolean));
  const right = new Set(normalise(b).split(" ").filter(Boolean));
  const intersection = [...left].filter((word) => right.has(word)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

for (const code of CODES) {
  for (const bank of ["practice", "test"]) {
    const file = path.join(ROOT, "quiz", "grade-k", "science", code, bank, "questions.js");
    const questions = loadQuestions(file);
    const expected = bank === "practice" ? 24 : 16;
    if (!Array.isArray(questions) || questions.length !== expected) failures.push(`${code} ${bank}: expected ${expected} questions`);
    const correctCounts = [0, 0, 0];
    const ids = new Set();
    questions.forEach((question) => {
      if (ids.has(question.id)) failures.push(`${code} ${bank}: duplicate id ${question.id}`);
      ids.add(question.id);
      if (question.curriculumCode !== code.toUpperCase()) failures.push(`${question.id}: wrong curriculumCode`);
      if (question.bank !== bank) failures.push(`${question.id}: wrong bank`);
      if (!question.question || !question.explanation || !question.structuredExplanation?.hint) failures.push(`${question.id}: missing teaching fields`);
      if (!Array.isArray(question.answers) || question.answers.length !== 3) failures.push(`${question.id}: expected 3 answers`);
      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 2) failures.push(`${question.id}: invalid correct index`);
      if (new Set(question.answers.map((answer) => String(answer).toLowerCase())).size !== 3) failures.push(`${question.id}: duplicate answer text`);
      correctCounts[question.correct] += 1;
    });
    if (Math.max(...correctCounts) - Math.min(...correctCounts) > 1) failures.push(`${code} ${bank}: answer balance ${correctCounts.join("/")}`);
    for (let i = 0; i < questions.length; i += 1) {
      for (let j = i + 1; j < questions.length; j += 1) {
        const score = similarity(questions[i].question, questions[j].question);
        if (score >= 0.72) failures.push(`${code} ${bank}: near-duplicate ${questions[i].id}/${questions[j].id} ${score.toFixed(2)}`);
      }
    }
    const html = fs.readFileSync(path.join(ROOT, "quiz", "grade-k", "science", code, bank, "index.html"), "utf8");
    const questionsPos = html.indexOf(`${bank}/questions.js?v=${STAMP}`);
    const visualPos = html.indexOf(`${code}-visual-overrides.js?v=${STAMP}`);
    const runtimePos = html.indexOf("/quiz/assets/script.js");
    if (!(questionsPos >= 0 && visualPos > questionsPos && runtimePos > visualPos)) failures.push(`${code} ${bank}: script order or cache stamp is wrong`);
  }
}

for (const file of SVG) {
  const fullPath = path.join(ROOT, "assets", "quiz-visuals", "foundation-science", file);
  if (!fs.existsSync(fullPath)) failures.push(`${file}: missing`);
  execFileSync("python3", ["-c", `import xml.etree.ElementTree as ET; ET.parse(${JSON.stringify(fullPath)})`]);
}

if (failures.length) {
  console.error("Foundation Science H01/I04/I05 IXL-standard validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS: AC9SFH01/AC9SFI04/AC9SFI05 hold 24/16 original banks, balanced answers, clean stems, visual wiring and valid SVGs.");
