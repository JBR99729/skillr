import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year2", "science");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals", "year2", "science");
const SOURCE_FILES = [
  "assets/year2-science-authored-banks.js",
  "assets/year2-science-authored-banks-batch2.js",
  "assets/year2-science-authored-banks-batch3.js",
  "assets/year2-science-authored-banks-batch4.js"
];
const context = { window: {} };
vm.createContext(context);
for (const file of SOURCE_FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
const banks = context.window.SkillrYear2ScienceBanks;
const codes = Object.keys(banks).sort();
fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });

const clean = (value) => String(value).replace(/\s+/g, " ").trim();
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const themes = {
  AC9S2U01: { title: "Earth and Patterns in the Sky", skill: "observe_sky_patterns", icon: "sky", alt: "A classroom model of Earth, the Moon and the Sun used to observe sky patterns." },
  AC9S2U02: { title: "Sound and Vibration", skill: "explore_sound_and_vibration", icon: "sound", alt: "A vibrating elastic band with curved lines showing sound moving away." },
  AC9S2U03: { title: "Physical Changes to Materials", skill: "compare_physical_changes", icon: "material", alt: "A material shown before and after bending, twisting, stretching or breaking." },
  AC9S2H01: { title: "Science in Daily Life", skill: "apply_science_in_daily_life", icon: "daily", alt: "People using observations, tools and repeated patterns to make a daily-life prediction." },
  AC9S2I01: { title: "Scientific Questions and Predictions", skill: "pose_questions_and_predict", icon: "question", alt: "An observation leading to a testable question and a reasoned prediction." },
  AC9S2I02: { title: "Planning Safe Investigations", skill: "plan_safe_fair_investigations", icon: "safe", alt: "A safe investigation plan showing one changed factor and matching equipment." },
  AC9S2I03: { title: "Making and Recording Observations", skill: "record_observations", icon: "record", alt: "A child observing an object and recording a labelled measurement in a table." },
  AC9S2I04: { title: "Sorting and Representing Data", skill: "sort_and_represent_data", icon: "data", alt: "Observed items sorted into groups and represented in a simple table." },
  AC9S2I05: { title: "Comparing Predictions and Investigations", skill: "compare_evidence_and_fairness", icon: "compare", alt: "Two investigation records compared with a prediction and a fairness checklist." },
  AC9S2I06: { title: "Communicating Science Clearly", skill: "communicate_science", icon: "communicate", alt: "A labelled science diagram and a short evidence-based observation sentence." }
};
const overrides = {
  "AC9S2U01:3": ["A model shows Earth moving along a path around the Sun. What movement does the model show?", ["Earth travels around the Sun", "Earth sits inside the Sun", "the Sun switches off"], "The path represents Earth travelling around the Sun."],
  "AC9S2U01:14": ["Earth and Mars both travel around the Sun. How should they be classified?", ["as planets", "as shadows", "as clouds"], "Earth and Mars are planets that travel around a star."],
  "AC9S2U01:16": ["A small rocky object is seen travelling around Earth. Which object is it?", ["the Moon", "the Sun", "Venus"], "The Moon is the natural object that travels around Earth."],
  "AC9S2U03:14": ["Alex bends foil into a curve. It is still foil. What kind of change happened?", ["a change in shape", "a change into a new material", "no observable change"], "The foil changed shape without becoming a different material."],
  "AC9S2U03:15": ["A clay ball is pressed flat but is still clay. Which feature stayed the same?", ["the material it is made from", "its shape", "its thickness"], "Its material stayed clay even though its shape changed."],
  "AC9S2I01:30": ["The class wants to compare two paper towels. Which question can they explore by observing or safely testing?", ["Which towel absorbs more water?", "Which towel is the happiest?", "Which towel has the best name?"], "How much water each towel absorbs can be observed and compared."],
  "AC9S2I01:31": ["Before testing two ramps, which sentence is a reasoned prediction?", ["The higher ramp may make the car roll farther because it did last time", "The car rolled 2 metres", "The blue car is my favourite"], "A prediction states what may happen and gives a reason before testing."],
  "AC9S2I02:2": ["Two paper towels are tested with equal-sized sheets and the same water amount. What makes this a fair comparison?", ["only the towel type changes", "every part changes", "the result is chosen first"], "A fair comparison changes one factor and keeps the others similar."],
  "AC9S2I02:14": ["A cup has a cracked edge that could cut a hand. Why must the class replace it?", ["it could cause harm", "it changes the prediction", "it makes the table untidy"], "The cracked edge is a risk because it could cause harm."],
  "AC9S2I02:30": ["A card says, ‘Wear safety glasses for this step.’ What should the class do?", ["wear the glasses for that step", "ignore the card", "rush the step"], "A safety reminder tells students which protective action to follow."],
  "AC9S2I03:31": ["Mia writes, ‘The leaf has five points and is 8 cubes long.’ Why is this a useful record?", ["it states features she observed", "it gives only her favourite idea", "it changes the leaf"], "The sentence records visible features and an informal measurement."],
  "AC9S2I04:8": ["The class adds one tally each time a bird visits. What does each tally show?", ["one bird visit", "five bird visits", "a prediction"], "Each tally records one observed bird visit."],
  "AC9S2I04:27": ["Plant heights are 3, 5 and 8 cubes. Which order is shortest to tallest?", ["3, 5, 8", "8, 5, 3", "5, 3, 8"], "Ordering from least to greatest gives 3, 5, 8."],
  "AC9S2I04:28": ["Shadow lengths are 4, 7 and 10 blocks. Which order is longest to shortest?", ["10, 7, 4", "4, 7, 10", "7, 4, 10"], "Ordering from greatest to least gives 10, 7, 4."],
  "AC9S2I04:31": ["A class records leaf colours and lengths in a table. What can they use these records for?", ["sorting and finding patterns", "changing every leaf", "choosing a result before observing"], "Recorded observations are data that can be sorted and checked for patterns."],
  "AC9S2I05:31": ["Mia records a 6-block shadow and Lee records a 7-block shadow. What should they do next?", ["check how their observations are alike and different", "change both records to 6", "hide one result"], "Comparing means checking similarities and differences in observations."],
  "AC9S2I06:30": ["A group observed that a cloth absorbed 8 drops. Which sentence shares the finding clearly?", ["The cloth absorbed 8 drops", "The cloth was good", "We did science"], "The clear sentence communicates a measured observation."],
  "AC9S2H01:31": ["Lena uses weather records at home and a nurse measures temperature at work. What does this show?", ["science is used in many daily settings", "science is used only in laboratories", "daily choices cannot use evidence"], "People use science, tools and evidence in many parts of daily life."],
  "AC9S2I05:9": ["Mia's result differs from her prediction. Which record is scientifically honest?", ["write the result that was observed", "change the result to match", "hide the observation"], "A result must report the observation even when it differs from a prediction."],
};

function sourceItems(code) {
  const source = banks[code];
  const base = (items, normalCount) => [
    ...items.slice(0, normalCount * 3).filter((_, index) => index % 3 === 0),
    ...items.slice(normalCount * 3)
  ];
  return [...base(source.practice, 9), ...base(source.test, 4), ...base(source.quiz, 16)].map((item, index) => {
    const replacement = overrides[`${code}:${index}`];
    return replacement ? { ...item, question: replacement[0], answers: replacement[1], correct: 0, explanation: replacement[2] } : item;
  });
}

function orderedAnswers(source, correctIndex) {
  const correct = clean(source.answers[source.correct]);
  const wrong = source.answers.filter((_, index) => index !== source.correct).map(clean).filter((value, index, all) => all.indexOf(value) === index).slice(0, 2);
  if (wrong.length !== 2) throw new Error(`Not enough distinct distractors: ${source.question}`);
  const answers = [...wrong];
  answers.splice(correctIndex, 0, correct);
  return answers.map((text, index) => ({ text, is_correct: index === correctIndex }));
}

function makeItem(code, bank, bankIndex, source, variant = false) {
  const sequence = String(bankIndex + 1).padStart(3, "0");
  const id = `${code}-${bank === "practice" ? "P" : "T"}-${sequence}`;
  const correctIndex = (bankIndex + codes.indexOf(code)) % 3;
  const wrong = clean(source.answers.find((_, index) => index !== source.correct));
  const baseQuestion = clean(source.question);
  const question = variant
    ? `A student answers “${wrong}”. Read the evidence in this question and choose the better answer: ${baseQuestion}`
    : baseQuestion;
  const summary = clean(source.explanation).replace(/\s*Hint:.*$/i, "");
  const hint = variant ? "Return to the observation or result in the question. Choose the answer it supports." : `Look for the observation, pattern or result that directly answers the question.`;
  const visualId = id.toLowerCase();
  return {
    id,
    subject: "science",
    year_level: "Year 2",
    curriculum_code: code,
    bank,
    skill: themes[code].skill,
    question,
    audio_prompt: question,
    visual: {
      type: "svg",
      asset_path: `/assets/assessment-visuals/year2/science/${code.toLowerCase()}.svg#${visualId}`,
      alt_text: `${themes[code].alt} Question context: ${baseQuestion}`
    },
    answers: orderedAnswers(source, correctIndex),
    correct_index: correctIndex,
    explanation: { summary, hint },
    _visual_id: visualId
  };
}

function iconBody(kind) {
  if (kind === "sky") return '<circle cx="190" cy="125" r="56" fill="#3b82f6"/><path d="M155 118q35-32 70 0q-28 30-70 0" fill="#34d399"/><circle cx="455" cy="88" r="43" fill="#fbbf24"/><ellipse cx="320" cy="150" rx="210" ry="92" fill="none" stroke="#64748b" stroke-width="5" stroke-dasharray="12 10"/><circle cx="510" cy="182" r="22" fill="#dbeafe" stroke="#64748b" stroke-width="4"/>';
  if (kind === "sound") return '<path d="M125 95v110M225 95v110" stroke="#17324d" stroke-width="12"/><path d="M130 150q45-85 90 0t90 0" fill="none" stroke="#f97316" stroke-width="13"/><path d="M370 105q58 45 0 90M420 78q95 72 0 144" fill="none" stroke="#2563eb" stroke-width="10"/>';
  if (kind === "material") return '<rect x="92" y="118" width="145" height="64" rx="10" fill="#60a5fa"/><path d="M270 150h80m-18-18 20 18-20 18" stroke="#17324d" stroke-width="7" fill="none"/><path d="M400 195q-65-65 0-130q65 65 0 130" fill="none" stroke="#a855f7" stroke-width="25" stroke-linecap="round"/>';
  if (kind === "daily") return '<path d="M120 220h400" stroke="#65a30d" stroke-width="12"/><circle cx="180" cy="90" r="35" fill="#fbbf24"/><path d="M270 190v-75h90v75M285 155h60" stroke="#2563eb" stroke-width="12" fill="none"/><path d="M410 180l55-55 40 40" stroke="#f97316" stroke-width="11" fill="none"/>';
  if (kind === "question") return '<circle cx="170" cy="145" r="65" fill="#dbeafe" stroke="#2563eb" stroke-width="6"/><text x="170" y="170" text-anchor="middle" font-size="88" font-weight="700" fill="#2563eb">?</text><path d="M270 155h90l35 45 75-100" fill="none" stroke="#10b981" stroke-width="12" stroke-linecap="round"/>';
  if (kind === "safe") return '<path d="M165 62l82 30v62q0 75-82 103q-82-28-82-103V92z" fill="#dcfce7" stroke="#16a34a" stroke-width="7"/><path d="M125 150l27 27 55-67" fill="none" stroke="#16a34a" stroke-width="12"/><rect x="320" y="92" width="165" height="130" rx="15" fill="#eff6ff" stroke="#2563eb" stroke-width="6"/><path d="M350 130h105M350 165h105M350 200h70" stroke="#64748b" stroke-width="8"/>';
  if (kind === "record") return '<circle cx="145" cy="112" r="42" fill="#fde68a"/><path d="M145 154v70M108 185h74" stroke="#17324d" stroke-width="10"/><rect x="280" y="72" width="220" height="165" rx="12" fill="#fff" stroke="#2563eb" stroke-width="6"/><path d="M315 115h150M315 155h150M315 195h150" stroke="#93c5fd" stroke-width="7"/>';
  if (kind === "data") return '<rect x="95" y="65" width="450" height="180" rx="15" fill="#fff" stroke="#2563eb" stroke-width="6"/><path d="M245 65v180M395 65v180M95 125h450M95 185h450" stroke="#bfdbfe" stroke-width="5"/><circle cx="170" cy="155" r="23" fill="#34d399"/><circle cx="320" cy="95" r="23" fill="#fbbf24"/><circle cx="470" cy="215" r="23" fill="#f97316"/>';
  if (kind === "compare") return '<rect x="80" y="75" width="210" height="155" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="6"/><rect x="350" y="75" width="210" height="155" rx="14" fill="#ecfdf5" stroke="#10b981" stroke-width="6"/><path d="M120 120h130M120 165h95M390 120h130M390 165h95" stroke="#64748b" stroke-width="8"/><path d="M295 150h50" stroke="#f97316" stroke-width="10"/>';
  return '<rect x="95" y="72" width="450" height="170" rx="16" fill="#fff" stroke="#2563eb" stroke-width="6"/><path d="M145 115h350M145 155h290M145 195h220" stroke="#64748b" stroke-width="8"/><circle cx="500" cy="195" r="25" fill="#34d399"/>';
}

function sprite(code, items) {
  const theme = themes[code];
  const symbols = items.map((item, index) => `<symbol id="${item._visual_id}" viewBox="0 0 640 300"><rect width="640" height="300" rx="18" fill="${index % 2 ? "#f8fbff" : "#f0fdfa"}"/><text x="320" y="36" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#17324d">${esc(theme.title)}</text>${iconBody(theme.icon)}</symbol>`).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${symbols}\n</svg>\n`;
}

for (const code of codes) {
  const sources = sourceItems(code);
  if (sources.length !== 32) throw new Error(`${code}: expected 32 source contexts, found ${sources.length}`);
  const practice = sources.slice(0, 24).map((source, index) => makeItem(code, "practice", index, source));
  const testSources = sources.slice(24);
  const test = testSources.flatMap((source, index) => [
    makeItem(code, "test", index * 2, source),
    makeItem(code, "test", index * 2 + 1, source, true)
  ]);
  const items = [...practice, ...test];
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(items.map(({ _visual_id, ...item }) => item), null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), sprite(code, items));
}

console.log(JSON.stringify({ codes: codes.length, practicePerCode: 24, testPerCode: 16, total: codes.length * 40 }, null, 2));
