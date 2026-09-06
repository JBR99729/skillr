#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year5", "math");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals", "year5", "math");
const SOURCE_FILES = [
  "assets/year5-curriculum-base.js",
  "assets/year5-maths-data-n1.js",
  "assets/year5-maths-data-n2.js",
  "assets/year5-maths-data-am.js",
  "assets/year5-maths-data-spstp.js",
];
const PRACTICE_CONTEXTS = [
  "During a class investigation", "At the school market", "While planning a garden", "In a robotics challenge",
  "During sports-day planning", "At the wildlife centre", "While checking a map", "In the makerspace",
  "During a cooking project", "At the community fair", "While organising a library display", "In a science notebook",
  "During a design challenge", "At the school canteen", "While comparing travel plans", "In a data workshop",
  "During a building project", "At the local pool", "While preparing an excursion", "In a games club",
  "During an art project", "At the recycling station", "While planning a class survey", "In a coding lesson",
];
const TEST_CONTEXTS = [
  "At a coastal research station", "During a museum challenge", "While planning a charity event", "In an engineering workshop",
  "At a regional sports carnival", "During a farm survey", "While interpreting a trail guide", "In an architecture studio",
  "During a food-truck project", "At a music festival", "While organising a book drive", "In an environmental study",
  "During a playground redesign", "At a transport depot", "While preparing a camping trip", "In a strategy tournament",
];

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const relative of SOURCE_FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, relative), "utf8"), sandbox, { filename: relative });
const units = sandbox.window.SkillrYear5MathsData;
const order = sandbox.window.SkillrYear5MathsOrder;
if (!units || order.length !== 24) throw new Error(`Expected 24 Year 5 Maths units, found ${order?.length ?? 0}`);

const clean = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const sentence = (value) => {
  const text = clean(value);
  return /[.!?]$/.test(text) ? text : `${text}.`;
};
const short = (value, words = 24) => {
  const parts = clean(value).split(" ");
  return sentence(parts.length <= words ? parts.join(" ") : parts.slice(0, words).join(" "));
};
const xml = (value) => clean(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function choices(correct, wrongs, position) {
  const uniqueWrongs = [...new Set(wrongs.map((value) => short(value, 18)).filter((value) => value && value !== correct))];
  while (uniqueWrongs.length < 2) uniqueWrongs.push(uniqueWrongs.length ? "It relies on a surface pattern without checking the quantities." : "It changes the units or relationship given in the problem.");
  const answers = uniqueWrongs.slice(0, 2).map((text) => ({ text, is_correct: false }));
  answers.splice(position, 0, { text: correct, is_correct: true });
  return answers;
}

const gcd = (a, b) => b ? gcd(b, a % b) : a;
const factors = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((value) => n % value === 0);
const fmt = (n) => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(3)));

function directTask(code, index, bank, context) {
  const n = index + (bank === "test" ? 31 : 7);
  const mode = index % 6;
  const task = (question, correct, wrongs, summary, hint, focus = code) => ({ question, correct: String(correct), wrongs: wrongs.map(String), summary, hint, focus });
  switch (code) {
    case "AC9M5N01": { const a = Number((1 + (n % 7) / 10 + (n % 5) / 100).toFixed(2)), b = Number((a + 0.008).toFixed(3)); if (mode % 3 === 0) return task(`${context}, two sensors read ${a} m and ${b} m. Which reading is greater?`, Math.max(a,b), [Math.min(a,b), "They are equal"], "Aligning decimal places shows which reading is farther right on the number line.", "Write placeholder zeros, then compare from tenths to thousandths.", "compare decimal readings"); if (mode % 3 === 1) return task(`${context}, which decimal lies between ${a} and ${fmt(a + 0.01)}?`, fmt(a + 0.005), [fmt(a - 0.005), fmt(a + 0.015)], "The chosen decimal is greater than the lower endpoint and less than the upper endpoint.", "Use the midpoint between the two hundredths.", "locate a decimal"); return task(`${context}, which is ${fmt(a)} written to three decimal places?`, a.toFixed(3), [a.toFixed(2).replace(".", "") + "0", (a + 0.09).toFixed(3)], "Adding a trailing zero does not change a decimal's value.", "Keep every existing place value and add zero thousandths.", "decimal place value"); }
    case "AC9M5N02": { const x = 18 + 6 * (n % 8); if (mode % 3 === 0) { const f = factors(x); const c = f[Math.floor(f.length / 2)]; return task(`${context}, ${x} items must be arranged in equal rows. Which row size works with none left over?`, c, [c + 1, c + 2], `${c} is a factor of ${x}, so the division has no remainder.`, "Test each row size by multiplication or division.", "factors in equal rows"); } if (mode % 3 === 1) return task(`${context}, which number is a multiple of both 4 and 6?`, 12 * (1 + n % 3), [8 + 4*(n%3), 18 + 6*(n%2)], "A common multiple appears in both multiplication sequences.", "List multiples of 4 and 6 until one matches.", "common multiples"); return task(`${context}, which statement about ${x} is correct?`, `${x} is divisible by 6`, [`${x} is not even`, `${x} has no factor pairs`], `${x} ÷ 6 is a whole number.`, "Check whether 6 multiplied by a whole number equals the total.", "divisibility"); }
    case "AC9M5N03": { const d = [4,6,8][n%3], p = d/2 - 1 + (n%2); if (mode % 2 === 0) return task(`${context}, which fraction is greater than ${p}/${d} but less than 1?`, `${p+1}/${d}`, [`${Math.max(0,p-1)}/${d}`, `${d+1}/${d}`], "With equal denominators, the larger numerator names the larger fraction.", "Keep the denominator fixed and compare numerators.", "compare fractions"); return task(`${context}, which mixed numeral equals ${(2*d+p)}/${d}?`, `2 ${p}/${d}`, [`1 ${p}/${d}`, `2 ${d-p}/${d}`], "The numerator contains two complete groups of the denominator plus the remainder.", "Divide the numerator by the denominator.", "rename an improper fraction"); }
    case "AC9M5N04": { const percent = [10,25,40,50,60,75][n%6]; if (mode % 2 === 0) return task(`${context}, ${percent} of every 100 squares are shaded. Which percentage is shown?`, `${percent}%`, [`${100-percent}%`, `${percent/10}%`], "A percentage states the number of parts out of 100.", "Read the shaded count as parts per hundred.", "interpret a hundred grid"); return task(`${context}, which decimal is equivalent to ${percent}%?`, fmt(percent/100), [fmt(percent/10), fmt((100-percent)/100)], `${percent}% means ${percent} divided by 100.`, "Move from percent to decimal by dividing by 100.", "connect percentages and decimals"); }
    case "AC9M5N05": { const d = [4,6,8,10][n%4], a = 1+n%(d/2), b = 1+(n*2)%(d/2); if (mode % 2 === 0) return task(`${context}, one group uses ${a}/${d} of a roll and another uses ${b}/${d}. How much is used altogether?`, `${a+b}/${d}`, [`${a+b}/${d*2}`, `${Math.abs(a-b)}/${d}`], "The parts have the same denominator, so add the numerators.", "Keep the part size and combine the number of parts.", "add fractions"); const big=Math.max(a,b)+2, small=Math.min(a,b); return task(`${context}, ${big}/${d} of a tank was full before ${small}/${d} was used. What fraction remains?`, `${big-small}/${d}`, [`${big+small}/${d}`, `${big-small}/${d*2}`], "Subtract the numerators because the parts are the same size.", "Keep the common denominator.", "subtract fractions"); }
    case "AC9M5N06": { const a=120+10*(n%20), b=3+n%7, c=a*b; return task(`${context}, ${b} equal packs hold ${a} items each. How many items are there?`, c, [a+b, c-a], `${b} groups of ${a} make ${c}.`, "Estimate first, then multiply using place value.", "multiply larger numbers"); }
    case "AC9M5N07": { const divisor=3+n%7, quotient=20+n%30, total=divisor*quotient; return task(`${context}, ${total} items are shared equally among ${divisor} groups. How many go in each group?`, quotient, [quotient+divisor, total-divisor], `${total} ÷ ${divisor} = ${quotient}.`, "Use multiplication to check the quotient.", "solve a division problem"); }
    case "AC9M5N08": { const a=178+17*(n%10), b=3+n%6, exact=a*b, estimate=Math.round(a/100)*100*b; if (mode%2===0) return task(`${context}, which estimate is most useful for checking ${a} × ${b}?`, `About ${estimate}`, [`About ${a+b}`, `About ${exact*10}`], "Rounding the larger factor to the nearest hundred gives a product of the right size.", "Round one factor, multiply, then compare the size with the proposed answer.", "check reasonableness"); return task(`${context}, which result is reasonable for ${exact} ÷ ${b}?`, a, [a*b, a-b], "The quotient should multiply by the divisor to return the dividend.", "Use the inverse operation to check.", "verify a quotient"); }
    case "AC9M5N09": { const price=4+n%7, qty=3+n%6, total=price*qty; return task(`${context}, ${qty} tickets cost $${price} each. Which equation models the total cost?`, `${qty} × ${price} = ${total}`, [`${qty} + ${price} = ${qty+price}`, `${total} ÷ ${price} = ${total-price}`], "Equal groups are modelled with multiplication.", "Identify the number of groups and amount in each group.", "model a practical problem"); }
    case "AC9M5N10": { const start=2+n%5; if (mode%2===0) return task(`${context}, an algorithm starts at ${start}, doubles the number, then adds 3. What is the output?`, start*2+3, [start+5, start*3+2], "Follow the steps in the stated order.", "Record the result after each instruction.", "follow an algorithm"); return task(`${context}, which instruction would make a number even every time?`, "Multiply the number by 2", ["Add 1", "Multiply the number by 3"], "Any whole number multiplied by 2 is even.", "Test the instruction with odd and even inputs.", "evaluate an algorithm"); }
    case "AC9M5A01": { const a=4+n%8,b=5+(n*2)%7,p=a*b; return task(`${context}, ${a} rows of ${b} seats make ${p} seats. Which division fact checks the multiplication?`, `${p} ÷ ${a} = ${b}`, [`${p} ÷ ${b} = ${a+1}`, `${p} - ${a} = ${b}`], "Division reverses multiplication using the same fact family.", "Use the product as the dividend.", "connect multiplication and division"); }
    case "AC9M5A02": { const a=3+n%8,x=4+(n*2)%9,p=a*x; if(mode%2===0)return task(`${context}, ${a} × □ = ${p}. What is the missing value?`,x,[x+a,p-a],`${a} multiplied by ${x} equals ${p}.`,"Divide the product by the known factor.","find an unknown factor"); return task(`${context}, □ ÷ ${a} = ${x}. What number belongs in the box?`,p,[x+a,p-a],`${p} divided by ${a} equals ${x}.`,"Multiply the divisor by the quotient.","find an unknown dividend"); }
    case "AC9M5M01": { const amount=2+n%20; const units=[["length of a classroom","metres","millimetres","kilometres"],["mass of an apple","grams","tonnes","kilometres"],["water in a bottle","millilitres","kilograms","metres"]][mode%3]; return task(`${context}, which metric unit is most suitable for measuring the ${units[0]}?`,units[1],[units[2],units[3]],`The scale of the object matches ${units[1]}.`,"Choose a unit that gives a practical-sized number.","choose a metric unit"); }
    case "AC9M5M02": { const l=5+n%10,w=3+(n*2)%7; if(mode%2===0)return task(`${context}, a rectangular space is ${l} m by ${w} m. How much fencing surrounds it?`,`${2*(l+w)} m`,[`${l*w} m`,`${l+w} m`],"Perimeter is the total distance around all four sides.","Add two lengths and two widths.","calculate perimeter"); return task(`${context}, a rectangular mat is ${l} m by ${w} m. What area does it cover?`,`${l*w} m²`,[`${2*(l+w)} m²`,`${l+w} m²`],"Area is length multiplied by width in square metres.","Count the rows and columns of unit squares.","calculate area"); }
    case "AC9M5M03": { const hour=8+n%10,minute=[0,15,30,45][n%4]; if(mode%2===0)return task(`${context}, a session starts at ${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}. Which 12-hour time matches?`,`${hour>12?hour-12:hour}:${String(minute).padStart(2,"0")} ${hour>=12?"pm":"am"}`,[`${hour>12?hour-12:hour}:${String(minute).padStart(2,"0")} ${hour>=12?"am":"pm"}`,`${hour}:${String((minute+15)%60).padStart(2,"0")}`],"Times after 12:00 use pm and subtract 12 from hours above 12.","Decide whether the time is before or after midday.","convert time systems"); const duration=30+15*(n%5), endMin=hour*60+minute+duration; return task(`${context}, an activity starts at ${hour}:${String(minute).padStart(2,"0")} and lasts ${duration} minutes. When does it finish?`,`${Math.floor(endMin/60)}:${String(endMin%60).padStart(2,"0")}`,[`${hour}:${String((minute+duration)%60).padStart(2,"0")}`,`${Math.floor((endMin+30)/60)}:${String((endMin+30)%60).padStart(2,"0")}`],"Adding the elapsed minutes gives the finishing time.","Bridge to the next hour if helpful.","solve elapsed time"); }
    case "AC9M5M04": { const angle=[30,45,60,90,120,135][n%6]; if(mode%2===0)return task(`${context}, an angle measures ${angle}°. How should it be classified?`,angle<90?"acute":angle===90?"right":"obtuse",[angle<90?"obtuse":"acute",angle===90?"obtuse":"right"],"Angle type depends on its size compared with 90°.","Compare the measure with a right angle.","classify an angle"); return task(`${context}, a straight angle is split into ${angle}° and another angle. What is the missing angle?`,`${180-angle}°`,[`${90-angle}°`,`${180+angle}°`],"Angles on a straight line total 180°.","Subtract the known angle from 180°.","find a missing angle"); }
    case "AC9M5SP01": { const shapes=[["cube","6 equal square faces"],["triangular prism","2 triangular and 3 rectangular faces"],["square pyramid","1 square and 4 triangular faces"]]; const [shape,feature]=shapes[n%3]; return task(`${context}, a valid net has ${feature}. Which object does it form when folded?`,shape,shapes.filter(([s])=>s!==shape).map(([s])=>s),"The face shapes in the valid net match the faces of the object.","Count face shapes and imagine which edges meet.","connect nets and objects"); }
    case "AC9M5SP02": { const x=1+n%5,y=1+(n*2)%5; if(mode%2===0)return task(`${context}, point P is at (${x}, ${y}). Which coordinate is ${2} squares right and 1 square up?`,`(${x+2}, ${y+1})`,[`(${x+1}, ${y+2})`,`(${x-1}, ${y+2})`],"Moving right changes x; moving up changes y.","Read horizontal movement before vertical movement.","use grid coordinates"); return task(`${context}, which description locates (${x}, ${y})?`,`${x} across, then ${y} up`,[`${y} across, then ${x} up`,`${x} down, then ${y} left`],"Coordinates are ordered horizontal first, then vertical.","Remember x before y.","interpret coordinates"); }
    case "AC9M5SP03": { const turns=[["translation","slides without turning"],["reflection","flips across a mirror line"],["rotation","turns around a fixed point"]]; const [name,desc]=turns[n%3]; return task(`${context}, a shape ${desc}. Which transformation occurred?`,name,turns.filter(([v])=>v!==name).map(([v])=>v),`A ${name} ${desc}.`,"Track orientation and whether there is a mirror line or turning point.","identify a transformation"); }
    case "AC9M5ST01": { const cats=["favourite lunch","number of pets","travel time"], type=n%3===0?"nominal categorical":n%3===1?"discrete numerical":"continuous numerical"; if(mode%3===0)return task(`${context}, students record ${cats[n%3]}. What type of data is collected?`,type,["ordinal categorical",type==="continuous numerical"?"discrete numerical":"continuous numerical"],"The data type depends on whether values are labels, counts or measurements.","Ask whether the values name groups, count objects or measure on a scale.","classify data"); if(mode%3===1)return task(`${context}, students compare counts for four lunch choices. Which display makes the categories easiest to compare?`,"a column graph",["an unlabelled list","a line graph showing time"],"A labelled column graph supports comparison among categorical counts.","Match the display to the type of data and comparison needed.","represent categorical data"); return task(`${context}, one survey response is recorded twice. What should students do before graphing?`,"remove the duplicate after checking the source",["keep both entries","delete a different response"],"Checking the source and removing a confirmed duplicate validates the dataset.","Resolve errors before representing the data.","validate data"); }
    case "AC9M5ST02": { const start=20+n%15,change=3+n%8, rising=mode%2===0, end=rising?start+change:start-change; return task(`${context}, a line graph ${rising?"rises":"falls"} from ${start} to ${end}. What change does it show?`,`${rising?"an increase":"a decrease"} of ${change}`,[`${rising?"a decrease":"an increase"} of ${change}`,`${rising?"an increase":"a decrease"} of ${Math.abs(end)}`],"Change is found by comparing the final value with the starting value and keeping the direction.","Read the scale, calculate the difference and state whether it rose or fell.","interpret change on a line graph"); }
    case "AC9M5ST03": { const questions=["How do Year 5 students travel to school?","Which playground area is used most?","How long do students read each evening?"]; const q=questions[n%3]; return task(`${context}, a class investigates: “${q}” Which plan is fairest?`,"Collect relevant data from a representative group using the same question",["Ask only three close friends", "Change the question for different students"],"A fair investigation uses relevant, consistent data from a suitable sample.","Check sample, question wording and recording method.","plan a statistical investigation"); }
    case "AC9M5P01": { const colours=3+n%4; if(mode%2===0)return task(`${context}, a spinner has ${colours} equal sections, each a different colour. How many possible single-spin outcomes are there?`,colours,[colours-1,colours*2],"Each differently coloured section is one possible outcome.","List each distinct result once.","list possible outcomes"); return task(`${context}, a fair coin and a ${colours}-colour spinner are used together. How many combined outcomes are possible?`,2*colours,[colours,colours+2],"Each spinner colour can occur with either coin side.","Make an organised list with two coin outcomes for every colour.","combine chance outcomes"); }
    case "AC9M5P02": { const red=8+n%8,total=20; if(mode%2===0)return task(`${context}, red appears ${red} times in ${total} spins. What is the experimental frequency of red?`,`${red}/${total}`,[`${total-red}/${total}`,`${red}/${red}`],"Experimental frequency compares observed successes with total trials.","Put the observed count over the number of trials.","interpret repeated chance trials"); return task(`${context}, two groups get different colour totals from the same fair spinner. What is the best explanation?`,"Chance variation can produce different results in a limited number of trials",["The spinner must have changed shape","Every group should get identical totals"],"Repeated random trials can vary even when the chance device is fair.","Compare more trials before deciding whether a pattern is unusual.","explain variation in chance experiments"); }
    default: throw new Error(`No direct task builder for ${code}`);
  }
}

function visualSymbol(id, label, focus, bank, index) {
  const colour = bank === "practice" ? "#2457d6" : "#7c3aed";
  const safeFocus = xml(short(focus, 9));
  const safeLabel = xml(label);
  return `<symbol id="${id}" viewBox="0 0 640 300"><rect x="16" y="16" width="608" height="268" rx="28" fill="#f8fbff" stroke="${colour}" stroke-width="4"/><text x="42" y="62" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="${colour}">${safeLabel}</text><rect x="42" y="88" width="556" height="62" rx="14" fill="#eaf1ff"/><text x="62" y="126" font-family="Arial,sans-serif" font-size="19" fill="#173968">${safeFocus}</text><g transform="translate(60 185)"><circle cx="22" cy="22" r="20" fill="${colour}"/><text x="22" y="29" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="white">${(index % 3) + 1}</text><path d="M58 22h120M208 22h120M358 22h120" stroke="#5d6c80" stroke-width="8" stroke-linecap="round"/><path d="M458 5l22 17-22 17" fill="none" stroke="#5d6c80" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g><text x="42" y="268" font-family="Arial,sans-serif" font-size="16" fill="#5d6c80">Identify evidence • apply the relationship • verify the decision</text></symbol>`;
}

function makeItem(code, unit, bank, index, context) {
  const itemNumber = index + 1;
  const id = `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${String(itemNumber).padStart(3, "0")}`;
  const detail = directTask(code, index, bank, context);
  const question = detail.question;
  const position = index % 3;
  const correct = short(detail.correct, 18);
  const answerChoices = choices(correct, detail.wrongs, position);
  const alt = `${context}: a three-step reasoning pathway for ${clean(detail.focus).toLowerCase()}, moving from evidence to a checked decision.`;
  return {
    id,
    curriculum_code: code,
    year_level: "Year 5",
    subject: "math",
    bank,
    skill: clean(detail.focus).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question,
    audio_prompt: question,
    visual: { type: "svg", asset_path: `/assets/assessment-visuals/year5/math/${code.toLowerCase()}.svg#${id}`, alt_text: alt },
    answers: answerChoices,
    correct_index: position,
    explanation: { summary: detail.summary, hint: detail.hint },
  };
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
for (const code of order) {
  const unit = units[code];
  const practice = PRACTICE_CONTEXTS.map((context, index) => makeItem(code, unit, "practice", index, context));
  const test = TEST_CONTEXTS.map((context, index) => makeItem(code, unit, "test", index, context));
  const items = [...practice, ...test];
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  const symbols = items.map((item, index) => visualSymbol(item.id, `${code} • ${item.bank === "practice" ? "Practice" : "Test"}`, item.skill.replaceAll("_", " "), item.bank, index)).join("");
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${symbols}</defs></svg>\n`);
}

console.log(JSON.stringify({ codes: order.length, practice: order.length * 24, test: order.length * 16, total: order.length * 40 }, null, 2));
