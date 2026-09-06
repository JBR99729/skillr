"use strict";

(() => {
  const banks = window.SkillrFoundationWorksheetData || (window.SkillrFoundationWorksheetData = {});

  banks.AC9MFN01 = {
    title: "Numbers to 20",
    topicUrl: "/foundation/maths/ac9mfn01-name-represent-and-order-numbers-including-zero-to-at-least/",
    questions: [
      { type:"single", question:"A student builds 10 blocks and 2 more blocks. Which numeral shows the total?", visual:"10 blocks + 2 blocks", answers:["12","21","10","14"] },
      { type:"fill-blank", question:"Complete the counting sequence.", template:"11, 12, {{blank}}, 14" },
      { type:"match", question:"Match each numeral to the representation with the same quantity.", matchLeft:["0","7","12"], matchRight:["10 + 2","empty collection","7 counters"] },
      { type:"single", question:"Which tray shows zero objects?", visual:"Tray A: [ empty ]   Tray B: [ 1 counter ]   Tray C: [ 5 counters ]", answers:["Tray A","Tray B","Tray C"] },
      { type:"text", question:"Put these numbers in order from smallest to largest: 16, 5, 11, 2." },
      { type:"fill-blank", question:"Write the number one less and one more than 14.", template:"{{blank}}  <  14  <  {{blank}}" },
      { type:"match", question:"Match each number name to its numeral.", matchLeft:["five","twelve","twenty"], matchRight:["20","5","12"] },
      { type:"text", question:"Mia has 9 counters and receives 1 more. How many counters does she have now? Show how you know." },
      { type:"text", enrichment:true, question:"Sam says 14 and 41 are the same because they use the same digits. Is Sam correct? Show what 14 means using 10 and ones." },
      { type:"text", enrichment:true, question:"Put 0, 5, 11 and 16 in order. Name the first and last numbers and explain how a number line helps." }
    ]
  };

  const ANSWERS = {
    AC9MFN01:["12","13","0 → empty collection; 7 → 7 counters; 12 → 10 + 2","Tray A","2, 5, 11, 16","13 and 15","five → 5; twelve → 12; twenty → 20","10 counters","0, 5, 11, 16; 0 is first and 16 is last"],
    AC9MFN02:["4","5","3 → 2 and 1; 4 → 2 and 2; 5 → 3 and 2","I can see 5 as smaller parts, such as 3 and 2.","3","They show the same quantity","Two different arrangements containing exactly 4 dots","5 and 5 → same; 5 and 4 → 5 has more; 3 and 4 → 3 has fewer","Two arrangements of 5, with one compared correctly with 4"],
    AC9MFN03:["Move each object once as you count","7","4 → 4 dots; 6 → 6 dots; 3 → 3 dots","8","Line the counters up one-to-one; the row with leftovers has more.","2","more → 8; fewer → 4; same → 5 and 5","5 pencils","Any two collections whose totals differ by 3"],
    AC9MFN04:["7","7","6 → 4 + 2; 7 → 5 + 2; 8 → 5 + 3","4 and 2","Any two correct partitions of 5","5","whole → 7; part → 2; same whole → 2 + 4 and 4 + 2","Both use the same 6 objects, only in a different order.","The hidden part is 5 because 4 and 5 make 9."],
    AC9MFN05:["It gets larger","5","2 more arrive → joining; 3 hop away → separating; 1 is added → joining","5","A valid joining story showing 5 becoming 7","5","4 then 3 more → joining to 7; 7 then 3 removed → separating; 5 then 1 more → joining to 6","The action shows whether objects join or leave.","A valid joining story and separating story using 6 and 2"],
    AC9MFN06:["2","4","6 → 3 groups of 2; 8 → 2 groups of 4; 9 → 3 groups of 3","No","Deal one card to each player in turn until all 8 are shared.","3","number of groups → how many groups; group size → how many in each; fair share → same amount","Count each share and check the amounts are equal.","Two valid equal groupings of 8, such as 2 groups of 4 and 4 groups of 2"],
    AC9MFA01:["triangle","red","red blue → red blue; clap stamp → clap stamp; A B C → A B C","square circle square circle","Any two-item unit repeated at least twice","B","copy → make the same; continue → add next items; repair → fix wrong item","The objects can change while the repeating order stays the same.","The fifth item breaks the AB pattern and should be red."],
    AC9MFM01:["longer","longer","heavier → mass; holds more → capacity; takes longer → duration","Line up the same starting point","Fill one container and pour into the other to compare capacity.","longer","balance → mass; pour → capacity; align endpoints → length","Height alone does not show how much a container holds.","A fair length comparison and a separate fair mass comparison"],
    AC9MFM02:["morning","afternoon","breakfast → morning; lunch → lunchtime; bedtime → night","Monday","wake up, eat lunch, go to bed","Tuesday and Thursday","yesterday → before today; today → current day; tomorrow → after today","The week repeats, so Monday follows Sunday.","Yesterday Friday, tomorrow Sunday, day after tomorrow Monday"],
    AC9MFSP01:["triangle","4","triangle → 3 straight sides; circle → curved/no corners; square → 4 equal straight sides","still a square","It has 3 straight sides and 3 corners.","0","3 corners → triangle; no corners → circle; 4 corners → square and rectangle","Any correct circle object and rectangle object","Turning or resizing does not change a shape's sides or corners."],
    AC9MFSP02:["inside","under","inside → in the box; under → below; beside → next to","Put it beside the desk","Any clear instruction placing the toy under the chair","A correct position word that matches the teacher's model","forward → move ahead; left → change direction; stop beside → finish next to","Any clear two-step route using reference objects","Three precise clues that name reference objects"],
    AC9MFST01:["Cats","1","collect → gather; sort → categories; compare → more, less or same","So comparison is fair and easy","Any two clear, non-overlapping toy categories","same","6 vs 3 → first more; 2 vs 5 → first fewer; 4 vs 4 → same","Any familiar question answerable by collecting class data","A correct two-category display with 7 responses and a supported comparison"]
  };

  const HINTS = {
    AC9MFN01:"Build, count or point on the 0–20 number line.", AC9MFN02:"Look for small parts, then say how many altogether.",
    AC9MFN03:"Touch or move each object once, then compare the totals.", AC9MFN04:"Name the whole and use the same objects to find both parts.",
    AC9MFN05:"Act out what joins or leaves before recording the result.", AC9MFN06:"Deal one at a time, then count every share or group.",
    AC9MFA01:"Find the smallest unit that repeats in the same order.", AC9MFM01:"Name the attribute and choose a fair direct comparison.",
    AC9MFM02:"Use the day or week sequence and move one step at a time.", AC9MFSP01:"Trace the sides and corners instead of judging its position.",
    AC9MFSP02:"Name the reference object and use a precise position word.", AC9MFST01:"Start rows together and use the displayed data as evidence."
  };

  const METHODS = {
    AC9MFN01:"the quantity is built, counted and matched to its numeral or position on the 0–20 number line", AC9MFN02:"the small parts are seen first and then combined to name the total",
    AC9MFN03:"each object is counted once and the final count or one-to-one match gives the comparison", AC9MFN04:"the same whole is split into parts and the parts recombine without changing the whole",
    AC9MFN05:"the objects are acted out joining or separating before the result is recorded", AC9MFN06:"objects are dealt or grouped equally and every share is checked",
    AC9MFA01:"the smallest repeating unit keeps the same order", AC9MFM01:"the named attribute is compared directly under fair conditions",
    AC9MFM02:"the event or day is placed in a familiar sequence", AC9MFSP01:"the sides and corners identify the shape even when it turns or changes size",
    AC9MFSP02:"a precise position word locates the object relative to a named reference object", AC9MFST01:"the data is sorted into clear categories and compared from the same starting point"
  };

  const VOCABULARY = {
    AC9MFN01:["quantity","numeral","order","zero"], AC9MFN02:["subitise","quantity","parts","arrangement"], AC9MFN03:["collection","total","more","fewer"],
    AC9MFN04:["whole","part","partition","combine"], AC9MFN05:["join","separate","represent","result"], AC9MFN06:["equal","share","group","group size"],
    AC9MFA01:["pattern","repeat","unit","continue"], AC9MFM01:["length","mass","capacity","duration"], AC9MFM02:["sequence","daypart","yesterday","tomorrow"],
    AC9MFSP01:["shape","side","corner","sort"], AC9MFSP02:["position","location","reference object","route"], AC9MFST01:["data","category","display","compare"]
  };

  for (const [code, unit] of Object.entries(banks)) {
    if (!/^AC9MF/.test(code) || !Array.isArray(unit.questions)) continue;
    const original = unit.questions.slice();
    const selected = [...original.slice(0, 8), original.at(-1)].filter(Boolean);
    unit.preservedOptionalQuestions = original.filter((question) => !selected.includes(question));
    unit.questions = selected.map((question, index) => ({
      ...question,
      enrichment: index >= 7,
      tier: index < 3 ? "warm-up" : index < 7 ? "core" : "challenge",
      tierLabel: index < 3 ? "Warm-Up" : index < 7 ? "Core" : "Challenge",
      answer: ANSWERS[code]?.[index] || "A correct response using the lesson model.",
      summary: `${ANSWERS[code]?.[index] || "The response"} is correct because ${METHODS[code]}.`,
      hint: HINTS[code] || "Use the lesson model and show one clear step.",
      alignment: { concept: unit.title, vocabulary: VOCABULARY[code][index % VOCABULARY[code].length], method: METHODS[code] }
    }));
  }
})();

// Reviewed worksheet wording for this three-code text-only batch.
// Keep the existing models, question types, tier allocation and other codes.
(() => {
  const banks = window.SkillrFoundationWorksheetData;
  const reviews = {
    AC9MFN01: [
      [null, "12: ten and two more make twelve.", "Build the ten first, then add the two extra blocks."],
      [null, "13 comes after 12 and before 14.", "Say the count from 11 to 14 in order."],
      [null, "0 matches the empty collection; 7 matches seven counters; 12 matches ten and two.", "Check how many objects each representation shows."],
      [null, "Tray A is empty, so it shows zero objects.", "Zero describes a collection with no objects."],
      ["Order 16, 5, 11 and 2 from smallest to largest. Which number belongs between 5 and 16?", "2, 5, 11, 16. The number 11 belongs between 5 and 16 in this list.", "Use the existing 0–20 number line to check the order."],
      [null, "13 is one less than 14; 15 is one more.", "Move one step left and one step right from 14."],
      [null, "five → 5; twelve → 12; twenty → 20.", "Say each number name, then find its numeral."],
      ["An empty tray is labelled 0. A bus is labelled 12. Must the bus have 12 people on it? Explain what each numeral tells you.", "No. On the tray, 0 tells how many objects there are. On the bus, 12 can identify its route; it need not count the people.", "A numeral can show a quantity or act as a label."],
      ["A child orders the cards 0, 5, 16, 11. Repair the order. Explain which two cards need to move.", "0, 5, 11, 16. Swap 16 and 11 because 11 comes before 16 on the number line.", "Keep 0 and 5 in place and compare the last two numbers."]
    ],
    AC9MFN02: [
      ["Adult: briefly show the dot arrangement, then cover it. Child: say how many and what you noticed.", "4. Accept recognising the whole arrangement or seeing two groups of 2. Counting every dot gives the correct total but is not yet evidence of subitising.", "Offer another look or a smaller familiar collection if needed; this is not a speed test."],
      [null, "5. Recognising 3 and 2 as parts can help name the total.", "Use a real collection arranged in the stated parts, then cover it after a quick look."],
      [null, "3 → 2 and 1; 4 → 2 and 2; 5 → 3 and 2.", "Each pair of parts must make the named whole."],
      ["An adult briefly shows a card with 5 dots. Explain what you saw that helped you name the total.", "Accept a familiar whole arrangement or recognised parts such as 4 and 1 or 3 and 2. The explanation must match the card shown.", "Adult: use an existing card, show it briefly and cover it before the response."],
      [null, "3. Two and one make three.", "Recognise the small parts before saying the whole."],
      [null, "They show the same quantity. Rearranging the same five dots does not add or remove dots.", "Compare how many, rather than how much space the arrangement takes."],
      ["Draw two arrangements of 4 dots. Ask an adult to cover each after a quick look. Say how many you recognised.", "Both drawings must contain exactly 4 dots. Record whether the child recognised the quantity or counted each dot.", "Try a familiar arrangement first, then move the same four dots."],
      [null, "5 and 5 → same; 5 and 4 → 5 has more; 3 and 4 → 3 has fewer.", "Name each small quantity, then compare the totals."],
      ["One child says 5 after counting every dot. Another recognises 5 at a glance. Are both totals correct? Which child used subitising?", "Both totals are correct. The child who recognised five without counting each dot used subitising.", "Explain the method used, not only whether the answer is right."]
    ],
    AC9MFN04: [
      [null, "7 is the whole. The parts are 5 and 2.", "The whole includes both parts, using the same counters."],
      [null, "7. Five and two combine to make seven.", "Bring the two parts together to check."],
      [null, "6 → 4 + 2; 7 → 5 + 2; 8 → 5 + 3.", "Check that each pair combines to make the named whole."],
      [null, "4 and 2 make 6. The other pairs make larger wholes.", "Build six counters and split that same collection."],
      ["Split 5 counters into two parts. Show a second way using the same counters. Can one part be empty?", "For example, 4 and 1, then 3 and 2. Yes: 5 and 0 also make 5.", "Move counters between the parts without adding or removing any."],
      [null, "5 is missing because 3 and 5 make 8.", "Build the whole of 8 and separate the visible part of 3."],
      [null, "whole → 7; part → 2; same whole, different order → 2 + 4 and 4 + 2.", "Name both parts and the whole before matching."],
      ["A child labels two parts of 6 as 4 and 3. Explain the mistake and repair one label.", "4 and 3 make 7, not 6. Keep the part of 4 and change 3 to 2; alternatively keep 3 and change 4 to 3.", "Both parts together must match the known whole."],
      ["The whole is 9. Four counters are visible and the rest are covered. Find the hidden part, then describe how to check it.", "5 are hidden. Four and five make nine. Uncover and recombine the same counters to check the whole.", "Use the known whole and visible part instead of guessing."]
    ]
  };
  for (const [code, edits] of Object.entries(reviews)) {
    const unit = banks?.[code];
    if (!unit || unit.questions.length !== edits.length) continue;
    unit.questions.forEach((question, index) => {
      const [prompt, explanation, hint] = edits[index];
      question.question = prompt || question.question.replace(/^E\d\s*[—-]\s*/, "");
      question.answer = explanation;
      question.summary = `${explanation} ${hint}`;
      question.hint = hint;
      question.alignment.method = hint;
    });
  }
})();

// Scoped text review: joining/separating, equal groups and repeating patterns.
(() => {
 const edits = {"AC9MFN05": [{"prompt": null, "answer": "The collection gets larger because objects join it.", "hint": "Act out the joining action with counters."}, {"prompt": null, "answer": "5; three and two make five.", "hint": "Build the starting group and add the new objects."}, {"prompt": null, "answer": "2 more arrive → joining; 3 hop away → separating; 1 is added → joining.", "hint": "Describe the action before matching."}, {"prompt": null, "answer": "5 remain because three of the eight are removed.", "hint": "Move the removed counters away from the group."}, {"prompt": null, "answer": "For example, 5 birds are on a fence and 2 arrive, making 7.", "hint": "Show the starting amount, action and result."}, {"prompt": null, "answer": "5; seven with two removed leaves five.", "hint": "Keep track of the counters that remain."}, {"prompt": null, "answer": "4 then 3 more → joining to make 7; 7 then 3 removed → separating; 5 then 1 more → joining to make 6.", "hint": "Match the action and result, not just one number."}, {"prompt": "Use 6 counters for each story: 2 join; 2 leave. Show and explain the two results.", "answer": "Joining 2 to 6 gives 8; removing 2 from 6 leaves 4.", "hint": "Begin each story with a new collection of six."}, {"prompt": "There are 5 children and 3 brushes. How many more brushes are needed for one each? Does the word “more” tell you to add 5 and 3?", "answer": "No. In “How many more brushes are needed?”, match the 3 brushes to 5 children to find the missing 2.", "hint": "Use the situation and objects instead of choosing an action from one word."}], "AC9MFN06": [{"prompt": null, "answer": "2 counters each. Three equal shares of two use all six.", "hint": "Deal one counter to each child in turn."}, {"prompt": null, "answer": "4 in each group. Two groups of four use all eight.", "hint": "Check that both groups have the same number."}, {"prompt": null, "answer": "6 → 3 groups of 2; 8 → 2 groups of 4; 9 → 3 groups of 3.", "hint": "Count the groups and the items in each group."}, {"prompt": null, "answer": "No. Three counters and two counters are different amounts.", "hint": "Compare the number in each share."}, {"prompt": null, "answer": "Deal one card to each of four players in turn; repeat once. Each gets 2.", "hint": "Check that all eight cards are used."}, {"prompt": null, "answer": "3 objects in each group.", "hint": "Make three equal groups using all nine objects."}, {"prompt": null, "answer": "number of groups → how many groups; group size → objects in each group; fair share → everyone gets the same amount.", "hint": "Say what each number describes."}, {"prompt": "One mat has 4 counters and another has 2. Move counters to make equal shares. Explain what you moved.", "answer": "Move one counter from the group of 4 to the group of 2. Both then have 3.", "hint": "Keep the total of six unchanged."}, {"prompt": null, "answer": "Three groups of 3 use 9 counters, leaving 1. The groups are equal, but they do not include all 10.", "hint": "Count the grouped counters and the leftover separately."}], "AC9MFA01": [{"prompt": null, "answer": "triangle. The repeating unit is triangle, circle.", "hint": "Repeat the pair in the same order."}, {"prompt": null, "answer": "red. The red-blue pair repeats.", "hint": "Read the whole pattern from the start."}, {"prompt": null, "answer": "red blue; clap stamp; A B C are the respective smallest units.", "hint": "Find the shortest unit that repeats to make each shown pattern."}, {"prompt": "Which sequence shows the same whole unit repeated at least twice?", "answer": "square circle square circle shows two repeats of the same pair.", "hint": "Look for a whole unit shown again in the same order."}, {"prompt": null, "answer": "For example, clap, stamp, clap, stamp; the unit is clap, stamp.", "hint": "Show at least two complete repeats."}, {"prompt": null, "answer": "B. The unit A, B, C repeats.", "hint": "Check the place between A and C."}, {"prompt": null, "answer": "copy → make the same pattern; continue → add the next correct items; repair → fix the wrong item.", "hint": "Decide what action is being requested."}, {"prompt": "Change red, red, blue, red, red, blue into actions: use clap for red and stamp for blue. Say the new pattern.", "answer": "clap, clap, stamp, clap, clap, stamp. The repeated order is unchanged.", "hint": "Replace each red with clap and each blue with stamp."}, {"prompt": null, "answer": "The fifth item should be red. Then red, blue repeats three times.", "hint": "Use the stated red-blue rule to check each position."}]};
 for (const [code, rows] of Object.entries(edits)) {
  const unit = window.SkillrFoundationWorksheetData?.[code];
  if (!unit || unit.questions.length !== rows.length) continue;
  unit.questions.forEach((q,i) => {
   const r=rows[i]; q.question=r.prompt || q.question.replace(/^E\d\s*[—-]\s*/, "");
   q.answer=r.answer; q.hint=r.hint; q.summary=`${r.answer} ${r.hint}`;
   q.alignment.method=r.hint;
  });
 }
})();

// Scoped text review: measurement, time sequences and familiar shapes.
(() => {
 const edits = {"AC9MFM01": [{"prompt": null, "answer": "longer. It describes a comparison of length.", "hint": "Ask whether you are comparing how long, how heavy, how much it holds or how long it takes."}, {"prompt": null, "answer": "longer. A reaches farther when the starting ends are aligned.", "hint": "Compare the far ends only after lining up the starting ends."}, {"prompt": null, "answer": "heavier → mass; holds more → capacity; takes longer → duration.", "hint": "Say what changes in each comparison."}, {"prompt": null, "answer": "Line up the same starting point. Then compare the other ends.", "hint": "Keep both spoons straight and side by side."}, {"prompt": null, "answer": "Fill A to the brim, then pour into empty B without spilling. Space left in B means B holds more; overflow means B holds less; exactly full means equal capacity.", "hint": "Start with one full container and one empty container."}, {"prompt": null, "answer": "longer. B finishes later after the shared start.", "hint": "Use both the starting and finishing information."}, {"prompt": null, "answer": "use a balance → mass; pour between containers → capacity; align endpoints → length.", "hint": "Choose the method that directly tests the named attribute."}, {"prompt": "A full tall cup is poured into an empty shorter, wider cup without spilling. There is still space in the wider cup. Which holds more? Explain.", "answer": "The shorter, wider cup holds more: it holds all the tall cup’s full amount and still has space.", "hint": "Use the pouring result rather than height alone."}, {"prompt": "A large empty box and a small book look different in size. Why is size alone not enough to tell which is heavier? How could you test it?", "answer": "Size alone is not enough. Heft the empty box and the book, or put them on a balance to compare their mass.", "hint": "Do not predict the result from appearance; report what the comparison shows."}], "AC9MFM02": [{"prompt": "In a familiar morning-to-night routine, which of these comes first?", "answer": "morning, in the familiar morning-to-night routine.", "hint": "Think about the start of a usual waking day."}, {"prompt": null, "answer": "afternoon. It follows lunchtime and comes before night in this sequence.", "hint": "Say all four parts of the sequence in order."}, {"prompt": null, "answer": "breakfast → morning; lunch → lunchtime; bedtime → night.", "hint": "These are likely routine times; personal routines can differ."}, {"prompt": null, "answer": "Monday. The weekly sequence continues after Sunday.", "hint": "Continue around the week rather than stopping at the chart’s edge."}, {"prompt": null, "answer": "wake up, eat lunch, go to bed.", "hint": "Connect each event to morning, lunchtime or night."}, {"prompt": null, "answer": "Yesterday: Tuesday. Tomorrow: Thursday.", "hint": "Start at Wednesday; move back one day for yesterday and forward one for tomorrow."}, {"prompt": null, "answer": "yesterday → the day before today; today → the current day; tomorrow → the day after today.", "hint": "Anchor both directions to today."}, {"prompt": "Watering roster: Monday—Noor; Tuesday—Eli; Wednesday—Ava. Today is Tuesday. Who watered yesterday? Whose turn is tomorrow?", "answer": "Noor watered yesterday; Ava waters tomorrow.", "hint": "Locate Tuesday on the roster, then look one day before and one day after."}, {"prompt": null, "answer": "For example: wake in the morning, eat at lunchtime, play in the afternoon, go to bed at night. The time words explain the order.", "hint": "Accept a sensible four-event personal routine with reasons based on when events happen."}], "AC9MFSP01": [{"prompt": null, "answer": "triangle. It has three straight sides meeting at three corners.", "hint": "Trace all the way around the boundary."}, {"prompt": null, "answer": "4. A square has four corners.", "hint": "Count each corner once as you trace around it."}, {"prompt": null, "answer": "triangle → 3 straight sides; circle → curved boundary, no corners; square → 4 equal straight sides.", "hint": "Match the listed features; a square also has four square corners."}, {"prompt": null, "answer": "still a square. Turning it does not change its sides or corners.", "hint": "Imagine turning the cut-out back without bending it."}, {"prompt": "Draw a pretend vehicle using two familiar shapes. Name the shapes and explain what each represents.", "answer": "For example, a rectangle for the body and circles for the wheels; name and explain both choices.", "hint": "Accept any vehicle drawing using two correctly named familiar shapes."}, {"prompt": null, "answer": "0. Its boundary curves continuously without corners.", "hint": "Trace the circle and look for a point where straight sides meet."}, {"prompt": null, "answer": "has 3 corners → triangle; has no corners → circle; has 4 corners → square and rectangle.", "hint": "Use the stated number-of-corners rule for every shape."}, {"prompt": "Name a circle-like part and a rectangle-like part of everyday objects. Give a feature that supports each choice.", "answer": "For example, a lid’s outline is circular with no corners; a book cover is rectangular with four straight sides and four square corners.", "hint": "Name the specific part of each object and give a feature as evidence."}, {"prompt": "The rule is “three straight sides”. A child puts a red triangle in the group but leaves a blue triangle out. Explain how to fix the sorting.", "answer": "Both triangles belong in the three-straight-sides group, even if one is blue and one is red.", "hint": "Apply the stated shape rule; colour matters only when colour is the sorting rule."}]};
 for (const [code, rows] of Object.entries(edits)) {
  const unit = window.SkillrFoundationWorksheetData?.[code];
  if (!unit || unit.questions.length !== rows.length) continue;
  unit.questions.forEach((q,i) => {
   const r=rows[i]; q.question=r.prompt || q.question.replace(/^E\d\s*[—-]\s*/, "");
   q.answer=r.answer; q.hint=r.hint; q.summary=`${r.answer} ${r.hint}`;
   q.alignment.method=r.hint;
  });
 }
})();
