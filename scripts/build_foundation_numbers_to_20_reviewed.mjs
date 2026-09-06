import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const runtimePath = path.join(root, "quiz/assets/daily-drills/foundation-numbers-to-20-reviewed.js");
const sourcePath = path.join(root, "curriculum-question-banks/banks/foundation/foundation-numbers-to-20-daily-drills.json");
const banks = { AC9MFN01: [], AC9MFN02: [], AC9MFN03: [] };
const offsets = { AC9MFN01: 0, AC9MFN02: 1, AC9MFN03: 2 };
const words = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
const esc = value => String(value).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");

function distractors(answer, max = 20) {
  return [...new Set([answer - 1, answer + 1, answer - 2, answer + 2, 0, max].filter(v => v >= 0 && v <= max && v !== answer))].slice(0, 2).map(String);
}

function add(code, item) {
  const index = banks[code].length;
  const correct = String(item.correct);
  const wrong = item.distractors.map(String).filter(value => value !== correct);
  if (new Set([correct, ...wrong]).size !== 3) throw new Error(`${code} item ${index + 1}: choices are not unique`);
  const correctIndex = (index + offsets[code]) % 3;
  const labels = [...wrong]; labels.splice(correctIndex, 0, correct);
  banks[code].push({
    id: `${code}-DD-${String(index + 1).padStart(3,"0")}`,
    curriculumCode: code, bank: "reviewed-daily-drill", topic: "numbers-to-20",
    skill: item.skill, difficulty: item.difficulty, type: "single", question: item.question,
    visual: item.alt || null, visualHtml: item.svg || undefined, visualAlt: item.alt || undefined,
    answers: labels.map(label => ({ text: label, label, is_correct: label === correct })), correct_index: correctIndex,
    explanation: { summary: item.explanation, hint: item.hint }, audio_prompt: item.audio || item.question,
    printable: true, source: "original-editorial-review-2026-09",
    editorialReview: { status: "reviewed", date: "2026-09-06", curriculumAuthority: "Australian Curriculum v9.0", benchmark: "IXL task structures inspected; original wording and media" }
  });
}

function frame(body, alt) {
  return `<svg role="img" aria-label="${esc(alt)}" viewBox="0 0 620 220" style="display:block;width:min(100%,620px);height:auto;margin:0 auto"><rect width="620" height="220" rx="18" fill="#f8fbff" stroke="#b9d2ee" stroke-width="3"/>${body}</svg>`;
}

function positions(count, variant = 0, ox = 0) {
  const cols = [5,4,6,3][variant % 4];
  if (variant % 7 === 6 && count > 2) return Array.from({length:count},(_,i)=>[ox + 155 + Math.cos(2*Math.PI*i/count)*105,110 + Math.sin(2*Math.PI*i/count)*70]);
  return Array.from({length:count},(_,i)=>[ox + 62 + (i%cols)*48 + ((variant%2)&&(Math.floor(i/cols)%2)?18:0),58 + Math.floor(i/cols)*52]);
}

function dots(count, variant, alt, colour = "#2766c7") {
  const palette = [colour,"#f08a24","#6b46c1","#16856b"];
  const body = positions(count,variant).map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="18" fill="${palette[(i+variant)%palette.length]}"/>`).join("");
  return { svg: frame(body,alt), alt };
}

function tenFrame(count, alt) {
  let body="";
  for(let f=0;f<2;f+=1)for(let i=0;i<10;i+=1){const x=40+f*290+(i%5)*50,y=50+Math.floor(i/5)*62;body+=`<rect x="${x}" y="${y}" width="50" height="62" fill="white" stroke="#56718f" stroke-width="2"/>`;if(f*10+i<count)body+=`<circle cx="${x+25}" cy="${y+31}" r="17" fill="#2766c7"/>`}
  return { svg: frame(body,alt), alt };
}

function numberLine(values, gapIndex) {
  const gap=490/(values.length-1);let body='<line x1="65" y1="105" x2="555" y2="105" stroke="#294967" stroke-width="5"/>';
  values.forEach((value,i)=>{const x=65+i*gap;body+=`<line x1="${x}" y1="85" x2="${x}" y2="125" stroke="#294967" stroke-width="4"/><text x="${x}" y="170" text-anchor="middle" font-family="Arial" font-size="28" fill="#173a72">${i===gapIndex?"?":value}</text>`});
  const alt="A number line increasing by one, with one position replaced by a question mark";return {svg:frame(body,alt),alt};
}

function groups(a,b,variant,alt="Two labelled collections shown side by side") {
  const half=(count,side)=>Array.from({length:count},(_,i)=>[side+45+(i%5)*47+(variant%2&&Math.floor(i/5)%2?12:0),48+Math.floor(i/5)*42]);
  const left=half(a,0),right=half(b,320);let body='<line x1="310" y1="25" x2="310" y2="180" stroke="#b9d2ee" stroke-width="3"/><text x="150" y="207" text-anchor="middle" font-family="Arial" font-size="20">Group A</text><text x="470" y="207" text-anchor="middle" font-family="Arial" font-size="20">Group B</text>';
  body+=left.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13" fill="#2766c7"/>`).join("");body+=right.map(([x,y])=>`<rect x="${x-12}" y="${y-12}" width="24" height="24" rx="5" fill="#f08a24"/>`).join("");return {svg:frame(body,alt),alt};
}

function mixed(blue,orange,variant) {
  const alt="Blue and orange counters mixed in one shared space";const pts=positions(blue+orange,variant);const body=pts.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="16" fill="${i<blue?"#2766c7":"#f08a24"}"/>`).join("");return {svg:frame(body,alt),alt};
}

function smallPattern(count,family,name) {
  const die={1:[[310,110]],2:[[255,70],[365,150]],3:[[250,65],[310,110],[370,155]],4:[[250,65],[370,65],[250,155],[370,155]],5:[[250,65],[370,65],[310,110],[250,155],[370,155]]};
  const row=Array.from({length:count},(_,i)=>[310-(count-1)*35+i*70,110]);
  const twoRows=Array.from({length:count},(_,i)=>{const top=Math.ceil(count/2),isTop=i<top,j=isTop?i:i-top,len=isTop?top:count-top;return [310-(len-1)*38+j*76,isTop?75:145]});
  const diagonal=Array.from({length:count},(_,i)=>[230+i*40,55+i*28]);
  const ring=Array.from({length:count},(_,i)=>[310+Math.cos(2*Math.PI*i/count-Math.PI/2)*90,110+Math.sin(2*Math.PI*i/count-Math.PI/2)*70]);
  const cluster=[[285,95],[335,92],[310,135],[265,140],[360,140]].slice(0,count);
  const spread=[[90,65],[525,150],[300,45],[165,165],[455,65]].slice(0,count);
  const stair=Array.from({length:count},(_,i)=>[225+i*43,55+i*28]);
  const fan=Array.from({length:count},(_,i)=>{const angle=-2.55+i*(1.95/Math.max(1,count-1));return [310+Math.cos(angle)*120,180+Math.sin(angle)*120]});
  const triangle=[[310,50],[270,105],[350,105],[245,165],[310,165]].slice(0,count);
  const ell=[[250,55],[250,105],[250,155],[305,155],[360,155]].slice(0,count);
  const uneven=[[115,130],[245,55],[325,155],[465,80],[530,170]].slice(0,count);
  const split=Array.from({length:count},(_,i)=>{const left=Math.ceil(count/2),onLeft=i<left,j=onLeft?i:i-left,len=onLeft?left:count-left;return [onLeft?205:415,110-(len-1)*28+j*56]});
  const patterns=[die[count],row,twoRows,diagonal,row,split,ring,cluster,spread,stair,die[count].map(([x,y])=>[310-(y-110),110+(x-310)]),twoRows,fan,triangle,ell,uneven];
  const pts=patterns[family];const palette=family===11?["#2766c7","#2766c7","#f08a24","#f08a24","#f08a24"]:["#2766c7","#f08a24","#6b46c1","#16856b","#2766c7"];
  const body=pts.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="21" fill="${palette[i]}"/>`).join("")+(family===5?'<line x1="310" y1="35" x2="310" y2="185" stroke="#9bb8d6" stroke-width="3"/>':"");
  const alt=`A small ${name} arrangement with one to five visible marks`;return {svg:frame(body,alt),alt};
}

function ordinal(total,target) {
  const shapes=["●","▲","■","◆","★","♥","⬟","✦","⬢","⬤"];const alt="A left-to-right row of different symbols, with a green start marker at the left and one symbol coloured orange";const body=shapes.slice(0,total).map((s,i)=>`<text x="${42+i*58}" y="120" text-anchor="middle" font-family="Arial" font-size="38" fill="${i===target-1?"#f08a24":"#2766c7"}">${s}</text>`).join("")+`<text x="20" y="190" font-family="Arial" font-size="20" font-weight="700" fill="#16856b">START →</text>`;return {svg:frame(body,alt),alt};
}

// AC9MFN01: connect names, numerals, quantities and order from 0 to 20.
[0,1,2,3,4,5,6,8,10,12,16,20].forEach((n,i)=>{const visual=i%3===2?tenFrame(n,"One or two ten frames filled from the left"):dots(n,i,"An organised collection of counters");add("AC9MFN01",{skill:"name-and-represent",difficulty:i<5?"easy":i<9?"core":"application",question:["Which numeral names this collection?","Choose the number represented by the counters.","How many objects does this model represent?"][i%3],correct:n,distractors:distractors(n),explanation:n===0?"The collection is empty, so it represents 0.":`The model contains ${n} ${n===1?"object":"objects"}, so it represents ${n}.`,hint:"Use the rows or frames to keep track of each object.",...visual})});
[0,2,5,7,9,11,13,15,18,20].forEach((n,i)=>add("AC9MFN01",{skill:"numeral-recognition",difficulty:i<4?"easy":"core",question:i%2?`Which numeral means ${words[n]}?`:`Find the numeral for “${words[n]}”.`,correct:n,distractors:distractors(n),explanation:`The number name “${words[n]}” is written ${n}.`,hint:"Say the number word and connect it to the numeral you know."}));
[1,3,4,6,8,10,12,14,17,19].forEach((n,i)=>add("AC9MFN01",{skill:"number-names",difficulty:i<4?"easy":"core",question:i%2?`The numeral is ${n}. Which word names it?`:`Choose the number name that matches ${n}.`,correct:words[n],distractors:[words[Math.max(0,n-1)],words[Math.min(20,n+1)]],explanation:`The numeral ${n} has the number name “${words[n]}”.`,hint:"Read the numeral aloud and listen for the matching word."}));
const sequences=[[[0,1,null,3],2],[[2,null,4,5],3],[[6,7,8,null],9],[[null,10,11,12],9],[[13,null,15,16],14],[[17,18,null,20],19],[[5,4,null,2],3],[[10,null,8,7],9],[[20,19,18,null],17],[[null,15,14,13],16],[[3,4,null,6,7],5],[[12,11,null,9,8],10]];
sequences.forEach(([seq,n],i)=>add("AC9MFN01",{skill:"number-sequence",difficulty:i<4?"easy":i<8?"core":"application",question:`${["What comes next","Which number completes the count","Fill the gap"][i%3]}: ${seq.map(v=>v??"___").join(", ")}`,correct:n,distractors:distractors(n),explanation:`${n} completes the sequence because every step changes by 1.`,hint:"Check whether the count moves forwards or backwards."}));
[[4,1,3],[7,9,5],[10,6,8],[12,15,11],[18,14,16],[20,17,19],[2,0,1,3],[13,10,12,11],[8,5,7,6],[19,16,18,17]].forEach((vals,i)=>{const asc=[...vals].sort((a,b)=>a-b),desc=[...asc].reverse(),largest=i%3===2,correct=(largest?desc:asc).join(", "),raw=vals.join(", "),rot=vals.slice(1).concat(vals[0]).join(", ");add("AC9MFN01",{skill:"order-numbers",difficulty:i<3?"easy":i<7?"core":"application",question:`Put ${raw} in order from ${largest?"largest to smallest":"smallest to largest"}.`,correct,distractors:[raw===correct?rot:raw,(largest?asc:desc).join(", ")],explanation:`The requested order is ${correct}.`,hint:largest?"Begin with the number that comes latest when counting forwards.":"Begin with the number that comes earliest when counting forwards."})});
[[0,"more",1],[2,"less",1],[4,"more",5],[7,"less",6],[9,"more",10],[11,"less",10],[13,"more",14],[16,"less",15],[18,"more",19],[20,"less",19]].forEach(([start,way,n],i)=>add("AC9MFN01",{skill:"one-more-one-less",difficulty:i<4?"easy":"core",question:i%2?`Start at ${start}. Which number is one ${way}?`:`Find one ${way} than ${start}.`,correct:n,distractors:distractors(n),explanation:`${n} is one ${way} than ${start}; it is one step ${way==="more"?"forward":"back"}.`,hint:`Count ${way==="more"?"forwards":"backwards"} one step.`}));
[0,2,5,8,11,14,16,17].forEach((start,i)=>{const vals=Array.from({length:i<4?6:4},(_,j)=>start+j),gap=1+(i%(vals.length-2)),n=vals[gap],visual=numberLine(vals,gap);add("AC9MFN01",{skill:"number-line",difficulty:i<3?"core":"application",question:"Which numeral belongs at the question mark on this number line?",correct:n,distractors:distractors(n),explanation:`${n} belongs there because each tick increases by 1.`,hint:"Read the labelled positions on both sides of the gap.",...visual})});
const ord=["first","second","third","fourth","fifth","sixth","seventh","eighth"];
ord.forEach((name,i)=>{const visual=ordinal(Math.max(5,i+2),i+1),wrong=[ord[Math.max(0,i-1)],ord[Math.min(7,i+1)]].filter(v=>v!==name);while(wrong.length<2)wrong.push(ord[(i+2)%8]);add("AC9MFN01",{skill:"ordinal-position",difficulty:i<3?"core":"application",question:"Count from the green START marker. What is the position of the orange symbol?",correct:name,distractors:wrong.slice(0,2),explanation:`Counting from the marked end places the orange symbol ${name}.`,hint:"Give each symbol one position name, beginning at the green START marker.",...visual})});

// AC9MFN02: all 80 tasks require meaningful instant-recognition layouts up to 5.
const families=[
  ["dice","Look quickly at the familiar dot pattern. How many do you see?"],["row","See the row as one small group. How many counters are there?"],["two rows","Without touching each counter, how many are shown?"],["diagonal","Glance at the diagonal pattern. Which numeral names it?"],
  ["ten frame","How many spaces are filled on this part of the frame?"],["domino split","See the two parts together. How many dots are on the domino?"],["ring","How many counters can you recognise in the ring?"],["cluster","Look once at the close cluster. How many counters are there?"],
  ["spread","The counters are spread out. How many are in the whole collection?"],["stair","Recognise the stair pattern. Which numeral tells how many?"],["turned dice","The familiar pattern has been turned. How many dots are still there?"],["coloured parts","The colours split one collection into parts. How many altogether?"],
  ["fan pattern","How many marks spread out like a fan? Recognise the small group at once."],["triangle","How many dots make this small triangle pattern?"],["L shape","How many counters are in the L-shaped collection?"],["uneven","The pattern is not regular. How many counters can you recognise?"]
];
families.forEach(([family,prompt],f)=>{for(let n=1;n<=5;n+=1){const visual=f===4?tenFrame(n,"A ten frame with a small group filled from the top-left"):smallPattern(n,f,family);const parts=n>3?`${n-2} and 2`:n===3?"2 and 1":n===2?"one pair":"one";add("AC9MFN02",{skill:`subitise-${family.replaceAll(" ","-")}`,difficulty:f<5?"easy":f<11?"core":"application",question:prompt,correct:n,distractors:distractors(n,5),explanation:`The pattern shows ${n}. You can see ${parts}${n>1?` making ${n}`:""} without counting one by one.`,hint:"Look for a familiar whole or two small parts you already know.",...visual})}});

// AC9MFN03: quantify, compare by counting or matching, and justify conclusions.
[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,7,12,15,18,20].forEach((n,i)=>{const visual=i%4===0?tenFrame(n,"One or two ten frames filled from the left"):dots(n,i+1,"A collection arranged in rows, a ring or a staggered group"),question=i<15?["Count the complete collection. How many objects are shown?","Use the structure to find the total. Which numeral matches?","Quantify this collection: how many are there?","Count every object once. What is the total?"][i%4]:["Rearrange this collection mentally into a row. What total stays the same?","See a ten and some extras in this collection. What is the total?","Count by following the outside edge, then the inside. How many altogether?","Use groups of five to check the collection. What total do you get?","Confirm this full two-frame quantity. Which numeral records it?"][i-15];add("AC9MFN03",{skill:"quantify-collections",difficulty:i<6?"easy":i<14?"core":"application",question,correct:n,distractors:distractors(n),explanation:`Counting each object once gives ${n}; the arrangement helps you keep track.`,hint:"Count in a steady order and check that nothing is skipped or counted twice.",...visual})});
const pairs=[[3,5],[6,4],[7,7],[8,10],[11,9],[12,12],[14,13],[15,18],[20,17],[16,16],[5,9],[10,6],[13,19],[18,14],[9,9],[7,11],[17,20],[12,8],[19,15],[20,20]];
pairs.forEach(([a,b],i)=>{const kind=i%4;let correct,wrong;if(kind===0){correct=a>b?"Group A":b>a?"Group B":"They are equal";wrong=["Group A","Group B","They are equal"].filter(v=>v!==correct)}else if(kind===1){correct=a<b?"Group A":b<a?"Group B":"They are equal";wrong=["Group A","Group B","They are equal"].filter(v=>v!==correct)}else{correct=a===b?"The groups are equal":a>b?"Group A has more":"Group B has more";wrong=["The groups are equal","Group A has more","Group B has more"].filter(v=>v!==correct)}const visual=groups(a,b,i);add("AC9MFN03",{skill:"compare-by-counting",difficulty:i<6?"easy":i<14?"core":"application",question:["Which group has more objects?","Which group has fewer objects?","Compare the collections. Which statement is true?","After counting both groups, what can you say?"][kind],correct,distractors:wrong,explanation:`Group A has ${a}; Group B has ${b}. ${a===b?"The counts match.":`${Math.max(a,b)} is more than ${Math.min(a,b)}.`}`,hint:"Count each group, then compare the totals.",...visual})});
[[4,5],[6,6],[7,5],[8,9],[10,7],[11,12],[13,10],[14,14],[15,17],[18,16],[19,20],[9,11],[12,15],[16,13],[20,18],[17,17]].forEach(([a,b],i)=>{const correct=a===b?"No objects are left over":a>b?"Group A has objects left over":"Group B has objects left over",visual=groups(a,b,i+2,"Two collections aligned for one-to-one matching");add("AC9MFN03",{skill:"compare-by-matching",difficulty:i<5?"core":"application",question:"Pair one object from Group A with one from Group B. What happens?",correct,distractors:["Group A has objects left over","Group B has objects left over","No objects are left over"].filter(v=>v!==correct),explanation:`${Math.min(a,b)} pairs form. ${a===b?"Nothing remains, demonstrating equality.":`${Math.abs(a-b)} remain in Group ${a>b?"A":"B"}, demonstrating it has more.`}`,hint:"The group with unmatched objects has more.",...visual})});
[[2,4],[5,3],[6,6],[7,9],[10,8],[11,13],[14,12],[15,15],[16,18],[19,17],[20,14],[9,12]].forEach(([blue,orange],i)=>{const correct=blue===orange?"The colours are equal":blue>orange?"There are more blue counters":"There are more orange counters",visual=mixed(blue,orange,i);add("AC9MFN03",{skill:"compare-mixed-collections",difficulty:i<4?"core":"application",question:"Separate the mixed collection by colour in your mind. Which comparison is correct?",correct,distractors:["The colours are equal","There are more blue counters","There are more orange counters"].filter(v=>v!==correct),explanation:`There are ${blue} blue and ${orange} orange counters. ${blue===orange?"The totals match.":`${Math.max(blue,orange)} is greater than ${Math.min(blue,orange)}.`}`,hint:"Count one colour at a time, then compare.",...visual})});
[[5,8],[9,6],[10,10],[12,15],[17,14],[18,20],[7,7],[16,11],[13,19],[20,20],[8,12],[15,9]].forEach(([a,b],i)=>{const correct=a===b?`Both groups have ${a}, so they are equal.`:a>b?`${a} comes after ${b} when counting, so Group A has more.`:`${b} comes after ${a} when counting, so Group B has more.`,wrongDirection=a===b?`Group A has more because ${a} is first.`:a>b?`${b} comes before ${a}, so Group B has more.`:`${a} comes before ${b}, so Group A has more.`,visual=groups(a,b,i+5,"Two collections with different spacing; counting is needed");add("AC9MFN03",{skill:"explain-comparison",difficulty:"application",question:"Which explanation proves the comparison?",correct,distractors:[wrongDirection,"The wider-looking group must have more."],explanation:`A sound explanation states both totals and compares their counting order: ${correct}`,hint:"Choose evidence based on counted totals, not spacing.",...visual})});

for(const [code,items] of Object.entries(banks))if(items.length!==80)throw new Error(`${code} generated ${items.length} items`);
const items=[];for(let i=0;i<80;i+=1)for(const code of Object.keys(banks))items.push(banks[code][i]);items.forEach((item,index)=>{item.set=Math.floor(index/8)});
const source={schema_version:"1.0",reviewed_at:"2026-09-06",title:"Foundation Maths Numbers to 20 Daily Drills",item_count:items.length,curriculum_codes:Object.fromEntries(Object.entries(banks).map(([code,list])=>[code,list.length])),originality:"Original SkillrHub questions and SVGs; IXL task structures were inspected but no wording, values, sequences or media were copied.",items};
fs.writeFileSync(sourcePath,`${JSON.stringify(source,null,2)}\n`);
fs.writeFileSync(runtimePath,`/* Generated by scripts/build_foundation_numbers_to_20_reviewed.mjs. Do not edit directly. */\n"use strict";\n(() => {\n  window.SkillrDailyProductionBanks = window.SkillrDailyProductionBanks || {};\n  window.SkillrDailyProductionBanks.F = window.SkillrDailyProductionBanks.F || {};\n  window.SkillrDailyProductionBanks.F.math = window.SkillrDailyProductionBanks.F.math || {};\n  window.SkillrDailyProductionBanks.F.math["numbers-to-20"] = ${JSON.stringify(items,null,2)};\n})();\n`);
console.log(`Built ${items.length} original reviewed questions: 80 per code.`);
