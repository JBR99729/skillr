"use strict";
(() => {
  const LEVELS=["easy","easy","core","core","core","application","application","challenge"];
  const Q=(year,skill,set,pos,type,question,extra={})=>({
    id:`s-${year}-${skill}-s${set+1}-q${pos+1}`,
    year,subject:"science",skill,set,difficulty:LEVELS[pos],type,question,...extra
  });
  const contexts=[
    "During a class discussion","While reviewing the topic","In a science notebook","During a practical lesson",
    "When checking a model","In a short investigation","While interpreting evidence","During revision",
    "When explaining the idea","In a classroom example","While comparing observations","When checking a claim",
    "During a group discussion","When reading a result","In a science quiz","When making a conclusion",
    "While using scientific vocabulary","When evaluating an explanation","During a demonstration","When analysing a pattern",
    "While checking understanding","When discussing evidence","During independent practice","When explaining to a classmate",
    "While preparing for a test"
  ];
  const support=(year,skill)=>window.SkillrScienceQuickRead?.[year]?.[skill];

  function neg(fact){
    if(fact.startsWith("A ")) return "It is not correct that " + fact.charAt(0).toLowerCase()+fact.slice(1);
    return "It is not correct that " + fact.charAt(0).toLowerCase()+fact.slice(1);
  }

  function setQuestions(year,skill,set,s){
    const facts=s.facts,kv=s.keywords,nf=facts.length,nk=kv.length;
    const f=i=>facts[(2*set+i)%nf], k=i=>kv[(2*set+i)%nk], ctx=contexts[set%contexts.length];
    const k0=k(0),k1=k(1),k2=k(2),k3=k(3),k4=k(4);
    const f0=f(0),f1=f(1),f2=f(2),f3=f(3),f4=f(4);
    const falseText=neg(f2);
    return [
      Q(year,skill,set,0,"single",`${ctx}, which term means "${k0[1]}"?`,{answers:[k0[0],k1[0],k2[0]],correct:0,explanation:`${k0[0]} means ${k0[1]}.`}),
      Q(year,skill,set,1,"single",`${ctx}, which scientific statement is correct?`,{answers:[f1,neg(f3),neg(f4)],correct:0,explanation:f1}),
      Q(year,skill,set,2,"true-false",set%2===0?f2:falseText,{answers:["True","False"],correct:set%2===0?0:1,explanation:set%2===0?f2:`The accurate statement is: ${f2}`}),
      Q(year,skill,set,3,"text",`${ctx}, type the science term for: ${k3[1]}.`,{correct:k3[0],acceptedAnswers:[k3[0]],explanation:`The term is ${k3[0]}.`}),
      Q(year,skill,set,4,"fill-blank","Complete the science vocabulary statement.",{template:`{{blank}} means ${k4[1]}.`,acceptedAnswers:[k4[0]],explanation:`The missing term is ${k4[0]}.`}),
      Q(year,skill,set,5,"single",`${ctx}, which statement is best supported by the Quick Read?`,{answers:[f0,neg(f1),neg(f2)],correct:0,explanation:f0}),
      Q(year,skill,set,6,"multiple","Select the two scientifically correct statements.",{answers:[f3,neg(f0),f4,neg(f2)],correct:[0,2],explanation:`Correct: ${f3} ${f4}`}),
      Q(year,skill,set,7,"single",`A student rejects this accurate idea: "${f4}" Which response best corrects the student?`,{answers:[f4,neg(f4),`The idea cannot be evaluated using science vocabulary.`],correct:0,explanation:f4})
    ];
  }

  function generate(year,skill){
    year=String(year);
    const s=support(year,skill);
    if(!s) return [];
    const out=[];
    for(let set=0;set<25;set++) out.push(...setQuestions(year,skill,set,s));
    return out;
  }

  window.SkillrDailyScience={generate,questionsPerTopic:200,setsPerTopic:25};


  const extensions = window.SkillrDailyQuestionExtensions = window.SkillrDailyQuestionExtensions || {};
  extensions.F = extensions.F || {};
  extensions.F.science = extensions.F.science || {};
  extensions.F.science["scientific-inquiry"] = [
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence is an observation from the scene?",
    "explanation": "An observation states what can be noticed in the scene.",
    "printable": true,
    "type": "single",
    "answers": [
      "A snail is beside a leaf",
      "The snail is hungry",
      "The leaf likes the snail",
      "It will rain tomorrow"
    ],
    "correct": 0,
    "visual": "🐌   🌿",
    "id": "daily-f-science-scientific-inquiry-001",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence is a question?",
    "explanation": "A question asks for information and ends with a question mark.",
    "printable": true,
    "type": "single",
    "answers": [
      "Why does the leaf have holes?",
      "The leaf has three holes",
      "The leaf is green",
      "A leaf is on the ground"
    ],
    "correct": 0,
    "visual": "🌿  • • •",
    "id": "daily-f-science-scientific-inquiry-002",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which question could be answered by watching the snail for a few minutes?",
    "explanation": "Movement direction can be observed.",
    "printable": true,
    "type": "single",
    "answers": [
      "Which direction does the snail move?",
      "What is the snail thinking?",
      "Is the snail the nicest animal?",
      "Who gave the snail its name?"
    ],
    "correct": 0,
    "visual": "🐌  →  🌿",
    "id": "daily-f-science-scientific-inquiry-003",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sense helps you notice a frog call?",
    "explanation": "We use hearing to notice sounds.",
    "printable": true,
    "type": "single",
    "answers": [
      "hearing",
      "sight",
      "touch",
      "taste"
    ],
    "correct": 0,
    "visual": "🐸  ♪",
    "id": "daily-f-science-scientific-inquiry-004",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which tool helps you see tiny lines on a leaf more clearly?",
    "explanation": "A magnifying glass makes small details easier to see.",
    "printable": true,
    "type": "single",
    "answers": [
      "magnifying glass",
      "ruler",
      "earmuffs",
      "watering can"
    ],
    "correct": 0,
    "visual": "🌿  🔍",
    "id": "daily-f-science-scientific-inquiry-005",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "A seedling is observed every Monday. Which record best shows how it changes?",
    "explanation": "Dated drawings show appearance at different times.",
    "printable": true,
    "type": "single",
    "answers": [
      "dated drawings",
      "one undated guess",
      "a list of favourite plants",
      "a story about a giant tree"
    ],
    "correct": 0,
    "visual": "Mon 🌱  →  Mon 🌿",
    "id": "daily-f-science-scientific-inquiry-006",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence is an inference rather than a direct observation?",
    "explanation": "Looking for food is an interpretation; the other features can be seen.",
    "printable": true,
    "type": "single",
    "answers": [
      "The beetle is looking for food",
      "The beetle has six legs",
      "The beetle is black",
      "The beetle is on a rock"
    ],
    "correct": 0,
    "visual": "🪲  🪨",
    "id": "daily-f-science-scientific-inquiry-007",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "A photograph shows a snail beside lettuce. What can the photograph prove?",
    "explanation": "A photograph proves position, not feelings or unseen events.",
    "printable": true,
    "type": "single",
    "answers": [
      "The snail is beside lettuce",
      "The snail likes lettuce",
      "The snail is hungry",
      "The snail ate the whole leaf"
    ],
    "correct": 0,
    "visual": "🐌  🥬",
    "id": "daily-f-science-scientific-inquiry-008",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "What changed from Day 1 to Day 3?",
    "explanation": "The later drawing shows greater height.",
    "printable": true,
    "type": "single",
    "answers": [
      "The seedling became taller",
      "The seedling became shorter",
      "The pot disappeared",
      "Nothing changed"
    ],
    "correct": 0,
    "visual": "Day 1: 🌱\nDay 3: 🌿",
    "id": "daily-f-science-scientific-inquiry-009",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "What pattern is shown in the bird counts?",
    "explanation": "The counts are 2, 3 and 4.",
    "printable": true,
    "type": "single",
    "answers": [
      "The count increases by one each day",
      "The count decreases by one",
      "The count stays the same",
      "The counts are colours"
    ],
    "correct": 0,
    "visual": "Mon 2 | Tue 3 | Wed 4",
    "id": "daily-f-science-scientific-inquiry-010",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "A gardener notices drooping leaves and dry soil. How can the observations help?",
    "explanation": "Observations can guide a sensible next check.",
    "printable": true,
    "type": "single",
    "answers": [
      "They can guide the gardener to check whether the plant needs water",
      "They prove every plant is sick",
      "They show the plant dislikes gardens",
      "They mean no more observations are needed"
    ],
    "correct": 0,
    "visual": "🌿↘️   soil: dry",
    "id": "daily-f-science-scientific-inquiry-011",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which statement uses the tally as evidence?",
    "explanation": "The tally supports a comparison of recorded visits.",
    "printable": true,
    "type": "single",
    "answers": [
      "More bees visited the yellow flowers than the white flowers",
      "Yellow is everyone's favourite colour",
      "Bees never visit white flowers",
      "The yellow flowers are happiest"
    ],
    "correct": 0,
    "visual": "yellow: |||||\nwhite: ||",
    "id": "daily-f-science-scientific-inquiry-012",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Two children compare plant height. What makes the comparison fair?",
    "explanation": "The same starting point and tool make the comparison fair.",
    "printable": true,
    "type": "single",
    "answers": [
      "Measure both plants from the soil using the same ruler",
      "Measure one from the pot and one from the soil",
      "Use a ruler for only one plant",
      "Compare leaf colour instead of height"
    ],
    "correct": 0,
    "visual": "🌱📏   🌿📏",
    "id": "daily-f-science-scientific-inquiry-013",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Lee says, 'A good observation includes what I think happened.' What corrects Lee?",
    "explanation": "Observations and interpretations should be distinguished.",
    "printable": true,
    "type": "single",
    "answers": [
      "Record what you notice first; label guesses separately",
      "Every guess is an observation",
      "Only feelings should be recorded",
      "Observations never use senses"
    ],
    "correct": 0,
    "id": "daily-f-science-scientific-inquiry-014",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence tells only what can be seen?",
    "explanation": "The bird's position can be seen directly.",
    "printable": true,
    "type": "single",
    "answers": [
      "A bird is standing on the branch",
      "The bird is worried",
      "The branch is the bird's home",
      "The bird will sing soon"
    ],
    "correct": 0,
    "visual": "🐦\n──── 🌳",
    "id": "daily-f-science-scientific-inquiry-015",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence asks something we could find out?",
    "explanation": "The question asks for a count that can be observed.",
    "printable": true,
    "type": "single",
    "answers": [
      "How many birds visit the feeder?",
      "Two birds are at the feeder",
      "The feeder is red",
      "Birds have feathers"
    ],
    "correct": 0,
    "visual": "🐦 🐦  🏠",
    "id": "daily-f-science-scientific-inquiry-016",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence is a science question?",
    "explanation": "The question asks something that can be investigated.",
    "printable": true,
    "type": "single",
    "answers": [
      "Which ball rolls farther down the ramp?",
      "The ball is red",
      "The ramp is long",
      "I like the round ball"
    ],
    "correct": 0,
    "visual": "⚽  /",
    "id": "daily-f-science-scientific-inquiry-017",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "The class has a ball and a block at the top of a ramp. Which is the clearest question?",
    "explanation": "The focused question names the objects and an observable outcome.",
    "printable": true,
    "type": "single",
    "answers": [
      "Which object reaches the bottom first?",
      "What happens to everything?",
      "Are ramps fun?",
      "Why are shapes different?"
    ],
    "correct": 0,
    "visual": "⚽ ▪️  /",
    "id": "daily-f-science-scientific-inquiry-018",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which result would answer 'Which ball rolls farther?'",
    "explanation": "Travel distance directly answers the question.",
    "printable": true,
    "type": "single",
    "answers": [
      "the distance each ball travels",
      "the colour of each ball",
      "the name of each child",
      "the sound of the classroom bell"
    ],
    "correct": 0,
    "visual": "⚽ ───── | 🏀 ───",
    "id": "daily-f-science-scientific-inquiry-019",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Before releasing the objects, which sentence is a prediction?",
    "explanation": "A prediction states what is expected before observing the result.",
    "printable": true,
    "type": "single",
    "answers": [
      "I think the ball will reach the bottom first",
      "The ball reached the bottom first",
      "The ramp is made of wood",
      "We used two objects"
    ],
    "correct": 0,
    "visual": "⚽ ▪️  /",
    "id": "daily-f-science-scientific-inquiry-020",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence is an observation made after the test?",
    "explanation": "The sentence reports what happened.",
    "printable": true,
    "type": "single",
    "answers": [
      "The rubber ball bounced higher",
      "I think the rubber ball will bounce higher",
      "The rubber ball might win",
      "I hope the ball bounces"
    ],
    "correct": 0,
    "visual": "🔵 ↑↑ | 🟤 ↑",
    "id": "daily-f-science-scientific-inquiry-021",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which reason best supports 'The ball will roll farther than the block'?",
    "explanation": "The reason connects the prediction to prior experience.",
    "printable": true,
    "type": "single",
    "answers": [
      "I have seen round objects roll easily",
      "The ball is my favourite",
      "I chose the ball first",
      "Round is a short word"
    ],
    "correct": 0,
    "visual": "⚽  ▪️",
    "id": "daily-f-science-scientific-inquiry-022",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Question: Which object rolls farther? Which prediction answers it?",
    "explanation": "The prediction directly compares rolling distance.",
    "printable": true,
    "type": "single",
    "answers": [
      "I think the ball will roll farther than the block",
      "I think the ball is red",
      "I predict the ramp is wooden",
      "I think we will use two objects"
    ],
    "correct": 0,
    "visual": "⚽ ▪️ /",
    "id": "daily-f-science-scientific-inquiry-023",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which question is clearer than 'What happens?'",
    "explanation": "The improved question names what will be measured and compared.",
    "printable": true,
    "type": "single",
    "answers": [
      "How far does each toy car travel down the ramp?",
      "Is science good?",
      "Why are toys toys?",
      "What colour do I like?"
    ],
    "correct": 0,
    "visual": "🚗 /",
    "id": "daily-f-science-scientific-inquiry-024",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which prediction is clearer than 'The ball will be better'?",
    "explanation": "The clear prediction states a testable outcome.",
    "printable": true,
    "type": "single",
    "answers": [
      "The ball will travel farther than the block",
      "The ball is good",
      "The ball is round",
      "The block is not my favourite"
    ],
    "correct": 0,
    "visual": "⚽ ▪️",
    "id": "daily-f-science-scientific-inquiry-025",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "What evidence checks the prediction 'The ball will roll farther'?",
    "explanation": "Distance measurements test the rolling prediction.",
    "printable": true,
    "type": "single",
    "answers": [
      "measure the distance travelled by both objects",
      "compare their colours",
      "ask which object children like",
      "count letters in their names"
    ],
    "correct": 0,
    "visual": "⚽ ─── | ▪️ ─",
    "id": "daily-f-science-scientific-inquiry-026",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Put the investigation steps in order.",
    "explanation": "A question comes first, then a prediction, then observation.",
    "printable": true,
    "type": "order",
    "items": [
      "Observe the result",
      "Ask a question",
      "Make a prediction"
    ],
    "correct": [
      "Ask a question",
      "Make a prediction",
      "Observe the result"
    ],
    "instruction": "Use the arrows to put the cards in order.",
    "id": "daily-f-science-scientific-inquiry-027",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "The cars have already stopped. Is 'The blue car will travel farther' still a prediction for that completed test?",
    "explanation": "A prediction must be made before seeing the result.",
    "printable": true,
    "type": "single",
    "answers": [
      "No, the result has already happened",
      "Yes, any future-tense sentence is always a prediction",
      "Yes, because blue cars always win",
      "No, because cars cannot be investigated"
    ],
    "correct": 0,
    "visual": "🚗──   🚙────",
    "id": "daily-f-science-scientific-inquiry-028",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which reason is most useful?",
    "explanation": "The reason is relevant and based on prior observation.",
    "printable": true,
    "type": "single",
    "answers": [
      "I predict the smooth ramp will let the car travel farther because similar cars moved farther on smooth surfaces before",
      "I chose smooth because I like it",
      "Smooth has fewer letters",
      "My friend said smooth"
    ],
    "correct": 0,
    "visual": "🚗 smooth | rough",
    "id": "daily-f-science-scientific-inquiry-029",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Sam says predictions must always be correct. What is true?",
    "explanation": "A useful prediction can be checked, even when it is not supported.",
    "printable": true,
    "type": "single",
    "answers": [
      "A prediction is an expected result that evidence may support or not support",
      "A wrong prediction ruins the investigation",
      "Predictions are answers copied after the test",
      "Only adults may predict"
    ],
    "correct": 0,
    "id": "daily-f-science-scientific-inquiry-030",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sentence asks something we can find out?",
    "explanation": "The question compares an observable result.",
    "printable": true,
    "type": "single",
    "answers": [
      "Which fabric absorbs more water?",
      "The fabric is blue",
      "Water is wet",
      "This fabric is pretty"
    ],
    "correct": 0,
    "visual": "▦ 💧 ▦",
    "id": "daily-f-science-scientific-inquiry-031",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Two paper towels are tested with the same amount of water. Which question is focused?",
    "explanation": "The question names what will be compared.",
    "printable": true,
    "type": "single",
    "answers": [
      "Which towel absorbs more water?",
      "What is paper?",
      "Which towel looks nicest?",
      "Why do people clean?"
    ],
    "correct": 0,
    "visual": "▤ 💧 ▤",
    "id": "daily-f-science-scientific-inquiry-032",
    "year": "F",
    "subject": "science",
    "set": 3,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which child is investigating safely?",
    "explanation": "Following instructions and using protection supports safety.",
    "printable": true,
    "type": "single",
    "answers": [
      "The child wears goggles and follows the teacher's instruction",
      "The child tastes an unknown liquid",
      "The child runs while carrying glass",
      "The child touches a hot plate"
    ],
    "correct": 0,
    "visual": "🥽  ✅",
    "id": "daily-f-science-scientific-inquiry-033",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sense notices a bird call?",
    "explanation": "Hearing detects sound.",
    "printable": true,
    "type": "single",
    "answers": [
      "hearing",
      "taste",
      "touch",
      "sight only"
    ],
    "correct": 0,
    "visual": "🐦 ♪  👂",
    "id": "daily-f-science-scientific-inquiry-034",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "An unlabelled liquid is on the teacher's table. Which sense must not be used?",
    "explanation": "Never taste an unknown substance.",
    "printable": true,
    "type": "single",
    "answers": [
      "taste",
      "sight from a safe distance",
      "hearing",
      "smell only if the teacher directs"
    ],
    "correct": 0,
    "visual": "❓🥤  👅🚫",
    "id": "daily-f-science-scientific-inquiry-035",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which tool lets you view tiny leaf details safely?",
    "explanation": "A magnifying glass supports close visual observation.",
    "printable": true,
    "type": "single",
    "answers": [
      "magnifying glass",
      "kitchen knife",
      "open flame",
      "unknown liquid"
    ],
    "correct": 0,
    "visual": "🌿 🔍",
    "id": "daily-f-science-scientific-inquiry-036",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Put the steps in a safe order.",
    "explanation": "Listen first, prepare protection, then begin.",
    "printable": true,
    "type": "order",
    "items": [
      "Begin observing",
      "Listen to the teacher's instruction",
      "Put on the required goggles"
    ],
    "correct": [
      "Listen to the teacher's instruction",
      "Put on the required goggles",
      "Begin observing"
    ],
    "instruction": "Use the arrows to put the cards in order.",
    "id": "daily-f-science-scientific-inquiry-037",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "How should you observe a butterfly on a flower?",
    "explanation": "Quiet distant observation avoids harming or disturbing it.",
    "printable": true,
    "type": "single",
    "answers": [
      "Watch quietly from a short distance",
      "Grab its wings",
      "Shake the flower",
      "Block it from leaving"
    ],
    "correct": 0,
    "visual": "🦋 🌼   👀",
    "id": "daily-f-science-scientific-inquiry-038",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "A container is labelled 'Teacher use only'. What should a child do?",
    "explanation": "The label sets a clear adult-supervision rule.",
    "printable": true,
    "type": "single",
    "answers": [
      "Wait for the teacher and observe only as directed",
      "Open it secretly",
      "Taste the contents",
      "Pour it into another cup"
    ],
    "correct": 0,
    "visual": "TEACHER ONLY",
    "id": "daily-f-science-scientific-inquiry-039",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "A rope marks the safe viewing area. Where should the class stand?",
    "explanation": "The rope marks the safe boundary.",
    "printable": true,
    "type": "single",
    "answers": [
      "behind the rope",
      "inside the animal area",
      "on the rope while jumping",
      "wherever gives the closest touch"
    ],
    "correct": 0,
    "visual": "children | rope ─ | habitat",
    "id": "daily-f-science-scientific-inquiry-040",
    "year": "F",
    "subject": "science",
    "set": 4,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which record can be made without disturbing the snail?",
    "explanation": "A drawing records the observation without handling the animal.",
    "printable": true,
    "type": "single",
    "answers": [
      "a drawing from where you are standing",
      "moving the snail onto your hand",
      "scraping its shell",
      "taking the snail home"
    ],
    "correct": 0,
    "visual": "🐌  ✏️",
    "id": "daily-f-science-scientific-inquiry-041",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which plan safely compares two sealed texture boards?",
    "explanation": "Gentle approved touch is suitable for texture comparison.",
    "printable": true,
    "type": "single",
    "answers": [
      "Touch each approved surface gently with one finger",
      "taste the surfaces",
      "scratch them with scissors",
      "remove material from the boards"
    ],
    "correct": 0,
    "visual": "▦  ✋  ▤",
    "id": "daily-f-science-scientific-inquiry-042",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Select the two hazards in the scene.",
    "explanation": "Liquids near electricity and blocked walkways are hazards.",
    "printable": true,
    "type": "multiple",
    "answers": [
      "an open drink beside electrical equipment",
      "a bag blocking the walkway",
      "goggles stored in a tray",
      "a teacher reading instructions"
    ],
    "correct": [
      0,
      1
    ],
    "visual": "🥤 ⚡   🎒 in path",
    "id": "daily-f-science-scientific-inquiry-043",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "A child wants to smell an unknown liquid closely. What is the safe correction?",
    "explanation": "Unknown liquids should remain closed until an adult directs the observation.",
    "printable": true,
    "type": "single",
    "answers": [
      "Keep it closed and ask the teacher",
      "Smell it faster",
      "Ask a friend to taste it",
      "Pour it onto the table"
    ],
    "correct": 0,
    "visual": "jar ❓",
    "id": "daily-f-science-scientific-inquiry-044",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which action protects both the child and the frog?",
    "explanation": "Staying at the edge avoids water danger and disturbance.",
    "printable": true,
    "type": "single",
    "answers": [
      "Watch the frog from the edge without entering the pond",
      "Step into deep water",
      "pick up the frog",
      "throw stones near it"
    ],
    "correct": 0,
    "visual": "child | pond 🐸",
    "id": "daily-f-science-scientific-inquiry-045",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Kai says, 'If it is natural, it is safe to taste.' What is true?",
    "explanation": "Natural does not mean safe.",
    "printable": true,
    "type": "single",
    "answers": [
      "Natural things can still be unsafe; never taste without clear adult instruction",
      "All natural things are food",
      "Tiny tastes are always safe",
      "Only colours matter"
    ],
    "correct": 0,
    "visual": "🍄 🌿 👅🚫",
    "id": "daily-f-science-scientific-inquiry-046",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which action is safe during a garden observation?",
    "explanation": "Staying on the path protects children and living things.",
    "printable": true,
    "type": "single",
    "answers": [
      "Stay on the path and look carefully",
      "Pull up every plant",
      "Chase animals into a corner",
      "Taste unknown berries"
    ],
    "correct": 0,
    "visual": "path ── 🌿 🐞",
    "id": "daily-f-science-scientific-inquiry-047",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "scientific-inquiry",
    "question": "Which sense notices that a flower is yellow?",
    "explanation": "Sight detects colour.",
    "printable": true,
    "type": "single",
    "answers": [
      "sight",
      "hearing",
      "taste",
      "touch only"
    ],
    "correct": 0,
    "visual": "🌼  👁️",
    "id": "daily-f-science-scientific-inquiry-048",
    "year": "F",
    "subject": "science",
    "set": 5,
    "learningArea": "AC9SFI02"
  }
];
  extensions.F.science["science-vocabulary"] = [
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "A photograph shows a snail beside lettuce. What can the photograph prove?",
    "explanation": "A photograph proves position, not feelings or unseen events.",
    "printable": true,
    "type": "single",
    "answers": [
      "The snail is beside lettuce",
      "The snail likes lettuce",
      "The snail is hungry",
      "The snail ate the whole leaf"
    ],
    "correct": 0,
    "visual": "🐌  🥬",
    "id": "daily-f-science-science-vocabulary-001",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "A seedling is observed every Monday. Which record best shows how it changes?",
    "explanation": "Dated drawings show appearance at different times.",
    "printable": true,
    "type": "single",
    "answers": [
      "dated drawings",
      "one undated guess",
      "a list of favourite plants",
      "a story about a giant tree"
    ],
    "correct": 0,
    "visual": "Mon 🌱  →  Mon 🌿",
    "id": "daily-f-science-science-vocabulary-002",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Lee says, 'A good observation includes what I think happened.' What corrects Lee?",
    "explanation": "Observations and interpretations should be distinguished.",
    "printable": true,
    "type": "single",
    "answers": [
      "Record what you notice first; label guesses separately",
      "Every guess is an observation",
      "Only feelings should be recorded",
      "Observations never use senses"
    ],
    "correct": 0,
    "id": "daily-f-science-science-vocabulary-003",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which sense helps you notice a frog call?",
    "explanation": "We use hearing to notice sounds.",
    "printable": true,
    "type": "single",
    "answers": [
      "hearing",
      "sight",
      "touch",
      "taste"
    ],
    "correct": 0,
    "visual": "🐸  ♪",
    "id": "daily-f-science-science-vocabulary-004",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Two children compare plant height. What makes the comparison fair?",
    "explanation": "The same starting point and tool make the comparison fair.",
    "printable": true,
    "type": "single",
    "answers": [
      "Measure both plants from the soil using the same ruler",
      "Measure one from the pot and one from the soil",
      "Use a ruler for only one plant",
      "Compare leaf colour instead of height"
    ],
    "correct": 0,
    "visual": "🌱📏   🌿📏",
    "id": "daily-f-science-science-vocabulary-005",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which tool helps you see tiny lines on a leaf more clearly?",
    "explanation": "A magnifying glass makes small details easier to see.",
    "printable": true,
    "type": "single",
    "answers": [
      "magnifying glass",
      "ruler",
      "earmuffs",
      "watering can"
    ],
    "correct": 0,
    "visual": "🌿  🔍",
    "id": "daily-f-science-science-vocabulary-006",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which sentence is an inference rather than a direct observation?",
    "explanation": "Looking for food is an interpretation; the other features can be seen.",
    "printable": true,
    "type": "single",
    "answers": [
      "The beetle is looking for food",
      "The beetle has six legs",
      "The beetle is black",
      "The beetle is on a rock"
    ],
    "correct": 0,
    "visual": "🪲  🪨",
    "id": "daily-f-science-science-vocabulary-007",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "What evidence checks the prediction 'The ball will roll farther'?",
    "explanation": "Distance measurements test the rolling prediction.",
    "printable": true,
    "type": "single",
    "answers": [
      "measure the distance travelled by both objects",
      "compare their colours",
      "ask which object children like",
      "count letters in their names"
    ],
    "correct": 0,
    "visual": "⚽ ─── | ▪️ ─",
    "id": "daily-f-science-science-vocabulary-008",
    "year": "F",
    "subject": "science",
    "set": 0,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which sentence is a science question?",
    "explanation": "The question asks something that can be investigated.",
    "printable": true,
    "type": "single",
    "answers": [
      "Which ball rolls farther down the ramp?",
      "The ball is red",
      "The ramp is long",
      "I like the round ball"
    ],
    "correct": 0,
    "visual": "⚽  /",
    "id": "daily-f-science-science-vocabulary-009",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Sam says predictions must always be correct. What is true?",
    "explanation": "A useful prediction can be checked, even when it is not supported.",
    "printable": true,
    "type": "single",
    "answers": [
      "A prediction is an expected result that evidence may support or not support",
      "A wrong prediction ruins the investigation",
      "Predictions are answers copied after the test",
      "Only adults may predict"
    ],
    "correct": 0,
    "id": "daily-f-science-science-vocabulary-010",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Before releasing the objects, which sentence is a prediction?",
    "explanation": "A prediction states what is expected before observing the result.",
    "printable": true,
    "type": "single",
    "answers": [
      "I think the ball will reach the bottom first",
      "The ball reached the bottom first",
      "The ramp is made of wood",
      "We used two objects"
    ],
    "correct": 0,
    "visual": "⚽ ▪️  /",
    "id": "daily-f-science-science-vocabulary-011",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which sentence is an observation made after the test?",
    "explanation": "The sentence reports what happened.",
    "printable": true,
    "type": "single",
    "answers": [
      "The rubber ball bounced higher",
      "I think the rubber ball will bounce higher",
      "The rubber ball might win",
      "I hope the ball bounces"
    ],
    "correct": 0,
    "visual": "🔵 ↑↑ | 🟤 ↑",
    "id": "daily-f-science-science-vocabulary-012",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which reason best supports 'The ball will roll farther than the block'?",
    "explanation": "The reason connects the prediction to prior experience.",
    "printable": true,
    "type": "single",
    "answers": [
      "I have seen round objects roll easily",
      "The ball is my favourite",
      "I chose the ball first",
      "Round is a short word"
    ],
    "correct": 0,
    "visual": "⚽  ▪️",
    "id": "daily-f-science-science-vocabulary-013",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI01"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which sense notices a bird call?",
    "explanation": "Hearing detects sound.",
    "printable": true,
    "type": "single",
    "answers": [
      "hearing",
      "taste",
      "touch",
      "sight only"
    ],
    "correct": 0,
    "visual": "🐦 ♪  👂",
    "id": "daily-f-science-science-vocabulary-014",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which plan safely compares two sealed texture boards?",
    "explanation": "Gentle approved touch is suitable for texture comparison.",
    "printable": true,
    "type": "single",
    "answers": [
      "Touch each approved surface gently with one finger",
      "taste the surfaces",
      "scratch them with scissors",
      "remove material from the boards"
    ],
    "correct": 0,
    "visual": "▦  ✋  ▤",
    "id": "daily-f-science-science-vocabulary-015",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which tool lets you view tiny leaf details safely?",
    "explanation": "A magnifying glass supports close visual observation.",
    "printable": true,
    "type": "single",
    "answers": [
      "magnifying glass",
      "kitchen knife",
      "open flame",
      "unknown liquid"
    ],
    "correct": 0,
    "visual": "🌿 🔍",
    "id": "daily-f-science-science-vocabulary-016",
    "year": "F",
    "subject": "science",
    "set": 1,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Kai says, 'If it is natural, it is safe to taste.' What is true?",
    "explanation": "Natural does not mean safe.",
    "printable": true,
    "type": "single",
    "answers": [
      "Natural things can still be unsafe; never taste without clear adult instruction",
      "All natural things are food",
      "Tiny tastes are always safe",
      "Only colours matter"
    ],
    "correct": 0,
    "visual": "🍄 🌿 👅🚫",
    "id": "daily-f-science-science-vocabulary-017",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "An unlabelled liquid is on the teacher's table. Which sense must not be used?",
    "explanation": "Never taste an unknown substance.",
    "printable": true,
    "type": "single",
    "answers": [
      "taste",
      "sight from a safe distance",
      "hearing",
      "smell only if the teacher directs"
    ],
    "correct": 0,
    "visual": "❓🥤  👅🚫",
    "id": "daily-f-science-science-vocabulary-018",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "A container is labelled 'Teacher use only'. What should a child do?",
    "explanation": "The label sets a clear adult-supervision rule.",
    "printable": true,
    "type": "single",
    "answers": [
      "Wait for the teacher and observe only as directed",
      "Open it secretly",
      "Taste the contents",
      "Pour it into another cup"
    ],
    "correct": 0,
    "visual": "TEACHER ONLY",
    "id": "daily-f-science-science-vocabulary-019",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFI02",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "A rope marks the safe viewing area. Where should the class stand?",
    "explanation": "The rope marks the safe boundary.",
    "printable": true,
    "type": "single",
    "answers": [
      "behind the rope",
      "inside the animal area",
      "on the rope while jumping",
      "wherever gives the closest touch"
    ],
    "correct": 0,
    "visual": "children | rope ─ | habitat",
    "id": "daily-f-science-science-vocabulary-020",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFI02"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which sense helps you notice that tree bark is rough?",
    "explanation": "Approved touch can help describe texture.",
    "printable": true,
    "type": "single",
    "answers": [
      "touch",
      "hearing",
      "sight only",
      "taste"
    ],
    "correct": 0,
    "visual": "🌳  ✋",
    "id": "daily-f-science-science-vocabulary-021",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which tool helps you watch a bird high in a tree from the ground?",
    "explanation": "Binoculars help us see distant objects safely.",
    "printable": true,
    "type": "single",
    "answers": [
      "binoculars",
      "spoon",
      "thermometer",
      "paintbrush"
    ],
    "correct": 0,
    "visual": "🐦  🌳  🔭",
    "id": "daily-f-science-science-vocabulary-022",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "The class counts birds at a feeder. Which record is most useful?",
    "explanation": "Tallies keep track of repeated counts.",
    "printable": true,
    "type": "single",
    "answers": [
      "a tally for each bird",
      "a drawing with no counts",
      "a list of bird names from a book",
      "a vote for the prettiest bird"
    ],
    "correct": 0,
    "visual": "Birds: |||| |",
    "id": "daily-f-science-science-vocabulary-023",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFH01"
  },
  {
    "curriculumCode": "AC9SFH01",
    "bank": "daily-drill",
    "skill": "science-vocabulary",
    "question": "Which statement is an opinion?",
    "explanation": "'Prettiest' depends on personal preference.",
    "printable": true,
    "type": "single",
    "answers": [
      "This is the prettiest shell",
      "The shell has stripes",
      "The shell is beside sand",
      "The shell is curved"
    ],
    "correct": 0,
    "visual": "🐚 〰️",
    "id": "daily-f-science-science-vocabulary-024",
    "year": "F",
    "subject": "science",
    "set": 2,
    "learningArea": "AC9SFH01"
  }
];
})();
