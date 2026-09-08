"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m4n09-t-001",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "ordered steps",
    "printable": true,
    "type": "single",
    "question": "Start at 6. Add 4, then multiply the result by 3. What is recorded?",
    "audioPrompt": "Start at 6. Add 4, then multiply the result by 3. What is recorded?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "30",
      "42",
      "18",
      "22"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 1,
    "correct": 0,
    "explanation": "Adding gives 10, and multiplying that result by 3 gives 30. Reordering the steps would change the output.\nHint: Calculate each intermediate value in order.",
    "structuredExplanation": {
      "summary": "Adding gives 10, and multiplying that result by 3 gives 30. Reordering the steps would change the output.",
      "hint": "Calculate each intermediate value in order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-002",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "strict branch boundary",
    "printable": true,
    "type": "single",
    "question": "Follow the flowchart for input 5. What is the output?",
    "audioPrompt": "Follow the flowchart for input 5. What is the output?",
    "visual": "Flowchart: if the input is greater than 5, multiply by 2; otherwise add 3; record the resulting output.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Flowchart: if the input is greater than 5, multiply by 2; otherwise add 3; record the resulting output.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/t-002.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/t-002.svg#model",
      "alt_text": "Flowchart: if the input is greater than 5, multiply by 2; otherwise add 3; record the resulting output."
    },
    "answers": [
      "10",
      "8",
      "13",
      "15"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 2,
    "correct": 1,
    "explanation": "Five is not greater than five, so the No branch adds 3: 5 + 3 = 8.\nHint: A strict greater-than test does not include equality.",
    "structuredExplanation": {
      "summary": "Five is not greater than five, so the No branch adds 3: 5 + 3 = 8.",
      "hint": "A strict greater-than test does not include equality."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-003",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "loop endpoint",
    "printable": true,
    "type": "single",
    "question": "Follow the flowchart. Which list is recorded?",
    "audioPrompt": "Follow the flowchart. Which list is recorded?",
    "visual": "Flowchart: start at 4; if the number is at most 16, record it, add 4 and repeat the test; otherwise stop.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Flowchart: start at 4; if the number is at most 16, record it, add 4 and repeat the test; otherwise stop.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/t-003.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/t-003.svg#model",
      "alt_text": "Flowchart: start at 4; if the number is at most 16, record it, add 4 and repeat the test; otherwise stop."
    },
    "answers": [
      "8, 12, 16",
      "4, 8, 12, 16",
      "4, 8, 12",
      "4, 8, 12, 16, 20"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 3,
    "correct": 1,
    "explanation": "The loop records numbers at most 16, including its start 4 and boundary 16. After adding four again, 20 fails the test.\nHint: Check the decision before every record.",
    "structuredExplanation": {
      "summary": "The loop records numbers at most 16, including its start 4 and boundary 16. After adding four again, 20 fails the test.",
      "hint": "Check the decision before every record."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-004",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "multiplication record count",
    "printable": true,
    "type": "single",
    "question": "Start at 1 and record it. Repeatedly multiply the current number by 5 and record, stopping after four numbers total. What is the fourth number?",
    "audioPrompt": "Start at 1 and record it. Repeatedly multiply the current number by 5 and record, stopping after four numbers total. What is the fourth number?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "20",
      "625",
      "125",
      "25"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 4,
    "correct": 2,
    "explanation": "The four recorded values are 1, 5, 25 and 125. The starting 1 counts as the first.\nHint: Label the first, second, third and fourth outputs.",
    "structuredExplanation": {
      "summary": "The four recorded values are 1, 5, 25 and 125. The starting 1 counts as the first.",
      "hint": "Label the first, second, third and fourth outputs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-005",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "updated value decision",
    "printable": true,
    "type": "single",
    "question": "Start with 4 and add 1. If the new number is even, double it; otherwise add 3. What output follows?",
    "audioPrompt": "Start with 4 and add 1. If the new number is even, double it; otherwise add 3. What output follows?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "10",
      "9",
      "8",
      "13"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 5,
    "correct": 2,
    "explanation": "The new number is 5, which is odd. The otherwise branch gives 5 + 3 = 8.\nHint: Test the changed value, rather than the original input.",
    "structuredExplanation": {
      "summary": "The new number is 5, which is odd. The otherwise branch gives 5 + 3 = 8.",
      "hint": "Test the changed value, rather than the original input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-006",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "record after multiplication",
    "printable": true,
    "type": "single",
    "question": "Start at 3. Multiply by 2 and then record. Repeat these two steps until three outputs have been recorded. Which list results?",
    "audioPrompt": "Start at 3. Multiply by 2 and then record. Repeat these two steps until three outputs have been recorded. Which list results?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "6, 9, 12",
      "3, 6, 12",
      "3, 9, 27",
      "6, 12, 24"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 6,
    "correct": 3,
    "explanation": "The first record happens after doubling, giving 6. Repeating produces 12 and 24.\nHint: The initial 3 is a starting value, not a recorded output.",
    "structuredExplanation": {
      "summary": "The first record happens after doubling, giving 6. Repeating produces 12 and 24.",
      "hint": "The initial 3 is a starting value, not a recorded output."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-007",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "spreadsheet row value",
    "printable": true,
    "type": "single",
    "question": "Cells A1 through A100 contain inputs 1 through 100 in order. Each B cell multiplies the A input in the same row by 8. What is B25?",
    "audioPrompt": "Cells A1 through A100 contain inputs 1 through 100 in order. Each B cell multiplies the A input in the same row by 8. What is B25?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "100",
      "33",
      "200",
      "800"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 7,
    "correct": 2,
    "explanation": "Input A25 is 25, so B25 is 25 × 8 = 200.\nHint: Read the specified row’s input before applying the rule.",
    "structuredExplanation": {
      "summary": "Input A25 is 25, so B25 is 25 × 8 = 200.",
      "hint": "Read the specified row’s input before applying the rule."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-008",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "spreadsheet relative formula",
    "printable": true,
    "type": "single",
    "question": "B1 contains =A1*9. It is filled down with relative references. Which formula should appear in B5?",
    "audioPrompt": "B1 contains =A1*9. It is filled down with relative references. Which formula should appear in B5?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "=A5*9",
      "=A1*9",
      "=A5+9",
      "=B4*9"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 8,
    "correct": 0,
    "explanation": "The input reference moves down with the formula to the same row: A5. The multiplier remains 9.\nHint: The row changes; the operation and multiplier stay the same.",
    "structuredExplanation": {
      "summary": "The input reference moves down with the formula to the same row: A5. The multiplier remains 9.",
      "hint": "The row changes; the operation and multiplier stay the same."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-009",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "debug doubling list",
    "printable": true,
    "type": "single",
    "question": "A rule starts at 5 and doubles the previous value. A learner records 5, 10, 20, 41, 80. Which correction is needed?",
    "audioPrompt": "A rule starts at 5 and doubles the previous value. A learner records 5, 10, 20, 41, 80. Which correction is needed?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Change 20 to 21",
      "Change 10 to 15",
      "Change 80 to 81",
      "Change 41 to 40"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 9,
    "correct": 3,
    "explanation": "Doubling 20 gives 40, and doubling 40 gives 80. This repairs the one incorrect entry.\nHint: Check the value against both neighbouring correct steps.",
    "structuredExplanation": {
      "summary": "Doubling 20 gives 40, and doubling 40 gives 80. This repairs the one incorrect entry.",
      "hint": "Check the value against both neighbouring correct steps."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-010",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "explain input output pattern",
    "printable": true,
    "type": "single",
    "question": "Each input is multiplied by 3 and then 1 is added. What describes the change between consecutive outputs for inputs 1, 2, 3, 4, 5?",
    "audioPrompt": "Each input is multiplied by 3 and then 1 is added. What describes the change between consecutive outputs for inputs 1, 2, 3, 4, 5?",
    "visual": "Inputs 1 through 5 have outputs 4, 7, 10, 13, 16 under multiply by 3 then add 1.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Inputs 1 through 5 have outputs 4, 7, 10, 13, 16 under multiply by 3 then add 1.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n09/t-010.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n09/t-010.svg#model",
      "alt_text": "Inputs 1 through 5 have outputs 4, 7, 10, 13, 16 under multiply by 3 then add 1."
    },
    "answers": [
      "Each output is 3 more than the previous output",
      "Each output is 1 more than the previous output",
      "All outputs are odd",
      "Each output doubles"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 10,
    "correct": 0,
    "explanation": "The outputs are 4, 7, 10, 13 and 16. Increasing an input by 1 adds one more group of 3; the extra 1 is added once to every product.\nHint: Separate the fixed extra 1 from the increase caused by the next input.",
    "structuredExplanation": {
      "summary": "The outputs are 4, 7, 10, 13 and 16. Increasing an input by 1 adds one more group of 3; the extra 1 is added once to every product.",
      "hint": "Separate the fixed extra 1 from the increase caused by the next input."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-011",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "constant multiplier one",
    "printable": true,
    "type": "single",
    "question": "Start at 5 and repeatedly multiply the PREVIOUS value by 1. What pattern is recorded?",
    "audioPrompt": "Start at 5 and repeatedly multiply the PREVIOUS value by 1. What pattern is recorded?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "Every recorded value becomes 1",
      "Every recorded value remains 5",
      "The values are 5, 6, 7, 8",
      "The values double each time"
    ],
    "difficulty": 2,
    "difficultyTier": "application",
    "sequencePriority": 11,
    "correct": 1,
    "explanation": "Multiplying 5 by 1 gives 5, and repeating keeps the same value. A multiplication rule does not always make values increase.\nHint: Distinguish a fixed starting value from a list of changing inputs.",
    "structuredExplanation": {
      "summary": "Multiplying 5 by 1 gives 5, and repeating keeps the same value. A multiplication rule does not always make values increase.",
      "hint": "Distinguish a fixed starting value from a list of changing inputs."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-012",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "multiplication stop test",
    "printable": true,
    "type": "single",
    "question": "Start at 3. Test before recording; if the test passes, record, double and return to the test. Which condition records exactly 3, 6, 12, 24?",
    "audioPrompt": "Start at 3. Test before recording; if the test passes, record, double and return to the test. Which condition records exactly 3, 6, 12, 24?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [
      "The number is at least 24",
      "The number is less than 24",
      "The number equals 3",
      "The number is at most 24"
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 12,
    "correct": 3,
    "explanation": "At most 24 includes all four wanted values and rejects the next value 48. The strict less-than test would omit 24.\nHint: Test both 24 and the value produced after it.",
    "structuredExplanation": {
      "summary": "At most 24 includes all four wanted values and rejects the next value 48. The strict less-than test would omit 24.",
      "hint": "Test both 24 and the value produced after it."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-013",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "create multiples algorithm",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "Start at 8. If the current value is at most 48, record it, add 8 and repeat the test; otherwise stop. The six outputs are 8,16,24,32,40,48. Each new term adds one equal group of 8.",
    "acceptanceNote": "Require a precise start, generating steps, record timing and both continue/stop destinations. The list must be exactly 8, 16, 24, 32, 40, 48. Accept repeated addition of 8, an input counter from 1 through 6 multiplied by 8, or another equivalent runnable method. Later values must not be recorded. Inspect a justified pattern such as equal gaps of 8 or all outputs even.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Create an algorithm that records exactly the positive multiples of 8 from 8 to 48 inclusive. Include a clear continue/stop decision, follow it, and explain one pattern using the generating rule.",
    "audioPrompt": "Create an algorithm that records exactly the positive multiples of 8 from 8 to 48 inclusive. Include a clear continue/stop decision, follow it, and explain one pattern using the generating rule.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 13,
    "correct": "Start at 8. If the current value is at most 48, record it, add 8 and repeat the test; otherwise stop. The six outputs are 8,16,24,32,40,48. Each new term adds one equal group of 8.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "Start at 8. If the current value is at most 48, record it, add 8 and repeat the test; otherwise stop. The six outputs are 8,16,24,32,40,48. Each new term adds one equal group of 8.",
      "hint": "Run your instructions yourself, including the decision after 48."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-014",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "create and trace branches",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "The outputs are 2+6=8, 3+6=9, 4×3=12 and 5×3=15. Within the add-6 branch, increasing the input by 1 increases the output by 1. Within the multiply-3 branch, increasing the input by 1 increases the output by 3. After input 5, stop.",
    "acceptanceNote": "Inspect two correctly labelled branches with one output per input and an explicit final-input stop. Require outputs 8,9,12,15. For the add-6 branch, inputs 2 and 3 give outputs one apart; for the multiply-3 branch, inputs 4 and 5 give outputs three apart. Accept equivalent plain-language explanations; do not require formal algebra.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "For inputs 2, 3, 4 and 5 in order, create a flowchart or written algorithm: if the input is less than 4, add 6; otherwise multiply it by 3. Include recording and a stop after the last input. Trace all outputs and describe how outputs change within each branch.",
    "audioPrompt": "For inputs 2, 3, 4 and 5 in order, create a flowchart or written algorithm: if the input is less than 4, add 6; otherwise multiply it by 3. Include recording and a stop after the last input. Trace all outputs and describe how outputs change within each branch.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 14,
    "correct": "The outputs are 2+6=8, 3+6=9, 4×3=12 and 5×3=15. Within the add-6 branch, increasing the input by 1 increases the output by 1. Within the multiply-3 branch, increasing the input by 1 increases the output by 3. After input 5, stop.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "The outputs are 2+6=8, 3+6=9, 4×3=12 and 5×3=15. Within the add-6 branch, increasing the input by 1 increases the output by 1. Within the multiply-3 branch, increasing the input by 1 increases the output by 3. After input 5, stop.",
      "hint": "Equality with 4 follows the otherwise branch because the test says less than 4."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-015",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "create constant product flowchart",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "Record 1,4,16,64. After 64 the rule produces 256, which fails the at-most-100 test and is not recorded. Each output after the first is four times the previous value. A check is 16 doubled twice: 32 then 64.",
    "acceptanceNote": "Inspect a real flowchart containing start 1, a limit test, a record step, multiplication by 4, a loop arrow and a stop branch. The recorded list must be 1, 4, 16, 64, excluding 256. Accept a test before every record, or safely recording the initial 1 first and checking all later values before recording them. Require a calculator-generated record and an independent check such as 16 × 4 = 16 + 16 + 16 + 16 = 64 or two doublings.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Draw a flowchart that starts at 1, multiplies the current value by 4 after each record, and stops before recording a value greater than 100. Include both decision paths. Use a calculator to follow it and check one product by another strategy.",
    "audioPrompt": "Draw a flowchart that starts at 1, multiplies the current value by 4 after each record, and stops before recording a value greater than 100. Include both decision paths. Use a calculator to follow it and check one product by another strategy.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 15,
    "correct": "Record 1,4,16,64. After 64 the rule produces 256, which fails the at-most-100 test and is not recorded. Each output after the first is four times the previous value. A check is 16 doubled twice: 32 then 64.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "Record 1,4,16,64. After 64 the rule produces 256, which fails the at-most-100 test and is not recorded. Each output after the first is four times the previous value. A check is 16 doubled twice: 32 then 64.",
      "hint": "Your stop decision must prevent the too-large value from being recorded."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n09-t-016",
    "curriculumCode": "AC9M4N09",
    "bank": "test",
    "skill": "create spreadsheet two step rule",
    "printable": true,
    "type": "self-check",
    "gradingMode": "adult-review",
    "responseType": "short_answer",
    "modelAnswer": "The outputs are 5,8,11,…,302. The requested entries are 5,8,32,302, and B10 contains =A10*3+2. Consecutive inputs differ by 1, so their products differ by 3; adding the same 2 to each preserves that gap.",
    "acceptanceNote": "Inspect actual inputs 1…100 and filled formulas referring to the matching A row. Require B1=5, B2=8, B10=32, B100=302, with B10 =A10*3+2. Require an explanation of gaps of 3 because each next input adds one more group of 3 while the added 2 stays fixed. A paper-only prediction does not demonstrate digital fill-down.",
    "responseInstructions": "Complete the written work, model or algorithm requested. Ask an adult to inspect it against the model answer and task-specific checks.",
    "completionLabel": "My work is ready for an adult to check.",
    "question": "Use an available spreadsheet to put the inputs 1 to 100 in column A. In B1 enter =A1*3+2 and fill it down through B100. Record B1, B2, B10 and B100, inspect the formula in B10 and explain the change between consecutive outputs.",
    "audioPrompt": "Use an available spreadsheet to put the inputs 1 to 100 in column A. In B1 enter =A1*3+2 and fill it down through B100. Record B1, B2, B10 and B100, inspect the formula in B10 and explain the change between consecutive outputs.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none"
    },
    "answers": [],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 16,
    "correct": "The outputs are 5,8,11,…,302. The requested entries are 5,8,32,302, and B10 contains =A10*3+2. Consecutive inputs differ by 1, so their products differ by 3; adding the same 2 to each preserves that gap.",
    "explanation": "Check the completed work against this guidance before marking the response.",
    "structuredExplanation": {
      "summary": "The outputs are 5,8,11,…,302. The requested entries are 5,8,32,302, and B10 contains =A10*3+2. Consecutive inputs differ by 1, so their products differ by 3; adding the same 2 to each preserves that gap.",
      "hint": "Generate the inputs first, then check a later formula as well as its displayed value."
    },
    "qualitySchema": "production-v1"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
