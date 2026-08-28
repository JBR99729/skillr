#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean = (v = '') => String(v)
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
  .replace(/&quot;|&#34;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/\s+/g, ' ').trim();
const uniq = values => [...new Set(values.map(clean).filter(Boolean))];
const items = source => [...String(source).matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map(m => clean(m[1])).filter(Boolean);
const paragraphs = source => [...String(source).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(m => clean(m[1])).filter(Boolean);

function sections(html) {
  return [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map(m => ({
    html: m[0],
    body: m[1],
    heading: clean(m[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i)?.[1]),
  }));
}

function findSections(all, pattern) { return all.filter(s => pattern.test(s.heading)); }
function strongValue(html, labels) {
  const pattern = new RegExp(`<strong\\b[^>]*>\\s*(?:${labels})\\s*:\\s*<\\/strong>\\s*([\\s\\S]*?)(?=<\\/p>)`, 'i');
  return clean(html.match(pattern)?.[1]);
}
function articleTexts(source) {
  return [...String(source).matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)].map(m => {
    const title = clean(m[1].match(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/i)?.[1]);
    const body = clean(m[1].replace(/<h[2-4]\b[^>]*>[\s\S]*?<\/h[2-4]>/i, ''));
    return clean(`${title}${title && body !== title ? ': ' : ''}${body === title ? '' : body}`);
  }).filter(Boolean);
}
function headedTexts(source) {
  return [...String(source).matchAll(/<h[34]\b[^>]*>([\s\S]*?)<\/h[34]>([\s\S]*?)(?=<h[34]\b|$)/gi)].map(m => {
    const title = clean(m[1]);
    const body = clean(m[2]);
    return clean(`${title}${title && body ? ': ' : ''}${body}`);
  }).filter(Boolean);
}
function chunk(values, max = 4) {
  const out = [];
  for (let i = 0; i < values.length; i += max) out.push(values.slice(i, i + max));
  return out.length ? out : [[]];
}
function chunkByLength(values, maxChars = 760, maxItems = 3) {
  const out = []; let current = []; let size = 0;
  for (const value of values) {
    const length = clean(value).length;
    if (current.length && (current.length >= maxItems || size + length > maxChars)) { out.push(current); current = []; size = 0; }
    current.push(value); size += length;
  }
  if (current.length) out.push(current);
  return out.length ? out : [[]];
}

function analyse(file) {
  const html = fs.readFileSync(file, 'utf8');
  const all = sections(html).filter(s => !/teacher-slide-source/i.test(s.html));
  const code = (html.match(/\bAC9[A-Z0-9]{5,12}\b/i)?.[0] || '').toUpperCase();
  const subject = path.relative(ROOT, file).split(path.sep)[1];
  const subjectLabel = subject[0].toUpperCase() + subject.slice(1);
  const h1 = clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
  const title = h1.replace(new RegExp(`^${code}\\s*:\\s*`, 'i'), '');
  const heroLead = clean(html.match(/class=["'][^"']*curriculum-hero__lead[^"']*["'][^>]*>([\s\S]*?)<\/p>/i)?.[1]);

  const learningSections = findSections(all, /what students learn|learning goal|outcome overview|success looks/i);
  const learningBody = learningSections.map(s => s.body).join(' ');
  const learning = strongValue(learningBody, 'Learning intention|Learning target|Learning goal')
    || paragraphs(learningBody)[0] || heroLead || title;
  const bigIdea = strongValue(learningBody, 'Big idea|Key idea') || paragraphs(learningBody)[0] || learning;
  const routine = strongValue(learningBody, 'Learning routine|Routine') || '';

  const curriculumSections = findSections(all, /curriculum coverage|coverage.*elaboration|curriculum alignment|curriculum description|outcome overview/i);
  const curriculumBody = curriculumSections.length ? curriculumSections.map(s => s.body).join(' ') : html;
  const curriculumItems = items(curriculumBody);
  const description = curriculumItems.find(x => /^(?:content description|curriculum description)\s*:/i.test(x))
    || heroLead || title;
  const elaborationSources = [
    curriculumItems.filter(x => /^(?:E\d+|Elaboration\s*\d*)\s*:/i.test(x)),
    articleTexts(curriculumBody).filter(x => /^E\d+\b/i.test(x)),
    headedTexts(curriculumBody).filter(x => /^E\d+\b/i.test(x)),
  ];
  let elaborations = uniq(elaborationSources.find(x => x.length) || []);
  if (!elaborations.length) elaborations = [description];

  const exampleSections = findSections(all, /subject-specific content|worked|modelled|example|concept model|guided practice/i);
  const examples = uniq(exampleSections.flatMap(s => articleTexts(s.body)));
  const exampleFallback = uniq(exampleSections.flatMap(s => items(s.body))).slice(0, 6);
  const headedExamples = uniq(exampleSections.flatMap(s => headedTexts(s.body)));
  const globalExamples = uniq(headedTexts(html).filter(x => /^(?:E\d+|Teach|Model|Worked|Apply|Learn|Guided|Count|Compare|Use|Recognise|Observe|Group|Sort|Represent|Read|Write)\b/i.test(x))).slice(0, 6);
  const teachingExamples = examples.length ? examples : headedExamples.length ? headedExamples : exampleFallback.length ? exampleFallback : globalExamples;

  const misconceptionSections = findSections(all, /misconception|common student/i);
  const misconceptions = uniq(misconceptionSections.flatMap(s => items(s.body)));
  const practiceSections = findSections(all, /practice thought|formative assessment|quick check|assessment/i);
  const practiceItems = uniq(practiceSections.flatMap(s => items(s.body)));
  const questionCandidates = practiceItems.filter(x => /\?|^(?:what|which|how|why|where|when|name|show|explain|identify|choose|compare|write|read|order|complete|create)\b/i.test(x));
  const revisionSections = findSections(all, /revision notes|review hint|remember/i);
  const revisionItems = uniq(revisionSections.flatMap(s => items(s.body)));
  const masterySections = findSections(all, /exit ticket|mastery check|mastery evidence/i);
  const masteryFromPractice = practiceSections.flatMap(s => {
    const source = s.body.match(/<h3\b[^>]*>\s*Mastery evidence\s*<\/h3>([\s\S]*)/i)?.[1] || '';
    return items(source);
  });
  const masteryItems = uniq([...masterySections.flatMap(s => items(s.body)), ...masteryFromPractice]);
  const masteryFallback = practiceItems.filter(x => !questionCandidates.includes(x));

  const focus = title.replace(/[.?!]+$/,'');
  const questions = [
    `What is the key idea when learning about ${focus.toLowerCase()}?`,
    `Which model or example can show ${focus.toLowerCase()}?`,
    `What common mistake should be corrected when learning about ${focus.toLowerCase()}?`,
    `What routine can students use for ${focus.toLowerCase()}?`,
  ];
  const answers = [
    bigIdea,
    teachingExamples[0] || learning,
    misconceptions[0] || teachingExamples[1] || learning,
    revisionItems.at(-1) || routine || learning,
  ];
  const qa = questions.map((question, i) => ({question, answer: answers[i] || bigIdea}));
  const assessmentQuestions = (questionCandidates.length ? questionCandidates : questions).slice(0, 4);
  const reviewHints = revisionItems.length ? revisionItems.slice(0, 4) : uniq([routine, bigIdea]).slice(0, 4);
  const exitItems = (masteryItems.length ? masteryItems : masteryFallback.length ? masteryFallback : assessmentQuestions).slice(0, 5);

  const missing = [];
  for (const [label, value] of Object.entries({code, title, description, learning})) if (!value) missing.push(label);
  if (!elaborations.length) missing.push('elaborations');
  if (!teachingExamples.length) missing.push('examples');
  if (!qa.every(x => x.question && x.answer)) missing.push('questions/answers');
  if (!assessmentQuestions.length || !reviewHints.length) missing.push('assessment/review');
  if (!exitItems.length) missing.push('exit ticket');
  return {file, html, code, subjectLabel, title, description, learning, elaborations, teachingExamples, qa, assessmentQuestions, reviewHints, exitItems, missing};
}

function sourceSections(unit) {
  const list = values => `<ul>${values.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  return `<!-- teacher-slide-source:start -->
<details class="curriculum-topic-section" data-teacher-slide-source="important-questions"><summary><strong>Important questions and answers</strong></summary><div class="curriculum-detail-body"><dl>${unit.qa.map(x => `<dt><strong>${esc(x.question)}</strong></dt><dd>${esc(x.answer)}</dd>`).join('')}</dl></div></details>
<details class="curriculum-topic-section" data-teacher-slide-source="assessment"><summary><strong>Assessment-style questions and review hints</strong></summary><div class="curriculum-detail-body"><h3>Questions</h3>${list(unit.assessmentQuestions)}<h3>Review hints</h3>${list(unit.reviewHints)}</div></details>
<details class="curriculum-topic-section" data-teacher-slide-source="exit-ticket"><summary><strong>Exit ticket</strong></summary><div class="curriculum-detail-body">${list(unit.exitItems)}</div></details>
<!-- teacher-slide-source:end -->`;
}

function addSourceSections(unit) {
  const block = sourceSections(unit);
  const range = /<!-- teacher-slide-source:start -->[\s\S]*?<!-- teacher-slide-source:end -->/;
  if (range.test(unit.html)) return unit.html.replace(range, block);
  const marker = '<!-- skillr-facebook-feedback:start -->';
  if (unit.html.includes(marker)) return unit.html.replace(marker, `${block}\n${marker}`);
  const anchor = /(<\/div>\s*<aside\b)/i;
  if (anchor.test(unit.html)) return unit.html.replace(anchor, `${block}\n$1`);
  throw new Error(`${unit.code}: safe topic-page insertion point not found`);
}

function slide(unit, kind, title, values, index, total, extra = '') {
  const list = values.length ? `<ul>${values.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
  return `<figure class="fixed-slide-viewer__slide" data-slide data-slide-kind="${kind}"${index ? ' hidden' : ''}><div class="slide-watermark" aria-hidden="true"><span>SkillrHub • skillrhub.com</span><span>SkillrHub • skillrhub.com</span></div><header><p>Foundation ${esc(unit.subjectLabel)} • ${esc(unit.code)}</p><span>${index + 1} / ${total}</span></header><div class="slide-content"><h2>${esc(title)}</h2>${extra}${list}</div><footer>${esc(unit.code)} • SkillrHub • skillrhub.com</footer></figure>`;
}

function viewer(unit) {
  const teachingChunks = chunkByLength([...unit.elaborations, ...unit.teachingExamples]);
  const defs = [
    {kind:'curriculum', title:'Curriculum', values:[unit.description]},
    {kind:'learning-intention', title:'Learning intention', values:[unit.learning]},
  ];
  teachingChunks.forEach((values,i)=>defs.push({kind:'elaboration-examples', title: teachingChunks.length > 1 ? `Elaboration expansion and examples ${i + 1}` : 'Elaboration expansion and examples', values}));
  chunk(unit.qa,2).forEach((pairs,i)=>defs.push({kind:'important-questions', title: unit.qa.length > 2 ? `Important questions and answers ${i + 1}` : 'Important questions and answers', values:[], extra:`<dl>${pairs.map(x => `<dt>${esc(x.question)}</dt><dd>${esc(x.answer)}</dd>`).join('')}</dl>`}));
  const assessmentCount=Math.max(Math.ceil(unit.assessmentQuestions.length/2),Math.ceil(unit.reviewHints.length/2));
  for(let i=0;i<assessmentCount;i++){const qs=unit.assessmentQuestions.slice(i*2,i*2+2),hs=unit.reviewHints.slice(i*2,i*2+2);defs.push({kind:'assessment', title: assessmentCount>1?`Assessment-style questions and review hints ${i+1}`:'Assessment-style questions and review hints', values:[], extra:`<div class="two-column"><section><h3>Questions</h3><ul>${qs.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section><section><h3>Review hints</h3><ul>${hs.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section></div>`});}
  defs.push({kind:'exit-ticket', title:'Exit ticket', values:unit.exitItems});
  const figures = defs.map((d,i)=>slide(unit,d.kind,d.title,d.values,i,defs.length,d.extra||'')).join('');
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${esc(unit.code)} Teacher Slides | SkillrHub</title><link rel="canonical" href="../"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"><style>
body{margin:0;background:#edf2f8;color:#17243a;font-family:Arial,Helvetica,sans-serif}.teacher-deck{max-width:1280px;margin:auto;padding:12px;box-sizing:border-box}.deck-nav{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:10px}.deck-nav a,.fixed-slide-viewer__controls button{min-height:40px;padding:8px 13px;border:1px solid #c7d5e8;border-radius:9px;background:#fff;color:#173968;font-weight:800;text-decoration:none}.fixed-slide-viewer__stage{aspect-ratio:16/9}.fixed-slide-viewer__slide{position:relative;isolation:isolate;overflow:hidden;box-sizing:border-box;height:100%;padding:0;background:#fff;border-radius:14px}.fixed-slide-viewer__slide header{height:82px;padding:0 54px;display:flex;align-items:center;justify-content:space-between;background:#173968;color:#fff;font-weight:800;box-sizing:border-box}.fixed-slide-viewer__slide header p{margin:0;font-size:clamp(18px,2vw,29px)}.slide-content{position:relative;z-index:2;padding:42px 70px 88px;box-sizing:border-box;height:calc(100% - 82px);overflow:hidden}.slide-content h2{margin:0 0 24px;color:#173968;font-size:clamp(32px,4vw,55px);line-height:1.05}.slide-content h3{font-size:clamp(19px,2vw,29px);color:#2457d6}.slide-content ul{margin:0;padding-left:1.3em;display:grid;gap:14px}.slide-content li,.slide-content dt,.slide-content dd{font-size:clamp(17px,1.75vw,28px);line-height:1.28}.slide-content dl{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:12px 24px;margin:0}.slide-content dt{font-weight:800;color:#173968}.slide-content dd{margin:0}.two-column{display:grid;grid-template-columns:1fr 1fr;gap:34px}.two-column ul{gap:10px}.slide-watermark{position:absolute;inset:100px 30px 70px;z-index:0;display:flex;justify-content:space-between;align-items:center;transform:rotate(-18deg);color:#2457d6;opacity:.045;font-size:30px;font-weight:900;pointer-events:none}.fixed-slide-viewer__slide footer{position:absolute;z-index:3;left:0;right:0;bottom:0;height:54px;padding:0 54px;display:flex;align-items:center;background:#173968;color:#fff;font-size:20px;font-weight:800;box-sizing:border-box}.fixed-slide-viewer__controls{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px}@media(max-width:760px){.slide-content{padding:24px 32px 72px}.two-column{grid-template-columns:1fr}.slide-content dl{grid-template-columns:1fr;gap:5px}.slide-content dd{margin-bottom:8px}.fixed-slide-viewer__slide header,.fixed-slide-viewer__slide footer{padding-left:28px;padding-right:28px}}
</style></head><body><main class="teacher-deck"><nav class="deck-nav"><a href="../">Topic Guide</a></nav><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">${figures}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span data-slide-counter>1 / ${defs.length}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script></body></html>\n`;
}

const files = [];
for (const subject of ['english','maths','science']) {
  const root = path.join(ROOT, 'foundation', subject);
  for (const entry of fs.readdirSync(root, {withFileTypes:true})) {
    if (!entry.isDirectory() || !/^ac9/i.test(entry.name)) continue;
    const file = path.join(root, entry.name, 'index.html');
    if (fs.existsSync(file)) files.push(file);
  }
}

const units = files.map(analyse);
const blocked = units.filter(x => x.missing.length);
if (blocked.length) {
  console.error(`Foundation six-part build blocked for ${blocked.length} topic(s):`);
  for (const unit of blocked) console.error(`- ${unit.code} ${unit.missing.join(', ')}`);
  process.exit(1);
}
if (WRITE) {
  for (const unit of units) {
    fs.writeFileSync(unit.file, addSourceSections(unit));
    const deck = path.join(path.dirname(unit.file), 'teacher-slides', 'index.html');
    fs.mkdirSync(path.dirname(deck), {recursive:true});
    fs.writeFileSync(deck, viewer(unit));
  }
}
console.log(`Foundation six-part teacher slides: ${WRITE ? 'BUILT' : 'READY'}`);
console.log(`Topics: ${units.length}`);
console.log(`English: ${units.filter(x=>x.subjectLabel==='English').length}`);
console.log(`Maths: ${units.filter(x=>x.subjectLabel==='Maths').length}`);
console.log(`Science: ${units.filter(x=>x.subjectLabel==='Science').length}`);
