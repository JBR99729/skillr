#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};
const wordCount = (value) => (
  String(value || "").match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []
).length;
const proseFor = (notes) => [
  notes.big_idea,
  ...(notes.key_rules || []),
  notes.memory_clue
].join(" ");

const dataContext = vm.createContext({ window: {} });
new vm.Script(read("quiz/assets/foundation-maths-pre-module-notes.js"), {
  filename: "quiz/assets/foundation-maths-pre-module-notes.js"
}).runInContext(dataContext);
const records = dataContext.window.SkillrPreModuleNotes || {};

const document = {
  getElementById: () => null,
  querySelector: () => null,
  addEventListener() {},
  documentElement: {},
  head: { appendChild() {} },
  body: { dataset: {} },
  createElement: () => ({ setAttribute() {} })
};
class MutationObserver {
  observe() {}
  disconnect() {}
}
const canonicalContext = vm.createContext({
  window: {},
  document,
  console,
  URLSearchParams,
  location: { search: "", pathname: "/" },
  MutationObserver,
  setTimeout: () => 0
});
const runCanonicalFile = (relativePath) => {
  new vm.Script(read(relativePath), { filename: relativePath }).runInContext(canonicalContext);
};
[
  "assets/foundation-maths-data-number.js",
  "assets/foundation-maths-data-other.js",
  "assets/foundation-maths-topic-module-v2.js",
  "assets/foundation-ac9mfn01-visual-elaborations.js",
  "assets/foundation-ac9mfn02-visual-elaborations.js",
  "assets/foundation-maths-elaborations-n03-n05.js",
  "assets/foundation-maths-elaborations-n06-a01-m01.js",
  "assets/foundation-maths-elaborations-m02-sp01-sp02.js",
  "assets/foundation-elaboration-map.js",
  "assets/foundation-canonical-v1.1.js"
].forEach(runCanonicalFile);

const foundationData = canonicalContext.window.SkillrFoundationMathsData;
const canonical = canonicalContext.window.SkillrFoundationCanonical;
const specs = canonical.buildCollection(foundationData, {
  subject: "Maths",
  year: "Foundation",
  pathSegment: "maths",
  quizSubject: "math"
});
const codes = Object.keys(foundationData).filter((code) => /^AC9MF/.test(code)).sort();
const recordCodes = Object.keys(records).sort();

assert(codes.length === 12, `Expected 12 completed Foundation Maths codes, found ${codes.length}`);
assert(JSON.stringify(recordCodes) === JSON.stringify(codes), "Pre-module note coverage must exactly match all 12 completed Foundation Maths codes");

const seenBigIdeas = new Set();
const seenMemoryClues = new Set();
const counts = {};

for (const code of codes) {
  const record = records[code];
  const spec = specs[code];
  const notes = record?.pre_module_notes;
  assert(record?.code === code, `${code}: record code mismatch`);
  assert(record?.topic === spec?.title, `${code}: topic must match the canonical Teacher Slide Deck title`);
  assert(notes && typeof notes === "object", `${code}: missing pre_module_notes`);
  if (!notes) continue;

  assert(Number.isInteger(notes.target_read_time_seconds), `${code}: target_read_time_seconds must be an integer`);
  assert(notes.target_read_time_seconds >= 60 && notes.target_read_time_seconds <= 75, `${code}: target read time must be 60–75 seconds`);
  assert(notes.title === "Read This Before You Start!", `${code}: exact title required`);
  assert(typeof notes.big_idea === "string" && notes.big_idea.trim(), `${code}: one Big Idea sentence required`);
  assert((notes.big_idea.match(/[.!?]+(?=\s|$|[”’"'])/g) || []).length === 1, `${code}: Big Idea must be one sentence`);
  assert(Array.isArray(notes.key_rules) && notes.key_rules.length >= 2 && notes.key_rules.length <= 3, `${code}: requires 2 or 3 Key Rules`);
  assert(notes.key_rules?.every((rule) => typeof rule === "string" && rule.trim()), `${code}: every Key Rule must contain prose`);
  assert(typeof notes.memory_clue === "string" && notes.memory_clue.trim(), `${code}: Visual Memory Clue required`);
  assert(/^Picture\b/.test(notes.memory_clue), `${code}: Visual Memory Clue must give a concrete picture cue`);

  const prose = proseFor(notes);
  const count = wordCount(prose);
  const wordsPerMinute = count / (notes.target_read_time_seconds / 60);
  counts[code] = count;
  assert(count >= 120 && count <= 160, `${code}: actual prose word count ${count}, expected 120–160`);
  assert(wordsPerMinute >= 90 && wordsPerMinute <= 160, `${code}: target read time implies an implausible ${Math.round(wordsPerMinute)} words per minute`);
  assert(!/[<>≤≥=+×÷]/u.test(prose), `${code}: symbolic notation must be verbalised for read-aloud`);
  assert(!/<[^>]+>/.test(prose), `${code}: prose must not contain markup`);
  assert(!/\b(?:student|learner)\s+(?:can|should|will)\b/i.test(prose), `${code}: note must speak directly to the student, not about the student`);

  const normalisedBigIdea = notes.big_idea.toLowerCase().replace(/\W+/g, " ").trim();
  const normalisedMemoryClue = notes.memory_clue.toLowerCase().replace(/\W+/g, " ").trim();
  assert(!seenBigIdeas.has(normalisedBigIdea), `${code}: duplicated Big Idea`);
  assert(!seenMemoryClues.has(normalisedMemoryClue), `${code}: duplicated Visual Memory Clue`);
  seenBigIdeas.add(normalisedBigIdea);
  seenMemoryClues.add(normalisedMemoryClue);

  const slideIds = new Set((spec?.slides || []).map((slide) => slide.id));
  const modelIds = new Set((spec?.models || []).map((model) => model.id));
  const sourceSlides = record.source?.teacher_slide_ids || [];
  const sourceModels = record.source?.model_ids || [];
  assert(sourceSlides.includes("slide-model") && sourceSlides.includes("slide-application"), `${code}: sources must include the final central and application Teacher Slides`);
  assert(sourceModels.includes("main-model") && sourceModels.includes("application-model"), `${code}: sources must include the canonical central and application models`);
  assert(sourceSlides.every((id) => slideIds.has(id)), `${code}: every Teacher Slide source id must resolve in the final deck`);
  assert(sourceModels.every((id) => modelIds.has(id)), `${code}: every model source id must resolve in the final deck`);
  if (code === "AC9MFST01") {
    const safeSlides = new Set(["slide-model", "slide-application", "slide-elaboration-e1", "slide-elaboration-e2", "slide-elaboration-e3"]);
    const safeModels = new Set(["main-model", "application-model", "elaboration-model-e1", "elaboration-model-e2", "elaboration-model-e3"]);
    assert(sourceSlides.every((id) => safeSlides.has(id)), `${code}: source slides must avoid the known E4–E7 rich-elaboration binding mismatch`);
    assert(sourceModels.every((id) => safeModels.has(id)), `${code}: source models must avoid the known E4–E7 rich-elaboration binding mismatch`);
  }

  for (const mode of ["practice", "test"]) {
    const route = `quiz/grade-k/math/${code.toLowerCase()}/${mode}/index.html`;
    const html = read(route);
    const configMatch = html.match(/window\.quizConfig=(\{.*?\});<\/script>/s);
    assert(configMatch, `${code} ${mode}: quiz config missing`);
    if (!configMatch) continue;
    const config = JSON.parse(configMatch[1]);
    assert(config.skillCode === code, `${code} ${mode}: skill code mismatch`);
    assert(config.preModuleNotesRequired === true, `${code} ${mode}: mandatory pre-module gate not enabled`);
    assert(config.preReadSeconds === 0, `${code} ${mode}: artificial countdown must be disabled`);
    const expectedQuestionCount = mode === "practice" ? 8 : 12;
    assert(config.maxQuestions === expectedQuestionCount, `${code} ${mode}: expected ${expectedQuestionCount}-question live launch`);
    assert(config.questionCycle === true && config.shuffleQuestions === true, `${code} ${mode}: existing bank selection behaviour changed`);
    assert((html.match(/foundation-maths-pre-module-notes\.js\?v=20260814-1/g) || []).length === 1, `${code} ${mode}: shared note source must be loaded exactly once`);
    assert(html.includes("/quiz/assets/script.js?v=114"), `${code} ${mode}: shared gate renderer version missing`);
    assert(html.includes("/quiz/assets/style.css?v=114"), `${code} ${mode}: responsive gate style version missing`);

    const questionFile = `quiz/grade-k/math/${code.toLowerCase()}/${mode}/questions.js`;
    const questionWindow = { location: { pathname: `/${route.replace(/index\.html$/, "")}` } };
    new vm.Script(read(questionFile), { filename: questionFile }).runInNewContext({ window: questionWindow });
    const bank = questionWindow.quizQuestions || (
      mode === "practice"
        ? questionWindow.skillrPracticeQuestions
        : questionWindow.skillrTestQuestions || questionWindow.skillrExamQuestions
    );
    const expectedBankLength = mode === "practice" ? 56 : 24;
    assert(Array.isArray(bank) && bank.length === expectedBankLength, `${code} ${mode}: expected preserved ${expectedBankLength}-question source bank`);
  }

  for (const worksheetRoute of [
    "index.html",
    "topic-practice-1/index.html",
    "topic-practice-2/index.html"
  ]) {
    const relativePath = `quiz/grade-k/math/${code.toLowerCase()}/worksheet/${worksheetRoute}`;
    assert(fs.existsSync(path.join(root, relativePath)), `${code}: expected printable route ${worksheetRoute}`);
    if (!fs.existsSync(path.join(root, relativePath))) continue;
    const worksheet = read(relativePath);
    assert(!worksheet.includes("foundation-maths-pre-module-notes.js"), `${code} ${worksheetRoute}: refresher must not load in printable Topic Practice`);
    assert(!worksheet.includes("pre_module_notes"), `${code} ${worksheetRoute}: refresher must not render in printable Topic Practice`);
  }
}

const engine = read("quiz/assets/script.js");
const styles = read("quiz/assets/style.css");
const serviceWorker = read("service-worker.js");
for (const marker of [
  "buildPreModuleScreen",
  "showPreModuleScreen",
  "preModuleContinueButton",
  "pre-module-prose",
  "Read this screen aloud",
  "Continue to Practice",
  "Continue to Test",
  "title.tabIndex = -1",
  "getPreModuleSpeechText()"
]) {
  assert(engine.includes(marker), `Shared renderer missing ${marker}`);
}
assert(engine.includes('"#preModuleScreen [data-pre-module-speech]"'), "Read-aloud must use the same visible prose nodes");
assert((engine.match(/dataset\.preModuleSpeech = "true"/g) || []).length === 3, "Big Idea, Key Rules and Visual Memory Clue must be marked as the visible read-aloud source");
assert(!engine.slice(engine.indexOf("function showPreModuleScreen"), engine.indexOf("function updateReadAloudControl")).includes("setInterval"), "Pre-module screen must not use a countdown");
for (const marker of [
  ".pre-module-card",
  ".pre-module-section",
  ".pre-module-actions",
  "@media (max-width: 520px)"
]) {
  assert(styles.includes(marker), `Responsive/accessibility styles missing ${marker}`);
}
assert(/\.pre-module-section p,\s*\.pre-module-section li\s*\{[^}]*overflow-wrap:\s*anywhere/s.test(styles), "Visible refresher prose must wrap instead of truncating");
assert(!/\.pre-module-card\s*\{[^}]*overflow:\s*hidden/s.test(styles), "Refresher card must not hide overflowing content");
assert(serviceWorker.includes('url.pathname.endsWith("-pre-module-notes.js")'), "Mandatory note data must use the critical network-first service-worker path");

if (errors.length) {
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}

console.log(`Foundation Maths pre-module notes: ${codes.length}/${codes.length} passing`);
console.log(`Prose word counts: ${Object.entries(counts).map(([code, count]) => `${code} ${count}`).join(", ")}`);
console.log("PASS: schema, 120–160 words, 60–75 seconds, final-deck source ids, shared Practice/Test source, mandatory no-timer gate, preserved live bank selection, read-aloud parity, responsive markers, worksheet exclusion and service-worker freshness.");
