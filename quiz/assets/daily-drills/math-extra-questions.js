"use strict";

(() => {
  const year = "5";
  const subject = "math";
  const skill = "factors-multiples-place-value";

  const question = (
    number,
    learningArea,
    difficulty,
    type,
    prompt,
    details
  ) => ({
    id: `m-${year}-${skill}-extra-q${number}`,
    year,
    subject,
    skill,
    sourceBank: "quality-extension",
    learningArea,
    difficulty,
    type,
    question: prompt,
    ...details
  });

  const questions = [
    question(
      1,
      "factors-divisibility",
      "core",
      "single",
      "A teacher has 96 counters and wants to arrange all of them in equal rows. Which arrangement works with no counters left over?",
      {
        answers: [
          "8 rows of 12",
          "7 rows of 14",
          "9 rows of 11",
          "10 rows of 9"
        ],
        correct: 0,
        explanation: "8 × 12 = 96, so 8 and 12 form a factor pair of 96."
      }
    ),
    question(
      2,
      "factors-divisibility",
      "application",
      "multiple",
      "Select all the common factors of 24 and 36.",
      {
        answers: ["1", "4", "6", "8", "12"],
        correct: [0, 1, 2, 4],
        instruction: "Select every number that divides both 24 and 36 exactly.",
        explanation: "1, 4, 6 and 12 divide both numbers exactly; 8 does not divide 36."
      }
    ),
    question(
      3,
      "factors-divisibility",
      "core",
      "number",
      "What missing factor makes 14 × □ = 126 true?",
      {
        correct: 9,
        explanation: "126 ÷ 14 = 9, so 14 × 9 = 126."
      }
    ),
    question(
      4,
      "factors-divisibility",
      "challenge",
      "single",
      "Mia says that 6 is not a factor of 78. Which evidence best checks her claim?",
      {
        answers: [
          "78 ÷ 6 = 13 with no remainder",
          "78 is an even number",
          "78 is greater than 6",
          "78 ÷ 5 has a remainder"
        ],
        correct: 0,
        explanation: "The exact division 78 ÷ 6 = 13 proves that 6 is a factor of 78."
      }
    ),
    question(
      5,
      "multiples",
      "core",
      "single",
      "What is the least common multiple of 6 and 8?",
      {
        answers: ["12", "18", "24", "48"],
        correct: 2,
        explanation: "24 is the first number that appears in both the multiples of 6 and the multiples of 8."
      }
    ),
    question(
      6,
      "multiples",
      "application",
      "number",
      "Two signals flash together now. One flashes every 4 minutes and the other every 6 minutes. After how many minutes will they next flash together?",
      {
        correct: 12,
        explanation: "12 is the least common multiple of 4 and 6."
      }
    ),
    question(
      7,
      "multiples",
      "application",
      "multiple",
      "Select all the multiples of 12.",
      {
        answers: ["36", "48", "54", "72", "85"],
        correct: [0, 1, 3],
        explanation: "36 = 3 × 12, 48 = 4 × 12 and 72 = 6 × 12."
      }
    ),
    question(
      8,
      "multiples",
      "core",
      "fill-blank",
      "Complete the sequence of multiples of 7.",
      {
        template: "35, 42, 49, {{blank}}, 63",
        acceptedAnswers: ["56"],
        explanation: "Add 7 each time, so the missing multiple is 56."
      }
    ),
    question(
      9,
      "prime-composite",
      "application",
      "multiple",
      "Select all the prime numbers.",
      {
        answers: ["31", "39", "51", "53"],
        correct: [0, 3],
        explanation: "31 and 53 each have exactly two positive factors. 39 and 51 are divisible by 3."
      }
    ),
    question(
      10,
      "prime-composite",
      "core",
      "single",
      "Which statement proves that 91 is composite?",
      {
        answers: [
          "91 = 7 × 13",
          "91 is greater than 50",
          "91 is an odd number",
          "91 has two digits"
        ],
        correct: 0,
        explanation: "Because 91 has the factor pair 7 and 13, it has more than two factors and is composite."
      }
    ),
    question(
      11,
      "prime-composite",
      "challenge",
      "number",
      "What is the smallest prime factor of 77?",
      {
        correct: 7,
        explanation: "77 = 7 × 11, and 7 is the smaller prime factor."
      }
    ),
    question(
      12,
      "prime-composite",
      "challenge",
      "drag-drop",
      "Arrange the numbers from the fewest positive factors to the most positive factors.",
      {
        items: ["12", "8", "13", "9"],
        correct: ["13", "9", "8", "12"],
        instruction: "Count each number's positive factors, then drag the numbers into order.",
        explanation: "13 has 2 factors, 9 has 3, 8 has 4 and 12 has 6."
      }
    ),
    question(
      13,
      "place-value",
      "core",
      "single",
      "What is the value of the digit 4 in 6,407,215?",
      {
        answers: ["4,000,000", "400,000", "40,000", "4,000"],
        correct: 1,
        explanation: "The 4 is in the hundred-thousands place, so its value is 400,000."
      }
    ),
    question(
      14,
      "place-value",
      "application",
      "number",
      "A number becomes 10 times as large. What is 10 × 32,450?",
      {
        correct: 324500,
        explanation: "Multiplying a whole number by 10 shifts every digit one place to the left: 324,500."
      }
    ),
    question(
      15,
      "place-value",
      "challenge",
      "drag-drop",
      "Arrange the numbers from smallest to largest.",
      {
        items: ["450,090", "405,900", "450,009", "405,090"],
        correct: ["405,090", "405,900", "450,009", "450,090"],
        instruction: "Compare digits from the greatest place value first.",
        explanation: "405,090 < 405,900 < 450,009 < 450,090."
      }
    ),
    question(
      16,
      "place-value",
      "core",
      "fill-blank",
      "Write the numeral represented by the expanded form.",
      {
        template: "700,000 + 40,000 + 3,000 + 90 + 2 = {{blank}}",
        acceptedAnswers: ["743092", "743,092"],
        explanation: "The expanded parts combine to make 743,092."
      }
    ),
    question(
      17,
      "rounding-estimation",
      "core",
      "single",
      "Round 368,472 to the nearest 10,000.",
      {
        answers: ["360,000", "368,000", "370,000", "400,000"],
        correct: 2,
        explanation: "The thousands digit is 8, so 368,472 rounds up to 370,000."
      }
    ),
    question(
      18,
      "rounding-estimation",
      "core",
      "number",
      "Round 74,951 to the nearest 1,000.",
      {
        correct: 75000,
        explanation: "74,951 is at least 74,500, so it rounds to 75,000."
      }
    ),
    question(
      19,
      "rounding-estimation",
      "application",
      "single",
      "Estimate 6,198 + 3,744 by rounding each number to the nearest thousand.",
      {
        answers: ["8,000", "9,000", "10,000", "11,000"],
        correct: 2,
        explanation: "6,198 rounds to 6,000 and 3,744 rounds to 4,000, giving an estimate of 10,000."
      }
    ),
    question(
      20,
      "rounding-estimation",
      "challenge",
      "multiple",
      "Select all the numbers that round to 35,000 when rounded to the nearest 1,000.",
      {
        answers: ["34,501", "35,499", "34,499", "35,501"],
        correct: [0, 1],
        explanation: "Numbers from 34,500 to 35,499 round to 35,000."
      }
    )
  ];

  const registry = window.SkillrDailyQuestionExtensions || {};
  registry[year] = registry[year] || {};
  registry[year][subject] = registry[year][subject] || {};
  registry[year][subject][skill] = questions.map(item=>({
    ...item,
    audioPrompt:item.audioPrompt||item.question,
    hint:item.hint||({
      single:"Choose an efficient method, then compare every option with your result.",
      multiple:"Test each option separately because more than one can be correct.",
      number:"Estimate first, calculate carefully, then enter only the number.",
      order:"Find each value before arranging the items."
    }[item.type]||"Use a known fact or model, then check that the result is reasonable.")
  }));
  window.SkillrDailyQuestionExtensions = registry;
})();
