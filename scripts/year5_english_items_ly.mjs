const item = (question, correct, wrongs, summary, hint, focus, visualKind = "none", visualDescription = "") => ({
  question, correct, wrongs, summary, hint, focus, visualKind, visualDescription
});

const sets = (rows, makers) => rows.flatMap((row, group) => makers.map((make, turn) => make(row, group * makers.length + turn)));
const pic = (description) => ["cards", description];
const spelled = (word) => `${word}, spelled ${[...word].join(" ")}`;

const ly01Rows = [
  ["a reef poster", "a labelled coral photograph", "helps readers connect each warning to a visible part of the reef", "a decorative wave border", "only fills empty space"],
  ["a bushfire safety video", "a rising warning tone before the evacuation map", "signals urgency and directs attention to the next action", "quiet music throughout", "makes every detail equally important"],
  ["a museum webpage", "clickable dates on a timeline", "lets visitors explore events in chronological order", "a spinning logo", "shows that the museum has a logo"],
  ["a sports report", "a bar graph beside the match summary", "makes the scoring comparison quick to check", "a team-coloured border", "proves which team deserved to win"],
  ["a water-saving campaign", "a close-up of an almost empty dam", "makes the shortage feel immediate before the call to act", "a cartoon droplet mascot", "guarantees that every claim is correct"],
  ["a recipe for younger cooks", "numbered photographs for each stage", "shows the sequence and what each stage should look like", "a patterned background", "replaces the need to name ingredients"],
  ["a podcast about nocturnal animals", "soft night sounds under the opening", "establishes the setting without interrupting the explanation", "a loud bell after every sentence", "makes the facts more scientific"],
  ["a train timetable app", "colour-coded route lines with station labels", "helps travellers follow one route and locate changes", "an animated train", "shows the exact arrival time by itself"],
  ["a class climate presentation", "one icon beside each key cause", "supports recall while the speaker explains the evidence", "paragraphs copied onto every slide", "lets listeners read instead of listening"],
  ["an online book review", "a star rating beside reasons and examples", "summarises the judgement while the words justify it", "a large author photograph", "proves the reviewer understood the book"]
];
const ly01Makers = [
  (r,i)=>item(`In ${r[0]}, which feature choice most clearly supports the purpose?`,r[1],[r[3],"A random clip-art picture"],`The feature supports meaning because it ${r[2]}.`,`Match the feature to what the audience needs to notice or do.`,`feature-purpose-${i}`,...pic(`Two labelled design choices for ${r[0]} are compared.`)),
  (r,i)=>item(`Why is ${r[1]} effective in ${r[0]}?`,r[2],[r[4],"It makes the text longer"],`Its effect comes from how it works with the content and purpose.`,`Explain the audience effect, not merely what the feature looks or sounds like.`,`combined-effect-${i}`,...pic(`The selected feature is shown in its ${r[0]} context.`)),
  (r,i)=>item(`A designer removes ${r[1]} from ${r[0]}. What is the most likely loss?`,`Readers lose support that ${r[2]}`,[`Readers can no longer see ${r[3]}`,"Every fact automatically becomes false"],`Removing a purposeful feature can weaken navigation, emphasis or understanding.`,`Ask what information or guidance this feature adds.`,`feature-removal-${i}`,...pic(`Before-and-after layouts show ${r[0]} with and without the feature.`)),
  (r,i)=>item(`Which explanation best analyses the feature system in ${r[0]}?`,`${r[1]} works with the words and ${r[2]}`,[`${r[3]} is attractive, so the text must be reliable`,"All visual and sound features have the same effect in every text"],`Strong analysis connects a specific choice, its context and its effect.`,`Use the pattern: choice, context, audience effect.`,`feature-analysis-${i}`,...pic(`Words and the key feature in ${r[0]} are connected by arrows.`))
];

const ly02Rows = [
  ["The oval should be larger because more students can join the game.","So you think a larger oval would allow more students to participate. Is that right?","What evidence shows how many students would use it?","At lunch, I have also seen students waiting for space."],
  ["Our class should grow herbs because the canteen could use them.","Your idea is that a herb garden could supply the canteen. Have I understood?","Which herbs would the canteen actually need?","My family garden shows that herbs can grow in small beds."],
  ["Homework should include more choice so students can use their strengths.","You are suggesting choices could let students show learning in different ways. Correct?","How would teachers check that each choice has equal challenge?","I work more carefully when I can choose between writing and presenting."],
  ["The library needs a quiet zone because some readers cannot focus near group work.","Your main point is that a separate quiet area could improve concentration. Is that accurate?","What observations support the need for a separate zone?","I have had to reread pages when nearby groups were talking."],
  ["Excursions should use public transport when practical to reduce traffic.","You propose public transport for suitable excursions to reduce traffic. Is that your view?","What limits, such as travel time or accessibility, should we consider?","Our museum trip by train avoided parking delays."],
  ["The school should collect rainwater for the vegetable beds.","You think stored rainwater could be used on the garden. Have I captured your idea?","How much water could the roof collect in a typical month?","A tank at my sports club supplies water for nearby plants."],
  ["Class presentations should allow audience questions at the end.","You argue that a question time would help listeners clarify ideas. Is that right?","How could the speaker keep questions within the time limit?","Questions have helped me notice which part of my explanation was unclear."],
  ["Students should help choose some playground equipment.","Your view is that students should contribute to some equipment decisions. Correct?","How would we gather views from students who prefer different activities?","A survey helped my club choose equipment fairly."],
  ["A weekly screen-free lunch could encourage more face-to-face games.","You suggest one screen-free lunch may encourage students to play together. Is that accurate?","What evidence would show whether participation actually increased?","At camp, shared games began when devices were stored away."],
  ["Native shrubs would bring more insects and birds to the school grounds.","You believe native shrubs could support more local wildlife. Have I understood?","Which local species are likely to use those shrubs?","Native flowers near my home attract bees in spring."]
];
const ly02Makers = [
  (r,i)=>item(`A speaker says, “${r[0]}” Which reply paraphrases before responding?`,r[1],["That is wrong, and here is my idea.","I agree with every word, so there is nothing to discuss."],`The reply restates the meaning and checks it without assuming agreement.`,`Begin with the speaker’s main claim, then check your understanding.`,`paraphrase-${i}`),
  (r,i)=>item(`After hearing “${r[0]}” which question would deepen the discussion?`,r[2],["Can we change the topic now?","Why would anyone think that?"],`A probing question asks for evidence, conditions or reasoning.`,`Choose the question that respectfully tests the claim.`,`probing-${i}`),
  (r,i)=>item(`Which personal connection is relevant to the claim “${r[0]}”?`,r[3],["I like talking about my weekend.","My favourite colour is blue."],`A useful connection is brief and clearly linked to the claim.`,`Select experience that helps explain or test the idea.`,`connection-${i}`),
  (r,i)=>item(`Which contribution best moves discussion of “${r[0]}” forward?`,`${r[1]} ${r[2]}`,["I will repeat the exact sentence louder.","My story is different, so the original claim does not matter."],`Productive discussion combines accurate listening with a purposeful question.`,`Look for both a fair paraphrase and a question that invites evidence.`,`discussion-sequence-${i}`)
];

const ly03Rows = [
  ["a story following a joey during a flood","imaginative","a viewpoint, rising danger and sensory detail","help readers experience the event"],
  ["a fact sheet explaining how mangroves protect coasts","informative","headings, technical terms and a labelled root diagram","help readers understand a process"],
  ["a speech asking council to protect an old tree","persuasive","a clear position, evidence and a call to act","convince listeners to protect the tree"],
  ["a comic that teaches bike safety through a character's mistake","hybrid with an informative purpose","a narrative sequence plus explicit safety explanations","teach safe choices through an engaging example"],
  ["a webpage urging families to reduce food waste","persuasive","measured waste data, recommendations and direct audience address","encourage a change in behaviour"],
  ["a biography describing a scientist's discoveries","informative","chronological stages, factual detail and source captions","explain a person's contribution"],
  ["a poem creating the mood of an approaching storm","imaginative","imagery, rhythm and carefully chosen sound patterns","create an experience and mood"],
  ["a brochure comparing three walking tracks","informative","comparison headings, maps and difficulty ratings","help walkers make an informed choice"],
  ["a documentary mixing an animal's journey with habitat facts","hybrid with an informative purpose","a story thread supported by maps and expert evidence","explain migration while maintaining interest"],
  ["an advertisement asking students to join a recycling team","persuasive","benefit claims, inclusive language and a sign-up instruction","motivate students to join"]
];
const ly03Makers = [
  (r,i)=>item(`What is the dominant purpose of ${r[0]}?`,r[1],r[1]==="imaginative"?["informative","persuasive"]:r[1]==="persuasive"?["informative","imaginative"]:r[1]==="informative"?["persuasive","imaginative"]:["persuasive only","imaginative only"],`The dominant purpose is to ${r[3]}.`,`Decide what the audience is mainly meant to experience, understand, believe or do.`,`dominant-purpose-${i}`),
  (r,i)=>item(`Which feature pattern best suits ${r[0]}?`,r[2],["a random mixture of facts and jokes","a decorative border with no connection to meaning"],`These features work together to ${r[3]}.`,`Choose features by their combined purpose, not by one isolated detail.`,`purpose-features-${i}`,...pic(`A feature map links ${r[2]} to the audience outcome.`)),
  (r,i)=>item(`Why should ${r[0]} use ${r[2]}?`,`They support the goal to ${r[3]}`,["They are required in every text","They make the text belong to every purpose equally"],`Characteristic features are adaptable choices that serve the intended outcome.`,`Connect the pattern of features to the audience outcome.`,`feature-justification-${i}`),
  (r,i)=>item(`Which classification is best supported for ${r[0]}?`,`${r[1]}, because its main feature pattern aims to ${r[3]}`,["informative, because every text contains some information","imaginative, because a colourful image appears"],`Classification depends on the whole pattern and dominant audience outcome.`,`Do not let one fact, colour or story moment decide the classification.`,`classification-evidence-${i}`)
];

const ly04Rows = [
  ["find the 2018 rainfall total in a long climate report","scan headings and tables for 2018, then check the unit and surrounding label","scanning and confirming"],
  ["gain a quick overview of a chapter about Federation","skim the title, headings, opening sentences and visuals","skimming"],
  ["follow a procedure for testing soil drainage","read every step, condition and safety note in sequence","close procedural reading"],
  ["compare two claims about plastic waste","locate each claim, read its evidence and check source details","evidence comparison"],
  ["locate the meaning of a technical word in a textbook","use the index or glossary, then reread the sentence where it appears","navigation and context confirmation"],
  ["understand why an eclipse occurs","closely read the causal explanation while tracing the labelled diagram","close multimodal reading"],
  ["find when the next bus leaves a timetable","scan the correct route and day column, then confirm morning or afternoon","scanning and confirming"],
  ["judge whether a webpage is current","find the publication date, author and updated evidence","source checking"],
  ["choose a suitable bushwalk from a guide","compare distance, difficulty, conditions and map notes","purposeful comparison"],
  ["answer how a character's view changes across a novel extract","reread key moments and connect words showing the changed viewpoint","close literary reading"]
];
const ly04Makers = [
  (r,i)=>item(`A reader needs to ${r[0]}. What is the best pathway?`,r[1],["Read every word at exactly the same speed","Accept the first matching word without checking context"],`The task calls for ${r[2]}.`,`Let the information need decide where to navigate and how closely to read.`,`strategy-choice-${i}`),
  (r,i)=>item(`Which strategy name best describes this pathway: ${r[1]}?`,r[2],["guessing from the cover","copying without reading"],`The pathway deliberately uses ${r[2]} for the stated purpose.`,`Name what the reader is doing, including any final confirmation.`,`strategy-name-${i}`),
  (r,i)=>item(`After using keywords to ${r[0]}, what should the reader do next?`,`Read enough surrounding information to confirm the match answers the question`,["Stop at the first highlighted word","Ignore labels, dates and units"],`A keyword locates a candidate; context confirms it.`,`Check the heading, sentence, label, date or unit around the match.`,`confirming-${i}`),
  (r,i)=>item(`Why is “${r[1]}” efficient for the goal to ${r[0]}?`,`It directs close attention to the information needed for that purpose`,["It avoids checking whether the information is relevant","It guarantees every source is reliable"],`Efficient readers vary navigation and reading depth according to purpose.`,`Explain how the pathway saves time while preserving accuracy.`,`navigation-reason-${i}`)
];

const ly05Rows = [
  ["A creek that was clear yesterday is brown after heavy rain.","soil may have washed into the creek","the timing of rain and changed water colour","check upstream conditions or later evidence"],
  ["Mira hides the torn map when the group asks who used it.","Mira may fear being blamed","her action and the group's question","revise if another character admits tearing it"],
  ["A graph rises sharply after the school adds shade sails.","shade may have increased lunchtime use","the timing and the rise in use","check weather or other changes before claiming cause"],
  ["The article gives survey results but does not state how many people answered.","the claim's reliability is uncertain","the missing sample size","look for the method or original survey"],
  ["A character keeps checking the station clock and tapping one foot.","the character may be anxious about time","repeated clock checks and restless movement","confirm with later dialogue or events"],
  ["The instructions say the mixture should remain lumpy, but Arun keeps stirring until smooth.","Arun may have misunderstood the desired texture","his action contradicts the instruction","reread the step and inspect the example image"],
  ["Two reports give different numbers for the same bird population.","the reports may use different dates or methods","the conflicting totals","compare sources, dates and counting methods"],
  ["The narrator describes the empty house as breathing in the wind.","the language creates an eerie living presence","personification of the house","compare other setting details"],
  ["A map legend shows one centimetre represents five kilometres.","a four-centimetre route represents twenty kilometres","the stated scale","measure again if the line is curved"],
  ["The final paragraph repeats the opening image but changes darkness to dawn.","the ending suggests hope or renewal","the changed image from darkness to dawn","connect the shift to the character's outcome"]
];
const ly05Makers = [
  (r,i)=>item(`Read this evidence: “${r[0]}” Which inference is best supported?`,r[1],["The opposite is certainly true","A conclusion unrelated to the evidence"],`The inference uses ${r[2]} while remaining open to revision.`,`Combine a precise clue with relevant knowledge; do not claim more than it supports.`,`inference-${i}`),
  (r,i)=>item(`Which clue most directly supports the inference that ${r[1]}?`,r[2],["The number of words in the sentence","A personal preference not mentioned in the text"],`The selected clue is the textual or visual anchor for the inference.`,`Point to evidence before explaining your reasoning.`,`evidence-${i}`),
  (r,i)=>item(`A reader infers that ${r[1]}. What is the best monitoring step?`,r[3],["Keep the inference even if later evidence contradicts it","Replace it with an unsupported guess"],`Monitoring means checking and revising a mental model as evidence develops.`,`Ask what new evidence would confirm, qualify or overturn the inference.`,`monitor-${i}`),
  (r,i)=>item(`Which response best evaluates the reasoning about “${r[0]}”?`,`The inference is plausible. The supporting evidence is ${r[2]}, but the reader should ${r[3]}`,["The inference must be true because it sounds interesting","The reader should judge only whether they like the topic"],`Evaluation weighs evidence strength and acknowledges uncertainty.`,`Use a criterion: evidence relevance, source quality or consistency.`,`evaluation-${i}`)
];

const ly06Rows = [
  ["an explanation of how dunes protect a beach","cause-and-effect paragraphs","have gradually trapped","a labelled cross-section showing sand and plant roots"],
  ["a persuasive letter requesting safer bike racks","a position followed by reason-and-evidence paragraphs","should be installed","a small site map marking the proposed location"],
  ["a narrative about becoming lost at dusk","a sequence that builds tension toward discovery","had been fading","a restrained illustration establishing the track"],
  ["an information page comparing renewable energy sources","one paragraph for each source plus a comparison conclusion","can reliably supply","a table comparing output and limits"],
  ["a campaign post encouraging waste-free lunches","problem, benefits and a practical call to action","could greatly reduce","a simple before-and-after waste chart"],
  ["a report on a class seed investigation","question, method, results and evidence-based conclusion","were measured carefully","a graph using labelled axes and units"],
  ["a biography of a local community leader","chronological stages grouped around major contributions","continued to organise","a captioned timeline with source dates"],
  ["a review comparing two adventure novels","criteria-based comparison paragraphs","creates more effectively","a concise comparison table"],
  ["instructions for constructing an insect shelter","numbered stages with conditions and safety advice","must be positioned","a labelled assembly diagram"],
  ["an imaginative diary entry from a lighthouse keeper","dated reflections shaped by the keeper's viewpoint","might have mistaken","a period map that adds setting information"]
];
const ly06Makers = [
  (r,i)=>item(`A student is planning ${r[0]}. Which structure best matches the purpose?`,r[1],["Ideas placed in random order","One unbroken paragraph containing every detail"],`The proposed structure makes relationships clear for the audience.`,`Plan what each paragraph must achieve before drafting sentences.`,`planning-${i}`),
  (r,i)=>item(`Which expanded verb group adds suitable precision to ${r[0]}?`,r[2],["did stuff","is very thing"],`The verb group expresses time, modality or manner precisely.`,`Choose a verb group that fits both meaning and tense.`,`verb-group-${i}`),
  (r,i)=>item(`Which visual would genuinely add meaning to ${r[0]}?`,r[3],["an unrelated stock photograph","a decorative pattern repeating no information"],`The visual extends, organises or clarifies information the audience needs.`,`Ask whether the visual has a clear job beyond decoration.`,`multimodal-${i}`,...pic(`A draft layout reserves space for ${r[3]}.`)),
  (r,i)=>item(`During revision of ${r[0]}, what should the writer check before final proofreading?`,`Whether the text uses ${r[1]} to develop its purpose and whether ${r[3]} connects to the words`,["Whether every sentence has the same length","Whether a spell-checker has changed every flagged word"],`Revision improves meaning and organisation before surface editing.`,`Review purpose, paragraph work and mode integration before punctuation and spelling.`,`revision-${i}`)
];

const ly07Rows = [
  ["explain why local frogs need healthy wetlands","a wetland diagram with three concise labels","pause after each cause before explaining its effect","cause, evidence and consequence"],
  ["persuade students to walk safely near the car park","a site map highlighting two danger points","use a firm, calm tone for the recommended actions","problem, evidence and action"],
  ["report results from a bridge-building investigation","a graph with labelled axes and units","slow slightly when interpreting the key result","method, result and interpretation"],
  ["retell a historical event from two viewpoints","two images with short source captions","change pitch subtly when shifting viewpoint","event, contrasting perspectives and reflection"],
  ["teach younger students how to check online claims","three large verification icons","use clear signposts and allow time after each step","question, check and decide"],
  ["recommend a novel to the school book club","a cover image beside three selection criteria","sound enthusiastic while keeping an even pace","judgement, examples and recommendation"],
  ["compare solar and wind energy","one readable comparison chart","emphasise contrast words such as however and whereas","shared goal, differences and trade-offs"],
  ["present a plan for a sensory garden","a labelled site sketch","increase volume slightly for the final proposal","need, design choices and benefits"],
  ["explain the stages of the water cycle","an uncluttered cycle diagram","use brief pauses as the diagram moves to each stage","sequence, process and return"],
  ["share a dramatic monologue as an explorer","one map showing the journey route","vary pace to build tension without rushing key words","setting, challenge and decision"]
];
const ly07Makers = [
  (r,i)=>item(`A student will ${r[0]}. Which visual best supports the spoken message?`,r[1],["a slide filled with the complete script","an animated image unrelated to the ideas"],`The visual clarifies information while leaving the speaker to elaborate.`,`Choose a readable visual with a job the spoken words cannot do as efficiently.`,`presentation-visual-${i}`,...pic(`A presentation slide contains ${r[1]}.`)),
  (r,i)=>item(`Which rehearsal adjustment best suits a presentation that will ${r[0]}?`,r[2],["Speak as quickly as possible throughout","Use maximum volume for every sentence"],`Controlled delivery helps listeners process the intended meaning.`,`Match pace, pitch, tone and volume to the message and room.`,`delivery-${i}`),
  (r,i)=>item(`Which sequence best organises the key ideas when presenting to ${r[0]}?`,r[3],["unrelated details followed by a new topic","the conclusion first with no explanation or evidence"],`A clear sequence makes relationships audible to listeners.`,`Give each section one role and signpost movement between sections.`,`sequence-${i}`),
  (r,i)=>item(`A rehearsal for a talk that will ${r[0]} runs one minute over time. What is the best revision?`,`Keep the essential ${r[3]} and remove repeated or minor detail`,["Speak one minute faster without pausing","Delete the evidence but keep every decoration"],`Timing problems often reveal overloaded content that should be prioritised.`,`Protect the main idea, evidence and audience pathway.`,`rehearsal-${i}`)
];

const ly08Rows = [
  ["letters drift above and below the writing line","baseline alignment","practise one line of the affected letter pattern, then use it in a sentence"],
  ["words run together during fast note-taking","word spacing","pause briefly between words while keeping letter movement fluent"],
  ["joined letters become hard to recognise","letter formation","slow the difficult joins, check their shapes, then rebuild pace"],
  ["the writer presses so hard that the hand tires","comfortable pressure","relax the grip and test a lighter sustainable movement"],
  ["ascenders vary greatly in height","consistent letter size","compare a short sample with a model and target one height pattern"],
  ["neat writing becomes extremely slow in a timed task","sustainable pace","practise short meaningful passages while preserving readability"],
  ["the final letters of words trail into long strokes","clear word endings","rehearse stopping movements in words, then transfer to paragraphs"],
  ["some joins make the next letter look like a different letter","approved clear joins","leave unsuitable pairs unjoined if the taught style allows"],
  ["writing begins clearly but deteriorates after one page","endurance and posture","use brief checks of posture, grip and legibility during extended writing"],
  ["practice sheets look neat but class writing does not improve","transfer to authentic writing","move from a short pattern to words, sentences and real class notes"]
];
const ly08Makers = [
  (r,i)=>item(`A handwriting sample shows that ${r[0]}. What should the writer target first?`,r[1],["joining every letter regardless of clarity","maximum speed with no rereading"],`A specific diagnosis leads to an efficient practice target.`,`Choose the feature that most affects readability, comfort or fluency.`,`handwriting-diagnosis-${i}`),
  (r,i)=>item(`Which practice response best addresses this issue: ${r[0]}?`,r[2],["Copy several pages as fast as possible","Press harder and ignore discomfort"],`Effective practice isolates one movement and then transfers it to meaningful writing.`,`Work accurately in a small dose before rebuilding normal pace.`,`handwriting-practice-${i}`),
  (r,i)=>item(`How should progress be measured when ${r[0]}?`,`Compare readability, comfort and suitable pace before and after targeted practice`,["Count speed only, even if letters cannot be read","Judge the page only by how decorative it looks"],`Fluency balances automatic movement, legibility, comfort and task-appropriate pace.`,`Use more than one measure and test the skill in real writing.`,`handwriting-measure-${i}`),
  (r,i)=>item(`When ${r[0]}, why is this response useful: ${r[2]}?`,`It directly develops ${r[1]} and transfers the change into normal writing`,["It guarantees that every letter must be joined","It avoids the need to check whether writing remains readable"],`Targeted practice is linked to diagnosed evidence and authentic use.`,`Explain the connection between the observed issue, the practice and the goal.`,`handwriting-reason-${i}`)
];

const ly09Rows = [
  ["unpredictable","un + predict + able","un-pre-dict-a-ble","not able to be predicted","predict, prediction and predictable"],
  ["disagreement","dis + agree + ment","dis-a-gree-ment","a lack of agreement","agree, agreed and agreement"],
  ["transportation","trans + port + ation","trans-por-ta-tion","the act or system of carrying across","transport, portable and porter"],
  ["reconsideration","re + consider + ation","re-con-sid-er-a-tion","thinking about something again","consider, considerate and consideration"],
  ["environmental","environment + al","en-vi-ron-men-tal","relating to the environment","environment and environmentally"],
  ["miscommunication","mis + communicate + ion","mis-com-mu-ni-ca-tion","communication understood incorrectly","communicate and communication"],
  ["international","inter + nation + al","in-ter-na-tion-al","involving more than one nation","nation, national and nationality"],
  ["decomposition","de + compose + ition","de-com-po-si-tion","the process of breaking down","compose, compost and decomposition"],
  ["irresponsible","ir + responsible","ir-re-spon-si-ble","not showing responsibility","responsible and responsibility"],
  ["photosynthesis","photo + synthesis","pho-to-syn-the-sis","the process plants use to make food with light","photograph, synthesis and photosynthetic"]
];
const ly09Makers = [
  (r,i)=>item(`Which meaningful-part analysis best helps a reader understand the word ${spelled(r[0])}?`,r[1],[r[2],"split after every vowel letter"],`${r[1]} reveals the word's meaningful structure.`,`Look for a familiar base plus prefixes or suffixes.`,`morpheme-${i}`),
  (r,i)=>item(`Which spoken-syllable guide best supports careful reading of ${spelled(r[0])}?`,r[2],[r[1],"say only the first and last parts"],`The guide supports pronunciation, while meaningful parts support spelling and meaning.`,`Blend every syllable, then check the complete word in its sentence.`,`syllables-${i}`),
  (r,i)=>item(`In a science or humanities sentence, what does ${spelled(r[0])} mean?`,r[3],["a meaning suggested only by the first sound","an unrelated meaning guessed from the topic"],`The word's parts and context support the meaning “${r[3]}.”`,`Combine the base and affix meanings, then test the result in context.`,`word-meaning-${i}`),
  (r,i)=>item(`Which word-family evidence best helps verify the spelling of ${spelled(r[0])}?`,r[4],["a rhyming word with an unrelated spelling","the shortest word in the sentence"],`Related words can preserve the base spelling even when pronunciation changes.`,`Locate the shared base and compare how it is spelled across the family.`,`word-family-${i}`)
];

const ly10Rows = [
  ["decision","decide","the related base preserves the c before the suffix","desishun","sound alone misses the meaningful family"],
  ["happiness","happy + ness","the final y changes to i before this suffix","happyness","the suffix condition requires the letter change"],
  ["running","run + ing","the final consonant doubles after a short stressed vowel","runing","the doubling condition applies"],
  ["hopeful","hope + ful","the final e stays before a suffix beginning with a consonant","hopful","dropping the e would hide the base"],
  ["photograph","Greek photo meaning light and graph meaning write","the origin explains the ph spelling and meaningful roots","fotograf","sound alone does not record the word's history"],
  ["transport","Latin trans meaning across and port meaning carry","the roots explain both meaning and stable spelling","transportt","an extra final letter has no pattern support"],
  ["careless","care + less","the suffix means without and attaches to the complete base","carless","dropping the e changes the visible base and meaning"],
  ["reliable","rely + able","the final y changes to i before the suffix","relyable","the suffix pattern requires the change"],
  ["musician","music + ian","the related word music preserves the c in the spelling","muzishun","pronunciation alone cannot select the standard pattern"],
  ["illegal","il + legal","the negative prefix changes form before a word beginning with l","inlegal","the prefix form must match the base's opening letter"]
];
const ly10Makers = [
  (r,i)=>item(`Which analysis best explains the standard spelling of ${spelled(r[0])}?`,r[1],[r[3],"choose letters only by guessing"],`${r[2]}.`,`Identify the base, affix or origin pattern before writing the whole word.`,`spelling-analysis-${i}`),
  (r,i)=>item(`A student writes ${spelled(r[3])} when intending ${spelled(r[0])}. Which feedback is most useful?`,`${r[2]}`,["Say the word louder and keep the same spelling","Memorise it without looking for a pattern"],`The correction uses a transferable spelling generalisation or word relationship.`,`Explain the condition that applies, not just the correct letters.`,`spelling-feedback-${i}`),
  (r,i)=>item(`Why is the spelling ${spelled(r[3])} not supported for the intended word ${spelled(r[0])}?`,r[4],["It contains too few decorative letters","Every unfamiliar spelling is acceptable"],`Standard spelling reflects sound, meaningful structure and word history.`,`Compare the attempted spelling with the base, affix and relevant condition.`,`spelling-reason-${i}`),
  (r,i)=>item(`Which verification strategy is strongest after writing ${spelled(r[0])}?`,`Check ${r[1]} against a trusted dictionary and the sentence meaning`,["Rely only on whether the spelling looks attractive","Replace it with a shorter unrelated word"],`Independent spellers use pattern evidence and a reliable reference to verify.`,`Confirm both the letter pattern and that the word fits the sentence.`,`spelling-verify-${i}`)
];

export const LY_ITEMS = {
  AC9E5LY01: sets(ly01Rows, ly01Makers),
  AC9E5LY02: sets(ly02Rows, ly02Makers),
  AC9E5LY03: sets(ly03Rows, ly03Makers),
  AC9E5LY04: sets(ly04Rows, ly04Makers),
  AC9E5LY05: sets(ly05Rows, ly05Makers),
  AC9E5LY06: sets(ly06Rows, ly06Makers),
  AC9E5LY07: sets(ly07Rows, ly07Makers),
  AC9E5LY08: sets(ly08Rows, ly08Makers),
  AC9E5LY09: sets(ly09Rows, ly09Makers),
  AC9E5LY10: sets(ly10Rows, ly10Makers)
};
