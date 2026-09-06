import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const ROOT=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,'assets','year8-10-english-curriculum-focus.json'),'utf8'));
for(const code of manifest.years['8']){
  const rel=`assets/assessment-banks/year8/english/${code.toLowerCase()}.json`;
  const source=execFileSync('git',['show',`origin/main:${rel}`],{cwd:ROOT,encoding:'utf8',maxBuffer:10*1024*1024});
  fs.writeFileSync(path.join(ROOT,rel),source);
}
console.log('Reset Year 8 English source banks from origin/main before re-authoring.');
