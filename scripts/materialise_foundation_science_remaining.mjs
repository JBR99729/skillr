import fs from'node:fs';import path from'node:path';
import * as sfi03 from'./foundation_science_actual/ac9sfi03_authored.mjs';
import * as sfi04 from'./foundation_science_actual/ac9sfi04_authored.mjs';
import * as sfi05 from'./foundation_science_actual/ac9sfi05_authored.mjs';
import * as sfu01 from'./foundation_science_actual/ac9sfu01_authored.mjs';
import * as sfu02 from'./foundation_science_actual/ac9sfu02_authored.mjs';
import * as sfu03 from'./foundation_science_actual/ac9sfu03_authored.mjs';
const root=process.cwd();
const banks={AC9SFI03:[sfi03,'record observations and identify patterns'],AC9SFI04:[sfi04,'compare observations with predictions'],AC9SFI05:[sfi05,'share science questions predictions observations and ideas'],AC9SFU01:[sfu01,'observe and group plant and animal external features'],AC9SFU02:[sfu02,'describe how size shape and material influence movement'],AC9SFU03:[sfu03,'recognise objects materials and observable properties']};
const stages=['recognise','explain','discriminate','apply'],norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function rotateAnswers(a,c,shift){const out=[];for(let j=0;j<a.length;j++)out.push(a[(j-shift+4)%4]);return[out,(c+shift)%4]}
for(const [code,[src,skill]] of Object.entries(banks)){
 const {practice,test}=src;if(practice.length!==40||test.length!==16)throw Error(`${code} counts ${practice.length}/${test.length}`);
 for(let b=0;b<4;b++)for(let i=b*10;i<b*10+10;i++)if(practice[i][0]!==stages[b])throw Error(`${code} stage ${i}`);
 const seen=new Set();
 function make(r,i,bank){let stage,q,a,c,s,h,v;if(bank==='practice')[stage,q,a,c,s,h,v]=r;else[q,a,c,s,h,v]=r;const nq=norm(q);if(seen.has(nq))throw Error(`${code} duplicate ${q}`);seen.add(nq);if(!Array.isArray(a)||a.length!==4||new Set(a).size!==4||!Number.isInteger(c)||c<0||c>3||typeof a[c]!=='string')throw Error(`${code} answer integrity ${i}`);[a,c]=rotateAnswers(a,c,(i+(bank==='test'?2:0))%4);return{id:`${code.toLowerCase()}-${bank==='practice'?'p':'t'}-${String(i+1).padStart(3,'0')}`,curriculumCode:code,bank,skill,question:q,explanation:s+' Hint: '+h,structuredExplanation:{summary:s,hint:h},printable:true,type:'single',answers:a,correct:c,visual:v||'',...(stage?{stage}:{}),difficulty:bank==='test'?3:i<10?1:i<30?2:3,difficultyTier:bank==='test'?'independent':stage,sequencePriority:i+1,qualitySchema:'skillr-actual-v6'} }
 const P=practice.map((r,i)=>make(r,i,'practice')),T=test.map((r,i)=>make(r,i,'test'));const ps=new Set(P.map(x=>norm(x.question)));if(T.some(x=>ps.has(norm(x.question))))throw Error(`${code} practice/test overlap`);
 const pos=[0,0,0,0];[...P,...T].forEach(x=>pos[x.correct]++);if(Math.min(...pos)<10||Math.max(...pos)-Math.min(...pos)>5)throw Error(`${code} answer-position imbalance ${pos}`);
 const base=path.join(root,'quiz/grade-k/science',code.toLowerCase());fs.writeFileSync(path.join(base,'practice/questions.js'),'"use strict";\nwindow.skillrPracticeQuestions = '+JSON.stringify(P,null,2)+';\n');fs.writeFileSync(path.join(base,'test/questions.js'),'"use strict";\nwindow.skillrExamQuestions = '+JSON.stringify(T,null,2)+';\n');console.log(code,'PASS',P.length,T.length,pos.join('/'));
}