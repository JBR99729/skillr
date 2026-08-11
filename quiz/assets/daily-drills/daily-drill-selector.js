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
  const baselineSets=subject==="math"?30:25;
  const baselineExpected=subject==="math"?240:200;
  const coreBank=generator?.generate?.(year,skill)||[];
  const extensionBank=window.SkillrDailyQuestionExtensions?.[year]?.[subject]?.[skill];
  const extraBank=Array.isArray(extensionBank)?extensionBank:[];
  const bank=[...coreBank,...extraBank];
  const expected=bank.length;
  const usesQuestionRound=extraBank.length>0;
  const sets=usesQuestionRound?Math.ceil(expected/8):baselineSets;
  window.skillrWorksheetQuestions=bank;

  if(coreBank.length!==baselineExpected){
    console.warn(`Expected ${baselineExpected} core questions; generated ${coreBank.length}.`);
  }

  const base=`skillr-daily-v3-${year}-${subject}-${skill}`;
  const usedKey=`${base}-sets`;
  const questionRoundKey=`skillr-daily-v4-${year}-${subject}-${skill}-question-round`;
  const bestKey=`${base}-best`;

  function shuffle(items){
    const copy=[...items];
    for(let i=copy.length-1;i>0;i-=1){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function unique(items){
    return [...new Set(items)];
  }

  function questionId(question,index){
    return String(question?.id||`${year}-${subject}-${skill}-question-${index+1}`);
  }

  function learningArea(question){
    if(question?.learningArea) return String(question.learningArea);

    const position=Number(String(question?.id||"").match(/-q(\d+)$/)?.[1]);
    if([1,4,7].includes(position)) return "factors-divisibility";
    if([2,3,8].includes(position)) return "number-order";
    if(position===5) return "number-equations";
    if(position===6) return "prime-composite";
    return String(question?.type||"mixed");
  }

  function bankSignature(questionIds){
    const source=bank.map((question,index)=>
      `${questionIds[index]}:${question?.question||""}`
    ).join("|");
    let hash=2166136261;
    for(let i=0;i<source.length;i+=1){
      hash^=source.charCodeAt(i);
      hash=Math.imul(hash,16777619);
    }
    return `${questionIds.length}-${(hash>>>0).toString(36)}`;
  }

  function loadJson(key,fallback){
    try{
      const parsed=JSON.parse(localStorage.getItem(key)||"null");
      return parsed&&typeof parsed==="object"?parsed:fallback;
    }catch{return fallback;}
  }

  function saveJson(key,value){
    try{localStorage.setItem(key,JSON.stringify(value));}catch{}
  }

  function loadUsed(){
    const a=loadJson(usedKey,[]);
    return Array.isArray(a)?a.filter(n=>Number.isInteger(n)&&n>=0&&n<sets):[];
  }

  function saveUsed(a){
    saveJson(usedKey,a);
  }

  function takeDiverseByArea(buckets,count,startingAreas=[]){
    const picked=[];
    const usedAreas=new Set(startingAreas);
    const availableAreas=()=>[...buckets.entries()]
      .filter(([,items])=>items.length>0)
      .map(([area,items])=>({area,items,tie:Math.random()}));
    const allAreas=new Set([...usedAreas,...availableAreas().map(entry=>entry.area)]);
    let newAreasNeeded=Math.max(0,Math.min(4,allAreas.size)-usedAreas.size);

    while(picked.length<count){
      const available=availableAreas();
      if(available.length===0) break;

      let candidates=available;
      if(newAreasNeeded>0){
        const unused=available.filter(entry=>!usedAreas.has(entry.area));
        if(unused.length>0) candidates=unused;
      }

      const chosen=candidates.sort((a,b)=>
        (b.items.length-a.items.length)||(b.tie-a.tie)
      )[0];
      picked.push(chosen.items.shift());

      if(!usedAreas.has(chosen.area)){
        usedAreas.add(chosen.area);
        newAreasNeeded=Math.max(0,newAreasNeeded-1);
      }
    }

    return shuffle(picked);
  }

  function buildQuestionDeck(coreQuestions,extraQuestions){
    const totalQuestions=coreQuestions.length+extraQuestions.length;
    const blockCount=Math.ceil(totalQuestions/8);
    const coreBuckets=new Map();

    coreQuestions.forEach((question,index)=>{
      const area=learningArea(question);
      const bucket=coreBuckets.get(area)||[];
      bucket.push(questionId(question,index));
      coreBuckets.set(area,bucket);
    });
    coreBuckets.forEach((items,area)=>coreBuckets.set(area,shuffle(items)));

    const extraIds=shuffle(extraQuestions.map((question,index)=>
      questionId(question,coreQuestions.length+index)
    ));
    const extraById=new Map(extraQuestions.map((question,index)=>[
      questionId(question,coreQuestions.length+index),
      question
    ]));
    const extraSlots=Array(blockCount).fill(0);
    const blockOrder=shuffle(Array.from({length:blockCount},(_,index)=>index));
    extraIds.forEach((id,index)=>{
      extraSlots[blockOrder[index%blockCount]]+=1;
    });

    const deck=[];
    let extraIndex=0;
    for(let block=0;block<blockCount;block+=1){
      const capacity=Math.min(8,totalQuestions-deck.length);
      const extraCount=Math.min(extraSlots[block],capacity,extraIds.length-extraIndex);
      const coreCount=capacity-extraCount;
      const blockExtraIds=extraIds.slice(extraIndex,extraIndex+extraCount);
      const blockExtraAreas=blockExtraIds.map(id=>learningArea(extraById.get(id)));
      const blockIds=takeDiverseByArea(coreBuckets,coreCount,blockExtraAreas);
      blockIds.push(...blockExtraIds);
      extraIndex+=extraCount;
      deck.push(...shuffle(blockIds));
    }

    const usedIds=new Set(deck);
    const leftovers=[...coreQuestions,...extraQuestions]
      .map(questionId)
      .filter(id=>!usedIds.has(id));
    return [...deck,...shuffle(leftovers)];
  }

  function prepareQuestionRound(){
    const ids=bank.map(questionId);
    const idSet=new Set(ids);
    const signature=bankSignature(ids);

    if(idSet.size!==ids.length){
      console.error("Daily Drill question IDs must be unique before no-repeat rotation can run.");
    }

    const freshState=round=>({
      version:1,
      signature,
      round,
      remainingIds:buildQuestionDeck(coreBank,extraBank),
      inProgressIds:[],
      completedIds:[]
    });

    let state=loadJson(questionRoundKey,{});
    const validState=
      state.version===1&&
      state.signature===signature&&
      Array.isArray(state.remainingIds)&&
      Array.isArray(state.inProgressIds)&&
      Array.isArray(state.completedIds);

    if(!validState){
      state=freshState(1);
    }else{
      const completed=new Set(state.completedIds.filter(id=>idSet.has(id)));
      const returned=state.inProgressIds.filter(id=>idSet.has(id)&&!completed.has(id));
      state.remainingIds=unique([
        ...returned,
        ...state.remainingIds.filter(id=>idSet.has(id)&&!completed.has(id))
      ]);
      state.inProgressIds=[];
      state.completedIds=[...completed];

      const accounted=new Set([...state.remainingIds,...state.completedIds]);
      const missing=ids.filter(id=>!accounted.has(id));
      state.remainingIds.push(...missing);

      if(state.remainingIds.length===0&&state.completedIds.length===ids.length){
        state=freshState((Number(state.round)||1)+1);
      }
    }

    const selectedIds=state.remainingIds.splice(0,Math.min(8,state.remainingIds.length));
    state.inProgressIds=[...selectedIds];
    saveJson(questionRoundKey,state);

    const byId=new Map(bank.map((question,index)=>[questionId(question,index),question]));
    const selectedQuestions=selectedIds.map(id=>byId.get(id)).filter(Boolean);

    const markComplete=event=>{
      const eventIds=Array.isArray(event?.detail?.questionIds)
        ?event.detail.questionIds.map(String)
        :selectedIds;
      const completedNow=eventIds.filter(id=>selectedIds.includes(id)&&idSet.has(id));
      if(completedNow.length!==selectedIds.length) return;

      const latest=loadJson(questionRoundKey,state);
      if(latest.signature!==signature) return;
      latest.remainingIds=(latest.remainingIds||[]).filter(id=>!completedNow.includes(id));
      latest.inProgressIds=(latest.inProgressIds||[]).filter(id=>!completedNow.includes(id));
      latest.completedIds=unique([...(latest.completedIds||[]),...completedNow])
        .filter(id=>idSet.has(id));
      saveJson(questionRoundKey,latest);
      renderQuestionRoundStatus(latest.completedIds.length,selectedQuestions.length);
    };

    document.addEventListener("skillr:quiz-complete",markComplete,{once:true});
    return {selectedQuestions,state};
  }

  let chosen=null;
  let selected;
  let questionRoundState=null;

  if(usesQuestionRound){
    const questionRound=prepareQuestionRound();
    selected=questionRound.selectedQuestions;
    questionRoundState=questionRound.state;
  }else{
    let used=loadUsed();
    if(used.length>=sets) used=[];
    const available=Array.from({length:sets},(_,i)=>i).filter(i=>!used.includes(i));
    chosen=available[Math.floor(Math.random()*available.length)] ?? 0;
    selected=bank.filter(x=>x.set===chosen).slice(0,8);
  }

  window.quizQuestions=selected;
  window.skillrActiveQuestions=selected;
  window.quizConfig={
    ...(window.quizConfig||{}),
    shuffleQuestions:!(subject==="english"&&skill==="reading-comprehension"),
    shuffleAnswers:usesQuestionRound,
    avoidSameCorrectPosition:usesQuestionRound,
    maxQuestions:8,
    caseSensitiveText:false,
    storageKey:bestKey
  };

  window.skillrDailyDrillMeta={
    year,subject,skill,title:meta.title,summary:meta.summary,
    bankSize:expected,setsPerTopic:sets,selectedSet:chosen,
    rotationMode:usesQuestionRound?"question-round":"set-round",
    round:questionRoundState?.round||null,
    yearLabel:catalog.label
  };

  function renderQuestionRoundStatus(completedCount,attemptSize){
    const completed=Math.min(Number(completedCount)||0,expected);
    const bc=document.getElementById("bankCount");
    if(bc) bc.textContent=String(expected);
    const questionCount=document.getElementById("questionCount");
    if(questionCount) questionCount.textContent=String(attemptSize);
    const cycle=document.getElementById("cycleInfo");
    if(cycle){
      cycle.textContent=completed>=expected
        ?`${expected}/${expected} questions completed • a fresh shuffled round starts next time`
        :`${attemptSize} varied questions • ${expected}-question bank • ${completed}/${expected} completed this round`;
    }
    const start=document.getElementById("startButton");
    if(start&&attemptSize!==8) start.textContent=`Start ${attemptSize}-question drill`;
  }

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
    if(start&&!usesQuestionRound){
      start.addEventListener("click",()=>{
        const latest=loadUsed();
        if(!latest.includes(chosen)){
          latest.push(chosen);
          saveUsed(latest.slice(-sets));
        }
      },{once:true});
    }
    if(usesQuestionRound){
      renderQuestionRoundStatus(questionRoundState?.completedIds?.length||0,selected.length);
    }else{
      const bc=document.getElementById("bankCount");
      if(bc) bc.textContent=String(expected);
      const cycle=document.getElementById("cycleInfo");
      if(cycle) cycle.textContent=`8 questions • ${expected}-question rotating bank • ${sets} different sets before a full cycle repeats`;
    }
    addRelatedYearLinks();
  });
})();
