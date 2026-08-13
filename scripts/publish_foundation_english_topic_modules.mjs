#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const siteOrigin = "https://skillrhub.com";
const version = "20260814-foundation-english-topic2";
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, content) => {
  const destination = path.join(root, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content, "utf8");
};
const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"
})[character]);

const context = vm.createContext({ window: {} });
new vm.Script(read("assets/foundation-english-data.js"), { filename: "assets/foundation-english-data.js" }).runInContext(context);
const units = context.window.SkillrFoundationEnglishData;
const codes = Object.keys(units).sort();
if (codes.length !== 29) throw new Error(`Expected 29 Foundation English codes, found ${codes.length}`);

const topicOverlays = [
  `/assets/foundation-english-topic-module-la-v2.js?v=${version}`,
  `/assets/foundation-english-topic-module-le-ly1-v2.js?v=${version}`,
  `/assets/foundation-english-topic-module-ly2-v2.js?v=${version}`
];
const topicCoreEnhancer = `/assets/foundation-english-topic-module-core-v2.js?v=${version}`;
const classroomEnhancer = `/assets/foundation-english-classroom-v2.js?v=${version}`;
const topicRenderer = `/assets/foundation-english-render.js?v=${version}`;
const worksheetOverlays = [
  `/quiz/assets/foundation-english-topic-module-la-data-v2.js?v=${version}`,
  `/quiz/assets/foundation-english-topic-module-le-ly1-data-v2.js?v=${version}`,
  `/quiz/assets/foundation-english-topic-module-ly2-data-v2.js?v=${version}`,
  `/quiz/assets/foundation-english-topic-module-balance-v2.js?v=${version}`
];

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Missing ${label}`);
  return html.replace(pattern, replacement);
}

function installTopicOverlays(file) {
  let html = read(file);
  for (const src of topicOverlays) {
    const base = src.split("?")[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(new RegExp(`<script src="${base}[^"]*"></script>\\n?`, "g"), "");
  }
  html = html.replace(/<script src="\/assets\/foundation-english-topic-module-core-v2\.js[^"]*"><\/script>\n?/g, "");
  html = html.replace(/<script src="\/assets\/foundation-english-classroom-v2\.js[^"]*"><\/script>\n?/g, "");
  const overlayTags = topicOverlays.map((src) => `<script src="${src}"></script>`).join("\n");
  html = replaceRequired(
    html,
    /<script src="\/assets\/foundation-canonical-v1\.1\.js[^>]*><\/script>/,
    `${overlayTags}\n<script src="/assets/foundation-canonical-v1.1.js?v=${version}"></script>\n<script src="${topicCoreEnhancer}"></script>`,
    `${file}: canonical builder script`
  );
  html = html
    .replace(/\/assets\/foundation-ac9efla01-lesson\.js\?v=[^"<]+/g, `/assets/foundation-ac9efla01-lesson.js?v=${version}`)
    .replace(/\/assets\/foundation-ac9efla01-classroom\.js\?v=[^"<]+/g, `/assets/foundation-ac9efla01-classroom.js?v=${version}`)
    .replace(/\/assets\/foundation-v1\.1-render\.js\?v=[^"<]+/g, `/assets/foundation-v1.1-render.js?v=${version}`)
    .replace(/\/assets\/foundation-classroom-rollout\.js\?v=[^"<]+/g, `/assets/foundation-classroom-rollout.js?v=${version}`);
  if (file === "worksheets/foundation/english/teacher-slides/live.html") {
    html = replaceRequired(html, /<\/head>/, `<script src="${classroomEnhancer}"></script>\n</head>`, `${file}: head close`);
  } else {
    html = replaceRequired(
      html,
      /<script src="\/assets\/foundation-english-render\.js[^>]*><\/script>/,
      `<script src="${classroomEnhancer}"></script>\n<script src="${topicRenderer}"></script>`,
      `${file}: English topic renderer`
    );
  }
  write(file, html);
}

function updatedHead(parentHtml, code, unit, route, sheetNumber = null) {
  const sheetTitle = sheetNumber ? `Topic Practice ${sheetNumber}` : "Topic Practice Sheets";
  const title = `${code} ${unit.title} — ${sheetTitle} | SkillrHub`;
  const description = sheetNumber
    ? `${code} ${unit.title} Topic Practice ${sheetNumber}, one of two aligned printable Foundation English sheets with its own answer key.`
    : `${code} ${unit.title} Foundation English practice sheets with 9 aligned questions across Warm-Up, Core and Challenge tiers.`;
  let html = parentHtml;
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, `${code}: title`);
  html = replaceRequired(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`, `${code}: description`);
  html = replaceRequired(
    html,
    /<link rel="canonical"(?: id="worksheetCanonical")? href="[^"]*">/,
    `<link rel="canonical" id="worksheetCanonical" href="${siteOrigin}${route}">`,
    `${code}: canonical`
  );
  html = html.replace(/<link rel="stylesheet" href="\/quiz\/assets\/foundation-authored-worksheet\.css[^>]*>\s*/g, "");
  html = replaceRequired(
    html,
    /<\/head>/,
    `<link rel="stylesheet" href="/quiz/assets/foundation-authored-worksheet.css?v=${version}">\n</head>`,
    `${code}: head close`
  );
  return html;
}

function worksheetBody(code, unit, sheetNumber = null) {
  const lower = code.toLowerCase();
  const sheetTitle = sheetNumber ? `Topic Practice ${sheetNumber}` : "Topic Practice Sheets";
  const questionSummary = sheetNumber === 1 ? "Questions 1–5" : sheetNumber === 2 ? "Questions 6–9" : "9 questions across two sheets";
  const active = (number) => number === sheetNumber ? ' aria-current="page"' : "";
  const topicUrl = `/foundation/english/${unit.slug}/`;
  const dataScripts = worksheetOverlays.map((src) => `  <script src="${src}"></script>`).join("\n");
  return `<body>
  <div class="worksheet-shell">
    <nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/foundation/curriculum/english/">Foundation English</a><a href="${topicUrl}">${code} topic</a></nav>
    <header class="worksheet-hero">
      <div class="brandbar"><div class="brandmark"><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo">SkillrHub <span>F–10</span></div><small>Foundation English • ${sheetTitle}</small></div>
      <p class="eyebrow" id="worksheetEyebrow">${code} • ${escapeHtml(unit.title)}</p>
      <h1 id="worksheetHeroTitle">${sheetTitle}</h1>
      <div class="worksheet-meta"><span>${questionSummary}</span><span>3 Warm-Up • 4 Core • 2 Challenge overall</span><span>Sheet-only answer key</span><span>US Letter portrait</span></div>
      <div class="worksheet-actions"><button class="primary" id="previewPdfButton" type="button">Preview practice sheet</button><a id="backToTopic" href="${topicUrl}">Back to topic</a><a id="openPractice" href="/quiz/grade-k/english/${lower}/practice/">Open practice</a></div>
      <nav class="worksheet-sheet-tabs" aria-label="Choose a topic practice sheet"><a class="worksheet-sheet-tab" href="/quiz/grade-k/english/${lower}/worksheet/topic-practice-1/"${active(1)}>Topic Practice 1 <small>Questions 1–5</small></a><a class="worksheet-sheet-tab" href="/quiz/grade-k/english/${lower}/worksheet/topic-practice-2/"${active(2)}>Topic Practice 2 <small>Questions 6–9</small></a></nav>
      <div class="worksheet-print-tip">Print the selected practice sheet for students. Keep its matching answer key as the teacher copy.</div>
    </header>
    <main id="worksheetRoot"><section class="worksheet-paper"><p>Loading ${sheetTitle}…</p></section></main>
  </div>
  <script src="/assets/foundation-english-data.js?v=${version}"></script>
${dataScripts}
  <script src="/assets/foundation-english-worksheet-page.js?v=${version}"></script>
  <script src="/pwa-register.js"></script>
</body>`;
}

function buildWorksheetPage(parentHtml, code, unit, sheetNumber = null) {
  const lower = code.toLowerCase();
  const route = sheetNumber
    ? `/quiz/grade-k/english/${lower}/worksheet/topic-practice-${sheetNumber}/`
    : `/quiz/grade-k/english/${lower}/worksheet/`;
  let html = updatedHead(parentHtml, code, unit, route, sheetNumber);
  html = replaceRequired(html, /<body[\s\S]*?<\/body>/, worksheetBody(code, unit, sheetNumber), `${code}: body`);
  return html;
}

const childRoutes = [];
for (const code of codes) {
  const unit = units[code];
  installTopicOverlays(`foundation/english/${unit.slug}/index.html`);

  const parentRoute = `quiz/grade-k/english/${code.toLowerCase()}/worksheet/index.html`;
  const originalParent = read(parentRoute);
  const updatedParent = buildWorksheetPage(originalParent, code, unit);
  write(parentRoute, updatedParent);

  for (const sheetNumber of [1, 2]) {
    const childRoute = `quiz/grade-k/english/${code.toLowerCase()}/worksheet/topic-practice-${sheetNumber}/index.html`;
    write(childRoute, buildWorksheetPage(originalParent, code, unit, sheetNumber));
    childRoutes.push(childRoute);
  }
}

installTopicOverlays("worksheets/foundation/english/teacher-slides/live.html");

console.log(JSON.stringify({
  subject: "Foundation English",
  codes: codes.length,
  parentWorksheetRoutes: codes.length,
  topicPractice1Routes: codes.length,
  topicPractice2Routes: codes.length,
  childRoutes: childRoutes.length
}, null, 2));
