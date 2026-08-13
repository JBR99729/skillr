(() => {
  "use strict";

  const CODE = "AC9EFLA01";
  const exactContentDescription = "explore how language is used differently at home and school depending on the relationships between people";

  const scenes = {
    friendHelp: {
      id: "friendHelp",
      relationship: "Friend",
      setting: "Play area",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Mia", role: "friend", kind: "child", colour: "#e05a75" },
      speech: "Can you help me?",
      highlights: ["Can you", "help me"],
      purpose: "ask for help",
      prop: "blocks",
      accessibleDescription: "Ari speaks to a friend in the play area and says, Can you help me?"
    },
    teacherHelp: {
      id: "teacherHelp",
      relationship: "Teacher",
      setting: "Classroom",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Ms Lee", role: "teacher", kind: "adult", colour: "#13795b" },
      speech: "Excuse me, could you please help me?",
      highlights: ["Excuse me", "could you please"],
      purpose: "ask for help",
      prop: "board",
      accessibleDescription: "Ari speaks to a teacher in the classroom and says, Excuse me, could you please help me?"
    },
    shopkeeperApples: {
      id: "shopkeeperApples",
      relationship: "Shopkeeper",
      setting: "Fruit shop",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Shopkeeper", role: "shopkeeper", kind: "adult", colour: "#7a4fb5" },
      speech: "Excuse me, where are the apples, please?",
      highlights: ["Excuse me", "please"],
      purpose: "ask for help",
      prop: "apples",
      accessibleDescription: "Ari speaks to a shopkeeper beside an apple display and says, Excuse me, where are the apples, please?"
    },
    friendPencil: {
      id: "friendPencil",
      relationship: "Friend",
      setting: "Drawing table",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Mia", role: "friend", kind: "child", colour: "#e05a75" },
      speech: "Can I use your pencil?",
      highlights: ["Can I", "your pencil"],
      purpose: "ask for a pencil",
      prop: "pencil",
      accessibleDescription: "Ari asks a friend, Can I use your pencil?"
    },
    teacherPencil: {
      id: "teacherPencil",
      relationship: "Teacher",
      setting: "Classroom",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Ms Lee", role: "teacher", kind: "adult", colour: "#13795b" },
      speech: "Excuse me, could I please borrow a pencil?",
      highlights: ["Excuse me", "could I please"],
      purpose: "ask for a pencil",
      prop: "pencilCup",
      accessibleDescription: "Ari asks a teacher, Excuse me, could I please borrow a pencil?"
    },
    friendOpinion: {
      id: "friendOpinion",
      relationship: "Friend",
      setting: "Picture table",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Mia", role: "friend", kind: "child", colour: "#e05a75" },
      speech: "I like the blue picture.",
      highlights: ["I like"],
      purpose: "share an opinion",
      prop: "pictures",
      accessibleDescription: "Ari tells a friend, I like the blue picture."
    },
    teacherOpinion: {
      id: "teacherOpinion",
      relationship: "Teacher and class",
      setting: "Class share",
      speaker: { name: "Ari", kind: "child", colour: "#2457d6" },
      listener: { name: "Ms Lee", role: "teacher", kind: "adult", colour: "#13795b" },
      speech: "I think the blue picture is best because it is easy to see.",
      highlights: ["I think", "because"],
      purpose: "share the same opinion with a reason",
      prop: "pictures",
      accessibleDescription: "Ari tells the teacher and class, I think the blue picture is best because it is easy to see."
    }
  };

  const colourSemantics = {
    blue: "the child who is speaking",
    greenOrPinkOrPurple: "the listener and their relationship",
    amberHighlight: "words that help the speech fit the listener",
    labelledScene: "the place and relationship"
  };

  const model = (id, component, purpose, parameters, usedBy, accessibleDescription) => ({
    id,
    component,
    purpose,
    parameters,
    validRanges: {
      sceneIds: Object.keys(scenes),
      relationshipCount: [1, 3]
    },
    colourSemantics,
    accessibleDescription,
    usedBy,
    reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: true }
  });

  const models = [
    model(
      "meaning-comparison",
      "relationshipComparison",
      "The same need can use different words",
      { sceneIds: ["friendHelp", "teacherHelp"], samePurpose: "ask for help", layout: "beforeAfter" },
      ["topic-meaning", "slide-meaning", "checkpoint-meaning"],
      "Two pictures compare asking a friend and asking a teacher for help. The words change while the purpose stays the same."
    ),
    model(
      "friend-help-scene",
      "relationshipSpeechScene",
      "Ask a friend",
      { sceneIds: ["friendHelp"] },
      ["topic-relationships", "slide-friend"],
      scenes.friendHelp.accessibleDescription
    ),
    model(
      "teacher-help-scene",
      "relationshipSpeechScene",
      "Ask a teacher",
      { sceneIds: ["teacherHelp"] },
      ["topic-relationships", "slide-teacher", "checkpoint-teacher"],
      scenes.teacherHelp.accessibleDescription
    ),
    model(
      "shopkeeper-scene",
      "relationshipSpeechScene",
      "Ask a shopkeeper",
      { sceneIds: ["shopkeeperApples"] },
      ["topic-relationships", "slide-shopkeeper"],
      scenes.shopkeeperApples.accessibleDescription
    ),
    model(
      "same-purpose-three",
      "relationshipComparison",
      "Same purpose, different relationships",
      { sceneIds: ["friendHelp", "teacherHelp", "shopkeeperApples"], samePurpose: "ask for help", layout: "threeWay" },
      ["topic-same-purpose", "slide-same-purpose", "checkpoint-same-purpose"],
      "Three pictures show a child asking a friend, a teacher and a shopkeeper for help using words that fit each relationship."
    ),
    model(
      "pencil-two-ways",
      "relationshipComparison",
      "Ask for a pencil in two ways",
      { sceneIds: ["friendPencil", "teacherPencil"], samePurpose: "ask for a pencil", layout: "beforeAfter" },
      ["topic-pencil", "slide-pencil", "checkpoint-pencil"],
      "Two pictures show asking a friend and asking a teacher for a pencil."
    ),
    model(
      "opinion-two-ways",
      "relationshipComparison",
      "Share the same opinion in two ways",
      { sceneIds: ["friendOpinion", "teacherOpinion"], samePurpose: "share an opinion", layout: "beforeAfter" },
      ["topic-opinion", "slide-opinion", "checkpoint-opinion"],
      "Two pictures show a child sharing the same opinion with a friend and with a teacher and class."
    ),
    model(
      "phrase-sort",
      "relationshipPhraseSort",
      "Match each phrase to the listener",
      {
        destinations: ["Friend", "Teacher", "Shopkeeper"],
        cards: [
          { text: "Can you help me?", destination: "Friend", sceneId: "friendHelp" },
          { text: "Excuse me, could you please help me?", destination: "Teacher", sceneId: "teacherHelp" },
          { text: "Excuse me, where are the apples, please?", destination: "Shopkeeper", sceneId: "shopkeeperApples" }
        ]
      },
      ["topic-activity", "slide-sort", "mastery-sort"],
      "Three speech cards can be matched to pictures of a friend, teacher and shopkeeper."
    ),
    model(
      "final-choice-check",
      "relationshipChoiceCheck",
      "Choose words that fit",
      {
        checks: [
          { sceneId: "teacherHelp", prompt: "Which words suit a teacher?" },
          { sceneId: "friendPencil", prompt: "How would you ask a friend?" },
          { sceneId: "meaning-comparison", prompt: "What changed?" }
        ]
      },
      ["topic-mastery", "slide-final", "mastery-final"],
      "Three picture prompts check choosing words for a teacher, a friend and a comparison."
    )
  ];

  const masteryItems = [
    {
      id: "checkpoint-meaning",
      type: "formative",
      after: "slide-meaning",
      prompt: "What changed?",
      expectedAnswer: "The words changed. The speaker still asked for help.",
      acceptableRepresentations: ["oral answer", "pointing to the highlighted words", "acting out both requests"],
      evidenceOfMastery: "The child identifies both the changed words and the unchanged purpose.",
      likelyMisconception: "The child says the purpose changed because the sentences sound different.",
      remediation: "Place the two pictures side by side. Ask, What does Ari need in both pictures? Then circle the different words.",
      decision: {
        continueWhen: "the child names the changed words and the same purpose",
        reteachWhen: "the child only notices the place, or says the purpose changed"
      }
    },
    {
      id: "checkpoint-teacher",
      type: "formative",
      after: "slide-teacher",
      prompt: "Which words suit a teacher?",
      expectedAnswer: "Excuse me and could you please suit this teacher request.",
      acceptableRepresentations: ["saying the words", "pointing to the highlighted words", "repeating the full model sentence"],
      evidenceOfMastery: "The child selects the words that get attention and make the request fit the teacher relationship.",
      likelyMisconception: "The child chooses help me only and misses the words that changed for the listener.",
      remediation: "Cover the ending help me in both bubbles. Compare only the beginnings: Can you and Excuse me, could you please.",
      decision: {
        continueWhen: "the child identifies Excuse me and could you please",
        reteachWhen: "the child cannot identify which words changed"
      }
    },
    {
      id: "checkpoint-same-purpose",
      type: "formative",
      after: "slide-same-purpose",
      prompt: "What changed? What stayed the same?",
      expectedAnswer: "The listener and some words changed. Asking for help stayed the same.",
      acceptableRepresentations: ["oral comparison", "pointing to each listener", "sorting the three speech bubbles"],
      evidenceOfMastery: "The child connects all three requests to the shared purpose and names a relationship change.",
      likelyMisconception: "The child judges one sentence as the only correct sentence.",
      remediation: "Name each listener first. Say, All three sentences can fit. Which person is listening to each one?",
      decision: {
        continueWhen: "the child identifies both change and sameness",
        reteachWhen: "the child treats one model as correct for every relationship"
      }
    },
    {
      id: "checkpoint-pencil",
      type: "formative",
      after: "slide-pencil",
      prompt: "Now ask for a pencil in both ways.",
      expectedAnswer: "Friend: Can I use your pencil? Teacher: Excuse me, could I please borrow a pencil?",
      acceptableRepresentations: ["the two model sentences", "another respectful pair that clearly fits friend and teacher", "role-play with a pencil"],
      evidenceOfMastery: "The child keeps the purpose the same and changes the wording for the listener.",
      likelyMisconception: "The child changes the object or gives only one request.",
      remediation: "Hold up one pencil and keep it visible. Point first to the friend picture, then to the teacher picture, and model the two sentence starters.",
      decision: {
        continueWhen: "the child gives two fitting requests for the same pencil",
        reteachWhen: "the child gives only one wording or changes the purpose"
      }
    },
    {
      id: "checkpoint-opinion",
      type: "formative",
      after: "slide-opinion",
      prompt: "What changed?",
      expectedAnswer: "The class answer added I think and a reason with because. The opinion about the blue picture stayed the same.",
      acceptableRepresentations: ["oral comparison", "pointing to I think and because", "saying both opinion sentences"],
      evidenceOfMastery: "The child recognises the same opinion and the fuller class wording.",
      likelyMisconception: "The child thinks an opinion must always include a reason.",
      remediation: "Say both opinions again. Explain that both tell what Ari thinks; the class version gives listeners more information.",
      decision: {
        continueWhen: "the child identifies the added reason and same opinion",
        reteachWhen: "the child says the two speakers have different opinions"
      }
    },
    {
      id: "mastery-sort",
      type: "mastery",
      after: "slide-sort",
      prompt: "Match each phrase to the friend, teacher or shopkeeper.",
      expectedAnswer: "Friend: Can you help me? Teacher: Excuse me, could you please help me? Shopkeeper: Excuse me, where are the apples, please?",
      acceptableRepresentations: ["pointing", "moving printed cards", "saying each relationship before the phrase"],
      evidenceOfMastery: "The child matches all three phrases and explains at least one choice using the listener.",
      likelyMisconception: "The child sorts by sentence length without looking at the listener or purpose.",
      remediation: "Use two cards only. Name the listener in each picture, model one match, then add the third card.",
      decision: {
        continueWhen: "all three matches fit and one is explained",
        reteachWhen: "the child sorts only by length or guesses"
      }
    },
    {
      id: "mastery-final",
      type: "mastery",
      after: "slide-final",
      prompt: "Answer the three picture questions aloud.",
      expectedAnswer: "Teacher words: Excuse me and could you please. Friend request: Can I use your pencil? Comparison: the words changed but the purpose stayed the same.",
      acceptableRepresentations: ["oral answers", "role-play", "pointing plus a short spoken explanation"],
      evidenceOfMastery: "The child independently chooses suitable words and explains what changed and stayed the same.",
      likelyMisconception: "The child repeats one memorised phrase for every listener.",
      remediation: "Return to the friend and teacher pencil pictures. Name each listener, practise the two starters, then ask the final questions again.",
      decision: {
        continueWhen: "the child answers all three prompts with relationship evidence",
        reteachWhen: "the child uses one memorised phrase for every listener"
      }
    }
  ];

  const teacherLayer = (teacherDoes, teacherSaysOrAsks, studentDoes, whatToLookFor, ifIncorrect) => ({
    teacherDoes,
    teacherSaysOrAsks,
    studentDoes,
    whatToLookFor,
    ifIncorrect
  });

  const slides = [
    {
      id: "slide-meaning",
      title: "Words Can Fit the Listener",
      purpose: "Understand that the same need can be expressed with different words.",
      display: {
        modelIds: ["meaning-comparison"],
        meaning: "We can ask for the same help in different ways. We choose words that fit who is listening.",
        studentPrompt: "What changed?",
        checkTogether: "The words changed. The speaker still asked for help."
      },
      teacherLayer: teacherLayer(
        "Show the friend and teacher pictures side by side. Point to the listener in each picture, then read both speech bubbles.",
        "Ari needs help in both pictures. Listen to the two ways Ari asks. What changed?",
        "Listen, compare the bubbles and point to words that changed.",
        "The child says that the words changed while asking for help stayed the same.",
        "Ask, What does Ari need in both pictures? Circle help me in both bubbles, then compare the beginnings."
      ),
      checkpointIds: ["checkpoint-meaning"],
      differentiationRefs: ["support", "core"],
      elaborationIds: ["E2"]
    },
    {
      id: "slide-friend",
      title: "Ask a Friend",
      purpose: "Model a short request that fits a friend relationship.",
      display: {
        modelIds: ["friend-help-scene"],
        meaning: "With a friend, a short, friendly question can fit.",
        studentPrompt: "How would you ask a friend?",
        checkTogether: "Can you help me?"
      },
      teacherLayer: teacherLayer(
        "Point to Ari, then Mia. Read the speech bubble with a warm, natural voice.",
        "Mia is Ari's friend. How would you ask a friend?",
        "Repeat the model sentence or give another short, respectful friend request.",
        "The child addresses the friend and makes a clear request for help.",
        "Give the sentence starter Can you and let the child finish help me?"
      ),
      checkpointIds: [],
      differentiationRefs: ["support", "core"],
      elaborationIds: ["E1", "E2"]
    },
    {
      id: "slide-teacher",
      title: "Ask a Teacher",
      purpose: "Model words that fit asking a teacher for help.",
      display: {
        modelIds: ["teacher-help-scene"],
        meaning: "With a teacher, we can get attention and use careful, polite words.",
        studentPrompt: "Which words suit a teacher?",
        checkTogether: "Excuse me and could you please suit this teacher request."
      },
      teacherLayer: teacherLayer(
        "Point to the teacher label. Read the whole bubble, then point to the highlighted words.",
        "Which words suit a teacher?",
        "Say or point to Excuse me and could you please, then repeat the full request.",
        "The child identifies the words that get attention and make the request fit the teacher relationship.",
        "Cover help me and compare only the beginnings of the friend and teacher requests."
      ),
      checkpointIds: ["checkpoint-teacher"],
      differentiationRefs: ["support", "core"],
      elaborationIds: ["E1", "E2"]
    },
    {
      id: "slide-shopkeeper",
      title: "Ask a Shopkeeper",
      purpose: "Model a clear question for an unfamiliar adult helping in a shop.",
      display: {
        modelIds: ["shopkeeper-scene"],
        meaning: "A shopkeeper may not know us. We can get attention and ask a clear question.",
        studentPrompt: "Which words help this question fit the shopkeeper?",
        checkTogether: "Excuse me, where are the apples, please?"
      },
      teacherLayer: teacherLayer(
        "Point to the apple display and shopkeeper label. Read the speech bubble without changing any words.",
        "Ari needs to find the apples. Which words help this question fit the shopkeeper?",
        "Point to or say Excuse me and please, then repeat the clear question.",
        "The child links the shopkeeper relationship to a clear question that gets attention and names what is needed.",
        "Point to the apples and supply the frame Excuse me, where are the, then let the child add apples, please?"
      ),
      checkpointIds: [],
      differentiationRefs: ["support", "core"],
      elaborationIds: ["E1", "E2"]
    },
    {
      id: "slide-same-purpose",
      title: "Same Purpose, Different Relationships",
      purpose: "Compare the same purpose across three relationships.",
      display: {
        modelIds: ["same-purpose-three"],
        meaning: "All three speakers need help. The relationship changes the words they choose.",
        studentPrompt: "What changed? What stayed the same?",
        checkTogether: "The listener and some words changed. Asking for help stayed the same."
      },
      teacherLayer: teacherLayer(
        "Read all three bubbles. Keep the purpose label ask for help visible while pointing to each listener.",
        "What changed? What stayed the same?",
        "Name each listener, identify a changed word or phrase and state the shared purpose.",
        "The child connects friend, teacher and shopkeeper language to the same broad purpose of asking for help.",
        "Say, All three can fit. Ask the child to match each bubble to its listener before comparing the words."
      ),
      checkpointIds: ["checkpoint-same-purpose"],
      differentiationRefs: ["support", "core", "extend"],
      elaborationIds: ["E1", "E2"]
    },
    {
      id: "slide-pencil",
      title: "Ask for a Pencil in Two Ways",
      purpose: "Transfer the relationship change to one new request.",
      display: {
        modelIds: ["pencil-two-ways"],
        meaning: "The pencil is the same. The listener changes, so the request changes.",
        studentPrompt: "Now ask for a pencil in both ways.",
        checkTogether: "Friend: Can I use your pencil? Teacher: Excuse me, could I please borrow a pencil?"
      },
      teacherLayer: teacherLayer(
        "Hold up one pencil. Point to the friend picture, then the teacher picture, and pause for both requests.",
        "Now ask for a pencil in both ways.",
        "Say one request to a friend and one request to a teacher while keeping the object and purpose the same.",
        "The child changes the wording for the listener without changing the pencil request.",
        "Offer the starters Can I and Excuse me, could I please. Let the child finish each sentence."
      ),
      checkpointIds: ["checkpoint-pencil"],
      differentiationRefs: ["support", "core", "extend"],
      elaborationIds: ["E1", "E2"]
    },
    {
      id: "slide-opinion",
      title: "Share an Opinion in Two Ways",
      purpose: "Model how the same opinion can be shared with different listeners.",
      display: {
        modelIds: ["opinion-two-ways"],
        meaning: "An opinion tells what you think. With a teacher or class, you may add a reason.",
        studentPrompt: "What changed?",
        checkTogether: "The class answer added I think and a reason with because. The opinion stayed the same."
      },
      teacherLayer: teacherLayer(
        "Show the same blue picture in both scenes. Read the friend opinion, then the class opinion.",
        "What changed? Did Ari's opinion change?",
        "Point to I think and because, then explain that the blue picture is still Ari's choice.",
        "The child recognises the same opinion and the added reason in the class response.",
        "Repeat only the key idea blue picture in both sentences, then point to the added reason."
      ),
      checkpointIds: ["checkpoint-opinion"],
      differentiationRefs: ["support", "core", "extend"],
      elaborationIds: ["E1"]
    },
    {
      id: "slide-sort",
      title: "Match the Phrase to the Listener",
      purpose: "Sort three familiar phrases by relationship.",
      display: {
        modelIds: ["phrase-sort"],
        meaning: "Look at the listener, then place each phrase with the relationship it suits.",
        studentPrompt: "Point to the listener for each phrase.",
        checkTogether: "Friend: Can you help me? Teacher: Excuse me, could you please help me? Shopkeeper: Excuse me, where are the apples, please?"
      },
      teacherLayer: teacherLayer(
        "Read one phrase card at a time. Invite children to point to Friend, Teacher or Shopkeeper before revealing the matches.",
        "Who is listening? Which phrase fits that relationship?",
        "Point, hold up a matching relationship card or move a printed phrase card to a listener.",
        "The child matches all three phrases and explains one match using the listener or place.",
        "Reduce to Friend and Teacher. Model one match, ask the child to match the second, then add Shopkeeper."
      ),
      checkpointIds: ["mastery-sort"],
      differentiationRefs: ["support", "core", "extend"],
      elaborationIds: ["E1", "E2"]
    },
    {
      id: "slide-final",
      title: "60-second Quick Check / Turn and Talk",
      purpose: "Check that children can choose and compare language independently with a partner.",
      display: {
        modelIds: ["final-choice-check"],
        meaning: "Choose words that fit the listener and what you want to say.",
        studentPrompt: "Turn and talk for 60 seconds. Answer the picture questions and explain which listener clue helped.",
        checkTogether: "Teacher: Excuse me, could you please help me? Friend: Can I use your pencil? The words changed, but the purpose stayed the same."
      },
      teacherLayer: teacherLayer(
        "Give partners 60 seconds for the picture questions. Sample two complete responses before revealing the model answers.",
        "Which words suit a teacher? How would you ask a friend? What changed?",
        "Answer aloud, point to relationship evidence and compare the final two pictures.",
        "The child independently chooses fitting language and explains what changed and stayed the same.",
        "Return to the friend and teacher pencil pictures, practise the two starters, then repeat the missed question."
      ),
      checkpointIds: ["mastery-final"],
      differentiationRefs: ["support", "core", "extend"],
      elaborationIds: ["E1", "E2"]
    }
  ];

  const spec = {
    schemaVersion: "1.1",
    code: CODE,
    year: "Foundation",
    subject: "English",
    title: "Words That Fit Who We Are Talking To",
    subtitle: "The same purpose can use different words with a friend, teacher or shopkeeper.",
    contentDescription: exactContentDescription,
    lessonTime: "30–35 minutes",
    learningIntention: "I can choose words that fit who I am talking to.",
    successCriteria: [
      "I can name who is speaking and who is listening.",
      "I can ask for the same thing in a friend way and a teacher way.",
      "I can explain what changed and what stayed the same.",
      "I can match a phrase to a friend, teacher or shopkeeper."
    ],
    materials: ["projected slides", "one pencil", "optional printed relationship and phrase cards"],
    conceptBoundary: {
      mustTeach: [
        "The same purpose can be expressed with different words depending on the relationship between speaker and listener.",
        "Children can ask relevant questions, make requests and share opinions in ways that suit familiar contexts.",
        "Children can compare language used with a friend, teacher and shopkeeper."
      ],
      prerequisites: [
        "Children can recognise familiar people and places and respond through speech, gesture or pointing."
      ],
      maySupportInformally: [
        "Use tone of voice, greetings, please, excuse me and a short reason to help a message fit the listener."
      ],
      mustNotOverteach: [
        "Do not require the terms formal register, informal register, audience or grammatical mood.",
        "Do not teach one sentence as the only correct option or rank home languages, dialects or family ways of speaking as better or worse.",
        "Do not turn the lesson into a list of fixed social rules; language choices depend on the relationship, purpose and setting."
      ]
    },
    teachingProgression: {
      name: "What it means → Look at the picture → Ask the class → Check together",
      reason: "Foundation children first hear the simple idea, then see it in a relationship scene, answer aloud and compare their response with a complete model answer.",
      steps: [
        { id: "meaning", purpose: "What it means", teacherAction: "Say the idea in one short sentence.", studentAction: "Listen and identify the same purpose.", modelIds: ["meaning-comparison"] },
        { id: "picture", purpose: "Look at the picture", teacherAction: "Point to the speaker, listener, place and speech bubble.", studentAction: "Name who is speaking and listening.", modelIds: ["same-purpose-three"] },
        { id: "ask", purpose: "Ask the class", teacherAction: "Ask one answerable question shown on the screen.", studentAction: "Answer aloud or point.", modelIds: ["pencil-two-ways"] },
        { id: "check", purpose: "Check together", teacherAction: "Reveal and read the complete model answer.", studentAction: "Compare, repeat and correct if needed.", modelIds: ["phrase-sort"] }
      ]
    },
    scenes,
    models,
    elaborations: [
      {
        id: "E1",
        shortTitle: "Questions, requests and opinions that fit",
        curriculumWording: "asking relevant questions, and expressing requests and opinions in ways that suit the contexts",
        teachingContext: false,
        plainLanguageConcept: "We can ask a question, make a request or share an opinion using words that fit the listener and place.",
        teachingPurpose: "Choose words for the message and the listener.",
        modelIds: ["teacher-help-scene", "shopkeeper-scene", "pencil-two-ways", "opinion-two-ways"],
        teacherDoes: "Model the teacher request, shopkeeper question, pencil request and opinion comparison exactly as pictured.",
        teacherSaysOrAsks: "Which words fit this listener? What changed?",
        studentDoes: "Answer aloud, point to highlighted words and say a fitting request or opinion.",
        whatToLookFor: "The child chooses words that fit both what they want to say and who is listening.",
        ifIncorrect: "Name the listener first, keep the purpose visible and offer two sentence starters to compare.",
        checkpointIds: ["checkpoint-teacher", "checkpoint-pencil", "checkpoint-opinion"],
        masteryEvidence: "The child asks for a pencil in two ways and explains the added words."
      },
      {
        id: "E2",
        shortTitle: "The same purpose with different relationships",
        curriculumWording: "learning to use language according to the relationship between people; for example, between a parent and a child, a teacher and a student, siblings or friends, shopkeepers and customers",
        teachingContext: false,
        plainLanguageConcept: "The same purpose can sound different with a friend, teacher or shopkeeper because the listener and relationship change.",
        teachingPurpose: "Compare language across familiar relationships.",
        modelIds: ["meaning-comparison", "same-purpose-three", "phrase-sort"],
        teacherDoes: "Keep asking for help as the shared purpose and compare the friend, teacher and shopkeeper scenes.",
        teacherSaysOrAsks: "What changed? What stayed the same?",
        studentDoes: "Name the relationship, match the phrase and explain the shared purpose.",
        whatToLookFor: "The child identifies both a language change and the unchanged purpose.",
        ifIncorrect: "Circle help in each scene, name each listener and compare only the highlighted words.",
        checkpointIds: ["checkpoint-meaning", "checkpoint-same-purpose", "mastery-sort"],
        masteryEvidence: "The child correctly sorts all three phrases and explains one match."
      }
    ],
    workedExamples: [
      {
        id: "worked-help",
        title: "Ask for help with three listeners",
        displayModelIds: ["same-purpose-three"],
        teacherLanguage: "Ari asks for help each time. The purpose stays the same. The listener changes, so some words change.",
        expectedAnswer: "Friend: Can you help me? Teacher: Excuse me, could you please help me? Shopkeeper: Excuse me, where are the apples, please?"
      },
      {
        id: "worked-pencil",
        title: "Ask for a pencil in two ways",
        displayModelIds: ["pencil-two-ways"],
        teacherLanguage: "The pencil and purpose stay the same. We change the words to fit a friend or teacher.",
        expectedAnswer: "Friend: Can I use your pencil? Teacher: Excuse me, could I please borrow a pencil?"
      }
    ],
    misconceptions: [
      {
        id: "one-sentence-everywhere",
        title: "One sentence must fit everyone",
        cause: "The child memorises one phrase without checking who is listening.",
        evidence: "The child repeats the same request for friend, teacher and shopkeeper.",
        rapidFix: "Show friend and teacher scenes side by side. Circle the same purpose and highlight the words that change."
      },
      {
        id: "longer-is-better",
        title: "Longer words are always better",
        cause: "The child notices sentence length but not the relationship or purpose.",
        evidence: "The child chooses the longest sentence for every listener.",
        rapidFix: "Say, A short friendly request can fit a friend. The best choice fits the listener and purpose."
      },
      {
        id: "home-language-wrong",
        title: "One way of speaking is wrong",
        cause: "The child treats different home, family, dialect or language choices as mistakes.",
        evidence: "The child ranks one familiar way of speaking as better than another.",
        rapidFix: "Explain that people and families speak in many correct ways. Today we are choosing words for a particular listener and place."
      }
    ],
    warmUp: {
      title: "Who is listening?",
      time: "5 minutes",
      steps: [
        "Show the Friend, Teacher and Shopkeeper relationship pictures.",
        "Read one exact phrase card without naming its listener.",
        "Children point to the listener they think fits.",
        "Reveal the match and ask one child to explain the clue."
      ],
      evidenceToNotice: "Children use the pictured relationship, not sentence length alone, to make a match."
    },
    differentiation: {
      support: {
        adaptation: "Use only Friend and Teacher. Keep both picture scenes visible and offer the starters Can you and Excuse me, could you please.",
        modelIds: ["meaning-comparison", "pencil-two-ways"],
        boundaryCheck: "The same concept is taught with two relationships and strong visual support."
      },
      core: {
        adaptation: "Compare Friend, Teacher and Shopkeeper, then ask for a pencil in friend and teacher ways.",
        modelIds: ["same-purpose-three", "pencil-two-ways", "phrase-sort"],
        boundaryCheck: "This directly teaches the Foundation content description and both elaborations."
      },
      extend: {
        adaptation: "Choose a new request, say it to two different listeners and explain which words changed and why.",
        modelIds: ["same-purpose-three", "opinion-two-ways"],
        boundaryCheck: "The child transfers the same relationship idea without using later-year language labels."
      }
    },
    slides,
    masteryItems,
    references: [
      { title: "Australian Curriculum Version 9.0", url: "https://www.australiancurriculum.edu.au/" }
    ],
    resourceLinks: {
      topic: "/foundation/english/ac9efla01-how-language-is-used-differently-at-home-and-school-depending/",
      slide: "/worksheets/foundation/english/teacher-slides/live.html?code=AC9EFLA01",
      worksheet: "/quiz/grade-k/english/ac9efla01/worksheet/",
      practice: "/quiz/grade-k/english/ac9efla01/practice/",
      test: "/quiz/grade-k/english/ac9efla01/test/"
    },
    review: {
      conceptSource: "Australian Curriculum Version 9.0 content description and elaborations, authored as an AC9EFLA01-only classroom lesson",
      elaborationCoverage: true,
      topicSlideParity: "The topic guide and slides render the same scene and model IDs from this specification.",
      visualQa: "Pending viewport checks before release.",
      humanReview: "Prototype prepared for teacher review before any other Foundation code is changed."
    }
  };

  const previousUnit = window.SkillrFoundationEnglishData?.[CODE];
  spec.vocabulary = previousUnit?.vocabulary || [];
  spec.coreSlideIds = ["slide-meaning", "slide-same-purpose", "slide-pencil", "slide-final"];
  const coreRoles = ["learning-intention", "concept-refresher", "guided-example", "quick-check"];
  spec.slides.forEach((slide) => {
    const coreIndex = spec.coreSlideIds.indexOf(slide.id);
    slide.sequenceRole = coreIndex >= 0 ? "core" : "optional-extension";
    if (coreIndex >= 0) slide.coreRole = coreRoles[coreIndex];
  });

  const unit = {
    code: CODE,
    title: spec.title,
    desc: spec.contentDescription,
    slug: "ac9efla01-how-language-is-used-differently-at-home-and-school-depending",
    subject: "Foundation English",
    profile: "ac9efla01ClassroomPrototype",
    subtitle: spec.subtitle,
    routine: spec.teachingProgression.name,
    learn: previousUnit?.learn || spec.learningIntention,
    model_title: models[0].purpose,
    model_html: "",
    apply_title: models[5].purpose,
    apply_html: "",
    activities: [{ title: spec.warmUp.title, text: spec.warmUp.steps.join(" "), visual: "Friend, Teacher and Shopkeeper relationship pictures" }],
    mistakes: spec.misconceptions.map((item) => [item.title, item.rapidFix]),
    quick: ["What changed?", "Which words suit a teacher?", "How would you ask a friend?", "Now ask for a pencil in both ways."],
    mastery: spec.successCriteria.map((item) => item.replace(/^I can\s+/i, "").replace(/\.$/, "")),
    vocabulary: spec.vocabulary,
    preservedLegacyTopicMaterial: previousUnit?.preservedLegacyTopicMaterial || {
      learn: previousUnit?.learn,
      model_title: previousUnit?.model_title,
      model_html: previousUnit?.model_html,
      apply_title: previousUnit?.apply_title,
      apply_html: previousUnit?.apply_html,
      activities: previousUnit?.activities,
      mistakes: previousUnit?.mistakes,
      quick: previousUnit?.quick,
      mastery: previousUnit?.mastery
    },
    canonical: spec
  };

  window.SkillrAC9EFLA01Lesson = spec;
  window.SkillrFoundationCanonicalLessons = Object.assign(window.SkillrFoundationCanonicalLessons || {}, { [CODE]: spec });
  if (window.SkillrFoundationEnglishData) window.SkillrFoundationEnglishData[CODE] = unit;
})();
