#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year5", "science");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals", "year5", "science");
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["assets/year5-curriculum-base.js", "assets/year5-science-data.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
const units = sandbox.window.SkillrYear5ScienceData;
const order = sandbox.window.SkillrYear5ScienceOrder;
if (!units || order.length !== 12) throw new Error(`Expected 12 Year 5 Science units, found ${order?.length ?? 0}`);

const PRACTICE_CONTEXTS = [
  "During a habitat survey", "At the school science table", "While examining a creek", "In a classroom investigation",
  "During a garden observation", "At the coastal field station", "While comparing samples", "In the school laboratory",
  "During a weather study", "At the wildlife centre", "While reviewing a data table", "In a materials investigation",
  "During an outdoor observation", "At the community science fair", "While planning a fair test", "In a digital science journal",
  "During a light investigation", "At the local wetland", "While checking another group's method", "In a model-building lesson",
  "During a temperature investigation", "At the environmental centre", "While preparing a science report", "In a research discussion",
];
const TEST_CONTEXTS = [
  "During a desert field study", "At a marine research centre", "While examining a riverbank", "In an independent investigation",
  "During a forest survey", "At a regional science exhibition", "While analysing unfamiliar evidence", "In a testing laboratory",
  "During a landscape study", "At a conservation project", "While auditing a results table", "In a design evaluation",
  "During a mountain field study", "At a public science forum", "While reviewing a new procedure", "In a multimedia science presentation",
];

const clean = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const xml = (value) => clean(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const task = (question, correct, wrongs, summary, hint, focus, visualKind = "evidence") => ({ question, correct, wrongs, summary, hint, focus, visualKind });

function directTask(code, index, bank, context) {
  const mode = index % 6;
  // Vary the scientific case independently of the task form. This prevents a
  // repeated six-item template cycle while retaining a predictable key audit.
  const n = Math.floor(index / 6) + mode * 2 + (bank === "test" ? 17 : 5);
  switch (code) {
    case "AC9S5U01": {
      const examples = [
        ["a desert plant's waxy leaf surface", "structural feature", "reduces water loss"],
        ["a possum feeding at night", "behaviour", "reduces daytime heat exposure"],
        ["a penguin's thick feather layer", "structural feature", "reduces heat loss"],
        ["birds migrating when food becomes scarce", "behaviour", "helps them reach seasonal food"],
        ["a mangrove's wide roots", "structural feature", "supports the plant in soft mud"],
        ["a lizard sheltering under rock at midday", "behaviour", "reduces exposure to extreme heat"],
      ];
      const [example, kind, benefit] = examples[n % examples.length];
      if (mode % 3 === 0) return task(`${context}, students observe ${example}. How should this adaptation be classified?`, kind, [kind === "behaviour" ? "structural feature" : "behaviour", "temporary weather condition"], `The example is ${kind === "behaviour" ? "an action" : "a physical characteristic"} of the organism.`, "Ask whether it is something the organism does or a body feature.", "classify an adaptation", "organism");
      if (mode % 3 === 1) return task(`${context}, which explanation best links ${example} to survival?`, benefit, ["it guarantees survival in every habitat", "the organism chose to develop it during one day"], `The feature or behaviour can improve success under the stated habitat conditions.`, "Link the environmental challenge to a mechanism, not just appearance.", "explain an adaptation", "organism");
      return task(`${context}, which evidence would best test whether this adaptation is useful in that habitat? The adaptation is ${example}.`, "repeated observations comparing access, protection or survival under relevant conditions", ["one photograph with no comparison", "a vote on which feature looks best"], "Repeated comparative observations provide stronger evidence than appearance or opinion.", "Look for repeated evidence tied to the proposed survival mechanism.", "evaluate adaptation evidence", "evidence");
    }
    case "AC9S5U02": {
      const states = [
        ["solid", "particles remain close in fixed relative positions", "keeps its own shape"],
        ["liquid", "particles stay close but move past one another", "takes the container's shape"],
        ["gas", "particles are widely spaced and move throughout the space", "fills and can be compressed in a container"],
      ];
      const [state, model, observation] = states[n % 3];
      if (mode % 3 === 0) return task(`${context}, a sample ${observation}. Which state best matches the observation?`, state, states.filter(([s]) => s !== state).map(([s]) => s), `The observable behaviour matches a ${state}.`, "Compare whether shape and volume stay fixed and whether the sample can be compressed.", "classify a state of matter", "particles");
      if (mode % 3 === 1) return task(`${context}, which particle explanation best represents a ${state}?`, model, states.filter(([s]) => s !== state).map(([,m]) => m), `The particle model links spacing and movement to the observed properties of a ${state}.`, "Use spacing, arrangement and motion; particles do not vanish or change size.", "use a particle model", "particles");
      return task(`${context}, perfume scent spreads across a room. Which particle-model explanation is strongest?`, "gas particles move randomly and diffuse through the available air", ["the scent particles stop moving near the bottle", "air particles pull the scent in one straight line"], "Diffusion results from ongoing random particle motion.", "Think about particle movement in all directions over time.", "explain diffusion", "particles");
    }
    case "AC9S5U03": {
      const interactions = [
        ["a mirror redirects a torch beam", "reflection", "light changes direction at the surface"],
        ["a straw appears bent in water", "refraction", "light changes direction crossing air and water"],
        ["dark cloth warms in sunlight", "absorption", "light energy transfers to the material"],
        ["a clear window lets a scene remain visible", "transmission", "much of the light passes through"],
        ["an opaque card forms a shadow", "blocking", "straight-line rays cannot reach the region behind it"],
        ["rough white paper is visible from many directions", "scattering", "reflected light travels in many directions"],
      ];
      const [event, interaction, explanation] = interactions[n % interactions.length];
      if (mode % 2 === 0) return task(`${context}, students observe that ${event}. Which light interaction is most important?`, interaction, interactions.filter(([,i]) => i !== interaction).slice(0,2).map(([,i]) => i), `The observation is explained mainly by ${interaction}.`, "Trace what happens to the light as it meets or crosses the material.", "identify a light interaction", "rays");
      return task(`${context}, which explanation best accounts for why ${event}?`, explanation, interactions.filter(([,i]) => i !== interaction).slice(0,2).map(([, ,e]) => e), "The explanation traces the change in the light path or energy.", "Start with the source and follow the light to the material and observer.", "trace a light path", "rays");
    }
    case "AC9S5U04": {
      const processes = [
        ["rock cracks after repeated freezing and thawing", "weathering", "rock is broken down in place"],
        ["rainwater removes loose soil from bare ground", "erosion", "weathered material is removed"],
        ["a river carries sand downstream", "transportation", "moving water carries sediment"],
        ["sand settles where a river enters a calm lake", "deposition", "slower water loses energy and sediment settles"],
        ["wind carries dry dust across a plain", "transportation", "moving air carries loose particles"],
        ["a delta grows at a river mouth", "deposition", "sediment builds up as flow slows"],
      ];
      const [event, process, explanation] = processes[n % processes.length];
      if (mode % 2 === 0) return task(`${context}, ${event}. Which geological process is occurring?`, process, processes.filter(([,p]) => p !== process).slice(0,2).map(([,p]) => p), `The event shows ${process}.`, "Decide whether material is breaking down, being removed, moving or settling.", "classify a geological process", "erosion");
      return task(`${context}, which explanation best describes why ${event}?`, explanation, processes.filter(([,p]) => p !== process).slice(0,2).map(([, ,e]) => e), "The explanation connects the agent's energy with breakdown, movement or settling.", "Follow the sediment and identify what changes at this location.", "explain landscape change", "erosion");
    }
    case "AC9S5H01": {
      const cases = [
        ["another team repeats the same method", "replication tests whether the finding occurs again"],
        ["a new microscope reveals smaller structures", "new technology can extend observations and refine explanations"],
        ["scientists share methods and raw measurements", "others can inspect the evidence and repeat the work"],
        ["reviewers point out an uncontrolled variable", "critique can identify a weakness in the method"],
        ["new evidence conflicts with one part of a model", "the model should be revised while useful parts may remain"],
        ["experts from different fields analyse one problem", "different expertise can add methods and interpretations"],
      ];
      const [event, meaning] = cases[n % cases.length];
      return task(`${context}, ${event}. What does this contribute to scientific knowledge?`, meaning, cases.filter(([e]) => e !== event).slice(0,2).map(([,m]) => m), "Scientific knowledge develops through transparent evidence, checking, collaboration and revision.", "Choose the contribution directly supported by the event.", "develop scientific knowledge", "evidence");
    }
    case "AC9S5H02": {
      const decisions = [
        ["installing wildlife crossings near a road", "monitor animal use and collision numbers before and after installation", "may improve movement but needs monitoring for location and effectiveness"],
        ["using a new pest-control method", "compare pest reduction with effects on non-target species", "may protect crops but could harm other organisms"],
        ["adding shade trees to a playground", "measure temperature, water needs and use across seasons", "may reduce heat but requires water and maintenance"],
        ["choosing reusable containers for a canteen", "compare full life-cycle waste, energy and cleaning needs", "may reduce single-use waste but uses washing resources"],
        ["restoring vegetation beside a creek", "track bank stability, water quality and habitat over time", "may reduce erosion but outcomes depend on species and conditions"],
        ["introducing solar lighting", "compare energy saved, battery life and effects of night lighting", "may reduce grid use but creates battery and ecological trade-offs"],
      ];
      const [decision, evidence, consequence] = decisions[n % decisions.length];
      if (mode % 2 === 0) return task(`${context}, a community is considering ${decision}. Which evidence plan is most useful?`, evidence, ["choose the most popular option without measurements", "measure only one short-term benefit"], "Useful decisions compare relevant benefits, risks and effects over a suitable time.", "Identify criteria, gather evidence for each and include affected groups.", "use science in a decision", "decision");
      return task(`${context}, which evaluation of ${decision} is most balanced?`, consequence, ["it will solve every related problem", "there can be no unintended effects"], "A balanced evaluation recognises the main benefit and plausible limitations or consequences.", "Avoid guaranteed claims; identify what should be monitored.", "evaluate consequences", "decision");
    }
    case "AC9S5I01": {
      const investigations = [
        ["surface colour", "temperature rise under equal light", "darker surfaces will warm more because they absorb more light"],
        ["water volume", "plant height increase with equal light and soil", "plants receiving a suitable larger water volume may grow more because water supports cell processes"],
        ["ramp height", "distance travelled by the same toy car", "the car will travel farther from a higher ramp because it begins with more gravitational energy"],
        ["material type", "heat loss from equal containers", "better insulating materials will reduce heat loss by slowing energy transfer"],
        ["distance from a lamp", "shadow size using the same object", "the shadow size will change as source-object distance changes because ray spread changes"],
        ["soil cover", "mass of soil moved by equal water flow", "vegetated soil will lose less mass because roots and cover stabilise it"],
      ];
      const [changed, measured, prediction] = investigations[n % investigations.length];
      if (mode % 2 === 0) return task(`${context}, which question best tests a relationship involving ${changed}?`, `How does ${changed} affect ${measured}?`, [`Is ${changed} interesting?`, `Which result do I like best?`], "The question names a changed variable and a measurable response.", "Use the frame: How does the changed variable affect the measured variable?", "pose an investigable question", "variables");
      return task(`${context}, which prediction is reasoned and testable?`, prediction, ["the result will be good", "something interesting will happen"], "The prediction states a direction and gives a scientific reason before testing.", "Look for an expected pattern and a because-clause.", "make a scientific prediction", "variables");
    }
    case "AC9S5I02": {
      const plans = [
        ["surface colour and temperature rise", "keep material, area, lamp distance, start temperature and heating time the same"],
        ["ramp height and car travel distance", "keep the car, ramp surface, release method and floor surface the same"],
        ["soil cover and erosion", "keep soil amount, tray slope, water volume and pouring time the same"],
        ["material and heat loss", "keep container size, liquid volume, start temperature and measurement interval the same"],
        ["light distance and plant growth", "keep plant type, soil, water and observation period the same"],
        ["object distance and shadow size", "keep the lamp, object, screen and measuring method the same"],
      ];
      const [relationship, controls] = plans[n % plans.length];
      if (mode % 3 === 0) return task(`${context}, students test ${relationship}. Which control plan is strongest?`, controls, ["change several conditions each trial", "leave timing and quantities unspecified"], "Relevant conditions are kept constant so the changed variable can be compared fairly.", "Name exact quantities, distances or times another group could repeat.", "control an investigation", "method");
      if (mode % 3 === 1) return task(`${context}, which step most improves repeatability when testing ${relationship}?`, "record exact quantities, equipment positions, timing and measurement procedure", ["say to work carefully", "let every group choose different conditions"], "A repeatable method gives enough detail for another group to follow consistently.", "Replace vague instructions with measured details.", "write a repeatable method", "method");
      return task(`${context}, why should students pilot one trial before collecting all data?`, "to detect safety, range or measurement problems and refine the method", ["to change the prediction after seeing the result", "to avoid recording unexpected evidence"], "A pilot reveals practical problems before the full investigation.", "Use the pilot to improve procedure, not to manufacture a preferred result.", "use a pilot test", "method");
    }
    case "AC9S5I03": {
      const records = [
        ["temperature", "27.5 °C", "a quantitative observation with value and unit"],
        ["elapsed time", "45.0 s", "a quantitative observation with value and unit"],
        ["liquid volume", "32 mL", "a quantitative observation with value and unit"],
        ["surface appearance", "the surface became dull and rough", "a qualitative observation without an unsupported cause"],
        ["gas behaviour", "the balloon's circumference increased by 4 cm", "a quantitative observation of change"],
        ["sediment", "fine brown particles settled at the tray's lower end", "a qualitative observation tied to location"],
      ];
      const [quantity, record, description] = records[n % records.length];
      if (mode % 2 === 0) return task(`${context}, students record ${quantity}. Which entry is the strongest observation?`, record, ["it changed somehow", "the result proves my explanation"], `${record} is ${description}.`, "Record what was observed, with units and suitable precision where measured.", "record an observation", "measurement");
      return task(`${context}, a digital sensor gives an unexpected reading. What should students do first?`, "record it, check unit and placement, then investigate or repeat", ["delete it immediately", "replace it with the expected value"], "Unexpected readings should be preserved and checked rather than silently changed.", "Separate data integrity from later decisions about explaining an outlier.", "handle unexpected data", "measurement");
    }
    case "AC9S5I04": {
      const representations = [
        ["temperature measured every minute", "line graph", "shows change over ordered time"],
        ["counts for different habitat types", "column graph", "supports comparison among categories"],
        ["exact repeated measurements", "data table", "preserves values and trial labels"],
        ["stages of erosion and deposition", "flow diagram", "shows an ordered process"],
        ["particle arrangements in three states", "labelled visual model", "shows spacing and movement ideas"],
        ["mean result for each tested material", "column graph", "compares numerical responses across material categories"],
      ];
      const [data, form, reason] = representations[n % representations.length];
      if (mode % 2 === 0) return task(`${context}, students need to represent ${data}. Which representation is most appropriate?`, form, representations.filter(([,f]) => f !== form).slice(0,2).map(([,f]) => f), `A ${form} ${reason}.`, "Match the representation to the variables and the relationship being examined.", "choose a representation", "graph");
      return task(`${context}, which conclusion from a graph is appropriately limited?`, "Under the tested conditions, the measured response changed with the selected variable", ["the graph proves the pattern is universal", "the graph alone proves the complete mechanism"], "The conclusion stays within the method, variables and conditions represented.", "Describe the pattern with evidence, then state its scope.", "interpret a representation", "graph");
    }
    case "AC9S5I05": {
      const reviews = [
        ["one group placed the lamp 10 cm closer", "a systematic method difference that can change all its readings"],
        ["three repeated readings vary slightly", "random variation that should be summarised rather than hidden"],
        ["one value was copied into the wrong column", "a recording error to verify against the source"],
        ["a thermometer reads 2 °C high every time", "a systematic measurement bias not fixed by averaging"],
        ["one group used only a single trial", "weak reliability because natural variation was not sampled"],
        ["two groups used the same method and got close means", "findings that provide useful agreement within measurement variation"],
      ];
      const [event, meaning] = reviews[n % reviews.length];
      if (mode % 2 === 0) return task(`${context}, ${event}. How should this be evaluated?`, meaning, ["all evidence should be deleted", "the difference proves dishonesty"], "The evaluation identifies the likely error or variation without overstating it.", "Compare methods, instruments and repeated data before judging findings.", "evaluate methods and findings", "evidence");
      return task(`${context}, what should happen before removing an outlier from a results table?`, "check the method, instrument and original record, then document any decision", ["delete it because it is different", "replace it with the group mean"], "Outliers require investigation and a transparent decision.", "Unexpected does not automatically mean invalid.", "review an outlier", "evidence");
    }
    case "AC9S5I06": {
      const audiences = [
        ["a formal investigation report", "include question, repeatable method, labelled results, evidence-based conclusion and limitations"],
        ["a poster for younger students", "use a clear labelled visual, short defined terms and an accurate main message"],
        ["an oral presentation", "use signposting, readable slides and spoken explanation of the evidence"],
        ["a digital science page", "use headings, descriptive alt text, captions and source attribution"],
        ["a briefing for community decision-makers", "state the decision, relevant evidence, uncertainty, trade-offs and recommendation"],
        ["a comparison of two investigations", "show method differences, data evidence and a cautious evaluation"],
      ];
      const [format, features] = audiences[n % audiences.length];
      if (mode % 2 === 0) return task(`${context}, students create ${format}. Which communication plan is strongest?`, features, ["use decoration without explaining the evidence", "change data values to suit the audience"], "The plan matches purpose and audience while preserving scientific meaning.", "Choose structure, vocabulary and visuals that help the audience check the evidence.", "communicate for an audience", "communication");
      return task(`${context}, a graph is included in a science presentation. What should the speaker do?`, "refer to the graph, explain the pattern with values and state its limits", ["show it without labels or discussion", "claim it proves more than the investigation tested"], "A scientific visual must be labelled, interpreted and connected to the claim.", "Treat visuals as evidence, not decoration.", "explain a scientific visual", "communication");
    }
    default: throw new Error(`No task builder for ${code}`);
  }
}

function placeAnswers(correct, wrongs, position) {
  const unique = [...new Set(wrongs.map(String).filter((value) => value !== String(correct)))];
  while (unique.length < 2) unique.push(unique.length ? "The claim ignores the recorded evidence." : "The explanation changes more than one condition.");
  const answers = unique.slice(0, 2).map((text) => ({ text, is_correct: false }));
  answers.splice(position, 0, { text: String(correct), is_correct: true });
  return answers;
}

function symbol(item, index) {
  const colour = item.bank === "practice" ? "#17663a" : "#7c3aed";
  const labels = { organism: ["Habitat", "Feature", "Effect"], particles: ["Observe", "Model", "Explain"], rays: ["Source", "Interaction", "Path"], erosion: ["Material", "Agent", "Change"], variables: ["Change", "Measure", "Control"], method: ["Plan", "Repeat", "Check"], measurement: ["Observe", "Measure", "Record"], graph: ["Data", "Represent", "Interpret"], decision: ["Benefit", "Risk", "Monitor"], communication: ["Audience", "Evidence", "Meaning"], evidence: ["Claim", "Evidence", "Reasoning"] };
  const steps = labels[item.visualKind] ?? labels.evidence;
  const id = item.id;
  return `<symbol id="${id}" viewBox="0 0 640 300"><rect x="16" y="16" width="608" height="268" rx="28" fill="#f7fbf8" stroke="${colour}" stroke-width="4"/><text x="42" y="60" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="${colour}">${xml(item.curriculum_code)} • ${item.bank === "practice" ? "Practice" : "Test"}</text>${steps.map((label, step) => `<g transform="translate(${54 + step * 190} 105)"><circle cx="48" cy="48" r="44" fill="${step === index % 3 ? colour : "#dcefe2"}"/><text x="48" y="54" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="${step === index % 3 ? "white" : "#173968"}">${xml(label)}</text>${step < 2 ? `<path d="M100 48h70" stroke="#5d6c80" stroke-width="7" stroke-linecap="round"/><path d="M158 35l16 13-16 13" fill="none" stroke="#5d6c80" stroke-width="7"/>` : ""}</g>`).join("")}<text x="42" y="268" font-family="Arial,sans-serif" font-size="16" fill="#5d6c80">${xml(item.visual.alt_text)}</text></symbol>`;
}

function makeItem(code, bank, index, context) {
  const detail = directTask(code, index, bank, context);
  const id = `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${String(index + 1).padStart(3, "0")}`;
  const alt = `${context}: ${clean(detail.focus)}, shown as a three-step ${detail.visualKind} reasoning pathway.`;
  return {
    id, curriculum_code: code, year_level: "Year 5", subject: "science", bank,
    skill: clean(detail.focus).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    question: detail.question,
    audio_prompt: detail.question,
    visual: { type: "svg", asset_path: `/assets/assessment-visuals/year5/science/${code.toLowerCase()}.svg#${id}`, alt_text: alt },
    answers: placeAnswers(detail.correct, detail.wrongs, index % 3),
    correct_index: index % 3,
    explanation: { summary: detail.summary, hint: detail.hint },
    visualKind: detail.visualKind,
  };
}

fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });
for (const code of order) {
  const practice = PRACTICE_CONTEXTS.map((context, index) => makeItem(code, "practice", index, context));
  const test = TEST_CONTEXTS.map((context, index) => makeItem(code, "test", index, context));
  const items = [...practice, ...test];
  const symbols = items.map(symbol).join("");
  const persistedItems = items.map(({ visualKind, ...item }) => item);
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(persistedItems, null, 2)}\n`);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${symbols}</defs></svg>\n`);
}

console.log(JSON.stringify({ codes: order.length, practice: order.length * 24, test: order.length * 16, total: order.length * 40 }, null, 2));
