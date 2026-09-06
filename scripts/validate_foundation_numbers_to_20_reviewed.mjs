import fs from "node:fs";
import vm from "node:vm";

const source=JSON.parse(fs.readFileSync(new URL("../curriculum-question-banks/banks/foundation/foundation-numbers-to-20-daily-drills.json",import.meta.url),"utf8"));
const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL("../quiz/assets/daily-drills/foundation-numbers-to-20-reviewed.js",import.meta.url),"utf8"),context);
const bank=context.window.SkillrDailyProductionBanks?.F?.math?.["numbers-to-20"],problems=[];
if(!Array.isArray(bank)||bank.length!==240)problems.push(`Expected 240 questions; found ${bank?.length}.`);
if(source.item_count!==240||source.items.length!==240)problems.push("Canonical source must contain 240 items.");
if(JSON.stringify(source.items)!==JSON.stringify(bank))problems.push("Source/runtime parity failed.");
if(new Set(bank.map(x=>x.id)).size!==240)problems.push("Question IDs are not unique.");
for(let set=0;set<30;set+=1){const q=bank.filter(x=>x.set===set);if(q.length!==8)problems.push(`Set ${set+1} has ${q.length}.`);if(new Set(q.map(x=>x.curriculumCode)).size<3)problems.push(`Set ${set+1} misses a code.`)}
for(const code of ["AC9MFN01","AC9MFN02","AC9MFN03"]){const q=bank.filter(x=>x.curriculumCode===code),p=[0,1,2].map(i=>q.filter(x=>x.correct_index===i).length);if(q.length!==80)problems.push(`${code} has ${q.length}.`);if(Math.max(...p)-Math.min(...p)>1)problems.push(`${code} positions ${p.join("/")}.`)}
const signatures=new Set();for(const x of bank){const key=`${x.curriculumCode}:${x.question}:${x.visualHtml||""}`;if(signatures.has(key))problems.push(`${x.id}: exact task duplicate.`);signatures.add(key);if(x.type!=="single"||x.answers.length!==3)problems.push(`${x.id}: invalid format.`);if(new Set(x.answers.map(a=>a.label)).size!==3||x.answers.filter(a=>a.is_correct).length!==1||!x.answers[x.correct_index]?.is_correct)problems.push(`${x.id}: invalid answer key.`);if(!x.explanation?.summary?.trim()||!x.explanation?.hint?.trim())problems.push(`${x.id}: weak feedback.`);if(!x.editorialReview||x.editorialReview.status!=="reviewed")problems.push(`${x.id}: metadata missing.`);if(x.curriculumCode==="AC9MFN02"&&!x.visualHtml)problems.push(`${x.id}: subitising needs a visual.`);if(x.visualHtml&&(!x.visualHtml.includes('role="img"')||!x.visualAlt))problems.push(`${x.id}: SVG accessibility missing.`)}
if(new Set(bank.filter(x=>x.curriculumCode==="AC9MFN02").map(x=>x.skill)).size<12)problems.push("AC9MFN02 representation variety is too low.");
for(const skill of ["quantify-collections","compare-by-counting","compare-by-matching","compare-mixed-collections","explain-comparison"])if(!bank.some(x=>x.curriculumCode==="AC9MFN03"&&x.skill===skill))problems.push(`AC9MFN03 missing ${skill}.`);
if(problems.length){console.error(problems.join("\n"));process.exit(1)}
console.log(JSON.stringify({status:"passed",items:bank.length,sets:30,codes:source.curriculum_codes,answer_positions:[0,1,2].map(i=>bank.filter(x=>x.correct_index===i).length),visual_items:bank.filter(x=>x.visualHtml).length}));
