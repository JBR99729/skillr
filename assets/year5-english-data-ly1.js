(() => {
  "use strict";
  if (!window.SkillrYear5Register) throw new Error("Year 5 curriculum base is not loaded.");
  const mk=(s)=>({...s,activities:s.activities||[
    {title:"Feature and strategy annotation",text:`Identify the structural, language or multimodal choices central to ${s.title.toLowerCase()} and connect them to purpose.`,visual:s.modelVisual},
    {title:"Compare and evaluate",text:"Compare two texts, methods or responses using explicit criteria and evidence.",visual:s.applyVisual},
    {title:"Create and review",text:"Apply the strategy in an original task, then monitor, revise and explain the decisions.",visual:{type:"cards",data:(s.quick||[]).slice(0,4)}}
  ],mastery:s.mastery||["Identify relevant features","Use purposeful strategies","Explain effects with evidence","Apply for audience and purpose","Monitor and evaluate"]});

  const S={
    AC9E5LY01:mk({
      slug:"ac9e5ly01-explain-how-text-features-including-sound-and-visual-features-and",
      title:"How Text Features Shape Meaning",
      subtitle:"Connect sound, visual, structural and language choices to audience and purpose",
      desc:"explain how text features, including sound and visual features, and language features, including devices, shape meaning and vary according to purpose and audience",
      learn:"Students analyse how headings, layout, navigation, sound, image, typography, sentence choices and literary or persuasive devices work together and vary across modes, purposes and audiences.",
      core:"A feature’s meaning comes from its relationship with surrounding content, mode, audience and purpose—not from a fixed effect label.",
      modelTitle:"Analyse a feature system in a multimodal text",
      modelVisual:{type:"table",data:[["feature","choice","meaning/audience function"],["heading","question form","invites reader inquiry"],["image","close-up of damaged habitat","creates salience and emotional focus"],["sound","low repeated pulse","builds concern"],["layout","evidence beside claim","supports checking"],["modal language","should","recommends rather than commands"]]},
      modelNote:"Explain the combined pattern: a sound, image or word may produce a different effect in another genre or audience context.",
      applyTitle:"Adapt one message for different purposes",
      applyVisual:{type:"compare",data:[["information page","labels, neutral explanation, navigation"],["campaign video","salient imagery, music, call to action"],["museum display","object, caption, timeline and source"],["younger audience","concrete image, defined vocabulary, shorter sequence"]]},
      applyNote:"Adapt form and support while preserving factual accuracy. Accessibility features such as captions and descriptive labels are part of meaning-making.",
      terms:[["text feature","structural or presentation element guiding use and meaning"],["language device","deliberate wording pattern shaping effect"],["multimodal","combining more than one communication mode"]],
      mistakes:[["Feature has one universal effect","Context and combinations matter."],["Visuals treated as decoration","They may add evidence, viewpoint or organisation."],["Audience adaptation changes facts","Change support and form, not truth."],["Sound analysed separately from sequence","Timing and image interaction shape effect."]],
      quick:["Identify feature system.","Explain one combined effect.","Adapt for audience.","Evaluate accessibility.","Avoid formula analysis."],
      questions:{
        choice1:["Which response best analyses a multimodal feature?",["The close-up image and low music together create concern before the call to action","The image is there","Music is always sad","Every heading has the same effect"]],
        fill1:["Complete the analysis principle.","A feature’s effect depends on context, purpose and intended {{blank}}."],
        choice2:["Which adaptation preserves accuracy?",["Define technical words and add a labelled diagram for younger readers","Change the data to simpler numbers","Remove source information","Replace evidence with a slogan"]],
        explain:"Analyse how one visual, one sound and one language feature combine in a text.",
        fill2:["Complete the accessibility feature.","Spoken information in video should be supported by accurate {{blank}}."],
        apply:"Redesign one message as an information page and a campaign video, explaining feature changes.",
        enrichment1:"Create a feature map for a complex multimodal text, showing reinforcement, extension and contradiction across modes.",
        enrichment2:"Evaluate how the same image changes meaning under two different captions, soundtracks and layouts."
      }
    }),
    AC9E5LY02:mk({
      slug:"ac9e5ly02-interaction-skills-and-awareness-of-how-to-contribute-to-discussions",
      title:"Paraphrasing, Questioning and Justifying in Discussion",
      subtitle:"Clarify meaning, connect ideas and present evidence-based viewpoints",
      desc:"use appropriate interaction skills including paraphrasing and questioning to clarify meaning, make connections to own experience and present and justify a point of view",
      learn:"Students listen actively, paraphrase another contribution accurately, ask clarifying and probing questions, connect relevant experience and justify their viewpoint while inviting response.",
      core:"A productive discussion contribution shows accurate listening before extending, questioning or challenging the idea.",
      modelTitle:"Use a discussion move sequence",
      modelVisual:{type:"flow",data:["listen for claim and reason","paraphrase accurately","ask clarify/probe question","connect relevant evidence or experience","state viewpoint","justify","invite response"]},
      modelNote:"Paraphrasing is not agreeing. It tests understanding and allows the original speaker to correct a misinterpretation.",
      applyTitle:"Distinguish useful question types",
      applyVisual:{type:"table",data:[["question type","stem","purpose"],["clarifying","What do you mean by…?","make meaning clear"],["probing","What evidence supports…?","deepen reasoning"],["connecting","How does this relate to…?","link ideas"],["challenging","Could there be another explanation?","test claim respectfully"],["reflective","Has your view changed?","evaluate thinking"]]},
      applyNote:"Personal experience should illuminate the topic, not replace evidence or dominate the discussion.",
      terms:[["paraphrase","restatement of meaning in new wording"],["probing question","question seeking deeper evidence or reasoning"],["justification","reason and evidence supporting a viewpoint"]],
      mistakes:[["Paraphrase repeats exact words","Restate meaning concisely and accurately."],["Question used as disguised insult","Keep tone and purpose respectful."],["Personal story changes topic","Link it explicitly to the claim."],["Viewpoint asserted without reasons","Use evidence, examples or principles."]],
      quick:["Paraphrase a claim.","Ask a probing question.","Connect relevant experience.","Justify viewpoint.","Invite response."],
      questions:{
        choice1:["Which response begins with an accurate paraphrase?",["So your main point is that the cost decreases over time; is that correct?","You are wrong","I will talk about myself now","That is boring"]],
        fill1:["Complete the probing question.","What {{blank}} supports that claim?"],
        choice2:["What is the purpose of paraphrasing?",["To check and show understanding","To force agreement","To repeat every word","To avoid listening"]],
        explain:"Show how to disagree after paraphrasing another viewpoint accurately and respectfully.",
        fill2:["Complete the viewpoint structure.","position + reason + evidence + invitation for {{blank}}"],
        apply:"Create a sequence of five discussion moves responding to a claim about school transport.",
        enrichment1:"Design a discussion protocol that rewards listening, evidence and equitable participation. Explain monitoring criteria.",
        enrichment2:"Analyse a failed discussion for paraphrasing, question quality, relevance and power. Rewrite key turns."
      }
    }),
    AC9E5LY03:mk({
      slug:"ac9e5ly03-the-characteristic-features-used-in-imaginative-informative-and-persuasive",
      title:"Characteristic Features and Hybrid Text Purposes",
      subtitle:"Explain how imaginative, informative and persuasive choices meet audience needs",
      desc:"explain characteristic features used in imaginative, informative and persuasive texts to meet the purpose of the text",
      learn:"Students explain how broad purpose shapes structure, evidence, vocabulary, sentence patterns and visuals, while recognising hybrid texts and identifying the dominant audience outcome.",
      core:"Characteristic features are adaptable patterns serving a purpose; they are evidence for classification, not rigid rules.",
      modelTitle:"Compare purpose–feature systems",
      modelVisual:{type:"table",data:[["purpose","audience outcome","structure/language/visual"],["imaginative","experience or explore","plot, viewpoint, imagery, visual mood"],["informative","understand","classification/explanation, technical terms, diagrams"],["persuasive","believe or act","position, reasons, evidence, modality, salient call"],["hybrid","several outcomes","dominant purpose plus supporting secondary features"]]},
      modelNote:"Facts can appear in persuasion and narrative can carry information. Determine which outcome controls most choices.",
      applyTitle:"Classify a hybrid conservation text",
      applyVisual:{type:"compare",data:[["story opening","engages through an animal viewpoint"],["fact boxes","provide species evidence"],["call to action","asks audience to change behaviour"],["dominant purpose","persuasive if action controls conclusion and selection"],["secondary purpose","informative and imaginative support"]]},
      applyNote:"Justify classification from the whole pattern rather than title, colour or one modal verb.",
      terms:[["dominant purpose","main audience outcome controlling the text"],["characteristic feature","common structural or language choice for a purpose"],["hybrid text","text combining purposes or forms"]],
      mistakes:[["One fact makes text informative","Consider dominant audience outcome."],["Imaginative text cannot teach","Literature can carry information and ideas."],["Persuasion means no evidence","Credible persuasion often relies on evidence."],["Hybrid means unclassifiable","Identify dominant and secondary purposes."]],
      quick:["Identify dominant purpose.","Name feature evidence.","Compare three types.","Explain hybrid support.","Transform one topic."],
      questions:{
        choice1:["Which feature pattern most strongly supports a persuasive purpose?",["position, evidence, modality and call to action","plot and climax only","definitions only","chronological dates only"]],
        fill1:["Complete the classification rule.","Identify the dominant audience {{blank}} from the full feature pattern."],
        choice2:["Which statement about hybrid texts is accurate?",["They can combine purposes while one remains dominant","They have no purpose","They cannot use evidence","They are always narratives"]],
        explain:"Explain the dominant and secondary purposes of a campaign text using a story, facts and a call to action.",
        fill2:["Complete the transformation.","The same topic can be imagined, explained or {{blank}} depending on purpose."],
        apply:"Create three short openings for the same topic: imaginative, informative and persuasive. Annotate features.",
        enrichment1:"Develop a classification rubric for complex hybrid texts and test it on three cases.",
        enrichment2:"Design a hybrid text where secondary purposes strengthen rather than confuse the dominant purpose."
      }
    }),
    AC9E5LY04:mk({
      slug:"ac9e5ly04-different-types-of-texts-reading-and-viewing-accurately-and-fluently",
      title:"Navigating Texts for Specific Purposes",
      subtitle:"Use skimming, scanning, close reading and monitoring strategically",
      desc:"navigate and read texts for specific purposes, monitoring meaning using strategies such as skimming, scanning and confirming",
      learn:"Students choose navigation and reading strategies according to a question, use headings, indexes, search and visual pathways, and confirm located information through context and source checking.",
      core:"Efficient reading changes with purpose: locating one fact, understanding a process and evaluating an argument require different pathways and depth.",
      modelTitle:"Choose a reading strategy from the task",
      modelVisual:{type:"table",data:[["purpose","strategy sequence"],["get overview","skim title, headings, first/last sentences, visuals"],["find one value","scan labels, keywords, table or index"],["understand explanation","close read sequence, connectives and diagram"],["compare claims","locate evidence, read context and source"],["follow instructions","read full sequence, conditions and warnings"]]},
      modelNote:"Scanning locates candidates; confirming requires reading enough surrounding information to ensure the value or statement answers the question.",
      applyTitle:"Navigate print and digital pathways",
      applyVisual:{type:"flow",data:["define information need","predict likely section","use contents/search/menu","scan keywords","open relevant section","read context","confirm source/date/unit","record answer"]},
      applyNote:"Search-result snippets and highlighted words are not complete evidence. Check page context, headings and source credibility.",
      terms:[["skimming","rapid reading for overview and structure"],["scanning","searching for a specific word, value or feature"],["confirming","checking located information in context"]],
      mistakes:[["Skimming replaces comprehension","Use it to orient, then read closely where needed."],["First keyword match accepted","Confirm meaning, unit and context."],["Digital search considered source evaluation","Assess source and evidence separately."],["Same pathway used for every task","Let purpose determine strategy."]],
      quick:["Skim for overview.","Scan for a value.","Confirm context.","Use index/search.","Evaluate source pathway."],
      questions:{
        choice1:["Which strategy best locates one date in a long report?",["scan headings and keywords, then confirm context","read every word at the same speed","guess from the cover","use the first number seen"]],
        fill1:["Complete the strategy sequence.","scan → locate candidate → read surrounding context → {{blank}}"],
        choice2:["What is skimming mainly used for?",["gaining an overview of topic and structure","proving every claim","memorising every word","correcting spelling"]],
        explain:"Compare the reading pathway for finding one measurement and for evaluating an argument.",
        fill2:["Complete the digital check.","Verify source, date, unit and page {{blank}}."],
        apply:"Use a specific research question to design a navigation route through a report, table and webpage.",
        enrichment1:"Create a timed navigation challenge with several text types and explain why each task needs a different strategy.",
        enrichment2:"Evaluate how search interfaces and page design influence which information readers notice and trust."
      }
    }),
    AC9E5LY05:mk({
      slug:"ac9e5ly05-comprehension-strategies-such-as-visualising-predicting-connecting",
      title:"Strategic Comprehension and Evaluation",
      subtitle:"Build, monitor and evaluate literal and inferred meaning across texts",
      desc:"use comprehension strategies such as visualising, predicting, connecting, summarising, monitoring and questioning to build literal and inferred meaning, and evaluate texts by drawing on a growing knowledge of context, text structures and language features",
      learn:"Students select and combine strategies deliberately, revise predictions and mental models, distinguish inference from assumption, summarise relationships and evaluate credibility or craft using criteria.",
      core:"Comprehension is an active cycle of constructing meaning, checking it against evidence and repairing or revising when the text challenges the reader’s model.",
      modelTitle:"Use an evidence-monitoring cycle",
      modelVisual:{type:"cycle",data:["set purpose and activate knowledge","predict/question","read/view and visualise","infer/connect","monitor mismatch","repair/revise","summarise","evaluate"]},
      modelNote:"Readers should be able to explain why a strategy helped at that point rather than completing every strategy routinely.",
      applyTitle:"Separate literal, inferred and evaluative claims",
      applyVisual:{type:"table",data:[["level","example"],["literal","The source states rainfall fell by 18%."],["inference","The community may face water restrictions, based on reservoir data."],["evaluation","The explanation is credible because methods and sources are transparent."],["monitoring","This contradicts my prediction, so I reread the graph scale."]]},
      applyNote:"Evaluation draws on context, structure, evidence quality, language and visual choices; personal preference alone is not sufficient.",
      terms:[["inference","meaning built from evidence and relevant knowledge"],["monitoring","checking and regulating understanding"],["evaluation","judgement supported by criteria and evidence"]],
      mistakes:[["Prediction defended after contradiction","Revise it using new evidence."],["Connection becomes unrelated story","Explain how it informs meaning."],["Summary lists every detail","Capture central relationships."],["Inference has no textual anchor","Cite clues and reasoning."],["Evaluation equals liking","Use credibility or effectiveness criteria."]],
      quick:["Build an inference.","Revise a prediction.","Repair confusion.","Summarise relationship.","Evaluate credibility."],
      questions:{
        choice1:["Which statement is an inference?",["The community may need restrictions because reservoir levels fell","The graph states 42%","The title is Water Supply","The table has five rows"]],
        fill1:["Complete the comprehension cycle.","construct meaning → monitor → repair or {{blank}}"],
        choice2:["Which is a valid evaluation criterion?",["source transparency and evidence quality","whether the reader likes the font","number of paragraphs alone","personal agreement only"]],
        explain:"Use literal evidence to build and qualify one inference, then state what later evidence could change it.",
        fill2:["Complete the summary rule.","A summary prioritises central ideas and important {{blank}}."],
        apply:"Select three comprehension strategies for a complex multimodal text and explain when each becomes useful.",
        enrichment1:"Compare two plausible interpretations of an ambiguous text. Rank evidence and identify unresolved uncertainty.",
        enrichment2:"Design a comprehension strategy diagnostic that identifies whether difficulty comes from vocabulary, structure, inference, visual scale or background knowledge."
      }
    })
  };

  window.SkillrYear5Register("english",S,Object.keys(S));
})();
