"use strict";

/* =========================================================
   AC9MFN06 — EQUAL SHARING AND GROUPING
   FOUNDATION MATHEMATICS

   Question bank: 100 questions
   Questions shown per attempt: 5

   Difficulty:
   1–35   Easy
   36–70  Medium
   71–100 Challenge / reasoning

   Skills:
   - fair sharing
   - equal groups
   - sharing one at a time
   - counting objects in each group
   - counting the number of groups
   - recognising equal and unequal groups
   - deciding whether a collection can be shared equally
   - early division reasoning
   ========================================================= */

window.quizQuestions = [

  /* =======================================================
     EASY
     QUESTIONS 1–35
     ======================================================= */

  {
    type: "number",
    question: "Share 2 apples equally between 2 children. How many apples does each child get?",
    visual: "🍎 🍎     👧 👦",
    placeholder: "Type the number",
    correct: 1,
    tolerance: 0,
    explanation: "Each child gets 1 apple."
  },

  {
    type: "single",
    question: "4 counters are shared equally between 2 children. How many counters does each child get?",
    answers: [
      "1",
      "2",
      "4"
    ],
    correct: 1,
    explanation: "Sharing 4 equally between 2 children gives 2 each."
  },

  {
    type: "true-false",
    question: "If two children get the same number of blocks, the share is equal.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. An equal share means everyone gets the same amount."
  },

  {
    type: "single",
    question: "Which picture shows two equal groups?",
    answers: [
      "● ●   |   ● ●",
      "● ● ●   |   ●",
      "●   |   ● ● ●"
    ],
    correct: 0,
    explanation: "Both groups have 2 objects, so they are equal."
  },

  {
    type: "number",
    question: "6 strawberries are shared equally between 2 children. How many does each child get?",
    visual: "🍓 🍓 🍓 🍓 🍓 🍓",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "6 shared equally between 2 children gives 3 each."
  },

  {
    type: "true-false",
    question: "A group of 3 and a group of 3 are equal groups.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both groups contain 3 objects."
  },

  {
    type: "true-false",
    question: "A group of 2 and a group of 4 are equal groups.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. Equal groups must contain the same number of objects."
  },

  {
    type: "single",
    question: "There are 4 toy cars. Which is a fair share between 2 children?",
    answers: [
      "1 car and 3 cars",
      "2 cars and 2 cars",
      "4 cars and 0 cars"
    ],
    correct: 1,
    explanation: "2 and 2 is a fair share because both children get the same amount."
  },

  {
    type: "number",
    question: "Put 6 buttons into groups of 2. How many groups can you make?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "6 buttons make 3 groups of 2."
  },

  {
    type: "single",
    question: "Which groups are equal?",
    answers: [
      "2, 2, 2",
      "2, 3, 2",
      "1, 2, 3"
    ],
    correct: 0,
    explanation: "2, 2, 2 are equal because every group has 2."
  },

  {
    type: "fill-blank",
    question: "Complete the fair share.",
    template: "4 objects shared between 2 children gives {{blank}} objects each.",
    placeholder: "?",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "4 shared equally between 2 gives 2 each."
  },

  {
    type: "number",
    question: "8 blocks are placed into groups of 2. How many groups are made?",
    visual: "🟦 🟦   🟦 🟦   🟦 🟦   🟦 🟦",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "There are 4 groups of 2."
  },

  {
    type: "single",
    question: "Which word best describes giving everyone the same amount?",
    answers: [
      "Equal",
      "Different",
      "Empty"
    ],
    correct: 0,
    explanation: "Equal means the amounts are the same."
  },

  {
    type: "true-false",
    question: "Sharing fairly means one person can get more than everyone else.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. In a fair equal share, everyone receives the same amount."
  },

  {
    type: "number",
    question: "6 cookies are shared equally between 3 children. How many cookies does each child get?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "Each child gets 2 cookies."
  },

  {
    type: "single",
    question: "Which picture shows 3 equal groups of 2?",
    answers: [
      "●●   ●●   ●●",
      "●●●   ●●   ●",
      "●   ●●   ●●●"
    ],
    correct: 0,
    explanation: "There are 3 groups and each group contains 2 objects."
  },

  {
    type: "number",
    question: "There are 4 socks. Make groups of 2 socks. How many groups can you make?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "4 socks make 2 groups of 2."
  },

  {
    type: "true-false",
    question: "2, 2 and 2 are three equal groups.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Each group contains 2."
  },

  {
    type: "single",
    question: "6 bears are shared equally between 2 children. Which share is correct?",
    answers: [
      "3 and 3",
      "2 and 4",
      "1 and 5"
    ],
    correct: 0,
    explanation: "3 and 3 is the equal share."
  },

  {
    type: "fill-blank",
    question: "Complete the grouping sentence.",
    template: "6 objects can make 3 equal groups of {{blank}}.",
    placeholder: "?",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "6 objects can be arranged as 2, 2 and 2."
  },

  {
    type: "number",
    question: "9 stars are put into 3 equal groups. How many stars are in each group?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "9 shared into 3 equal groups gives 3 in each group."
  },

  {
    type: "single",
    question: "Which is NOT an equal grouping?",
    answers: [
      "3, 3",
      "2, 2, 2",
      "2, 3, 2"
    ],
    correct: 2,
    explanation: "2, 3, 2 is not equal because one group contains 3."
  },

  {
    type: "true-false",
    question: "8 objects can be shared equally between 2 children.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Each child can receive 4 objects."
  },

  {
    type: "number",
    question: "10 counters are shared equally between 2 children. How many counters does each child get?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "10 shared equally between 2 gives 5 each."
  },

  {
    type: "single",
    question: "There are 6 blocks. Which arrangement makes equal groups?",
    answers: [
      "3 and 3",
      "2 and 4",
      "1 and 5"
    ],
    correct: 0,
    explanation: "3 and 3 are equal groups."
  },

  {
    type: "number",
    question: "8 apples are placed into 4 equal groups. How many apples are in each group?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "Each of the 4 groups has 2 apples."
  },

  {
    type: "fill-blank",
    question: "Complete the fair-sharing sentence.",
    template: "6 pencils shared equally between 3 children gives {{blank}} pencils each.",
    placeholder: "?",
    acceptedAnswers: [
      ["2", "two"]
    ],
    explanation: "Each child receives 2 pencils."
  },

  {
    type: "single",
    question: "Which action is best when sharing fairly?",
    answers: [
      "Give one object to each person in turn.",
      "Give everything to one person.",
      "Give different amounts without checking."
    ],
    correct: 0,
    explanation: "Giving one object to each person in turn helps make an equal share."
  },

  {
    type: "true-false",
    question: "When making equal groups, every group should have the same number.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Equal groups have the same number of objects."
  },

  {
    type: "number",
    question: "5 children each get 1 sticker. How many stickers are needed altogether?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "Five groups of 1 make 5 stickers altogether."
  },

  {
    type: "single",
    question: "Which shows 2 groups of 3?",
    answers: [
      "●●●   ●●●",
      "●●   ●●   ●●",
      "●●●●   ●●"
    ],
    correct: 0,
    explanation: "There are 2 groups and each group has 3 objects."
  },

  {
    type: "number",
    question: "There are 6 balls. Put 3 balls in each group. How many groups are made?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "6 balls make 2 groups of 3."
  },

  {
    type: "single",
    question: "Which share is fair for 8 blocks and 4 children?",
    answers: [
      "2, 2, 2, 2",
      "1, 2, 2, 3",
      "4, 2, 1, 1"
    ],
    correct: 0,
    explanation: "Each child gets 2 blocks."
  },

  {
    type: "true-false",
    question: "Three groups containing 4, 4 and 4 objects are equal groups.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Every group contains 4 objects."
  },

  {
    type: "number",
    question: "12 counters are shared equally between 3 children. How many counters does each child receive?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "12 shared between 3 children gives 4 each."
  },


  /* =======================================================
     MEDIUM
     QUESTIONS 36–70
     ======================================================= */

  {
    type: "number",
    question: "12 toy animals are placed into groups of 3. How many equal groups are made?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "12 makes 4 groups of 3."
  },

  {
    type: "single",
    question: "10 cookies are shared between 5 children. How many cookies does each child get?",
    answers: [
      "1",
      "2",
      "5"
    ],
    correct: 1,
    explanation: "Each child receives 2 cookies."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "12 objects shared into 4 equal groups gives {{blank}} in each group.",
    placeholder: "?",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "Each group contains 3 objects."
  },

  {
    type: "single",
    question: "There are 8 counters. Mia makes 2 equal groups. Sam makes 4 equal groups. Which is true?",
    answers: [
      "Mia has more counters in each group.",
      "Sam has more counters in each group.",
      "They have the same number in each group."
    ],
    correct: 0,
    explanation: "Mia has 4 in each group. Sam has 2 in each group."
  },

  {
    type: "number",
    question: "15 blocks are placed into 3 equal groups. How many blocks are in each group?",
    placeholder: "Type the number",
    correct: 5,
    tolerance: 0,
    explanation: "15 shared into 3 equal groups gives 5 in each."
  },

  {
    type: "true-false",
    question: "12 objects can make 4 equal groups of 3.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 3 + 3 + 3 + 3 makes 12."
  },

  {
    type: "true-false",
    question: "10 objects can make 3 equal groups with no objects left.",
    answers: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. 10 cannot be split into 3 equal whole-number groups without something left."
  },

  {
    type: "single",
    question: "Which arrangement uses all 12 counters in equal groups?",
    answers: [
      "3, 3, 3, 3",
      "3, 3, 3, 2",
      "4, 4, 3"
    ],
    correct: 0,
    explanation: "Four groups of 3 use all 12 counters."
  },

  {
    type: "number",
    question: "14 pencils are shared equally between 2 children. How many pencils does each child get?",
    placeholder: "Type the number",
    correct: 7,
    tolerance: 0,
    explanation: "Each child gets 7 pencils."
  },

  {
    type: "fill-blank",
    question: "Complete the sentence.",
    template: "3 equal groups of 4 contain {{blank}} objects altogether.",
    placeholder: "?",
    acceptedAnswers: [
      ["12", "twelve"]
    ],
    explanation: "4 + 4 + 4 = 12."
  },

  {
    type: "number",
    question: "4 children each receive 3 counters. How many counters are needed altogether?",
    placeholder: "Type the number",
    correct: 12,
    tolerance: 0,
    explanation: "Four equal groups of 3 contain 12 counters."
  },

  {
    type: "single",
    question: "A teacher has 12 stickers and gives 3 to each child. How many children can receive stickers?",
    answers: [
      "3",
      "4",
      "6"
    ],
    correct: 1,
    explanation: "12 stickers make 4 groups of 3."
  },

  {
    type: "number",
    question: "16 buttons are placed into groups of 4. How many groups are made?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "16 makes 4 groups of 4."
  },

  {
    type: "true-false",
    question: "Sharing 12 objects between 4 children gives each child 3 objects.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Each child receives 3."
  },

  {
    type: "single",
    question: "Which question is about equal sharing?",
    answers: [
      "Share 8 apples fairly between 4 children.",
      "Count 8 apples.",
      "Find the red apple."
    ],
    correct: 0,
    explanation: "Equal sharing asks us to distribute a collection fairly."
  },

  {
    type: "single",
    question: "Which question is about equal grouping?",
    answers: [
      "Put 12 blocks into groups of 3.",
      "Colour 12 blocks.",
      "Count backwards from 12."
    ],
    correct: 0,
    explanation: "Grouping asks us to make groups of a given equal size."
  },

  {
    type: "number",
    question: "18 counters are shared equally between 3 children. How many counters does each child get?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "18 shared between 3 gives 6 each."
  },

  {
    type: "fill-blank",
    question: "Find the missing amount.",
    template: "4 equal groups of {{blank}} make 16 objects.",
    placeholder: "?",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "4 groups of 4 make 16."
  },

  {
    type: "multiple",
    question: "Which arrangements show equal groups?",
    instruction: "Select every correct answer.",
    answers: [
      "2, 2, 2",
      "3, 3",
      "2, 3, 2",
      "4, 4, 4"
    ],
    correct: [0, 1, 3],
    explanation: "Equal groups contain the same number in every group."
  },

  {
    type: "multiple",
    question: "Which are fair shares between 2 children?",
    instruction: "Select every fair share.",
    answers: [
      "2 and 2",
      "4 and 4",
      "3 and 5",
      "6 and 6"
    ],
    correct: [0, 1, 3],
    explanation: "A fair share gives both children the same number."
  },

  {
    type: "single",
    question: "There are 15 beads. Which equal grouping uses all the beads?",
    answers: [
      "3 groups of 5",
      "4 groups of 4",
      "2 groups of 6"
    ],
    correct: 0,
    explanation: "Three groups of 5 contain all 15 beads."
  },

  {
    type: "number",
    question: "20 counters are put into 5 equal groups. How many counters are in each group?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "Each group contains 4 counters."
  },

  {
    type: "true-false",
    question: "If 3 children each get 4 blocks, 12 blocks are used altogether.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. 4 + 4 + 4 = 12."
  },

  {
    type: "number",
    question: "There are 12 oranges. Put 2 oranges in each bag. How many bags are needed?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "12 oranges make 6 groups of 2."
  },

  {
    type: "fill-blank",
    question: "Complete the grouping statement.",
    template: "10 objects make {{blank}} equal groups of 2.",
    placeholder: "?",
    acceptedAnswers: [
      ["5", "five"]
    ],
    explanation: "10 makes 5 groups of 2."
  },

  {
    type: "single",
    question: "Eight toys are shared equally between 4 children. Which statement is correct?",
    answers: [
      "Each gets 1 toy.",
      "Each gets 2 toys.",
      "Each gets 4 toys."
    ],
    correct: 1,
    explanation: "Each child gets 2 toys."
  },

  {
    type: "number",
    question: "Three plates each have 5 strawberries. How many strawberries are there altogether?",
    placeholder: "Type the number",
    correct: 15,
    tolerance: 0,
    explanation: "Three equal groups of 5 make 15."
  },

  {
    type: "multiple",
    question: "Which collections can be shared equally between 2 children with nothing left?",
    instruction: "Select every correct answer.",
    answers: [
      "4 objects",
      "6 objects",
      "7 objects",
      "10 objects"
    ],
    correct: [0, 1, 3],
    explanation: "4, 6 and 10 can each be split into two equal whole-number groups."
  },

  {
    type: "number",
    question: "A teacher makes 4 equal groups from 12 children. How many children are in each group?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "There are 3 children in each group."
  },

  {
    type: "true-false",
    question: "Four groups of 2 and two groups of 4 both use 8 objects.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Both arrangements use 8 objects."
  },

  {
    type: "single",
    question: "Which uses MORE groups when arranging 12 counters?",
    answers: [
      "Groups of 2",
      "Groups of 4",
      "They use the same number of groups."
    ],
    correct: 0,
    explanation: "Groups of 2 make 6 groups, while groups of 4 make 3 groups."
  },

  {
    type: "single",
    question: "Which gives MORE objects to each child when sharing 12 objects?",
    answers: [
      "Sharing between 2 children",
      "Sharing between 4 children",
      "Both give the same amount."
    ],
    correct: 0,
    explanation: "Sharing between fewer children gives more to each child."
  },

  {
    type: "number",
    question: "12 blocks are shared equally between 6 children. How many does each child get?",
    placeholder: "Type the number",
    correct: 2,
    tolerance: 0,
    explanation: "Each child receives 2 blocks."
  },

  {
    type: "fill-blank",
    question: "Complete the fair-share sentence.",
    template: "15 counters shared equally between 5 children gives {{blank}} counters each.",
    placeholder: "?",
    acceptedAnswers: [
      ["3", "three"]
    ],
    explanation: "Each child gets 3 counters."
  },

  {
    type: "multiple",
    question: "Which statements about equal groups are true?",
    instruction: "Select every true statement.",
    answers: [
      "Every group has the same number.",
      "Groups may have different numbers.",
      "We can count the groups.",
      "We can count how many are in each group."
    ],
    correct: [0, 2, 3],
    explanation: "Equal groups have the same amount, and we can count both the groups and the objects in each group."
  },


  /* =======================================================
     CHALLENGE / REASONING
     QUESTIONS 71–100
     ======================================================= */

  {
    type: "single",
    question: "There are 12 counters. Which arrangement has the MOST groups?",
    answers: [
      "Groups of 2",
      "Groups of 3",
      "Groups of 4"
    ],
    correct: 0,
    explanation: "Groups of 2 make 6 groups, which is the most."
  },

  {
    type: "single",
    question: "There are 12 counters. Which arrangement has the FEWEST groups?",
    answers: [
      "Groups of 2",
      "Groups of 3",
      "Groups of 4"
    ],
    correct: 2,
    explanation: "Groups of 4 make only 3 groups."
  },

  {
    type: "number",
    question: "Three children receive 4 stickers each. How many stickers were shared altogether?",
    placeholder: "Type the number",
    correct: 12,
    tolerance: 0,
    explanation: "4 + 4 + 4 = 12 stickers."
  },

  {
    type: "number",
    question: "Five bags each contain 3 apples. How many apples are there altogether?",
    placeholder: "Type the number",
    correct: 15,
    tolerance: 0,
    explanation: "Five equal groups of 3 make 15."
  },

  {
    type: "single",
    question: "Kai has 12 blocks. He makes 3 equal groups. Ava makes 4 equal groups with 12 blocks. Who has more blocks in each group?",
    answers: [
      "Kai",
      "Ava",
      "They have the same amount."
    ],
    correct: 0,
    explanation: "Kai has 4 in each group. Ava has 3 in each group."
  },

  {
    type: "true-false",
    question: "If the same collection is shared between more children, each child usually gets fewer objects.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. The same collection is being split into more shares."
  },

  {
    type: "true-false",
    question: "If we use larger group sizes, we usually make fewer groups from the same collection.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Bigger groups use more objects in each group."
  },

  {
    type: "single",
    question: "Which number cannot be shared equally between 2 children using whole objects?",
    answers: [
      "8",
      "10",
      "11"
    ],
    correct: 2,
    explanation: "11 cannot be split into two equal whole-number groups."
  },

  {
    type: "multiple",
    question: "Which equal groupings use exactly 12 objects?",
    instruction: "Select every correct answer.",
    answers: [
      "2 groups of 6",
      "3 groups of 4",
      "4 groups of 3",
      "5 groups of 2"
    ],
    correct: [0, 1, 2],
    explanation: "2 groups of 6, 3 groups of 4 and 4 groups of 3 all contain 12 objects."
  },

  {
    type: "multiple",
    question: "Which fair shares use exactly 12 objects?",
    instruction: "Select every correct answer.",
    answers: [
      "2 children get 6 each",
      "3 children get 4 each",
      "4 children get 3 each",
      "5 children get 3 each"
    ],
    correct: [0, 1, 2],
    explanation: "The first three arrangements each use 12 objects."
  },

  {
    type: "number",
    question: "There are 18 counters. Each group must have 3 counters. How many groups can be made?",
    placeholder: "Type the number",
    correct: 6,
    tolerance: 0,
    explanation: "18 counters make 6 groups of 3."
  },

  {
    type: "number",
    question: "There are 18 counters in 6 equal groups. How many counters are in each group?",
    placeholder: "Type the number",
    correct: 3,
    tolerance: 0,
    explanation: "Each of the 6 groups contains 3 counters."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "{{blank}} equal groups of 4 use 16 objects.",
    placeholder: "?",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "Four groups of 4 make 16."
  },

  {
    type: "fill-blank",
    question: "Find the missing number.",
    template: "20 objects shared between {{blank}} children gives 5 objects each.",
    placeholder: "?",
    acceptedAnswers: [
      ["4", "four"]
    ],
    explanation: "Four children getting 5 each uses 20 objects."
  },

  {
    type: "single",
    question: "A teacher has 16 pencils. Which plan shares ALL the pencils equally?",
    answers: [
      "4 children get 4 each",
      "3 children get 5 each",
      "5 children get 3 each"
    ],
    correct: 0,
    explanation: "4 children getting 4 each uses all 16 pencils."
  },

  {
    type: "single",
    question: "There are 10 counters. Four children each get 2 counters. How many counters are left?",
    answers: [
      "0",
      "2",
      "4"
    ],
    correct: 1,
    explanation: "Four children use 8 counters, so 2 are left."
  },

  {
    type: "true-false",
    question: "If objects are left after making the groups, all the objects have not been shared into those equal groups.",
    answers: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Leftover objects have not been placed into the equal groups."
  },

  {
    type: "multiple",
    question: "Which collections can make equal groups of 4 with nothing left?",
    instruction: "Select every correct answer.",
    answers: [
      "8",
      "12",
      "14",
      "16"
    ],
    correct: [0, 1, 3],
    explanation: "8, 12 and 16 can be arranged into complete groups of 4."
  },

  {
    type: "order",
    question: "Arrange these from the fewest groups to the most groups.",
    instruction: "All arrangements use 12 objects.",
    items: [
      "Groups of 2",
      "Groups of 4",
      "Groups of 3"
    ],
    correct: [
      "Groups of 4",
      "Groups of 3",
      "Groups of 2"
    ],
    explanation: "12 makes 3 groups of 4, 4 groups of 3 and 6 groups of 2."
  },

  {
    type: "order",
    question: "Arrange these fair shares from the smallest amount per child to the largest amount per child.",
    instruction: "There are 12 objects altogether.",
    items: [
      "Share between 2 children",
      "Share between 6 children",
      "Share between 3 children"
    ],
    correct: [
      "Share between 6 children",
      "Share between 3 children",
      "Share between 2 children"
    ],
    explanation: "The children receive 2 each, 4 each and 6 each."
  },

  {
    type: "drag-drop",
    question: "Arrange these groupings from the smallest group size to the largest group size.",
    instruction: "Drag the cards into order. You can also use the arrows.",
    items: [
      "3 groups of 4",
      "6 groups of 2",
      "4 groups of 3"
    ],
    correct: [
      "6 groups of 2",
      "4 groups of 3",
      "3 groups of 4"
    ],
    explanation: "The group sizes are 2, then 3, then 4."
  },

  {
    type: "drag-drop",
    question: "Arrange these shares from the fewest objects each to the most objects each.",
    instruction: "Each situation starts with 12 objects.",
    items: [
      "2 children",
      "4 children",
      "6 children"
    ],
    correct: [
      "6 children",
      "4 children",
      "2 children"
    ],
    explanation: "They receive 2 each, 3 each and 6 each."
  },

  {
    type: "single",
    question: "Luca says 12 objects shared between 3 children gives 3 each. What mistake did Luca make?",
    answers: [
      "Each child should get 4.",
      "Each child should get 6.",
      "Luca is correct."
    ],
    correct: 0,
    explanation: "12 shared between 3 children gives 4 each."
  },

  {
    type: "single",
    question: "Zoe says 15 counters make 5 groups of 3. Is Zoe correct?",
    answers: [
      "Yes",
      "No"
    ],
    correct: 0,
    explanation: "Yes. Five groups of 3 contain 15 counters."
  },

  {
    type: "multiple",
    question: "A collection has 16 objects. Which arrangements are possible with equal groups and nothing left?",
    instruction: "Select every correct answer.",
    answers: [
      "2 groups of 8",
      "4 groups of 4",
      "8 groups of 2",
      "3 groups of 5"
    ],
    correct: [0, 1, 2],
    explanation: "The first three arrangements each use all 16 objects."
  },

  {
    type: "number",
    question: "A class makes 5 equal groups with 20 counters. How many counters go in each group?",
    placeholder: "Type the number",
    correct: 4,
    tolerance: 0,
    explanation: "Each group contains 4 counters."
  },

  {
    type: "single",
    question: "There are 12 cupcakes. Which plan gives each child the MOST cupcakes?",
    answers: [
      "Share between 2 children",
      "Share between 3 children",
      "Share between 4 children"
    ],
    correct: 0,
    explanation: "Sharing between 2 children gives 6 cupcakes each."
  },

  {
    type: "single",
    question: "There are 12 cupcakes. Which plan gives each child the FEWEST cupcakes?",
    answers: [
      "Share between 2 children",
      "Share between 3 children",
      "Share between 4 children"
    ],
    correct: 2,
    explanation: "Sharing between 4 children gives 3 cupcakes each."
  },

  {
    type: "multiple",
    question: "Which statements are true for 12 objects?",
    instruction: "Select every true statement.",
    answers: [
      "They can make 6 groups of 2.",
      "They can make 4 groups of 3.",
      "They can make 3 groups of 4.",
      "They can make 5 groups of 3."
    ],
    correct: [0, 1, 2],
    explanation: "6 groups of 2, 4 groups of 3 and 3 groups of 4 all use exactly 12 objects."
  },

  {
    type: "multiple",
    question: "Which statements show a fair equal share?",
    instruction: "Select every correct answer.",
    answers: [
      "12 stickers: 3 children get 4 each",
      "10 apples: 2 children get 5 each",
      "8 blocks: 4 children get 2 each",
      "9 pencils: 2 children get 4 and 5"
    ],
    correct: [0, 1, 2],
    explanation: "A fair share gives every child the same number."
  }

];


/* =========================================================
   QUIZ CONFIGURATION
   ========================================================= */

window.quizConfig = {

  shuffleQuestions: true,

  shuffleAnswers: false,

  maxQuestions: 5,

  caseSensitiveText: false,

  storageKey:
    "AC9MFN06EqualSharingGroupingBestScore"

};
