"use strict";

window.quizQuestions = [
  /* =====================================================
     EASY (Subitising 1 to 3 Objects)
     ===================================================== */

  {
    type: "single",
    question: "Look quickly (1 second):<br>⚫ ⚫<br><br>How many dots did you see?",
    answers: ["1", "2", "3"],
    correct: 1,
    explanation: "There are 2 dots."
  },
  {
    type: "single",
    question: "Dice Face: Which number is shown on this die face?<br><br>⚂",
    answers: ["2", "3", "4"],
    correct: 1,
    explanation: "The die face showing ⚂ represents the number 3."
  },
  {
    type: "number",
    question: "Counting vs. Knowing: Look at this group for just a moment:<br>🍎<br><br>Name the number of apples immediately.",
    placeholder: "Enter a number",
    correct: 1,
    tolerance: 0,
    explanation: "There is 1 apple."
  },
  {
    type: "single",
    question: "Card Matching:<br>Which card shows 3 dots?",
    answers: [
      "A) ⚫ ⚫",
      "B) ⚫ ⚫ ⚫",
      "C) ⚫ ⚫ ⚫ ⚫"
    ],
    correct: 1,
    explanation: "Card B has 3 dots."
  },
  {
    type: "number",
    question: "Quick Name: How many stars are in a single line here?<br><br>⭐️ ⭐️ ⭐️",
    placeholder: "Enter a number",
    correct: 3,
    tolerance: 0,
    explanation: "There are 3 stars in the line."
  },
  {
    type: "number",
    question: "Finger Patterns: If your teacher holds up 2 fingers, how many fingers are showing?",
    placeholder: "Enter a number",
    correct: 2,
    tolerance: 0,
    explanation: "Holding up 2 fingers represents the number 2."
  },
  {
    type: "single",
    question: "Instructive Card Game: In a \"Snap\" game, you turn over a card showing ⚫. What card do you need to flip to make a matching snap?",
    answers: [
      "A card with 1 dot",
      "A card with 2 dots",
      "A card with 3 dots"
    ],
    correct: 0,
    explanation: "A card with 1 dot matches the single dot card (⚫)."
  },

  /* =====================================================
     MEDIUM (Subitising 4 to 6 Objects & Ten-Frame Card Games)
     ===================================================== */

  {
    type: "number",
    question: "Standard Array:<br>⚫ ⚫<br>⚫ ⚫<br><br>Without counting one-by-one, how many dots are arranged in this square?",
    placeholder: "Enter a number",
    correct: 4,
    tolerance: 0,
    explanation: "A 2x2 grid contains 4 dots."
  },
  {
    type: "number",
    question: "Ten-Frame Visual:<br>[ 🖐️ | 🖐️ | 🖐️ | 🖐️ | 🖐️ ]<br>[ ⚪ | ⚪ | ⚪ | ⚪ | ⚪ ]<br><br>How many counters are filled in the top row?",
    placeholder: "Enter a number",
    correct: 5,
    tolerance: 0,
    explanation: "A full row of a ten-frame has 5 spaces filled."
  },
  {
    type: "number",
    question: "Card Game Challenge: You draw a playing card with 5 diamonds on it:<br>♦️ ♦️<br>♦️<br>♦️ ♦️<br><br>Can you name the number on the card before your partner counts them?",
    placeholder: "Enter a number",
    correct: 5,
    tolerance: 0,
    explanation: "The card shows 5 diamonds."
  },
  {
    type: "number",
    question: "Non-Standard Arrangement:<br>🔴<br>🔴 🔴<br>🔴<br><br>How many dots are in this pile?",
    placeholder: "Enter a number",
    correct: 4,
    tolerance: 0,
    explanation: "1 + 2 + 1 = 4 dots in total."
  },
  {
    type: "number",
    question: "Dominoes:<br>[ ⚁ | ⚁ ]<br><br>What is the total number of dots on both sides of this domino combined?",
    placeholder: "Enter a number",
    correct: 4,
    tolerance: 0,
    explanation: "2 dots on the left and 2 dots on the right equal 4 dots."
  },
  {
    type: "single",
    question: "Card Compare:<br>Card A: 🟦 🟦 🟦 🟦<br>Card B: 🟦 🟦<br><br>Which card has more squares?",
    answers: [
      "Card A",
      "Card B",
      "They have the same"
    ],
    correct: 0,
    explanation: "Card A has 4 squares, which is more than Card B's 2 squares."
  },
  {
    type: "number",
    question: "Quick Sight:<br>🔴 🔴 🔴 🔴 🔴<br><br>How many counters are in this row?",
    placeholder: "Enter a number",
    correct: 5,
    tolerance: 0,
    explanation: "There are 5 red counters in a row."
  },

  /* =====================================================
     DIFFICULT (Conceptual Subitising: Part-Part-Whole & Speed Games)
     ===================================================== */

  {
    type: "number",
    question: "Part-Part-Whole Subitising:<br>Look at these two groups together:<br>(⚫ ⚫ ⚫) and (⚫ ⚫)<br><br>How many dots are there in total? (Hint: Think \"3 and 2 make ___\")",
    placeholder: "Enter a number",
    correct: 5,
    tolerance: 0,
    explanation: "3 dots and 2 dots combine to make 5."
  },
  {
    type: "single",
    question: "Subitising Breakdowns:<br>Look at this pattern:<br>🟢 🟢<br>🟢<br>🟢 🟢<br><br>How did you see the group?",
    answers: [
      "A) A group of 2 and a group of 3",
      "B) A group of 4 and 1 in the middle",
      "C) Both A and B work!"
    ],
    correct: 2,
    explanation: "Both visual breakdowns are valid ways to conceptually subitise the 5 dots."
  },
  {
    type: "number",
    question: "Card Game \"Make 5\":<br>You hold a card with 3 dots (⚫ ⚫ ⚫). What card do you need to draw from the deck to make 5 altogether?",
    placeholder: "Enter a number",
    correct: 2,
    tolerance: 0,
    explanation: "You need a card with 2 dots because 3 + 2 = 5."
  },
  {
    type: "number",
    question: "Subitising Under Time:<br>Look at this image for 1 second only, then cover it:<br>⭐️ ⭐️ ⭐️<br>⭐️ ⭐️ ⭐️<br><br>How many stars did you see?",
    placeholder: "Enter a number",
    correct: 6,
    tolerance: 0,
    explanation: "Two rows of 3 stars make 6 stars in total."
  },
  {
    type: "single",
    question: "Odd One Out:<br>Which card does NOT show a collection of 4?",
    answers: [
      "A) 🟨 🟨 🟨 🟨",
      "B) 🎲 (Die showing 4 dots)",
      "C) 🔺 🔺 🔺"
    ],
    correct: 2,
    explanation: "Option C shows 3 triangles instead of 4."
  },
  {
    type: "single",
    question: "Card Game Rule Creation:<br>You are playing a game where you win if you flip a card with more than 3 dots.<br>Which of these cards wins the round?",
    answers: [
      "Card 1: ⚫ ⚫",
      "Card 2: ⚫ ⚫ ⚫ ⚫ ⚫",
      "Card 3: ⚫"
    ],
    correct: 1,
    explanation: "Card 2 has 5 dots, which is greater than 3."
  }
];

window.quizConfig = {
  shuffleQuestions: false,
  shuffleAnswers: false,
  caseSensitiveText: false,
  storageKey: "AC9MFN02SubitisingBestScore"
};
