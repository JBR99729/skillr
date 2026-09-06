#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const version = process.argv[2];

if (!/^\d+$/.test(version || "")) {
  throw new Error("Usage: node scripts/bump_quiz_asset_version.mjs <version>");
}

const sourceFiles = [
  "scripts/build_ac9m1n01_quiz_pages.py",
  "scripts/build_all_unit_activities.py",
  "scripts/build_foundation_maths_live_routes.py",
  "scripts/publish_year2_maths_quality_banks.mjs",
  "scripts/validate_foundation_maths_pre_module_notes.mjs",
  "scripts/validate_year3_maths_pre_module_notes.mjs",
  "scripts/validate_year4_science_pre_module_notes.mjs",
  "scripts/wire_year3_maths_pre_module_notes.mjs",
  "scripts/wire_year4_science_pre_module_notes.mjs",
];

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesIn(file);
    return entry.name.endsWith(".html") ? [file] : [];
  });
}

let updated = 0;
for (const file of [...filesIn(path.join(ROOT, "quiz")), ...sourceFiles.map((file) => path.join(ROOT, file))]) {
  const source = fs.readFileSync(file, "utf8");
  const next = source.replace(/\/quiz\/assets\/(script\.js|style\.css)\?v=(?:112|113|114)/g, `/quiz/assets/$1?v=${version}`);
  if (next === source) continue;
  fs.writeFileSync(file, next);
  updated += 1;
}

console.log(JSON.stringify({ version: Number(version), updated }, null, 2));
