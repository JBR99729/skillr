import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets/assessment-banks/year8/science");
const VISUAL_ROOT = path.join(ROOT, "assets/assessment-visuals/year8/science");
const CODE_ORDER = [
  "AC9S8H01", "AC9S8H02", "AC9S8H03", "AC9S8H04",
  "AC9S8I01", "AC9S8I02", "AC9S8I03", "AC9S8I04", "AC9S8I05", "AC9S8I06", "AC9S8I07", "AC9S8I08",
  "AC9S8U01", "AC9S8U02", "AC9S8U03", "AC9S8U04", "AC9S8U05", "AC9S8U06", "AC9S8U07",
];

function loadData(file, key) {
  const box = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), box, { filename: file });
  return box.window[key];
}

const full = loadData("assets/year8-science-full-data.js", "SkillrUpperScienceData");
const u01 = loadData("assets/year8-science-ac9s8u01-data.js", "SkillrYear8ScienceData");
const units = { ...full, ...u01 };

const clean = (value) => String(value ?? "")
  .replace(/\s+/g, " ")
  .replace(/[.]+$/, "")
  .trim();
const lowerFirst = (value) => clean(value).replace(/^./, (letter) => letter.toLowerCase());
const cap = (value) => clean(value).replace(/^./, (letter) => letter.toUpperCase());
const xml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const shorten = (value, length = 92) => {
  const text = clean(value);
  if (text.length <= length) return text;
  const cut = text.slice(0, length).replace(/\s+\S*$/, "");
  return cut;
};

const settings = [
  "a class investigation", "a museum evidence display", "a field-team briefing", "a laboratory notebook",
  "a community science meeting", "a digital model review", "a student research poster", "an engineering design check",
  "a data-team discussion", "a school science report", "a council evidence summary", "a peer-review conversation",
  "an environmental monitoring project", "a medical research case", "a science-news fact check", "a classroom model test",
  "a regional planning workshop", "an equipment selection task", "a public information draft", "an independent replication study",
  "a risk-assessment meeting", "a graph interpretation task", "a claim-evidence-reasoning response", "a scientific-method audit",
  "a new research proposal", "a cross-school data comparison", "a technology evaluation panel", "a science exhibition caption",
  "a policy evidence hearing", "a controlled follow-up investigation", "a model limitations review", "an ethics committee discussion",
  "a coastal field station report", "a renewable-energy trial", "a hospital innovation briefing", "a geological survey update",
  "a materials-testing laboratory", "a documentary planning session", "a national data-set review", "a final evidence conference",
];

function unitModel(unit) {
  const model = unit.models?.[0] ?? {};
  const labels = model.parameters?.labels ?? model.parameters?.items?.map((item) => item.label) ?? [];
  return {
    labels: labels.length >= 3 ? labels.map(clean) : ["observation", "evidence", "scientific conclusion"],
    component: model.component ?? "evidence model",
  };
}

function contexts(unit) {
  const elaborations = (unit.elaborations ?? []).map((item) => clean(item.curriculumWording || item.plainLanguageConcept || item.contextTitle));
  const worked = (unit.workedExamples ?? []).flatMap((example) => (example.steps ?? []).map((step) => clean(step.text)));
  const teaching = (unit.conceptBoundary?.mustTeach ?? []).map(clean);
  return [...elaborations, ...worked, ...teaching].filter(Boolean);
}

function makeChoices(unit, index, context) {
  const must = (unit.conceptBoundary?.mustTeach ?? []).map(clean);
  const misconceptions = (unit.misconceptions ?? []).map((item) => clean(item.incorrectIdea));
  const { labels } = unitModel(unit);
  const correctIdea = must[index % must.length];
  const conciseIdea = shorten(correctIdea, 132);
  const misconception = misconceptions[index % misconceptions.length];
  const label = labels[index % labels.length];
  const nextLabel = labels[(index + 1) % labels.length];
  const family = index % 5;
  const correct = [
    `${cap(conciseIdea)}; this interpretation can be checked against further evidence`,
    `The observation supports the idea that ${lowerFirst(conciseIdea)}, within the limits of the investigation`,
    `The model links ${label} with ${nextLabel}, so it can explain the relationship while still having limits`,
    `Repeated evidence can support the conclusion that ${lowerFirst(conciseIdea)}`,
    `The evidence supports ${lowerFirst(conciseIdea)}, but it does not prove that every case will be identical`,
  ][family];
  const wrongA = [
    `${cap(misconception)}; one matching observation makes this explanation certain`,
    `${cap(misconception)}; the wider pattern does not need to be considered`,
    `The model is a literal copy of reality, so assumptions and omitted features do not matter`,
    `Conflicting results should be removed because only results matching the prediction are useful`,
    `${cap(misconception)}; the same outcome must therefore occur in every setting`,
  ][family];
  const wrongB = [
    `${cap(label)} is the only relevant feature, so no mechanism or consequence needs explaining`,
    `${cap(nextLabel)} caused the result because the two occurred together once`,
    `The most detailed diagram is always best, even when it hides the relationship being tested`,
    `Several conditions can change together and the result can still be attributed to ${label} alone`,
    `A confident opinion about ${nextLabel} is stronger than measured or documented evidence`,
  ][family];
  return { correct, wrongA, wrongB, correctIdea, label, nextLabel };
}

function makePrompt(unit, index, context, model) {
  const setting = settings[index];
  const source = clean(context.replace(/\s*\([^()]+\)$/, ""));
  const firstClause = source.split(/[;,]/)[0];
  const conciseContext = shorten(firstClause, 105);
  const activity = /^(analysing|considering|constructing|creating|describing|developing|discussing|evaluating|examining|explaining|exploring|identifying|investigating|modelling|observing|performing|predicting|researching|selecting|using|writing)\b/i.test(conciseContext)
    ? `students are ${lowerFirst(conciseContext)}`
    : `the evidence states, “${cap(conciseContext)}.”`;
  const prompts = [
    `In ${setting}, ${activity}. Which interpretation is best supported?`,
    `During ${setting}, ${activity}. Which response applies the ${model.component} model most accurately?`,
    `In ${setting}, students compare ${model.labels[index % model.labels.length]} with ${model.labels[(index + 1) % model.labels.length]}. ${cap(activity)}. Which conclusion uses evidence appropriately?`,
    `During ${setting}, ${activity}. What is the strongest scientific response to this result?`,
    `${cap(setting)} for ${unit.title} reports that ${lowerFirst(conciseContext)}. Which revision would make the reasoning most reliable?`,
  ];
  return prompts[index % prompts.length];
}

function makeVisual(unit, id, index, model, question) {
  const labels = model.labels.slice(0, 5);
  const focus = index % labels.length;
  const x = labels.map((_, i) => 62 + i * (516 / Math.max(1, labels.length - 1)));
  const nodes = labels.map((label, i) => `<g><circle cx="${x[i].toFixed(1)}" cy="154" r="31" fill="${i === focus ? "#f59e0b" : "#dbeafe"}" stroke="#164e63" stroke-width="3"/><text x="${x[i].toFixed(1)}" y="211" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#17324d">${xml(shorten(label, 20))}</text></g>`).join("");
  const arrows = x.slice(0, -1).map((value, i) => `<path d="M${(value + 34).toFixed(1)} 154 H${(x[i + 1] - 40).toFixed(1)}" stroke="#0f766e" stroke-width="5" marker-end="url(#arrow)"/>`).join("");
  const symbol = `<symbol id="${id.toLowerCase()}" viewBox="0 0 640 300"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#0f766e"/></marker></defs><rect width="640" height="300" rx="20" fill="#f0fdfa"/><text x="320" y="34" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#17324d">${xml(unit.title)}</text><text x="320" y="65" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#475569">Evidence relationship model</text>${arrows}${nodes}<text x="320" y="275" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">Highlighted stage: ${xml(labels[focus])}</text></symbol>`;
  return {
    symbol,
    meta: {
      type: "svg",
      asset_path: `/assets/assessment-visuals/year8/science/${unit.code.toLowerCase()}.svg#${id.toLowerCase()}`,
      alt_text: `${unit.title} evidence model linking ${labels.join(", ")}. The highlighted stage is ${labels[focus]}. Question context: ${question}`,
    },
  };
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });

for (const code of CODE_ORDER) {
  const unit = units[code];
  if (!unit) throw new Error(`Missing canonical unit ${code}`);
  const model = unitModel(unit);
  const sourceContexts = contexts(unit);
  if (sourceContexts.length < 6) throw new Error(`${code}: insufficient authored curriculum contexts`);
  const items = [];
  const symbols = [];
  for (let index = 0; index < 40; index += 1) {
    const bank = index < 24 ? "practice" : "test";
    const bankIndex = bank === "practice" ? index + 1 : index - 23;
    const id = `${code}-${bank === "practice" ? "P" : "T"}-${String(bankIndex).padStart(3, "0")}`;
    const source = sourceContexts[(index * 5 + (bank === "test" ? 3 : 0)) % sourceContexts.length];
    const context = source;
    const question = makePrompt(unit, index, context, model);
    const { correct, wrongA, wrongB, correctIdea, label } = makeChoices(unit, index, context);
    const correctPosition = index % 3;
    const ordered = [wrongA, wrongB];
    ordered.splice(correctPosition, 0, correct);
    const visual = makeVisual(unit, id, index, model, question);
    symbols.push(visual.symbol);
    items.push({
      id,
      subject: "science",
      year_level: "Year 8",
      curriculum_code: code,
      bank,
      skill: `${model.component}_${label}`.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
      question,
      audio_prompt: question,
      visual: visual.meta,
      answers: ordered.map((text, position) => ({ text, is_correct: position === correctPosition })),
      correct_index: correctPosition,
      explanation: {
        summary: `${cap(correctIdea)}. This conclusion connects the observation to the scientific relationship without claiming more than the evidence shows.`,
        hint: `Identify what the evidence shows about ${label}, then reject choices that assume, exaggerate or ignore limitations.`,
      },
    });
  }
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join("\n")}\n</svg>\n`);
}

console.log(JSON.stringify({ status: "BUILT", codes: CODE_ORDER.length, practice: CODE_ORDER.length * 24, test: CODE_ORDER.length * 16, combined: CODE_ORDER.length * 40 }, null, 2));
