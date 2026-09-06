import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
let total=0,adult=0;
for(let n=1;n<=5;n++){
 const code='ac9e2la0'+n,route=`quiz/year-2/english/${code}`;
 const source=JSON.parse(read(`assets/assessment-banks/year2/english/${code}.json`));
 assert.equal(new Set(source.map(q=>q.question)).size,40);
 for(const mode of ['practice','test']){
  const context={window:{}};vm.runInNewContext(read(`${route}/${mode}/questions.js`),context);
  const live=context.window.quizQuestions,expected=source.filter(q=>q.bank===mode);
  assert.equal(live.length,mode==='practice'?24:16);
  const html=read(`${route}/${mode}/index.html`),config=vm.runInNewContext('('+html.match(/window\.quizConfig=(\{.*?\});/)[1]+')');
  assert.equal(config.maxQuestions,live.length);assert.equal(config.requireAdultReviewSupport,true);
  assert.equal(config.bankVersion,'20260906-english-la01-la05');
  assert(html.indexOf('year1-maths-support.js')<html.indexOf('/quiz/assets/script.js'));
  const positions=[0,0,0];
  for(let i=0;i<live.length;i++){
   const q=live[i],s=expected[i];total++;
   assert.equal(q.question,s.question);assert.equal(q.audioPrompt,s.question);
   assert.equal(q.id,s.id.toLowerCase());
   assert(!/Why is “|clearest mix-up|Use this clue:|Which reason best supports the correct choice/.test(q.question));
   if(s.grading_mode){adult++;assert.equal(q.type,'self-check');assert.equal(q.gradingMode,'adult-review');assert.equal(q.modelAnswer,s.model_answer);assert(q.acceptanceNote&&q.responseInstructions);}
   else {assert.equal(q.correct,s.correct_index);assert.equal(q.answers[q.correct],s.answers[s.correct_index].text);positions[q.correct]++;}
  }
  assert(Math.max(...positions)-Math.min(...positions)<=1);
  for(const page of ['review','result']){
   const h=read(`${route}/${mode}/${page}/index.html`);assert.equal(h.match(/data-result-key="([^"]+)"/)[1],config.resultStorageKey);
   assert(h.indexOf('year1-maths-support.js')<h.indexOf(`/quiz/assets/separate-${page}.js`));
  }
 }
 for(const relative of ['index.html','practice/index.html','test/index.html','practice/review/index.html','test/review/index.html','practice/result/index.html','test/result/index.html']){
  const f=`${route}/${relative}`;
  for(const m of read(f).matchAll(/(?:href|src)="([^"]+)"/g)){
   const u=new URL(m[1],'https://skillrhub.com/'+f);if(u.origin!=='https://skillrhub.com')continue;
   assert(fs.existsSync(path.join(root,u.pathname)),f+': missing '+u.pathname);
  }
 }
}
const ctx={window:{},document:{getElementById:id=>id==='adultReviewAnswer'?{value:'My explanation'}:{checked:true}}};
vm.runInNewContext(read('quiz/assets/year1-maths-support.js'),ctx);
const support=ctx.window.SkillrYear1Maths,response=support.evaluateAdultResponse({modelAnswer:'Example answer'});
assert.equal(response.isCorrect,null);assert.equal(response.pendingReview,true);
assert.equal(support.summarise([{isCorrect:true},response],75).passed,false);
assert.equal(support.summarise([{isCorrect:true},{...response,isCorrect:true,pendingReview:false}],75).passed,true);
assert(read('quiz/assets/script-runtime-v115.js').includes('requireAdultReviewSupport'));
console.log(JSON.stringify({status:'PASS',questions:total,adultReviewTasks:adult,checks:'bank parity, counts, MCQ balance, links, result storage, adult-review pending semantics'}));
