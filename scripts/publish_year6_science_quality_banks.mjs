import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
let units;
const context = { window: { SkillrYear6Register(subject, data) { if (subject === "science") units = data; } } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/year6-science-data.js"), "utf8"), context);
if (!units) throw new Error("Could not load Year 6 Science curriculum registry");

function filesUnder(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(root, entry.name);
    return entry.isDirectory() ? filesUnder(full) : entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

function heading(relative, title) {
  if (relative === "index.html") return title;
  if (relative === "worksheet/index.html") return `${title} worksheet`;
  const mode = relative.startsWith("test/") ? "test" : "practice";
  if (relative.endsWith("retake/index.html")) return `Retake ${mode}: ${title}`;
  if (relative.endsWith("review/index.html")) return `Review ${mode} answers: ${title}`;
  if (relative.endsWith("result/index.html")) return `${title} ${mode} result`;
  return title;
}

function browserTitle(relative, code, title) {
  if (relative === "index.html") return `${code} ${title} Activities | SkillrHub`;
  if (relative === "worksheet/index.html") return `${code} ${title} Worksheet | SkillrHub`;
  const mode = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return `${code} ${title} ${mode} Retake | SkillrHub`;
  if (relative.endsWith("review/index.html")) return `${code} ${title} ${mode} Review | SkillrHub`;
  if (relative.endsWith("result/index.html")) return `${code} ${title} ${mode} Result | SkillrHub`;
  return `${code} ${title} ${mode} | SkillrHub`;
}

for (const [code, unit] of Object.entries(units)) {
  const lower = code.toLowerCase();
  const route = path.join(ROOT, `quiz/year-6/science/${lower}`);
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year6/science/${lower}.json`], { cwd: ROOT });

  for (const mode of ["practice", "test"]) {
    const file = path.join(route, mode, "index.html");
    const attempt = mode === "practice" ? 8 : 12;
    const bankCount = mode === "practice" ? 24 : 16;
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${mode === "practice" ? `Practise ${unit.title} with 8 rotating questions from a 24-question bank.` : `Take a 12-question ${unit.title} test drawn from a separate 16-question bank.`}">`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${bankCount}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":(?:true|false)/, `"shuffleQuestions":true`)
      .replace(/"questionCycle":(?:true|false)/, `"questionCycle":true`)
      .replace(/<script src="[^"]*questions\.js(?:\?[^"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-6/science/${lower}/${mode}/questions.js?v=20260813-production-v1"></script><script src="/quiz/assets/production-question-ui.js?v=1"></script>$&`);
    fs.writeFileSync(file, html);
  }

  for (const file of filesUnder(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${browserTitle(relative, code, unit.title)}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${heading(relative, unit.title)}</h1>`)
      .replace(/Complete an 8-question Year 6 (?:practice|test)/g, `Complete a Year 6 science activity`)
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ codes: Object.keys(units).length, practice: 288, test: 192, status: "PUBLISHED" }, null, 2));
