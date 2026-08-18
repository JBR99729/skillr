#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets/assessment-banks");
const CHECK_ONLY = process.argv.includes("--check");

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
  /\bthe current page is practicing\b/i,
  /\baustralian curriculum descriptor\b/i,
  /\bhere is (?:a|an) (?:clear )?(?:multiple-choice )?question\b/i,
  /\bpython code\b/i,
  /\bgenerates? similar practice questions\b/i,
];

const storyHeavyMarkers = [
  /\bimagine (?:that|you)\b/i,
  /\bsuppose (?:that|you)\b/i,
  /\bconsider a (?:situation|scenario)\b/i,
  /\bin a hypothetical\b/i,
  /\ba (?:student|teacher|family|company|researcher) (?:is|was|wants|decides|plans|needs)\b/i,
  /\bduring (?:a|the) (?:trip|journey|festival|event|project)\b/i,
  /\bafter several steps\b/i,
];

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function isBanned(item) {
  const q = clean(item.question);
  return banned.some((pattern) => pattern.test(q));
}

function confidenceEligibility(item) {
  const q = clean(item.question);
  const words = q.split(/\s+/).filter(Boolean);
  const sentenceCount = (q.match(/[.!?](?:\s|$)/g) || []).length;
  const hasStoryMarker = storyHeavyMarkers.some((pattern) => pattern.test(q));
  const asksHigherReasoning = /\b(explain|justify|evaluate|analyse|analyze|prove|derive|investigate|critique|compare and contrast)\b/i.test(q);
  const asksMultiStep = /\b(multi[- ]?step|show all working|several steps|two or more steps)\b/i.test(q);

  if (isBanned(item)) return { eligible: false, reason: "banned/meta template" };
  if (words.length > 28) return { eligible: false, reason: "too long for confidence tier" };
  if (sentenceCount > 2) return { eligible: false, reason: "too many sentences for confidence tier" };
  if (hasStoryMarker && words.length > 18) return { eligible: false, reason: "story-heavy confidence prompt" };
  if (asksHigherReasoning) return { eligible: false, reason: "higher-order reasoning belongs later" };
  if (asksMultiStep) return { eligible: false, reason: "multi-step task belongs later" };
  return { eligible: true, reason: "direct fast-read question" };
}

function complexity(item) {
  const q = clean(item.question).toLowerCase();
  let score = 20;
  const words = q.split(/\s+/).filter(Boolean).length;
  if (/^(what|which|find|calculate|identify|name|select|match|write|choose|how many|how much)\b/.test(q)) score -= 5;
  if (/recognis|recogniz|recall|basic|simple|one[- ]step/.test(q)) score -= 4;
  if (/explain|compare|interpret|justify|reason|analyse|analyze|evaluate|predict|infer/.test(q)) score += 5;
  if (/multi[- ]?step|prove|derive|investigate|unfamiliar|optimise|optimize|critique/.test(q)) score += 7;
  if (words > 20) score += 2;
  if (words > 28) score += 5;
  if (storyHeavyMarkers.some((pattern) => pattern.test(q))) score += 4;
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

const report = { mode: CHECK_ONLY ? "check" : "write", banks: 0, tagged: 0, gaps: [], rejectedFromConfidence: 0 };
for (const file of walk(BANK_ROOT)) {
  let data;
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); } catch { continue; }
  if (!Array.isArray(data) || !data.length || !data[0]?.curriculum_code) continue;

  const practiceItems = data.filter((item) => item.bank === "practice");
  const eligible = practiceItems.filter((item) => confidenceEligibility(item).eligible);
  report.rejectedFromConfidence += practiceItems.length - eligible.length;

  const ranked = eligible.slice().sort((a, b) => complexity(a) - complexity(b));
  const chosen = new Set(ranked.slice(0, 8).map((item) => item.id));

  data.forEach((item) => {
    if (item.bank !== "practice") return;
    if (chosen.has(item.id)) {
      item.difficulty = 1;
      item.difficulty_tier = "confidence";
      item.sequence_priority = 1;
    } else {
      if (item.difficulty_tier === "confidence") delete item.difficulty_tier;
      if (item.sequence_priority === 1) item.sequence_priority = 2;
      if (!item.difficulty || item.difficulty === 1) {
        item.difficulty = Math.max(2, Math.min(5, Math.ceil(complexity(item) / 10)));
      }
    }
  });

  if (chosen.size < 8) {
    report.gaps.push({
      code: data[0].curriculum_code,
      file: path.relative(ROOT, file),
      eligibleFastReadQuestions: chosen.size,
      neededAuthoredConfidenceQuestions: 8 - chosen.size,
    });
  }

  if (!CHECK_ONLY) fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  report.banks += 1;
  report.tagged += chosen.size;
}

console.log(JSON.stringify(report, null, 2));
if (report.gaps.length) {
  console.error(`Confidence-tier authoring gaps remain in ${report.gaps.length} bank(s). Add direct, code-appropriate fast-read questions; do not fill gaps with templates or story-heavy prompts.`);
}
