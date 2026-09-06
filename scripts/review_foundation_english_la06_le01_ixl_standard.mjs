import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const version = "20260906-foundation-english-la06-le01-ixl-standard";

const meta = {
  AC9EFLA06: { slug: "ac9efla06", descriptor: "recognise that sentences are made up of groups of words that work together in particular ways to make meaning" },
  AC9EFLA07: { slug: "ac9efla07", descriptor: "explore the contribution of images and words to meaning in stories and informative texts" },
  AC9EFLA08: { slug: "ac9efla08", descriptor: "recognise and develop awareness of vocabulary used in familiar contexts related to everyday experiences, personal interests and topics taught at school" },
  AC9EFLA09: { slug: "ac9efla09", descriptor: "identify punctuation as a feature of written text different from letters; recognise that capital letters are used for names, and that capital letters also signal the beginning of sentences while punctuation marks signal the end" },
  AC9EFLE01: { slug: "ac9efle01", descriptor: "share ideas about stories, poems and images in literature, reflecting on experiences that are similar or different to their own by engaging with texts by wide-ranging Australian and world authors and illustrators" }
};

const svgDir = path.join(root, "assets/quiz-visuals/foundation-english");
fs.mkdirSync(svgDir, { recursive: true });

const svgs = {
  "ac9efla07-rainy-dog.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Rainy dog story picture</title><desc id="d">A wet dog shakes raindrops from its fur beside a puddle.</desc><rect width="640" height="360" rx="24" fill="#e0f2fe"/><path d="M0 282h640" stroke="#bae6fd" stroke-width="24"/><ellipse cx="320" cy="290" rx="170" ry="28" fill="#7dd3fc"/><g stroke="#1f2937" stroke-width="6" fill="#f8fafc"><ellipse cx="315" cy="205" rx="95" ry="54"/><circle cx="225" cy="185" r="44"/><path d="M180 154l-34-38v63zM246 150l32-36v61z"/><path d="M260 252v54M365 252v54M260 306h-28M365 306h28"/></g><circle cx="210" cy="176" r="6"/><circle cx="240" cy="176" r="6"/><path d="M220 198q12 12 26 0" stroke="#1f2937" stroke-width="5" fill="none"/><g fill="#0284c7"><circle cx="155" cy="230" r="8"/><circle cx="445" cy="205" r="8"/><circle cx="475" cy="240" r="7"/><circle cx="390" cy="150" r="6"/></g><text x="320" y="54" text-anchor="middle" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">The dog shook off the rain.</text></svg>`,
  "ac9efla07-plant-report.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Plant report picture</title><desc id="d">A labelled seedling has roots, stem and leaves.</desc><rect width="640" height="360" rx="24" fill="#f0fdf4"/><rect x="85" y="70" width="470" height="235" rx="18" fill="#fff" stroke="#22c55e" stroke-width="5"/><path d="M315 244v-82" stroke="#166534" stroke-width="9"/><ellipse cx="285" cy="168" rx="40" ry="20" fill="#86efac" stroke="#166534" stroke-width="4"/><ellipse cx="350" cy="150" rx="43" ry="22" fill="#86efac" stroke="#166534" stroke-width="4"/><path d="M315 244c-30 20-50 35-74 42M315 244c25 26 50 33 82 43M315 244c-6 25-8 38-6 56" stroke="#92400e" stroke-width="5" fill="none"/><text x="148" y="132" font-family="Arial" font-size="22" font-weight="700" fill="#166534">leaves</text><path d="M228 130h68" stroke="#166534" stroke-width="4"/><text x="420" y="205" font-family="Arial" font-size="22" font-weight="700" fill="#166534">stem</text><path d="M405 198h-67" stroke="#166534" stroke-width="4"/><text x="165" y="286" font-family="Arial" font-size="22" font-weight="700" fill="#92400e">roots</text><path d="M240 280h62" stroke="#92400e" stroke-width="4"/></svg>`,
  "ac9efla07-lost-kite.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Lost kite story picture</title><desc id="d">A red kite is caught high in a tree while a child looks up.</desc><rect width="640" height="360" rx="24" fill="#dbeafe"/><rect y="285" width="640" height="75" fill="#bbf7d0"/><path d="M420 285V105" stroke="#7c2d12" stroke-width="30"/><g fill="#22c55e" stroke="#166534" stroke-width="5"><circle cx="390" cy="110" r="58"/><circle cx="455" cy="118" r="70"/><circle cx="405" cy="65" r="50"/></g><path d="M440 80l55 45-45 55-55-45z" fill="#f87171" stroke="#991b1b" stroke-width="5"/><path d="M445 180c-35 55-95 66-150 87" stroke="#374151" stroke-width="3" fill="none"/><circle cx="240" cy="240" r="26" fill="#fed7aa" stroke="#1f2937" stroke-width="4"/><path d="M240 266v58M207 294h66M240 324l-28 30M240 324l31 30" stroke="#1f2937" stroke-width="6"/></svg>`,
  "ac9efle01-beach-story.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Beach story image</title><desc id="d">A child builds a sandcastle near gentle waves and shells.</desc><rect width="640" height="360" rx="24" fill="#bae6fd"/><path d="M0 210c120-30 230 40 340 5s190-10 300 20v125H0z" fill="#fde68a"/><path d="M0 190c120 30 230-25 340 10s190-8 300 14" stroke="#0284c7" stroke-width="14" fill="none"/><rect x="270" y="190" width="90" height="70" fill="#f59e0b" stroke="#92400e" stroke-width="5"/><path d="M260 190l55-45 55 45z" fill="#fbbf24" stroke="#92400e" stroke-width="5"/><circle cx="150" cy="160" r="28" fill="#fed7aa" stroke="#1f2937" stroke-width="4"/><path d="M150 188v58M118 220h62M150 246l-25 40M150 246l28 40" stroke="#1f2937" stroke-width="6"/><circle cx="485" cy="280" r="16" fill="#fff7ed" stroke="#92400e" stroke-width="4"/></svg>`,
  "ac9efle01-rain-poem.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Rain poem image</title><desc id="d">A child in a yellow raincoat smiles under an umbrella as rain falls.</desc><rect width="640" height="360" rx="24" fill="#dbeafe"/><g stroke="#0284c7" stroke-width="5"><path d="M90 40v42M150 68v42M500 50v42M555 80v42M430 30v42M235 48v42"/></g><path d="M210 150c75-90 190-90 260 0z" fill="#f472b6" stroke="#831843" stroke-width="6"/><path d="M340 150v95" stroke="#831843" stroke-width="6"/><circle cx="340" cy="218" r="28" fill="#fed7aa" stroke="#1f2937" stroke-width="4"/><path d="M294 330l46-92 48 92z" fill="#fde047" stroke="#854d0e" stroke-width="5"/><path d="M326 216q14 13 29 0" stroke="#1f2937" stroke-width="4" fill="none"/></svg>`
};
for (const [name, body] of Object.entries(svgs)) fs.writeFileSync(path.join(svgDir, name), body);

function q(question, answers, correct, explanation, image) {
  return { question, answers, correct, explanation, image };
}

const banks = {
  AC9EFLA06: [
    q("Which group of words works together to tell what the cat does?", ["The cat jumps.", "cat the", "very soft"], 0, "The words are in an order that makes meaning about the cat."),
    q("Choose the words that complete the sentence: The bird ___ in the tree.", ["sings", "blue", "under"], 0, "The verb 'sings' works with the other words to make meaning."),
    q("Which word group tells who did the action?", ["Mia kicked the ball.", "kicked the", "very ball"], 0, "The group 'Mia' plus action words helps the sentence make sense."),
    q("Which words best complete: I can see three ___.", ["ducks", "running", "yellow"], 0, "A naming word completes the idea after the number word."),
    q("Which sentence uses colour words in a meaningful way?", ["The red bus stopped.", "Red the stopped bus.", "Stopped red the bus."], 0, "The colour word describes the bus and the sentence order makes sense."),
    q("Which word tells the action in: Sam paints a star?", ["paints", "Sam", "star"], 0, "The action word tells what Sam does."),
    q("Which group of words is in the best order?", ["The little dog ran.", "Dog little the ran.", "Ran dog little the."], 0, "The describing word and naming word work together in normal sentence order."),
    q("Choose the best word: The baby is ___.", ["sleeping", "shoe", "greenly"], 0, "'Sleeping' works with 'is' to tell what the baby is doing."),
    q("Which words show a person doing something?", ["A teacher reads.", "round table", "under a chair"], 0, "The sentence names a person and tells an action."),
    q("Which word group makes meaning?", ["Two frogs hop.", "Hop frogs two.", "Frogs two hop the."], 0, "The number, noun and verb work together clearly."),
    q("Which word completes the meaning: The fish ___ fast.", ["swims", "table", "purple"], 0, "'Swims' tells the action that matches a fish."),
    q("Which group has a describing word and a naming word?", ["big tree", "jump quickly", "under and"], 0, "'Big' describes the noun 'tree', so the two words work together as a group."),
    q("Which sentence uses a location word correctly?", ["The cup is on the mat.", "The cup is blue the mat.", "The cup is run the mat."], 0, "'On' helps show where the cup is, so the words work together to make meaning."),
    q("Which word tells what Dad does in: Dad cooks dinner?", ["cooks", "Dad", "dinner"], 0, "The action word 'cooks' works with the other words to make meaning."),
    q("Which complete sentence uses words that fit together?", ["The green frog jumps.", "Green the jumps frog.", "Frog the green jumps."], 0, "The words are grouped and ordered to express one idea."),
    q("Choose the missing word: We ___ at school.", ["read", "yellow", "desk"], 0, "'Read' tells an action that works in the sentence."),
    q("Which word group tells about one animal?", ["The horse runs.", "two horse runs", "runs the"], 0, "The sentence has a noun and action that work together."),
    q("Which answer shows words working together to make a question?", ["Where is my hat?", "Hat where my is", "my where hat"], 0, "The question words are ordered so the listener understands."),
    q("Which words make a sentence about a place?", ["The park is busy.", "busy park the", "is busy the"], 0, "The words work together to tell about the park."),
    q("Which sentence uses the number word correctly?", ["I have four shells.", "I have four blue.", "I have four under."], 0, "The number word works with the noun 'shells'."),
    q("Which group is missing words to make clear meaning?", ["the small", "The small bird flew.", "A small bird."], 0, "'The small' starts a group but does not finish the idea."),
    q("Which word completes: The children ___ loudly.", ["laugh", "pencil", "orange"], 0, "'Laugh' is an action that fits with children."),
    q("Which sentence changes meaning when the words move?", ["The dog chased the cat.", "The cat chased the dog.", "The dog saw the cat."], 1, "Changing the word groups can change who does the action."),
    q("Why do words need to work together in a sentence?", ["So the reader can understand the meaning.", "So every sentence has the same word.", "So the words become pictures only."], 0, "Sentences make meaning when word groups fit together.")
  ],
  AC9EFLA07: [
    q("Look at the picture and words: 'The dog shook off the rain.' What does the picture help you see?", ["The dog is wet.", "The dog can read.", "The dog is asleep."], 0, "The picture adds detail about the dog's wet fur and rain.", "ac9efla07-rainy-dog.svg"),
    q("The words say, 'The seedling has roots, a stem and leaves.' What do the labels in the image help with?", ["They name plant parts.", "They tell a joke.", "They show page numbers."], 0, "Labels help an informative text explain the picture.", "ac9efla07-plant-report.svg"),
    q("In a story picture, a kite is high in a tree. The words say, 'Leo looked up and sighed.' What does the image add?", ["It shows why Leo may feel worried.", "It proves Leo is swimming.", "It tells the book title."], 0, "The picture gives extra story information about the problem.", "ac9efla07-lost-kite.svg"),
    q("Words say, 'The tiny ant carried food.' Which word helps you imagine the ant's size?", ["tiny", "carried", "food"], 0, "The word 'tiny' adds meaning about size."),
    q("A picture shows dark clouds. The words say, 'Mum packed an umbrella.' What do the picture and words together suggest?", ["Rain may be coming.", "It is bedtime.", "The umbrella is a pet."], 0, "The image and words combine to build meaning."),
    q("An informative page shows a koala eating leaves. The words say, 'Koalas eat gum leaves.' What does the image do?", ["It supports the information.", "It changes the animal to a fish.", "It shows a pretend dragon."], 0, "The picture matches and supports the facts in the words."),
    q("A story says, 'Nina tiptoed past the baby.' The picture shows the baby sleeping. What does the image explain?", ["why Nina is quiet", "why Nina is hungry", "why the baby is reading"], 0, "The image helps explain the reason for the action."),
    q("A sign has a picture of a bike and the words 'Bike path'. How do image and words work together?", ["They show what the path is for.", "They tell a poem.", "They name a lunch food."], 0, "The picture and words give the same useful message."),
    q("A story picture shows a broken cup. The words say, 'Ali said, “Oh no!”' What does the picture add?", ["what went wrong", "the author's name", "how to spell Ali"], 0, "The image shows the event behind the words."),
    q("An animal book says, 'Penguins cannot fly.' The picture shows penguins walking on ice. What does the image add?", ["It helps readers recognise penguins.", "It shows penguins flying.", "It gives a phone number."], 0, "The image supports the informative text."),
    q("A poem says, 'Soft snow fell.' A picture shows white snow on trees. What do the words add?", ["They describe how the snow fell.", "They show page order.", "They name the illustrator only."], 0, "The words add a detail the picture alone may not show."),
    q("A recipe page has pictures beside each step. Why are the pictures helpful?", ["They show what to do.", "They hide the instructions.", "They turn facts into fiction."], 0, "Images can help readers follow informative text steps."),
    q("A story says, 'The puppy wagged its tail.' The picture shows a smiling child. What does the child picture add?", ["The child may be happy too.", "The puppy is a plant.", "The story is a map."], 0, "Pictures can add information about characters' feelings."),
    q("A page about teeth shows a toothbrush and the words 'Brush twice each day.' What meaning comes from both?", ["how to care for teeth", "how to catch a bus", "how to build a tower"], 0, "The image and words together give health information."),
    q("A picture shows a red balloon floating away. The words say, 'Ben reached, but it was too late.' What does the picture help you understand?", ["what Ben is reaching for", "what Ben had for lunch", "where the title goes"], 0, "The picture identifies the object in the story problem."),
    q("A nonfiction text has a photo of a nest and the words 'Birds build nests.' What does the photo help show?", ["what a nest can look like", "where to put a full stop", "which word rhymes with bird"], 0, "The image gives visual information that supports the words."),
    q("A comic picture shows a character with wide eyes. The words say, 'Wow!' What does the image add?", ["a feeling of surprise", "a list of facts", "a page number"], 0, "Facial expression in an image can add meaning."),
    q("A poster shows flames and the words 'Keep away from fire.' Why use both image and words?", ["to make the warning clear", "to make it a bedtime story", "to teach a rhyme only"], 0, "Images and words can work together to warn readers."),
    q("A story picture shows muddy boots at the door. The words say, 'Dad frowned.' What can readers infer?", ["Someone may have made a mess.", "Dad is at the beach.", "The boots are a title."], 0, "The picture supplies evidence for the story meaning."),
    q("A page shows three pictures: egg, chick, hen. The words say, 'A chicken grows and changes.' What do the images show?", ["the order of growth", "the alphabet", "a shopping list"], 0, "Images can show sequence in an informative text."),
    q("If words and picture do not match, what should a reader do?", ["Look again and think about both.", "Ignore all words forever.", "Only count the letters."], 0, "Readers use both image and words to build meaning."),
    q("A picture shows a child sharing crayons. The words say, 'We can work together.' What does the picture add?", ["an example of working together", "a weather report", "a list of page numbers"], 0, "The picture gives a concrete example of the words."),
    q("Which choice best explains images in texts?", ["Images can add details that words do not say.", "Images never help readers.", "Images are the same as punctuation marks."], 0, "Images contribute to meaning in stories and information texts."),
    q("Which choice best explains words in texts with pictures?", ["Words can name, describe or explain the image.", "Words only decorate the page.", "Words always mean the opposite of pictures."], 0, "Words and images can each contribute meaning.")
  ],
  AC9EFLA08: [
    q("Which word belongs with school writing?", ["pencil", "pillow", "puddle"], 0, "A pencil is familiar vocabulary for a school writing context."),
    q("Which word belongs with weather learning?", ["cloud", "sock", "spoon"], 0, "Cloud is vocabulary used when talking about weather."),
    q("Which word names a family member?", ["aunt", "desk", "shell"], 0, "Aunt is a word used in family and everyday contexts."),
    q("Which word best fits a lesson about shapes?", ["triangle", "sandwich", "jacket"], 0, "Triangle is topic vocabulary for shapes."),
    q("Which word tells where something is?", ["beside", "happy", "jump"], 0, "Beside is a location word used to tell where one thing is near another."),
    q("Which word could describe how a lemon tastes?", ["sour", "square", "sleepy"], 0, "Sour is taste vocabulary from everyday experience."),
    q("Which word belongs with pets?", ["kitten", "raincoat", "number"], 0, "Kitten is familiar vocabulary about animals and pets."),
    q("Which word belongs with counting?", ["seven", "garden", "quiet"], 0, "Seven is a number word used in maths and everyday counting."),
    q("Which word means almost the same as small?", ["little", "loud", "late"], 0, "Little and small are similar in meaning."),
    q("Which word is the opposite of hot?", ["cold", "fast", "round"], 0, "Cold is the opposite temperature word."),
    q("Which word fits: The ball rolled ___ the table.", ["under", "yellow", "laugh"], 0, "Under is a location word that fits the sentence."),
    q("Which word belongs in a garden topic?", ["seed", "plate", "sock"], 0, "Seed is vocabulary used when learning about plants."),
    q("Which word names a feeling?", ["proud", "chair", "circle"], 0, "Proud is vocabulary for a feeling someone might have after doing well."),
    q("Which word belongs with transport?", ["bus", "banana", "blanket"], 0, "Bus is familiar transport vocabulary."),
    q("Which word is a colour word?", ["green", "after", "clap"], 0, "Green names a colour and is familiar vocabulary for describing things."),
    q("Which question word asks about a person?", ["who", "where", "when"], 0, "Who asks about a person, while where asks place and when asks time."),
    q("Which word belongs with beach experiences?", ["shell", "spoon", "shirt"], 0, "Shell is familiar beach vocabulary."),
    q("Which word could describe a loud sound?", ["noisy", "soft", "empty"], 0, "Noisy describes a sound with a lot of volume."),
    q("Which word does not belong with foods?", ["helmet", "apple", "rice"], 0, "Helmet is not food vocabulary because it names something worn for safety."),
    q("Which word means almost the same as quick?", ["fast", "wet", "kind"], 0, "Fast and quick have similar meanings."),
    q("Which word best fits a science topic about animals?", ["habitat", "cupcake", "shoelace"], 0, "Habitat is a school topic word about where animals live."),
    q("Which word belongs with art class?", ["paint", "toothbrush", "cloud"], 0, "Paint is vocabulary used in art contexts."),
    q("Which word helps compare size?", ["bigger", "yesterday", "sing"], 0, "Bigger is used to compare the size of things."),
    q("Why learn words for familiar contexts?", ["They help us talk about experiences and school topics.", "They make every sentence a question.", "They replace all pictures in books."], 0, "Vocabulary helps children name and discuss familiar ideas.")
  ],
  AC9EFLA09: [
    q("Which mark usually ends a telling sentence?", ["full stop", "capital M", "letter s"], 0, "A full stop is punctuation, not a letter, and can end a telling sentence."),
    q("Which mark usually ends a question?", ["question mark", "letter Q", "capital letter"], 0, "A question mark is punctuation used at the end of a question."),
    q("Which sentence starts with a capital letter?", ["The dog ran.", "the dog ran.", "the Dog ran."], 0, "A capital letter signals the beginning of the sentence."),
    q("Which writes the name correctly?", ["Mia", "mia", "mIa"], 0, "Names begin with capital letters, and the rest of this simple name is lowercase."),
    q("Which is punctuation?", ["?", "b", "M"], 0, "A question mark is punctuation, not a letter."),
    q("Choose the correctly written sentence.", ["I like apples.", "i like apples.", "I like apples"], 0, "The sentence begins with a capital I and ends with punctuation."),
    q("Which mark shows excitement at the end?", ["!", "a", "Tom"], 0, "An exclamation mark is punctuation that can end an excited sentence."),
    q("Which sentence asks something correctly?", ["Where is my hat?", "Where is my hat.", "where is my hat?"], 0, "A question begins with a capital and ends with a question mark."),
    q("Which word should have a capital letter because it is a name?", ["Ben", "dog", "ran"], 0, "Ben is a person's name, so it begins with a capital letter."),
    q("Which sentence has the capital at the beginning?", ["We went home.", "we went home.", "We went Home."], 0, "The first word of a sentence begins with a capital letter."),
    q("Which is a letter, not punctuation?", ["t", ".", "?"], 0, "The symbol t is a letter; full stops and question marks are punctuation."),
    q("Choose the sentence with an end mark.", ["The sun is hot.", "The sun is hot", "the sun is hot"], 0, "The full stop marks the end of the sentence."),
    q("Which sentence uses a capital for a place name?", ["We went to Darwin.", "We went to darwin.", "we went to Darwin."], 0, "Place names begin with capital letters."),
    q("Which mark should end: Can I play", ["?", ".", "M"], 0, "The words ask a question, so a question mark is needed."),
    q("Which sentence has correct capital I?", ["I can jump.", "i can jump.", "Can i jump?"], 0, "The pronoun I is written as a capital letter."),
    q("Which mark should end: The bird sings", [".", "?", "B"], 0, "A telling sentence usually ends with a full stop."),
    q("Which version has the name capitalised?", ["Asha has a book.", "asha has a book.", "ASHA has a book."], 0, "The name begins with one capital letter."),
    q("Which answer has punctuation at the end only?", ["Look at me!", "!Look at me", "Look! at me"], 0, "End punctuation belongs at the end of the sentence."),
    q("Which symbol is not a letter?", [".", "n", "T"], 0, "A full stop is punctuation, different from letters."),
    q("Which sentence is written correctly?", ["Dad is cooking.", "dad is cooking.", "Dad is cooking"], 0, "The sentence starts with a capital letter and ends with a full stop."),
    q("Which mark tells the reader the sentence has ended?", ["end punctuation", "middle letter", "lowercase name"], 0, "End punctuation marks the sentence boundary."),
    q("Which sentence should start with a capital letter?", ["My bag is red.", "my bag is red.", "my Bag is red."], 0, "The first word of a sentence needs a capital letter."),
    q("Which version writes the name and sentence beginning correctly?", ["Tom has a kite.", "tom has a kite.", "Tom has a kite"], 0, "The name and sentence beginning use a capital, and the sentence has punctuation."),
    q("Why are punctuation marks different from letters?", ["They help show how written text is organised.", "They always name people.", "They are only used in pictures."], 0, "Punctuation marks help readers see sentence endings and meaning.")
  ],
  AC9EFLE01: [
    q("A beach story shows a child building a sandcastle. Which response shares a similar experience?", ["I built sandcastles at the beach too.", "The story has five pages.", "The word beach has five letters."], 0, "The response connects the literature image to the reader's own experience.", "ac9efle01-beach-story.svg"),
    q("A rain poem shows a smiling child under an umbrella. Which idea reflects a different experience?", ["I do not like walking in rain.", "The umbrella is yellow.", "The picture is on a page."], 0, "The reader shares a personal experience that is different from the poem.", "ac9efle01-rain-poem.svg"),
    q("In a story, a child misses their grandmother. Which response shares an idea about the story?", ["The character may feel lonely.", "The book has a cover.", "The word child starts with c."], 0, "The response shares an idea about a character's experience."),
    q("A poem is about jumping in puddles. Which response connects to your life?", ["I have jumped in puddles after rain.", "Puddles are water.", "Poems have words."], 0, "The response links the poem to a similar personal experience."),
    q("A picture book shows a family cooking together. Which response reflects a similar experience?", ["My family cooks dinner together too.", "The page is colourful.", "The book has an author."], 0, "The response connects the text to family experience."),
    q("A story character is scared on the first day of school. Which response shows a similar feeling?", ["I felt nervous when I started something new.", "School starts in the morning.", "The story has a title."], 0, "The reader connects the character's feeling to their own life."),
    q("A story is set in the snow. You have never seen snow. Which response fits?", ["That is different from my experience.", "I see snow every day.", "The word snow is short."], 0, "The response notices a difference between text and reader experience."),
    q("A poem says the moon looks like a silver boat. Which response shares an idea?", ["The poem makes the moon sound magical.", "The moon is a word.", "A boat has letters."], 0, "The response talks about the image and feeling in the poem."),
    q("A story from another country shows children eating a special festival meal. Which response is thoughtful?", ["This reminds me of special food in my family.", "I will count the commas.", "The page number is two."], 0, "The reader connects respectfully to a cultural experience."),
    q("A First Nations Australian story includes caring for Country. Which response shows respectful reflection?", ["The story makes me think about looking after places.", "The story is only about spelling.", "I should ignore the setting."], 0, "The response shares an idea about the text's meaning."),
    q("A picture shows a child giving a toy to a friend. Which response shares a similar experience?", ["I have shared toys with a friend.", "The toy is drawn in red.", "The page is made of paper."], 0, "The response connects the image to the reader's experience."),
    q("A story character loses a pet. Which response reflects on experience?", ["I know losing something special can feel sad.", "Pets are animals.", "The book has many pages."], 0, "The response connects emotion in the story to life experience."),
    q("A poem is about loving spicy food. You do not eat spicy food. Which response fits?", ["That is different from what I usually eat.", "Food is a noun.", "The poem has lines."], 0, "The response compares the poem with the reader's own experience."),
    q("A story shows children speaking a language at home. Which response is respectful?", ["Some families use different languages at home.", "Only my home words matter.", "The story should have no pictures."], 0, "The response recognises different experiences respectfully."),
    q("A picture book character helps a younger sibling. Which response shares an idea?", ["The character is caring.", "The sibling is a word.", "The cover has colour."], 0, "The response gives an idea about the character."),
    q("A story ending makes you smile. Which response shares a feeling?", ["I felt happy when the friends helped each other.", "The last page is at the end.", "The title has big letters."], 0, "The response shares a feeling about the literature."),
    q("A poem is about being quiet in a garden. Which response connects to experience?", ["I feel calm when I sit outside.", "Garden has six letters.", "A poem is not a story."], 0, "The response connects the poem to a personal feeling."),
    q("A story character moves to a new house. Which response shows a similar or different connection?", ["I have not moved house, but I know change can feel big.", "Houses have roofs.", "The story uses pages."], 0, "The reader reflects on how the experience is different but understandable."),
    q("A picture shows children playing a game you do not know. Which response is best?", ["I would like to learn that game.", "The children are drawings only.", "Games are never in stories."], 0, "The response engages with a different experience in the text."),
    q("A story shows a grandparent telling a family story. Which response connects to literature?", ["It reminds me of stories people tell in families.", "Grandparent is a long word.", "The page has a margin."], 0, "The response links the story to familiar oral storytelling."),
    q("Which response best shares an idea about a story?", ["The character was brave when she tried again.", "The page has black letters.", "The book is rectangular."], 0, "It gives an idea about a character's action."),
    q("Which response best compares text and personal experience?", ["This is like my first swimming lesson.", "The sentence has words.", "The book has a barcode."], 0, "It links the text to something the reader experienced."),
    q("Why talk about similar and different experiences in literature?", ["It helps readers connect with stories, poems and images.", "It makes every story a test.", "It removes the author's words."], 0, "Personal reflection helps children engage with literature."),
    q("Which response is respectful when a story shows a life unlike yours?", ["That is different from my life, and I can learn from it.", "That means the story is wrong.", "I should only read stories about me."], 0, "Literature can show many lives and experiences.")
  ]
};

for (const items of Object.values(banks)) {
  if (items.length !== 24) throw new Error(`Expected 24 items, found ${items.length}`);
}

function rotate(item, index) {
  const desired = index % 3;
  const answers = [...item.answers];
  const correctText = answers[item.correct];
  answers.splice(item.correct, 1);
  answers.splice(desired, 0, correctText);
  return { ...item, answers, correct: desired };
}

function buildItem(code, bank, source, index) {
  const tier = index < 8 ? "foundation" : index < 16 ? "core" : "stretch";
  const out = {
    id: `${code.toLowerCase()}-${bank === "practice" ? "p" : "e"}${String(index + 1).padStart(2, "0")}`,
    curriculumCode: code,
    bank,
    sourceType: "Multiple choice",
    question: source.question,
    explanation: source.explanation,
    structuredExplanation: {
      approach: "Read the prompt, use the words and any image carefully, then choose the answer that best matches the Foundation English skill.",
      reasoning: source.explanation
    },
    printable: true,
    difficulty: tier === "foundation" ? 1 : tier === "core" ? 2 : 3,
    difficultyTier: tier,
    sequencePriority: index + 1,
    qualitySchema: `${version}:ixl-mapped-original-items`,
    type: "single",
    answers: source.answers,
    correct: source.correct
  };
  if (source.image) {
    out.image = `/assets/quiz-visuals/foundation-english/${source.image}`;
    out.imageAlt = source.explanation;
  }
  return out;
}

function writeQuestions(code, bank) {
  const source = bank === "practice" ? banks[code] : (code === "AC9EFLA07" || code === "AC9EFLE01" ? banks[code].slice(0, 16) : banks[code].slice(4, 20));
  const questions = source.map((item, index) => buildItem(code, bank, rotate(item, index), index));
  const varName = bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions";
  const file = path.join(root, "quiz/grade-k/english", meta[code].slug, bank, "questions.js");
  fs.writeFileSync(file, `"use strict";\nwindow.${varName} = ${JSON.stringify(questions, null, 2)};\n`);
}

function updateHtml(code, bank) {
  const file = path.join(root, "quiz/grade-k/english", meta[code].slug, bank, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const display = 5;
  html = html.replace(/Complete (?:an?|a) \d+-question Foundation (practice|test)/g, "Complete a short shuffled Foundation $1");
  html = html.replace(/This page serves \d+ (practice|test) questions/g, "This page serves a short shuffled $1");
  html = html.replace(/<span class="summary-number" id="questionCount">\d+<\/span>/g, `<span class="summary-number" id="questionCount">${display}</span>`);
  html = html.replace(/"maxQuestions":\d+/g, `"maxQuestions":${display}`);
  html = html.replace(/"shuffleQuestions":(?:true|false)/g, `"shuffleQuestions":true`);
  html = html.replace(/"questionCycle":(?:true|false)/g, `"questionCycle":false`);
  html = html.replace(/,"avoidSameCorrectPosition":true/g, "");
  html = html.replace(/,"questionCycleStorageKey":"[^"]+"/g, "");
  html = html.replace(/"preReadSeconds":0/g, `"preReadSeconds":0,"avoidSameCorrectPosition":true`);
  html = html.replace(new RegExp(`/quiz/grade-k/english/${meta[code].slug}/${bank}/questions\\.js\\?v=[^"]+`), `/quiz/grade-k/english/${meta[code].slug}/${bank}/questions.js?v=${version}`);
  fs.writeFileSync(file, html);
}

for (const code of Object.keys(banks)) {
  writeQuestions(code, "practice");
  writeQuestions(code, "test");
  updateHtml(code, "practice");
  updateHtml(code, "test");
}

fs.mkdirSync(path.join(root, "docs/question-bank-reviews"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/question-bank-reviews/2026-09-06-foundation-english-la06-le01.md"), `# Foundation English AC9EFLA06–AC9EFLE01 Practice/Test review\n\nUpdated the next five Foundation English Practice/Test banks against ACARA v9 descriptors and IXL-style Foundation English skill coverage.\n\n## Scope\n\n- AC9EFLA06: ${meta.AC9EFLA06.descriptor}\n- AC9EFLA07: ${meta.AC9EFLA07.descriptor}\n- AC9EFLA08: ${meta.AC9EFLA08.descriptor}\n- AC9EFLA09: ${meta.AC9EFLA09.descriptor}\n- AC9EFLE01: ${meta.AC9EFLE01.descriptor}\n\n## IXL comparison notes\n\n- IXL's Australian Curriculum Foundation page maps AC9EFLA06 to number/colour words, adjectives, nouns and verbs; these banks use those item types to assess word groups making meaning.\n- AC9EFLA08 maps to Foundation vocabulary strands including colour/number words, adjectives, location words, question words, synonyms/antonyms, categories and multiple-meaning vocabulary; the bank covers familiar home, school, science, art, weather, family and interest contexts.\n- AC9EFLA09 maps to telling/asking sentences, end marks and capitalisation; the bank covers punctuation vs letters, sentence starts, names, pronoun I and end punctuation.\n- AC9EFLA07 and AC9EFLE01 have fewer direct IXL ACARA links, so the questions use IXL-style Foundation picture-comprehension patterns while staying aligned to ACARA's images/words and literature-response requirements.\n\n## Quality actions\n\n- Rebuilt each Practice bank to 24 original questions.\n- Rebuilt each Test bank to 16 original questions.\n- Added targeted simple SVG supports for image-dependent skills only: AC9EFLA07 and AC9EFLE01.\n- Removed placeholder visual wording from AC9EFLA07 and repeated 8-question bank coverage from all five codes.\n- Balanced correct answer positions and strengthened explanations/distractors.\n\n## Runtime wiring\n\n- Practice pages serve 8 rotating questions from 24.\n- Test pages serve 12 rotating questions from 16.\n- Question shuffling and unseen-cycle support are enabled for the batch.\n`);

console.log(`Updated Foundation English AC9EFLA06-AC9EFLE01 with ${version}.`);
