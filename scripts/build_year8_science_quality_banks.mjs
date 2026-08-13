import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { YEAR8_SCIENCE_H_CONCEPTS } from "./year8_science_h_concepts.mjs";
import { YEAR8_SCIENCE_U03_U07_CONCEPTS } from "./year8_science_u03_u07_concepts.mjs";
import { YEAR8_SCIENCE_I_CONCEPTS } from "./year8_science_i_concepts.mjs";
import { YEAR8_SCIENCE_U01_U02_CONCEPTS } from "./year8_science_u01_u02_concepts.mjs";

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

const AUTHORED_CONCEPTS = {
  ...YEAR8_SCIENCE_H_CONCEPTS,
  ...YEAR8_SCIENCE_U03_U07_CONCEPTS,
  ...YEAR8_SCIENCE_I_CONCEPTS,
  ...YEAR8_SCIENCE_U01_U02_CONCEPTS,
  LEGACY_AC9S8U01: [
    { evidence: "A micrograph shows a rigid outer boundary, chloroplasts and one large vacuole", question: "Which classification is justified by these observations?", correct: "It is a plant cell because chloroplasts, a cell wall and a large vacuole are visible", wrong: ["It is an animal cell because every animal cell has a cell wall", "It is a bacterial cell because chloroplasts are bacteria"], summary: "Chloroplasts and a cellulose cell wall distinguish this plant cell from an animal cell.", hint: "Use structures that differ between typical plant and animal cells." },
    { evidence: "A cell has a nucleus, cytoplasm and cell membrane but no cell wall or chloroplasts", question: "What is the best conclusion?", correct: "The evidence is consistent with an animal cell", wrong: ["It must be a plant cell because it has a nucleus", "It cannot be living because it has no chloroplasts"], summary: "Animal cells have a nucleus, cytoplasm and membrane but lack a cell wall and chloroplasts.", hint: "Ask which structures are shared and which are plant-specific." },
    { evidence: "A dye that normally stays outside a cell is found throughout the cytoplasm after the cell is damaged", question: "Which structure most likely stopped functioning?", correct: "The cell membrane, because it controls movement into and out of the cell", wrong: ["The nucleus, because it forms the rigid outer wall", "The chloroplast, because it controls all substances entering the cell"], summary: "The selectively permeable cell membrane regulates exchange with the surroundings.", hint: "Identify the boundary that controls exchange." },
    { evidence: "A leaf cell receives light but cannot make enough glucose", question: "Damage to which structure best explains the result?", correct: "Chloroplasts, where photosynthesis captures light energy", wrong: ["The nucleus, which directly absorbs light to make glucose", "The cell wall, where photosynthesis occurs"], summary: "Chloroplasts contain the structures used for photosynthesis.", hint: "Link the failed process to its organelle." },
    { evidence: "Two onion cells are the same actual size, but image A is twice as wide as image B", question: "Which explanation is scientifically sound?", correct: "Image A was shown at a greater magnification", wrong: ["Cell A must be twice the actual size of cell B", "Image width proves cell A has twice as many organelles"], summary: "Displayed image size depends on magnification as well as actual specimen size.", hint: "Separate actual size from image size." },
    { evidence: "A model shows organelles as large coloured shapes with clear gaps between them", question: "Which limitation should accompany the model?", correct: "The colours, spacing and relative sizes may not match a living cell", wrong: ["The model proves organelles never move", "The model shows that cells are visible without magnification"], summary: "Cell models simplify scale, colour and arrangement to make structures visible.", hint: "Consider what was changed to make the model easy to read." },
    { evidence: "A cell loses its nucleus while its membrane and cytoplasm remain intact", question: "Which long-term effect is most likely?", correct: "The cell cannot reliably control gene-directed activities or divide normally", wrong: ["The cell immediately becomes a plant cell", "The cell gains chloroplasts to replace the nucleus"], summary: "The nucleus contains genetic information used to regulate cell activities and division.", hint: "Connect the nucleus with genetic information and control." },
    { evidence: "Freshwater enters a plant cell and its vacuole expands", question: "How do the vacuole and cell wall work together?", correct: "The vacuole stores water while the wall helps the cell resist bursting and stay firm", wrong: ["The wall pumps water out and the vacuole makes glucose", "The vacuole becomes a nucleus while the wall dissolves"], summary: "The water-filled vacuole creates pressure and the cell wall provides structural support.", hint: "Think about storage, pressure and support." },
    { evidence: "A microscope field is 2 millimetres wide and about 10 cells fit across it", question: "What is the best estimate of one cell's width?", correct: "About 0.2 millimetres", wrong: ["About 5 millimetres", "About 20 millimetres"], summary: "Dividing 2 millimetres by 10 cells gives about 0.2 millimetres per cell.", hint: "Divide the field width by the number of cells across it." },
    { evidence: "A student labels the cell wall as the structure that controls every cell activity", question: "Which correction is most accurate?", correct: "The nucleus regulates many activities; the wall mainly supports and protects plant cells", wrong: ["The chloroplast controls all activities in both plant and animal cells", "The membrane stores all genetic information"], summary: "The nucleus contains genetic information, while the cell wall provides support.", hint: "Distinguish control from structural support." },
  ],
  LEGACY_AC9S8U02: [
    { evidence: "An alveolus has a moist surface, a wall one cell thick and capillaries pressed closely around it", question: "How do these structures support its function?", correct: "They create a short diffusion distance and maintain gradients for rapid gas exchange", wrong: ["They make the alveolus pump oxygen into the blood", "They prevent all carbon dioxide from leaving the blood"], summary: "Thin, moist walls and a close blood supply allow rapid diffusion of respiratory gases.", hint: "Link each observed structure to diffusion distance or concentration gradient." },
    { evidence: "Ciliated cells lining an airway stop moving their cilia", question: "Which consequence is most likely?", correct: "Mucus and trapped particles are cleared less effectively, increasing airway blockage and infection risk", wrong: ["The lungs immediately stop making red blood cells", "Alveoli turn into muscle tissue to replace the cilia"], summary: "Cilia move particle-trapping mucus away from the lungs.", hint: "Trace what normally happens to mucus and trapped particles." },
    { evidence: "Cards labelled cardiac muscle cell, cardiac muscle tissue, heart and circulatory system are mixed up", question: "Which order shows increasing biological organisation?", correct: "Cardiac muscle cell → cardiac muscle tissue → heart → circulatory system", wrong: ["Heart → cardiac muscle cell → circulatory system → cardiac muscle tissue", "Circulatory system → heart → cardiac muscle tissue → cardiac muscle cell"], summary: "Specialised cells form tissues, tissues form organs and organs work in systems.", hint: "Begin with one specialised cell and build towards the whole system." },
    { evidence: "Root hair cells have long projections while most leaf surface cells do not", question: "Which explanation best links structure and function?", correct: "The projections increase surface area for absorbing water and mineral ions from soil", wrong: ["The projections capture sunlight for photosynthesis", "The projections pump sugars directly into flowers"], summary: "A root hair cell's projection increases its contact area with soil water.", hint: "Use the cell's location and the resource it must obtain." },
    { evidence: "A plant transport model shows xylem carrying water upward and phloem carrying dissolved sugars between sources and sinks", question: "Which comparison is accurate?", correct: "Both are transport tissues, but they carry different materials and have different structures", wrong: ["Xylem and phloem are identical because both move only water", "Phloem carries oxygen while xylem carries nerve signals"], summary: "Xylem and phloem are specialised transport tissues with distinct roles.", hint: "Compare what each tissue carries rather than treating all transport as identical." },
    { evidence: "Arterial walls become narrowed and less elastic", question: "How can this tissue-level change affect the whole organism?", correct: "It can reduce blood flow and oxygen delivery, increasing strain on the heart and limiting organ function", wrong: ["It affects only the artery because organs work independently", "It increases gas exchange by making every capillary wider"], summary: "A change in one tissue can disrupt circulation and therefore many organs.", hint: "Trace the effect from vessel structure to blood flow to organ supply." },
    { evidence: "A dialysis machine removes some wastes and excess water from a patient's blood", question: "Which evaluation of the model is most accurate?", correct: "It replaces selected filtering functions but does not reproduce every regulatory and hormonal role of a kidney", wrong: ["It is a complete kidney because any filter performs every kidney function", "It repairs damaged kidney cells by changing them into machine parts"], summary: "Artificial organs may augment key functions without copying every biological role.", hint: "State both the function reproduced and an important limitation." },
    { evidence: "A two-dimensional digestive-system diagram shows the stomach beside the liver, while a three-dimensional model shows one partly in front of the other", question: "Why are both representations useful?", correct: "The diagram clarifies connections, while the 3D model better represents relative position and depth", wrong: ["Only the 2D diagram is scientific because organs are flat", "The 3D model proves every person's organs have exactly the same shape and position"], summary: "Different representations reveal different spatial and functional information.", hint: "Compare what each representation makes easier to see." },
    { evidence: "A section of small intestine has many folds covered with villi", question: "What prediction follows if most villi are damaged?", correct: "Nutrient absorption will decrease because the available surface area is reduced", wrong: ["Digestion will speed up because a smooth surface absorbs more", "The intestine will begin exchanging oxygen like an alveolus"], summary: "Villi increase surface area for absorbing digested nutrients.", hint: "Connect folds and projections to surface area." },
    { evidence: "A student says the heart keeps cells alive by working alone", question: "Which evidence best challenges the claim?", correct: "The heart depends on lungs for oxygen and vessels for transport, while its own cells need supplied oxygen and nutrients", wrong: ["The heart is an organ, so it does not contain tissues or cells", "The heart can replace the lungs whenever oxygen levels fall"], summary: "Organ systems are interdependent; no organ maintains survival in isolation.", hint: "Trace inputs, outputs and dependencies between organs." },
  ],
};

function unitModel(unit) {
  const model = unit.models?.[0] ?? {};
  const labels = model.parameters?.labels ?? model.parameters?.items?.map((item) => item.label) ?? [];
  return {
    labels: labels.length >= 3 ? labels.map(clean) : ["observation", "evidence", "scientific conclusion"],
    component: model.component ?? "evidence model",
  };
}

function contexts(unit) {
  const worked = (unit.workedExamples ?? []).flatMap((example) => (example.steps ?? []).map((step) => clean(step.text)));
  const teaching = (unit.conceptBoundary?.mustTeach ?? []).map(clean);
  const remediation = (unit.misconceptions ?? []).map((item) => clean(item.rapidRemediation));
  return [...worked, ...teaching, ...remediation].filter(Boolean);
}

function makeChoices(unit, index, context) {
  const authored = AUTHORED_CONCEPTS[unit.code]?.[index % AUTHORED_CONCEPTS[unit.code].length];
  if (authored) {
    return {
      correct: authored.correct,
      wrongA: authored.wrong[0],
      wrongB: authored.wrong[1],
      correctIdea: authored.summary,
      label: unitModel(unit).labels[index % unitModel(unit).labels.length],
      nextLabel: unitModel(unit).labels[(index + 1) % unitModel(unit).labels.length],
      authored,
    };
  }
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
  const authored = AUTHORED_CONCEPTS[unit.code]?.[index % AUTHORED_CONCEPTS[unit.code].length];
  if (authored) {
    const location = index < 24 ? settings[index] : settings[index].replace(/a |an /, "the ");
    return `During ${location}, students observe: ${authored.evidence}. ${authored.question}`;
  }
  const setting = settings[index];
  const source = clean(context).replace(/[.!?]+$/, "");
  const firstClause = source.split(/[;,]/)[0];
  const conciseContext = clean(firstClause);
  const activity = /^(analysing|considering|constructing|creating|describing|developing|discussing|evaluating|examining|explaining|exploring|identifying|investigating|modelling|observing|performing|predicting|researching|selecting|using|writing)\b/i.test(conciseContext)
    ? `students are ${lowerFirst(conciseContext)}`
    : `the evidence states, “${cap(conciseContext)}”`;
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
  const authored = AUTHORED_CONCEPTS[unit.code]?.[index % AUTHORED_CONCEPTS[unit.code].length];
  if (authored) {
    const words = authored.evidence.split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
      if (`${line} ${word}`.trim().length > 72) {
        lines.push(line);
        line = word;
      } else line = `${line} ${word}`.trim();
    }
    if (line) lines.push(line);
    const evidenceLines = lines.slice(0, 3).map((text, lineIndex) => `<text x="320" y="${128 + lineIndex * 28}" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" fill="#17324d">${xml(text)}</text>`).join("");
    const symbol = `<symbol id="${id.toLowerCase()}" viewBox="0 0 640 300"><rect width="640" height="300" rx="20" fill="#f0fdfa"/><rect x="34" y="62" width="572" height="156" rx="16" fill="#ffffff" stroke="#0f766e" stroke-width="3"/><text x="320" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#17324d">${xml(unit.title)}</text><text x="320" y="94" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#0f766e">OBSERVATION</text>${evidenceLines}<text x="320" y="257" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#475569">Use the observation to test each explanation.</text></symbol>`;
    return {
      symbol,
      meta: {
        type: "svg",
        asset_path: `/assets/assessment-visuals/year8/science/${unit.code.toLowerCase()}.svg#${id.toLowerCase()}`,
        alt_text: `${unit.title} observation card stating: ${authored.evidence}.`,
      },
    };
  }
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
  if (sourceContexts.length < 3) throw new Error(`${code}: insufficient authored curriculum contexts`);
  const items = [];
  const symbols = [];
  for (let index = 0; index < 40; index += 1) {
    const bank = index < 24 ? "practice" : "test";
    const bankIndex = bank === "practice" ? index + 1 : index - 23;
    const id = `${code}-${bank === "practice" ? "P" : "T"}-${String(bankIndex).padStart(3, "0")}`;
    const source = sourceContexts[(index * 5 + (bank === "test" ? 3 : 0)) % sourceContexts.length];
    const context = source;
    const question = makePrompt(unit, index, context, model);
    const { correct, wrongA, wrongB, correctIdea, label, authored } = makeChoices(unit, index, context);
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
        summary: authored?.summary ?? `${cap(correctIdea)}. This conclusion connects the observation to the scientific relationship without claiming more than the evidence shows.`,
        hint: authored?.hint ?? `Identify what the evidence shows about ${label}, then reject choices that assume, exaggerate or ignore limitations.`,
      },
    });
  }
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join("\n")}\n</svg>\n`);
}

console.log(JSON.stringify({ status: "BUILT", codes: CODE_ORDER.length, practice: CODE_ORDER.length * 24, test: CODE_ORDER.length * 16, combined: CODE_ORDER.length * 40 }, null, 2));
