(() => {
"use strict";
const year=String(window.SKILLR_DAILY_YEAR||"");
const params=new URLSearchParams(location.search);
const subject=params.get("subject"), skill=params.get("skill");
const catalog=window.SkillrDailyCatalog?.years?.[year];
const list=subject==="math"?catalog?.math:subject==="science"?catalog?.science:null;
const meta=Array.isArray(list)?list.find(x=>x.id===skill):null;
if(!catalog||!meta||!["math","science"].includes(subject)){ location.replace("./"); return; }
const generator=subject==="math"?window.SkillrDailyMath:window.SkillrDailyScience;
const bank=generator?.generate?.(year,skill)||[];
if(bank.length!==48) console.error(`Daily drill expected 48 questions, received ${bank.length}.`);
const base=`skillr-daily-${year}-${subject}-${skill}`, cycleKey=`${base}-used-cycles`;
function load(){try{const a=JSON.parse(localStorage.getItem(cycleKey)||"[]");return Array.isArray(a)?a.filter(n=>Number.isInteger(n)&&n>=0&&n<6):[];}catch{return[];}}
function choose(){let used=load();if(used.length>=6)used=[];const avail=[0,1,2,3,4,5].filter(n=>!used.includes(n));const c=avail[Math.floor(Math.random()*avail.length)]??0;used.push(c);try{localStorage.setItem(cycleKey,JSON.stringify(used));}catch{}return c;}
const cycle=choose(), selected=bank.filter(x=>x.cycle===cycle).slice(0,8);
window.quizQuestions=selected;
window.skillrActiveQuestions=selected;
window.quizConfig={...(window.quizConfig||{}),shuffleQuestions:true,shuffleAnswers:true,maxQuestions:8,caseSensitiveText:false,storageKey:`${base}-best`};
window.skillrDailyDrillMeta={year,subject,skill,cycle,bankSize:bank.length,title:meta.title};
document.addEventListener("DOMContentLoaded",()=>{
 document.title=`${meta.title} | ${catalog.label} Daily ${subject==="math"?"Maths":"Science"} Drill | SkillrHub`;
 const t=document.getElementById("quizTitle");if(t)t.textContent=meta.title;
 const e=document.querySelector("#startScreen .eyebrow");if(e)e.textContent=`${catalog.label} • Daily ${subject==="math"?"Maths":"Science"} Drill`;
 const d=document.getElementById("drillDescription");if(d)d.textContent=meta.description;
 const b=document.getElementById("dailyHubLink");if(b){b.href="./";b.textContent=`${catalog.label} Daily Drills`;}
 const n=document.getElementById("bankCount");if(n)n.textContent=String(bank.length);
 const c=document.getElementById("cycleInfo");if(c)c.textContent="8 questions • 48-question rotating bank • 6 different attempts before the cycle resets";
});
})();
