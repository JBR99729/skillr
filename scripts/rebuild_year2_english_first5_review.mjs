// Scoped local rebuild. This does not push or mark a year verified.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const version='20260906-english-la01-la05';
for(let n=1;n<=5;n++){
 const code='ac9e2la0'+n,bank=`assets/assessment-banks/year2/english/${code}.json`;
 execFileSync(process.execPath,['scripts/validate_production_question_bank.mjs',bank],{cwd:root,stdio:'pipe'});
 execFileSync(process.execPath,['scripts/publish_production_question_bank.mjs',bank],{cwd:root,stdio:'inherit'});
 const route=path.join(root,'quiz/year-2/english',code);
 for(const mode of ['practice','test']){
  const count=mode==='practice'?24:16,file=path.join(route,mode,'index.html');
  let h=fs.readFileSync(file,'utf8');
  h=h.replace(/window\.quizConfig=(\{.*?\});/,(_,raw)=>{
   const c=vm.runInNewContext('('+raw+')');c.maxQuestions=count;c.bankVersion=version;c.requireAdultReviewSupport=true;
   for(const key of ['storageKey','resultStorageKey'])c[key]=c[key].split(':')[0]+':'+version;
   return 'window.quizConfig='+JSON.stringify(c)+';';
  });
  if(mode==='practice')h=h.replace(/40 progressive/g,'24 reviewed').replace(/>40<\/span>/g,'>24</span>');
  else h=h.replace(/12-question/g,'16-question').replace(/draws 12 questions/g,'presents all 16 questions').replace(/>12<\/span>/g,'>16</span>');
  h=h.replace(/auto-marked/g,'reviewed');
  h=h.replace(/(\/questions\.js)\?v=[^"]+/g,'$1?v='+version);
  if(!h.includes('year1-maths-support.js'))h=h.replace(/<script src="\/quiz\/assets\/script\.js/, '<script src="/quiz/assets/year1-maths-support.js?v=20260906-y1-original-v1"></script><script src="/quiz/assets/script.js');
  const note='<p class="intro-text" data-adult-review-note>Two tasks need a parent or teacher to check your spoken, written or practical response in Review answers. These tasks are not marked correct automatically.</p>';
  if(!h.includes('data-adult-review-note'))h=h.replace('<div class="quiz-summary">',note+'<div class="quiz-summary">');
  fs.writeFileSync(file,h);
  for(const page of ['result','review']){
   const f=path.join(route,mode,page,'index.html');let t=fs.readFileSync(f,'utf8');
   t=t.replace(/data-result-key="([^":]+)(?::[^"]+)?"/,`data-result-key="$1:${version}"`);
   if(!t.includes('year1-maths-support.js'))t=t.replace(/<script src="\/quiz\/assets\/separate-/, '<script src="/quiz/assets/year1-maths-support.js?v=20260906-y1-original-v1"></script><script src="/quiz/assets/separate-');
   fs.writeFileSync(f,t);
  }
 }
 const f=path.join(route,'index.html');let t=fs.readFileSync(f,'utf8');
 t=t.replace(/40 progressive/g,'24 reviewed').replace(/40 Practice/g,'24 Practice').replace(/auto-marked Test/g,'reviewed Test').replace(/Test draws 12 questions from a separate 16-question bank/g,'Test contains 16 separate questions');fs.writeFileSync(f,t);
}
