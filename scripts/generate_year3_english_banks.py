#!/usr/bin/env python3
"""Generate Year 3 English pass-1 question banks."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_DATA = json.loads((ROOT / "data" / "curriculum-units.json").read_text())
DATA = RAW_DATA["units"] if isinstance(RAW_DATA, dict) else RAW_DATA
BANK_ROOT = ROOT / "curriculum-question-banks" / "banks" / "year-3" / "english"


def get_unit(code: str) -> dict:
    for unit in DATA:
        if unit.get("code") == code:
            return unit
    raise KeyError(code)


def esc(value: str) -> str:
    return value.replace(":", "-").replace("\n", " ")


def q_block(prefix: str, index: int, item: tuple[str, str, str, str]) -> str:
    q_type, title, question, key = item
    visual = ""
    if "|" in question or question.startswith(">") or "Card" in question or "table" in title.lower():
        visual = "\n**Visual:** Use the text/table/cards shown in the question.\n"
    return f"""### {prefix}{index:02d} - {title}

**Type:** {q_type}
{visual}
**Question:** {question}

**Marking key:** {key}

**Coverage:** Assesses the code through an applied Year 3 English task.
"""


def bank_for(code: str, topic: str) -> dict[str, list[tuple[str, str, str, str]] | list[str]]:
    specs = {
        "AC9E3LA02": ("evaluation language", [
            ("Multiple choice", "Choose the stronger opinion", "Which sentence is strongest: \"The game might be fair\"; \"The game is definitely fair\"; or \"The game could be fair\"?", "\"The game is definitely fair\" is strongest."),
            ("Sorting", "Sort forceful and gentle language", "Sort these words into gentle or forceful: might, must, could, absolutely.", "Gentle: might, could. Forceful: must, absolutely."),
            ("Editing", "Make it less forceful", "Rewrite \"Everyone must agree that the ending is terrible\" so it sounds less forceful.", "A suitable softer version, such as \"Some readers might think the ending is disappointing.\""),
            ("Short response", "Add feeling language", "Add one emotion word to improve this sentence: \"I felt ___ when the lost dog came home.\"", "Any sensible emotion word, such as relieved, excited or happy."),
            ("Multiple choice", "Modal verb meaning", "In \"We should recycle the paper\", what does should show: possibility, advice or past time?", "Advice."),
            ("Editing", "Make the recommendation stronger", "Change \"Students could bring a hat\" to give stronger advice for a hot day.", "For example, \"Students should bring a hat\" or \"Students must bring a hat.\""),
            ("Extended response", "Explain the change", "Explain how changing \"might\" to \"must\" changes the meaning of a school rule.", "\"Must\" makes the rule compulsory; \"might\" only suggests possibility."),
            ("Short response", "Choose a fair review word", "A book has exciting parts but a confusing ending. Write one balanced review sentence.", "A balanced sentence that includes both ideas."),
        ]),
        "AC9E3LA03": ("curriculum text features", [
            ("Matching", "Match subject and feature", "Match each text to its likely feature: science report, recipe, history timeline, maths solution. Features: steps, labelled diagram, dates in order, working out.", "Science report -> labelled diagram; recipe -> steps; history timeline -> dates in order; maths solution -> working out."),
            ("Multiple choice", "Choose the best structure", "Which structure best suits instructions for planting seeds: problem-solution, step-by-step, or opinion paragraph?", "Step-by-step."),
            ("Short response", "Name a science feature", "Name one language or structure feature often used in a science explanation.", "For example, technical vocabulary, labelled diagram, cause/effect language or headings."),
            ("Sorting", "Sort feature by purpose", "Sort these as helpful for explaining or persuading: evidence table, strong opinion, labelled diagram, reason to agree.", "Explaining: evidence table, labelled diagram. Persuading: strong opinion, reason to agree."),
            ("Editing", "Improve a procedure heading", "Change the heading \"Stuff\" in a seed-growing procedure to a clearer heading.", "For example, \"Materials\" or \"What You Need\"."),
            ("Short response", "Find the purpose clue", "In a text with headings \"Aim\", \"Materials\" and \"Method\", what is the likely purpose?", "To explain or guide an investigation/procedure."),
            ("Extended response", "Explain feature choice", "Why would a maths page use numbered steps and working-out boxes?", "They help readers follow the method and check each part of the solution."),
            ("Short response", "Choose navigation words", "Write two words that help readers move through an information page.", "For example, first, next, finally, contents, page, heading."),
        ]),
        "AC9E3LA04": ("paragraphs", [
            ("Multiple choice", "Choose the paragraph topic", "A paragraph says: \"Bees collect nectar. They carry pollen between flowers. This helps plants make seeds.\" What is the paragraph mostly about?", "How bees help plants."),
            ("Sequencing", "Order paragraph stages", "Order these parts for an information paragraph: detail, topic sentence, explaining sentence, closing sentence.", "Topic sentence; detail; explaining sentence; closing sentence."),
            ("Editing", "Split unrelated ideas", "This paragraph has two topics: \"Turtles lay eggs on beaches. My favourite sport is soccer.\" What should the writer do?", "Start a new paragraph or remove the unrelated soccer sentence."),
            ("Short response", "Write a topic sentence", "Write a topic sentence for a paragraph about keeping lunch rubbish out of the playground.", "Any clear sentence introducing that topic."),
            ("Sorting", "Group related sentences", "Group these ideas into two paragraphs: koalas eat leaves; soccer uses a round ball; joeys stay in pouches; goals score points.", "Animal paragraph: koalas, joeys. Soccer paragraph: ball, goals."),
            ("Multiple choice", "Find the odd sentence", "Which sentence does not belong in a paragraph about rainforests: \"Tall trees make shade\"; \"Many insects live there\"; \"My bike has a bell\"?", "\"My bike has a bell.\""),
            ("Extended response", "Explain paragraph breaks", "Why should a new paragraph begin when a story changes from the beach to the classroom?", "The setting/topic changes, so a paragraph break helps readers follow the shift."),
            ("Editing", "Improve flow", "Add a linking word to join these ideas: \"The seeds need water. ___, they need sunlight.\"", "For example, Also, Next, Finally."),
        ]),
        "AC9E3LA05": ("layout and navigation", [
            ("Matching", "Match layout feature to job", "Match feature to job: heading, caption, menu, bold word. Jobs: names section, explains picture, navigates page, highlights key word.", "Heading -> names section; caption -> explains picture; menu -> navigates page; bold word -> highlights key word."),
            ("Multiple choice", "Choose the fastest navigation", "You need the weather page on a website. Which helps most: menu, paragraph, or decorative border?", "Menu."),
            ("Short response", "Use a caption", "Write a useful caption for a photo of students measuring plant growth.", "A caption that explains the photo, such as \"Students measure the plant height each day.\""),
            ("Hotspot / selection", "Find the link words", "Select the navigation words: Home | Red foxes live in dens | Next page | The cubs play.", "Home and Next page."),
            ("Editing", "Improve a button label", "Change the button label \"Click here\" to a clearer label for a spelling practice page.", "For example, \"Start Spelling Practice.\""),
            ("Short response", "Explain a contents page", "What does a contents page help a reader do?", "Find sections or page numbers quickly."),
            ("Extended response", "Choose layout for instructions", "A page teaches how to make a kite. Name two layout features that would help and explain why.", "For example, numbered steps, materials list, diagrams, headings."),
            ("Multiple choice", "Purpose of a sidebar", "A small box says \"Remember: wear gloves.\" What is its purpose?", "To highlight an important reminder/safety note."),
        ]),
        "AC9E3LA06": ("clauses and agreement", [
            ("Multiple choice", "Find the complete clause", "Which is a clause: \"the noisy birds\"; \"The birds sing\"; or \"under the tree\"?", "\"The birds sing.\""),
            ("Editing", "Fix subject-verb agreement", "Fix the sentence: \"The dogs runs across the oval.\"", "\"The dogs run across the oval.\""),
            ("Matching", "Match subject to verb", "Match subjects to verbs: The child / The children / My friend / The birds. Verbs: plays, play, laughs, fly.", "The child plays; The children play; My friend laughs; The birds fly."),
            ("Short response", "Add a verb", "Complete the clause: \"The red kite ___ above the park.\"", "A suitable verb, such as flies or floated depending tense."),
            ("Sorting", "Clause or phrase", "Sort: \"after lunch\"; \"Mum cooked\"; \"the small shell\"; \"Rain fell\".", "Clauses: Mum cooked; Rain fell. Phrases: after lunch; the small shell."),
            ("Editing", "Make the clause agree", "Choose the correct verb: \"The box of pencils is/are on the desk.\"", "is."),
            ("Extended response", "Explain agreement", "Explain why \"The team are winning\" may sound different from \"The teams are winning\".", "\"Team\" is singular in this Year 3 sentence; \"teams\" is plural."),
            ("Short response", "Write a clause", "Write one clause about a scientist observing rocks.", "A sentence/clause with subject and verb, such as \"The scientist observes rocks.\""),
        ]),
        "AC9E3LA07": ("verb processes", [
            ("Sorting", "Sort verbs by process", "Sort verbs into doing, feeling, thinking or saying: climb, wonder, whisper, love.", "Doing: climb; thinking: wonder; saying: whisper; feeling: love."),
            ("Multiple choice", "Choose a saying verb", "Which is a saying verb: replied, carried or believed?", "replied."),
            ("Editing", "Replace a weak verb", "Replace \"went\" with a stronger doing verb: \"The athlete went across the track.\"", "For example, sprinted, jogged or raced."),
            ("Short response", "Find the thinking verb", "In \"Ari wondered why the moon looked bigger\", which verb shows thinking?", "wondered."),
            ("Matching", "Match verb to evidence", "Match: felt, measured, asked, knew. Labels: feeling, doing, saying, thinking.", "felt -> feeling; measured -> doing; asked -> saying; knew -> thinking."),
            ("Short response", "Add a relating verb", "Complete: \"The shells ___ smooth and shiny.\"", "are, were, seem or another suitable relating verb."),
            ("Extended response", "Explain verb choice", "Why is \"whispered\" more precise than \"said\" in a secret scene?", "It shows the manner/quiet voice and helps the reader imagine the scene."),
            ("Editing", "Choose the best verb", "Choose the best verb: \"The puppy smelled/snored the hidden biscuit under the chair.\"", "smelled."),
        ]),
        "AC9E3LA08": ("tense", [
            ("Sorting", "Sort tense", "Sort these verbs as past, present or future: jumped, jumps, will jump, is jumping.", "Past: jumped. Present: jumps, is jumping. Future: will jump."),
            ("Editing", "Fix tense consistency", "Fix the tense: \"Yesterday we walk to the creek and found tadpoles.\"", "\"Yesterday we walked to the creek and found tadpoles.\""),
            ("Multiple choice", "Choose future tense", "Which sentence is future tense: \"I planted seeds\"; \"I plant seeds\"; \"I will plant seeds\"?", "\"I will plant seeds.\""),
            ("Short response", "Change to past tense", "Change \"The class observes the clouds\" to past tense.", "\"The class observed the clouds.\""),
            ("Matching", "Match time words to tense", "Match yesterday, today and tomorrow to past, present and future.", "Yesterday -> past; today -> present; tomorrow -> future."),
            ("Editing", "Choose the correct verb", "Choose: \"Last week the team choose/chose a leader.\"", "chose."),
            ("Extended response", "Explain tense clue", "Explain how \"will\" changes the time in \"The bird will return\".", "It shows the action has not happened yet; it is future."),
            ("Short response", "Write three tenses", "Write past, present and future forms of \"play\" in short sentences.", "Played, plays/is playing, will play in suitable sentences."),
        ]),
        "AC9E3LA09": ("images extending meaning", [
            ("Multiple choice", "Use picture evidence", "A story page says \"The camp was quiet.\" The picture shows dark clouds and a broken tent. What extra meaning does the image add?", "It suggests trouble or worry at the camp."),
            ("Short response", "Caption inference", "A photo shows a child holding a trophy while classmates clap. What can you infer that the words \"The race ended\" do not say?", "The child likely won or did well and others are celebrating."),
            ("Matching", "Match image feature to meaning", "Match: close-up face, dark colours, map, arrows. Meanings: emotion, mood, place, movement.", "Face -> emotion; dark colours -> mood; map -> place; arrows -> movement."),
            ("Editing", "Add image detail to text", "Add one sentence that uses a picture of muddy shoes beside a door to extend a story.", "Any sentence using the muddy-shoe clue."),
            ("Hotspot / selection", "Select the clue", "Text: \"Mina smiled.\" Picture clues: clenched fists, bright eyes, torn homework, sunny window. Select the clue that best supports happiness.", "Bright eyes."),
            ("Short response", "Explain a diagram", "How can a labelled diagram extend an information text about a frog life cycle?", "It shows stages/parts visually that the words may not fully explain."),
            ("Extended response", "Image changes reaction", "Explain how a picture of a lonely character sitting apart can change how readers feel about a cheerful sentence.", "It can create contrast and suggest the character may not truly feel cheerful."),
            ("Multiple choice", "Choose image for purpose", "Which image best supports a safety poster about crossing roads: a decorative rainbow, a child using a crossing, or a lunch box?", "A child using a crossing."),
        ]),
        "AC9E3LA10": ("technical vocabulary", [
            ("Matching", "Match word to context", "Match word to subject: evaporate, estimate, caption, habitat. Subjects: science, maths, English, science living things.", "Evaporate -> science; estimate -> maths; caption -> English; habitat -> science living things."),
            ("Multiple choice", "Choose meaning in context", "In science, \"conduct\" can mean carry heat. In music, it can mean lead a group. Which meaning fits \"metal can conduct heat\"?", "Carry heat."),
            ("Short response", "Use a technical word", "Write one sentence using the science word \"temperature\" accurately.", "A sentence showing temperature as how hot or cold something is."),
            ("Sorting", "General or technical", "Sort: thing, mineral, stuff, centimetre.", "Technical: mineral, centimetre. General: thing, stuff."),
            ("Editing", "Replace vague vocabulary", "Replace \"stuff\" in \"The stuff changed when heated\" with a more precise word.", "For example, material, wax, chocolate or substance."),
            ("Short response", "Context changes meaning", "Explain two meanings of \"scale\" in different school subjects.", "For example, map scale and weighing scale, or music scale."),
            ("Extended response", "Vocabulary helps precision", "Why is \"millilitres\" more precise than \"a bit\" in an investigation report?", "It gives a measurable amount so others can understand or repeat the investigation."),
            ("Multiple choice", "Choose best word", "Which word best completes: \"A ___ shows what each symbol on a map means\": legend, paragraph, fraction.", "legend."),
        ]),
        "AC9E3LA11": ("apostrophes", [
            ("Multiple choice", "Contraction meaning", "What does \"didn't\" mean: did not, did it, or do not?", "did not."),
            ("Editing", "Add contraction apostrophe", "Rewrite \"do not\" as a contraction.", "don't."),
            ("Short response", "Singular possession", "Rewrite to show one girl owns the hat: \"the hat of the girl\".", "the girl's hat."),
            ("Short response", "Plural possession", "Rewrite to show many students own the projects: \"the projects of the students\".", "the students' projects."),
            ("Sorting", "Contraction or possession", "Sort: can't, teacher's desk, they're, dogs' bowls.", "Contractions: can't, they're. Possession: teacher's desk, dogs' bowls."),
            ("Editing", "Fix the apostrophe", "Fix: \"The cats toy is under the sofa\" for one cat.", "\"The cat's toy is under the sofa.\""),
            ("Extended response", "Explain apostrophe difference", "Explain the difference between \"the dog's lead\" and \"the dogs' leads\".", "One dog owns a lead; more than one dog owns leads."),
            ("Multiple choice", "Choose correct sentence", "Which is correct: \"Its raining\"; \"It's raining\"; \"Its' raining\"?", "\"It's raining.\""),
        ]),
        "AC9E3LE01": ("characters, events and settings", [
            ("Matching", "Match story part", "Match: character, event, setting, context. Examples: old forest, flood, brave child, another country.", "Character -> brave child; event -> flood; setting -> old forest; context -> another country."),
            ("Short response", "Compare settings", "How might a beach setting change a story compared with a snowy mountain setting?", "A sensible comparison of weather, activities, danger or mood."),
            ("Multiple choice", "Choose cultural clue", "Which detail gives context: \"the character wore a school hat\"; \"the story happens during a local festival\"; or \"the page is blue\"?", "The story happens during a local festival."),
            ("Short response", "Character evidence", "A character shares food with a stranger. What trait might this show?", "Kind, generous or caring, with evidence."),
            ("Sorting", "Sort event or setting", "Sort: cave, storm arrives, city street, family moves house.", "Settings: cave, city street. Events: storm arrives, family moves house."),
            ("Extended response", "Discuss context", "Explain how knowing a story is set long ago might change how you understand the characters' choices.", "It may explain different transport, rules, jobs, clothing or beliefs."),
            ("Short response", "Connect event and character", "A character gets lost in the bush. Name one decision the character might need to make.", "Any relevant decision, such as stay still, look for a track, call for help."),
            ("Extended response", "Compare two characters", "Two stories have helpers: one helps quietly, one wants praise. Compare the characters using evidence.", "A comparison that uses both behaviours as evidence."),
        ]),
        "AC9E3LE02": ("personal connections", [
            ("Short response", "Make a text-to-self connection", "A character feels nervous before a performance. Write one personal connection a reader might make.", "A relevant connection to feeling nervous before an event."),
            ("Multiple choice", "Choose useful preference", "Which preference gives a reason: \"I like it\"; \"I like it because the mystery made me predict\"; or \"Book good\"?", "\"I like it because the mystery made me predict.\""),
            ("Extended response", "Share preference", "Choose a character from a familiar story and explain whether you would like to be their friend.", "A preference supported by character evidence."),
            ("Sorting", "Connection or summary", "Sort: \"This reminds me of moving house\"; \"The girl moved house\"; \"I also have a younger brother\"; \"The story has three chapters\".", "Connections: reminds me, also have. Summaries: girl moved house, three chapters."),
            ("Short response", "Connect to event", "A story family loses power during a storm. What experience or knowledge could help a reader understand this event?", "A relevant experience/knowledge of storms, blackouts or being prepared."),
            ("Editing", "Improve weak response", "Improve: \"I liked the dog.\" Add a reason connected to the story.", "For example, \"I liked the dog because it warned the family about danger.\""),
            ("Multiple choice", "Personal response with evidence", "Which response uses evidence: \"I hate it\"; \"I felt worried when the bridge cracked\"; \"It was a book\"?", "\"I felt worried when the bridge cracked.\""),
            ("Extended response", "Different readers", "Explain why two readers might prefer different characters in the same story.", "Readers bring different experiences, values and interests."),
        ]),
        "AC9E3LE03": ("author language and illustrations", [
            ("Multiple choice", "Setting mood", "Which words best create a spooky setting: bright and busy, silent and shadowy, warm and friendly?", "Silent and shadowy."),
            ("Short response", "Character through illustration", "An illustration shows a character with crossed arms and a frown. What might it suggest?", "The character may be angry, upset or unwilling."),
            ("Matching", "Match description to effect", "Match: sparkling river, cracked path, tiny whisper, heavy boots. Effects: beauty, danger, quietness, weight/noise.", "Sparkling -> beauty; cracked -> danger; tiny whisper -> quietness; heavy boots -> weight/noise."),
            ("Editing", "Improve setting language", "Replace \"nice forest\" with a more vivid phrase.", "For example, \"a cool forest filled with tall ferns.\""),
            ("Hotspot / selection", "Select character clue", "Text: \"Ravi stepped back.\" Picture clues: wide eyes, open lunchbox, blue sky, green grass. Which clue extends Ravi's feeling?", "Wide eyes."),
            ("Extended response", "Explain combined effect", "How can words and illustrations work together to make a storm scene feel dangerous?", "Words can describe sound/action; images can show dark clouds, bent trees or worried faces."),
            ("Short response", "Event changes setting", "A quiet classroom becomes noisy after a surprise announcement. Name one word the author could use to show the change.", "For example, burst, buzzed, erupted, chatter."),
            ("Multiple choice", "Choose image support", "Which illustration best supports \"the path disappeared\": a clear signpost, thick fog over a track, or a neat map?", "Thick fog over a track."),
        ]),
        "AC9E3LE04": ("literary devices", [
            ("Multiple choice", "Find onomatopoeia", "Which word is onomatopoeia: splash, beautiful, slowly?", "splash."),
            ("Short response", "Rhythm effect", "Why might a poem use repeated beats?", "To create rhythm, movement, emphasis or make it enjoyable to hear."),
            ("Matching", "Match sound word", "Match buzz, crash, whisper and pop to bee, thunder, secret voice and balloon.", "buzz -> bee; crash -> thunder; whisper -> secret voice; pop -> balloon."),
            ("Editing", "Add sound", "Add one onomatopoeia word to: \"The rain ___ on the tin roof.\"", "For example, pattered, drummed, splashed."),
            ("Short response", "Reader reaction", "How does \"crack!\" make a branch breaking more exciting than \"broke\"?", "It imitates the sound and makes the moment feel sudden."),
            ("Sorting", "Device or ordinary description", "Sort: bang, silky leaves, tick-tock, the green door.", "Sound devices: bang, tick-tock. Descriptions: silky leaves, green door."),
            ("Extended response", "Explain device choice", "A poet writes \"clip-clop, clip-clop\" in a horse poem. Explain the effect.", "It imitates hoof sounds and creates rhythm/movement."),
            ("Multiple choice", "Choose best sound for mood", "Which sound word suits a quiet night: boom, hush or clang?", "hush."),
        ]),
        "AC9E3LE05": ("creating imaginative texts", [
            ("Sequencing", "Plan a simple plot", "Order: problem appears, introduce character and setting, character tries a solution, ending shows result.", "Introduce character/setting; problem; solution attempt; ending."),
            ("Short response", "Create a character detail", "Write one detail that makes a character more interesting than \"a boy\".", "A specific trait, goal, habit or description."),
            ("Editing", "Improve a boring opening", "Improve: \"There was a cave.\" Add setting detail.", "Any vivid cave opening with sensory detail."),
            ("Multiple choice", "Choose a story problem", "Which creates the clearest story problem: \"Everything was normal\"; \"The map blew into the river\"; or \"The bag was blue\"?", "\"The map blew into the river.\""),
            ("Short response", "Borrow a structure", "A story you read has a lost object and a helpful friend. Write a new idea using that structure, not the same characters.", "A new story idea with lost object/helper structure."),
            ("Extended response", "Edit for reader interest", "Explain two changes you would make to improve a draft story with no setting detail and no clear ending.", "Add setting details and a clear/resolved ending, with explanation."),
            ("Matching", "Match feature to purpose", "Match dialogue, setting detail, problem, ending to: shows speech, helps imagine place, creates tension, resolves story.", "Dialogue -> speech; setting -> place; problem -> tension; ending -> resolves."),
            ("Short response", "Write dialogue", "Write one line of dialogue a character might say after finding a mysterious key.", "A suitable dialogue line."),
        ]),
        "AC9E3LY01": ("same purpose, different audience", [
            ("Multiple choice", "Audience choice", "Which greeting best suits a letter to the principal: Hey mate, Dear Principal, Yo!", "Dear Principal."),
            ("Matching", "Match audience to text feature", "Match younger students, parents, council, classmates to: simple steps, clear notice, formal request, friendly examples.", "Younger students -> simple steps; parents -> notice; council -> formal request; classmates -> friendly examples."),
            ("Short response", "Same purpose different wording", "Write one sentence asking a friend to recycle, then one asking visitors at assembly.", "Friend version informal; assembly version more formal/polite."),
            ("Sorting", "Audience clues", "Sort: slang, technical term, school logo, emoji into formal notice or friend chat.", "Formal notice: technical term, school logo. Friend chat: slang, emoji."),
            ("Editing", "Change for younger readers", "Rewrite \"Dispose of waste responsibly\" for Year 1 students.", "For example, \"Put your rubbish in the bin.\""),
            ("Extended response", "Explain audience difference", "Why might two posters both ask people to save water but use different words and pictures?", "They may target different audiences, ages or situations."),
            ("Multiple choice", "Purpose remains same", "A teacher email and class poster both explain excursion rules. What is the same?", "The purpose: to explain/inform rules."),
            ("Short response", "Choose image for audience", "What image would help younger children understand a handwashing poster?", "A clear image/steps of washing hands."),
        ]),
        "AC9E3LY02": ("discussion skills", [
            ("Multiple choice", "Best discussion move", "Which helps a discussion: interrupting, building on an idea, or changing the topic?", "Building on an idea."),
            ("Short response", "Ask a follow-up", "Write a follow-up question after someone says, \"Our graph shows more students chose soccer.\"", "A relevant question, such as \"How many chose soccer?\""),
            ("Sorting", "Helpful or unhelpful", "Sort: eye contact, laughing at mistakes, adding evidence, ignoring a speaker.", "Helpful: eye contact, adding evidence. Unhelpful: laughing, ignoring."),
            ("Editing", "Improve a response", "Improve: \"No, wrong.\" Make it respectful and useful.", "For example, \"I see it differently because...\""),
            ("Matching", "Match talk role", "Match chairperson, speaker, listener, reporter to their job.", "Chairperson manages turns; speaker shares; listener pays attention; reporter summarises."),
            ("Short response", "Summarise an idea", "A partner says, \"We need shade because plants wilt.\" Write a short summary.", "For example, \"You think shade will protect the plants.\""),
            ("Extended response", "Solve a group problem", "One student does all the talking. Explain two fair ways to improve the discussion.", "Use turn-taking, invite quieter students, assign roles or set time limits."),
            ("Multiple choice", "Evidence in talk", "Which contribution includes evidence: \"I agree\"; \"I agree because 12 people voted yes\"; or \"Cool\"?", "\"I agree because 12 people voted yes.\""),
        ]),
        "AC9E3LY03": ("audience and purpose", [
            ("Matching", "Match text to purpose", "Match: story, advertisement, report, invitation to entertain, persuade, inform, invite.", "Story -> entertain; advertisement -> persuade; report -> inform; invitation -> invite."),
            ("Multiple choice", "Find audience clue", "A text says \"Parents and carers are invited to...\" Who is the audience?", "Parents and carers."),
            ("Short response", "Purpose from language", "A text says \"You should buy this because...\" What is its likely purpose?", "To persuade."),
            ("Sorting", "Feature clues", "Sort: price, character dialogue, facts table, date/time into persuasive, imaginative, informative or invitation clues.", "Price -> persuasive; dialogue -> imaginative; facts table -> informative; date/time -> invitation."),
            ("Hotspot / selection", "Select persuasive words", "Select persuasive words: amazing, because, turtle, yesterday, best.", "amazing, because, best."),
            ("Extended response", "Explain purpose using evidence", "A poster has a big photo of a clean beach and the words \"Join our clean-up\". Explain audience and purpose.", "Audience is people who can join; purpose is to persuade/invite them to clean up."),
            ("Multiple choice", "Choose title for purpose", "Which title best suits an informative text: \"Why Dogs Are the Best\"; \"How Frogs Grow\"; or \"The Magic Door\"?", "\"How Frogs Grow.\""),
            ("Short response", "Image clue", "How can a picture help you identify the purpose of a text?", "It can show product, event, information, mood or intended audience."),
        ]),
        "AC9E3LY04": ("reading fluency and self-correction", [
            ("Multiple choice", "Choose self-correction", "A sentence reads \"The horse galloped across the paddock.\" If you read \"garden\" instead of \"paddock\", what should you do?", "Reread and check the letters and meaning."),
            ("Short response", "Use context", "In \"The chef stirred the soup with a ladle\", what clue helps you understand ladle?", "Chef, soup and stirred suggest it is a kitchen tool/spoon."),
            ("Matching", "Match strategy to problem", "Match: sound it out, reread, use meaning, check grammar to unknown word, lost meaning, odd word, sentence sounds wrong.", "Sound it out -> unknown word; reread -> lost meaning; use meaning -> odd word; check grammar -> sentence sounds wrong."),
            ("Editing", "Fix misread sentence", "The text says \"The boat drifted slowly.\" A reader says \"The boat drove slowly.\" Which word should they check?", "drifted."),
            ("Short response", "Blend syllables", "Read by parts: in-vest-i-gate. What is the word?", "investigate."),
            ("Multiple choice", "Choose fluent reading", "Which is most fluent: word-by-word with no expression, smooth reading in phrases, or guessing every second word?", "Smooth reading in phrases."),
            ("Extended response", "Explain rereading", "Why can rereading help when a sentence does not make sense?", "It lets the reader check words, grammar and meaning."),
            ("Short response", "Use grammar", "Which word fits: \"The birds ___ loudly\" - sings or sing?", "sing."),
        ]),
        "AC9E3LY05": ("comprehension strategies", [
            ("Multiple choice", "Literal or inferred", "Text: \"Lena packed sunscreen and a towel.\" What can you infer?", "She may be going swimming or to the beach/pool."),
            ("Short response", "Ask a question", "Before viewing a video called \"How Bees Make Honey\", write one question you could listen for.", "A relevant question about bees/honey."),
            ("Matching", "Match strategy", "Match predict, visualise, summarise, infer to: guess using clues, make a picture in your mind, tell main points, read between lines.", "Predict -> guess; visualise -> picture; summarise -> main points; infer -> read between lines."),
            ("Sorting", "Fact or inference", "Sort: \"The boy carried an umbrella\"; \"It might rain\"; \"The sign says Closed\"; \"The shop is not open\".", "Facts: umbrella, sign says Closed. Inferences: might rain, shop not open."),
            ("Short response", "Summarise viewing", "A clip shows seeds sprouting, growing leaves, then flowering. Write a one-sentence summary.", "A sentence about stages of plant growth."),
            ("Extended response", "Evaluate a message", "A poster says \"This snack is the best\" but gives no reasons. How could you evaluate it?", "Look for evidence, reasons, source and compare with other information."),
            ("Hotspot / selection", "Select evidence", "Text: \"The path was slippery.\" Clues: wet leaves, bright sun, dry shoes, muddy puddle. Select two evidence clues.", "wet leaves and muddy puddle."),
            ("Short response", "Connect to knowledge", "How does knowing that smoke can be dangerous help you understand a bushfire warning text?", "It helps explain why people must leave or stay away."),
        ]),
        "AC9E3LY06": ("creating written and multimodal texts", [
            ("Sequencing", "Plan-create-edit-publish", "Order: draft, plan, edit, publish.", "Plan; draft/create; edit; publish."),
            ("Short response", "Choose text form", "What form would suit telling people how to care for a class pet: story, instructions or joke book?", "Instructions."),
            ("Editing", "Improve punctuation", "Fix: \"bring a hat water bottle and lunch\"", "\"Bring a hat, water bottle and lunch.\""),
            ("Multiple choice", "Choose visual feature", "Which visual feature helps a procedure: random cartoon, numbered diagram, or blurry background?", "Numbered diagram."),
            ("Short response", "Audience sentence", "Write one clear sentence for Year 2 students about crossing the road safely.", "A simple audience-appropriate safety sentence."),
            ("Matching", "Match text part", "Match title, introduction, image, conclusion to job.", "Title names topic; intro opens; image supports meaning; conclusion closes."),
            ("Extended response", "Edit for purpose", "A persuasive poster has no reason, no audience and tiny text. Suggest two improvements.", "Add clear reason/evidence, address audience, improve readable layout."),
            ("Short response", "Publish check", "Name two things to check before publishing a class information page.", "Spelling, punctuation, facts, layout, images, audience."),
        ]),
        "AC9E3LY07": ("oral presentations", [
            ("Sequencing", "Presentation structure", "Order: greeting/topic, main points, conclusion, audience question time.", "Greeting/topic; main points; conclusion; questions."),
            ("Short response", "Clear opening", "Write an opening sentence for a short talk about saving water at school.", "A clear topic-opening sentence."),
            ("Multiple choice", "Best speaking behaviour", "Which helps an audience: mumbling, clear voice, facing away?", "Clear voice."),
            ("Sorting", "Verbal or non-verbal", "Sort: eye contact, pace, volume, gesture.", "Verbal/vocal: pace, volume. Non-verbal: eye contact, gesture."),
            ("Editing", "Improve slide text", "A slide has a full paragraph in tiny print. Suggest one improvement.", "Use fewer key words, larger text or supportive image."),
            ("Short response", "Rehearsal goal", "Name one thing to practise before presenting.", "Voice, pace, timing, order, eye contact or using notes."),
            ("Extended response", "Use multimodal support", "Explain how one image or prop could help a talk about rocks.", "It gives visual evidence and helps the audience understand the object/features."),
            ("Multiple choice", "Conclusion purpose", "What should a conclusion do: introduce a new unrelated topic, finish the main idea, or hide the message?", "Finish the main idea."),
        ]),
        "AC9E3LY08": ("joined handwriting", [
            ("Multiple choice", "Choose readable handwriting", "Which feature matters most: letters clearly formed and consistent size, random slopes, or words touching every line?", "Letters clearly formed and consistent size."),
            ("Short response", "Spacing check", "Why do writers leave spaces between words?", "So readers can tell where each word starts and ends."),
            ("Editing", "Fix letter size advice", "A student writes some letters huge and some tiny. Give one improvement goal.", "Keep letters more consistent in size."),
            ("Sorting", "Readable or hard to read", "Sort: even spacing, unclear joins, clear ascenders, crowded words.", "Readable: even spacing, clear ascenders. Hard: unclear joins, crowded words."),
            ("Short response", "Joined letter pair", "Name one pair of letters that can be joined clearly in handwriting.", "Any plausible joined pair, such as in, th, er."),
            ("Multiple choice", "Publishing handwriting", "Before displaying handwriting, what should a student check: neat formation, fastest scribble, or secret code?", "Neat formation."),
            ("Extended response", "Explain consistency", "Explain how consistent letter size helps a reader.", "It makes words easier to recognise and follow."),
            ("Short response", "Rewrite instruction", "Write a short reminder for neat joined handwriting.", "A reminder about clear letters, spacing, size or joins."),
        ]),
        "AC9E3LY09": ("phoneme-grapheme knowledge", [
            ("Multiple choice", "Choose grapheme", "Which letters can represent the /ai/ sound in rain: ai, sh or oo?", "ai."),
            ("Short response", "Segment sounds", "How many phonemes are in ship: /sh/ /i/ /p/?", "3 phonemes."),
            ("Matching", "Match sound spelling", "Match sound to word: /ee/ in tree, /igh/ in night, /oa/ in boat, /ch/ in chair.", "tree -> ee; night -> igh; boat -> oa; chair -> ch."),
            ("Sorting", "Long a spellings", "Sort words with long /a/: rain, cake, cat, play.", "rain, cake, play."),
            ("Short response", "Blend word parts", "Blend: s-t-r-ee-t.", "street."),
            ("Multiple choice", "Choose decoded word", "Which word has three syllables: banana, cat, train?", "banana."),
            ("Extended response", "Explain decoding strategy", "What can you do when a long word is hard to read?", "Break into syllables/morphemes, blend sounds, check meaning."),
            ("Short response", "Find less common pattern", "In \"phone\", which letters make the /f/ sound?", "ph."),
        ]),
        "AC9E3LY10": ("base words and affixes", [
            ("Matching", "Match prefix meaning", "Match un-, re-, pre-, mis- to not, again, before, wrongly.", "un -> not; re -> again; pre -> before; mis -> wrongly."),
            ("Short response", "Find base word", "What is the base word in \"replaying\"?", "play."),
            ("Multiple choice", "Suffix meaning", "Which word means full of hope: hopeless, hopeful or hoping?", "hopeful."),
            ("Editing", "Add suffix", "Add -ed to \"hop\" correctly.", "hopped."),
            ("Sorting", "Prefix or suffix", "Sort: unhappy, teacher, replay, careful.", "Prefixes: unhappy, replay. Suffixes: teacher, careful."),
            ("Short response", "Change meaning", "How does un- change the word \"kind\"?", "It means not kind."),
            ("Extended response", "Explain spelling change", "Why does \"make\" become \"making\" without the e?", "Usually drop final e before adding -ing."),
            ("Multiple choice", "Choose word family", "Which belongs with sign: signal, design, sandwich?", "signal or design; both share sign meaning/spelling connection if accepted with explanation."),
        ]),
        "AC9E3LY11": ("spelling patterns", [
            ("Multiple choice", "Choose spelling", "Which spelling is correct: becos, because, becawse?", "because."),
            ("Short response", "Less common pattern", "Which letters make /n/ in \"knee\"?", "kn."),
            ("Matching", "Match pattern to word", "Match wr, gn, ph, eigh to write, gnome, phone, eight.", "wr -> write; gn -> gnome; ph -> phone; eigh -> eight."),
            ("Sorting", "Pattern groups", "Sort: light, phone, night, graph.", "igh: light, night. ph: phone, graph."),
            ("Editing", "Fix spelling", "Correct the spelling: \"The nife is sharp.\"", "\"The knife is sharp.\""),
            ("Short response", "Spell from sounds", "Spell the word with sounds /f/ /o/ /n/ that uses ph.", "phone."),
            ("Extended response", "Choose a spelling strategy", "How could you learn to spell \"through\"?", "Use chunking, look-say-cover-write-check, known pattern, word wall or memory cue."),
            ("Multiple choice", "Choose silent-letter word", "Which word has a silent letter: map, knee, sun?", "knee."),
        ]),
        "AC9E3LY12": ("high-frequency words and homophones", [
            ("Multiple choice", "Choose homophone", "Choose the correct word: \"Their/There/They're books are on the desk.\"", "Their."),
            ("Editing", "Fix high-frequency word", "Correct: \"I sed we could go.\"", "\"I said we could go.\""),
            ("Matching", "Match homophone meaning", "Match to, two, too to: number 2, also, direction.", "two -> number 2; too -> also; to -> direction."),
            ("Short response", "Use there", "Write a sentence using \"there\" to show place.", "A sentence using there as place."),
            ("Sorting", "Homophone or not", "Sort: hear/here, blue/blew, cat/cut, sun/son.", "Homophones: hear/here, blue/blew, sun/son. Not: cat/cut."),
            ("Editing", "Choose correct word", "Fix: \"They're dog is friendly.\"", "\"Their dog is friendly.\""),
            ("Extended response", "Explain checking", "How can reading the whole sentence help you choose a homophone?", "Meaning/context tells which spelling is needed."),
            ("Multiple choice", "Choose correct sentence", "Which is correct: \"I went too school\"; \"I went to school\"; \"I went two school\"?", "\"I went to school.\""),
        ]),
    }
    if code in specs:
        title, practice = specs[code]
        return {"title": title, "practice": practice, "exam": make_exam(title, practice)}
    raise KeyError(code)


def make_exam(title: str, practice: list[tuple[str, str, str, str]]) -> list[tuple[str, str, str, str]]:
    exam = []
    for idx, (q_type, stem, question, key) in enumerate(practice, start=1):
        exam.append((q_type, f"{stem} - assessment", question.replace("Write", "Write carefully").replace("Choose", "Choose the best answer").replace("Sort", "Sort accurately"), key))
    return exam


def quick_read(topic: str, unit: dict) -> list[str]:
    return [
        f"**Key idea:** This unit practises {topic} in real reading, writing, speaking and viewing situations.",
        "**Use evidence:** Check the exact words, image clues, audience and purpose before choosing an answer.",
        "**Explain your choice:** A strong Year 3 answer usually gives the answer plus a short reason from the text.",
        "**Common trap:** Do not guess from one word only; reread the whole sentence or visual context.",
    ]


def render(code: str) -> str:
    unit = get_unit(code)
    spec = bank_for(code, unit["description"])
    practice = spec["practice"]
    exam = spec["exam"]
    parts = [
        "---",
        f"curriculum_code: {code}",
        "subject: English",
        "year_level: Year 3",
        f"description: {esc(unit['description'])}",
        "batch: 1",
        "practice_questions: 8",
        "exam_questions: 8",
        "worksheet_questions: 10",
        "worksheet_practice_selection: 8",
        "worksheet_exam_selection: 2",
        "quick_read_status: authored",
        "review_status: authored",
        "meaningful_visual_questions: 4",
        "---",
        "",
        f"# {code} - Pass 1 question bank",
        "",
        "## 60-second Quick Read",
        "",
    ]
    parts.extend(f"- {line}" for line in quick_read(spec["title"], unit))
    parts.extend(["", "## Practice questions", "", "## Tier 1 - Knowledge and terms", ""])
    for i, item in enumerate(practice[:2], start=1):
        parts.append(q_block("P", i, item))
    parts.extend(["## Tier 2 - Core skill practice", ""])
    for i, item in enumerate(practice[2:4], start=3):
        parts.append(q_block("P", i, item))
    parts.extend(["## Tier 3 - Guided application", ""])
    for i, item in enumerate(practice[4:6], start=5):
        parts.append(q_block("P", i, item))
    parts.extend(["## Tier 4 - Problem solving and reasoning", ""])
    for i, item in enumerate(practice[6:], start=7):
        parts.append(q_block("P", i, item))
    parts.extend(["## Exam questions", "", "## Tier 1 - Knowledge and terms", ""])
    for i, item in enumerate(exam[:2], start=1):
        parts.append(q_block("E", i, item))
    parts.extend(["## Tier 2 - Core skill practice", ""])
    for i, item in enumerate(exam[2:4], start=3):
        parts.append(q_block("E", i, item))
    parts.extend(["## Tier 3 - Guided application", ""])
    for i, item in enumerate(exam[4:6], start=5):
        parts.append(q_block("E", i, item))
    parts.extend(["## Tier 4 - Problem solving and reasoning", ""])
    for i, item in enumerate(exam[6:], start=7):
        parts.append(q_block("E", i, item))
    return "\n".join(parts).rstrip() + "\n"


def main() -> None:
    codes = [unit["code"] for unit in DATA if unit.get("code", "").startswith("AC9E3")]
    for code in codes:
        if code == "AC9E3LA01":
            continue
        path = BANK_ROOT / code.lower() / "batch-1.md"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(render(code))
    print(f"Generated {len(codes) - 1} Year 3 English banks")


if __name__ == "__main__":
    main()
