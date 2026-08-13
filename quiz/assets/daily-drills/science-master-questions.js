"use strict";
(() => {
  const LEVELS=["easy","easy","core","core","core","application","application","challenge"];
  const Q=(year,skill,set,pos,type,question,extra={})=>{
    const item={
      id:`s-${year}-${skill}-s${set+1}-q${pos+1}`,
      year,subject:"science",skill,set,difficulty:LEVELS[pos],type,question,...extra
    };
    item.audioPrompt=item.audioPrompt||question;
    const early=year==="F"||Number(year)<=2;
    item.hint=item.hint||({
      single:early?"Look for what could be observed or tested.":"Compare each choice with the evidence or model in the question.",
      "true-false":early?"Check the whole sentence against what you know or can observe.":"Test every part of the claim against the scientific evidence.",
      text:early?"Use the science word that names this idea.":"Use the precise science term from this topic.",
      "fill-blank":early?"Read the completed sentence and check that it makes sense.":"Read the completed claim and check that it is scientifically accurate.",
      multiple:early?"Check each sentence because two match the science idea.":"Evaluate each claim separately because two are supported."
    }[type]||(early?"Use what you can observe and what you know.":"Use the evidence and scientific ideas in the question."));
    if(type==="single"&&Array.isArray(item.answers)&&item.answers.length===3&&Number.isInteger(item.correct)){
      const target=(set*8+pos)%3;
      const shift=(item.correct-target+3)%3;
      item.answers=[...item.answers.slice(shift),...item.answers.slice(0,shift)];
      item.correct=target;
    }
    return item;
  };
  const contexts=[
    "A class records observations from a demonstration","A student labels a diagram for a classroom display",
    "A group compares two possible explanations","A student checks a prediction against a result",
    "A class evaluates a model","A group plans a short investigation","A student interprets a table of evidence",
    "A class compares what changed and what stayed the same","A student explains an observation to a partner",
    "A group sorts evidence into useful and irrelevant notes","A student compares two recorded observations",
    "A class checks whether a claim is supported","A group prepares a science poster","A student reads an unexpected result",
    "A class checks the accuracy of a museum label","A group writes a conclusion from its observations",
    "A student chooses precise words for a report","A class evaluates an explanation against evidence",
    "A group watches a teacher demonstration","A student analyses a repeated pattern in results",
    "A class checks whether a test was fair","A group discusses which evidence is strongest",
    "A student revises an inaccurate notebook entry","A class explains a model to younger students",
    "A group checks a claim before presenting it"
  ];
  const earlyContexts=[
    "A class watches a demonstration","A student labels a picture","A group talks about what it noticed",
    "A student checks a prediction","A class looks closely at a model","A group tries a simple test",
    "A student reads a results chart","A class compares before and after","A student explains an observation",
    "A group sorts its observation cards","A student compares two objects","A class checks an idea",
    "A group makes a science poster","A student notices a surprising result","A class fixes a display label",
    "A group writes what it found","A student chooses the clearest science word","A class checks an explanation",
    "A group watches what happens","A student looks for a pattern","A class checks that a test is fair",
    "A group chooses its best observation","A student fixes a notebook sentence","A class explains a model",
    "A group checks its answer"
  ];
  const support=(year,skill)=>window.SkillrScienceQuickRead?.[year]?.[skill];

  function misconception(fact,variant=0){
    const swaps=[
      [/\bincrease(s|d)?\b/i,"decrease$1"],[/\bdecrease(s|d)?\b/i,"increase$1"],
      [/\bfaster\b/i,"slower"],[/\bslower\b/i,"faster"],[/\bmore\b/i,"less"],[/\bless\b/i,"more"],
      [/\bwarmer\b/i,"cooler"],[/\bcooler\b/i,"warmer"],[/\babsorbs?\b/i,"reflects"],[/\breflects?\b/i,"absorbs"],
      [/\bbalanced\b/i,"unbalanced"],[/\bunbalanced\b/i,"balanced"],
      [/\bphysical\b/i,"chemical"],[/\bchemical\b/i,"physical"],
      [/\bsame\b/i,"different"],[/\bdifferent\b/i,"the same"],[/\bsolid\b/i,"gas"],[/\bgas\b/i,"solid"],
      [/\battract(s|ed)?\b/i,"repel$1"],[/\brepel(s|led)?\b/i,"attract$1"]
    ];
    for(let i=0;i<swaps.length;i+=1){
      const [pattern,replacement]=swaps[(i+variant)%swaps.length];
      if(pattern.test(fact)) return fact.replace(pattern,replacement);
    }
    const grammaticalNegations=[
      [/\bcannot\b/i,"can"],[/\bcan\b/i,"cannot"],[/\bshould\b/i,"should not"],[/\bmust\b/i,"must not"],
      [/\bare\b/i,"are not"],[/\bis\b/i,"is not"],[/\bwere\b/i,"were not"],[/\bwas\b/i,"was not"],
      [/\bhas\b/i,"does not have"],[/\bhave\b/i,"do not have"],
      [/\bhelps\b/i,"does not help"],[/\bhelp\b/i,"do not help"],
      [/\bneeds\b/i,"does not need"],[/\bneed\b/i,"do not need"],
      [/\bshows\b/i,"does not show"],[/\bshow\b/i,"do not show"],
      [/\bsupports\b/i,"does not support"],[/\bsupport\b/i,"do not support"],
      [/\bproduces\b/i,"does not produce"],[/\bproduce\b/i,"do not produce"],
      [/\bchanges\b/i,"does not change"],[/\bchange\b/i,"do not change"],
      [/\baffects\b/i,"does not affect"],[/\baffect\b/i,"do not affect"],
      [/\bdepends\b/i,"does not depend"],[/\bdepend\b/i,"do not depend"],
      [/\buses\b/i,"does not use"],[/\buse\b/i,"do not use"],
      [/\brequires\b/i,"does not require"],[/\brequire\b/i,"do not require"],
      [/\bcontains\b/i,"does not contain"],[/\bcontain\b/i,"do not contain"],
      [/\bcombines\b/i,"does not combine"],[/\bcombine\b/i,"do not combine"],
      [/\bopposes\b/i,"moves in the same direction as"],[/\bcauses\b/i,"cannot cause"],
      [/\btests\b/i,"does not test"],[/\bexplains\b/i,"does not explain"],
      [/\bguides\b/i,"does not guide"],[/\banswers\b/i,"does not answer"]
    ];
    for(const [pattern,replacement] of grammaticalNegations){
      if(pattern.test(fact)) return fact.replace(pattern,replacement);
    }
    return `Scientists accept “${fact}” without needing observations or tests.`;
  }

  function wrongClaim(fact,used,variant){
    let candidate=misconception(fact,variant);
    if(used.has(candidate)) candidate=`Observations cannot be used to evaluate the claim “${fact}”`;
    if(used.has(candidate)) candidate=`The claim “${fact}” is only a guess and cannot be investigated.`;
    used.add(candidate);
    return candidate;
  }

  function setQuestions(year,skill,set,s){
    const facts=s.facts,kv=s.keywords,nf=facts.length,nk=kv.length;
    const early=year==="F"||Number(year)<=2;
    const f=i=>facts[(2*set+i)%nf], k=i=>kv[(2*set+i)%nk], ctx=(early?earlyContexts:contexts)[set%contexts.length];
    const k0=k(0),k1=k(1),k2=k(2),k3=k(3),k4=k(4);
    const f0=f(0),f1=f(1),f2=f(2),f3=f(3),f4=f(4);
    const falseText=misconception(f2,set);
    const q1Used=new Set([f1]);
    const q1WrongA=wrongClaim(f3,q1Used,set+1),q1WrongB=wrongClaim(f4,q1Used,set+2);
    const q5Used=new Set([f0]);
    const q5WrongA=wrongClaim(f1,q5Used,set+3),q5WrongB=wrongClaim(f2,q5Used,set+4);
    const q6Used=new Set([f3,f4]);
    const q6WrongA=wrongClaim(f0,q6Used,set+5),q6WrongB=wrongClaim(f2,q6Used,set+6);
    const q7Used=new Set([f4]);
    const q7WrongA=wrongClaim(f4,q7Used,set+7),q7WrongB=wrongClaim(f3,q7Used,set+8);
    return [
      Q(year,skill,set,0,"single",`${ctx}. ${early?"Which science word means":"Which label precisely means"} “${k0[1]}”?`,{answers:[k0[0],k1[0],k2[0]],correct:0,explanation:`${k0[0]} is the precise term because it means ${k0[1]}.`}),
      Q(year,skill,set,1,"single",`${ctx}. ${early?"Which sentence matches the science idea?":"Which claim should be kept because it is scientifically accurate?"}`,{answers:[f1,q1WrongA,q1WrongB],correct:0,explanation:`Keep this claim: ${f1}`}),
      Q(year,skill,set,2,"true-false",`${ctx}. The notebook says: “${set%2===0?f2:falseText}” ${early?"Is the sentence right?":"Is that claim accurate?"}`,{answers:["True","False"],correct:set%2===0?0:1,explanation:set%2===0?`Yes. ${f2}`:`No. The accurate idea is: ${f2}`}),
      Q(year,skill,set,3,"text",`${ctx}. What science term names “${k3[1]}”?`,{correct:k3[0],acceptedAnswers:[k3[0]],explanation:`The precise term is ${k3[0]}.`}),
      Q(year,skill,set,4,"fill-blank",`${ctx}. ${early?"Finish the science label":"Complete the scientific label"} for “${k4[1]}”.`,{template:`{{blank}} means ${k4[1]}.`,acceptedAnswers:[k4[0]],explanation:`The missing term is ${k4[0]}.`}),
      Q(year,skill,set,5,"single",`${ctx}. ${early?"Which explanation matches what the class learned?":"Which explanation is supported by the topic evidence?"}`,{answers:[f0,q5WrongA,q5WrongB],correct:0,explanation:`The evidence supports this explanation: ${f0}`}),
      Q(year,skill,set,6,"multiple",`${ctx}. ${early?"Which two sentences match what the class learned?":"Which two claims should be included in the final explanation?"}`,{answers:[f3,q6WrongA,f4,q6WrongB],correct:[0,2],explanation:`The supported claims are: ${f3} ${f4}`}),
      Q(year,skill,set,7,"single",`${ctx}. ${early?`A student says “${f4}” is wrong. Which answer corrects the student?`:`A student challenges the claim “${f4}” Which response uses the science idea accurately?`}`,{answers:[f4,q7WrongA,q7WrongB],correct:0,explanation:`The accurate response is: ${f4}`})
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


  // FOUNDATION SCIENCE REMAINING REBUILD EXTENSIONS
  const remainingExtensions={
  "scientific-inquiry": [
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-001",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which two animals belong under the heading “Has wings”?",
      "explanation": "Butterfly and magpie have visible wings.",
      "printable": true,
      "type": "single",
      "answers": [
        "butterfly and magpie",
        "dog and snail",
        "butterfly and dog",
        "magpie and snail"
      ],
      "correct": 0,
      "visual": "🦋 🐦 | 🐕 🐌",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-002",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "The pictures are already split into two groups. Which headings explain the sort?",
      "explanation": "The groups are based on a visible feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "Has wings / No wings",
        "Fast / Slow",
        "Friendly / Unfriendly",
        "Big / Small"
      ],
      "correct": 0,
      "visual": "🦋 🐦 | 🐕 🐌",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-003",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "What pattern does this dot record show?",
      "explanation": "Each dot represents one observation.",
      "printable": true,
      "type": "single",
      "answers": [
        "More birds were observed",
        "All birds were larger",
        "No butterflies were observed",
        "The dots show colour only"
      ],
      "correct": 0,
      "visual": "🐦 ••••\n🦋 ••",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-004",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "How many birds are shown in the record?",
      "explanation": "There are 4 dots for birds.",
      "printable": true,
      "type": "single",
      "answers": [
        "4",
        "2",
        "5",
        "3"
      ],
      "correct": 0,
      "visual": "🐦 ••••\n🦋 ••",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-005",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which object should go under the heading “plastic”?",
      "explanation": "The plastic bottle is shown as plastic.",
      "printable": true,
      "type": "single",
      "answers": [
        "plastic bottle",
        "wooden ruler",
        "metal key",
        "all three objects"
      ],
      "correct": 0,
      "visual": "📏 🔑 🧴",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-006",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which object belongs in the metal group?",
      "explanation": "The metal key is made from metal.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal key",
        "wooden ruler",
        "plastic bottle",
        "none of the objects"
      ],
      "correct": 0,
      "visual": "📏 🔑 🧴",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-007",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "The tube moves on its curved side. Which word completes the table?",
      "explanation": "The table records that the tube rolls.",
      "printable": true,
      "type": "single",
      "answers": [
        "rolls",
        "slides",
        "stays still",
        "melts"
      ],
      "correct": 0,
      "visual": "⚽ rolls | ▭ slides | 🧻 ?",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-008",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which statement is supported by the movement table?",
      "explanation": "The table records the same movement for ball and tube.",
      "printable": true,
      "type": "single",
      "answers": [
        "The ball and tube both roll",
        "Every object rolls",
        "The block rolls",
        "Colour controls movement"
      ],
      "correct": 0,
      "visual": "⚽ rolls | ▭ slides | 🧻 ?",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-009",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Select the features shared by the sparrow, duck and emu.",
      "explanation": "The table shows feathers, beaks and wings for every item.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "feathers, beaks",
        "wings",
        "can fly",
        "same colour"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "🐦 🦆 🪶\nfeathers ✓ ✓ ✓ | wings ✓ ✓ ✓ | flies ✓ ✓ ✗",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-010",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which recorded feature is not shared by every item?",
      "explanation": "The marks differ for can fly.",
      "printable": true,
      "type": "single",
      "answers": [
        "can fly",
        "feathers, beaks",
        "wings",
        "being alive"
      ],
      "correct": 0,
      "visual": "🐦 🦆 🪶\nfeathers ✓ ✓ ✓ | wings ✓ ✓ ✓ | flies ✓ ✓ ✗",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-011",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "A class recorded 3 lizards and 5 birds. Which key makes the picture display easiest to read?",
      "explanation": "A consistent key makes the display trustworthy.",
      "printable": true,
      "type": "single",
      "answers": [
        "one picture = one animal",
        "large pictures count as different numbers",
        "picture size changes the count",
        "no key is needed"
      ],
      "correct": 0,
      "visual": "🦎 🦎 🦎\n🐦 🐦 🐦 🐦 🐦",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-012",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "One more bird is observed. What should the new birds count be?",
      "explanation": "Add one to 4 to get 5.",
      "printable": true,
      "type": "single",
      "answers": [
        "5",
        "4",
        "2",
        "6"
      ],
      "correct": 0,
      "visual": "🐦 ••••\n🦋 ••\n+ one new observation",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-013",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which sentence describes the pattern in this record?",
      "explanation": "The entries show that increases by one each day.",
      "printable": true,
      "type": "single",
      "answers": [
        "increases by one each day",
        "the record has no pattern",
        "every count is zero",
        "the labels are materials"
      ],
      "correct": 0,
      "visual": "Mon 2 | Tue 3 | Wed 4",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-014",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Put the steps for recording observations into a useful order for investigation 1.",
      "explanation": "Observe first, record next, then interpret and share.",
      "printable": true,
      "type": "order",
      "items": [
        "place the result in the provided table",
        "look for a pattern",
        "share the pattern",
        "observe carefully"
      ],
      "correct": [
        "observe carefully",
        "place the result in the provided table",
        "look for a pattern",
        "share the pattern"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-015",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which two animals belong under the heading “Has wings”?",
      "explanation": "Bee and duck have visible wings.",
      "printable": true,
      "type": "single",
      "answers": [
        "bee and duck",
        "cat and worm",
        "bee and cat",
        "duck and worm"
      ],
      "correct": 0,
      "visual": "🐝 🦆 | 🐈 🪱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi03-016",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "The pictures are already split into two groups. Which headings explain the sort?",
      "explanation": "The groups are based on a visible feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "Has wings / No wings",
        "Fast / Slow",
        "Friendly / Unfriendly",
        "Big / Small"
      ],
      "correct": 0,
      "visual": "🐝 🦆 | 🐈 🪱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-001",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Prediction: marble reaches the end. Observation: marble reached the end. How do they compare?",
      "explanation": "The two records say the same outcome.",
      "printable": true,
      "type": "single",
      "answers": [
        "They match",
        "They cannot be compared",
        "The observation should be changed",
        "The prediction happened after the test"
      ],
      "correct": 0,
      "visual": "⚪ ramp → end",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-002",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Put the investigation steps in order for comparison 1.",
      "explanation": "A prediction is made before evidence is collected.",
      "printable": true,
      "type": "order",
      "items": [
        "observe the test",
        "record the observation",
        "compare prediction and observation",
        "make a prediction"
      ],
      "correct": [
        "make a prediction",
        "observe the test",
        "record the observation",
        "compare prediction and observation"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-003",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which statement is the prediction? ",
      "explanation": "A prediction states what is expected before the test.",
      "printable": true,
      "type": "single",
      "answers": [
        "marble reaches the end",
        "marble reached the end",
        "The records match",
        "The test is finished"
      ],
      "correct": 0,
      "visual": "⚪ ramp → end",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-004",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "The cloth ball was predicted to show 3 bounces and observed to show 0. Which comparison is accurate?",
      "explanation": "Compare the two recorded numbers.",
      "printable": true,
      "type": "single",
      "answers": [
        "The observation was 3 bounces less than predicted",
        "The prediction must be rewritten as 0",
        "No observation was made",
        "The result proves all cloth balls act this way"
      ],
      "correct": 0,
      "visual": "predicted 3 | observed 0",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-005",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Prediction: ants and butterflies. Observation: ants and bees. Which comparison is best?",
      "explanation": "Some details can match while others differ.",
      "printable": true,
      "type": "single",
      "answers": [
        "ants matched; butterflies did not; bees were unexpected",
        "everything matched exactly",
        "nothing can be compared",
        "the observation should copy the prediction"
      ],
      "correct": 0,
      "visual": "🐜 🦋 | 🐜 🐝",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-006",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which part was observed but not predicted?",
      "explanation": "Unexpected observations should still be recorded.",
      "printable": true,
      "type": "single",
      "answers": [
        "bees were unexpected",
        "ants",
        "butterflies",
        "nothing new was observed"
      ],
      "correct": 0,
      "visual": "🐜 🦋 | 🐜 🐝",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-007",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "prediction card says roll; child now remembers slide; observation: cube slid. What should be recorded?",
      "explanation": "The original written prediction is the honest before-test record.",
      "printable": true,
      "type": "single",
      "answers": [
        "The written prediction did not match",
        "Change the old card to match",
        "Ignore the observation",
        "Use memory instead of the dated card"
      ],
      "correct": 0,
      "visual": "card: roll | result: cube slid",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-008",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Observation note: “The car moved.” Can it show whether the prediction matched?",
      "explanation": "The class needs distances on tile and carpet.",
      "printable": true,
      "type": "single",
      "answers": [
        "No, a clearer comparison is missing",
        "Yes, every prediction matched",
        "Yes, because the note is short",
        "The prediction should be erased"
      ],
      "correct": 0,
      "visual": "note: The car moved",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-009",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Prediction: cone rolls. Observation: cone rolls in a curve. Which statement uses “same” and “different” accurately?",
      "explanation": "Compare each detail separately.",
      "printable": true,
      "type": "single",
      "answers": [
        "rolling is the same; path is different",
        "all details are identical",
        "no detail can be compared",
        "different means the test failed"
      ],
      "correct": 0,
      "visual": "cone: straight? | observed curved ↪",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-010",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which rows show exact matches?",
      "explanation": "Those rows have the same prediction and observation.",
      "printable": true,
      "type": "single",
      "answers": [
        "A and C",
        "A only",
        "B only",
        "all rows"
      ],
      "correct": 0,
      "visual": "A 2→2 | B 3→1 | C 0→0",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-011",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Prediction: paper boat floats 60 seconds. Observation: sank after 20 seconds. Which conclusion is honest?",
      "explanation": "Science keeps both records and compares them.",
      "printable": true,
      "type": "single",
      "answers": [
        "The boat sank sooner than predicted",
        "Change the observation to match",
        "Say the prediction was correct anyway",
        "Hide the unexpected result"
      ],
      "correct": 0,
      "visual": "P: paper boat floats 60 seconds\nO: sank after 20 seconds",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-012",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Repeated observation: small ball bounced higher in 3 trials. Which statement is supported?",
      "explanation": "Repeated evidence helps the class compare reliably.",
      "printable": true,
      "type": "single",
      "answers": [
        "The repeated result did not match the prediction",
        "One trial should replace all records",
        "The prediction controls the result",
        "Repeated observations are unnecessary"
      ],
      "correct": 0,
      "visual": "Trial 1 ✓ | Trial 2 ✓ | Trial 3 ✓",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-013",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Unexpected result: small ball bounced higher. Which is a useful next question?",
      "explanation": "A next question should be observable and related.",
      "printable": true,
      "type": "single",
      "answers": [
        "Does air pressure change bounce height?",
        "Why was the result bad?",
        "Can we erase it?",
        "Which colour is nicest?"
      ],
      "correct": 0,
      "visual": "result: small ball bounced higher",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-014",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "A child says, “prediction did not match, so we should change the old record.” What is better?",
      "explanation": "Honest records help learning.",
      "printable": true,
      "type": "single",
      "answers": [
        "Keep the original prediction and record the result",
        "Rewrite history",
        "Ignore the result",
        "Choose the answer you wanted"
      ],
      "correct": 0,
      "visual": "prediction card + observation card",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-015",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Prediction: paper boat floats. Observation: paper boat sank. How do they compare?",
      "explanation": "The two records report different outcomes.",
      "printable": true,
      "type": "single",
      "answers": [
        "They do not match",
        "They cannot be compared",
        "The observation should be changed",
        "The prediction happened after the test"
      ],
      "correct": 0,
      "visual": "⛵ predicted float | observed sink",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi04-016",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Put the investigation steps in order for comparison 2.",
      "explanation": "A prediction is made before evidence is collected.",
      "printable": true,
      "type": "order",
      "items": [
        "observe the test",
        "record the observation",
        "compare prediction and observation",
        "make a prediction"
      ],
      "correct": [
        "make a prediction",
        "observe the test",
        "record the observation",
        "compare prediction and observation"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-001",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which sentence clearly shares the leaf through a magnifier observation?",
      "explanation": "A useful report names the observed detail.",
      "printable": true,
      "type": "single",
      "answers": [
        "I saw tiny branching lines across the leaf",
        "Something happened",
        "It was the best",
        "You know what I mean"
      ],
      "correct": 0,
      "visual": "🌿 🔍",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-002",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which statement is the question?",
      "explanation": "A question asks what the investigation will find.",
      "printable": true,
      "type": "single",
      "answers": [
        "Which ball will bounce highest?",
        "I think the rubber ball will bounce highest",
        "The observation matched",
        "The test is complete"
      ],
      "correct": 0,
      "visual": "1. Which ball will bounce highest?\n2. I think the rubber ball will bounce highest",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-003",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "What is the clearest way to share the frog-call rhythm?",
      "explanation": "The format directly shows the evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "a short audio recording",
        "an unlabelled colour page",
        "a silent block model",
        "a blank envelope"
      ],
      "correct": 0,
      "visual": "🐸 ♪ ♪",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-004",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Order the parts of a short report about investigation 1.",
      "explanation": "A clear report keeps question, prediction and observation distinct.",
      "printable": true,
      "type": "order",
      "items": [
        "I think the rubber ball will bounce highest",
        "I saw tiny branching lines across the leaf",
        "Ask the audience for questions",
        "Which ball will bounce highest?"
      ],
      "correct": [
        "Which ball will bounce highest?",
        "I think the rubber ball will bounce highest",
        "I saw tiny branching lines across the leaf",
        "Ask the audience for questions"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-005",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which addition makes the “Bird visits” display clear? ",
      "explanation": "Labels and a consistent key help others read the evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "title, labels and one mark per bird",
        "bigger decorations only",
        "a secret code with no key",
        "remove the numbers"
      ],
      "correct": 0,
      "visual": "morning 5 | lunch 2",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-006",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "A partner says, “I counted five ants near the crumbs.” Which response shows careful listening?",
      "explanation": "A clarifying question is relevant to the evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "Did you count for the same amount of time?",
        "I was not listening",
        "That cannot matter",
        "Let us talk about lunch"
      ],
      "correct": 0,
      "visual": "partner report: I counted five ants near the crumbs",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-007",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which sentence best supports the claim “more birds in the morning”?",
      "explanation": "The sentence uses the recorded numbers.",
      "printable": true,
      "type": "single",
      "answers": [
        "Eight birds were counted in the morning and three at lunch",
        "The claim feels right",
        "Everyone agrees",
        "No records are needed"
      ],
      "correct": 0,
      "visual": "morning 8, lunch 3",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-008",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which format best helps families comparing three birds?",
      "explanation": "Choose a format that shows the needed feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "a labelled poster with one section for each bird",
        "an unrelated food list",
        "one large colour with no labels",
        "a hidden result"
      ],
      "correct": 0,
      "visual": "a labelled poster",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-009",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which revision makes the poster understandable?",
      "explanation": "A title, labels and key explain the evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "Bouncing Test; key: one dot = one bounce; observed 3 bounces",
        "add glitter only",
        "remove all labels",
        "replace evidence with an opinion"
      ],
      "correct": 0,
      "visual": "Stuff | ••• | ball",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-010",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which explanation clearly and safely describes the magnifying glass and shell?",
      "explanation": "Good science communication includes purpose and safety.",
      "printable": true,
      "type": "single",
      "answers": [
        "It makes small surface details look larger; keep it away from direct sunlight",
        "Use it any way you like",
        "It gives the answer without observing",
        "Taste the sample to check"
      ],
      "correct": 0,
      "visual": "magnifying glass and shell",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-011",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "What would most improve the clay flower?",
      "explanation": "Accurate labels connect the model to observed features.",
      "printable": true,
      "type": "single",
      "answers": [
        "arrows naming petals, stem, leaves and roots",
        "cover every part with glitter",
        "add a secret code",
        "use a title about food"
      ],
      "correct": 0,
      "visual": "🌼 model",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-012",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which statement shares the result honestly?",
      "explanation": "Good reporting separates evidence from uncertainty.",
      "printable": true,
      "type": "single",
      "answers": [
        "We observed farther travel, but push strength may also have changed",
        "This proves the cause forever",
        "The result must be hidden",
        "The prediction controls the evidence"
      ],
      "correct": 0,
      "visual": "car went farther on the smooth ramp",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-013",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which sentence clearly shares the record?",
      "explanation": "Specific counts make the report useful.",
      "printable": true,
      "type": "single",
      "answers": [
        "We observed two bees and one butterfly in five minutes",
        "There were some things",
        "It was amazing",
        "Everyone knows the result"
      ],
      "correct": 0,
      "visual": "bees 2, butterflies 1",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-014",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "After reporting “What visits the lavender?”, which audience question is useful?",
      "explanation": "The question asks about how evidence was collected.",
      "printable": true,
      "type": "single",
      "answers": [
        "How long did you watch?",
        "What is your favourite colour?",
        "Can we ignore the evidence?",
        "Was the answer fun?"
      ],
      "correct": 0,
      "visual": "What visits the lavender?",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-015",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which sentence clearly shares the snail beside a rock observation?",
      "explanation": "A useful report names the observed detail.",
      "printable": true,
      "type": "single",
      "answers": [
        "The snail moved slowly past the rock",
        "Something happened",
        "It was the best",
        "You know what I mean"
      ],
      "correct": 0,
      "visual": "🐌 🪨",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    },
    {
      "id": "daily-f-science-scientific-inquiry-ac9sfi05-016",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "scientific-inquiry",
      "question": "Which statement is the question?",
      "explanation": "A question asks what the investigation will find.",
      "printable": true,
      "type": "single",
      "answers": [
        "What visits the lavender?",
        "I predict bees will visit",
        "The observation matched",
        "The test is complete"
      ],
      "correct": 0,
      "visual": "1. What visits the lavender?\n2. I predict bees will visit",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 1
    }
  ],
  "science-vocabulary": [
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi03-001",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Select the features shared by the sparrow, duck and emu.",
      "explanation": "The table shows feathers, beaks and wings for every item.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "feathers, beaks",
        "wings",
        "can fly",
        "same colour"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "🐦 🦆 🪶\nfeathers ✓ ✓ ✓ | wings ✓ ✓ ✓ | flies ✓ ✓ ✗",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi03-002",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which recorded feature is not shared by every item?",
      "explanation": "The marks differ for can fly.",
      "printable": true,
      "type": "single",
      "answers": [
        "can fly",
        "feathers, beaks",
        "wings",
        "being alive"
      ],
      "correct": 0,
      "visual": "🐦 🦆 🪶\nfeathers ✓ ✓ ✓ | wings ✓ ✓ ✓ | flies ✓ ✓ ✗",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi03-003",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "A class recorded 3 lizards and 5 birds. Which key makes the picture display easiest to read?",
      "explanation": "A consistent key makes the display trustworthy.",
      "printable": true,
      "type": "single",
      "answers": [
        "one picture = one animal",
        "large pictures count as different numbers",
        "picture size changes the count",
        "no key is needed"
      ],
      "correct": 0,
      "visual": "🦎 🦎 🦎\n🐦 🐦 🐦 🐦 🐦",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi03-004",
      "curriculumCode": "AC9SFI03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "One more bird is observed. What should the new birds count be?",
      "explanation": "Add one to 4 to get 5.",
      "printable": true,
      "type": "single",
      "answers": [
        "5",
        "4",
        "2",
        "6"
      ],
      "correct": 0,
      "visual": "🐦 ••••\n🦋 ••\n+ one new observation",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi04-001",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Prediction: cone rolls. Observation: cone rolls in a curve. Which statement uses “same” and “different” accurately?",
      "explanation": "Compare each detail separately.",
      "printable": true,
      "type": "single",
      "answers": [
        "rolling is the same; path is different",
        "all details are identical",
        "no detail can be compared",
        "different means the test failed"
      ],
      "correct": 0,
      "visual": "cone: straight? | observed curved ↪",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi04-002",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which rows show exact matches?",
      "explanation": "Those rows have the same prediction and observation.",
      "printable": true,
      "type": "single",
      "answers": [
        "A and C",
        "A only",
        "B only",
        "all rows"
      ],
      "correct": 0,
      "visual": "A 2→2 | B 3→1 | C 0→0",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi04-003",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Prediction: paper boat floats 60 seconds. Observation: sank after 20 seconds. Which conclusion is honest?",
      "explanation": "Science keeps both records and compares them.",
      "printable": true,
      "type": "single",
      "answers": [
        "The boat sank sooner than predicted",
        "Change the observation to match",
        "Say the prediction was correct anyway",
        "Hide the unexpected result"
      ],
      "correct": 0,
      "visual": "P: paper boat floats 60 seconds\nO: sank after 20 seconds",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi04-004",
      "curriculumCode": "AC9SFI04",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Repeated observation: small ball bounced higher in 3 trials. Which statement is supported?",
      "explanation": "Repeated evidence helps the class compare reliably.",
      "printable": true,
      "type": "single",
      "answers": [
        "The repeated result did not match the prediction",
        "One trial should replace all records",
        "The prediction controls the result",
        "Repeated observations are unnecessary"
      ],
      "correct": 0,
      "visual": "Trial 1 ✓ | Trial 2 ✓ | Trial 3 ✓",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI04",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi05-001",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which revision makes the poster understandable?",
      "explanation": "A title, labels and key explain the evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "Bouncing Test; key: one dot = one bounce; observed 3 bounces",
        "add glitter only",
        "remove all labels",
        "replace evidence with an opinion"
      ],
      "correct": 0,
      "visual": "Stuff | ••• | ball",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi05-002",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which explanation clearly and safely describes the magnifying glass and shell?",
      "explanation": "Good science communication includes purpose and safety.",
      "printable": true,
      "type": "single",
      "answers": [
        "It makes small surface details look larger; keep it away from direct sunlight",
        "Use it any way you like",
        "It gives the answer without observing",
        "Taste the sample to check"
      ],
      "correct": 0,
      "visual": "magnifying glass and shell",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi05-003",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "What would most improve the clay flower?",
      "explanation": "Accurate labels connect the model to observed features.",
      "printable": true,
      "type": "single",
      "answers": [
        "arrows naming petals, stem, leaves and roots",
        "cover every part with glitter",
        "add a secret code",
        "use a title about food"
      ],
      "correct": 0,
      "visual": "🌼 model",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfi05-004",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which statement shares the result honestly?",
      "explanation": "Good reporting separates evidence from uncertainty.",
      "printable": true,
      "type": "single",
      "answers": [
        "We observed farther travel, but push strength may also have changed",
        "This proves the cause forever",
        "The result must be hidden",
        "The prediction controls the evidence"
      ],
      "correct": 0,
      "visual": "car went farther on the smooth ramp",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu01-001",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which two-step plan can sort every item using visible features?",
      "explanation": "Both steps use observable features.",
      "printable": true,
      "type": "single",
      "answers": [
        "flowers / no flowers, then fruit / no fruit",
        "nice / not nice, then favourite colour",
        "old / young, then thoughts",
        "fast / slow, then memory"
      ],
      "correct": 0,
      "visual": "🌿 🌼 🍊 🌱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu01-002",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which pattern is supported across all shown fish?",
      "explanation": "The shared features are visible on every example.",
      "printable": true,
      "type": "single",
      "answers": [
        "fins and scales",
        "same colour",
        "same size",
        "same behaviour"
      ],
      "correct": 0,
      "visual": "🐟 🐠 🐟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu01-003",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which item does not follow the group rule?",
      "explanation": "The named item lacks the group feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "mouse",
        "the first item",
        "the second item",
        "all items follow"
      ],
      "correct": 0,
      "visual": "🦇 🦅 🐁",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu01-004",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which two visible features differ between the leaves or plant parts?",
      "explanation": "The description gives two observable differences.",
      "printable": true,
      "type": "single",
      "answers": [
        "shape and edge",
        "heartbeat and memory",
        "age and feelings",
        "hidden cells and thoughts"
      ],
      "correct": 0,
      "visual": "A: long smooth-edged leaf\nB: round jagged-edged leaf",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu02-001",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "What factor changed in this comparison: two wooden balls, same shape, one small and one large?",
      "explanation": "The description keeps other listed factors alike.",
      "printable": true,
      "type": "single",
      "answers": [
        "size",
        "colour",
        "name",
        "time of day"
      ],
      "correct": 0,
      "visual": "two wooden balls, same shape, one small and one large",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu02-002",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which sentence describes the observation and possible factor?",
      "explanation": "The sentence connects the recorded movement with the changed factor.",
      "printable": true,
      "type": "single",
      "answers": [
        "rubber bounced higher; material differs",
        "the result proves an always rule",
        "colour caused it",
        "no difference was seen"
      ],
      "correct": 0,
      "visual": "rubber high | foam low",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu02-003",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Why is the test unfair: small glass marble on tile and large foam ball on carpet?",
      "explanation": "Change one factor at a time.",
      "printable": true,
      "type": "single",
      "answers": [
        "material and surface also differ; use same material, shape and surface while changing size",
        "only colour differs",
        "the test is already fair",
        "movement cannot be compared"
      ],
      "correct": 0,
      "visual": "small glass marble on tile and large foam ball on carpet",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu02-004",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which conclusion is supported?",
      "explanation": "The claim is limited to the observed test.",
      "printable": true,
      "type": "single",
      "answers": [
        "shape is linked to movement in this test",
        "this must happen for every object everywhere",
        "colour controls movement",
        "one result proves all causes"
      ],
      "correct": 0,
      "visual": "● roll | ▭ slide",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu03-001",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which comparison is supported?",
      "explanation": "A small teacher-approved water-drop test can show the difference.",
      "printable": true,
      "type": "single",
      "answers": [
        "The paper towel is absorbent; the plastic sheet is water resistant",
        "both dissolve instantly",
        "colour proves absorbency",
        "neither can be tested safely"
      ],
      "correct": 0,
      "visual": "paper 💧 | plastic 💧",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu03-002",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which statement matches a safe gentle observation?",
      "explanation": "The words describe how the samples feel or respond.",
      "printable": true,
      "type": "single",
      "answers": [
        "wood block is hard; foam pad is soft",
        "their thoughts differ",
        "one is friendlier",
        "the colour decides hardness"
      ],
      "correct": 0,
      "visual": "🪵 | foam",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu03-003",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which comparison uses observable properties?",
      "explanation": "The comparison is based on sight or safe touch.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal foil is smooth and shiny; fabric is woven and dull",
        "one likes water",
        "one remembers heat",
        "one is happier"
      ],
      "correct": 0,
      "visual": "foil | cloth",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-vocabulary-ac9sfu03-004",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-vocabulary",
      "question": "Which correction is scientific?",
      "explanation": "Describe only what was observed or safely tested.",
      "printable": true,
      "type": "single",
      "answers": [
        "The inside was not observed; label the outside hard or opaque",
        "keep the unsupported label",
        "guess hidden properties",
        "use a favourite word"
      ],
      "correct": 0,
      "visual": "sealed wood block labelled soft inside",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    }
  ],
  "living-things-earth": [
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-001",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which feature can be seen on the outside of the duck?",
      "explanation": "Feathers can be observed without looking inside.",
      "printable": true,
      "type": "single",
      "answers": [
        "feathers",
        "heartbeat",
        "hunger",
        "blood"
      ],
      "correct": 0,
      "visual": "🦆",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-002",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which plant part is the carrot?",
      "explanation": "The carrot is a root.",
      "printable": true,
      "type": "single",
      "answers": [
        "root",
        "flower",
        "seed",
        "bark"
      ],
      "correct": 0,
      "visual": "🥕",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-003",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which feature explains the first group?",
      "explanation": "The group uses an observable external feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur",
        "size",
        "friendliness",
        "speed"
      ],
      "correct": 0,
      "visual": "🐈 🐕 | 🦎 🦜",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-004",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Select the two features both items share.",
      "explanation": "Both features can be seen on each item.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "fur",
        "four legs",
        "same colour",
        "same size"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "🐈 🐕",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-005",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which visible difference can separate the two?",
      "explanation": "The difference can be observed from the outside.",
      "printable": true,
      "type": "single",
      "answers": [
        "two legs / four legs",
        "thoughts",
        "heartbeat",
        "age"
      ],
      "correct": 0,
      "visual": "🧒 🐕",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-006",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "What extra external detail could the magnifier reveal on the flower?",
      "explanation": "Magnification reveals small surface details.",
      "printable": true,
      "type": "single",
      "answers": [
        "tiny lines on petals and pollen",
        "the object’s thoughts",
        "its hidden heart",
        "its favourite place"
      ],
      "correct": 0,
      "visual": "🌼 🔍",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-007",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which pair gives two different visible-feature rules for the same collection?",
      "explanation": "A collection can be sorted in more than one useful way.",
      "printable": true,
      "type": "single",
      "answers": [
        "wings / no wings; two legs / more than two legs",
        "friendly / unfriendly; happy / sad",
        "fast / slow; likes people / not",
        "inside / outside; favourite food"
      ],
      "correct": 0,
      "visual": "🦋 🐦 🐜 🦘",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-008",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Where could the platypus belong?",
      "explanation": "It has both visible features, so overlapping groups can show both.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur group and bill group",
        "only one group is allowed",
        "neither group",
        "the colour group only"
      ],
      "correct": 0,
      "visual": "🦫 fur + bill",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 0
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-009",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which two-step plan can sort every item using visible features?",
      "explanation": "Both steps use observable features.",
      "printable": true,
      "type": "single",
      "answers": [
        "flowers / no flowers, then fruit / no fruit",
        "nice / not nice, then favourite colour",
        "old / young, then thoughts",
        "fast / slow, then memory"
      ],
      "correct": 0,
      "visual": "🌿 🌼 🍊 🌱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-010",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which pattern is supported across all shown fish?",
      "explanation": "The shared features are visible on every example.",
      "printable": true,
      "type": "single",
      "answers": [
        "fins and scales",
        "same colour",
        "same size",
        "same behaviour"
      ],
      "correct": 0,
      "visual": "🐟 🐠 🐟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-011",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which item does not follow the group rule?",
      "explanation": "The named item lacks the group feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "mouse",
        "the first item",
        "the second item",
        "all items follow"
      ],
      "correct": 0,
      "visual": "🦇 🦅 🐁",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-012",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which two visible features differ between the leaves or plant parts?",
      "explanation": "The description gives two observable differences.",
      "printable": true,
      "type": "single",
      "answers": [
        "shape and edge",
        "heartbeat and memory",
        "age and feelings",
        "hidden cells and thoughts"
      ],
      "correct": 0,
      "visual": "A: long smooth-edged leaf\nB: round jagged-edged leaf",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-013",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which observation is supported by the image?",
      "explanation": "The statement reports visible evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "many tiny overlapping pieces",
        "it remembers every place",
        "it is the happiest",
        "it likes warm weather"
      ],
      "correct": 0,
      "visual": "🦋 🔍",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-014",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "One child groups by feathers; another by swimming. Which statement is best?",
      "explanation": "The curriculum focus is observable external features.",
      "printable": true,
      "type": "single",
      "answers": [
        "Feathers is the direct external-feature rule",
        "both rules are hidden internal features",
        "neither rule can be useful",
        "behaviour and external features are identical"
      ],
      "correct": 0,
      "visual": "🦆 🐧 🐦",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-015",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which feature can be seen on the outside of the fish?",
      "explanation": "Fins can be observed without looking inside.",
      "printable": true,
      "type": "single",
      "answers": [
        "fins",
        "thoughts",
        "hunger",
        "blood"
      ],
      "correct": 0,
      "visual": "🐟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-016",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which plant part is the lettuce?",
      "explanation": "The lettuce is a leaf.",
      "printable": true,
      "type": "single",
      "answers": [
        "leaf",
        "flower",
        "seed",
        "bark"
      ],
      "correct": 0,
      "visual": "🥬",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 1
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-017",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which feature explains the first group?",
      "explanation": "The group uses an observable external feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur",
        "size",
        "friendliness",
        "speed"
      ],
      "correct": 0,
      "visual": "🐇 🐁 | 🐍 🐟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-018",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Select the two features both items share.",
      "explanation": "Both features can be seen on each item.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "eyes",
        "legs",
        "same colour",
        "same size"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "🧒 🐕",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-019",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which visible difference can separate the two?",
      "explanation": "The difference can be observed from the outside.",
      "printable": true,
      "type": "single",
      "answers": [
        "feathers / scales",
        "thoughts",
        "heartbeat",
        "age"
      ],
      "correct": 0,
      "visual": "🦆 🐟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-020",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "What extra external detail could the magnifier reveal on the moth wing?",
      "explanation": "Magnification reveals small surface details.",
      "printable": true,
      "type": "single",
      "answers": [
        "tiny overlapping scales",
        "the object’s thoughts",
        "its hidden heart",
        "its favourite place"
      ],
      "correct": 0,
      "visual": "🦋 🔍",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-021",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which pair gives two different visible-feature rules for the same collection?",
      "explanation": "A collection can be sorted in more than one useful way.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur / no fur; four legs / not four legs",
        "friendly / unfriendly; happy / sad",
        "fast / slow; likes people / not",
        "inside / outside; favourite food"
      ],
      "correct": 0,
      "visual": "🐈 🦆 🐟 🐇",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-022",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Where could the bat belong?",
      "explanation": "It has both visible features, so overlapping groups can show both.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur group and wings group",
        "only one group is allowed",
        "neither group",
        "the colour group only"
      ],
      "correct": 0,
      "visual": "🦇 fur + wings",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-023",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which two-step plan can sort every item using visible features?",
      "explanation": "Both steps use observable features.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur / no fur, then four legs / not",
        "nice / not nice, then favourite colour",
        "old / young, then thoughts",
        "fast / slow, then memory"
      ],
      "correct": 0,
      "visual": "🐈 🦆 🐟 🐇",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-024",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which pattern is supported across all shown birds?",
      "explanation": "The shared features are visible on every example.",
      "printable": true,
      "type": "single",
      "answers": [
        "feathers and beaks",
        "all can fly",
        "same size",
        "same behaviour"
      ],
      "correct": 0,
      "visual": "🐦 🦆 🪶",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 2
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-025",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which item does not follow the group rule?",
      "explanation": "The named item lacks the group feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "lizard",
        "the first item",
        "the second item",
        "all items follow"
      ],
      "correct": 0,
      "visual": "🐈 🐇 🦎",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-026",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which two visible features differ between the leaves or plant parts?",
      "explanation": "The description gives two observable differences.",
      "printable": true,
      "type": "single",
      "answers": [
        "colour and petal number",
        "heartbeat and memory",
        "age and feelings",
        "hidden cells and thoughts"
      ],
      "correct": 0,
      "visual": "A: red five-petal flower\nB: yellow many-petal flower",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-027",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which observation is supported by the image?",
      "explanation": "The statement reports visible evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "branching roots and green stem",
        "it remembers every place",
        "it is the happiest",
        "it likes warm weather"
      ],
      "correct": 0,
      "visual": "🌱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-028",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "One child groups by fur; another by running. Which statement is best?",
      "explanation": "The curriculum focus is observable external features.",
      "printable": true,
      "type": "single",
      "answers": [
        "Fur is the direct external-feature rule",
        "both rules are hidden internal features",
        "neither rule can be useful",
        "behaviour and external features are identical"
      ],
      "correct": 0,
      "visual": "🐈 🐕 🐇",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-029",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which feature can be seen on the outside of the cat?",
      "explanation": "Fur can be observed without looking inside.",
      "printable": true,
      "type": "single",
      "answers": [
        "fur",
        "stomach",
        "hunger",
        "blood"
      ],
      "correct": 0,
      "visual": "🐈",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-030",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which plant part is the apple?",
      "explanation": "The apple is a fruit.",
      "printable": true,
      "type": "single",
      "answers": [
        "fruit",
        "flower",
        "seed",
        "bark"
      ],
      "correct": 0,
      "visual": "🍎",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-031",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Which feature explains the first group?",
      "explanation": "The group uses an observable external feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "wings",
        "size",
        "friendliness",
        "speed"
      ],
      "correct": 0,
      "visual": "🦆 🐦 | 🐕 🐌",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    },
    {
      "id": "daily-f-science-living-things-earth-ac9sfu01-032",
      "curriculumCode": "AC9SFU01",
      "bank": "daily-drill",
      "skill": "living-things-earth",
      "question": "Select the two features both items share.",
      "explanation": "Both features can be seen on each item.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "feathers",
        "wings",
        "same colour",
        "same size"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "🦆 🐧",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU01",
      "set": 3
    }
  ],
  "materials-forces-energy": [
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-001",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which word best describes the ball movement?",
      "explanation": "The picture shows rolling.",
      "printable": true,
      "type": "single",
      "answers": [
        "rolling",
        "melting",
        "growing",
        "floating upward"
      ],
      "correct": 0,
      "visual": "⚽ ↻ →",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-002",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which object is likely to roll more easily?",
      "explanation": "Its curved surface supports rolling.",
      "printable": true,
      "type": "single",
      "answers": [
        "sphere",
        "the flat-faced object",
        "both must slide",
        "colour decides"
      ],
      "correct": 0,
      "visual": "● ▣ ramp",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-003",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "How does the top mainly move in the shown example?",
      "explanation": "The observed movement is spins.",
      "printable": true,
      "type": "single",
      "answers": [
        "spins",
        "melts",
        "grows",
        "stays hidden"
      ],
      "correct": 0,
      "visual": "🔺",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-004",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which two details should be recorded to compare size fairly?",
      "explanation": "Record movement outcomes while keeping conditions the same.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "which reaches the bottom first",
        "distance travelled",
        "colour",
        "name"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "small and large rubber balls | same ramp",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-005",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Both objects are dropped from the same height. Which will probably bounce higher?",
      "explanation": "rubber springs back more.",
      "printable": true,
      "type": "single",
      "answers": [
        "rubber ball",
        "cloth ball",
        "both must be equal",
        "colour decides"
      ],
      "correct": 0,
      "visual": "🏀 vs 🧶",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-006",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "How is the path likely to differ?",
      "explanation": "Shape can influence the path.",
      "printable": true,
      "type": "single",
      "answers": [
        "wobbly or curved path; marble rolls more smoothly",
        "both paths must match",
        "neither can move",
        "size alone decides"
      ],
      "correct": 0,
      "visual": "🥚 ↪ | ● →",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-007",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What happens when the cardboard tube changes from its curved side to its flat end?",
      "explanation": "Different surfaces touch the floor.",
      "printable": true,
      "type": "single",
      "answers": [
        "It rolls first, then rests or tips",
        "it melts",
        "colour changes",
        "it always moves the same"
      ],
      "correct": 0,
      "visual": "🧻",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-008",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "To test material, select the two correct plan parts.",
      "explanation": "Record bounce height after changing one factor.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "Change only material",
        "Keep same size, shape, drop height and surface",
        "Change every condition",
        "Record colour only"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "rubber, foam and cloth balls",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-009",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What factor changed in this comparison: two wooden balls, same shape, one small and one large?",
      "explanation": "The description keeps other listed factors alike.",
      "printable": true,
      "type": "single",
      "answers": [
        "size",
        "colour",
        "name",
        "time of day"
      ],
      "correct": 0,
      "visual": "two wooden balls, same shape, one small and one large",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-010",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which sentence describes the observation and possible factor?",
      "explanation": "The sentence connects the recorded movement with the changed factor.",
      "printable": true,
      "type": "single",
      "answers": [
        "rubber bounced higher; material differs",
        "the result proves an always rule",
        "colour caused it",
        "no difference was seen"
      ],
      "correct": 0,
      "visual": "rubber high | foam low",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-011",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Why is the test unfair: small glass marble on tile and large foam ball on carpet?",
      "explanation": "Change one factor at a time.",
      "printable": true,
      "type": "single",
      "answers": [
        "material and surface also differ; use same material, shape and surface while changing size",
        "only colour differs",
        "the test is already fair",
        "movement cannot be compared"
      ],
      "correct": 0,
      "visual": "small glass marble on tile and large foam ball on carpet",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-012",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which conclusion is supported?",
      "explanation": "The claim is limited to the observed test.",
      "printable": true,
      "type": "single",
      "answers": [
        "shape is linked to movement in this test",
        "this must happen for every object everywhere",
        "colour controls movement",
        "one result proves all causes"
      ],
      "correct": 0,
      "visual": "● roll | ▭ slide",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-013",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "A child says size alone caused the result. What is better?",
      "explanation": "Several factors can influence movement.",
      "printable": true,
      "type": "single",
      "answers": [
        "shape and material also differ; compare same material and shape in two sizes",
        "large things always move faster",
        "rewrite the result",
        "ignore other factors"
      ],
      "correct": 0,
      "visual": "large smooth ball beat small crumpled paper",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-014",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Order the fair movement investigation steps for scene 1.",
      "explanation": "A fair test changes one factor and records evidence.",
      "printable": true,
      "type": "order",
      "items": [
        "keep other conditions the same",
        "make a prediction",
        "observe and record movement",
        "compare the results",
        "choose one factor to change"
      ],
      "correct": [
        "choose one factor to change",
        "keep other conditions the same",
        "make a prediction",
        "observe and record movement",
        "compare the results"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-015",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which word best describes the top movement?",
      "explanation": "The picture shows spinning.",
      "printable": true,
      "type": "single",
      "answers": [
        "spinning",
        "melting",
        "growing",
        "floating upward"
      ],
      "correct": 0,
      "visual": "🔺 ↻",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-016",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which object is likely to roll more easily?",
      "explanation": "Its round shape supports rolling.",
      "printable": true,
      "type": "single",
      "answers": [
        "marble",
        "the flat-faced object",
        "both must slide",
        "colour decides"
      ],
      "correct": 0,
      "visual": "● ▭ ramp",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-017",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "How does the toy car mainly move in the shown example?",
      "explanation": "The observed movement is rolls.",
      "printable": true,
      "type": "single",
      "answers": [
        "rolls",
        "melts",
        "grows",
        "stays hidden"
      ],
      "correct": 0,
      "visual": "🚗",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-018",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which two details should be recorded to compare size fairly?",
      "explanation": "Record movement outcomes while keeping conditions the same.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "speed",
        "path",
        "colour",
        "name"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "small and large wooden wheels | same floor",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-019",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Both objects are dropped from the same height. Which will probably bounce higher?",
      "explanation": "foam may compress and rebound differently.",
      "printable": true,
      "type": "single",
      "answers": [
        "foam ball",
        "both must be equal",
        "colour decides"
      ],
      "correct": 0,
      "visual": "⚙️ vs ⚪",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-020",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "How is the path likely to differ?",
      "explanation": "Shape can influence the path.",
      "printable": true,
      "type": "single",
      "answers": [
        "curving path; round ball rolls straighter",
        "both paths must match",
        "neither can move",
        "size alone decides"
      ],
      "correct": 0,
      "visual": "⬭ ↪ | ● →",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-021",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What happens when the can changes from its curved side to its flat base?",
      "explanation": "Different surfaces touch the floor.",
      "printable": true,
      "type": "single",
      "answers": [
        "It rolls first, then rests",
        "it melts",
        "colour changes",
        "it always moves the same"
      ],
      "correct": 0,
      "visual": "🥫",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-022",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "To test size, select the two correct plan parts.",
      "explanation": "Record travel time after changing one factor.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "Change only size",
        "Keep same material, shape, ramp and release",
        "Change every condition",
        "Record colour only"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "small and large rubber balls",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-023",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What factor changed in this comparison: two same-sized balls, one rubber and one cloth?",
      "explanation": "The description keeps other listed factors alike.",
      "printable": true,
      "type": "single",
      "answers": [
        "material",
        "colour",
        "name",
        "time of day"
      ],
      "correct": 0,
      "visual": "two same-sized balls, one rubber and one cloth",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu02-024",
      "curriculumCode": "AC9SFU02",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which sentence describes the observation and possible factor?",
      "explanation": "The sentence connects the recorded movement with the changed factor.",
      "printable": true,
      "type": "single",
      "answers": [
        "the speeds differ; size differs",
        "the result proves an always rule",
        "colour caused it",
        "no difference was seen"
      ],
      "correct": 0,
      "visual": "small fast | large slow",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU02",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-001",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which word names the material of the metal spoon?",
      "explanation": "Metal names the substance.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal",
        "spoon",
        "handle",
        "classroom"
      ],
      "correct": 0,
      "visual": "🥄",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-002",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Select two observable properties of the cotton fabric.",
      "explanation": "Both words describe the sample.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "soft",
        "flexible",
        "hungry",
        "friendly"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "🧵",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-003",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which statement names two materials in the pencil?",
      "explanation": "One object can contain different materials.",
      "printable": true,
      "type": "single",
      "answers": [
        "wooden body and rubber eraser",
        "it is made from one colour",
        "it has thoughts and feelings",
        "every part is paper"
      ],
      "correct": 0,
      "visual": "✏️",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-004",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which labels fit the two groups?",
      "explanation": "The labels describe observed material properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "flexible / not flexible in a gentle test",
        "old / young",
        "nice / not nice",
        "inside / outside"
      ],
      "correct": 0,
      "visual": "⭕ 🧣 | 🪵 🥄",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-005",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What detail could a magnifier reveal?",
      "explanation": "The detail is visible evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "tiny fibres at the edge",
        "the material’s thoughts",
        "its favourite colour",
        "a hidden memory"
      ],
      "correct": 0,
      "visual": "📄 🔍",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-006",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which material best suits the rain cover?",
      "explanation": "The properties match the purpose.",
      "printable": true,
      "type": "single",
      "answers": [
        "flexible waterproof plastic",
        "dissolving tissue",
        "unlabelled mystery material",
        "material chosen only by colour"
      ],
      "correct": 0,
      "visual": "☔",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-007",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Why are different parts used in the saucepan?",
      "explanation": "Different parts need different properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal bowl for strength/heating; plastic handle for safer holding",
        "all materials have identical properties",
        "colour is the only reason",
        "one material can never be used twice"
      ],
      "correct": 0,
      "visual": "🍳",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-008",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which heading pair matches the groups?",
      "explanation": "The headings state observable properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "transparent / opaque",
        "fast / slow",
        "happy / sad",
        "old / new"
      ],
      "correct": 0,
      "visual": "▱ plastic | 🪵 📦",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-009",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which comparison is supported?",
      "explanation": "A small teacher-approved water-drop test can show the difference.",
      "printable": true,
      "type": "single",
      "answers": [
        "The paper towel is absorbent; the plastic sheet is water resistant",
        "both dissolve instantly",
        "colour proves absorbency",
        "neither can be tested safely"
      ],
      "correct": 0,
      "visual": "paper 💧 | plastic 💧",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-010",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which statement matches a safe gentle observation?",
      "explanation": "The words describe how the samples feel or respond.",
      "printable": true,
      "type": "single",
      "answers": [
        "wood block is hard; foam pad is soft",
        "their thoughts differ",
        "one is friendlier",
        "the colour decides hardness"
      ],
      "correct": 0,
      "visual": "🪵 | foam",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-011",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which comparison uses observable properties?",
      "explanation": "The comparison is based on sight or safe touch.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal foil is smooth and shiny; fabric is woven and dull",
        "one likes water",
        "one remembers heat",
        "one is happier"
      ],
      "correct": 0,
      "visual": "foil | cloth",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-012",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which correction is scientific?",
      "explanation": "Describe only what was observed or safely tested.",
      "printable": true,
      "type": "single",
      "answers": [
        "The inside was not observed; label the outside hard or opaque",
        "keep the unsupported label",
        "guess hidden properties",
        "use a favourite word"
      ],
      "correct": 0,
      "visual": "sealed wood block labelled soft inside",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-013",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What is a safe way to investigate the unknown clear sheet?",
      "explanation": "The observation checks transparency and rigidity.",
      "printable": true,
      "type": "single",
      "answers": [
        "look through it and gently check rigidity",
        "taste it",
        "heat it without an adult",
        "bend it until it breaks"
      ],
      "correct": 0,
      "visual": "unknown clear sheet",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-014",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Order the safe material-observation steps for sample 1.",
      "explanation": "Observe safely before classifying.",
      "printable": true,
      "type": "order",
      "items": [
        "follow the teacher-approved touch test",
        "record property words",
        "group it with similar samples",
        "explain the evidence",
        "look at the sample"
      ],
      "correct": [
        "look at the sample",
        "follow the teacher-approved touch test",
        "record property words",
        "group it with similar samples",
        "explain the evidence"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-015",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which word names the material of the wooden ruler?",
      "explanation": "Wood names the substance.",
      "printable": true,
      "type": "single",
      "answers": [
        "wood",
        "ruler",
        "handle",
        "classroom"
      ],
      "correct": 0,
      "visual": "📏",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-016",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Select two observable properties of the glass sheet.",
      "explanation": "Both words describe the sample.",
      "printable": true,
      "type": "multiple",
      "answers": [
        "hard",
        "transparent",
        "hungry",
        "friendly"
      ],
      "correct": [
        0,
        1
      ],
      "visual": "▱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 1
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-017",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which statement names two materials in the shoe?",
      "explanation": "One object can contain different materials.",
      "printable": true,
      "type": "single",
      "answers": [
        "fabric upper and rubber sole",
        "it is made from one colour",
        "it has thoughts and feelings",
        "every part is paper"
      ],
      "correct": 0,
      "visual": "👟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-018",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which labels fit the two groups?",
      "explanation": "The labels describe observed material properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "flexible / not flexible in a gentle test",
        "old / young",
        "nice / not nice",
        "inside / outside"
      ],
      "correct": 0,
      "visual": "plastic cloth | glass wood",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-019",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "What detail could a magnifier reveal?",
      "explanation": "The detail is visible evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "woven threads",
        "the material’s thoughts",
        "its favourite colour",
        "a hidden memory"
      ],
      "correct": 0,
      "visual": "🧵 🔍",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-020",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which material best suits the model window?",
      "explanation": "The properties match the purpose.",
      "printable": true,
      "type": "single",
      "answers": [
        "clear rigid plastic",
        "dissolving tissue",
        "unlabelled mystery material",
        "material chosen only by colour"
      ],
      "correct": 0,
      "visual": "🏠 ▱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-021",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Why are different parts used in the shoe?",
      "explanation": "Different parts need different properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "fabric upper for flexibility; rubber sole for grip",
        "all materials have identical properties",
        "colour is the only reason",
        "one material can never be used twice"
      ],
      "correct": 0,
      "visual": "👟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-022",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which heading pair matches the groups?",
      "explanation": "The headings state observable properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "flexible / rigid in gentle test",
        "fast / slow",
        "happy / sad",
        "old / new"
      ],
      "correct": 0,
      "visual": "⭕ 🧣 | 🥄 ▱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-023",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which comparison is supported?",
      "explanation": "A small teacher-approved water-drop test can show the difference.",
      "printable": true,
      "type": "single",
      "answers": [
        "The sponge is absorbent; the glass tile is water resistant",
        "both dissolve instantly",
        "colour proves absorbency",
        "neither can be tested safely"
      ],
      "correct": 0,
      "visual": "🧽 💧 | ▱ 💧",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    },
    {
      "id": "daily-f-science-materials-forces-energy-ac9sfu03-024",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "materials-forces-energy",
      "question": "Which statement matches a safe gentle observation?",
      "explanation": "The words describe how the samples feel or respond.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal spoon is hard; sponge is soft",
        "their thoughts differ",
        "one is friendlier",
        "the colour decides hardness"
      ],
      "correct": 0,
      "visual": "🥄 | 🧽",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 2
    }
  ],
  "science-technology-society": [
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-001",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which sentence best supports the claim “rubber bounced higher”?",
      "explanation": "The sentence uses the recorded numbers.",
      "printable": true,
      "type": "single",
      "answers": [
        "Rubber bounced five times and cloth once",
        "The claim feels right",
        "Everyone agrees",
        "No records are needed"
      ],
      "correct": 0,
      "visual": "rubber 5, cloth 1",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-002",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which format best helps a class hearing a frog rhythm?",
      "explanation": "Choose a format that shows the needed feature.",
      "printable": true,
      "type": "single",
      "answers": [
        "a short audio clip with a label",
        "an unrelated food list",
        "one large colour with no labels",
        "a hidden result"
      ],
      "correct": 0,
      "visual": "a short audio clip",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-003",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which revision makes the poster understandable?",
      "explanation": "A title, labels and key explain the evidence.",
      "printable": true,
      "type": "single",
      "answers": [
        "Plant Growth; Day 1 and Day 5 labels",
        "add glitter only",
        "remove all labels",
        "replace evidence with an opinion"
      ],
      "correct": 0,
      "visual": "Plants | 🌱🌿",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-004",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which explanation clearly and safely describes the binoculars and bird?",
      "explanation": "Good science communication includes purpose and safety.",
      "printable": true,
      "type": "single",
      "answers": [
        "They help view the bird from a safe distance; never walk while looking",
        "Use it any way you like",
        "It gives the answer without observing",
        "Taste the sample to check"
      ],
      "correct": 0,
      "visual": "binoculars and bird",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-005",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "What would most improve the toy car diagram?",
      "explanation": "Accurate labels connect the model to observed features.",
      "printable": true,
      "type": "single",
      "answers": [
        "labels for wheels, body and movement arrow",
        "cover every part with glitter",
        "add a secret code",
        "use a title about food"
      ],
      "correct": 0,
      "visual": "🚗 →",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-006",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which statement shares the result honestly?",
      "explanation": "Good reporting separates evidence from uncertainty.",
      "printable": true,
      "type": "single",
      "answers": [
        "We observed more growth, but other conditions may differ",
        "This proves the cause forever",
        "The result must be hidden",
        "The prediction controls the evidence"
      ],
      "correct": 0,
      "visual": "plant grew more near the window",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-007",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which sentence clearly shares the record?",
      "explanation": "Specific counts make the report useful.",
      "printable": true,
      "type": "single",
      "answers": [
        "The car travelled 120 cm on tile and 45 cm on carpet",
        "There were some things",
        "It was amazing",
        "Everyone knows the result"
      ],
      "correct": 0,
      "visual": "tile 120 cm, carpet 45 cm",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfi05-008",
      "curriculumCode": "AC9SFI05",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "After reporting “Which ball bounces highest?”, which audience question is useful?",
      "explanation": "The question asks about how evidence was collected.",
      "printable": true,
      "type": "single",
      "answers": [
        "Were both balls dropped from the same height?",
        "What is your favourite colour?",
        "Can we ignore the evidence?",
        "Was the answer fun?"
      ],
      "correct": 0,
      "visual": "Which ball bounces highest?",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFI05",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-001",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Why are different parts used in the shoe?",
      "explanation": "Different parts need different properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "fabric upper for flexibility; rubber sole for grip",
        "all materials have identical properties",
        "colour is the only reason",
        "one material can never be used twice"
      ],
      "correct": 0,
      "visual": "👟",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-002",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which heading pair matches the groups?",
      "explanation": "The headings state observable properties.",
      "printable": true,
      "type": "single",
      "answers": [
        "flexible / rigid in gentle test",
        "fast / slow",
        "happy / sad",
        "old / new"
      ],
      "correct": 0,
      "visual": "⭕ 🧣 | 🥄 ▱",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-003",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which comparison is supported?",
      "explanation": "A small teacher-approved water-drop test can show the difference.",
      "printable": true,
      "type": "single",
      "answers": [
        "The sponge is absorbent; the glass tile is water resistant",
        "both dissolve instantly",
        "colour proves absorbency",
        "neither can be tested safely"
      ],
      "correct": 0,
      "visual": "🧽 💧 | ▱ 💧",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-004",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which statement matches a safe gentle observation?",
      "explanation": "The words describe how the samples feel or respond.",
      "printable": true,
      "type": "single",
      "answers": [
        "metal spoon is hard; sponge is soft",
        "their thoughts differ",
        "one is friendlier",
        "the colour decides hardness"
      ],
      "correct": 0,
      "visual": "🥄 | 🧽",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-005",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which comparison uses observable properties?",
      "explanation": "The comparison is based on sight or safe touch.",
      "printable": true,
      "type": "single",
      "answers": [
        "glass is smooth and transparent; wood is grainy and opaque",
        "one likes water",
        "one remembers heat",
        "one is happier"
      ],
      "correct": 0,
      "visual": "glass | wood",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-006",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Which correction is scientific?",
      "explanation": "Describe only what was observed or safely tested.",
      "printable": true,
      "type": "single",
      "answers": [
        "Only the tested sample and condition can be described",
        "keep the unsupported label",
        "guess hidden properties",
        "use a favourite word"
      ],
      "correct": 0,
      "visual": "metal spoon labelled waterproof forever",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-007",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "What is a safe way to investigate the unknown fabric?",
      "explanation": "The observation checks texture and flexibility.",
      "printable": true,
      "type": "single",
      "answers": [
        "look at weave and gently fold",
        "taste it",
        "heat it without an adult",
        "bend it until it breaks"
      ],
      "correct": 0,
      "visual": "unknown fabric",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    },
    {
      "id": "daily-f-science-science-technology-society-ac9sfu03-008",
      "curriculumCode": "AC9SFU03",
      "bank": "daily-drill",
      "skill": "science-technology-society",
      "question": "Order the safe material-observation steps for sample 2.",
      "explanation": "Observe safely before classifying.",
      "printable": true,
      "type": "order",
      "items": [
        "follow the teacher-approved touch test",
        "record property words",
        "group it with similar samples",
        "explain the evidence",
        "look at the sample"
      ],
      "correct": [
        "look at the sample",
        "follow the teacher-approved touch test",
        "record property words",
        "group it with similar samples",
        "explain the evidence"
      ],
      "instruction": "Move the cards into the correct order.",
      "year": "F",
      "subject": "science",
      "learningArea": "AC9SFU03",
      "set": 0
    }
  ]
};
  for(const [skill,questions] of Object.entries(remainingExtensions)){
    extensions.F.science[skill]=[...(extensions.F.science[skill]||[]),...questions];
  }
  for(const questions of Object.values(extensions.F.science)){
    const promptCounts=new Map();
    for(const item of questions){
      const occurrence=(promptCounts.get(item.question)||0)+1;
      promptCounts.set(item.question,occurrence);
      if(occurrence>1) item.question=`In investigation ${Number(item.set||0)+1}, `+item.question.charAt(0).toLowerCase()+item.question.slice(1);
      item.audioPrompt=item.question;
      item.hint=item.hint||({
        single:"Look closely at the evidence, then compare every choice.",
        multiple:"Check each choice because more than one can match the evidence.",
        order:"Think about what should happen first, next and last.",
        number:"Count or measure carefully, then enter only the number.",
        text:"Use the science word that names the observed idea."
      }[item.type]||"Use what you can observe and what you know.");
    }
  }
})();
