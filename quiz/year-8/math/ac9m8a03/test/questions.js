"use strict";
const AC9M8A03_TEST_VISUALS = {
  pay: "<svg viewBox='0 0 320 130' role='img' aria-label='Pay equals rate times hours'><rect x='28' y='24' width='264' height='78' rx='10' fill='none' stroke='currentColor'/><text x='52' y='58' font-size='17'>Pay = hourly rate × hours</text><text x='82' y='86' font-size='15'>P = rh</text></svg>",
  linear: "<svg viewBox='0 0 320 150' role='img' aria-label='Linear relationship straight line'><line x1='35' y1='120' x2='290' y2='120' stroke='currentColor'/><line x1='35' y1='120' x2='35' y2='20' stroke='currentColor'/><path d='M48 108 L276 40' fill='none' stroke='currentColor' stroke-width='3'/><text x='178' y='32' font-size='14'>same increase each step</text></svg>",
  decrease: "<svg viewBox='0 0 320 150' role='img' aria-label='Linear decrease'><line x1='35' y1='120' x2='290' y2='120' stroke='currentColor'/><line x1='35' y1='120' x2='35' y2='20' stroke='currentColor'/><path d='M48 42 L276 108' fill='none' stroke='currentColor' stroke-width='3'/><text x='164' y='42' font-size='14'>constant decrease</text></svg>"
};
const AC9M8A03_TEST_RAW = [
  {q:"Hourly rate = $40 and hours = 3. What is the pay?",a:["$80","$100","$120","$160"],c:2,s:"Calculate pay from rate and hours",h:"40 × 3 = 120.",v:"pay"},
  {q:"Hourly rate = $15 and hours = 12. What is the pay?",a:["$150","$160","$170","$180"],c:3,s:"Calculate pay from a linear model",h:"15 × 12 = 180.",v:"pay"},
  {q:"Hourly rate = $50 and hours = 2. What is the pay?",a:["$50","$100","$150","$200"],c:1,s:"Use multiplication in a financial model",h:"50 × 2 = 100."},
  {q:"Hourly rate = $28 and hours = 5. What is the pay?",a:["$100","$120","$140","$150"],c:2,s:"Use a pay-rate model",h:"28 × 5 = 140."},
  {q:"Hourly rate = $12 and hours = 8. What is the pay?",a:["$96","$100","$120","$140"],c:0,s:"Calculate total pay",h:"12 × 8 = 96."},
  {q:"Hourly rate = $35 and hours = 9. What is the pay?",a:["$270","$300","$315","$350"],c:2,s:"Calculate total pay from a rate",h:"35 × 9 = 315."},
  {q:"A pattern increases by 4 units each step. What kind of relationship is this?",a:["Linear","Non-linear"],c:0,s:"Identify a constant-rate pattern as linear",h:"Adding the same amount each step is linear.",v:"linear"},
  {q:"A textile pattern grows by 3 cm per row. Which model gives length L after r rows?",a:["L = 3r","L = r + 3","L = 3 + r","L = 3 − r"],c:0,s:"Write a linear model from a constant rate",h:"3 centimetres per row means multiply the row number by 3.",v:"linear"},
  {q:"A walking track increases elevation by 10 m per kilometre. Which model gives elevation gain E after k kilometres?",a:["E = 10k","E = k + 10","E = 10 − k","E = 10k + 1"],c:0,s:"Model elevation gain with a constant rate",h:"10 metres per kilometre means E = 10k."},
  {q:"A seasonal pattern increases temperature by 2°C per week. What is the change after 4 weeks?",a:["+4°C","+6°C","+8°C","+10°C"],c:2,s:"Calculate a repeated linear increase",h:"2 × 4 = 8."},
  {q:"A river flow decreases by 5 L/min. What is the change after 6 minutes?",a:["−10 L","−20 L","−25 L","−30 L"],c:3,s:"Calculate a repeated linear decrease",h:"−5 × 6 = −30.",v:"decrease"},
  {q:"A pattern grows by 7 units per stage. How many units are added by stage 5 if the model starts at 0?",a:["25","30","35","40"],c:2,s:"Use a linear stage model",h:"7 × 5 = 35."},
  {q:"A plant height increases by 1.5 cm/day. What is the increase after 10 days?",a:["10 cm","12 cm","15 cm","20 cm"],c:2,s:"Use a decimal rate in a linear model",h:"1.5 × 10 = 15."},
  {q:"A dune shifts 3 m/year. What is the shift after 8 years?",a:["16 m","20 m","24 m","30 m"],c:2,s:"Use a yearly rate model",h:"3 × 8 = 24."},
  {q:"A carving pattern adds 2 symbols per layer. How many symbols are added by layer 12 if the model starts at 0?",a:["20","22","24","26"],c:2,s:"Calculate a linear pattern value",h:"2 × 12 = 24."},
  {q:"A seasonal rainfall pattern decreases by 4 mm/month. What is the change after 9 months?",a:["−20 mm","−30 mm","−36 mm","−40 mm"],c:2,s:"Calculate a constant monthly decrease",h:"−4 × 9 = −36.",v:"decrease"}
];
window.skillrTestQuestions = AC9M8A03_TEST_RAW.map((q, i) => ({
  id: `ac9m8a03-t-${String(i + 1).padStart(3, "0")}`,
  curriculumCode: "AC9M8A03",
  bank: "test",
  section: "Linear modelling in context",
  sourceNumber: i + 25,
  skill: q.s,
  printable: true,
  type: "single",
  question: q.q,
  audioPrompt: q.q,
  visual: "",
  visualHtml: q.v ? AC9M8A03_TEST_VISUALS[q.v] : "",
  visualMeta: q.v ? { type: "svg", alt_text: q.s } : { type: "none", alt_text: "" },
  answers: q.a,
  correct: q.c,
  explanation: q.h,
  structuredExplanation: { summary: q.h, hint: q.h },
  qualitySchema: "production-v1"
}));
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
