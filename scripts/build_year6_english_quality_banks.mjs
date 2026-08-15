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
  while (unique.length < 3) unique.push(`This response does not address ${unique.length === 0 ? "the evidence" : unique.length === 1 ? "the stated purpose" : "the language choice"}.`);
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
  const terms = unit.terms;
  const mistakes = unit.mistakes;
  const rows = modelRows(unit);
  const applicationRows = applyRows(unit);
  const [choice1Prompt, choice1Options] = unit.questions.choice1;
  const [choice2Prompt, choice2Options] = unit.questions.choice2;
  const misconceptionDistractors = mistakes.slice(0, 4).map(([error]) => label(error));
  const repairDistractors = mistakes.slice(0, 4).map(([, repair]) => label(repair));
  const termDistractors = terms.map(([name]) => name);
  const definitionDistractors = terms.map(([, definition]) => label(definition));
  const fallbackRows = rows.length ? rows : applicationRows;
  const modelA = fallbackRows[0] || [unit.modelTitle, unit.modelNote];
  const modelB = fallbackRows[1] || modelA;
  const applyA = applicationRows[0] || modelB;

  return [
    { bank: "practice", focus: unit.quick[0], question: choice1Prompt, correct: choice1Options[0], wrongs: choice1Options.slice(1), summary: `This choice best demonstrates ${sentence(unit.quick[0]).toLowerCase()} in the stated context.`, hint: unit.modelNote },
    { bank: "practice", focus: terms[0][0], question: `Which term means “${sentence(terms[0][1])}”?`, correct: terms[0][0], wrongs: [...termDistractors.slice(1), mistakes[0][0]], summary: `${terms[0][0]} means ${sentence(terms[0][1])}.`, hint: `Match the definition to the most precise term used in ${unit.title}.` },
    { bank: "practice", focus: unit.quick[1], question: choice2Prompt, correct: choice2Options[0], wrongs: choice2Options.slice(1), summary: `This answer applies the relevant language feature accurately.`, hint: unit.applyNote },
    { bank: "practice", focus: "misconception repair", question: `A student says, “${sentence(mistakes[0][0])}.” Which response best corrects the misunderstanding?`, correct: label(mistakes[0][1]), wrongs: [...repairDistractors.slice(1), label(mistakes[0][0])], summary: label(mistakes[0][1]), hint: `Check the concept boundary, not just whether the wording sounds confident.` },
    { bank: "practice", focus: unit.modelTitle, question: `Which pairing accurately reflects the model for ${unit.title}?`, correct: pairText(modelA), wrongs: [pairText(modelA.slice().reverse()), pairText(modelB), label(mistakes[1][0])], summary: `The pairing comes directly from the lesson model and preserves the intended relationship.`, hint: unit.modelNote },
    { bank: "practice", focus: "concept principle", question: `Which principle should guide a response about ${unit.title}?`, correct: label(unit.modelNote), wrongs: misconceptionDistractors, summary: label(unit.modelNote), hint: `Choose the statement that is accurate across the whole concept, not an overgeneralisation.` },
    { bank: "practice", focus: "guided application", question: `Which plan would best complete this task: ${sentence(unit.questions.apply)}?`, correct: `Use the named features, relevant evidence and an explanation of how each choice shapes meaning.`, wrongs: [`List features without explaining their effects.`, `Give a personal preference without textual evidence.`, `Discuss a different topic instead of the stated task.`], summary: `A complete response combines relevant evidence with an explanation tied to the task.`, hint: unit.applyNote },
    { bank: "practice", focus: "reasoning", question: `Which evidence would best show secure understanding of ${unit.title}?`, correct: `${label(unit.learn)} The response also explains its evidence and limitations.`, wrongs: misconceptionDistractors, summary: `Secure understanding is visible when a student applies the concept and explains the evidence used.`, hint: `Look for application and explanation rather than a feature name alone.` },

    { bank: "test", focus: terms[1][0], question: `In a new text, which definition correctly identifies ${terms[1][0]}?`, correct: label(terms[1][1]), wrongs: [...definitionDistractors.filter((value) => value !== label(terms[1][1])), label(mistakes[1][0])], summary: `${terms[1][0]} means ${sentence(terms[1][1])}.`, hint: `Distinguish this term from related features in the unit.` },
    { bank: "test", focus: "diagnosis", question: `A response shows this problem: “${sentence(mistakes[1][0])}.” What is the most effective revision?`, correct: label(mistakes[1][1]), wrongs: [label(mistakes[0][1]), label(mistakes[2][1]), `Keep the response unchanged because the issue does not affect meaning.`], summary: label(mistakes[1][1]), hint: `Choose the repair that directly addresses the diagnosed problem.` },
    { bank: "test", focus: unit.modelTitle, question: `Which interpretation of this model element is accurate: “${pairText(modelB)}”?`, correct: `It shows a deliberate relationship within ${unit.title}, so both parts must be interpreted together.`, wrongs: [`The first part is decorative and can be ignored.`, `The second part always has the same effect in every text.`, `The pairing proves that no alternative interpretation is possible.`], summary: `The model links the feature to its contextual function without claiming a universal effect.`, hint: unit.modelNote },
    { bank: "test", focus: unit.applyTitle, question: `When applying ${unit.title} to an unfamiliar text, which analytical move is strongest?`, correct: `Identify the specific choice, cite relevant evidence and explain its contextual effect.`, wrongs: [`Name a feature and stop.`, `Assume every audience responds identically.`, `Replace analysis with an unsupported personal judgement.`], summary: `Strong analysis connects a specific choice and evidence to a contextual effect.`, hint: unit.applyNote },
    { bank: "test", focus: terms[2][0], question: `Which example best demonstrates an understanding of ${terms[2][0]}?`, correct: `${label(terms[2][1])}, identified using evidence from the text.`, wrongs: [label(mistakes[2][0]), label(mistakes[3][0]), `A general comment that does not use the text.`], summary: `${terms[2][0]} is ${sentence(terms[2][1])}.`, hint: `Select the response that applies the definition and uses evidence.` },
    { bank: "test", focus: "transfer", question: `Which conclusion stays within the evidence when analysing ${unit.title}?`, correct: `The evidence supports this interpretation, although context may allow another defensible reading.`, wrongs: [`This single example proves the rule applies identically everywhere.`, `The writer's choice guarantees the same reaction from every reader.`, `No evidence is needed because the interpretation sounds reasonable.`], summary: `A defensible conclusion uses evidence and acknowledges reasonable limits.`, hint: `Avoid absolute claims unless the evidence genuinely supports them.` },
    { bank: "test", focus: "extended analysis", question: `Which response plan best addresses this challenge: ${sentence(unit.questions.enrichment1)}?`, correct: `Make an original, purposeful choice, apply the unit's techniques consistently and annotate the resulting effects.`, wrongs: [`Copy the lesson example without adapting it.`, `Add several unrelated features and do not explain them.`, `Describe the task but do not produce or analyse a response.`], summary: `The challenge requires controlled transfer of the concept plus an explanation of the choices made.`, hint: unit.applyNote },
    { bank: "test", focus: "critical evaluation", question: `Which approach best addresses this evaluation: ${sentence(unit.questions.enrichment2)}?`, correct: `Use explicit criteria, compare relevant evidence and qualify the final judgement.`, wrongs: [`Choose a preferred answer before examining evidence.`, `Summarise each example without comparing it.`, `Treat one feature as proof of the whole judgement.`], summary: `Evaluation requires criteria, comparative evidence and a proportionate conclusion.`, hint: `Build the judgement from evidence rather than preference.` },
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
    };
  });
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
}

console.log(JSON.stringify({ codes: order.length, practice: order.length * 8, test: order.length * 8, total: order.length * 16 }, null, 2));