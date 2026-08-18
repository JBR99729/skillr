#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));
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

const noteContext = vm.createContext({ window: {} });
new vm.Script(read("quiz/assets/year3-maths-pre-module-notes.js"), {
  filename: "quiz/assets/year3-maths-pre-module-notes.js"
}).runInContext(noteContext);
const records = noteContext.window.SkillrPreModuleNotes || {};

const dataContext = vm.createContext({ window: {} });
for (const name of ["base", "n1", "n2", "n3", "a", "m1", "m2", "sp", "st", "p"]) {
  const relativePath = `assets/year3-maths-data-${name}.js`;
  new vm.Script(read(relativePath), { filename: relativePath }).runInContext(dataContext);
}
const units = dataContext.window.SkillrYear3MathsData || {};
const manifest = JSON.parse(read("curriculum-question-banks/manifest.json"));
const codes = manifest.units
  .filter((unit) => unit.level === "Year 3" && unit.subject === "Mathematics")
  .map((unit) => unit.code)
  .sort();
const recordCodes = Object.keys(records).sort();
const counts = {};
const seenBigIdeas = new Set();
const seenMemoryClues = new Set();
const requiredSlideRoles = [
  "learning-intention",
  "concept-refresher",
  "guided-example",
  "quick-check"
];

assert(codes.length === 23, `Expected 23 completed Year 3 Maths codes, found ${codes.length}`);
assert(
  JSON.stringify(recordCodes) === JSON.stringify(codes),
  "Pre-module note coverage must exactly match the 23 completed Year 3 Maths codes"
);

for (const code of codes) {
  const unit = units[code];
  const record = records[code];
  const notes = record?.pre_module_notes;
  assert(unit, `${code}: canonical connected topic module missing`);
  assert(record?.code === code, `${code}: record code mismatch`);
  assert(record?.topic === unit?.title, `${code}: topic must match the final Teacher Slide Deck title`);
  assert(notes && typeof notes === "object", `${code}: missing pre_module_notes`);
  if (!unit || !notes) continue;

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
  assert(wordsPerMinute >= 90 && wordsPerMinute <= 160, `${code}: target time implies an implausible ${Math.round(wordsPerMinute)} words per minute`);
  assert(!/[0-9$%<>≤≥=+×÷]/u.test(prose), `${code}: notation and formulas must be verbalised for read-aloud`);
  assert(!/<[^>]+>/.test(prose), `${code}: prose must not contain markup`);
  assert(!/\b(?:student|learner)\s+(?:can|should|will)\b/i.test(prose), `${code}: note must speak directly to the student`);

  const normalisedBigIdea = notes.big_idea.toLowerCase().replace(/\W+/g, " ").trim();
  const normalisedMemoryClue = notes.memory_clue.toLowerCase().replace(/\W+/g, " ").trim();
  assert(!seenBigIdeas.has(normalisedBigIdea), `${code}: duplicated Big Idea`);
  assert(!seenMemoryClues.has(normalisedMemoryClue), `${code}: duplicated Visual Memory Clue`);
  seenBigIdeas.add(normalisedBigIdea);
  seenMemoryClues.add(normalisedMemoryClue);

  assert(
    JSON.stringify(record.source?.teacher_slide_ids) === JSON.stringify(requiredSlideRoles),
    `${code}: sources must identify all four final visible Teacher Slide roles in order`
  );
  assert(
    JSON.stringify(record.source?.model_ids) === JSON.stringify([unit.worked_examples?.[0]?.title]),
    `${code}: source model must be the worked example actually shown in the final deck`
  );

  for (const mode of ["practice", "test"]) {
    const route = `quiz/year-3/math/${code.toLowerCase()}/${mode}/index.html`;
    const html = read(route);
    const configMatch = html.match(/window\.quizConfig=(\{.*?\});<\/script>/s);
    assert(configMatch, `${code} ${mode}: quiz config missing`);
    if (!configMatch) continue;
    const config = JSON.parse(configMatch[1]);
    const isPractice = mode === "practice";
    const expectedQuestionCount = isPractice ? 8 : 12;
    assert(config.skillCode === code, `${code} ${mode}: skill code mismatch`);
    assert(config.preModuleNotesRequired === true, `${code} ${mode}: mandatory pre-module gate not enabled`);
    assert(config.preReadSeconds === 0, `${code} ${mode}: artificial countdown must remain disabled`);
    assert(config.maxQuestions === expectedQuestionCount, `${code} ${mode}: expected ${expectedQuestionCount}-question launch`);
    assert(config.questionCycle === true && config.shuffleQuestions === true && config.shuffleAnswers === true, `${code} ${mode}: bank selection behaviour changed`);
    assert(config.requireStudentName === !isPractice, `${code} ${mode}: student-name flow changed`);
    assert(config.certificateOnPass === !isPractice, `${code} ${mode}: certificate flow changed`);
    assert((html.match(/year3-maths-pre-module-notes\.js\?v=20260814-1/g) || []).length === 1, `${code} ${mode}: shared note source must load exactly once`);
    assert(html.indexOf("year3-maths-pre-module-notes.js") < html.indexOf("/quiz/assets/script.js?v=115"), `${code} ${mode}: note source must load before the shared engine`);
    assert(html.includes("/quiz/assets/style.css?v=115"), `${code} ${mode}: shared responsive style version missing`);
    assert(html.includes("/quiz/assets/production-question-ui.js?v=1"), `${code} ${mode}: existing production question UI missing`);
    assert(html.includes("pre-read-notes"), `${code} ${mode}: existing Quick Read landing content was removed`);

    const questionFile = `quiz/year-3/math/${code.toLowerCase()}/${mode}/questions.js`;
    const questionWindow = { location: { pathname: `/${questionFile}` } };
    new vm.Script(read(questionFile), { filename: questionFile }).runInNewContext({ window: questionWindow });
    const bank = isPractice ? questionWindow.skillrPracticeQuestions : questionWindow.skillrTestQuestions;
    const expectedBankLength = isPractice ? 24 : 16;
    assert(Array.isArray(bank) && bank.length === expectedBankLength, `${code} ${mode}: expected preserved ${expectedBankLength}-question source bank`);
    assert(bank?.every((question) => question.curriculumCode === code), `${code} ${mode}: source bank contains a different curriculum code`);
    assert(new Set((bank || []).map((question) => question.id)).size === expectedBankLength, `${code} ${mode}: source-bank IDs must stay unique`);
  }

  const worksheetRoot = `quiz/year-3/math/${code.toLowerCase()}/worksheet`;
  assert(exists(`${worksheetRoot}/index.html`), `${code}: printable worksheet route missing`);
  const worksheetRoutes = fs.readdirSync(path.join(root, worksheetRoot), { recursive: true })
    .filter((name) => String(name).endsWith(".html"));
  for (const worksheetRoute of worksheetRoutes) {
    const relativePath = `${worksheetRoot}/${worksheetRoute}`;
    const worksheet = read(relativePath);
    assert(!worksheet.includes("pre-module-notes.js"), `${code} ${worksheetRoute}: refresher must not load in a printable worksheet`);
    assert(!worksheet.includes("pre_module_notes"), `${code} ${worksheetRoute}: refresher must not render in a printable worksheet`);
  }
}

const slideRenderer = read("assets/year3-maths-slide.js");
for (const role of requiredSlideRoles) {
  assert(slideRenderer.includes(`data-slide-role="${role}"`), `Final Teacher Slide renderer missing ${role}`);
}
assert(slideRenderer.includes("worked_examples[0]"), "Final Teacher Slide renderer must expose the cited first worked example");
assert(!slideRenderer.includes("worked_examples[1]"), "Year 3 source contract changed: review application-model provenance before release");

const engine = read("quiz/assets/script.js");
for (const marker of ["buildPreModuleScreen", "showPreModuleScreen", "preModuleContinueButton", "getPreModuleSpeechText()", "Continue to Practice", "Continue to Test"]) {
  assert(engine.includes(marker), `Shared pre-module renderer missing ${marker}`);
}
assert(engine.includes('"#preModuleScreen [data-pre-module-speech]"'), "Read-aloud must use the same visible prose nodes");

const serviceWorker = read("service-worker.js");
assert(
  serviceWorker.includes('url.pathname.endsWith("-pre-module-notes.js")'),
  "Public mandatory note assets must use the critical network-first service-worker path"
);

if (errors.length) {
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}

console.log(`Year 3 Maths pre-module notes: ${codes.length}/${codes.length} passing`);
console.log(`Prose word counts: ${Object.entries(counts).map(([code, count]) => `${code} ${count}`).join(", ")}`);
console.log("PASS: final visible-deck provenance, schema, 120–160 words, 60–75 seconds, 46 mandatory live launches, 8/12 selections, preserved 24/16 banks, same shared source, TTS-safe prose, Quick Read preservation, worksheet exclusion and network-first freshness.");
