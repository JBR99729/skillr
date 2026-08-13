import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const ALL_SUBJECTS = ["math", "science", "english"];
const requestedSubject = process.argv.find((arg) => arg.startsWith("--subject="))?.split("=")[1];
if (requestedSubject && !ALL_SUBJECTS.includes(requestedSubject)) throw new Error(`Unsupported subject: ${requestedSubject}`);
const SUBJECTS = requestedSubject ? [requestedSubject] : ALL_SUBJECTS;
const GENERIC = [
  /which option best describes the skill being practised/i,
  /which task gives the best practice for this skill/i,
  /which example gives useful evidence of this learning/i,
  /which statement best summarises this topic/i,
  /which option stays focused on the curriculum goal/i,
  /what should students be able to explain or demonstrate after this unit/i,
  /this matches AC9/i,
];

const normalise = (value) => String(value ?? "")
  .toLowerCase()
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

function questionScript(htmlFile) {
  if (!fs.existsSync(htmlFile)) return null;
  const html = fs.readFileSync(htmlFile, "utf8");
  const matches = [...html.matchAll(/<script[^>]+src=["']([^"']*questions\.js[^"']*)["'][^>]*>/gi)];
  if (!matches.length) return null;
  const src = matches.at(-1)[1].split(/[?#]/)[0];
  return src.startsWith("/")
    ? path.join(ROOT, src.slice(1))
    : path.resolve(path.dirname(htmlFile), src);
}

function loadBank(scriptFile) {
  if (!scriptFile || !fs.existsSync(scriptFile)) return [];
  const sandbox = { window: {}, Array, Object, Math, Number, String, Boolean, JSON };
  vm.runInNewContext(fs.readFileSync(scriptFile, "utf8"), sandbox, { filename: scriptFile, timeout: 5000 });
  return [
    sandbox.window.skillrPracticeQuestions,
    sandbox.window.skillrExamQuestions,
    sandbox.window.quizQuestions,
    sandbox.window.questions,
  ].find(Array.isArray) ?? [];
}

function answers(item) {
  return Array.isArray(item.answers) ? item.answers : Array.isArray(item.options) ? item.options : [];
}

function correctIndex(item, choices) {
  if (Number.isInteger(item.correct_index)) return item.correct_index;
  if (Number.isInteger(item.correct)) return item.correct;
  const embedded = choices.findIndex((choice) => choice && typeof choice === "object" && choice.is_correct === true);
  return embedded >= 0 ? embedded : null;
}

function visualData(item) {
  const visual = item.visualMeta && typeof item.visualMeta === "object"
    ? item.visualMeta
    : item.visual && typeof item.visual === "object" ? item.visual : null;
  const asset = visual?.asset_path ?? visual?.assetPath ?? item.visualAsset ?? item.visual_asset ?? item.image ?? null;
  const alt = visual?.alt_text ?? visual?.altText ?? item.visualAlt ?? item.visual_alt ?? item.imageAlt ?? null;
  return { visual, asset, alt };
}

function inspectPage(code, mode, htmlFile, expectedBankSize) {
  const issues = [];
  if (!fs.existsSync(htmlFile)) return ["missing page"];
  const html = fs.readFileSync(htmlFile, "utf8");
  const heading = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? [])[1] ?? "";
  if (!heading || /\.\.\.|…/.test(heading)) issues.push("truncated heading");
  if (/qa complete/i.test(html)) issues.push("QA-complete badge");
  if (!html.includes(`"maxQuestions":${mode === "practice" ? 8 : 12}`)) issues.push("attempt count config");
  if (!html.includes('"shuffleQuestions":true')) issues.push("question shuffle config");
  if (!html.includes('"questionCycle":true')) issues.push("question rotation config");
  if (!new RegExp(`>${expectedBankSize}<\\/span><span class="summary-label">Question bank`, "i").test(html)) issues.push("bank-size presentation");
  if (mode === "test" && questionScript(htmlFile)?.includes("/practice/")) issues.push("test loads Practice source");
  return issues.map((issue) => `${code} ${mode}: ${issue}`);
}

const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "data/curriculum-units.json"), "utf8"));
const registryRows = registry.units.filter((unit) => unit.level === "Year 8" && SUBJECTS.includes(unit.quizSubjectSlug));
const registryCodes = new Set(registryRows.map((unit) => unit.code));
const routeRows = [];
for (const subject of SUBJECTS) {
  const subjectRoot = path.join(ROOT, "quiz/year-8", subject);
  for (const entry of fs.readdirSync(subjectRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && /^ac9[a-z0-9]+$/i.test(entry.name)) routeRows.push({ subject, code: entry.name.toUpperCase() });
  }
}
const routeCodes = new Set(routeRows.map((row) => row.code));
const errors = [];
for (const code of registryCodes) if (!routeCodes.has(code)) errors.push(`${code}: registry code has no route`);
for (const code of routeCodes) if (!registryCodes.has(code)) errors.push(`${code}: route is absent from registry`);

const totals = { practice: 0, test: 0 };
const failures = {};
const globalIds = new Set();
const globalPrompts = new Set();
const category = (issue) => {
  const checks = [
    [/below \d+$/, "bank count"],
    [/share a source|loads Practice source/, "Practice/Test source separation"],
    [/Practice\/Test prompt overlap|duplicate\/missing prompt/, "prompt uniqueness/separation"],
    [/duplicate\/missing ID/, "ID uniqueness"],
    [/generic curriculum prompt/, "generic curriculum prompts"],
    [/truncated text|truncated heading/, "truncated text/headings"],
    [/audio prompt/, "audio prompt parity"],
    [/3 choices/, "three-choice compliance"],
    [/duplicate choice text/, "choice uniqueness"],
    [/invalid answer key/, "answer-key accuracy"],
    [/correct positions unbalanced/, "correct-position balance"],
    [/summary\/hint/, "structured feedback"],
    [/visual|SVG symbol/, "visual/alt integrity"],
    [/attempt count config/, "8/12 presentation"],
    [/question shuffle config|question rotation config/, "question rotation"],
    [/bank-size presentation/, "bank-size presentation"],
    [/QA-complete badge/, "QA badge absence"],
    [/registry code has no route|route is absent from registry/, "registry parity"],
  ];
  return checks.find(([pattern]) => pattern.test(issue))?.[1] ?? "other";
};
const add = (code, issue) => {
  errors.push(`${code}: ${issue}`);
  const key = category(issue);
  failures[key] = (failures[key] ?? 0) + 1;
};

for (const { subject, code } of routeRows.sort((a, b) => a.code.localeCompare(b.code))) {
  const route = path.join(ROOT, "quiz/year-8", subject, code.toLowerCase());
  const scripts = {};
  const banks = {};
  for (const mode of ["practice", "test"]) {
    const htmlFile = path.join(route, mode, "index.html");
    scripts[mode] = questionScript(htmlFile);
    try { banks[mode] = loadBank(scripts[mode]); } catch (error) { banks[mode] = []; add(code, `${mode} bank syntax/runtime error: ${error.message}`); }
    totals[mode] += banks[mode].length;
    const expected = mode === "practice" ? 24 : 16;
    if (banks[mode].length < expected) add(code, `${mode} below ${expected}`);
    for (const pageIssue of inspectPage(code, mode, htmlFile, expected)) add(code, pageIssue.replace(`${code} `, ""));
  }
  if (scripts.practice && scripts.test && path.resolve(scripts.practice) === path.resolve(scripts.test)) add(code, "Practice/Test share a source");

  const practicePrompts = new Set(banks.practice.map((item) => normalise(item.question)));
  if (banks.test.some((item) => practicePrompts.has(normalise(item.question)))) add(code, "Practice/Test prompt overlap");

  for (const mode of ["practice", "test"]) {
    const positions = [0, 0, 0];
    const localIds = new Set();
    const localPrompts = new Set();
    for (const [offset, item] of banks[mode].entries()) {
      const tag = `${mode} item ${offset + 1}`;
      const prompt = normalise(item.question);
      const id = String(item.id ?? "").trim();
      if (!id || localIds.has(id) || globalIds.has(id)) add(code, `${tag} duplicate/missing ID`);
      else { localIds.add(id); globalIds.add(id); }
      if (!prompt || localPrompts.has(prompt) || globalPrompts.has(prompt)) add(code, `${tag} duplicate/missing prompt`);
      else { localPrompts.add(prompt); globalPrompts.add(prompt); }
      if (GENERIC.some((pattern) => pattern.test(String(item.question)) || pattern.test(String(item.explanation)))) add(code, `${tag} generic curriculum prompt`);
      if (/\.\.\.|…/.test(String(item.question)) || answers(item).some((choice) => /\.\.\.|…/.test(String(choice?.text ?? choice)))) add(code, `${tag} truncated text`);
      if (/\b(?:and|or|of|to|with|including|such as|the)\.(?:[”"']?\s|$)/i.test(String(item.question))) add(code, `${tag} sentence fragment`);
      if (/[.!?][”"']?\.(?:\s|$)/.test(String(item.question))) add(code, `${tag} doubled punctuation`);
      if (item.audio_prompt !== item.question && item.audioPrompt !== item.question) add(code, `${tag} missing/mismatched audio prompt`);
      const choices = answers(item);
      if (choices.length !== 3) add(code, `${tag} does not have 3 choices`);
      if (new Set(choices.map((choice) => normalise(choice?.text ?? choice))).size !== choices.length) add(code, `${tag} duplicate choice text`);
      const correct = correctIndex(item, choices);
      const marked = choices.filter((choice) => choice && typeof choice === "object" && choice.is_correct === true);
      if (!Number.isInteger(correct) || correct < 0 || correct > 2 || (marked.length && (marked.length !== 1 || !choices[correct]?.is_correct))) add(code, `${tag} invalid answer key`);
      else positions[correct] += 1;
      if (!(item.explanation?.summary && item.explanation?.hint) && !(item.structuredExplanation?.summary && item.structuredExplanation?.hint)) add(code, `${tag} missing summary/hint`);
      const { visual, asset, alt } = visualData(item);
      if (!visual || !asset || !alt || String(alt).trim().length < 20) add(code, `${tag} incomplete visual/alt metadata`);
      if (asset) {
        const [assetPath, symbol] = String(asset).split("#");
        const file = path.join(ROOT, assetPath.replace(/^\//, ""));
        if (!fs.existsSync(file)) add(code, `${tag} missing visual asset`);
        else if (symbol && !fs.readFileSync(file, "utf8").includes(`id="${symbol}"`)) add(code, `${tag} missing SVG symbol`);
      }
    }
    if (banks[mode].length >= (mode === "practice" ? 24 : 16) && Math.max(...positions) - Math.min(...positions) > 1) add(code, `${mode} correct positions unbalanced`);
  }
}

const subjects = Object.fromEntries(SUBJECTS.map((subject) => [subject, routeRows.filter((row) => row.subject === subject).length]));
const result = {
  status: errors.length ? "FAIL" : "PASS",
  codes: { registry: registryCodes.size, routes: routeCodes.size, subjects },
  totals,
  requiredTotals: { practice: registryCodes.size * 24, test: registryCodes.size * 16, combined: registryCodes.size * 40 },
  failureCounts: Object.fromEntries(Object.entries(failures).sort((a, b) => b[1] - a[1])),
  errorExamples: errors.slice(0, 20),
  checks: ["registry parity", "24/16 banks", "Practice/Test separation", "unique IDs/prompts", "3 choices", "answer keys", "balanced A/B/C positions", "audio parity", "summary/hint", "visual paths/SVG symbols/alt text", "full headings", "8/12 rotation", "QA badge absence"],
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
