(() => {
  "use strict";
  if (!window.SkillrYear4SubjectRegister) throw new Error("Year 4 subject data base is not loaded.");

  const S = {
    AC9E4LY01:{
      slug:"ac9e4ly01-texts-from-different-times-with-similar-purposes-and-audiences",
      title:"Comparing Texts from Different Times",
      subtitle:"Analyse how language, technology and social context shape depictions of events",
      desc:"compare texts from different times with similar purposes and audiences to identify similarities and differences in their depictions of events",
      learn:"Students compare texts designed for similar purposes or audiences but produced in different periods, identifying stable communicative goals and changes in vocabulary, layout, technology, viewpoint and assumptions.",
      modelTitle:"Compare two public information texts",
      modelType:"table",
      model:[["Feature","Earlier text","Contemporary text"],["purpose","inform community about an event","inform and update community"],["format","printed notice","webpage and alerts"],["language","formal, dense sentences","short sections and direct navigation"],["visuals","single illustration","photographs, map, icons"],["event depiction","official summary","multiple updates and viewpoints"]],
      modelNote:"Do not treat all older texts as simple or biased and all modern texts as better. Compare evidence from the actual texts and explain how production conditions affect representation.",
      applyTitle:"Separate time-related change from purpose-related similarity",
      applyType:"flow",
      apply:["confirm similar purpose/audience","identify common information","compare language and layout","notice technology and viewpoint","explain event depiction","avoid present-day assumptions"],
      applyNote:"Some differences come from genre or author choice rather than time alone. Use cautious wording such as ‘in these two texts’ and consider alternative explanations.",
      terms:[["depiction","way an event or subject is represented"],["historical context","conditions and conventions of the time a text was created"],["continuity","feature that remains similar across time"],["change","difference in form, language or viewpoint"],["source evidence","specific feature used to support a comparison"]],
      activities:[
        ["Paired-text matrix","Compare two notices, reports or advertisements using purpose, audience, language, visuals and event selection.","table",[["criterion","earlier","later","effect"],["headline","","",""] ,["image","","",""]]],
        ["Technology pathway","Trace how print, broadcast and online affordances change speed, updateability and audience participation.","flow",["print","radio/television","webpage","live update","social response"]],
        ["Alternative explanation check","For each difference, decide whether time, genre, author, audience or purpose could be responsible.","compare",[["shorter text","mobile layout or audience"],["formal wording","institutional role or period"],["more images","technology or genre"]]]
      ],
      mistakes:[["Older text assumed inaccurate or inferior","Evaluate evidence and context rather than age alone."],["Every difference blamed on time","Genre, author, medium and audience may also explain it."],["Present-day values imposed without context","Describe historical assumptions carefully while still evaluating effects."],["Purpose similarity ignored","Identify what both texts are trying to achieve before comparing form."]],
      quick:["Identify a continuity.","Explain one time-related change.","Compare event depiction.","Offer an alternative explanation.","Use evidence from both texts."],
      mastery:["Confirm comparable texts","Identify continuity/change","Analyse language and layout","Explain contextual effects","Use cautious evidence-based claims"],
      questions:{
        choice1:["Which comparison is most valid?",["Both texts inform families, but the newer text uses live links and shorter sections","The newer text is automatically better","Every difference is caused only by age","The texts cannot be compared because their fonts differ"]],
        fill1:["Complete the comparison structure.","similar purpose → compare features → explain differences in {{blank}} of the event"],
        choice2:["Which factor besides time may explain a difference?",["genre or audience","the alphabet","page number only","whether the reader likes history"]],
        explain:"Compare how an earlier printed notice and a current webpage could depict the same community event differently.",
        fill2:["Complete the cautious claim.","In these two texts, the later text uses more direct navigation; this may reflect digital {{blank}}."],
        apply:"Analyse two texts from different periods with a similar purpose. Include continuity, change, evidence and one alternative explanation.",
        enrichment1:"Design a comparison study using three texts from different periods. Develop criteria that distinguish time, medium, genre and audience effects.",
        enrichment2:"Recreate one event for an earlier print context and a current digital context. Explain every change while preserving purpose and core facts."
      }
    },
    AC9E4LY02:{
      slug:"ac9e4ly02-listen-for-key-points-and-information-to-carry-out-tasks",
      title:"Listening for Key Information and Building Discussion",
      subtitle:"Follow tasks, acknowledge viewpoints and extend relevant ideas",
      desc:"listen for key points and information to carry out tasks and contribute to discussions, acknowledging another opinion, linking a response to the topic, and sharing and extending ideas and information",
      learn:"Students identify main ideas and required details while listening, record information in a useful form and contribute relevant responses that acknowledge, clarify, support or challenge another speaker respectfully.",
      modelTitle:"Listen, record and respond in stages",
      modelType:"flow",
      model:["identify purpose","listen for main point","record key details","check task conditions","acknowledge speaker","link response","extend or question"],
      modelNote:"Effective listening is active and selective. Notes should capture information needed for the purpose rather than every word, and responses should connect to what was actually said.",
      applyTitle:"Use discussion moves that develop ideas",
      applyType:"table",
      apply:[["Move","Stem","Function"],["acknowledge","I understand your point that…","shows listening"],["extend","I would add…","develops information"],["clarify","Could you explain what you mean by…?","checks meaning"],["challenge","I see it differently because…","offers reasoned disagreement"],["synthesise","Both ideas suggest…","connects contributions"]],
      applyNote:"Discussion quality is not measured by speaking longest. Relevant evidence, listening, concise explanation and space for others are more important.",
      terms:[["key point","central idea or required information"],["acknowledgement","response showing another viewpoint was heard"],["clarification","request or explanation making meaning clearer"],["extension","new relevant detail or connection"],["synthesis","combination of several ideas into a broader understanding"]],
      activities:[
        ["Instruction listening","Follow a short spoken task with conditions, then compare notes and identify missed or unnecessary details.","table",[["main task","condition","sequence","materials","deadline"],["","","","",""]]],
        ["Discussion move cards","Respond to one claim using acknowledge, extend, clarify, challenge and synthesise moves.","compare",[["claim","School gardens support learning"],["acknowledge","Your point about observation is…"],["extend","They may also…"],["challenge","However, the data…"]]],
        ["Key-point summary","Listen to a short explanation and produce a one-sentence main idea plus three supporting details.","flow",["listen once","identify topic","listen again","record evidence","summarise","check against purpose"]]
      ],
      mistakes:[["Notes copy every sentence","Select information needed for the task or discussion purpose."],["Acknowledging means agreeing","You can recognise a viewpoint before questioning or disagreeing."],["Response changes the topic","Link explicitly to the prior contribution and discussion question."],["Confident delivery substitutes for evidence","Support contributions with information, examples or reasoning."]],
      quick:["State a main point.","Record one task condition.","Acknowledge without agreeing.","Ask a clarifying question.","Synthesize two contributions."],
      mastery:["Listen for purpose","Record key information","Carry out multi-step tasks","Use productive discussion moves","Share and extend evidence-based ideas"],
      questions:{
        choice1:["Which response best acknowledges and extends another speaker?",["I understand your point about cost, and the long-term savings add another reason","No, you are wrong","I will discuss something else","I did not listen"]],
        fill1:["Complete the clarification stem.","Could you {{blank}} what you mean by that example?"],
        choice2:["What should notes mainly capture?",["key information needed for the purpose","every word spoken","only the listener’s opinions","unrelated details"]],
        explain:"Explain how a student can disagree with a speaker while still acknowledging the viewpoint and keeping discussion productive.",
        fill2:["Complete the synthesis stem.","Both ideas suggest that {{blank}}."],
        apply:"Listen to or imagine a short task explanation. Create a note format containing main action, sequence, materials, conditions and check points.",
        enrichment1:"Design and facilitate a discussion protocol that requires acknowledgement, evidence, clarification and synthesis. Explain how it prevents domination and topic drift.",
        enrichment2:"Compare two sets of listening notes for the same presentation—one exhaustive and one selective. Evaluate which better supports a specified task and revise both."
      }
    },
    AC9E4LY03:{
      slug:"ac9e4ly03-the-characteristic-features-used-in-imaginative-informative-and",
      title:"Features of Imaginative, Informative and Persuasive Texts",
      subtitle:"Identify purpose from connected structural, language and visual evidence",
      desc:"identify the characteristic features used in imaginative, informative and persuasive texts to meet the purpose of the text",
      learn:"Students identify characteristic—but adaptable—features of three broad text purposes and explain how structure, vocabulary, sentence choices, evidence and visuals work together.",
      modelTitle:"Compare feature patterns by purpose",
      modelType:"table",
      model:[["Purpose","Structure","Language","Visuals"],["imaginative","orientation–complication–resolution or adapted plot","imagery, dialogue, character viewpoint","illustration, framing, mood"],["informative","classification / sequence / explanation","technical terms, definitions, evidence","diagrams, captions, graphs"],["persuasive","position–reasons–evidence–call/action","evaluation, modality, audience address","salient image, slogan, evidence display"]],
      modelNote:"Texts may combine purposes. Classify from the dominant purpose and a pattern of features, not one heading or adjective.",
      applyTitle:"Analyse a hybrid text",
      applyType:"flow",
      apply:["identify main audience action","notice dominant structure","classify evidence and language","inspect visuals","identify secondary purpose","justify dominant purpose"],
      applyNote:"An informative webpage may persuade readers to act; a narrative may teach factual information. Explain which purpose controls most choices.",
      terms:[["imaginative text","text crafted to create literary experience or imagined worlds"],["informative text","text organised to explain, describe or report information"],["persuasive text","text designed to influence viewpoint or action"],["characteristic feature","common choice associated with a purpose"],["hybrid text","text combining more than one purpose or form"]],
      activities:[
        ["Feature bundle sort","Sort headings, sentence samples, images and structural stages into likely purpose bundles.","table",[["feature","possible purpose","evidence"],["labelled diagram","informative","shows parts"],["modal claim","persuasive","influences action"]]],
        ["Purpose transformation","Convert the same topic into a narrative opening, factual explanation and persuasive poster.","compare",[["imaginative","character faces polluted river"],["informative","causes and effects of pollution"],["persuasive","call to reduce litter"]]],
        ["Hybrid text debate","Identify dominant and secondary purposes in a documentary clip, historical fiction extract or campaign infographic.","flow",["audience outcome","structure","language","visuals","evidence","dominant purpose"]]
      ],
      mistakes:[["One feature determines purpose","Use a connected pattern."],["Persuasive texts contain no facts","Evidence can strengthen persuasion."],["Informative means completely neutral","Selection and framing still shape information."],["Hybrid means impossible to classify","Identify dominant purpose and secondary functions."]],
      quick:["Name three imaginative features.","Identify informative evidence.","Find persuasive modality.","Classify a hybrid text.","Justify dominant purpose."],
      mastery:["Recognise feature patterns","Connect features to purpose","Compare three broad types","Analyse multimodal choices","Explain hybrid purpose"],
      questions:{
        choice1:["Which feature bundle most strongly suggests a persuasive text?",["position, reasons, evidence and call to action","characters, climax and resolution only","definitions and labelled diagram only","chronological dates only"]],
        fill1:["Complete the informative pattern.","classification or explanation + technical vocabulary + labelled {{blank}}"],
        choice2:["What is the best way to classify a hybrid text?",["Identify the dominant purpose from the overall feature pattern","Choose whichever colour appears most","Assume only one purpose can exist","Use the title alone"]],
        explain:"Compare how an imaginative, informative and persuasive text could treat the same environmental topic.",
        fill2:["Complete the persuasive effect.","Modal verbs such as should and must can increase the force of a {{blank}}."],
        apply:"Analyse a multimodal text with both information and persuasion. Identify dominant purpose, secondary purpose and feature evidence.",
        enrichment1:"Create a hybrid text that informs through a narrative but also encourages action. Annotate how features serve each purpose without confusing the audience.",
        enrichment2:"Develop a feature-based classification test that handles atypical and hybrid texts. Apply it to three challenging examples and revise the criteria."
      }
    },
    AC9E4LY04:{
      slug:"ac9e4ly04-different-types-of-texts-integrating-phonic-semantic-and",
      title:"Accurate, Fluent and Self-correcting Reading",
      subtitle:"Integrate sound–letter, meaning and grammar knowledge across text types",
      desc:"read different types of texts, integrating phonic, semantic and grammatical knowledge to read accurately and fluently, re-reading and self-correcting when needed",
      learn:"Students coordinate decoding, morphology, vocabulary, syntax, punctuation and context, then monitor whether reading looks right, sounds grammatical and makes sense before self-correcting.",
      modelTitle:"Use multiple sources of information when reading",
      modelType:"table",
      model:[["Knowledge","Reader question","Example"],["phonic / orthographic","Do letter patterns support this pronunciation?","tion, igh, ph"],["morphological","Can I identify base, prefix or suffix?","un + predict + able"],["semantic","Does the word fit the meaning?","bank of river vs bank for money"],["grammatical","Does the sentence structure sound complete?","subject–verb agreement"],["text structure","What kind of information should come next?","step, evidence, resolution"]],
      modelNote:"No single cue is enough. Strong readers cross-check word evidence with sentence grammar and text meaning, then reread the corrected phrase fluently.",
      applyTitle:"Develop phrasing and expression",
      applyType:"compare",
      apply:[["Word-by-word","After / the / storm / the / river / rose"],["Meaningful phrasing","After the storm / the river rose rapidly."],["Punctuation cue","Pause at comma; lower voice at full stop"],["Dialogue cue","Use speaker, punctuation and mood"],["Technical text","slow for new term; maintain phrase meaning"]],
      applyNote:"Fluency combines accuracy, appropriate rate, phrasing and expression. Faster reading with lost meaning is not fluent.",
      terms:[["decoding","working from written patterns to spoken word"],["morphology","meaningful word parts and their relationships"],["fluency","accurate, appropriately paced and phrased reading"],["monitoring","checking whether reading makes sense"],["self-correction","independent repair after noticing mismatch"]],
      activities:[
        ["Three-check reading","At a deliberate error, ask: Does it look right, sound grammatical and make sense? Then repair.","flow",["notice mismatch","look at word parts","reread sentence","check meaning","correct","reread fluently"]],
        ["Phrase marking","Mark meaningful phrase groups and punctuation pauses in narrative, procedure and report extracts.","compare",[["narrative","dialogue and mood"],["procedure","command + object"],["report","technical noun groups"]]],
        ["Strategy reflection","Record an unfamiliar word, first attempt, clues used, correction and meaning confirmation.","table",[["word","word parts","sentence clue","correction","meaning"],["unpredictable","un + predict + able","","",""]]]
      ],
      mistakes:[["Guessing from picture or first letter","Use the complete written word and cross-check meaning."],["Fluency equals maximum speed","Accuracy, phrasing and comprehension are essential."],["Self-correction considered failure","Noticing and repairing is a skilled reading behaviour."],["Every unfamiliar word must be supplied by an adult","Teach a strategic sequence and allow productive effort."]],
      quick:["Decode a multisyllabic word.","Use morphology.","Mark phrase boundaries.","Explain a self-correction.","Compare fluency across text types."],
      mastery:["Integrate decoding cues","Use morphology and context","Read with meaningful phrasing","Monitor comprehension","Self-correct independently"],
      questions:{
        choice1:["What should a reader do after noticing a word does not fit the sentence?",["Recheck letter patterns, word parts, grammar and meaning, then reread","Keep the first guess","Skip every difficult word","Use the picture only"]],
        fill1:["Complete the monitoring check.","Does it look right, sound grammatical and make {{blank}}?"],
        choice2:["Which reading demonstrates fluency?",["accurate phrasing and expression that support meaning","fast reading with many substitutions","equal pause after every word","never rereading"]],
        explain:"Explain how phonic, semantic and grammatical knowledge work together when reading an unfamiliar word in a sentence.",
        fill2:["Complete the word analysis.","unpredictable = un + predict + {{blank}}"],
        apply:"Mark phrase groups in a short narrative and an informative sentence. Explain why phrasing differs by text type.",
        enrichment1:"Design a self-correction conference using a transcript of one reading error. Diagnose cues used and plan a targeted strategy.",
        enrichment2:"Compare two readers with similar accuracy but different phrasing and comprehension. Develop evidence-based fluency feedback for each."
      }
    },
    AC9E4LY05:{
      slug:"ac9e4ly05-comprehension-strategies-such-as-visualising-predicting",
      title:"Comprehension Strategies for Literal, Inferred and Evaluative Meaning",
      subtitle:"Visualise, predict, connect, summarise, monitor and question strategically",
      desc:"use comprehension strategies such as visualising, predicting, connecting, summarising, monitoring and questioning to build literal and inferred meaning, to expand topic knowledge and ideas, and evaluate texts",
      learn:"Students choose comprehension strategies for a purpose, combine stated information with evidence-based inference, update predictions and knowledge, monitor confusion and evaluate credibility or effectiveness.",
      modelTitle:"Use a strategy cycle rather than isolated tricks",
      modelType:"cycle",
      model:["set purpose and activate knowledge","predict / question","read or view closely","visualise / connect","monitor and repair","summarise","evaluate and update knowledge"],
      modelNote:"Strategies are tools, not worksheet labels. A reader selects, combines and revises them according to the text and question.",
      applyTitle:"Move from literal evidence to inference and evaluation",
      applyType:"evidence",
      apply:[["Literal clue","The character checks the locked door twice"],["Inference","She may feel unsafe or uncertain"],["Reasoning","Repeated checking suggests concern"],["Evaluation","The author builds tension effectively by delaying explanation"]],
      applyNote:"An inference is not copied directly, but it is anchored in evidence. Evaluation adds criteria such as credibility, clarity, effectiveness or fairness.",
      terms:[["literal meaning","information stated or directly shown"],["inference","meaning developed from clues and knowledge"],["monitoring","checking understanding and noticing confusion"],["summary","concise statement of central ideas"],["evaluation","evidence-based judgement using criteria"]],
      activities:[
        ["Strategy selection","Match reading goals to useful strategy combinations rather than applying every strategy every time.","table",[["goal","strategies"],["understand process","question + sequence + summarise"],["analyse character","infer + connect + evidence"],["check source","question + evaluate"]]],
        ["Prediction update log","Record prediction, evidence encountered, revision and final judgement.","flow",["initial prediction","new clue","confirm/challenge","revise","explain final view"]],
        ["Summary compression","Reduce a paragraph to one main idea and essential support, explaining what details were omitted.","compare",[["retell","many events"],["summary","central idea + essential support"],["evaluation","judgement + evidence"]]]
      ],
      mistakes:[["Prediction must be correct","It should be reasonable and revised when evidence changes."],["Connection becomes unrelated personal story","Explain how it deepens understanding of the text."],["Summary retells every detail","Prioritise central ideas and relationships."],["Inference is a guess","Cite clues and reasoning."],["Evaluation means liking","Use explicit criteria and evidence."]],
      quick:["State literal evidence.","Build an inference.","Update a prediction.","Summarise one paragraph.","Evaluate a source or craft choice."],
      mastery:["Choose strategies purposefully","Build evidence inferences","Monitor and repair","Summarise central ideas","Evaluate with criteria"],
      questions:{
        choice1:["Which statement is an inference?",["The character may be worried because she repeatedly checks the locked door","The door is locked","The text states she checks twice","The paragraph has four sentences"]],
        fill1:["Complete the inference relationship.","text clues + relevant knowledge + reasoning = {{blank}}"],
        choice2:["Which is a strong summary?",["A concise statement of the central idea and essential support","Every detail in original order","A personal opinion only","One copied sentence regardless of importance"]],
        explain:"Use literal clues and reasoning to infer a character’s motivation, then explain how you would check the inference later in the text.",
        fill2:["Complete the monitoring response.","When meaning breaks down, pause, identify the problem, reread and {{blank}} the strategy."],
        apply:"Select and apply three comprehension strategies to an informative or multimodal text. Explain why each was useful.",
        enrichment1:"Create a strategy decision tree for literal, inferential and evaluative questions. Test it on a complex text and revise weak branches.",
        enrichment2:"Compare two plausible inferences from ambiguous evidence. Evaluate which is better supported and identify evidence that could change the judgement."
      }
    },
    AC9E4LY06:{
      slug:"ac9e4ly06-plan-create-edit-and-publish-written-and-multimodal-imaginative",
      title:"Creating Written and Multimodal Texts",
      subtitle:"Plan, draft, revise, edit and publish for imaginative, informative and persuasive purposes",
      desc:"plan, create, edit and publish written and multimodal imaginative, informative and persuasive texts, using visual features, relevant linked ideas, complex sentences, appropriate tense, synonyms and antonyms, correct spelling of multisyllabic words and simple punctuation",
      learn:"Students manage a complete writing process, organise linked ideas into purposeful paragraphs, combine language and visuals, use controlled sentence and vocabulary choices and edit conventions before publishing for a real audience.",
      modelTitle:"Use a layered writing process",
      modelType:"cycle",
      model:["analyse purpose/audience","generate and organise ideas","draft structure and visuals","revise meaning/cohesion","edit language/spelling/punctuation","publish","reflect"],
      modelNote:"Revision and editing are different but connected. Writers may return to planning when feedback reveals a missing idea or unsuitable structure.",
      applyTitle:"Check features by purpose",
      applyType:"table",
      apply:[["Focus","Imaginative","Informative","Persuasive"],["organisation","plot and paragraphs","classification/explanation","position and reasons"],["language","imagery, dialogue","technical vocabulary","evaluation and modality"],["visuals","mood and viewpoint","diagram/caption","salient evidence/call"],["quality check","tense and character logic","accuracy and sources","credible evidence and audience"]],
      applyNote:"A checklist should not force every text into the same shape. Select features that serve the chosen purpose, mode and audience.",
      terms:[["planning","generating and organising content before or during drafting"],["revision","improving meaning, structure and cohesion"],["editing","checking sentence, spelling and punctuation accuracy"],["multimodal text","text combining modes such as words, images, sound or movement"],["publishing","preparing and sharing a finished text for an audience"]],
      activities:[
        ["Purpose planning board","Plan the same topic for three purposes, changing intended audience response, structure, evidence and visuals.","table",[["purpose","audience outcome","structure","visual"],["inform","understand","",""],["persuade","act","",""],["imagine","experience","",""]]],
        ["Revision layers","Review one draft first for ideas and structure, then cohesion and sentences, then conventions.","flow",["meaning","organisation","paragraph links","sentence control","vocabulary","spelling/punctuation","publish"]],
        ["Multimodal integration","Check whether each visual adds, explains or organises meaning and whether the written text refers to it appropriately.","compare",[["decorative","unrelated stock image"],["integrated","labelled diagram discussed in text"],["persuasive","evidence graphic supporting claim"]]]
      ],
      mistakes:[["First draft treated as final","Use feedback and revision to strengthen meaning."],["Editing begins before structure is solved","Address large-scale ideas first to avoid polishing deleted text."],["Visuals added after writing without purpose","Plan modes together and connect them."],["Complex sentence used only to sound advanced","Use clause relationships to express precise meaning."],["Spell-check assumed complete","Check homophones, names, context and intended words."]],
      quick:["Distinguish revise/edit.","Plan for one audience.","Link paragraphs.","Use a purposeful complex sentence.","Evaluate a visual feature."],
      mastery:["Plan by purpose/audience","Organise linked ideas","Integrate visual features","Revise and edit systematically","Publish accurate accessible texts"],
      questions:{
        choice1:["Which step focuses most on improving meaning and structure?",["revision","final spell-check only","printing the first draft","changing font colour"]],
        fill1:["Complete the writing process.","plan → draft → revise → {{blank}} → publish"],
        choice2:["Which visual is most integrated into an informative report?",["a labelled diagram referred to and explained in the text","an unrelated decoration","a picture with no caption","a repeated logo covering data"]],
        explain:"Explain how a writer should review an informative draft at meaning, paragraph, sentence and convention levels.",
        fill2:["Complete the cohesion principle.","Each paragraph develops one main idea and links logically to the {{blank}}."],
        apply:"Plan a multimodal text for one purpose and audience. Specify structure, paragraphs, complex sentences, vocabulary, visual features and editing checks.",
        enrichment1:"Create a publishing workflow for a collaborative multimodal text, including version control, source checking, accessibility and peer-review responsibilities.",
        enrichment2:"Compare two drafts with different strengths—one well organised but plain, one vivid but incoherent. Produce a revision plan that preserves strengths and resolves trade-offs."
      }
    }
  };

  window.SkillrYear4SubjectRegister("english", S, Object.keys(S));
})();
