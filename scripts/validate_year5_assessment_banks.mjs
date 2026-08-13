#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const SUBJECTS = ["math", "science", "english"];
const STRICT = process.argv.includes("--strict");
const SUBJECT_FILTER = process.argv.find((argument) => argument.startsWith("--subject="))?.split("=")[1];
const ACTIVE_SUBJECTS = SUBJECT_FILTER ? SUBJECTS.filter((subject) => subject === SUBJECT_FILTER) : SUBJECTS;
const EXPECTED = { practice: 24, test: 16 };
const GENERIC = [
  /which option best describes the skill/i,
  /which task gives the best practice/i,
  /which example gives useful evidence/i,
  /which statement best summarises this topic/i,
  /which option stays focused on the curriculum goal/i,
  /what should students be able to explain or demonstrate/i,
  /this matches AC9/i,
];

const normalise = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9+×÷=<>-]+/g, " ").trim();

function codeDirectories(subject) {
  const directory = path.join(ROOT, "quiz", "year-5", subject);
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^ac9[mse]5[a-z0-9]+$/i.test(entry.name))
    .map((entry) => path.join(directory, entry.name))
    .filter((codeDir) => {
      const index = path.join(codeDir, "index.html");
      return !fs.existsSync(index) || !fs.readFileSync(index, "utf8").includes('name="skillr-status" content="legacy-redirect"');
    })
    .sort();
}

function referencedQuestionFile(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']*questions\.js[^"']*)["'][^>]*>/gi)];
  if (!scripts.length) return null;
  const source = scripts.at(-1)[1].split(/[?#]/)[0];
  return source.startsWith("/") ? path.join(ROOT, source.slice(1)) : path.resolve(path.dirname(htmlPath), source);
}

function loadQuestions(file) {
  if (!file || !fs.existsSync(file)) return [];
  const window = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window, Array, Object, Math, JSON }, { filename: file, timeout: 5000 });
  return [window.skillrPracticeQuestions, window.skillrTestQuestions, window.skillrExamQuestions, window.quizQuestions]
    .find(Array.isArray) ?? [];
}

function htmlFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function answers(item) {
  return Array.isArray(item.answers) ? item.answers : Array.isArray(item.options) ? item.options : [];
}

function correctIndex(item, choices) {
  if (Number.isInteger(item.correct_index)) return item.correct_index;
  if (Number.isInteger(item.correct)) return item.correct;
  return choices.findIndex((choice) => choice && typeof choice === "object" && choice.is_correct === true);
}

function textChoice(choice) {
  return String(choice?.text ?? choice ?? "");
}

function inspectBank(items, code, bank) {
  const issues = [];
  const ids = new Set();
  const prompts = new Set();
  const distribution = [0, 0, 0];
  for (const [offset, item] of items.entries()) {
    const label = `${code} ${bank} item ${offset + 1}`;
    const choices = answers(item);
    const correct = correctIndex(item, choices);
    if (!item.id || ids.has(item.id)) issues.push(`${label}: missing or duplicate id`);
    ids.add(item.id);
    const prompt = normalise(item.question);
    if (!prompt || prompts.has(prompt)) issues.push(`${label}: missing or duplicate prompt`);
    prompts.add(prompt);
    if (GENERIC.some((pattern) => pattern.test(String(item.question)) || pattern.test(String(item.explanation)))) issues.push(`${label}: generic curriculum prompt`);
    if (/\.{3}|…/.test(String(item.question)) || choices.some((choice) => /\.{3}|…/.test(textChoice(choice)))) issues.push(`${label}: truncated text`);
    if (choices.length !== 3) issues.push(`${label}: expected 3 choices, found ${choices.length}`);
    if (new Set(choices.map((choice) => normalise(textChoice(choice)))).size !== choices.length) issues.push(`${label}: duplicate choices`);
    if (!Number.isInteger(correct) || correct < 0 || correct >= choices.length) issues.push(`${label}: invalid correct answer index`);
    else if (correct < 3) distribution[correct] += 1;
    const embeddedCorrect = choices.map((choice, choiceIndex) => choice && typeof choice === "object" && choice.is_correct === true ? choiceIndex : -1).filter((choiceIndex) => choiceIndex >= 0);
    if (embeddedCorrect.length && (embeddedCorrect.length !== 1 || embeddedCorrect[0] !== correct)) issues.push(`${label}: correct index does not match embedded answer key`);
    const audio = item.audio_prompt ?? item.audioPrompt;
    if (!audio || normalise(audio) !== prompt) issues.push(`${label}: audio prompt missing or does not match visible question`);
    const explanation = item.explanation && typeof item.explanation === "object" ? item.explanation : item.structuredExplanation;
    if (!explanation?.summary || !explanation?.hint) issues.push(`${label}: missing explanation summary or hint`);
    const visual = item.visualMeta ?? item.visual;
    if (visual && typeof visual === "object") {
      const asset = visual.asset_path ?? visual.assetPath;
      const alt = visual.alt_text ?? visual.altText;
      if (!asset || !alt) issues.push(`${label}: visual metadata missing asset path or alt text`);
      if (asset) {
        const [assetPath, symbol] = String(asset).split("#");
        const local = path.join(ROOT, assetPath.replace(/^\//, ""));
        if (!fs.existsSync(local)) issues.push(`${label}: visual asset does not exist`);
        else if (symbol && !fs.readFileSync(local, "utf8").includes(`id="${symbol}"`)) issues.push(`${label}: SVG symbol does not exist`);
      }
    }
  }
  if (items.length && Math.max(...distribution) - Math.min(...distribution) > 1) issues.push(`${code} ${bank}: unbalanced correct positions ${distribution.join("/")}`);
  return { issues, prompts, distribution };
}

const rows = [];
const allIssues = [];
const globalIds = new Set();
const globalPrompts = new Set();
for (const subject of ACTIVE_SUBJECTS) {
  for (const codeDir of codeDirectories(subject)) {
    const code = path.basename(codeDir).toUpperCase();
    const practiceHtml = path.join(codeDir, "practice", "index.html");
    const testHtml = path.join(codeDir, "test", "index.html");
    const practiceFile = referencedQuestionFile(practiceHtml);
    const testFile = referencedQuestionFile(testHtml);
    const practice = loadQuestions(practiceFile);
    const test = loadQuestions(testFile);
    const p = inspectBank(practice, code, "practice");
    const t = inspectBank(test, code, "test");
    const overlap = [...p.prompts].filter((prompt) => t.prompts.has(prompt)).length;
    const issues = [...p.issues, ...t.issues];
    for (const item of [...practice, ...test]) {
      if (globalIds.has(item.id)) issues.push(`${code}: duplicate id across Year 5 ${item.id}`);
      globalIds.add(item.id);
      const prompt = normalise(item.question);
      if (globalPrompts.has(prompt)) issues.push(`${code}: duplicate prompt across Year 5: ${item.question}`);
      globalPrompts.add(prompt);
    }
    if (practice.length < EXPECTED.practice) issues.push(`${code}: practice below ${EXPECTED.practice}`);
    if (test.length < EXPECTED.test) issues.push(`${code}: test below ${EXPECTED.test}`);
    if (practiceFile === testFile) issues.push(`${code}: Practice and Test share one source`);
    if (overlap) issues.push(`${code}: ${overlap} Practice/Test prompts overlap`);
    const practiceConfig = fs.readFileSync(practiceHtml, "utf8");
    const testConfig = fs.readFileSync(testHtml, "utf8");
    if (!/"maxQuestions":8/.test(practiceConfig) || !/"shuffleQuestions":true/.test(practiceConfig)) issues.push(`${code}: Practice is not configured to rotate 8 questions`);
    if (!/"maxQuestions":12/.test(testConfig)) issues.push(`${code}: Test is not configured for 12 questions`);
    if (/QA complete|QA-complete|quality assured/i.test(`${practiceConfig}\n${testConfig}`)) issues.push(`${code}: QA-complete badge text remains`);
    for (const page of htmlFiles(codeDir)) {
      const html = fs.readFileSync(page, "utf8");
      const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
      const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
      if (!title || !heading) issues.push(`${code}: missing title or h1 in ${path.relative(ROOT, page)}`);
      if (/\.{3}|…/.test(`${title} ${heading}`)) issues.push(`${code}: truncated title or h1 in ${path.relative(ROOT, page)}`);
      if (/QA complete|QA-complete|quality assured/i.test(html)) issues.push(`${code}: QA-complete badge text remains in ${path.relative(ROOT, page)}`);
    }
    rows.push({ code, subject, practice: practice.length, test: test.length, shared: practiceFile === testFile, overlap, issues: issues.length });
    allIssues.push(...issues);
  }
}

const totals = rows.reduce((sum, row) => ({ practice: sum.practice + row.practice, test: sum.test + row.test }), { practice: 0, test: 0 });
const subjectSummary = Object.fromEntries(ACTIVE_SUBJECTS.map((subject) => {
  const selected = rows.filter((row) => row.subject === subject);
  return [subject, {
    codes: selected.length,
    practice: selected.reduce((sum, row) => sum + row.practice, 0),
    test: selected.reduce((sum, row) => sum + row.test, 0),
    passing: selected.filter((row) => row.issues === 0).length,
  }];
}));

console.log(JSON.stringify({ strict: STRICT, codeCount: rows.length, totals, subjectSummary, passingCodes: rows.filter((row) => row.issues === 0).length, issueCount: allIssues.length }, null, 2));
if (!STRICT) {
  for (const row of rows) console.log(`${row.code}\t${row.practice}/${row.test}\tshared=${row.shared}\toverlap=${row.overlap}\tissues=${row.issues}`);
}
if (STRICT && allIssues.length) {
  console.error(allIssues.slice(0, 200).join("\n"));
  if (allIssues.length > 200) console.error(`...and ${allIssues.length - 200} more issues`);
  process.exit(1);
}
