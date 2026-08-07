"use strict";

/* =========================================================
   AC9MFN04 — PART-PART-WHOLE
   FOUNDATION MATHEMATICS

   100-question bank

   Question types:
   - single choice
   - true / false
   - number entry
   - text entry
   - fill in the blank
   - multiple selection
   - ordering
   - drag and drop

   Main skills:
   - recognising parts and wholes
   - partitioning collections to 10
   - combining parts
   - number bonds
   - missing parts
   - different ways to make the same whole
   - commutative relationships
   - reasoning with visual collections

   Difficulty:
   Questions 1–20   Easy
   Questions 21–40  Easy–Medium
   Questions 41–60  Medium
   Questions 61–80  Medium–Hard
   Questions 81–100 Challenge
   ========================================================= */

window.quizQuestions = [

  /* =======================================================
     LEVEL 1 — SEE THE PARTS AND WHOLE
     QUESTIONS 1–20
     ======================================================= */


  /* 1 */
  {
    type: "number",
    question: "There is 1 red counter and 1 blue counter. How many counters altogether?",
    visual: "🔴 🔵",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "1 and 1 make 2."
  },


  /* 2 */
  {
    type: "single",
    question: "Which two parts make 3?",
    answers: [
      "1 and 2",
      "1 and 1",
      "2 and 2"
    ],
    correct: 0,
    explanation: "1 and 2 make a whole of 3."
  },


  /* 3 */
  {
    type: "fill-blank",
    question: "Complete the whole.",
    visual: "🔴 🔴   🔵",
    template: "2 and 1 make {{blank}}.",
    placeholder: "whole",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "2 and 1 make 3."
  },


  /* 4 */
  {
    type: "true-false",
    question: "1 and 2 make a whole of 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 1 and 2 make 3."
  },


  /* 5 */
  {
    type: "number",
    question: "How many stars are there altogether?",
    visual: "⭐ ⭐   ⭐",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "2 stars and 1 star make 3."
  },


  /* 6 */
  {
    type: "single",
    question: "Which two parts make 4?",
    answers: [
      "1 and 2",
      "2 and 2",
      "3 and 2"
    ],
    correct: 1,
    explanation: "2 and 2 make 4."
  },


  /* 7 */
  {
    type: "number",
    question: "How many apples are there altogether?",
    visual: "🍎 🍎 🍎   🍎",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "3 apples and 1 apple make 4."
  },


  /* 8 */
  {
    type: "fill-blank",
    question: "Complete the number bond.",
    template: "3 and 1 make {{blank}}.",
    placeholder: "whole",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "3 and 1 make 4."
  },


  /* 9 */
  {
    type: "true-false",
    question: "2 and 2 make 5.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. 2 and 2 make 4."
  },


  /* 10 */
  {
    type: "number",
    question: "Look at the two parts. What is the whole?",
    visual: "🔵 🔵   🟡 🟡",
    placeholder: "Type the whole",
    correct: 4,
    tolerance: 0,
    explanation: "2 and 2 make 4."
  },


  /* 11 */
  {
    type: "single",
    question: "Which two parts make 5?",
    answers: [
      "2 and 3",
      "2 and 2",
      "1 and 3"
    ],
    correct: 0,
    explanation: "2 and 3 make 5."
  },


  /* 12 */
  {
    type: "number",
    question: "How many flowers are there altogether?",
    visual: "🌸 🌸   🌸 🌸 🌸",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "2 flowers and 3 flowers make 5."
  },


  /* 13 */
  {
    type: "fill-blank",
    question: "Complete the whole.",
    template: "4 and 1 make {{blank}}.",
    placeholder: "whole",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "4 and 1 make 5."
  },


  /* 14 */
  {
    type: "true-false",
    question: "3 and 2 make the same whole as 2 and 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both make a whole of 5."
  },


  /* 15 */
  {
    type: "single",
    question: "Which picture shows 5 as two parts?",
    answers: [
      "🔴 🔴   🔵 🔵 🔵",
      "🔴 🔴   🔵 🔵",
      "🔴   🔵 🔵"
    ],
    correct: 0,
    explanation: "2 and 3 make 5."
  },


  /* 16 */
  {
    type: "number",
    question: "What is the whole?",
    visual: "🟩 🟩 🟩   🟨 🟨",
    placeholder: "Type the whole",
    correct: 5,
    tolerance: 0,
    explanation: "3 and 2 make 5."
  },


  /* 17 */
  {
    type: "text",
    question: "2 and 2 make what number?",
    placeholder: "Type the number",
    acceptedAnswers: [
      "4",
      "four"
    ],
    explanation: "2 and 2 make 4."
  },


  /* 18 */
  {
    type: "fill-blank",
    question: "Complete the sentence.",
    visual: "🚗 🚗 🚗   🚗 🚗",
    template: "3 cars and 2 cars make {{blank}} cars.",
    placeholder: "whole",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "3 and 2 make 5."
  },


  /* 19 */
  {
    type: "single",
    question: "Which is another way to make 5?",
    answers: [
      "4 and 1",
      "4 and 2",
      "3 and 3"
    ],
    correct: 0,
    explanation: "4 and 1 make 5."
  },


  /* 20 */
  {
    type: "true-false",
    question: "A whole of 5 can be split into 4 and 1.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 4 and 1 are two parts of 5."
  },


  /* =======================================================
     LEVEL 2 — NUMBER BONDS AND MISSING PARTS
     QUESTIONS 21–40
     ======================================================= */


  /* 21 */
  {
    type: "fill-blank",
    question: "Find the missing part.",
    template: "2 and {{blank}} make 5.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "2 and 3 make 5."
  },


  /* 22 */
  {
    type: "number",
    question: "You have 3 counters. How many more do you need to make 5?",
    visual: "🔴 🔴 🔴",
    placeholder: "Type the missing part",
    correct: 2,
    tolerance: 0,
    explanation: "3 and 2 make 5."
  },


  /* 23 */
  {
    type: "fill-blank",
    question: "Find the missing part.",
    template: "4 and {{blank}} make 5.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["1", "one"]
    ],
    explanation: "4 and 1 make 5."
  },


  /* 24 */
  {
    type: "single",
    question: "The whole is 6. One part is 4. What is the other part?",
    answers: [
      "1",
      "2",
      "3"
    ],
    correct: 1,
    explanation: "4 and 2 make 6."
  },


  /* 25 */
  {
    type: "number",
    question: "The whole is 6. One part is 3. What is the other part?",
    placeholder: "Type the missing part",
    correct: 3,
    tolerance: 0,
    explanation: "3 and 3 make 6."
  },


  /* 26 */
  {
    type: "true-false",
    question: "5 and 1 make 6.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 5 and 1 make 6."
  },


  /* 27 */
  {
    type: "single",
    question: "Which pair makes 6?",
    answers: [
      "2 and 3",
      "2 and 4",
      "3 and 4"
    ],
    correct: 1,
    explanation: "2 and 4 make 6."
  },


  /* 28 */
  {
    type: "fill-blank",
    question: "Complete the number bond.",
    template: "5 and {{blank}} make 7.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "5 and 2 make 7."
  },


  /* 29 */
  {
    type: "number",
    question: "There are 7 blocks altogether. 4 are blue. The rest are red. How many are red?",
    placeholder: "Type the missing part",
    correct: 3,
    tolerance: 0,
    explanation: "4 and 3 make 7."
  },


  /* 30 */
  {
    type: "single",
    question: "Which pair makes a whole of 7?",
    answers: [
      "3 and 4",
      "3 and 3",
      "4 and 4"
    ],
    correct: 0,
    explanation: "3 and 4 make 7."
  },


  /* 31 */
  {
    type: "fill-blank",
    question: "Find the missing part.",
    template: "{{blank}} and 2 make 7.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "5 and 2 make 7."
  },


  /* 32 */
  {
    type: "number",
    question: "The whole is 8. One part is 5. What is the other part?",
    placeholder: "Type the missing part",
    correct: 3,
    tolerance: 0,
    explanation: "5 and 3 make 8."
  },


  /* 33 */
  {
    type: "single",
    question: "Which pair makes 8?",
    answers: [
      "4 and 4",
      "3 and 4",
      "5 and 4"
    ],
    correct: 0,
    explanation: "4 and 4 make 8."
  },


  /* 34 */
  {
    type: "true-false",
    question: "6 and 2 make 8.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 6 and 2 make 8."
  },


  /* 35 */
  {
    type: "number",
    question: "You have 6 stars. How many more stars are needed to make 8?",
    visual: "⭐ ⭐ ⭐ ⭐ ⭐ ⭐",
    placeholder: "Type the missing part",
    correct: 2,
    tolerance: 0,
    explanation: "6 and 2 make 8."
  },


  /* 36 */
  {
    type: "fill-blank",
    question: "Complete the whole.",
    template: "5 and 4 make {{blank}}.",
    placeholder: "whole",
    acceptedAnswers: [
      ["9", "nine"]
    ],
    explanation: "5 and 4 make 9."
  },


  /* 37 */
  {
    type: "single",
    question: "The whole is 9. One part is 7. What is the missing part?",
    answers: [
      "1",
      "2",
      "3"
    ],
    correct: 1,
    explanation: "7 and 2 make 9."
  },


  /* 38 */
  {
    type: "number",
    question: "The whole is 9. One part is 4. What is the other part?",
    placeholder: "Type the missing part",
    correct: 5,
    tolerance: 0,
    explanation: "4 and 5 make 9."
  },


  /* 39 */
  {
    type: "fill-blank",
    question: "Find the missing part.",
    template: "8 and {{blank}} make 10.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "8 and 2 make 10."
  },


  /* 40 */
  {
    type: "single",
    question: "Which pair makes 10?",
    answers: [
      "4 and 5",
      "6 and 4",
      "7 and 4"
    ],
    correct: 1,
    explanation: "6 and 4 make 10."
  },


  /* =======================================================
     LEVEL 3 — DIFFERENT WAYS TO MAKE A WHOLE
     QUESTIONS 41–60
     ======================================================= */


  /* 41 */
  {
    type: "multiple",
    question: "Select every pair that makes 5.",
    instruction: "More than one answer is correct.",
    answers: [
      "1 and 4",
      "2 and 3",
      "2 and 2",
      "5 and 0"
    ],
    correct: [0, 1, 3],
    explanation: "1 + 4, 2 + 3 and 5 + 0 all make 5."
  },


  /* 42 */
  {
    type: "multiple",
    question: "Select every pair that makes 6.",
    instruction: "More than one answer is correct.",
    answers: [
      "1 and 5",
      "2 and 4",
      "3 and 3",
      "4 and 3"
    ],
    correct: [0, 1, 2],
    explanation: "1 and 5, 2 and 4, and 3 and 3 all make 6."
  },


  /* 43 */
  {
    type: "true-false",
    question: "5 can be split into 2 and 3 or into 1 and 4.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. A whole can be split in different ways."
  },


  /* 44 */
  {
    type: "single",
    question: "Which is NOT a way to make 6?",
    answers: [
      "1 and 5",
      "2 and 4",
      "4 and 3"
    ],
    correct: 2,
    explanation: "4 and 3 make 7, not 6."
  },


  /* 45 */
  {
    type: "number",
    question: "3 red counters and 4 blue counters make what whole?",
    visual: "🔴 🔴 🔴   🔵 🔵 🔵 🔵",
    placeholder: "Type the whole",
    correct: 7,
    tolerance: 0,
    explanation: "3 and 4 make 7."
  },


  /* 46 */
  {
    type: "multiple",
    question: "Select every pair that makes 7.",
    instruction: "More than one answer is correct.",
    answers: [
      "1 and 6",
      "2 and 5",
      "3 and 4",
      "4 and 4"
    ],
    correct: [0, 1, 2],
    explanation: "1 + 6, 2 + 5 and 3 + 4 all make 7."
  },


  /* 47 */
  {
    type: "true-false",
    question: "2 and 5 make the same whole as 5 and 2.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both make 7."
  },


  /* 48 */
  {
    type: "single",
    question: "Which is another way to split 8?",
    answers: [
      "5 and 3",
      "5 and 4",
      "6 and 3"
    ],
    correct: 0,
    explanation: "5 and 3 make 8."
  },


  /* 49 */
  {
    type: "multiple",
    question: "Select every pair that makes 8.",
    instruction: "More than one answer is correct.",
    answers: [
      "1 and 7",
      "2 and 6",
      "3 and 5",
      "5 and 5"
    ],
    correct: [0, 1, 2],
    explanation: "1 + 7, 2 + 6 and 3 + 5 all make 8."
  },


  /* 50 */
  {
    type: "fill-blank",
    question: "Complete the part-part-whole sentence.",
    template: "The parts 4 and 4 make the whole {{blank}}.",
    placeholder: "whole",
    acceptedAnswers: [
      ["8", "eight"]
    ],
    explanation: "4 and 4 make 8."
  },


  /* 51 */
  {
    type: "single",
    question: "Which two parts make 9?",
    answers: [
      "6 and 3",
      "6 and 4",
      "5 and 5"
    ],
    correct: 0,
    explanation: "6 and 3 make 9."
  },


  /* 52 */
  {
    type: "multiple",
    question: "Select every pair that makes 9.",
    instruction: "More than one answer is correct.",
    answers: [
      "1 and 8",
      "2 and 7",
      "4 and 5",
      "6 and 4"
    ],
    correct: [0, 1, 2],
    explanation: "1 + 8, 2 + 7 and 4 + 5 all make 9."
  },


  /* 53 */
  {
    type: "number",
    question: "There are 5 yellow counters and 4 green counters. What is the whole?",
    visual: "🟡 🟡 🟡 🟡 🟡   🟢 🟢 🟢 🟢",
    placeholder: "Type the whole",
    correct: 9,
    tolerance: 0,
    explanation: "5 and 4 make 9."
  },


  /* 54 */
  {
    type: "true-false",
    question: "7 and 2 make the same whole as 2 and 7.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both make 9."
  },


  /* 55 */
  {
    type: "multiple",
    question: "Select every pair that makes 10.",
    instruction: "More than one answer is correct.",
    answers: [
      "1 and 9",
      "2 and 8",
      "5 and 5",
      "6 and 5"
    ],
    correct: [0, 1, 2],
    explanation: "1 + 9, 2 + 8 and 5 + 5 all make 10."
  },


  /* 56 */
  {
    type: "single",
    question: "Which is NOT a way to make 10?",
    answers: [
      "3 and 7",
      "4 and 6",
      "5 and 6"
    ],
    correct: 2,
    explanation: "5 and 6 make 11, not 10."
  },


  /* 57 */
  {
    type: "fill-blank",
    question: "Complete the number bond.",
    template: "7 and {{blank}} make 10.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "7 and 3 make 10."
  },


  /* 58 */
  {
    type: "number",
    question: "You have 4 blocks. How many more are needed to make a whole of 10?",
    visual: "🟦 🟦 🟦 🟦",
    placeholder: "Type the missing part",
    correct: 6,
    tolerance: 0,
    explanation: "4 and 6 make 10."
  },


  /* 59 */
  {
    type: "true-false",
    question: "10 can be split into 10 and 0.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 10 and 0 still make a whole of 10."
  },


  /* 60 */
  {
    type: "text",
    question: "5 and 5 make what whole?",
    placeholder: "Type the whole",
    acceptedAnswers: [
      "10",
      "ten"
    ],
    explanation: "5 and 5 make 10."
  },


  /* =======================================================
     LEVEL 4 — VISUAL REASONING AND MISCONCEPTIONS
     QUESTIONS 61–80
     ======================================================= */


  /* 61 */
  {
    type: "single",
    question: "Sam says 2 red counters and 3 blue counters make 6. Is Sam correct?",
    visual: "🔴 🔴   🔵 🔵 🔵",
    answers: [
      "Yes",
      "No"
    ],
    correct: 1,
    explanation: "No. 2 and 3 make 5."
  },


  /* 62 */
  {
    type: "true-false",
    question: "Changing the colours of the parts changes the whole.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. Colour does not change the quantity."
  },


  /* 63 */
  {
    type: "single",
    question: "Which statement is correct?",
    visual: "🔴 🔴 🔴   🔵 🔵",
    answers: [
      "The whole is 4.",
      "The whole is 5.",
      "The whole is 6."
    ],
    correct: 1,
    explanation: "3 and 2 make 5."
  },


  /* 64 */
  {
    type: "true-false",
    question: "If 6 is split into 4 and 2, putting the parts back together makes 6 again.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. The two parts combine to make the same whole."
  },


  /* 65 */
  {
    type: "single",
    question: "Mia says 8 can only be split into 4 and 4. Is she correct?",
    answers: [
      "Yes",
      "No"
    ],
    correct: 1,
    explanation: "No. 8 can be split in many ways, such as 5 and 3."
  },


  /* 66 */
  {
    type: "multiple",
    question: "Which pairs show different ways to make 8?",
    instruction: "Select every correct answer.",
    answers: [
      "1 and 7",
      "3 and 5",
      "4 and 4",
      "5 and 4"
    ],
    correct: [0, 1, 2],
    explanation: "1 + 7, 3 + 5 and 4 + 4 all make 8."
  },


  /* 67 */
  {
    type: "single",
    question: "The whole is 7. Which cannot be its two parts?",
    answers: [
      "5 and 2",
      "4 and 3",
      "4 and 4"
    ],
    correct: 2,
    explanation: "4 and 4 make 8, not 7."
  },


  /* 68 */
  {
    type: "true-false",
    question: "A whole can have more than one correct pair of parts.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. For example, 5 can be 1 and 4 or 2 and 3."
  },


  /* 69 */
  {
    type: "number",
    question: "There are 10 counters altogether. 6 are red. How many are blue?",
    placeholder: "Type the missing part",
    correct: 4,
    tolerance: 0,
    explanation: "6 and 4 make 10."
  },


  /* 70 */
  {
    type: "number",
    question: "There are 9 toys altogether. 2 are cars. The rest are balls. How many are balls?",
    placeholder: "Type the missing part",
    correct: 7,
    tolerance: 0,
    explanation: "2 and 7 make 9."
  },


  /* 71 */
  {
    type: "single",
    question: "Which number bond is correct?",
    answers: [
      "Whole 8: parts 5 and 3",
      "Whole 8: parts 5 and 4",
      "Whole 8: parts 6 and 3"
    ],
    correct: 0,
    explanation: "5 and 3 make 8."
  },


  /* 72 */
  {
    type: "multiple",
    question: "The whole is 10. Select every possible missing part.",
    instruction: "Choose the answer that completes each shown pair.",
    answers: [
      "If one part is 9, the other part is 1.",
      "If one part is 7, the other part is 3.",
      "If one part is 6, the other part is 4.",
      "If one part is 8, the other part is 3."
    ],
    correct: [0, 1, 2],
    explanation: "9 + 1, 7 + 3 and 6 + 4 all make 10."
  },


  /* 73 */
  {
    type: "true-false",
    question: "3 and 6 make the same whole as 6 and 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both make a whole of 9."
  },


  /* 74 */
  {
    type: "single",
    question: "Which whole can be made from the parts 4 and 5?",
    answers: [
      "8",
      "9",
      "10"
    ],
    correct: 1,
    explanation: "4 and 5 make 9."
  },


  /* 75 */
  {
    type: "fill-blank",
    question: "A whole of 10 is split into two equal parts.",
    template: "Each part is {{blank}}.",
    placeholder: "number",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "5 and 5 make 10."
  },


  /* 76 */
  {
    type: "single",
    question: "A whole of 8 is split into two equal parts. What are the parts?",
    answers: [
      "3 and 3",
      "4 and 4",
      "5 and 5"
    ],
    correct: 1,
    explanation: "4 and 4 make 8."
  },


  /* 77 */
  {
    type: "true-false",
    question: "If one part gets bigger and the whole stays the same, the other part must get smaller.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. For example, 2 and 3 make 5, while 1 and 4 also make 5."
  },


  /* 78 */
  {
    type: "single",
    question: "The whole stays 10. One pair is 4 and 6. If the first part becomes 5, what must the second part become?",
    answers: [
      "4",
      "5",
      "6"
    ],
    correct: 1,
    explanation: "5 and 5 make 10."
  },


  /* 79 */
  {
    type: "number",
    question: "A whole of 7 is made from one part of 1. What is the other part?",
    placeholder: "Type the missing part",
    correct: 6,
    tolerance: 0,
    explanation: "1 and 6 make 7."
  },


  /* 80 */
  {
    type: "multiple",
    question: "Which statements are true about a whole of 10?",
    instruction: "Select every true statement.",
    answers: [
      "1 and 9 make 10.",
      "2 and 8 make 10.",
      "4 and 6 make 10.",
      "7 and 4 make 10."
    ],
    correct: [0, 1, 2],
    explanation: "1 + 9, 2 + 8 and 4 + 6 all make 10."
  },


  /* =======================================================
     LEVEL 5 — CHALLENGE, ORDERING AND REAL-LIFE QUESTIONS
     QUESTIONS 81–100
     ======================================================= */


  /* 81 */
  {
    type: "order",
    question: "Put these ways to make 5 in order from the smallest first part to the largest first part.",
    items: [
      "4 and 1",
      "1 and 4",
      "3 and 2",
      "2 and 3"
    ],
    correct: [
      "1 and 4",
      "2 and 3",
      "3 and 2",
      "4 and 1"
    ],
    explanation: "The first parts are 1, 2, 3 and 4."
  },


  /* 82 */
  {
    type: "drag-drop",
    question: "Arrange these number bonds from the smallest whole to the largest whole.",
    instruction: "Drag the cards into order. You can also use the arrows.",
    items: [
      "4 and 4",
      "2 and 3",
      "3 and 4"
    ],
    correct: [
      "2 and 3",
      "3 and 4",
      "4 and 4"
    ],
    explanation: "The wholes are 5, 7 and 8."
  },


  /* 83 */
  {
    type: "single",
    question: "Lily has 6 stickers. 4 are stars and the rest are hearts. How many are hearts?",
    answers: [
      "1",
      "2",
      "3"
    ],
    correct: 1,
    explanation: "4 and 2 make 6."
  },


  /* 84 */
  {
    type: "number",
    question: "There are 8 children. 5 are wearing hats. How many are not wearing hats?",
    placeholder: "Type the missing part",
    correct: 3,
    tolerance: 0,
    explanation: "5 and 3 make 8."
  },


  /* 85 */
  {
    type: "fill-blank",
    question: "There are 10 fruit pieces. 7 are apples and the rest are bananas.",
    template: "There are {{blank}} bananas.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "7 and 3 make 10."
  },


  /* 86 */
  {
    type: "single",
    question: "Noah has 9 blocks. 5 are red and 4 are blue. Which number is the whole?",
    answers: [
      "4",
      "5",
      "9"
    ],
    correct: 2,
    explanation: "The whole collection contains 9 blocks."
  },


  /* 87 */
  {
    type: "multiple",
    question: "Which stories show a whole of 8?",
    instruction: "Select every correct story.",
    answers: [
      "5 red blocks and 3 blue blocks",
      "4 cats and 4 dogs",
      "6 apples and 2 bananas",
      "5 stars and 4 moons"
    ],
    correct: [0, 1, 2],
    explanation: "5 + 3, 4 + 4 and 6 + 2 all make 8."
  },


  /* 88 */
  {
    type: "single",
    question: "A box holds 10 crayons. 8 are inside the box and 2 are on the table. Which statement is correct?",
    answers: [
      "The whole is 8.",
      "The whole is 10.",
      "The whole is 12."
    ],
    correct: 1,
    explanation: "8 and 2 are the parts. Together they make the whole of 10."
  },


  /* 89 */
  {
    type: "number",
    question: "There are 10 ducks altogether. 3 are in the pond. How many are out of the pond?",
    placeholder: "Type the missing part",
    correct: 7,
    tolerance: 0,
    explanation: "3 and 7 make 10."
  },


  /* 90 */
  {
    type: "true-false",
    question: "A collection of 9 can be split into 4 and 5, then joined again to make 9.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 4 and 5 are parts of the whole 9."
  },


  /* 91 */
  {
    type: "single",
    question: "The whole is 10. Which missing-part sentence is correct?",
    answers: [
      "6 and 3 make 10.",
      "6 and 4 make 10.",
      "6 and 5 make 10."
    ],
    correct: 1,
    explanation: "6 and 4 make 10."
  },


  /* 92 */
  {
    type: "multiple",
    question: "Which number bonds have the same whole?",
    instruction: "Select every bond with a whole of 9.",
    answers: [
      "1 and 8",
      "2 and 7",
      "3 and 6",
      "4 and 6"
    ],
    correct: [0, 1, 2],
    explanation: "1 + 8, 2 + 7 and 3 + 6 all make 9."
  },


  /* 93 */
  {
    type: "drag-drop",
    question: "Arrange these missing-part questions from the smallest missing part to the largest missing part.",
    instruction: "Work out each missing part, then put the cards in order.",
    items: [
      "8 and ? make 10",
      "5 and ? make 10",
      "7 and ? make 10"
    ],
    correct: [
      "8 and ? make 10",
      "7 and ? make 10",
      "5 and ? make 10"
    ],
    explanation: "The missing parts are 2, 3 and 5."
  },


  /* 94 */
  {
    type: "single",
    question: "Which picture shows the whole 10 split into 6 and 4?",
    answers: [
      "🔴 🔴 🔴 🔴 🔴 🔴   🔵 🔵 🔵 🔵",
      "🔴 🔴 🔴 🔴 🔴   🔵 🔵 🔵 🔵",
      "🔴 🔴 🔴 🔴 🔴 🔴   🔵 🔵 🔵"
    ],
    correct: 0,
    explanation: "6 red counters and 4 blue counters make 10."
  },


  /* 95 */
  {
    type: "number",
    question: "A ten-frame has 6 filled spaces and 4 empty spaces. How many spaces are there altogether?",
    placeholder: "Type the whole",
    correct: 10,
    tolerance: 0,
    explanation: "6 filled spaces and 4 empty spaces make the whole frame of 10."
  },


  /* 96 */
  {
    type: "fill-blank",
    question: "A ten-frame has 9 counters.",
    template: "It needs {{blank}} more counter to make 10.",
    placeholder: "missing part",
    acceptedAnswers: [
      ["1", "one"]
    ],
    explanation: "9 and 1 make 10."
  },


  /* 97 */
  {
    type: "multiple",
    question: "Which statements show part-part-whole thinking?",
    instruction: "Select every correct statement.",
    answers: [
      "I can see 5 as 2 and 3.",
      "I can see 8 as 4 and 4.",
      "I can see 10 as 6 and 4.",
      "I can see 7 as 5 and 5."
    ],
    correct: [0, 1, 2],
    explanation: "2 + 3 = 5, 4 + 4 = 8 and 6 + 4 = 10."
  },


  /* 98 */
  {
    type: "single",
    question: "A whole is split into 3 and 6. Which whole was split?",
    answers: [
      "8",
      "9",
      "10"
    ],
    correct: 1,
    explanation: "3 and 6 make 9."
  },


  /* 99 */
  {
    type: "number",
    question: "The whole is 10. One part is 0. What is the other part?",
    placeholder: "Type the missing part",
    correct: 10,
    tolerance: 0,
    explanation: "0 and 10 make a whole of 10."
  },


  /* 100 */
  {
    type: "multiple",
    question: "Which are correct ways to split a whole of 10?",
    instruction: "Select every correct answer.",
    answers: [
      "0 and 10",
      "2 and 8",
      "5 and 5",
      "7 and 3"
    ],
    correct: [0, 1, 2, 3],
    explanation: "All four pairs make a whole of 10."
  }

];


/* =========================================================
   QUIZ CONFIGURATION

   Full bank: 100 questions
   Questions shown per attempt: 5

   The shared quiz engine will:
   1. shuffle all 100 questions
   2. select 5
   3. show a different mixture each attempt
   ========================================================= */

window.quizConfig = {

  shuffleQuestions: true,

  shuffleAnswers: false,

  maxQuestions: 5,

  caseSensitiveText: false,

  storageKey:
    "AC9MFN04PartPartWholeBestScore"

};
