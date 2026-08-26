#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {YEAR8_MATHS_EXPECTED_CODES,YEAR8_MATHS_V2_MIGRATED} from './year8_maths_static_v2_manifest.mjs';

const ROOT=process.cwd();
const ids=['learn','prerequisites','teaching','examples','misconceptions','guided-practice','independent-practice','reasoning','important-questions','assessment','mastery','guidance','alignment','resources','related','official-references'];
const errors=[];
const hub=fs.readFileSync(path.join(ROOT,'year8/curriculum/maths/index.html'),'utf8');
const hubCodes=[...hub.matchAll(/class=["']curriculum-badge["']>(AC9M8(?:N0[1-5]|A0[1-4]|M0[1-7]|SP0[1-4]|ST0[1-4]|P0[1-3]))</gi)].map(m=>m[1].toUpperCase());
const uniqueHub=[...new Set(hubCodes)].sort();
const expected=[...YEAR8_MATHS_EXPECTED_CODES].sort();
if(JSON.stringify(uniqueHub)!==JSON.stringify(expected))errors.push(`Year 8 Maths hub inventory mismatch: found ${uniqueHub.length}, expected ${expected.length}`);

function countWithin(html,id,pattern){
  const start=html.indexOf(`id="${id}"`);
  if(start<0)return 0;
  const next=ids.map(x=>html.indexOf(`id="${x}"`,start+1)).filter(x=>x>start).sort((a,b)=>a-b)[0]??html.length;
  return (html.slice(start,next).match(pattern)||[]).length;
}
for(const item of YEAR8_MATHS_V2_MIGRATED){
  const file=path.join(ROOT,'year8','maths',item.slug,'index.html');
  if(!fs.existsSync(file)){errors.push(`${item.code}: missing ${file}`);continue;}
  const html=fs.readFileSync(file,'utf8');
  const canonical=`https://skillrhub.com/year8/maths/${item.slug}/`;
  if(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*index\s*,?\s*follow/i.test(html))errors.push(`${item.code}: robots index,follow missing`);
  if(!html.includes(`<link rel="canonical" href="${canonical}">`))errors.push(`${item.code}: canonical mismatch`);
  const h1=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'';
  if(!h1.includes(item.code))errors.push(`${item.code}: H1 must contain code`);
  const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'';
  if(!title.includes(item.code)||!title.includes('Year 8'))errors.push(`${item.code}: title lacks code/year`);
  if(!/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']{70,}/i.test(html))errors.push(`${item.code}: useful meta description missing`);
  if(!html.includes('"@type":"LearningResource"')||!html.includes('"educationalAlignment"'))errors.push(`${item.code}: LearningResource educationalAlignment missing`);
  if(!html.includes('"@type":"BreadcrumbList"'))errors.push(`${item.code}: BreadcrumbList missing`);
  let last=-1;
  for(const id of ids){
    const matches=[...html.matchAll(new RegExp(`<details[^>]*class=["'][^"']*curriculum-topic-section[^"']*["'][^>]*id=["']${id}["']`,'gi'))];
    if(matches.length!==1)errors.push(`${item.code}: ${id} expected once, found ${matches.length}`);
    else if(matches[0].index<=last)errors.push(`${item.code}: ${id} out of order`);
    else last=matches[0].index;
  }
  if(!html.includes('Australian Curriculum v9.0')||!html.includes('Victorian Curriculum F–10 Version 2.0')||!html.includes('NSW Mathematics K–10 Syllabus (2022)'))errors.push(`${item.code}: visible three-framework alignment missing`);
  if(!html.includes(item.victoria.code)||!html.includes(item.victoria.relationship))errors.push(`${item.code}: Victoria mapping missing`);
  for(const code of item.nsw.code.split(';').map(s=>s.trim()))if(!html.includes(code))errors.push(`${item.code}: NSW mapping ${code} missing`);
  if(!html.includes(item.nsw.relationship))errors.push(`${item.code}: NSW relationship missing`);
  for(const label of ['Teacher Slides','Homework','Practice Sheet','Practice','Test'])if(!html.includes(`>${label}<`))errors.push(`${item.code}: ${label} link missing`);
  if(!html.includes('data-report-issue')||!html.includes('/assets/report-issue.js'))errors.push(`${item.code}: Report Issue missing`);
  if(!html.includes('G-8P22BET45N'))errors.push(`${item.code}: analytics missing`);
  if(!html.includes('ca-pub-7734963540104771'))errors.push(`${item.code}: AdSense readiness missing`);
  if(/year8-maths-render\.js|curriculum-renderer|topic-renderer/i.test(html))errors.push(`${item.code}: runtime curriculum renderer detected`);
  if(countWithin(html,'examples',/class=["']curriculum-worked-example["']/gi)<3)errors.push(`${item.code}: fewer than 3 worked/modelled examples`);
  if(countWithin(html,'misconceptions',/<li>/gi)<4)errors.push(`${item.code}: fewer than 4 misconceptions`);
  if(countWithin(html,'independent-practice',/<li>/gi)<6)errors.push(`${item.code}: fewer than 6 independent questions`);
  if(countWithin(html,'important-questions',/<li>/gi)<4)errors.push(`${item.code}: fewer than 4 important Q&A`);
  if(countWithin(html,'assessment',/<li>/gi)<3)errors.push(`${item.code}: fewer than 3 assessment questions`);
  if(!/<figure\b[^>]*class=["'][^"']*math-concept-diagram/i.test(html))errors.push(`${item.code}: purposeful native maths model/diagram missing`);
}
if(errors.length){
  console.error('Year 8 Maths static v2 batch validation FAILED:\n');
  errors.forEach(e=>console.error(`- ${e}`));
  process.exit(1);
}
console.log(`Year 8 Maths static v2 PASS: full ${YEAR8_MATHS_EXPECTED_CODES.length}-code inventory verified; ${YEAR8_MATHS_V2_MIGRATED.length} migrated pages satisfy authored depth, locked section order, SEO/resources/schema and state alignment.`);
