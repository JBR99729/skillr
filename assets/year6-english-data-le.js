(() => {
  "use strict";
  if (!window.SkillrYear6Register) throw new Error("Year 6 curriculum base is not loaded.");

  const S = {
    AC9E6LE01: {
      slug:"ac9e6le01-responses-to-characters-and-events-in-literary-texts-drawn-from",
      title:"Responses to Characters and Events across Contexts",
      subtitle:"Explain how experience, values and textual evidence shape interpretation",
      desc:"identify and explain responses to characters and events in literary texts drawn from historical, social or cultural contexts",
      learn:"Students compare how readers may judge character decisions differently, use evidence from action, narration and context and distinguish interpretation from unsupported assumption or stereotype.",
      modelTitle:"Build a contextual character response",
      modelVisual:{type:"evidence",data:[["Character choice","The protagonist refuses an order"],["Text evidence","The order would endanger another person"],["Context","The institution expects unquestioned obedience"],["Interpretation","The refusal can be read as courageous resistance"],["Alternative response","Another reader may see disloyalty, depending on values"]]},
      modelNote:"A response is strengthened by specific textual evidence and relevant context. Context explains possibilities but should not be used to stereotype all people from a time or place.",
      applyTitle:"Compare reader positions",
      applyVisual:{type:"table",data:[["reader lens","possible focus"],["justice","fairness and consequences"],["loyalty","duty to group or relationship"],["historical knowledge","available choices and conventions"],["personal experience","emotional connection"],["textual craft","narrator reliability and withheld information"]]},
      applyNote:"Different interpretations can both be defensible when they acknowledge evidence and limits.",
      terms:[["reader response","interpretation or evaluation developed by a reader"],["context","historical, social or cultural conditions relevant to meaning"],["textual evidence","specific wording, event or visual detail supporting a claim"]],
      mistakes:[["Personal reaction treated as self-evident","Explain feature and evidence."],["Historical character judged without context","Consider available norms and constraints."],["Context used to excuse all actions","Context explains but does not remove evaluation."],["One perspective generalised to a culture","Limit claims to the text and representation."]],
      quick:["State response.","Cite character evidence.","Add context.","Compare two readers.","Qualify interpretation."],
      questions:{
        choice1:["Which response is best supported?",["The refusal appears courageous because it prevents harm despite institutional pressure","The character is good","Everyone would agree","The decision has no context"]],
        fill1:["Complete the response structure.","interpretation + textual evidence + relevant {{blank}}."],
        choice2:["Which statement recognises interpretive difference?",["Another reader may value loyalty more strongly, but must still use evidence","Only one reader response is possible","Context proves the character is correct","Personal preference needs no text"]],
        fill2:["Complete the limitation.","One character does not represent every member of a whole {{blank}}."],
        apply:"Compare two defensible responses to one difficult character decision, using evidence and context.",
        enrichment1:"Write a response that changes after new contextual information is revealed, explaining the revision.",
        enrichment2:"Evaluate when historical context should complicate moral judgement without eliminating it."
      }
    },
    AC9E6LE02: {
      slug:"ac9e6le02-similarities-and-differences-in-literary-texts-on-similar",
      title:"Comparing Literary Texts on Similar Topics or Themes",
      subtitle:"Analyse how context, genre, viewpoint and craft transform shared subject matter",
      desc:"identify similarities and differences in literary texts on similar topics, themes or plots and explain how authors represent ideas differently",
      learn:"Students compare central ideas, plot patterns, relationships, setting, viewpoint, imagery and resolution and explain how differences create distinct meanings rather than listing surface features.",
      modelTitle:"Compare two texts about belonging",
      modelVisual:{type:"table",data:[["feature","Text A","Text B"],["context","new student in city school","family returning to ancestral town"],["viewpoint","first person","alternating third person"],["conflict","peer exclusion","intergenerational disagreement"],["symbol","locked classroom door","restored house key"],["resolution","friendship develops","family history is negotiated"]]},
      modelNote:"A shared theme such as belonging is not identical in each text. Context and craft define what belonging means and how it is resolved.",
      applyTitle:"Build a comparative argument",
      applyVisual:{type:"flow",data:["state meaningful similarity","cite evidence from both texts","identify difference","explain contextual/craft cause","analyse effect on theme","synthesise judgement"]},
      applyNote:"Use balanced evidence. Avoid writing one paragraph about each text with no direct comparison.",
      terms:[["theme","idea explored through a literary text"],["comparative analysis","explanation of meaningful similarities and differences"],["synthesis","combined conclusion developed from both texts"]],
      mistakes:[["Shared topic treated as shared message","Analyse how each text develops it."],["Comparison lists features only","Explain significance."],["Evidence comes from one text","Support both sides."],["Context named but not connected","Show effect on plot, viewpoint or theme."]],
      quick:["State similarity.","Find evidence in both.","Explain one difference.","Connect context.","Write synthesis."],
      questions:{
        choice1:["Which comparison is most analytical?",["Both texts explore belonging, but one links it to peers while the other links it to family history","Both texts contain people","Text A is longer","The covers differ"]],
        fill1:["Complete the comparison frame.","Both texts…, whereas Text B…; this difference shapes the theme by {{blank}}."],
        choice2:["What should a synthesis do?",["Draw a combined conclusion from both texts","Retell one plot","List quotations without explanation","Choose a winner only"]],
        fill2:["Complete the evidence balance.","Use specific evidence from {{blank}} texts."],
        apply:"Compare how two texts use setting and symbol to represent the same broad theme differently.",
        enrichment1:"Create a comparative essay plan for three texts sharing one plot pattern but different contexts.",
        enrichment2:"Adapt one text’s theme to a new genre and explain which meanings change."
      }
    },
    AC9E6LE03: {
      slug:"ac9e6le03-and-explain-characteristics-that-define-an-author-s-individual",
      title:"Authorial Style and Voice",
      subtitle:"Identify recurring choices that distinguish an author’s individual style",
      desc:"identify and explain characteristics that define an author’s individual style, including language, structure, viewpoint and recurring concerns",
      learn:"Students compare several texts by an author, identify recurring patterns and explain how combinations of syntax, imagery, humour, pacing, narration and theme create recognisable style.",
      modelTitle:"Build an authorial-style profile",
      modelVisual:{type:"table",data:[["dimension","recurring pattern","possible effect"],["narration","close first person with gaps","intimacy and uncertainty"],["syntax","short fragments at turning points","emphasis and pace"],["imagery","weather mirrors emotion","coherent motif"],["humour","understatement after tension","release and character voice"],["themes","belonging and responsibility","recurring concern"]]},
      modelNote:"One feature alone rarely defines style. Use repeated patterns across texts and distinguish author, narrator and genre conventions.",
      applyTitle:"Compare style with genre expectations",
      applyVisual:{type:"compare",data:[["author pattern","repeated across genres"],["genre pattern","common to many mystery or fantasy texts"],["narrator voice","belongs to a particular text/character"],["individual style","distinctive combination and handling"],["evidence standard","examples from more than one text"]]},
      applyNote:"Do not infer personality directly from fictional voice. Analyse crafted textual choices.",
      terms:[["authorial style","recurring distinctive pattern of craft choices"],["narrator","constructed voice presenting a narrative"],["motif","recurring image, phrase or idea"]],
      mistakes:[["Narrator and author treated as identical","The narrator is a crafted textual role."],["One quotation defines style","Use patterns across texts."],["Genre convention credited only to author","Compare with wider genre patterns."],["Feature list lacks effect","Explain how choices shape reading."]],
      quick:["Identify recurring pattern.","Separate author/narrator.","Compare genre convention.","Explain motif.","Use cross-text evidence."],
      questions:{
        choice1:["What best supports a claim about authorial style?",["A recurring combination of choices across several texts","One isolated adjective","The author’s photograph","A single plot fact"]],
        fill1:["Complete the distinction.","The narrator is a constructed textual voice, not automatically the {{blank}}."],
        choice2:["Which may be a motif?",["A recurring image of locked doors","One random comma","The page number","The publisher logo"]],
        fill2:["Complete the evidence rule.","Style claims should use examples from more than one {{blank}}."],
        apply:"Create an authorial-style profile using recurring syntax, imagery, viewpoint and themes from at least two texts.",
        enrichment1:"Compare an author’s style across two genres, separating stable patterns from genre adaptation.",
        enrichment2:"Write a short imitation of a style without copying wording, then annotate transformed techniques."
      }
    },
    AC9E6LE04: {
      slug:"ac9e6le04-explain-the-way-authors-use-sound-and-imagery-to-create",
      title:"Sound and Imagery in Literary Texts",
      subtitle:"Explain how rhythm, repetition and sensory patterns create meaning and effect",
      desc:"explain the way authors use sound and imagery to create meaning and effect in literary texts, including poetry",
      learn:"Students analyse rhythm, rhyme, alliteration, assonance, onomatopoeia, repetition and sensory or figurative imagery and connect these choices to mood, pace, emphasis and theme.",
      modelTitle:"Analyse a sound–image pattern",
      modelVisual:{type:"table",data:[["choice","evidence","effect"],["alliteration","cold currents curled","links sound and circular movement"],["assonance","low road home","stretches mournful vowel"],["onomatopoeia","crack—hiss—thud","creates sequence and impact"],["repetition","still waiting, still watching","sustains tension"],["visual image","a silver scar across the sky","frames lightning as damage"]]},
      modelNote:"Sound works through performance and stress, not spelling alone. Explain the choice within its line, stanza or narrative moment.",
      applyTitle:"Compare performance possibilities",
      applyVisual:{type:"compare",data:[["slow reading","emphasises weight or reflection"],["accelerating pace","creates urgency"],["pause after repetition","heightens emphasis"],["soft volume","creates intimacy or threat"],["visual line break","delays completion or isolates word"]]},
      applyNote:"Different performances can be defensible when they follow punctuation, sound pattern and meaning evidence.",
      terms:[["assonance","repetition of vowel sounds"],["rhythm","pattern of beats, stress and timing"],["imagery","language evoking sensory or conceptual experience"]],
      mistakes:[["Rhyme considered the only sound device","Analyse stress, repetition and internal sounds."],["Device name replaces effect","Use evidence and context."],["Performance treated as separate from text","Punctuation and lineation guide it."],["Image interpreted literally only","Consider figurative comparison."]],
      quick:["Mark sound pattern.","Explain imagery.","Perform two ways.","Analyse repetition.","Connect to theme."],
      questions:{
        choice1:["Which phrase uses alliteration?",["cold currents curled","the current was cold","water moved","a blue river"]],
        fill1:["Complete the sound device.","Repeated vowel sounds create {{blank}}."],
        choice2:["What can a line break do?",["Delay or emphasise meaning","Guarantee rhyme","Remove all rhythm","Prove one reading"]],
        fill2:["Complete the analysis.","Sound choices influence pace, emphasis, mood and reader {{blank}}."],
        apply:"Analyse one poem or passage for a connected sound and image pattern, including performance choices.",
        enrichment1:"Write and perform a short poem where rhythm changes at a thematic turning point.",
        enrichment2:"Compare two performances of the same text and justify different interpretations."
      }
    },
    AC9E6LE05: {
      slug:"ac9e6le05-and-edit-literary-texts-that-adapt-plot-structure-characters",
      title:"Adapting Plot, Character, Setting and Style",
      subtitle:"Create original literary texts by transforming mentor-text techniques",
      desc:"create and edit literary texts that adapt plot structure, characters, settings and language features from texts students have experienced",
      learn:"Students identify transferable craft techniques, transform them into an original context and revise cause–effect structure, character motivation, setting pressure, viewpoint and language coherence.",
      modelTitle:"Transform rather than copy a mentor text",
      modelVisual:{type:"table",data:[["mentor technique","transformed choice"],["begin at climax","open with failed space-station repair"],["unreliable first person","narrator misunderstands sensor warnings"],["recurring key motif","access code represents trust"],["restricted setting","damaged orbital laboratory"],["moral choice at resolution","rescue rival instead of securing discovery"]]},
      modelNote:"Adapt technique and structural function, not exact wording, event sequence or character identities.",
      applyTitle:"Use a layered revision process",
      applyVisual:{type:"flow",data:["test plot causality","clarify character goal","make setting active","control viewpoint","strengthen motif/imagery","adjust pacing","edit cohesion and conventions"]},
      applyNote:"Revision changes meaning and structure; proofreading follows. Attractive details that do not support the design may need removal.",
      terms:[["adaptation","transformation of source techniques into a new text"],["character motivation","goal, belief or need driving choices"],["plot causality","relationship where events and decisions create consequences"]],
      mistakes:[["Adaptation copies story with renamed characters","Transform context, decisions and language."],["Twist has no preparation","Use foreshadowing and causal logic."],["Setting is decorative","Make it constrain or enable action."],["Character change is announced only","Show through choices and consequences."]],
      quick:["Identify mentor technique.","Plan original transformation.","Test causality.","Use active setting.","Revise motive."],
      questions:{
        choice1:["Which approach is genuine adaptation?",["Use the mentor text’s suspense structure with new events, setting and characters","Copy the plot and change names","Repeat exact descriptions","Keep the same ending unchanged"]],
        fill1:["Complete the narrative chain.","goal → obstacle → choice → {{blank}}."],
        choice2:["Which revision makes setting functional?",["A flood blocks the only route and forces a decision","The room is blue","The setting is named once","The background never affects events"]],
        fill2:["Complete the process.","Revise meaning and structure before final {{blank}}."],
        apply:"Plan an original story adapting one structural technique, one viewpoint feature and one motif from mentor texts.",
        enrichment1:"Write two alternative climaxes arising from different character decisions and evaluate thematic effects.",
        enrichment2:"Audit a draft for accidental copying and redesign the most derivative elements."
      }
    }
  };

  window.SkillrYear6Register("english", S, Object.keys(S));
})();
