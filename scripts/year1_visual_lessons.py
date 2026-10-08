"""Scoped, additive Year 1 teaching improvements from existing research.

Authoring data is code-specific. This script owns only its marked supplement;
it does not regenerate topic pages, banks, metadata or classroom shells.
"""
from pathlib import Path
from html import escape as e
import json, re, textwrap

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/teaching-models/year1'
LESSONS = {}

def lesson(code, title, model, steps, task, answer, caution):
    LESSONS[code] = dict(title=title, model=model, steps=steps, task=task, answer=answer, caution=caution)

# Maths: exact quantities, equal intervals and explicit units.
lesson('AC9M1N01','See where numbers belong',('numberline',96,104,[99,100,103]),
 ['Each space on this line adds one. Read across: 98, 99, 100, 101.', 'Crossing 99 does not restart the count. One more than 99 is 100.', '103 is three steps after 100, so it is greater than 99.'],
 'What number is one step before 102? What number is one step after it?', '101 and 103. Each step changes the number by one.', 'Count the spaces between marks, not only the labelled marks.')
lesson('AC9M1N02','Keep the whole when you split it',('tens',34),
 ['Three complete groups of ten and four ones make 34.', 'Exchange one ten for ten ones: now there are two tens and fourteen ones.', 'Both ways show the same whole: 30 + 4 = 20 + 14 = 34.'],
 'Show 26 in two ways using tens and ones.', '2 tens and 6 ones; or 1 ten and 16 ones. Both total 26.', 'Moving objects into new groups does not change how many there are.')
lesson('AC9M1N03','Count equal groups without missing any',('groups',4,5),
 ['There are four groups. Each group has five counters.', 'Count the groups of five: 5, 10, 15, 20.', 'There are twenty counters altogether. Counting each counter gives the same total.'],
 'Make three groups of five counters. Count the groups, then check each counter.', '5, 10, 15: fifteen counters in three equal groups.', 'Check that every group has the same number before skip-counting.')
lesson('AC9M1N04','Make ten and keep the remaining part',('tenframe',8,5),
 ['Start with eight counters. There are two empty spaces in the first ten-frame.', 'Move two of the five extra counters into those spaces. Three extra counters remain.', 'Now there is one full ten and three more: 8 + 5 = 10 + 3 = 13.'],
 'Use the same idea to work out 9 + 5.', 'Move one of the five to make ten. Four remain, so 10 + 4 = 14.', 'The extra counters are split, not counted twice. Two and three still make five.')
lesson('AC9M1N05','Build the story before choosing the operation',('parts',7,5,'dollars'),
 ['A child has 7 dollars and receives 5 more dollars.', 'The two amounts join. The parts are 7 dollars and 5 dollars.', '7 + 5 = 12. The child now has 12 dollars. Check that the answer fits the story.'],
 'You have 12 counters and give away 5. How many remain?', '7 counters. Here the whole is 12 and the removed part is 5: 12 − 5 = 7.', 'Read what happens. The same numbers can belong to a joining or a taking-away story.')
lesson('AC9M1N06','Sharing and grouping ask different questions',('groups',3,4),
 ['The model contains twelve counters, arranged as three groups of four.', 'Sharing: twelve counters shared equally among three people gives four each.', 'Grouping: twelve counters put into groups of four makes three groups.'],
 'Share eight counters between two people. Then make groups of two from eight counters.', 'Sharing gives four each. Grouping makes four groups of two.', 'Say whether the answer tells how many in each group or how many groups.')
lesson('AC9M1A01','Follow an equal counting step',('numberline',0,10,[0,2,4,6,8,10]),
 ['Start at zero and move two spaces each time.', 'The landing numbers are 0, 2, 4, 6, 8 and 10.', 'Each new number is two more. Use the step to find a missing number or continue the sequence.'],
 'Continue 3, 5, 7, __, __. Explain the step.', '9 and 11. The sequence starts at 3 and adds two each time.', 'A counting sequence can start at a number other than zero.')
lesson('AC9M1A02','Find the smallest repeating unit',('pattern',['triangle','circle','square']*3),
 ['Read the shapes in order: triangle, circle, square.', 'The same three shapes appear again in the same order. This is the repeating unit.', 'After each square, the unit starts again with a triangle.'],
 'Copy the pattern. Add the next three shapes and circle one smallest repeating unit.', 'Triangle, circle, square. One unit contains those three shapes in that order.', 'A repeating pattern repeats its unit; it does not keep adding a larger number.')
lesson('AC9M1M01','Compare the same feature',('lengths',[('Strip A',4),('Strip B',6)]),
 ['The two strips begin at the same line.', 'Strip B reaches farther along the line, so it is longer than strip A.', 'This picture compares length. It does not tell which strip is heavier or holds more.'],
 'Place two ribbons at the same starting point. Which is shorter? Explain how you know.', 'The shorter ribbon ends nearer the shared starting point. Judge length, not colour or width.', 'Longer does not automatically mean heavier. Choose the feature you are comparing.')
lesson('AC9M1M02','Measure with equal units and no gaps',('units',5),
 ['Start the first block at the beginning of the strip.', 'Place five equal-sized blocks end to end. They reach the other end with no gaps or overlaps.', 'The strip is five blocks long. Record both the number and the unit.'],
 'Why would gaps between the blocks make this measurement unreliable?', 'Some of the strip would not be covered by blocks. Put the equal blocks together and measure again.', 'The blocks must be the same size. A count of mixed-sized units is not a clear length.')
lesson('AC9M1M03','Read the order of days',('cards',[('First','Monday'),('Next','Tuesday'),('Then','Wednesday')]),
 ['Read the days in order. Tuesday follows Monday; Wednesday follows Tuesday.', 'A week has seven days. The day after Sunday is Monday.', 'Use a calendar to connect dates to their days. Months do not all have the same number of days.'],
 'What day comes before Friday? What day comes after Sunday?', 'Thursday comes before Friday. Monday comes after Sunday.', 'A new week continues the order; it does not stop after Sunday.')
lesson('AC9M1SP01','A shape keeps its properties when it turns',('shapes',),
 ['Both triangles have three straight sides and three corners.', 'The second triangle is turned. Its position changes, but its sides and corners do not.', 'The circle has a curved edge and no corners. Describe what you can see before naming the shape.'],
 'Turn a paper square. Is it still a square? Give a reason.', 'Yes. It still has four equal sides and four square corners.', 'Do not name a shape only by the way it points. A turned square is still a square.')
lesson('AC9M1SP02','Use a clear start and facing direction',('route',),
 ['The start arrow points upwards. Forward means the way that arrow faces.', 'Move forward two squares. Turn right on the spot.', 'Move forward one square in the new direction. Follow the instructions in order.'],
 'At the same start, move forward one square, turn right, then move forward two squares.', 'Finish two squares to the right and one square above the start, facing right.', 'A turn changes where you face; it is not an extra sideways step.')
lesson('AC9M1ST01','Give each response one place',('data',[('Apple',3),('Pear',2)]),
 ['Five children each choose one fruit. Their answers are apple, pear, apple, apple, pear.', 'Make one record for each answer in its fruit row.', 'There are three apple responses and two pear responses. The total is five, matching the number of children.'],
 'Record these four answers: pear, apple, pear, pear.', 'Apple: 1; pear: 3. Four responses altogether.', 'If the question asks for one favourite, agree that each person gives one answer.')
lesson('AC9M1ST02','Compare counts using the picture key',('data',[('Walking',4),('Cycling',2)]),
 ['The key says one circle represents one child.', 'Count four walking responses and two cycling responses. Their first two circles line up.', 'Walking has two more responses. There are six children altogether.'],
 'If another child cycles, what changes in the display?', 'Add one circle to cycling. There are then three cyclists and seven children altogether.', 'A bigger picture does not mean more children when each picture represents one.')

# Science: supplied observations remain separate from causes and predictions.
lesson('AC9S1U01','Connect a need to what the place provides',('cards',[('Need','Water'),('Place feature','A water bowl'),('Care','Refill it when needed')]),
 ['A pet needs water. A filled water bowl can meet that need.', 'It also needs suitable food, air and a safe place to rest. Water alone does not meet every need.', 'Growing green plants need water, air and suitable light. Soil can support them and provide nutrients; it is not a meal.'],
 'Name one feature of a garden that could meet a bird’s need. Explain the connection.', 'For example, a leafy shrub may provide shelter, or suitable seeds may provide food. Link the feature to the need.', 'Different living things have different needs. A place must meet the needs of the living thing being discussed.')
lesson('AC9S1U02','Use a record instead of guessing a season',('cards',[('Morning','Cloudy'),('After lunch','Rainy'),('Our choice','Use a raincoat')]),
 ['This record describes two observations within one day.', 'The weather changed from cloudy to rainy. A raincoat is a useful choice for the rain.', 'A seasonal pattern needs observations across a longer time. One rainy day does not prove the season changed.'],
 'What could you record each week to notice seasonal changes near your home?', 'For example, weather, daylight, plant changes or suitable clothing. Compare dated records over time.', 'Seasonal patterns differ across Australia. Do not assume every place has snowy winters.')
lesson('AC9S1U03','Show the force direction and observe its effect',('force',),
 ['The arrow shows a push towards the right. It shows the force direction, not a guaranteed travel distance.', 'A push can start, stop or change movement. A push can also change shape, such as pressing soft dough.', 'If an object is blocked, a push may act even when the object does not move. Watch what actually happens.'],
 'With an adult, gently push a safe toy on a clear surface. Say which way you push and what changes.', 'Describe the observed change, such as starting to move or changing direction. No visible movement is also a possible result.', 'A force and its effect are different ideas. A push does not always make an object move.')
lesson('AC9S1H01','Use a pattern to make an everyday decision',('cards',[('We noticed','Soil often dries on warm days'),('We predict','It may be dry today'),('We check','Feel the soil with an adult')]),
 ['Repeated observations can help us predict what may happen.', 'The gardener expects dry soil after another warm day, then checks before deciding to water.', 'The check matters: a prediction helps a decision but does not replace an observation.'],
 'How could noticing dark clouds help someone plan a walk?', 'They might prepare for rain, for example by taking a raincoat, while checking the actual weather and adult advice.', 'A pattern can support a prediction without making the outcome certain.')
lesson('AC9S1I01','Keep noticing, wondering and predicting separate',('cards',[('I noticed','The car went farther on the board than on the rug'),('I wonder','Will it happen again?'),('I predict','It may go farther on the board than on the rug')]),
 ['The observation tells what happened in the earlier trial.', 'The question asks something we can investigate with guidance.', 'The prediction says what may happen next and uses the earlier observation as a reason.'],
 'Say a prediction for the next trial and explain what experience supports it.', 'For example, “I think the car may go farther on the board because it went farther there than on the rug in our first trial.” Accept another reasoned prediction.', 'Do not rewrite a prediction after seeing the outcome. A different result can still help us learn.')
lesson('AC9S1I02','Make a safe, useful plan with an adult',('cards',[('Prepare','Adult checks space and equipment'),('Try','Release the toy safely'),('Record','Observe, then pack away')]),
 ['Agree on the question and prediction before choosing the steps.', 'An adult checks the equipment and clears a safe space. Use a low, stable ramp and large safe objects.', 'Release the toy from the agreed start, observe where it stops, record the result and pack away.'],
 'A person steps into the toy’s path before release. What should you do?', 'Wait. Ask the adult to make the space safe before continuing.', 'A plan must match the question. Safety takes priority over finishing a trial quickly.')
lesson('AC9S1I03','Make a record someone else can understand',('units',5),
 ['The strip is measured with five equal-sized blocks placed together from end to end.', 'Record “5 blocks long”. The number alone does not name the unit.', 'Add what was measured and when, if comparing changes over time. Record what was actually observed.'],
 'An observation note says only “five”. What detail would make the measurement clear?', 'Name the unit and object, for example “The strip was 5 blocks long.” Do not invent a missing observation.', 'A picture without a scale cannot prove an object’s real length. Measure it or show the units.')
lesson('AC9S1I04','Keep counts matched to their labels',('data',[('Day 1',2),('Day 2',4),('Day 3',4)]),
 ['This supplied record shows flower counts: two, four and four on three days.', 'Keep each day beside its count. Put the days in order before describing the change.', 'The count increased from Day 1 to Day 2, then stayed the same from Day 2 to Day 3.'],
 'Does this record show that the count increased every day? Explain.', 'No. Days 2 and 3 both have four. Describe the whole record, including where it stays the same.', 'These symbols represent recorded counts. They do not explain why the flowers changed.')
lesson('AC9S1I05','Keep the prediction even when it does not match',('cards',[('Before the trial','I predict 3 blocks'),('After the trial','We measured 5 blocks'),('Compare','The distances do not match')]),
 ['The prediction was three blocks. The observed result was five blocks, using the same-sized unit.', 'The distance did not match the prediction. Keep both records unchanged.', 'With guidance, compare the start, object, surface and measuring method before deciding what to try next.'],
 'One trial gives 4 blocks and another gives 6. Can you report that both gave 6?', 'No. Keep both results. Check how each trial was carried out and consider another trial with guidance.', 'A surprising result is evidence, not a reason to erase or alter the record.')
lesson('AC9S1I06','Create a science message from the evidence',('data',[('Board',6),('Rug',3)]),
 ['The supplied trial record shows six blocks on the board and three blocks on the rug.', 'A clear sentence is: “In this trial, the car travelled 6 blocks on the board and 3 blocks on the rug.”', 'Add a labelled drawing or table if useful. Share it with a listener and check that the message is clear.'],
 'Write or dictate a sentence comparing the two recorded distances.', 'For example, “The car travelled farther on the board than on the rug in this trial.” Keep the named surfaces and the limit “in this trial”.', 'This record does not prove that every car always travels farther on a board. Report the evidence you have.')

# English: visual organisers show relationships; oral performance remains oral.
lesson('AC9E1LA01','Choose words for the purpose',('cards',[('Ask for information','Where is the glue?'),('Provide information','It is beside the paper.'),('Make a request','Please pass it to Sam.')]),
 ['The first speaker wants a place, so the reply gives a place.', 'A request asks someone to do something. It can help you or another person, such as Sam.', 'Words, expressions and gestures give clues. If clues seem mixed, ask rather than deciding how someone feels.'],
 'Change “Can you help me?” into an offer to help someone else.', 'For example, “Can I help you?” The speaker now offers their own help.', 'Commands need not be angry or loud. Accept signing, AAC and home-language support; do not require eye contact or smiling.')
lesson('AC9E1LA02','Connect a preference to its reason',('cards',[('My preference','I prefer this game'),('Link','because'),('My reason','we can all take turns')]),
 ['Say which choice you prefer.', 'Use because to connect the choice to a reason.', 'A different person may prefer something else and give a different reason. Listen respectfully.'],
 'Tell a partner which book you prefer and give a reason.', 'Accept a clear preference with a relevant reason, such as liking its funny characters. There is no single correct preference.', 'Repeating “because I like it” does not explain what you like about it.')
lesson('AC9E1LA03','Notice how the purpose shapes the text',('cards',[('A procedure','1. Fold the paper.'),('Next step','2. Draw on the front.'),('Last step','3. Give it to a friend.')]),
 ['This text tells someone how to make a card.', 'Its numbered actions show the order to follow.', 'A recount would instead tell what already happened. A story may introduce characters and a problem.'],
 'Why would changing the order of a procedure sometimes cause a problem?', 'Some actions depend on earlier steps. Explain a concrete example, such as folding before drawing the front of a card.', 'Purpose and organisation work together; a title alone is not always enough to identify the purpose.')
lesson('AC9E1LA04','Hear the rhyme and keep the beat',('cards',[('Line 1','Tap, tap, in the sun.'),('Line 2','Tap, tap, now we run.'),('Notice','sun / run')]),
 ['Say the two lines aloud. Tap a steady beat.', 'Tap, tap repeats. Sun and run rhyme because their ending sounds match.', 'Repetition, rhyme and rhythm can help the lines sound connected.'],
 'Which word could rhyme with run: fun or rain? Say the words aloud.', 'Fun. Listen to the matching ending sound, not only the spelling.', 'Rhyming words need matching ending sounds, not matching first letters.')
lesson('AC9E1LA05','Follow a contents entry to a page',('book',),
 ['The contents gives the name of each section and its starting page.', 'To find nests, read “Nests — page 4”, then turn to page 4.', 'A heading names that section. On a screen, a link or button can take you to a section.'],
 'The contents says “Food — page 6”. Where would you look for the food section?', 'Page 6. Check its heading when you arrive.', 'A contents page helps you find information; it is not the whole information itself.')
lesson('AC9E1LA06','Build a complete idea',('cards',[('Who?','The bird'),('What happened?','sang'),('A detail','in the tree.')]),
 ['Join the parts: “The bird sang in the tree.” It makes sense by itself.', '“In the tree” alone gives a place but not the whole idea.', 'A simple sentence can include useful details. It can also describe a state, such as “The bird is small.”'],
 'Make “sat on the mat” into a complete sentence.', 'For example, “The cat sat on the mat.” Accept another suitable naming part.', 'Sentence length alone does not tell you whether the idea is complete.')
lesson('AC9E1LA07','Use the job of a word in its sentence',('cards',[('Who or what?','bird'),('What kind?','small'),('What happened?','sang')]),
 ['Read “The small bird sang.” Bird names the thing; small describes it; sang tells what happened.', 'Words can do different jobs in different sentences. Read the whole sentence first.', 'A verb may describe a state, not only movement: “The bird is small.”'],
 'In “The green frog jumps”, which word describes the frog?', 'Green. Frog names it; jumps tells what it does.', 'Do not decide a word’s job from its position alone.')
lesson('AC9E1LA08','An image can show information words leave out',('arrows',),
 ['Both signs say “This way”. The arrows point in different directions.', 'The words alone do not name the direction. The image adds that information.', 'In other texts, an image may show a setting, an action or a labelled feature. Explain the clue you can actually see.'],
 'Which sign would guide you to the right? What does its image add?', 'The right-arrow sign. Its image shows which direction “this way” means.', 'An image supplies clues; it cannot establish every hidden feeling or cause.')
lesson('AC9E1LA09','Link a topic word to its meaning',('cards',[('Topic','Weather'),('Word','rain'),('Use it','Rain fell after lunch.')]),
 ['A topic word helps name something we are learning about.', 'Explain the word in familiar language, then use it in a sentence about that topic.', 'Check context. The same word can have different meanings in different situations.'],
 'Use the word shelter in a sentence about an animal’s needs.', 'For example, “The rabbit needs a safe shelter.” Accept an accurate sentence and explanation.', 'Knowing a word means using it meaningfully, not only repeating it.')
lesson('AC9E1LA10','Let the message guide the end mark',('cards',[('Telling','Sam has the book.'),('Asking','Does Sam have the book?'),('Strong reaction','What a huge book!')]),
 ['A full stop ends this telling sentence.', 'A question mark shows that the second sentence asks a question.', 'An exclamation mark can show a strong reaction. A calm command can still end with a full stop.'],
 'Fix this question: “where is sam”', '“Where is Sam?” Start the sentence and the name with capitals; finish with a question mark.', 'An exclamation mark alone does not tell you whether the message is a command or a reaction.')
lesson('AC9E1LE01','Use story details to explain a character',('cards',[('Story words','Sam shared the last apple with a friend.'),('What happened?','Sam shared an apple with a friend.'),('Our idea','Sam may be kind.')]),
 ['The story tells an action: Sam shared the apple.', 'That detail supports the idea that Sam may be kind.', 'An illustration can add more clues about the character, place and event. Check the actual picture rather than imagining missing details.'],
 'Which story detail supports “Sam may be kind”?', 'Sharing the last apple with a friend. Link the character idea to the action.', 'Describe a character using evidence from the story, rather than appearance alone.')
lesson('AC9E1LE02','Explain your connection to a story',('cards',[('In the story','A child lost a toy.'),('My experience','I lost my hat once.'),('My response','I understand feeling worried.')]),
 ['Name the story event you are responding to.', 'Connect it to something you have experienced or know about.', 'Explain how the connection helps you understand the story. You may respond differently from a partner.'],
 'Share a connection to a familiar story, or explain why an event interests you.', 'Accept a relevant connection or thoughtful response, with a link to the text. Children need not disclose private experiences.', 'Your experience helps interpretation; it does not change what happened in the story.')
lesson('AC9E1LE03','Separate who, where and what happens',('cards',[('Character','Sam'),('Setting','The park'),('Plot event','Sam lost a ball.')]),
 ['The character is who the story is about.', 'The setting gives the place and may also tell when the story happens.', 'The plot follows what happens. Losing the ball could introduce a problem to be solved.'],
 'Tell a possible next event that follows this problem.', 'For example, Sam looks beside the slide or asks a friend to help. Explain how the event follows losing the ball.', 'The setting is not the event; “the park” and “losing the ball” tell different parts.')
lesson('AC9E1LE04','Make a pattern with sounds',('cards',[('Beginning sound','big / blue / bag'),('Ending sound','bee / tree'),('Say it','Big blue bag. Bee in a tree.')]),
 ['Big, blue and bag begin with the same /b/ sound: this is alliteration.', 'Bee and tree have matching ending sounds: they rhyme.', 'Say a short pattern aloud, then choose new words that keep its sound pattern and meaning.'],
 'Add a word that begins with /s/ to “silly, sunny, ___”.', 'For example, sandy or sleepy. Accept an appropriate word starting with /s/.', 'Alliteration uses beginning sounds; rhyme uses ending sounds. They are different patterns.')
lesson('AC9E1LE05','Retell first, then change one part',('cards',[('Beginning','Sam takes a ball to the park.'),('Problem','The ball rolls away.'),('Ending','A friend helps find it.')]),
 ['Retell the main events in their order.', 'To adapt the story, choose a part to change, such as the character or place.', 'Keep the changed events connected. If the place changes, some actions may need to change too.'],
 'Retell this story with a different character. Keep the lost-ball problem.', 'Accept a clear retelling with the changed character and a connected ending.', 'An adaptation makes a deliberate change; a retelling preserves the important events.')
lesson('AC9E1LY01','Use features to work out a text’s job',('cards',[('Feature','Numbered steps'),('Example','1. Fold. 2. Draw.'),('Purpose','Tell how to do something')]),
 ['Look at how the text is organised.', 'These numbered actions are a clue that the text gives instructions.', 'Check other clues too. A story can mention steps without being a procedure.'],
 'What features might help you find facts about birds?', 'For example, headings, labels and factual sentences in an information text. Explain their use.', 'One feature is a clue, not always proof of the whole text’s purpose.')
lesson('AC9E1LY02','Show that you heard the other person’s idea',('cards',[('Partner says','I liked the funny ending.'),('You respond','Which part made you laugh?'),('Partner adds','When the hat fell off.')]),
 ['Listen to the idea and wait for a turn.', 'Ask a related question or add a connected comment.', 'Speak clearly in a way that works for the listener. Signing or communication tools can also support a conversation.'],
 'A partner says, “I built a tall tower.” Ask a related question.', 'For example, “How did you keep it standing?” Accept a question connected to the tower.', 'Listening does not require compulsory eye contact. Check understanding through the response.')
lesson('AC9E1LY03','Compare texts about the same subject',('cards',[('Story','A bird flew to the moon.'),('Information','Birds have feathers.'),('Persuasion','Please protect bird habitats.')]),
 ['The first example imagines a story event.', 'The second gives information about birds.', 'The third asks the reader to support an action. Texts can mix purposes, so explain the clues.'],
 'Which example would best help you find a fact about a bird’s body?', '“Birds have feathers.” It directly gives relevant information.', 'A text mentioning an animal is not automatically an information text.')
lesson('AC9E1LY04','Check the letters when a word does not fit',('sounds',['f','r','o','g'],'frog'),
 ['In “The frog hops”, look through the letters in frog and blend the sounds in order.', 'If you read flag, the meaning may alert you to a problem. Return to the letters and re-blend.', 'Read the phrase again smoothly and check that it makes sense. A picture can support meaning, but it does not replace decoding.'],
 'Read “The frog hops” aloud. Point to the letters while checking frog.', 'Hear the child read the word and sentence. Supply help with the taught letter–sound correspondences when needed.', 'Guessing a word from a picture is not the same as reading its spelling.')
lesson('AC9E1LY05','Explain an inference with its clue',('cards',[('Text clue','Sam packed a raincoat.'),('My idea','Sam may expect rain.'),('Check','Read what happens next.')]),
 ['The text says that Sam packed a raincoat.', 'That clue supports an idea about expecting rain. It does not prove that rain will fall.', 'Keep reading and adjust the idea if new information changes it.'],
 'Why is “Sam may expect rain” more careful than “It definitely rains”?', 'The raincoat is a clue about a possible expectation; the text has not yet said that it rained.', 'An inference uses clues and thinking. Keep it separate from a directly stated fact.')
lesson('AC9E1LY06','Reread to check meaning and sentence boundaries',('cards',[('Draft','my dog run fast'),('Reread','Who? My dog. What does it do?'),('Edited','My dog runs fast.')]),
 ['Read the draft aloud and check what it means.', 'Change run to runs so it fits “my dog”. Add a capital and full stop.', 'Reread the edited sentence. Then check spelling and whether useful details are needed.'],
 'Write a sentence about a pet or familiar object. Reread and edit it.', 'An adult checks a complete, meaningful sentence with appropriate capitals and end punctuation; support spelling as needed.', 'Editing means checking meaning as well as making the page look neat.')
lesson('AC9E1LY07','Give a short talk a clear shape',('cards',[('Opening','I will tell you about frogs.'),('Middle','Frogs need suitable water and food.'),('Ending','That is why their habitat matters.')]),
 ['Introduce the topic so the listener knows what the talk is about.', 'Give one or two relevant details using words you understand.', 'End with a connected statement. Rehearse volume and pace with a listener; use a picture or gesture if helpful.'],
 'Give a short talk about a familiar object with an opening, a detail and an ending.', 'A listener checks the actual talk for clear order and relevant details. Accept supported speaking, signing or AAC.', 'Choosing a good talk on a screen does not show that the child delivered a presentation.')
lesson('AC9E1LY08','Make the space between words visible',('spacing',),
 ['Use the letter shapes taught at school and write the letters unjoined.', 'Leave a clear word space between cat and sat.', 'Reread the handwriting. Check that the letters are recognisable and the two words remain separate.'],
 'Write “cat sat” on paper using your taught letter forms.', 'Check the actual handwriting: recognisable unjoined letters and a clear space between words. This screen model is not a stroke-order guide.', 'Typing or naming letters alone does not demonstrate handwriting.')
lesson('AC9E1LY09','Count spoken sounds, not letters',('sounds',['sh','o','p'],'shop'),
 ['Say shop naturally. Say its sounds in order: /sh/, /o/, /p/.', 'There are three sounds. The two letters sh represent one sound.', 'Compare frog: /f/, /r/, /o/, /g/. The beginning blend has two separate sounds.'],
 'With the spelling covered, ask an adult to say frog. Tap each sound, then blend it back.', 'Four sounds in order: /f/, /r/, /o/, /g/. Accept ordinary accent variation.', 'Letter counts, syllable claps and phoneme counts are different tasks. Do this check orally.')
lesson('AC9E1LY10','Change a sound to change a spoken word',('cards',[('Say','mat'),('Change','Replace /m/ with /s/'),('Say the new word','sat')]),
 ['An adult says mat. Listen to its three sounds.', 'Replace only the first sound with /s/. Keep the other sounds in order.', 'Blend the changed sounds to say sat. Practise adding or removing a sound in separate oral tasks too.'],
 'Without showing the spelling, ask the child to change the /p/ in pin to /t/.', 'Tin. Listen for the sound change rather than a copied written answer.', 'Keep the sounds that were not changed. Sound manipulation is an oral skill, not just a letter swap.')
lesson('AC9E1LY11','Blend a digraph as one sound',('sounds',['sh','i','p'],'ship'),
 ['The letters sh work together for one sound in ship.', 'Blend /sh/, /i/, /p/ to read ship. Do not add a separate /s/ and /h/.', 'A blend is different: the f and r in frog keep two sounds. Learn the particular spelling pattern in each word.'],
 'Read ship, then spell it using the sounds and their letters.', 'Hear /sh/, /i/, /p/ and see the spelling s-h-i-p. Reading and spelling are checked separately.', 'Two letters sometimes represent one sound; they do not always do so.')
lesson('AC9E1LY12','Hear the vowel sound in each syllable',('cards',[('Say it','sunset'),('First syllable','sun'),('Second syllable','set')]),
 ['Say sunset naturally, then clap sun and set: two syllables.', 'Listen for a vowel sound in each part.', 'A vowel letter can represent different sounds in different words. Count what you hear, not only the written letters.'],
 'Say robot. How many syllables do you hear?', 'Two: ro-bot. Accept the usual pronunciation in the child’s accent.', 'Two written vowel letters may represent one vowel sound, as ai does in rain.')
lesson('AC9E1LY13','Use sounds and syllables when spelling',('cards',[('Hear the word','sunset'),('Say its parts','sun / set'),('Write and check','s-u-n-s-e-t')]),
 ['An adult says the word while its spelling is hidden.', 'Say the syllables, then listen to the sounds in each part.', 'Write the word using known patterns. Compare with the correct spelling after trying, and discuss any correction.'],
 'Ask an adult to dictate picnic with its spelling hidden.', 'Picnic: pic-nic. Check all six letters after the child writes the word.', 'Copying a displayed word is useful practice but is not independent spelling from dictation.')
lesson('AC9E1LY14','Map the unusual part of a familiar word',('sounds',['s','ai','d'],'said'),
 ['In said, s and d have their familiar sounds.', 'The ai spelling represents the short /e/ sound in this word. This is the part to remember.', 'Read said in a sentence, cover it, write it, then check the complete spelling.'],
 'Read “Sam said hello.” Then cover said, write it and check.', 'The word is said. Hear the child read it and check the written spelling; record any support.', 'Do not assume ai always has the same sound. Said is a word-specific spelling to learn.')
lesson('AC9E1LY15','Keep the base meaning and notice the ending',('cards',[('Base','jump'),('Before now','jump + ed → jumped'),('Happening','jump + ing → jumping')]),
 ['Jump is the shared meaningful base in these words.', 'In “Sam jumped”, ed helps show the action happened before now.', 'In “Sam is jumping”, ing is used with is to describe the action happening. Other endings have other jobs.'],
 'Choose the word for “Yesterday Sam ___”: jump, jumped or jumping.', 'Jumped: “Yesterday Sam jumped.” Explain how yesterday and the ending fit the meaning.', 'A word family shares a meaningful base; rhyming words need not belong to the same family.')

def text(x,y,value,size=24,anchor='start',fill='#17334d',weight='normal'):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" fill="{fill}" font-size="{size}" font-weight="{weight}">{e(str(value))}</text>'

def rect(x,y,w,h,fill='#edf6f5',stroke='#28786f',rx=8):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>'

def circle(x,y,r=11,fill='#28786f'):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="#17334d" stroke-width="1.5"/>'

def svg_model(code, spec):
    kind,*data=spec
    b=[]; desc=''; height=280
    if kind=='numberline':
        lo,hi,marks=data; span=hi-lo;left=48;right=672;step=(right-left)/span
        b.append('<path d="M48 135H672" stroke="#17334d" stroke-width="3"/>')
        for n in range(lo,hi+1):
            x=left+(n-lo)*step;b.append(f'<path d="M{x} 125V145" stroke="#17334d" stroke-width="2"/>');b.append(text(x,178,n,22,'middle'))
        for n in marks:b.append(circle(left+(n-lo)*step,135,7))
        b.append(text(360,65,'Equal spaces show equal steps',25,'middle'))
        desc=f'Number line from {lo} to {hi} in steps of one. Marked numbers: '+', '.join(map(str,marks))+'.'
    elif kind=='tens':
        n=data[0]; tens,ones=divmod(n,10)
        for t in range(tens):
            for j in range(10):b.append(rect(60+t*65,45+j*16,16,16,rx=0))
        for j in range(ones):b.append(rect(350+j*55,115,16,16,rx=0))
        b += [text(125,238,f'{tens} tens',25,'middle'),text(430,238,f'{ones} ones',25,'middle'),text(620,150,n,45,'middle',weight='bold')]
        desc=f'{tens} rods with ten units each and {ones} separate units: {n} altogether.'
    elif kind=='groups':
        groups,count=data;width=148
        for i in range(groups):
            x=30+i*170;b.append(rect(x,65,width,110))
            for j in range(count):b.append(circle(x+32+(j%3)*42,95+(j//3)*42))
            b.append(text(x+width/2,215,f'{count} each',23,'middle'))
        desc=f'{groups} equal groups, with {count} counters in each. Total {groups*count}.'
    elif kind=='tenframe':
        first,extra=data; need=10-first; remain=extra-need
        for frame,x in [(0,35),(1,385)]:
            for j in range(10):
                cx=x+(j%5)*58;cy=65+(j//5)*58;b.append(rect(cx,cy,58,58,'#fff',rx=0))
                if j<(10 if frame==0 else remain):b.append(circle(cx+29,cy+29,19,'#28786f' if frame or j<first else '#e6ac42'))
        b += [text(180,228,f'{first} + {need} = 10',26,'middle'),text(535,228,f'{remain} left',26,'middle')]
        desc=f'Make ten for {first} plus {extra}. {need} extra counters fill the first frame; {remain} remain in the second. Different outline/fill groups are also explained in the caption.'
    elif kind=='parts':
        a,z,unit=data;b += [rect(270,28,180,70),text(360,73,f'{a+z} {unit}',30,'middle'),'<path d="M300 100L185 165M420 100L535 165" stroke="#28786f" stroke-width="3"/>',rect(95,165,180,70),rect(445,165,180,70),text(185,212,f'{a} {unit}',27,'middle'),text(535,212,f'{z} {unit}',27,'middle')]
        desc=f'Part-part-whole model: {a} {unit} and {z} {unit} join to make {a+z} {unit}.'
    elif kind=='pattern':
        shapes=data[0]
        for i,s in enumerate(shapes):
            x=45+i*76
            if s=='triangle': b.append(f'<path d="M{x} 140L{x+25} 85L{x+50} 140Z" fill="#fff" stroke="#17334d" stroke-width="3"/>')
            elif s=='circle': b.append(f'<circle cx="{x+25}" cy="115" r="25" fill="#fff" stroke="#17334d" stroke-width="3"/>')
            else:b.append(rect(x,90,50,50,'#fff',rx=0))
        b += ['<path d="M40 165V183H247V165" fill="none" stroke="#28786f" stroke-width="3"/>',text(145,225,'one unit',24,'middle')]
        desc='Triangle, circle, square repeated three times. A bracket marks the first three shapes as one repeating unit.'
    elif kind=='lengths':
        for i,(label,n) in enumerate(data[0]):
            y=72+i*95;b += [text(35,y+29,label),rect(165,y,n*67,42),text(165+n*67+20,y+29,f'{n} units',23)]
        b.append('<path d="M165 45V235" stroke="#17334d" stroke-width="2" stroke-dasharray="6 5"/>')
        desc='Two strips aligned to the same start. Strip A is four units long; strip B is six units long.'
    elif kind=='units':
        n=data[0];w=108;b += [rect(75,52,n*w,45,'#dce8f3'),text(360,30,'Measured strip',23,'middle')]
        for j in range(n):b += [rect(75+j*w,100,w,60,'#fff',rx=0),text(75+(j+.5)*w,141,j+1,25,'middle')]
        b += [text(360,222,f'{n} equal blocks • no gaps • no overlaps',26,'middle')]
        desc=f'Strip exactly spans {n} equal blocks. Blocks touch end to end without gaps or overlaps.'
    elif kind=='shapes':
        b += ['<path d="M75 195L140 55L205 195Z M315 75L315 205L455 140Z" fill="#fff" stroke="#17334d" stroke-width="3"/>','<circle cx="590" cy="137" r="66" fill="#fff" stroke="#17334d" stroke-width="3"/>',text(140,242,'3 corners',23,'middle'),text(370,242,'3 corners',23,'middle'),text(590,242,'no corners',23,'middle')]
        desc='Two triangles in different orientations each have three sides and corners. A circle has no corners.'
    elif kind=='route':
        for y in range(4):
            for x in range(5):b.append(rect(180+x*60,18+y*60,60,60,'#fff',rx=0))
        b += ['<path d="M270 244V211" stroke="#17334d" stroke-width="3" marker-end="url(#arrow)"/><circle cx="330" cy="108" r="10" fill="white" stroke="#28786f" stroke-width="3"/><path d="M270 211V108H330" fill="none" stroke="#28786f" stroke-width="5" marker-end="url(#arrow)"/>',text(155,235,'Start',23,'end'),text(520,110,'Finish',23),text(360,278,'Forward 2 → turn right → forward 1',24,'middle')]
        height=310;desc='Five-column, four-row grid. Start in row four column two, facing up. Move two cells up, turn right, move one cell right to row two column three.'
    elif kind=='data':
        rows=data[0];height=max(250,80+len(rows)*63)
        for i,(label,n) in enumerate(rows):
            y=75+i*63;b.append(text(190,y+7,label,24,'end'))
            for j in range(n):b.append(circle(235+j*58,y,14))
            b.append(text(640,y+7,n,24,'middle',weight='bold'))
        unit={'AC9M1ST01':'one child response','AC9M1ST02':'one child response','AC9S1I04':'one flower','AC9S1I06':'one block of distance'}.get(code,'one recorded item')
        b.append(text(360,height-16,'Key: one circle = '+unit,23,'middle'))
        desc='One-to-one display: '+ '; '.join(f'{label}: {n}' for label,n in rows)+'. Each circle represents '+unit+'.'
    elif kind=='force':
        b += [rect(270,105,130,65,'#edf6f5'),text(335,145,'Object',24,'middle'),'<path d="M65 136H240" stroke="#28786f" stroke-width="5" marker-end="url(#arrow)"/>',text(155,88,'Push',26,'middle'),text(520,140,'Force to the right',23,'middle'),text(360,232,'Observe what changes',25,'middle')]
        desc='A rightward force arrow labelled push points towards a generic object. The arrow represents force direction, not a measured movement.'
    elif kind=='book':
        b += [rect(40,35,280,205,'#fff'),text(65,75,'Contents',29,weight='bold'),text(65,125,'Nests .......... 4',26),text(65,175,'Food ........... 6',26),rect(400,35,280,205,'#fff'),text(425,75,'Nests',29,weight='bold'),text(425,128,'Birds build nests.',24),text(650,219,'4',23,'middle'),'<path d="M333 130H382" stroke="#28786f" stroke-width="3" marker-end="url(#arrow)"/>']
        desc='A contents page lists Nests on page 4 and Food on page 6. An arrow leads to a model page headed Nests, numbered 4.'
    elif kind=='arrows':
        for x in [60,400]:b += [rect(x,45,260,175,'#fff'),text(x+130,92,'This way',30,'middle')]
        b += ['<path d="M260 155H125M440 155H575" fill="none" stroke="#28786f" stroke-width="7" marker-end="url(#arrow)"/>']
        desc='Two signs have the same words, This way. The left sign has a left-pointing arrow; the right sign has a right-pointing arrow.'
    elif kind=='spacing':
        b += [text(80,90,'Words need a space',27),text(80,165,'cat',47),text(310,165,'sat',47),'<path d="M208 184V200H292V184" fill="none" stroke="#28786f" stroke-width="3"/>',text(250,242,'word space',24,'middle')]
        desc='The words cat and sat are shown separately, with a bracket highlighting their word space. This is a spacing model, not a handwriting formation exemplar.'
    elif kind=='sounds':
        chunks,word=data;w=min(140,540/len(chunks));start=(720-len(chunks)*w)/2
        for i,chunk in enumerate(chunks):b += [rect(start+i*w,73,w-10,83,'#fff'),text(start+i*w+(w-10)/2,127,chunk,40,'middle',weight='bold')]
        b += [text(360,210,word,34,'middle'),text(360,250,'One box for each sound in this word',23,'middle')]
        desc=f'{word}: '+', '.join(chunks)+'. One box represents each spoken sound; a box may contain more than one letter.'
    elif kind=='cards':
        rows=data[0];y=16
        for heading,value in rows:
            lines=textwrap.wrap(value,width=43) or ['']
            h=62+len(lines)*30
            b.append(rect(25,y,670,h,'#fff'))
            b.append(text(45,y+30,heading,21,fill='#28786f',weight='bold'))
            for i,line in enumerate(lines):b.append(text(45,y+64+i*30,line,26))
            y+=h+13
        height=y+3
        desc='; '.join(f'{heading}: {value}' for heading,value in rows)+'.'
    else:raise ValueError(kind)
    title=LESSONS[code]['title']
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 {height}" width="720" height="{height}" role="img" aria-labelledby="title desc"><title id="title">{e(title)}</title><desc id="desc">{e(desc)}</desc><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#28786f"/></marker></defs><rect width="720" height="{height}" fill="white"/><g font-family="Arial,Helvetica,sans-serif">'+''.join(b)+'</g></svg>\n'
    return svg,desc,height

def section(code,d,desc,height):
    return f'''<!-- skillr-year1-visual-lesson:start -->
<details class="curriculum-topic-section year1-visual-lesson" id="visual-worked-example">
<summary><strong>See the idea: {e(d['title'])}</strong></summary>
<div class="curriculum-detail-body year1-visual-body">
<h2>{e(d['title'])}</h2>
<figure><img src="/assets/teaching-models/year1/{code.lower()}.svg" width="720" height="{height}" loading="lazy" decoding="async" alt="{e(desc)}"><figcaption>{e(desc)}</figcaption></figure>
<h3>Work through the example</h3><ol>{''.join('<li>'+e(x)+'</li>' for x in d['steps'])}</ol>
<p class="year1-teaching-note"><strong>Watch for this:</strong> {e(d['caution'])}</p>
<h3>Try it together</h3><p>{e(d['task'])}</p>
<details class="year1-example-answer"><summary>Answer and teaching guidance</summary><p>{e(d['answer'])}</p></details>
<p class="year1-adult-support">An adult can read the directions, model the idea and accept an oral, pointed or drawn explanation where appropriate. For reading, spelling, handwriting or speaking tasks, observe the child doing the stated skill.</p>
</div></details>
<!-- skillr-year1-visual-lesson:end -->'''

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    records=[]
    for code,d in LESSONS.items():
        pages=list((ROOT/'year1').glob(f'*/{code.lower()}*/index.html'))
        if len(pages)!=1:raise ValueError((code,pages))
        p=pages[0];svg,desc,height=svg_model(code,d['model']);(OUT/f'{code.lower()}.svg').write_text(svg)
        block=section(code,d,desc,height)
        for file in [p,p.parent/'teacher-slides/index.html']:
            if not file.exists():
                continue
            content=file.read_text()
            file_block=block if file==p else block.replace('<details class="curriculum-topic-section year1-visual-lesson"','<details name="lesson" class="curriculum-topic-section year1-visual-lesson"')
            if 'skillr-year1-visual-lesson:start' in content:
                content=re.sub(r'<!-- skillr-year1-visual-lesson:start -->.*?<!-- skillr-year1-visual-lesson:end -->',file_block,content,flags=re.S)
            elif file==p:
                marker=re.search(r'<details\b[^>]*>\s*<summary[^>]*>\s*(?:<strong>)?(?:Common misconceptions|Misconceptions)',content)
                if not marker:raise ValueError(f'Missing insertion anchor: {file}')
                content=content[:marker.start()]+block+'\n'+content[marker.start():]
            else:
                # The current classroom resource is a static accordion. Preserve it.
                marker=re.search(r'<details\b[^>]*>\s*<summary[^>]*>\s*<span>Curriculum examples',content)
                if not marker:raise ValueError(f'Missing classroom insertion anchor: {file}')
                content=content[:marker.start()]+block.replace('<details class="curriculum-topic-section year1-visual-lesson"','<details name="lesson" class="curriculum-topic-section year1-visual-lesson"')+'\n'+content[marker.start():]
            if '/assets/css/year1-visual-lessons.css' not in content:
                content=content.replace('</head>','<link rel="stylesheet" href="/assets/css/year1-visual-lessons.css?v=20261009">\n</head>',1)
            file.write_text(content)
        records.append(dict(code=code,topic=str(p.relative_to(ROOT)),classroom=str((p.parent/'teacher-slides/index.html').relative_to(ROOT)),model_file=code.lower()+'.svg',**d))
    (ROOT/'docs/year1-visual-lessons-2026-10-09.json').write_text(json.dumps(records,indent=2,ensure_ascii=False)+'\n')
    print(f'Added {len(records)} code-specific visual lessons to topics and matching Classroom Views.')

if __name__=='__main__':main()
