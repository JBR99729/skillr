#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year6", "english");
const captured = { units: {}, order: [] };
const sandbox = { window: {
  SkillrYear6Register(subject, specs, order) {
    if (subject !== "english") return;
    Object.assign(captured.units, specs);
    captured.order.push(...order);
  },
} };
vm.createContext(sandbox);
for (const file of [
  "assets/year6-english-data-la.js",
  "assets/year6-english-data-le.js",
  "assets/year6-english-data-ly.js",
]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
}

const units = captured.units;
const order = [...new Set(captured.order)];
if (!units || order?.length !== 23) throw new Error("Expected all 23 Year 6 English units");

const clean = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const sentence = (value) => clean(value).replace(/[.!?]+$/, "");
const label = (value) => sentence(value).replace(/^./, (character) => character.toUpperCase());
const slug = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const comparable = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const prompt = (value) => clean(value).replace(/(?:\.{3}|…)/g, "the omitted idea");

function rotateAnswers(correct, distractors, position) {
  const correctKey = comparable(correct);
  const seen = new Set([correctKey]);
  const unique = distractors.map(clean).filter((value) => {
    const key = comparable(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  while (unique.length < 3) unique.push(`This answer does not fit the example.`);
  const result = unique.slice(0, 3).map((text) => ({ text, is_correct: false }));
  result.splice(position, 0, { text: clean(correct), is_correct: true });
  return result;
}

function modelRows(unit) {
  const data = unit.modelVisual?.data;
  return Array.isArray(data) && data.every(Array.isArray) ? data.slice(1) : [];
}

function applyRows(unit) {
  const data = unit.applyVisual?.data;
  return Array.isArray(data) && data.every(Array.isArray) ? data : [];
}

function pairText(row) {
  return row.map(clean).filter(Boolean).join(" → ");
}

function authoredDetails(code, unit) {
  const terms = unit.terms || [];
  const mistakes = unit.mistakes || [];
  const rows = modelRows(unit);
  const applicationRows = applyRows(unit);
  const [choice1Prompt, choice1Options] = unit.questions.choice1;
  const [choice2Prompt, choice2Options] = unit.questions.choice2;
  const fallbackRows = rows.length ? rows : applicationRows;
  const modelA = fallbackRows[0] || [unit.modelTitle, unit.modelNote];
  const modelB = fallbackRows[1] || modelA;

  const term1 = terms[0] || ["key idea", unit.learn];
  const term2 = terms[1] || term1;
  const mistake1 = mistakes[0] || ["This idea always works the same way", unit.modelNote];
  const mistake2 = mistakes[1] || mistake1;

  return [
    // QUESTION BANK: confidence first, then gradually deepen understanding.
    { bank: "practice", focus: unit.quick?.[0] || "recognise", question: choice1Prompt, correct: choice1Options[0], wrongs: choice1Options.slice(1), summary: `This answer fits the situation and shows ${sentence(unit.quick?.[0] || unit.title).toLowerCase()}.`, hint: `Look at the actual example and decide which choice best fits the audience, purpose or language feature.` },
    { bank: "practice", focus: term1[0], question: `Which example best matches this idea: ${sentence(term1[1])}?`, correct: choice1Options[0], wrongs: choice1Options.slice(1), summary: `${label(term1[0])} means ${sentence(term1[1])}. The correct example shows that idea in action.`, hint: `Use the example, not just the definition.` },
    { bank: "practice", focus: unit.quick?.[1] || "identify", question: choice2Prompt, correct: choice2Options[0], wrongs: choice2Options.slice(1), summary: `The correct answer uses the language feature in the way the situation requires.`, hint: `Compare what each option actually does.` },
    { bank: "practice", focus: "misconception repair", question: `Which example best shows why this idea is not always true: “${sentence(mistake1[0])}”?`, correct: label(mistake1[1]), wrongs: [label(mistake1[0]), label(mistake2[0]), `The rule is always true in every situation.`], summary: label(mistake1[1]), hint: `A useful rule must still work when the context changes.` },
    { bank: "practice", focus: unit.modelTitle, question: `Look at these examples. Which one correctly shows ${sentence(unit.modelTitle).toLowerCase()}?`, correct: pairText(modelA), wrongs: [pairText(modelA.slice().reverse()), pairText(modelB), label(mistake2[0])], summary: `The correct example keeps the relationship between the parts clear.`, hint: unit.modelNote },
    { bank: "practice", focus: "compare", question: `Which statement best explains the difference between these two examples: “${pairText(modelA)}” and “${pairText(modelB)}”?`, correct: `The difference comes from the language choices and the context in which they are used.`, wrongs: [`One is always correct and the other is always wrong.`, `The difference is only sentence length.`, `Context does not affect the meaning.`], summary: `English choices make sense in context. Compare the wording, purpose, audience and effect rather than looking for one rule that works everywhere.`, hint: unit.modelNote },
    { bank: "practice", focus: "guided application", question: `You need to complete this task: ${sentence(unit.questions.apply)}. What should you pay attention to first?`, correct: `Use the examples and language features from this skill, then explain how your choices fit the task.`, wrongs: [`Use as many difficult words as possible.`, `Ignore the example and write about a different idea.`, `Choose an answer without checking the context.`], summary: `A strong response applies the skill to the actual task.`, hint: unit.applyNote },
    { bank: "practice", focus: "independent application", question: `Which answer shows the strongest understanding of ${unit.title}?`, correct: `${label(unit.learn)}`, wrongs: [label(mistake1[0]), label(mistake2[0]), `A response that names the topic but does not apply it to an example.`], summary: `By the end of the question bank, you should be able to recognise the feature, apply it to a new example and explain why it works.`, hint: `Use the curriculum idea in a real example rather than repeating a definition.` },

    // TEST BANK: fresh examples, less scaffolding, same curriculum knowledge.
    { bank: "test", focus: term2[0], question: `Which option best demonstrates ${term2[0]} in a new example?`, correct: label(term2[1]), wrongs: [label(term1[1]), label(mistake1[0]), label(mistake2[0])], summary: `${label(term2[0])} is ${sentence(term2[1])}.`, hint: `Choose the option that matches the meaning most closely.` },
    { bank: "test", focus: "diagnosis", question: `A student uses this rule in every situation: “${sentence(mistake2[0])}.” What is the best correction?`, correct: label(mistake2[1]), wrongs: [label(mistake1[1]), label(mistake1[0]), `Keep using the rule because context never matters.`], summary: label(mistake2[1]), hint: `Think about why the original rule is too broad.` },
    { bank: "test", focus: unit.modelTitle, question: `Which new example best follows the pattern shown in this model: “${pairText(modelB)}”?`, correct: pairText(modelB), wrongs: [pairText(modelB.slice().reverse()), label(mistake1[0]), label(mistake2[0])], summary: `The correct response preserves the important relationship shown by the model.`, hint: unit.modelNote },
    { bank: "test", focus: unit.applyTitle, question: `Which response best applies ${unit.title} to an unfamiliar example?`, correct: `Choose the relevant language feature, use evidence from the example and explain what it does.`, wrongs: [`Name a feature without using the example.`, `Assume the same wording has the same effect in every context.`, `Choose whichever option sounds most complicated.`], summary: `Independent understanding means applying the skill to a fresh example and explaining the effect.`, hint: unit.applyNote },
    { bank: "test", focus: "transfer", question: `Which statement is safest when the context changes?`, correct: `The best interpretation depends on the evidence, purpose, audience and context.`, wrongs: [`One example proves the rule for every text.`, `The longest answer is always the most accurate.`, `Context can be ignored once a feature is named.`], summary: `Year 6 English skills are applied through evidence and context, not rigid slogans.`, hint: `Check what the example actually shows.` },
    { bank: "test", focus: "application", question: `Which student response best shows they can use this skill independently?`, correct: `They choose a relevant example, identify the important language choice and explain how it affects meaning.`, wrongs: [`They copy the definition only.`, `They use difficult vocabulary without explaining it.`, `They give an opinion without referring to the example.`], summary: `Independent understanding combines the right concept with evidence from the example.`, hint: `Look for application, not memorisation.` },
    { bank: "test", focus: "reasoning", question: `Two answers could seem reasonable at first. What should decide which one is better?`, correct: `Which answer is better supported by the wording and context of the example.`, wrongs: [`Which answer is longer.`, `Which answer uses more technical words.`, `Which answer sounds more confident.`], summary: `Evidence and context should decide between plausible interpretations.`, hint: `Return to the text or example.` },
    { bank: "test", focus: "curriculum mastery", question: `Which response best shows that a student understands the knowledge in ${code}?`, correct: `${label(unit.learn)}`, wrongs: [label(mistake1[0]), label(mistake2[0]), `The student remembers a term but cannot use it in an example.`], summary: `The goal is confident, age-appropriate understanding of the curriculum code, not advanced or elite-level analysis.`, hint: `Choose the response that can actually use the skill.` },
  ];
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
for (const code of order) {
  const unit = units[code];
  const details = authoredDetails(code, unit);
  const items = details.map((detail, index) => {
    const number = index % 8 + 1;
    const correctIndex = index % 4;
    const id = `${code.toLowerCase()}-${detail.bank === "practice" ? "p" : "t"}-${String(number).padStart(3, "0")}`;
    return {
      id,
      curriculum_code: code,
      year_level: "Year 6",
      subject: "english",
      bank: detail.bank,
      skill: slug(detail.focus),
      question: prompt(detail.question),
      audio_prompt: prompt(detail.question),
      visual: { type: "none", alt_text: "" },
      answers: rotateAnswers(detail.correct, detail.wrongs, correctIndex),
      correct_index: correctIndex,
      explanation: { summary: clean(detail.summary), hint: clean(detail.hint) },
      quality_schema: "student-learning-v2",
    };
  });
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
}

console.log(JSON.stringify({ codes: order.length, practice: order.length * 8, test: order.length * 8, total: order.length * 16, philosophy: "confidence -> recognition -> understanding -> guided application -> independent application" }, null, 2));
