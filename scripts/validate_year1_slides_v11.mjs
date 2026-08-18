import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const subjects = [
  ["Maths", "maths", "assets/year1-maths-data.js", "SkillrYear1MathsData", 15],
  ["English", "english", "assets/year1-english-data.js", "SkillrYear1EnglishData", 30],
  ["Science", "science", "assets/year1-science-data.js", "SkillrYear1ScienceData", 10]
];
const requiredUnitFields = ["slug", "title", "subtitle", "desc", "routine", "learn", "model_title", "model_html", "activities", "mistakes", "quick", "mastery"];
const teacherFields = ["teacherDoes", "teacherSaysOrAsks", "studentDoes", "whatToLookFor", "ifIncorrect"];
let total = 0;

for (const [label, segment, dataFile, globalName, expected] of subjects) {
  const appended = [];
  const context = {
    window: {},
    location: { pathname: `/year1/${segment}/topic/` },
    document: { createElement: () => ({}), head: { appendChild: (node) => appended.push(node) } }
  };
  vm.runInNewContext(read(dataFile), context, { filename: dataFile });
  const data = context.window[globalName] || {};
  const entries = Object.entries(data);
  assert(entries.length === expected, `${label}: expected ${expected} codes, found ${entries.length}`);
  assert(appended.length === 0, `${label}: data bundle loads slide assets outside the teacher-slide route`);
  for (const [code, unit] of entries) {
    total += 1;
    for (const field of requiredUnitFields) assert(unit[field] != null && unit[field] !== "" && (!Array.isArray(unit[field]) || unit[field].length), `${code}: missing ${field}`);
    assert(unit.activities.length >= 3, `${code}: fewer than three existing activities`);
    assert(unit.mistakes.length >= 3, `${code}: fewer than three existing misconceptions`);
    assert(unit.quick.length >= 4, `${code}: fewer than four existing checkpoints`);
    assert(unit.mastery.length >= 5, `${code}: fewer than five existing mastery criteria`);
  }
  const shell = read(`worksheets/year1/${segment}/teacher-slides/live.html`);
  if (segment === "science") assert(read(dataFile).includes("/assets/year1-slides-v11.js?v=1"), "Science: adapter is not route-loaded by its data bundle");
  else assert(shell.includes("/assets/year1-slides-v11.js?v=1"), `${label}: shell does not load v1.1 adapter`);
}

const adapter = read("assets/year1-slides-v11.js");
const css = read("assets/year1-slides-v11.css");
const pwa = read("pwa-register.js");
for (const marker of ["schemaVersion: \"1.1\"", "learning-goal", "concept-model", "worked-application", "guided-practice", "misconceptions-check", "mastery-check", "Previous", "Next", "slideProgress", "ArrowLeft", "ArrowRight", "teacherGuidance", "SkillrHub • Live classroom display", "differentiation", "masteryItems", "acceptableEvidence", "likelyError", "remediation"]) assert(adapter.includes(marker), `Adapter missing ${marker}`);
for (const level of ["support", "core", "extend"]) assert(adapter.includes(`${level}:`), `Adapter missing ${level} differentiation`);
for (const field of teacherFields) assert(adapter.includes(field), `Adapter missing teacher field ${field}`);
assert((adapter.match(/teacherLayer: teacherLayer\(/g) || []).length === 6, "Adapter must store a complete teacher layer for all six slides");
assert(adapter.includes("${current + 1} / ${slides.length}"), "Dynamic current/total progress is missing");
assert(adapter.includes("__skillrYear1SlidesV11Loaded"), "Adapter duplicate-load guard is missing");
assert((pwa.match(/teacher-slides\\\/live\\\.html\$\/i, year1Slides/g) || []).length === 3, "PWA must inject the adapter on all three Year 1 teacher-slide routes");
assert(pwa.includes('"/assets/year1-science-data.js?v=3"'), "PWA Year 1 Science data cache version is stale");
for (const marker of ["aspect-ratio:16/9", ".y1-watermark", ".y1-slide footer", "@media print", "overflow:hidden"]) assert(css.includes(marker), `Slide CSS missing ${marker}`);
assert(total === 55, `Expected 55 Year 1 codes, found ${total}`);

for (const file of ["assets/year1-slides-v11.js", "assets/year1-maths-data.js", "assets/year1-english-data.js", "assets/year1-science-data.js"]) {
  try { new vm.Script(read(file), { filename: file }); } catch (error) { failures.push(`${file}: ${error.message}`); }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`PASS Year 1 Teacher Slide v1.1: ${total}/55 code-specific lesson records; six selectable slides per code; teacher layers, checkpoints, dynamic navigation, 16:9 framing, watermark, footer and print blocking validated.`);
