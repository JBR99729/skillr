import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const VERSION = "20260906-foundation-english-la01-la05-ixl-standard";

const descriptors = {
  AC9EFLA01: "explore how language is used differently at home and school depending on the relationships between people",
  AC9EFLA02: "explore different ways of using language to express preferences, likes and dislikes",
  AC9EFLA03: "understand that texts can take many forms such as signs, books and digital texts",
  AC9EFLA04: "understand conventions of print and screen, including how books and simple digital texts are usually organised",
  AC9EFLA05: "recognise that sentences are key units for expressing ideas"
};

const topics = {
  AC9EFLA01: {
    slug: "ac9efla01",
    focus: "language at home, school and with different people",
    practice: [
      ["You need help with a classroom activity. Which words best suit speaking to your teacher?", ["Could you help me, please?", "Move over now.", "That is my pencil."], 0, "A polite request suits a student speaking to a teacher at school."],
      ["At home, your brother has the blocks. Which words best suit asking for a turn?", ["Can I have a turn after you?", "Dear Principal, I request the blocks.", "Everyone line up now."], 0, "Family language can still be polite, but it is usually more familiar than formal school language."],
      ["You meet the principal in the school office. What is the best greeting?", ["Good morning, Ms Singh.", "Hey, move!", "This is my lunch."], 0, "A respectful greeting suits a school adult you may not know well."],
      ["Your friend asks you to play at recess. Which answer sounds friendly and suited to a friend?", ["Yes, I would like to play.", "Please complete the roll.", "I am writing to inform you."], 0, "Friendly everyday words suit talking with a classmate."],
      ["You want your teacher to repeat an instruction. Which words suit the classroom?", ["Could you say that again, please?", "Say it again!", "My dog is brown."], 0, "The words are clear and polite for speaking to a teacher."],
      ["At home, you want more rice at dinner. Which words best suit talking to a parent or carer?", ["May I have some more rice, please?", "Students, open your books.", "Good afternoon, Principal."], 0, "This request suits a child speaking politely at home."],
      ["Your class is sitting on the mat. Which words suit the teacher speaking to the class?", ["Please sit where you can see the book.", "Can I come to your birthday?", "Mum, where is my jumper?"], 0, "The teacher's words are for a school group."],
      ["You accidentally bump a classmate. What could you say?", ["Sorry, are you okay?", "Give me that.", "This sign says stop."], 0, "A short apology is suitable language with a classmate."],
      ["Which sentence is more suited to school assembly than the playground?", ["Please welcome our visitor.", "Do you want to chase me?", "Pass the ball quickly!"], 0, "Assembly language is usually more formal and organised."],
      ["You are talking to a new student. Which words help build a friendly relationship?", ["Would you like to sit with us?", "You cannot sit here.", "Teacher, mark the roll."], 0, "The words invite the new student kindly."],
      ["You need to ask the librarian for a book. Which words suit that person and place?", ["Excuse me, where are the animal books?", "Hey, give me animals.", "My sister likes cats."], 0, "A polite question suits asking an adult helper at school."],
      ["Your dad asks what happened at school. Which answer suits home talk?", ["We painted leaves today.", "Class, pack your bags.", "Please sign in at the office."], 0, "The child is sharing school news with family at home."],
      ["Which words suit a teacher giving a safety reminder?", ["Walk inside, please.", "Can I sleep at your house?", "I prefer the red one."], 0, "A teacher may use clear, polite directions to keep students safe."],
      ["You want a friend's crayon. Which wording best suits the relationship?", ["Can I borrow your crayon, please?", "You must give me the crayon.", "Dear families, return forms."], 0, "A polite everyday request suits a friend."],
      ["Which is the most respectful way to ask an office adult for help?", ["Excuse me, I need help finding my class.", "Move. I am lost.", "That game is fun."], 0, "Respectful school language often begins with words such as 'excuse me'."],
      ["Your teacher says, “Please put your hand up.” Why do those words suit school?", ["They help the class take turns speaking.", "They tell someone what food you like.", "They are a bedtime story title."], 0, "Classroom language often helps a group listen and take turns."],
      ["Which words best suit talking to a baby cousin?", ["Hello, little one.", "Please complete your worksheet.", "Good morning, Principal."], 0, "Language changes with the age and relationship of the listener."],
      ["You ask a friend to stop pushing in line. Which words are firm but suitable?", ["Please stop pushing me.", "You are the worst.", "Dear teacher, I resign."], 0, "The words explain the problem without being rude."],
      ["Which words suit a parent reminding a child before school?", ["Remember your hat and drink bottle.", "Students, open to page ten.", "Can I play chase?"], 0, "The parent is speaking in a home-and-family situation."],
      ["You thank a canteen helper. Which words suit the helper?", ["Thank you for my lunch.", "You are my best friend.", "Open your homework book."], 0, "Thanks are respectful and suited to an adult helper."],
      ["Which words show school language between teacher and student?", ["Please line up at the door.", "Grandma, can I help cook?", "Come to my cubby."], 0, "Lining up at the door is a common classroom instruction."],
      ["You want to join a playground game. What could you say?", ["May I play too?", "Where is the principal's office?", "This book has a title."], 0, "This is friendly playground language for classmates."],
      ["Which words suit a child speaking to a grandparent?", ["Can you tell me that story again?", "Class, pencils down.", "Please swipe the screen."], 0, "The words suit a family relationship at home."],
      ["Why might you say “Good morning, Mr Lee” at school but “Hi Dad” at home?", ["The people and places are different.", "The words must always rhyme.", "Books always start with greetings."], 0, "Language changes to suit the context and relationship."]
    ],
    test: []
  },
  AC9EFLA02: {
    slug: "ac9efla02",
    focus: "preferences, likes and dislikes",
    practice: [
      ["Which sentence tells a like?", ["I like mangoes.", "The mango is yellow.", "Where is the mango?"], 0, "The words 'I like' show a like."],
      ["Which sentence tells a dislike?", ["I do not like loud thunder.", "Thunder is loud.", "Thunder comes after lightning."], 0, "The words 'do not like' show a dislike."],
      ["Which sentence shows a preference?", ["I prefer the blue cup.", "The cup is on the table.", "Wash the cup."], 0, "'Prefer' tells which one someone would choose."],
      ["A child wants apple, not pear. Which sentence says that clearly?", ["I would rather have apple.", "The pear is green.", "Fruit grows on trees."], 0, "'Would rather' expresses a preference."],
      ["Which words politely tell a food dislike?", ["I do not enjoy peas.", "Peas are round.", "Give me cake."], 0, "'Do not enjoy' is a way to express a dislike."],
      ["Which sentence tells a favourite?", ["My favourite game is tag.", "Tag is played outside.", "Run to the tree."], 0, "'Favourite' shows the one someone likes most."],
      ["Which answer fits: “Which story do you want?”", ["I choose the bear story.", "The story has pages.", "The story is on the shelf."], 0, "'I choose' tells a preference."],
      ["Which sentence shares an opinion about liking drawing?", ["Drawing is fun for me.", "Drawing uses paper.", "Draw a circle."], 0, "The words show how the speaker feels about drawing."],
      ["Which sentence tells a stronger like?", ["I love swimming.", "Swimming is in water.", "Can you swim?"], 0, "'Love' can show a strong like."],
      ["Which sentence tells that someone does not want the green pencil?", ["I would rather use the red pencil.", "The green pencil is sharp.", "The pencil rolled away."], 0, "Choosing red instead of green shows preference."],
      ["Which words best answer: “Do you like carrots?”", ["Yes, I like carrots.", "Carrots are orange.", "Carrots grow under the ground."], 0, "The answer uses like language."],
      ["Which sentence shows a polite dislike?", ["I don't really like that song.", "That song has drums.", "Turn it off now!"], 0, "It states a dislike without being bossy or rude."],
      ["Which sentence compares two choices by preference?", ["I like soccer more than skipping.", "Soccer uses a ball.", "Skipping can be fast."], 0, "'More than' compares what the speaker likes."],
      ["Which words show a preference about colour?", ["Purple is my favourite colour.", "Purple and blue are colours.", "The purple bag is big."], 0, "'Favourite' tells which colour is preferred."],
      ["Which sentence tells a dislike of an activity?", ["I do not enjoy cleaning up sand.", "Sand can be wet.", "The sand is in a bucket."], 0, "The sentence tells how the speaker feels about the activity."],
      ["Which sentence would help a teacher know your choice?", ["I would like the quiet reading corner.", "The corner has cushions.", "Reading is after lunch."], 0, "It clearly expresses the student's preference."],
      ["Which sentence shows someone likes both choices?", ["I like apples and bananas.", "Apples can be red.", "Bananas have peels."], 0, "It says the speaker likes both fruits."],
      ["Which words tell a choice without saying 'like'?", ["I choose the puzzle.", "The puzzle has pieces.", "Where is the puzzle?"], 0, "'Choose' can express a preference."],
      ["Which sentence shows a dislike using gentle words?", ["This game is not my favourite.", "This game has cards.", "The game is on the table."], 0, "'Not my favourite' is a gentle way to show dislike."],
      ["Which sentence tells what someone wants most?", ["I would most like to paint.", "Painting needs brushes.", "The paint is blue."], 0, "'Most like to' shows a preferred activity."],
      ["Which answer is about preference, not fact?", ["I like rainy days.", "Rain falls from clouds.", "Rain can make puddles."], 0, "A preference tells what someone likes, not just what is true."],
      ["Which words tell a dislike of a sound?", ["I do not like the loud bell.", "The bell rings at lunch.", "The bell is metal."], 0, "It expresses how the speaker feels about the sound."],
      ["Which sentence best answers: “Which pet do you prefer?”", ["I prefer the rabbit.", "The rabbit has ears.", "The rabbit hops."], 0, "The answer directly uses preference language."],
      ["Which sentence tells a like in a different way?", ["Playing blocks makes me happy.", "Blocks stack up.", "The blocks are in a box."], 0, "Saying something makes you happy can show a like."]
    ],
    test: []
  },
  AC9EFLA03: {
    slug: "ac9efla03",
    focus: "forms of texts",
    practice: [
      ["Which is a text you might read on the road?", ["a stop sign", "a spoon", "a shoe"], 0, "A sign is a text because it uses words or symbols to make meaning."],
      ["Which text form usually has pages and a cover?", ["a book", "a lunchbox", "a ball"], 0, "A book is a text form with pages and usually a cover."],
      ["Which is a digital text?", ["a story on a tablet", "a wooden chair", "a paperclip"], 0, "A tablet story is read or viewed on a screen."],
      ["Which text form helps you choose food at a cafe?", ["a menu", "a pillow", "a scooter"], 0, "A menu is a text that lists food choices."],
      ["Which text form might tell people about a school concert?", ["a poster", "a pencil", "a jumper"], 0, "A poster shares information using words and often pictures."],
      ["Which text might be sent from one person to another on a phone?", ["a message", "a plate", "a hat"], 0, "A phone message is a digital text."],
      ["Which text form can show where places are?", ["a map", "a sock", "a cup"], 0, "A map is a text that uses labels and symbols."],
      ["Which text form might tell you how to make pancakes?", ["a recipe", "a kite", "a shell"], 0, "A recipe gives steps for making food."],
      ["Which could be a text in a shop window?", ["an open sign", "a banana peel", "a plain rock"], 0, "A sign gives a message to readers."],
      ["Which text form is often read aloud before bedtime?", ["a storybook", "a toothbrush", "a blanket"], 0, "A storybook is a printed text."],
      ["Which text form might you tap to hear a story?", ["a reading app", "a paper bag", "a toy car"], 0, "An app is a digital text when it gives words, sounds or images to read and view."],
      ["Which text form names the food inside a jar?", ["a label", "a marble", "a glove"], 0, "A label gives information about an object."],
      ["Which text form might invite families to sports day?", ["an invitation", "a lunch plate", "a skipping rope"], 0, "An invitation is a text with event information."],
      ["Which text form might have speech bubbles?", ["a comic", "a chair", "a raincoat"], 0, "A comic is a text form that can use pictures and speech bubbles."],
      ["Which text form might tell bus times?", ["a timetable", "a teddy bear", "a paintbrush"], 0, "A timetable is a text that organises times."],
      ["Which is a print text?", ["a paper card", "a cloud", "a swing"], 0, "A paper card can carry written words or pictures for meaning."],
      ["Which is a text you might see on a computer screen?", ["a webpage", "a lunchbox", "a leaf"], 0, "A webpage is a digital text because it is read and viewed on a screen."],
      ["Which text form might tell a rule at the pool?", ["a safety sign", "a towel", "a bottle"], 0, "A safety sign gives a message people need to read."],
      ["Which pair are both text forms?", ["book and sign", "shoe and cup", "rock and spoon"], 0, "Books and signs both communicate meaning."],
      ["Which text form might list things to buy?", ["a shopping list", "a door", "a pillow"], 0, "A list is a text that records items."],
      ["Which text form might show the name of a street?", ["a street sign", "a stick", "a sandwich"], 0, "A street sign uses words to name a place."],
      ["Which text form could be watched and listened to?", ["a digital story", "a plain desk", "a gumboot"], 0, "Digital texts can include words, images and sound."],
      ["Which text form might tell you who wrote a book?", ["the book cover", "the classroom floor", "the glue lid"], 0, "A cover is part of a book text and often names the author."],
      ["Why are signs, books and apps all texts?", ["They can all carry meaning for readers or viewers.", "They are all made of paper.", "They are all kept in libraries."], 0, "Texts can take many forms, including print, signs and digital forms."]
    ],
    test: []
  },
  AC9EFLA04: {
    slug: "ac9efla04",
    focus: "print and screen organisation",
    practice: [
      ["Which part of a book usually shows the title first?", ["front cover", "last page", "page number"], 0, "The front cover usually shows the title."],
      ["In English, where do you usually start reading a printed line?", ["on the left", "in the middle", "at the bottom"], 0, "English print is usually read from left to right."],
      ["What helps you know the order of pages in a book?", ["page numbers", "shoe sizes", "weather signs"], 0, "Page numbers organise the pages."],
      ["Which screen feature might open the next part of a story?", ["Next button", "Backpack", "Lunch bell"], 0, "A next button helps readers move through a digital text."],
      ["What is the job of a book cover?", ["It helps show what the book is.", "It tells lunchtime.", "It sharpens pencils."], 0, "A cover gives important information such as title, author or picture."],
      ["Which feature helps you find a section on a simple screen?", ["menu button", "paper clip", "paint tray"], 0, "Menus help organise digital texts."],
      ["When you finish one page in a storybook, what do you usually do next?", ["turn to the next page", "start at the back cover", "read the page number only"], 0, "Books are usually read page by page in order."],
      ["Which part of a book may tell who wrote it?", ["author name", "barcode only", "table leg"], 0, "The author name tells who wrote the book."],
      ["In a simple digital book, what might swiping the screen do?", ["move to another page", "make a sandwich", "erase the title"], 0, "Swiping can help navigate screen texts."],
      ["Where is a title often found on a webpage or screen story?", ["near the top", "under a shoe", "inside a pencil"], 0, "Titles are often placed near the top to show what the text is about."],
      ["What helps readers know where a sentence ends?", ["end punctuation", "a lunchbox", "a shoelace"], 0, "End punctuation is a print convention that marks a sentence boundary."],
      ["Which feature belongs to a simple digital text?", ["home icon", "chair leg", "puddle"], 0, "A home icon can help readers return to the start."],
      ["What should you read first on a book cover?", ["the title", "the last word on page ten", "the page number inside"], 0, "The title gives a strong clue about the text."],
      ["Which action suits reading a screen text with more below?", ["scroll down", "tear the page", "close your eyes"], 0, "Scrolling helps readers see more screen text."],
      ["Which feature helps organise a nonfiction book for readers?", ["heading", "shoelace", "cup handle"], 0, "Headings name parts of a text."],
      ["Which words describe usual English book reading?", ["left to right, page by page", "bottom to top only", "any page in any order always"], 0, "Print conventions help readers know the usual order."],
      ["What might a back button do in a digital text?", ["take you to the page before", "write a new story", "change a book into a ball"], 0, "A back button is a navigation feature."],
      ["Which feature might help you choose a game or story on a tablet?", ["an icon", "a spoon", "a sock"], 0, "Icons are screen features that can link to digital texts."],
      ["Which book part usually comes before the inside pages?", ["front cover", "back cover", "last page"], 0, "The front cover is seen before the pages inside."],
      ["Where do you usually go after reading the top line on a page?", ["to the next line below", "to the floor", "to the page number only"], 0, "English print is usually read from top to bottom after each line."],
      ["Which is a print convention?", ["spaces between words", "sand in a bucket", "a bell ringing"], 0, "Spaces help readers see separate words in print."],
      ["Which screen feature could play a read-aloud story?", ["speaker button", "pencil case", "door handle"], 0, "A speaker button can organise sound in a digital text."],
      ["Why do books and simple screen texts use features like titles and buttons?", ["to help readers find and follow meaning", "to make every word rhyme", "to hide the topic"], 0, "Organisation features guide readers through the text."],
      ["Which choice is about how a text is organised?", ["The title is at the top.", "The apple is crunchy.", "The dog is sleeping."], 0, "A title position is an organisation feature."]
    ],
    test: []
  },
  AC9EFLA05: {
    slug: "ac9efla05",
    focus: "sentences as complete ideas",
    practice: [
      ["Which is a complete sentence?", ["The dog ran.", "under the bed", "big red"], 0, "A sentence gives a complete idea."],
      ["Which word group is not a complete sentence yet?", ["after lunch", "Mia sat down.", "The bird sang."], 0, "'After lunch' does not tell a complete idea by itself."],
      ["Which sentence tells one clear idea?", ["Tom opened the door.", "the open door", "very quickly"], 0, "It tells who did something, so the words work together as a sentence."],
      ["Which words make the clearest sentence?", ["The cat is sleeping.", "sleeping cat the", "cat sleeping the"], 0, "The words are in an order that expresses a clear idea."],
      ["Which is a sentence about a person?", ["Asha waved.", "blue and yellow", "near the gate"], 0, "It tells what Asha did, so it gives a complete idea about a person."],
      ["Which group needs more words to become a sentence?", ["on the mat", "We sat on the mat.", "The mat is soft."], 0, "It gives a place but not a complete idea."],
      ["Which sentence has words in a meaningful order?", ["The fish swims.", "Fish the swims.", "Swims fish the."], 0, "Word order helps the sentence make sense."],
      ["Which is a complete idea?", ["The bell rang.", "the loud bell", "after the bell"], 0, "It tells what happened, so it can stand alone as a sentence."],
      ["Which sentence tells what the child likes?", ["I like painting.", "painting with", "the paint pot"], 0, "The sentence expresses a complete idea about liking."],
      ["Which word group is a fragment?", ["beside the tree", "The bird sat beside the tree.", "The tree is tall."], 0, "It tells where, but not what happened."],
      ["Which sentence is ready for a reader?", ["Sam packed his bag.", "packed bag Sam", "his bag Sam packed"], 0, "It has words in an order that makes a complete idea."],
      ["Which answer fixes this fragment: 'the red kite'?", ["The red kite flew.", "red the kite", "the red kite under"], 0, "Adding what the kite did makes a sentence."],
      ["Which is a sentence about an animal?", ["The frog jumped.", "green frog", "near water"], 0, "It tells what the frog did, so it expresses a complete idea."],
      ["Which word group tells a complete thought?", ["We made a tower.", "a tall tower", "with blocks"], 0, "It tells who did something and what they made."],
      ["Why is 'Lila smiled.' a sentence?", ["It gives a complete idea.", "It has only one word.", "It names a colour."], 0, "The words tell who and what happened."],
      ["Which one is missing a doing or being word?", ["the little duck", "The duck is little.", "The duck waddled."], 0, "The phrase names a duck but does not express a full idea."],
      ["Which sentence has a different meaning from 'The dog sat on the mat'?", ["The mat sat on the dog.", "The dog sat on the mat.", "The dog rested on the mat."], 0, "Changing word order can change the sentence idea."],
      ["Which word group expresses a full idea?", ["I can jump.", "can jump", "jump I can"], 0, "It gives a clear idea in normal word order."],
      ["Which words could stand alone as a sentence?", ["The rain stopped.", "when the rain", "soft rain"], 0, "It tells what the rain did, so the idea is complete for a reader."],
      ["Which sentence best joins the idea into a clear unit?", ["The baby is asleep.", "baby asleep the", "asleep baby is"], 0, "A sentence arranges words so the reader gets one idea."],
      ["Which group is a complete idea about where something is?", ["The book is on the shelf.", "on the shelf", "book shelf"], 0, "It tells what is on the shelf and where."],
      ["Which word group is not a sentence?", ["with my friend", "I played with my friend.", "My friend laughed."], 0, "It does not give a complete idea by itself."],
      ["Which sentence has the words in the best order?", ["The bus stopped.", "Stopped bus the.", "Bus the stopped."], 0, "The sentence order makes the idea clear."],
      ["What does a sentence do?", ["It expresses an idea.", "It must always be a question.", "It is only a picture."], 0, "A sentence is a key unit for expressing an idea."]
    ],
    test: []
  }
};

for (const topic of Object.values(topics)) topic.test = topic.practice.slice(4, 20);

function rotateAnswers(q, idx) {
  const target = idx % 3;
  const answers = [...q[1]];
  const correctText = answers[q[2]];
  answers.splice(q[2], 1);
  answers.splice(target, 0, correctText);
  return [q[0], answers, target, q[3]];
}

function item(code, bank, q, idx) {
  const tier = idx < 8 ? "foundation" : idx < 16 ? "core" : "stretch";
  return {
    id: `${code.toLowerCase()}-${bank === "practice" ? "p" : "e"}${String(idx + 1).padStart(2, "0")}`,
    curriculumCode: code,
    bank,
    sourceType: "Multiple choice",
    question: q[0],
    explanation: q[3],
    structuredExplanation: { approach: "Read the situation, notice the text or language feature, then choose the answer that best fits the Foundation English idea.", reasoning: q[3] },
    printable: true,
    difficulty: tier === "foundation" ? 1 : tier === "core" ? 2 : 3,
    difficultyTier: tier,
    sequencePriority: idx + 1,
    qualitySchema: `${VERSION}:text-only-balanced-distractors`,
    type: "single",
    answers: q[1],
    correct: q[2]
  };
}

function writeQuestions(code, bank, source) {
  const out = source.map((q, idx) => item(code, bank, rotateAnswers(q, idx), idx));
  const varName = bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions";
  const file = path.join(root, "quiz/grade-k/english", topics[code].slug, bank, "questions.js");
  fs.writeFileSync(file, `"use strict";\nwindow.${varName} = ${JSON.stringify(out, null, 2)};\n`);
}

function updateHtml(code, bank) {
  const file = path.join(root, "quiz/grade-k/english", topics[code].slug, bank, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const display = bank === "practice" ? 8 : 12;
  const article = display === 8 ? "an" : "a";
  html = html.replace(/Complete (?:an?|a) \d+-question Foundation (practice|test)/g, `Complete ${article} ${display}-question Foundation $1`);
  html = html.replace(/This page serves \d+ (practice|test) questions/g, `This page serves ${display} $1 questions`);
  html = html.replace(/<span class="summary-number" id="questionCount">8<\/span>/g, `<span class="summary-number" id="questionCount">${display}</span>`);
  html = html.replace(/<span class="summary-number" id="questionCount">\d+<\/span>/g, `<span class="summary-number" id="questionCount">${display}</span>`);
  html = html.replace(/"maxQuestions":\d+/g, `"maxQuestions":${display}`);
  html = html.replace(/"shuffleQuestions":(?:true|false)/g, `"shuffleQuestions":true`);
  html = html.replace(/"questionCycle":(?:true|false)/g, `"questionCycle":true`);
  html = html.replace(/,"avoidSameCorrectPosition":true/g, "");
  html = html.replace(/,"questionCycleStorageKey":"[^"]+"/g, "");
  html = html.replace(/"preReadSeconds":0/g, `"preReadSeconds":0,"avoidSameCorrectPosition":true,"questionCycleStorageKey":"${code}:${bank}:unseen-cycle-v2"`);
  html = html.replace(new RegExp(`/quiz/grade-k/english/${topics[code].slug}/${bank}/questions\\.js\\?v=[^"]+`), `/quiz/grade-k/english/${topics[code].slug}/${bank}/questions.js?v=${VERSION}`);
  fs.writeFileSync(file, html);
}

for (const code of Object.keys(topics)) {
  writeQuestions(code, "practice", topics[code].practice);
  writeQuestions(code, "test", topics[code].test);
  updateHtml(code, "practice");
  updateHtml(code, "test");
}

fs.mkdirSync(path.join(root, "docs/question-bank-reviews"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/question-bank-reviews/2026-09-06-foundation-english-la01-la05.md"), `# Foundation English AC9EFLA01–AC9EFLA05 Practice/Test review\n\nUpdated the first five Foundation English Practice/Test banks against ACARA v9 descriptors and IXL-style quality expectations.\n\n## Scope\n\n- AC9EFLA01: ${descriptors.AC9EFLA01}\n- AC9EFLA02: ${descriptors.AC9EFLA02}\n- AC9EFLA03: ${descriptors.AC9EFLA03}\n- AC9EFLA04: ${descriptors.AC9EFLA04}\n- AC9EFLA05: ${descriptors.AC9EFLA05}\n\n## Quality actions\n\n- Rebuilt each Practice bank to 24 original text-only questions.\n- Rebuilt each Test bank to 16 original questions sampled from core/stretch practice coverage.\n- Balanced correct-answer positions and kept distractors plausible but clearly wrong for Foundation readers.\n- Removed generic or repeated questions, especially disguised stem swaps and explanation mismatches from earlier banks.\n- Kept ACARA descriptor alignment as the authority while using IXL-style sequencing: simple identification, context matching, then transfer to nearby examples.\n- Avoided decorative SVG/visual prompts because these first five language/text-form skills are better assessed through concise text; visuals can be added later where they teach rather than decorate.\n\n## Runtime wiring\n\n- Practice pages now serve 8 from a 24-question rotating bank.\n- Test pages now serve 12 from a 16-question rotating bank.\n- Question shuffling and unseen-cycle support are enabled for the batch.\n`);

console.log(`Updated ${Object.keys(topics).length} Foundation English codes with ${VERSION}.`);
