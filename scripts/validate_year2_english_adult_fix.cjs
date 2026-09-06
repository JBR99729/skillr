const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const status=/^(Adult review required|Response not yet reviewed|Revise with an adult)$/;
let total=0,adult=0;
for(let n=1;n<=5;n++)for(const bank of ['practice','test']){
 const route=`quiz/year-2/english/ac9e2la0${n}/${bank}/`,ctx={window:{}};vm.runInNewContext(read(route+'questions.js'),ctx);
 const src=JSON.parse(read(`assets/assessment-banks/year2/english/ac9e2la0${n}.json`)).filter(q=>q.bank===bank),qs=ctx.window.quizQuestions;
 assert.equal(qs.length,src.length);assert.equal(qs.length,bank==='practice'?24:16);
 for(let i=0;i<qs.length;i++){
 const q=qs[i],s=src[i];total++;assert.equal(q.id,s.id.toLowerCase());assert.equal(q.question,s.question);assert(!q.answers.some(a=>status.test(a)));
 if(s.grading_mode==='adult-review'){
 adult++;assert.equal(q.type,'self-check');assert.equal(q.gradingMode,'adult-review');assert.equal(q.answers.length,0);assert.equal(q.acceptanceNote,s.explanation.summary);
 const elements={};const document={createElement:tag=>({tag,children:[],append(...v){this.children.push(...v)},addEventListener(){}}),getElementById:id=>elements[id]};
 const supportCtx={window:{},document};vm.runInNewContext(read('quiz/assets/year1-maths-support.js'),supportCtx);const support=supportCtx.window.SkillrYear1Maths;
 const container={append(...children){for(const c of children){if(c.id)elements[c.id]=c;for(const nested of c.children||[])if(nested.id)elements[nested.id]=nested;}}},submit={disabled:true};
 support.renderAdultResponse(q,container,submit);assert.equal(submit.textContent,'Save response');assert.equal(elements.adultReviewAnswer.tag,'textarea');elements.adultReviewAnswer.value='Learner response';elements.adultReviewPaper.checked=false;
 const result=support.evaluateAdultResponse(q);assert.equal(result.isCorrect,null);assert.equal(result.pendingReview,true);assert.equal(support.summarise([{isCorrect:true},result],75).passed,false);
 }else{assert.equal(q.correct,s.correct_index);assert.equal(q.answers[q.correct],s.answers[s.correct_index].text)}
 }
 const html=read(route+'index.html');assert(html.includes('requireAdultReviewSupport":true'));assert(html.includes('data-adult-review-note'));assert(html.includes('20260907-english-adult-fix'));
}
assert.equal(adult,20);console.log({status:'PASS',total,adult,checks:'source parity, no status answers, adult response renderer, no automatic credit or pass'});
