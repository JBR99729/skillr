"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "assets/year2-science-authored-banks.js"), "utf8"), context);
const expected = { practice: 28, test: 12, quiz: 50 };
const supported = new Set(["single", "multiple", "true-false", "fill-blank", "text", "order", "match"]);
const problems = [];
for (const code of ["AC9S2U01", "AC9S2U02", "AC9S2U03"]) {
  const banks = context.window.SkillrYear2ScienceBanks?.[code];
  if (!banks) { problems.push(`${code}: missing banks`); continue; }
  const ids = new Set();
  const prompts = new Map();
  for (const [bank, questions] of Object.entries(banks)) {
    if (questions.length !== expected[bank]) problems.push(`${code} ${bank}: expected ${expected[bank]}, found ${questions.length}`);
    for (const question of questions) {
      if (ids.has(question.id)) problems.push(`${code}: duplicate ID ${question.id}`);
      ids.add(question.id);
      const prompt = question.question.toLowerCase().replace(/\s+/g, " ").trim();
      if (prompts.has(prompt)) problems.push(`${code}: exact prompt overlap ${prompts.get(prompt)} / ${question.id}`);
      prompts.set(prompt, question.id);
      if (!supported.has(question.type)) problems.push(`${question.id}: unsupported type ${question.type}`);
      if (!Array.isArray(question.answers) || question.answers.length < 2) problems.push(`${question.id}: invalid answers`);
      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.answers.length) problems.push(`${question.id}: invalid correct index`);
      if (!question.explanation?.trim()) problems.push(`${question.id}: missing explanation`);
      if (/(?:please |now )?(?:draw|demonstrate|ask your teacher|show your teacher|check your own answer)/i.test(question.question) && !/drawing|drawings|children draw/i.test(question.question)) problems.push(`${question.id}: teacher-dependent or open performance prompt`);
      if (question.visualHtml && (!/role="img"/.test(question.visualHtml) || !/aria-label="[^"]+"/.test(question.visualHtml) || !/width="(?:[5-9]\d|[1-9]\d{2,})"/.test(question.visualHtml) || !/height="(?:[5-9]\d|[1-9]\d{2,})"/.test(question.visualHtml))) problems.push(`${question.id}: inaccessible or undersized SVG`);
    }
  }
  for (const bank of Object.keys(expected)) {
    const route = path.join(root, `quiz/year-2/science/${code.toLowerCase()}/${bank === "quiz" ? "quiz" : bank}/index.html`);
    if (!fs.existsSync(route)) problems.push(`${code}: missing ${bank} route`);
  }
  if (!fs.existsSync(path.join(root, `quiz/year-2/science/${code.toLowerCase()}/worksheet/index.html`))) problems.push(`${code}: missing worksheet source route`);
}
const pwa = fs.readFileSync(path.join(root, "pwa-register.js"), "utf8");
for (const asset of ["year2-science-authored-banks.js?v=20260813-qa1", "year2-science-bank-loader.js?v=20260813-qa1", "year2-science-quiz-page.js?v=20260813-qa1"]) if (!pwa.includes(asset)) problems.push(`PWA route is missing ${asset}`);
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("Year 2 Science batch 1 QA passed: 3 codes, 84 Practice, 36 Test, 150 Quiz questions.");
