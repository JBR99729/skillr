"use strict";
(() => {
  if(!document.querySelector('script[data-skillr-progress]')){
    const progressScript=document.createElement("script");
    progressScript.src="/assets/progress-store.js?v=2";
    progressScript.dataset.skillrProgress="true";
    document.head.appendChild(progressScript);
  }

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
  window.skillrWorksheetQuestions=bank;

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

  function addRelatedYearLinks(){
    const container=document.querySelector(".daily-topic-links");
    if(!container) return;

    const related=[];
    Object.entries(window.SkillrDailyCatalog?.years || {}).forEach(([yearKey, yearData]) => {
      if(yearKey===year) return;
      const list=yearData?.[subject];
      if(!Array.isArray(list)) return;
      const match=list.find(item => item.slug===skill || item.id===skill);
      if(!match) return;

      related.push({
        label: yearData.label,
        title: match.title,
        url: `/quiz/${yearData.path}/daily-drills/${subject}/${match.slug}/`
      });
    });

    if(!related.length) return;

    const section=document.createElement("div");
    section.className="daily-topic-links daily-topic-links--related";

    const heading=document.createElement("h3");
    heading.textContent="Related practice across year levels";
    heading.className="daily-quick-subtitle";
    section.appendChild(heading);

    const links=document.createElement("div");
    links.className="daily-topic-links";
    related.slice(0,4).forEach(item => {
      const link=document.createElement("a");
      link.href=item.url;
      link.textContent=`${item.label} · ${item.title}`;
      links.appendChild(link);
    });

    section.appendChild(links);
    container.parentNode?.insertBefore(section, container.nextSibling);
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
    addRelatedYearLinks();
  });
})();
