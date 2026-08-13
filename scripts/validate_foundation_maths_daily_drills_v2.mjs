import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "curriculum-question-banks/banks/foundation/foundation-maths-production-v2.json"),
    "utf8"
  )
);
const svg = fs.readFileSync(
  path.join(ROOT, "quiz/assets/daily-drills/foundation-maths-visuals-v2.svg"),
  "utf8"
);
const generatedPath = path.join(
  ROOT,
  "quiz/assets/daily-drills/foundation-maths-production-v2.js"
);
const generated = fs.readFileSync(generatedPath, "utf8");
const symbols = new Set([...svg.matchAll(/<symbol\s+id="([^"]+)"/g)].map((match) => match[1]));
const sourceItems = source.topics.flatMap((topic) => topic.items);
const sourceIds = new Set(sourceItems.map((item) => item.id));
const visualItems = sourceItems.filter((item) => item.visual);

const context = {
  window: { speechSynthesis: {} },
  document: { addEventListener() {} },
  SpeechSynthesisUtterance: function SpeechSynthesisUtterance() {}
};
vm.createContext(context);
vm.runInContext(generated, context);
const banks = context.window.SkillrDailyProductionBanks?.F?.math;
const runtimeItems = Object.values(banks || {}).flat();

const problems = [];
if (source.item_count !== 1642 || sourceItems.length !== 1642) problems.push("Expected 1,642 source items");
if (sourceIds.size !== sourceItems.length) problems.push("Source IDs are not unique");
if (symbols.size !== 1308) problems.push("Expected 1,308 SVG symbols");
if (visualItems.length !== 1308) problems.push("Expected 1,308 visual items");
for (const item of visualItems) {
  if (!symbols.has(item.visual.symbol_id)) problems.push(`Missing symbol ${item.visual.symbol_id}`);
}
if (runtimeItems.length !== sourceItems.length) problems.push("Generated runtime item count mismatch");
if (new Set(runtimeItems.map((item) => item.id)).size !== runtimeItems.length) problems.push("Runtime IDs are not unique");

for (const topic of source.topics) {
  const page = fs.readFileSync(
    path.join(ROOT, `quiz/grade-k/daily-drills/math/${topic.slug}/index.html`),
    "utf8"
  );
  if (!page.includes("foundation-maths-production-v2.js?v=1")) {
    problems.push(`${topic.slug} does not load the production bank`);
  }
  if (!page.includes("daily-drill-selector.js?v=5")) {
    problems.push(`${topic.slug} does not load selector v5`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({ topics: source.topics.length, items: sourceItems.length, visuals: visualItems.length, status: "passed" }));
