#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const units = JSON.parse(fs.readFileSync(path.join(root, "data/curriculum-units.json"), "utf8"))
  .units.filter((unit) => unit.subject === "English");
const expectedByLevel = new Map([
  ["Foundation", 29], ["Year 1", 30], ["Year 2", 27], ["Year 3", 28],
  ["Year 4", 28], ["Year 5", 24], ["Year 6", 23], ["Year 7", 24],
  ["Year 8", 23], ["Year 9", 23], ["Year 10", 25]
]);
const failures = [];
const fail = (message) => failures.push(message);
const exists = (url) => fs.existsSync(path.join(root, url.replace(/^\//, ""), "index.html"));

if (units.length !== 284) fail(`Expected 284 English topics, found ${units.length}`);
for (const [level, expected] of expectedByLevel) {
  const actual = units.filter((unit) => unit.levelLabel === level).length;
  if (actual !== expected) fail(`${level}: expected ${expected} topics, found ${actual}`);
}

for (const unit of units) {
  const label = `${unit.levelLabel} ${unit.code}`;
  const file = path.join(root, unit.url.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) { fail(`${label}: topic page is missing`); continue; }
  const html = fs.readFileSync(file, "utf8");
  const canonical = `https://skillrhub.com${unit.url}`;
  if (!/<meta\s+name="robots"\s+content="index,\s*follow">/i.test(html)) fail(`${label}: topic must be indexable`);
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) fail(`${label}: canonical must point to the topic URL`);
  if (!/class="[^"]*\bcurriculum-layout\b[^"]*"/.test(html)) fail(`${label}: curriculum layout wrapper is missing`);
  if (!/<(?:details|section)\b/i.test(html)) fail(`${label}: static topic sections are missing`);
  if (/Loading(?: topic| lesson| content)?[.]{0,3}/i.test(html)) fail(`${label}: runtime loading placeholder remains`);
  if (!/(?:What students learn|Learning intention|Learning target|Learning goal|Teaching Lesson|Key concept|Outcome Overview|Core Concepts|Australian Curriculum target)/i.test(html)) fail(`${label}: recognisable static teaching content is missing`);
  if (/\/homework\//i.test(html)) fail(`${label}: legacy Homework route remains`);
  if (/>\s*Homework\s*</i.test(html)) fail(`${label}: legacy Homework label remains`);
  for (const [kind, url] of [["worksheet", unit.worksheetUrl], ["practice", unit.practiceUrl], ["test", unit.testUrl]]) {
    if (!html.includes(`href="${url}"`) && !html.includes(`href='${url}'`)) fail(`${label}: ${kind} link is missing`);
    if (!exists(url)) fail(`${label}: linked ${kind} route does not exist (${url})`);
  }
  const wrongPractice = new RegExp(`href=(['"])${unit.worksheetUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1[^>]*>Practice<`, "i");
  if (wrongPractice.test(html)) fail(`${label}: Practice button incorrectly points to the worksheet`);
}

const css = fs.readFileSync(path.join(root, "assets/curriculum.css"), "utf8");
for (const selector of [
  '.curriculum-page:has(.topic-action-row a[href*="/english/"]) .curriculum-layout',
  '.curriculum-page:has(.topic-action-row a[href*="/english/"]) .curriculum-sidebar',
  '.curriculum-page:has(.topic-action-row a[href*="/english/"]) .curriculum-content'
]) if (!css.includes(selector)) fail(`Missing English topic layout rule: ${selector}`);

if (failures.length) {
  failures.forEach((message) => console.error(`FAIL ${message}`));
  console.error(`\n${failures.length} English topic-page validation failure(s).`);
  process.exit(1);
}
console.log(`PASS ${units.length} English topic pages across Foundation-Year 10.`);
