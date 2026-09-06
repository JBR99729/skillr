import fs from "node:fs";
import vm from "node:vm";

const file = new URL("../quiz/assets/daily-drills/foundation-numbers-to-20-reviewed.js", import.meta.url);
const source = fs.readFileSync(file, "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const bank = context.window.SkillrDailyProductionBanks?.F?.math?.["numbers-to-20"];
if (!Array.isArray(bank) || bank.length !== 240) throw new Error(`Expected 240 questions; found ${bank?.length}.`);
for (let set = 0; set < 30; set += 1) {
  const questions = bank.filter(item => item.set === set);
  if (questions.length !== 8) throw new Error(`Set ${set + 1} has ${questions.length} questions.`);
}
if (new Set(bank.map(item => item.id)).size !== 240) throw new Error("Question IDs are not unique.");
for (const item of bank) {
  if (item.type !== "single" || item.answers.length !== 3) throw new Error(`${item.id}: invalid choice format.`);
  if (new Set(item.answers.map(answer => answer.label)).size !== 3) throw new Error(`${item.id}: duplicate choices.`);
  if (item.answers.filter(answer => answer.is_correct).length !== 1) throw new Error(`${item.id}: invalid answer key.`);
  if (!item.answers[item.correct_index]?.is_correct) throw new Error(`${item.id}: correct_index mismatch.`);
  const numbers = `${item.question} ${item.answers.map(a => a.label).join(" ")}`.match(/\b\d+\b/g)?.map(Number) || [];
  if (numbers.some(number => number < 0 || number > 20)) throw new Error(`${item.id}: number outside 0–20.`);
}
const positions = [0, 1, 2].map(index => bank.filter(item => item.correct_index === index).length);
if (!positions.every(count => count === 80)) throw new Error(`Answer positions are ${positions.join("/")}.`);
console.log(`Validated 30 days × 8 questions; answer positions ${positions.join("/")}.`);
