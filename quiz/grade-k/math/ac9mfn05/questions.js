"use strict";

/* =========================================================
   AC9MFN05 — ADDITION AND SUBTRACTION
   FOUNDATION MATHEMATICS

   100-question bank
   5 random questions per attempt

   Difficulty:
   1–20   Easy
   21–40  Easy–Medium
   41–60  Medium
   61–80  Medium–Hard
   81–100 Challenge

   Main skills:
   - joining groups
   - adding more
   - taking away
   - finding how many are left
   - finding how many altogether
   - counting on
   - counting back
   - missing parts
   - practical story problems
   - reasoning about addition and subtraction
   ========================================================= */

window.quizQuestions = [

  /* =======================================================
     LEVEL 1 — SIMPLE JOINING AND TAKING AWAY
     QUESTIONS 1–20
     ======================================================= */

  {
    type: "number",
    question: "There is 1 red counter and 1 blue counter. How many counters are there altogether?",
    visual: "🔴 🔵",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "1 and 1 make 2."
  },

  {
    type: "single",
    question: "What is 1 + 2?",
    answers: [
      "2",
      "3",
      "4"
    ],
    correct: 1,
    explanation: "1 + 2 = 3."
  },

  {
    type: "number",
    question: "How many stars are there altogether?",
    visual: "⭐   ⭐ ⭐",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "1 star and 2 stars make 3 stars."
  },

  {
    type: "true-false",
    question: "2 + 1 = 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 2 and 1 make 3."
  },

  {
    type: "fill-blank",
    question: "Complete the addition sentence.",
    template: "2 + 2 = {{blank}}",
    placeholder: "?",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "2 + 2 = 4."
  },

  {
    type: "number",
    question: "There are 3 apples. One more apple is added. How many apples are there now?",
    visual: "🍎 🍎 🍎   + 🍎",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "3 and 1 more make 4."
  },

  {
    type: "single",
    question: "What is 3 + 2?",
    answers: [
      "4",
      "5",
      "6"
    ],
    correct: 1,
    explanation: "3 + 2 = 5."
  },

  {
    type: "number",
    question: "There are 5 balloons. 1 balloon flies away. How many are left?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "5 take away 1 leaves 4."
  },

  {
    type: "single",
    question: "What is 4 − 1?",
    answers: [
      "2",
      "3",
      "4"
    ],
    correct: 1,
    explanation: "4 − 1 = 3."
  },

  {
    type: "true-false",
    question: "5 − 2 = 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Taking 2 away from 5 leaves 3."
  },

  {
    type: "fill-blank",
    question: "Complete the subtraction sentence.",
    template: "3 − 1 = {{blank}}",
    placeholder: "?",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "3 − 1 = 2."
  },

  {
    type: "number",
    question: "There are 4 ducks. 2 ducks swim away. How many ducks are left?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "4 take away 2 leaves 2."
  },

  {
    type: "single",
    question: "Two cars join three cars. How many cars are there altogether?",
    answers: [
      "4",
      "5",
      "6"
    ],
    correct: 1,
    explanation: "2 + 3 = 5."
  },

  {
    type: "number",
    question: "How many flowers are there altogether?",
    visual: "🌸 🌸   🌸 🌸 🌸",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "2 flowers and 3 flowers make 5."
  },

  {
    type: "true-false",
    question: "Taking away makes a group smaller.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Taking objects away makes fewer objects."
  },

  {
    type: "true-false",
    question: "Adding more objects usually makes the group bigger.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Adding more increases the number of objects."
  },

  {
    type: "number",
    question: "You have 2 blocks. A friend gives you 2 more. How many blocks do you have now?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "2 + 2 = 4."
  },

  {
    type: "single",
    question: "Which number sentence matches: 3 birds and 1 more bird?",
    answers: [
      "3 + 1 = 4",
      "3 − 1 = 2",
      "4 − 3 = 1"
    ],
    correct: 0,
    explanation: "Adding one more bird gives 3 + 1 = 4."
  },

  {
    type: "single",
    question: "Which number sentence matches: 4 cookies and 1 is eaten?",
    answers: [
      "4 + 1 = 5",
      "4 − 1 = 3",
      "3 + 1 = 4"
    ],
    correct: 1,
    explanation: "One cookie is taken away, so 4 − 1 = 3."
  },

  {
    type: "number",
    question: "There are 5 toys. All 5 are put away. How many toys are left?",
    placeholder: "Type the number",
    correct: 0,
    tolerance: 0,
    explanation: "5 − 5 = 0."
  },


  /* =======================================================
     LEVEL 2 — ADDITION AND SUBTRACTION TO 10
     QUESTIONS 21–40
     ======================================================= */

  {
    type: "single",
    question: "What is 4 + 2?",
    answers: [
      "5",
      "6",
      "7"
    ],
    correct: 1,
    explanation: "4 + 2 = 6."
  },

  {
    type: "number",
    question: "There are 4 red counters and 3 blue counters. How many counters are there altogether?",
    visual: "🔴 🔴 🔴 🔴   🔵 🔵 🔵",
    placeholder: "Type the number",
    correct: 7,
    tolerance: 0,
    explanation: "4 + 3 = 7."
  },

  {
    type: "fill-blank",
    question: "Complete the addition sentence.",
    template: "5 + 2 = {{blank}}",
    placeholder: "?",
    acceptedAnswers: [
      ["7", "seven"]
    ],
    explanation: "5 + 2 = 7."
  },

  {
    type: "true-false",
    question: "6 + 2 = 8.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 6 and 2 more make 8."
  },

  {
    type: "single",
    question: "What is 7 − 2?",
    answers: [
      "4",
      "5",
      "6"
    ],
    correct: 1,
    explanation: "7 − 2 = 5."
  },

  {
    type: "number",
    question: "There are 8 fish. 3 swim away. How many are left?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "8 − 3 = 5."
  },

  {
    type: "fill-blank",
    question: "Complete the subtraction sentence.",
    template: "6 − 2 = {{blank}}",
    placeholder: "?",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "6 − 2 = 4."
  },

  {
    type: "number",
    question: "There are 5 children. 3 more children arrive. How many children are there now?",
    placeholder: "Type the number",
    correct: 8,
    tolerance: 0,
    explanation: "5 + 3 = 8."
  },

  {
    type: "single",
    question: "There are 9 blocks. 4 are put away. How many blocks remain?",
    answers: [
      "4",
      "5",
      "6"
    ],
    correct: 1,
    explanation: "9 − 4 = 5."
  },

  {
    type: "true-false",
    question: "8 − 3 = 6.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. 8 − 3 = 5."
  },

  {
    type: "single",
    question: "Which answer makes this true: 5 + 4 = ?",
    answers: [
      "8",
      "9",
      "10"
    ],
    correct: 1,
    explanation: "5 + 4 = 9."
  },

  {
    type: "number",
    question: "There are 6 stars. 4 more stars are added. How many stars are there altogether?",
    placeholder: "Type the number",
    correct: 10,
    tolerance: 0,
    explanation: "6 + 4 = 10."
  },

  {
    type: "fill-blank",
    question: "Complete the sentence.",
    template: "10 − 2 = {{blank}}",
    placeholder: "?",
    acceptedAnswers: [
      ["8", "eight"]
    ],
    explanation: "10 − 2 = 8."
  },

  {
    type: "number",
    question: "There are 10 pencils. 5 are taken away. How many pencils are left?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "10 − 5 = 5."
  },

  {
    type: "single",
    question: "Which addition makes 10?",
    answers: [
      "6 + 3",
      "6 + 4",
      "6 + 5"
    ],
    correct: 1,
    explanation: "6 + 4 = 10."
  },

  {
    type: "single",
    question: "Which subtraction gives 4?",
    answers: [
      "7 − 3",
      "7 − 2",
      "7 − 1"
    ],
    correct: 0,
    explanation: "7 − 3 = 4."
  },

  {
    type: "number",
    question: "Start at 5 and count on 3 more. What number do you reach?",
    placeholder: "Type the number",
    correct: 8,
    tolerance: 0,
    explanation: "Count on: 6, 7, 8."
  },

  {
    type: "number",
    question: "Start at 8 and count back 2. What number do you reach?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "Count back: 7, 6."
  },

  {
    type: "true-false",
    question: "3 + 5 and 5 + 3 have the same answer.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both equal 8."
  },

  {
    type: "true-false",
    question: "9 − 0 = 9.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Taking away zero leaves the amount unchanged."
  },


  /* =======================================================
     LEVEL 3 — MISSING NUMBERS AND STORY PROBLEMS
     QUESTIONS 41–60
     ======================================================= */

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "3 + {{blank}} = 5",
    placeholder: "?",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "3 + 2 = 5."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "4 + {{blank}} = 7",
    placeholder: "?",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "4 + 3 = 7."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "{{blank}} + 2 = 8",
    placeholder: "?",
    acceptedAnswers: [
      ["6", "six"]
    ],
    explanation: "6 + 2 = 8."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "5 + {{blank}} = 10",
    placeholder: "?",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "5 + 5 = 10."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "7 − {{blank}} = 5",
    placeholder: "?",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "7 − 2 = 5."
  },

  {
    type: "number",
    question: "There were 8 frogs. Some jumped away. 5 frogs are left. How many jumped away?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "8 − 3 = 5, so 3 frogs jumped away."
  },

  {
    type: "number",
    question: "There are 6 children on the mat. 3 more join them. How many children are there altogether?",
    placeholder: "Type the number",
    correct: 9,
    tolerance: 0,
    explanation: "6 + 3 = 9."
  },

  {
    type: "single",
    question: "Ben has 7 toy cars. He gives 2 away. Which number sentence matches the story?",
    answers: [
      "7 + 2 = 9",
      "7 − 2 = 5",
      "5 + 2 = 7"
    ],
    correct: 1,
    explanation: "Giving cars away means subtracting: 7 − 2 = 5."
  },

  {
    type: "single",
    question: "Ella has 4 shells. She finds 3 more. Which number sentence matches?",
    answers: [
      "4 + 3 = 7",
      "4 − 3 = 1",
      "7 − 4 = 3"
    ],
    correct: 0,
    explanation: "Finding more means addition: 4 + 3 = 7."
  },

  {
    type: "number",
    question: "There are 10 cups. 4 are used. How many cups are still unused?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "10 − 4 = 6."
  },

  {
    type: "single",
    question: "Which word usually tells us to add?",
    answers: [
      "Altogether",
      "Left",
      "Take away"
    ],
    correct: 0,
    explanation: "Altogether often tells us to join groups."
  },

  {
    type: "single",
    question: "Which words usually tell us to subtract?",
    answers: [
      "Join together",
      "Take away",
      "Altogether"
    ],
    correct: 1,
    explanation: "Take away means removing objects."
  },

  {
    type: "number",
    question: "A plate has 9 strawberries. 3 are eaten. How many are left?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "9 − 3 = 6."
  },

  {
    type: "number",
    question: "There are 2 dogs in the yard. 5 more dogs arrive. How many dogs are there now?",
    placeholder: "Type the number",
    correct: 7,
    tolerance: 0,
    explanation: "2 + 5 = 7."
  },

  {
    type: "fill-blank",
    question: "Complete the story number sentence.",
    template: "There are 8 balloons. 3 pop. 8 − 3 = {{blank}}.",
    placeholder: "?",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "8 − 3 = 5."
  },

  {
    type: "fill-blank",
    question: "Complete the story number sentence.",
    template: "There are 4 ducks. 4 more arrive. 4 + 4 = {{blank}}.",
    placeholder: "?",
    acceptedAnswers: [
      ["8", "eight"]
    ],
    explanation: "4 + 4 = 8."
  },

  {
    type: "number",
    question: "Mia needs 10 crayons. She has 7. How many more crayons does she need?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "7 and 3 more make 10."
  },

  {
    type: "single",
    question: "A box held 6 balls. Now it holds 4. What happened?",
    answers: [
      "2 balls were added.",
      "2 balls were taken away.",
      "4 balls were added."
    ],
    correct: 1,
    explanation: "6 − 2 = 4, so 2 balls were taken away."
  },

  {
    type: "single",
    question: "There were 5 birds. Now there are 8. What could have happened?",
    answers: [
      "3 birds joined.",
      "3 birds flew away.",
      "5 birds flew away."
    ],
    correct: 0,
    explanation: "5 + 3 = 8."
  },

  {
    type: "number",
    question: "There are 10 blocks altogether. 8 are blue and the rest are red. How many are red?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "8 and 2 make 10."
  },


  /* =======================================================
     LEVEL 4 — REASONING AND TRICKY QUESTIONS
     QUESTIONS 61–80
     ======================================================= */

  {
    type: "true-false",
    question: "If you add 0 to 7, the answer stays 7.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Adding zero does not change the number."
  },

  {
    type: "true-false",
    question: "If you take 0 away from 8, the answer is 0.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. 8 − 0 = 8."
  },

  {
    type: "true-false",
    question: "6 − 6 = 0.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Taking all 6 away leaves none."
  },

  {
    type: "single",
    question: "Leo says 4 + 3 = 6. Is Leo correct?",
    answers: [
      "Yes",
      "No"
    ],
    correct: 1,
    explanation: "No. 4 + 3 = 7."
  },

  {
    type: "single",
    question: "Amy says 8 − 2 = 6. Is Amy correct?",
    answers: [
      "Yes",
      "No"
    ],
    correct: 0,
    explanation: "Yes. 8 − 2 = 6."
  },

  {
    type: "multiple",
    question: "Select every addition sentence that equals 8.",
    instruction: "More than one answer is correct.",
    answers: [
      "3 + 5",
      "4 + 4",
      "6 + 2",
      "5 + 2"
    ],
    correct: [0, 1, 2],
    explanation: "3 + 5, 4 + 4 and 6 + 2 all equal 8."
  },

  {
    type: "multiple",
    question: "Select every subtraction sentence that equals 5.",
    instruction: "More than one answer is correct.",
    answers: [
      "8 − 3",
      "7 − 2",
      "6 − 1",
      "9 − 3"
    ],
    correct: [0, 1, 2],
    explanation: "8 − 3, 7 − 2 and 6 − 1 all equal 5."
  },

  {
    type: "multiple",
    question: "Which number sentences equal 10?",
    instruction: "Select every correct answer.",
    answers: [
      "6 + 4",
      "7 + 3",
      "5 + 5",
      "8 + 3"
    ],
    correct: [0, 1, 2],
    explanation: "6 + 4, 7 + 3 and 5 + 5 equal 10."
  },

  {
    type: "single",
    question: "Which number sentence is NOT correct?",
    answers: [
      "4 + 3 = 7",
      "8 − 3 = 5",
      "6 + 3 = 8"
    ],
    correct: 2,
    explanation: "6 + 3 = 9, not 8."
  },

  {
    type: "single",
    question: "Which number sentence is NOT correct?",
    answers: [
      "9 − 4 = 5",
      "7 − 2 = 5",
      "8 − 2 = 5"
    ],
    correct: 2,
    explanation: "8 − 2 = 6."
  },

  {
    type: "number",
    question: "A group starts with 4 objects and ends with 9 objects. How many objects were added?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "4 + 5 = 9."
  },

  {
    type: "number",
    question: "A group starts with 10 objects and ends with 6 objects. How many were taken away?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "10 − 4 = 6."
  },

  {
    type: "single",
    question: "Which answer is one more than 7?",
    answers: [
      "6",
      "8",
      "9"
    ],
    correct: 1,
    explanation: "One more than 7 is 8."
  },

  {
    type: "single",
    question: "Which answer is one less than 9?",
    answers: [
      "7",
      "8",
      "10"
    ],
    correct: 1,
    explanation: "One less than 9 is 8."
  },

  {
    type: "number",
    question: "Start with 3. Add 2, then add 1 more. What number do you have?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "3 + 2 = 5, then 5 + 1 = 6."
  },

  {
    type: "number",
    question: "Start with 9. Take away 2, then take away 1 more. What number is left?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "9 − 2 = 7, then 7 − 1 = 6."
  },

  {
    type: "single",
    question: "Which story has an answer of 7?",
    answers: [
      "5 apples and 2 more apples",
      "8 apples and 2 apples taken away",
      "4 apples and 2 more apples"
    ],
    correct: 0,
    explanation: "5 + 2 = 7."
  },

  {
    type: "single",
    question: "Which story has an answer of 4?",
    answers: [
      "6 toys with 2 taken away",
      "6 toys with 2 more added",
      "5 toys with 2 taken away"
    ],
    correct: 0,
    explanation: "6 − 2 = 4."
  },

  {
    type: "true-false",
    question: "Addition and subtraction can describe things that happen in real life.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. We use them when objects join, are added, leave or are taken away."
  },

  {
    type: "single",
    question: "A child counts 5, 6, 7 when adding 2 to 5. What answer should the child get?",
    answers: [
      "6",
      "7",
      "8"
    ],
    correct: 1,
    explanation: "Counting on two from 5 gives 6, 7."
  },


  /* =======================================================
     LEVEL 5 — CHALLENGE QUESTIONS
     QUESTIONS 81–100
     ======================================================= */

  {
    type: "order",
    question: "Put these addition answers in order from smallest to largest.",
    items: [
      "3 + 3",
      "2 + 2",
      "4 + 4"
    ],
    correct: [
      "2 + 2",
      "3 + 3",
      "4 + 4"
    ],
    explanation: "The answers are 4, 6 and 8."
  },

  {
    type: "order",
    question: "Put these subtraction answers in order from smallest to largest.",
    items: [
      "9 − 2",
      "6 − 3",
      "8 − 3"
    ],
    correct: [
      "6 − 3",
      "8 − 3",
      "9 − 2"
    ],
    explanation: "The answers are 3, 5 and 7."
  },

  {
    type: "drag-drop",
    question: "Arrange these addition sentences from the smallest answer to the largest answer.",
    instruction: "Drag the cards into order. You can also use the arrows.",
    items: [
      "5 + 4",
      "2 + 3",
      "3 + 4"
    ],
    correct: [
      "2 + 3",
      "3 + 4",
      "5 + 4"
    ],
    explanation: "The answers are 5, 7 and 9."
  },

  {
    type: "drag-drop",
    question: "Arrange these subtraction sentences from the smallest answer to the largest answer.",
    instruction: "Drag the cards into order. You can also use the arrows.",
    items: [
      "9 − 2",
      "5 − 3",
      "8 − 3"
    ],
    correct: [
      "5 − 3",
      "8 − 3",
      "9 − 2"
    ],
    explanation: "The answers are 2, 5 and 7."
  },

  {
    type: "multiple",
    question: "Select every story that shows addition.",
    instruction: "More than one answer is correct.",
    answers: [
      "3 birds are joined by 2 more birds.",
      "5 blocks are joined by 4 more blocks.",
      "8 balloons have 2 balloons pop.",
      "6 children are joined by 1 more child."
    ],
    correct: [0, 1, 3],
    explanation: "Joining more objects is addition."
  },

  {
    type: "multiple",
    question: "Select every story that shows subtraction.",
    instruction: "More than one answer is correct.",
    answers: [
      "7 ducks and 2 swim away.",
      "4 cars and 3 more arrive.",
      "9 apples and 3 are eaten.",
      "8 blocks and 2 are put away."
    ],
    correct: [0, 2, 3],
    explanation: "Swimming away, eating and putting away remove objects."
  },

  {
    type: "number",
    question: "There are 10 children. Some go outside. 7 remain inside. How many went outside?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "10 − 3 = 7."
  },

  {
    type: "number",
    question: "There are 3 toy animals. Some more are added. Now there are 9. How many were added?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "3 + 6 = 9."
  },

  {
    type: "fill-blank",
    question: "Complete the missing-part problem.",
    template: "10 − {{blank}} = 4",
    placeholder: "?",
    acceptedAnswers: [
      ["6", "six"]
    ],
    explanation: "10 − 6 = 4."
  },

  {
    type: "fill-blank",
    question: "Complete the missing-part problem.",
    template: "{{blank}} + 4 = 10",
    placeholder: "?",
    acceptedAnswers: [
      ["6", "six"]
    ],
    explanation: "6 + 4 = 10."
  },

  {
    type: "single",
    question: "A ten-frame has 7 counters. How many more counters are needed to fill all 10 spaces?",
    answers: [
      "2",
      "3",
      "4"
    ],
    correct: 1,
    explanation: "7 + 3 = 10."
  },

  {
    type: "single",
    question: "A ten-frame is full with 10 counters. 4 counters are removed. How many remain?",
    answers: [
      "5",
      "6",
      "7"
    ],
    correct: 1,
    explanation: "10 − 4 = 6."
  },

  {
    type: "true-false",
    question: "If 4 + 3 = 7, then 7 − 3 = 4.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Addition and subtraction can undo each other."
  },

  {
    type: "true-false",
    question: "If 5 + 2 = 7, then 7 − 5 = 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. 7 − 5 = 2."
  },

  {
    type: "multiple",
    question: "Which number sentences belong to the same number family?",
    instruction: "Select every sentence using 3, 4 and 7 correctly.",
    answers: [
      "3 + 4 = 7",
      "4 + 3 = 7",
      "7 − 3 = 4",
      "7 − 4 = 2"
    ],
    correct: [0, 1, 2],
    explanation: "3, 4 and 7 make related addition and subtraction facts."
  },

  {
    type: "single",
    question: "Which number sentence has the greatest answer?",
    answers: [
      "2 + 4",
      "3 + 5",
      "4 + 3"
    ],
    correct: 1,
    explanation: "2 + 4 = 6, 3 + 5 = 8 and 4 + 3 = 7."
  },

  {
    type: "single",
    question: "Which number sentence has the smallest answer?",
    answers: [
      "8 − 2",
      "7 − 4",
      "9 − 3"
    ],
    correct: 1,
    explanation: "The answers are 6, 3 and 6. The smallest is 3."
  },

  {
    type: "number",
    question: "A class needs 10 glue sticks. There are 6 on the table. How many more are needed?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "6 + 4 = 10."
  },

  {
    type: "multiple",
    question: "Which statements are true?",
    instruction: "Select every true statement.",
    answers: [
      "Adding 1 to 8 gives 9.",
      "Taking 1 from 8 gives 7.",
      "Adding 0 to 8 gives 8.",
      "Taking 0 from 8 gives 0."
    ],
    correct: [0, 1, 2],
    explanation: "8 + 1 = 9, 8 − 1 = 7 and 8 + 0 = 8."
  },

  {
    type: "multiple",
    question: "Which number sentences are correct?",
    instruction: "Select every correct answer.",
    answers: [
      "4 + 6 = 10",
      "10 − 4 = 6",
      "10 − 6 = 4",
      "6 − 4 = 10"
    ],
    correct: [0, 1, 2],
    explanation: "4 + 6 = 10, 10 − 4 = 6 and 10 − 6 = 4."
  }

];


/* =========================================================
   QUIZ CONFIGURATION

   Full question bank: 100
   Questions shown per attempt: 5
   ========================================================= */

window.quizConfig = {

  shuffleQuestions: true,

  shuffleAnswers: false,

  maxQuestions: 5,

  caseSensitiveText: false,

  storageKey:
    "AC9MFN05AdditionSubtractionBestScore"

};
