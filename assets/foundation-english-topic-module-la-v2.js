(() => {
  "use strict";

  const data = window.SkillrFoundationEnglishData || {};
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"
  })[char]);
  const visualModel = (label, items, caption = "Read the cards from left to right.") => `<figure class="foundation-english-concept-model" role="img" aria-label="${esc(label)}"><div class="english-card-row">${items.map((item) => `<span>${esc(item)}</span>`).join("")}</div><figcaption>${esc(caption)}</figcaption></figure>`;
  const elaboration = (label, title, idea, teach, steps, say, check, fix, worked, mistake, visual) => ({
    label, title, idea, teach, steps, say, check, fix, worked, mistake, visual,
    studentDoes: `Complete the modelled response and use the example to show: ${String(check).replace(/^The learner\s+/i, "")}`
  });

  const overlays = {
    AC9EFLA01: {
      title: "Words That Fit Who We Are Talking To",
      subtitle: "Notice the relationship, place and purpose before choosing words",
      learn: "I can notice who I am talking with, where we are and why I am speaking, then choose words that fit. Families and communities may use different words. More than one choice can be kind, clear and correct for its setting.",
      routine: "Notice the place → Notice the person → Think about the purpose → Choose respectful words",
      model_title: "Choose words for the person and place",
      model_html: visualModel(
        "A three-step language choice model. In a classroom, a child needs help, notices they are speaking with a teacher, and asks, May I please have help?",
        ["Place: classroom", "Person: teacher", "Words: May I please have help?"]
      ),
      apply_title: "Change the words when the relationship changes",
      apply_html: visualModel(
        "The same play purpose expressed in two relationships. A child asks a friend, Want to build with me? and asks a visiting adult, Would you like to see our building?",
        ["Friend: Want to build with me?", "Visiting adult: Would you like to see our building?", "Same purpose • different relationship"]
      ),
      vocabulary: [
        { term: "relationship", definition: "how people are connected, such as friends, family members or teacher and student" },
        { term: "context", definition: "the place, people and situation around the talk" },
        { term: "purpose", definition: "the reason we are speaking, such as asking, greeting or inviting" },
        { term: "respectful", definition: "showing care for the other person through words, voice and listening" },
        { term: "choice", definition: "one possible way to say something" }
      ],
      activities: [
        { title: "Who and where?", text: "Show a home, playground or classroom card. Students name who they might speak with there.", visual: "place card + person card" },
        { title: "Try two ways", text: "Give one purpose, such as asking to join. Students say words for a friend and words for an unfamiliar adult.", visual: "same purpose → two respectful choices" },
        { title: "Explain the fit", text: "Students choose one phrase and finish the frame: These words fit because.", visual: "person + place + purpose" }
      ],
      mistakes: [
        ["School words are always better than home words", "Explain that different families and communities use different language; check whether the words are kind, clear and suited to the relationship."],
        ["One sentence should be used with every person", "Keep the purpose the same, change the person card, and rehearse another respectful way to say it."],
        ["Respectful speaking means using a tiny voice", "Model that respect comes from suitable words, voice and listening; use a volume the listener can hear comfortably."]
      ],
      quick: [
        "You need help in class. What could you say to your teacher, and why do those words fit?",
        "How might an invitation sound different for a close friend and a visiting adult?",
        "Are home words wrong because they sound different from school words? Explain.",
        "Point to the place, person and purpose clues before choosing a phrase."
      ],
      quickAnswers: [
        "You could say, “May I please have help?” because a student is respectfully asking a teacher for help in class.",
        "You might say, “Want to build with me?” to a close friend and “Would you like to see our building?” to a visiting adult.",
        "No; families and schools may use different suitable words, and the speaker checks whether the message is kind, clear and right for the relationship.",
        "Name where the talk happens, who is listening and why you are speaking, then choose words that fit those three clues."
      ],
      mastery: [
        "notice the place, person and purpose",
        "choose words that suit a relationship",
        "use a respectful voice and listen",
        "explain why a language choice fits",
        "try another suitable way to say the same message"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Ask, request and share an opinion in a fitting way",
          "A useful question, request or opinion matches what is happening and gives the listener enough information to respond.",
          "Use one familiar classroom event and model the difference between asking for information, requesting an action and sharing an opinion.",
          ["Notice what is happening and what you need to communicate.", "Choose a question, request or opinion frame.", "Say it clearly, then listen for the response."],
          "You cannot find the paint pots. What relevant question could you ask in this classroom?",
          "The learner gives a clear message that fits the classroom event and can name whether it is a question, request or opinion.",
          "Offer three oral models: Where is the item? May I use the item? I think this choice fits because it is clear; let the learner adapt one.",
          "The child asks, “Where are the paint pots, please?” because the class is ready to paint and the location is the missing information.",
          "The child asks an unrelated question or gives a command such as “Get the paint,” so the listener cannot easily tell what information or help is needed.",
          visualModel(
            "Three language choices for one classroom context: Where are the paint pots is a question, May I use the blue paint is a request, and I think the large brush will work is an opinion.",
            ["Question: Where are the paint pots?", "Request: May I use the blue paint?", "Opinion: I think the large brush will work."],
            "Each message has a different purpose and fits the same painting context."
          )
        ),
        elaboration(
          "E2",
          "Choose language for the relationship",
          "People may express the same purpose in different respectful ways because their relationships and shared experiences are different.",
          "Keep the purpose fixed, change the relationship card and rehearse language that is natural, kind and clear for that pair without treating one community's way as better.",
          ["Name the two people and how they are connected.", "Keep the purpose the same.", "Try words, voice and listening that suit this relationship."],
          "You want to see an item. How might you ask a sibling or friend, and how might you ask a shopkeeper?",
          "The learner changes at least one language feature for the relationship and explains that both versions can be respectful in their settings.",
          "Role-play with two labelled puppets and model a complete response, such as: With my friend I could say, Can I see your new card?",
          "A child says to a friend, “Can I see your new card?” and to a shopkeeper, “Excuse me, may I please see that book?”; the purpose stays the same while the relationship changes.",
          "The child labels home language as wrong or assumes every adult and child must use exactly the same wording.",
          visualModel(
            "The same purpose shown across two relationships: asking a friend to see a card and asking a shopkeeper to see a book.",
            ["Purpose: ask to see something", "Friend: Can I see your new card?", "Shopkeeper: Excuse me, may I please see that book?"],
            "Relationship clues help a speaker select one of several respectful choices."
          )
        )
      ]
    },

    AC9EFLA02: {
      title: "Sharing Likes, Dislikes and Preferences",
      subtitle: "State a choice clearly, add a reason and listen to other views",
      learn: "I can tell what I like, do not like or prefer, and I can give a simple reason. A preference is a personal choice, not a fact everyone must share. We can disagree and still respond kindly.",
      routine: "Name the choices → State the preference → Add because → Listen and respond kindly",
      model_title: "Build a preference with a reason",
      model_html: visualModel(
        "A preference sentence built in three parts: two fruit choices, I prefer pear, and because it is juicy.",
        ["Choices: apple or pear", "Preference: I prefer pear", "Reason: because it is juicy"]
      ),
      apply_title: "Compare two different preferences respectfully",
      apply_html: visualModel(
        "Two children choose different playground activities and both give reasons. One prefers swings because they feel like flying; one prefers the sandpit because they like building.",
        ["Ari: I prefer swings because they feel like flying.", "Mia: I prefer the sandpit because I like building.", "Different choices can both be valid."]
      ),
      vocabulary: [
        { term: "preference", definition: "the choice someone likes more" },
        { term: "like", definition: "to enjoy or feel good about something" },
        { term: "dislike", definition: "to not enjoy something" },
        { term: "reason", definition: "words that explain why you think or choose something" },
        { term: "because", definition: "a word that introduces a reason" }
      ],
      activities: [
        { title: "Choose and tell", text: "Offer two familiar picture choices. Students point, then complete the oral frame I prefer this one because.", visual: "two picture choices → one preference" },
        { title: "Add the reason", text: "Students extend the preference with because and one true reason.", visual: "I prefer drawing because I like making pictures." },
        { title: "Kind disagreement", text: "Partners share different choices and reply with a complete comparison, such as: You like running; I prefer skipping.", visual: "listen → name both choices → respond" }
      ],
      mistakes: [
        ["A preference is a fact", "Place two different valid choices side by side and explain that people can prefer different things."],
        ["Saying one word gives a clear reason", "Recast the response as a complete sentence, such as: I prefer drawing because I like making pictures."],
        ["Disagreeing means the other choice is bad", "Model both views kindly without judging either person: You prefer running; I prefer skipping."]
      ],
      quick: [
        "Choose drawing or building and state your preference with because.",
        "Which part of ‘I prefer mango because it is sweet’ gives the reason?",
        "Two classmates prefer different games. Can both preferences be valid? Why?",
        "Turn ‘Blue!’ into a clear preference sentence with a reason."
      ],
      quickAnswers: [
        "I prefer drawing because I enjoy making colourful pictures.",
        "The words “because it is sweet” give the reason.",
        "Yes; a preference is a personal choice, so both classmates can prefer different games.",
        "I prefer blue because it reminds me of the sea."
      ],
      mastery: [
        "name a like, dislike or preference",
        "use because to give a reason",
        "tell a preference from a fact",
        "listen to a different preference respectfully",
        "use more than one clear preference frame"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Notice preferences in speech and gesture",
          "A person can communicate a feeling or preference through spoken words, tone, face and body movement, and these clues are clearest when considered together.",
          "Model one spoken preference with an agreeing gesture, then change the gesture or tone and discuss how the message becomes less clear; do not guess a feeling from one body clue alone.",
          ["Listen to the words.", "Notice the voice, face or gesture.", "Combine the clues and check by asking the speaker."],
          "Sam says, “I would like the apple,” and points to it with a smile. Which clues show the preference?",
          "The learner names a speech clue and a gesture or expression clue, then states the likely preference without treating the body clue as certain proof.",
          "Replay the message in two parts: hear the words with eyes closed, then view the gesture without words before combining both.",
          "Sam's words name the apple, and the pointing gesture shows which item is meant; together the clues communicate the choice clearly.",
          "The child uses only a smile to decide exactly what Sam wants, even though a smile can have many meanings.",
          visualModel(
            "A preference message combines spoken words with a pointing gesture: I would like the apple, a hand points to the apple, and the listener checks the combined message.",
            ["Speech: I would like the apple.", "Gesture: points to the apple", "Together: a clear preference"],
            "Words and gesture can support one another."
          )
        ),
        elaboration(
          "E2",
          "Read feelings in visual and media texts",
          "Creators use visible and audible choices such as facial expression, movement, colour, framing, music and voice to suggest feelings in advertisements and animations.",
          "Pause a short, age-appropriate frame and separate what is directly observable from the feeling viewers infer; explain that media choices can also try to persuade an audience.",
          ["Name one thing you can see or hear.", "Say which feeling it may suggest.", "Explain how that choice guides the viewer."],
          "An animated character jumps, grins and speaks quickly beside a new toy. What feeling is suggested, and what evidence supports your idea?",
          "The learner names a plausible feeling and supports it with at least one observable media clue.",
          "Offer a complete evidence model, such as: I notice a grin and lively movement; this may show excitement.",
          "The jumping, grin and lively voice may suggest excitement, and placing the character beside the toy can encourage viewers to see the toy positively.",
          "The child says the character is definitely happy because the background is yellow, without checking any other visible or sound clue.",
          visualModel(
            "An animation evidence path: a character jumps and grins, lively music plays, and viewers infer possible excitement.",
            ["See: jump + grin", "Hear: lively music", "Infer: the character may feel excited"],
            "Media clues suggest a feeling; evidence explains the interpretation."
          )
        )
      ]
    },

    AC9EFLA03: {
      title: "Texts Come in Many Forms",
      subtitle: "Recognise signs, books, labels, messages and digital texts by what they communicate",
      learn: "I can recognise that a text is something people make to communicate a message. Texts can be printed, spoken, visual or digital. Their form helps the message reach its audience and purpose.",
      routine: "Look or listen → Name the text form → Find the message → Explain its purpose",
      model_title: "Connect each text form to its job",
      model_html: visualModel(
        "Three text forms and their jobs: a stop sign gives a safety message, a picture book tells a story, and a weather page shares information.",
        ["STOP sign → safety message", "Picture book → story", "Weather page → information"]
      ),
      apply_title: "Follow one message across different forms",
      apply_html: visualModel(
        "The message Library closed today shown in three forms: a printed door sign, a spoken announcement and a message on a library screen.",
        ["Door sign: Library closed today", "Spoken announcement: The library is closed today", "Screen message: Closed today"]
      ),
      vocabulary: [
        { term: "text", definition: "something made to communicate a message" },
        { term: "form", definition: "the kind or shape a text takes, such as a sign, book or screen page" },
        { term: "message", definition: "the idea or information being communicated" },
        { term: "purpose", definition: "the job a text is made to do" },
        { term: "audience", definition: "the people a text is made for" }
      ],
      activities: [
        { title: "Text hunt", text: "Find three classroom texts, such as a label, book and screen notice. Name each form.", visual: "label • book • screen notice" },
        { title: "Message match", text: "Match each found text to the message it communicates.", visual: "text form → message" },
        { title: "Change the form", text: "Turn a spoken pack-away reminder into a small sign or picture message.", visual: "spoken reminder → visual sign" }
      ],
      mistakes: [
        ["Only books are texts", "Compare a book, sign and digital message and identify the message communicated by each one."],
        ["Any object is automatically a text", "Ask whether someone made or used the object to communicate a message; a plain object and a labelled object are different."],
        ["Text form and purpose mean the same thing", "Name the form first, such as sign, then name its job, such as warning or informing."]
      ],
      quick: [
        "A door card says ‘Quiet, baby sleeping’. What is the text form and what is its message?",
        "How could a teacher share the same excursion reminder as print, speech and a digital message?",
        "Is a plain lunchbox a text? What could make it communicate a message?",
        "Name the form, message and purpose of one classroom text."
      ],
      quickAnswers: [
        "It is a door sign, and its message asks people to be quiet because a baby is sleeping.",
        "The teacher could use a printed note, a spoken announcement and a digital class message with the same excursion information.",
        "A plain lunchbox is not automatically a text; a name label or picture message could make it communicate.",
        "A classroom shelf label is a label whose message names what belongs there so people can find and return materials."
      ],
      mastery: [
        "recognise several forms of text",
        "find the message a text communicates",
        "explain a familiar text purpose",
        "tell text form from text purpose",
        "represent one message in another text form"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Compare images in informative and imaginative texts",
          "Images in informative and imaginative texts can show the same subject, but they may do different jobs: one may explain real features while another helps invent a story world.",
          "Place two attributed, age-appropriate images of the same subject side by side and ask learners to name one visible similarity and one visible difference before identifying each text's likely purpose.",
          ["Name what both images show.", "Find one feature that is the same.", "Find one difference and connect it to information or imagination."],
          "A labelled whale diagram and a story picture of a whale flying above a town both show a whale. What is one similarity and one difference?",
          "The learner gives an observable similarity and difference, then links the diagram to explaining or the story image to imagining.",
          "Use two hoops labelled Same and Different and place one picture clue in each before discussing purpose.",
          "Both images show a whale with fins; the diagram labels real body parts, while the story image shows an imagined flying event.",
          "The child calls every realistic-looking image informative without checking the surrounding text or its purpose.",
          visualModel(
            "Two whale images compared: an informative diagram labels a fin and tail, while an imaginative picture shows a whale flying above a town.",
            ["Both: whale + fins", "Informative: labelled body parts", "Imaginative: flying story event"],
            "Compare what is shown and the job the image does."
          )
        ),
        elaboration(
          "E2",
          "Compare a sign with a set of instructions",
          "The same topic can be presented in different text forms because a quick sign and a step-by-step instruction text serve different reading needs.",
          "Use a handwashing sign and a handwashing instruction strip; model how the sign gives a fast reminder while the instructions order several actions.",
          ["Name the information both texts share.", "Notice how each form organises it.", "Explain when each form would be useful."],
          "What does a one-picture Wash hands sign do quickly, and what do numbered handwashing instructions add?",
          "The learner identifies the shared handwashing message and explains that the instructions add an ordered process.",
          "Act out the sign as one reminder, then walk through the numbered cards one at a time.",
          "The sign quickly reminds people to wash; the instructions add wet, soap, scrub, rinse and dry in a useful order.",
          "The child says the sign and instructions are the same because both mention hands, missing the difference in organisation and detail.",
          visualModel(
            "One handwashing message shown in two forms: a simple sign gives a quick reminder, while five numbered cards show the washing sequence.",
            ["Sign: Wash hands", "Instructions: 1 wet • 2 soap • 3 scrub • 4 rinse • 5 dry", "Same topic • different form"],
            "Text form changes how much information is available and how it is followed."
          )
        ),
        elaboration(
          "E3",
          "Find text forms at school, home and in the community",
          "Signs, labels and directions are texts when people use them to communicate a message in a place.",
          "Conduct a supervised text hunt with photographs or safe examples, asking learners to name the form, locate its message and connect it to the place where it is useful.",
          ["Notice a made message in the place.", "Name its form, such as sign, label or direction.", "Explain what it helps people know or do."],
          "A red pedestrian symbol stands near a crossing, a name label is on a lunchbox and arrows point to the library. What message does each text communicate?",
          "The learner identifies at least two forms and explains a place-specific message for each.",
          "Use a three-column mat labelled Place, Text form and Message, and sort one example together.",
          "At the crossing, the sign guides safe movement; on the lunchbox, the label identifies its owner; in the school, the arrows give directions.",
          "The child names the physical object but cannot explain the intended message, such as saying only red circle instead of crossing guidance.",
          visualModel(
            "A text hunt across three settings: a school direction arrow points to the library, a home product label names cereal, and a community crossing sign guides pedestrians.",
            ["School: direction → find the library", "Home: label → identify the product", "Community: sign → move safely"],
            "A form becomes meaningful when its message and setting are connected."
          )
        ),
        elaboration(
          "E4",
          "Listen to and view an attributed First Nations story",
          "Many First Nations Australian stories and cultural accounts are shared through oral narration and may also use authorised images; oral and visual forms carry meaning and are not incomplete versions of a written book.",
          "Select an authentic, attributed, school-approved resource, name its creator or community, follow cultural permissions and discuss only the story features the source makes available.",
          ["Name the storyteller, creator or approved source.", "Listen for meaning in the oral narration.", "Notice how authorised images add to or support that meaning."],
          "In this named, approved story, what do you learn from listening, and what does one authorised image help you notice?",
          "The learner refers to the selected source, distinguishes an oral clue from a visual clue and avoids treating one story as a rule for all First Nations cultures.",
          "Replay one permitted short section, pause at one approved image and use the frames I heard this clue and I noticed this image clue.",
          "The listener hears a repeated place name in the narration and notices the same place represented in an approved image, then explains how the two forms connect in this story.",
          "The child assumes a story is less complete because it is spoken, or makes a claim about every First Nations Australian story from one source.",
          visualModel(
            "A respectful source pathway for one attributed First Nations Australian story: name the creator or community, listen to the oral narration, view an authorised image and connect only the evidence in this source.",
            ["Named and approved source", "Listen: oral narration", "View: authorised image", "Connect meaning in this story"],
            "Use the permissions and context supplied with the selected resource."
          )
        )
      ]
    },

    AC9EFLA04: {
      title: "How Books and Screens Are Organised",
      subtitle: "Use covers, titles, pages, icons and buttons to find a way through a text",
      learn: "I can use the organisation clues in a book or a simple screen text. A cover and title help me identify a book; pages and reading direction guide me through it. On a screen, titles, icons and buttons can show where to start and what to do next.",
      routine: "Identify the text → Find the starting point → Follow the reading path → Use a navigation feature",
      model_title: "Trace the reading path through a book",
      model_html: visualModel(
        "A book navigation sequence: first view the front cover and title, then open the first page, then read English print from left to right and top to bottom, then turn the page.",
        ["1. Front cover + title", "2. First page: start at top left", "3. Read across, then turn page"]
      ),
      apply_title: "Use screen clues to choose the next action",
      apply_html: visualModel(
        "A simple animal screen has a title at the top, a speaker icon that reads words aloud and a Next button that moves to the following page.",
        ["Title: Australian Animals", "Speaker icon → hear the words", "Next button → move on"]
      ),
      vocabulary: [
        { term: "convention", definition: "a usual way a text is organised so readers know what to do" },
        { term: "cover", definition: "the outside front of a book" },
        { term: "title", definition: "the name of a text" },
        { term: "navigation", definition: "using text features to move to the part you need" },
        { term: "icon", definition: "a small picture or symbol that shows an action or idea" }
      ],
      activities: [
        { title: "Book walk", text: "Students point to the cover, title, first page and next-page direction on a familiar book.", visual: "cover → title → first page → next page" },
        { title: "Screen tour", text: "On a teacher-controlled page, students locate the title, speaker icon and Next button without pressing yet.", visual: "title • speaker icon • Next button" },
        { title: "Tell the path", text: "Students give a partner the steps for beginning and moving through one text.", visual: "start point → reading path → navigation" }
      ],
      mistakes: [
        ["Start reading at any place on the page", "Point to the agreed starting point and trace the reading direction with a finger."],
        ["Every picture on a screen is a button", "Compare a display picture with a clearly labelled button or icon and test only with teacher guidance."],
        ["Books and screens are organised in exactly the same way", "Place them side by side and name one shared clue, such as a title, and one different clue, such as page turn or Next button."]
      ],
      quick: [
        "Show where you would begin reading this English picture-book page and trace the path.",
        "What might a speaker icon do, and what clue supports your answer?",
        "Name one organisation clue shared by a book and a screen text.",
        "Explain the difference between turning a page and selecting Next."
      ],
      quickAnswers: [
        "Begin at the top-left word, move left to right across the line, then return left and move down to the next line.",
        "A speaker icon may read the words aloud because its picture represents sound.",
        "A title can name and identify both a book and a screen text.",
        "Turning a page moves through a physical book, while selecting Next navigates to another part of a digital text."
      ],
      mastery: [
        "identify a cover and title",
        "find the starting point in a familiar text",
        "follow the expected English reading direction",
        "use an icon or button for navigation",
        "compare one book feature with one screen feature"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Trace the reading direction in Standard Australian English",
          "Standard Australian English print is usually followed from left to right across a line and from the top line down to the next line.",
          "Model the convention with a finger, pointer or moving dot while acknowledging that readers may know other languages and writing systems with different directions.",
          ["Find the first word at the top left.", "Sweep from left to right across the line.", "Return to the left of the next line and move down the page."],
          "Where does this English sentence begin, and where will your finger move next?",
          "The learner locates the first word and traces left to right, then returns to the start of the next line below.",
          "Place a green start dot and a curved return arrow on a two-line text, then let the learner trace over them.",
          "On “Birds can fly. / Fish can swim.” the finger begins at Birds, moves to fly, then returns left and moves down to Fish.",
          "The child moves down through individual words in a column or treats the right edge as the starting point for this English text.",
          visualModel(
            "A two-line Standard Australian English reading path begins at the top left, moves right across line one, curves back to the left and moves right across line two.",
            ["Start: Birds", "Move right: can → fly.", "Return left and down", "Move right: Fish → can → swim."],
            "The arrows show the usual path through this English print."
          )
        ),
        elaboration(
          "E2",
          "Use tabs in a simple digital text",
          "A tab is a labelled part of a screen that helps a reader move directly to a section of a digital text.",
          "Use a teacher-controlled mock screen with three clear tabs and predict where each tab will lead before selecting it.",
          ["Find the row of labelled tabs.", "Read or hear the tab labels.", "Choose the label that matches the information you need."],
          "You want to see what wombats eat. Which tab would you choose: Home, Food or Homes?",
          "The learner selects Food and explains that the label matches the needed information.",
          "Pair each tab with a picture clue and rehearse a complete question, such as: I need food facts; which label matches?",
          "Selecting the Food tab opens the section about grass and roots without moving through every other page first.",
          "The child selects any colourful shape because they assume every picture is a tab.",
          visualModel(
            "A simple wombat webpage has three labelled tabs across the top: Home, Food and Homes; the Food tab is selected to find what wombats eat.",
            ["Tab: Home", "Tab: Food ← choose", "Tab: Homes", "Result: grass and roots"],
            "The tab label predicts the section it opens."
          )
        ),
        elaboration(
          "E3",
          "Notice where images and words are placed",
          "The placement of words near, above, below or inside an image helps a reader connect the right words with the right picture.",
          "Compare a caption below a photograph, a label beside a diagram part and a speech bubble near a character; trace the visual connection in each layout.",
          ["Find the words.", "Find the nearby image or image part.", "Explain how the placement helps connect them."],
          "A label reading wing sits beside an arrow pointing to a bird's wing. How does the placement help?",
          "The learner follows the spatial clue or arrow and states which words belong with which image or part.",
          "Move a loose word card beside the matching picture, then add a yarn line or finger trace between them.",
          "The word wing and its arrow are placed beside the bird's wing, so the reader can match the label to the correct body part.",
          "The child matches the nearest words to an image without noticing an arrow or boundary that points elsewhere.",
          visualModel(
            "Three page layouts show how placement connects words and images: a caption sits below a frog photograph, a wing label points to a bird wing and a speech bubble sits beside its speaker.",
            ["Photo", "Caption below: Green tree frog", "Label beside arrow: wing", "Speech bubble beside character"],
            "Position, arrows and boundaries help readers connect each element."
          )
        ),
        elaboration(
          "E4",
          "Find a book title and reading start",
          "A book's title names the text, while the first readable page and the top-left starting point show where its English print begins.",
          "Conduct a book walk that separates the front-cover title from the first story or information words inside the book.",
          ["Point to the front cover.", "Locate and name the title.", "Open the book and point to where reading begins."],
          "Show the title of this book, then open it and point to the first word you would read.",
          "The learner identifies the title and a plausible first reading point rather than pointing only to the cover picture.",
          "Add removable Title and Start here arrows, model once, then move the arrows to a new familiar book.",
          "The child points to “Busy Bees” on the cover as the title, opens to the first page and points to the top-left word Bees as the reading start.",
          "The child calls the largest cover picture the title or starts reading from a random word inside the page.",
          visualModel(
            "A book walk separates a front cover title from the first reading point inside: Busy Bees appears on the cover, then a Start here arrow points to Bees on the first page.",
            ["Front cover", "Title: Busy Bees", "Open to first page", "Start here: top-left word"],
            "The title identifies the book; the start point begins the text."
          )
        )
      ]
    },

    AC9EFLA05: {
      title: "A Sentence Shares One Idea",
      subtitle: "Listen for a whole thought and show where the sentence begins and ends",
      learn: "I can recognise a sentence as a group of words that communicates one whole idea. The words need to work together so a listener or reader can understand the thought. In writing, a capital and an ending mark help show the sentence boundary.",
      routine: "Read or hear the words → Ask what the whole idea is → Check that it makes sense → Mark the boundary",
      model_title: "Test whether the words make one whole idea",
      model_html: visualModel(
        "A sentence sense check. The words The frog jumps communicate who and what happens, so they make a whole idea. The words The green frog do not yet tell the whole idea. The words Jumps under are not arranged to make sense.",
        ["The frog jumps. → whole idea", "The green frog → needs more", "Jumps under → does not make sense"]
      ),
      apply_title: "Complete an unfinished idea",
      apply_html: visualModel(
        "The unfinished words My red kite become the complete sentence My red kite flew high, followed by a full stop.",
        ["Start: My red kite (not complete)", "Add what happens: flew high", "Whole sentence: My red kite flew high."]
      ),
      vocabulary: [
        { term: "sentence", definition: "words arranged to communicate a whole idea" },
        { term: "idea", definition: "a thought or message someone can understand" },
        { term: "sense", definition: "meaning that can be understood" },
        { term: "boundary", definition: "where a sentence begins or ends" },
        { term: "complete", definition: "having all the words needed for the intended idea" }
      ],
      activities: [
        { title: "Sentence or not yet?", text: "Say one complete sentence and one unfinished group. Students signal whole idea or not yet.", visual: "whole idea ✓ • not yet" },
        { title: "Finish the thought", text: "Give an unfinished beginning such as The tiny ant and invite students to complete the idea orally.", visual: "The tiny ant (not complete) → add an action or state" },
        { title: "Boundary walk", text: "Place word cards on the floor. Students stand at the beginning and ending of the complete sentence.", visual: "beginning capital; words with meaning; ending mark" }
      ],
      mistakes: [
        ["Any group of words is a sentence", "Say the words aloud and ask what whole idea they communicate; add or rearrange words if the thought is unclear."],
        ["A long group is more complete than a short group", "Compare a short complete sentence, such as Birds fly, with a longer unfinished group and check meaning rather than length."],
        ["An ending mark can fix words that do not make sense", "Repair the word meaning and order first, then add the sentence boundary marks."]
      ],
      quick: [
        "Do the words ‘The sleepy koala’ communicate a whole idea yet? Explain.",
        "Complete the words ‘Our class’ so the listener understands one idea.",
        "Why is ‘Birds fly.’ a sentence even though it is short?",
        "Repair ‘blue under runs’ so it communicates a clear idea."
      ],
      quickAnswers: [
        "Not yet; the words name a sleepy koala but do not tell a complete intended idea about it.",
        "Our class sings together.",
        "“Birds fly.” is a sentence because it names who and tells what they do, making one complete idea.",
        "The blue dog runs under the table."
      ],
      mastery: [
        "recognise a sentence that communicates a whole idea",
        "tell a complete idea from an unfinished group",
        "complete an oral sentence meaningfully",
        "check whether word order makes sense",
        "show a written sentence boundary"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Change word order and change the meaning",
          "Word order matters because rearranging the same words can change who does an action, who receives it or whether the sentence makes sense.",
          "Use moveable word and picture cards so learners can act out two grammatical orders and compare the different events they communicate.",
          ["Read or hear the first sentence in order.", "Act out or picture its meaning.", "Reorder the words, read again and compare what changed."],
          "How are “The dog chased the boy” and “The boy chased the dog” different?",
          "The learner explains that the first named participant performs the chasing in each sentence and that changing order changes the event.",
          "Give each participant a coloured card and move the cards physically as the sentence order changes.",
          "In “The dog chased the boy,” the dog chases; after dog and boy swap positions, the boy becomes the one who chases.",
          "The child says the sentences mean the same because they contain the same words.",
          visualModel(
            "Two sentences use the same words in different orders: first a dog chases a boy, then a boy chases a dog; arrows point from the named chaser to the one being chased.",
            ["The dog → chased → the boy.", "Swap dog and boy", "The boy → chased → the dog.", "New order • new event"],
            "Order shows who is doing the action."
          )
        ),
        elaboration(
          "E2",
          "Tell a sentence fragment from a complete sentence",
          "A sentence communicates a complete intended idea, while a fragment such as after school gives only one piece and leaves the listener waiting for more.",
          "Say a fragment and a complete sentence aloud, use a not-yet gesture for the fragment and ask what information must be added to complete the thought.",
          ["Listen to all the words.", "Ask whether they communicate the whole intended idea.", "Add the missing who, what happens or other needed meaning."],
          "Do the words “after school” tell a whole idea? How can you complete them?",
          "The learner identifies the fragment and expands it into a meaningful sentence such as “Dad will pick me up after school.”",
          "Use two oral frames: Who will do something after school? and What will happen after school?",
          "“After school” tells when but not the whole event; “Dad will pick me up after school” tells who, what happens and when.",
          "The child adds a full stop to “After school.” and assumes the punctuation alone makes the intended idea complete.",
          visualModel(
            "A fragment-to-sentence bridge begins with after school, adds Dad will pick me up, and ends with the complete idea Dad will pick me up after school.",
            ["Fragment: after school", "Ask: what will happen?", "Add: Dad will pick me up", "Sentence: Dad will pick me up after school."],
            "Add the missing meaning before marking the sentence end."
          )
        )
      ]
    },

    AC9EFLA06: {
      title: "Word Groups Work Together in Sentences",
      subtitle: "Notice groups that name who or what and groups that add action or detail",
      learn: "I can hear and see groups of words working together inside a sentence. One group might name who or what the sentence is about; another might tell what happens, what something is like or where it is. We group words by meaning, not by cutting the sentence anywhere.",
      routine: "Say the sentence → Find the who-or-what group → Find the action-or-detail group → Join the meanings",
      model_title: "Build meaning from two word groups",
      model_html: visualModel(
        "The sentence The little dog ran to the gate is grouped by meaning. The little dog names who the sentence is about. Ran to the gate tells what happened.",
        ["The little dog → who", "ran to the gate → what happened", "Together → The little dog ran to the gate."]
      ),
      apply_title: "Change one group and notice the new meaning",
      apply_html: visualModel(
        "The who group My red hat stays the same while the detail group changes from is on the hook to is under the chair, changing the location in the sentence.",
        ["Who group: My red hat; detail group: is on the hook.", "Who group: My red hat; detail group: is under the chair.", "Changed group → changed location"]
      ),
      vocabulary: [
        { term: "word group", definition: "words that belong together to add one part of a sentence's meaning" },
        { term: "sentence", definition: "words arranged to communicate a whole idea" },
        { term: "meaning", definition: "the idea the words communicate" },
        { term: "action", definition: "what someone or something does" },
        { term: "detail", definition: "extra information about who, what, where or how" }
      ],
      activities: [
        { title: "Human sentence", text: "Students hold word cards and stand close to the words that belong in the who group and action group.", visual: "[The small bird] [sang loudly.]" },
        { title: "Swap a group", text: "Keep The fish and swap swims, hides or splashes. Say how each sentence changes.", visual: "Who group: The fish. Try these action groups: swims, hides or splashes." },
        { title: "Hear the join", text: "Teacher pauses between meaningful groups; students repeat the full sentence without losing its meaning.", visual: "meaning group + meaning group → whole sentence" }
      ],
      mistakes: [
        ["A word group can be cut anywhere", "Read the sentence aloud and keep together the words that answer the same meaning question, such as who or what happened."],
        ["Every sentence must have exactly two groups", "Explain that the two-part model helps us begin, but a sentence can include more meaningful detail groups."],
        ["Moving one group never changes the message", "Swap or move one group, read both sentences aloud and compare what each one now means."]
      ],
      quick: [
        "In ‘The yellow duck splashed in the pond’, which words name who?",
        "Replace the action group in ‘My brother laughed’ and explain the new meaning.",
        "Why is the spoken grouping first group little, second group dog ran, third group to not helpful?",
        "Say ‘The small bird sang loudly’, pause after bird to separate the who group from the action group, then join the sentence again."
      ],
      quickAnswers: [
        "“The yellow duck” is the word group that names who.",
        "“My brother sang” replaces laughed with sang, so the new sentence says he made music instead of laughing.",
        "Those cuts separate words that belong together and leave to without the place information it needs.",
        "Pause after bird: the first group is “The small bird” and the second is “sang loudly”; joined again, the full sentence keeps its meaning."
      ],
      mastery: [
        "find a group that names who or what",
        "find a group that adds action or detail",
        "keep words together by meaning",
        "change one group to change the message",
        "join word groups into a meaningful sentence"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Connect words by the jobs they do together",
          "Words in a sentence relate to one another: a naming word can connect to an action word, and a describing word can add information to a naming word.",
          "Build one sentence with colour-coded cards, first connecting who or what to the action, then attaching a describing word to the thing it describes; introduce noun, verb and adjective as optional teacher labels after meaning is secure.",
          ["Find the naming word or group.", "Connect it to the action word or group.", "Attach a describing word to the person, animal, place or thing it describes."],
          "In “The black cat ate,” which words belong together, and how does each one help the meaning?",
          "The learner connects cat to ate and black to cat, explaining the naming, action and describing relationships in child-friendly language.",
          "Use a cat picture as the centre, place black beside it and draw an action arrow from cat to ate.",
          "Cat names who; ate tells what the cat did; black describes the cat, so the words work together as “The black cat ate.”",
          "The child links black to ate because those cards happen to sit beside one another, without checking what black describes.",
          visualModel(
            "A sentence relationship map places cat at the centre, connects black to cat as a describing word and connects cat to ate as the action.",
            ["black → describes → cat", "cat → does → ate", "Together: The black cat ate."],
            "Connect words by meaning, not only by where their cards sit."
          )
        )
      ]
    },

    AC9EFLA07: {
      title: "Pictures and Words Build Meaning Together",
      subtitle: "Combine what the image shows with what the words tell",
      learn: "I can use picture clues and word clues together to understand a story or information text. Sometimes a picture repeats the words; sometimes it adds a place, feeling, action or detail. Words can also tell something that is not visible in the picture.",
      routine: "Look closely → Read or hear the words → Name each clue → Combine the meaning",
      model_title: "Combine a picture clue and a word clue",
      model_html: visualModel(
        "A story card combines words and an image. The words say The puppy hid. The picture shows the puppy inside a striped box. Together the reader learns what happened and where.",
        ["Words: The puppy hid.", "Picture: puppy inside a striped box", "Together: the puppy hid in the box"]
      ),
      apply_title: "Find different jobs for images and words in information",
      apply_html: visualModel(
        "An information card about a frog uses words to say Frogs hatch from eggs and a labelled image to point out egg, tadpole and frog stages.",
        ["Words → Frogs hatch from eggs.", "Diagram → egg, tadpole, frog", "Together → fact + visible stages"]
      ),
      vocabulary: [
        { term: "image", definition: "a picture, photograph, drawing or diagram" },
        { term: "word clue", definition: "meaning communicated by the written or spoken words" },
        { term: "picture clue", definition: "meaning communicated by what an image shows" },
        { term: "detail", definition: "a small piece of information that adds meaning" },
        { term: "combine", definition: "put clues together to make a fuller meaning" }
      ],
      activities: [
        { title: "Cover and reveal", text: "Show an image without its sentence, then reveal the words. Students name what each part contributes.", visual: "image clue → word clue → combined meaning" },
        { title: "Missing clue", text: "Read a sentence while hiding the image. Students predict one useful detail the picture might add.", visual: "words + ? picture detail" },
        { title: "Story and information", text: "Compare a story illustration and labelled diagram. Identify how each image helps its text.", visual: "illustration ↔ story • diagram ↔ information" }
      ],
      mistakes: [
        ["The picture tells every part of the message", "Ask what the words tell that cannot be seen, such as a character's name, time or thought."],
        ["The words are enough, so the image can be ignored", "Cover the image, notice what information disappears, then restore it and combine both clues."],
        ["Every image only repeats the words", "Find one added detail in the image and explain how it extends the sentence or fact."]
      ],
      quick: [
        "The words say ‘Lina heard a crash’ and the picture shows a fallen pot. What does each clue add?",
        "In a labelled butterfly diagram, what can the image show more quickly than a sentence?",
        "Name one detail words could tell that a picture might not show.",
        "Combine the clues ‘It was freezing’ and a picture of a child in a snowy park."
      ],
      quickAnswers: [
        "The words tell that Lina heard a crash, while the picture shows the fallen pot that may have made the sound.",
        "The image can quickly show the shapes, positions and labelled parts of the butterfly.",
        "Words could tell a character's name, thought or an event that happened earlier.",
        "The child was in a snowy park where the air felt freezing cold."
      ],
      mastery: [
        "identify a picture clue",
        "identify a word clue",
        "explain what an image adds",
        "explain what words add",
        "combine both clues into one clear meaning"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Compare meaning from words only and images only",
          "A reader may build different interpretations when only the words or only the images are available because each mode can contribute different evidence.",
          "Reveal one short multimodal text in stages: hear the words without the image, view the image without the words, then combine both and revise the interpretation.",
          ["Use the words only and say what they suggest.", "Use the image only and say what it suggests.", "Combine both and explain what became clearer or changed."],
          "The words say, “It was finally here.” The image shows a child beside a birthday cake. What can each part make you think?",
          "The learner gives a text-based idea, an image-based idea and a combined interpretation that remains open to reasonable alternatives.",
          "Use three mats labelled Words, Image and Together and record one clue on each.",
          "The words alone leave the arrival unclear; the image suggests a birthday; together they may mean the child's birthday celebration has arrived.",
          "The child treats the first guess from the words as fixed and ignores new evidence when the image is revealed.",
          visualModel(
            "A three-stage interpretation: the words It was finally here leave the event open, the image shows a child and birthday cake, and the combined reading suggests a long-awaited birthday.",
            ["Words only: something arrived", "Image only: birthday scene", "Together: a long-awaited birthday"],
            "New evidence can refine an interpretation."
          )
        ),
        elaboration(
          "E2",
          "Match written details with image details",
          "Some written details are reflected directly in an accompanying image, while other written details such as a name, thought, time or unseen event may not be visible.",
          "Read one sentence beside an image and sort each detail into Shown in both, Words only or Image only, asking learners to point to evidence.",
          ["Name one detail from the words.", "Check whether the image shows that detail.", "Find one detail supplied by only one mode."],
          "The sentence says, “Lina quietly waited until night.” The picture shows a child sitting beside a tent under stars. Which details match, and which detail is not visible?",
          "The learner matches waiting or night with image evidence and identifies Lina's name or quietly as information not securely visible in the image.",
          "Cover one phrase at a time and ask Can I still know this from the picture?",
          "The stars reflect night and the seated child may reflect waiting; the words tell the child's name Lina, which the picture alone cannot show.",
          "The child claims every word is pictured, including the character's name, simply because a person appears in the image.",
          visualModel(
            "A words-and-image evidence sort for Lina quietly waited until night: stars and a seated child match night and waiting, while the name Lina is supplied by words only.",
            ["Shown in both: waiting + night", "Words only: the name Lina", "Image only: striped tent", "Combine for fuller meaning"],
            "Check each detail instead of assuming the image repeats every word."
          )
        )
      ]
    },

    AC9EFLA08: {
      title: "Words for Familiar People, Places and Topics",
      subtitle: "Learn, explain and use vocabulary from everyday life, interests and school learning",
      learn: "I can notice useful words in familiar contexts, connect each word to its meaning and use it when I speak or write. Some words are everyday words; others name an idea precisely in a favourite activity or school topic. Knowing the context helps me choose the word that fits.",
      routine: "Hear or see the word → Connect it to meaning → Link it to a familiar context → Use it in a sentence",
      model_title: "Grow a word from meaning to use",
      model_html: visualModel(
        "A vocabulary model for the word observe. Observe means look carefully. In a science context, a child observes a leaf. The child says, I observe tiny spots on the leaf.",
        ["Word: observe", "Meaning: look carefully", "Use: I observe tiny spots on the leaf."]
      ),
      apply_title: "Choose a precise word for the context",
      apply_html: visualModel(
        "Three familiar contexts use precise words: enormous for a very big playground mural, goalkeeper in a football game and stem when describing a plant.",
        ["Everyday: enormous mural", "Interest: football goalkeeper", "School topic: plant stem"]
      ),
      vocabulary: [
        { term: "vocabulary", definition: "the words we understand and use" },
        { term: "context", definition: "the situation or topic that helps a word make sense" },
        { term: "meaning", definition: "the idea a word communicates" },
        { term: "precise", definition: "exact and clear for what we mean" },
        { term: "topic word", definition: "a word that is especially useful when learning or talking about one topic" }
      ],
      activities: [
        { title: "Word detective", text: "Read a familiar sentence and use the picture or situation to infer one new word's meaning.", visual: "sentence + context clue → word meaning" },
        { title: "Topic basket", text: "Sort picture-word cards into home, personal interest and school-topic contexts, allowing words to fit more than one.", visual: "home • interests • school topics" },
        { title: "Use it clearly", text: "Students choose one word, explain it with a familiar example and use it in a short sentence.", visual: "word → meaning → example sentence" }
      ],
      mistakes: [
        ["A long word is always a better word", "Compare long and short choices and select the word whose meaning fits the context most precisely."],
        ["Repeating a word means understanding it", "Ask the learner to point to an example, explain the meaning simply and use the word in a new familiar sentence."],
        ["A word has exactly the same meaning in every context", "Place the word in two familiar sentences and use surrounding clues to discuss how its meaning or use changes."]
      ],
      quick: [
        "What does observe mean in ‘We observe the snail closely’, and which clue helps?",
        "Choose tiny or enormous for an ant beside a shoe and explain your choice.",
        "Name one precise word from a sport, hobby or school topic you know.",
        "Use the word stem in a plant sentence so a listener can understand its meaning."
      ],
      quickAnswers: [
        "Observe means look carefully, and the word closely supports that meaning.",
        "Tiny fits because the ant is very small beside the shoe.",
        "Goalkeeper is a precise football word for the player who protects the goal.",
        "The plant's stem holds up its leaves and flower."
      ],
      mastery: [
        "connect a familiar word to its meaning",
        "use context to choose a fitting word",
        "explain a topic word with an example",
        "use new vocabulary in a sentence",
        "choose a precise word instead of an unrelated word"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Use topic words in learning and imaginative play",
          "Learning areas and imagined roles use precise vocabulary that helps people act, explain and solve problems together.",
          "Introduce a small word set through a real learning model, then move the same words into guided play where learners must use each word for a meaningful purpose.",
          ["Name the learning or play context.", "Choose a word that belongs to it.", "Use the word while doing, asking or explaining something."],
          "In a pretend shop, which words could a shopkeeper and customer use to buy an apple?",
          "The learner uses relevant words such as price, dollar, customer or receipt in a meaningful shop exchange rather than merely repeating them.",
          "Give labelled props and two oral models: How much is the apple? and Here is your receipt.",
          "The customer asks, “What is the price of one apple?” and the shopkeeper answers, “Two dollars; here is your receipt.”",
          "The child chooses a familiar but unrelated word such as bedroom because it is known, not because it fits the shop context.",
          visualModel(
            "A pretend shop exchange connects four precise topic words to actions: customer asks for a price, shopkeeper accepts two dollars and gives a receipt.",
            ["customer → asks", "price → tells the cost", "dollars → pay", "receipt → records the purchase"],
            "The context gives each word a useful job."
          )
        ),
        elaboration(
          "E2",
          "Build a word web for a school topic",
          "Words studied together can form a topic network, with each word naming a person, relationship, place, action or idea connected to the topic.",
          "Create an inclusive class word web around families, inviting varied words and structures without assuming that every family looks or speaks in one way.",
          ["Name the topic in the centre.", "Add a word that belongs to the topic.", "Explain its connection with a picture, example or short sentence."],
          "How could caregiver, sibling, grandparent and home connect to a class topic called Families?",
          "The learner explains a relevant connection for a topic word while respecting that different learners' family experiences vary.",
          "Offer pictures and blank cards so children can point, name, draw or contribute a word used by their family or community.",
          "Sibling names one possible family relationship, while caregiver names a person who looks after a child; both can connect to the Families topic.",
          "The child rejects a useful word because it does not match one narrow picture of what a family must be.",
          visualModel(
            "An inclusive Families word web has Families in the centre with separate branches to caregiver, sibling, grandparent and home, plus an open branch for another family word.",
            ["Topic: Families", "caregiver", "sibling", "grandparent", "home", "another word from our class"],
            "A topic word belongs because its meaning connects, not because every family uses it."
          )
        ),
        elaboration(
          "E3",
          "Grow vocabulary through people, texts, images and objects",
          "A new word becomes more usable when learners hear it in interaction, see it in a text or image, connect it to an object or action and try it themselves.",
          "Plan repeated encounters with one word across modes, then invite informal peer talk so the learner uses the word for a fresh example.",
          ["Hear the word in a meaningful sentence.", "Connect it to an image, action or object.", "Say the meaning and use the word in a new context."],
          "You hear the word fragile, see a picture of a cracked shell and carefully hold an empty eggshell. What does fragile mean?",
          "The learner explains fragile as easy to break or damage and uses it accurately for another suitable object.",
          "Contrast a sturdy block and an empty eggshell, then model the sentence The eggshell is fragile because it can break easily.",
          "After talking, viewing and handling, the child says, “The dry leaf is fragile because it can crumble easily.”",
          "The child repeats fragile but applies it to every small object, showing they have copied the sound without connecting the meaning.",
          visualModel(
            "Four connected encounters develop the word fragile: an adult says it, a cracked-shell image shows it, an empty eggshell demonstrates it and a child uses it for a dry leaf.",
            ["Hear: fragile", "See: cracked shell", "Touch carefully: empty eggshell", "Use: a dry leaf is fragile"],
            "Repeated meaningful encounters turn a heard word into usable vocabulary."
          )
        )
      ]
    },

    AC9EFLA09: {
      title: "Capital Letters and Ending Punctuation",
      subtitle: "Tell letters from punctuation and use visible marks to show sentence boundaries",
      learn: "I can tell that letters make words while punctuation marks organise written text. A capital letter can show the beginning of a sentence or the name of a particular person or place. A full stop, question mark or exclamation mark can signal that a sentence has ended.",
      routine: "Find the first word → Look for a name → Choose needed capitals → Choose an ending mark",
      model_title: "Mark the beginning, name and end",
      model_html: visualModel(
        "The sentence Mia runs. is checked in three places. Capital M starts the name Mia and also begins the sentence. Lower-case letters complete the words. A full stop signals the end.",
        ["Mia → capital M for a name and sentence start", "runs → letters make the word", ". → full stop signals the end"]
      ),
      apply_title: "Choose an ending mark that fits the message",
      apply_html: visualModel(
        "Three sentences use boundary clues: We found it ends with a full stop, Where is Dad ends with a question mark, and Watch out ends with an exclamation mark.",
        ["We found it. → telling", "Where is Dad? → asking", "Watch out! → strong warning"]
      ),
      vocabulary: [
        { term: "capital letter", definition: "the large form of a letter, used at sentence beginnings and for names" },
        { term: "punctuation", definition: "marks that help organise written meaning" },
        { term: "full stop", definition: "a dot that signals the end of a telling sentence" },
        { term: "question mark", definition: "a mark that signals the end of a question" },
        { term: "sentence boundary", definition: "the visible beginning or ending of a written sentence" }
      ],
      activities: [
        { title: "Letter or mark?", text: "Sort large cards into letters that build words and punctuation that organises the sentence.", visual: "A m t → letters • . ? ! → punctuation" },
        { title: "Capital hunt", text: "Find the first word and familiar names in three short sentences. Circle only the capitals that are needed.", visual: "sentence start • person name • place name" },
        { title: "Read the ending", text: "Match a telling, asking or strong-warning voice to its full stop, question mark or exclamation mark.", visual: "telling . • asking ? • strong warning !" }
      ],
      mistakes: [
        ["Every large-looking mark is a capital letter", "Sort examples by job: capital letters are letter forms that help make words; punctuation marks are not letters."],
        ["A capital belongs only at the start of a line", "Follow the sentence, not the line, and mark its actual beginning plus any names."],
        ["Any ending mark can finish any message", "Say the sentence aloud as telling, asking or a strong feeling, then choose the mark that fits."]
      ],
      quick: [
        "A written sentence has capital A at the start of the name Ava and a full stop after hops. Which feature is punctuation, and which capital begins the name?",
        "A sentence is written with lower-case w at its beginning, lower-case t at the start of the name Tom, and no ending mark. Say the repaired sentence and name each change.",
        "The words ‘Can I play’ ask a question. Name the ending mark that fits and explain why.",
        "Explain why a full stop is not a letter even though it appears beside letters."
      ],
      quickAnswers: [
        "The full stop is punctuation, and the capital A begins the name Ava.",
        "The repaired sentence is “We saw Tom.” Capital W begins the sentence, capital T begins the name Tom, and a full stop ends it.",
        "A question mark fits because the words ‘Can I play’ ask a question.",
        "A full stop is a punctuation mark that signals a sentence ending; it is not a letter used to build a word."
      ],
      mastery: [
        "tell letters from punctuation marks",
        "use a capital at a sentence beginning",
        "use a capital for a familiar name",
        "choose an ending mark that fits the message",
        "explain how capitals and punctuation show sentence boundaries"
      ],
      elaborations: [
        elaboration(
          "E1",
          "Notice capital letters in everyday names",
          "Capital letters appear in everyday texts to begin the names of particular people, families, places and other named things, and a child can connect a capital with the matching lower-case letter.",
          "Use familiar, consented examples from class and public place names, then ask learners to comment on the capital's job rather than simply circle every large letter they see.",
          ["Find the name in the everyday text.", "Point to its first capital letter.", "Explain whose or which name the capital begins."],
          "A library card says “Noah,” and a map label says “Darwin.” What can you say about the capitals N and D?",
          "The learner identifies each capital as the first letter of a particular name and can match it with its lower-case form.",
          "Place N beside n and D beside d, then model complete statements: That capital starts the name Noah; that capital starts the name Darwin.",
          "N begins the person's name Noah, and D begins the place name Darwin; the letters are capitals because they start particular names.",
          "The child says every letter in an all-capitals safety sign is a person's name or assumes any large printed symbol is a capital letter.",
          visualModel(
            "Two everyday name texts highlight their first capital letters: a library card shows Noah with N paired to lower-case n, and a map shows Darwin with D paired to lower-case d.",
            ["Library card: Noah → N / n", "Map label: Darwin → D / d", "Capital first letter → particular name"],
            "Comment on the capital and the name it begins."
          )
        )
      ]
    }
  };

  for (const [code, overlay] of Object.entries(overlays)) {
    if (!data[code]) continue;
    if (!data[code].preservedLegacyTopicMaterial) {
      data[code].preservedLegacyTopicMaterial = Object.fromEntries([
        "learn", "model_title", "model_html", "apply_title", "apply_html",
        "activities", "mistakes", "quick", "mastery"
      ].map((field) => [field, data[code][field]]));
    }
    Object.assign(data[code], overlay);
  }

  // AC9EFLA01 has a later purpose-built classroom overlay. Keep its richer
  // classroom specification while retaining this release's oral-language
  // concept deep-dive on the final live unit.
  if (data.AC9EFLA01) {
    let ac9efla01Unit = data.AC9EFLA01;
    const deepDive = overlays.AC9EFLA01.learn;
    const richElaborations = overlays.AC9EFLA01.elaborations;
    const liveQuickAnswers = [
      "The words changed. The speaker still asked for help.",
      "Excuse me and could you please suit this teacher request.",
      "The listener and some words changed. Asking for help stayed the same.",
      "Friend: Can I use your pencil? Teacher: Excuse me, could I please borrow a pencil?"
    ];
    Object.defineProperty(data, "AC9EFLA01", {
      configurable: true,
      enumerable: true,
      get: () => ac9efla01Unit,
      set: (nextUnit) => {
        if (nextUnit && typeof nextUnit === "object") {
          nextUnit.learn = deepDive;
          nextUnit.elaborations = richElaborations;
          nextUnit.quickAnswers = liveQuickAnswers;
          nextUnit.mastery = (nextUnit.mastery || []).map((item) => String(item || "").replace(/^./, (letter) => letter.toLowerCase()));
          if (nextUnit.canonical) {
            nextUnit.canonical.elaborations = (nextUnit.canonical.elaborations || []).map((existing, index) => {
              const rich = richElaborations[index];
              if (!rich) return existing;
              return {
                ...existing,
                shortTitle: rich.title,
                plainLanguageConcept: rich.idea,
                teachingPurpose: rich.teach,
                teacherDoes: `${rich.teach} ${rich.steps.join(" ")}`,
                teacherSaysOrAsks: rich.say,
                studentDoes: rich.studentDoes,
                whatToLookFor: rich.check,
                ifIncorrect: rich.fix,
                masteryEvidence: rich.check,
                workedExample: rich.worked,
                likelyMisconception: rich.mistake,
                visualTitle: rich.title,
                visualHtml: rich.visual
              };
            });
            nextUnit.canonical.elaborations.forEach((elaboration) => {
              const slide = (nextUnit.canonical.slides || []).find((candidate) => candidate.elaborationIds?.includes(elaboration.id));
              if (!slide) return;
              if (slide.display) slide.display.studentPrompt = elaboration.masteryEvidence;
              if (slide.teacherLayer) {
                slide.teacherLayer.teacherDoes = elaboration.teacherDoes;
                slide.teacherLayer.teacherSaysOrAsks = elaboration.teacherSaysOrAsks;
                slide.teacherLayer.studentDoes = elaboration.studentDoes;
                slide.teacherLayer.whatToLookFor = elaboration.whatToLookFor;
                slide.teacherLayer.ifIncorrect = elaboration.ifIncorrect;
              }
            });
            liveQuickAnswers.forEach((answer, index) => {
              if (nextUnit.canonical.masteryItems?.[index]) nextUnit.canonical.masteryItems[index].expectedAnswer = answer;
            });
          }
        }
        ac9efla01Unit = nextUnit;
      }
    });
  }
})();
