#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { validateTopicActivities } from './lib/published_activity_navigation.mjs';
import {YEAR8_SCIENCE_EXPECTED_CODES,YEAR8_SCIENCE_V2_MIGRATED} from './year8_science_static_v2_manifest.mjs';

const ROOT=process.cwd();
const ids=['learn','prerequisites','teaching','examples','misconceptions','guided-practice','independent-practice','reasoning','important-questions','assessment','mastery','guidance','alignment','resources','related','official-references'];
const errors=[];
const hub=fs.readFileSync(path.join(ROOT,'year8/curriculum/science/index.html'),'utf8');
const topicCss=fs.readFileSync(path.join(ROOT,'assets/year8-science-topic-v2.css'),'utf8');
if(!/\.curriculum-layout\s*\{[^}]*display\s*:\s*block/i.test(topicCss))errors.push('Year 8 Science topic layout must override the shared two-column grid with one reading column');
if(!/\.science-v2-grid\s*\{[^}]*grid-template-columns\s*:\s*(?:minmax\(0\s*,\s*1fr\)|1fr)/i.test(topicCss))errors.push('Year 8 Science guidance cards must stack in one column');
// Retired year hubs redirect to Learn; the canonical unit catalogue owns inventory.
// Keep the legacy badge check for an active hub and validate the retired route too.
const retiredHub=hub.includes('data-learning-hub-retired="2026-11-07"');
if(retiredHub){
  const target='https://skillrhub.com/learn/?year=8&subject=science';
  const attr=(tag,name)=>tag?.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`,'i'))?.[1]||'';
  const decode=value=>value.replaceAll('&amp;','&');
  const metas=[...hub.matchAll(/<meta\b[^>]*>/gi)].map(match=>match[0]);
  const refresh=decode(attr(metas.find(tag=>attr(tag,'http-equiv').toLowerCase()==='refresh'),'content'));
  const robots=attr(metas.find(tag=>attr(tag,'name').toLowerCase()==='robots'),'content').replaceAll(' ','').toLowerCase();
  const canonical=attr([...hub.matchAll(/<link\b[^>]*>/gi)].map(match=>match[0]).find(tag=>attr(tag,'rel')==='canonical'),'href');
  const links=[...hub.matchAll(/<a\b[^>]*>/gi)].map(match=>decode(attr(match[0],'href')));
  let scriptTarget=null;
  try{scriptTarget=JSON.parse(hub.match(/location\.replace\(\s*("(?:[^"\\]|\\.)*")\s*\)/)?.[1]||'null');}catch{}
  if(refresh!==`0;url=${target}`||scriptTarget!==target||links.length!==1||links[0]!==target||canonical!=='https://skillrhub.com/learn/'||robots!=='noindex,follow')errors.push('Retired Year 8 Science hub must retain matching refresh/script/fallback destinations, Learn canonical and noindex');
}
const catalogueUnits=JSON.parse(fs.readFileSync(path.join(ROOT,'data/curriculum-units.json'),'utf8')).units.filter(unit=>unit.yearNumber===8&&unit.subject==='Science');
const hubCodes=retiredHub?catalogueUnits.map(unit=>unit.code):[...hub.matchAll(/class=["']curriculum-badge["']>(AC9S8(?:U0[1-7]|H0[1-4]|I0[1-8]))</gi)].map(m=>m[1].toUpperCase());
if(new Set(hubCodes).size!==hubCodes.length)errors.push('Year 8 Science inventory contains duplicate codes');
const expected=[...YEAR8_SCIENCE_EXPECTED_CODES].sort();
const actual=[...new Set(hubCodes)].sort();
if(JSON.stringify(actual)!==JSON.stringify(expected))errors.push(`Year 8 Science hub inventory mismatch: found ${actual.length}, expected ${expected.length}`);

function sectionSlice(html,id){
  const start=html.indexOf(`id="${id}"`);if(start<0)return'';
  const next=ids.map(x=>html.indexOf(`id="${x}"`,start+1)).filter(x=>x>start).sort((a,b)=>a-b)[0]??html.length;
  return html.slice(start,next);
}
function countWithin(html,id,pattern){return(sectionSlice(html,id).match(pattern)||[]).length;}

for(const item of YEAR8_SCIENCE_V2_MIGRATED){
  const file=path.join(ROOT,'year8','science',item.slug,'index.html');
  if(!fs.existsSync(file)){errors.push(`${item.code}: missing page`);continue;}
  const html=fs.readFileSync(file,'utf8');
  const canonical=`https://skillrhub.com/year8/science/${item.slug}/`;
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
    else if(matches[0].index<=last)errors.push(`${item.code}: ${id} out of order`);else last=matches[0].index;
  }
  if(!html.includes('Australian Curriculum v9.0')||!html.includes('Victorian Curriculum F–10 Version 2.0')||!html.includes('NSW Science 7–10 Syllabus (2023)'))errors.push(`${item.code}: visible three-framework alignment missing`);
  if(!html.includes(item.victoria.code)||!html.includes(item.victoria.relationship))errors.push(`${item.code}: Victoria mapping missing`);
  for(const c of item.nsw.code.split(';').map(s=>s.trim()))if(!html.includes(c))errors.push(`${item.code}: NSW mapping ${c} missing`);
  if(!html.includes(item.nsw.relationship))errors.push(`${item.code}: NSW relationship missing`);
  for(const label of ['Teacher Slides','Homework'])if(!html.includes(`>${label}<`))errors.push(`${item.code}: ${label} link missing`);
  if(/>Practice Sheet<|>Worksheet</i.test(html))errors.push(`${item.code}: duplicate worksheet/practice-sheet CTA detected`);
  errors.push(...validateTopicActivities(html,item.code,ROOT));
  if(!html.includes('data-report-issue')||!html.includes('/assets/report-issue.js'))errors.push(`${item.code}: Report Issue missing`);
  if(!html.includes('G-8P22BET45N'))errors.push(`${item.code}: analytics missing`);
  if(!html.includes('ca-pub-7734963540104771'))errors.push(`${item.code}: AdSense readiness missing`);
  if(/curriculum-renderer|topic-renderer|year8-science-render/i.test(html))errors.push(`${item.code}: curriculum runtime detected`);
  if(countWithin(html,'examples',/class=["'][^"']*worked-example[^"']*["']/gi)<3)errors.push(`${item.code}: fewer than 3 worked/modelled examples`);
  if(countWithin(html,'misconceptions',/class=["'][^"']*misconception[^"']*["']/gi)<4)errors.push(`${item.code}: fewer than 4 misconceptions`);
  if(countWithin(html,'independent-practice',/<li>/gi)<6)errors.push(`${item.code}: fewer than 6 independent questions`);
  if(countWithin(html,'important-questions',/<li>/gi)<4)errors.push(`${item.code}: fewer than 4 important Q&A`);
  if(countWithin(html,'assessment',/<li>/gi)<3)errors.push(`${item.code}: fewer than 3 assessment questions`);
  if(!/<figure\b[^>]*class=["'][^"']*science-concept-diagram/i.test(html))errors.push(`${item.code}: purposeful native science diagram/model missing`);
  const guidance=sectionSlice(html,'guidance');
  for(const tier of ['Support:','Core:','Extend:'])if(!guidance.includes(tier))errors.push(`${item.code}: ${tier} differentiation missing`);
  for(const token of item.preserve)if(!html.toLowerCase().includes(token.toLowerCase()))errors.push(`${item.code}: preserved concept missing: ${token}`);
}
if(errors.length){console.error('Year 8 Science static v2 validation FAILED:\n');errors.forEach(e=>console.error(`- ${e}`));process.exit(1);}
console.log(`Year 8 Science static v2 PASS: full ${YEAR8_SCIENCE_EXPECTED_CODES.length}-code inventory verified; ${YEAR8_SCIENCE_V2_MIGRATED.length} migrated pages satisfy preservation, authored depth, single-column layout, locked order, SEO/resources/schema and state alignment.`);
