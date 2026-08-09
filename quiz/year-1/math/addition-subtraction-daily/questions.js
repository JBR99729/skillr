"use strict";

/*
  Year 1 Addition & Subtraction to 20
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
    "id": "y1as-s1",
    "type": "single",
    "question": "7 + 5 = ?",
    "answers": [
      "10",
      "12",
      "13"
    ],
    "correct": 1,
    "explanation": "7 + 5 = 12."
  },
  {
    "id": "y1as-s2",
    "type": "single",
    "question": "14 - 6 = ?",
    "answers": [
      "8",
      "9",
      "10"
    ],
    "correct": 0,
    "explanation": "14 - 6 = 8."
  },
  {
    "id": "y1as-s3",
    "type": "single",
    "question": "Which number sentence makes 15?",
    "answers": [
      "9 + 6 = 15",
      "8 + 5 = 15",
      "17 - 1 = 15"
    ],
    "correct": 0,
    "explanation": "9 + 6 = 15."
  },
  {
    "id": "y1as-s4",
    "type": "single",
    "question": "Mia has 8 shells and finds 4 more. How many shells now?",
    "answers": [
      "10",
      "12",
      "14"
    ],
    "correct": 1,
    "explanation": "8 + 4 = 12."
  },
  {
    "id": "y1as-s5",
    "type": "single",
    "question": "There are 13 birds. 5 fly away. How many remain?",
    "answers": [
      "7",
      "8",
      "9"
    ],
    "correct": 1,
    "explanation": "13 - 5 = 8."
  },
  {
    "id": "y1as-s6",
    "type": "single",
    "question": "Which is a good way to work out 9 + 6?",
    "answers": [
      "Make 10, then add 5",
      "Take away 6",
      "Count backwards from 9"
    ],
    "correct": 0,
    "explanation": "9 + 6 can be found by making 10, then adding 5."
  },
  {
    "id": "y1as-s7",
    "type": "single",
    "question": "Which number is the missing part? 10 = 3 + ?",
    "answers": [
      "6",
      "7",
      "8"
    ],
    "correct": 1,
    "explanation": "3 + 7 = 10."
  },
  {
    "id": "y1as-s8",
    "type": "single",
    "question": "Which equation shows '12 take away 4'?",
    "answers": [
      "12 + 4 = 16",
      "12 - 4 = 8",
      "4 - 12 = 8"
    ],
    "correct": 1,
    "explanation": "12 - 4 = 8."
  },
  {
    "id": "y1as-s9",
    "type": "single",
    "question": "Which total is greater?",
    "answers": [
      "6 + 5",
      "7 + 2",
      "They are equal"
    ],
    "correct": 0,
    "explanation": "6 + 5 = 11 and 7 + 2 = 9."
  },
  {
    "id": "y1as-s10",
    "type": "single",
    "question": "Which difference is 6?",
    "answers": [
      "11 - 5",
      "12 - 4",
      "9 - 2"
    ],
    "correct": 0,
    "explanation": "11 - 5 = 6."
  },
  {
    "id": "y1as-s11",
    "type": "single",
    "question": "A box has 6 red pencils and 7 blue pencils. How many pencils altogether?",
    "answers": [
      "11",
      "12",
      "13"
    ],
    "correct": 2,
    "explanation": "6 + 7 = 13."
  },
  {
    "id": "y1as-s12",
    "type": "single",
    "question": "Sam had 18 stickers and gave away 9. How many are left?",
    "answers": [
      "8",
      "9",
      "10"
    ],
    "correct": 1,
    "explanation": "18 - 9 = 9."
  },
  {
    "id": "y1as-a1",
    "type": "true-false",
    "question": "10 + 7 = 17.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "10 + 7 = 17."
  },
  {
    "id": "y1as-a2",
    "type": "true-false",
    "question": "15 - 8 = 8.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "15 - 8 = 7."
  },
  {
    "id": "y1as-a3",
    "type": "true-false",
    "question": "6 + 6 and 8 + 4 have the same total.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Both totals are 12."
  },
  {
    "id": "y1as-a4",
    "type": "multiple",
    "question": "Select all number sentences that equal 10.",
    "answers": [
      "6 + 4",
      "7 + 2",
      "13 - 3",
      "5 + 5"
    ],
    "correct": [
      0,
      2,
      3
    ],
    "explanation": "6 + 4, 13 - 3 and 5 + 5 all equal 10."
  },
  {
    "id": "y1as-a5",
    "type": "multiple",
    "question": "Select all equations with an answer of 8.",
    "answers": [
      "3 + 5",
      "12 - 4",
      "7 + 2",
      "10 - 2"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "3 + 5, 12 - 4 and 10 - 2 equal 8."
  },
  {
    "id": "y1as-a6",
    "type": "multiple",
    "question": "Select all stories that use subtraction.",
    "answers": [
      "9 apples, eat 3",
      "5 blocks, get 4 more",
      "14 birds, 6 fly away",
      "7 pencils, buy 2 more"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "Eating or flying away means the amount decreases."
  },
  {
    "id": "y1as-n1",
    "type": "number",
    "question": "Work out 8 + 9.",
    "correct": 17,
    "explanation": "8 + 9 = 17."
  },
  {
    "id": "y1as-n2",
    "type": "number",
    "question": "Work out 16 - 7.",
    "correct": 9,
    "explanation": "16 - 7 = 9."
  },
  {
    "id": "y1as-n3",
    "type": "number",
    "question": "Work out 5 + 8.",
    "correct": 13,
    "explanation": "5 + 8 = 13."
  },
  {
    "id": "y1as-n4",
    "type": "number",
    "question": "Work out 19 - 6.",
    "correct": 13,
    "explanation": "19 - 6 = 13."
  },
  {
    "id": "y1as-n5",
    "type": "number",
    "question": "Work out 11 + 4.",
    "correct": 15,
    "explanation": "11 + 4 = 15."
  },
  {
    "id": "y1as-n6",
    "type": "number",
    "question": "Work out 20 - 8.",
    "correct": 12,
    "explanation": "20 - 8 = 12."
  },
  {
    "id": "y1as-t1",
    "type": "text",
    "question": "A story says '4 more join the group'. Type add or subtract.",
    "correct": "add",
    "acceptedAnswers": [
      "add",
      "addition"
    ],
    "explanation": "The group gets bigger, so we add."
  },
  {
    "id": "y1as-t2",
    "type": "text",
    "question": "A story says '3 are taken away'. Type add or subtract.",
    "correct": "subtract",
    "acceptedAnswers": [
      "subtract",
      "subtraction",
      "take away"
    ],
    "explanation": "The group gets smaller, so we subtract."
  },
  {
    "id": "y1as-t3",
    "type": "text",
    "question": "Type the word that means 'the same amount as'.",
    "correct": "equal",
    "acceptedAnswers": [
      "equal",
      "equals"
    ],
    "explanation": "Equal means the same amount."
  },
  {
    "id": "y1as-t4",
    "type": "text",
    "question": "Type the word for putting two groups together.",
    "correct": "add",
    "acceptedAnswers": [
      "add",
      "addition",
      "adding"
    ],
    "explanation": "Putting groups together is addition."
  },
  {
    "id": "y1as-t5",
    "type": "text",
    "question": "Type the words used when an amount is removed.",
    "correct": "take away",
    "acceptedAnswers": [
      "take away",
      "subtract",
      "subtraction"
    ],
    "explanation": "Removing an amount means take away or subtract."
  },
  {
    "id": "y1as-t6",
    "type": "text",
    "question": "Type the operation used in this story: '12 balloons, 5 pop'.",
    "correct": "subtract",
    "acceptedAnswers": [
      "subtract",
      "subtraction",
      "take away"
    ],
    "explanation": "Popping balloons reduces the number."
  },
  {
    "id": "y1as-f1",
    "type": "fill-blank",
    "question": "Complete the number sentence.",
    "template": "7 + {{blank}} = 12",
    "acceptedAnswers": [
      "5"
    ],
    "explanation": "7 + 5 = 12."
  },
  {
    "id": "y1as-f2",
    "type": "fill-blank",
    "question": "Complete the number sentence.",
    "template": "{{blank}} + 6 = 14",
    "acceptedAnswers": [
      "8"
    ],
    "explanation": "8 + 6 = 14."
  },
  {
    "id": "y1as-f3",
    "type": "fill-blank",
    "question": "Complete the number sentence.",
    "template": "15 - {{blank}} = 9",
    "acceptedAnswers": [
      "6"
    ],
    "explanation": "15 - 6 = 9."
  },
  {
    "id": "y1as-f4",
    "type": "fill-blank",
    "question": "Complete the number sentence.",
    "template": "{{blank}} - 4 = 10",
    "acceptedAnswers": [
      "14"
    ],
    "explanation": "14 - 4 = 10."
  },
  {
    "id": "y1as-f5",
    "type": "fill-blank",
    "question": "Complete the fact family.",
    "template": "9 + 4 = {{blank}}",
    "acceptedAnswers": [
      "13"
    ],
    "explanation": "9 + 4 = 13."
  },
  {
    "id": "y1as-f6",
    "type": "fill-blank",
    "question": "Complete the subtraction fact.",
    "template": "18 - 9 = {{blank}}",
    "acceptedAnswers": [
      "9"
    ],
    "explanation": "18 - 9 = 9."
  },
  {
    "id": "y1as-o1",
    "type": "order",
    "question": "Arrange the sums from smallest answer to largest.",
    "instruction": "Use the arrows to put them in order.",
    "items": [
      "2 + 3",
      "4 + 3",
      "5 + 4"
    ],
    "correct": [
      "2 + 3",
      "4 + 3",
      "5 + 4"
    ],
    "explanation": "Compare the answers to each number sentence."
  },
  {
    "id": "y1as-o2",
    "type": "order",
    "question": "Arrange the differences from smallest answer to largest.",
    "instruction": "Use the arrows to put them in order.",
    "items": [
      "12 - 8",
      "10 - 3",
      "9 - 1"
    ],
    "correct": [
      "12 - 8",
      "10 - 3",
      "9 - 1"
    ],
    "explanation": "Compare the answers to each number sentence."
  },
  {
    "id": "y1as-o3",
    "type": "order",
    "question": "Arrange the sums from smallest answer to largest.",
    "instruction": "Use the arrows to put them in order.",
    "items": [
      "6 + 6",
      "8 + 1",
      "5 + 2"
    ],
    "correct": [
      "5 + 2",
      "8 + 1",
      "6 + 6"
    ],
    "explanation": "Compare the answers to each number sentence."
  },
  {
    "id": "y1as-o4",
    "type": "order",
    "question": "Arrange the differences from smallest answer to largest.",
    "instruction": "Use the arrows to put them in order.",
    "items": [
      "14 - 4",
      "13 - 6",
      "11 - 9"
    ],
    "correct": [
      "11 - 9",
      "13 - 6",
      "14 - 4"
    ],
    "explanation": "Compare the answers to each number sentence."
  },
  {
    "id": "y1as-o5",
    "type": "order",
    "question": "Arrange the sums from smallest answer to largest.",
    "instruction": "Use the arrows to put them in order.",
    "items": [
      "3 + 4",
      "5 + 5",
      "9 + 4"
    ],
    "correct": [
      "3 + 4",
      "5 + 5",
      "9 + 4"
    ],
    "explanation": "Compare the answers to each number sentence."
  },
  {
    "id": "y1as-o6",
    "type": "order",
    "question": "Arrange the differences from smallest answer to largest.",
    "instruction": "Use the arrows to put them in order.",
    "items": [
      "18 - 3",
      "16 - 8",
      "12 - 7"
    ],
    "correct": [
      "12 - 7",
      "16 - 8",
      "18 - 3"
    ],
    "explanation": "Compare the answers to each number sentence."
  },
  {
    "id": "y1as-d1",
    "type": "drag-drop",
    "question": "Drag the number sentences from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "20 - 2",
      "7 + 4",
      "3 + 5"
    ],
    "correct": [
      "3 + 5",
      "7 + 4",
      "20 - 2"
    ],
    "explanation": "Compare the value of each number sentence."
  },
  {
    "id": "y1as-d2",
    "type": "drag-drop",
    "question": "Drag the number sentences from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "6 + 8",
      "17 - 5",
      "4 + 5"
    ],
    "correct": [
      "4 + 5",
      "17 - 5",
      "6 + 8"
    ],
    "explanation": "Compare the value of each number sentence."
  },
  {
    "id": "y1as-d3",
    "type": "drag-drop",
    "question": "Drag the number sentences from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "13 - 9",
      "5 + 4",
      "8 + 6"
    ],
    "correct": [
      "13 - 9",
      "5 + 4",
      "8 + 6"
    ],
    "explanation": "Compare the value of each number sentence."
  },
  {
    "id": "y1as-d4",
    "type": "drag-drop",
    "question": "Drag the number sentences from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "10 + 7",
      "15 - 4",
      "3 + 6"
    ],
    "correct": [
      "3 + 6",
      "15 - 4",
      "10 + 7"
    ],
    "explanation": "Compare the value of each number sentence."
  },
  {
    "id": "y1as-d5",
    "type": "drag-drop",
    "question": "Drag the number sentences from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "19 - 10",
      "6 + 6",
      "9 + 7"
    ],
    "correct": [
      "19 - 10",
      "6 + 6",
      "9 + 7"
    ],
    "explanation": "Compare the value of each number sentence."
  },
  {
    "id": "y1as-d6",
    "type": "drag-drop",
    "question": "Drag the number sentences from smallest answer to largest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "11 - 8",
      "7 + 1",
      "10 + 5"
    ],
    "correct": [
      "11 - 8",
      "7 + 1",
      "10 + 5"
    ],
    "explanation": "Compare the value of each number sentence."
  }
];

  const STORAGE_KEY = "year1-add-sub-daily-used";
  const BEST_SCORE_KEY = "year1-add-sub-daily-best-score";

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
