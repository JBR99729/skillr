"use strict";

/* =========================================================
   AC9MFSP01 — Shapes and Shape Sorting
   Foundation Mathematics AC9MFSP01
   Question bank: 100 questions
   Questions shown per attempt: 5
   ========================================================= */

window.quizQuestions = [
  {
    type: "single",
    question: "Shapes and Shape Sorting question 1: Which answer fits shapes?",
    answers: [
      "Shapes 2",
      "Shapes 3",
      "Shapes 4",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 4."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 2: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 3: Complete the statement: Shapes needs 4 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[4]],
    explanation: "The answer is 4."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 4: shapes problem 4. What is 9?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "The correct answer is 9."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 5: Which answer fits shapes?",
    answers: [
      "Shapes 6",
      "Shapes 7",
      "Shapes 8",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 6."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 6: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 7: Complete the statement: Shapes needs 8 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[8]],
    explanation: "The answer is 8."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 8: shapes problem 8. What is 17?",
    placeholder: "Type the number",
    correct: 17,
    tolerance: 0,
    explanation: "The correct answer is 17."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 9: Which answer fits shapes?",
    answers: [
      "Shapes 10",
      "Shapes 11",
      "Shapes 12",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 11."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 10: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 11: Complete the statement: Shapes needs 2 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[2]],
    explanation: "The answer is 2."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 12: shapes problem 12. What is 5?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "The correct answer is 5."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 13: Which answer fits shapes?",
    answers: [
      "Shapes 14",
      "Shapes 15",
      "Shapes 16",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 16."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 14: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 15: Complete the statement: Shapes needs 6 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[6]],
    explanation: "The answer is 6."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 16: shapes problem 16. What is 13?",
    placeholder: "Type the number",
    correct: 13,
    tolerance: 0,
    explanation: "The correct answer is 13."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 17: Which answer fits shapes?",
    answers: [
      "Shapes 18",
      "Shapes 19",
      "Shapes 20",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 18."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 18: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 19: Complete the statement: Shapes needs 10 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[10]],
    explanation: "The answer is 10."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 20: shapes problem 20. What is 1?",
    placeholder: "Type the number",
    correct: 1,
    tolerance: 0,
    explanation: "The correct answer is 1."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 21: Which answer fits shapes?",
    answers: [
      "Shapes 22",
      "Shapes 23",
      "Shapes 24",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 23."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 22: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 23: Complete the statement: Shapes needs 4 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[4]],
    explanation: "The answer is 4."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 24: shapes problem 24. What is 9?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "The correct answer is 9."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 25: Which answer fits shapes?",
    answers: [
      "Shapes 26",
      "Shapes 27",
      "Shapes 28",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 28."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 26: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 27: Complete the statement: Shapes needs 8 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[8]],
    explanation: "The answer is 8."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 28: shapes problem 28. What is 17?",
    placeholder: "Type the number",
    correct: 17,
    tolerance: 0,
    explanation: "The correct answer is 17."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 29: Which answer fits shapes?",
    answers: [
      "Shapes 30",
      "Shapes 31",
      "Shapes 32",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 30."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 30: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 31: Complete the statement: Shapes needs 2 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[2]],
    explanation: "The answer is 2."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 32: shapes problem 32. What is 5?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "The correct answer is 5."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 33: Which answer fits shapes?",
    answers: [
      "Shapes 34",
      "Shapes 35",
      "Shapes 36",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 35."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 34: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 35: Complete the statement: Shapes needs 6 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[6]],
    explanation: "The answer is 6."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 36: shapes problem 36. What is 13?",
    placeholder: "Type the number",
    correct: 13,
    tolerance: 0,
    explanation: "The correct answer is 13."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 37: Which answer fits shapes?",
    answers: [
      "Shapes 38",
      "Shapes 39",
      "Shapes 40",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 40."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 38: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 39: Complete the statement: Shapes needs 10 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[10]],
    explanation: "The answer is 10."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 40: shapes problem 40. What is 1?",
    placeholder: "Type the number",
    correct: 1,
    tolerance: 0,
    explanation: "The correct answer is 1."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 41: Which answer fits shapes?",
    answers: [
      "Shapes 42",
      "Shapes 43",
      "Shapes 44",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 42."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 42: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 43: Complete the statement: Shapes needs 4 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[4]],
    explanation: "The answer is 4."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 44: shapes problem 44. What is 9?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "The correct answer is 9."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 45: Which answer fits shapes?",
    answers: [
      "Shapes 46",
      "Shapes 47",
      "Shapes 48",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 47."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 46: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 47: Complete the statement: Shapes needs 8 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[8]],
    explanation: "The answer is 8."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 48: shapes problem 48. What is 17?",
    placeholder: "Type the number",
    correct: 17,
    tolerance: 0,
    explanation: "The correct answer is 17."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 49: Which answer fits shapes?",
    answers: [
      "Shapes 50",
      "Shapes 51",
      "Shapes 52",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 52."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 50: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 51: Complete the statement: Shapes needs 2 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[2]],
    explanation: "The answer is 2."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 52: shapes problem 52. What is 5?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "The correct answer is 5."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 53: Which answer fits shapes?",
    answers: [
      "Shapes 54",
      "Shapes 55",
      "Shapes 56",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 54."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 54: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 55: Complete the statement: Shapes needs 6 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[6]],
    explanation: "The answer is 6."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 56: shapes problem 56. What is 13?",
    placeholder: "Type the number",
    correct: 13,
    tolerance: 0,
    explanation: "The correct answer is 13."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 57: Which answer fits shapes?",
    answers: [
      "Shapes 58",
      "Shapes 59",
      "Shapes 60",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 59."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 58: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 59: Complete the statement: Shapes needs 10 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[10]],
    explanation: "The answer is 10."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 60: shapes problem 60. What is 1?",
    placeholder: "Type the number",
    correct: 1,
    tolerance: 0,
    explanation: "The correct answer is 1."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 61: Which answer fits shapes?",
    answers: [
      "Shapes 62",
      "Shapes 63",
      "Shapes 64",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 64."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 62: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 63: Complete the statement: Shapes needs 4 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[4]],
    explanation: "The answer is 4."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 64: shapes problem 64. What is 9?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "The correct answer is 9."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 65: Which answer fits shapes?",
    answers: [
      "Shapes 66",
      "Shapes 67",
      "Shapes 68",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 66."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 66: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 67: Complete the statement: Shapes needs 8 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[8]],
    explanation: "The answer is 8."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 68: shapes problem 68. What is 17?",
    placeholder: "Type the number",
    correct: 17,
    tolerance: 0,
    explanation: "The correct answer is 17."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 69: Which answer fits shapes?",
    answers: [
      "Shapes 70",
      "Shapes 71",
      "Shapes 72",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 71."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 70: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 71: Complete the statement: Shapes needs 2 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[2]],
    explanation: "The answer is 2."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 72: shapes problem 72. What is 5?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "The correct answer is 5."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 73: Which answer fits shapes?",
    answers: [
      "Shapes 74",
      "Shapes 75",
      "Shapes 76",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 76."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 74: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 75: Complete the statement: Shapes needs 6 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[6]],
    explanation: "The answer is 6."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 76: shapes problem 76. What is 13?",
    placeholder: "Type the number",
    correct: 13,
    tolerance: 0,
    explanation: "The correct answer is 13."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 77: Which answer fits shapes?",
    answers: [
      "Shapes 78",
      "Shapes 79",
      "Shapes 80",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 78."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 78: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 79: Complete the statement: Shapes needs 10 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[10]],
    explanation: "The answer is 10."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 80: shapes problem 80. What is 1?",
    placeholder: "Type the number",
    correct: 1,
    tolerance: 0,
    explanation: "The correct answer is 1."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 81: Which answer fits shapes?",
    answers: [
      "Shapes 82",
      "Shapes 83",
      "Shapes 84",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 83."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 82: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 83: Complete the statement: Shapes needs 4 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[4]],
    explanation: "The answer is 4."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 84: shapes problem 84. What is 9?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "The correct answer is 9."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 85: Which answer fits shapes?",
    answers: [
      "Shapes 86",
      "Shapes 87",
      "Shapes 88",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 88."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 86: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 87: Complete the statement: Shapes needs 8 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[8]],
    explanation: "The answer is 8."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 88: shapes problem 88. What is 17?",
    placeholder: "Type the number",
    correct: 17,
    tolerance: 0,
    explanation: "The correct answer is 17."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 89: Which answer fits shapes?",
    answers: [
      "Shapes 90",
      "Shapes 91",
      "Shapes 92",
    ],
    correct: 0,
    explanation: "The correct answer is Shapes 90."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 90: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 91: Complete the statement: Shapes needs 2 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[2]],
    explanation: "The answer is 2."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 92: shapes problem 92. What is 5?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "The correct answer is 5."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 93: Which answer fits shapes?",
    answers: [
      "Shapes 94",
      "Shapes 95",
      "Shapes 96",
    ],
    correct: 1,
    explanation: "The correct answer is Shapes 95."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 94: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 95: Complete the statement: Shapes needs 6 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[6]],
    explanation: "The answer is 6."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 96: shapes problem 96. What is 13?",
    placeholder: "Type the number",
    correct: 13,
    tolerance: 0,
    explanation: "The correct answer is 13."
  },
  {
    type: "single",
    question: "Shapes and Shape Sorting question 97: Which answer fits shapes?",
    answers: [
      "Shapes 98",
      "Shapes 99",
      "Shapes 100",
    ],
    correct: 2,
    explanation: "The correct answer is Shapes 100."
  },
  {
    type: "true-false",
    question: "Shapes and Shape Sorting question 98: Shapes can be checked by counting carefully.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "Use the clue to decide if the statement is true or false."
  },
  {
    type: "fill-blank",
    question: "Shapes and Shape Sorting question 99: Complete the statement: Shapes needs 10 objects.",
    template: "shapes has {{blank}} objects.",
    placeholder: "?",
    acceptedAnswers: [[10]],
    explanation: "The answer is 10."
  },
  {
    type: "number",
    question: "Shapes and Shape Sorting question 100: shapes problem 100. What is 1?",
    placeholder: "Type the number",
    correct: 1,
    tolerance: 0,
    explanation: "The correct answer is 1."
  },
];
