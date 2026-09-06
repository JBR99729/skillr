import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", "year1-english-data.js"), "utf8"), context);
const units = context.window.SkillrYear1EnglishData;

function listHtml(items) { return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`; }
function notesFor(unit) {
  return [
    unit.learn,
    `Use this routine: ${unit.routine}.`,
    `Watch for ${unit.mistakes[0][0].toLowerCase()}: ${unit.mistakes[0][1]}`
  ];
}

function htmlFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function pageIdentity(relative, code, title) {
  if (relative === "index.html") return { browser: `${code} ${title} Activities | SkillrHub`, heading: title, noteHeading: "Unit focus" };
  if (relative === "worksheet/index.html") return { browser: `${code} ${title} Worksheet | SkillrHub`, heading: `${title} worksheet`, noteHeading: "Unit focus" };
  const bank = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return { browser: `${code} ${title} ${bank} Retake | SkillrHub`, heading: `Retake ${bank.toLowerCase()}: ${title}`, noteHeading: "Before you restart" };
  if (relative.endsWith("review/index.html")) return { browser: `${code} ${title} ${bank} Review | SkillrHub`, heading: `Review ${bank.toLowerCase()} answers: ${title}`, noteHeading: "Unit focus" };
  if (relative.endsWith("result/index.html")) return { browser: `${code} ${title} ${bank} Result | SkillrHub`, heading: `${title} ${bank.toLowerCase()} result`, noteHeading: "Unit focus" };
  return { browser: `${code} ${title} ${bank} | SkillrHub`, heading: title, noteHeading: "Quick preparation" };
}

for (const [code, unit] of Object.entries(units)) {
  const codeLower = code.toLowerCase();
  const bank = `assets/assessment-banks/year1/english/${codeLower}.json`;
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", bank], { cwd: ROOT, stdio: "inherit" });
  const route = path.join(ROOT, "quiz", "year-1", "english", codeLower);
  const notes = notesFor(unit);

  const activityFile = path.join(route, "index.html");
  let activity = fs.readFileSync(activityFile, "utf8");
  activity = activity
    .replace(/<p>Choose a learning activity\. Worksheet, Practice and Test use the same eight-question unit bank\.<\/p>/, `<p>Choose a learning activity. Practice draws from 24 questions, while Test uses a separate 16-question bank.</p>`)
    .replace(/<p>This QA-reviewed unit provides \d+ Practice questions, \d+ auto-marked Test questions[^<]*<\/p>/, `<p>This QA-reviewed unit provides 24 Practice questions and 16 separate Test questions.</p>`)
    .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Unit focus</h2>${listHtml(notes)}</section>`);
  fs.writeFileSync(activityFile, activity);

  for (const bankName of ["practice", "test"]) {
    const file = path.join(route, bankName, "index.html");
    let html = fs.readFileSync(file, "utf8");
    const isTest = bankName === "test";
    const attempt = isTest ? 12 : 8;
    const bankCount = isTest ? 16 : 24;
    const description = isTest
      ? `Take a 12-question Year 1 ${unit.title} test drawn from a separate 16-question bank.`
      : `Practise Year 1 ${unit.title} with rotating questions from a 24-question bank.`;
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Quick preparation</h2>${listHtml(notes)}</section>`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${bankCount}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":false/, `"shuffleQuestions":true`)
      .replace(/"questionCycle":false/, `"questionCycle":true`)
      .replace(/questions\.js\?v=[^"]+/, `questions.js?v=20260813-production-v2`);
    fs.writeFileSync(file, html);
  }

  for (const file of htmlFiles(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const identity = pageIdentity(relative, code, unit.title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${identity.browser}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${identity.heading}</h1>`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>${identity.noteHeading}</h2>${listHtml(notes)}</section>`)
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.")
      .replace(/try the eight questions again/gi, "try a fresh attempt");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ codes: Object.keys(units).length, practiceBank: 24, testBank: 16, practiceAttempt: 8, testAttempt: 12, status: "PUBLISHED" }, null, 2));
