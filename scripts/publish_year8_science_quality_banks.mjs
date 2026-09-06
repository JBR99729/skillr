import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const NODE = process.execPath;
const CODE_ORDER = ["AC9S8H01","AC9S8H02","AC9S8H03","AC9S8H04","AC9S8I01","AC9S8I02","AC9S8I03","AC9S8I04","AC9S8I05","AC9S8I06","AC9S8I07","AC9S8I08","AC9S8U01","AC9S8U02","AC9S8U03","AC9S8U04","AC9S8U05","AC9S8U06","AC9S8U07"];

function load(file, key) {
  const box = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), box);
  return box.window[key];
}
const units = {
  ...load("assets/year8-science-full-data.js", "SkillrUpperScienceData"),
  ...load("assets/year8-science-ac9s8u01-data.js", "SkillrYear8ScienceData"),
};

function filesUnder(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(file));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(file);
  }
  return files;
}

function pageHeading(relative, title) {
  if (relative === "index.html") return title;
  if (relative === "worksheet/index.html") return `${title} worksheet`;
  const mode = relative.startsWith("test/") ? "test" : "practice";
  if (relative.endsWith("retake/index.html")) return `Retake ${mode}: ${title}`;
  if (relative.endsWith("review/index.html")) return `Review ${mode} answers: ${title}`;
  if (relative.endsWith("result/index.html")) return `${title} ${mode} result`;
  return title;
}

for (const code of CODE_ORDER) {
  const title = units[code].title;
  const lower = code.toLowerCase();
  const route = path.join(ROOT, "quiz/year-8/science", lower);
  execFileSync(NODE, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year8/science/${lower}.json`], { cwd: ROOT, stdio: "inherit" });
  const testAttempt = code === "AC9S8U01" ? 8 : 12;
  const questionVersion = code === "AC9S8U01" ? "20260820-production-v2" : "20260813-production-v1";
  for (const mode of ["practice", "test"]) {
    const file = path.join(route, mode, "index.html");
    const attempt = mode === "practice" ? 8 : testAttempt;
    const bankSize = mode === "practice" ? 24 : 16;
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${mode === "practice" ? `Practise ${title} with 8 rotating questions from a 24-question bank.` : `Take ${attempt === 8 ? "an" : "a"} ${attempt}-question ${title} test drawn from a separate 16-question bank.`}">`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${bankSize}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":(?:true|false)/, '"shuffleQuestions":true')
      .replace(/"questionCycle":(?:true|false)/, '"questionCycle":true')
      .replace(/<script src="[^\"]*\/(?:practice\/)?questions\.js(?:\?[^\"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-8/science/${lower}/${mode}/questions.js?v=${questionVersion}"></script><script src="/quiz/assets/production-question-ui.js?v=1"></script>$&`);
    fs.writeFileSync(file, html);
  }
  for (const file of filesUnder(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const mode = relative.startsWith("test/") ? "Test" : relative.startsWith("practice/") ? "Practice" : "Activities";
    const heading = pageHeading(relative, title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${code} ${title} ${mode} | SkillrHub</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${heading}</h1>`)
      .replace(/Choose a learning activity\. Worksheet, Practice and Test use the same eight-question unit bank\./g, `Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws ${testAttempt} from a separate 16-question bank.`)
      .replace(/This QA-reviewed unit provides \d+ Practice questions, \d+ auto-marked Test questions[^<]*/g, "This unit provides 24 Practice questions and 16 separate Test questions.")
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ status: "PUBLISHED", codes: CODE_ORDER.length, practiceAttempt: 8, defaultTestAttempt: 12, ac9s8u01TestAttempt: 8 }, null, 2));
