import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets/assessment-banks/year4/science");
const VISUAL_ROOT = path.join(ROOT, "assets/assessment-visuals/year4/science");
let specs;
const context = { window: { SkillrYear4SubjectRegister(subject, values) { if (subject === "science") specs = values; } } };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "assets/year4-science-data.js"), "utf8"), context);
if (!specs) throw new Error("Could not load Year 4 Science specifications.");

const codes = Object.keys(specs).sort();
const visualAlts = {
  AC9S4U01: "A simple habitat food chain with arrows from a plant to two consumers and a decomposer",
  AC9S4U02: "A water-cycle model linking evaporation, condensation, precipitation and collection",
  AC9S4U03: "A force diagram showing friction, gravity and magnetic force directions",
  AC9S4U04: "Four material samples arranged for a fair comparison of observable properties",
};
const clean = value => String(value ?? "").replace(/\{\{blank\}\}/g, "the missing scientific term").replace(/\s+/g, " ").trim();
const esc = value => clean(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rotate = (values, offset) => values.map((_, index) => values[(index + offset) % values.length]);

function distinct(values) {
  const seen = new Set();
  return values.map(clean).filter(value => value && !seen.has(value.toLowerCase()) && seen.add(value.toLowerCase()));
}

function choices(correct, wrongs) {
  const candidates = distinct([correct, ...wrongs]);
  if (candidates.length < 3) throw new Error(`Not enough choices for: ${correct}`);
  return { correct: candidates[0], wrongs: candidates.slice(1, 3) };
}

function termItems(spec, bank) {
  const terms = spec.terms;
  const frames = bank === "practice"
    ? [
      definition => `A class observation is described as “${definition}”. Which scientific term best labels it?`,
      definition => `A student needs a heading for this evidence: “${definition}”. Which heading is most precise?`,
    ]
    : [definition => `A museum activity card says, “${definition}”. Which scientific term belongs on the card?`];
  return frames.flatMap((frame, frameIndex) => terms.map(([term, definition], index) => {
    const other = rotate(terms.map(entry => entry[0]), index + frameIndex + 1).filter(value => value !== term);
    return { question: frame(clean(definition)), ...choices(term, other), summary: `${term} is the precise term for this observation or relationship.`, hint: "Match the evidence in the description to the most precise scientific term." };
  }));
}

function misconceptionItems(spec, bank) {
  const frames = bank === "practice"
    ? [
      (wrong, index) => `During a Year 4 discussion, Student ${index + 1} says, “${wrong}”. Which response best corrects the science?`,
      (wrong, index) => `A group writes this claim on a poster: “${wrong}”. Which edit makes the claim scientifically accurate?`,
    ]
    : [(wrong, index) => `A different class records this conclusion: “${wrong}”. Which feedback would improve it most?`];
  return frames.flatMap((frame, frameIndex) => spec.mistakes.map(([wrong, correction], index) => {
    const otherWrong = spec.mistakes[(index + frameIndex + 1) % spec.mistakes.length][0];
    return {
      question: frame(clean(wrong), index),
      ...choices(clean(correction), [clean(wrong), clean(otherWrong)]),
      summary: clean(correction),
      hint: "Choose the response that uses evidence and corrects the mistaken relationship.",
    };
  }));
}

function choiceItems(spec, bank) {
  return [spec.questions.choice1, spec.questions.choice2].map(([question, rawAnswers], index) => {
    const [correct, ...rawWrongs] = rawAnswers;
    const replacements = [
      "The group reports a change but leaves out the measurement or observation needed to support it.",
      "The group states its preferred outcome instead of using the recorded scientific evidence.",
    ];
    const wrongs = rawWrongs.map((answer, wrongIndex) => /somehow|nice|colou?r|decoration|guess|labels? do not matter/i.test(answer) ? replacements[wrongIndex % replacements.length] : answer);
    const lead = bank === "practice"
      ? ["Study the classroom example.", "Use the investigation evidence."][index]
      : ["A new field-note example asks:", "A new design task asks:"][index];
    return {
      question: `${lead} ${clean(question)}`,
      ...choices(correct, wrongs),
      summary: clean(correct),
      hint: "Use the stated observation, measurement or relationship—not preference—to decide.",
    };
  });
}

function activityItems(spec, bank) {
  return spec.activities.map(([title, description], index) => {
    const question = bank === "practice"
      ? `The class is preparing “${clean(title)}”. Which plan would produce useful scientific evidence?`
      : `A new group wants to adapt “${clean(title)}”. Which method keeps the investigation focused and reviewable?`;
    const correct = clean(description);
    const wrongs = [
      `Begin ${clean(title).toLowerCase()}, change two important conditions together, then compare only the preferred observation.`,
      `Carry out ${clean(title).toLowerCase()} once, omit the measurements and report the original prediction as the result.`,
    ];
    return { question, ...choices(correct, wrongs), summary: correct, hint: "Look for a plan that observes or measures evidence and keeps the comparison clear." };
  });
}

function applicationItems(spec, bank) {
  const rows = Array.isArray(spec.apply?.[0]) ? spec.apply.slice(1) : [];
  return rows.slice(0, bank === "practice" ? 1 : 2).map((row, index) => {
    const label = clean(row[0]);
    const relationship = clean(row.slice(1).join(" because "));
    const alternatives = rows.filter(other => other !== row).map(other => clean(other.slice(1).join(" because ")));
    return {
      question: bank === "practice"
        ? `A results display includes “${label}”. Which interpretation matches that evidence?`
        : `A new ${clean(spec.title).toLowerCase()} investigation reports “${label}”. Which conclusion is best supported by the display?`,
      ...choices(relationship, alternatives.length >= 2 ? alternatives : ["the evidence proves every possible case", "the label can be ignored"]),
      summary: `${label} is linked to ${relationship}.`,
      hint: "Trace across the same row and keep the conclusion limited to the evidence shown.",
    };
  });
}

function masteryItems(spec, bank) {
  return (spec.mastery ?? []).map((goal, index) => {
    const question = bank === "practice"
      ? `A student wants to demonstrate “${clean(goal)}”. Which action gives the clearest evidence of that skill?`
      : `In a new assessment, which response would best demonstrate “${clean(goal)}”?`;
    const correct = `Use a relevant observation or measurement, demonstrate “${clean(goal)}”, and explain the result.`;
    return {
      question,
      ...choices(correct, [
        "State a preferred answer without using the observations or measurements.",
        "Copy the task title but do not interpret, compare or explain any evidence.",
      ]),
      summary: correct,
      hint: "Choose the action that demonstrates the named skill with observable evidence.",
    };
  });
}

function makeItem(code, spec, bank, index, source) {
  const sequence = String(index + 1).padStart(3, "0");
  const correctIndex = (index + codes.indexOf(code)) % 3;
  const ordered = [...source.wrongs];
  ordered.splice(correctIndex, 0, source.correct);
  const id = `${code}-${bank === "practice" ? "P" : "T"}-${sequence}`;
  const visualId = id.toLowerCase();
  return {
    id,
    subject: "science",
    year_level: "Year 4",
    curriculum_code: code,
    bank,
    skill: spec.title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question: source.question,
    audio_prompt: source.question,
    visual: {
      type: "svg",
      asset_path: `/assets/assessment-visuals/year4/science/${code.toLowerCase()}.svg#${visualId}`,
      alt_text: `${visualAlts[code] ?? `${spec.title} concept map showing a Year 4 observe, compare and explain sequence`}. Question context: ${source.question}`,
    },
    answers: ordered.map((text, answerIndex) => ({ text, is_correct: answerIndex === correctIndex })),
    correct_index: correctIndex,
    explanation: { summary: source.summary, hint: source.hint },
    _visualId: visualId,
  };
}

function diagram(code, visualId) {
  if (code === "AC9S4U01") return `<circle cx="90" cy="95" r="34" fill="#fbbf24"/><path d="M120 112h70" stroke="#475569" stroke-width="7" marker-end="url(#arrow-${visualId})"/><path d="M205 195v-72m0 72-35-45m35 45 35-45" stroke="#16a34a" stroke-width="12"/><path d="M245 152h82" stroke="#475569" stroke-width="7" marker-end="url(#arrow-${visualId})"/><ellipse cx="370" cy="155" rx="48" ry="30" fill="#d6b07a"/><circle cx="404" cy="142" r="22" fill="#d6b07a"/><path d="M425 152h72" stroke="#475569" stroke-width="7" marker-end="url(#arrow-${visualId})"/><path d="M515 174q30-65 58 0" fill="#fde68a" stroke="#92400e" stroke-width="5"/><text x="320" y="252" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#475569">Arrows show food and energy transfer</text>`;
  if (code === "AC9S4U02") return `<path d="M110 202q65-58 130 0t130 0 130 0" fill="#93c5fd" stroke="#2563eb" stroke-width="5"/><circle cx="115" cy="92" r="34" fill="#fbbf24"/><path d="M235 184q-28-45 0-82m75 72q-22-40 0-72" fill="none" stroke="#f97316" stroke-width="7" marker-end="url(#arrow-${visualId})"/><path d="M345 108q18-38 47 0q30-25 55 8q35 4 23 34H340q-18-28 5-42" fill="#dbeafe" stroke="#64748b" stroke-width="4"/><path d="M372 166l-18 35m55-35-18 35m55-35-18 35" stroke="#2563eb" stroke-width="7"/><text x="320" y="252" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#475569">Water moves between stores through linked processes</text>`;
  if (code === "AC9S4U03") return `<rect x="260" y="115" width="120" height="78" rx="10" fill="#fbbf24" stroke="#92400e" stroke-width="5"/><path d="M250 154H120m270 0h130" stroke="#2563eb" stroke-width="10" marker-end="url(#arrow-${visualId})"/><path d="M320 204v55" stroke="#dc2626" stroke-width="10" marker-end="url(#arrow-${visualId})"/><text x="155" y="135" font-family="Arial,sans-serif" font-size="17" fill="#17324d">friction</text><text x="450" y="135" font-family="Arial,sans-serif" font-size="17" fill="#17324d">push or pull</text><text x="338" y="245" font-family="Arial,sans-serif" font-size="17" fill="#17324d">gravity</text>`;
  if (code === "AC9S4U04") return `<rect x="85" y="105" width="105" height="100" rx="12" fill="#bfdbfe" stroke="#2563eb" stroke-width="5"/><rect x="210" y="105" width="105" height="100" rx="12" fill="#d1d5db" stroke="#64748b" stroke-width="5"/><rect x="335" y="105" width="105" height="100" rx="12" fill="#e0f2fe" stroke="#38bdf8" stroke-width="5"/><rect x="460" y="105" width="105" height="100" rx="12" fill="#f9a8d4" stroke="#db2777" stroke-width="5"/><text x="137" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">fibre</text><text x="262" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">metal</text><text x="387" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">glass</text><text x="512" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">plastic</text>`;
  return `<circle cx="125" cy="152" r="52" fill="#bfdbfe" stroke="#2563eb" stroke-width="5"/><circle cx="320" cy="152" r="52" fill="#fef3c7" stroke="#d97706" stroke-width="5"/><circle cx="515" cy="152" r="52" fill="#bbf7d0" stroke="#16a34a" stroke-width="5"/><path d="M181 152h78" stroke="#475569" stroke-width="7" marker-end="url(#arrow-${visualId})"/><path d="M381 152h78" stroke="#475569" stroke-width="7" marker-end="url(#arrow-${visualId})"/><text x="125" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#17324d">Observe</text><text x="320" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#17324d">Compare</text><text x="515" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#17324d">Explain</text><text x="320" y="252" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#475569">Use the evidence in the question</text>`;
}

function sprite(code, spec, items) {
  const symbols = items.map((item, index) => `<symbol id="${item._visualId}" viewBox="0 0 640 300"><rect width="640" height="300" rx="20" fill="${index % 2 ? "#eff6ff" : "#ecfdf5"}"/><text x="320" y="43" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#17324d">${code} • Year 4 Science model</text><defs><marker id="arrow-${item._visualId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0l10 5-10 5z" fill="#475569"/></marker></defs>${diagram(code, item._visualId)}</symbol>`).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols}\n</svg>\n`;
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
for (const code of codes) {
  const spec = specs[code];
  const practiceSource = [
    ...termItems(spec, "practice"),
    ...misconceptionItems(spec, "practice"),
    ...choiceItems(spec, "practice"),
    ...activityItems(spec, "practice"),
    ...applicationItems(spec, "practice"),
    ...masteryItems(spec, "practice"),
  ].slice(0, 24);
  const testSource = [
    ...termItems(spec, "test"),
    ...misconceptionItems(spec, "test"),
    ...choiceItems(spec, "test"),
    ...activityItems(spec, "test"),
    ...applicationItems(spec, "test"),
    ...masteryItems(spec, "test"),
  ].slice(0, 16);
  if (practiceSource.length !== 24 || testSource.length !== 16) throw new Error(`${code}: found ${practiceSource.length}/${testSource.length}`);
  const items = [
    ...practiceSource.map((source, index) => makeItem(code, spec, "practice", index, source)),
    ...testSource.map((source, index) => makeItem(code, spec, "test", index, source)),
  ];
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items.map(({ _visualId, ...item }) => item), null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), sprite(code, spec, items));
}

console.log(JSON.stringify({ codes: codes.length, practicePerCode: 24, testPerCode: 16, total: codes.length * 40 }, null, 2));
