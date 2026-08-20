#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const ROOT=process.cwd();
const YEARS=[8,9,10];
const esc=(s='')=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const arr=v=>Array.isArray(v)?v:[];
function load(year){
 const file=path.join(ROOT,'assets',`year${year}-english-full-data.js`);
 if(!fs.existsSync(file))throw new Error(`Missing ${file}`);
 const ctx={window:{SkillrUpperEnglishData:{}}}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
 return ctx.window.SkillrUpperEnglishData||{};
}
function resources(u){
 const year=u.year,code=u.code.toLowerCase();
 return {slides:u.resourceLinks?.slides||`/worksheets/year${year}/english/teacher-slides/live.html?code=${u.code}`,worksheet:`/quiz/year-${year}/english/${code}/worksheet/`,practice:`/quiz/year-${year}/english/${code}/practice/`,test:`/quiz/year-${year}/english/${code}/test/`};
}
function page(u){
 const r=resources(u),canonical=`https://skillrhub.com/year${u.year}/english/${u.slug}/`;
 const els=arr(u.elaborations).map((e,i)=>`<li><strong>${esc(e.id||`E${i+1}`)}:</strong> ${esc(e.curriculumWording||e.plainLanguageConcept||'')}</li>`).join('')||'<li>Use the exact content description as the required target.</li>';
 return `<!doctype html>\n<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>${esc(u.code)} ${esc(u.title)} | Year ${u.year} English Topic Guide</title><meta name="description" content="${esc(u.code)} Year ${u.year} English lesson: ${esc(u.contentDescription||u.subtitle||u.title)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=4"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-8P22BET45N');</script><script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head>\n<body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/year${u.year}/curriculum/english/">English</a><a href="/sitemap.html">Sitemap</a></nav><nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year${u.year}/">Year ${u.year}</a></li><li><a href="/year${u.year}/curriculum/english/">English</a></li><li aria-current="page">${esc(u.code)}</li></ol></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">${esc(u.code)} • Year ${u.year} English</p><h1>${esc(u.title)}</h1><p class="curriculum-hero__lead">${esc(u.contentDescription||u.subtitle||u.title)}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="${esc(r.slides)}">Teacher Slides</a><a href="${r.worksheet}">Practice Sheet</a><a href="${r.practice}">Practice</a><a href="${r.test}">Test</a></div></header><main class="curriculum-layout"><div><section class="curriculum-topic-section" id="topic-guide"><h2>Outcome Overview &amp; Core Concepts</h2><p>${esc(u.learningIntention||u.subtitle||u.contentDescription||'')}</p></section><section class="curriculum-topic-section"><h2>Curriculum coverage and elaborations</h2><ul>${els}</ul></section><section class="curriculum-topic-section">\n        <h2>Related resources</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="${esc(r.slides)}">Teacher Slides</a><a class="curriculum-button" href="${r.worksheet}">Practice Sheet</a><a class="curriculum-button" href="${r.practice}">Practice</a><a class="curriculum-button" href="${r.test}">Test</a></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Teacher resource</h2><p>Use the topic guide as the student-facing lesson, then move to the linked teacher slides or independent practice.</p><a class="curriculum-button primary" href="${esc(r.slides)}">Teacher Slides</a></section></aside></main></div><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>\n`;
}
let count=0;
for(const year of YEARS){
 const registry=load(year);
 for(const u of Object.values(registry)){
  if(Number(u.year)!==year||!u.code||!u.slug)continue;
  const dir=path.join(ROOT,`year${year}`,'english',u.slug);
  if(!fs.existsSync(dir))throw new Error(`Missing topic directory ${dir}`);
  fs.writeFileSync(path.join(dir,'index.html'),page(u)); count++;
 }
}
if(count!==71)throw new Error(`Expected 71 upper English pages, generated ${count}`);
console.log(`Generated ${count} static Years 8–10 English topic-page shells from authored registries.`);
