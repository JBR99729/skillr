"use strict";

/*
  Year 2 Measurement Comparison
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
    "id": "y2m-s1",
    "type": "single",
    "question": "Why must informal units be uniform?",
    "answers": [
      "so each unit represents the same amount",
      "so there are more gaps",
      "so the object becomes longer"
    ],
    "correct": 0,
    "explanation": "Uniform units support consistent measurement."
  },
  {
    "id": "y2m-s2",
    "type": "single",
    "question": "What should you avoid when placing units along a length?",
    "answers": [
      "gaps and overlaps",
      "touching end to end",
      "using the same unit"
    ],
    "correct": 0,
    "explanation": "Units should be placed end to end without gaps or overlaps."
  },
  {
    "id": "y2m-s3",
    "type": "single",
    "question": "Which unit would give a more accurate measure of a pencil?",
    "answers": [
      "small equal counters",
      "large books",
      "different-sized blocks"
    ],
    "correct": 0,
    "explanation": "Smaller uniform units can give a more precise measure."
  },
  {
    "id": "y2m-s4",
    "type": "single",
    "question": "A desk is 12 blocks long. A shelf is 15 of the same blocks long. Which is longer?",
    "answers": [
      "shelf",
      "desk",
      "same"
    ],
    "correct": 0,
    "explanation": "15 blocks is longer than 12."
  },
  {
    "id": "y2m-s5",
    "type": "single",
    "question": "Which attribute should you measure to decide which container holds more?",
    "answers": [
      "capacity",
      "mass",
      "duration"
    ],
    "correct": 0,
    "explanation": "Capacity describes how much a container can hold."
  },
  {
    "id": "y2m-s6",
    "type": "single",
    "question": "Which attribute should you compare to decide which parcel is heavier?",
    "answers": [
      "mass",
      "length",
      "duration"
    ],
    "correct": 0,
    "explanation": "Mass is compared with heavier and lighter."
  },
  {
    "id": "y2m-s7",
    "type": "single",
    "question": "Which is the fairest way to measure a table with craft sticks?",
    "answers": [
      "same sticks end to end",
      "different sticks with gaps",
      "overlap the sticks"
    ],
    "correct": 0,
    "explanation": "Use uniform units end to end."
  },
  {
    "id": "y2m-s8",
    "type": "single",
    "question": "Why might 20 small blocks measure the same length as 10 larger blocks?",
    "answers": [
      "the units are different sizes",
      "the object changed length",
      "20 is always smaller than 10"
    ],
    "correct": 0,
    "explanation": "Different unit sizes produce different counts."
  },
  {
    "id": "y2m-s9",
    "type": "single",
    "question": "Which sentence correctly compares duration?",
    "answers": [
      "The task taking 12 minutes lasts longer than one taking 8 minutes.",
      "The task taking 8 minutes is heavier.",
      "Duration tells how much a jug holds."
    ],
    "correct": 0,
    "explanation": "12 minutes is a longer duration."
  },
  {
    "id": "y2m-s10",
    "type": "single",
    "question": "If you change to smaller equal units, what usually happens to the number of units?",
    "answers": [
      "more units are needed",
      "fewer are always needed",
      "the length changes"
    ],
    "correct": 0,
    "explanation": "Smaller units usually require a larger count."
  },
  {
    "id": "y2m-s11",
    "type": "single",
    "question": "Which is best for measuring the length of a book informally?",
    "answers": [
      "same-sized paper clips",
      "cups of water",
      "different toy cars"
    ],
    "correct": 0,
    "explanation": "Paper clips can be used as uniform informal length units."
  },
  {
    "id": "y2m-s12",
    "type": "single",
    "question": "A container holds 9 equal scoops and another holds 13. Which has greater capacity?",
    "answers": [
      "13-scoop container",
      "9-scoop container",
      "same"
    ],
    "correct": 0,
    "explanation": "13 equal scoops indicates greater capacity."
  },
  {
    "id": "y2m-a1",
    "type": "true-false",
    "question": "Units can overlap and still give a fair informal measurement.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "Overlaps make the measurement inconsistent."
  },
  {
    "id": "y2m-a2",
    "type": "true-false",
    "question": "Smaller uniform units can help make a measurement more precise.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Smaller units can reduce rounding."
  },
  {
    "id": "y2m-a3",
    "type": "true-false",
    "question": "If the unit changes size, the number of units may change even though the object does not.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "The count depends on unit size."
  },
  {
    "id": "y2m-a4",
    "type": "multiple",
    "question": "Select all features of a fair informal measurement.",
    "answers": [
      "same-sized units",
      "no gaps",
      "no overlaps",
      "random starting points"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "Use uniform units end to end without gaps or overlaps."
  },
  {
    "id": "y2m-a5",
    "type": "multiple",
    "question": "Select all attributes that can be compared in Year 2 measurement.",
    "answers": [
      "length",
      "mass",
      "capacity",
      "duration"
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "explanation": "All four are measurement attributes."
  },
  {
    "id": "y2m-a6",
    "type": "multiple",
    "question": "Select all good reasons to use smaller units.",
    "answers": [
      "greater precision",
      "fit along short objects more neatly",
      "make the object longer",
      "reduce large leftover spaces"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Smaller units can improve precision and fit."
  },
  {
    "id": "y2m-n1",
    "type": "number",
    "question": "A ribbon measures 18 equal counters. Enter the measurement.",
    "correct": 18,
    "explanation": "The stated measurement is 18 informal units."
  },
  {
    "id": "y2m-n2",
    "type": "number",
    "question": "A desk measures 14 equal blocks. Enter the measurement.",
    "correct": 14,
    "explanation": "The stated measurement is 14 informal units."
  },
  {
    "id": "y2m-n3",
    "type": "number",
    "question": "A container holds 11 equal scoops. Enter its capacity in scoops.",
    "correct": 11,
    "explanation": "The stated measurement is 11 informal units."
  },
  {
    "id": "y2m-n4",
    "type": "number",
    "question": "A pathway measures 24 equal tiles. Enter the measurement.",
    "correct": 24,
    "explanation": "The stated measurement is 24 informal units."
  },
  {
    "id": "y2m-n5",
    "type": "number",
    "question": "A shelf measures 16 equal craft sticks. Enter the measurement.",
    "correct": 16,
    "explanation": "The stated measurement is 16 informal units."
  },
  {
    "id": "y2m-n6",
    "type": "number",
    "question": "A container holds 20 equal cups. Enter the measurement.",
    "correct": 20,
    "explanation": "The stated measurement is 20 informal units."
  },
  {
    "id": "y2m-t1",
    "type": "text",
    "question": "Type the word meaning 'all measurement units are the same size'.",
    "correct": "uniform",
    "acceptedAnswers": [
      "uniform",
      "same size",
      "equal size"
    ],
    "explanation": "Uniform units are the same size."
  },
  {
    "id": "y2m-t2",
    "type": "text",
    "question": "Type the word for empty spaces left between measuring units.",
    "correct": "gaps",
    "acceptedAnswers": [
      "gaps",
      "gap"
    ],
    "explanation": "Gaps should be avoided."
  },
  {
    "id": "y2m-t3",
    "type": "text",
    "question": "Type the word for units lying partly on top of one another.",
    "correct": "overlaps",
    "acceptedAnswers": [
      "overlaps",
      "overlap"
    ],
    "explanation": "Overlaps make the count inaccurate."
  },
  {
    "id": "y2m-t4",
    "type": "text",
    "question": "Type the attribute that tells how much a container can hold.",
    "correct": "capacity",
    "acceptedAnswers": [
      "capacity"
    ],
    "explanation": "Capacity describes how much can be held."
  },
  {
    "id": "y2m-t5",
    "type": "text",
    "question": "Type the attribute that tells how long an event takes.",
    "correct": "duration",
    "acceptedAnswers": [
      "duration"
    ],
    "explanation": "Duration describes time taken."
  },
  {
    "id": "y2m-t6",
    "type": "text",
    "question": "Type the attribute used to compare heavier and lighter objects.",
    "correct": "mass",
    "acceptedAnswers": [
      "mass"
    ],
    "explanation": "Mass is compared using heavier and lighter."
  },
  {
    "id": "y2m-f1",
    "type": "fill-blank",
    "question": "Complete the rule.",
    "template": "Place uniform units end to end with no {{blank}}.",
    "acceptedAnswers": [
      "gaps"
    ],
    "explanation": "There should be no gaps."
  },
  {
    "id": "y2m-f2",
    "type": "fill-blank",
    "question": "Complete the rule.",
    "template": "Do not let measurement units {{blank}}.",
    "acceptedAnswers": [
      "overlap",
      "overlaps"
    ],
    "explanation": "Overlapping units distort the measurement."
  },
  {
    "id": "y2m-f3",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "Using {{blank}} units can give a more precise measure.",
    "acceptedAnswers": [
      "smaller",
      "small"
    ],
    "explanation": "Smaller units can improve precision."
  },
  {
    "id": "y2m-f4",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "The amount a container holds is its {{blank}}.",
    "acceptedAnswers": [
      "capacity"
    ],
    "explanation": "Capacity is how much it holds."
  },
  {
    "id": "y2m-f5",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "The time taken by an event is its {{blank}}.",
    "acceptedAnswers": [
      "duration"
    ],
    "explanation": "Duration is time taken."
  },
  {
    "id": "y2m-f6",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "17 equal blocks is {{blank}} than 12 of the same blocks.",
    "acceptedAnswers": [
      "longer",
      "greater"
    ],
    "explanation": "17 same-sized blocks is a greater length than 12."
  },
  {
    "id": "y2m-o1",
    "type": "order",
    "question": "Arrange the lengths from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "7 blocks",
      "13 blocks",
      "19 blocks"
    ],
    "correct": [
      "7 blocks",
      "13 blocks",
      "19 blocks"
    ],
    "explanation": "Because the same unit is used, compare the numbers."
  },
  {
    "id": "y2m-o2",
    "type": "order",
    "question": "Arrange capacities from least to greatest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "16 scoops",
      "9 scoops",
      "12 scoops"
    ],
    "correct": [
      "9 scoops",
      "12 scoops",
      "16 scoops"
    ],
    "explanation": "Because the same unit is used, compare the numbers."
  },
  {
    "id": "y2m-o3",
    "type": "order",
    "question": "Arrange durations from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "18 minutes",
      "6 minutes",
      "11 minutes"
    ],
    "correct": [
      "6 minutes",
      "11 minutes",
      "18 minutes"
    ],
    "explanation": "Because the same unit is used, compare the numbers."
  },
  {
    "id": "y2m-o4",
    "type": "order",
    "question": "Arrange lengths from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "22 tiles",
      "15 tiles",
      "20 tiles"
    ],
    "correct": [
      "15 tiles",
      "20 tiles",
      "22 tiles"
    ],
    "explanation": "Because the same unit is used, compare the numbers."
  },
  {
    "id": "y2m-o5",
    "type": "order",
    "question": "Arrange capacities from least to greatest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "14 scoops",
      "21 scoops",
      "17 scoops"
    ],
    "correct": [
      "14 scoops",
      "17 scoops",
      "21 scoops"
    ],
    "explanation": "Because the same unit is used, compare the numbers."
  },
  {
    "id": "y2m-o6",
    "type": "order",
    "question": "Arrange durations from shortest to longest.",
    "instruction": "Use the arrows to arrange the measurements.",
    "items": [
      "9 minutes",
      "15 minutes",
      "12 minutes"
    ],
    "correct": [
      "9 minutes",
      "12 minutes",
      "15 minutes"
    ],
    "explanation": "Because the same unit is used, compare the numbers."
  },
  {
    "id": "y2m-d1",
    "type": "drag-drop",
    "question": "Drag the lengths from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "8 counters",
      "17 counters",
      "12 counters"
    ],
    "correct": [
      "8 counters",
      "12 counters",
      "17 counters"
    ],
    "explanation": "Compare the values because the units match."
  },
  {
    "id": "y2m-d2",
    "type": "drag-drop",
    "question": "Drag capacities from least to greatest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "20 scoops",
      "13 scoops",
      "16 scoops"
    ],
    "correct": [
      "13 scoops",
      "16 scoops",
      "20 scoops"
    ],
    "explanation": "Compare the values because the units match."
  },
  {
    "id": "y2m-d3",
    "type": "drag-drop",
    "question": "Drag durations from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "7 minutes",
      "19 minutes",
      "14 minutes"
    ],
    "correct": [
      "7 minutes",
      "14 minutes",
      "19 minutes"
    ],
    "explanation": "Compare the values because the units match."
  },
  {
    "id": "y2m-d4",
    "type": "drag-drop",
    "question": "Drag lengths from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "25 blocks",
      "18 blocks",
      "21 blocks"
    ],
    "correct": [
      "18 blocks",
      "21 blocks",
      "25 blocks"
    ],
    "explanation": "Compare the values because the units match."
  },
  {
    "id": "y2m-d5",
    "type": "drag-drop",
    "question": "Drag capacities from least to greatest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "11 cups",
      "18 cups",
      "15 cups"
    ],
    "correct": [
      "11 cups",
      "15 cups",
      "18 cups"
    ],
    "explanation": "Compare the values because the units match."
  },
  {
    "id": "y2m-d6",
    "type": "drag-drop",
    "question": "Drag durations from shortest to longest.",
    "instruction": "Drag the items into the correct order. Use the arrows on touchscreens.",
    "items": [
      "13 minutes",
      "8 minutes",
      "10 minutes"
    ],
    "correct": [
      "8 minutes",
      "10 minutes",
      "13 minutes"
    ],
    "explanation": "Compare the values because the units match."
  }
];

  const STORAGE_KEY = "year2-measurement-daily-used";
  const BEST_SCORE_KEY = "year2-measurement-daily-best-score";

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
