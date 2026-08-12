(function(){
"use strict";
const D=window.SkillrFoundationMathsData;if(!D)return;
const CODES=new Set(["AC9MFN01","AC9MFN06","AC9MFA01","AC9MFM01"]);
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
 {
  label:"E1",
  title:"Role-play a fair share",
  idea:"Equal sharing means every recipient receives the same number. Dealing one object to each recipient in repeated rounds makes a fair share visible.",
  visual:`<span>person A ${dots(2)}</span><span>person B ${dots(2)}</span><span>person C ${dots(2)}</span><span>person D ${dots(2)}</span>`,
  steps:["Count the recipients and the whole collection.","Deal one object to each recipient in turn, repeating complete rounds.","Count each share and compare the amounts."],
  worked:"Four children share 8 cards. Deal one card to each child, then deal a second round. Each child has 2 cards, so the share is equal and all 8 cards have been used.",
  say:"A fair share gives the same number to each person. We can prove it by counting every share.",
  mistake:"The child gives several objects to one person before moving on, or decides a share is fair because it looks similar.",
  fix:"Return the objects to the whole collection and deal one at a time in complete rounds. Count every final share.",
  teach:"Role-play familiar sharing situations with people, toys or plates. Connect the action of dealing in rounds to the condition that every share must contain the same number.",
  check:"Share 8 objects among 4 people and prove the share is fair without relying only on how it looks."
 },
 {
  label:"E2",
  title:"Count and share a collection",
  idea:"In an equal-sharing situation, the whole collection is distributed among a known number of groups. The result tells how many are in each group.",
  visual:`<span>${dots(9)}</span><b>→ 3 groups →</b><strong>3 in each</strong>`,
  steps:["Count the whole collection and name the number of groups.","Distribute one object to each group until none remain.","Subitise or count one group, then confirm that every group is equal."],
  worked:"There are 9 beads and 3 bowls. Place one bead in each bowl repeatedly. The 9 beads make 3 equal groups with 3 beads in each bowl.",
  say:"Nine is the whole, three is the number of groups, and three in each is the fair share.",
  mistake:"The child reports the number of groups when asked how many are in each group, or leaves an object outside the sharing situation.",
  fix:"Ask the child to point to and name the whole, the groups and the number in each group separately.",
  teach:"Use small collections that share equally, then vary the objects and recipients while keeping the relationship between whole, groups and amount in each explicit.",
  check:"Share 9 beads among 3 people. State the whole, the number of groups and the amount in each group."
 },
 {
  label:"E3",
  title:"Explore sharing through an instructive game",
  idea:"A culturally situated game can provide a meaningful context for noticing equal turns and equal shares when it is taught from an authoritative source and with accurate attribution.",
  visual:`<span>approved source</span><b>→</b><span>play as documented</span><b>→</b><strong>discuss fair sharing</strong>`,
  steps:["Select an authorised description of Yangamini and acknowledge the Tiwi Peoples of Bathurst Island.","Teach and play the game exactly as the selected source documents it.","Pause at a genuine sharing moment and ask children to show how they know the shares are equal."],
  worked:"After playing Yangamini from the approved source, photograph or sketch one documented sharing moment. Children count the items or turns for each player and explain whether the amounts are equal.",
  say:"We are learning this game from a source that acknowledges the Tiwi Peoples. We will follow that source and use the sharing we see to discuss fairness.",
  mistake:"The teacher invents or blends rules, presents one game as representative of all First Nations Peoples, or removes the cultural attribution.",
  fix:"Use the Australian Curriculum reference together with an authorised teaching source, retain the specific Tiwi attribution and omit the activity if accurate local guidance is unavailable.",
  teach:"Use the curriculum-named Yangamini example only through an authorised, accurately attributed source. Let the documented game create the context; do not manufacture cultural details to fit a maths task.",
  check:"After the sourced activity, identify one documented sharing moment and explain how the group checked whether it was equal."
 }
]);
add("AC9MFA01",[
 {
  label:"E1",
  title:"Copy patterns in many forms",
  idea:"A repeating pattern is made by repeating the same unit in the same order. The unit may be made from objects, shapes, sounds or movements.",
  visual:`<span>red blue green</span><span>red blue green</span><strong>repeat unit: ABC</strong>`,
  steps:["Experience the whole pattern by looking, listening or moving.","Find the smallest unit that repeats in the same order.","Copy the complete unit, then repeat it to continue the pattern."],
  worked:"Build red–blue–green, red–blue–green. The smallest unit is red–blue–green. Copy that whole unit twice more; do not stop after only red–blue.",
  say:"The unit is the smallest part that repeats. I must repeat every part of it in the same order.",
  mistake:"The child copies only the last item, repeats part of the unit or names every item as the repeating unit.",
  fix:"Place a loop or frame around one complete unit, say it rhythmically, then move the frame to the next matching unit.",
  teach:"Move between materials, shape cards, claps, sounds and body movements so children recognise that repeating structure is independent of the form used.",
  check:"Continue red–blue–green for two more units and mark the smallest repeating unit."
 },
 {
  label:"E2",
  title:"Find patterns in daily routines",
  idea:"Repeated arrangements and actions occur in familiar routines. Naming the repeated unit helps us predict what comes next and organise a task consistently.",
  visual:`<span>plate</span><span>cup</span><span>plate</span><span>cup</span>`,
  steps:["Notice an arrangement or action that occurs more than once.","Say the repeated unit from beginning to end.","Use the unit to predict and complete the next part of the routine."],
  worked:"Along a table the arrangement is plate–cup, plate–cup, plate–cup. The unit is plate–cup, so the next two items are a plate and then a cup.",
  say:"I know what comes next because the same unit repeats in the same order.",
  mistake:"The child calls any routine a repeating pattern even when its parts do not recur in a fixed order.",
  fix:"Record two or more cycles and compare them. If the same unit cannot be matched, describe it as a sequence rather than a repeating pattern.",
  teach:"Invite children to notice genuine repeats in packing away, lining up, setting a table or moving through a familiar action sequence, then represent the repeat with objects or symbols.",
  check:"Describe the repeating unit in a plate–cup table setting and use it to predict the next two items."
 },
 {
  label:"E3",
  title:"Discuss a digitally created pattern",
  idea:"Digital tools can create an image that looks complex, but a mathematical repeating pattern still needs an identifiable unit repeated in the same order.",
  visual:`<span>▲ ● ▲ ●</span><b>→</b><strong>triangle-circle repeats</strong>`,
  steps:["Inspect the digital image and identify the features that might repeat.","Frame the smallest possible unit and compare it with later sections.","Confirm the unit repeats exactly, then describe or continue it."],
  worked:"In ▲ ● ▲ ● ▲ ●, frame ▲ ●. The same two-shape unit occurs three times in the same order, so it is a repeating pattern.",
  say:"An image can look patterned without having a repeating unit. I need to show exactly what repeats.",
  mistake:"The child identifies colours or shapes in the image but cannot locate a repeated unit, or assumes decorative variety is a repeating pattern.",
  fix:"Crop or cover the image so only one candidate unit is visible, then slide the frame across the image to test for exact matches.",
  teach:"Use teacher-selected digital or generative images as objects for mathematical critique. Ask children to verify the repetition rather than trusting a label or visual impression.",
  check:"Mark the repeating unit in ▲ ● ▲ ● ▲ ● and explain how you verified it."
 },
 {
  label:"E4",
  title:"Observe culturally situated patterns",
  idea:"Patterns on Country/Place and in First Nations artworks, performances and material cultures are culturally situated. Mathematical noticing must sit alongside attribution, context and respect for Indigenous Cultural and Intellectual Property.",
  visual:`<span>approved source</span><b>→</b><span>observe in context</span><b>→</b><strong>describe respectfully</strong>`,
  steps:["Choose a community-approved or institutionally authorised source and name the artist, creator, People and context provided.","Observe or listen for a repeated element without separating it from the source's explanation.","Describe the visible, heard or movement-based repeat; do not copy culturally specific motifs or designs."],
  worked:"Using an authorised classroom resource, the teacher reads its attribution and context aloud. Children point to or echo a permitted repeated colour, sound or movement and describe its sequence without recreating the work's cultural design.",
  say:"We can notice mathematical repetition while respecting that this work and its knowledge belong in a specific cultural context.",
  mistake:"The activity uses unattributed images, treats First Nations cultures as one culture, or asks children to imitate a culturally specific design.",
  fix:"Replace the source with an authorised, properly attributed resource and redesign the task around observation and description. Seek local guidance where appropriate.",
  teach:"Use an appropriately sourced example connected to a named People and context. Keep attribution visible and follow the source or community guidance about what may be shared, performed or reproduced.",
  check:"From the selected authorised source, identify one permitted repeated element and describe it while retaining its attribution and context."
 }
]);
add("AC9MFM01",[
 {
  label:"E1",
  title:"Match comparison words to attributes",
  idea:"Objects and events can be compared in different ways. The comparison word must name the attribute being considered: length, mass, capacity or duration.",
  visual:`<span>long / short → length</span><span>heavy / light → mass</span><span>holds more → capacity</span><span>takes longer → duration</span>`,
  steps:["Name what is being compared: length, mass, capacity or duration.","Choose words that belong to that attribute.","Complete a comparison sentence and give evidence."],
  worked:"A bottle may be taller than a lunch box but lighter than it. ‘Taller’ compares length; ‘lighter’ compares mass. The words are not interchangeable.",
  say:"First name the attribute. Then choose a word that compares that attribute.",
  mistake:"The child uses ‘bigger’ for every comparison or mixes words such as longer, heavier and holds more.",
  fix:"Ask, ‘Bigger in what way?’ Sort comparison cards beneath the four attribute headings before comparing objects.",
  teach:"Contrast the attributes using the same pair of objects where possible, so children learn that one object can be longer yet lighter, or shorter yet hold more.",
  check:"Sort long, heavy, holds less and takes longer under length, mass, capacity or duration, then use each in a comparison sentence."
 },
 {
  label:"E2",
  title:"Compare length directly and fairly",
  idea:"A direct length comparison is fair when objects are straight and aligned at the same starting point. The endpoint that extends farther shows the longer object.",
  visual:`<span>|──── spoon</span><span>|──────── fork</span><strong>same starting point</strong>`,
  steps:["Place the objects beside each other and straighten them.","Align one end of each object at the same starting line.","Compare the other endpoints and state which is longer or shorter."],
  worked:"Place two pencils against the same edge of a book. Pencil B extends beyond pencil A, so pencil B is longer and pencil A is shorter.",
  say:"The starts are even. This endpoint goes farther, so this object is longer.",
  mistake:"The child compares misaligned objects and selects the one whose end is farther from the table edge, or judges by height in the picture.",
  fix:"Draw or use a clear starting line. Slide both objects back to it without changing their orientation, then compare again.",
  teach:"Begin with objects that can be placed side by side. Vary their positions deliberately so children learn why alignment, not appearance, makes the comparison fair.",
  check:"Line up two pencils at one end, identify the longer pencil and explain how the alignment provides evidence."
 },
 {
  label:"E3",
  title:"Compare duration from the same start",
  idea:"Duration is how long an event lasts. When two events begin together, the event that finishes later has the longer duration.",
  visual:`<span>event A starts</span><span>event B starts</span><b>→</b><strong>later finish = longer duration</strong>`,
  steps:["Choose two observable actions and begin them at the same signal.","Watch until the first action finishes, while noting whether the other continues.","State which lasted longer or shorter and describe the evidence."],
  worked:"Start singing a short rhyme and rolling a ball at the same time. The ball stops first while the rhyme continues, so the rhyme has the longer duration.",
  say:"They started together. This event was still happening after the other stopped, so it lasted longer.",
  mistake:"The child decides an event took longer because it finished later, even though it also started later.",
  fix:"Repeat both events from one clear start signal. Emphasise that both the beginning and ending matter when comparing duration.",
  teach:"Use actions that children can start together and observe directly. Contrast fair same-start comparisons with examples where different start times make the finish alone insufficient.",
  check:"Start two actions together and explain which has the longer duration using what happened at the finish."
 },
 {
  label:"E4",
  title:"Compare mass by hefting",
  idea:"Mass describes how heavy an object is. Hefting or using a balance provides direct evidence; an object's size or length does not determine its mass.",
  visual:`<span>tin</span><b>↔ heft ↔</b><span>marshmallow packet</span><strong>heavier / lighter</strong>`,
  steps:["Predict which object may be heavier, while naming the prediction as a guess.","Hold one object in each hand and gently heft them, or place them on a balance.","Use the evidence to state which is heavier and which is lighter."],
  worked:"A large packet of marshmallows looks bigger than a small unopened tin. The tin pulls down more strongly when hefted and lowers its side of a balance, so the tin is heavier.",
  say:"Size tells us how much space an object takes up. Hefting gives evidence about its mass.",
  mistake:"The child assumes the taller, longer or larger-looking object must be heavier.",
  fix:"Compare a large light object with a small heavy object, record the prediction and then test it by hefting or balancing.",
  teach:"Use safe, familiar objects with contrasting size and mass. Treat predictions as ideas to test and insist that the comparison statement follows the physical evidence.",
  check:"Heft two safe classroom objects, identify the heavier and lighter object and explain why size alone was not enough."
 }
]);
function css(){if(document.getElementById("foundation-elab-css"))return;const s=document.createElement("style");s.id="foundation-elab-css";s.textContent=`
.elaboration-intro{margin:0 0 10px;color:#49627f}.elaboration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.elaboration-card{border:1px solid #d9e5f5;border-radius:14px;padding:13px;background:#fbfcfe;box-shadow:0 2px 7px rgba(23,57,104,.04)}.elaboration-card h3{margin:4px 0 7px;color:#173968}.elaboration-idea{margin:0 0 9px;font-weight:700;color:#304963}.elaboration-visual{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;min-height:82px;padding:10px;border:1px solid #d8e4f2;border-radius:11px;background:#fff}.elaboration-visual>span,.elaboration-visual>strong{padding:6px 8px;border-radius:8px;background:#eef5ff}.elaboration-visual .ev-caption{flex-basis:100%;text-align:center;font-size:.76rem;font-weight:800;color:#49627f}.ev-dots{display:inline-flex!important;gap:4px;max-width:176px;justify-content:center;flex-wrap:wrap}.ev-dots i{width:12px;height:12px;border-radius:50%;background:#2457d6}.ev-position{display:grid;text-align:center;gap:2px}.ev-position small{font-weight:900;color:#2457d6}.elaboration-steps{margin:10px 0;padding-left:1.25rem}.elaboration-steps li{margin:3px 0}.elaboration-example,.elaboration-teacher-say,.elaboration-misconception,.elaboration-check{margin:9px 0 0;padding:9px 10px;border-radius:10px;font-size:.88rem}.elaboration-example{background:#eef5ff;border-left:4px solid #2457d6}.elaboration-teacher-say{background:#f7fbf8;border-left:4px solid #47925c}.elaboration-misconception{background:#fff8ec;border-left:4px solid #d28b27}.elaboration-check{background:#f4f8f5;border:1px solid #d7e9dc}.elaboration-card p{font-size:.88rem}.teacher-elaboration-accordion{display:grid;gap:4px}.teacher-elaboration-card{border:1px solid #d9e5f5;border-radius:8px;background:#fbfcfe;overflow:hidden}.teacher-elaboration-card[open]{border-color:#afc6e7;background:#f7faff}.teacher-elaboration-card summary{display:flex;align-items:center;gap:6px;cursor:pointer;padding:5px 7px;font-size:.66rem;font-weight:800;color:#173968;list-style:none}.teacher-elaboration-card summary::-webkit-details-marker{display:none}.teacher-elaboration-card summary::after{content:"+";margin-left:auto;color:#2457d6}.teacher-elaboration-card[open] summary::after{content:"−"}.teacher-elaboration-body{display:grid;grid-template-columns:minmax(160px,.8fr) minmax(0,1.4fr);gap:7px;padding:0 7px 7px}.teacher-elaboration-card .elaboration-visual{min-height:54px;padding:4px;gap:3px}.teacher-elaboration-card .elaboration-visual>span,.teacher-elaboration-card .elaboration-visual>strong{font-size:.59rem;padding:3px 4px}.teacher-elaboration-card .ev-dots{gap:2px}.teacher-elaboration-card .ev-dots i{width:6px;height:6px}.teacher-elaboration-card p{font-size:.62rem;line-height:1.24;margin:3px 0}.teacher-elaboration-card .mini-label{font-size:.56rem}.teacher-elaboration-card .ev-caption{font-size:.52rem}
@media(max-width:680px){.elaboration-grid{grid-template-columns:1fr}.teacher-elaboration-body{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function topicCard(e,code){const id=`${code.toLowerCase()}-${e.label.toLowerCase()}`,steps=e.steps?.length?`<ol class="elaboration-steps">${e.steps.map(step=>`<li>${step}</li>`).join("")}</ol>`:"";return `<article class="elaboration-card" id="${id}"><span class="mini-label">${e.label}</span><h3>${e.title}</h3>${e.idea?`<p class="elaboration-idea">${e.idea}</p>`:""}<div class="elaboration-visual">${e.visual}</div>${steps}${e.worked?`<div class="elaboration-example"><strong>Worked teaching example:</strong> ${e.worked}</div>`:""}${e.say?`<div class="elaboration-teacher-say"><strong>Teacher language:</strong> “${e.say}”</div>`:`<p><strong>Teach:</strong> ${e.teach}</p>`}${e.mistake?`<div class="elaboration-misconception"><strong>Watch for:</strong> ${e.mistake}<br><strong>Respond:</strong> ${e.fix}</div>`:""}<div class="elaboration-check"><strong>Quick check:</strong> ${e.check}</div></article>`}
function teacherCard(e,i,code,slug){const id=`${code.toLowerCase()}-${e.label.toLowerCase()}`;return `<details class="teacher-elaboration-card" name="foundation-elaboration"${i===0?" open":""}><summary><span class="mini-label">${e.label}</span><span>${e.title}</span></summary><div class="teacher-elaboration-body"><div class="elaboration-visual">${e.visual}</div><div>${e.worked?`<p><strong>Worked:</strong> ${e.worked}</p>`:""}<p><strong>Teach:</strong> ${e.teach}</p>${e.mistake?`<p><strong>Watch:</strong> ${e.mistake} <strong>Respond:</strong> ${e.fix}</p>`:""}<p><strong>Ask:</strong> ${e.check}</p><p><a href="/foundation/maths/${slug}/#${id}" target="_blank" rel="noopener">Open full topic example ↗</a></p></div></div></details>`}
function install(){const code=window.skillrPageMeta?.curriculumCode||new URLSearchParams(location.search).get("code")?.toUpperCase(),u=D[code];if(!CODES.has(code)||!u?.elaborations)return false;if(document.querySelector(`[data-elaboration-visuals="${code}"]`))return true;const teacher=document.body.dataset.skillrTeacherHost==="true";const host=document.querySelector(teacher?".grid":".combined-lesson-content");if(!host)return false;const section=document.createElement(teacher?"article":"section");section.className=teacher?"card full":"lesson-part";section.dataset.elaborationVisuals=code;section.innerHTML=teacher?`<span class="tag">Curriculum ideas</span><h2>Open one elaboration at a time</h2><div class="teacher-elaboration-accordion">${u.elaborations.map((e,i)=>teacherCard(e,i,code,u.slug)).join("")}</div>`:`<h3>Teach every curriculum idea</h3><p class="elaboration-intro">Each elaboration below is a short teaching sequence—not a curriculum summary. Follow the steps, use the suggested language, correct the likely misconception, then check understanding.</p><div class="elaboration-grid">${u.elaborations.map(e=>topicCard(e,code)).join("")}</div>`;host.appendChild(section);return true}
(window.SkillrFoundationMathsElaborationInstallers??=[]).push(install);css();if(!install()){const o=new MutationObserver(()=>{if(install())o.disconnect()});o.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>o.disconnect(),8000)}
}());
