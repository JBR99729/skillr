(() => {
  "use strict";
  if (!window.SkillrYear6Register) throw new Error("Year 6 curriculum base is not loaded.");

  const S = {
    AC9E6LA01: {
      slug:"ac9e6la01-that-language-varies-as-levels-of-formality-and-social-distance",
      title:"Formality, Social Distance and Authority",
      subtitle:"Analyse how register positions participants and changes relationships",
      desc:"understand that language varies as levels of formality and social distance increase or decrease and that authority and relationships influence language choices",
      learn:"Students compare vocabulary, modality, terms of address, humour and interaction patterns across contexts and explain how language constructs closeness, expertise, authority or resistance.",
      modelTitle:"Map one request across social distance",
      modelVisual:{type:"table",data:[["context","wording","relationship signal"],["close friend","Can you send me the notes?","low distance; direct"],["teacher","Could you please send the lesson notes?","respectful role awareness"],["formal request","Dear Coordinator, I am writing to request…","greater distance and institutional formality"],["expert discussion","Could you clarify the evidence base?","professional challenge"]]},
      modelNote:"Formality is a continuum, not a simple polite/rude split. Authority can be accepted, negotiated or challenged through language.",
      applyTitle:"Analyse register mismatch and power",
      applyVisual:{type:"compare",data:[["overly casual","Hey, approve this now"],["suitable formal","Could you please review this proposal?"],["overly distant with peer","I hereby demand your attendance"],["inclusive authority","Let us review the criteria together"]]},
      applyNote:"Do not label dialects or community varieties as deficient. Evaluate suitability for the specific purpose and relationship.",
      terms:[["register","language variety or style associated with context"],["social distance","degree of familiarity or closeness"],["authority","recognised power, expertise or role in interaction"]],
      mistakes:[["Formal means complex vocabulary","Clarity and appropriateness matter more than inflated words."],["Authority always uses commands","Questions, inclusive pronouns and modality can exercise authority."],["Informal variety is incorrect","Varieties have conventions and serve identities."],["Register inferred from one word","Analyse a pattern and context."]],
      quick:["Identify formality level.","Explain social distance.","Analyse authority language.","Repair mismatch.","Compare two contexts."],
      questions:{
        choice1:["Which request best suits a formal email?",["Could you please review the attached proposal?","Hey, look at this now","Send it","Yo, thoughts?"]],
        fill1:["Complete the concept.","As social distance increases, language often becomes more {{blank}}."],
        choice2:["Which wording uses inclusive authority?",["Let us examine the evidence together","Do it because I said so","People like you cannot understand","Whatever"]],
        fill2:["Complete the analysis.","Register choices signal relationship, identity and {{blank}}."],
        apply:"Rewrite one message for a friend, a teacher and a formal committee, explaining every change.",
        enrichment1:"Create a dialogue where register shifts reveal a changing power relationship without directly naming it.",
        enrichment2:"Evaluate a claim that formal standard language is inherently more intelligent than other varieties."
      }
    },
    AC9E6LA02: {
      slug:"ac9e6la02-the-uses-of-objective-and-subjective-language-and-identify-bias",
      title:"Objective, Subjective and Biased Language",
      subtitle:"Identify evaluation, selection, attribution and viewpoint in texts",
      desc:"understand the uses of objective and subjective language and identify bias",
      learn:"Students distinguish verifiable information from evaluation, identify loaded wording and selective framing and explain that apparently objective texts may still position readers through evidence choice and omission.",
      modelTitle:"Compare factual reporting, evaluation and bias",
      modelVisual:{type:"table",data:[["type","example","feature"],["objective-style","The proposal costs $2.4 million.","verifiable quantity"],["subjective","The wasteful proposal costs an outrageous $2.4 million.","evaluation and emotion"],["attributed opinion","Residents described the cost as excessive.","speaker identified"],["biased selection","Only opposing voices are quoted.","one-sided evidence"]]},
      modelNote:"Objective language aims for verifiability, but source selection, ordering and visuals can still create bias.",
      applyTitle:"Use a bias audit",
      applyVisual:{type:"flow",data:["identify claim","mark evaluative words","check sources and attribution","identify omitted viewpoints/data","inspect image/layout","compare headline with evidence","write limited judgement"]},
      applyNote:"Bias does not mean every claim is false. Identify the specific positioning choices and evaluate evidence quality.",
      terms:[["objective language","wording centred on verifiable information"],["subjective language","wording expressing evaluation, feeling or viewpoint"],["bias","systematic positioning or imbalance affecting representation"]],
      mistakes:[["Any adjective is subjective","Some adjectives classify observable features."],["Neutral tone proves no bias","Selection and omission can position readers."],["Quoted opinion becomes fact","Attribution identifies source, not truth."],["Bias means deliberate dishonesty","It may arise from assumptions or methods."]],
      quick:["Mark evaluative words.","Identify verifiable claim.","Check attribution.","Find omitted evidence.","Write a qualified bias judgement."],
      questions:{
        choice1:["Which sentence is most objective?",["The survey included 240 respondents","The ridiculous survey wasted everyone’s time","The brilliant result proves everything","Everyone hated the survey"]],
        fill1:["Complete the distinction.","A claim that can be checked against evidence is {{blank}}."],
        choice2:["Which feature can create bias even with neutral wording?",["Selecting only one side’s evidence","Including units","Naming the source","Using a table accurately"]],
        fill2:["Complete the attribution.","According to the spokesperson, the plan was effective; this remains an attributed {{blank}}."],
        apply:"Audit a headline and short report for wording, source selection, visual framing and omitted context.",
        enrichment1:"Write objective, openly subjective and subtly biased versions of the same event, then annotate choices.",
        enrichment2:"Compare two reports using the same facts but different selection and ordering. Evaluate reader positioning."
      }
    },
    AC9E6LA03: {
      slug:"ac9e6la03-explain-how-texts-across-the-curriculum-are-typically-organised",
      title:"Organisation of Curriculum Texts",
      subtitle:"Explain how stages, phases and language serve disciplinary purposes",
      desc:"explain how texts across the curriculum are typically organised into characteristic stages and phases and use language features suited to their purposes",
      learn:"Students compare reports, explanations, arguments, procedures, historical accounts and multimodal presentations and connect their stages, evidence patterns and specialised language to purpose.",
      modelTitle:"Compare disciplinary text structures",
      modelVisual:{type:"table",data:[["text","typical stages","language/evidence"],["science investigation","question–method–results–conclusion","variables, measurements, cautious claims"],["historical explanation","context–causes–events–consequences","chronology, sources, causality"],["argument","position–reasons–evidence–counterpoint–conclusion","modality and evaluation"],["procedure","goal–requirements–ordered steps–check","commands and conditions"]]},
      modelNote:"Structures are typical resources, not rigid templates. Writers adapt them while preserving recognisable purpose.",
      applyTitle:"Identify stages and phases in a hybrid text",
      applyVisual:{type:"sequence",data:[["Opening","orient audience and purpose"],["Stage 1","explain key concept"],["Phase","example → evidence → interpretation"],["Stage 2","compare options"],["Visual phase","graph + caption + spoken explanation"],["Conclusion","synthesise and recommend"]]},
      applyNote:"Paragraphs, screens, diagrams, voice and navigation can all organise phases in multimodal texts.",
      terms:[["stage","major functional section"],["phase","smaller move developing a stage"],["disciplinary language","specialised language patterns of a subject"]],
      mistakes:[["Stage equals one paragraph","Stages can span several paragraphs or modes."],["Every subject uses one text type","Purpose determines form."],["Template followed without adaptation","Audience and evidence shape organisation."],["Visuals excluded from structure","They can form explanatory phases."]],
      quick:["Identify stages.","Name a phase.","Compare two subjects.","Analyse multimodal organisation.","Explain purpose link."],
      questions:{
        choice1:["Which sequence best suits a scientific investigation report?",["question, method, results, conclusion","orientation, climax, resolution only","slogan, price, purchase","greeting, joke, farewell"]],
        fill1:["Complete the argument structure.","position → reasons and evidence → counterpoint → {{blank}}."],
        choice2:["What is a phase?",["A smaller functional move within a stage","Always a whole book","A punctuation mark","An unrelated decoration"]],
        fill2:["Complete the flexibility principle.","Typical structures can be {{blank}} for purpose and audience."],
        apply:"Map stages and phases in a multimodal explanation and explain how each mode contributes.",
        enrichment1:"Design a hybrid text combining report, explanation and argument while preserving a clear dominant purpose.",
        enrichment2:"Compare two effective texts with the same purpose but different organisational choices."
      }
    },
    AC9E6LA04: {
      slug:"ac9e6la04-that-cohesion-can-be-created-by-the-intentional-use-of",
      title:"Cohesion through Reference and Lexical Chains",
      subtitle:"Control pronouns, substitution, repetition and connectives across a text",
      desc:"understand that cohesion can be created by the intentional use of repetition, substitution, reference, ellipsis and text connectives",
      learn:"Students trace how participants and ideas are maintained across paragraphs, use repetition for precision, substitution and ellipsis for economy and connectives for logical relationships.",
      modelTitle:"Build a cohesion chain across sentences",
      modelVisual:{type:"table",data:[["device","example","function"],["repetition","erosion … erosion","technical precision"],["substitution","the process","avoids repetition while preserving reference"],["pronoun reference","it / they / this","tracks participant or idea"],["ellipsis","Mia chose red; Kai, blue","omits recoverable wording"],["connective","however / therefore","signals relationship"]]},
      modelNote:"Variation should not obscure the topic. Readers must recover exactly what each pronoun, substitute or ellipsis refers to.",
      applyTitle:"Repair a paragraph with broken cohesion",
      applyVisual:{type:"compare",data:[["ambiguous","Lena told Priya she was wrong"],["clear","Lena told Priya, ‘Your calculation is incorrect’"],["over-repetition","the habitat … the habitat … the habitat"],["balanced","the habitat … this environment … it"],["wrong connective","It rained; however, the ground became wet"]]},
      applyNote:"Use technical repetition when precision matters; use substitution only where reference remains unmistakable.",
      terms:[["reference","language pointing to another element"],["substitution","replacement by a word or phrase standing for earlier content"],["ellipsis","omission of recoverable words"]],
      mistakes:[["Every repetition removed","Key terms may need repeating."],["Pronoun has several antecedents","Specify the noun."],["Ellipsis removes essential meaning","Omit only recoverable material."],["Connective chosen for variety","Match logic."]],
      quick:["Trace reference chain.","Use substitution.","Identify ellipsis.","Repair pronoun.","Choose connective."],
      questions:{
        choice1:["Which connective best signals a result?",["therefore","however","meanwhile","although"]],
        fill1:["Complete the lexical chain.","mangroves → these plants → their roots → this {{blank}}."],
        choice2:["Which sentence contains ellipsis?",["Mia chose red; Kai, blue.","Mia chose red and Kai chose blue.","Mia and Kai chose colours.","Red and blue are colours."]],
        fill2:["Complete the reference principle.","A pronoun needs a clear {{blank}}."],
        apply:"Revise a paragraph with excessive repetition, ambiguous pronouns and inaccurate connectives.",
        enrichment1:"Write two linked paragraphs using all five cohesion resources and annotate each.",
        enrichment2:"Analyse how deliberate repetition can create emphasis in literature but precision in science."
      }
    },
    AC9E6LA05: {
      slug:"ac9e6la05-how-embedded-clauses-can-expand-the-variety-of-complex-sentences",
      title:"Embedded Clauses in Complex Sentences",
      subtitle:"Expand noun groups and ideas without losing clause clarity",
      desc:"understand how embedded clauses can expand the variety of complex sentences and provide additional information",
      learn:"Students identify clauses embedded inside noun groups or other structures, distinguish them from dependent clauses functioning around a main clause and punctuate restrictive and supplementary information clearly.",
      modelTitle:"Embed a relative clause inside a noun group",
      modelVisual:{type:"sentence",data:[["determiner","the"],["head noun","sensor"],["embedded clause","that recorded the highest value"],["main clause","was recalibrated"]]},
      modelNote:"The embedded clause expands ‘sensor’ but is not the main message. Remove it temporarily to reveal the core clause: ‘The sensor was recalibrated.’",
      applyTitle:"Compare essential and supplementary embedded information",
      applyVisual:{type:"table",data:[["type","example","punctuation/meaning"],["restrictive","The students who finished checked results.","identifies which students"],["supplementary","The students, who had finished, checked results.","adds information about all named students"],["embedded report","The claim that the device was accurate was tested.","clause expands claim"]]},
      applyNote:"Comma choices can change meaning. Ensure the embedded clause has a clear head noun and does not create a fragment.",
      terms:[["embedded clause","clause functioning inside another grammatical structure"],["relative clause","clause often introduced by who, which or that"],["head noun","central noun expanded by the clause"]],
      mistakes:[["Every dependent clause called embedded","Embedding concerns structural position."],["Head noun unclear","Place clause next to the noun expanded."],["Commas added to every relative clause","Essential and supplementary meanings differ."],["Core clause lost","Remove embedding to test the main structure."]],
      quick:["Find head noun.","Remove embedded clause.","Compare comma meaning.","Identify restrictive clause.","Write embedded report."],
      questions:{
        choice1:["What does the embedded clause expand in ‘The sensor that recorded 42°C was checked’?",["sensor","42°C","checked","the"]],
        fill1:["Complete the core clause.","The sensor that recorded the highest value was recalibrated → The sensor was {{blank}}."],
        choice2:["Which version treats the information as supplementary?",["The sensor, which was new, failed.","The sensor which failed was new.","Which was new.","The new sensor"]],
        fill2:["Complete the structural term.","The central noun expanded by a relative clause is the {{blank}} noun."],
        apply:"Write two versions of a sentence where comma use changes whether a relative clause identifies or merely adds information.",
        enrichment1:"Analyse a dense sentence containing two levels of embedding and rewrite it for clarity without losing precision.",
        enrichment2:"Compare embedded clauses in scientific definitions and literary character descriptions."
      }
    },
    AC9E6LA06: {
      slug:"ac9e6la06-how-ideas-can-be-expanded-and-sharpened-through-careful-choice",
      title:"Expanding and Sharpening Ideas through Language Choice",
      subtitle:"Use precise noun groups, verb groups and adverbial detail",
      desc:"understand how ideas can be expanded and sharpened through careful choice of verbs, elaborated tenses and a range of adverb groups and prepositional phrases",
      learn:"Students select verb groups for tense, aspect, modality and precision and add circumstances that clarify when, where, how, why or under what condition an event occurs.",
      modelTitle:"Sharpen a vague scientific statement",
      modelVisual:{type:"table",data:[["version","language effect"],["The water changed.","vague process"],["The water had gradually evaporated.","past-perfect aspect + manner"],["After 20 minutes, the warmed water had gradually evaporated from the shallow tray.","time, cause/context and place"],["The water may evaporate faster under moving air.","modal possibility"]]},
      modelNote:"Expansion is useful only when detail serves purpose. Verb choice often carries more precision than adding many adjectives.",
      applyTitle:"Compare verb-group meaning",
      applyVisual:{type:"compare",data:[["rose","completed past event"],["was rising","ongoing past process"],["had risen","completed before another past reference"],["may rise","possibility"],["must rise","logical certainty or obligation depending on context"]]},
      applyNote:"Adverbial placement changes emphasis and may create ambiguity. Keep the actor clear in introductory phrases.",
      terms:[["verb group","main verb with auxiliaries expressing tense, aspect or modality"],["aspect","way a process unfolds in time"],["adverbial","element adding circumstance or stance"]],
      mistakes:[["More modifiers means sharper writing","Select precise relevant detail."],["Tense and aspect treated as identical","Aspect shows ongoing or completed relationships."],["Opening phrase has wrong actor","Check attachment."],["Modal strength ignored","May, should and must express different commitment."]],
      quick:["Sharpen a verb.","Compare aspect.","Add condition.","Repair attachment.","Calibrate modality."],
      questions:{
        choice1:["Which verb group shows an ongoing past process?",["was rising","rose","had risen","will rise"]],
        fill1:["Complete the sharpened statement.","After 20 minutes, the water had gradually {{blank}}."],
        choice2:["Which modal verb expresses possibility?",["may","must","did","has"]],
        fill2:["Complete the circumstance type.","‘Under equal conditions’ expresses a {{blank}}."],
        apply:"Revise three vague sentences by improving verb groups and adding only necessary circumstances.",
        enrichment1:"Write one event in five tense/aspect/modal forms and analyse meaning changes.",
        enrichment2:"Evaluate an overloaded paragraph and produce a sharper version with fewer but more precise choices."
      }
    },
    AC9E6LA07: {
      slug:"ac9e6la07-and-explain-how-images-figures-tables-diagrams-maps-and-graphs",
      title:"Images, Figures, Tables, Diagrams, Maps and Graphs",
      subtitle:"Explain how visual representations organise, extend and qualify written meaning",
      desc:"identify and explain how images, figures, tables, diagrams, maps and graphs contribute to meaning in texts",
      learn:"Students distinguish decorative, organisational, evidential and explanatory visual roles, read labels and scales and explain how visuals combine with captions and surrounding prose.",
      modelTitle:"Match visual form to communicative purpose",
      modelVisual:{type:"table",data:[["visual","best use","reader check"],["table","exact values and categories","headers, units, totals"],["graph","pattern, comparison or change","axes, scale, source"],["diagram","parts and relationships","labels and arrows"],["map","spatial location and scale","legend, orientation"],["image","appearance, viewpoint or emotion","framing and caption"]]},
      modelNote:"A visual may extend information beyond the prose. Readers should cross-reference, not treat it as decoration or automatically trustworthy evidence.",
      applyTitle:"Evaluate visual–verbal alignment",
      applyVisual:{type:"flow",data:["identify text claim","inspect visual data/content","read caption and labels","compare agreement or tension","check scale/source","explain added meaning","identify limitation"]},
      applyNote:"A graph can be accurate but visually misleading; an image can be authentic but unrepresentative. Analyse selection and presentation.",
      terms:[["figure","numbered visual representation in a text"],["caption","text identifying and interpreting a visual"],["visual–verbal relationship","way image/data and words interact"]],
      mistakes:[["All visuals called pictures","Name the form and function precisely."],["Graph accepted without scale check","Read axes and source."],["Caption assumed neutral","It can frame interpretation."],["Visual information not mentioned in response","Integrate evidence from both modes."]],
      quick:["Choose visual type.","Read graph scale.","Explain caption effect.","Compare prose/visual.","Identify limitation."],
      questions:{
        choice1:["Which visual best shows exact values across categories?",["table","unlabelled photograph","decorative icon","colour wash"]],
        fill1:["Complete the graph check.","Read axes, units, scale and data {{blank}}."],
        choice2:["What can a caption do?",["Identify and frame interpretation of a visual","Guarantee the visual is unbiased","Replace every label","Make scale unnecessary"]],
        fill2:["Complete the integration.","A strong response uses evidence from words and the relevant {{blank}}."],
        apply:"Analyse how a graph and paragraph support or contradict one another in a media text.",
        enrichment1:"Design a page combining a map, graph and explanatory paragraph, assigning each mode a distinct function.",
        enrichment2:"Create a technically accurate visual that could mislead through scale or selection, then repair it."
      }
    },
    AC9E6LA08: {
      slug:"ac9e6la08-authors-use-of-vivid-emotive-vocabulary-such-as-metaphors",
      title:"Vivid and Emotive Vocabulary",
      subtitle:"Analyse metaphor, simile, personification and connotation as positioning choices",
      desc:"investigate authors’ use of vivid and emotive vocabulary, such as metaphors, similes, personification, idioms and connotation, to shape meaning and response",
      learn:"Students identify figurative and evaluative choices, explain conceptual and emotional effects in context and create controlled imagery rather than listing devices.",
      modelTitle:"Analyse a sustained metaphor",
      modelVisual:{type:"table",data:[["evidence","conceptual effect"],["The city was a furnace.","frames heat as enclosing and dangerous"],["Roads were glowing veins.","extends city-as-body imagery"],["The sun hammered the roofs.","personifies force and repetition"],["Residents crawled toward shade.","verb suggests exhaustion"]]},
      modelNote:"A metaphor is not simply decorative. It frames one domain through another and can sustain a viewpoint or theme.",
      applyTitle:"Calibrate emotion and connotation",
      applyVisual:{type:"compare",data:[["thin","neutral physical description"],["slender","often positive or elegant connotation"],["scrawny","negative judgement"],["determined","positive persistence"],["stubborn","negative or resistant framing"]]},
      applyNote:"Connotations vary with context and audience. Explain the local effect rather than relying on a fixed dictionary label.",
      terms:[["metaphor","conceptual comparison describing one thing as another"],["personification","human qualities assigned to non-human entities"],["connotation","associated emotion or cultural meaning"]],
      mistakes:[["Device name treated as analysis","Explain framing and effect."],["All vivid language is positive","Connotation can threaten, praise or ridicule."],["Mixed metaphors ignored","Check coherence of image system."],["Emotion replaces evidence","Quote or describe exact wording."]],
      quick:["Identify metaphor.","Explain connotation.","Trace image pattern.","Compare near-synonyms.","Repair mixed metaphor."],
      questions:{
        choice1:["Which sentence uses metaphor?",["The city was a furnace.","The city temperature was 39°C.","The city had roads.","The city is large."]],
        fill1:["Complete the device.","‘The sun hammered the roofs’ uses {{blank}}."],
        choice2:["Which word has the most negative connotation in this set?",["scrawny","slender","thin","narrow"]],
        fill2:["Complete the analysis.","A sustained metaphor creates a connected image and conceptual {{blank}}."],
        apply:"Analyse a vivid passage for one extended image, verb choices and emotional positioning.",
        enrichment1:"Write a paragraph using a coherent sustained metaphor and annotate each extension.",
        enrichment2:"Compare two translations or rewritings of the same image and evaluate connotative differences."
      }
    },
    AC9E6LA09: {
      slug:"ac9e6la09-how-to-use-the-comma-for-lists-to-separate-a",
      title:"Commas for Lists, Clauses and Clarity",
      subtitle:"Use commas according to grammatical structure and meaning",
      desc:"understand how to use the comma for lists, to separate a dependent clause that comes before a main clause and to clarify sentence meaning",
      learn:"Students distinguish list commas, introductory dependent-clause commas, supplementary information and ambiguity-reducing punctuation, while avoiding comma splices.",
      modelTitle:"Compare major comma functions",
      modelVisual:{type:"table",data:[["function","example"],["list","We measured mass, volume, temperature and time."],["dependent first","Although the data varied, the pattern remained."],["supplementary phrase","The sensor, after recalibration, gave stable readings."],["direct address","Mina, check the scale."],["clarity","After eating, the students recorded results."]]},
      modelNote:"A comma signals structure, not every spoken pause. Conventions vary slightly, but the grammatical relationship should remain clear.",
      applyTitle:"Identify and repair comma errors",
      applyVisual:{type:"compare",data:[["comma splice","The trial ended, we analysed results."],["repair 1","The trial ended, and we analysed results."],["repair 2","The trial ended; we analysed results."],["repair 3","The trial ended. We analysed results."],["missing comma","If the switch is open, the lamp turns off."]]},
      applyNote:"Do not separate a subject from its verb or insert commas between essential elements without reason.",
      terms:[["comma splice","incorrect joining of independent clauses by comma alone"],["dependent clause","clause relying on a main clause"],["supplementary information","non-essential added detail often set off by commas"]],
      mistakes:[["Comma placed at every pause","Use grammar and meaning."],["Independent clauses joined by comma alone","Use conjunction, semicolon or full stop."],["Introductory dependent clause not separated","Add comma for clarity."],["Subject and verb separated","Remove unnecessary comma."]],
      quick:["Punctuate a list.","Mark dependent-first clause.","Repair splice.","Set off supplementary phrase.","Explain ambiguity."],
      questions:{
        choice1:["Which sentence is punctuated correctly?",["Although the data varied, the pattern remained.","Although, the data varied the pattern remained.","Although the data, varied the pattern remained.","Although the data varied the pattern, remained."]],
        fill1:["Complete the comma splice repair.","The trial ended{{blank}} and we analysed results."],
        choice2:["Which sentence contains a comma splice?",["The trial ended, we analysed results.","The trial ended, and we analysed results.","After the trial ended, we analysed results.","The trial ended; we analysed results."]],
        fill2:["Complete the list.","We measured mass{{blank}} volume{{blank}} temperature and time."],
        apply:"Punctuate a paragraph containing lists, introductory clauses, supplementary details and one comma splice, explaining each decision.",
        enrichment1:"Create sentence pairs where comma placement changes meaning, then explain the grammatical distinction.",
        enrichment2:"Compare comma conventions in two reputable style contexts while preserving clarity and sentence structure."
      }
    }
  };

  window.SkillrYear6Register("english", S, Object.keys(S));
})();
