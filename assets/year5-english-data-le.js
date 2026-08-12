(() => {
  "use strict";
  if (!window.SkillrYear5Register) throw new Error("Year 5 curriculum base is not loaded.");
  const mk=(s)=>({...s,activities:s.activities||[
    {title:"Annotate craft and evidence",text:`Identify the literary choices that shape ${s.title.toLowerCase()} and connect each to a contextual effect.`,visual:s.modelVisual},
    {title:"Compare responses or representations",text:"Compare two texts, readers or versions and support similarities and differences with evidence.",visual:s.applyVisual},
    {title:"Create and revise",text:"Apply the craft choice in an original literary response, then revise for coherence, effect and audience.",visual:{type:"cards",data:(s.quick||[]).slice(0,4)}}
  ],mastery:s.mastery||["Identify literary choices","Use concise evidence","Explain contextual effects","Compare interpretations","Create and revise deliberately"]});

  const S={
    AC9E5LE01:mk({
      slug:"ac9e5le01-aspects-of-literary-texts-that-enhance-enjoyment-and-shape",
      title:"Literary Enjoyment and Preferences",
      subtitle:"Explain how craft, context and reader experience shape a reasoned preference",
      desc:"identify aspects of literary texts that enhance enjoyment and shape their preferences",
      learn:"Students move beyond ‘I liked it’ by identifying aspects such as character, pacing, structure, imagery, humour, viewpoint and visual style and explaining how these interact with reader experience and purpose.",
      core:"A literary preference is subjective but can be explained through specific textual features, evidence and criteria.",
      modelTitle:"Build a reasoned preference response",
      modelVisual:{type:"evidence",data:[["Preference","I preferred Text B"],["Feature","its limited viewpoint and delayed reveal"],["Evidence","the narrator notices clues but misinterprets them"],["Effect","the reader anticipates danger and feels suspense"],["Personal criterion","I value stories that reward inference"]]},
      modelNote:"Another reader may prefer a different text for defensible reasons. The goal is transparent criteria and evidence, not one correct preference.",
      applyTitle:"Compare several aspects without listing them",
      applyVisual:{type:"table",data:[["aspect","possible response question"],["character","Did motives and change feel convincing?"],["plot/pacing","Where did engagement rise or fall?"],["language","Which images or sounds were memorable?"],["viewpoint","What information or closeness did it create?"],["visual design","How did composition extend meaning?"],["theme/context","Which ideas or experiences mattered?"]]},
      applyNote:"Select the most influential aspects and explain connections rather than mentioning every feature briefly.",
      terms:[["literary preference","reasoned personal response to a text"],["criterion","standard used to evaluate an aspect"],["engagement","degree of interest, emotional involvement or thought"]],
      mistakes:[["Preference presented as universal quality","Distinguish personal response from a claim about all readers."],["Plot summary replaces evaluation","Focus on craft and effect."],["Evidence omitted because opinion is personal","Evidence explains the response."],["More features means stronger answer","Depth and connection matter more than lists."]],
      quick:["Name a preference criterion.","Use a short evidence detail.","Explain engagement.","Compare two readers.","Avoid plot retell."],
      questions:{
        choice1:["Which response is best reasoned?",["I preferred the second text because its delayed reveal created sustained suspense","I liked it because it was good","Everyone must prefer it","The cover was blue"]],
        fill1:["Complete the response structure.","preference + feature + evidence + {{blank}}"],
        choice2:["Which is a valid literary criterion?",["how effectively viewpoint develops suspense","the reader’s shoe size","the page number alone","whether every reader agrees"]],
        explain:"Explain a literary preference using two connected aspects rather than a plot summary.",
        fill2:["Complete the qualification.","Another reader may respond differently if they value a different {{blank}}."],
        apply:"Compare two texts for character, pacing and language, then identify which aspect most strongly shaped your preference.",
        enrichment1:"Create a review framework that separates personal preference, craft evaluation and contextual interpretation. Apply it to a text.",
        enrichment2:"Compare two conflicting reader reviews and decide whether both are textually defensible. Explain the evidence standard."
      }
    }),
    AC9E5LE02:mk({
      slug:"ac9e5le02-explain-the-way-authors-use-sound-and-visual-features-to-create",
      title:"Sound, Imagery and Visual Features",
      subtitle:"Explain how authors and illustrators combine modes to create meaning and effect",
      desc:"explain the way authors and illustrators use sound devices and imagery to create meaning and effect in texts",
      learn:"Students analyse rhythm, alliteration, assonance, onomatopoeia, repetition, figurative imagery, colour, framing, salience and sequence, explaining how modes reinforce or complicate one another.",
      core:"Sound and visual choices organise attention, create sensory associations and shape pace, mood and interpretation in context.",
      modelTitle:"Connect sound and image in one scene",
      modelVisual:{type:"table",data:[["choice","evidence","effect"],["alliteration","wind worried the wires","repeated /w/ creates whispering unease"],["onomatopoeia","clack—hiss—BOOM","accelerates and intensifies action"],["colour","muted blue-grey background","cold, isolated mood"],["framing","tiny figure in wide landscape","vulnerability"],["repetition","still waiting, still watching","sustains tension"]]},
      modelNote:"Effects are not dictionary formulas. Explain how the choice works with the scene, structure and audience expectations.",
      applyTitle:"Analyse multimodal reinforcement and contrast",
      applyVisual:{type:"compare",data:[["reinforcement","words describe danger; image uses dark high contrast"],["extension","words omit pursuer; image reveals shadow"],["contrast","cheerful music under unsettling image"],["sequence","panel size and pause control pace"],["reader task","combine modes and resolve tension"]]},
      applyNote:"A visual or sound may add information absent from words or create irony by contradicting them.",
      terms:[["imagery","language or visual detail evoking sensory or conceptual experience"],["sound device","pattern of sound used deliberately"],["salience","degree to which an element attracts attention"]],
      mistakes:[["Device named without effect","Connect evidence to local meaning and whole-text purpose."],["One device has one fixed effect","Context changes interpretation."],["Illustration treated as decoration","It may add viewpoint, information or irony."],["Sound analysed only by spelling","Consider performance, rhythm and stress."]],
      quick:["Analyse one sound pattern.","Explain visual salience.","Find mode contrast.","Perform rhythm differently.","Connect device to context."],
      questions:{
        choice1:["Which visual choice can make a character appear vulnerable?",["A tiny figure in a wide landscape","A centred close-up with strong lighting","Removing the setting","Making every element equal size"]],
        fill1:["Complete the sound term.","Words such as crash and hiss use {{blank}}."],
        choice2:["What can happen when image and words contradict?",["They may create irony or tension","Meaning disappears automatically","The image becomes incorrect","Readers ignore both modes"]],
        explain:"Analyse how one sound device and one visual feature work together in a scene or poem.",
        fill2:["Complete the contextual analysis.","A device’s effect depends on its placement, surrounding meaning and intended {{blank}}."],
        apply:"Redesign a short scene using a sound pattern and visual framing to change mood. Explain each choice.",
        enrichment1:"Create a multimodal poem or storyboard where sound and image first reinforce and later contradict one another.",
        enrichment2:"Compare two performances or illustrations of the same text and analyse how sound, pace, framing and salience create different interpretations."
      }
    }),
    AC9E5LE03:mk({
      slug:"ac9e5le03-explain-how-characters-settings-and-events-are-represented-in-literary",
      title:"Representation of Characters, Settings and Events",
      subtitle:"Compare perspective, context and craft across diverse literary texts",
      desc:"explain how characters, settings and events are represented in literary texts by First Nations Australian, and wide-ranging Australian and world authors",
      learn:"Students analyse how viewpoint, selection, language and visual choices construct characters, settings and events, comparing specific texts respectfully without generalising one representation to a whole culture or community.",
      core:"Representation is constructed through choices; it is not a transparent copy of people, places or events.",
      modelTitle:"Analyse representation from several evidence types",
      modelVisual:{type:"table",data:[["focus","evidence question"],["character","Whose viewpoint, actions and labels shape judgement?"],["setting","Which details make place safe, threatening, sacred, ordinary or contested?"],["event","What is selected, omitted, reordered or emphasised?"],["image","How do angle, colour and salience position viewers?"],["context","What specific historical, cultural or social information is relevant?"]]},
      modelNote:"Use the named text and its evidence. Avoid claiming that one author or character represents every person from a place or identity.",
      applyTitle:"Compare two representations of a similar event",
      applyVisual:{type:"compare",data:[["Text A","first-person child viewpoint; event feels confusing and immediate"],["Text B","distant narrator; event appears historical and organised"],["similarity","both emphasise community response"],["difference","knowledge, language and temporal distance"],["conclusion","viewpoint shapes what readers know and value"]]},
      applyNote:"Comparison should identify both shared subject matter and differences caused by viewpoint, genre, context and craft.",
      terms:[["representation","constructed portrayal of a person, place, event or idea"],["viewpoint","position from which information and values are presented"],["selection","choice of which details to include or omit"]],
      mistakes:[["Character treated as a real person without mediation","Analyse narrator and author choices."],["One text generalised to a culture","Limit claims to the represented perspective."],["Difference listed without effect","Explain how it positions readers."],["Context guessed from stereotype","Use reliable context and textual evidence."]],
      quick:["Identify viewpoint.","Find selected/omitted detail.","Explain setting representation.","Compare two event portrayals.","Write a limited respectful claim."],
      questions:{
        choice1:["Which statement best describes representation?",["A portrayal constructed through language, structure and visual choices","A guaranteed complete copy of reality","A list of every fact","The same as the reader’s opinion only"]],
        fill1:["Complete the comparison principle.","Compare specific texts and avoid treating one representation as universal for an entire {{blank}}."],
        choice2:["Which choice most directly shapes what readers know?",["narrative viewpoint","page thickness","author’s shoe colour","the number of letters in the title"]],
        explain:"Compare how two texts represent a similar event through different viewpoints and selections.",
        fill2:["Complete the critical question.","What details are emphasised, omitted or {{blank}}?"],
        apply:"Analyse a character and setting representation using language, visual and contextual evidence, then state a limitation on your interpretation.",
        enrichment1:"Create two contrasting representations of the same event without changing core facts. Annotate viewpoint, selection and reader positioning.",
        enrichment2:"Evaluate how a text can challenge one stereotype while unintentionally reinforcing another. Use precise evidence and avoid generalisation."
      }
    }),
    AC9E5LE04:mk({
      slug:"ac9e5le04-create-and-edit-literary-texts-experimenting-with-language-features-and",
      title:"Creating Literary Texts through Figurative Language and Characterisation",
      subtitle:"Experiment with language, storyline, character and setting while revising for coherent effect",
      desc:"create and edit literary texts, experimenting with figurative language, storylines, characters and settings from texts students have experienced",
      learn:"Students adapt craft techniques rather than copying wording, develop motivated characters in functional settings and revise figurative language and plot choices for a coherent mood, theme or reader effect.",
      core:"Literary experimentation selects and transforms techniques from mentor texts while creating original characters, events, language and context.",
      modelTitle:"Plan craft choices around a narrative purpose",
      modelVisual:{type:"table",data:[["purpose","craft decision"],["create isolation","limited viewpoint + wide empty setting"],["show determination","repeated attempts and precise action verbs"],["foreshadow danger","recurring image, sound or object"],["develop relationship","dialogue choices and changing actions"],["resolve theme","consequence connects to earlier choice"]]},
      modelNote:"Figurative language should support a controlled pattern or image, not become a collection of unrelated comparisons.",
      applyTitle:"Revise a draft at connected levels",
      applyVisual:{type:"flow",data:["clarify character goal","strengthen setting pressure","repair cause and consequence","select coherent imagery","control pacing and paragraphing","edit sentence and punctuation"]},
      applyNote:"Revision may remove attractive sentences that do not serve the storyline or effect. Editing follows once meaning and structure are sound.",
      terms:[["mentor text","text studied for craft techniques"],["figurative language","language using comparison or non-literal imagery"],["character motivation","goal or need influencing decisions"]],
      mistakes:[["Adaptation copies plot and wording","Transform technique, context and decisions."],["Metaphor added to every sentence","Build a coherent image pattern selectively."],["Setting described but inactive","Use it to constrain or enable events."],["Character changes without cause","Connect development to choices and consequences."]],
      quick:["Identify mentor technique.","Plan character goal.","Use setting pressure.","Revise imagery coherence.","Test plot causality."],
      questions:{
        choice1:["Which approach best adapts a mentor text?",["Use its suspense technique with new characters, setting and events","Copy every event and rename one character","Repeat its exact wording","Use the same ending without change"]],
        fill1:["Complete the story relationship.","character goal + obstacle + choice + {{blank}}"],
        choice2:["Which revision most strengthens setting?",["Make the environment affect what the character can do","Add a colour list unrelated to action","Name the place once","Remove all sensory detail"]],
        explain:"Plan a scene where figurative language, setting and character action create one coherent mood.",
        fill2:["Complete the revision sequence.","meaning and structure before sentence editing and {{blank}}."],
        apply:"Revise a draft containing random events and mixed metaphors. Explain how the new choices improve coherence.",
        enrichment1:"Create a literary text plan using one transformed mentor technique, a sustained image pattern and a character-changing consequence.",
        enrichment2:"Write two versions of a climax using different figurative language and pacing. Evaluate which better serves the established theme."
      }
    }),
    AC9E5LE05:mk({
      slug:"ac9e5le05-create-and-edit-literary-texts-experimenting-with-text-structures-and",
      title:"Experimenting with Literary Text Structures",
      subtitle:"Reorder time, viewpoint and sections to shape suspense, revelation and theme",
      desc:"create and edit literary texts, experimenting with text structures and language features from texts students have experienced",
      learn:"Students experiment with chronological and non-linear structures, openings, viewpoint shifts, parallel plots, framing and endings, then edit transitions and clues so readers can follow deliberate complexity.",
      core:"Structural experimentation is effective when altered order or viewpoint creates a purposeful effect and remains coherent for readers.",
      modelTitle:"Compare structural options for one storyline",
      modelVisual:{type:"table",data:[["structure","possible effect","cohesion need"],["chronological","clear cause and development","time connectives"],["begin at climax","immediate tension","later orientation / flashback signals"],["dual viewpoint","contrast and dramatic irony","speaker labels and consistent voice"],["frame narrative","past event interpreted from present","clear entry and return"],["open ending","invites inference","enough evidence for possibilities"]]},
      modelNote:"Complex structure should not hide missing plot logic. Foreshadowing, transitions and reference chains orient readers.",
      applyTitle:"Edit language features to support structure",
      applyVisual:{type:"compare",data:[["flashback","past-perfect or time marker can signal earlier event"],["viewpoint shift","distinct voice, paragraph or section cue"],["parallel plot","repeated motif or alternating headings"],["climax","sentence and paragraph pacing"],["return to frame","echo opening image or idea"]]},
      applyNote:"Structure and language work together. A flashback without tense or transition control may appear as an accidental inconsistency.",
      terms:[["non-linear structure","events presented outside straightforward chronological order"],["flashback","section presenting an earlier event"],["viewpoint shift","change in perspective or focal character"]],
      mistakes:[["Non-linear means random order","Each shift needs purpose and reader orientation."],["Viewpoint changes inside a paragraph accidentally","Signal and control perspective."],["Open ending means no resolution at all","Resolve enough conflict while leaving purposeful uncertainty."],["Structure copied without adapting content","Choose a form that suits this story’s meaning."]],
      quick:["Choose structural effect.","Signal a flashback.","Control viewpoint shift.","Use parallel motif.","Evaluate an open ending."],
      questions:{
        choice1:["Why might a writer begin at the climax?",["To create immediate tension before revealing background","To avoid all plot logic","To remove the need for transitions","To make every story identical"]],
        fill1:["Complete the orientation principle.","A flashback needs a clear time signal and controlled {{blank}}."],
        choice2:["Which feature best supports dual viewpoint?",["distinct voice and clear section cues","random pronoun changes","no speaker identification","identical unmarked paragraphs"]],
        explain:"Compare chronological and begin-at-climax structures for one storyline. Explain effects and cohesion requirements.",
        fill2:["Complete the structural check.","Experimentation should create purpose while remaining {{blank}} for readers."],
        apply:"Reorder a simple narrative using a flashback or frame structure and add transitions that prevent confusion.",
        enrichment1:"Design a dual-viewpoint story in which readers know more than either character. Plan alternating evidence and convergence.",
        enrichment2:"Compare two endings—closed and open—for the same text. Evaluate thematic, emotional and inferential effects."
      }
    })
  };

  window.SkillrYear5Register("english",S,Object.keys(S));
})();
