#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const baselineRef=process.argv[2]||"origin/main";
const files=["catalog.js","science-quick-read.js","science-master-questions.js"];
const clean=value=>String(value??"").replace(/\s+/g," ").trim();
const key=value=>clean(value).toLocaleLowerCase("en-AU");
const failures=[];

function context(source){
  const result=vm.createContext({window:{},console});
  for(const file of files) vm.runInContext(source(file),result,{filename:file});
  return result;
}

const current=context(file=>fs.readFileSync(path.join(root,"quiz/assets/daily-drills",file),"utf8"));
const baseline=context(file=>execFileSync("git",["show",`${baselineRef}:quiz/assets/daily-drills/${file}`],{
  cwd:root,encoding:"utf8",maxBuffer:64*1024*1024
}));
const semanticAnswer=item=>{
  if(item.type==="single"||item.type==="true-false") return item.answers?.[item.correct];
  if(item.type==="multiple") return (item.correct||[]).map(index=>item.answers?.[index]).sort();
  return item.correct??item.acceptedAnswers??item.items;
};
const totals={topics:0,questions:0,earlyQuestions:0,byYear:{}};
const globalIds=new Set();

for(const [year,data] of Object.entries(current.window.SkillrDailyCatalog.years)){
  for(const topic of data.science||[]){
    const slug=topic.slug||topic.id;
    const label=`${year}/science/${slug}`;
    const before=baseline.window.SkillrDailyScience.generate(year,slug);
    const after=current.window.SkillrDailyScience.generate(year,slug);
    totals.topics+=1;
    totals.questions+=after.length;
    totals.byYear[year]=(totals.byYear[year]||0)+after.length;
    if(before.length!==after.length) failures.push(`${label}: count changed ${before.length} -> ${after.length}`);
    const prompts=new Set(),positions=[0,0,0];
    after.forEach((item,index)=>{
      const old=before[index];
      if(!old) return;
      for(const field of ["id","type","year","subject","skill","set","difficulty"]){
        if(clean(old[field])!==clean(item[field])) failures.push(`${label}/${item.id}: ${field} changed`);
      }
      if(JSON.stringify(semanticAnswer(old))!==JSON.stringify(semanticAnswer(item))) failures.push(`${label}/${item.id}: semantic answer changed`);
      if(globalIds.has(item.id)) failures.push(`${label}/${item.id}: duplicate global id`);
      globalIds.add(item.id);
      if(prompts.has(key(item.question))) failures.push(`${label}/${item.id}: duplicate visible prompt`);
      prompts.add(key(item.question));
      if(clean(item.audioPrompt)!==clean(item.question)) failures.push(`${label}/${item.id}: audioPrompt mismatch`);
      if(!clean(item.hint)||!clean(item.explanation)) failures.push(`${label}/${item.id}: missing hint or explanation`);
      if(/opposite of this claim|not enough information to discuss|best supported by the quick read/i.test(item.question+" "+(item.answers||[]).join(" "))) failures.push(`${label}/${item.id}: weak legacy wording remains`);
      if(year==="F"||Number(year)<=2){
        totals.earlyQuestions+=1;
        if(clean(item.question).split(/\s+/).length>30) failures.push(`${label}/${item.id}: early-years prompt exceeds 30 words`);
        if(/scientifically accurate|evaluate a claim|topic evidence/i.test(item.question)) failures.push(`${label}/${item.id}: early-years wording is too advanced`);
      }
      if(Array.isArray(item.answers)&&new Set(item.answers.map(key)).size!==item.answers.length) failures.push(`${label}/${item.id}: duplicate answer choices`);
      if(item.type==="single"){
        if(item.answers?.length!==3||!Number.isInteger(item.correct)||item.correct<0||item.correct>2) failures.push(`${label}/${item.id}: invalid three-choice item`);
        else positions[item.correct]+=1;
      }
    });
    if(Math.max(...positions)-Math.min(...positions)>2) failures.push(`${label}: unbalanced A/B/C positions ${positions.join("/")}`);
  }
}

if(totals.topics!==80) failures.push(`expected 80 topics, found ${totals.topics}`);
if(totals.questions!==16000) failures.push(`expected 16000 questions, found ${totals.questions}`);
if(globalIds.size!==16000) failures.push(`expected 16000 unique IDs, found ${globalIds.size}`);

if(failures.length){
  console.error(`Daily Drill Science quality validation FAILED (${failures.length})`);
  console.error(failures.slice(0,100).join("\n"));
  process.exit(1);
}
console.log("Daily Drill Science quality validation passed.");
console.log(JSON.stringify({baselineRef,...totals,uniqueIds:globalIds.size},null,2));
