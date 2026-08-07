"use strict";

window.quizQuestions = [
  /* =====================================================
     EASY — INSTANT SUBITISING 1 TO 3
     ===================================================== */

  {
    type: "number",

    question:
      "Look quickly. How many dots did you see?",

    visual:
      "⚫ ⚫",

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
      "Which number is shown on this die face?",

    visual:
      "⚂",

    answers: [
      "2",
      "3",
      "4"
    ],

    correct: 1,

    explanation:
      "The die face shows 3 dots."
  },

  {
    type: "text",

    question:
      "Name the number of apples immediately.",

    visual:
      "🍎",

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

    visual:
      "⭐ ⭐ ⭐",

    template:
      "I can see {{blank}} stars.",

    placeholder:
      "number",

    acceptedAnswers: [
      ["3", "three"]
    ],

    explanation:
      "There are 3 stars."
  },

  {
    type: "number",

    question:
      "Your teacher holds up 2 fingers. How many fingers are showing?",

    visual:
      "✌️",

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
      "In a Snap game, you turn over this card. Which card makes a matching snap?",

    visual:
      "⚫",

    answers: [
      "A card with 1 dot",
      "A card with 2 dots",
      "A card with 3 dots"
    ],

    correct: 0,

    explanation:
      "The shown card has 1 dot, so it matches another card with 1 dot."
  },


  /* =====================================================
     MEDIUM — SUBITISING 4 TO 6
     ===================================================== */

  {
    type: "number",

    question:
      "Without counting one-by-one, how many dots are arranged in this square?",

    visual:
      "⚫ ⚫\n⚫ ⚫",

    placeholder:
      "Type the number",

    correct: 4,

    tolerance: 0,

    explanation:
      "There are 2 dots on the top and 2 on the bottom. Two and two make 4."
  },

  {
    type: "fill-blank",

    question:
      "Look at the ten-frame pattern.",

    visual:
      "● ● ● ● ●\n○ ○ ○ ○ ○",

    template:
      "There are {{blank}} filled counters in the top row.",

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
      "Name the number shown by the diamond pattern.",

    visual:
      "♦️ ♦️\n  ♦️\n♦️ ♦️",

    placeholder:
      "Type the number",

    acceptedAnswers: [
      "5",
      "five"
    ],

    explanation:
      "The pattern contains 5 diamonds."
  },

  {
    type: "number",

    question:
      "How many red counters are in this arrangement?",

    visual:
      "  🔴\n🔴 🔴\n  🔴",

    placeholder:
      "Type the number",

    correct: 4,

    tolerance: 0,

    explanation:
      "There is 1 counter at the top, 2 in the middle and 1 at the bottom. Altogether there are 4."
  },

  {
    type: "fill-blank",

    question:
      "Complete the domino total.",

    visual:
      "⚁  |  ⚁",

    template:
      "Two dots and two dots make {{blank}} dots altogether.",

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
      "Look quickly. How many counters are in the row?",

    visual:
      "🔴 🔴 🔴 🔴 🔴",

    placeholder:
      "Type the number",

    correct: 5,

    tolerance: 0,

    explanation:
      "There are 5 red counters."
  },


  /* =====================================================
     DIFFICULT — PART-PART-WHOLE
     ===================================================== */

  {
    type: "fill-blank",

    question:
      "Look at the two groups together.",

    visual:
      "⚫ ⚫ ⚫     ⚫ ⚫",

    template:
      "Three and two make {{blank}}.",

    placeholder:
      "total",

    acceptedAnswers: [
      ["5", "five"]
    ],

    explanation:
      "The first group has 3 dots and the second has 2 dots. Three and two make 5."
  },

  {
    type: "single",

    question:
      "How could you see this group?",

    visual:
      "🟢 🟢\n  🟢\n🟢 🟢",

    answers: [
      "A group of 2 and a group of 3",
      "A group of 4 and 1 in the middle",
      "Both ways work"
    ],

    correct: 2,

    explanation:
      "Both descriptions show different ways to recognise the same collection of 5 counters."
  },

  {
    type: "fill-blank",

    question:
      "You have a card showing 3 dots.",

    visual:
      "⚫ ⚫ ⚫",

    template:
      "You need {{blank}} more dots to make 5 altogether.",

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
      "Look quickly. How many stars did you see?",

    visual:
      "⭐ ⭐ ⭐\n⭐ ⭐ ⭐",

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
      "Select every card that shows exactly 4 objects.",

    instruction:
      "More than one answer is correct.",

    answers: [
      "Card A: 🟨 🟨 🟨 🟨",
      "Card B: ⚃",
      "Card C: 🔺 🔺 🔺"
    ],

    correct: [0, 1],

    explanation:
      "Card A shows 4 squares and Card B is a die face showing 4 dots. Card C shows only 3 triangles."
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
  shuffleQuestions: true,
  shuffleAnswers: false,
  caseSensitiveText: false,
  storageKey: "AC9MFN02SubitisingBestScore"
};
