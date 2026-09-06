#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const SUBJECTS = ["math", "science", "english"];
const norm = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function loadBank(file, variable) {
  const window = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window, Array, Object, Math, Number, String, Boolean, JSON }, { filename: file });
  return window[variable] ?? window.quizQuestions ?? [];
}

const rows = [];
const globalIds = new Set();
const duplicateIds = new Set();

for (const subject of SUBJECTS) {
  const subjectRoot = path.join(ROOT, "quiz", "year-3", subject);
  const codes = fs.readdirSync(subjectRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^ac9[a-z0-9]+$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const codeSlug of codes) {
    const code = codeSlug.toUpperCase();
    const banks = {};
    for (const bank of ["practice", "test"]) {
      const base = path.join(subjectRoot, codeSlug, bank);
      const file = path.join(base, "questions.js");
      const variable = bank === "practice" ? "skillrPracticeQuestions" : "skillrExamQuestions";
      const items = loadBank(file, variable);
      const positions = [0, 0, 0];
      const prompts = new Set();
      const ids = new Set();
      let duplicatePrompts = 0;
      let threeChoices = 0;
      let validKeys = 0;
      let audioParity = 0;
      let structuredFeedback = 0;
      let visualMetadata = 0;
      let visualAlt = 0;

      for (const item of items) {
        const prompt = norm(item.question);
        if (prompts.has(prompt)) duplicatePrompts += 1;
        prompts.add(prompt);
        if (ids.has(item.id) || globalIds.has(item.id)) duplicateIds.add(item.id);
        ids.add(item.id);
        globalIds.add(item.id);
        const answers = Array.isArray(item.answers) ? item.answers : Array.isArray(item.options) ? item.options : [];
        if (answers.length === 3) threeChoices += 1;
        const correctIndex = Number.isInteger(item.correct_index) ? item.correct_index : Number.isInteger(item.correct) ? item.correct : -1;
        if (answers.length === 3 && correctIndex >= 0 && correctIndex < 3) {
          validKeys += 1;
          positions[correctIndex] += 1;
        }
        if (item.audio_prompt === item.question) audioParity += 1;
        if (item.explanation?.summary && item.explanation?.hint) structuredFeedback += 1;
        if (item.visual && typeof item.visual === "object" && item.visual.type) visualMetadata += 1;
        if (item.visual?.alt_text || item.visual?.altText) visualAlt += 1;
      }

      const html = fs.readFileSync(path.join(base, "index.html"), "utf8");
      const heading = (html.match(/<h1[^>]*>(.*?)<\/h1>/is) ?? [])[1] ?? "";
      const config = html.match(/window\.quizConfig=([^<]+);<\/script>/)?.[1] ?? "";
      banks[bank] = {
        items,
        count: items.length,
        duplicatePrompts,
        threeChoices,
        validKeys,
        audioParity,
        structuredFeedback,
        visualMetadata,
        visualAlt,
        positions,
        truncatedHeading: /\.\.\.|…/.test(heading),
        maxQuestions: Number(config.match(/"maxQuestions":(\d+)/)?.[1] ?? 0),
        shuffleQuestions: config.includes('"shuffleQuestions":true'),
        questionCycle: config.includes('"questionCycle":true'),
      };
    }

    const practicePrompts = new Set(banks.practice.items.map((item) => norm(item.question)));
    const crossBankPromptOverlap = banks.test.items.filter((item) => practicePrompts.has(norm(item.question))).length;
    rows.push({ code, subject, practice: banks.practice, test: banks.test, crossBankPromptOverlap });
  }
}

const totals = {
  codes: rows.length,
  bySubject: Object.fromEntries(SUBJECTS.map((subject) => [subject, rows.filter((row) => row.subject === subject).length])),
  practice: rows.reduce((sum, row) => sum + row.practice.count, 0),
  test: rows.reduce((sum, row) => sum + row.test.count, 0),
  below24Practice: rows.filter((row) => row.practice.count < 24).length,
  below16Test: rows.filter((row) => row.test.count < 16).length,
  crossBankPromptOverlap: rows.reduce((sum, row) => sum + row.crossBankPromptOverlap, 0),
  duplicatePromptsWithinBanks: rows.reduce((sum, row) => sum + row.practice.duplicatePrompts + row.test.duplicatePrompts, 0),
  duplicateIds: duplicateIds.size,
  threeChoiceItems: rows.reduce((sum, row) => sum + row.practice.threeChoices + row.test.threeChoices, 0),
  validThreeChoiceKeys: rows.reduce((sum, row) => sum + row.practice.validKeys + row.test.validKeys, 0),
  audioPromptParity: rows.reduce((sum, row) => sum + row.practice.audioParity + row.test.audioParity, 0),
  structuredFeedback: rows.reduce((sum, row) => sum + row.practice.structuredFeedback + row.test.structuredFeedback, 0),
  visualMetadata: rows.reduce((sum, row) => sum + row.practice.visualMetadata + row.test.visualMetadata, 0),
  visualAlt: rows.reduce((sum, row) => sum + row.practice.visualAlt + row.test.visualAlt, 0),
  truncatedHeadings: rows.reduce((sum, row) => sum + Number(row.practice.truncatedHeading) + Number(row.test.truncatedHeading), 0),
  practiceConfigured8: rows.filter((row) => row.practice.maxQuestions === 8).length,
  testConfigured12: rows.filter((row) => row.test.maxQuestions === 12).length,
  rotatingPractice: rows.filter((row) => row.practice.shuffleQuestions && row.practice.questionCycle).length,
  rotatingTest: rows.filter((row) => row.test.shuffleQuestions && row.test.questionCycle).length,
};

console.log(JSON.stringify({ generatedAt: new Date().toISOString(), totals, rows: rows.map((row) => ({
  code: row.code,
  subject: row.subject,
  practice: row.practice.count,
  test: row.test.count,
  crossBankPromptOverlap: row.crossBankPromptOverlap,
  truncatedHeadings: Number(row.practice.truncatedHeading) + Number(row.test.truncatedHeading),
})) }, null, 2));
