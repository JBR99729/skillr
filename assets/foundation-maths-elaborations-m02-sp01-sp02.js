(function(){
"use strict";
const D=window.SkillrFoundationMathsData;if(!D)return;
const CODES=new Set(["AC9MFM02","AC9MFSP01","AC9MFSP02","AC9MFST01"]);
const add=(code,rows)=>{if(D[code])D[code].elaborations=rows.map(row=>Array.isArray(row)?((([label,title,visual,teach,check])=>({label,title,visual,teach,check}))(row)):row)};
add("AC9MFM02",[
 {
  label:"E1",title:"Order events by time of day",
  idea:"Times of day provide a broad order for familiar events. Morning comes before lunchtime, followed by afternoon, evening and night, although particular routines can differ.",
  visual:`<span>🌅 morning</span><b>→</b><span>🥪 lunchtime</span><b>→</b><span>☀️ afternoon</span><b>→</b><span>🌙 night</span>`,
  steps:["Choose familiar event pictures and name each event.","Place each event beneath its likely time-of-day label.","Read the sequence from morning to night and justify one placement."],
  worked:"Place breakfast in morning, eating lunch at lunchtime, play after school in afternoon and going to bed at night. Breakfast comes first in this example because it happens in the morning.",
  say:"I am using the time of day to order the events, not choosing which event I like best.",
  mistake:"The child orders events by personal preference, or assumes every family follows exactly the same routine.",
  fix:"Return to the time labels and use a familiar agreed example. Acknowledge that routines may vary while the day-part order remains useful.",
  teach:"Use familiar event pictures. Place each event in its likely daypart, then justify the order using morning, lunchtime, afternoon, evening and night.",
  check:"Order breakfast, lunch, play after school and bedtime, then explain one placement using a time-of-day word."
 },
 {
  label:"E2",title:"Build the repeating week",
  idea:"The seven days occur in a fixed repeating cycle. After Sunday, the sequence returns to Monday and begins another week.",
  visual:`<span>Mon–Fri<br><strong>weekdays</strong></span><span>Sat–Sun<br><strong>weekend</strong></span><b>↻</b><span>Sunday → Monday</span>`,
  steps:["Arrange cards for all seven days in order.","Connect the final day back to the first to show the cycle.","Use the sequence to name the day before or after a given day."],
  worked:"Order Monday through Sunday in a loop. Starting at Saturday, the next day is Sunday and the day after that is Monday because the weekly cycle repeats.",
  say:"The week does not stop at Sunday. Monday begins the next cycle of the same seven day names.",
  mistake:"The child treats Sunday as an endpoint or memorises weekday and weekend groupings without knowing the full order.",
  fix:"Use a circular week display and move a marker one day at a time across the Sunday-to-Monday join.",
  teach:"Order all seven days and connect Sunday back to Monday. Discuss local school-day and weekend routines without assuming every family schedule is identical.",
  check:"What follows Sunday, and how does the week model show that the sequence continues?"
 },
 {
  label:"E3",title:"Sequence a story with order words",
  idea:"Temporal order describes what happened first and what followed. Words such as first, next, then and last communicate the sequence clearly.",
  visual:`<span>first</span><b>→</b><span>next</span><b>→</b><span>then</span><b>→</b><span>last</span>`,
  steps:["Study all story pictures and identify clues about cause or change.","Arrange the pictures from earliest to latest.","Retell the sequence using first, next, then and last."],
  worked:"For planting a seed: first fill the pot, next place the seed, then water it and last place the pot where it can grow. Each picture follows from the previous action.",
  say:"I am explaining what happened in time order, not the order I happened to pick up the cards.",
  mistake:"The child describes each picture but does not connect them in order, or uses ‘last’ for the final card placed rather than the final event.",
  fix:"Ask what must already have happened before each picture. Place arrows between cards and rehearse the order words aloud.",
  teach:"Use picture sequences from familiar routines and stories. Require complete sentences that connect each image to its temporal position.",
  check:"Put four familiar-event pictures in order and retell them using all four sequence words."
 },
 {
  label:"E4",title:"Read a roster across changing days",
  idea:"A roster connects people or jobs to ordered days. Yesterday, today and tomorrow are relative terms that shift when the today marker moves.",
  visual:`<span>yesterday<br>Sam</span><span><strong>today<br>Mia</strong></span><span>tomorrow<br>Leo</span><b>→</b><span>move today</span>`,
  steps:["Locate today on the weekly roster.","Read the person or job beside yesterday, today and tomorrow.","Move the today marker forward and update all three relative-day statements."],
  worked:"On Tuesday, Mia waters the plants and Leo is listed for Wednesday. Leo's turn is tomorrow. When the marker moves to Wednesday, Leo's turn is today and Mia's was yesterday.",
  say:"The roster stays in day order, but the words yesterday, today and tomorrow move with our today marker.",
  mistake:"The child treats ‘tomorrow’ as the permanent name of a day or reads a name without checking the day column.",
  fix:"Move one marker daily and say the actual day name together with the relative word: ‘Wednesday is tomorrow.’",
  teach:"Use a genuine classroom roster, such as watering plants. Keep a movable today marker and read across the neighbouring days.",
  check:"If Mia is on today and Leo is on tomorrow, whose turn comes next? Move the marker and describe the change."
 },
 {
  label:"E5",title:"Make a pictorial weekly diary",
  idea:"A pictorial diary records events beneath day labels so a reader can see when events occur and compare their order across a week.",
  visual:`<span>Mon<br>📚</span><span>Tue<br>⚽</span><span>Wed<br>🎵</span><span>Thu<br>🏊</span><span>Fri<br>📚</span>`,
  steps:["Lay out the day labels in the correct weekly order.","Choose a clear picture or symbol for each important event.","Place each symbol beneath its day and read the diary using day names."],
  worked:"Place a library-book symbol beneath Monday and a swimming symbol beneath Thursday. Say, ‘Library is on Monday. Swimming is later in the week on Thursday.’",
  say:"The picture tells the event; its position under the day label tells when it happens.",
  mistake:"The child orders event pictures correctly but does not align them with day labels, making the diary ambiguous.",
  fix:"Use columns or pockets beneath each day. Trace vertically from the picture to its label before reading the entry.",
  teach:"Create a class or personal diary with recognisable, agreed symbols. Read it repeatedly to answer when, before and after questions.",
  check:"Add two events to a week strip and use day names to explain when they happen and which comes first."
 }
]);
add("AC9MFSP01",[
 {
  label:"E1",title:"Sort shapes and state the rule",
  idea:"Sorting places shapes into groups according to an observable rule. The same collection can be sorted differently when the rule changes.",
  visual:`<span>3 sides<br>△ △</span><span>4 sides<br>□ ▭</span><span>curved boundary<br>○</span>`,
  steps:["Choose one feature that can be observed on every shape.","Place every shape according to the same rule.","State the rule, check each member and then re-sort using another feature."],
  worked:"Sort a triangle, square, rectangle and circle by boundary: straight-sided shapes together and the circle in the curved-boundary group. Re-sort by number of corners to create different groups.",
  say:"A correct sort needs one rule that explains why every shape belongs in its group.",
  mistake:"The child changes the rule midway, sorts only by colour or names groups without explaining the shared shape feature.",
  fix:"Place a feature card above each group and test every shape against the stated rule before accepting the sort.",
  teach:"Choose an observable shape feature, sort consistently and explain the rule. Re-sort the same collection to show that grouping depends on the chosen attribute.",
  check:"Sort five shapes by a shape feature and explain the rule so another person could repeat the sort."
 },
 {
  label:"E2",title:"Create and explain a shape picture",
  idea:"Familiar shapes can be selected and combined to represent parts of a picture. Naming their features explains why each shape suits its purpose.",
  visual:`<span>△ roof</span><span>□ wall</span><span>▭ door</span><b>→</b><strong>🏠 picture</strong>`,
  steps:["Choose an object or scene to represent.","Select, trace or make shapes for its component parts.","Name each shape and justify at least one choice using a feature."],
  worked:"Make a house using a square wall, rectangle door and triangle roof. Explain that the triangle was chosen for the roof because its sloping sides meet at a corner.",
  say:"I can see a house in the whole picture and still name the shapes used to make each part.",
  mistake:"The child names only the represented object or chooses a shape without describing any geometric feature.",
  fix:"Temporarily separate or outline the component shapes, trace each boundary and compare its sides and corners.",
  teach:"Provide precut shapes, objects to trace, string and sticks. Ask children to create a meaningful picture and reason about their component choices.",
  check:"Design a picture from at least three familiar shapes, name them and justify one choice using a feature."
 },
 {
  label:"E3",title:"Make shapes with people",
  idea:"A shape can be made at different sizes and with different materials while retaining its defining boundary features, such as straight sides, curves and corners.",
  visual:`<span>people</span><b>join and curve</b><strong>○ circle</strong><span>people</span><b>make 3 edges</b><strong>△ triangle</strong>`,
  steps:["Name the target shape and its important boundary features.","Position people or a rope to create those sides, curves and corners.","Inspect the whole boundary and adjust any feature that does not match."],
  worked:"A group first joins around a smooth curved boundary to make a circle. To change it to a triangle, form 3 straight sections that meet at 3 clear corners.",
  say:"The group became a different shape because the boundary changed from one curve to three straight sides and three corners.",
  mistake:"The child focuses on the number of people rather than the boundary they create, or makes rounded corners while naming a triangle.",
  fix:"Trace the boundary with a hand or rope and count the sides and corners, ignoring how many people are used.",
  teach:"Use body positions and joined groups to model boundaries. Compare shapes made at different sizes and orientations.",
  check:"Explain and demonstrate how a group can change its circle boundary into a triangle."
 },
 {
  label:"E4",title:"Find shapes inside everyday objects",
  idea:"Everyday objects often contain component parts whose boundaries resemble familiar shapes. Shape identity depends on features, not size, colour or orientation.",
  visual:`<span>clock → ○</span><span>window → □</span><span>sign → △</span><span>door → ▭</span>`,
  steps:["Choose one component part rather than naming the whole object.","Trace or point around its boundary.","Name the familiar shape and justify it using sides, corners or curves."],
  worked:"A bicycle wheel is close to a circle because its boundary is curved and closed. Turning or enlarging the wheel does not change that familiar shape.",
  say:"I am naming the shape of this part and giving boundary evidence, not saying the whole object is that shape.",
  mistake:"The child calls an entire object a shape, or rejects a rotated square because it looks like a diamond.",
  fix:"Outline the chosen component and rotate a matching shape card beside it. Compare features rather than the direction it faces.",
  teach:"Search bicycles, toy vehicles, buildings and pantry items for familiar component shapes. Require feature-based reasons for each name.",
  check:"Identify one familiar shape within an everyday object and justify the name using its boundary features."
 },
 {
  label:"E5",title:"Observe and sort shapes on Country and Place",
  idea:"Country/Place contains many observable forms that can be described geometrically. Learning must retain the source context and respect community authority over cultural knowledge and designs.",
  visual:`<span>approved observation</span><b>→</b><span>describe geometry</span><b>→</b><strong>sort by feature</strong>`,
  steps:["Use a locally approved observation or authorised resource and retain its place and community context.","Identify a permitted natural or made form and describe its visible geometric features.","Represent only the general geometric shape when permitted, then sort it by the stated feature."],
  worked:"From an approved local walk or resource, children observe several permitted forms. They describe one outline as curved and another as having straight edges, then sort their own generic shape cards by those features.",
  say:"We are describing visible geometry respectfully. We do not copy cultural designs or claim cultural knowledge that has not been shared for this purpose.",
  mistake:"The teacher uses an unattributed cultural image, generalises one example to all First Nations Peoples or asks children to reproduce a restricted design.",
  fix:"Use community-approved or institutionally authorised material, keep attribution visible and move the making task to generic geometric shapes if reproduction permission is unclear.",
  teach:"With local guidance and an appropriate source, observe, describe and name permitted shapes on Country/Place. Follow all guidance about what may be shared or recreated.",
  check:"From the approved example, describe one permitted shape feature and explain the geometric group it belongs in."
 }
]);
add("AC9MFSP02",[
 {
  label:"E1",title:"Locate an item relative to another item",
  idea:"A position statement describes where one item is in relation to a named reference object. Words such as inside, beside, under and on top of are incomplete without the reference.",
  visual:`<span>● inside □</span><span>● underneath ━</span><span>● on top of ▭</span>`,
  steps:["Identify the item being located.","Name the reference object.","Join both with a precise position word in a complete sentence."],
  worked:"Place a red counter on top of a book. Say, ‘The red counter is on top of the book.’ Move it under the book and update the relationship.",
  say:"The position word tells the relationship, and the reference object tells what the item is positioned against.",
  mistake:"The child says only ‘It is there’ or ‘It is on top’ without naming the reference object.",
  fix:"Use the sentence frame, ‘The ___ is ___ the ___.’ Point to each part while completing the sentence.",
  teach:"Move one item through several positions around a fixed reference object. Say and act on complete relational descriptions.",
  check:"Place a counter on top of a book, then describe its position in a complete sentence with a reference object."
 },
 {
  label:"E2",title:"Move, place and describe",
  idea:"Directions can describe a sequence of movements through a familiar space. Completing one instruction at a time preserves the order and leads to the intended finishing position.",
  visual:`<span>start beside chair</span><b>→ under table →</b><strong>finish inside hoop</strong>`,
  steps:["Identify and describe the starting position.","Follow each movement instruction in the stated order.","Stop at the finish and describe the final position relative to a named object."],
  worked:"Start beside the chair. Crawl under the table, then stand inside the hoop. The finishing statement is, ‘I am inside the hoop.’",
  say:"I will complete the first direction before I act on the second direction.",
  mistake:"The child completes the correct movements in the wrong order or describes movement words without stating the final location.",
  fix:"Give one direction card at a time, place completed cards in order and pause to describe each checkpoint.",
  teach:"Use short obstacle paths in a familiar space. Alternate between following directions and giving directions to a partner.",
  check:"Follow a two-step movement instruction and describe the finishing location using a clear reference."
 },
 {
  label:"E3",title:"Track a robotic toy",
  idea:"An algorithm is an ordered set of instructions. Movement instructions change an object's location; position statements describe where it is at a checkpoint.",
  visual:`<span>robot beside box</span><b>→ forward → turn →</b><strong>robot behind chair</strong>`,
  steps:["Describe the robot's starting position relative to a landmark.","Execute one instruction at a time without adding an unlisted move.","Pause at checkpoints and describe the new position before continuing."],
  worked:"The robot starts beside the box. Move it forward to the mat, then turn and move behind the chair. Describe the start, midpoint and finish using the landmarks.",
  say:"‘Move forward’ tells the robot what to do. ‘Behind the chair’ describes where it finishes.",
  mistake:"The child treats a turn as a change of location, skips an instruction or moves the toy toward the destination without following the sequence.",
  fix:"Use separate cards for turns and forward moves. Tick each card only after the robot completes that exact action.",
  teach:"Use a toy or role-play robot to follow simple algorithms. Keep landmarks stable and distinguish movement language from positional language.",
  check:"Move a toy using two instructions and describe its position at the start, midpoint and finish."
 },
 {
  label:"E4",title:"Learn position through an instructive game",
  idea:"A specifically sourced First Nations children's instructive game can provide an authentic setting for describing position and movement when its rules and cultural attribution are preserved.",
  visual:`<span>authorised source</span><b>→</b><span>play as documented</span><b>→</b><strong>describe position</strong>`,
  steps:["Select an authorised description of Thapumpan and acknowledge the Wik-Mungkan Peoples of Cape Bedford.","Teach and play the game according to that source without inventing or blending rules.","At a documented moment, describe a player's movement or position relative to another participant, object or location."],
  worked:"After playing Thapumpan from the approved source, pause at a documented position. A child completes a sentence such as, ‘The player is ___ the ___,’ using only relationships genuinely present in the sourced game.",
  say:"We are learning this game from a source that acknowledges the Wik-Mungkan Peoples. We will follow the source and describe the positions we actually observe.",
  mistake:"The teacher invents game details, removes the specific attribution or presents one game as representative of all First Nations Peoples.",
  fix:"Return to the Australian Curriculum reference and an authorised teaching source. Retain the Wik-Mungkan attribution and omit the activity if accurate guidance is unavailable.",
  teach:"Use the curriculum-named Thapumpan example only through an authorised, accurately attributed source. Let the documented play create the spatial context.",
  check:"After the approved game, describe one documented movement and resulting position using a precise reference object or person."
 }
]);
add("AC9MFST01",[
 {
  label:"E1",title:"Collect and sort data about familiar things",
  idea:"Data are pieces of information collected to answer a question. Categories organise the data so each item can be counted and compared.",
  visual:`<span>favourite toys</span><b>→</b><span>building toys</span><span>other toys</span><b>→</b><strong>sort again</strong>`,
  steps:["Ask one clear question and collect one response or object for each case.","Choose category labels that answer the question and place every item once.","Count each category, then subdivide a broad category when more detail is useful."],
  worked:"Ask, ‘What kind of toy did you choose?’ Sort 8 toy cards into ‘toys used to make things’ and ‘other toys’. Then split ‘other toys’ into ‘vehicles’ and ‘soft toys’ to reveal more information.",
  say:"The question tells us what information to collect, and the labels tell us how the information is organised.",
  mistake:"The child sorts by an unrelated feature, places one item in several categories or leaves unclear items unrecorded.",
  fix:"Read the investigative question again, define each label with an example and account for every item exactly once.",
  teach:"Collect and sort data through a familiar classroom context. Begin with two useful categories, then discuss when subdividing one category answers a more detailed question.",
  check:"Sort a small set of favourite-toy responses into labelled categories and explain how the sort helps answer the question."
 },
 {
  label:"E2",title:"Organise data to answer a comparison question",
  idea:"The way data are organised should make the investigative question easy to answer. One-to-one alignment reveals which category has more, fewer or the same number.",
  visual:`<span>laces ● ● ● ●</span><span>no laces ● ● ●</span><b>→</b><strong>laces has 1 more</strong>`,
  steps:["Collect one response for each person or object in the investigation.","Arrange the two categories in aligned rows or columns.","Match entries one-to-one and use the unmatched entries to compare."],
  worked:"For ‘Do more children have shoes with laces or without?’, place one counter per child in two aligned rows. Four lace counters match three no-lace counters with one left over, so laces has one more today.",
  say:"The aligned rows let me compare the data, and the unmatched counter is evidence for ‘one more’.",
  mistake:"The child judges from a scattered display, counts the same person twice or answers about all children generally rather than the class data collected today.",
  fix:"Use one counter per participant, align both rows at the same start and state the population and time represented by the data.",
  teach:"Let the question determine the organisation. Use physical objects first so children can match entries directly before reading pictorial displays.",
  check:"Organise two-category class data in aligned rows and justify which category has more, fewer or the same."
 },
 {
  label:"E3",title:"Create and interpret a picture chart",
  idea:"A picture chart represents each data value with an agreed picture or sticker. Consistent alignment and a one-picture-to-one-item rule make categories easy to compare.",
  visual:`<span>books ★ ★ ★ ★</span><span>blocks ★ ★ ★</span><span>paint ★ ★</span><b>→</b><strong>books most</strong>`,
  steps:["Label the categories and agree what one picture represents.","Add one aligned picture for each response.","Count or match the pictures to describe most, fewest, more, fewer or equal."],
  worked:"Create an activity chart where each sticker represents one child's choice. Books has 4 stickers, blocks has 3 and painting has 2. Books is most popular in this group and painting is least popular.",
  say:"I checked the key: one sticker represents one response, so I can compare the numbers of stickers fairly.",
  mistake:"The child uses differently sized pictures, adds decorative pictures that are not data or reads the tallest-looking row without checking the count.",
  fix:"Use identical markers, keep them aligned and touch-count each data picture while referring to the one-to-one key.",
  teach:"Build charts and rosters from real class decisions. Ask comparison and interpretation questions that must be answered from the displayed data.",
  check:"Read a three-category picture chart and support one comparison statement with counts or one-to-one matching."
 },
 {
  label:"E4",title:"Investigate data in a story",
  idea:"Stories and illustrations can provide data when the class asks a countable question, defines categories and records only evidence found in the text or image.",
  visual:`<span>story scene</span><b>→</b><span>What types?</span><span>How many?</span><b>→</b><strong>record and compare</strong>`,
  steps:["Choose a question that can be answered from the story or illustration.","Identify and label the categories before counting.","Record each observed item once, then compare and answer the question."],
  worked:"After a garden story, ask, ‘What types of minibeasts appeared, and how many of each?’ Record 3 butterflies, 2 beetles and 1 worm, then state that butterflies appeared most often in the selected pages.",
  say:"My answer describes the data in these pages; I am not adding animals that I know could live in a garden.",
  mistake:"The child relies on memory or background knowledge, changes the counting area or counts the same pictured item twice.",
  fix:"Mark the exact pages or image boundary, point to each observed item once and tally it immediately under its agreed label.",
  teach:"Use an engaging story to generate genuine statistical questions. Separate evidence collected from the text or image from predictions and prior knowledge.",
  check:"From a selected story scene, define two or more categories, record the observations and answer a comparison question."
 },
 {
  label:"E5",title:"Explore environmental information used to anticipate weather",
  idea:"First Nations seasonal knowledge is specific to Country and community. Long-term observations of connected changes in weather, plants and animals can provide information about seasonal conditions and likely weather events.",
  visual:`<span>authorised local calendar</span><b>→</b><span>observe indicators</span><b>→</b><strong>record relationships</strong>`,
  steps:["Select a community-approved source or a Bureau of Meteorology Indigenous seasonal calendar and retain its named community and Country/Place attribution.","Identify one environmental indicator and the weather or seasonal condition connected to it in that source.","Represent the published relationship with a simple teacher-prepared picture record, without generalising it to other Countries or communities."],
  worked:"Using one authorised seasonal calendar, the teacher names the community and reads a permitted environmental indicator with its stated seasonal connection. Children sort teacher-provided picture cards into ‘indicator observed’ and ‘condition described by the source’, then explain the published link.",
  say:"This knowledge belongs to a specific community and Country. We will describe what the authorised source shares, not turn it into a rule for every place.",
  mistake:"The activity combines knowledge from different communities, presents a cultural observation as universal or asks children to predict weather from an invented sign.",
  fix:"Return to one clearly attributed community source, preserve its wording and context, and distinguish the source's long-term knowledge from a one-day classroom guess.",
  teach:"Use an authorised, place-specific seasonal calendar to explore how environmental information is collected and related. Follow all source permissions, warnings and community guidance.",
  check:"From the selected authorised source, name one environmental indicator and the weather or seasonal condition it is connected with, including the community attribution."
 }
]);
function css(){if(document.getElementById("foundation-elab-css"))return;const s=document.createElement("style");s.id="foundation-elab-css";s.textContent=`
.elaboration-intro{margin:0 0 10px;color:#49627f}.elaboration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.elaboration-card{border:1px solid #d9e5f5;border-radius:14px;padding:13px;background:#fbfcfe;box-shadow:0 2px 7px rgba(23,57,104,.04)}.elaboration-card h3{margin:4px 0 7px;color:#173968}.elaboration-idea{margin:0 0 9px;font-weight:700;color:#304963}.elaboration-visual{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;min-height:82px;padding:10px;border:1px solid #d8e4f2;border-radius:11px;background:#fff}.elaboration-visual>span,.elaboration-visual>strong{padding:6px 8px;border-radius:8px;background:#eef5ff;text-align:center}.elaboration-visual .ev-caption{flex-basis:100%;text-align:center;font-size:.76rem;font-weight:800;color:#49627f}.elaboration-steps{margin:10px 0;padding-left:1.25rem}.elaboration-steps li{margin:3px 0}.elaboration-example,.elaboration-teacher-say,.elaboration-misconception,.elaboration-check{margin:9px 0 0;padding:9px 10px;border-radius:10px;font-size:.88rem}.elaboration-example{background:#eef5ff;border-left:4px solid #2457d6}.elaboration-teacher-say{background:#f7fbf8;border-left:4px solid #47925c}.elaboration-misconception{background:#fff8ec;border-left:4px solid #d28b27}.elaboration-check{background:#f4f8f5;border:1px solid #d7e9dc}.elaboration-card p{font-size:.88rem}.teacher-elaboration-accordion{display:grid;gap:4px}.teacher-elaboration-card{border:1px solid #d9e5f5;border-radius:8px;background:#fbfcfe;overflow:hidden}.teacher-elaboration-card[open]{border-color:#afc6e7;background:#f7faff}.teacher-elaboration-card summary{display:flex;align-items:center;gap:6px;cursor:pointer;padding:5px 7px;font-size:.66rem;font-weight:800;color:#173968;list-style:none}.teacher-elaboration-card summary::-webkit-details-marker{display:none}.teacher-elaboration-card summary::after{content:"+";margin-left:auto;color:#2457d6}.teacher-elaboration-card[open] summary::after{content:"−"}.teacher-elaboration-body{display:grid;grid-template-columns:minmax(160px,.8fr) minmax(0,1.4fr);gap:7px;padding:0 7px 7px}.teacher-elaboration-card .elaboration-visual{min-height:54px;padding:4px;gap:3px}.teacher-elaboration-card .elaboration-visual>span,.teacher-elaboration-card .elaboration-visual>strong{font-size:.59rem;padding:3px 4px}.teacher-elaboration-card p{font-size:.62rem;line-height:1.24;margin:3px 0}.teacher-elaboration-card .mini-label{font-size:.56rem}@media(max-width:680px){.elaboration-grid{grid-template-columns:1fr}.teacher-elaboration-body{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function topicCard(e,code){const id=`${code.toLowerCase()}-${e.label.toLowerCase()}`,steps=e.steps?.length?`<ol class="elaboration-steps">${e.steps.map(step=>`<li>${step}</li>`).join("")}</ol>`:"";return `<article class="elaboration-card" id="${id}"><span class="mini-label">${e.label}</span><h3>${e.title}</h3><p class="elaboration-idea">${e.idea}</p><div class="elaboration-visual">${e.visual}</div>${steps}<div class="elaboration-example"><strong>Worked teaching example:</strong> ${e.worked}</div><div class="elaboration-teacher-say"><strong>Teacher language:</strong> “${e.say}”</div><div class="elaboration-misconception"><strong>Watch for:</strong> ${e.mistake}<br><strong>Respond:</strong> ${e.fix}</div><div class="elaboration-check"><strong>Quick check:</strong> ${e.check}</div></article>`}
function teacherCard(e,i,code,slug){const id=`${code.toLowerCase()}-${e.label.toLowerCase()}`;return `<details class="teacher-elaboration-card" name="foundation-elaboration"${i===0?" open":""}><summary><span class="mini-label">${e.label}</span><span>${e.title}</span></summary><div class="teacher-elaboration-body"><div class="elaboration-visual">${e.visual}</div><div><p><strong>Worked:</strong> ${e.worked}</p><p><strong>Teach:</strong> ${e.teach}</p><p><strong>Watch:</strong> ${e.mistake} <strong>Respond:</strong> ${e.fix}</p><p><strong>Ask:</strong> ${e.check}</p><p><a href="/foundation/maths/${slug}/#${id}" target="_blank" rel="noopener">Open full topic example ↗</a></p></div></div></details>`}
function install(){const code=window.skillrPageMeta?.curriculumCode||new URLSearchParams(location.search).get("code")?.toUpperCase(),u=D[code];if(!CODES.has(code)||!u?.elaborations)return false;if(document.querySelector(`[data-elaboration-visuals="${code}"]`))return true;const teacher=document.body.dataset.skillrTeacherHost==="true",host=document.querySelector(teacher?".grid":".combined-lesson-content");if(!host)return false;const section=document.createElement(teacher?"article":"section");section.className=teacher?"card full":"lesson-part";section.dataset.elaborationVisuals=code;section.innerHTML=teacher?`<span class="tag">Curriculum ideas</span><h2>Open one elaboration at a time</h2><div class="teacher-elaboration-accordion">${u.elaborations.map((e,i)=>teacherCard(e,i,code,u.slug)).join("")}</div>`:`<h3>Teach every curriculum idea</h3><p class="elaboration-intro">Each elaboration below is a short teaching sequence—not a curriculum summary. Follow the steps, use the suggested language, correct the likely misconception, then check understanding.</p><div class="elaboration-grid">${u.elaborations.map(e=>topicCard(e,code)).join("")}</div>`;host.appendChild(section);return true}
(window.SkillrFoundationMathsElaborationInstallers??=[]).push(install);css();if(!install()){const o=new MutationObserver(()=>{if(install())o.disconnect()});o.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>o.disconnect(),8000)}
}());
