"use strict";
const fs=require("fs"),vm=require("vm");
const codes=["ac9m1n04","ac9m1n05","ac9m1n06"];
const expected={practice:28,test:12,quiz:50};
let svgCount=0;
function load(file){const w={};const c={window:w,console};vm.createContext(c);vm.runInContext(fs.readFileSync(file,"utf8"),c,{filename:file});return w;}
function sig(q){return `${q.question}\n${q.image||q.visual||""}`;}
for(const code of codes){
  const sets={};
  for(const bank of ["practice","test","quiz"]){
    const file=bank==="quiz"?`quiz/year-1/math/${code}/questions.js`:`quiz/year-1/math/${code}/${bank}/questions.js`;
    const w=load(file),qs=w.quizQuestions;
    if(!Array.isArray(qs)||qs.length!==expected[bank])throw Error(`${file}: expected ${expected[bank]}, got ${qs?.length}`);
    if(bank==="practice"&&w.skillrPracticeQuestions!==qs)throw Error(`${file}: practice handoff`);
    if(bank==="test"&&(w.skillrTestQuestions!==qs||w.skillrExamQuestions!==qs))throw Error(`${file}: test handoff`);
    if(bank==="quiz"&&w.skillrQuizQuestions!==qs)throw Error(`${file}: quiz handoff`);
    if(new Set(qs.map(q=>q.id)).size!==qs.length)throw Error(`${file}: duplicate ids`);
    const minimumSkills={practice:20,test:10,quiz:15}[bank];
    if(new Set(qs.map(q=>q.skill)).size<minimumSkills)throw Error(`${file}: insufficient skill variety`);
    if(new Set(qs.map(sig)).size!==qs.length)throw Error(`${file}: duplicate scenes`);
    if(qs.some(q=>!q.question||!q.skill||!q.explanation||q.type==="self-check"))throw Error(`${file}: incomplete/subjective item`);
    for(const q of qs){
      if(q.image){
        svgCount+=1;
        if(!q.imageAlt||!q.image.startsWith("data:image/svg+xml")||!decodeURIComponent(q.image).includes('width="13cm"'))throw Error(`${q.id}: invalid, inaccessible or undersized SVG`);
      }
      if(q.type==="single"){if(!Array.isArray(q.answers)||q.answers.length!==4||new Set(q.answers.map(String)).size!==q.answers.length||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.answers.length)throw Error(`${q.id}: bad single`);}
      else if(q.type==="true-false"){if(!Array.isArray(q.answers)||q.answers.length!==2||!Number.isInteger(q.correct)||q.correct<0||q.correct>=2)throw Error(`${q.id}: bad true-false`);}
      else if(q.type==="multiple"){if(!Array.isArray(q.answers)||q.answers.length!==4||new Set(q.answers.map(String)).size!==q.answers.length||!Array.isArray(q.correct)||q.correct.length<2||q.correct.some(i=>i<0||i>=q.answers.length))throw Error(`${q.id}: bad multiple`);}
      else if(q.type==="order"){if(!Array.isArray(q.items)||!Array.isArray(q.correct)||q.items.length!==q.correct.length||new Set(q.items).size!==q.items.length)throw Error(`${q.id}: bad order`);}
      else if(q.type==="number"){if(typeof q.correct!=="number")throw Error(`${q.id}: bad number`);}
      else throw Error(`${q.id}: unsupported ${q.type}`);
    }
    sets[bank]=new Set(qs.map(sig));
  }
  for(const [left,right] of [["practice","test"],["practice","quiz"],["test","quiz"]]){
    if([...sets[left]].some(x=>sets[right].has(x)))throw Error(`${code}: ${left}/${right} overlap`);
  }
  const compatibility=load(`quiz/year-1/math/${code}/practice/practice-questions.js`).quizQuestions;
  const practice=load(`quiz/year-1/math/${code}/practice/questions.js`).quizQuestions;
  if(JSON.stringify(compatibility)!==JSON.stringify(practice))throw Error(`${code}: compatibility Practice file differs`);

  const practicePage=fs.readFileSync(`quiz/year-1/math/${code}/practice/index.html`,"utf8");
  const testPage=fs.readFileSync(`quiz/year-1/math/${code}/test/index.html`,"utf8");
  const quizPage=fs.readFileSync(`quiz/year-1/math/${code}/quiz/index.html`,"utf8");
  const worksheetPage=fs.readFileSync(`quiz/year-1/math/${code}/worksheet/index.html`,"utf8");
  if(!practicePage.includes('"maxQuestions":7')||!practicePage.includes('"questionCycle":true'))throw Error(`${code}: Practice rotation config`);
  if(!testPage.includes('"maxQuestions":12')||!testPage.includes('"certificateOnPass":true'))throw Error(`${code}: Test config`);
  if(!quizPage.includes('"maxQuestions":10')||!quizPage.includes('"questionCycle":true'))throw Error(`${code}: Quiz rotation config`);
  if(!worksheetPage.includes('worksheetQuestionLimit:8')||!worksheetPage.includes('/practice/questions.js'))throw Error(`${code}: worksheet source`);

  const activity=fs.readFileSync(`quiz/year-1/math/${code}/index.html`,"utf8");
  if(!activity.includes("28 Practice")||!activity.includes("12 auto-marked Test")||!activity.includes("50-question Quiz")||!activity.includes(`/${code}/quiz/`))throw Error(`${code}: activity counts or Quiz link`);
}
const extFile="quiz/assets/daily-drills/year1-maths-n04-n06-extensions.js";
const w={};const dailyContext={window:w,console};vm.createContext(dailyContext);vm.runInContext(fs.readFileSync(extFile,"utf8"),dailyContext,{filename:extFile});
const ext=w.SkillrDailyQuestionExtensions?.["1"]?.math||{};
if(ext["addition-subtraction-to-20"]?.length!==24)throw Error("daily addition count");
if(ext["skip-counting-equal-groups"]?.length!==16)throw Error("daily group count");
if(ext["maths-vocabulary"]?.length!==16)throw Error("daily vocab count");
for(const page of ["addition-subtraction-to-20","skip-counting-equal-groups","maths-vocabulary"]){
 const html=fs.readFileSync(`quiz/year-1/daily-drills/math/${page}/index.html`,"utf8");
 if(!html.includes("year1-maths-n04-n06-extensions.js"))throw Error(`${page}: extension not loaded`);
}
const qa=fs.readFileSync("assets/qa-complete-ribbon.js","utf8");
for(const code of codes)if(!qa.includes(code))throw Error(`${code}: QA tracking missing`);
const css=fs.readFileSync("quiz/assets/style.css","utf8");
if(!/min-width:\s*1\.3cm/.test(css)||!/min-height:\s*1\.3cm/.test(css))throw Error("SVG minimum size missing");
console.log(JSON.stringify({codes:3,practice:84,test:36,quiz:150,total:270,daily:56,svgQuestions:svgCount},null,2));
