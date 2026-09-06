(() => {
  "use strict";
  const api = window.SkillrFoundationEnglishStudentFacing;
  if (!api) return;
  const S=(q,a,w1,w2,why)=>({q,a,w1,w2,why});
  api.register({
    AC9EFLY01:{
      shortTitle:"Familiar texts and their purposes",
      childGoal:"I can recognise familiar texts and say what they are for.",
      bigIdea:"Stories, signs, labels and information texts are made for different purposes, such as entertaining, informing, warning or helping us do something.",
      routine:["Look at the text","Name the kind","Ask what it is for","Use a clue to explain"],
      vocabulary:["text","purpose","story","informative","symbol"],
      use:"identify familiar texts and connect each one to a likely purpose",
      misconception:"Choosing a purpose only from the picture without considering the whole text",
      fix:"Use the title, cover, symbols, words and images to work out what the text is for.",
      seeds:[
        S("What is the main purpose of a story book?","To tell or share a story.","To show a road rule.","To list the price of food.","A story book is an imaginative text made to tell a story."),
        S("What is the purpose of an EXIT sign?","To show people where to leave.","To tell a fairy tale.","To teach a rhyme.","The symbol and word give practical direction."),
        S("Which text would help you learn facts about frogs?","An information book about frogs.","A birthday card.","A pretend menu with no frog facts.","An informative text is made to give factual information."),
        S("A school crossing sign is used to do what?","Help people cross safely.","Tell a bedtime story.","Show someone's favourite food.","The sign has a safety purpose in an everyday environment."),
        S("Which cover is most likely an imaginative text?","A cover showing a talking dragon on an adventure.","A cover titled Facts About Weather.","A bus timetable.","A talking dragon adventure is a clue that the text is imaginative."),
        S("Which cover is most likely informative?","Amazing Facts About Sharks.","The Magical Moon Rabbit.","The Lost Fairy Crown.","The title promises factual information about sharks."),
        S("Three texts are all about farm animals. Why might we group them together?","They share the same topic.","They must all have the same purpose.","They must all be stories.","Texts can be grouped by topic even when their forms or purposes differ."),
        S("A school badge appears on a uniform. Why is the symbol used?","To show the school or group it belongs to.","To tell the weather.","To give cooking steps.","An emblem can communicate identity in an everyday setting."),
        S("Which clue helps you work out a text's purpose?","What the words and images are trying to help the reader know or do.","The reader's shoe size.","The colour of the table nearby.","Purpose is about what the text is made to do for its audience."),
        S("A recipe and a story both have words. What is different?","Their purposes are different.","Only the story is a text.","Only the recipe can have pictures.","Different texts can use similar features while serving different purposes.")
      ]
    },
    AC9EFLY02:{
      shortTitle:"Listening and voice in interactions",
      childGoal:"I can listen when others speak and use a voice volume that suits the situation.",
      bigIdea:"Good interaction includes listening to others, taking turns, following instructions and adjusting voice volume for the place and audience.",
      routine:["Look or orient to the speaker","Listen","Wait for your turn","Use a suitable voice"],
      vocabulary:["listen","turn","volume","instruction","audience"],
      use:"participate in informal and structured interactions using listening behaviours and suitable voice volume",
      misconception:"Thinking speaking louder always makes communication better",
      fix:"Choose a volume that suits the place, distance and number of listeners.",
      seeds:[
        S("Your classmate is sharing an idea. What should you do?","Listen until they finish.","Talk over them.","Start a different conversation.","Waiting and listening helps everyone take part in the interaction."),
        S("Which voice suits a quiet classroom conversation with one partner?","A soft speaking voice.","A playground shout.","No voice at all when you need to answer.","Volume should fit the indoor setting and nearby listener."),
        S("You are speaking to the whole class from the front. What should you do?","Use a clear voice that everyone can hear.","Whisper so only one person hears.","Turn away and mumble.","An audience needs enough volume and clarity to hear the speaker."),
        S("Which behaviour shows listening without interrupting?","Wait, then respond when the speaker finishes.","Call out while the speaker is talking.","Start humming loudly.","Taking turns shows that you are listening to the other speaker."),
        S("A teacher says, ‘Put your book away and sit on the mat.’ What shows good listening?","Do the two steps in the instruction.","Keep reading and ignore it.","Do a different activity.","Following the instruction shows that the message was heard and understood."),
        S("Outside on the oval, your friend is several metres away. What might change?","You may need a louder voice than indoors.","You must always whisper.","You should stop using words.","Voice volume can change with distance and setting."),
        S("In a small-group discussion, how can you contribute?","Listen to others and add an idea when it is your turn.","Speak for the whole time.","Ignore every other idea.","Group interaction involves both listening and contributing."),
        S("Which is an informal speaking situation?","Pretend shop play with a friend.","A printed road sign.","A silent worksheet.","Play-based interaction can involve imaginative spoken language."),
        S("If looking directly at the speaker is not culturally appropriate, what is still important?","Show listening in a respectful way that suits the context.","Interrupt constantly.","Walk away every time someone speaks.","Listening behaviour can vary while still showing respectful attention."),
        S("Which choice uses volume well?","Speak softly beside a friend and more clearly to a large group.","Use the same shout everywhere.","Whisper across a noisy playground.","Effective speakers adjust volume to the listener and situation." )
      ]
    },
    AC9EFLY03:{
      shortTitle:"Imaginative and informative texts",
      childGoal:"I can tell some differences between imaginative and informative texts.",
      bigIdea:"Imaginative texts create stories or imagined worlds; informative texts give information that can help us learn about real topics or complete tasks.",
      routine:["Look at the text","Ask story or information","Find a clue","Explain the difference"],
      vocabulary:["imaginative","informative","fact","story","purpose"],
      use:"identify differences between imaginative and informative texts using words, images and purpose",
      misconception:"Thinking every text with pictures is imaginative",
      fix:"Ask whether the text is mainly telling an imagined story or giving information about a topic.",
      seeds:[
        S("Which text is imaginative?","A story about a talking wombat flying to the moon.","A fact sheet about wombat habitats.","A labelled diagram of a wombat.","The talking-animal adventure is imagined rather than presented as factual information."),
        S("Which text is informative?","A page explaining how rain forms.","A story about a cloud that goes to school.","A poem about a dancing star.","The page is made to explain factual information."),
        S("A book says, ‘Koalas sleep for many hours each day’ and has labelled photos. What kind of text is it most likely?","Informative.","Imaginative.","A shopping list.","Facts and labelled photos are clues to an informative text."),
        S("A story shows a fox wearing boots and speaking to a rabbit. What is a clue that it is imaginative?","Animals are acting like people in an invented story.","The book uses words.","The pages have numbers.","Talking animals are a common imaginative feature."),
        S("You need to find out what bees eat. Which text should you choose?","An information book about bees.","A fairy tale about a bee king.","A rhyme about buzzing.","An informative text is the better choice for finding factual information."),
        S("Which image is more likely in an informative animal text?","A labelled photo showing body parts.","A dragon wearing a crown.","A talking fish driving a bus.","Labels and realistic images often support factual information."),
        S("Which image is more likely in an imaginative story?","A mouse sailing in a teacup.","A labelled map of Australia.","A chart showing frog growth.","The impossible scene is a clue that the text is imaginative."),
        S("Two books are both about dinosaurs. One tells a made-up adventure and one gives facts. What is different?","Their purpose and content.","Only one can have pages.","Only one can use pictures.","Texts on the same topic can be imaginative or informative depending on purpose."),
        S("Which question helps you decide the text type?","Is this mainly telling an imagined story or giving information?","What colour are my shoes?","How tall is the reader?","The question focuses on the main purpose and content of the text."),
        S("A text can help with a task by showing real steps. What kind of text is it most likely?","Informative.","Imaginative.","A fictional character only.","Instructions give practical information that helps a reader do something." )
      ]
    },
    AC9EFLY04:{
      shortTitle:"Reading decodable and authentic texts",
      childGoal:"I can use letter sounds, familiar words and meaning clues to read a text and notice when it stops making sense.",
      bigIdea:"Beginning readers combine phonic decoding, high-frequency words, context and simple grammar to read and monitor meaning.",
      routine:["Start in the right place","Say the sounds","Blend the word","Check that the sentence makes sense"],
      vocabulary:["decode","blend","context","meaning","high-frequency word"],
      use:"read simple texts using developing phonics and monitor meaning while reading",
      misconception:"Guessing a word from the picture without checking the letters",
      fix:"Use the letters and sounds first, then check the word against the sentence meaning.",
      seeds:[
        S("You see the word ‘sat’. Which sounds help you read it?","s-a-t","s-o-p","m-a-p","The letters in ‘sat’ represent /s/ /a/ /t/, which blend to make the word."),
        S("After saying /m/ /a/ /p/, what word do you read?","map","mop","mat","Blending the three phonemes produces ‘map’."),
        S("Where should you begin reading a simple page of English text?","At the first word in the reading order.","At a random word near the bottom.","At the last letter of the page.","Correct navigation helps the reader match spoken words to written words in order."),
        S("The sentence says ‘The cat sat.’ You read ‘The cat sun.’ What should you do?","Stop and check the letters because the sentence does not make sense.","Keep going without checking.","Change every word in the sentence.","Readers monitor meaning and return to the word when something does not fit."),
        S("You come to an unknown CVC word ‘fin’. What is a good first step?","Say the sounds /f/ /i/ /n/.","Guess from the page colour.","Skip every unknown word.","Phonic decoding uses the letters and their sounds to work out the word."),
        S("Which word is a familiar high-frequency word that may be recognised quickly?","the","zog","vup","‘The’ is a common high-frequency word beginning readers meet often."),
        S("A picture shows a dog, but the printed word begins with c. Should you guess ‘dog’?","No, check the letters and sounds.","Yes, pictures always replace decoding.","Yes, the first letter does not matter.","Meaning clues help, but the written letters must also match the word."),
        S("You read ‘A red hen ran.’ Which reading behaviour shows one spoken word matched to one written word?","Point or track each word as you say it.","Say two extra words between every printed word.","Skip all spaces.","Tracking supports one-to-one matching between spoken and written words."),
        S("What should you do if a sentence still does not make sense after decoding a word?","Pause and ask for support or reread.","Pretend it makes sense.","Replace the whole sentence with a guess.","Monitoring meaning includes noticing breakdowns and seeking help when needed."),
        S("Which strategy uses both phonics and meaning?","Blend the letters, then check whether the word fits the sentence.","Look only at the picture.","Say the first word that comes to mind.","Accurate early reading combines decoding with a meaning check." )
      ]
    },
    AC9EFLY05:{
      shortTitle:"Comprehension strategies",
      childGoal:"I can use thinking strategies to understand and talk about a text.",
      bigIdea:"Readers and listeners can visualise, predict, connect, summarise and ask questions to build and check understanding.",
      routine:["Think before","Notice while reading or listening","Use a strategy","Tell the important meaning"],
      vocabulary:["predict","visualise","connect","summarise","question"],
      use:"use simple comprehension strategies to understand texts listened to, viewed or read",
      misconception:"Retelling every tiny detail instead of choosing important information",
      fix:"Focus on the key event, fact or idea that helps explain what the text is mostly about.",
      seeds:[
        S("The cover shows dark clouds and a child holding an umbrella. What is a sensible prediction?","It may rain in the story.","The story must be about baking a cake.","Nothing can happen next.","The title or cover can provide clues for a reasonable prediction."),
        S("A story says, ‘The puppy ran to the gate when Dad came home.’ What is the key event?","The puppy ran to greet Dad.","The gate has hinges.","Dad wears shoes.","A summary keeps the important event rather than unrelated details."),
        S("An information text says, ‘Penguins have feathers and cannot fly.’ Which fact can you tell?","Penguins have feathers.","Penguins are made of ice.","Penguins can all fly.","The answer comes directly from a key fact in the text."),
        S("While listening to a story, which question helps you understand a character?","Why did the character hide?","What colour is my pencil?","How many chairs are here?","Questions about the text help focus comprehension."),
        S("The story describes warm sand under bare feet. What strategy is being used when you picture it in your mind?","Visualising.","Skipping.","Alphabetising.","Visualising means forming a mental image from text details."),
        S("A character moves to a new house. You remember moving house too. What strategy are you using?","Connecting.","Counting.","Rhyming.","Connecting links the text to knowledge or experience you already have."),
        S("Which is the best short summary of ‘A bird builds a nest, lays eggs and feeds its chicks’?","A bird cares for its nest and chicks.","The word bird has four letters.","The nest is somewhere.","The summary combines the important ideas in a short statement."),
        S("You are listening for what a character is wearing. What should you do?","Listen for details about the character's clothes.","Ignore every description.","Think only about the cover colour.","Listening for a specific purpose helps you notice relevant details."),
        S("A sequence of pictures shows seed → sprout → plant. What comprehension action helps explain it?","Tell the ideas in order.","Mix the pictures randomly.","Name only the page number.","Sequencing supports an accurate retell of information or events."),
        S("After reading, you realise you do not understand why the event happened. What could you do?","Ask a question and reread or discuss the clue.","Pretend you understood.","Forget the whole text.","Questioning helps readers notice and repair gaps in understanding." )
      ]
    },
    AC9EFLY06:{
      shortTitle:"Creating and editing short written texts",
      childGoal:"I can create a short text and help edit capitals, punctuation and simple spellings.",
      bigIdea:"Beginning writers use known words, sound-letter knowledge, sentence punctuation and shared editing to record ideas and events clearly.",
      routine:["Say the idea","Write the sentence","Check sounds and words","Edit the beginning and ending"],
      vocabulary:["write","edit","capital","punctuation","spell"],
      use:"create and edit short written texts using learnt vocabulary, sentence boundaries and plausible spellings",
      misconception:"Thinking the first draft must never be changed",
      fix:"Writers reread and edit so the message is clearer and easier to read.",
      seeds:[
        S("Which is a good short sentence to record an event?","We went to the park.","Went park the.","Park we the to.","The sentence records a clear event in a readable order."),
        S("You write ‘the dog ran.’ What should you edit?","Change the first t to a capital T.","Remove every space.","Change dog to a random word.","A sentence begins with a capital letter."),
        S("You write ‘I can hop’ at the end of a sentence. What is missing?","An ending punctuation mark.","Another capital in the middle of every word.","A picture of a bus.","Basic sentence boundary punctuation shows where the sentence ends."),
        S("You want to spell ‘cat’. Which letters match the sounds /c/ /a/ /t/?","c-a-t","c-o-g","m-a-t","Sound-letter relationships help beginning writers spell CVC words."),
        S("Which action is shared editing?","Read the sentence together and circle the missing capital.","Hide the writing and never reread it.","Replace the whole idea with a drawing only.","Shared editing means looking at the text together and making a helpful change."),
        S("A child writes about a class trip and draws the bus beside the sentence. What are they doing?","Using writing and drawing to communicate an event.","Making an unrelated pattern.","Avoiding communication.","Beginning texts can combine words and drawings to represent ideas and events."),
        S("Why might a child read their own sentence back to an experienced writer?","To check that the writing says what they meant.","To make the paper heavier.","To avoid thinking about meaning.","Reading back helps connect the intended message with the written text."),
        S("Which spelling is the best attempt for the spoken word /d/ /o/ /g/?","dog","dig","fog","The letters d-o-g represent the three sounds in the spoken word."),
        S("Which sentence has clear boundaries?","Mia ran. She stopped.","mia ran she stopped","Mia ran she stopped","Capitals and full stops mark the beginnings and endings of the two sentences."),
        S("You reread ‘I lik mi dog.’ Which edit uses sound-letter knowledge?","Change ‘lik’ to ‘like’ if that spelling has been learnt, while keeping the intended sentence.","Delete the whole sentence because it is not perfect.","Change dog to sun for no reason.","Editing uses growing word and spelling knowledge to make the written message clearer." )
      ]
    },
    AC9EFLY07:{
      shortTitle:"Creating short spoken texts",
      childGoal:"I can give a short spoken report about an idea or event using a voice my listeners can hear.",
      bigIdea:"A short spoken text stays on topic, puts ideas in a useful order and uses voice features such as appropriate volume for the audience.",
      routine:["Choose the topic","Put ideas in order","Speak clearly","Use a suitable volume"],
      vocabulary:["spoken text","report","topic","sequence","volume"],
      use:"create and deliver short spoken texts about ideas and events to peers",
      misconception:"Adding unrelated ideas because they come to mind",
      fix:"Use a picture or simple sequence to stay on the chosen topic.",
      seeds:[
        S("You are telling the class about a caterpillar you found. What should you talk about?","The caterpillar and what you noticed.","A completely unrelated television show.","Every topic you can remember.","A short spoken report should stay on its chosen topic."),
        S("Which opening suits a short report to classmates?","Yesterday I found a tiny shell at the beach.","Blue jump sandwich seven.","I will say nothing about my topic.","The sentence introduces the event clearly for listeners."),
        S("You are speaking to the whole class. Which volume is best?","Clear enough for the group to hear without shouting.","A whisper only the nearest person can hear.","A scream as loud as possible.","Volume should suit the audience and setting."),
        S("Which order makes a personal event easier to follow?","First what happened, then what happened next, then how it ended.","Ending, random detail, beginning.","Unrelated facts in any order.","Sequencing helps listeners follow the report."),
        S("How can picture cards help before speaking?","They can remind you of the topic and order of ideas.","They make listening unnecessary.","They replace every spoken word.","Visual prompts can support staying on topic and sequencing ideas."),
        S("A child discovered a blue feather and wants to share it. Which sentence fits?","I found this blue feather near the oval today.","My lunch was in a box yesterday.","I will tell three unrelated jokes.","The sentence reports the discovery clearly and stays on topic."),
        S("Which choice shares a personal response to a story?","I liked the ending because the friends helped each other.","The book has a spine.","Our classroom has windows.","A spoken response can report a personal thought about an idea or event from a text."),
        S("During your report, you forget what comes next. What could help?","Look at your next picture prompt.","Change to a random topic.","Stop listening to yourself.","A visual prompt can cue the next planned idea."),
        S("Which ending suits a short report about planting a seed?","Now I am waiting to see the first shoot grow.","Anyway, my shoes are red.","Here is an unrelated riddle.","The ending stays connected to the reported event."),
        S("What should a speaker do after practising a short report?","Check that the ideas are clear, in order and loud enough for the audience.","Add as many unrelated details as possible.","Speak faster than anyone can understand.","A useful final check focuses on topic, sequence and voice." )
      ]
    }
  });
})();
