import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();

const skills = [
  ['ac9sfu01', 'Observe external features of plants and animals'],
  ['ac9sfu02', 'Explore how objects move'],
  ['ac9sfu03', 'Identify materials and their observable properties'],
  ['ac9sfh01', 'Explore how people use science in daily life'],
  ['ac9sfi01', 'Pose questions and make predictions'],
  ['ac9sfi02', 'Participate in guided investigations'],
  ['ac9sfi03', 'Use senses and tools to observe and measure'],
  ['ac9sfi04', 'Represent observations and identify patterns'],
  ['ac9sfi05', 'Share observations and ideas'],
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
    const file = path.join(root, 'quiz/grade-k/science', code, bank, 'questions.js');
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
fs.writeFileSync(path.join(root, 'docs/foundation-science-question-review-pack.csv'), rows.join('\n'));

console.log(`Exported ${total} Foundation Science questions to docs/foundation-science-question-review-pack.csv`);
