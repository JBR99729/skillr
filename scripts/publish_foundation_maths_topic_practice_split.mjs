#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteOrigin = "https://skillrhub.com";
const splitAssetVersion = "20260814-topic-practice-split2";

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function loadCanonicalMathsRegistry() {
  const context = vm.createContext({ window: {}, console });
  const sources = [
    "assets/foundation-elaboration-map.js",
    "assets/foundation-maths-data-number.js",
    "assets/foundation-maths-data-other.js",
    "assets/foundation-canonical-v1.1.js"
  ];

  for (const source of sources) {
    vm.runInContext(read(source), context, { filename: source });
  }

  const data = context.window.SkillrFoundationMathsData;
  const builder = context.window.SkillrFoundationCanonical;
  if (!data || typeof builder?.buildCollection !== "function") {
    throw new Error("Could not load the canonical Foundation Maths registry");
  }

  const collection = builder.buildCollection(data, {
    subject: "Maths",
    year: "Foundation",
    pathSegment: "maths",
    quizSubject: "math"
  });
  const codes = Object.keys(collection)
    .filter((code) => /^AC9MF[A-Z]*\d{2}$/.test(code))
    .sort();

  if (codes.length !== 12) {
    throw new Error(`Expected 12 canonical Foundation Maths codes, found ${codes.length}`);
  }

  return codes.map((code) => ({ code, spec: collection[code] }));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[character]);
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Parent worksheet is missing ${label}`);
  return html.replace(pattern, replacement);
}

function updateSharedAssets(html) {
  return html
    .replace(
      /\/quiz\/assets\/foundation-authored-worksheet\.css\?v=[^"<]+/g,
      `/quiz/assets/foundation-authored-worksheet.css?v=${splitAssetVersion}`
    )
    .replace(
      /\/quiz\/assets\/foundation-maths-authored-worksheet\.js\?v=[^"<]+/g,
      `/quiz/assets/foundation-maths-authored-worksheet.js?v=${splitAssetVersion}`
    );
}

function addPublicBrandLogo(html) {
  if (/<div class="brandmark"><img\b[^>]*src="\/icons\/skillrhub-mark\.svg"/i.test(html)) return html;
  return replaceRequired(
    html,
    /<div class="brandmark">SkillrHub\s*<span>F–10<\/span><\/div>/,
    '<div class="brandmark"><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo">SkillrHub <span>F–10</span></div>',
    "public SkillrHub logo"
  );
}

function addLegacyCompatibilityHooks(html) {
  return html
    .replace(/<p class="eyebrow">/, '<p class="eyebrow" id="worksheetEyebrow">')
    .replace(/<h1>/, '<h1 id="worksheetHeroTitle">')
    .replace(/<a href="([^"]+)">Back to topic<\/a>/, '<a id="backToTopic" href="$1">Back to topic</a>')
    .replace(/<a href="([^"]+)">Open practice<\/a>/, '<a id="openPractice" href="$1">Open practice</a>');
}

function buildChildPage(parentHtml, code, spec, sheetNumber) {
  const codeLower = code.toLowerCase();
  const sheetLabel = `Topic Practice ${sheetNumber}`;
  const questionCount = sheetNumber === 1 ? 5 : 4;
  const tierSummary = sheetNumber === 1
    ? "3 Warm-Up • 2 Core"
    : "2 Core • 2 Challenge";
  const route = `/quiz/grade-k/math/${codeLower}/worksheet/topic-practice-${sheetNumber}/`;
  const topicUrl = spec.resourceLinks?.topic || `/foundation/maths/${spec.slug}/`;
  const title = `${code} ${spec.title} — ${sheetLabel} | SkillrHub`;
  const description = `${code} ${spec.title} ${sheetLabel}: ${questionCount} Foundation Maths questions from the aligned 9-question topic set, with a matching answer key.`;
  const active = (number) => number === sheetNumber ? ' aria-current="page"' : "";

  let html = addPublicBrandLogo(updateSharedAssets(parentHtml));
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, "document title");
  html = replaceRequired(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`, "meta description");
  html = replaceRequired(
    html,
    /<link rel="canonical" id="worksheetCanonical" href="[^"]*">/,
    `<link rel="canonical" id="worksheetCanonical" href="${siteOrigin}${route}">`,
    "canonical link"
  );
  html = replaceRequired(
    html,
    /<div class="brandbar"><div class="brandmark"><img\b[^>]*src="\/icons\/skillrhub-mark\.svg"[^>]*>SkillrHub <span>F–10<\/span><\/div><small>[\s\S]*?<\/small><\/div>/,
    `<div class="brandbar"><div class="brandmark"><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo">SkillrHub <span>F–10</span></div><small>Foundation Maths • ${sheetLabel}</small></div>`,
    "brand bar"
  );
  html = replaceRequired(
    html,
    /<p class="eyebrow" id="worksheetEyebrow">[\s\S]*?<\/p>/,
    `<p class="eyebrow" id="worksheetEyebrow">${code} • ${escapeHtml(spec.title)}</p>`,
    "worksheet eyebrow"
  );
  html = replaceRequired(
    html,
    /<h1 id="worksheetHeroTitle">[\s\S]*?<\/h1>/,
    `<h1 id="worksheetHeroTitle">${sheetLabel}</h1>`,
    "worksheet heading"
  );
  html = replaceRequired(
    html,
    /<div class="worksheet-meta">[\s\S]*?<\/div>/,
    `<div class="worksheet-meta"><span>${questionCount} questions</span><span>${tierSummary}</span><span>Matching answer key</span><span>US Letter portrait</span></div>`,
    "worksheet metadata"
  );
  html = replaceRequired(
    html,
    /<div class="worksheet-actions">[\s\S]*?<\/div>/,
    `<div class="worksheet-actions">
        <button class="primary" id="previewPdfButton" type="button">Preview PDF worksheet</button>
        <a id="backToTopic" href="${escapeHtml(topicUrl)}">Back to topic</a>
        <a id="openPractice" href="/quiz/grade-k/math/${codeLower}/practice/">Open practice</a>
      </div>
      <nav class="worksheet-sheet-tabs" aria-label="Choose a topic practice sheet">
        <a class="worksheet-sheet-tab" href="/quiz/grade-k/math/${codeLower}/worksheet/topic-practice-1/"${active(1)}>Topic Practice 1 <small>Questions 1–5</small></a>
        <a class="worksheet-sheet-tab" href="/quiz/grade-k/math/${codeLower}/worksheet/topic-practice-2/"${active(2)}>Topic Practice 2 <small>Questions 6–9</small></a>
      </nav>`,
    "worksheet actions"
  );
  html = replaceRequired(
    html,
    /<div class="worksheet-print-tip">[\s\S]*?<\/div>/,
    `<div class="worksheet-print-tip">Print ${sheetLabel} for students. Keep its matching answer key as the teacher copy.</div>`,
    "print guidance"
  );
  for (const requiredScript of [
    "/quiz/assets/foundation-maths-authored-worksheet-data.js",
    "/quiz/assets/foundation-maths-topic-module-data-v2.js",
    "/quiz/assets/foundation-maths-authored-worksheet.js",
    "/pwa-register.js"
  ]) {
    if (!html.includes(requiredScript)) {
      throw new Error(`${code} parent worksheet is missing required script ${requiredScript}`);
    }
  }

  return html;
}

const registry = loadCanonicalMathsRegistry();
const written = [];

for (const { code, spec } of registry) {
  const codeLower = code.toLowerCase();
  const parentRelative = `quiz/grade-k/math/${codeLower}/worksheet/index.html`;
  const parentPath = path.join(root, parentRelative);
  if (!fs.existsSync(parentPath)) throw new Error(`Missing parent worksheet route: ${parentRelative}`);
  const parentHtml = fs.readFileSync(parentPath, "utf8");
  const updatedParent = addPublicBrandLogo(updateSharedAssets(parentHtml));
  fs.writeFileSync(parentPath, updatedParent, "utf8");

  for (const sheetNumber of [1, 2]) {
    const childRelative = `quiz/grade-k/math/${codeLower}/worksheet/topic-practice-${sheetNumber}/index.html`;
    const childPath = path.join(root, childRelative);
    fs.mkdirSync(path.dirname(childPath), { recursive: true });
    fs.writeFileSync(childPath, buildChildPage(updatedParent, code, spec, sheetNumber), "utf8");
    written.push(childRelative);
  }
}

const scienceRoot = path.join(root, "quiz/grade-k/science");
const scienceWorksheetRoutes = fs.readdirSync(scienceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^ac9sf[a-z0-9]+$/i.test(entry.name))
  .map((entry) => path.join(scienceRoot, entry.name, "worksheet/index.html"))
  .filter((routePath) => fs.existsSync(routePath));

if (scienceWorksheetRoutes.length !== 9) {
  throw new Error(`Expected 9 Foundation Science worksheet routes, found ${scienceWorksheetRoutes.length}`);
}

for (const routePath of scienceWorksheetRoutes) {
  const html = fs.readFileSync(routePath, "utf8");
  if (!html.includes("/quiz/assets/foundation-maths-authored-worksheet.js")) {
    throw new Error(`Foundation Science route does not use the shared renderer: ${path.relative(root, routePath)}`);
  }
  fs.writeFileSync(routePath, addLegacyCompatibilityHooks(updateSharedAssets(html)), "utf8");
}

console.log(JSON.stringify({
  subject: "Foundation Maths",
  codes: registry.length,
  topicPractice1Routes: registry.length,
  topicPractice2Routes: registry.length,
  totalRoutes: written.length,
  scienceCompatibilityRoutes: scienceWorksheetRoutes.length,
  routes: written
}, null, 2));
