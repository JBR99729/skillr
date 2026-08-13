#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const repoRoot = process.cwd();
const outputCsv = path.join(repoRoot, 'curriculum-question-banks/qa/year1-to-year10-live-audit.csv');
const outputMarkdown = path.join(repoRoot, 'curriculum-question-banks/qa/year1-to-year10-live-audit.md');

const MINIMUMS = { practice: 24, test: 16 };
const SUBJECTS = ['math', 'science', 'english'];
const GENERIC_PATTERNS = [
  /which option best describes the skill being practised/i,
  /which task gives the best practice for this skill/i,
  /which example gives useful evidence of this learning/i,
  /which statement best summarises this topic/i,
  /which option stays focused on the curriculum goal/i,
  /what should students be able to explain or demonstrate after this unit/i,
  /this matches AC9/i,
];
const FILLER_ANSWERS = /^(none|all|maybe|i don['’]t know|not sure|something else|other)$/i;

function normalise(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function extractQuestionScript(htmlPath) {
  if (!fs.existsSync(htmlPath)) return null;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const matches = [...html.matchAll(/<script[^>]+src=["']([^"']*questions\.js[^"']*)["'][^>]*>/gi)];
  if (!matches.length) return null;
  const raw = matches.at(-1)[1].split('?')[0].split('#')[0];
  return raw.startsWith('/')
    ? path.join(repoRoot, raw.slice(1))
    : path.resolve(path.dirname(htmlPath), raw);
}

function loadQuestions(scriptPath) {
  if (!scriptPath || !fs.existsSync(scriptPath)) {
    return { questions: [], error: scriptPath ? 'question script missing' : 'question script not referenced' };
  }

  const window = {};
  const sandbox = { window, Array, Object, Math, Number, String, Boolean, JSON };
  try {
    vm.runInNewContext(fs.readFileSync(scriptPath, 'utf8'), sandbox, {
      filename: path.relative(repoRoot, scriptPath),
      timeout: 5000,
    });
  } catch (error) {
    return { questions: [], error: `could not evaluate: ${error.message}` };
  }

  const candidates = [
    window.skillrPracticeQuestions,
    window.skillrExamQuestions,
    window.quizQuestions,
    window.questions,
  ].filter(Array.isArray);

  if (!candidates.length) return { questions: [], error: 'no recognised question array' };
  return { questions: candidates.sort((a, b) => b.length - a.length)[0], error: null };
}

function answerList(item) {
  if (Array.isArray(item.answers)) return item.answers;
  if (Array.isArray(item.options)) return item.options;
  return [];
}

function correctIndex(item, answers) {
  if (Number.isInteger(item.correct_index)) return item.correct_index;
  if (Number.isInteger(item.correct)) return item.correct;
  const embedded = answers.findIndex(answer => answer && typeof answer === 'object' && answer.is_correct === true);
  return embedded >= 0 ? embedded : null;
}

function hasStructuredExplanation(item) {
  return Boolean(item.explanation && typeof item.explanation === 'object' && item.explanation.summary && item.explanation.hint)
    || Boolean(item.structuredExplanation?.summary && item.structuredExplanation?.hint);
}

function hasAudio(item) {
  return Boolean(item.audio_prompt || item.audioPrompt);
}

function hasVisual(item) {
  return Boolean(
    (typeof item.visual === 'string' && item.visual.trim())
    || (item.visual && typeof item.visual === 'object' && item.visual.type !== 'none')
    || (item.visualMeta && item.visualMeta.type !== 'none')
    || item.image
    || item.visualAsset
    || item.visual_asset,
  );
}

function hasAlt(item) {
  if (!hasVisual(item)) return true;
  return Boolean(
    (typeof item.visual === 'string' && item.visual.trim())
    || item.visual?.alt_text
    || item.visual?.altText
    || item.visualMeta?.alt_text
    || item.visualMeta?.altText
    || item.imageAlt
    || item.visualAlt
    || item.visual_alt,
  );
}

function itemFingerprint(item) {
  const answers = answerList(item).map(answer => normalise(answer?.text ?? answer)).join('|');
  const visual = normalise(
    typeof item.visual === 'string'
      ? item.visual
      : item.visual?.alt_text
        || item.visual?.altText
        || item.visualMeta?.alt_text
        || item.visualMeta?.altText
        || item.imageAlt
        || '',
  );
  return `${normalise(item.question)}::${answers}::${visual}`;
}

function analyseBank(questions, year) {
  const fingerprints = questions.map(itemFingerprint).filter(Boolean);
  const duplicateCount = fingerprints.length - new Set(fingerprints).size;
  const mcq = [];
  let malformed = 0;
  let generic = 0;
  let truncated = 0;
  let filler = 0;
  let missingExplanation = 0;
  let missingAudio = 0;
  let missingAlt = 0;
  let optionCountMismatch = 0;

  for (const item of questions) {
    const prompt = String(item.question ?? '');
    const answers = answerList(item);
    const index = correctIndex(item, answers);
    if (!prompt.trim()) malformed += 1;
    if (GENERIC_PATTERNS.some(pattern => pattern.test(prompt) || pattern.test(String(item.explanation ?? '')))) generic += 1;
    if (/[\u2026]|\.\.\./.test(prompt) || answers.some(answer => /[\u2026]|\.\.\./.test(String(answer?.text ?? answer)))) truncated += 1;
    if (answers.some(answer => FILLER_ANSWERS.test(String(answer?.text ?? answer).trim()))) filler += 1;
    if (!hasStructuredExplanation(item)) missingExplanation += 1;
    if (year <= 2 && !hasAudio(item)) missingAudio += 1;
    if (!hasAlt(item)) missingAlt += 1;

    const embeddedCorrectCount = answers.filter(
      answer => answer && typeof answer === 'object' && answer.is_correct === true,
    ).length;
    const isSingleChoice = answers.length > 0 && (
      item.type === 'single'
      || Number.isInteger(item.correct_index)
      || (embeddedCorrectCount === 1 && item.type !== 'multiple')
    );

    if (isSingleChoice) {
      mcq.push({ answers, index });
      const expected = year <= 2 ? 3 : 4;
      if (answers.length !== expected) optionCountMismatch += 1;
      if (!Number.isInteger(index) || index < 0 || index >= answers.length) malformed += 1;
    } else if (answers.length && item.type === 'multiple') {
      const correct = item.correct;
      if (!Array.isArray(correct) && embeddedCorrectCount < 2) malformed += 1;
    }
  }

  const distribution = {};
  for (const item of mcq) {
    if (Number.isInteger(item.index)) distribution[item.index] = (distribution[item.index] ?? 0) + 1;
  }
  const distributionValues = Object.values(distribution);
  const answerBias = distributionValues.length > 1
    ? Math.max(...distributionValues) - Math.min(...distributionValues)
    : mcq.length > 1 ? mcq.length : 0;

  return {
    count: questions.length,
    mcqCount: mcq.length,
    responseItemCount: questions.length - mcq.length,
    malformed,
    duplicateCount,
    genericTemplateCount: generic,
    truncatedCount: truncated,
    fillerDistractorCount: filler,
    missingStructuredExplanationCount: missingExplanation,
    missingAudioCount: missingAudio,
    missingVisualAltCount: missingAlt,
    optionCountMismatchCount: optionCountMismatch,
    correctIndexDistribution: distribution,
    correctIndexSpread: answerBias,
  };
}

function listCodes(year, subject) {
  const root = path.join(repoRoot, `quiz/year-${year}/${subject}`);
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^ac9[a-z0-9]+$/i.test(entry.name))
    .map(entry => path.join(root, entry.name))
    .sort();
}

const codes = [];
for (let year = 1; year <= 10; year += 1) {
  for (const subject of SUBJECTS) {
    for (const codeDir of listCodes(year, subject)) {
      const code = path.basename(codeDir).toUpperCase();
      const practiceScript = extractQuestionScript(path.join(codeDir, 'practice/index.html'));
      const testScript = extractQuestionScript(path.join(codeDir, 'test/index.html'));
      const practiceLoad = loadQuestions(practiceScript);
      const testLoad = loadQuestions(testScript);
      const practice = analyseBank(practiceLoad.questions, year);
      const test = analyseBank(testLoad.questions, year);
      const sharedSource = Boolean(practiceScript && testScript && path.resolve(practiceScript) === path.resolve(testScript));
      const practiceSet = new Set(practiceLoad.questions.map(itemFingerprint).filter(Boolean));
      const crossBankDuplicates = testLoad.questions.reduce(
        (total, item) => total + (practiceSet.has(itemFingerprint(item)) ? 1 : 0),
        0,
      );

      const issues = [];
      if (practice.count < MINIMUMS.practice) issues.push(`practice below ${MINIMUMS.practice}`);
      if (sharedSource || test.count < MINIMUMS.test) issues.push(`dedicated test below ${MINIMUMS.test}`);
      if (sharedSource) issues.push('practice and test load the same source');
      if (crossBankDuplicates) issues.push(`${crossBankDuplicates} practice/test duplicate prompts`);
      if (practice.genericTemplateCount + test.genericTemplateCount) issues.push('generic curriculum-description items');
      if (practice.truncatedCount + test.truncatedCount) issues.push('truncated prompt or answer text');
      if (practice.duplicateCount + test.duplicateCount) issues.push('duplicate prompts within a bank');
      if (practice.fillerDistractorCount + test.fillerDistractorCount) issues.push('filler distractors');
      if (practice.missingStructuredExplanationCount + test.missingStructuredExplanationCount) issues.push('missing summary + hint feedback');
      if (year <= 2 && practice.missingAudioCount + test.missingAudioCount) issues.push('missing early-years audio prompts');
      if (practice.missingVisualAltCount + test.missingVisualAltCount) issues.push('visual missing alt text');
      if (practice.optionCountMismatchCount + test.optionCountMismatchCount) issues.push('grade-band option count mismatch');
      if (practice.correctIndexSpread > 1 || test.correctIndexSpread > 1) issues.push('correct-answer position imbalance');
      if (practice.malformed + test.malformed) issues.push('malformed items');

      codes.push({
        code,
        year,
        subject,
        paths: {
          practice: practiceScript ? path.relative(repoRoot, practiceScript) : null,
          test: testScript ? path.relative(repoRoot, testScript) : null,
        },
        sharedSource,
        crossBankDuplicateCount: crossBankDuplicates,
        practice,
        test,
        loadErrors: [practiceLoad.error, testLoad.error].filter(Boolean),
        passesCountBaseline: practice.count >= MINIMUMS.practice && !sharedSource && test.count >= MINIMUMS.test,
        passesQualitySignals: issues.length === 0,
        issues,
      });
    }
  }
}

const groups = [];
for (let year = 1; year <= 10; year += 1) {
  for (const subject of SUBJECTS) {
    const rows = codes.filter(row => row.year === year && row.subject === subject);
    groups.push({
      year,
      subject,
      codes: rows.length,
      countBaselinePass: rows.filter(row => row.passesCountBaseline).length,
      qualitySignalPass: rows.filter(row => row.passesQualitySignals).length,
      sharedSource: rows.filter(row => row.sharedSource).length,
      belowPractice: rows.filter(row => row.practice.count < MINIMUMS.practice).length,
      belowDedicatedTest: rows.filter(row => row.sharedSource || row.test.count < MINIMUMS.test).length,
      genericTemplateCodes: rows.filter(row => row.practice.genericTemplateCount + row.test.genericTemplateCount > 0).length,
      truncatedCodes: rows.filter(row => row.practice.truncatedCount + row.test.truncatedCount > 0).length,
      missingStructuredFeedbackCodes: rows.filter(row => row.practice.missingStructuredExplanationCount + row.test.missingStructuredExplanationCount > 0).length,
      practiceItemsToCreate: rows.reduce(
        (total, row) => total + Math.max(0, MINIMUMS.practice - row.practice.count),
        0,
      ),
      dedicatedTestItemsToCreate: rows.reduce(
        (total, row) => total + (row.sharedSource
          ? MINIMUMS.test
          : Math.max(0, MINIMUMS.test - row.test.count)),
        0,
      ),
    });
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  scope: 'Year 1 to Year 10 Mathematics, Science and English live quiz banks',
  baseline: MINIMUMS,
  codeCount: codes.length,
  countBaselinePass: codes.filter(row => row.passesCountBaseline).length,
  qualitySignalPass: codes.filter(row => row.passesQualitySignals).length,
  sharedPracticeTestSource: codes.filter(row => row.sharedSource).length,
  belowPractice: codes.filter(row => row.practice.count < MINIMUMS.practice).length,
  belowDedicatedTest: codes.filter(row => row.sharedSource || row.test.count < MINIMUMS.test).length,
  genericTemplateCodes: codes.filter(row => row.practice.genericTemplateCount + row.test.genericTemplateCount > 0).length,
  truncatedCodes: codes.filter(row => row.practice.truncatedCount + row.test.truncatedCount > 0).length,
  missingStructuredFeedbackCodes: codes.filter(row => row.practice.missingStructuredExplanationCount + row.test.missingStructuredExplanationCount > 0).length,
  earlyYearsMissingAudioCodes: codes.filter(row => row.year <= 2 && row.practice.missingAudioCount + row.test.missingAudioCount > 0).length,
  pagesWithoutLoadableBanks: codes.filter(row => row.loadErrors.length > 0).length,
  minimumPracticeItemsToCreate: codes.reduce(
    (total, row) => total + Math.max(0, MINIMUMS.practice - row.practice.count),
    0,
  ),
  minimumDedicatedTestItemsToCreate: codes.reduce(
    (total, row) => total + (row.sharedSource
      ? MINIMUMS.test
      : Math.max(0, MINIMUMS.test - row.test.count)),
    0,
  ),
};
summary.minimumItemsToCreate = summary.minimumPracticeItemsToCreate + summary.minimumDedicatedTestItemsToCreate;

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const csvRows = [
  ['code','year','subject','practice_count','test_count','baseline_pass','quality_pass','shared_source','cross_bank_duplicates','generic_items','truncated_items','missing_feedback','missing_audio','missing_visual_alt','option_mismatch','practice_answer_spread','test_answer_spread','practice_path','test_path','issues'],
  ...codes.map(row => [
    row.code,row.year,row.subject,row.practice.count,row.test.count,row.passesCountBaseline,row.passesQualitySignals,row.sharedSource,row.crossBankDuplicateCount,
    row.practice.genericTemplateCount + row.test.genericTemplateCount,
    row.practice.truncatedCount + row.test.truncatedCount,
    row.practice.missingStructuredExplanationCount + row.test.missingStructuredExplanationCount,
    row.practice.missingAudioCount + row.test.missingAudioCount,
    row.practice.missingVisualAltCount + row.test.missingVisualAltCount,
    row.practice.optionCountMismatchCount + row.test.optionCountMismatchCount,
    row.practice.correctIndexSpread,row.test.correctIndexSpread,row.paths.practice,row.paths.test,row.issues.join('; '),
  ]),
];
fs.writeFileSync(outputCsv, `${csvRows.map(row => row.map(csvCell).join(',')).join('\n')}\n`);

const md = [
  '# Year 1–10 live assessment-bank audit',
  '',
  `Generated: ${summary.generatedAt}`,
  '',
  '## Release baseline',
  '',
  `- Practice: at least ${MINIMUMS.practice} unique items per curriculum code`,
  `- Test: at least ${MINIMUMS.test} dedicated items per curriculum code`,
  '- Practice and Test must not load the same question source.',
  '- Quality signals include grade-band option counts, balanced correct positions, meaningful distractors, complete prompt text, structured summary + hint feedback, and early-years audio metadata.',
  '',
  '## Overall result',
  '',
  `- Curriculum codes checked: **${summary.codeCount}**`,
  `- Passing the 24/16 count-and-separation baseline: **${summary.countBaselinePass}**`,
  `- Passing all automated quality signals: **${summary.qualitySignalPass}**`,
  `- Practice and Test sharing one source: **${summary.sharedPracticeTestSource}**`,
  `- Below 24 Practice: **${summary.belowPractice}**`,
  `- Below 16 dedicated Test: **${summary.belowDedicatedTest}**`,
  `- Codes containing generic curriculum-description items: **${summary.genericTemplateCodes}**`,
  `- Codes containing visibly truncated prompts/options: **${summary.truncatedCodes}**`,
  `- Codes missing structured summary + hint feedback: **${summary.missingStructuredFeedbackCodes}**`,
  `- Year 1–2 codes missing audio metadata: **${summary.earlyYearsMissingAudioCodes}**`,
  `- Pages without a loadable Practice or Test bank: **${summary.pagesWithoutLoadableBanks}**`,
  `- Minimum additional Practice items needed: **${summary.minimumPracticeItemsToCreate.toLocaleString('en-AU')}**`,
  `- Minimum additional dedicated Test items needed: **${summary.minimumDedicatedTestItemsToCreate.toLocaleString('en-AU')}**`,
  `- Minimum new items required for the baseline: **${summary.minimumItemsToCreate.toLocaleString('en-AU')}**`,
  '',
  '## Results by year and subject',
  '',
  '| Year | Subject | Codes | Baseline pass | Shared source | <24 Practice | <16 dedicated Test | New Practice | New Test | Generic templates | Truncation | Missing summary + hint |',
  '| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
  ...groups.map(group => `| ${group.year} | ${group.subject} | ${group.codes} | ${group.countBaselinePass} | ${group.sharedSource} | ${group.belowPractice} | ${group.belowDedicatedTest} | ${group.practiceItemsToCreate} | ${group.dedicatedTestItemsToCreate} | ${group.genericTemplateCodes} | ${group.truncatedCodes} | ${group.missingStructuredFeedbackCodes} |`),
  '',
  '## Interpretation',
  '',
  '- A large source file is not counted as a dedicated Test bank when both modes load the same file.',
  '- Automated quality checks identify high-risk patterns; they do not replace curriculum-level conceptual review.',
  '- The CSV companion contains code-by-code paths, counts, duplicate totals, answer-position spreads and issue labels for production planning.',
  '',
];
fs.writeFileSync(outputMarkdown, `${md.join('\n')}\n`);

console.log(JSON.stringify(summary, null, 2));
