"use strict";

window.quizQuestions = [
  /* =====================================================
     EASY: INSTANT SUBITISING 1–3
     ===================================================== */

  {
    type: "number",

    question:
      "Look quickly: ⚫ ⚫\n\nHow many dots did you see?",

    placeholder:
      "Type the number",

    correct: 2,

    tolerance: 0,

    explanation:
      "There are 2 dots. You can recognise the pair without counting each dot."
  },

  {
    type: "single",

    question:
      "Which number is shown on this die face?\n\n⚂",

    answers: [
      "2",
      "3",
      "4"
    ],

    correct: 1,

    explanation:
      "The die face ⚂ shows 3 dots."
  },

  {
    type: "text",

    question:
      "Look at the apple for just a moment: 🍎\n\nName the number of apples immediately.",

    placeholder:
      "Type the number",

    acceptedAnswers: [
      "1",
      "one"
    ],

    explanation:
      "There is 1 apple."
  },

  {
    type: "single",

    question:
      "Which card shows exactly 3 dots?",

    answers: [
      "⚫ ⚫",
      "⚫ ⚫ ⚫",
      "⚫ ⚫ ⚫ ⚫"
    ],

    correct: 1,

    explanation:
      "The second card shows exactly 3 dots."
  },

  {
    type: "fill-blank",

    question:
      "Complete the sentence.",

    template:
      "I can see {{blank}} stars: ⭐️ ⭐️ ⭐️",

    placeholder:
      "number",

    acceptedAnswers: [
      ["3", "three"]
    ],

    explanation:
      "There are 3 stars in the line."
  },

  {
    type: "number",

    question:
      "Your teacher holds up 2 fingers. How many fingers are showing?",

    placeholder:
      "Type the number",

    correct: 2,

    tolerance: 0,

    explanation:
      "Two raised fingers show the number 2."
  },

  {
    type: "single",

    question:
      "In a Snap game, you turn over a card showing ⚫. Which card makes a matching snap?",

    answers: [
      "A card with 1 dot",
      "A card with 2 dots",
      "A card with 3 dots"
    ],

    correct: 0,

    explanation:
      "The first card has 1 dot, so it matches the card showing 1 dot."
  },


  /* =====================================================
     MEDIUM: SUBITISING 4–6
     ===================================================== */

  {
    type: "number",

    question:
      "Look at this square arrangement:\n\n⚫ ⚫\n⚫ ⚫\n\nWithout counting one-by-one, how many dots are there?",

    placeholder:
      "Type the number",

    correct: 4,

    tolerance: 0,

    explanation:
      "The square has 2 dots on the top and 2 on the bottom. Altogether there are 4."
  },

  {
    type: "fill-blank",

    question:
      "Look at the ten-frame.",

    template:
      "Top row: ● ● ● ● ●\nBottom row: ○ ○ ○ ○ ○\n\nThere are {{blank}} filled counters in the top row.",

    placeholder:
      "number",

    acceptedAnswers: [
      ["5", "five"]
    ],

    explanation:
      "The whole top row is filled, so there are 5 filled counters."
  },

  {
    type: "text",

    question:
      "Look quickly at this playing-card pattern:\n\n♦️ ♦️\n   ♦️\n♦️ ♦️\n\nWhat number is shown?",

    placeholder:
      "Type the number",

    acceptedAnswers: [
      "5",
      "five"
    ],

    explanation:
      "The card shows 5 diamonds."
  },

  {
    type: "number",

    question:
      "How many red counters are in this non-standard arrangement?\n\n   🔴\n🔴 🔴\n   🔴",

    placeholder:
      "Type the number",

    correct: 4,

    tolerance: 0,

    explanation:
      "There is 1 counter at the top, 2 in the middle and 1 at the bottom. That makes 4."
  },

  {
    type: "fill-blank",

    question:
      "Complete the domino total.",

    template:
      "The domino has ⚁ on one side and ⚁ on the other side. Altogether, it has {{blank}} dots.",

    placeholder:
      "total",

    acceptedAnswers: [
      ["4", "four"]
    ],

    explanation:
      "Each side shows 2 dots. Two and two make 4."
  },

  {
    type: "drag-drop",

    question:
      "Arrange the cards from fewer squares to more squares.",

    instruction:
      "Drag the cards into order. On a touchscreen, use the arrows.",

    items: [
      "Card A: 🟦 🟦 🟦 🟦",
      "Card B: 🟦 🟦"
    ],

    correct: [
      "Card B: 🟦 🟦",
      "Card A: 🟦 🟦 🟦 🟦"
    ],

    shuffleItems: false,

    explanation:
      "Card B has 2 squares and Card A has 4 squares, so Card B comes first."
  },

  {
    type: "number",

    question:
      "Look quickly: 🔴 🔴 🔴 🔴 🔴\n\nHow many counters are in the row?",

    placeholder:
      "Type the number",

    correct: 5,

    tolerance: 0,

    explanation:
      "There are 5 red counters."
  },


  /* =====================================================
     DIFFICULT: PART-PART-WHOLE
     ===================================================== */

  {
    type: "fill-blank",

    question:
      "Look at the two groups together.",

    template:
      "(⚫ ⚫ ⚫) and (⚫ ⚫)\n\n3 and 2 make {{blank}}.",

    placeholder:
      "total",

    acceptedAnswers: [
      ["5", "five"]
    ],

    explanation:
      "The first group has 3 dots and the second has 2. Three and two make 5."
  },

  {
    type: "single",

    question:
      "Look at this pattern:\n\n🟢 🟢\n   🟢\n🟢 🟢\n\nHow could you see the group?",

    answers: [
      "A group of 2 and a group of 3",
      "A group of 4 and 1 in the middle",
      "Both A and B work"
    ],

    correct: 2,

    explanation:
      "Both ways describe the same collection of 5 counters."
  },

  {
    type: "fill-blank",

    question:
      "You have a card showing ⚫ ⚫ ⚫.",

    template:
      "You need a card showing {{blank}} more dots to make 5 altogether.",

    placeholder:
      "number",

    acceptedAnswers: [
      ["2", "two"]
    ],

    explanation:
      "Three dots and two more dots make 5."
  },

  {
    type: "number",

    question:
      "Look quickly at the stars:\n\n⭐️ ⭐️ ⭐️\n⭐️ ⭐️ ⭐️\n\nHow many stars did you see?",

    placeholder:
      "Type the number",

    correct: 6,

    tolerance: 0,

    explanation:
      "There are 3 stars in each row. Three and three make 6."
  },

  {
    type: "multiple",

    question:
      "Select every card that shows a collection of exactly 4.",

    instruction:
      "More than one answer is correct.",

    answers: [
      "Card A: 🟨 🟨 🟨 🟨",
      "Card B: ⚄? No — use a die showing four dots: ⚃",
      "Card C: 🔺 🔺 🔺"
    ],

    correct: [0, 1],

    explanation:
      "Card A shows 4 squares and Card B shows a die face with 4 dots. Card C shows only 3 triangles."
  },

  {
    type: "single",

    question:
      "You win if you flip a card with more than 3 dots. Which card wins the round?",

    answers: [
      "Card 1: ⚫ ⚫",
      "Card 2: ⚫ ⚫ ⚫ ⚫ ⚫",
      "Card 3: ⚫"
    ],

    correct: 1,

    explanation:
      "Card 2 has 5 dots. Five is more than 3."
  }
];


window.quizConfig = {
  shuffleQuestions: false,
  shuffleAnswers: false,
  caseSensitiveText: false,
  storageKey: "AC9MFN02SubitisingBestScore"
};
