import fs from'node:fs';import path from'node:path';
import * as h01 from'./year3_science_actual/ac9s3h01_authored.mjs';
import * as h02 from'./year3_science_actual/ac9s3h02_authored.mjs';
import * as i01 from'./year3_science_actual/ac9s3i01_authored.mjs';
import * as i01t from'./year3_science_actual/ac9s3i01_test_authored.mjs';
import * as i02 from'./year3_science_actual/ac9s3i02_authored.mjs';
import * as i03 from'./year3_science_actual/ac9s3i03_authored.mjs';
import * as i04 from'./year3_science_actual/ac9s3i04_authored.mjs';
import * as i05 from'./year3_science_actual/ac9s3i05_authored.mjs';
import * as i06 from'./year3_science_actual/ac9s3i06_authored.mjs';
import * as u01 from'./year3_science_actual/ac9s3u01_authored.mjs';
import * as u02 from'./year3_science_actual/ac9s3u02_authored.mjs';
import * as u03 from'./year3_science_actual/ac9s3u03_authored.mjs';
import * as u04 from'./year3_science_actual/ac9s3u04_authored.mjs';
const root=process.cwd(),stages=['recognise','explain','discriminate','apply'];
const i01bank={practice:i01.practice,test:i01t.test};
const banks={AC9S3H01:[h01,'using data as evidence for scientific explanations'],AC9S3H02:[h02,'using scientific explanations to meet needs and solve problems'],AC9S3I01:[i01bank,'questions about patterns and evidence-based predictions'],AC9S3I02:[i02,'planning fair and safe investigations'],AC9S3I03:[i03,'observing, measuring and recording accurately'],AC9S3I04:[i04,'tables, graphs and scientific models'],AC9S3I05:[i05,'evaluating investigations and drawing conclusions'],AC9S3I06:[i06,'communicating scientific findings'],AC9S3U01:[u01,'living, non-living things and life cycles'],AC9S3U02:[u02,'soils, rocks, minerals and Earth resources'],AC9S3U03:[u03,'heat energy and temperature change'],AC9S3U04:[u04,'solids, liquids and changes of state']};
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function rotate(a,c,shift){shift%=4;return[a.map((_,j)=>a[(j+shift)%4]),(c-shift+4)%4]}
let total=0;
for(const [code,[mod,skill]] of Object.entries(banks)){
 const {practice,test}=mod;if(practice.length!==40||test.length!==16)throw Error(`${code} counts ${practice.length}/${test.length}`);
 for(let b=0;b<4;b++)for(let i=b*10;i<b*10+10;i++)if(practice[i][0]!==stages[b])throw Error(`${code} stage ${i+1}`);
 const seen=new Set();
 function make(r,i,bank){let stage,q,a,c,s,h;if(bank==='practice')[stage,q,a,c,s,h]=r;else[q,a,c,s,h]=r;if(!q||seen.has(norm(q)))throw Error(`${code} duplicate ${q}`);seen.add(norm(q));if(!Array.isArray(a)||a.length!==4||new Set(a.map(norm)).size!==4||c<0||c>3)throw Error(`${code} answer integrity ${i+1}`);[a,c]=rotate(a,c,i+(bank==='test'?2:0));return{id:`${code.toLowerCase()}-${bank==='practice'?'p':'t'}-${String(i+1).padStart(3,'0')}`,subject:'science',year_level:'Year 3',curriculum_code:code,curriculumCode:code,bank,skill,question:q,audio_prompt:q,audioPrompt:q,visual:{type:'none',alt_text:''},visualHtml:'',answers:a.map((text,j)=>({text,is_correct:j===c})),answer_texts:a,correct_index:c,correct:c,explanation:{summary:s,hint:h},structuredExplanation:{summary:s,hint:h},...(stage?{stage}:{}),difficulty:bank==='test'?3:i<10?1:i<30?2:3,difficulty_tier:bank==='test'?'independent':stage,difficultyTier:bank==='test'?'independent':stage,sequence_priority:i+1,sequencePriority:i+1,quality_schema:'skillr-actual-v6',qualitySchema:'skillr-actual-v6',printable:true,type:'single'}}
 const P=practice.map((r,i)=>make(r,i,'practice')),T=test.map((r,i)=>make(r,i,'test'));const ps=new Set(P.map(x=>norm(x.question)));if(T.some(x=>ps.has(norm(x.question))))throw Error(`${code} practice/test overlap`);
 const pos=[0,0,0,0];[...P,...T].forEach(x=>pos[x.correct]++);if(pos.some(n=>n<10))throw Error(`${code} answer position imbalance ${pos}`);
 const assetDir=path.join(root,'assets/assessment-banks/year3/science');fs.mkdirSync(assetDir,{recursive:true});fs.writeFileSync(path.join(assetDir,code.toLowerCase()+'.json'),JSON.stringify([...P,...T],null,2)+'\n');
 const base=path.join(root,'quiz/year-3/science',code.toLowerCase());fs.mkdirSync(path.join(base,'practice'),{recursive:true});fs.mkdirSync(path.join(base,'test'),{recursive:true});const live=x=>({id:x.id,curriculumCode:code,bank:x.bank,skill:x.skill,printable:true,type:'single',question:x.question,audioPrompt:x.audioPrompt,visual:'',visualHtml:'',visualMeta:x.visual,answers:x.answer_texts,correct:x.correct,explanation:`${x.explanation.summary}\nHint: ${x.explanation.hint}`,structuredExplanation:x.structuredExplanation,...(x.stage?{stage:x.stage}:{}),difficulty:x.difficulty,difficultyTier:x.difficultyTier,sequencePriority:x.sequencePriority,qualitySchema:x.qualitySchema});
 const pt='"use strict";\nwindow.skillrPracticeQuestions = '+JSON.stringify(P.map(live),null,2)+';\n',tt='"use strict";\nwindow.skillrTestQuestions = '+JSON.stringify(T.map(live),null,2)+';\n';fs.writeFileSync(path.join(base,'practice/questions.js'),pt);fs.writeFileSync(path.join(base,'practice/practice-questions.js'),pt);fs.writeFileSync(path.join(base,'test/questions.js'),tt);total+=P.length+T.length;console.log(code,'PASS',P.length,T.length,'positions',pos.join('/'));
}
if(total!==672)throw Error(`total ${total}`);console.log('YEAR 3 SCIENCE PASS 12 codes 672 questions');