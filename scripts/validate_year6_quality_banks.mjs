#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const SUBJECTS = ["math", "science", "english"];
const requestedSubject = process.argv[2]?.toLowerCase();
const selectedSubjects = requestedSubject ? [requestedSubject] : SUBJECTS;
const errors = [];
const warnings = [];
const results = [];

if (selectedSubjects.some((subject) => !SUBJECTS.includes(subject))) {
  throw new Error(`Usage: node scripts/validate_year6_quality_banks.mjs [${SUBJECTS.join("|")}]`);
}

function normalise(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function scriptReference(htmlFile) {
  const html = read(htmlFile);
  const match = [...html.matchAll(/<script[^>]+src=["']([^"']*questions\.js[^"']*)["'][^>]*>/gi)].at(-1);
  if (!match) return null;
  const clean = match[1].split(/[?#]/)[0];
  return clean.startsWith("/")
    ? clean.slice(1)
    : path.relative(ROOT, path.resolve(path.dirname(path.join(ROOT, htmlFile)), clean));
}

function loadBank(scriptFile) {
  if (!scriptFile || !fs.existsSync(path.join(ROOT, scriptFile))) return [];
  const window = {};
  vm.runInNewContext(read(scriptFile), { window, Array, Object, Math, Number, String, Boolean, JSON }, {
    filename: scriptFile,
    timeout: 5000,
  });
  return [
    window.skillrPracticeQuestions,
    window.skillrTestQuestions,
    window.skillrExamQuestions,
    window.quizQuestions,
    window.questions,
  ].find(Array.isArray) ?? [];
}

function answers(item) {
  return Array.isArray(item.answers) ? item.answers : Array.isArray(item.options) ? item.options : [];
}

function answerText(answer) {
  return String(answer?.text ?? answer ?? "");
}

function correctIndex(item, choices) {
  if (Number.isInteger(item.correct_index)) return item.correct_index;
  if (Number.isInteger(item.correct)) return item.correct;
  const embedded = choices.findIndex((choice) => choice?.is_correct === true);
  return embedded < 0 ? null : embedded;
}

function audioPrompt(item) {
  return item.audio_prompt ?? item.audioPrompt;
}

function explanation(item) {
  if (item.explanation && typeof item.explanation === "object") return item.explanation;
  return item.structuredExplanation;
}

function visual(item) {
  if (item.visual && typeof item.visual === "object") return item.visual;
  return item.visualMeta;
}

function fingerprint(item) {
  return `${normalise(item.question)}::${answers(item).map(answerText).map(normalise).sort().join("|")}`;
}

function addError(code, bank, id, message) {
  errors.push(`${code} ${bank}${id ? ` ${id}` : ""}: ${message}`);
}

function validatePage(code, mode, htmlFile, bankSize) {
  const html = read(htmlFile);
  const expectedMax = mode === "practice" ? 8 : 12;
  const config = html.match(/window\.quizConfig\s*=\s*(\{.*?\});/s)?.[1];
  if (!config) {
    addError(code, mode, null, "missing quizConfig");
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(config);
  } catch {
    addError(code, mode, null, "quizConfig is not valid JSON");
    return;
  }
  if (parsed.maxQuestions !== expectedMax) addError(code, mode, null, `maxQuestions is ${parsed.maxQuestions}; expected ${expectedMax}`);
  if (mode === "practice" && parsed.shuffleQuestions !== true) addError(code, mode, null, "Practice must rotate questions");
  if (bankSize < expectedMax) addError(code, mode, null, `bank cannot supply ${expectedMax} questions`);
  const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
  const browserTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  if (!heading) addError(code, mode, null, "missing h1");
  if (/(?:…|\.\.\.)/.test(heading)) addError(code, mode, null, "truncated h1");
  if (!browserTitle) addError(code, mode, null, "missing browser title");
  if (/(?:…|\.\.\.)/.test(browserTitle)) addError(code, mode, null, "truncated browser title");
  if (/QA\s*(?:complete|passed|approved)/i.test(html)) addError(code, mode, null, "QA-complete badge remains");
}

function validateBank(code, bankName, items) {
  const minimum = bankName === "practice" ? 24 : 16;
  if (items.length < minimum) addError(code, bankName, null, `has ${items.length} items; minimum is ${minimum}`);
  const ids = new Set();
  const prompts = new Set();
  const positions = [0, 0, 0];

  for (const [offset, item] of items.entries()) {
    const id = item.id || `item-${offset + 1}`;
    if (!item.id) addError(code, bankName, id, "missing id");
    if (ids.has(item.id)) addError(code, bankName, id, "duplicate id");
    ids.add(item.id);
    const prompt = normalise(item.question);
    if (!prompt) addError(code, bankName, id, "missing question");
    if (prompts.has(prompt)) addError(code, bankName, id, "duplicate prompt");
    prompts.add(prompt);
    if (/(?:…|\.\.\.)/.test(String(item.question))) addError(code, bankName, id, "truncated question");
    if (/which option best describes|which task gives the best practice|which example gives useful evidence|which statement best summarises|curriculum goal|after this unit|this matches AC9/i.test(String(item.question))) {
      addError(code, bankName, id, "generic curriculum-definition prompt");
    }

    const choices = answers(item);
    if (choices.length !== 3) addError(code, bankName, id, `has ${choices.length} choices; expected 3`);
    if (new Set(choices.map(answerText).map(normalise)).size !== choices.length) addError(code, bankName, id, "duplicate choices");
    const correct = correctIndex(item, choices);
    if (!Number.isInteger(correct) || correct < 0 || correct > 2) addError(code, bankName, id, `invalid correct position ${correct}`);
    else positions[correct] += 1;
    if (choices.some((choice) => !answerText(choice).trim())) addError(code, bankName, id, "empty choice");
    const embeddedCorrect = choices.filter((choice) => choice?.is_correct === true);
    if (embeddedCorrect.length && (embeddedCorrect.length !== 1 || choices[correct]?.is_correct !== true)) {
      addError(code, bankName, id, "answer key disagrees with correct choice");
    }

    if (audioPrompt(item) !== item.question) addError(code, bankName, id, "audio prompt does not exactly match visible question");
    const feedback = explanation(item);
    if (!feedback?.summary || !feedback?.hint) addError(code, bankName, id, "missing explanation summary or hint");
    const itemVisual = visual(item);
    if (itemVisual?.type === "svg") {
      const asset = itemVisual.asset_path ?? itemVisual.assetPath;
      const alt = itemVisual.alt_text ?? itemVisual.altText;
      if (!asset || !alt) addError(code, bankName, id, "SVG visual missing path or alt text");
      if (asset) {
        const [assetFile, symbol] = asset.split("#");
        const diskFile = path.join(ROOT, assetFile.replace(/^\//, ""));
        if (!fs.existsSync(diskFile)) addError(code, bankName, id, `missing visual file ${assetFile}`);
        else if (symbol && !new RegExp(`id=["']${symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`).test(fs.readFileSync(diskFile, "utf8"))) {
          addError(code, bankName, id, `missing SVG symbol ${symbol}`);
        }
      }
    } else if (itemVisual?.type && itemVisual.type !== "none") {
      addError(code, bankName, id, `unsupported visual type ${itemVisual.type}`);
    } else if (!itemVisual) {
      addError(code, bankName, id, "missing visual metadata (use an intentional none visual when a diagram is unnecessary)");
    }
  }

  if (items.length >= minimum && Math.max(...positions) - Math.min(...positions) > 1) {
    addError(code, bankName, null, `unbalanced correct positions ${positions.join("/")}`);
  }
  return { count: items.length, positions };
}

for (const subject of selectedSubjects) {
  const subjectRoot = path.join(ROOT, `quiz/year-6/${subject}`);
  const codes = fs.readdirSync(subjectRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^ac9[a-z0-9]+$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const codeLower of codes) {
    const code = codeLower.toUpperCase();
    const base = `quiz/year-6/${subject}/${codeLower}`;
    const practiceHtml = `${base}/practice/index.html`;
    const testHtml = `${base}/test/index.html`;
    const practiceScript = scriptReference(practiceHtml);
    const testScript = scriptReference(testHtml);
    const practice = loadBank(practiceScript);
    const test = loadBank(testScript);
    if (practiceScript === testScript) addError(code, "banks", null, "Practice and Test load the same source");
    const practiceKeys = new Set(practice.map(fingerprint));
    const overlap = test.filter((item) => practiceKeys.has(fingerprint(item))).length;
    if (overlap) addError(code, "banks", null, `${overlap} Practice/Test duplicates`);
    const practiceResult = validateBank(code, "practice", practice);
    const testResult = validateBank(code, "test", test);
    validatePage(code, "practice", practiceHtml, practice.length);
    validatePage(code, "test", testHtml, test.length);
    results.push({ subject, code, practice: practiceResult.count, test: testResult.count, practiceScript, testScript });
  }
}

const totals = results.reduce((sum, row) => {
  sum.codes += 1;
  sum.practice += row.practice;
  sum.test += row.test;
  return sum;
}, { codes: 0, practice: 0, test: 0 });

const report = { scope: selectedSubjects, totals, errors: errors.length, warnings: warnings.length };
if (errors.length) {
  console.error(JSON.stringify({ ...report, firstErrors: errors.slice(0, 100) }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ...report, status: "PASS" }, null, 2));
