(() => {
  "use strict";
  const api = window.SkillrFoundationEnglishStudentFacing;
  if (!api) return;
  const S=(q,a,w1,w2,why)=>({q,a,w1,w2,why});
  api.register({
    AC9EFLE01:{
      shortTitle:"Sharing ideas about literature",
      childGoal:"I can share an idea about a story, poem or picture and connect it to my own experience.",
      bigIdea:"Literature can show people, places, routines and experiences that feel similar to or different from our own lives.",
      routine:["Listen or look","Notice an experience","Think about your own life","Share a connection"],
      vocabulary:["story","poem","experience","similar","different"],
      use:"share ideas about literature and make simple connections with personal experiences",
      misconception:"Only retelling what happened without sharing a thought or connection",
      fix:"Say what you noticed and how it is similar to or different from something you know.",
      seeds:[
        S("A story child feels nervous on the first day of school. Which response makes a connection?","I felt nervous on my first day too.","The book has pages.","School starts in the morning.","The response connects the character's experience with the reader's own experience."),
        S("A story family eats together outside. Your family usually eats inside. What could you say?","That is different from my family because we usually eat inside.","The picture has a table.","All families eat the same way.","The response notices a difference and connects it to personal experience."),
        S("Which response shares an idea about a poem?","The poem reminds me of playing in the rain.","The poem has black letters.","The page is made of paper.","The reader shares a personal connection to the poem."),
        S("A picture book shows a child visiting grandparents. Which response shows a similar experience?","I visit my grandparents too.","Grandparents are adults.","The cover is blue.","The response links the text experience to something similar in the reader's life."),
        S("A story is set in a remote community you have not visited. Which response is thoughtful?","This place is different from where I live, so I can notice what is new to me.","It must be exactly like my home.","I should ignore the setting.","Readers can notice and respect experiences that differ from their own."),
        S("A story character eats a food that is new to you. What could you say?","That food is different from what I usually eat, and I would like to learn about it.","The character is wrong to eat it.","Everyone eats the same food.","The response notices a cultural or personal difference without judging it."),
        S("Which question helps you connect a story to your own life?","Has something like this happened to me?","How many letters are on the cover?","Is the chair beside me red?","The question invites a comparison between the story and personal experience."),
        S("A character helps a younger child. You have helped your sibling before. Which response fits?","That reminds me of helping my sibling.","The character is on page five.","Helping is a six-letter word.","The response connects the event to a similar experience."),
        S("You hear a story told aloud and also see pictures with it. What can you share?","An idea about the story and something the pictures helped me notice.","Only the number of chairs in the room.","Nothing because it was spoken.","Literature can be experienced through spoken, visual, print and digital forms."),
        S("Which response shows that two experiences can both be valid?","The character's family does it differently from mine, and both are ways families can live.","My way is the only right way.","Different means wrong.","Readers can notice differences without ranking one experience above another.")
      ]
    },
    AC9EFLE02:{
      shortTitle:"Responding to stories",
      childGoal:"I can say what I think or feel about story events and characters.",
      bigIdea:"A response to literature links a thought or feeling to something that happened in the text or to a character.",
      routine:["Remember the event","Name the character","Say your thought or feeling","Give the story clue"],
      vocabulary:["character","event","feeling","thought","response"],
      use:"respond to story events and characters through talk, drawing or beginning writing",
      misconception:"Giving a feeling that has no connection to the story",
      fix:"Name the event or character that made you think or feel that way.",
      seeds:[
        S("The puppy finds its lost owner. Which response connects a feeling to the event?","I felt happy when the puppy found its owner.","Puppies have four legs.","The page has a picture.","The feeling is linked directly to an event in the story."),
        S("A character shares lunch with a friend. Which response is about the character?","I think the character was kind.","Lunch can be in a box.","The story has ten pages.","The response gives a thought about the character's action."),
        S("The bear loses its hat. Which response fits the event?","I felt worried because the bear could not find its hat.","Hats can be red.","Bears are animals.","The response links the feeling to what happened."),
        S("A character keeps trying to climb after falling. What might you think?","The character is determined.","The book is heavy.","The cover is shiny.","The repeated effort gives a reason for the thought about the character."),
        S("Which drawing would be a personal response to a story about a storm?","A drawing of the storm scene with a worried face beside it.","A random row of numbers.","A picture unrelated to the story.","A drawing can show a feeling or idea connected to the text."),
        S("A story ends with two friends making up after an argument. Which response fits?","I am glad they listened to each other.","The last page is paper.","Friends always agree.","The response expresses a thought about the ending event."),
        S("A character refuses to help and another child feels sad. Which response gives a thought?","I think the character could have helped.","The sentence has six words.","The picture uses green.","The response evaluates the character's action in the story."),
        S("Which sentence connects a story event to your own experience?","The camping scene reminds me of camping with my family.","Camping has seven letters.","The book is square.","The sentence connects the story to something the reader experienced."),
        S("A character is scared of the dark. Which response is suitable?","I understand because I sometimes feel scared in the dark too.","Dark is a colour word.","The page should be brighter.","The response links the character's feeling to the reader's own feeling."),
        S("Which response tells both what happened and what you think?","Mina returned the lost toy, and I think that was honest.","Mina is a name.","The toy is small.","It names the event and gives a thought about the character's action.")
      ]
    },
    AC9EFLE03:{
      shortTitle:"Literary text types and story features",
      childGoal:"I can recognise literary texts and find characters, events, beginnings and endings.",
      bigIdea:"Stories, poems and other literary texts have features that help us recognise how they are shaped and told.",
      routine:["Name the text type","Find the characters","Find what happens","Notice the beginning and ending"],
      vocabulary:["literary text","character","event","beginning","ending"],
      use:"identify types and familiar features of literary texts",
      misconception:"Mixing up a character with an event",
      fix:"A character is who is in the text; an event is what happens.",
      seeds:[
        S("In a story, what is a character?","A person or animal who takes part in the story.","The page number.","The full stop at the end.","Characters are the people, animals or beings involved in story events."),
        S("Which is an event in a story?","The fox finds a key.","The fox.","The book title.","An event is something that happens."),
        S("Which opening sounds like a familiar fairy-tale beginning?","Once upon a time, there was a tiny castle.","Wash hands for 20 seconds.","Milk: keep refrigerated.","‘Once upon a time’ is a familiar story opening pattern."),
        S("A story starts, ‘A girl called Amira lived beside the sea.’ What does the beginning introduce?","A character and a setting.","A shopping list.","A set of instructions.","The sentence introduces who the story is about and where she lives."),
        S("Which sentence sounds like a story ending?","At last, they were home safely.","First, open the packet.","This sign means stop.","The sentence closes what happened and signals the story is finishing."),
        S("Which feature is common in many fairy tales?","A problem that characters must face.","A table of bus times.","A list of ingredients only.","Fairy tales often organise events around a character problem and resolution."),
        S("A poem tells what happened to a bird across four short verses. Can it tell a story?","Yes, a story can be told through poetry.","No, only long books can tell stories.","No, poems cannot have events.","Literary stories can be shaped in different forms, including poetry."),
        S("Which pair are both story features?","characters and events","price and barcode","button and password","Characters and events are central features used to tell stories."),
        S("A story is told aloud by a storyteller rather than printed in a book. Is it still a literary text?","Yes, stories can be told orally as well as in print or images.","No, stories must always be printed.","No, spoken stories have no events.","Literary storytelling can be oral, visual, written or multimodal."),
        S("What should you look for to find how a story finishes?","The final event or ending words.","The first letter of the title only.","The colour of the chair nearby.","The ending shows how the story's events finish or resolve.")
      ]
    },
    AC9EFLE04:{
      shortTitle:"Rhythm and sound patterns",
      childGoal:"I can hear, copy and make rhythm and sound patterns in poems, rhymes and songs.",
      bigIdea:"Literary texts can use beat, rhyme, repeated sounds, words and actions to create patterns we can hear and perform.",
      routine:["Listen","Find the sound or beat","Say or clap it","Copy or make a new pattern"],
      vocabulary:["rhythm","rhyme","sound pattern","chant","repeat"],
      use:"recognise and replicate rhythm and sound patterns using voice, music and actions",
      misconception:"Looking only at what words mean and not listening to how they sound",
      fix:"Say the words aloud and listen for matching endings, repeated sounds and beats.",
      seeds:[
        S("Which pair rhymes?","cat / hat","cat / dog","sun / fish","‘Cat’ and ‘hat’ end with the same sound pattern."),
        S("Which pair rhymes?","light / night","light / leaf","night / nest","‘Light’ and ‘night’ share the same ending sound."),
        S("Which line has a repeated beginning sound?","Busy bees buzz.","The cat sleeps.","I see a moon.","The /b/ sound repeats at the start of nearby words."),
        S("A class claps clap-clap-pause, clap-clap-pause. What are they copying?","A rhythm pattern.","A book title.","A character name.","The repeated beat creates a rhythm pattern."),
        S("Which action could help children feel the rhythm of a rhyme?","Clapping the beat while saying it.","Covering their ears.","Reading random words silently.","Movement and clapping can make the beat easier to hear and copy."),
        S("Which two words have the same ending sound?","moon / spoon","moon / map","spoon / sun","‘Moon’ and ‘spoon’ rhyme in spoken English."),
        S("A chant repeats ‘step, step, stop’ three times. What pattern do you hear?","The words and beat repeat.","Every word is different.","There is no rhythm.","Repetition creates an easy-to-hear sound and rhythm pattern."),
        S("Which line is easiest to perform with a steady beat?","Tap your toes, tap your toes.","Blue because window quickly.","Chair apple seven cloud.","Repeated words create a clear rhythmic pattern."),
        S("You hear a poem with a strong repeated beat. What can you do to replicate it?","Say the line and copy the beat with your hands.","Change every word and ignore the beat.","Skip the poem completely.","Replicating means copying the sound or rhythm pattern you heard."),
        S("Which new word could continue the rhyme ‘day, play, ___’?","say","dog","sun","‘Say’ has the same ending sound as ‘day’ and ‘play’." )
      ]
    },
    AC9EFLE05:{
      shortTitle:"Retell and adapt familiar texts",
      childGoal:"I can retell a familiar story in order and change part of it in a new version.",
      bigIdea:"Retelling keeps the important characters and events in sequence; adapting changes something while the familiar story can still be recognised.",
      routine:["Remember the story","Put events in order","Retell the important parts","Change one part for a new version"],
      vocabulary:["retell","adapt","sequence","character","event"],
      use:"retell and adapt familiar literary texts through talk, play, performance, images or writing",
      misconception:"Changing so much that the original story can no longer be recognised",
      fix:"Keep the important story pattern, then change one character, setting, object or event.",
      seeds:[
        S("To retell a story, what should you do first?","Remember the important events.","Invent a completely different story.","Start with the last event every time.","A retell begins by recalling the important parts of the familiar story."),
        S("Which picture order makes sense for a retell?","Beginning → middle → ending.","Ending → beginning → random event.","Middle → unrelated picture → title.","Putting events in sequence helps the retell follow the story."),
        S("Which choice is an adaptation?","Retell the same story but change the forest to a beach.","Copy every word exactly.","Tell an unrelated story about space.","An adaptation keeps the familiar story but changes a part of it."),
        S("A child acts out a familiar character and the main events. What are they doing?","Retelling through performance.","Writing a shopping list.","Reading a road sign.","Play and performance are ways to retell literary texts."),
        S("Which change keeps a familiar story recognisable?","Keep the same problem but change the main character from a rabbit to a koala.","Remove every event and character.","Replace it with unrelated facts about weather.","A clear adaptation changes one element while keeping the story pattern."),
        S("You have four story pictures. What helps you retell accurately?","Put the pictures in the order the events happened.","Choose the pictures by colour only.","Mix them randomly each time.","Sequencing pictures supports an accurate retell."),
        S("Which retell includes an important event?","The girl loses the key, searches, then finds it under the rug.","The page is blue and square.","Keys are made of metal.","A retell focuses on what happened in the story."),
        S("You want to adapt a story through drawing. What could you do?","Draw the familiar events in a new setting.","Draw numbers unrelated to the story.","Copy the book cover only and stop.","Images can retell familiar events while showing an intentional change."),
        S("A child tells the beginning and ending but misses the main problem. What should be added?","The important middle event or problem.","A random fact about lunch.","A new title only.","The main events help listeners follow and recognise the story."),
        S("Which statement best explains retell and adapt?","Retell tells the familiar story; adapt changes part of it for a new version.","Both mean copy every word exactly.","Both mean make an unrelated text.","Retelling preserves the story sequence, while adapting intentionally changes part of it.")
      ]
    }
  });
})();
