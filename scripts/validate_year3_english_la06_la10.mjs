import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const baseline=process.argv[2]||'2d4f89718c3fad9164834245a21133d974a73aee';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const historical=p=>execFileSync('git',['show',`${baseline}:${p}`],{cwd:root,encoding:'utf8'});
const normal=s=>String(s).toLowerCase().replace(/[“”'’".,:;!?—–-]/g,' ').replace(/\s+/g,' ').trim();
const allPrompts=new Set(); const results=[];
for(let n=6;n<=10;n++){
 const code=`AC9E3LA${String(n).padStart(2,'0')}`,lower=code.toLowerCase(),sourcePath=`assets/assessment-banks/year3/english/${lower}.json`;
 execFileSync(process.execPath,['scripts/validate_production_question_bank.mjs',sourcePath],{cwd:root,stdio:'pipe'});
 const source=JSON.parse(read(sourcePath)),old=JSON.parse(historical(sourcePath));
 for(const item of old){const now=source.find(q=>q.id===item.id);assert(now,`${item.id}: lost ID`);for(const k of ['curriculum_code','bank','subject','year_level'])assert.equal(now[k],item[k],`${item.id}: changed ${k}`);for(const k of Object.keys(item))assert(k in now,`${item.id}: lost source field ${k}`);}
 const coverage={}; const stages={};
 for(const q of source){
  assert(!allPrompts.has(normal(q.question)),`${q.id}: repeated prompt across banks/codes`);allPrompts.add(normal(q.question));
  assert(!/Why is “.*best answer here|A student chooses|longest-looking option|\bfamiliar word\b|all of the above|none of the above|_{2,}/i.test(q.question+' '+q.answers.map(a=>a.text).join(' ')),`${q.id}: legacy filler or silent blank`);
  if(n===9){assert.equal(q.visual.type,'svg');const [file,symbol]=q.visual.asset_path.split('#');assert(file&&symbol);assert(read(file.replace(/^\//,'')).includes(`id="${symbol}"`));assert(q.visual.alt_text.length>30);}else{assert.equal(q.visual.type,'none');assert(!q.visual.asset_path&&!q.visual.alt_text);}
  coverage[q.skill]??={practice:[],test:[]};coverage[q.skill][q.bank].push(q.id);
  stages[q.stage]=(stages[q.stage]||0)+1;
 }
 assert.equal(Object.keys(coverage).length,8);
 for(const [skill,banks] of Object.entries(coverage)){assert.equal(banks.practice.length,6,skill);assert.equal(banks.test.length,2,skill);}
 const routes=[];
 for(const bank of ['practice','test']){
  const base=`quiz/year-3/english/${lower}/${bank}`,html=read(`${base}/index.html`);
  const scripts=[...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m=>m[1]);
  const questionScripts=scripts.filter(s=>s.includes('questions')).map(s=>s.split('?')[0].replace(/^\//,''));
  assert.equal(questionScripts.length,1,`${code} ${bank}: unexpected question owner`);
  assert.equal(questionScripts[0],`${base}/questions.js`);
  assert(!html.includes('experience-teacher-questions.js'),`${code} ${bank}: legacy override`);
  assert(scripts.findIndex(s=>s.includes(`${base}/questions.js`))<scripts.findIndex(s=>s.includes('/quiz/assets/script.js')),`${code} ${bank}: load order`);
  assert(html.includes('"maxQuestions":5')&&html.includes('"shuffleQuestions":true')&&html.includes('"shuffleAnswers":true'));
  assert(html.includes('20260907-english-la06-la10'));
  const context={window:{}};vm.createContext(context);
  for(const file of questionScripts)vm.runInContext(read(file),context,{filename:file,timeout:1000});
  const actual=context.window.quizQuestions,expected=source.filter(q=>q.bank===bank);
  assert.equal(actual.length,bank==='practice'?48:16);
  assert.strictEqual(actual,context.window[bank==='practice'?'skillrPracticeQuestions':'skillrTestQuestions']);
  if(bank==='test')assert.strictEqual(actual,context.window.skillrExamQuestions);
  const oldContext={window:{}};vm.createContext(oldContext);vm.runInContext(historical(`${base}/questions.js`),oldContext);
  for(const q of oldContext.window.quizQuestions){const now=actual.find(x=>x.id===q.id);assert(now,`${q.id}: runtime ID lost`);for(const k of Object.keys(q))assert(k in now,`${q.id}: runtime field lost: ${k}`);}
  for(const q of expected){const live=actual.find(x=>x.id===q.id.toLowerCase());assert(live);assert.equal(live.curriculumCode,code);assert.equal(live.bank,bank);assert.equal(live.question,q.question);assert.equal(live.audioPrompt,q.audio_prompt);assert.deepEqual(Array.from(live.answers),q.answers.map(a=>a.text));assert.equal(live.correct,q.correct_index);assert.equal(live.structuredExplanation.summary,q.explanation.summary);assert.equal(live.structuredExplanation.hint,q.explanation.hint);assert.equal(live.explanation,`${q.explanation.summary}\nHint: ${q.explanation.hint}`);if(n===9){assert(live.visualHtml.includes(q.visual.asset_path));assert.equal(live.visual,q.visual.alt_text);assert.equal(live.visualMeta.asset_path,q.visual.asset_path);}else assert.equal(live.visualHtml,'');}
  if(bank==='practice')assert.equal(read(`${base}/questions.js`),read(`${base}/practice-questions.js`));
  if(n===9){const review=read(`${base}/review/index.html`);assert(review.includes(`${base}/questions.js?v=20260907-english-la06-la10`));assert(review.includes('/quiz/year-3/english/ac9e3la09/review-visuals.js'));assert(review.indexOf('/quiz/assets/separate-review.js')<review.indexOf('/quiz/year-3/english/ac9e3la09/review-visuals.js'));}
  for(const suffix of ['result/index.html','review/index.html','retake/index.html'])assert(fs.existsSync(path.resolve(root,base,suffix)),`${code}: missing ${suffix}`);
  routes.push({bank,count:actual.length,questionScripts,sourceRuntimeParity:true,preservedRuntimeIds:oldContext.window.quizQuestions.length});
 }
 results.push({code,status:'PASS',preservedSourceIds:old.length,addedPracticeIds:8,coverage,stages,routes});
}
assert(read('quiz/assets/style.css').includes('white-space: pre-line'));
assert(!read('year3/curriculum/english/index.html').includes('✓ Content Verified'),'Whole English subject badge must remain pending');
const output={status:'PASS',baseline,codes:5,questions:320,checks:['all production validators','identity and bank preservation','all legacy schema keys preserved','unique prompts','eight strands at 6 practice +2 test','actual HTML question-script ownership and order','source/runtime/feedback parity','practice mirror equality','result/review/retake route presence','English subject badge remains pending'],results};
fs.mkdirSync(path.join(root,'reports/year3-english-ixl-review'),{recursive:true});
fs.writeFileSync(path.join(root,'reports/year3-english-ixl-review/LA06-LA10-VALIDATION.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({status:output.status,codes:5,questions:320,checks:output.checks},null,2));
