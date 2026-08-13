#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const document = { getElementById: () => null, querySelector: () => null, addEventListener() {}, documentElement: {}, head: { appendChild() {} }, body: { dataset: {} }, createElement: () => ({ setAttribute() {} }) };
class MutationObserver { observe() {} disconnect() {} }
const context = vm.createContext({ window: {}, document, console, URLSearchParams, location: { search: "", pathname: "/" }, MutationObserver, setTimeout: () => 0 });
const run = (file) => new vm.Script(read(file), { filename: file }).runInContext(context);

["assets/foundation-maths-data-number.js", "assets/foundation-maths-data-other.js", "assets/foundation-maths-topic-module-v2.js", "assets/foundation-ac9mfn01-visual-elaborations.js", "assets/foundation-ac9mfn02-visual-elaborations.js", "assets/foundation-maths-elaborations-n03-n05.js", "assets/foundation-maths-elaborations-n06-a01-m01.js", "assets/foundation-maths-elaborations-m02-sp01-sp02.js", "assets/foundation-elaboration-map.js", "assets/foundation-canonical-v1.1.js"].forEach(run);
["quiz/assets/foundation-maths-authored-worksheet-data.js", "quiz/assets/foundation-maths-topic-module-data-v2.js"].forEach(run);

const data = context.window.SkillrFoundationMathsData;
const canonical = context.window.SkillrFoundationCanonical;
const specs = canonical.buildCollection(data, { subject: "Maths", year: "Foundation", pathSegment: "maths", quizSubject: "math" });
const banks = context.window.SkillrFoundationWorksheetData;
const codes = Object.keys(data).filter((code) => /^AC9MF/.test(code)).sort();
assert(codes.length === 12, `Expected 12 Maths codes, found ${codes.length}`);

for (const code of codes) {
  const spec = specs[code];
  const bank = banks[code];
  assert(spec?.vocabulary?.length >= 4, `${code}: needs four vocabulary entries`);
  assert(spec?.workedExamples?.length === 2, `${code}: needs two worked examples`);
  assert(spec?.misconceptions?.length >= 2, `${code}: needs at least two misconceptions`);
  assert(JSON.stringify(spec?.coreSlideIds) === JSON.stringify(["slide-intro", "slide-model", "slide-application", "slide-mastery"]), `${code}: core slide ids`);
  assert(spec?.slides?.filter((slide) => slide.sequenceRole === "core").length === 4, `${code}: exactly four core slides`);
  assert(spec?.slides?.filter((slide) => slide.sequenceRole === "optional-extension").length === spec.slides.length - 4, `${code}: legacy slides preserved as optional extensions`);
  assert(spec?.resourceLinks?.slide && spec?.resourceLinks?.worksheet, `${code}: connected resource links`);
  assert(bank?.questions?.length === 9, `${code}: expected 9 questions`);
  assert(bank?.questions?.filter((q) => q.tier === "warm-up").length === 3, `${code}: warm-up tier`);
  assert(bank?.questions?.filter((q) => q.tier === "core").length === 4, `${code}: core tier`);
  assert(bank?.questions?.filter((q) => q.tier === "challenge").length === 2, `${code}: challenge tier`);
  (bank?.questions || []).forEach((q, index) => {
    for (const field of ["question", "answer", "summary", "hint", "tierLabel"]) assert(String(q[field] || "").trim(), `${code} Q${index + 1}: missing ${field}`);
    const vocabulary = new Set(spec.vocabulary.map((item) => item.term));
    assert(q.alignment?.concept === spec.title, `${code} Q${index + 1}: concept parity`);
    assert(vocabulary.has(q.alignment?.vocabulary), `${code} Q${index + 1}: vocabulary parity`);
    assert(q.summary.includes(q.alignment?.method || "__missing__"), `${code} Q${index + 1}: worked-model method parity`);
  });
  assert(Array.isArray(bank?.preservedOptionalQuestions), `${code}: preserved legacy content not recorded`);
  const topicRoute = spec?.resourceLinks?.topic?.replace(/^\//, "").replace(/\/$/, "/index.html");
  assert(topicRoute && fs.existsSync(path.join(root, topicRoute)), `${code}: topic route missing`);
  if (topicRoute) assert(read(topicRoute).includes("foundation-maths-topic-module-v2.js"), `${code}: topic overlay not loaded`);
  const worksheetRoute = `quiz/grade-k/math/${code.toLowerCase()}/worksheet/index.html`;
  assert(fs.existsSync(path.join(root, worksheetRoute)), `${code}: worksheet route missing`);
  assert(read(worksheetRoute).includes("foundation-maths-topic-module-data-v2.js"), `${code}: worksheet overlay not loaded`);
  for (const link of [spec.resourceLinks.worksheet, spec.resourceLinks.practice, spec.resourceLinks.test]) {
    const route = link.replace(/^\//, "").replace(/\/$/, "/index.html");
    assert(fs.existsSync(path.join(root, route)), `${code}: broken internal link ${link}`);
  }
}

const worksheetRenderer = read("quiz/assets/foundation-maths-authored-worksheet.js");
for (const marker of ["Tier 1: Warm-Up", "Tier 2: Core Practice", "Tier 3: Extension / Challenge", "Answer Key", "Preview answer key", "SkillrHub F–10"]) assert(worksheetRenderer.includes(marker), `Worksheet renderer missing ${marker}`);
assert(read("worksheets/foundation/Maths/teacher-slides/live.html").includes("foundation-maths-topic-module-v2.js"), "Teacher slide host missing topic overlay");

console.log(`Foundation Maths topic modules: ${codes.length - new Set(errors.map((e) => e.split(":")[0])).size}/${codes.length} passing`);
console.log(`Questions: ${codes.reduce((sum, code) => sum + (banks[code]?.questions?.length || 0), 0)} (36 Warm-Up, 48 Core, 24 Challenge)`);
console.log(`Slides preserved: ${codes.reduce((sum, code) => sum + specs[code].slides.length, 0)} (${codes.length * 4} core)`);
if (errors.length) {
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}
console.log("PASS: schema, routes, links, vocabulary, worked examples, misconceptions, four core slides, preserved extensions, 3/4/2 tiers, answer keys, summaries, hints and branding.");
