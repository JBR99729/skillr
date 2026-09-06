(() => {
  "use strict";

  const units = window.SkillrYear1EnglishData || {};
  const worksheets = window.SkillrYear1EnglishWorksheetData || (window.SkillrYear1EnglishWorksheetData = {});
  const q = (type, question, extra = {}) => ({ type, question, ...extra });

  const FOCUS = {
    AC9E1LA01:["Notice how words, facial expressions, gestures and body language change a message.","Recognise that First Nations Australian communication can include important symbols, gestures and body language.","Use words and body language to show emotions.","Tell the difference between a closed question and an open question."],
    AC9E1LA02:["Use because to give a reason for a like, dislike or preference.","Use comparison words such as better and faster to show how strongly you prefer something."],
    AC9E1LA03:["Compare what familiar texts are trying to do.","Recognise common stages in texts such as recounts and procedures.","Notice that words, pictures and diagrams can work together to organise information."],
    AC9E1LA04:["Find repeated words and sentence patterns.","Hear end rhyme in poems.","Use rhythm and repetition to make a poem, chant or song sound connected."],
    AC9E1LA05:["Compare the layout of print and digital texts.","Use titles, headings, page numbers, contents, buttons, links and images to find information."],
    AC9E1LA06:["Recognise that a simple sentence communicates one main event or idea.","Identify who or what is involved and what is happening.","Add useful details such as where, when or how."],
    AC9E1LA07:["Recognise words for people, places and things; happenings and states; qualities; and details.","Make a sentence more precise by choosing useful describing words, detail words and exact verbs."],
    AC9E1LA08:["Compare different images of the same subject and explain what each image adds.","Follow meaning across a sequence of images.","Notice information shown in an image that is not stated in the written words.","Discuss images in stories and cultural accounts by First Nations Australian authors and illustrators."],
    AC9E1LA09:["Use topic-specific words when talking about school learning.","Use appropriate words in an Acknowledgement of Country with respect for local protocols.","Recognise vocabulary linked to topics such as weather and seasons."],
    AC9E1LA10:["Pause and change your voice when punctuation tells you to.","Recognise full stops, question marks and exclamation marks.","Choose punctuation that matches a statement or question.","Use capital letters for familiar place names and holidays."],
    AC9E1LE01:["Discuss how animal characters can show human qualities.","Notice how First Nations Australian authors and illustrators create characters, settings and events.","Use story events to explain what a character is like."],
    AC9E1LE02:["Ask questions about characters, settings and events.","Connect a text with your own experiences and explain the connection.","Show a response to a character or event through drawing or role-play.","Identify who is telling the story."],
    AC9E1LE03:["Compare similar characters and settings across stories, poems and fables.","Decide whether a setting is realistic or imagined and use clues about time and place.","Follow how a plot begins, develops a problem and solves it."],
    AC9E1LE04:["Listen and respond to performance poetry, chants and songs from First Nations Australians.","Explore poetry, chants and songs from Asian cultures.","Listen to short poems such as haiku about familiar topics.","Imitate and invent alliteration, rhyme and other sound patterns."],
    AC9E1LE05:["Describe a character using details from a familiar story.","Imitate a character's way of speaking or expressing an attitude.","Retell key events in order using speaking, drawing, performance or digital tools."],
    AC9E1LY01:["Identify the purpose of texts used at school and in the community.","Recognise that texts with similar purposes often use similar structures and features."],
    AC9E1LY02:["Take turns in pair and group talk.","Stay on topic, listen carefully and respond to what another person says.","Contribute ideas in class, group and pair discussions.","Interact appropriately with peers, teachers and visitors.","Ask useful open, closed, when, why and how questions."],
    AC9E1LY03:["Tell story texts from texts that give opinions.","Choose a text that suits a purpose, such as finding information or reading a story.","Compare imaginative, informative and persuasive texts using visible features."],
    AC9E1LY04:["Recognise many high-frequency words while reading.","Use phonics, phrasing, context and grammar together to keep meaning.","Self-correct or ask for help when the text stops making sense."],
    AC9E1LY05:["Find information and details in spoken informative texts.","Build topic knowledge and learn useful vocabulary before and during reading.","Predict from covers, illustrations and text clues, then confirm or change the prediction.","Make an inference and explain the text clue that supports it.","Connect a text with what you already know or have experienced."],
    AC9E1LY06:["Use an appropriate text structure and correct simple sentences when creating a text.","Use learning-area vocabulary where it helps meaning.","Sequence images and captions in a digital story or information text.","Add, remove or change words to improve meaning.","Use dictionaries and other resources to check spelling.","Notice words that may need a spelling check."],
    AC9E1LY07:["Report the result of a group activity clearly.","Explain how to do or make something in an organised order.","Give a short presentation using clear speech and topic words.","Change volume and pace to suit the purpose.","Give a reason when trying to persuade an audience."],
    AC9E1LY08:["Write words using clear, unjoined lower-case and upper-case letters.","Use a functional pencil grip or grasp that supports controlled writing."],
    AC9E1LY09:["Say each phoneme in order in a spoken word, including words with consonant blends or clusters."],
    AC9E1LY10:["Add, delete or substitute a sound in a one-syllable word to make a new word.","Change a middle sound to make a new word.","Change a final sound to make a new word."],
    AC9E1LY11:["Use letter-sound knowledge to read and write words with short and common long vowel sounds.","Read and write one-syllable words with common consonant digraphs and blends.","Blend sounds to read one- and two-syllable words."],
    AC9E1LY12:["Recognise that one letter can represent different sounds in different words.","Recognise that the same sound can be represented by different letters.","Remember that every syllable contains a vowel sound."],
    AC9E1LY13:["Spell one- and two-syllable words using familiar letter patterns and known blends."],
    AC9E1LY14:["Read an increasing bank of high-frequency words independently.","Write familiar high-frequency words accurately in meaningful sentences."],
    AC9E1LY15:["Build word families by adding common grammatical morphemes.","Find the base word inside a longer word and use the morpheme to help read its meaning."]
  };

  const GOALS = {
    AC9E1LA01:"I can use words, facial expressions and gestures to communicate clearly and choose useful open or closed questions.",
    AC9E1LA02:"I can explain my likes, dislikes and preferences with clear reasons.",
    AC9E1LA03:"I can use a text's purpose and organisation to work out how it is structured.",
    AC9E1LA04:"I can hear and use repetition, rhyme and rhythm in poems, chants and songs.",
    AC9E1LA05:"I can use print and screen features to find my way through a text.",
    AC9E1LA06:"I can recognise and build simple sentences that communicate one main event or idea.",
    AC9E1LA07:"I can choose words for people, actions, qualities and details to make sentences precise.",
    AC9E1LA08:"I can explain how images add meaning to different kinds of texts.",
    AC9E1LA09:"I can recognise and use vocabulary that belongs to a learning topic.",
    AC9E1LA10:"I can use sentence punctuation and capital letters to make written meaning clear.",
    AC9E1LE01:"I can explain how words and images create characters, settings and events in literature.",
    AC9E1LE02:"I can share a response to a literary text and connect it with my own experience.",
    AC9E1LE03:"I can discuss plot, character and setting and use story clues to explain each one.",
    AC9E1LE04:"I can listen to, discuss and create sound patterns in poems, chants, rhymes and songs.",
    AC9E1LE05:"I can retell or adapt a familiar story while keeping its important plot and character ideas clear.",
    AC9E1LY01:"I can identify what a text is for by noticing its features and structure.",
    AC9E1LY02:"I can take turns, listen actively and build a conversation with ideas and questions.",
    AC9E1LY03:"I can compare imaginative, informative and persuasive texts and choose one for a purpose.",
    AC9E1LY04:"I can read with phonics, phrasing and meaning, and I can notice when I need to self-correct.",
    AC9E1LY05:"I can predict, connect, visualise, summarise, question and infer to build meaning from a text.",
    AC9E1LY06:"I can create, reread and edit a short text so its sentences, vocabulary, punctuation and spelling make sense.",
    AC9E1LY07:"I can plan and deliver a short presentation with a clear beginning, middle and ending.",
    AC9E1LY08:"I can form clear unjoined lower-case and upper-case letters when I write words.",
    AC9E1LY09:"I can break spoken words into their separate phonemes, including words with blends and clusters.",
    AC9E1LY10:"I can add, remove or change phonemes in spoken words to make new words.",
    AC9E1LY11:"I can use vowels, blends and digraphs to read and write one- and two-syllable words.",
    AC9E1LY12:"I can recognise that letters can represent different sounds and every syllable has a vowel sound.",
    AC9E1LY13:"I can spell one- and two-syllable words using common letter patterns.",
    AC9E1LY14:"I can read and write an increasing number of high-frequency words automatically.",
    AC9E1LY15:"I can use morphemes and base words to build and read word families."
  };

  function makeWorksheet(code, unit) {
    const focus = FOCUS[code] || [];
    const routine = String(unit.routine || "Notice → Think → Try → Check").split("→").map((s) => s.trim()).filter(Boolean);
    const activity = unit.activities?.[0];
    const mistake = unit.mistakes?.[0] || ["Guessing", "Return to the lesson example and check the evidence."];
    const key = unit.visuals?.[0] || "the key clue";
    const learningGoal = GOALS[code] || `I can ${String(unit.desc || unit.title).replace(/[.]$/, "")}.`;
    return {
      subject:"Year 1 English",
      title:`${unit.title} — student practice`,
      topicUrl:`/year1/english/${unit.slug}/`,
      method:routine.join(" → "),
      questions:[
        q("single","Which statement best matches today's skill?",{answers:[learningGoal,"I should choose an answer without checking the text.","The longest answer is always correct."]}),
        q("single","Which step should you do first?",{answers:[routine[0] || "Notice the clue.",routine[1] || "Guess quickly.",routine.at(-1) || "Check after you answer."]}),
        q("single","Which classroom example helps you practise this skill?",{answers:[activity?.visual || activity?.text || focus[0] || learningGoal,"Copy any sentence without thinking.","Ignore the words, sounds, pictures or clues."]}),
        q("text",unit.quick?.[0] || focus[0] || "Explain the skill in your own words."),
        q("text",unit.quick?.[1] || focus[1] || "Give one correct example."),
        q("single","Which is a mix-up to avoid?",{answers:[mistake[0],`Use the routine: ${routine.join(" → ")}.`,`Check ${key} before you answer.`]}),
        q("text",`Fix this mix-up: ${mistake[0]}. What should you do instead?`,{hint:mistake[1]}),
        q("text",`Make your own example that uses ${key} correctly.`),
        q("text",unit.quick?.[2] || focus[2] || "Explain how you know your answer is correct.",{enrichment:true}),
        q("text",unit.quick?.[3] || focus[3] || "Apply the same skill to a new example.",{enrichment:true})
      ]
    };
  }

  for (const [code, unit] of Object.entries(units)) {
    if (!/^AC9E1(?:LA|LE|LY)\d{2}$/.test(code)) continue;
    const focus = FOCUS[code] || [];
    unit.childGoal = GOALS[code] || unit.learn;
    unit.studentFacingFocus = focus;
    unit.subtitle = unit.childGoal;
    unit.learn = unit.childGoal;
    if (focus.length) {
      unit.mastery = focus.slice(0, 5).map((item) => item.replace(/[.]$/, ""));
      const existingQuick = Array.isArray(unit.quick) ? unit.quick : [];
      unit.quick = [...existingQuick, ...focus].filter((item, index, array) => array.indexOf(item) === index).slice(0, 4);
    }
    worksheets[code] = makeWorksheet(code, unit);
  }

  window.SkillrYear1EnglishStudentFacing = { goals:GOALS, focus:FOCUS, version:"2026-09-02-year1-english-student-facing" };
})();
