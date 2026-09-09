#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(__dirname,'..');
const codes=['02','03','04','05','06','07'];
let out=[];
out.push('SKILLRHUB YEAR 4 ENGLISH — AC9E4LY02–AC9E4LY07');
out.push('Candidate Practice and Test Question Banks');
out.push('Extracted verbatim from the committed canonical candidate banks.');
out.push('Total: 288 Practice + 96 Test = 384 questions');
out.push('');
for(const n of codes){
 const code='AC9E4LY'+n;
 const items=JSON.parse(fs.readFileSync(path.join(root,'assets/assessment-banks/year4/english',`ac9e4ly${n}.json`),'utf8'));
 out.push('='.repeat(78)); out.push(code); out.push('='.repeat(78)); out.push('');
 for(const bank of ['practice','test']){
   const rows=items.filter(x=>x.bank===bank);
   out.push(`${bank.toUpperCase()} — ${rows.length} QUESTIONS`); out.push('-'.repeat(78)); out.push('');
   rows.forEach((x,i)=>{
     out.push(`${i+1}. [${x.id}] ${x.question}`);
     x.answers.forEach((a,j)=>out.push(`   ${String.fromCharCode(65+j)}. ${a.text}${a.is_correct?'  [CORRECT]':''}`));
     out.push(`   Answer: ${String.fromCharCode(65+x.correct_index)}`);
     if(x.explanation?.summary) out.push(`   Explanation: ${x.explanation.summary}`);
     if(x.explanation?.hint) out.push(`   Hint: ${x.explanation.hint}`);
     if(x.curriculum_coverage?.length) out.push(`   Coverage: ${x.curriculum_coverage.join(', ')}`);
     out.push('');
   });
 }
}
const dest=path.join(root,'reports/year4-english-review/AC9E4LY02-LY07-QUESTION-BANKS.txt');
fs.writeFileSync(dest,out.join('\n'),'utf8');
console.log(`Wrote ${dest}`);
