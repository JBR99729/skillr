(() => {
  "use strict";
  const api = window.SkillrFoundationEnglishStudentFacing;
  if (!api) return;
  const S=(q,a,w1,w2,why)=>({q,a,w1,w2,why});
  api.register({
    AC9EFLA02:{
      shortTitle:"Likes, dislikes and preferences",
      childGoal:"I can show and say what I like, dislike or prefer.",
      bigIdea:"Feelings and preferences can be shown with words, voice, facial expression, gesture and images.",
      routine:["Notice the feeling","Look or listen for clues","Name the preference","Choose words that fit"],
      vocabulary:["like","dislike","prefer","feeling","gesture"],
      use:"recognise and express likes, dislikes and preferences using speech, gesture and visual clues",
      misconception:"Thinking a preference is a fact that everyone must agree with",
      fix:"A preference tells what one person likes or chooses; another person may choose differently.",
      seeds:[
        S("Which sentence tells that the speaker likes drawing?","I enjoy drawing pictures.","The paper is square.","Where are the crayons?","‘I enjoy’ tells us the speaker likes drawing."),
        S("Mia likes apples more than pears. What could she say?","I prefer apples.","Apples are fruit.","Put the pears away.","‘Prefer’ shows which choice Mia likes more."),
        S("Which sentence politely tells a dislike?","I do not like scratchy jumpers.","Scratchy jumpers are silly.","Everyone hates jumpers.","The speaker tells their own feeling without saying everyone must agree."),
        S("A child smiles, claps and says, ‘Again!’ What feeling is most likely?","The child enjoyed it.","The child is asking where it is.","The child cannot see it.","The smile, clapping and word ‘Again!’ are clues that the child liked it."),
        S("Which gesture could show that someone likes a performance?","Smiling and clapping.","Turning away and covering their ears.","Pointing at the floor to find a shoe.","Smiling and clapping commonly show enjoyment in this situation."),
        S("In an animation, a character frowns and pushes a plate away. What does this most likely show?","The character does not like the food.","The character wants a bigger plate.","The character is counting the food.","The frown and pushing-away action give visual clues about dislike."),
        S("An advertisement shows a child smiling while holding a toy. What feeling is the picture trying to show?","The child is happy with the toy.","The child has lost the toy.","The child is asleep.","The smile is a visual clue designed to show enjoyment."),
        S("Which sentence shows a favourite choice?","The swings are my favourite.","The swings are outside.","Are the swings wet?","‘Favourite’ tells us this is the speaker's top choice."),
        S("Leo likes both blocks and puzzles but chooses puzzles first. What could he say?","I like both, but I prefer puzzles.","Puzzles are the only good game.","Blocks are made of wood.","The sentence says he likes both and clearly names the choice he prefers."),
        S("A friend likes a different story from you. Which reply is friendly?","I like a different story best, and that is okay.","Your story is bad.","Everyone should choose mine.","People can have different preferences without one person's choice being wrong.")
      ]
    },
    AC9EFLA03:{
      shortTitle:"Texts can take many forms",
      childGoal:"I can recognise different kinds of texts and what they show or tell.",
      bigIdea:"A text can be a sign, book, label, set of instructions, oral story, image or digital text when it communicates meaning.",
      routine:["Look or listen","Name the text form","Find the message","Say what it helps us know"],
      vocabulary:["text","sign","book","label","instructions"],
      use:"identify familiar text forms and compare how they present information",
      misconception:"Thinking only books count as texts",
      fix:"Many forms can communicate meaning, including signs, labels, images, spoken stories and digital texts.",
      seeds:[
        S("Which item is a text made to communicate a message?","A STOP sign.","A plain pebble.","An empty patch of grass.","The sign was made to communicate the message to stop."),
        S("Which is a digital text?","A weather page on a tablet.","A wooden block.","A blank plate.","The weather page uses a screen to communicate information."),
        S("Which text would you most likely find on a food packet?","A product label.","A fairy-tale ending.","A playground map drawn in sand.","A product label gives information about the item in the packet."),
        S("Which text helps people know how to wash their hands?","A hand-washing instruction sign.","A birthday card.","A story about a dragon.","An instruction sign gives steps or reminders for a task."),
        S("A crossing sign and a picture book are both texts. What is one difference?","They present different kinds of messages in different forms.","Only the book can communicate meaning.","Only the sign has a purpose.","Both are texts, but their form and purpose are different."),
        S("Which pair are both familiar community texts?","A crossing sign and a shop label.","A cloud and a puddle.","A chair and a spoon.","Signs and labels are made to communicate information in community settings."),
        S("A set of picture instructions shows how to make a sandwich. What makes it a text?","The pictures communicate steps in order.","The paper is white.","The sandwich is food.","The ordered pictures carry information about what to do."),
        S("Two information texts show the same animal. One uses a photo and one uses a labelled drawing. What can we compare?","How each image presents the information.","Which paper is heavier.","Which reader is tallest.","Different text forms can present similar information in different ways."),
        S("Which example shows an oral text?","A storyteller tells a story aloud to a group.","A closed empty box.","A silent unmarked stone.","Spoken language can be a text when it communicates a story or message."),
        S("A school map and a sign both show where to go. What is the same?","Both communicate directions or location information.","Both must be story books.","Both must use the same pictures.","Different forms can communicate a similar kind of information.")
      ]
    },
    AC9EFLA04:{
      shortTitle:"How books and screens are organised",
      childGoal:"I can use book and screen clues to know where to start and what to do next.",
      bigIdea:"Print and digital texts use familiar conventions such as titles, pages, reading direction, images, buttons and tabs.",
      routine:["Find the title","Find the start","Follow the direction","Use page or screen clues"],
      vocabulary:["title","page","tab","image","direction"],
      use:"navigate books and simple digital texts using print and screen conventions",
      misconception:"Starting anywhere and reading in any direction",
      fix:"Use the title, starting point, reading direction and navigation features to guide you.",
      seeds:[
        S("Where do we usually start reading an English sentence?","At the left side.","At the far right side.","In the middle of the last word.","Standard Australian English is usually read from left to right."),
        S("After reaching the end of one line, where do you usually go?","To the start of the next line below.","Back to the cover every time.","To a random word above.","Print usually moves left to right and then down to the next line."),
        S("Which part tells the name of a book?","The title.","The page corner.","The table leg.","The title names the book or text."),
        S("A teacher asks where to start reading a picture book. What should you point to?","The first words on the first reading page.","The last word on the last page.","Any picture in the middle.","Readers use the organisation of the book to find the starting point."),
        S("On a simple website, what might a tab help you do?","Move to another section.","Sharpen a pencil.","Turn a paper page by itself.","A tab is a screen navigation feature that opens another section."),
        S("Which is a screen navigation clue?","A labelled button.","A shoelace.","A lunchbox handle.","Buttons can tell a reader where to tap or click next."),
        S("Words appear under a picture of a koala. What should a reader notice?","The placement shows the words and image belong together.","The words must be read backwards.","The picture has no connection to the text.","Where words and images are placed can help organise meaning."),
        S("Which action shows good book navigation?","Turn pages in order while following the text.","Jump between random pages for every word.","Read only the page numbers.","Following pages in order helps a reader move through the text."),
        S("A digital story has a right-arrow button. What is it most likely for?","Moving to the next page or screen.","Making the device heavier.","Changing the story into food.","An arrow button is a common navigation clue for moving forward."),
        S("Which pair are both organisation features of texts?","A title and a tab.","A sock and a cup.","A ball and a spoon.","Titles and tabs help organise or navigate texts.")
      ]
    },
    AC9EFLA05:{
      shortTitle:"Sentences express ideas",
      childGoal:"I can recognise a sentence that expresses a complete idea.",
      bigIdea:"A sentence is a key unit for expressing an idea, and word order helps the sentence make sense.",
      routine:["Read the words","Check the order","Ask if the idea is complete","Read it again"],
      vocabulary:["sentence","idea","word order","fragment","meaning"],
      use:"distinguish complete sentences from fragments and notice how word order changes meaning",
      misconception:"Thinking any group of words is a sentence",
      fix:"A sentence needs words in an order that communicates a complete idea.",
      seeds:[
        S("Which is a complete sentence?","The dog is sleeping.","The sleeping.","Dog the is.","The words are in an order that expresses a complete idea."),
        S("Which group is only a sentence fragment?","After school.","Dad will pick me up after school.","The bus stops here.","‘After school’ does not tell a complete idea by itself."),
        S("Which sentence makes sense?","The boy sat on the chair.","The chair sat on the boy.","Sat chair the on boy.","Word order helps show who did the action and where."),
        S("Which words express a complete idea?","Mia found her hat.","Found her.","Mia hat found her.","The sentence tells who and what happened in a clear order."),
        S("Which choice is a sentence?","Birds can fly.","Can fly.","Birds the can.","‘Birds can fly’ communicates a complete thought."),
        S("Why do ‘The dog chased the cat’ and ‘The cat chased the dog’ mean different things?","The word order changes who does the chasing.","The words have different colours.","One sentence has no words.","Changing word order can change the meaning of a sentence."),
        S("Which group needs more words to become a sentence?","In the garden.","The children play in the garden.","A bee lands on a flower.","‘In the garden’ gives a place but not a complete idea."),
        S("Which sentence tells one clear idea?","My red kite flew high.","Red kite high my.","Flew high.","The words work together in order to communicate an idea."),
        S("Which choice is NOT a complete sentence?","Under the table.","The ball rolled under the table.","I can see the ball.","‘Under the table’ is a phrase, not a complete idea."),
        S("Which sentence has the clearest word order?","The little frog jumped into the pond.","Into frog the little pond jumped.","Jumped pond little the.","The words are ordered so the reader can understand the idea.")
      ]
    },
    AC9EFLA06:{
      shortTitle:"Word groups work together",
      childGoal:"I can see how words in a sentence work together to make meaning.",
      bigIdea:"Words in a sentence have relationships: naming words can connect to actions and describing words can add detail to naming words.",
      routine:["Read the sentence","Find who or what","Find the action or description","Connect the words"],
      vocabulary:["word group","noun","verb","describing word","meaning"],
      use:"connect naming, action and describing words inside simple sentences",
      misconception:"Joining words randomly because they are next to each other",
      fix:"Ask what each word tells us and which other word it belongs with.",
      seeds:[
        S("In ‘The cat ate’, which word names the animal?","cat","ate","the","‘Cat’ names who the sentence is about."),
        S("In ‘The cat ate’, which word tells the action?","ate","cat","the","‘Ate’ tells what the cat did."),
        S("In ‘The black cat slept’, which word describes the cat?","black","slept","the","‘Black’ adds information about the cat."),
        S("Which words belong together to name the animal?","the small dog","ran quickly","small ran","‘The small dog’ works together as the group naming who ran."),
        S("In ‘Birds sing’, which words show who and what they do?","Birds / sing","Birds / birds","sing / sing","‘Birds’ names who; ‘sing’ tells the action."),
        S("Which sentence connects a describing word to a naming word clearly?","The red ball bounced.","The bounced red quickly.","Ball the bounced red.","‘Red’ describes the ball, while ‘bounced’ tells its action."),
        S("In ‘My wet shoes squeak’, what does ‘wet’ describe?","shoes","squeak","my","‘Wet’ gives more information about the shoes."),
        S("In ‘The baby laughs’, what does ‘laughs’ tell us?","What the baby does.","What colour the baby is.","Where the baby lives.","The verb ‘laughs’ tells the action."),
        S("Which pair shows a naming word and its action?","fish / swims","blue / quickly","the / a","‘Fish’ names the thing and ‘swims’ tells its action."),
        S("Which sentence has word groups working together clearly?","The fluffy rabbit hops.","Fluffy hops the rabbit.","Rabbit the fluffy hops the.","The describing word, naming word and action are connected clearly.")
      ]
    },
    AC9EFLA07:{
      shortTitle:"Images and words build meaning",
      childGoal:"I can use both the words and the picture to understand a text.",
      bigIdea:"Words and images can give the same information, different information, or extra clues that work together.",
      routine:["Read the words","Look at the image","Compare the clues","Combine the meaning"],
      vocabulary:["image","words","clue","meaning","detail"],
      use:"compare what words tell with what accompanying images show",
      misconception:"Using only the picture or only the words every time",
      fix:"Check both sources because each can add something to the meaning.",
      seeds:[
        S("The words say, ‘The puppy hid.’ The picture shows the puppy under a bed. What does the picture add?","Where the puppy hid.","The puppy's name.","The day of the week.","The image adds the location that the words do not give."),
        S("The words say, ‘A storm is coming.’ The image shows dark clouds and bending trees. What do they do together?","They both help show stormy weather.","They tell two unrelated stories.","The image cancels the words.","The words and image support the same meaning."),
        S("A picture shows three chicks, but the words say, ‘The hen watched her babies.’ What does the picture add?","It shows how many chicks there are.","It tells the author's address.","It shows the book price.","The number of chicks is visible in the image but not stated in the words."),
        S("The words say, ‘Sam wore boots.’ The picture also shows a yellow raincoat. What does only the picture tell?","Sam wore a yellow raincoat too.","Sam's name is Sam.","Sam wore boots.","The raincoat detail appears in the image but not in the sentence."),
        S("Which is the best way to understand a picture book page?","Use clues from both words and pictures.","Ignore every picture.","Read only the first word.","Combining both kinds of clues gives fuller meaning."),
        S("The image shows a smiling child, but the words say, ‘I felt nervous inside.’ What should a reader understand?","The picture and words give different clues about the feeling.","The words must be wrong.","Pictures always tell everything.","Words can tell information that is not obvious in the image."),
        S("An information page says, ‘Bees collect nectar.’ The image labels a flower and a bee. What does the image help with?","Seeing the bee and flower connected to the information.","Finding a story ending.","Choosing a favourite colour.","The labelled image supports the written information."),
        S("A story says, ‘The room was messy.’ The picture shows toys, books and clothes on the floor. What does the picture add?","Examples of what made the room messy.","A new main character.","The title of another book.","The image gives specific details that show the mess."),
        S("If you cover the picture on a page, what might you lose?","Visual details that add to the words.","Every written word.","The ability to turn the page.","Images can carry details that are not written in the text."),
        S("If you cover the words on a page, what might you lose?","Information the image does not show.","The colours in the image.","The shape of the page.","Written language can add meaning that the picture alone does not show.")
      ]
    },
    AC9EFLA08:{
      shortTitle:"Vocabulary for familiar topics",
      childGoal:"I can learn and use useful words for everyday and school topics.",
      bigIdea:"We grow vocabulary by noticing new words in talk, texts, images, play and school learning, then using them in the right context.",
      routine:["Hear or see the word","Work out the meaning","Connect it to the topic","Use the word"],
      vocabulary:["vocabulary","topic","meaning","context","specific word"],
      use:"recognise and use vocabulary from familiar experiences, interests and school topics",
      misconception:"Choosing a word only because it sounds familiar",
      fix:"Connect the word to the topic and what it means in that situation.",
      seeds:[
        S("During a lesson about weather, which word belongs to the topic?","rainfall","sandwich","shoelace","‘Rainfall’ is a word used when talking about weather."),
        S("In shop role-play, which word is useful for the customer?","price","pillow","planet","‘Price’ is useful vocabulary when buying and selling."),
        S("A class is learning about families. Which word fits the topic?","sibling","volcano","triangle","‘Sibling’ is a family-related word."),
        S("Which word means very big?","enormous","tiny","quiet","‘Enormous’ is vocabulary for something very large."),
        S("A science activity asks children to look carefully. Which word could the teacher use?","observe","bounce","whisper","‘Observe’ means to look carefully for information."),
        S("Which word best fits talking about a pet's body?","fur","receipt","traffic","‘Fur’ is useful vocabulary for describing many animals."),
        S("You learn the word ‘habitat’ while looking at animal pictures. What should you do next to build vocabulary?","Connect it to where an animal lives and use it in a sentence.","Forget the meaning and copy the letters only.","Use it for every object you see.","Using the meaning in context helps the new word become useful vocabulary."),
        S("Which word belongs in a classroom art discussion?","texture","engine","postcode","‘Texture’ is a useful word for describing how art materials look or feel."),
        S("A friend explains a new playground game and uses the word ‘boundary’. How can you learn the word?","Use the explanation and the marked play area to work out what it means.","Ignore the game and guess a random meaning.","Decide it must mean food.","Talk, objects and actions can all give context for learning vocabulary."),
        S("Which sentence uses a topic word clearly?","The roots hold the plant in the soil.","The roots are maybe something.","Plant word root yes.","‘Roots’ and ‘soil’ are used accurately in a plant-topic sentence.")
      ]
    },
    AC9EFLA09:{
      shortTitle:"Capital letters and punctuation",
      childGoal:"I can notice capital letters and punctuation and say what they do.",
      bigIdea:"Letters build words, while punctuation helps organise written sentences. Capitals can begin sentences and names; ending marks show where sentences finish.",
      routine:["Find the first letter","Look for names","Find the ending mark","Read the whole sentence"],
      vocabulary:["capital letter","full stop","question mark","exclamation mark","punctuation"],
      use:"identify capitals for sentence beginnings and names, and punctuation at sentence endings",
      misconception:"Thinking punctuation marks are ordinary letters",
      fix:"Letters are used to make words; punctuation marks help organise the written text.",
      seeds:[
        S("Which sentence begins with a capital letter and ends with a full stop?","Sam runs.","sam runs.","Sam runs","The capital begins the sentence and the full stop marks its end."),
        S("Which word needs a capital letter because it is a person's name?","Mia","dog","jump","Names begin with capital letters."),
        S("Which sentence uses a capital for a place name?","I live in Canberra.","I live in canberra.","i live in Canberra.","‘Canberra’ is a place name and needs a capital letter."),
        S("Which mark can show that a sentence is a question?","?","m","b","A question mark is punctuation used at the end of a question."),
        S("Which mark can show the end of a statement?",".","A","t","A full stop is punctuation that can mark the end of a sentence."),
        S("Which sentence is written correctly?","Where is Ben?","where is Ben?","Where is ben?","The sentence starts with a capital, the name Ben has a capital, and the question ends with a question mark."),
        S("Which character is punctuation, not a letter?","!","p","S","An exclamation mark is punctuation rather than a letter used to build a word."),
        S("Which sentence has the capital in the right place?","The cat is here.","the cat is here.","THe cat is here.","A sentence begins with one capital letter in ‘The’."),
        S("Your family name is Patel. Which spelling shows the capital correctly?","Patel","patel","paTel","A family name is a name, so it begins with a capital letter."),
        S("Which sentence has a clear beginning and ending?","Luca can swim!","luca can swim","Luca can swim","The capital shows the sentence beginning and the exclamation mark shows the ending.")
      ]
    }
  });
})();
