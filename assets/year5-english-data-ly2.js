(() => {
  "use strict";
  if (!window.SkillrYear5Register) throw new Error("Year 5 curriculum base is not loaded.");
  const mk=(s)=>({...s,activities:s.activities||[
    {title:"Plan and annotate",text:`Plan the structure, language, visual or spelling choices central to ${s.title.toLowerCase()}.`,visual:s.modelVisual},
    {title:"Compare and revise",text:"Compare two drafts, performances or word analyses, identify high-impact differences and revise deliberately.",visual:s.applyVisual},
    {title:"Independent transfer",text:"Apply the process in a new task and use a checklist, evidence or reference source to verify the result.",visual:{type:"cards",data:(s.quick||[]).slice(0,4)}}
  ],mastery:s.mastery||["Plan for purpose","Use accurate structures and vocabulary","Integrate modes or conventions","Revise and verify","Communicate fluently"]});

  const S={
    AC9E5LY06:mk({
      slug:"ac9e5ly06-plan-create-edit-and-publish-written-and-multimodal-texts-whose",
      title:"Creating and Publishing Written and Multimodal Texts",
      subtitle:"Control paragraphs, sentence variety, verb groups, vocabulary, visuals and conventions",
      desc:"plan, create, edit and publish written and multimodal texts whose purposes may be imaginative, informative and persuasive, using paragraphs, a variety of sentence types, expanded verb groups, tense, topic-specific and precise vocabulary, punctuation and spelling",
      learn:"Students manage a recursive writing process, organise ideas for purpose, control paragraph and sentence relationships, expand verb groups for precision, integrate visual features and edit spelling and punctuation before publishing.",
      core:"Strong writing coordinates purpose, structure, language, evidence or imagery and presentation; revision improves meaning before final proofreading.",
      modelTitle:"Use a layered writing and publishing cycle",
      modelVisual:{type:"sequence",data:[["Analyse","purpose, audience, mode"],["Plan","ideas, evidence, structure, visual roles"],["Draft","paragraphs and sentence relationships"],["Revise","meaning, cohesion, precision, multimodal integration"],["Edit","tense, verb groups, punctuation, spelling"],["Publish","accessible format and sources"],["Reflect","audience response and next goal"]]},
      modelNote:"Writers loop between stages. A structural problem may require returning to planning even after a draft exists.",
      applyTitle:"Select features by text purpose",
      applyVisual:{type:"table",data:[["feature","imaginative","informative","persuasive"],["paragraphs","plot and viewpoint shifts","classification/explanation","reason/evidence sequence"],["verb groups","precise action and dialogue","process and causality","recommendation and modality"],["vocabulary","imagery and voice","technical precision","evaluation and audience address"],["visuals","mood/viewpoint","diagram/data","salience/call to action"]]},
      applyNote:"Not every advanced feature belongs in every text. Select what communicates this content to this audience.",
      terms:[["expanded verb group","main verb with auxiliaries or other elements adding tense, modality or aspect"],["revision","improvement of meaning, structure and cohesion"],["publishing","preparing a finished accessible text for its audience"]],
      mistakes:[["Editing begins with commas before ideas are organised","Resolve purpose and structure first."],["Complex sentence inserted only to sound advanced","Use it to express a genuine relationship."],["Visual repeats the full paragraph","Let modes divide or extend meaning."],["Spell-check considered complete proofreading","Check homophones, names and intended words."],["Publishing ignores source/accessibility needs","Include attribution, readable layout and alternatives."]],
      quick:["Plan for one audience.","Vary sentence type.","Expand a verb group.","Integrate a visual.","Separate revision/editing."],
      questions:{
        choice1:["Which stage focuses most on improving ideas and organisation?",["revision","printing","spell-check only","font selection alone"]],
        fill1:["Complete the process.","plan → draft → revise → {{blank}} → publish"],
        choice2:["Which visual is most integrated into an informative text?",["a labelled diagram discussed in the paragraph","an unrelated decoration","a repeated logo over data","an image with no caption or link"]],
        explain:"Explain how paragraph structure, sentence variety and expanded verb groups can work together in an explanation.",
        fill2:["Complete the publication check.","Check accuracy, source attribution, readability and {{blank}}."],
        apply:"Develop a complete plan for a multimodal text, including structure, paragraph purposes, sentence choices, visual roles and review stages.",
        enrichment1:"Create a publication workflow for a collaborative digital text with version control, fact checking, accessibility and peer review.",
        enrichment2:"Compare a well-organised plain draft and a vivid but incoherent draft. Build a revision that preserves each strength without combining weaknesses."
      }
    }),
    AC9E5LY07:mk({
      slug:"ac9e5ly07-plan-create-rehearse-and-deliver-oral-and-multimodal-presentations",
      title:"Oral and Multimodal Presentations",
      subtitle:"Develop elaborated ideas, sequence, visuals and controlled vocal delivery",
      desc:"plan, create, rehearse and deliver oral and multimodal presentations that include relevant, elaborated ideas, sequencing, and appropriate vocabulary and multimodal features, and use appropriate tone, pace, pitch and volume",
      learn:"Students organise presentations around a clear audience outcome, elaborate key ideas with evidence or examples, integrate readable visuals and rehearse tone, pace, pitch, volume, pronunciation, timing and transitions.",
      core:"A presentation succeeds when structure is audible, visuals support rather than duplicate speech and delivery choices help the audience process meaning.",
      modelTitle:"Storyboard the presentation before making slides",
      modelVisual:{type:"table",data:[["section","spoken purpose","visual support"],["opening","hook, purpose, roadmap","title and one compelling image"],["idea 1","claim or key information + evidence","diagram or data"],["idea 2","elaboration and connection","comparison visual"],["response/implication","address question or significance","brief cue"],["closing","synthesise and invite action/thought","one memorable takeaway"]]},
      modelNote:"A slide is not the script. Use key phrases and visuals so the speaker can explain and maintain audience connection.",
      applyTitle:"Use rehearsal evidence to revise delivery",
      applyVisual:{type:"compare",data:[["pace too fast","listeners miss evidence; add pause and reduce content"],["volume inconsistent","test room distance and microphone"],["flat pitch","mark contrast and key words"],["overcrowded slide","reduce to visual + cues"],["timing long","prioritise essential ideas"]]},
      applyNote:"Record or peer-review one rehearsal using criteria. Change content or visuals when delivery problems reveal structural overload.",
      terms:[["elaboration","detail, example or evidence developing an idea"],["signposting","language making structure and transitions explicit"],["delivery","controlled use of voice, body and timing"]],
      mistakes:[["Confident voice replaces evidence","Develop ideas with support."],["Slides contain full script","Use visuals and concise cues."],["Maximum volume considered engaging","Control audibility and emphasis."],["Rehearsal means memorising only","Test timing, transitions, visuals and understanding."],["Every animation retained","Use movement only when it guides attention."]],
      quick:["Plan a roadmap.","Elaborate one idea.","Use a signpost.","Reduce slide text.","Set a delivery goal."],
      questions:{
        choice1:["Which slide best supports spoken explanation?",["A labelled diagram with a concise heading","A full page of tiny script","An unrelated animation","A blank slide with no purpose"]],
        fill1:["Complete the structure signal.","First I will explain…, next…, and finally {{blank}}."],
        choice2:["Which rehearsal evidence should trigger revision?",["Listeners cannot identify the main point","The speaker uses an appropriate pause","The visual is readable","The timing meets the limit"]],
        explain:"Explain how tone, pace, pitch and volume should be controlled for one presentation purpose.",
        fill2:["Complete the elaboration structure.","key idea + example or evidence + {{blank}}"],
        apply:"Create a presentation storyboard with spoken sections, visual roles, transitions and rehearsal criteria.",
        enrichment1:"Design a five-minute presentation that deliberately changes pace and mode at key points. Justify every change.",
        enrichment2:"Evaluate two presentations—one polished but shallow and one well evidenced but hard to follow—and create targeted improvement plans."
      }
    }),
    AC9E5LY08:mk({
      slug:"ac9e5ly08-words-using-clearly-formed-joined-letters-that-develop-fluency",
      title:"Fluent Joined Handwriting",
      subtitle:"Develop legible automatic movement that remains sustainable in real writing",
      desc:"write words using clearly formed joined letters that develop fluency and automaticity",
      learn:"Students consolidate approved joins, consistent formation, size, spacing and alignment while increasing sustainable pace and transferring automatic movements into extended meaningful writing.",
      core:"Handwriting fluency balances automatic movement, legibility, comfort and a pace suitable for the task.",
      modelTitle:"Monitor fluency with legibility evidence",
      modelVisual:{type:"table",data:[["feature","evidence"],["formation","letters remain recognisable at normal pace"],["joins","approved patterns do not distort letters"],["size/alignment","body letters, ascenders and descenders are consistent"],["spacing","words are distinct without excessive gaps"],["effort","grip and posture allow sustained writing"],["pace","notes and final presentation use suitable speeds"]]},
      modelNote:"Automaticity comes from accurate repetition and transfer, not from rushing. Some letter pairs may remain unjoined according to the taught style.",
      applyTitle:"Choose a targeted practice loop",
      applyVisual:{type:"flow",data:["identify one high-impact issue","model movement slowly","practise short pattern","use in words","use in sentence","write authentic paragraph","compare before/after"]},
      applyNote:"Persistent pain, fatigue or access needs require adjustments or alternative tools rather than simply more practice.",
      terms:[["automaticity","accurate production with reduced conscious effort"],["legibility","ease with which writing can be read"],["baseline","line on which most letters sit"]],
      mistakes:[["Every letter must join","Follow the approved style and preserve clarity."],["Fastest speed equals fluency","Sustainable readable pace matters."],["Practice stays in isolated patterns","Transfer to words and paragraphs."],["Heavy pressure improves control","It increases fatigue."],["Same target given to every learner","Diagnose one specific need."]],
      quick:["Check formation.","Evaluate joins.","Measure sustainable pace.","Choose one target.","Transfer into paragraph."],
      questions:{
        choice1:["Which best defines handwriting automaticity?",["Accurate movement requiring less conscious attention","Maximum speed regardless of readability","Joining every letter","Never reviewing formation"]],
        fill1:["Complete the alignment term.","Most letters sit on the {{blank}}."],
        choice2:["Which practice is most effective?",["Target one movement, then transfer it into meaningful writing","Copy long pages as fast as possible","Use excessive pressure","Practise only isolated loops forever"]],
        explain:"Explain how a writer can increase pace without sacrificing formation, spacing or comfort.",
        fill2:["Complete the fluency balance.","pace + legibility + comfort + {{blank}}"],
        apply:"Create a targeted improvement plan for writing that is neat but slow, or fast but inconsistent.",
        enrichment1:"Develop a method for measuring handwriting fluency that does not reward speed alone.",
        enrichment2:"Compare handwriting and keyboarding for note-taking, drafting and final presentation, considering access and cognition."
      }
    }),
    AC9E5LY09:mk({
      slug:"ac9e5ly09-phoneme-grapheme-sound-letter-relationships-morphemic-knowledge-and-context",
      title:"Reading and Spelling Complex Multisyllabic Words",
      subtitle:"Coordinate phoneme–grapheme patterns, morphemes, vocabulary and context",
      desc:"use phonic, morphemic and vocabulary knowledge to read and spell multisyllabic words with more complex letter patterns",
      learn:"Students analyse complex words through syllables, graphemes, bases, prefixes, suffixes and word meaning, then verify pronunciation and spelling in sentence context and related word families.",
      core:"Long-word reading and spelling require both sound structure and meaningful word structure; neither alone explains every pattern.",
      modelTitle:"Analyse ‘misinterpretation’ in layers",
      modelVisual:{type:"table",data:[["layer","analysis"],["morphemes","mis + interpret + ation"],["syllables","mis–in–ter–pre–ta–tion"],["graphemes","tion represents /shun/"],["meaning","an incorrect or mistaken interpretation"],["family","interpret, interpreter, interpretation"]]},
      modelNote:"Morpheme and syllable boundaries may not align. Use morphology for meaning and spelling, phonology for pronunciation and context for confirmation.",
      applyTitle:"Use a strategic long-word routine",
      applyVisual:{type:"flow",data:["scan prefixes/suffixes","locate likely base","mark vowel/grapheme patterns","blend syllables","read full sentence","check meaning and grammar","adjust","record word family"]},
      applyNote:"Context narrows possibilities but should not replace close attention to every important written part.",
      terms:[["phoneme–grapheme relationship","connection between spoken sound and written pattern"],["morpheme","smallest meaningful unit"],["word family","related words sharing a base or origin"]],
      mistakes:[["Word split after every vowel letter","Use spoken syllables and grapheme patterns."],["Morpheme boundary forced to match syllable","They serve different purposes."],["Context guess ignores middle/end of word","Cross-check complete spelling."],["Pronunciation found but meaning ignored","Confirm the word fits sentence and family."]],
      quick:["Find base/affixes.","Mark syllables.","Identify grapheme.","Use word family.","Confirm in context."],
      questions:{
        choice1:["What is the base in misinterpretation?",["interpret","mis","ation","interpretation only"]],
        fill1:["Complete the morpheme structure.","misinterpretation = mis + interpret + {{blank}}"],
        choice2:["Which statement is correct?",["Morpheme and syllable boundaries may differ","Every vowel is a syllable","Context replaces decoding","Prefixes have no meaning"]],
        explain:"Analyse misinterpretation by morphemes, syllables, graphemes and meaning.",
        fill2:["Complete the checking sequence.","analyse → blend → read sentence → confirm meaning and {{blank}}"],
        apply:"Use the full routine on an unfamiliar curriculum word and explain which clue was most useful.",
        enrichment1:"Build a word-family network showing pronunciation, stress and spelling changes across at least ten related words.",
        enrichment2:"Compare two multisyllabic words where sound-based spelling alone would fail. Explain the morphological support."
      }
    }),
    AC9E5LY10:mk({
      slug:"ac9e5ly10-knowledge-of-known-word-origins-base-words-prefixes-suffixes-letter",
      title:"Word Origins, Morphology and Spelling Generalisations",
      subtitle:"Use etymology, bases, affixes and patterns to read and spell unfamiliar words",
      desc:"use knowledge of known word origins, base words, prefixes, suffixes, letter patterns and spelling generalisations to spell and read unfamiliar words",
      learn:"Students choose among phonological, orthographic, morphological and etymological strategies, apply spelling generalisations with conditions and use related words and reliable references to verify exceptions.",
      core:"English spelling records sound, meaning and history; effective spellers select evidence from all three systems.",
      modelTitle:"Explain spelling through multiple evidence sources",
      modelVisual:{type:"table",data:[["word","evidence"],["photograph","Greek photo ‘light’ + graph ‘write’; ph=/f/"],["transport","trans ‘across’ + port ‘carry’"],["decision","decide family preserves meaning despite pronunciation change"],["happiness","happy + ness; y changes to i"],["running","double consonant under short stressed vowel condition"]]},
      modelNote:"Word origins are useful when they reveal recurring meaning and spelling patterns, not as isolated trivia.",
      applyTitle:"Use a spelling decision process",
      applyVisual:{type:"flow",data:["say and segment","identify base/affixes","apply suffix generalisation","compare word family","consider origin pattern","write","verify in context/reference","record exception"]},
      applyNote:"Generalisations have conditions and exceptions. A dictionary or trusted word source is part of independent verification, not evidence of failure.",
      terms:[["etymology","history and origin of a word"],["orthographic pattern","recurring convention in written words"],["spelling generalisation","pattern applying under stated conditions"]],
      mistakes:[["Spell only by sound","Meaning and history preserve letters."],["Rule applied without checking conditions","Stress, syllables and suffix type matter."],["Origin memorised without transfer","Connect roots to families and meanings."],["Related word ignored because pronunciation differs","Morphology often preserves spelling."],["Reference use considered cheating","Verification is a skilled strategy."]],
      quick:["Identify base/affixes.","Apply doubling condition.","Use origin clue.","Find related word.","Verify exception."],
      questions:{
        choice1:["Which related word helps explain the spelling of decision?",["decide","division","desire","design only"]],
        fill1:["Complete the origin meaning.","The root trans often means {{blank}} or across."],
        choice2:["Which spelling is correct?",["running","runing","hopeing","happyness"]],
        explain:"Explain the spelling of photograph using sound, morphemes and word origin.",
        fill2:["Complete the suffix change.","happy + ness = {{blank}}"],
        apply:"Select three unfamiliar words and justify spelling using different combinations of sound, morphology, pattern and origin.",
        enrichment1:"Create an etymological family map for one productive root and explain how meaning supports spelling across subjects.",
        enrichment2:"Evaluate two competing spelling strategies for an exception-rich word set and design a flexible decision guide."
      }
    })
  };

  window.SkillrYear5Register("english",S,Object.keys(S));
})();
