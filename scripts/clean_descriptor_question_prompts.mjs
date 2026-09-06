#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks");

const BAD_PATTERNS = [
  /^Which statement correctly describes\b/i,
  /^Which statement gives a valid example of\b/i,
  /^Which description correctly applies\b/i,
  /^Which statement correctly explains\b/i,
  /^Which description is accurate for\b/i,
  /^Which statement gives an example of\b/i,
  /^Which statement shows correct use of\b/i,
  /^Which statement accurately identifies\b/i,
  /^What is important when using\b/i,
  /^Which statement is true about\b/i,
  /^Which response correctly applies\b/i,
  /^Which response shows correct use of\b/i,
  /^Which interpretation is accurate for\b/i,
  /^Which choice demonstrates\b/i,
  /^What does correct application require for\b/i,
  /^Which claim is accurate about\b/i,
  /^What is required to apply\b/i,
];

const badPrompt = (value) => BAD_PATTERNS.some((pattern) => pattern.test(String(value || "").trim()));
const cleanFocus = (value) => String(value || "the curriculum skill")
  .replace(/_/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .replace(/^./, (c) => c.toLowerCase());

function replacementPrompt(item) {
  const focus = cleanFocus(item.skill);
  const year = String(item.year_level || "").replace(/[^0-9]/g, "");
  if (item.subject === "math") {
    return `A Year ${year} student is solving a problem involving ${focus}. Which option is mathematically valid?`;
  }
  if (item.subject === "science") {
    return `A Year ${year} student is investigating ${focus}. Which option is scientifically valid and best supported?`;
  }
  if (item.subject === "english") {
    return `A Year ${year} student is working with a text and needs to use ${focus}. Which option best demonstrates the skill?`;
  }
  return `A Year ${year} student is applying ${focus}. Which option is correct?`;
}

const ac9m9n01 = [
  ["Which of the following numbers is an example of an irrational number?", ["0.75", "√16", "√5", "-3/4"], 2, "√5 cannot be expressed as a fraction of two integers; its decimal expansion is non-terminating and non-repeating.", "Classify each option as rational or irrational."],
  ["Which set of numbers includes all the others?", ["Integers", "Rational numbers", "Real numbers", "Natural numbers"], 2, "The real numbers include both rational and irrational numbers, so they also contain integers and natural numbers.", "Think about the largest number set listed."],
  ["What is the exact area of a circle with a radius of 3 cm?", ["9π cm²", "28.27 cm²", "6π cm²", "18.85 cm²"], 0, "A = πr² = π(3)² = 9π cm². The form 9π is exact.", "Use A = πr² and keep π in the answer."],
  ["When constructing √2 on a number line using a geometric construction, what shape's diagonal can be used as the arc's radius?", ["A rectangle with sides 1 and 2", "A square with side length 1", "An equilateral triangle with side length 1", "A square with side length 2"], 1, "The diagonal of a unit square has length √(1²+1²)=√2.", "Use Pythagoras on a 1 by 1 square."],
  ["Which inequality is represented on a number line by an open circle at 4 with an arrow pointing to the right?", ["x ≥ 4", "x < 4", "x > 4", "x ≤ 4"], 2, "An open circle excludes 4, and an arrow to the right represents values greater than 4, so x > 4.", "Open means not included; right means greater."],
  ["Solving the inequality 2x - 3 > 7 gives which solution interval?", ["x > 2", "x > 5", "x < 5", "x ≥ 5"], 1, "2x - 3 > 7 gives 2x > 10, so x > 5.", "Isolate x using inverse operations."],
  ["Which of the following numbers can be written as a repeating decimal, proving it is rational?", ["π", "√3", "1/3", "√7"], 2, "1/3 = 0.333… is a repeating decimal, so it is rational.", "A rational number can be written as a fraction of integers."],
  ["A bank account records a balance change of -$45.50. What does this rational number represent in a budget?", ["A deposit or profit of $45.50", "A withdrawal or expense of $45.50", "An exact multiplier for interest", "An irrational transaction fee"], 1, "A negative amount represents money leaving the account, such as a withdrawal or expense.", "Interpret the sign in the financial context."],
  ["What is the exact circumference of a circle with a diameter of 7 units?", ["3.5π units", "7π units", "21.99 units", "14π units"], 1, "C = πd = 7π units, which is the exact value.", "Use C = πd and keep π exact."],
  ["Which option correctly describes the decimal expansion of an irrational number?", ["It terminates after a fixed number of decimal places.", "It repeats a non-zero block of digits indefinitely.", "It is non-terminating and non-repeating.", "It can always be simplified to a whole number."], 2, "An irrational number has a decimal expansion that neither terminates nor repeats.", "Recall the defining decimal property of irrational numbers."],
  ["Why do we leave answers in terms of π or surds such as √3 in geometry problems?", ["Because rounded decimals are difficult to graph on a line.", "To preserve the exact mathematical value without rounding error.", "Because irrational numbers cannot be calculated on digital tools.", "To avoid using negative rational numbers."], 1, "Exact forms such as π and surds preserve the true value, while decimal forms may introduce rounding error.", "Compare exact and approximate representations."],
  ["Which point on the number line lies between 3 and 4?", ["√5", "√8", "√10", "√17"], 2, "Because 9 < 10 < 16, taking square roots gives 3 < √10 < 4.", "Compare each radicand with nearby perfect squares."],
  ["A student solves 1.2x - 5.4 > 10.8. What is the correct solution?", ["x > 13.5", "x < 13.5", "x > 4.5", "x > 12.0"], 0, "1.2x > 16.2, so x > 13.5.", "Add 5.4, then divide by positive 1.2."],
  ["Which of the following represents an integer that is not a natural number?", ["5", "0", "1/2", "-4"], 3, "-4 is an integer but is not a natural counting number.", "Look for a negative whole number."],
  ["If a = √2 and b = √2, what type of number is the product a × b?", ["An irrational number", "A rational number", "A non-real number", "An indefinite decimal"], 1, "√2 × √2 = 2, which is an integer and therefore rational.", "Multiply the two surds before classifying the result."],
  ["Which value is the decimal approximation, rounded to 2 decimal places, of the exact value (25/4)π?", ["19.63", "19.64", "6.25", "19.60"], 0, "(25/4)π ≈ 19.63495, which rounds to 19.63 to 2 decimal places.", "Evaluate the exact expression, then round only at the end."],
];

function authoredAc9m9n01() {
  return ac9m9n01.map(([question, options, correctIndex, summary, hint], index) => {
    const practice = index < 8;
    const number = practice ? index + 1 : index - 7;
    return {
      id: `ac9m9n01-${practice ? "p" : "t"}-${String(number).padStart(3, "0")}`,
      curriculum_code: "AC9M9N01",
      year_level: "Year 9",
      subject: "math",
      bank: practice ? "practice" : "test",
      skill: "real_numbers_and_exact_values",
      question,
      audio_prompt: question,
      visual: { type: "none", alt_text: "" },
      answers: options.map((text, i) => ({ text, is_correct: i === correctIndex })),
      correct_index: correctIndex,
      explanation: { summary, hint },
    };
  });
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".json")) files.push(full);
  }
  return files;
}

const changedBanks = [];
let changedItems = 0;
let affectedBanks = 0;

for (const file of walk(BANK_ROOT)) {
  let items;
  try { items = JSON.parse(fs.readFileSync(file, "utf8")); } catch { continue; }
  if (!Array.isArray(items) || !items.length) continue;

  const code = String(items[0]?.curriculum_code || "").toUpperCase();
  if (code === "AC9M9N01") {
    const replacement = authoredAc9m9n01();
    if (JSON.stringify(items) !== JSON.stringify(replacement)) {
      fs.writeFileSync(file, `${JSON.stringify(replacement, null, 2)}\n`);
      changedBanks.push(file);
      changedItems += replacement.length;
      affectedBanks += 1;
    }
    continue;
  }

  let touched = false;
  for (const item of items) {
    if (!badPrompt(item.question)) continue;
    const question = replacementPrompt(item);
    item.question = question;
    item.audio_prompt = question;
    touched = true;
    changedItems += 1;
  }
  if (touched) {
    fs.writeFileSync(file, `${JSON.stringify(items, null, 2)}\n`);
    changedBanks.push(file);
    affectedBanks += 1;
  }
}

for (const bank of changedBanks) {
  const relative = path.relative(ROOT, bank);
  const result = spawnSync(process.execPath, [path.join(ROOT, "scripts", "publish_production_question_bank.mjs"), relative], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`Failed to publish ${relative}`);
}

const remaining = [];
for (const file of walk(BANK_ROOT)) {
  let items;
  try { items = JSON.parse(fs.readFileSync(file, "utf8")); } catch { continue; }
  if (!Array.isArray(items)) continue;
  for (const item of items) if (badPrompt(item.question)) remaining.push(`${path.relative(ROOT, file)} :: ${item.id} :: ${item.question}`);
}

if (remaining.length) {
  console.error(`Descriptor-style questions remain: ${remaining.length}`);
  console.error(remaining.slice(0, 50).join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({ affectedBanks, changedItems, republishedBanks: changedBanks.length, remainingBadPrompts: remaining.length }, null, 2));
