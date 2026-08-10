"use strict";

/*
  Year 1 Data Collection & Recording
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
    "id": "y1d-s1",
    "type": "single",
    "question": "Which is a good way to record favourite fruit choices?",
    "answers": [
      "tally marks",
      "random numbers",
      "a length measurement"
    ],
    "correct": 0,
    "explanation": "Tally marks can record categorical choices."
  },
  {
    "id": "y1d-s2",
    "type": "single",
    "question": "A picture display uses one star for each vote. What does one star represent?",
    "answers": [
      "one vote",
      "ten votes",
      "one metre"
    ],
    "correct": 0,
    "explanation": "In a one-to-one display, one symbol represents one item."
  },
  {
    "id": "y1d-s3",
    "type": "single",
    "question": "Which question collects categorical data?",
    "answers": [
      "Which pet do you prefer: cat or dog?",
      "How long is your desk?",
      "What is 7 + 5?"
    ],
    "correct": 0,
    "explanation": "Pet type is a category."
  },
  {
    "id": "y1d-s4",
    "type": "single",
    "question": "A tally shows red = 6 and blue = 4. Which colour was chosen more?",
    "answers": [
      "red",
      "blue",
      "same"
    ],
    "correct": 0,
    "explanation": "6 is greater than 4."
  },
  {
    "id": "y1d-s5",
    "type": "single",
    "question": "Which tool could help record class choices?",
    "answers": [
      "list",
      "ruler",
      "balance scale"
    ],
    "correct": 0,
    "explanation": "A list can record categorical data."
  },
  {
    "id": "y1d-s6",
    "type": "single",
    "question": "What does frequency mean in a simple data display?",
    "answers": [
      "how many times a category occurs",
      "how long an object is",
      "how heavy it is"
    ],
    "correct": 0,
    "explanation": "Frequency is the count for a category."
  },
  {
    "id": "y1d-s7",
    "type": "single",
    "question": "A chart shows 5 cats and 5 dogs. What can you say?",
    "answers": [
      "same frequency",
      "cats are more",
      "dogs are more"
    ],
    "correct": 0,
    "explanation": "Both categories have frequency 5."
  },
  {
    "id": "y1d-s8",
    "type": "single",
    "question": "Which is most useful before collecting data?",
    "answers": [
      "ask a clear question",
      "guess the answer",
      "change the categories afterwards"
    ],
    "correct": 0,
    "explanation": "Start with a clear question."
  },
  {
    "id": "y1d-s9",
    "type": "single",
    "question": "Which display matches one picture to one response?",
    "answers": [
      "one-to-one picture display",
      "number line",
      "calendar"
    ],
    "correct": 0,
    "explanation": "One-to-one means one symbol per item or response."
  },
  {
    "id": "y1d-s10",
    "type": "single",
    "question": "Which category has fewer: apples 3, bananas 7?",
    "answers": [
      "apples",
      "bananas",
      "same"
    ],
    "correct": 0,
    "explanation": "3 is fewer than 7."
  },
  {
    "id": "y1d-s11",
    "type": "single",
    "question": "Which can be used to record data?",
    "answers": [
      "drawings",
      "tally marks",
      "lists",
      "all of these"
    ],
    "correct": 3,
    "explanation": "All are valid ways to record categorical data."
  },
  {
    "id": "y1d-s12",
    "type": "single",
    "question": "Why do we sort data into categories?",
    "answers": [
      "to make it easier to compare",
      "to change the answers",
      "to measure length"
    ],
    "correct": 0,
    "explanation": "Categories organise data for comparison."
  },
  {
    "id": "y1d-a1",
    "type": "true-false",
    "question": "A tally mark can be used to record a response.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Tally marks are a common recording method."
  },
  {
    "id": "y1d-a2",
    "type": "true-false",
    "question": "If two categories both have 6, their frequencies are the same.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "Equal counts mean equal frequencies."
  },
  {
    "id": "y1d-a3",
    "type": "true-false",
    "question": "A one-to-one display can use one picture for each item.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "That is the meaning of one-to-one."
  },
  {
    "id": "y1d-a4",
    "type": "multiple",
    "question": "Select all ways to record categorical data.",
    "answers": [
      "tally marks",
      "drawings",
      "lists",
      "metre rulers"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "Tally marks, drawings and lists can record categories."
  },
  {
    "id": "y1d-a5",
    "type": "multiple",
    "question": "Select all questions that collect categorical data.",
    "answers": [
      "Favourite colour?",
      "Cats or dogs?",
      "How many centimetres long?",
      "Walk or bus to school?"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "These answers fall into named categories."
  },
  {
    "id": "y1d-a6",
    "type": "multiple",
    "question": "A chart shows red 8, blue 5, green 8. Select all true statements.",
    "answers": [
      "red and green are equal",
      "blue is fewer than red",
      "green is fewer than blue",
      "red is more than blue"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "explanation": "Red and green both have 8; blue has 5."
  },
  {
    "id": "y1d-n1",
    "type": "number",
    "question": "A tally has 7 votes for cats. Enter the frequency for cats.",
    "correct": 7,
    "explanation": "The frequency is 7."
  },
  {
    "id": "y1d-n2",
    "type": "number",
    "question": "A picture display has 9 stars, one for each vote. Enter the number of votes.",
    "correct": 9,
    "explanation": "The frequency is 9."
  },
  {
    "id": "y1d-n3",
    "type": "number",
    "question": "Red has 4 votes and blue has 6. Enter the frequency for blue.",
    "correct": 6,
    "explanation": "The frequency is 6."
  },
  {
    "id": "y1d-n4",
    "type": "number",
    "question": "A chart shows 8 walkers and 3 bus riders. Enter the number of walkers.",
    "correct": 8,
    "explanation": "The frequency is 8."
  },
  {
    "id": "y1d-n5",
    "type": "number",
    "question": "There are 5 circles in the 'apple' category. Enter the frequency.",
    "correct": 5,
    "explanation": "The frequency is 5."
  },
  {
    "id": "y1d-n6",
    "type": "number",
    "question": "A list contains 10 responses for 'yes'. Enter the frequency of yes.",
    "correct": 10,
    "explanation": "The frequency is 10."
  },
  {
    "id": "y1d-t1",
    "type": "text",
    "question": "A chart shows cats 7, dogs 4. Type the category with more.",
    "correct": "cats",
    "acceptedAnswers": [
      "cats",
      "cat"
    ],
    "explanation": "Cats have the greater frequency."
  },
  {
    "id": "y1d-t2",
    "type": "text",
    "question": "A chart shows red 3, blue 6. Type the category with fewer.",
    "correct": "red",
    "acceptedAnswers": [
      "red"
    ],
    "explanation": "Red has fewer responses."
  },
  {
    "id": "y1d-t3",
    "type": "text",
    "question": "Type the word for how many times a category appears.",
    "correct": "frequency",
    "acceptedAnswers": [
      "frequency",
      "count"
    ],
    "explanation": "Frequency is the number of occurrences."
  },
  {
    "id": "y1d-t4",
    "type": "text",
    "question": "Type one common way to record quick counts using marks.",
    "correct": "tally",
    "acceptedAnswers": [
      "tally",
      "tally marks",
      "tallies"
    ],
    "explanation": "Tally marks record counts."
  },
  {
    "id": "y1d-t5",
    "type": "text",
    "question": "Type the word for groups such as red, blue and green in a survey.",
    "correct": "categories",
    "acceptedAnswers": [
      "categories",
      "category"
    ],
    "explanation": "These are data categories."
  },
  {
    "id": "y1d-t6",
    "type": "text",
    "question": "Type the word for information we collect and record.",
    "correct": "data",
    "acceptedAnswers": [
      "data"
    ],
    "explanation": "Collected information is called data."
  },
  {
    "id": "y1d-f1",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "The number of times a category occurs is its {{blank}}.",
    "acceptedAnswers": [
      "frequency"
    ],
    "explanation": "Frequency is the count."
  },
  {
    "id": "y1d-f2",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "One picture for each response is a {{blank}}-to-one display.",
    "acceptedAnswers": [
      "one",
      "1"
    ],
    "explanation": "One picture per response is one-to-one."
  },
  {
    "id": "y1d-f3",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "Cats 8, dogs 5. Cats have {{blank}} responses.",
    "acceptedAnswers": [
      "more"
    ],
    "explanation": "8 is more than 5."
  },
  {
    "id": "y1d-f4",
    "type": "fill-blank",
    "question": "Complete the comparison.",
    "template": "Red 4, blue 9. Red has {{blank}} responses.",
    "acceptedAnswers": [
      "fewer",
      "less"
    ],
    "explanation": "4 is fewer than 9."
  },
  {
    "id": "y1d-f5",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "We sort responses into named {{blank}}.",
    "acceptedAnswers": [
      "categories",
      "groups"
    ],
    "explanation": "Categories organise data."
  },
  {
    "id": "y1d-f6",
    "type": "fill-blank",
    "question": "Complete the sentence.",
    "template": "A clear survey starts with a {{blank}}.",
    "acceptedAnswers": [
      "question"
    ],
    "explanation": "A question tells us what data to collect."
  },
  {
    "id": "y1d-o1",
    "type": "order",
    "question": "Arrange the categories from fewest to most.",
    "instruction": "Use the arrows to order the categories.",
    "items": [
      "cats: 2",
      "dogs: 5",
      "birds: 8"
    ],
    "correct": [
      "cats: 2",
      "dogs: 5",
      "birds: 8"
    ],
    "explanation": "Compare the frequencies."
  },
  {
    "id": "y1d-o2",
    "type": "order",
    "question": "Arrange the categories from fewest to most.",
    "instruction": "Use the arrows to order the categories.",
    "items": [
      "red: 7",
      "blue: 3",
      "green: 5"
    ],
    "correct": [
      "blue: 3",
      "green: 5",
      "red: 7"
    ],
    "explanation": "Compare the frequencies."
  },
  {
    "id": "y1d-o3",
    "type": "order",
    "question": "Arrange from least frequent to most frequent.",
    "instruction": "Use the arrows to order the categories.",
    "items": [
      "walk: 4",
      "bus: 9",
      "car: 6"
    ],
    "correct": [
      "walk: 4",
      "car: 6",
      "bus: 9"
    ],
    "explanation": "Compare the frequencies."
  },
  {
    "id": "y1d-o4",
    "type": "order",
    "question": "Arrange from fewest to most.",
    "instruction": "Use the arrows to order the categories.",
    "items": [
      "apple: 8",
      "banana: 2",
      "pear: 5"
    ],
    "correct": [
      "banana: 2",
      "pear: 5",
      "apple: 8"
    ],
    "explanation": "Compare the frequencies."
  },
  {
    "id": "y1d-o5",
    "type": "order",
    "question": "Arrange from least frequent to most frequent.",
    "instruction": "Use the arrows to order the categories.",
    "items": [
      "yes: 10",
      "no: 6",
      "maybe: 8"
    ],
    "correct": [
      "no: 6",
      "maybe: 8",
      "yes: 10"
    ],
    "explanation": "Compare the frequencies."
  },
  {
    "id": "y1d-o6",
    "type": "order",
    "question": "Arrange from fewest to most.",
    "instruction": "Use the arrows to order the categories.",
    "items": [
      "circle: 3",
      "square: 7",
      "triangle: 4"
    ],
    "correct": [
      "circle: 3",
      "triangle: 4",
      "square: 7"
    ],
    "explanation": "Compare the frequencies."
  },
  {
    "id": "y1d-d1",
    "type": "drag-drop",
    "question": "Put the data steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Ask a question",
      "Collect responses",
      "Record the data"
    ],
    "correct": [
      "Ask a question",
      "Collect responses",
      "Record the data"
    ],
    "explanation": "Data work follows a logical sequence."
  },
  {
    "id": "y1d-d2",
    "type": "drag-drop",
    "question": "Put the data steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Count each category",
      "Compare frequencies",
      "Discuss what you notice"
    ],
    "correct": [
      "Count each category",
      "Compare frequencies",
      "Discuss what you notice"
    ],
    "explanation": "Data work follows a logical sequence."
  },
  {
    "id": "y1d-d3",
    "type": "drag-drop",
    "question": "Put the data steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Make categories",
      "Sort the responses",
      "Count each group"
    ],
    "correct": [
      "Make categories",
      "Sort the responses",
      "Count each group"
    ],
    "explanation": "Data work follows a logical sequence."
  },
  {
    "id": "y1d-d4",
    "type": "drag-drop",
    "question": "Put the data steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Choose a question",
      "Make a tally",
      "Compare the totals"
    ],
    "correct": [
      "Choose a question",
      "Make a tally",
      "Compare the totals"
    ],
    "explanation": "Data work follows a logical sequence."
  },
  {
    "id": "y1d-d5",
    "type": "drag-drop",
    "question": "Put the data steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Collect data",
      "Create a one-to-one display",
      "Compare categories"
    ],
    "correct": [
      "Collect data",
      "Create a one-to-one display",
      "Compare categories"
    ],
    "explanation": "Data work follows a logical sequence."
  },
  {
    "id": "y1d-d6",
    "type": "drag-drop",
    "question": "Put the data steps in a sensible order.",
    "instruction": "Drag the steps into order. Use the arrows on touchscreens.",
    "items": [
      "Read the chart",
      "Find each frequency",
      "Decide which is most"
    ],
    "correct": [
      "Read the chart",
      "Find each frequency",
      "Decide which is most"
    ],
    "explanation": "Data work follows a logical sequence."
  }
];

  const STORAGE_KEY = "year1-data-daily-used";
  const BEST_SCORE_KEY = "year1-data-daily-best-score";

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
