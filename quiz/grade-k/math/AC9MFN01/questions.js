"use strict";

const quizQuestions = [
  {
    question: "How many stars are shown? ★ ★ ★",
    answers: ["1", "2", "3", "4"],
    correct: 2,
    explanation: "There are 3 stars."
  },

  {
    question: "Which numeral represents five?",
    answers: ["2", "3", "4", "5"],
    correct: 3,
    explanation: "The numeral 5 represents five."
  },

  {
    question: "What number comes after 4?",
    answers: ["3", "5", "6", "7"],
    correct: 1,
    explanation: "The number immediately after 4 is 5."
  },

  {
    question: "What number comes before 3?",
    answers: ["1", "2", "4", "5"],
    correct: 1,
    explanation: "The number immediately before 3 is 2."
  },

  {
    question: "Which group contains 2 circles?",
    answers: [
      "●",
      "● ●",
      "● ● ●",
      "● ● ● ●"
    ],
    correct: 1,
    explanation: "The second group contains 2 circles."
  },

  {
    question: "Which number is the largest?",
    answers: ["1", "5", "2", "4"],
    correct: 1,
    explanation: "5 is larger than 1, 2 and 4."
  },

  {
    question: "Which number is the smallest?",
    answers: ["4", "2", "5", "1"],
    correct: 3,
    explanation: "1 is the smallest number."
  },

  {
    question: "Complete the counting pattern: 1, 2, 3, ___, 5.",
    answers: ["2", "3", "4", "6"],
    correct: 2,
    explanation: "The missing number between 3 and 5 is 4."
  },

  {
    question: "How many objects are shown? ▲ ▲ ▲ ▲",
    answers: ["2", "3", "4", "5"],
    correct: 2,
    explanation: "There are 4 triangles."
  },

  {
    question: "Which list is in order from smallest to largest?",
    answers: [
      "3, 2, 1",
      "1, 2, 3",
      "2, 1, 3",
      "3, 1, 2"
    ],
    correct: 1,
    explanation: "The correct ascending order is 1, 2, 3."
  }
];

const quizConfig = {
  shuffleQuestions: true,
  shuffleAnswers: false,
  storageKey: "AC9MFN01BestScore"
};
