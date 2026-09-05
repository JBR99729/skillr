import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const codes=['h01','i01','i02','i03','i04','i05','i06','u01','u02','u03'].map(s=>'ac9s2'+s);
const ids=new Set(), stems=new Set();
const norm=s=>s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
let total=0;
for(const code of codes){
  const items=JSON.parse(fs.readFileSync(path.join(root,'assets/assessment-banks/year2/science',code+'.json'),'utf8'));
  for(const bank of ['practice','test']){
    const selected=items.filter(q=>q.bank===bank);
    const expected=bank==='practice'?48:16;
    assert.equal(selected.length,expected,code+' '+bank);
    const route=path.join(root,'quiz/year-2/science',code,bank);
    const script=fs.readFileSync(path.join(route,'questions.js'),'utf8');
    const context={window:{}};vm.createContext(context);vm.runInContext(script,context,{timeout:1000});
    const live=context.window[bank==='practice'?'skillrPracticeQuestions':'skillrTestQuestions'];
    assert.equal(JSON.stringify(live),JSON.stringify(selected),'Live bank mismatch');
    if(bank==='practice')assert.equal(fs.readFileSync(path.join(route,'practice-questions.js'),'utf8'),script);
    const html=fs.readFileSync(path.join(route,'index.html'),'utf8');
    assert(html.includes(`/${code}/${bank}/questions.js?v=20260905-y2-science-reviewed`));
    assert(html.includes(`>${expected}</span><span class="summary-label">Question bank`));
    assert(html.includes('"maxQuestions":8') && html.includes('"questionCycle":true'));
    assert(!/\b(?:24|32|40|49)-question/.test(html),'Stale count '+code+' '+bank);
    const positions=[0,0,0];
    for(const q of selected){
      assert.equal(q.curriculumCode,code.toUpperCase());
      assert(q.id && !ids.has(q.id),'Repeated ID '+q.id);ids.add(q.id);
      assert(q.question.trim() && !stems.has(norm(q.question)),'Repeated stem '+q.id);stems.add(norm(q.question));
      assert(!/\b\w+ investigates\b|which answer shows the correct work|during a year 2 science activity/i.test(q.question));
      assert.equal(q.audioPrompt,q.question);
      assert.equal(q.answers.length,3);
      assert.equal(new Set(q.answers.map(norm)).size,3);
      assert(q.answers.every(a=>typeof a==='string' && a.trim()));
      assert(Number.isInteger(q.correct) && q.correct>=0 && q.correct<3);
      positions[q.correct]++;
      assert(q.explanation.trim());
      assert.equal(q.structuredExplanation.summary,q.explanation);
      total++;
    }
    assert(Math.max(...positions)-Math.min(...positions)<=1,'Unbalanced correct positions');
  }
}
assert.equal(total,640);
assert.equal(JSON.parse(fs.readFileSync(path.join(root,'ai-index.json'),'utf8')).year2_science_quality_note.skills,10);
console.log(JSON.stringify({status:'PASS',skills:10,practice:480,test:160,total,uniqueIds:ids.size,uniqueNormalisedStems:stems.size,checks:['schema','answer indexes','balanced answer positions','explanations','live JSON equivalence','practice aliases','8-question rotation','48/16 page counts','no exact practice/test overlap','no name-swapped investigation prefixes']}));
