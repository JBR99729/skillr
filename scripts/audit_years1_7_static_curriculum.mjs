#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const roots=[];
for(let y=1;y<=7;y++) for(const subject of ['maths','english','science']) roots.push(path.join(`year${y}`,subject));
const errors=[];
let topics=0, viewers=0;
const runtime=/((?:year\d+|lower-materials|foundation)[^"'\s>]*(?:render|topic)[^"'\s>]*\.js|topic-modules-render|lesson-render)/i;
const loading=/id=["'](?:topicRoot|year\d+Topic|slideRoot)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i;
const direct=/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i;
const legacy=/teacher-slides\/live\.html(?:\?code=)?/i;

function walk(dir){
  if(!fs.existsSync(dir)) return [];
  const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...walk(p)); else out.push(p);
  }
  return out;
}

for(const root of roots){
  if(!fs.existsSync(root)) continue;
  for(const file of fs.readdirSync(root,{withFileTypes:true})){
    if(!file.isDirectory()) continue;
    const topic=path.join(root,file.name,'index.html');
    if(!fs.existsSync(topic)) continue;
    topics++;
    const html=fs.readFileSync(topic,'utf8');
    if(!/<details\b/i.test(html)||!/<summary\b/i.test(html)) errors.push(`${topic}: no native details/summary teaching sections`);
    if(loading.test(html)) errors.push(`${topic}: runtime Loading shell`);
    if(runtime.test(html)) errors.push(`${topic}: curriculum runtime renderer dependency`);
    if(direct.test(html)) errors.push(`${topic}: direct PPTX/PDF link`);
    if(legacy.test(html)) errors.push(`${topic}: legacy shared live teacher-slide route`);
    const candidates=[
      path.join(root,file.name,'teacher-slides','index.html'),
      path.join(root,file.name,'teacher-deck','index.html')
    ];
    const viewer=candidates.find(fs.existsSync);
    if(!viewer){ errors.push(`${topic}: missing per-topic fixed Teacher Slide viewer`); continue; }
    viewers++;
    const v=fs.readFileSync(viewer,'utf8');
    if(direct.test(v)) errors.push(`${viewer}: direct PPTX/PDF link`);
    if(runtime.test(v)) errors.push(`${viewer}: runtime slide assembly dependency`);
    if(!/<img\b[^>]*(?:slide|teacher)/i.test(v) && !/data-slide-(?:src|image)/i.test(v)) errors.push(`${viewer}: no fixed slide images`);
    if(!/(Previous|Next|data-slide-next|data-next-slide)/i.test(v)) errors.push(`${viewer}: no page-by-page navigation`);
  }
}

console.log(`Years 1-7 audit: ${topics} topic pages, ${viewers} fixed viewers inspected.`);
if(errors.length){ console.error(`Found ${errors.length} issue(s):`); for(const e of errors) console.error(`- ${e}`); process.exit(1); }
console.log('Years 1-7 static curriculum audit: PASS');
