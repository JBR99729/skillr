#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const YEARS = [8, 9, 10];

const htmlEscape = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const xmlEscape = htmlEscape;

function loadRegistry(year) {
  const file = path.join(ROOT, 'assets', `year${year}-maths-data.js`);
  const source = fs.readFileSync(file, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: file });
  const registry = context.window.SkillrUpperMathsData;
  if (!registry || typeof registry !== 'object') throw new Error(`No SkillrUpperMathsData in ${file}`);
  return registry;
}

function asList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function textList(items) {
  const clean = asList(items).filter(Boolean);
  return clean.length ? `<ul>${clean.map((item) => `<li>${htmlEscape(item)}</li>`).join('')}</ul>` : '<p>No additional items.</p>';
}

function misconceptionRows(items) {
  return asList(items).map((item) => {
    if (Array.isArray(item)) return `<li><strong>${htmlEscape(item[0])}</strong> — ${htmlEscape(item[1] || '')}</li>`;
    if (item && typeof item === 'object') return `<li><strong>${htmlEscape(item.misconception || item.error || item.title || '')}</strong> — ${htmlEscape(item.correction || item.fix || item.response || '')}</li>`;
    return `<li>${htmlEscape(item)}</li>`;
  }).join('');
}

function resourceUrl(year, code, type) {
  return `/quiz/year-${year}/math/${code.toLowerCase()}/${type}/`;
}

function renderTopic(unit) {
  const { code, year, title, subtitle, contentDescription, strand, successCriteria = [], conceptBoundary = {}, teachingProgression = {}, elaborations = [], workedExamples = [], misconceptions = [], differentiation = {}, warmUp = {} } = unit;
  const steps = asList(teachingProgression.steps);
  const elaborationHtml = asList(elaborations).map((e) => `<article class="curriculum-worked-example"><h3>${htmlEscape(e.id || '')}: ${htmlEscape(e.teachingPurpose || e.plainLanguageConcept || '')}</h3><p><strong>Curriculum:</strong> ${htmlEscape(e.curriculumWording || '')}</p><p>${htmlEscape(e.plainLanguageConcept || '')}</p>${e.teacherDoes ? `<p><strong>Teacher:</strong> ${htmlEscape(e.teacherDoes)}</p>` : ''}${e.teacherSaysOrAsks ? `<p><strong>Ask:</strong> ${htmlEscape(e.teacherSaysOrAsks)}</p>` : ''}${e.whatToLookFor ? `<p><strong>Look for:</strong> ${htmlEscape(e.whatToLookFor)}</p>` : ''}</article>`).join('');
  const examplesHtml = asList(workedExamples).map((e) => `<article class="curriculum-worked-example"><h3>${htmlEscape(e.title || 'Worked example')}</h3><p>${htmlEscape(e.example || '')}</p>${e.teacherLanguage ? `<p><strong>Teacher prompt:</strong> ${htmlEscape(e.teacherLanguage)}</p>` : ''}</article>`).join('');
  const progressionHtml = steps.map((s, i) => `<li><strong>${i + 1}. ${htmlEscape(s.purpose || s.id || 'Step')}</strong><br>${htmlEscape(s.teacherAction || '')}${s.studentAction ? `<br><em>Students:</em> ${htmlEscape(s.studentAction)}` : ''}</li>`).join('');
  const diffHtml = ['support','core','extend'].filter((key) => differentiation[key]).map((key) => `<p><strong>${key[0].toUpperCase() + key.slice(1)}:</strong> ${htmlEscape(differentiation[key].adaptation || '')}</p>`).join('');
  const canonical = `https://skillrhub.com/year${year}/maths/${unit.slug}/`;

  return `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>${htmlEscape(code)} ${htmlEscape(title)} | Year ${year} Maths Topic Guide</title><meta name="description" content="${htmlEscape(code)} Year ${year} Maths topic guide: ${htmlEscape(contentDescription || title)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=3"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-8P22BET45N');</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head>
<body class="curriculum-shell"><div class="curriculum-page">
<nav class="main-nav"><a href="/">Home</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/how-to-use-skillr.html">How to use Skillr</a></nav>
<nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year${year}/">Year ${year}</a></li><li><a href="/year${year}/curriculum/maths/">Maths</a></li><li aria-current="page">${htmlEscape(code)}</li></ol></nav>
<header class="curriculum-hero"><p class="curriculum-eyebrow">${htmlEscape(code)} • Year ${year} Maths${strand ? ` • ${htmlEscape(strand)}` : ''}</p><h1>${htmlEscape(title)}</h1><p class="curriculum-hero__lead">${htmlEscape(subtitle || contentDescription || '')}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="teacher-slides/">Teacher Slides</a><a href="${resourceUrl(year, code, 'worksheet')}">Practice Sheet</a><a href="${resourceUrl(year, code, 'practice')}">Practice</a><a href="${resourceUrl(year, code, 'test')}">Test</a></div></header>
<main class="curriculum-layout"><div id="topic-guide">
<details class="curriculum-topic-section" open><summary><strong>What students learn</strong></summary><div class="curriculum-detail-body"><p>${htmlEscape(subtitle || contentDescription || '')}</p><p><strong>Learning intention:</strong> ${htmlEscape(unit.learningIntention || subtitle || contentDescription || '')}</p><h3>Success criteria</h3>${textList(successCriteria)}</div></details>
<details class="curriculum-topic-section"><summary><strong>Concept boundary and prerequisites</strong></summary><div class="curriculum-detail-body"><h3>Must teach</h3>${textList(conceptBoundary.mustTeach)}<h3>Prerequisites</h3>${textList(conceptBoundary.prerequisites)}<h3>May support informally</h3>${textList(conceptBoundary.maySupportInformally)}<h3>Do not overteach</h3>${textList(conceptBoundary.mustNotOverteach)}</div></details>
<details class="curriculum-topic-section"><summary><strong>Teaching progression</strong></summary><div class="curriculum-detail-body">${teachingProgression.reason ? `<p>${htmlEscape(teachingProgression.reason)}</p>` : ''}<ol>${progressionHtml}</ol></div></details>
<details class="curriculum-topic-section"><summary><strong>Worked examples</strong></summary><div class="curriculum-detail-body">${examplesHtml || '<p>Use the elaboration teaching models below.</p>'}</div></details>
<details class="curriculum-topic-section"><summary><strong>Australian Curriculum elaborations</strong></summary><div class="curriculum-detail-body">${elaborationHtml || `<p>${htmlEscape(contentDescription || '')}</p>`}</div></details>
<details class="curriculum-topic-section"><summary><strong>Common misconceptions and quick fixes</strong></summary><div class="curriculum-detail-body"><ul>${misconceptionRows(misconceptions)}</ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Support, core and extend</strong></summary><div class="curriculum-detail-body">${diffHtml || '<p>Adjust numerical and representational load while preserving the same mathematical decision.</p>'}</div></details>
<details class="curriculum-topic-section"><summary><strong>Quick check and mastery evidence</strong></summary><div class="curriculum-detail-body">${warmUp.prompt ? `<p><strong>Prompt:</strong> ${htmlEscape(warmUp.prompt)}</p>` : ''}${warmUp.expectedAnswer ? `<p><strong>Expected idea:</strong> ${htmlEscape(warmUp.expectedAnswer)}</p>` : ''}<p>Students should explain the relationship in their own words, apply it in a new case and verify the result using another representation, estimate or check.</p></div></details>
<details class="curriculum-topic-section"><summary><strong>Resources</strong></summary><div class="curriculum-detail-body"><div class="curriculum-link-row"><a class="curriculum-button primary" href="teacher-slides/">Open Teacher Slides</a><a class="curriculum-button" href="${resourceUrl(year, code, 'worksheet')}">Practice Sheet</a><a class="curriculum-button" href="${resourceUrl(year, code, 'practice')}">Practice</a><a class="curriculum-button" href="${resourceUrl(year, code, 'test')}">Test</a></div></div></details>
</div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Teacher resource</h2><p>Project the fixed branded deck one slide at a time.</p><a class="curriculum-button primary" href="teacher-slides/">Teacher Slides</a></section><section class="curriculum-panel"><h2>Curriculum code</h2><p><strong>${htmlEscape(code)}</strong><br>Year ${year} Mathematics${strand ? ` • ${htmlEscape(strand)}` : ''}</p></section></aside></main>
</div><script>window.skillrPageMeta={curriculumCode:${JSON.stringify(code)},pageType:'topic guide',year:${JSON.stringify(`Year ${year}`)},subject:'Maths'};</script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>\n`;
}

function wrap(text, width = 54, maxLines = 4) {
  const words = String(text || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > width && line) { lines.push(line); line = word; }
    else line = candidate;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.…]+$/, '')}…`;
    return kept;
  }
  return lines;
}

function textLines(lines, x, y, size, gap, colour = '#0f172a', weight = '400') {
  return lines.map((line, i) => `<text x="${x}" y="${y + i * gap}" fill="${colour}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}">${xmlEscape(line)}</text>`).join('');
}

function slideSvg(unit, slide, index, total) {
  const title = slide.title || slide.purpose || unit.title;
  const purpose = slide.purpose || slide.display?.keyText?.[0] || unit.subtitle || unit.contentDescription;
  const prompt = slide.display?.studentPrompt || slide.teacherLayer?.teacherSaysOrAsks || '';
  const key = asList(slide.display?.keyText).join(' • ');
  const modelIds = asList(slide.display?.modelIds);
  const models = asList(unit.models).filter((model) => modelIds.includes(model.id));
  const modelText = models.map((model) => model.accessibleDescription || model.parameters?.label || '').filter(Boolean).join(' ');
  const titleLines = wrap(title, 42, 2);
  const purposeLines = wrap(purpose, 72, 3);
  const modelLines = wrap(modelText || key, 72, 3);
  const promptLines = wrap(prompt, 72, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">${xmlEscape(unit.code)} — ${xmlEscape(title)}</title><desc id="desc">${xmlEscape(purpose)}</desc><rect width="1600" height="900" fill="#f8fafc"/><g opacity=".055" fill="#1d4ed8" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700"><text x="120" y="255" transform="rotate(-18 120 255)">SkillrHub • skillrhub.com</text><text x="790" y="560" transform="rotate(-18 790 560)">SkillrHub • skillrhub.com</text><text x="220" y="765" transform="rotate(-18 220 765)">SkillrHub • skillrhub.com</text></g><rect width="1600" height="96" fill="#173a72"/><text x="88" y="62" fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="32" font-weight="700">SkillrHub • Year ${unit.year} Maths</text><text x="1430" y="62" text-anchor="end" fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="26">${index + 1} / ${total}</text>${textLines(titleLines, 90, 175, 50, 58, '#173a72', '700')}${textLines(purposeLines, 90, titleLines.length > 1 ? 310 : 255, 31, 42, '#334155', '400')}<rect x="90" y="415" width="1420" height="190" rx="26" fill="#e8eef9"/><text x="135" y="466" fill="#173a72" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700">Model / key relationship</text>${textLines(modelLines.length ? modelLines : ['Connect the representation to the mathematical relationship.'], 135, 518, 30, 40, '#0f172a', '400')}<rect x="90" y="635" width="1420" height="155" rx="26" fill="#fff7e6" stroke="#f0b429" stroke-width="3"/><text x="135" y="683" fill="#9a5b00" font-family="Arial,Helvetica,sans-serif" font-size="27" font-weight="700">Student prompt</text>${textLines(promptLines.length ? promptLines : ['Explain the relationship, apply it to a new case, then verify.'], 135, 730, 29, 38, '#0f172a', '400')}<rect y="835" width="1600" height="65" fill="#173a72"/><text x="70" y="877" fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700">${xmlEscape(unit.code)} • SkillrHub • skillrhub.com</text></svg>\n`;
}

function introSlide(unit) {
  return { title: unit.title, purpose: unit.learningIntention || unit.subtitle || unit.contentDescription, display: { keyText: asList(unit.successCriteria).slice(0, 2), studentPrompt: unit.warmUp?.prompt || 'What do you already notice about this relationship?' } };
}
function reviewSlide(unit) {
  return { title: 'Review and respond', purpose: 'Explain the key relationship, apply it in a new case and verify your conclusion.', display: { keyText: ['Use precise mathematical language.', 'Check with another representation, estimate or test case.'], studentPrompt: unit.warmUp?.expectedAnswer ? `Compare your reasoning with this expected idea: ${unit.warmUp.expectedAnswer}` : 'What evidence shows that your answer is reasonable?' } };
}

function renderViewer(unit, count) {
  const figures = Array.from({ length: count }, (_, i) => `<figure class="fixed-slide-viewer__slide" data-slide${i ? ' hidden' : ''}><img src="slide-${String(i + 1).padStart(2, '0')}.svg" alt="${htmlEscape(unit.code)} teacher slide ${i + 1} of ${count}"></figure>`).join('');
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${htmlEscape(unit.code)} Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"></head><body><nav class="main-nav"><a href="../">Topic Guide</a><a href="${resourceUrl(unit.year, unit.code, 'worksheet')}">Practice Sheet</a><a href="${resourceUrl(unit.year, unit.code, 'practice')}">Practice</a><a href="${resourceUrl(unit.year, unit.code, 'test')}">Test</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>${htmlEscape(unit.code)} Teacher Slides</h1><p>Present one fixed slide at a time. Use Previous/Next, arrow keys or fullscreen.</p><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0" aria-label="${htmlEscape(unit.code)} teacher slide deck"><div class="fixed-slide-viewer__stage">${figures}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous aria-label="Previous slide">Previous</button><span class="fixed-slide-viewer__counter" data-slide-counter aria-live="polite">1 / ${count}</span><button type="button" data-slide-next aria-label="Next slide">Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script></body></html>\n`;
}

let topics = 0;
let slides = 0;
for (const year of YEARS) {
  const registry = loadRegistry(year);
  for (const unit of Object.values(registry)) {
    if (!unit?.code || !unit?.slug || Number(unit.year) !== year) continue;
    const topicDir = path.join(ROOT, `year${year}`, 'maths', unit.slug);
    const topicFile = path.join(topicDir, 'index.html');
    if (!fs.existsSync(topicFile)) throw new Error(`Missing topic directory for ${unit.code}: ${topicDir}`);
    fs.writeFileSync(topicFile, renderTopic(unit));

    const viewerDir = path.join(topicDir, 'teacher-slides');
    fs.mkdirSync(viewerDir, { recursive: true });
    const deck = [introSlide(unit), ...asList(unit.slides), reviewSlide(unit)];
    fs.writeFileSync(path.join(viewerDir, 'index.html'), renderViewer(unit, deck.length));
    deck.forEach((slide, index) => fs.writeFileSync(path.join(viewerDir, `slide-${String(index + 1).padStart(2, '0')}.svg`), slideSvg(unit, slide, index, deck.length)));
    topics++;
    slides += deck.length;
  }
}
console.log(`Migrated ${topics} Years 8-10 Maths topic pages and generated ${slides} fixed teacher slides.`);
