"use strict";
window.skillrTestQuestions = [
  {
    "id": "AC9M7P01-T-001",
    "type": "single",
    "question": "A spinner has sectors with probabilities Red 0.45, Blue 0.30, Green 0.25. Which check confirms a complete probability model?",
    "answers": [
      "0.45+0.30+0.25=1",
      "the colours are alphabetical",
      "red is largest",
      "there are three labels"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "Probabilities of all elementary outcomes must sum to 1."
  },
  {
    "id": "AC9M7P01-T-002",
    "type": "single",
    "question": "A spinner has P(red)=0.4 and P(blue)=0.35. If green is the only other outcome, P(green)=",
    "answers": [
      "0.25",
      "0.75",
      "0.15",
      "1.25"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "1−0.4−0.35=0.25."
  },
  {
    "id": "AC9M7P01-T-003",
    "type": "single",
    "question": "A bag contains 3 red, 5 blue and 2 green identical counters. P(not blue)=",
    "answers": [
      "5/10=1/2",
      "5/10 blue",
      "2/10",
      "8/10"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "Not blue means red or green: 3+2=5 of 10."
  },
  {
    "id": "AC9M7P01-T-004",
    "type": "single",
    "question": "For the same bag, expected blue counters in 120 draws with replacement are:",
    "answers": [
      "60",
      "50",
      "40",
      "72"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "P(blue)=5/10=1/2, so 120×1/2=60."
  },
  {
    "id": "AC9M7P01-T-005",
    "type": "single",
    "question": "Why is 'expected 60 blue' not a guarantee?",
    "answers": [
      "random variation remains in finite trials",
      "probability is not numerical",
      "replacement changes blue to red",
      "expected frequency must be an integer outcome"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Expected frequency describes long-run average behaviour."
  },
  {
    "id": "AC9M7P01-T-006",
    "type": "single",
    "question": "A fair die is rolled 240 times. Expected results greater than 4:",
    "answers": [
      "80",
      "40",
      "120",
      "160"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "P(5 or 6)=2/6=1/3; 240÷3=80."
  },
  {
    "id": "AC9M7P01-T-007",
    "type": "single",
    "question": "A fair die is rolled 240 times and numbers greater than 4 occur 91 times. Relative frequency is approximately:",
    "answers": [
      "0.379",
      "0.333",
      "0.091",
      "0.621"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "91÷240≈0.379."
  },
  {
    "id": "AC9M7P01-T-008",
    "type": "single",
    "question": "Which conclusion is strongest?",
    "answers": [
      "91/240 differs from 1/3 but finite-trial variation is expected",
      "the die is definitely unfair",
      "the theoretical probability becomes 91/240",
      "91 outcomes are impossible"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "One finite experiment does not need to match the model exactly."
  },
  {
    "id": "AC9M7P01-T-009",
    "type": "single",
    "question": "A coin produces 520 heads in 1000 tosses. Which statement is best?",
    "answers": [
      "0.52 is reasonably close to 0.5 and could occur by chance",
      "the coin must be biased",
      "P(heads) is now exactly 0.52 forever",
      "heads are certain next toss"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Relative frequency estimates probability but contains sampling variation."
  },
  {
    "id": "AC9M7P01-T-010",
    "type": "single",
    "question": "Which result gives stronger experimental evidence about a coin's long-run behaviour?",
    "answers": [
      "520 heads in 1000 tosses",
      "5 heads in 10 tosses",
      "both equally informative",
      "one toss"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "A larger number of trials generally gives a more stable relative frequency."
  },
  {
    "id": "AC9M7P01-T-011",
    "type": "single",
    "question": "A spinner has four equal sectors but labels R,R,B,G. What is P(R)?",
    "answers": [
      "1/2",
      "1/3",
      "1/4",
      "2/3"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Two of four equal sectors are red."
  },
  {
    "id": "AC9M7P01-T-012",
    "type": "single",
    "question": "Why is the sample space {R,B,G} alone insufficient to infer equal probabilities in that spinner?",
    "answers": [
      "the labels combine unequal numbers of elementary sectors",
      "sample spaces cannot use letters",
      "there are only three colours",
      "probability cannot exceed 1/3"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Named outcomes can aggregate different amounts of equally likely elementary outcomes."
  },
  {
    "id": "AC9M7P01-T-013",
    "type": "single",
    "question": "A lucky dip contains prize labels A,A,A,B,C. If each ticket is equally likely, P(A)=",
    "answers": [
      "3/5",
      "1/3",
      "1/5",
      "1/2"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Three of five tickets produce A."
  },
  {
    "id": "AC9M7P01-T-014",
    "type": "single",
    "question": "For that lucky dip, which is the most useful elementary sample space if tickets are physically distinct?",
    "answers": [
      "{A1,A2,A3,B1,C1}",
      "{A,B,C} with equal probabilities",
      "{A} only",
      "{5}"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Distinguishing equally likely tickets makes the weighting transparent."
  },
  {
    "id": "AC9M7P01-T-015",
    "type": "single",
    "question": "An event has probability 0.72. Its complement has probability:",
    "answers": [
      "0.28",
      "0.72",
      "1.72",
      "0.18"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "1−0.72=0.28."
  },
  {
    "id": "AC9M7P01-T-016",
    "type": "single",
    "question": "If P(not rain)=0.65, then P(rain)=",
    "answers": [
      "0.35",
      "0.65",
      "1.65",
      "0.25"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "Complement probabilities sum to 1."
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
