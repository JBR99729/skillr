import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const input = process.argv[2] || path.resolve(root, "..", "upload", "year2-maths-question-bank-release(1).csv");
const bankRoot = path.join(root, "assets", "assessment-banks", "year2", "math");
const expected = { practice: 48, test: 16 };

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    const next = source[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((candidate) => candidate.some((value) => value !== ""));
}

function parseOptions(value) {
  return String(value)
    .split(/\s+\|\s+/)
    .map((option) => option.replace(/^[A-Z]\.\s*/, "").trim())
    .filter(Boolean);
}

function splitExplanation(value) {
  const text = String(value).trim();
  const parts = text.split(/\s*Hint:\s*/i);
  return {
    summary: parts[0].trim(),
    hint: parts.slice(1).join(" Hint: ").trim() || "Use the information in the question to check your answer.",
  };
}

function skillFromQuestion(question) {
  return String(question)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .split("_")
    .slice(0, 6)
    .join("_") || "year2_math_reviewed_item";
}

function updateItem(row, existing) {
  const options = parseOptions(row.options);
  const correctIndex = options.findIndex((option) => option === row.correct_answer);
  if (options.length < 3) throw new Error(`${row.question_id}: expected at least 3 options`);
  if (correctIndex < 0) throw new Error(`${row.question_id}: correct answer is not in options`);

  const fallback = {
    id: row.question_id,
    subject: "math",
    year_level: "Year 2",
    curriculum_code: row.skill_code,
    bank: row.bank,
    skill: skillFromQuestion(row.question),
    visual: {
      type: "none",
      alt_text: row.question,
    },
  };

  return {
    ...fallback,
    ...existing,
    id: row.question_id,
    subject: "math",
    year_level: "Year 2",
    curriculum_code: row.skill_code,
    bank: row.bank,
    skill: existing?.skill || fallback.skill,
    question: row.question,
    audio_prompt: row.question,
    answers: options.map((text, index) => ({ text, is_correct: index === correctIndex })),
    correct_index: correctIndex,
    explanation: splitExplanation(row.explanation),
  };
}

const [header, ...body] = parseCsv(fs.readFileSync(input, "utf8"));
const required = ["skill_code", "skill_title", "bank", "question_id", "question", "options", "correct_answer", "explanation"];
const indexes = Object.fromEntries(header.map((name, index) => [name, index]));
for (const column of required) {
  if (!(column in indexes)) throw new Error(`Missing CSV column: ${column}`);
}

const rows = body.map((values) => Object.fromEntries(required.map((column) => [column, values[indexes[column]]?.trim() ?? ""])));
const grouped = new Map();

for (const row of rows) {
  if (!row.skill_code || !row.bank || !row.question_id || !row.question || !row.options || !row.correct_answer || !row.explanation) {
    throw new Error(`Incomplete release row: ${JSON.stringify(row)}`);
  }
  if (!["practice", "test"].includes(row.bank)) throw new Error(`${row.question_id}: unsupported bank ${row.bank}`);
  if (!grouped.has(row.skill_code)) grouped.set(row.skill_code, []);
  grouped.get(row.skill_code).push(row);
}

const report = [];
for (const [code, codeRows] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const file = path.join(bankRoot, `${code.toLowerCase()}.json`);
  const current = JSON.parse(fs.readFileSync(file, "utf8"));
  const currentById = new Map(current.map((item) => [item.id, item]));
  const output = codeRows.map((row) => updateItem(row, currentById.get(row.question_id)));

  const practice = output.filter((item) => item.bank === "practice").length;
  const test = output.filter((item) => item.bank === "test").length;
  if (practice !== expected.practice || test !== expected.test) {
    throw new Error(`${code}: expected ${expected.practice} practice and ${expected.test} test; found ${practice} practice and ${test} test`);
  }

  fs.writeFileSync(file, `${JSON.stringify(output, null, 2)}\n`);
  report.push({ code, practice, test, total: output.length });
}

console.log(JSON.stringify({ input: path.relative(root, input), skills: report.length, items: rows.length, banks: report }, null, 2));
