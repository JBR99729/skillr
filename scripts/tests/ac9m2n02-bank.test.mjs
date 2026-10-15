import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
const root=new URL('../../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const internal='docs/question-bank-reviews/2026-10-15-ac9m2n02/';
const candidate=JSON.parse(read(internal+'candidate.items.json'));
const approval=JSON.parse(read(internal+'teacher-approval.json'));
function bank(mode){const context={window:{}};vm.runInNewContext(read('quiz/year-2/math/ac9m2n02/'+mode+'/questions.js'),context);return JSON.parse(JSON.stringify(context.window.quizQuestions));}
test('only the exact independently approved candidate is integrated',()=>{
 assert.equal(crypto.createHash('sha256').update(read(internal+'candidate.items.json')).digest('hex'),approval.candidateSHA256);
 assert.equal(approval.approved,true);assert.equal(approval.reviewedItems,46);
 const live=[...bank('practice'),...bank('test')];
 assert.equal(live.length,46);assert.equal(new Set(live.map(q=>q.id)).size,46);
 for(const [i,q] of live.entries()){
  const source=candidate.items[i];assert.equal(q.id,source.id.toLowerCase());assert.equal(q.question,source.question);assert.deepEqual(q.correct,source.correct);assert.equal(q.explanation,source.explanation);
  if(q.type==='self-check'){assert.equal(q.gradingMode,'adult-review');assert.equal(q.acceptanceNote,source.acceptanceNote);}
 }
});
test('three ten-item practice focuses and separate higher-count Test remain intact',()=>{
 const practice=bank('practice');assert.equal(practice.length,30);assert.equal(bank('test').length,16);
 for(const focus of ['PN','EX','ZR'])assert.equal(practice.filter(q=>q.focus===focus).length,10);
 assert.equal(new Set(practice.map(q=>q.type)).size,4);
 assert.equal([...practice,...bank('test')].filter(q=>q.gradingMode==='adult-review').length,16);
});
test('every countable model and blank agrees with the approved visual/answer specification',()=>{
 const live=[...bank('practice'),...bank('test')];
 for(const [i,q] of live.entries()){
  const spec=candidate.items[i].visualSpec;
  if(spec.kind==='blocks')for(const [unit,key] of [['hundred','hundreds'],['ten','tens'],['one','ones']])assert.equal((q.visualHtml.match(new RegExp('data-unit="'+unit+'"','g'))||[]).length,spec[key],q.id);
  assert.ok(!q.visualHtml.includes('No pieces'),q.id);
  if(q.type==='fill-blank'){assert.equal(q.template.split('{{blank}}').length-1,q.acceptedAnswers.length);assert.equal(q.acceptedAnswers.length,q.correct.length);}
  assert.ok(!/IXL|Khan|research-|provenance/i.test([q.question,q.explanation,q.visualHtml,q.modelAnswer,q.acceptanceNote].join(' ')),q.id);
 }
});
test('authored preparation and result/review storage cannot silently disappear or mix versions',()=>{
 for(const mode of ['practice','test']){
  const base='quiz/year-2/math/ac9m2n02/'+mode+'/';const html=read(base+'index.html');
  assert.equal((html.match(/data-skillr-authored-preparation="true"/g)||[]).length,1);
  assert.equal((html.match(/<section /g)||[]).length,(html.match(/<\/section>/g)||[]).length);
  assert.equal((html.match(/class="n02-unit"/g)||[]).length,6);
  assert.match(html,/<details><summary>Worked examples and learning support/);assert.doesNotMatch(html,/<details\s+open/);
  const cfg=JSON.parse(html.match(/window.quizConfig=(\{.*?\});/)[1]);
  assert.equal(cfg.authoredAttemptCount,mode==='practice'?10:16);assert.equal(cfg.requireAdultReviewSupport,true);assert.equal(cfg.preserveQuestionVisuals,true);
  for(const suffix of ['result','review'])assert.ok(read(base+suffix+'/index.html').includes('data-result-key="'+cfg.resultStorageKey+'"'));
  assert.equal(read(base+'review/index.html').match(/separate-review\.js\?([^"]+)/)[1],'v=20261015-n02-visuals');
  const review=read(base+'review/index.html');
  assert.ok(review.indexOf('/assets/progress-store.js?v=3')>0);
  assert.ok(review.indexOf('/assets/progress-store.js?v=3')<review.indexOf('/quiz/assets/year1-maths-support.js'));
  assert.ok(review.indexOf('/assets/progress-store.js?v=3')<review.indexOf('/quiz/assets/separate-review.js'));
 }
});

test('legacy Year 2 quick-read honours the explicit authored-preparation contract',()=>{
 assert.match(read('assets/year2-maths-practice-quick-read.js'),/if \(card.querySelector\('\[data-skillr-authored-preparation="true"\]'\)\) return true;/);
});
