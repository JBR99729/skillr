import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const R=path.resolve(import.meta.dirname,'..');
const codes=['AC9E6LA02','AC9E6LA03','AC9E6LA04','AC9E6LA05','AC9E6LA06'];
const required={
 AC9E6LA02:['objective','subjective','bias','omission','sampling','visual'],
 AC9E6LA03:['stage','phase','procedure','argument','multimodal','dominant structure'],
 AC9E6LA04:['repetition','synonym','category','pronoun','lexical chain','paragraph link'],
 AC9E6LA05:['embedded clause','head noun','restrictive','supplementary','content clause','fragment'],
 AC9E6LA06:['precise verb','progressive','perfect','modality','adverb','condition']
};
const errors=[]; const norm=s=>String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
for(const code of codes){
 const file=path.join(R,'assets/assessment-banks/year6/english',code.toLowerCase()+'.json');
 const all=JSON.parse(fs.readFileSync(file,'utf8')),p=all.filter(x=>x.bank==='practice'),t=all.filter(x=>x.bank==='test');
 if(p.length!==48)errors.push(`${code}: practice ${p.length}/48`); if(t.length!==16)errors.push(`${code}: test ${t.length}/16`);
 for(const [name,bank] of [['practice',p],['test',t]]){const stems=bank.map(x=>norm(x.question));if(new Set(stems).size!==stems.length)errors.push(`${code}: duplicate ${name} stems`);}
 const practice=new Set(p.map(x=>norm(x.question)));if(t.some(x=>practice.has(norm(x.question))))errors.push(`${code}: practice/test overlap`);
 if(new Set(all.map(x=>x.id)).size!==all.length)errors.push(`${code}: duplicate IDs`);
 for(const x of all){if(x.answers?.length!==4||x.answers.filter(a=>a.is_correct).length!==1||!x.answers[x.correct_index]?.is_correct)errors.push(`${x.id}: answer integrity`);if(new Set(x.answers.map(a=>norm(a.text))).size!==4)errors.push(`${x.id}: duplicate option`);if(!x.explanation?.summary||!x.explanation?.hint)errors.push(`${x.id}: explanation missing`);if(x.quality_schema!=='research-aligned-original-v2')errors.push(`${x.id}: stale schema`);}
 const corpus=norm(JSON.stringify(all));for(const term of required[code])if(!corpus.includes(term))errors.push(`${code}: missing coverage ${term}`);
 const d=path.join(R,'quiz/year-6/english',code.toLowerCase());
 for(const [bank,expected] of [['practice',48],['test',16]]){const src=fs.readFileSync(path.join(d,bank,'questions.js'),'utf8'),box={window:{}};vm.createContext(box);vm.runInContext(src,box);const q=bank==='practice'?box.window.skillrPracticeQuestions:box.window.skillrTestQuestions;if(q?.length!==expected)errors.push(`${code}: published ${bank} ${q?.length}/${expected}`);}
 const unit=fs.readdirSync(path.join(R,'year6/english')).find(x=>x.startsWith(code.toLowerCase()+'-'));
 const topic=fs.readFileSync(path.join(R,'year6/english',unit,'index.html'),'utf8'); if(!topic.includes('topic-depth-upgrade'))errors.push(`${code}: topic depth block missing`);
 const classroom=fs.readFileSync(path.join(R,'year6/english',unit,'teacher-slides/index.html'),'utf8');if(!classroom.includes('research-aligned-lesson'))errors.push(`${code}: classroom alignment block missing`);
 const worksheet=fs.readFileSync(path.join(d,'worksheet/index.html'),'utf8');if(!worksheet.includes('worksheetQuestionLimit:12')||!worksheet.includes('<strong>Learning focus:</strong>'))errors.push(`${code}: worksheet update missing`);
 console.log(`${code}: Practice 48, Test 16, topic/classroom/worksheet alignment checked`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PASS: AC9E6LA02–AC9E6LA06 rebuilt banks and aligned resources verified.');
