import fs from 'node:fs';
import path from 'node:path';
const fallback=/<div class="lesson-preview-example"><h2>From the lesson<\/h2>[\s\S]*?<\/div>/;
const dependent=/\b(?:shown|pictured|diagram|picture|image|above|below|following|these options|this (?:table|chart|map|graph|text|passage|grid|clock|model))\b|^(?:which (?:of these|option|choice|answer)|(?:choose|select) (?:the|an?) (?:best|correct|matching) (?:answer|option|choice))/i;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const plain=s=>s.replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;|&#x27;/gi,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const valid=(s,min,max)=>typeof s==='string'&&s.trim().length>=min&&s.trim().length<=max&&!/<[a-z!/]/i.test(s);
function readBank(file){
 if(!fs.existsSync(file)) return [];
 try{
  const s=fs.readFileSync(file,'utf8');
  const raw=file.endsWith('.json')?s:s.match(/(?:skillrPracticeQuestions|quizQuestions|practiceQuestions)\s*=\s*(\[[\s\S]*?\n\]);?/)?.[1];
  const d=JSON.parse(raw);
  return Array.isArray(d)?d:d.questions??d.practice??[];
 }catch{return [];}
}
function bankExample(year,subject,code){
 const yearDir=year==='foundation'?'grade-k':'year-'+year.slice(4);
 for(const dir of subject==='maths'?['math','maths']:[subject]){
  const quiz=path.join('quiz',yearDir,dir,code.toLowerCase(),'practice');
  for(const file of [path.join(quiz,'questions.js'),path.join(quiz,'practice-questions.js'),path.join('assets','assessment-banks',year,dir,code.toLowerCase()+'.json')]){
   for(const q of readBank(file)){
    if((q.curriculum_code??q.curriculumCode)?.toUpperCase()!==code||q.bank!=='practice'||q.type&&q.type!=='single') continue;
    if(q.visualHtml||typeof q.visual==='string'&&q.visual.trim()||[q.visualMeta?.type,q.visual?.type].some(v=>v&&v!=='none'))continue;
    const option=q.answers?.[q.correct_index??q.correct];
    const answer=typeof option==='object'?option?.text:option;
    const prompt=q.question;
    const reason=q.structuredExplanation?.summary??q.explanation?.summary??(typeof q.explanation==='string'?q.explanation.split(/\nHint:/i)[0]:'');
    if(!valid(prompt,15,350)||!valid(answer,1,180)||!valid(reason,25,400))continue;
    if(dependent.test(prompt)||dependent.test(reason)||/^(?:[A-D]|(?:option|choice) [A-D]|none of the above|all of the above)$/i.test(answer.trim())||/\b(?:option|choice) [A-D]\b/i.test(reason))continue;
    if(/^(?:the (?:answer|correct answer) is|option [A-D] is correct)[\s:]/i.test(reason)&&reason.length<55)continue;
    return {prompt,answer,reason,id:q.id};
   }
  }
 }
}
function authoredExample(source){
 const main=source.match(/<main\b[\s\S]*?<\/main>/i)?.[0]??'';
 for(const [,stem,label,solution] of main.matchAll(/<p\b[^>]*>((?:(?!<\/p>)[\s\S])*)<\/p>\s*<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>\s*(?:<div\b[^>]*>\s*)?<p\b[^>]*>([\s\S]*?)<\/p>/gi)){
  if(!/\banswer\b/i.test(plain(label)))continue;
  const prompt=plain(stem).replace(/^(?:try it(?: together)?|quick check|check your understanding|question|your turn)\s*:\s*/i,'');
  const reason=plain(solution).replace(/^(?:answer|solution)\s*:\s*/i,'');
  if(!valid(prompt,18,300)||!valid(reason,30,440)||dependent.test(prompt)||dependent.test(reason)||/^(?:look|read|listen|watch|use|open)\b/i.test(prompt)||/^(?:answers? (?:may|will) vary|accept any)/i.test(reason))continue;
  return {prompt,reason,id:'authored-lesson'};
 }
}
const report={updated:0,fromLesson:0,fromPractice:0,missing:[]};
for(const year of ['foundation',...Array.from({length:10},(_,i)=>'year'+(i+1))]){
 for(const subject of ['maths','english','science']){
  for(const slug of fs.readdirSync(path.join(year,subject)).sort()){
   const file=path.join(year,subject,slug,'index.html');
   if(!slug.startsWith('ac9')||!fs.existsSync(file))continue;
   const source=fs.readFileSync(file,'utf8');
   if(!fallback.test(source))continue;
   const code=slug.split('-')[0].toUpperCase();
   const model=authoredExample(source)??bankExample(year,subject,code);
   if(!model){report.missing.push(code);continue;}
   const answer=model.answer?'<p><strong>Answer:</strong> '+escape(model.answer.trim())+'</p>':'';
   const card='<div class="lesson-preview-example"><h2>Worked example</h2><p>'+escape(model.prompt.trim())+'</p>'+answer+'<p class="lesson-preview-takeaway">'+escape(model.reason.trim())+'</p></div>';
   const out=source.replace(fallback,()=>card);
   if(out.replace(card,'')!==source.replace(fallback,''))throw Error(file);
   if(process.argv.includes('--write'))fs.writeFileSync(file,out);
   report.updated++;
   report[model.id==='authored-lesson'?'fromLesson':'fromPractice']++;
  }
 }
}
console.log(JSON.stringify(report));
