import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/publish_production_question_bank.mjs <bank.json>");
const items = JSON.parse(fs.readFileSync(path.resolve(ROOT, input), "utf8"));
if (!Array.isArray(items) || !items.length) throw new Error("Expected a non-empty production bank");

const first = items[0];
const yearNumber = String(first.year_level).match(/\d+/)?.[0];
if (!yearNumber) throw new Error(`Unsupported year level: ${first.year_level}`);
const subjectRoute = first.subject === "math" ? "math" : first.subject;
const codeLower = first.curriculum_code.toLowerCase();
const route = path.join(ROOT, "quiz", `year-${yearNumber}`, subjectRoute, codeLower);

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function liveItem(item) {
  const alt = item.visual?.alt_text || "";
  const visualHtml = item.visual?.type === "svg"
    ? `<svg viewBox="0 0 640 300" role="img" aria-label="${escapeAttribute(alt)}"><use href="${escapeAttribute(item.visual.asset_path)}"></use></svg>`
    : "";
  return {
    id: item.id.toLowerCase(),
    curriculumCode: item.curriculum_code,
    bank: item.bank,
    skill: item.skill.replace(/_/g, " "),
    printable: true,
    type: "single",
    question: item.question,
    audioPrompt: item.audio_prompt,
    visual: alt,
    visualHtml,
    visualMeta: item.visual,
    answers: item.answers.map((answer) => answer.text),
    ...(Array.isArray(item.audio_answers) ? { audioAnswers: item.audio_answers } : {}),
    correct: item.correct_index,
    explanation: `${item.explanation.summary}\nHint: ${item.explanation.hint}`,
    structuredExplanation: item.explanation,
    qualitySchema: "production-v1"
  };
}

function writeBank(bank, globalName, targets) {
  const data = items.filter((item) => item.bank === bank).map(liveItem);
  const compatibilityAlias = bank === "test"
    ? `window.skillrExamQuestions = window.${globalName};\n`
    : "";
  const source = `"use strict";\nwindow.${globalName} = ${JSON.stringify(data, null, 2)};\n${compatibilityAlias}window.quizQuestions = window.${globalName};\n`;
  for (const target of targets) fs.writeFileSync(path.join(route, target), source);
}

writeBank("practice", "skillrPracticeQuestions", ["practice/questions.js", "practice/practice-questions.js"]);
writeBank("test", "skillrTestQuestions", ["test/questions.js"]);

for (const relative of ["practice/index.html", "test/index.html"]) {
  const file = path.join(route, relative);
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("production-question-ui.js")) {
    html = html.replace(
      /<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/,
      `<script src="/quiz/assets/production-question-ui.js?v=1"></script>$&`
    );
  }
  fs.writeFileSync(file, html);
}

const activityFile = path.join(route, "index.html");
if (fs.existsSync(activityFile)) {
  const practiceCount = items.filter((item) => item.bank === "practice").length;
  const testCount = items.filter((item) => item.bank === "test").length;
  let html = fs.readFileSync(activityFile, "utf8");
  html = html
    .replace(/\d+ Practice questions/, `${practiceCount} Practice questions`)
    .replace(/\d+ auto-marked Test questions/, `${testCount} auto-marked Test questions`);
  fs.writeFileSync(activityFile, html);
}

console.log(JSON.stringify({ code: first.curriculum_code, route: path.relative(ROOT, route), practice: items.filter((item) => item.bank === "practice").length, test: items.filter((item) => item.bank === "test").length }, null, 2));
