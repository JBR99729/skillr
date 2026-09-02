#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { LA123_ITEMS } from "./year2_english_items_la123.mjs";
import { LA_ITEMS } from "./year2_english_items_la.mjs";
import { LE_ITEMS } from "./year2_english_items_le.mjs";
import { LY_ITEMS } from "./year2_english_items_ly.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year2", "english");
const QUIZ_ROOT = path.join(ROOT, "quiz", "year-2", "english");
const ITEM_SETS = { ...LA123_ITEMS, ...LA_ITEMS, ...LE_ITEMS, ...LY_ITEMS };
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/year2-english-data.js"), "utf8"), context, { filename:"assets/year2-english-data.js" });
const units = context.window.SkillrYear2EnglishData;
const codes = context.window.SkillrYear2EnglishOrder;
if (!Array.isArray(codes) || codes.length !== 27) throw new Error(`Expected 27 Year 2 English codes, found ${codes?.length || 0}`);

const clean = (v) => String(v ?? "").replace(/\s+/g," ").trim();
const slug = (v) => clean(v).toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"").slice(0,56);
const orderedAnswers = (correct, wrong, correctIndex) => {
  const distinct = [...new Set(wrong.map(clean).filter(Boolean).filter((x)=>x!==clean(correct)))];
  while (distinct.length < 2) distinct.push(distinct.length ? "That choice does not use the important clue in the example." : "That choice does not fit the situation.");
  const values = distinct.slice(0,2);
  values.splice(correctIndex,0,clean(correct));
  return values.map((text,index)=>({text,is_correct:index===correctIndex}));
};

function make(code, unit, bank, stage, number, source, kind, sourceIndex) {
  const wrongA = clean(source.wrong[0]);
  const wrongB = clean(source.wrong[1]);
  let question, correct, wrong, summary, hint;
  if (kind === "direct") {
    question = clean(source.question);
    correct = clean(source.correct);
    wrong = [wrongA, wrongB];
    summary = clean(source.summary);
    hint = clean(source.hint);
  } else if (kind === "explain") {
    question = `${clean(source.question)} Why is “${clean(source.correct)}” the best answer?`;
    correct = clean(source.summary);
    wrong = [
      `It is best only because it is longer than “${wrongA}”.`,
      `It is best because the details in the situation do not matter.`
    ];
    summary = clean(source.summary);
    hint = clean(source.hint);
  } else if (kind === "discriminate") {
    question = `${clean(source.question)} Which response is the clearest mix-up to avoid?`;
    correct = wrongA;
    wrong = [clean(source.correct), wrongB];
    summary = `“${wrongA}” is the mix-up to avoid. ${clean(source.hint)}`;
    hint = clean(source.hint);
  } else if (kind === "apply") {
    question = `Use this clue: ${clean(source.hint)} ${clean(source.question)}`;
    correct = clean(source.correct);
    wrong = [wrongB, wrongA];
    summary = clean(source.summary);
    hint = `Use the clue first, then check which response fits the exact people, purpose, text or language feature in the example.`;
  } else if (kind === "test-reason") {
    question = `${clean(source.question)} Which reason best supports the correct choice?`;
    correct = clean(source.summary);
    wrong = [
      `The correct choice is simply the most formal-sounding option.`,
      `The correct choice works even if the situation and audience are ignored.`
    ];
    summary = clean(source.summary);
    hint = clean(source.hint);
  } else throw new Error(`Unknown kind ${kind}`);

  const correctIndex = (number + codes.indexOf(code)) % 3;
  return {
    id:`${code}-${bank === "practice" ? "P" : "T"}-${String(number+1).padStart(3,"0")}`,
    subject:"english",
    year_level:"Year 2",
    curriculum_code:code,
    bank,
    stage,
    skill:`${slug(source.title)}_${kind}`,
    question,
    audio_prompt:question,
    visual:{type:"none",alt_text:""},
    answers:orderedAnswers(correct,wrong,correctIndex),
    correct_index:correctIndex,
    explanation:{summary,hint},
    difficulty:stage === "recognise" ? 1 : stage === "explain" ? 2 : 3,
    difficulty_tier:stage === "recognise" ? "confidence" : stage === "explain" ? "core" : "application",
    sequence_priority:number+1,
    quality_schema:"student-facing-v3"
  };
}

fs.mkdirSync(BANK_ROOT,{recursive:true});
const report=[];
for (const code of codes) {
  const unit = units[code];
  const sources = ITEM_SETS[code];
  if (!Array.isArray(sources) || sources.length !== 20) throw new Error(`${code}: expected 20 authored source examples, found ${sources?.length || 0}`);
  const practiceSources = sources.slice(0,12);
  const testSources = sources.slice(12,20);
  const practice=[];
  for(let i=0;i<10;i++) practice.push(make(code,unit,"practice","recognise",practice.length,practiceSources[i],"direct",i));
  for(let i=0;i<10;i++) practice.push(make(code,unit,"practice","explain",practice.length,practiceSources[i],"explain",i));
  for(let i=0;i<10;i++) practice.push(make(code,unit,"practice","discriminate",practice.length,practiceSources[(i+2)%12],"discriminate",(i+2)%12));
  for(let i=0;i<10;i++) practice.push(make(code,unit,"practice","apply",practice.length,practiceSources[(i+2)%12],"apply",(i+2)%12));

  const test=[];
  for(let i=0;i<8;i++) test.push(make(code,unit,"test","verify",test.length,testSources[i],"direct",i));
  for(let i=0;i<8;i++) test.push(make(code,unit,"test","apply",test.length,testSources[i],"test-reason",i));

  if(practice.length!==40||test.length!==16) throw new Error(`${code}: expected 40/16, got ${practice.length}/${test.length}`);
  const practiceQuestions = practice.map(x=>x.question.toLowerCase());
  if(new Set(practiceQuestions).size!==40) throw new Error(`${code}: duplicate practice stems`);
  const practiceSourceQuestions = new Set(practiceSources.map(x=>clean(x.question).toLowerCase()));
  if(test.some(x=>practiceSourceQuestions.has(x.question.toLowerCase()))) throw new Error(`${code}: test reused a practice source question`);

  fs.writeFileSync(path.join(BANK_ROOT,`${code.toLowerCase()}.json`),`${JSON.stringify([...practice,...test],null,2)}\n`);
  const qa={code,title:unit.title,practice:40,test:16,items:56,progression:["recognise","explain","discriminate","apply"],practiceSourceExamples:12,testOnlySourceExamples:8,qualitySchema:"student-facing-v3",source:"20 authored Year 2 curriculum-specific examples per code",fixes:["Practice rebuilt from direct age-appropriate examples rather than curriculum-label prompts.","Practice progresses from recognition to explanation, misconception discrimination and application.","Test uses the eight test-only authored source examples, separate from the twelve practice source examples.","Feedback explains the evidence or clue that makes an answer work.","Classroom View is not generated or modified by this rebuild."]};
  fs.writeFileSync(path.join(BANK_ROOT,`${code.toLowerCase()}-qa-log.json`),`${JSON.stringify(qa,null,2)}\n`);
  report.push(qa);
}

execFileSync(process.execPath,["scripts/publish_year2_english_quality_banks.mjs"],{cwd:ROOT,stdio:"inherit"});

for(const code of codes){
  const route=path.join(QUIZ_ROOT,code.toLowerCase());
  const activityPath=path.join(route,"index.html");
  if(fs.existsSync(activityPath)){
    let html=fs.readFileSync(activityPath,"utf8");
    html=html.replace(/Practice draws from 24 questions, while Test uses a separate 16-question bank\./g,"Practice contains 40 progressive questions, while Test uses a separate 16-question bank.")
      .replace(/24 Practice questions/g,"40 Practice questions").replace(/24-question/gi,"40-question").replace(/24 questions/gi,"40 questions");
    fs.writeFileSync(activityPath,html);
  }
  const practicePath=path.join(route,"practice","index.html");
  if(fs.existsSync(practicePath)){
    let html=fs.readFileSync(practicePath,"utf8");
    html=html.replace(/24-question/gi,"40-question").replace(/24 questions/gi,"40 questions").replace(/rotating questions/gi,"progressive questions")
      .replace(/"maxQuestions":\d+/,'"maxQuestions":40').replace(/"shuffleQuestions":true/,'"shuffleQuestions":false').replace(/"questionCycle":true/,'"questionCycle":false');
    fs.writeFileSync(practicePath,html);
  }
}

for(const code of codes){
  const json=JSON.parse(fs.readFileSync(path.join(BANK_ROOT,`${code.toLowerCase()}.json`),"utf8"));
  const p=json.filter(x=>x.bank==="practice"),t=json.filter(x=>x.bank==="test");
  if(p.length!==40||t.length!==16) throw new Error(`${code}: final count failed`);
  for(const [stage,start] of [["recognise",0],["explain",10],["discriminate",20],["apply",30]]) if(p.slice(start,start+10).some(x=>x.stage!==stage)) throw new Error(`${code}: ${stage} block failed`);
  for(const item of json){if(item.answers.length!==3||item.answers.filter(a=>a.is_correct).length!==1) throw new Error(`${item.id}: answer integrity failed`);}
  if(!fs.existsSync(path.join(QUIZ_ROOT,code.toLowerCase(),"practice","questions.js"))) throw new Error(`${code}: published practice missing`);
  if(!fs.existsSync(path.join(QUIZ_ROOT,code.toLowerCase(),"test","questions.js"))) throw new Error(`${code}: published test missing`);
}
console.log(JSON.stringify({status:"YEAR2_ENGLISH_ACTUAL_BANKS_REBUILT",codes:27,practicePerCode:40,testPerCode:16,totalPractice:1080,totalTest:432,totalQuestions:1512},null,2));
