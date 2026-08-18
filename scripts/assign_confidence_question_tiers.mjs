#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets/assessment-banks");

const banned = [
  /^a (?:foundation|year \d+) student is solving a problem involving/i,
  /which option is (?:mathematically|scientifically|linguistically) valid/i,
  /^which statement correctly describes/i,
  /^which statement gives a valid example of/i,
  /^what should you check when using/i,
  /^what is important when using/i,
  /^which description correctly applies/i,
  /^which response correctly applies/i,
  /^which response correctly uses/i,
  /^which statement is true about/i,
  /^which claim is accurate about/i,
  /^what does correct application require for/i,
];

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function isBanned(item) {
  const q = clean(item.question);
  return banned.some((pattern) => pattern.test(q));
}

function complexity(item) {
  const q = clean(item.question).toLowerCase();
  let score = 20;
  if (/^(what|which|find|calculate|identify|name|select|match|write|choose|how many|how much)\b/.test(q)) score -= 5;
  if (/recognis|recogniz|recall|basic|simple|one[- ]step/.test(q)) score -= 4;
  if (/explain|compare|interpret|justify|reason|analyse|analyze|evaluate|predict|infer/.test(q)) score += 5;
  if (/multi[- ]?step|prove|derive|investigate|unfamiliar|optimise|optimize|critique/.test(q)) score += 7;
  if (q.split(/\s+/).length > 35) score += 4;
  if ((q.match(/\b\d+(?:\.\d+)?\b/g) || []).length >= 4) score += 2;
  if (item.visual?.type && item.visual.type !== "none") score += 1;
  return score;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : full.endsWith(".json") ? [full] : [];
  });
}

const report = { banks: 0, tagged: 0, gaps: [] };
for (const file of walk(BANK_ROOT)) {
  let data;
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); } catch { continue; }
  if (!Array.isArray(data) || !data.length || !data[0]?.curriculum_code) continue;

  const practice = data.filter((item) => item.bank === "practice" && !isBanned(item));
  const ranked = practice.slice().sort((a, b) => complexity(a) - complexity(b));
  const chosen = new Set(ranked.slice(0, 8).map((item) => item.id));

  data.forEach((item) => {
    if (item.bank !== "practice") return;
    if (chosen.has(item.id)) {
      item.difficulty = 1;
      item.difficulty_tier = "confidence";
      item.sequence_priority = 1;
    } else if (!item.difficulty) {
      item.difficulty = Math.max(2, Math.min(5, Math.ceil(complexity(item) / 10)));
      item.sequence_priority = 2;
    }
  });

  if (chosen.size < 8) {
    report.gaps.push({
      code: data[0].curriculum_code,
      file: path.relative(ROOT, file),
      validPracticeQuestions: chosen.size,
      needed: 8 - chosen.size,
    });
  }

  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  report.banks += 1;
  report.tagged += chosen.size;
}

console.log(JSON.stringify(report, null, 2));
if (report.gaps.length) {
  console.error(`Confidence-tier authoring gaps remain in ${report.gaps.length} bank(s). No banned question was promoted.`);
}
