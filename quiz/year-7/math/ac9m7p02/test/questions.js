"use strict";
window.skillrTestQuestions = [
  {
    "id": "AC9M7P02-T-001",
    "type": "single",
    "question": "A fair coin is tossed 200 times. Expected heads are 100; observed heads are 94. Which comparison is correct?",
    "answers": [
      "observed is 6 below expected",
      "observed is 94 below expected",
      "the model is disproved",
      "relative frequency is 0.94"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "94−100=−6."
  },
  {
    "id": "AC9M7P02-T-002",
    "type": "single",
    "question": "The relative frequency of heads in that experiment is:",
    "answers": [
      "0.47",
      "0.50",
      "0.94",
      "0.06"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "94÷200=0.47."
  },
  {
    "id": "AC9M7P02-T-003",
    "type": "single",
    "question": "A 2000-trial fair-coin simulation gives 1012 heads. Relative frequency:",
    "answers": [
      "0.506",
      "0.500",
      "0.494",
      "0.1012"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "1012÷2000=0.506."
  },
  {
    "id": "AC9M7P02-T-004",
    "type": "single",
    "question": "Which of the two relative frequencies 0.47 and 0.506 is closer to 0.5?",
    "answers": [
      "0.506",
      "0.47",
      "equally close",
      "cannot compare"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "Differences are 0.006 and 0.03."
  },
  {
    "id": "AC9M7P02-T-005",
    "type": "single",
    "question": "Why should you avoid saying the 2000-trial simulation is closer solely because it is digital?",
    "answers": [
      "it also has ten times as many trials, and model quality matters",
      "digital simulations have no randomness",
      "physical coins have no probability",
      "0.506 equals 0.5 exactly"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Trial count is a major confounding factor in that comparison."
  },
  {
    "id": "AC9M7P02-T-006",
    "type": "single",
    "question": "A fair die is simulated 300 times with counts 44,52,49,51,54,50. Do the counts pass a basic total check?",
    "answers": [
      "Yes, they sum to 300",
      "No, they sum to 294",
      "No, they sum to 306",
      "No, each must equal 50"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "44+52+49+51+54+50=300."
  },
  {
    "id": "AC9M7P02-T-007",
    "type": "single",
    "question": "For that simulation, relative frequency of rolling 5 is:",
    "answers": [
      "0.18",
      "0.167",
      "0.54",
      "0.05"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "54÷300=0.18."
  },
  {
    "id": "AC9M7P02-T-008",
    "type": "single",
    "question": "Difference from theoretical 1/6≈0.1667 is approximately:",
    "answers": [
      "0.0133",
      "0.1667",
      "0.18",
      "0.3467"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "0.18−0.1667≈0.0133."
  },
  {
    "id": "AC9M7P02-T-009",
    "type": "single",
    "question": "Which conclusion is justified?",
    "answers": [
      "The observed result is reasonably close to the fair-die prediction",
      "the die is definitely biased",
      "all six counts must be identical",
      "theoretical probability has become 0.18"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Small differences are expected in random trials."
  },
  {
    "id": "AC9M7P02-T-010",
    "type": "single",
    "question": "A five-colour equal spinner gives counts 78,82,75,85,80 in 400 spins. What basic check should be done first?",
    "answers": [
      "verify counts total 400",
      "force every count to 80",
      "remove the largest count",
      "calculate only Yellow"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "78+82+75+85+80=400, so all trials are accounted for."
  },
  {
    "id": "AC9M7P02-T-011",
    "type": "single",
    "question": "Relative frequency of Yellow is:",
    "answers": [
      "0.2125",
      "0.20",
      "0.85",
      "0.1875"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "85÷400=0.2125."
  },
  {
    "id": "AC9M7P02-T-012",
    "type": "single",
    "question": "Expected Yellow count is:",
    "answers": [
      "80",
      "85",
      "100",
      "20"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "400×1/5=80."
  },
  {
    "id": "AC9M7P02-T-013",
    "type": "single",
    "question": "Observed Yellow exceeds expected by:",
    "answers": [
      "5",
      "0.0125",
      "80",
      "85"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "85−80=5."
  },
  {
    "id": "AC9M7P02-T-014",
    "type": "single",
    "question": "Which statement best explains that difference?",
    "answers": [
      "random variation can produce counts above or below expectation",
      "the spinner must be unfair",
      "theoretical probability increases after Yellow occurs",
      "large samples have no variation"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Expected count is not an exact quota."
  },
  {
    "id": "AC9M7P02-T-015",
    "type": "single",
    "question": "A two-dice simulation records sum 8 on 78 of 600 trials. Relative frequency:",
    "answers": [
      "0.13",
      "0.1389",
      "0.78",
      "0.05"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "78÷600=0.13."
  },
  {
    "id": "AC9M7P02-T-016",
    "type": "single",
    "question": "Theoretical probability of sum 8 with two fair dice is 5/36≈0.1389. Difference from observed is about:",
    "answers": [
      "0.0089",
      "0.13",
      "0.1389",
      "0.2689"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "0.1389−0.13≈0.0089."
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
