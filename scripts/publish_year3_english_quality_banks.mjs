import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const context = { window: {} };
vm.createContext(context);
for (const file of [
  "assets/year3-subject-data-base.js",
  "assets/year3-english-data-la1.js", "assets/year3-english-data-la2.js",
  "assets/year3-english-data-la3a.js", "assets/year3-english-data-la3b.js",
  "assets/year3-english-data-le.js", "assets/year3-english-data-ly1.js",
  "assets/year3-english-data-ly2.js"
]) vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });

const units = context.window.SkillrYear3EnglishData;
const codes = context.window.SkillrYear3EnglishOrder;
if (!units || codes?.length !== 28) throw new Error(`Expected 28 Year 3 English units, found ${codes?.length ?? 0}`);

const listHtml = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const notesFor = (unit) => [unit.learn, `Use this routine: ${unit.routine}.`, `Watch for ${unit.mistakes[0][0].toLowerCase()}: ${unit.mistakes[0][1]}`];
function htmlFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}
function identity(relative, code, title) {
  if (relative === "index.html") return { browser: `${code} ${title} Activities | SkillrHub`, heading: title, notes: "Unit focus" };
  if (relative === "worksheet/index.html") return { browser: `${code} ${title} Worksheet | SkillrHub`, heading: `${title} worksheet`, notes: "Unit focus" };
  const bank = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return { browser: `${code} ${title} ${bank} Retake | SkillrHub`, heading: `Retake ${bank.toLowerCase()}: ${title}`, notes: "Before you restart" };
  if (relative.endsWith("review/index.html")) return { browser: `${code} ${title} ${bank} Review | SkillrHub`, heading: `Review ${bank.toLowerCase()} answers: ${title}`, notes: "Unit focus" };
  if (relative.endsWith("result/index.html")) return { browser: `${code} ${title} ${bank} Result | SkillrHub`, heading: `${title} ${bank.toLowerCase()} result`, notes: "Unit focus" };
  return { browser: `${code} ${title} ${bank} | SkillrHub`, heading: title, notes: "Quick preparation" };
}

for (const code of codes) {
  const unit = units[code], lower = code.toLowerCase();
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year3/english/${lower}.json`], { cwd: ROOT, stdio: "inherit" });
  const route = path.join(ROOT, "quiz", "year-3", "english", lower);
  const notes = notesFor(unit);
  const activityFile = path.join(route, "index.html");
  let activity = fs.readFileSync(activityFile, "utf8");
  activity = activity
    .replace(/<p>Choose a learning activity\.[\s\S]*?<\/p>/, "<p>Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws 12 questions from a separate 16-question bank.</p>")
    .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Unit focus</h2>${listHtml(notes)}</section>`);
  fs.writeFileSync(activityFile, activity);

  for (const bank of ["practice", "test"]) {
    const attempt = bank === "practice" ? 8 : 12, count = bank === "practice" ? 24 : 16;
    const file = path.join(route, bank, "index.html");
    let html = fs.readFileSync(file, "utf8");
    const certificateBefore = (html.match(/"certificateOnPass":(?:true|false)/) || [])[0];
    const studentNameBefore = (html.match(/"requireStudentName":(?:true|false)/) || [])[0];
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${bank === "practice" ? `Practise Year 3 ${unit.title} with 8 rotating questions from a 24-question bank.` : `Take a 12-question Year 3 ${unit.title} test drawn from a separate 16-question bank.`}">`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>Quick preparation</h2>${listHtml(notes)}</section>`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${count}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":(?:true|false)/, '"shuffleQuestions":true')
      .replace(/"questionCycle":(?:true|false)/, '"questionCycle":true')
      .replace(/<script src="[^"]*\/(?:practice\/)?questions\.js(?:\?[^\"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-3/english/${lower}/${bank}/questions.js?v=20260813-year3-english-v1"></script>$&`);
    if ((html.match(/"certificateOnPass":(?:true|false)/) || [])[0] !== certificateBefore || (html.match(/"requireStudentName":(?:true|false)/) || [])[0] !== studentNameBefore) throw new Error(`${code} ${bank}: certificate configuration changed`);
    fs.writeFileSync(file, html);
  }

  for (const file of htmlFiles(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const page = identity(relative, code, unit.title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.browser}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${page.heading}</h1>`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>${page.notes}</h2>${listHtml(notes)}</section>`)
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.")
      .replace(/try the eight questions again/gi, "try a fresh attempt")
      .replace(/same eight(?:-question unit bank| questions used in Practice and Test)/gi, "separate banks aligned to this curriculum code");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ status: "PUBLISHED", codes: codes.length, practice: 672, test: 448, combined: 1120, practiceAttempt: 8, testAttempt: 12, certificateConfiguration: "preserved" }, null, 2));
