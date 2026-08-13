import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const jsonPath = path.join(repo, "quiz/assets/daily-drills/foundation-maths-production-v2.json");
const svgPath = path.join(repo, "quiz/assets/daily-drills/foundation-maths-visuals-v2.svg");

const files = [
  "quiz/assets/daily-drills/catalog.js",
  "quiz/assets/daily-drills/math-quick-review.js",
  "quiz/assets/daily-drills/math-master-questions.js",
  "quiz/assets/foundation-maths-rebuild.js",
  "quiz/assets/daily-drills/foundation-rebuild-extensions.js",
  "quiz/assets/daily-drills/foundation-maths-quality.js"
];

const context = { console, location: { pathname: "/quiz/grade-k/daily-drills/math/" } };
context.window = context;
context.globalThis = context;
vm.createContext(context);

for (const file of files) {
  vm.runInContext(fs.readFileSync(path.join(repo, file), "utf8"), context, { filename: file });
}

const production = context.SkillrFoundationMathsProduction;
if (!production?.all?.length) throw new Error("Foundation Maths production bank did not load.");

const topicTitles = Object.fromEntries(
  context.SkillrDailyCatalog.years.F.math.map((topic) => [topic.slug, topic.title])
);
const topicEntries = Object.entries(production.topics).map(([slug, banks]) => ({
  slug,
  title: topicTitles[slug],
  core_count: banks.core.length,
  extension_count: banks.extension.length,
  total_count: banks.core.length + banks.extension.length,
  items: [...banks.core, ...banks.extension]
}));
const allItems = topicEntries.flatMap((topic) => topic.items);

const cleanItem = (item) => {
  const copy = JSON.parse(JSON.stringify(item));
  if (copy.visual) delete copy.visual.previous_symbol_id;
  return copy;
};

const dataset = {
  schema_version: "2.0",
  dataset: "SkillrHub Foundation Mathematics Daily Drills",
  curriculum: "Australian Curriculum v9.0",
  year_level: "Foundation",
  age_range: "4–6",
  subject: "Mathematics",
  generated: production.generated,
  item_count: allItems.length,
  quality_rules: {
    answer_positions: "Correct positions are deterministically balanced; the site may reshuffle again between attempts.",
    distractors: "Concept-linked misconceptions only; clearly irrelevant distractors are excluded.",
    language: "Short, conversational and suitable for teacher or system read-aloud.",
    visuals: "Structured SVG metadata with descriptive alt text and a text fallback.",
    feedback: "Every item has a child-friendly summary and an actionable hint.",
    audio: "audio_prompt stores read-aloud text for system text-to-speech; no MP3 asset is required."
  },
  topics: topicEntries.map((topic) => ({ ...topic, items: topic.items.map(cleanItem) }))
};

function contentSignature(item) {
  return JSON.stringify([
    item.question,
    item.visual?.alt_text || "",
    item.answers?.map((answer) => answer.text) || [],
    item.items || [],
    item.template || "",
    item.correct_answer ?? item.correct_index ?? item.correct_indexes
  ]);
}

function wordCount(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function validate(items) {
  const errors = [];
  const ids = new Set();
  const signatures = new Set();
  const positionsByTopic = new Map();
  const mcqByCode = new Map();
  const bannedQuestionLanguage = /\b(attribute|representation|equivalent|numerical|misconception)\b/i;
  const weakDistractor = /colour decides|because .*colou?r|thoughts?|friendl|favourite|random|word is shorter|listed second|brightest|darkest|look different|cannot be compared|guess without|no rules|only colou?r matters|happier|likes water|remembers heat/i;

  for (const item of items) {
    if (!item.id || ids.has(item.id)) errors.push(`Duplicate or missing id: ${item.id}`);
    ids.add(item.id);
    const signature = contentSignature(item);
    if (signatures.has(signature)) errors.push(`Duplicate content: ${item.id}`);
    signatures.add(signature);

    if (!/^AC9MF[A-Z0-9]+$/.test(item.curriculumCode)) errors.push(`Invalid curriculum code: ${item.id}`);
    if (!item.question || wordCount(item.question) > 30) errors.push(`Question is empty or over 30 words: ${item.id}`);
    if (bannedQuestionLanguage.test(item.question)) errors.push(`Formal question language: ${item.id}`);
    if (!item.explanation?.summary || !item.explanation?.hint) errors.push(`Missing two-part feedback: ${item.id}`);
    if (item.audio_prompt !== item.question) errors.push(`Audio prompt mismatch: ${item.id}`);
    if (item.visual && (!item.visual.type || !item.visual.asset_path || !item.visual.alt_text || !item.visual.symbol_id)) {
      errors.push(`Incomplete visual metadata: ${item.id}`);
    }
    if ((item.answers || []).some((answer) => typeof answer.text !== "string" || typeof answer.is_correct !== "boolean")) {
      errors.push(`Invalid structured answers: ${item.id}`);
    }
    const distractors = (item.answers || []).filter((answer) => !answer.is_correct).map((answer) => answer.text);
    if (distractors.some((answer) => weakDistractor.test(answer))) errors.push(`Weak distractor: ${item.id}`);

    if (["single", "true-false"].includes(item.type)) {
      if (!Number.isInteger(item.correct_index) || !item.answers[item.correct_index]?.is_correct) {
        errors.push(`Incorrect answer index: ${item.id}`);
      }
      const key = item.topic;
      const counts = positionsByTopic.get(key) || [0, 0, 0, 0];
      counts[item.correct_index] += 1;
      positionsByTopic.set(key, counts);
      if (item.type === "single" && item.answers.length === 3) {
        mcqByCode.set(item.curriculumCode, (mcqByCode.get(item.curriculumCode) || 0) + 1);
      }
    }
    if (item.type === "multiple") {
      if (!Array.isArray(item.correct_indexes) || item.correct_indexes.length < 2 ||
          item.correct_indexes.some((index) => !item.answers[index]?.is_correct)) {
        errors.push(`Incorrect multi-answer indexes: ${item.id}`);
      }
    }
    if (["number", "text", "fill-blank", "order", "drag-drop"].includes(item.type) &&
        (item.correct_answer === undefined || item.correct_answer === null || item.correct_answer === "")) {
      errors.push(`Missing correct answer: ${item.id}`);
    }
  }

  for (const [topic, counts] of positionsByTopic) {
    if (counts.filter((count) => count > 0).length < 2) errors.push(`Answer index bias remains in ${topic}`);
  }
  const requiredCodes = [
    "AC9MFN01", "AC9MFN02", "AC9MFN03", "AC9MFN04", "AC9MFN05", "AC9MFN06",
    "AC9MFA01", "AC9MFM01", "AC9MFM02", "AC9MFSP01", "AC9MFSP02", "AC9MFST01"
  ];
  requiredCodes.forEach((code) => {
    if ((mcqByCode.get(code) || 0) < 5) errors.push(`Fewer than five three-option MCQs for ${code}`);
  });

  if (errors.length) throw new Error(`Foundation Maths v2 validation failed (${errors.length}):\n${errors.slice(0, 80).join("\n")}`);
  return {
    unique_ids: ids.size,
    unique_content: signatures.size,
    positions_by_topic: Object.fromEntries(positionsByTopic),
    three_option_mcqs_by_code: Object.fromEntries([...mcqByCode].sort())
  };
}

function xml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  }[character]));
}

function symbolFor(visual) {
  const lines = String(visual.fallback_text || visual.alt_text)
    .split(/\n+/).map((line) => line.trim()).filter(Boolean).slice(0, 3);
  const lineHeight = lines.length === 1 ? 0 : 58;
  const firstY = lines.length === 1 ? 105 : lines.length === 2 ? 72 : 48;
  const text = lines.map((line, index) => {
    const length = [...line].length;
    const fontSize = Math.max(24, Math.min(50, Math.floor(620 / Math.max(10, length)) * 2));
    return `<text x="360" y="${firstY + index * lineHeight}" text-anchor="middle" font-family="Arial, 'Noto Sans Symbols 2', sans-serif" font-size="${fontSize}" font-weight="700" fill="#172033">${xml(line)}</text>`;
  }).join("");
  return `<symbol id="${xml(visual.symbol_id)}" viewBox="0 0 720 180"><rect x="2" y="2" width="716" height="176" rx="18" fill="#f8fbff" stroke="#c9d8f5" stroke-width="3"/>${text}</symbol>`;
}

const validation = validate(allItems);
const visuals = allItems.map((item) => item.visual).filter(Boolean);
const uniqueVisuals = [...new Map(visuals.map((visual) => [visual.symbol_id, visual])).values()];
const sprite = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`,
  `<defs>`,
  ...uniqueVisuals.map(symbolFor),
  `</defs>`,
  `</svg>`,
  ``
].join("\n");

fs.writeFileSync(jsonPath, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
fs.writeFileSync(svgPath, sprite, "utf8");

console.log(JSON.stringify({
  json: path.relative(repo, jsonPath),
  json_bytes: fs.statSync(jsonPath).size,
  svg: path.relative(repo, svgPath),
  svg_bytes: fs.statSync(svgPath).size,
  item_count: allItems.length,
  visual_count: visuals.length,
  unique_visuals: uniqueVisuals.length,
  topics: Object.fromEntries(topicEntries.map((topic) => [topic.slug, {
    core: topic.core_count,
    extension: topic.extension_count,
    total: topic.total_count
  }])),
  validation
}, null, 2));
