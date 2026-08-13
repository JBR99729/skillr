import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const failures = [];
const assert = (ok, message) => { if (!ok) failures.push(message); };
const filePath = file => path.join(root, file);
const exists = file => Boolean(file) && fs.existsSync(filePath(file));
const read = file => fs.readFileSync(filePath(file), "utf8");
const safeRead = file => exists(file) ? read(file) : "";
const compact = value => String(value ?? "").replace(/\s+/g, "");
const routeFile = href => {
  const route = String(href || "").split(/[?#]/, 1)[0].replace(/^\//, "");
  return route.endsWith("/") ? `${route}index.html` : route;
};
const htmlEscape = value => String(value ?? "").replace(/[&<>\"]/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
}[char]));
const titleFromHtml = html => (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
const headingFromHtml = html => (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "")
  .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const sentenceEnd = value => /[.!?]$/.test(String(value || "").trim());
const contentTokens = value => new Set(String(value || "").toLowerCase()
  .replace(/[^a-z0-9π√°%$]+/g, " ")
  .split(/\s+/)
  .filter(token => token.length > 1 && !new Set([
    "a", "an", "and", "are", "as", "at", "be", "because", "by", "for", "from", "has", "have",
    "in", "into", "is", "it", "its", "of", "on", "or", "so", "than", "that", "the", "their",
    "them", "then", "this", "to", "use", "was", "were", "when", "which", "while", "with", "without"
  ]).has(token)));
const meaningfullyOverlaps = (source, target) => {
  const sourceTokens = contentTokens(source);
  const targetTokens = contentTokens(target);
  const shared = [...sourceTokens].filter(token => targetTokens.has(token)).length;
  return shared >= 5 && shared / Math.max(1, sourceTokens.size) >= 0.4;
};
const actionableHint = /^(?:add|align|apply|arrange|ask|begin|calculate|change|check|choose|classify|compare|consider|convert|count|create|decide|define|describe|distinguish|distribute|divide|do\s+not|double|draw|evaluate|express|factor|find|fix|give|group|halve|hold|identify|imagine|inspect|keep|label|line|list|locate|look|map|mark|match|mention|model|move|multiply|order|pair|picture|place|plot|prime-factorise|put|read|rearrange|reconstruct|record|rename|replace|represent|rewrite|round|select|separate|set|simplify|solve|specify|start|state|substitute|subtract|test|think|trace|translate|undo|update|use|write)\b/i;
const actionableFollowup = /\b(?:so|then|first|before)\s+(?:calculate|check|compare|convert|divide|find|identify|multiply|plot|set|solve|substitute|subtract|test|use|write)\b/i;
const stable = value => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  }
  return value;
};
const sameData = (a, b) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));
const expectedTierOrder = [1, 1, 1, 2, 2, 2, 2, 3, 3];
const expectedSheets = [
  { slug: "topic-practice-1", title: "Topic Practice 1", questionIndices: [0, 1, 2, 3, 4] },
  { slug: "topic-practice-2", title: "Topic Practice 2", questionIndices: [5, 6, 7, 8] }
];
const publicBrand = /skillr\s*hub|skillrhub|skillr\s+education|skillrhub\.com/i;
const qaBadge = /\bQA\s*(?:complete|passed)\b|\bquality\s+assured\b/i;

const registryFile = "data/curriculum-units.json";
const moduleFile = "assets/year7-maths-topic-modules-v2.js";
const exportFile = "data/topic-modules/year7/mathematics.json";
const practiceRendererFile = "assets/topic-module-v2-practice-sheet.js";
const practiceCssFile = "assets/topic-module-v2-practice-sheet.css";
const topicRendererFile = "assets/topic-module-v2-topic.js";
const slideRendererFile = "assets/topic-module-v2-slides.js";
const year7RouterFile = "assets/year7-router.js";
const displayOnlyFile = "assets/display-only.js";
const slideClustersFile = "assets/teacher-slide-clusters.js";

const registry = JSON.parse(read(registryFile)).units
  .filter(unit => unit.yearNumber === 7 && unit.subject === "Mathematics");
const registryCodes = registry.map(unit => unit.code);
const registryCodeSet = new Set(registryCodes);
assert(registry.length === 30, `Expected 30 current codes, found ${registry.length}`);
assert(registryCodeSet.size === 30, "Duplicate registry codes");

const modules = new Map();
try {
  const context = { window: { SkillrTopicModulesV2: { register: item => modules.set(item.identity.code, item) } } };
  vm.runInNewContext(read(moduleFile), context, { filename: moduleFile });
} catch (error) {
  failures.push(`Could not load ${moduleFile}: ${error.message}`);
}
assert(modules.size === 30, `Expected 30 v2 modules, found ${modules.size}`);
assert(registryCodes.every(code => modules.has(code)), "Registry/module code parity failed (missing registry code)");
assert([...modules.keys()].every(code => registryCodeSet.has(code)), "Registry/module code parity failed (unexpected module code)");

const required = [
  "assets/topic-module-v2.js",
  "assets/topic-module-v2-topic.js",
  "assets/topic-module-v2-visuals.js",
  "assets/topic-module-v2-slides.js",
  "assets/topic-module-v2-practice-sheet.js",
  "assets/topic-module-v2.css",
  "assets/topic-module-v2-slides.css",
  "assets/topic-module-v2-practice-sheet.css",
  year7RouterFile,
  displayOnlyFile,
  slideClustersFile,
  "icons/skillrhub-mark.svg",
  "scripts/build_year7_maths_topic_modules_v2.mjs",
  exportFile
];
required.forEach(file => assert(exists(file), `Missing ${file}`));

const globalIds = new Set();
const globalPrompts = new Map();
const deepDiveSignatures = new Map();
const visualAlts = new Map();
const topicPracticeRoutes = new Set();
const worksheetAliases = new Set();
const genericStem = /write and explain the worked example|identify the quantities|read the new situation|carry out the required|state the central relationship|describe an independent check|code-specific worked example|complete extension response|create an original example|compare two possible strategies/i;

function validateSheetDeclarations(module, tag, prefix = "") {
  const sheets = module?.practiceSheet?.sheets;
  assert(Array.isArray(sheets) && sheets.length === 2, `${prefix}${tag}: exactly two practice-sheet declarations required`);
  if (!Array.isArray(sheets) || sheets.length !== 2) return;
  for (let index = 0; index < expectedSheets.length; index += 1) {
    const actual = sheets[index];
    const expected = expectedSheets[index];
    assert(actual?.slug === expected.slug, `${prefix}${tag}: sheet ${index + 1} slug must be ${expected.slug}`);
    assert(actual?.title === expected.title, `${prefix}${tag}: sheet ${index + 1} title must be ${expected.title}`);
    assert(sameData(actual?.questionIndices, expected.questionIndices), `${prefix}${tag}: sheet ${index + 1} must use canonical indices ${expected.questionIndices.join(",")}`);
  }
  const assigned = sheets.flatMap(sheet => Array.isArray(sheet.questionIndices) ? sheet.questionIndices : []);
  assert(assigned.length === 9, `${prefix}${tag}: two sheets must assign nine canonical questions`);
  assert(new Set(assigned).size === 9, `${prefix}${tag}: question duplicated across Topic Practice 1/2`);
  assert(sameData([...assigned].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8]), `${prefix}${tag}: sheet union must contain every question exactly once`);
}

function validateRouteShell(file, tag, visibleTitle, canonicalRoute) {
  assert(exists(file), `${tag}: missing route ${canonicalRoute}`);
  if (!exists(file)) return;
  const html = read(file);
  const title = titleFromHtml(html);
  assert(title.includes(tag) && title.includes(visibleTitle), `${tag}: ${canonicalRoute} does not have a full ${visibleTitle} document title`);
  assert(!/[.…]{3}|…/.test(title), `${tag}: ${canonicalRoute} has a truncated document title`);
  assert(html.includes("/assets/topic-module-v2-practice-sheet.css"), `${tag}: ${canonicalRoute} missing practice-sheet stylesheet`);
  assert(html.includes("/assets/topic-module-v2.js") && html.includes("/assets/year7-maths-topic-modules-v2.js"), `${tag}: ${canonicalRoute} missing v2 module data`);
  assert(html.includes("/assets/topic-module-v2-practice-sheet.js"), `${tag}: ${canonicalRoute} missing v2 practice renderer`);
  assert(html.includes("/manifest.webmanifest") && html.includes("/pwa-register.js"), `${tag}: ${canonicalRoute} lost PWA integration`);
  assert(html.includes(`https://skillrhub.com${canonicalRoute}`), `${tag}: ${canonicalRoute} missing its stable canonical URL`);
  assert(!qaBadge.test(html), `${tag}: ${canonicalRoute} exposes a QA-complete badge`);
}

for (const row of registry) {
  const module = modules.get(row.code);
  if (!module) continue;
  const tag = row.code;
  assert(module.schemaVersion === "2.0", `${tag}: schema version`);
  assert(module.identity?.code === tag, `${tag}: identity/code mismatch`);
  assert(module.identity?.year === 7 && module.identity?.subject === "Mathematics" && module.identity?.slug && module.identity?.description, `${tag}: identity incomplete`);
  assert(module.identity?.title?.length > 10 && !/(?:…|\.\.\.)$/.test(module.identity.title), `${tag}: truncated title`);

  assert(module.topic?.deepDive?.length >= 3 && module.topic.deepDive.every(paragraph => paragraph.length > 80), `${tag}: deep dive incomplete`);
  const signature = (module.topic?.deepDive || []).join(" ").toLowerCase();
  assert(!deepDiveSignatures.has(signature), `${tag}: duplicates deep dive from ${deepDiveSignatures.get(signature)}`);
  deepDiveSignatures.set(signature, tag);
  assert(module.topic?.vocabulary?.length >= 3 && module.topic.vocabulary.every(item => item.term && item.definition?.length > 15), `${tag}: vocabulary invalid`);
  assert(module.topic?.misconceptions?.length >= 2 && module.topic.misconceptions.length <= 3 && module.topic.misconceptions.every(item => item.idea && item.correction), `${tag}: misconceptions invalid`);
  assert(module.topic?.workedExamples?.length === 2 && module.topic.workedExamples.every(item => item.title && item.steps?.length >= 4 && item.answer && item.check), `${tag}: worked examples invalid`);
  assert(module.topic.workedExamples.every(item => !genericStem.test([item.title, ...item.steps, item.answer, item.check].join(" "))), `${tag}: generic worked example text`);
  assert(module.topic.workedExamples.every(item => /[0-9=<>π√°%$]|yes|no|class|view|sample|population|continuous|discrete/i.test(`${item.answer} ${item.check}`)), `${tag}: worked answer lacks determinate evidence`);

  const visuals = module.topic?.visuals || [];
  const visualIds = new Set(visuals.map(item => item.id));
  assert(visuals.length >= 2 && visualIds.size === visuals.length, `${tag}: visual IDs invalid`);
  assert(visuals.every(item => item.alt?.length > 60 && item.type && (item.type !== "legacyHtml" || item.html)), `${tag}: visual metadata incomplete`);
  for (const visual of visuals) {
    const normal = visual.alt.toLowerCase();
    assert(!visualAlts.has(normal), `${tag}: repeated visual alt from ${visualAlts.get(normal)}`);
    visualAlts.set(normal, tag);
  }

  assert(sameData(module.slides?.map(slide => slide.role), ["learning", "refresher", "guided", "quickCheck"]), `${tag}: exact four slide roles/order`);
  assert(module.slides?.every(slide => slide.title && slide.body?.length && slide.teacherNotes && slide.expectedResponse && slide.misconceptionResponse && slide.remediation), `${tag}: slide teacher layers`);
  assert(module.slides?.every(slide => (slide.visualIds || []).every(id => visualIds.has(id))), `${tag}: broken slide visual reference`);
  assert(module.slides?.[3]?.concealAnswer === true, `${tag}: Quick Check answer not concealed`);

  const questions = module.practiceSheet?.questions || [];
  assert(questions.length === 9, `${tag}: canonical question count must be nine`);
  assert(sameData(questions.map(question => question.tier), expectedTierOrder), `${tag}: tier order must be 1,1,1,2,2,2,2,3,3`);
  assert(new Set(questions.map(question => question.id)).size === 9 && new Set(questions.map(question => question.prompt?.toLowerCase())).size === 9, `${tag}: within-sheet duplicate`);
  assert(module.practiceSheet?.title && !/(?:…|\.\.\.)$/.test(module.practiceSheet.title), `${tag}: practice-sheet topic title is missing or truncated`);
  validateSheetDeclarations(module, tag);
  for (const question of questions) {
    assert(!globalIds.has(question.id), `${tag}: global duplicate ID ${question.id}`);
    globalIds.add(question.id);
    const prompt = question.prompt?.toLowerCase().replace(/\s+/g, " ");
    if (globalPrompts.has(prompt)) failures.push(`${tag}: prompt duplicates ${globalPrompts.get(prompt)}`);
    else globalPrompts.set(prompt, tag);
    assert(question.answer && question.summary && question.hint, `${question.id}: answer/summary/hint missing`);
    assert(!genericStem.test(`${question.prompt} ${question.answer}`), `${question.id}: generic or non-self-contained item`);
    assert(question.prompt?.length >= 8 && /[a-z0-9π√°%$]/i.test(question.answer), `${question.id}: prompt/answer too vague`);
    assert(sentenceEnd(question.summary) && sentenceEnd(question.hint), `${question.id}: summary/hint must be a complete sentence`);
    assert(actionableHint.test(question.hint) || actionableFollowup.test(question.hint), `${question.id}: hint is not actionable`);
    if (question.options !== undefined) {
      assert(Array.isArray(question.options) && question.options.length >= 2, `${question.id}: multiple-choice options must be a non-empty array`);
      assert(question.options?.every(option => String(option?.text ?? option).trim()), `${question.id}: blank multiple-choice option`);
    }
  }

  const vocabulary = module.topic.vocabulary.map(item => item.term.toLowerCase());
  const connected = [...module.topic.deepDive, ...module.slides.flatMap(slide => slide.body), ...questions.map(question => question.prompt)].join(" ").toLowerCase();
  assert(vocabulary.some(term => connected.includes(term)), `${tag}: guide-slide-sheet vocabulary parity`);
  const workedExampleText = [module.topic.workedExamples[0].title, ...module.topic.workedExamples[0].steps, module.topic.workedExamples[0].answer].join(" ");
  const guidedSlideText = [module.slides[2].title, ...module.slides[2].body, module.slides[2].expectedResponse].join(" ");
  assert(meaningfullyOverlaps(workedExampleText, guidedSlideText), `${tag}: guided slide/worked-example parity`);
  assert(module.slides[3].expectedResponse && module.slides[3].body[0] && !genericStem.test(module.slides[3].body[0]), `${tag}: Quick Check mismatch/generic`);
  assert(module.preservedContent?.length >= 4 && module.preservedContent.every(item => item.source && item.kind && item.destination && item.note), `${tag}: preservation mapping`);

  const lowerCode = tag.toLowerCase();
  const expectedLinks = {
    topic: row.url,
    slides: `/worksheets/year7/maths/teacher-slides/live.html?code=${tag}`,
    practiceSheet: `/quiz/year-7/math/${lowerCode}/worksheet/`,
    topicPractice1: `/quiz/year-7/math/${lowerCode}/topic-practice-1/`,
    topicPractice2: `/quiz/year-7/math/${lowerCode}/topic-practice-2/`,
    practice: `/quiz/year-7/math/${lowerCode}/practice/`,
    test: `/quiz/year-7/math/${lowerCode}/test/`,
    hub: "/year7/curriculum/maths/"
  };
  for (const [name, href] of Object.entries(expectedLinks)) {
    assert(module.links?.[name] === href, `${tag}: unstable ${name} link (expected ${href})`);
    assert(exists(routeFile(href)), `${tag}: broken ${name} link ${href}`);
  }
  if (typeof module.links?.topicPractice1 === "string") topicPracticeRoutes.add(module.links.topicPractice1);
  if (typeof module.links?.topicPractice2 === "string") topicPracticeRoutes.add(module.links.topicPractice2);
  if (typeof module.links?.practiceSheet === "string") worksheetAliases.add(module.links.practiceSheet);

  const topicFile = routeFile(row.url);
  const topicHtml = safeRead(topicFile);
  const topicTitle = titleFromHtml(topicHtml);
  const topicH1 = headingFromHtml(topicHtml);
  assert(topicHtml.includes("topic-module-v2-topic.js") && topicHtml.includes("access.js") && topicHtml.includes("report-issue.js") && topicHtml.includes("pwa-register.js"), `${tag}: topic integration/protected features`);
  assert(topicHtml.includes("topic-module-v2.css"), `${tag}: topic stylesheet integration`);
  assert(topicTitle.includes(tag) && topicTitle.toLowerCase().includes(row.description.toLowerCase()), `${tag}: topic document title is not the full curriculum description`);
  assert(topicH1.includes(tag) && topicH1.toLowerCase().includes(row.description.toLowerCase()), `${tag}: topic H1 is not the full curriculum description`);
  assert(!/(?:…|\.\.\.)/.test(topicTitle) && !/(?:…|\.\.\.)/.test(topicH1), `${tag}: topic title or heading is truncated`);
  assert(!qaBadge.test(topicHtml), `${tag}: topic page exposes a QA-complete badge`);

  validateRouteShell(routeFile(expectedLinks.topicPractice1), tag, "Topic Practice 1", expectedLinks.topicPractice1);
  validateRouteShell(routeFile(expectedLinks.topicPractice2), tag, "Topic Practice 2", expectedLinks.topicPractice2);
  validateRouteShell(routeFile(expectedLinks.practiceSheet), tag, "Topic Practice 1", expectedLinks.practiceSheet);

  const practiceHtml = safeRead(routeFile(module.links.practice));
  const testHtml = safeRead(routeFile(module.links.test));
  const upgradedPractice = practiceHtml.includes("production-question-ui.js");
  const upgradedTest = testHtml.includes("production-question-ui.js");
  assert(practiceHtml.includes("quiz/assets/script.js") && practiceHtml.includes("pwa-register.js"), `${tag}: Practice lost quiz/PWA features`);
  assert(/"maxQuestions":8/.test(practiceHtml), `${tag}: Practice attempt size changed`);
  if (upgradedPractice) assert(/"shuffleQuestions":true/.test(practiceHtml) && /"questionCycle":true/.test(practiceHtml), `${tag}: upgraded Practice rotation configuration changed`);
  else assert(/"shuffleQuestions":false/.test(practiceHtml) && /"questionCycle":false/.test(practiceHtml), `${tag}: legacy Practice configuration changed before its assessment-bank upgrade`);
  assert(testHtml.includes("quiz/assets/script.js") && testHtml.includes("pwa-register.js"), `${tag}: Test lost quiz/PWA features`);
  assert(new RegExp(`"maxQuestions":${upgradedTest ? 12 : 8}`).test(testHtml) && /"requireStudentName":true/.test(testHtml) && /"certificateOnPass":true/.test(testHtml), `${tag}: Test attempt/certificate configuration changed`);
}

assert(topicPracticeRoutes.size === 60, `Expected 60 distinct Topic Practice routes, found ${topicPracticeRoutes.size}`);
assert(worksheetAliases.size === 30, `Expected 30 distinct legacy worksheet aliases, found ${worksheetAliases.size}`);
assert(globalIds.size === 270, `Expected 270 globally unique canonical question IDs, found ${globalIds.size}`);
assert(globalPrompts.size === 270, `Expected 270 globally unique canonical prompts, found ${globalPrompts.size}`);

const practiceRenderer = safeRead(practiceRendererFile);
const rendererCompact = compact(practiceRenderer);
const legacyRouterSuppression = rendererCompact.indexOf('if(/\\/worksheet\\/?$/i.test(location.pathname))window.__skillrYear7RouterLoaded=true');
const practiceModuleLookup = rendererCompact.indexOf("constmatch=location.pathname.match");
assert(legacyRouterSuppression >= 0, "Practice renderer does not suppress the legacy Year 7 router on /worksheet/ aliases");
assert(legacyRouterSuppression >= 0 && practiceModuleLookup >= 0 && legacyRouterSuppression < practiceModuleLookup, "Legacy worksheet-router suppression must run before module lookup and rendering");
assert(rendererCompact.includes("sheetNumber===1?[0,1,2,3,4]:[5,6,7,8]"), "Practice renderer does not preserve the required original-index 5/4 partition");
assert(rendererCompact.includes("sheetIndices.map(index=>({question:allQuestions[index],index}))"), "Practice renderer does not retain each question's canonical index");
assert(rendererCompact.includes("constkey=questions.map"), "Practice answer key is not built from the selected sheet subset");
assert(!rendererCompact.includes("constkey=allQuestions.map"), "Practice answer key incorrectly includes all nine questions");
assert(practiceRenderer.includes("Topic Practice 1") && practiceRenderer.includes("Topic Practice 2"), "Practice renderer missing visible sheet titles/tabs");
assert(practiceRenderer.includes("tmv2-sheet-tab") && practiceRenderer.includes('aria-current="page"'), "Practice renderer missing navigable sheet tabs/current state");
assert(practiceRenderer.includes("window.print()") && practiceRenderer.includes("Print or save PDF"), "Practice renderer missing print action");
assert(practiceRenderer.includes("/icons/skillrhub-mark.svg") && practiceRenderer.includes("SkillrHub logo"), "Public printable renderer missing established logo/branding");
assert(practiceRenderer.includes("tmv2-options") && practiceRenderer.includes("optionRow"), "Practice renderer cannot display optional multiple-choice options");
assert(practiceRenderer.includes("module.links.topicPractice1") && practiceRenderer.includes("module.links.topicPractice2"), "Practice renderer does not use stable sheet links");
assert(!qaBadge.test(practiceRenderer), "Practice renderer exposes a QA-complete badge");

const year7Router = safeRead(year7RouterFile);
const routerGuard = year7Router.indexOf("if (window.__skillrYear7RouterLoaded) return;");
const routerLoadedWrite = year7Router.indexOf('window.__skillrYear7RouterLoaded = true;');
const routerRouteRead = year7Router.indexOf("const path = location.pathname;");
assert(routerGuard >= 0 && routerLoadedWrite > routerGuard && routerRouteRead > routerLoadedWrite, "Year 7 router does not honour the pre-render suppression flag before reading a route");
assert(year7Router.includes("(practice|test|worksheet)"), "Year 7 compatibility router no longer identifies worksheet aliases");
const displayOnly = safeRead(displayOnlyFile);
assert(displayOnly.includes('/assets/year7-router.js') && /quiz\\?\/year-7|quiz\/year-7/.test(displayOnly), "Display-only integration no longer loads the Year 7 router for legacy quiz routes");

let renderedPracticeViews = 0;
let renderedAliasViews = 0;
function validateRenderedSheet(module, pathname, sheetNumber, isAlias = false) {
  const tag = module.identity.code;
  const document = { title: "", body: { innerHTML: "" } };
  const context = {
    window: { SkillrTopicModulesV2: { get: code => code?.toUpperCase() === tag ? module : undefined } },
    document,
    location: { pathname, search: "" },
    URLSearchParams
  };
  try {
    vm.runInNewContext(practiceRenderer, context, { filename: `${practiceRendererFile}:${tag}:${sheetNumber}` });
  } catch (error) {
    failures.push(`${tag}: Topic Practice ${sheetNumber} renderer threw: ${error.message}`);
    return;
  }
  const html = document.body.innerHTML;
  const title = `Topic Practice ${sheetNumber}`;
  const indices = expectedSheets[sheetNumber - 1].questionIndices;
  const chosen = new Set(indices);
  const keyMarker = '<section class="tmv2-paper tmv2-answer-key">';
  const split = html.split(keyMarker);
  const questionHtml = split[0] || "";
  const answerHtml = split[1] || "";
  assert(document.title === `${tag} ${title} | SkillrHub`, `${tag}: rendered ${title} document title is incomplete`);
  assert(context.window.__skillrYear7RouterLoaded === (isAlias ? true : undefined), `${tag}: ${isAlias ? "legacy worksheet alias did not suppress" : `${title} incorrectly suppressed`} the Year 7 router`);
  assert(html.includes(`<h1>${title}</h1>`), `${tag}: rendered sheet missing visible title ${title}`);
  assert(html.includes(htmlEscape(module.practiceSheet.title)), `${tag}: rendered ${title} missing full topic title`);
  assert(html.includes(`/icons/skillrhub-mark.svg`) && html.includes(`alt="SkillrHub logo"`), `${tag}: rendered ${title} missing public logo`);
  assert(html.includes("Print or save PDF"), `${tag}: rendered ${title} missing print action`);
  assert(html.includes(`href="${htmlEscape(module.links.topicPractice1)}"`) && html.includes(`href="${htmlEscape(module.links.topicPractice2)}"`), `${tag}: rendered ${title} missing both sheet tabs`);
  assert(html.includes(`href="${htmlEscape(module.links[`topicPractice${sheetNumber}`])}" aria-current="page">${title}</a>`), `${tag}: rendered ${title} tab lacks current-page state`);
  assert(split.length === 2, `${tag}: rendered ${title} missing distinct answer-key section`);
  assert((questionHtml.match(/<article>/g) || []).length === indices.length, `${tag}: rendered ${title} does not contain its ${indices.length} questions only`);
  assert((answerHtml.match(/<article>/g) || []).length === indices.length, `${tag}: rendered ${title} answer key is not subset-only`);
  for (let index = 0; index < module.practiceSheet.questions.length; index += 1) {
    const question = module.practiceSheet.questions[index];
    const promptHeading = `<h3>${index + 1}. ${htmlEscape(question.prompt)}</h3>`;
    const answerHeading = `<h3>${index + 1}. ${htmlEscape(question.answer)}</h3>`;
    assert(questionHtml.includes(promptHeading) === chosen.has(index), `${tag}: ${title} question partition is wrong at canonical question ${index + 1}`);
    assert(answerHtml.includes(answerHeading) === chosen.has(index), `${tag}: ${title} answer-key partition is wrong at canonical question ${index + 1}`);
    if (chosen.has(index)) {
      assert(answerHtml.includes(`<strong>Summary:</strong> ${htmlEscape(question.summary)}`), `${tag}: ${title} missing summary for question ${index + 1}`);
      assert(answerHtml.includes(`<strong>Hint:</strong> ${htmlEscape(question.hint)}`), `${tag}: ${title} missing hint for question ${index + 1}`);
      if (Array.isArray(question.options)) {
        for (const option of question.options) {
          assert(questionHtml.includes(htmlEscape(option?.text ?? option)), `${tag}: ${title} missing a multiple-choice option for question ${index + 1}`);
        }
      }
    }
  }
  const chosenWithOptions = indices.filter(index => Array.isArray(module.practiceSheet.questions[index]?.options)).length;
  assert((questionHtml.match(/class="tmv2-options"/g) || []).length === chosenWithOptions, `${tag}: ${title} optional-choice row count mismatch`);
  if (isAlias) renderedAliasViews += 1;
  else renderedPracticeViews += 1;
}

if (practiceRenderer) {
  for (const module of modules.values()) {
    const base = `/quiz/year-7/math/${module.identity.code.toLowerCase()}`;
    validateRenderedSheet(module, `${base}/topic-practice-1/`, 1);
    validateRenderedSheet(module, `${base}/topic-practice-2/`, 2);
    validateRenderedSheet(module, `${base}/worksheet/`, 1, true);
  }
}
assert(renderedPracticeViews === 60, `Expected 60 validated Topic Practice views, rendered ${renderedPracticeViews}`);
assert(renderedAliasViews === 30, `Expected 30 validated legacy alias views, rendered ${renderedAliasViews}`);

const practiceCss = safeRead(practiceCssFile);
const cssCompact = compact(practiceCss);
const baseOptionsRule = cssCompact.match(/\.tmv2-options\{([^}]*)\}/)?.[1] || "";
assert(baseOptionsRule.includes("display:flex") && !baseOptionsRule.includes("flex-direction:column") && !baseOptionsRule.includes("flex-wrap:wrap"), "Wide-screen multiple-choice options are not a horizontal one-row flex layout");
assert(/@media\(max-width:(\d+)px\)\{[\s\S]*?\.tmv2-options\{[^}]*flex-wrap:wrap/.test(cssCompact), "Multiple-choice options do not wrap responsively on narrow screens");
assert(/@mediaprint\{[\s\S]*?\.tmv2-options\{[^}]*flex-wrap:nowrap/.test(cssCompact), "Print CSS does not preserve compact horizontal options");
assert(/\.tmv2-options>span\{[^}]*min-width:0[^}]*flex:1/.test(cssCompact), "Option cells are not compact, equal-width flex items");
const tierHeights = expectedSheets[0].questionIndices.slice(0, 3).map((_, index) => {
  const tier = index + 1;
  const match = cssCompact.match(new RegExp(`\\.tmv2-tier\\[data-tier=["']${tier}["']\\]\\.tmv2-lines\\{[^}]*height:([0-9.]+)(mm|cm|px|rem)`));
  if (!match) return null;
  const factors = { mm: 1, cm: 10, px: 0.264583, rem: 4.23333 };
  return Number(match[1]) * factors[match[2]];
});
assert(tierHeights.every(Number.isFinite), "Response-space CSS must use data-tier selectors for tiers 1, 2 and 3");
assert(tierHeights.every(Number.isFinite) && tierHeights[0] < tierHeights[1] && tierHeights[1] < tierHeights[2], "Response spaces must increase from Warm-Up to Core to Challenge");
assert(/\.tmv2-answer-key\{[^}]*break-before:page/.test(cssCompact) || /\.tmv2-answer-key\{[^}]*page-break-before:always/.test(cssCompact), "Answer key is not separated for printing");
const footerWrapRule = cssCompact.match(/\.tmv2-paper\.footer-nav\{([^}]*)\}/)?.[1] || "";
const footerLinkRule = cssCompact.match(/\.tmv2-paper\.footer-nava\{([^}]*)\}/)?.[1] || "";
assert(footerWrapRule.includes("display:flex") && footerWrapRule.includes("flex-wrap:wrap") && footerWrapRule.includes("max-width:100%"), "Injected worksheet footer navigation does not wrap within the mobile sheet width");
assert(footerLinkRule.includes("white-space:normal"), "Worksheet footer links cannot wrap on narrow screens");
assert(/@mediaprint\{[\s\S]*?\.tmv2-paper\.footer-nav,\.tmv2-paper\.skillr-footer-tools\{[^}]*display:none!important/.test(cssCompact), "Injected worksheet footer navigation/tools are not hidden in print output");

const topicRenderer = safeRead(topicRendererFile);
assert(topicRenderer.includes("module.links.topicPractice1") && topicRenderer.includes("module.links.topicPractice2"), "Topic renderer does not link both declared sheets");
assert(topicRenderer.includes(">Topic Practice 1<") && topicRenderer.includes(">Topic Practice 2<"), "Topic renderer is missing visible Topic Practice 1/2 labels");
assert(topicRenderer.includes("module.links.practice") && topicRenderer.includes("module.links.test"), "Topic renderer lost Practice/Test navigation");
assert(topicRenderer.includes("tmv2-retained-reference"), "Legacy content is not consolidated into the retained reference layer");
assert(topicRenderer.includes('document.title = `${code} ${module.identity.title} | Year 7 Maths`;'), "Topic renderer does not restore the canonical module identity after a router repaint");
assert(topicRenderer.includes("heading.textContent = module.identity.title") && topicRenderer.includes("subtitle.textContent = module.identity.description") && topicRenderer.includes("goal.textContent = module.topic.learningIntention"), "Topic renderer does not restore canonical hero title, description and learning intention");
assert(topicRenderer.includes('start.textContent = "Topic guide"') && topicRenderer.includes('start.href = "#topic-module-v2"'), "Topic renderer does not restore the canonical Topic guide hero action");
assert(topicRenderer.includes('worksheet.textContent = "Topic Practice 1"') && topicRenderer.includes("worksheet.href = module.links.topicPractice1"), "Topic renderer does not restore the Topic Practice 1 hero action");
assert(topicRenderer.includes('second.textContent = "Topic Practice 2"') && topicRenderer.includes("second.href = module.links.topicPractice2") && topicRenderer.includes("worksheet.after(second)"), "Topic renderer does not add the distinct Topic Practice 2 hero action");
const topicObserverIndex = topicRenderer.indexOf("new MutationObserver");
const topicObserverStart = topicRenderer.indexOf("observer.observe(document.body");
const topicInitialRender = topicRenderer.lastIndexOf("render();");
const topicObserverStop = topicRenderer.indexOf("observer.disconnect()", topicObserverStart);
assert(topicRenderer.includes('document.querySelector("#topic-module-v2") || queued') && topicRenderer.includes("queueMicrotask") && topicRenderer.includes("render();", topicObserverIndex), "Topic renderer lacks its post-router repaint reapply path");
assert(topicObserverIndex >= 0 && topicObserverStart > topicObserverIndex && topicInitialRender > topicObserverStart && topicObserverStop > topicObserverStart, "Topic router-repaint observer lifecycle is incomplete or ordered incorrectly");
assert(topicRenderer.includes("routedYear7Topic") && topicRenderer.includes("routerHasRendered") && topicRenderer.includes("#skillr-year7-page-css"), "Topic renderer does not wait for the asynchronous Year 7 router repaint marker");
assert(topicRenderer.includes("{childList:true, subtree:true}") && /window\.setTimeout\(\(\)\s*=>\s*\{\s*render\(\);\s*observer\.disconnect\(\);\s*\},\s*\d+\);/s.test(topicRenderer), "Topic router-repaint observer is not watching asynchronous subtree replacement with a final reapply and bounded lifetime");

const slidesHtml = safeRead("worksheets/year7/maths/teacher-slides/live.html");
assert(slidesHtml.includes("display-only.js") && slidesHtml.includes("topic-module-v2-slides.js") && slidesHtml.includes("pwa-register.js"), "Slides lost display-only/v2/PWA protected features");
assert(slidesHtml.includes("topic-module-v2-visuals.js") && slidesHtml.includes("year7-maths-topic-modules-v2.js"), "Slides lost canonical data or accessible visual renderer");
assert(!qaBadge.test(slidesHtml), "Teacher slides expose a QA-complete badge");
assert(slidesHtml.indexOf("topic-module-v2-slides.js") < slidesHtml.indexOf("pwa-register.js"), "Canonical slide renderer must run before the asynchronously loaded cluster enhancer");
const slideRenderer = safeRead(slideRendererFile);
const slideTitleIndex = slideRenderer.indexOf('document.title = `${code} ${module.identity.title} Teacher Slides | SkillrHub`;');
const slideClusterReadyIndex = slideRenderer.indexOf('root.dataset.clusterSlidesReady = "true";');
const slideMarkupIndex = slideRenderer.indexOf("root.innerHTML =");
assert(slideTitleIndex >= 0, "Slide renderer does not set the full canonical curriculum-code/topic document title");
assert(slideClusterReadyIndex > slideTitleIndex && slideMarkupIndex > slideClusterReadyIndex, "Slide renderer must mark the canonical deck cluster-ready before inserting its navigator");
assert(slideRenderer.includes('document.querySelectorAll(".slide-controls").forEach(control => control.remove())'), "Slide renderer does not remove a pre-existing global cluster navigator");
assert((slideRenderer.match(/<nav>/g) || []).length === 1 && slideRenderer.includes('id="tmv2Prev"') && slideRenderer.includes('id="tmv2Next"') && slideRenderer.includes('id="tmv2Count"'), "Slide renderer must create exactly one canonical four-screen navigator");
assert(!slideRenderer.includes('class="slide-controls"'), "Canonical slide renderer must not create the global enhancer's second navigator class");
const slideClusters = safeRead(slideClustersFile);
const clusterGuardIndex = slideClusters.indexOf('if (root.dataset.clusterSlidesReady === "true" || !result.clusters.length) return;');
const clusterStyleIndex = slideClusters.indexOf("ensureStyle();", clusterGuardIndex);
const clusterControlsIndex = slideClusters.indexOf('controls.className = "slide-controls";', clusterGuardIndex);
assert(clusterGuardIndex >= 0 && clusterStyleIndex > clusterGuardIndex && clusterControlsIndex > clusterGuardIndex, "Global slide-cluster enhancer does not honour clusterSlidesReady before adding a second navigator");

let exportPayload = null;
if (exists(exportFile)) {
  try {
    exportPayload = JSON.parse(read(exportFile));
  } catch (error) {
    failures.push(`${exportFile}: invalid JSON (${error.message})`);
  }
}
if (exportPayload) {
  assert(exportPayload.schemaVersion === "2.0", "Export schemaVersion must be 2.0");
  assert(exportPayload.traceability?.year === 7 && exportPayload.traceability?.subject === "Mathematics", "Export traceability year/subject missing");
  assert(exportPayload.traceability?.registrySource === registryFile, "Export traceability registry source is unstable");
  assert(exportPayload.traceability?.publicModuleAsset === moduleFile, "Export traceability public module asset is unstable");
  assert(exists(exportPayload.traceability?.registrySource || ""), "Export traceability registry source does not exist");
  assert(exists(exportPayload.traceability?.publicModuleAsset || ""), "Export traceability public module asset does not exist");
  const exportedModules = Array.isArray(exportPayload.modules) ? exportPayload.modules : [];
  const exportedCodes = exportedModules.map(module => module.identity?.code);
  const exportByCode = new Map(exportedModules.map(module => [module.identity?.code, module]));
  assert(exportedModules.length === 30 && new Set(exportedCodes).size === 30, `Export must contain exactly 30 uniquely coded modules; found ${exportedModules.length}/${new Set(exportedCodes).size}`);
  assert(registryCodes.every(code => exportByCode.has(code)) && exportedCodes.every(code => registryCodeSet.has(code)), "Export/registry code parity failed");
  for (const tag of registryCodes) {
    const publicModule = modules.get(tag);
    const exported = exportByCode.get(tag);
    if (!publicModule || !exported) continue;
    assert(exported.identity?.code === tag && exported.identity?.year === 7 && exported.identity?.subject === "Mathematics" && exported.identity?.slug && exported.identity?.title && exported.identity?.description, `${tag}: export identity/traceability incomplete`);
    assert(sameData(exported.identity, publicModule.identity), `${tag}: export identity is stale`);
    assert(sameData(exported.topic, publicModule.topic), `${tag}: export topic data is stale`);
    assert(sameData(exported.slides, publicModule.slides), `${tag}: export teacher-slide data is stale`);
    assert(sameData(exported.practiceSheet, publicModule.practiceSheet), `${tag}: export two-sheet data is stale`);
    assert(Array.isArray(exported.slides) && sameData(exported.slides.map(slide => slide.role), ["learning", "refresher", "guided", "quickCheck"]), `${tag}: export does not contain exactly four ordered slide roles`);
    assert(exported.slides?.every(slide => slide.title && slide.body?.length && slide.teacherNotes && slide.expectedResponse && slide.misconceptionResponse && slide.remediation), `${tag}: export slide teacher layers incomplete`);
    assert(exported.topic?.visuals?.length >= 2 && exported.topic.visuals.every(visual => visual.id && visual.type && visual.alt?.length > 60), `${tag}: export accessible visual metadata incomplete`);
    assert(exported.slides?.every(slide => (slide.visualIds || []).every(id => exported.topic.visuals.some(visual => visual.id === id))), `${tag}: export slide visual reference is broken`);
    assert(exported.practiceSheet?.questions?.length === 9, `${tag}: export canonical question count is not nine`);
    assert(sameData(exported.practiceSheet?.questions?.map(question => question.tier), expectedTierOrder), `${tag}: export tier order is not 3/4/2`);
    assert(exported.practiceSheet?.questions?.every(question => question.id && question.prompt && question.answer && question.summary && question.hint), `${tag}: export answer/summary/hint metadata incomplete`);
    validateSheetDeclarations(exported, tag, "export ");
    const instructionalData = {
      topic: exported.topic,
      slides: exported.slides,
      practiceSheet: exported.practiceSheet
    };
    assert(!publicBrand.test(JSON.stringify(instructionalData)), `${tag}: public brand text is baked into exportable instructional data`);
  }
}

if (failures.length) {
  console.error(`FAIL (${failures.length})\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("PASS Year 7 Maths topic-module v2: 30/30 codes");
console.log(JSON.stringify({
  codes: 30,
  topicPages: 30,
  slideDecks: 30,
  coreSlides: 120,
  topicPracticeRoutes: 60,
  practiceSheetViews: 60,
  legacyWorksheetAliases: 30,
  canonicalQuestions: 270,
  tierTotals: { warmUp: 90, core: 120, extension: 60 },
  workedExamples: 60,
  accessibleVisuals: [...visualAlts].length,
  preservedMappings: 120,
  brandNeutralExportModules: 30
}, null, 2));
