import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { LA_ITEMS } from "./year3_english_items_la.mjs";
import { LE_LY_ITEMS } from "./year3_english_items_le_ly.mjs";

const ROOT=path.resolve(import.meta.dirname,"..");
const BANK_ROOT=path.join(ROOT,"assets/assessment-banks/year3/english");
const VISUAL_ROOT=path.join(ROOT,"assets/assessment-visuals/year3/english");
const c={window:{}};vm.createContext(c);
for(const file of ["assets/year3-subject-data-base.js","assets/year3-english-data-la1.js","assets/year3-english-data-la2.js","assets/year3-english-data-la3a.js","assets/year3-english-data-la3b.js","assets/year3-english-data-le.js","assets/year3-english-data-ly1.js","assets/year3-english-data-ly2.js"])vm.runInContext(fs.readFileSync(path.join(ROOT,file),"utf8"),c,{filename:file});
const UNITS=c.window.SkillrYear3EnglishData,CODES=Object.keys(UNITS).sort(),SOURCES={...LA_ITEMS,...LE_LY_ITEMS};
const clean=v=>String(v).replace(/\s+/g," ").trim();
const norm=v=>clean(v).toLowerCase();
const esc=v=>String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

function itemFor(code,source,index){
 const bank=index<24?"practice":"test",bankIndex=bank==="practice"?index:index-24,correctIndex=(bankIndex+CODES.indexOf(code))%3;
 const choices=[source.correct,...source.wrong];if(source.wrong.length!==2||new Set(choices.map(norm)).size!==3)throw new Error(`${code} ${index}: choices`);
 const ordered=[...source.wrong];ordered.splice(correctIndex,0,source.correct);
 const id=`${code}-${bank==="practice"?"P":"T"}-${String(bankIndex+1).padStart(3,"0")}`,visualId=id.toLowerCase();
 return{id,subject:"english",year_level:"Year 3",curriculum_code:code,bank,skill:UNITS[code].title,question:source.question,audio_prompt:source.question,visual:{type:"svg",asset_path:`/assets/assessment-visuals/year3/english/${code.toLowerCase()}.svg#${visualId}`,alt_text:source.visual.alt},answers:ordered.map((text,j)=>({text,is_correct:j===correctIndex})),correct_index:correctIndex,explanation:{summary:source.summary,hint:source.hint},_visual_id:visualId,_model:source.visual};
}
function wrap(value,max=34){const words=clean(value).split(" "),out=[];let line="";for(const word of words){if(clean(`${line} ${word}`).length>max&&line){out.push(line);line=word}else line=clean(`${line} ${word}`)}if(line)out.push(line);return out.slice(0,4)}
function label(value,x,y,size=18){return wrap(value).map((line,i)=>`<text x="${x}" y="${y+i*(size+5)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="700" fill="#17324d">${esc(line)}</text>`).join("")}
function body(model){const items=(model.items||[]).flat(2).map(String).slice(0,6);if(model.kind==="flow"){return items.slice(0,5).map((x,i)=>`<rect x="${35+i*150}" y="175" width="130" height="110" rx="16" fill="${i%2?'#ede9fe':'#dbeafe'}" stroke="#4f46e5" stroke-width="3"/>${label(x,100+i*150,215,16)}${i<Math.min(items.length,5)-1?`<path d="M168 230H181" stroke="#17324d" stroke-width="4" marker-end="url(#arrow)"/>`:""}`).join("")};return items.map((x,i)=>{const col=i%3,row=Math.floor(i/3);return `<rect x="${45+col*245}" y="${115+row*155}" width="215" height="120" rx="18" fill="${i%2?'#ede9fe':'#dbeafe'}" stroke="#4f46e5" stroke-width="3"/>${label(x,152+col*245,150+row*155,16)}`}).join("")}
function sprite(items){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440"><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#17324d"/></marker></defs>${items.map(x=>`<symbol id="${x._visual_id}" viewBox="0 0 800 440"><rect width="800" height="440" rx="24" fill="#fafafa"/><rect x="20" y="20" width="760" height="400" rx="20" fill="none" stroke="#cbd5e1" stroke-width="3"/>${label(x.skill,400,58,20)}${body(x._model)}</symbol>`).join("")}</svg>\n`}
fs.mkdirSync(BANK_ROOT,{recursive:true});fs.mkdirSync(VISUAL_ROOT,{recursive:true});
for(const code of CODES){const source=SOURCES[code];if(!source||source.length!==40)throw new Error(`${code}: expected 40 source items`);const prompts=new Set(source.map(x=>norm(x.question)));if(prompts.size!==40)throw new Error(`${code}: duplicate source prompt`);const items=source.map((x,i)=>itemFor(code,x,i));fs.writeFileSync(path.join(BANK_ROOT,`${code.toLowerCase()}.json`),JSON.stringify(items.map(({_visual_id,_model,...x})=>x),null,2)+"\n");fs.writeFileSync(path.join(VISUAL_ROOT,`${code.toLowerCase()}.svg`),sprite(items));}
console.log(JSON.stringify({status:"BUILT",codes:CODES.length,practice:CODES.length*24,test:CODES.length*16,total:CODES.length*40},null,2));
