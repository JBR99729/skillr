(function(){
"use strict";
const D=window.SkillrFoundationMathsData;if(!D)return;
const dots=n=>`<span class="ev-dots">${"<i></i>".repeat(n)}</span>`;
const add=(code,rows)=>{if(D[code])D[code].elaborations=rows.map(row=>{
 if(!Array.isArray(row))return row;
 const [label,title,visual,teach,check]=row;
 return {label,title,visual,teach,check};
})};
add("AC9MFN01",[
 {
  label:"E1",
  title:"Collect and match a requested quantity",
  idea:"A number tells how many are in a collection. Accurate counting means pairing one number word with each object; the final number word tells the total.",
  visual:`<span class="ev-hear">hear “nine”</span><b>→</b><span>${dots(9)}</span><b>↔</b><strong>9</strong>`,
  steps:["Hear or read the requested number.","Move one object for each number word.","Say the total and match the numeral."],
  worked:"The teacher asks for 9 paintbrushes. The child moves and counts each brush once, says “There are nine altogether”, then places the numeral card 9 beside the collection.",
  say:"The objects, the spoken word ‘nine’ and the numeral 9 all name the same amount.",
  mistake:"The child double-counts an object or stops without stating the total.",
  fix:"Move each counted object into a finished group and ask, ‘How many altogether?’",
  teach:"Hear or read the number, collect exactly that many objects, then match the collection to its numeral.",
  check:"Collect 9 objects, prove each was counted once and match them to the numeral 9."
 },
 {
  label:"E2",
  title:"Order numbers and find one more or one less",
  idea:"Numbers have a fixed order. Moving one place forward adds one; moving one place backward removes one.",
  visual:`<span>11</span><span>12</span><span>13</span><strong>14</strong><span>15</span><span>16</span><span>17</span><div class="ev-caption">one less ← 14 → one more</div>`,
  steps:["Build the starting number.","Add or remove exactly one object.","Locate both numbers on a 0–20 number line."],
  worked:"Build 14 counters. Removing one leaves 13, so 13 is one less than 14. Adding one makes 15, so 15 is one more than 14.",
  say:"One more is the next number because the collection grew by exactly one—not because we guessed the next word.",
  mistake:"The child recites the number sequence but cannot connect ‘one more’ or ‘one less’ to a changed collection.",
  fix:"Change a real collection by one first, then move one space on the number line.",
  teach:"Connect object changes to neighbouring positions on a 0–20 number line, counting forwards and backwards from different starting points.",
  check:"Show 14. Find one less and one more, then explain each answer using counters or the number line."
 },
 {
  label:"E3",
  title:"Use ordinal and positional language",
  idea:"Cardinal numbers tell how many. Ordinal words tell position in an ordered line, and position depends on where the line begins.",
  visual:`<span class="ev-position"><small>1st</small> red</span><span class="ev-position"><small>2nd</small> blue</span><span class="ev-position"><small>3rd</small> green</span><div class="ev-caption">red is before blue • blue is between red and green</div>`,
  steps:["Choose and mark the starting end.","Touch each item in order.","Describe its place using first, second, third, before, after or between."],
  worked:"From the left, the blue toy is second. It is after the red toy, before the green toy and between the other two toys.",
  say:"‘Three toys’ tells how many. ‘The third toy’ tells which position.",
  mistake:"The child says an item is first without identifying the starting end, or confuses ‘three’ with ‘third’.",
  fix:"Mark the start with an arrow and contrast ‘How many?’ with ‘Which one?’",
  teach:"Use an ordered row of real objects so ordinal words and before, after and between describe visible relationships.",
  check:"From a marked starting end, identify the second toy and describe it using two position words."
 },
 {
  label:"E4",
  title:"Read and write numerals in familiar places",
  idea:"A numeral is a written symbol for a number. We see numerals in many contexts, where they may show an amount, an order or a label.",
  visual:`<span>door <strong>7</strong></span><span>bus <strong>12</strong></span><span>page <strong>20</strong></span><b>→</b><span>read • build • write</span>`,
  steps:["Notice the numeral in context.","Say its number name.","Build the number when it represents an amount, then trace and write it."],
  worked:"Find 12 on a bus sign. Read it as ‘twelve’, build 12 counters as 10 and 2 more, then write 12 while saying the digits in order.",
  say:"The numeral 12 keeps its name wherever we see it, even when it is being used as a label.",
  mistake:"The child reverses a teen numeral, reading or writing 14 as 41.",
  fix:"Build 14 as ten and four more, say ‘fourteen’, then write 1 followed by 4.",
  teach:"Notice, read and write numerals on familiar objects, images and texts, while discussing what the numeral is doing in that context.",
  check:"Find a familiar numeral, read it, copy it correctly and explain whether it shows an amount, order or label."
 },
 {
  label:"E5",
  title:"Connect quantity, number name and numeral",
  idea:"A collection, a spoken number name and a written numeral can look or sound different while representing the same number.",
  visual:`<span>${dots(5)}</span><b>↔</b><span>“five”</span><b>↔</b><strong>5</strong>`,
  steps:["Act or tell a short counting story.","Count and say the total.","Choose the matching numeral and show the number another way."],
  worked:"Place 3 shells on a mat and add 2 more. Count 5 shells, say ‘five’ and choose the numeral 5. Rearrange the shells and confirm the number is still 5.",
  say:"The arrangement changed, but no shells were added or removed, so the number stayed five.",
  mistake:"The child thinks a spread-out collection has more, or treats the word and numeral as separate facts to memorise.",
  fix:"Rearrange the same objects without adding or removing any, then reconnect the collection, spoken name and numeral.",
  teach:"Use meaningful stories, games and familiar contexts to move repeatedly between quantity, spoken name and written numeral.",
  check:"Show five objects in two arrangements, say ‘five’, select 5 and explain why all representations match."
 }
]);
add("AC9MFN06",[
 ["E1","Role-play a fair share",`<span>person A ${dots(2)}</span><span>person B ${dots(2)}</span><span>person C ${dots(2)}</span><span>person D ${dots(2)}</span>`,`Deal one object to each person in turn, then count every share. Equal shares contain the same number.`,`Share 8 objects among 4 people and prove the share is fair.`],
 ["E2","Count and share a collection",`<span>${dots(9)}</span><b>→ 3 groups →</b><strong>3 in each</strong>`,`Count the whole collection, distribute one at a time, then subitise or count each group to find how many each person receives.`,`Share 9 beads among 3 people. State the whole, groups and amount in each.`],
 ["E3","Explore sharing through an instructive game",`<span>shared game pieces</span><b>→</b><span>equal turns or shares</span><b>→</b><strong>check fairness</strong>`,`Use an accurately sourced explanation of Yangamini from the Tiwi Peoples. Focus on how the game supports discussion of equal sharing.`,`After the sourced activity, explain how the sharing was checked as equal.`]
]);
add("AC9MFA01",[
 ["E1","Copy patterns in many forms",`<span>red blue green</span><span>red blue green</span><strong>repeat unit: ABC</strong>`,`Build, say, clap or move through the entire smallest repeating unit before continuing it.`,`Continue red–blue–green twice and name the repeating unit.`],
 ["E2","Find patterns in daily routines",`<span>plate</span><span>cup</span><span>plate</span><span>cup</span>`,`Notice repeated arrangements or actions that make familiar tasks predictable and easier to complete.`,`Describe the repeat in a simple table-setting arrangement.`],
 ["E3","Discuss a digitally created pattern",`<span>▲ ● ▲ ●</span><b>→</b><strong>triangle-circle repeats</strong>`,`Inspect a digital image, identify what repeats and describe the unit rather than only naming colours or objects.`,`Mark the repeating unit in ▲ ● ▲ ● ▲ ●.`],
 ["E4","Observe culturally situated patterns",`<span>observe</span><b>→</b><span>describe respectfully</span><b>→</b><strong>identify repeat</strong>`,`Use an appropriately sourced First Nations artwork, performance or material-culture example. Observe and describe the visible or heard repetition without copying restricted designs.`,`Using the selected source, identify and describe one repeated element.`]
]);
add("AC9MFM01",[
 ["E1","Match words to attributes",`<span>long / short → length</span><span>heavy / light → mass</span><span>holds more → capacity</span><span>takes longer → duration</span>`,`Name the attribute before comparing so the describing word matches what is being measured.`,`Sort comparison words under length, mass, capacity or duration.`],
 ["E2","Compare length directly and fairly",`<span>|──── spoon</span><span>|──────── fork</span><strong>same starting point</strong>`,`Align the bases or endpoints before deciding which object is longer or shorter, then explain the visible evidence.`,`Line up two pencils at one end and justify which is longer.`],
 ["E3","Compare duration from the same start",`<span>event A starts</span><span>event B starts</span><b>→</b><strong>later finish = longer duration</strong>`,`Start both events together. The event still happening after the other finishes takes longer.`,`Start two actions together and explain which took longer.`],
 ["E4","Compare mass by hefting",`<span>tin</span><b>↔ heft ↔</b><span>marshmallow packet</span><strong>heavier / lighter</strong>`,`Hold one object in each hand or use a balance. Do not judge mass from size alone; distinguish mass from length.`,`Heft two pantry objects and give evidence for heavier and lighter.`]
]);
function css(){if(document.getElementById("foundation-elab-css"))return;const s=document.createElement("style");s.id="foundation-elab-css";s.textContent=`
.elaboration-intro{margin:0 0 10px;color:#49627f}.elaboration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.elaboration-card{border:1px solid #d9e5f5;border-radius:14px;padding:13px;background:#fbfcfe;box-shadow:0 2px 7px rgba(23,57,104,.04)}.elaboration-card h3{margin:4px 0 7px;color:#173968}.elaboration-idea{margin:0 0 9px;font-weight:700;color:#304963}.elaboration-visual{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;min-height:82px;padding:10px;border:1px solid #d8e4f2;border-radius:11px;background:#fff}.elaboration-visual>span,.elaboration-visual>strong{padding:6px 8px;border-radius:8px;background:#eef5ff}.elaboration-visual .ev-caption{flex-basis:100%;text-align:center;font-size:.76rem;font-weight:800;color:#49627f}.ev-dots{display:inline-flex!important;gap:4px;max-width:176px;justify-content:center;flex-wrap:wrap}.ev-dots i{width:12px;height:12px;border-radius:50%;background:#2457d6}.ev-position{display:grid;text-align:center;gap:2px}.ev-position small{font-weight:900;color:#2457d6}.elaboration-steps{margin:10px 0;padding-left:1.25rem}.elaboration-steps li{margin:3px 0}.elaboration-example,.elaboration-teacher-say,.elaboration-misconception,.elaboration-check{margin:9px 0 0;padding:9px 10px;border-radius:10px;font-size:.88rem}.elaboration-example{background:#eef5ff;border-left:4px solid #2457d6}.elaboration-teacher-say{background:#f7fbf8;border-left:4px solid #47925c}.elaboration-misconception{background:#fff8ec;border-left:4px solid #d28b27}.elaboration-check{background:#f4f8f5;border:1px solid #d7e9dc}.elaboration-card p{font-size:.88rem}.teacher-elaboration-accordion{display:grid;gap:4px}.teacher-elaboration-card{border:1px solid #d9e5f5;border-radius:8px;background:#fbfcfe;overflow:hidden}.teacher-elaboration-card[open]{border-color:#afc6e7;background:#f7faff}.teacher-elaboration-card summary{display:flex;align-items:center;gap:6px;cursor:pointer;padding:5px 7px;font-size:.66rem;font-weight:800;color:#173968;list-style:none}.teacher-elaboration-card summary::-webkit-details-marker{display:none}.teacher-elaboration-card summary::after{content:"+";margin-left:auto;color:#2457d6}.teacher-elaboration-card[open] summary::after{content:"−"}.teacher-elaboration-body{display:grid;grid-template-columns:minmax(160px,.8fr) minmax(0,1.4fr);gap:7px;padding:0 7px 7px}.teacher-elaboration-card .elaboration-visual{min-height:54px;padding:4px;gap:3px}.teacher-elaboration-card .elaboration-visual>span,.teacher-elaboration-card .elaboration-visual>strong{font-size:.59rem;padding:3px 4px}.teacher-elaboration-card .ev-dots{gap:2px}.teacher-elaboration-card .ev-dots i{width:6px;height:6px}.teacher-elaboration-card p{font-size:.62rem;line-height:1.24;margin:3px 0}.teacher-elaboration-card .mini-label{font-size:.56rem}.teacher-elaboration-card .ev-caption{font-size:.52rem}
@media(max-width:680px){.elaboration-grid{grid-template-columns:1fr}.teacher-elaboration-body{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function topicCard(e){const steps=e.steps?.length?`<ol class="elaboration-steps">${e.steps.map(step=>`<li>${step}</li>`).join("")}</ol>`:"";return `<article class="elaboration-card"><span class="mini-label">${e.label}</span><h3>${e.title}</h3>${e.idea?`<p class="elaboration-idea">${e.idea}</p>`:""}<div class="elaboration-visual">${e.visual}</div>${steps}${e.worked?`<div class="elaboration-example"><strong>Worked teaching example:</strong> ${e.worked}</div>`:""}${e.say?`<div class="elaboration-teacher-say"><strong>Teacher language:</strong> “${e.say}”</div>`:`<p><strong>Teach:</strong> ${e.teach}</p>`}${e.mistake?`<div class="elaboration-misconception"><strong>Watch for:</strong> ${e.mistake}<br><strong>Respond:</strong> ${e.fix}</div>`:""}<div class="elaboration-check"><strong>Quick check:</strong> ${e.check}</div></article>`}
function teacherCard(e,i){return `<details class="teacher-elaboration-card" name="foundation-elaboration"${i===0?" open":""}><summary><span class="mini-label">${e.label}</span><span>${e.title}</span></summary><div class="teacher-elaboration-body"><div class="elaboration-visual">${e.visual}</div><div><p><strong>Teach:</strong> ${e.teach}</p>${e.mistake?`<p><strong>Watch:</strong> ${e.mistake} <strong>Respond:</strong> ${e.fix}</p>`:""}<p><strong>Ask:</strong> ${e.check}</p></div></div></details>`}
function install(){const code=window.skillrPageMeta?.curriculumCode||new URLSearchParams(location.search).get("code")?.toUpperCase(),u=D[code];if(!u?.elaborations)return false;if(document.querySelector(`[data-elaboration-visuals="${code}"]`))return true;const teacher=document.body.dataset.skillrTeacherHost==="true";const host=document.querySelector(teacher?".grid":".combined-lesson-content");if(!host)return false;const section=document.createElement(teacher?"article":"section");section.className=teacher?"card full":"lesson-part";section.dataset.elaborationVisuals=code;section.innerHTML=teacher?`<span class="tag">Curriculum ideas</span><h2>Open one elaboration at a time</h2><div class="teacher-elaboration-accordion">${u.elaborations.map(teacherCard).join("")}</div>`:`<h3>Teach every curriculum idea</h3><p class="elaboration-intro">Each elaboration below is a short teaching sequence—not a curriculum summary. Model the idea, use the suggested language, correct the likely misconception, then check understanding.</p><div class="elaboration-grid">${u.elaborations.map(topicCard).join("")}</div>`;host.appendChild(section);return true}
css();if(!install()){const o=new MutationObserver(()=>{if(install())o.disconnect()});o.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>o.disconnect(),8000)}
}());
