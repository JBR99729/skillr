#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT=process.cwd(), ASSET="/assets/assessment-visuals/year7/maths/algebra.svg";
const META={
 AC9M7A02:["Formulating Algebraic Expressions","Translate the quantities and operations in order; check what each term represents.","expression","A context-to-expression organiser linking words, quantities and algebraic operations."],
 AC9M7A03:["Solving and Verifying Linear Equations","Undo operations equally on both sides, then substitute the solution into the original equation.","balance","A balance model showing equal operations applied to both sides of a linear equation."],
 AC9M7A04:["Relationships in Authentic Graphs","Read the axes and units first, then connect slope, direction and flat sections to the context.","graph","An authentic line graph with labelled axes and a changing trend across time."],
 AC9M7A05:["Growing Patterns, Tables and Cartesian Graphs","Compare consecutive outputs, identify the constant change and verify the rule with another row.","pattern","A growing tile pattern linked to a value table and points on a Cartesian plane."],
 AC9M7A06:["Systematic Variation in Multi-variable Formulas","Change only the named variable, hold the others fixed and compare the outputs.","formula","A spreadsheet-style table varying one formula input at a time while other inputs remain fixed."],
};
const banks=Object.fromEntries(Object.keys(META).map(c=>[c,{practice:[],test:[]}]))
const add=(c,b,question,correct,wrong,summary,alt=META[c][3])=>banks[c][b].push({question,correct:String(correct),wrong:wrong.map(String),summary,alt});

// AC9M7A02: formulate expressions from distinct contexts and diagnose translations.
const pExpr=[
 ["A kayak hire costs $18 plus $7 for each hour h.","18 + 7h",["25h","18h + 7"]],
 ["A rectangle has length x centimetres and width 6 centimetres. Write its perimeter.","2x + 12",["6x","x + 12"]],
 ["A team scores 3 points for each goal g and loses 2 penalty points.","3g − 2",["3(g − 2)","g − 6"]],
 ["A box contains n packets with 8 cards in each packet and 5 loose cards.","8n + 5",["13n","8(n + 5)"]],
 ["A runner completes d kilometres on each of 4 days, then runs 3 extra kilometres.","4d + 3",["7d","4(d + 3)"]],
 ["A cinema charges $12 per ticket t and a single $4 booking fee.","12t + 4",["16t","12(t + 4)"]],
 ["A ribbon of length L centimetres is cut into 5 equal pieces.","L ÷ 5",["5 ÷ L","L − 5"]],
 ["A temperature starts at x degrees and falls by 9 degrees.","x − 9",["9 − x","9x"]],
 ["A square has side length s. Write its area.","s²",["2s","4s"]],
 ["Three consecutive whole numbers start with n. Write their sum.","3n + 3",["3n","n + 3"]],
 ["A phone plan includes 20 GB, then adds g gigabytes at $3 each. Write the extra-data cost only.","3g",["20 + 3g","23g"]],
 ["A tank contains v litres and drains 6 litres each minute for m minutes.","v − 6m",["6v − m","v − 6 − m"]],
];
const tExpr=[
 ["A museum charges $9 per student s and $25 for one guide.","9s + 25",["34s","25s + 9"]],
 ["A triangular flag has base b and height 10. Write its area.","5b",["10b","b + 10"]],
 ["A delivery travels k kilometres on each of 5 trips, then 12 kilometres to the depot.","5k + 12",["17k","5(k + 12)"]],
 ["A number n is doubled, then 7 is subtracted.","2n − 7",["2(n − 7)","7 − 2n"]],
 ["Seven identical bags share M kilograms equally.","M ÷ 7",["7 ÷ M","M − 7"]],
 ["A rectangle is 3 metres longer than its width w. Write its length.","w + 3",["3w","w ÷ 3"]],
 ["A game awards 5 points per win w and 2 points per draw d.","5w + 2d",["7wd","5d + 2w"]],
 ["A café reduces a $p bill by a $6 voucher.","p − 6",["6 − p","6p"]],
];
for(const [i,x] of pExpr.entries()) add("AC9M7A02","practice",`${x[0]} Which expression models the situation?`,x[1],x[2],`The fixed and variable quantities translate to ${x[1]}.`);
for(const [i,x] of tExpr.entries()) add("AC9M7A02","test",`${x[0]} Which expression models the situation?`,x[1],x[2],`Following the order and meaning of the quantities gives ${x[1]}.`);
const exprVars=[[4,3],[7,5],[10,2],[12,6],[15,4],[18,7]];
for(const [n,k] of exprVars) add("AC9M7A02","practice",`Which verbal description matches ${n}x + ${k}?`,`${n} times x, then add ${k}`,[`add ${n} to x, then multiply by ${k}`,`${n+k} times x`],`The coefficient ${n} multiplies x, while ${k} is a separate added constant.`);
for(const [n,k] of [[6,4],[8,11],[13,5],[20,3]]) add("AC9M7A02","test",`A student translates “${n} times y, then subtract ${k}” as ${n}(y − ${k}). What is the correct expression?`,`${n}y − ${k}`,[`${n}y − ${n*k}`,`${k} − ${n}y`],`Only y is multiplied by ${n}; the separate subtraction gives ${n}y − ${k}.`);
for(const [a,b] of [[2,7],[3,5],[4,9],[6,3],[8,2],[10,4]]) add("AC9M7A02","practice",`Which expression represents ${a} groups of (x + ${b})?`,`${a}(x + ${b})`,[`${a}x + ${b}`,`x + ${a*b}`],`The brackets keep x + ${b} together as one group repeated ${a} times.`);
for(const [a,b] of [[3,8],[5,4],[7,2],[9,6]]) add("AC9M7A02","test",`A rectangle has width x and length x + ${b}. Which expression gives its perimeter?`,`4x + ${2*b}`,[`2x + ${b}`,`x² + ${b}x`],`Perimeter is 2x + 2(x + ${b}) = 4x + ${2*b}.`);

// AC9M7A03: solve and independently verify one-variable equations.
const eqP=[]; for(const [x,a,b] of [[5,3,4],[7,4,2],[9,2,8],[6,5,1],[11,3,7],[8,6,5],[12,2,9],[4,7,3]])eqP.push([`${a}x + ${b} = ${a*x+b}`,x]);
for(const [eq,x] of eqP)add("AC9M7A03","practice",`Solve ${eq}. What is x?`,x,[x+1,x-1],`Subtract the constant, divide by the coefficient, and verify: x = ${x}.`);
for(const [x,a,b] of [[6,4,3],[10,3,5],[7,5,2],[9,6,4],[12,2,7],[8,7,6],[5,9,1],[11,4,8]])add("AC9M7A03","practice",`Which value makes ${a}x − ${b} = ${a*x-b} true?`,x,[x-1,x+1],`Adding ${b}, then dividing by ${a}, gives x = ${x}; substitution restores both sides.`);
for(const [total,fixed,rate,x] of [[47,7,5,8],[62,14,6,8],[73,10,7,9],[56,8,4,12]])add("AC9M7A03","practice",`A service costs $${fixed} plus $${rate} per hour. The total is $${total}. How many hours were used?`,x,[x-1,x+1],`The equation ${fixed} + ${rate}h = ${total} gives h = ${x}, and substitution checks the total.`);
for(const [x,a,b] of [[8,3,5],[6,4,7],[10,2,9],[7,5,4]])add("AC9M7A03","practice",`A student claims x = ${x+1} solves ${a}x + ${b} = ${a*x+b}. Which check best identifies the error?`,`Substitute ${x+1}; the left side becomes ${a*(x+1)+b}, not ${a*x+b}.`,[`Subtract ${b} from only the right side.`,`Divide the original right side by ${b}.`],`Substitution tests the claim in the original equation and shows the two sides are unequal.`);
for(const [x,a,b] of [[13,3,2],[9,5,6],[14,2,11],[8,7,3],[15,4,5],[11,6,7],[12,5,9],[10,8,4]])add("AC9M7A03","test",`Solve and verify ${a}x + ${b} = ${a*x+b}.`,x,[x-2,x+2],`Undoing the operations gives x = ${x}; ${a} × ${x} + ${b} equals ${a*x+b}.`);
for(const [x,a,b] of [[12,4,5],[7,6,8],[15,3,4],[9,8,7]])add("AC9M7A03","test",`Which value satisfies ${a}x − ${b} = ${a*x-b}?`,x,[x+1,x-1],`Solving gives x = ${x}, and substituting it makes both sides ${a*x-b}.`);
for(const [total,fixed,rate,x] of [[86,14,8,9],[95,5,10,9],[69,9,6,10],[108,12,12,8]])add("AC9M7A03","test",`A club pays a fixed $${fixed} fee plus $${rate} per participant. Its bill is $${total}. How many participants attended?`,x,[x-1,x+1],`${fixed} + ${rate}p = ${total}, so p = ${x}; the original bill verifies the solution.`);

// AC9M7A04: interpret authentic data graphs from concise data displays.
const graphP=[
 ["A cyclist's distance (km) at 0, 1, 2, 3 hours is 0, 18, 36, 36.","The cyclist stopped between hours 2 and 3.",["The cyclist travelled fastest between hours 2 and 3.","The cyclist returned to the start."],"A flat distance section means no change in position."],
 ["A room's temperature (°C) at 8 am, 10 am, noon and 2 pm is 16, 20, 25, 23.","The temperature peaked at noon.",["The temperature rose throughout the whole period.","The temperature was lowest at 2 pm."],"The highest plotted value is 25 °C at noon."],
 ["A tank's volume (L) at 0, 5, 10 and 15 minutes is 80, 65, 50, 35.","The tank loses 3 litres per minute.",["The tank loses 15 litres per minute.","The loss rate changes each interval."],"Each 5-minute interval loses 15 L, so the rate is 15 ÷ 5 = 3 L/min."],
 ["Website visits at 9, 10, 11 and 12 o'clock are 40, 65, 90 and 115.","Visits increase by 25 each hour.",["Visits double each hour.","Visits increase by 15 each hour."],"Successive values differ by a constant 25 visits."],
 ["A share price ($) over five days is 24, 27, 25, 29, 28.","The greatest daily rise is from day 3 to day 4.",["The price rises every day.","The lowest price occurs on day 3."],"The changes are +3, −2, +4 and −1; +4 is the greatest rise."],
 ["A hiker's elevation (m) at four checkpoints is 120, 180, 180, 150.","The route is level between checkpoints 2 and 3.",["The hiker descends between checkpoints 1 and 2.","Checkpoint 4 is the highest."],"Equal consecutive elevations produce a horizontal section."],
 ["Electricity use (kWh) from Monday to Friday is 8, 7, 12, 15, 10.","Thursday has the highest use.",["Use decreases every day.","Monday and Friday have equal use."],"The maximum value is 15 kWh on Thursday."],
 ["A bus's distance from school (km) at 0, 10, 20 and 30 minutes is 0, 6, 12, 6.","The bus travels back towards school after 20 minutes.",["The bus remains stopped after 20 minutes.","The bus is farthest away after 30 minutes."],"Distance from school falls from 12 km to 6 km, indicating movement back."],
];
for(const x of graphP)add("AC9M7A04","practice",`${x[0]} Which interpretation is supported?`,x[1],x[2],x[3],x[0]);
for(const x of graphP)add("AC9M7A04","practice",`${x[0]} Which calculation best describes the overall change?`,(()=>{const nums=x[0].match(/(?:is|are) ([0-9, .−-]+)\./)?.[1]?.split(/, /).map(Number);return nums?String(nums.at(-1)-nums[0]):"Compare final and initial values"})(),["0","Use the largest value only"],"Overall change is final value minus initial value.",x[0]);
for(const [data,answer,wrong,summary] of [
 ["Two runners cover 3 km and 5 km in the same 20 minutes.","The second runner's distance–time graph is steeper.",["Both graphs have the same slope.","The first runner's graph is steeper."],"More distance in the same time means a greater rate and steeper slope."],
 ["Two tanks drain 12 L and 20 L in the same 4 minutes.","The second tank's graph has the steeper downward slope.",["The first tank's graph has the steeper downward slope.","Both graphs are horizontal."],"A 20 L decrease in the same time has the greater slope magnitude."],
 ["A graph rises from 10 to 34 over 6 hours.","The average rise is 4 units per hour.",["The average rise is 6 units per hour.","The average rise is 24 units per hour."],"The rise is 24 units over 6 hours, so 24 ÷ 6 = 4."],
 ["A distance graph is horizontal from minute 12 to minute 18.","The object is stationary for 6 minutes.",["The object moves at constant non-zero speed.","The object returns for 6 minutes."],"Horizontal distance means no change in position; the interval lasts 6 minutes."],
 ["A temperature graph falls from 28 °C to 16 °C in 3 hours.","The average change is −4 °C per hour.",["The average change is −12 °C per hour.","The average change is +4 °C per hour."],"The change is −12 °C over 3 hours, giving −4 °C per hour."],
 ["One line rises 15 units in 5 steps; another rises 12 units in 3 steps.","The second line is steeper.",["The first line is steeper.","The lines have equal slope."],"Their rises per step are 3 and 4, so the second is steeper."],
 ["A graph's y-values are 5, 9, 13, 17 at equal x-steps.","The relationship has a constant positive rate of change.",["The relationship has a decreasing rate.","The graph must be horizontal."],"Every successive y-value increases by 4."],
 ["A graph's y-values are 40, 32, 24, 16 at equal x-steps.","The relationship has a constant negative rate of change.",["The relationship has a positive rate.","The rate changes each step."],"Every successive y-value decreases by 8."],
])add("AC9M7A04","practice",`${data} Which interpretation is correct?`,answer,wrong,summary,data);
for(const [data,answer,wrong,summary] of [
 ["Rainfall (mm) from January to April is 42, 38, 61, 55.","March records the most rainfall.",["Rainfall increases every month.","April is the driest month."],"61 mm is the highest plotted value."],
 ["A laptop battery (%) at 0, 1, 2 and 3 hours is 100, 82, 64, 46.","The battery falls at a constant 18 percentage points per hour.",["The battery loses 18% of its remaining charge each hour.","The loss rate becomes faster each hour."],"The equal differences are −18 percentage points."],
 ["A runner's distance (km) at 0, 20, 40 and 60 minutes is 0, 4, 4, 9.","The runner rests between 20 and 40 minutes.",["The runner returns to the start.","The runner maintains one constant speed."],"Distance is unchanged at 4 km during that interval."],
 ["Water temperature (°C) at 0, 2, 4 and 6 minutes is 18, 30, 39, 45.","The warming rate slows over time.",["The warming rate is constant.","The water cools after 4 minutes."],"The increases shrink from 12 to 9 to 6 degrees."],
 ["A shop's sales ($100s) from Monday to Thursday are 12, 18, 15, 24.","The largest rise occurs from Wednesday to Thursday.",["Tuesday has the greatest sales.","Sales rise each day."],"The daily changes are +6, −3 and +9."],
 ["A drone's height (m) at 0, 5, 10 and 15 seconds is 0, 20, 35, 35.","The drone holds a constant height after 10 seconds.",["The drone descends after 10 seconds.","The drone rises fastest after 10 seconds."],"A horizontal section represents unchanged height."],
 ["A train's distance from a station (km) at 0, 15, 30 and 45 minutes is 0, 20, 45, 30.","The train moves towards the station in the final interval.",["The train stops in the final interval.","The train is farthest away at 45 minutes."],"The distance from the station decreases from 45 to 30 km."],
 ["Daily maximum temperatures (°C) are 21, 24, 24, 19, 23.","The range is 5 °C.",["The range is 3 °C.","The range is 24 °C."],"Range = maximum − minimum = 24 − 19 = 5 °C."],
])add("AC9M7A04","test",`${data} Which conclusion is best supported?`,answer,wrong,summary,data);
for(const [data,ans] of [["2, 7, 12, 17",5],["30, 26, 22, 18",-4],["4, 10, 16, 22",6],["50, 42, 34, 26",-8],["3, 12, 21, 30",9],["100, 85, 70, 55",-15],["8, 11, 14, 17",3],["60, 48, 36, 24",-12]])add("AC9M7A04","test",`A graph has equally spaced x-values and successive y-values ${data}. What is the change in y for each step?`,ans,[ans+1,ans-2],`Subtract consecutive y-values; each step changes by ${ans}.`,`Line graph through equally spaced points with y-values ${data}.`);

// AC9M7A05: tables, rules, growing patterns and coordinates.
for(const [a,b] of [[2,3],[3,1],[4,2],[5,4],[6,1],[7,3]])for(const bank of ["practice","test"]){const offset=bank==="practice"?0:2, n=bank==="practice"?5:7;add("AC9M7A05",bank,`A pattern follows y = ${a}n + ${b}. How many tiles are in figure ${n+offset}?`,a*(n+offset)+b,[a*(n+offset),a*(n+offset)+b+a],`Substituting n = ${n+offset} gives y = ${a} × ${n+offset} + ${b} = ${a*(n+offset)+b}.`,`Growing tile figures increasing by ${a} tiles each step, with ${b} fixed tiles.`)}
for(const [vals,rule,next] of [["5, 8, 11, 14","3n + 2",17],["7, 11, 15, 19","4n + 3",23],["4, 9, 14, 19","5n − 1",24],["10, 16, 22, 28","6n + 4",34],["3, 10, 17, 24","7n − 4",31],["12, 20, 28, 36","8n + 4",44]])add("AC9M7A05","practice",`Figures 1 to 4 contain ${vals} tiles. Which rule and next value fit the pattern?`,`${rule}; next ${next}`,[`${rule.replace(/[+−].*/,"")}; next ${next-1}`,`n + ${next-4}; next ${next}`],`The constant first difference identifies the coefficient, and checking figure 1 fixes the constant term.`);
for(const [rule,x,y] of [["y = 2x + 5",4,13],["y = 3x − 2",6,16],["y = 4x + 1",5,21],["y = 5x − 3",3,12],["y = 6x + 2",2,14],["y = 7x − 4",4,24]])add("AC9M7A05","practice",`Which ordered pair lies on ${rule}?`,`(${x}, ${y})`,[`(${x}, ${y+1})`,`(${y}, ${x})`],`Substituting x = ${x} into the rule gives y = ${y}.`);
for(const [a,b,row,bad] of [[2,1,4,10],[3,2,5,16],[4,3,3,16],[5,1,6,32],[6,2,4,27],[7,4,2,19]])add("AC9M7A05","practice",`A table follows y = ${a}n + ${b}. Which entry is incorrect?`,`n = ${row}, y = ${bad}`,[`n = 1, y = ${a+b}`,`n = 2, y = ${2*a+b}`],`For n = ${row}, the rule gives ${a*row+b}, not ${bad}.`);
for(const [vals,rule] of [["6, 10, 14, 18","4n + 2"],["8, 13, 18, 23","5n + 3"],["9, 15, 21, 27","6n + 3"],["4, 12, 20, 28","8n − 4"],["11, 18, 25, 32","7n + 4"]])add("AC9M7A05","test",`A table lists outputs ${vals} for inputs 1, 2, 3 and 4. Which rule matches every row?`,rule,[rule.replace(/[+−] \d+/,""),rule.replace(/^\d+/,String(Number(rule.match(/^\d+/)[0])+1))],`The constant difference gives the multiplier; substituting input 1 determines the constant.`);
for(const [a,b,x] of [[3,4,8],[4,1,9],[5,2,7],[6,5,6],[7,3,5]])add("AC9M7A05","test",`Points from y = ${a}x + ${b} are plotted. What y-coordinate belongs to x = ${x}?`,a*x+b,[a*x,a*x+b+a],`Substitute x = ${x}: y = ${a} × ${x} + ${b} = ${a*x+b}.`);

// AC9M7A06: vary one variable systematically in authentic formulas.
const variations=[
 ["V = lwh","length l doubles while w and h stay fixed","V doubles","V stays the same","V quadruples","Only one multiplied factor doubles, so the product doubles."],
 ["A = bh ÷ 2","height h triples while b stays fixed","A triples","A doubles","A increases by 3 square units","Area is directly proportional to height when base is fixed."],
 ["d = rt","time t halves while r stays fixed","d halves","d doubles","d stays the same","Distance is directly proportional to time at a fixed rate."],
 ["C = 2l + 2w","length l increases by 3 while w stays fixed","C increases by 6","C increases by 3","C doubles","The length occurs twice in the perimeter formula."],
 ["m = ρV","volume V doubles while density ρ stays fixed","m doubles","m quadruples","m stays fixed","Mass is directly proportional to volume for fixed density."],
 ["E = pt","power p triples while time t stays fixed","E triples","E increases by 3","E becomes 9 times as large","Energy is directly proportional to power for fixed time."],
 ["A = lw","both l and w double","A becomes 4 times as large","A doubles","A becomes 8 times as large","Two doubled factors give 2 × 2 = 4 times the area."],
 ["V = lwh","l, w and h all double","V becomes 8 times as large","V doubles","V becomes 6 times as large","Three doubled factors give 2³ = 8 times the volume."],
];
for(const bank of ["practice","test"])for(const [f,change,correct,w1,w2,summary] of variations)add("AC9M7A06",bank,bank==="practice"?`For ${f}, ${change}. What happens to the output?`:`A digital table models ${f}. Predict the new output when ${change}.`,correct,[w1,w2],summary,`Formula table for ${f}, comparing original inputs with a row where ${change}.`);
for(const [l,w,h] of [[2,3,4],[3,4,5],[4,5,6],[5,2,7],[6,3,8],[7,4,3],[8,5,2],[9,2,4]])add("AC9M7A06","practice",`A spreadsheet uses V = lwh. With l = ${l}, w = ${w} and h = ${h}, what value should the V cell show?`,l*w*h,[l+w+h,l*w+h],`Multiplying all three dimensions gives V = ${l*w*h}.`,`Spreadsheet row with l ${l}, w ${w}, h ${h} and the V cell awaiting its formula result.`);
for(const [b,h] of [[8,5],[10,7],[12,6],[14,9],[16,4],[18,11],[20,8],[22,3]])add("AC9M7A06","practice",`A spreadsheet calculates triangle area with A = bh ÷ 2. What is A when b = ${b} and h = ${h}?`,b*h/2,[b*h,b+h],`The formula gives ${b} × ${h} ÷ 2 = ${b*h/2}.`,`Spreadsheet row with triangle base ${b}, height ${h}, and area calculated by half the product.`);
for(const [r,t,delta] of [[40,2,1],[55,3,2],[60,4,1],[75,2,3]])add("AC9M7A06","test",`A table uses d = rt with r = ${r}. If t changes from ${t} to ${t+delta}, by how much does d increase?`,r*delta,[delta,r*(t+delta)],`At fixed rate, the increase is r × change in time = ${r} × ${delta} = ${r*delta}.`,`Two-row formula table holding r at ${r} while t changes from ${t} to ${t+delta}.`);
for(const [l,w,change] of [[5,3,2],[7,4,3],[9,2,4],[6,5,1]])add("AC9M7A06","test",`For P = 2l + 2w, w stays ${w} while l increases from ${l} to ${l+change}. How much does P increase?`,2*change,[change,2*w+1],`Only 2l changes, so the perimeter increases by 2 × ${change} = ${2*change}.`,`Formula table comparing two rectangles with width ${w} and lengths ${l} and ${l+change}.`);

for(const [code,byBank] of Object.entries(banks))for(const [bank,items] of Object.entries(byBank)){
 if(items.length!== (bank==="practice"?24:16))throw new Error(`${code} ${bank}: ${items.length}`);
}
for(const [code,byBank] of Object.entries(banks)){
 const out=[];
 for(const [bank,items] of Object.entries(byBank))items.forEach((x,i)=>{const ci=i%3,choices=[...x.wrong];choices.splice(ci,0,x.correct);out.push({id:`${code}-${bank==="practice"?"P":"T"}-${String(i+1).padStart(3,"0")}`,subject:"math",year_level:"Year 7",curriculum_code:code,bank,skill:META[code][0].toLowerCase().replace(/[^a-z0-9]+/g,"_"),question:x.question,audio_prompt:x.question,visual:{type:"svg",asset_path:`${ASSET}#${META[code][2]}`,alt_text:x.alt},answers:choices.map((text,j)=>({text,is_correct:j===ci})),correct_index:ci,explanation:{summary:x.summary,hint:META[code][1]}})});
 const dir=path.join(ROOT,"assets/assessment-banks/year7/math");fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,`${code.toLowerCase()}.json`),JSON.stringify(out,null,2)+"\n");
}
for(const [code,[title]] of Object.entries(META)){
 const route=path.join(ROOT,`quiz/year-7/math/${code.toLowerCase()}`);
 for(const bank of ["practice","test"]){
  const file=path.join(route,`${bank}/index.html`),count=bank==="practice"?8:12,size=bank==="practice"?24:16;
  let html=fs.readFileSync(file,"utf8")
   .replace(/<title>.*?<\/title>/,`<title>${code} ${title} ${bank==="practice"?"Practice":"Test"} | SkillrHub</title>`)
   .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${bank==="practice"?"Practise 8 rotating questions from a 24-question":"Take a 12-question test drawn from a separate 16-question"} Year 7 bank for ${code}.">`)
   .replace(/<h1 id="quizTitle">.*?<\/h1>/,`<h1 id="quizTitle">${title}</h1>`)
   .replace(/<span class="summary-number" id="questionCount">\d+<\/span><span class="summary-label">Questions(?: this attempt)?<\/span>/,`<span class="summary-number" id="questionCount">${count}</span><span class="summary-label">Questions this attempt</span>`)
   .replace(/<script>window\.quizConfig=\{.*?<\/script>/,c=>c.replace(/"maxQuestions":\d+/,`"maxQuestions":${count}`).replace(/"shuffleQuestions":(?:true|false)/,'"shuffleQuestions":true').replace(/"questionCycle":(?:true|false)/,`"questionCycle":${bank==="practice"?"true":"false"}`))
   .replace(new RegExp(`<script src="/quiz/year-7/math/${code.toLowerCase()}/(?:practice|test)/questions\\.js[^>]*></script>`),`<script src="/quiz/year-7/math/${code.toLowerCase()}/${bank}/questions.js?v=20260814-y7alg"></script>`);
  html=html.replace(`<div><span class="summary-number">75%</span>`,`<div><span class="summary-number">${size}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number">75%</span>`);
  fs.writeFileSync(file,html);
 }
 let html=fs.readFileSync(path.join(route,"index.html"),"utf8").replace(/<title>.*?<\/title>/,`<title>${code} ${title} Activities | SkillrHub</title>`).replace(/<h1>.*?<\/h1>/,`<h1>${title}</h1>`).replace(/<p>Choose a learning activity\..*?<\/p>/,"<p>Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws 12 questions from a separate 16-question bank.</p>");
 fs.writeFileSync(path.join(route,"index.html"),html);
 html=fs.readFileSync(path.join(route,"worksheet/index.html"),"utf8").replace(/<h1 id="quizTitle">.*?<\/h1>/,`<h1 id="quizTitle">${title} worksheet</h1>`).replace(/<p>Download a worksheet containing.*?<\/p>/,"<p>Download an 8-question worksheet drawn from the Practice bank.</p>");fs.writeFileSync(path.join(route,"worksheet/index.html"),html);
 for(const bank of ["practice","test"]){
  let f=path.join(route,`${bank}/retake/index.html`);html=fs.readFileSync(f,"utf8").replace(/<h1>Retake (?:practice|test): .*?<\/h1>/,`<h1>Retake ${bank}: ${title}</h1>`).replace(/<p>Try the same eight curriculum questions again.*?<\/p>/,bank==="practice"?"<p>Start a fresh rotating 8-question attempt from the 24-question Practice bank.</p>":"<p>Start a fresh 12-question attempt from the separate 16-question Test bank.</p>");fs.writeFileSync(f,html);
  f=path.join(route,`${bank}/review/index.html`);html=fs.readFileSync(f,"utf8").replace(/try the eight questions again/,bank==="practice"?"try another rotating set of eight questions":"try another 12-question test");fs.writeFileSync(f,html);
 }
}
console.log("Built 5 Year 7 Algebra banks: 120 Practice and 80 Test questions.");
