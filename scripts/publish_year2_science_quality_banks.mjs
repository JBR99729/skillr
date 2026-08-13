import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const NODE = process.execPath;
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/year2-science-data.js"), "utf8"), context);
const units = context.window.SkillrYear2ScienceData;
const titles = Object.fromEntries(Object.entries(units).map(([code, unit]) => [code, unit.title]));

function filesUnder(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function identity(relative, code, title) {
  if (relative === "index.html") return { browser: `${code} ${title} Activities | SkillrHub`, heading: title };
  if (relative === "worksheet/index.html") return { browser: `${code} ${title} Worksheet | SkillrHub`, heading: `${title} worksheet` };
  const bank = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return { browser: `${code} ${title} ${bank} Retake | SkillrHub`, heading: `Retake ${bank.toLowerCase()}: ${title}` };
  if (relative.endsWith("review/index.html")) return { browser: `${code} ${title} ${bank} Review | SkillrHub`, heading: `Review ${bank.toLowerCase()} answers: ${title}` };
  if (relative.endsWith("result/index.html")) return { browser: `${code} ${title} ${bank} Result | SkillrHub`, heading: `${title} ${bank.toLowerCase()} result` };
  return { browser: `${code} ${title} ${bank} | SkillrHub`, heading: title };
}

for (const [code, title] of Object.entries(titles)) {
  const lower = code.toLowerCase();
  const route = path.join(ROOT, "quiz", "year-2", "science", lower);
  execFileSync(NODE, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year2/science/${lower}.json`], { cwd: ROOT, stdio: "inherit" });
  for (const bank of ["practice", "test"]) {
    const file = path.join(route, bank, "index.html");
    let html = fs.readFileSync(file, "utf8");
    const attempt = bank === "practice" ? 8 : 12;
    const count = bank === "practice" ? 24 : 16;
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${bank === "practice" ? `Practise ${title} with 8 rotating questions from a 24-question bank.` : `Take a 12-question ${title} test drawn from a separate 16-question bank.`}">`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${count}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":(?:true|false)/, `"shuffleQuestions":true`)
      .replace(/"questionCycle":(?:true|false)/, `"questionCycle":true`)
      .replace(/<script>window\.skillrYear2ScienceBankConfig=[\s\S]*?<\/script>/, "")
      .replace(/<script src="\/assets\/year2-science-authored-banks[^>]*><\/script>/g, "")
      .replace(/<script src="\/assets\/year2-science-bank-loader[^>]*><\/script>/g, "")
      .replace(/<script src="[^\"]*\/(?:practice\/)?questions\.js(?:\?[^\"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-2/science/${lower}/${bank}/questions.js?v=20260813-production-v1"></script><script src="/quiz/assets/production-question-ui.js?v=1"></script>$&`);
    fs.writeFileSync(file, html);
  }
  for (const file of filesUnder(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const page = identity(relative, code, title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.browser}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${page.heading}</h1>`)
      .replace(/Choose a learning activity\. Worksheet, Practice and Test use the same eight-question unit bank\./g, "Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws 12 from a separate 16-question bank.")
      .replace(/This QA-reviewed unit provides \d+ Practice questions, \d+ auto-marked Test questions[^<]*/g, "This QA-reviewed unit provides 24 Practice questions and 16 separate Test questions.")
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ codes: Object.keys(titles).length, practiceAttempt: 8, testAttempt: 12, status: "PUBLISHED" }, null, 2));
