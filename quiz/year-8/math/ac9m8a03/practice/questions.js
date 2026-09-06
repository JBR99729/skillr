"use strict";
const AC9M8A03_VISUALS = {
  taxi: "<svg viewBox='0 0 320 140' role='img' aria-label='Taxi fare linear model'><rect x='16' y='22' width='288' height='92' rx='12' fill='none' stroke='currentColor'/><text x='34' y='56' font-size='16'>Start fee: $5</text><text x='34' y='86' font-size='16'>Then add $2 per km</text><path d='M34 108 H270' stroke='currentColor'/><circle cx='84' cy='108' r='4'/><circle cx='154' cy='108' r='4'/><circle cx='224' cy='108' r='4'/><text x='72' y='130' font-size='12'>1 km</text><text x='142' y='130' font-size='12'>2 km</text><text x='212' y='130' font-size='12'>3 km</text></svg>",
  cooling: "<svg viewBox='0 0 320 150' role='img' aria-label='Cooling temperature line'><line x1='35' y1='120' x2='290' y2='120' stroke='currentColor'/><line x1='35' y1='120' x2='35' y2='20' stroke='currentColor'/><path d='M45 35 L265 105' fill='none' stroke='currentColor' stroke-width='3'/><text x='48' y='30' font-size='13'>90°C</text><text x='236' y='123' font-size='13'>time</text><text x='52' y='145' font-size='13'>drops 3°C/min</text></svg>",
  tank: "<svg viewBox='0 0 320 150' role='img' aria-label='Tank volume decreasing line'><rect x='36' y='22' width='70' height='98' fill='none' stroke='currentColor'/><line x1='36' y1='60' x2='106' y2='60' stroke='currentColor'/><text x='122' y='50' font-size='15'>V = 200 − 8t</text><line x1='132' y1='118' x2='286' y2='118' stroke='currentColor'/><line x1='132' y1='118' x2='132' y2='42' stroke='currentColor'/><path d='M138 48 L276 110' fill='none' stroke='currentColor' stroke-width='3'/></svg>",
  domain: "<svg viewBox='0 0 320 90' role='img' aria-label='Valid time interval from 0 to 25'><line x1='42' y1='44' x2='278' y2='44' stroke='currentColor'/><circle cx='70' cy='44' r='6' fill='currentColor'/><circle cx='250' cy='44' r='6' fill='currentColor'/><path d='M70 44 H250' stroke='currentColor' stroke-width='5'/><text x='62' y='72' font-size='14'>0</text><text x='238' y='72' font-size='14'>25</text><text x='98' y='28' font-size='14'>valid model times</text></svg>",
  pay: "<svg viewBox='0 0 320 130' role='img' aria-label='Pay equals rate times hours'><rect x='28' y='24' width='264' height='78' rx='10' fill='none' stroke='currentColor'/><text x='52' y='58' font-size='17'>Pay = hourly rate × hours</text><text x='82' y='86' font-size='15'>P = rh</text></svg>",
  line: "<svg viewBox='0 0 320 150' role='img' aria-label='Linear growth as straight line'><line x1='35' y1='120' x2='290' y2='120' stroke='currentColor'/><line x1='35' y1='120' x2='35' y2='20' stroke='currentColor'/><path d='M45 110 L275 40' fill='none' stroke='currentColor' stroke-width='3'/><circle cx='45' cy='110' r='4'/><circle cx='160' cy='75' r='4'/><circle cx='275' cy='40' r='4'/><text x='210' y='28' font-size='14'>constant rate</text></svg>"
};
const AC9M8A03_PRACTICE_RAW = [
  {q:"A taxi fare is $5 flag fall plus $2 per kilometre. Which model fits the total cost C for k kilometres?",a:["C = 2k","C = 5 + 2k","C = 5k + 2","C = k − 5"],c:1,s:"Linear model from fixed fee and rate",h:"The fixed starting value is 5 and the rate is 2 dollars per kilometre.",v:"taxi"},
  {q:"A plumber charges a $60 call-out fee plus $80 per hour. What is the cost after 3 hours?",a:["$140","$220","$300","$340"],c:2,s:"Calculate a fixed charge plus hourly rate",h:"Use 60 + 80 × 3 = 300.",v:"pay"},
  {q:"A car travels at 70 km/h. What distance does it travel after 2 hours?",a:["70 km","100 km","140 km","210 km"],c:2,s:"Use distance equals speed times time",h:"70 × 2 = 140."},
  {q:"A tank leaks 5 L/min. How much water is lost after 10 minutes?",a:["10 L","25 L","50 L","100 L"],c:2,s:"Use a constant rate model",h:"5 litres per minute for 10 minutes gives 5 × 10 = 50."},
  {q:"A cooling tray drops temperature at 3°C/min from 90°C. What is the temperature after 5 minutes?",a:["75°C","60°C","45°C","30°C"],c:0,s:"Subtract a repeated temperature decrease",h:"90 − 3 × 5 = 75.",v:"cooling"},
  {q:"A taxi fare model is C = 4 + 1.5d. What is the initial value?",a:["1.5","4","d","6"],c:1,s:"Identify the intercept or starting value",h:"The constant term 4 is the starting cost.",v:"taxi"},
  {q:"In T = 20 − 2t, what is the rate of change?",a:["20","−2","2","−20"],c:1,s:"Identify the coefficient as the rate",h:"The coefficient of t is −2, so the value decreases by 2 each time unit."},
  {q:"A runner moves at constant speed. What shape should a distance–time graph have?",a:["Curved","Horizontal","Vertical","Straight line"],c:3,s:"Connect constant rate to a straight-line graph",h:"A constant speed gives equal distance increases over equal time intervals.",v:"line"},
  {q:"A tank starts with 200 L and leaks 8 L/min. Which model gives the volume V after t minutes?",a:["V = 200 + 8t","V = 200 − 8t","V = 8t − 200","V = 200t"],c:1,s:"Choose a decreasing linear model",h:"Start at 200 and subtract 8 litres each minute.",v:"tank"},
  {q:"In the model C = 10 + 3h, what does 3 represent?",a:["Initial cost","Hourly rate","Total cost","Number of hours"],c:1,s:"Interpret the coefficient in context",h:"The coefficient of h is the cost added per hour."},
  {q:"A tank empties after 25 minutes. For V = 200 − 8t, which t-values are suitable for this context?",a:["All real numbers","t < 0","0 ≤ t ≤ 25","t > 25"],c:2,s:"Choose a suitable domain for a model",h:"Time cannot be negative and the model stops being suitable after the tank is empty.",v:"domain"},
  {q:"A cooling model predicts negative temperatures for a drink if it is used for too long. Is the model always suitable?",a:["Yes","No"],c:1,s:"Judge whether a linear model remains suitable",h:"A simple model may only work for a limited time interval."},
  {q:"A taxi fare model predicts cost for a negative distance. Is that suitable?",a:["Yes","No"],c:1,s:"Reject impossible input values",h:"Distance travelled cannot be negative in this fare context."},
  {q:"A water tank model predicts water remaining after the tank is already empty. Is that suitable?",a:["Yes","No"],c:1,s:"Check model limits",h:"Once the tank is empty, the same leaking model is no longer physically meaningful."},
  {q:"A model gives time = −3 minutes for an event that starts at t = 0. Is that suitable?",a:["Yes","No"],c:1,s:"Check whether a model value makes contextual sense",h:"Negative time is not suitable after the start of the event unless the context defines it."},
  {q:"A model predicts a person works 100 hours in one day. Is that suitable?",a:["Yes","No"],c:1,s:"Evaluate reasonableness of an output",h:"There are only 24 hours in a day."},
  {q:"A model predicts a taxi fare of −$10. Is that suitable?",a:["Yes","No"],c:1,s:"Reject impossible output values",h:"A normal fare cannot be negative."},
  {q:"A model predicts a tank volume of −50 L. Is that suitable?",a:["Yes","No"],c:1,s:"Reject impossible output values",h:"A tank cannot contain a negative volume of water."},
  {q:"A model predicts a runner travels 500 km in 1 hour. Is that suitable for an ordinary human runner?",a:["Yes","No"],c:1,s:"Use context to judge suitability",h:"The value is not reasonable for an ordinary runner."},
  {q:"A cooling model predicts a temperature below absolute zero. Is that suitable?",a:["Yes","No"],c:1,s:"Recognise an impossible physical prediction",h:"Temperatures below absolute zero are not physically suitable."},
  {q:"Hourly rate = $25 and hours = 6. What is the pay?",a:["$100","$125","$150","$175"],c:2,s:"Model pay using rate times hours",h:"25 × 6 = 150.",v:"pay"},
  {q:"Hourly rate = $30 and hours = h. Which model gives pay P?",a:["P = 30 + 4","P = 30h","P = 4h","P = h + 30"],c:1,s:"Write a linear pay model",h:"Pay equals hourly rate times number of hours.",v:"pay"},
  {q:"Hourly rate = $18 and hours = 10. What is the pay?",a:["$100","$180","$200","$280"],c:1,s:"Calculate pay from a linear model",h:"18 × 10 = 180."},
  {q:"Hourly rate = $22 and hours = 7. What is the pay?",a:["$154","$160","$170","$180"],c:0,s:"Calculate pay using multiplication",h:"22 × 7 = 154."}
];
window.skillrPracticeQuestions = AC9M8A03_PRACTICE_RAW.map((q, i) => ({
  id: `ac9m8a03-p-${String(i + 1).padStart(3, "0")}`,
  curriculumCode: "AC9M8A03",
  bank: "practice",
  section: "Linear modelling in context",
  sourceNumber: i + 1,
  skill: q.s,
  printable: true,
  type: "single",
  question: q.q,
  audioPrompt: q.q,
  visual: "",
  visualHtml: q.v ? AC9M8A03_VISUALS[q.v] : "",
  visualMeta: q.v ? { type: "svg", alt_text: q.s } : { type: "none", alt_text: "" },
  answers: q.a,
  correct: q.c,
  explanation: q.h,
  structuredExplanation: { summary: q.h, hint: q.h },
  qualitySchema: "production-v1"
}));
window.quizQuestions = window.skillrPracticeQuestions;
