#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const CODES = ["AC9M7N02", "AC9M7N03", "AC9M7N04", "AC9M7N05", "AC9M7N06", "AC9M7N07", "AC9M7N08", "AC9M7N09", "AC9M7A01"];
const META = {
  AC9M7N02: ["Prime Factorisation with Exponent Notation", "Prime-factor tree showing a composite number split until every leaf is prime.", "Break the number into prime factors, then compare the required exponents."],
  AC9M7N03: ["Expanded Notation with Powers of 10", "Place-value chart linking digit positions to positive and negative powers of ten.", "Track each digit's place and multiply it by the matching power of ten."],
  AC9M7N04: ["Equivalent Rational Numbers", "Fraction, decimal and percentage representations aligned on one equivalence strip.", "Convert both quantities to the same representation before comparing them."],
  AC9M7N05: ["Rounding, Accuracy and Reasonableness", "Number line with a value located between two rounding boundaries.", "Identify the rounding place, inspect the next digit and check whether the result suits the context."],
  AC9M7N06: ["Four Operations with Positive Rational Numbers", "Operation plan showing fractions and decimals converted before calculating and checking.", "Choose a compatible representation, follow the operation order and estimate to check."],
  AC9M7N07: ["Comparing, Adding and Subtracting Integers", "Horizontal number line showing negative values, zero and positive values.", "Use direction and distance from zero; check the sign in the original context."],
  AC9M7N08: ["Ratios and Equivalent Relationships", "Ratio table showing two quantities scaled by the same multiplier.", "Keep the multiplicative relationship by scaling both parts by the same factor."],
  AC9M7N09: ["Modelling Rational and Percentage Problems", "Percentage bar connecting a whole amount, a rate and the resulting part.", "Define the quantities, calculate the percentage or rational part, then interpret the result."],
  AC9M7A01: ["Variables, Formulas and Substitution", "Formula machine showing input values substituted into variables before operations are evaluated.", "Substitute with brackets, keep units consistent and check in the original formula."],
};

function loadLegacy(code) {
  const file = path.join(ROOT, `quiz/year-7/math/${code.toLowerCase()}/practice/questions.js`);
  const window = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window, console }, { filename: file });
  if (Array.isArray(window.quizQuestions) && window.quizQuestions.length >= 40) return window.quizQuestions;
  const production = path.join(ROOT, `assets/assessment-banks/year7/math/${code.toLowerCase()}.json`);
  if (fs.existsSync(production)) return JSON.parse(fs.readFileSync(production, "utf8")).map((item) => ({
    question: item.question,
    answers: item.answers.map((answer) => answer.text),
    correct: item.correct_index,
    explanation: item.explanation.summary,
  }));
  throw new Error(`${code}: expected at least 40 authored questions`);
}

function cleanSummary(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.endsWith(".") ? text : `${text}.`;
}

function productionItem(code, source, bank, index) {
  const choices = source.answers.slice(0, 3).map(String);
  const correctText = String(source.answers[source.correct]);
  if (!choices.includes(correctText)) choices[2] = correctText;
  const formulaDistractors = {
    "Which formula models: A rectangle's area equals length times width?": "A=l+w",
    "Which formula models: Distance equals rate times time?": "d=r+t",
    "Which formula models: Density equals mass divided by volume?": "ρ=mV",
    "Which formula models: A triangle's area is half base times height?": "A=bh",
    "Which formula models: Energy equals power times time?": "E=p+t",
    "Which formula models: A tank volume is length times width times height?": "V=l+w+h",
  };
  choices.forEach((choice, choiceIndex) => {
    if (/^(?:Alternative|None of these)\b/.test(choice)) {
      choices[choiceIndex] = formulaDistractors[source.question] || String(Number(correctText) * 100 || `${correctText} using the wrong place value`);
    }
  });
  const desired = index % 3;
  const current = choices.indexOf(correctText);
  [choices[current], choices[desired]] = [choices[desired], choices[current]];
  const suffix = bank === "practice" ? "P" : "T";
  return {
    id: `${code}-${suffix}-${String(index + 1).padStart(3, "0")}`,
    subject: "math",
    year_level: "Year 7",
    curriculum_code: code,
    bank,
    skill: META[code][0].toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question: source.question,
    audio_prompt: source.question,
    visual: {
      type: "svg",
      asset_path: `/assets/assessment-visuals/year7/maths/batch1.svg#${code.toLowerCase()}`,
      alt_text: META[code][1],
    },
    answers: choices.map((text, choiceIndex) => ({ text, is_correct: choiceIndex === desired })),
    correct_index: desired,
    explanation: { summary: cleanSummary(source.explanation), hint: META[code][2] },
  };
}

function liveItem(item) {
  const alt = item.visual.alt_text;
  return {
    id: item.id.toLowerCase(), curriculumCode: item.curriculum_code, bank: item.bank,
    skill: item.skill.replace(/_/g, " "), printable: true, type: "single",
    question: item.question, audioPrompt: item.audio_prompt, visual: alt,
    visualHtml: `<svg viewBox="0 0 640 300" role="img" aria-label="${alt.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"><use href="${item.visual.asset_path}"></use></svg>`,
    visualMeta: item.visual, answers: item.answers.map((answer) => answer.text),
    correct: item.correct_index,
    explanation: `${item.explanation.summary}\nHint: ${item.explanation.hint}`,
    structuredExplanation: item.explanation, qualitySchema: "production-v1",
  };
}

function updatePage(file, code, bank) {
  let html = fs.readFileSync(file, "utf8");
  const [title] = META[code];
  const count = bank === "practice" ? 8 : 12;
  const bankSize = bank === "practice" ? 24 : 16;
  html = html
    .replace(/<title>.*?<\/title>/, `<title>${code} ${title} ${bank === "practice" ? "Practice" : "Test"} | SkillrHub</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${bank === "practice" ? "Practise 8 rotating questions from a 24-question" : "Take a 12-question test drawn from a separate 16-question"} Year 7 bank for ${code}.">`)
    .replace(/<h1 id="quizTitle">.*?<\/h1>/, `<h1 id="quizTitle">${title}</h1>`)
    .replace(/<span class="summary-number" id="questionCount">\d+<\/span><span class="summary-label">Questions(?: this attempt)?<\/span>/, `<span class="summary-number" id="questionCount">${count}</span><span class="summary-label">Questions this attempt</span>`)
    .replace(/<script>window\.quizConfig=\{.*?<\/script>/, (config) => config
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${count}`)
      .replace(/"shuffleQuestions":(?:true|false)/, '"shuffleQuestions":true')
      .replace(/"questionCycle":(?:true|false)/, `"questionCycle":${bank === "practice" ? "true" : "false"}`))
    .replace(/<script src="\/quiz\/year-7\/math\/[^"]+\/practice\/questions\.js"><\/script>/, `<script src="/quiz/year-7/math/${code.toLowerCase()}/${bank}/questions.js?v=20260813-y7m1"></script>`);
  if (!html.includes("production-question-ui.js")) html = html.replace(/<script src="\/quiz\/assets\/script\.js/, '<script src="/quiz/assets/production-question-ui.js?v=1"></script><script src="/quiz/assets/script.js');
  html = html.replace(`<div><span class="summary-number">75%</span>`, `<div><span class="summary-number">${bankSize}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number">75%</span>`);
  fs.writeFileSync(file, html);
}

function updateSupportingPages(route, code) {
  const [title] = META[code];
  const activity = path.join(route, "index.html");
  let html = fs.readFileSync(activity, "utf8")
    .replace(/<title>.*?<\/title>/, `<title>${code} ${title} Activities | SkillrHub</title>`)
    .replace(/<h1>.*?<\/h1>/, `<h1>${title}</h1>`)
    .replace(/<p>Choose a learning activity\..*?<\/p>/, "<p>Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws 12 questions from a separate 16-question bank.</p>");
  fs.writeFileSync(activity, html);
  const worksheet = path.join(route, "worksheet/index.html");
  html = fs.readFileSync(worksheet, "utf8")
    .replace(/<h1 id="quizTitle">.*?<\/h1>/, `<h1 id="quizTitle">${title} worksheet</h1>`)
    .replace(/<p>Download a worksheet containing.*?<\/p>/, "<p>Download an 8-question worksheet drawn from the Practice bank.</p>");
  fs.writeFileSync(worksheet, html);
  for (const bank of ["practice", "test"]) {
    const retake = path.join(route, `${bank}/retake/index.html`);
    html = fs.readFileSync(retake, "utf8")
      .replace(/<h1>Retake (?:practice|test): .*?<\/h1>/, `<h1>Retake ${bank}: ${title}</h1>`)
      .replace(/<p>Try the same eight curriculum questions again.*?<\/p>/, bank === "practice"
        ? "<p>Start a fresh rotating 8-question attempt from the 24-question Practice bank.</p>"
        : "<p>Start a fresh 12-question attempt from the separate 16-question Test bank.</p>");
    fs.writeFileSync(retake, html);
    const review = path.join(route, `${bank}/review/index.html`);
    html = fs.readFileSync(review, "utf8").replace(/try the eight questions again/, bank === "practice" ? "try another rotating set of eight questions" : "try another 12-question test");
    fs.writeFileSync(review, html);
  }
}

for (const code of CODES) {
  const legacy = loadLegacy(code);
  const items = [
    ...legacy.slice(0, 24).map((item, index) => productionItem(code, item, "practice", index)),
    ...legacy.slice(24, 40).map((item, index) => productionItem(code, item, "test", index)),
  ];
  const bankDir = path.join(ROOT, "assets/assessment-banks/year7/math");
  fs.mkdirSync(bankDir, { recursive: true });
  fs.writeFileSync(path.join(bankDir, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  const route = path.join(ROOT, `quiz/year-7/math/${code.toLowerCase()}`);
  for (const bank of ["practice", "test"]) {
    const globalName = bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions";
    const live = items.filter((item) => item.bank === bank).map(liveItem);
    const alias = bank === "test" ? `window.skillrExamQuestions = window.${globalName};\n` : "";
    fs.writeFileSync(path.join(route, `${bank}/questions.js`), `"use strict";\nwindow.${globalName} = ${JSON.stringify(live, null, 2)};\n${alias}window.quizQuestions = window.${globalName};\n`);
    updatePage(path.join(route, `${bank}/index.html`), code, bank);
  }
  updateSupportingPages(route, code);
}

console.log(`Built ${CODES.length} Year 7 Maths banks (${CODES.length * 24} Practice, ${CODES.length * 16} Test).`);
