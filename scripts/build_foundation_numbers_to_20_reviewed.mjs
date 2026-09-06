import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const input = process.argv[2];
if (!input) throw new Error("Pass the reviewed Markdown file as the first argument.");

const markdown = fs.readFileSync(path.resolve(input), "utf8");
const dayMatches = [...markdown.matchAll(/#### Day (\d+)[^\n]*\n([\s\S]*?)(?=\n#### Day |\n### Days |$)/g)];
if (dayMatches.length !== 30) throw new Error(`Expected 30 days; found ${dayMatches.length}.`);

const fixes = new Map([
  ["2-3", { correct: "11" }], ["3-3", { correct: "12" }],
  ["3-5", { correct: "8" }], ["3-6", { correct: "14" }],
  ["5-3", { correct: "14" }],
  ["5-5", { question: "Missing middle: 18, ___, 20", options: ["18", "19", "20"], correct: "19" }],
  ["6-7", { options: ["10", "11", "12"], correct: "11" }],
  ["9-7", { options: ["8", "9", "10"], correct: "9" }],
  ["12-7", { options: ["11", "12", "13"], correct: "12" }],
  ["10-6", { correct: "2" }], ["11-6", { correct: "14" }],
  ["11-8", { correct: "2" }], ["13-3", { correct: "17" }],
  ["16-3", { correct: "18" }], ["17-8", { correct: "7" }],
  ["19-2", { options: ["0", "2", "1"], correct: "0" }],
  ["21-2", { options: ["18", "19", "20"], correct: "20" }],
  ["23-8", { correct: "15" }],
  ["25-2", { options: ["18", "20", "19"], correct: "20" }],
  ["27-5", { question: "Backward sequence: 20, 19, ___", options: ["17", "18", "20"], correct: "18" }],
  ["29-2", { options: ["18", "20", "19"], correct: "20" }],
  ["29-3", { correct: "11" }],
  ["29-7", { options: ["1", "0", "2"], correct: "1" }],
  ["30-2", { options: ["19", "18", "20"], correct: "20" }],
]);

const items = [];
for (const [, dayText, body] of dayMatches) {
  const day = Number(dayText);
  const questionMatches = [...body.matchAll(/^\d+\. \*\*(.*?)\*\*([^\n]*)\n\s+- ([^\n]*)\n\s+- \*\*Read[^:]*:\*\* ([^\n]*)/gm)];
  if (questionMatches.length !== 8) throw new Error(`Day ${day}: expected 8 questions; found ${questionMatches.length}.`);

  questionMatches.forEach((match, qIndex) => {
    const number = qIndex + 1;
    let question = `${match[1]} ${match[2]}`.replace(/\\_\\_\\_|_+/g, "___").replace(/\s+/g, " ").trim();
    const optionLine = match[3];
    const marked = optionLine.match(/\*\*([ABC])\s+([^*]+?)\s*(?:·)?\*\*/);
    if (!marked) throw new Error(`Day ${day} question ${number}: no marked answer.`);
    let options = optionLine.replaceAll("**", "").split(/\s*·\s*/).map(part => part.replace(/^[ABC]\s+/, "").trim());
    let correct = marked[2].replace(/\s*·\s*$/, "").trim();
    const fix = fixes.get(`${day}-${number}`);
    if (fix?.question) question = fix.question;
    if (fix?.options) options = fix.options;
    if (fix?.correct) correct = fix.correct;
    if (new Set(options).size !== 3) throw new Error(`Day ${day} question ${number}: duplicate options.`);
    if (!options.includes(correct)) throw new Error(`Day ${day} question ${number}: answer ${correct} missing from ${options.join(", ")}.`);

    // Rotate answer positions to an exact 80/80/80 balance without changing content.
    const target = (items.length * 17 + 1) % 3;
    const distractors = options.filter(option => option !== correct);
    const ordered = [...distractors];
    ordered.splice(target, 0, correct);
    const comparison = /more|less|same|smallest|largest|first|middle|last/i.test(question);
    const sequence = /next|missing|sequence/i.test(question);
    const curriculumCode = comparison ? "AC9MFN03" : "AC9MFN01";
    const summary = sequence
      ? `${correct} completes the number sequence.`
      : comparison
        ? `${correct} is the correct comparison or position.`
        : `${correct} matches the number shown or counted.`;
    const hint = sequence ? "Count forwards or backwards one step at a time."
      : comparison ? "Use a number line: numbers farther right are greater."
      : "Point to each object once as you count.";

    items.push({
      id: `F-N20-D${String(day).padStart(2, "0")}-Q${String(number).padStart(2, "0")}`,
      curriculumCode, bank: "reviewed-daily-drill", topic: "numbers-to-20",
      skill: sequence ? "number_sequence" : comparison ? "compare_and_order" : "count_and_recognise",
      set: day - 1, difficulty: day <= 10 ? "easy" : day <= 20 ? "core" : "application",
      type: "single", question, visual: null,
      answers: ordered.map(text => ({ text, label: text, is_correct: text === correct })),
      correct_index: target,
      explanation: { summary, hint },
      audio_prompt: match[4].replace(/[“”]/g, "").trim(),
      printable: true, source: "educator-reviewed-2026-09"
    });
  });
}

if (items.length !== 240) throw new Error(`Expected 240 questions; found ${items.length}.`);
const counts = [0, 1, 2].map(index => items.filter(item => item.correct_index === index).length);
if (!counts.every(count => count === 80)) throw new Error(`Unbalanced answers: ${counts.join("/")}.`);

const output = `"use strict";\n(() => {\n  window.SkillrDailyProductionBanks = window.SkillrDailyProductionBanks || {};\n  window.SkillrDailyProductionBanks.F = window.SkillrDailyProductionBanks.F || {};\n  window.SkillrDailyProductionBanks.F.math = window.SkillrDailyProductionBanks.F.math || {};\n  window.SkillrDailyProductionBanks.F.math["numbers-to-20"] = ${JSON.stringify(items, null, 2)};\n})();\n`;
fs.writeFileSync(path.join(root, "quiz/assets/daily-drills/foundation-numbers-to-20-reviewed.js"), output);
console.log(`Built ${items.length} reviewed Foundation Numbers to 20 questions.`);
