import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'../..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const version='20260906-year2-pending-release';
let total=0,adult=0,visual=0;
for(const suffix of ['m01','m02','m03','m04','m05','sp01','sp02','st01','st02']) {
 const code='ac9m2'+suffix,route=`quiz/year-2/math/${code}`;
 const source=JSON.parse(read(`assets/assessment-banks/year2/math/${code}.json`));
 for(const mode of ['practice','test']) {
  const context={window:{}};vm.runInNewContext(read(`${route}/${mode}/questions.js`),context);
  const live=context.window.quizQuestions,expected=source.filter(q=>q.bank===mode);
  assert.equal(live.length,mode==='practice'?24:16);
  if(mode==='practice')assert.equal(read(`${route}/${mode}/questions.js`),read(`${route}/${mode}/practice-questions.js`));
  const html=read(`${route}/${mode}/index.html`);
  const config=vm.runInNewContext('('+html.match(/window\.quizConfig=(\{.*?\});/)[1]+')');
  assert.equal(config.bankVersion,version);assert.equal(config.requireAdultReviewSupport,true);
  assert(html.indexOf('year1-maths-support.js')<html.indexOf('/quiz/assets/script.js'));
  assert(html.includes('data-adult-review-note'));
  if(mode==='practice')assert(!/48-question|>48<\/span>/.test(html));
  for(const page of ['review','result']) {
   const h=read(`${route}/${mode}/${page}/index.html`);
   assert.equal(h.match(/data-result-key="([^"]+)"/)[1],config.resultStorageKey);
   assert(h.indexOf('year1-maths-support.js')<h.indexOf(`/quiz/assets/separate-${page}.js`));
  }
  const positions=[0,0,0];
  for(let i=0;i<live.length;i++) {
   const q=live[i],s=expected[i];total++;
   assert.equal(q.id,s.id.toLowerCase());assert.equal(q.question,s.question);
   assert.equal(q.audioPrompt,s.question);assert.equal(q.visualMeta.asset_path,s.visual.asset_path);
   if(s.grading_mode) {
    adult++;assert.equal(q.type,'self-check');assert.equal(q.gradingMode,'adult-review');
    assert.equal(q.correct,s.model_answer);assert.equal(q.acceptanceNote,s.acceptance_note);
    assert(q.modelAnswer&&q.acceptanceNote&&q.responseInstructions);
   } else {
    assert.equal(q.type,'single');assert.equal(q.correct,s.correct_index);
    assert.equal(q.answers[q.correct],s.answers[s.correct_index].text);positions[q.correct]++;
   }
   if(s.visual.type==='svg') {
    visual++;const u=new URL(s.visual.asset_path,'https://skillrhub.com');
    assert.equal(u.searchParams.get('v'),version);
    assert(read(u.pathname.slice(1)).includes(`id="${u.hash.slice(1)}"`),q.id+' missing symbol');
   }
  }
  assert(Math.max(...positions)-Math.min(...positions)<=1,code+' MCQ balance');
 }
 // Check local route and dependency targets without changing the teaching pages.
 for(const relative of ['index.html','practice/index.html','test/index.html','practice/review/index.html','test/review/index.html','practice/result/index.html','test/result/index.html']) {
  const f=`${route}/${relative}`,html=read(f);
  for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
   const url=new URL(m[1],'https://skillrhub.com/'+f);
   if(url.origin!=='https://skillrhub.com')continue;
   const p=path.join(root,url.pathname);
   assert(fs.existsSync(p),`${f}: missing ${url.pathname}`);
   if(fs.statSync(p).isDirectory())assert(fs.existsSync(path.join(p,'index.html')),p);
  }
 }
}
// A submitted practical response must remain unmarked, even with paper-completion checked.
const ctx={window:{},document:{getElementById:id=>id==='adultReviewAnswer'?{value:'Completed my drawing'}:{checked:true}}};
vm.runInNewContext(read('quiz/assets/year1-maths-support.js'),ctx);
const support=ctx.window.SkillrYear1Maths;
const response=support.evaluateAdultResponse({modelAnswer:'An acceptable drawing'});
assert.equal(response.isCorrect,null);assert.equal(response.pendingReview,true);
let result=support.summarise([{isCorrect:true},response],75);
assert.equal(result.passed,false);assert.equal(result.pendingReview,1);assert.equal(result.markedTotal,1);
result=support.summarise([{isCorrect:true},{...response,isCorrect:true,pendingReview:false}],75);
assert.equal(result.passed,true);assert.equal(result.pendingReview,0);assert.equal(result.score,2);
console.log(JSON.stringify({status:'PASS',questions:total,adultReview:adult,svgReferences:visual,checks:'published parity, real MCQ balance, versioned SVG symbols, route/dependency targets, adult-review wiring and pending score semantics'}));
