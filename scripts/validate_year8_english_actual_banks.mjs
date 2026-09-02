import fs from 'node:fs';
import path from 'node:path';
const ROOT=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,'assets','year8-10-english-curriculum-focus.json'),'utf8'));
const CODES=manifest.years['8'];
const stages=['recognise','explain','discriminate','apply'];
const banned=/\b(A Year 8 student|teacher should|rubric|marking key|award \d+ marks?|criterion sheet|Independent check|Example \d+)\b/i;
const curriculumStem=/\b(curriculum descriptor|content description|elaboration says|according to the curriculum)\b/i;
let errors=[];let total=0;
const norm=s=>String(s||'').toLowerCase().replace(/[“”‘’'"`]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
for(const code of CODES){
 const f=path.join(ROOT,'assets','assessment-banks','year8','english',`${code.toLowerCase()}.json`);
 if(!fs.existsSync(f)){errors.push(`${code}: missing bank`);continue;}
 let items;try{items=JSON.parse(fs.readFileSync(f,'utf8'));}catch(e){errors.push(`${code}: invalid JSON`);continue;}
 const p=items.filter(x=>x.bank==='practice'),t=items.filter(x=>x.bank==='test'); total+=items.length;
 if(p.length!==40)errors.push(`${code}: practice ${p.length}`);if(t.length!==16)errors.push(`${code}: test ${t.length}`);
 for(let s=0;s<4;s++){const block=p.slice(s*10,s*10+10);if(block.length!==10||block.some(x=>x.stage!==stages[s]))errors.push(`${code}: stage block ${stages[s]} invalid`);}
 const ps=new Set(p.map(x=>norm(x.question))),ts=new Set(t.map(x=>norm(x.question)));
 if(ps.size!==p.length)errors.push(`${code}: duplicate practice stems`);if(ts.size!==t.length)errors.push(`${code}: duplicate test stems`);
 for(const q of ps)if(ts.has(q))errors.push(`${code}: Practice/Test overlap`);
 const practiceContext=['school podcast','community-news','library book-club','student council','science-expo','museum caption','local-sport','school newsletter','youth radio','bushwalking','Australian novel','documentary storyboard','class debate','community-festival','wildlife-centre','historical display','letter to council','school assembly','digital magazine','public-transport','theatre-program','coastal-care','short-story','media-literacy','local-history','school website','graphic-novel','charity campaign','sports-club','sustainability report','exhibition review','class anthology','youth forum','tourism information','spoken presentation','feature article','film-review','community survey','reading-journal','school production'];
 const testContext=['regional newspaper','independent book review','public-library','council youth','environmental campaign','cultural-festival','national-park','radio interview','digital news','theatre review','community-history','sports documentary','literary magazine','public-service','online museum','youth conference'];
 if(p.some(x=>testContext.some(c=>norm(x.question).includes(norm(c)))))errors.push(`${code}: test context leaked into practice`);
 if(t.some(x=>practiceContext.some(c=>norm(x.question).includes(norm(c)))))errors.push(`${code}: practice context leaked into test`);
 for(const x of items){
   const prefix=`${code} ${x.id||''}`;
   if(!x.question||!x.audio_prompt)errors.push(`${prefix}: missing stem/audio`);
   if(banned.test(`${x.question} ${x.explanation?.summary||''} ${x.explanation?.hint||''}`))errors.push(`${prefix}: banned template/teacher language`);
   if(curriculumStem.test(x.question))errors.push(`${prefix}: curriculum-facing stem`);
   if(!Array.isArray(x.answers)||x.answers.length!==4)errors.push(`${prefix}: expected 4 answers`);
   else{
     const correct=x.answers.filter(a=>a.is_correct);if(correct.length!==1)errors.push(`${prefix}: ${correct.length} correct answers`);
     if(x.correct_index<0||x.correct_index>3||!x.answers[x.correct_index]?.is_correct)errors.push(`${prefix}: incorrect correct_index`);
     if(new Set(x.answers.map(a=>norm(a.text))).size!==4)errors.push(`${prefix}: duplicate answer options`);
   }
   if(!x.explanation?.summary||!x.explanation?.hint)errors.push(`${prefix}: missing explanation teaching`);
   if(x.explanation?.hint && x.explanation.hint.length<45)errors.push(`${prefix}: hint too thin`);
   if(x.quality_schema!=='skillr-actual-v5')errors.push(`${prefix}: wrong quality schema`);
 }
}
if(total!==CODES.length*56)errors.push(`Total ${total}, expected ${CODES.length*56}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`PASS Year 8 English: ${CODES.length} codes, ${CODES.length*40} Practice, ${CODES.length*16} Test, ${total} total. Counts, stages, stems, contexts, answers, explanations and wording validated.`);
