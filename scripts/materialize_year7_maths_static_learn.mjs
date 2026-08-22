#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const context = { window: {}, console };
vm.createContext(context);
for (const file of [
  'assets/topic-module-v2.js',
  'assets/year7-maths-topic-modules-v2.js',
  'assets/topic-module-v2-visuals.js'
]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}

const registry = context.window.SkillrTopicModulesV2;
const visualRenderer = context.window.SkillrTopicModuleV2Visuals;
if (!registry || !visualRenderer) throw new Error('Year 7 Maths module registry/visual renderer failed to load.');

const order = [
  'AC9M7N01','AC9M7N02','AC9M7N03','AC9M7N04','AC9M7N05','AC9M7N06','AC9M7N07','AC9M7N08','AC9M7N09',
  'AC9M7A01','AC9M7A02','AC9M7A03','AC9M7A04','AC9M7A05','AC9M7A06',
  'AC9M7M01','AC9M7M02','AC9M7M03','AC9M7M04','AC9M7M05','AC9M7M06',
  'AC9M7SP01','AC9M7SP02','AC9M7SP03','AC9M7SP04',
  'AC9M7ST01','AC9M7ST02','AC9M7ST03',
  'AC9M7P01','AC9M7P02'
];

const modules = order.map((code) => registry.get(code));
if (modules.some((module) => !module)) throw new Error('One or more Year 7 Maths modules are missing.');
if (modules.length !== 30) throw new Error(`Expected 30 Year 7 Maths modules, found ${modules.length}.`);

const esc = (value) => String(value ?? '').replace(/[&<>\"]/g, (char) => ({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'
}[char]));
const attr = esc;
const reEsc = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function extractDetailsBody(html, title) {
  const re = new RegExp(`<details[^>]*>\\s*<summary><strong>${reEsc(title)}<\\/strong><\\/summary>([\\s\\S]*?)<\\/details>`, 'i');
  const match = html.match(re);
  if (!match) return '';
  return match[1]
    .replace(/^\s*<div class="curriculum-detail-body">/i, '')
    .replace(/<\/div>\s*$/i, '')
    .trim();
}

function existingTeacherLink(html, module) {
  const hrefs = [...html.matchAll(/href=["']([^"']*(?:teacher-deck|teacher-slides)[^"']*)["']/gi)].map((m) => m[1]);
  const local = hrefs.find((href) => /^(?:\.\/)?teacher-(?:deck|slides)\/?(?:$|[?#])/i.test(href));
  return local || hrefs[0] || module.links.slides;
}

const numericalEvidence = /(?:\d|π|√|%|\$|°|=|<|>|÷|×|\([^)]*,[^)]*\)|\b(?:mm|cm|km|kg|mL|litres?|hours?|minutes?|seconds?|metres?|degrees?)\b)/i;

function extraWorkedQuestions(module) {
  const questions = [...(module.practiceSheet?.questions || [])];
  const selected = [];
  const synthesis = questions.find((question) => /-PS-10$/i.test(question.id || '')) || questions[9];
  if (synthesis) selected.push(synthesis);

  const candidates = questions
    .filter((question) => !selected.includes(question))
    .filter((question) => numericalEvidence.test(`${question.prompt || ''} ${question.answer || ''}`))
    .sort((a,b) => Number(b.tier || 0) - Number(a.tier || 0) || questions.indexOf(b) - questions.indexOf(a));

  for (const question of candidates) {
    if (selected.length >= 2) break;
    selected.push(question);
  }
  for (const question of questions) {
    if (selected.length >= 2) break;
    if (!selected.includes(question)) selected.push(question);
  }
  return selected.slice(0,2);
}

function workedExamples(module) {
  const authored = (module.topic.workedExamples || []).slice(0,2).map((example, index) => ({
    number:index+1,
    title:example.title,
    problem:'',
    steps:example.steps || [],
    answer:example.answer,
    check:example.check
  }));
  const extras = extraWorkedQuestions(module).map((question,index) => ({
    number:authored.length+index+1,
    title:`Application problem ${index+1}`,
    problem:question.prompt,
    steps:[
      `Plan: ${question.hint || 'Choose a representation or relationship that matches the topic.'}`,
      `Work: ${question.answer}`,
      `Interpret: ${question.summary || 'State what the result means in the original problem.'}`
    ],
    answer:question.answer,
    check:question.summary || 'Check the result against the original information using an alternate representation, inverse operation or estimate.'
  }));
  return [...authored,...extras].slice(0,4);
}

function relatedHtml(module) {
  const index = modules.indexOf(module);
  const nearby = [modules[index-1], modules[index+1]].filter(Boolean);
  const sameStrand = modules.filter((candidate) => candidate !== module && candidate.identity.strand === module.identity.strand).slice(0,4);
  const chosen = [...new Set([...nearby,...sameStrand])].slice(0,6);
  return `<ul class="curriculum-related-list">${chosen.map((candidate) => `<li><a href="/year7/maths/${attr(candidate.identity.slug)}/">${esc(candidate.identity.code)}: ${esc(candidate.identity.title)}</a></li>`).join('')}</ul>`;
}

function fallbackOfficial() {
  return `<ul class="curriculum-source-list"><li><a href="https://www.australiancurriculum.edu.au/" rel="nofollow noopener" target="_blank">Australian Curriculum Version 9.0</a></li><li><a href="https://f10.vcaa.vic.edu.au/" rel="nofollow noopener" target="_blank">Victorian Curriculum F–10</a></li><li><a href="https://curriculum.nsw.edu.au/" rel="nofollow noopener" target="_blank">NSW Curriculum</a></li><li><a href="https://corestandards.org/" rel="nofollow noopener" target="_blank">Common Core State Standards</a></li><li><a href="https://www.gov.uk/government/collections/national-curriculum" rel="nofollow noopener" target="_blank">England National Curriculum</a></li><li><a href="https://newzealandcurriculum.tahurangi.education.govt.nz/" rel="nofollow noopener" target="_blank">New Zealand Curriculum</a></li></ul>`;
}

function pageFor(module, oldHtml) {
  const { identity, topic } = module;
  const code = identity.code;
  const lower = code.toLowerCase();
  const canonical = `https://skillrhub.com/year7/maths/${identity.slug}/`;
  const teacher = existingTeacherLink(oldHtml, module);
  const curriculum = extractDetailsBody(oldHtml, 'Curriculum coverage and elaborations') || `<p><strong>Content description:</strong> ${esc(identity.description)}</p>`;
  const international = extractDetailsBody(oldHtml, 'International curriculum mapping') || `<p>The Australian Curriculum code above is exact. Victorian Year 7, NSW Stage 4, US Grade 7, England Key Stage 3, New Zealand Level 4 and comparable international curricula contain broadly related learning, but code-to-code equivalence varies by jurisdiction.</p>`;
  const official = extractDetailsBody(oldHtml, 'Official curriculum references') || fallbackOfficial();
  const visuals = (topic.visuals || []).map((spec) => visualRenderer.render(spec)).join('');
  const worked = workedExamples(module);
  const questions = (module.practiceSheet?.questions || []).slice(0,10);
  if (worked.length !== 4) throw new Error(`${code}: expected 4 worked examples, found ${worked.length}`);
  if (questions.length !== 10) throw new Error(`${code}: expected 10 important problems, found ${questions.length}`);

  const description = `${identity.description.replace(/\.$/,'')}. Learn with visual models, 4 worked examples and 10 important problems.`;
  const success = topic.successCriteria.map((item) => `<li>${esc(item)}</li>`).join('');
  const deepDive = topic.deepDive.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('');
  const vocab = topic.vocabulary.map((item) => `<div><dt>${esc(item.term)}</dt><dd>${esc(item.definition)}</dd></div>`).join('');
  const misconception = topic.misconceptions.map((item) => `<article class="learn-misconception"><p><strong>Common mistake:</strong> ${esc(item.idea)}</p><p><strong>Correction:</strong> ${esc(item.correction)}</p></article>`).join('');
  const workedHtml = worked.map((example) => `<article class="tmv2-worked-problem"><p class="tmv2-worked-number">Example ${example.number}</p><h3>${esc(example.title)}</h3>${example.problem ? `<p class="tmv2-worked-question"><strong>Problem:</strong> ${esc(example.problem)}</p>` : ''}<ol>${example.steps.map((step) => `<li>${esc(step)}</li>`).join('')}</ol><p class="tmv2-worked-answer"><strong>Final answer:</strong> ${esc(example.answer)}</p><p class="tmv2-worked-check"><strong>Check:</strong> ${esc(example.check)}</p></article>`).join('');
  const problemsHtml = questions.map((question,index) => `<li><p><strong>${index+1}.</strong> ${esc(question.prompt)}</p><details class="learn-answer"><summary>Check answer</summary><p><strong>Answer:</strong> ${esc(question.answer)}</p>${question.hint ? `<p><strong>Hint:</strong> ${esc(question.hint)}</p>` : ''}${question.summary ? `<p><strong>Why:</strong> ${esc(question.summary)}</p>` : ''}</details></li>`).join('');

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-adsense-account" content="ca-pub-7734963540104771">
  <title>${esc(identity.title)} | Year 7 Maths | ${code}</title>
  <meta name="description" content="${attr(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${attr(canonical)}">
  <meta property="og:title" content="${attr(`${identity.title} | Year 7 Maths | ${code}`)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:site_name" content="SkillrHub">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#1a3a72">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/assets/curriculum.css?v=4">
  <link rel="stylesheet" href="/assets/year7-curriculum.css?v=1">
  <link rel="stylesheet" href="/assets/topic-module-v2.css?v=1">
  <style>
    .topic-action-row{grid-template-columns:repeat(3,minmax(0,1fr));max-width:760px}
    .learn-more{margin-top:10px}.learn-more>summary{cursor:pointer;color:#173968;font-weight:850}.learn-more__links{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px}.learn-more__links a{padding:8px 11px;border:1px solid #c9d8fb;border-radius:8px;color:#173968;text-decoration:none;font-weight:750;background:#fff}
    .learn-intro{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(250px,.8fr);gap:16px}.learn-visuals{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.learn-misconceptions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.learn-misconception{padding:12px;border:1px solid #ead9b6;border-radius:11px;background:#fffaf2}.learn-misconception p{margin:.25rem 0}.learn-problems{padding:0;list-style:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.learn-problems>li{padding:12px;border:1px solid #dce5ef;border-radius:10px;background:#fff}.learn-problems>li>p{margin:0 0 8px}.learn-answer{border-top:1px solid #edf1f5;padding-top:7px}.learn-answer>summary{cursor:pointer;color:#2457d6;font-weight:800}.learn-answer p{margin:7px 0 0}.curriculum-topic-section>summary{cursor:pointer;color:#173968}.curriculum-detail-body{padding-top:12px}
    @media(max-width:760px){.learn-intro,.learn-visuals,.learn-misconceptions,.learn-problems,.tmv2-worked-grid{grid-template-columns:1fr}.topic-action-row{grid-template-columns:1fr}}
  </style>
  <script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org','@type':'LearningResource',name:`${identity.title} - ${code}`,description,url:canonical,educationalLevel:'Year 7',learningResourceType:'Topic guide',teaches:identity.description })}</script>
</head>
<body class="curriculum-shell">
<div class="curriculum-page">
  <nav class="main-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/year7/curriculum/maths/">Year 7 Maths</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav>
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year7/">Year 7</a></li><li><a href="/year7/curriculum/maths/">Maths</a></li><li aria-current="page">${code}</li></ol></nav>

  <header class="curriculum-hero">
    <p class="curriculum-eyebrow">${code} • Year 7 Maths • ${esc(identity.strand)} • Learn</p>
    <h1>${esc(identity.title)}</h1>
    <p class="curriculum-hero__lead">${esc(identity.description)}</p>
    <div class="topic-action-row"><a class="primary" href="#learn">Learn</a><a href="${attr(module.links.practice)}">Practice</a><a href="${attr(module.links.test)}">Test</a></div>
    <details class="learn-more"><summary>More resources</summary><div class="learn-more__links"><a href="${attr(teacher)}">Teacher Slides</a><a href="/quiz/year-7/math/${lower}/homework/">Homework</a><a href="${attr(module.links.practiceSheet)}">Worksheet</a></div></details>
  </header>

  <main class="curriculum-layout">
    <div>
      <details class="curriculum-topic-section" id="learn" open><summary><strong>What students learn in ${code}</strong></summary><div class="curriculum-detail-body learn-intro"><div><p><strong>${esc(topic.learningIntention)}</strong></p>${deepDive}</div><div><h2>Success criteria</h2><ul class="curriculum-check-list">${success}</ul></div></div></details>

      <details class="curriculum-topic-section" open><summary><strong>Visual models and representations</strong></summary><div class="curriculum-detail-body"><p>Use these models to connect the mathematical idea to values, diagrams, coordinates, graphs or structure before moving to symbolic calculation.</p><div class="learn-visuals">${visuals}</div></div></details>

      <details class="curriculum-topic-section"><summary><strong>Key vocabulary</strong></summary><div class="curriculum-detail-body"><dl class="tmv2-vocab">${vocab}</dl></div></details>

      <details class="curriculum-topic-section" open><summary><strong>4 worked numerical &amp; application examples</strong></summary><div class="curriculum-detail-body"><p>Follow each example from representation and setup through calculation/reasoning, interpretation and an independent check.</p><div class="tmv2-worked-grid">${workedHtml}</div></div></details>

      <details class="curriculum-topic-section"><summary><strong>Common misconceptions and corrections</strong></summary><div class="curriculum-detail-body"><div class="learn-misconceptions">${misconception}</div></div></details>

      <details class="curriculum-topic-section" open><summary><strong>10 important problems to solve</strong></summary><div class="curriculum-detail-body"><p>Attempt each problem before opening <strong>Check answer</strong>. The set moves from core understanding to application and synthesis.</p><ol class="learn-problems">${problemsHtml}</ol></div></details>

      <details class="curriculum-topic-section"><summary><strong>Curriculum coverage and elaborations</strong></summary><div class="curriculum-detail-body">${curriculum}</div></details>
      <details class="curriculum-topic-section"><summary><strong>International curriculum mapping</strong></summary><div class="curriculum-detail-body">${international}</div></details>
      <details class="curriculum-topic-section"><summary><strong>Related Year 7 Maths topics</strong></summary><div class="curriculum-detail-body">${relatedHtml(module)}</div></details>
      <details class="curriculum-topic-section"><summary><strong>Official curriculum references</strong></summary><div class="curriculum-detail-body">${official}</div></details>
    </div>

    <aside class="curriculum-sidebar">
      <section class="curriculum-panel"><h2>Learning flow</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="#learn">Learn</a><a class="curriculum-button" href="${attr(module.links.practice)}">Practice</a><a class="curriculum-button" href="${attr(module.links.test)}">Test</a></div></section>
      <section class="curriculum-panel"><h2>Topic focus</h2><p>${esc(topic.successCriteria.join(' '))}</p></section>
    </aside>
  </main>

  <p class="curriculum-footer-meta">Feedback: <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a>.</p>
</div>
</body>
</html>`;
}

let written = 0;
for (const module of modules) {
  const file = path.join(ROOT, 'year7', 'maths', module.identity.slug, 'index.html');
  if (!fs.existsSync(file)) throw new Error(`${module.identity.code}: missing topic page ${file}`);
  const oldHtml = fs.readFileSync(file, 'utf8');
  const html = pageFor(module, oldHtml);
  fs.writeFileSync(file, html);
  written += 1;
}

const errors = [];
for (const module of modules) {
  const file = path.join(ROOT, 'year7', 'maths', module.identity.slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const required = [module.identity.code, module.identity.title, '>Learn<', '>Practice<', '>Test<', 'More resources', 'What students learn', 'Visual models and representations', '4 worked numerical &amp; application examples', '10 important problems to solve', 'Check answer', 'Curriculum coverage and elaborations'];
  for (const token of required) if (!html.includes(token)) errors.push(`${module.identity.code}: missing ${token}`);
  if (/This unit helps students build a clear, usable understanding of/i.test(html)) errors.push(`${module.identity.code}: generic fallback copy remains`);
  if (/Expanded question banks/i.test(html)) errors.push(`${module.identity.code}: Expanded question banks remains`);
  if (/(?:year7-curriculum-render|year7-maths-topic-modules-v2|topic-module-v2\.js)[^"']*\.js/i.test(html)) errors.push(`${module.identity.code}: runtime curriculum content dependency remains`);
  if ((html.match(/<p class="tmv2-worked-number">Example /g) || []).length !== 4) errors.push(`${module.identity.code}: not exactly 4 worked examples`);
  if ((html.match(/<details class="learn-answer">/g) || []).length !== 10) errors.push(`${module.identity.code}: not exactly 10 answer disclosures`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Materialised ${written} rich static Year 7 Maths Learn pages.`);
