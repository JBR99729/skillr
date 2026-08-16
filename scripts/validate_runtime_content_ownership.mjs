import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const errors = [];
const fail = (message) => errors.push(message);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function loadAssembledBank(code, bank) {
  const route = path.join("quiz", "year-3", "math", code.toLowerCase(), bank);
  const html = read(path.join(route, "index.html"));
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']*questions[^"']*\.js[^"']*)["'][^>]*>/gi)]
    .map((match) => match[1].split("?")[0].replace(/^\//, ""));
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  for (const script of scripts) {
    const file = path.join(root, script);
    if (!fs.existsSync(file)) {
      fail(`${code} ${bank}: loaded question script is missing: ${script}`);
      continue;
    }
    try {
      vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: script, timeout: 5000 });
    } catch (error) {
      fail(`${code} ${bank}: cannot evaluate ${script}: ${error.message}`);
    }
  }
  const questions = bank === "practice"
    ? sandbox.window.skillrPracticeQuestions
    : sandbox.window.skillrTestQuestions || sandbox.window.skillrExamQuestions;
  return Array.isArray(questions) ? questions : [];
}

const year3Root = path.join(root, "year3", "maths");
const customDecks = fs.readdirSync(year3Root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    slug: entry.name,
    topicFile: path.join("year3", "maths", entry.name, "index.html"),
    legacyDeckFile: path.join("year3", "maths", entry.name, "teacher-deck", "index.html"),
    fixedViewerFile: path.join("year3", "maths", entry.name, "teacher-slides", "index.html")
  }))
  .filter(({ legacyDeckFile, fixedViewerFile }) => fs.existsSync(path.join(root, legacyDeckFile)) || fs.existsSync(path.join(root, fixedViewerFile)));

const curriculumHub = read("year3/curriculum/maths/index.html");
const canonical = read("assets/year3-maths-v11-canonical.js");
const renderer = read("assets/year3-maths-v11-render.js");
const legacyRenderer = read("assets/year3-maths-render.js");
const replacementIndex = renderer.indexOf("main.innerHTML =");
const preservationIndex = renderer.indexOf("hasAuthoredExpandedTopic()");

if (replacementIndex < 0) fail("Year 3 renderer: main replacement point is missing from the audit surface");
if (preservationIndex < 0 || preservationIndex > replacementIndex) {
  fail("Year 3 renderer: authored-topic preservation must run before main.innerHTML replacement");
}

let fixedViewerCount = 0;
let legacyCustomDeckCount = 0;
for (const { slug, topicFile, legacyDeckFile, fixedViewerFile } of customDecks) {
  if (!fs.existsSync(path.join(root, topicFile))) continue;
  const topic = read(topicFile);
  const code = topic.match(/curriculumCode\s*:\s*["']([A-Z0-9]+)["']/i)?.[1]?.toUpperCase()
    || topic.match(/\b(AC9M3[A-Z0-9]+)\b/)?.[1]?.toUpperCase();

  if (!code) {
    fail(`${topicFile}: cannot identify curriculum code for teacher slides`);
    continue;
  }

  const usesFixedViewer = topic.includes('href="teacher-slides/"') || topic.includes("href='teacher-slides/'");
  if (usesFixedViewer) {
    fixedViewerCount++;
    if (!fs.existsSync(path.join(root, fixedViewerFile))) fail(`${code}: fixed teacher-slides viewer target is missing`);
    else {
      const viewer = read(fixedViewerFile);
      if (!viewer.includes("fixed-slide-viewer")) fail(`${code}: fixed teacher-slides route is not using the protected viewer`);
      if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) fail(`${code}: fixed teacher-slides viewer exposes a direct PPTX/PDF link`);
    }
  } else if (fs.existsSync(path.join(root, legacyDeckFile))) {
    legacyCustomDeckCount++;
    const route = `/year3/maths/${slug}/teacher-deck/`;
    if (!topic.includes("teacher-deck/")) fail(`${code}: topic page does not link its custom teacher deck`);
    if (!curriculumHub.includes(`href="${route}"`)) fail(`${code}: curriculum hub does not link its custom teacher deck`);
    if (!canonical.includes(`"${code}"`) || !canonical.includes("CUSTOM_TEACHER_DECK_CODES.has(code)")) {
      fail(`${code}: canonical resourceLinks can overwrite the custom teacher deck route`);
    }
    if (!legacyRenderer.includes(`"${code}"`) || !legacyRenderer.includes("CUSTOM_TEACHER_DECK_CODES.has(code)")) {
      fail(`${code}: legacy renderer can overwrite the authored custom-deck topic`);
    }
  }

  for (const [bank, minimum] of [["practice", 24], ["test", 16]]) {
    const questions = loadAssembledBank(code, bank);
    const ids = questions.map((question) => question?.id).filter(Boolean);
    if (questions.length < minimum) fail(`${code} ${bank}: assembled bank has ${questions.length}; minimum is ${minimum}`);
    if (ids.length !== questions.length) fail(`${code} ${bank}: every assembled question must have an ID`);
    if (new Set(ids).size !== ids.length) fail(`${code} ${bank}: assembled bank contains duplicate IDs`);
  }
}

const legacyReplaceAt = legacyRenderer.indexOf("main.innerHTML =");
const legacyPreserveAt = legacyRenderer.indexOf("CUSTOM_TEACHER_DECK_CODES.has(code)");
if (legacyReplaceAt < 0 || legacyPreserveAt < 0 || legacyPreserveAt > legacyReplaceAt) {
  fail("Year 3 legacy renderer: authored-topic preservation must run before main.innerHTML replacement");
}

const replacingRenderers = [
  "assets/foundation-v1.1-render.js",
  "assets/year3-maths-v11-render.js"
];
for (const file of replacingRenderers) {
  const source = read(file);
  const replaceAt = source.indexOf("main.innerHTML =");
  const preserveAt = source.indexOf("enhanceStaticTopic");
  if (replaceAt >= 0 && (preserveAt < 0 || preserveAt > replaceAt)) {
    fail(`${file}: replacing renderer must expose static-topic preservation before replacement`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`PASS runtime content ownership: ${fixedViewerCount} fixed Year 3 teacher viewer(s), ${legacyCustomDeckCount} legacy custom deck(s), assessment-bank identity and static-topic preservation verified.`);
