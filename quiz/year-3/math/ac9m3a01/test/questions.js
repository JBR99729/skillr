"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m3a01-t-001",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "missing addend",
    "printable": true,
    "type": "single",
    "question": "Find the missing number: 187 + □ = 433.",
    "audioPrompt": "Find the missing number: 187 + □ = 433.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "246",
      "620",
      "256",
      "236"
    ],
    "difficulty": 1,
    "correct": 0,
    "explanation": "Subtract the known part: 433 − 187 = 246. Check: 187 + 246 = 433.\nHint: Identify the whole and the known part.",
    "structuredExplanation": {
      "summary": "Subtract the known part: 433 − 187 = 246. Check: 187 + 246 = 433.",
      "hint": "Identify the whole and the known part."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-002",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "unknown minuend",
    "printable": true,
    "type": "single",
    "question": "□ − 347 = 168. What was the starting number?",
    "audioPrompt": "□ − 347 = 168. What was the starting number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "179",
      "525",
      "505",
      "515"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "Put back the amount removed: 168 + 347 = 515.\nHint: Undo subtraction by adding.",
    "structuredExplanation": {
      "summary": "Put back the amount removed: 168 + 347 = 515.",
      "hint": "Undo subtraction by adding."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-003",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "unknown subtrahend",
    "printable": true,
    "type": "single",
    "question": "465 − □ = 318. How much was taken away?",
    "audioPrompt": "465 − □ = 318. How much was taken away?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "783",
      "318",
      "147",
      "157"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "The whole is 465 and the remaining part is 318; 465 − 318 = 147.\nHint: The missing number is the removed part, not the whole.",
    "structuredExplanation": {
      "summary": "The whole is 465 and the remaining part is 318; 465 − 318 = 147.",
      "hint": "The missing number is the removed part, not the whole."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-004",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "select inverse",
    "printable": true,
    "type": "single",
    "question": "245 + □ = 383. Which calculation finds the missing part?",
    "audioPrompt": "245 + □ = 383. Which calculation finds the missing part?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "383 + 245",
      "383 − 245",
      "245 − 383",
      "383 − 383"
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "Subtract a known part from the whole to find the other part. The missing part is 138.\nHint: Addition and subtraction undo each other.",
    "structuredExplanation": {
      "summary": "Subtract a known part from the whole to find the other part. The missing part is 138.",
      "hint": "Addition and subtraction undo each other."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-005",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "part whole diagram",
    "printable": true,
    "type": "single",
    "question": "What number belongs in the empty part of this diagram?",
    "audioPrompt": "What number belongs in the empty part of this diagram?",
    "visual": "Whole 463; one part 184; other part unknown. Diagram not to scale.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Whole 463; one part 184; other part unknown. Diagram not to scale.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3a01-reviewed.svg#ac9m3a01-t-005\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3a01-reviewed.svg#ac9m3a01-t-005",
      "alt_text": "Whole 463; one part 184; other part unknown. Diagram not to scale."
    },
    "answers": [
      "279",
      "647",
      "184",
      "289"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "The two parts make 463. Subtract the known part: 463 − 184 = 279.\nHint: Use whole minus known part.",
    "structuredExplanation": {
      "summary": "The two parts make 463. Subtract the known part: 463 − 184 = 279.",
      "hint": "Use whole minus known part."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-006",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "complete fact family",
    "printable": true,
    "type": "single",
    "question": "359 + 126 = 485; 126 + 359 = 485; 485 − 359 = 126. Which related fact is missing?",
    "audioPrompt": "359 + 126 = 485; 126 + 359 = 485; 485 − 359 = 126. Which related fact is missing?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "359 − 126 = 485",
      "485 + 126 = 359",
      "485 − 359 = 126",
      "485 − 126 = 359"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "The missing subtraction removes the other part, 126, from the same whole 485.\nHint: Use the same whole and both parts.",
    "structuredExplanation": {
      "summary": "The missing subtraction removes the other part, 126, from the same whole 485.",
      "hint": "Use the same whole and both parts."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-007",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "balance addition",
    "printable": true,
    "type": "single",
    "question": "367 + 126 = 67 + □. Find □.",
    "audioPrompt": "367 + 126 = 67 + □. Find □.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "560",
      "493",
      "426",
      "416"
    ],
    "difficulty": 3,
    "correct": 2,
    "explanation": "Both sides must equal 493. So □ = 493 − 67 = 426.\nHint: Work out the complete side first.",
    "structuredExplanation": {
      "summary": "Both sides must equal 493. So □ = 493 − 67 = 426.",
      "hint": "Work out the complete side first."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-008",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "balance subtraction",
    "printable": true,
    "type": "single",
    "question": "643 − 258 = □ − 67. Find □.",
    "audioPrompt": "643 − 258 = □ − 67. Find □.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "318",
      "452",
      "385",
      "462"
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "The left side is 385. The missing starting number is 385 + 67 = 452.\nHint: Undo the subtraction on the incomplete side.",
    "structuredExplanation": {
      "summary": "The left side is 385. The missing starting number is 385 + 67 = 452.",
      "hint": "Undo the subtraction on the incomplete side."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-009",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "check with inverse",
    "printable": true,
    "type": "single",
    "question": "A student says 605 − 347 = 258. Which addition checks this answer?",
    "audioPrompt": "A student says 605 − 347 = 258. Which addition checks this answer?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "258 + 347 = 605",
      "605 + 347 = 258",
      "258 + 605 = 347",
      "347 + 347 = 605"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "Adding the amount removed to the amount remaining must rebuild the starting whole.\nHint: Combine the two parts again.",
    "structuredExplanation": {
      "summary": "Adding the amount removed to the amount remaining must rebuild the starting whole.",
      "hint": "Combine the two parts again."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-010",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "diagnose missing part",
    "printable": true,
    "type": "single",
    "question": "To solve 462 + □ = 651, a student calculates 462 + 651. What should they do?",
    "audioPrompt": "To solve 462 + □ = 651, a student calculates 462 + 651. What should they do?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Add another 462.",
      "Subtract 651 from 462.",
      "Use the whole as the missing part.",
      "Subtract 462 from 651."
    ],
    "difficulty": 3,
    "correct": 3,
    "explanation": "651 is already the total. Its missing part is 651 − 462 = 189.\nHint: Decide which number is the whole.",
    "structuredExplanation": {
      "summary": "651 is already the total. Its missing part is 651 − 462 = 189.",
      "hint": "Decide which number is the whole."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-011",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "explain inverse",
    "printable": true,
    "type": "single",
    "question": "Why can you find □ in □ − 28 = 46 by calculating 46 + 28?",
    "audioPrompt": "Why can you find □ in □ − 28 = 46 by calculating 46 + 28?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "The answer to subtraction is always the larger number.",
      "You can swap the two numbers in every subtraction.",
      "Putting back the removed part gives the starting whole.",
      "The missing number must be smaller than 46."
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "46 is the remaining part and 28 was removed; together they give the starting whole.\nHint: Think about undoing a change.",
    "structuredExplanation": {
      "summary": "46 is the remaining part and 28 was removed; together they give the starting whole.",
      "hint": "Think about undoing a change."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-012",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "nonstandard partition",
    "printable": true,
    "type": "single",
    "question": "427 is split into 260 and another part. What is the other part?",
    "audioPrompt": "427 is split into 260 and another part. What is the other part?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "177",
      "167",
      "687",
      "157"
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "427 − 260 = 167. A partition need not use only hundreds, tens and ones separately.\nHint: Both parts together must equal the whole.",
    "structuredExplanation": {
      "summary": "427 − 260 = 167. A partition need not use only hundreds, tens and ones separately.",
      "hint": "Both parts together must equal the whole."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-013",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "reversed equality",
    "printable": true,
    "type": "single",
    "question": "443 = □ + 269. What goes in □?",
    "audioPrompt": "443 = □ + 269. What goes in □?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "174",
      "712",
      "184",
      "164"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "An equals sign means both sides have the same value. 443 − 269 = 174.\nHint: The whole can be on either side of the equals sign.",
    "structuredExplanation": {
      "summary": "An equals sign means both sides have the same value. 443 − 269 = 174.",
      "hint": "The whole can be on either side of the equals sign."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-014",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "context unknown",
    "printable": true,
    "type": "single",
    "question": "A bus has 187 passengers after some get off. It had 452 before they got off. How many got off?",
    "audioPrompt": "A bus has 187 passengers after some get off. It had 452 before they got off. How many got off?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "639",
      "275",
      "187",
      "265"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "The known whole is 452 and the known part is 187. The missing part is 452 − 187 = 265.\nHint: Represent the whole and its parts before calculating.",
    "structuredExplanation": {
      "summary": "The known whole is 452 and the known part is 187. The missing part is 452 − 187 = 265.",
      "hint": "Represent the whole and its parts before calculating."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-015",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "zero and equality",
    "printable": true,
    "type": "single",
    "question": "204 = 204 + □. What is □?",
    "audioPrompt": "204 = 204 + □. What is □?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "204",
      "1",
      "0",
      "408"
    ],
    "difficulty": 1,
    "correct": 2,
    "explanation": "Both sides stay equal only when zero is added.\nHint: Check your number in the original sentence.",
    "structuredExplanation": {
      "summary": "Both sides stay equal only when zero is added.",
      "hint": "Check your number in the original sentence."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3a01-t-016",
    "curriculumCode": "AC9M3A01",
    "bank": "test",
    "skill": "same unknown twice",
    "printable": true,
    "type": "single",
    "question": "The two boxes stand for the same number: □ + □ = 84. What is each number?",
    "audioPrompt": "The two boxes stand for the same number: □ + □ = 84. What is each number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "84",
      "42",
      "41",
      "43"
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "The total is split into two equal parts: 42 + 42 = 84.\nHint: Both boxes must contain the same value.",
    "structuredExplanation": {
      "summary": "The total is split into two equal parts: 42 + 42 = 84.",
      "hint": "Both boxes must contain the same value."
    },
    "qualitySchema": "production-v1"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
