#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const AUDIT_ONLY = process.argv.includes("--audit");
const SUBJECTS = { math: "AC9M7", science: "AC9S7", english: "AC9E7" };
const failures = [];
const rows = [];

const normalise = (value) => String(value ?? "").normalize("NFKC").toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, " ").trim();
const read = (file) => fs.readFileSync(file, "utf8");

function questionSource(page) {
  if (!fs.existsSync(page)) return null;
  const matches = [...read(page).matchAll(/<script[^>]+src=["']([^"']*questions\.js[^"']*)["'][^>]*>/gi)];
  if (!matches.length) return null;
  const source = matches.at(-1)[1].split(/[?#]/)[0];
  return source.startsWith("/") ? path.join(ROOT, source.slice(1)) : path.resolve(path.dirname(page), source);
}

function load(file) {
  if (!file || !fs.existsSync(file)) return [];
  const window = {};
  vm.runInNewContext(read(file), { window, console }, { filename: file, timeout: 5000 });
  return [window.skillrPracticeQuestions, window.skillrTestQuestions, window.skillrExamQuestions, window.quizQuestions]
    .find(Array.isArray) || [];
}

function answers(item) {
  return Array.isArray(item.answers) ? item.answers.map((answer) => answer?.text ?? answer) : [];
}

function correct(item) {
  if (Number.isInteger(item.correct_index)) return item.correct_index;
  if (Number.isInteger(item.correct)) return item.correct;
  return item.answers?.findIndex((answer) => answer?.is_correct === true) ?? -1;
}

function explanation(item) {
  return item.explanation && typeof item.explanation === "object" ? item.explanation : item.structuredExplanation;
}

function visual(item) {
  return item.visualMeta || (item.visual && typeof item.visual === "object" ? item.visual : null);
}

function fingerprint(item) {
  return `${normalise(item.question)}|${answers(item).map(normalise).sort().join("|")}`;
}

function registryCodes(subject) {
  const page = path.join(ROOT, `year7/curriculum/${subject === "math" ? "maths" : subject}/index.html`);
  const prefix = SUBJECTS[subject];
  return [...new Set((read(page).match(new RegExp(`${prefix}[A-Z0-9]+`, "g")) || []))].sort();
}

for (const subject of Object.keys(SUBJECTS)) {
  for (const code of registryCodes(subject)) {
    const route = path.join(ROOT, `quiz/year-7/${subject}/${code.toLowerCase()}`);
    const practicePage = path.join(route, "practice/index.html");
    const testPage = path.join(route, "test/index.html");
    const practiceSource = questionSource(practicePage);
    const testSource = questionSource(testPage);
    const practice = load(practiceSource);
    const test = load(testSource);
    const issues = [];
    if (practice.length < 24) issues.push(`Practice ${practice.length}/24`);
    if (test.length < 16) issues.push(`Test ${test.length}/16`);
    if (practiceSource && testSource && path.resolve(practiceSource) === path.resolve(testSource)) issues.push("shared source");
    const practiceFingerprints = new Set(practice.map(fingerprint));
    const overlap = test.filter((item) => practiceFingerprints.has(fingerprint(item))).length;
    if (overlap) issues.push(`${overlap} cross-bank duplicates`);

    const ids = new Set();
    const prompts = new Set();
    for (const [bank, items] of [["Practice", practice], ["Test", test]]) {
      const distribution = [0, 0, 0];
      for (const item of items) {
        const label = `${code} ${bank} ${item.id || "missing-id"}`;
        if (!item.id || ids.has(item.id)) issues.push(`${label}: missing/duplicate ID`);
        ids.add(item.id);
        const prompt = normalise(item.question);
        if (!prompt || prompts.has(prompt)) issues.push(`${label}: missing/duplicate prompt`);
        prompts.add(prompt);
        const choices = answers(item);
        const key = correct(item);
        if (choices.length !== 3 || new Set(choices.map(normalise)).size !== 3) issues.push(`${label}: requires 3 unique choices`);
        if (key < 0 || key > 2) issues.push(`${label}: invalid correct index`);
        else distribution[key] += 1;
        const feedback = explanation(item);
        if (!feedback?.summary || !feedback?.hint) issues.push(`${label}: missing summary/hint`);
        const audio = item.audio_prompt ?? item.audioPrompt;
        if (audio !== item.question) issues.push(`${label}: audio mismatch`);
        const art = visual(item);
        if (!art || !["svg", "none"].includes(art.type)) issues.push(`${label}: missing visual metadata`);
        if (art?.type === "svg") {
          if (!art.asset_path || !art.alt_text) issues.push(`${label}: incomplete SVG metadata`);
          const [asset, symbol] = String(art.asset_path || "").split("#");
          const diskAsset = asset?.startsWith("/") ? path.join(ROOT, asset.slice(1)) : null;
          if (!diskAsset || !fs.existsSync(diskAsset)) issues.push(`${label}: visual asset missing`);
          else if (symbol && !read(diskAsset).includes(`id="${symbol}"`)) issues.push(`${label}: SVG symbol missing`);
        }
      }
      if (items.length && (distribution.some((count) => count === 0) || Math.max(...distribution) - Math.min(...distribution) > 1)) {
        issues.push(`${bank}: unbalanced correct positions ${distribution.join("/")}`);
      }
    }

    const practiceHtml = fs.existsSync(practicePage) ? read(practicePage) : "";
    const testHtml = fs.existsSync(testPage) ? read(testPage) : "";
    if (!/"maxQuestions":8/.test(practiceHtml) || !/"shuffleQuestions":true/.test(practiceHtml)) issues.push("Practice must rotate 8");
    if (!/"maxQuestions":12/.test(testHtml) || !/"shuffleQuestions":true/.test(testHtml)) issues.push("Test must draw 12");
    if (/\.\.\.|…/.test((practiceHtml.match(/<h1[^>]*>(.*?)<\/h1>/s) || [])[1] || "")) issues.push("truncated Practice heading");
    if (/\.\.\.|…/.test((testHtml.match(/<h1[^>]*>(.*?)<\/h1>/s) || [])[1] || "")) issues.push("truncated Test heading");
    rows.push({ code, subject, practice: practice.length, test: test.length, overlap, issues: [...new Set(issues)] });
  }
}

const expected = { math: 30, science: 18, english: 24 };
for (const [subject, count] of Object.entries(expected)) {
  const found = rows.filter((row) => row.subject === subject).length;
  if (found !== count) failures.push(`${subject}: expected ${count} registry codes, found ${found}`);
}
for (const row of rows) if (row.issues.length) failures.push(`${row.code}: ${row.issues.join("; ")}`);

const summary = {
  mode: AUDIT_ONLY ? "audit" : "enforce",
  codes: Object.fromEntries(Object.keys(SUBJECTS).map((subject) => [subject, rows.filter((row) => row.subject === subject).length])),
  totals: {
    practice: rows.reduce((sum, row) => sum + row.practice, 0),
    test: rows.reduce((sum, row) => sum + row.test, 0),
    codes_passing: rows.filter((row) => row.issues.length === 0).length,
    codes_with_shared_or_overlapping_banks: rows.filter((row) => row.overlap > 0).length,
    issue_count: failures.length,
  },
  rows: AUDIT_ONLY ? rows : undefined,
};
console.log(JSON.stringify(summary, null, 2));
if (!AUDIT_ONLY && failures.length) {
  console.error(`Year 7 assessment validation failed (${failures.length} code/registry failures).`);
  process.exit(1);
}
console.log(AUDIT_ONLY ? "Year 7 assessment audit complete." : "Year 7 assessment validation passed.");
