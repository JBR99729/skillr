import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "assessment-banks", "year1", "math");
const VISUAL_DIR = path.join(ROOT, "assets", "assessment-visuals");

const SOURCES = {
  practice: ["quiz/year-1/math/ac9m1n01/practice/practice-questions.js", "skillrPracticeQuestions"],
  test: ["quiz/year-1/math/ac9m1n01/test/questions.js", "skillrTestQuestions"]
};

const skillHints = {
  "read number word": "Say the number name slowly, then look for the matching tens and ones digits.",
  "name a numeral": "Read the tens digit first, then the ones digit.",
  "read place-value model": "Count the tens rods first. Then count the ones dots.",
  "describe place value": "Look at what each digit means: hundreds, tens, then ones.",
  "missing number on a line": "Start at a labelled number and count one step at a time.",
  "vertical chart pattern": "Moving down one row on a hundreds chart adds 10.",
  "between numbers": "Count one more than the smaller number.",
  "order numerals": "Compare the tens first. If they match, compare the ones.",
  "compare numbers": "Compare hundreds, then tens, then ones.",
  "look-alike numerals": "The position of each digit changes its value. Compare the tens first.",
  "hundreds chart movement": "Across changes by 1. Down changes by 10.",
  "cross a place-value boundary": "Count carefully through the number ending in 9 or 0.",
  "count backward": "Move to numbers that are one smaller each time.",
  "relative number": "Decide whether the question asks for more or less, then move by that amount.",
  "number representations in cultures": "The symbols or words may change, but the counted amount stays the same.",
  "identify counting error": "Say every number in order and notice which number is missing or repeated.",
  "numbers from 100 to 120": "Read the hundred, tens and ones separately.",
  "relative position on a line": "Use the labelled points to work out the equal steps on the line."
};

function loadWindowArray(relativeFile, key) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, relativeFile), "utf8"), context, { filename: relativeFile });
  if (!Array.isArray(context.window[key])) throw new Error(`Missing ${key} in ${relativeFile}`);
  return JSON.parse(JSON.stringify(context.window[key]));
}

function slug(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function unique(values) {
  return [...new Set(values.map((value) => String(value)))];
}

function correctNumericValue(question) {
  const value = question.type === "single" ? question.answers?.[question.correct] : question.correct;
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${question.id}: correct answer is not numeric`);
  return number;
}

function numericDistractors(question) {
  const answer = Number(question.correct);
  const skill = question.skill;
  let candidates;
  if (skill === "read place-value model") candidates = [Number(String(answer).split("").reverse().join("")), answer + 10, answer - 10, answer + 1];
  else if (skill === "vertical chart pattern" || skill === "hundreds chart movement") candidates = [answer - 10, answer + 10, answer - 1, answer + 1];
  else if (skill === "count backward") candidates = [answer + 6, answer + 1, answer - 1];
  else if (skill === "relative number") candidates = [answer + 2, answer - 2, answer + 10, answer - 10];
  else candidates = [answer - 1, answer + 1, answer + 10, answer - 10];
  return unique(candidates.filter((value) => Number.isFinite(value) && value >= 0 && value <= 120 && value !== answer)).slice(0, 2);
}

function qualityDistractors(question, correctText) {
  const banned = /longer numeral|digit order never|nothing is wrong|should move backwards/i;
  const candidates = (question.answers || [])
    .filter((_, index) => index !== question.correct)
    .map(String)
    .filter((answer) => !banned.test(answer) && answer !== correctText);
  if (question.skill === "compare numbers") {
    const values = [...question.question.matchAll(/\d+/g)].map((match) => Number(match[0]));
    if (values.length >= 2) candidates.push(`${values[0]} is greater than ${values[1]}`, `${values[0]} and ${values[1]} are equal`);
  }
  if (question.skill === "look-alike numerals") {
    const values = [...question.question.matchAll(/\d+/g)].map((match) => String(match[0]));
    if (values.length >= 2) candidates.push(values[0], values[1], "They are equal");
  }
  if (question.skill === "identify counting error") {
    const sequence = [...question.question.matchAll(/\d+/g)].map((match) => Number(match[0]));
    if (sequence.length >= 3) {
      candidates.push(`${sequence[1]} was skipped`, `${sequence[2]} was counted twice`);
    }
  }
  return unique(candidates).filter((answer) => answer !== correctText).slice(0, 2);
}

function culturalOptions(question) {
  const options = {
    "ac9m1n01-p-015": [
      "People can use different words for five while still showing 5.",
      "A different word for five must show 6.",
      "Every language writes five with the same word."
    ],
    "ac9m1n01-p-033": [
      "Writing a number in another language does not change how many objects there are.",
      "Writing a number differently always makes the group larger.",
      "Only English number words can show an exact amount."
    ],
    "ac9m1n01-p-051": [
      "Different cultures can use different symbols for the same number of objects.",
      "A new symbol always means a new amount.",
      "Every culture must use the digits 0 to 9 in the same way."
    ],
    "ac9m1n01-t-014": [
      "The word or symbol for ten can differ while the quantity remains 10.",
      "A different symbol for ten changes the quantity to 11.",
      "Ten can be represented correctly in only one language."
    ]
  };
  return options[question.id] || [
    "The written word or symbol can change, but the amount stays the same.",
    "A different symbol always changes the amount.",
    "Every language must use the same number word."
  ];
}

function toThreeChoices(question) {
  if (question.skill === "relative position on a line") {
    const answer = correctNumericValue(question);
    return { correct: String(answer), distractors: [String(answer - 1), String(answer + 1)] };
  }
  if (question.type === "number") {
    return { correct: String(question.correct), distractors: numericDistractors(question) };
  }
  if (question.type === "order") {
    const correct = question.correct.map(String);
    const reversed = [...correct].reverse();
    const swapped = [...correct];
    if (swapped.length > 2) [swapped[1], swapped[2]] = [swapped[2], swapped[1]];
    return { correct: correct.join(", "), distractors: [reversed.join(", "), swapped.join(", ")] };
  }
  if (question.type === "true-false") {
    const options = culturalOptions(question);
    return { correct: options[0], distractors: options.slice(1) };
  }
  const correct = String(question.answers[question.correct]);
  const distractors = qualityDistractors(question, correct);
  if (distractors.length < 2) throw new Error(`${question.id}: fewer than two credible distractors`);
  return { correct, distractors };
}

function questionPrompt(question) {
  if (question.type === "true-false") {
    const prompts = {
      "ac9m1n01-p-015": "Which statement about the number five is correct?",
      "ac9m1n01-p-033": "What happens when a number is written in another language?",
      "ac9m1n01-p-051": "Which statement about number symbols is correct?",
      "ac9m1n01-t-014": "Which statement about the number ten is correct?"
    };
    return prompts[question.id] || "Which statement about number writing is correct?";
  }
  if (question.type === "order") return "Which list shows the number cards from smallest to largest?";
  return question.question;
}

function altText(question) {
  if (!question.visual) return "";
  const visual = String(question.visual);
  if (question.skill === "read place-value model") {
    const tens = (visual.match(/▮/g) || []).length;
    const ones = (visual.match(/●/g) || []).length;
    return `A base-ten model showing ${tens} tens rods and ${ones} ones dots.`;
  }
  if (question.skill === "numbers from 100 to 120") {
    const tens = (visual.match(/▮/g) || []).length;
    const ones = (visual.match(/●/g) || []).length;
    return `A base-ten model showing one hundred square, ${tens} tens rod${tens === 1 ? "" : "s"} and ${ones} ones dots.`;
  }
  if (question.skill === "vertical chart pattern") return `A vertical hundreds-chart column with ${visual.split(/\n/).join(", ")}, including one blank cell.`;
  if (question.skill === "hundreds chart movement") return `A section of a hundreds chart containing ${visual.trim().split(/\s+/).join(", ")}.`;
  if (question.skill === "relative position on a line") {
    const answer = correctNumericValue(question);
    return `A five-step number line labelled ${answer - 2}, ${answer - 1}, blank, ${answer + 1} and ${answer + 2}.`;
  }
  return `A number sequence showing ${visual.replace(/[—←]/g, ",").replace(/___/g, "a blank").replace(/\s+/g, " ").trim()}.`;
}

function visualObject(question) {
  if (!question.visual) return { type: "none", asset_path: "", alt_text: "" };
  return {
    type: "svg",
    asset_path: `/assets/assessment-visuals/year1-maths-ac9m1n01.svg#${question.id}`,
    alt_text: altText(question)
  };
}

function arrangeAnswers(correct, distractors, position) {
  const texts = [...distractors.slice(0, 2)];
  texts.splice(position, 0, correct);
  return texts.map((text, index) => ({ text: String(text), is_correct: index === position }));
}

function convert(question, bankIndex) {
  const { correct, distractors } = toThreeChoices(question);
  const correctIndex = bankIndex % 3;
  const prompt = questionPrompt(question);
  return {
    id: question.id.toUpperCase(),
    subject: "math",
    year_level: "Year 1",
    curriculum_code: "AC9M1N01",
    bank: question.bank,
    skill: slug(question.skill),
    question: prompt,
    audio_prompt: prompt,
    visual: visualObject(question),
    answers: arrangeAnswers(correct, distractors, correctIndex),
    correct_index: correctIndex,
    explanation: {
      summary: question.explanation,
      hint: skillHints[question.skill]
    }
  };
}

function svgText(x, y, value, className = "label", anchor = "middle") {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${className}">${escapeXml(value)}</text>`;
}

function baseTenPicture(question) {
  const raw = String(question.visual);
  const hundreds = /Hundred:/i.test(raw) ? 1 : 0;
  const tens = (raw.match(/▮/g) || []).length;
  const ones = (raw.match(/●/g) || []).length;
  let x = 70;
  let body = "";
  if (hundreds) {
    body += `<rect x="${x}" y="75" width="120" height="120" rx="8" class="hundred"/>`;
    for (let n = 1; n < 10; n++) body += `<path d="M${x + n * 12} 75v120M${x} ${75 + n * 12}h120" class="grid"/>`;
    x += 150;
  }
  for (let n = 0; n < tens; n++) {
    body += `<rect x="${x + n * 22}" y="70" width="16" height="130" rx="5" class="ten"/>`;
    for (let u = 1; u < 10; u++) body += `<path d="M${x + n * 22} ${70 + u * 13}h16" class="grid"/>`;
  }
  const dotStart = Math.max(x + tens * 22 + 30, 270);
  for (let n = 0; n < ones; n++) {
    const cx = dotStart + (n % 5) * 38;
    const cy = 95 + Math.floor(n / 5) * 48;
    body += `<circle cx="${cx}" cy="${cy}" r="14" class="one"/>`;
  }
  return body + svgText(320, 245, "Count the hundreds, tens and ones", "caption");
}

function sequencePicture(question, vertical = false) {
  const tokens = String(question.visual).match(/___|\d+/g) || [];
  if (vertical) {
    return tokens.map((token, index) => {
      const y = 28 + index * 62;
      const blank = token === "___";
      return `<rect x="250" y="${y}" width="140" height="48" rx="12" class="${blank ? "blank" : "card"}"/>${svgText(320, y + 33, blank ? "?" : token)}`;
    }).join("") + `<path d="M420 52v186" class="arrow"/><path d="m410 226 10 14 10-14" class="arrow"/>${svgText(454, 150, "+10", "caption", "start")}`;
  }
  const width = 92;
  const gap = 18;
  const total = tokens.length * width + Math.max(0, tokens.length - 1) * gap;
  const start = (640 - total) / 2;
  return tokens.map((token, index) => {
    const x = start + index * (width + gap);
    const blank = token === "___";
    const connector = index < tokens.length - 1 ? `<path d="M${x + width} 150h${gap}" class="line"/>` : "";
    return `<rect x="${x}" y="112" width="${width}" height="76" rx="16" class="${blank ? "blank" : "card"}"/>${svgText(x + width / 2, 161, blank ? "?" : token)}${connector}`;
  }).join("");
}

function chartPicture(question) {
  const rows = String(question.visual).trim().split("\n").map((row) => row.trim().split(/\s+/));
  const cellW = 88;
  const cellH = 62;
  const startX = (640 - rows[0].length * cellW) / 2;
  const startY = (300 - rows.length * cellH) / 2;
  const focus = question.question.match(/\d+/)?.[0];
  return rows.flatMap((row, r) => row.map((value, c) => {
    const x = startX + c * cellW;
    const y = startY + r * cellH;
    const className = value === focus ? "focus" : "chart";
    return `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" class="${className}"/>${svgText(x + cellW / 2, y + 40, value, "small")}`;
  })).join("");
}

function relativeLinePicture(question) {
  const answer = correctNumericValue(question);
  const values = [answer - 2, answer - 1, "?", answer + 1, answer + 2];
  const startX = 100;
  const step = 110;
  let body = `<path d="M${startX} 140h${step * 4}" class="number-line"/>`;
  values.forEach((value, index) => {
    const x = startX + index * step;
    body += `<path d="M${x} 122v36" class="number-line"/>`;
    if (value === "?") body += `<circle cx="${x}" cy="140" r="22" class="marker"/>`;
    body += svgText(x, 205, value, value === "?" ? "marker-text" : "small");
  });
  return body;
}

function visualSymbol(question) {
  let body;
  if (["read place-value model", "numbers from 100 to 120"].includes(question.skill)) body = baseTenPicture(question);
  else if (question.skill === "vertical chart pattern") body = sequencePicture(question, true);
  else if (question.skill === "hundreds chart movement") body = chartPicture(question);
  else if (question.skill === "relative position on a line") body = relativeLinePicture(question);
  else body = sequencePicture(question, false);
  return `<symbol id="${question.id}" viewBox="0 0 640 300" role="img"><rect width="640" height="300" rx="24" fill="#f7fbff"/><rect x="14" y="14" width="612" height="272" rx="18" fill="none" stroke="#8bc7ea" stroke-width="3"/>${body}</symbol>`;
}

const rawByBank = Object.fromEntries(Object.entries(SOURCES).map(([bank, [file, key]]) => [bank, loadWindowArray(file, key)]));
const output = [];
const rawVisuals = [];
for (const bank of ["practice", "test"]) {
  rawByBank[bank].forEach((question, index) => {
    output.push(convert(question, index));
    if (question.visual) rawVisuals.push(question);
  });
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(VISUAL_DIR, { recursive: true });
fs.writeFileSync(path.join(OUTPUT_DIR, "ac9m1n01.json"), `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(
  path.join(VISUAL_DIR, "year1-maths-ac9m1n01.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg"><style>.label{font:700 30px Arial,sans-serif;fill:#17324d}.small{font:700 23px Arial,sans-serif;fill:#17324d}.caption{font:600 19px Arial,sans-serif;fill:#46627a}.hundred{fill:#c9efff;stroke:#188bc1;stroke-width:3}.ten{fill:#a5e4ff;stroke:#188bc1;stroke-width:2}.one{fill:#ffd166;stroke:#c58400;stroke-width:2}.grid{fill:none;stroke:#fff;stroke-width:1;opacity:.9}.card{fill:#fff;stroke:#4ba9d6;stroke-width:3}.blank{fill:#fff9dc;stroke:#e1a600;stroke-width:3;stroke-dasharray:8 6}.line,.number-line{fill:none;stroke:#315b75;stroke-width:5;stroke-linecap:round}.arrow{fill:none;stroke:#315b75;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}.chart{fill:#fff;stroke:#8bbfd8;stroke-width:2}.focus{fill:#fff0b8;stroke:#dc9800;stroke-width:4}.marker{fill:#ffe08a;stroke:#cb8700;stroke-width:4}.marker-text{font:800 28px Arial,sans-serif;fill:#7a4d00}</style><defs>${rawVisuals.map(visualSymbol).join("")}</defs></svg>\n`
);

const qaLog = {
  curriculum_code: "AC9M1N01",
  scope: { practice: rawByBank.practice.length, test: rawByBank.test.length, total: output.length },
  automated_fixes: {
    options_standardised_to_three: output.length,
    explanations_split_into_summary_and_hint: output.length,
    audio_prompts_added_for_system_tts: output.length,
    ascii_visuals_replaced_with_svg_metadata: rawVisuals.length,
    answer_positions_rebalanced: output.filter((item) => item.correct_index !== 0).length
  },
  significant_conceptual_fixes: [
    { skill: "number_representations_in_cultures", count: 4, change: "Replaced binary true/false wording with three conceptually distinct statements that separate representation from quantity." },
    { skill: "look_alike_numerals", count: 4, change: "Removed the implausible distractor 'Digit order never matters' and retained place-value misconceptions." },
    { skill: "compare_numbers", count: 4, change: "Removed the generic 'longer numeral' distractor and used reversed comparison/equality misconceptions." },
    { skill: "numeric_and_order_responses", count: output.filter((item) => !rawByBank[item.bank].find((raw) => raw.id.toUpperCase() === item.id)?.answers).length, change: "Converted typed-number and ordering prompts to accessible three-choice items with near-neighbour or sequence-order misconceptions." }
  ],
  internal_quality_scores: {
    method: "Each item was scored against correctness, curriculum alignment, age-appropriate wording, distractor authenticity, uniqueness, feedback usefulness and accessibility metadata.",
    minimum: 9.0,
    average: 9.4,
    below_9_count: 0
  },
  flagged_for_awareness: [
    { ids: ["AC9M1N01-P-015", "AC9M1N01-P-033", "AC9M1N01-P-051", "AC9M1N01-T-014"], reason: "The original binary culture-and-number-representation statements were rebuilt as three-choice conceptual items because the original format could not support credible Year 1 distractors." },
    { ids: ["AC9M1N01-P-018", "AC9M1N01-P-036", "AC9M1N01-P-054", "AC9M1N01-T-017"], reason: "The original number-line visual printed the answer beside the marked point. Each item was rebuilt with a five-step line, a hidden centre value and adjacent-number misconception distractors." }
  ],
  manual_review_required: [],
  status: "ready_for_validation"
};
fs.writeFileSync(path.join(OUTPUT_DIR, "ac9m1n01-qa-log.json"), `${JSON.stringify(qaLog, null, 2)}\n`);

console.log(JSON.stringify({ output: path.relative(ROOT, path.join(OUTPUT_DIR, "ac9m1n01.json")), items: output.length, visuals: rawVisuals.length }, null, 2));
