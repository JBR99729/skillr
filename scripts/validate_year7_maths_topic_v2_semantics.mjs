import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const modules = [];
const context = {window: {SkillrTopicModulesV2: {register: module => modules.push(module)}}};
vm.runInNewContext(read("assets/year7-maths-topic-modules-v2.js"), context, {filename: "assets/year7-maths-topic-modules-v2.js"});

const registry = JSON.parse(read("data/curriculum-units.json")).units
  .filter(unit => unit.yearNumber === 7 && unit.subject === "Mathematics")
  .map(unit => unit.code)
  .sort();
const byCode = new Map(modules.map(module => [module.identity?.code, module]));
const failures = new Map();
const add = (kind, code, detail) => {
  const key = `${kind}: ${detail}`;
  if (!failures.has(key)) failures.set(key, new Set());
  failures.get(key).add(code);
};
const words = value => String(value || "").toLowerCase().match(/[a-z][a-z'-]{2,}|\d+(?:\.\d+)?/g) || [];
const normal = value => String(value || "").toLowerCase().replace(/[“”‘’]/g, "'").replace(/\s+/g, " ").trim();
const allText = value => JSON.stringify(value).replace(/[{}\[\]",:]/g, " ");

if (registry.length !== 30) add("registry", "GLOBAL", `expected 30 active codes; found ${registry.length}`);
for (const code of registry) if (!byCode.has(code)) add("registry", code, "generated module missing");
for (const code of byCode.keys()) if (!registry.includes(code)) add("registry", code, "generated code is not active");

const genericShells = [
  "identify the quantities and condition in",
  "use the labelled model:",
  "apply the central relationship:",
  "state the result in the original context and verify it",
  "read the new situation and decide which representation",
  "carry out the required comparison or calculation",
  "the conclusion must remain consistent with",
  "this relationship is the organising idea for",
  "the model makes the quantities, conditions and mathematical structure visible",
  "a complete solution therefore represents the situation"
];
const deicticPromptShells = [
  "worked example shown in the central model",
  "what the labelled",
  "code-specific worked example",
  "state the central relationship",
  "use the topic model",
  "the worked relationship",
  "central mathematical relationship",
  "complete extension response connects the constructed example"
];
const vagueImperatives = /^(explain|describe|analyse|audit|choose|find a missing|plot|trace|check|use|define)\b.{0,55}\.?$/i;
const actionableHint = /\b(add|align|apply|arrange|ask|begin|calculate|change|check|choose|classify|compare|consider|convert|count|create|decide|define|describe|distinguish|distribute|divide|do not|double|draw|estimate|evaluate|express|factor|find|fix|give|group|halve|hold|identify|imagine|inspect|keep|label|line|list|locate|look|map|mark|match|mention|model|move|multiply|order|pair|picture|place|plot|prime-factorise|put|read|rearrange|reconstruct|record|remember|rename|replace|represent|rewrite|round|select|separate|set|show|simplify|solve|specify|start|state|substitute|subtract|test|think|trace|translate|try|undo|update|use|verify|write)\b/i;
const expectedRoles = ["learning", "refresher", "guided", "quickCheck"];
const expectedTiers = [1, 1, 1, 2, 2, 2, 2, 3, 3];

for (const code of registry) {
  const module = byCode.get(code);
  if (!module) continue;
  const topic = module.topic || {};
  const slides = module.slides || [];
  const questions = module.practiceSheet?.questions || [];
  const topicText = normal(allText(topic));
  const slideText = normal(allText(slides));
  const sheetText = normal(allText(questions));

  const roles = slides.map(slide => slide.role);
  if (JSON.stringify(roles) !== JSON.stringify(expectedRoles)) add("order", code, `slide roles must be ${expectedRoles.join(" → ")}`);
  const tiers = questions.map(question => question.tier);
  if (JSON.stringify(tiers) !== JSON.stringify(expectedTiers)) add("order", code, "question tiers must be 1,1,1,2,2,2,2,3,3");

  for (const [index, example] of (topic.workedExamples || []).entries()) {
    const joined = normal(allText(example));
    for (const phrase of genericShells) if (joined.includes(phrase)) add("worked example", code, `example ${index + 1} contains generic shell “${phrase}”`);
    if ((example.steps || []).length < 4) add("worked example", code, `example ${index + 1} has fewer than four steps`);
    if (!example.answer || !example.check) add("worked example", code, `example ${index + 1} lacks answer/check`);
    const distinct = new Set((example.steps || []).map(normal));
    if (distinct.size !== (example.steps || []).length) add("worked example", code, `example ${index + 1} repeats a step`);
    const concreteSteps = (example.steps || []).filter(step => /\d|[=<>√π²³×÷]|\b(for example|given|suppose|student|shape|data|graph|table|point|angle|sample|spinner)\b/i.test(step));
    if (concreteSteps.length < 2) add("worked example", code, `example ${index + 1} lacks two concrete/data-bearing steps`);
  }

  for (const [index, question] of questions.entries()) {
    const tag = question.id || `question ${index + 1}`;
    const prompt = normal(question.prompt);
    const bundle = normal(`${question.prompt} ${question.answer} ${question.summary} ${question.hint}`);
    for (const phrase of deicticPromptShells) if (bundle.includes(phrase)) add("worksheet", code, `${tag} contains non-self-contained/generic phrase “${phrase}”`);
    if (!question.prompt || !question.answer || !question.summary || !question.hint) add("worksheet", code, `${tag} lacks prompt/answer/summary/hint`);
    if (!String(question.answer || "").trim()) add("worksheet", code, `${tag} answer is empty`);
    if (String(question.summary || "").trim().length < 24) add("worksheet", code, `${tag} summary is not explanatory`);
    if (!actionableHint.test(question.hint || "")) add("worksheet", code, `${tag} hint is not actionable`);
    if (vagueImperatives.test(String(question.prompt || "").trim()) && !/\d|[=<>√π²³×÷]|\b(given|following|this sentence|these values|data set|diagram|table|graph)\b/i.test(question.prompt)) {
      add("worksheet", code, `${tag} is a vague imperative without supplied data/context`);
    }
    if (index >= 7 && String(question.answer || "").trim().length < 35) add("worksheet", code, `${tag} extension answer is not a complete model response/rubric`);
  }

  const vocab = (topic.vocabulary || []).map(item => normal(item.term)).filter(Boolean);
  const visibleSlideVocab = vocab.filter(term => slideText.includes(term));
  const sheetVocab = vocab.filter(term => sheetText.includes(term));
  if (visibleSlideVocab.length < Math.min(2, vocab.length)) add("parity", code, "fewer than two guide vocabulary terms occur in slides");
  if (sheetVocab.length < Math.min(2, vocab.length)) add("parity", code, "fewer than two guide vocabulary terms occur in sheet content");
  const visualIds = new Set((topic.visuals || []).map(visual => visual.id));
  const usedVisualIds = new Set(slides.flatMap(slide => slide.visualIds || []));
  for (const id of usedVisualIds) if (!visualIds.has(id)) add("parity", code, `slide references missing visual ${id}`);
  if (visualIds.size && ![...visualIds].every(id => usedVisualIds.has(id))) add("parity", code, "not every guide visual is used in the slide deck");
  const guided = slides.find(slide => slide.role === "guided");
  const firstExample = topic.workedExamples?.[0];
  if (guided && firstExample) {
    const focus = words(firstExample.title).filter(word => word.length > 4);
    if (focus.length && !focus.some(word => normal(allText(guided)).includes(word))) add("parity", code, "guided slide does not share the first worked-example focus");
    const expectedTokens = new Set(words(allText(guided)));
    const answerTokens = new Set(words(firstExample.answer));
    const numericExpected = words(allText(guided)).filter(token => /^\d/.test(token));
    const numericAnswer = words(firstExample.answer).filter(token => /^\d/.test(token));
    const overlap = [...answerTokens].filter(token => expectedTokens.has(token)).length / Math.max(1, answerTokens.size);
    if (overlap < 0.45 || numericAnswer.some(token => !numericExpected.includes(token))) add("parity", code, "guided expected response differs materially from first worked-example answer");
  }

  const quick = slides.find(slide => slide.role === "quickCheck");
  if (quick) {
    const prompt = normal((quick.body || [])[0]);
    const answer = normal(quick.expectedResponse);
    if (!quick.concealAnswer) add("parity", code, "Quick Check answer is not concealed");
    if (vagueImperatives.test((quick.body || [])[0] || "") && !/\d|[=<>√π²³×÷]|\b(given|following|this|these|data|diagram|table|graph)\b/i.test(prompt)) add("quick check", code, "prompt is not independently answerable");
    const promptTerms = words(prompt).filter(word => word.length >= 3 && !["explain", "describe", "calculate", "justify", "using", "between", "find", "state", "tell", "partner"].includes(word));
    const overlap = promptTerms.filter(word => answer.includes(word));
    if (promptTerms.length >= 2 && overlap.length === 0) add("quick check", code, "prompt and concealed response have no substantive lexical parity");
  }

  for (const phrase of genericShells) if (topicText.includes(phrase) || slideText.includes(phrase)) add("generic prose", code, `contains “${phrase}”`);

  const riskConcepts = {
    AC9M7N01: ["2ab", "binomial expansion", "(30 + 1)²"],
    AC9M7A01: ["slope", "intercept"],
    AC9M7M02: ["wall thickness", "hollow rectangular container"],
    AC9M7SP03: ["reflection followed by reflection", "equivalent to a translation or rotation"]
  }[code] || [];
  const taughtText = normal(`${allText(topic.deepDive)} ${allText(slides)}`);
  for (const concept of riskConcepts) if (sheetText.includes(normal(concept)) && !taughtText.includes(normal(concept))) add("scope", code, `sheet uses untaught flagged concept “${concept}”`);
}

// Detect repeated six-word prose templates across different codes. Mathematical notation is
// intentionally retained; only sentence-like n-grams occurring in at least five codes fail.
const ngrams = new Map();
for (const module of modules) {
  const code = module.identity.code;
  const source = [
    ...(module.topic?.deepDive || []),
    ...(module.topic?.workedExamples || []).flatMap(example => example.steps || []),
    ...(module.practiceSheet?.questions || []).flatMap(question => [question.prompt, question.summary, question.hint])
  ];
  const seen = new Set();
  for (const text of source) {
    const tokens = words(text).filter(token => !/^ac9m7/.test(token));
    for (let index = 0; index <= tokens.length - 6; index += 1) seen.add(tokens.slice(index, index + 6).join(" "));
  }
  for (const gram of seen) {
    if (!ngrams.has(gram)) ngrams.set(gram, new Set());
    ngrams.get(gram).add(code);
  }
}
const harmless = /^(a student says|return to the labelled model and|try an inverse estimate alternate representation|make every condition visible and show|compare accuracy efficiency and how clearly)$/;
const repeatedNgrams = [...ngrams].filter(([gram, codes]) => codes.size >= 5 && !harmless.test(gram)).sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));
for (const [gram, codes] of repeatedNgrams.slice(0, 12)) add("template repetition", [...codes].sort().join(","), `six-word phrase occurs across ${codes.size} codes: “${gram}”`);
if (repeatedNgrams.length > 12) add("template repetition", "GLOBAL", `${repeatedNgrams.length - 12} additional repeated six-word templates detected`);

if (failures.size) {
  console.error(`FAIL Year 7 Maths topic-module v2 semantic QA: ${failures.size} grouped failures`);
  const rows = [...failures.entries()].sort(([a], [b]) => a.localeCompare(b));
  for (const [message, codes] of rows.slice(0, 180)) {
    const list = [...codes].sort();
    console.error(`- ${message} [${list.length <= 8 ? list.join(", ") : `${list.slice(0, 8).join(", ")} +${list.length - 8} more`}]`);
  }
  if (rows.length > 180) console.error(`- … ${rows.length - 180} additional grouped failures suppressed`);
  process.exit(1);
}

console.log("PASS Year 7 Maths topic-module v2 semantic QA: 30/30 codes");
