(() => {
  "use strict";
  if (!window.SkillrYear4SubjectRegister) throw new Error("Year 4 subject data base is not loaded.");

  const S = {
    AC9E4LA07:{
      slug:"ac9e4la07-investigate-how-quoted-direct-and-reported-indirect-speech-are",
      title:"Quoted and Reported Speech",
      subtitle:"Compare direct wording with reported meaning and track changes in pronouns, tense and punctuation",
      desc:"investigate how quoted (direct) and reported (indirect) speech are used",
      learn:"Students distinguish speech presented as a speaker’s exact words from speech reported by a narrator, then transform between forms while preserving meaning and adjusting punctuation, pronouns, tense and time references.",
      modelTitle:"Transform direct speech into reported speech",
      modelType:"table",
      model:[["Quoted speech","Reported speech","Changes"],["Mia said, “I am ready now.”","Mia said that she was ready then.","I→she; am→was; now→then"],["“We will return tomorrow,” they said.","They said that they would return the next day.","will→would; tomorrow→next day"]],
      modelNote:"Quoted speech presents wording as spoken and uses quotation punctuation. Reported speech integrates the message into the reporter’s grammar and may shift viewpoint or time reference.",
      applyTitle:"Choose a form for purpose and effect",
      applyType:"compare",
      apply:[["Direct quotation","captures voice, exact wording or dramatic moment"],["Reported speech","summarises information efficiently"],["Mixed report","quotes a key phrase and reports the remaining detail"],["Evidence check","do not invent exact wording when only a summary is known"]],
      applyNote:"Writers choose forms strategically. Exact quotation carries responsibility: the wording and speaker attribution must be accurate.",
      terms:[["quoted speech","speaker’s words presented directly within quotation marks"],["reported speech","speaker’s message retold within the reporter’s sentence"],["reporting clause","clause identifying the speaker and speech process"],["attribution","identification of who spoke"],["viewpoint shift","change in pronoun, tense or time reference from speaker to reporter"]],
      activities:[
        ["Speech transformation","Convert short quotations to reported speech and underline every grammatical change.","flow",["identify speaker","preserve message","shift pronouns","adjust tense/time","remove quotation marks","check meaning"]],
        ["Purpose choice","Choose direct, reported or mixed speech for a news report, narrative scene and meeting summary.","table",[["purpose","best form","reason"],["dramatic scene","direct","voice"],["summary","reported","concise"],["key claim","mixed","accuracy + efficiency"]]],
        ["Accuracy audit","Compare a quotation with a reported version and identify additions, omissions or viewpoint distortions.","compare",[["original","I might arrive late"],["accurate report","She said she might arrive late"],["distorted","She promised to arrive late"]]]
      ],
      mistakes:[["Reported speech copies the quotation unchanged","Pronouns, tense and time references may need adjustment."],["Every spoken idea needs quotation marks","Reported speech normally uses no quotation marks around the message."],["Reporting verb does not matter","Said, claimed, admitted and promised suggest different meanings."],["Quotation wording may be improved silently","Direct quotation should preserve the original wording or show omissions transparently."]],
      quick:["Identify direct and reported speech.","Shift I to she/he appropriately.","Change now to then in context.","Choose a reporting verb.","Explain when direct quotation is preferable."],
      mastery:["Recognise both forms","Transform accurately","Use quotation punctuation","Track viewpoint/time shifts","Choose form for purpose"],
      questions:{
        choice1:["Which sentence uses reported speech?",["Mia said that she was ready.","Mia said, “I am ready.”","“I am ready,” Mia said.","Ready!"]],
        fill1:["Complete the viewpoint shift.","Mia said, “I am ready now.” → Mia said that {{blank}} was ready then."],
        choice2:["Which reporting verb most strongly suggests a commitment?",["promised","said","whispered","asked"]],
        explain:"Transform ‘We will return tomorrow,’ they said, into reported speech and explain every change.",
        fill2:["Complete the time shift.","tomorrow may become the {{blank}} day in reported speech."],
        apply:"Choose direct or reported speech for three moments in a short news report and justify each choice.",
        enrichment1:"Write a short scene that alternates direct and reported speech for deliberate effects. Annotate voice, pace and information choices.",
        enrichment2:"Evaluate two reports of the same quotation, one accurate and one subtly distorted through reporting verbs and omissions. Explain the ethical and meaning effects."
      }
    },
    AC9E4LA08:{
      slug:"ac9e4la08-how-adverb-groups-phrases-and-prepositional-phrases-work-in",
      title:"Adverb Groups and Prepositional Phrases",
      subtitle:"Add precise details about time, place, manner, cause and condition",
      desc:"understand how adverb groups/phrases and prepositional phrases work in different ways to provide circumstantial details about an activity",
      learn:"Students identify and create groups of words that add circumstances to a clause, distinguishing what the phrase modifies and using placement to control clarity, rhythm and emphasis.",
      modelTitle:"Expand one clause with different circumstances",
      modelType:"table",
      model:[["Base clause","Circumstance","Expanded clause"],["The fox waited.","place","The fox waited beside the fallen log."],["The fox waited.","time","Before sunrise, the fox waited."],["The fox waited.","manner","The fox waited with complete stillness."],["The fox waited.","cause","Because of the noise, the fox waited."]],
      modelNote:"A prepositional phrase often begins with a preposition and a noun group. An adverb group can be one word or several words. Both may provide circumstantial detail, but their grammatical form differs.",
      applyTitle:"Move a circumstance to change emphasis",
      applyType:"compare",
      apply:[["At the edge of the field, the hikers stopped.","place is foregrounded"],["The hikers stopped at the edge of the field.","action is foregrounded"],["Without warning, the lights failed.","sudden circumstance emphasised"],["The lights failed without warning.","event first, circumstance second"]],
      applyNote:"Moving a phrase can change emphasis and punctuation without changing the central event. Check that the phrase clearly attaches to the intended action or participant.",
      terms:[["adverb group","one or more words functioning adverbially"],["prepositional phrase","phrase beginning with a preposition and typically a noun group"],["circumstance","detail about when, where, how, why or under what conditions"],["modifier","word or group adding information to another element"],["attachment","relationship showing which action or participant a phrase modifies"]],
      activities:[
        ["Circumstance sort","Sort phrases by time, place, manner, cause and condition, then justify ambiguous examples.","compare",[["time","before sunrise"],["place","beside the log"],["manner","with great care"],["cause","because of the storm"]]],
        ["Sentence expansion","Expand a plain clause with two compatible circumstances without overloading it.","sentence",[["time","After lunch"],["clause","the class investigated friction"],["place","on the playground"],["manner","carefully"]]],
        ["Misattachment repair","Move or rewrite a phrase that accidentally seems to describe the wrong participant.","compare",[["unclear","Walking to school, the rain soaked Priya"],["clear","While Priya walked to school, the rain soaked her"]]]
      ],
      mistakes:[["Every phrase beginning with -ly is required","Many adverbs do not end in -ly, and prepositional phrases add circumstances too."],["Longer sentence is automatically better","Select details that serve meaning and avoid overload."],["Phrase attachment ignored","Place the phrase where its relationship is clear."],["Form and function confused","A prepositional phrase can function adverbially, but it is still structurally a prepositional phrase."]],
      quick:["Identify a place phrase.","Add a manner circumstance.","Move a phrase for emphasis.","Repair a dangling opener.","Distinguish form and function."],
      mastery:["Identify circumstance types","Recognise phrase forms","Expand clauses precisely","Control placement and emphasis","Repair ambiguous attachment"],
      questions:{
        choice1:["Which phrase provides a place circumstance?",["beside the fallen log","before sunrise","with great care","because of the noise"]],
        fill1:["Complete the prepositional phrase.","The hikers stopped {{blank}} the edge of the field."],
        choice2:["Which sentence has the clearest phrase attachment?",["While Priya walked to school, the rain soaked her.","Walking to school, the rain soaked Priya.","The rain, walking to school, soaked Priya.","Walking, the school was rainy."]],
        explain:"Compare ‘Before sunrise, the fox waited’ and ‘The fox waited before sunrise’. Explain the difference in emphasis.",
        fill2:["Complete the manner detail.","The scientist measured the water with great {{blank}}."],
        apply:"Expand ‘The children searched’ with time, place and manner details, then revise to avoid overcrowding.",
        enrichment1:"Write four versions of one clause that foreground different circumstances. Analyse punctuation, rhythm and emphasis.",
        enrichment2:"Find or create three ambiguous phrase attachments. Diagnose the unintended meaning and produce more than one valid repair."
      }
    },
    AC9E4LA09:{
      slug:"ac9e4la09-past-present-and-future-tenses-and-their-impact-on-meaning",
      title:"Tense and Its Impact on Meaning",
      subtitle:"Control time, sequence, viewpoint and consistency across sentences",
      desc:"understand past, present and future tenses and their impact on meaning in a sentence",
      learn:"Students identify verb tense and aspect, maintain logical time relationships, use tense shifts deliberately and explain how tense influences immediacy, sequence and certainty.",
      modelTitle:"Compare one event across time",
      modelType:"table",
      model:[["Tense","Example","Meaning effect"],["past","The river rose overnight.","completed before now"],["present","The river rises after heavy rain.","general pattern"],["present progressive","The river is rising.","happening now"],["future","The river will rise if rain continues.","predicted after now"]],
      modelNote:"Tense locates events in time; aspect shows how an event unfolds or relates to another time. Writers choose forms for meaning, not simply to make every verb match.",
      applyTitle:"Control tense across a paragraph",
      applyType:"compare",
      apply:[["Consistent recount","We entered, measured and recorded."],["Unclear shift","We entered, measure and recorded."],["Deliberate shift","The expedition ended in 1914. Today, researchers still study its records."],["Conditional future","If the rain continues, the river will rise."]],
      applyNote:"A tense shift is correct when the time frame changes clearly. Use time markers and consistent verb forms to help readers follow the relationship.",
      terms:[["tense","grammar system locating processes in time"],["past tense","locates a process before the reference time"],["present tense","locates a process now or presents it as general"],["future expression","uses forms such as will or going to for later time"],["aspect","shows whether a process is ongoing, completed or related to another time"]],
      activities:[
        ["Timeline annotate","Place verbs on a timeline and explain general present versus present action.","flow",["before now","reference time","now","after now","conditional future"]],
        ["Tense consistency edit","Repair accidental shifts in recounts, reports and narratives while preserving deliberate changes.","table",[["text purpose","usual choice"],["recount","past"],["general explanation","present"],["prediction","future / modal"]]],
        ["Meaning comparison","Change tense in a sentence and discuss how certainty, immediacy or sequence changes.","compare",[["The team wins","present / commentary"],["The team won","completed"],["The team will win","prediction"]]]
      ],
      mistakes:[["Every verb in a text must use one tense","Tense can shift when the time frame changes clearly."],["Future tense is only will","English expresses future time through several constructions and context."],["Present tense means this exact moment","It can also express habits, general truths and narratives."],["Irregular past forms forced into -ed","Use forms such as went, saw and wrote correctly."]],
      quick:["Identify tense and time effect.","Repair an accidental shift.","Use present for a general pattern.","Write a conditional future.","Explain a deliberate tense change."],
      mastery:["Recognise tense forms","Maintain consistency","Use deliberate shifts","Express general/predicted meaning","Explain tense effects"],
      questions:{
        choice1:["Which sentence expresses a general present pattern?",["The river rises after heavy rain.","The river rose last night.","The river will rise tomorrow.","The river had risen before dawn."]],
        fill1:["Complete the future prediction.","If the rain continues, the river {{blank}} rise."],
        choice2:["Which sentence contains an accidental tense shift?",["We entered the room, measure the table and recorded the result.","We entered, measured and recorded.","Yesterday we measured; today we compare.","The river rises after rain."]],
        explain:"Explain the meaning difference between ‘The river rose’, ‘The river rises’ and ‘The river is rising’. ",
        fill2:["Complete the consistent recount.","The group entered, measured and {{blank}} the results."],
        apply:"Edit a paragraph containing two accidental tense shifts and one deliberate present-day comment. Explain which changes you made and why.",
        enrichment1:"Write a short text that moves deliberately from historical past to present significance and future prediction. Signal every time shift clearly.",
        enrichment2:"Compare tense choices in a news report, scientific explanation and narrative. Analyse how each choice shapes authority, immediacy and reader expectations."
      }
    },
    AC9E4LA10:{
      slug:"ac9e4la10-the-effect-of-choices-when-framing-an-image-placement-of",
      title:"Framing, Placement and Salience in Images",
      subtitle:"Analyse how visual composition guides attention and constructs meaning",
      desc:"explore the effect of choices when framing an image, placement of elements in the image and salience on composition of still and moving images in texts",
      learn:"Students analyse how distance, angle, cropping, foreground/background, size, contrast, focus and movement make elements more or less salient and shape audience interpretation.",
      modelTitle:"Read visual composition as a set of choices",
      modelType:"table",
      model:[["Choice","Possible effect"],["close-up framing","emphasises expression or detail"],["low angle","may suggest power or importance"],["central placement","signals focus or stability"],["high contrast / sharp focus","increases salience"],["cropping","includes some information and excludes other context"]],
      modelNote:"Visual effects are possibilities, not automatic rules. Interpretation should cite specific composition evidence and consider genre, accompanying words and audience.",
      applyTitle:"Compare two framings of the same event",
      applyType:"compare",
      apply:[["Wide shot","shows setting, relationships and context"],["Close-up","emphasises one face or object"],["Foreground object","appears immediate or important"],["Background object","may seem distant or less salient"],["Moving camera / edit","controls sequence, pace and reveal"]],
      applyNote:"The same event can be represented differently without changing every factual detail. Ask what viewers notice first, what is excluded and whose viewpoint is privileged.",
      terms:[["framing","selection and boundary of what appears in an image"],["salience","degree to which an element attracts attention"],["composition","arrangement of visual elements"],["camera angle","viewpoint from above, below or level"],["cropping","removal or exclusion of parts of an image"]],
      activities:[
        ["First-look test","Show an image briefly, record what viewers notice first and connect responses to size, contrast, placement or focus.","flow",["view briefly","record first notice","identify visual cue","compare viewers","explain salience"]],
        ["Reframe a scene","Sketch wide, medium and close-up versions of the same event and annotate information gained or lost.","compare",[["wide","context"],["medium","relationships"],["close-up","detail / emotion"]]],
        ["Image-and-caption analysis","Change a caption or crop and discuss how the combined representation shifts interpretation.","table",[["visual choice","caption choice","combined effect"],["crowded frame","‘Community gathers’","participation"],["tight conflict crop","‘Tension rises’","drama"]]]
      ],
      mistakes:[["Central means objectively most important","Placement creates emphasis; importance is constructed within the text."],["Image meaning is universal","Viewers use context and cultural knowledge, so claims need evidence and caution."],["Cropping only improves neatness","It can remove important context and alter interpretation."],["One visual feature analysed alone","Composition works through combinations of framing, placement, colour, focus and words."]],
      quick:["Identify the most salient element.","Explain a close-up effect.","Compare high and low angle.","State what a crop excludes.","Connect caption and image meaning."],
      mastery:["Identify composition choices","Explain salience","Compare framings","Use visual evidence","Evaluate inclusion and viewpoint"],
      questions:{
        choice1:["Which choice most directly increases an object’s salience?",["making it large, high-contrast and sharply focused","placing it faintly behind several elements","cropping it out","making every element identical"]],
        fill1:["Complete the framing effect.","A close-up often emphasises facial expression or fine {{blank}}."],
        choice2:["What can a wide shot add?",["setting and relationships between elements","only one tiny detail","a guaranteed objective meaning","no context"]],
        explain:"Compare how a low-angle close-up and a level wide shot could portray the same character differently.",
        fill2:["Complete the critical question.","Cropping changes what viewers see and what context is {{blank}}."],
        apply:"Analyse an advertisement or news image using framing, placement, salience and caption evidence. Avoid assuming the effect is universal.",
        enrichment1:"Create three compositions of the same event for different purposes. Annotate framing, salience, viewpoint and likely audience effects.",
        enrichment2:"Evaluate how a still image and a short moving-image sequence represent the same subject. Include camera movement, editing, timing and visual hierarchy."
      }
    },
    AC9E4LA11:{
      slug:"ac9e4la11-expand-vocabulary-by-exploring-a-range-of-synonyms-and-antonyms",
      title:"Synonyms, Antonyms and Precise Vocabulary",
      subtitle:"Choose words by meaning, connotation, intensity, register and context",
      desc:"expand vocabulary by exploring a range of synonyms and antonyms, and using words encountered in a range of sources",
      learn:"Students build word networks, recognise that synonyms are rarely interchangeable in every context and select vocabulary for precision, tone, intensity and audience.",
      modelTitle:"Build a graded synonym scale",
      modelType:"flow",
      model:["look","glance","watch","stare","glare"],
      modelNote:"These words share a broad field but differ in duration, intensity, intention and emotional connotation. Vocabulary growth comes from comparing contexts, not memorising lists alone.",
      applyTitle:"Use antonyms and morphology to clarify meaning",
      applyType:"table",
      apply:[["Word","Possible antonym","Context note"],["scarce","abundant","amount"],["flexible","rigid","material property"],["reluctant","eager","attitude"],["visible","invisible","prefix changes meaning"]],
      applyNote:"An antonym depends on the sense used. The opposite of light may be dark in colour, heavy in mass or serious in tone; context decides.",
      terms:[["synonym","word with a similar but not always identical meaning"],["antonym","word with an opposing meaning in a particular sense"],["connotation","associated feeling or idea beyond literal meaning"],["register","vocabulary style suited to a situation"],["word family","related words sharing a base or origin"]],
      activities:[
        ["Word intensity line","Order near-synonyms from weak to strong and justify disputed positions with sentence contexts.","flow",["annoyed","irritated","angry","furious"]],
        ["Context substitution","Replace a word with three synonyms and decide which preserves meaning, tone and register.","compare",[["said","whispered"],["said","announced"],["said","muttered"]]],
        ["Source word notebook","Record a new word from reading with definition, context sentence, morphology, synonym, antonym and original use.","table",[["word","source context","meaning","family","new sentence"],["reluctant","","","",""]]]
      ],
      mistakes:[["Synonyms are exact replacements","They differ in connotation, collocation, intensity and register."],["Antonym is fixed regardless of meaning","Choose the relevant sense in context."],["Longer word is always better","Precision and natural use matter more than complexity."],["Dictionary definition alone proves understanding","Use the word accurately in a new context and connect it to a word network."]],
      quick:["Order three synonyms by intensity.","Explain connotation.","Choose an antonym in context.","Identify an unsuitable register.","Use a new word accurately."],
      mastery:["Build synonym networks","Select contextual antonyms","Explain intensity/connotation","Adapt register","Transfer new vocabulary"],
      questions:{
        choice1:["Which word suggests the most intense anger?",["furious","annoyed","calm","mild"]],
        fill1:["Complete the vocabulary principle.","Synonyms share similar meanings but may differ in intensity, connotation and {{blank}}."],
        choice2:["Which is the most suitable antonym of flexible when describing a material?",["rigid","friendly","bright","silent"]],
        explain:"Compare glance, watch, stare and glare. Explain differences in duration, intention or emotion.",
        fill2:["Complete the context meaning.","The opposite of light can be heavy when light refers to {{blank}}."],
        apply:"Replace three vague words in a paragraph with more precise vocabulary, then justify why each replacement suits tone and context.",
        enrichment1:"Build a semantic map for one common word with synonyms, antonyms, collocations, connotations, morphology and register labels.",
        enrichment2:"Analyse a passage where a technically correct synonym creates the wrong tone. Produce two revisions for different audiences and explain the choices."
      }
    },
    AC9E4LA12:{
      slug:"ac9e4la12-that-punctuation-signals-dialogue-through-quotation-marks-and",
      title:"Punctuating Dialogue",
      subtitle:"Use quotation marks, capitals, commas, boundary punctuation and new-speaker paragraphs",
      desc:"understand that punctuation signals dialogue through quotation marks and that dialogue follows conventions for the use of capital letters, commas and boundary punctuation",
      learn:"Students punctuate spoken words and reporting clauses, distinguish punctuation belonging inside the quotation from sentence punctuation and organise changes of speaker into clear paragraphs.",
      modelTitle:"Build dialogue punctuation around the spoken words",
      modelType:"table",
      model:[["Pattern","Example"],["speech then tag","“We should leave now,” Ava said."],["tag then speech","Ava said, “We should leave now.”"],["question then tag","“Should we leave now?” Ava asked."],["split quotation","“We should,” Ava said, “leave before dark.”"],["new speaker","begin a new paragraph"]],
      modelNote:"The spoken words begin with a capital when they form a sentence. A comma often separates a statement from its reporting tag; a question mark or exclamation mark replaces that comma when required by the speech.",
      applyTitle:"Use dialogue to develop action and character",
      applyType:"compare",
      apply:[["Flat","“I am worried,” Kai said."],["Developed","“Did you hear that?” Kai whispered, stepping back."],["Overloaded","“I am really extremely very worried!” Kai shouted loudly."],["Effective choice","precise speech verb, action and punctuation"]],
      applyNote:"Correct punctuation supports meaning, but dialogue also needs purpose. Avoid using reporting verbs and adverbs that repeat what the spoken words already show.",
      terms:[["quotation marks","punctuation enclosing directly spoken words"],["reporting clause","clause identifying speaker and speech process"],["boundary punctuation","full stop, question mark or exclamation mark ending a sentence"],["speech tag","short reporting clause attached to dialogue"],["new-speaker paragraph","paragraph break signalling a change of speaker"]],
      activities:[
        ["Dialogue rebuild","Arrange speech, reporting clause and punctuation cards into several valid patterns.","flow",["opening quote","capital","spoken words","internal punctuation","closing quote","reporting clause"]],
        ["Speaker paragraphing","Format an unbroken two-person conversation so each change of speaker is clear.","compare",[["unclear","all speakers in one paragraph"],["clear","new paragraph for each speaker change"]]],
        ["Purposeful dialogue edit","Reduce repetitive said-adverb combinations and add action only where it develops setting, character or pace.","table",[["draft","revision"],["said loudly","shouted"],["said quietly","whispered"],["said angrily","snapped / action evidence"]]]
      ],
      mistakes:[["Comma placed outside closing quotation marks in this convention","Place the comma before the closing quotation mark when it belongs to the speech-tag pattern."],["Question mark followed by a capitalised tag","The reporting clause continues the sentence: ‘?’ she asked."],["New quotation mark for every line of wrapped text","Wrapping on the page does not mean a new speaker."],["Punctuation correct but speaker unclear","Use reporting clauses, actions or paragraphing to identify speakers."]],
      quick:["Punctuate speech before a tag.","Punctuate a question and tag.","Start a new-speaker paragraph.","Explain comma placement.","Edit redundant dialogue wording."],
      mastery:["Use quotation marks","Capitalise and punctuate speech","Attach reporting clauses","Paragraph speaker changes","Use dialogue purposefully"],
      questions:{
        choice1:["Which sentence is punctuated correctly?",["“We should leave now,” Ava said.","“We should leave now”, Ava said.","We should leave now,” Ava said.","“we should leave now,” Ava said."]],
        fill1:["Complete the question dialogue.","“Should we leave now{{blank}}” Ava asked."],
        choice2:["What usually signals a change of speaker in written dialogue?",["a new paragraph","a semicolon after every word","italics only","a new page"]],
        explain:"Explain why ‘“Are you ready?” she asked.’ uses a question mark but a lower-case she.",
        fill2:["Complete the tag-first pattern.","Ava said{{blank}} “We should leave now.”"],
        apply:"Punctuate and paragraph a four-line conversation between two speakers. Add one action that develops mood without repeating the dialogue.",
        enrichment1:"Write a dialogue scene using tag-first, tag-last, question and split-quotation patterns accurately. Annotate each convention.",
        enrichment2:"Edit an over-punctuated or unclear dialogue passage for correctness, speaker clarity, pace and characterisation. Justify major revisions."
      }
    }
  };

  window.SkillrYear4SubjectRegister("english", S, Object.keys(S));
})();
