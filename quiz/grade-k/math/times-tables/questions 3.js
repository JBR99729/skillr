"use strict";

/* =========================================================
   TIMES TABLES MASTER QUESTION BANK
   Tables 1× through 20×
   Each table includes ×1 through ×12

   IMPORTANT:
   The active tables are controlled in index.html:

   window.timesTablesQuiz = {
     minMultiplier: 1,
     maxMultiplier: 12,
     activeTables: [
       1,
       2,
       // 3,
       // 4,
       5,
       // ...
       10
     ]
   };

   This file can be reused for every year level.
   You only change activeTables in index.html.
   ========================================================= */


/* =========================================================
   READ TABLE SETTINGS FROM INDEX.HTML
   ========================================================= */

const timesTablesSettings = {
  minMultiplier: 1,
  maxMultiplier: 12,
  activeTables: [1, 2, 5, 10],
  ...(window.timesTablesQuiz || {})
};


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getWrongAnswers(correctAnswer, table, multiplier) {

  const candidates = [
    correctAnswer + table,
    correctAnswer - table,
    correctAnswer + multiplier,
    correctAnswer - multiplier,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2
  ]
    .filter(
      (value) =>
        Number.isInteger(value) &&
        value >= 0 &&
        value !== correctAnswer
    );

  const unique = [...new Set(candidates)];

  while (unique.length < 3) {
    const extra =
      correctAnswer + unique.length + 3;

    if (!unique.includes(extra)) {
      unique.push(extra);
    }
  }

  return unique.slice(0, 3);
}


function makeSingleChoiceQuestion(
  table,
  multiplier,
  product
) {

  const wrong =
    getWrongAnswers(
      product,
      table,
      multiplier
    );

  const answers = [
    String(wrong[0]),
    String(product),
    String(wrong[1]),
    String(wrong[2])
  ];

  return {
    table,
    multiplier,
    type: "single",

    question:
      `What is ${table} × ${multiplier}?`,

    answers,

    correct: 1,

    explanation:
      `${table} × ${multiplier} = ${product}.`
  };

}


function makeNumberQuestion(
  table,
  multiplier,
  product
) {

  return {
    table,
    multiplier,
    type: "number",

    question:
      `Work out ${table} × ${multiplier}.`,

    placeholder:
      "Type the answer",

    correct:
      product,

    tolerance:
      0,

    explanation:
      `${table} groups of ${multiplier} make ${product}.`
  };

}


function makeFillBlankQuestion(
  table,
  multiplier,
  product
) {

  return {
    table,
    multiplier,
    type: "fill-blank",

    question:
      "Fill in the missing product.",

    template:
      `${table} × ${multiplier} = {{blank}}`,

    placeholder:
      "?",

    acceptedAnswers: [
      [String(product)]
    ],

    explanation:
      `${table} × ${multiplier} = ${product}.`
  };

}


function makeMissingFactorQuestion(
  table,
  multiplier,
  product
) {

  return {
    table,
    multiplier,
    type: "fill-blank",

    question:
      "Fill in the missing number.",

    template:
      `${table} × {{blank}} = ${product}`,

    placeholder:
      "?",

    acceptedAnswers: [
      [String(multiplier)]
    ],

    explanation:
      `${table} × ${multiplier} = ${product}, so the missing number is ${multiplier}.`
  };

}


function makeTrueFalseQuestion(
  table,
  multiplier,
  product
) {

  const makeTrue =
    (table + multiplier) % 2 === 0;

  const shownProduct =
    makeTrue
      ? product
      : product + (
          multiplier % 2 === 0
            ? table
            : 1
        );

  return {
    table,
    multiplier,
    type: "true-false",

    question:
      `${table} × ${multiplier} = ${shownProduct}.`,

    answers: [
      "True",
      "False"
    ],

    correct:
      makeTrue ? 0 : 1,

    explanation:
      `${table} × ${multiplier} = ${product}.`
  };

}


function makeRepeatedAdditionQuestion(
  table,
  multiplier,
  product
) {

  const repeatedAddition =
    Array.from(
      { length: multiplier },
      () => String(table)
    ).join(" + ");

  return {
    table,
    multiplier,
    type: "single",

    question:
      `Which multiplication fact matches ${repeatedAddition}?`,

    answers: [
      `${table} × ${multiplier}`,
      `${table} + ${multiplier}`,
      `${multiplier} − ${table}`
    ],

    correct:
      0,

    explanation:
      `${multiplier} groups of ${table} can be written as ${table} × ${multiplier} = ${product}.`
  };

}


/* =========================================================
   BUILD ALL 240 CORE FACT QUESTIONS

   20 tables × 12 multipliers = 240 questions.

   Different question formats are rotated through the bank.
   ========================================================= */

const allTimesTableQuestions = [];

for (
  let table = 1;
  table <= 20;
  table += 1
) {

  for (
    let multiplier = 1;
    multiplier <= 12;
    multiplier += 1
  ) {

    const product =
      table * multiplier;

    const questionStyle =
      (table + multiplier) % 6;


    if (questionStyle === 0) {

      allTimesTableQuestions.push(
        makeSingleChoiceQuestion(
          table,
          multiplier,
          product
        )
      );

    } else if (
      questionStyle === 1
    ) {

      allTimesTableQuestions.push(
        makeNumberQuestion(
          table,
          multiplier,
          product
        )
      );

    } else if (
      questionStyle === 2
    ) {

      allTimesTableQuestions.push(
        makeFillBlankQuestion(
          table,
          multiplier,
          product
        )
      );

    } else if (
      questionStyle === 3
    ) {

      allTimesTableQuestions.push(
        makeMissingFactorQuestion(
          table,
          multiplier,
          product
        )
      );

    } else if (
      questionStyle === 4
    ) {

      allTimesTableQuestions.push(
        makeTrueFalseQuestion(
          table,
          multiplier,
          product
        )
      );

    } else {

      /*
        Repeated addition is useful for smaller
        multipliers.

        For larger multipliers, use a normal
        number-entry question so the text does
        not become unnecessarily long.
      */

      if (multiplier <= 5) {

        allTimesTableQuestions.push(
          makeRepeatedAdditionQuestion(
            table,
            multiplier,
            product
          )
        );

      } else {

        allTimesTableQuestions.push(
          makeNumberQuestion(
            table,
            multiplier,
            product
          )
        );

      }

    }

  }

}


/* =========================================================
   FILTER QUESTIONS USING THE ACTIVE TABLES IN INDEX.HTML
   ========================================================= */

const activeTables =
  Array.isArray(
    timesTablesSettings.activeTables
  )
    ? timesTablesSettings.activeTables
        .map(Number)
        .filter(
          (table) =>
            Number.isInteger(table) &&
            table >= 1 &&
            table <= 20
        )
    : [];


const minimumMultiplier =
  Number.isInteger(
    Number(
      timesTablesSettings.minMultiplier
    )
  )
    ? Number(
        timesTablesSettings.minMultiplier
      )
    : 1;


const maximumMultiplier =
  Number.isInteger(
    Number(
      timesTablesSettings.maxMultiplier
    )
  )
    ? Number(
        timesTablesSettings.maxMultiplier
      )
    : 12;


window.quizQuestions =
  allTimesTableQuestions.filter(
    (question) => {

      return (
        activeTables.includes(
          question.table
        ) &&
        question.multiplier >=
          minimumMultiplier &&
        question.multiplier <=
          maximumMultiplier
      );

    }
  );


/* =========================================================
   QUIZ SETTINGS

   5 random questions per attempt.

   Change maxQuestions if you want a longer quiz.
   ========================================================= */

window.quizConfig = {

  shuffleQuestions: true,

  shuffleAnswers: false,

  maxQuestions: 5,

  caseSensitiveText: false,

  storageKey:
    `TimesTablesBestScore-${activeTables.join("-")}`

};


/* =========================================================
   OPTIONAL CONSOLE CHECK

   Useful while setting up the page.
   You can remove this block later if desired.
   ========================================================= */

console.log(
  "Times tables loaded:",
  {
    activeTables,
    minMultiplier:
      minimumMultiplier,
    maxMultiplier:
      maximumMultiplier,
    availableQuestions:
      window.quizQuestions.length
  }
);
