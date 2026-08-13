import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
let specs;
const context = { window: { SkillrYear4SubjectRegister(subject, values) { if (subject === "science") specs = values; } } };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "assets/year4-science-data.js"), "utf8"), context);
if (!specs) throw new Error("Could not load Year 4 Science specifications.");

function htmlFiles(root) {
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...htmlFiles(file));
    else if (entry.isFile() && entry.name.endsWith(".html")) result.push(file);
  }
  return result;
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

for (const [code, spec] of Object.entries(specs)) {
  const lower = code.toLowerCase();
  const route = path.join(ROOT, "quiz/year-4/science", lower);
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year4/science/${lower}.json`], { cwd: ROOT, stdio: "inherit" });
  for (const bank of ["practice", "test"]) {
    const file = path.join(route, bank, "index.html");
    let html = fs.readFileSync(file, "utf8");
    const attempt = bank === "practice" ? 8 : 12;
    const count = bank === "practice" ? 24 : 16;
    html = html
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${bank === "practice" ? `Practise ${spec.title} with 8 rotating questions from a 24-question bank.` : `Take a 12-question ${spec.title} test drawn from a separate 16-question bank.`}">`)
      .replace(/<div class="quiz-summary">[\s\S]*?<\/div><button class="button button-primary"/, `<div class="quiz-summary"><div><span class="summary-number" id="questionCount">${attempt}</span><span class="summary-label">Questions this attempt</span></div><div><span class="summary-number">${count}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary"`)
      .replace(/"maxQuestions":\d+/, `"maxQuestions":${attempt}`)
      .replace(/"shuffleQuestions":(?:true|false)/, `"shuffleQuestions":true`)
      .replace(/"questionCycle":(?:true|false)/, `"questionCycle":true`)
      .replace(/<script src="[^\"]*\/(?:practice\/)?questions\.js(?:\?[^\"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-4/science/${lower}/${bank}/questions.js?v=20260813-production-v1"></script>$&`);
    fs.writeFileSync(file, html);
  }
  for (const file of htmlFiles(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const page = identity(relative, code, spec.title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.browser}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${page.heading}</h1>`)
      .replace(/Download a worksheet containing the same eight questions used in Practice and Test\./g, "Download an eight-question worksheet drawn from the Practice bank.")
      .replace(/Try the same eight curriculum questions again in a newly shuffled answer order\./g, "Start a fresh rotating attempt from the full question bank.");
    fs.writeFileSync(file, html);
  }
}

console.log(JSON.stringify({ codes: Object.keys(specs).length, practiceAttempt: 8, testAttempt: 12, status: "PUBLISHED" }, null, 2));
