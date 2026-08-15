#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const refreshGenerated = process.argv.includes("--refresh-generated");
const unavailable = JSON.parse(fs.readFileSync(path.join(ROOT, "assets/unavailable-activity-paths.json"), "utf8")).paths;
const hidden = unavailable.map((route) => route.match(/^\/quiz\/year-(7|8|9|10)\/(math|science|english)\/([^/]+)\/$/)).filter(Boolean)
  .map(([, year, subject, code]) => ({ year: Number(year), subject, code: code.toUpperCase() }));

const clean = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/(?:\.{3}|…)/g, "the omitted idea").replace(/\s+/g, " ").trim();
const sentence = (value) => clean(value).replace(/[.!?]+$/, "");
const cap = (value) => sentence(value).replace(/^./, (letter) => letter.toUpperCase());
const key = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const skill = (value) => key(value).replace(/\s+/g, "_");
const contexts = [
  "a guided example", "a comparison task", "an error analysis", "a model interpretation",
  "an evidence check", "a transfer problem", "a peer explanation", "an independent review",
  "a fresh case study", "an unfamiliar representation", "a critical response", "a worked solution audit",
  "a source evaluation", "a multi-step application", "a justification task", "a final synthesis",
];

function loadGlobal(file, globalName) {
  const box = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), box, { filename: file });
  return box.window[globalName] || {};
}

function loadYear7() {
  const captured = { math: {}, science: {}, english: {} };
  const box = { window: {
    SkillrYear7Register(subject, specs) {
      Object.assign(captured[subject === "maths" ? "math" : subject], specs);
    },
  } };
  vm.createContext(box);
  for (const file of [
    "assets/year7-maths-data-n.js", "assets/year7-maths-data-am.js", "assets/year7-maths-data-spstp.js",
    "assets/year7-science-data-u.js", "assets/year7-science-data-hi.js",
    "assets/year7-english-data-la.js", "assets/year7-english-data-le.js", "assets/year7-english-data-ly.js",
  ]) vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), box, { filename: file });
  return captured;
}

const year7 = loadYear7();
const canonical = {
  8: {
    math: loadGlobal("assets/year8-maths-data.js", "SkillrUpperMathsData"),
    english: loadGlobal("assets/year8-english-full-data.js", "SkillrUpperEnglishData"),
  },
  9: {
    math: loadGlobal("assets/year9-maths-data.js", "SkillrUpperMathsData"),
    science: loadGlobal("assets/year9-science-full-data.js", "SkillrUpperScienceData"),
    english: loadGlobal("assets/year9-english-full-data.js", "SkillrUpperEnglishData"),
  },
  10: {
    math: loadGlobal("assets/year10-maths-data.js", "SkillrUpperMathsData"),
    science: loadGlobal("assets/year10-science-full-data.js", "SkillrUpperScienceData"),
    english: loadGlobal("assets/year10-english-full-data.js", "SkillrUpperEnglishData"),
  },
};

function answerOptions(correct, candidates, position) {
  const seen = new Set([key(correct)]);
  const distractors = candidates.map(cap).filter((value) => {
    const candidateKey = key(value);
    if (!candidateKey || seen.has(candidateKey)) return false;
    seen.add(candidateKey);
    return true;
  });
  const fallbacks = [
    "The evidence is unnecessary because the claim sounds plausible",
    "One example proves that the same conclusion applies in every context",
    "Naming a feature is enough; its role or effect does not need explanation",
    "The first result should be accepted without checking another representation or source",
  ];
  for (const fallback of fallbacks) if (!seen.has(key(fallback))) {
    distractors.push(fallback);
    seen.add(key(fallback));
  }
  const answers = distractors.slice(0, 3).map((text) => ({ text, is_correct: false }));
  answers.splice(position, 0, { text: clean(correct), is_correct: true });
  return answers;
}

function readExistingBank(file) {
  if (!fs.existsSync(file)) return [];
  try {
    const items = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function mergeBank(existing, generated) {
  const result = [...existing];
  const ids = new Set(existing.map((item) => clean(item.id)).filter(Boolean));
  const prompts = new Set(existing.map((item) => key(item.question)).filter(Boolean));
  for (const bank of ["practice", "test"]) {
    let count = result.filter((item) => item.bank === bank).length;
    for (const item of generated.filter((candidate) => candidate.bank === bank)) {
      if (count >= 8) break;
      if (ids.has(item.id) || prompts.has(key(item.question))) continue;
      result.push(item);
      ids.add(item.id);
      prompts.add(key(item.question));
      count += 1;
    }
  }
  return result;
}

function canonicalSeeds(unit) {
  const mastery = unit.masteryItems || [];
  const misconceptions = unit.misconceptions || [];
  const worked = unit.workedExamples || [];
  const elaborations = unit.elaborations || [];
  if (!mastery.length) throw new Error(`${unit.code}: no canonical mastery items`);
  return Array.from({ length: 16 }, (_, index) => {
    const source = mastery[index % mastery.length];
    const misconception = misconceptions[index % Math.max(1, misconceptions.length)] || {};
    const example = worked[index % Math.max(1, worked.length)] || {};
    const elaboration = elaborations[index % Math.max(1, elaborations.length)] || {};
    const isTest = index >= 8;
    const focus = elaboration.plainLanguageConcept || example.title || unit.title;
    const question = isTest
      ? `During ${contexts[index]}, ${sentence(source.prompt)} Which response provides the strongest evidence?`
      : `During ${contexts[index]}, ${sentence(source.prompt)}`;
    const correct = source.expectedAnswer;
    const distractors = [
      source.likelyMisconception,
      misconception.incorrectIdea || misconception.cause,
      misconception.rapidRemediation,
      `A response that mentions ${sentence(focus).toLowerCase()} but does not justify the relationship`,
    ];
    return {
      question,
      correct,
      distractors,
      summary: source.expectedAnswer,
      hint: source.remediation,
      focus,
    };
  });
}

function year7Seeds(unit) {
  const terms = unit.terms || [];
  const mistakes = unit.mistakes || [];
  const quick = unit.quick || [];
  const examples = [unit.correctExample, unit.modelNote, unit.applyNote, unit.core].filter(Boolean);
  return Array.from({ length: 16 }, (_, index) => {
    const isTest = index >= 8;
    const term = terms[index % Math.max(1, terms.length)] || [unit.title, unit.core];
    const mistake = mistakes[index % Math.max(1, mistakes.length)] || ["The claim is unsupported", "Use the model and justify the relationship."];
    const focus = quick[index % Math.max(1, quick.length)] || unit.title;
    const correct = examples[index % examples.length];
    const question = isTest
      ? `During ${contexts[index]}, which response best demonstrates ${sentence(focus).toLowerCase()} in ${unit.title.toLowerCase()}?`
      : index < 3
        ? `During ${contexts[index]}, which statement correctly explains ${term[0]}?`
        : `During ${contexts[index]}, which response best demonstrates ${sentence(focus).toLowerCase()} in ${unit.title.toLowerCase()}?`;
    return {
      question,
      correct,
      distractors: [mistake[0], mistake[1], ...terms.map(([, definition]) => definition)],
      summary: correct,
      hint: mistake[1],
      focus,
    };
  });
}

const results = { preserved: 0, built: 0, practice: 0, test: 0, byYearSubject: {} };
for (const { year, subject, code } of hidden) {
  const outputDir = path.join(ROOT, "assets/assessment-banks", `year${year}`, subject);
  const output = path.join(outputDir, `${code.toLowerCase()}.json`);
  let existing = readExistingBank(output);
  const generatedPattern = new RegExp(`^${code.toLowerCase()}-[pt]-00[1-8]$`);
  const isGeneratedSet = existing.length === 16 && existing.every((item) => generatedPattern.test(clean(item.id)));
  if (refreshGenerated && isGeneratedSet) existing = [];
  if (["practice", "test"].every((bank) => existing.filter((item) => item.bank === bank).length >= 8)) {
    results.preserved += 1;
    continue;
  }
  const unit = year === 7 ? year7[subject][code] : canonical[year]?.[subject]?.[code];
  if (!unit) throw new Error(`${code}: missing authored curriculum source`);
  const seeds = year === 7 ? year7Seeds(unit) : canonicalSeeds(unit);
  const items = seeds.map((seed, index) => {
    const bank = index < 8 ? "practice" : "test";
    const number = index % 8 + 1;
    const correctIndex = index % 4;
    const id = `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${String(number).padStart(3, "0")}`;
    return {
      id,
      curriculum_code: code,
      year_level: `Year ${year}`,
      subject,
      bank,
      skill: skill(seed.focus),
      question: clean(seed.question),
      audio_prompt: clean(seed.question),
      visual: { type: "none", alt_text: "" },
      answers: answerOptions(seed.correct, seed.distractors, correctIndex),
      correct_index: correctIndex,
      explanation: { summary: clean(seed.summary), hint: clean(seed.hint) },
    };
  });
  const merged = mergeBank(existing, items);
  if (!["practice", "test"].every((bank) => merged.filter((item) => item.bank === bank).length >= 8)) {
    throw new Error(`${code}: unable to merge at least 8 Practice and 8 Test questions`);
  }
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(merged, null, 2)}\n`);
  const group = `${year}-${subject}`;
  results.byYearSubject[group] = (results.byYearSubject[group] || 0) + 1;
  results.built += 1;
  results.practice += 8;
  results.test += 8;
}

console.log(JSON.stringify(results, null, 2));