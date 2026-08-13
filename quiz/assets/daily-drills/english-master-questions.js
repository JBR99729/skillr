"use strict";
(() => {
  const DATA = window.SkillrEnglishData || {};
  const LEVELS=["easy","easy","core","core","core","application","application","stretch"];
  const YN=y=>y==="F"?0:Number(y);
  const Q=(year,skill,set,pos,type,question,extra={})=>{
    const item={
      id:`e-${year}-${skill}-s${set+1}-q${pos+1}`,
      year,subject:"english",skill,set,difficulty:LEVELS[pos],type,question,...extra
    };
    item.audioPrompt=item.audioPrompt||question;
    item.hint=item.hint||({
      single:"Read the whole sentence or passage clue, then compare every choice.",
      "true-false":"Check the exact wording before deciding.",
      text:"Use the precise word requested by the question.",
      "fill-blank":"Read the complete sentence aloud and check its meaning.",
      multiple:"Check each choice separately because more than one can be correct.",
      order:"Use meaning and sequence clues to arrange the items."
    }[type]||"Return to the text and use the strongest clue.");
    if(type==="single"&&Array.isArray(item.answers)&&item.answers.length===3&&Number.isInteger(item.correct)){
      const target=(set*8+pos)%3;
      const shift=(item.correct-target+3)%3;
      item.answers=[...item.answers.slice(shift),...item.answers.slice(0,shift)];
      item.correct=target;
    }
    return item;
  };

  const MIN_WORDS={F:32,"1":48,"2":68,"3":88,"4":108,"5":128,"6":148,"7":168,"8":188,"9":218,"10":248};

  function wordCount(text){ return String(text).trim().split(/\s+/).filter(Boolean).length; }

  function passageFor(year,set){
    const seed=DATA.passageSeeds[set%DATA.passageSeeds.length];
    const y=YN(year);
    const p=seed.person, place=seed.place;
    let sentences=[];
    if(y===0){
      sentences=[
        `${p} went to ${place}.`,
        `${p} wanted to ${seed.goal}.`,
        `There was a problem: ${seed.problem}.`,
        `${p} ${seed.action}.`,
        `After that, ${seed.result}.`
      ];
    } else if(y===1){
      sentences=[
        `${p} was working at ${place}.`,
        `The goal was to ${seed.goal}.`,
        `At first, ${seed.problem}.`,
        `${p} decided to act carefully and ${seed.action}.`,
        `${seed.detail.charAt(0).toUpperCase()+seed.detail.slice(1)}.`,
        `After the change, ${seed.result}.`
      ];
    } else if(y===2){
      sentences=[
        `${p} took part in a project at ${place}.`,
        `The group wanted to ${seed.goal}.`,
        `They soon noticed a problem: ${seed.problem}.`,
        `Instead of giving up, ${p} ${seed.action}.`,
        `${seed.detail.charAt(0).toUpperCase()+seed.detail.slice(1)}.`,
        `The group compared what happened before and after the change.`,
        `In the end, ${seed.result}.`
      ];
    } else if(y<=5){
      sentences=[
        `${p} joined a project at ${place} with a clear goal: to ${seed.goal}.`,
        `The task was not as simple as it first appeared because ${seed.problem}.`,
        `Rather than making several changes at once, ${p} ${seed.action}.`,
        `${seed.detail.charAt(0).toUpperCase()+seed.detail.slice(1)}.`,
        `This gave the group information they could use when judging whether the change had helped.`,
        `The result was encouraging: ${seed.result}.`,
        `The project showed that a practical problem can often be improved by observing carefully, making a sensible change and checking the result.`
      ];
    } else {
      sentences=[
        `${p} took part in a project at ${place} that aimed to ${seed.goal}.`,
        `The project began with a limitation that could not simply be ignored: ${seed.problem}.`,
        `Instead of treating the first difficulty as a reason to abandon the work, ${p} ${seed.action}.`,
        `${seed.detail.charAt(0).toUpperCase()+seed.detail.slice(1)}.`,
        `The group used those observations as evidence rather than relying only on impressions.`,
        `This approach made it easier to compare conditions and decide whether the change had produced a meaningful improvement.`,
        `The outcome was that ${seed.result}.`,
        `Even so, the group recognised that one project could not answer every wider question connected with the issue.`,
        `Their conclusion was therefore limited to what the recorded evidence could reasonably support.`
      ];
    }

    const lowerExtras=[
      `The group talked about what had changed and what had stayed the same.`,
      `They checked the result instead of guessing.`,
      `Everyone had a chance to explain what they noticed.`,
      `The notes helped the group remember what happened.`,
      `The class used the information to plan the next step.`,
      `They learned that careful work can improve a result.`,
      `The group shared what they had learned with the class.`,
      `They looked back at the goal before deciding what to do next.`
    ];
    const middleExtras=[
      `The group kept the original goal in mind while deciding whether the evidence supported the change.`,
      `They also discussed whether another explanation could account for part of the result.`,
      `Recording the process made it easier for another group to understand what had been done.`,
      `The students noticed that a useful conclusion depends on both the quality of the evidence and the question being asked.`,
      `They avoided claiming more than the observations could support.`,
      `The project also showed why clear instructions and consistent records matter when people compare results.`,
      `When the students explained their findings, they included both the successful result and the difficulty they had faced.`,
      `The experience encouraged them to treat unexpected results as information that could improve the next attempt.`
    ];
    const highExtras=[
      `Because the group had recorded the procedure, other students could examine the reasoning rather than accepting the conclusion on trust.`,
      `They considered whether the evidence was representative enough to justify a broader claim, and they deliberately avoided extending the conclusion beyond the available observations.`,
      `The process illustrated how practical decisions can be improved when evidence is gathered systematically and interpreted with appropriate caution.`,
      `Although the outcome supported the group's immediate decision, it did not remove every source of uncertainty.`,
      `The students distinguished between a result that was promising and a conclusion that was proven beyond doubt.`,
      `This distinction helped them explain why evidence can strengthen a claim without making every alternative explanation impossible.`,
      `Their final report described the method, the observations and the limitation so that readers could judge the conclusion for themselves.`,
      `The project therefore became an example of how careful reasoning can turn an everyday problem into a useful investigation.`
    ];

    const extras=y<=2?lowerExtras:y<=5?middleExtras:highExtras;
    let i=0;
    while(wordCount(sentences.join(" ")) < MIN_WORDS[year] && i < 24){
      sentences.push(extras[i%extras.length]);
      i++;
    }

    const text=sentences.join(" ");
    return {
      id:`passage-${year}-${set+1}`,
      title:seed.title,
      text,
      wordCount:wordCount(text),
      person:p,
      place,
      goal:seed.goal,
      problem:seed.problem,
      action:seed.action,
      result:seed.result,
      detail:seed.detail,
      keyWord:seed.word,
      keyMeaning:seed.meaning
    };
  }

  function choiceOptions(correct,distractors,shift){
    const base=[correct,...distractors.slice(0,3)];
    const k=shift%base.length;
    const answers=base.slice(k).concat(base.slice(0,k));
    return {answers,correct:answers.indexOf(correct)};
  }

  function readingSet(year,skill,set){
    const p=passageFor(year,set), y=YN(year), other=DATA.passageSeeds[(set+7)%DATA.passageSeeds.length];
    const titleOptions=choiceOptions(p.title,[other.title,"A Completely Different Problem","An Unrelated Journey"],set);
    const who=choiceOptions(p.person,[other.person,"the principal","a visiting athlete"],set+1);
    const where=choiceOptions(p.place,[other.place,"a railway station","a shopping centre"],set+2);
    const goal=choiceOptions(p.goal,[other.goal,"avoid doing any further work","win a competition without collecting evidence"],set+3);
    const problem=choiceOptions(p.problem,[other.problem,"there was no difficulty at all","everyone already knew the final answer"],set+1);
    const action=choiceOptions(p.action,[other.action,"ignored the problem and changed nothing","made a conclusion before collecting information"],set+2);
    const result=choiceOptions(p.result,[other.result,"the project ended before any result was observed","the evidence showed the exact opposite of every observation"],set+3);
    const detail=choiceOptions(p.detail,[other.detail,"no observations or records were made","the group deliberately removed every useful detail"],set+2);
    const meaning=choiceOptions(p.keyMeaning,[`the opposite of ${p.keyMeaning}`,"something unrelated to the passage","a place mentioned in the passage"],set);
    const mainIdea=`${p.person} worked toward a goal, responded to a problem and used observations to judge the result.`;
    const main=choiceOptions(mainIdea,[
      `${p.person} avoided the problem and refused to examine any result.`,
      `The passage is mainly a list of unrelated facts about ${p.place}.`,
      `The main purpose is to explain why projects should never be changed.`
    ],set+1);

    let q7, q8;
    if(y<=2){
      q7=Q(year,skill,set,6,"single","Which detail is stated in the passage?",{...detail,explanation:`The passage states that ${p.detail}.`,passage:p});
      q8=Q(year,skill,set,7,"single","Which is the best title for the passage?",{...titleOptions,explanation:`"${p.title}" best matches the passage.`,passage:p});
    }else if(y<=5){
      const inferCorrect="The group improved its decision by checking information instead of relying only on a guess.";
      const infer=choiceOptions(inferCorrect,[
        "The group decided that observations were unnecessary.",
        "The group knew the final result before beginning.",
        "The group avoided making any change after noticing the problem."
      ],set+2);
      q7=Q(year,skill,set,6,"single","Which inference is best supported by the passage?",{...infer,explanation:inferCorrect,passage:p});
      q8=Q(year,skill,set,7,"single","Which is the best title for the passage?",{...titleOptions,explanation:`"${p.title}" best matches the passage.`,passage:p});
    }else{
      const inferCorrect="The group tried to base its conclusion on recorded evidence rather than on a first impression.";
      const infer=choiceOptions(inferCorrect,[
        "The group believed one observation was enough to prove every possible conclusion.",
        "The group thought recording evidence would make the project less trustworthy.",
        "The group decided that limitations should be hidden from readers."
      ],set+2);
      const purposeCorrect="to describe a problem-solving project and show how evidence was used to reach a cautious conclusion";
      const purpose=choiceOptions(purposeCorrect,[
        "to entertain readers with a fantasy that has no connection to evidence",
        "to prove that one small project can settle every related question",
        "to give a list of instructions without explaining any result"
      ],set+3);
      q7=Q(year,skill,set,6,"single","Which inference is best supported by the passage?",{...infer,explanation:inferCorrect,passage:p});
      q8=Q(year,skill,set,7,"single","What is the writer's main purpose?",{...purpose,explanation:purposeCorrect,passage:p});
    }

    const firstQuestion=y<=2
      ? Q(year,skill,set,0,"single","Who is the main person in the passage?",{...who,explanation:`The passage focuses on ${p.person}.`,passage:p})
      : Q(year,skill,set,0,"single","Which sentence best states the central idea?",{...main,explanation:mainIdea,passage:p});

    return [
      firstQuestion,
      Q(year,skill,set,1,"single","Where does the main project take place?",{...where,explanation:`It takes place at ${p.place}.`,passage:p}),
      Q(year,skill,set,2,"single","What was the main goal?",{...goal,explanation:`The goal was to ${p.goal}.`,passage:p}),
      Q(year,skill,set,3,"single","What difficulty or limitation did the project face?",{...problem,explanation:`The passage explains that ${p.problem}.`,passage:p}),
      Q(year,skill,set,4,"single","What did the main person or group do in response?",{...action,explanation:`They ${p.action}.`,passage:p}),
      y<=2
        ? Q(year,skill,set,5,"single","Which result is stated in the passage?",{...result,explanation:`The passage states that ${p.result}.`,passage:p})
        : Q(year,skill,set,5,"single",`What does "${p.keyWord}" mean here?`,{...meaning,explanation:`${p.keyWord} means ${p.keyMeaning}.`,passage:p}),
      q7,q8
    ];
  }

  function spellingDistractors(word){
    const cands=[];
    const push=x=>{ if(x && x!==word && !cands.includes(x)) cands.push(x); };
    if(word.includes("ie")) push(word.replace("ie","ei"));
    if(word.includes("ei")) push(word.replace("ei","ie"));
    if(word.endsWith("e")) push(word.slice(0,-1));
    push(word+word.slice(-1));
    if(word.length>3) push(word.slice(0,1)+word[1]+word.slice(1));
    if(word.length>4) push(word.slice(0,-1));
    push(word+"e");
    push(word.slice(0,Math.max(1,word.length-1))+"y");
    while(cands.length<3) push(word+"x".repeat(cands.length+1));
    return cands.slice(0,3);
  }

  function vocabSet(year,skill,set){
    const bank=DATA.vocabulary?.[year]||[];
    const w=Array.from({length:4},(_,i)=>bank[(set*4+i)%bank.length]);
    const [a,b,c,d]=w;
    const opts1=choiceOptions(a[1],[b[1],c[1],d[1]],set);
    const opts2=choiceOptions(b[0],[a[0],c[0],d[0]],set+1);
    const spell=choiceOptions(c[0],spellingDistractors(c[0]),set+2);
    const opts8=choiceOptions(a[0],[b[0],c[0],d[0]],set+3);
    return [
      Q(year,skill,set,0,"single",`What does "${a[0]}" mean?`,{...opts1,explanation:`${a[0]} means ${a[1]}.`}),
      Q(year,skill,set,1,"single",`Which word means "${b[1]}"?`,{...opts2,explanation:`The word is ${b[0]}.`}),
      Q(year,skill,set,2,"single","Which spelling is correct?",{...spell,explanation:`The correct spelling is ${c[0]}.`}),
      Q(year,skill,set,3,"fill-blank","Complete the vocabulary statement.",{template:`{{blank}} means ${d[1]}.`,acceptedAnswers:[d[0]],explanation:`The missing word is ${d[0]}.`}),
      Q(year,skill,set,4,"true-false",`"${a[0]}" means ${a[1]}.`,{answers:["True","False"],correct:0,explanation:"The statement gives the correct meaning."}),
      Q(year,skill,set,5,"multiple","Select the two correctly matched word-meaning pairs.",{answers:[`${b[0]} — ${b[1]}`,`${c[0]} — ${d[1]}`,`${c[0]} — ${c[1]}`,`${d[0]} — ${a[1]}`],correct:[0,2],explanation:"The first and third pairs are correct."}),
      Q(year,skill,set,6,"text",`Type the word that means: ${d[1]}.`,{correct:d[0],acceptedAnswers:[d[0]],explanation:`The word is ${d[0]}.`}),
      Q(year,skill,set,7,"single",`Which word best matches the meaning "${a[1]}"?`,{...opts8,explanation:`The correct word is ${a[0]}.`})
    ];
  }

  const names=["Mia","Noah","Ava","Leo","Zara","Eli","Sofia","Arun","Grace","Ben"];
  const nouns=["dog","book","garden","river","teacher","music","market","bridge","student","cloud"];
  const verbs=["runs","reads","writes","jumps","walks","listens","builds","helps","looks","plays"];
  const adjectives=["bright","quiet","careful","small","strong","kind","warm","quick","green","happy"];

  function languageSet(year,skill,set){
    const y=YN(year),name=names[set%names.length],noun=nouns[(set+2)%nouns.length],verb=verbs[(set+3)%verbs.length],adj=adjectives[(set+4)%adjectives.length];
    if(y<=1){
      return [
        Q(year,skill,set,0,"single","Which sentence starts correctly?",{answers:[`${name} went to school.`,`${name.toLowerCase()} went to school.`,`went to school ${name}.`],correct:0,explanation:"Sentences and names begin with capital letters."}),
        Q(year,skill,set,1,"single","Which punctuation mark ends a statement?",{answers:["full stop","question mark","comma"],correct:0,explanation:"A statement usually ends with a full stop."}),
        Q(year,skill,set,2,"single",`Which word is a naming word (noun)?`,{answers:[noun,verb.replace(/s$/,""),adj],correct:0,explanation:`"${noun}" names a thing, place, animal or idea.`}),
        Q(year,skill,set,3,"single",`Which word shows an action?`,{answers:[verb.replace(/s$/,""),noun,adj],correct:0,explanation:"The verb shows an action."}),
        Q(year,skill,set,4,"fill-blank","Choose the punctuation.",{template:"Where is my book{{blank}}",acceptedAnswers:["?","question mark"],explanation:"A question ends with a question mark."}),
        Q(year,skill,set,5,"single","Which is a complete sentence?",{answers:[`${name} reads the book.`,"reads the book","the green"],correct:0,explanation:"The first option expresses a complete thought."}),
        Q(year,skill,set,6,"multiple","Select the two sentences with correct capitals.",{answers:[`${name} is here.`,`the dog runs.`,`We can read.`,`today is warm.`],correct:[0,2],explanation:"The first and third begin with capital letters."}),
        Q(year,skill,set,7,"order","Put the words in sentence order.",{items:["a book.","reads",name],correct:[name,"reads","a book."],instruction:"Arrange the words to make a sentence.",explanation:`${name} reads a book.`})
      ];
    }
    if(y===2){
      return [
        Q(year,skill,set,0,"single",`Which word is an adjective in "${name} carried the ${adj} bag"?`,{answers:[adj,"carried","bag"],correct:0,explanation:`"${adj}" describes the bag.`}),
        Q(year,skill,set,1,"single","Which sentence uses a comma correctly in a list?",{answers:["We packed apples, bread and water.","We packed, apples bread and water.","We packed apples bread, and water."],correct:0,explanation:"Commas separate items in a list."}),
        Q(year,skill,set,2,"true-false","A verb can show an action.",{answers:["True","False"],correct:0,explanation:"Verbs often show actions."}),
        Q(year,skill,set,3,"single","Which joining word best completes: I wore a coat ___ it was cold.",{answers:["because","but","or"],correct:0,explanation:"Because gives the reason."}),
        Q(year,skill,set,4,"fill-blank","Complete the sentence with end punctuation.",{template:"What time is it{{blank}}",acceptedAnswers:["?","question mark"],explanation:"This is a question."}),
        Q(year,skill,set,5,"single","Which sentence has correct subject–verb agreement?",{answers:["The dog runs fast.","The dog run fast.","The dogs runs fast."],correct:0,explanation:"A singular subject takes 'runs' here."}),
        Q(year,skill,set,6,"multiple","Select the two adjectives.",{answers:[adj,"quick","run",noun],correct:[0,1],explanation:"Adjectives describe nouns."}),
        Q(year,skill,set,7,"order","Arrange the words into a complete sentence.",{items:[`${noun}.`,"the",verb,name],correct:[name,verb,"the",`${noun}.`],instruction:"Arrange the words.",explanation:"The sentence needs a subject, verb and complete idea."})
      ];
    }
    if(y<=5){
      return [
        Q(year,skill,set,0,"single","Which sentence has correct subject–verb agreement?",{answers:["The students work quietly.","The students works quietly.","The students working quietly."],correct:0,explanation:"Plural 'students' takes 'work'."}),
        Q(year,skill,set,1,"single","Which sentence uses an apostrophe correctly for one student's bag?",{answers:["The student's bag was blue.","The students bag was blue.","The students' bag was blue."],correct:0,explanation:"Singular possession uses student's."}),
        Q(year,skill,set,2,"single","Which is a complete sentence?",{answers:[`${name} finished the project after lunch.`,"After lunch and before class.","Because the project."],correct:0,explanation:"The first option expresses a complete thought."}),
        Q(year,skill,set,3,"single","Choose the best conjunction: We practised carefully, ___ the first attempt was difficult.",{answers:["because","although","and"],correct:1,explanation:"Although shows contrast between difficulty and careful practice."}),
        Q(year,skill,set,4,"fill-blank","Complete the contraction.",{template:"do not = {{blank}}",acceptedAnswers:["don't"],explanation:"The apostrophe replaces the missing letter."}),
        Q(year,skill,set,5,"single","Which sentence keeps the verb tense consistent?",{answers:["She opened the book and read the first page.","She opened the book and reads the first page.","She opens the book and read the first page."],correct:0,explanation:"Both verbs are in past tense."}),
        Q(year,skill,set,6,"multiple","Select the two correctly punctuated sentences.",{answers:["Yes, I can help.","Where are you going?","My friend, likes music.","The dog is brown?"],correct:[0,1],explanation:"The first and second use punctuation correctly."}),
        Q(year,skill,set,7,"order","Order the editing steps.",{items:["Read the corrected sentence again","Find the error","Correct the error"],correct:["Find the error","Correct the error","Read the corrected sentence again"],instruction:"Arrange a sensible editing routine.",explanation:"Find, fix and reread."})
      ];
    }
    if(y<=8){
      return [
        Q(year,skill,set,0,"single","Which sentence has correct subject–verb agreement?",{answers:["The group of students is ready.","The group of students are ready.","The group of students be ready."],correct:0,explanation:"The head noun 'group' is singular."}),
        Q(year,skill,set,1,"single","Which sentence has the clearest pronoun reference?",{answers:["When Maya spoke to Lina, Maya explained the plan.","When Maya spoke to Lina, she explained it.","She explained it when they spoke."],correct:0,explanation:"Repeating the noun removes ambiguity."}),
        Q(year,skill,set,2,"single","Which sentence avoids a run-on?",{answers:["The rain stopped, so the match began.","The rain stopped the match began.","The rain stopped, the match began."],correct:0,explanation:"The conjunction correctly joins the clauses."}),
        Q(year,skill,set,3,"single","Which sentence uses a colon appropriately?",{answers:["Bring three things: water, a hat and a notebook.","Bring: three things water, a hat and a notebook.","Bring three: things water, a hat and a notebook."],correct:0,explanation:"A colon can introduce a list after a complete clause."}),
        Q(year,skill,set,4,"fill-blank","Choose the most formal word.",{template:"The results were {{blank}} with the prediction.",acceptedAnswers:["consistent"],explanation:"'Consistent' is precise and formal."}),
        Q(year,skill,set,5,"single","Which version is most concise?",{answers:["The test was repeated three times.","The test was repeated again three separate times in total.","There were three repetitions that were repeated."],correct:0,explanation:"The first is clear without unnecessary repetition."}),
        Q(year,skill,set,6,"multiple","Select the two complete sentences.",{answers:["Although it was late, we finished the report.","We checked the data twice.","Because the result was unusual.","While working in the library."],correct:[0,1],explanation:"The first two express complete thoughts."}),
        Q(year,skill,set,7,"order","Order the editing priorities.",{items:["Check punctuation and spelling","Check the sentence makes clear sense","Reread the final version"],correct:["Check the sentence makes clear sense","Check punctuation and spelling","Reread the final version"],instruction:"Arrange a useful editing sequence.",explanation:"Meaning comes first, then surface accuracy, then a final reread."})
      ];
    }
    return [
      Q(year,skill,set,0,"single","Which sentence is grammatically complete and clear?",{answers:["Although the evidence was limited, the report reached a cautious conclusion.","Although the evidence was limited, reaching a cautious conclusion.","The evidence limited, the report because cautious."],correct:0,explanation:"The first sentence has a complete main clause and clear subordinate clause."}),
      Q(year,skill,set,1,"single","Which sentence maintains parallel structure?",{answers:["The course requires reading, writing and analysing evidence.","The course requires reading, to write and evidence analysis.","The course requires to read, writing and to analyse evidence."],correct:0,explanation:"Reading, writing and analysing use parallel forms."}),
      Q(year,skill,set,2,"single","Which version has the clearest pronoun reference?",{answers:["When the researcher discussed the result with the editor, the researcher explained the limitation.","When the researcher discussed the result with the editor, she explained it.","When they discussed it, she explained the limitation."],correct:0,explanation:"The first version removes pronoun ambiguity."}),
      Q(year,skill,set,3,"single","Which punctuation best joins two closely related independent clauses without a conjunction?",{answers:["semicolon","apostrophe","question mark"],correct:0,explanation:"A semicolon can join closely related independent clauses."}),
      Q(year,skill,set,4,"fill-blank","Choose the most precise transition.",{template:"The first survey was small; {{blank}}, the conclusion was treated cautiously.",acceptedAnswers:["therefore","consequently"],explanation:"The second clause is a consequence of the first."}),
      Q(year,skill,set,5,"single","Which sentence is most concise and formal?",{answers:["The evidence did not support the claim.","The evidence was not really in support of the claim in any clear way.","It was the evidence that did not actually support the claim very much."],correct:0,explanation:"The first sentence is direct and precise."}),
      Q(year,skill,set,6,"multiple","Select the two sentences with consistent tense.",{answers:["The team recorded the data and compared the results.","The team records the data and compares the results.","The team recorded the data and compares the results.","The team will record the data and compared the results."],correct:[0,1],explanation:"The first stays past; the second stays present."}),
      Q(year,skill,set,7,"order","Order the revision steps for a formal paragraph.",{items:["Edit grammar and punctuation","Check the main idea and evidence are clear","Remove repetition and improve word choice"],correct:["Check the main idea and evidence are clear","Remove repetition and improve word choice","Edit grammar and punctuation"],instruction:"Arrange the revision sequence.",explanation:"Improve meaning and organisation before final surface editing."})
    ];
  }

  function generate(year,skill){
    year=String(year);
    const meta=DATA.support?.[year]?.[skill];
    if(!meta) return [];
    const out=[];
    for(let set=0;set<25;set++){
      if(skill==="reading-comprehension") out.push(...readingSet(year,skill,set));
      else if(skill==="vocabulary-word-meaning") out.push(...vocabSet(year,skill,set));
      else if(skill==="language-skills") out.push(...languageSet(year,skill,set));
    }
    return out;
  }

  window.SkillrDailyEnglish={
    generate,
    passageFor,
    questionsPerTopic:200,
    setsPerTopic:25
  };
})();
