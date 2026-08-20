#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT=process.cwd();
const YEARS=[8,9,10];
const esc=(s='')=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const arr=v=>Array.isArray(v)?v:[];
const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
const clip=(s,n=26)=>{const w=clean(s).split(' ');return w.length<=n?clean(s):w.slice(0,n).join(' ')+'…'};

function load(year){
  const file=path.join(ROOT,'assets',`year${year}-english-full-data.js`);
  if(!fs.existsSync(file)) throw new Error(`Missing ${file}`);
  const ctx={window:{SkillrUpperEnglishData:{}}};
  vm.createContext(ctx); vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
  return ctx.window.SkillrUpperEnglishData||{};
}

function resources(u){
  const year=u.year,code=u.code.toLowerCase();
  return {
    slides:u.resourceLinks?.slides||`/worksheets/year${year}/english/teacher-slides/live.html?code=${u.code}`,
    worksheet:u.resourceLinks?.worksheet||`/quiz/year-${year}/english/${code}/worksheet/`,
    practice:u.resourceLinks?.practice||`/quiz/year-${year}/english/${code}/practice/`,
    test:u.resourceLinks?.test||`/quiz/year-${year}/english/${code}/test/`
  };
}

function list(items){return arr(items).filter(Boolean).map(x=>`<li>${esc(typeof x==='string'?x:(x.text||x.title||x.label||''))}</li>`).join('')}
function card(title,body){return `<article class="curriculum-worked-example"><h3>${esc(title)}</h3>${body}</article>`}

function exampleCards(u){
  const out=[];
  for(const w of arr(u.workedExamples)){
    const steps=arr(w.steps);
    let body='';
    if(w.teacherLanguage) body+=`<p><strong>Teacher model:</strong> ${esc(w.teacherLanguage)}</p>`;
    if(w.scenario||w.example) body+=`<p>${esc(w.scenario||w.example)}</p>`;
    if(steps.length) body+=`<ol>${steps.map(s=>`<li><strong>${esc(s.label||'Step')}:</strong> ${esc(s.text||'')}</li>`).join('')}</ol>`;
    out.push(card(w.title||'Worked example',body||'<p>Model the example explicitly, then ask students to explain the evidence and effect.</p>'));
  }
  for(const e of arr(u.elaborations)){
    if(out.length>=4) break;
    let body=`<p>${esc(e.plainLanguageConcept||e.curriculumWording||'')}</p>`;
    if(e.teacherDoes) body+=`<p><strong>Teacher move:</strong> ${esc(e.teacherDoes)}</p>`;
    if(e.teacherSaysOrAsks) body+=`<p><strong>Ask:</strong> ${esc(e.teacherSaysOrAsks)}</p>`;
    out.push(card(`${e.id||'Example'}: ${e.title||e.teachingPurpose||'Curriculum example'}`,body));
  }
  if(out.length<4 && u.warmUp){
    out.push(card(u.warmUp.title||'Warm-up',`<p>${esc(u.warmUp.task||'')}</p>${u.warmUp.share?`<p><strong>Share:</strong> ${esc(u.warmUp.share)}</p>`:''}`));
  }
  for(const s of arr(u.teachingProgression?.steps)){
    if(out.length>=4) break;
    out.push(card(s.purpose||s.id||'Teaching example',`<p>${esc(s.teacherAction||'')}</p>${s.studentAction?`<p><strong>Students:</strong> ${esc(s.studentAction)}</p>`:''}`));
  }
  return out.slice(0,4).join('');
}

function misconceptionList(u){
  return arr(u.misconceptions).map(m=>{
    if(typeof m==='string') return `<li>${esc(m)}</li>`;
    const idea=m.incorrectIdea||m.title||m.misconception||'Common misconception';
    const fix=m.rapidRemediation||m.correction||m.fix||m.remediation||'Return to the exact text evidence and explain the effect in context.';
    return `<li><strong>${esc(idea)}:</strong> ${esc(fix)}</li>`;
  }).join('');
}

function teachingSequence(u){
  const src=arr(u.teachingProgression?.steps);
  const labels=['Step 1: Explicit Teaching & Modelling','Step 2: Guided Analysis','Step 3: Collaborative / Independent Practice','Step 4: Formative Assessment'];
  return labels.map((label,i)=>{
    const s=src[i]||src[src.length-1]||{};
    let body=`<p>${esc(s.teacherAction||s.purpose||'Model the exact English choice, identify evidence and explain its effect in context.')}</p>`;
    if(s.studentAction) body+=`<p><strong>Students:</strong> ${esc(s.studentAction)}</p>`;
    if(i===3){
      const final=arr(u.masteryItems).at(-1);
      if(final?.prompt) body+=`<p><strong>Check:</strong> ${esc(final.prompt)}</p>`;
    }
    return card(label,body);
  }).join('');
}

function differentiation(u){
  const d=u.differentiation||{};
  const entries=[['Support',d.support],['Core',d.core],['Extend',d.extend]].filter(([,v])=>v);
  if(!entries.length) return '';
  return `<section class="curriculum-topic-section"><h2>Support, Core and Extend</h2><div class="unit-activity-grid">${entries.map(([name,v])=>card(name,`<p>${esc(v.adaptation||v.task||String(v))}</p>${v.boundaryCheck?`<p><strong>Keep the concept:</strong> ${esc(v.boundaryCheck)}</p>`:''}`)).join('')}</div></section>`;
}

function mappingRows(year,code,description){
  const vic=year===0?'Foundation':`Level ${year}`;
  const nsw=year<=2?'Stage 1':year<=4?'Stage 2':year<=6?'Stage 3':year<=8?'Stage 4':'Stage 5';
  const uk=year<=2?'Key Stage 1':year<=6?'Key Stage 2':year<=9?'Key Stage 3':'Key Stage 4 / GCSE';
  const nz=year<=3?'Phase 1 (Years 0–3)':year<=6?'Phase 2 (Years 4–6)':year<=8?'Phase 3 (Years 7–8)':'Phase 4 (Years 9–10)';
  const rows=[
    ['Australia','Australian Curriculum v9.0',`${code} — ${description}`],
    ['Victoria','Victorian Curriculum F–10 Version 2.0 English',`${vic} English — closest Language, Literature or Literacy alignment; use the Victorian outcome wording when planning local assessment.`],
    ['NSW','English K–10 Syllabus (2022)',`${nsw} — closest NSW English outcome alignment; use as a planning comparison rather than a one-to-one code conversion.`],
    ['United States','Common Core State Standards for ELA/Literacy',`Grade ${year} closest alignment across Reading, Writing, Speaking and Listening, or Language according to the outcome focus.`],
    ['England','National curriculum in England: English',`${uk} — closest reading, writing, spoken-language, grammar or literary-analysis programme-of-study alignment.`],
    ['Canada','Provincial English Language Arts curricula',`Grade ${year} broad English Language Arts alignment; exact outcomes vary by province or territory.`],
    ['New Zealand','The New Zealand Curriculum – English Years 0–10 (2025 statement)',`${nz} — closest oral language, reading/writing or Text Studies/Language Studies alignment; in effect from 1 January 2026.`],
    ['India','NCERT / CBSE English Language and Literature',`Class ${year} broad language, reading, writing or literature alignment; verify the current local course specification.`]
  ];
  return rows.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('');
}

function page(u){
  const r=resources(u), canonical=`https://skillrhub.com/year${u.year}/english/${u.slug}/`;
  const content=clean(u.contentDescription||u.subtitle||u.title);
  const must=list(u.conceptBoundary?.mustTeach);
  const prereq=list(u.conceptBoundary?.prerequisites);
  const boundary=list(u.conceptBoundary?.mustNotOverteach);
  const criteria=list(u.successCriteria);
  const els=arr(u.elaborations).map((e,i)=>`<li><strong>${esc(e.id||`E${i+1}`)}:</strong> ${esc(e.curriculumWording||e.plainLanguageConcept||'')}</li>`).join('')||'<li>Use the exact content description above as the required learning target.</li>';
  const final=arr(u.masteryItems).at(-1);
  const practicePrompt=final?.prompt||arr(u.slides).at(-1)?.display?.studentPrompt||`Apply ${u.title.toLowerCase()} to a new text and justify the effect with precise evidence.`;
  const meta=clip(`${u.code} Year ${u.year} English lesson: ${content}. Worked examples, misconceptions, explicit teaching and curriculum mapping.`,30);
  return `<!doctype html>\n<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>${esc(u.code)} ${esc(u.title)} | Year ${u.year} English Topic Guide</title><meta name="description" content="${esc(meta)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=4"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-8P22BET45N');</script><script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head>\n<body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/year${u.year}/curriculum/english/">English</a><a href="/sitemap.html">Sitemap</a></nav><nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year${u.year}/">Year ${u.year}</a></li><li><a href="/year${u.year}/curriculum/english/">English</a></li><li aria-current="page">${esc(u.code)}</li></ol></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">${esc(u.code)} • Year ${u.year} English</p><h1>${esc(u.title)}</h1><p class="curriculum-hero__lead">${esc(u.subtitle||content)}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="${esc(r.slides)}">Teacher Slides</a><a href="${esc(r.worksheet)}">Practice Sheet</a><a href="${esc(r.practice)}">Practice</a><a href="${esc(r.test)}">Test</a></div></header><main class="curriculum-layout"><div id="topic-guide"><section class="curriculum-topic-section"><h2>1. Outcome Overview &amp; Core Concepts</h2><p>${esc(u.learningIntention||u.subtitle||content)}</p><p><strong>Australian Curriculum target:</strong> ${esc(content)}</p>${must?`<h3>Core concepts</h3><ul>${must}</ul>`:''}${criteria?`<h3>Success criteria</h3><ul>${criteria}</ul>`:''}${prereq?`<h3>Useful prior knowledge</h3><ul>${prereq}</ul>`:''}</section><section class="curriculum-topic-section"><h2>2. Subject-Specific Content &amp; Key Examples</h2><div class="unit-activity-grid">${exampleCards(u)}</div></section><section class="curriculum-topic-section"><h2>3. Common Student Misconceptions</h2><ul>${misconceptionList(u)||'<li><strong>Feature spotting:</strong> Require exact evidence and explain its effect in context.</li>'}</ul>${boundary?`<h3>Do not overteach</h3><ul>${boundary}</ul>`:''}</section><section class="curriculum-topic-section"><h2>4. 4-Step Instructional Sequence</h2><div class="unit-activity-grid">${teachingSequence(u)}</div></section><section class="curriculum-topic-section"><h2>Curriculum Coverage &amp; Elaborations</h2><p>The content description is the required target. Elaborations are useful examples and contexts, not a disconnected checklist.</p><ul>${els}</ul></section>${differentiation(u)}<section class="curriculum-topic-section"><h2>Practice Thought &amp; Formative Assessment</h2><p>${esc(practicePrompt)}</p>${final?.expectedAnswer?`<p><strong>What a strong response should show:</strong> ${esc(final.expectedAnswer)}</p>`:''}<p>Students should transfer the idea to a fresh text or composition rather than reproduce the worked example.</p></section><section class="curriculum-topic-section"><h2>5. Accurate International Curriculum Mapping</h2><p>The Australian Curriculum code is exact. International entries are current closest alignments for planning and discovery, not one-to-one code equivalents.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>English / ELA curriculum</th><th>Closest alignment</th></tr></thead><tbody>${mappingRows(u.year,u.code,content)}</tbody></table></div></section><section class="curriculum-topic-section"><h2>Related resources</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="${esc(r.slides)}">Teacher Slides</a><a class="curriculum-button" href="${esc(r.worksheet)}">Practice Sheet</a><a class="curriculum-button" href="${esc(r.practice)}">Practice</a><a class="curriculum-button" href="${esc(r.test)}">Test</a></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Teacher resource</h2><p>Teach the core concept and worked example, check the misconception, then move students into independent practice.</p><a class="curriculum-button primary" href="${esc(r.slides)}">Teacher Slides</a></section></aside></main></div><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>\n`;
}

let count=0;
for(const year of YEARS){
  const registry=load(year);
  for(const u of Object.values(registry)){
    if(Number(u.year)!==year||!u.code||!u.slug) continue;
    const dir=path.join(ROOT,`year${year}`,'english',u.slug);
    if(!fs.existsSync(dir)) throw new Error(`Missing topic directory ${dir}`);
    fs.writeFileSync(path.join(dir,'index.html'),page(u)); count++;
  }
}
if(count!==71) throw new Error(`Expected 71 upper English pages, generated ${count}`);
console.log(`Generated ${count} static, authored Years 8–10 English topic pages from existing rich registries.`);
