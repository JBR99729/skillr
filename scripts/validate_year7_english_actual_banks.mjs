// Year 7 actual-bank validation: counts, progression, context separation and answer integrity.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT=path.resolve(import.meta.dirname,'..');
const DIR=path.join(ROOT,'assets','assessment-banks','year7','english');
const cap={units:{},order:[]},box={window:{SkillrYear7Register(s,u,o){if(s==='english'){Object.assign(cap.units,u);cap.order.push(...o)}}}};
vm.createContext(box);
for(const f of ['assets/year7-english-data-la.js','assets/year7-english-data-le.js','assets/year7-english-data-ly.js']) vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),box,{filename:f});
const codes=[...new Set(cap.order)];
const errors=[];
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
const norm=s=>clean(s).toLowerCase();
const banned=/\b(?:a year 7 student|teacher should|teacher-facing|rubric|marking key|award \d+ marks?|curriculum descriptor|content descriptor|independent check|apply the skill to a fresh situation|recognise the feature in a fresh context)\b/i;
const practiceContexts=['school podcast','local history display','science expo','library newsletter','student council proposal','sports club notice','museum exhibit','community garden report','class debate','environmental campaign','excursion briefing','book-club discussion','school website','arts festival program','peer feedback session','technology showcase','canteen survey','school assembly speech','media review','geography field report'];
const testContexts=['youth radio interview','coastal restoration article','public transport campaign','regional museum audio guide','wildlife rescue webpage','local council consultation','heritage trail brochure','community theatre review','water-quality report','regional sports commentary','astronomy exhibition','farmers market profile','emergency-preparedness video','cycling safety infographic','river-health podcast','town festival website'];
if(codes.length!==24) errors.push(`expected 24 curriculum codes, found ${codes.length}`);
for(const code of codes){
 const file=path.join(DIR,`${code.toLowerCase()}.json`);
 if(!fs.existsSync(file)){errors.push(`${code}: bank missing`);continue;}
 const all=JSON.parse(fs.readFileSync(file,'utf8'));
 const p=all.filter(x=>x.bank==='practice'),t=all.filter(x=>x.bank==='test');
 if(p.length!==40)errors.push(`${code}: ${p.length} practice`);
 if(t.length!==16)errors.push(`${code}: ${t.length} test`);
 for(let s=0;s<4;s++){
  const expected=['recognise','explain','discriminate','apply'][s];
  const chunk=p.slice(s*10,s*10+10);
  if(chunk.length!==10||chunk.some(x=>x.stage!==expected))errors.push(`${code}: bad ${expected} stage`);
 }
 const ps=p.map(x=>norm(x.question)),ts=t.map(x=>norm(x.question));
 if(new Set(ps).size!==ps.length)errors.push(`${code}: duplicate practice stems`);
 if(new Set(ts).size!==ts.length)errors.push(`${code}: duplicate test stems`);
 const P=new Set(ps);if(ts.some(q=>P.has(q)))errors.push(`${code}: Practice/Test stem overlap`);
 for(const x of all){
  if(x.curriculum_code!==code)errors.push(`${x.id}: curriculum code mismatch`);
  if(x.year_level!=='Year 7'||x.subject!=='english')errors.push(`${x.id}: metadata mismatch`);
  if(!clean(x.question)||clean(x.question).length<24)errors.push(`${x.id}: weak stem`);
  if(banned.test(`${x.question} ${x.explanation?.summary||''} ${x.explanation?.hint||''}`))errors.push(`${x.id}: banned/template language`);
  if(!Array.isArray(x.answers)||x.answers.length!==4)errors.push(`${x.id}: expected 4 options`);
  const texts=(x.answers||[]).map(a=>norm(a.text));if(new Set(texts).size!==texts.length)errors.push(`${x.id}: duplicate answer options`);
  const good=(x.answers||[]).map((a,i)=>a.is_correct?i:-1).filter(i=>i>=0);
  if(good.length!==1)errors.push(`${x.id}: correct-answer count ${good.length}`);
  if(!Number.isInteger(x.correct_index)||good[0]!==x.correct_index)errors.push(`${x.id}: correct_index mismatch`);
  if(!clean(x.explanation?.summary)||!clean(x.explanation?.hint))errors.push(`${x.id}: explanation incomplete`);
 }
 if(p.slice(30).some(x=>testContexts.some(c=>norm(x.question).includes(c))))errors.push(`${code}: Test context leaked into Practice`);
 if(t.some(x=>practiceContexts.some(c=>norm(x.question).includes(c))))errors.push(`${code}: Practice context leaked into Test`);
 if(t.some(x=>!testContexts.some(c=>norm(x.question).includes(c))))errors.push(`${code}: Test question missing fresh Test context`);
 const qdir=path.join(ROOT,'quiz','year-7','english',code.toLowerCase());
 for(const f of [path.join(qdir,'practice','questions.js'),path.join(qdir,'test','questions.js')]) if(!fs.existsSync(f))errors.push(`${code}: missing published ${path.relative(ROOT,f)}`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`PASS Year 7 English actual banks: 24 codes, 960 Practice, 384 Test, 1,344 total; stage progression, unique stems, separate Test contexts, answer integrity, student-facing language and published quiz banks verified.`);
