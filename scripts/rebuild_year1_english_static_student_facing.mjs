#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const write = (file, content) => { const full = path.join(ROOT,file); fs.mkdirSync(path.dirname(full),{recursive:true}); fs.writeFileSync(full,content); };
const esc = (value="") => String(value ?? "").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const strip = (value="") => String(value ?? "").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g," ").trim();

const context = vm.createContext({window:{}});
for (const file of ["assets/year1-english-data.js","assets/year1-english-student-facing.js"]) new vm.Script(read(file),{filename:file}).runInContext(context);
const units = context.window.SkillrYear1EnglishData || {};
const codes = Object.keys(units).filter((code)=>/^AC9E1(?:LA|LE|LY)\d{2}$/.test(code)).sort();
if (codes.length !== 30) throw new Error(`Expected 30 Year 1 English codes, found ${codes.length}`);

function findTopicDir(code) {
  const root = path.join(ROOT,"year1","english");
  const hits = fs.readdirSync(root,{withFileTypes:true}).filter((entry)=>entry.isDirectory() && entry.name.toLowerCase().startsWith(`${code.toLowerCase()}-`));
  if (hits.length !== 1) throw new Error(`${code}: expected one topic directory, found ${hits.length}`);
  return path.join("year1","english",hits[0].name);
}

function preserveDetails(html, pattern) {
  const details = [...html.matchAll(/<details\b[\s\S]*?<\/details>/gi)].map((match)=>match[0]);
  return details.find((block)=>pattern.test(strip(block))) || "";
}

function list(items, mapper=(item)=>esc(item)) {
  return `<ul>${(items || []).map((item)=>`<li>${mapper(item)}</li>`).join("")}</ul>`;
}

function topicBody(code,unit,existing) {
  const focus = unit.studentFacingFocus || [];
  const activities = (unit.activities || []).map((a)=>`<li><strong>${esc(a.title)}</strong> — ${esc(a.text)}${a.visual?`<div class="english-card-row"><span>${esc(a.visual)}</span></div>`:""}</li>`).join("");
  const mistakes = (unit.mistakes || []).map(([name,fix])=>`<li><strong>${esc(name)}</strong> — ${esc(fix)}</li>`).join("");
  const quick = list(unit.quick || []);
  const mastery = list(unit.mastery || [],(item)=>esc(/^I can\b/i.test(item)?item:`I can ${String(item).replace(/[.]$/,"").replace(/^./,(c)=>c.toLowerCase())}.`));
  const curriculum = preserveDetails(existing,/Curriculum Coverage.*Elaborations|Australian Curriculum elaborations/i);
  const equivalents = preserveDetails(existing,/Curriculum equivalents/i);
  return `<header class="curriculum-hero"><p class="curriculum-eyebrow">${code} • Year 1 English</p><h1>${esc(unit.title)}</h1><p class="curriculum-hero__lead">${esc(unit.childGoal || unit.learn)}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="teacher-slides/">Classroom View</a><a href="/quiz/year-1/english/${code.toLowerCase()}/worksheet/">Printable Worksheet</a><a href="/quiz/year-1/english/${code.toLowerCase()}/practice/">40-question Practice</a><a href="/quiz/year-1/english/${code.toLowerCase()}/test/">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button></header>
<main class="curriculum-layout"><div id="topic-guide">
<details class="curriculum-topic-section" open><summary><strong>What this skill means</strong></summary><div class="curriculum-detail-body"><p><strong>Learning goal:</strong> ${esc(unit.childGoal || unit.learn)}</p>${focus.length?list(focus):`<p>${esc(unit.desc)}</p>`}<h3>Steps to use</h3><p><strong>${esc(unit.routine)}</strong></p></div></details>
<details class="curriculum-topic-section"><summary><strong>See it, then try it</strong></summary><div class="curriculum-detail-body"><h3>${esc(unit.model_title)}</h3>${unit.model_html || ""}<article class="curriculum-worked-example"><h3>Worked example</h3><p>${esc(unit.solved_example)}</p></article><h3>${esc(unit.apply_title)}</h3>${unit.apply_html || ""}</div></details>
<details class="curriculum-topic-section"><summary><strong>Try these</strong></summary><div class="curriculum-detail-body"><ol>${activities}</ol></div></details>
<details class="curriculum-topic-section"><summary><strong>Common mix-ups</strong></summary><div class="curriculum-detail-body"><ul>${mistakes}</ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Check your understanding</strong></summary><div class="curriculum-detail-body"><h3>Quick checks</h3>${quick}<h3>I am ready when I can</h3>${mastery}</div></details>
${curriculum}${equivalents}
<details class="curriculum-topic-section"><summary><strong>Resources</strong></summary><div class="curriculum-detail-body"><div class="curriculum-link-row"><a class="curriculum-button primary" href="teacher-slides/">Open Classroom View</a><a class="curriculum-button" href="/quiz/year-1/english/${code.toLowerCase()}/worksheet/">Printable Worksheet</a><a class="curriculum-button" href="/quiz/year-1/english/${code.toLowerCase()}/practice/">40-question Practice</a><a class="curriculum-button" href="/quiz/year-1/english/${code.toLowerCase()}/test/">Test</a></div></div></details>
</div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Classroom display</h2><p>Open the existing SkillrHub Classroom View.</p><a class="curriculum-button primary" href="teacher-slides/">Classroom View</a></section><section class="curriculum-panel"><h2>Curriculum code</h2><p><strong>${code}</strong><br>Year 1 English</p></section></aside></main>`;
}

function replacePage(code,unit,topicDir) {
  const file = path.join(topicDir,"index.html");
  let html = read(file);
  const body = topicBody(code,unit,html);
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(code)} ${esc(unit.title)} | Year 1 English</title>`)
    .replace(/<meta name="description"[^>]*>/i,`<meta name="description" content="${esc(code)} Year 1 English: ${esc(unit.childGoal || unit.desc)} Includes a topic guide, classroom display, printable worksheet and 40-question practice.">`)
    .replace(/<header class="curriculum-hero">[\s\S]*?<\/header>\s*<main class="curriculum-layout">[\s\S]*?<\/main>/i,body)
    .replace(/<script\b[^>]*src=["'][^"']*year1-english-render\.js[^"']*["'][^>]*><\/script>\s*/gi,"");
  write(file,html);
}

for (const code of codes) {
  const unit=units[code], topicDir=findTopicDir(code);
  replacePage(code,unit,topicDir);
}
console.log(`Rebuilt ${codes.length} static Year 1 English topic guides while preserving Classroom Views unchanged.`);
