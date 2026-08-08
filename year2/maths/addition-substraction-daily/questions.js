"use strict";

/*
  Year 2 Addition & Subtraction Strategies
  48-question rotating bank.
  Each 8-question attempt contains:
  - 2 single-choice questions
  - 1 true/false or select-all question
  - 1 number-entry question
  - 1 short typed-answer question
  - 1 fill-in-the-blank question
  - 1 ordering question
  - 1 drag-and-drop ordering question

  On the same browser, the bank rotates without repeating a question
  until all 48 questions have been used (6 attempts), then starts again.
*/

(() => {
  const bank = [
  {
    "id": "y2as-s1",
    "type": "single",
    "question": "34 + 25 = ?",
    "answers": [
      "49",
      "59",
      "69"
    ],
    "correct": 1,
    "explanation": "34 + 25 = 59."
  },
  {
    "id": "y2as-s2",
    "type": "single",
    "question": "67 - 23 = ?",
    "answers": [
      "44",
      "45",
      "54"
    ],
    "correct": 0,
    "explanation": "67 - 23 = 44."
  },
  {
    "id": "y2as-s3",
    "type": "single",
    "question": "Which strategy is useful for 48 + 19?",
    "answers": [
      "Add 20, then subtract 1",
      "Subtract 20",
      "Count back 19"
    ],
    "correct": 0,
    "explanation": "19 is one less than 20."
  },
  {
    "id": "y2as-s4",
    "type": "single",
    "question": "Which number sentence matches 72 take away 18?",
    "answers": [
      "72 + 18",
      "72 - 18",
      "18 - 72"
    ],
    "correct": 1,
    "explanation": "Take away means subtraction."
  },
  {
    "id": "y2as-s5",
    "type": "single",
    "question": "Which has the greatest value?",
    "answers": [
      "46 + 12",
      "71 - 15",
      "35 + 24"
    ],
    "correct": 2,
    "explanation": "46+12=58, 71-15=56, 35+24=59."
  },
  {
    "id": "y2as-s6",
    "type": "single",
    "question": "What is the missing part? 63 = 40 + ?",
    "answers": [
      "13",
      "23",
      "33"
    ],
    "correct": 1,
    "explanation": "40 + 23 = 63."
  },
  {
    "id": "y2as-s7",
    "type": "single",
    "question": "A library has 38 books and receives 27 more. How many now?",
    "answers": [
      "55",
      "65",
      "75"
    ],
    "correct": 1,
    "explanation": "38 + 27 = 65."
  },
  {
    "id": "y2as-s8",
    "type": "single",
    "question": "There are 84 counters. 36 are removed. How many remain?",
    "answers": [
      "48",
      "52",
      "58"
    ],
    "correct": 0,
    "explanation": "84 - 36 = 48."
  },
  {
    "id": "y2as-s9",
    "type": "single",
    "question": "Which equation can check 52 - 17 = 35?",
    "answers": [
      "35 + 17 = 52",
      "52 + 17 = 69",
      "35 - 17 = 18"
    ],
    "correct": 0,
    "explanation": "Addition can check the subtraction."
  },
  {
    "id": "y2as-s10",
    "type": "single",
    "question": "Which is closest to 50?",
    "answers": [
      "27 + 21",
      "64 - 12",
      "35 + 18"
    ],
    "correct": 0,
    "explanation": "The values are 48, 52 and 53; 48 is closest to 50."
  },
  {
    "id": "y2as-s11",
    "type": "single",
    "question": "Which regrouping helps with 36 + 28?",
    "answers": [
      "30+20 and 6+8",
      "3+2 and 6+8",
      "36-28"
    ],
    "correct": 0,
    "explanation": "Partition into tens and ones."
  },
  {
    "id": "y2as-s12",
    "type": "single",
    "question": "Which difference is 29?",
    "answers": [
      "61 - 32",
      "54 - 24",
      "47 - 17"
    ],
    "correct": 0,
    "explanation": "61 - 32 = 29."
  },
  {
    "id": "y2as-a1",
    "type": "true-false",
    "question": "49 + 26 = 75.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "49 + 26 = 75."
  },
  {
    "id": "y2as-a2",
    "type": "true-false",
    "question": "83 - 47 = 46.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "83 - 47 = 36."
  },
  {
    "id": "y2as-a3",
    "type": "true-false",
    "question": "36 + 18 and 60 - 6 have the same value.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Both equal 54."
  },
  {
    "id": "y2as-a4",
    "type": "multiple",
    "question": "Select all number sentences that equal 60.",
    "answers": [
      "38 + 22",
      "74 - 14",
      "45 + 14",
      "91 - 31"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "38+22, 74-14 and 91-31 equal 60."
  },
  {
    "id": "y2as-a5",
    "type": "multiple",
    "question": "Select all equations that can check 64 - 28 = 36.",
    "answers": [
      "36 + 28 = 64",
      "64 - 36 = 28",
      "28 + 64 = 92",
      "64 + 28 = 92"
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Related addition and subtraction facts can check the result."
  },
  {
    "id": "y2as-a6",
    "type": "multiple",
    "question": "Select all calculations where making a ten is useful.",
    "answers": [
      "29 + 16",
      "48 + 12",
      "63 - 20",
      "39 + 24"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Numbers ending in 9 or 8 can often be adjusted to a nearby ten."
  },
  {
    "id": "y2as-n1",
    "type": "number",
    "question": "Work out 47 + 28.",
    "correct": 75,
    "explanation": "47 + 28 = 75."
  },
  {
    "id": "y2as-n2",
    "type": "number",
    "question": "Work out 92 - 37.",
    "correct": 55,
    "explanation": "92 - 37 = 55."
  },
  {
    "id": "y2as-n3",
    "type": "number",
    "question": "Work out 56 + 19.",
    "correct": 75,
    "explanation": "56 + 19 = 75."
  },
  {
    "id": "y2as-n4",
    "type": "number",
    "question": "Work out 81 - 46.",
    "correct": 35,
    "explanation": "81 - 46 = 35."
  },
  {
    "id": "y2as-n5",
    "type": "number",
    "question": "Work out 68 + 24.",
    "correct": 92,
    "explanation": "68 + 24 = 92."
  },
  {
    "id": "y2as-n6",
    "type": "number",
    "question": "Work out 73 - 29.",
    "correct": 44,
    "explanation": "73 - 29 = 44."
  },
  {
    "id": "y2as-t1",
    "type": "text",
    "question": "Type the place-value word for the 6 in 64.",
    "correct": "tens",
    "acceptedAnswers": [
      "tens",
      "ten"
    ],
    "explanation": "The 6 represents 6 tens."
  },
  {
    "id": "y2as-t2",
    "type": "text",
    "question": "Type the place-value word for the 7 in 47.",
    "correct": "ones",
    "acceptedAnswers": [
      "ones",
      "one"
    ],
    "explanation": "The 7 is in the ones place."
  },
  {
    "id": "y2as-t3",
    "type": "text",
    "question": "Which operation undoes addition? Type the word.",
    "correct": "subtraction",
    "acceptedAnswers": [
      "subtraction",
      "subtract"
    ],
    "explanation": "Subtraction is the inverse of addition."
  },
  {
    "id": "y2as-t4",
    "type": "text",
    "question": "Which operation can check a subtraction answer? Type the word.",
    "correct": "addition",
    "acceptedAnswers": [
      "addition",
      "add"
    ],
    "explanation": "Related addition facts can check subtraction."
  },
  {
    "id": "y2as-t5",
    "type": "text",
    "question": "In 52 = 30 + 22, what word describes splitting a number into parts?",
    "correct": "partition",
    "acceptedAnswers": [
      "partition",
      "partitioning"
    ],
    "explanation": "Partition means splitting a number into parts."
  },
  {
    "id": "y2as-t6",
    "type": "text",
    "question": "Type the word for changing 49 + 18 into 50 + 17 without changing the total.",
    "correct": "compensation",
    "acceptedAnswers": [
      "compensation",
      "compensate"
    ],
    "explanation": "Compensation adjusts numbers while keeping the total equivalent."
  },
  {
    "id": "y2as-f1",
    "type": "fill-blank",
    "question": "Complete the number sentence.",
    "template": "46 + {{blank}} = 70",
    "acceptedAnswers": [
      "24"
    ],
    "explanation": "46 + 24 = 70."
  },
  {
    "id": "y2as-f2",
    "type": "fill-blank",
    "question": "Complete the number sentence.",
    "template": "{{blank}} + 35 = 82",
    "acceptedAnswers": [
      "47"
    ],
    "explanation": "47 + 35 = 82."
  },
  {
    "id": "y2as-f3",
    "type": "fill-blank",
    "question": "Complete the subtraction sentence.",
    "template": "91 - {{blank}} = 56",
    "acceptedAnswers": [
      "35"
    ],
    "explanation": "91 - 35 = 56."
  },
  {
    "id": "y2as-f4",
    "type": "fill-blank",
    "question": "Complete the subtraction sentence.",
    "template": "{{blank}} - 27 = 48",
    "acceptedAnswers": [
      "75"
    ],
    "explanation": "75 - 27 = 48."
  },
  {
    "id": "y2as-f5",
    "type": "fill-blank",
    "question": "Complete the related fact.",
    "template": "38 + 26 = 64, so 64 - 38 = {{blank}}",
    "acceptedAnswers": [
      "26"
    ],
    "explanation": "The missing part is 26."
  },
  {
    "id": "y2as-f6",
    "type": "fill-blank",
    "question": "Complete the compensation step.",
    "template": "59 + 24 = 60 + {{blank}}",
    "acceptedAnswers": [
      "23"
    ],
    "explanation": "Add 1 to 59 and subtract 1 from 24."
  },
  {
    "id": "y2as-o1",
    "type": "order",
    "question": "Arrange from smallest answer to largest.",
    "instruction": "Use the arrows to arrange the calculations.",
    "items": [
      "28 + 17",
      "63 - 21",
      "19 + 18"
    ],
    "correct": [
      "19 + 18",
      "63 - 21",
      "28 + 17"
    ],
    "explanation": "Work out or estimate each value, then compare."
  },
  {
    "id": "y2as-o2",
    "type": "order",
    "question": "Arrange from smallest answer to largest.",
    "instruction": "Use the arrows to arrange the calculations.",
    "items": [
      "74 - 38",
      "46 + 15",
      "52 - 19"
    ],
    "correct": [
      "52 - 19",
      "74 - 38",
      "46 + 15"
    ],
    "explanation": "Work out or estimate each value, then compare."
  },
  {
    "id": "y2as-o3",
    "type": "order",
    "question": "Arrange from smallest answer to largest.",
    "instruction": "Use the arrows to arrange the calculations.",
    "items": [
      "39 + 28",
      "81 - 25",
      "44 + 9"
    ],
    "correct": [
      "44 + 9",
      "81 - 25",
      "39 + 28"
    ],
    "explanation": "Work out or estimate each value, then compare."
  },
  {
    "id": "y2as-o4",
    "type": "order",
    "question": "Arrange from smallest answer to largest.",
    "instruction": "Use the arrows to arrange the calculations.",
    "items": [
      "93 - 47",
      "27 + 32",
      "68 - 14"
    ],
    "correct": [
      "93 - 47",
      "68 - 14",
      "27 + 32"
    ],
    "explanation": "Work out or estimate each value, then compare."
  },
  {
    "id": "y2as-o5",
    "type": "order",
    "question": "Arrange from smallest answer to largest.",
    "instruction": "Use the arrows to arrange the calculations.",
    "items": [
      "55 + 18",
      "100 - 42",
      "36 + 19"
    ],
    "correct": [
      "36 + 19",
      "100 - 42",
      "55 + 18"
    ],
    "explanation": "Work out or estimate each value, then compare."
  },
  {
    "id": "y2as-o6",
    "type": "order",
    "question": "Arrange from smallest answer to largest.",
    "instruction": "Use the arrows to arrange the calculations.",
    "items": [
      "72 - 39",
      "41 + 24",
      "88 - 31"
    ],
    "correct": [
      "72 - 39",
      "88 - 31",
      "41 + 24"
    ],
    "explanation": "Work out or estimate each value, then compare."
  },
  {
    "id": "y2as-d1",
    "type": "drag-drop",
    "question": "Drag the calculations from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "64 - 18",
      "25 + 39",
      "31 + 12"
    ],
    "correct": [
      "31 + 12",
      "64 - 18",
      "25 + 39"
    ],
    "explanation": "Compare the values of the calculations."
  },
  {
    "id": "y2as-d2",
    "type": "drag-drop",
    "question": "Drag the calculations from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "87 - 29",
      "48 + 27",
      "70 - 16"
    ],
    "correct": [
      "70 - 16",
      "87 - 29",
      "48 + 27"
    ],
    "explanation": "Compare the values of the calculations."
  },
  {
    "id": "y2as-d3",
    "type": "drag-drop",
    "question": "Drag the calculations from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "56 + 36",
      "95 - 41",
      "42 + 25"
    ],
    "correct": [
      "95 - 41",
      "42 + 25",
      "56 + 36"
    ],
    "explanation": "Compare the values of the calculations."
  },
  {
    "id": "y2as-d4",
    "type": "drag-drop",
    "question": "Drag the calculations from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "80 - 47",
      "29 + 26",
      "63 - 14"
    ],
    "correct": [
      "80 - 47",
      "63 - 14",
      "29 + 26"
    ],
    "explanation": "Compare the values of the calculations."
  },
  {
    "id": "y2as-d5",
    "type": "drag-drop",
    "question": "Drag the calculations from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "37 + 48",
      "90 - 26",
      "54 + 17"
    ],
    "correct": [
      "90 - 26",
      "54 + 17",
      "37 + 48"
    ],
    "explanation": "Compare the values of the calculations."
  },
  {
    "id": "y2as-d6",
    "type": "drag-drop",
    "question": "Drag the calculations from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "76 - 38",
      "33 + 28",
      "84 - 19"
    ],
    "correct": [
      "76 - 38",
      "33 + 28",
      "84 - 19"
    ],
    "explanation": "Compare the values of the calculations."
  }
];

  const STORAGE_KEY = "year2-add-sub-daily-used";
  const BEST_SCORE_KEY = "year2-add-sub-daily-best-score";

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function loadUsedIds() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set();
    }
  }

  function saveUsedIds(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {
      // Practice still works if storage is unavailable.
    }
  }

  function bucket(question) {
    if (question.type === "single") return "single";
    if (question.type === "true-false" || question.type === "multiple") return "alt-choice";
    if (question.type === "number") return "number";
    if (question.type === "text") return "text";
    if (question.type === "fill-blank") return "fill";
    if (question.type === "order") return "order";
    if (question.type === "drag-drop") return "drag";
    return "other";
  }

  const required = {
    "single": 2,
    "alt-choice": 1,
    "number": 1,
    "text": 1,
    "fill": 1,
    "order": 1,
    "drag": 1
  };

  function hasEnough(pool) {
    return Object.entries(required).every(([name, count]) =>
      pool.filter(item => bucket(item) === name).length >= count
    );
  }

  function selectEight() {
    let used = loadUsedIds();
    let available = bank.filter(item => !used.has(item.id));

    // A complete cycle is exactly 6 attempts. Reset only when the next
    // balanced set cannot be formed.
    if (available.length < 8 || !hasEnough(available)) {
      used = new Set();
      available = [...bank];
    }

    const selected = [];

    for (const [name, count] of Object.entries(required)) {
      const candidates = shuffle(
        available.filter(item => bucket(item) === name && !selected.includes(item))
      );
      selected.push(...candidates.slice(0, count));
    }

    const finalSet = shuffle(selected);

    finalSet.forEach(item => used.add(item.id));
    saveUsedIds(used);

    return finalSet;
  }

  const selected = selectEight();

  window.quizQuestions = selected;
  window.skillrActiveQuestions = selected;

  window.quizConfig = {
    ...(window.quizConfig || {}),
    shuffleQuestions: true,
    shuffleAnswers: false,
    maxQuestions: 8,
    caseSensitiveText: false,
    storageKey: BEST_SCORE_KEY
  };

  window.dailyPracticeBankSize = bank.length;
  window.dailyPracticeAttemptsPerCycle = 6;
})();
