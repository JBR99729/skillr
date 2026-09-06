#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const TEMPLATE = path.join(ROOT, "quiz", "year-6", "math", "ac9m6n01");
const captured = { units: {}, order: [] };
const sandbox = { window: {
  SkillrYear6Register(subject, specs, order) {
    if (subject !== "english") return;
    Object.assign(captured.units, specs);
    captured.order.push(...order);
  },
} };
vm.createContext(sandbox);
for (const file of ["assets/year6-english-data-la.js", "assets/year6-english-data-le.js", "assets/year6-english-data-ly.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
}

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const order = [...new Set(captured.order)];
if (order.length !== 23) throw new Error("Expected all 23 Year 6 English units");

function htmlFiles(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(root, entry.name);
    return entry.isDirectory() ? htmlFiles(full) : entry.name.endsWith(".html") ? [full] : [];
  });
}

for (const code of order) {
  const lower = code.toLowerCase();
  const unit = captured.units[code];
  const route = path.join(ROOT, "quiz", "year-6", "english", lower);
  fs.cpSync(TEMPLATE, route, { recursive: true });

  for (const file of htmlFiles(route)) {
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replaceAll("AC9M6N01", code)
      .replaceAll("ac9m6n01", lower)
      .replaceAll("/quiz/year-6/math/", "/quiz/year-6/english/")
      .replaceAll("/year6/maths/ac9m6n01-situations-including-financial-contexts-that-use-integers/", `/year6/english/${unit.slug}/`)
      .replaceAll("AC9M6N01 Maths", `${code} English`)
      .replaceAll("Integers on Number Lines and the Cartesian Plane", esc(unit.title))
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, `<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul><li>${esc(unit.learn)}</li><li><strong>Example:</strong> ${esc(unit.modelNote)}</li><li><strong>Common trap:</strong> ${esc(unit.mistakes[0][0])}. ${esc(unit.mistakes[0][1])}</li></ul></section>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Year 6 English ${esc(unit.title)} activity with 8 Practice and 8 separate Test questions.">`)
      .replace(/"maxQuestions":12/g, `"maxQuestions":8`)
      .replace(/24-question/g, "8-question")
      .replace(/16-question/g, "8-question")
      .replace(/24 Practice questions/g, "8 Practice questions")
      .replace(/16 auto-marked Test questions/g, "8 auto-marked Test questions");
    fs.writeFileSync(file, html);
  }

  execFileSync(process.execPath, ["scripts/publish_production_question_bank.mjs", `assets/assessment-banks/year6/english/${lower}.json`], { cwd: ROOT, stdio: "inherit" });
}

console.log(JSON.stringify({ codes: order.length, practiceBank: 8, testBank: 8, status: "PUBLISHED" }, null, 2));