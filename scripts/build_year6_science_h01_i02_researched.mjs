import fs from 'node:fs';
import path from 'node:path';
import { writeYear6ScienceClassroomView } from './year6_science_html_classroom_view.mjs';

const root = path.resolve(import.meta.dirname, '..');
const moduleFiles = [
  'scripts/year6_science_ac9s6h01.content.mjs',
  'scripts/year6_science_ac9s6h02.content.mjs',
  'scripts/year6_science_ac9s6i01.content.mjs',
  'scripts/year6_science_ac9s6i02.content.mjs'
];

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const normalise = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ');
const escapeHtml = (value) => clean(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function topicDirectory(code) {
  return fs.readdirSync(path.join(root, 'year6/science')).find((entry) => entry.startsWith(`${code.toLowerCase()}-`));
}

function stageValue(rawStage, bank, index) {
  const mapped = { support: 'foundation', core: 'core', extend: 'application', assessment: 'challenge', foundation: 'foundation', application: 'application', challenge: 'challenge' }[rawStage];
  if (mapped) return mapped;
  if (bank === 'practice') return ['foundation', 'core', 'application', 'challenge'][Math.floor(index / 12)];
  return 'challenge';
}

function canonicalItem(content, bank, raw, index) {
  const code = content.code;
  const shift = index % raw.answers.length;
  const rotatedAnswers = [...raw.answers.slice(shift), ...raw.answers.slice(0, shift)];
  const rotatedCorrect = (raw.correct - shift + raw.answers.length) % raw.answers.length;
  const answers = rotatedAnswers.map((text, answerIndex) => ({ text: clean(text), is_correct: answerIndex === rotatedCorrect }));
  return {
    id: `${code}-${bank === 'practice' ? 'P' : 'T'}-${String(index + 1).padStart(3, '0')}`,
    curriculum_code: code,
    year_level: 'Year 6',
    subject: 'science',
    bank,
    stage: stageValue(raw.stage, bank, index),
    skill: clean(raw.skill).replace(/\s+/g, '_').toLowerCase(),
    question: clean(raw.question),
    audio_prompt: clean(raw.question),
    answers,
    correct_index: rotatedCorrect,
    explanation: { summary: clean(raw.explanation), hint: clean(raw.hint) },
    difficulty: stageValue(raw.stage, bank, index) === 'foundation' ? 1 : stageValue(raw.stage, bank, index) === 'core' ? 2 : 3,
    difficulty_tier: stageValue(raw.stage, bank, index),
    sequence_priority: index + 1,
    quality_schema: 'independently-reviewed-original-v3'
  };
}

function validateContent(content) {
  const errors = [];
  if (content.practice?.length !== 48) errors.push('practice must contain 48 items');
  if (content.test?.length !== 16) errors.push('test must contain 16 items');
  if (content.worksheet?.length !== 12) errors.push('worksheet must contain 12 items');
  const practiceStimuli = new Set((content.practice || []).map((item) => normalise(item.question)));
  for (const [bank, items] of [['practice', content.practice || []], ['test', content.test || []]]) {
    if (new Set(items.map((item) => normalise(item.question))).size !== items.length) errors.push(`${bank} has duplicate stems`);
    items.forEach((item, index) => {
      const label = `${bank} ${index + 1}`;
      if (!['foundation', 'core', 'application', 'challenge'].includes(stageValue(item.stage, bank, index))) errors.push(`${label}: invalid stage`);
      if (!Array.isArray(item.answers) || item.answers.length !== 4 || new Set(item.answers.map(normalise)).size !== 4) errors.push(`${label}: four distinct answers required`);
      if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct > 3) errors.push(`${label}: invalid correct index`);
      if (clean(item.question).length < 30 || clean(item.explanation).length < 30 || clean(item.hint).length < 12) errors.push(`${label}: insufficient authored detail`);
    });
  }
  if ((content.test || []).some((item) => practiceStimuli.has(normalise(item.question)))) errors.push('test repeats a practice stem');
  if (errors.length) throw new Error(`${content.code}:\n${errors.join('\n')}`);
}

function buildTopic(content) {
  const vocabulary = content.vocabulary.map((item) => `<dt><strong>${escapeHtml(item.term)}</strong></dt><dd>${escapeHtml(item.definition)}</dd>`).join('');
  const success = content.successCriteria.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const steps = content.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const examples = content.practice.slice(0, 8).map((item) => `<article class="curriculum-worked-example"><h3>${escapeHtml(item.skill.replaceAll('_', ' '))}</h3><p><strong>Task:</strong> ${escapeHtml(item.question)}</p><p><strong>Model reasoning:</strong> ${escapeHtml(item.explanation)}</p></article>`).join('');
  const misconceptions = content.misconceptions.map((item) => `<li><strong>${escapeHtml(item.claim)}</strong> ${escapeHtml(item.correction)}</li>`).join('');
  const qa = content.importantQA.map((item) => `<li><strong>${escapeHtml(item.question)}</strong> <span class="curriculum-answer-prompt">${escapeHtml(item.answer)}</span></li>`).join('');
  const hints = content.assessmentHints.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  return `<details class="curriculum-topic-section topic-depth-upgrade" open id="topic-guide"><summary><strong>What students learn in ${content.code}</strong></summary><div class="curriculum-detail-body"><p><strong>Learning intention:</strong> ${escapeHtml(content.learningIntention)}</p><p><strong>Curriculum focus:</strong> ${escapeHtml(content.descriptor)}</p><h3>Success criteria</h3><ul>${success}</ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Key vocabulary</strong></summary><div class="curriculum-detail-body"><dl>${vocabulary}</dl></div></details>
<details class="curriculum-topic-section" open><summary><strong>Concept model and worked thinking</strong></summary><div class="curriculum-detail-body"><h3>Reliable routine</h3><ol>${steps}</ol><div class="unit-activity-grid">${examples}</div></div></details>
<details class="curriculum-topic-section"><summary><strong>Curriculum coverage and elaborations</strong></summary><div class="curriculum-detail-body">${content.topicSections.map((section) => `<h3>${escapeHtml(section.heading)}</h3><p>${escapeHtml(section.body)}</p>`).join('')}</div></details>
<details class="curriculum-topic-section"><summary><strong>Common misconceptions</strong></summary><div class="curriculum-detail-body"><ul>${misconceptions}</ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Important questions and answers</strong></summary><div class="curriculum-detail-body"><ul>${qa}</ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Assessment-style questions and review hints</strong></summary><div class="curriculum-detail-body"><ul>${hints}</ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Support, core and extend</strong></summary><div class="curriculum-detail-body"><ul><li><strong>Support:</strong> work with one short example, highlighted evidence and a structured response frame.</li><li><strong>Core:</strong> complete an unseen example independently and justify the decisive evidence.</li><li><strong>Extend:</strong> compare plausible alternatives, explain limitations and create a new example within the Year 6 boundary.</li></ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Exit ticket and mastery evidence</strong></summary><div class="curriculum-detail-body"><p>${escapeHtml(content.exitTicket)}</p><p><strong>Evidence of mastery:</strong> ${escapeHtml(content.masteryEvidence)}</p></div></details>
<details class="curriculum-topic-section" id="teacher-slide"><summary><strong>${content.code} Classroom View</strong></summary><div class="curriculum-detail-body"><p>Project the HTML teaching view, with classroom-sized sections drawn directly from this topic guide.</p><a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Classroom View</a></div></details>
<details class="curriculum-topic-section"><summary><strong>How to use this unit</strong></summary><div class="curriculum-detail-body"><p>Learn from the Topic Guide and Classroom View, complete the Worksheet, use Practice for supported feedback, then take the separate Test when ready.</p></div></details>`;
}

for (const moduleFile of moduleFiles) {
  const content = (await import(path.join(root, moduleFile))).default;
  validateContent(content);
  const bank = [...content.practice.map((item, index) => canonicalItem(content, 'practice', item, index)), ...content.test.map((item, index) => canonicalItem(content, 'test', item, index))];
  fs.writeFileSync(path.join(root, `assets/assessment-banks/year6/science/${content.code.toLowerCase()}.json`), `${JSON.stringify(bank, null, 2)}\n`);

  const directory = topicDirectory(content.code);
  const topicFile = path.join(root, 'year6/science', directory, 'index.html');
  let topic = fs.readFileSync(topicFile, 'utf8');
  const topicAnchor = topic.indexOf('id="topic-guide"');
  const start = topic.lastIndexOf('<details', topicAnchor);
  const end = topic.indexOf('<!-- skillr-topic-videos:start -->');
  if (start < 0 || end < 0 || end <= start) throw new Error(`${content.code}: cannot locate topic lesson boundaries`);
  topic = `${topic.slice(0, start)}${buildTopic(content)}\n\n      ${topic.slice(end)}`;
  fs.writeFileSync(topicFile, topic);

  writeYear6ScienceClassroomView(root, content.code, directory);

  const worksheetDirectory = path.join(root, `quiz/year-6/science/${content.code.toLowerCase()}/worksheet`);
  const worksheet = content.worksheet.map((item, index) => ({ id: `${content.code.toLowerCase()}-w-${String(index + 1).padStart(3, '0')}`, curriculumCode: content.code, printable: true, worksheet: true, type: 'self-check', question: clean(item.question), modelAnswer: clean(item.modelAnswer), explanation: clean(item.modelAnswer) }));
  fs.writeFileSync(path.join(worksheetDirectory, 'questions.js'), `"use strict";\nwindow.skillrWorksheetQuestions = ${JSON.stringify(worksheet, null, 2)};\nwindow.quizWorksheetQuestions = window.skillrWorksheetQuestions;\n`);
  let worksheetIndex = fs.readFileSync(path.join(worksheetDirectory, 'index.html'), 'utf8');
  worksheetIndex = worksheetIndex.replace(/<p><strong>Learning focus:<\/strong>[\s\S]*?<\/p>/, `<p><strong>Learning focus:</strong> ${escapeHtml(content.learningIntention)}</p>`).replace(/worksheetQuestionLimit:\d+/, 'worksheetQuestionLimit:12').replace(/<script src="\/quiz\/year-6\/english\/[^"]+\/(?:practice|worksheet)\/questions\.js"><\/script>/, `<script src="/quiz/year-6/science/${content.code.toLowerCase()}/worksheet/questions.js"></script>`);
  fs.writeFileSync(path.join(worksheetDirectory, 'index.html'), worksheetIndex);
  console.log(`${content.code}: built 48 Practice, 16 unseen Test, 12 Worksheet and an HTML Classroom View.`);
}
