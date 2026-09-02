import fs from 'node:fs';
import path from 'node:path';
import {practice,test} from './foundation_science_actual/ac9sfh01_authored.mjs';
const code='AC9SFH01',root=process.cwd(),base=path.join(root,'quiz','grade-k','science','ac9sfh01');
if(practice.length!==40||test.length!==16) throw Error(`counts ${practice.length}/${test.length}`);
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stems=new Set();
const rotations=[0,2,1,3,1,0,3,2];
function build(row,i,bank){
 let stage,q,answers,correct,summary,hint;
 if(bank==='practice') [stage,q,answers,correct,summary,hint]=row; else [q,answers,correct,summary,hint]=row;
 const key=norm(q); if(stems.has(key)) throw Error('duplicate stem: '+q); stems.add(key);
 if(answers.length!==4||new Set(answers.map(norm)).size!==4||correct<0||correct>3) throw Error('answer integrity: '+q);
 const r=rotations[i%rotations.length];
 const shifted=answers.map((_,j)=>answers[(j+r)%4]);
 const newCorrect=(correct-r+4)%4;
 return {id:`ac9sfh01-${bank==='practice'?'p':'t'}-${String(i+1).padStart(3,'0')}`,curriculumCode:code,bank,skill:'observing, questioning and using evidence to learn about the natural world',question:q,audioPrompt:q,explanation:`${summary} Hint: ${hint}`,structuredExplanation:{summary,hint},printable:true,type:'single',answers:shifted,correct:newCorrect,visual:'',...(stage?{stage}:{}),difficulty:bank==='test'?3:i<10?1:i<30?2:3,difficultyTier:bank==='test'?'independent':stage,sequencePriority:i+1,qualitySchema:'skillr-actual-v1'};
}
const P=practice.map((r,i)=>build(r,i,'practice')),T=test.map((r,i)=>build(r,i,'test'));
const pset=new Set(P.map(x=>norm(x.question))); if(T.some(x=>pset.has(norm(x.question)))) throw Error('practice/test overlap');
const expected=['recognise','explain','discriminate','apply'];
for(let b=0;b<4;b++) for(let i=b*10;i<(b+1)*10;i++) if(P[i].stage!==expected[b]) throw Error('stage progression');
const positions=[...P,...T].reduce((a,x)=>(a[x.correct]++,a),[0,0,0,0]); if(Math.min(...positions)<8) throw Error('answer-position imbalance '+positions);
fs.writeFileSync(path.join(base,'practice','questions.js'),'"use strict";\nwindow.skillrPracticeQuestions = '+JSON.stringify(P,null,2)+';\n');
fs.writeFileSync(path.join(base,'test','questions.js'),'"use strict";\nwindow.skillrExamQuestions = '+JSON.stringify(T,null,2)+';\n');
console.log('AC9SFH01 PASS', {practice:P.length,test:T.length,positions});