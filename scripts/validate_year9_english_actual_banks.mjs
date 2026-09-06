import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const codes=['AC9E9LA01','AC9E9LA02','AC9E9LA03','AC9E9LA04','AC9E9LA05','AC9E9LA06','AC9E9LA07','AC9E9LA08','AC9E9LA09','AC9E9LE01','AC9E9LE02','AC9E9LE03','AC9E9LE04','AC9E9LE05','AC9E9LE06','AC9E9LY01','AC9E9LY02','AC9E9LY03','AC9E9LY04','AC9E9LY05','AC9E9LY06','AC9E9LY07','AC9E9LY08'];
const bad=[/A Year 9 student/i,/curriculum descriptor/i,/teacher/i,/rubric/i,/learning intention/i,/success criteria/i];
const norm=s=>s.toLowerCase().replace(/[“”‘’'".,!?;:—–()-]/g,' ').replace(/\s+/g,' ').trim();
let total=0; const global=new Set();
for(const code of codes){
 const low=code.toLowerCase(); const file=path.join(root,'assets','assessment-banks','year9','english',`${low}.json`); if(!fs.existsSync(file))throw new Error(`Missing ${file}`);
 const bank=JSON.parse(fs.readFileSync(file,'utf8')); const p=bank.filter(q=>q.bank==='practice'),t=bank.filter(q=>q.bank==='test');
 if(p.length!==40||t.length!==16)throw new Error(`${code}: expected 40 practice + 16 test, found ${p.length}+${t.length}`);
 const expected=[...Array(10).fill('recognise'),...Array(10).fill('explain'),...Array(10).fill('discriminate'),...Array(10).fill('apply')];
 p.forEach((q,i)=>{if(q.stage!==expected[i])throw new Error(`${code}: stage progression error at practice ${i+1}`)});
 const local=new Set(); const pStems=new Set();
 for(const q of bank){total++; if(!q.question||!q.audio_prompt||q.question!==q.audio_prompt)throw new Error(`${q.id}: prompt integrity`); if(bad.some(r=>r.test(q.question)))throw new Error(`${q.id}: banned teacher/curriculum wording`); const n=norm(q.question); if(local.has(n))throw new Error(`${code}: duplicate stem ${q.id}`); local.add(n); if(global.has(n))throw new Error(`Cross-bank duplicate stem ${q.id}`);global.add(n);if(q.bank==='practice')pStems.add(n); const correct=q.answers.filter(a=>a.is_correct); if(q.answers.length!==4||correct.length!==1||!q.answers[q.correct_index]?.is_correct)throw new Error(`${q.id}: answer integrity`); if(new Set(q.answers.map(a=>norm(a.text))).size!==4)throw new Error(`${q.id}: duplicate answer option`); if(!q.explanation?.summary||!q.explanation?.hint)throw new Error(`${q.id}: missing explanation/hint`); if(q.quality_schema!=='skillr-actual-v6')throw new Error(`${q.id}: quality schema`);}
 for(const q of t)if(pStems.has(norm(q.question)))throw new Error(`${code}: practice/test overlap ${q.id}`);
 const pjs=fs.readFileSync(path.join(root,'quiz','year-9','english',low,'practice','questions.js'),'utf8'); const pjs2=fs.readFileSync(path.join(root,'quiz','year-9','english',low,'practice','practice-questions.js'),'utf8'); const tjs=fs.readFileSync(path.join(root,'quiz','year-9','english',low,'test','questions.js'),'utf8'); if(pjs!==pjs2)throw new Error(`${code}: practice live files diverge`); if((pjs.match(/"id":/g)||[]).length!==40||(tjs.match(/"id":/g)||[]).length!==16)throw new Error(`${code}: live bank count mismatch`);
 console.log(`${code}: PASS 40 practice / 16 test`);
}
if(total!==1288)throw new Error(`Expected 1288 total, got ${total}`);
console.log(`PASS: ${total} Year 9 English questions; counts, unique stems, bank separation, answer integrity, stage progression and live-bank parity validated.`);
