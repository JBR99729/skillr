"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m1n03-t-001",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "complete skip count",
    "printable": true,
    "type": "number",
    "question": "Complete the count by 10s.",
    "explanation": "Add 10 each time, so the missing number is 40.",
    "visual": "20 — 30 — ___ — 50 — 60",
    "correct": 40,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-002",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "match group description to total",
    "printable": true,
    "type": "single",
    "question": "Which total matches 4 equal groups of 5?",
    "explanation": "Skip count 5 a total of 4 times to reach 20.",
    "answers": [
      "20",
      "15",
      "25",
      "9"
    ],
    "correct": 0
  },
  {
    "id": "ac9m1n03-t-003",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "full groups and leftovers",
    "printable": true,
    "type": "number",
    "question": "How many objects are there altogether?",
    "explanation": "4 full groups of 5 make 20; 3 more make 23.",
    "visual": "[ ◆ ◆ ◆ ◆ ◆ ]   [ ◆ ◆ ◆ ◆ ◆ ]   [ ◆ ◆ ◆ ◆ ◆ ]   [ ◆ ◆ ◆ ◆ ◆ ]\nLeft over: ◆ ◆ ◆",
    "correct": 23,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-004",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "describe grouping",
    "printable": true,
    "type": "single",
    "question": "59 objects are grouped in 2s. Which description is correct?",
    "explanation": "29×2=58, with 1 more.",
    "answers": [
      "29 full groups and 1 left over",
      "1 group and 29 left over",
      "30 full groups and 0 left over"
    ],
    "correct": 0
  },
  {
    "id": "ac9m1n03-t-005",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "choose efficient grouping",
    "printable": true,
    "type": "single",
    "question": "You need to count 66 loose counters efficiently. Which plan is most useful?",
    "explanation": "Equal groups of 10 reduce the number of count steps and are easy to check.",
    "answers": [
      "Guess from how spread out they are",
      "Make groups with different sizes",
      "Make groups of 10 and count the extras",
      "Count the same counter many times"
    ],
    "correct": 2
  },
  {
    "id": "ac9m1n03-t-006",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "group collection into tens",
    "printable": true,
    "type": "single",
    "question": "Which grouping represents 28 objects?",
    "explanation": "2 tens make 20; 8 singles make the total 28.",
    "visual": "[ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]\nLeft over: ● ● ● ● ● ● ● ●",
    "answers": [
      "8 groups of 10 and 2 singles",
      "2 groups of 10 and 8 singles",
      "2 groups of 5 and 8 singles",
      "3 groups of 10 and 8 singles"
    ],
    "correct": 1
  },
  {
    "id": "ac9m1n03-t-007",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "identify unequal-group error",
    "printable": true,
    "type": "single",
    "question": "Ben skip counts these bags by 10s and says 40. What is the mistake?",
    "explanation": "Only equal full groups can be counted as 10 each.",
    "visual": "[ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]",
    "answers": [
      "All bags are equal and 40 is correct",
      "The bags should be counted backwards",
      "One bag has 9, so the actual total is 39",
      "Skip counting cannot count equal groups"
    ],
    "correct": 2
  },
  {
    "id": "ac9m1n03-t-008",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "recognise equal groups",
    "printable": true,
    "type": "multiple",
    "question": "Which two cards show groups with 3 in every group?",
    "explanation": "The first two cards keep the group size at 3 every time.",
    "answers": [
      "3, 3, 3",
      "3, 3, 3, 3, 3",
      "3, 4, 3",
      "2, 3, 4"
    ],
    "correct": [
      0,
      1
    ]
  },
  {
    "id": "ac9m1n03-t-009",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "different groupings same total",
    "printable": true,
    "type": "multiple",
    "question": "Select both groupings that make 80.",
    "explanation": "Each selected grouping has a total of 80.",
    "answers": [
      "40 groups of 2",
      "16 groups of 5",
      "15 groups of 5",
      "9 groups of 10"
    ],
    "correct": [
      0,
      1
    ]
  },
  {
    "id": "ac9m1n03-t-010",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "order skip-count sequence",
    "printable": true,
    "type": "order",
    "question": "Put the count-by-10 cards in order.",
    "explanation": "Counting by 10s gives 10, 20, 30, 40, 50.",
    "items": [
      "40",
      "50",
      "20",
      "30",
      "10"
    ],
    "correct": [
      "10",
      "20",
      "30",
      "40",
      "50"
    ],
    "instruction": "Use the arrows to put them in order."
  },
  {
    "id": "ac9m1n03-t-011",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "next skip count",
    "printable": true,
    "type": "number",
    "question": "What comes next when counting by 2s: 16, 18, ___?",
    "explanation": "Add 2: 18+2=20.",
    "correct": 20,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-012",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "compare grouped collections",
    "printable": true,
    "type": "single",
    "question": "Collection A has 6 groups of 5. Collection B has 7 groups of 5. Which has more?",
    "explanation": "B has one more full group: 35 compared with 30.",
    "visual": "A: [ ● ● ● ● ● ]   [ ● ● ● ● ● ]   [ ● ● ● ● ● ]   [ ● ● ● ● ● ]   [ ● ● ● ● ● ]   [ ● ● ● ● ● ]\nB: [ ■ ■ ■ ■ ■ ]   [ ■ ■ ■ ■ ■ ]   [ ■ ■ ■ ■ ■ ]   [ ■ ■ ■ ■ ■ ]   [ ■ ■ ■ ■ ■ ]   [ ■ ■ ■ ■ ■ ]   [ ■ ■ ■ ■ ■ ]",
    "answers": [
      "The group colour decides",
      "Collection B",
      "Collection A",
      "They are equal"
    ],
    "correct": 1
  },
  {
    "id": "ac9m1n03-t-013",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "check a grouped count",
    "printable": true,
    "type": "single",
    "question": "Ben says 8 groups of 10 contain 80. Which check is best?",
    "explanation": "Skip counting once for every equal group confirms 80.",
    "answers": [
      "Use the number of groups as the total",
      "Count each group as a different size",
      "Count only the first group",
      "Count 10, 20, 30, 40, 50, 60, 70, 80"
    ],
    "correct": 3
  },
  {
    "id": "ac9m1n03-t-014",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "count equal rows",
    "printable": true,
    "type": "number",
    "question": "How many dots are in the equal rows?",
    "explanation": "2 rows of 2 make 4.",
    "visual": "● ●\n● ●",
    "correct": 4,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-015",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "count leftovers separately",
    "printable": true,
    "type": "single",
    "question": "There are 4 full groups of 5 and 4 extra objects. Which count is correct?",
    "explanation": "Skip count the full equal groups, then add the leftovers.",
    "answers": [
      "Ignore the extras and stop at 20",
      "Count every group as 5, including the extras, to 25",
      "Start again from 1 for every group and never combine totals",
      "Count 5s to 20, then count 4 more to 24"
    ],
    "correct": 3
  },
  {
    "id": "ac9m1n03-t-016",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "identify group size",
    "printable": true,
    "type": "number",
    "question": "How many objects are in each equal group?",
    "explanation": "Every bracket contains 10 objects.",
    "visual": "[ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ]   [ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ]   [ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ]   [ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ]",
    "correct": 10,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-017",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "identify number of groups",
    "printable": true,
    "type": "number",
    "question": "How many equal groups of 2 are shown?",
    "explanation": "There are 2 separate equal groups.",
    "visual": "[ ⬟ ⬟ ]   [ ⬟ ⬟ ]",
    "correct": 2,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-018",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "count equal groups",
    "printable": true,
    "type": "number",
    "question": "How many counters are shown in the equal groups?",
    "explanation": "There are 5 groups of 10. Skip count by 10 to 50.",
    "visual": "[ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]",
    "correct": 50,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-019",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "complete skip count",
    "printable": true,
    "type": "number",
    "question": "Complete the count by 2s.",
    "explanation": "Add 2 each time, so the missing number is 6.",
    "visual": "2 — 4 — ___ — 8 — 10",
    "correct": 6,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-020",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "match group description to total",
    "printable": true,
    "type": "single",
    "question": "Which total matches 9 equal groups of 10?",
    "explanation": "Skip count 10 a total of 9 times to reach 90.",
    "answers": [
      "19",
      "80",
      "100",
      "90"
    ],
    "correct": 3
  },
  {
    "id": "ac9m1n03-t-021",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "full groups and leftovers",
    "printable": true,
    "type": "number",
    "question": "How many objects are there altogether?",
    "explanation": "2 full groups of 10 make 20; 3 more make 23.",
    "visual": "[ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ]   [ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ]\nLeft over: ◆ ◆ ◆",
    "correct": 23,
    "tolerance": 0,
    "placeholder": "Type the number"
  },
  {
    "id": "ac9m1n03-t-022",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "describe grouping",
    "printable": true,
    "type": "single",
    "question": "46 objects are grouped in 5s. Which description is correct?",
    "explanation": "9×5=45, with 1 more.",
    "answers": [
      "9 full groups and 2 left over",
      "9 full groups and 1 left over",
      "1 group and 9 left over",
      "10 full groups and 0 left over"
    ],
    "correct": 1
  },
  {
    "id": "ac9m1n03-t-023",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "choose efficient grouping",
    "printable": true,
    "type": "single",
    "question": "You need to count 65 loose counters efficiently. Which plan is most useful?",
    "explanation": "Equal groups of 10 reduce the number of count steps and are easy to check.",
    "answers": [
      "Guess from how spread out they are",
      "Count the same counter many times",
      "Make groups of 10 and count the extras",
      "Make groups with different sizes"
    ],
    "correct": 2
  },
  {
    "id": "ac9m1n03-t-024",
    "curriculumCode": "AC9M1N03",
    "bank": "test",
    "skill": "group collection into tens",
    "printable": true,
    "type": "single",
    "question": "Which grouping represents 61 objects?",
    "explanation": "6 tens make 60; 1 single make the total 61.",
    "visual": "[ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]   [ ● ● ● ● ● ● ● ● ● ● ]\nLeft over: ●",
    "answers": [
      "7 groups of 10 and 1 single",
      "6 groups of 10 and 1 single",
      "6 groups of 5 and 1 single",
      "1 group of 10 and 6 singles"
    ],
    "correct": 1
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
