#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const REQUIRED_IDS = [
  'learn','prerequisites','teaching','examples','misconceptions','guided-practice',
  'independent-practice','reasoning','important-questions','assessment','mastery',
  'guidance','alignment','resources','related','official-references',
];

const esc = (v = '') => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip = (v = '') => String(v ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const list = v => Array.isArray(v) ? v : v ? [v] : [];

function details(id, title, body, open = false) {
  return `<details class="curriculum-topic-section" id="${id}"${open ? ' open' : ''}><summary><strong>${title}</strong></summary><div class="curriculum-detail-body">${body}</div></details>`;
}

function directSectionEntries(html) {
  const out = [];
  const re = /<section\b[^>]*class=["'][^"']*curriculum-topic-section[^"']*["'][^>]*>([\s\S]*?)<\/section>/gi;
  for (const match of html.matchAll(re)) {
    const inner = match[1];
    const h2 = inner.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    out.push({ full: match[0], heading: strip(h2?.[1] || ''), body: h2 ? inner.replace(h2[0], '') : inner });
  }
  return out;
}

function sectionBody(entries, pattern, fallback = '') {
  const found = entries.find(x => pattern.test(x.heading));
  return found?.body?.trim() || fallback;
}

function feedbackBlock(html) {
  return html.match(/<!--\s*skillr-facebook-feedback:start\s*-->[\s\S]*?<!--\s*skillr-facebook-feedback:end\s*-->/i)?.[0] || '';
}

function prerequisiteFor(code, title) {
  if (/^AC9M3N/.test(code)) return `Students should be comfortable reading and representing whole numbers, using place value, and explaining simple addition, subtraction or equal-group relationships from earlier years. Begin with a short concrete or visual recall task before moving to ${esc(title)}.`;
  if (/^AC9M3A/.test(code)) return `Students should be comfortable with addition and subtraction facts to 20, simple equal groups and number sentences, and using symbols to represent an unknown or repeated relationship. Revisit a concrete or pictorial model first if the symbols are not yet meaningful.`;
  if (/^AC9M3M/.test(code)) return `Students should be able to compare everyday attributes, choose familiar informal or metric units where appropriate, and read simple measuring tools or time displays. Check that the unit and the quantity being measured are clearly distinguished.`;
  if (/^AC9M3SP/.test(code)) return `Students should recognise common two- and three-dimensional shapes, use positional language and interpret simple representations of familiar places. Start with a physical model or drawing before using more abstract spatial language.`;
  if (/^AC9M3ST/.test(code)) return `Students should be able to sort information into categories, read simple tables or displays and compare counts. Revisit what each label, category and scale represents before analysing a data display.`;
  if (/^AC9M3P/.test(code)) return `Students should use everyday chance language such as impossible, possible and certain, and be able to record outcomes from a simple chance event. Emphasise that one result does not determine what must happen next.`;
  return `Activate the Year 2 knowledge that supports ${esc(title)} and use a short concrete or visual check before introducing the new Year 3 idea.`;
}

function renderQuestion(q) {
  let extra = '';
  if (q.template) extra += `<p class="curriculum-note"><strong>Prompt:</strong> ${esc(String(q.template).replaceAll('{{blank}}', '□'))}</p>`;
  if (Array.isArray(q.answers) && q.answers.length) extra += `<ul>${q.answers.map(a => `<li>${esc(a)}</li>`).join('')}</ul>`;
  if (Array.isArray(q.matchLeft) && Array.isArray(q.matchRight)) extra += `<p><strong>Match:</strong> ${q.matchLeft.map(esc).join(' • ')} ↔ ${q.matchRight.map(esc).join(' • ')}</p>`;
  return `<li><p>${esc(q.question || 'Complete the task.')}</p>${extra}</li>`;
}

function stateAndInternationalRows(body) {
  const rows = body.match(/<tr>[\s\S]*?<\/tr>/gi) || [];
  const dataRows = rows.filter(r => /<td/i.test(r));
  const state = dataRows.filter(r => /<td>\s*(Australia|Victoria|NSW)\s*<\/td>/i.test(r));
  const international = dataRows.filter(r => !/<td>\s*(Australia|Victoria|NSW)\s*<\/td>/i.test(r));
  return { state, international };
}

function buildYear3Main(code, u, html, allCodes, units) {
  const entries = directSectionEntries(html);
  const learnBody = sectionBody(entries, /What students learn/i, `<p><strong>Learning intention:</strong> ${esc(u.learn)}</p>`);
  const exampleBody = sectionBody(entries, /Concept models|Worked thinking|Worked examples/i,
    `<article class="curriculum-worked-example"><h3>${esc(u.model_title)}</h3><p>${esc(u.model_note)}</p></article><article class="curriculum-worked-example"><h3>${esc(u.apply_title)}</h3><p>${esc(u.apply_note)}</p></article>`);
  const vocabBody = sectionBody(entries, /Important vocabulary|Key vocabulary/i, '');
  const guidedBody = sectionBody(entries, /Guided learning activities|Teaching sequence/i,
    `<ol>${list(u.activities).map(a => `<li><strong>${esc(a.title)}:</strong> ${esc(a.text)}</li>`).join('')}</ol>`);
  const misconceptionBody = sectionBody(entries, /Common misconceptions/i,
    `<ul>${list(u.mistakes).map(m => `<li><strong>${esc(m[0])}</strong> — ${esc(m[1])}</li>`).join('')}</ul>`);
  const coverageBody = sectionBody(entries, /Curriculum coverage and elaborations|Australian Curriculum coverage/i,
    `<p><strong>Australian Curriculum:</strong> ${esc(code)} — ${esc(u.desc)}</p>`);
  const howToBody = sectionBody(entries, /How to use this unit/i, '');
  const culturalBody = sectionBody(entries, /Cultural safety|First Nations/i, '');
  const internationalBody = sectionBody(entries, /International curriculum mapping/i, '');
  const { state, international } = stateAndInternationalRows(internationalBody);

  const worksheet = list(u.worksheet);
  const routineQuestions = worksheet.filter(q => !q.enrichment);
  const enrichment = worksheet.filter(q => q.enrichment);
  const independent = routineQuestions.slice(0, Math.min(6, routineQuestions.length));
  const assessment = routineQuestions.slice(Math.min(6, routineQuestions.length), Math.min(9, routineQuestions.length));
  const reasoning = enrichment.length ? enrichment : worksheet.slice(-2);

  const importantQa = `<dl><dt><strong>What is the big idea in this topic?</strong></dt><dd>${esc(u.learn)}</dd><dt><strong>What routine should I use?</strong></dt><dd>${esc(u.routine)}</dd><dt><strong>How do I know I am ready to move on?</strong></dt><dd>You can ${list(u.mastery).map(x => esc(String(x).toLowerCase())).join(', ')} and explain how your model or calculation supports the answer.</dd></dl>`;

  const stateTable = state.length ? `<h3>Australian, Victorian and NSW alignment retained from the previous page</h3><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>Curriculum</th><th>Closest mapping</th></tr></thead><tbody>${state.join('')}</tbody></table></div>` : `<p><strong>Australian Curriculum:</strong> ${esc(code)} — ${esc(u.desc)}</p><p>Victoria and NSW mappings are not asserted as exact one-to-one equivalents unless verified in the retained jurisdictional mapping.</p>`;
  const supplementary = international.length ? `<details class="curriculum-supplementary-section"><summary><strong>Other international curriculum comparisons retained from the previous page</strong></summary><div class="curriculum-detail-body"><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>Curriculum</th><th>Closest mapping</th></tr></thead><tbody>${international.join('')}</tbody></table></div></div></details>` : '';

  const idx = allCodes.indexOf(code);
  const related = [];
  if (idx > 0) related.push(`<li><a href="/year3/maths/${units[allCodes[idx - 1]].slug}/">${esc(allCodes[idx - 1])} — ${esc(units[allCodes[idx - 1]].title)}</a></li>`);
  if (idx >= 0 && idx < allCodes.length - 1) related.push(`<li><a href="/year3/maths/${units[allCodes[idx + 1]].slug}/">${esc(allCodes[idx + 1])} — ${esc(units[allCodes[idx + 1]].title)}</a></li>`);
  related.push('<li><a href="/year3/curriculum/maths/">All Year 3 Mathematics topics</a></li>');

  const q = type => `/quiz/year-3/math/${code.toLowerCase()}/${type}/`;
  const sections = [
    details('learn', 'Learning goals: what you will learn', `${learnBody}<p><strong>Success criteria:</strong></p><ul>${list(u.mastery).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`, true),
    details('prerequisites', 'Prerequisite knowledge', `<p>${prerequisiteFor(code, u.title)}</p>`, true),
    details('teaching', 'Concept teaching', `<p><strong>Key idea:</strong> ${esc(u.learn)}</p><p><strong>Learning routine:</strong> ${esc(u.routine)}</p>${vocabBody}`),
    details('examples', 'Worked and modelled examples', exampleBody),
    details('misconceptions', 'Common misconceptions and corrections', misconceptionBody),
    details('guided-practice', 'Guided practice', guidedBody),
    details('independent-practice', 'Independent practice', `<ol>${independent.map(renderQuestion).join('')}</ol>`),
    details('reasoning', 'Reasoning and problem-solving', `<ol>${reasoning.map(renderQuestion).join('')}</ol><p class="curriculum-note">Explain the reasoning, not only the final answer.</p>`),
    details('important-questions', 'Important questions and answers', importantQa),
    details('assessment', 'Assessment-style questions and review hints', `<ol>${assessment.length ? assessment.map(renderQuestion).join('') : list(u.quick).slice(0,3).map(x => `<li>${esc(x)}</li>`).join('')}</ol><p><strong>Review hint:</strong> Follow the routine “${esc(u.routine)}” and use the worked model to check whether your answer is reasonable.</p>`),
    details('mastery', 'Exit ticket: mastery check', `<ul class="curriculum-check-list">${list(u.mastery).map(x => `<li>I can ${esc(String(x).toLowerCase())}.</li>`).join('')}</ul><p><strong>Quick check:</strong> ${list(u.quick).slice(0,3).map(esc).join(' • ')}</p>`),
    details('guidance', 'Teacher and parent guidance', `<div class="unit-activity-grid"><article><h3>For teachers</h3><p>Model the idea with concrete or visual representations first, then ask students to explain the relationship in words before moving to symbolic work.</p></article><article><h3>For parents and carers</h3><p>Ask your child to show the idea with a drawing, objects or a simple example and explain how they checked the answer.</p></article></div>${howToBody}${culturalBody}`),
    details('alignment', 'Curriculum alignment', `${coverageBody}${stateTable}`),
    details('resources', 'Practice and teaching resources', `<div class="curriculum-link-row"><a class="curriculum-button primary" href="teacher-slides/">Teacher Slides</a><a class="curriculum-button" href="${q('worksheet')}">Practice Sheet</a><a class="curriculum-button" href="${q('practice')}">Practice</a><a class="curriculum-button" href="${q('test')}">Test</a></div>`),
    details('related', 'Related Year 3 Mathematics topics', `<ul class="curriculum-related-list">${related.join('')}</ul>`),
    details('official-references', 'Official curriculum references', '<ul class="curriculum-source-list"><li><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0 — ACARA</a></li><li><a href="https://victoriancurriculum.vcaa.vic.edu.au/" target="_blank" rel="nofollow noopener">Victorian Curriculum — VCAA</a></li><li><a href="https://curriculum.nsw.edu.au/" target="_blank" rel="nofollow noopener">NSW Curriculum — NESA</a></li></ul><p>Official curriculum sites are the source of record.</p>'),
  ];
  if (sections.length !== REQUIRED_IDS.length) throw new Error(`${code}: wrong section count`);
  const ids = sections.map(s => s.match(/id="([^"]+)"/)?.[1]);
  if (ids.join('|') !== REQUIRED_IDS.join('|')) throw new Error(`${code}: wrong section order`);
  return `<main class="curriculum-layout"><div id="topic-guide">${sections.join('')}${supplementary}${feedbackBlock(html)}</div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>On this page</h2><ul><li><a href="#learn">Learn</a></li><li><a href="#examples">Examples</a></li><li><a href="#guided-practice">Guided practice</a></li><li><a href="#assessment">Assessment</a></li><li><a href="#alignment">Curriculum</a></li></ul></section></aside></main>`;
}

function cleanYear3Scripts(html) {
  return html.replace(/\s*<script\s+src=["']\/assets\/year3-maths-(?:data-[^"']+|render|elaboration-map|v11-[^"']+)[^>]*><\/script>/gi, '');
}

function migrateYear3() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of ['base','n1','n2','n3','a','m1','m2','sp','st','p']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, `assets/year3-maths-data-${f}.js`), 'utf8'), ctx, { filename: f });
  }
  const units = ctx.window.SkillrYear3MathsData || {};
  const allCodes = Object.keys(units).filter(c => /^AC9M3/.test(c)).sort();
  let changed = 0;
  for (const code of allCodes) {
    const u = units[code];
    const file = path.join(ROOT, 'year3', 'maths', u.slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    if (!/(?:year3-maths-render|year3-maths-v11-render)\.js/i.test(html)) continue;
    const slides = path.join(path.dirname(file), 'teacher-slides', 'index.html');
    if (!fs.existsSync(slides)) throw new Error(`${code}: fixed teacher-slides viewer missing`);
    const main = buildYear3Main(code, u, html, allCodes, units);
    html = cleanYear3Scripts(html);
    html = html.replace(/<div class="topic-action-row">[\s\S]*?<\/div>/i, `<div class="topic-action-row"><a class="primary" href="#learn">Start lesson</a><a href="teacher-slides/">Teacher Slides</a><a href="/quiz/year-3/math/${code.toLowerCase()}/worksheet/">Practice Sheet</a><a href="/quiz/year-3/math/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-3/math/${code.toLowerCase()}/test/">Test</a></div>`);
    html = html.replace(/<main class="curriculum-layout">[\s\S]*?<\/main>/i, main);
    fs.writeFileSync(file, html);
    changed += 1;
  }
  if (changed !== 21) throw new Error(`Expected 21 Year 3 runtime pages, migrated ${changed}`);
  console.log(`Migrated ${changed} Year 3 Maths runtime pages to static HTML.`);
}

function migrateFoundationScience() {
  const rel = 'foundation/science/ac9sfu03-that-objects-can-be-composed-of-different-materials-and-describe/index.html';
  const file = path.join(ROOT, rel);
  let html = fs.readFileSync(file, 'utf8');
  if (!/lower-materials-render\.js/i.test(html)) throw new Error('AC9SFU03 runtime renderer marker not found');
  const fb = feedbackBlock(html);
  const coverage = html.match(/<details class="topic-menu"><summary><span>🇦🇺 Australian Curriculum coverage[\s\S]*?<\/details>/i)?.[0] || '';
  const coverageBody = coverage.replace(/^.*?<div class="menu-content">/is, '').replace(/<\/div><\/details>\s*$/is, '');
  const sections = [
    details('learn','Learning goals: what you will learn','<p><strong>Learning intention:</strong> Objects can be made from one or more materials. Materials can be described using observable properties such as hard, soft, smooth, rough, bendy, stiff, shiny or dull.</p><ul class="curriculum-check-list"><li>Name common materials.</li><li>Describe observable properties.</li><li>Compare two materials.</li><li>Distinguish an object from the material it is made from.</li><li>Explain why a material may suit a particular use.</li></ul>',true),
    details('prerequisites','Prerequisite knowledge','<p>Students should be able to name familiar classroom and household objects, use simple describing words and compare two things by what they can see or feel. Encourage safe observation rather than guessing.</p>',true),
    details('teaching','Concept teaching','<p><strong>Object, material and property are different ideas.</strong> A chair is an object; wood may be one material; hard and stiff are observable properties. One object can contain more than one material.</p><div class="mini-grid-4"><article class="mini-card"><h3>object</h3><p>a thing made or used for a purpose</p></article><article class="mini-card"><h3>material</h3><p>what an object is made from</p></article><article class="mini-card"><h3>property</h3><p>a feature that can be observed or tested</p></article><article class="mini-card"><h3>compare</h3><p>notice similarities and differences</p></article></div>'),
    details('examples','Worked and modelled examples','<article class="curriculum-worked-example"><h3>Object → material → property</h3><div class="model">chair → wood → hard / stiff<br>cloth → fabric → soft / bendy<br>spoon → metal → hard / shiny</div></article><article class="curriculum-worked-example"><h3>Match a material to a use</h3><div class="model">towel → absorbent fabric<br>window → transparent glass<br>raincoat → water-resistant material</div><p>Use an observable or safely testable property to explain the choice.</p></article>'),
    details('misconceptions','Common misconceptions and corrections','<ul><li><strong>Object = material:</strong> name the object first, then what it is made from.</li><li><strong>Using only colour:</strong> also use properties such as hard, soft, rough, smooth, bendy or stiff.</li><li><strong>Guessing without observing:</strong> look, touch or use a safe simple test before describing the property.</li></ul>'),
    details('guided-practice','Guided practice','<ol><li>Find three classroom objects. Name each object, its material and one property.</li><li>Compare wood and fabric using two property words.</li><li>Choose a suitable material for a towel, spoon or raincoat and explain why.</li></ol>'),
    details('independent-practice','Independent practice','<ol><li>Name one material used to make classroom objects.</li><li>Which word describes a property: <em>soft</em> or <em>chair</em>?</li><li>Find an object made from more than one material and name both materials.</li><li>Choose two objects and compare the materials they are made from.</li></ol>'),
    details('reasoning','Reasoning and problem-solving','<p>You need to choose a material for a lunchbox that should be light, stiff and easy to wipe clean. Compare two possible materials and explain which one you would choose using observable properties.</p>'),
    details('important-questions','Important questions and answers','<dl><dt><strong>What is an object?</strong></dt><dd>A thing made or used for a purpose.</dd><dt><strong>What is a material?</strong></dt><dd>What an object is made from.</dd><dt><strong>What is a property?</strong></dt><dd>A feature of a material that can be observed or safely tested.</dd><dt><strong>Can one object contain several materials?</strong></dt><dd>Yes. Many everyday objects combine materials because different parts need different properties.</dd></dl>'),
    details('assessment','Assessment-style questions and review hints','<ol><li>Look at a classroom object. Name the object, one material and one property.</li><li>Explain why fabric is more suitable than glass for a towel.</li><li>Give an example of an object made from two materials and explain why both may be useful.</li></ol><p><strong>Review hint:</strong> use the sentence pattern “The object is ____. It is made from ____. The material is ____.”</p>'),
    details('mastery','Exit ticket: mastery check','<ul class="curriculum-check-list"><li>I can name a material.</li><li>I can describe an observable property.</li><li>I can compare two materials.</li><li>I can separate the idea of an object from the material it is made from.</li><li>I can explain why a material suits a use.</li></ul>'),
    details('guidance','Teacher and parent guidance','<div class="unit-activity-grid"><article><h3>For teachers</h3><p>Use real objects and safe observation. Ask students to say the object, material and property as three separate ideas. For First Nations elaborations, use locally appropriate community-approved sources and respect cultural authority.</p></article><article><h3>For parents and carers</h3><p>Choose safe household objects and ask, “What is it? What is it made from? What can you observe about the material?”</p></article></div>'),
    details('alignment','Curriculum alignment',`${coverageBody || '<p><strong>Australian Curriculum:</strong> AC9SFU03 — recognise that objects can be composed of different materials and describe observable properties.</p>'}<p><strong>Victoria and NSW:</strong> this migration does not assert a descriptor-level one-to-one equivalent without separate official verification. The Australian Curriculum code remains the canonical lesson identity.</p>`),
    details('resources','Practice and teaching resources','<div class="curriculum-link-row"><a class="curriculum-button primary" href="teacher-slides/">Teacher Slides</a><a class="curriculum-button" href="/quiz/grade-k/science/ac9sfu03/worksheet/">Worksheet</a><a class="curriculum-button" href="/quiz/grade-k/science/ac9sfu03/practice/">Practice</a><a class="curriculum-button" href="/quiz/grade-k/science/ac9sfu03/test/">Test</a></div>'),
    details('related','Related Foundation Science topics','<ul class="curriculum-related-list"><li><a href="/foundation/curriculum/science/">All Foundation Science topics</a></li></ul>'),
    details('official-references','Official curriculum references','<ul class="curriculum-source-list"><li><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0 — ACARA</a></li><li><a href="https://victoriancurriculum.vcaa.vic.edu.au/" target="_blank" rel="nofollow noopener">Victorian Curriculum — VCAA</a></li><li><a href="https://curriculum.nsw.edu.au/" target="_blank" rel="nofollow noopener">NSW Curriculum — NESA</a></li></ul><p>Official curriculum sites are the source of record.</p>'),
  ];
  const main = `<main class="curriculum-layout"><div id="topic-guide">${sections.join('')}${fb}</div></main>`;
  html = html.replace(/\s*<script\s+src=["']\/assets\/lower-materials-(?:lessons|render)\.js[^>]*><\/script>/gi, '');
  html = html.replace(/<div class="topic-action-row">[\s\S]*?<\/div>/i, '<div class="topic-action-row"><a class="primary" href="#learn">Start lesson</a><a href="teacher-slides/">Teacher Slides</a><a href="/quiz/grade-k/science/ac9sfu03/worksheet/">Worksheet</a><a href="/quiz/grade-k/science/ac9sfu03/practice/">Practice</a><a href="/quiz/grade-k/science/ac9sfu03/test/">Test</a></div>');
  html = html.replace(/<main class="curriculum-layout">[\s\S]*?<\/main>/i, main);
  fs.writeFileSync(file, html);
  console.log('Migrated Foundation Science AC9SFU03 to static HTML.');
}

migrateYear3();
migrateFoundationScience();
