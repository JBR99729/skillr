#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const wordCount = (value) => (String(value || "").match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
const proseFor = (notes) => [notes.big_idea, ...(notes.key_rules || []), notes.memory_clue].join(" ");
const requiredSlideRoles = [
  "Learning intention and success criteria",
  "Concept refresher and visual clues",
  "Guided worked example",
  "60-second Quick Check / Turn and Talk"
];

const noteContext = vm.createContext({ window: {} });
new vm.Script(read("quiz/assets/year4-science-pre-module-notes.js"), { filename:"quiz/assets/year4-science-pre-module-notes.js" }).runInContext(noteContext);
const records = noteContext.window.SkillrPreModuleNotes || {};

const dataContext = vm.createContext({ window:{} });
for (const relativePath of [
  "assets/year4-subject-data-base.js",
  "assets/year4-science-data.js",
  "assets/year4-science-topic-modules.js"
]) new vm.Script(read(relativePath), { filename:relativePath }).runInContext(dataContext);
const units = dataContext.window.SkillrYear4ScienceData || {};
const source = dataContext.window.SkillrYear4ScienceTopicSource || {};
const codes = Object.keys(source).sort();
const counts = {};
const seenBigIdeas = new Set();
const seenMemoryClues = new Set();

assert(codes.length === 12, `Expected 12 completed Year 4 Science codes, found ${codes.length}`);
assert(JSON.stringify(Object.keys(records).sort()) === JSON.stringify(codes), "Pre-module coverage must exactly match all 12 completed Year 4 Science codes");

for (const code of codes) {
  const unit = units[code];
  const record = records[code];
  const notes = record?.pre_module_notes;
  assert(unit, `${code}: connected topic module missing`);
  assert(record?.code === code, `${code}: record code mismatch`);
  assert(record?.topic === unit?.title, `${code}: topic must match the final Teacher Slide Deck title`);
  assert(notes && typeof notes === "object", `${code}: missing pre_module_notes`);
  if (!unit || !notes) continue;

  assert(Number.isInteger(notes.target_read_time_seconds), `${code}: target_read_time_seconds must be an integer`);
  assert(notes.target_read_time_seconds >= 60 && notes.target_read_time_seconds <= 75, `${code}: target read time must be 60–75 seconds`);
  assert(notes.title === "Read This Before You Start!", `${code}: exact title required`);
  assert(typeof notes.big_idea === "string" && notes.big_idea.trim(), `${code}: Big Idea required`);
  assert((notes.big_idea.match(/[.!?]+(?=\s|$|[”’"'])/g) || []).length === 1, `${code}: Big Idea must be one sentence`);
  assert(Array.isArray(notes.key_rules) && notes.key_rules.length >= 2 && notes.key_rules.length <= 3, `${code}: requires 2 or 3 Key Rules`);
  assert(notes.key_rules?.every((rule) => typeof rule === "string" && rule.trim()), `${code}: every Key Rule must contain prose`);
  assert(typeof notes.memory_clue === "string" && /^Picture\b/.test(notes.memory_clue), `${code}: concrete Visual Memory Clue required`);

  const prose = proseFor(notes);
  const count = wordCount(prose);
  const wordsPerMinute = count / (notes.target_read_time_seconds / 60);
  counts[code] = count;
  assert(count >= 120 && count <= 160, `${code}: actual prose word count ${count}, expected 120–160`);
  assert(wordsPerMinute >= 90 && wordsPerMinute <= 160, `${code}: target time implies an implausible ${Math.round(wordsPerMinute)} words per minute`);
  assert(!/[0-9$%<>≤≥=+×÷]/u.test(prose), `${code}: numbers, notation and formulas must be verbalised for read-aloud`);
  assert(!/<[^>]+>/.test(prose), `${code}: prose must not contain markup`);
  assert(!/\b(?:student|learner)\s+(?:can|should|will)\b/i.test(prose), `${code}: note must speak directly to the student`);
  const normalisedBigIdea = notes.big_idea.toLowerCase().replace(/\W+/g, " ").trim();
  const normalisedMemoryClue = notes.memory_clue.toLowerCase().replace(/\W+/g, " ").trim();
  assert(!seenBigIdeas.has(normalisedBigIdea), `${code}: duplicated Big Idea`);
  assert(!seenMemoryClues.has(normalisedMemoryClue), `${code}: duplicated Visual Memory Clue`);
  seenBigIdeas.add(normalisedBigIdea);
  seenMemoryClues.add(normalisedMemoryClue);

  assert(JSON.stringify(record.source?.teacher_slide_ids) === JSON.stringify(requiredSlideRoles), `${code}: sources must identify all four final visible Teacher Slide roles in order`);
  assert(JSON.stringify(record.source?.model_ids) === JSON.stringify([unit.workedExamples?.[0]?.title]), `${code}: source model must be the worked example actually shown in the final deck`);

  for (const mode of ["practice", "test"]) {
    const route = `quiz/year-4/science/${code.toLowerCase()}/${mode}/index.html`;
    const html = read(route);
    const configMatch = html.match(/window\.quizConfig=(\{.*?\});<\/script>/s);
    assert(configMatch, `${code} ${mode}: quiz config missing`);
    if (!configMatch) continue;
    const config = JSON.parse(configMatch[1]);
    const isPractice = mode === "practice";
    const expectedQuestionCount = isPractice ? 8 : 12;
    assert(config.skillCode === code, `${code} ${mode}: skill code mismatch`);
    assert(config.preModuleNotesRequired === true, `${code} ${mode}: mandatory gate not enabled`);
    assert(config.preReadSeconds === 0, `${code} ${mode}: artificial countdown must remain disabled`);
    assert(config.maxQuestions === expectedQuestionCount, `${code} ${mode}: expected ${expectedQuestionCount}-question launch`);
    assert(config.shuffleQuestions === true && config.shuffleAnswers === true && config.questionCycle === true, `${code} ${mode}: bank selection changed`);
    assert(config.requireStudentName === !isPractice && config.certificateOnPass === !isPractice, `${code} ${mode}: name/certificate flow changed`);
    assert((html.match(/year4-science-pre-module-notes\.js\?v=20260814-1/g) || []).length === 1, `${code} ${mode}: shared source must load exactly once`);
    assert(html.indexOf("year4-science-pre-module-notes.js") < html.indexOf("/quiz/assets/script.js?v=115"), `${code} ${mode}: note source must load before engine`);
    assert(html.includes("/quiz/assets/style.css?v=115"), `${code} ${mode}: responsive style version missing`);
    assert(html.includes("pre-read-notes"), `${code} ${mode}: existing Quick Read landing was removed`);

    const questionFile = `quiz/year-4/science/${code.toLowerCase()}/${mode}/questions.js`;
    const questionWindow = { location:{ pathname:`/${questionFile}` } };
    new vm.Script(read(questionFile), { filename:questionFile }).runInNewContext({ window:questionWindow });
    const bank = isPractice ? questionWindow.skillrPracticeQuestions : questionWindow.skillrTestQuestions;
    const expectedBankLength = isPractice ? 24 : 16;
    assert(Array.isArray(bank) && bank.length === expectedBankLength, `${code} ${mode}: expected preserved ${expectedBankLength}-question bank`);
    assert(bank?.every((question) => question.curriculumCode === code), `${code} ${mode}: bank contains another code`);
    assert(new Set((bank || []).map((question) => question.id)).size === expectedBankLength, `${code} ${mode}: question IDs must stay unique`);
  }

  const worksheetRoot = `quiz/year-4/science/${code.toLowerCase()}/worksheet`;
  const worksheetFiles = fs.readdirSync(path.join(root, worksheetRoot), { recursive:true }).filter((name) => String(name).endsWith(".html"));
  assert(worksheetFiles.length > 0, `${code}: printable worksheet route missing`);
  for (const file of worksheetFiles) {
    const worksheet = read(`${worksheetRoot}/${file}`);
    assert(!worksheet.includes("pre-module-notes.js") && !worksheet.includes("pre_module_notes"), `${code} ${file}: refresher must not load or render in printable worksheets`);
  }
}

const slideRenderer = read("assets/year4-science-slide.js");
for (const role of requiredSlideRoles) assert(slideRenderer.includes(`frame("${role}"`), `Final Teacher Slide renderer missing ${role}`);
assert(slideRenderer.includes("workedExamples[0]"), "Final Teacher Slide renderer must expose the cited first worked example");
assert(!slideRenderer.includes("workedExamples[1]"), "Year 4 source contract changed: review application-model provenance before release");
assert(read("service-worker.js").includes('url.pathname.endsWith("-pre-module-notes.js")'), "Mandatory public note assets must use network-first service-worker handling");

if (errors.length) {
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}
console.log(`Year 4 Science pre-module notes: ${codes.length}/${codes.length} passing`);
console.log(`Prose word counts: ${Object.entries(counts).map(([code, count]) => `${code} ${count}`).join(", ")}`);
console.log("PASS: final visible-deck provenance, schema, 120–160 words, 60–75 seconds, 24 mandatory live launches, 8/12 selections, preserved 24/16 banks, shared source, TTS-safe prose, Quick Read preservation, worksheet exclusion and network-first freshness.");
