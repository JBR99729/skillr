#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dailyAssets = path.join(root, "quiz/assets/daily-drills");
const context = vm.createContext({ window: {}, console });

function load(relativePath) {
  const filename = path.join(root, relativePath);
  vm.runInContext(fs.readFileSync(filename, "utf8"), context, { filename });
}

[
  "quiz/assets/daily-drills/catalog.js",
  "quiz/assets/daily-drills/math-quick-review.js",
  "quiz/assets/daily-drills/science-quick-read.js",
  "quiz/assets/daily-drills/english-vocabulary.js",
  "quiz/assets/daily-drills/math-master-questions.js",
  "quiz/assets/daily-drills/science-master-questions.js",
  "quiz/assets/daily-drills/english-master-questions.js"
].forEach(load);

const catalog = context.window.SkillrDailyCatalog?.years || {};
const generators = {
  math: context.window.SkillrDailyMath,
  english: context.window.SkillrDailyEnglish,
  science: context.window.SkillrDailyScience
};
const yearPath = year => year === "F" ? "grade-k" : `year-${year}`;
const clean = value => String(value ?? "").replace(/\s+/g, " ").trim();
const canonical = value => clean(value).toLocaleLowerCase("en-AU");
const issues = [];
const rows = [];
const globalIds = new Map();
const selectedSubject = process.argv.find(argument => argument.startsWith("--subject="))?.split("=")[1];

for (const [year, yearData] of Object.entries(catalog)) {
  for (const subject of ["math", "english", "science"]) {
    if (selectedSubject && subject !== selectedSubject) continue;
    const topics = yearData?.[subject] || [];
    for (const topic of topics) {
      const slug = topic.slug || topic.id;
      const route = path.join(root, "quiz", yearPath(year), "daily-drills", subject, slug, "index.html");
      const routeExists = fs.existsSync(route);
      const bank = generators[subject]?.generate?.(year, slug) || [];
      const ids = new Set();
      const prompts = new Set();
      const correctPositions = [0, 0, 0];
      const topicIssues = [];
      let singles = 0;
      let threeChoiceSingles = 0;
      let audioPrompts = 0;
      let hints = 0;
      let visuals = 0;

      if (!routeExists) topicIssues.push("missing route");
      bank.forEach((question, index) => {
        const id = clean(question.id);
        const prompt = clean(question.question);
        const key = canonical(prompt);
        if (!id) topicIssues.push(`question ${index + 1}: missing id`);
        else {
          if (ids.has(id)) topicIssues.push(`duplicate id ${id}`);
          ids.add(id);
          if (globalIds.has(id)) topicIssues.push(`global duplicate id ${id}`);
          else globalIds.set(id, `${year}/${subject}/${slug}`);
        }
        if (!prompt) topicIssues.push(`question ${id || index + 1}: missing prompt`);
        else if (prompts.has(key)) topicIssues.push(`duplicate prompt: ${prompt}`);
        else prompts.add(key);

        const audio = clean(question.audio_prompt ?? question.audioPrompt);
        if (audio) {
          audioPrompts += 1;
          if (canonical(audio) !== key) topicIssues.push(`audio mismatch: ${id}`);
        }
        if (clean(question.hint ?? question.explanation?.hint)) hints += 1;
        if (question.visual || question.visual_svg || question.visual_asset) visuals += 1;

        if (question.type === "single") {
          singles += 1;
          if (!Array.isArray(question.answers) || ![3, 4].includes(question.answers.length)) {
            topicIssues.push(`unsupported single-choice option count: ${id} (${question.answers?.length ?? 0})`);
          }
          if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= (question.answers?.length || 0)) {
            topicIssues.push(`invalid single-choice answer key: ${id}`);
          } else if (question.answers.length === 3) {
            threeChoiceSingles += 1;
            correctPositions[question.correct] += 1;
          }
          if (new Set((question.answers || []).map(clean)).size !== (question.answers || []).length) {
            topicIssues.push(`duplicate choices: ${id}`);
          }
        }
      });

      if (!bank.length) topicIssues.push("empty generated bank");
      if (threeChoiceSingles >= 12 && Math.max(...correctPositions) - Math.min(...correctPositions) > 2) {
        topicIssues.push(`unbalanced single-choice keys ${correctPositions.join("/")}`);
      }
      issues.push(...topicIssues.map(message => `${year}/${subject}/${slug}: ${message}`));
      rows.push({
        year,
        subject,
        slug,
        routeExists,
        questions: bank.length,
        uniqueIds: ids.size,
        uniquePrompts: prompts.size,
        singles,
        threeChoiceSingles,
        correctPositions,
        audioPrompts,
        hints,
        visuals,
        issues: topicIssues.length
      });
    }
  }
}

const summary = {
  years: Object.keys(catalog).length,
  topics: rows.length,
  routesPresent: rows.filter(row => row.routeExists).length,
  questions: rows.reduce((sum, row) => sum + row.questions, 0),
  uniqueIds: globalIds.size,
  topicsWithIssues: rows.filter(row => row.issues).length,
  questionsWithAudioPrompt: rows.reduce((sum, row) => sum + row.audioPrompts, 0),
  questionsWithHint: rows.reduce((sum, row) => sum + row.hints, 0),
  questionsWithVisual: rows.reduce((sum, row) => sum + row.visuals, 0)
};

console.log(JSON.stringify({ summary, rows, issues }, null, 2));
if (process.argv.includes("--strict") && issues.length) process.exitCode = 1;
