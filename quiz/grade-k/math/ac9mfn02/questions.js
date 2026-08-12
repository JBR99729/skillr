"use strict";

window.quizQuestions = [
  {
    "type": "number",
    "question": "Flash-look challenge: name this pair.",
    "visual": "🔵 🔵",
    "placeholder": "Type the number",
    "correct": 2,
    "tolerance": 0,
    "explanation": "The pair contains 2 blue counters."
  },
  {
    "type": "single",
    "question": "Which numeral belongs with this die pattern?",
    "visual": "⚃",
    "answers": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correct": 2,
    "explanation": "This die face shows 4."
  },
  {
    "type": "text",
    "question": "Say how many balloons you see at once.",
    "visual": "🎈 🎈 🎈",
    "placeholder": "Type the number",
    "acceptedAnswers": [
      "3",
      "three"
    ],
    "explanation": "The group contains 3 balloons."
  },
  {
    "type": "single",
    "question": "Choose the card that shows a single dot.",
    "answers": [
      "● ●",
      "●",
      "● ● ●",
      "● ● ● ●"
    ],
    "correct": 1,
    "explanation": "A single dot represents 1."
  },
  {
    "type": "fill-blank",
    "question": "Complete the quick-look statement.",
    "visual": "⭐ ⭐\n⭐ ⭐",
    "template": "I see {{blank}} stars.",
    "placeholder": "number",
    "acceptedAnswers": [
      [
        "4",
        "four"
      ]
    ],
    "explanation": "Two stars on top and two below make 4."
  },
  {
    "type": "single",
    "question": "Which five-frame is completely full?",
    "answers": [
      "● ● ● ○ ○",
      "● ● ● ● ○",
      "● ● ● ● ●",
      "● ● ○ ○ ○"
    ],
    "correct": 2,
    "explanation": "All five spaces are filled in the third frame."
  },
  {
    "type": "single",
    "question": "A card shows this triangle.\n  ●\n● ●\nWhich word names its amount?",
    "answers": [
      "two",
      "three",
      "four",
      "five"
    ],
    "correct": 1,
    "explanation": "The triangle contains 3 dots."
  },
  {
    "type": "number",
    "question": "Name the amount in this bent pattern.",
    "visual": "●\n● ●",
    "placeholder": "Type the number",
    "correct": 3,
    "tolerance": 0,
    "explanation": "The bent pattern has 3 dots."
  },
  {
    "type": "single",
    "question": "Which card matches a hand showing 5 fingers?",
    "answers": [
      "A 2-dot card",
      "A 3-dot card",
      "A 4-dot card",
      "A 5-dot card"
    ],
    "correct": 3,
    "explanation": "Five fingers match 5 dots."
  },
  {
    "type": "multiple",
    "question": "Select both representations of 4.",
    "instruction": "Choose two answers.",
    "answers": [
      "⚃",
      "● ●\n● ●",
      "● ● ●",
      "● ● ● ● ●"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "The die face and the square pattern both show 4."
  },
  {
    "type": "fill-blank",
    "question": "Recognise the two parts.",
    "visual": "● ● ●    ●",
    "template": "Three and one make {{blank}}.",
    "placeholder": "whole",
    "acceptedAnswers": [
      [
        "4",
        "four"
      ]
    ],
    "explanation": "Three and one combine to make 4."
  },
  {
    "type": "single",
    "question": "This five-dot pattern can be seen as which two parts?",
    "visual": "● ●\n● ● ●",
    "answers": [
      "1 and 2",
      "2 and 2",
      "2 and 3",
      "3 and 3"
    ],
    "correct": 2,
    "explanation": "The rows show 2 and 3, making 5."
  },
  {
    "type": "number",
    "question": "A five-frame has 4 filled spaces. How many more counters will fill it?",
    "visual": "● ● ● ● ○",
    "placeholder": "number",
    "correct": 1,
    "tolerance": 0,
    "explanation": "One space is empty."
  },
  {
    "type": "single",
    "question": "Which card has more: a pair or a triangle of 3?",
    "answers": [
      "The pair",
      "The triangle of 3",
      "They are the same",
      "Neither"
    ],
    "correct": 1,
    "explanation": "Three is more than two."
  },
  {
    "type": "single",
    "question": "Both cards show 4. One is spread out. Which has more?",
    "answers": [
      "The spread-out card",
      "The close card",
      "They are the same",
      "Cannot tell"
    ],
    "correct": 2,
    "explanation": "Spacing does not change the quantity."
  },
  {
    "type": "drag-drop",
    "question": "Arrange the card amounts from fewer to more.",
    "instruction": "Drag the cards into order. On a touchscreen, use the arrows.",
    "items": [
      "Card A: ● ● ● ● ●",
      "Card B: ● ●",
      "Card C: ● ● ●"
    ],
    "correct": [
      "Card B: ● ●",
      "Card C: ● ● ●",
      "Card A: ● ● ● ● ●"
    ],
    "shuffleItems": false,
    "explanation": "The amounts are 2, 3 and 5."
  },
  {
    "type": "single",
    "question": "Your Snap card is a four-dot square. Which card wins the match?",
    "answers": [
      "A row of 2",
      "A triangle of 3",
      "A row of 4",
      "A cross of 5"
    ],
    "correct": 2,
    "explanation": "A row of 4 has the same amount as a square of 4."
  },
  {
    "type": "single",
    "question": "In a sharing game, Ana has 5 counters and Tom has 3. Who has more?",
    "answers": [
      "Ana",
      "Tom",
      "They are equal",
      "No one"
    ],
    "correct": 0,
    "explanation": "Five counters are more than three."
  },
  {
    "type": "single",
    "question": "A card with 3 dots is turned around. How many dots remain?",
    "answers": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correct": 1,
    "explanation": "Turning the card does not add or remove dots."
  },
  {
    "type": "single",
    "question": "Omar sees 4 outside dots and 1 centre dot. Which whole should he name?",
    "answers": [
      "3",
      "4",
      "5",
      "0"
    ],
    "correct": 2,
    "explanation": "Four and one make 5."
  }
];

window.quizConfig = {
  shuffleQuestions: true,
  shuffleAnswers: false,
  maxQuestions: 5,
  caseSensitiveText: false,
  storageKey: "AC9MFN02SubitisingBestScore"
};
