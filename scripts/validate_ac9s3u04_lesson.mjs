import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(read("assets/ac9s3u04-lesson.js"), context);
const lesson = context.window.skillrLesson;
const problems = [];
const requireValue = (condition, message) => { if (!condition) problems.push(message); };
const topic = read("year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/index.html");
const deck = read("year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/teacher-deck/index.html");
const renderer = read("assets/ac9s3u04-render.js");
const metadata = JSON.parse(read("data/curriculum-units.json")).units.find((unit) => unit.code === "AC9S3U04");
const bank = JSON.parse(read("assets/assessment-banks/year3/science/ac9s3u04.json"));
const practice = bank.filter((item) => item.bank === "practice");
const test = bank.filter((item) => item.bank === "test");

requireValue(lesson?.schemaVersion === "1.1" && lesson.code === "AC9S3U04", "Canonical identity or schema mismatch");
requireValue(lesson.elaborations.map((item) => item.id).join(",") === "E1,E2,E3,E4,E5", "E1-E5 coverage mismatch");
requireValue(lesson.slides.length >= 10, "Teacher deck requires at least 10 slides");
for (const slide of lesson.slides) for (const field of ["teacherDoes", "teacherSaysOrAsks", "studentDoes", "whatToLookFor", "ifIncorrect"]) requireValue(Boolean(slide.teacherLayer?.[field]), `${slide.id}: missing ${field}`);
for (const item of lesson.masteryItems) for (const field of ["expectedAnswer", "acceptableRepresentations", "evidenceOfMastery", "likelyMisconception", "remediation", "decision"]) requireValue(Boolean(item[field]), `${item.id}: missing ${field}`);
for (const file of [topic, deck]) {
  requireValue(file.includes("/assets/ac9s3u04-lesson.js?v=1"), "Output does not load canonical source");
  requireValue(file.includes("/assets/ac9s3u04-render.js?v=1"), "Output does not load shared renderer");
}
requireValue(deck.includes("/assets/display-only.js?v=2"), "Deck does not load display-only protection");
requireValue(!/adsbygoogle|googletagmanager|download|onclick=["'][^"']*print/i.test(deck), "Deck contains advertising or print/download UI");
requireValue(/googletagmanager/.test(topic) && /adsbygoogle/.test(topic), "Public topic analytics or advertising missing");
for (const model of lesson.models) requireValue(renderer.includes(`\"${model.id}\"`), `Renderer missing model ${model.id}`);
requireValue(metadata?.teacherSlideUrl === lesson.resourceLinks.teacherSlides, "Metadata teacher deck route mismatch");
requireValue(practice.length === 28 && test.length === 28, "Assessment must contain 28 Practice and 28 Test questions");
requireValue(bank.every((item) => item.answers.length === 4), "Every assessment item must have four options");
requireValue(new Set(bank.map((item) => item.question.toLowerCase())).size === 56, "Assessment prompts must be unique");
requireValue(!bank.some((item) => /\b(?:gas(?:es)?|particle(?:s)?)\b/i.test(`${item.question} ${item.answers.map((answer) => answer.text).join(" ")}`)), "Assessment crosses the Year 3 gas/particle boundary");
for (const [name, items] of [["Practice", practice], ["Test", test]]) {
  const positions = Array(4).fill(0);
  items.forEach((item) => { positions[item.correct_index] += 1; });
  requireValue(Math.max(...positions) - Math.min(...positions) <= 1, `${name} answer positions are unbalanced: ${positions.join("/")}`);
}
for (const [route, count] of [["practice", 28], ["test", 28]]) requireValue(read(`quiz/year-3/science/ac9s3u04/${route}/index.html`).includes(`>${count}</span><span class="summary-label">Question bank`), `${route} route count mismatch`);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({ status: "PASS", code: lesson.code, elaborations: lesson.elaborations.length, slides: lesson.slides.length, checkpoints: lesson.masteryItems.length, practice: practice.length, test: test.length, options: 4, sharedModels: lesson.models.length }, null, 2));