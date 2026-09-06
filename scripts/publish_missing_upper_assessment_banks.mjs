#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const TEMPLATE = path.join(ROOT, "quiz/year-6/english/ac9e6la01");
const unavailable = JSON.parse(fs.readFileSync(path.join(ROOT, "assets/unavailable-activity-paths.json"), "utf8")).paths;
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "data/curriculum-units.json"), "utf8")).units;
const rows = unavailable.map((route) => route.match(/^\/quiz\/year-(7|8|9|10)\/(math|science|english)\/([^/]+)\/$/)).filter(Boolean)
  .map(([, year, subject, code]) => ({ year: Number(year), subject, code: code.toUpperCase() }));

const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function htmlFiles(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(root, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith(".html") ? [file] : [];
  });
}

function identity(relative, code, title) {
  if (relative === "index.html") return [`${code} ${title} Activities | SkillrHub`, title];
  if (relative === "worksheet/index.html") return [`${code} ${title} Worksheet | SkillrHub`, `${title} worksheet`];
  const mode = relative.startsWith("test/") ? "Test" : "Practice";
  if (relative.endsWith("retake/index.html")) return [`${code} ${title} ${mode} Retake | SkillrHub`, `Retake ${mode.toLowerCase()}: ${title}`];
  if (relative.endsWith("review/index.html")) return [`${code} ${title} ${mode} Review | SkillrHub`, `Review ${mode.toLowerCase()} answers: ${title}`];
  if (relative.endsWith("result/index.html")) return [`${code} ${title} ${mode} Result | SkillrHub`, `${title} ${mode.toLowerCase()} result`];
  return [`${code} ${title} ${mode} | SkillrHub`, title];
}

let scaffolded = 0;
let preservedRoutes = 0;
for (const { year, subject, code } of rows) {
  const lower = code.toLowerCase();
  const unit = registry.find((entry) => entry.code === code);
  if (!unit) throw new Error(`${code}: missing curriculum registry row`);
  const route = path.join(ROOT, `quiz/year-${year}`, subject, lower);
  if (!fs.existsSync(route)) {
    fs.mkdirSync(path.dirname(route), { recursive: true });
    fs.cpSync(TEMPLATE, route, { recursive: true });
    scaffolded += 1;
  } else preservedRoutes += 1;

  const title = unit.title.replace(/\.{3}$/, "").trim();
  const topicUrl = unit.url;
  for (const file of htmlFiles(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    const [browserTitle, heading] = identity(relative, code, title);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replaceAll("AC9E6LA01", code)
      .replaceAll("ac9e6la01", lower)
      .replaceAll("Year 6", `Year ${year}`)
      .replaceAll("year-6", `year-${year}`)
      .replaceAll("/year6/", `/year${year}/`)
      .replaceAll("/english/", `/${subject}/`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(browserTitle)}</title>`)
      .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, `<h1$1>${escapeHtml(heading)}</h1>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Year ${year} ${escapeHtml(title)} activity with 8 Practice and 8 separate Test questions.">`)
      .replace(/href="\/year\d+\/[^"#]+"(?=>AC9)/, `href="${topicUrl}"`)
      .replace(/"maxQuestions":\d+/, '"maxQuestions":8')
      .replace(/"shuffleQuestions":(?:true|false)/, '"shuffleQuestions":true')
      .replace(/"questionCycle":(?:true|false)/, '"questionCycle":true')
      .replace(/\d+ Practice questions/g, "8 Practice questions")
      .replace(/\d+ auto-marked Test questions/g, "8 auto-marked Test questions")
      .replace(/\d+-question bank/g, "8-question bank")
      .replace(/<span class="summary-number">(?:16|24)<\/span><span class="summary-label">Question bank<\/span>/g, '<span class="summary-number">8</span><span class="summary-label">Question bank</span>');
    fs.writeFileSync(file, html);
  }

  const bank = `assets/assessment-banks/year${year}/${subject}/${lower}.json`;
  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", bank], { cwd: ROOT, stdio: "ignore" });
  for (const mode of ["practice", "test"]) {
    const file = path.join(route, mode, "index.html");
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<script src="[^"]*questions\.js(?:\?[^"]*)?"><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/production-question-ui\.js[^>]*><\/script>/g, "")
      .replace(/<script src="\/quiz\/assets\/script\.js[^>]*><\/script>/, `<script src="/quiz/year-${year}/${subject}/${lower}/${mode}/questions.js?v=20260815-upper-v1"></script><script src="/quiz/assets/production-question-ui.js?v=1"></script>$&`);
    fs.writeFileSync(file, html);
  }
}

const publishedPrefixes = new Set(rows.map(({ year, subject, code }) => `/quiz/year-${year}/${subject}/${code.toLowerCase()}/`));
const remainingUnavailable = unavailable.filter((route) => !publishedPrefixes.has(route));
fs.writeFileSync(
  path.join(ROOT, "assets/unavailable-activity-paths.json"),
  `${JSON.stringify({ paths: remainingUnavailable }, null, 2)}\n`,
);

console.log(JSON.stringify({ codes: rows.length, scaffolded, preservedRoutes, practiceAttempt: 8, testAttempt: 8 }, null, 2));