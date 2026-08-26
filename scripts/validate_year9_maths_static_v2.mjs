#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = 'year9/maths';
const expected = [
  'AC9M9N01',
  ...Array.from({length:6},(_,i)=>`AC9M9A0${i+1}`),
  ...Array.from({length:5},(_,i)=>`AC9M9M0${i+1}`),
  ...Array.from({length:3},(_,i)=>`AC9M9SP0${i+1}`),
  ...Array.from({length:5},(_,i)=>`AC9M9ST0${i+1}`),
  ...Array.from({length:3},(_,i)=>`AC9M9P0${i+1}`),
];
const requiredIds = ['learn','prerequisites','teaching','examples','misconceptions','guided-practice','independent-practice','reasoning','important-questions','assessment','mastery','guidance','alignment','resources','related','official-references'];
const banned = [
  /Build the [^<.]{0,80} model/i,
  /name the deciding relationship/i,
  /Use the model evidence/i,
  /Annotates the model/i,
  /apply the worked methods for/i,
];

function text(html){return html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();}
function isRedirect(html){return /name=["']robots["'][^>]*noindex/i.test(html) && (/(?:http-equiv=["']refresh["'])/i.test(html)||/location\.replace\s*\(/i.test(html));}
function codeFrom(html,dir){return text(html).match(/AC9M9(?:N01|A0[1-6]|M0[1-5]|SP0[1-3]|ST0[1-5]|P0[1-3])/i)?.[0]?.toUpperCase() || dir.match(/ac9m9(?:n01|a0[1-6]|m0[1-5]|sp0[1-3]|st0[1-5]|p0[1-3])/i)?.[0]?.toUpperCase() || null;}
function sectionBlock(html,id){const start=new RegExp(`<details\\b[^>]*\\bid=["']${id}["'][^>]*>`,'i').exec(html);if(!start)return '';const tail=html.slice(start.index);const end=tail.search(/<details\b/i, start[0].length);return end>0?tail.slice(0,end):tail;}
function liCount(block){return (block.match(/<li\b/gi)||[]).length;}

const failures=[];
const found=new Map();
for(const entry of fs.readdirSync(root,{withFileTypes:true})){
  if(!entry.isDirectory())continue;
  const file=path.join(root,entry.name,'index.html');
  if(!fs.existsSync(file))continue;
  const html=fs.readFileSync(file,'utf8');
  if(isRedirect(html))continue;
  const code=codeFrom(html,entry.name);
  if(!code || !expected.includes(code))continue;
  if(found.has(code)) failures.push(`${code}: multiple canonical-looking Year 9 Maths pages (${found.get(code)}, ${file})`);
  found.set(code,file);

  const problems=[];
  if(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*index[^"']*follow/i.test(html)) problems.push('missing index,follow robots');
  const canonical=html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
  if(canonical!==`https://skillrhub.com/year9/maths/${entry.name}/`) problems.push(`canonical mismatch: ${canonical||'(missing)'}`);
  if(!/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?LearningResource/i.test(html)) problems.push('missing LearningResource schema');
  if(!/Australian Curriculum v9\.0/i.test(html)||!/Victorian Curriculum F/i.test(html)||!/NSW Mathematics K/i.test(html)) problems.push('missing visible/schema Australian/Victoria/NSW alignment');
  for(const id of requiredIds){if(!new RegExp(`\\bid=["']${id}["']`,'i').test(html)) problems.push(`missing #${id}`);}
  if(!/href=["'][^"']*teacher-slides[^"']*\//i.test(html)) problems.push('missing Teacher Slides route');
  if(!/href=["'][^"']*\/worksheet\//i.test(html)) problems.push('missing Practice Sheet/worksheet route');
  if(!/href=["'][^"']*\/homework\//i.test(html)) problems.push('missing Homework route');
  if(!/href=["'][^"']*\/practice\//i.test(html)) problems.push('missing Practice route');
  if(!/href=["'][^"']*\/test\//i.test(html)) problems.push('missing Test route');
  if(!/data-report-issue/i.test(html)||!/report-issue\.js/i.test(html)) problems.push('missing Report issue control');
  if(!/G-8P22BET45N/.test(html)) problems.push('analytics regression');
  if(liCount(sectionBlock(html,'learn'))<4) problems.push('learning goals too thin');
  if((sectionBlock(html,'examples').match(/curriculum-worked-example/gi)||[]).length<3) problems.push('fewer than 3 worked examples');
  if(liCount(sectionBlock(html,'independent-practice'))<5) problems.push('independent practice too thin');
  if(liCount(sectionBlock(html,'assessment'))<3) problems.push('assessment practice too thin');
  for(const re of banned){if(re.test(html)) problems.push(`legacy generic pedagogy remains: ${re}`);}
  if(/(?:year9-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render)\.js/i.test(html)) problems.push('runtime curriculum renderer detected');
  if(problems.length) failures.push(`${file}\n  - ${problems.join('\n  - ')}`);
}
for(const code of expected){if(!found.has(code)) failures.push(`${code}: canonical Year 9 Maths page not found`);}
if(found.size!==expected.length) failures.push(`Expected ${expected.length} canonical Year 9 Maths pages, found ${found.size}`);

if(failures.length){
  console.error('Year 9 Maths Static Curriculum Architecture v2 quality gate FAILED:\n');
  failures.forEach(x=>console.error(`- ${x}`));
  process.exit(1);
}
console.log(`Year 9 Maths static v2 PASS: ${found.size}/${expected.length} canonical pages; resources, SEO, authored pedagogy and alignment intact.`);
