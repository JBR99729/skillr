import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT=path.resolve(import.meta.dirname,"..");
const meta={
  AC9S1H01:{title:"Science in daily life",notes:["People use observations and measurements to make everyday decisions.","A scientific prediction uses a pattern but does not claim certainty.","Record evidence so it can be checked and compared later."]},
  AC9S1I01:{title:"Questions, patterns and predictions",notes:["Ask questions that can be explored safely with observations.","Make a prediction before testing and give a relevant experience-based reason.","Record the real result even when it does not match the prediction."]},
  AC9S1I02:{title:"Safe investigation procedures",notes:["Listen to instructions and check the area before starting.","Use teacher-approved equipment and keep the investigation controlled.","Stop and tell an adult when you notice a spill, sharp object or unknown substance."]},
  AC9S1I03:{title:"Making and recording observations",notes:["An observation tells what was noticed or measured, not an untested cause.","Use suitable tools, numbers, units, dates and labels.","Repeat the same method when observations need to be compared."]},
  AC9S1I04:{title:"Sorting data and representing patterns",notes:["Sort items using one clear observable feature.","Label each category and count every item once.","Use the recorded totals to describe most, least, equal or repeated patterns."]},
  AC9S1I05:{title:"Comparing observations and predictions",notes:["Keep the original prediction and compare it with the observed result.","Use all relevant results, not only the result that supports the prediction.","Repeated trials help show whether a result is consistent or varied."]},
  AC9S1I06:{title:"Communicating scientific ideas",notes:["Begin with a clear title that names the investigation or observation.","Use a labelled visual and a precise evidence statement.","Explain the finding so the audience can see how it came from the evidence."]},
  AC9S1U01:{title:"Needs of plants and animals",notes:["Living things need suitable resources and conditions to live.","Plants and animals share some needs, but the exact food, shelter and habitat can differ.","A suitable habitat provides water, food or light, air, shelter and space."]},
  AC9S1U02:{title:"Daily and seasonal changes",notes:["Light, temperature, weather, plants and animal activity can change over time.","Day and night repeat daily; seasonal patterns develop across weeks and months.","Record observations at similar times to compare changes fairly."]},
  AC9S1U03:{title:"Pushes and pulls",notes:["A force is a push or pull that can affect motion or shape.","Compare gentle and stronger forces using the same object and surface.","Describe or measure changes in distance, speed, direction or shape."]}
};

function listHtml(items){return `<ul>${items.map(item=>`<li>${item}</li>`).join("")}</ul>`;}
function replaceSection(html,heading,notes){return html.replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/,`<section class="pre-read-notes"><h2>${heading}</h2>${listHtml(notes)}</section>`);}

for(const [code,info] of Object.entries(meta)){
  const codeLower=code.toLowerCase();
  const bank=`assets/assessment-banks/year1/science/${codeLower}.json`;
  execFileSync(process.execPath,["scripts/publish_production_question_bank.mjs",bank],{cwd:ROOT,stdio:"inherit"});
  const route=path.join(ROOT,"quiz","year-1","science",codeLower);

  const activityFile=path.join(route,"index.html");
  let activity=fs.readFileSync(activityFile,"utf8");
  activity=activity
    .replace(/<p>Choose a learning activity\. Worksheet, Practice and Test use the same eight-question unit bank\.<\/p>/,`<p>Choose a learning activity. Practice draws from 24 questions, while Test uses a separate 16-question bank.</p>`)
    .replace(/<p>This QA-reviewed unit provides \d+ Practice questions, \d+ auto-marked Test questions[^<]*<\/p>/,`<p>This QA-reviewed unit provides 24 Practice questions and 16 separate Test questions.</p>`);
  activity=replaceSection(activity,"Unit focus",info.notes);
  fs.writeFileSync(activityFile,activity);

  for(const bankName of ["practice","test"]){
    const file=path.join(route,bankName,"index.html");
    let html=fs.readFileSync(file,"utf8");
    const isTest=bankName==="test";
    const attempt=isTest?12:8;
    const bankCount=isTest?16:24;
    const description=isTest
      ? `Take a 12-question Year 1 ${info.title} test drawn from a separate 16-question bank.`
      : `Practise Year 1 ${info.title} with rotating questions from a 24-question bank.`;
    html=html
      .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${description}">`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/,`<section class="pre-read-notes"><h2>Quick preparation</h2>${listHtml(info.notes)}</section>`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/,`<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${bankCount}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/,`"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":false/,`"shuffleQuestions":true`)
      .replace(/"questionCycle":false/,`"questionCycle":true`)
      .replace(/questions\.js\?v=[^"]+/,`questions.js?v=20260813-production-v1`);
    fs.writeFileSync(file,html);
  }
}

console.log(JSON.stringify({codes:Object.keys(meta).length,practiceBank:24,testBank:16,practiceAttempt:8,testAttempt:12,status:"PUBLISHED"},null,2));
