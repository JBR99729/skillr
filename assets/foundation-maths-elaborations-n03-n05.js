(function(){
"use strict";
const D=window.SkillrFoundationMathsData;if(!D)return;
const row=n=>`<span class="ev-dots">${"<i></i>".repeat(n)}</span>`;
const put=(c,e)=>{if(D[c])D[c].elaborations=e};
put("AC9MFN03",[
 {
  label:"E1",title:"Count each object once and know the total",
  idea:"Accurate counting uses one number word for each object. The final number word tells how many are in the whole collection, and rearranging the objects does not change that total.",
  visual:`<span>touch or move</span>${row(7)}<b>→</b><strong>7 altogether</strong><div class="ev-caption">same 7 after rearranging</div>`,
  steps:["Choose a clear starting object.","Touch or move each object once while saying the count sequence.","State the total, then rearrange and predict whether it changes."],
  worked:"Move 7 counters into a counted row while saying 1 to 7. Say, ‘The last number was 7, so there are 7 altogether.’ Spread the same counters and confirm that none were added or removed.",
  say:"The last number I said tells how many are in the whole collection.",
  mistake:"The student skips or double-counts an object, or recounts because a spread-out collection looks larger.",
  fix:"Move counted objects into a finished area and ask whether any object was added or removed during rearrangement.",
  teach:"Move or touch every object once, state the final count as the total and demonstrate conservation after rearranging.",
  check:"Count 7 counters, spread them apart and explain why the total remains 7."
 },
 {
  label:"E2",title:"Compare counted collections fairly",
  idea:"Collections can be compared by counting their totals or matching objects one-to-one. More, fewer and the same describe the relationship between the collections.",
  visual:`<span>A ${row(8)}</span><span>B ${row(6)}</span><b>→</b><strong>A has 2 more</strong>`,
  steps:["Count each collection accurately.","Align or pair like objects one-to-one.","Name the comparison and explain the unmatched objects."],
  worked:"Count 8 blue counters and 6 red counters. Pair one blue with one red. Six pairs are made and 2 blue counters remain, so blue has 2 more and red has 2 fewer.",
  say:"I did not judge by how much space the collections used. I counted and matched the objects.",
  mistake:"The student chooses the more spread-out collection or compares unlike units.",
  fix:"Use like objects, align the rows at the same starting point and pair them one-to-one.",
  teach:"Count and align like collections, then justify more, fewer or the same using the totals and unmatched objects.",
  check:"Compare collections of 8 and 6 using both counting and one-to-one matching."
 },
 {
  label:"E3",title:"Work out how many items are needed",
  idea:"One-to-one correspondence helps solve practical problems: when each person needs one item, the number of items must match the number of people.",
  visual:`<span>child ↔ pencil</span><span>child ↔ pencil</span><span>child ↔ pencil</span><span>child ↔ pencil</span><div class="ev-caption">4 children need 4 pencils</div>`,
  steps:["Count the people or places needing an item.","Collect that total number of items.","Pair one item with each recipient and check none are missing or left over."],
  worked:"There are 4 children at a table. Count the children, collect 4 pencils and give one to each child. No child is missed and no pencil remains.",
  say:"The count of people tells me how many items to collect because each person needs exactly one.",
  mistake:"The student guesses a handful of items or counts the items without checking each recipient.",
  fix:"Count recipients first and complete a visible one-person-to-one-item pairing.",
  teach:"Count the recipients, collect the same number of required items and verify the match one-to-one.",
  check:"Show how many pencils 4 children need when each child receives one."
 },
 {
  label:"E4",title:"Recognise different representations of the same count",
  idea:"People and cultures use different tools and gestures to represent number. The representation can change while the quantity it communicates stays the same.",
  visual:`<span>${row(5)} counters</span><b>↔</b><span>5 beads on a counting tool</span><b>↔</b><strong>5</strong>`,
  steps:["Introduce one accurately sourced representation and its convention.","Match it to a familiar collection and numeral.","Discuss what is different visually and what number stays the same."],
  worked:"Show 5 counters and an accurately modelled counting tool displaying 5. Match both to the numeral 5 and explain that the materials differ but each representation communicates five.",
  say:"The way five is shown can change; the quantity five does not.",
  mistake:"The student treats an unfamiliar representation as decoration or assumes one convention is used by every community.",
  fix:"Use a specific reliable source, name the context accurately and match each representation to a counted collection.",
  teach:"Compare familiar quantities with accurately sourced counting tools or numeral gestures from a specific cultural context.",
  check:"Represent 5 with counters and one sourced counting representation, then explain how they match."
 },
 {
  label:"E5",title:"Use one-to-one body tallying from an appropriate source",
  idea:"In a taught body-tally system, each next object is paired with the next body point in a fixed sequence. This uses the same one-to-one principle as touching each object while counting.",
  visual:`<span>object 1 ↔ taught point 1</span><span>object 2 ↔ taught point 2</span><span>continue in sourced sequence</span>`,
  steps:["Use a local or authoritative First Nations source for the specific sequence.","Pair each object with exactly one taught body point.","Stop at the final matched point and state the represented total as taught."],
  worked:"After introducing a community-approved sequence, match 5 objects one-to-one with its first 5 taught body points. Check that no point or object was repeated.",
  say:"Each object is matched once to the next point in the sequence, so the tally stays accurate.",
  mistake:"An invented or generic body sequence is presented as though all First Nations Peoples use the same system.",
  fix:"Do not improvise cultural content. Use a named, appropriate source or replace the activity until one is available.",
  teach:"With an appropriate First Nations source, use the taught body-tally sequence to model one-to-one correspondence to 20.",
  check:"Using the sourced sequence, match 5 objects to 5 taught body points and explain the one-to-one correspondence."
 }
]);
put("AC9MFN04",[
 {
  label:"E1",title:"See parts inside a ten-frame whole",
  idea:"A ten-frame makes five a visible anchor. A filled row of 5 and 2 more can be recognised as 7 without recounting all seven counters.",
  visual:`<span>${row(5)}</span><b>+</b><span>${row(2)}</span><b>→</b><strong>5 and 2 more make 7</strong>`,
  steps:["Fill the first row of the ten-frame from the same starting corner.","Subitise the full group of 5 and the extra counters.","Name both parts and the whole."],
  worked:"Show a full row of 5 counters and 2 counters on the next row. Say, ‘I know the full row is 5. I see 2 more. Five and two make seven.’",
  say:"I used five as an anchor, so I did not need to start counting again at one.",
  mistake:"The student ignores the structure and recounts every counter, or fills the frame randomly.",
  fix:"Always fill from one corner across the row and ask, ‘Do you see a full five?’",
  teach:"Use a consistently filled ten-frame so students can subitise 5 and the additional part, then name the whole.",
  check:"Show 7 on a ten-frame and explain it as 5 and 2 more."
 },
 {
  label:"E2",title:"Partition the same whole in different ways",
  idea:"A whole collection can be separated into different pairs of parts. Moving objects between the parts changes the partition but not the total.",
  visual:`<span>6 = 5 + 1</span><span>6 = 4 + 2</span><span>6 = 3 + 3</span><div class="ev-caption">different parts • same whole</div>`,
  steps:["Build and count the whole.","Separate it into two visible parts and name each part.","Recombine to check the whole, then partition it another way."],
  worked:"Build 6 counters. Split them into 4 and 2, then recombine to confirm 6. Move one counter to make 3 and 3; the parts changed but all 6 counters remain.",
  say:"The parts are inside the whole. We did not make extra counters when we split them.",
  mistake:"The student counts the two parts as additional to the whole or believes reversing the parts changes the total.",
  fix:"Use the same counters throughout and physically recombine after every partition.",
  teach:"Split one fixed collection in several ways, name both parts and recombine to preserve the whole.",
  check:"Show two different partitions of 6 and explain why each still has a whole of 6."
 },
 {
  label:"E3",title:"Combine familiar dot patterns into a whole",
  idea:"Standard dice and domino patterns make small parts easy to recognise. Combining the recognised parts gives the whole without counting every dot.",
  visual:`<span>domino ${row(3)}</span><b>|</b><span>${row(2)}</span><b>→</b><strong>3 + 2 = 5</strong>`,
  steps:["Subitise each side of the domino or dice pattern.","Say the two parts.","Combine the parts and name the whole."],
  worked:"On a domino, recognise 3 dots on one side and 2 on the other. Say, ‘Three and two make five’, then verify the whole with counters if needed.",
  say:"I recognised each part first, then joined the parts to know the whole.",
  mistake:"The student names only one side or begins a single long count across both patterns.",
  fix:"Cover one side at a time, name both recognised parts, then reveal and combine them.",
  teach:"Use familiar standard dot configurations to subitise two parts and combine them into a whole up to 10.",
  check:"Name the parts and whole on a domino showing 4 and 2."
 },
 {
  label:"E4",title:"Explore sourced First Nations number groupings",
  idea:"A number can be formed and partitioned through grouping conventions represented in different ways. The mathematical focus is how the groups combine to quantify a collection.",
  visual:`<span>sourced group</span><b>+</b><span>sourced group</span><b>→</b><strong>whole collection</strong>`,
  steps:["Select an appropriate local or authoritative First Nations source.","Reproduce only the grouping convention the source permits for teaching.","Apply it to a collection on Country/Place and explain parts and whole."],
  worked:"Using the approved grouping convention, represent a collection of 5 natural objects as two taught groups. Recombine the groups and confirm that the whole remains 5.",
  say:"The grouping representation comes from this specific sourced context; our maths question is how its parts form the whole.",
  mistake:"A generic or invented grouping is labelled as a universal First Nations counting system.",
  fix:"Name the specific source and context, respect usage guidance and omit the cultural example when an appropriate source is unavailable.",
  teach:"Use an appropriate First Nations source to explore how taught number groupings form and partition collections on Country/Place.",
  check:"Using the sourced convention, represent one collection as parts and explain how the parts recombine into the whole."
 }
]);
put("AC9MFN05",[
 {
  label:"E1",title:"Act, draw and record joining or separating stories",
  idea:"Addition stories join or increase a collection; subtraction stories separate or decrease it. Acting out the change makes the mathematical relationship visible before it is recorded.",
  visual:`<span>8 objects</span><b>− 3 move away</b><strong>5 remain</strong><div class="ev-caption">start → action → result</div>`,
  steps:["Build and count the starting collection.","Perform exactly the action described in the story.","Draw before and after, then record the result with a numeral."],
  worked:"Build 8 kangaroo counters. Move 3 away while counting the moved counters, then count the 5 that remain. Draw the start, the action and the result; record 5.",
  say:"I watched what happened to the collection. Objects moved away, so the collection became smaller.",
  mistake:"The student chooses an operation from a keyword but does not represent what actually happened.",
  fix:"Pause after each story sentence and make the matching physical action before drawing or recording.",
  teach:"Role-play the start, change and result with materials, then connect the action to a drawing and numeral.",
  check:"Model a story that starts with 8 objects and removes 3; explain why 5 remain."
 },
 {
  label:"E2",title:"Quantify practical needs and simple money transactions",
  idea:"Counting and one-to-one matching solve everyday quantity problems. Whole-dollar prices can be paid by matching one $1 coin to each dollar in the price.",
  visual:`<span>4 people ↔ 4 scissors</span><span>$1 + $1 + $1 ↔ $3</span>`,
  steps:["Identify what must be counted or matched.","Build the required collection one item at a time.","Check the match and explain whether there is enough, too much or too little."],
  worked:"Count 4 children and collect 4 scissors, pairing one pair with each child. For a $3 item, count out three $1 coins and match each coin to one dollar.",
  say:"I know there are enough because every person—or every dollar—has exactly one matching item.",
  mistake:"The student counts the starting items but does not check the practical requirement, or treats the printed digit on a coin as the number of coins.",
  fix:"Use visible one-to-one pairing and count both the required amount and the supplied amount.",
  teach:"Role-play practical matching and whole-dollar purchases using one-to-one correspondence and counted $1 coins.",
  check:"Supply one item to each of 4 people and show how to pay $3 using $1 coins."
 },
 {
  label:"E3",title:"Represent an additive situation from a sourced First Nations story",
  idea:"A story can contain a mathematical change: a starting quantity, an action that joins or separates, and a resulting quantity. The cultural story remains more than a maths prompt and must be used respectfully.",
  visual:`<span>sourced story start</span><b>→ joining or separating action →</b><strong>represented result</strong>`,
  steps:["Choose an authorised or reliable version and preserve its cultural context.","Identify one visible additive action without reducing the whole story to arithmetic.","Represent that action with counters, drawings or movement and explain the result."],
  worked:"After reading the selected story in context, model one explicitly described change with counters: build the starting set, perform the action and show the new total.",
  say:"We are representing one mathematical change in this specific story; the story itself carries cultural meaning beyond our number model.",
  mistake:"An unsourced retelling is altered to manufacture a number problem or presented as representative of all First Nations Peoples.",
  fix:"Use a published, appropriate source, acknowledge its specific context and omit the activity if respectful use cannot be confirmed.",
  teach:"Use a culturally appropriate sourced story to identify and model one genuine joining or separating situation.",
  check:"Identify the start, action and result in the selected passage and build a matching material model."
 },
 {
  label:"E4",title:"Represent sets and actions from a sourced leaf-game story",
  idea:"Sets of objects can be joined, separated or compared as a story unfolds. Physical sets make each change observable and explainable.",
  visual:`<span>leaf set A</span><b>join / separate</b><span>leaf set B</span><b>→</b><strong>new set</strong>`,
  steps:["Use an accurately sourced leaf-game example and follow its stated teaching guidance.","Build the sets with permitted classroom materials.","Perform one story action and describe how the set changed."],
  worked:"Using the selected source, build two small sets representing the described game situation. Carry out one joining or separating action and count the resulting set.",
  say:"My model matches the sets and action described in this sourced game example.",
  mistake:"A generic counter activity is labelled as a specific community game without accurate sourcing or context.",
  fix:"Name the source and community accurately, follow permitted use and keep the mathematical model faithful to the example.",
  teach:"Use an accurately sourced leaf-game context to model sets, a joining or separating action and the resulting quantity.",
  check:"Build one sourced leaf-set situation, perform its action and explain what changed."
 }
]);
for(const u of Object.values(D))if(u.elaborations)u.elaborations=u.elaborations.map(item=>{
 if(!Array.isArray(item))return item;
 const [label,title,visual,teach,check]=item;
 return {label,title,visual,teach,check};
});
function css(){if(document.getElementById("foundation-elab-css"))return;const s=document.createElement("style");s.id="foundation-elab-css";s.textContent=`
.elaboration-intro{margin:0 0 10px;color:#49627f}.elaboration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.elaboration-card{border:1px solid #d9e5f5;border-radius:14px;padding:13px;background:#fbfcfe;box-shadow:0 2px 7px rgba(23,57,104,.04)}.elaboration-card h3{margin:4px 0 7px;color:#173968}.elaboration-idea{margin:0 0 9px;font-weight:700;color:#304963}.elaboration-visual{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;min-height:82px;padding:10px;border:1px solid #d8e4f2;border-radius:11px;background:#fff}.elaboration-visual>span,.elaboration-visual>strong{padding:6px 8px;border-radius:8px;background:#eef5ff}.elaboration-visual .ev-caption{flex-basis:100%;text-align:center;font-size:.76rem;font-weight:800;color:#49627f}.ev-dots{display:inline-flex!important;gap:4px;max-width:176px;justify-content:center;flex-wrap:wrap}.ev-dots i{width:12px;height:12px;border-radius:50%;background:#2457d6}.ev-position{display:grid;text-align:center;gap:2px}.ev-position small{font-weight:900;color:#2457d6}.elaboration-steps{margin:10px 0;padding-left:1.25rem}.elaboration-steps li{margin:3px 0}.elaboration-example,.elaboration-teacher-say,.elaboration-misconception,.elaboration-check{margin:9px 0 0;padding:9px 10px;border-radius:10px;font-size:.88rem}.elaboration-example{background:#eef5ff;border-left:4px solid #2457d6}.elaboration-teacher-say{background:#f7fbf8;border-left:4px solid #47925c}.elaboration-misconception{background:#fff8ec;border-left:4px solid #d28b27}.elaboration-check{background:#f4f8f5;border:1px solid #d7e9dc}.elaboration-card p{font-size:.88rem}.teacher-elaboration-accordion{display:grid;gap:4px}.teacher-elaboration-card{border:1px solid #d9e5f5;border-radius:8px;background:#fbfcfe;overflow:hidden}.teacher-elaboration-card[open]{border-color:#afc6e7;background:#f7faff}.teacher-elaboration-card summary{display:flex;align-items:center;gap:6px;cursor:pointer;padding:5px 7px;font-size:.66rem;font-weight:800;color:#173968;list-style:none}.teacher-elaboration-card summary::-webkit-details-marker{display:none}.teacher-elaboration-card summary::after{content:"+";margin-left:auto;color:#2457d6}.teacher-elaboration-card[open] summary::after{content:"−"}.teacher-elaboration-body{display:grid;grid-template-columns:minmax(160px,.8fr) minmax(0,1.4fr);gap:7px;padding:0 7px 7px}.teacher-elaboration-card .elaboration-visual{min-height:54px;padding:4px;gap:3px}.teacher-elaboration-card .elaboration-visual>span,.teacher-elaboration-card .elaboration-visual>strong{font-size:.59rem;padding:3px 4px}.teacher-elaboration-card .ev-dots{gap:2px}.teacher-elaboration-card .ev-dots i{width:6px;height:6px}.teacher-elaboration-card p{font-size:.62rem;line-height:1.24;margin:3px 0}.teacher-elaboration-card .mini-label{font-size:.56rem}.teacher-elaboration-card .ev-caption{font-size:.52rem}@media(max-width:680px){.elaboration-grid{grid-template-columns:1fr}.teacher-elaboration-body{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function topicCard(e){const steps=e.steps?.length?`<ol class="elaboration-steps">${e.steps.map(step=>`<li>${step}</li>`).join("")}</ol>`:"";return `<article class="elaboration-card"><span class="mini-label">${e.label}</span><h3>${e.title}</h3>${e.idea?`<p class="elaboration-idea">${e.idea}</p>`:""}<div class="elaboration-visual">${e.visual}</div>${steps}${e.worked?`<div class="elaboration-example"><strong>Worked teaching example:</strong> ${e.worked}</div>`:""}${e.say?`<div class="elaboration-teacher-say"><strong>Teacher language:</strong> “${e.say}”</div>`:`<p><strong>Teach:</strong> ${e.teach}</p>`}${e.mistake?`<div class="elaboration-misconception"><strong>Watch for:</strong> ${e.mistake}<br><strong>Respond:</strong> ${e.fix}</div>`:""}<div class="elaboration-check"><strong>Quick check:</strong> ${e.check}</div></article>`}
function teacherCard(e,i){return `<details class="teacher-elaboration-card" name="foundation-elaboration"${i===0?" open":""}><summary><span class="mini-label">${e.label}</span><span>${e.title}</span></summary><div class="teacher-elaboration-body"><div class="elaboration-visual">${e.visual}</div><div><p><strong>Teach:</strong> ${e.teach}</p>${e.mistake?`<p><strong>Watch:</strong> ${e.mistake} <strong>Respond:</strong> ${e.fix}</p>`:""}<p><strong>Ask:</strong> ${e.check}</p></div></div></details>`}
function install(){const code=window.skillrPageMeta?.curriculumCode||new URLSearchParams(location.search).get("code")?.toUpperCase(),u=D[code];if(!u?.elaborations)return false;if(document.querySelector(`[data-elaboration-visuals="${code}"]`))return true;const teacher=document.body.dataset.skillrTeacherHost==="true";const host=document.querySelector(teacher?".grid":".combined-lesson-content");if(!host)return false;const section=document.createElement(teacher?"article":"section");section.className=teacher?"card full":"lesson-part";section.dataset.elaborationVisuals=code;section.innerHTML=teacher?`<span class="tag">Curriculum ideas</span><h2>Open one elaboration at a time</h2><div class="teacher-elaboration-accordion">${u.elaborations.map(teacherCard).join("")}</div>`:`<h3>Teach every curriculum idea</h3><p class="elaboration-intro">Each elaboration below is a short teaching sequence—not a curriculum summary. Model the idea, use the suggested language, correct the likely misconception, then check understanding.</p><div class="elaboration-grid">${u.elaborations.map(topicCard).join("")}</div>`;host.appendChild(section);return true}
css();if(!install()){const o=new MutationObserver(()=>{if(install())o.disconnect()});o.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>o.disconnect(),8000)}
}());
