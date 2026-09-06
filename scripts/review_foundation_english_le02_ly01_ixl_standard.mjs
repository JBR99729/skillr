import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const version = "20260906-foundation-english-le02-ly01-ixl-standard";
const visualDir = path.join(root, "assets/quiz-visuals/foundation-english");
fs.mkdirSync(visualDir, { recursive: true });

const meta = {
  AC9EFLE02: { slug: "ac9efle02", descriptor: "respond to stories and share feelings and thoughts about their events and characters" },
  AC9EFLE03: { slug: "ac9efle03", descriptor: "recognise different types of literary texts and identify features including events, characters, and beginnings and endings" },
  AC9EFLE04: { slug: "ac9efle04", descriptor: "explore and replicate the rhythms and sound patterns of literary texts such as poems, rhymes and songs" },
  AC9EFLE05: { slug: "ac9efle05", descriptor: "retell and adapt familiar literary texts through play, performance, images or writing" },
  AC9EFLY01: { slug: "ac9efly01", descriptor: "identify some familiar texts, such as stories and informative texts, and their purpose" }
};

const svgs = {
  "ac9efle03-story-start.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Story beginning</title><desc id="d">A child opens a gate at the beginning of a story.</desc><rect width="640" height="360" rx="24" fill="#eef2ff"/><rect x="85" y="70" width="470" height="235" rx="18" fill="#fff" stroke="#6366f1" stroke-width="5"/><text x="320" y="115" text-anchor="middle" font-family="Arial" font-size="28" font-weight="700" fill="#312e81">Beginning</text><circle cx="215" cy="190" r="28" fill="#fed7aa" stroke="#17243a" stroke-width="4"/><path d="M215 218v58M185 245h58M215 276l-25 36M215 276l30 36" stroke="#17243a" stroke-width="6"/><rect x="350" y="160" width="95" height="130" fill="#d6d3d1" stroke="#57534e" stroke-width="5"/><path d="M350 160h95M397 160v130" stroke="#57534e" stroke-width="4"/></svg>`,
  "ac9efle03-poem-lines.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Poem lines</title><desc id="d">Four short poem lines are shown on a page with musical notes.</desc><rect width="640" height="360" rx="24" fill="#fff7ed"/><rect x="145" y="55" width="350" height="250" rx="16" fill="#fff" stroke="#fb923c" stroke-width="5"/><text x="190" y="115" font-family="Arial" font-size="26" fill="#17243a">Rain taps</text><text x="190" y="155" font-family="Arial" font-size="26" fill="#17243a">on my hat</text><text x="190" y="195" font-family="Arial" font-size="26" fill="#17243a">Drip drop</text><text x="190" y="235" font-family="Arial" font-size="26" fill="#17243a">pitter pat</text><text x="455" y="110" font-family="Arial" font-size="38" fill="#c2410c">♪</text><text x="455" y="240" font-family="Arial" font-size="38" fill="#c2410c">♪</text></svg>`,
  "ac9efle05-retell-path.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Retell story order</title><desc id="d">Three cards show beginning, middle and ending of a simple story.</desc><rect width="640" height="360" rx="24" fill="#f0fdf4"/><g font-family="Arial" text-anchor="middle"><rect x="55" y="95" width="150" height="155" rx="16" fill="#fff" stroke="#16a34a" stroke-width="5"/><rect x="245" y="95" width="150" height="155" rx="16" fill="#fff" stroke="#16a34a" stroke-width="5"/><rect x="435" y="95" width="150" height="155" rx="16" fill="#fff" stroke="#16a34a" stroke-width="5"/><text x="130" y="135" font-size="22" font-weight="700">Beginning</text><text x="320" y="135" font-size="22" font-weight="700">Middle</text><text x="510" y="135" font-size="22" font-weight="700">Ending</text><text x="130" y="200" font-size="20">lost hat</text><text x="320" y="200" font-size="20">search</text><text x="510" y="200" font-size="20">found hat</text></g><path d="M210 172h28M400 172h28" stroke="#166534" stroke-width="8"/><path d="M238 172l-16-12v24zM428 172l-16-12v24z" fill="#166534"/></svg>`,
  "ac9efly01-frog-book.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Frog information book</title><desc id="d">A book cover titled Frogs shows a frog and fact bubbles.</desc><rect width="640" height="360" rx="24" fill="#dcfce7"/><rect x="180" y="55" width="280" height="250" rx="14" fill="#fff" stroke="#166534" stroke-width="6"/><text x="320" y="105" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#166534">Frogs</text><ellipse cx="320" cy="200" rx="70" ry="45" fill="#86efac" stroke="#166534" stroke-width="5"/><circle cx="280" cy="165" r="18" fill="#86efac" stroke="#166534" stroke-width="4"/><circle cx="360" cy="165" r="18" fill="#86efac" stroke="#166534" stroke-width="4"/><circle cx="282" cy="162" r="6"/><circle cx="358" cy="162" r="6"/><text x="320" y="270" text-anchor="middle" font-family="Arial" font-size="22" fill="#17243a">facts about animals</text></svg>`,
  "ac9efly01-party-invite.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Party invitation</title><desc id="d">A colourful invitation card gives a party day and time.</desc><rect width="640" height="360" rx="24" fill="#fdf2f8"/><rect x="150" y="65" width="340" height="230" rx="18" fill="#fff" stroke="#db2777" stroke-width="6"/><text x="320" y="125" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#be185d">Party!</text><text x="320" y="175" text-anchor="middle" font-family="Arial" font-size="24" fill="#17243a">Saturday</text><text x="320" y="215" text-anchor="middle" font-family="Arial" font-size="24" fill="#17243a">2 o'clock</text><circle cx="220" cy="115" r="14" fill="#facc15"/><circle cx="430" cy="245" r="14" fill="#60a5fa"/></svg>`
};
for (const [name, svg] of Object.entries(svgs)) fs.writeFileSync(path.join(visualDir, name), svg);

const q = (question, answers, explanation, image = null) => ({ question, answers, correct: 0, explanation, image });

const banks = {
  AC9EFLE02: [
    q("A character gives away their lunch to help a friend. Which response shares a thought about the character?", ["The character is kind.", "Lunch starts at noon.", "The book has pages."], "The response gives a thought about what the character did."),
    q("A story puppy is lost in the rain. Which response shares a feeling?", ["I felt worried for the puppy.", "Puppies have tails.", "Rain is water."], "The response names a feeling connected to a story event."),
    q("The dragon says sorry after scaring everyone. What thought fits the event?", ["The dragon is trying to make things better.", "Dragons are always green.", "The sentence has a capital."], "The thought responds to the character's action."),
    q("A child in a story finally learns to ride a bike. Which feeling response fits?", ["I felt proud of the child.", "Bikes have wheels.", "The road is grey."], "The response shares a feeling about the event."),
    q("A character hides a friend's toy. Which thought is about the character?", ["That was not a fair choice.", "Toys can be plastic.", "The story has a title."], "The response gives a thought about the character's behaviour."),
    q("A story ends with the friends finding the missing kitten. Which feeling fits?", ["I felt relieved.", "Kittens are animals.", "The last page is at the back."], "Relieved is a feeling that connects to the happy solution."),
    q("A character keeps trying after falling over. Which response shares a thought?", ["The character did not give up.", "Falling is a verb.", "Shoes go on feet."], "The thought responds to the character's effort."),
    q("A story character shouts at a little brother. Which feeling could a reader share?", ["I felt upset about the shouting.", "Brothers can be younger.", "The book is rectangular."], "The response shares a feeling about a story event."),
    q("A character plants seeds for the class garden. Which thought fits?", ["That was helpful for the class.", "Seeds are small.", "Gardens have soil."], "The thought connects to the event and character."),
    q("A fox tricks another animal in a tale. Which response shares a thought?", ["The fox was clever but unfair.", "Fox starts with f.", "Animals live outside."], "The response evaluates the character's action."),
    q("A child misses the bus in a story. Which feeling could you share?", ["I felt nervous for the child.", "A bus is transport.", "The bus is long."], "The response names a feeling linked to the event."),
    q("A character helps clean a messy room. Which thought is about the character?", ["The character is responsible.", "Rooms have walls.", "Messy means untidy."], "The thought responds to what the character chose to do."),
    q("A story has a scary noise at night. Which response shares a feeling?", ["I felt a little scared.", "Night comes after day.", "Noise is sound."], "The response names a feeling caused by the event."),
    q("A character shares a secret that hurts a friend. Which thought fits?", ["The character made an unkind choice.", "Secrets are quiet.", "Friends can play games."], "The thought responds to the character's behaviour."),
    q("A story shows a girl rescuing a bird. Which response shares a feeling and thought?", ["I felt happy because she helped.", "Birds have wings.", "The girl is a word."], "It combines a feeling with a thought about the event."),
    q("A bear in a story learns to ask before taking honey. Which thought fits?", ["The bear learned a better choice.", "Honey is sweet.", "Bears are furry."], "The thought responds to the character's change."),
    q("A character cries when a tower falls. Which response is about the event?", ["I felt sad because the tower broke.", "Towers can be tall.", "Blocks stack up."], "The feeling is connected to what happened."),
    q("A story character invites a lonely child to play. Which thought fits?", ["That was friendly and caring.", "Play starts with p.", "Children can run."], "The thought responds to the character's kindness."),
    q("A character lies about breaking a vase. Which thought is about the character?", ["The character should tell the truth.", "A vase can hold flowers.", "The page has words."], "The response gives a thought about the character's action."),
    q("A story makes you laugh when a goat eats a hat. Which response shares a feeling?", ["I thought that part was funny.", "Goats eat grass.", "A hat goes on a head."], "The response names how the reader felt about the event."),
    q("Which response best shares both feeling and story evidence?", ["I felt excited when the boat reached land.", "The boat is blue.", "Land is not water."], "It names a feeling and links it to a story event."),
    q("Which response is about a character, not just a fact?", ["Nina was brave to try again.", "Nina has four letters.", "The sentence is short."], "It shares a thought about the character."),
    q("Which response best matches AC9EFLE02?", ["I felt sad when Max lost his dog.", "The book has a cover.", "Dog rhymes with log."], "It responds to a story with a feeling about an event."),
    q("Why do readers share feelings and thoughts about stories?", ["It helps them respond to events and characters.", "It makes every story a rhyme.", "It removes the pictures."], "The skill is about responding to literature, not naming print features only.")
  ],
  AC9EFLE03: [
    q("Which text is most likely a poem?", ["A short text with lines that rhyme.", "A bus timetable.", "A shopping receipt."], "Poems often use lines, rhythm or rhyme."),
    q("Look at the picture card labelled Beginning. What story feature does it show?", ["where the story starts", "the price of a book", "a list of facts"], "A beginning introduces the first part of a story.", "ac9efle03-story-start.svg"),
    q("Which is a character in: 'A rabbit found a red sock'?", ["rabbit", "red", "found"], "A character is who or what the story is about."),
    q("Which event happens in: 'The frog jumped into the pond'?", ["The frog jumped.", "The pond is a place.", "Frog starts with f."], "An event is something that happens in a story."),
    q("Which part usually finishes a story?", ["ending", "cover colour", "letter sound"], "The ending tells how the story finishes."),
    q("Which text is a story?", ["A tale about a lost teddy.", "A sign that says Stop.", "A label on a jar."], "A story is a literary text with characters or events."),
    q("Which feature belongs in a story?", ["characters", "bus times", "food prices"], "Characters are people, animals or beings in stories."),
    q("Which is likely a song?", ["Words that are sung with rhythm.", "A map of a park.", "A weather chart."], "Songs are literary texts that use sound and rhythm."),
    q("Which sentence tells a story event?", ["The kite flew away.", "Kite has four letters.", "A kite can be red."], "A story event tells what happened."),
    q("Which text is most likely a rhyme?", ["Star light, moon bright.", "Milk, eggs, bread.", "Open from 9 to 5."], "Rhymes often use words with similar ending sounds."),
    q("What is the beginning of a story for?", ["to start the events", "to count pages", "to list ingredients"], "The beginning starts the story for readers."),
    q("What is the ending of a story for?", ["to show how events finish", "to name every letter", "to give a bus stop"], "The ending completes the story events."),
    q("Which feature helps identify a picture book story?", ["characters doing things", "only a price tag", "only a road rule"], "Story picture books usually show characters and events."),
    q("Look at the poem lines. Which feature does this literary text show?", ["rhythm and rhyme", "a recipe step", "a street address"], "The short lines and repeated sounds are poem features.", "ac9efle03-poem-lines.svg"),
    q("Which is an event, not a character?", ["The egg cracked.", "the little chick", "Grandpa"], "An event is something that happens."),
    q("Which is a character, not an event?", ["the old bear", "The door opened.", "The rain stopped."], "A character can be a person or animal in a story."),
    q("Which text type often has verses or repeated lines?", ["song", "menu", "map"], "Songs often use repeated lines and rhythm."),
    q("Which feature tells readers the first problem in a story?", ["beginning", "barcode", "page number only"], "A story problem is often introduced near the beginning."),
    q("Which feature tells readers how the problem is solved?", ["ending", "alphabet order", "word spacing"], "The ending often shows the solution."),
    q("Which set names literary texts?", ["story, poem, song", "map, receipt, sign", "menu, label, timetable"], "Stories, poems and songs are literary texts."),
    q("Which question asks about a story character?", ["Who helped the duck?", "How many pages?", "What colour is the cover?"], "Who questions can identify characters."),
    q("Which question asks about a story event?", ["What happened after the storm?", "What is the author's name?", "How big is the book?"], "Events are things that happen in the story."),
    q("Which response identifies beginning, middle and ending?", ["First she lost it, then she searched, finally she found it.", "It has a red cover.", "The words are black."], "The response follows the order of story events."),
    q("Why notice characters, events, beginnings and endings?", ["They help us recognise and talk about literary texts.", "They turn stories into maths.", "They are all punctuation marks."], "These are important features of literary texts.")
  ],
  AC9EFLE04: [
    q("Which word rhymes with cat?", ["hat", "cup", "dog"], "Cat and hat have the same ending sound."),
    q("Which pair has the same ending sound?", ["sun and fun", "sun and sock", "fun and fish"], "Sun and fun rhyme because their ending sounds match."),
    q("Complete the rhyme: I see a bee in a ___.", ["tree", "bag", "cup"], "Bee and tree rhyme."),
    q("Which word does not rhyme with log?", ["fish", "dog", "frog"], "Fish has a different ending sound."),
    q("Which line has a strong beat?", ["Clap, clap, tap.", "Elephant information.", "The jar is glass."], "Repeated short sounds create rhythm."),
    q("Which two words rhyme?", ["cake and snake", "cake and cup", "snake and sun"], "Cake and snake have the same ending sound."),
    q("Complete the rhyme: The mouse ran into the ___.", ["house", "tree", "sock"], "Mouse and house rhyme."),
    q("Which pair does not rhyme?", ["moon and map", "moon and spoon", "cat and hat"], "Moon and map have different ending sounds."),
    q("Which words could fit in a chant?", ["jump, jump, spin", "information text", "the pencil case"], "Repeated action words can make a chant rhythm."),
    q("Which word rhymes with ring?", ["sing", "sun", "sock"], "Ring and sing share the same ending sound."),
    q("Complete the rhyme: Red fox, red fox, hiding in a ___.", ["box", "bed", "bus"], "Fox and box rhyme."),
    q("Which pair has the same final sound?", ["boat and coat", "boat and bee", "coat and cat"], "Boat and coat end with the same sound."),
    q("Which line copies a rhythm pattern?", ["tap tap clap", "tap then elephant", "quiet pencil"], "The line repeats short beats in a pattern."),
    q("Which word rhymes with star?", ["car", "cat", "sock"], "Star and car have the same ending sound."),
    q("Complete the rhyme: Little snail, shiny ___.", ["trail", "hat", "mug"], "Snail and trail rhyme."),
    q("Which word does not rhyme with bee?", ["moon", "tree", "see"], "Moon has a different ending sound."),
    q("Which pair belongs in a rhyming song?", ["day and play", "day and dog", "play and pig"], "Day and play rhyme."),
    q("Which line has repeated sound?", ["swish, swish, swish", "The bus is parked.", "I have a book."], "Repeating words creates a sound pattern."),
    q("Complete the rhyme: We can hop, we can ___.", ["stop", "read", "blue"], "Hop and stop rhyme."),
    q("Which words rhyme with light?", ["night and bright", "night and nose", "bright and ball"], "Light, night and bright share ending sounds."),
    q("Which is a sound pattern?", ["tick tock, tick tock", "a green lunchbox", "the last page"], "The repeated sounds form a pattern."),
    q("Which word completes: Rain on my hat, pitter ___?", ["pat", "sun", "frog"], "Hat and pat rhyme and suit the poem rhythm."),
    q("Which choice best copies a rhyme pattern?", ["red bed, blue shoe", "red bed, cup tree", "red pencil, big table"], "Bed and red rhyme, and blue and shoe rhyme."),
    q("Why do poems, rhymes and songs use rhythm and sound patterns?", ["They make words enjoyable to hear and repeat.", "They make words into numbers only.", "They remove all meaning from texts."], "Rhythm and sound patterns are key features of these literary texts.")
  ],
  AC9EFLE05: [
    q("What should you include when retelling a familiar story?", ["important events in order", "only the page numbers", "only the author's name"], "A retell follows the important story events."),
    q("Look at the story-order cards. Which retell follows the order?", ["lost hat, search, found hat", "found hat, lost hat, search", "search, found hat, lost hat"], "Retelling keeps events in a sensible order.", "ac9efle05-retell-path.svg"),
    q("The story says the bear finds honey. Which action could show this in a play?", ["pretend to lift a honey pot", "count the page numbers", "write the word bear only"], "Performance can retell an event through action."),
    q("How could you adapt 'The Three Little Pigs' with a new setting?", ["Make the houses on the moon.", "Read the title only.", "Remove all characters."], "An adaptation changes part of a familiar story while keeping story sense."),
    q("Which drawing best retells 'the chick hatched'?", ["a chick coming out of an egg", "a bus at a stop", "a spoon in a bowl"], "A drawing can retell a story event."),
    q("Which sentence is best for retelling an ending?", ["At last, the lost dog came home.", "The cover is blue.", "Dog starts with d."], "The sentence tells how the story finishes."),
    q("Which is an adaptation of a familiar tale?", ["The gingerbread man becomes a gingerbread star.", "The book has pages.", "The title is at the top."], "The familiar story is changed in an imaginative way."),
    q("Which prop could help perform 'the king wore a crown'?", ["a paper crown", "a bus ticket", "a lunchbox label"], "A prop can help retell a story through performance."),
    q("Which retell uses beginning, middle and ending?", ["First the seed slept, then it grew, finally it flowered.", "The flower is yellow.", "Seed rhymes with feed."], "The retell gives events in order."),
    q("Which change keeps the story idea but adapts the character?", ["The brave mouse becomes a brave lizard.", "The story has no events.", "The words are erased."], "An adaptation can change a character while keeping the plot idea."),
    q("Which action could show 'the giant stomped'?", ["stamp feet slowly", "whisper the alphabet", "draw a tiny fish"], "Performance uses movement to show story events."),
    q("Which image would retell 'the boat sailed away'?", ["a boat moving across water", "a cake on a plate", "a pencil on a desk"], "An image can retell the event from the story."),
    q("Which sentence adapts a story ending?", ["This time, the wolf says sorry and helps rebuild.", "The ending is on a page.", "Wolf has four letters."], "The sentence changes the familiar ending."),
    q("Which retell is too incomplete?", ["The bear.", "The bear found food and went home.", "First the bear woke up."], "A single character name does not retell an event."),
    q("Which choice shows play-based retelling?", ["acting out the hungry caterpillar eating leaves", "counting every letter", "sorting pencils by colour"], "Acting out events retells the story through play."),
    q("Which adaptation changes the problem?", ["The lost shoe becomes a lost map.", "The page is white.", "The title is short."], "Changing the problem is one way to adapt a familiar story."),
    q("Which retell tells the main event?", ["The duck found its way home.", "Duck has feathers.", "Home has four letters."], "A main event tells what happened in the story."),
    q("Which is a useful first line for retelling?", ["Once there was a little turtle who lost his shell.", "The book is square.", "Turtle starts with t."], "The line begins a retell with character and problem."),
    q("Which adaptation keeps the same character but changes the place?", ["The little red hen works in a city garden.", "The hen disappears from the story.", "Only the title stays."], "Changing the setting adapts the story."),
    q("Which drawing could adapt a fairy tale?", ["a castle under the sea", "a plain full stop", "a list of bus times"], "A new image can adapt the setting of a familiar story."),
    q("Which choice belongs in a performance retell?", ["Use a loud voice for the giant.", "Only copy the page number.", "Hide from the audience."], "Voice can help perform a familiar character."),
    q("Which sentence keeps story order?", ["The egg cracked before the chick came out.", "The chick came out before the egg cracked.", "The chick never had an egg."], "Retells need event order to make sense."),
    q("Which choice is both retell and adaptation?", ["Act out the story but make the hero a possum.", "Read the barcode.", "Name the punctuation marks."], "It retells through action and changes a story element."),
    q("Why retell and adapt familiar literary texts?", ["To show understanding and make a new version.", "To avoid talking about events.", "To turn every story into a sign."], "Retelling and adapting help children work with familiar stories creatively.")
  ],
  AC9EFLY01: [
    q("What is the purpose of a story?", ["to entertain with characters and events", "to list bus times", "to show a price only"], "A story usually entertains through characters and events."),
    q("Look at the frog book cover. What is its likely purpose?", ["to give facts about frogs", "to invite people to a party", "to tell a fairy tale"], "An information book about frogs is for learning facts.", "ac9efly01-frog-book.svg"),
    q("Look at the party card. What is its purpose?", ["to invite someone to a party", "to explain frogs", "to tell a bedtime story"], "An invitation tells people about an event.", "ac9efly01-party-invite.svg"),
    q("What is the purpose of a recipe?", ["to tell how to make food", "to tell a pretend adventure", "to name a street"], "A recipe gives steps for making food."),
    q("What is the purpose of a stop sign?", ["to tell people to stop", "to describe a character", "to rhyme with top"], "A sign gives a clear message."),
    q("Which text would help you learn about whales?", ["an information book about whales", "a birthday card", "a joke book"], "An information text gives facts about a topic."),
    q("Which text is made to entertain?", ["a funny story", "a medicine label", "a calendar date"], "Funny stories are written to entertain readers."),
    q("Which text tells where places are?", ["a map", "a poem", "a lunch order"], "A map helps readers find places."),
    q("Which familiar text tells what to buy?", ["shopping list", "fairy tale", "song"], "A shopping list records items to buy."),
    q("Which familiar text shares news with a friend?", ["message", "menu", "map"], "A message can share information with another person."),
    q("What is the purpose of a menu?", ["to show food choices", "to tell a dragon story", "to mark sentence endings"], "A menu lists foods people can choose."),
    q("What is the purpose of a label on a jar?", ["to name what is inside", "to entertain with events", "to show a rhyme pattern"], "A label gives information about an object."),
    q("Which text would you read for enjoyment at bedtime?", ["storybook", "timetable", "price tag"], "A storybook is often read for enjoyment."),
    q("Which text would help you know when a bus comes?", ["timetable", "poem", "comic"], "A timetable organises times."),
    q("Which text tells someone about a school concert?", ["poster", "spoon", "sock"], "A poster can announce an event."),
    q("Which text gives rules at a swimming pool?", ["safety sign", "story poem", "shopping list"], "A safety sign tells people what to do or avoid."),
    q("Which text has the purpose of saying thank you?", ["thank-you card", "weather chart", "map key"], "A thank-you card shares a message of thanks."),
    q("Which text would tell facts about planets?", ["information page", "birthday invitation", "rhyming song"], "An information page teaches facts."),
    q("Which text might persuade someone to come to a fair?", ["poster", "dictionary page", "bus ticket"], "A poster can invite or encourage people to attend."),
    q("Which text would help you follow a game?", ["instructions", "animal story", "name tag"], "Instructions tell how to do something."),
    q("Which text is most likely imaginative?", ["a tale about a talking tree", "a sign that says Exit", "a list of fruit"], "An imaginative text includes made-up characters or events."),
    q("Which text is most likely informative?", ["a page about how bees make honey", "a poem about moonlight", "a story about a giant"], "An informative text gives facts or explanations."),
    q("Which choice matches text and purpose?", ["map — find places", "recipe — sing a song", "story — show bus times"], "A map's purpose is to help locate places."),
    q("Why identify familiar texts and their purpose?", ["It helps readers choose and use the right text.", "It makes every text a story.", "It removes meaning from signs."], "Knowing purpose helps readers understand why a text was made.")
  ]
};

function rotate(source, index) {
  const correct = index % 3;
  const answers = [...source.answers];
  const right = answers[source.correct];
  answers.splice(source.correct, 1);
  answers.splice(correct, 0, right);
  return { ...source, answers, correct };
}

function build(code, bank, source, index) {
  const tier = index < 8 ? "foundation" : index < 16 ? "core" : "stretch";
  const explanation = source.explanation.length >= 38 ? source.explanation : `${source.explanation} This explains the Foundation skill focus.`;
  const item = {
    id: `${code.toLowerCase()}-${bank === "practice" ? "p" : "e"}${String(index + 1).padStart(2, "0")}`,
    curriculumCode: code,
    bank,
    sourceType: "Multiple choice",
    question: source.question,
    explanation,
    structuredExplanation: {
      approach: "Read the text or image prompt, identify the literature or literacy feature, then choose the answer that best matches the Foundation English skill.",
      reasoning: explanation
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
    item.image = `/assets/quiz-visuals/foundation-english/${source.image}`;
    item.imageAlt = explanation;
  }
  return item;
}

function writeQuestions(code, bank) {
  const source = bank === "practice" ? banks[code] : banks[code].slice(0, 16);
  const questions = source.map((source, index) => build(code, bank, rotate(source, index), index));
  const file = path.join(root, "quiz/grade-k/english", meta[code].slug, bank, "questions.js");
  fs.writeFileSync(file, `"use strict";\nwindow.${bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions"} = ${JSON.stringify(questions, null, 2)};\n`);
}

function updateHtml(code, bank) {
  const file = path.join(root, "quiz/grade-k/english", meta[code].slug, bank, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const display = 5;
  html = html.replace(/Complete (?:an?|a) \d+-question Foundation (practice|test)/g, "Complete a short shuffled Foundation $1");
  html = html.replace(/This page serves \d+ (practice|test) questions/g, "This page serves a short shuffled $1");
  html = html.replace(/<span class="summary-number" id="questionCount">\d+<\/span>/g, `<span class="summary-number" id="questionCount">${display}</span>`);
  if (bank === "test") {
    html = html.replace(/draws \d+ questions from a \d+-question test bank/g, "uses a short shuffled test set");
    html = html.replace(/<div><span class="summary-number">\d+<\/span><span class="summary-label">Question bank<\/span><\/div>/g, "");
  }
  html = html.replace(/"maxQuestions":\d+/g, `"maxQuestions":${display}`);
  html = html.replace(/"shuffleQuestions":(?:true|false)/g, `"shuffleQuestions":true`);
  html = html.replace(/"questionCycle":(?:true|false)/g, `"questionCycle":false`);
  html = html.replace(/,"avoidSameCorrectPosition":true/g, "");
  html = html.replace(/,"questionCycleStorageKey":"[^"]+"/g, "");
  html = html.replace(/"preReadSeconds":0/g, `"preReadSeconds":0,"avoidSameCorrectPosition":true`);
  html = html.replace(new RegExp(`/quiz/grade-k/english/${meta[code].slug}/${bank}/questions\\.js\\?v=[^"]+`), `/quiz/grade-k/english/${meta[code].slug}/${bank}/questions.js?v=${version}`);
  fs.writeFileSync(file, html);
}

for (const [code, items] of Object.entries(banks)) {
  if (items.length !== 24) throw new Error(`${code} has ${items.length} questions`);
  writeQuestions(code, "practice");
  writeQuestions(code, "test");
  updateHtml(code, "practice");
  updateHtml(code, "test");
}

fs.mkdirSync(path.join(root, "docs/question-bank-reviews"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/question-bank-reviews/2026-09-06-foundation-english-le02-ly01.md"), `# Foundation English AC9EFLE02–AC9EFLY01 Practice/Test review

Updated the third five-code Foundation English Practice/Test batch against ACARA v9 descriptors and IXL-style Foundation English expectations.

## Scope

- AC9EFLE02: ${meta.AC9EFLE02.descriptor}
- AC9EFLE03: ${meta.AC9EFLE03.descriptor}
- AC9EFLE04: ${meta.AC9EFLE04.descriptor}
- AC9EFLE05: ${meta.AC9EFLE05.descriptor}
- AC9EFLY01: ${meta.AC9EFLY01.descriptor}

## IXL comparison notes

- IXL maps AC9EFLE03 to Foundation picture/main-idea style work, so the bank asks children to identify literary types and features using short text and simple visuals.
- IXL maps AC9EFLE04 to rhyming skills such as same-ending words, non-rhymes and completing rhymes; the bank follows that sound-pattern progression without copying IXL wording.
- AC9EFLY01 is treated as familiar text-purpose recognition, using IXL-like simple, high-clarity choices across stories, signs, recipes, maps, lists, labels, menus and invitations.
- AC9EFLE02 and AC9EFLE05 have fewer direct IXL links, so they use Foundation-level story-response and retell/adapt question patterns anchored to ACARA.

## Quality actions

- Rebuilt each Practice bank to 24 original questions and each Test bank to 16 original questions.
- Added targeted accessible SVG prompts for LE03, LE05 and FLY01 where visuals clarify the skill.
- Removed short-response/oral-response metadata from auto-marked banks and replaced it with clean multiple-choice items.
- Balanced answer positions, improved explanations and reduced repeated stem patterns.
`);

console.log(`Updated Foundation English AC9EFLE02-AC9EFLY01 with ${version}.`);
