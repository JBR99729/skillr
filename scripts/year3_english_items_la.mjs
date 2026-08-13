/* Year 3 English Language question source.
 * Each builder returns eight curriculum-specific applications for each of five
 * contexts. Contexts 1–3 feed Practice; contexts 4–5 feed the separate Test bank.
 */

const item = (question, correct, wrong, summary, hint, kind = "cards", items = []) => ({
  question,
  correct,
  wrong,
  summary,
  hint,
  visual: { kind, alt: `Learning aid for: ${question}`, items }
});

const build = (contexts, make) => contexts.flatMap((context, contextIndex) =>
  make(context, contextIndex).map((entry) => ({ ...entry }))
);

const LA01 = build([
  ["planning a class garden", "a classmate", "Can I add an idea about the herbs?"],
  ["choosing a team mascot", "a friend", "I heard your idea. May I suggest a dolphin?"],
  ["discussing playground shade", "the teacher", "Excuse me, may I respond to that point?"],
  ["asking the principal about a library", "the principal", "Good morning. May I ask a question about the library?"],
  ["chairing a school council meeting", "the council", "Thank you, Priya. Noah, would you like to speak next?"]
], ([topic, audience, model]) => [
  item(`During ${topic}, which response politely takes a turn with ${audience}?`, model, ["I am speaking now, so everyone stop.", "Your idea does not matter."], "Polite turn-taking acknowledges the audience and asks to contribute.", "Choose language that shares speaking time.", "conversation", [audience, model]),
  item(`A speaker finishes a point during ${topic}. What should an active listener do next?`, "Refer to the point before adding a new idea.", ["Change the topic without responding.", "Begin talking before the speaker finishes."], "Active listeners connect their response to what was said.", "Look for a response that proves the listener paid attention."),
  item(`Which action best supports cooperation while ${topic}?`, "Wait for a pause, then speak.", ["Repeat the same interruption.", "Talk over the group."], "Waiting for a pause helps everyone take a fair turn.", "Think about how each person gets heard."),
  item(`Which invitation would help a quiet group member join the talk about ${topic}?`, "Would you like to share your idea?", ["You have nothing to say, do you?", "Do not speak yet."], "A respectful invitation makes space for another speaker.", "Choose the wording that welcomes a contribution."),
  item(`Someone misunderstands your point about ${topic}. Which reply repairs the conversation?`, "I may not have explained clearly. I meant that we could try it first.", ["You never listen properly.", "Forget it. I will not explain."], "A repair calmly clarifies meaning without blaming the listener.", "Find the reply that explains again respectfully."),
  item(`Which wording is best suited to ${audience} during ${topic}?`, model, ["Move over. My turn.", "Hey, listen to me right now."], "Language changes with audience and formality.", "Notice who is being addressed."),
  item(`Two people begin speaking together during ${topic}. What is the most cooperative response?`, "One speaker pauses and invites the other to continue.", ["Both speakers talk louder.", "One speaker insults the other."], "Cooperation means managing an accidental overlap respectfully.", "Choose the action that restores orderly turns."),
  item(`Which chairperson comment keeps the discussion about ${topic} moving fairly?`, "We have heard one view. Let us invite another speaker.", ["Only my friends may answer.", "I will give every answer myself."], "A chairperson can acknowledge one view and invite another.", "Look for fair speaking opportunities.")
]);

const LA02 = build([
  ["the class might visit the zoo", "might", "must"],
  ["students should bring hats", "could", "must"],
  ["the film was enjoyable", "pleasant", "outstanding"],
  ["the council may build a crossing", "may", "will definitely"],
  ["the performance was disappointing", "uneven", "terrible"]
], ([claim, gentle, forceful]) => [
  item(`In the statement “${claim}”, which word or phrase could make the message gentler?`, gentle, [forceful, "certainly without doubt"], "Modal and evaluative language can make a message gentler or stronger.", "Choose the least certain or least intense wording.", "scale", [gentle, "should", forceful]),
  item(`While discussing “${claim}”, which sentence makes the need to act most forceful?`, "We must act now.", ["We might act now.", "We could act now."], "Must expresses a stronger obligation than might or could.", "Place the modal verbs on a scale from possible to necessary."),
  item(`Which sentence gives a cautious evaluation connected with “${claim}”?`, `The evidence suggests that ${claim}.`, [`The evidence proves forever that ${claim}.`, `Everyone knows without checking that ${claim}.`], "Cautious evaluation matches a claim to limited evidence.", "Look for wording that leaves room for uncertainty."),
  item(`Which sentence expresses the strongest positive emotion about ${claim}?`, `I am absolutely delighted that ${claim}.`, [`I am fairly pleased that ${claim}.`, `I noticed that ${claim}.`], "Absolutely delighted is more emotionally forceful than fairly pleased or noticed.", "Compare the strength of the feeling words."),
  item(`A writer has little evidence for ${claim}. Which modal verb is most responsible?`, "might", ["must", "will"], "Might signals possibility rather than certainty.", "Match the strength of the word to the strength of the evidence."),
  item(`Which change makes “${claim}” sound more certain?`, `Change the modal wording to “${forceful}”.`, [`Change it to “${gentle}”.`, "Remove every verb."], "More forceful modal language increases certainty or obligation.", "Choose the change that strengthens the claim."),
  item(`Which judgement is an evaluation rather than a plain fact about ${claim}?`, `It is an impressive result that ${claim}.`, [`The report says ${claim}.`, `The sentence contains the words “${claim}”.`], "An evaluation judges quality or value.", "Find the sentence that includes a judgement."),
  item(`Why might an author choose “${gentle}” instead of “${forceful}” when writing about ${claim}?`, "To show uncertainty or make the suggestion less forceful.", ["To prove the claim is always true.", "To remove all meaning from the sentence."], "Gentler modal language can signal uncertainty or politeness.", "Think about how certain the author sounds.")
]);

const LA03 = build([
  ["a science investigation of seed growth", "question, method, results and conclusion", "technical terms and measured results"],
  ["a history recount of a community celebration", "events in time order", "past-tense verbs and dates"],
  ["instructions for making fruit salad", "goal, ingredients and ordered steps", "command verbs such as cut and mix"],
  ["a geography report about a river", "sections arranged by topic", "place names, maps and geographical terms"],
  ["a health poster about sun safety", "clear heading and brief action points", "direct advice and labelled images"]
], ([text, structure, language]) => [
  item(`Which structure best suits ${text}?`, structure, ["A random list with no order.", "Characters, complication and resolution only."], "A text structure should suit its subject purpose.", "Ask how readers need the information organised.", "organiser", [text, structure]),
  item(`Which language feature best suits ${text}?`, language, ["Unrelated rhyming words only.", "Vague words with no useful detail."], "Language features help a text achieve its purpose.", "Choose the feature that makes the subject information clear."),
  item(`A writer begins ${text}. What should the writer decide first?`, "The purpose and audience.", ["The colour of the last full stop.", "How many unrelated jokes to add."], "Purpose and audience guide structure and language choices.", "Think about why the text is being made and who will use it."),
  item(`Which feature would make ${text} easier to use?`, `Use ${structure}.`, ["Mix every section together.", "Hide the main information in an unrelated story."], "Organisation helps readers locate and connect information.", "Select the organisation that matches the task."),
  item(`Why is ${language} suitable for ${text}?`, "It communicates the subject information precisely for the purpose.", ["It makes the information less accurate.", "It prevents readers from finding the main idea."], "Subject language and purpose work together.", "Connect the feature to what the reader needs to learn or do."),
  item(`Which addition would be least suitable in ${text}?`, "A long unrelated fantasy scene.", [`A useful example linked to ${text}.`, `A heading that signals the topic.`], "Every part should support the text's purpose.", "Find the addition that leads away from the subject."),
  item(`A student copied a story structure for ${text}. What is the best revision?`, `Reorganise it using ${structure}.`, ["Keep the structure and remove the facts.", "Add more fictional characters instead of information."], "Writers revise structure when it does not suit the purpose.", "Use the expected organisation for this subject text."),
  item(`Which explanation best connects structure and language in ${text}?`, `${structure} organises ideas, while ${language} communicates them clearly.`, ["Structure and language have no effect on meaning.", "Only page colour determines the purpose."], "Structure organises ideas and language expresses them.", "Choose the answer that explains both features.")
]);

const LA04 = build([
  ["how bees pollinate flowers", "Bees carry pollen between flowers.", "This movement helps plants produce seeds."],
  ["why exercise helps the body", "Regular movement strengthens muscles.", "It can also improve heart health."],
  ["a visit to a coastal town", "We reached the harbour before lunch.", "Later, we explored the beach."],
  ["how frogs grow", "A tadpole begins life in water.", "Over time, it develops legs and lungs."],
  ["ways a school saves water", "The school collects rainwater for gardens.", "Students also report leaking taps."]
], ([topic, lead, detail]) => [
  item(`Which topic sentence best begins a paragraph about ${topic}?`, lead, ["My favourite socks are green.", "A distant planet has many moons."], "A topic sentence introduces the paragraph's main idea.", "Choose the sentence that names or begins the focus.", "paragraph", [lead, detail]),
  item(`Which detail belongs with “${lead}”?`, detail, ["A train crossed the desert.", "The recipe uses two eggs."], "Supporting details develop the same main idea.", "Check that the detail stays focused on the topic."),
  item(`A paragraph about ${topic} suddenly describes a birthday cake. What should the writer do?`, "Move the cake sentence to a relevant paragraph or remove it.", ["Keep it because every sentence belongs together.", "Delete the sentences about the main topic."], "Unrelated information weakens paragraph focus.", "Keep sentences that support one main idea together."),
  item(`When would a new paragraph be useful in a text about ${topic}?`, "When the writer moves to a new stage, time or main idea.", ["After every single word.", "Only when the page is completely full."], "Paragraph breaks signal a meaningful change.", "Look for a change readers need to notice."),
  item(`Which order creates the clearest paragraph about ${topic}?`, `Begin with “${lead}” and follow with “${detail}”`, [`Begin with “${detail}” and then add an unrelated joke.`, "Place two unrelated sentences before the topic."], "A clear paragraph introduces its focus and develops it.", "Put the main idea before its supporting information."),
  item(`What is the job of “${detail}” in a paragraph about ${topic}?`, "It supports or develops the main idea.", ["It changes the paragraph to an unrelated topic.", "It acts only as the page title."], "A supporting detail adds information about the paragraph focus.", "Relate the sentence back to the topic sentence."),
  item(`Which closing sentence would best finish a paragraph about ${topic}?`, `These details show why ${topic} is worth understanding.`, ["Now I will discuss an unrelated toy.", "The middle sentence should be ignored."], "A closing sentence can reinforce the main idea.", "Choose a conclusion that stays on topic."),
  item(`A writer puts every idea about ${topic} into one very long block. What revision helps readers most?`, "Group related ideas into focused paragraphs.", ["Remove all topic sentences.", "Join every sentence without punctuation."], "Focused paragraphs make stages and related ideas visible.", "Sort the information by its main ideas.")
]);

const LA05 = build([
  ["a book about Australian animals", "index", "a topic listed alphabetically"],
  ["a webpage about weather", "menu", "a section of the site"],
  ["an article about coral reefs", "caption", "what a photograph shows"],
  ["a digital museum guide", "search box", "a named object quickly"],
  ["a safety handbook", "contents page", "the page where a section begins"]
], ([text, feature, purpose]) => [
  item(`In ${text}, which feature helps a reader find ${purpose}?`, feature, ["decorative border", "background colour"], "Layout and navigation features help readers locate information.", "Match the reader's need to the feature's purpose.", "layout", [text, feature, purpose]),
  item(`What is the main purpose of the ${feature} in ${text}?`, `To help the reader find ${purpose}.`, ["To hide the topic from the reader.", "To replace every sentence in the text."], "Each navigation feature has a practical reading purpose.", "Explain what the feature lets a reader do."),
  item(`A reader wants ${purpose} in ${text}. What should the reader do first?`, `Use the ${feature}.`, ["Read an unrelated page repeatedly.", "Ignore all navigation words."], "Efficient readers select the most useful navigation path.", "Choose the tool designed for that search."),
  item(`Which word would be a clear navigation label in ${text}?`, "Next section", ["Perhaps something", "Mystery place"], "Clear navigation words predict where an action will lead.", "Choose the label whose destination is easy to understand."),
  item(`Why might ${text} use subheadings?`, "To divide the information into smaller named topics.", ["To make every section about the same detail.", "To stop readers from scanning the page."], "Subheadings signal the topic of each smaller section.", "Think about how readers scan for a particular idea."),
  item(`What should a useful caption do in ${text}?`, "Explain or add information about an image.", ["Repeat the page number only.", "Give directions to an unrelated website."], "Captions connect images with relevant information.", "Choose the description that helps interpret the image."),
  item(`The ${feature} in ${text} leads to the wrong place. What needs editing?`, "The navigation link or reference.", ["Every fact in the whole text.", "The reader's name."], "Navigation must take readers to the promised location.", "Check the connection between the label and destination."),
  item(`Which layout choice would best support a reader using ${text}?`, `Place the ${feature} where it is easy to notice and use.`, ["Hide all labels behind images.", "Use identical labels for different destinations."], "Visible, specific features support navigation.", "Consider whether readers can find and understand the tool.")
]);

const LA06 = build([
  ["The noisy parrots", "squawk", "at sunrise"],
  ["Our science group", "records", "the temperature"],
  ["Two young puppies", "chase", "a red ball"],
  ["The museum guide", "explains", "the ancient map"],
  ["Those bright stars", "shine", "above the campsite"]
], ([subject, verb, extra]) => [
  item(`Which words complete a clause beginning “${subject}”?`, `${verb} ${extra}.`, [extra + ".", "very bright and."], "A clause usually contains a subject and an agreeing verb.", "Choose words that tell what the subject does or is.", "sentence", [subject, verb, extra]),
  item(`In “${subject} ${verb} ${extra},” which words form the subject?`, subject, [verb, extra], "The subject is who or what the clause is about.", "Ask who or what performs the process."),
  item(`In “${subject} ${verb} ${extra},” which word is the verb?`, verb, [subject, extra], "The verb expresses the process in the clause.", "Ask what happens or what the subject does."),
  item(`Which sentence has correct subject–verb agreement for ${subject}?`, `${subject} ${verb} ${extra}.`, [`${subject} is ${verb} ${extra}.`, `${subject} does ${verb} ${extra}.`], "The verb form must agree with its subject.", "Read the subject and verb together aloud."),
  item(`Which group is a complete clause about ${subject}?`, `${subject} ${verb}.`, [subject + ".", extra + "."], "A complete clause usually needs both a subject and a verb.", "Find the group that tells who or what and what happens."),
  item(`A writer changes ${subject} to one animal or person. What else may need to change?`, "The form of the verb.", ["The page number.", "The colour of the paper."], "Singular and plural subjects can require different verb forms.", "Check whether the verb still sounds right with one subject."),
  item(`Which revision fixes a missing verb after “${subject}”?`, `Add “${verb}”.`, [`Add only “${extra}”.`, "Remove the subject."], "Adding an agreeing verb can complete the clause.", "The clause needs a process word."),
  item(`Why do ${subject} and “${verb}” work together in the clause?`, "The subject and verb agree in number.", ["They are both page headings.", "Neither word contributes meaning."], "Agreement connects the subject with an appropriate verb form.", "Decide whether the subject refers to one or more than one.")
]);

const LA07 = build([
  ["Mina", "leapt", "wondered", "whispered", "became"],
  ["The explorer", "climbed", "remembered", "announced", "was"],
  ["Our puppy", "bounded", "loved", "barked", "grew"],
  ["The actor", "bowed", "hoped", "murmured", "seemed"],
  ["Kai", "stirred", "believed", "replied", "remained"]
], ([subject, doing, inner, saying, relating]) => [
  item(`Which verb shows ${subject} doing a physical action?`, doing, [inner, relating], "Doing verbs represent actions.", "Choose the verb that could be observed as an action.", "verb-sort", [doing, inner, saying, relating]),
  item(`Which verb shows a thought or feeling belonging to ${subject}?`, inner, [doing, saying], "Thinking and feeling verbs represent inner processes.", "Choose what happens inside the character's mind or emotions."),
  item(`Which verb shows ${subject} speaking?`, saying, [inner, relating], "Saying verbs represent speech.", "Choose the word that could introduce spoken words."),
  item(`Which verb can relate ${subject} to a quality or identity?`, relating, [doing, saying], "Relating verbs connect a participant with a quality or identity.", "Try placing a describing word after each verb."),
  item(`Which sentence uses a precise saying verb for quiet speech by ${subject}?`, `${subject} ${saying} the answer softly.`, [`${subject} ${doing} the answer softly.`, `${subject} ${relating} the answer softly.`], "A precise saying verb can show how speech sounds.", "Match the verb to quiet speech."),
  item(`A writer wants readers to know what ${subject} thinks. Which choice works best?`, `${subject} ${inner} the earlier clue.`, [`${subject} ${doing} across the room.`, `${subject} ${saying} loudly.`], "An inner-process verb reveals thought or feeling.", "Look for a process that is not simply seen or heard."),
  item(`Why might a writer replace “said” with “${saying}”?`, "To show the manner or mood of the speech more precisely.", ["To remove the speaker from the sentence.", "To turn the speech into a place name."], "Specific saying verbs add information about delivery.", "Consider what the new verb tells the reader."),
  item(`Which explanation correctly compares “${doing}” and “${inner}”?`, `“${doing}” represents doing, while “${inner}” represents thinking or feeling.`, [`Both words represent speech only.`, `“${inner}” names a place, while “${doing}” names a thing.`], "Verbs can represent different kinds of processes.", "Classify each verb by the experience it expresses.")
]);

const LA08 = build([
  ["Yesterday", "walked", "Today", "walks", "Tomorrow", "will walk"],
  ["Last week", "measured", "Each day", "measures", "Next week", "will measure"],
  ["Earlier", "wrote", "Now", "writes", "Later", "will write"],
  ["On Monday", "found", "Every morning", "finds", "On Friday", "will find"],
  ["Before lunch", "made", "At present", "makes", "After lunch", "will make"]
], ([pastTime, past, presentTime, present, futureTime, future]) => [
  item(`Which sentence correctly links ${pastTime.toLowerCase()} with the verb?`, `${pastTime}, the student ${past} a note.`, [`${pastTime}, the student ${present} a note.`, `${pastTime}, the student ${future} a note.`], "Past-tense verbs locate a process before now.", "Match the verb form to the past-time clue.", "timeline", [pastTime, past, presentTime, present, futureTime, future]),
  item(`Which sentence correctly links ${presentTime.toLowerCase()} with the verb?`, `${presentTime}, the student ${present} a note.`, [`${presentTime}, the student ${past} a note.`, `${presentTime}, the student ${future} a note.`], "Present tense can describe what happens now or regularly.", "Use the time clue to select the present form."),
  item(`Which sentence correctly links ${futureTime.toLowerCase()} with the verb?`, `${futureTime}, the student ${future} a note.`, [`${futureTime}, the student ${past} a note.`, `${futureTime}, the student ${present} a note.`], "Future tense locates a process after now.", "Look for the verb phrase beginning with will."),
  item(`A recount begins “${pastTime}, we ${past} carefully.” Which continuation keeps past tense?`, `Then we ${past} again.`, [`Then we ${present} again.`, `Then we ${future} again.`], "Consistent tense helps readers follow time.", "Keep the next verb in the same time as the first."),
  item(`Which edit fixes the tense shift in “${pastTime}, she ${past}, then she ${present}”?`, `Change “${present}” to “${past}”.`, [`Change “${past}” to “${future}”.`, "Keep both verbs because their times already match."], "Both events with the same past-time frame need past forms.", "Use the opening time phrase as your guide."),
  item(`Which words in “${futureTime}, they ${future}” show future time?`, `${futureTime} and “${future}”`, [pastTime + ` and “${past}”`, presentTime + ` and “${present}”`], "A time phrase and verb form can both anchor an event in time.", "Find the pair that points after now."),
  item(`Why does a writer use “${present}” after ${presentTime.toLowerCase()}?`, "To show a current or repeated process.", ["To show that the process ended long ago.", "To show that the process can never occur."], "Present tense suits current and habitual actions.", "Connect the tense to the time clue."),
  item(`Using “${past}”, “${present}” and “${future}”, which sequence moves clearly from past to present to future?`, `${pastTime}: ${past}; ${presentTime.toLowerCase()}: ${present}; ${futureTime.toLowerCase()}: ${future}.`, [`${pastTime}: ${future}; ${presentTime.toLowerCase()}: ${past}; ${futureTime.toLowerCase()}: ${present}.`, `${pastTime}: ${present}; ${presentTime.toLowerCase()}: ${future}; ${futureTime.toLowerCase()}: ${past}.`], "Verb tense can organise events along a timeline.", "Match each form to before now, now, and after now.")
]);

const LA09 = build([
  ["Ari hurried home.", "dark clouds above an empty road", "an uneasy storm is approaching"],
  ["The dog waited by the gate.", "lowered ears and a wagging tail", "the dog is hopeful but uncertain"],
  ["The hikers stopped.", "a fallen tree blocking the narrow track", "the journey has met an obstacle"],
  ["Lena opened the old box.", "a faded photograph tucked beneath a medal", "the objects may hold a family memory"],
  ["The crowd became quiet.", "a tiny turtle moving towards the sea", "the crowd is watching a fragile animal"]
], ([words, image, inference]) => [
  item(`The words say, “${words}” Which image detail would extend their meaning?`, image, ["a plain page number", "an empty white margin"], "An image extends meaning when it adds relevant information beyond the words.", "Choose a detail that changes or deepens what readers understand.", "scene", [words, image]),
  item(`Combine “${words}” with the image detail “${image}”. What can a reader infer?`, inference, ["The image has no relationship to the words.", "The page number explains the whole event."], "Readers combine written and visual clues to infer added meaning.", "Use evidence from both modes."),
  item(`What does “${image}” add to the words “${words}”?`, `It suggests that ${inference}.`, ["It gives the spelling of every word.", "It proves a fact that has no support in the text."], "A relevant visual detail can add setting, mood, action or character information.", "Name the new meaning supplied by the image."),
  item(`Which visual change would most alter the mood of “${words}”?`, "Replace the scene with bright light and relaxed expressions.", ["Change the page number.", "Make the margin slightly wider."], "Visual choices such as light and expression influence mood.", "Look for a change readers would interpret emotionally."),
  item(`A caption simply repeats “${words}” What would improve it?`, `Explain how ${image} adds information.`, ["Repeat the same sentence twice more.", "Describe an unrelated object outside the scene."], "Useful captions can guide attention to meaningful visual evidence.", "Add information rather than copying the words."),
  item(`Which statement uses evidence responsibly for “${words}” and “${image}”?`, `The visual clue suggests that ${inference}.`, [`The image guarantees every detail of ${inference}.`, "The words and image cannot be read together."], "Visual inference should be expressed as supported interpretation, not certainty beyond evidence.", "Prefer suggests when the evidence allows an inference."),
  item(`Why might the creator pair “${words}” with “${image}”?`, "To let the image extend the event, setting or mood.", ["To make the written words impossible to understand.", "To ensure the image has no purpose."], "Words and images can work together to create richer meaning.", "Explain what the visual contributes."),
  item(`Which reading strategy best suits a page containing “${words}” and “${image}”?`, "Notice details in both the words and image, then connect them.", ["Ignore the image completely.", "Guess without using either source."], "Multimodal reading combines evidence across modes.", "Use every relevant clue available.")
]);

const LA10 = build([
  ["a water-cycle report", "evaporation", "liquid water changing into water vapour", "cycle"],
  ["a plant science lesson", "germination", "a seed beginning to grow", "shoot"],
  ["a geography article", "erosion", "earth material being worn away and moved", "bank"],
  ["a music guide", "volume", "how loud or soft a sound is", "note"],
  ["a biology explanation", "cell", "a basic unit of living things", "organ"]
], ([context, term, meaning, multiple]) => [
  item(`Which technical word precisely names ${meaning} in ${context}?`, term, ["thing", "stuff"], "Technical vocabulary names ideas precisely within a field.", "Choose the word a subject expert would use.", "word-network", [context, term, meaning]),
  item(`In ${context}, what does “${term}” mean?`, meaning, ["a decorative page feature", "a character's name with no subject meaning"], "Context helps readers select the relevant meaning of a technical word.", "Use the subject and surrounding idea."),
  item(`Why is “${term}” stronger than “thing” in ${context}?`, "It communicates the exact subject meaning.", ["It is longer, so it must always be better.", "It removes information from the explanation."], "Precision, not word length, makes technical vocabulary useful.", "Ask which word identifies the concept accurately."),
  item(`A reader does not know “${term}” in ${context}. Which clue is most useful?`, `The nearby explanation “${meaning}”.`, ["The colour of the page border.", "The number of letters in the heading."], "Definitions and surrounding information support word meaning.", "Look for a clue that explains the idea."),
  item(`The word “${multiple}” can have more than one meaning. What should a reader check first?`, "The subject and surrounding sentence.", ["Only whether the word is short.", "Only its position in the alphabet."], "Context determines which meaning is intended.", "Read around the word before choosing a meaning."),
  item(`Which sentence uses “${term}” precisely?`, `The ${context} explains ${term} as ${meaning}.`, [`The ${term} was a random colour with no connection to ${context}.`, `Every object is always called ${term}.`], "Precise usage fits the word's field-specific meaning.", "Check whether the sentence matches the definition."),
  item(`Which vocabulary note would best help a reader of ${context}?`, `${term}: ${meaning}`, [`${term}: any word at all`, `${term}: meaning not given`], "A glossary-style note gives a clear contextual definition.", "Choose the note that is specific and accurate."),
  item(`A writer replaces “${term}” with “nice thing” in ${context}. What is lost?`, "The precise technical meaning.", ["Only the page decoration.", "The ability to use capital letters."], "Vague wording can weaken a subject explanation.", "Compare how exactly each phrase names the concept.")
]);

const LA11 = build([
  ["do not", "don't", "the dog's bowl", "the dogs' bowls"],
  ["cannot", "can't", "the girl's bicycle", "the girls' bicycles"],
  ["it is", "it's", "the teacher's desk", "the teachers' desks"],
  ["they are", "they're", "the fox's den", "the foxes' dens"],
  ["we will", "we'll", "the player's boot", "the players' boots"]
], ([full, contraction, singular, plural]) => [
  item(`Which option correctly explains how to shorten “${full}”?`, `Use “${contraction}”, the accepted shortened form.`, [`Keep “${full}” as two unshortened words.`, "Remove letters without marking where letters are missing."], "An apostrophe in a contraction marks omitted letters.", "Say the full form, then find the accepted shortened form.", "apostrophe", [full, contraction, "apostrophe marks missing letters"]),
  item(`What job does the apostrophe do in “${contraction}”?`, "It marks letters omitted from the full form.", ["It makes the word plural.", "It shows that several people own something."], "Contraction apostrophes show where letters have been left out.", "Expand the contraction to find the missing letters."),
  item(`Which option correctly explains the single owner in “${singular}”?`, `Use “${singular}” to show one owner.`, [`Use “${plural}” to show several owners.`, `Use “${singular.replace("'", "")}” with no ownership mark.`], "An apostrophe and s commonly show possession by one singular noun.", "Identify whether the owner is one or more than one."),
  item(`Which option correctly explains the multiple owners in “${plural}”?`, `Use “${plural}” to show several owners.`, [`Use “${singular}” to show one owner.`, `Use “${plural.replace("'", "")}” with no ownership mark.`], "For a regular plural ending in s, the possessive apostrophe follows the plural s.", "First make the owner plural, then show possession."),
  item(`In “${singular}”, what does the apostrophe show?`, "One noun owns or is connected with something.", ["The noun is shortened from two words.", "The noun names several owners."], "The apostrophe in a singular possessive marks ownership or connection.", "Look at the noun immediately before the apostrophe."),
  item(`In “${plural}”, where is the apostrophe placed?`, "After the plural s.", ["Before the plural s.", "At the start of the phrase."], "Regular plural possessives place the apostrophe after the plural s.", "Find the plural owner before adding the possession mark."),
  item(`Which explanation correctly compares “${contraction}” and “${singular}”?`, `In “${contraction}” the apostrophe marks missing letters; in “${singular}” it marks possession.`, ["Both apostrophes make nouns plural.", "Both apostrophes mark missing letters only."], "Apostrophes have different jobs in contractions and possessives.", "Expand the contraction, then identify the owner in the phrase."),
  item(`A student writes “${plural.replace("'", "")}" for several owners. What edit is needed?`, "Add an apostrophe after the plural s.", ["Add an apostrophe before the first letter.", "Remove the plural s."], "The apostrophe after a regular plural noun shows possession by several owners.", "Keep the plural form and mark ownership after it.")
]);

export const LA_ITEMS = {
  AC9E3LA01: LA01,
  AC9E3LA02: LA02,
  AC9E3LA03: LA03,
  AC9E3LA04: LA04,
  AC9E3LA05: LA05,
  AC9E3LA06: LA06,
  AC9E3LA07: LA07,
  AC9E3LA08: LA08,
  AC9E3LA09: LA09,
  AC9E3LA10: LA10,
  AC9E3LA11: LA11
};
