#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const version = "20260814-foundation-english-topic2";
const expectedCodes = [
  ...Array.from({ length: 9 }, (_, index) => `AC9EFLA${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 5 }, (_, index) => `AC9EFLE${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 15 }, (_, index) => `AC9EFLY${String(index + 1).padStart(2, "0")}`)
];
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const oneSentence = (value) => {
  const text = String(value || "").trim();
  return text.length >= 15 && /[.!?]$/.test(text) && !/[.!?]\s+[A-Z]/.test(text);
};

const document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener() {},
  documentElement: {},
  head: { appendChild() {} },
  body: { dataset: {} },
  createElement: () => ({ setAttribute() {} })
};
class MutationObserver { observe() {} disconnect() {} }
const context = vm.createContext({
  window: {}, document, MutationObserver, console,
  URLSearchParams, location: { search: "", pathname: "/" }, setTimeout: () => 0
});
const run = (file) => new vm.Script(read(file), { filename: file }).runInContext(context);

const topicSources = [
  "assets/foundation-english-data.js",
  "assets/foundation-english-topic-module-la-v2.js",
  "assets/foundation-english-topic-module-le-ly1-v2.js",
  "assets/foundation-english-topic-module-ly2-v2.js",
  "assets/foundation-elaboration-map.js",
  "assets/foundation-canonical-v1.1.js",
  "assets/foundation-english-topic-module-core-v2.js"
];
const worksheetSources = [
  "quiz/assets/foundation-english-topic-module-la-data-v2.js",
  "quiz/assets/foundation-english-topic-module-le-ly1-data-v2.js",
  "quiz/assets/foundation-english-topic-module-ly2-data-v2.js",
  "quiz/assets/foundation-english-topic-module-balance-v2.js"
];
for (const file of [...topicSources, ...worksheetSources]) check(exists(file), `Missing source ${file}`);
if (errors.length) {
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}
topicSources.forEach(run);
const data = context.window.SkillrFoundationEnglishData;
const canonical = context.window.SkillrFoundationCanonical;
const generatedSpecs = canonical.buildCollection(data, {
  subject: "English", year: "Foundation", pathSegment: "english", quizSubject: "english"
});
run("assets/foundation-ac9efla01-lesson.js");
worksheetSources.forEach(run);
const specs = { ...generatedSpecs, AC9EFLA01: context.window.SkillrAC9EFLA01Lesson };
const banks = context.window.SkillrFoundationEnglishWorksheetData;
for (const [code, questionIndex, exactAnswer] of [
  ["AC9EFLY12", 4, "map"],
  ["AC9EFLY14", 1, "my"],
  ["AC9EFLY14", 2, "and"],
  ["AC9EFLY15", 1, "cups"]
]) {
  check(banks?.[code]?.questions?.[questionIndex]?.answer === exactAnswer, `${code} Q${questionIndex + 1}: answer key must preserve the exact lower-case printed target ${exactAnswer}`);
}
for (const [code, bank] of Object.entries(banks || {})) {
  for (const question of bank.questions || []) {
    if (!Array.isArray(question.audio_answers)) continue;
    check(question.audio_answers.length === question.answers.length, `${code}: balanced spoken choices lost one-to-one parity`);
    const audioByVisible = new Map(question.answers.map((answer, index) => [String(answer).trim().toLowerCase().replace(/[.!?]+$/, ""), String(question.audio_answers[index]).trim().toLowerCase()]));
    for (const [visible, spoken] of audioByVisible) {
      const letters = visible.replace(/[^a-z]/g, "").split("").join(", ");
      check(!letters || spoken.includes(letters), `${code}: balanced visible choice ${visible} is paired with the wrong spoken spelling ${spoken}`);
    }
  }
}
const codes = Object.keys(data).filter((code) => /^AC9EF(?:LA|LE|LY)\d{2}$/.test(code)).sort();
check(codes.length === 29, `Expected 29 Foundation English codes, found ${codes.length}`);
check(JSON.stringify(codes) === JSON.stringify(expectedCodes), `Foundation English code set differs from the official ACARA v9 LA01-09, LE01-05 and LY01-15 registry`);

const allPrompts = new Map();
const allTitles = new Map();
const allModels = new Map();
const forbiddenGeneric = /(?:which option matches|curriculum code|core idea of|teaching model|common mix[- ]?up|make a mini teaching example|in this lesson i need to|good learner should remember)/i;
const unsafeMarkers = /_{2,}|\{\{blank\}\}|\/(?:[a-z]|sh|ch|th)\//i;
let totalSlides = 0;
let totalQuestions = 0;
const correctPositions = new Map();
const normaliseAnswer = (value) => String(value ?? "").trim().replace(/\s+/g, " ");
const softNormaliseAnswer = (value) => normaliseAnswer(value).toLowerCase().replace(/[.!?]+$/g, "");

for (const code of codes) {
  const unit = data[code];
  const spec = specs[code] || unit?.canonical;
  const bank = banks?.[code];
  check(Boolean(spec), `${code}: missing canonical topic specification`);
  check(spec?.title === unit?.title, `${code}: topic title parity`);
  check(String(spec?.contentDescription || "").trim().length > 20, `${code}: full curriculum identity`);
  check(String(unit?.learn || "").trim().length >= 55, `${code}: concept deep-dive is too thin`);
  check(Boolean(unit?.preservedLegacyTopicMaterial?.learn && unit?.preservedLegacyTopicMaterial?.model_html), `${code}: useful legacy topic material not preserved`);
  check(String(unit?.learn || "").trim().toLowerCase() !== String(unit?.desc || "").trim().toLowerCase(), `${code}: raw curriculum description used as teaching prose`);
  const activeLessonText = [unit?.learn, unit?.model_title, unit?.model_html, unit?.apply_title, unit?.apply_html, ...(unit?.activities || []).flatMap((item) => typeof item === "string" ? [item] : [item?.title, item?.text, item?.visual]), ...(unit?.mistakes || []).flat(), ...(unit?.quick || []), ...(unit?.mastery || [])].join(" ");
  check(!/_{3,}|…|\.\.\./.test(activeLessonText), `${code}: active lesson contains a silent blank or truncated marker`);
  check(!/\|/.test(activeLessonText), `${code}: active lesson relies on a potentially silent pipe separator; name the groups or breaks in words`);
  check(code === "AC9EFLA01" || String(unit?.model_html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length >= 35, `${code}: central visual/text model is too thin`);
  check(code === "AC9EFLA01" || String(unit?.apply_html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length >= 35, `${code}: worked application is too thin`);
  check(code === "AC9EFLA01" || (unit?.activities || []).length >= 3, `${code}: three connected learning activities`);
  check((unit?.quick || []).length >= 4, `${code}: four code-specific quick checks`);
  check((unit?.mastery || []).length >= 4, `${code}: four success criteria`);
  check(String(spec?.learningIntention || "").startsWith("I can "), `${code}: student-friendly learning intention`);
  check((spec?.successCriteria || []).length >= 4, `${code}: success criteria`);
  check((spec?.vocabulary || []).length >= 4, `${code}: at least four vocabulary entries`);
  for (const entry of spec?.vocabulary || []) {
    check(String(entry?.term || "").trim().length >= 2, `${code}: blank vocabulary term`);
    check(String(entry?.definition || "").trim().length >= 8, `${code}/${entry?.term}: weak vocabulary definition`);
  }
  check((spec?.workedExamples || []).length === 2, `${code}: exactly two worked examples`);
  for (const example of spec?.workedExamples || []) {
    check(String(example?.displayHtml || "").replace(/<[^>]+>/g, " ").trim().length >= 12 || (example?.displayModelIds || []).length >= 1, `${code}/${example?.id}: worked example detail`);
  }
  check((spec?.misconceptions || []).length >= 3, `${code}: at least three misconceptions`);
  for (const misconception of spec?.misconceptions || []) {
    check(String(misconception?.title || "").trim().length >= 5, `${code}: misconception title`);
    check(String(misconception?.rapidFix || "").trim().length >= 12, `${code}/${misconception?.id}: misconception correction`);
  }
  const coreSlides = (spec?.slides || []).filter((slide) => slide.sequenceRole === "core");
  const officialElaborations = context.window.SkillrFoundationElaborationMap?.[code]?.elaborations || [];
  const richElaborations = unit?.elaborations || [];
  check((unit?.elaborations || []).length === officialElaborations.length, `${code}: every official elaboration needs a rich code-specific teaching overlay`);
  check((spec?.elaborations || []).length === officialElaborations.length, `${code}: official elaboration parity`);
  for (const elaboration of spec?.elaborations || []) {
    const studentFacing = [
      elaboration.shortTitle, elaboration.plainLanguageConcept, elaboration.teachingPurpose,
      elaboration.teacherDoes, elaboration.teacherSaysOrAsks, elaboration.studentDoes,
      elaboration.whatToLookFor, elaboration.ifIncorrect, elaboration.workedExample,
      elaboration.visualTitle, elaboration.visualHtml
    ].join(" ");
    check(!/(?:This elaboration makes|Complete the modelled task|Show one example of|What do you notice in this)/i.test(studentFacing), `${code}/${elaboration.id}: generic canonical elaboration fallback`);
    check(!/…|\.\.\.|_{2,}/.test(studentFacing), `${code}/${elaboration.id}: truncated or blank-marker elaboration text`);
    check(!/phoneme\s*\/\s*(?:medial|end)|\b(?:[a-z]|sh|ch|th)-(?:[a-z]|sh|ch|th)(?:-(?:[a-z]|sh|ch|th))+\b/i.test(studentFacing), `${code}/${elaboration.id}: TTS-unsafe phoneme notation`);
    check(String(elaboration.visualHtml || "").includes('role="img"') && /aria-label="[^"]{20,}"/.test(String(elaboration.visualHtml || "")), `${code}/${elaboration.id}: accessible code-specific elaboration visual`);
    const rich = richElaborations.find((item) => String(item.label || item.id || "").toUpperCase() === String(elaboration.id || "").toUpperCase());
    check(Boolean(rich?.steps?.length) && elaboration.teacherDoes.includes(rich.steps.join(" ")), `${code}/${elaboration.id}: teacher action must use this elaboration's authored steps`);
    check(String(elaboration.studentDoes || "").length >= 20 && !/^(?:ask|show|display|invite|model|read|offer|place|give|teach)\b/i.test(String(elaboration.studentDoes || "").trim()), `${code}/${elaboration.id}: student action must be learner-facing`);
    check(!/Respond by speaking, pointing, acting, drawing or writing, then use the model to show this target evidence/i.test(elaboration.studentDoes), `${code}/${elaboration.id}: generic modality-list student action`);
  }
  check((unit?.mastery || []).every((item) => /^[a-z]/.test(String(item || ""))), `${code}: mastery phrases must use base verbs after I can`);
  check(!(spec?.successCriteria || []).some((item) => /^I can (?:a\b|an\b|the\b|listens\b|waits\b|responds\b|uses\b|names\b|finds\b|recognises\b|chooses\b|states\b|points\b|explains\b|segments\b|blends\b|isolates\b|changes\b|hears\b|treats\b|reads\b|writes\b|forms\b|moves\b)/i.test(item)), `${code}: ungrammatical I can success criterion`);
  check(Array.isArray(unit?.quickAnswers) && unit.quickAnswers.length === 4, `${code}: four exact quick-check teacher answers`);
  (unit?.quickAnswers || []).forEach((answer, index) => {
    check(String(answer || "").trim().length >= 18, `${code}: quick answer ${index + 1} is too thin`);
    check(spec?.masteryItems?.[index]?.expectedAnswer === answer, `${code}: quick answer ${index + 1} does not reach live teacher guidance`);
  });
  check((spec?.models || []).every((model) => String(model?.accessibleDescription || "").trim().length >= 20), `${code}: accessible model descriptions`);
  totalSlides += spec?.slides?.length || 0;
  check(coreSlides.length === 4, `${code}: exactly four core slides`);
  check(JSON.stringify(coreSlides.map((slide) => slide.id)) === JSON.stringify(spec?.coreSlideIds), `${code}: core slide identity/order`);
  check(JSON.stringify(coreSlides.map((slide) => slide.coreRole)) === JSON.stringify(["learning-intention","concept-refresher","guided-example","quick-check"]), `${code}: four required core slide roles`);
  check(/learning goal|learning intent/i.test(coreSlides[0]?.title || "") || coreSlides[0]?.coreRole === "learning-intention", `${code}: core slide 1 role`);
  check(coreSlides[1]?.id === "slide-model" || code === "AC9EFLA01", `${code}: core slide 2 concept refresher`);
  check(coreSlides[2]?.id === "slide-application" || code === "AC9EFLA01", `${code}: core slide 3 guided example`);
  check(/mastery|quick/i.test(coreSlides[3]?.title || "") || coreSlides[3]?.coreRole === "quick-check", `${code}: core slide 4 quick check`);
  check(/60[- ]second|60 seconds/i.test(`${coreSlides[3]?.title || ""} ${coreSlides[3]?.display?.studentPrompt || ""}`), `${code}: 60-second Turn and Talk timing`);
  check((spec?.slides || []).every((slide) => slide.sequenceRole === "core" || slide.sequenceRole === "optional-extension"), `${code}: legacy slides identified as optional extensions`);
  for (const slide of spec?.slides || []) {
    for (const field of ["teacherDoes", "teacherSaysOrAsks", "studentDoes", "whatToLookFor", "ifIncorrect"]) {
      check(String(slide?.teacherLayer?.[field] || "").trim(), `${code}/${slide.id}: teacherLayer.${field}`);
    }
  }
  check(Boolean(spec?.resourceLinks?.topic && spec?.resourceLinks?.slide && spec?.resourceLinks?.worksheet), `${code}: connected resource links`);

  check(Array.isArray(bank?.questions) && bank.questions.length === 9, `${code}: exactly 9 worksheet questions`);
  check(bank?.exportMeta?.curriculumCode === code && bank?.exportMeta?.year === "Foundation" && bank?.exportMeta?.subject === "English", `${code}: stable export traceability metadata`);
  check(bank?.exportMeta?.publicBranding === "renderer-chrome-only", `${code}: branding separated from instructional data`);
  check(JSON.stringify(bank?.exportMeta?.sheets?.map((sheet) => sheet.questionNumbers)) === JSON.stringify([[1,2,3,4,5],[6,7,8,9]]), `${code}: exportable two-sheet question map`);
  const questions = bank?.questions || [];
  totalQuestions += questions.length;
  check(questions.filter((question) => question.tier === "warm-up").length === 3, `${code}: 3 Warm-Up questions`);
  check(questions.filter((question) => question.tier === "core").length === 4, `${code}: 4 Core questions`);
  check(questions.filter((question) => question.tier === "challenge").length === 2, `${code}: 2 Challenge questions`);
  check(JSON.stringify(questions.map((question) => question.tier)) === JSON.stringify(["warm-up","warm-up","warm-up","core","core","core","core","challenge","challenge"]), `${code}: canonical 3/4/2 ordering`);
  check(Array.isArray(bank?.preservedOptionalQuestions) && bank.preservedOptionalQuestions.length >= 1, `${code}: preserved legacy worksheet material`);
  const vocabulary = new Set((spec?.vocabulary || []).map((entry) => entry.term));
  const ownPrompts = new Set();
  questions.forEach((question, index) => {
    const label = `${code} Q${index + 1}`;
    for (const field of ["question", "answer", "summary", "hint", "tier", "tierLabel"]) {
      check(String(question?.[field] || "").trim(), `${label}: missing ${field}`);
    }
    check(!forbiddenGeneric.test(question.question), `${label}: generic/template prompt`);
    check(!unsafeMarkers.test(question.question), `${label}: TTS/print-unsafe marker`);
    check(!/_{3,}|…|\.\.\./.test(`${question.question} ${question.hint}`), `${label}: question or hint contains a silent blank or truncated marker`);
    check(!/\|/.test([question.question, question.answer, question.hint, question.template].filter(Boolean).join(" ")), `${label}: essential grouping relies on a potentially silent pipe separator`);
    const visibleParts = [question.question, question.template, question.visual, ...(question.answers || []), ...(question.matchLeft || []), ...(question.matchRight || [])].filter(Boolean).map(String);
    check(!visibleParts.some((part) => /\/(?:[a-z]|sh|ch|th)\//i.test(part)), `${label}: raw phoneme notation is not TTS-safe`);
    check(!(question.answers || []).some((answer) => /^[.!?,:;'"–—-]+$/.test(String(answer).trim())), `${label}: punctuation-only choice needs a spoken description`);
    if (/^AC9EFLY(?:08|09|10|11|12|13)$/.test(code)) {
      check(!(question.answers || []).some((answer) => /^[A-Za-z]$/.test(String(answer).trim())), `${label}: isolated letter choice needs an explicit written-name or cue-word description`);
    }
    check(question.alignment?.concept === spec?.title, `${label}: concept parity`);
    check(vocabulary.has(question.alignment?.vocabulary), `${label}: vocabulary parity`);
    check(String(question.alignment?.method || "").trim().length >= 12, `${label}: worked-method parity`);
    check(question.summary.includes(question.alignment?.method || "__missing__"), `${label}: summary omits aligned method`);
    check(oneSentence(question.summary), `${label}: summary must be one complete sentence`);
    check(question.summary.trim().split(/\s+/).length <= 40, `${label}: summary is too long for a concise Foundation answer key`);
    check(oneSentence(question.hint), `${label}: hint must be one complete actionable sentence`);
    check(!/^(?:try again|think carefully|read the question)/i.test(question.hint), `${label}: hint is not actionable enough`);
    check(!ownPrompts.has(question.question.trim().toLowerCase()), `${label}: duplicate prompt within code`);
    ownPrompts.add(question.question.trim().toLowerCase());
    const prior = allPrompts.get(question.question.trim().toLowerCase());
    check(!prior, `${label}: prompt duplicates ${prior}`);
    allPrompts.set(question.question.trim().toLowerCase(), label);
    if (question.type === "single") {
      check(Array.isArray(question.answers) && question.answers.length >= 3 && question.answers.length <= 4, `${label}: multiple-choice options`);
      if (question.audio_answers != null) {
        check(Array.isArray(question.audio_answers) && question.audio_answers.length === question.answers.length, `${label}: spoken option labels must align one-to-one with visible choices`);
        check(question.audio_answers.every((answer) => String(answer || "").trim().length >= 5), `${label}: spoken option labels must be descriptive`);
        check(new Set(question.audio_answers.map((answer) => String(answer).trim().toLowerCase())).size === question.audio_answers.length, `${label}: spoken option labels must be distinct`);
      }
      let matches = (question.answers || []).map(normaliseAnswer).reduce((indexes, answer, answerIndex) => answer === normaliseAnswer(question.answer) ? [...indexes, answerIndex] : indexes, []);
      if (!matches.length) {
        matches = (question.answers || []).map(softNormaliseAnswer).reduce((indexes, answer, answerIndex) => answer === softNormaliseAnswer(question.answer) ? [...indexes, answerIndex] : indexes, []);
      }
      check(matches.length === 1, `${label}: answer must occur exactly once in the visible choices`);
      check(new Set((question.answers || []).map(normaliseAnswer)).size === question.answers.length, `${label}: choices must be unique`);
      if (matches.length === 1) {
        const key = question.answers.length;
        const positions = correctPositions.get(key) || [];
        positions[matches[0]] = (positions[matches[0]] || 0) + 1;
        correctPositions.set(key, positions);
      }
    }
    if (question.type === "fill-blank") check(String(question.template || "").includes("{{blank}}"), `${label}: fill-blank template`);
    if (question.type === "match") check((question.matchLeft || []).length >= 2 && question.matchLeft.length === (question.matchRight || []).length, `${label}: match columns`);
    if (question.visual) check(String(question.visualAlt || "").trim().length >= 12, `${label}: visual requires descriptive alt text`);
  });

  const titleKey = `${unit.model_title}|${unit.apply_title}`.toLowerCase();
  const priorTitle = allTitles.get(titleKey);
  check(!priorTitle, `${code}: teaching model titles duplicate ${priorTitle}`);
  allTitles.set(titleKey, code);
  if (code !== "AC9EFLA01") {
    for (const [kind, html] of [["model", unit.model_html], ["application", unit.apply_html]]) {
      const key = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
      const priorModel = allModels.get(key);
      check(!priorModel, `${code}: ${kind} duplicates ${priorModel}`);
      allModels.set(key, `${code} ${kind}`);
    }
  }

  const topicRoute = `foundation/english/${unit.slug}/index.html`;
  const parentRoute = `quiz/grade-k/english/${code.toLowerCase()}/worksheet/index.html`;
  check(exists(topicRoute), `${code}: topic route missing`);
  check(exists(parentRoute), `${code}: parent worksheet route missing`);
  const topicHtml = exists(topicRoute) ? read(topicRoute) : "";
  for (const marker of [
    "foundation-english-topic-module-la-v2.js",
    "foundation-english-topic-module-le-ly1-v2.js",
    "foundation-english-topic-module-ly2-v2.js",
    "foundation-english-topic-module-core-v2.js",
    "foundation-english-classroom-v2.js",
    "foundation-canonical-v1.1.js"
  ]) check(topicHtml.includes(marker), `${code}: topic route missing ${marker}`);
  for (const link of [spec?.resourceLinks?.practice, spec?.resourceLinks?.test]) {
    const file = String(link || "").replace(/^\//, "").replace(/\/$/, "/index.html");
    check(Boolean(file) && exists(file), `${code}: broken resource ${link}`);
  }

  for (const sheetNumber of [1, 2]) {
    const childRoute = `quiz/grade-k/english/${code.toLowerCase()}/worksheet/topic-practice-${sheetNumber}/index.html`;
    check(exists(childRoute), `${code}: missing Topic Practice ${sheetNumber} route`);
    if (!exists(childRoute)) continue;
    const html = read(childRoute);
    const canonicalUrl = `${siteOriginPlaceholder(code, sheetNumber)}`;
    check(html.includes(`<h1 id="worksheetHeroTitle">Topic Practice ${sheetNumber}</h1>`), `${code}/sheet${sheetNumber}: exact visible title`);
    check((html.match(/class="worksheet-sheet-tabs"/g) || []).length === 1, `${code}/sheet${sheetNumber}: exactly one static switcher`);
    check(html.includes(`/icons/skillrhub-mark.svg`) && html.includes(`alt="SkillrHub logo"`), `${code}/sheet${sheetNumber}: actual accessible logo`);
    check(html.includes(`foundation-authored-worksheet.css?v=${version}`), `${code}/sheet${sheetNumber}: current worksheet CSS`);
    check(html.includes(`foundation-english-worksheet-page.js?v=${version}`), `${code}/sheet${sheetNumber}: current page loader`);
    check(html.includes(`foundation-english-topic-module-balance-v2.js?v=${version}`), `${code}/sheet${sheetNumber}: balanced answer-position transformer`);
    check(html.includes(canonicalUrl), `${code}/sheet${sheetNumber}: stable canonical`);
    check(html.includes("google-adsense-account") && html.includes("googletagmanager.com") && html.includes("pagead2.googlesyndication.com"), `${code}/sheet${sheetNumber}: latest-main SEO/analytics preserved`);
    check(!/QA complete/i.test(html), `${code}/sheet${sheetNumber}: QA badge text must not ship`);
  }
}

for (const [optionCount, positions] of correctPositions) {
  const filled = Array.from({ length: optionCount }, (_, index) => positions[index] || 0);
  check(Math.max(...filled) - Math.min(...filled) <= 1, `${optionCount}-choice correct positions are not globally balanced: ${filled.join("/")}`);
  check(filled.every((count) => count > 0), `${optionCount}-choice correct positions do not use every available column`);
}

function siteOriginPlaceholder(code, sheetNumber) {
  return `https://skillrhub.com/quiz/grade-k/english/${code.toLowerCase()}/worksheet/topic-practice-${sheetNumber}/`;
}

const slideHost = read("worksheets/foundation/english/teacher-slides/live.html");
for (const marker of ["foundation-english-topic-module-la-v2.js", "foundation-english-topic-module-le-ly1-v2.js", "foundation-english-topic-module-ly2-v2.js", "foundation-english-topic-module-core-v2.js", "foundation-english-classroom-v2.js"]) {
  check(slideHost.includes(marker), `Teacher-slide host missing ${marker}`);
}
const renderer = read("quiz/assets/foundation-maths-authored-worksheet.js");
for (const marker of ["isFoundationEnglishSplit", "SkillrFoundationTopicPracticeRender", "Topic Practice 1", "Topic Practice 2", "Preview answer key", "/icons/skillrhub-mark.svg"]) {
  check(renderer.includes(marker), `Shared topic-practice renderer missing ${marker}`);
}
check(renderer.includes('role="img"') && renderer.includes("question.visualAlt || question.visual"), "Shared renderer must expose accessible text-diagram alt descriptions");
check(renderer.includes('aria-label="blank"'), "Shared renderer must expose fill-blank answer positions to assistive technology");
check(renderer.includes("question.audio_answers?.[index]") && renderer.includes('class="worksheet-sr-only"') && renderer.includes("Option ${letter}. ${esc(audio)}"), "Shared renderer must use explicit visually hidden spoken labels for spelling-sensitive choices");
const worksheetCss = read("quiz/assets/foundation-authored-worksheet.css");
check(/\.worksheet-sr-only\s*\{[^}]*position:\s*absolute\s*!important[^}]*width:\s*1px\s*!important[^}]*overflow:\s*hidden\s*!important[^}]*clip:/s.test(worksheetCss), "Spoken-choice text must be visually hidden on screen and in print");
check(/subject\s*===\s*["']english["'][\s\S]{0,100}\/\^AC9EF\//.test(renderer), "Renderer must explicitly scope English split behavior");
check(!/\.worksheet-options[^\{]*\{[^}]*nowrap/i.test(read("quiz/assets/foundation-authored-worksheet.css")), "Choices must not force nowrap");
const pageLoader = read("assets/foundation-english-worksheet-page.js");
check(pageLoader.includes("topic-practice-[12]"), "English page loader must recognise both child routes");
check(pageLoader.includes("forceLoadScript") && pageLoader.includes(`foundation-maths-authored-worksheet.js?v=${version}`), "English page loader must replace a stale shared renderer");
const compatibilityLoader = read("assets/foundation-english-topic-practice-compat.js");
check(compatibilityLoader.includes("SkillrFoundationEnglishWorksheetPageInit"), "Compatibility loader must invoke the current page initializer");
check(compatibilityLoader.includes(`foundation-english-worksheet-page.js?v=${version}`), "Compatibility loader must force the current page-loader path");
const pwa = read("pwa-register.js");
check(pwa.includes(`foundation-english-worksheet-page.js?v=${version}`), "PWA must reference the current English worksheet loader");
check(pwa.includes(`foundation-english-topic-practice-compat.js?v=${version}`), "PWA must reference the English cached-route compatibility loader");
check(pwa.includes("worksheet(?:\\/topic-practice-[12])?"), "PWA must match English parent and child worksheet routes");
for (const marker of ["foundationEnglishTopicModules", "foundationEnglishWorksheetModules"]) check(pwa.includes(marker), `PWA missing ${marker}`);
check(pwa.includes(`foundation-english-classroom-v2.js?v=${version}`), "PWA must load the English-only classroom core-slide enhancer");
check(pwa.includes(`foundation-english-topic-module-balance-v2.js?v=${version}`), "PWA must load the balanced worksheet choices transformer");
const classroomEnhancer = read("assets/foundation-english-classroom-v2.js");
for (const marker of ["Learning Intention & Success Criteria", "Concept Refresher & Visual Clues", "Worked Example (Guided Instruction)", "60-second Quick Check / Turn and Talk", "Success criteria", "teacherSaysOrAsks", "workedExample", "Core slide", "Optional extension"]) {
  check(classroomEnhancer.includes(marker), `English classroom renderer missing ${marker}`);
}
const coreEnhancer = read("assets/foundation-english-topic-module-core-v2.js");
check(coreEnhancer.includes("canonical.buildCollection =") && !/const\s+specs\s*=\s*canonical\.buildCollection\(data/.test(coreEnhancer), "Core-role enhancer must decorate each live canonical build instead of building a stale collection at load time");
check(coreEnhancer.includes("elaboration.studentDoes = learnerAction(rich)"), "Core-role enhancer must provide learner-facing elaboration actions");

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.textContent = "";
    this.innerHTML = "";
    this.href = "";
    this.className = "";
    this.type = "";
    this.disabled = false;
    this.dataset = {};
    this.insertedHtml = [];
    this.children = [];
    this.listeners = {};
  }
  addEventListener(name, listener) { this.listeners[name] = listener; }
  insertAdjacentElement(_position, element) { this.children.push(element); return element; }
  insertAdjacentHTML(_position, html) { this.insertedHtml.push(String(html)); }
  appendChild(element) { this.children.push(element); return element; }
  remove() {}
  click() {}
}

function executeEnglishSheet(sheetNumber) {
  const code = "AC9EFLY05";
  const elements = new Map(["worksheetRoot", "worksheetHeroTitle", "worksheetEyebrow", "backToTopic", "openPractice", "previewPdfButton"].map((id) => [id, new FakeElement(id)]));
  const meta = new FakeElement("worksheetMeta");
  const description = new FakeElement("description");
  const printTip = new FakeElement("printTip");
  const hero = new FakeElement("worksheetHero");
  hero.querySelector = (selector) => selector === ".worksheet-sheet-tabs" ? new FakeElement("staticSwitcher") : null;
  const created = [];
  const document = {
    title: "", body: new FakeElement("body"), head: new FakeElement("head"), documentElement: new FakeElement("html"),
    getElementById(id) { return elements.get(id) || null; },
    querySelector(selector) {
      if (selector === 'meta[name="description"]') return description;
      if (selector === ".worksheet-meta") return meta;
      if (selector === ".worksheet-hero") return hero;
      if (selector === ".worksheet-sheet-tabs") return new FakeElement("staticSwitcher");
      if (selector === 'script[data-skillr-legacy-authored-worksheet="true"]') return null;
      return null;
    },
    querySelectorAll(selector) { return selector === ".worksheet-print-tip" ? [printTip] : []; },
    createElement() { const element = new FakeElement(); created.push(element); return element; },
    addEventListener() {}
  };
  const questions = Array.from({ length: 9 }, (_unused, index) => ({
    type: "single",
    question: `PROMPT_${index + 1}`,
    answers: [`A_${index + 1}`, `B_${index + 1}`, `C_${index + 1}`],
    ...(index === 0 ? { audio_answers: [`letters a, ${index + 1}`, `letters b, ${index + 1}`, `letters c, ${index + 1}`] } : {}),
    answer: `ANSWER_${index + 1}`,
    summary: `SUMMARY_${index + 1}.`,
    hint: `HINT_${index + 1}.`,
    visual: index === 0 ? "EVIDENCE_DIAGRAM" : "",
    visualAlt: index === 0 ? "A descriptive evidence diagram for the first question." : "",
    tier: index < 3 ? "warm-up" : index < 7 ? "core" : "challenge",
    tierLabel: index < 3 ? "Warm-Up" : index < 7 ? "Core" : "Challenge"
  }));
  const location = { pathname: `/quiz/grade-k/english/${code.toLowerCase()}/worksheet/topic-practice-${sheetNumber}/`, search: "" };
  const unit = { title: "Comprehension strategies", subject: "Foundation English", topicUrl: "/foundation/english/sentinel/", questions };
  const localWindow = { location, SkillrFoundationEnglishWorksheetData: { [code]: unit } };
  const runtime = vm.createContext({ window: localWindow, document, location, URL, URLSearchParams, console, setTimeout: () => 0, clearTimeout() {} });
  try {
    new vm.Script(renderer, { filename: "quiz/assets/foundation-maths-authored-worksheet.js" }).runInContext(runtime);
  } catch (error) {
    errors.push(`English sheet ${sheetNumber}: renderer execution failed: ${error.message}`);
  }
  const generated = [elements.get("worksheetRoot")?.innerHTML, ...created.flatMap((element) => [element.innerHTML, ...element.insertedHtml])].join("\n");
  return { code, elements, generated, meta, printTip };
}

for (const sheetNumber of [1, 2]) {
  const runtime = executeEnglishSheet(sheetNumber);
  const expected = sheetNumber === 1 ? [1, 2, 3, 4, 5] : [6, 7, 8, 9];
  const excluded = sheetNumber === 1 ? [6, 7, 8, 9] : [1, 2, 3, 4, 5];
  check(runtime.elements.get("worksheetHeroTitle")?.textContent === `Topic Practice ${sheetNumber}`, `English sheet ${sheetNumber}: exact runtime h1`);
  for (const number of expected) {
    for (const prefix of ["PROMPT", "ANSWER", "SUMMARY", "HINT"]) check(runtime.generated.includes(`${prefix}_${number}`), `English sheet ${sheetNumber}: missing ${prefix}_${number}`);
  }
  for (const number of excluded) {
    for (const prefix of ["PROMPT", "ANSWER", "SUMMARY", "HINT"]) check(!runtime.generated.includes(`${prefix}_${number}`), `English sheet ${sheetNumber}: off-sheet ${prefix}_${number} leaked`);
  }
  check(runtime.generated.includes('role="img" aria-label="A descriptive evidence diagram for the first question."') || sheetNumber === 2, `English sheet ${sheetNumber}: accessible visual runtime`);
  if (sheetNumber === 1) check(runtime.generated.includes('<span class="worksheet-sr-only">Option A. letters a, 1</span>') && runtime.generated.includes('<span aria-hidden="true">A_1</span>'), "English sheet 1: rendered spelling choice must expose an sr-only spoken label and hide its visual spelling from assistive technology");
  check(runtime.elements.get("backToTopic")?.href === "/foundation/english/sentinel/", `English sheet ${sheetNumber}: topic link runtime`);
  check(runtime.elements.get("openPractice")?.href === `/quiz/grade-k/english/${runtime.code.toLowerCase()}/practice/`, `English sheet ${sheetNumber}: Practice link runtime`);
}

function executeClassroomEnhancer() {
  const code = "AC9EFLE01";
  const spec = {
    code, year: "Foundation", subject: "English",
    learningIntention: "I can share an idea about a story.",
    successCriteria: [
      "I can name one story event.",
      "I can share my response.",
      "I can point to a story clue.",
      "I can listen to another response."
    ],
    masteryItems: [
      { type: "formative", prompt: "Which event is shown?", expectedAnswer: "The boot is missing in the rain." },
      { type: "mastery", prompt: "Which clue supports the worried response?", expectedAnswer: "The rain and missing boot support the worried response." },
      { type: "mastery", prompt: "How could you share the response?", expectedAnswer: "You could speak, draw or write the response." }
    ],
    elaborations: [{
      id: "E1",
      teacherSaysOrAsks: "Which exact story clue supports your response?",
      workedExample: "The rain and missing boot support the reader's worried response."
    }],
    slides: [
      { sequenceRole: "core", coreRole: "learning-intention", display: { type: "intro" } },
      { sequenceRole: "core", coreRole: "concept-refresher", display: { type: "model" } },
      { sequenceRole: "core", coreRole: "guided-example", display: { type: "application" } },
      { sequenceRole: "optional-extension", display: { type: "elaboration" }, elaborationIds: ["E1"] },
      { sequenceRole: "core", coreRole: "quick-check", display: { type: "mastery" } }
    ]
  };
  const makeText = (value = "") => ({ textContent: value });
  const slideElements = spec.slides.map((_slide, index) => {
    const heading = makeText(`Original ${index + 1}`);
    const badge = makeText("Free Teacher Resource.");
    const meaning = makeText("Original meaning");
    const prompt = makeText("Original prompt");
    const answer = makeText("Original answer");
    return {
      dataset: {}, heading, badge, meaning, prompt, answer,
      querySelector(selector) {
        if (selector.includes(".fcr-slide-head h1")) return heading;
        if (selector.includes(".fcr-slide-head .fcr-free")) return badge;
        if (selector === ".fcr-meaning,.a01-pattern__meaning,.v11-slide-card" || selector.includes(".fcr-meaning span:last-child")) return meaning;
        if (selector.includes(".fcr-ask strong")) return prompt;
        if (selector.includes(".fcr-answer-text")) return answer;
        return null;
      }
    };
  });
  const elaborationCard = {
    prompt: makeText("Generic topic prompt"), answer: makeText("Generic topic answer"),
    querySelector(selector) {
      if (selector === ".fcr-check>strong") return this.prompt;
      if (selector === ".fcr-answer__body") return this.answer;
      return null;
    }
  };
  const select = { options: spec.slides.map((_slide, index) => makeText(`${index + 1}. Original ${index + 1}`)) };
  const html = { dataset: {} };
  const head = { children: [], appendChild(element) { this.children.push(element); } };
  const localDocument = {
    documentElement: html, head,
    createElement() { return { id: "", textContent: "" }; },
    querySelectorAll(selector) {
      if (selector === "[data-fcr-slide],[data-slide-index]") return slideElements;
      if (selector === ".fcr-elaboration-card") return [elaborationCard];
      return [];
    },
    querySelector(selector) {
      if (selector === "#fcr-slide-select,#a01-slide-select,#v11-slide-select") return select;
      if (selector === "#foundation-english-classroom-v2-css") return head.children.find((item) => item.id === "foundation-english-classroom-v2-css") || null;
      return null;
    }
  };
  const localWindow = { SkillrFoundationV11Renderer: { renderSlides() { return true; }, renderTopic() { return true; } } };
  const location = { search: `?code=${code}`, pathname: "/worksheets/foundation/english/teacher-slides/live.html" };
  const runtime = vm.createContext({ window: localWindow, document: localDocument, location, URLSearchParams });
  new vm.Script(classroomEnhancer, { filename: "assets/foundation-english-classroom-v2.js" }).runInContext(runtime);
  localWindow.SkillrFoundationEnglishClassroomV2.decorate({ data: { [code]: { canonical: spec } } });
  localWindow.SkillrFoundationEnglishClassroomV2.decorateTopic({ data: { [code]: { canonical: spec } } });
  return { slides: slideElements, select, html, elaborationCard, spec };
}

const classroomRuntime = executeClassroomEnhancer();
check(classroomRuntime.slides[0].heading.textContent === "Learning Intention & Success Criteria", "Rendered classroom core slide 1 role");
check(classroomRuntime.slides[0].meaning.innerHTML.includes("We are learning to share an idea about a story") && classroomRuntime.spec.successCriteria.slice(0, 4).every((item) => classroomRuntime.slides[0].meaning.innerHTML.includes(item)), "Rendered classroom core slide 1 must visibly show a We are learning to intention and I can success criteria");
check(classroomRuntime.slides[1].heading.textContent === "Concept Refresher & Visual Clues", "Rendered classroom core slide 2 role");
check(classroomRuntime.slides[2].heading.textContent === "Worked Example (Guided Instruction)", "Rendered classroom core slide 3 role");
check(classroomRuntime.slides[4].heading.textContent === "60-second Quick Check / Turn and Talk", "Rendered classroom core slide 4 role");
check(/60 seconds/.test(classroomRuntime.slides[4].meaning.textContent), "Rendered classroom quick check must visibly give 60-second partner guidance");
const classroomQuick = classroomRuntime.spec.masteryItems.find((item) => item.type === "mastery");
check(classroomRuntime.slides[4].prompt.textContent === classroomQuick.prompt && classroomRuntime.slides[4].answer.textContent === classroomQuick.expectedAnswer, "Rendered classroom quick check must pair one visible prompt with its concealed matching answer");
check(classroomRuntime.slides[3].prompt.textContent === classroomRuntime.spec.elaborations[0].teacherSaysOrAsks && classroomRuntime.slides[3].answer.textContent === classroomRuntime.spec.elaborations[0].workedExample, "Rendered optional elaboration slide must use its authored prompt and answer");
check(classroomRuntime.elaborationCard.prompt.textContent === classroomRuntime.spec.elaborations[0].teacherSaysOrAsks && classroomRuntime.elaborationCard.answer.textContent === classroomRuntime.spec.elaborations[0].workedExample, "Rendered topic elaboration must use its authored prompt and answer");
check(classroomRuntime.select.options.filter((option) => /^Core /.test(option.textContent)).length === 4, "Rendered classroom deck must identify exactly four core slides");
check(classroomRuntime.select.options.filter((option) => /^Optional /.test(option.textContent)).length === 1, "Rendered classroom deck must retain optional extensions");

async function executeCachedPageLoader() {
  const code = "AC9EFLY05";
  let staleCalls = 0;
  let currentCalls = 0;
  let currentReloads = 0;
  const existingScripts = [
    "foundation-english-topic-module-la-data-v2.js",
    "foundation-english-topic-module-le-ly1-data-v2.js",
    "foundation-english-topic-module-ly2-data-v2.js",
    "foundation-english-topic-module-balance-v2.js"
  ].map((name) => ({ src: `http://local/quiz/assets/${name}?stale=1` }));
  const localDocument = {
    scripts: existingScripts,
    styleSheets: [{ href: "http://local/quiz/assets/foundation-authored-worksheet.css?current=1" }],
    title: "",
    body: { innerHTML: "" },
    head: {
      appendChild(element) {
        if (String(element.src || "").includes("foundation-maths-authored-worksheet.js")) {
          currentReloads += 1;
          localWindow.SkillrFoundationTopicPracticeRender = () => { currentCalls += 1; };
          localWindow.SkillrFoundationTopicPracticeRender();
          element.onload?.();
        } else if (String(element.src || "").includes("cdnjs.cloudflare.com")) {
          element.onerror?.(new Error("offline sentinel"));
        } else {
          element.onload?.();
        }
        return element;
      }
    },
    querySelector() { return null; },
    createElement() { return { src: "", async: false, onload: null, onerror: null }; }
  };
  const location = { pathname: `/quiz/grade-k/english/${code.toLowerCase()}/worksheet/topic-practice-1/`, search: "" };
  const localWindow = {
    location,
    SkillrFoundationEnglishData: { [code]: { slug: "sentinel-topic" } },
    SkillrFoundationEnglishWorksheetData: { [code]: { title: "Sentinel", questions: Array.from({ length: 9 }, () => ({})) } },
    SkillrFoundationTopicPracticeRender() { staleCalls += 1; }
  };
  const runtime = vm.createContext({ window: localWindow, document: localDocument, location, console, setTimeout, clearTimeout });
  new vm.Script(pageLoader, { filename: "assets/foundation-english-worksheet-page.js" }).runInContext(runtime);
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
  return { staleCalls, currentCalls, currentReloads };
}

const cachedRuntime = await executeCachedPageLoader();
check(cachedRuntime.staleCalls === 0, "Cached English worksheet must never invoke a stale renderer global");
check(cachedRuntime.currentReloads === 1 && cachedRuntime.currentCalls === 1, "Cached English worksheet must force-load and execute the release-pinned renderer exactly once");

console.log(`Foundation English topic modules: ${codes.length - new Set(errors.map((error) => error.split(":")[0])).size}/${codes.length} passing`);
console.log(`Questions: ${totalQuestions}/261 (87 Warm-Up, 116 Core, 58 Challenge)`);
console.log(`Slides preserved: ${totalSlides} (${codes.length * 4} core)`);
console.log(`Routes: ${codes.length} topics, ${codes.length} parents, ${codes.length * 2} Topic Practice children`);
if (errors.length) {
  errors.forEach((error) => console.error(`FAIL ${error}`));
  process.exit(1);
}
console.log("PASS: curriculum identity, vocabulary, two worked examples, misconceptions, core slide roles, preserved extensions, 3/4/2 worksheet alignment, per-question answers/summaries/hints, unique prompts, stable two-sheet routes, accessibility, branding, safe wrapping, links and cached-loader wiring.");
