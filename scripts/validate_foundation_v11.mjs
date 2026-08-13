#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

globalThis.window = globalThis;
globalThis.location = { pathname: "/", search: "" };
globalThis.document = {
  body: { dataset: {} },
  documentElement: {},
  head: { appendChild() {} },
  getElementById() { return {}; },
  querySelector() { return null; },
  createElement() { return { dataset: {}, appendChild() {} }; }
};
globalThis.MutationObserver = class {
  observe() {}
  disconnect() {}
};
globalThis.setTimeout = () => 0;

function run(relativePath) {
  const filename = path.join(root, relativePath);
  vm.runInThisContext(fs.readFileSync(filename, "utf8"), { filename });
}

[
  "assets/foundation-maths-data-number.js",
  "assets/foundation-maths-data-other.js",
  "assets/foundation-ac9mfn01-visual-elaborations.js",
  "assets/foundation-ac9mfn02-visual-elaborations.js",
  "assets/foundation-maths-elaborations-n03-n05.js",
  "assets/foundation-maths-elaborations-n06-a01-m01.js",
  "assets/foundation-maths-elaborations-m02-sp01-sp02.js",
  "assets/foundation-english-data.js",
  "assets/foundation-science-data.js",
  "assets/foundation-elaboration-map.js",
  "assets/foundation-canonical-v1.1.js"
].forEach(run);

const subjects = [
  {
    name: "Maths",
    pathSegment: "maths",
    quizSubject: "math",
    data: window.SkillrFoundationMathsData,
    renderer: "foundation-maths-render.js"
  },
  {
    name: "English",
    pathSegment: "english",
    quizSubject: "english",
    data: window.SkillrFoundationEnglishData,
    renderer: "foundation-english-render.js"
  },
  {
    name: "Science",
    pathSegment: "science",
    quizSubject: "science",
    data: window.SkillrFoundationScienceData,
    renderer: "foundation-science-render.js"
  }
];

const summary = {
  schemaVersion: window.SkillrFoundationCanonical?.schemaVersion,
  codes: 0,
  topicPages: 0,
  slides: 0,
  elaborations: 0,
  elaborationModels: 0,
  checkpointItems: 0,
  bySubject: {}
};

for (const subject of subjects) {
  const specs = window.SkillrFoundationCanonical.buildCollection(subject.data, {
    subject: subject.name,
    pathSegment: subject.pathSegment,
    quizSubject: subject.quizSubject
  });
  const subjectSummary = { codes: 0, slides: 0, elaborations: 0, checkpoints: 0 };

  for (const [code, spec] of Object.entries(specs)) {
    summary.codes += 1;
    summary.topicPages += 1;
    summary.slides += spec.slides.length;
    summary.elaborations += spec.elaborations.length;
    summary.checkpointItems += spec.masteryItems.length;
    subjectSummary.codes += 1;
    subjectSummary.slides += spec.slides.length;
    subjectSummary.elaborations += spec.elaborations.length;
    subjectSummary.checkpoints += spec.masteryItems.length;

    errors.push(...window.SkillrFoundationCanonical.validateSpec(spec));

    const modelIds = new Set(spec.models.map((model) => model.id));
    const slideIds = new Set(spec.slides.map((slide) => slide.id));
    const checkpointIds = new Set(spec.masteryItems.map((item) => item.id));
    const mappedElaborationCount = window.SkillrFoundationElaborationMap[code]?.elaborations?.length ?? -1;
    if (spec.elaborations.length !== mappedElaborationCount) {
      errors.push(`${code}: ${spec.elaborations.length} rendered elaborations, expected ${mappedElaborationCount}`);
    }
    spec.slides.forEach((slide) => {
      if (slide.title.length > 84) errors.push(`${code}/${slide.id}: display title is too long (${slide.title.length} characters)`);
    });

    for (const elaboration of spec.elaborations) {
      const modelId = `elaboration-model-${elaboration.id.toLowerCase()}`;
      const slideId = `slide-elaboration-${elaboration.id.toLowerCase()}`;
      const checkpointId = `checkpoint-${elaboration.id.toLowerCase()}`;
      if (!modelIds.has(modelId)) errors.push(`${code}/${elaboration.id}: missing dedicated elaboration model`);
      if (!slideIds.has(slideId)) errors.push(`${code}/${elaboration.id}: missing dedicated elaboration slide`);
      if (!checkpointIds.has(checkpointId)) errors.push(`${code}/${elaboration.id}: missing dedicated checkpoint`);
      if (elaboration.modelIds.length !== 1 || elaboration.modelIds[0] !== modelId) {
        errors.push(`${code}/${elaboration.id}: elaboration does not use its dedicated model`);
      }
      summary.elaborationModels += 1;
    }

    const topicPath = path.join(root, "foundation", subject.pathSegment, spec.resourceLinks.topic.split("/").filter(Boolean).at(-1), "index.html");
    if (!fs.existsSync(topicPath)) {
      errors.push(`${code}: missing topic page ${path.relative(root, topicPath)}`);
      continue;
    }
    const html = fs.readFileSync(topicPath, "utf8");
    const requiredFragments = [
      code,
      "/assets/foundation-elaboration-map.js",
      "/assets/foundation-canonical-v1.1.js",
      "/assets/foundation-v1.1-render.js",
      `/assets/${subject.renderer}`
    ];
    requiredFragments.forEach((fragment) => {
      if (!html.includes(fragment)) errors.push(`${code}: topic page missing ${fragment}`);
    });
  }

  const livePath = path.join(root, "worksheets", "foundation", subject.pathSegment, "teacher-slides", "live.html");
  if (!fs.existsSync(livePath)) {
    errors.push(`${subject.name}: missing selectable teacher slide page`);
  } else {
    const live = fs.readFileSync(livePath, "utf8");
    [
      'data-skillr-teacher-host="true"',
      "/assets/foundation-elaboration-map.js",
      "/assets/foundation-canonical-v1.1.js",
      "/assets/foundation-v1.1-render.js"
    ].forEach((fragment) => {
      if (!live.includes(fragment)) errors.push(`${subject.name} slides: missing ${fragment}`);
    });
  }

  summary.bySubject[subject.name] = subjectSummary;
}

const rendererSource = fs.readFileSync(path.join(root, "assets", "foundation-v1.1-render.js"), "utf8");
[
  "aspect-ratio:16/9",
  "Teacher does",
  "Teacher says / asks",
  "Student does",
  "What to look for",
  "If incorrect",
  "Support",
  "Core",
  "Extend"
].forEach((fragment) => {
  if (!rendererSource.includes(fragment)) errors.push(`shared renderer missing ${fragment}`);
});

summary.errors = errors;
console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
