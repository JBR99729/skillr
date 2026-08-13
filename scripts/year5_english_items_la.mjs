const PRACTICE_CONTEXTS = [
  "class meeting", "football training", "library help desk", "family picnic", "science group", "school assembly",
  "art club", "neighbourhood clean-up", "music rehearsal", "student council", "museum visit", "cooking lesson",
  "garden project", "book discussion", "sports report", "weather presentation", "camp planning", "robotics team",
  "school newsletter", "peer conference", "history display", "fundraising stall", "class debate", "school excursion briefing"
];

const TEST_CONTEXTS = [
  "community radio interview", "wildlife rescue report", "town planning forum", "aquarium information panel",
  "youth theatre rehearsal", "local history podcast", "water-saving campaign", "cycling safety workshop",
  "festival program", "marine research log", "public transport survey", "heritage walk brochure",
  "emergency drill briefing", "farmers market review", "space exhibition talk", "river restoration proposal"
];

const CONTEXTS = [...PRACTICE_CONTEXTS, ...TEST_CONTEXTS];
const pick = (xs, i) => xs[i % xs.length];
const item = (question, correct, wrongs, summary, hint, focus, visualKind = null, visualDescription = null) =>
  ({ question, correct, wrongs, summary, hint, focus, visualKind, visualDescription });

function la01() {
  const sets = [
    ["Could we try that play again, team?", "You people always get it wrong.", "Nobody here can help.", "inclusive leadership"],
    ["Good morning, Ms Chen. Could you please explain the form?", "Hey, mate, give us that thing.", "Whatever. Just do it.", "formal request"],
    ["Our group can solve this together.", "My group is better than yours.", "Only experts should speak.", "group belonging"],
    ["I see your point. May I add another idea?", "That idea is silly.", "Stop talking now.", "respectful disagreement"],
    ["As chair, I will summarise the two suggestions.", "I am important, so listen.", "You must agree with me.", "role and authority"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`During a ${c}, which line best uses language to build ${focus}?`, good, [w1, w2],
      `“${good}” suits the relationship and signals ${focus}.`, `Look for words that fit the speaker's role and include or respect the listener.`, focus,
      "speech-bubbles", `Three labelled speech bubbles from a ${c}, showing contrasting ways of speaking.`);
  });
}

function la02() {
  const sets = [
    ["The evidence suggests the plan may reduce waste.", "The plan will certainly end all waste.", "The plan is unbelievably perfect.", "measured evaluation"],
    ["The performance was energetic and carefully rehearsed.", "The performance was the greatest event ever.", "The performance was a thing.", "supported review language"],
    ["The damaged path is a serious safety concern.", "The path is totally terrifying for everyone.", "The path exists.", "appropriate intensity"],
    ["Students should consider bringing a reusable bottle.", "Students must obey this flawless idea.", "Students might possibly do something.", "responsible recommendation"],
    ["The second design was more stable in all three trials.", "The second design was magically unbeatable.", "The second design was nice.", "evidence-based comparison"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`Which sentence best matches the purpose of ${focus} in a ${c}?`, good, [w1, w2],
      `The wording makes a clear judgement without claiming more than the evidence supports.`, `Compare the strength of each judgement with the evidence it mentions.`, focus,
      "strength-scale", `A three-step language-strength scale beside notes from a ${c}.`);
  });
}

function la03() {
  const sets = [
    ["state the position, give reasons and evidence, answer a counterpoint, conclude", "list unrelated facts, add a title, stop", "give the conclusion, hide the reasons, repeat the title", "argument structure"],
    ["introduce the phenomenon, explain the causes in order, summarise the result", "give instructions, add characters, announce a winner", "show the result, change topic, list opinions", "explanation structure"],
    ["set the scene, develop a problem, resolve the problem", "state a claim, list materials, give warnings", "define a word, show a graph, ask a question", "narrative structure"],
    ["open the topic, move through signposted sections, interpret visuals, close clearly", "show random slides, read one caption, leave silently", "give the ending first, skip the evidence, repeat every slide", "presentation structure"],
    ["name the goal, list what is needed, give ordered steps, check the outcome", "describe a character, argue a position, add a joke", "give steps out of order, hide the goal, remove action verbs", "procedure structure"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`A student is organising a text for a ${c}. Which sequence best supports its ${focus}?`, good, [w1, w2],
      `The sequence uses stages and smaller moves that guide the audience through the purpose.`, `Identify what the audience needs first, how ideas develop, and how the text should finish.`, focus,
      "stage-flow", `A flow diagram showing four possible stages for a text used in a ${c}.`);
  });
}

function la04() {
  const sets = [
    ["The seedlings received less water. As a result, their leaves drooped.", "The seedlings received less water. However, their leaves drooped.", "The seedlings received less water. Meanwhile, this explained a cause.", "cause and reference"],
    ["Mina tested the bridge. She recorded its movement.", "Mina tested the bridge. It recorded her movement.", "Mina tested the bridge. They recorded its movement.", "clear pronoun reference"],
    ["The first design was light. However, it bent under pressure.", "The first design was light. For example, it bent under pressure.", "The first design was light. Therefore, it was a contrast.", "contrast"],
    ["Mangroves trap sediment. These coastal plants can therefore protect shorelines.", "Mangroves trap sediment. They can protect it over there.", "Mangroves trap sediment. Those things do something.", "noun-chain cohesion"],
    ["The team measured three sites. Next, it compared the results.", "The team measured three sites. Because, it compared the results.", "The team measured three sites. On the other hand, three means next.", "sequence"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`Which pair of sentences creates the clearest ${focus} for a ${c}?`, good, [w1, w2],
      `The pronoun or connective accurately links the second sentence to the first.`, `Check exactly what each pronoun points to and what relationship the connective signals.`, focus,
      "linked-sentences", `Two connected sentence cards from a ${c}, with arrows tracing references and connectives.`);
  });
}

function la05() {
  const sets = [
    ["At sunrise, the volunteers began counting birds.", "The volunteers began counting birds at sunrise.", "Birds were counted by volunteers who began.", "foreground time"],
    ["Beside the creek, thick reeds slowed the water.", "Thick reeds slowed the water beside the creek.", "The water had reeds and beside was thick.", "foreground place"],
    ["Because the battery was low, the robot moved slowly.", "The robot moved slowly because the battery was low.", "Slowly, low battery robot because moved.", "foreground cause"],
    ["This proposal would add two shaded seats.", "Two shaded seats would be added by this proposal.", "A new and unrelated topic begins here.", "link to an established proposal"],
    ["The eastern path needs repair first.", "Repair is needed first by the path in the east.", "First is repair and east needs path.", "foreground location"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`In a ${c}, which sentence opening best achieves this purpose: ${focus}?`, good, [w1, w2],
      `The opening places the intended information first, giving it prominence and guiding what follows.`, `Read only the opening words first. Decide what they make the audience notice.`, focus,
      "information-flow", `Three sentence strips with their opening phrases highlighted for a ${c}.`);
  });
}

function la06() {
  const sets = [
    ["Because the ground was wet, the match moved indoors.", "Because the ground was wet.", "The ground was wet and.", "cause"],
    ["When the timer sounded, the group recorded the temperature.", "When the timer sounded.", "The group when recorded temperature.", "time"],
    ["If the wind strengthens, the boats will return to shore.", "If the wind strengthens.", "The boats will if to shore.", "condition"],
    ["Although the model was strong, one joint still bent.", "Although the model was strong.", "One joint although still.", "concession"],
    ["The class repeated the trial so that the result could be checked.", "So that the result could be checked.", "The class repeated so that.", "purpose"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`Which complete complex sentence clearly expresses ${focus} in a ${c}?`, good, [w1, w2],
      `The sentence joins a dependent clause to a complete main clause and expresses ${focus}.`, `Find the conjunction, then check that the sentence also contains a complete main message.`, focus,
      "clause-puzzle", `Colour-coded main and dependent clause pieces based on a ${c}.`);
  });
}

function la07() {
  const sets = [
    ["the three coastal plants with waxy leaves", "the amazingly nice plant things", "the plants with leaves and stuff", "precise scientific description"],
    ["the cracked timber beam beneath the western platform", "the very bad beam somewhere", "the timber thing that is sort of cracked", "precise location and condition"],
    ["two reusable steel bottles with secure lids", "two wonderful bottle objects", "the bottles that are good and nice", "useful product detail"],
    ["the narrow walking track beside the river", "the really lovely track place", "the narrow thing beside it", "clear identification"],
    ["the final survey response from Year Five students", "the final interesting response thing", "the response from some people somewhere", "relevant classification"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`Which noun group gives the clearest ${focus} in a ${c}?`, good, [w1, w2],
      `The noun group keeps a clear head noun and adds relevant identifying detail.`, `Locate the main noun, then keep only details that help the audience identify or classify it.`, focus,
      "noun-group", `A labelled noun-group strip from a ${c}, showing added detail before and after the head noun.`);
  });
}

function la08() {
  const sets = [
    ["After ten minutes, the team checked the water level.", "Beautifully ten minutes, the team checked.", "The team checked because beside.", "time"],
    ["Beside the eastern fence, the seedlings grew in shade.", "Carefully the eastern fence was beside.", "The seedlings grew very beside shade.", "place"],
    ["The student measured the rope extremely carefully.", "The student measured the rope beside carefully.", "The rope extremely student measured.", "manner"],
    ["Because of the heavy rain, the outdoor session ended early.", "Under the rain, because ended session.", "Early was heavily the session.", "cause"],
    ["Under equal conditions, the two materials can be compared fairly.", "Perhaps equal, the conditions compared materials.", "The materials under can fairly equal.", "condition"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`Which sentence uses an adverbial phrase clearly to add ${focus} in a ${c}?`, good, [w1, w2],
      `The adverbial adds a clear ${focus} circumstance without confusing what it modifies.`, `Ask what detail the phrase adds and which action or whole clause it modifies.`, focus,
      "circumstance-map", `A sentence from a ${c} linked to a labelled ${focus} circumstance card.`);
  });
}

function la09() {
  const sets = [
    ["The pattern may suggest that shade reduced evaporation.", "The pattern certainly proves this for every place.", "The pattern must force everyone to agree.", "limited evidence"],
    ["Visitors should remain behind the safety line.", "Visitors might ignore every safety instruction.", "Visitors certainly are the safety line.", "moderate obligation"],
    ["The repeated results strongly suggest a reliable difference.", "The results perhaps prove absolutely everything.", "The results feel wonderfully correct.", "strong supporting evidence"],
    ["The council could consider adding another crossing.", "The council must instantly accept the only perfect plan.", "The council possibly has a crossing maybe.", "cautious recommendation"],
    ["The loose railing must be repaired before the area reopens.", "The loose railing may be admired before reopening.", "The railing probably feels repaired already.", "urgent obligation"]
  ];
  return CONTEXTS.map((c, i) => {
    const [good, w1, w2, focus] = pick(sets, i);
    return item(`Which sentence uses modality most appropriately for ${focus} in a ${c}?`, good, [w1, w2],
      `The modal wording matches the degree of certainty or obligation justified by the situation.`, `Decide whether the sentence expresses certainty or obligation, then match its force to the evidence or risk.`, focus,
      "modality-scale", `A scale from low to high certainty or obligation beside notes from a ${c}.`);
  });
}

export const LA_ITEMS = {
  AC9E5LA01: la01(),
  AC9E5LA02: la02(),
  AC9E5LA03: la03(),
  AC9E5LA04: la04(),
  AC9E5LA05: la05(),
  AC9E5LA06: la06(),
  AC9E5LA07: la07(),
  AC9E5LA08: la08(),
  AC9E5LA09: la09()
};
