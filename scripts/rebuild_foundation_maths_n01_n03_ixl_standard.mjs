import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const codes = ["AC9MFN01", "AC9MFN02", "AC9MFN03"];

const meta = {
  AC9MFN01: {
    title: "Numbers to 20",
    skill: "name, represent and order numbers including zero to at least 20",
    focus: "naming, representing, ordering and reasoning with numbers 0 to 20",
  },
  AC9MFN02: {
    title: "Subitising to 5",
    skill: "recognise and name collections to 5 using subitising",
    focus: "quick recognition of small quantities, patterns and part-whole structures to 5",
  },
  AC9MFN03: {
    title: "Counting and comparing collections",
    skill: "quantify and compare collections to at least 20 using counting and reasoning",
    focus: "counting each object once, comparing collections and explaining more, fewer or equal",
  },
};

const names = ["Mia", "Noah", "Ava", "Leo", "Zoe", "Sam", "Lina", "Kai", "Omar", "Ivy"];
const objects = ["counters", "buttons", "shells", "blocks", "stars", "beads", "leaves", "stickers", "tiles", "cups"];
const symbols = ["●", "■", "▲", "◆", "★"];
const numberWords = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen", "twenty",
];

function pad(n) {
  return String(n).padStart(3, "0");
}

function dots(n, symbol = "●") {
  return n === 0 ? "(empty)" : Array.from({ length: n }, () => symbol).join(" ");
}

function scatter(n, symbol = "●") {
  if (n === 0) return "(empty)";
  const rows = [];
  let left = n;
  let row = 0;
  while (left > 0) {
    const take = Math.min(left, 3 + ((n + row) % 4));
    rows.push(`${" ".repeat(row % 3)}${dots(take, symbol)}`);
    left -= take;
    row += 1;
  }
  return rows.join("\n");
}

function frame10(n) {
  const cells = Array.from({ length: 10 }, (_, index) => index < n ? "●" : "○");
  return `${cells.slice(0, 5).join(" ")}\n${cells.slice(5).join(" ")}`;
}

function frame20(n) {
  return `${frame10(Math.min(n, 10))}\n${frame10(Math.max(0, n - 10))}`;
}

function fiveFrame(n) {
  return Array.from({ length: 5 }, (_, index) => index < n ? "●" : "○").join(" ");
}

function pairLine(a, b, symbolA = "●", symbolB = "■") {
  return `A: ${dots(a, symbolA)}\nB: ${dots(b, symbolB)}`;
}

function singular(word) {
  if (word === "leaves") return "leaf";
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function uniqueChoices(values, fallbackStart = 0, fallbackEnd = 20) {
  const out = [];
  for (const value of values.map(String)) {
    if (!out.includes(value)) out.push(value);
  }
  for (let n = fallbackStart; out.length < 3 && n <= fallbackEnd; n += 1) {
    const value = String(n);
    if (!out.includes(value)) out.push(value);
  }
  return out.slice(0, 3);
}

function answerChoices(correct, wrongs, position, min = 0, max = 20) {
  const correctText = String(correct);
  const distractors = uniqueChoices(wrongs.filter((x) => String(x) !== correctText), min, max)
    .filter((x) => x !== correctText)
    .slice(0, 2);
  const choices = distractors.slice(0, 2);
  choices.splice(position % 3, 0, correctText);
  return choices;
}

function item(code, bank, index, detail) {
  const correctPos = (index + (bank === "test" ? 1 : 0) + codes.indexOf(code)) % 3;
  const answers = answerChoices(detail.correct, detail.wrongs, correctPos, detail.min ?? 0, detail.max ?? 20);
  const correct = answers.indexOf(String(detail.correct));
  const question = bank === "test" ? `Independent check: ${detail.question}` : detail.question;
  return {
    id: `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${pad(index + 1)}`,
    curriculumCode: code,
    bank,
    skill: detail.skill,
    question,
    visual: detail.visual || "",
    explanation: detail.explanation,
    printable: true,
    type: "single",
    answers,
    correct,
    structuredExplanation: {
      summary: detail.explanation,
      hint: detail.hint,
    },
    difficulty: bank === "test" ? 3 : index < 18 ? 1 : index < 42 ? 2 : 3,
    difficultyTier: bank === "test" ? "independent" : index < 18 ? "recognise" : index < 42 ? "apply" : "reason",
    sequencePriority: index + 1,
    qualitySchema: "foundation-maths-ixl-standard-v1",
  };
}

function n01Detail(seed, bank) {
  const name = names[(seed + Math.floor(seed / 8)) % names.length];
  const object = objects[(seed * 3 + Math.floor(seed / 8)) % objects.length];
  const symbol = symbols[seed % symbols.length];
  const type = seed % 8;
  if (type === 0) {
    const n = (seed * 3) % 20;
    return {
      skill: "count on by one",
      question: `${name} is counting on a number track: ${n}, ___. What number comes next?`,
      visual: `${n}  ___`,
      correct: n + 1,
      wrongs: [Math.max(0, n - 1), Math.min(20, n + 2)],
      explanation: `Counting on one from ${n} gives ${n + 1}, so ${n + 1} is the next number in the sequence.`,
      hint: "Say the number, then count one more.",
    };
  }
  if (type === 1) {
    const n = 2 + ((seed * 5) % 18);
    return {
      skill: "count back by one",
      question: `${name} points to ${n}. What number comes just before it?`,
      visual: `___  ${n}`,
      correct: n - 1,
      wrongs: [n + 1, Math.max(0, n - 2)],
      explanation: `${n - 1} comes just before ${n} in the counting order because it is one less.`,
      hint: "Count backwards one step.",
    };
  }
  if (type === 2) {
    const n = 1 + ((seed * 4) % 18);
    return {
      skill: "missing number sequence",
      question: `${name} sees this counting pattern. Which number is missing? ${n}, ___, ${n + 2}`,
      visual: `${n}  ___  ${n + 2}`,
      correct: n + 1,
      wrongs: [n, n + 2],
      explanation: `The numbers count up by one, so the missing number is ${n + 1}.`,
      hint: "Read the numbers in order.",
    };
  }
  if (type === 3) {
    const n = (seed * 7) % 21;
    return {
      skill: "match numeral to quantity",
      question: `Which numeral matches this collection of ${object} on ${name}'s mat?`,
      visual: scatter(n, symbol),
      correct: n,
      wrongs: [Math.max(0, n - 1), Math.min(20, n + 1)],
      explanation: `Counting each ${singular(object)} once gives ${n}, and the last count word names the total.`,
      hint: "Touch each object once and use the last count word as the total.",
    };
  }
  if (type === 4) {
    const n = 6 + ((seed * 3) % 15);
    return {
      skill: "read number name",
      question: `${name} reads the number word ${numberWords[n]}. Which numeral matches it?`,
      visual: numberWords[n],
      correct: n,
      wrongs: [Math.max(0, n - 2), Math.min(20, n + 1)],
      explanation: `${numberWords[n]} is written as ${n}, so the numeral and number word show the same number.`,
      hint: "Match the spoken number name to the written numeral.",
    };
  }
  if (type === 5) {
    const n = 10 + ((seed * 2) % 11);
    return {
      skill: "represent teen number",
      question: `${name} has a full ten-frame and ${n - 10} more counters. Which number is shown?`,
      visual: frame20(n),
      correct: n,
      wrongs: [n - 10, Math.max(0, n - 1)],
      explanation: `One full ten-frame is 10, and ${n - 10} more makes ${n}.`,
      hint: "Think ten and some more.",
    };
  }
  if (type === 6) {
    const a = (seed * 4) % 21;
    let b = (a + 3 + seed) % 21;
    if (b === a) b = (b + 4) % 21;
    const low = Math.min(a, b);
    const high = Math.max(a, b);
    return {
      skill: "order two numbers",
      question: `${name} compares ${low} and ${high}. Which number is greater?`,
      visual: `${low}      ${high}`,
      correct: high,
      wrongs: [low, Math.max(0, high - 1)],
      explanation: `${high} is greater because it comes later when counting to 20.`,
      hint: "The later number on the counting track is greater.",
    };
  }
  return {
    skill: "understand zero",
    question: `All ${name}'s ${object} were packed away after the activity. Which numeral shows none left?`,
    visual: "(empty mat)",
    correct: 0,
    wrongs: [1, 2],
    explanation: "Zero means there are no objects in the collection, so an empty mat is matched with 0.",
    hint: "An empty collection is represented by 0.",
  };
}

function n02Detail(seed, bank) {
  const name = names[seed % names.length];
  const symbol = symbols[(seed + 1) % symbols.length];
  const n = 1 + (seed % 5);
  const card = `${bank === "test" ? "Check" : "Card"} ${seed + 1}`;
  const type = seed % 7;
  if (type === 0) {
    return {
      skill: "quick-look dot pattern",
      question: `${name} looks quickly at ${card}. How many dots are shown?`,
      visual: n === 5 ? "●   ●\n  ●\n●   ●" : scatter(n, "●"),
      correct: n,
      wrongs: [Math.max(0, n - 1), Math.min(5, n + 1)],
      max: 5,
      explanation: `The pattern shows ${n}. A small group can be recognised without counting each dot one by one.`,
      hint: "Look for the whole pattern first.",
    };
  }
  if (type === 1) {
    return {
      skill: "five-frame recognition",
      question: `${name} uses ${card}. Which number does the five-frame show?`,
      visual: fiveFrame(n),
      correct: n,
      wrongs: [Math.max(0, n - 1), Math.min(5, n + 1)],
      max: 5,
      explanation: `${n} spaces are filled in the five-frame, so the card shows ${n}.`,
      hint: "Use the filled spaces and the empty spaces to see the total.",
    };
  }
  if (type === 2) {
    const a = Math.max(1, Math.min(4, seed % 4));
    const b = 5 - a;
    return {
      skill: "part-whole to five",
      question: `${name} sees two parts on ${card}. How many counters are shown altogether?`,
      visual: `${dots(a, "●")}   ${dots(b, "■")}`,
      correct: 5,
      wrongs: [a, b],
      max: 5,
      explanation: `${a} and ${b} make 5 altogether, so the whole group has 5 counters.`,
      hint: "See the two parts, then name the whole.",
    };
  }
  if (type === 3) {
    const same = 1 + ((seed + 2) % 5);
    return {
      skill: "same quantity different arrangement",
      question: `${name} compares ${card}. Which card shows the same number as Card A?`,
      visual: `Card A: ${dots(same, symbol)}\nCard B: ${scatter(Math.max(1, same - 1), symbol)}\nCard C: ${scatter(same, symbol)}`,
      correct: "Card C",
      wrongs: ["Card B", "Neither card"],
      explanation: `Card A and Card C both show ${same}, even though the objects are arranged differently.`,
      hint: "Arrangement can change while the number stays the same.",
    };
  }
  if (type === 4) {
    const dice = ["", "●", "● ●", "●\n ●\n  ●", "● ●\n● ●", "● ●\n ●\n● ●"][n];
    return {
      skill: "dice pattern",
      question: `${name} sees ${card}. Which numeral matches this dice-style pattern?`,
      visual: dice,
      correct: n,
      wrongs: [Math.max(1, n - 1), Math.min(5, n + 1)],
      min: 1,
      max: 5,
      explanation: `This familiar dice-style pattern represents ${n} without needing to count every dot.`,
      hint: "Use the pattern, not one-by-one counting.",
    };
  }
  if (type === 5) {
    return {
      skill: "choose named quantity",
      question: `${name} needs ${numberWords[n]}. Which small card shows that amount?`,
      visual: `A: ${fiveFrame(Math.max(1, n - 1))}\nB: ${fiveFrame(n)}\nC: ${fiveFrame(Math.min(5, n + 1))}`,
      correct: "B",
      wrongs: ["A", "C"],
      explanation: `Card B has ${n} filled spaces, so it shows ${numberWords[n]}.`,
      hint: "Match the word to the quick-look pattern.",
    };
  }
  const a = 1 + (seed % 4);
  return {
    skill: "compare small collections by sight",
    question: `${name} compares two small groups on ${card}. Which group has fewer objects?`,
    visual: `A: ${dots(a, "●")}\nB: ${dots(a + 1, "■")}`,
    correct: "A",
    wrongs: ["B", "They are equal"],
    explanation: `Group A has ${a} and Group B has ${a + 1}, so Group A has fewer.`,
    hint: "For small groups, you can often see the amounts quickly.",
  };
}

function n03Detail(seed, bank) {
  const name = names[(seed + Math.floor(seed / 8)) % names.length];
  const object = objects[(seed + 3 + Math.floor(seed / 8)) % objects.length];
  const symbol = symbols[(seed + 2) % symbols.length];
  const task = `${bank === "test" ? "Check" : "Task"} ${seed + 1}`;
  const type = seed % 8;
  if (type === 0) {
    const n = 6 + ((seed * 3) % 15);
    return {
      skill: "count a collection to 20",
      question: `${name} counts the ${object} in ${task}. How many are there?`,
      visual: scatter(n, symbol),
      correct: n,
      wrongs: [n - 1, Math.min(20, n + 1)],
      explanation: `Counting each object once gives ${n}.`,
      hint: "Track the objects so none are skipped or counted twice.",
    };
  }
  if (type === 1) {
    const n = 8 + ((seed * 2) % 13);
    return {
      skill: "ten-frame counting to 20",
      question: `${name} uses two ten-frames in ${task}. How many counters are shown?`,
      visual: frame20(n),
      correct: n,
      wrongs: [Math.max(0, n - 2), Math.min(20, n + 1)],
      explanation: `The frames show ${Math.min(n, 10)} on the first frame and ${Math.max(0, n - 10)} on the second, making ${n}.`,
      hint: "Count the full ten first, then the extra counters.",
    };
  }
  if (type === 2) {
    const a = 5 + (seed % 8);
    const b = a + 1 + (seed % 5);
    return {
      skill: "compare more by counting",
      question: `${name} compares two collections in ${task}. Which collection has more?`,
      visual: pairLine(a, b),
      correct: "B",
      wrongs: ["A", "They are equal"],
      explanation: `Collection B has ${b}; Collection A has ${a}. ${b} is more than ${a}.`,
      hint: "Count both collections, then compare the totals.",
    };
  }
  if (type === 3) {
    const a = 9 + (seed % 6);
    const b = Math.max(0, a - 2 - (seed % 3));
    return {
      skill: "compare fewer by counting",
      question: `${name} compares two collections in ${task}. Which collection has fewer?`,
      visual: pairLine(a, b),
      correct: "B",
      wrongs: ["A", "They are equal"],
      explanation: `Collection B has ${b}; Collection A has ${a}. ${b} is fewer than ${a}.`,
      hint: "Fewer means the smaller total.",
    };
  }
  if (type === 4) {
    const n = 7 + (seed % 10);
    return {
      skill: "equal collections despite arrangement",
      question: `${name} checks two arrangements in ${task}. Which statement is true?`,
      visual: `A: ${dots(n, "●")}\nB: ${scatter(n, "■")}`,
      correct: "They are equal",
      wrongs: ["A has more", "B has more"],
      explanation: `Both collections have ${n}. Spacing and arrangement do not change the quantity.`,
      hint: "Compare the totals, not the space used.",
    };
  }
  if (type === 5) {
    const kids = 4 + (seed % 8);
    const supplies = kids - 1;
    return {
      skill: "one-to-one matching",
      question: `${task}: ${kids} children each need one ${singular(object)}. There are ${supplies}. Are there enough?`,
      visual: `Children: ${dots(kids, "▲")}\nItems:    ${dots(supplies, "●")}`,
      correct: "No",
      wrongs: ["Yes", "Cannot tell"],
      explanation: `There are ${supplies} items for ${kids} children, so one child would miss out.`,
      hint: "Pair one item with one child and look for leftovers.",
    };
  }
  if (type === 6) {
    const n = 8 + (seed % 10);
    return {
      skill: "cardinality after counting",
      question: `${task}: ${name} points to each ${singular(object)} once and says ${n} last. What does ${n} tell us?`,
      visual: scatter(n, symbol),
      correct: `There are ${n}`,
      wrongs: ["Start counting again", "The objects changed"],
      explanation: `The last number said tells the total number of objects in the collection.`,
      hint: "This is the counting idea called cardinality.",
    };
  }
  const actual = 9 + (seed % 9);
  return {
    skill: "explain a counting mistake",
    question: `${task}: ${name} counts this collection but skips one object. What will happen to the count?`,
    visual: scatter(actual, symbol),
    correct: "The count will be too small",
    wrongs: ["The count will be too large", "The count will stay correct"],
    explanation: `Skipping an object makes the count too small because one object was not included.`,
    hint: "Every object needs exactly one count word.",
  };
}

function buildBank(code, bank) {
  const target = bank === "practice" ? 56 : 24;
  const detailFor = code === "AC9MFN01" ? n01Detail : code === "AC9MFN02" ? n02Detail : n03Detail;
  const start = bank === "test" ? 101 : 0;
  return Array.from({ length: target }, (_, index) => item(code, bank, index, detailFor(start + index, bank)));
}

function writeQuestionFile(file, variable, items) {
  const source = `"use strict";\nwindow.${variable} = ${JSON.stringify(items, null, 2)};\n`;
  fs.writeFileSync(file, source);
}

function validate(code, practice, test) {
  const errors = [];
  for (const [bank, items, expected] of [["practice", practice, 56], ["test", test, 24]]) {
    if (items.length !== expected) errors.push(`${code} ${bank}: expected ${expected}, got ${items.length}`);
    const positions = [0, 0, 0];
    const seen = new Set();
    items.forEach((q) => {
      const key = q.question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + "|" + String(q.visual).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (seen.has(key)) errors.push(`${q.id}: duplicate prompt and visual`);
      seen.add(key);
      if (!q.id || q.curriculumCode !== code || q.bank !== bank) errors.push(`${q.id}: identity mismatch`);
      if (!q.question || q.question.length < 20) errors.push(`${q.id}: weak question`);
      if (!q.explanation || q.explanation.length < 25) errors.push(`${q.id}: weak explanation`);
      if (!Array.isArray(q.answers) || q.answers.length !== 3) errors.push(`${q.id}: answer count`);
      if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 2) errors.push(`${q.id}: correct index`);
      if (q.answers[q.correct] === undefined) errors.push(`${q.id}: correct answer missing`);
      if (new Set(q.answers).size !== q.answers.length) errors.push(`${q.id}: duplicate answers`);
      if (Number.isInteger(q.correct)) positions[q.correct] += 1;
      if (/\[Show/i.test(q.question)) errors.push(`${q.id}: placeholder visual language remains`);
    });
    const spread = Math.max(...positions) - Math.min(...positions);
    if (spread > 1) errors.push(`${code} ${bank}: answer positions imbalanced ${positions.join("/")}`);
  }
  const practiceKeys = new Set(practice.map((q) => `${q.question}|${q.visual}`.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()));
  for (const q of test) {
    if (practiceKeys.has(`${q.question}|${q.visual}`.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())) {
      errors.push(`${q.id}: test duplicates practice prompt and visual`);
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
}

for (const code of codes) {
  const lower = code.toLowerCase();
  const practice = buildBank(code, "practice");
  const test = buildBank(code, "test");
  validate(code, practice, test);
  const dir = path.join(root, "quiz/grade-k/math", lower);
  writeQuestionFile(path.join(dir, "practice/questions.js"), "skillrPracticeQuestions", practice);
  writeQuestionFile(path.join(dir, "test/questions.js"), "skillrTestQuestions", test);
  const rootQuestions = path.join(dir, "questions.js");
  if (fs.existsSync(rootQuestions)) {
    writeQuestionFile(rootQuestions, "quizQuestions", practice);
  }
  console.log(`${code}: ${practice.length} practice, ${test.length} test`);
}

fs.writeFileSync(
  path.join(root, "docs/foundation-maths-n01-n03-question-bank-ixl-standard-2026-09-06.md"),
  [
    "# Foundation Maths AC9MFN01-AC9MFN03 question-bank review",
    "",
    "Updated the live Practice and Test banks for the first three Foundation Maths number codes.",
    "",
    "## IXL benchmark",
    "",
    "- AC9MFN01 now follows early-number IXL-style progression: next/before numbers, missing numbers, zero, numeral-name matching, ten-frame teen numbers and ordering to 20.",
    "- AC9MFN02 now targets quick recognition to 5 using dot patterns, five-frames, dice-style arrangements, same-quantity checks and small more/fewer comparisons.",
    "- AC9MFN03 now targets count-and-compare reasoning to 20: scattered collections, two ten-frames, more/fewer/equal, one-to-one matching, cardinality and counting-error diagnosis.",
    "",
    "All wording is original. The aim is to match the level, clarity, short stems and misconception-based distractors of IXL without copying IXL questions.",
    "",
  ].join("\n")
);
