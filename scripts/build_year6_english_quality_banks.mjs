#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year6", "english");
const QUIZ_ROOT = path.join(ROOT, "quiz", "year-6", "english");
const MANUAL_CODES = new Set(["AC9E6LA01", "AC9E6LA02"]);

const captured = { units: {}, order: [] };
const sandbox = { window: {
  SkillrYear6Register(subject, specs, order) {
    if (subject !== "english") return;
    Object.assign(captured.units, specs);
    captured.order.push(...order);
  },
} };
vm.createContext(sandbox);
for (const file of ["assets/year6-english-data-la.js", "assets/year6-english-data-le.js", "assets/year6-english-data-ly.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
}

const units = captured.units;
const order = [...new Set(captured.order)];
if (order.length !== 23) throw new Error(`Expected 23 Year 6 English codes, found ${order.length}`);

const clean = (v) => String(v ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const sentence = (v) => clean(v).replace(/[.!?]+$/, "");
const cap = (v) => { const s = sentence(v); return s ? s[0].toUpperCase() + s.slice(1) : s; };
const slug = (v) => clean(v).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const key = (v) => clean(v).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function tableRows(visual) {
  const data = visual?.data;
  if (!Array.isArray(data) || !data.every(Array.isArray)) return [];
  if (data.length > 1 && data[0].every((x) => typeof x === "string")) return data.slice(1);
  return data;
}
function flatRows(visual) {
  const data = visual?.data;
  if (!Array.isArray(data)) return [];
  if (data.every(Array.isArray)) return tableRows(visual);
  return data.map((x) => [clean(x)]);
}
function distinct(values, correct) {
  const seen = new Set([key(correct)]);
  return values.map(clean).filter((v) => {
    const k = key(v); if (!k || seen.has(k)) return false; seen.add(k); return true;
  });
}
function options(correct, distractors, correctIndex) {
  const wrong = distinct(distractors, correct);
  while (wrong.length < 3) wrong.push(["This does not match the example.", "This ignores an important clue.", "This is too broad for the evidence."][wrong.length] || "This does not fit.");
  const arr = wrong.slice(0, 3).map((text) => ({ text, is_correct: false }));
  arr.splice(correctIndex, 0, { text: clean(correct), is_correct: true });
  return arr;
}
function rowItem(row, others, note, focus, bank, index, fresh = false) {
  const label = clean(row[0] || focus);
  const example = clean(row[1] || row[0]);
  const effect = clean(row[2] || "");
  const otherLabels = others.map((r) => clean(r[0])).filter(Boolean);
  const q = fresh
    ? `Read this new example: “${example}”. Which label best fits it?`
    : `Look at this example: “${example}”. Which label best describes it?`;
  const summary = effect
    ? `“${example}” is an example of ${label}. In this context, it ${effect}.`
    : `“${example}” is an example of ${label}.`;
  return make(bank, focus || label, q, label, otherLabels, summary, note, index);
}
function termItem(term, allTerms, bank, index, fresh = false) {
  const [name, definition] = term;
  const q = fresh
    ? `Which term best matches this meaning in a new example: “${sentence(definition)}”?`
    : `Which term means “${sentence(definition)}”?`;
  return make(bank, name, q, name, allTerms.map((t) => t[0]).filter((x) => x !== name), `${cap(name)} means ${sentence(definition)}.`, `Match the meaning to the term, then look for that idea in examples.`, index);
}
function misconceptionItem(pair, otherPairs, bank, index, fresh = false) {
  const [wrong, repair] = pair;
  const q = fresh
    ? `A student applies this rule to a new text: “${sentence(wrong)}.” Which correction is most useful?`
    : `A student says, “${sentence(wrong)}.” Which correction would help them most?`;
  return make(bank, "misconception repair", q, cap(repair), otherPairs.map((p) => cap(p[0])), `${cap(repair)} This fixes the overgeneralisation in the original statement.`, `Use the rule that works with the actual evidence and context.`, index);
}
function choiceItem(choice, unit, bank, index, fresh = false) {
  const [q, answers] = choice;
  const question = fresh ? `${sentence(q)} Use the clue in the example, not just the wording of the options.` : q;
  return make(bank, unit.quick?.[index % (unit.quick?.length || 1)] || unit.title, question, answers[0], answers.slice(1), `“${clean(answers[0])}” is the best answer because it fits the language feature and context being tested.`, unit.modelNote || unit.applyNote, index);
}
function make(bank, focus, question, correct, wrongs, summary, hint, index) {
  const correctIndex = index % 4;
  return {
    bank,
    focus: clean(focus),
    question: clean(question),
    correct: clean(correct),
    wrongs: wrongs.map(clean),
    summary: clean(summary),
    hint: clean(hint),
    correctIndex,
  };
}

function buildDetails(unit) {
  const terms = unit.terms || [];
  const mistakes = unit.mistakes || [];
  const model = flatRows(unit.modelVisual);
  const apply = flatRows(unit.applyVisual);
  const [choice1, choice2] = [unit.questions.choice1, unit.questions.choice2];

  const practice = [];
  practice.push(choiceItem(choice1, unit, "practice", 0));
  if (terms[0]) practice.push(termItem(terms[0], terms, "practice", 1));
  else practice.push(choiceItem(choice2, unit, "practice", 1));
  practice.push(choiceItem(choice2, unit, "practice", 2));
  if (model[0]) practice.push(rowItem(model[0], model.slice(1), unit.modelNote, unit.modelTitle, "practice", 3));
  else practice.push(misconceptionItem(mistakes[0], mistakes.slice(1), "practice", 3));
  if (model[1]) practice.push(rowItem(model[1], model.filter((_, i) => i !== 1), unit.modelNote, unit.modelTitle, "practice", 4));
  else practice.push(misconceptionItem(mistakes[0], mistakes.slice(1), "practice", 4));
  if (mistakes[0]) practice.push(misconceptionItem(mistakes[0], mistakes.slice(1), "practice", 5));
  else if (terms[1]) practice.push(termItem(terms[1], terms, "practice", 5));
  if (apply[0]) practice.push(rowItem(apply[0], apply.slice(1), unit.applyNote, unit.applyTitle, "practice", 6));
  else if (model[2]) practice.push(rowItem(model[2], model.filter((_, i) => i !== 2), unit.modelNote, unit.modelTitle, "practice", 6));
  if (apply[1]) practice.push(rowItem(apply[1], apply.filter((_, i) => i !== 1), unit.applyNote, unit.applyTitle, "practice", 7));
  else if (model[2]) practice.push(rowItem(model[2], model.filter((_, i) => i !== 2), unit.modelNote, unit.modelTitle, "practice", 7));

  const test = [];
  if (model[2]) test.push(rowItem(model[2], model.filter((_, i) => i !== 2), unit.modelNote, unit.modelTitle, "test", 0, true));
  else if (terms[1]) test.push(termItem(terms[1], terms, "test", 0, true));
  else test.push(choiceItem(choice1, unit, "test", 0, true));
  if (terms[1]) test.push(termItem(terms[1], terms, "test", 1, true));
  else test.push(choiceItem(choice2, unit, "test", 1, true));
  if (apply[2]) test.push(rowItem(apply[2], apply.filter((_, i) => i !== 2), unit.applyNote, unit.applyTitle, "test", 2, true));
  else if (model[3]) test.push(rowItem(model[3], model.filter((_, i) => i !== 3), unit.modelNote, unit.modelTitle, "test", 2, true));
  else test.push(misconceptionItem(mistakes[1] || mistakes[0], mistakes, "test", 2, true));
  if (mistakes[1]) test.push(misconceptionItem(mistakes[1], mistakes.filter((_, i) => i !== 1), "test", 3, true));
  else test.push(choiceItem(choice2, unit, "test", 3, true));
  if (model[3]) test.push(rowItem(model[3], model.filter((_, i) => i !== 3), unit.modelNote, unit.modelTitle, "test", 4, true));
  else if (terms[2]) test.push(termItem(terms[2], terms, "test", 4, true));
  if (terms[2]) test.push(termItem(terms[2], terms, "test", 5, true));
  else test.push(misconceptionItem(mistakes[2] || mistakes[0], mistakes, "test", 5, true));
  if (apply[3]) test.push(rowItem(apply[3], apply.filter((_, i) => i !== 3), unit.applyNote, unit.applyTitle, "test", 6, true));
  else if (mistakes[2]) test.push(misconceptionItem(mistakes[2], mistakes.filter((_, i) => i !== 2), "test", 6, true));
  if (mistakes[2]) test.push(misconceptionItem(mistakes[2], mistakes.filter((_, i) => i !== 2), "test", 7, true));
  else if (apply[4]) test.push(rowItem(apply[4], apply.filter((_, i) => i !== 4), unit.applyNote, unit.applyTitle, "test", 7, true));

  while (practice.length < 8) practice.push(choiceItem(choice1, unit, "practice", practice.length));
  while (test.length < 8) test.push(choiceItem(choice2, unit, "test", test.length, true));
  return { practice: practice.slice(0, 8), test: test.slice(0, 8) };
}

function bankItem(code, detail, number) {
  const id = `${code.toLowerCase()}-${detail.bank === "practice" ? "p" : "t"}-${String(number + 1).padStart(3, "0")}`;
  return {
    id,
    curriculum_code: code,
    year_level: "Year 6",
    subject: "english",
    bank: detail.bank,
    skill: slug(detail.focus),
    question: detail.question,
    audio_prompt: detail.question,
    visual: { type: "none", alt_text: "" },
    answers: options(detail.correct, detail.wrongs, detail.correctIndex),
    correct_index: detail.correctIndex,
    explanation: { summary: detail.summary, hint: detail.hint },
    difficulty: number < 3 ? 1 : number < 6 ? 2 : 3,
    difficulty_tier: number < 2 ? "confidence" : number < 5 ? "core" : "application",
    sequence_priority: number + 1,
    quality_schema: "student-facing-v2",
  };
}
function jsItem(item) {
  return {
    id: item.id,
    curriculumCode: item.curriculum_code,
    bank: item.bank,
    skill: item.skill.replaceAll("_", " "),
    printable: true,
    type: "single",
    question: item.question,
    audioPrompt: item.audio_prompt,
    visual: "",
    visualHtml: "",
    visualMeta: item.visual,
    answers: item.answers.map((a) => a.text),
    correct: item.correct_index,
    explanation: `${item.explanation.summary}\nHint: ${item.explanation.hint}`,
    structuredExplanation: item.explanation,
    qualitySchema: "student-facing-v2",
  };
}
function writeJs(code, practiceItems, testItems) {
  const dir = path.join(QUIZ_ROOT, code.toLowerCase());
  const p = `"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(practiceItems.map(jsItem), null, 2)};\nwindow.quizQuestions = window.skillrPracticeQuestions;\n`;
  const t = `"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(testItems.map(jsItem), null, 2)};\nwindow.skillrExamQuestions = window.skillrTestQuestions;\nwindow.quizQuestions = window.skillrTestQuestions;\n`;
  fs.writeFileSync(path.join(dir, "practice", "questions.js"), p);
  fs.writeFileSync(path.join(dir, "practice", "practice-questions.js"), p);
  fs.writeFileSync(path.join(dir, "test", "questions.js"), t);
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
let rewritten = 0;
for (const code of order) {
  if (MANUAL_CODES.has(code)) continue;
  const unit = units[code];
  const { practice, test } = buildDetails(unit);
  const pItems = practice.map((d, i) => bankItem(code, d, i));
  const tItems = test.map((d, i) => bankItem(code, d, i));
  const all = [...pItems, ...tItems];
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(all, null, 2)}\n`);
  writeJs(code, pItems, tItems);
  rewritten += 1;
}

console.log(JSON.stringify({ totalCodes: order.length, manualPilots: [...MANUAL_CODES], generatedStudentFacingCodes: rewritten, questionsPerGeneratedCode: 16, philosophy: "confidence -> recognition -> understanding -> guided application -> independent application" }, null, 2));
