#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year1", "english");
const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

function studentise(value) {
  return clean(value)
    .replace(/^Demonstrates\b/i, "Shows")
    .replace(/^Demonstrate\b/i, "Show")
    .replace(/^Identifies\b/i, "Names")
    .replace(/^Identify\b/i, "Name")
    .replace(/^Recognises\b/i, "Notices")
    .replace(/^Recognise\b/i, "Notice")
    .replace(/^Represents\b/i, "Shows")
    .replace(/^Represent\b/i, "Show")
    .replace(/^Provides\b/i, "Gives")
    .replace(/^Provide\b/i, "Give")
    .replace(/^Selects\b/i, "Chooses")
    .replace(/^Select\b/i, "Choose")
    .replace(/^Justifies\b/i, "Gives a reason for")
    .replace(/^Justify\b/i, "Give a reason for")
    .replace(/^Evaluates\b/i, "Decides how well")
    .replace(/^Evaluate\b/i, "Decide how well")
    .replace(/^Contrasts\b/i, "Shows the difference between")
    .replace(/^Contrast\b/i, "Show the difference between")
    .replace(/^Describes\b/i, "Tells about")
    .replace(/^Describe\b/i, "Tell about")
    .replace(/certainty\/help/gi, "certainty or help")
    .replace(/expression\/gesture/gi, "expression or gesture")
    .replace(/word\/sound/gi, "word or sound")
    .replace(/image\/text/gi, "image or text")
    .replace(/\bcriterion\b/gi, "check")
    .replace(/\bcriteria\b/gi, "checks")
    .replace(/\bmarking key\b/gi, "example answer")
    .replace(/\baward \d+ marks?\b/gi, "give a complete answer");
}

execFileSync(process.execPath, ["scripts/rebuild_year1_english_student_facing.mjs"], { cwd:ROOT, stdio:"inherit" });

const files = fs.readdirSync(BANK_ROOT).filter((name) => /^ac9e1(?:la|le|ly)\d{2}\.json$/i.test(name)).sort();
for (const name of files) {
  const file = path.join(BANK_ROOT, name);
  const items = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const item of items) {
    item.question = studentise(item.question);
    if (item.audio_prompt) item.audio_prompt = studentise(item.audio_prompt);
    if (Array.isArray(item.answers)) item.answers = item.answers.map((answer) => ({ ...answer, text:studentise(answer.text) }));
    if (item.explanation) {
      item.explanation.summary = studentise(item.explanation.summary);
      item.explanation.hint = studentise(item.explanation.hint);
    }
  }
  fs.writeFileSync(file, `${JSON.stringify(items, null, 2)}\n`);
}

execFileSync(process.execPath, ["scripts/publish_year1_english_quality_banks.mjs"], { cwd:ROOT, stdio:"inherit" });

const forbidden = /\b(?:demonstrates?|criterion|criteria|marking key|award \d+ marks?)\b/i;
const issues = [];
for (const name of files) {
  const items = JSON.parse(fs.readFileSync(path.join(BANK_ROOT,name), "utf8"));
  for (const item of items) {
    const text = [item.question, ...(item.answers || []).map((a)=>a.text), item.explanation?.summary, item.explanation?.hint].filter(Boolean).join(" ");
    if (forbidden.test(text)) issues.push(`${name}/${item.id}`);
  }
}
if (issues.length) {
  console.error(`Student-facing assessment-language check failed: ${issues.slice(0,20).join(", ")}`);
  process.exit(1);
}
console.log(`Year 1 English assessment-language polish: PASS (${files.length} codes).`);
