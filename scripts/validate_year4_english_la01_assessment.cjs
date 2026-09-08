#!/usr/bin/env node
"use strict";

// Actual shared assessment/review scripts in a local DOM; no browser or network.
// Usage: node scripts/validate_year4_english_la01_assessment.cjs \
//   --linkedom /absolute/path/to/linkedom [--output /path/to/report.json]
// LINKEDOM_PATH may replace --linkedom. Repository paths are derived from this file.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const args = process.argv.slice(2);
function option(name) {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  assert(args[i + 1] && !args[i + 1].startsWith("--"), `${name} needs a value`);
  return args[i + 1];
}
for (let i = 0; i < args.length; i += 2) {
  assert(["--linkedom", "--output", "--code"].includes(args[i]), `Unknown argument: ${args[i]}`);
}
const dependency = option("--linkedom") || process.env.LINKEDOM_PATH || "linkedom";
const { parseHTML } = require(dependency.startsWith(".") ? path.resolve(dependency) : dependency);
const output = option("--output");
const ROOT = path.resolve(__dirname, "..");
const CODE = option("--code") || "AC9E4LA01";
assert(/^AC9E4LA(?:0[1-9]|1[0-2])$/.test(CODE), "Only authored LA01–LA12 supported.");
const BASE = `/quiz/year-4/english/${CODE.toLowerCase()}/`;
const rows = [];
const touched = new Set();
const read = (relative) => {
  const local = relative.replace(/^\//, "");
  touched.add(local);
  return fs.readFileSync(path.join(ROOT, local), "utf8");
};
const plain = (value) => JSON.parse(JSON.stringify(value));
const equal = (actual, expected, message) => assert.deepEqual(plain(actual), plain(expected), message);
const store = () => {
  const values = new Map();
  return { getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key) };
};

function environment(route, shared) {
  const html = read(route + "index.html");
  const { window: dom } = parseHTML(html);
  const { document } = dom;
  Object.defineProperty(document, "readyState", { value: "loading", writable: true });
  Object.defineProperty(document, "scripts", { get: () => [...document.querySelectorAll("script")] });
  document.styleSheets = [];
  document.write = () => {}; // The wrapper's one local runtime request is explicitly executed below.
  document.defaultView.scrollTo = () => {};
  dom.HTMLElement.prototype.scrollIntoView = () => {};
  const location = { pathname: route, search: "", origin: "https://skillrhub.com",
    href: "https://skillrhub.com" + route, assign(value) { this.href = value; } };
  let timerId = 0;
  const timers = new Map();
  const ctx = { document, console, URL, URLSearchParams, Math, Date, JSON, Promise,
    CustomEvent: dom.CustomEvent, Event: dom.Event, HTMLElement: dom.HTMLElement,
    Node: dom.Node, MutationObserver: dom.MutationObserver, location, navigator: {},
    localStorage: shared?.localStorage || store(), sessionStorage: shared?.sessionStorage || store(),
    Audio: class { pause() {} play() { return Promise.resolve(); } addEventListener() {} removeEventListener() {} },
    setTimeout(fn, ms = 0) { timers.set(++timerId, { fn, ms }); return timerId; },
    clearTimeout(id) { timers.delete(id); }, setInterval: () => 1, clearInterval() {},
    queueMicrotask(fn) { timers.set(++timerId, { fn, ms: 0 }); },
    requestAnimationFrame: fn => fn(), getComputedStyle: () => ({ display: "block" }),
    scrollTo() {}, matchMedia: () => ({ matches: false, addEventListener() {} }),
    // No fetch result supplies questions or assessment logic. Network is disabled in this harness.
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({ paths: [] }) }) };
  ctx.window = ctx;
  ctx.addEventListener = () => {};
  ctx.removeEventListener = () => {};
  vm.createContext(ctx);
  const run = file => vm.runInContext(read(file), ctx, { filename: file });
  const scripts = [...document.querySelectorAll("script[src]")]
    .map(node => node.getAttribute("src").split("?")[0]);
  return { html, dom, document, ctx, scripts, run,
    ready() { document.readyState = "interactive"; document.dispatchEvent(new dom.Event("DOMContentLoaded")); } };
}

function published(mode) {
  const ctx = { window: {} };
  vm.runInNewContext(read(BASE + mode + "/questions.js"), ctx);
  const questions = ctx.window.quizQuestions;
  assert(Array.isArray(questions), `${mode}: published quizQuestions missing`);
  return plain(questions);
}

function boot(mode, question, helper = true) {
  const env = environment(BASE + mode + "/");
  const config = env.html.match(/window\.quizConfig\s*=\s*(\{[\s\S]*?\});/);
  assert(config, `${mode}: actual page config missing`);
  env.ctx.quizConfig = JSON.parse(config[1]);
  assert.equal(env.ctx.quizConfig.skillCode, CODE);
  assert.equal(env.ctx.quizConfig.requireAdultReviewSupport, true, "Adult support must fail closed");
  assert(env.ctx.quizConfig.bankVersion, "A versioned authored bank is required");
  assert.equal(env.ctx.quizConfig.maxQuestions, 5, "Preserve five-question attempts");
  const helperIndex = env.scripts.indexOf("/quiz/assets/year1-maths-support.js");
  const runtimeIndex = env.scripts.indexOf("/quiz/assets/script.js");
  assert(helperIndex >= 0 && helperIndex < runtimeIndex, "Actual HTML must load helper before runtime");
  // Isolate each real published item while using the actual response, scoring and storage paths.
  env.ctx.quizQuestions = [plain(question)];
  for (const file of env.scripts) {
    if (!file.startsWith("/") || /questions\.js$|pwa-register|report-issue|\/access\.js$/.test(file)) continue;
    if (!helper && file === "/quiz/assets/year1-maths-support.js") continue;
    env.run(file);
    if (file === "/quiz/assets/script.js") env.run("/quiz/assets/script-runtime-v115.js");
  }
  env.ready();
  return env;
}

function start(env, question) {
  const { document, dom } = env;
  const name = document.getElementById("studentName");
  if (name) { name.value = "Offline assessment QA"; name.dispatchEvent(new dom.Event("input")); }
  const button = document.getElementById("startButton");
  assert(button && !button.disabled, "Real Start control must be available");
  button.click();
  if (env.ctx.quizConfig.preModuleNotesRequired) {
    assert(document.getElementById("preModuleScreen")?.classList.contains("is-active"));
    const next = document.getElementById("preModuleContinueButton");
    assert(next && !next.disabled, "Real preparation Continue control");
    next.click();
  }
  assert.equal(document.getElementById("questionText")?.textContent.trim(), question.question);
}

function resultData(env) {
  const value = env.ctx.sessionStorage.getItem(env.ctx.quizConfig.resultStorageKey);
  assert(value, "Actual runtime must save attempt data");
  return JSON.parse(value);
}

function assertStored(data, env, mode, question) {
  assert.equal(data.bankVersion, env.ctx.quizConfig.bankVersion);
  assert.equal(data.curriculumCode, CODE);
  assert.equal(data.mode, mode);
  assert.equal(data.total, 1);
  assert.equal(data.answers.length, 1);
  assert.equal(data.answers[0].questionId, question.id);
  assert.equal(data.answers[0].question, question.question);
  assert.equal(data.answers[0].explanation, question.explanation);
  assert.equal(data.reviewUrl, BASE + mode + "/review/");
  assert.equal(data.retakeUrl, BASE + mode + "/retake/");
}

function openResult(env, mode, pending) {
  const next = environment(BASE + mode + "/result/", env.ctx);
  assert(next.scripts.includes("/quiz/assets/separate-result.js"), "Actual result script included");
  next.run("/quiz/assets/separate-result.js");
  next.ready();
  if (pending) {
    assert(next.document.getElementById("resultStatus").textContent.includes("grown-up's check"));
    assert(!next.document.querySelector(".quiz-celebration, .quiz-confetti, #resultSharePrompt"),
      "Pending work must not receive celebration/share prompt");
  }
  return next;
}

function markAndRevise(env, mode, question) {
  const review = environment(BASE + mode + "/review/", env.ctx);
  assert(review.scripts.includes("/quiz/assets/year1-maths-support.js"), "Review HTML must load adult helper");
  assert(review.scripts.includes("/quiz/assets/separate-review.js"), "Actual review script included");
  assert(review.scripts.indexOf("/quiz/assets/year1-maths-support.js") < review.scripts.indexOf("/quiz/assets/separate-review.js"));
  review.run("/quiz/assets/year1-maths-support.js");
  review.run("/quiz/assets/separate-review.js");
  review.ready();
  const card = review.document.querySelector(".review-item");
  assert(card && review.document.querySelectorAll(".review-item").length === 1);
  assert(card.textContent.includes(question.modelAnswer), "Review exposes the actual model");
  assert(card.textContent.includes(question.acceptanceNote), "Review exposes marking guidance");
  const buttons = [...card.querySelectorAll("button")];
  const meets = buttons.find(button => button.textContent === "Meets the task");
  const revise = buttons.find(button => button.textContent === "Needs more practice");
  assert(meets && revise, "Both actual adult marking controls must exist");
  for (const [button, correct] of [[meets, true], [revise, false], [meets, true]]) {
    button.click();
    const saved = resultData(env);
    assert.equal(saved.pendingReview, 0);
    assert.equal(saved.markedTotal, 1);
    assert.equal(saved.score, correct ? 1 : 0);
    assert.equal(saved.passed, correct);
    assert.equal(saved.answers[0].isCorrect, correct);
    assert.equal(saved.answers[0].reviewedBy, "adult");
    assert.equal(saved.answers[0].pendingReview, false);
    assert.equal(button.getAttribute("aria-pressed"), "true");
    const result = openResult(env, mode, false);
    assert.equal(result.document.getElementById("resultStatus").textContent, correct ? "Passed" : "Keep practising");
  }
}

function submitAdult(mode, question, submission) {
  const env = boot(mode, question);
  start(env, question);
  const { document, dom } = env;
  const input = document.getElementById("adultReviewAnswer");
  const paper = document.getElementById("adultReviewPaper");
  const submit = document.getElementById("submitButton");
  assert(input && paper);
  assert.equal(submit.textContent, "Save response");
  assert(submit.disabled, "Empty response is not a submission");
  assert(!document.getElementById("selfCheckConfirmed"), "No self-certified mastery fallback");
  assert(!document.querySelector(".self-check-model"), "No generic pre-answer model disclosure");
  const responseArea = () => document.getElementById("answerList").textContent + document.getElementById("feedback").textContent;
  if (mode === "test") {
    assert(!responseArea().includes(question.modelAnswer), "Test model hidden before answer");
    assert(!responseArea().includes(question.acceptanceNote), "Test marking guidance hidden before answer");
  }
  const typed = "My original response and explanation are ready for an adult to check.";
  if (submission === "typed") {
    input.value = typed;
    input.dispatchEvent(new dom.Event("input"));
  } else {
    paper.checked = true;
    paper.dispatchEvent(new dom.Event("change"));
  }
  assert(!submit.disabled);
  submit.click();
  if (mode === "test") {
    assert(!responseArea().includes(question.modelAnswer), "Test model remains hidden after saving until Review");
    assert(!responseArea().includes(question.acceptanceNote), "Test acceptance criteria deferred to Review");
  } else {
    assert(document.getElementById("feedback").textContent.includes(question.modelAnswer));
  }
  document.getElementById("nextButton").click();
  const data = resultData(env);
  assertStored(data, env, mode, question);
  assert.equal(data.pendingReview, 1);
  assert.equal(data.markedTotal, 0);
  assert.equal(data.score, 0);
  assert.equal(data.passed, false);
  assert.equal(data.answers[0].isCorrect, null);
  assert.equal(data.answers[0].pendingReview, true);
  assert.equal(data.answers[0].correctAnswer, question.modelAnswer);
  assert.equal(data.answers[0].acceptanceNote, question.acceptanceNote);
  assert.equal(data.answers[0].selectedAnswer, submission === "typed" ? typed : question.completionLabel);
  openResult(env, mode, true);
  markAndRevise(env, mode, question);
}

function record(mode, kind, fn, item) {
  try { rows.push({ mode, kind, ...(item ? { item } : {}), status: "PASS", ...(fn() || {}) }); }
  catch (error) { rows.push({ mode, kind, ...(item ? { item } : {}), status: "FAIL", error: error.stack }); }
}

const canonical = JSON.parse(read(`assets/assessment-banks/year4/english/${CODE.toLowerCase()}.json`));
record("all", "64-items-authentic-adult-inventory", () => {
  assert.equal(canonical.length, 64);
  if (CODE === "AC9E4LA01") {
    assert.equal(canonical.filter(q => q.bank === "practice" && q.grading_mode === "adult-review").length, 12, "Preserve LA01 reviewed Practice inventory");
    assert.equal(canonical.filter(q => q.bank === "test" && q.grading_mode === "adult-review").length, 4, "Preserve LA01 reviewed Test inventory");
  }
  assert(canonical.filter(q => q.bank === "practice" && q.grading_mode === "adult-review").length >= 8, "At least eight authentic Practice tasks in this batch");
  assert(canonical.filter(q => q.bank === "test" && q.grading_mode === "adult-review").length >= 4, "At least four authentic Test tasks in this batch");
  assert(canonical.every(q => q.curriculum_code === CODE && q.subject === "english"));
  assert.equal(new Set(canonical.map(q => q.id)).size, 64);
});
for (const mode of ["practice", "test"]) {
  const questions = published(mode);
  record(mode, "canonical-published-full-field-parity", () => {
    const source = canonical.filter(q => q.bank === mode);
    assert.equal(source.length, mode === "practice" ? 48 : 16);
    assert.equal(questions.length, source.length);
    assert.equal(read(BASE + "practice/questions.js"), read(BASE + "practice/practice-questions.js"), "Practice alias parity");
    for (let i = 0; i < source.length; i++) {
      const s = source[i], q = questions[i];
      assert.equal(q.id, s.id.toLowerCase());
      assert.equal(q.curriculumCode, s.curriculum_code);
      assert.equal(q.bank, s.bank);
      assert.equal(q.skill, s.skill.replace(/_/g, " "));
      assert.equal(q.question, s.question);
      assert.equal(q.audioPrompt, s.audio_prompt);
      assert.equal(q.audioPrompt, q.question);
      equal(q.answers, s.answers.map(answer => answer.text));
      equal(q.visualMeta, s.visual);
      equal(q.structuredExplanation, s.explanation);
      assert.equal(q.visual, s.visual.alt_text || "");
      assert.equal(q.printable, true);
      assert.equal(q.qualitySchema, "production-v1");
      if (s.visual.type === "none") assert.equal(q.visualHtml, "");
      if (s.visual.type === "svg") {
        const { document } = parseHTML(q.visualHtml);
        assert.equal(document.querySelector("svg")?.getAttribute("aria-label"), s.visual.alt_text);
        assert.equal(document.querySelector("use")?.getAttribute("href"), s.visual.asset_path);
      }
      for (const [original, live] of [["audio_answers", "audioAnswers"], ["difficulty", "difficulty"],
        ["difficulty_tier", "difficultyTier"], ["sequence_priority", "sequencePriority"]]) {
        if (s[original] !== undefined) equal(q[live], s[original]);
        else assert.equal(q[live], undefined);
      }
      const adult = s.grading_mode === "adult-review";
      const explanation = adult && s.model_answer === s.explanation.summary
        ? "Check the completed work against this guidance before marking the response."
        : `${s.explanation.summary}\nHint: ${s.explanation.hint}`;
      assert.equal(q.explanation, explanation);
      if (adult) {
        assert.equal(q.type, "self-check"); assert.equal(q.gradingMode, "adult-review");
        assert.equal(q.responseType, "short_answer"); assert.equal(q.answers.length, 0);
        assert.equal(q.correct, s.model_answer); assert.equal(q.modelAnswer, s.model_answer);
        assert.equal(q.acceptanceNote, s.acceptance_note); assert.equal(q.responseInstructions, s.response_instructions);
        assert.equal(q.completionLabel, s.completion_label);
      } else {
        assert.equal(q.type, "single"); assert.equal(q.gradingMode, undefined);
        assert.equal(q.answers.length, 4); assert.equal(q.correct, s.correct_index);
        assert.equal(s.answers.filter(a => a.is_correct).length, 1);
        assert.equal(s.answers[s.correct_index].is_correct, true);
      }
    }
    return { questions: questions.length, adultItems: questions.filter(q => q.gradingMode === "adult-review").length };
  });
  for (const question of questions.filter(q => q.gradingMode === "adult-review")) {
    for (const submission of ["typed", "paper"]) {
      record(mode, `adult-${submission}-pending-mark-revise-result`, () => submitAdult(mode, question, submission), question.id);
    }
    record(mode, "missing-helper-fails-closed", () => {
      const env = boot(mode, question, false);
      assert.equal(env.ctx.SkillrYear1Maths, undefined);
      assert(env.document.getElementById("startButton").disabled);
      assert([...env.document.querySelectorAll('[role="alert"]')].some(node => node.textContent.includes("did not load")));
      assert(!env.document.getElementById("selfCheckConfirmed"));
      assert.equal(env.ctx.sessionStorage.getItem(env.ctx.quizConfig.resultStorageKey), null);
    }, question.id);
  }
  const selected = questions.find(q => q.type === "single");
  for (const correct of [true, false]) record(mode, correct ? "selected-correct" : "selected-incorrect", () => {
    assert(selected, "Selected-response control required");
    const env = boot(mode, selected); start(env, selected);
    const wanted = selected.answers[selected.correct];
    const button = [...env.document.querySelectorAll(".answer-option")]
      .find(node => (node.querySelector(".answer-text")?.textContent === wanted) === correct);
    assert(button); button.click();
    assert(!env.document.getElementById("submitButton").disabled);
    env.document.getElementById("submitButton").click();
    env.document.getElementById("nextButton").click();
    const data = resultData(env); assertStored(data, env, mode, selected);
    assert.equal(data.pendingReview, 0); assert.equal(data.score, correct ? 1 : 0);
    assert.equal(data.answers[0].isCorrect, correct); assert.equal(data.answers[0].correctAnswer, wanted);
  }, selected?.id);
}
touched.add(path.relative(ROOT, __filename));
const report = { date: new Date().toISOString(), code: CODE,
  scope: "64 canonical/published items and all authored adult items through actual shared runtime, result and review scripts in linkedom. DOM/browser APIs are simulated; no browser, network, PWA or PDF visual review is claimed.",
  cases: rows.length, pass: rows.filter(row => row.status === "PASS").length,
  fail: rows.filter(row => row.status === "FAIL").length, rows,
  artifacts: [...touched].sort().map(file => ({ path: file,
    sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, file))).digest("hex") })) };
const json = JSON.stringify(report, null, 2) + "\n";
if (output) fs.writeFileSync(path.resolve(output), json);
console.log(output ? JSON.stringify({ code: CODE, cases: report.cases, pass: report.pass, fail: report.fail,
  report: path.resolve(output), failures: rows.filter(row => row.status === "FAIL").map(({ mode, kind, item, error }) =>
    ({ mode, kind, item, error: error.split("\n").slice(0, 3).join(" ") })) }, null, 2) : json);
if (report.fail) process.exitCode = 1;
