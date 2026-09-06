import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { extraA } from './year2_science_actual/extensions-a.mjs';
import { extraB } from './year2_science_actual/extensions-b.mjs';

const ROOT=process.cwd();
const files=['assets/year2-science-authored-banks.js','assets/year2-science-authored-banks-batch2.js','assets/year2-science-authored-banks-batch3.js','assets/year2-science-authored-banks-batch4.js'];
const cx={window:{}};vm.createContext(cx);for(const f of files)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),cx,{filename:f});
const banks=cx.window.SkillrYear2ScienceBanks;const extras={...extraA,...extraB};
const codes=['AC9S2H01','AC9S2I01','AC9S2I02','AC9S2I03','AC9S2I04','AC9S2I05','AC9S2I06','AC9S2U01','AC9S2U02','AC9S2U03'];
const skills={AC9S2H01:'science in daily life and evidence-based predictions',AC9S2I01:'questions and reasoned predictions',AC9S2I02:'safe and fair investigation planning',AC9S2I03:'observing, measuring and recording',AC9S2I04:'sorting and representing data',AC9S2I05:'comparing predictions, results and investigation evidence',AC9S2I06:'communicating science clearly',AC9S2U01:'Earth, space and observable sky patterns',AC9S2U02:'sound produced by vibrations',AC9S2U03:'physical changes to materials'};
const stages=['recognise','explain','discriminate','apply'];
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function direct32(code){const s=banks[code];const base=(items,n)=>[...items.slice(0,n*3).filter((_,i)=>i%3===0),...items.slice(n*3)];return [...base(s.practice,9),...base(s.test,4),...base(s.quiz,16)].map(x=>({q:x.question,a:x.answers,c:x.correct??0,e:x.explanation,h:'Use the observations and science idea in the question.'}));}
function rotate(a,c,shift){const n=a.length,out=a.map((_,j)=>a[(j+shift)%n]);return[out,(c-shift+n)%n]}
function cleanRow(r){if(Array.isArray(r))return{q:r[0],a:r[1],c:r[2]??0,e:r[3],h:r[4]};return{...r}}
function make(code,row,i,bank,stage){row=cleanRow(row);let a=[...row.a],c=row.c??0;if(a.length!==4||new Set(a.map(norm)).size!==4)throw Error(`${code} answer integrity ${row.q}`);[a,c]=rotate(a,c,(i+(bank==='test'?2:0))%4);return{id:`${code.toLowerCase()}-${bank==='practice'?'p':'t'}-${String(i+1).padStart(3,'0')}`,curriculumCode:code,bank,skill:skills[code],printable:true,type:'single',question:row.q,audioPrompt:row.q,visual:'',answers:a,correct:c,explanation:`${row.e}\nHint: ${row.h}`,structuredExplanation:{summary:row.e,hint:row.h},...(stage?{stage}:{}),difficulty:bank==='test'?3:i<10?1:i<30?2:3,difficultyTier:bank==='test'?'independent':stage,sequencePriority:i+1,qualitySchema:'skillr-actual-v6'};}
function distinctExtensions(code,d,rows,bank){const seen=new Set(d.map(r=>norm(r.q)));return rows.map((raw,i)=>{const r=cleanRow(raw);if(seen.has(norm(r.q))){const lead=bank==='practice'?'During a Year 2 science activity, ':'In a new Year 2 investigation, ';r.q=lead+r.q.charAt(0).toLowerCase()+r.q.slice(1);}if(seen.has(norm(r.q)))r.q=`${r.q.replace(/\?$/,'')} — choose the best scientific answer.`;if(seen.has(norm(r.q)))throw Error(`${code} unresolved extension collision ${r.q}`);seen.add(norm(r.q));return r;});}
for(const code of codes){const d=direct32(code);if(d.length!==32)throw Error(`${code} direct count ${d.length}`);const x=extras[code];if(!x||x.practice.length!==8||x.test.length!==16)throw Error(`${code} extension counts`);const ep=distinctExtensions(code,d,x.practice,'practice');const rawP=[...d,...ep];const rawT=distinctExtensions(code,rawP,x.test,'test');const seen=new Set();for(const r of [...rawP,...rawT]){const q=norm(cleanRow(r).q);if(seen.has(q))throw Error(`${code} duplicate ${q}`);seen.add(q)}
 const P=rawP.map((r,i)=>make(code,r,i,'practice',stages[Math.floor(i/10)]));const T=rawT.map((r,i)=>make(code,r,i,'test'));
 for(let b=0;b<4;b++)for(let i=b*10;i<b*10+10;i++)if(P[i].stage!==stages[b])throw Error(`${code} stage progression`);
 const ps=new Set(P.map(x=>norm(x.question)));if(T.some(x=>ps.has(norm(x.question))))throw Error(`${code} overlap`);
 const pos=[0,0,0,0];for(const q of [...P,...T])pos[q.correct]++;if(pos.some(n=>n<10))throw Error(`${code} answer position imbalance ${pos}`);
 const base=path.join(ROOT,'quiz/year-2/science',code.toLowerCase());const pj='"use strict";\nwindow.skillrPracticeQuestions = '+JSON.stringify(P,null,2)+';\n';const tj='"use strict";\nwindow.skillrExamQuestions = '+JSON.stringify(T,null,2)+';\n';fs.writeFileSync(path.join(base,'practice/questions.js'),pj);fs.writeFileSync(path.join(base,'practice/practice-questions.js'),pj);fs.writeFileSync(path.join(base,'test/questions.js'),tj);fs.writeFileSync(path.join(ROOT,'assets/assessment-banks/year2/science',code.toLowerCase()+'.json'),JSON.stringify([...P,...T],null,2)+'\n');console.log(code,'PASS',P.length,T.length,'positions',pos.join('/'));
}
console.log('YEAR 2 SCIENCE PASS',codes.length,'codes',codes.length*56,'questions');
