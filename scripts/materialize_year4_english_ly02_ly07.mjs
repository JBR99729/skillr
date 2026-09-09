#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const CODES = ["AC9E4LY02","AC9E4LY03","AC9E4LY04","AC9E4LY05","AC9E4LY06","AC9E4LY07"];
const SRC = path.join(ROOT,"scripts","year4-english-ly02-ly07");

const practiceStems = [
  b => [`${b.context} Which option best demonstrates the skill?`, b.correct, b.distractors, b.rationale],
  b => [`${b.context} Which choice is the strongest response?`, b.correct, b.distractors, b.rationale],
  b => [`${b.context} Why is “${b.correct}” the strongest choice?`, b.rationale, ["It is longest, so it must be correct.","It avoids using evidence from the situation.","It changes the task instead of responding to it."], b.rationale],
  b => [`${b.context} Which choice should be rejected first because it does not meet the purpose of the task?`, b.distractors[0], [b.correct,b.distractors[1],b.distractors[2]], `“${b.distractors[0]}” should be rejected because it does not meet the task as well as the evidence-based choice. ${b.rationale}`],
  b => [`${b.context} Which revision best improves “${b.distractors[0]}”?`, b.correct, b.distractors, b.rationale],
  b => [`${b.context} Which clue should guide your decision?`, b.hint, ["Choose the option with the most words.","Ignore the context and choose the first familiar phrase.","Prefer a vague answer so it can fit anything."], b.rationale],
  b => [`${b.context} A student chooses “${b.distractors[1]}”. Which feedback would best help them correct the choice?`, `Re-check the task and use this principle: ${b.hint}`, ["Keep the answer because first choices should never change.","Choose a longer answer without checking meaning.","Ignore the task context and focus only on spelling."], b.rationale],
  b => [`${b.context} Which option applies the same skill accurately in this situation?`, b.correct, b.distractors, b.rationale]
];
const testStems = [
  b => [`Unseen context: ${b.context} Which option is best?`, b.correct, b.distractors, b.rationale],
  b => [`Unseen context: ${b.context} Which explanation best justifies “${b.correct}”?`, b.rationale, ["It is correct because it is the longest option.","It works by ignoring the purpose of the task.","It avoids using the information supplied."], b.rationale],
  b => [`Unseen context: ${b.context} Which choice should be rejected first?`, b.distractors[0], [b.correct,b.distractors[1],b.distractors[2]], `“${b.distractors[0]}” does not meet the task. ${b.rationale}`],
  b => [`Unseen context: ${b.context} Which principle should guide the final decision?`, b.hint, ["Choose the most complicated wording.","Ignore the audience or purpose.","Use only the first word as a clue."], b.rationale]
];
function rotate(arr,shift){ shift %= arr.length; return arr.slice(shift).concat(arr.slice(0,shift)); }
function build(code,cfg){
  const items=[]; let n=0;
  for(const b of cfg.practice){
    practiceStems.forEach((fn,vi)=>{
      n++;
      const [q,corr,dis,summary]=fn(b);
      const answers=rotate([corr,...dis],(n-1)%4); const ci=answers.indexOf(corr);
      items.push({id:`${code}-P-${String(n).padStart(3,"0")}`,subject:"english",year_level:"Year 4",curriculum_code:code,bank:"practice",stage:["recognise","recognise","explain","discriminate","discriminate","explain","reflect","apply"][vi],skill:b.skill,question:q,audio_prompt:q,visual:{type:"none",alt_text:""},answers:answers.map((text,i)=>({text,is_correct:i===ci})),correct_index:ci,explanation:{summary,hint:b.hint},curriculum_coverage:b.coverage,difficulty:vi<2?1:(vi<6?2:3),sequence_priority:n});
    });
  }
  let t=0;
  for(const b of cfg.test){
    testStems.forEach((fn,vi)=>{
      t++;
      const [q,corr,dis,summary]=fn(b);
      const answers=rotate([corr,...dis],(t+1)%4); const ci=answers.indexOf(corr);
      items.push({id:`${code}-T-${String(t).padStart(3,"0")}`,subject:"english",year_level:"Year 4",curriculum_code:code,bank:"test",stage:vi<2?"verify":"apply",skill:b.skill,question:q,audio_prompt:q,visual:{type:"none",alt_text:""},answers:answers.map((text,i)=>({text,is_correct:i===ci})),correct_index:ci,explanation:{summary,hint:b.hint},curriculum_coverage:b.coverage,difficulty:vi<2?2:3,sequence_priority:t});
    });
  }
  return items;
}
function alias(items,bank){
  const rows=items.filter(x=>x.bank===bank).map(x=>({id:x.id.toLowerCase(),curriculumCode:x.curriculum_code,bank,skill:x.skill,printable:true,type:"single",question:x.question,audioPrompt:x.audio_prompt,visual:"",visualHtml:"",visualMeta:x.visual,answers:x.answers.map(a=>a.text),difficulty:x.difficulty,sequencePriority:x.sequence_priority,correct:x.correct_index,explanation:`${x.explanation.summary}\nHint: ${x.explanation.hint}`,structuredExplanation:x.explanation,qualitySchema:"production-v1"}));
  const v=bank==="practice"?"skillrPracticeQuestions":"skillrTestQuestions";
  return `"use strict";\nwindow.${v} = ${JSON.stringify(rows,null,2)};\nwindow.quizQuestions = window.${v};\n`;
}
const globalPrompts=new Set();
for(const code of CODES){
  const cfg=JSON.parse(fs.readFileSync(path.join(SRC,code.toLowerCase()+".json"),"utf8"));
  const items=Array.isArray(cfg.items) ? cfg.items : build(code,cfg);
  const slug=code.toLowerCase();
  const p=items.filter(x=>x.bank==="practice"), t=items.filter(x=>x.bank==="test");
  if(p.length!==48||t.length!==16) throw new Error(`${code}: expected 48/16, got ${p.length}/${t.length}`);
  if(new Set(items.map(x=>x.id)).size!==64) throw new Error(`${code}: duplicate IDs`);
  if(new Set(items.map(x=>x.question)).size!==64) throw new Error(`${code}: duplicate prompts`);
  for(const x of items){
    if(globalPrompts.has(x.question)) throw new Error(`cross-code duplicate prompt: ${x.id}`);
    globalPrompts.add(x.question);
    if(x.answers.length!==4||x.answers.filter(a=>a.is_correct).length!==1) throw new Error(`${x.id}: invalid answer schema`);
    if(x.correct_index<0||x.correct_index>3||!x.answers[x.correct_index].is_correct) throw new Error(`${x.id}: invalid correct index`);
  }
  const coverage=new Set(items.flatMap(x=>x.curriculum_coverage));
  const expected=Array.isArray(cfg.items) ? new Set(cfg.items.flatMap(x=>x.curriculum_coverage)) : new Set(cfg.practice.concat(cfg.test).flatMap(x=>x.coverage));
  for(const needed of expected) if(!coverage.has(needed)) throw new Error(`${code}: missing ${needed}`);
  const pr=alias(items,"practice"), te=alias(items,"test");
  fs.writeFileSync(path.join(ROOT,"assets/assessment-banks/year4/english",slug+".json"),JSON.stringify(items,null,2)+"\n");
  fs.writeFileSync(path.join(ROOT,"quiz/year-4/english",slug,"practice/questions.js"),pr);
  fs.writeFileSync(path.join(ROOT,"quiz/year-4/english",slug,"practice/practice-questions.js"),pr);
  fs.writeFileSync(path.join(ROOT,"quiz/year-4/english",slug,"test/questions.js"),te);
  console.log(`${code}: 48 Practice / 16 Test`);
}
if(globalPrompts.size!==384) throw new Error(`Expected 384 unique prompts, got ${globalPrompts.size}`);
console.log("PASS: 384 unique LY02-LY07 candidate assessment items materialised; verification ledger unchanged.");
