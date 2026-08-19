"use strict";
const rawPractice = [
  ["p-001","real-world rates","Which is a rate?",["5 apples","5 km per hour","5 hours","5 km"],1,"A rate compares two quantities with different units, such as kilometres per hour."],
  ["p-002","rate of pay","A worker earns $28 per hour. What type of rate is this?",["A flat amount","A unit rate","A fraction only","A tax bracket"],1,"$28 per hour is a unit rate because it gives dollars for each 1 hour."],
  ["p-003","cost per kilogram","Chicken costs $9 per kg. What is the rate?",["$9","$9 per kg","9 kg","$9 per hour"],1,"The rate is $9 per kilogram because cost is compared with mass."],
  ["p-004","recipe rates","A recipe uses 300 g of flour for 12 muffins. How much flour is used per muffin?",["25 g","30 g","12 g","36 g"],0,"300 ÷ 12 = 25, so the rate is 25 g per muffin."],
  ["p-005","simple interest rate","A simple interest rate is 5% per year. What does this mean?",["5% each month","5% each year","5% total forever","5% per day"],1,"Per year means the rate applies for each year."],
  ["p-006","average speed","A car travels 240 km in 3 hours. What is its average speed?",["60 km/h","70 km/h","80 km/h","90 km/h"],2,"Average speed = distance ÷ time = 240 ÷ 3 = 80 km/h."],
  ["p-007","constant rate","Which is a constant rate?",["$5 per kg","$5","5 kg","5 hours"],0,"$5 per kg gives the same cost for each kilogram."],
  ["p-008","not a rate","Which is NOT a rate?",["3 L per minute","60 km/h","12 students","$20 per hour"],2,"12 students is just a quantity, not a comparison of two different units."],
  ["p-009","interest rate units","Interest rate = 8% per year. What is the unit?",["Dollars","Years","Percent per year","Percent per month"],2,"The rate compares a percentage with time, so the unit is percent per year."],
  ["p-010","rate identification","Which describes a rate?",["4 cups of water","4 cups per minute","4 minutes","4 litres"],1,"Cups per minute compares amount with time."],
  ["p-011","miles to kilometres","Using 1 mile = 1.6 km, convert 10 miles to kilometres.",["6 km","10 km","16 km","20 km"],2,"10 × 1.6 = 16 km."],
  ["p-012","currency exchange","Exchange rate: 1 AUD = 0.65 USD. Convert 200 AUD to USD.",["130 USD","65 USD","260 USD","300 USD"],0,"200 × 0.65 = 130 USD."],
  ["p-013","speed conversion","A speed is 90 km/h. How far is travelled in 2 hours?",["45 km","90 km","180 km","200 km"],2,"Distance = rate × time = 90 × 2 = 180 km."],
  ["p-014","reverse currency conversion","1 AUD = 50 INR. Convert 500 INR to AUD.",["5 AUD","10 AUD","15 AUD","20 AUD"],1,"500 ÷ 50 = 10 AUD."],
  ["p-015","small distance conversion","Using 1 mile = 1.6 km, convert 3 miles to kilometres.",["4.8 km","5 km","6 km","3.6 km"],0,"3 × 1.6 = 4.8 km."],
  ["p-016","euro exchange rate","1 AUD = 0.60 EUR. Convert 150 AUD to EUR.",["60 EUR","90 EUR","100 EUR","150 EUR"],1,"150 × 0.60 = 90 EUR."],
  ["p-017","distance rate","A runner travels 400 m per minute. How far in 5 minutes?",["1000 m","1500 m","2000 m","2500 m"],2,"400 × 5 = 2000 m."],
  ["p-018","reverse SGD conversion","1 AUD = 0.70 SGD. Convert 35 SGD to AUD.",["25 AUD","50 AUD","35 AUD","49 AUD"],1,"35 ÷ 0.70 = 50 AUD."],
  ["p-019","large miles conversion","Using 1 mile = 1.6 km, convert 50 miles to kilometres.",["80 km","100 km","75 km","60 km"],0,"50 × 1.6 = 80 km."],
  ["p-020","NZD reverse exchange","1 AUD = 1.1 NZD. Convert 330 NZD to AUD.",["300 AUD","330 AUD","360 AUD","400 AUD"],0,"330 ÷ 1.1 = 300 AUD."],
  ["p-021","cricket required run rate","A cricket team needs 180 runs in 20 overs. What required run rate is needed?",["6 runs/over","7 runs/over","8 runs/over","9 runs/over"],3,"180 ÷ 20 = 9 runs per over."],
  ["p-022","dilution rate","Dilution is 1 part chemical to 4 parts water. What total mixture is made from 2 L chemical?",["4 L","6 L","8 L","10 L"],3,"1:4 means 5 total parts. If 1 part is 2 L, total = 5 × 2 = 10 L."],
  ["p-023","fuel efficiency comparison","Car A uses 8 L per 100 km. Car B uses 6 L per 100 km. Which is more fuel-efficient?",["A","B","Same","Cannot tell"],1,"The lower litres per 100 km rate is more fuel-efficient, so Car B is better."],
  ["p-024","cricket run rate","A team scores 150 runs in 15 overs. What is the run rate?",["8 runs/over","9 runs/over","10 runs/over","11 runs/over"],2,"150 ÷ 15 = 10 runs per over."]
];
function q(row, i){
  const [suffix, skill, question, answers, correct, explanation] = row;
  return {id:`ac9m8m05-${suffix}`, curriculumCode:"AC9M8M05", bank:"practice", section:i<10?"E1":i<20?"E2":"E3", sourceNumber:i+1, skill, printable:true, type:"single", question, audioPrompt:question, visual:"", visualHtml:"", visualMeta:{type:"none",alt_text:""}, answers, correct, explanation, structuredExplanation:{summary:explanation, hint:"Identify the two units in the rate, then multiply or divide using the rate."}, qualitySchema:"production-v1"};
}
window.skillrPracticeQuestions = rawPractice.map(q);
window.quizQuestions = window.skillrPracticeQuestions;
