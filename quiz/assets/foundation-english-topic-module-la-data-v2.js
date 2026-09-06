"use strict";

(() => {
  const banks = window.SkillrFoundationEnglishWorksheetData || (window.SkillrFoundationEnglishWorksheetData = {});

  const topics = {
    AC9EFLA01: {
      title: "Words That Fit Who We Are Talking To",
      method: "notice the place, person and purpose before choosing respectful words",
      vocabulary: ["relationship", "context", "purpose", "respectful", "choice"],
      questions: [
        {
          type: "single",
          question: "You need help during class. Which words fit talking with your teacher?",
          visual: "Classroom scene: a student is beside the teacher's table and needs help opening a paint jar.",
          answers: ["May I please have help?", "Give it now!", "Want to race me?"],
          answer: "May I please have help?",
          reason: "The polite request fits the classroom, the teacher–student relationship and the need for help",
          hint: "Name who is listening and choose a clear, kind request.",
          vocabulary: "relationship"
        },
        {
          type: "fill-blank",
          question: "Complete the respectful classroom request.",
          template: "May I please have {{blank}}?",
          answer: "help",
          reason: "The completed words clearly state the speaker's purpose",
          hint: "Think about what the student needs from the teacher.",
          vocabulary: "purpose"
        },
        {
          type: "match",
          question: "Match each person to words that could fit the situation.",
          matchLeft: ["friend at play", "teacher during class", "visiting adult"],
          matchRight: ["Would you like to see our class garden?", "Want to build with me?", "Could you please show me again?"],
          answer: "friend at play → Want to build with me?; teacher during class → Could you please show me again?; visiting adult → Would you like to see our class garden?",
          reason: "Each language choice is respectful and suited to its context",
          hint: "Picture who is listening before you match each phrase.",
          vocabulary: "context"
        },
        {
          type: "single",
          question: "A close friend asks to use your crayon. Which reply is clear and respectful?",
          answers: ["Yes, you can use it after me.", "No crayon ever!", "The window is open."],
          answer: "Yes, you can use it after me.",
          reason: "The reply answers the friend's request kindly and clearly",
          hint: "Choose the reply that responds to the friend and explains what can happen.",
          vocabulary: "respectful"
        },
        {
          type: "text",
          question: "Change ‘Move!’ into words you could use when asking the librarian to let you pass.",
          answer: "For example: Excuse me, may I please get past?",
          reason: "The revised request suits an unfamiliar adult and keeps the same purpose",
          hint: "Begin with Excuse me or Please, then state what you need.",
          vocabulary: "choice"
        },
        {
          type: "fill-blank",
          question: "Complete the reminder about language choices.",
          template: "The same message can sound different when the person or {{blank}} changes.",
          answer: "place",
          reason: "Place is one part of the context that guides how we speak",
          hint: "Think about the difference between talking at home and in class.",
          vocabulary: "context"
        },
        {
          type: "match",
          question: "Match each speaking purpose to a suitable phrase.",
          matchLeft: ["greet", "ask", "invite"],
          matchRight: ["Would you like to join our game?", "Good morning, Nan.", "Could I please borrow that pencil?"],
          answer: "greet → Good morning, Nan.; ask → Could I please borrow that pencil?; invite → Would you like to join our game?",
          reason: "Each phrase communicates the named purpose to another person",
          hint: "Ask what job each phrase is doing.",
          vocabulary: "purpose"
        },
        {
          type: "text",
          question: "You want to show a block tower. Say one invitation to a close friend and a different invitation to a visiting adult.",
          visual: "Same purpose: invite someone to see a block tower; two listeners: a close friend and a visiting adult.",
          answer: "For example: Friend—Want to see my tower? Visiting adult—Would you like to see the tower I built?",
          reason: "Both invitations keep the purpose while adapting the words to each relationship",
          hint: "Keep the invitation idea the same, but picture each listener before speaking.",
          vocabulary: "relationship"
        },
        {
          type: "text",
          question: "Kai says, ‘The words my family uses are wrong because they are different from school words.’ Explain what Kai needs to understand.",
          answer: "Different families, communities and schools may use different words; a language choice can be correct when it is kind, clear and fits the situation.",
          reason: "The explanation values language difference and checks whether words fit the situation",
          hint: "Do not rank home and school language; explain how the situation guides the choice.",
          vocabulary: "choice"
        }
      ]
    },
    AC9EFLA02: {
      title: "Sharing Likes, Dislikes and Preferences",
      method: "name the choices, state a preference and add a reason with because",
      vocabulary: ["preference", "like", "dislike", "reason", "because"],
      questions: [
        {
          type: "single",
          question: "Which sentence clearly shares a preference?",
          answers: ["I prefer pears because they are juicy.", "Pears are on the plate.", "Put the pear here."],
          answer: "I prefer pears because they are juicy.",
          reason: "The sentence names a preferred choice and explains why",
          hint: "Look for words that show a personal choice and a reason.",
          vocabulary: "preference"
        },
        {
          type: "fill-blank",
          question: "Complete the preference sentence.",
          template: "I prefer painting {{blank}} I enjoy mixing colours.",
          answer: "because",
          reason: "Because joins the preference to its reason",
          hint: "Use the word that answers why.",
          vocabulary: "because"
        },
        {
          type: "match",
          question: "Match each language frame to what it communicates.",
          matchLeft: ["I like…", "I do not like…", "I prefer…"],
          matchRight: ["a choice liked more", "something not enjoyed", "something enjoyed"],
          answer: "I like… → something enjoyed; I do not like… → something not enjoyed; I prefer… → a choice liked more",
          reason: "Each frame clearly signals a like, dislike or preference",
          hint: "Say each frame aloud and think about the feeling or choice it introduces.",
          vocabulary: "like"
        },
        {
          type: "single",
          question: "Which statement is a preference rather than a fact?",
          answers: ["I like the blue cup best.", "There are two cups.", "The cup is on the table."],
          answer: "I like the blue cup best.",
          reason: "The speaker shares a personal choice that another person may not share",
          hint: "A preference tells what someone likes, not what everyone can check.",
          vocabulary: "preference"
        },
        {
          type: "text",
          question: "Choose reading or drawing. State your preference and give one reason.",
          visual: "Two choice cards: an open picture book and a box of drawing pencils.",
          answer: "For example: I prefer drawing because I like making colourful pictures.",
          reason: "The response identifies one of the choices and gives a connected reason",
          hint: "Say, I prefer, then name your choice and add because with your reason.",
          vocabulary: "reason"
        },
        {
          type: "fill-blank",
          question: "Add a reason to make the meaning clear.",
          template: "I do not like muddy puddles because {{blank}}.",
          answer: "For example: my socks get wet",
          reason: "The added words explain the speaker's dislike",
          hint: "Tell what happens that makes the speaker not enjoy muddy puddles.",
          vocabulary: "dislike"
        },
        {
          type: "match",
          question: "Match each preference to a kind response from a listener.",
          matchLeft: ["I prefer soccer.", "I like quiet music.", "I do not like peas yet."],
          matchRight: ["You prefer a different sound from me.", "You may enjoy a different game from me.", "I hear that peas are not your choice yet."],
          answer: "I prefer soccer. → You may enjoy a different game from me.; I like quiet music. → You prefer a different sound from me.; I do not like peas yet. → I hear that peas are not your choice yet.",
          reason: "Each reply listens to the preference without saying the person is wrong",
          hint: "Match the topic first, then check that the response is kind.",
          vocabulary: "like"
        },
        {
          type: "text",
          question: "Ari prefers swings because they feel like flying. Mia prefers the sandpit because she likes building. Explain whether one child must be wrong.",
          answer: "Neither child must be wrong because preferences are personal and both children gave a reason for their choice.",
          reason: "The explanation recognises that different preferences can both be valid",
          hint: "Ask whether a preference must be shared by everyone.",
          vocabulary: "preference"
        },
        {
          type: "text",
          question: "Repair this unkind response: ‘Your favourite fruit is bad because I dislike it.’",
          answer: "For example: You like that fruit; I prefer a different fruit because it tastes better to me.",
          reason: "The repaired response states a personal preference without judging the other person's choice",
          hint: "Name both views kindly and give your own reason.",
          vocabulary: "dislike"
        }
      ]
    },
    AC9EFLA03: {
      title: "Texts Come in Many Forms",
      method: "name the text form, find its message and explain its purpose",
      vocabulary: ["text", "form", "message", "purpose", "audience"],
      questions: [
        {
          type: "single",
          question: "Which item was made to communicate a message?",
          answers: ["A classroom sign that says ‘Wash your hands’", "An unmarked pebble", "An empty patch of carpet"],
          answer: "A classroom sign that says ‘Wash your hands’",
          reason: "The sign uses words to communicate an instruction",
          hint: "Choose the item someone made so another person would understand something.",
          vocabulary: "text"
        },
        {
          type: "fill-blank",
          question: "Name the form of this text.",
          visual: "A red octagon beside a road with the word STOP in white letters.",
          template: "This text is a {{blank}}.",
          answer: "sign",
          reason: "The visible road text takes the form of a sign",
          hint: "Think about what we call a text displayed beside a road.",
          vocabulary: "form"
        },
        {
          type: "match",
          question: "Match each text form to a familiar purpose.",
          matchLeft: ["picture book", "food label", "weather page"],
          matchRight: ["share today's forecast", "tell a story", "name or describe the food"],
          answer: "picture book → tell a story; food label → name or describe the food; weather page → share today's forecast",
          reason: "Each form is paired with a job it commonly does",
          hint: "Ask what a person might use each text to find out or enjoy.",
          vocabulary: "purpose"
        },
        {
          type: "single",
          question: "Which change turns a plain lunchbox into a text that communicates ownership?",
          answers: ["Add a label that says ‘Noah’", "Move it to another shelf", "Put an apple inside it"],
          answer: "Add a label that says ‘Noah’",
          reason: "The label adds a message about whose lunchbox it is",
          hint: "Look for the change that communicates information to a reader.",
          vocabulary: "message"
        },
        {
          type: "text",
          question: "A teacher says, ‘Pack away now.’ Show how the same message could become a simple printed text.",
          answer: "For example: Make a sign that says ‘Pack away now’ with a picture of toys going into boxes.",
          reason: "The spoken message is represented in a printed sign form with the same purpose",
          hint: "Keep the message, but change how classmates receive it.",
          vocabulary: "form"
        },
        {
          type: "match",
          question: "Match each part of a library notice to its label.",
          visual: "Notice: LIBRARY CLOSED TODAY — Please return books tomorrow.",
          matchLeft: ["notice", "Library closed today", "inform readers"],
          matchRight: ["purpose", "message", "text form"],
          answer: "notice → text form; Library closed today → message; inform readers → purpose",
          reason: "The form, message and purpose are identified as different parts of the text",
          hint: "Ask what kind it is, what it says and why it was made.",
          vocabulary: "message"
        },
        {
          type: "fill-blank",
          question: "Complete the statement about who a text is for.",
          template: "The people meant to see or hear a text are its {{blank}}.",
          answer: "audience",
          reason: "Audience names the people a text is intended to reach",
          hint: "Think of the word for the listeners, viewers or readers.",
          vocabulary: "audience"
        },
        {
          type: "text",
          question: "Share ‘The library is closed today’ in three forms: one printed, one spoken and one digital.",
          answer: "For example: a printed door sign, a spoken announcement and a message on the library screen, all saying the library is closed today.",
          reason: "One message is carried accurately across three different text forms",
          hint: "Keep what the audience needs to know the same each time.",
          vocabulary: "form"
        },
        {
          type: "text",
          question: "A small sign beside seedlings says ‘Please do not touch’. Name its form, message, purpose and likely audience.",
          answer: "It is a sign; its message is not to touch; its purpose is to protect the seedlings; its audience is people near the garden.",
          reason: "The response connects all four text features to evidence in the garden situation",
          hint: "Answer four questions: What kind, what does it say, why, and for whom?",
          vocabulary: "audience"
        }
      ]
    },
    AC9EFLA04: {
      title: "How Books and Screens Are Organised",
      method: "identify the text, find its starting point and follow its navigation clues",
      vocabulary: ["convention", "cover", "title", "navigation", "icon"],
      questions: [
        {
          type: "single",
          question: "Which feature usually helps you identify a book before opening it?",
          answers: ["Its front cover and title", "A speaker button", "A scrolling bar"],
          answer: "Its front cover and title",
          reason: "The cover and title are familiar book organisation clues",
          hint: "Picture the outside front of a book.",
          vocabulary: "cover"
        },
        {
          type: "fill-blank",
          question: "Complete the name of a text.",
          template: "The name printed on a book or screen text is its {{blank}}.",
          answer: "title",
          reason: "Title is the word for a text's name",
          hint: "Look near the top or front for the text's name.",
          vocabulary: "title"
        },
        {
          type: "match",
          question: "Match each feature to what a reader can do with it.",
          matchLeft: ["cover", "speaker icon", "Next button"],
          matchRight: ["move to the following screen", "identify the book", "hear words read aloud"],
          answer: "cover → identify the book; speaker icon → hear words read aloud; Next button → move to the following screen",
          reason: "Each print or screen feature is matched to its navigation job",
          hint: "Imagine using each feature and decide what changes.",
          vocabulary: "navigation"
        },
        {
          type: "single",
          question: "On a familiar English picture-book page, where would you usually begin reading?",
          visual: "A page with three short lines of English print and a picture underneath; a small dot marks the top-left word.",
          answers: ["At the top-left word", "At the last word at the bottom", "In the middle of the picture"],
          answer: "At the top-left word",
          reason: "The top-left word follows the familiar starting convention for this English text",
          hint: "Find the first line, then its first word.",
          vocabulary: "convention"
        },
        {
          type: "text",
          question: "Describe the reading path across one line of a familiar English book, then say what happens at the end of the page.",
          answer: "Begin at the left, move across to the right, move down to the next line, and turn the page when the page is finished.",
          reason: "The response follows the expected reading path and page navigation",
          hint: "Trace the path with your finger as you explain.",
          vocabulary: "navigation"
        },
        {
          type: "single",
          question: "A screen shows an animal photograph and a small speaker symbol. What is the speaker symbol most likely for?",
          answers: ["Hearing the words aloud", "Turning the device into a book", "Changing the animal into a button"],
          answer: "Hearing the words aloud",
          reason: "The familiar speaker icon signals an audio action",
          hint: "Think about what a speaker does with sound.",
          vocabulary: "icon"
        },
        {
          type: "match",
          question: "Match the book clue and screen clue that perform a similar job.",
          matchLeft: ["book title", "turn the page", "page number"],
          matchRight: ["screen number", "screen title", "select Next"],
          answer: "book title → screen title; turn the page → select Next; page number → screen number",
          reason: "The pairs show related organisation jobs in print and on screen",
          hint: "Match what each feature helps the reader know or do.",
          vocabulary: "convention"
        },
        {
          type: "text",
          question: "A child taps every picture because they think every picture is a button. Explain a safe way to check.",
          answer: "Look for a label, outline or familiar icon, listen to the teacher's instruction, and only select the feature meant for navigation.",
          reason: "The response checks visible and teacher-provided clues before taking a screen action",
          hint: "Compare a picture made to show information with a feature made to be selected.",
          vocabulary: "icon"
        },
        {
          type: "text",
          question: "Give directions for opening a digital animal text, finding its title, hearing the first fact and moving to the next screen.",
          answer: "Open the text, find the title at the top, select the speaker icon to hear the fact, then select Next to move on.",
          reason: "The directions use screen organisation clues in a clear sequence",
          hint: "Name the start, title, audio feature and next-screen action in order.",
          vocabulary: "navigation"
        }
      ]
    },
    AC9EFLA05: {
      title: "A Sentence Shares One Idea",
      method: "read or hear the words, test the whole idea and mark the sentence boundary",
      vocabulary: ["sentence", "idea", "sense", "boundary", "complete"],
      questions: [
        {
          type: "single",
          question: "Which group of words communicates one whole idea?",
          answers: ["The frog jumps.", "The green frog", "Jumps under"],
          answer: "The frog jumps.",
          reason: "The words work together to tell who and what happens",
          hint: "Say each choice aloud and ask what whole thought it tells.",
          vocabulary: "sentence"
        },
        {
          type: "fill-blank",
          question: "Complete the sentence so it communicates a whole idea.",
          template: "The tiny ant {{blank}}.",
          answer: "For example: crawls",
          reason: "The added action completes the idea about the ant",
          hint: "Add words that tell what the ant does.",
          vocabulary: "complete"
        },
        {
          type: "match",
          question: "Match each word group to the best description.",
          matchLeft: ["Birds fly.", "The red balloon", "under blue runs"],
          matchRight: ["does not make sense", "whole idea", "unfinished idea"],
          answer: "Birds fly. → whole idea; The red balloon → unfinished idea; under blue runs → does not make sense",
          reason: "Each group is classified by whether its meaning is whole and understandable",
          hint: "Check meaning, not how many words each group contains.",
          vocabulary: "sense"
        },
        {
          type: "single",
          question: "Why can ‘Birds fly.’ be a sentence even though it is short?",
          answers: ["It communicates a whole idea.", "It has exactly two words.", "Every short group is a sentence."],
          answer: "It communicates a whole idea.",
          reason: "Sentence completeness depends on meaning rather than length",
          hint: "Ask whether a listener understands one complete thought.",
          vocabulary: "idea"
        },
        {
          type: "text",
          question: "The unfinished words are ‘Our class’. Add words that communicate one clear idea.",
          answer: "For example: Our class planted seeds.",
          reason: "The added words turn the beginning into an understandable complete sentence",
          hint: "Tell what the class does, has or is.",
          vocabulary: "complete"
        },
        {
          type: "single",
          question: "Which group needs more words before it communicates a whole idea?",
          answers: ["My red kite", "My red kite flew.", "Kites move."],
          answer: "My red kite",
          reason: "The group names something but does not yet say the intended whole thought",
          hint: "Ask what happened to the kite or what it is like.",
          vocabulary: "idea"
        },
        {
          type: "text",
          question: "Repair ‘blue under runs’ so it communicates one clear idea.",
          answer: "For example: The blue dog runs under the gate.",
          reason: "The repaired word order creates meaning and a clear sentence boundary",
          hint: "Choose who or what, add what happens, then read the result aloud.",
          vocabulary: "boundary"
        },
        {
          type: "text",
          question: "A child adds a full stop to ‘The sleepy koala’ and says it must now be complete. Explain what still needs checking.",
          answer: "The child must check whether the intended idea is complete; the group may need words such as ‘is resting’ before the full stop.",
          reason: "The response checks sentence meaning before relying on the ending mark",
          hint: "An ending mark shows a boundary, but ask whether the words express the whole thought.",
          vocabulary: "boundary"
        },
        {
          type: "text",
          question: "Make one short complete sentence and one related unfinished group, then explain the difference.",
          answer: "For example: ‘The possum climbs.’ is complete, while ‘The small possum’ is unfinished because it does not yet tell the whole idea.",
          reason: "The comparison uses meaning to distinguish a sentence from an unfinished group",
          hint: "Keep the topic similar so the missing part is easy to notice.",
          vocabulary: "sentence"
        }
      ]
    },
    AC9EFLA06: {
      title: "Word Groups Work Together in Sentences",
      method: "find the who-or-what group, find the action-or-detail group and join their meanings",
      vocabulary: ["word group", "sentence", "meaning", "action", "detail"],
      questions: [
        {
          type: "single",
          question: "In ‘The little dog ran to the gate’, which words name who the sentence is about?",
          answers: ["The little dog", "ran to the gate", "little ran"],
          answer: "The little dog",
          reason: "Those words belong together to name who performs the action",
          hint: "Ask, Who ran to the gate?",
          vocabulary: "word group"
        },
        {
          type: "fill-blank",
          question: "Complete the action group.",
          template: "The fish {{blank}}.",
          answer: "For example: swims quickly",
          reason: "The added group tells what the fish does",
          hint: "Add an action that a fish could do.",
          vocabulary: "action"
        },
        {
          type: "match",
          question: "Match each who-or-what group to an action-or-detail group that makes sense.",
          matchLeft: ["The yellow duck", "My warm socks", "A small bell"],
          matchRight: ["rang softly.", "splashed in the pond.", "are in my boots."],
          answer: "The yellow duck → splashed in the pond.; My warm socks → are in my boots.; A small bell → rang softly.",
          reason: "Each pair joins two compatible meaning groups into a sensible sentence",
          hint: "Say each possible sentence aloud and listen for meaning.",
          vocabulary: "meaning"
        },
        {
          type: "single",
          question: "Which spoken grouping keeps all the who words together and all the action words together in ‘The small bird sang loudly’ ?",
          answers: ["Who group: The small bird; action group: sang loudly.", "Who group: The; action group: small bird sang loudly.", "Who group: The small; action group: bird sang loudly."],
          answer: "Who group: The small bird; action group: sang loudly.",
          reason: "The split keeps the who group and action group intact",
          hint: "Listen for all the words that name who, then all the words that tell what happened.",
          vocabulary: "word group"
        },
        {
          type: "text",
          question: "Keep ‘My red hat’ and change the other word group so the hat is in a new place.",
          answer: "For example: My red hat is under the chair. The who-or-what group is ‘My red hat’ and the new detail group is ‘is under the chair’.",
          reason: "Changing the detail group changes the hat's location while keeping the who-or-what group",
          hint: "Keep the first group exactly and add is plus a new place.",
          vocabulary: "detail"
        },
        {
          type: "match",
          question: "Match each group to the question it answers.",
          matchLeft: ["The tall tree", "sways in the wind", "beside the creek"],
          matchRight: ["where?", "who or what?", "what happens?"],
          answer: "The tall tree → who or what?; sways in the wind → what happens?; beside the creek → where?",
          reason: "Each word group contributes a distinct part of the sentence's meaning",
          hint: "Turn each right-side prompt into a question about the words.",
          vocabulary: "detail"
        },
        {
          type: "text",
          question: "In ‘My brother laughed’, the who group is ‘My brother’ and the action group is ‘laughed’. Replace the action group and say how the message changes.",
          answer: "For example: My brother whispered. The new action group is ‘whispered’, so the sentence says he spoke quietly instead of laughing.",
          reason: "A new action group changes what the sentence tells about the same person",
          hint: "Keep My brother and choose one different action.",
          vocabulary: "action"
        },
        {
          type: "text",
          question: "A child puts the first break after ‘playful’ and the second break after ‘chased’ in ‘The playful kitten chased the ribbon’. Explain and improve the grouping.",
          answer: "Keep ‘The playful kitten’ as the who group and ‘chased the ribbon’ as the action group because each group holds related words together.",
          reason: "The improved split keeps related words together and makes each group's contribution clear",
          hint: "Ask who chased, then ask what the kitten did.",
          vocabulary: "meaning"
        },
        {
          type: "text",
          question: "Build a sentence with a who-or-what group, an action group and a where detail. Name each group after you say the sentence.",
          answer: "For example: The tiny lizard rested on the warm rock. ‘The tiny lizard’ is the who group, ‘rested’ is the action group and ‘on the warm rock’ is the where detail.",
          reason: "The three groups combine to name who, what happened and where",
          hint: "Use this spoken frame: who or what; did what; where.",
          vocabulary: "sentence"
        }
      ]
    },
    AC9EFLA07: {
      title: "Pictures and Words Build Meaning Together",
      method: "name the picture clue, name the word clue and combine both meanings",
      vocabulary: ["image", "word clue", "picture clue", "detail", "combine"],
      questions: [
        {
          type: "single",
          question: "The words say ‘The puppy hid’ and the picture shows a striped box. What does the picture add?",
          visual: "Picture description: only the puppy's tail can be seen poking out of a striped box.",
          answers: ["Where the puppy hid", "The puppy's name", "What day it is"],
          answer: "Where the puppy hid",
          reason: "The image adds the location that the words do not name",
          hint: "Compare what you can see with the exact words in the sentence.",
          vocabulary: "picture clue"
        },
        {
          type: "fill-blank",
          question: "Complete the combined meaning.",
          visual: "Words: ‘It might rain.’ Picture: dark clouds above children holding umbrellas.",
          template: "The words and picture both give clues about the {{blank}}.",
          answer: "weather",
          reason: "Both clues contribute to a message about possible rain",
          hint: "Name the topic shared by the sentence and the dark clouds.",
          vocabulary: "combine"
        },
        {
          type: "match",
          question: "Match each clue to what it tells the reader.",
          matchLeft: ["Words: ‘Lina heard a crash.’", "Picture: a broken flowerpot", "Words and picture together"],
          matchRight: ["what may have made the sound", "an event and its likely source", "what Lina heard"],
          answer: "Words: ‘Lina heard a crash.’ → what Lina heard; Picture: a broken flowerpot → what may have made the sound; Words and picture together → an event and its likely source",
          reason: "The separate clues and their combined message are identified accurately",
          hint: "First use each clue alone, then put them together.",
          vocabulary: "word clue"
        },
        {
          type: "single",
          question: "A frog page says ‘Frogs hatch from eggs’ beside a labelled life-cycle diagram. What does the diagram add?",
          answers: ["Visible stages from egg to frog", "The author's favourite colour", "A made-up adventure"],
          answer: "Visible stages from egg to frog",
          reason: "The diagram visually shows details and sequence that extend the fact",
          hint: "Look at what the labels and changing pictures make visible.",
          vocabulary: "image"
        },
        {
          type: "text",
          question: "The picture shows a child shivering in snow, but the words only say ‘Niko waited.’ Explain one detail the image adds.",
          answer: "For example: The image adds that Niko is waiting in cold, snowy weather.",
          reason: "The response names a visible setting detail not stated in the words",
          hint: "Describe something visible that changes how you understand the waiting.",
          vocabulary: "detail"
        },
        {
          type: "single",
          question: "Which information could words tell even if it is not visible in a picture of a girl smiling?",
          answers: ["Her name is Priya.", "Her mouth curves upward.", "She is wearing a red hat."],
          answer: "Her name is Priya.",
          reason: "A name can be supplied by words even when the image does not show it",
          hint: "Choose the information a viewer cannot know from appearance alone.",
          vocabulary: "word clue"
        },
        {
          type: "match",
          question: "Match each image type to a useful contribution.",
          matchLeft: ["story illustration", "labelled diagram", "photograph"],
          matchRight: ["shows a real visible example", "shows imagined characters or setting", "names parts clearly"],
          answer: "story illustration → shows imagined characters or setting; labelled diagram → names parts clearly; photograph → shows a real visible example",
          reason: "Each image type is connected to a way it can support meaning",
          hint: "Think about what each kind of image lets the reader see.",
          vocabulary: "image"
        },
        {
          type: "text",
          question: "Create words and an image description that work together to show a lost teddy being found under a bed; make each part add something different.",
          answer: "For example: Words—‘At last, Zara smiled.’ Image—Zara reaches under the bed and pulls out her missing teddy.",
          reason: "The words add the character's reaction while the picture clue shows the discovery action and place",
          hint: "Let one part tell a feeling and the other show what happened and where.",
          vocabulary: "combine"
        },
        {
          type: "text",
          question: "A reader looks only at the picture on a storm page and says, ‘The picture tells everything.’ Explain how to check that claim.",
          answer: "Read the words and compare them with the picture, then name any fact, name, time or idea supplied only by the words.",
          reason: "The checking process uses both sources before deciding what each contributes",
          hint: "Cover the words, notice what is unknown, then reveal and compare them.",
          vocabulary: "picture clue"
        }
      ]
    },
    AC9EFLA08: {
      title: "Words for Familiar People, Places and Topics",
      method: "connect the word to its meaning and use it in a fitting familiar context",
      vocabulary: ["vocabulary", "context", "meaning", "precise", "topic word"],
      questions: [
        {
          type: "single",
          question: "Which word means very big?",
          answers: ["enormous", "tiny", "narrow"],
          answer: "enormous",
          reason: "Enormous is the vocabulary choice whose meaning is very big",
          hint: "Picture an animal much bigger than expected.",
          vocabulary: "meaning"
        },
        {
          type: "fill-blank",
          question: "Complete the science sentence with a word meaning look carefully.",
          template: "We {{blank}} the snail as it moves.",
          answer: "observe",
          reason: "Observe precisely names the careful looking used in this school context",
          hint: "Use the classroom word that means look carefully.",
          vocabulary: "topic word"
        },
        {
          type: "match",
          question: "Match each word to its child-friendly meaning.",
          matchLeft: ["enormous", "observe", "prefer"],
          matchRight: ["like one choice more", "look carefully", "very big"],
          answer: "enormous → very big; observe → look carefully; prefer → like one choice more",
          reason: "Each useful word is connected to the idea it communicates",
          hint: "Put each word into a short sentence to test the match.",
          vocabulary: "vocabulary"
        },
        {
          type: "single",
          question: "Which word is most precise for the part that holds a flower up?",
          visual: "Simple plant diagram with arrows pointing to flower, leaf, stem and roots.",
          answers: ["stem", "thing", "bit"],
          answer: "stem",
          reason: "Stem names the plant part exactly in this school-topic context",
          hint: "Choose the word a plant diagram would use as its label.",
          vocabulary: "precise"
        },
        {
          type: "text",
          question: "Explain the football word ‘goalkeeper’ with a familiar example.",
          answer: "A goalkeeper is the player who protects the goal, such as the player who tries to stop the ball going into the net.",
          reason: "The explanation gives the topic word's meaning inside a familiar sport situation",
          hint: "Say what the player does and where the player is usually found.",
          vocabulary: "topic word"
        },
        {
          type: "fill-blank",
          question: "Use the context clue to complete the meaning.",
          template: "The kitten was timid, so it hid and would not come close; timid means {{blank}}.",
          answer: "shy or not confident",
          reason: "The hiding behaviour provides context for the unfamiliar word's meaning",
          hint: "Use what the kitten does after the word.",
          vocabulary: "context"
        },
        {
          type: "match",
          question: "Match each context to a precise useful word.",
          matchLeft: ["describing a very small seed", "watching a leaf closely", "choosing one game over another"],
          matchRight: ["prefer", "observe", "tiny"],
          answer: "describing a very small seed → tiny; watching a leaf closely → observe; choosing one game over another → prefer",
          reason: "Each word fits the meaning needed in its familiar context",
          hint: "Decide whether each situation needs a size, looking or choosing word.",
          vocabulary: "context"
        },
        {
          type: "text",
          question: "A child says a long word is always better than a short word. Use ‘enormous’ and ‘red’ to explain why the best word depends on the meaning needed.",
          answer: "Enormous fits when we need to say something is very big, while red fits when we need to name its colour, so length does not decide which word is best.",
          reason: "The comparison chooses vocabulary by precise meaning instead of word length",
          hint: "Ask whether the speaker needs to describe size or colour.",
          vocabulary: "precise"
        },
        {
          type: "text",
          question: "Teach the word ‘habitat’ to a classmate by giving its meaning, a familiar example and one clear sentence.",
          answer: "Habitat means the place where a living thing lives; a pond is a frog habitat; for example, ‘The pond is a habitat for frogs.’",
          reason: "The response develops new vocabulary through meaning, example and contextual use",
          hint: "State the meaning, give a familiar example and then say a new sentence.",
          vocabulary: "vocabulary"
        }
      ]
    },
    AC9EFLA09: {
      title: "Capital Letters and Ending Punctuation",
      method: "find the sentence beginning and names, then choose the ending punctuation that fits",
      vocabulary: ["capital letter", "punctuation", "full stop", "question mark", "sentence boundary"],
      questions: [
        {
          type: "single",
          question: "The written sentence is ‘Sam runs.’ Which description correctly names its beginning and ending clues?",
          answers: ["It begins with capital S and ends with a full stop.", "It begins with lower-case s and has no ending mark.", "It begins with capital S and has no ending mark."],
          answer: "It begins with capital S and ends with a full stop.",
          reason: "The capital S and full stop make both sentence boundaries visible",
          hint: "Check the first letter and the very last mark.",
          vocabulary: "sentence boundary"
        },
        {
          type: "fill-blank",
          question: "Complete the name of the ending mark.",
          visual: "Written example: The dog sleeps.",
          template: "The dot after sleeps is a {{blank}}.",
          answer: "full stop",
          reason: "The dot signals the end of this telling sentence",
          hint: "Name the small dot used at the end of a statement.",
          vocabulary: "full stop"
        },
        {
          type: "match",
          question: "Match each symbol or letter to its job.",
          matchLeft: ["M in Mia", ". — full stop", "? — question mark"],
          matchRight: ["ends a question", "capital for a name", "ends a telling sentence"],
          answer: "M in Mia → capital for a name; . — full stop → ends a telling sentence; ? — question mark → ends a question",
          reason: "The capital and punctuation marks are matched to their different written-text jobs",
          hint: "Decide first whether each item is a letter form or an ending mark.",
          vocabulary: "punctuation"
        },
        {
          type: "single",
          question: "Which ending mark fits ‘Can I play’ when the writer is asking?",
          answers: ["? — question mark", ". — full stop", ", — comma"],
          answer: "? — question mark",
          reason: "A question mark signals that the sentence asks something",
          hint: "Say the words aloud and listen for a question.",
          vocabulary: "question mark"
        },
        {
          type: "text",
          question: "A sentence is written with lower-case w at its beginning, lower-case t at the start of the name Tom, and no ending mark. Say the repaired sentence and name the three changes.",
          answer: "We saw Tom. Capital W begins the sentence, capital T begins the name Tom, and a full stop ends it.",
          reason: "The repair capitalises the sentence beginning and name, then adds a full stop",
          hint: "Check the first word, the person's name and the sentence end.",
          vocabulary: "capital letter"
        },
        {
          type: "match",
          question: "Match each message to a suitable ending mark.",
          matchLeft: ["We found it", "Where is Dad", "Watch out"],
          matchRight: ["! — exclamation mark", ". — full stop", "? — question mark"],
          answer: "We found it → . — full stop; Where is Dad → ? — question mark; Watch out → ! — exclamation mark",
          reason: "Each ending mark fits whether the message tells, asks or gives a strong warning",
          hint: "Read each message with the voice it needs.",
          vocabulary: "punctuation"
        },
        {
          type: "single",
          question: "Why is a full stop not a letter?",
          answers: ["It organises written meaning instead of helping spell a word.", "It is always bigger than a letter.", "It can only be printed in blue."],
          answer: "It organises written meaning instead of helping spell a word.",
          reason: "The explanation distinguishes the job of punctuation from the job of letters",
          hint: "Ask whether the mark builds a word or shows how the text is organised.",
          vocabulary: "punctuation"
        },
        {
          type: "text",
          question: "Correct this idea: ‘A capital letter belongs at the start of every new line.’",
          answer: "A capital letter belongs at the beginning of a sentence and for names, even when a sentence continues onto a new line.",
          reason: "The correction follows sentence boundaries and names rather than line position",
          hint: "Follow where the sentence begins and ends, not the edge of the page.",
          vocabulary: "capital letter"
        },
        {
          type: "text",
          question: "Write three short versions of one message: a telling sentence, a question and a strong warning; show the capital and ending mark in each.",
          answer: "For example: ‘The gate is open.’ ‘Is the gate open?’ ‘Shut the gate!’",
          reason: "The three versions use capitals and different ending punctuation to signal each message type",
          hint: "Begin each sentence with a capital, then choose full stop, question mark or exclamation mark.",
          vocabulary: "sentence boundary"
        }
      ]
    },
  };

  const tiers = [
    ["warm-up", "Warm-Up"], ["warm-up", "Warm-Up"], ["warm-up", "Warm-Up"],
    ["core", "Core"], ["core", "Core"], ["core", "Core"], ["core", "Core"],
    ["challenge", "Challenge"], ["challenge", "Challenge"]
  ];

  for (const [code, topic] of Object.entries(topics)) {
    const previous = banks[code] || {};
    const preservedOptionalQuestions = Array.isArray(previous.questions) ? previous.questions.slice() : [];
    const questions = topic.questions.map((question, index) => {
      const [tier, tierLabel] = tiers[index];
      const { reason, vocabulary, ...content } = question;
      return {
        id: code.toLowerCase() + "-topic-practice-" + String(index + 1).padStart(2, "0"),
        ...content,
        ...(content.visual ? { visualAlt: content.visual } : {}),
        enrichment: index >= 7,
        tier,
        tierLabel,
        summary: reason + " because we " + topic.method + ".",
        alignment: {
          concept: topic.title,
          vocabulary,
          method: topic.method
        }
      };
    });

    banks[code] = {
      ...previous,
      subject: "Foundation English",
      title: topic.title,
      questions,
      preservedOptionalQuestions,
      exportMeta: {
        curriculumCode: code,
        year: "Foundation",
        subject: "English",
        topicTitle: topic.title,
        publicBranding: "renderer-chrome-only",
        sheets: [
          { slug: "topic-practice-1", title: "Topic Practice 1", questionNumbers: [1, 2, 3, 4, 5] },
          { slug: "topic-practice-2", title: "Topic Practice 2", questionNumbers: [6, 7, 8, 9] }
        ]
      }
    };
  }
})();
