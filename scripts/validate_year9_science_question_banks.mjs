#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const codes = [
  ...Array.from({ length: 7 }, (_, i) => `AC9S9U0${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `AC9S9H0${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `AC9S9I0${i + 1}`),
];

const problems = [];

function load(file, kind) {
  if (!fs.existsSync(file)) {
    problems.push(`${file}: missing`);
    return [];
  }
  const src = fs.readFileSync(file, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  try {
    vm.runInContext(src, context, { filename: file });
  } catch (error) {
    problems.push(`${file}: parse/runtime error ${error.message}`);
    return [];
  }
  return kind === 'practice'
    ? context.window.skillrPracticeQuestions || context.window.quizQuestions || []
    : context.window.skillrTestQuestions || context.window.skillrExamQuestions || context.window.quizQuestions || [];
}

function sectionRank(section) {
  const match = String(section || '').match(/Section\s+([A-Z])/i);
  return match ? match[1].toUpperCase().charCodeAt(0) - 64 : null;
}

function itemOrder(question, fallbackIndex) {
  if (Number.isFinite(question.sourceNumber)) return question.sourceNumber;
  const suffix = String(question.id || '').match(/-(\d+)$/)?.[1];
  return suffix ? Number(suffix) : fallbackIndex + 1;
}

function hasUsefulFeedback(question) {
  if (question.structuredExplanation?.summary && question.structuredExplanation?.hint) return true;
  const explanation = String(question.explanation || '').trim();
  const hint = String(question.hint || '').trim();
  return Boolean(explanation && (hint || /\bhint\s*:/i.test(explanation)));
}

function validateBank(code, bankName, items, expectedCount, seenIds, seenQuestions) {
  if (items.length !== expectedCount) {
    problems.push(`${code}: ${bankName} has ${items.length}, expected ${expectedCount}`);
  }

  let previousOrder = -Infinity;
  let previousSection = 0;
  let sawSection = false;

  for (const [index, question] of items.entries()) {
    const where = question.id || `${code} ${bankName} item ${index + 1}`;

    if (question.curriculumCode !== code) {
      problems.push(`${where}: curriculumCode mismatch ${question.curriculumCode}`);
    }
    if (question.bank && question.bank !== bankName.toLowerCase()) {
      problems.push(`${where}: bank mismatch ${question.bank}`);
    }
    if (!question.id) {
      problems.push(`${code} ${bankName} item ${index + 1}: missing id`);
    } else if (seenIds.has(question.id)) {
      problems.push(`${code}: duplicate id ${question.id}`);
    } else {
      seenIds.add(question.id);
    }

    const normalisedQuestion = String(question.question || '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (!normalisedQuestion) {
      problems.push(`${where}: empty question`);
    } else if (seenQuestions.has(normalisedQuestion)) {
      problems.push(`${code}: duplicate question stem ${question.question}`);
    } else {
      seenQuestions.add(normalisedQuestion);
    }

    if (!Array.isArray(question.answers) || question.answers.length < 3) {
      problems.push(`${where}: insufficient answers`);
    }
    if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= (question.answers?.length ?? 0)) {
      problems.push(`${where}: invalid correct answer index`);
    }
    if (!hasUsefulFeedback(question)) {
      problems.push(`${where}: missing explanatory feedback/hint`);
    }

    const order = itemOrder(question, index);
    if (!Number.isFinite(order)) {
      problems.push(`${where}: cannot determine item order`);
    } else if (order <= previousOrder) {
      problems.push(`${where}: item order ${order} is not progressive after ${previousOrder}`);
    } else {
      previousOrder = order;
    }

    const rank = sectionRank(question.section);
    if (rank !== null) {
      sawSection = true;
      if (rank < previousSection) {
        problems.push(`${where}: section ordering regresses from rank ${previousSection} to ${rank}`);
      }
      previousSection = Math.max(previousSection, rank);
    }
  }

  return sawSection;
}

let practiceTotal = 0;
let testTotal = 0;
let banksWithSectionMetadata = 0;

for (const code of codes) {
  const slug = code.toLowerCase();
  const root = path.join('quiz', 'year-9', 'science', slug);
  const practice = load(path.join(root, 'practice', 'questions.js'), 'practice');
  const test = load(path.join(root, 'test', 'questions.js'), 'test');
  practiceTotal += practice.length;
  testTotal += test.length;

  const seenIds = new Set();
  const seenQuestions = new Set();
  if (validateBank(code, 'Practice', practice, 24, seenIds, seenQuestions)) banksWithSectionMetadata += 1;
  if (validateBank(code, 'Test', test, 16, seenIds, seenQuestions)) banksWithSectionMetadata += 1;
}

if (practiceTotal !== 456) problems.push(`Year 9 Science Practice total ${practiceTotal}, expected 456`);
if (testTotal !== 304) problems.push(`Year 9 Science Test total ${testTotal}, expected 304`);

if (problems.length) {
  console.error('Year 9 Science question-bank quality/progression FAILED:\n');
  problems.forEach(problem => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(`Year 9 Science question banks PASS: ${practiceTotal} Practice + ${testTotal} Test questions; 24/16 per code, unique stems, valid answers, explanatory feedback and progressive item ordering.`);
console.log(`Section-order metadata additionally verified in ${banksWithSectionMetadata} bank(s); legacy banks without section metadata are validated by stable sequential item IDs. Global progressive-question-ordering CI remains the sitewide progression gate.`);
