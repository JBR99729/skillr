"use strict";

window.quizQuestions = [
  /* =====================================================
     1. SINGLE-ANSWER MULTIPLE CHOICE
     ===================================================== */

  {
    type: "single",

    question: "Which number comes after 4?",

    answers: [
      "3",
      "5",
      "6",
      "7"
    ],

    correct: 1,

    explanation:
      "The number immediately after 4 is 5."
  },


  /* =====================================================
     2. TRUE OR FALSE
     ===================================================== */

  {
    type: "true-false",

    question:
      "True or false: 3 is greater than 5.",

    answers: [
      "True",
      "False"
    ],

    correct: 1,

    explanation:
      "3 is less than 5, so the statement is false."
  },


  /* =====================================================
     3. SELECT MORE THAN ONE ANSWER
     ===================================================== */

  {
    type: "multiple",

    question:
      "Select all the groups that contain exactly 3 objects.",

    instruction:
      "More than one answer is correct.",

    answers: [
      "● ● ●",
      "★ ★",
      "▲ ▲ ▲",
      "■ ■ ■ ■"
    ],

    correct: [0, 2],

    explanation:
      "The first and third groups each contain exactly 3 objects."
  },


  /* =====================================================
     4. TYPE A WORD
     ===================================================== */

  {
    type: "text",

    question:
      "Type the number word for 5.",

    placeholder:
      "Type your answer",

    acceptedAnswers: [
      "five",
      "Five"
    ],

    explanation:
      "The number word for 5 is five."
  },


  /* =====================================================
     5. TYPE A NUMBER
     ===================================================== */

  {
    type: "number",

    question:
      "How many stars are shown? ★ ★ ★ ★",

    placeholder:
      "Enter a number",

    correct: 4,

    tolerance: 0,

    explanation:
      "There are 4 stars."
  },


  /* =====================================================
     6. FILL IN ONE BLANK
     ===================================================== */

  {
    type: "fill-blank",

    question:
      "Complete the sentence.",

    template:
      "The number after 4 is {{blank}}.",

    placeholder:
      "answer",

    acceptedAnswers: [
      ["5", "five"]
    ],

    explanation:
      "The number immediately after 4 is 5."
  },


  /* =====================================================
     7. FILL IN TWO BLANKS
     ===================================================== */

  {
    type: "fill-blank",

    question:
      "Complete the number sentence.",

    template:
      "{{blank}} + {{blank}} = 5",

    placeholders: [
      "first number",
      "second number"
    ],

    acceptedAnswers: [
      ["2", "two"],
      ["3", "three"]
    ],

    explanation:
      "2 + 3 = 5."
  },


  /* =====================================================
     8. ORDER USING ARROW BUTTONS
     ===================================================== */

  {
    type: "order",

    question:
      "Put the numbers in order from smallest to largest.",

    instruction:
      "Use the arrow buttons to move the numbers.",

    items: [
      "4",
      "1",
      "3",
      "2"
    ],

    correct: [
      "1",
      "2",
      "3",
      "4"
    ],

    explanation:
      "The correct order is 1, 2, 3, 4."
  },


  /* =====================================================
     9. DRAG-AND-DROP ORDERING
     ===================================================== */

  {
    type: "drag-drop",

    question:
      "Arrange the numbers from largest to smallest.",

    instruction:
      "Drag the items into order. On a touchscreen, use the arrows.",

    items: [
      "2",
      "5",
      "1",
      "4"
    ],

    correct: [
      "5",
      "4",
      "2",
      "1"
    ],

    explanation:
      "From largest to smallest, the order is 5, 4, 2, 1."
  },


  /* =====================================================
     10. ANOTHER TYPED RESPONSE
     ===================================================== */

  {
    type: "text",

    question:
      "What number is missing? 1, 2, ___, 4, 5",

    placeholder:
      "Type the missing number",

    acceptedAnswers: [
      "3",
      "three"
    ],

    explanation:
      "The missing number between 2 and 4 is 3."
  }
];


window.quizConfig = {
  shuffleQuestions: false,
  shuffleAnswers: false,
  caseSensitiveText: false,
  storageKey: "AC9MFN01VarietyBestScore"
};
