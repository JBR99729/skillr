"use strict";
(() => {
  const year=String(window.SKILLR_DAILY_YEAR||"");
  const subject=String(window.SKILLR_DAILY_SUBJECT||"");
  const skill=String(window.SKILLR_DAILY_SKILL||"");
  const catalog=window.SkillrDailyCatalog?.years?.[year];

  const lists={
    math:catalog?.math,
    english:catalog?.english,
    science:catalog?.science
  };
  const list=lists[subject];
  const meta=Array.isArray(list)?list.find(t=>t.slug===skill||t.id===skill):null;

  if(!catalog||!meta||!["math","english","science"].includes(subject)){
    console.error("Daily drill configuration is invalid.",{year,subject,skill});
    window.quizQuestions=[];
    return;
  }

  const generators={
    math:window.SkillrDailyMath,
    english:window.SkillrDailyEnglish,
    science:window.SkillrDailyScience
  };
  const generator=generators[subject];
  const sets=subject==="math"?30:25;
  const expected=subject==="math"?240:200;
  const bank=generator?.generate?.(year,skill)||[];

  if(bank.length!==expected){
    console.warn(`Expected ${expected} questions; generated ${bank.length}.`);
  }

  const base=`skillr-daily-v3-${year}-${subject}-${skill}`;
  const usedKey=`${base}-sets`;
  const bestKey=`${base}-best`;

  function loadUsed(){
    try{
      const a=JSON.parse(localStorage.getItem(usedKey)||"[]");
      return Array.isArray(a)?a.filter(n=>Number.isInteger(n)&&n>=0&&n<sets):[];
    }catch{return [];}
  }
  function saveUsed(a){try{localStorage.setItem(usedKey,JSON.stringify(a));}catch{}}

  let used=loadUsed();
  if(used.length>=sets) used=[];
  const available=Array.from({length:sets},(_,i)=>i).filter(i=>!used.includes(i));
  const chosen=available[Math.floor(Math.random()*available.length)] ?? 0;
  const selected=bank.filter(x=>x.set===chosen).slice(0,8);

  window.quizQuestions=selected;
  window.skillrActiveQuestions=selected;
  window.quizConfig={
    ...(window.quizConfig||{}),
    shuffleQuestions:!(subject==="english"&&skill==="reading-comprehension"),
    shuffleAnswers:false,
    maxQuestions:8,
    caseSensitiveText:false,
    storageKey:bestKey
  };

  window.skillrDailyDrillMeta={
    year,subject,skill,title:meta.title,summary:meta.summary,
    bankSize:expected,setsPerTopic:sets,selectedSet:chosen,
    yearLabel:catalog.label
  };

  if(subject==="math"){
    window.skillrDailySupportActive=window.SkillrMathQuickReview?.[year]?.[skill];
  }else if(subject==="science"){
    window.skillrDailySupportActive=window.SkillrScienceQuickRead?.[year]?.[skill];
  }else{
    window.skillrDailySupportActive=window.SkillrEnglishData?.support?.[year]?.[skill];
    if(skill==="reading-comprehension"){
      window.skillrEnglishPassageActive=selected[0]?.passage||null;
    }
    if(skill==="vocabulary-word-meaning"){
      const words=window.SkillrEnglishData?.vocabulary?.[year]||[];
      window.skillrEnglishTodayWords=Array.from({length:4},(_,i)=>words[(chosen*4+i)%words.length]);
    }
  }

  document.addEventListener("DOMContentLoaded",()=>{
    const start=document.getElementById("startButton");
    if(start){
      start.addEventListener("click",()=>{
        const latest=loadUsed();
        if(!latest.includes(chosen)){
          latest.push(chosen);
          saveUsed(latest.slice(-sets));
        }
      },{once:true});
    }
    const bc=document.getElementById("bankCount");
    if(bc) bc.textContent=String(expected);
    const cycle=document.getElementById("cycleInfo");
    if(cycle) cycle.textContent=`8 questions • ${expected}-question rotating bank • ${sets} different sets before a full cycle repeats`;
  });
})();
