import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const code='ac9e10la03';
const bankPath=path.join(root,'assets','assessment-banks','year10','english',`${code}.json`);
const bank=JSON.parse(fs.readFileSync(bankPath,'utf8'));
const practice=bank.filter(q=>q.bank==='practice');
const test=bank.filter(q=>q.bank==='test');
if(practice.length!==40||test.length!==16) throw new Error(`AC9E10LA03 count mismatch ${practice.length}+${test.length}`);
const toLive=q=>({
 id:q.id,curriculumCode:q.curriculum_code,bank:q.bank,skill:q.skill,printable:true,type:'single',question:q.question,audioPrompt:q.audio_prompt,
 visual:'',visualHtml:'',visualMeta:q.visual,answers:q.answers.map(a=>a.text),correct:q.correct_index,
 explanation:`${q.explanation.summary}\nHint: ${q.explanation.hint}`,structuredExplanation:q.explanation,qualitySchema:q.quality_schema,
 ...(q.stage?{stage:q.stage}:{}),difficulty:q.difficulty,difficultyTier:q.difficulty_tier,sequencePriority:q.sequence_priority
});
const p=`"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(practice.map(toLive),null,2)};\n`;
const t=`"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(test.map(toLive),null,2)};\n`;
const base=path.join(root,'quiz','year-10','english',code);
fs.writeFileSync(path.join(base,'practice','questions.js'),p);
fs.writeFileSync(path.join(base,'practice','practice-questions.js'),p);
fs.writeFileSync(path.join(base,'test','questions.js'),t);
const norm=s=>s.toLowerCase().replace(/[“”‘’'".,!?;:—–()-]/g,' ').replace(/\s+/g,' ').trim();
const stems=new Set();
for(const q of bank){
 if(!q.question||q.question!==q.audio_prompt) throw new Error(`${q.id}: prompt integrity`);
 if(/A Year 10 student|curriculum descriptor|teacher|rubric|learning intention|success criteria/i.test(q.question)) throw new Error(`${q.id}: banned wording`);
 const n=norm(q.question); if(stems.has(n)) throw new Error(`${q.id}: duplicate stem`); stems.add(n);
 if(q.answers.length!==4||q.answers.filter(a=>a.is_correct).length!==1||!q.answers[q.correct_index]?.is_correct) throw new Error(`${q.id}: answer integrity`);
}
const expected=[...Array(10).fill('recognise'),...Array(10).fill('explain'),...Array(10).fill('discriminate'),...Array(10).fill('apply')];
practice.forEach((q,i)=>{if(q.stage!==expected[i])throw new Error(`${q.id}: stage progression`)});
console.log('AC9E10LA03 PASS: 40 practice / 16 test; unique stems, answer integrity, stage progression, live parity.');
