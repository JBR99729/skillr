import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9sfi01", "ac9sfi02", "ac9sfi03"];
const version = "20260906-foundation-science-ixl-i01-i03";

const evidence = {
  ac9sfi01: [
    "https://au.ixl.com/science/foundation/weather-patterns",
    "https://au.ixl.com/science/foundation/investigate-shadows",
    "https://au.ixl.com/science/foundation/investigate-sunlight-and-shade",
  ],
  ac9sfi02: [
    "https://au.ixl.com/science/foundation/the-five-senses",
    "https://au.ixl.com/science/foundation/investigate-sunlight-and-shade",
    "https://au.ixl.com/science/foundation/investigate-pushes-and-pulls",
  ],
  ac9sfi03: [
    "https://au.ixl.com/science/foundation/weather-patterns",
    "https://au.ixl.com/science/foundation/sort-objects-by-material",
    "https://au.ixl.com/science/foundation/classify-objects-by-shape-colour-material-and-texture",
  ],
};

function load(file, key) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window[key];
}

function setQuestion(bank, id, detail) {
  const item = bank.find((question) => question.id === id);
  if (!item) throw new Error(`Missing question ${id}`);
  const correctPosition = item.correct;
  const answers = [...detail.wrongs];
  answers.splice(correctPosition, 0, detail.correct);
  Object.assign(item, {
    skill: detail.skill,
    question: detail.question,
    audioPrompt: detail.question,
    answers,
    correct: correctPosition,
    explanation: detail.explanation,
    structuredExplanation: { summary: detail.explanation, hint: detail.hint },
  });
}

const replacements = {
  ac9sfi01: {
    "ac9sfi01-p-008": {
      skill: "predict from a repeated experience",
      question: "A leaf floated in a tray yesterday. A similar leaf is placed gently on water today. Which prediction uses that experience?",
      correct: "The leaf might float.",
      wrongs: ["The leaf must turn into a fish.", "The water will disappear at once."],
      explanation: "The earlier leaf floated, so it is sensible to predict that a similar leaf might float too.",
      hint: "Choose what might happen based on yesterday's observation.",
    },
    "ac9sfi01-p-012": {
      skill: "predict a shadow change from experience",
      question: "Yesterday, moving a toy closer to a torch made its shadow look larger. What prediction fits moving it closer again?",
      correct: "Its shadow might look larger.",
      wrongs: ["Its shadow must disappear.", "The toy might change colour."],
      explanation: "The prediction uses the earlier shadow observation and says what might happen when the action is repeated.",
      hint: "Use the result observed yesterday.",
    },
    "ac9sfi01-p-020": {
      skill: "pose an observable question from experience",
      question: "A child saw a shiny snail trail on the path. Which question could be checked by watching the path tomorrow?",
      correct: "Will a new snail trail appear?",
      wrongs: ["Does the snail have a secret name?", "Is this the nicest path ever?"],
      explanation: "The child can watch the path tomorrow and observe whether a new snail trail appears.",
      hint: "Choose a question that observation could answer.",
    },
    "ac9sfi01-t-012": {
      skill: "make a material prediction from experience",
      question: "A paper cup became soft after rain. Which prediction uses that experience for another paper cup left in rain?",
      correct: "It might become soft.",
      wrongs: ["It might become metal.", "It must grow leaves."],
      explanation: "The first paper cup softened in rain, so another paper cup might soften in the same conditions.",
      hint: "Match the prediction to the earlier result.",
    },
    "ac9sfi01-t-008": {
      skill: "place a prediction in an investigation record",
      question: "Before testing another rock, a child fills the box 'What I think will happen'. Which note belongs there?",
      correct: "The rock might sink.",
      wrongs: ["The first rock is grey.", "The tray feels smooth now."],
      explanation: "The box is for a prediction, so it needs a statement about what might happen in the next test.",
      hint: "A prediction is written before the result is observed.",
    },
    "ac9sfi01-t-013": {
      skill: "predict from a recorded weather pattern",
      question: "For three days, mornings were cool and afternoons were warm. Which prediction uses this pattern?",
      correct: "Tomorrow afternoon might be warm.",
      wrongs: ["Tomorrow has no afternoon.", "The weather must never change again."],
      explanation: "The repeated warm afternoons support predicting that the next afternoon might also be warm.",
      hint: "Look for what happened at the same time on several days.",
    },
    "ac9sfi01-t-014": {
      skill: "predict movement from experience",
      question: "An egg-shaped toy rolled along a curving path yesterday. What is a sensible prediction for rolling it again?",
      correct: "It might follow a curving path.",
      wrongs: ["It must roll perfectly straight.", "It will turn into a ball."],
      explanation: "The toy curved when it rolled before, so it may follow a similar curving path again.",
      hint: "Use what the same shaped toy did before.",
    },
    "ac9sfi01-t-015": {
      skill: "predict from a wind observation",
      question: "A pinwheel turned each time the wind blew. What is a sensible prediction for the next windy day?",
      correct: "The pinwheel might turn again.",
      wrongs: ["The pinwheel must melt.", "The wind will make it grow."],
      explanation: "The repeated experience connects wind with turning, so the pinwheel might turn again.",
      hint: "Choose what happened on earlier windy days.",
    },
  },
  ac9sfi02: {
    "ac9sfi02-p-007": {
      skill: "prepare safely for an outdoor investigation",
      question: "A class will observe plants in sunny weather. Which plan helps keep children safe?",
      correct: "Wear hats and stay with the teacher.",
      wrongs: ["Run beyond the class boundary.", "Look at the Sun through a magnifier."],
      explanation: "Hats, class boundaries and teacher instructions help children investigate outdoors safely.",
      hint: "Choose the plan that protects children from sun and separation.",
    },
    "ac9sfi02-p-012": {
      skill: "make a sight observation",
      question: "Which sentence records something seen on a leaf?",
      correct: "The leaf is green.",
      wrongs: ["The leaf feels rough.", "The leaf smells minty."],
      explanation: "Green is a colour observed with sight; rough uses touch and minty describes smell.",
      hint: "Choose the detail observed with eyes.",
    },
    "ac9sfi02-p-013": {
      skill: "make a safe smell observation",
      question: "With teacher permission, which sentence records a smell observation of mint?",
      correct: "The mint smells strong.",
      wrongs: ["The mint is green.", "The mint feels soft."],
      explanation: "Smells strong records information gathered with smell after the teacher says it is safe.",
      hint: "Choose the sentence about odour, not colour or texture.",
    },
    "ac9sfi02-p-016": {
      skill: "carry observation equipment safely",
      question: "A child carries a magnifying glass to the science table. What should the child do?",
      correct: "Walk and hold it by the handle.",
      wrongs: ["Run while swinging it.", "Leave it on the floor."],
      explanation: "Walking and holding the handle keeps the tool controlled and reduces the chance of a fall.",
      hint: "Choose the careful way to carry equipment.",
    },
    "ac9sfi02-p-021": {
      skill: "observe a loud sound safely",
      question: "A class will listen to a loud bell. Which action is safest?",
      correct: "Stand back and listen when the teacher says.",
      wrongs: ["Hold the bell beside an ear.", "Strike the bell without warning."],
      explanation: "Keeping a safe distance and following the teacher protects hearing while allowing observation.",
      hint: "Protect ears and follow the agreed instruction.",
    },
    "ac9sfi02-p-023": {
      skill: "use digital tools safely outdoors",
      question: "A class photographs a plant outdoors. Which action is safe?",
      correct: "Stay on the path and use the tablet with an adult.",
      wrongs: ["Run while looking at the screen.", "Climb over the garden fence."],
      explanation: "Staying on the path and using the tablet with an adult protects the child, plant and equipment.",
      hint: "Choose the action that respects the boundary and the equipment.",
    },
    "ac9sfi02-t-005": {
      skill: "use sun-safe investigation procedures",
      question: "Which choice is safest for observing the school garden on a sunny day?",
      correct: "Wear a hat and stay in the class area.",
      wrongs: ["Stare directly at the Sun.", "Leave the group without telling anyone."],
      explanation: "A hat, class boundary and teacher supervision help make an outdoor observation safer.",
      hint: "Choose sun protection and staying with the group.",
    },
    "ac9sfi02-t-003": {
      skill: "choose a sense for a safe observation",
      question: "The teacher says a clean cloth is safe to handle. How can a child find out whether it is soft?",
      correct: "Touch it gently.",
      wrongs: ["Listen for its colour.", "Taste a corner."],
      explanation: "Softness is observed by safe, gentle touch; tasting is not used for this investigation.",
      hint: "Choose the sense that can notice texture.",
    },
    "ac9sfi02-t-008": {
      skill: "move investigation equipment safely",
      question: "A child carries a tray of science tools. What should the child do?",
      correct: "Walk slowly and hold the tray with two hands.",
      wrongs: ["Run with the tray above their head.", "Slide the tray across the floor."],
      explanation: "Walking slowly with two hands keeps the tools steady and reduces spills and collisions.",
      hint: "Choose the controlled way to carry the tray.",
    },
    "ac9sfi02-t-014": {
      skill: "compare sounds safely",
      question: "A class compares two shakers. How should they listen safely?",
      correct: "Play one at a time away from their ears.",
      wrongs: ["Shake both beside one ear.", "Taste each shaker first."],
      explanation: "Listening to one shaker at a safe distance protects ears and makes the sounds easier to compare.",
      hint: "Choose a method that protects hearing and supports comparison.",
    },
  },
  ac9sfi03: {
    "ac9sfi03-p-006": {
      skill: "sort animal observations in a provided table",
      question: "A table has columns 'has feathers' and 'no feathers'. Where should a duck picture go?",
      correct: "Has feathers",
      wrongs: ["No feathers", "Both columns at once"],
      explanation: "A duck has observable feathers, so its picture belongs in the has feathers column.",
      hint: "Use the visible body covering as the sorting rule.",
    },
    "ac9sfi03-p-009": {
      skill: "use a graphic organiser for plant features",
      question: "A picture organiser has 'has flowers' and 'no flowers'. Where should a rose bush picture go?",
      correct: "Has flowers",
      wrongs: ["No flowers", "Animals only"],
      explanation: "A rose bush has observable flowers, so the picture belongs in the has flowers group.",
      hint: "Match the plant picture to the given feature label.",
    },
    "ac9sfi03-p-011": {
      skill: "identify a movement pattern from recorded observations",
      question: "A class records that three toy cars rolled when their wheels turned. Which pattern did they find?",
      correct: "Turning wheels helped the cars roll.",
      wrongs: ["Every car changed colour.", "The cars had no moving parts."],
      explanation: "The repeated record links turning wheels with rolling movement in all three toy cars.",
      hint: "Look for what was shared by all three movement observations.",
    },
    "ac9sfi03-p-014": {
      skill: "link a material sample to objects on a display",
      question: "A wall display links a wood sample to a spoon and a block. Which picture could be added?",
      correct: "A wooden peg",
      wrongs: ["A glass jar", "A rubber ball"],
      explanation: "A wooden peg is made from the same material as the wood sample, spoon and block.",
      hint: "Follow the display's material rule.",
    },
    "ac9sfi03-p-022": {
      skill: "identify a pattern in material use",
      question: "A display shows a clear glass window and a clear glass jar. What pattern does it show?",
      correct: "Glass is used where seeing through helps.",
      wrongs: ["Glass is always soft and furry.", "Glass is used only for shoes."],
      explanation: "Both examples use clear glass where people need to see what is on the other side.",
      hint: "Find the shared material and why it is useful in both objects.",
    },
    "ac9sfi03-p-019": {
      skill: "correct a sense category in a provided template",
      question: "A child wrote 'rough bark' under 'I saw'. Where should the record be moved?",
      correct: "I felt",
      wrongs: ["I heard", "My prediction"],
      explanation: "Rough describes texture observed by touch, so the record belongs in the I felt section.",
      hint: "Match the describing word to the sense used.",
    },
    "ac9sfi03-p-023": {
      skill: "identify a common animal feature from a record",
      question: "A class table shows that a shark, goldfish and tuna all have fins. What pattern is recorded?",
      correct: "All three fish have fins.",
      wrongs: ["All three fish have fur.", "Only one fish has a body covering."],
      explanation: "The same observable feature, fins, appears for every fish in the provided record.",
      hint: "Look for the feature repeated in every row.",
    },
    "ac9sfi03-t-001": {
      skill: "identify a weather pattern in a provided table",
      question: "A table shows cool mornings and warm afternoons for three days. Which pattern is shown?",
      correct: "Afternoons were warmer than mornings.",
      wrongs: ["Mornings were always warmer.", "The weather was never recorded."],
      explanation: "Each row records a cool morning followed by a warmer afternoon, so that comparison repeats.",
      hint: "Compare morning and afternoon in every row.",
    },
    "ac9sfi03-t-004": {
      skill: "identify a feature pattern in an animal table",
      question: "A table records feathers for a duck and magpie, and fur for a dog. What pattern fits the bird group?",
      correct: "The birds have feathers.",
      wrongs: ["The birds have fur.", "The dog has feathers."],
      explanation: "Both animals in the bird group are recorded with feathers, while the dog is recorded with fur.",
      hint: "Use the feature shared by both birds.",
    },
    "ac9sfi03-t-002": {
      skill: "place a drawing in a provided sequence template",
      question: "A plant template has boxes labelled 'Monday' and 'Friday'. Where should the later drawing go?",
      correct: "Friday box",
      wrongs: ["Monday box", "Question box"],
      explanation: "The later observation was made on Friday, so its drawing belongs in the Friday box.",
      hint: "Match the observation time to the box label.",
    },
    "ac9sfi03-t-005": {
      skill: "interpret links on a material display",
      question: "A display links a wood sample to a chair and a pencil. Why are the pictures linked?",
      correct: "Both objects contain wood.",
      wrongs: ["Both objects are made only of glass.", "Both objects have the same use."],
      explanation: "The display represents the shared material: both the chair and pencil contain wood.",
      hint: "Follow the line from the material sample to each object.",
    },
    "ac9sfi03-t-011": {
      skill: "identify a repeated movement pattern",
      question: "A chart shows that a ball rolled in two trials and a cube slid in two trials. Which pattern is shown?",
      correct: "The round ball rolled each time.",
      wrongs: ["The cube rolled each time.", "Both objects floated each time."],
      explanation: "Across the repeated trials, the round ball was recorded rolling and the cube was recorded sliding.",
      hint: "Check what each shape did in both trials.",
    },
    "ac9sfi03-t-007": {
      skill: "sort a sound observation in a provided table",
      question: "A sound table has columns 'loud' and 'soft'. Where should a strong drum boom be recorded?",
      correct: "Loud",
      wrongs: ["Soft", "Colour"],
      explanation: "A strong drum boom is heard as loud, so the observation belongs in the loud column.",
      hint: "Use what was heard to choose the column.",
    },
    "ac9sfi03-t-015": {
      skill: "interpret a material-sorting table",
      question: "A table puts a jar and window under 'glass', and a spoon and peg under 'wood'. What is the sorting rule?",
      correct: "Objects are grouped by material.",
      wrongs: ["Objects are grouped by sound.", "Objects are grouped by owner."],
      explanation: "Each column groups objects made from the named material, either glass or wood.",
      hint: "Read the column headings and check every object below them.",
    },
  },
};

const explanationEnhancements = {
  "ac9sfi02-t-001": "Colour is an observable feature noticed with the eyes, so the sense used is sight.",
  "ac9sfi02-t-003": "Soft describes how the leaf feels, so this observation is made safely using touch.",
  "ac9sfi03-t-007": "Loud records a sound heard with the ears, so it fits the template section asking what was heard.",
};

for (const code of codes) {
  for (const bankName of ["practice", "test"]) {
    const file = path.join(root, "quiz/grade-k/science", code, bankName, "questions.js");
    const key = bankName === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions";
    const bank = load(file, key);
    for (const [id, detail] of Object.entries(replacements[code])) {
      if (id.includes(`-${bankName === "practice" ? "p" : "t"}-`)) setQuestion(bank, id, detail);
    }
    bank.forEach((item, index) => {
      if (explanationEnhancements[item.id]) item.explanation = explanationEnhancements[item.id];
      item.audioPrompt = item.question;
      item.structuredExplanation ||= {};
      item.structuredExplanation.summary = item.explanation;
      item.structuredExplanation.hint ||= "Use the experience or observation in the question to check every choice.";
      item.difficulty = bankName === "test" ? 3 : index < 8 ? 1 : index < 18 ? 2 : 3;
      item.difficultyTier = bankName === "test" ? "independent" : index < 8 ? "recognise" : index < 18 ? "apply" : "reason";
      item.sequencePriority = index + 1;
      item.qualitySchema = "foundation-science-ixl-standard-v1";
      delete item.review;
    });
    const aliases = bankName === "test" ? "\nwindow.skillrExamQuestions = window.skillrTestQuestions;" : "";
    fs.writeFileSync(file, `"use strict";\nwindow.${key} = ${JSON.stringify(bank, null, 2)};${aliases}\n`);

    const htmlFile = path.join(root, "quiz/grade-k/science", code, bankName, "index.html");
    let html = fs.readFileSync(htmlFile, "utf8");
    const maxQuestions = 5;
    html = html
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${maxQuestions}`)
      .replace(/"shuffleQuestions":false/, '"shuffleQuestions":true')
      .replace(/"shuffleAnswers":true(?!,"avoidSameCorrectPosition":true)/, '"shuffleAnswers":true,"avoidSameCorrectPosition":true')
      .replace(/"questionCycle":(?:true|false)/, '"questionCycle":false')
      .replace(/,"questionCycleStorageKey":"[^"]+"/g, "")
      .replace(/questions\.js\?v=[^"']+/, `questions.js?v=${version}`);
    if (bankName === "test") {
      html = html
        .replace(/Complete an? \d+-question Foundation test/g, "Complete a short shuffled Foundation test")
        .replace(/serves \d+ test questions/g, "serves a short shuffled test")
        .replace(/<span class="summary-number" id="questionCount">\d+<\/span>/, '<span class="summary-number" id="questionCount">5</span>');
    }
    const title = code === "ac9sfi01" ? "Questions and Predictions" : code === "ac9sfi02" ? "Safe Science Observations" : "Record Observations and Find Patterns";
    html = html.replace(/<h1 id="quizTitle">[^<]+<\/h1>/, `<h1 id="quizTitle">${title}</h1>`);
    const visualTag = `<script src="/assets/quiz-visuals/foundation-science/${code}-visual-overrides.js?v=${version}"></script>`;
    if (!html.includes(`${code}-visual-overrides.js`)) html = html.replace('<script src="/quiz/assets/script.js?v=117"></script>', `${visualTag}<script src="/quiz/assets/script.js?v=117"></script>`);
    fs.writeFileSync(htmlFile, html);
  }

  const indexFile = path.join(root, "quiz/grade-k/science", code, "index.html");
  let indexHtml = fs.readFileSync(indexFile, "utf8")
    .replace(/Practice (?:draws from|uses) a 56-question learning bank; Test uses a separate 24-question auto-marked bank\./, "Practice draws from a 24-question learning bank; Test uses a separate 16-question auto-marked bank.")
    .replace(/Practice uses a 56-question learning bank, while Test uses a separate 24-question auto-marked bank\./, "Practice draws from a 24-question learning bank; Test uses a separate 16-question auto-marked bank.");
  fs.writeFileSync(indexFile, indexHtml);
}

for (const code of ["ac9sfu01", "ac9sfu02", "ac9sfu03"]) {
  for (const bankName of ["practice", "test"]) {
    const htmlFile = path.join(root, "quiz/grade-k/science", code, bankName, "index.html");
    let html = fs.readFileSync(htmlFile, "utf8");
    const visualTag = `<script src="/assets/quiz-visuals/foundation-science/${code}-visual-overrides.js?v=${version}"></script>`;
    if (html.includes(`${code}-visual-overrides.js`)) {
      html = html.replace(new RegExp(`${code}-visual-overrides\\.js\\?v=[^"']+`), `${code}-visual-overrides.js?v=${version}`);
    } else {
      html = html.replace('<script src="/quiz/assets/script.js?v=117"></script>', `${visualTag}<script src="/quiz/assets/script.js?v=117"></script>`);
    }
    fs.writeFileSync(htmlFile, html);
  }
}

console.log(`Reviewed ${codes.join(", ")} against Foundation inquiry task evidence from ${Object.values(evidence).flat().length} mapped IXL references.`);
