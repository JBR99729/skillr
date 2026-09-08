"use strict";
window.skillrPracticeQuestions = [
  {
    "id": "ac9m4n09-p-001",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "follow ordered steps",
    "printable": true,
    "type": "single",
    "question": "Start with 5. Add 3, then multiply the result by 2. What is the output?",
    "audioPrompt": "Start with 5. Add 3, then multiply the result by 2. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "8",
      "10",
      "16",
      "13"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 1,
    "correct": 2,
    "explanation": "First 5 + 3 = 8. Then 8 × 2 = 16. Doubling before adding would follow a different order.\nHint: Write the value after each step.",
    "structuredExplanation": {
      "summary": "First 5 + 3 = 8. Then 8 × 2 = 16. Doubling before adding would follow a different order.",
      "hint": "Write the value after each step."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-002",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "follow multiply then add",
    "printable": true,
    "type": "single",
    "question": "An input of 8 is multiplied by 3, then 4 is added. What is the output?",
    "audioPrompt": "An input of 8 is multiplied by 3, then 4 is added. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "36",
      "28",
      "44",
      "15"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 2,
    "correct": 1,
    "explanation": "Multiplication gives 8 × 3 = 24. Adding 4 to that result gives 28.\nHint: Finish the first operation before starting the second.",
    "structuredExplanation": {
      "summary": "Multiplication gives 8 × 3 = 24. Adding 4 to that result gives 28.",
      "hint": "Finish the first operation before starting the second."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-003",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "input output rule",
    "printable": true,
    "type": "single",
    "question": "The rule is “multiply the input by 5, then add 2”. What output belongs with input 4?",
    "audioPrompt": "The rule is “multiply the input by 5, then add 2”. What output belongs with input 4?",
    "visual": "Input/output table for multiply by 5 then add 2: inputs 1, 2, 3 have outputs 7, 12, 17; input 4 has unknown output.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Input/output table for multiply by 5 then add 2: inputs 1, 2, 3 have outputs 7, 12, 17; input 4 has unknown output.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-003.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-003.svg#model",
      "alt_text": "Input/output table for multiply by 5 then add 2: inputs 1, 2, 3 have outputs 7, 12, 17; input 4 has unknown output."
    },
    "answers": [
      "20",
      "11",
      "22",
      "30"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 3,
    "correct": 2,
    "explanation": "Each new input follows the same two steps. For 4, calculate 4 × 5 + 2 = 20 + 2 = 22.\nHint: Apply the rule to input 4, rather than reusing the last output.",
    "structuredExplanation": {
      "summary": "Each new input follows the same two steps. For 4, calculate 4 × 5 + 2 = 20 + 2 = 22.",
      "hint": "Apply the rule to input 4, rather than reusing the last output."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-004",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "trace both branches",
    "printable": true,
    "type": "single",
    "question": "Use the flowchart once for each input. What are the outputs for input 6 and input 7, in that order?",
    "audioPrompt": "Use the flowchart once for each input. What are the outputs for input 6 and input 7, in that order?",
    "visual": "Flowchart: input; if even, multiply by 3; if not even, add 5; the two branches join at record output.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Flowchart: input; if even, multiply by 3; if not even, add 5; the two branches join at record output.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-004.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-004.svg#model",
      "alt_text": "Flowchart: input; if even, multiply by 3; if not even, add 5; the two branches join at record output."
    },
    "answers": [
      "11, 21",
      "18, 21",
      "18, 12",
      "33, 36"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 4,
    "correct": 2,
    "explanation": "Six is even, so its branch gives 6 × 3 = 18. Seven is odd, so its branch gives 7 + 5 = 12. Use only the chosen branch.\nHint: Answer the decision separately for each input.",
    "structuredExplanation": {
      "summary": "Six is even, so its branch gives 6 × 3 = 18. Seven is odd, so its branch gives 7 + 5 = 12. Use only the chosen branch.",
      "hint": "Answer the decision separately for each input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-005",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "decision after change",
    "printable": true,
    "type": "single",
    "question": "Start with 3 and add 2. If the NEW number is even, multiply it by 3; otherwise add 4. What is the output?",
    "audioPrompt": "Start with 3 and add 2. If the NEW number is even, multiply it by 3; otherwise add 4. What is the output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "7",
      "15",
      "11",
      "9"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 5,
    "correct": 3,
    "explanation": "After adding 2, the number is 5. It is odd, so follow the otherwise branch: 5 + 4 = 9.\nHint: Test the number after the first step, not a different value.",
    "structuredExplanation": {
      "summary": "After adding 2, the number is 5. It is odd, so follow the otherwise branch: 5 + 4 = 9.",
      "hint": "Test the number after the first step, not a different value."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-006",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "inclusive decision boundary",
    "printable": true,
    "type": "single",
    "question": "For each input: if it is at least 5, double it; otherwise add 3. What are the outputs for inputs 4 and 5?",
    "audioPrompt": "For each input: if it is at least 5, double it; otherwise add 3. What are the outputs for inputs 4 and 5?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "7, 10",
      "8, 10",
      "7, 8",
      "8, 8"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 6,
    "correct": 0,
    "explanation": "Four is less than 5, so add 3 to get 7. Five meets “at least 5”, so double it to get 10.\nHint: “At least 5” includes 5 itself.",
    "structuredExplanation": {
      "summary": "Four is less than 5, so add 3 to get 7. Five meets “at least 5”, so double it to get 10.",
      "hint": "“At least 5” includes 5 itself."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-007",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "generate branch output list",
    "printable": true,
    "type": "single",
    "question": "For inputs 1, 2, 3 and 4, double each even input and add 4 to each odd input. Which output list keeps the same input order?",
    "audioPrompt": "For inputs 1, 2, 3 and 4, double each even input and add 4 to each odd input. Which output list keeps the same input order?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "2, 4, 6, 8",
      "5, 6, 7, 8",
      "5, 4, 7, 8",
      "2, 6, 6, 8"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 7,
    "correct": 2,
    "explanation": "The odd inputs 1 and 3 become 5 and 7. The even inputs 2 and 4 become 4 and 8. Record each result beside its own input.\nHint: Choose a branch separately for each of the four inputs.",
    "structuredExplanation": {
      "summary": "The odd inputs 1 and 3 become 5 and 7. The even inputs 2 and 4 become 4 and 8. Record each result beside its own input.",
      "hint": "Choose a branch separately for each of the four inputs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-008",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "identify decision rule",
    "printable": true,
    "type": "single",
    "question": "Inputs 1, 2, 3, 4 produce outputs 4, 4, 6, 8. Which stated rule matches every pair?",
    "audioPrompt": "Inputs 1, 2, 3, 4 produce outputs 4, 4, 6, 8. Which stated rule matches every pair?",
    "visual": "Input/output pairs: 1 to 4, 2 to 4, 3 to 6, and 4 to 8.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Input/output pairs: 1 to 4, 2 to 4, 3 to 6, and 4 to 8.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-008.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-008.svg#model",
      "alt_text": "Input/output pairs: 1 to 4, 2 to 4, 3 to 6, and 4 to 8."
    },
    "answers": [
      "If the input is even, double it; otherwise add 3",
      "Double every input",
      "If the input is even, add 3; otherwise double it",
      "Add 3 to every input"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 8,
    "correct": 0,
    "explanation": "The odd inputs become 1 + 3 = 4 and 3 + 3 = 6. The even inputs become 2 × 2 = 4 and 4 × 2 = 8. All four pairs fit.\nHint: Test both an odd input and an even input.",
    "structuredExplanation": {
      "summary": "The odd inputs become 1 + 3 = 4 and 3 + 3 = 6. The even inputs become 2 × 2 = 4 and 4 × 2 = 8. All four pairs fit.",
      "hint": "Test both an odd input and an even input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-009",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "repair missing branch",
    "printable": true,
    "type": "single",
    "question": "A rule says, “If the input is even, double it. Record the answer.” Which addition explicitly gives an operation for odd inputs?",
    "audioPrompt": "A rule says, “If the input is even, double it. Record the answer.” Which addition explicitly gives an operation for odd inputs?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Otherwise add 1 to the input, then record that result",
      "Double even inputs twice",
      "Record an answer before reading the input",
      "Add 1 after doubling every even input"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 9,
    "correct": 0,
    "explanation": "The original rule gives no operation for odd inputs. An otherwise branch defines what to do when the even test is false.\nHint: Find the branch used when the even test is false.",
    "structuredExplanation": {
      "summary": "The original rule gives no operation for odd inputs. An otherwise branch defines what to do when the even test is false.",
      "hint": "Find the branch used when the even test is false."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-010",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "use one branch only",
    "printable": true,
    "type": "single",
    "question": "A rule says: if the input is less than 10, add 5; otherwise multiply by 2. With input 7, Zara adds 5 and then doubles. What should the output be?",
    "audioPrompt": "A rule says: if the input is less than 10, add 5; otherwise multiply by 2. With input 7, Zara adds 5 and then doubles. What should the output be?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "24",
      "12",
      "19",
      "14"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 10,
    "correct": 1,
    "explanation": "Input 7 meets the less-than-10 test, so only the add-5 branch runs: 7 + 5 = 12. The multiply branch is an alternative, not the next step.\nHint: Do not run both alternatives for the same decision.",
    "structuredExplanation": {
      "summary": "Input 7 meets the less-than-10 test, so only the add-5 branch runs: 7 + 5 = 12. The multiply branch is an alternative, not the next step.",
      "hint": "Do not run both alternatives for the same decision."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-011",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "generate multiples ten",
    "printable": true,
    "type": "single",
    "question": "Start at 10. Record the number, then add 10. Keep recording while the current number is at most 50. Stop before recording a larger number. Which list is produced?",
    "audioPrompt": "Start at 10. Record the number, then add 10. Keep recording while the current number is at most 50. Stop before recording a larger number. Which list is produced?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "0, 10, 20, 30, 40",
      "10, 100, 1,000",
      "10, 20, 30, 40, 50",
      "10, 20, 30, 40, 50, 60"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 11,
    "correct": 2,
    "explanation": "The recorded values rise by ten and include 50 because it is allowed. The next value, 60, fails the at-most-50 test.\nHint: Check the start and whether the endpoint is included.",
    "structuredExplanation": {
      "summary": "The recorded values rise by ten and include 50 because it is allowed. The next value, 60, fails the at-most-50 test.",
      "hint": "Check the start and whether the endpoint is included."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-012",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "strict stop boundary",
    "printable": true,
    "type": "single",
    "question": "Follow the flowchart. Which numbers are recorded?",
    "audioPrompt": "Follow the flowchart. Which numbers are recorded?",
    "visual": "Flowchart: start at 4; test whether the number is less than 20; yes, record it then add 4 and return to the test; no, stop.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Flowchart: start at 4; test whether the number is less than 20; yes, record it then add 4 and return to the test; no, stop.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-012.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-012.svg#model",
      "alt_text": "Flowchart: start at 4; test whether the number is less than 20; yes, record it then add 4 and return to the test; no, stop."
    },
    "answers": [
      "8, 12, 16",
      "4, 8, 12, 16, 20",
      "4, 16",
      "4, 8, 12, 16"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 12,
    "correct": 3,
    "explanation": "The test occurs before recording. Four, eight, twelve and sixteen are less than 20; twenty is not, so it is not recorded.\nHint: “Less than” does not include the boundary number.",
    "structuredExplanation": {
      "summary": "The test occurs before recording. Four, eight, twelve and sixteen are less than 20; twenty is not, so it is not recorded.",
      "hint": "“Less than” does not include the boundary number."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-013",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "inclusive stop boundary",
    "printable": true,
    "type": "single",
    "question": "Follow the flowchart. What is the last recorded number?",
    "audioPrompt": "Follow the flowchart. What is the last recorded number?",
    "visual": "Flowchart: start at 5; if the number is at most 20, record it then add 5 and repeat the test; otherwise stop.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Flowchart: start at 5; if the number is at most 20, record it then add 5 and repeat the test; otherwise stop.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-013.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-013.svg#model",
      "alt_text": "Flowchart: start at 5; if the number is at most 20, record it then add 5 and repeat the test; otherwise stop."
    },
    "answers": [
      "15",
      "5",
      "25",
      "20"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 13,
    "correct": 3,
    "explanation": "The test allows numbers equal to 20. The outputs are 5, 10, 15 and 20; after adding 5 again, 25 fails the test.\nHint: The symbol ≤ means less than or equal to.",
    "structuredExplanation": {
      "summary": "The test allows numbers equal to 20. The outputs are 5, 10, 15 and 20; after adding 5 again, 25 fails the test.",
      "hint": "The symbol ≤ means less than or equal to."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-014",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "output timing",
    "printable": true,
    "type": "single",
    "question": "Start with 2. Add 5, then record the result. Repeat those two steps until THREE results have been recorded. What is the list?",
    "audioPrompt": "Start with 2. Add 5, then record the result. Repeat those two steps until THREE results have been recorded. What is the list?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "7, 10, 15",
      "7, 12, 17",
      "2, 7, 12",
      "2, 5, 10"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 14,
    "correct": 1,
    "explanation": "Adding happens before recording, so the first result is 7. The next two additions give 12 and 17. The starting 2 is not recorded.\nHint: Read exactly when the record step occurs.",
    "structuredExplanation": {
      "summary": "Adding happens before recording, so the first result is 7. The next two additions give 12 and 17. The starting 2 is not recorded.",
      "hint": "Read exactly when the record step occurs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-015",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "unreachable stopping value",
    "printable": true,
    "type": "single",
    "question": "Start at 1, record it, then repeatedly add 4 and record. Stop only if the number is exactly 10. What happens?",
    "audioPrompt": "Start at 1, record it, then repeatedly add 4 and record. Stop only if the number is exactly 10. What happens?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "It stops at 10",
      "The rule never reaches 10, so that stop test is never met",
      "It stops at 9",
      "It stops at 13 automatically"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 15,
    "correct": 1,
    "explanation": "The outputs are 1, 5, 9, 13 and so on. The rule jumps over 10, and later values are larger. A stop test such as greater than 10 would need to be stated separately.\nHint: Trace the values around 10 and apply the exact test.",
    "structuredExplanation": {
      "summary": "The outputs are 1, 5, 9, 13 and so on. The rule jumps over 10, and later values are larger. A stop test such as greater than 10 would need to be stated separately.",
      "hint": "Trace the values around 10 and apply the exact test."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-016",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "count recorded values",
    "printable": true,
    "type": "single",
    "question": "Start at 2 and record it. Multiply the current number by 2 and record again, stopping after FOUR numbers in total. What is the fourth number?",
    "audioPrompt": "Start at 2 and record it. Multiply the current number by 2 and record again, stopping after FOUR numbers in total. What is the fourth number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "16",
      "32",
      "4",
      "8"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 16,
    "correct": 0,
    "explanation": "The recorded numbers are 2, 4, 8 and 16. The starting 2 counts as the first recorded number.\nHint: Number the recorded outputs from one to four.",
    "structuredExplanation": {
      "summary": "The recorded numbers are 2, 4, 8 and 16. The starting 2 counts as the first recorded number.",
      "hint": "Number the recorded outputs from one to four."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-017",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "constant multiplication loop",
    "printable": true,
    "type": "single",
    "question": "Follow the flowchart. Which output list is correct?",
    "audioPrompt": "Follow the flowchart. Which output list is correct?",
    "visual": "Flowchart: start at 1; if the number is at most 30, record it then multiply by 3 and repeat; otherwise stop.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Flowchart: start at 1; if the number is at most 30, record it then multiply by 3 and repeat; otherwise stop.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-017.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-017.svg#model",
      "alt_text": "Flowchart: start at 1; if the number is at most 30, record it then multiply by 3 and repeat; otherwise stop."
    },
    "answers": [
      "1, 3, 9, 27",
      "3, 6, 9, 12",
      "1, 3, 9, 27, 81",
      "1, 4, 7, 10"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 17,
    "correct": 0,
    "explanation": "Multiply the current value by 3 after each record. The values 1, 3, 9 and 27 pass the at-most-30 test; 81 does not.\nHint: This rule triples the previous value, rather than adding three.",
    "structuredExplanation": {
      "summary": "Multiply the current value by 3 after each record. The values 1, 3, 9 and 27 pass the at-most-30 test; 81 does not.",
      "hint": "This rule triples the previous value, rather than adding three."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-018",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "repeated multiplication growth",
    "printable": true,
    "type": "single",
    "question": "A rule starts at 2 and multiplies the previous number by 4 each time: 2, 8, 32, 128, __. What is next?",
    "audioPrompt": "A rule starts at 2 and multiplies the previous number by 4 each time: 2, 8, 32, 128, __. What is next?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "256",
      "512",
      "384",
      "132"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 18,
    "correct": 1,
    "explanation": "The same multiplication applies at every step. After 128 comes 128 × 4 = 512.\nHint: Use the stated generating rule, not the last difference.",
    "structuredExplanation": {
      "summary": "The same multiplication applies at every step. After 128 comes 128 × 4 = 512.",
      "hint": "Use the stated generating rule, not the last difference."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-019",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "compare addition and multiplication",
    "printable": true,
    "type": "single",
    "question": "Both rules start by recording 4. Rule A repeatedly adds 4. Rule B repeatedly doubles. What is the THIRD output of each?",
    "audioPrompt": "Both rules start by recording 4. Rule A repeatedly adds 4. Rule B repeatedly doubles. What is the THIRD output of each?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "A: 12; B: 16",
      "A: 16; B: 12",
      "A: 8; B: 8",
      "A: 16; B: 32"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 19,
    "correct": 0,
    "explanation": "Rule A records 4, 8, 12. Rule B records 4, 8, 16. Matching first and second outputs do not make the rules identical.\nHint: Include the starting value when counting outputs.",
    "structuredExplanation": {
      "summary": "Rule A records 4, 8, 12. Rule B records 4, 8, 16. Matching first and second outputs do not make the rules identical.",
      "hint": "Include the starting value when counting outputs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-020",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "test before first output",
    "printable": true,
    "type": "single",
    "question": "Start at 12. If the number is less than 10, record it and add 2, then test again. Otherwise stop. Which numbers are recorded?",
    "audioPrompt": "Start at 12. If the number is less than 10, record it and add 2, then test again. Otherwise stop. Which numbers are recorded?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "None",
      "12, 14",
      "12 only",
      "2, 4, 6, 8"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 20,
    "correct": 0,
    "explanation": "The first test is already false because 12 is not less than 10. The algorithm stops before its record step.\nHint: Check the decision before assuming the start will be recorded.",
    "structuredExplanation": {
      "summary": "The first test is already false because 12 is not less than 10. The algorithm stops before its record step.",
      "hint": "Check the decision before assuming the start will be recorded."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-021",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "choose multiples algorithm",
    "printable": true,
    "type": "single",
    "question": "Which algorithm records exactly the positive multiples of 7 below 30?",
    "audioPrompt": "Which algorithm records exactly the positive multiples of 7 below 30?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Start at 1; while below 30, record, add 7 and test again; otherwise stop",
      "Start at 7; record, multiply by 7 and record once more",
      "Start at 7; while below 30, record, add 7 and test again; otherwise stop",
      "Start at 7; add 7 before the first record, then stop at 28"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 21,
    "correct": 2,
    "explanation": "Starting at 7 and repeatedly adding 7 records 7, 14, 21 and 28. The next value is 35 and fails the test.\nHint: Check the first output, step and stopping decision.",
    "structuredExplanation": {
      "summary": "Starting at 7 and repeatedly adding 7 records 7, 14, 21 and 28. The next value is 35 and fails the test.",
      "hint": "Check the first output, step and stopping decision."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-022",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "multiples nine pattern",
    "printable": true,
    "type": "single",
    "question": "Multiply each input from 1 to 6 by 9. The outputs are 9, 18, 27, 36, 45, 54. What happens to the ones digit across THESE six outputs?",
    "audioPrompt": "Multiply each input from 1 to 6 by 9. The outputs are 9, 18, 27, 36, 45, 54. What happens to the ones digit across THESE six outputs?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "It increases by 1 each time",
      "It is always even",
      "It decreases by 1 each time",
      "It stays at 9"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 22,
    "correct": 2,
    "explanation": "The ones digits shown are 9, 8, 7, 6, 5 and 4. They decrease by one across this sample; a later wrap from 0 to 9 would need to be described too.\nHint: Compare only the ones digits in the stated six outputs.",
    "structuredExplanation": {
      "summary": "The ones digits shown are 9, 8, 7, 6, 5 and 4. They decrease by one across this sample; a later wrap from 0 to 9 would need to be described too.",
      "hint": "Compare only the ones digits in the stated six outputs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-023",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "multiples five pattern",
    "printable": true,
    "type": "single",
    "question": "Multiply inputs 1, 2, 3, 4, 5 and 6 by 5. What ones-digit pattern do the outputs follow?",
    "audioPrompt": "Multiply inputs 1, 2, 3, 4, 5 and 6 by 5. What ones-digit pattern do the outputs follow?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "5, 5, 5, 5, 5, 5",
      "0, 5, 0, 5, 0, 5",
      "1, 2, 3, 4, 5, 6",
      "5, 0, 5, 0, 5, 0"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 23,
    "correct": 3,
    "explanation": "The outputs are 5, 10, 15, 20, 25 and 30. Adding five switches the ones digit between 5 and 0.\nHint: List the products, then look at their final digits.",
    "structuredExplanation": {
      "summary": "The outputs are 5, 10, 15, 20, 25 and 30. Adding five switches the ones digit between 5 and 0.",
      "hint": "List the products, then look at their final digits."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-024",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "explain even output pattern",
    "printable": true,
    "type": "single",
    "question": "A rule starts at 2 and keeps adding 4. Why is every output even?",
    "audioPrompt": "A rule starts at 2 and keeps adding 4. Why is every output even?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "The start is even and adding an even number keeps it even",
      "The outputs all end in 2",
      "Adding any number always makes an even result",
      "Every output is a multiple of 4"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 24,
    "correct": 0,
    "explanation": "The sequence begins 2, 6, 10, 14, 18. An even starting value plus another even amount remains even at each step.\nHint: Explain the pattern from the start and the repeated operation.",
    "structuredExplanation": {
      "summary": "The sequence begins 2, 6, 10, 14, 18. An even starting value plus another even amount remains even at each step.",
      "hint": "Explain the pattern from the start and the repeated operation."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-025",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "explain alternating pattern",
    "printable": true,
    "type": "single",
    "question": "The outputs from inputs 1, 2, 3, 4, 5 under “multiply by 3” are 3, 6, 9, 12, 15. Why do odd and even outputs alternate?",
    "audioPrompt": "The outputs from inputs 1, 2, 3, 4, 5 under “multiply by 3” are 3, 6, 9, 12, 15. Why do odd and even outputs alternate?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Every input is odd",
      "Each next output adds the odd number 3, switching between odd and even",
      "The rule alternates adding 2 and adding 4",
      "Multiplication always produces an even number"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 25,
    "correct": 1,
    "explanation": "Increasing the input by 1 adds one more group of 3 to the output. Adding an odd amount changes even to odd or odd to even.\nHint: Compare consecutive outputs and connect the difference to the rule.",
    "structuredExplanation": {
      "summary": "Increasing the input by 1 adds one more group of 3 to the output. Adding an odd amount changes even to odd or odd to even.",
      "hint": "Compare consecutive outputs and connect the difference to the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-026",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "check pattern claim",
    "printable": true,
    "type": "single",
    "question": "A rule multiplies inputs 1, 2, 3, 4 by 6. Which statement is true of all four outputs?",
    "audioPrompt": "A rule multiplies inputs 1, 2, 3, 4 by 6. Which statement is true of all four outputs?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Every output is less than 20",
      "Each output is 6 more than its own input",
      "All outputs end in 6",
      "Each is a multiple of 6 and is even"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 26,
    "correct": 3,
    "explanation": "The outputs are 6, 12, 18 and 24. Each contains a whole number of groups of 6 and is even. The other statements fail for at least one input.\nHint: Test the claim against every stated output.",
    "structuredExplanation": {
      "summary": "The outputs are 6, 12, 18 and 24. Each contains a whole number of groups of 6 and is even. The other statements fail for at least one input.",
      "hint": "Test the claim against every stated output."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-027",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "indefinite pattern extension",
    "printable": true,
    "type": "single",
    "question": "A learner writes the first six positive multiples of 4. Why does the mathematical pattern have no last number?",
    "audioPrompt": "A learner writes the first six positive multiples of 4. Why does the mathematical pattern have no last number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Another multiple can always be made by adding 4",
      "A calculator can store every number",
      "The sixth multiple must be repeated forever",
      "The numbers eventually stop increasing"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 27,
    "correct": 0,
    "explanation": "Whatever multiple has been reached, adding one more group of 4 makes another. A written list or device may stop, but the mathematical rule can continue.\nHint: Separate the length of a recorded list from the rule’s possible continuation.",
    "structuredExplanation": {
      "summary": "Whatever multiple has been reached, adding one more group of 4 makes another. A written list or device may stop, but the mathematical rule can continue.",
      "hint": "Separate the length of a recorded list from the rule’s possible continuation."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-028",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "finite list needs rule",
    "printable": true,
    "type": "single",
    "question": "A list begins 2, 4, 8, but no generating rule is given. Max says the next value must be 16. Which response is best?",
    "audioPrompt": "A list begins 2, 4, 8, but no generating rule is given. Max says the next value must be 16. Which response is best?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "The next value must always be 10",
      "Any list of three numbers must double",
      "Three listed numbers prove every later number",
      "A generating rule is needed to make one intended next value certain"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 28,
    "correct": 3,
    "explanation": "Doubling would give 16, but other rules can begin with the same three values. A precise rule removes the uncertainty.\nHint: Do the given numbers state every step of an algorithm?",
    "structuredExplanation": {
      "summary": "Doubling would give 16, but other rules can begin with the same three values. A precise rule removes the uncertainty.",
      "hint": "Do the given numbers state every step of an algorithm?"
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-029",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "debug addition sequence",
    "printable": true,
    "type": "single",
    "question": "The instruction is “start at 8 and keep adding 8”. A learner records 8, 16, 24, 31, 40. Which replacement repairs the incorrect entry?",
    "audioPrompt": "The instruction is “start at 8 and keep adding 8”. A learner records 8, 16, 24, 31, 40. Which replacement repairs the incorrect entry?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Replace 24 with 23",
      "Replace 40 with 39",
      "Replace 16 with 15",
      "Replace 31 with 32"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 29,
    "correct": 3,
    "explanation": "Adding 8 to 24 gives 32. The intended list is 8, 16, 24, 32, 40.\nHint: Apply the stated rule to the value before the suspected error.",
    "structuredExplanation": {
      "summary": "Adding 8 to 24 gives 32. The intended list is 8, 16, 24, 32, 40.",
      "hint": "Apply the stated rule to the value before the suspected error."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-030",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "debug multiplication sequence",
    "printable": true,
    "type": "single",
    "question": "The rule starts at 2 and triples the previous number. A learner records 2, 6, 18, 56, 162. Which entry should replace 56?",
    "audioPrompt": "The rule starts at 2 and triples the previous number. A learner records 2, 6, 18, 56, 162. Which entry should replace 56?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "168",
      "48",
      "54",
      "60"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 30,
    "correct": 2,
    "explanation": "The correct fourth value is 18 × 3 = 54. Tripling 54 then gives the listed next value 162.\nHint: Check both the product from the previous term and the following term.",
    "structuredExplanation": {
      "summary": "The correct fourth value is 18 × 3 = 54. Tripling 54 then gives the listed next value 162.",
      "hint": "Check both the product from the previous term and the following term."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-031",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "repair recording order",
    "printable": true,
    "type": "single",
    "question": "The wanted list is 3, 6, 12. A learner starts at 3, doubles, then records, so the first output is 6. Which repair includes the wanted first output?",
    "audioPrompt": "The wanted list is 3, 6, 12. A learner starts at 3, doubles, then records, so the first output is 6. Which repair includes the wanted first output?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Double twice before recording",
      "Start at 6 instead",
      "Record 3 before the first doubling",
      "Add 3 after every doubling"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 31,
    "correct": 2,
    "explanation": "The initial value belongs in the wanted list. Recording it first, then repeatedly doubling, gives 3, 6 and 12.\nHint: Compare the wanted first value with the first record step.",
    "structuredExplanation": {
      "summary": "The initial value belongs in the wanted list. Recording it first, then repeatedly doubling, gives 3, 6 and 12.",
      "hint": "Compare the wanted first value with the first record step."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-032",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "choose loop decision",
    "printable": true,
    "type": "single",
    "question": "Start at 2. Test a condition before each record; if true, record and add 2, then test again. Which condition produces 2, 4, 6, 8, 10 and then stops?",
    "audioPrompt": "Start at 2. Test a condition before each record; if true, record and add 2, then test again. Which condition produces 2, 4, 6, 8, 10 and then stops?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "The number is less than 10",
      "The number is at least 10",
      "The number is exactly 2",
      "The number is at most 10"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 32,
    "correct": 3,
    "explanation": "The condition must allow all five wanted values, including 10, and reject the next value 12. At most 10 does this.\nHint: Test both the final wanted value and the first unwanted value.",
    "structuredExplanation": {
      "summary": "The condition must allow all five wanted values, including 10, and reject the next value 12. At most 10 does this.",
      "hint": "Test both the final wanted value and the first unwanted value."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-033",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "input rule versus previous output",
    "printable": true,
    "type": "single",
    "question": "Which list results from multiplying EACH input 1, 2, 3, 4 by 4?",
    "audioPrompt": "Which list results from multiplying EACH input 1, 2, 3, 4 by 4?",
    "visual": "Table maps inputs 1, 2, 3, 4 to outputs 4, 8, 12, 16 by multiplying each input by 4.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Table maps inputs 1, 2, 3, 4 to outputs 4, 8, 12, 16 by multiplying each input by 4.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/p-033.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/p-033.svg#model",
      "alt_text": "Table maps inputs 1, 2, 3, 4 to outputs 4, 8, 12, 16 by multiplying each input by 4."
    },
    "answers": [
      "4, 16, 64, 256",
      "4, 8, 12, 16",
      "5, 6, 7, 8",
      "1, 4, 16, 64"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 33,
    "correct": 1,
    "explanation": "Each separate input is multiplied by 4. Repeatedly multiplying the previous output is a different algorithm.\nHint: Return to the next input for each new calculation.",
    "structuredExplanation": {
      "summary": "Each separate input is multiplied by 4. Repeatedly multiplying the previous output is a different algorithm.",
      "hint": "Return to the next input for each new calculation."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-034",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "spreadsheet input series",
    "printable": true,
    "type": "single",
    "question": "A1 contains 1. A2 contains =A1+1, and that formula is filled down through A5 with changing row references. What value is in A5?",
    "audioPrompt": "A1 contains 1. A2 contains =A1+1, and that formula is filled down through A5 with changing row references. What value is in A5?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "1",
      "4",
      "5",
      "16"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 34,
    "correct": 2,
    "explanation": "A2 is 2, A3 is 3, A4 is 4 and A5 is 5. Each row adds one to the value directly above it.\nHint: Trace the row reference as the formula moves down.",
    "structuredExplanation": {
      "summary": "A2 is 2, A3 is 3, A4 is 4 and A5 is 5. Each row adds one to the value directly above it.",
      "hint": "Trace the row reference as the formula moves down."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-035",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "relative formula fill down",
    "printable": true,
    "type": "single",
    "question": "A1:A4 contain 1, 2, 3, 4. B1 contains =A1*4. When filled down normally, which formula belongs in B3?",
    "audioPrompt": "A1:A4 contain 1, 2, 3, 4. B1 contains =A1*4. When filled down normally, which formula belongs in B3?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "=A1*4",
      "=A3+4",
      "=A3*4",
      "=B2*4"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 35,
    "correct": 2,
    "explanation": "Moving the formula two rows down changes its relative reference from A1 to A3. With A3 equal to 3, B3 evaluates to 12.\nHint: The input reference follows the current row.",
    "structuredExplanation": {
      "summary": "Moving the formula two rows down changes its relative reference from A1 to A3. With A3 equal to 3, B3 evaluates to 12.",
      "hint": "The input reference follows the current row."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-036",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "spreadsheet hundredth output",
    "printable": true,
    "type": "single",
    "question": "Column A contains the integers 1 to 100 in rows 1 to 100. Column B multiplies the input in the same row by 4. What is B100?",
    "audioPrompt": "Column A contains the integers 1 to 100 in rows 1 to 100. Column B multiplies the input in the same row by 4. What is B100?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "400",
      "4,000",
      "104",
      "100"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 36,
    "correct": 0,
    "explanation": "Row 100 contains input 100. Multiplying that input by 4 gives 400. This is not multiplying the previous output by four a hundred times.\nHint: Identify the input in row 100 before applying the rule.",
    "structuredExplanation": {
      "summary": "Row 100 contains input 100. Multiplying that input by 4 gives 400. This is not multiplying the previous output by four a hundred times.",
      "hint": "Identify the input in row 100 before applying the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-037",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "debug copied input column",
    "printable": true,
    "type": "single",
    "question": "A learner copies the value 1 into EVERY cell A1:A100. The formula =A1*4 is then filled down column B. Why is every result 4?",
    "audioPrompt": "A learner copies the value 1 into EVERY cell A1:A100. The formula =A1*4 is then filled down column B. Why is every result 4?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "A row number automatically replaces its cell’s value",
      "Every row’s input is 1",
      "Four times any input is 4",
      "Multiplication formulas cannot be filled down"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 37,
    "correct": 1,
    "explanation": "Every formula refers to an A cell containing 1, so every product is 1 × 4. To list successive multiples, the inputs must actually be 1, 2, 3 and so on.\nHint: Check the cell values as well as the formula.",
    "structuredExplanation": {
      "summary": "Every formula refers to an A cell containing 1, so every product is 1 × 4. To list successive multiples, the inputs must actually be 1, 2, 3 and so on.",
      "hint": "Check the cell values as well as the formula."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-038",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "debug previous output formula",
    "printable": true,
    "type": "single",
    "question": "A1:A3 contain 1, 2, 3. B1 is =A1*4, giving 4. B2 is incorrectly set to =B1*4, giving 16. Which replacement restores the rule that multiplies the input in the same row by 4?",
    "audioPrompt": "A1:A3 contain 1, 2, 3. B1 is =A1*4, giving 4. B2 is incorrectly set to =B1*4, giving 16. Which replacement restores the rule that multiplies the input in the same row by 4?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "=A1*4",
      "=A2*4",
      "=A2+4",
      "=B1+1"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 38,
    "correct": 1,
    "explanation": "The intended rule multiplies the input in the same row by 4. A2 is 2, so =A2*4 gives 8 instead of repeatedly multiplying the previous output.\nHint: Use column A as the source of each new input.",
    "structuredExplanation": {
      "summary": "The intended rule multiplies the input in the same row by 4. A2 is 2, so =A2*4 gives 8 instead of repeatedly multiplying the previous output.",
      "hint": "Use column A as the source of each new input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-039",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "calculator check of rule",
    "printable": true,
    "type": "single",
    "question": "A calculator is used to check “start at 4, then multiply the previous value by 3”. Which recorded list agrees with the rule?",
    "audioPrompt": "A calculator is used to check “start at 4, then multiply the previous value by 3”. Which recorded list agrees with the rule?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "4, 7, 10, 13",
      "4, 12, 36, 108",
      "4, 12, 24, 48",
      "4, 8, 16, 32"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 39,
    "correct": 1,
    "explanation": "The products are 4 × 3 = 12, 12 × 3 = 36 and 36 × 3 = 108. Each step applies the same multiplier to the previous value.\nHint: Check every recorded step, not only the first product.",
    "structuredExplanation": {
      "summary": "The products are 4 × 3 = 12, 12 × 3 = 36 and 36 × 3 = 108. Each step applies the same multiplier to the previous value.",
      "hint": "Check every recorded step, not only the first product."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-040",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "appropriate digital check",
    "printable": true,
    "type": "single",
    "question": "Which way of using a calculator best checks a multiplication algorithm?",
    "audioPrompt": "Which way of using a calculator best checks a multiplication algorithm?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Accept any display because calculators cannot receive a wrong input",
      "Change the multiplier whenever the numbers become large",
      "Record only the final display and omit the steps",
      "Predict the first products, enter each stated multiplication, and compare the outputs"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 40,
    "correct": 3,
    "explanation": "A calculator can perform repeated calculations, but inputs and operations can still be entered incorrectly. Predictions and a recorded sequence help locate mistakes.\nHint: Use the tool to follow and verify a precise rule.",
    "structuredExplanation": {
      "summary": "A calculator can perform repeated calculations, but inputs and operations can still be entered incorrectly. Predictions and a recorded sequence help locate mistakes.",
      "hint": "Use the tool to follow and verify a precise rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-041",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "repeated outputs in a set",
    "printable": true,
    "type": "single",
    "question": "For inputs 1, 2, 3, 4: double even inputs and add 3 to odd inputs. The output list is 4, 4, 6, 8. Which set lists the DIFFERENT output values once each?",
    "audioPrompt": "For inputs 1, 2, 3, 4: double even inputs and add 3 to odd inputs. The output list is 4, 4, 6, 8. Which set lists the DIFFERENT output values once each?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "4, 6, 8",
      "1, 2, 3, 4",
      "4, 6, 8, 10",
      "4, 4, 6, 8"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 41,
    "correct": 0,
    "explanation": "Inputs 1 and 2 both produce 4. Listing distinct output values removes the repeated 4 but keeps 6 and 8.\nHint: Different inputs are allowed to have the same output.",
    "structuredExplanation": {
      "summary": "Inputs 1 and 2 both produce 4. Listing distinct output values removes the repeated 4 but keeps 6 and 8.",
      "hint": "Different inputs are allowed to have the same output."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-042",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "multiples one and rule",
    "printable": true,
    "type": "single",
    "question": "Inputs 1, 2, 3, 4 are each multiplied by 1. What are the outputs?",
    "audioPrompt": "Inputs 1, 2, 3, 4 are each multiplied by 1. What are the outputs?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "0, 0, 0, 0",
      "2, 3, 4, 5",
      "1, 1, 1, 1",
      "1, 2, 3, 4"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 42,
    "correct": 3,
    "explanation": "Multiplying each input by 1 preserves that input. This differs from repeatedly multiplying one fixed starting value by 1.\nHint: Apply the rule separately to the changing inputs.",
    "structuredExplanation": {
      "summary": "Multiplying each input by 1 preserves that input. This differs from repeatedly multiplying one fixed starting value by 1.",
      "hint": "Apply the rule separately to the changing inputs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-043",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "explain output difference",
    "printable": true,
    "type": "single",
    "question": "For consecutive whole-number inputs, a rule multiplies each input by 8. Why are consecutive outputs 8 apart?",
    "audioPrompt": "For consecutive whole-number inputs, a rule multiplies each input by 8. Why are consecutive outputs 8 apart?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "The outputs double every time",
      "The rule adds 8 to the input only once",
      "Every output equals 8",
      "The next input adds one more group of 8"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 43,
    "correct": 3,
    "explanation": "Going from an input to the next whole number adds one group to the product. That extra group contains 8, so the output increases by 8.\nHint: Compare two neighbouring input values and the groups they represent.",
    "structuredExplanation": {
      "summary": "Going from an input to the next whole number adds one group to the product. That extra group contains 8, so the output increases by 8.",
      "hint": "Compare two neighbouring input values and the groups they represent."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-044",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "choose runnable algorithm",
    "printable": true,
    "type": "single",
    "question": "Which algorithm records exactly 5, 10, 15, 20, 25 and stops?",
    "audioPrompt": "Which algorithm records exactly 5, 10, 15, 20, 25 and stops?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Start at 0; record; add 5; stop after five records",
      "Start at 5; record; add 5; if the number is at most 25 return to record, otherwise stop",
      "Start at 5; add 5; record; stop after five records",
      "Start at 5; record; add 5; stop only when the number equals 26"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 44,
    "correct": 1,
    "explanation": "The algorithm that starts at 5 and records before adding has the required first output. Its decision allows 25 but rejects the next value 30, so all five wanted outputs appear once.\nHint: Check the first value, record timing and reachable stopping test.",
    "structuredExplanation": {
      "summary": "The algorithm that starts at 5 and records before adding has the required first output. Its decision allows 25 but rejects the next value 30, so all five wanted outputs appear once.",
      "hint": "Check the first value, record timing and reachable stopping test."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-045",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "create additive algorithm",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "One algorithm is: start at 6; if the current number is at most 36, record it, add 6 and return to the test; otherwise stop. Outputs are 6,12,18,24,30,36. They are multiples of 6 and even because each new output adds another even group of 6.",
    "acceptanceNote": "Inspect an actual runnable algorithm with a precise start, generating steps, recording point and clear continue/stop destinations. Require exactly 6, 12, 18, 24, 30, 36 and a justified pattern such as gaps of 6 or all outputs even. Accept repeated addition of 6 or a counter taking inputs 1 through 6 and multiplying each by 6. Accept another correct generating method or step order that includes 36 and excludes later outputs.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Create a written algorithm or flowchart that records the positive multiples of 6 from 6 to 36 inclusive, then stops. Follow it and record every output. Describe a pattern and explain why it happens.",
    "audioPrompt": "Create a written algorithm or flowchart that records the positive multiples of 6 from 6 to 36 inclusive, then stops. Follow it and record every output. Describe a pattern and explain why it happens.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 45,
    "correct": "One algorithm is: start at 6; if the current number is at most 36, record it, add 6 and return to the test; otherwise stop. Outputs are 6,12,18,24,30,36. They are multiples of 6 and even because each new output adds another even group of 6.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "One algorithm is: start at 6; if the current number is at most 36, record it, add 6 and return to the test; otherwise stop. Outputs are 6,12,18,24,30,36. They are multiples of 6 and even because each new output adds another even group of 6.",
      "hint": "Test your rule at 36 and at the next value, 42."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-046",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "create multiplication flowchart",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "Test whether the current number is at most 100. If yes, record it, multiply by 3 and repeat; if no, stop. The recorded list is 2,6,18,54. The next value is 162, so it is excluded. Each recorded value after the first is three times the previous value.",
    "acceptanceNote": "Require a real flowchart with start 2, a record step, multiplication by 3, a limit test, a return arrow and both labelled decision paths. Outputs must be 2, 6, 18, 54, excluding 162. Accept testing before every record, or safely recording the initial 2 first and testing every later value before it can be recorded. Inspect the actual calculator-generated record and an independent check such as 18 × 3 = 18 + 18 + 18 = 54. A diagram that runs both alternative branches in one chain does not pass.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Draw a flowchart starting at 2 that records each value, then multiplies it by 3, and stops before recording a value greater than 100. Include a yes/no decision. Use a calculator to follow your chart, record the outputs and check one product another way.",
    "audioPrompt": "Draw a flowchart starting at 2 that records each value, then multiplies it by 3, and stops before recording a value greater than 100. Include a yes/no decision. Use a calculator to follow your chart, record the outputs and check one product another way.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 46,
    "correct": "Test whether the current number is at most 100. If yes, record it, multiply by 3 and repeat; if no, stop. The recorded list is 2,6,18,54. The next value is 162, so it is excluded. Each recorded value after the first is three times the previous value.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "Test whether the current number is at most 100. If yes, record it, multiply by 3 and repeat; if no, stop. The recorded list is 2,6,18,54. The next value is 162, so it is excluded. Each recorded value after the first is three times the previous value.",
      "hint": "Draw arrows showing where each decision answer leads; do not assume the calculator chooses the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-047",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "create branch algorithm",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "For inputs 1,2,3,4,5,6 the outputs are 6,4,8,8,10,12. Even inputs are doubled, giving even outputs. Odd inputs plus 5 also give even outputs. The algorithm must return for the next input and stop after processing 6.",
    "acceptanceNote": "Inspect both branches, one output per input and an explicit advance/stop instruction. Require the ordered list 6, 4, 8, 8, 10, 12; duplicates are valid. Accept any correct justified pattern, such as all outputs being even because an even input is doubled and an odd input has odd 5 added. Also accept a branch-specific pattern: outputs from odd inputs rise by 2, while outputs from even inputs rise by 4, because consecutive inputs within each branch differ by 2. A claim that the full output list always increases is false.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Create a flowchart or precise written algorithm for inputs 1 through 6 in order. If the input is even, double it; otherwise add 5. Record each output and then move to the next input, stopping after input 6. Explain a pattern in the outputs.",
    "audioPrompt": "Create a flowchart or precise written algorithm for inputs 1 through 6 in order. If the input is even, double it; otherwise add 5. Record each output and then move to the next input, stopping after input 6. Explain a pattern in the outputs.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 47,
    "correct": "For inputs 1,2,3,4,5,6 the outputs are 6,4,8,8,10,12. Even inputs are doubled, giving even outputs. Odd inputs plus 5 also give even outputs. The algorithm must return for the next input and stop after processing 6.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "For inputs 1,2,3,4,5,6 the outputs are 6,4,8,8,10,12. Even inputs are doubled, giving even outputs. Odd inputs plus 5 also give even outputs. The algorithm must return for the next input and stop after processing 6.",
      "hint": "Check one odd and one even input, then test the final-input stopping step."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-p-048",
    "curriculumCode": "AC9M4N09",
    "bank": "practice",
    "skill": "create spreadsheet sequence",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "Column A contains 1,2,3,…,100. Column B is 7,14,21,…,700, so B1=7, B2=14, B10=70 and B100=700. Each later input adds one more group of 7. Formula B10 is =A10*7, not a reference to the previous output.",
    "acceptanceNote": "Inspect the actual spreadsheet or a saved image showing inputs increasing from 1, formulas with changing row references and the requested outputs 7,14,70,700. Check a later formula such as B10 =A10*7. Require a justified difference of 7 between consecutive outputs. A paper plan rehearses the rule but does not by itself demonstrate the requested digital fill-down.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Use an available spreadsheet with your parent or teacher. Put 1 in A1 and =A1+1 in A2; fill A2’s formula down through A100. Put =A1*7 in B1 and fill it down through B100. Record B1, B2, B10 and B100, then explain the pattern and check one formula in a later row.",
    "audioPrompt": "Use an available spreadsheet with your parent or teacher. Put 1 in A1 and =A1+1 in A2; fill A2’s formula down through A100. Put =A1*7 in B1 and fill it down through B100. Record B1, B2, B10 and B100, then explain the pattern and check one formula in a later row.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 48,
    "correct": "Column A contains 1,2,3,…,100. Column B is 7,14,21,…,700, so B1=7, B2=14, B10=70 and B100=700. Each later input adds one more group of 7. Formula B10 is =A10*7, not a reference to the previous output.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "Column A contains 1,2,3,…,100. Column B is 7,14,21,…,700, so B1=7, B2=14, B10=70 and B100=700. Each later input adds one more group of 7. Formula B10 is =A10*7, not a reference to the previous output.",
      "hint": "Check that A100 is 100, then inspect both a formula and its calculated result."
    },
    "qualitySchema": "production-v1"
  }
];
window.quizQuestions = window.skillrPracticeQuestions;
