#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const sourcePath=path.join(root,"curriculum-question-banks/banks/foundation/foundation-maths-production-v2.json");
const source=JSON.parse(fs.readFileSync(sourcePath,"utf8"));
const shapes=["Circle","Square","Triangle","Star","Diamond","Hexagon"];
const label=answer=>String(answer?.label??answer?.text??answer);

function thirdChoice(item){
  const labels=item.answers.map(label);
  if(labels.every(value=>/^-?\d+$/.test(value))){
    const correct=Number(labels[item.correct_index]);
    for(const value of [correct+1,correct-1,correct+2]) if(!labels.includes(String(value))) return String(value);
  }
  if(/Which group has more/i.test(item.question)&&!labels.includes("Group B")) return "Group B";
  if(/chart/i.test(item.question)&&labels.includes("Cats")&&!labels.includes("Dogs")) return "Dogs";
  if(labels.every(value=>shapes.includes(value))) return shapes.find(value=>!labels.includes(value));
  if(labels.includes("True")&&labels.includes("False")) return "The word has no maths meaning";
  throw new Error(`No reviewed third-choice rule for ${item.id}: ${labels.join(" | ")}`);
}

function answerObject(value,isCorrect){
  if(value&&typeof value==="object") return isCorrect===undefined?value:{...value,is_correct:isCorrect};
  return {text:String(value),label:String(value),is_correct:Boolean(isCorrect)};
}

let addedChoices=0;
for(const topic of source.topics){
  let singleIndex=0;
  const promptCounts=new Map();
  for(const item of topic.items){
    item.question=item.question.replace(/^Look at .+ card \d+\. /,"");
    if(item.id==="AC9MFN03-D-013"&&item.question==="Which group has more?") item.question="Zara compares two groups. Which group has more?";
    item.answers=item.answers?.map((answer,index)=>answerObject(answer,item.type==="single"?index===item.correct_index:undefined));
    if(item.type==="single"&&item.answers?.length===2){
      item.answers.push(answerObject(thirdChoice(item),false));
      addedChoices+=1;
    }
    if(item.type==="single"&&item.answers?.length===3){
      const target=singleIndex%3;
      const correct=item.answers[item.correct_index];
      const distractors=item.answers.filter((_,index)=>index!==item.correct_index);
      item.answers=[...distractors];
      item.answers.splice(target,0,correct);
      item.correct_index=target;
      singleIndex+=1;
    }
    const occurrence=(promptCounts.get(item.question)||0)+1;
    promptCounts.set(item.question,occurrence);
    if(occurrence>1) item.question=`Look at ${topic.title.toLowerCase()} card ${occurrence}. ${item.question}`;
    item.audio_prompt=item.question;
  }
}

fs.writeFileSync(sourcePath,`${JSON.stringify(source,null,2)}\n`);
console.log(JSON.stringify({topics:source.topics.length,addedChoices}));
