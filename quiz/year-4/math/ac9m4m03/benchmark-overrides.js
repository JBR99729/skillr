"use strict";
(function(){
  const practiceReplacements={
    "ac9m4m03-p-041":{
      skill:"fraction of an hour",type:"single",printable:true,
      question:"A quarter of an hour is how many minutes?",audioPrompt:"A quarter of an hour is how many minutes?",visual:"",visualHtml:"",visualMeta:{type:"none"},
      answers:["10 minutes","15 minutes","20 minutes","25 minutes"],audioAnswers:["10 minutes","15 minutes","20 minutes","25 minutes"],correct:1,
      explanation:"An hour has 60 minutes. One quarter of 60 is 15, so a quarter of an hour is 15 minutes.\nHint: Divide 60 minutes into 4 equal parts.",
      structuredExplanation:{summary:"An hour has 60 minutes. One quarter of 60 is 15, so a quarter of an hour is 15 minutes.",hint:"Divide 60 minutes into 4 equal parts."},difficulty:2,difficultyTier:"fluency",sequencePriority:41,qualitySchema:"benchmark-20260911-v1"
    },
    "ac9m4m03-p-042":{
      skill:"fraction of an hour",type:"single",printable:true,
      question:"Three quarters of an hour is how many minutes?",audioPrompt:"Three quarters of an hour is how many minutes?",visual:"",visualHtml:"",visualMeta:{type:"none"},
      answers:["30 minutes","35 minutes","45 minutes","75 minutes"],audioAnswers:["30 minutes","35 minutes","45 minutes","75 minutes"],correct:2,
      explanation:"One quarter of 60 minutes is 15 minutes. Three quarters is 3 × 15 = 45 minutes.\nHint: Find one quarter of an hour first, then take three of those parts.",
      structuredExplanation:{summary:"One quarter of 60 minutes is 15 minutes. Three quarters is 3 × 15 = 45 minutes.",hint:"Find one quarter of an hour first, then take three of those parts."},difficulty:2,difficultyTier:"fluency",sequencePriority:42,qualitySchema:"benchmark-20260911-v1"
    },
    "ac9m4m03-p-043":{
      skill:"find start time from schedule",type:"single",printable:true,
      question:"A swimming lesson finishes at 4:10 pm and lasts 50 minutes. What time did it start?",audioPrompt:"A swimming lesson finishes at 4:10 pm and lasts 50 minutes. What time did it start?",visual:"",visualHtml:"",visualMeta:{type:"none"},
      answers:["3:20 pm","3:30 pm","4:50 pm","3:10 pm"],audioAnswers:["3:20 pm","3:30 pm","4:50 pm","3:10 pm"],correct:0,
      explanation:"Count back 10 minutes to 4:00 pm, then 40 more minutes to 3:20 pm.\nHint: Work backwards through the whole hour.",
      structuredExplanation:{summary:"Count back 10 minutes to 4:00 pm, then 40 more minutes to 3:20 pm.",hint:"Work backwards through the whole hour."},difficulty:2,difficultyTier:"fluency",sequencePriority:43,qualitySchema:"benchmark-20260911-v1"
    },
    "ac9m4m03-p-048":{
      skill:"multi-step schedule reasoning",type:"self-check",gradingMode:"adult-review",responseType:"short_answer",printable:true,
      modelAnswer:"Bus B. Bus A arrives at 2:55 pm, Bus B at 3:15 pm and Bus C at 3:40 pm. Bus B is the latest bus that still arrives by 3:20 pm. From 3:15 pm to the 3:30 pm appointment there are 15 minutes.",
      acceptanceNote:"Require Bus B, its 3:15 pm arrival, a clear comparison with the 3:20 pm deadline and 15 minutes from arrival to the 3:30 pm appointment.",
      responseInstructions:"Work from the timetable, show the relevant arrival times, then justify your choice.",completionLabel:"My work is ready for an adult to check.",
      question:"A clinic appointment is at 3:30 pm. Bus A leaves at 2:20 pm and takes 35 minutes. Bus B leaves at 2:40 pm and takes 35 minutes. Bus C leaves at 3:05 pm and takes 35 minutes. You must arrive by 3:20 pm. Which is the latest bus you can take, and how many minutes are left between its arrival and the appointment? Show your reasoning.",
      audioPrompt:"A clinic appointment is at 3:30 pm. Bus A leaves at 2:20 pm and takes 35 minutes. Bus B leaves at 2:40 pm and takes 35 minutes. Bus C leaves at 3:05 pm and takes 35 minutes. You must arrive by 3:20 pm. Which is the latest bus you can take, and how many minutes are left between its arrival and the appointment? Show your reasoning.",
      visual:"",visualHtml:"",visualMeta:{type:"none"},answers:[],difficulty:3,difficultyTier:"reasoning",sequencePriority:48,
      correct:"Bus B; it arrives at 3:15 pm, leaving 15 minutes before the 3:30 pm appointment.",
      explanation:"Check each arrival time against the 3:20 pm deadline before choosing the latest possible departure.",
      structuredExplanation:{summary:"Bus B arrives at 3:15 pm, which meets the deadline and leaves 15 minutes until the appointment.",hint:"Calculate each arrival first; then apply the deadline."},qualitySchema:"benchmark-20260911-v1"
    }
  };
  const testReplacements={
    "ac9m4m03-t-013":{
      skill:"fraction of time units",type:"single",printable:true,
      question:"A sports session lasts three quarters of an hour. How many minutes is that?",audioPrompt:"A sports session lasts three quarters of an hour. How many minutes is that?",visual:"",visualHtml:"",visualMeta:{type:"none"},
      answers:["15 minutes","30 minutes","45 minutes","75 minutes"],audioAnswers:["15 minutes","30 minutes","45 minutes","75 minutes"],correct:2,
      explanation:"One quarter of 60 minutes is 15 minutes, so three quarters is 45 minutes.\nHint: Divide the hour into four equal parts, then take three.",
      structuredExplanation:{summary:"One quarter of 60 minutes is 15 minutes, so three quarters is 45 minutes.",hint:"Divide the hour into four equal parts, then take three."},difficulty:2,difficultyTier:"fluency",sequencePriority:13,qualitySchema:"benchmark-20260911-v1"
    },
    "ac9m4m03-t-014":{
      skill:"transport schedule reasoning",type:"single",printable:true,
      question:"A train leaves at 2:35 pm and the journey takes 1 hour 25 minutes. What time does it arrive?",audioPrompt:"A train leaves at 2:35 pm and the journey takes 1 hour 25 minutes. What time does it arrive?",visual:"",visualHtml:"",visualMeta:{type:"none"},
      answers:["3:50 pm","4:00 pm","4:10 pm","3:60 pm"],audioAnswers:["3:50 pm","4:00 pm","4:10 pm","3:60 pm"],correct:1,
      explanation:"From 2:35 pm, 25 minutes reaches 3:00 pm. One hour remains, so the arrival time is 4:00 pm.\nHint: Bridge to the next whole hour, then add the remaining time.",
      structuredExplanation:{summary:"From 2:35 pm, 25 minutes reaches 3:00 pm. One hour remains, so the arrival time is 4:00 pm.",hint:"Bridge to the next whole hour, then add the remaining time."},difficulty:2,difficultyTier:"fluency",sequencePriority:14,qualitySchema:"benchmark-20260911-v1"
    }
  };
  function apply(list,replacements){if(!Array.isArray(list)) return; for(let i=0;i<list.length;i++){const r=replacements[list[i]&&list[i].id]; if(r) list[i]=Object.assign({},list[i],r);}}
  apply(window.skillrPracticeQuestions,practiceReplacements);
  apply(window.skillrTestQuestions,testReplacements);
  apply(window.quizQuestions,practiceReplacements);
  apply(window.quizQuestions,testReplacements);
  apply(window.skillrExamQuestions,testReplacements);
})();
