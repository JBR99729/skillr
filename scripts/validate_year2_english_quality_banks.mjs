import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { LA123_ITEMS } from "./year2_english_items_la123.mjs";
import { LA_ITEMS } from "./year2_english_items_la.mjs";
import { LE_ITEMS } from "./year2_english_items_le.mjs";
import { LY_ITEMS } from "./year2_english_items_ly.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/year2-english-data.js"), "utf8"), context);
const units = context.window.SkillrYear2EnglishData;
const codes = context.window.SkillrYear2EnglishOrder;
const problems = [];
const totals = { practice: 0, test: 0 };
const globalIds = new Set();
const globalPrompts = new Map();
const sourceSets = { ...LA123_ITEMS, ...LA_ITEMS, ...LE_ITEMS, ...LY_ITEMS };
const normalize = (value) => String(value ?? "").toLowerCase().replace(/[“”‘’'".,:;!?—–-]/g, " ").replace(/\s+/g, " ").trim();
const visibleChoice = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const weakPrompt = /curriculum code|matches? (?:this|the) code|which option best describes the skill|best summarises this topic|stays focused on the curriculum goal|what is (?:a |an |the )?(?:preference|context|purpose|audience|morpheme|prefix|suffix|text structure|language feature)\??$/i;
const fillerChoice = /all of the above|none of the above|because magic|random answer|the result is magic|ignore (?:the|all) instructions/i;

function checkSyntax(file) {
  try { execFileSync(process.execPath, ["--check", file], { stdio: "pipe" }); }
  catch { problems.push(`${path.relative(ROOT, file)}: JavaScript syntax failed`); }
}

function htmlFilesUnder(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...htmlFilesUnder(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function visibleSourceFilesUnder(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if ([".git", "node_modules", "sources"].includes(entry.name)) continue;
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...visibleSourceFilesUnder(full));
    else if (entry.isFile() && /\.(?:html?|m?js)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

for (const code of codes) {
  const sources = sourceSets[code];
  if (!Array.isArray(sources) || sources.length !== 20) {
    problems.push(`${code}: expected 20 authored contexts split 12/8, found ${sources?.length}`);
  } else {
    const sourceTitles = new Set();
    const sourcePrompts = new Set();
    for (const [index, source] of sources.entries()) {
      const tag = `${code} source ${index + 1}`;
      for (const field of ["title", "question", "correct", "summary", "hint", "visual"]) if (!String(source?.[field] || "").trim()) problems.push(`${tag}: missing ${field}`);
      if (!Array.isArray(source.wrong) || source.wrong.length !== 2) problems.push(`${tag}: expected exactly two distractors`);
      const choices = [source.correct, ...(source.wrong || [])].map(visibleChoice);
      if (choices.length !== 3 || new Set(choices).size !== 3 || choices.some((choice) => !choice)) problems.push(`${tag}: choices are missing or duplicated`);
      if (choices.some((choice) => fillerChoice.test(choice))) problems.push(`${tag}: filler answer choice`);
      const title = normalize(source.title);
      const prompt = normalize(source.question);
      if (sourceTitles.has(title)) problems.push(`${tag}: duplicate source title`);
      if (sourcePrompts.has(prompt)) problems.push(`${tag}: duplicate source prompt`);
      sourceTitles.add(title);
      sourcePrompts.add(prompt);
      if (weakPrompt.test(source.question)) problems.push(`${tag}: definition or curriculum-matching prompt`);
      if (String(source.question).trim().split(/\s+/).length > 32) problems.push(`${tag}: source prompt exceeds 32 words`);
    }
    const practiceContexts = new Set(sources.slice(0, 12).map((source) => normalize(source.question)));
    for (const source of sources.slice(12)) if (practiceContexts.has(normalize(source.question))) problems.push(`${code}: authored Practice/Test context overlap`);
  }
  const lower = code.toLowerCase();
  const bankFile = path.join(ROOT, "assets", "assessment-banks", "year2", "english", `${lower}.json`);
  let items;
  try { items = JSON.parse(fs.readFileSync(bankFile, "utf8")); }
  catch (error) { problems.push(`${code}: invalid or missing JSON (${error.message})`); continue; }
  const byBank = { practice: items.filter((item) => item.bank === "practice"), test: items.filter((item) => item.bank === "test") };
  if (items.length !== 40 || byBank.practice.length !== 24 || byBank.test.length !== 16) problems.push(`${code}: expected 40 items split 24/16, found ${items.length} split ${byBank.practice.length}/${byBank.test.length}`);
  const localIds = new Set(), localPrompts = new Set();
  for (const bank of ["practice", "test"]) {
    totals[bank] += byBank[bank].length;
    const positions = [0, 0, 0];
    for (const item of byBank[bank]) {
      const tag = `${code} ${item.id || "(missing id)"}`;
      if (item.subject !== "english" || item.year_level !== "Year 2" || item.curriculum_code !== code || item.bank !== bank) problems.push(`${tag}: identity fields mismatch`);
      if (!item.id || localIds.has(item.id) || globalIds.has(item.id)) problems.push(`${tag}: duplicate or missing ID`);
      localIds.add(item.id); globalIds.add(item.id);
      const prompt = normalize(item.question);
      if (!prompt || localPrompts.has(prompt)) problems.push(`${tag}: duplicate prompt within code`);
      if (globalPrompts.has(prompt) && globalPrompts.get(prompt) !== code) problems.push(`${tag}: prompt duplicates ${globalPrompts.get(prompt)}`);
      localPrompts.add(prompt); globalPrompts.set(prompt, code);
      if (weakPrompt.test(item.question)) problems.push(`${tag}: definition or curriculum-matching prompt`);
      if (item.audio_prompt !== item.question) problems.push(`${tag}: audio_prompt does not match question`);
      const wordCount = String(item.question).trim().split(/\s+/).length;
      if (wordCount > 52) problems.push(`${tag}: question is too long for Year 2 audio (${wordCount} words)`);
      if (!Array.isArray(item.answers) || item.answers.length !== 3) problems.push(`${tag}: must have exactly 3 choices`);
      if (item.audio_answers !== undefined && (!Array.isArray(item.audio_answers) || item.audio_answers.length !== item.answers?.length || item.audio_answers.some((answer) => !String(answer).trim()))) problems.push(`${tag}: incomplete spoken-answer descriptions`);
      if (code === "AC9E2LA10" && item.skill.endsWith("_apply") && !Array.isArray(item.audio_answers)) problems.push(`${tag}: editing choices need spoken punctuation and capital descriptions`);
      if (Array.isArray(item.audio_answers) && new Set(item.audio_answers.map((answer) => normalize(answer))).size !== item.audio_answers.length) problems.push(`${tag}: spoken-answer descriptions are not distinct`);
      if (new Set((item.answers || []).map((answer) => visibleChoice(answer.text))).size !== 3) problems.push(`${tag}: duplicate answer text`);
      if ((item.answers || []).some((answer) => fillerChoice.test(answer.text))) problems.push(`${tag}: filler answer choice`);
      const correct = (item.answers || []).filter((answer) => answer.is_correct);
      if (!Number.isInteger(item.correct_index) || item.correct_index < 0 || item.correct_index > 2 || correct.length !== 1 || item.answers?.[item.correct_index]?.is_correct !== true) problems.push(`${tag}: incorrect answer key`);
      else positions[item.correct_index] += 1;
      if (!item.explanation?.summary || !item.explanation?.hint) problems.push(`${tag}: missing summary or hint`);
      if (normalize(item.explanation?.summary) === normalize(item.explanation?.hint)) problems.push(`${tag}: summary and hint must be distinct`);
      if (!item.visual?.asset_path || !item.visual?.alt_text || item.visual.alt_text.length < 45) problems.push(`${tag}: incomplete visual metadata`);
      const [assetPath, symbol] = String(item.visual?.asset_path || "").split("#");
      const asset = path.join(ROOT, assetPath.replace(/^\//, ""));
      if (!fs.existsSync(asset)) problems.push(`${tag}: visual asset missing`);
      else if (!symbol || !fs.readFileSync(asset, "utf8").includes(`id="${symbol}"`)) problems.push(`${tag}: SVG symbol missing`);
    }
    if (Math.max(...positions) - Math.min(...positions) > 1 || positions.some((count) => count === 0)) problems.push(`${code} ${bank}: answer positions unbalanced ${positions.join("/")}`);
  }
  const practicePrompts = new Set(byBank.practice.map((item) => normalize(item.question)));
  for (const item of byBank.test) if (practicePrompts.has(normalize(item.question))) problems.push(`${code}: Practice/Test prompt overlap at ${item.id}`);
  const svgFile = path.join(ROOT, "assets", "assessment-visuals", "year2", "english", `${lower}.svg`);
  if (fs.existsSync(svgFile)) {
    const svg = fs.readFileSync(svgFile, "utf8");
    const symbolCount = (svg.match(/<symbol\b/g) || []).length;
    if (symbolCount !== 40) problems.push(`${code}: expected 40 SVG symbols, found ${symbolCount}`);
  }

  const route = path.join(ROOT, "quiz", "year-2", "english", lower);
  for (const [bank, attempt, count, cycle] of [["practice", 8, 24, true], ["test", 12, 16, false]]) {
    const htmlFile = path.join(route, bank, "index.html");
    const html = fs.readFileSync(htmlFile, "utf8");
    if (!html.includes(`"maxQuestions":${attempt}`) || !html.includes('"shuffleQuestions":true') || !html.includes(`"questionCycle":${cycle}`)) problems.push(`${code} ${bank}: selection config mismatch`);
    if (!html.includes(`>${count}</span><span class="summary-label">Question bank`)) problems.push(`${code} ${bank}: bank count presentation mismatch`);
    if (!html.includes(`/quiz/year-2/english/${lower}/${bank}/questions.js?v=20260813-production-v1`)) problems.push(`${code} ${bank}: production bank handoff missing`);
    if (!html.includes("/assets/year2-english-assessment-ui.js?v=1")) problems.push(`${code} ${bank}: assessment UI missing`);
    if (html.includes("year2-english-authored-banks") || html.includes("year2-english-bank-loader")) problems.push(`${code} ${bank}: legacy bank can overwrite production questions`);
    if (!html.includes('/quiz/assets/script.js')) problems.push(`${code} ${bank}: shared assessment engine missing`);
    for (const target of [path.join(route, bank, "questions.js"), ...(bank === "practice" ? [path.join(route, bank, "practice-questions.js")] : [])]) {
      checkSyntax(target);
      try {
        const liveContext = { window: {} };
        vm.createContext(liveContext);
        vm.runInContext(fs.readFileSync(target, "utf8"), liveContext, { filename: path.relative(ROOT, target) });
        const live = bank === "practice" ? liveContext.window.skillrPracticeQuestions : liveContext.window.skillrTestQuestions;
        if (!Array.isArray(live) || live.length !== byBank[bank].length) {
          problems.push(`${code} ${bank}: generated bank count does not match source`);
        } else {
          for (const [index, sourceItem] of byBank[bank].entries()) {
            const liveItem = live[index];
            const sourceOptions = sourceItem.answers.map((answer) => answer.text);
            if (liveItem.question !== sourceItem.question || liveItem.audioPrompt !== sourceItem.audio_prompt || JSON.stringify(liveItem.answers) !== JSON.stringify(sourceOptions) || JSON.stringify(liveItem.audioAnswers) !== JSON.stringify(sourceItem.audio_answers) || liveItem.correct !== sourceItem.correct_index) {
              problems.push(`${code} ${bank} item ${index + 1}: visible option, audio or answer-key handoff mismatch`);
            }
            if (JSON.stringify(liveItem.structuredExplanation) !== JSON.stringify(sourceItem.explanation)) problems.push(`${code} ${bank} item ${index + 1}: feedback handoff mismatch`);
          }
        }
      } catch (error) {
        problems.push(`${path.relative(ROOT, target)}: could not verify live-bank parity (${error.message})`);
      }
    }
  }
  for (const file of htmlFilesUnder(route)) {
    const relative = path.relative(route, file).replaceAll(path.sep, "/");
    if (relative.startsWith("quiz/")) continue;
    const html = fs.readFileSync(file, "utf8");
    const heading = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "";
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
    if (/\.\.\.|…/.test(heading) || /\.\.\.|…/.test(title)) problems.push(`${path.relative(ROOT, file)}: truncated identity`);
    if (!heading.includes(units[code].title) || !title.includes(code) || !title.includes(units[code].title)) problems.push(`${path.relative(ROOT, file)}: incomplete page identity`);
    if (/same eight|same 8|eight curriculum questions|same questions used in practice and test/i.test(html)) problems.push(`${path.relative(ROOT, file)}: stale shared-bank wording`);
  }
}

const expectedCodes = new Set(["AC9E2LA01","AC9E2LA02","AC9E2LA03","AC9E2LA04","AC9E2LA05","AC9E2LA06","AC9E2LA07","AC9E2LA08","AC9E2LA09","AC9E2LA10","AC9E2LE01","AC9E2LE02","AC9E2LE03","AC9E2LE04","AC9E2LE05","AC9E2LY01","AC9E2LY02","AC9E2LY03","AC9E2LY04","AC9E2LY05","AC9E2LY06","AC9E2LY07","AC9E2LY08","AC9E2LY09","AC9E2LY10","AC9E2LY11","AC9E2LY12"]);
if (codes.length !== 27 || new Set(codes).size !== 27 || codes.some((code) => !expectedCodes.has(code))) problems.push(`Registry mismatch: ${codes.join(",")}`);
const pwaSource = fs.readFileSync(path.join(ROOT, "pwa-register.js"), "utf8");
if (/ac9e2la0\[1-3\].*\(practice\|test\|worksheet\|quiz\)/.test(pwaSource)) problems.push("pwa-register.js: legacy LA01–03 loader can overwrite production Practice/Test banks");
if (!/ac9e2la0\[1-3\]\\\/quiz/.test(pwaSource)) problems.push("pwa-register.js: legacy LA01–03 Quiz loader route is missing");
const sharedAssessmentEngine = fs.readFileSync(path.join(ROOT, "quiz/assets/script.js"), "utf8");
if (!sharedAssessmentEngine.includes("question.audioAnswers")) problems.push("quiz/assets/script.js: spoken editing-choice descriptions are not connected to read-aloud");
for (const file of visibleSourceFilesUnder(ROOT)) {
  const source = fs.readFileSync(file, "utf8");
  const staticBadge = /<[^>]+>\s*QA complete\s*<\/[^>]+>/i.test(source);
  const injectedBadge = /(?:textContent|innerText)\s*=\s*["'`]QA complete["'`]/i.test(source);
  if (staticBadge || injectedBadge) problems.push(`${path.relative(ROOT, file)}: obsolete visible QA badge remains`);
}
for (const file of [
  "scripts/build_year2_english_quality_banks.mjs", "scripts/publish_year2_english_quality_banks.mjs", "scripts/validate_year2_english_quality_banks.mjs",
  "scripts/year2_english_items_la123.mjs", "scripts/year2_english_items_la.mjs", "scripts/year2_english_items_le.mjs", "scripts/year2_english_items_ly.mjs", "assets/year2-english-assessment-ui.js"
]) checkSyntax(path.join(ROOT, file));

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({ status: "PASS", codes: `${codes.length}/${codes.length}`, totals, combined: totals.practice + totals.test, checks: ["registry", "authored context split", "schema", "syntax", "unique IDs", "unique prompts", "Practice/Test separation", "three choices", "answer keys", "balanced positions", "visible option/audio/key parity", "summaries", "hints", "feedback parity", "visual paths", "SVG symbols", "alt text", "full page identities", "8/12 selection", "legacy-loader isolation", "QA badge absence"] }, null, 2));
