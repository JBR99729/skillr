"use strict";

const fs = require("fs");
const vm = require("vm");

const codes = ["ac9m1n01", "ac9m1n02", "ac9m1n03"];
const expected = { practice: 56, test: 24, quiz: 100 };

function load(file, seedWindow = {}) {
  const context = { window: seedWindow, console };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context.window;
}

function signature(question) {
  return JSON.stringify({
    question: question.question,
    visual: question.visual || "",
    answers: question.answers || [],
    items: question.items || []
  });
}

for (const code of codes) {
  const seen = {};
  for (const bank of ["practice", "test", "quiz"]) {
    const file =
      bank === "quiz"
        ? `quiz/year-1/math/${code}/questions.js`
        : `quiz/year-1/math/${code}/${bank}/questions.js`;

    const win = load(file);
    const questions = win.quizQuestions;

    if (!Array.isArray(questions) || questions.length !== expected[bank]) {
      throw new Error(`${file}: expected ${expected[bank]}, found ${questions?.length}`);
    }
    if (bank === "practice" && win.skillrPracticeQuestions !== questions) {
      throw new Error(`${file}: Practice handoff failed`);
    }
    if (
      bank === "test" &&
      (win.skillrTestQuestions !== questions || win.skillrExamQuestions !== questions)
    ) {
      throw new Error(`${file}: Test handoff failed`);
    }
    if (bank === "quiz" && win.skillrQuizQuestions !== questions) {
      throw new Error(`${file}: Quiz handoff failed`);
    }

    if (new Set(questions.map((q) => q.id)).size !== questions.length) {
      throw new Error(`${file}: duplicate IDs`);
    }
    if (new Set(questions.map(signature)).size !== questions.length) {
      throw new Error(`${file}: duplicate learning scenes`);
    }
    if (
      questions.some(
        (q) =>
          !q.question ||
          !q.skill ||
          !q.explanation ||
          q.type === "self-check" ||
          /\bdirectly (?:above|below) of\b/i.test(q.question)
      )
    ) {
      throw new Error(`${file}: incomplete, subjective or grammatically broken item`);
    }

    for (const q of questions) {
      if (["single", "true-false"].includes(q.type)) {
        if (
          !Array.isArray(q.answers) ||
          q.answers.length < 2 ||
          new Set(q.answers.map(String)).size !== q.answers.length ||
          !Number.isInteger(q.correct) ||
          q.correct < 0 ||
          q.correct >= q.answers.length
        ) {
          throw new Error(`${q.id}: invalid single-choice answer`);
        }
      } else if (q.type === "multiple") {
        if (
          !Array.isArray(q.answers) ||
          new Set(q.answers.map(String)).size !== q.answers.length ||
          !Array.isArray(q.correct) ||
          q.correct.length < 2 ||
          q.correct.some(
            (index) =>
              !Number.isInteger(index) || index < 0 || index >= q.answers.length
          )
        ) {
          throw new Error(`${q.id}: invalid multiple-choice answer`);
        }
      } else if (q.type === "number") {
        if (typeof q.correct !== "number" || !Number.isFinite(q.correct)) {
          throw new Error(`${q.id}: invalid number answer`);
        }
      } else if (q.type === "order") {
        if (
          !Array.isArray(q.items) ||
          !Array.isArray(q.correct) ||
          q.items.length !== q.correct.length ||
          new Set(q.items.map(String)).size !== q.items.length ||
          new Set(q.correct.map(String)).size !== q.correct.length
        ) {
          throw new Error(`${q.id}: invalid ordering answer`);
        }
      } else {
        throw new Error(`${q.id}: unsupported type ${q.type}`);
      }
    }

    seen[bank] = new Set(questions.map(signature));
  }

  const overlap = [...seen.practice].filter((item) => seen.test.has(item));
  if (overlap.length) {
    throw new Error(`${code}: Practice and Test learning scenes overlap`);
  }

  const compatibility = load(
    `quiz/year-1/math/${code}/practice/practice-questions.js`
  ).quizQuestions;
  if (!Array.isArray(compatibility) || compatibility.length !== 56) {
    throw new Error(`${code}: compatibility Practice bank failed`);
  }

  for (const mode of ["practice", "test", "quiz"]) {
    const html = fs.readFileSync(
      `quiz/year-1/math/${code}/${mode}/index.html`,
      "utf8"
    );
    if (!html.includes('"questionCycle":true')) {
      throw new Error(`${code}/${mode}: question cycle is not enabled`);
    }
    if (!html.includes("20260812-rebuild1")) {
      throw new Error(`${code}/${mode}: rebuilt bank version is missing`);
    }
  }

  const unit = fs.readFileSync(`quiz/year-1/math/${code}/index.html`, "utf8");
  if (
    !unit.includes("56-question learning bank") ||
    !unit.includes("24-question auto-marked bank") ||
    !unit.includes("100 questions") ||
    !unit.includes(`/quiz/year-1/math/${code}/quiz/`)
  ) {
    throw new Error(`${code}: activity selector is not updated`);
  }

  const worksheet = fs.readFileSync(
    `quiz/year-1/math/${code}/worksheet/index.html`,
    "utf8"
  );
  if (
    !worksheet.includes("/practice/questions.js?v=20260812-rebuild1") ||
    !worksheet.includes("56-question Practice bank")
  ) {
    throw new Error(`${code}: worksheet bank handoff is not updated`);
  }
}

const extensionWindow = {};
load(
  "quiz/assets/daily-drills/year1-maths-n01-n03-extensions.js",
  extensionWindow
);
const extension = extensionWindow.SkillrDailyQuestionExtensions?.["1"]?.math;
if (extension?.["numbers-place-value-to-120"]?.length !== 48) {
  throw new Error("Number and Place Value Daily Drill extension must contain 48 questions");
}
if (extension?.["skip-counting-equal-groups"]?.length !== 32) {
  throw new Error("Skip Counting Daily Drill extension must contain 32 questions");
}

for (const questions of Object.values(extension)) {
  if (new Set(questions.map((q) => q.id)).size !== questions.length) {
    throw new Error("Daily Drill extension IDs are not unique");
  }
  if (questions.some((q) => !q.question || !q.explanation || q.type === "self-check")) {
    throw new Error("Daily Drill extension contains an invalid item");
  }
}

const report = JSON.parse(
  fs.readFileSync("year1-maths-n01-n03-rebuild-report.json", "utf8")
);
if (Object.keys(report.codes || {}).length !== 3) {
  throw new Error("Rebuild report does not contain three curriculum codes");
}

console.log("Year 1 Maths AC9M1N01–03 validation passed.");
