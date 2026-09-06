import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const codes = ["ac9sfu01", "ac9sfu02", "ac9sfu03"];
const reviewVersion = "20260906-foundation-science-ixl-u01-u03";

const evidence = {
  ac9sfu01: [
    "https://au.ixl.com/science/foundation/identify-plant-parts",
    "https://au.ixl.com/science/foundation/how-do-animals-use-their-body-parts",
    "https://au.ixl.com/science/foundation/compare-plants-and-animals",
  ],
  ac9sfu02: [
    "https://au.ixl.com/science/foundation/the-ways-things-move",
    "https://au.ixl.com/science/foundation/investigate-pushes-and-pulls",
    "https://au.ixl.com/science/foundation/design-a-race-car-track",
  ],
  ac9sfu03: [
    "https://au.ixl.com/science/foundation/classify-objects-by-material",
    "https://au.ixl.com/science/foundation/classify-objects-by-texture",
    "https://au.ixl.com/science/foundation/describe-objects",
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
    structuredExplanation: {
      summary: detail.explanation,
      hint: detail.hint,
    },
  });
}

const replacements = {
  ac9sfu01: {
    "ac9sfu01-p-004": {
      skill: "compare human and animal external features",
      question: "A child and a dog both have eyes and legs. Which outside feature belongs to the child but not the dog?",
      correct: "Hands with fingers",
      wrongs: ["Four paws", "A fur-covered tail"],
      explanation: "The child has hands with fingers. The dog has paws and a fur-covered tail instead.",
      hint: "Compare only features that can be seen on the outside.",
    },
    "ac9sfu01-p-008": {
      skill: "group animals by observable features",
      question: "A living crab and a living snail can be grouped together. Which outside feature supports this group?",
      correct: "A hard outer covering",
      wrongs: ["Soft feathers", "Green leaves"],
      explanation: "Both animals have a hard covering that can be observed on the outside of their bodies.",
      hint: "Look for one visible feature shared by both animals.",
    },
    "ac9sfu01-p-014": {
      skill: "group plants by observable features",
      question: "Which group contains only plants with leaves?",
      correct: "Gum tree, fern and rose bush",
      wrongs: ["Gum tree, lizard and rose bush", "Fern, butterfly and gum tree"],
      explanation: "A gum tree, fern and rose bush are all plants with observable leaves.",
      hint: "Check every member of the group against the same rule.",
    },
    "ac9sfu01-p-022": {
      skill: "identify foods as plant parts",
      question: "A carrot is pulled from the soil. Which plant part is the carrot?",
      correct: "Root",
      wrongs: ["Leaf", "Flower"],
      explanation: "The part of a carrot plant that we usually eat is its enlarged root.",
      hint: "Think about where the carrot grows on the plant.",
    },
    "ac9sfu01-p-023": {
      skill: "compare human and animal external features",
      question: "A child compares their face with a cat's face. Which outside feature do both have?",
      correct: "Eyes",
      wrongs: ["Whiskers", "Pointed furry ears"],
      explanation: "Both the child and the cat have visible eyes. Whiskers and pointed furry ears belong to the cat.",
      hint: "Choose a feature visible on both faces.",
    },
    "ac9sfu01-t-003": {
      skill: "identify foods as plant parts",
      question: "Which food is the leaf part of a plant?",
      correct: "Lettuce",
      wrongs: ["Carrot", "Apple"],
      explanation: "Lettuce is made of leaves. A carrot is a root and an apple is a fruit.",
      hint: "Decide whether each food is a leaf, root or fruit.",
    },
    "ac9sfu01-t-005": {
      skill: "infer a grouping rule from observable features",
      question: "Mia puts a rose and a daisy in the same group. Which rule explains her group?",
      correct: "Both plants have flowers with petals.",
      wrongs: ["Both plants have fur.", "Both plants have wings."],
      explanation: "A rose and a daisy both have flowers with visible petals, so the grouping rule fits both plants.",
      hint: "Check that the rule describes an outside feature of both plants.",
    },
    "ac9sfu01-t-015": {
      skill: "reason about overlapping feature groups",
      question: "A platypus has fur and a bill. Which statement uses both observable features fairly?",
      correct: "It can belong in both the 'has fur' and 'has a bill' groups.",
      wrongs: ["It cannot belong to either group.", "It must be placed only in the 'has wings' group."],
      explanation: "A platypus matches both stated rules because it has visible fur and a visible bill.",
      hint: "An animal can match more than one grouping rule.",
    },
  },
  ac9sfu02: {
    "ac9sfu02-p-004": {
      skill: "compare how shape influences movement",
      question: "Two equal sheets of paper are dropped from the same height. One is flat and one is scrunched into a ball. What factor is being compared?",
      correct: "Shape",
      wrongs: ["Material", "Drop height"],
      explanation: "Both objects use the same paper and the same drop height. Only their shape is different.",
      hint: "Find what changed and what stayed the same.",
    },
    "ac9sfu02-p-012": {
      skill: "compare how material influences movement",
      question: "Two same-size balls are dropped from the same height. The rubber ball bounces, but the soft-cloth ball does not. Which factor may explain the difference?",
      correct: "Their material",
      wrongs: ["Their size", "The drop height"],
      explanation: "The size and drop height stayed the same, while rubber and cloth are different materials.",
      hint: "Look for the one factor that changed.",
    },
    "ac9sfu02-p-019": {
      skill: "compare how size influences movement",
      question: "A large rubber ball and a small rubber ball roll down the same ramp. Which observation would help compare the effect of size?",
      correct: "Which ball travels farther after the ramp",
      wrongs: ["Which ball has the brighter colour", "Whether the ramp is indoors"],
      explanation: "Distance travelled is an observation about movement that can be compared for the two sizes.",
      hint: "Choose something about movement that can be observed for both balls.",
    },
    "ac9sfu02-t-001": {
      skill: "describe movement caused by a pull",
      question: "A child pulls a toy boat with a string. In which direction will the boat begin to move?",
      correct: "Towards the child",
      wrongs: ["Away from the child", "Straight up without being lifted"],
      explanation: "A pull on the string makes the toy boat move towards the child.",
      hint: "A pull usually brings an object closer.",
    },
    "ac9sfu02-t-003": {
      skill: "interpret evidence that shape influences movement",
      question: "A clay sphere and a clay cube start at the same place on a ramp. Which result is evidence that shape influenced their movement?",
      correct: "The sphere rolls farther than the cube.",
      wrongs: ["Both pieces of clay are blue.", "The ramp is beside a wall."],
      explanation: "The objects are made from the same clay but have different shapes, and the distance they move is different.",
      hint: "Choose a result about movement, not colour or location.",
    },
    "ac9sfu02-t-005": {
      skill: "compare how material influences movement",
      question: "A rubber ball and a soft-cloth ball are the same size and shape. The rubber ball bounces higher. Which factor is most likely influencing the movement?",
      correct: "Material",
      wrongs: ["Size", "Shape"],
      explanation: "The size and shape are the same, so the different materials are the factor being compared.",
      hint: "Remove the factors that are the same.",
    },
    "ac9sfu02-t-006": {
      skill: "describe how shape influences movement",
      question: "Which object is most likely to spin around one point?",
      correct: "Round toy top",
      wrongs: ["Soft scarf", "Square floor mat"],
      explanation: "A round toy top is shaped to turn around its pointed base, so it can spin around one point.",
      hint: "Think about which shape is designed to turn around a centre point.",
    },
    "ac9sfu02-t-016": {
      skill: "reason about movement investigations",
      question: "A class changes both the ramp height and the ball material in one test. Why is the result hard to explain?",
      correct: "They cannot tell which change affected the movement.",
      wrongs: ["The ball has stopped being an object.", "Movement can never be observed on a ramp."],
      explanation: "Changing two factors together makes it unclear whether height, material or both caused the result.",
      hint: "A fair comparison changes one factor at a time.",
    },
  },
  ac9sfu03: {
    "ac9sfu03-p-002": {
      skill: "distinguish materials from objects",
      question: "Which pair contains two material names?",
      correct: "Wood and metal",
      wrongs: ["Spoon and cup", "Handle and lid"],
      explanation: "Wood and metal name materials. The other words name objects or object parts.",
      hint: "A material is what an object is made from.",
    },
    "ac9sfu03-p-006": {
      skill: "classify objects by material",
      question: "Which two objects could be grouped because both are made from metal?",
      correct: "Key and bell",
      wrongs: ["Key and wooden peg", "Bell and glass jar"],
      explanation: "A key and a bell can both be made from metal, so they match the material rule.",
      hint: "Check both objects against the same material rule.",
    },
    "ac9sfu03-p-018": {
      skill: "describe multiple observable properties",
      question: "A fabric sample is soft, blue and bendy. Which statement is correct?",
      correct: "All three words describe observable properties.",
      wrongs: ["Blue names the material.", "Fabric is a texture word."],
      explanation: "Soft describes feel, blue describes colour and bendy describes flexibility. Fabric names the material.",
      hint: "Separate the material name from words that describe it.",
    },
    "ac9sfu03-p-024": {
      skill: "reason about material and colour",
      question: "A red plastic button and a blue plastic button look different. Why can they still be grouped together?",
      correct: "They are made from the same material.",
      wrongs: ["All plastic must be the same colour.", "Colour and material mean the same thing."],
      explanation: "Objects can have different colours while still being made from the same material, plastic.",
      hint: "Use the stated grouping rule: material, not colour.",
    },
    "ac9sfu03-t-001": {
      skill: "distinguish material, object and property",
      question: "A round bowl is made from glass. Which word names the material?",
      correct: "Glass",
      wrongs: ["Bowl", "Round"],
      explanation: "Glass is the material, bowl is the object and round describes its shape.",
      hint: "Ask what the object is made from.",
    },
    "ac9sfu03-t-006": {
      skill: "describe whether a material is see-through",
      question: "A child cannot see a toy through a cardboard sheet. Which property did the child observe?",
      correct: "It blocks a clear view.",
      wrongs: ["It stretches easily.", "It feels soft."],
      explanation: "The observation shows that cardboard is not see-through; it blocks the view of the toy.",
      hint: "Use only the evidence about seeing through the sheet.",
    },
    "ac9sfu03-t-011": {
      skill: "classify objects by material",
      question: "A glass jar and a glass marble have different shapes. Why can they be grouped together?",
      correct: "Both are made from glass.",
      wrongs: ["Both have the same shape.", "Both are used for the same purpose."],
      explanation: "The objects have different shapes and uses, but they share the material glass.",
      hint: "Apply the material rule to both objects.",
    },
    "ac9sfu03-t-014": {
      skill: "compare transparent and opaque materials",
      question: "A clear plastic ruler and a wooden ruler are held over some writing. Which result shows the plastic is see-through?",
      correct: "The writing can be seen through the plastic ruler.",
      wrongs: ["The wooden ruler hides the writing.", "Both rulers are the same length."],
      explanation: "A see-through material allows the writing behind it to remain visible.",
      hint: "Look for direct evidence that light and an image pass through.",
    },
  },
};

const explanationEnhancements = {
  "ac9sfu03-p-012": "The spreading wet patch shows that the paper towel takes in, or absorbs, the spilled water.",
  "ac9sfu03-p-015": "Shine is a property noticed by looking, so sight is the sense used to observe the shiny foil.",
  "ac9sfu03-p-021": "Smooth and rough tell how the tiles feel, so the property that differs is their texture.",
  "ac9sfu03-t-002": "The bag description identifies the clips as plastic and the body as fabric, so the clips are the plastic parts.",
  "ac9sfu03-t-004": "The ribbon can bend around the tube without staying rigid, which shows that its material is flexible.",
  "ac9sfu03-t-005": "The key and bell can be grouped together because both objects are made from the same material: metal.",
  "ac9sfu03-t-013": "A flexible strip bends easily, while a rigid tile and a stiff board resist bending.",
  "ac9sfu03-t-015": "Colour is an observable property seen with the eyes, so the child should look at both materials.",
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
      item.structuredExplanation ||= { summary: item.explanation };
      item.structuredExplanation.summary = item.explanation;
      item.structuredExplanation.hint ||= "Use the observation in the question and check every answer choice.";
      item.difficulty = bankName === "test" ? 3 : index < 8 ? 1 : index < 18 ? 2 : 3;
      item.difficultyTier = bankName === "test" ? "independent" : index < 8 ? "recognise" : index < 18 ? "apply" : "reason";
      item.sequencePriority = index + 1;
      item.qualitySchema = "foundation-science-ixl-standard-v1";
      delete item.review;
    });
    const aliases = bankName === "test" ? "\nwindow.skillrExamQuestions = window.skillrTestQuestions;" : "";
    fs.writeFileSync(file, `"use strict";\nwindow.${key} = ${JSON.stringify(bank, null, 2)};${aliases}\n`);
  }

  for (const bankName of ["practice", "test"]) {
    const htmlFile = path.join(root, "quiz/grade-k/science", code, bankName, "index.html");
    let html = fs.readFileSync(htmlFile, "utf8");
    const maxQuestions = 5;
    html = html.replace(/"maxQuestions":\d+/, `"maxQuestions":${maxQuestions}`)
      .replace(/"shuffleQuestions":false/, '"shuffleQuestions":true')
      .replace(
        /"shuffleAnswers":true(?!,"avoidSameCorrectPosition":true)/,
        '"shuffleAnswers":true,"avoidSameCorrectPosition":true'
      )
      .replace(/"questionCycle":(?:true|false)/, '"questionCycle":false')
      .replace(/,"questionCycleStorageKey":"[^"]+"/g, "")
      .replace(/questions\.js\?v=[^"']+/, `questions.js?v=${reviewVersion}`);

    if (bankName === "test") {
      html = html
        .replace(/Complete an? \d+-question Foundation test/g, "Complete a short shuffled Foundation test")
        .replace(/serves \d+ test questions/g, "serves a short shuffled test")
        .replace(/<span class="summary-number" id="questionCount">\d+<\/span>/, '<span class="summary-number" id="questionCount">5</span>');
    }
    if (code === "ac9sfu02") html = html.replace(/<h1 id="quizTitle">[^<]+<\/h1>/, '<h1 id="quizTitle">How Objects Move</h1>');
    if (code === "ac9sfu03") html = html.replace(/<h1 id="quizTitle">[^<]+<\/h1>/, '<h1 id="quizTitle">Objects and Materials</h1>');
    fs.writeFileSync(htmlFile, html);
  }
}

console.log(`Reviewed ${codes.join(", ")} against representative actual IXL Foundation Science tasks.`);
