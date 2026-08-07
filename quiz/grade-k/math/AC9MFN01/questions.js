"use strict";

/* =========================================================
   AC9MFN01 — NUMBERS TO 20
   FOUNDATION MATHEMATICS

   Clean working question bank
   30 questions
   5 random questions per attempt
   ========================================================= */

window.quizQuestions = [

  /* =======================================================
     NUMBER RECOGNITION
     ======================================================= */

  {
    type: "single",
    question: "Which numeral is three?",
    answers: [
      "2",
      "3",
      "4"
    ],
    correct: 1,
    explanation: "The numeral for three is 3."
  },

  {
    type: "single",
    question: "Which numeral is five?",
    answers: [
      "4",
      "5",
      "6"
    ],
    correct: 1,
    explanation: "The numeral for five is 5."
  },

  {
    type: "single",
    question: "Which numeral is eight?",
    answers: [
      "6",
      "8",
      "9"
    ],
    correct: 1,
    explanation: "The numeral for eight is 8."
  },

  {
    type: "single",
    question: "Which numeral is twelve?",
    answers: [
      "10",
      "12",
      "14"
    ],
    correct: 1,
    explanation: "The numeral for twelve is 12."
  },

  {
    type: "single",
    question: "Which numeral is seventeen?",
    answers: [
      "16",
      "17",
      "18"
    ],
    correct: 1,
    explanation: "The numeral for seventeen is 17."
  },


  /* =======================================================
     ZERO
     ======================================================= */

  {
    type: "single",
    question: "Which numeral means zero objects?",
    answers: [
      "0",
      "1",
      "2"
    ],
    correct: 0,
    explanation: "0 represents no objects."
  },

  {
    type: "true-false",
    question: "Zero can be written as 0.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. The numeral for zero is 0."
  },

  {
    type: "number",
    question: "There are no stars in the box. How many stars are there?",
    placeholder: "Type the number",
    correct: 0,
    tolerance: 0,
    explanation: "There are 0 stars."
  },


  /* =======================================================
     REPRESENTING NUMBERS
     ======================================================= */

  {
    type: "number",
    question: "How many circles are shown?",
    visual: "🔵 🔵 🔵",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "There are 3 circles."
  },

  {
    type: "number",
    question: "How many stars are shown?",
    visual: "⭐ ⭐ ⭐ ⭐ ⭐",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "There are 5 stars."
  },

  {
    type: "number",
    question: "How many apples are shown?",
    visual: "🍎 🍎 🍎 🍎 🍎 🍎 🍎",
    placeholder: "Type the number",
    correct: 7,
    tolerance: 0,
    explanation: "There are 7 apples."
  },

  {
    type: "single",
    question: "Which group represents 4?",
    answers: [
      "⭐ ⭐ ⭐",
      "⭐ ⭐ ⭐ ⭐",
      "⭐ ⭐ ⭐ ⭐ ⭐"
    ],
    correct: 1,
    explanation: "Four stars represent the number 4."
  },

  {
    type: "single",
    question: "Which group represents 6?",
    answers: [
      "● ● ● ● ●",
      "● ● ● ● ● ●",
      "● ● ● ● ● ● ●"
    ],
    correct: 1,
    explanation: "Six dots represent the number 6."
  },


  /* =======================================================
     BEFORE AND AFTER
     ======================================================= */

  {
    type: "number",
    question: "What number comes after 4?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "5 comes after 4."
  },

  {
    type: "number",
    question: "What number comes after 9?",
    placeholder: "Type the number",
    correct: 10,
    tolerance: 0,
    explanation: "10 comes after 9."
  },

  {
    type: "number",
    question: "What number comes after 19?",
    placeholder: "Type the number",
    correct: 20,
    tolerance: 0,
    explanation: "20 comes after 19."
  },

  {
    type: "number",
    question: "What number comes before 6?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "5 comes before 6."
  },

  {
    type: "number",
    question: "What number comes before 10?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "9 comes before 10."
  },

  {
    type: "number",
    question: "What number comes before 20?",
    placeholder: "Type the number",
    correct: 19,
    tolerance: 0,
    explanation: "19 comes before 20."
  },


  /* =======================================================
     MISSING NUMBERS
     ======================================================= */

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "2, 3, {{blank}}, 5",
    placeholder: "?",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "4 comes between 3 and 5."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "6, 7, {{blank}}, 9",
    placeholder: "?",
    acceptedAnswers: [
      ["8", "eight"]
    ],
    explanation: "8 comes between 7 and 9."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "11, 12, {{blank}}, 14",
    placeholder: "?",
    acceptedAnswers: [
      ["13", "thirteen"]
    ],
    explanation: "13 comes between 12 and 14."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "17, {{blank}}, 19, 20",
    placeholder: "?",
    acceptedAnswers: [
      ["18", "eighteen"]
    ],
    explanation: "18 comes between 17 and 19."
  },


  /* =======================================================
     NUMBER NAMES
     ======================================================= */

  {
    type: "text",
    question: "Write the number name for 4.",
    placeholder: "Type the number name",
    acceptedAnswers: [
      "four",
      "4"
    ],
    explanation: "4 is called four."
  },

  {
    type: "text",
    question: "Write the number name for 10.",
    placeholder: "Type the number name",
    acceptedAnswers: [
      "ten",
      "10"
    ],
    explanation: "10 is called ten."
  },

  {
    type: "text",
    question: "Write the number name for 15.",
    placeholder: "Type the number name",
    acceptedAnswers: [
      "fifteen",
      "15"
    ],
    explanation: "15 is called fifteen."
  },


  /* =======================================================
     ORDERING NUMBERS
     ======================================================= */

  {
    type: "order",
    question: "Put these numbers in order from smallest to largest.",
    items: [
      "3",
      "1",
      "2"
    ],
    correct: [
      "1",
      "2",
      "3"
    ],
    explanation: "The correct order is 1, 2, 3."
  },

  {
    type: "order",
    question: "Put these numbers in order from smallest to largest.",
    items: [
      "8",
      "6",
      "7"
    ],
    correct: [
      "6",
      "7",
      "8"
    ],
    explanation: "The correct order is 6, 7, 8."
  },

  {
    type: "order",
    question: "Put these numbers in order from smallest to largest.",
    items: [
      "14",
      "12",
      "13"
    ],
    correct: [
      "12",
      "13",
      "14"
    ],
    explanation: "The correct order is 12, 13, 14."
  },

  {
    type: "order",
    question: "Put these numbers in order from smallest to largest.",
    items: [
      "20",
      "18",
      "19"
    ],
    correct: [
      "18",
      "19",
      "20"
    ],
    explanation: "The correct order is 18, 19, 20."
  }

];


/* =========================================================
   QUIZ SETTINGS
   ========================================================= */

window.quizConfig = {

  shuffleQuestions: true,

  shuffleAnswers: false,

  maxQuestions: 5,

  caseSensitiveText: false,

  storageKey:
    "AC9MFN01NumbersBestScore"

};
