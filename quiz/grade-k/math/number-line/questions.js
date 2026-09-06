"use strict";

/* =========================================================
   FOUNDATION NUMBER LINE DAILY PRACTICE
   Numbers 0–20

   200-question bank
   5 random questions per attempt

   Includes:
   - single choice
   - true / false
   - number entry
   - fill in the blank
   - multiple selection
   - ordering
   - drag and drop
   - text entry
   ========================================================= */

window.quizQuestions = [
  {
    "type": "single",
    "question": "Which number comes after 1?",
    "answers": [
      "1",
      "2",
      "3"
    ],
    "correct": 1,
    "explanation": "2 comes after 1 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 2?",
    "answers": [
      "2",
      "3",
      "4"
    ],
    "correct": 1,
    "explanation": "3 comes after 2 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 3?",
    "answers": [
      "3",
      "4",
      "5"
    ],
    "correct": 1,
    "explanation": "4 comes after 3 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 4?",
    "answers": [
      "4",
      "5",
      "6"
    ],
    "correct": 1,
    "explanation": "5 comes after 4 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 5?",
    "answers": [
      "5",
      "6",
      "7"
    ],
    "correct": 1,
    "explanation": "6 comes after 5 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 6?",
    "answers": [
      "6",
      "7",
      "8"
    ],
    "correct": 1,
    "explanation": "7 comes after 6 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 7?",
    "answers": [
      "7",
      "8",
      "9"
    ],
    "correct": 1,
    "explanation": "8 comes after 7 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 8?",
    "answers": [
      "8",
      "9",
      "10"
    ],
    "correct": 1,
    "explanation": "9 comes after 8 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 9?",
    "answers": [
      "9",
      "10",
      "11"
    ],
    "correct": 1,
    "explanation": "10 comes after 9 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes after 10?",
    "answers": [
      "10",
      "11",
      "12"
    ],
    "correct": 1,
    "explanation": "11 comes after 10 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 2?",
    "answers": [
      "0",
      "1",
      "2"
    ],
    "correct": 1,
    "explanation": "1 comes before 2 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 3?",
    "answers": [
      "1",
      "2",
      "3"
    ],
    "correct": 1,
    "explanation": "2 comes before 3 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 4?",
    "answers": [
      "2",
      "3",
      "4"
    ],
    "correct": 1,
    "explanation": "3 comes before 4 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 5?",
    "answers": [
      "3",
      "4",
      "5"
    ],
    "correct": 1,
    "explanation": "4 comes before 5 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 6?",
    "answers": [
      "4",
      "5",
      "6"
    ],
    "correct": 1,
    "explanation": "5 comes before 6 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 7?",
    "answers": [
      "5",
      "6",
      "7"
    ],
    "correct": 1,
    "explanation": "6 comes before 7 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 8?",
    "answers": [
      "6",
      "7",
      "8"
    ],
    "correct": 1,
    "explanation": "7 comes before 8 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 9?",
    "answers": [
      "7",
      "8",
      "9"
    ],
    "correct": 1,
    "explanation": "8 comes before 9 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 10?",
    "answers": [
      "8",
      "9",
      "10"
    ],
    "correct": 1,
    "explanation": "9 comes before 10 on a number line."
  },
  {
    "type": "single",
    "question": "Which number comes before 11?",
    "answers": [
      "9",
      "10",
      "11"
    ],
    "correct": 1,
    "explanation": "10 comes before 11 on a number line."
  },
  {
    "type": "single",
    "question": "Which number is between 2 and 4?",
    "answers": [
      "2",
      "3",
      "4"
    ],
    "correct": 1,
    "explanation": "3 is between 2 and 4."
  },
  {
    "type": "single",
    "question": "Which number is between 3 and 5?",
    "answers": [
      "3",
      "4",
      "5"
    ],
    "correct": 1,
    "explanation": "4 is between 3 and 5."
  },
  {
    "type": "single",
    "question": "Which number is between 4 and 6?",
    "answers": [
      "4",
      "5",
      "6"
    ],
    "correct": 1,
    "explanation": "5 is between 4 and 6."
  },
  {
    "type": "single",
    "question": "Which number is between 5 and 7?",
    "answers": [
      "5",
      "6",
      "7"
    ],
    "correct": 1,
    "explanation": "6 is between 5 and 7."
  },
  {
    "type": "single",
    "question": "Which number is between 6 and 8?",
    "answers": [
      "6",
      "7",
      "8"
    ],
    "correct": 1,
    "explanation": "7 is between 6 and 8."
  },
  {
    "type": "single",
    "question": "Which number is between 7 and 9?",
    "answers": [
      "7",
      "8",
      "9"
    ],
    "correct": 1,
    "explanation": "8 is between 7 and 9."
  },
  {
    "type": "single",
    "question": "Which number is between 8 and 10?",
    "answers": [
      "8",
      "9",
      "10"
    ],
    "correct": 1,
    "explanation": "9 is between 8 and 10."
  },
  {
    "type": "single",
    "question": "Which number is between 9 and 11?",
    "answers": [
      "9",
      "10",
      "11"
    ],
    "correct": 1,
    "explanation": "10 is between 9 and 11."
  },
  {
    "type": "single",
    "question": "Which number is between 10 and 12?",
    "answers": [
      "10",
      "11",
      "12"
    ],
    "correct": 1,
    "explanation": "11 is between 10 and 12."
  },
  {
    "type": "single",
    "question": "Which number is between 11 and 13?",
    "answers": [
      "11",
      "12",
      "13"
    ],
    "correct": 1,
    "explanation": "12 is between 11 and 13."
  },
  {
    "type": "single",
    "question": "On a number line, which direction usually takes you to bigger numbers?",
    "answers": [
      "Left",
      "Right",
      "Down"
    ],
    "correct": 1,
    "explanation": "Numbers usually get bigger as you move to the right."
  },
  {
    "type": "single",
    "question": "On a number line, which direction usually takes you to smaller numbers?",
    "answers": [
      "Left",
      "Right",
      "Up"
    ],
    "correct": 0,
    "explanation": "Numbers usually get smaller as you move to the left."
  },
  {
    "type": "single",
    "question": "Which number is closest to 20?",
    "answers": [
      "7",
      "14",
      "19"
    ],
    "correct": 2,
    "explanation": "19 is only one step away from 20."
  },
  {
    "type": "single",
    "question": "Which number is closest to 0?",
    "answers": [
      "1",
      "6",
      "10"
    ],
    "correct": 0,
    "explanation": "1 is only one step away from 0."
  },
  {
    "type": "single",
    "question": "Which number should replace the question mark?",
    "answers": [
      "2",
      "3",
      "5"
    ],
    "correct": 1,
    "explanation": "The missing number is 3.",
    "visual": "0 — 1 — 2 — ? — 4"
  },
  {
    "type": "single",
    "question": "Which number should replace the question mark?",
    "answers": [
      "14",
      "17",
      "20"
    ],
    "correct": 1,
    "explanation": "17 comes between 16 and 18.",
    "visual": "15 — 16 — ? — 18 — 19"
  },
  {
    "type": "single",
    "question": "Start at 6 and move 2 steps to the right. Where do you land?",
    "answers": [
      "4",
      "8",
      "9"
    ],
    "correct": 1,
    "explanation": "Moving right two steps from 6 lands on 8."
  },
  {
    "type": "single",
    "question": "Start at 10 and move 3 steps to the left. Where do you land?",
    "answers": [
      "7",
      "8",
      "13"
    ],
    "correct": 0,
    "explanation": "Moving left three steps from 10 lands on 7."
  },
  {
    "type": "single",
    "question": "Which number is greater?",
    "answers": [
      "9",
      "12",
      "They are equal"
    ],
    "correct": 1,
    "explanation": "12 is farther to the right than 9 on a number line."
  },
  {
    "type": "single",
    "question": "Which number is smaller?",
    "answers": [
      "5",
      "11",
      "They are equal"
    ],
    "correct": 0,
    "explanation": "5 is farther to the left than 11 on a number line."
  },
  {
    "type": "number",
    "question": "Start at 0. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 2,
    "tolerance": 0,
    "explanation": "0 → 1 → 2. You reach 2."
  },
  {
    "type": "number",
    "question": "Start at 1. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 3,
    "tolerance": 0,
    "explanation": "1 → 2 → 3. You reach 3."
  },
  {
    "type": "number",
    "question": "Start at 2. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 4,
    "tolerance": 0,
    "explanation": "2 → 3 → 4. You reach 4."
  },
  {
    "type": "number",
    "question": "Start at 3. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 5,
    "tolerance": 0,
    "explanation": "3 → 4 → 5. You reach 5."
  },
  {
    "type": "number",
    "question": "Start at 4. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 6,
    "tolerance": 0,
    "explanation": "4 → 5 → 6. You reach 6."
  },
  {
    "type": "number",
    "question": "Start at 5. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 7,
    "tolerance": 0,
    "explanation": "5 → 6 → 7. You reach 7."
  },
  {
    "type": "number",
    "question": "Start at 6. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 8,
    "tolerance": 0,
    "explanation": "6 → 7 → 8. You reach 8."
  },
  {
    "type": "number",
    "question": "Start at 7. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 9,
    "tolerance": 0,
    "explanation": "7 → 8 → 9. You reach 9."
  },
  {
    "type": "number",
    "question": "Start at 8. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 10,
    "tolerance": 0,
    "explanation": "8 → 9 → 10. You reach 10."
  },
  {
    "type": "number",
    "question": "Start at 9. Move 2 steps to the right. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 11,
    "tolerance": 0,
    "explanation": "9 → 10 → 11. You reach 11."
  },
  {
    "type": "number",
    "question": "Start at 5. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 3,
    "tolerance": 0,
    "explanation": "5 → 4 → 3. You reach 3."
  },
  {
    "type": "number",
    "question": "Start at 6. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 4,
    "tolerance": 0,
    "explanation": "6 → 5 → 4. You reach 4."
  },
  {
    "type": "number",
    "question": "Start at 7. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 5,
    "tolerance": 0,
    "explanation": "7 → 6 → 5. You reach 5."
  },
  {
    "type": "number",
    "question": "Start at 8. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 6,
    "tolerance": 0,
    "explanation": "8 → 7 → 6. You reach 6."
  },
  {
    "type": "number",
    "question": "Start at 9. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 7,
    "tolerance": 0,
    "explanation": "9 → 8 → 7. You reach 7."
  },
  {
    "type": "number",
    "question": "Start at 10. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 8,
    "tolerance": 0,
    "explanation": "10 → 9 → 8. You reach 8."
  },
  {
    "type": "number",
    "question": "Start at 11. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 9,
    "tolerance": 0,
    "explanation": "11 → 10 → 9. You reach 9."
  },
  {
    "type": "number",
    "question": "Start at 12. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 10,
    "tolerance": 0,
    "explanation": "12 → 11 → 10. You reach 10."
  },
  {
    "type": "number",
    "question": "Start at 13. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 11,
    "tolerance": 0,
    "explanation": "13 → 12 → 11. You reach 11."
  },
  {
    "type": "number",
    "question": "Start at 14. Move 2 steps to the left. What number do you reach?",
    "placeholder": "Type the number",
    "correct": 12,
    "tolerance": 0,
    "explanation": "14 → 13 → 12. You reach 12."
  },
  {
    "type": "number",
    "question": "What number is halfway between 0 and 2 on this number line?",
    "visual": "0 — ? — 2",
    "placeholder": "Type the number",
    "correct": 1,
    "tolerance": 0,
    "explanation": "1 is between 0 and 2."
  },
  {
    "type": "number",
    "question": "What number is halfway between 3 and 5 on this number line?",
    "visual": "3 — ? — 5",
    "placeholder": "Type the number",
    "correct": 4,
    "tolerance": 0,
    "explanation": "4 is between 3 and 5."
  },
  {
    "type": "number",
    "question": "What number is halfway between 5 and 7 on this number line?",
    "visual": "5 — ? — 7",
    "placeholder": "Type the number",
    "correct": 6,
    "tolerance": 0,
    "explanation": "6 is between 5 and 7."
  },
  {
    "type": "number",
    "question": "What number is halfway between 7 and 9 on this number line?",
    "visual": "7 — ? — 9",
    "placeholder": "Type the number",
    "correct": 8,
    "tolerance": 0,
    "explanation": "8 is between 7 and 9."
  },
  {
    "type": "number",
    "question": "What number is halfway between 9 and 11 on this number line?",
    "visual": "9 — ? — 11",
    "placeholder": "Type the number",
    "correct": 10,
    "tolerance": 0,
    "explanation": "10 is between 9 and 11."
  },
  {
    "type": "number",
    "question": "What number is halfway between 11 and 13 on this number line?",
    "visual": "11 — ? — 13",
    "placeholder": "Type the number",
    "correct": 12,
    "tolerance": 0,
    "explanation": "12 is between 11 and 13."
  },
  {
    "type": "number",
    "question": "What number is halfway between 13 and 15 on this number line?",
    "visual": "13 — ? — 15",
    "placeholder": "Type the number",
    "correct": 14,
    "tolerance": 0,
    "explanation": "14 is between 13 and 15."
  },
  {
    "type": "number",
    "question": "What number is halfway between 15 and 17 on this number line?",
    "visual": "15 — ? — 17",
    "placeholder": "Type the number",
    "correct": 16,
    "tolerance": 0,
    "explanation": "16 is between 15 and 17."
  },
  {
    "type": "number",
    "question": "What number is halfway between 17 and 19 on this number line?",
    "visual": "17 — ? — 19",
    "placeholder": "Type the number",
    "correct": 18,
    "tolerance": 0,
    "explanation": "18 is between 17 and 19."
  },
  {
    "type": "number",
    "question": "What number is halfway between 18 and 20 on this number line?",
    "visual": "18 — ? — 20",
    "placeholder": "Type the number",
    "correct": 19,
    "tolerance": 0,
    "explanation": "19 is between 18 and 20."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "0 — {{blank}} — 2 — 3",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "1",
        "one"
      ]
    ],
    "explanation": "The missing number is 1."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "1 — 2 — {{blank}} — 4",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "3",
        "three"
      ]
    ],
    "explanation": "The missing number is 3."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "2 — {{blank}} — 4 — 5",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "3",
        "three"
      ]
    ],
    "explanation": "The missing number is 3."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "3 — 4 — {{blank}} — 6",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "5",
        "five"
      ]
    ],
    "explanation": "The missing number is 5."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "4 — {{blank}} — 6 — 7",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "5",
        "five"
      ]
    ],
    "explanation": "The missing number is 5."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "5 — 6 — {{blank}} — 8",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "7",
        "seven"
      ]
    ],
    "explanation": "The missing number is 7."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "6 — {{blank}} — 8 — 9",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "7",
        "seven"
      ]
    ],
    "explanation": "The missing number is 7."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "7 — 8 — {{blank}} — 10",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "9",
        "nine"
      ]
    ],
    "explanation": "The missing number is 9."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "8 — {{blank}} — 10 — 11",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "9",
        "nine"
      ]
    ],
    "explanation": "The missing number is 9."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "9 — 10 — {{blank}} — 12",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "11",
        "eleven"
      ]
    ],
    "explanation": "The missing number is 11."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "0 — {{blank}} — 2 — 3",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "1",
        "one"
      ]
    ],
    "explanation": "The missing number is 1."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "1 — 2 — {{blank}} — 4",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "3",
        "three"
      ]
    ],
    "explanation": "The missing number is 3."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "2 — {{blank}} — 4 — 5",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "3",
        "three"
      ]
    ],
    "explanation": "The missing number is 3."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "3 — 4 — {{blank}} — 6",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "5",
        "five"
      ]
    ],
    "explanation": "The missing number is 5."
  },
  {
    "type": "fill-blank",
    "question": "Fill in the missing number.",
    "template": "4 — {{blank}} — 6 — 7",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "5",
        "five"
      ]
    ],
    "explanation": "The missing number is 5."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "10 — {{blank}} — 8 — 7",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "9",
        "nine"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 9."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "11 — 10 — {{blank}} — 8",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "9",
        "nine"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 9."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "12 — {{blank}} — 10 — 9",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "11",
        "eleven"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 11."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "13 — 12 — {{blank}} — 10",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "11",
        "eleven"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 11."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "14 — {{blank}} — 12 — 11",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "13",
        "thirteen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 13."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "15 — 14 — {{blank}} — 12",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "13",
        "thirteen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 13."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "16 — {{blank}} — 14 — 13",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "15",
        "fifteen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 15."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "17 — 16 — {{blank}} — 14",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "15",
        "fifteen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 15."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "18 — {{blank}} — 16 — 15",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "17",
        "seventeen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 17."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "19 — 18 — {{blank}} — 16",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "17",
        "seventeen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 17."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "20 — {{blank}} — 18 — 17",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "19",
        "nineteen"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 19."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "10 — 9 — {{blank}} — 7",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "8",
        "eight"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 8."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "11 — {{blank}} — 9 — 8",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "10",
        "ten"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 10."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "12 — 11 — {{blank}} — 9",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "10",
        "ten"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 10."
  },
  {
    "type": "fill-blank",
    "question": "Count backwards and fill in the missing number.",
    "template": "13 — {{blank}} — 11 — 10",
    "placeholder": "?",
    "acceptedAnswers": [
      [
        "12",
        "twelve"
      ]
    ],
    "explanation": "When counting backwards, the missing number is 12."
  },
  {
    "type": "true-false",
    "question": "7 comes after 6.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "7 comes immediately after 6."
  },
  {
    "type": "true-false",
    "question": "9 comes before 8.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "9 comes after 8, not before it."
  },
  {
    "type": "true-false",
    "question": "0 is to the left of 1 on a usual number line.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "0 is smaller than 1, so it is to the left."
  },
  {
    "type": "true-false",
    "question": "20 is greater than 19.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "20 is one more than 19."
  },
  {
    "type": "true-false",
    "question": "5 is between 4 and 6.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "5 comes between 4 and 6."
  },
  {
    "type": "true-false",
    "question": "12 is smaller than 10.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "12 is greater than 10."
  },
  {
    "type": "true-false",
    "question": "Moving right usually makes numbers larger.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "On a usual number line, values increase to the right."
  },
  {
    "type": "true-false",
    "question": "Moving left usually makes numbers larger.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "Moving left usually makes numbers smaller."
  },
  {
    "type": "true-false",
    "question": "3 is one more than 2.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "2 + 1 = 3."
  },
  {
    "type": "true-false",
    "question": "8 is one less than 9.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "9 - 1 = 8."
  },
  {
    "type": "true-false",
    "question": "10 is between 9 and 11.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "10 comes between 9 and 11."
  },
  {
    "type": "true-false",
    "question": "14 comes before 13.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "13 comes before 14."
  },
  {
    "type": "true-false",
    "question": "18 comes after 17.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "18 is one more than 17."
  },
  {
    "type": "true-false",
    "question": "1 is closer to 0 than 5 is.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "1 is one step from 0, while 5 is five steps away."
  },
  {
    "type": "true-false",
    "question": "19 is closer to 20 than 15 is.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "19 is one step from 20."
  },
  {
    "type": "true-false",
    "question": "6 and 8 have 7 between them.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "7 is between 6 and 8."
  },
  {
    "type": "true-false",
    "question": "2 is greater than 7.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "2 is smaller than 7."
  },
  {
    "type": "true-false",
    "question": "11 is less than 15.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "11 is to the left of 15."
  },
  {
    "type": "true-false",
    "question": "16 is more than 13.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "16 is greater than 13."
  },
  {
    "type": "true-false",
    "question": "0 is a number.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Zero is a number and can be shown on a number line."
  },
  {
    "type": "true-false",
    "question": "If you move one step right from 4, you reach 5.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "4 → 5."
  },
  {
    "type": "true-false",
    "question": "If you move two steps left from 8, you reach 7.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "8 → 7 → 6."
  },
  {
    "type": "true-false",
    "question": "If you move three steps right from 10, you reach 13.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "10 → 11 → 12 → 13."
  },
  {
    "type": "true-false",
    "question": "If you move one step left from 1, you reach 0.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "1 → 0."
  },
  {
    "type": "true-false",
    "question": "20 can appear to the left of 5 on a usual increasing number line.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "On a usual increasing number line, 20 is to the right of 5."
  },
  {
    "type": "multiple",
    "question": "Select every number greater than 5.",
    "instruction": "Select all correct answers.",
    "answers": [
      "3",
      "6",
      "8",
      "4"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "6 and 8 are greater than 5."
  },
  {
    "type": "multiple",
    "question": "Select every number less than 10.",
    "instruction": "Select all correct answers.",
    "answers": [
      "7",
      "11",
      "9",
      "12"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "7 and 9 are less than 10."
  },
  {
    "type": "multiple",
    "question": "Select every number between 4 and 9.",
    "instruction": "Select all correct answers.",
    "answers": [
      "3",
      "5",
      "7",
      "10"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "5 and 7 are between 4 and 9."
  },
  {
    "type": "multiple",
    "question": "Select every number that comes after 12.",
    "instruction": "Select all correct answers.",
    "answers": [
      "10",
      "13",
      "15",
      "11"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "13 and 15 come after 12."
  },
  {
    "type": "multiple",
    "question": "Select every number that comes before 6.",
    "instruction": "Select all correct answers.",
    "answers": [
      "2",
      "5",
      "7",
      "9"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "2 and 5 come before 6."
  },
  {
    "type": "multiple",
    "question": "Select every number closer to 0 than to 10.",
    "instruction": "Select all correct answers.",
    "answers": [
      "1",
      "3",
      "7",
      "9"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "1 and 3 are closer to 0."
  },
  {
    "type": "multiple",
    "question": "Select every number closer to 20 than to 10.",
    "instruction": "Select all correct answers.",
    "answers": [
      "11",
      "14",
      "17",
      "19"
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "17 and 19 are closer to 20."
  },
  {
    "type": "multiple",
    "question": "Select every pair of consecutive numbers.",
    "instruction": "Select all correct answers.",
    "answers": [
      "4 and 5",
      "7 and 9",
      "10 and 11",
      "15 and 18"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "4 and 5, and 10 and 11, differ by 1."
  },
  {
    "type": "multiple",
    "question": "Select every true statement.",
    "instruction": "Select all correct answers.",
    "answers": [
      "6 comes after 5.",
      "9 comes before 8.",
      "12 is greater than 10.",
      "3 is between 2 and 4."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "explanation": "The first, third and fourth statements are true."
  },
  {
    "type": "multiple",
    "question": "Select every number that could fill the blank: 5 < ? < 9.",
    "instruction": "Select all correct answers.",
    "answers": [
      "4",
      "6",
      "8",
      "10"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "6 and 8 are both greater than 5 and less than 9."
  },
  {
    "type": "multiple",
    "question": "Select every number greater than 15.",
    "instruction": "Select all correct answers.",
    "answers": [
      "14",
      "16",
      "18",
      "12"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "16 and 18 are greater than 15."
  },
  {
    "type": "multiple",
    "question": "Select every number less than 4.",
    "instruction": "Select all correct answers.",
    "answers": [
      "0",
      "2",
      "5",
      "7"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "0 and 2 are less than 4."
  },
  {
    "type": "multiple",
    "question": "Select every number between 10 and 15.",
    "instruction": "Select all correct answers.",
    "answers": [
      "9",
      "11",
      "14",
      "16"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "11 and 14 are between 10 and 15."
  },
  {
    "type": "multiple",
    "question": "Select every number one step away from 8.",
    "instruction": "Select all correct answers.",
    "answers": [
      "6",
      "7",
      "9",
      "10"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "7 and 9 are one step from 8."
  },
  {
    "type": "multiple",
    "question": "Select every number two steps away from 10.",
    "instruction": "Select all correct answers.",
    "answers": [
      "8",
      "9",
      "11",
      "12"
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "8 and 12 are two steps from 10."
  },
  {
    "type": "multiple",
    "question": "Select every number that belongs in this run: 14, 15, __, __.",
    "instruction": "Select all correct answers.",
    "answers": [
      "16",
      "17",
      "18",
      "13"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Counting forward gives 16 and 17."
  },
  {
    "type": "multiple",
    "question": "Select every number that appears before 8 when counting from 5 to 8.",
    "instruction": "Select all correct answers.",
    "answers": [
      "5",
      "7",
      "8",
      "9"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "5 and 7 appear before 8 in the count."
  },
  {
    "type": "multiple",
    "question": "Select every move that goes right on a usual number line.",
    "instruction": "Select all correct answers.",
    "answers": [
      "4 to 5",
      "8 to 7",
      "12 to 14",
      "6 to 3"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "4 to 5 and 12 to 14 move right."
  },
  {
    "type": "multiple",
    "question": "Select every move that goes left on a usual number line.",
    "instruction": "Select all correct answers.",
    "answers": [
      "9 to 7",
      "3 to 5",
      "15 to 14",
      "10 to 12"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "9 to 7 and 15 to 14 move left."
  },
  {
    "type": "multiple",
    "question": "Select every number shown on this number line: 0, 2, 4, 6, 8.",
    "instruction": "Select all correct answers.",
    "answers": [
      "0",
      "3",
      "6",
      "7"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "0 and 6 are shown on the number line."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "3",
      "1",
      "2"
    ],
    "correct": [
      "1",
      "2",
      "3"
    ],
    "explanation": "From smallest to largest: 1, 2, 3."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "6",
      "4",
      "5"
    ],
    "correct": [
      "4",
      "5",
      "6"
    ],
    "explanation": "From smallest to largest: 4, 5, 6."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "9",
      "7",
      "8"
    ],
    "correct": [
      "7",
      "8",
      "9"
    ],
    "explanation": "From smallest to largest: 7, 8, 9."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "12",
      "10",
      "11"
    ],
    "correct": [
      "10",
      "11",
      "12"
    ],
    "explanation": "From smallest to largest: 10, 11, 12."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "15",
      "13",
      "14"
    ],
    "correct": [
      "13",
      "14",
      "15"
    ],
    "explanation": "From smallest to largest: 13, 14, 15."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "18",
      "16",
      "17"
    ],
    "correct": [
      "16",
      "17",
      "18"
    ],
    "explanation": "From smallest to largest: 16, 17, 18."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "20",
      "18",
      "19"
    ],
    "correct": [
      "18",
      "19",
      "20"
    ],
    "explanation": "From smallest to largest: 18, 19, 20."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "5",
      "2",
      "4"
    ],
    "correct": [
      "2",
      "4",
      "5"
    ],
    "explanation": "From smallest to largest: 2, 4, 5."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "10",
      "7",
      "9"
    ],
    "correct": [
      "7",
      "9",
      "10"
    ],
    "explanation": "From smallest to largest: 7, 9, 10."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "14",
      "11",
      "13"
    ],
    "correct": [
      "11",
      "13",
      "14"
    ],
    "explanation": "From smallest to largest: 11, 13, 14."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "4",
      "0",
      "2"
    ],
    "correct": [
      "0",
      "2",
      "4"
    ],
    "explanation": "From smallest to largest: 0, 2, 4."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "8",
      "3",
      "6"
    ],
    "correct": [
      "3",
      "6",
      "8"
    ],
    "explanation": "From smallest to largest: 3, 6, 8."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "11",
      "5",
      "9"
    ],
    "correct": [
      "5",
      "9",
      "11"
    ],
    "explanation": "From smallest to largest: 5, 9, 11."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "16",
      "12",
      "15"
    ],
    "correct": [
      "12",
      "15",
      "16"
    ],
    "explanation": "From smallest to largest: 12, 15, 16."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from smallest to largest.",
    "items": [
      "19",
      "14",
      "17"
    ],
    "correct": [
      "14",
      "17",
      "19"
    ],
    "explanation": "From smallest to largest: 14, 17, 19."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "1",
      "3",
      "2"
    ],
    "correct": [
      "3",
      "2",
      "1"
    ],
    "explanation": "From largest to smallest: 3, 2, 1."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "4",
      "6",
      "5"
    ],
    "correct": [
      "6",
      "5",
      "4"
    ],
    "explanation": "From largest to smallest: 6, 5, 4."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "7",
      "9",
      "8"
    ],
    "correct": [
      "9",
      "8",
      "7"
    ],
    "explanation": "From largest to smallest: 9, 8, 7."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "10",
      "12",
      "11"
    ],
    "correct": [
      "12",
      "11",
      "10"
    ],
    "explanation": "From largest to smallest: 12, 11, 10."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "13",
      "15",
      "14"
    ],
    "correct": [
      "15",
      "14",
      "13"
    ],
    "explanation": "From largest to smallest: 15, 14, 13."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "16",
      "18",
      "17"
    ],
    "correct": [
      "18",
      "17",
      "16"
    ],
    "explanation": "From largest to smallest: 18, 17, 16."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "18",
      "20",
      "19"
    ],
    "correct": [
      "20",
      "19",
      "18"
    ],
    "explanation": "From largest to smallest: 20, 19, 18."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "2",
      "5",
      "4"
    ],
    "correct": [
      "5",
      "4",
      "2"
    ],
    "explanation": "From largest to smallest: 5, 4, 2."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "6",
      "10",
      "8"
    ],
    "correct": [
      "10",
      "8",
      "6"
    ],
    "explanation": "From largest to smallest: 10, 8, 6."
  },
  {
    "type": "order",
    "question": "Put these numbers in order from largest to smallest.",
    "items": [
      "11",
      "15",
      "13"
    ],
    "correct": [
      "15",
      "13",
      "11"
    ],
    "explanation": "From largest to smallest: 15, 13, 11."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "2",
      "0",
      "1"
    ],
    "correct": [
      "0",
      "1",
      "2"
    ],
    "explanation": "The correct order is 0 → 1 → 2."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "5",
      "3",
      "4"
    ],
    "correct": [
      "3",
      "4",
      "5"
    ],
    "explanation": "The correct order is 3 → 4 → 5."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "8",
      "6",
      "7"
    ],
    "correct": [
      "6",
      "7",
      "8"
    ],
    "explanation": "The correct order is 6 → 7 → 8."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "11",
      "9",
      "10"
    ],
    "correct": [
      "9",
      "10",
      "11"
    ],
    "explanation": "The correct order is 9 → 10 → 11."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "14",
      "12",
      "13"
    ],
    "correct": [
      "12",
      "13",
      "14"
    ],
    "explanation": "The correct order is 12 → 13 → 14."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "17",
      "15",
      "16"
    ],
    "correct": [
      "15",
      "16",
      "17"
    ],
    "explanation": "The correct order is 15 → 16 → 17."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "20",
      "18",
      "19"
    ],
    "correct": [
      "18",
      "19",
      "20"
    ],
    "explanation": "The correct order is 18 → 19 → 20."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "7",
      "2",
      "5"
    ],
    "correct": [
      "2",
      "5",
      "7"
    ],
    "explanation": "The correct order is 2 → 5 → 7."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "13",
      "8",
      "11"
    ],
    "correct": [
      "8",
      "11",
      "13"
    ],
    "explanation": "The correct order is 8 → 11 → 13."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "19",
      "10",
      "15"
    ],
    "correct": [
      "10",
      "15",
      "19"
    ],
    "explanation": "The correct order is 10 → 15 → 19."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "6",
      "1",
      "4"
    ],
    "correct": [
      "1",
      "4",
      "6"
    ],
    "explanation": "The correct order is 1 → 4 → 6."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "12",
      "5",
      "9"
    ],
    "correct": [
      "5",
      "9",
      "12"
    ],
    "explanation": "The correct order is 5 → 9 → 12."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "16",
      "7",
      "14"
    ],
    "correct": [
      "7",
      "14",
      "16"
    ],
    "explanation": "The correct order is 7 → 14 → 16."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "18",
      "9",
      "13"
    ],
    "correct": [
      "9",
      "13",
      "18"
    ],
    "explanation": "The correct order is 9 → 13 → 18."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from smallest to largest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "20",
      "11",
      "17"
    ],
    "correct": [
      "11",
      "17",
      "20"
    ],
    "explanation": "The correct order is 11 → 17 → 20."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "0",
      "2",
      "1"
    ],
    "correct": [
      "2",
      "1",
      "0"
    ],
    "explanation": "The correct order is 2 → 1 → 0."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "3",
      "5",
      "4"
    ],
    "correct": [
      "5",
      "4",
      "3"
    ],
    "explanation": "The correct order is 5 → 4 → 3."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "6",
      "8",
      "7"
    ],
    "correct": [
      "8",
      "7",
      "6"
    ],
    "explanation": "The correct order is 8 → 7 → 6."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "9",
      "11",
      "10"
    ],
    "correct": [
      "11",
      "10",
      "9"
    ],
    "explanation": "The correct order is 11 → 10 → 9."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "12",
      "14",
      "13"
    ],
    "correct": [
      "14",
      "13",
      "12"
    ],
    "explanation": "The correct order is 14 → 13 → 12."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "15",
      "17",
      "16"
    ],
    "correct": [
      "17",
      "16",
      "15"
    ],
    "explanation": "The correct order is 17 → 16 → 15."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "18",
      "20",
      "19"
    ],
    "correct": [
      "20",
      "19",
      "18"
    ],
    "explanation": "The correct order is 20 → 19 → 18."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "2",
      "7",
      "5"
    ],
    "correct": [
      "7",
      "5",
      "2"
    ],
    "explanation": "The correct order is 7 → 5 → 2."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "8",
      "13",
      "11"
    ],
    "correct": [
      "13",
      "11",
      "8"
    ],
    "explanation": "The correct order is 13 → 11 → 8."
  },
  {
    "type": "drag-drop",
    "question": "Drag the numbers into order from largest to smallest.",
    "instruction": "Drag the cards into order. You can also use the arrows.",
    "items": [
      "10",
      "19",
      "15"
    ],
    "correct": [
      "19",
      "15",
      "10"
    ],
    "explanation": "The correct order is 19 → 15 → 10."
  },
  {
    "type": "text",
    "question": "Write the number name for 0.",
    "placeholder": "Type the number name",
    "acceptedAnswers": [
      "zero",
      "0"
    ],
    "explanation": "0 is called zero."
  },
  {
    "type": "text",
    "question": "Write the number name for 5.",
    "placeholder": "Type the number name",
    "acceptedAnswers": [
      "five",
      "5"
    ],
    "explanation": "5 is called five."
  },
  {
    "type": "text",
    "question": "Write the number name for 10.",
    "placeholder": "Type the number name",
    "acceptedAnswers": [
      "ten",
      "10"
    ],
    "explanation": "10 is called ten."
  },
  {
    "type": "text",
    "question": "Write the number name for 15.",
    "placeholder": "Type the number name",
    "acceptedAnswers": [
      "fifteen",
      "15"
    ],
    "explanation": "15 is called fifteen."
  },
  {
    "type": "text",
    "question": "Write the number name for 20.",
    "placeholder": "Type the number name",
    "acceptedAnswers": [
      "twenty",
      "20"
    ],
    "explanation": "20 is called twenty."
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
  storageKey: "FoundationNumberLineDailyPracticeBestScore"
};
