#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const ROOT=path.resolve(import.meta.dirname,"..");
const dir=path.join(ROOT,"assets/assessment-banks/year4/english");
const files=fs.readdirSync(dir).filter(name=>/^ac9e4.*\.json$/.test(name));
const failures=[];let items=0,sensitive=0;
const norm=value=>String(value??"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
for(const file of files)for(const item of JSON.parse(fs.readFileSync(path.join(dir,file),"utf8"))){items++;
 if(item.question!==item.audio_prompt)failures.push(`${item.id}: prompt/audio mismatch`);
 if(/\{\{blank\}\}|_{2,}|\/{1}[^/]+\/{1}|→|←/.test(item.question))failures.push(`${item.id}: unsafe spoken marker`);
 const choices=item.answers.map(answer=>answer.text);if(new Set(choices.map(norm)).size!==3&&(!Array.isArray(item.audio_answers)||new Set(item.audio_answers.map(norm)).size!==3))failures.push(`${item.id}: speech-indistinct choices lack distinct audio descriptions`);
 if(/(?:LY09|LY10|LY11)$/.test(item.curriculum_code)){sensitive++;if(!Array.isArray(item.audio_answers)||item.audio_answers.length!==3)failures.push(`${item.id}: spelling audio choices missing`);else if(new Set(item.audio_answers.map(norm)).size!==3)failures.push(`${item.id}: spelling audio choices are not distinct`);}
 if(/(?:LA07|LA08|LA09|LA10|LA11|LA12)$/.test(item.curriculum_code)&&Array.isArray(item.audio_answers)&&item.audio_answers.length!==3)failures.push(`${item.id}: editing audio choices malformed`);
}
console.log(JSON.stringify({codes:files.length,items,ttsSensitiveItems:sensitive,unsafeMarkers:failures.length,status:failures.length?"FAIL":"PASS"},null,2));
if(failures.length){console.error(failures.join("\n"));process.exit(1);}
