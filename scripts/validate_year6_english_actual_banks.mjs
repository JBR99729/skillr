import fs from 'node:fs';
import path from 'node:path';
const R=path.resolve(import.meta.dirname,'..'),D=path.join(R,'assets/assessment-banks/year6/english');
const files=fs.readdirSync(D).filter(f=>/^ac9e6(?:la|le|ly)\d+\.json$/.test(f)).sort();
const errors=[];const norm=s=>String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
const banned=/\b(?:teacher should|rubric|marking key|award \d+ marks?|a year 6 student|curriculum descriptor|content descriptor|independent check|recognise the feature in a fresh context|apply the same year 6 skill|context \d+)\b/i;
if(files.length!==23)errors.push(`expected 23 code files, found ${files.length}`);
for(const f of files){const a=JSON.parse(fs.readFileSync(path.join(D,f),'utf8'));const code=f.slice(0,-5).toUpperCase();const p=a.filter(x=>x.bank==='practice'),t=a.filter(x=>x.bank==='test');
 if(p.length!==40)errors.push(`${code}: ${p.length} practice`);if(t.length!==16)errors.push(`${code}: ${t.length} test`);
 const stages=['recognise','explain','discriminate','apply'];for(let s=0;s<4;s++){const z=p.slice(s*10,s*10+10);if(z.length!==10||z.some(x=>x.stage!==stages[s]))errors.push(`${code}: bad ${stages[s]} stage`)}
 const ps=p.map(x=>norm(x.question)),ts=t.map(x=>norm(x.question));if(new Set(ps).size!==ps.length)errors.push(`${code}: duplicate practice stems`);if(new Set(ts).size!==ts.length)errors.push(`${code}: duplicate test stems`);const P=new Set(ps);if(ts.some(q=>P.has(q)))errors.push(`${code}: Practice/Test overlap`);
 for(const x of a){const good=x.answers?.filter(v=>v.is_correct)||[];if(good.length!==1)errors.push(`${x.id}: correct-answer count ${good.length}`);if(!Number.isInteger(x.correct_index)||!x.answers?.[x.correct_index]?.is_correct)errors.push(`${x.id}: correct_index`);if(!x.explanation?.summary||!x.explanation?.hint)errors.push(`${x.id}: explanation`);if(banned.test(`${x.question} ${x.explanation?.summary} ${x.explanation?.hint}`))errors.push(`${x.id}: banned/template language`);if(!x.question||norm(x.question).length<20)errors.push(`${x.id}: weak stem`);if(new Set(x.answers.map(v=>norm(v.text))).size!==x.answers.length)errors.push(`${x.id}: duplicate answer options`);}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`PASS Year 6 English actual banks: ${files.length} codes, ${files.length*40} Practice, ${files.length*16} Test; counts, stages, unique stems, overlap, answer integrity, option uniqueness and student-facing language verified.`);
