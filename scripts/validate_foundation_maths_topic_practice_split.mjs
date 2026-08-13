#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rendererPath = "quiz/assets/foundation-maths-authored-worksheet.js";
const legacyRendererPath = "quiz/assets/foundation-legacy-authored-worksheet.js";
const stylesheetPath = "quiz/assets/foundation-authored-worksheet.css";
const scienceLoaderPath = "assets/foundation-science-worksheet-page.js";
const progressiveLoaderPath = "pwa-register.js";
const assetCacheVersion = "20260814-topic-practice-split2";
const errors = [];

const expectedCodes = [
  "AC9MFA01",
  "AC9MFM01",
  "AC9MFM02",
  "AC9MFN01",
  "AC9MFN02",
  "AC9MFN03",
  "AC9MFN04",
  "AC9MFN05",
  "AC9MFN06",
  "AC9MFSP01",
  "AC9MFSP02",
  "AC9MFST01"
];
const expectedScienceCodes = [
  "AC9SFH01",
  "AC9SFI01",
  "AC9SFI02",
  "AC9SFI03",
  "AC9SFI04",
  "AC9SFI05",
  "AC9SFU01",
  "AC9SFU02",
  "AC9SFU03"
];

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));
const check = (condition, message) => { if (!condition) errors.push(message); };
const compact = (value) => String(value || "").replace(/\s+/g, " ").trim();
const occurrences = (source, needle) => source.split(needle).length - 1;
const qaBadgePattern = /(?:\bqa[-_\s]?(?:badge|status|pass|fail)\b|\bdata-qa\b|class\s*=\s*["'][^"']*\bqa(?:-badge)?\b)/i;

function hasCurrentAsset(html, assetPath) {
  const escaped = assetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...html.matchAll(new RegExp(`${escaped}\\?v=([^"'&>]+)`, "g"))];
  return matches.length === 1 && matches[0][1] === assetCacheVersion;
}

function checkRouteAssets(html, label) {
  const stylesheetCurrent = hasCurrentAsset(html, "/quiz/assets/foundation-authored-worksheet.css");
  const rendererCurrent = hasCurrentAsset(html, "/quiz/assets/foundation-maths-authored-worksheet.js");
  check(stylesheetCurrent, `${label}: stylesheet must appear once with ?v=${assetCacheVersion}`);
  check(rendererCurrent, `${label}: scoped Maths renderer must appear once with ?v=${assetCacheVersion}`);
  check(!html.includes("/quiz/assets/foundation-legacy-authored-worksheet.js"), `${label}: compatibility renderer must be loaded only by the scoped runtime gate`);
  return stylesheetCurrent && rendererCurrent && !html.includes("/quiz/assets/foundation-legacy-authored-worksheet.js");
}

function runDataFile(context, relativePath) {
  new vm.Script(read(relativePath), { filename: relativePath }).runInContext(context);
}

const dataContext = vm.createContext({ window: {}, console });
runDataFile(dataContext, "quiz/assets/foundation-maths-authored-worksheet-data.js");
runDataFile(dataContext, "quiz/assets/foundation-maths-topic-module-data-v2.js");
runDataFile(dataContext, "quiz/assets/foundation-science-worksheet-data.js");
const banks = dataContext.window.SkillrFoundationWorksheetData || {};
const scienceBanks = dataContext.window.SkillrFoundationScienceWorksheetData || {};
const codes = Object.keys(banks).filter((code) => /^AC9MF[A-Z0-9]+$/.test(code)).sort();
const scienceCodes = Object.keys(scienceBanks).filter((code) => /^AC9SF[A-Z0-9]+$/.test(code)).sort();

check(
  JSON.stringify(codes) === JSON.stringify(expectedCodes),
  `codes: expected exactly ${expectedCodes.join(", ")}; found ${codes.join(", ") || "none"}`
);
check(
  JSON.stringify(scienceCodes) === JSON.stringify(expectedScienceCodes),
  `science regression: expected exactly ${expectedScienceCodes.join(", ")}; found ${scienceCodes.join(", ") || "none"}`
);

const tierTotals = { "warm-up": 0, core: 0, challenge: 0 };
let canonicalQuestionTotal = 0;
let assignedQuestionTotal = 0;
let sheetOneQuestionTotal = 0;
let sheetTwoQuestionTotal = 0;
let routeTotal = 0;
let scienceQuestionTotal = 0;
let currentMathsRouteAssets = 0;
let currentScienceRouteAssets = 0;

for (const code of expectedCodes) {
  const unit = banks[code];
  check(Boolean(unit), `${code}: canonical worksheet bank is missing`);
  if (!unit) continue;

  const questions = Array.isArray(unit.questions) ? unit.questions : [];
  canonicalQuestionTotal += questions.length;
  check(questions.length === 9, `${code}: canonical bank must remain exactly 9 questions; found ${questions.length}`);

  const promptKeys = questions.map((question) => compact(question?.question).toLocaleLowerCase("en-AU"));
  check(promptKeys.every(Boolean), `${code}: every canonical question needs a prompt`);
  check(new Set(promptKeys).size === questions.length, `${code}: canonical bank contains a duplicate question prompt`);
  const ids = questions.map((question) => compact(question?.id)).filter(Boolean);
  if (ids.length) {
    check(ids.length === questions.length, `${code}: question IDs are only present on part of the canonical bank`);
    check(new Set(ids).size === ids.length, `${code}: canonical bank contains a duplicate question ID`);
  }

  const sheetOne = questions.slice(0, 5);
  const sheetTwo = questions.slice(5);
  const assigned = [...sheetOne, ...sheetTwo];
  sheetOneQuestionTotal += sheetOne.length;
  sheetTwoQuestionTotal += sheetTwo.length;
  assignedQuestionTotal += assigned.length;
  check(sheetOne.length === 5, `${code}: Topic Practice 1 must receive canonical questions 1–5`);
  check(sheetTwo.length === 4, `${code}: Topic Practice 2 must receive canonical questions 6–9`);
  check(assigned.every((question, index) => question === questions[index]), `${code}: 5/4 assignment changed canonical question order`);
  check(new Set(assigned).size === questions.length, `${code}: 5/4 assignment deletes or duplicates a canonical question`);

  const tiers = { "warm-up": 0, core: 0, challenge: 0 };
  questions.forEach((question, index) => {
    const label = `${code} Q${index + 1}`;
    check(compact(question?.answer), `${label}: missing answer`);
    check(compact(question?.summary), `${label}: missing summary`);
    check(compact(question?.hint), `${label}: missing hint`);
    check(question?.alignment && typeof question.alignment === "object", `${label}: missing alignment object`);
    for (const field of ["concept", "vocabulary", "method"]) {
      check(compact(question?.alignment?.[field]), `${label}: missing alignment.${field}`);
    }
    check(question?.alignment?.concept === unit.title, `${label}: alignment concept must match the topic title`);
    check(
      compact(question?.alignment?.method) && String(question?.summary || "").includes(question.alignment.method),
      `${label}: summary must retain the aligned lesson method`
    );
    check(Object.hasOwn(tiers, question?.tier), `${label}: invalid tier ${String(question?.tier)}`);
    if (Object.hasOwn(tiers, question?.tier)) {
      tiers[question.tier] += 1;
      tierTotals[question.tier] += 1;
    }
  });
  check(tiers["warm-up"] === 3, `${code}: aggregate split needs 3 Warm-Up questions; found ${tiers["warm-up"]}`);
  check(tiers.core === 4, `${code}: aggregate split needs 4 Core questions; found ${tiers.core}`);
  check(tiers.challenge === 2, `${code}: aggregate split needs 2 Challenge questions; found ${tiers.challenge}`);

  const parentRoute = `/quiz/grade-k/math/${code.toLowerCase()}/worksheet/`;
  const parentFile = `${parentRoute.slice(1)}index.html`;
  check(exists(parentFile), `${code}: parent worksheet route is missing (${parentRoute})`);
  if (exists(parentFile)) {
    const parentHtml = read(parentFile);
    if (checkRouteAssets(parentHtml, `${code} parent worksheet`)) currentMathsRouteAssets += 1;
    check(/<img\b[^>]*src=["']\/icons\/skillrhub-mark\.svg["'][^>]*alt=["']SkillrHub logo["']/i.test(parentHtml), `${code}: parent worksheet must show the actual accessible SkillrHub logo`);
  }

  const routeCanonicals = new Set();
  for (const sheetNumber of [1, 2]) {
    const route = `${parentRoute}topic-practice-${sheetNumber}/`;
    const relativeFile = `${route.slice(1)}index.html`;
    routeTotal += 1;
    check(exists(relativeFile), `${code}: Topic Practice ${sheetNumber} route is missing (${route})`);
    if (!exists(relativeFile)) continue;

    const html = read(relativeFile);
    if (checkRouteAssets(html, `${code} Topic Practice ${sheetNumber}`)) currentMathsRouteAssets += 1;
    check(/<img\b[^>]*src=["']\/icons\/skillrhub-mark\.svg["'][^>]*alt=["']SkillrHub logo["']/i.test(html), `${code} sheet ${sheetNumber}: static route must show the actual accessible SkillrHub logo`);
    check(/<html\b[^>]*\blang=["']en-AU["']/i.test(html), `${code} sheet ${sheetNumber}: lang must remain en-AU`);
    check(/<meta\b[^>]*\bname=["']viewport["']/i.test(html), `${code} sheet ${sheetNumber}: responsive viewport is missing`);
    check(html.includes("/quiz/assets/foundation-authored-worksheet.css"), `${code} sheet ${sheetNumber}: worksheet stylesheet is not wired`);
    check(html.includes("/quiz/assets/foundation-maths-authored-worksheet-data.js"), `${code} sheet ${sheetNumber}: canonical worksheet data is not wired`);
    check(html.includes("/quiz/assets/foundation-maths-topic-module-data-v2.js"), `${code} sheet ${sheetNumber}: topic-module bank is not wired`);
    check(html.includes("/quiz/assets/foundation-maths-authored-worksheet.js"), `${code} sheet ${sheetNumber}: worksheet renderer is not wired`);
    check(/id=["']worksheetRoot["']/i.test(html), `${code} sheet ${sheetNumber}: worksheet render root is missing`);
    check(
      new RegExp(`<h1\\b[^>]*\\bid=["']worksheetHeroTitle["'][^>]*>\\s*Topic Practice ${sheetNumber}\\s*</h1>`, "i").test(html),
      `${code} sheet ${sheetNumber}: static visible h1 must be exactly Topic Practice ${sheetNumber}`
    );
    check(/id=["']backToTopic["']/i.test(html), `${code} sheet ${sheetNumber}: topic link hook is missing`);
    check(/id=["']openPractice["']/i.test(html), `${code} sheet ${sheetNumber}: practice link hook is missing`);
    check(html.includes("SkillrHub"), `${code} sheet ${sheetNumber}: SkillrHub logo text/branding is missing`);
    check(!qaBadgePattern.test(html), `${code} sheet ${sheetNumber}: QA badge/status leaked into the live page`);

    const canonicalTag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0] || "";
    const canonicalHref = canonicalTag.match(/\bhref=["']([^"']*)["']/i)?.[1] ?? null;
    const expectedCanonical = `https://skillrhub.com${route}`;
    const runtimePathCanonical = canonicalHref === "" && /worksheetCanonical[\s\S]{0,300}window\.location\.origin\s*\+\s*window\.location\.pathname/.test(html);
    check(Boolean(canonicalTag), `${code} sheet ${sheetNumber}: canonical link element is missing`);
    check(
      canonicalHref === expectedCanonical || runtimePathCanonical,
      `${code} sheet ${sheetNumber}: canonical must resolve to ${expectedCanonical}; found ${canonicalHref ?? "none"}`
    );
    if (canonicalHref === expectedCanonical || runtimePathCanonical) routeCanonicals.add(expectedCanonical);
  }
  check(routeCanonicals.size === 2, `${code}: Topic Practice child canonicals are not distinct and route-correct`);
}

const renderer = read(rendererPath);
check(exists(legacyRendererPath), `compatibility renderer is missing (${legacyRendererPath})`);
const legacyRenderer = exists(legacyRendererPath) ? read(legacyRendererPath) : "";
const stylesheet = read(stylesheetPath);
const scienceLoader = read(scienceLoaderPath);
const progressiveLoader = read(progressiveLoaderPath);
const logoPath = "icons/skillrhub-mark.svg";
check(exists(logoPath), `actual SkillrHub logo asset is missing (/${logoPath})`);
if (exists(logoPath)) {
  const logo = read(logoPath);
  check(/<svg\b/i.test(logo) && /<title\b/i.test(logo) && /<desc\b/i.test(logo), "SkillrHub logo must be a real accessible SVG with title and description");
}

for (const marker of [
  "Topic Practice 1",
  "Topic Practice 2",
  "topic-practice-1",
  "topic-practice-2",
  "worksheet-sheet-tabs",
  "worksheet-sheet-tab",
  'aria-current="page"',
  "sheetNumber",
  "sheetQuestions",
  "sheetTitle"
]) {
  check(renderer.includes(marker), `renderer: missing split marker ${marker}`);
}
check(/studentQuestions\.slice\(\s*0\s*,\s*5\s*\)/.test(renderer), "renderer: Topic Practice 1 must use studentQuestions.slice(0, 5)");
check(/studentQuestions\.slice\(\s*5\s*(?:,\s*9\s*)?\)/.test(renderer), "renderer: Topic Practice 2 must use the final four studentQuestions from index 5");
check(/(?:const|let)\s+isFoundationMathsSplit\b/.test(renderer), "renderer: hard split-scope marker isFoundationMathsSplit is missing");
check(/isFoundationMathsSplit\s*=\s*[\s\S]{0,180}subject\s*===\s*["']math["']/.test(renderer), "renderer: Maths split scope must explicitly require subject === 'math'");
check(/isFoundationMathsSplit\s*=\s*[\s\S]{0,220}\/\^AC9MF\/\.test\(\s*code\s*\)/.test(renderer), "renderer: Maths split scope must explicitly require /^AC9MF/.test(code)");
check(/if\s*\(\s*!isFoundationMathsSplit\s*\)\s*\{[\s\S]{0,900}?\breturn\s*;[\s\S]{0,40}?\}/.test(renderer), "renderer: non-Maths routes must exit before any split rendering");
check(
  renderer.includes(`/quiz/assets/foundation-legacy-authored-worksheet.js?v=${assetCacheVersion}`)
    && /createElement\(\s*["']script["']\s*\)/.test(renderer)
    && /head\.appendChild\(/.test(renderer),
  `renderer: non-Maths routes must dynamically append the compatibility module at ?v=${assetCacheVersion}`
);
check(/function\s+answerKeyHtml\b[\s\S]*?sheetQuestions\.map\(/.test(renderer), "renderer: on-page answer key must map only sheetQuestions");
check(
  /const\s+list\s*=\s*sheetQuestions\b/.test(renderer) || /paginate\(\s*doc\s*,\s*sheetQuestions\b/.test(renderer),
  "renderer: PDF student and answer previews must paginate only sheetQuestions"
);
check(/backToTopic[\s\S]*?unit\.topicUrl/.test(renderer), "renderer: canonical topic-guide link assignment is missing");
check(/openPractice[\s\S]*?practice\//.test(renderer), "renderer: canonical online-practice link assignment is missing");
check(renderer.includes("SkillrHub F–10") || renderer.includes("SkillrHub F-10"), "renderer: SkillrHub F–10 branding is missing");
check(/<img\b[^>]*src=["']\/icons\/skillrhub-mark\.svg["'][^>]*alt=["']SkillrHub logo["']/i.test(renderer), "renderer: visible worksheet chrome must use the actual accessible SkillrHub logo asset");
check(/fetch\(\s*["']\/icons\/skillrhub-mark\.svg["']\s*\)/.test(renderer) && /addImage\(/.test(renderer), "renderer: PDF preview must load and draw the actual SkillrHub logo asset");
check(!qaBadgePattern.test(renderer), "renderer: QA badge/status markup must not ship");
check(legacyRenderer.includes("Core Class Worksheet") && legacyRenderer.includes("Optional Enrichment Extension"), "compatibility renderer: full 8-core/2-enrichment worksheet contract is missing");
check(/window\.SkillrFoundationLegacyWorksheetRender\s*=/.test(legacyRenderer), "compatibility renderer: reusable window.SkillrFoundationLegacyWorksheetRender export is missing");
check(legacyRenderer.includes("previewCorePdfButton") && legacyRenderer.includes("previewExtensionPdfButton"), "compatibility renderer: both legacy PDF preview controls are missing");
check(/<img\b[^>]*src=["']\/icons\/skillrhub-mark\.svg["'][^>]*alt=["']SkillrHub logo["']/i.test(legacyRenderer), "compatibility renderer: visible worksheet chrome must use the actual accessible SkillrHub logo asset");
check(/fetch\(\s*["']\/icons\/skillrhub-mark\.svg["']\s*\)/.test(legacyRenderer) && /addImage\(/.test(legacyRenderer), "compatibility renderer: PDF previews must load and draw the actual SkillrHub logo asset");
check(!/topic-practice-[12]|worksheet-sheet-tab/i.test(legacyRenderer), "compatibility renderer: Maths split links must not leak into legacy worksheets");
check(!qaBadgePattern.test(legacyRenderer), "compatibility renderer: QA badge/status markup must not ship");

function checkPdfWatermarkContract(source, label) {
  check(occurrences(source, "function drawWatermark(") === 1, `${label}: expected exactly one PDF watermark helper`);
  check(occurrences(source, "drawWatermark(") === 2, `${label}: expected exactly one watermark invocation in addition to its helper definition`);
  const loopStart = source.indexOf("pages.forEach(");
  const bodyStart = loopStart === -1 ? -1 : source.indexOf("{", loopStart);
  let bodyEnd = -1;
  if (bodyStart !== -1) {
    let depth = 1;
    let cursor = bodyStart + 1;
    while (cursor < source.length && depth) {
      if (source[cursor] === "{") depth += 1;
      else if (source[cursor] === "}") depth -= 1;
      cursor += 1;
    }
    if (depth === 0) bodyEnd = cursor - 1;
  }
  const pageLoopBody = bodyStart !== -1 && bodyEnd !== -1 ? source.slice(bodyStart + 1, bodyEnd) : "";
  check(loopStart !== -1 && bodyEnd !== -1, `${label}: PDF per-page loop could not be inspected`);
  check(
    occurrences(pageLoopBody, "drawWatermark(") === 1
      && /drawWatermark\(\s*doc\s*,\s*pageW\s*,\s*pageH\s*\)/.test(pageLoopBody),
    `${label}: each PDF page loop must make exactly one drawWatermark(doc, pageW, pageH) call`
  );
}

checkPdfWatermarkContract(renderer, "renderer");
checkPdfWatermarkContract(legacyRenderer, "compatibility renderer");

check(!scienceLoader.includes("foundation-maths-authored-worksheet.js"), "Science cached-page loader must not reload the scoped Maths renderer after rebuilding the body");
check(!/foundation-(?:maths|legacy)-authored-worksheet\.js\?v=(?:6|20260814-topic-practice-split1)\b/.test(scienceLoader), "Science cached-page loader contains a stale worksheet renderer cache version");
check(scienceLoader.includes(`/quiz/assets/foundation-legacy-authored-worksheet.js?v=${assetCacheVersion}`), `Science cached-page loader must load the direct legacy renderer at ?v=${assetCacheVersion}`);
check(/SkillrFoundationLegacyWorksheetRender\s*\(\s*\)/.test(scienceLoader), "Science cached-page loader must invoke the exposed legacy renderer after rebuilding the body");
check(scienceLoader.includes(`/quiz/assets/foundation-authored-worksheet.css?v=${assetCacheVersion}`), `Science cached-page loader must ensure the current worksheet CSS at ?v=${assetCacheVersion}`);
for (const id of ["worksheetRoot", "worksheetHeroTitle", "worksheetEyebrow", "backToTopic", "openPractice", "previewPdfButton"]) {
  check(new RegExp(`id=["']${id}["']`).test(scienceLoader), `Science cached-page loader rebuilt markup is missing #${id}`);
}
check(/<img\b[^>]*src=["']\/icons\/skillrhub-mark\.svg["'][^>]*alt=["']SkillrHub logo["']/i.test(scienceLoader), "Science cached-page loader rebuilt markup must use the actual accessible SkillrHub logo");
check(!/topic-practice-[12]|worksheet-sheet-tab/i.test(scienceLoader), "Science cached-page loader must not inject Maths split UI");
check(
  progressiveLoader.includes(`/assets/foundation-science-worksheet-page.js?v=${assetCacheVersion}`),
  `progressive loader must cache-bust the Foundation Science worksheet loader at ?v=${assetCacheVersion}`
);
check(
  !/foundation-science-worksheet-page\.js\?v=(?:3|6|20260814-topic-practice-split1)\b/.test(progressiveLoader),
  "progressive loader contains a stale Foundation Science worksheet loader cache version"
);

function cssRules(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...source.matchAll(new RegExp(`${escaped}\\s*\\{([^{}]*)\\}`, "gi"))].map((match) => match[1]);
}

function atRuleBlocks(source, name) {
  const blocks = [];
  const pattern = new RegExp(`@${name}\\b`, "gi");
  let match;
  while ((match = pattern.exec(source))) {
    const open = source.indexOf("{", match.index);
    if (open === -1) break;
    let depth = 1;
    let cursor = open + 1;
    while (cursor < source.length && depth) {
      if (source[cursor] === "{") depth += 1;
      else if (source[cursor] === "}") depth -= 1;
      cursor += 1;
    }
    blocks.push({ header: source.slice(match.index, open), body: source.slice(open + 1, cursor - 1) });
    pattern.lastIndex = cursor;
  }
  return blocks;
}

function withoutMediaBlocks(source) {
  let result = source;
  const ranges = [];
  const pattern = /@media\b/gi;
  let match;
  while ((match = pattern.exec(source))) {
    const open = source.indexOf("{", match.index);
    if (open === -1) break;
    let depth = 1;
    let cursor = open + 1;
    while (cursor < source.length && depth) {
      if (source[cursor] === "{") depth += 1;
      else if (source[cursor] === "}") depth -= 1;
      cursor += 1;
    }
    ranges.push([match.index, cursor]);
    pattern.lastIndex = cursor;
  }
  for (const [start, end] of ranges.reverse()) result = `${result.slice(0, start)}${" ".repeat(end - start)}${result.slice(end)}`;
  return result;
}

const joinedRules = (source, selector) => cssRules(source, selector).join(";");
const wrapsByWidth = (rules) => (
  /flex-wrap\s*:\s*wrap/i.test(rules)
  || /flex-flow\s*:[^;{}]*\bwrap\b/i.test(rules)
  || /grid-template-columns\s*:[^;{}]*(?:auto-fit|auto-fill|minmax\s*\()/i.test(rules)
);
const hasOverflowSafeText = (rules) => (
  /white-space\s*:\s*(?:normal|pre-wrap|break-spaces)/i.test(rules)
  && (
    /overflow-wrap\s*:\s*(?:anywhere|break-word)/i.test(rules)
    || /word-break\s*:\s*(?:break-word|break-all)/i.test(rules)
  )
);

const topLevelStyles = withoutMediaBlocks(stylesheet);
const topLevelOptions = joinedRules(topLevelStyles, ".worksheet-options");
const topLevelOptionItems = joinedRules(topLevelStyles, ".worksheet-options span");
const mediaBlocks = atRuleBlocks(stylesheet, "media");
const narrowBlocks = mediaBlocks.filter((block) => /max-width\s*:/i.test(block.header));
const printBlocks = mediaBlocks.filter((block) => /\bprint\b/i.test(block.header));
const allChoiceRules = `${joinedRules(stylesheet, ".worksheet-options")};${joinedRules(stylesheet, ".worksheet-options span")}`;

check(!/nowrap/i.test(allChoiceRules), "stylesheet: multiple-choice rules must not use nowrap at desktop, mobile or print widths");
check(/display\s*:\s*(?:flex|grid)/i.test(topLevelOptions), "stylesheet: desktop choices must use a row-capable flex or grid layout");
check(wrapsByWidth(topLevelOptions), "stylesheet: desktop choices must wrap by available width so long four-choice sets can form a 2×2 layout");
check(hasOverflowSafeText(topLevelOptionItems), "stylesheet: desktop option text must be overflow-safe and allowed to wrap inside its item");
check(narrowBlocks.length > 0, "stylesheet: a narrow-screen max-width media rule is missing");
check(
  narrowBlocks.some((block) => wrapsByWidth(joinedRules(block.body, ".worksheet-options"))),
  "stylesheet: narrow screens must explicitly retain width-aware choice wrapping"
);
check(
  narrowBlocks.some((block) => hasOverflowSafeText(joinedRules(block.body, ".worksheet-options span"))) || hasOverflowSafeText(topLevelOptionItems),
  "stylesheet: narrow-screen option text must inherit or explicitly set overflow-safe wrapping"
);
check(printBlocks.length > 0, "stylesheet: print media rules are missing");
check(
  printBlocks.some((block) => wrapsByWidth(joinedRules(block.body, ".worksheet-options"))),
  "stylesheet: print choices must explicitly wrap by available width and permit a compact 2×2 layout"
);
check(
  printBlocks.some((block) => hasOverflowSafeText(joinedRules(block.body, ".worksheet-options span"))),
  "stylesheet: print option text must explicitly remain overflow-safe"
);
check(/@page\s*\{[^}]*portrait/i.test(stylesheet), "stylesheet: portrait print page contract is missing");
check(!qaBadgePattern.test(stylesheet), "stylesheet: QA badge/status styling must not ship");

class FakeElement {
  constructor(id = "", isConnected = true) {
    this.id = id;
    this.isConnected = isConnected;
    this.textContent = "";
    this.innerHTML = "";
    this.href = "";
    this.className = "";
    this.type = "";
    this.disabled = false;
    this.dataset = {};
    this.attributes = new Map();
    this.insertedHtml = [];
    this.children = [];
    this.listeners = {};
    this.listenerCounts = {};
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  addEventListener(name, listener) { this.listeners[name] = listener; this.listenerCounts[name] = (this.listenerCounts[name] || 0) + 1; }
  insertAdjacentElement(_position, element) { element.isConnected = this.isConnected; this.children.push(element); return element; }
  insertAdjacentHTML(_position, html) { this.insertedHtml.push(String(html)); }
  appendChild(element) { element.isConnected = this.isConnected; this.children.push(element); return element; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  querySelector() { return null; }
  remove() { this.isConnected = false; }
  click() {}
}

function renderSentinelRoute(code, pathname, options = {}) {
  const subject = options.subject || "math";
  const questionCount = options.questionCount || 9;
  const elements = new Map();
  const elementIds = [
    "worksheetRoot",
    "worksheetHeroTitle",
    "worksheetEyebrow",
    "backToTopic",
    "openPractice",
    "previewPdfButton",
    "worksheetCanonical",
    "worksheetSheetTabs",
    "worksheetSheetNav"
  ];
  elementIds.forEach((id) => elements.set(id, new FakeElement(id)));
  const meta = new FakeElement("worksheetMeta");
  const description = new FakeElement("description");
  const printTip = new FakeElement("printTip");
  const created = [];
  const body = new FakeElement("body");
  const head = new FakeElement("head");
  const appendedScripts = [];
  head.appendChild = (element) => {
    head.children.push(element);
    if (String(element?.src || "").includes("foundation-legacy-authored-worksheet.js")) appendedScripts.push(element);
    return element;
  };
  const hero = new FakeElement("worksheetHero");
  hero.querySelector = (selector) => options.staticSwitcher && selector === ".worksheet-sheet-tabs" ? new FakeElement("existingWorksheetSheetTabs") : null;
  const document = {
    title: "",
    body,
    head,
    documentElement: new FakeElement("documentElement"),
    getElementById(id) { return elements.get(id) || null; },
    querySelector(selector) {
      if (selector === 'meta[name="description"]') return description;
      if (selector === ".worksheet-meta") return meta;
      if (selector === ".worksheet-sheet-tabs") return elements.get("worksheetSheetTabs");
      if (selector === ".worksheet-hero") return hero;
      if (selector === 'script[data-skillr-legacy-authored-worksheet="true"]') return appendedScripts[0] || null;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === ".worksheet-print-tip") return [printTip];
      return [];
    },
    createElement() { const element = new FakeElement(); created.push(element); return element; },
    createTextNode(text) { return { textContent: String(text) }; },
    addEventListener() {}
  };

  const lowerCode = code.toLowerCase();
  const questions = Array.from({ length: questionCount }, (_unused, index) => {
    const number = index + 1;
    return {
      type: "single",
      question: `PROMPT_${code}_Q${number}`,
      answers: [`OPTION_${code}_Q${number}_A`, `OPTION_${code}_Q${number}_B`],
      tier: index < 3 ? "warm-up" : index < 7 ? "core" : "challenge",
      tierLabel: index < 3 ? "Warm-Up" : index < 7 ? "Core" : "Challenge",
      answer: `ANSWER_${code}_Q${number}`,
      summary: `SUMMARY_${code}_Q${number}`,
      hint: `HINT_${code}_Q${number}`,
      enrichment: questionCount === 10 && index >= 8,
      alignment: { concept: `Sentinel ${code}`, vocabulary: "sentinel", method: "sentinel method" }
    };
  });
  const location = {
    pathname,
    search: "",
    origin: "https://skillrhub.com",
    href: `https://skillrhub.com${pathname}`,
    replaceTarget: "",
    assignTarget: "",
    replace(value) { this.replaceTarget = String(value); },
    assign(value) { this.assignTarget = String(value); }
  };
  const unit = {
    title: `Sentinel ${code}`,
    subject: subject === "science" ? "Foundation Science" : "Maths",
    topicUrl: `/foundation/${subject === "science" ? "science" : "maths"}/${lowerCode}-sentinel-topic/`,
    questions
  };
  const window = {
    location,
    history: { replaceState() {} },
    SkillrFoundationWorksheetData: subject === "math" ? { [code]: unit } : {},
    SkillrFoundationScienceWorksheetData: subject === "science" ? { [code]: unit } : {}
  };
  const context = vm.createContext({
    window,
    document,
    location,
    URL,
    URLSearchParams,
    console,
    setTimeout: () => 0,
    clearTimeout() {},
    requestAnimationFrame: (callback) => callback(),
    MutationObserver: class { observe() {} disconnect() {} }
  });
  try {
    new vm.Script(renderer, { filename: rendererPath }).runInContext(context);
    if (options.runLegacyRenderer) {
      for (const script of appendedScripts) {
        if (script.src === `/quiz/assets/foundation-legacy-authored-worksheet.js?v=${assetCacheVersion}` && legacyRenderer) {
          new vm.Script(legacyRenderer, { filename: legacyRendererPath }).runInContext(context);
        }
      }
    }
  } catch (error) {
    errors.push(`${code} ${pathname}: renderer execution failed: ${error.message}`);
  }
  const allElements = [...elements.values(), ...created, meta, description, printTip, body, head, hero];
  const generatedHtml = allElements.flatMap((element) => [element.innerHTML, ...element.insertedHtml]).join("\n");
  const visibleText = allElements.map((element) => element.textContent).join("\n");
  return { elements, created, appendedScripts, generatedHtml, visibleText, location, document, meta, description, printTip };
}

function checkSentinelSheet(code, sheetNumber, result, routeHtml = "") {
  const expectedNumbers = sheetNumber === 1 ? [1, 2, 3, 4, 5] : [6, 7, 8, 9];
  const excludedNumbers = sheetNumber === 1 ? [6, 7, 8, 9] : [1, 2, 3, 4, 5];
  const output = `${routeHtml}\n${result.generatedHtml}`;
  check(
    result.elements.get("worksheetHeroTitle")?.textContent === `Topic Practice ${sheetNumber}`,
    `${code} sheet ${sheetNumber}: rendered visible h1 must be exactly Topic Practice ${sheetNumber}`
  );
  expectedNumbers.forEach((number) => {
    for (const prefix of ["PROMPT", "ANSWER", "SUMMARY", "HINT"]) {
      const marker = `${prefix}_${code}_Q${number}`;
      check(occurrences(result.generatedHtml, marker) === 1, `${code} sheet ${sheetNumber}: ${marker} must render exactly once`);
    }
    check(
      new RegExp(`question-number-text[^>]*>\\s*${number}\\.\\s*<`, "i").test(result.generatedHtml),
      `${code} sheet ${sheetNumber}: original question number ${number} is not rendered`
    );
  });
  excludedNumbers.forEach((number) => {
    for (const prefix of ["PROMPT", "ANSWER", "SUMMARY", "HINT"]) {
      const marker = `${prefix}_${code}_Q${number}`;
      check(!result.generatedHtml.includes(marker), `${code} sheet ${sheetNumber}: off-sheet ${marker} leaked into the paper or answer key`);
    }
  });

  const expectedRoute = `/quiz/grade-k/math/${code.toLowerCase()}/worksheet/topic-practice-${sheetNumber}/`;
  const otherRoute = `/quiz/grade-k/math/${code.toLowerCase()}/worksheet/topic-practice-${sheetNumber === 1 ? 2 : 1}/`;
  check(output.includes(`href="${expectedRoute}"`) || output.includes(`href='${expectedRoute}'`), `${code} sheet ${sheetNumber}: current-sheet tab link is missing`);
  check(output.includes(`href="${otherRoute}"`) || output.includes(`href='${otherRoute}'`), `${code} sheet ${sheetNumber}: other-sheet tab link is missing`);
  const anchorTags = output.match(/<a\b[^>]*>/gi) || [];
  check(
    anchorTags.some((tag) => tag.includes(expectedRoute) && /aria-current=["']page["']/i.test(tag)),
    `${code} sheet ${sheetNumber}: current tab must expose aria-current="page"`
  );
  check(result.elements.get("backToTopic")?.href === `/foundation/maths/${code.toLowerCase()}-sentinel-topic/`, `${code} sheet ${sheetNumber}: topic-guide link is incorrectly wired`);
  check(result.elements.get("openPractice")?.href === `/quiz/grade-k/math/${code.toLowerCase()}/practice/`, `${code} sheet ${sheetNumber}: online-practice link is incorrectly wired`);
  check(result.generatedHtml.includes('<img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo">'), `${code} sheet ${sheetNumber}: rendered paper and answer key must use the actual SkillrHub logo`);
  const switchers = output.match(/<nav\b[^>]*class=["'][^"']*\bworksheet-sheet-tabs\b[^"']*["'][^>]*>/gi) || [];
  check(switchers.length === 1, `${code} sheet ${sheetNumber}: expected exactly one worksheet switcher, found ${switchers.length}`);
  const sheetTabs = (output.match(/<a\b[^>]*class=["'][^"']*\bworksheet-sheet-tab\b[^"']*["'][^>]*>/gi) || []);
  check(sheetTabs.length === 2, `${code} sheet ${sheetNumber}: the single switcher must contain exactly two sheet links`);
  check(!qaBadgePattern.test(output), `${code} sheet ${sheetNumber}: dynamic QA badge/status markup must not ship`);
}

async function executeCachedScienceRebuildScenario() {
  const code = "AC9SFU01";
  const pathname = `/quiz/grade-k/science/${code.toLowerCase()}/worksheet/`;
  const elements = new Map();
  const created = [];
  const scripts = [];
  const styleSheets = [{ href: `https://skillrhub.com/quiz/assets/foundation-authored-worksheet.css?v=${assetCacheVersion}` }];
  const loaderErrors = [];
  let meta = new FakeElement("worksheetMeta");
  const description = new FakeElement("description");
  let printTip = new FakeElement("printTip");
  let hero = new FakeElement("worksheetHero");
  let bodyMarkup = "";
  let bodyBuilds = 0;
  let context;

  const body = new FakeElement("body");
  const head = new FakeElement("head");

  function openingTag(markup, id) {
    return markup.match(new RegExp(`<[^>]+\\bid=["']${id}["'][^>]*>`, "i"))?.[0] || "";
  }

  function rebuildBody(markup) {
    bodyBuilds += 1;
    bodyMarkup = String(markup);
    for (const element of elements.values()) element.isConnected = false;
    for (const element of created) {
      if (!/^(?:SCRIPT|LINK)$/.test(element.tagName || "")) element.isConnected = false;
    }
    elements.clear();
    for (const id of ["worksheetRoot", "worksheetHeroTitle", "worksheetEyebrow", "backToTopic", "openPractice", "previewPdfButton"]) {
      const tag = openingTag(bodyMarkup, id);
      if (!tag) continue;
      const element = new FakeElement(id);
      element.tagName = tag.match(/^<([a-z0-9-]+)/i)?.[1]?.toUpperCase() || "DIV";
      element.href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
      elements.set(id, element);
    }
    meta = new FakeElement("worksheetMeta");
    meta.innerHTML = bodyMarkup.match(/<div\b[^>]*class=["'][^"']*\bworksheet-meta\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] || "";
    printTip = new FakeElement("printTip");
    hero = new FakeElement("worksheetHero");
  }

  Object.defineProperty(body, "innerHTML", {
    configurable: true,
    get: () => bodyMarkup,
    set: rebuildBody
  });

  const document = {
    title: "",
    body,
    head,
    documentElement: new FakeElement("documentElement"),
    scripts,
    styleSheets,
    getElementById(id) {
      return elements.get(id) || created.find((element) => element.isConnected && element.id === id) || null;
    },
    querySelector(selector) {
      if (selector === 'meta[name="description"]') return description;
      if (selector === ".worksheet-meta") return meta;
      if (selector === ".worksheet-hero") return hero;
      if (selector === ".worksheet-sheet-tabs") return null;
      if (selector === 'script[data-skillr-legacy-authored-worksheet="true"]') {
        return scripts.find((script) => script.dataset.skillrLegacyAuthoredWorksheet === "true") || null;
      }
      return null;
    },
    querySelectorAll(selector) {
      if (selector === ".worksheet-print-tip") return [printTip];
      if (selector === ".worksheet-meta span") return [];
      return [];
    },
    createElement(tagName) {
      const element = new FakeElement("", false);
      element.tagName = String(tagName || "").toUpperCase();
      created.push(element);
      return element;
    },
    createTextNode(text) { return { textContent: String(text) }; },
    addEventListener() {}
  };

  const questions = Array.from({ length: 10 }, (_unused, index) => ({
    type: "single",
    question: `CACHED_PROMPT_${code}_Q${index + 1}`,
    answers: [`CACHED_OPTION_${index + 1}_A`, `CACHED_OPTION_${index + 1}_B`],
    enrichment: index >= 8
  }));
  const worksheet = {
    subject: "Foundation Science",
    title: "Living Things and External Features",
    topicUrl: "/foundation/science/ac9sfu01-sentinel-topic/",
    questions
  };
  const location = { pathname, origin: "https://skillrhub.com", search: "", href: `https://skillrhub.com${pathname}` };
  const window = {
    location,
    SkillrFoundationScienceData: { [code]: { slug: "ac9sfu01-sentinel-topic" } },
    SkillrFoundationScienceWorksheetData: { [code]: worksheet },
    SkillrFoundationWorksheetData: {},
    jspdf: { jsPDF: function jsPDF() {} }
  };
  const scenarioConsole = {
    log: (...args) => console.log(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => loaderErrors.push(args.map(String).join(" "))
  };

  head.appendChild = (element) => {
    element.isConnected = true;
    head.children.push(element);
    if (element.tagName === "LINK") styleSheets.push({ href: element.href });
    if (element.tagName === "SCRIPT") {
      scripts.push(element);
      if (element.src === `/quiz/assets/foundation-legacy-authored-worksheet.js?v=${assetCacheVersion}`) {
        new vm.Script(legacyRenderer, { filename: legacyRendererPath }).runInContext(context);
        element.dataset.skillrLoaded = "true";
      }
      if (typeof element.onload === "function") element.onload();
      if (typeof element.listeners.load === "function") element.listeners.load();
    }
    return element;
  };

  context = vm.createContext({
    window,
    document,
    location,
    URL,
    URLSearchParams,
    console: scenarioConsole,
    Promise,
    setTimeout: (callback) => { if (typeof callback === "function") callback(); return 0; },
    clearTimeout() {},
    requestAnimationFrame: (callback) => callback(),
    MutationObserver: class { observe() {} disconnect() {} }
  });

  rebuildBody(`<div class="worksheet-shell"><header class="worksheet-hero"><p id="worksheetEyebrow"></p><h1 id="worksheetHeroTitle"></h1><div class="worksheet-meta"></div><button id="previewPdfButton"></button><a id="backToTopic"></a><a id="openPractice"></a></header><main id="worksheetRoot"></main></div>`);
  const mainScript = new FakeElement("", true);
  mainScript.tagName = "SCRIPT";
  mainScript.src = `/quiz/assets/foundation-maths-authored-worksheet.js?v=${assetCacheVersion}`;
  scripts.push(mainScript);
  new vm.Script(renderer, { filename: rendererPath }).runInContext(context);

  const initialRender = window.SkillrFoundationLegacyWorksheetRender;
  check(typeof initialRender === "function", "AC9SFU01 cached scenario: uncached compatibility load did not expose window.SkillrFoundationLegacyWorksheetRender");
  let postRebuildRenderCalls = 0;
  if (typeof initialRender === "function") {
    window.SkillrFoundationLegacyWorksheetRender = (...args) => {
      postRebuildRenderCalls += 1;
      return initialRender(...args);
    };
  }

  new vm.Script(scienceLoader, { filename: scienceLoaderPath }).runInContext(context);
  for (let index = 0; index < 8; index += 1) await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  const rootElement = elements.get("worksheetRoot");
  const output = `${bodyMarkup}\n${rootElement?.innerHTML || ""}`;
  const coreButton = elements.get("previewPdfButton");
  const extensionButton = created.find((element) => element.isConnected && element.id === "previewExtensionPdfButton");
  check(loaderErrors.length === 0, `AC9SFU01 cached scenario: loader error ${loaderErrors.join(" | ")}`);
  check(bodyBuilds === 2, `AC9SFU01 cached scenario: expected one initial body and one cached rebuild; found ${bodyBuilds} body builds`);
  check(postRebuildRenderCalls === 1, `AC9SFU01 cached scenario: rebuilt body must invoke the exposed legacy renderer exactly once; found ${postRebuildRenderCalls}`);
  check(occurrences(rootElement?.innerHTML || "", 'class="worksheet-question') === 10, "AC9SFU01 cached scenario: rebuilt worksheet must render exactly 10 question cards");
  check(occurrences(rootElement?.innerHTML || "", 'class="worksheet-question enrichment"') === 2, "AC9SFU01 cached scenario: rebuilt worksheet must retain exactly 2 enrichment questions");
  check((rootElement?.innerHTML || "").includes("Core Class Worksheet") && (rootElement?.innerHTML || "").includes("Optional Enrichment Extension"), "AC9SFU01 cached scenario: rebuilt worksheet must retain separate 8-core and 2-enrichment sheets");
  check(coreButton?.id === "previewCorePdfButton" && coreButton.listenerCounts.click === 1, "AC9SFU01 cached scenario: rebuilt core PDF button must have exactly one handler");
  check(extensionButton?.listenerCounts.click === 1, "AC9SFU01 cached scenario: rebuilt enrichment PDF button must have exactly one handler");
  check(document.title === `${code} ${worksheet.title} Worksheet | SkillrHub`, "AC9SFU01 cached scenario: full legacy title was not restored after body rebuild");
  check(description.content === `${code} Foundation Science worksheet with 8 core class questions and a separate optional 2-question enrichment extension.`, "AC9SFU01 cached scenario: full legacy metadata was not restored after body rebuild");
  check(elements.get("backToTopic")?.href === worksheet.topicUrl, "AC9SFU01 cached scenario: topic back-link was not restored after body rebuild");
  check(elements.get("openPractice")?.href === `/quiz/grade-k/science/${code.toLowerCase()}/practice/`, "AC9SFU01 cached scenario: practice link was not restored after body rebuild");
  check(output.includes('/icons/skillrhub-mark.svg') && output.includes('alt="SkillrHub logo"'), "AC9SFU01 cached scenario: actual accessible SkillrHub logo is missing after body rebuild");
  check(!/Topic Practice [12]|topic-practice-[12]|worksheet-sheet-tab/i.test(output), "AC9SFU01 cached scenario: Maths split UI leaked into rebuilt Science worksheet");
  for (let number = 1; number <= 10; number += 1) {
    const marker = `CACHED_PROMPT_${code}_Q${number}`;
    const exactMatches = (rootElement?.innerHTML || "").match(new RegExp(`${marker}(?!\\d)`, "g")) || [];
    check(exactMatches.length === 1, `AC9SFU01 cached scenario: ${marker} must render exactly once`);
  }
}

for (const code of expectedCodes) {
  const parentRoute = `/quiz/grade-k/math/${code.toLowerCase()}/worksheet/`;
  const parentHtml = exists(`${parentRoute.slice(1)}index.html`) ? read(`${parentRoute.slice(1)}index.html`) : "";
  const parentResult = renderSentinelRoute(code, parentRoute, { staticSwitcher: /class=["'][^"']*\bworksheet-sheet-tabs\b/i.test(parentHtml) });
  const redirectTarget = parentResult.location.replaceTarget || parentResult.location.assignTarget;
  if (redirectTarget) {
    check(
      redirectTarget === `${parentRoute}topic-practice-1/`,
      `${code}: parent worksheet route must redirect to Topic Practice 1; found ${redirectTarget}`
    );
  } else {
    checkSentinelSheet(code, 1, parentResult, parentHtml);
  }

  for (const sheetNumber of [1, 2]) {
    const route = `${parentRoute}topic-practice-${sheetNumber}/`;
    const routeHtml = exists(`${route.slice(1)}index.html`) ? read(`${route.slice(1)}index.html`) : "";
    const result = renderSentinelRoute(code, route, { staticSwitcher: /class=["'][^"']*\bworksheet-sheet-tabs\b/i.test(routeHtml) });
    checkSentinelSheet(code, sheetNumber, result, routeHtml);
  }
}

for (const code of expectedScienceCodes) {
  const questions = Array.isArray(scienceBanks[code]?.questions) ? scienceBanks[code].questions : [];
  scienceQuestionTotal += questions.length;
  check(questions.length === 10, `${code}: Science regression bank must remain a full 10 questions; found ${questions.length}`);
  const parentRoute = `/quiz/grade-k/science/${code.toLowerCase()}/worksheet/`;
  const parentFile = `${parentRoute.slice(1)}index.html`;
  check(exists(parentFile), `${code}: Science worksheet route is missing (${parentRoute})`);
  const routeHtml = exists(parentFile) ? read(parentFile) : "";
  if (exists(parentFile) && checkRouteAssets(routeHtml, `${code} Science worksheet`)) currentScienceRouteAssets += 1;
  check(!/topic-practice-[12]/i.test(routeHtml), `${code}: Science worksheet route must not expose Maths Topic Practice child links`);
  check(!exists(`${parentRoute.slice(1)}topic-practice-1/index.html`), `${code}: unexpected Science Topic Practice 1 child route exists`);
  check(!exists(`${parentRoute.slice(1)}topic-practice-2/index.html`), `${code}: unexpected Science Topic Practice 2 child route exists`);
  for (const id of ["worksheetRoot", "previewPdfButton"]) {
    check(new RegExp(`\\bid=["']${id}["']`, "i").test(routeHtml), `${code}: Science worksheet compatibility hook #${id} is missing`);
  }
  check(routeHtml.includes(`<title>${code} ${scienceBanks[code]?.title} Worksheet | SkillrHub</title>`), `${code}: Science route must retain its full legacy document title`);
  check(/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']*8 core[^"']*2 enrichment[^"']*["']/i.test(routeHtml), `${code}: Science route must retain full 8-core/2-enrichment metadata`);
  check(new RegExp(`href=["']/foundation/science/${code.toLowerCase()}[^"']*/["']`, "i").test(routeHtml), `${code}: Science route must retain its curriculum topic back-link`);
  check(routeHtml.includes(`href="/quiz/grade-k/science/${code.toLowerCase()}/practice/"`), `${code}: Science route must retain its online-practice link`);

  const result = renderSentinelRoute(code, parentRoute, { subject: "science", questionCount: 10, runLegacyRenderer: true });
  const output = `${routeHtml}\n${result.generatedHtml}`;
  check(
    result.appendedScripts.length === 1 && result.appendedScripts[0].src === `/quiz/assets/foundation-legacy-authored-worksheet.js?v=${assetCacheVersion}`,
    `${code}: scoped renderer must append exactly one correctly versioned compatibility script`
  );
  check(!/Topic Practice [12]|topic-practice-[12]|worksheet-sheet-tab/i.test(output), `${code}: Maths split UI leaked into the Science worksheet renderer`);
  check(result.document.title === `${code} Sentinel ${code} Worksheet | SkillrHub`, `${code}: compatibility renderer did not restore the full legacy document title`);
  check(result.elements.get("worksheetHeroTitle")?.textContent === `Sentinel ${code} Worksheet`, `${code}: compatibility renderer did not restore the full legacy visible title`);
  check(result.elements.get("worksheetEyebrow")?.textContent === `${code} • Foundation Science`, `${code}: compatibility renderer did not restore the legacy subject metadata`);
  check(
    result.description?.content === `${code} Foundation Science worksheet with 8 core class questions and a separate optional 2-question enrichment extension.`,
    `${code}: compatibility renderer did not restore the full legacy meta description`
  );
  check(result.elements.get("backToTopic")?.href === `/foundation/science/${code.toLowerCase()}-sentinel-topic/`, `${code}: compatibility renderer topic back-link is incorrect`);
  check(result.elements.get("openPractice")?.href === `/quiz/grade-k/science/${code.toLowerCase()}/practice/`, `${code}: compatibility renderer practice link is incorrect`);
  const renderedMeta = `${result.meta?.innerHTML || ""}${result.meta?.insertedHtml?.join("") || ""}`;
  check(renderedMeta.includes("Core sheet: 8 questions") && renderedMeta.includes("Optional extension: 2 enrichment"), `${code}: compatibility renderer did not restore 8-core/2-enrichment page metadata`);
  check(occurrences(result.generatedHtml, 'class="worksheet-question') === 10, `${code}: compatibility renderer must render exactly 10 question cards`);
  check(occurrences(result.generatedHtml, 'class="worksheet-question enrichment"') === 2, `${code}: compatibility renderer must render exactly 2 enrichment question cards`);
  check(result.generatedHtml.includes("Core Class Worksheet") && result.generatedHtml.includes("Optional Enrichment Extension"), `${code}: compatibility renderer must retain separate core and enrichment sheets`);
  check(result.generatedHtml.includes('<img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo">'), `${code}: compatibility renderer must use the actual SkillrHub logo`);
  const coreButton = result.elements.get("previewPdfButton");
  const extensionButton = result.created.find((element) => element.id === "previewExtensionPdfButton");
  check(coreButton?.id === "previewCorePdfButton" && typeof coreButton.listeners.click === "function" && coreButton.listenerCounts.click === 1, `${code}: exactly one core PDF preview handler must be restored`);
  check(extensionButton && typeof extensionButton.listeners.click === "function" && extensionButton.listenerCounts.click === 1, `${code}: exactly one enrichment PDF preview handler must be restored`);
  for (let number = 1; number <= 10; number += 1) {
    const prompt = `PROMPT_${code}_Q${number}`;
    const exactMatches = result.generatedHtml.match(new RegExp(`${prompt}(?!\\d)`, "g")) || [];
    check(exactMatches.length === 1, `${code}: Science regression renderer must retain ${prompt} exactly once`);
  }
}

await executeCachedScienceRebuildScenario();

console.log(`Foundation Maths topic-practice split: ${expectedCodes.length} codes`);
console.log(`Sheets: ${routeTotal}/24 child routes (${sheetOneQuestionTotal} Topic Practice 1 assignments; ${sheetTwoQuestionTotal} Topic Practice 2 assignments)`);
console.log(`Questions: ${canonicalQuestionTotal}/108 canonical; ${assignedQuestionTotal}/108 assigned exactly once`);
console.log(`Tier coverage: ${tierTotals["warm-up"]}/36 Warm-Up; ${tierTotals.core}/48 Core; ${tierTotals.challenge}/24 Challenge`);
console.log(`Science regression: ${expectedScienceCodes.length}/9 parent routes; ${scienceQuestionTotal}/90 questions; 0 child Topic Practice routes`);
console.log("Science execution scenarios: AC9SFU01 uncached static + cached/rebuilt loader path");
console.log(`Cache versions: ${currentMathsRouteAssets}/36 Maths routes; ${currentScienceRouteAssets}/9 Science routes at ${assetCacheVersion}`);

if (errors.length) {
  console.error(`FAIL: ${errors.length} Foundation Maths topic-practice split validation error${errors.length === 1 ? "" : "s"}`);
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}

console.log("PASS: all 12 canonical Maths banks retain 9 unique aligned questions, every first-5/last-4 child route is canonical and accessible, answer keys are sheet-only, width-aware choices wrap safely on desktop/mobile/print, links and SkillrHub branding remain, no QA badges ship, and all 9 Science worksheets retain their unsplit 10-question renderer.");
