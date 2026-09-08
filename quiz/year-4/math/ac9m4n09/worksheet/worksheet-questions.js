"use strict";
window.skillrWorksheetQuestions = [
  {
    "id": "ac9m4n09-w-001",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Write an algorithm that records the positive multiples of 3 from 3 to 21 inclusive, then stops. Include a decision and follow your own steps.",
    "correct": "One model: start at 3; if at most 21, record, add 3 and return to the test; otherwise stop. Outputs: 3, 6, 9, 12, 15, 18, 21. Inspect actual runnable instructions, recording point and both decision destinations. Also accept inputs 1 through 7 multiplied by 3, with a clear final-input stop.",
    "explanation": "One model: start at 3; if at most 21, record, add 3 and return to the test; otherwise stop. Outputs: 3, 6, 9, 12, 15, 18, 21. Inspect actual runnable instructions, recording point and both decision destinations. Also accept inputs 1 through 7 multiplied by 3, with a clear final-input stop."
  },
  {
    "id": "ac9m4n09-w-002",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Draw a two-branch flowchart: if an input is even, multiply by 5; otherwise add 7. Run inputs 1, 2, 3, 4 in order, recording one output each, then stop. Use a separate sheet for the flowchart.",
    "correct": "Outputs: 8, 10, 10, 20. Inspect separate yes/no branches, exactly one record per input, an instruction to move to the next input and a stop after input 4. Accept one shared record step or a record step in each separate branch. Both outputs of 10 are valid.",
    "explanation": "Outputs: 8, 10, 10, 20. Inspect separate yes/no branches, exactly one record per input, an instruction to move to the next input and a stop after input 4. Accept one shared record step or a record step in each separate branch. Both outputs of 10 are valid."
  },
  {
    "id": "ac9m4n09-w-003",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Compare two algorithms on input 6: add 2 then multiply by 3; multiply by 3 then add 2. Show each intermediate value and explain the difference.",
    "correct": "First: 6 + 2 = 8, then 8 × 3 = 24. Second: 6 × 3 = 18, then 18 + 2 = 20. Require both ordered traces and an explanation that changing step order changes what is multiplied.",
    "explanation": "First: 6 + 2 = 8, then 8 × 3 = 24. Second: 6 × 3 = 18, then 18 + 2 = 20. Require both ordered traces and an explanation that changing step order changes what is multiplied."
  },
  {
    "id": "ac9m4n09-w-004",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Create a flowchart that records the starting value 2 before its first multiplication, then repeatedly multiplies the current value by 4 and records each value at most 150. Use a calculator to follow it, explain a pattern and check one product another way. Use a separate sheet for the flowchart.",
    "correct": "Recorded values: 2, 8, 32, 128; the next value, 512, is excluded. Each output is four times the previous output. Inspect an actual flowchart with both decision paths, a loop and a calculator-generated record. Accept testing before every record or safely recording the initial 2 first and checking all later values. One check: double 32 twice to get 64 then 128.",
    "explanation": "Recorded values: 2, 8, 32, 128; the next value, 512, is excluded. Each output is four times the previous output. Inspect an actual flowchart with both decision paths, a loop and a calculator-generated record. Accept testing before every record or safely recording the initial 2 first and checking all later values. One check: double 32 twice to get 64 then 128."
  },
  {
    "id": "ac9m4n09-w-005",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "A rule starts at 4, records, adds 5 and stops only when exactly 20 is reached. Show why this stop fails, then rewrite a rule that records only values at most 20.",
    "correct": "The values 4, 9, 14, 19, 24 skip 20. One repair: test at most 20 before recording; yes, record, add 5 and return; no, stop. Repaired list: 4, 9, 14, 19. Inspect the rewritten decision and output timing. Accept a safe initial record followed by a correct test for all later values.",
    "explanation": "The values 4, 9, 14, 19, 24 skip 20. One repair: test at most 20 before recording; yes, record, add 5 and return; no, stop. Repaired list: 4, 9, 14, 19. Inspect the rewritten decision and output timing. Accept a safe initial record followed by a correct test for all later values."
  },
  {
    "id": "ac9m4n09-w-006",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Use a spreadsheet: put 1 in A1 and =A1+1 in A2, then fill the A2 formula through A100. Put =A1*6 in B1 and fill through B100. Record B1, B2, B10, B100, inspect the formula in B10 and explain the output pattern.",
    "correct": "B1 = 6, B2 = 12, B10 = 60, B100 = 600; B10 contains =A10*6. Inspect actual increasing inputs and filled formulas with matching-row references. Require an explanation that outputs have gaps of 6 because each next input is 1 larger, adding one more group of 6. Paper predictions alone do not show digital fill-down.",
    "explanation": "B1 = 6, B2 = 12, B10 = 60, B100 = 600; B10 contains =A10*6. Inspect actual increasing inputs and filled formulas with matching-row references. Require an explanation that outputs have gaps of 6 because each next input is 1 larger, adding one more group of 6. Paper predictions alone do not show digital fill-down."
  },
  {
    "id": "ac9m4n09-w-007",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Cells A1 through A100 contain 1 through 100 in order. Each B formula should multiply the A input in its own row by 6. B1 contains =A1*6 and shows 6. Someone puts =B1*6 in B2. Explain the mistake and write the repair.",
    "correct": "=B1*6 uses the previous output, 6, giving 36. The intended second input is A2 = 2, so =A2*6 gives 12. Require both explanations and the corrected formula.",
    "explanation": "=B1*6 uses the previous output, 6, giving 36. The intended second input is A2 = 2, so =A2*6 gives 12. Require both explanations and the corrected formula."
  },
  {
    "id": "ac9m4n09-w-008",
    "curriculumCode": "AC9M4N09",
    "type": "self-check",
    "printable": true,
    "question": "Choose a multiplier from 1 to 10. Create a rule generating its first six positive multiples. Record them, explain a pattern from your rule and say whether the mathematical sequence must end there.",
    "correct": "Inspect a chosen multiplier, six correct successive positive multiples and a runnable rule with a finite recording stop. Accept repeated addition or successive inputs 1 through 6 multiplied by the chosen number. Require a correct pattern justified by the rule. The recorded list stops after six values, but another multiple can always be generated mathematically.",
    "explanation": "Inspect a chosen multiplier, six correct successive positive multiples and a runnable rule with a finite recording stop. Accept repeated addition or successive inputs 1 through 6 multiplied by the chosen number. Require a correct pattern justified by the rule. The recorded list stops after six values, but another multiple can always be generated mathematically."
  }
];
