(() => {
  "use strict";

  const banks = window.SkillrFoundationEnglishWorksheetData || (window.SkillrFoundationEnglishWorksheetData = {});
  const lessons = window.SkillrFoundationEnglishData || {};
  const METHODS = {
    AC9EFLE01: "notice the text experience, connect it with your own experience, then say whether it is similar or different",
    AC9EFLE02: "name the event or character, state your feeling or thought, then give a story clue",
    AC9EFLE03: "name the literary text, point to the character or event, then place the beginning and ending",
    AC9EFLE04: "listen for the beat and repeated end sounds, then copy the pattern with voice and action",
    AC9EFLE05: "place the main events in order, retell them, then change one clear part to adapt the text",
    AC9EFLY01: "identify the text from its clues, name what it is for, then explain the purpose"
  };

  const replacements = {
    AC9EFLE01: [
      {
        type: "single",
        question: "A story shows Leila singing with her family after dinner. Which response makes a clear connection?",
        answers: ["My family sings together too, so that experience is similar to mine.", "The story has twelve pages.", "Dinner is a word."],
        answer: "My family sings together too, so that experience is similar to mine.",
        why: "the response links the exact family-singing event with a relevant experience",
        hint: "Find the answer that links something in the story with something from the reader's life.",
        vocabulary: "connection",
        visual: "Story event: Leila + family + singing after dinner",
        visualAlt: "Leila and her family sing together after dinner in the story."
      },
      {
        type: "fill-blank",
        question: "In the story, Bo walks to school. I ride in a car. Complete the comparison.",
        template: "Our school trips are {{blank}} because we travel in different ways.",
        answer: "different",
        why: "walking and riding are not the same travel experience",
        hint: "Ask whether the two children travel in the same way.",
        vocabulary: "different"
      },
      {
        type: "match",
        question: "Match each connection word to what it means.",
        matchLeft: ["similar", "different", "text clue"],
        matchRight: ["evidence in the words, event or image", "alike in one clear way", "not the same in one clear way"],
        answer: "similar → alike in one clear way; different → not the same in one clear way; text clue → evidence in the words, event or image",
        why: "each word is matched to the comparison or evidence job it performs",
        hint: "Start with similar and look for the meaning that says alike.",
        vocabulary: "text clue"
      },
      {
        type: "single",
        question: "A story picture shows one family leaving their shoes at the door. Which comment stays respectful and close to the text?",
        answers: ["In this story, the family leaves shoes at the door.", "Every family from that culture does this.", "My way is the only right way."],
        answer: "In this story, the family leaves shoes at the door.",
        why: "the comment describes evidence from this particular story without turning it into a rule about everyone",
        hint: "Choose words that begin with what this story shows.",
        vocabulary: "culture",
        visual: "Picture clue: shoes are placed beside the story family's doorway",
        visualAlt: "Several shoes are placed beside the doorway in the story picture."
      },
      {
        type: "text",
        question: "A character plays cricket at a park. Share one similar or different experience from your life and explain the comparison.",
        answer: "A valid response names the cricket event, a relevant personal experience and whether they are similar or different.",
        why: "the response compares one clear story experience with one clear personal experience",
        hint: "Use three parts: name the text event, name your experience, then say similar or different and give the reason.",
        vocabulary: "experience"
      },
      {
        type: "single",
        question: "After viewing an attributed story by a First Nations Australian storyteller, which response uses the story respectfully?",
        answers: ["I noticed the repeated journey image, and it reminded me of travelling with my family.", "All First Nations stories use the same images.", "I can tell what every community believes from one story."],
        answer: "I noticed the repeated journey image, and it reminded me of travelling with my family.",
        why: "the response names a clue from the selected story and shares a personal connection without overgeneralising",
        hint: "Look for the response about this named storyteller's work and this exact clue.",
        vocabulary: "literature"
      },
      {
        type: "text",
        question: "A literature image shows a child carrying water along a dry path. What idea could you share, and which image clue supports it?",
        answer: "A valid response shares a relevant idea and points to the child, water container or dry path as evidence.",
        why: "the idea is supported by an observable detail in the literature image",
        hint: "Begin with I notice, then point to one exact part of the image.",
        vocabulary: "text clue",
        visual: "Image details: child + water container + long dry path",
        visualAlt: "A child carries a water container along a long, dry path."
      },
      {
        type: "text",
        question: "One story child travels a long way to collect mail; another reader walks to a letterbox beside home. Explain one difference without judging either life.",
        answer: "The journeys are different because the story child travels a long way and the reader takes a short walk, and neither experience is labelled better.",
        why: "the comparison identifies an exact difference and uses neutral, respectful language",
        hint: "Describe the journey lengths and avoid words such as better, worse or normal.",
        vocabulary: "different"
      },
      {
        type: "text",
        question: "Create a response to a story family celebration that includes one similarity and one difference from your own experience.",
        answer: "A valid response gives one supported similarity, one supported difference and refers only to the selected story and the reader's own life.",
        why: "the response can hold both a shared feature and a different feature at the same time",
        hint: "Name one feature both experiences share, then name one feature that differs between the story and your life.",
        vocabulary: "similar"
      }
    ],

    AC9EFLE02: [
      {
        type: "single",
        question: "Niko loses a boot in the rain. Which sentence is the reader's supported response?",
        answers: ["I felt worried because Niko could not find the boot in the rain.", "Niko has a boot.", "Rain is wet."],
        answer: "I felt worried because Niko could not find the boot in the rain.",
        why: "the reader names a feeling and links it to the lost-boot event",
        hint: "Find the choice that tells how the reader feels and why.",
        vocabulary: "response",
        visual: "Story event: Niko looks for one red boot while rain falls",
        visualAlt: "Niko searches in the rain for one missing red boot."
      },
      {
        type: "fill-blank",
        question: "A character gives the last piece of fruit to a hungry friend. Complete the thought.",
        template: "I think the character is {{blank}} because they share the fruit.",
        answer: "caring",
        why: "the thought is supported by the character's sharing action",
        hint: "Choose a word for someone who helps a hungry friend.",
        vocabulary: "thought"
      },
      {
        type: "match",
        question: "Match each story-response term to its example.",
        matchLeft: ["event", "feeling", "story clue"],
        matchRight: ["I felt relieved", "the neighbour returned the boot", "Niko smiled and held up the boot"],
        answer: "event → the neighbour returned the boot; feeling → I felt relieved; story clue → Niko smiled and held up the boot",
        why: "the happening, reader emotion and supporting evidence are kept separate",
        hint: "An event is what happened, while a feeling tells an emotion.",
        vocabulary: "event"
      },
      {
        type: "single",
        question: "Which response gives a thought about a character and a story clue?",
        answers: ["I think Hana is brave because she enters the dark cave to help her dog.", "Hana is in the story.", "Caves can be dark."],
        answer: "I think Hana is brave because she enters the dark cave to help her dog.",
        why: "the thought brave is justified by Hana's story action",
        hint: "Look for a thought followed by because and a character action.",
        vocabulary: "character"
      },
      {
        type: "text",
        question: "Draw or describe the moment when Niko's boot is returned, then state how that moment makes you feel.",
        answer: "A valid drawing or description shows the returned boot and gives a connected reader feeling such as happy or relieved.",
        why: "the chosen response mode represents the event and communicates the reader's feeling",
        hint: "Show the returned boot first, then add a feeling face or feeling word.",
        vocabulary: "feeling"
      },
      {
        type: "single",
        question: "Mara is nervous before a race. Which sentence tells the reader's feeling rather than Mara's feeling?",
        answers: ["I felt hopeful that Mara would finish the race.", "Mara felt nervous.", "Mara stood at the start."],
        answer: "I felt hopeful that Mara would finish the race.",
        why: "the words I felt identify the reader's own response",
        hint: "Find the sentence that begins with what I, the reader, felt.",
        vocabulary: "feeling"
      },
      {
        type: "text",
        question: "The character starts at a new school. Share a connected experience or thought and point to the story event that prompted it.",
        answer: "A valid response links the new-school event with a relevant personal experience or supported thought.",
        why: "the personal connection remains anchored to the character's new-school event",
        hint: "Name the story event before adding what it reminds you of.",
        vocabulary: "story clue"
      },
      {
        type: "text",
        question: "Two readers feel differently when a fox escapes: one feels relieved and one feels worried. Explain how both responses could be supported.",
        answer: "Both can be supported if each reader names a relevant clue, such as the fox becoming free or the fox entering danger.",
        why: "different reader responses are thoughtful when each one is tied to evidence from the event",
        hint: "Give one fox-event clue for relieved and a different fox-event clue for worried.",
        vocabulary: "response"
      },
      {
        type: "text",
        question: "Choose a story moment and make a complete oral, drawn or written response that includes an event, a feeling or thought, and evidence.",
        answer: "A valid response identifies the selected event, communicates the reader's feeling or thought and supplies a relevant story clue.",
        why: "all three parts work together to make the personal response understandable and supported",
        hint: "Plan three parts before you respond: what happened, what I felt or thought, and what clue supports me.",
        vocabulary: "story clue"
      }
    ],

    AC9EFLE03: [
      {
        type: "single",
        question: "Mina finds a shining shell, listens to it and returns it to the beach. Who is the character?",
        answers: ["Mina", "finding the shell", "the ending"],
        answer: "Mina",
        why: "Mina is the person who takes part in the literary text",
        hint: "Ask who is in the story, not what happens.",
        vocabulary: "character"
      },
      {
        type: "single",
        question: "Which choice is an event from Mina's shell story?",
        answers: ["Mina returns the shell to the beach.", "Mina", "a story title"],
        answer: "Mina returns the shell to the beach.",
        why: "returning the shell is something that happens in the text",
        hint: "An event answers the question What happens.",
        vocabulary: "event"
      },
      {
        type: "match",
        question: "Match each part of Mina's story to its story feature.",
        matchLeft: ["beginning", "middle event", "ending"],
        matchRight: ["Mina returns the shell", "Mina finds the shell", "Mina listens to the ocean sound"],
        answer: "beginning → Mina finds the shell; middle event → Mina listens to the ocean sound; ending → Mina returns the shell",
        why: "the events are placed according to where they occur from the first event to the final event",
        hint: "Find what happens first and what finishes the story before placing the middle.",
        vocabulary: "beginning",
        visual: "finds shell → listens to shell → returns shell",
        visualAlt: "Three arrows show Mina finding, listening to and returning the shell in order."
      },
      {
        type: "single",
        question: "A short text uses lines and rhythm to tell how a bird wakes, flies and lands. What kind of literary text could it be?",
        answers: ["a story poem", "an exit sign", "a shopping label"],
        answer: "a story poem",
        why: "the poem form carries a character and connected events",
        hint: "Look for the choice that can use lines and rhythm while still telling events.",
        vocabulary: "poem"
      },
      {
        type: "text",
        question: "Put these sleepy-bird poem events in order: reaches a tree, wakes, flies.",
        answer: "wakes, flies, reaches a tree",
        why: "the ordered events form a clear movement from the poem's beginning to its ending",
        hint: "Begin with what the sleepy bird must do before it can fly.",
        vocabulary: "ending"
      },
      {
        type: "single",
        question: "Which feature would best support identifying a selected text as a fairytale?",
        answers: ["A frog changes magically into another form.", "The page number is 6.", "The cover is rectangular."],
        answer: "A frog changes magically into another form.",
        why: "a magical event is a recognisable feature present in the selected fairytale",
        hint: "Choose a story feature, not a feature shared by almost every book.",
        vocabulary: "fairytale"
      },
      {
        type: "fill-blank",
        question: "Complete the sentence about literary types.",
        template: "A poem can tell a story when it has a character and connected {{blank}}.",
        answer: "events",
        why: "connected events let the poem move from one happening to another",
        hint: "Ask what happens to the character across the poem.",
        vocabulary: "literary text"
      },
      {
        type: "text",
        question: "A story opens with A girl called Amira found a tiny key and closes when she locks the treasure box. Explain how the opening and closing events act as bookends.",
        answer: "Finding the key starts the connected action and locking the box completes it, so they mark the beginning and ending.",
        why: "the first and final connected events locate the boundaries of the story",
        hint: "Explain what action starts the story problem and what action finishes it.",
        vocabulary: "ending"
      },
      {
        type: "text",
        question: "Make a feature map for a tiny literary text of your choice: name its type, one character, two events, its beginning and its ending.",
        answer: "A valid map consistently identifies a literary type, character, connected events, first event and final event from the chosen text.",
        why: "the complete map uses distinct literary features to show how the chosen text works",
        hint: "Use the headings Type, Who, What happens, First and Final.",
        vocabulary: "literary text"
      }
    ],

    AC9EFLE04: [
      {
        type: "single",
        question: "Which spoken pair rhymes?",
        answers: ["moon and spoon", "moon and fish", "spoon and cat"],
        answer: "moon and spoon",
        why: "moon and spoon share the same spoken ending sound",
        hint: "Say each pair aloud and listen to the end of both words.",
        vocabulary: "rhyme"
      },
      {
        type: "fill-blank",
        question: "Complete the repeated action pattern.",
        template: "clap, tap, clap, tap, {{blank}}",
        answer: "clap",
        why: "the alternating action pattern restarts with clap",
        hint: "Say the two-action unit clap, tap and repeat it once more.",
        vocabulary: "action",
        visual: "hands clap | knees tap | hands clap | knees tap | ?",
        visualAlt: "An alternating sequence shows a hand clap, knee tap, hand clap, knee tap and a missing action."
      },
      {
        type: "match",
        question: "Match each sound word to its meaning.",
        matchLeft: ["beat", "rhyme", "chant"],
        matchRight: ["words spoken with a strong repeated rhythm", "matching end sounds", "a steady pulse"],
        answer: "beat → a steady pulse; rhyme → matching end sounds; chant → words spoken with a strong repeated rhythm",
        why: "each term is matched to the sound feature it names",
        hint: "Start by matching beat with something you can tap steadily.",
        vocabulary: "beat"
      },
      {
        type: "single",
        question: "Complete the rhyme. Bright star, shining light. Which word could finish the next line: I can see you in the what?",
        answers: ["night", "sky", "tree"],
        answer: "night",
        why: "night repeats the spoken ending sound in light",
        hint: "Listen for a word ending with the same sound as light.",
        vocabulary: "rhyme"
      },
      {
        type: "single",
        question: "The class taps four steady beats while saying Tap your knee, count to three. What should stay steady?",
        answers: ["the pulse under the words", "the last letter on the page", "the story character"],
        answer: "the pulse under the words",
        why: "a beat is the steady pulse that continues under the spoken line",
        hint: "Think about what your hands keep doing evenly while the words are spoken.",
        vocabulary: "beat"
      },
      {
        type: "text",
        question: "Copy this chant with actions: red bird, blue bird, hop-hop-stop. Describe the action you use for each part.",
        answer: "A valid response keeps the spoken parts in order and assigns repeatable actions, such as tap, tap, clap-clap-freeze.",
        why: "the voice and body reproduce the same ordered sound-and-action pattern",
        hint: "Choose one action for each spoken part and keep those actions the same on the repeat.",
        vocabulary: "sound pattern",
        visual: "red bird → tap | blue bird → tap | hop-hop-stop → clap-clap-freeze",
        visualAlt: "Three chant parts are aligned with tap, tap and clap clap freeze actions."
      },
      {
        type: "single",
        question: "Why do blue and you rhyme even though their written endings look different?",
        answers: ["Their spoken end sounds match.", "They begin with the same letter.", "They have the same number of letters."],
        answer: "Their spoken end sounds match.",
        why: "rhyme is decided by listening to spoken ending sounds rather than judging spelling",
        hint: "Close your eyes, say both words and compare what your ears hear at the end.",
        vocabulary: "rhyme"
      },
      {
        type: "text",
        question: "Add one new line to Tap your knee, count to three that keeps a similar beat and rhymes with me.",
        answer: "A valid line fits the spoken pulse and ends with a word such as see, tree, free or bee that rhymes with me.",
        why: "the new line preserves both the audible pulse and the target end-sound pattern",
        hint: "Tap the beat first, then choose an ending word that sounds like me.",
        vocabulary: "rhythm"
      },
      {
        type: "text",
        question: "A group says red bird, blue bird, hop-stop-hop and performs tap, tap, clap-clap-freeze. Find the mismatch and repair the chant or action.",
        answer: "The final spoken order does not match clap-clap-freeze; change the words to hop-hop-stop or change the actions to match hop-stop-hop.",
        why: "the repaired voice and action sequences represent the same ordered pattern",
        hint: "Compare the last three words with the last three actions one position at a time.",
        vocabulary: "sound pattern"
      }
    ],

    AC9EFLE05: [
      {
        type: "single",
        question: "Tama plants a seed, waters it and sees a flower open. Which event comes first?",
        answers: ["Tama plants the seed.", "Tama waters the shoot.", "The flower opens."],
        answer: "Tama plants the seed.",
        why: "planting begins the connected event sequence",
        hint: "Ask what Tama must do before there is a shoot to water.",
        vocabulary: "beginning"
      },
      {
        type: "single",
        question: "What should a clear retell keep?",
        answers: ["the main events in their story order", "every colour on every page", "a completely unrelated ending"],
        answer: "the main events in their story order",
        why: "a retell communicates the important happenings in a sequence listeners can follow",
        hint: "Choose what a listener needs to recognise and follow the familiar text.",
        vocabulary: "retell"
      },
      {
        type: "match",
        question: "Match each retelling word to its job.",
        matchLeft: ["sequence", "retell", "adapt"],
        matchRight: ["change a clear part to make a new version", "tell the important events again", "put events in order"],
        answer: "sequence → put events in order; retell → tell the important events again; adapt → change a clear part to make a new version",
        why: "each word is linked to its distinct role in moving from the familiar text to a changed version",
        hint: "Match sequence with order first, then decide between tell again and change.",
        vocabulary: "adapt"
      },
      {
        type: "single",
        question: "Which choice is a clear adaptation of Tama's seed story?",
        answers: ["Tama still plants and waters, but a tall bean vine grows instead of a yellow flower.", "A spaceship races three robots on the Moon.", "The page is printed in blue ink."],
        answer: "Tama still plants and waters, but a tall bean vine grows instead of a yellow flower.",
        why: "the version keeps recognisable anchor events and changes one purposeful ending detail",
        hint: "Find the version that keeps Tama's planting story but changes one part.",
        vocabulary: "adapt"
      },
      {
        type: "fill-blank",
        question: "Complete Tama's retell with the final event.",
        template: "First Tama plants the seed. Next Tama waters it. Finally, {{blank}}.",
        answer: "the yellow flower opens",
        why: "the final event completes the known beginning-to-ending sequence",
        hint: "Recall what appears after Tama cares for the seed.",
        vocabulary: "ending"
      },
      {
        type: "text",
        question: "Describe a freeze-frame pose that would show the middle event in Tama's story.",
        answer: "A valid pose shows Tama watering the seed or shoot and can be identified as the middle event.",
        why: "the performance represents the correct character action at the correct point in the sequence",
        hint: "Use your body to show Tama doing what happens after planting and before the flower opens.",
        vocabulary: "performance"
      },
      {
        type: "text",
        question: "Order and retell these picture events: flower opens, seed is planted, shoot is watered.",
        answer: "The seed is planted, the shoot is watered, then the flower opens.",
        why: "the picture sequence follows the story's cause and time order",
        hint: "Fix the first and final pictures before placing the watering picture between them.",
        vocabulary: "sequence",
        visual: "[flower opens] [seed is planted] [shoot is watered]",
        visualAlt: "Three unordered picture labels show an open flower, a planted seed and a watered shoot."
      },
      {
        type: "text",
        question: "A child changes Tama, the seed, every event and the ending. Explain why listeners may no longer recognise the adaptation and suggest a repair.",
        answer: "Too many anchors were removed; keep Tama and the planting sequence, then change just one character, setting, event or ending first.",
        why: "a recognisable adaptation keeps important parts of the familiar text while changing one clear feature",
        hint: "Name two parts to keep and only one part to change.",
        vocabulary: "adapt"
      },
      {
        type: "text",
        question: "Create a three-part retell of a familiar literary text, then adapt its ending and state exactly what stayed the same.",
        answer: "A valid response sequences three main events, changes the ending and identifies retained characters or earlier events.",
        why: "the response demonstrates an accurate retell before making and explaining a purposeful adaptation",
        hint: "Plan First, Next and Finally, then replace only the Finally part and compare both versions.",
        vocabulary: "retell"
      }
    ],

    AC9EFLY01: [
      {
        type: "single",
        question: "What is a story about a wombat's lost sock most likely made to do?",
        answers: ["entertain with characters and events", "list true wombat body facts", "show the emergency exit"],
        answer: "entertain with characters and events",
        why: "the story clue points to an imaginative sequence designed for enjoyment",
        hint: "Think about the job of a text with a character and an adventure.",
        vocabulary: "purpose"
      },
      {
        type: "single",
        question: "What is a page titled Wombat Facts most likely made to do?",
        answers: ["inform readers about wombats", "tell a made-up quest", "direct people out of a building"],
        answer: "inform readers about wombats",
        why: "the title promises factual information about the topic",
        hint: "The word facts tells you which job the page is trying to do.",
        vocabulary: "informative text"
      },
      {
        type: "match",
        question: "Match each familiar text to its main purpose.",
        matchLeft: ["exit sign", "animal story", "frog fact page"],
        matchRight: ["inform about frogs", "guide people towards a way out", "entertain with characters and events"],
        answer: "exit sign → guide people towards a way out; animal story → entertain with characters and events; frog fact page → inform about frogs",
        why: "each text is paired with the practical or communicative job its clues support",
        hint: "Match the exit sign first by asking what action it helps people take.",
        vocabulary: "text"
      },
      {
        type: "single",
        question: "Which cover clue most strongly suggests an informative animal book?",
        answers: ["a labelled photograph and the title Animal Facts", "a dragon character searching for treasure", "a speech bubble saying Once upon a time"],
        answer: "a labelled photograph and the title Animal Facts",
        why: "the label, photograph and fact title are clues that the book is designed to inform",
        hint: "Look for evidence that promises real information rather than an adventure.",
        vocabulary: "cover"
      },
      {
        type: "text",
        question: "A farm-animal story and a farm-animal fact book belong in one topic group. Explain their different purposes.",
        answer: "Both share the topic farm animals, but the story mainly entertains and the fact book mainly informs.",
        why: "topic and purpose are identified separately so two related texts can do different jobs",
        hint: "First say what both texts are about, then say what each one is for.",
        vocabulary: "topic"
      },
      {
        type: "single",
        question: "A green sign shows a running figure, a doorway and an arrow. What is its purpose?",
        answers: ["guide people towards an exit", "tell a bedtime story", "teach wombat facts"],
        answer: "guide people towards an exit",
        why: "the doorway, moving figure and arrow combine as a familiar guidance symbol",
        hint: "Follow the arrow and ask where the pictured person is going.",
        vocabulary: "symbol",
        visual: "running figure → doorway",
        visualAlt: "A running figure follows an arrow towards a doorway on an exit sign."
      },
      {
        type: "fill-blank",
        question: "A simple recipe shows numbered steps for making fruit salad. Complete its purpose.",
        template: "The recipe is made to {{blank}} the reader how to make fruit salad.",
        answer: "instruct",
        why: "numbered action steps tell the reader what to do and in what order",
        hint: "Choose the purpose word for giving directions to complete a task.",
        vocabulary: "purpose"
      },
      {
        type: "text",
        question: "You find a story, a fact page and care instructions about rabbits. Identify each text's purpose and one clue that proves it.",
        answer: "The story entertains using characters and events, the fact page informs using facts or labels, and the care instructions guide actions using ordered steps.",
        why: "each purpose is justified by a distinct content or layout clue within texts on the same topic",
        hint: "For each text, answer two questions: What is its job and what feature shows that job.",
        vocabulary: "clue"
      },
      {
        type: "text",
        question: "Design a cover clue for either an imaginative story or an informative book about sea animals, then explain the purpose it signals.",
        answer: "A valid response creates a fitting cover feature, names the text as a story or informative book and explains whether the clue signals entertaining or informing.",
        why: "the designed cover feature communicates a plausible text type and purpose before the reader checks inside",
        hint: "Choose character and adventure clues for a story or photograph, label and fact clues for an informative book.",
        vocabulary: "cover"
      }
    ]
  };

  function tierFor(index) {
    if (index < 3) return ["warm-up", "Warm-Up"];
    if (index < 7) return ["core", "Core"];
    return ["challenge", "Challenge"];
  }

  function finishQuestion(code, title, question, index) {
    const [tier, tierLabel] = tierFor(index);
    const method = METHODS[code];
    const { why, vocabulary, ...visibleQuestion } = question;
    return {
      ...visibleQuestion,
      enrichment: index >= 7,
      tier,
      tierLabel,
      summary: `Use this method: ${method}; ${why}.`,
      alignment: {
        concept: title,
        vocabulary,
        method
      }
    };
  }

  for (const [code, authoredQuestions] of Object.entries(replacements)) {
    const lesson = lessons[code];
    const previous = banks[code];
    if (!lesson || !previous) continue;
    const preservedOptionalQuestions = Array.isArray(previous.preservedOptionalQuestions) && previous.preservedOptionalQuestions.length
      ? previous.preservedOptionalQuestions.slice()
      : Array.isArray(previous.questions) ? previous.questions.slice() : [];
    banks[code] = {
      ...previous,
      subject: "Foundation English",
      title: lesson.title,
      topicUrl: `/foundation/english/${lesson.slug}/`,
      preservedOptionalQuestions,
      exportMeta: {
        curriculumCode: code,
        year: "Foundation",
        subject: "English",
        topicTitle: lesson.title,
        publicBranding: "renderer-chrome-only",
        sheets: [
          { slug: "topic-practice-1", title: "Topic Practice 1", questionNumbers: [1, 2, 3, 4, 5] },
          { slug: "topic-practice-2", title: "Topic Practice 2", questionNumbers: [6, 7, 8, 9] }
        ]
      },
      questions: authoredQuestions.map((question, index) => finishQuestion(code, lesson.title, question, index))
    };
  }
})();
