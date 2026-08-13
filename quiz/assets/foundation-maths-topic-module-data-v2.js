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
