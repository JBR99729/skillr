import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const file=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const homepage=file('index.html');
const skills=JSON.parse(file('assets/free-maths-skills.json'));
const styles=file('assets/free-daily-maths.css');
const script=file('assets/free-daily-maths.js');
test('free Maths is primary above-the-fold homepage journey while legacy sections survive',()=>{
 assert.match(homepage,/<h1 id="free-practice-title">Practise Maths Every Day — Completely Free!/);
 assert(homepage.indexOf('id="free-maths-practice"')>=0); // alternative check below
 assert(homepage.indexOf('id="free-practice-title"')<homepage.indexOf('id="home-hero-title"'));
 assert.match(homepage,/id="free-practice-year"/);assert.match(homepage,/id="free-practice-skill"/);
 assert.match(homepage,/id="free-practice-start"/);
 assert.match(homepage,/No login required/);
 assert.match(homepage,/English &amp; Science Coming Soon/);
 assert.match(homepage,/id="choose-year"/);assert.match(homepage,/id="see-worksheets"/);
 assert.match(homepage,/https:\/\/app\.skillrhub\.com\/\?try=1/);
});
test('only current published practice availability snapshot drives skill options',()=>{
 assert(skills.skills.length>0);
 const seen=new Set();
 for(const skill of skills.skills){
  assert.match(skill.code,/^AC9M/);assert(Number.isInteger(skill.year));
  assert(skill.year>=0&&skill.year<=6);
  assert(skill.question_count>0);
  assert(!seen.has(skill.code),'duplicate skill code '+skill.code);seen.add(skill.code);
 }
 assert.match(script,/free-maths-skills\.json/);
 assert.match(script,/question_count/);
 assert.match(script,/new URLSearchParams/);
 assert.match(script,/utm_source/);
});
test('responsive, accessible quiz selector and submitted-answer milestone exist',()=>{
 assert.match(styles,/@media\s*\(max-width:520px\)/);
 assert.match(styles,/:focus-visible/);
 assert.match(homepage,/data-free-progress/);
 assert.match(homepage,/aria-live="polite"/);
 assert.match(homepage,/data-learning-stats/);
 const stats=file('assets/learning-stats.js');
 assert.match(stats,/learning_work_guest_v2/);
 assert.match(stats,/\['learning_work_v1','learning_work_guest_v2'\]/);
 assert.match(stats,/mountLearningStats\(document,true\)/);
});
test('all legacy critical website and PWA entry points remain present',()=>{
 for(const path of ['CNAME','manifest.webmanifest','service-worker.js','quiz/index.html','assets/home-simple.css','pwa-register.js','share-button.js']){
  assert(existsSync(new URL('../'+path,import.meta.url)),path+' unexpectedly missing');
 }
});
