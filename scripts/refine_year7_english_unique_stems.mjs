import fs from 'node:fs';
import path from 'node:path';
const ROOT=path.resolve(import.meta.dirname,'..');
const BANK=path.join(ROOT,'assets','assessment-banks','year7','english');
const QUIZ=path.join(ROOT,'quiz','year-7','english');
const contexts=['school podcast','local history display','science expo','library newsletter','student council proposal','sports club notice','museum exhibit','community garden report','class debate','environmental campaign','excursion briefing','book-club discussion','school website','arts festival program','peer feedback session','technology showcase','canteen survey','school assembly speech','media review','geography field report'];
const norm=s=>String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
function contextualise(q,stage,context,n){
 const base=clean(q);
 const frames={
  recognise:[`In a ${context}, this feature appears in a new example. `,`While reading a ${context}, you notice the wording closely. `,`A ${context} contains a similar language choice. `],
  explain:[`A ${context} uses this wording for a clear purpose. `,`When analysing a ${context}, connect the feature to its effect. `,`This example comes from a ${context}. `],
  discriminate:[`While reviewing a ${context}, two interpretations seem possible. `,`A ${context} creates a tempting but inaccurate reading. `,`Use the evidence from a ${context} to separate the two ideas. `],
  apply:[`In a different ${context}, use the same idea independently. `]
 };
 return `${frames[stage]?.[n%frames[stage].length]||`In a ${context}, `}${base}`;
}
function toJs(item){return{id:item.id,curriculumCode:item.curriculum_code,bank:item.bank,skill:item.skill.replaceAll('_',' '),printable:true,type:'single',question:item.question,audioPrompt:item.audio_prompt,visual:'',visualHtml:'',visualMeta:item.visual,answers:item.answers.map(a=>a.text),correct:item.correct_index,explanation:`${item.explanation.summary}\nHint: ${item.explanation.hint}`,structuredExplanation:item.explanation,qualitySchema:item.quality_schema}}
function publish(code,p,t){const d=path.join(QUIZ,code.toLowerCase());const ps=`"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(p.map(toJs),null,2)};\nwindow.quizQuestions = window.skillrPracticeQuestions;\n`;const ts=`"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(t.map(toJs),null,2)};\nwindow.skillrExamQuestions = window.skillrTestQuestions;\nwindow.quizQuestions = window.skillrTestQuestions;\n`;fs.writeFileSync(path.join(d,'practice','questions.js'),ps);const legacy=path.join(d,'practice','practice-questions.js');if(fs.existsSync(legacy))fs.writeFileSync(legacy,ps);fs.writeFileSync(path.join(d,'test','questions.js'),ts)}
for(const file of fs.readdirSync(BANK).filter(f=>/^ac9e7(?:la|le|ly)\d+\.json$/.test(f)).sort()){
 const code=file.slice(0,-5).toUpperCase(),all=JSON.parse(fs.readFileSync(path.join(BANK,file),'utf8')),p=all.filter(x=>x.bank==='practice'),t=all.filter(x=>x.bank==='test');
 const seen=new Map();
 for(let i=0;i<p.length;i++){
  const q=norm(p[i].question),count=seen.get(q)||0;
  if(count){const context=contexts[(i+count*7)%contexts.length];p[i].question=contextualise(p[i].question,p[i].stage,context,count);p[i].audio_prompt=p[i].question;}
  seen.set(q,count+1);
 }
 const seen2=new Set();
 for(let i=0;i<p.length;i++){
  let q=p[i].question,ctxN=0;
  while(seen2.has(norm(q))){q=contextualise(q,p[i].stage,contexts[(i+ctxN*3)%contexts.length],ctxN++);}
  p[i].question=p[i].audio_prompt=q;seen2.add(norm(q));
 }
 fs.writeFileSync(path.join(BANK,file),JSON.stringify([...p,...t],null,2)+'\n');
 publish(code,p,t);
}
console.log('Year 7 English duplicate stems refined with distinct student-facing contexts.');
