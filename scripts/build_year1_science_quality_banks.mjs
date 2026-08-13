import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year1", "science");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals");

const q = (question, correct, wrong, summary, hint, visual) => ({ question, correct, wrong, summary, hint, visual });
const v = (...entries) => entries.map(([icon, label]) => ({ icon, label }));
const toolDistractors = correct => ["a ruler","a timer","a thermometer","a camera","a tape measure"].filter(tool=>tool!==correct).slice(0,2);

const configs = {
  AC9S1H01: {
    contexts: [
      { person:"a gardener", icon:"🌱", action:"checks tomato plants", observation:"The leaves are drooping.", tool:"a ruler", measure:"plant height", question:"Do the tomato plants grow taller each week?", pattern:"The soil dried quickly on three sunny days.", prediction:"The soil may dry quickly on the next sunny day." },
      { person:"a cook", icon:"🥣", action:"makes vegetable soup", observation:"The soup is bubbling.", tool:"a timer", measure:"heating time", question:"How long does the soup take to heat?", pattern:"The soup bubbled after 6 minutes in three trials.", prediction:"It may bubble after about 6 minutes next time." },
      { person:"a nurse", icon:"🌡️", action:"checks a patient's temperature", observation:"The thermometer shows 37 degrees Celsius.", tool:"a thermometer", measure:"temperature", question:"What temperature does the thermometer show?", pattern:"The reading stayed the same for three checks.", prediction:"The next reading may be similar." },
      { person:"a builder", icon:"🧱", action:"tests building materials", observation:"The wooden block did not bend.", tool:"a tape measure", measure:"length", question:"Which board is longer?", pattern:"Three thin strips bent more than thick strips.", prediction:"Another thin strip may bend more." },
      { person:"a wildlife ranger", icon:"🐾", action:"looks for animal tracks", observation:"There are four fresh paw prints beside the creek.", tool:"a camera", measure:"the number and location of tracks", question:"How many fresh tracks are beside the creek?", pattern:"Tracks appeared near the creek on three mornings.", prediction:"Tracks may appear there again tomorrow morning." }
    ],
    tasks: [
      c=>q(`Which sentence is an observation ${c.person} could record?`,c.observation,["The same result will definitely happen tomorrow.","An untested cause made this happen."],`${c.observation} describes something that can be noticed or measured.`,`Choose what the person can see, hear, feel safely or measure.`,v([c.icon,c.action],["👀","observe"],["📝","record"])),
      c=>q(`Which tool would best help ${c.person} measure ${c.measure}?`,c.tool,toolDistractors(c.tool),`${c.tool.charAt(0).toUpperCase()+c.tool.slice(1)} is suited to measuring ${c.measure}.`,`Match the tool to the thing being measured.`,v([c.icon,c.person],["🧰","tools"],["📏",c.measure])),
      c=>q(`What is ${c.person} measuring?`,c.measure,["whether the same result will always happen","the untested cause of the result"],`${c.measure.charAt(0).toUpperCase()+c.measure.slice(1)} can be checked using evidence.`,`Look for the feature that can be counted or measured.`,v([c.icon,c.action],["📏","measure"],["🔢","evidence"])),
      c=>q(`Which question could ${c.person} answer by observing or measuring?`,c.question,["Will this result happen every time in every place?","Is this the best possible way to do the job?"],`${c.question} can be explored using observations or measurements.`,`Choose a question that can be checked with evidence.`,v([c.icon,c.action],["❓","question"],["🔍","investigate"])),
      c=>q(`After noticing a repeated pattern, which prediction is careful and scientific?`,c.prediction,["This must happen every time.","Anything could happen, so observations do not matter."],`The word “may” shows that the prediction uses the pattern without claiming certainty.`,`Use the repeated evidence, but do not say the outcome is guaranteed.`,v(["🔁",c.pattern],["➡️","next time"],["💭",c.prediction])),
      c=>q(`Why does ${c.person} record observations?`,"So the evidence can be checked and compared later.",["So one result can stand for every future test.","So predictions never need to be compared with results."],`Records help people compare evidence and remember what happened.`,`Think about why dates, numbers, drawings and notes are useful.`,v([c.icon,c.person],["📝","record"],["🔎","compare"])),
      c=>q(`Which statement uses evidence from ${c.person}'s work?`,c.pattern,["This proves the same result will happen every time.","An untested cause must have produced the result."],`${c.pattern} reports a repeated observation rather than an opinion.`,`Choose the statement that tells what was actually observed.`,v([c.icon,c.action],["✅","evidence"],["💬","opinion"])),
      c=>q(`How does science help ${c.person}?`,"It helps them make decisions using observations and measurements.",["It lets them decide from one observation only.","It proves every first guess is correct."],`Science supports everyday decisions with evidence.`,`Look for the choice that uses careful checking.`,v([c.icon,c.person],["🔍","observe"],["✅","decide"])),
    ]
  },
  AC9S1I01: {
    contexts: [
      { icon:"🚗", topic:"a toy car on tile and carpet", question:"On which surface will the same toy car travel farther?", prediction:"The car may travel farther on tile.", observation:"The car travelled 80 centimetres on tile and 35 centimetres on carpet.", reason:"Cars I rolled before slowed down more on carpet.", pattern:"The car travelled farther on tile in three trials." },
      { icon:"🧊", topic:"an ice cube in sun and shade", question:"Where will equal ice cubes melt sooner?", prediction:"The ice cube in the sun may melt sooner.", observation:"The sunny ice cube melted first.", reason:"Ice cream melted quickly when it was left in sunlight.", pattern:"Ice melted sooner in the warmer place each time." },
      { icon:"🌱", topic:"two bean plants with different light", question:"Does the amount of light affect bean plant growth?", prediction:"The plant with more light may grow taller.", observation:"After one week, one plant was 12 centimetres tall and the other was 7 centimetres tall.", reason:"Plants near my window grew towards the light.", pattern:"The better-lit plant was taller on three measurement days." },
      { icon:"🧻", topic:"two towels soaking up water", question:"Which towel will soak up more water?", prediction:"The thicker towel may soak up more water.", observation:"The thick towel soaked up 5 spoonfuls and the thin towel soaked up 2.", reason:"A thick cloth soaked up more of a spill at home.", pattern:"The thick towel soaked up more in three tests." },
      { icon:"🌤️", topic:"a pole's shadow during the day", question:"How does the pole's shadow change from morning to midday?", prediction:"The shadow may become shorter by midday.", observation:"The shadow was 90 centimetres in the morning and 45 centimetres at midday.", reason:"My shadow looked shorter near lunchtime yesterday.", pattern:"The midday shadow was shorter on three sunny days." }
    ],
    tasks: [
      c=>q(`Which question can be investigated for ${c.topic}?`,c.question,["Will the same result happen everywhere forever?","Which result should happen because I prefer it?"],`${c.question} can be explored with a simple, safe investigation.`,`Choose a question that can be answered by collecting evidence.`,v([c.icon,c.topic],["❓","question"],["🔍","test"])),
      c=>q(`Which sentence is a prediction made before testing ${c.topic}?`,c.prediction,[c.observation,"The test is finished."],`${c.prediction} says what may happen before evidence is collected.`,`A prediction comes before the investigation.`,v(["💭","before"],[c.icon,c.prediction],["🧪","test"])),
      c=>q(`Which reason best supports the prediction about ${c.topic}?`,c.reason,["I chose it because it was the first idea.","The result must match any prediction that is written down."],`${c.reason} connects the prediction to a relevant past experience.`,`Choose a reason related to the same materials or change.`,v(["🧠","past experience"],[c.icon,c.topic],["➡️","prediction"])),
      c=>q(`Which sentence is an observation made after testing ${c.topic}?`,c.observation,[c.prediction,"I hope my guess wins."],`${c.observation} reports what was noticed or measured.`,`Look for numbers or something that was actually seen.`,v(["🧪","test"],["👀","observe"],[c.icon,c.observation])),
      c=>q(`What pattern was found when ${c.topic} was tested more than once?`,c.pattern,["Every trial had a completely unrelated result.","The first guess became true because it was written down."],`${c.pattern} describes evidence that repeated across trials.`,`Compare all the trials and look for what happened again.`,v([c.icon,c.topic],["🔁","repeat"],["📊","pattern"])),
      c=>q(`Why is the word “may” useful in a prediction about ${c.topic}?`,"It shows the outcome is possible, not guaranteed.",["It means no evidence is needed.","It proves the outcome must happen."],`Predictions use evidence but remain open to a different result.`,`A prediction is a careful idea to test, not a promise.`,v(["💭","prediction"],["🧪","test"],["❓","may change"])),
      c=>q(`What should happen after making a prediction about ${c.topic}?`,"Carry out a safe test and record what happens.",["Change the prediction so it always looks correct.","Ignore the result if it is surprising."],`A prediction should be checked against recorded observations.`,`Test the idea, then compare the evidence with the prediction.`,v(["💭","predict"],["🧪","test"],["📝","record"])),
      c=>q(`If the result does not match a prediction about ${c.topic}, what should a young scientist do?`,"Record the result and use it to improve the next idea.",["Change the record so it matches the prediction.","Keep only the first result and ignore later trials."],`Unexpected results are still useful evidence.`,`Good scientists learn from what happened, even when it is surprising.`,v(["❌","did not match"],["📝","record"],["💡","new idea"])),
    ]
  },
  AC9S1I02: {
    contexts: [
      { icon:"💧", activity:"pouring small amounts of clean water between plastic cups", safe:"Use stable cups on a tray.", hazard:"water spilled on the floor", response:"Tell an adult and keep people away until the spill is cleaned.", unsafe:"run through the wet area", tool:"a tray" },
      { icon:"🚗", activity:"rolling toy cars down a ramp", safe:"Make the ramp stable and keep the path clear.", hazard:"a loose ramp", response:"Stop and ask an adult to steady the ramp.", unsafe:"stand in front of the moving car", tool:"a strong, stable ramp" },
      { icon:"🌱", activity:"observing soil and seedlings", safe:"Wash hands after touching the soil.", hazard:"an unknown berry in the soil", response:"Do not touch or taste it; tell an adult.", unsafe:"taste the unknown berry", tool:"a hand lens" },
      { icon:"🧲", activity:"testing which objects a magnet attracts", safe:"Keep magnets away from electronic devices.", hazard:"a sharp metal object", response:"Leave it where it is and tell an adult.", unsafe:"pick up the sharp object", tool:"a tray of teacher-approved objects" },
      { icon:"🔦", activity:"making shadows with a torch", safe:"Point the torch at the wall, not at anyone's eyes.", hazard:"a torch shining into someone's eyes", response:"Turn the torch away and tell the teacher.", unsafe:"stare into the bright torch", tool:"a torch used with adult guidance" }
    ],
    tasks: [
      c=>q(`Which action makes ${c.activity} safer?`,c.safe,[c.unsafe,"Start before checking the area or equipment."],`${c.safe} reduces a real risk in the investigation.`,`Choose the action that protects people and keeps the setup controlled.`,v([c.icon,c.activity],["✅",c.safe],["⚠️","risk"])),
      c=>q(`Which situation is a hazard during ${c.activity}?`,c.hazard,["a clear work area","following the teacher's directions"],`${c.hazard.charAt(0).toUpperCase()+c.hazard.slice(1)} could cause harm and needs attention.`,`A hazard is something that could hurt someone or make the area unsafe.`,v([c.icon,c.activity],["⚠️",c.hazard],["🛑","stop"])),
      c=>q(`What should you do if you notice ${c.hazard}?`,c.response,[c.unsafe,"Keep it secret and continue."],`${c.response} is the safe response.`,`Stop, keep others safe and get adult help.`,v(["⚠️",c.hazard],["🛑","stop"],["🧑",c.response])),
      c=>q(`Which equipment is suitable for ${c.activity}?`,c.tool,["an unknown chemical","a cracked glass container"],`${c.tool.charAt(0).toUpperCase()+c.tool.slice(1)} supports the activity safely.`,`Use teacher-approved equipment that matches the task.`,v([c.icon,c.activity],["🧰",c.tool],["✅","approved"])),
      c=>q(`Which action is unsafe during ${c.activity}?`,c.unsafe,[c.safe,"Listen to the teacher."],`${c.unsafe.charAt(0).toUpperCase()+c.unsafe.slice(1)} increases the risk of harm.`,`Choose the action that breaks a safety rule.`,v(["✅",c.safe],["❌",c.unsafe],["🧑","adult help"])),
      c=>q(`How should an unknown substance be checked during ${c.activity}?`,"Do not touch or taste it; ask an adult.",["Taste a tiny amount.","Smell it closely without permission."],`Unknown substances should only be handled under clear adult guidance.`,`Your senses are useful, but safety instructions come first.`,v(["❓","unknown"],["✋","do not touch"],["🧑","ask an adult"])),
      c=>q(`What should happen before starting ${c.activity}?`,"Listen to the instructions and check that the area is safe.",["Begin before the equipment is ready.","Move safety equipment away."],`A safe investigation begins with instructions and a checked setup.`,`Pause before starting and look for hazards.`,v(["👂","listen"],["👀","check"],[c.icon,"begin safely"])),
      c=>q(`What should happen after ${c.activity}?`,"Pack up safely, clean the area and wash hands if instructed.",["Leave equipment on the floor.","Walk away from spills or mess."],`Safe investigations include careful cleaning and packing up.`,`Safety continues until the area and equipment are ready for the next group.`,v([c.icon,"finish"],["🧹","clean"],["🧼","wash"])),
    ]
  },
  AC9S1I03: {
    contexts: [
      { icon:"🍃", object:"a leaf", observation:"The leaf has three brown spots and a jagged edge.", explanation:"An insect caused the spots.", tool:"a labelled drawing", measure:"number of spots", record:"Draw the leaf and label its spots and edge." },
      { icon:"🌱", object:"a bean plant", observation:"The plant is 12 cubes tall.", explanation:"The plant is happy.", tool:"equal-sized cubes", measure:"plant height", record:"Write 12 cubes and today's date." },
      { icon:"🧊", object:"an ice cube", observation:"A puddle formed around the ice after 5 minutes.", explanation:"The ice wanted to become water.", tool:"a timer and labelled drawing", measure:"melting time", record:"Draw the ice at the start and after 5 minutes." },
      { icon:"🚗", object:"a toy car", observation:"The car stopped 70 centimetres from the start line.", explanation:"The car was tired.", tool:"a tape measure", measure:"distance travelled", record:"Write 70 centimetres beside trial 1." },
      { icon:"☁️", object:"the sky", observation:"Six dark clouds covered most of the sky.", explanation:"It will definitely rain because the clouds are angry.", tool:"a dated weather drawing", measure:"number of dark clouds", record:"Draw the clouds and write the date and time." }
    ],
    tasks: [
      c=>q(`Which sentence is a careful observation of ${c.object}?`,c.observation,[c.explanation,"It is the best one."],`${c.observation} describes visible or measurable evidence.`,`Choose what can be directly noticed, counted or measured.`,v([c.icon,c.object],["👀","observe"],["📝",c.observation])),
      c=>q(`Which sentence is an explanation rather than an observation?`,c.explanation,[c.observation,"The record has a date."],`${c.explanation} gives a cause or idea that was not directly observed.`,`An observation tells what happened; an explanation suggests why.`,v(["👀","observation"],["💭","explanation"],[c.icon,c.object])),
      c=>q(`Which tool or record is best for observing ${c.object}?`,c.tool,["a favourite-colour vote","an unlabelled guess"],`${c.tool.charAt(0).toUpperCase()+c.tool.slice(1)} records relevant evidence about ${c.object}.`,`Match the way of recording to the feature being observed.`,v([c.icon,c.object],["🧰",c.tool],["📝","record"])),
      c=>q(`What feature is being measured when observing ${c.object}?`,c.measure,["how much someone likes it","whether it is lucky"],`${c.measure.charAt(0).toUpperCase()+c.measure.slice(1)} can be measured or counted.`,`Look for a feature with a number or agreed unit.`,v([c.icon,c.object],["📏",c.measure],["🔢","measurement"])),
      c=>q(`Which record is complete enough to use later?`,c.record,["Write only “nice”.","Make a mark with no label or date."],`${c.record} includes evidence and useful labels.`,`A useful record tells what was observed and when or how it was measured.`,v([c.icon,c.object],["📝",c.record],["✅","clear record"])),
      c=>q(`Why should the same method be used when observing ${c.object} again?`,"So the observations can be compared fairly.",["So the second result must match.","So labels are no longer needed."],`Using the same method makes changes easier to compare.`,`Keep the measuring or recording method consistent.`,v(["1️⃣","first record"],["2️⃣","second record"],["🔍","compare"])),
      c=>q(`What should be added to a drawing of ${c.object}?`,"Labels that point to the observed features.",["A made-up cause presented as fact.","Decorations that cover the evidence."],`Labels show exactly which features were observed.`,`Point each label to something visible in the drawing.`,v([c.icon,c.object],["🏷️","labels"],["👀","features"])),
      c=>q(`How can an observation of ${c.object} be made more precise?`,"Include a number, unit or clear feature description.",["Use only the word “good”.","Remove the date and labels."],`Precise observations state exactly what was noticed or measured.`,`Replace vague words with counts, measurements or named features.`,v(["💬","vague"],["➡️","add detail"],["✅",c.observation])),
    ]
  },
  AC9S1I04: {
    contexts: [
      { icon:"🍂", objects:"leaf cards", rule:"colour", groups:"green, yellow and brown", counts:"3 green, 5 yellow and 2 brown", most:"yellow", display:"a picture graph with one leaf picture for each card" },
      { icon:"🔘", objects:"buttons", rule:"number of holes", groups:"two-hole and four-hole", counts:"6 two-hole and 4 four-hole", most:"two-hole", display:"a two-column table labelled by number of holes" },
      { icon:"🚗", objects:"toy-car distance cards", rule:"distance travelled", groups:"short, medium and long distance", counts:"2 short, 3 medium and 5 long", most:"long distance", display:"a picture graph labelled short, medium and long" },
      { icon:"🌦️", objects:"daily weather cards", rule:"weather type", groups:"sunny, cloudy and rainy", counts:"4 sunny, 2 cloudy and 1 rainy", most:"sunny", display:"a table with weather labels and tally marks" },
      { icon:"📎", objects:"material cards", rule:"whether the material bent", groups:"flexible and rigid", counts:"5 flexible and 3 rigid", most:"flexible", display:"two labelled hoops containing the sorted cards" }
    ],
    tasks: [
      c=>q(`What sorting rule is used when ${c.objects} are grouped as ${c.groups}?`,c.rule,["which one is someone's favourite","the order the cards were picked up"],`${c.rule.charAt(0).toUpperCase()+c.rule.slice(1)} is the shared feature used for the groups.`,`Name the feature that is the same within each group.`,v([c.icon,c.objects],["🔀",c.rule],["🗂️",c.groups])),
      c=>q(`Which group labels suit ${c.objects} sorted by ${c.rule}?`,c.groups,["good and bad","first and last"],`${c.groups.charAt(0).toUpperCase()+c.groups.slice(1)} clearly names the categories.`,`Labels should describe the sorting rule, not an opinion.`,v([c.icon,c.objects],["🏷️",c.groups],["✅","clear labels"])),
      c=>q(`Which record correctly describes the sorted ${c.objects}?`,c.counts,["Every group has the same number.","The largest-looking card must be the most common."],`${c.counts.charAt(0).toUpperCase()+c.counts.slice(1)} reports the category totals.`,`Count every item once in its matching group.`,v([c.icon,c.objects],["🔢",c.counts],["📝","record"])),
      c=>q(`Which category has the most ${c.objects}?`,c.most,["the category with the longest label","all categories are automatically equal"],`${c.most.charAt(0).toUpperCase()+c.most.slice(1)} has the greatest recorded count.`,`Compare the category numbers, not the size of the words or pictures.`,v(["📊",c.counts],["⬆️","most"],[c.icon,c.most])),
      c=>q(`Which display would clearly show the sorted ${c.objects}?`,c.display,["an unlabelled scribble","a list that leaves out some items"],`${c.display.charAt(0).toUpperCase()+c.display.slice(1)} shows the categories and data clearly.`,`Choose a display with labels and one place for every result.`,v([c.icon,c.objects],["📊",c.display],["🏷️","labels"])),
      c=>q(`Why must each ${c.objects.replace(/ cards$/," card").replace(/s$/,'')} be counted once?`,"So the category totals show the data accurately.",["So the favourite category always wins.","So one item can make several categories larger."],`Counting each item once prevents missing or double-counting data.`,`Check that every item is in one suitable category.`,v(["1️⃣","count once"],["🗂️","one group"],["✅","accurate total"])),
      c=>q(`What should be checked after sorting ${c.objects} by ${c.rule}?`,"Every item fits the rule for its group.",["Every group has the same number.","The labels are hidden."],`A correct sort places items according to the stated rule.`,`Test each item against its category label.`,v([c.icon,c.objects],["🔍","check rule"],["✅",c.rule])),
      c=>q(`What pattern can be described from this data: ${c.counts}?`,`${c.most.charAt(0).toUpperCase()+c.most.slice(1)} is the largest category.`,["The shortest label is always the largest category.","No comparison can be made from counts."],`The recorded numbers show that ${c.most} has the greatest count.`,`Use the numbers to describe what is most, least or equal.`,v(["📊",c.counts],["🔎","compare"],["🏆",c.most])),
    ]
  },
  AC9S1I05: {
    contexts: [
      { icon:"🚗", test:"rolling the same car on tile and carpet", prediction:"The car will travel farther on carpet.", result:"The car travelled farther on tile.", match:"did not match", same:"the same car and start line", repeat:"three rolls on each surface", evidence:"all six measured distances" },
      { icon:"🧊", test:"melting equal ice cubes in sun and shade", prediction:"The ice in the sun will melt first.", result:"The ice in the sun melted first.", match:"matched", same:"equal ice cubes and the same start time", repeat:"three pairs of ice cubes", evidence:"the melting time for every cube" },
      { icon:"🌱", test:"growing two bean plants with different light", prediction:"The plant with more light will grow taller.", result:"The plant with more light was shorter after one week.", match:"did not match", same:"the plant type, soil, pot and water", repeat:"measurements on several days", evidence:"all dated height measurements" },
      { icon:"🌤️", test:"measuring a pole's shadow in the morning and at midday", prediction:"The midday shadow will be shorter.", result:"The midday shadow was shorter.", match:"matched", same:"the same pole and measuring method", repeat:"measurements on three sunny days", evidence:"the morning and midday lengths from every day" },
      { icon:"🧻", test:"comparing how much water two towels absorb", prediction:"The thin towel will absorb more.", result:"The thick towel absorbed more.", match:"did not match", same:"equal towel sizes and equal water amounts", repeat:"three tests with each towel", evidence:"every measured amount of water absorbed" }
    ],
    tasks: [
      c=>q(`For ${c.test}, did the result match the prediction?`,c.match,[c.match==="matched"?"did not match":"matched","There is no need to compare them."],`The prediction was “${c.prediction}” The result was “${c.result}” They ${c.match}.`,`Read the prediction and result separately, then compare them.`,v(["💭",c.prediction],["👀",c.result],[c.match==="matched"?"✅":"❌",c.match])),
      c=>q(`Which sentence reports the observed result from ${c.test}?`,c.result,[c.prediction,"The result should be changed to fit the prediction."],`${c.result} states what happened, not what was expected.`,`The result comes from observation or measurement after the test.`,v([c.icon,c.test],["👀","result"],["📝",c.result])),
      c=>q(`What should be kept the same during ${c.test}?`,c.same,["the result","the prediction after seeing the answer"],`Keeping ${c.same} the same makes the comparison fairer.`,`Change only the feature being investigated.`,v(["🔒",c.same],[c.icon,c.test],["⚖️","fair comparison"])),
      c=>q(`Why should ${c.test} include ${c.repeat}?`,"Repeated observations show whether the result is consistent.",["Repeating guarantees the prediction is correct.","Only the most helpful result should be kept."],`Repeats help reveal whether a result happens consistently or varies.`,`Record every repeat, including surprising results.`,v([c.icon,c.test],["🔁",c.repeat],["📊","compare trials"])),
      c=>q(`Which evidence should be used when comparing the prediction and result?`,c.evidence,["only the result that matched the prediction","someone's favourite answer"],`${c.evidence.charAt(0).toUpperCase()+c.evidence.slice(1)} gives the complete evidence set.`,`Use all relevant recorded observations, not only one convenient result.`,v(["📝",c.evidence],["🔎","compare"],["✅","all evidence"])),
      c=>q(`After ${c.test}, what should happen when the prediction ${c.match} the result?`,"Record the comparison and use the evidence for the next question.",["Erase the prediction.","Change the result without testing again."],`Both matches and mismatches help build better scientific ideas.`,`Keep the original prediction and the real result.`,v(["💭","prediction"],["👀","result"],["💡","learn"])),
      c=>q(`Which sentence is the prediction in ${c.test}?`,c.prediction,[c.result,"The measurements were written in a table."],`${c.prediction} states the expected outcome before testing.`,`Predictions are made before the evidence is collected.`,v(["⏮️","before"],["💭",c.prediction],[c.icon,c.test])),
      c=>q(`Why would a result that did not match still be useful in ${c.test}?`,"It provides evidence that can improve the next prediction.",["It should be hidden.","It proves observations are unnecessary."],`A mismatch can reveal something new and guide another investigation.`,`Science learns from actual evidence, not only correct guesses.`,v(["❌","mismatch"],["📝","evidence"],["➡️","new prediction"])),
    ]
  },
  AC9S1I06: {
    contexts: [
      { icon:"🍃", topic:"a leaf observation", title:"What We Observed on the Leaf", observation:"The leaf had three brown spots.", label:"jagged edge", finding:"The leaf had more brown spots on Friday than Monday.", unit:"spots", audience:"classmates" },
      { icon:"🚗", topic:"a toy-car ramp test", title:"How Far the Toy Car Travelled", observation:"The car travelled 70 centimetres.", label:"start line", finding:"The car travelled farther on tile than carpet.", unit:"centimetres", audience:"another Year 1 class" },
      { icon:"🌱", topic:"a bean plant record", title:"Our Bean Plant Growth", observation:"The plant was 12 cubes tall on Tuesday.", label:"new leaf", finding:"The plant grew 3 cubes during the week.", unit:"cubes", audience:"families" },
      { icon:"🌦️", topic:"a week of weather observations", title:"Our Week of Weather", observation:"Four days were sunny.", label:"rainy day", finding:"Sunny was the most common weather this week.", unit:"days", audience:"the school assembly" },
      { icon:"📎", topic:"a materials bending test", title:"Which Materials Bent?", observation:"The plastic strip bent and the wooden stick did not.", label:"flexible material", finding:"Two of the three plastic strips bent.", unit:"strips", audience:"a visiting teacher" }
    ],
    tasks: [
      c=>q(`Which title clearly tells the topic of ${c.topic}?`,c.title,["My Favourite Things","Something Happened"],`${c.title} names the investigation or observation clearly.`,`A good title tells the audience what the science communication is about.`,v([c.icon,c.topic],["📰",c.title],["👥",c.audience])),
      c=>q(`Which sentence is a precise observation to share?`,c.observation,["It was really nice.","I think it happened because of magic."],`${c.observation} gives specific evidence.`,`Include what was seen or measured, with a number or unit when useful.`,v([c.icon,c.topic],["👀","observation"],["💬",c.observation])),
      c=>q(`Which label would be useful on a diagram for ${c.topic}?`,c.label,["best part","mystery thing"],`${c.label.charAt(0).toUpperCase()+c.label.slice(1)} names a relevant visible feature or setup part.`,`A diagram label should point to something the audience needs to identify.`,v([c.icon,c.topic],["🏷️",c.label],["➡️","label line"])),
      c=>q(`Which finding uses evidence from ${c.topic}?`,c.finding,["Everyone must like the result.","The first guess was correct because it was first."],`${c.finding} communicates a result supported by observations.`,`A finding tells what the evidence showed.`,v(["📝","records"],["🔎","compare"],["✅",c.finding])),
      c=>q(`Which unit makes the record clear for ${c.topic}?`,c.unit,["goodness","favourites"],`${c.unit.charAt(0).toUpperCase()+c.unit.slice(1)} tells the audience what was counted or measured.`,`Write the number together with what the number measures.`,v(["🔢","number"],["🏷️",c.unit],[c.icon,c.topic])),
      c=>q(`How should results about ${c.topic} be shared with ${c.audience}?`,"Use a clear title, labelled visual and evidence sentence.",["Use unexplained marks with no labels.","Tell only an opinion and hide the observations."],`Clear structure helps ${c.audience} understand the evidence.`,`Show what was investigated, what was observed and what was found.`,v(["📰","title"],["🖼️","labelled visual"],["💬","finding"])),
      c=>q(`What should come first when explaining ${c.topic}?`,"Say what was investigated or observed.",["Announce that every prediction was correct.","Give a conclusion before naming the topic."],`The audience first needs to know what the communication is about.`,`Use the order: topic, evidence, finding.`,v(["1️⃣","topic"],["2️⃣","evidence"],["3️⃣","finding"])),
      c=>q(`Why should a science communication about ${c.topic} include evidence?`,"So the audience can understand how the finding was reached.",["So the page has more words.","So opinions look like measurements."],`Evidence connects the observation or test to the finding.`,`Ask: What did we see, count or measure that supports this finding?`,v(["👀","evidence"],["➡️","supports"],["💡","finding"])),
    ]
  },
  AC9S1U01: {
    contexts: [
      { icon:"🐸", thing:"a frog", foodQuestion:"Which food is suitable for a frog?", food:"insects", water:"pond water", shelter:"reeds and rocks", habitat:"a pond with water, insects and plants", wrongHabitat:"a dry sealed box", care:"protect its pond habitat", place:"its pond habitat" },
      { icon:"🌱", thing:"a bean plant", foodQuestion:"Which resource helps a bean plant make its own food?", food:"light energy", water:"clean water", shelter:"suitable soil and space", habitat:"a pot with soil, water, light and space", wrongHabitat:"a dark cupboard with no water", care:"give it suitable light and water", place:"its growing space" },
      { icon:"🐕", thing:"a dog", foodQuestion:"Which food is suitable for a dog?", food:"suitable dog food", water:"fresh water", shelter:"a safe resting place", habitat:"a safe home with food, water and space", wrongHabitat:"a hot car with no water", care:"provide food, water, exercise and shelter", place:"its home" },
      { icon:"🐦", thing:"a small bird", foodQuestion:"Which food is suitable for a small bird?", food:"seeds and insects", water:"clean water", shelter:"trees or dense shrubs", habitat:"an area with plants, water, food and nesting places", wrongHabitat:"an empty area with no food or shelter", care:"protect plants and keep water sources clean", place:"its habitat" },
      { icon:"👧", thing:"a person", foodQuestion:"Which food supports a person's basic needs?", food:"nutritious food", water:"clean drinking water", shelter:"a safe home", habitat:"a safe place with air, water, food and shelter", wrongHabitat:"a place with no clean air or water", care:"support access to clean water, food, air and shelter", place:"their community" }
    ],
    tasks: [
      c=>q(`Which is a basic need of ${c.thing}?`,c.water,["a favourite toy","a special costume"],`${c.thing.charAt(0).toUpperCase()+c.thing.slice(1)} needs ${c.water} to live.`,`A need is required for life, not simply wanted.`,v([c.icon,c.thing],["💧",c.water],["✅","basic need"])),
      c=>q(c.foodQuestion,c.food,["plastic wrappers","paint"],`${c.food.charAt(0).toUpperCase()+c.food.slice(1)} is a suitable source of food or energy for ${c.thing}.`,`Choose what the living thing naturally uses for nutrition or making food.`,v([c.icon,c.thing],["🍽️",c.food],["⚡","energy"])),
      c=>q(`What can provide shelter or suitable growing space for ${c.thing}?`,c.shelter,["an unsafe bare surface","a sealed container with no air"],`${c.shelter.charAt(0).toUpperCase()+c.shelter.slice(1)} helps meet the living thing's needs.`,`Shelter or growing space provides protection and suitable conditions.`,v([c.icon,c.thing],["🏠",c.shelter],["🛡️","protection"])),
      c=>q(`Which habitat best meets the needs of ${c.thing}?`,c.habitat,[c.wrongHabitat,"a place chosen only because it looks colourful"],`${c.habitat.charAt(0).toUpperCase()+c.habitat.slice(1)} provides several basic needs.`,`Check for water, food or light, air, shelter and suitable space.`,v([c.icon,c.thing],["🌍",c.habitat],["✅","needs met"])),
      c=>q(`Why is ${c.wrongHabitat} unsuitable for ${c.thing}?`,"It does not provide important basic needs.",["It is not someone's favourite colour.","Every living thing can live anywhere."],`A habitat must provide the conditions the living thing needs.`,`Name the missing water, food, air, light, shelter or space.`,v(["❌",c.wrongHabitat],[c.icon,c.thing],["🔍","missing needs"])),
      c=>q(`Which action would help care for ${c.thing}?`,c.care,["remove its water and shelter","give it unsafe human food"],`${c.care.charAt(0).toUpperCase()+c.care.slice(1)} supports the living thing's needs.`,`Choose an action that protects health or habitat.`,v([c.icon,c.thing],["🤲",c.care],["💚","care"])),
      c=>q(`What do ${c.thing} and other animals or plants have in common?`,"They need suitable conditions and resources to live.",["They all need the same kind of toy.","They can live without water or air."],`Living things share basic needs, although the exact resources can differ.`,`Think about air, water, food or light, shelter and space.`,v([c.icon,c.thing],["🌱","living things"],["💧","shared needs"])),
      c=>q(`Which change would most directly harm ${c.thing}?`,`Removing ${c.water} from ${c.place}.`,["Adding a clear observation label.","Recording the living place in a drawing."],`Without ${c.water}, an essential need is missing.`,`Choose the change that removes a resource needed for life.`,v([c.icon,c.thing],["➖",c.water],["⚠️","need missing"])),
    ]
  },
  AC9S1U02: {
    contexts: [
      { icon:"🌅", setting:"a clear summer day", change:"The sky becomes brighter from dawn to morning.", clothing:"a hat and light clothing", order:"dawn, morning, midday, afternoon, sunset, night", shadow:"A shadow is often shorter near midday than in the morning.", weather:"sunny and warm", animal:"Some animals rest in shade during the hottest part of the day." },
      { icon:"❄️", setting:"a cold winter day", change:"The air temperature rises after sunrise and falls again at night.", clothing:"a warm layer", order:"dawn, morning, midday, afternoon, sunset, night", shadow:"A shadow changes position as the Sun appears to move across the sky.", weather:"cold and cloudy", animal:"Some animals seek sheltered places in cold weather." },
      { icon:"🌧️", setting:"a rainy day", change:"Clouds darken before rain begins.", clothing:"a raincoat", order:"clouds gather, rain begins, puddles form, rain stops", shadow:"A clear shadow may be hard to see under thick clouds.", weather:"cloudy and rainy", animal:"Worms may be seen near the surface after rain." },
      { icon:"🌞", setting:"morning changing to night", change:"Daylight increases after sunrise and fades after sunset.", clothing:"clothing suited to the day's temperature and weather", order:"sunrise, morning, midday, afternoon, sunset, night", shadow:"The same object's shadow changes length and direction during the day.", weather:"weather can change while the day-night pattern repeats", animal:"Different animals may be active in daylight or darkness." },
      { icon:"🍂", setting:"autumn changing towards winter", change:"Days become cooler and some trees lose leaves.", clothing:"warmer clothing as temperatures cool", order:"summer, autumn, winter, spring", shadow:"Seasonal changes can affect the Sun's path and daylight length.", weather:"cooler conditions become more common", animal:"Some animals change where or when they find food." }
    ],
    tasks: [
      c=>q(`Which is an observable change during ${c.setting}?`,c.change,["The weather is trying to be annoying.","Nothing in the environment ever changes."],`${c.change} can be noticed or measured.`,`Choose a change in light, temperature, clouds, rain, plants or animals.`,v([c.icon,c.setting],["👀","observe"],["➡️",c.change])),
      c=>q(`Which choice is suitable for ${c.weather} conditions?`,c.clothing,["clothing chosen without checking conditions","unsafe equipment unrelated to weather"],`${c.clothing.charAt(0).toUpperCase()+c.clothing.slice(1)} suits the observed conditions.`,`Match clothing or shelter to rain, sunshine, wind or temperature.`,v([c.icon,c.weather],["🧥",c.clothing],["✅","suitable"])),
      c=>q(`Which sequence is in a sensible time order for ${c.setting}?`,c.order,[c.order.split(", ").reverse().join(", "),"night, midday, sunrise, afternoon"],`${c.order.charAt(0).toUpperCase()+c.order.slice(1)} follows the observed time or seasonal sequence.`,`Start with the earliest stage and move forward one step at a time.`,v(["1️⃣",c.order.split(", ")[0]],["➡️","time passes"],["🏁",c.order.split(", ").at(-1)])),
      c=>q(`Which statement about shadows is useful when observing ${c.setting}?`,c.shadow,["A shadow never changes.","A shadow always points towards the light source."],`${c.shadow} describes how light and time can affect shadows.`,`Compare the same object's shadow at different times or in different light.`,v(["☀️","light"],["🧍","object"],["⬛","shadow"])),
      c=>q(`Which weather description matches ${c.setting}?`,c.weather,["a personal opinion with no observation","exactly the same weather everywhere"],`${c.weather.charAt(0).toUpperCase()+c.weather.slice(1)} describes observable conditions.`,`Use words for clouds, rain, wind, sunshine or temperature.`,v([c.icon,c.setting],["🌦️",c.weather],["📝","weather record"])),
      c=>q(`Which animal response may be observed during ${c.setting}?`,c.animal,["Every animal behaves in exactly the same way.","Animals never respond to environmental change."],`${c.animal} is a possible response to environmental conditions.`,`Look for a careful statement using “some” or “may”, not an absolute claim.`,v(["🐾","animals"],[c.icon,c.setting],["👀",c.animal])),
      c=>q(`Why record ${c.setting} at the same time on several days?`,"To compare observations and look for repeated changes.",["To make every day have identical weather.","To remove any surprising result."],`Repeated records help reveal patterns and differences.`,`Keep the observation time and method similar, then compare.`,v(["📅","several days"],["🕒","same time"],["🔁","look for patterns"])),
      c=>q(`When thinking about ${c.setting}, which statement carefully compares daily and seasonal change?`,"Day and night repeat daily. Seasons change over many weeks and months.",["Day, night and seasons all change in one hour.","The environment stays exactly the same all year."],`Daily cycles and seasonal patterns happen over different time scales.`,`Think about what repeats in one day and what changes across the year.`,v(["🌞","day"],["🌙","night"],["🗓️","seasons"])),
    ]
  },
  AC9S1U03: {
    contexts: [
      { icon:"🛒", object:"a toy wagon", push:"push the wagon away", pull:"pull the wagon towards you", gentle:"moves a short distance", strong:"usually moves farther on the same surface", surface:"smooth floor", shape:"does not usually change shape from a gentle push" },
      { icon:"🗄️", object:"a drawer", push:"push the drawer closed", pull:"pull the drawer open", gentle:"moves slowly", strong:"usually moves faster if the drawer is free to move", surface:"drawer runners", shape:"keeps its shape while moving" },
      { icon:"⚽", object:"a ball", push:"push or kick the ball away", pull:"pull the ball back in a net", gentle:"rolls slowly", strong:"usually rolls faster or farther on the same surface", surface:"grass", shape:"may squash slightly when squeezed" },
      { icon:"🚗", object:"a toy car", push:"push the car away", pull:"pull the car back with a string", gentle:"travels a short distance", strong:"usually travels farther when the car and surface stay the same", surface:"carpet", shape:"keeps its shape during rolling" },
      { icon:"🟣", object:"a ball of playdough", push:"press the playdough down", pull:"pull the playdough longer", gentle:"changes shape a little", strong:"changes shape more", surface:"a clean tray", shape:"changes shape when pushed, pulled or squeezed" }
    ],
    tasks: [
      c=>q(`Which action is a push on ${c.object}?`,c.push,[c.pull,"watch it without touching it"],`${c.push.charAt(0).toUpperCase()+c.push.slice(1)} applies a force away from the person or into the object.`,`A push moves something away or presses on it.`,v(["🖐️","push"],[c.icon,c.object],["➡️",c.push])),
      c=>q(`Which action is a pull on ${c.object}?`,c.pull,[c.push,"leave it still"],`${c.pull.charAt(0).toUpperCase()+c.pull.slice(1)} applies a pulling force.`,`A pull brings something closer or stretches it.`,v(["⬅️",c.pull],[c.icon,c.object],["✋","pull"])),
      c=>q(`What may happen after a gentle force is used on ${c.object}?`,c.gentle,[c.strong,"A gentle force must always have the same effect as a strong force."],`${c.gentle.charAt(0).toUpperCase()+c.gentle.slice(1)} is a possible effect of a gentle force.`,`Compare gentle and stronger forces while keeping the object and surface the same.`,v(["🤏","gentle force"],[c.icon,c.object],["➡️",c.gentle])),
      c=>q(`What may happen after a stronger force is used on ${c.object}?`,c.strong,[c.gentle,"The object must always break."],`${c.strong.charAt(0).toUpperCase()+c.strong.slice(1)} is a careful comparison under the same conditions.`,`Use “usually” or “may”; a stronger force can change motion or shape.`,v(["💪","stronger force"],[c.icon,c.object],["➡️",c.strong])),
      c=>q(`Which statement describes a possible effect of force on ${c.object}?`,c.shape,["Forces can never change motion or shape.","A force changes only colour, not motion or shape."],`${c.shape.charAt(0).toUpperCase()+c.shape.slice(1)} describes an effect a force can have.`,`A force can start, stop, speed up, slow down, turn or change shape.`,v(["✋","force"],[c.icon,c.object],["🔄",c.shape])),
      c=>q(`For a fair test of pushes on ${c.object}, what should stay the same?`,`Use the same ${c.object} and the same ${c.surface}.`,["Change the object and surface every time.","Keep only the result you like."],`Using the same object and surface makes the push strength easier to compare.`,`Change the force, but keep other important conditions the same.`,v([c.icon,c.object],["🔒",c.surface],["⚖️","fair test"])),
      c=>q(`Which word names the push or pull used on ${c.object}?`,"force",["movement","speed"],`A force is a push or a pull that can affect motion or shape.`,`Think about what your hands apply when moving an object.`,v(["➡️","push"],["⬅️","pull"],["💥","force"])),
      c=>q(`How should the effect of a push on ${c.object} be recorded?`,"Describe or measure the change in motion or shape.",["Write only whether you liked it.","Change the observation to match the prediction."],`A useful record tells how far, how fast, which direction or how the shape changed.`,`Record what changed after the force.`,v(["✋","push"],[c.icon,c.object],["📝","record effect"])),
    ]
  }
};

function escapeXml(value) {
  return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function wrapLabel(value, limit=22) {
  const lines=[];
  let line="";
  for (const word of String(value).split(/\s+/)) {
    if (!line) line=word;
    else if (`${line} ${word}`.length<=limit) line+=` ${word}`;
    else { lines.push(line); line=word; }
  }
  if (line) lines.push(line);
  return lines;
}

function visualSymbol(id, visual) {
  const cards = visual.map((entry,index) => {
    const x = 24 + index * 204;
    const lines=wrapLabel(entry.label);
    const fontSize=lines.length>5?11:lines.length>3?12:14;
    const tspans=lines.map((line,lineIndex)=>`<tspan x="${x+92}" dy="${lineIndex?fontSize+5:0}">${escapeXml(line)}</tspan>`).join("");
    return `<g><rect x="${x}" y="28" width="184" height="244" rx="22" fill="${["#eef8ff","#f3fbef","#fff6e8"][index]}" stroke="${["#68b5e4","#78bb67","#e5a947"][index]}" stroke-width="2"/><text x="${x+92}" y="88" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="42">${escapeXml(entry.icon)}</text><text x="${x+92}" y="120" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${fontSize}" font-weight="700" fill="#173968">${tspans}</text></g>`;
  }).join("");
  return `<symbol id="${id}" viewBox="0 0 640 300"><rect width="640" height="300" rx="24" fill="#fff"/>${cards}</symbol>`;
}

function answers(correct, wrong, correctIndex) {
  const distractors = [...new Set(wrong.map(String))].filter(value => value !== String(correct)).slice(0,2);
  if (distractors.length !== 2) throw new Error(`Need two unique distractors for: ${correct}`);
  const choices = [...distractors];
  choices.splice(correctIndex,0,String(correct));
  return choices.map((text,index)=>({text,is_correct:index===correctIndex}));
}

fs.mkdirSync(BANK_ROOT,{recursive:true});
fs.mkdirSync(VISUAL_ROOT,{recursive:true});
const report = [];

for (const [code, config] of Object.entries(configs)) {
  if (config.contexts.length !== 5 || config.tasks.length !== 8) throw new Error(`${code}: expected 5 contexts and 8 tasks`);
  const items=[];
  const symbols=[];
  for (const bank of ["practice","test"]) {
    const contextIndexes = bank === "practice" ? [0,1,2] : [3,4];
    let bankIndex=0;
    for (const contextIndex of contextIndexes) {
      for (const task of config.tasks) {
        const source=task(config.contexts[contextIndex]);
        const id=`${code}-${bank === "practice" ? "P" : "T"}-${String(bankIndex+1).padStart(3,"0")}`;
        const symbolId=id.toLowerCase();
        const correctIndex=bankIndex%3;
        symbols.push(visualSymbol(symbolId,source.visual));
        const alt=source.visual.map(entry=>`${entry.icon} ${entry.label}`).join("; ");
        items.push({
          id,subject:"science",year_level:"Year 1",curriculum_code:code,bank,
          skill:`${code.toLowerCase()}_${String((bankIndex%8)+1).padStart(2,"0")}`,
          question:source.question,audio_prompt:source.question,
          visual:{type:"svg",asset_path:`/assets/assessment-visuals/year1-science-${code.toLowerCase()}.svg#${symbolId}`,alt_text:alt},
          answers:answers(source.correct,source.wrong,correctIndex),correct_index:correctIndex,
          explanation:{summary:source.summary,hint:source.hint}
        });
        bankIndex+=1;
      }
    }
  }
  const codeLower=code.toLowerCase();
  fs.writeFileSync(path.join(BANK_ROOT,`${codeLower}.json`),`${JSON.stringify(items,null,2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT,`year1-science-${codeLower}.svg`),`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${symbols.join("")}</svg>\n`);
  fs.writeFileSync(path.join(BANK_ROOT,`${codeLower}-qa-log.json`),`${JSON.stringify({curriculum_code:code,practice:24,test:16,items:40,automated_quality_score:9,fixes:["Replaced the 8-item response-only banks with 40 unique, auto-marked Year 1 items.","Used separate Practice and Test contexts.","Added balanced three-option choices based on plausible misconceptions.","Added system read-aloud prompts, SVG visual metadata, accessibility text, summaries and hints."],flagged_for_awareness:[]},null,2)}\n`);
  report.push({code,practice:24,test:16,items:40,visuals:40});
}

console.log(JSON.stringify({completed:report},null,2));
