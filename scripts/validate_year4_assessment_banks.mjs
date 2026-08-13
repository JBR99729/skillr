#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const AUDIT = process.argv.includes("--audit");
const SUBJECTS = [
  ["math", "AC9M4"],
  ["science", "AC9S4"],
  ["english", "AC9E4"],
];
const SUBJECT_FILTER = process.argv.find(value => value.startsWith("--subject="))?.split("=")[1];
const ACTIVE_SUBJECTS = SUBJECT_FILTER ? SUBJECTS.filter(([subject]) => subject === SUBJECT_FILTER) : SUBJECTS;
if (SUBJECT_FILTER && !ACTIVE_SUBJECTS.length) throw new Error(`Unknown subject: ${SUBJECT_FILTER}`);
const MINIMUM = { practice: 24, test: 16 };
const ATTEMPT = { practice: 8, test: 12 };
const GENERIC = [
  /which option best describes the skill being practised/i,
  /which task gives the best practice for this skill/i,
  /which example gives useful evidence of this learning/i,
  /which statement best summarises this topic/i,
  /which option stays focused on the curriculum goal/i,
  /what should students be able to explain or demonstrate after this unit/i,
  /this matches AC9/i,
];

const normalise = value => String(value ?? "")
  .toLowerCase()
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

function scriptFrom(htmlFile) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const refs = [...html.matchAll(/<script[^>]+src=["']([^"']*questions\.js[^"']*)["'][^>]*>/gi)];
  if (!refs.length) return { html, script: null };
  const raw = refs.at(-1)[1].split(/[?#]/)[0];
  return {
    html,
    script: raw.startsWith("/") ? path.join(ROOT, raw.slice(1)) : path.resolve(path.dirname(htmlFile), raw),
  };
}

function load(script) {
  if (!script || !fs.existsSync(script)) return [];
  const window = {};
  vm.runInNewContext(fs.readFileSync(script, "utf8"), { window, Array, Object, Math, Number, String, Boolean, JSON }, {
    filename: path.relative(ROOT, script), timeout: 5000,
  });
  return [window.skillrPracticeQuestions, window.skillrExamQuestions, window.quizQuestions, window.questions]
    .filter(Array.isArray)
    .sort((a, b) => b.length - a.length)[0] ?? [];
}

function answers(item) {
  return Array.isArray(item.answers) ? item.answers : Array.isArray(item.options) ? item.options : [];
}

function correctIndex(item, choices) {
  if (Number.isInteger(item.correct_index)) return item.correct_index;
  if (Number.isInteger(item.correct)) return item.correct;
  const marked = choices.findIndex(choice => choice && typeof choice === "object" && choice.is_correct === true);
  return marked >= 0 ? marked : null;
}

function structuredFeedback(item) {
  return Boolean(item.explanation && typeof item.explanation === "object" && item.explanation.summary && item.explanation.hint)
    || Boolean(item.structuredExplanation?.summary && item.structuredExplanation?.hint);
}

function audio(item) {
  return item.audio_prompt ?? item.audioPrompt ?? "";
}

function visual(item) {
  return item.visualMeta ?? (item.visual && typeof item.visual === "object" ? item.visual : null);
}

function registry() {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum-question-banks/manifest.json"), "utf8"));
  return Object.fromEntries(SUBJECTS.map(([subject, prefix]) => [subject,
    manifest.units.filter(unit => unit.scope === "generate" && unit.code.startsWith(prefix)).map(unit => unit.code).sort(),
  ]));
}

const expected = registry();
const failures = [];
const report = { year: 4, mode: AUDIT ? "audit" : "strict", subjects: {}, totals: { codes: 0, practice: 0, test: 0 } };
const allIds = new Set();
const allPrompts = new Set();

for (const [subject] of ACTIVE_SUBJECTS) {
  const root = path.join(ROOT, "quiz/year-4", subject);
  const routes = fs.readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^ac9[a-z0-9]+$/i.test(entry.name))
    .map(entry => entry.name.toUpperCase()).sort();
  const stats = {
    codes: routes.length, practice: 0, test: 0, passingCodes: 0, sharedSources: 0,
    genericItems: 0, malformedItems: 0, duplicateIds: 0, duplicatePrompts: 0,
    missingAudio: 0, audioMismatch: 0, missingFeedback: 0, missingVisual: 0, missingAlt: 0,
    missingVisualPath: 0, missingSvgSymbol: 0, wrongOptionCount: 0, wrongCorrectIndex: 0,
    unbalancedBanks: 0, truncatedHeadings: 0, wrongAttemptSize: 0, qaBadges: 0,
  };
  if (JSON.stringify(routes) !== JSON.stringify(expected[subject])) failures.push(`${subject}: route registry differs from manifest`);
  for (const code of routes) {
    const lower = code.toLowerCase();
    const codeRoot = path.join(root, lower);
    const perCode = {};
    for (const bank of ["practice", "test"]) {
      const page = path.join(codeRoot, bank, "index.html");
      const { html, script } = scriptFrom(page);
      const items = load(script);
      perCode[bank] = { script, items };
      stats[bank] += items.length;
      report.totals[bank] += items.length;
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
      if (/…|\.\.\./.test(h1)) stats.truncatedHeadings += 1;
      const max = Number(html.match(/"maxQuestions"\s*:\s*(\d+)/)?.[1]);
      if (max !== ATTEMPT[bank]) stats.wrongAttemptSize += 1;
      if (/QA[ -]?(?:complete|passed)|quality assured/i.test(html)) stats.qaBadges += 1;
      const positions = [0, 0, 0];
      for (const item of items) {
        const choices = answers(item);
        const index = correctIndex(item, choices);
        const prompt = normalise(item.question);
        if (!item.id || !prompt) stats.malformedItems += 1;
        if (allIds.has(item.id)) stats.duplicateIds += 1; else allIds.add(item.id);
        if (allPrompts.has(prompt)) stats.duplicatePrompts += 1; else allPrompts.add(prompt);
        if (GENERIC.some(pattern => pattern.test(item.question ?? "") || pattern.test(String(item.explanation ?? "")))) stats.genericItems += 1;
        if (choices.length !== 3) stats.wrongOptionCount += 1;
        if (!Number.isInteger(index) || index < 0 || index >= choices.length) stats.wrongCorrectIndex += 1;
        else if (index < 3) positions[index] += 1;
        if (!audio(item)) stats.missingAudio += 1;
        else if (normalise(audio(item)) !== prompt) stats.audioMismatch += 1;
        if (!structuredFeedback(item)) stats.missingFeedback += 1;
        const meta = visual(item);
        if (!meta || meta.type === "none") stats.missingVisual += 1;
        else {
          const alt = meta.alt_text ?? meta.altText ?? item.imageAlt ?? item.visualAlt;
          const asset = meta.asset_path ?? meta.assetPath;
          if (!alt) stats.missingAlt += 1;
          if (!asset) stats.missingVisualPath += 1;
          else {
            const [assetPath, symbol] = asset.split("#");
            const file = path.join(ROOT, assetPath.replace(/^\//, ""));
            if (!fs.existsSync(file)) stats.missingVisualPath += 1;
            else if (symbol && !fs.readFileSync(file, "utf8").includes(`id="${symbol}"`)) stats.missingSvgSymbol += 1;
          }
        }
      }
      if (Math.max(...positions) - Math.min(...positions) > 1) stats.unbalancedBanks += 1;
    }
    if (perCode.practice.script && perCode.practice.script === perCode.test.script) stats.sharedSources += 1;
    const practicePrompts = new Set(perCode.practice.items.map(item => normalise(item.question)));
    const overlap = perCode.test.items.some(item => practicePrompts.has(normalise(item.question)));
    const codePass = perCode.practice.items.length >= MINIMUM.practice
      && perCode.test.items.length >= MINIMUM.test
      && perCode.practice.script !== perCode.test.script && !overlap;
    if (codePass) stats.passingCodes += 1;
    else failures.push(`${code}: requires ${MINIMUM.practice} Practice and ${MINIMUM.test} separate Test items`);
  }
  report.subjects[subject] = stats;
  report.totals.codes += routes.length;
  for (const [key, value] of Object.entries(stats)) {
    if (typeof value === "number" && value > 0 && !["codes", "practice", "test", "passingCodes"].includes(key)) {
      failures.push(`${subject}: ${key}=${value}`);
    }
  }
}

report.status = failures.length ? (AUDIT ? "AUDIT_FINDINGS" : "FAIL") : "PASS";
report.failureCount = failures.length;
console.log(JSON.stringify(report, null, 2));
if (failures.length && !AUDIT) {
  console.error(failures.join("\n"));
  process.exit(1);
}
