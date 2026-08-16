"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m9p01-t-001",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "complete sample spaces",
    "printable": true,
    "type": "single",
    "question": "A 3-colour spinner is spun and then a coin is flipped. How many ordered outcomes are possible?",
    "audioPrompt": "A 3-colour spinner is spun and then a coin is flipped. How many ordered outcomes are possible?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "6",
      "3",
      "5",
      "9"
    ],
    "correct": 0,
    "explanation": "The multiplication principle gives 3 × 2 = 6 ordered outcomes.\nHint: Pair each spinner colour with H and T.",
    "structuredExplanation": {
      "summary": "The multiplication principle gives 3 × 2 = 6 ordered outcomes.",
      "hint": "Pair each spinner colour with H and T."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-002",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "complete sample spaces",
    "printable": true,
    "type": "single",
    "question": "Two fair six-sided dice are rolled. What is the probability of the ordered outcome (2, 5)?",
    "audioPrompt": "Two fair six-sided dice are rolled. What is the probability of the ordered outcome (2, 5)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "1/12",
      "1/36",
      "1/6",
      "2/36"
    ],
    "correct": 1,
    "explanation": "There are 6 × 6 = 36 equally likely ordered outcomes and (2, 5) is one of them.\nHint: The first and second die positions matter.",
    "structuredExplanation": {
      "summary": "There are 6 × 6 = 36 equally likely ordered outcomes and (2, 5) is one of them.",
      "hint": "The first and second die positions matter."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-003",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "systematic lists and tables",
    "printable": true,
    "type": "single",
    "question": "A spinner labelled A, B, C is spun twice. Which method guarantees every ordered outcome is recorded once?",
    "audioPrompt": "A spinner labelled A, B, C is spun twice. Which method guarantees every ordered outcome is recorded once?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "List A, B and C once",
      "Record only matching letters",
      "Use a 3 × 3 table with first spin as rows and second spin as columns",
      "Add the two labels"
    ],
    "correct": 2,
    "explanation": "A 3 × 3 table creates one cell for each of the 9 ordered pairs.\nHint: One axis must represent each stage.",
    "structuredExplanation": {
      "summary": "A 3 × 3 table creates one cell for each of the 9 ordered pairs.",
      "hint": "One axis must represent each stage."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-004",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "systematic lists and tables",
    "printable": true,
    "type": "single",
    "question": "A 3-colour spinner is spun twice. What is the probability that both spins show the same colour?",
    "audioPrompt": "A 3-colour spinner is spun twice. What is the probability that both spins show the same colour?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "1/9",
      "2/3",
      "1",
      "1/3"
    ],
    "correct": 3,
    "explanation": "The 3 matching outcomes are AA, BB and CC among 9 equally likely ordered outcomes, so 3/9 = 1/3.\nHint: Use the diagonal cells of a 3 × 3 table.",
    "structuredExplanation": {
      "summary": "The 3 matching outcomes are AA, BB and CC among 9 equally likely ordered outcomes, so 3/9 = 1/3.",
      "hint": "Use the diagonal cells of a 3 × 3 table."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-005",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "replacement and tree diagrams",
    "printable": true,
    "type": "single",
    "question": "A bag has 4 green and 3 yellow counters. Two are drawn without replacement. What is P(green then green)?",
    "audioPrompt": "A bag has 4 green and 3 yellow counters. Two are drawn without replacement. What is P(green then green)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "2/7",
      "16/49",
      "3/7",
      "4/21"
    ],
    "correct": 0,
    "explanation": "Without replacement, P(GG) = 4/7 × 3/6 = 12/42 = 2/7.\nHint: After one green is removed, update both counts.",
    "structuredExplanation": {
      "summary": "Without replacement, P(GG) = 4/7 × 3/6 = 12/42 = 2/7.",
      "hint": "After one green is removed, update both counts."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-006",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "replacement and tree diagrams",
    "printable": true,
    "type": "single",
    "question": "An ace is drawn from a 52-card deck and kept out. What is the probability the next card is a king?",
    "audioPrompt": "An ace is drawn from a 52-card deck and kept out. What is the probability the next card is a king?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "3/51",
      "4/51",
      "4/52",
      "3/52"
    ],
    "correct": 1,
    "explanation": "Removing an ace leaves 51 cards but all 4 kings, so the second probability is 4/51.\nHint: Ask separately how the total and number of kings changed.",
    "structuredExplanation": {
      "summary": "Removing an ace leaves 51 cards but all 4 kings, so the second probability is 4/51.",
      "hint": "Ask separately how the total and number of kings changed."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-007",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "population selection without replacement",
    "printable": true,
    "type": "single",
    "question": "A team has 7 juniors and 5 seniors. Two captains are selected without replacement. What is P(both are seniors)?",
    "audioPrompt": "A team has 7 juniors and 5 seniors. Two captains are selected without replacement. What is P(both are seniors)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "25/144",
      "10/33",
      "5/33",
      "5/12"
    ],
    "correct": 2,
    "explanation": "P(two seniors) = 5/12 × 4/11 = 20/132 = 5/33.\nHint: Update 5 seniors out of 12 to 4 seniors out of 11.",
    "structuredExplanation": {
      "summary": "P(two seniors) = 5/12 × 4/11 = 20/132 = 5/33.",
      "hint": "Update 5 seniors out of 12 to 4 seniors out of 11."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-t-008",
    "curriculumCode": "AC9M9P01",
    "bank": "test",
    "skill": "population selection without replacement",
    "printable": true,
    "type": "single",
    "question": "From 6 musicians and 4 actors, two different people are chosen. What is P(actor first, then musician)?",
    "audioPrompt": "From 6 musicians and 4 actors, two different people are chosen. What is P(actor first, then musician)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "2/5",
      "3/10",
      "8/15",
      "4/15"
    ],
    "correct": 3,
    "explanation": "P(actor then musician) = 4/10 × 6/9 = 24/90 = 4/15.\nHint: Selecting an actor leaves all 6 musicians among 9 people.",
    "structuredExplanation": {
      "summary": "P(actor then musician) = 4/10 × 6/9 = 24/90 = 4/15.",
      "hint": "Selecting an actor leaves all 6 musicians among 9 people."
    },
    "qualitySchema": "production-v1"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
