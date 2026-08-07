"use strict";

/* =========================================================
   AC9MFN03 — COUNTING AND COMPARING

   100-question bank
   Foundation Mathematics

   Skills:
   - counting collections to 20
   - one-to-one correspondence
   - cardinality
   - more / fewer / same
   - comparing collections
   - arrangement independence
   - reasoning about counting
   - practical counting situations
   ========================================================= */

window.quizQuestions = [

  /* =======================================================
     LEVEL 1 — BASIC COUNTING
     QUESTIONS 1–20
     ======================================================= */

  {
    type: "number",
    question: "How many dots do you see?",
    visual: "⚫ ⚫ ⚫",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "There are 3 dots."
  },

  {
    type: "single",
    question: "How many stars are in this collection?",
    visual: "⭐ ⭐ ⭐ ⭐ ⭐",
    answers: ["4", "5", "6"],
    correct: 1,
    explanation: "There are 5 stars."
  },

  {
    type: "text",
    question: "How many apples can you see?",
    visual: "🍎 🍎",
    placeholder: "Type the number",
    acceptedAnswers: ["2", "two"],
    explanation: "There are 2 apples."
  },

  {
    type: "fill-blank",
    question: "Complete the sentence.",
    visual: "🚗 🚗 🚗 🚗",
    template: "There are {{blank}} cars.",
    placeholder: "number",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "There are 4 cars."
  },

  {
    type: "single",
    question: "How many balls are there?",
    visual: "⚽ ⚽ ⚽ ⚽ ⚽ ⚽",
    answers: ["5", "6", "7"],
    correct: 1,
    explanation: "There are 6 balls."
  },

  {
    type: "number",
    question: "Count the fish.",
    visual: "🐟 🐟 🐟 🐟\n🐟 🐟 🐟",
    placeholder: "Type the number",
    correct: 7,
    tolerance: 0,
    explanation: "There are 7 fish."
  },

  {
    type: "true-false",
    question: "This collection contains 4 counters.",
    visual: "🔴 🔴 🔴 🔴",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. There are exactly 4 counters."
  },

  {
    type: "number",
    question: "How many blocks are there altogether?",
    visual: "🟦 🟦 🟦 🟦\n🟦 🟦 🟦 🟦",
    placeholder: "Type the number",
    correct: 8,
    tolerance: 0,
    explanation: "There are 8 blocks."
  },

  {
    type: "fill-blank",
    question: "Count the hearts.",
    visual: "💖 💖 💖\n💖 💖 💖\n💖 💖 💖",
    template: "There are {{blank}} hearts.",
    placeholder: "number",
    acceptedAnswers: [
      ["9", "nine"]
    ],
    explanation: "There are 9 hearts."
  },

  {
    type: "single",
    question: "How many circles are shown?",
    visual: "🟡 🟡 🟡 🟡 🟡\n🟡 🟡 🟡 🟡 🟡",
    answers: ["8", "9", "10"],
    correct: 2,
    explanation: "There are 10 circles."
  },

  {
    type: "number",
    question: "Count all the stars.",
    visual: "⭐ ⭐ ⭐ ⭐ ⭐ ⭐\n⭐ ⭐ ⭐ ⭐ ⭐",
    placeholder: "Type the number",
    correct: 11,
    tolerance: 0,
    explanation: "There are 11 stars."
  },

  {
    type: "text",
    question: "How many dots are in this collection?",
    visual: "⚫ ⚫ ⚫ ⚫\n⚫ ⚫ ⚫ ⚫\n⚫ ⚫ ⚫ ⚫",
    placeholder: "Type the number",
    acceptedAnswers: ["12", "twelve"],
    explanation: "There are 12 dots."
  },

  {
    type: "fill-blank",
    question: "Count all the triangles.",
    visual: "🔺 🔺 🔺 🔺 🔺\n🔺 🔺 🔺 🔺\n🔺 🔺 🔺 🔺",
    template: "There are {{blank}} triangles.",
    placeholder: "number",
    acceptedAnswers: [
      ["13", "thirteen"]
    ],
    explanation: "There are 13 triangles."
  },

  {
    type: "single",
    question: "How many apples are there altogether?",
    visual: "🍎 🍎 🍎 🍎 🍎 🍎 🍎\n🍎 🍎 🍎 🍎 🍎 🍎 🍎",
    answers: ["12", "14", "16"],
    correct: 1,
    explanation: "There are 14 apples."
  },

  {
    type: "number",
    question: "Count the circles.",
    visual: "🔵 🔵 🔵 🔵 🔵\n🔵 🔵 🔵 🔵 🔵\n🔵 🔵 🔵 🔵 🔵",
    placeholder: "Type the number",
    correct: 15,
    tolerance: 0,
    explanation: "There are 15 circles."
  },

  {
    type: "single",
    question: "How many squares are shown?",
    visual: "🟩 🟩 🟩 🟩\n🟩 🟩 🟩 🟩\n🟩 🟩 🟩 🟩\n🟩 🟩 🟩 🟩",
    answers: ["14", "16", "18"],
    correct: 1,
    explanation: "There are 16 squares."
  },

  {
    type: "fill-blank",
    question: "Count the flowers.",
    visual: "🌸 🌸 🌸 🌸 🌸 🌸\n🌸 🌸 🌸 🌸 🌸 🌸\n🌸 🌸 🌸 🌸 🌸",
    template: "There are {{blank}} flowers.",
    placeholder: "number",
    acceptedAnswers: [
      ["17", "seventeen"]
    ],
    explanation: "There are 17 flowers."
  },

  {
    type: "number",
    question: "How many counters are there?",
    visual: "🟣 🟣 🟣 🟣 🟣 🟣\n🟣 🟣 🟣 🟣 🟣 🟣\n🟣 🟣 🟣 🟣 🟣 🟣",
    placeholder: "Type the number",
    correct: 18,
    tolerance: 0,
    explanation: "There are 18 counters."
  },

  {
    type: "single",
    question: "Count all the stars. Which answer is correct?",
    visual: "⭐ ⭐ ⭐ ⭐ ⭐\n⭐ ⭐ ⭐ ⭐ ⭐\n⭐ ⭐ ⭐ ⭐ ⭐\n⭐ ⭐ ⭐ ⭐",
    answers: ["18", "19", "20"],
    correct: 1,
    explanation: "There are 19 stars."
  },

  {
    type: "number",
    question: "How many blocks are in the whole collection?",
    visual: "🧱 🧱 🧱 🧱 🧱\n🧱 🧱 🧱 🧱 🧱\n🧱 🧱 🧱 🧱 🧱\n🧱 🧱 🧱 🧱 🧱",
    placeholder: "Type the number",
    correct: 20,
    tolerance: 0,
    explanation: "There are 20 blocks."
  },


  /* =======================================================
     LEVEL 2 — MORE, FEWER AND SAME
     QUESTIONS 21–40
     ======================================================= */

  {
    type: "single",
    question: "Which group has MORE dots?",
    visual: "Group A: ⚫ ⚫ ⚫ ⚫\n\nGroup B: 🔵 🔵 🔵 🔵 🔵 🔵",
    answers: ["Group A", "Group B", "They are the same"],
    correct: 1,
    explanation: "Group A has 4 dots and Group B has 6. Group B has more."
  },

  {
    type: "single",
    question: "Which group has FEWER stars?",
    visual: "Group A: ⭐ ⭐ ⭐ ⭐ ⭐\n\nGroup B: ⭐ ⭐ ⭐",
    answers: ["Group A", "Group B", "They are equal"],
    correct: 1,
    explanation: "Group B has 3 stars, which is fewer than 5."
  },

  {
    type: "true-false",
    question: "These collections have the same number of objects.",
    visual: "🍎 🍎 🍎 🍎\n\n🍌 🍌 🍌 🍌",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Both collections contain 4 objects."
  },

  {
    type: "fill-blank",
    question: "Complete the comparison.",
    visual: "Group A: 🔴 🔴 🔴 🔴 🔴 🔴 🔴\n\nGroup B: 🔵 🔵 🔵 🔵 🔵",
    template: "Group {{blank}} has more objects.",
    placeholder: "A or B",
    acceptedAnswers: [
      ["A", "a", "group a"]
    ],
    explanation: "Group A has 7 objects and Group B has 5."
  },

  {
    type: "single",
    question: "Which statement is correct?",
    visual: "🟢 🟢 🟢 🟢 🟢 🟢\n\n🟡 🟡 🟡 🟡 🟡 🟡",
    answers: [
      "The green group has more.",
      "The yellow group has more.",
      "The groups have the same number."
    ],
    correct: 2,
    explanation: "Both groups contain 6 objects."
  },

  {
    type: "number",
    question: "Group A has 8 counters. Group B has 6 counters. How many MORE counters does Group A have?",
    correct: 2,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "8 is 2 more than 6."
  },

  {
    type: "number",
    question: "There are 9 red counters and 5 blue counters. How many FEWER blue counters are there?",
    correct: 4,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "5 is 4 fewer than 9."
  },

  {
    type: "single",
    question: "Which collection has more objects?",
    visual: "A: 🟦 🟦 🟦 🟦 🟦 🟦 🟦 🟦 🟦 🟦\n\nB: 🟥 🟥 🟥 🟥 🟥 🟥 🟥 🟥",
    answers: ["A", "B", "Same"],
    correct: 0,
    explanation: "Collection A has 10 objects and B has 8."
  },

  {
    type: "true-false",
    question: "Spreading objects further apart makes the collection contain more objects.",
    visual: "⚫     ⚫     ⚫     ⚫     ⚫",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. Spacing does not change the number of objects."
  },

  {
    type: "single",
    question: "Which group has more objects?",
    visual: "Group A: 🐘 🐘 🐘\n\nGroup B: 🐜 🐜 🐜 🐜",
    answers: ["Group A", "Group B", "Same"],
    correct: 1,
    explanation: "Object size does not matter. Group B has 4 objects while Group A has 3."
  },

  {
    type: "fill-blank",
    question: "Complete the sentence.",
    visual: "🔴 🔴 🔴 🔴 🔴 🔴 🔴\n\n🔵 🔵 🔵 🔵 🔵 🔵 🔵",
    template: "The two groups have the {{blank}} number of objects.",
    placeholder: "word",
    acceptedAnswers: [
      ["same", "equal"]
    ],
    explanation: "Both groups contain 7 objects."
  },

  {
    type: "multiple",
    question: "Select every group that has MORE than 5 objects.",
    instruction: "More than one answer is correct.",
    answers: [
      "Group A: ⭐ ⭐ ⭐ ⭐ ⭐ ⭐",
      "Group B: 🔴 🔴 🔴 🔴",
      "Group C: 🟦 🟦 🟦 🟦 🟦 🟦 🟦"
    ],
    correct: [0, 2],
    explanation: "Group A has 6 and Group C has 7. Both are more than 5."
  },

  {
    type: "single",
    question: "Which collection has fewer objects?",
    visual: "A: 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎\n\nB: 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌",
    answers: ["A", "B", "Same"],
    correct: 0,
    explanation: "A has 9 objects and B has 12, so A has fewer."
  },

  {
    type: "number",
    question: "One collection has 12 objects and another has 10. How many more objects are in the larger collection?",
    correct: 2,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "12 is 2 more than 10."
  },

  {
    type: "text",
    question: "Two collections each contain 8 objects. Type MORE, FEWER or SAME.",
    placeholder: "more, fewer or same",
    acceptedAnswers: ["same", "equal", "the same"],
    explanation: "Both collections contain 8, so they are the same."
  },

  {
    type: "single",
    question: "Which number represents the larger collection?",
    answers: ["11", "14"],
    correct: 1,
    explanation: "14 is greater than 11."
  },

  {
    type: "true-false",
    question: "A group of 15 objects contains fewer objects than a group of 16.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. 15 is one fewer than 16."
  },

  {
    type: "fill-blank",
    question: "Group A contains 13 objects. Group B contains 16 objects.",
    template: "Group {{blank}} has more objects.",
    placeholder: "A or B",
    acceptedAnswers: [
      ["B", "b", "group b"]
    ],
    explanation: "16 is greater than 13, so Group B has more."
  },

  {
    type: "multiple",
    question: "Select every collection that contains exactly 10 objects.",
    instruction: "More than one answer may be correct.",
    answers: [
      "Collection A: 10 counters",
      "Collection B: 9 counters",
      "Collection C: 10 stars"
    ],
    correct: [0, 2],
    explanation: "Collections A and C both contain exactly 10 objects."
  },

  {
    type: "drag-drop",
    question: "Arrange these collections from FEWEST objects to MOST objects.",
    instruction: "Drag the cards into order. On a touchscreen, you can use the arrows.",
    items: [
      "8 objects",
      "3 objects",
      "5 objects"
    ],
    correct: [
      "3 objects",
      "5 objects",
      "8 objects"
    ],
    explanation: "From fewest to most: 3, 5, 8."
  },


  /* =======================================================
     LEVEL 3 — CARDINALITY AND ARRANGEMENT
     QUESTIONS 41–60
     ======================================================= */

  {
    type: "true-false",
    question: "When you count a collection correctly, the last number you say tells how many objects are in the collection.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. This is called cardinality."
  },

  {
    type: "true-false",
    question: "If we move these 6 dots into a different arrangement, there will still be 6 dots.",
    visual: "⚫ ⚫ ⚫ ⚫ ⚫ ⚫",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Moving objects does not change the quantity."
  },

  {
    type: "order",
    question: "Put the quantities in order from smallest to largest.",
    items: ["12", "2", "9", "6"],
    correct: ["2", "6", "9", "12"],
    explanation: "The correct order is 2, 6, 9, 12."
  },

  {
    type: "drag-drop",
    question: "Arrange the cards from smallest collection to largest collection.",
    instruction: "Drag the cards into order.",
    items: [
      "Card A: 4 objects",
      "Card B: 1 object",
      "Card C: 3 objects"
    ],
    correct: [
      "Card B: 1 object",
      "Card C: 3 objects",
      "Card A: 4 objects"
    ],
    explanation: "1 is smallest, then 3, then 4."
  },

  {
    type: "number",
    question: "Count the scattered dots carefully.",
    visual: "⚫     ⚫   ⚫\n   ⚫        ⚫\n⚫   ⚫     ⚫\n    ⚫   ⚫    ⚫",
    placeholder: "Type the number",
    correct: 11,
    tolerance: 0,
    explanation: "There are 11 dots. The scattered arrangement does not change the count."
  },

  {
    type: "number",
    question: "How many counters are in this arrangement?",
    visual: "🔴 🔴 🔴 🔴\n🔴 🔴 🔴 🔴\n🔴 🔴 🔴 🔴",
    placeholder: "Type the number",
    correct: 12,
    tolerance: 0,
    explanation: "There are 12 counters."
  },

  {
    type: "true-false",
    question: "These two collections contain the same number of objects.",
    visual: "⚫ ⚫ ⚫ ⚫ ⚫\n\n🔵\n🔵\n🔵\n🔵\n🔵",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Each collection contains 5 objects."
  },

  {
    type: "number",
    question: "Count every shape, regardless of colour.",
    visual: "🔴 🔵 🟢 🟡 🔴 🔵 🟢 🟡",
    placeholder: "Type the number",
    correct: 8,
    tolerance: 0,
    explanation: "There are 8 shapes altogether."
  },

  {
    type: "single",
    question: "How many objects are in the whole mixed collection?",
    visual: "⭐ 🔴 🟦 ⭐ 🔴 🟦 ⭐ 🔴 🟦",
    answers: ["6", "8", "9"],
    correct: 2,
    explanation: "There are 9 objects. Their colours and shapes do not change the total."
  },

  {
    type: "fill-blank",
    question: "A child counts a collection correctly: 1, 2, 3, ... 13.",
    template: "There are {{blank}} objects in the collection.",
    placeholder: "number",
    acceptedAnswers: [
      ["13", "thirteen"]
    ],
    explanation: "The last counting number is 13, so there are 13 objects."
  },

  {
    type: "number",
    question: "There are 6 children. Each child needs one cup. How many cups are needed?",
    correct: 6,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "One cup for each of 6 children means 6 cups are needed."
  },

  {
    type: "number",
    question: "There are 10 students. Each student needs one pencil. How many pencils are needed?",
    correct: 10,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "One pencil for each of 10 students means 10 pencils."
  },

  {
    type: "single",
    question: "Which collection has more objects?",
    answers: [
      "A collection of 18 objects",
      "A collection of 15 objects",
      "They are the same"
    ],
    correct: 0,
    explanation: "18 is greater than 15."
  },

  {
    type: "true-false",
    question: "Two collections containing 12 objects each have the same quantity, even if they are arranged differently.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Arrangement does not change quantity."
  },

  {
    type: "number",
    question: "You have 17 counters. How many more counters are needed to make a collection of 20?",
    correct: 3,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "17 and 3 more make 20."
  },

  {
    type: "fill-blank",
    question: "Compare the two quantities: 13 and 15.",
    template: "{{blank}} is the larger number.",
    placeholder: "number",
    acceptedAnswers: [
      ["15", "fifteen"]
    ],
    explanation: "15 is greater than 13."
  },

  {
    type: "single",
    question: "Which comparison is correct?",
    answers: [
      "16 has fewer objects than 14.",
      "16 has more objects than 14.",
      "16 and 14 are the same."
    ],
    correct: 1,
    explanation: "16 is greater than 14."
  },

  {
    type: "multiple",
    question: "Select every collection with FEWER than 10 objects.",
    instruction: "More than one answer is correct.",
    answers: [
      "8 objects",
      "12 objects",
      "6 objects",
      "10 objects"
    ],
    correct: [0, 2],
    explanation: "8 and 6 are both fewer than 10."
  },

  {
    type: "order",
    question: "Order these quantities from smallest to largest.",
    items: ["13", "7", "10", "4"],
    correct: ["4", "7", "10", "13"],
    explanation: "The correct order is 4, 7, 10, 13."
  },

  {
    type: "drag-drop",
    question: "Arrange the quantities from MOST to FEWEST.",
    instruction: "Drag the cards into order.",
    items: [
      "12 objects",
      "20 objects",
      "9 objects",
      "15 objects"
    ],
    correct: [
      "20 objects",
      "15 objects",
      "12 objects",
      "9 objects"
    ],
    explanation: "From most to fewest: 20, 15, 12, 9."
  },


  /* =======================================================
     LEVEL 4 — MISCONCEPTIONS AND REASONING
     QUESTIONS 61–80
     ======================================================= */

  {
    type: "true-false",
    question: "A collection of 3 elephants must contain more objects than a collection of 5 ants because elephants are bigger.",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. Object size does not determine quantity. Five objects is more than three."
  },

  {
    type: "single",
    question: "Which group has more dots?",
    visual: "Group A: ⚫    ⚫    ⚫    ⚫\n\nGroup B: ⚫⚫⚫⚫",
    answers: [
      "Group A",
      "Group B",
      "They have the same number"
    ],
    correct: 2,
    explanation: "Both groups contain 4 dots. Spacing does not change quantity."
  },

  {
    type: "true-false",
    question: "Changing objects from a line into a circle changes how many objects there are.",
    answers: ["True", "False"],
    correct: 1,
    explanation: "False. Rearranging objects does not change the quantity."
  },

  {
    type: "number",
    question: "These objects were moved into a new arrangement. How many objects are there now?",
    visual: "🔵   🔵\n   🔵\n🔵   🔵\n   🔵",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "There are still 6 objects."
  },

  {
    type: "number",
    question: "Count all the counters regardless of colour.",
    visual: "🔴 🔴 🔴 🔴 🔴   🔵 🔵 🔵 🔵",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "5 red counters and 4 blue counters make 9 counters altogether."
  },

  {
    type: "single",
    question: "Which group contains more objects?",
    visual: "Group A: ⭐ 🔴 ⭐ 🔴 ⭐ 🔴 ⭐\n\nGroup B: 🟦 🟦 🟦 🟦 🟦",
    answers: ["Group A", "Group B", "Same"],
    correct: 0,
    explanation: "Group A has 7 objects and Group B has 5."
  },

  {
    type: "true-false",
    question: "These groups have the same number of objects.",
    visual: "🟥 🟥 🟥\n\n▫️ ▫️ ▫️",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Both groups have 3 objects even though the objects are different sizes."
  },

  {
    type: "number",
    question: "Count the whole collection.",
    visual: "🟢 🟢 🟢 🟢 🟢\n🟢 🟢 🟢 🟢 🟢\n🟢 🟢 🟢 🟢 🟢\n🟢 🟢 🟢 🟢 🟢",
    placeholder: "Type the number",
    correct: 20,
    tolerance: 0,
    explanation: "There are 20 objects."
  },

  {
    type: "number",
    question: "How many objects are in this mixed collection?",
    visual: "🔴 ⭐ 🟦 🍎 🔺 🔴 ⭐ 🟦 🍎 🔺",
    placeholder: "Type the number",
    correct: 10,
    tolerance: 0,
    explanation: "There are 10 objects altogether."
  },

  {
    type: "single",
    question: "A child counts 13 objects. Which statement is correct?",
    answers: [
      "There must be 12 objects.",
      "There must be 13 objects.",
      "There must be 14 objects."
    ],
    correct: 1,
    explanation: "If the collection was counted correctly and the last number was 13, there are 13 objects."
  },

  {
    type: "true-false",
    question: "If the last number said when correctly counting a collection is 14, there are 14 objects.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. The final count tells the total quantity."
  },

  {
    type: "text",
    question: "Collection A has 11 objects. Collection B also has 11 objects. Type MORE, FEWER or SAME.",
    placeholder: "more, fewer or same",
    acceptedAnswers: [
      "same",
      "equal",
      "the same"
    ],
    explanation: "Both collections contain 11 objects, so they are the same."
  },

  {
    type: "multiple",
    question: "Group A has 12 objects. Group B has 9 objects. Select every TRUE statement.",
    instruction: "More than one answer is correct.",
    answers: [
      "Group A has more objects.",
      "Group B has fewer objects.",
      "The groups are equal.",
      "12 is greater than 9."
    ],
    correct: [0, 1, 3],
    explanation: "12 is greater than 9, so A has more and B has fewer."
  },

  {
    type: "single",
    question: "A student counts one object twice. What is most likely to happen?",
    answers: [
      "The answer may be too high.",
      "The answer may be too low.",
      "The answer must stay correct."
    ],
    correct: 0,
    explanation: "Counting an object twice can make the total too high."
  },

  {
    type: "number",
    question: "A collection of 10 objects is rearranged. How many objects are in the collection after rearranging?",
    correct: 10,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "Rearranging the objects does not change the quantity."
  },

  {
    type: "single",
    question: "Which group has more dots?",
    visual: "A: ⚫       ⚫       ⚫       ⚫       ⚫\n\nB: ⚫⚫⚫⚫",
    answers: ["A", "B", "Same"],
    correct: 0,
    explanation: "Group A has 5 dots while Group B has 4. Spacing is a distraction."
  },

  {
    type: "fill-blank",
    question: "Group A has 19 objects. Group B has 20 objects.",
    template: "Group {{blank}} has fewer objects.",
    placeholder: "A or B",
    acceptedAnswers: [
      ["A", "a", "group a"]
    ],
    explanation: "19 is one fewer than 20."
  },

  {
    type: "single",
    question: "Collection A contains 13 objects and Collection B contains 13 objects. Which statement is correct?",
    answers: [
      "A has more.",
      "B has more.",
      "They contain the same number."
    ],
    correct: 2,
    explanation: "Both collections contain 13 objects."
  },

  {
    type: "multiple",
    question: "Select every collection containing exactly 15 objects.",
    instruction: "More than one answer may be correct.",
    answers: [
      "15 stars",
      "14 dots",
      "15 counters",
      "16 blocks"
    ],
    correct: [0, 2],
    explanation: "The star collection and counter collection each contain 15 objects."
  },

  {
    type: "order",
    question: "Put these quantities in order from smallest to largest.",
    items: ["20", "8", "14", "11"],
    correct: ["8", "11", "14", "20"],
    explanation: "The correct order is 8, 11, 14, 20."
  },


  /* =======================================================
     LEVEL 5 — CHALLENGE AND REAL-LIFE REASONING
     QUESTIONS 81–100
     ======================================================= */

  {
    type: "single",
    question: "A class has 12 red counters and 15 blue counters. Which colour has more counters?",
    answers: [
      "Red",
      "Blue",
      "They have the same number"
    ],
    correct: 1,
    explanation: "15 is greater than 12, so there are more blue counters."
  },

  {
    type: "number",
    question: "Count the whole mixed collection.",
    visual: "🍎 ⭐ 🟦 🔴 🍌\n⭐ 🟦 🔴 🍎 🍌\n🟦 🔴 🍎 ⭐ 🍌\n⭐ 🟦",
    placeholder: "Type the number",
    correct: 17,
    tolerance: 0,
    explanation: "There are 17 objects altogether."
  },

  {
    type: "single",
    question: "Which collection is larger?",
    answers: [
      "19 objects",
      "18 objects",
      "They are equal"
    ],
    correct: 0,
    explanation: "19 is greater than 18."
  },

  {
    type: "fill-blank",
    question: "There are 16 teddy bears and 16 boxes.",
    template: "The two collections have the {{blank}} number.",
    placeholder: "word",
    acceptedAnswers: [
      ["same", "equal"]
    ],
    explanation: "Both collections contain 16 objects."
  },

  {
    type: "true-false",
    question: "When counting carefully, each object should be counted exactly once.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Counting each object once helps us find the correct quantity."
  },

  {
    type: "single",
    question: "A child accidentally counts one block twice. What could happen to the answer?",
    answers: [
      "The count could be too high.",
      "The count could be too low.",
      "The number of blocks changes."
    ],
    correct: 0,
    explanation: "Counting an object twice can make the reported total too high."
  },

  {
    type: "single",
    question: "A child forgets to count one object. What could happen to the answer?",
    answers: [
      "The answer could be too high.",
      "The answer could be too low.",
      "The objects become larger."
    ],
    correct: 1,
    explanation: "Missing an object can make the reported total too low."
  },

  {
    type: "multiple",
    question: "Which strategies can help you count a collection accurately?",
    instruction: "Select every good strategy.",
    answers: [
      "Touch or point to each object once.",
      "Move counted objects to one side.",
      "Count the same object several times.",
      "Keep track of which objects have already been counted."
    ],
    correct: [0, 1, 3],
    explanation: "Pointing, moving counted objects and keeping track can help prevent skipping or double-counting."
  },

  {
    type: "drag-drop",
    question: "Arrange these quantities from smallest to largest.",
    instruction: "Drag the cards into order.",
    items: [
      "20 objects",
      "10 objects",
      "5 objects",
      "15 objects"
    ],
    correct: [
      "5 objects",
      "10 objects",
      "15 objects",
      "20 objects"
    ],
    explanation: "The correct order is 5, 10, 15, 20."
  },

  {
    type: "number",
    question: "There are 20 counters. They are spread across the table instead of kept together. How many counters are there now?",
    correct: 20,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "There are still 20 counters. Moving them does not change the quantity."
  },

  {
    type: "number",
    question: "One basket has 14 apples and another has 9 apples. How many MORE apples are in the first basket?",
    correct: 5,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "14 is 5 more than 9."
  },

  {
    type: "number",
    question: "Collection A has 20 objects and Collection B has 13 objects. How many more objects does Collection A have?",
    correct: 7,
    tolerance: 0,
    placeholder: "Type the number",
    explanation: "20 is 7 more than 13."
  },

  {
    type: "fill-blank",
    question: "Collection A has 18 counters. Collection B also has 18 counters.",
    template: "The collections have the {{blank}} quantity.",
    placeholder: "word",
    acceptedAnswers: [
      ["same", "equal"]
    ],
    explanation: "Both collections contain 18 counters."
  },

  {
    type: "single",
    question: "There are 16 blocks in Group A and 20 blocks in Group B. Which group has fewer?",
    answers: [
      "Group A",
      "Group B",
      "They are equal"
    ],
    correct: 0,
    explanation: "16 is fewer than 20."
  },

  {
    type: "multiple",
    question: "Select every collection with MORE than 12 objects.",
    instruction: "More than one answer is correct.",
    answers: [
      "13 objects",
      "12 objects",
      "15 objects",
      "9 objects"
    ],
    correct: [0, 2],
    explanation: "13 and 15 are both greater than 12."
  },

  {
    type: "single",
    question: "Which collection contains exactly 20 objects?",
    answers: [
      "Two groups of 10 objects",
      "One group of 18 objects",
      "One group of 19 objects"
    ],
    correct: 0,
    explanation: "10 and 10 together make a collection of 20 objects."
  },

  {
    type: "number",
    question: "Count all the objects.",
    visual: "⭐ 🔴 🟦 🍎 🔺\n🍌 🟢 🌸 ⚫ 🟣\n⭐ 🔴 🟦 🍎 🔺\n🍌 🟢 🌸 ⚫ 🟣",
    placeholder: "Type the number",
    correct: 20,
    tolerance: 0,
    explanation: "There are 20 objects altogether."
  },

  {
    type: "true-false",
    question: "A collection of 6 squares and a collection of 6 circles contain the same number of objects.",
    answers: ["True", "False"],
    correct: 0,
    explanation: "True. Both collections contain 6 objects."
  },

  {
    type: "order",
    question: "Arrange these quantities from smallest to largest.",
    items: [
      "18",
      "20",
      "17",
      "19"
    ],
    correct: [
      "17",
      "18",
      "19",
      "20"
    ],
    explanation: "The correct order is 17, 18, 19, 20."
  },

  {
    type: "single",
    question: "Three collections contain 14, 17 and 16 objects. Which collection has the MOST objects?",
    answers: [
      "14 objects",
      "17 objects",
      "16 objects"
    ],
    correct: 1,
    explanation: "17 is greater than both 14 and 16."
  }

];


/* =========================================================
   QUIZ CONFIGURATION

   There are 100 questions in the bank.

   Every attempt:
   1. shuffles the 100 questions
   2. selects 5 questions
   3. gives the student a new random quiz
   ========================================================= */

window.quizConfig = {

  shuffleQuestions: true,

  shuffleAnswers: false,

  maxQuestions: 5,

  caseSensitiveText: false,

  storageKey:
    "AC9MFN03CountingComparingBestScore"

};
