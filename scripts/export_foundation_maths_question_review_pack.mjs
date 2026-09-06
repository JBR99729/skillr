import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();

const skills = [
  ['ac9mfn01', 'Name, represent and order numbers including zero to at least 20'],
  ['ac9mfn02', 'Recognise and name the number of objects within a collection up to 5'],
  ['ac9mfn03', 'Quantify and compare collections to at least 20'],
  ['ac9mfn04', 'Partition and combine collections up to 10'],
  ['ac9mfn05', 'Represent practical addition and subtraction situations'],
  ['ac9mfn06', 'Represent equal sharing and grouping situations'],
  ['ac9mfa01', 'Recognise, copy and continue repeating patterns'],
  ['ac9mfm01', 'Compare length, mass, capacity and duration'],
  ['ac9mfm02', 'Sequence days of the week and times of the day'],
  ['ac9mfsp01', 'Sort, name and create familiar shapes'],
  ['ac9mfsp02', 'Describe position and location'],
  ['ac9mfst01', 'Collect, sort and compare data represented by objects and images'],
];

function loadQuestions(file, bank) {
  const source = fs.readFileSync(file, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: file, timeout: 1000 });

  const key = bank === 'practice' ? 'skillrPracticeQuestions' : 'skillrTestQuestions';
  const questions = sandbox.window[key] || sandbox.window.quizQuestions;
  if (!Array.isArray(questions)) {
    throw new Error(`No question array found in ${file}`);
  }
  return questions;
}

function csv(value) {
  return `"${String(value ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' / ')}"`;
}

function currentCorrectAnswer(question) {
  if (Array.isArray(question.answers) && Number.isInteger(question.correct)) {
    return question.answers[question.correct];
  }
  return question.modelAnswer || question.correct || '';
}

const rows = [
  [
    'skill_code',
    'skill_title',
    'bank',
    'question_id',
    'current_question',
    'current_options',
    'current_correct_answer',
    'current_explanation',
    'suggested_replacement_question',
    'suggested_replacement_options',
    'suggested_correct_answer',
    'notes',
  ].map(csv).join(','),
];

let total = 0;

for (const [code, title] of skills) {
  for (const bank of ['practice', 'test']) {
    const file = path.join(root, 'quiz/grade-k/math', code, bank, 'questions.js');
    const questions = loadQuestions(file, bank);
    total += questions.length;

    for (const question of questions) {
      const options = Array.isArray(question.answers)
        ? question.answers.map((answer, index) => `${String.fromCharCode(65 + index)}. ${answer}`).join(' | ')
        : '';

      rows.push([
        code.toUpperCase(),
        title,
        bank,
        question.id,
        question.question,
        options,
        currentCorrectAnswer(question),
        question.explanation,
        '',
        '',
        '',
        '',
      ].map(csv).join(','));
    }
  }
}

fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/foundation-maths-question-review-pack.csv'), rows.join('\n'));

console.log(`Exported ${total} Foundation Maths questions to docs/foundation-maths-question-review-pack.csv`);
