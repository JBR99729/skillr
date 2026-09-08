"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m4a01-t-001",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "missing addend right",
    "printable": true,
    "type": "single",
    "question": "What number makes 95 = □ + 37 true?",
    "audioPrompt": "What number makes 95 = □ + 37 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "58",
      "68",
      "132",
      "48"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 1,
    "correct": 0,
    "explanation": "95 is the total. 95 − 37 = 58, and 58 + 37 = 95.\nHint: Find the missing part of the total.",
    "structuredExplanation": {
      "summary": "95 is the total. 95 − 37 = 58, and 58 + 37 = 95.",
      "hint": "Find the missing part of the total."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-002",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "missing minuend",
    "printable": true,
    "type": "single",
    "question": "What number makes □ − 48 = 86 true?",
    "audioPrompt": "What number makes □ − 48 = 86 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "144",
      "124",
      "134",
      "38"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 2,
    "correct": 2,
    "explanation": "The starting amount is the removed part plus the part left: 48 + 86 = 134. Check: 134 − 48 = 86.\nHint: Combine the removed and remaining amounts.",
    "structuredExplanation": {
      "summary": "The starting amount is the removed part plus the part left: 48 + 86 = 134. Check: 134 − 48 = 86.",
      "hint": "Combine the removed and remaining amounts."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-003",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "missing subtrahend",
    "printable": true,
    "type": "single",
    "question": "What number makes 140 − □ = 75 true?",
    "audioPrompt": "What number makes 140 − □ = 75 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "215",
      "75",
      "65",
      "55"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 3,
    "correct": 2,
    "explanation": "140 − 75 = 65 finds the part removed. Check: 140 − 65 = 75.\nHint: Compare the starting amount with the amount left.",
    "structuredExplanation": {
      "summary": "140 − 75 = 65 finds the part removed. Check: 140 − 65 = 75.",
      "hint": "Compare the starting amount with the amount left."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-004",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "friendly grouping",
    "printable": true,
    "type": "single",
    "question": "What number makes 26 + □ + 74 = 163 true?",
    "audioPrompt": "What number makes 26 + □ + 74 = 163 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "137",
      "89",
      "53",
      "63"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 4,
    "correct": 3,
    "explanation": "26 + 74 = 100. The missing addend is 163 − 100 = 63. Check: 26 + 63 + 74 = 163.\nHint: Group the known addends into a friendly total.",
    "structuredExplanation": {
      "summary": "26 + 74 = 100. The missing addend is 163 − 100 = 63. Check: 26 + 63 + 74 = 163.",
      "hint": "Group the known addends into a friendly total."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-005",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "commutative addition",
    "printable": true,
    "type": "single",
    "question": "What number makes 29 + 18 = □ + 29 true?",
    "audioPrompt": "What number makes 29 + 18 = □ + 29 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "18",
      "11",
      "47",
      "29"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 5,
    "correct": 0,
    "explanation": "Reordering the two addends preserves the sum. 29 + 18 = 18 + 29 = 47.\nHint: Match the same two addends on both sides.",
    "structuredExplanation": {
      "summary": "Reordering the two addends preserves the sum. 29 + 18 = 18 + 29 = 47.",
      "hint": "Match the same two addends on both sides."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-006",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "uniform unit balance",
    "printable": true,
    "type": "single",
    "question": "All counters have equal mass. How many counters are in the covered group on this balanced scale?",
    "audioPrompt": "All counters have equal mass. How many counters are in the covered group on this balanced scale?",
    "visual": "A level balance with groups of 9 and 7 identical counters on the left. On the right are 12 identical counters and a covered group labelled unknown counters.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"A level balance with groups of 9 and 7 identical counters on the left. On the right are 12 identical counters and a covered group labelled unknown counters.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4a01/t006.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4a01/t006.svg#model",
      "alt_text": "A level balance with groups of 9 and 7 identical counters on the left. On the right are 12 identical counters and a covered group labelled unknown counters."
    },
    "answers": [
      "12",
      "4",
      "16",
      "28"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 6,
    "correct": 1,
    "explanation": "The left pan has 9 + 7 = 16 equal counters. The right needs 16 − 12 = 4 more counters. Check: 9 + 7 = 12 + 4.\nHint: The equal masses mean the total number of counters must match.",
    "structuredExplanation": {
      "summary": "The left pan has 9 + 7 = 16 equal counters. The right needs 16 − 12 = 4 more counters. Check: 9 + 7 = 12 + 4.",
      "hint": "The equal masses mean the total number of counters must match."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-007",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "balance subtraction",
    "printable": true,
    "type": "single",
    "question": "What number makes 86 − 32 = 90 − □ true?",
    "audioPrompt": "What number makes 86 − 32 = 90 − □ true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "32",
      "36",
      "54",
      "28"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 7,
    "correct": 1,
    "explanation": "The starting amount increases by 4, so the removed amount must also increase by 4. 32 + 4 = 36. Both differences are 54.\nHint: Keep the difference unchanged while the starting number increases.",
    "structuredExplanation": {
      "summary": "The starting amount increases by 4, so the removed amount must also increase by 4. 32 + 4 = 36. Both differences are 54.",
      "hint": "Keep the difference unchanged while the starting number increases."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-008",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "balance mixed operations",
    "printable": true,
    "type": "single",
    "question": "What number makes □ + 47 = 120 − 28 true?",
    "audioPrompt": "What number makes □ + 47 = 120 − 28 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "92",
      "139",
      "55",
      "45"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 8,
    "correct": 3,
    "explanation": "120 − 28 = 92. The missing addend is 92 − 47 = 45. Check: 45 + 47 = 92.\nHint: Find the known side, then the missing part of the equal total.",
    "structuredExplanation": {
      "summary": "120 − 28 = 92. The missing addend is 92 − 47 = 45. Check: 45 + 47 = 92.",
      "hint": "Find the known side, then the missing part of the equal total."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-009",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "relational three digit sum",
    "printable": true,
    "type": "single",
    "question": "What number makes 137 + 89 = 147 + □ true?",
    "audioPrompt": "What number makes 137 + 89 = 147 + □ true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "226",
      "79",
      "99",
      "89"
    ],
    "difficulty": 3,
    "difficultyTier": "challenge",
    "sequencePriority": 9,
    "correct": 1,
    "explanation": "The first addend increases by 10. Decrease the other addend by 10 to preserve the sum: 89 − 10 = 79. Both sides equal 226.\nHint: Compare the first addends and make a balancing change.",
    "structuredExplanation": {
      "summary": "The first addend increases by 10. Decrease the other addend by 10 to preserve the sum: 89 − 10 = 79. Both sides equal 226.",
      "hint": "Compare the first addends and make a balancing change."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-010",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "constant difference truth",
    "printable": true,
    "type": "single",
    "question": "Which explanation shows that 71 − 26 = 66 − 21 is true?",
    "audioPrompt": "Which explanation shows that 71 − 26 = 66 − 21 is true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Subtraction can always be done in either order.",
      "Both numbers decrease by 5, so the difference remains 45.",
      "Only the number removed decreases by 5.",
      "The right-hand difference is 5 less."
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 10,
    "correct": 1,
    "explanation": "The pair 71 and 26 shifts down by 5 to 66 and 21. Their gap is unchanged: 71 − 26 = 45 and 66 − 21 = 45.\nHint: Compare both pairs of corresponding numbers.",
    "structuredExplanation": {
      "summary": "The pair 71 and 26 shifts down by 5 to 66 and 21. Their gap is unchanged: 71 − 26 = 45 and 66 − 21 = 45.",
      "hint": "Compare both pairs of corresponding numbers."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-011",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "bar unknown part",
    "printable": true,
    "type": "single",
    "question": "What is the unknown part in the bar?",
    "audioPrompt": "What is the unknown part in the bar?",
    "visual": "A bar with whole 185. It is split into a part labelled 79 and an unknown part.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"A bar with whole 185. It is split into a part labelled 79 and an unknown part.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4a01/t011.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4a01/t011.svg#model",
      "alt_text": "A bar with whole 185. It is split into a part labelled 79 and an unknown part."
    },
    "answers": [
      "96",
      "116",
      "264",
      "106"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 11,
    "correct": 3,
    "explanation": "Whole minus known part gives the unknown: 185 − 79 = 106. Check: 79 + 106 = 185.\nHint: Use the labelled whole and known part.",
    "structuredExplanation": {
      "summary": "Whole minus known part gives the unknown: 185 − 79 = 106. Check: 79 + 106 = 185.",
      "hint": "Use the labelled whole and known part."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-012",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "substitution check",
    "printable": true,
    "type": "single",
    "question": "Which check shows that 62 makes 108 − □ = 46 true?",
    "audioPrompt": "Which check shows that 62 makes 108 − □ = 46 true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "62 − 46 = 108",
      "46 − 62 = 108",
      "108 − 62 = 46",
      "108 + 62 = 46"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 12,
    "correct": 2,
    "explanation": "Substitute 62 for the box without changing the rest of the equation. The left side is then 108 − 62 = 46, equal to the right side.\nHint: Replace only the box, keeping the original operation and order.",
    "structuredExplanation": {
      "summary": "Substitute 62 for the box without changing the rest of the equation. The left side is then 108 − 62 = 46, equal to the right side.",
      "hint": "Replace only the box, keeping the original operation and order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-013",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "context unknown start addition",
    "printable": true,
    "type": "single",
    "question": "A player gains 38 points and now has 97 points. How many points did the player have before the gain?",
    "audioPrompt": "A player gains 38 points and now has 97 points. How many points did the player have before the gain?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "135",
      "69",
      "59",
      "49"
    ],
    "difficulty": 2,
    "difficultyTier": "core",
    "sequencePriority": 13,
    "correct": 2,
    "explanation": "The starting score is a missing addend: □ + 38 = 97. Subtract the gain from the final score: 97 − 38 = 59. Check: 59 + 38 = 97.\nHint: Decide which score is the whole after the points are added.",
    "structuredExplanation": {
      "summary": "The starting score is a missing addend: □ + 38 = 97. Subtract the gain from the final score: 97 − 38 = 59. Check: 59 + 38 = 97.",
      "hint": "Decide which score is the whole after the points are added."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-014",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "context balance totals",
    "printable": true,
    "type": "single",
    "question": "Two teams finish with equal scores. One team has 88 points before gaining an unknown number. The other has 105 points before gaining 23. How many points did the first team gain?",
    "audioPrompt": "Two teams finish with equal scores. One team has 88 points before gaining an unknown number. The other has 105 points before gaining 23. How many points did the first team gain?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "216",
      "128",
      "30",
      "40"
    ],
    "difficulty": 3,
    "difficultyTier": "challenge",
    "sequencePriority": 14,
    "correct": 3,
    "explanation": "Equal scores give 88 + □ = 105 + 23. The final score is 128, so the first team gained 128 − 88 = 40 points.\nHint: Write an equation for the equal final scores.",
    "structuredExplanation": {
      "summary": "Equal scores give 88 + □ = 105 + 23. The final score is 128, so the first team gained 128 − 88 = 40 points.",
      "hint": "Write an equation for the equal final scores."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-015",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "identity generalisation",
    "printable": true,
    "type": "single",
    "question": "The two boxes represent the same whole number in □ + 18 = 18 + □. Which statement is true?",
    "audioPrompt": "The two boxes represent the same whole number in □ + 18 = 18 + □. Which statement is true?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Any whole number in both boxes makes the equation true.",
      "Only 0 can go in both boxes.",
      "Only 18 can go in both boxes.",
      "No whole number can go in both boxes."
    ],
    "difficulty": 3,
    "difficultyTier": "challenge",
    "sequencePriority": 15,
    "correct": 0,
    "explanation": "Each side adds the same two numbers in a different order. The commutative property makes the equation true for any whole number used in both boxes.\nHint: Try two different numbers, then explain what reordering addition preserves.",
    "structuredExplanation": {
      "summary": "Each side adds the same two numbers in a different order. The commutative property makes the equation true for any whole number used in both boxes.",
      "hint": "Try two different numbers, then explain what reordering addition preserves."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4a01-t-016",
    "curriculumCode": "AC9M4A01",
    "bank": "test",
    "skill": "error unknown removed",
    "printable": true,
    "type": "single",
    "question": "A student adds 83 and 29 to solve 83 − □ = 29. Which correction is right?",
    "audioPrompt": "A student adds 83 and 29 to solve 83 − □ = 29. Which correction is right?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Find 83 − 29 = 54, then check 83 − 54 = 29.",
      "Use 29 because it is already on the right.",
      "Find 83 − 29 = 54, then put 54 in place of 83.",
      "Use 112 because adding always finds a missing value."
    ],
    "difficulty": 3,
    "difficultyTier": "challenge",
    "sequencePriority": 16,
    "correct": 0,
    "explanation": "The unknown is the part removed from 83. The remaining part is 29, so the removed part is 83 − 29 = 54. The check must replace the box, not the starting number.\nHint: Identify the role of the unknown before choosing the operation.",
    "structuredExplanation": {
      "summary": "The unknown is the part removed from 83. The remaining part is 29, so the removed part is 83 − 29 = 54. The check must replace the box, not the starting number.",
      "hint": "Identify the role of the unknown before choosing the operation."
    },
    "qualitySchema": "production-v1"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
