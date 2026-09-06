import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const lessonPath = path.join(root, "assets/foundation-ac9efla01-lesson.js");
const rendererPath = path.join(root, "assets/foundation-ac9efla01-classroom.js");
const topicPath = path.join(root, "foundation/english/ac9efla01-how-language-is-used-differently-at-home-and-school-depending/index.html");
const slideHostPath = path.join(root, "worksheets/foundation/english/teacher-slides/live.html");

const lessonSource = fs.readFileSync(lessonPath, "utf8");
const rendererSource = fs.readFileSync(rendererPath, "utf8");
const topicSource = fs.readFileSync(topicPath, "utf8");
const slideHostSource = fs.readFileSync(slideHostPath, "utf8");

const window = {
  SkillrFoundationEnglishData: {},
  SkillrFoundationCanonicalLessons: {}
};
vm.runInNewContext(lessonSource, { window }, { filename: lessonPath });

const spec = window.SkillrAC9EFLA01Lesson;
assert.ok(spec, "The code-specific canonical lesson specification must load.");
assert.equal(spec.schemaVersion, "1.1");
assert.equal(spec.code, "AC9EFLA01");
assert.equal(spec.year, "Foundation");
assert.equal(spec.subject, "English");
assert.equal(spec.slides.length, 9, "The prototype must contain nine selectable classroom slides.");
assert.equal(spec.elaborations.length, 2, "Both listed elaborations must be mapped.");

const requiredSpecFields = [
  "title", "subtitle", "contentDescription", "lessonTime", "learningIntention",
  "successCriteria", "materials", "conceptBoundary", "teachingProgression",
  "models", "elaborations", "workedExamples", "misconceptions", "warmUp",
  "differentiation", "slides", "masteryItems", "references", "resourceLinks", "review"
];
requiredSpecFields.forEach((field) => assert.ok(spec[field], `Missing canonical field: ${field}`));

["mustTeach", "prerequisites", "maySupportInformally", "mustNotOverteach"].forEach((field) => {
  assert.ok(Array.isArray(spec.conceptBoundary[field]) && spec.conceptBoundary[field].length, `Empty concept boundary: ${field}`);
});

const modelIds = new Set(spec.models.map((item) => item.id));
const sceneIds = new Set(Object.keys(spec.scenes));
spec.models.forEach((item) => {
  assert.ok(item.accessibleDescription, `${item.id} needs an accessible description.`);
  assert.equal(item.reviewed.conceptAccurate, true, `${item.id} must be concept checked.`);
  assert.equal(item.reviewed.labelsClear, true, `${item.id} must have clear labels.`);
  assert.equal(item.reviewed.noOverlap, true, `${item.id} must be marked ready for layout QA.`);
  (item.parameters.sceneIds || []).forEach((id) => assert.ok(sceneIds.has(id), `${item.id} references missing scene ${id}.`));
});

const teacherFields = ["teacherDoes", "teacherSaysOrAsks", "studentDoes", "whatToLookFor", "ifIncorrect"];
const projectedFields = [];
spec.slides.forEach((slide) => {
  assert.ok(slide.title && slide.title.length <= 48, `${slide.id} needs a complete, concise heading.`);
  assert.ok(slide.purpose, `${slide.id} needs one teaching purpose.`);
  teacherFields.forEach((field) => assert.ok(slide.teacherLayer[field], `${slide.id} is missing ${field}.`));
  slide.display.modelIds.forEach((id) => assert.ok(modelIds.has(id), `${slide.id} references missing model ${id}.`));
  projectedFields.push(slide.title, slide.display.meaning, slide.display.studentPrompt, slide.display.checkTogether);
});

const masteryFields = [
  "prompt", "expectedAnswer", "acceptableRepresentations", "evidenceOfMastery",
  "likelyMisconception", "remediation", "decision"
];
spec.masteryItems.forEach((item) => {
  masteryFields.forEach((field) => assert.ok(item[field], `${item.id} is missing ${field}.`));
  assert.ok(item.decision.continueWhen && item.decision.reteachWhen, `${item.id} needs continue and reteach decisions.`);
});

const projectedText = projectedFields.join("\n");
const bannedProjectedPatterns = [
  /AC9EFLA01/i,
  /\bE1\b|\bE2\b/,
  /curriculum wording|curriculum context/i,
  /Context\s*→\s*Model\s*→\s*Evidence/i,
  /authoring instructions?/i,
  /…/
];
bannedProjectedPatterns.forEach((pattern) => assert.ok(!pattern.test(projectedText), `Projected text contains banned content: ${pattern}`));

const requiredExactText = [
  "Can you help me?",
  "Excuse me, could you please help me?",
  "Excuse me, where are the apples, please?",
  "What changed?",
  "Which words suit a teacher?",
  "How would you ask a friend?",
  "Now ask for a pencil in both ways."
];
const canonicalText = JSON.stringify(spec);
requiredExactText.forEach((text) => assert.ok(canonicalText.includes(text), `Missing required exact example or question: ${text}`));

assert.ok(spec.models.some((item) => item.id === "phrase-sort" && item.component === "relationshipPhraseSort"), "The lesson needs a visual relationship sort.");
assert.ok(spec.models.every((item) => item.usedBy.some((use) => use.startsWith("topic")) && item.usedBy.some((use) => use.startsWith("slide") || use.startsWith("mastery"))), "Every approved visual must be shared by the topic guide and slide lesson.");

[lessonSource, rendererSource].forEach((source) => {
  assert.ok(!source.includes("…"), "Prototype source must not contain an ellipsis character.");
  assert.ok(!source.includes("text-overflow:ellipsis"), "Prototype CSS must not truncate text with ellipsis.");
});

assert.ok(topicSource.includes("/assets/foundation-ac9efla01-lesson.js"), "The Topic Guide must load the code-specific lesson source.");
assert.ok(topicSource.includes("/assets/foundation-ac9efla01-classroom.js"), "The Topic Guide must load the code-specific renderer.");
assert.ok(slideHostSource.includes('toUpperCase() === "AC9EFLA01"'), "The shared slide host must gate the prototype to AC9EFLA01.");
assert.ok(slideHostSource.includes("/assets/foundation-ac9efla01-lesson.js"), "The slide host must load the same lesson source.");
assert.ok(slideHostSource.includes("/assets/foundation-ac9efla01-classroom.js"), "The slide host must load the same renderer.");
assert.ok(rendererSource.includes("isPrototypeTopic(options.data) ? renderTopic(options) : baseRenderer.renderTopic(options)"), "Topic rendering must delegate every other code to the original renderer.");
assert.ok(rendererSource.includes("isPrototypeSlides() ? renderSlides(options) : baseRenderer.renderSlides(options)"), "Slide rendering must delegate every other code to the original renderer.");

console.log(JSON.stringify({
  code: spec.code,
  schemaVersion: spec.schemaVersion,
  slides: spec.slides.length,
  models: spec.models.length,
  elaborations: spec.elaborations.length,
  masteryItems: spec.masteryItems.length,
  requiredExamplesPresent: requiredExactText.length,
  otherCodesDelegated: true,
  status: "PASS"
}, null, 2));
