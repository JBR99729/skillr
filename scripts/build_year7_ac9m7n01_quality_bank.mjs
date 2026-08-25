#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_PATH = path.join(ROOT, "assets/assessment-banks/year7/math/ac9m7n01.json");
const bank = JSON.parse(fs.readFileSync(BANK_PATH, "utf8"));

function liveQuestion(question) {
  const visual = question.visual || { type: "none" };
  const usesVisual = visual.type && visual.type !== "none";
  const item = {
    id: question.id.toLowerCase(),
    curriculumCode: question.curriculum_code,
    bank: question.bank,
    skill: question.skill,
    elaborations: question.elaborations,
    difficulty: question.difficulty,
    printable: true,
    type: "single",
    question: question.question,
    audioPrompt: question.audio_prompt,
  };

  if (usesVisual) {
    const escapedAlt = visual.alt_text.replaceAll('"', "&quot;");
    item.visual = visual.alt_text;
    item.visualHtml = `<svg viewBox="0 0 640 300" role="img" aria-label="${escapedAlt}"><use href="${visual.asset_path}"></use></svg>`;
    item.visualMeta = {
      type: visual.type,
      asset_path: visual.asset_path,
      alt_text: visual.alt_text,
    };
  }

  return {
    ...item,
    answers: question.answers.map((answer) => answer.text),
    correct: question.correct_index,
    explanation: `${question.explanation.summary}\nHint: ${question.explanation.hint}`,
    structuredExplanation: question.explanation,
    qualitySchema: "production-v2",
  };
}

const practice = bank.filter((item) => item.bank === "practice").map(liveQuestion);
const test = bank.filter((item) => item.bank === "test").map(liveQuestion);

if (practice.length < 8 || test.length < 8) {
  throw new Error(`AC9M7N01 requires at least 8 questions per bank; found ${practice.length} Practice and ${test.length} Test.`);
}

for (const item of bank) {
  if (!Array.isArray(item.elaborations) || item.elaborations.length === 0) {
    throw new Error(`Missing elaboration metadata: ${item.id}`);
  }
  if (!Number.isInteger(item.difficulty) || item.difficulty < 1 || item.difficulty > 5) {
    throw new Error(`Invalid difficulty: ${item.id}`);
  }
  if (item.answers.filter((answer) => answer.is_correct).length !== 1) {
    throw new Error(`Question must have exactly one correct answer: ${item.id}`);
  }
}

const practiceSource = `"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(practice, null, 2)};\nwindow.quizQuestions = window.skillrPracticeQuestions;\n`;
const testSource = `"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(test, null, 2)};\nwindow.skillrExamQuestions = window.skillrTestQuestions;\nwindow.quizQuestions = window.skillrTestQuestions;\n`;

const outputs = new Map([
  ["quiz/year-7/math/ac9m7n01/practice/questions.js", practiceSource],
  ["quiz/year-7/math/ac9m7n01/practice/practice-questions.js", practiceSource],
  ["quiz/year-7/math/ac9m7n01/test/questions.js", testSource],
]);

for (const [relativePath, source] of outputs) {
  fs.writeFileSync(path.join(ROOT, relativePath), source);
}

console.log(JSON.stringify({
  code: "AC9M7N01",
  practice: practice.length,
  test: test.length,
  elaborations: [...new Set(bank.flatMap((item) => item.elaborations))].sort(),
  outputs: [...outputs.keys()],
}, null, 2));
