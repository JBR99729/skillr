(() => {
  "use strict";

  const banks = window.SkillrFoundationEnglishWorksheetData || (window.SkillrFoundationEnglishWorksheetData = {});
  const lessons = window.SkillrFoundationEnglishData || {};

  const single = (vocabulary, question, answers, answer, visual = "") => ({ type: "single", vocabulary, question, answers, answer, visual, visualAlt: visual ? `Learning diagram: ${visual}` : "" });
  const text = (vocabulary, question, answer, visual = "") => ({ type: "text", vocabulary, question, answer, visual, visualAlt: visual ? `Learning diagram: ${visual}` : "" });
  const match = (vocabulary, question, matchLeft, matchRight, answer, visual = "") => ({ type: "match", vocabulary, question, matchLeft, matchRight, answer, visual, visualAlt: visual ? `Learning diagram: ${visual}` : "" });

  const profiles = {
    AC9EFLY02: {
      method: "listen, wait, respond on topic and choose an audible volume",
      hints: [
        "Wait until Zoe's complete seed message has ended before choosing the partner's first action.",
        "Picture one partner sitting beside you and choose a voice that reaches only that listener comfortably.",
        "Take one interaction action at a time and decide whether it shows turn-taking, staying on topic or suitable volume.",
        "Repeat the shell topic in your opening words, then add a connected comment or question.",
        "Watch who holds the circle-talk turn card and choose what listeners should do until it is passed.",
        "For each speaking situation, name the distance and audience size before matching its volume.",
        "Recall one exact detail from the classmate's message and use that detail in your response.",
        "Write the favourite-game exchange as speaker one, listening wait and connected speaker-two response.",
        "Find both problems in Sam's behaviour, then repair the timing of his turn and the topic of his response."
      ],
      questions: [
        single("listener", "Zoe is telling a partner how her seed grew. What should the partner do first?", ["Listen until Zoe finishes", "Begin a different story", "Call across the room", "Turn away and pack up"], "Listen until Zoe finishes.", "Partner scene: Zoe speaks while one partner waits and looks towards her."),
        single("volume", "Which voice choice suits speaking to one partner sitting beside you?", ["A quiet, clear voice the partner can hear", "A shout meant for the whole playground", "A whisper too soft for the partner", "No voice while the partner guesses"], "A quiet, clear voice the partner can hear."),
        match("turn", "Match each interaction action to what it shows.", ["Wait until the speaker finishes", "Answer about the same seed", "Speak clearly to the group"], ["suitable volume", "taking a turn", "staying on topic"], "Wait until the speaker finishes → taking a turn; answer about the same seed → staying on topic; speak clearly to the group → suitable volume."),
        text("on topic", "A classmate says, ‘I found a smooth shell at the beach.’ Write or say one on-topic response.", "A suitable response is, ‘I found a shell at the beach too,’ or another comment or question about the shell."),
        single("interaction", "During circle talk, the speaker is holding the turn card. What is the best action for everyone else?", ["Listen and wait for the turn card", "Speak at the same time", "Change the topic", "Move the card without asking"], "Listen and wait for the turn card.", "Circle-talk visual: one speaker holds a turn card while classmates listen."),
        match("volume", "Match each speaking situation to a suitable volume.", ["Talk to one nearby partner", "Report to the whole class", "Share a quiet comment in the library"], ["quiet and clear", "clear enough to reach the back row", "soft enough for the place and audible to the partner"], "Nearby partner → quiet and clear; whole class → clear enough to reach the back row; library partner → soft enough for the place and audible to the partner."),
        text("listener", "Explain one action that proves you listened to a classmate’s whole message.", "A strong answer names a detail from the message before giving an on-topic response."),
        text("interaction", "Plan a two-turn conversation about a favourite game. Show who speaks first, how the listener waits and how the listener responds.", "A complete plan has one first speaker, an attentive wait and a second turn that connects to the favourite game."),
        text("turn", "Sam interrupts Mia with an unrelated joke while she is reporting. Explain two changes that would improve the interaction.", "Sam should wait until Mia finishes and then respond to her report at a volume Mia can hear comfortably.")
      ]
    },

    AC9EFLY03: {
      method: "check characters, events, facts and purpose",
      hints: [
        "Look for the option containing both a created character and an imagined event.",
        "Choose the extract that gives checkable information about a real animal rather than a created adventure.",
        "Match the character-and-problem clue and the fact-and-label clue first, then decide what pictures alone can prove.",
        "Ask who acts in the lizard sentence rather than looking for a heading or instruction.",
        "Explain whether the wombat statement can be checked in the real world and what it teaches.",
        "Do not classify the whale page from its picture alone; identify the two additional clues a reader needs.",
        "For each koala extract, underline either the checkable fact or the created event before naming its type.",
        "Compare the talking frog with the frog-growth facts, then state what each text is made to do.",
        "Write one created rain event and one checkable rain fact, then attach the purpose entertain or inform to each."
      ],
      questions: [
        single("imaginative text", "Which clue most strongly suggests an imaginative text?", ["A tiny dragon searches for a striped sock", "A diagram labels a frog’s legs", "A page lists facts about rain", "A sign gives a safety rule"], "A tiny dragon searches for a striped sock."),
        single("informative text", "Which extract is most likely from an informative text?", ["Frogs hatch from eggs and begin life as tadpoles", "A frog king invited the moon to tea", "The brave frog found a magic door", "Once upon a time, a frog wore boots"], "Frogs hatch from eggs and begin life as tadpoles."),
        match("purpose", "Match each text clue to what it can show.", ["created character and problem", "facts and labels about a real topic", "pictures"], ["can appear in either text type", "imaginative text made to entertain", "informative text made to inform"], "Created character and problem → imaginative text made to entertain; facts and labels → informative text made to inform; pictures → can appear in either text type."),
        single("character", "A text says, ‘Lina the lizard packed a silver hat and sailed into the clouds.’ Which feature is Lina?", ["A character", "A fact label", "An information heading", "A safety instruction"], "A character."),
        text("fact", "The sentence ‘A wombat digs a burrow’ appears in an animal information page. Explain why it can be used as a fact clue.", "It gives checkable information about what a real wombat does."),
        single("purpose", "A page has a large picture of a whale. What else must a reader check before deciding the text type?", ["The words and the author’s purpose", "Only the picture colour", "Only the page number", "Whether the cover is shiny"], "The words and the author’s purpose."),
        text("informative text", "Classify these extracts and give one clue for each: ‘Koalas eat eucalyptus leaves’ and ‘Kora Koala flew a red kite.’", "The eucalyptus sentence is informative because it gives a fact, while the Kora Koala sentence is imaginative because it gives a created character event."),
        text("imaginative text", "Compare a story about a talking frog with a fact page about frog growth. Give one clue and the purpose for each text.", "The talking-frog text has a created character or event to entertain, while the growth page gives real facts to inform."),
        text("purpose", "Create one sentence that could begin an imaginative text and one that could begin an informative text about rain, then explain the different purposes.", "A valid pair uses a created rain event to entertain and a checkable rain fact to inform.")
      ]
    },

    AC9EFLY04: {
      method: "blend through print, reread, then check meaning and grammar",
      hints: [
        "Point under the printed word mat from its first letter to its last, then join the taught sounds smoothly.",
        "Blend cat, sun and dog one at a time before using the animal or sky meaning to choose each picture.",
        "Choose the action that checks the newly blended word inside its complete sentence.",
        "Compare what a fox can hide in with the two possible readings den and din.",
        "Ask whether each check uses printed letters, the way sentence words fit or the idea's meaning.",
        "Say moon, apple and top, take only the named sound from each cue and blend them in order.",
        "Compare the printed middle vowel in mud with mad, then test which word makes sense after sat in.",
        "Describe all four repair actions for hen: look through, blend, reread and check meaning.",
        "Name one problem with a picture guess and one piece of evidence that decoding supplies."
      ],
      questions: [
        { ...single("blend", "In the sentence ‘The cat sat on the mat,’ point under the printed word mat and blend from left to right. Which whole word should you say?", ["mat", "cat", "sat", "map"], "mat.", "Printed word card: mat, with an arrow showing left-to-right reading."), audio_answers: ["letters m, a, t", "letters c, a, t", "letters s, a, t", "letters m, a, p"] },
        match("decodable", "Match each printed word to its picture description after blending it.", ["cat", "sun", "dog"], ["a bright object in the sky", "a pet that can bark", "a pet that can meow"], "Cat → pet that can meow; sun → bright object in the sky; dog → pet that can bark."),
        single("reread", "What should a reader do just after blending an unfamiliar printed word?", ["Reread the whole sentence to check it", "Skip the rest of the sentence", "Change the word without looking", "Use only the picture"], "Reread the whole sentence to check it."),
        text("context", "A reader says din for the printed word den in ‘A fox hid in a den.’ Explain how the sentence meaning helps the reader repair the word.", "A den is a place where a fox can hide, so den fits the sentence meaning while din does not."),
        match("grammar", "Match each reading check to the question it asks.", ["letter check", "grammar check", "meaning check"], ["Does this idea make sense here?", "Do the words sound right together?", "Did I use every printed letter?"], "Letter check → Did I use every printed letter; grammar check → Do the words sound right together; meaning check → Does this idea make sense here."),
        text("blend", "Explain how to read the printed word mat using the cue words moon, apple and top.", "Use the beginning sound in moon, the short middle sound in apple and the beginning sound in top, then blend them smoothly to say mat."),
        single("context", "The sentence is ‘A pig sat in mud.’ A reader blends the final printed word as mad. Which check shows a repair is needed?", ["The printed vowel and sentence meaning both point to mud", "The picture can replace every letter", "Any short word will fit", "The sentence should be skipped"], "The printed vowel and sentence meaning both point to mud."),
        text("reread", "A learner reads ‘The red hen ran’ but says hot for the printed word hen. Describe the full repair routine.", "The learner should look through the three printed letters in hen, blend hen, reread the sentence and check that red hen makes sense."),
        text("decodable", "Explain why guessing a word from a picture is less reliable than decoding and checking it.", "A picture may suggest several words, while decoding uses every printed letter and rereading checks grammar and meaning.")
      ]
    },

    AC9EFLY05: {
      method: "choose a comprehension strategy and support it with evidence",
      hints: [
        "Connect the muddy pawprints directly to what may have happened to the missing boot.",
        "Choose the action that creates a picture in the listener's mind rather than copying or counting print.",
        "Match predict with a future possibility, question with something unclear and summarise with the main idea.",
        "Name the exact cover detail that links a dog to the missing boot prediction.",
        "Choose the sentence that joins the important bee-and-pollen details without adding a new topic.",
        "Look for the thought that recalls an experience, the thought that wonders and the thought that expects a later event.",
        "Ask about the missing birds or their nest so the question can guide what you read next.",
        "Combine measuring and recording the rainwater into one sentence and leave out minor wording.",
        "State how the reader should revise the prediction when the next event gives stronger evidence."
      ],
      questions: [
        single("predict", "A cover shows muddy pawprints beside a missing boot. Which prediction uses the clue?", ["A dog may have moved the boot", "The moon will turn green", "The book has ten pages", "All boots can fly"], "A dog may have moved the boot.", "Cover clues: one missing boot and muddy pawprints leading away."),
        single("visualise", "Which action shows visualising while listening to a story?", ["Making a mind picture of the dark forest", "Counting the page numbers", "Copying the title only", "Closing the book before listening"], "Making a mind picture of the dark forest."),
        match("question", "Match each comprehension strategy to what the reader does.", ["predict", "question", "summarise"], ["ask about something unclear", "tell the main idea briefly", "say what may happen using clues"], "Predict → say what may happen using clues; question → ask about something unclear; summarise → tell the main idea briefly."),
        text("evidence", "A learner predicts that the dog took the boot. Name the picture evidence that supports the prediction.", "The muddy pawprints leading away from the missing boot support the prediction."),
        single("summarise", "Bees visit flowers and carry pollen to other flowers. Which sentence is the best summary?", ["Bees move pollen as they visit flowers", "One flower was yellow", "The page has three sentences", "Bees have six legs and some flowers are tall"], "Bees move pollen as they visit flowers."),
        match("connect", "Match each reader thought to its strategy.", ["‘This reminds me of my first school day.’", "‘I wonder why the gate is open.’", "‘I think the puppy will return.’"], ["prediction", "connection", "question"], "First school day → connection; open gate → question; puppy will return → prediction."),
        text("question", "After a character finds an empty nest, ask one useful question that could guide the next part of the reading.", "A useful question is, ‘Where did the birds go?’ or another question connected to the empty nest."),
        text("summarise", "Summarise this mini-text in one sentence: ‘Rain filled the bucket. Ana measured the water. She recorded the amount.’", "Ana measured and recorded the rainwater collected in a bucket."),
        text("evidence", "A prediction is not supported by the next event. Explain what a thoughtful reader should do and why.", "The reader should change the prediction to fit the new event because comprehension ideas must follow the strongest text evidence.")
      ]
    },

    AC9EFLY06: {
      method: "say, draft, spell a CVC word, reread and edit",
      hints: [
        "Say the class event as one complete spoken idea before any words are written.",
        "Match the lower-case name, missing ending mark and unclear word order to three different edits.",
        "Keep the words in order, then change the beginning of Sam and mark the end of the telling sentence.",
        "Choose the action that lets the writer hear whether the drafted sentence expresses a complete idea.",
        "Link meaning to sense, capital letter to the beginning and full stop to the telling-sentence ending.",
        "Turn the spoken observation my seed grew into one sentence with a marked beginning and ending.",
        "Repair what the draft means before adding the punctuation that marks its boundary.",
        "Say cat slowly, count its three sound positions, spell the CVC word and blend it back before writing the repaired sentence.",
        "Compare the two Sam sentences feature by feature and explain the job of the capital and full stop."
      ],
      questions: [
        single("draft", "What should a group do before writing the first draft of a class event?", ["Say the intended idea clearly", "Choose random words", "Add a full stop to an empty page", "Copy an unrelated sentence"], "Say the intended idea clearly."),
        match("edit", "Match each draft problem to the most helpful edit.", ["a person’s name begins with a lower-case letter", "a telling sentence has no ending mark", "the words do not express the intended event"], ["repair the meaning and word order", "begin the name with a capital letter", "add a full stop"], "Lower-case name → begin with a capital letter; no ending mark → add a full stop; unclear event → repair meaning and word order."),
        text("capital letter", "The visible draft ‘sam fed the cat’ begins Sam with lower-case s and has no ending mark. Rewrite it with upper-case S and a full stop.", "Sam fed the cat."),
        single("sentence", "After a writer drafts one sentence, which action best checks whether it expresses a complete idea?", ["Read the whole sentence aloud", "Count only the letters", "Decorate the page", "Copy the same words immediately"], "Read the whole sentence aloud."),
        match("full stop", "Match each editing question to its focus.", ["Does the idea make sense?", "Does the first word begin correctly?", "Does the telling sentence have an ending mark?"], ["full stop", "meaning", "capital letter"], "Idea makes sense → meaning; first word begins correctly → capital letter; telling sentence ending → full stop."),
        text("spelling", "Write one sentence that records the observation ‘my seed grew’ and include a capital letter and a full stop.", "My seed grew."),
        single("edit", "A draft has confusing word order and also lacks a full stop. Which edit should happen first?", ["Repair the meaning and word order", "Add decoration", "Copy it neatly", "Change every word"], "Repair the meaning and word order."),
        text("CVC word", "The intended sentence is ‘We saw a cat.’ The draft has cot as its final word. Use say, segment, spell and check to repair the CVC word, then write the whole sentence.", "We saw a cat."),
        text("draft", "The first visible draft ‘sam fed the cat’ has lower-case s and no ending mark; the edited ‘Sam fed the cat.’ has upper-case S and a full stop. Explain both edits.", "The capital S marks the sentence beginning and the name Sam, while the full stop shows where the telling sentence ends.")
      ]
    },

    AC9EFLY07: {
      method: "plan one topic, order details and speak clearly",
      hints: [
        "Keep the report opening on the bean seed and choose the sentence that tells how it changed.",
        "Imagine a listener in the back row and reject voices that are too soft or uncomfortably loud.",
        "Place the empty pot before planting and the green shoot after planting.",
        "Add one fact about what the class pet does, needs or looks like without changing the topic.",
        "Choose the rehearsal purpose that improves the report's order, clarity and voice before delivery.",
        "Decide which report part introduces, explains or finishes the one topic.",
        "Explain how pointing to each seed picture can cue one connected sentence in the correct order.",
        "Choose one playground discovery, then plan two details that explain it from first to next.",
        "Repair the rushed report by changing its pace and its volume for the audience."
      ],
      questions: [
        single("topic", "A student is reporting how a bean seed changed. Which opening stays on topic?", ["Our bean seed grew two green leaves", "My shoes have blue laces", "Lunch begins at noon", "I know a funny joke"], "Our bean seed grew two green leaves."),
        single("volume", "Which voice best suits a report to the whole class?", ["Clear enough for the back row without shouting", "Too quiet for the nearest person", "A playground shout", "No spoken voice"], "Clear enough for the back row without shouting."),
        match("sequence", "Put the seed-report details into a sensible order by matching each stage to its place.", ["empty pot", "seed planted", "green shoot appears"], ["third", "first", "second"], "Empty pot → first; seed planted → second; green shoot appears → third.", "Three picture cards: empty pot, hand planting seed, green shoot."),
        text("detail", "The topic is ‘Our class pet’. Give one relevant detail that could belong in the report.", "A relevant detail names something about the class pet, such as what it eats or how the class cares for it."),
        single("rehearse", "What is the main reason to rehearse a short spoken report?", ["To check order, clarity and volume", "To add unrelated facts", "To speak as fast as possible", "To avoid looking at listeners"], "To check order, clarity and volume."),
        match("spoken report", "Match each report part to its job.", ["opening topic", "ordered detail", "closing sentence"], ["finishes the report", "tells what the report is about", "explains the topic"], "Opening topic → tells what the report is about; ordered detail → explains the topic; closing sentence → finishes the report."),
        text("sequence", "Explain how three picture prompts can help a speaker stay on topic and keep events in order.", "The speaker points to each picture in sequence and gives only the detail shown before moving to the next card."),
        text("spoken report", "Plan a twenty-second report about a playground discovery with one topic sentence and two ordered details.", "A complete plan states one playground discovery and follows it with two relevant details in a clear order."),
        text("rehearse", "A report is accurate but rushed and hard to hear. Explain two rehearsal changes that would help the audience.", "The speaker should slow the pace, pause between details and adjust volume so every listener can hear comfortably.")
      ]
    },

    AC9EFLY08: {
      method: "start, move, form and compare with the taught model",
      hints: [
        "Trace the modelled lower-case c from its start near the top and stop before closing the right side.",
        "Look at the teacher's first mark before deciding where your own newly taught letter should begin.",
        "Compare the rounded start in lower-case c, the bump in lower-case n and the slants in lower-case v.",
        "Follow the taught down-and-return movement for lower-case n before adding its rounded bump.",
        "Choose the grip that lets the fingers stay comfortable while the pencil moves with control.",
        "Follow the school's modelled slanting strokes for upper-case A, then add its cross stroke in the taught order.",
        "Compare whether each lower-case c sample follows the curve and remains open on its right side.",
        "Copy one word at a time, then circle a letter whose start and movement you can describe.",
        "Compare upper-case A with lower-case a by their separate taught movements instead of enlarging one shape."
      ],
      questions: [
        text("formation", "Copy the modelled lower-case c twice using the taught starting point and curved movement.", "Two recognisable lower-case c forms that begin and move as taught are correct.", "Model description: lower-case c begins near the top, curves around and remains open on the right."),
        single("starting point", "What should a writer notice before forming a newly taught letter?", ["The modelled starting point", "The page number only", "How fast a friend writes", "The pencil colour only"], "The modelled starting point."),
        match("formation", "Match each representative formation family to a printed lower-case example.", ["rounded curve family", "down-and-return bump family", "slanting family"], ["lower-case v", "lower-case c", "lower-case n"], "Rounded curve → lower-case c; down-and-return bump → lower-case n; slanting → lower-case v."),
        text("lower-case", "Form printed lower-case n using the school’s taught down-and-return movement and rounded bump.", "A recognisable lower-case n follows the taught down-and-return movement and forms its rounded bump clearly.", "Model description: lower-case n uses a down-and-return movement followed by one rounded bump."),
        single("functional grip", "Which pencil-hold description best supports controlled letter movement?", ["A comfortable hold with relaxed fingers", "A tight squeeze that hurts", "Holding the pencil at its far end", "Pressing until the paper tears"], "A comfortable hold with relaxed fingers."),
        text("upper-case", "Copy the modelled upper-case A twice and compare its height, slanting strokes and cross stroke.", "Two recognisable upper-case A forms following the school’s taught stroke order are correct.", "Model description: upper-case A has two slanting strokes and one cross stroke in the taught order."),
        single("formation", "One lower-case c sample is open on the right and follows the taught curve; another is closed like a circle. Which sample is easier to recognise as c?", ["The open sample following the taught curve", "The closed circle sample", "Both are always identical", "Neither can be checked"], "The open sample following the taught curve."),
        text("direction", "Copy the short sentence ‘A cat sat.’ and circle one letter whose starting point and direction you checked.", "A readable copy with a circled letter and a correct formation explanation meets the challenge."),
        text("upper-case", "Explain why forming upper-case A is not simply making lower-case a larger.", "Upper-case A and lower-case a use distinct taught movements and shapes, so the writer must follow the model for each case.")
      ]
    },

    AC9EFLY09: {
      method: "listen, say or clap, then name the sound pattern",
      hints: [
        "Say cake after each option and listen for the word with the same spoken ending.",
        "Repeat each phrase aloud and listen for several nearby words sharing one beginning sound.",
        "Say banana naturally, clap once on ba, na and na, then count the claps.",
        "Stretch the ending of dog and test a new spoken word whose ending sounds the same.",
        "Listen for matching endings, matching beginnings or separate word beats before making each match.",
        "Say fish slowly and choose the description of the speech sound you hear before the rest of the word.",
        "Clap sunflower as you naturally say it and report the claps for your spoken variety.",
        "Use three moon-cue beginning sounds in nearby words, then name the repeated-beginning feature.",
        "Compare where the sounds match in cake and lake with where they match in helpful Henry."
      ],
      questions: [
        single("rhyme", "Which spoken word rhymes with cake?", ["lake", "fish", "cup", "moon"], "lake"),
        single("alliteration", "Which spoken phrase has the strongest alliteration?", ["six sleepy seals", "red cup", "jump high", "moon over water"], "Six sleepy seals."),
        single("syllable", "How many spoken beats do you hear when you clap banana as ba, na, na?", ["three", "one", "two", "five"], "three"),
        text("rhyme", "Say one word that rhymes with dog and repeat the pair aloud.", "Fog, log or another word with the same spoken ending as dog is correct."),
        match("spoken word", "Match each spoken example to its sound feature.", ["cake and lake", "helpful Henry", "three claps in banana"], ["syllables", "rhyme", "alliteration"], "Cake and lake → rhyme; helpful Henry → alliteration; three claps in banana → syllables."),
        single("phoneme", "Which description identifies the first speech sound in fish?", ["The soft blowing sound heard at the start of fish", "The humming sound heard at the start of moon", "The hissing sound heard at the start of sun", "The tapping sound heard at the start of top"], "The soft blowing sound heard at the start of fish."),
        text("syllable", "Say sunflower aloud, clap its spoken beats and report the number you hear in your way of speaking.", "A plausible spoken segmentation with the matching clap count is correct; many Australian speakers hear three beats in sun, flow, er."),
        text("alliteration", "Create a short spoken line with three words beginning with the humming sound heard at the start of moon, then name the sound feature.", "A line such as ‘Mia makes muffins’ uses three words beginning with the moon cue sound and shows alliteration."),
        text("phoneme", "Explain why cake and lake show rhyme, while helpful Henry shows alliteration.", "Cake and lake share a spoken ending, while helpful Henry repeats the same beginning speech sound.")
      ]
    },

    AC9EFLY10: {
      method: "count spoken parts, blend or change them, then check",
      hints: [
        "Repeat The dog ran home slowly and move one counter for each separate meaningful word.",
        "Take the named sounds from moon, apple and top in that order, then slide them together.",
        "Stretch fish and keep the final quiet ship-cue sound together as one sound while counting.",
        "Hold the middle and final sounds in mat still and replace only the first with the sun-cue sound.",
        "Decide whether each oral action breaks apart, joins together or replaces a sound.",
        "Take only the beginning sounds from top, insect and pig and blend them without saying the cue words.",
        "Touch one counter for I, one for can and one for hop to identify what each represents.",
        "Compare pin with tin first and tin with tip second, naming the position that changes each time.",
        "Use counters to show that a sentence separates into words while one word separates into smaller speech sounds."
      ],
      questions: [
        single("word", "How many words do you hear in the spoken sentence ‘The dog ran home’?", ["four", "three", "five", "one"], "four", "Counter row: one counter for The, dog, ran and home."),
        single("blend", "Blend these cue-word sounds: the humming beginning of moon, the short middle sound in apple and the tapping beginning of top. Which word do they make?", ["mat", "sat", "map", "met"], "Mat."),
        single("phoneme", "How many individual speech sounds are heard in fish when the final quiet sound at the start of ship is kept together?", ["three", "four", "two", "one"], "three"),
        text("manipulate", "Replace the first humming sound in mat with the hissing sound at the start of sun. Say the new word.", "The new word is sat."),
        match("segment", "Match each oral action to its name.", ["move counters for the words in a sentence", "join separate sounds to say mat", "replace the first sound in mat"], ["manipulate", "segment", "blend"], "Move word counters → segment; join sounds → blend; replace first sound → manipulate."),
        text("blend", "Use the cue words top, insect and pig to blend a single-syllable word from their beginning sounds.", "The beginning sounds blend to make tip."),
        single("sentence", "A learner uses three counters for ‘I can hop.’ What does each counter represent?", ["One spoken word", "One printed letter", "One syllable in hop", "One sentence ending"], "One spoken word."),
        text("manipulate", "Say the spoken word chain pin, tin, tip. Explain which sound position changes at each step.", "Pin to tin changes the first speech sound, while tin to tip changes the final speech sound."),
        text("segment", "Explain the difference between segmenting a sentence into words and segmenting one spoken word into speech sounds.", "Sentence segmentation separates meaningful spoken words, while sound segmentation separates the smaller speech sounds inside one word.")
      ]
    },

    AC9EFLY11: {
      method: "name the letter, match its case and use its cue word",
      hints: [
        "Say the shared name for each A, D and G pair instead of matching the different-looking shapes by appearance alone.",
        "Look at printed upper-case A and answer with its alphabet name rather than the apple cue sound.",
        "Say apple slowly and choose the description of the short vowel sound heard at its beginning.",
        "Say each vowel letter's name, then use egg, insect and octopus as the three beginning-sound cue words.",
        "Look at the first printed form in Ava, give its alphabet name and then find the same letter in lower-case.",
        "The question asks for the letter name of lower-case u, so choose the spoken alphabet name rather than the umbrella cue.",
        "Say ay, ee and eye aloud and pair each name with the printed lower-case vowel form it identifies.",
        "Make three case pairs by shared names: bee, dee and gee, even though the upper-case and lower-case shapes differ.",
        "State what ay names, then describe the separate short vowel response supplied by the apple cue."
      ],
      questions: [
        match("upper-case", "Match each printed upper-case letter description to its different-looking lower-case partner.", ["upper-case A", "upper-case D", "upper-case G"], ["lower-case g", "lower-case a", "lower-case d"], "Upper-case A → lower-case a; upper-case D → lower-case d; upper-case G → lower-case g."),
        single("letter name", "What is the alphabet name of printed upper-case A?", ["ay", "ee", "eye", "you"], "Ay."),
        single("common sound", "Which description gives the common short vowel sound represented by printed lower-case a?", ["The short sound at the start of apple", "The short sound at the start of egg", "The short sound at the start of insect", "The short sound at the start of octopus"], "The short sound at the start of apple."),
        match("cue word", "Match each printed lower-case vowel letter to its short-sound cue word.", ["lower-case e", "lower-case i", "lower-case o"], ["octopus", "egg", "insect"], "Lower-case e → egg; lower-case i → insect; lower-case o → octopus."),
        text("letter", "The printed name Ava begins with upper-case A. Name that first letter and identify its lower-case partner.", "The letter name is ay and its partner is printed lower-case a."),
        single("letter name", "A teacher asks for the letter name of printed lower-case u. Which response answers the question asked?", ["You", "The short sound at the start of umbrella", "Umbrella", "Lower-case o"], "You."),
        match("lower-case", "Match each vowel letter name to the described printed lower-case form.", ["ay", "ee", "eye"], ["lower-case i", "lower-case a", "lower-case e"], "Ay → lower-case a; ee → lower-case e; eye → lower-case i."),
        text("upper-case", "Sort upper-case B, lower-case d, upper-case D, lower-case g, upper-case G and lower-case b into three case pairs, then explain the matches.", "Upper-case B matches lower-case b, upper-case D matches lower-case d, and upper-case G matches lower-case g because each pair shares one letter name."),
        text("common sound", "Explain how the letter name ay differs from the common short vowel sound linked to the cue word apple.", "Ay names the alphabet letter, while the apple cue supplies the short vowel sound that printed A and a can represent.")
      ]
    },

    AC9EFLY12: {
      method: "segment, map letters, blend and check the CVC word",
      hints: [
        "Check each option for exactly three letters arranged as consonant, vowel and consonant.",
        "Blend cat, sun and hen before choosing the meowing pet, daytime object and nesting bird pictures.",
        "Move three counters for cat, name a cue for each sound and write the matching letters in order.",
        "Hold the middle sound in sun and choose the printed vowel letter that represents it.",
        "Point under map from its first printed letter to its last and blend before writing the whole word.",
        "Touch lower-case d, o and g in order and label the place each occupies in dog.",
        "Stretch cat, focus on its empty middle box and identify the vowel sound and letter that belong there.",
        "Keep the middle and final letters in can fixed while changing only the first letter for man and tan.",
        "Count the printed letters and identify the consonant or vowel role of each position in dog and stop."
      ],
      questions: [
        { ...single("CVC word", "Which printed letter sequence has exactly the consonant–vowel–consonant pattern?", ["dog", "ship", "tree", "stop"], "dog"), audio_answers: ["letters d, o, g", "letters s, h, i, p", "letters t, r, e, e", "letters s, t, o, p"] },
        match("blend", "Match each CVC word to its picture description after blending it.", ["cat", "sun", "hen"], ["a bird on a nest", "a pet that can meow", "the bright object in the daytime sky"], "Cat → pet that can meow; sun → bright daytime object; hen → bird on a nest."),
        text("segment", "Say cat slowly, name its first, middle and final speech sounds with cue words, then write the whole word.", "The cue sounds map in order to printed lower-case c, lower-case a and lower-case t, making cat."),
        single("vowel", "Which printed letter belongs in the middle of the CVC word sun?", ["lower-case u", "lower-case a", "lower-case i", "lower-case o"], "Lower-case u."),
        text("blend", "Point under the printed word map, blend from left to right and write the whole word you say.", "map"),
        match("sound position", "Match each letter in the printed word dog to its sound position.", ["lower-case d", "lower-case o", "lower-case g"], ["final", "first", "middle"], "Lower-case d → first; lower-case o → middle; lower-case g → final."),
        text("consonant", "A learner placed printed lower-case c first and lower-case t last for cat but left the middle sound box empty. What should be added, and why?", "Printed lower-case a should be added because it represents the short vowel sound in the middle of cat."),
        text("CVC word", "Change only the first letter of can to make man and tan, then blend all three words and explain what stays the same.", "Can, man and tan are valid CVC words; the first consonant changes while the middle vowel and final consonant stay the same."),
        text("vowel", "Compare dog and stop. Explain why dog fits the three-letter CVC model and stop does not.", "Dog has one consonant letter, one vowel letter and one final consonant letter, while stop has an extra consonant at the beginning.")
      ]
    },

    AC9EFLY13: {
      method: "say, map each sound, spell, then blend to check",
      hints: [
        "Say moon slowly and write the lower-case letter taught for its humming beginning sound.",
        "Stretch the ending of leaf and write the letter taught for that soft blowing sound.",
        "Listen for all of ship, including the quiet beginning sound represented by a two-letter team.",
        "Move through frog from its first sound to its last and write a matching letter for every position.",
        "Say nest slowly and reject spellings that omit, replace or reorder one of its sounds.",
        "Compare spoken plan with written pan and listen for the sound that should follow the first sound.",
        "After writing fish, group the final two letters and explain that they work together for one sound.",
        "Map drum in order, write the complete word and read your spelling back from left to right.",
        "Blend mip from the child's letters and check whether every heard sound is represented in order."
      ],
      questions: [
        text("sound–letter relationship", "Say moon and write the letter that represents the humming sound heard at its beginning.", "Printed lower-case m."),
        text("spell", "Say leaf and write the letter that represents the soft blowing sound heard at its end.", "Printed lower-case f."),
        { ...single("letter team", "Which printed letter sequence spells ship, including the two-letter team for its quiet beginning sound?", ["ship", "sip", "shop", "chip"], "ship"), audio_answers: ["letters s, h, i, p", "letters s, i, p", "letters s, h, o, p", "letters c, h, i, p"] },
        text("segment", "Say frog slowly, listen from first sound to last and write a plausible spelling.", "Frog, written with lower-case f, lower-case r, lower-case o and lower-case g in the heard order."),
        { ...single("spell", "Which printed letter sequence records nest with its sounds in the correct order?", ["nest", "net", "nset", "nesp"], "nest"), audio_answers: ["letters n, e, s, t", "letters n, e, t", "letters n, s, e, t", "letters n, e, s, p"] },
        text("sound–letter relationship", "A learner writes pan for the spoken word plan. Identify the missing sound and letter, then rewrite the word.", "The flowing sound heard after the first sound is missing; add lower-case l after p to write plan."),
        text("letter team", "Spell fish and explain why the final speech sound uses the two-letter team sh.", "Fish ends with lower-case s followed by lower-case h; those two printed letters work together to represent one speech sound."),
        text("blend", "Map the speech sounds in drum to letters, write the whole word and explain how blending back checks it.", "Write drum with lower-case d, lower-case r, lower-case u and lower-case m; blending left to right confirms the intended word."),
        text("plausible spelling", "A child writes mip for the made-up spoken word mip. Explain why this is a plausible spelling using taught sound–letter relationships.", "The spelling represents the heard beginning, middle and final sounds in order and blends back to mip.")
      ]
    },

    AC9EFLY14: {
      method: "look, say, cover, write and check every letter",
      hints: [
        "Point to the printed target word inside the dog sentence and read it as one familiar word.",
        "Look at both letters in my, cover the model, write it and then compare the two positions.",
        "Find the word placed between apple and pear that connects the two packed things.",
        "Read each incomplete sentence aloud and place go, is or my where its meaning and grammar fit.",
        "Ask which word in the sentence stands for the person who is speaking.",
        "For each classroom label, use its full printed sequence and classroom meaning as recognition clues.",
        "Read the draft aloud, then compare Teh with the and si with is before rewriting.",
        "Arrange the cards so they make one complete idea, then reread before copying the sentence.",
        "Compare the complete printed word the from first letter to last rather than stopping after its first letter."
      ],
      questions: [
        text("high-frequency word", "Read the printed word the in the sentence ‘The dog is on the rug.’", "The."),
        text("memory", "Look at the familiar word my, cover it and write the whole word from memory.", "my"),
        { ...single("context", "In ‘I packed an apple and a pear,’ which high-frequency word joins the two things?", ["and", "packed", "apple", "pear"], "and"), audio_answers: ["letters a, n, d", "letters p, a, c, k, e, d", "letters a, p, p, l, e", "letters p, e, a, r"] },
        match("high-frequency word", "Match each familiar word to the sentence it completes.", ["go", "is", "my"], ["‘This is hat.’ with the owner word before hat", "‘The dog here.’ with the being word after dog", "‘We can now.’ with the action word after can"], "Go → We can go now; is → The dog is here; my → This is my hat."),
        single("familiar word", "Which familiar word names the speaker in ‘I can go to the mat’?", ["the word I", "the word go", "the word mat", "the word can"], "the word I"),
        text("recognise", "Read three familiar classroom labels such as door, bag and your name, then state one clue that helps you recognise each whole word.", "A correct response reads the selected labels and names a reliable clue such as the full letter sequence and its classroom meaning."),
        text("check", "A draft reads ‘Teh dog si on the rug.’ Correct the two high-frequency words and read the repaired sentence.", "The dog is on the rug."),
        text("context", "Arrange at least four cards from I, can, see, the and dog to make a meaningful sentence, then copy and read it.", "One correct sentence is, ‘I can see the dog.’"),
        text("memory", "Explain why checking every letter after writing the from memory is stronger than checking only its first letter.", "Checking every letter confirms the complete printed sequence in the word the rather than accepting another word that merely begins the same way.")
      ]
    },

    AC9EFLY15: {
      method: "say the word, split meaningful parts and explain each meaning",
      hints: [
        "State what dog names first, then compare one dog with several dogs to explain the added s.",
        "Find the option that keeps the complete base cup and adds the more-than-one ending.",
        "Remove the more-than-one ending from cats, cups and dogs and check which complete base word remains.",
        "Explain the meaning of sun and hat separately before joining them into one object word.",
        "Cover the final s in cats and identify the animal meaning that remains unchanged.",
        "Split each compound at the point where two complete words, such as rain and coat, remain.",
        "Compare a picture of one cat with several cats, then state the extra meaning carried by the final s.",
        "Find the two complete words rain and coat inside raincoat, then explain how their meanings combine.",
        "Group the letters as the meaningful base dog plus the added ending s instead of splitting every letter."
      ],
      questions: [
        text("plural", "Compare dog and dogs. What meaning does dog carry, and what does the added letter s contribute?", "Dog names the animal, and the added s shows more than one dog."),
        { ...single("meaningful part", "Which printed word is made from cup plus an ending that means more than one?", ["cups", "cup", "cub", "cap"], "cups"), audio_answers: ["letters c, u, p, s", "letters c, u, p", "letters c, u, b", "letters c, a, p"] },
        match("base word", "Match each plural word to its base word.", ["cats", "cups", "dogs"], ["dog", "cat", "cup"], "Cats → cat; cups → cup; dogs → dog."),
        text("compound word", "Join sun and hat to make one word, then explain what both parts contribute.", "Sunhat; sun gives the sunny-condition or protection idea, and hat names the object."),
        single("word", "What stays the same when cat changes to cats?", ["The base meaning cat", "The number of animals", "The whole printed ending", "Nothing at all"], "The base meaning cat."),
        match("compound word", "Match each compound word to the two complete words that build it.", ["sunhat", "raincoat", "bedroom"], ["bed and room", "rain and coat", "sun and hat"], "Sunhat → sun and hat; raincoat → rain and coat; bedroom → bed and room."),
        text("ending", "Compare cat and cats beside pictures of one cat and several cats. Explain the meaning contributed by the final s.", "Cat names the animal, while the final s in cats adds the meaning more than one."),
        text("meaningful part", "Split raincoat into two complete meaningful words and explain how they work together.", "Rain and coat; rain gives the weather or protective-use idea, and coat names the clothing item."),
        text("base word", "A learner says every letter in dogs is a separate meaningful part. Correct the mix-up using the whole word, base word and ending.", "Dogs is one whole word with the meaningful base dog and the added ending s, rather than four separate meaning parts.")
      ]
    }
  };

  const whyRight = {
    AC9EFLY02: [
      "Listening until Zoe finishes protects her whole speaking turn",
      "a quiet clear voice reaches one nearby partner comfortably",
      "each action matches turn-taking, topic connection or suitable volume",
      "the response adds a connected idea about the same shell",
      "waiting for the card gives the current speaker an uninterrupted turn",
      "each volume suits the distance, audience size and place",
      "recalling one exact detail proves the whole message was heard",
      "the plan shows a first turn, an attentive wait and a connected reply",
      "Sam repairs both the interruption and the unrelated response"
    ],
    AC9EFLY03: [
      "the tiny dragon and sock search are created story events",
      "the frog sentence gives checkable information about a real animal",
      "the clues match story purpose, information purpose and a feature shared by both",
      "Lina acts in a created event, so she is a character",
      "a wombat digging a burrow is checkable real-world information",
      "words and author purpose reveal what the whale page is made to do",
      "the koala fact informs while Kora's created event entertains",
      "the talking frog entertains while real growth facts inform",
      "the pair separates a created entertaining event from a checkable informative fact"
    ],
    AC9EFLY04: [
      "all three printed letters blend from left to right to say mat",
      "each blended word matches its correct picture meaning",
      "rereading tests the new word inside the complete sentence",
      "den fits both the printed vowel and the fox-hiding meaning",
      "each check tests printed letters, sentence grammar or meaning",
      "the moon, apple and top cues blend in order to say mat",
      "the printed vowel and sentence context both identify mud",
      "looking through hen and rereading repairs both print and meaning",
      "decoding uses every printed letter while a picture can suggest several words"
    ],
    AC9EFLY05: [
      "muddy pawprints provide evidence that a dog may have moved the boot",
      "making a mind picture is the action used for visualising",
      "each strategy is paired with its distinct reading action",
      "the muddy pawprints directly support the dog prediction",
      "the sentence keeps the main bee-and-pollen idea without minor details",
      "each thought shows remembering, wondering or predicting",
      "the empty nest question targets information needed next",
      "the sentence combines the important measuring and recording actions",
      "a thoughtful reader revises an idea when stronger evidence contradicts it"
    ],
    AC9EFLY06: [
      "saying the idea first gives the draft one clear intended message",
      "each draft problem is paired with the edit that repairs it",
      "upper-case S begins the name and sentence while the full stop closes it",
      "reading aloud reveals whether the words express a complete idea",
      "each editing question checks meaning, the beginning or the ending",
      "the sentence records the observation with a capital beginning and full-stop ending",
      "repairing meaning first ensures the punctuation surrounds a clear message",
      "cat maps one taught letter to each of its three sound positions",
      "the capital marks the name and beginning while the full stop marks the ending"
    ],
    AC9EFLY07: [
      "the opening names the bean seed and reports its change",
      "the voice reaches the class comfortably without shouting",
      "the stages follow the event from empty pot to green shoot",
      "the detail adds useful information about the class pet",
      "rehearsal checks order, clarity and volume before delivery",
      "each part introduces, develops or finishes the report",
      "the picture sequence cues one connected detail at a time",
      "the plan keeps one discovery and orders two relevant details",
      "slower pace, pauses and audible volume help listeners follow the report"
    ],
    AC9EFLY08: [
      "both lower-case c forms use the taught curve and remain recognisable",
      "the starting point begins the taught movement accurately",
      "c, n and v represent the rounded, bump and slanting families",
      "lower-case n uses the taught down-and-return movement and one rounded bump",
      "relaxed fingers support comfortable controlled pencil movement",
      "both upper-case A forms use the taught slants and cross stroke",
      "the open curved sample keeps lower-case c recognisable",
      "the readable copy and circled explanation show formation was checked",
      "upper-case A and lower-case a use different taught movements and shapes"
    ],
    AC9EFLY09: [
      "lake shares the same spoken ending as cake",
      "six sleepy seals repeats one beginning speech sound",
      "banana has the three spoken beats ba, na and na",
      "a correct example shares the spoken ending heard in dog",
      "each spoken example matches rhyme, alliteration or syllables",
      "the selected description matches the beginning sound in fish",
      "the clap count follows the learner's natural spoken form of sunflower",
      "the new line repeats the moon-cue beginning sound in nearby words",
      "rhyme matches spoken endings while alliteration matches beginnings"
    ],
    AC9EFLY10: [
      "the sentence contains four separate spoken words: The, dog, ran and home",
      "the three cue sounds blend in order to make mat",
      "fish has three speech sounds because the ship-cue ending stays together",
      "replacing only the first sound changes mat to sat",
      "each action breaks apart, joins or replaces spoken parts",
      "the top, insect and pig beginnings blend to make tip",
      "each counter stands for one separate word in the sentence",
      "pin to tin changes the first sound and tin to tip changes the final sound",
      "sentences split into words while spoken words split into smaller speech sounds"
    ],
    AC9EFLY11: [
      "the upper-case and lower-case forms of A, D and G share letter identities despite different shapes",
      "ay is the alphabet name of printed upper-case A",
      "apple cues the common short vowel sound for the displayed letter form",
      "egg, insect and octopus cue the selected lower-case vowels",
      "Ava begins with upper-case A and the matching form is its lower-case partner",
      "you is the alphabet name requested for printed lower-case u",
      "ay, ee and eye identify lower-case a, e and i",
      "each upper-case and lower-case pair for B, D and G shares one alphabet name",
      "ay names the letter while apple cues one common sound it represents"
    ],
    AC9EFLY12: [
      "dog has exactly a consonant, vowel and final consonant",
      "each blended CVC word matches its correct picture meaning",
      "the three cue sounds map in order to the printed word cat",
      "printed lower-case u represents the middle vowel sound in sun",
      "the printed letters blend from left to right to say map",
      "the three printed letters in dog occupy the first, middle and final positions",
      "printed lower-case a supplies the missing middle vowel in cat",
      "can, man and tan keep the middle vowel and final consonant",
      "dog fits three CVC positions while stop begins with two consonants"
    ],
    AC9EFLY13: [
      "printed lower-case m represents the humming beginning sound in moon",
      "printed lower-case f represents the final blowing sound in leaf",
      "ship records its three sounds with the beginning two-letter team sh",
      "frog maps every heard sound to one printed letter in order",
      "nest records every heard sound in the correct order",
      "adding lower-case l restores the missing sound and repairs plan",
      "the letters s and h work together for the final sound in fish",
      "the four ordered printed letters map the sounds and blend back to drum",
      "mip represents its beginning, middle and final sounds in order"
    ],
    AC9EFLY14: [
      "the is the complete high-frequency word printed in the sentence",
      "my is reproduced as the complete familiar word from memory",
      "and is the high-frequency word joining apple and pear",
      "each familiar word completes its sentence meaningfully",
      "the printed word I names the speaker in the sentence",
      "the full letter sequence and classroom meaning reliably identify each label",
      "correcting Teh and si restores the familiar words The and is",
      "the selected cards make a complete meaningful sentence",
      "checking every letter confirms the complete word rather than only its beginning"
    ],
    AC9EFLY15: [
      "dog keeps the animal meaning while the added s shows more than one",
      "cups keeps the base cup and adds the more-than-one ending",
      "removing the plural ending reveals cat, cup and dog",
      "sun and hat combine their meanings to name a sunhat",
      "the base meaning cat remains when the plural ending is added",
      "each compound separates into the two complete words that build it",
      "cat names the animal while the final s shows more than one",
      "rain and coat combine to name clothing used for rain",
      "dogs contains the meaningful base dog and the added plural ending s"
    ]
  };

  const tiers = ["warm-up", "warm-up", "warm-up", "core", "core", "core", "core", "challenge", "challenge"];
  const tierLabels = { "warm-up": "Warm-Up", core: "Core", challenge: "Challenge" };
  for (const [code, profile] of Object.entries(profiles)) {
    const unit = banks[code];
    const lesson = lessons[code];
    if (!unit || !lesson || !Array.isArray(unit.questions)) continue;
    if (unit.topicModuleVersion === "foundation-english-ly2-v2") continue;
    if (profile.hints.length !== profile.questions.length) throw new Error(`${code}: every question needs its own hint`);
    if (!whyRight[code] || whyRight[code].length !== profile.questions.length) throw new Error(`${code}: every question needs an authored why-right explanation`);

    unit.preservedOptionalQuestions = unit.questions.slice();
    unit.questions = profile.questions.map((item, index) => {
      const tier = tiers[index];
      const vocabulary = item.vocabulary;
      const question = {
        ...item,
        enrichment: tier === "challenge",
        tier,
        tierLabel: tierLabels[tier],
        summary: `This answer is right because ${whyRight[code][index]}; use ${profile.method}.`,
        hint: profile.hints[index],
        alignment: {
          concept: lesson.title,
          vocabulary,
          method: profile.method
        }
      };
      delete question.vocabulary;
      if (!question.visual) delete question.visual;
      if (!question.visualAlt) delete question.visualAlt;
      return question;
    });
    unit.exportMeta = {
      curriculumCode: code,
      year: "Foundation",
      subject: "English",
      topicTitle: unit.title,
      publicBranding: "renderer-chrome-only",
      sheets: [
        { slug: "topic-practice-1", title: "Topic Practice 1", questionNumbers: [1, 2, 3, 4, 5] },
        { slug: "topic-practice-2", title: "Topic Practice 2", questionNumbers: [6, 7, 8, 9] }
      ]
    };
    unit.topicModuleVersion = "foundation-english-ly2-v2";
  }
})();
