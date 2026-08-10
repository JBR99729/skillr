"use strict";

/*
  Year 1 Measurement Comparison
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
    "id": "y1m-s1",
    "type": "single",
    "question": "Which word describes the object with the greatest length?",
    "answers": [
      "longest",
      "heaviest",
      "fullest"
    ],
    "correct": 0,
    "explanation": "Longest describes greatest length."
  },
  {
    "id": "y1m-s2",
    "type": "single",
    "question": "Which word compares mass?",
    "answers": [
      "heavier",
      "longer",
      "faster"
    ],
    "correct": 0,
    "explanation": "Heavier compares mass."
  },
  {
    "id": "y1m-s3",
    "type": "single",
    "question": "Which container has greater capacity?",
    "answers": [
      "the one that holds more",
      "the taller one every time",
      "the lightest one"
    ],
    "correct": 0,
    "explanation": "Capacity is how much a container can hold."
  },
  {
    "id": "y1m-s4",
    "type": "single",
    "question": "Which event has the longer duration?",
    "answers": [
      "an event that takes more time",
      "an event that uses more water",
      "an event with more objects"
    ],
    "correct": 0,
    "explanation": "Duration is how long an event takes."
  },
  {
    "id": "y1m-s5",
    "type": "single",
    "question": "To compare two pencils fairly, what should you do?",
    "answers": [
      "line up one end",
      "start one higher",
      "bend one pencil"
    ],
    "correct": 0,
    "explanation": "Line up one end for a fair comparison."
  },
  {
    "id": "y1m-s6",
    "type": "single",
    "question": "Which is a good informal unit for measuring a desk?",
    "answers": [
      "same-sized blocks",
      "different-sized toys",
      "handfuls of water"
    ],
    "correct": 0,
    "explanation": "Uniform same-sized units make a fair measure."
  },
  {
    "id": "y1m-s7",
    "type": "single",
    "question": "A ribbon covers 8 equal blocks. Another covers 5. Which is longer?",
    "answers": [
      "8-block ribbon",
      "5-block ribbon",
      "same length"
    ],
    "correct": 0,
    "explanation": "8 equal blocks is longer than 5."
  },
  {
    "id": "y1m-s8",
    "type": "single",
    "question": "Which sentence is about capacity?",
    "answers": [
      "This jug holds more water.",
      "This bag is heavier.",
      "This race takes longer."
    ],
    "correct": 0,
    "explanation": "Holding more water describes capacity."
  },
  {
    "id": "y1m-s9",
    "type": "single",
    "question": "Which sentence is about duration?",
    "answers": [
      "Lunch takes longer than recess.",
      "The bottle is fuller.",
      "The pencil is shorter."
    ],
    "correct": 0,
    "explanation": "Duration is time taken."
  },
  {
    "id": "y1m-s10",
    "type": "single",
    "question": "Which sentence is about mass?",
    "answers": [
      "The book is heavier than the card.",
      "The book is longer than the card.",
      "The book holds more."
    ],
    "correct": 0,
    "explanation": "Heavier compares mass."
  },
  {
    "id": "y1m-s11",
    "type": "single",
    "question": "If two strings start at the same point and one ends farther away, it is...",
    "answers": [
      "longer",
      "lighter",
      "shorter"
    ],
    "correct": 0,
    "explanation": "The string reaching farther is longer."
  },
  {
    "id": "y1m-s12",
    "type": "single",
    "question": "Why should informal units be the same size?",
    "answers": [
      "to make the measurement fair",
      "to make the object heavier",
      "to change its length"
    ],
    "correct": 0,
    "explanation": "Same-sized units give a fair comparison."
  },
  {
    "id": "y1m-a1",
    "type": "true-false",
    "question": "A heavier object always has to be longer.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "Length and mass are different attributes."
  },
  {
    "id": "y1m-a2",
    "type": "true-false",
    "question": "A container with greater capacity can hold more.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Greater capacity means it can hold more."
  },
  {
    "id": "y1m-a3",
    "type": "true-false",
    "question": "Using equal-sized blocks helps make length measurements fair.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Uniform units support fair comparison."
  },
  {
    "id": "y1m-a4",
    "type": "multiple",
    "question": "Select all words that can describe length.",
    "answers": [
      "long",
      "short",
      "heavy",
      "tall"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Long, short and tall describe length."
  },
  {
    "id": "y1m-a5",
    "type": "multiple",
    "question": "Select all words that can describe duration.",
    "answers": [
      "longer time",
      "shorter time",
      "heavier",
      "quick"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Duration describes how long something takes."
  },
  {
    "id": "y1m-a6",
    "type": "multiple",
    "question": "Select all fair ways to compare two objects' length.",
    "answers": [
      "line up one end",
      "use equal-sized units",
      "start one object halfway along the other",
      "place units with no big gaps"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Fair comparison uses aligned starts and consistent units."
  },
  {
    "id": "y1m-n1",
    "type": "number",
    "question": "A pencil is 7 equal blocks long. Enter the number of blocks.",
    "correct": 7,
    "explanation": "The measurement is 7 informal units."
  },
  {
    "id": "y1m-n2",
    "type": "number",
    "question": "A book is 9 cubes long. Enter its length in cubes.",
    "correct": 9,
    "explanation": "The measurement is 9 informal units."
  },
  {
    "id": "y1m-n3",
    "type": "number",
    "question": "A ribbon is 12 counters long. Enter the number of counters.",
    "correct": 12,
    "explanation": "The measurement is 12 informal units."
  },
  {
    "id": "y1m-n4",
    "type": "number",
    "question": "A toy road is 10 same-sized tiles long. Enter the number.",
    "correct": 10,
    "explanation": "The measurement is 10 informal units."
  },
  {
    "id": "y1m-n5",
    "type": "number",
    "question": "A string reaches across 6 equal blocks. Enter the number.",
    "correct": 6,
    "explanation": "The measurement is 6 informal units."
  },
  {
    "id": "y1m-n6",
    "type": "number",
    "question": "A table edge measures 15 same-sized craft sticks. Enter the number.",
    "correct": 15,
    "explanation": "The measurement is 15 informal units."
  },
  {
    "id": "y1m-t1",
    "type": "text",
    "question": "Type the word for an object with more mass.",
    "correct": "heavier",
    "acceptedAnswers": [
      "heavier",
      "heavy"
    ],
    "explanation": "Heavier means it has more mass."
  },
  {
    "id": "y1m-t2",
    "type": "text",
    "question": "Type the word for an object with less mass.",
    "correct": "lighter",
    "acceptedAnswers": [
      "lighter",
      "light"
    ],
    "explanation": "Lighter means it has less mass."
  },
  {
    "id": "y1m-t3",
    "type": "text",
    "question": "Type the word for a container that can hold more.",
    "correct": "greater capacity",
    "acceptedAnswers": [
      "greater capacity",
      "more capacity",
      "holds more"
    ],
    "explanation": "A container that holds more has greater capacity."
  },
  {
    "id": "y1m-t4",
    "type": "text",
    "question": "Type the word for an event that takes more time.",
    "correct": "longer",
    "acceptedAnswers": [
      "longer",
      "longer duration"
    ],
    "explanation": "An event that takes more time has a longer duration."
  },
  {
    "id": "y1m-t5",
    "type": "text",
    "question": "Type the word for the object that has less length.",
    "correct": "shorter",
    "acceptedAnswers": [
      "shorter",
      "short"
    ],
    "explanation": "Shorter means less length."
  },
  {
    "id": "y1m-t6",
    "type": "text",
    "question": "Type the measurement word for how much a container can hold.",
    "correct": "capacity",
    "acceptedAnswers": [
      "capacity"
    ],
    "explanation": "Capacity describes how much a container can hold."
  },
  {
    "id": "y1m-f1",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "A rope measuring 9 blocks is {{blank}} than one measuring 6 blocks.",
    "acceptedAnswers": [
      "longer"
    ],
    "explanation": "9 blocks is longer than 6 blocks."
  },
  {
    "id": "y1m-f2",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "A bag with less mass is {{blank}}.",
    "acceptedAnswers": [
      "lighter"
    ],
    "explanation": "Less mass means lighter."
  },
  {
    "id": "y1m-f3",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "The amount a container can hold is its {{blank}}.",
    "acceptedAnswers": [
      "capacity"
    ],
    "explanation": "Capacity is how much a container can hold."
  },
  {
    "id": "y1m-f4",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "How long an event takes is its {{blank}}.",
    "acceptedAnswers": [
      "duration"
    ],
    "explanation": "Duration means how long an event takes."
  },
  {
    "id": "y1m-f5",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "A 5-block pencil is {{blank}} than an 8-block pencil.",
    "acceptedAnswers": [
      "shorter"
    ],
    "explanation": "5 blocks is shorter than 8 blocks."
  },
  {
    "id": "y1m-f6",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "For a fair measurement, use {{blank}}-sized informal units.",
    "acceptedAnswers": [
      "same",
      "equal"
    ],
    "explanation": "Uniform units should be the same size."
  },
  {
    "id": "y1m-o1",
    "type": "order",
    "question": "Arrange the lengths from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "4 blocks",
      "7 blocks",
      "10 blocks"
    ],
    "correct": [
      "4 blocks",
      "7 blocks",
      "10 blocks"
    ],
    "explanation": "Compare the numbers because the same unit is used."
  },
  {
    "id": "y1m-o2",
    "type": "order",
    "question": "Arrange the lengths from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "12 cubes",
      "5 cubes",
      "8 cubes"
    ],
    "correct": [
      "5 cubes",
      "8 cubes",
      "12 cubes"
    ],
    "explanation": "Compare the numbers because the same unit is used."
  },
  {
    "id": "y1m-o3",
    "type": "order",
    "question": "Arrange the durations from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "2 minutes",
      "6 minutes",
      "4 minutes"
    ],
    "correct": [
      "2 minutes",
      "4 minutes",
      "6 minutes"
    ],
    "explanation": "Compare the numbers because the same unit is used."
  },
  {
    "id": "y1m-o4",
    "type": "order",
    "question": "Arrange the capacities from least to greatest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "3 scoops",
      "9 scoops",
      "6 scoops"
    ],
    "correct": [
      "3 scoops",
      "6 scoops",
      "9 scoops"
    ],
    "explanation": "Compare the numbers because the same unit is used."
  },
  {
    "id": "y1m-o5",
    "type": "order",
    "question": "Arrange the lengths from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "11 blocks",
      "6 blocks",
      "9 blocks"
    ],
    "correct": [
      "6 blocks",
      "9 blocks",
      "11 blocks"
    ],
    "explanation": "Compare the numbers because the same unit is used."
  },
  {
    "id": "y1m-o6",
    "type": "order",
    "question": "Arrange the durations from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "1 minute",
      "5 minutes",
      "3 minutes"
    ],
    "correct": [
      "1 minute",
      "3 minutes",
      "5 minutes"
    ],
    "explanation": "Compare the numbers because the same unit is used."
  },
  {
    "id": "y1m-d1",
    "type": "drag-drop",
    "question": "Drag from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "8 blocks",
      "3 blocks",
      "6 blocks"
    ],
    "correct": [
      "3 blocks",
      "6 blocks",
      "8 blocks"
    ],
    "explanation": "Compare measurements that use the same informal unit."
  },
  {
    "id": "y1m-d2",
    "type": "drag-drop",
    "question": "Drag the capacities from least to greatest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "7 scoops",
      "10 scoops",
      "4 scoops"
    ],
    "correct": [
      "4 scoops",
      "7 scoops",
      "10 scoops"
    ],
    "explanation": "Compare measurements that use the same informal unit."
  },
  {
    "id": "y1m-d3",
    "type": "drag-drop",
    "question": "Drag the durations from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "9 minutes",
      "2 minutes",
      "5 minutes"
    ],
    "correct": [
      "2 minutes",
      "5 minutes",
      "9 minutes"
    ],
    "explanation": "Compare measurements that use the same informal unit."
  },
  {
    "id": "y1m-d4",
    "type": "drag-drop",
    "question": "Drag the lengths from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "13 cubes",
      "8 cubes",
      "11 cubes"
    ],
    "correct": [
      "8 cubes",
      "11 cubes",
      "13 cubes"
    ],
    "explanation": "Compare measurements that use the same informal unit."
  },
  {
    "id": "y1m-d5",
    "type": "drag-drop",
    "question": "Drag the capacities from least to greatest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "6 cups",
      "2 cups",
      "5 cups"
    ],
    "correct": [
      "2 cups",
      "5 cups",
      "6 cups"
    ],
    "explanation": "Compare measurements that use the same informal unit."
  },
  {
    "id": "y1m-d6",
    "type": "drag-drop",
    "question": "Drag the durations from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "4 minutes",
      "7 minutes",
      "1 minute"
    ],
    "correct": [
      "1 minute",
      "4 minutes",
      "7 minutes"
    ],
    "explanation": "Compare measurements that use the same informal unit."
  }
];

  const STORAGE_KEY = "year1-measurement-daily-used";
  const BEST_SCORE_KEY = "year1-measurement-daily-best-score";

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

  window.skillrWorksheetQuestions = bank;

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
