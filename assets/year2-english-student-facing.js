(() => {
  "use strict";

  const units = window.SkillrYear2EnglishData || {};
  const worksheets = window.SkillrYear2EnglishWorksheetData || (window.SkillrYear2EnglishWorksheetData = {});
  const q = (type, question, extra = {}) => ({ type, question, ...extra });

  const FOCUS = {
    AC9E2LA01:["Explore how greetings and polite expressions can vary across cultures.","Recognise respectful protocols in Welcome to Country and Acknowledgement of Country and learn local First Nations greeting words where appropriate.","Notice how familiarity with a person or group changes the language we choose."],
    AC9E2LA02:["Use precise words to explain why you appreciate a text.","Use verbs such as liked, preferred and enjoyed to show preference.","Recognise Country or Place words from First Nations Australian languages when they help describe a setting precisely."],
    AC9E2LA03:["Identify common features of narratives, procedures, reports, recounts, opinions and responses to texts.","Recognise that the same purpose can appear in different forms such as a poster, email or brochure.","Explain how a text's organisation and language features help it achieve its purpose."],
    AC9E2LA04:["Track how nouns and pronouns refer to the same person or thing across a text.","Use personal and possessive pronouns to reduce repetition while keeping meaning clear.","Notice when a word has been left out because the reader can infer it.","Connect related and contrasting information so a text stays cohesive."],
    AC9E2LA05:["Use numbered chapters and a table of contents to locate information.","Use alphabetical indexes to find a topic quickly.","Use side-bar menus, drop-down menus and links to navigate screen texts."],
    AC9E2LA06:["Recognise two independent clauses joined in one compound sentence.","Use coordinating conjunctions such as and, but and so to connect complete ideas."],
    AC9E2LA07:["Identify nouns for people, places, objects and ideas and the articles or adjectives that extend them.","Build noun groups by answering questions such as how many, what type and what is it like.","Build verb groups to express an action or state more precisely."],
    AC9E2LA08:["Find information in a map, table, diagram or illustration that is not stated in the written words.","Explain how pictures can show a character's action, reaction, speech or thoughts.","Combine words and images to build a fuller meaning."],
    AC9E2LA09:["Replace everyday words with more precise topic vocabulary when it helps meaning.","Discuss and use new vocabulary from learning-area texts.","Choose precise nouns and adjectives to describe characters.","Recognise relevant words from First Nations Australian languages when learning about a topic."],
    AC9E2LA10:["Use capital letters appropriately in titles.","Use commas to separate items in a list."],
    AC9E2LE01:["Discuss how familiar character types are connected with settings such as forests, castles or towers.","Recognise recurring characters and settings in texts by First Nations Australian authors.","Explore how Australian authors and illustrators depict the outback and its characters."],
    AC9E2LE02:["Identify characters and settings in literary texts.","Explain a preference for familiar or unfamiliar worlds and characters.","Give reasons for feelings about positive and negative behaviours of human or non-human characters."],
    AC9E2LE03:["Compare how similar characters or settings are described in texts from different contexts.","Compare verb groups used to show actions, emotions and dialogue.","Identify language used to describe landscape in First Nations Australians' stories."],
    AC9E2LE04:["Identify rhythmic sound and word patterns in poems, chants, rhymes and songs.","Reproduce a sound or rhythm pattern accurately.","Experiment with patterns, including examples from different home languages represented in the class."],
    AC9E2LE05:["Adapt a familiar literary text by changing speech, dialogue, behaviour, an event or an outcome.","Use drawing, writing, performance or digital tools to create an adaptation.","Improve descriptions by developing sentences and adding useful phrases."],
    AC9E2LY01:["Compare a poem, narrative and informative text about a similar topic and identify what each helps the reader learn.","Compare the same practical information presented in print, on packaging, in video or digitally.","Identify the shared purpose and the different presentation choices."],
    AC9E2LY02:["Respond to another person's idea with agreement, appreciation or a respectful alternative.","Listen actively and paraphrase what a partner has contributed.","Ask relevant questions and connect ideas with personal experience or another person's contribution.","Disagree respectfully and offer an alternative."],
    AC9E2LY03:["Identify whether a text is imaginative, informative or persuasive.","Identify the purpose of a text and who it is intended for.","Use clues in advertisements, signs and texts by First Nations Australian authors to identify purpose and audience."],
    AC9E2LY04:["Use phonics, morphemes and high-frequency words to decode text.","Read with phrasing and fluency so the sentence sounds meaningful.","Monitor meaning, reread and self-correct when something does not make sense."],
    AC9E2LY05:["Listen for specific information and identify key facts or points.","Follow and respond to detailed instructions.","Combine print, images and prior knowledge to make a supported inference.","Identify the main idea and summarise important information.","Predict likely vocabulary and use prior knowledge to make and confirm predictions.","Use graphic organisers to show connections and sequence."],
    AC9E2LY06:["Create short imaginative, informative and persuasive texts with a structure that suits the purpose and audience.","Use simple and compound sentences, noun groups, verb groups and topic vocabulary.","Sequence ideas or events clearly and use digital tools when useful.","Edit by adding, deleting or changing vocabulary and checking grammar, punctuation and spelling."],
    AC9E2LY07:["Plan and deliver a short presentation for a familiar audience and purpose.","Use formal or topic-specific vocabulary when the situation calls for it.","Sequence ideas, points or events clearly.","Adjust tone, volume and pace to suit the presentation."],
    AC9E2LY08:["Write upper-case and lower-case letters legibly and with growing fluency.","Use a functional pencil grip or grasp that supports controlled writing."],
    AC9E2LY09:["Blend and segment more complex spoken words into phonemes.","Delete phonemes to make a new word.","Substitute initial or medial phonemes to make a new word."],
    AC9E2LY10:["Use vowel digraphs such as ee, oo, ai, ay and ea when reading and writing.","Use less common long-vowel patterns such as ight.","Read and write words with consonant clusters and silent letters such as knife and thumb.","Apply sound-letter knowledge to one- and multi-syllable words, including compound words."],
    AC9E2LY11:["Use known words, spelling patterns and morphemes to read and write less predictable words.","Build from related known words such as one, once, only and lone.","Use sentence context to choose the correct pronunciation when more than one is possible."],
    AC9E2LY12:["Build word families by adding prefixes and suffixes to a base word.","Use known morphemes to help spell unfamiliar related words.","Use a known word such as friend to help write friendly and friendship."]
  };

  const GOALS = {
    AC9E2LA01:"I can choose language that suits the situation, the relationship and the role each person has.",
    AC9E2LA02:"I can explain why I prefer or appreciate a text using precise words, reasons and examples.",
    AC9E2LA03:"I can identify how different texts are organised and explain how their features suit their purpose.",
    AC9E2LA04:"I can use pronouns and inferred words to connect ideas clearly without unnecessary repetition.",
    AC9E2LA05:"I can use chapters, contents pages, indexes, menus and links to find information efficiently.",
    AC9E2LA06:"I can join two complete ideas into a compound sentence using conjunctions such as and, but and so.",
    AC9E2LA07:"I can build precise noun groups and verb groups to add useful information to sentences.",
    AC9E2LA08:"I can explain how images add information and meaning that words alone may not show.",
    AC9E2LA09:"I can choose precise vocabulary that suits the topic and makes meaning clearer.",
    AC9E2LA10:"I can use capital letters in titles and commas to separate items in a list.",
    AC9E2LE01:"I can explain how characters and settings are connected in literature from Australia and around the world.",
    AC9E2LE02:"I can identify characters and settings and give clear reasons for my literary preferences.",
    AC9E2LE03:"I can compare how language presents characters and settings in different literary texts.",
    AC9E2LE04:"I can identify, reproduce and experiment with rhythm, sound and word patterns in poems, chants, rhymes and songs.",
    AC9E2LE05:"I can create and edit an adaptation of a familiar literary text while keeping important story features clear.",
    AC9E2LY01:"I can compare how the same topic or information is presented in different kinds of texts.",
    AC9E2LY02:"I can listen actively, build on other people's ideas and agree or disagree respectfully.",
    AC9E2LY03:"I can identify the purpose and audience of imaginative, informative and persuasive texts.",
    AC9E2LY04:"I can read fluently, monitor meaning and reread or self-correct when something does not make sense.",
    AC9E2LY05:"I can use comprehension strategies to find literal information and make supported inferences.",
    AC9E2LY06:"I can create and edit short texts using a structure, sentences and vocabulary that suit the purpose and audience.",
    AC9E2LY07:"I can plan, rehearse and deliver a short presentation using clear structure, topic words, tone, volume and pace.",
    AC9E2LY08:"I can write clear unjoined upper-case and lower-case letters with growing fluency.",
    AC9E2LY09:"I can blend, segment, delete and substitute phonemes in more complex spoken words.",
    AC9E2LY10:"I can use vowel patterns, consonant clusters and silent letters to read and write one- and multi-syllable words.",
    AC9E2LY11:"I can use spelling patterns, morphemes and context to read and write words whose spelling is not fully predictable from sound.",
    AC9E2LY12:"I can build and spell word families by using base words, prefixes and suffixes."
  };

  function makeWorksheet(code, unit) {
    const focus = FOCUS[code] || [];
    const routine = String(unit.routine || "Notice → Think → Try → Check").split("→").map((s) => s.trim()).filter(Boolean);
    const activity = unit.activities?.[0];
    const mistake = unit.mistakes?.[0] || ["Guessing", "Return to the lesson example and check the evidence."];
    const model = unit.model_html || unit.hero_visual || unit.title;
    const goal = GOALS[code] || unit.learn;
    return {
      subject:"Year 2 English",
      title:`${unit.title} — student practice`,
      topicUrl:`/year2/english/${unit.slug}/`,
      method:routine.join(" → "),
      questions:[
        q("single","Which statement best matches today's skill?",{answers:[goal,"Choose an answer without checking the text or example.","Use the same strategy for every English task even when the purpose changes."]}),
        q("single","Which step should you do first?",{answers:[routine[0] || "Notice the clue.",routine[1] || "Explain after guessing.",routine.at(-1) || "Check only at the end."]}),
        q("single","Which classroom example would help you practise this skill?",{answers:[activity?.text || focus[0] || goal,"Copy a sentence without noticing how it works.","Ignore the words, sounds, pictures or structure."]}),
        q("text",unit.quick?.[0] || focus[0] || "Explain this skill in your own words."),
        q("text",unit.quick?.[1] || focus[1] || "Give one correct example."),
        q("single","Which is a mix-up to avoid?",{answers:[mistake[0],`Use the routine: ${routine.join(" → ")}.`,`Check the whole example before deciding.`]}),
        q("text",`Fix this mix-up: ${mistake[0]}. What should you do instead?`,{hint:mistake[1]}),
        q("text","Make your own new example that uses today's skill correctly."),
        q("text",unit.quick?.[2] || focus[2] || "Explain how you know your answer is supported.",{enrichment:true}),
        q("text",unit.quick?.[3] || focus[3] || "Apply the same skill to a different example.",{enrichment:true})
      ]
    };
  }

  for (const [code, unit] of Object.entries(units)) {
    if (!/^AC9E2(?:LA|LE|LY)\d{2}$/.test(code)) continue;
    const focus = FOCUS[code] || [];
    unit.childGoal = GOALS[code] || unit.learn;
    unit.studentFacingFocus = focus;
    unit.subtitle = unit.childGoal;
    unit.learn = unit.childGoal;
    if (focus.length) {
      unit.mastery = focus.slice(0, 6).map((item) => item.replace(/[.]$/, ""));
      const existingQuick = Array.isArray(unit.quick) ? unit.quick : [];
      unit.quick = [...existingQuick, ...focus].filter((item,index,array)=>array.indexOf(item)===index).slice(0,4);
    }
    worksheets[code] = makeWorksheet(code, unit);
  }

  window.SkillrYear2EnglishStudentFacing = { goals:GOALS, focus:FOCUS, version:"2026-09-02-year2-english-student-facing" };
})();
