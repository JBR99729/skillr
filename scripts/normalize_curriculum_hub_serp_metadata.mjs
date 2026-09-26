#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const WRITE=process.argv.includes('--write');
const years=['foundation',...Array.from({length:10},(_,i)=>`year${i+1}`)];
const subjects={maths:'Maths',science:'Science',english:'English'};
let changed=0;

function labelYear(y){return y==='foundation'?'Foundation':`Year ${y.replace('year','')}`;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

for(const y of years){
  for(const [slug,subject] of Object.entries(subjects)){
    const file=path.join(ROOT,y,'curriculum',slug,'index.html');
    if(!fs.existsSync(file)) continue;
    const html=fs.readFileSync(file,'utf8');
    const yr=labelYear(y);
    const newTitle=`${yr} ${subject} – Australian Curriculum V9 Resources | SkillrHub`;
    const newDesc=`Browse ${yr} ${subject} Australian Curriculum V9 resources with topic guides, teacher slides, worksheets, practice and tests organised by curriculum code.`;
    let next=html;
    next=next.replace(/<title[^>]*>[\s\S]*?<\/title>/i,`<title>${esc(newTitle)}</title>`);
    const dm=next.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    if(dm) next=next.replace(dm[0],`<meta name="description" content="${esc(newDesc)}">`);
    else next=next.replace(/<\/title>/i,`</title>\n<meta name="description" content="${esc(newDesc)}">`);
    if(next!==html){changed++; if(WRITE) fs.writeFileSync(file,next,'utf8');}
  }
}
console.log(`Australian curriculum subject hub metadata: changed=${changed} mode=${WRITE?'write':'check'}`);
if(!WRITE&&changed) process.exit(1);
