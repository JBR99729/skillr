(() => {
  "use strict";

  const units = window.SkillrFoundationEnglishData || {};

  const profiles = {
    AC9EFLY02: {
      subtitle: "Listen, take turns and choose a voice that suits the listeners",
      learn: "I can listen through a whole turn, respond to the same topic and use a voice that listeners can hear comfortably.",
      routine: "Listen to the whole turn → Wait → Respond on topic → Check your volume",
      method: "listen, wait, respond on topic and choose an audible volume",
      model: {
        title: "Worked example: listen and take a turn",
        steps: [
          "Mia says, ‘My bean seed has two leaves.’ Sam faces Mia and listens until she finishes.",
          "Sam waits, then says, ‘My seed has leaves too.’ His response stays on the same topic.",
          "Sam uses a clear partner voice that Mia can hear without shouting."
        ],
        answer: "Sam shows active listening, waits for his turn, responds about the seed and uses comfortable partner volume."
      },
      apply: {
        title: "Worked example: change volume for the audience",
        steps: [
          "Nora explains a picture to one partner with a quiet, clear voice.",
          "Later, Nora reports the same idea to the class and speaks clearly enough for the back row.",
          "Her message stays the same, but her volume changes because the audience changes."
        ],
        answer: "A suitable volume is not always the loudest or quietest voice; it lets the intended listeners hear comfortably."
      },
      vocabulary: [
        ["interaction", "people listening and speaking with one another"],
        ["turn", "one person’s time to speak or act"],
        ["listener", "a person paying attention to what is being said"],
        ["volume", "how loud or quiet a voice is"],
        ["on topic", "about the same idea being discussed"]
      ],
      activities: [
        ["Listening signal", "Listen to one short class message, then point to a picture that matches what was said.", "Ears ready • eyes or body facing the speaker • hands still enough to listen"],
        ["Turn-and-respond", "In pairs, one student shares a favourite playground activity and the other gives one on-topic response.", "Speaker card → wait card → listener response card"],
        ["Volume match", "Say the same greeting to one partner and then to a small group, changing only the volume needed.", "One partner: quiet and clear • small group: clear enough for all"]
      ],
      misconceptions: [
        ["Waiting silently means listening", "Ask the learner to repeat one idea the speaker shared before responding."],
        ["The loudest voice is always the best voice", "Move closer to the listener and adjust volume until every word is comfortable to hear."],
        ["Any response counts as a turn", "Name the topic first, then make the response connect to that same topic."]
      ],
      quick: [
        "What did the speaker say about the seed?",
        "Which response stays on the speaker’s topic?",
        "What volume would suit one nearby partner?",
        "Show how you know it is your turn to speak."
      ],
      mastery: ["Listens through a whole short turn", "Waits before responding", "Responds on topic", "Uses suitable volume", "Explains why the voice suits the listeners"]
    },

    AC9EFLY03: {
      subtitle: "Use purpose and text clues to tell stories from information texts",
      learn: "I can use characters, events, facts and purpose to distinguish imaginative and informative texts, remembering that pictures can appear in either kind.",
      routine: "Notice the topic → Find text clues → Decide the purpose → Name the text type",
      method: "check characters, events, facts and purpose",
      model: {
        title: "Worked example: identify an imaginative text",
        steps: [
          "The text begins, ‘A tiny dragon lost its striped sock and searched the moonlit garden.’",
          "A tiny dragon is a created character and losing the sock begins an event.",
          "The author’s main purpose is to tell an imagined story that readers can enjoy."
        ],
        answer: "This is an imaginative text because it uses a created character and event to tell a story."
      },
      apply: {
        title: "Worked example: identify an informative text",
        steps: [
          "The text says, ‘Frogs begin life as eggs. Tadpoles hatch and grow legs as they change.’",
          "The sentences give facts and explain changes in a real animal’s life.",
          "The author’s main purpose is to inform the reader about frogs."
        ],
        answer: "This is an informative text because it gives facts and an explanation about a real topic."
      },
      vocabulary: [
        ["imaginative text", "a created story, play or poem that can entertain"],
        ["informative text", "a text that gives facts or explains a real topic"],
        ["character", "a person, animal or being in a story"],
        ["fact", "information that can be checked"],
        ["purpose", "the main reason a text was made"]
      ],
      activities: [
        ["Clue sort", "Sort short text cards by the clues they contain: characters and events, or facts and explanations.", "Story clues • information clues • clues that both text types can use"],
        ["Purpose talk", "Choose a purpose card and say a complete sentence, such as ‘The author made this text to entertain readers.’", "entertain • inform • explain"],
        ["Picture check", "Compare a frog story picture and a labelled frog diagram, then explain why a picture alone does not decide the text type.", "Use words, layout and purpose together"]
      ],
      misconceptions: [
        ["Every text with a picture is imaginative", "Read the words and identify whether the picture supports a story event or real information."],
        ["An informative text cannot be enjoyable", "Keep the decision on facts and purpose, because an informative text can still be interesting."],
        ["One real object makes a text informative", "Check whether the whole text tells created events or mainly gives checkable information."]
      ],
      quick: [
        "Which clue shows that the dragon text is imaginative?",
        "Which sentence from the frog text gives a fact?",
        "What is the main purpose of each worked example?",
        "Can both imaginative and informative texts use pictures? Explain."
      ],
      mastery: ["Names the two text types", "Finds a character or event clue", "Finds a fact or explanation clue", "Names the main purpose", "Uses more than a picture to justify the decision"]
    },

    AC9EFLY04: {
      subtitle: "Blend through words, then reread to check that the text makes sense",
      learn: "I can use learnt letter–sound knowledge to read a word, then reread and use meaning and grammar to notice and repair a mismatch.",
      routine: "Look through the word → Blend from left to right → Read the sentence → Check meaning and grammar",
      method: "blend through print, reread, then check meaning and grammar",
      model: {
        title: "Worked example: decode and check mat",
        steps: [
          "Read the sentence, ‘The cat sat on the mat.’ Stop at the printed word mat.",
          "Point from left to right: lower-case m cues the humming sound at the start of moon, lower-case a cues the short middle sound in apple, and lower-case t cues the tapping sound at the start of top.",
          "Blend smoothly to say mat, then reread the sentence and confirm that ‘on the mat’ makes sense."
        ],
        answer: "The letters support mat, and the whole sentence sounds grammatical and makes sense."
      },
      apply: {
        title: "Worked example: repair a word that does not fit",
        steps: [
          "A reader sees, ‘A fox hid in a den,’ but first says ‘din’ for the printed word den.",
          "The reader looks again: lower-case e cues the short sound heard at the start of egg, not the short sound heard at the start of insect.",
          "The reader blends den and rereads the sentence; a fox can hide in a den, so the repair fits the letters and meaning."
        ],
        answer: "The corrected word is den because its letters, the sentence grammar and the meaning all agree."
      },
      vocabulary: [
        ["decodable", "able to be read using letter–sound knowledge already learnt"],
        ["blend", "join speech sounds smoothly to say a word"],
        ["context", "the words, pictures and ideas around a word"],
        ["grammar", "the way words work together in a sentence"],
        ["reread", "read again to check or improve understanding"]
      ],
      activities: [
        ["Blend and check", "Read a short decodable sentence, blend one highlighted word and tell whether the sentence makes sense.", "letters → blended word → whole sentence"],
        ["Spot the mismatch", "Listen as the teacher reads one printed word incorrectly, then point to the letter that shows the mismatch.", "Look all the way through the printed word"],
        ["Meaning monitor", "Choose between two possible readings and explain which one fits both the printed letters and the sentence.", "letter evidence + grammar + meaning"]
      ],
      misconceptions: [
        ["The picture can replace decoding", "Cover the picture briefly and use every printed letter before checking the picture as context."],
        ["A blended word never needs checking", "Reread the sentence and ask whether the word fits its grammar and meaning."],
        ["Context means guessing from the first letter", "Look through the whole word first, then use context only to confirm or repair the reading."]
      ],
      quick: [
        "Which printed letter helps repair din to den?",
        "What should a reader do immediately after blending a word?",
        "Why is a picture clue not enough by itself?",
        "Reread the fox sentence and explain why den fits."
      ],
      mastery: ["Looks through the whole printed word", "Blends from left to right", "Rereads the sentence", "Checks grammar and meaning", "Repairs a mismatch using letter evidence"]
    },

    AC9EFLY05: {
      subtitle: "Think before, during and after a text to build meaning",
      learn: "I can predict, visualise, connect, question or summarise and use details from the words, pictures or events to support my thinking.",
      routine: "Choose a strategy → Think about the text → Find evidence → Share the idea",
      method: "choose a comprehension strategy and support it with evidence",
      model: {
        title: "Worked example: predict and confirm",
        steps: [
          "Before reading, notice the title ‘The Missing Boot’ and a picture of muddy pawprints.",
          "Predict, ‘I think the dog moved the boot because the pawprints lead away from the door.’",
          "Read on, then confirm or change the prediction using the next event in the text."
        ],
        answer: "The prediction is useful because it names what might happen and points to the muddy pawprints as evidence."
      },
      apply: {
        title: "Worked example: summarise the main idea",
        steps: [
          "Listen to three sentences: ‘Bees visit flowers. Pollen sticks to their bodies. They carry pollen to other flowers.’",
          "Ask what all three details are mostly about instead of repeating every word.",
          "Summarise, ‘Bees move pollen when they visit flowers.’"
        ],
        answer: "The summary keeps the main idea and joins the important details in one short sentence."
      },
      vocabulary: [
        ["predict", "say what might happen using clues"],
        ["visualise", "make a picture in your mind from the text"],
        ["connect", "link a text idea to another text, experience or fact"],
        ["question", "ask something that helps you understand"],
        ["summarise", "tell the main idea and most important details briefly"],
        ["evidence", "a detail that supports an idea"]
      ],
      activities: [
        ["Before reading", "Use a title and cover image to make one evidence-based prediction.", "I predict a dog moved the boot because the cover shows muddy pawprints."],
        ["During reading", "Pause after an event, visualise it and ask one question about what is still unclear.", "mind picture • question • text clue"],
        ["After reading", "Choose three important picture cards and use them to give a one-sentence summary.", "main idea + important details"]
      ],
      misconceptions: [
        ["A prediction is any guess", "Require the learner to name a title, picture, word or event that supports the prediction."],
        ["A summary repeats every detail", "Choose only the details needed to state what the text is mostly about."],
        ["A personal connection proves the text idea", "Separate the personal connection from the evidence found inside the text."]
      ],
      quick: [
        "What clue supports the prediction about the missing boot?",
        "Which detail belongs in the bee summary?",
        "Ask one question that would help you understand the next event.",
        "Explain the difference between a prediction and a guess."
      ],
      mastery: ["Chooses a suitable strategy", "States a clear text idea", "Points to supporting evidence", "Changes thinking when evidence changes", "Summarises without retelling every detail"]
    },

    AC9EFLY06: {
      subtitle: "Create a clear short text, then edit it together",
      learn: "I can say an idea, draft a short sentence, spell a CVC word by listening to its sound positions, then reread and make helpful edits.",
      routine: "Say the idea → Draft the sentence → Say, segment, spell and check a CVC word → Reread and edit",
      method: "say, draft, spell a CVC word, reread and edit",
      model: {
        title: "Worked example: edit a sentence about an event",
        steps: [
          "The group wants to report that Sam fed the class cat; the visible draft ‘sam fed the cat’ begins the name with lower-case s and has no ending mark.",
          "Say cat slowly, segment it into three sound positions, spell one taught letter for each position and blend the written CVC word back to check it.",
          "Read the whole draft aloud, edit the name to begin with upper-case S and add a full stop: ‘Sam fed the cat.’"
        ],
        answer: "The edited sentence clearly reports the event; cat is checked as a CVC spelling, upper-case S begins the sentence and the full stop marks its end."
      },
      apply: {
        title: "Worked example: spell a CVC word inside a short observation",
        steps: [
          "Say the observation first: ‘We saw a cat.’",
          "Say cat slowly, segment its three sound positions, spell the CVC word and blend it back to check that the written word says cat.",
          "Reread the visible sentence ‘We saw a cat.’ and explicitly check that upper-case W begins it, the full stop ends it and the words carry the intended meaning."
        ],
        answer: "The sentence records one clear observation, uses checked CVC spelling for cat and has a clear capital-letter beginning and full-stop ending."
      },
      vocabulary: [
        ["draft", "a first version that can be improved"],
        ["edit", "check and improve a text"],
        ["sentence", "words that work together to express a complete idea"],
        ["capital letter", "a large letter used at a sentence beginning or for a name"],
        ["full stop", "a mark that can show a telling sentence has ended"],
        ["spelling", "choosing and ordering letters to write words"],
        ["CVC word", "a short word with a consonant sound, a vowel sound and a final consonant sound, such as cat"]
      ],
      activities: [
        ["Shared sentence", "Say one class event together and choose the clearest words before the teacher writes them.", "idea → spoken sentence → written draft"],
        ["CVC spelling check", "Choose one CVC word in the sentence, say it slowly, segment its sound positions, spell it and blend it back to check.", "say • segment • spell • check"],
        ["Publish and check", "Copy the edited sentence clearly and use the class checklist before sharing it.", "meaning • capital • ending mark • spelling"]
      ],
      misconceptions: [
        ["Editing means copying the same draft neatly", "Compare draft and edited sentence, then name the change and why it helps."],
        ["Every possible change should happen at once", "Choose one check at a time: meaning first, then sentence boundary and spelling."],
        ["A correct full stop fixes unclear meaning", "Read the whole sentence aloud and repair the words or order before checking punctuation."]
      ],
      quick: [
        "What idea does the Sam sentence report?",
        "Which two sentence-boundary edits were made?",
        "How does the writer use say, segment, spell and check for the CVC word cat?",
        "Suggest one helpful edit and explain its purpose."
      ],
      mastery: ["Says one intended idea", "Drafts a complete short sentence", "Spells a CVC word by sound position", "Rereads for meaning", "Edits a capital, full stop or spelling choice and explain why"]
    },

    AC9EFLY07: {
      subtitle: "Plan and deliver a short, clear report to peers",
      learn: "I can give a short spoken report that stays on one topic, orders its details and uses a clear voice at a volume suited to the audience.",
      routine: "Choose the topic → Order the details → Rehearse → Speak clearly to peers",
      method: "plan one topic, order details and speak clearly",
      model: {
        title: "Worked example: report a class discovery",
        steps: [
          "Choose one topic: ‘Our bean seed changed.’",
          "Order two details: first a root appeared; next two green leaves opened.",
          "Rehearse, then face the group and deliver the report in a clear classroom voice."
        ],
        answer: "The report stays on the seed, gives two ordered details and can be heard comfortably by the group."
      },
      apply: {
        title: "Worked example: use visual prompts to stay on topic",
        steps: [
          "Place three picture cards in order: empty garden bed, planted seed, small shoot.",
          "Point to each card while saying one connected sentence about what happened.",
          "Finish with, ‘That is how we planted our seed and saw it begin to grow.’"
        ],
        answer: "The picture sequence helps the speaker remember the order without adding unrelated details."
      },
      vocabulary: [
        ["spoken report", "a short talk that shares ideas, information or events"],
        ["topic", "what the whole report is about"],
        ["detail", "a piece of information that explains the topic"],
        ["sequence", "an order that helps ideas make sense"],
        ["rehearse", "practise before presenting"],
        ["volume", "how loud or quiet a voice is"]
      ],
      activities: [
        ["Three-card plan", "Order three familiar picture cards and say one sentence for each card.", "topic picture • detail one • detail two"],
        ["Partner rehearsal", "Give the report to one partner, who checks topic, order and comfortable volume.", "one helpful comment after listening"],
        ["Peer report", "Deliver a twenty-second report to a small group and answer one on-topic question.", "face listeners • clear voice • stay on topic"]
      ],
      misconceptions: [
        ["A report is a list of unrelated facts", "State the topic first and keep only details that explain that topic."],
        ["Speaking quickly makes a report sound prepared", "Pause between ideas and rehearse at a pace listeners can follow."],
        ["Visual prompts should contain every spoken word", "Use one simple picture for each main idea and speak the details aloud."]
      ],
      quick: [
        "What is the topic of the bean-seed report?",
        "Which detail should come first in the report?",
        "How do the three picture cards help the speaker?",
        "What makes a classroom volume suitable?"
      ],
      mastery: ["Names one clear topic", "Selects relevant details", "Orders ideas", "Uses a prompt without reading a script", "Speaks clearly at suitable volume"]
    },

    AC9EFLY08: {
      subtitle: "Use a taught starting point and movement to form recognisable letters",
      learn: "I can use a taught starting point and direction, a comfortable functional grip and a visual check to form recognisable upper-case and lower-case letters.",
      routine: "Watch the model → Start in the taught place → Move in the taught direction → Compare and adjust",
      method: "start, move, form and compare with the taught model",
      model: {
        title: "Worked example: compare three lower-case formation families",
        steps: [
          "Watch lower-case c begin with the school’s taught curve, then compare its starting movement with lower-case a and o.",
          "Watch lower-case n use a down-and-return movement with a bump, then compare it with lower-case m and h.",
          "Watch lower-case v use slanting movements, form one letter from each family and compare start, direction, size and shape."
        ],
        answer: "Lower-case c, n and v represent different formation families, so each follows its own taught start and movement before comparison with the model."
      },
      apply: {
        title: "Worked example: compare three upper-case formation families",
        steps: [
          "Watch upper-case T use straight strokes, upper-case O use a continuous curve and upper-case A use slanting strokes with a cross stroke.",
          "Form each letter from its named starting point in the school’s taught stroke order.",
          "Compare height, direction and recognisable shape, then use the full upper-case reference to choose another letter from each family."
        ],
        answer: "Upper-case T, O and A use different movement families and remain recognisable when each follows the school’s taught model."
      },
      vocabulary: [
        ["formation", "the movements used to make a written letter"],
        ["starting point", "the place where a letter movement begins"],
        ["direction", "the way the pencil moves"],
        ["lower-case", "the smaller everyday form of a letter"],
        ["upper-case", "the capital form of a letter"],
        ["functional grip", "a comfortable pencil hold that allows controlled movement"]
      ],
      activities: [
        ["Family sky write", "Choose a curve, down-and-return or slanting lower-case model, then copy its movement in the air while naming start and direction.", "large movement first • pencil movement next"],
        ["Upper-case family try", "Form one straight-stroke, one curved and one diagonal upper-case letter from the full reference.", "start dot • stroke order • comparison box"],
        ["Alphabet detective", "Use both full-case references to choose one letter from each family and identify the feature that makes it recognisable.", "shape • size • direction • orientation"]
      ],
      misconceptions: [
        ["Any movement is fine if the final shape looks close", "Slow down and copy the taught start and direction so the movement becomes reliable."],
        ["A tight grip gives more control", "Relax the fingers, rest the hand and paper comfortably, then try a short smooth movement."],
        ["Upper-case means only making a lower-case letter larger", "Compare the two taught forms and name the strokes or shape features that differ."]
      ],
      quick: [
        "Which lower-case letters share a curve-start family with c?",
        "How does lower-case n differ from lower-case v in its taught movement?",
        "Name one upper-case letter from the straight, curved and diagonal families.",
        "What four features should you compare after forming any letter?"
      ],
      mastery: ["Uses the taught starting point", "Moves in the taught direction", "Forms recognisable lower-case letters", "Forms recognisable upper-case letters", "Self-checks shape, size and orientation"]
    },

    AC9EFLY09: {
      subtitle: "Listen for rhyme, repeated beginnings, word beats and individual speech sounds",
      learn: "I can listen to spoken language to hear and make rhymes, notice alliteration, clap syllables and isolate an individual speech sound.",
      routine: "Listen to the spoken word → Say or clap its pattern → Name the sound feature → Make another example",
      method: "listen, say or clap, then name the sound pattern",
      model: {
        title: "Worked example: hear and make a rhyme",
        steps: [
          "Listen as the teacher says cake and lake without showing the spellings.",
          "Repeat the pair and stretch the ending of each word; the endings sound the same.",
          "Name the feature as rhyme and offer make as another spoken word with the same ending sound."
        ],
        answer: "Cake, lake and make rhyme because their spoken endings sound the same."
      },
      apply: {
        title: "Worked example: compare alliteration, syllables and one sound",
        steps: [
          "Say ‘helpful Henry’ and notice that both words begin with the same gentle breathy sound.",
          "Say banana and clap three spoken beats: ba, na, na; each beat is a syllable.",
          "Say moon slowly and isolate the humming sound at its beginning as one speech sound."
        ],
        answer: "Helpful Henry shows alliteration, banana has three syllables and moon begins with one humming speech sound."
      },
      vocabulary: [
        ["rhyme", "words whose spoken endings sound the same"],
        ["alliteration", "nearby words beginning with the same speech sound"],
        ["syllable", "a spoken beat in a word"],
        ["phoneme", "the smallest speech sound that can change a word"],
        ["spoken word", "a word we hear or say"]
      ],
      activities: [
        ["Rhyme basket", "Listen to three object names and place together the two whose endings rhyme.", "hear the whole ending; do not decide from spelling"],
        ["Beginning-sound parade", "Choose two picture names that begin with the same sound and say them as an alliterative pair.", "silly snake • busy bee • helpful hen"],
        ["Clap and stretch", "Clap the syllables in a familiar name, then say the first speech sound with a cue word.", "whole word → beats → first speech sound"]
      ],
      misconceptions: [
        ["Rhyming words must look alike", "Hide the print and compare the spoken endings with careful listening."],
        ["A syllable is the same as one speech sound", "Clap the word beats first, then stretch one beat to hear smaller speech sounds inside it."],
        ["A letter name is the beginning sound", "Say the whole cue word and imitate the sound heard at its beginning rather than reciting the letter name."]
      ],
      quick: [
        "Which word rhymes with lake when you say the words aloud?",
        "What repeated beginning sound do you hear in helpful Henry?",
        "How many syllables do you clap in banana?",
        "Say moon slowly and identify its first speech sound using the moon cue."
      ],
      mastery: ["Recognises a spoken rhyme", "Generates a rhyming word", "Recognises alliteration by sound", "Claps spoken syllables", "Isolates one speech sound using a cue word"]
    },

    AC9EFLY10: {
      subtitle: "Break spoken sentences and words apart, then blend or change the parts",
      learn: "I can segment a spoken sentence into words, segment and blend a single-syllable word, and change one speech sound to make a new word.",
      routine: "Listen to the whole utterance → Move one counter for each part → Blend or change the parts → Check the result",
      method: "count spoken parts, blend or change them, then check",
      model: {
        title: "Worked example: segment a sentence into words",
        steps: [
          "Listen to the whole sentence, ‘The dog ran home.’",
          "Say it again slowly and move one counter for The, one for dog, one for ran and one for home.",
          "Touch and count the four counters, then say the whole sentence again."
        ],
        answer: "The spoken sentence has four words because each meaningful spoken word receives one counter."
      },
      apply: {
        title: "Worked example: blend and change a spoken word",
        steps: [
          "Listen to three sounds: the humming sound at the start of moon, the short middle sound in apple and the tapping sound at the start of top.",
          "Slide three counters together and blend the sounds to say mat.",
          "Replace the first sound with the hissing sound at the start of sun, blend again and say sat."
        ],
        answer: "Changing only the first speech sound changes mat to sat while the middle and final sounds stay the same."
      },
      vocabulary: [
        ["segment", "break spoken language into separate parts"],
        ["blend", "join separate speech sounds to say a whole word"],
        ["sentence", "a group of words that expresses an idea"],
        ["word", "a spoken unit that carries meaning"],
        ["phoneme", "one individual speech sound"],
        ["manipulate", "add, remove or replace a speech sound"]
      ],
      activities: [
        ["Word counters", "Move one counter for every word in a short sentence that the teacher says.", "listen first • move once per word • count"],
        ["Sound slide", "Listen to three cue-word sounds and slide three counters together as you blend the word.", "separate sounds → smooth blend → whole word"],
        ["Change one", "Use picture cues to replace the first or final speech sound and say the new word.", "name what changed and what stayed"]
      ],
      misconceptions: [
        ["Counting syllables gives the number of words", "Repeat the sentence and move a counter for every separate meaningful word, including short words."],
        ["Speech sounds are the same as letter names", "Keep the task oral and use cue words to imitate sounds instead of reciting alphabet names."],
        ["Changing one sound means changing the whole word", "Hold two counters still, replace only the named counter and blend all parts again."]
      ],
      quick: [
        "How many words do you hear in ‘The dog ran home’?",
        "Which spoken word do the moon, apple and top cue sounds blend to make?",
        "What changes when mat becomes sat?",
        "What stays the same when mat becomes sat?"
      ],
      mastery: ["Segments a sentence into words", "Segments a single-syllable word into speech sounds", "Blends speech sounds into a word", "Isolates a first, middle or final sound", "Changes one sound and check the new word"]
    },

    AC9EFLY11: {
      subtitle: "Name printed letters, match their cases and connect each to a common sound cue",
      learn: "I can name upper-case and lower-case alphabet letters, match their case forms and use a clear cue word for each commonly represented speech sound.",
      routine: "Look at the printed letter → Say its letter name → Match the other case → Say the common sound with a cue word",
      method: "name the letter, match its case and use its cue word",
      model: {
        title: "Worked example: match dissimilar case forms and a vowel cue",
        steps: [
          "Look at printed upper-case A and lower-case a; their shapes differ, but both have the alphabet name ay.",
          "Match the two forms by their shared letter identity rather than by shape alone.",
          "Use apple as the cue word and imitate the short vowel sound heard at the beginning of apple."
        ],
        answer: "Upper-case A and lower-case a share the name ay and commonly represent the short vowel sound heard at the beginning of apple."
      },
      apply: {
        title: "Worked example: compare the five common short-vowel cues",
        steps: [
          "Match upper-case and lower-case A, E, I, O and U by their shared names, even where the shapes differ.",
          "Say the cue words apple, egg, insect, octopus and umbrella slowly.",
          "For each pair, imitate the short vowel sound at the beginning of its cue word, then state whether the prompt asks for a name or a sound."
        ],
        answer: "The five vowel pairs use the cue words apple, egg, insect, octopus and umbrella for commonly taught short beginning sounds."
      },
      vocabulary: [
        ["letter", "a written symbol in the alphabet"],
        ["letter name", "the name used to identify an alphabet letter"],
        ["upper-case", "the capital form of a letter"],
        ["lower-case", "the smaller everyday form of a letter"],
        ["common sound", "a speech sound a letter often represents"],
        ["cue word", "a known word that helps recall a sound"]
      ],
      activities: [
        ["A-to-Z case partners", "Use the full reference to match printed upper-case cards with their lower-case partners and say each shared letter name.", "same letter name • sometimes very different shapes"],
        ["Vowel name or sound", "Hold up a Name card or Sound card before responding to A, E, I, O or U and its cue picture.", "name response: ay • sound response: beginning of apple"],
        ["Consonant cue hunt", "Choose several consonants across the alphabet, name both cases and use the listed cue word for the commonly taught sound.", "B b ball • G g goat • R r rabbit • Z z zip"]
      ],
      misconceptions: [
        ["A letter name and its sound are the same response", "Show whether the task asks for the alphabet name or the sound heard in the cue word."],
        ["Upper-case and lower-case forms are different letters", "Say the shared letter name while placing the two case cards together."],
        ["The first sound of any example word is suitable", "Use the agreed cue word and the common sound explicitly taught for that printed letter."]
      ],
      quick: [
        "What letter name do upper-case A and lower-case a share?",
        "Which two printed forms are partners for the letter named dee?",
        "What common short vowel sound do you hear first in the cue word egg?",
        "Explain how a letter name differs from a common sound."
      ],
      mastery: ["Names upper-case letters", "Names lower-case letters", "Matches upper-case and lower-case forms", "Uses a cue word for a common sound", "Distinguishes a letter name from a speech sound"]
    },

    AC9EFLY12: {
      subtitle: "Map three speech sounds to letters and blend CVC words",
      learn: "I can segment a simple consonant–vowel–consonant word, choose a letter for each sound position and blend the written word to check it.",
      routine: "Say the word → Stretch three speech sounds → Choose one letter for each position → Blend and check",
      method: "segment, map letters, blend and check the CVC word",
      model: {
        title: "Worked example: build and read cat",
        steps: [
          "Say cat and move three counters for its first, middle and final speech sounds.",
          "Choose printed lower-case c for the sound at the start of cat, lower-case a for the short middle sound heard in apple, and lower-case t for the sound at the start of top.",
          "Place c, a and t in order, then blend the printed word cat to check it."
        ],
        answer: "Cat is a CVC word because its three letters represent a consonant sound, a vowel sound and a final consonant sound in order."
      },
      apply: {
        title: "Worked example: build and read sun",
        steps: [
          "Say sun slowly and listen for three speech sounds.",
          "Choose printed lower-case s using sun as its own cue, lower-case u for the short middle sound in up, and lower-case n for the sound at the start of nest.",
          "Place s, u and n in order and blend the written word sun."
        ],
        answer: "Sun has all three sound positions represented, including the vowel letter in the middle."
      },
      vocabulary: [
        ["CVC word", "a three-letter word with consonant, vowel and consonant sound positions"],
        ["consonant", "a speech sound made with some closing or narrowing in the mouth"],
        ["vowel", "an open speech sound that forms the centre of a syllable"],
        ["segment", "break a spoken word into separate speech sounds"],
        ["blend", "join letter-linked sounds to read a whole word"],
        ["sound position", "the first, middle or final place of a sound in a word"]
      ],
      activities: [
        ["Three counters", "Say a familiar CVC picture name and move one counter for each speech sound.", "first • middle • final"],
        ["Letter map", "Place one printed letter under each counter, then point from left to right.", "sound counter above • letter card below"],
        ["Blend to check", "Blend the three printed letters, choose the matching picture and correct any mismatched letter.", "written word → spoken word → picture meaning"]
      ],
      misconceptions: [
        ["The middle vowel can be skipped", "Hold the middle counter and stretch the vowel sound before choosing its letter."],
        ["Letter names should be blended into the word", "Use each printed letter’s taught sound, then blend the speech sounds smoothly."],
        ["A picture guess is enough", "Point to and blend every printed letter before using the picture to confirm meaning."]
      ],
      quick: [
        "How many sound positions are in the CVC word cat?",
        "Which letter belongs in the middle of the printed word sun?",
        "Why must a CVC word include a vowel sound in the middle?",
        "Blend the printed word cat and explain how you checked it."
      ],
      mastery: ["Hears three sound positions", "Chooses a letter for each sound", "Keeps letters in sound order", "Blends a written CVC word", "Uses meaning to confirm the reading"]
    },

    AC9EFLY13: {
      subtitle: "Use sound–letter knowledge to make and check plausible spellings",
      learn: "I can listen through a whole word, represent its sounds with known letters or letter teams and blend my spelling to find a missing, extra or out-of-order part.",
      routine: "Say the whole word → Listen from first to last → Choose letters or a letter team → Blend and check",
      method: "say, map each sound, spell, then blend to check",
      model: {
        title: "Worked example: spell dog",
        steps: [
          "Say dog slowly and move a counter for the first, middle and final speech sounds.",
          "Choose lower-case d using dog as its cue, lower-case o for the short middle sound heard in orange, and lower-case g for the sound at the start of garden.",
          "Write dog, then blend the spelling from left to right and compare it with the spoken word."
        ],
        answer: "Dog records the three heard sounds in the same order and blends back to the intended word."
      },
      apply: {
        title: "Worked example: use a letter team in fish",
        steps: [
          "Say fish slowly and notice three speech sounds even though the word needs four letters.",
          "Write lower-case f for the first sound, lower-case i for the short middle sound and the letter team sh for the quiet sound at the start of ship.",
          "Blend the spelling fish and check that the final letter team represents one speech sound."
        ],
        answer: "Fish uses four letters for three sounds because the letter team sh works together for the final speech sound."
      },
      vocabulary: [
        ["spell", "choose and order letters to write a word"],
        ["sound–letter relationship", "a connection between a speech sound and its written letter or letters"],
        ["letter team", "two or more letters working together to represent a sound"],
        ["segment", "break a spoken word into speech sounds"],
        ["blend", "join the sounds represented by letters to read the word"],
        ["plausible spelling", "a spelling that sensibly represents the sounds a learner knows"]
      ],
      activities: [
        ["Say and count", "Say a picture name slowly and move counters for the speech sounds you can hear.", "whole word → sound positions"],
        ["Map the spelling", "Choose a letter or known letter team for each sound position.", "one sound may use one letter or a letter team"],
        ["Blend-back check", "Read the spelling from left to right and repair a missing or out-of-order sound.", "Does my spelling say the word I meant?"]
      ],
      misconceptions: [
        ["Every speech sound must use exactly one letter", "Show the sh letter team in fish and explain that its two letters work together."],
        ["All the right letters can be in any order", "Touch the counters from first to last and place each spelling choice in the same sequence."],
        ["An early spelling must already use every adult convention", "Check whether the learner has plausibly represented taught sound–letter relationships before teaching the next pattern." ]
      ],
      quick: [
        "Which three sound positions do you hear in dog?",
        "Why does fish use four letters for three speech sounds?",
        "What does blending back help a speller notice?",
        "Which spelling part represents the final sound in fish?"
      ],
      mastery: ["Segments a spoken word", "Chooses taught letters for sounds", "Uses a known letter team", "Keeps sound order", "Blends back and repair a spelling"]
    },

    AC9EFLY14: {
      subtitle: "Read and write useful common words quickly and accurately",
      learn: "I can read high-frequency and familiar words in meaningful sentences, write them from memory and check every letter in order.",
      routine: "Look at the whole word → Say it in a sentence → Cover and write → Uncover and check",
      method: "look, say, cover, write and check every letter",
      model: {
        title: "Worked example: learn the high-frequency word the",
        steps: [
          "Read the sentence, ‘The dog is on the rug,’ and point to the printed word the.",
          "Say the whole word, notice its three letters in order and cover it.",
          "Write the from memory, uncover the model and check the first, middle and final letters."
        ],
        answer: "The word the is read as a whole in context and written accurately after every letter is checked."
      },
      apply: {
        title: "Worked example: learn a personally familiar word",
        steps: [
          "Choose the learner’s printed name from a small set of classroom name cards.",
          "Say the name, trace its letters with a finger and notice the upper-case first letter.",
          "Cover, write the name from memory, then uncover and compare every letter in order."
        ],
        answer: "A familiar name becomes easier to read and write when the learner connects its meaning with its complete letter sequence."
      },
      vocabulary: [
        ["high-frequency word", "a word that appears very often in texts"],
        ["familiar word", "a word known from everyday life or repeated reading"],
        ["recognise", "know something when you see or hear it"],
        ["memory", "what the mind keeps and can recall"],
        ["context", "the sentence or situation around a word"],
        ["check", "compare a response carefully with a model"]
      ],
      activities: [
        ["Word hunt", "Find one target high-frequency word several times in a shared text and read each sentence.", "same word • different sentence places"],
        ["Look, say, cover, write", "Practise one useful word with the four-step routine, then compare every letter.", "accuracy before speed"],
        ["Familiar labels", "Read and copy names or labels that matter in the classroom, then use one in a sentence.", "name card • room label • class topic word"]
      ],
      misconceptions: [
        ["Only the first letter needs to look right", "Track from first letter to last and compare the complete written word with the model."],
        ["Remembering the outside shape is enough", "Name or point to the letters in order so a change inside the word is noticed."],
        ["A memorised word never needs context", "Read the word in a complete sentence and check that its meaning and grammar fit." ]
      ],
      quick: [
        "Which word appears often in the model sentence?",
        "What happens after you cover the model word?",
        "How do you check a written word without guessing?",
        "Why is a learner’s name a familiar word?"
      ],
      mastery: ["Recognises taught high-frequency words", "Reads a familiar word in context", "Writes a taught word from memory", "Checks every letter in order", "Uses the word meaningfully in a sentence"]
    },

    AC9EFLY15: {
      subtitle: "Treat words as meaning units and notice meaningful parts inside them",
      learn: "I can treat a word as a unit of meaning, find smaller meaningful parts and explain what each part contributes to the whole word.",
      routine: "Say the whole word → Find meaningful parts → Explain each part → Rebuild and check meaning",
      method: "say the word, split meaningful parts and explain each meaning",
      model: {
        title: "Worked example: dog and dogs",
        steps: [
          "Compare a picture of one dog with the printed word dog and a picture of several dogs with the printed word dogs.",
          "Keep the meaningful part dog, which names the animal, and notice the added letter s at the end.",
          "Explain that the added part tells us there is more than one dog."
        ],
        answer: "Dogs has two meaningful parts: dog names the animal and the added s shows more than one."
      },
      apply: {
        title: "Worked example: build the compound word sunhat",
        steps: [
          "Read two picture-word cards: sun and hat.",
          "Join the two complete meaning units to make the printed word sunhat.",
          "Explain that sun tells the condition or use and hat names the object worn on the head."
        ],
        answer: "Sunhat combines two meaningful words to name a hat worn for protection in sunny conditions."
      },
      vocabulary: [
        ["word", "a spoken or written unit that carries meaning"],
        ["meaningful part", "a part of a word that contributes meaning"],
        ["base word", "the main word that carries the central meaning"],
        ["plural", "a word form that can show more than one"],
        ["compound word", "a word made by joining two complete words"],
        ["ending", "a meaningful part added at the end of a word"]
      ],
      activities: [
        ["One or more", "Match pictures of one object and several objects with a base word and its plural form.", "cat → cats • cup → cups"],
        ["Word-part build", "Join picture-word cards to make a familiar compound word and explain both parts.", "sun + hat • rain + coat"],
        ["Meaning detective", "Underline the base word, circle the added part and say what changed in the meaning.", "whole word → base meaning → added meaning"]
      ],
      misconceptions: [
        ["Every letter is a separate meaningful part", "Ask whether the part contributes a stable meaning, rather than splitting the word at every letter."],
        ["A word can be cut anywhere", "Use picture or sentence meaning to find a base word or two complete words that make sense."],
        ["An added ending changes the whole base meaning", "State the base meaning first, then explain only the extra meaning the ending adds." ]
      ],
      quick: [
        "What meaning does dog keep inside dogs?",
        "What meaning does the added letter s contribute to dogs?",
        "Which two complete words make sunhat?",
        "How can you test whether a word part is meaningful?"
      ],
      mastery: ["Treats a word as a meaning unit", "Finds a familiar base word", "Explains a plural ending", "Builds a familiar compound word", "Explains how every identified part contributes meaning"]
    }
  };

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"]/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[character]));
  const elaborationVisual = (label, caption, cards) => `<figure class="english-example-model" role="img" aria-label="${escapeHtml(label)}"><div class="english-card-row">${cards.map((card) => `<span>${escapeHtml(card)}</span>`).join("")}</div><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  const elaboration = (label, title, idea, teach, steps, say, check, fix, worked, mistake, visual) => ({
    label, title, idea, teach, steps, say, check, fix, worked, mistake, visual
  });

  const compactReference = (label, entries) => `<div class="english-card-row english-reference-grid" role="list" aria-label="${escapeHtml(label)}">${entries.map(([heading, detail]) => `<span role="listitem"><strong>${escapeHtml(heading)}</strong><br>${escapeHtml(detail)}</span>`).join("")}</div>`;
  profiles.AC9EFLY08.model.referenceHtml = compactReference(
    "Complete lower-case alphabet grouped into representative formation families; follow the school's taught model for exact movements.",
    [
      ["Rounded and curved", "lower-case c, lower-case a, lower-case d, lower-case e, lower-case g, lower-case o, lower-case q and lower-case s"],
      ["Down and return", "lower-case i, lower-case j, lower-case l, lower-case t and lower-case u"],
      ["Bump, loop or branch", "lower-case b, lower-case h, lower-case k, lower-case m, lower-case n, lower-case p and lower-case r"],
      ["Slant or cross", "lower-case f, lower-case v, lower-case w, lower-case x, lower-case y and lower-case z"]
    ]
  );
  profiles.AC9EFLY08.apply.referenceHtml = compactReference(
    "Complete upper-case alphabet grouped into representative formation families; follow the school's taught model for exact stroke order.",
    [
      ["Straight strokes", "upper-case E, upper-case F, upper-case H, upper-case I, upper-case L and upper-case T"],
      ["Curved strokes", "upper-case C, upper-case G, upper-case J, upper-case O, upper-case Q, upper-case S and upper-case U"],
      ["Straight with a curve", "upper-case B, upper-case D, upper-case P and upper-case R"],
      ["Diagonal or crossed strokes", "upper-case A, upper-case K, upper-case M, upper-case N, upper-case V, upper-case W, upper-case X, upper-case Y and upper-case Z"]
    ]
  );
  profiles.AC9EFLY11.model.referenceHtml = compactReference(
    "Printed upper-case and lower-case pairs A to M with cue words for their commonly taught sounds.",
    [
      ["A a — apple • B b — ball • C c — cat", "Apple cues its short vowel; ball and cat cue their beginning consonant sounds."],
      ["D d — dog • E e — egg • F f — fish", "Dog and fish cue their beginning consonant sounds; egg cues its short vowel."],
      ["G g — goat • H h — hat • I i — insect", "Goat and hat cue their beginning consonant sounds; insect cues its short vowel."],
      ["J j — jam • K k — kite • L l — leaf • M m — moon", "Each cue word supplies the commonly taught sound heard at its beginning."]
    ]
  );
  profiles.AC9EFLY11.apply.referenceHtml = compactReference(
    "Printed upper-case and lower-case pairs N to Z with cue words for their commonly taught sounds.",
    [
      ["N n — nest • O o — octopus • P p — pig", "Nest and pig cue their beginning consonant sounds; octopus cues its short vowel."],
      ["Q q — queen • R r — rabbit • S s — sun", "Q commonly works with u for queen; rabbit and sun cue their beginning consonant sounds."],
      ["T t — top • U u — umbrella • V v — van", "Top and van cue their beginning consonant sounds; umbrella cues its short vowel."],
      ["W w — web • X x — fox • Y y — yak • Z z — zip", "Web, yak and zip cue beginning sounds; x represents two sounds at the end of fox."]
    ]
  );

  const quickAnswers = {
    AC9EFLY02: [
      "The speaker said that the seed has two leaves.",
      "The response 'My seed has leaves too' stays on topic because it adds an idea about the same seed.",
      "A quiet, clear partner voice suits one nearby listener because it can be heard comfortably without shouting.",
      "Wait until the speaker finishes or gives the agreed turn signal before beginning your response."
    ],
    AC9EFLY03: [
      "The tiny dragon is a created character and searching for its striped sock is an imagined event.",
      "The frog text states the fact that frogs begin life as eggs and tadpoles hatch.",
      "The dragon text is made to entertain with a story, while the frog text is made to inform with facts.",
      "Yes; pictures can develop a story event or show and explain factual information, so readers also check the words and purpose."
    ],
    AC9EFLY04: [
      "The printed lower-case e in den cues the short middle sound heard at the start of egg and rules out din.",
      "After blending, reread the complete sentence and check that the word fits both its grammar and meaning.",
      "A picture may suggest several possible words, so the reader must use every printed letter and then confirm with context.",
      "Den fits because its letters blend to den and a den is a place where a fox can hide."
    ],
    AC9EFLY05: [
      "The muddy pawprints beside the missing boot support the prediction that a dog may have moved it.",
      "The fact that bees carry pollen to other flowers belongs in the summary because it explains the text's main idea.",
      "A useful question is, 'Who made the muddy pawprints?' because it targets an unresolved clue in the event.",
      "A prediction is supported by a title, picture, word or event clue, while a guess does not need evidence."
    ],
    AC9EFLY06: [
      "The sentence reports that Sam fed the class cat.",
      "Upper-case S was added to begin the sentence and the name Sam, and a full stop was added to mark the end.",
      "The writer says cat, segments its three sound positions, spells one letter for each position and blends the CVC word back to check it.",
      "One helpful edit is to replace an unclear or misspelled word with the intended word because that makes the message easier to understand."
    ],
    AC9EFLY07: [
      "The topic is how the class bean seed changed.",
      "The root appeared before the green leaves opened, so that detail belongs first.",
      "The three pictures cue the topic and event order so the speaker can stay focused without reading a script.",
      "A suitable classroom volume is clear enough for the intended listeners to hear comfortably without shouting."
    ],
    AC9EFLY08: [
      "Lower-case a and o share a curve-start family with lower-case c in the displayed school-style reference.",
      "Lower-case n uses a down-and-return movement with a bump, while lower-case v uses two slanting movements.",
      "One valid set is upper-case T for straight strokes, O for a curve and A for diagonal strokes.",
      "Compare the starting point, movement direction, size and recognisable shape with the taught model."
    ],
    AC9EFLY09: [
      "Lake rhymes with cake because the spoken endings sound the same.",
      "Helpful and Henry repeat the same gentle breathy speech sound at their beginnings.",
      "Banana has three spoken syllables, heard as the three beats ba, na and na.",
      "Moon begins with the humming speech sound heard when the word moon is stretched slowly."
    ],
    AC9EFLY10: [
      "The sentence 'The dog ran home' has four spoken words: The, dog, ran and home.",
      "The beginning sound in moon, middle sound in apple and beginning sound in top blend to make mat.",
      "The first speech sound changes from the humming moon cue to the hissing sun cue when mat becomes sat.",
      "The short middle sound in apple and the tapping final sound in top stay the same when mat becomes sat."
    ],
    AC9EFLY11: [
      "Upper-case A and lower-case a share the alphabet letter name ay even though their printed shapes differ.",
      "The partners for the letter named dee are printed upper-case D and printed lower-case d.",
      "The cue word egg begins with the commonly taught short vowel sound linked to printed E and e.",
      "A letter name identifies an alphabet letter, while a common sound is a speech sound that the printed letter can represent in a word."
    ],
    AC9EFLY12: [
      "Cat has three sound positions: a first consonant, a middle vowel and a final consonant.",
      "Printed lower-case u belongs in the middle of sun because it represents the short vowel sound heard there.",
      "A CVC word needs a vowel sound in the middle because the vowel forms the centre of its spoken syllable.",
      "Blend the printed letters in cat from left to right, say cat and confirm that it matches the intended word or picture."
    ],
    AC9EFLY13: [
      "Dog has three ordered sound positions represented by printed lower-case d, o and g.",
      "Fish uses four letters for three speech sounds because the letter team sh works together for one final sound.",
      "Blending back helps a speller hear whether a sound is missing, extra or represented out of order.",
      "The letter team sh represents the final speech sound in fish."
    ],
    AC9EFLY14: [
      "The high-frequency word the appears twice in the model sentence.",
      "After covering the model word, write the complete word from memory before uncovering it.",
      "Check a written word by comparing every letter with the model from first to last.",
      "A learner's name is familiar because it has personal meaning and is seen, read and used repeatedly."
    ],
    AC9EFLY15: [
      "The base word dog keeps the meaning of the animal inside dogs.",
      "The added letter s contributes the meaning more than one in the word dogs.",
      "The complete words sun and hat join to make sunhat.",
      "Test a proposed part by asking whether it contributes a stable meaning to the whole word in the picture or sentence."
    ]
  };

  const elaborations = {
    AC9EFLY02: [
      elaboration(
        "E1", "Exchange and build ideas in a group",
        "Pair, group and class talk work when learners listen to an idea, contribute a connected idea and share the speaking space.",
        "Model one two-turn exchange before moving to a small group, and make the connection between the two contributions audible.",
        ["Give one child a seed picture and ask for one observation.", "Ask a partner to listen until the observation is complete.", "Prompt the partner to add a question or idea about that same seed."],
        "What did your partner say, and what connected idea can you add?",
        "The learner recalls a peer's idea and contributes a relevant question, example or detail after waiting for a turn.",
        "Use a speaker card and a listener card, then offer two pictured responses and ask which one stays on the topic.",
        "Mia says the seed has two leaves; Noah waits and adds that its stem has grown taller.",
        "The learner speaks after a pause but introduces an unrelated topic.",
        elaborationVisual("Three-part group exchange showing a first idea, an attentive wait and a connected contribution.", "A useful contribution grows from the idea already shared.", ["Peer idea: two leaves", "Listen and wait", "Connected idea: taller stem"])
      ),
      elaboration(
        "E2", "Show listening in a respectful way",
        "Appropriate listening means not interrupting and showing attention in a way that is comfortable and culturally appropriate for the speaker and listener.",
        "Teach several valid attention signals, such as facing towards the speaker, keeping the body settled, nodding or repeating a key idea; never require direct eye contact as the only proof.",
        ["Explain the short listening purpose.", "Let the speaker finish without interruption.", "Ask the listener to show understanding by recalling one exact detail."],
        "Which detail can you repeat to show that you heard the whole message?",
        "The learner waits, attends in an appropriate way and accurately recalls or responds to one part of the message.",
        "Shorten the message to one sentence and let the learner point to the matching picture before answering orally.",
        "A listener looks towards the picture the speaker is holding, waits and then says, 'You found the shell near the rocks.'",
        "The learner is judged as not listening only because they do not make direct eye contact.",
        elaborationVisual("Several culturally respectful ways to show attentive listening.", "Understanding, not one required body pose, is the evidence of listening.", ["Let the speaker finish", "Attend in a suitable way", "Recall one message detail"])
      ),
      elaboration(
        "E3", "Adjust volume for place and audience",
        "Voice volume changes with distance, setting and audience size so listeners can hear comfortably without being overwhelmed.",
        "Demonstrate the same greeting for a nearby partner, a class audience and an outdoor group, then discuss what changed and why.",
        ["Name the place and intended listeners.", "Model a clear volume for that distance.", "Ask listeners whether every word was comfortable to hear and adjust once."],
        "Who needs to hear you here, and how will your voice reach them comfortably?",
        "The learner selects and adjusts volume according to the named audience and setting while keeping speech clear.",
        "Move the speaker closer, reduce the audience to one partner and rehearse the sentence before changing the distance again.",
        "Nora uses a quiet clear voice beside one partner, then increases her volume enough for the whole class during sharing time.",
        "The learner treats shouting as the correct choice whenever more than one person is listening.",
        elaborationVisual("One message delivered at three suitable volume levels for different listeners.", "Volume serves the listeners and place.", ["Nearby partner: quiet and clear", "Whole class: reaches the back", "Outdoors: clear across the space"])
      ),
      elaboration(
        "E4", "Use spoken language in imaginative play",
        "Imaginative play creates informal reasons to ask, explain, negotiate roles and respond in character.",
        "Set up a familiar pretend context with a clear shared purpose, then model one useful exchange without scripting every line.",
        ["Choose roles in a pretend fruit shop.", "Model a customer asking for an apple and a shopkeeper responding.", "Invite children to continue the exchange and solve a simple play problem."],
        "What could your character say next to keep the play going?",
        "The learner uses understandable spoken language that suits the pretend role and responds to another player's contribution.",
        "Offer role pictures and a complete oral model such as, 'May I have two apples, please?' or 'We have one apple left.' before fading the prompt.",
        "The customer asks for two apples; the shopkeeper replies that one is left and suggests a pear.",
        "The learner repeats a memorised line even when it no longer responds to the play situation.",
        elaborationVisual("Pretend shop interaction between a customer and shopkeeper.", "Each spoken turn responds to the shared play situation.", ["Customer request", "Shopkeeper response", "New play idea"])
      ),
      elaboration(
        "E5", "Listen to and follow instructions",
        "Following an oral instruction requires listening to the whole direction, keeping its order and completing the named action.",
        "Begin with one-step directions, then add a second step only when children can repeat and complete the first accurately.",
        ["Say, 'Pick up the blue card, then place it beside the book.'", "Ask the learner to repeat the two actions in order.", "Let the learner act and compare the result with the direction."],
        "What will you do first, and what will you do next?",
        "The learner repeats or demonstrates both named actions in the stated order without adding a different action.",
        "Give one instruction at a time with matching object pictures, then reconnect the two steps with first and next.",
        "The learner picks up the blue card first and places it beside the book next.",
        "The learner begins after hearing only the first word and misses the second action.",
        elaborationVisual("Two-step oral instruction shown as an ordered action path.", "Listen to the whole direction before acting.", ["First: pick up blue card", "Next: place beside book", "Check the result"])
      )
    ],

    AC9EFLY03: [
      elaboration(
        "E1", "Distinguish real information from imagined events",
        "Texts can describe checkable real-world information or create imagined characters and events, and some stories mix realistic details with invention.",
        "Compare two short extracts about the same animal so the deciding evidence is purpose and content rather than topic.",
        ["Read a frog fact and a sentence about a talking frog king.", "Name what could be checked in the real world.", "Name the created event and classify each text with a reason."],
        "Which idea can be checked as real information, and which event has been imagined?",
        "The learner identifies a checkable fact and an invented character or event, then links each to the appropriate text type.",
        "Use one Fact card and one Created event card, and let the learner place each sentence before explaining it.",
        "'Frogs begin life as eggs' is checkable information; 'the frog king flew to the moon' is an imagined event.",
        "The learner labels every animal text informative because frogs are real animals.",
        elaborationVisual("Two frog texts compared by checkable information and imagined events.", "The shared topic does not decide the text type.", ["Real-world fact: frog eggs", "Imagined event: frog king flies", "Use content and purpose"])
      ),
      elaboration(
        "E2", "Select an information text for a task",
        "An informative text can help complete a task by supplying relevant facts, labels, explanations or directions.",
        "Give a genuine classroom need and require children to explain how a selected text feature will help, not merely name a book.",
        ["Set the task: find what a tadpole eats.", "Compare a frog story with a labelled frog information page.", "Select the useful text and point to the fact, heading or label that will help."],
        "Which text will help with this task, and where would you look inside it?",
        "The learner selects a relevant informative text and names a feature or content clue that can answer the task question.",
        "Offer only two contrasting texts and place the task question beside them while the learner points to the likely source.",
        "The labelled frog page is selected because its food heading and fact sentence can answer what a tadpole eats.",
        "The learner chooses the most colourful cover without connecting the text to the information needed.",
        elaborationVisual("Task question connected to a useful informative text feature.", "Select the text that can supply the needed information.", ["Task: What does a tadpole eat?", "Choose: frog facts", "Use: food heading and fact"])
      ),
      elaboration(
        "E3", "Compare images by the job they do",
        "Images in imaginative texts can develop characters, settings or events, while images in informative texts can show, label or explain real information.",
        "Compare two images on the same topic and ask what each image helps its text communicate.",
        ["Show an illustrated frog adventure and a labelled frog-life-cycle diagram.", "Describe what each image adds to its text.", "Connect the image job to the text purpose."],
        "What does each frog image help the reader understand?",
        "The learner explains that one image supports an imagined event while the other displays or labels factual information.",
        "Cover the surrounding words and use simple labels, Story event and Real information, before restoring the whole texts.",
        "The adventure picture shows where the frog character travels; the diagram shows and labels real growth stages.",
        "The learner assumes that any drawn image belongs to an imaginative text and any photograph belongs to an informative text.",
        elaborationVisual("An imaginative illustration and informative diagram compared by function.", "Image style alone does not decide the text type; its job in the text matters.", ["Story image: develops an event", "Information image: labels stages", "Compare purpose"])
      )
    ],

    AC9EFLY04: [
      elaboration(
        "E1", "Navigate print and match voice to words",
        "Fluent early reading begins at the agreed starting place, travels in the correct direction, returns to the next line and matches one spoken word with one written word.",
        "Use a pointer under enlarged print and model the return sweep visibly before asking a learner to track independently.",
        ["Point to the first word of a two-line sentence.", "Move once under each written word as it is spoken.", "At the line end, sweep back to the start of the next line."],
        "Where will your voice begin, and where will your pointer move after the final word on this line?",
        "The learner begins correctly, tracks in the text direction, makes a return sweep and maintains one-to-one word matching.",
        "Use word cards with generous spaces in one line, then add a second line after matching is stable.",
        "The learner points under The, dog, ran and home once each, then returns to the left for the next line.",
        "The pointer glides across a whole phrase while the voice says several words, hiding a mismatch.",
        elaborationVisual("Two lines of print with a start marker, one-to-one word points and a return arrow.", "The pointer and spoken words travel together.", ["Start at first word", "One point per spoken word", "Return to next line"])
      ),
      elaboration(
        "E2", "Work through an unknown word",
        "Readers use taught letter–sound knowledge to blend an unknown decodable word and recognise known high-frequency words as complete familiar words.",
        "Make the different strategies explicit: blend through a decodable word, but retrieve and verify a practised high-frequency word in its sentence.",
        ["Pause at the printed word mat and look through every letter.", "Blend the taught sounds from left to right.", "Read the known word the in the sentence and reread the whole phrase."],
        "Which word will you blend, which word do you already know, and how will you check both?",
        "The learner uses complete letter evidence for the decodable word, recognises the taught high-frequency word and rereads for meaning.",
        "Reveal the unknown word one letter at a time, keep a familiar word card beside it and model the final whole-sentence check.",
        "In 'the cat sat on the mat', the learner recognises the and blends mat before rereading the sentence.",
        "The learner guesses the unknown word from its first letter or tries to sound out only a memorised word shape without checking context.",
        elaborationVisual("Two reading pathways joined by a sentence check.", "Use the strategy that fits the word, then monitor the whole sentence.", ["Decodable word: look and blend", "Known frequent word: recognise and verify", "Reread for meaning"])
      ),
      elaboration(
        "E3", "Notice and repair a meaning breakdown",
        "A reader monitors understanding and pauses, rereads or asks for support when a word or sentence stops making sense.",
        "Model a deliberate mismatch and think aloud so seeking support is presented as strategic reading rather than failure.",
        ["Read 'A fox hid in a den' but deliberately say din.", "Pause and state that the sentence does not make sense.", "Look again, blend den, reread and ask for help if the mismatch remains."],
        "What told you meaning had broken down, and which repair will you try first?",
        "The learner notices a mismatch, pauses and uses rereading, letter evidence or an appropriate request for support.",
        "Provide a stop card the learner can raise, then offer the choice: reread, look through the word or ask for a model.",
        "The learner pauses at din, checks the printed vowel, repairs it to den and confirms that a fox can hide there.",
        "The learner continues through a sentence that no longer makes sense without noticing or seeking help.",
        elaborationVisual("Meaning-monitoring loop from mismatch to repair and reread.", "Stopping to repair is part of successful reading.", ["Notice: that did not make sense", "Repair: look, blend or ask", "Reread and confirm"])
      )
    ],

    AC9EFLY05: [
      elaboration(
        "E1", "Sequence and retell important ideas",
        "Picture cues and oral prompts can hold the order of main story events or information ideas so a listener can follow a retell.",
        "Select only the essential ideas, establish their order and model one connected sentence for each prompt.",
        ["Choose three main-event or information cards.", "Place them from first to last or in a logical information order.", "Retell one complete idea per card and check the sequence."],
        "Which idea belongs first, and what clue shows what comes next?",
        "The learner orders key ideas accurately and gives a connected retell supported by each prompt.",
        "Fix the first card, offer two choices for the next card and let the learner retell before adding the final card.",
        "A seed retell places planting before watering and watering before the shoot appears.",
        "The learner orders pictures by colour or preference rather than by text events or logical information.",
        elaborationVisual("Three picture prompts arranged into a connected retell.", "The prompts support important ideas in a meaningful order.", ["First important idea", "Next connected idea", "Final important idea"])
      ),
      elaboration(
        "E2", "Listen for a specific purpose",
        "A listening purpose directs attention towards particular information, such as a character detail or the answer to a question.",
        "State the purpose before reading, keep a simple listening icon visible and pause only after the target information has appeared.",
        ["Ask, 'What is the character carrying?'", "Read the short text once at a natural pace.", "Ask the learner to answer and name the words or image detail that supplied the information."],
        "What are you listening to find out, and what detail answered the question?",
        "The learner retains the stated purpose, selects the relevant detail and links it to the question.",
        "Reduce the text to two sentences and give two picture choices that differ only in the target detail.",
        "The learner listens for the carried object and answers, 'a red basket', after hearing that exact detail.",
        "The learner recalls an interesting detail but not the one needed for the stated listening purpose.",
        elaborationVisual("Listening path from a purpose question to relevant evidence and an answer.", "The purpose tells the listener which detail matters now.", ["Purpose question", "Listen for target detail", "Answer with evidence"])
      ),
      elaboration(
        "E3", "Relate key facts from an information text",
        "After an informative text, learners can state one or two important facts in their own words without inventing details.",
        "Distinguish a key fact from an attractive minor detail by returning to the topic and asking what helps explain it.",
        ["Read three sentences about bees visiting flowers.", "Choose two facts that explain how pollen moves.", "State the facts in a short connected response."],
        "Which two facts best help someone understand the topic?",
        "The learner states one or two accurate facts that are central to the informative text and avoids unsupported additions.",
        "Offer three fact-picture cards and ask the learner to choose the two that answer the topic question.",
        "The learner says that pollen sticks to bees and bees carry it to other flowers.",
        "The learner gives a personal opinion or unrelated fact instead of information from the text.",
        elaborationVisual("Two key facts selected from an informative text and joined to its topic.", "Key facts help explain what the text is mainly teaching.", ["Topic: bees move pollen", "Fact 1: pollen sticks", "Fact 2: bees visit other flowers"])
      ),
      elaboration(
        "E4", "Retell an attributed First Nations cultural account respectfully",
        "Learners can sequence events from a school-approved First Nations Australian story or cultural account while keeping its named creator, source and context connected.",
        "Select an authentic attributed source, follow cultural permissions and retell only the approved content without blending different Nations or adding invented cultural claims.",
        ["Name the creator or source and supplied cultural context.", "Revisit three approved event images from that particular account.", "Order and retell the events using evidence from the source."],
        "What happens first, next and finally in this named account, and which source clue supports the order?",
        "The learner retells the approved events in sequence and refers respectfully to the particular named source.",
        "Use source-approved event images, fix the first event and let the learner order the remaining two before speaking.",
        "After hearing the attributed account, a learner sequences the journey, meeting and return shown in that source.",
        "The learner treats one account as a universal story for all First Nations Australian peoples.",
        elaborationVisual("Respectful sequence pathway for one attributed First Nations Australian account.", "Keep the named source and its approved events together.", ["Named creator or source", "Approved events in order", "Evidence-based retell"])
      ),
      elaboration(
        "E5", "Predict from a title and cover",
        "A title and cover can support a thoughtful prediction when the learner connects a visible clue with what might happen next.",
        "Model tentative prediction language and return to the prediction after reading so children learn to confirm or revise it.",
        ["Read the title 'The Missing Boot'.", "Notice muddy pawprints beside one boot on the cover.", "Predict what may happen and explain the clue, then check after reading."],
        "What do you predict, and which title or cover clue supports it?",
        "The learner makes a plausible prediction, cites a relevant clue and later confirms or changes the idea using text evidence.",
        "Offer two possible predictions and ask which one connects directly to the title or cover image.",
        "The learner predicts that a dog may have moved the boot because muddy pawprints lead away from it.",
        "The learner makes an unrelated guess that cannot be linked to the title or cover.",
        elaborationVisual("Prediction triangle connecting title, cover clue and possible event.", "A prediction is an evidence-based idea, not any guess.", ["Title: The Missing Boot", "Cover clue: muddy pawprints", "Prediction: a dog moved it"])
      )
    ],

    AC9EFLY06: [
      elaboration(
        "E1", "Use beginning writing knowledge to create a text",
        "A short text grows from a spoken idea through known words, taught sound–letter relationships and basic sentence punctuation.",
        "Compose one sentence orally first, then model how each writing choice helps record that same intended idea.",
        ["Say, 'My seed grew.'", "Write known words and use taught sound–letter knowledge for the remaining word.", "Add a capital at the beginning and a full stop at the end, then reread."],
        "What idea are you recording, and which writing choices help another person read it?",
        "The learner writes or contributes to one meaningful sentence using known vocabulary, plausible spelling and sentence-boundary punctuation.",
        "Provide the known words on cards, stretch one decodable word orally and let the learner place a capital and full-stop card.",
        "The group says 'My seed grew', writes the sentence and checks upper-case M and the final full stop.",
        "The learner adds punctuation and letters without first deciding what the sentence should mean.",
        elaborationVisual("A spoken observation transformed into a short written sentence.", "Meaning comes first; writing choices preserve the idea.", ["Say: My seed grew", "Write known and sounded words", "Check capital and full stop"])
      ),
      elaboration(
        "E2", "Respond to a text through drawing and writing",
        "Drawing, labels, early sentences and digital tools can work together to communicate a personal response to a text idea or event.",
        "Require every mark, image or sentence to connect to a specific text moment, while allowing the learner to dictate words that exceed current independent writing.",
        ["Choose one meaningful event from the shared text.", "Draw or select an image that clearly represents it.", "Add a label, dictated sentence or typed beginning that shares the response."],
        "Which text event are you showing, and what do you want another person to understand about your response?",
        "The learner's drawing and words represent a recognisable text event and communicate a connected thought or feeling.",
        "Place the event picture beside the response page and model a complete response: 'I thought Niko felt worried because the boot was missing.'",
        "The learner draws the lost boot in the rain and dictates, 'I felt worried because Niko could not find it.'",
        "The drawing is decorative but cannot be linked to an idea or event in the text.",
        elaborationVisual("Multimodal response connecting a text event, drawing and beginning sentence.", "Each mode contributes to the same response.", ["Text event", "Drawing or digital image", "My thought or feeling"])
      ),
      elaboration(
        "E3", "Read back a self-created text",
        "Reading a draft back to an experienced writer lets the learner check whether the written marks still carry the intended message.",
        "Ask the learner to read first without correction, track the written words and explain any unclear mark before discussing edits together.",
        ["Place the learner's draft where both writers can see it.", "Invite the learner to point and read the intended sentence aloud.", "Compare spoken meaning with the marks and choose one useful edit."],
        "What does your text say, and is there any place where the writing does not yet show your intended idea?",
        "The learner reads or explains the draft, tracks its parts and identifies or accepts one edit that improves message clarity.",
        "Let the learner dictate the sentence again while the experienced writer points to the corresponding written parts.",
        "A child reads 'My seed grew' and notices that seed is missing from the draft, so the pair adds it in the correct place.",
        "The experienced writer corrects the whole draft before hearing what the learner intended to communicate.",
        elaborationVisual("Learner and experienced writer comparing intended speech with a written draft.", "Reading back reveals whether the draft carries the intended meaning.", ["Learner reads intention", "Both track the draft", "Choose one helpful edit"])
      ),
      elaboration(
        "E4", "Find capital letters during shared editing",
        "Circling capital letters at sentence beginnings makes one sentence-boundary feature visible during shared editing.",
        "Use a short text with clear sentence boundaries and connect every circled capital to the sentence it begins, rather than circling all large letters without purpose.",
        ["Reread the shared text and listen for where each sentence begins.", "Point to the first printed letter of each sentence.", "Circle the capital and explain its sentence-beginning job."],
        "Which capital begins this sentence, and how do you know this is the beginning?",
        "The learner locates and circles sentence-opening capital letters and links each one to a complete sentence boundary.",
        "Show one sentence at a time, mark its ending first and then return to circle the capital at its beginning.",
        "In 'Sam fed the cat. It purred.', the learner circles upper-case S and upper-case I because they begin the two sentences.",
        "The learner circles every tall letter or name capital without distinguishing sentence beginnings.",
        elaborationVisual("Two sentences with their opening capitals connected to ending full stops.", "A sentence boundary has a beginning and an ending.", ["Circle upper-case S", "Full stop closes sentence one", "Circle upper-case I"])
      )
    ],

    AC9EFLY07: [
      elaboration(
        "E1", "Share a personal discovery with peers",
        "A semi-formal peer report names one experience, interest or discovery and explains it with relevant details in a clear voice.",
        "Model the difference between a casual fragment and a short planned report while keeping the tone natural for Foundation learners.",
        ["Choose the discovery: a bean seed has sprouted.", "Plan an opening topic and two observable details.", "Rehearse, face the group and speak at a comfortable classroom volume."],
        "What did you discover, and which two details will help your peers understand it?",
        "The learner states one topic, gives relevant details and delivers the report clearly to peers.",
        "Use three picture prompts for topic, detail one and detail two, then rehearse first with one partner.",
        "The learner reports that the bean seed sprouted, a white root appeared first and green leaves opened next.",
        "The learner lists several favourite things without developing one experience or discovery.",
        elaborationVisual("Short discovery report organised into a topic and two details.", "A focused report helps peers follow the discovery.", ["Topic: seed sprouted", "Detail: white root", "Detail: green leaves"])
      ),
      elaboration(
        "E2", "Share a personal response to a text",
        "A spoken response reports what the learner thought or felt about a text idea or event and gives a story clue.",
        "Keep the response and the story evidence together so the report becomes more than a retell or an unsupported preference.",
        ["Name the character action or event.", "State a thought or feeling about it.", "Explain the text clue and deliver the response to peers."],
        "What did you think or feel, and which event made you respond that way?",
        "The learner shares a personal response and supports it with an accurate event, word or image clue from the text.",
        "Offer feeling pictures and model a complete response: 'I felt relieved when the boot was found because Niko could go home.'",
        "The learner says, 'I felt relieved when the neighbour returned Niko's boot because the problem was solved.'",
        "The learner retells an event but does not share a personal thought or feeling about it.",
        elaborationVisual("Spoken response chain from text event to feeling and evidence.", "A response explains both the reaction and its cause in the text.", ["Event: the boot is found", "Response: I felt relieved", "Evidence: Niko could go home"])
      ),
      elaboration(
        "E3", "Use visual prompts to organise a report",
        "A small sequence of visual prompts can help a speaker stay on one topic and recall ideas in order without reading a full script.",
        "Limit each prompt to one clear idea, model pointing and speaking rather than reading labels, and remove any unrelated card.",
        ["Arrange three seed pictures from planting to sprouting.", "Say one connected sentence for each picture.", "Check that every sentence explains the report topic and that the order makes sense."],
        "Which picture comes next, and what sentence will you say without reading a script?",
        "The learner follows the visual sequence, stays on topic and expands each prompt with a relevant spoken sentence.",
        "Fix the first and final pictures, rehearse one sentence at a time and let the learner point while speaking.",
        "The speaker points to empty pot, planted seed and green shoot while reporting the change in that order.",
        "The learner describes picture colours or reads isolated labels without communicating the report ideas.",
        elaborationVisual("Three visual prompts supporting a topic-focused spoken report.", "Pictures cue ideas and order; they do not replace the spoken report.", ["1. Empty pot", "2. Plant seed", "3. Green shoot"])
      )
    ],

    AC9EFLY08: [
      elaboration(
        "E1", "Follow a demonstrated letter movement",
        "A clear handwriting demonstration reveals where a letter begins, which direction the pencil travels and how the strokes create a recognisable form.",
        "Use the school's approved handwriting style, sit beside or in front of learners so direction is unambiguous and verbalise one movement at a time.",
        ["Show the complete lower-case c once.", "Repeat slowly while naming its start near the top and curved direction.", "Ask the learner to sky-write, trace and then form it independently before comparing."],
        "Where does this taught movement begin, which way does it travel and what shape should remain?",
        "The learner follows the demonstrated start and direction and produces a recognisable form that can be compared with the model.",
        "Add a start dot and one direction arrow, enlarge the movement and guide sky-writing before returning to pencil and paper.",
        "The learner begins near the top, curves lower-case c around in the demonstrated direction and keeps it open on the right.",
        "The learner copies only the final appearance by using a different movement that repeatedly reverses or closes the letter.",
        elaborationVisual("Demonstration sequence for forming lower-case c with a start point and curved direction.", "The movement pathway produces the recognisable letter.", ["Watch complete model", "Start near the top", "Curve and keep right side open"])
      ),
      elaboration(
        "E2", "Develop a comfortable functional pencil grip",
        "A functional grip supports controlled movement without pain or unnecessary tension, and effective grips can look different across learners.",
        "Observe comfort, control and endurance rather than enforcing one finger position; make reasonable adjustments for handedness, development and individual needs.",
        ["Seat the learner with supported feet and a comfortably placed page.", "Invite a relaxed pencil hold near enough to the tip for control.", "Write a short pattern, pause and ask about comfort before adjusting only what is needed."],
        "Can you move the pencil smoothly and comfortably, or is any part of your hand working too hard?",
        "The learner uses a comfortable grasp that permits controlled short movements without excessive pressure, pain or rapid fatigue.",
        "Try a thicker tool, shorter writing burst, page-angle change or supportive grip aid while keeping the same letter goal.",
        "The learner relaxes a tight squeeze, turns the page slightly and forms two controlled letters without hand discomfort.",
        "The learner is required to imitate one exact grip even though it reduces control or causes discomfort.",
        elaborationVisual("Functional-grip check focused on comfort, control and sustainable movement.", "The goal is effective writing movement, not one identical hand shape.", ["Comfortable hand and page", "Controlled pencil movement", "Pause and adjust if needed"])
      )
    ],

    AC9EFLY09: [
      elaboration(
        "E1", "Hear and produce spoken rhymes",
        "Rhyming words share the same or a very similar spoken ending, even when learners are not shown how the words are written.",
        "Keep the task oral, say each word naturally and then stretch the endings just enough to compare them without turning the activity into spelling.",
        ["Say cake and lake while pictures are visible but print is hidden.", "Repeat the pair and compare their spoken endings.", "Invite make or another valid spoken rhyme and repeat the set."],
        "Which word has the same spoken ending as cake, and what new rhyme can you make?",
        "The learner recognises a spoken rhyme and produces another word with the matching ending sound.",
        "Offer two picture names, lake and fish, repeat both after cake and ask the learner to echo the matching pair.",
        "The learner repeats cake, lake and make and explains that their endings sound alike.",
        "The learner chooses words because their first sounds match or because their written forms look alike.",
        elaborationVisual("Oral rhyme family represented by three pictures and matching ending waves.", "Listen to the ending of the whole spoken word.", ["cake", "lake", "make"])
      ),
      elaboration(
        "E2", "Notice repeated beginning sounds",
        "Alliteration occurs when nearby spoken words begin with the same speech sound.",
        "Say the phrase before showing any print and anchor the repeated sound in familiar cue words rather than raw notation.",
        ["Say 'helpful Henry' naturally.", "Repeat it slowly and notice the gentle breathy sound at both beginnings.", "Compare it with 'helpful Mia' and create another matching pair."],
        "Which words begin with the same speech sound, and what do you hear at both beginnings?",
        "The learner identifies the repeated beginning sound in a spoken phrase and generates another appropriate alliterative pairing.",
        "Use two picture names beginning with the same cue sound and one contrasting picture, then say every name aloud.",
        "The learner groups helpful and Henry because both begin with the same gentle breathy sound.",
        "The learner matches words by their ending rhyme or by a shared printed letter without listening to the beginnings.",
        elaborationVisual("Alliterative phrase with two matching beginning-sound cues and one contrast.", "Alliteration is heard at the beginnings of nearby words.", ["helpful: gentle breathy beginning", "Henry: same beginning", "Mia: different beginning"])
      ),
      elaboration(
        "E3", "Clap syllables in spoken words",
        "A syllable is a spoken beat in a word, and clapping can make each beat easier to notice.",
        "Use names and familiar words pronounced naturally in the learner's variety of English, accepting legitimate differences in spoken syllable patterns.",
        ["Say banana as a whole word.", "Repeat it slowly and clap the three beats ba, na and na.", "Count the claps, then compare with a one-beat word such as moon."],
        "How many spoken beats do you hear in this word, and where will you clap?",
        "The learner coordinates one clap with each naturally spoken syllable and reports the matching count.",
        "Say the word while placing one counter for each beat before adding the clap movement.",
        "The learner says banana, claps three times and reports three syllables.",
        "The learner counts printed letters or individual speech sounds instead of spoken beats.",
        elaborationVisual("Banana divided into three audible beat cards beside a one-beat comparison.", "One clap marks each spoken syllable.", ["ba: clap one", "na: clap two", "na: clap three"])
      )
    ],

    AC9EFLY10: [
      elaboration(
        "E1", "Segment a spoken word into sounds",
        "A single-syllable spoken word can be stretched into its individual speech sounds while the sound order remains unchanged.",
        "Keep print hidden, use counters rather than letters and describe sounds through cue words so the activity measures listening rather than decoding.",
        ["Say can as a whole word.", "Stretch it and move counters for the quiet cutting sound at the start of cat, the short middle sound in apple and the humming final sound in nest.", "Touch the three counters in order and say the whole word again."],
        "What speech sounds do you hear from the beginning to the end of can?",
        "The learner represents each individual speech sound in the spoken word with one ordered counter and recombines the word accurately.",
        "Begin with two-sound words or provide the first counter, then stretch the word together without displaying letters.",
        "The learner moves three counters for can and keeps the beginning, middle and final sounds in order.",
        "The learner names the letters in the written word or counts its spelling instead of attending to speech sounds.",
        elaborationVisual("Three sound counters for the spoken word can, each anchored by an oral cue.", "The task begins with a spoken word and stays focused on listening.", ["Beginning cue: cat", "Middle cue: apple", "Final cue: nest"])
      ),
      elaboration(
        "E2", "Blend separate sounds into a word",
        "Oral blending joins a sequence of separate speech sounds smoothly to make a recognisable single-syllable word.",
        "Give sounds through unambiguous cue descriptions, pause briefly between them and then shorten the pauses as the learner blends.",
        ["Provide the flowing beginning sound in leaf, the short middle sound in insect and the popping final sound in pig.", "Touch three counters while repeating the sounds in order.", "Slide the counters together and say lip as one word."],
        "Which whole word do these three cue-word sounds make when you join them?",
        "The learner preserves the supplied sound order and blends it into the intended spoken word without adding or omitting a sound.",
        "Use continuous hand movement under the counters, repeat the first two sounds together and then add the final sound.",
        "The learner joins the leaf, insect and pig cue sounds to say lip.",
        "The learner says the cue-word names themselves or changes the order of the supplied sounds.",
        elaborationVisual("Three oral cue sounds sliding together to form the spoken word lip.", "Keep the sounds in order and blend them smoothly.", ["Leaf beginning", "Insect middle", "Pig beginning", "Whole word: lip"])
      ),
      elaboration(
        "E3", "Replace one sound to make a new word",
        "Changing the beginning, middle or final speech sound in a single-syllable word can make a new spoken word while the other sounds stay fixed.",
        "Represent each sound with a counter, physically exchange only the named position and keep the task oral before any print is introduced.",
        ["Build three counters for run.", "Replace only the first counter with the soft blowing beginning sound in fish and blend fun.", "Keep the first and last sounds, change the middle to the short sound in apple and blend fan."],
        "Which sound position changed, which sounds stayed and what new word did you make?",
        "The learner replaces the named speech sound, blends a valid new word and explains which positions changed and stayed.",
        "Hold two counters in place, exaggerate the replacement action and offer two picture choices for the possible new word.",
        "Run changes to fun when the beginning sound changes; fun changes to fan when only the middle sound changes.",
        "The learner changes several sounds at once or reports a new word without identifying the replaced position.",
        elaborationVisual("Three-counter word chain with one counter replaced at each step.", "Only the named sound position changes each time.", ["run: starting word", "change beginning → fun", "change middle → fan"])
      )
    ],

    AC9EFLY11: [
      elaboration(
        "E1", "Recognise letters in a familiar name",
        "A learner's own printed name provides a meaningful place to recognise and name upper-case and lower-case alphabet letters.",
        "Use the learner's preferred written name accurately, name each printed form and avoid assuming that every name follows the same case pattern.",
        ["Display the learner's name card beside two distractor names.", "Find the name using its complete printed sequence.", "Point to and name each familiar letter, noting the first upper-case form when present."],
        "Which printed letters help you recognise your name, and what are their alphabet names?",
        "The learner selects the correct name and accurately identifies one or more printed letters within it.",
        "Begin with the first letter and a matching personal-photo cue, then compare the complete name with one contrasting card.",
        "Mia recognises upper-case M first, then names lower-case i and lower-case a in order.",
        "The learner chooses any name beginning with the same letter without checking the complete sequence.",
        elaborationVisual("A familiar printed name segmented into named letter cards.", "The complete letter sequence identifies the name.", ["Name card: Mia", "upper-case M: em", "lower-case i: eye", "lower-case a: ay"])
      ),
      elaboration(
        "E2", "Match upper-case and lower-case partners",
        "Upper-case and lower-case forms can look different while sharing one alphabet letter name.",
        "Say the shared letter name while placing each pair together and include pairs whose shapes differ strongly, not only easy look-alikes.",
        ["Display upper-case M, lower-case m, upper-case D and lower-case d.", "Say each letter name.", "Match the two em forms and the two dee forms, then explain that case changes but letter identity stays."],
        "Which two printed forms share one letter name even though their shapes differ?",
        "The learner matches upper-case and lower-case forms by shared letter identity and names the pair accurately.",
        "Use one upper-case card and only two lower-case choices, say the letter name together and trace distinctive shape features.",
        "Upper-case D matches lower-case d because both have the letter name dee.",
        "The learner pairs cards only because the shapes look alike or treats the two cases as different letters.",
        elaborationVisual("Two upper-case and lower-case letter pairs joined by shared names.", "Case changes the printed form, not the alphabet letter identity.", ["upper-case M ↔ lower-case m: em", "upper-case D ↔ lower-case d: dee"])
      ),
      elaboration(
        "E3", "Connect letter forms with a common sound",
        "Both case forms of a letter can represent the same commonly taught speech sound, remembered through a familiar cue word.",
        "Separate letter-name questions from sound questions and always state whether the child should name the letter or imitate the sound in the cue word.",
        ["Show upper-case S and lower-case s and name both as ess.", "Say sun and listen to the hissing sound at its beginning.", "Connect both printed forms to that common cue sound and contrast it with another letter."],
        "What is the letter name, and what common sound do you hear at the beginning of its cue word?",
        "The learner names either case form and gives the taught common speech sound through an accurate cue word.",
        "Use separate Name and Sound cards, model one response at a time and let the learner repeat the complete cue word before isolating its beginning.",
        "The learner says ess for the letter name and uses sun to produce the hissing common sound for both S and s.",
        "The learner gives the alphabet name when asked for a sound or gives an unrelated sound based on another example word.",
        elaborationVisual("Letter-name and cue-sound pathways for upper-case S and lower-case s.", "The name identifies the letter; the cue word supports its common sound.", ["Printed forms: S and s", "Letter name: ess", "Cue word: sun", "Common sound: sun beginning"])
      )
    ],

    AC9EFLY12: [],

    AC9EFLY13: [
      elaboration(
        "E1", "Make a plausible spelling and use a meaningful part",
        "A plausible early spelling represents taught speech sounds in order and can also preserve a familiar meaningful part such as the base dog in dogs.",
        "Value the sound evidence the learner can explain, then model one relevant conventional or meaningful pattern without demanding later-year spelling analysis.",
        ["Say dogs and listen from the beginning to the end.", "Write the familiar base word dog using known sound–letter relationships.", "Add the familiar plural ending s, blend back and explain the meaning."],
        "Which sounds and meaningful parts did you represent, and how does your spelling say the word you intended?",
        "The learner makes a defensible spelling choice using taught sound–letter relationships and, where relevant, a familiar meaningful part.",
        "Use counters for heard sounds, supply the known base-word card and let the learner choose between two possible ending cards.",
        "The learner writes dogs by preserving dog and adding s to show more than one, then blends the spelling to check it.",
        "The learner is told that a plausible spelling is wrong without discussion of the sound or meaning knowledge it demonstrates.",
        elaborationVisual("Plausible spelling path combining sound evidence with a familiar base and ending.", "Explain the spelling knowledge used before teaching the next convention.", ["Hear and map dog", "Keep base word dog", "Add plural ending s", "Blend and check dogs"])
      )
    ],

    AC9EFLY14: [
      elaboration(
        "E1", "Read and write high-frequency words in texts",
        "High-frequency words become readily available when learners meet them repeatedly in meaningful shared and independent reading, then practise writing the complete sequence.",
        "Teach a small useful set in sentences, draw attention to every letter and use look, say, cover, write and check instead of shape-only guessing.",
        ["Find the printed word the in 'The dog is on the rug.'", "Read it in the sentence and notice all three letters.", "Cover, write the and compare every letter before rereading the sentence."],
        "Which whole word appears often here, and how will you check every letter after writing it?",
        "The learner recognises a taught high-frequency word in connected text, writes it from memory and checks its complete letter sequence.",
        "Keep the model visible for the first copy, say the word in a sentence and cover it for only a brief memory attempt.",
        "The learner finds and reads the, writes it from memory and compares the full printed word from first letter to last.",
        "The learner identifies the word from its first letter or outside shape but cannot verify the internal sequence.",
        elaborationVisual("High-frequency word routine embedded in a meaningful sentence.", "Read in context, remember the complete word and check every letter.", ["Find the in a sentence", "Look and say", "Cover and write", "Uncover and check"])
      ),
      elaboration(
        "E2", "Read and write personally familiar words",
        "Names of people, characters, places and school contexts become familiar through meaningful repeated use.",
        "Choose words that genuinely matter to the learner, preserve preferred names accurately and connect recognition with the complete printed sequence.",
        ["Select the learner's name or a familiar character name.", "Read it, trace the complete sequence and notice its opening capital where appropriate.", "Cover, write and compare each letter in order."],
        "What makes this word familiar to you, and which letters confirm that it is the right word?",
        "The learner reads a personally familiar word, writes or copies it accurately and verifies the full sequence.",
        "Use a photo or character picture beside the name card, begin with letter tiles and move to writing when the order is secure.",
        "The learner recognises Mia from classroom use, writes upper-case M followed by lower-case i and a, and checks the card.",
        "The learner accepts another word because it shares the same first letter without checking the remaining letters.",
        elaborationVisual("Familiar-word pathway from personal meaning to complete letter sequence.", "Meaning supports memory, while every letter confirms the word.", ["Meaningful person or place", "Read complete name", "Write from memory", "Check every letter"])
      )
    ],

    AC9EFLY15: [
      elaboration(
        "E1", "Find meaningful parts in a word",
        "A word can contain a base that carries the central meaning and an added part that contributes extra meaning, as dog and s work together in dogs.",
        "Use pictures and complete words to establish meaning before splitting the word, and avoid treating every letter as a separate meaning part.",
        ["Match dog with a picture of one dog and dogs with a picture of several dogs.", "Cover the final s and identify the base word dog.", "Reveal s and explain that this added part signals more than one in this example."],
        "What meaning stays in the base word, and what extra meaning does the added part contribute?",
        "The learner separates dog and s as two meaningful parts and explains the contribution of each to the whole word dogs.",
        "Use one-dog and several-dogs picture cards, then physically join the printed base card dog and ending card s.",
        "The learner says dog names the animal and the added s shows that there is more than one dog.",
        "The learner splits dogs into four individual letters and claims each letter carries its own meaning.",
        elaborationVisual("Word-building model connecting dog plus s with one dog and several dogs.", "Split a word where the parts contribute meaning.", ["dog: animal meaning", "s: more than one", "dogs: combined meaning"])
      )
    ]
  };

  const elaborationStudentActions = {
    AC9EFLY02: [
      "Listen until a peer finishes, recall the peer's idea, then add one connected question or detail after waiting for a turn.",
      "Let the speaker finish, show attention in a comfortable and culturally appropriate way, then repeat one exact message detail.",
      "Name the place and listeners, deliver the same line at a suitable volume, ask whether it was comfortable to hear and adjust once.",
      "Take a pretend-shop role, make or answer a connected request, then adapt the next spoken turn when the play situation changes.",
      "Listen to the complete two-step direction, repeat what happens first and next, then carry out both actions in order."
    ],
    AC9EFLY03: [
      "Listen to both frog extracts, sort the checkable fact from the imagined event, then state the clue that supports each decision.",
      "Choose the text that can answer the tadpole question, point to its useful heading, label or fact and explain the choice.",
      "Compare the frog story picture with the life-cycle diagram, then explain how each image helps its text communicate."
    ],
    AC9EFLY04: [
      "Point once under each printed word while reading aloud, then sweep back to the first word on the next line without losing the match.",
      "Look through and blend the unfamiliar printed word, recognise the taught high-frequency word, then reread the complete sentence for meaning.",
      "Pause when the sentence does not make sense, look through the printed word again, reblend it and reread before asking for support if needed."
    ],
    AC9EFLY05: [
      "Order the important event pictures, retell them with first, next and finally, then leave out a detail that does not affect the main sequence.",
      "Listen for the named basket detail, hold it in mind and answer with the exact colour and object after the whole passage ends.",
      "Select the key frog facts, arrange them in a sensible order and relate the information aloud without adding an unsupported idea.",
      "Name the attributed creator or source, order the source-approved events and retell that particular account using a supporting source clue.",
      "Inspect the title and cover, make a possible-event prediction, name the supporting clue and confirm or revise the idea after reading."
    ],
    AC9EFLY06: [
      "Say the intended sentence, draft it, segment and spell its CVC word, then add the sentence boundary marks and reread the complete text.",
      "Choose one text event, draw or select an image for it and add a connected label, dictated sentence or typed response.",
      "Point to and read the self-created draft, compare its marks with the intended message and choose one edit that improves clarity.",
      "Reread each sentence, locate its ending, circle the upper-case letter at its beginning and explain the capital letter's job."
    ],
    AC9EFLY07: [
      "Choose one personal discovery, order two relevant details, rehearse the report and deliver it clearly to peers at a suitable volume.",
      "Name the text event, state a connected feeling or thought, give the text-based reason and share the complete response aloud.",
      "Order three visual prompts, point to each in turn and speak one connected report detail before moving to the next prompt."
    ],
    AC9EFLY08: [
      "Watch the demonstrated start and direction, sky-write and trace the movement, form the letter independently and compare it with the taught model.",
      "Adjust the seat, paper and pencil hold for comfort, make a controlled letter movement, then explain whether the grip supports easy movement."
    ],
    AC9EFLY09: [
      "Listen to and repeat the rhyme pair, compare the spoken endings, then say another word whose ending follows the same sound pattern.",
      "Say the alliterative phrase, identify its repeated beginning sound with a cue word, then create another two-word example.",
      "Say the whole word naturally, clap once for each spoken beat, count the claps and compare the count with a partner's pronunciation."
    ],
    AC9EFLY10: [
      "Say the whole word, move one counter for each heard sound, identify every sound with a cue word and count the separated parts.",
      "Listen to the separated cue sounds, move one counter for each, slide the counters together and blend the whole spoken word.",
      "Build the starting word with sound counters, replace only the named sound, blend the new word and state what changed and stayed."
    ],
    AC9EFLY11: [
      "Find the learner's preferred printed name, point to each letter in order, say its alphabet name and identify its printed case.",
      "Use the full alphabet reference to match upper-case and lower-case partners, including different-looking forms, and say each shared name.",
      "Choose a letter pair, say its alphabet name, say the listed cue word and imitate the commonly taught sound, including vowel and consonant examples."
    ],
    AC9EFLY12: [],
    AC9EFLY13: [
      "Say the intended word, map each heard sound to a taught letter or team, keep any familiar meaningful part, then blend and explain the spelling."
    ],
    AC9EFLY14: [
      "Find the target high-frequency word in a sentence, read it, use look, say, cover and write, then check every printed letter.",
      "Choose a personally familiar name or label, read the complete word, cover and write it, then compare every letter in order."
    ],
    AC9EFLY15: [
      "Match the whole word to its picture meaning, separate the base and ending or two complete words, rebuild it and explain each part's meaning."
    ]
  };

  const baseVerb = (phrase) => {
    const replacements = {
      Listens: "listen", Waits: "wait", Responds: "respond", Uses: "use", Explains: "explain",
      Names: "name", Finds: "find", Looks: "look", Blends: "blend", Rereads: "reread",
      Checks: "check", Repairs: "repair", Chooses: "choose", States: "state", Points: "point",
      Changes: "change", Summarises: "summarise", Says: "say", Drafts: "draft", Edits: "edit",
      Selects: "select", Orders: "order", Speaks: "speak", Moves: "move", Forms: "form",
      "Self-checks": "self-check", Recognises: "recognise", Generates: "generate", Claps: "clap",
      Isolates: "isolate", Segments: "segment", Matches: "match", Distinguishes: "distinguish",
      Hears: "hear", Keeps: "keep", Reads: "read", Writes: "write", Spells: "spell", Treats: "treat", Builds: "build"
    };
    const [first, ...rest] = String(phrase).split(" ");
    return [replacements[first] || first.toLowerCase(), ...rest].join(" ");
  };

  function workedExampleHtml(label, example, method) {
    const steps = example.steps.map((step, index) => `<span role="listitem"><strong>${index + 1}.</strong> ${escapeHtml(step)}</span>`).join("");
    return `<section aria-label="${escapeHtml(label)}"><p><strong>Worked-model method:</strong> ${escapeHtml(method)}.</p><div class="english-card-row" role="list">${steps}</div><p><strong>Model answer:</strong> ${escapeHtml(example.answer)}</p>${example.referenceHtml || ""}</section>`;
  }

  for (const [code, profile] of Object.entries(profiles)) {
    const unit = units[code];
    if (!unit) continue;
    if (!unit.preservedLegacyTopicMaterial) {
      unit.preservedLegacyTopicMaterial = {
        learn: unit.learn,
        model_title: unit.model_title,
        model_html: unit.model_html,
        apply_title: unit.apply_title,
        apply_html: unit.apply_html,
        activities: Array.isArray(unit.activities) ? unit.activities.map((activity) => ({ ...activity })) : unit.activities,
        mistakes: Array.isArray(unit.mistakes) ? unit.mistakes.map((mistake) => Array.isArray(mistake) ? mistake.slice() : mistake) : unit.mistakes,
        quick: Array.isArray(unit.quick) ? unit.quick.slice() : unit.quick,
        mastery: Array.isArray(unit.mastery) ? unit.mastery.slice() : unit.mastery
      };
    }
    unit.subtitle = profile.subtitle;
    unit.learn = profile.learn;
    unit.routine = profile.routine;
    unit.model_title = profile.model.title;
    unit.model_html = workedExampleHtml("First worked example", profile.model, profile.method);
    unit.apply_title = profile.apply.title;
    unit.apply_html = workedExampleHtml("Second worked example", profile.apply, profile.method);
    unit.activities = profile.activities.map(([title, text, visual]) => ({ title, text, visual }));
    unit.mistakes = profile.misconceptions.map(([title, fix]) => [title, fix]);
    unit.quick = profile.quick.slice();
    unit.quickAnswers = quickAnswers[code].slice();
    unit.mastery = profile.mastery.map(baseVerb);
    unit.vocabulary = profile.vocabulary.map(([term, definition]) => ({ term, definition }));
    const studentActions = elaborationStudentActions[code] || [];
    if (studentActions.length !== (elaborations[code] || []).length) throw new Error(`${code}: every elaboration needs a code-specific student action`);
    unit.elaborations = (elaborations[code] || []).map((item, index) => ({ ...item, steps: item.steps.slice(), studentDoes: studentActions[index] }));
    unit.topicModuleMethod = profile.method;
    unit.topicModuleVersion = "foundation-english-ly2-v2";
  }

})();
