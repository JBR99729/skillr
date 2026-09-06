// Scoped release: only the nine reviewed Year 2 measurement, space and statistics codes.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'../..');
const version='20260906-year2-pending-release';
const codes=['m01','m02','m03','m04','m05','sp01','sp02','st01','st02'].map(s=>'ac9m2'+s);
for(const code of codes) {
 const bank=`assets/assessment-banks/year2/math/${code}.json`;
 execFileSync(process.execPath,['scripts/validate_production_question_bank.mjs',bank],{cwd:root,stdio:'pipe'});
 const items=JSON.parse(fs.readFileSync(path.join(root,bank),'utf8'));
 if(items.some(q=>q.review?.status!=='editorially-reviewed'))throw Error(`${code}: editorial review incomplete`);
 execFileSync(process.execPath,['scripts/publish_production_question_bank.mjs',bank,'--reviewed'],{cwd:root,stdio:'inherit'});
 const route=path.join(root,'quiz/year-2/math',code);
 const activity=path.join(route,'index.html');
 fs.writeFileSync(activity,fs.readFileSync(activity,'utf8').replace(/Practice draws from \d+ questions/,'Practice draws from 24 questions'));
 for(const mode of ['practice','test']) {
  const file=path.join(route,mode,'index.html');
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/window\.quizConfig=(\{.*?\});/,(_,raw)=>{
   const c=vm.runInNewContext('('+raw+')',{}, {timeout:1000});c.bankVersion=version;c.requireAdultReviewSupport=true;
   for(const key of ['storageKey','resultStorageKey'])c[key]=c[key].split(':')[0]+':'+version;
   return 'window.quizConfig='+JSON.stringify(c)+';';
  });
  if(mode==='practice')html=html.replace(/48-question/g,'24-question').replace(/>48<\/span><span class="summary-label">Question bank/, '>24</span><span class="summary-label">Question bank');
  if(!html.includes('year1-maths-support.js'))html=html.replace(/<script src="\/quiz\/assets\/script\.js/,`<script src="/quiz/assets/year1-maths-support.js?v=20260906-y1-original-v1"></script><script src="/quiz/assets/script.js`);
  html=html.replace(/(\/questions\.js)\?v=[^"]+/g,'$1?v='+version);
  const note='<p class="intro-text" data-adult-review-note>Drawing, measuring and practical tasks need a parent or teacher to check them in Review answers. They are not marked correct automatically.</p>';
  if(!html.includes('data-adult-review-note'))html=html.replace('<div class="quiz-summary">',note+'<div class="quiz-summary">');
  fs.writeFileSync(file,html);
  for(const page of ['review','result']) {
   const f=path.join(route,mode,page,'index.html');let h=fs.readFileSync(f,'utf8');
   h=h.replace(/data-result-key="([^":]+)(?::[^"]+)?"/,`data-result-key="$1:${version}"`);
   if(!h.includes('year1-maths-support.js'))h=h.replace(/<script src="\/quiz\/assets\/separate-/, '<script src="/quiz/assets/year1-maths-support.js?v=20260906-y1-original-v1"></script><script src="/quiz/assets/separate-');
   h=h.replace(/(\/separate-(?:review|result)\.js)\?v=[^"]+/g,'$1?v='+version);
   fs.writeFileSync(f,h);
  }
 }
}
execFileSync(process.execPath,['scripts/update_content_verification_status.mjs','--check'],{cwd:root,stdio:'inherit'});
