#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselineRef = process.argv[2] || "origin/main";
const files = [
  "quiz/assets/daily-drills/catalog.js",
  "quiz/assets/daily-drills/math-quick-review.js",
  "quiz/assets/daily-drills/science-quick-read.js",
  "quiz/assets/daily-drills/english-vocabulary.js",
  "quiz/assets/daily-drills/math-master-questions.js",
  "quiz/assets/daily-drills/science-master-questions.js",
  "quiz/assets/daily-drills/english-master-questions.js"
];

function buildContext(sourceFor) {
  const context = vm.createContext({ window: {}, console });
  for (const file of files) {
    vm.runInContext(sourceFor(file), context, { filename: file });
  }
  return context;
}

const current = buildContext(file => fs.readFileSync(path.join(root, file), "utf8"));
const baseline = buildContext(file => execFileSync("git", ["show", `${baselineRef}:${file}`], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024
}));
const subjects = ["math", "english", "science"];
const generator = (context, subject) => ({
  math: context.window.SkillrDailyMath,
  english: context.window.SkillrDailyEnglish,
  science: context.window.SkillrDailyScience
}[subject]);
const canonical = value => String(value ?? "").replace(/\s+/g, " ").trim();
const failures = [];
const totals = { topics: 0, questions: 0, singleChoice: 0, bySubject: {} };

function correctValue(item) {
  if (item.type === "single" || item.type === "true-false") return item.answers?.[item.correct];
  if (item.type === "multiple") return (item.correct || []).map(index => item.answers?.[index]).sort();
  return item.correct ?? item.acceptedAnswers ?? item.items;
}

for (const [year, yearData] of Object.entries(current.window.SkillrDailyCatalog.years)) {
  for (const subject of subjects) {
    for (const topic of yearData[subject] || []) {
      const slug = topic.slug || topic.id;
      const before = generator(baseline, subject)?.generate(year, slug) || [];
      const after = generator(current, subject)?.generate(year, slug) || [];
      const label = `${year}/${subject}/${slug}`;
      totals.topics += 1;
      totals.questions += after.length;
      totals.bySubject[subject] = (totals.bySubject[subject] || 0) + after.length;
      if (before.length !== after.length) failures.push(`${label}: count changed ${before.length} -> ${after.length}`);
      const positions = [0, 0, 0];
      let threeChoiceSingles = 0;
      after.forEach((item, index) => {
        const old = before[index];
        if (!old) return;
        for (const field of ["id", "type", "year", "subject", "skill", "set", "difficulty"]) {
          if (canonical(old[field]) !== canonical(item[field])) failures.push(`${label}/${item.id}: ${field} changed`);
        }
        if (JSON.stringify(correctValue(old)) !== JSON.stringify(correctValue(item))) {
          failures.push(`${label}/${item.id}: semantic correct answer changed`);
        }
        if (canonical(item.audioPrompt) !== canonical(item.question)) failures.push(`${label}/${item.id}: audioPrompt mismatch`);
        if (!canonical(item.hint)) failures.push(`${label}/${item.id}: missing hint`);
        if (!canonical(item.explanation)) failures.push(`${label}/${item.id}: missing explanation`);
        if (item.type === "single") {
          totals.singleChoice += 1;
          if (!Array.isArray(item.answers) || item.answers.length !== old.answers?.length) failures.push(`${label}/${item.id}: answer count changed`);
          if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= (item.answers?.length || 0)) failures.push(`${label}/${item.id}: invalid correct index`);
          if (old.answers?.length === 3) {
            threeChoiceSingles += 1;
            if (item.answers.length !== 3) failures.push(`${label}/${item.id}: existing three-choice interaction changed`);
            else positions[item.correct] += 1;
          } else if (JSON.stringify(old.answers) !== JSON.stringify(item.answers) || old.correct !== item.correct) {
            failures.push(`${label}/${item.id}: non-three-choice interaction changed`);
          }
        }
      });
      if (threeChoiceSingles >= 12 && Math.max(...positions) - Math.min(...positions) > 2) {
        failures.push(`${label}: A/B/C positions are not balanced (${positions.join("/")})`);
      }
    }
  }
}

if (totals.questions !== 43240) failures.push(`expected 43240 questions, found ${totals.questions}`);
if (totals.topics !== 199) failures.push(`expected 199 topics, found ${totals.topics}`);

if (failures.length) {
  console.error(`Daily Drill core normalization FAILED (${failures.length}):`);
  console.error(failures.slice(0, 100).join("\n"));
  process.exit(1);
}

console.log("Daily Drill core normalization passed.");
console.log(JSON.stringify({ baselineRef, ...totals }, null, 2));
