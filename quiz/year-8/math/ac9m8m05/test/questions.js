"use strict";
const rawTest = [
  ["t-001","dilution ratio","A dilution ratio is 1:3 chemical to water. What total mixture is made from 250 mL chemical?",["500 mL","750 mL","1000 mL","1250 mL"],2,"1:3 has 4 total parts. If 1 part is 250 mL, total mixture = 4 × 250 = 1000 mL."],
  ["t-002","fuel consumption rate","A car uses 40 L to travel 500 km. What is its consumption rate in L/100 km?",["6 L/100 km","7 L/100 km","8 L/100 km","10 L/100 km"],2,"40 ÷ 500 × 100 = 8 L/100 km."],
  ["t-003","required cricket rate","A team needs 200 runs in 25 overs. What required run rate is needed?",["6 runs/over","7 runs/over","8 runs/over","9 runs/over"],2,"200 ÷ 25 = 8 runs per over."],
  ["t-004","dilution total mixture","Ratio is 1:5 chemical to water. If chemical = 100 mL, what is total mixture?",["300 mL","400 mL","500 mL","600 mL"],3,"1:5 gives 6 total parts. Total = 6 × 100 = 600 mL."],
  ["t-005","fuel efficiency rate","A car travels 600 km using 30 L. What is its consumption rate?",["4 L/100 km","5 L/100 km","6 L/100 km","7 L/100 km"],1,"30 ÷ 600 × 100 = 5 L/100 km."],
  ["t-006","simple cricket rate","A team scores 120 runs in 12 overs. What is the run rate?",["8 runs/over","9 runs/over","10 runs/over","11 runs/over"],2,"120 ÷ 12 = 10 runs per over."],
  ["t-007","tax table basic","Income is $40,000. Tax is 19% of the amount above $18,200. What is the tax?",["$4142","$4172","$5000","$7000"],0,"40,000 − 18,200 = 21,800. Tax = 0.19 × 21,800 = $4142."],
  ["t-008","tax table mid","Income is $60,000. Tax is $5092 plus 32.5% of the amount above $45,000. Which is closest to the tax?",["$9000","$9967","$11,000","$12,000"],1,"60,000 − 45,000 = 15,000. 0.325 × 15,000 = 4875. Total = 5092 + 4875 = $9967."],
  ["t-009","tax table upper middle","Income is $90,000. Tax is $5092 plus 32.5% of the amount above $45,000. Which is closest to the tax?",["$14,067","$19,717","$25,000","$30,000"],1,"90,000 − 45,000 = 45,000. 0.325 × 45,000 = 14,625. Total = 5092 + 14,625 = $19,717."],
  ["t-010","marginal tax rate","Which income bracket pays the highest marginal rate in the simplified table?",["$0–$18,200","$18,201–$45,000","$45,001–$120,000","$120,001+"],3,"The highest bracket listed has the highest marginal rate."],
  ["t-011","marginal tax logic","What does marginal tax mean?",["You pay the same rate on all income","You pay different rates on different portions of income","You pay no tax","You pay tax only once"],1,"Marginal tax applies different rates to different portions of income."],
  ["t-012","fire spread rate","In land-management contexts, fire generally spreads faster with:",["Low wind","High wind","No fuel","Wet conditions"],1,"High wind can increase the rate of fire spread."],
  ["t-013","fuel type and spread rate","Which fuel condition is most likely to increase fire spread rate?",["Wet leaves","Damp soil","Dry grass","Water"],2,"Dry grass can burn and spread fire more quickly than wet or damp materials."],
  ["t-014","evaporation rate","Evaporation rate is most likely to increase with:",["Low temperature","High humidity","Large surface area","No sunlight"],2,"A larger exposed surface area can increase evaporation rate."],
  ["t-015","First Nations land management rates","First Nations land-management knowledge may consider fire spread using rates of:",["Random guessing","Wind, fuel, humidity and temperature","Only temperature","Only rainfall"],1,"Fire behaviour is affected by wind, fuel, humidity and temperature."],
  ["t-016","water conservation rate","Estimating water evaporation rates helps with:",["Colour selection","Water conservation","Soil colouring","Plant height only"],1,"Evaporation-rate estimates can support water conservation decisions."]
];
function q(row, i){
  const [suffix, skill, question, answers, correct, explanation] = row;
  return {id:`ac9m8m05-${suffix}`, curriculumCode:"AC9M8M05", bank:"test", section:i<6?"E3":i<11?"E4":"E5", sourceNumber:i+25, skill, printable:true, type:"single", question, audioPrompt:question, visual:"", visualHtml:"", visualMeta:{type:"none",alt_text:""}, answers, correct, explanation, structuredExplanation:{summary:explanation, hint:"Check the units, then calculate the rate or apply the rate to the correct quantity."}, qualitySchema:"production-v1"};
}
window.skillrTestQuestions = rawTest.map(q);
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
