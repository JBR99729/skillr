import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BANK = path.join(ROOT, 'assets/assessment-banks/year5/english');
const QUIZ = path.join(ROOT, 'quiz/year-5/english');

const extra = {
  AC9E5LA01: [
    ['A student writes “Hey, can you send me the timetable?” to a friend but “Could you please send me the timetable?” to the office. What does the change show?', 'The wording changes to suit the relationship and setting.', ['The writer forgot the timetable.','The two requests have different facts.'], 'Audience and relationship affect the level of formality.'],
    ['Which greeting best suits an email to a local council officer about a playground?', 'Dear Councillor Patel,', ['Yo Patel!','Hey mate!'], 'A respectful title and greeting suit a formal civic context.'],
    ['A team captain says, “Let’s hear from someone who has not spoken yet.” What relationship does this language help build?', 'An inclusive, respectful relationship.', ['A secret relationship.','A competitive relationship where only one voice matters.'], 'The invitation gives each group member a valued role.'],
    ['Change “Give me your notes” so it signals respect when speaking to a classmate.', 'Could I please borrow your notes?', ['Give me those notes now.','Your notes belong to me.'], 'A polite request recognises the other person’s choice and role.'],
    ['Why might a school principal use “I ask all students to…” instead of “You lot have to…”?', 'It sounds respectful and suits a whole-school audience.', ['It makes the message less clear.','It changes the topic to sport.'], 'The first wording communicates authority without insulting the audience.'],
    ['Two versions announce a club: “Join our club!” and “Students interested in robotics are invited to attend.” Which is more formal, and why?', 'The second is more formal because it uses a complete, specific invitation.', ['The first is more formal because it is shorter.','They are identical in tone.'], 'Specific nouns and an invitation structure suit a public school notice.'],
    ['A younger child asks for help and an older student replies, “Of course—I can show you.” What does “of course” signal?', 'Warmth and willingness to help.', ['Anger and rejection.','That the speaker is ending the conversation.'], 'The phrase reassures the listener and supports a helpful relationship.'],
    ['Explain why “Would you mind moving your bag?” may be more suitable than “Move your bag” in a shared classroom.', 'It makes the request less forceful and acknowledges the other person.', ['It gives the bag a different purpose.','It proves the speaker owns the classroom.'], 'Politeness choices help a request fit a cooperative classroom relationship.']
  ],
  AC9E5LA07: [
    ['A weather map uses a dark blue symbol for heavy rain and a key explaining it. How does the key contribute to meaning?', 'It tells readers what the symbol represents.', ['It changes the weather.','It shows who drew the map.'], 'A key lets readers interpret a visual symbol accurately.'],
    ['A science table lists plant height for four weeks. What can the table show more clearly than a paragraph?', 'The exact values for each week can be compared quickly.', ['The plant’s favourite colour.','The author’s opinion about gardening.'], 'Rows and columns organise comparable measurements.'],
    ['A diagram labels arrows from mouth to stomach. What does the sequence help a reader understand?', 'The direction food travels through the digestive system.', ['The size of the classroom.','Which food tastes best.'], 'Arrows and labels represent movement and parts in a process.'],
    ['A map places a legend beside colours for parks, roads and rivers. Why is the legend necessary?', 'It explains the meaning of the map’s colours and symbols.', ['It makes every road longer.','It proves the map is a photograph.'], 'Without the legend, readers may not know what the visual marks mean.'],
    ['A graph shows rubbish collected by four houses. The tallest bar belongs to House C. What can a reader infer?', 'House C collected the greatest amount in the comparison.', ['House C collected rubbish every day forever.','House C owns the graph.'], 'Bar height represents the amounts being compared; it does not prove extra claims.'],
    ['A set of four pictures shows a seed, a sprout, a flowering plant and fruit. How does the sequence add meaning?', 'It represents stages in the plant’s growth.', ['It shows four unrelated objects.','It proves every plant grows at the same speed.'], 'The ordered images communicate change over time.'],
    ['A labelled diagram has arrows pointing to a frog’s legs, eyes and webbed feet. What is its main purpose?', 'To show parts and provide information about the frog.', ['To tell a fictional adventure.','To persuade readers to buy a frog.'], 'Labels connect names and information to visible parts.'],
    ['A graph has no title or units. What should the reader question before trusting it?', 'What the data measure and what the numbers represent.', ['Whether the page is blue.','Whether graphs can ever be useful.'], 'A title and units provide essential context for interpreting data.']
  ],
  AC9E5LE01: [
    ['In a story, a cracked lunchbox is shown beside a child sitting alone. What might these details represent?', 'The character may be feeling isolated or having a difficult day.', ['The lunchbox is definitely magical.','The child is preparing a recipe.'], 'Objects and setting details can represent feelings or ideas beyond their literal meaning.'],
    ['A character repeatedly looks at a locked gate while the narrator describes the open park beyond it. What contrast is created?', 'The gate can represent restriction while the park suggests freedom.', ['The gate proves the park is underwater.','The description contains no contrast.'], 'The details work together to represent an emotional or thematic contrast.'],
    ['Why might an author describe a small candle glowing in a dark room?', 'The candle may represent hope or courage.', ['It proves candles are always expensive.','It changes the room into daytime.'], 'A concrete detail can carry a symbolic meaning in a literary text.'],
    ['A poem describes a river carrying old leaves past a child leaving home. What could the river represent?', 'Time and change continuing as the child grows.', ['A rule that rivers cannot move.','Only the colour green.'], 'The natural image can connect to the character’s transition.'],
    ['A character gives away a treasured toy before moving house. What might the action reveal?', 'The character is accepting change while remembering the past.', ['The character dislikes all toys.','The move has already been cancelled.'], 'An action can represent an inner feeling or turning point.'],
    ['A story’s setting changes from a noisy market to a quiet empty street after an argument. What effect can the change have?', 'It can represent the character’s loneliness or changed mood.', ['It proves the market was imaginary.','It makes every character cheerful.'], 'Setting details can mirror and represent emotional change.'],
    ['A writer gives a storm the verb “swallowed” the coastline. What might the storm represent?', 'A powerful threat that overwhelms people.', ['A friendly pet.','A small ordinary puddle.'], 'The unusual description presents the storm as dangerous and consuming.'],
    ['When explaining what a detail represents, what is the strongest evidence?', 'The detail plus its connection to the character, event or theme.', ['A guess with no reference to the text.','The number of pages in the book.'], 'Interpretations need a text detail and a clear connection to the wider text.']
  ],
  AC9E5LY01: [
    ['A story describes a crowded 1950s kitchen with a radio, a wood stove and ration books. What does this setting reveal?', 'It reflects the technology and living conditions of that time.', ['It proves the story happens in the future.','It shows that all kitchens are identical.'], 'Objects and routines can reveal the historical context of a text.'],
    ['A character writes a letter using “Dear Sir” and a fountain pen in a story set long ago. What does this choice suggest?', 'The language and writing tools suit the period represented.', ['The character is using a smartphone.','The story has no time setting.'], 'Text details can reflect the time in which events occur.'],
    ['Why might a historical novel include words or objects unfamiliar to modern readers?', 'To represent the beliefs, technology or daily life of the earlier time.', ['To make every reader confused.','To prove the author made a spelling error.'], 'Unfamiliar details can help construct a believable historical setting.'],
    ['A text set during a drought describes water being saved carefully. What does this detail help the reader understand?', 'The conditions and concerns affecting people at that time.', ['That water has no value.','That the text must be a recipe.'], 'Environmental conditions shape the characters’ experiences.'],
    ['Compare a present-day classroom with a classroom in a text from 100 years ago. What should a strong comparison include?', 'Specific details about objects, routines or relationships in each time.', ['Only which classroom looks nicer.','A claim about every classroom in history.'], 'Evidence from both contexts supports a useful comparison.'],
    ['A story uses “telegram” instead of “text message”. What does that word choice do?', 'It helps signal an earlier historical setting.', ['It shows the message is invisible.','It makes the setting a fantasy world automatically.'], 'Technology vocabulary can place a text in time.'],
    ['A character cannot easily travel because the story has no cars or trains. What can this detail suggest?', 'Travel and daily life were shaped by the technology of the period.', ['The character lives on another planet.','The author forgot to create a setting.'], 'Available technology affects what characters can do.'],
    ['What is the safest way to decide whether a text reflects a particular time?', 'Use several details from the text and connect them to that period.', ['Use one unfamiliar word only.','Guess from the cover colour.'], 'A historical interpretation should be supported by multiple relevant clues.']
  ],
  AC9E5LY02: [
    ['A partner says, “I think the ending is unfair.” Which response shows active listening?', 'I understand why you think that; the final choice surprised me too.', ['You are wrong.','I was not listening.'], 'The response acknowledges the idea and adds a related thought.'],
    ['Paraphrase this idea: “The narrator changes the plan because the weather becomes dangerous.”', 'The narrator alters the plan when the weather turns unsafe.', ['The narrator ignores the weather.','The plan is a sunny picnic only.'], 'A paraphrase keeps the meaning while using new wording.'],
    ['During a group task, what should you do before disagreeing with a classmate’s suggestion?', 'Restate the suggestion to show you understood it.', ['Interrupt immediately.','Change the topic.'], 'Paraphrasing checks understanding and keeps disagreement respectful.'],
    ['Which sentence respectfully asks for clarification?', 'Could you explain what you mean by “more effective”?', ['That makes no sense.','Stop talking.'], 'A clarification question identifies what is unclear without attacking the speaker.'],
    ['A classmate shares an idea and pauses. What interaction skill helps the conversation?', 'Allowing time for the speaker to finish before responding.', ['Speaking over the pause.','Turning away and changing subjects.'], 'Listening includes giving the speaker space to complete the idea.'],
    ['Paraphrase: “The diagram is useful because its labels show where each part belongs.”', 'The labels make the diagram helpful by identifying each part’s location.', ['The diagram has no labels.','The parts are impossible to find.'], 'The restatement preserves both the reason and the result.'],
    ['You disagree with a group decision. Which opening is most appropriate?', 'I see the reason for that choice; could we also consider…?', ['That idea is stupid.','Nobody should listen to you.'], 'Acknowledging the idea before offering another supports respectful interaction.'],
    ['Why is a paraphrase stronger than repeating the exact sentence?', 'It shows understanding by expressing the meaning in your own words.', ['It always makes the idea false.','It avoids listening.'], 'A successful paraphrase demonstrates comprehension rather than copying.']
  ],
  AC9E5LY04: [
    ['You need the bus departure time on a long transport website. What is the most efficient first move?', 'Use the menu or search tool to locate timetables.', ['Read every page from the beginning.','Choose a random advertisement.'], 'Navigation tools help readers reach the relevant information efficiently.'],
    ['A webpage has headings “Materials”, “Steps” and “Safety”. How do these headings help?', 'They let readers predict and locate the information they need.', ['They remove the need to read.','They show the page is a poem.'], 'Headings organise information and support purposeful reading.'],
    ['You read instructions and realise step 3 cannot work with the materials listed. What should you do?', 'Reread the relevant steps and check whether you missed or misunderstood information.', ['Continue without checking.','Delete the instructions.'], 'Monitoring means noticing a problem and repairing understanding.'],
    ['A search result contains the words you need but comes from an unknown website. What should you check?', 'Whether the source is trustworthy and actually answers your purpose.', ['Only whether the title is colourful.','Whether it has the longest paragraph.'], 'Purposeful reading includes judging relevance and reliability.'],
    ['Which feature helps you find a page number quickly in a long digital text?', 'A contents list or search function.', ['The background colour.','The size of the browser window.'], 'Navigation features reduce unnecessary reading.'],
    ['A recipe uses “fold gently”, but your first attempt makes the mixture lumpy. What reading action could help?', 'Reread the step and check the meaning of “fold” and the sequence.', ['Skip the step forever.','Assume every recipe means stir hard.'], 'Monitoring and rereading can repair a misunderstanding of a key instruction.'],
    ['You need one fact for a poster. Which reading path is most suitable?', 'Scan headings, captions and key sections, then read the relevant part closely.', ['Copy the first sentence you see.','Read unrelated comments only.'], 'The path should match the focused information need.'],
    ['Why should a reader check the date of an online page when researching current information?', 'The information may have changed since the page was published.', ['Older pages are always wrong.','Dates only decorate websites.'], 'Checking currency helps judge whether a source suits the purpose.']
  ],
  AC9E5LY07: [
    ['Before presenting a short talk about safe cycling, what should you decide first?', 'The purpose, audience and key message.', ['The colour of every slide only.','How to speak without practising.'], 'Planning begins with what the presentation needs to achieve for its audience.'],
    ['Which opening best suits a presentation persuading students to wear helmets?', 'A surprising safety fact followed by a clear reason to listen.', ['Here are many unrelated jokes.','I forgot my topic.'], 'An opening should engage the audience and establish the purpose.'],
    ['Why should a speaker rehearse the timing of a multimodal presentation?', 'To check that speech, images and transitions work together within the available time.', ['To remove all visuals.','To make the audience wait silently.'], 'Rehearsal tests coordination and pacing before delivery.'],
    ['A slide contains a full paragraph in tiny writing. What revision would improve it?', 'Replace the paragraph with a few key points and readable visuals.', ['Make the writing even smaller.','Add three unrelated paragraphs.'], 'Slides should support the spoken explanation rather than duplicate dense text.'],
    ['Which delivery choice helps the audience follow an important point?', 'Pause, face the audience and emphasise the key words.', ['Read quickly while facing the floor.','Whisper every sentence.'], 'Voice, pace and body orientation help make meaning accessible.'],
    ['A speaker notices that listeners look confused after a technical word. What should the speaker do?', 'Explain the word in simpler language and give an example.', ['Repeat the same word louder.','Skip the rest of the presentation.'], 'Responsive speakers adjust explanation when evidence shows misunderstanding.'],
    ['A presentation about wetlands uses a labelled photo, a map and a short spoken explanation. Why can these modes work together?', 'Each mode can provide different information while supporting the same message.', ['Different modes must always disagree.','The visuals make speech unnecessary.'], 'Multimodal design is effective when the parts are coordinated and purposeful.'],
    ['After presenting, what is useful feedback to record?', 'One strength and one specific improvement for the next rehearsal.', ['Only whether the speaker liked it.','A comment with no connection to the presentation.'], 'Specific feedback supports deliberate revision and improvement.']
  ]
};

function makeItem(code, row, index) {
  const [question, correct, wrongs, summary] = row;
  const answers = [correct, ...wrongs].map((text, i) => ({ text, is_correct: i === 0 }));
  return { id: `${code}-P-${String(index + 1).padStart(3, '0')}`, curriculum_code: code, year_level: 'Year 5', subject: 'english', bank: 'practice', stage: 'transfer', skill: 'curriculum_transfer', question, audio_prompt: question, answers, correct_index: 0, explanation: { summary, hint: 'Use the audience, purpose and specific clue in the example.' } };
}

for (const [code, rows] of Object.entries(extra)) {
  const file = path.join(BANK, `${code.toLowerCase()}.json`);
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  const practice = items.filter(x => x.bank === 'practice');
  const tests = items.filter(x => x.bank === 'test');
  if (practice.length !== 40 || tests.length !== 16) throw new Error(`${code}: expected draft 40/16, found ${practice.length}/${tests.length}`);
  const additions = rows.map((row, i) => makeItem(code, row, 41 + i));
  fs.writeFileSync(file, JSON.stringify([...practice, ...additions, ...tests], null, 2) + '\n');

  // Keep the student-facing practice runtime in sync with the authoritative bank.
  const qfile = path.join(QUIZ, code.toLowerCase(), 'practice', 'questions.js');
  const js = fs.readFileSync(qfile, 'utf8');
  const payload = [...practice, ...additions].map(x => ({ id: x.id.toLowerCase(), curriculumCode: code, bank: 'practice', skill: x.skill, printable: true, type: 'single', question: x.question, audioPrompt: x.audio_prompt, visual: '', visualHtml: '', answers: x.answers.map(a => a.text), correct: x.correct_index, explanation: `${x.explanation.summary}\nHint: ${x.explanation.hint}` }));
  fs.writeFileSync(qfile, '"use strict";\nwindow.skillrPracticeQuestions = ' + JSON.stringify(payload, null, 2) + ';\n');
}

console.log('Year 5 English unmapped batch expanded to 48/16 for all seven codes.');
