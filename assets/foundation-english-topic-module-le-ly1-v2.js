(() => {
  "use strict";

  const data = window.SkillrFoundationEnglishData || {};
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"
  })[char]);
  const visual = (label, caption, cards) => `<figure class="english-example-model" role="img" aria-label="${esc(label)}"><div class="english-card-row">${cards.map((card) => `<span>${esc(card)}</span>`).join("")}</div><figcaption>${esc(caption)}</figcaption></figure>`;
  const activity = (title, text, visualText) => ({ title, text, visual: visualText });
  const elaboration = (label, title, idea, teach, steps, say, check, fix, worked, mistake, visualHtml) => ({
    label, title, idea, teach, steps, say, check, fix, worked, mistake, visual: visualHtml,
    studentDoes: `Complete the modelled response and show this evidence in your own example: ${String(check).replace(/^The learner\s+/i, "")}`
  });
  const clone = (value) => value == null ? value : JSON.parse(JSON.stringify(value));

  const overlays = {
    AC9EFLE01: {
      subtitle: "Connect a literary text with your own life while respecting experiences that differ",
      learn: "I can share an idea about a literary text and compare one text experience with my own experience.",
      routine: "Notice the text experience → Think about my experience → Say similar or different → Point to a text clue",
      model_title: "Worked example 1: make a respectful text-to-self connection",
      model_html: `<p>A picture story shows a child cooking flatbread with an aunt before a family picnic.</p>${visual(
        "Three-step connection model. First notice the child cooking with an aunt. Next recall cooking with a grandparent. Then say that the experiences are similar because both children cook with family.",
        "The response stays close to this story and this reader's experience.",
        ["1. Text: The child cooks with an aunt.", "2. Me: I cook with my grandparent.", "3. Connection: Both children cook with family, so this is similar."]
      )}<p><strong>Think aloud:</strong> I name what happens in the text. I name one experience from my life. I compare only those two experiences and explain the clue.</p>`,
      apply_title: "Worked example 2: explain a difference without judging it",
      apply_html: `<p>In another story, the character travels a long way to collect the family mail. The reader walks to a letterbox beside their home.</p>${visual(
        "Comparison model with two different journeys to collect mail. The story journey is long and the reader's journey is short.",
        "Different does not mean better or worse; it means the experiences are not the same.",
        ["Text experience: a long trip for mail", "My experience: a short walk for mail", "Response: Our experiences are different because the journeys are different lengths."]
      )}<p><strong>Step by step:</strong> Notice the event, recall your own experience, choose <em>similar</em> or <em>different</em>, then explain why.</p>`,
      materials: "an attributed literary text, three connection cards, picture evidence, and a response chart",
      activities: [
        activity("Same or different corners", "Read one story experience aloud. Children move or point to Similar or Different, then name the text event and their connected life experience in complete phrases.", "Two clearly labelled response places: Similar and Different"),
        activity("Clue and connection", "Show a text image and three possible connections. Children choose the response that uses an actual image or event clue.", "Text clue card joined by an arrow to a personal experience card"),
        activity("Many lives, many responses", "Invite two children to share different supported connections to the same event. Model listening without deciding that one life is the normal one.", "One text event in the centre with two different, equally respected response bubbles")
      ],
      mistakes: [
        ["There is only one correct personal response", "Place two different supported responses beside the same text clue and show that both can be thoughtful."],
        ["Similar means every detail is identical", "Circle one shared feature and say that experiences can be similar in one way and different in another."],
        ["One story feature describes every person in a cultural group", "Use the words in this text, point to exact evidence and avoid claims about all families or communities."]
      ],
      quick: [
        "The character eats outside with family; what text-to-self connection could you share?",
        "Which word fits your comparison, similar or different, and what clue proves it?",
        "How can two readers give different thoughtful responses to the same story event?",
        "What respectful words keep a comment about culture tied to this particular text?"
      ],
      mastery: [
        "name one experience shown in a story, poem or literature image",
        "connect a text experience with one experience from my own life",
        "say whether the two experiences are similar or different and explain why",
        "use an exact text clue when I share an idea",
        "talk about cultural details as evidence from this text rather than as a rule about everyone"
      ],
      vocabulary: [
        { term: "literature", definition: "stories, poems and other creative texts that invite us to imagine and respond" },
        { term: "experience", definition: "something that happens to a person or that a person does" },
        { term: "connection", definition: "a link between something in a text and something you know or have experienced" },
        { term: "similar", definition: "alike in at least one clear way" },
        { term: "different", definition: "not the same in at least one clear way" },
        { term: "culture", definition: "shared ways of living, knowing, creating and belonging within a group" },
        { term: "text clue", definition: "a word, event or image detail that supports an idea about a text" }
      ],
      elaborations: [
        elaboration("E1", "Recognise a familiar social or cultural experience", "A literary text can show routines, places and relationships that feel familiar to a reader.", "Help children notice one exact feature and connect it with their own life without assuming every classmate shares it.", ["Read an authentic text selected for the class.", "Point to one event, object or relationship.", "Model a complete connection: This feels familiar to me because I also greet my grandparent."], "What detail feels familiar to you, and what in your life does it remind you of?", "The learner names a specific text detail and a relevant personal experience.", "Offer two pictured experiences and let the child point before saying a complete connection.", "The text child greets a grandparent after school; the reader connects this with greeting their own grandparent on weekends.", "The child says only, I like it, without naming a connection.", visual("A familiar-experience link from a text event to the reader's own experience.", "A connection needs a detail on both sides.", ["Text detail", "This reminds me of my own greeting", "My experience"])),
        elaboration("E2", "Compare an experience from a world story", "A story from another place can show an experience that is similar to or different from the reader's life.", "Compare one observable story event at a time and keep the language descriptive rather than judgemental.", ["Notice where and how the event happens.", "Recall the reader's own version of that event.", "State similar or different and give a reason."], "The character travels through snow to school; how is your trip to school similar or different?", "The learner compares the story journey with their own journey using one accurate reason.", "Use a two-column picture chart labelled In the story and In my life.", "In the story the child wears snow boots; the reader wears sandals, so the clothing experiences are different because the weather shown is different.", "The child labels the whole story strange instead of comparing one experience.", visual("Two-column comparison of a snowy school journey and the reader's own school journey.", "Compare one experience, not whole groups of people.", ["In the story", "In my life", "Similar or different with a reason"])),
        elaboration("E3", "Respond to an attributed First Nations Australian story", "Children can listen to, view and respond to a story by a First Nations Australian storyteller in its named source and context.", "Use a school-approved, attributed text; name the author or storyteller and Country or language group when the source provides it, and follow local cultural guidance.", ["Introduce the creator and source accurately.", "Listen or view without copying restricted or sacred material.", "Share one idea using an exact story or image clue."], "What did you notice in this storyteller's work, and which part made you think that?", "The learner shares a response grounded in the selected text and refers respectfully to its named creator or source.", "Replay one approved image and model a complete response, such as: I noticed the journey image; it made me think about travelling with family.", "After viewing the approved story, a child points to a repeated journey image and explains the feeling it created.", "The child treats all First Nations stories as if they come from one culture or follow one pattern.", visual("Respectful response pathway for an attributed First Nations Australian text.", "Keep creator, source, evidence and response connected.", ["Named creator and source", "Exact story or image clue", "My respectful response"])),
        elaboration("E4", "Compare Australian family life across settings", "Australian stories can portray family life in suburban, regional, remote and other settings.", "Use setting evidence such as travel, buildings, landscape or daily routines, while avoiding claims that one setting represents every family.", ["Name the setting shown in each text.", "Find one family event in each setting.", "Compare the experiences using evidence."], "What changes because of the setting, and what family experience stays similar?", "The learner identifies a setting clue and makes a supported comparison between family experiences.", "Place one landscape clue and one family-action clue under each story image.", "One family travels by car to a town event and another walks to a nearby event; both stories show families going somewhere together.", "The child assumes all remote families or all suburban families live in the same way.", visual("Two Australian settings compared through story evidence.", "Settings differ, while family experiences may share features.", ["Setting A clue + family event", "Setting B clue + family event", "Supported comparison"])),
        elaboration("E5", "Notice cultural details revealed in a story", "Characters and events may reveal food, dress, celebrations, languages and daily routines within the particular story.", "Teach children to describe the detail, connect it to the event and use cautious words such as in this story.", ["Locate a visible or stated detail.", "Explain what the character does with it.", "Frame the observation as evidence from this story."], "What feature of daily life do you notice, and how does the story show it?", "The learner identifies a cultural feature and links it to a character or event without overgeneralising.", "Model a complete sentence: In this story, the character shares a meal during a celebration.", "A child notices that the family shares a particular meal during a celebration and points to both the illustration and event.", "The child turns one character's action into a rule about a whole culture.", visual("Evidence frame for describing a cultural detail in one story.", "Describe exactly what this text shows.", ["Detail I notice", "Character or event link", "In this story, the family shares a meal"])),
      ]
    },

    AC9EFLE02: {
      subtitle: "Share a feeling or thought about a character or event and explain the story clue",
      learn: "I can say how a story event or character makes me feel or think and point to the story clue that shaped my response.",
      routine: "Recall the event → Name the character → Share my response → Give the story clue",
      model_title: "Worked example 1: respond to a story event with evidence",
      model_html: `<p>In a story, Niko loses a red boot in the rain. A neighbour finds it and returns it.</p>${visual(
        "Four-step story response. The event is a lost boot, the reader feels worried, the clue is the rain and the missing boot, and the response changes to relief when the boot returns.",
        "A response tells what you feel or think and what in the story caused it.",
        ["1. Event: Niko loses a boot.", "2. Feeling: I felt worried.", "3. Clue: It was raining and the boot was missing.", "4. Later: I felt relieved when it came back."]
      )}`,
      apply_title: "Worked example 2: explain a thought about a character",
      apply_html: `<p>A character gives the last piece of fruit to a hungry friend.</p>${visual(
        "Character response model. Notice the action, form a thought about the character, and justify the thought with the action.",
        "The action is evidence for the reader's thought.",
        ["Action: gives away the last piece", "Thought: the character is caring", "Because: the friend was hungry"]
      )}<p>The reader may speak, draw or begin to write this response. The meaning matters more than the response mode.</p>`,
      materials: "a familiar story, event and character cards, feeling faces, and drawing or response paper",
      activities: [
        activity("Pause and respond", "Pause after an important event. Children choose a feeling face, then point to the event that caused that response.", "Feeling faces beside one pictured story event"),
        activity("Character clue detective", "Show two thoughts about a character. Children choose the thought supported by the character's action and explain the clue.", "Character action card linked to a thought bubble"),
        activity("Draw, say, explain", "Children draw one moment that made them think or feel something, then dictate or say a complete reason.", "Drawing box with a complete response: I felt relieved because the boot came back")
      ],
      mistakes: [
        ["Naming the character's feeling instead of the reader's response", "Use two speech bubbles labelled Character may feel and I felt or thought, then answer in the correct bubble."],
        ["Giving a feeling with no story clue", "Return to the pictured event and model a complete link, such as: I felt worried when the boot went missing."],
        ["Believing a response only counts when it is written", "Accept drawing, speaking, gesture or beginning writing, then ask the child to explain the link to the story."]
      ],
      quick: [
        "When Niko loses the boot, what do you feel and which event causes that response?",
        "What action shows that the fruit-sharing character is caring?",
        "How is the reader's feeling different from a character's feeling?",
        "Which part of your drawing shows the event you are responding to?"
      ],
      mastery: [
        "name an important event and the character involved",
        "share my own feeling or thought about that event",
        "support my response with a word, action or image clue from the story",
        "respond through talk, drawing or beginning writing",
        "listen respectfully when another reader has a different supported response"
      ],
      vocabulary: [
        { term: "character", definition: "a person, animal or imagined being in a story" },
        { term: "event", definition: "something that happens in a story" },
        { term: "response", definition: "what you feel, think, say, draw or write after a text" },
        { term: "feeling", definition: "an emotion such as happy, worried, surprised or relieved" },
        { term: "thought", definition: "an idea or opinion in your mind" },
        { term: "story clue", definition: "a story word, action or picture detail that supports a response" }
      ],
      elaborations: [
        elaboration("E1", "Express a response through drawing or early writing", "A drawing, label, mark or beginning sentence can show a personal response to a story, poem or film.", "Model how a visual detail records the chosen event and how a short oral or written explanation gives the response.", ["Choose one meaningful moment.", "Draw the character and action clearly.", "Add or dictate a complete response: I felt relieved because the boot came back."], "Which part of your drawing shows the moment, and what was your response?", "The learner's drawing or early writing represents a recognisable text moment and a connected response.", "Offer the event picture to trace or point to, then scribe the child's own words beside it.", "The child draws the returned boot and adds a happy face because the problem is solved.", "The drawing is decorative but does not connect to a text event.", visual("Drawing response with a text event, response and reason.", "Each part helps another person understand the reader's response.", ["Draw the event", "Show the feeling or thought", "Say or write the reason"])),
        elaboration("E2", "Discuss characters and events through personal connections", "Talking about a character or event becomes clearer when the reader links it to something they know or have experienced.", "Keep the story event visible and separate what happened in the story from what happened to the reader.", ["Name the character and event.", "Share a connected personal experience.", "Explain how the connection shapes the response."], "Has something like this happened to you, and how does that help you understand the character?", "The learner names both the story event and a relevant personal connection.", "Use two mats labelled Story and My life so the child places each event in the right place.", "The character starts at a new school; the reader recalls their own first day and explains why the character may need courage.", "The child retells their own experience but forgets to connect it back to the story.", visual("Story-to-self discussion model with two linked but separate events.", "Connect the experiences without mixing them up.", ["Story: character and event", "My life: connected experience", "My response to the story"]))
      ]
    },

    AC9EFLE03: {
      subtitle: "Recognise kinds of literary texts and locate characters, events, beginnings and endings",
      learn: "I can name a kind of literary text and identify its characters, events, beginning and ending.",
      routine: "Name the literary text → Find who → Find what happens → Mark the beginning and ending",
      model_title: "Worked example 1: map the features of a short story",
      model_html: `<p>A short story begins, “A girl called Mina found a shining shell.” Mina takes the shell home, listens to its ocean sound and returns it to the beach.</p>${visual(
        "Story feature map. Mina is the character. Finding, listening to and returning the shell are events. Finding the shell begins the story and returning it ends the story.",
        "Characters are who; events are what happens; beginning and ending show the story's boundaries.",
        ["Character: Mina", "Beginning: finds a shell", "Events: listens, then returns it", "Ending: shell is back at the beach"]
      )}`,
      apply_title: "Worked example 2: find a story inside a poem",
      apply_html: `<p>A four-line poem tells of a sleepy bird that wakes, stretches, flies and reaches a tree.</p>${visual(
        "Poem story map with a bird character and ordered events from waking to reaching a tree.",
        "A poem can tell a story even when it uses lines and rhythm.",
        ["Text type: story poem", "Character: sleepy bird", "Beginning event: wakes", "Ending event: reaches the tree"]
      )}<p>First name the kind of literary text. Then use its words or images to locate the same story features.</p>`,
      materials: "a short story, a narrative poem, four story-feature cards, and beginning-to-ending picture strips",
      activities: [
        activity("Who or what happened?", "Sort cards into Character and Event. Children explain why Mina is who and returning the shell is what happened.", "Two labelled hoops: Character and Event"),
        activity("Story bookends", "Place a Beginning marker before the first event and an Ending marker after the final event, then retell the middle events.", "Beginning marker, ordered event cards, ending marker"),
        activity("Literary text gallery", "Compare a short story, fairytale and story poem. Name each type and find one shared feature.", "Three covers with feature icons for character, event, beginning and ending")
      ],
      mistakes: [
        ["Every text with pictures is a story", "Compare an illustrated information page with a literary text and look for characters and connected events."],
        ["A character is the same as an event", "Ask who for the character and what happened for the event, then sort one example of each."],
        ["The title or cover is automatically the story beginning", "Open the text and locate the first story event; explain that the cover helps us enter the text but is not usually an event."]
      ],
      quick: [
        "Who is the character in Mina's shell story, and what is one event?",
        "Which event begins the sleepy-bird poem and which event ends it?",
        "What features would help you recognise a fairytale rather than a sign?",
        "How can a poem use characters and events to tell a story?"
      ],
      mastery: [
        "recognise a story, fairytale or story poem as a kind of literary text",
        "identify a character by answering who is in the text",
        "identify an event by explaining what happens",
        "locate the first story event and the final story event",
        "use text or picture evidence to explain each feature"
      ],
      vocabulary: [
        { term: "literary text", definition: "a creative text such as a story, poem or play" },
        { term: "character", definition: "a person, animal or imagined being in a literary text" },
        { term: "event", definition: "something that happens in a literary text" },
        { term: "beginning", definition: "the part where the text and its first event start" },
        { term: "ending", definition: "the part where the final event finishes the text" },
        { term: "fairytale", definition: "a traditional kind of imaginative story that often has magical events or a lesson" },
        { term: "poem", definition: "a literary text arranged to make meaning through words, lines, sounds or rhythm" }
      ],
      elaborations: [
        elaboration("E1", "Recognise familiar story beginnings", "Story openings can use familiar phrases or introduce a character, place or first event.", "Compare two openings and identify exactly how each signals that a story is starting.", ["Read: Once upon a time, a fox found a red hat.", "Read: A girl called Amira found a tiny key.", "Ask what each opening prepares the listener to meet."], "What tells your ears that the story is beginning?", "The learner identifies an opening phrase or character introduction as a beginning feature.", "Place a Beginning card before each opening and contrast it with an ending sentence.", "A girl called Amira found a tiny key introduces the character and first event.", "The child chooses any sentence containing a character, even if it comes from the middle.", visual("Two ways to open a story.", "Both examples signal a beginning in a different way.", ["Once upon a time, a fox found a red hat", "A girl called Amira found a tiny key", "Beginning signal"])),
        elaboration("E2", "Explore cultural patterns in an attributed First Nations story", "A selected First Nations Australian literary text may organise storytelling through patterns particular to its creator, community, language or mode.", "Use an authentic, attributed and locally appropriate text; describe only patterns observable in that source and follow cultural permissions.", ["Name the creator and source.", "Notice an approved repeated image, place, sound or event pattern.", "Explain how that pattern helps tell this story."], "What pattern do you notice in this storyteller's work, and where does it appear again?", "The learner points to a repeated feature in the selected text without presenting it as a rule for all First Nations stories.", "Revisit two approved moments side by side and let the child point to what repeats.", "The class notices a journey image returning at key moments in the selected text and explains how it links events.", "The child claims that every First Nations story uses the same structure.", visual("Source-specific pattern hunt for an attributed First Nations story.", "Observe, locate and describe a pattern in this text only.", ["Named source", "Pattern in moment 1", "Pattern returns in moment 2"])),
        elaboration("E3", "Identify how a poem can tell a story", "A poem can include a character and ordered events while also using lines, rhythm and sound.", "Read a short narrative poem aloud, then separate its story features from its sound features.", ["Name who appears in the poem.", "Place two or three events in order.", "Mark the first and final event."], "Who is in this poem, and what happens first and last?", "The learner identifies a character and at least two ordered events in the poem.", "Turn each line into a simple picture card and sequence the cards.", "The bird wakes, flies and lands; these ordered events make a tiny story in the poem.", "The child assumes a poem cannot contain a story because it does not look like prose.", visual("A narrative poem shown as ordered event cards.", "Lines and rhythm can carry a beginning-to-ending story.", ["Poem line: bird wakes", "Poem line: bird flies", "Poem line: bird lands"])),
        elaboration("E4", "Notice familiar fairytale features", "Fairytales often include recognisable character types, magical events, repeated patterns or a lesson, although not every fairytale uses every feature.", "Use one familiar fairytale and point to features that are actually present rather than treating a checklist as a rule.", ["Name the fairytale.", "Find a character or magical event.", "Discuss what a character learns, if the text gives a lesson."], "Which feature helps you recognise this as a fairytale, and where is the evidence?", "The learner identifies one present fairytale feature and locates its text or image evidence.", "Offer two cards, a magical event and a page number, and ask which helps identify the literary type.", "A talking frog and a magical change are features that support identifying the selected text as a fairytale.", "The child thinks every fairytale must contain a prince and princess.", visual("Evidence-based fairytale feature check.", "Use features from the selected text, not a compulsory list.", ["Character type", "Magical or repeated event", "Possible lesson"])),
      ]
    },

    AC9EFLE04: {
      subtitle: "Hear, move to and copy the beat, rhyme and repeated sounds in literary language",
      learn: "I can hear and copy the beat, rhyme and repeated sounds in a poem, rhyme or song.",
      routine: "Listen to the whole line → Tap the beat → Notice repeated sounds → Copy with voice and action",
      model_title: "Worked example 1: keep the beat and hear the rhyme",
      model_html: `<p>Say: “Tap your knee, count to three. Clap your hands and sway with me.”</p>${visual(
        "Two spoken lines shown with four steady beat marks and rhyming end words three and me highlighted.",
        "The beat is the steady pulse; the rhyme is the matching end sound.",
        ["Beat: tap • tap • tap • tap", "End words: three / me", "Action: tap knees, then clap hands"]
      )}<p>First listen. Next tap a steady pulse. Then repeat the words and actions without racing.</p>`,
      apply_title: "Worked example 2: copy a repeating sound-and-action pattern",
      apply_html: `<p>Chant: “Red bird, blue bird, hop-hop-stop. Red bird, blue bird, hop-hop-stop.”</p>${visual(
        "A repeated chant unit pairs red bird, blue bird and hop hop stop with the same action sequence twice.",
        "The words, beats and actions repeat in the same order.",
        ["red bird → tap", "blue bird → tap", "hop-hop-stop → clap-clap-freeze"]
      )}<p>Listen for the whole repeating unit, copy it once, then join the second repetition.</p>`,
      materials: "an attributed poem or rhyme, rhythm sticks or hands, action cards, and three rhyme-picture cards",
      activities: [
        activity("Echo the line", "Teacher says one short line with a steady beat. Children echo the same words, pace and actions.", "Teacher speech bubble followed by a matching child echo bubble"),
        activity("Rhyme ears", "Say three words aloud. Children point to the two words with the same ending sound, even if the spelling is not shown.", "Three picture cards: moon, spoon and fish"),
        activity("Action conductor", "A child chooses tap, clap or stamp cards to match a repeated chant, then leads the class through two repetitions.", "Ordered action cards that repeat as one pattern")
      ],
      mistakes: [
        ["Rhythm and rhyme mean the same thing", "Tap the steady beat while saying two non-rhyming words, then compare the beat with the matching end sounds in a rhyme."],
        ["Copying the words but losing the beat", "Slow the line, keep a quiet four-beat tap and add the words back one small part at a time."],
        ["Words rhyme only when their spellings look the same", "Hide the written words and listen to the spoken endings, such as blue and you."]
      ],
      quick: [
        "Which sound matches at the end of three and me?",
        "Can you tap the beat while saying the first chant line?",
        "What action comes after the two hop claps in the bird chant?",
        "How can your ears decide whether blue and you rhyme?"
      ],
      mastery: [
        "keep a steady beat while listening to a short literary line",
        "identify two spoken words that rhyme",
        "copy a short rhythm with my voice and body",
        "repeat words, sounds and actions in the modelled order",
        "describe the difference between a steady beat and a matching end sound"
      ],
      vocabulary: [
        { term: "rhythm", definition: "the pattern of long, short, strong and soft parts we hear in words or music" },
        { term: "beat", definition: "the steady pulse we can tap while a rhyme, poem or song continues" },
        { term: "rhyme", definition: "words that have the same or very similar ending sound" },
        { term: "sound pattern", definition: "sounds that repeat or are arranged in a noticeable way" },
        { term: "chant", definition: "words spoken together with a strong repeated rhythm" },
        { term: "action", definition: "a body movement used to show or support a rhythm" }
      ],
      elaborations: [
        elaboration("E1", "Use music and actions to feel literary rhythm", "Movement and simple music can make the rhythm and sound pattern of a rhyme, poem, chant or song easier to notice.", "Link one consistent action to each part of the sound pattern rather than adding unrelated movement.", ["Listen once without moving.", "Add one steady tap or sway.", "Repeat the literary line with the action."], "Which movement helps you keep the beat, and when does it repeat?", "The learner coordinates an action with the modelled beat or sound pattern.", "Remove the words, rehearse the action pattern slowly, then add the words again.", "Children sway on each steady beat and clap on the repeated end word.", "The child performs exciting actions that do not match the literary sound pattern.", visual("Literary line aligned with a steady movement sequence.", "Each action marks an audible feature.", ["Listen", "Tap or sway", "Say and move together"])),
        elaboration("E2", "Recite a rhyme with actions", "Reciting means saying a known rhyme aloud so its wording, rhythm and actions can be shared with others.", "Teach a short section through echoing, then combine sections only when children can keep the sequence.", ["Teacher says and acts one short part.", "Children echo that part.", "Join the parts and perform the whole rhyme."], "Can you copy my words, beat and action in the same order?", "The learner recites the modelled section and coordinates the agreed actions with it.", "Reduce the echo to two or three words and one action before building back up.", "For tap your knee, children tap knees; for clap your hands, they clap once while keeping the pulse.", "The child remembers the action but replaces or reorders the literary words.", visual("Echo-recitation sequence from teacher model to shared performance.", "Copy a small part, then connect the parts.", ["Teacher models", "Children echo", "Class recites together"])),
        elaboration("E3", "Explore rhythm in an attributed First Nations Australian poem", "A school-approved poem by a First Nations Australian creator can be heard and appreciated through the rhythm present in that particular work.", "Name the poet and source, follow cultural permissions, and listen closely without imitating language, performance or cultural material that has not been invited for classroom use.", ["Introduce the attributed poem and context supplied by its source.", "Listen for an approved repeated rhythm or phrase.", "Respond by tapping or describing that feature as the source permits."], "Where do you hear the rhythm return in this poem?", "The learner locates an audible rhythmic feature in the selected poem and refers respectfully to the named work.", "Replay one approved short section and offer two possible tap patterns.", "The class hears a repeated phrase in the selected poem and softly taps when that phrase returns.", "The child assumes every First Nations poem has the same rhythm or copies restricted performance features.", visual("Respectful listening pathway for rhythm in an attributed First Nations Australian poem.", "Attend to this creator, this source and this audible feature.", ["Named poet and source", "Listen for a feature", "Respond within permission"])),
      ]
    },

    AC9EFLE05: {
      subtitle: "Retell a familiar literary text in order, then make one purposeful change",
      learn: "I can retell the main events of a familiar literary text in order and adapt one part while the text stays recognisable.",
      routine: "Choose the main events → Put them in order → Retell clearly → Change one part and explain it",
      model_title: "Worked example 1: retell the main events in sequence",
      model_html: `<p>In a familiar class story, Tama plants a seed, waters it each day and sees a yellow flower open.</p>${visual(
        "Three-picture story sequence. Tama plants a seed first, waters a shoot next and sees a flower open finally.",
        "A retell keeps the important events and their order.",
        ["First: Tama plants the seed.", "Next: Tama waters the shoot.", "Finally: A yellow flower opens."]
      )}<p>Use the pictures as memory clues. Say a complete event for each picture rather than naming single objects.</p>`,
      apply_title: "Worked example 2: adapt one part of the known story",
      apply_html: `<p>Keep Tama, the planting and the daily care. Change the final plant from a yellow flower to a tall bean vine.</p>${visual(
        "Adaptation comparison. The original yellow flower ending changes to a tall bean vine while the character and earlier events stay the same.",
        "An adaptation changes a clear part but keeps enough of the original to be recognised.",
        ["Keep: Tama plants and waters", "Change: yellow flower → tall bean vine", "New ending: Tama climbs beside the vine in play"]
      )}<p>Tell listeners what stayed the same and what changed. The change can be shown through play, performance, images or writing.</p>`,
      materials: "a familiar class literary text, three to five event pictures, character props, and drawing or recording materials",
      activities: [
        activity("Picture-path retell", "Children place three main-event pictures from left to right, then retell using first, next and finally.", "Three numbered event frames connected by arrows"),
        activity("Freeze-frame performance", "Small groups make a still pose for one main event. The audience identifies where the event belongs in the sequence.", "Beginning, middle and ending floor markers"),
        activity("Change one card", "Replace one character, setting or ending card. Children retell the adapted version and name exactly what changed.", "Original event strip with one contrasting change card")
      ],
      mistakes: [
        ["A retell includes every tiny detail", "Limit the picture path to the main events needed for the story to make sense."],
        ["An adaptation can become an unrelated new story", "Keep two or more anchor features visible and change only one clear part first."],
        ["Pictures are sequenced by colour or appearance instead of events", "Ask what happened first, next and finally, then use story cause and time clues to reorder the images."]
      ],
      quick: [
        "What are the three main events in Tama's seed story?",
        "Which details stay the same when the flower becomes a bean vine?",
        "How could you show the middle event through a freeze-frame performance?",
        "Why is changing every character and event no longer a clear adaptation of the familiar text?"
      ],
      mastery: [
        "choose the main events rather than every small detail",
        "sequence story pictures by what happens first, next and finally",
        "retell the familiar text so a listener can follow it",
        "adapt one character, setting, event or ending through play, images or words",
        "explain what stayed the same and what changed"
      ],
      vocabulary: [
        { term: "retell", definition: "tell a text again using its important events" },
        { term: "sequence", definition: "the order in which events happen" },
        { term: "adapt", definition: "change part of a familiar text to make a new version" },
        { term: "character", definition: "a person, animal or imagined being in a literary text" },
        { term: "event", definition: "something that happens in a text" },
        { term: "beginning", definition: "the first part of a text or retell" },
        { term: "ending", definition: "the final part that finishes a text or retell" },
        { term: "performance", definition: "showing a text to others through voice, movement or acting" }
      ],
      elaborations: [
        elaboration("E1", "Retell through drawing and role-play", "Drawing and role-play can represent characters and main events from a familiar literary text.", "Connect each picture, prop or action to a named story event so performance supports retelling rather than free play alone.", ["Choose one main event.", "Draw it or make a freeze-frame pose.", "Say who is present and what is happening."], "Which story event are you showing, and what clue will help the audience recognise it?", "The learner represents a recognisable character and event and explains where it belongs in the story.", "Place the original event image beside the child's drawing or pose and match one feature at a time.", "A child crouches and pretends to water the seed, then says this is the middle event.", "The child uses a favourite costume or drawing that is not linked to any story event.", visual("One story event represented in a picture and a role-play pose.", "Different modes can show the same event.", ["Story event", "Drawing", "Role-play pose"])),
        elaboration("E2", "Sequence pictures to retell a story", "Ordered pictures can hold the main event sequence and support an oral, written or digitally recorded retell.", "Make children justify the event order before using a digital tool so dragging images does not replace story thinking.", ["Select the main-event images.", "Arrange them from beginning to ending.", "Retell each image in order and check the sequence."], "What happened before this picture, and what must happen after it?", "The learner orders the pictures from story evidence and gives a connected retell.", "Begin with the first and final event fixed, then decide where the remaining picture belongs.", "Planting comes before watering, and watering comes before the flower opens, so the pictures follow that order.", "The child orders pictures by size, colour or personal preference instead of story events.", visual("A three-picture digital or printed sequencing strip.", "Arrows show event order from first to finally.", ["1. Plant", "2. Water", "3. Flower opens"])),
      ]
    },

    AC9EFLY01: {
      subtitle: "Identify a familiar text and explain the job it is designed to do",
      learn: "I can identify a familiar text, say what it is for and use a cover, symbol or content clue to explain my choice.",
      routine: "Look for text clues → Name the text → Say its purpose → Explain the clue",
      model_title: "Worked example 1: use book-cover clues to identify purpose",
      model_html: `<p>Compare two covers: <em>The Wombat Who Lost a Sock</em> shows an illustrated character and an adventure title; <em>Wombat Facts</em> shows a labelled photograph and promises true information.</p>${visual(
        "Two book covers compared by clues and purpose. The illustrated adventure is a story for enjoyment. The labelled fact cover is an informative text for learning.",
        "A cover gives clues, but readers also check what the text contains.",
        ["Story cover → character + adventure → entertain", "Fact cover → photograph + labels → inform", "Check inside: events or facts?"]
      )}`,
      apply_title: "Worked example 2: identify the purpose of an everyday symbol",
      apply_html: `<p>A green EXIT sign shows a running figure, a doorway and an arrow.</p>${visual(
        "Exit sign purpose model. Recognise the symbol, notice the arrow toward a door and explain that the sign helps people find a way out.",
        "Everyday texts can communicate through symbols as well as words.",
        ["Clue: running figure", "Clue: arrow to doorway", "Purpose: show the way out"]
      )}<p>The same routine works for a story, fact page, recipe, sign or message: identify it, name its job and point to the clue.</p>`,
      materials: "paired story and information covers, familiar signs or symbols, purpose cards, and topic-sorting hoops",
      activities: [
        activity("Cover detective", "Children inspect paired covers, predict Story or Informative text, then open each text and check the prediction.", "Two cover frames with character-event and photograph-label clues"),
        activity("Purpose match", "Match a story, fact page, recipe and exit sign to entertain, inform, instruct or guide.", "Four text cards connected to four purpose cards"),
        activity("Same topic, different jobs", "Sort texts about farm animals by topic first, then compare the different purposes within that topic group.", "One Farm animals hoop containing a story, fact book and care instructions")
      ],
      mistakes: [
        ["All books have the same purpose", "Place a story and fact book side by side and use inside-text clues to name the different jobs."],
        ["Pictures always mean a text is imaginative", "Compare an illustrated story with a labelled information diagram and ask what each picture helps the text do."],
        ["Texts about the same topic must be the same type", "Keep the topic fixed, then sort by purpose: entertain, inform, instruct or guide."]
      ],
      quick: [
        "Which cover clue suggests that The Wombat Who Lost a Sock is a story?",
        "What job does the EXIT symbol do, and which feature shows that job?",
        "How can a farm-animal story and a farm-animal fact page share a topic but have different purposes?",
        "After predicting from a cover, what should you check inside the text?"
      ],
      mastery: [
        "name a familiar text such as a story, information page, sign or instruction",
        "state whether the text is made to entertain, inform, instruct or guide",
        "use a cover, symbol, word, image or layout clue to justify the purpose",
        "group texts by topic without assuming they all have the same purpose",
        "check an early cover prediction against the content inside the text"
      ],
      vocabulary: [
        { term: "text", definition: "something people make to communicate meaning through words, images, sounds or symbols" },
        { term: "purpose", definition: "the main job a text is designed to do" },
        { term: "story", definition: "a literary text with characters and events, often made to entertain" },
        { term: "informative text", definition: "a text made to teach facts or information about a topic" },
        { term: "symbol", definition: "a picture or mark that carries an agreed meaning" },
        { term: "cover", definition: "the front of a book, which can show its title and clues about its content" },
        { term: "topic", definition: "what a text is mainly about" },
        { term: "clue", definition: "a feature that helps a reader identify the text or its purpose" }
      ],
      elaborations: [
        elaboration("E1", "Explain why an everyday symbol is used", "Symbols in everyday places can guide, warn, identify or give a shared message quickly.", "Use familiar, current local symbols and connect each visible feature to its real purpose.", ["Name where the symbol appears.", "Describe its shapes, pictures or colours.", "Explain what people should know or do."], "What does this symbol help people know or do, and which feature gives the clue?", "The learner identifies a familiar symbol and explains its practical purpose using a visible feature.", "Act out the action the symbol requests, then return to the arrow or picture that signalled it.", "The EXIT figure and arrow guide people towards a way out.", "The child names a colour but cannot explain the message or purpose.", visual("Everyday symbol reasoning from visible feature to action and purpose.", "A symbol feature carries a practical message.", ["Notice feature", "Understand message", "Know what to do"])),
        elaboration("E2", "Group imaginative and informative books by cover clues", "Covers can suggest whether a book is an imaginative story or an informative text, and the inside content confirms the choice.", "Model tentative prediction language first, then verify with events, characters, facts or labels inside.", ["Inspect the title and cover image.", "Predict Story or Informative.", "Open the book and confirm with content evidence."], "What does the cover make you predict, and what inside the book confirms it?", "The learner groups the text appropriately and cites both a cover clue and a confirming content clue.", "Offer one story cover and one fact cover with strongly contrasting clues, then check one inside page together.", "An illustrated adventure title predicts a story; connected character events inside confirm it.", "The child treats the cover guess as certain and does not check the text itself.", visual("Cover prediction checked against inside-text evidence.", "Predict first, then confirm.", ["Cover clue", "Story or Informative prediction", "Inside evidence"])),
        elaboration("E3", "Group texts by a shared topic", "Imaginative and informative texts can be grouped together because they share a topic even when their types and purposes differ.", "Separate the questions What is it about? and What is it for? so children do not confuse topic with purpose.", ["Name each text's topic.", "Place texts with the same topic together.", "Compare the purpose of texts inside the group."], "Which texts belong in the farm-animal group, and what different jobs do they do?", "The learner groups by shared topic and then distinguishes at least two purposes within the group.", "Use a large topic picture in the centre and ask whether each cover belongs near it before discussing purpose.", "A farm adventure and a farm fact book share the topic farm animals; one entertains and one informs.", "The child removes the story because it is not informative, even though it shares the topic.", visual("One topic group containing texts with different purposes.", "Topic answers what it is about; purpose answers why it was made.", ["Shared topic: farm animals", "Story → entertain", "Fact page → inform"]))
      ]
    }
  };

  for (const [code, overlay] of Object.entries(overlays)) {
    if (!data[code]) continue;
    if (!data[code].preservedLegacyTopicMaterial) {
      data[code].preservedLegacyTopicMaterial = {
        learn: data[code].learn,
        model_title: data[code].model_title,
        model_html: data[code].model_html,
        apply_title: data[code].apply_title,
        apply_html: data[code].apply_html,
        activities: clone(data[code].activities),
        mistakes: clone(data[code].mistakes),
        quick: clone(data[code].quick),
        mastery: clone(data[code].mastery)
      };
    }
    Object.assign(data[code], overlay);
  }

  const quickAnswers = {
    AC9EFLE01: [
      "For example, my family also eats together outside, so that experience is similar to mine.",
      "Similar fits when both experiences share a clear feature; different fits when the named details do not match.",
      "Two readers can connect the same event with different life experiences, provided each response uses an exact text clue.",
      "Say, In this text, the character or family does this, rather than claiming that every person in a culture does it."
    ],
    AC9EFLE02: [
      "For example, I feel worried because Niko cannot find the boot while rain is falling.",
      "The character gives the last piece of fruit to a hungry friend, which shows a caring action.",
      "The reader's feeling is the reader's response to the story, while the character's feeling belongs to the person in the story.",
      "The drawing should clearly show the chosen character action or event, such as the returned boot."
    ],
    AC9EFLE03: [
      "Mina is the character, and finding, listening to or returning the shell is an event.",
      "The bird waking begins the poem's story, and the bird reaching the tree ends it.",
      "A fairytale has story evidence such as characters, connected events or magic; a sign gives a practical message.",
      "A poem can name a character and arrange events from a beginning to an ending while also using lines and rhythm."
    ],
    AC9EFLE04: [
      "The spoken endings of three and me match, so the two words rhyme.",
      "Tap one steady movement for each beat while the whole chant line is spoken.",
      "The next action is the one shown by the repeated chant pattern after the two hop claps.",
      "Say blue and you aloud and listen: their spoken endings match, so they rhyme."
    ],
    AC9EFLE05: [
      "Tama plants the seed, waters it and then sees the flower open.",
      "The planting and watering sequence can stay while the final plant changes from a flower to a bean vine.",
      "Freeze in a watering pose with the seed or pot visible so the audience can recognise the middle event.",
      "An adaptation keeps recognisable parts of the familiar text; changing every character and event creates a different text."
    ],
    AC9EFLY01: [
      "The illustrated wombat character and adventure-style title suggest a story made to entertain.",
      "The EXIT symbol guides people towards a way out; its running figure, doorway and arrow show that job.",
      "Both texts share the farm-animal topic, but the story entertains with characters and events while the fact page informs with facts.",
      "Check the words, images and content inside for character events or for facts and explanations that confirm the purpose."
    ]
  };
  for (const [code, answers] of Object.entries(quickAnswers)) data[code].quickAnswers = answers;
})();
