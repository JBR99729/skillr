#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const unavailablePath = path.join(ROOT, "assets/unavailable-activity-paths.json");
const unavailable = fs.existsSync(unavailablePath)
  ? JSON.parse(fs.readFileSync(unavailablePath, "utf8")).paths || []
  : [];

const hidden = unavailable
  .map((route) => route.match(/^\/quiz\/year-(7|8|9|10)\/(math|science|english)\/([^/]+)\/$/))
  .filter(Boolean)
  .map(([, year, subject, code]) => ({ year: Number(year), subject, code: code.toUpperCase() }));

function readBank(file) {
  if (!fs.existsSync(file)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function bankCounts(items) {
  return {
    practice: items.filter((item) => item.bank === "practice").length,
    test: items.filter((item) => item.bank === "test").length,
  };
}

function validateRows(rows) {
  const failures = [];
  const checked = [];

  for (const { year, subject, code } of rows) {
    const file = path.join(
      ROOT,
      "assets/assessment-banks",
      `year${year}`,
      subject,
      `${code.toLowerCase()}.json`,
    );
    const items = readBank(file);
    const counts = bankCounts(items);

    if (counts.practice < 8 || counts.test < 8) {
      failures.push({ year, subject, code, file: path.relative(ROOT, file), ...counts });
      continue;
    }

    checked.push({ year, subject, code, ...counts });
  }

  return { failures, checked };
}

const assessmentRoot = path.join(ROOT, "assets/assessment-banks");
const allRows = [];
if (fs.existsSync(assessmentRoot)) {
  for (const yearDir of fs.readdirSync(assessmentRoot, { withFileTypes: true })) {
    if (!/^year(?:7|8|9|10)$/.test(yearDir.name) || !yearDir.isDirectory()) continue;
    const year = Number(yearDir.name.replace("year", ""));
    const yearRoot = path.join(assessmentRoot, yearDir.name);
    for (const subjectDir of fs.readdirSync(yearRoot, { withFileTypes: true })) {
      if (!subjectDir.isDirectory()) continue;
      const subject = subjectDir.name;
      for (const name of fs.readdirSync(path.join(yearRoot, subject))) {
        if (!name.endsWith(".json")) continue;
        allRows.push({ year, subject, code: path.basename(name, ".json").toUpperCase() });
      }
    }
  }
}

const rows = [...new Map([...hidden, ...allRows].map((row) => [`${row.year}-${row.subject}-${row.code}`, row])).values()];
const { failures, checked } = validateRows(rows);

if (failures.length) {
  console.error("\nAssessment-bank generation is intentionally disabled.\n");
  console.error("Missing or incomplete upper-year banks must be authored with real curriculum-aligned questions.");
  console.error("The previous descriptor-to-question generator was removed because it produced low-quality prompts such as curriculum wording pasted into generic multiple-choice stems.\n");
  for (const failure of failures) {
    console.error(`- ${failure.code} (${failure.year} ${failure.subject}): ${failure.practice} practice, ${failure.test} test — ${failure.file}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  mode: "validate-authored-only",
  generated: 0,
  checked: checked.length,
  message: "All upper-year assessment banks are present. Descriptor-based question generation is disabled.",
}, null, 2));
