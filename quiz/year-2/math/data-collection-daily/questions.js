"use strict";

/*
  Year 2 Data Collection & Organisation
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
    "id": "y2d-s1",
    "type": "single",
    "question": "Which method is best for finding classmates' favourite playground area?",
    "answers": [
      "survey",
      "measure length",
      "weigh objects"
    ],
    "correct": 0,
    "explanation": "A survey collects category choices."
  },
  {
    "id": "y2d-s2",
    "type": "single",
    "question": "Which method could collect data about birds visiting a garden?",
    "answers": [
      "observation",
      "subtraction",
      "measuring mass"
    ],
    "correct": 0,
    "explanation": "Observation records what is seen."
  },
  {
    "id": "y2d-s3",
    "type": "single",
    "question": "Which is an example of an experiment for categorical data?",
    "answers": [
      "test which material absorbs water best and record the category",
      "ask everyone's birthday",
      "measure one desk"
    ],
    "correct": 0,
    "explanation": "An experiment can produce category results."
  },
  {
    "id": "y2d-s4",
    "type": "single",
    "question": "Why sort survey answers into categories?",
    "answers": [
      "to organise and compare them",
      "to change the responses",
      "to make every count equal"
    ],
    "correct": 0,
    "explanation": "Categories organise data."
  },
  {
    "id": "y2d-s5",
    "type": "single",
    "question": "Which is a useful way to display categorical data in Year 2?",
    "answers": [
      "table",
      "number sentence only",
      "ruler"
    ],
    "correct": 0,
    "explanation": "A table can organise categorical data."
  },
  {
    "id": "y2d-s6",
    "type": "single",
    "question": "A table shows soccer 12, basketball 8, tennis 5. Which is most popular?",
    "answers": [
      "soccer",
      "basketball",
      "tennis"
    ],
    "correct": 0,
    "explanation": "12 is the largest frequency."
  },
  {
    "id": "y2d-s7",
    "type": "single",
    "question": "Which question is suitable for a categorical survey?",
    "answers": [
      "How do you travel to school?",
      "How tall are you in centimetres?",
      "What is 24 + 18?"
    ],
    "correct": 0,
    "explanation": "Travel mode gives categories."
  },
  {
    "id": "y2d-s8",
    "type": "single",
    "question": "What should a table heading tell the reader?",
    "answers": [
      "what the column or category represents",
      "the answer to every question",
      "the length of the paper"
    ],
    "correct": 0,
    "explanation": "Headings explain the data."
  },
  {
    "id": "y2d-s9",
    "type": "single",
    "question": "Which digital tool could help collect survey responses?",
    "answers": [
      "online form",
      "calculator only",
      "stopwatch only"
    ],
    "correct": 0,
    "explanation": "An online form can collect categorical responses."
  },
  {
    "id": "y2d-s10",
    "type": "single",
    "question": "A table has red 7, blue 7, green 3. What is true?",
    "answers": [
      "red and blue have equal frequency",
      "green is greatest",
      "all are equal"
    ],
    "correct": 0,
    "explanation": "Red and blue both have 7."
  },
  {
    "id": "y2d-s11",
    "type": "single",
    "question": "Which data source involves watching what happens?",
    "answers": [
      "observation",
      "survey question",
      "number fact"
    ],
    "correct": 0,
    "explanation": "Observation means watching and recording."
  },
  {
    "id": "y2d-s12",
    "type": "single",
    "question": "Before collecting data, what should you decide?",
    "answers": [
      "the question and categories",
      "the final result",
      "which category must win"
    ],
    "correct": 0,
    "explanation": "Plan the purpose and categories first."
  },
  {
    "id": "y2d-a1",
    "type": "true-false",
    "question": "A survey can be used to collect categorical data.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Surveys can collect category choices."
  },
  {
    "id": "y2d-a2",
    "type": "true-false",
    "question": "Observation means guessing what probably happened.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "Observation means watching and recording."
  },
  {
    "id": "y2d-a3",
    "type": "true-false",
    "question": "Tables can organise categories and frequencies.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Tables are useful for organising categorical data."
  },
  {
    "id": "y2d-a4",
    "type": "multiple",
    "question": "Select all ways Year 2 students can acquire categorical data.",
    "answers": [
      "survey",
      "observation",
      "experiment",
      "random guess"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "Survey, observation and experiment are valid methods."
  },
  {
    "id": "y2d-a5",
    "type": "multiple",
    "question": "Select all useful features of a data table.",
    "answers": [
      "clear headings",
      "categories",
      "frequencies",
      "unrelated decoration only"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "Headings, categories and counts make the table useful."
  },
  {
    "id": "y2d-a6",
    "type": "multiple",
    "question": "A table shows A=9, B=4, C=9. Select all true statements.",
    "answers": [
      "A and C are equal",
      "B is least frequent",
      "A is less than B",
      "C is more frequent than B"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "A and C both have 9; B has 4."
  },
  {
    "id": "y2d-n1",
    "type": "number",
    "question": "A survey table shows walk 11, bus 6, car 9. Enter the frequency for walk.",
    "correct": 11,
    "explanation": "The frequency is 11."
  },
  {
    "id": "y2d-n2",
    "type": "number",
    "question": "An observation table records 14 birds and 8 butterflies. Enter the bird frequency.",
    "correct": 14,
    "explanation": "The frequency is 14."
  },
  {
    "id": "y2d-n3",
    "type": "number",
    "question": "A table shows apples 7, bananas 12, pears 5. Enter the banana frequency.",
    "correct": 12,
    "explanation": "The frequency is 12."
  },
  {
    "id": "y2d-n4",
    "type": "number",
    "question": "An experiment table shows absorbent 10 and not absorbent 4. Enter the frequency for absorbent.",
    "correct": 10,
    "explanation": "The frequency is 10."
  },
  {
    "id": "y2d-n5",
    "type": "number",
    "question": "A survey records 13 yes responses and 9 no responses. Enter the yes frequency.",
    "correct": 13,
    "explanation": "The frequency is 13."
  },
  {
    "id": "y2d-n6",
    "type": "number",
    "question": "A category table shows red 8, blue 15, green 6. Enter the blue frequency.",
    "correct": 15,
    "explanation": "The frequency is 15."
  },
  {
    "id": "y2d-t1",
    "type": "text",
    "question": "Type the data-collection method that asks people questions.",
    "correct": "survey",
    "acceptedAnswers": [
      "survey",
      "questionnaire"
    ],
    "explanation": "A survey asks people for responses."
  },
  {
    "id": "y2d-t2",
    "type": "text",
    "question": "Type the method that involves watching and recording what happens.",
    "correct": "observation",
    "acceptedAnswers": [
      "observation",
      "observe"
    ],
    "explanation": "Observation involves watching and recording."
  },
  {
    "id": "y2d-t3",
    "type": "text",
    "question": "Type the method that tests something under planned conditions.",
    "correct": "experiment",
    "acceptedAnswers": [
      "experiment"
    ],
    "explanation": "An experiment tests and records outcomes."
  },
  {
    "id": "y2d-t4",
    "type": "text",
    "question": "Type the word for named groups used to sort data.",
    "correct": "categories",
    "acceptedAnswers": [
      "categories",
      "category"
    ],
    "explanation": "Categories group similar responses."
  },
  {
    "id": "y2d-t5",
    "type": "text",
    "question": "Type the word for the number of responses in a category.",
    "correct": "frequency",
    "acceptedAnswers": [
      "frequency",
      "count"
    ],
    "explanation": "Frequency is the number of occurrences."
  },
  {
    "id": "y2d-t6",
    "type": "text",
    "question": "Type the organiser with rows and columns used to display data.",
    "correct": "table",
    "acceptedAnswers": [
      "table",
      "data table"
    ],
    "explanation": "A table organises data into rows and columns."
  },
  {
    "id": "y2d-f1",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "Asking classmates how they travel to school is a {{blank}}.",
    "acceptedAnswers": [
      "survey"
    ],
    "explanation": "This is a survey."
  },
  {
    "id": "y2d-f2",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "Watching and recording bird types is an {{blank}}.",
    "acceptedAnswers": [
      "observation"
    ],
    "explanation": "Watching and recording is observation."
  },
  {
    "id": "y2d-f3",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "A planned test that produces data is an {{blank}}.",
    "acceptedAnswers": [
      "experiment"
    ],
    "explanation": "A planned test is an experiment."
  },
  {
    "id": "y2d-f4",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "Rows and columns can organise data in a {{blank}}.",
    "acceptedAnswers": [
      "table"
    ],
    "explanation": "Tables use rows and columns."
  },
  {
    "id": "y2d-f5",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "Responses should be sorted into relevant {{blank}}.",
    "acceptedAnswers": [
      "categories"
    ],
    "explanation": "Categories organise the responses."
  },
  {
    "id": "y2d-f6",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "A=12 and B=7, so A has a {{blank}} frequency.",
    "acceptedAnswers": [
      "greater",
      "higher",
      "larger"
    ],
    "explanation": "12 is greater than 7."
  },
  {
    "id": "y2d-o1",
    "type": "order",
    "question": "Arrange categories from least to most frequent.",
    "instruction": "Use the arrows to arrange the categories.",
    "items": [
      "dogs: 5",
      "cats: 11",
      "birds: 8"
    ],
    "correct": [
      "dogs: 5",
      "birds: 8",
      "cats: 11"
    ],
    "explanation": "Compare the frequencies in the data."
  },
  {
    "id": "y2d-o2",
    "type": "order",
    "question": "Arrange from least to most frequent.",
    "instruction": "Use the arrows to arrange the categories.",
    "items": [
      "walk: 14",
      "bus: 6",
      "car: 10"
    ],
    "correct": [
      "bus: 6",
      "car: 10",
      "walk: 14"
    ],
    "explanation": "Compare the frequencies in the data."
  },
  {
    "id": "y2d-o3",
    "type": "order",
    "question": "Arrange from least to most frequent.",
    "instruction": "Use the arrows to arrange the categories.",
    "items": [
      "red: 9",
      "green: 13",
      "blue: 7"
    ],
    "correct": [
      "blue: 7",
      "red: 9",
      "green: 13"
    ],
    "explanation": "Compare the frequencies in the data."
  },
  {
    "id": "y2d-o4",
    "type": "order",
    "question": "Arrange from least to most frequent.",
    "instruction": "Use the arrows to arrange the categories.",
    "items": [
      "paper: 4",
      "plastic: 12",
      "metal: 8"
    ],
    "correct": [
      "paper: 4",
      "metal: 8",
      "plastic: 12"
    ],
    "explanation": "Compare the frequencies in the data."
  },
  {
    "id": "y2d-o5",
    "type": "order",
    "question": "Arrange from least to most frequent.",
    "instruction": "Use the arrows to arrange the categories.",
    "items": [
      "yes: 15",
      "no: 5",
      "unsure: 9"
    ],
    "correct": [
      "no: 5",
      "unsure: 9",
      "yes: 15"
    ],
    "explanation": "Compare the frequencies in the data."
  },
  {
    "id": "y2d-o6",
    "type": "order",
    "question": "Arrange from least to most frequent.",
    "instruction": "Use the arrows to arrange the categories.",
    "items": [
      "soccer: 16",
      "tennis: 6",
      "basketball: 11"
    ],
    "correct": [
      "tennis: 6",
      "basketball: 11",
      "soccer: 16"
    ],
    "explanation": "Compare the frequencies in the data."
  },
  {
    "id": "y2d-d1",
    "type": "drag-drop",
    "question": "Put the data investigation steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Decide the question",
      "Choose a collection method",
      "Collect the data"
    ],
    "correct": [
      "Decide the question",
      "Choose a collection method",
      "Collect the data"
    ],
    "explanation": "A data investigation follows a logical process."
  },
  {
    "id": "y2d-d2",
    "type": "drag-drop",
    "question": "Put the data investigation steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Collect responses",
      "Sort into categories",
      "Display in a table"
    ],
    "correct": [
      "Collect responses",
      "Sort into categories",
      "Display in a table"
    ],
    "explanation": "A data investigation follows a logical process."
  },
  {
    "id": "y2d-d3",
    "type": "drag-drop",
    "question": "Put the data investigation steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Observe carefully",
      "Record each result",
      "Compare category frequencies"
    ],
    "correct": [
      "Observe carefully",
      "Record each result",
      "Compare category frequencies"
    ],
    "explanation": "A data investigation follows a logical process."
  },
  {
    "id": "y2d-d4",
    "type": "drag-drop",
    "question": "Put the data investigation steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Plan an experiment",
      "Carry it out",
      "Record the outcome category"
    ],
    "correct": [
      "Plan an experiment",
      "Carry it out",
      "Record the outcome category"
    ],
    "explanation": "A data investigation follows a logical process."
  },
  {
    "id": "y2d-d5",
    "type": "drag-drop",
    "question": "Put the data investigation steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Read the table headings",
      "Find the frequencies",
      "Answer the question"
    ],
    "correct": [
      "Read the table headings",
      "Find the frequencies",
      "Answer the question"
    ],
    "explanation": "A data investigation follows a logical process."
  },
  {
    "id": "y2d-d6",
    "type": "drag-drop",
    "question": "Put the data investigation steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Create categories",
      "Sort the data",
      "Compare the categories"
    ],
    "correct": [
      "Create categories",
      "Sort the data",
      "Compare the categories"
    ],
    "explanation": "A data investigation follows a logical process."
  }
];

  const STORAGE_KEY = "year2-data-daily-used";
  const BEST_SCORE_KEY = "year2-data-daily-best-score";

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
