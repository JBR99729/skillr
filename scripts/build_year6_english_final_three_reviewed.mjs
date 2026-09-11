import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const moduleFiles = [
  'scripts/year6_english_final_ac9e6la01.content.mjs',
  'scripts/year6_english_final_ac9e6ly08.content.mjs',
  'scripts/year6_english_final_ac9e6ly09.content.mjs'
];

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const normalise = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ');
const escapeHtml = (value) => clean(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const escapeXml = escapeHtml;

function wrap(value, width) {
  const words = clean(value).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line || `${line} ${word}`.length <= width) line = line ? `${line} ${word}` : word;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

function topicDirectory(code) {
  return fs.readdirSync(path.join(root, 'year6/english')).find((entry) => entry.startsWith(`${code.toLowerCase()}-`));
}

function stageValue(rawStage, bank, index) {
  const mapped = { support: 'foundation', core: 'core', extend: 'application', assessment: 'challenge', foundation: 'foundation', application: 'application', challenge: 'challenge' }[rawStage];
  if (mapped) return mapped;
  if (bank === 'practice') return ['foundation', 'core', 'application', 'challenge'][Math.floor(index / 12)];
  return 'challenge';
}

function canonicalItem(content, bank, raw, index) {
  const code = content.code;
  const answers = raw.answers.map((text, answerIndex) => ({ text: clean(text), is_correct: answerIndex === raw.correct }));
  return {
    id: `${code}-${bank === 'practice' ? 'P' : 'T'}-${String(index + 1).padStart(3, '0')}`,
    curriculum_code: code,
    year_level: 'Year 6',
    subject: 'english',
    bank,
    stage: stageValue(raw.stage, bank, index),
    skill: clean(raw.skill).replace(/\s+/g, '_').toLowerCase(),
    question: clean(raw.question),
    audio_prompt: clean(raw.question),
    answers,
    correct_index: raw.correct,
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
  if (content.slides?.length < 8 || content.slides?.length > 14) errors.push('slides must contain 8–14 pages');
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
<details class="curriculum-topic-section" id="teacher-slide"><summary><strong>${content.code} Classroom View</strong></summary><div class="curriculum-detail-body"><p>Project the fixed, branded page-by-page lesson drawn from this topic guide.</p><a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Classroom View</a></div></details>
<details class="curriculum-topic-section"><summary><strong>How to use this unit</strong></summary><div class="curriculum-detail-body"><p>Learn from the Topic Guide and Classroom View, complete the Worksheet, use Practice for supported feedback, then take the separate Test when ready.</p></div></details>`;
}

function buildSvg(content, slide, index) {
  const titleLines = wrap(slide.title, 42);
  const bodyLines = slide.body.flatMap((entry) => wrap(entry, 72).map((line, lineIndex) => ({ line, bullet: lineIndex === 0 })));
  if (titleLines.length > 2 || bodyLines.length > 17) throw new Error(`${content.code} slide ${index + 1} exceeds safe area (${titleLines.length} title, ${bodyLines.length} body lines)`);
  const title = titleLines.map((line, lineIndex) => `<text x="92" y="${142 + lineIndex * 54}" font-size="46" font-weight="800" fill="#173968">${escapeXml(line)}</text>`).join('');
  const startY = 255;
  const body = bodyLines.map((entry, lineIndex) => `<text x="${entry.bullet ? 112 : 145}" y="${startY + lineIndex * 34}" font-size="26" font-weight="600" fill="#17243a">${entry.bullet ? '• ' : ''}${escapeXml(entry.line)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(slide.title)}</title><desc id="desc">${escapeXml(slide.body.join(' '))}</desc><rect width="1600" height="900" fill="#f8fbff"/><rect width="1600" height="72" fill="#173968"/><text x="72" y="47" font-size="25" font-weight="800" fill="#ffffff">${content.code} · YEAR 6 ENGLISH</text><text x="1325" y="47" font-size="23" font-weight="700" fill="#ffffff">SkillrHub</text><g opacity="0.055" fill="#2457d6" font-size="34" font-weight="700" transform="rotate(-18 800 450)"><text x="170" y="340">SkillrHub • skillrhub.com</text><text x="660" y="530">SkillrHub • skillrhub.com</text><text x="1010" y="720">SkillrHub • skillrhub.com</text></g>${slide.kicker ? `<text x="92" y="103" font-size="20" font-weight="800" fill="#2457d6">${escapeXml(slide.kicker.toUpperCase())}</text>` : ''}${title}${body}<line x1="72" x2="1528" y1="840" y2="840" stroke="#cad8eb"/><text x="72" y="875" font-size="22" font-weight="700" fill="#53657d">${content.code} • SkillrHub • skillrhub.com</text><text x="1480" y="875" text-anchor="end" font-size="22" font-weight="700" fill="#53657d">${index + 1}/${content.slides.length}</text></svg>`;
}

function buildViewer(content, directory) {
  const figures = content.slides.map((slide, index) => `<figure class="slide${index === 0 ? ' active' : ''}" data-slide="${index + 1}"${index === 0 ? '' : ' hidden'}><img src="slide-${String(index + 1).padStart(2, '0')}.svg" alt="${escapeHtml(slide.title)}"></figure>`).join('');
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${content.code} Classroom View | SkillrHub</title><link rel="canonical" href="https://skillrhub.com/year6/english/${directory}/"><style>*{box-sizing:border-box}body{margin:0;background:#eaf0f7;color:#17243a;font-family:Arial,sans-serif}.shell{max-width:1500px;margin:auto;padding:14px}.toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}.toolbar a,.toolbar button{border:1px solid #b9c9df;border-radius:9px;background:#fff;color:#173968;padding:10px 14px;font-weight:800;text-decoration:none;cursor:pointer}.toolbar .primary{background:#173968;color:#fff}.count{margin-left:auto;font-weight:800}.stage{background:#111827;border-radius:14px;overflow:hidden;box-shadow:0 15px 45px #10213a33}.slide{margin:0;aspect-ratio:16/9}.slide img{display:block;width:100%;height:100%;object-fit:contain;user-select:none;-webkit-user-drag:none}.slide[hidden]{display:none}.controls{display:flex;justify-content:center;gap:12px;margin-top:12px}.controls button{min-width:120px;border:0;border-radius:9px;padding:11px 18px;background:#173968;color:#fff;font-weight:800;cursor:pointer}.controls button:disabled{opacity:.45}@media print{body{display:none!important}}</style></head><body><main class="shell"><nav class="toolbar" aria-label="Lesson resources"><a href="../">Topic Guide</a><a href="/quiz/year-6/english/${content.code.toLowerCase()}/worksheet/">Worksheet</a><a href="/quiz/year-6/english/${content.code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-6/english/${content.code.toLowerCase()}/test/">Test</a><button class="primary" id="fullscreen" type="button">Fullscreen</button><span class="count" id="count">Slide 1 of ${content.slides.length}</span></nav><section class="stage research-aligned-lesson" id="stage" aria-label="Fixed classroom presentation">${figures}</section><div class="controls"><button id="prev" type="button" disabled>Previous</button><button id="next" type="button">Next</button></div></main><script>(()=>{const slides=[...document.querySelectorAll('.slide')],count=document.getElementById('count'),prev=document.getElementById('prev'),next=document.getElementById('next'),stage=document.getElementById('stage');let index=0;function show(value){index=Math.max(0,Math.min(slides.length-1,value));slides.forEach((slide,i)=>{slide.hidden=i!==index;slide.classList.toggle('active',i===index)});count.textContent='Slide '+(index+1)+' of '+slides.length;prev.disabled=index===0;next.disabled=index===slides.length-1}prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));document.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(index+1)}if(event.key==='ArrowLeft'){event.preventDefault();show(index-1)}if((event.ctrlKey||event.metaKey)&&['c','p','s','u'].includes(event.key.toLowerCase()))event.preventDefault()});document.getElementById('fullscreen').addEventListener('click',()=>stage.requestFullscreen?.());stage.addEventListener('contextmenu',event=>event.preventDefault());show(0)})();</script></body></html>`;
}

for (const moduleFile of moduleFiles) {
  const content = (await import(path.join(root, moduleFile))).default;
  validateContent(content);
  const bank = [...content.practice.map((item, index) => canonicalItem(content, 'practice', item, index)), ...content.test.map((item, index) => canonicalItem(content, 'test', item, index))];
  fs.writeFileSync(path.join(root, `assets/assessment-banks/year6/english/${content.code.toLowerCase()}.json`), `${JSON.stringify(bank, null, 2)}\n`);

  const directory = topicDirectory(content.code);
  const topicFile = path.join(root, 'year6/english', directory, 'index.html');
  let topic = fs.readFileSync(topicFile, 'utf8');
  const topicAnchor = topic.indexOf('id="topic-guide"');
  const start = topic.lastIndexOf('<details', topicAnchor);
  const end = topic.indexOf('<!-- skillr-topic-videos:start -->');
  if (start < 0 || end < 0 || end <= start) throw new Error(`${content.code}: cannot locate topic lesson boundaries`);
  topic = `${topic.slice(0, start)}${buildTopic(content)}\n\n      ${topic.slice(end)}`;
  fs.writeFileSync(topicFile, topic);

  const slideDirectory = path.join(root, 'year6/english', directory, 'teacher-slides');
  content.slides.forEach((slide, index) => fs.writeFileSync(path.join(slideDirectory, `slide-${String(index + 1).padStart(2, '0')}.svg`), buildSvg(content, slide, index)));
  fs.writeFileSync(path.join(slideDirectory, 'index.html'), buildViewer(content, directory));

  const worksheetDirectory = path.join(root, `quiz/year-6/english/${content.code.toLowerCase()}/worksheet`);
  const worksheet = content.worksheet.map((item, index) => ({ id: `${content.code.toLowerCase()}-w-${String(index + 1).padStart(3, '0')}`, curriculumCode: content.code, printable: true, worksheet: true, type: 'self-check', question: clean(item.question), modelAnswer: clean(item.modelAnswer), explanation: clean(item.modelAnswer) }));
  fs.writeFileSync(path.join(worksheetDirectory, 'questions.js'), `"use strict";\nwindow.skillrWorksheetQuestions = ${JSON.stringify(worksheet, null, 2)};\nwindow.quizWorksheetQuestions = window.skillrWorksheetQuestions;\n`);
  let worksheetIndex = fs.readFileSync(path.join(worksheetDirectory, 'index.html'), 'utf8');
  worksheetIndex = worksheetIndex.replace(/<p><strong>Learning focus:<\/strong>[\s\S]*?<\/p>/, `<p><strong>Learning focus:</strong> ${escapeHtml(content.learningIntention)}</p>`).replace(/worksheetQuestionLimit:\d+/, 'worksheetQuestionLimit:12').replace(/<script src="\/quiz\/year-6\/english\/[^"]+\/(?:practice|worksheet)\/questions\.js"><\/script>/, `<script src="/quiz/year-6/english/${content.code.toLowerCase()}/worksheet/questions.js"></script>`);
  fs.writeFileSync(path.join(worksheetDirectory, 'index.html'), worksheetIndex);
  console.log(`${content.code}: built 48 Practice, 16 unseen Test, 12 Worksheet and ${content.slides.length} fixed slides.`);
}
