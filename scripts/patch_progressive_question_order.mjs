#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const target = path.join(ROOT, "quiz/assets/script.js");
let source = fs.readFileSync(target, "utf8");

const marker = `  function prepareQuestions() {\n  let prepared = questions\n    .map(cloneQuestion);\n`;

if (!source.includes(marker)) {
  if (source.includes("function orderQuestionsByProgressiveDifficulty")) {
    console.log("Progressive question ordering already installed.");
    process.exit(0);
  }
  throw new Error("Could not find prepareQuestions marker in quiz/assets/script.js");
}

const helper = `  function difficultyNumber(value) {\n    if (typeof value === "number" && Number.isFinite(value)) {\n      return Math.max(1, Math.min(5, Math.round(value)));\n    }\n\n    const label = String(value || "").trim().toLowerCase();\n    if (["very easy", "beginner", "intro", "foundation"].includes(label)) return 1;\n    if (["easy", "basic", "recall"].includes(label)) return 2;\n    if (["medium", "standard", "core", "application"].includes(label)) return 3;\n    if (["hard", "challenging", "reasoning"].includes(label)) return 4;\n    if (["very hard", "advanced", "extension", "multi-step"].includes(label)) return 5;\n    return 0;\n  }\n\n  function inferQuestionDifficulty(question) {\n    const explicit = difficultyNumber(\n      question.difficulty ??\n      question.difficultyLevel ??\n      question.difficulty_level ??\n      question.level\n    );\n    if (explicit) return explicit;\n\n    const text = [\n      question.question,\n      question.skill,\n      question.explanation,\n      question.audioPrompt,\n      question.audio_prompt\n    ].filter(Boolean).join(" ").toLowerCase();\n\n    let score = 2;\n\n    if (/identify|name|recognise|recognize|select|match|which number|which word|what is|calculate|find the value/.test(text)) score -= 1;\n    if (/explain|compare|interpret|justify|reason|analyse|analyze|evaluate|predict/.test(text)) score += 1;\n    if (/multi[- ]?step|two[- ]?step|three[- ]?step|simultaneous|unfamiliar|investigate|prove|derive|optimise|optimize/.test(text)) score += 1;\n    if (/therefore|hence|best explains|most appropriate|which conclusion|which inference/.test(text)) score += 1;\n\n    const numberCount = (text.match(/\\b\\d+(?:\\.\\d+)?\\b/g) || []).length;\n    if (numberCount >= 4) score += 1;\n\n    const questionLength = String(question.question || "").split(/\\s+/).filter(Boolean).length;\n    if (questionLength > 45) score += 1;\n\n    if (question.visualMeta?.type && question.visualMeta.type !== "none") score += 0.5;\n\n    return Math.max(1, Math.min(5, Math.round(score)));\n  }\n\n  function shuffleDifficultyBucket(items) {\n    const copy = items.slice();\n    for (let i = copy.length - 1; i > 0; i -= 1) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [copy[i], copy[j]] = [copy[j], copy[i]];\n    }\n    return copy;\n  }\n\n  function orderQuestionsByProgressiveDifficulty(items) {\n    const buckets = new Map([[1, []], [2, []], [3, []], [4, []], [5, []]]);\n\n    items.forEach((question) => {\n      const difficulty = inferQuestionDifficulty(question);\n      question._skillrDifficulty = difficulty;\n      buckets.get(difficulty).push(question);\n    });\n\n    return [1, 2, 3, 4, 5].flatMap((difficulty) =>\n      shuffleDifficultyBucket(buckets.get(difficulty))\n    );\n  }\n\n  function shouldUseProgressiveDifficulty() {\n    const path = window.location.pathname;\n    return /\\/practice\\/(?:index\\.html)?$/i.test(path) || /\\/daily-drills\\//i.test(path);\n  }\n\n  function prepareQuestions() {\n  let prepared = questions\n    .map(cloneQuestion);\n\n  if (shouldUseProgressiveDifficulty()) {\n    prepared = orderQuestionsByProgressiveDifficulty(prepared);\n  }\n`;

source = source.replace(marker, helper);

const configMarker = `  if (isPracticePage) {\n    config.preReadSeconds = 0;\n`;
const configReplacement = `  if (isPracticePage) {\n    config.preReadSeconds = 0;\n    config.shuffleQuestions = false;\n    config.questionCycle = false;\n`;
if (!source.includes(configMarker)) throw new Error("Could not find practice config marker");
source = source.replace(configMarker, configReplacement);

const paramsMarker = `  if (isEmbedMode) {\n`;
const dailyConfig = `  if (/\\/daily-drills\\//i.test(window.location.pathname)) {\n    config.shuffleQuestions = false;\n    config.questionCycle = false;\n  }\n\n  if (isEmbedMode) {\n`;
if (!source.includes(paramsMarker)) throw new Error("Could not find embed config marker");
source = source.replace(paramsMarker, dailyConfig);

fs.writeFileSync(target, source);
console.log("Installed progressive easy-to-hard question ordering for practice and daily drills.");
