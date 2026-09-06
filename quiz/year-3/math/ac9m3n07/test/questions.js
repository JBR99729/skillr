"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m3n07-t-001",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "repeat addition",
    "printable": true,
    "type": "single",
    "question": "Start at 6. Add 7, write the result, and repeat until you have written 3 results. What is the third result?",
    "audioPrompt": "Start at 6. Add 7, write the result, and repeat until you have written 3 results. What is the third result?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "20",
      "34",
      "27",
      "42"
    ],
    "difficulty": 1,
    "correct": 2,
    "explanation": "The written results are 13, 20, 27. The starting number is not one of the written results.\nHint: Count the actions, not the starting value.",
    "structuredExplanation": {
      "summary": "The written results are 13, 20, 27. The starting number is not one of the written results.",
      "hint": "Count the actions, not the starting value."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-002",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "repeat halving",
    "printable": true,
    "type": "single",
    "question": "Start at 96. Halve the current number three times. What number do you finish with?",
    "audioPrompt": "Start at 96. Halve the current number three times. What number do you finish with?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "48",
      "12",
      "24",
      "90"
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "96 → 48 → 24 → 12. Each step halves the previous result.\nHint: Use the new result as the next input.",
    "structuredExplanation": {
      "summary": "96 → 48 → 24 → 12. Each step halves the previous result.",
      "hint": "Use the new result as the next input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-003",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "ordered steps",
    "printable": true,
    "type": "single",
    "question": "Start at 6. First add 5. Then double the result. What is the output?",
    "audioPrompt": "Start at 6. First add 5. Then double the result. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "22",
      "17",
      "11",
      "12"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "First 6 + 5 = 11. Then double 11 to get 22.\nHint: Follow the stated order; adding after doubling is a different rule.",
    "structuredExplanation": {
      "summary": "First 6 + 5 = 11. Then double 11 to get 22.",
      "hint": "Follow the stated order; adding after doubling is a different rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-004",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "even decision",
    "printable": true,
    "type": "single",
    "question": "Use this rule once for 21: if the number is even, halve it; otherwise, add 1. What is the output?",
    "audioPrompt": "Use this rule once for 21: if the number is even, halve it; otherwise, add 1. What is the output?",
    "visual": "Decision: even numbers are halved; other numbers have 1 added.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision: even numbers are halved; other numbers have 1 added.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-t-004\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-t-004",
      "alt_text": "Decision: even numbers are halved; other numbers have 1 added."
    },
    "answers": [
      "42",
      "23",
      "20",
      "22"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "21 is odd, so add 1 to get 22. Do not use both branches.\nHint: Decide which branch applies before calculating.",
    "structuredExplanation": {
      "summary": "21 is odd, so add 1 to get 22. Do not use both branches.",
      "hint": "Decide which branch applies before calculating."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-005",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "multiple decision",
    "printable": true,
    "type": "single",
    "question": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 47. What is the output?",
    "audioPrompt": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 47. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "57",
      "235",
      "49",
      "45"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "47 is not a multiple of 5, so add 2 to get 49.\nHint: Multiples of 5 end in 0 or 5.",
    "structuredExplanation": {
      "summary": "47 is not a multiple of 5, so add 2 to get 49.",
      "hint": "Multiples of 5 end in 0 or 5."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-006",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "boundary decision",
    "printable": true,
    "type": "single",
    "question": "If a number is LESS THAN 50, add 4. Otherwise subtract 3. What happens when the input is exactly 50?",
    "audioPrompt": "If a number is LESS THAN 50, add 4. Otherwise subtract 3. What happens when the input is exactly 50?",
    "visual": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision asks less than the stated threshold; yes adds 4, no subtracts 3.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-t-006\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-t-006",
      "alt_text": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3."
    },
    "answers": [
      "54",
      "47",
      "50",
      "51"
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "50 is equal to 50, not less. Use the otherwise branch: 50 − 3 = 47.\nHint: Check whether the boundary itself is included.",
    "structuredExplanation": {
      "summary": "50 is equal to 50, not less. Use the otherwise branch: 50 − 3 = 47.",
      "hint": "Check whether the boundary itself is included."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-007",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "stop at limit",
    "printable": true,
    "type": "single",
    "question": "Start at 5. Keep adding 7. Stop as soon as the result is at least 30. What is the stopping number?",
    "audioPrompt": "Start at 5. Keep adding 7. Stop as soon as the result is at least 30. What is the stopping number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "33",
      "26",
      "40",
      "32"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "The results are 12, 19, 26, 33. 33 is the first that reaches or passes 30.\nHint: “At least” includes equality and larger numbers.",
    "structuredExplanation": {
      "summary": "The results are 12, 19, 26, 33. 33 is the first that reaches or passes 30.",
      "hint": "“At least” includes equality and larger numbers."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-008",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "complete tripling algorithm",
    "printable": true,
    "type": "single",
    "question": "To make 3 times 9, first double 9. Which step completes the algorithm?",
    "audioPrompt": "To make 3 times 9, first double 9. Which step completes the algorithm?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Add 1.",
      "Double the result again.",
      "Subtract the original 9.",
      "Add the original 9."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "Doubling gives 18, or two groups of 9. Add one more group of 9 to get 27.\nHint: Three groups are two groups plus one group.",
    "structuredExplanation": {
      "summary": "Doubling gives 18, or two groups of 9. Add one more group of 9 to get 27.",
      "hint": "Three groups are two groups plus one group."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-009",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "coin sort algorithm",
    "printable": true,
    "type": "single",
    "question": "Sort coins into 5-cent and 10-cent groups. There are 6 five-cent coins and 5 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "audioPrompt": "Sort coins into 5-cent and 10-cent groups. There are 6 five-cent coins and 5 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "11",
      "85",
      "80",
      "75"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "6 × 5 = 30 cents and 5 × 10 = 50 cents. Add to get 80 cents.\nHint: Use coin values, not just the number of coins.",
    "structuredExplanation": {
      "summary": "6 × 5 = 30 cents and 5 × 10 = 50 cents. Add to get 80 cents.",
      "hint": "Use coin values, not just the number of coins."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-010",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "debug trace",
    "printable": true,
    "type": "single",
    "question": "The rule is “add 6 each time”. The recorded numbers are 9, 15, 22, 27. Which value needs replacing?",
    "audioPrompt": "The rule is “add 6 each time”. The recorded numbers are 9, 15, 22, 27. Which value needs replacing?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Replace 15 with 16.",
      "Replace 22 with 21.",
      "Replace 9 with 10.",
      "Replace 27 with 28."
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "15 + 6 = 21, not 22. The corrected next step also gives 27.\nHint: Test each transition against the rule.",
    "structuredExplanation": {
      "summary": "15 + 6 = 21, not 22. The corrected next step also gives 27.",
      "hint": "Test each transition against the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-011",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "explain parity pattern",
    "printable": true,
    "type": "single",
    "question": "Start at 14 and repeatedly add 8. What pattern do the results follow?",
    "audioPrompt": "Start at 14 and repeatedly add 8. What pattern do the results follow?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "They stay even.",
      "They alternate between odd and even.",
      "They all end in zero.",
      "They eventually decrease."
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "Adding an even number preserves whether a number is odd or even. Starting at 14, all results stay even.\nHint: Think about adding complete pairs.",
    "structuredExplanation": {
      "summary": "Adding an even number preserves whether a number is odd or even. Starting at 14, all results stay even.",
      "hint": "Think about adding complete pairs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-012",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "find table rule",
    "printable": true,
    "type": "single",
    "question": "The table maps 2 to 12, 4 to 24, and 7 to 42. Which multiplication rule fits every row?",
    "audioPrompt": "The table maps 2 to 12, 4 to 24, and 7 to 42. Which multiplication rule fits every row?",
    "visual": "Input-output pairs: 2 to 12, 4 to 24, 7 to 42.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Input-output pairs: 2 to 12, 4 to 24, 7 to 42.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-t-012\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-t-012",
      "alt_text": "Input-output pairs: 2 to 12, 4 to 24, 7 to 42."
    },
    "answers": [
      "Add 6.",
      "Multiply by 7.",
      "Subtract 6.",
      "Multiply by 6."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "2 × 6 = 12, 4 × 6 = 24, and 7 × 6 = 42. The same rule fits all rows.\nHint: A rule must work for every input-output pair.",
    "structuredExplanation": {
      "summary": "2 × 6 = 12, 4 × 6 = 24, and 7 × 6 = 42. The same rule fits all rows.",
      "hint": "A rule must work for every input-output pair."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-013",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "reverse two steps",
    "printable": true,
    "type": "single",
    "question": "A machine doubles its input, then adds 6. The output is 28. What was the input?",
    "audioPrompt": "A machine doubles its input, then adds 6. The output is 28. What was the input?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "22",
      "14",
      "11",
      "10"
    ],
    "difficulty": 3,
    "correct": 2,
    "explanation": "Undo the last step first: 28 − 6 = 22. Then halve to get 11.\nHint: Work backwards in reverse order.",
    "structuredExplanation": {
      "summary": "Undo the last step first: 28 − 6 = 22. Then halve to get 11.",
      "hint": "Work backwards in reverse order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-014",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "design stop rule",
    "printable": true,
    "type": "single",
    "question": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 36. Which check should follow every addition?",
    "audioPrompt": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 36. Which check should follow every addition?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Stop before doing any addition.",
      "If the new total equals 36, stop; otherwise repeat.",
      "Always repeat, even after reaching the target.",
      "Stop after the first addition."
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "36 is reached after 12 additions of 3. Checking each new total stops the process at the target.\nHint: A repeating algorithm needs an explicit stopping decision.",
    "structuredExplanation": {
      "summary": "36 is reached after 12 additions of 3. Checking each new total stops the process at the target.",
      "hint": "A repeating algorithm needs an explicit stopping decision."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-015",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "recheck branch",
    "printable": true,
    "type": "single",
    "question": "Rule: if even, halve; if odd, add 1. Start at 16 and apply the rule twice, checking the new number each time. What is the final number?",
    "audioPrompt": "Rule: if even, halve; if odd, add 1. Start at 16 and apply the rule twice, checking the new number each time. What is the final number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "4",
      "8",
      "6",
      "32"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "16 becomes 8. Check 8 again: it becomes 4. The decision uses the current value.\nHint: Do not keep using the branch chosen for the starting number.",
    "structuredExplanation": {
      "summary": "16 becomes 8. Check 8 again: it becomes 4. The decision uses the current value.",
      "hint": "Do not keep using the branch chosen for the starting number."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-t-016",
    "curriculumCode": "AC9M3N07",
    "bank": "test",
    "skill": "complete creation",
    "printable": true,
    "type": "single",
    "question": "Complete these instructions to generate 12, 20, 28, 36: “Write 12. Then ___, write the result and repeat.”",
    "audioPrompt": "Complete these instructions to generate 12, 20, 28, 36: “Write 12. Then ___, write the result and repeat.”",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "add 12 to the current number",
      "multiply the current number by 8",
      "subtract 8 from the current number",
      "add 8 to the current number"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "The gap between successive numbers is always 8. The instruction must update the current number by that amount.\nHint: Test the proposed step on every pair of neighbours.",
    "structuredExplanation": {
      "summary": "The gap between successive numbers is always 8. The instruction must update the current number by that amount.",
      "hint": "Test the proposed step on every pair of neighbours."
    },
    "qualitySchema": "production-v1"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
