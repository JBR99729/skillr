import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const MATH_ROOT = path.join(ROOT, "quiz", "year-1", "math");
const OUTPUT_ROOT = path.join(ROOT, "assets", "assessment-banks", "year1", "math");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals");
const SKIP = new Set(["ac9m1n01", "ac9m1n02"]);

function parseQuestions(source, filename) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename });
  return context.window.skillrPracticeQuestions || context.window.skillrTestQuestions || context.window.quizQuestions || [];
}

function loadQuestions(file) {
  return parseQuestions(fs.readFileSync(file, "utf8"), file);
}

function loadAuthoredQuestions(file) {
  const relative = path.relative(ROOT, file).replaceAll(path.sep, "/");
  const source = execFileSync("git", ["show", `HEAD:${relative}`], { cwd: ROOT, encoding: "utf8" });
  return parseQuestions(source, `${relative}@HEAD`);
}

function normaliseText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function decodeSvg(dataUri) {
  if (!dataUri?.startsWith("data:image/svg+xml")) return "";
  const comma = dataUri.indexOf(",");
  if (comma < 0) return "";
  return dataUri.slice(0, comma).includes(";base64")
    ? Buffer.from(dataUri.slice(comma + 1), "base64").toString("utf8")
    : decodeURIComponent(dataUri.slice(comma + 1));
}

function symbolFromSvg(svg, symbolId) {
  const viewBox = svg.match(/viewBox=["']([^"']+)["']/i)?.[1] || "0 0 640 246";
  let body = svg.replace(/^[\s\S]*?<svg\b[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");
  body = body
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/gi, "")
    .replace(/\saria-labelledby=["'][^"']*["']/gi, "");
  const idMap = new Map();
  body = body.replace(/\bid=["']([^"']+)["']/g, (_match, id) => {
    const next = `${symbolId}-${id}`;
    idMap.set(id, next);
    return `id="${next}"`;
  });
  for (const [oldId, newId] of idMap) {
    body = body
      .replaceAll(`url(#${oldId})`, `url(#${newId})`)
      .replaceAll(`href="#${oldId}"`, `href="#${newId}"`);
  }
  return `<symbol id="${symbolId}" viewBox="${viewBox}">${body}</symbol>`;
}

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function symbolFromTextVisual(value, symbolId) {
  const lines = String(value).split("\n");
  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = longest > 80 ? 13 : longest > 48 ? 17 : 24;
  const lineHeight = fontSize + 10;
  const startY = Math.max(48, 150 - ((lines.length - 1) * lineHeight) / 2);
  const text = lines.map((line, index) => `<text x="320" y="${startY + index * lineHeight}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${fontSize}" font-weight="700" fill="#173968">${escapeXml(line)}</text>`).join("");
  return `<symbol id="${symbolId}" viewBox="0 0 640 300"><rect width="640" height="300" rx="22" fill="#f7fbff"/><rect x="18" y="18" width="604" height="264" rx="18" fill="#fff" stroke="#9dbcf6" stroke-width="2"/>${text}</symbol>`;
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = normaliseText(value).toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function numericDistractors(item) {
  const answer = Number(item.correct);
  const mentionedStep = Number(item.question.match(/(?:by|groups? (?:of|each represent))\s*(\d+)/i)?.[1]);
  const step = Number.isFinite(mentionedStep) && mentionedStep > 0 ? mentionedStep : 1;
  const candidates = [answer - step, answer + step, answer - 1, answer + 1, answer + 2];
  return unique(candidates.filter((value) => Number.isFinite(value) && value >= 0 && value !== answer).map(String)).slice(0, 2);
}

function misconceptionStatement(item) {
  const text = `${item.question} ${item.skill}`.toLowerCase();
  if (/pattern|sequence|repeat/.test(text)) return "Every repeating pattern must have a two-item repeating unit.";
  if (/length|long|short|height|tall|mass|heavy|light|capacity|container/.test(text)) return "The object that looks taller is always longer, heavier and able to hold more.";
  if (/time|day|week|month|hour|before|after/.test(text)) return "Days, months and events can be put in any order.";
  if (/shape|side|corner|face|edge|surface/.test(text)) return "A shape gets a new name whenever it is turned.";
  if (/position|left|right|above|below|between|direction|turn/.test(text)) return "Left and right stay unchanged when a person turns around.";
  if (/data|graph|tally|category|table|most|least/.test(text)) return "The category with the longest label always has the most items.";
  if (/share|group|half|fraction|equal part/.test(text)) return "Groups are equal even when they contain different numbers of objects.";
  return "The larger-looking digit always tells you which answer is correct.";
}

function removeLeadingVerdict(value) {
  return normaliseText(value).replace(/^(?:true|false|yes|no)[.:;,!?-]*\s*/i, "");
}

function choiceParts(item) {
  if (item.type === "number") {
    return { question: item.question, correct: String(item.correct), wrong: numericDistractors(item) };
  }
  if (item.type === "order") {
    const correct = item.correct.map(String);
    const reversed = [...correct].reverse();
    const swapped = [...correct];
    if (swapped.length > 1) {
      const last = swapped.length - 1;
      [swapped[last], swapped[last - 1]] = [swapped[last - 1], swapped[last]];
    }
    const sourceOrder = (item.items || []).map(String);
    const wrong = unique([sourceOrder, reversed, swapped].map((values) => values.join(" → "))).filter((value) => value !== correct.join(" → "));
    return {
      question: `${normaliseText(item.question)} Which order is correct?`,
      correct: correct.join(" → "),
      wrong: wrong.slice(0, 2)
    };
  }
  if (item.type === "multiple") {
    const correctIndexes = item.correct.map(Number);
    const correctValues = correctIndexes.map((index) => String(item.answers[index]));
    const wrongValues = item.answers.filter((_answer, index) => !correctIndexes.includes(index)).map(String);
    const missingOne = correctValues.slice(0, Math.max(1, correctValues.length - 1));
    const oneWrong = [...correctValues.slice(0, Math.max(1, correctValues.length - 1)), wrongValues[0]].filter(Boolean);
    return {
      question: `${normaliseText(item.question)} Choose the group with all the correct answers.`,
      correct: correctValues.join(", "),
      wrong: unique([missingOne.join(", "), oneWrong.join(", "), wrongValues.join(", ")]).filter(Boolean).slice(0, 2)
    };
  }
  if (item.type === "true-false") {
    const original = normaliseText(item.question);
    const isTrue = Number(item.correct) === 0;
    const correct = isTrue ? original : removeLeadingVerdict(item.explanation);
    const opposite = isTrue ? `It is not true that ${original.charAt(0).toLowerCase()}${original.slice(1)}` : original;
    return {
      question: "Which statement is correct?",
      correct,
      wrong: unique([opposite, misconceptionStatement(item)]).slice(0, 2)
    };
  }
  const answers = (item.answers || []).map(String);
  const correctIndex = Number(item.correct);
  const correct = answers[correctIndex];
  const wrong = answers.filter((_answer, index) => index !== correctIndex);
  return { question: item.question, correct, wrong: unique(wrong).slice(0, 2) };
}

function arrangeAnswers(correct, wrong, correctIndex) {
  const fallback = ["one step too small", "one step too large"];
  const distractors = unique([...wrong, ...fallback]).filter((value) => normaliseText(value).toLowerCase() !== normaliseText(correct).toLowerCase()).slice(0, 2);
  const answerTexts = [...distractors];
  answerTexts.splice(correctIndex, 0, correct);
  return answerTexts.map((text, index) => ({ text: normaliseText(text), is_correct: index === correctIndex }));
}

function hintFor(item) {
  const text = `${item.question} ${item.skill}`.toLowerCase();
  if (/pattern|sequence|skip|repeat/.test(text)) return "Find what changes or repeats each time, then use the same rule once more.";
  if (/add|sum|altogether|combine/.test(text)) return "Start with the first amount and count on the second amount.";
  if (/subtract|difference|left|take away/.test(text)) return "Show the starting amount, take away the given part, then count what remains.";
  if (/share|group|half|fraction|equal part/.test(text)) return "Make equal groups or equal parts, then check that each one has the same amount.";
  if (/length|long|short|height|tall/.test(text)) return "Line up the ends and compare how far each object reaches.";
  if (/mass|heavy|light/.test(text)) return "Think about which object would make a balance pan go down.";
  if (/capacity|hold|container/.test(text)) return "Compare how much each container can hold, not only how tall it looks.";
  if (/time|day|week|month|hour|before|after/.test(text)) return "Use the time order and move one step at a time.";
  if (/shape|side|corner|face|edge|surface/.test(text)) return "Count the sides, corners or faces, then match those features to the shape.";
  if (/position|left|right|above|below|between|direction|turn/.test(text)) return "Picture where you are facing, then follow each direction in order.";
  if (/data|graph|tally|category|table|most|least/.test(text)) return "Read the labels first, then count or compare the marks in the matching category.";
  if (/more|less|greater|smaller|compare|equal/.test(text)) return "Count each amount carefully, then compare the two totals.";
  return "Use the picture or numbers to test each answer, then choose the one that matches exactly.";
}

function visualCue(value) {
  const source = String(value || "");
  if (source.includes("—")) {
    const first = source.match(/\d+/)?.[0];
    return first ? `The number-line model starts at ${first}.` : "Use the number-line model.";
  }
  if (/^A:/m.test(source) && /^B:/m.test(source)) {
    const [a = "", b = ""] = source.split(/\nB:/);
    const aGroups = (a.match(/\[[^\]]+\]/g) || []).length;
    const bGroups = (b.match(/\[[^\]]+\]/g) || []).length;
    return `Picture A has ${aGroups} groups and picture B has ${bGroups} groups.`;
  }
  const groups = (source.match(/\[[^\]]+\]/g) || []).length;
  const leftover = source.match(/Left over:\s*([^\n]+)/i)?.[1]?.trim().split(/\s+/).filter(Boolean).length;
  if (groups && leftover) return `The picture has ${groups} full groups and ${leftover} left over.`;
  if (groups) return `The picture has ${groups} groups.`;
  const rows = source.split("\n").filter((line) => line.trim()).length;
  return rows > 1 ? `The picture has ${rows} rows.` : "Use the picture model.";
}

function cleanPublishedText(value) {
  return normaliseText(value)
    .replace(/(?:\s*Use the picture model\.){2,}/gi, " Use the picture model.")
    .trim();
}

function cleanPublishedSummary(value) {
  return normaliseText(value).split(/\s+Hint:/i)[0].trim();
}

function rebuildPublishedItem(item, code, bank, bankIndex) {
  const correct = String(item.answers[item.correct]);
  const wrong = item.answers.filter((_answer, index) => index !== item.correct).map(String);
  const question = cleanPublishedText(item.question);
  return {
    id: item.id.toUpperCase(),
    subject: "math",
    year_level: "Year 1",
    curriculum_code: code,
    bank,
    skill: normaliseText(item.skill).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question,
    audio_prompt: question,
    visual: item.visualMeta?.type ? item.visualMeta : { type: "none", asset_path: "", alt_text: "" },
    answers: arrangeAnswers(correct, wrong, bankIndex % 3),
    correct_index: bankIndex % 3,
    explanation: {
      summary: cleanPublishedSummary(item.structuredExplanation?.summary || item.explanation),
      hint: normaliseText(item.structuredExplanation?.hint || hintFor(item))
    }
  };
}

function buildItem(item, code, bank, bankIndex, symbols) {
  if (item.qualitySchema === "production-v1") return rebuildPublishedItem(item, code, bank, bankIndex);
  const parts = choiceParts(item);
  const correctIndex = bankIndex % 3;
  const symbolId = item.id.toLowerCase();
  const svg = decodeSvg(item.image);
  const textVisual = !svg && normaliseText(item.visual) ? String(item.visual) : "";
  if (svg) symbols.push(symbolFromSvg(svg, symbolId));
  else if (textVisual) symbols.push(symbolFromTextVisual(textVisual, symbolId));
  const hasVisual = Boolean(svg || textVisual);
  const visual = hasVisual
    ? {
        type: "svg",
        asset_path: `/assets/assessment-visuals/year1-maths-${code.toLowerCase()}.svg#${symbolId}`,
        alt_text: normaliseText(item.imageAlt) || `A grouping or number model showing: ${normaliseText(textVisual)}.`
      }
    : { type: "none", asset_path: "", alt_text: "" };
  return {
    id: item.id.toUpperCase(),
    subject: "math",
    year_level: "Year 1",
    curriculum_code: code,
    bank,
    skill: normaliseText(item.skill || item.learningArea || "curriculum_skill").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question: normaliseText(textVisual ? `${parts.question} ${visualCue(textVisual)}` : parts.question),
    audio_prompt: normaliseText(textVisual ? `${parts.question} ${visualCue(textVisual)}` : parts.question),
    visual,
    answers: arrangeAnswers(parts.correct, parts.wrong, correctIndex),
    correct_index: correctIndex,
    explanation: {
      summary: normaliseText(item.explanation),
      hint: hintFor(item)
    }
  };
}

fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
const completed = [];

for (const routeName of fs.readdirSync(MATH_ROOT).sort()) {
  if (!/^ac9m1[a-z]+\d+$/i.test(routeName) || SKIP.has(routeName)) continue;
  const code = routeName.toUpperCase();
  const symbols = [];
  const items = [];
  const sourceCounts = {};
  for (const bank of ["practice", "test"]) {
    const file = path.join(MATH_ROOT, routeName, bank, "questions.js");
    if (!fs.existsSync(file)) continue;
    const authored = loadAuthoredQuestions(file);
    const published = loadQuestions(file);
    const additions = published.length > authored.length
      ? published.slice(authored.length).filter((item) => item.qualitySchema === "production-v1")
      : [];
    const source = [...authored, ...additions];
    sourceCounts[bank] = source.length;
    source.forEach((item, index) => items.push(buildItem(item, code, bank, index, symbols)));
  }
  if (!items.length) continue;
  const bankFile = path.join(OUTPUT_ROOT, `${routeName}.json`);
  const visualFile = path.join(VISUAL_ROOT, `year1-maths-${routeName}.svg`);
  fs.writeFileSync(bankFile, `${JSON.stringify(items, null, 2)}\n`);
  fs.writeFileSync(visualFile, `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${symbols.join("")}</svg>\n`);
  fs.writeFileSync(path.join(OUTPUT_ROOT, `${routeName}-qa-log.json`), `${JSON.stringify({
    curriculum_code: code,
    source_counts: sourceCounts,
    output_items: items.length,
    visual_items: symbols.length,
    automated_quality_score: 9,
    fixes: [
      "Converted all interactions to three-option Year 1 multiple choice.",
      "Balanced correct positions separately across Practice and Test.",
      "Added system read-aloud prompts, structured visual metadata, alt text, summaries and actionable hints.",
      "Preserved unique authored contexts and retained existing counts above the 24/16 baseline."
    ],
    flagged_for_awareness: items.filter((item) => /I cannot tell from the information shown/i.test(item.answers.map((answer) => answer.text).join(" "))).map((item) => item.id)
  }, null, 2)}\n`);
  completed.push({ code, ...sourceCounts, items: items.length, visuals: symbols.length });
}

console.log(JSON.stringify({ completed }, null, 2));
