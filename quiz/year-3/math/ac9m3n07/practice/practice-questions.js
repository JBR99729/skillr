"use strict";
window.skillrPracticeQuestions = [
  {
    "id": "ac9m3n07-p-001",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "repeat addition",
    "printable": true,
    "type": "single",
    "question": "Start at 2. Add 3, write the result, and repeat until you have written 3 results. What is the third result?",
    "audioPrompt": "Start at 2. Add 3, write the result, and repeat until you have written 3 results. What is the third result?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "8",
      "14",
      "11",
      "6"
    ],
    "difficulty": 1,
    "correct": 2,
    "explanation": "The written results are 5, 8, 11. The starting number is not one of the written results.\nHint: Count the actions, not the starting value.",
    "structuredExplanation": {
      "summary": "The written results are 5, 8, 11. The starting number is not one of the written results.",
      "hint": "Count the actions, not the starting value."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-002",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "repeat halving",
    "printable": true,
    "type": "single",
    "question": "Start at 48. Halve the current number three times. What number do you finish with?",
    "audioPrompt": "Start at 48. Halve the current number three times. What number do you finish with?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "24",
      "6",
      "12",
      "42"
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "48 → 24 → 12 → 6. Each step halves the previous result.\nHint: Use the new result as the next input.",
    "structuredExplanation": {
      "summary": "48 → 24 → 12 → 6. Each step halves the previous result.",
      "hint": "Use the new result as the next input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-003",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "ordered steps",
    "printable": true,
    "type": "single",
    "question": "Start at 4. First add 3. Then double the result. What is the output?",
    "audioPrompt": "Start at 4. First add 3. Then double the result. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "14",
      "11",
      "7",
      "8"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "First 4 + 3 = 7. Then double 7 to get 14.\nHint: Follow the stated order; adding after doubling is a different rule.",
    "structuredExplanation": {
      "summary": "First 4 + 3 = 7. Then double 7 to get 14.",
      "hint": "Follow the stated order; adding after doubling is a different rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-004",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "even decision",
    "printable": true,
    "type": "single",
    "question": "Use this rule once for 12: if the number is even, halve it; otherwise, add 1. What is the output?",
    "audioPrompt": "Use this rule once for 12: if the number is even, halve it; otherwise, add 1. What is the output?",
    "visual": "Decision: even numbers are halved; other numbers have 1 added.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision: even numbers are halved; other numbers have 1 added.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-004\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-004",
      "alt_text": "Decision: even numbers are halved; other numbers have 1 added."
    },
    "answers": [
      "24",
      "14",
      "11",
      "6"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "12 is even, so halve it to get 6. Do not use both branches.\nHint: Decide which branch applies before calculating.",
    "structuredExplanation": {
      "summary": "12 is even, so halve it to get 6. Do not use both branches.",
      "hint": "Decide which branch applies before calculating."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-005",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "multiple decision",
    "printable": true,
    "type": "single",
    "question": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 25. What is the output?",
    "audioPrompt": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 25. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "27",
      "125",
      "35",
      "23"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "25 is a multiple of 5, so add 10 to get 35.\nHint: Multiples of 5 end in 0 or 5.",
    "structuredExplanation": {
      "summary": "25 is a multiple of 5, so add 10 to get 35.",
      "hint": "Multiples of 5 end in 0 or 5."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-006",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "boundary decision",
    "printable": true,
    "type": "single",
    "question": "If a number is LESS THAN 20, add 4. Otherwise subtract 3. What happens when the input is exactly 20?",
    "audioPrompt": "If a number is LESS THAN 20, add 4. Otherwise subtract 3. What happens when the input is exactly 20?",
    "visual": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision asks less than the stated threshold; yes adds 4, no subtracts 3.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-006\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-006",
      "alt_text": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3."
    },
    "answers": [
      "24",
      "17",
      "20",
      "21"
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "20 is equal to 20, not less. Use the otherwise branch: 20 − 3 = 17.\nHint: Check whether the boundary itself is included.",
    "structuredExplanation": {
      "summary": "20 is equal to 20, not less. Use the otherwise branch: 20 − 3 = 17.",
      "hint": "Check whether the boundary itself is included."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-007",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "stop at limit",
    "printable": true,
    "type": "single",
    "question": "Start at 2. Keep adding 4. Stop as soon as the result is at least 15. What is the stopping number?",
    "audioPrompt": "Start at 2. Keep adding 4. Stop as soon as the result is at least 15. What is the stopping number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "18",
      "14",
      "22",
      "17"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "The results are 6, 10, 14, 18. 18 is the first that reaches or passes 15.\nHint: “At least” includes equality and larger numbers.",
    "structuredExplanation": {
      "summary": "The results are 6, 10, 14, 18. 18 is the first that reaches or passes 15.",
      "hint": "“At least” includes equality and larger numbers."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-008",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "complete tripling algorithm",
    "printable": true,
    "type": "single",
    "question": "To make 3 times 4, first double 4. Which step completes the algorithm?",
    "audioPrompt": "To make 3 times 4, first double 4. Which step completes the algorithm?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Add 1.",
      "Double the result again.",
      "Subtract the original 4.",
      "Add the original 4."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "Doubling gives 8, or two groups of 4. Add one more group of 4 to get 12.\nHint: Three groups are two groups plus one group.",
    "structuredExplanation": {
      "summary": "Doubling gives 8, or two groups of 4. Add one more group of 4 to get 12.",
      "hint": "Three groups are two groups plus one group."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-009",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "coin sort algorithm",
    "printable": true,
    "type": "single",
    "question": "Sort coins into 5-cent and 10-cent groups. There are 3 five-cent coins and 2 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "audioPrompt": "Sort coins into 5-cent and 10-cent groups. There are 3 five-cent coins and 2 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "5",
      "40",
      "35",
      "30"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "3 × 5 = 15 cents and 2 × 10 = 20 cents. Add to get 35 cents.\nHint: Use coin values, not just the number of coins.",
    "structuredExplanation": {
      "summary": "3 × 5 = 15 cents and 2 × 10 = 20 cents. Add to get 35 cents.",
      "hint": "Use coin values, not just the number of coins."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-010",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "debug trace",
    "printable": true,
    "type": "single",
    "question": "The rule is “add 4 each time”. The recorded numbers are 5, 9, 14, 17. Which value needs replacing?",
    "audioPrompt": "The rule is “add 4 each time”. The recorded numbers are 5, 9, 14, 17. Which value needs replacing?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Replace 9 with 10.",
      "Replace 14 with 13.",
      "Replace 5 with 6.",
      "Replace 17 with 18."
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "9 + 4 = 13, not 14. The corrected next step also gives 17.\nHint: Test each transition against the rule.",
    "structuredExplanation": {
      "summary": "9 + 4 = 13, not 14. The corrected next step also gives 17.",
      "hint": "Test each transition against the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-011",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "explain parity pattern",
    "printable": true,
    "type": "single",
    "question": "Start at 3 and repeatedly add 2. What pattern do the results follow?",
    "audioPrompt": "Start at 3 and repeatedly add 2. What pattern do the results follow?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "They stay odd.",
      "They alternate between odd and even.",
      "They all end in zero.",
      "They eventually decrease."
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "Adding an even number preserves whether a number is odd or even. Starting at 3, all results stay odd.\nHint: Think about adding complete pairs.",
    "structuredExplanation": {
      "summary": "Adding an even number preserves whether a number is odd or even. Starting at 3, all results stay odd.",
      "hint": "Think about adding complete pairs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-012",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "find table rule",
    "printable": true,
    "type": "single",
    "question": "The table maps 2 to 6, 4 to 12, and 7 to 21. Which multiplication rule fits every row?",
    "audioPrompt": "The table maps 2 to 6, 4 to 12, and 7 to 21. Which multiplication rule fits every row?",
    "visual": "Input-output pairs: 2 to 6, 4 to 12, 7 to 21.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Input-output pairs: 2 to 6, 4 to 12, 7 to 21.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-012\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-012",
      "alt_text": "Input-output pairs: 2 to 6, 4 to 12, 7 to 21."
    },
    "answers": [
      "Add 3.",
      "Multiply by 4.",
      "Subtract 3.",
      "Multiply by 3."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "2 × 3 = 6, 4 × 3 = 12, and 7 × 3 = 21. The same rule fits all rows.\nHint: A rule must work for every input-output pair.",
    "structuredExplanation": {
      "summary": "2 × 3 = 6, 4 × 3 = 12, and 7 × 3 = 21. The same rule fits all rows.",
      "hint": "A rule must work for every input-output pair."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-013",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "reverse two steps",
    "printable": true,
    "type": "single",
    "question": "A machine doubles its input, then adds 3. The output is 13. What was the input?",
    "audioPrompt": "A machine doubles its input, then adds 3. The output is 13. What was the input?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "10",
      "6",
      "5",
      "4"
    ],
    "difficulty": 3,
    "correct": 2,
    "explanation": "Undo the last step first: 13 − 3 = 10. Then halve to get 5.\nHint: Work backwards in reverse order.",
    "structuredExplanation": {
      "summary": "Undo the last step first: 13 − 3 = 10. Then halve to get 5.",
      "hint": "Work backwards in reverse order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-014",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "design stop rule",
    "printable": true,
    "type": "single",
    "question": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 18. Which check should follow every addition?",
    "audioPrompt": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 18. Which check should follow every addition?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Stop before doing any addition.",
      "If the new total equals 18, stop; otherwise repeat.",
      "Always repeat, even after reaching the target.",
      "Stop after the first addition."
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "18 is reached after 6 additions of 3. Checking each new total stops the process at the target.\nHint: A repeating algorithm needs an explicit stopping decision.",
    "structuredExplanation": {
      "summary": "18 is reached after 6 additions of 3. Checking each new total stops the process at the target.",
      "hint": "A repeating algorithm needs an explicit stopping decision."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-015",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "recheck branch",
    "printable": true,
    "type": "single",
    "question": "Rule: if even, halve; if odd, add 1. Start at 7 and apply the rule twice, checking the new number each time. What is the final number?",
    "audioPrompt": "Rule: if even, halve; if odd, add 1. Start at 7 and apply the rule twice, checking the new number each time. What is the final number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "4",
      "8",
      "6",
      "14"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "7 becomes 8. Check 8 again: it becomes 4. The decision uses the current value.\nHint: Do not keep using the branch chosen for the starting number.",
    "structuredExplanation": {
      "summary": "7 becomes 8. Check 8 again: it becomes 4. The decision uses the current value.",
      "hint": "Do not keep using the branch chosen for the starting number."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-016",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "complete creation",
    "printable": true,
    "type": "single",
    "question": "Complete these instructions to generate 4, 9, 14, 19: “Write 4. Then ___, write the result and repeat.”",
    "audioPrompt": "Complete these instructions to generate 4, 9, 14, 19: “Write 4. Then ___, write the result and repeat.”",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "add 4 to the current number",
      "multiply the current number by 5",
      "subtract 5 from the current number",
      "add 5 to the current number"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "The gap between successive numbers is always 5. The instruction must update the current number by that amount.\nHint: Test the proposed step on every pair of neighbours.",
    "structuredExplanation": {
      "summary": "The gap between successive numbers is always 5. The instruction must update the current number by that amount.",
      "hint": "Test the proposed step on every pair of neighbours."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-017",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "repeat addition",
    "printable": true,
    "type": "single",
    "question": "Start at 7. Add 4, write the result, and repeat until you have written 3 results. What is the third result?",
    "audioPrompt": "Start at 7. Add 4, write the result, and repeat until you have written 3 results. What is the third result?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "15",
      "23",
      "19",
      "28"
    ],
    "difficulty": 1,
    "correct": 2,
    "explanation": "The written results are 11, 15, 19. The starting number is not one of the written results.\nHint: Count the actions, not the starting value.",
    "structuredExplanation": {
      "summary": "The written results are 11, 15, 19. The starting number is not one of the written results.",
      "hint": "Count the actions, not the starting value."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-018",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "repeat halving",
    "printable": true,
    "type": "single",
    "question": "Start at 64. Halve the current number three times. What number do you finish with?",
    "audioPrompt": "Start at 64. Halve the current number three times. What number do you finish with?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "32",
      "8",
      "16",
      "58"
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "64 → 32 → 16 → 8. Each step halves the previous result.\nHint: Use the new result as the next input.",
    "structuredExplanation": {
      "summary": "64 → 32 → 16 → 8. Each step halves the previous result.",
      "hint": "Use the new result as the next input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-019",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "ordered steps",
    "printable": true,
    "type": "single",
    "question": "Start at 7. First add 2. Then double the result. What is the output?",
    "audioPrompt": "Start at 7. First add 2. Then double the result. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "18",
      "16",
      "9",
      "14"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "First 7 + 2 = 9. Then double 9 to get 18.\nHint: Follow the stated order; adding after doubling is a different rule.",
    "structuredExplanation": {
      "summary": "First 7 + 2 = 9. Then double 9 to get 18.",
      "hint": "Follow the stated order; adding after doubling is a different rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-020",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "even decision",
    "printable": true,
    "type": "single",
    "question": "Use this rule once for 15: if the number is even, halve it; otherwise, add 1. What is the output?",
    "audioPrompt": "Use this rule once for 15: if the number is even, halve it; otherwise, add 1. What is the output?",
    "visual": "Decision: even numbers are halved; other numbers have 1 added.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision: even numbers are halved; other numbers have 1 added.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-020\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-020",
      "alt_text": "Decision: even numbers are halved; other numbers have 1 added."
    },
    "answers": [
      "30",
      "17",
      "14",
      "16"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "15 is odd, so add 1 to get 16. Do not use both branches.\nHint: Decide which branch applies before calculating.",
    "structuredExplanation": {
      "summary": "15 is odd, so add 1 to get 16. Do not use both branches.",
      "hint": "Decide which branch applies before calculating."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-021",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "multiple decision",
    "printable": true,
    "type": "single",
    "question": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 32. What is the output?",
    "audioPrompt": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 32. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "42",
      "160",
      "34",
      "30"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "32 is not a multiple of 5, so add 2 to get 34.\nHint: Multiples of 5 end in 0 or 5.",
    "structuredExplanation": {
      "summary": "32 is not a multiple of 5, so add 2 to get 34.",
      "hint": "Multiples of 5 end in 0 or 5."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-022",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "boundary decision",
    "printable": true,
    "type": "single",
    "question": "If a number is LESS THAN 30, add 4. Otherwise subtract 3. What happens when the input is exactly 30?",
    "audioPrompt": "If a number is LESS THAN 30, add 4. Otherwise subtract 3. What happens when the input is exactly 30?",
    "visual": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision asks less than the stated threshold; yes adds 4, no subtracts 3.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-022\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-022",
      "alt_text": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3."
    },
    "answers": [
      "34",
      "27",
      "30",
      "31"
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "30 is equal to 30, not less. Use the otherwise branch: 30 − 3 = 27.\nHint: Check whether the boundary itself is included.",
    "structuredExplanation": {
      "summary": "30 is equal to 30, not less. Use the otherwise branch: 30 − 3 = 27.",
      "hint": "Check whether the boundary itself is included."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-023",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "stop at limit",
    "printable": true,
    "type": "single",
    "question": "Start at 3. Keep adding 5. Stop as soon as the result is at least 21. What is the stopping number?",
    "audioPrompt": "Start at 3. Keep adding 5. Stop as soon as the result is at least 21. What is the stopping number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "23",
      "18",
      "28",
      "22"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "The results are 8, 13, 18, 23. 23 is the first that reaches or passes 21.\nHint: “At least” includes equality and larger numbers.",
    "structuredExplanation": {
      "summary": "The results are 8, 13, 18, 23. 23 is the first that reaches or passes 21.",
      "hint": "“At least” includes equality and larger numbers."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-024",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "complete tripling algorithm",
    "printable": true,
    "type": "single",
    "question": "To make 3 times 6, first double 6. Which step completes the algorithm?",
    "audioPrompt": "To make 3 times 6, first double 6. Which step completes the algorithm?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Add 1.",
      "Double the result again.",
      "Subtract the original 6.",
      "Add the original 6."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "Doubling gives 12, or two groups of 6. Add one more group of 6 to get 18.\nHint: Three groups are two groups plus one group.",
    "structuredExplanation": {
      "summary": "Doubling gives 12, or two groups of 6. Add one more group of 6 to get 18.",
      "hint": "Three groups are two groups plus one group."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-025",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "coin sort algorithm",
    "printable": true,
    "type": "single",
    "question": "Sort coins into 5-cent and 10-cent groups. There are 4 five-cent coins and 3 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "audioPrompt": "Sort coins into 5-cent and 10-cent groups. There are 4 five-cent coins and 3 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "7",
      "55",
      "50",
      "45"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "4 × 5 = 20 cents and 3 × 10 = 30 cents. Add to get 50 cents.\nHint: Use coin values, not just the number of coins.",
    "structuredExplanation": {
      "summary": "4 × 5 = 20 cents and 3 × 10 = 30 cents. Add to get 50 cents.",
      "hint": "Use coin values, not just the number of coins."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-026",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "debug trace",
    "printable": true,
    "type": "single",
    "question": "The rule is “add 3 each time”. The recorded numbers are 8, 11, 15, 17. Which value needs replacing?",
    "audioPrompt": "The rule is “add 3 each time”. The recorded numbers are 8, 11, 15, 17. Which value needs replacing?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Replace 11 with 12.",
      "Replace 15 with 14.",
      "Replace 8 with 9.",
      "Replace 17 with 18."
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "11 + 3 = 14, not 15. The corrected next step also gives 17.\nHint: Test each transition against the rule.",
    "structuredExplanation": {
      "summary": "11 + 3 = 14, not 15. The corrected next step also gives 17.",
      "hint": "Test each transition against the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-027",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "explain parity pattern",
    "printable": true,
    "type": "single",
    "question": "Start at 6 and repeatedly add 4. What pattern do the results follow?",
    "audioPrompt": "Start at 6 and repeatedly add 4. What pattern do the results follow?",
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
    "explanation": "Adding an even number preserves whether a number is odd or even. Starting at 6, all results stay even.\nHint: Think about adding complete pairs.",
    "structuredExplanation": {
      "summary": "Adding an even number preserves whether a number is odd or even. Starting at 6, all results stay even.",
      "hint": "Think about adding complete pairs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-028",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "find table rule",
    "printable": true,
    "type": "single",
    "question": "The table maps 2 to 8, 4 to 16, and 7 to 28. Which multiplication rule fits every row?",
    "audioPrompt": "The table maps 2 to 8, 4 to 16, and 7 to 28. Which multiplication rule fits every row?",
    "visual": "Input-output pairs: 2 to 8, 4 to 16, 7 to 28.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Input-output pairs: 2 to 8, 4 to 16, 7 to 28.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-028\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-028",
      "alt_text": "Input-output pairs: 2 to 8, 4 to 16, 7 to 28."
    },
    "answers": [
      "Add 4.",
      "Multiply by 5.",
      "Subtract 4.",
      "Multiply by 4."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "2 × 4 = 8, 4 × 4 = 16, and 7 × 4 = 28. The same rule fits all rows.\nHint: A rule must work for every input-output pair.",
    "structuredExplanation": {
      "summary": "2 × 4 = 8, 4 × 4 = 16, and 7 × 4 = 28. The same rule fits all rows.",
      "hint": "A rule must work for every input-output pair."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-029",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "reverse two steps",
    "printable": true,
    "type": "single",
    "question": "A machine doubles its input, then adds 4. The output is 18. What was the input?",
    "audioPrompt": "A machine doubles its input, then adds 4. The output is 18. What was the input?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "14",
      "9",
      "7",
      "6"
    ],
    "difficulty": 3,
    "correct": 2,
    "explanation": "Undo the last step first: 18 − 4 = 14. Then halve to get 7.\nHint: Work backwards in reverse order.",
    "structuredExplanation": {
      "summary": "Undo the last step first: 18 − 4 = 14. Then halve to get 7.",
      "hint": "Work backwards in reverse order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-030",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "design stop rule",
    "printable": true,
    "type": "single",
    "question": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 24. Which check should follow every addition?",
    "audioPrompt": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 24. Which check should follow every addition?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Stop before doing any addition.",
      "If the new total equals 24, stop; otherwise repeat.",
      "Always repeat, even after reaching the target.",
      "Stop after the first addition."
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "24 is reached after 8 additions of 3. Checking each new total stops the process at the target.\nHint: A repeating algorithm needs an explicit stopping decision.",
    "structuredExplanation": {
      "summary": "24 is reached after 8 additions of 3. Checking each new total stops the process at the target.",
      "hint": "A repeating algorithm needs an explicit stopping decision."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-031",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "recheck branch",
    "printable": true,
    "type": "single",
    "question": "Rule: if even, halve; if odd, add 1. Start at 10 and apply the rule twice, checking the new number each time. What is the final number?",
    "audioPrompt": "Rule: if even, halve; if odd, add 1. Start at 10 and apply the rule twice, checking the new number each time. What is the final number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "6",
      "5",
      "8",
      "20"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "10 becomes 5. Check 5 again: it becomes 6. The decision uses the current value.\nHint: Do not keep using the branch chosen for the starting number.",
    "structuredExplanation": {
      "summary": "10 becomes 5. Check 5 again: it becomes 6. The decision uses the current value.",
      "hint": "Do not keep using the branch chosen for the starting number."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-032",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "complete creation",
    "printable": true,
    "type": "single",
    "question": "Complete these instructions to generate 7, 13, 19, 25: “Write 7. Then ___, write the result and repeat.”",
    "audioPrompt": "Complete these instructions to generate 7, 13, 19, 25: “Write 7. Then ___, write the result and repeat.”",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "add 7 to the current number",
      "multiply the current number by 6",
      "subtract 6 from the current number",
      "add 6 to the current number"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "The gap between successive numbers is always 6. The instruction must update the current number by that amount.\nHint: Test the proposed step on every pair of neighbours.",
    "structuredExplanation": {
      "summary": "The gap between successive numbers is always 6. The instruction must update the current number by that amount.",
      "hint": "Test the proposed step on every pair of neighbours."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-033",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "repeat addition",
    "printable": true,
    "type": "single",
    "question": "Start at 11. Add 5, write the result, and repeat until you have written 3 results. What is the third result?",
    "audioPrompt": "Start at 11. Add 5, write the result, and repeat until you have written 3 results. What is the third result?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "21",
      "31",
      "26",
      "55"
    ],
    "difficulty": 1,
    "correct": 2,
    "explanation": "The written results are 16, 21, 26. The starting number is not one of the written results.\nHint: Count the actions, not the starting value.",
    "structuredExplanation": {
      "summary": "The written results are 16, 21, 26. The starting number is not one of the written results.",
      "hint": "Count the actions, not the starting value."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-034",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "repeat halving",
    "printable": true,
    "type": "single",
    "question": "Start at 80. Halve the current number three times. What number do you finish with?",
    "audioPrompt": "Start at 80. Halve the current number three times. What number do you finish with?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "40",
      "10",
      "20",
      "74"
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "80 → 40 → 20 → 10. Each step halves the previous result.\nHint: Use the new result as the next input.",
    "structuredExplanation": {
      "summary": "80 → 40 → 20 → 10. Each step halves the previous result.",
      "hint": "Use the new result as the next input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-035",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "ordered steps",
    "printable": true,
    "type": "single",
    "question": "Start at 9. First add 4. Then double the result. What is the output?",
    "audioPrompt": "Start at 9. First add 4. Then double the result. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "26",
      "22",
      "13",
      "18"
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "First 9 + 4 = 13. Then double 13 to get 26.\nHint: Follow the stated order; adding after doubling is a different rule.",
    "structuredExplanation": {
      "summary": "First 9 + 4 = 13. Then double 13 to get 26.",
      "hint": "Follow the stated order; adding after doubling is a different rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-036",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "even decision",
    "printable": true,
    "type": "single",
    "question": "Use this rule once for 18: if the number is even, halve it; otherwise, add 1. What is the output?",
    "audioPrompt": "Use this rule once for 18: if the number is even, halve it; otherwise, add 1. What is the output?",
    "visual": "Decision: even numbers are halved; other numbers have 1 added.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision: even numbers are halved; other numbers have 1 added.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-036\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-036",
      "alt_text": "Decision: even numbers are halved; other numbers have 1 added."
    },
    "answers": [
      "36",
      "20",
      "17",
      "9"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "18 is even, so halve it to get 9. Do not use both branches.\nHint: Decide which branch applies before calculating.",
    "structuredExplanation": {
      "summary": "18 is even, so halve it to get 9. Do not use both branches.",
      "hint": "Decide which branch applies before calculating."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-037",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "multiple decision",
    "printable": true,
    "type": "single",
    "question": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 40. What is the output?",
    "audioPrompt": "An algorithm adds 10 to a multiple of 5, and adds 2 to any other whole number. Start with 40. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "42",
      "200",
      "50",
      "38"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "40 is a multiple of 5, so add 10 to get 50.\nHint: Multiples of 5 end in 0 or 5.",
    "structuredExplanation": {
      "summary": "40 is a multiple of 5, so add 10 to get 50.",
      "hint": "Multiples of 5 end in 0 or 5."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-038",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "boundary decision",
    "printable": true,
    "type": "single",
    "question": "If a number is LESS THAN 40, add 4. Otherwise subtract 3. What happens when the input is exactly 40?",
    "audioPrompt": "If a number is LESS THAN 40, add 4. Otherwise subtract 3. What happens when the input is exactly 40?",
    "visual": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Decision asks less than the stated threshold; yes adds 4, no subtracts 3.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-038\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-038",
      "alt_text": "Decision asks less than the stated threshold; yes adds 4, no subtracts 3."
    },
    "answers": [
      "44",
      "37",
      "40",
      "41"
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "40 is equal to 40, not less. Use the otherwise branch: 40 − 3 = 37.\nHint: Check whether the boundary itself is included.",
    "structuredExplanation": {
      "summary": "40 is equal to 40, not less. Use the otherwise branch: 40 − 3 = 37.",
      "hint": "Check whether the boundary itself is included."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-039",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "stop at limit",
    "printable": true,
    "type": "single",
    "question": "Start at 4. Keep adding 6. Stop as soon as the result is at least 25. What is the stopping number?",
    "audioPrompt": "Start at 4. Keep adding 6. Stop as soon as the result is at least 25. What is the stopping number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "28",
      "22",
      "34",
      "27"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "The results are 10, 16, 22, 28. 28 is the first that reaches or passes 25.\nHint: “At least” includes equality and larger numbers.",
    "structuredExplanation": {
      "summary": "The results are 10, 16, 22, 28. 28 is the first that reaches or passes 25.",
      "hint": "“At least” includes equality and larger numbers."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-040",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "complete tripling algorithm",
    "printable": true,
    "type": "single",
    "question": "To make 3 times 8, first double 8. Which step completes the algorithm?",
    "audioPrompt": "To make 3 times 8, first double 8. Which step completes the algorithm?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Add 1.",
      "Double the result again.",
      "Subtract the original 8.",
      "Add the original 8."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "Doubling gives 16, or two groups of 8. Add one more group of 8 to get 24.\nHint: Three groups are two groups plus one group.",
    "structuredExplanation": {
      "summary": "Doubling gives 16, or two groups of 8. Add one more group of 8 to get 24.",
      "hint": "Three groups are two groups plus one group."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-041",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "coin sort algorithm",
    "printable": true,
    "type": "single",
    "question": "Sort coins into 5-cent and 10-cent groups. There are 5 five-cent coins and 4 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "audioPrompt": "Sort coins into 5-cent and 10-cent groups. There are 5 five-cent coins and 4 ten-cent coins. Multiply each coin count by its value, then add. What total does the algorithm give, in cents?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "9",
      "70",
      "65",
      "60"
    ],
    "difficulty": 2,
    "correct": 2,
    "explanation": "5 × 5 = 25 cents and 4 × 10 = 40 cents. Add to get 65 cents.\nHint: Use coin values, not just the number of coins.",
    "structuredExplanation": {
      "summary": "5 × 5 = 25 cents and 4 × 10 = 40 cents. Add to get 65 cents.",
      "hint": "Use coin values, not just the number of coins."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-042",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "debug trace",
    "printable": true,
    "type": "single",
    "question": "The rule is “add 5 each time”. The recorded numbers are 12, 17, 23, 27. Which value needs replacing?",
    "audioPrompt": "The rule is “add 5 each time”. The recorded numbers are 12, 17, 23, 27. Which value needs replacing?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Replace 17 with 18.",
      "Replace 23 with 22.",
      "Replace 12 with 13.",
      "Replace 27 with 28."
    ],
    "difficulty": 2,
    "correct": 1,
    "explanation": "17 + 5 = 22, not 23. The corrected next step also gives 27.\nHint: Test each transition against the rule.",
    "structuredExplanation": {
      "summary": "17 + 5 = 22, not 23. The corrected next step also gives 27.",
      "hint": "Test each transition against the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-043",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "explain parity pattern",
    "printable": true,
    "type": "single",
    "question": "Start at 11 and repeatedly add 6. What pattern do the results follow?",
    "audioPrompt": "Start at 11 and repeatedly add 6. What pattern do the results follow?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "They stay odd.",
      "They alternate between odd and even.",
      "They all end in zero.",
      "They eventually decrease."
    ],
    "difficulty": 2,
    "correct": 0,
    "explanation": "Adding an even number preserves whether a number is odd or even. Starting at 11, all results stay odd.\nHint: Think about adding complete pairs.",
    "structuredExplanation": {
      "summary": "Adding an even number preserves whether a number is odd or even. Starting at 11, all results stay odd.",
      "hint": "Think about adding complete pairs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-044",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "find table rule",
    "printable": true,
    "type": "single",
    "question": "The table maps 2 to 10, 4 to 20, and 7 to 35. Which multiplication rule fits every row?",
    "audioPrompt": "The table maps 2 to 10, 4 to 20, and 7 to 35. Which multiplication rule fits every row?",
    "visual": "Input-output pairs: 2 to 10, 4 to 20, 7 to 35.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Input-output pairs: 2 to 10, 4 to 20, 7 to 35.\"><use href=\"/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-044\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year3/math/ac9m3n07-reviewed.svg#ac9m3n07-p-044",
      "alt_text": "Input-output pairs: 2 to 10, 4 to 20, 7 to 35."
    },
    "answers": [
      "Add 5.",
      "Multiply by 6.",
      "Subtract 5.",
      "Multiply by 5."
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "2 × 5 = 10, 4 × 5 = 20, and 7 × 5 = 35. The same rule fits all rows.\nHint: A rule must work for every input-output pair.",
    "structuredExplanation": {
      "summary": "2 × 5 = 10, 4 × 5 = 20, and 7 × 5 = 35. The same rule fits all rows.",
      "hint": "A rule must work for every input-output pair."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-045",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "reverse two steps",
    "printable": true,
    "type": "single",
    "question": "A machine doubles its input, then adds 5. The output is 23. What was the input?",
    "audioPrompt": "A machine doubles its input, then adds 5. The output is 23. What was the input?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "18",
      "11",
      "9",
      "8"
    ],
    "difficulty": 3,
    "correct": 2,
    "explanation": "Undo the last step first: 23 − 5 = 18. Then halve to get 9.\nHint: Work backwards in reverse order.",
    "structuredExplanation": {
      "summary": "Undo the last step first: 23 − 5 = 18. Then halve to get 9.",
      "hint": "Work backwards in reverse order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-046",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "design stop rule",
    "printable": true,
    "type": "single",
    "question": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 30. Which check should follow every addition?",
    "audioPrompt": "A counter starts at 0 and adds 3 each time. It must stop exactly when it reaches 30. Which check should follow every addition?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Stop before doing any addition.",
      "If the new total equals 30, stop; otherwise repeat.",
      "Always repeat, even after reaching the target.",
      "Stop after the first addition."
    ],
    "difficulty": 3,
    "correct": 1,
    "explanation": "30 is reached after 10 additions of 3. Checking each new total stops the process at the target.\nHint: A repeating algorithm needs an explicit stopping decision.",
    "structuredExplanation": {
      "summary": "30 is reached after 10 additions of 3. Checking each new total stops the process at the target.",
      "hint": "A repeating algorithm needs an explicit stopping decision."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-047",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "recheck branch",
    "printable": true,
    "type": "single",
    "question": "Rule: if even, halve; if odd, add 1. Start at 13 and apply the rule twice, checking the new number each time. What is the final number?",
    "audioPrompt": "Rule: if even, halve; if odd, add 1. Start at 13 and apply the rule twice, checking the new number each time. What is the final number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "7",
      "14",
      "9",
      "26"
    ],
    "difficulty": 3,
    "correct": 0,
    "explanation": "13 becomes 14. Check 14 again: it becomes 7. The decision uses the current value.\nHint: Do not keep using the branch chosen for the starting number.",
    "structuredExplanation": {
      "summary": "13 becomes 14. Check 14 again: it becomes 7. The decision uses the current value.",
      "hint": "Do not keep using the branch chosen for the starting number."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m3n07-p-048",
    "curriculumCode": "AC9M3N07",
    "bank": "practice",
    "skill": "complete creation",
    "printable": true,
    "type": "single",
    "question": "Complete these instructions to generate 9, 16, 23, 30: “Write 9. Then ___, write the result and repeat.”",
    "audioPrompt": "Complete these instructions to generate 9, 16, 23, 30: “Write 9. Then ___, write the result and repeat.”",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "add 9 to the current number",
      "multiply the current number by 7",
      "subtract 7 from the current number",
      "add 7 to the current number"
    ],
    "difficulty": 2,
    "correct": 3,
    "explanation": "The gap between successive numbers is always 7. The instruction must update the current number by that amount.\nHint: Test the proposed step on every pair of neighbours.",
    "structuredExplanation": {
      "summary": "The gap between successive numbers is always 7. The instruction must update the current number by that amount.",
      "hint": "Test the proposed step on every pair of neighbours."
    },
    "qualitySchema": "production-v1"
  }
];
window.quizQuestions = window.skillrPracticeQuestions;
