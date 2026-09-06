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
  readyState: "complete",
  body: { dataset: {} },
  documentElement: { dataset: {} },
  head: { appendChild() {} },
  getElementById() { return {}; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement() { return { dataset: {}, appendChild() {} }; }
};
globalThis.MutationObserver = class { observe() {} disconnect() {} };
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
  "assets/foundation-canonical-v1.1.js",
  "assets/foundation-v1.1-render.js",
  "assets/foundation-classroom-rollout.js"
].forEach(run);

const subjects = [
  ["Maths", "maths", "math", window.SkillrFoundationMathsData],
  ["English", "english", "english", window.SkillrFoundationEnglishData],
  ["Science", "science", "science", window.SkillrFoundationScienceData]
];
const summary = { codes: 0, slides: 0, elaborations: 0, visualSlides: 0, bySubject: {}, longestHeading: { code: "", title: "", length: 0 } };
const bannedProjected = /\b(?:curriculum context|context\s*→\s*model\s*→\s*evidence|authoring instructions?|technical terminology)\b/i;
const incompleteEnding = /\b(?:a|an|and|as|at|between|by|for|from|in|of|on|or|such|the|to|with|that|which)$/i;

for (const [subject, pathSegment, quizSubject, data] of subjects) {
  const specs = window.SkillrFoundationCanonical.buildCollection(data, { subject, pathSegment, quizSubject });
  const subjectSummary = { codes: 0, slides: 0, elaborations: 0 };
  for (const [code, spec] of Object.entries(specs)) {
    if (code === "AC9EFLA01") continue;
    const unit = data[code];
    summary.codes += 1;
    summary.slides += spec.slides.length;
    summary.elaborations += spec.elaborations.length;
    subjectSummary.codes += 1;
    subjectSummary.slides += spec.slides.length;
    subjectSummary.elaborations += spec.elaborations.length;
    spec.slides.forEach((slide, index) => {
      const view = window.SkillrFoundationClassroomRollout.slideView(spec, unit, slide, index);
      const projected = [view.heading, view.meaning, view.question, view.answer, view.visual].join(" ");
      if (!view.visual) errors.push(`${code}/slide-${index + 1}: missing teaching visual`);
      else summary.visualSlides += 1;
      if (!view.question || !view.answer) errors.push(`${code}/slide-${index + 1}: missing question or model answer`);
      if (/…|\.\.\./.test(projected)) errors.push(`${code}/slide-${index + 1}: contains ellipsis`);
      if (/\bE\d+(?:-E?\d+)?\b/i.test(projected)) errors.push(`${code}/slide-${index + 1}: exposes elaboration label`);
      if (bannedProjected.test(projected)) errors.push(`${code}/slide-${index + 1}: exposes banned projected terminology`);
      if (incompleteEnding.test(view.heading)) errors.push(`${code}/slide-${index + 1}: heading appears incomplete: ${view.heading}`);
      if (view.heading.length > 82) errors.push(`${code}/slide-${index + 1}: heading too long (${view.heading.length})`);
      if (view.heading.length > summary.longestHeading.length) summary.longestHeading = { code, title: view.heading, length: view.heading.length };
      ["teacherDoes", "teacherSaysOrAsks", "studentDoes", "whatToLookFor", "ifIncorrect"].forEach((field) => {
        if (!slide.teacherLayer?.[field]) errors.push(`${code}/slide-${index + 1}: missing teacherLayer.${field}`);
      });
    });
  }
  summary.bySubject[subject] = subjectSummary;
}

const rolloutSource = fs.readFileSync(path.join(root, "assets/foundation-classroom-rollout.js"), "utf8");
const a01Source = fs.readFileSync(path.join(root, "assets/foundation-ac9efla01-classroom.js"), "utf8");
const sharedSource = fs.readFileSync(path.join(root, "assets/foundation-v1.1-render.js"), "utf8");
[
  "What it means",
  "Look at the picture",
  "Ask the class",
  "Check together",
  "Teacher does.",
  "Teacher says/asks.",
  "Student does.",
  "Expected answer or observable evidence.",
  "What to do if the student is unsure or incorrect.",
  "https://skillrhub.com",
  "Free Teacher Resource.",
  "Free classroom use"
].forEach((fragment) => {
  if (!rolloutSource.includes(fragment)) errors.push(`shared rollout missing ${fragment}`);
});
if (!a01Source.includes("a01-slide__url-watermark") || !a01Source.includes("https://skillrhub.com")) errors.push("AC9EFLA01 slides missing the second URL watermark");
if (!sharedSource.includes("foundation-classroom-rollout.js")) errors.push("shared v1.1 renderer does not load the classroom rollout");
if (summary.codes !== 49) errors.push(`expected 49 generic codes plus AC9EFLA01, found ${summary.codes} generic codes`);
if (summary.visualSlides !== summary.slides) errors.push(`${summary.visualSlides}/${summary.slides} generic slides have teaching visuals`);

summary.totalCodes = summary.codes + 1;
summary.ac9efla01Slides = window.SkillrFoundationEnglishData.AC9EFLA01.canonical?.slides?.length || 0;
summary.errors = errors;
summary.status = errors.length ? "FAIL" : "PASS";
console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
