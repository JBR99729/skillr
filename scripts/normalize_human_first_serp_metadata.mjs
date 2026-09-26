#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const WRITE=process.argv.includes('--write');
const roots=['foundation',...Array.from({length:10},(_,i)=>`year${i+1}`)];
let scanned=0, changed=0;
const changes=[];

function walk(dir,out=[]){
  if(!fs.existsSync(dir)) return out;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p,out);
    else if(e.isFile()&&e.name==='index.html') out.push(p);
  }
  return out;
}
function text(s){return String(s||'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

for(const root of roots){
  for(const file of walk(path.join(ROOT,root))){
    const rel=path.relative(ROOT,file).replaceAll(path.sep,'/');
    const m=rel.match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/[^/]+\/index\.html$/i);
    if(!m) continue;
    scanned++;
    let html=fs.readFileSync(file,'utf8');
    const tm=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if(!tm) continue;
    const oldTitle=text(tm[1]);
    const generic=oldTitle.match(/^(AC9[A-Z0-9]+)\s+(.+?)\s*\|\s*(Foundation|Year\s+\d+)\s+(Maths|Science|English)\s+Topic Guide$/i);
    if(!generic) continue;

    const [,codeRaw,topicRaw,yearRaw,subjectRaw]=generic;
    const code=codeRaw.toUpperCase();
    const topic=text(topicRaw);
    const year=text(yearRaw);
    const subject=subjectRaw[0].toUpperCase()+subjectRaw.slice(1).toLowerCase();
    const newTitle=`${topic} | ${year} ${subject} | ${code}`;
    const newDesc=`Teach and learn ${topic} for ${year} ${subject} (${code}) with clear explanations, worked examples, common mistakes, classroom resources, practice and tests.`;

    let next=html.replace(tm[0],`<title>${esc(newTitle)}</title>`);
    const dm=next.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    if(dm){
      const oldDesc=text(dm[1]);
      if(/topic guide for/i.test(oldDesc)||/curriculum mapping, keywords, worksheets, practice and test links/i.test(oldDesc)){
        next=next.replace(dm[0],`<meta name="description" content="${esc(newDesc)}">`);
      }
    }
    if(next!==html){
      changed++;
      changes.push({file:rel,from:oldTitle,to:newTitle});
      if(WRITE) fs.writeFileSync(file,next,'utf8');
    }
  }
}
console.log(`Human-first curriculum metadata: scanned=${scanned} changed=${changed} mode=${WRITE?'write':'check'}`);
for(const c of changes.slice(0,80)) console.log(`- ${c.file}: ${c.from} -> ${c.to}`);
if(changes.length>80) console.log(`... ${changes.length-80} more`);
if(!WRITE&&changed) process.exit(1);
