"use strict";
const raw = [
  {n:25,s:"Identifying decimal types",q:"Which is terminating?",a:["0.75","0.757575…","0.333…","0.666…"],c:0,e:"0.75 terminates because it ends after two decimal places."},
  {n:26,s:"Fraction to decimal representation",q:"Which is the correct recurring representation of 1/3?",a:["0.3","0.33","0.333…","0.3 with 3 recurring"],c:3,e:"1/3 is exactly 0.333…, written as 0.3 with the 3 recurring."},
  {n:27,s:"Fraction to decimal representation",q:"Which fraction equals 0.25?",a:["1/3","1/4","1/5","1/6"],c:1,e:"0.25 = 25/100 = 1/4."},
  {n:28,s:"Fraction to decimal representation",q:"Which fraction equals 0.125?",a:["1/2","1/4","1/8","1/10"],c:2,e:"0.125 = 125/1000 = 1/8."},
  {n:29,s:"Fraction to decimal representation",q:"Which decimal equals 2/5?",a:["0.2","0.25","0.4","0.5"],c:2,e:"2 ÷ 5 = 0.4."},
  {n:30,s:"Fraction to decimal representation",q:"Which decimal equals 3/8?",a:["0.25","0.375","0.4","0.8"],c:1,e:"3 ÷ 8 = 0.375."},
  {n:31,s:"Fraction to decimal representation",q:"Which decimal equals 7/20?",a:["0.35","0.7","0.14","0.28"],c:0,e:"7/20 = 35/100 = 0.35."},
  {n:32,s:"Fraction to decimal representation",q:"Which decimal equals 1/6?",a:["0.1","0.16","0.1666…","0.166"],c:2,e:"1/6 = 0.1666…, where the 6 repeats forever."},
  {n:33,s:"Fraction to decimal representation",q:"Which decimal equals 2/9?",a:["0.2","0.22","0.222…","0.222"],c:2,e:"2/9 = 0.222…, where the 2 repeats forever."},
  {n:34,s:"Fraction to decimal representation",q:"Which decimal equals 5/12?",a:["0.4","0.41666…","0.416","0.41"],c:1,e:"5/12 = 0.41666…, where the 6 repeats."},
  {n:35,s:"Fraction to decimal representation",q:"Which decimal equals 11/25?",a:["0.11","0.22","0.44","0.55"],c:2,e:"11/25 = 44/100 = 0.44."},
  {n:36,s:"Mixed reasoning",q:"Why does 1/8 terminate?",a:["The denominator has only factors of 2","The denominator has only factors of 3","The denominator has only factors of 5","The denominator has factors 2 and 3"],c:0,e:"8 = 2³, so the denominator has only 2s and the decimal terminates."},
  {n:37,s:"Mixed reasoning",q:"Why does 1/6 recur?",a:["The denominator has only factors of 2","The denominator has only factors of 5","The denominator has a factor 3","The denominator has a factor 7"],c:2,e:"6 = 2 × 3. The factor 3 means the decimal recurs."},
  {n:38,s:"Mixed reasoning",q:"Why does 1/25 terminate?",a:["The denominator has only factors of 2","The denominator has only factors of 5","The denominator has only factors of 3","The denominator has only factors of 7"],c:1,e:"25 = 5², so 1/25 terminates."},
  {n:39,s:"Mixed reasoning",q:"Why does 1/7 recur?",a:["The denominator has only factors of 2","The denominator has only factors of 5","The denominator has a factor 7","The denominator has a factor 3"],c:2,e:"A denominator with a factor other than 2 or 5 gives a recurring decimal when the fraction is in simplest form."},
  {n:40,s:"Mixed reasoning",q:"Which statement is true for a fraction written in simplest form?",a:["A decimal terminates only if the denominator has only factors 2 and/or 5","A decimal terminates only if the denominator has factors of 3","All fractions terminate","All fractions recur"],c:0,e:"In simplest form, a fraction terminates only when the denominator's prime factors are 2 and/or 5."}
];
window.skillrTestQuestions = raw.map((item) => ({
  id: `ac9m8n03-t-${String(item.n - 24).padStart(3, "0")}`,
  curriculumCode: "AC9M8N03",
  bank: "test",
  section: item.s,
  sourceNumber: item.n,
  skill: item.s,
  printable: true,
  type: "single",
  question: item.q,
  audioPrompt: item.q,
  visual: "",
  visualHtml: "",
  visualMeta: { type: "none", alt_text: "" },
  answers: item.a,
  correct: item.c,
  explanation: item.e,
  structuredExplanation: { summary: item.e, hint: "Check whether the denominator in simplest form has only factors 2 and/or 5, or whether a fixed decimal pattern repeats." },
  qualitySchema: "production-v1"
}));
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
