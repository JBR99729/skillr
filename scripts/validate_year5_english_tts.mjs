#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year5", "english");
const issues = [];
const forbidden = [
  [/_{2,}|\{\{\s*blank\s*\}\}|\[\s*blank\s*\]/i, "unspoken blank marker"],
  [/\.{3}|…/, "ellipsis or truncated marker"],
  [/(?:^|\s)\/[a-z]{1,4}\/(?:\s|$)/i, "raw phoneme notation"],
  [/[→←]/, "symbolic arrow instruction"],
];
const spoken = (value) => String(value ?? "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();

if (!fs.existsSync(BANK_ROOT)) throw new Error("Build the Year 5 English banks before running the TTS audit");
for (const name of fs.readdirSync(BANK_ROOT).filter((name) => name.endsWith(".json")).sort()) {
  const items = JSON.parse(fs.readFileSync(path.join(BANK_ROOT, name), "utf8"));
  for (const [index, item] of items.entries()) {
    const label = `${item.curriculum_code} ${item.bank} ${index + 1}`;
    if (item.audio_prompt !== item.question) issues.push(`${label}: audio prompt differs from visible prompt`);
    for (const [pattern, reason] of forbidden) if (pattern.test(item.question)) issues.push(`${label}: ${reason}`);
    const choices = item.answers.map((answer) => String(answer.text));
    if (new Set(choices.map(spoken)).size !== 3) issues.push(`${label}: choices are not distinguishable after TTS-safe normalisation`);
    for (const choice of choices) {
      if (/^[a-z]$/i.test(choice.trim())) issues.push(`${label}: isolated letter choice may be spoken as a letter name`);
      for (const [pattern, reason] of forbidden) if (pattern.test(choice)) issues.push(`${label}: answer contains ${reason}`);
    }
  }
}

console.log(JSON.stringify({ files: fs.readdirSync(BANK_ROOT).filter((name) => name.endsWith(".json")).length, issueCount: issues.length }, null, 2));
if (issues.length) {
  console.error(issues.slice(0, 100).join("\n"));
  process.exitCode = 1;
}
