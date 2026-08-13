#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["assets/year4-maths-data-base.js", "assets/year4-maths-data-n1.js", "assets/year4-maths-data-n2.js", "assets/year4-maths-data-n3.js", "assets/year4-maths-data-a.js", "assets/year4-maths-data-m1.js", "assets/year4-maths-data-m2.js", "assets/year4-maths-data-sp.js", "assets/year4-maths-data-st.js", "assets/year4-maths-data-p.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
}
const units = sandbox.window.SkillrYear4MathsData;
const order = sandbox.window.SkillrYear4MathsOrder;
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const list = (values) => `<ul>${values.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>`;

function htmlFiles(root) {
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) result.push(full);
  }
  return result;
}

function identity(relative, code, title) {
  if (relative === "index.html") return [`${code} ${title} Activities | SkillrHub`, title, "Unit focus"];
  if (relative === "worksheet/index.html") return [`${code} ${title} Worksheet | SkillrHub`, `${title} worksheet`, "Unit focus"];
  const bank = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return [`${code} ${title} ${bank} Retake | SkillrHub`, `Retake ${bank.toLowerCase()}: ${title}`, "Before you restart"];
  if (relative.endsWith("review/index.html")) return [`${code} ${title} ${bank} Review | SkillrHub`, `Review ${bank.toLowerCase()} answers: ${title}`, "Unit focus"];
  if (relative.endsWith("result/index.html")) return [`${code} ${title} ${bank} Result | SkillrHub`, `${title} ${bank.toLowerCase()} result`, "Unit focus"];
  return [`${code} ${title} ${bank} | SkillrHub`, title, "Quick preparation"];
}

for (const code of order) {
  const lower = code.toLowerCase();
  const unit = units[code];
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year4/math/${lower}.json`], { cwd: ROOT, stdio: "inherit" });
  const route = path.join(ROOT, "quiz", "year-4", "math", lower);
  const notes = [unit.learn, `Use this routine: ${unit.routine}.`, `Watch for ${unit.mistakes[0][0].toLowerCase()}: ${unit.mistakes[0][1]}`];

  for (const bank of ["practice", "test"]) {
    const file = path.join(route, bank, "index.html");
    let html = fs.readFileSync(file, "utf8");
    const isTest = bank === "test";
    const attempt = isTest ? 12 : 8;
    const total = isTest ? 16 : 24;
    const description = isTest ? `Take a 12-question Year 4 ${unit.title} test drawn from a separate 16-question bank.` : `Practise Year 4 ${unit.title} with rotating questions from a 24-question bank.`;
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Quick preparation</h2>${list(notes)}</section>`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${total}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":false/, `"shuffleQuestions":true`)
      .replace(/"questionCycle":false/, `"questionCycle":true`)
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="[^"]*\/practice\/questions\.js(?:\?[^"]*)?"><\/script>/, `<script src="/quiz/year-4/math/${lower}/${bank}/questions.js?v=20260813-maths-production-v1"></script>`)
      .replace(/questions\.js\?v=[^"]+/, `questions.js?v=20260813-maths-production-v1`);
    fs.writeFileSync(file, html);
  }

  const activityFile = path.join(route, "index.html");
  let activity = fs.readFileSync(activityFile, "utf8");
  activity = activity
    .replace(/<p>Choose a learning activity\.[\s\S]*?<\/p>/, `<p>Choose a learning activity. Practice draws from 24 questions, while Test uses a separate 16-question bank.</p>`)
    .replace(/<p>This QA-reviewed unit provides[^<]*<\/p>/, `<p>This unit provides 24 Practice questions and 16 separate Test questions.</p>`);
  fs.writeFileSync(activityFile, activity);

  for (const file of htmlFiles(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const [browserTitle, heading, noteHeading] = identity(relative, code, unit.title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(browserTitle)}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${esc(heading)}</h1>`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>${noteHeading}</h2>${list(notes)}</section>`)
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.")
      .replace(/try the eight questions again/gi, "try a fresh attempt")
      .replace(/QA complete|QA-complete|quality assured/gi, "");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ codes: order.length, practiceBank: 24, testBank: 16, practiceAttempt: 8, testAttempt: 12, status: "PUBLISHED" }, null, 2));
