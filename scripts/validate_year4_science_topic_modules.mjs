import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const context = { window:{} };
vm.createContext(context);
for (const file of ["assets/year4-subject-data-base.js","assets/year4-science-data.js","assets/year4-science-topic-modules.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename:file });
const units = context.window.SkillrYear4ScienceData || {};
const source = context.window.SkillrYear4ScienceTopicSource || {};
const commercialMasters = context.window.SkillrYear4ScienceCommercialMasterData || {};
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const codes = Object.keys(source);
const allPrompts = [];
const topicPracticePartitions = {
  "topic-practice-1":[0,1,2,3,4],
  "topic-practice-2":[5,6,7,8]
};
const allowedAlignment = new Set(["taught-concept","vocabulary","misconception-correction","worked-example-1","worked-example-2","visual-terminology","evidence-practice"]);
expect(codes.length === 12, `Expected 12 codes, found ${codes.length}`);
for (const code of codes) {
  const unit = units[code];
  const commercialMaster = commercialMasters[code];
  expect(Boolean(unit), `${code}: missing unit`);
  if (!unit) continue;
  expect(Boolean(commercialMaster), `${code}: commercial-master export missing`);
  expect(unit.deepDive?.length >= 3 && unit.deepDive.every((item) => item.length > 50), `${code}: deep-dive incomplete`);
  expect(unit.vocabulary?.length >= 4, `${code}: vocabulary incomplete`);
  expect(unit.misconceptions?.length === 3 && unit.misconceptions.every((item) => item.correction), `${code}: misconceptions not 3 corrected items`);
  expect(unit.workedExamples?.length === 2 && unit.workedExamples.every((item) => item.steps.length >= 3 && item.conclusion), `${code}: worked examples incomplete`);
  expect(unit.visualAlt?.length > 40, `${code}: visual alt incomplete`);
  expect(unit.worksheet?.length === 9, `${code}: worksheet must contain exactly 9 items`);
  expect([1,2,3].every((tier, index) => unit.worksheet.filter((item) => item.tier === tier).length === [3,4,2][index]), `${code}: worksheet tier count is not 3/4/2`);
  expect(unit.worksheet.map((item) => item.tier).join("") === "111222233", `${code}: worksheet tiers are not ordered 3/4/2`);
  const partitionedIndexes = Object.values(topicPracticePartitions).flat();
  expect(partitionedIndexes.length === 9 && new Set(partitionedIndexes).size === 9 && partitionedIndexes.every((index) => index >= 0 && index < unit.worksheet.length), `${code}: topic-practice partition duplicates or omits an item`);
  expect(topicPracticePartitions["topic-practice-1"].length === 5 && topicPracticePartitions["topic-practice-2"].length === 4, `${code}: topic-practice split is not 5/4`);
  expect(topicPracticePartitions["topic-practice-1"].map((index) => unit.worksheet[index].tier).join("") === "11122", `${code}: Topic Practice 1 tier sequence incorrect`);
  expect(topicPracticePartitions["topic-practice-2"].map((index) => unit.worksheet[index].tier).join("") === "2233", `${code}: Topic Practice 2 tier sequence incorrect`);
  expect(unit.worksheet.every((item) => item.id && item.question && item.answer && item.summary && item.hint), `${code}: worksheet answer metadata incomplete`);
  expect(unit.worksheet.filter((item) => item.options).every((item) => item.options.length === 3 && item.options[0] === item.answer), `${code}: choice count or answer key incorrect`);
  expect(new Set(unit.worksheet.map((item) => item.question.toLowerCase())).size === 9, `${code}: duplicate worksheet prompt`);
  expect(unit.worksheet.every((item) => item.alignment?.length && item.alignment.every((tag) => allowedAlignment.has(tag))), `${code}: missing or untaught alignment tag`);
  const coverage = new Set(unit.worksheet.flatMap((item) => item.alignment));
  for (const required of ["taught-concept","vocabulary","misconception-correction","worked-example-1","worked-example-2","visual-terminology"]) expect(coverage.has(required), `${code}: alignment does not cover ${required}`);
  expect(unit.worksheet[0].question === source[code].questions.choice1[0], `${code}: Q1 is not anchored to the taught model`);
  expect(unit.worksheet[1].question === source[code].questions.choice2[0], `${code}: Q2 is not anchored to the taught application`);
  expect(unit.worksheet[2].question.includes(source[code].terms[0][0]), `${code}: Q3 does not assess taught vocabulary`);
  expect(unit.worksheet[3].question.toLowerCase().includes(source[code].modelTitle.toLowerCase()), `${code}: Q4 does not assess worked example 1`);
  expect(unit.worksheet[4].question.toLowerCase().includes(source[code].applyTitle.toLowerCase()), `${code}: Q5 does not assess worked example 2`);
  expect(unit.worksheet[5].question.includes(source[code].mistakes[0][0]), `${code}: Q6 does not assess a taught misconception correction`);
  expect(unit.worksheet[6].question.startsWith(source[code].activities[0][0]), `${code}: Q7 is not anchored to a taught activity`);
  expect(unit.worksheet[7].question.includes(source[code].modelTitle) && source[code].terms.slice(0,3).every(([term]) => unit.worksheet[7].question.includes(term)), `${code}: Q8 lacks model/vocabulary alignment`);
  expect(unit.worksheet[8].question.includes(source[code].applyTitle), `${code}: Q9 lacks application-method alignment`);
  if (commercialMaster) {
    const metadata = commercialMaster.metadata || {};
    expect(metadata.schema === "topic-module-export-v1" && metadata.year === 4 && metadata.yearLabel === "Year 4" && metadata.subject === "Science" && metadata.code === code && metadata.topic === unit.title && metadata.topicSlug === unit.slug, `${code}: stable commercial-master metadata incomplete`);
    expect(commercialMaster.teacherSlides?.length === 4, `${code}: structured teacher-slide export must contain 4 slides`);
    expect(commercialMaster.teacherSlides?.map((slide) => slide.slideId).join("|") === [1,2,3,4].map((number) => `${code}-slide-${number}`).join("|"), `${code}: stable teacher-slide IDs incorrect`);
    expect(commercialMaster.teacherSlides?.map((slide) => slide.role).join("|") === "learning-intention-success-criteria|concept-refresher-visual-clues|guided-worked-example|quick-check-turn-and-talk", `${code}: teacher-slide roles incorrect`);
    expect(commercialMaster.teacherSlides?.slice(1,3).every((slide) => slide.visual?.alt && slide.visual?.data), `${code}: teacher-slide visual data or alt missing`);
    expect(commercialMaster.teacherSlides?.[3]?.expectedResponse && commercialMaster.teacherSlides?.[3]?.remediation, `${code}: exported Quick Check guidance missing`);
    const exportBank = commercialMaster.topicPractice?.questionBank || {};
    const exportSheets = commercialMaster.topicPractice?.sheets || [];
    expect(Object.keys(exportBank).length === 9, `${code}: export question bank must contain 9 canonical items`);
    expect(Object.values(exportBank).every((item) => item.answer && item.summary && item.hint && item.alignment), `${code}: export answer/summary/hint/alignment missing`);
    expect(exportSheets.length === 2 && exportSheets.map((sheet) => sheet.sheetId).join("|") === "topic-practice-1|topic-practice-2", `${code}: stable worksheet sheet IDs incorrect`);
    expect(exportSheets.map((sheet) => sheet.title).join("|") === "Topic Practice 1|Topic Practice 2", `${code}: commercial worksheet titles incorrect`);
    expect(exportSheets.every((sheet) => sheet.year === 4 && sheet.subject === "Science" && sheet.code === code && sheet.topic === unit.title), `${code}: worksheet export metadata incomplete`);
    const exportIds = exportSheets.flatMap((sheet) => sheet.questionIds);
    expect(exportSheets[0].questionIds.length === 5 && exportSheets[1].questionIds.length === 4 && exportIds.length === 9 && new Set(exportIds).size === 9 && exportIds.every((id) => exportBank[id]), `${code}: exported worksheet partition duplicates, omits or misreferences questions`);
    expect(!/(skillrhub|skillr hub|\/icons\/|logo)/i.test(JSON.stringify(commercialMaster)), `${code}: brand chrome leaked into instructional commercial-master data`);
  }
  allPrompts.push(...unit.worksheet.map((item) => item.question.toLowerCase()));
  const topic = path.join(ROOT, "year4", "science", unit.slug, "index.html");
  const worksheet = path.join(ROOT, "quiz", "year-4", "science", code.toLowerCase(), "worksheet", "index.html");
  const practice = path.join(ROOT, "quiz", "year-4", "science", code.toLowerCase(), "practice", "index.html");
  const test = path.join(ROOT, "quiz", "year-4", "science", code.toLowerCase(), "test", "index.html");
  const legacyPdf = path.join(ROOT, "worksheets", "year4", "science", "teacher-slides", `${code.toLowerCase()}-teacher-slide.pdf`);
  const topicHtml = fs.existsSync(topic) ? fs.readFileSync(topic, "utf8") : "";
  const worksheetHtml = fs.existsSync(worksheet) ? fs.readFileSync(worksheet, "utf8") : "";
  expect(topicHtml.includes("year4-science-topic-modules.js?v=2") && topicHtml.includes("year4-science-topic-render.js?v=2") && !/year4-science-(?:topic-modules|topic-render)\.js\?v=1\b/.test(topicHtml), `${code}: topic route cache version is stale or mixed`);
  expect(worksheetHtml.includes("year4-science-topic-modules.js?v=2") && worksheetHtml.includes("year4-science-worksheet.js?v=2") && !/year4-science-(?:topic-modules|worksheet)\.js\?v=1\b/.test(worksheetHtml), `${code}: worksheet route cache version is stale or mixed`);
  expect(fs.existsSync(practice), `${code}: Practice target missing`);
  expect(fs.existsSync(test), `${code}: Test target missing`);
  expect(fs.existsSync(legacyPdf) && fs.statSync(legacyPdf).size > 1000, `${code}: legacy teacher PDF missing or empty`);
}
expect(new Set(allPrompts).size === 108, `Cross-code worksheet prompt overlap: ${108 - new Set(allPrompts).size}`);
const slide = fs.readFileSync(path.join(ROOT, "assets/year4-science-slide.js"), "utf8");
const topicRenderer = fs.readFileSync(path.join(ROOT, "assets/year4-science-topic-render.js"), "utf8");
const worksheetRenderer = fs.readFileSync(path.join(ROOT, "assets/year4-science-worksheet.js"), "utf8");
const moduleSource = fs.readFileSync(path.join(ROOT, "assets/year4-science-topic-modules.js"), "utf8");
for (const role of ["Learning intention and success criteria","Concept refresher and visual clues","Guided worked example","60-second Quick Check / Turn and Talk"]) expect(slide.includes(role), `Missing slide role: ${role}`);
expect(slide.includes("concealed-answer") && slide.includes("Expected response") && slide.includes("If students are unsure"), "Quick Check answer/remediation incomplete");
expect(slide.includes("unit.commercialMaster?.teacherSlides") && slide.includes("data-slide-id"), "Public teacher-slide renderer does not consume canonical structured slide data");
for (const target of ["teacher-slides/live.html?code=","/worksheet/","/practice/","/test/"]) expect(topicRenderer.includes(target), `Topic renderer link missing: ${target}`);
expect(topicRenderer.includes("Legacy teacher-slide PDF") && topicRenderer.includes("Preserved optional extension prompts"), "Preserved teaching material is not exposed");
expect(worksheetRenderer.includes("answer-key") && worksheetRenderer.includes("Summary:") && worksheetRenderer.includes("Hint:"), "Printable answer key incomplete");
expect(moduleSource.includes('{ sheetId:"topic-practice-1", title:"Topic Practice 1"') && moduleSource.includes('{ sheetId:"topic-practice-2", title:"Topic Practice 2"'), "Stable sheet IDs or exact titles missing from canonical export data");
expect(worksheetRenderer.includes('get("sheet") || "topic-practice-1"') && worksheetRenderer.includes("Object.prototype.hasOwnProperty.call(sheetDefinitions, requestedSheet)"), "Current worksheet compatibility/default or safe query routing missing");
for (const key of ["topic-practice-1","topic-practice-2"]) {
  expect(worksheetRenderer.includes(`?sheet=${key}`), `Worksheet navigation missing stable query URL for ${key}`);
  expect(topicRenderer.includes(`?sheet=${key}`), `Topic page missing stable query URL for ${key}`);
}
expect(worksheetRenderer.includes("unit.commercialMaster?.topicPractice") && worksheetRenderer.includes("activeSheet.questionIds.map") && worksheetRenderer.includes("const answers = selected.map") && !worksheetRenderer.includes("const answers = worksheet.questions.map"), "Renderer does not consume canonical sheet data or isolate answer keys to the selected partition");
expect(worksheetRenderer.includes('data-question-id=') && worksheetRenderer.includes('data-answer-for='), "Question-to-answer identity link missing");
expect(worksheetRenderer.includes(".choice-options{display:flex") && worksheetRenderer.includes("flex-wrap:nowrap!important") && worksheetRenderer.includes("@media(max-width:680px)") && worksheetRenderer.includes("flex-wrap:wrap"), "Horizontal choice layout or narrow-screen wrapping missing");
expect(worksheetRenderer.includes("@page{size:A4 portrait") && worksheetRenderer.includes("width:210mm") && worksheetRenderer.includes("page-break-before:always"), "A4/answer-key print contract missing");
expect(worksheetRenderer.includes("overflow-wrap:anywhere") && worksheetRenderer.includes("overflow:hidden"), "Worksheet overflow safeguards missing");
expect(slide.includes("data-slide-role") && fs.readFileSync(path.join(ROOT, "worksheets/year4/science/teacher-slides/live.html"), "utf8").includes("overflow-wrap:anywhere"), "Slide overflow safeguard missing");
for (const file of ["assets/year4-science-topic-render.js","assets/year4-science-slide.js","assets/year4-science-worksheet.js"]) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  expect(text.includes("/icons/skillrhub-mark.svg"), `${file}: SkillrHub logo missing`);
  expect(/SkillrHub/.test(text), `${file}: public brand chrome missing`);
}
const logoPath = path.join(ROOT, "icons/skillrhub-mark.svg");
expect(fs.existsSync(logoPath) && fs.statSync(logoPath).size > 100 && /<svg\b/.test(fs.readFileSync(logoPath, "utf8")), "SkillrHub logo asset missing or invalid");
const pwa = fs.readFileSync(path.join(ROOT, "pwa-register.js"), "utf8");
for (const asset of ["year4-science-topic-modules.js","year4-science-topic-render.js","year4-science-worksheet.js"]) expect(pwa.includes(`${asset}?v=2`), `Progressive loader missing cache-busted ${asset}`);
expect(!/year4-science-(?:topic-modules|topic-render|worksheet)\.js\?v=1\b/.test(pwa), "Progressive loader retains stale Year 4 Science retrofit asset version");
const liveSlide = fs.readFileSync(path.join(ROOT, "worksheets/year4/science/teacher-slides/live.html"), "utf8");
expect(liveSlide.includes("year4-science-topic-modules.js?v=2") && liveSlide.includes("year4-science-slide.js?v=2") && !/year4-science-(?:topic-modules|slide)\.js\?v=1\b/.test(liveSlide), "Live teacher slide cache version is stale or mixed");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`PASS: Year 4 Science topic modules ${codes.length}/12; 12 topic pages, 48 core slides, 24 Topic Practice sheet views and 108 uniquely partitioned worksheet questions.`);
