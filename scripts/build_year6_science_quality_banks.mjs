import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets/assessment-banks/year6/science");
const VISUAL_ROOT = path.join(ROOT, "assets/assessment-visuals/year6/science");
let units;
const context = { window: { SkillrYear6Register(subject, data) { if (subject === "science") units = data; } } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/year6-science-data.js"), "utf8"), context);
if (!units) throw new Error("Could not load Year 6 Science curriculum registry");

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
const clean = (value) => String(value ?? "").replace(/\{\{blank\}\}/g, "the missing scientific idea").replace(/\s+/g, " ").trim();
const esc = (value) => clean(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const practiceFrames = [
  "During a class investigation, students discuss the evidence.", "A student checks a science notebook.", "A group compares its evidence.",
  "At a science station, the class reviews its work.", "A student reviews a model.", "During a field or laboratory discussion, the group checks its reasoning."
];
const testFrames = [
  "A new investigation report must be checked.", "A different class analyses its results.", "A team conducts an independent evidence review.",
  "A student applies the science to an unfamiliar situation."
];

function distinct(values, correct) {
  return values.map(clean).filter((value) => value && value !== correct).filter((value, index, all) => all.indexOf(value) === index);
}

function facts(unit) {
  const result = [];
  const terms = unit.terms ?? [];
  for (const [term, definition] of terms) {
    result.push({
      stem: `In work about ${clean(unit.title)}, a record describes “${clean(definition)}”. Which scientific term should label it?`,
      correct: clean(term),
      wrong: distinct(terms.map(([other]) => other), term).slice(0, 2),
      summary: `${clean(term)} means ${clean(definition)}.`,
      hint: "Match every important part of the description to the term.",
      testStem: `A student labels an observation “${clean(term)}”. Which description shows that term being used correctly?`,
      testCorrect: clean(definition),
      testWrong: distinct(terms.map(([, otherDefinition]) => otherDefinition), definition).slice(0, 2),
      testSummary: `${clean(term)} describes ${clean(definition)}.`,
      testHint: "Apply the term to the description that includes all of its important features."
    });
  }

  const mistakes = unit.mistakes ?? [];
  for (const [claim, correction] of mistakes) {
    result.push({
      stem: `A student's reasoning is “${clean(claim)}”. Which revision corrects it?`,
      correct: clean(correction),
      wrong: ["Keep the claim because one observation is enough.", "Make the claim more certain without collecting more evidence."],
      summary: clean(correction),
      hint: "Choose the response that corrects the stated misconception without overstating the evidence.",
      testStem: `A review recommends, “${clean(correction)}” Which original claim most clearly needs that revision?`,
      testCorrect: clean(claim),
      testWrong: distinct(mistakes.map(([otherClaim]) => otherClaim), claim).slice(0, 2),
      testSummary: `The recommendation corrects the claim “${clean(claim)}”.`,
      testHint: "Match the revision to the specific reasoning error it fixes."
    });
  }

  for (const visualName of ["modelVisual", "applyVisual"]) {
    const rows = Array.isArray(unit[visualName]?.data) ? unit[visualName].data : [];
    const usable = rows.filter((row) => Array.isArray(row) && row.length >= 2).slice(1);
    for (const row of usable) {
      const label = clean(row[0]);
      const value = clean(row.slice(1).join("; "));
      const alternatives = distinct(usable.map((other) => other.slice(1).join("; ")), value);
      result.push({
        stem: `A science organiser labels one part “${label}”. Which entry belongs with that label?`,
        correct: value,
        wrong: alternatives.slice(0, 2),
        summary: `The organiser links ${label} with ${value}.`,
        hint: "Use the role of the labelled part, not just a repeated word.",
        testStem: `A science organiser contains the entry “${value}”. Which heading best identifies its role?`,
        testCorrect: label,
        testWrong: distinct(usable.map((other) => other[0]), label).slice(0, 2),
        testSummary: `${value} belongs under ${label}.`,
        testHint: "Identify what the entry does in the organiser, then select its heading.",
        visual: true,
        visualLabel: label
      });
    }
  }

  for (const key of ["choice1", "choice2"]) {
    const source = unit.questions?.[key];
    if (!source || !Array.isArray(source[1]) || source[1].length < 3) continue;
    result.push({
      stem: clean(source[0]),
      correct: clean(source[1][0]),
      wrong: source[1].slice(1, 3).map(clean),
      summary: `${clean(source[1][0])} is supported by the scientific relationship in the question.`,
      hint: "Check which choice is measurable, evidence-based and consistent with the relevant science.",
      testStem: `A student chose “${clean(source[1][1])}”. Reconsider this question using scientific evidence: ${clean(source[0])}`,
      testCorrect: clean(source[1][0]),
      testWrong: source[1].slice(1, 3).map(clean),
      testSummary: `${clean(source[1][0])} is the evidence-based choice.`,
      testHint: "Check the relationship in the question and reject the tempting misconception."
    });
  }

  if (result.length < 12) throw new Error(`${unit.title}: only ${result.length} usable authored facts`);
  return result.filter((fact) => fact.wrong.length >= 2 && new Set([fact.correct, ...fact.wrong]).size === 3);
}

function orderedAnswers(fact, correctIndex) {
  const texts = fact.wrong.slice(0, 2);
  texts.splice(correctIndex, 0, fact.correct);
  return texts.map((text, index) => ({ text, is_correct: index === correctIndex }));
}

function makeItem(code, unit, sourceFacts, bank, index) {
  const sourceFact = sourceFacts[index % sourceFacts.length];
  const fact = bank === "test" ? {
    ...sourceFact,
    stem: sourceFact.testStem,
    correct: sourceFact.testCorrect,
    wrong: sourceFact.testWrong,
    summary: sourceFact.testSummary,
    hint: sourceFact.testHint
  } : sourceFact;
  const cycle = Math.floor(index / sourceFacts.length);
  const frame = bank === "practice" ? practiceFrames[(index + cycle) % practiceFrames.length] : testFrames[(index + cycle) % testFrames.length];
  const repeatContext = cycle === 0
    ? ""
    : cycle === 1
      ? " The class applies the same scientific idea to a second set of observations."
      : " The class checks the reasoning again after repeating the investigation.";
  const question = `${frame}${repeatContext} ${fact.stem}`;
  const codeOffset = Object.keys(units).sort().indexOf(code);
  const correctIndex = (index + codeOffset + (bank === "test" ? 1 : 0)) % 3;
  const number = String(index + 1).padStart(3, "0");
  const id = `${code}-${bank === "practice" ? "P" : "T"}-${number}`;
  const visualId = id.toLowerCase();
  const visual = fact.visual
    ? {
        type: "svg",
        asset_path: `/assets/assessment-visuals/year6/science/${code.toLowerCase()}.svg#${visualId}`,
        alt_text: `A Year 6 science organiser for ${unit.title}, highlighting ${fact.visualLabel} as one part of the evidence.`
      }
    : { type: "none", asset_path: "", alt_text: "" };
  return {
    id,
    subject: "science",
    year_level: "Year 6",
    curriculum_code: code,
    bank,
    skill: clean(unit.title).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question,
    audio_prompt: question,
    visual,
    answers: orderedAnswers(fact, correctIndex),
    correct_index: correctIndex,
    explanation: { summary: fact.summary, hint: fact.hint },
    _visual_id: fact.visual ? visualId : null,
    _visual_label: fact.visualLabel ?? ""
  };
}

function sprite(code, unit, items) {
  const symbols = items.filter((item) => item._visual_id).map((item) => `<symbol id="${item._visual_id}" viewBox="0 0 640 300"><rect width="640" height="300" rx="20" fill="#f4f9ff"/><text x="320" y="42" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#17324d">${esc(unit.title)}</text><rect x="70" y="80" width="150" height="120" rx="16" fill="#dbeafe" stroke="#2563eb" stroke-width="5"/><rect x="245" y="80" width="150" height="120" rx="16" fill="#dcfce7" stroke="#16a34a" stroke-width="5"/><rect x="420" y="80" width="150" height="120" rx="16" fill="#ffedd5" stroke="#ea580c" stroke-width="5"/><path d="M220 140h25M395 140h25" stroke="#475569" stroke-width="7" marker-end="url(#arrow)"/><text x="145" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#17324d">Observe</text><text x="320" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#17324d">Compare</text><text x="495" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#17324d">Explain</text><text x="320" y="245" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#334155">Focus: ${esc(item._visual_label)}</text></symbol>`).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0l10 5-10 5z" fill="#475569"/></marker></defs>${symbols}</svg>\n`;
}

for (const code of Object.keys(units).sort()) {
  const unit = units[code];
  const sourceFacts = facts(unit);
  const practice = Array.from({ length: 24 }, (_, index) => makeItem(code, unit, sourceFacts, "practice", index));
  const testFacts = [...sourceFacts].reverse();
  const test = Array.from({ length: 16 }, (_, index) => makeItem(code, unit, testFacts, "test", index));
  const items = [...practice, ...test];
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items.map(({ _visual_id, _visual_label, ...item }) => item), null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), sprite(code, unit, items));
}

console.log(JSON.stringify({ codes: Object.keys(units).length, practicePerCode: 24, testPerCode: 16, total: Object.keys(units).length * 40 }, null, 2));
