"use strict";
window.skillrPracticeQuestions = [
  {
    "id": "ac9m9p01-p-001",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "complete sample spaces",
    "printable": true,
    "type": "single",
    "question": "A coin is flipped and a 4-section spinner is spun. How many outcomes are in the complete sample space?",
    "audioPrompt": "A coin is flipped and a 4-section spinner is spun. How many outcomes are in the complete sample space?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "8",
      "4",
      "6",
      "16"
    ],
    "correct": 0,
    "explanation": "Each of 2 coin outcomes pairs with each of 4 spinner outcomes: 2 × 4 = 8.\nHint: Multiply the number of choices at the two stages.",
    "structuredExplanation": {
      "summary": "Each of 2 coin outcomes pairs with each of 4 spinner outcomes: 2 × 4 = 8.",
      "hint": "Multiply the number of choices at the two stages."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-002",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "complete sample spaces",
    "printable": true,
    "type": "single",
    "question": "A coin is flipped and a six-sided die is rolled. What is the probability of T5?",
    "audioPrompt": "A coin is flipped and a six-sided die is rolled. What is the probability of T5?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "1/2",
      "1/12",
      "1/6",
      "2/12"
    ],
    "correct": 1,
    "explanation": "There are 2 × 6 = 12 equally likely ordered outcomes, and T5 is one outcome, so its probability is 1/12.\nHint: List T1 to T6 and H1 to H6.",
    "structuredExplanation": {
      "summary": "There are 2 × 6 = 12 equally likely ordered outcomes, and T5 is one outcome, so its probability is 1/12.",
      "hint": "List T1 to T6 and H1 to H6."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-003",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "systematic lists and tables",
    "printable": true,
    "type": "single",
    "question": "Two coins are flipped. Which is the complete sample space?",
    "audioPrompt": "Two coins are flipped. Which is the complete sample space?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "{H, T}",
      "{HH, TT}",
      "{HH, HT, TH, TT}",
      "{HH, HT, TT}"
    ],
    "correct": 2,
    "explanation": "A two-way array pairs each first-flip result with each second-flip result, producing HH, HT, TH and TT.\nHint: Keep the first and second flip positions separate.",
    "structuredExplanation": {
      "summary": "A two-way array pairs each first-flip result with each second-flip result, producing HH, HT, TH and TT.",
      "hint": "Keep the first and second flip positions separate."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-004",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "systematic lists and tables",
    "printable": true,
    "type": "single",
    "question": "Two fair coins are flipped. What is the probability of exactly one head?",
    "audioPrompt": "Two fair coins are flipped. What is the probability of exactly one head?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "1/4",
      "3/4",
      "1",
      "1/2"
    ],
    "correct": 3,
    "explanation": "HT and TH are the 2 favourable outcomes among 4 equally likely outcomes, so 2/4 = 1/2.\nHint: Identify both orders that contain one head.",
    "structuredExplanation": {
      "summary": "HT and TH are the 2 favourable outcomes among 4 equally likely outcomes, so 2/4 = 1/2.",
      "hint": "Identify both orders that contain one head."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-005",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "replacement and tree diagrams",
    "printable": true,
    "type": "single",
    "question": "A bag has 3 red and 2 blue marbles. A marble is replaced after the first draw. What is P(red then red)?",
    "audioPrompt": "A bag has 3 red and 2 blue marbles. A marble is replaced after the first draw. What is P(red then red)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "9/25",
      "3/10",
      "6/20",
      "2/5"
    ],
    "correct": 0,
    "explanation": "Replacement restores the bag, so P(RR) = 3/5 × 3/5 = 9/25.\nHint: Use the same red branch probability at both stages.",
    "structuredExplanation": {
      "summary": "Replacement restores the bag, so P(RR) = 3/5 × 3/5 = 9/25.",
      "hint": "Use the same red branch probability at both stages."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-006",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "replacement and tree diagrams",
    "printable": true,
    "type": "single",
    "question": "From a standard deck, an ace is drawn, replaced and the deck shuffled. What is P(ace then king)?",
    "audioPrompt": "From a standard deck, an ace is drawn, replaced and the deck shuffled. What is P(ace then king)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "4/51",
      "1/169",
      "4/663",
      "1/13"
    ],
    "correct": 1,
    "explanation": "With replacement, P(ace then king) = 4/52 × 4/52 = 1/13 × 1/13 = 1/169.\nHint: Replacement keeps both denominators at 52.",
    "structuredExplanation": {
      "summary": "With replacement, P(ace then king) = 4/52 × 4/52 = 1/13 × 1/13 = 1/169.",
      "hint": "Replacement keeps both denominators at 52."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-007",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "population selection without replacement",
    "printable": true,
    "type": "single",
    "question": "A class has 4 Year 9 and 6 Year 10 students. Two different students are selected. What is P(both are Year 9)?",
    "audioPrompt": "A class has 4 Year 9 and 6 Year 10 students. Two different students are selected. What is P(both are Year 9)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "4/25",
      "1/5",
      "2/15",
      "4/15"
    ],
    "correct": 2,
    "explanation": "Students are not replaced: 4/10 × 3/9 = 12/90 = 2/15.\nHint: Reduce the target group and total after selection one.",
    "structuredExplanation": {
      "summary": "Students are not replaced: 4/10 × 3/9 = 12/90 = 2/15.",
      "hint": "Reduce the target group and total after selection one."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m9p01-p-008",
    "curriculumCode": "AC9M9P01",
    "bank": "practice",
    "skill": "population selection without replacement",
    "printable": true,
    "type": "single",
    "question": "A committee has 5 teachers and 3 students. Two different people are selected. What is P(student then teacher)?",
    "audioPrompt": "A committee has 5 teachers and 3 students. Two different people are selected. What is P(student then teacher)?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "alt_text": ""
    },
    "answers": [
      "15/64",
      "5/14",
      "3/8",
      "15/56"
    ],
    "correct": 3,
    "explanation": "P(student then teacher) = 3/8 × 5/7 = 15/56.\nHint: After selecting a student, 7 people remain and all 5 teachers remain.",
    "structuredExplanation": {
      "summary": "P(student then teacher) = 3/8 × 5/7 = 15/56.",
      "hint": "After selecting a student, 7 people remain and all 5 teachers remain."
    },
    "qualitySchema": "production-v1"
  }
];
window.quizQuestions = window.skillrPracticeQuestions;
