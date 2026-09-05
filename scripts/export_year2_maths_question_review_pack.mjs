import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const bankRoot = path.join(root, "assets", "assessment-banks", "year2", "math");
const outputPath = path.join(root, "docs", "year2-maths-question-review-pack.csv");
const targetCounts = { practice: 48, test: 16 };

const context = { window: {} };
vm.createContext(context);
for (const file of ["assets/year2-maths-data.js", "assets/year2-maths-data-extra.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}

const units = context.window.SkillrYear2MathsData;
const skills = Object.keys(units).sort().map((code) => [code, units[code].title]);

function csv(value) {
  return `"${String(value ?? "").replace(/"/g, '""').replace(/\r?\n/g, " / ")}"`;
}

function optionsFor(question) {
  return question.answers
    .map((answer, index) => `${String.fromCharCode(65 + index)}. ${answer.text}`)
    .join(" | ");
}

function correctAnswerFor(question) {
  const correct = question.answers.find((answer) => answer.is_correct);
  return correct?.text ?? question.answers[question.correct_index]?.text ?? "";
}

function explanationFor(question) {
  if (typeof question.explanation === "string") return question.explanation;
  return [question.explanation?.summary, question.explanation?.hint].filter(Boolean).join(" Hint: ");
}

function placeholderId(code, bank, index) {
  const prefix = bank === "practice" ? "P" : "T";
  return `${code}-${prefix}-${String(index).padStart(3, "0")}`;
}

const rows = [
  [
    "skill_code",
    "skill_title",
    "bank",
    "row_type",
    "question_id",
    "current_question",
    "current_options",
    "current_correct_answer",
    "current_explanation",
    "suggested_replacement_question",
    "suggested_replacement_options",
    "suggested_correct_answer",
    "notes",
  ],
];

let existing = 0;
let placeholders = 0;

for (const [code, title] of skills) {
  const file = path.join(bankRoot, `${code.toLowerCase()}.json`);
  const questions = JSON.parse(fs.readFileSync(file, "utf8"));

  for (const bank of ["practice", "test"]) {
    const bankQuestions = questions.filter((question) => question.bank === bank);
    existing += bankQuestions.length;

    for (const question of bankQuestions) {
      rows.push([
        code,
        title,
        bank,
        "existing",
        question.id,
        question.question,
        optionsFor(question),
        correctAnswerFor(question),
        explanationFor(question),
        "",
        "",
        "",
        "",
      ]);
    }

    for (let index = bankQuestions.length + 1; index <= targetCounts[bank]; index++) {
      placeholders += 1;
      rows.push([
        code,
        title,
        bank,
        "placeholder",
        placeholderId(code, bank, index),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        `Add ${bank} question ${index} of ${targetCounts[bank]} for ${code}.`,
      ]);
    }
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${rows.map((row) => row.map(csv).join(",")).join("\n")}\n`);

console.log(JSON.stringify({
  output: path.relative(root, outputPath),
  skills: skills.length,
  existing,
  placeholders,
  rows: rows.length - 1,
}, null, 2));
