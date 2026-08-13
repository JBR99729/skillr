import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const context = { window: {} };
vm.createContext(context);
for (const file of ["assets/year4-subject-data-base.js","assets/year4-english-data-la1.js","assets/year4-english-data-la2.js","assets/year4-english-data-le.js","assets/year4-english-data-ly1.js","assets/year4-english-data-ly2.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT,file),"utf8"),context,{filename:file});
const units = context.window.SkillrYear4EnglishData;
const codes = context.window.SkillrYear4EnglishOrder;

function listHtml(items) { return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`; }
function notesFor(unit) {
  return [unit.learn, `Use this routine: ${unit.routine}.`, `Watch for ${unit.mistakes[0][0].toLowerCase()}: ${unit.mistakes[0][1]}`];
}
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
  if (relative === "index.html") return { browser: `${code} ${title} Activities | SkillrHub`, heading: title, notes: "Unit focus" };
  if (relative === "worksheet/index.html") return { browser: `${code} ${title} Worksheet | SkillrHub`, heading: `${title} worksheet`, notes: "Unit focus" };
  if (relative.startsWith("quiz/")) return null;
  const bank = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return { browser: `${code} ${title} ${bank} Retake | SkillrHub`, heading: `Retake ${bank.toLowerCase()}: ${title}`, notes: "Before you restart" };
  if (relative.endsWith("review/index.html")) return { browser: `${code} ${title} ${bank} Review | SkillrHub`, heading: `Review ${bank.toLowerCase()} answers: ${title}`, notes: "Unit focus" };
  if (relative.endsWith("result/index.html")) return { browser: `${code} ${title} ${bank} Result | SkillrHub`, heading: `${title} ${bank.toLowerCase()} result`, notes: "Unit focus" };
  return { browser: `${code} ${title} ${bank} | SkillrHub`, heading: title, notes: "Quick preparation" };
}

for (const code of codes) {
  const unit = units[code];
  const lower = code.toLowerCase();
  const route = path.join(ROOT, "quiz", "year-4", "english", lower);
  const bankFile = `assets/assessment-banks/year4/english/${lower}.json`;
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", bankFile], { cwd: ROOT, stdio: "inherit" });
  const notes = notesFor(unit);

  const activityFile = path.join(route, "index.html");
  let activity = fs.readFileSync(activityFile, "utf8");
  activity = activity
    .replace(/<p>Choose a learning activity\.[\s\S]*?<\/p>/, `<p>Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws 12 questions from a separate 16-question bank.</p>`)
    .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Unit focus</h2>${listHtml(notes)}</section>`);
  fs.writeFileSync(activityFile, activity);

  for (const bank of ["practice", "test"]) {
    const file = path.join(route, bank, "index.html");
    const attempt = bank === "practice" ? 8 : 12;
    const count = bank === "practice" ? 24 : 16;
    const description = bank === "practice"
      ? `Practise Year 4 ${unit.title} with 8 rotating questions from a 24-question bank.`
      : `Take a 12-question Year 4 ${unit.title} test drawn from a separate 16-question bank.`;
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Quick preparation</h2>${listHtml(notes)}</section>`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${count}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":(?:true|false)/, `"shuffleQuestions":true`)
      .replace(/"questionCycle":(?:true|false)/, `"questionCycle":${bank === "practice" ? "true" : "false"}`)
      .replace(/<script>window\.skillrYear4EnglishBankConfig=[\s\S]*?<\/script>/g, "")
      .replace(/<script src="\/assets\/year4-english-authored-banks[^>]*><\/script>/g, "")
      .replace(/<script src="\/assets\/year4-english-bank-loader[^>]*><\/script>/g, "")
      .replace(/<script src="[^\"]*\/(?:practice\/)?questions\.js(?:\?[^\"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/assets\/year4-english-assessment-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-4/english/${lower}/${bank}/questions.js?v=20260813-year4-english-v1"></script>$&`);
    fs.writeFileSync(file, html);
  }

  for (const file of filesUnder(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const page = identity(relative, code, unit.title);
    if (!page) continue;
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.browser}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${page.heading}</h1>`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>${page.notes}</h2>${listHtml(notes)}</section>`)
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.")
      .replace(/try the eight questions again/gi, "try a fresh attempt")
      .replace(/same eight(?:-question unit bank| questions used in Practice and Test)/gi, "separate banks aligned to this curriculum code")
      .replace(/Practice rotates through \d+ questions, Test uses \d+ questions(?:, and Quiz rotates through \d+ questions)?\./g, "Practice rotates 8 questions from a 24-question bank. Test draws 12 questions from a separate 16-question bank.");
    if (relative === "worksheet/index.html") {
      html = html
        .replace(/<p>Download a worksheet containing[^<]*<\/p>/, "<p>Download a separate 8-question worksheet aligned to this curriculum code.</p>")
        .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Download a separate Year 4 ${unit.title} worksheet aligned to ${code}.">`);
    }
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ status: "PUBLISHED", codes: codes.length, practiceBank: 24, testBank: 16, practiceAttempt: 8, testAttempt: 12 }, null, 2));
