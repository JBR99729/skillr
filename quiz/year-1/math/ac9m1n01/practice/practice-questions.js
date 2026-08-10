"use strict";

// AC9M1N01 — Numbers to 120. Twenty editable, curriculum-aligned questions.
window.quizQuestions = [
  { id: "ac9m1n01-01", type: "single", question: "Which number is seventy-two?", answers: ["27", "72", "70", "82"], correct: 1, explanation: "Seventy-two is written as 72: 7 tens and 2 ones." },
  { id: "ac9m1n01-02", type: "single", question: "Which number comes just after 89?", answers: ["88", "90", "99", "80"], correct: 1, explanation: "Counting on one from 89 gives 90." },
  { id: "ac9m1n01-03", type: "single", question: "Which number comes just before 100?", answers: ["90", "98", "99", "101"], correct: 2, explanation: "The number immediately before 100 is 99." },
  { id: "ac9m1n01-04", type: "single", question: "Choose the numbers in order from smallest to largest.", answers: ["61, 16, 66", "16, 61, 66", "66, 61, 16", "16, 66, 61"], correct: 1, explanation: "16 has 1 ten, while 61 and 66 have 6 tens. Between 61 and 66, 61 is smaller." },
  { id: "ac9m1n01-05", type: "number", question: "A number line shows 45, 46, __, 48. What is the missing number?", placeholder: "Type the number", correct: 47, tolerance: 0, explanation: "The numbers increase by one, so 47 belongs between 46 and 48." },
  { id: "ac9m1n01-06", type: "single", question: "Which number is greatest?", answers: ["109", "91", "99", "101"], correct: 0, explanation: "109 is greater than 101, 99 and 91." },
  { id: "ac9m1n01-07", type: "single", question: "Mia has 8 bundles of ten sticks and 4 single sticks. Which number has she made?", answers: ["48", "80", "84", "804"], correct: 2, explanation: "8 tens are 80, and 4 more makes 84." },
  { id: "ac9m1n01-08", type: "number", question: "Start at 63 and count forward 3 numbers. Where do you land?", placeholder: "Type the number", correct: 66, tolerance: 0, explanation: "Count 64, 65, 66. You land on 66." },
  { id: "ac9m1n01-09", type: "single", question: "Which statement is true?", answers: ["58 is greater than 85", "85 is less than 58", "58 is less than 85", "58 and 85 are equal"], correct: 2, explanation: "58 has 5 tens and 85 has 8 tens, so 58 is less than 85." },
  { id: "ac9m1n01-10", type: "single", question: "On a hundreds chart, which number is directly below 34?", answers: ["35", "44", "24", "43"], correct: 1, explanation: "Moving down one row on a hundreds chart adds 10: 34 + 10 = 44." },
  { id: "ac9m1n01-11", type: "single", question: "On a hundreds chart, which number is directly above 76?", answers: ["66", "75", "77", "86"], correct: 0, explanation: "Moving up one row subtracts 10: 76 − 10 = 66." },
  { id: "ac9m1n01-12", type: "number", question: "Complete the count: 96, 97, 98, 99, __.", placeholder: "Type the number", correct: 100, tolerance: 0, explanation: "One more than 99 is 100." },
  { id: "ac9m1n01-13", type: "single", question: "Which card should be placed between 107 and 109?", answers: ["106", "108", "110", "117"], correct: 1, explanation: "108 is one more than 107 and one less than 109." },
  { id: "ac9m1n01-14", type: "single", question: "Which number has 11 tens and 3 ones?", answers: ["113", "131", "110", "103"], correct: 0, explanation: "11 tens are 110; adding 3 ones gives 113." },
  { id: "ac9m1n01-15", type: "single", question: "A number is greater than 39 but less than 41. What is it?", answers: ["38", "39", "40", "41"], correct: 2, explanation: "40 is the only whole number between 39 and 41." },
  { id: "ac9m1n01-16", type: "number", question: "Count back two numbers from 52. Where do you land?", placeholder: "Type the number", correct: 50, tolerance: 0, explanation: "Count back 51, 50. You land on 50." },
  { id: "ac9m1n01-17", type: "single", question: "Which pair shows the same number in words and numerals?", answers: ["sixty-one — 16", "ninety — 19", "one hundred and two — 102", "seventy-five — 57"], correct: 2, explanation: "One hundred and two is written as 102." },
  { id: "ac9m1n01-18", type: "single", question: "Four number cards are 28, 82, 22 and 80. Which card belongs immediately after 81 on a number line?", answers: ["28", "82", "22", "80"], correct: 1, explanation: "82 is one more than 81, so it belongs immediately after 81." },
  { id: "ac9m1n01-19", type: "single", question: "Which list counts forward correctly?", answers: ["117, 118, 119, 120", "117, 118, 120, 121", "120, 119, 118, 117", "117, 116, 115, 114"], correct: 0, explanation: "Counting forward by ones gives 117, 118, 119, 120." },
  { id: "ac9m1n01-20", type: "number", question: "A class places cards 68, 69, __, 71 on a number track. Which card is missing?", placeholder: "Type the number", correct: 70, tolerance: 0, explanation: "70 comes after 69 and before 71." }
];
