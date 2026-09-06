"use strict";
const rawAc9m8n04Test = [
  ["What is 3/8 + 5/8?", ["1", "0", "3/8", "5/8"], 0, "3/8 + 5/8 = 8/8 = 1.", "fraction addition"],
  ["Which uses the commutative property?", ["3 + 5 = 5 + 3", "3 + (5 + 2) = (3 + 5) + 2", "3 × (5 × 2)", "3 − 5"], 0, "The commutative property changes the order: 3 + 5 = 5 + 3.", "commutative property"],
  ["Which uses the associative property?", ["7 × 4 = 4 × 7", "(7 × 4) × 2 = 7 × (4 × 2)", "7 × 4 = 28", "7 − 4 = 3"], 1, "The associative property changes grouping, not order.", "associative property"],
  ["Which strategy simplifies 25 × 12?", ["Partitioning", "Guessing", "Trial and error", "Rounding"], 0, "Use partitioning: 25 × 12 = 25 × (10 + 2).", "partitioning"],
  ["Which is an efficient regrouping for 8 × 25?", ["8 × 25 = (8 × 100) ÷ 4", "8 × 25 = 8 × 20", "8 × 25 = 8 × 30", "8 × 25 = 8 × 8"], 0, "Since 25 is one quarter of 100, 8 × 25 = 800 ÷ 4 = 200.", "regrouping"],
  ["Which uses place value correctly?", ["0.4 × 10 = 4", "0.4 × 10 = 0.4", "0.4 × 10 = 40", "0.4 × 10 = 0.04"], 0, "Multiplying by 10 shifts the decimal one place to the right.", "place value"],
  ["Which sequence best shows multiplicative patterning?", ["2, 4, 8, 16, …", "1, 2, 3", "10, 20, 30", "5, 5, 5"], 0, "Each term is doubled: 2, 4, 8, 16, …", "patterning"],
  ["Which is an efficient strategy for (−6) × 15?", ["Use 15 = 3 × 5", "Use 15 = 10 + 5", "Use 15 = 20 − 5", "All of the above"], 3, "All three decompositions can help calculate (−6) × 15 efficiently.", "efficient strategies"],
  ["Which uses a multiplication fact?", ["6 × 7 = 42", "6 + 7 = 13", "6 − 7 = −1", "6 ÷ 7"], 0, "6 × 7 = 42 is a multiplication fact.", "multiplication facts"],
  ["Which uses efficient regrouping for 48 ÷ 6?", ["48 = 6 × 8", "48 = 50 − 2", "48 = 40 + 8", "48 = 60 − 12"], 0, "Recognising 48 as 6 × 8 gives 48 ÷ 6 = 8.", "division facts"],
  ["What is (−3) × 4 + 10?", ["−2", "2", "−22", "22"], 0, "Do multiplication first: (−3) × 4 = −12, then −12 + 10 = −2.", "order of operations"],
  ["What is 6 + (−2) × 5?", ["−4", "4", "−16", "16"], 0, "Do multiplication first: (−2) × 5 = −10, then 6 + (−10) = −4.", "order of operations"],
  ["What is (−0.5) × (−0.2)?", ["0.1", "−0.1", "0.01", "−0.01"], 0, "A negative times a negative is positive, and 0.5 × 0.2 = 0.1.", "decimal multiplication"],
  ["What is (−2/3) × (−3/4)?", ["1/2", "−1/2", "2", "−2"], 0, "The product is positive and 2/3 × 3/4 = 6/12 = 1/2.", "fraction multiplication"],
  ["What is 5/6 ÷ (−1/3)?", ["−5/2", "5/2", "−5/18", "5/18"], 0, "5/6 ÷ (−1/3) = 5/6 × (−3) = −15/6 = −5/2.", "fraction division"],
  ["What is (−2)^3 + (−2)^2?", ["−4", "4", "−6", "6"], 0, "(−2)^3 = −8 and (−2)^2 = 4, so the sum is −4.", "integer powers and order"]
];
window.skillrTestQuestions = rawAc9m8n04Test.map(([question, answers, correct, explanation, skill], index) => ({
  id: `ac9m8n04-t-${String(index + 1).padStart(3, "0")}`,
  curriculumCode: "AC9M8N04",
  bank: "test",
  section: index < 10 ? "Efficient strategies" : "Mixed integer and rational operations",
  sourceNumber: index + 25,
  skill,
  printable: true,
  type: "single",
  question,
  audioPrompt: question,
  visual: "",
  visualHtml: "",
  visualMeta: { type: "none", alt_text: "" },
  answers,
  correct,
  explanation,
  structuredExplanation: { summary: explanation, hint: "Use operation order and sign rules before simplifying." },
  qualitySchema: "production-v1"
}));
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
