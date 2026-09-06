#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { LA_ITEMS } from "./year5_english_items_la.mjs";
import { LE_ITEMS } from "./year5_english_items_le.mjs";
import { LY_ITEMS } from "./year5_english_items_ly.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year5", "english");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals", "year5", "english");
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["assets/year5-curriculum-base.js", "assets/year5-english-data-la.js", "assets/year5-english-data-le.js", "assets/year5-english-data-ly1.js", "assets/year5-english-data-ly2.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
}
const order = sandbox.window.SkillrYear5EnglishOrder;
const units = sandbox.window.SkillrYear5EnglishData;
const source = { ...LA_ITEMS, ...LE_ITEMS, ...LY_ITEMS };
if (order?.length !== 24 || Object.keys(source).length !== 24) throw new Error("Expected all 24 Year 5 English codes");

const clean = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const xml = (value) => clean(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function answers(correct, wrongs, position) {
  const distractors = [...new Set(wrongs.map(clean).filter((value) => value && value !== clean(correct)))];
  if (distractors.length !== 2) throw new Error(`Expected two unique distractors for ${correct}`);
  const result = distractors.map((text) => ({ text, is_correct: false }));
  result.splice(position, 0, { text: clean(correct), is_correct: true });
  return result;
}

function visualSymbol(item, detail, index) {
  const colour = item.bank === "practice" ? "#2457d6" : "#7c3aed";
  const labels = detail.visualKind === "sequence" ? ["Before", "Change", "Effect"]
    : detail.visualKind === "comparison" ? ["Text A", "Text B", "Meaning"]
    : detail.visualKind === "structure" ? ["Feature", "Evidence", "Purpose"]
    : ["Notice", "Interpret", "Decide"];
  return `<symbol id="${item.id}" viewBox="0 0 640 300"><rect x="16" y="16" width="608" height="268" rx="28" fill="#f8faff" stroke="${colour}" stroke-width="4"/><text x="40" y="55" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="${colour}">${xml(item.curriculum_code)} • ${item.bank === "practice" ? "Practice" : "Test"}</text>${labels.map((label, step) => `<g transform="translate(${43 + step * 197} 88)"><rect width="165" height="92" rx="18" fill="${step === index % 3 ? colour : "#e7edff"}"/><text x="82.5" y="39" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="${step === index % 3 ? "white" : "#173968"}">${xml(label)}</text><text x="82.5" y="65" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="${step === index % 3 ? "white" : "#41516c"}">${xml(clean(detail.focus).slice(0, 20))}</text></g>`).join("")}<text x="40" y="232" font-family="Arial,sans-serif" font-size="15" fill="#41516c">${xml(clean(detail.visualDescription || detail.focus).slice(0, 78))}</text><text x="40" y="260" font-family="Arial,sans-serif" font-size="14" fill="#5d6c80">Read the quoted language closely before choosing.</text></symbol>`;
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
for (const code of order) {
  const details = source[code];
  if (!Array.isArray(details) || details.length !== 40) throw new Error(`${code}: expected 40 authored items`);
  const items = details.map((detail, index) => {
    const bank = index < 24 ? "practice" : "test";
    const number = bank === "practice" ? index + 1 : index - 23;
    const id = `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${String(number).padStart(3, "0")}`;
    const hasUsefulVisual = detail.visualKind && detail.visualKind !== "none" && clean(detail.visualDescription);
    const visualDescription = clean(detail.visualDescription).replace(/[.!?]+$/, "");
    const alt = hasUsefulVisual ? `${visualDescription}. A three-part ${detail.visualKind} guide supports the question.` : "";
    const skillLabel = /\d/.test(clean(detail.focus)) ? units[code].title : clean(detail.focus);
    return {
      id, curriculum_code: code, year_level: "Year 5", subject: "english", bank,
      skill: skillLabel.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
      question: clean(detail.question), audio_prompt: clean(detail.question),
      ...(hasUsefulVisual ? { visual: { type: "svg", asset_path: `/assets/assessment-visuals/year5/english/${code.toLowerCase()}.svg#${id}`, alt_text: alt } } : {}),
      answers: answers(detail.correct, detail.wrongs, index % 3), correct_index: index % 3,
      explanation: { summary: clean(detail.summary), hint: clean(detail.hint) },
    };
  });
  const symbols = items.map((item, index) => item.visual ? visualSymbol(item, details[index], index) : "").join("");
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${symbols}</defs></svg>\n`);
}

console.log(JSON.stringify({ codes: order.length, practice: order.length * 24, test: order.length * 16, total: order.length * 40 }, null, 2));
