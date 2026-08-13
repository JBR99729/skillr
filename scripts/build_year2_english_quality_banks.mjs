import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { LA123_ITEMS } from "./year2_english_items_la123.mjs";
import { LA_ITEMS } from "./year2_english_items_la.mjs";
import { LE_ITEMS } from "./year2_english_items_le.mjs";
import { LY_ITEMS } from "./year2_english_items_ly.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year2", "english");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals", "year2", "english");
const ITEM_SETS = { ...LA123_ITEMS, ...LA_ITEMS, ...LE_ITEMS, ...LY_ITEMS };
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/year2-english-data.js"), "utf8"), context, { filename: "assets/year2-english-data.js" });
const units = context.window.SkillrYear2EnglishData;
const codes = context.window.SkillrYear2EnglishOrder;

const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 48);
function source(title, question, correct, wrong, summary, hint, visual = "") {
  const item = { title: clean(title), question: clean(question), correct: clean(correct), wrong: wrong.map(clean), summary: clean(summary), hint: clean(hint), visual: clean(visual) };
  if (!item.title || !item.question || !item.correct || item.wrong.length !== 2 || !item.summary || !item.hint) throw new Error(`Incomplete source: ${JSON.stringify(item)}`);
  if (new Set([item.correct, ...item.wrong]).size !== 3) throw new Error(`Duplicate choices: ${item.question}`);
  return item;
}

function dataContexts(code, unit) {
  const custom = ITEM_SETS[code];
  if (!Array.isArray(custom) || custom.length !== 20) throw new Error(`${code}: expected 20 authored application sources, found ${custom?.length}`);
  const customSources = custom.map((item) => source(item.title, item.question, item.correct, item.wrong, item.summary, item.hint, item.visual));
  const practice = customSources.slice(0, 12);
  const test = customSources.slice(12);
  if (practice.length !== 12 || test.length !== 8) throw new Error(`${code}: source split is ${practice.length}/${test.length}`);
  return { practice, test };
}

function orderedAnswers(correct, wrong, correctIndex) {
  const choices = [...wrong];
  choices.splice(correctIndex, 0, correct);
  return choices.map((text, index) => ({ text, is_correct: index === correctIndex }));
}

function editingChoiceSpeech(value) {
  const text = clean(value);
  const capitalWords = [...text.matchAll(/\b[A-Z][a-z]*/g)].map((match) => match[0]);
  const commaWords = [...text.matchAll(/\b([A-Za-z]+),/g)].map((match) => match[1]);
  const parts = [capitalWords.length ? `Capital words: ${capitalWords.join(", ")}.` : "There are no capital words."];
  parts.push(commaWords.length ? `Commas come after: ${commaWords.join(", ")}.` : "There are no commas.");
  if (text.includes("—")) parts.push("There is a dash between the title and the list.");
  if (/[.!?]$/.test(text)) parts.push(`The text ends with ${text.endsWith(".") ? "a full stop" : text.endsWith("!") ? "an exclamation mark" : "a question mark"}.`);
  parts.push(`The text reads: ${text}`);
  return parts.join(" ");
}

function wrap(value, limit = 22, maxLines = 4) {
  const words = clean(value).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && `${line} ${word}`.length > limit) { lines.push(line); line = word; }
    else line = `${line} ${word}`.trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines);
    clipped[maxLines - 1] = `${clipped[maxLines - 1].slice(0, Math.max(1, limit - 1))}…`;
    return clipped;
  }
  return lines;
}

function textBlock(value, x, y, options = {}) {
  const lines = wrap(value, options.limit || 22, options.maxLines || 4);
  const size = options.size || 15;
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${options.weight || 700}" fill="${options.fill || "#17324d"}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? size + 5 : 0}">${esc(line)}</tspan>`).join("")}</text>`;
}

function visualSymbol(id, code, unit, itemSource, variant, sourceIndex) {
  const strand = code.includes("LA") ? "Language" : code.includes("LE") ? "Literature" : "Literacy";
  const colours = code.includes("LA") ? ["#eef6ff", "#dbeafe", "#2563eb"] : code.includes("LE") ? ["#fff7ed", "#ffedd5", "#ea580c"] : ["#ecfdf5", "#d1fae5", "#059669"];
  const displayTitle = itemSource.title.replace(/^Test\s+/i, "");
  const labels = [displayTitle, unit.mastery[sourceIndex % unit.mastery.length], variant === "answer" ? (itemSource.visual || "Choose with evidence") : "Correct the mix-up"];
  const cards = labels.map((label, index) => {
    const x = 20 + index * 207;
    return `<rect x="${x}" y="78" width="187" height="185" rx="18" fill="${index === 1 ? "#fff" : colours[index === 0 ? 0 : 1]}" stroke="${colours[2]}" stroke-width="3"/>${textBlock(["READ", "NOTICE", "DO"][index], x + 93.5, 110, { size: 13, weight: 800, fill: colours[2], maxLines: 1 })}${textBlock(label, x + 93.5, 145, { limit: 20, size: 15, maxLines: 5 })}`;
  }).join("");
  return `<symbol id="${id}" viewBox="0 0 640 300"><rect width="640" height="300" rx="22" fill="#f8fafc"/><circle cx="32" cy="34" r="12" fill="${colours[2]}"/><rect x="51" y="23" width="42" height="22" rx="8" fill="${colours[1]}"/>${textBlock(`${code} • ${strand}`, 320, 40, { limit: 34, size: 18, maxLines: 1 })}${cards}</symbol>`;
}

function makeItem(code, unit, bank, bankIndex, itemSource, variant, sourceIndex) {
  const isAnswer = variant === "answer";
  const sequence = String(bankIndex + 1).padStart(3, "0");
  const id = `${code}-${bank === "practice" ? "P" : "T"}-${sequence}`;
  const correctIndex = (bankIndex + codes.indexOf(code)) % 3;
  const wrongChoice = itemSource.wrong[sourceIndex % 2];
  const question = isAnswer
    ? itemSource.question
    : `A student answers “${wrongChoice}”. Which feedback helps? Task: ${itemSource.question}`;
  const correct = isAnswer ? itemSource.correct : itemSource.hint;
  const wrong = isAnswer ? itemSource.wrong : [
    `Keep “${wrongChoice}”; it uses a detail that sounds familiar.`,
    `Choose “${itemSource.wrong[(sourceIndex + 1) % 2]}” instead; it sounds clearer.`
  ];
  const symbolId = id.toLowerCase();
  const visualTitle = itemSource.title.replace(/^Test\s+/i, "");
  const visualAlt = `Three-step ${unit.title} organiser. Read: ${visualTitle}. Notice: ${unit.mastery[sourceIndex % unit.mastery.length]}. ${isAnswer ? "Choose the response supported by the example." : "Correct the student's mix-up using the full task."}`;
  const answers = orderedAnswers(correct, wrong, correctIndex);
  return {
    item: {
      id,
      subject: "english",
      year_level: "Year 2",
      curriculum_code: code,
      bank,
      skill: `${slug(itemSource.title)}_${isAnswer ? "apply" : "reason"}`,
      question,
      audio_prompt: question,
      visual: { type: "svg", asset_path: `/assets/assessment-visuals/year2/english/${code.toLowerCase()}.svg#${symbolId}`, alt_text: visualAlt },
      answers,
      ...(code === "AC9E2LA10" && isAnswer ? { audio_answers: answers.map((answer) => editingChoiceSpeech(answer.text)) } : {}),
      correct_index: correctIndex,
      explanation: {
        summary: isAnswer ? itemSource.summary : `${itemSource.hint} ${itemSource.summary}`,
        hint: isAnswer ? itemSource.hint : "Check the whole example and decide which feedback addresses the exact mix-up."
      }
    },
    symbol: visualSymbol(symbolId, code, unit, itemSource, variant, sourceIndex)
  };
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
const report = [];
for (const code of codes) {
  const unit = units[code];
  const contexts = dataContexts(code, unit);
  const items = [];
  const symbols = [];
  for (const bank of ["practice", "test"]) {
    let bankIndex = 0;
    contexts[bank].forEach((itemSource, sourceIndex) => {
      for (const variant of ["answer", "reason"]) {
        const built = makeItem(code, unit, bank, bankIndex, itemSource, variant, sourceIndex);
        items.push(built.item);
        symbols.push(built.symbol);
        bankIndex += 1;
      }
    });
  }
  const practice = items.filter((item) => item.bank === "practice").length;
  const test = items.filter((item) => item.bank === "test").length;
  if (practice !== 24 || test !== 16) throw new Error(`${code}: incorrect counts ${practice}/${test}`);
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${symbols.join("\n")}\n</svg>\n`);
  report.push({ code, title: unit.title, practice, test, total: practice + test });
}

console.log(JSON.stringify({ status: "BUILT", codes: report.length, practice: report.reduce((sum, row) => sum + row.practice, 0), test: report.reduce((sum, row) => sum + row.test, 0), total: report.reduce((sum, row) => sum + row.total, 0) }, null, 2));
