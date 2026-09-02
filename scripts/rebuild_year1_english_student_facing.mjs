#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year1", "english");
const QUIZ_ROOT = path.join(ROOT, "quiz", "year-1", "english");

const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const correctText = (item) => item.answers.find((answer) => answer.is_correct)?.text || "";
const wrongTexts = (item) => item.answers.filter((answer) => !answer.is_correct).map((answer) => answer.text);
const makeAnswers = (correct, wrong, correctIndex) => {
  const values = wrong.slice(0, 2);
  values.splice(correctIndex, 0, correct);
  return values.map((text, index) => ({ text, is_correct:index === correctIndex }));
};

execFileSync(process.execPath, ["scripts/build_year1_english_quality_banks.mjs"], { cwd:ROOT, stdio:"inherit" });

const bankFiles = fs.readdirSync(BANK_ROOT).filter((name) => /^ac9e1(?:la|le|ly)\d{2}\.json$/i.test(name)).sort();
if (bankFiles.length !== 30) throw new Error(`Expected 30 Year 1 English banks, found ${bankFiles.length}`);

for (const name of bankFiles) {
  const file = path.join(BANK_ROOT, name);
  const all = JSON.parse(fs.readFileSync(file, "utf8"));
  const existingPractice = all.filter((item) => item.bank === "practice");
  const existingTest = all.filter((item) => item.bank === "test");
  if (existingPractice.length !== 24 || existingTest.length !== 16) throw new Error(`${name}: expected existing 24/16 bank split`);

  // Practice uses only the first 10 genuine authored sources. The two unused
  // authored sources form a buffer before the separate authored Test range.
  const core = existingPractice.slice(0, 20);
  const recognise = core.filter((_, index) => index % 2 === 0).map((item, index) => ({ ...item, stage:"recognise", skill:`${item.curriculum_code?.toLowerCase() || item.curriculumCode?.toLowerCase() || name.slice(0,-5)}_${String(index+1).padStart(2,"0")}_recognise` }));
  const explain = core.filter((_, index) => index % 2 === 1).map((item, index) => ({ ...item, stage:"explain", skill:`${item.curriculum_code?.toLowerCase() || item.curriculumCode?.toLowerCase() || name.slice(0,-5)}_${String(index+1).padStart(2,"0")}_explain` }));
  const discriminate = [];
  const apply = [];

  for (let index = 0; index < 10; index += 1) {
    const answerItem = recognise[index];
    const strategyItem = explain[index];
    const goodAnswer = correctText(answerItem);
    const goodStrategy = correctText(strategyItem);
    const badChoices = wrongTexts(answerItem);
    const bad = badChoices[0] || "Guess without checking the clue.";
    const code = answerItem.curriculum_code || answerItem.curriculumCode;
    const baseVisual = answerItem.visual;
    const hint = clean(answerItem.explanation?.hint || strategyItem.explanation?.hint || "Return to the model and check the clue that matters.");

    const dIndex = index % 3;
    discriminate.push({
      ...answerItem,
      id:`${code}-P-${String(21 + index).padStart(3,"0")}`,
      bank:"practice",
      stage:"discriminate",
      skill:`${String(code).toLowerCase()}_${String(index+1).padStart(2,"0")}_discriminate`,
      question:"Which choice is a mix-up to avoid for this skill?",
      audio_prompt:"Which choice is a mix-up to avoid for this skill?",
      visual:baseVisual,
      answers:makeAnswers(bad,[goodAnswer,goodStrategy],dIndex),
      correct_index:dIndex,
      explanation:{ summary:`${bad} is the mix-up. ${hint}`, hint }
    });

    const aIndex = (index + 1) % 3;
    apply.push({
      ...answerItem,
      id:`${code}-P-${String(31 + index).padStart(3,"0")}`,
      bank:"practice",
      stage:"apply",
      skill:`${String(code).toLowerCase()}_${String(index+1).padStart(2,"0")}_apply`,
      question:"Which choice would best use this skill in a new example?",
      audio_prompt:"Which choice would best use this skill in a new example?",
      visual:baseVisual,
      answers:makeAnswers(goodAnswer,badChoices,aIndex),
      correct_index:aIndex,
      explanation:{ summary:`${goodAnswer} uses the skill correctly. ${hint}`, hint }
    });
  }

  const practice = [...recognise, ...explain, ...discriminate, ...apply].map((item, index) => ({
    ...item,
    id:`${item.curriculum_code || item.curriculumCode}-P-${String(index + 1).padStart(3,"0")}`,
    bank:"practice"
  }));

  // Existing Test items 1-8 come from four genuine authored Test sources.
  // Items 9-16 came from generic Quick Read headings and are deliberately
  // discarded. Build fresh verification/application checks from the four
  // genuine Test sources so Test remains separate from Practice without
  // introducing descriptor-paraphrase templates.
  const genuineTest = existingTest.slice(0, 8);
  const testAnswer = genuineTest.filter((_, index) => index % 2 === 0);
  const testStrategy = genuineTest.filter((_, index) => index % 2 === 1);
  const verifyTest = [];
  const applyTest = [];

  for (let index = 0; index < 4; index += 1) {
    const answerItem = testAnswer[index];
    const strategyItem = testStrategy[index];
    const code = answerItem.curriculum_code || answerItem.curriculumCode;
    const goodAnswer = correctText(answerItem);
    const goodStrategy = correctText(strategyItem);
    const wrong = wrongTexts(answerItem);
    const hint = clean(answerItem.explanation?.hint || strategyItem.explanation?.hint || "Check the clue in the example before deciding.");

    const verifyIndex = (index + 2) % 3;
    verifyTest.push({
      ...strategyItem,
      bank:"test",
      stage:"verify",
      skill:`${String(code).toLowerCase()}_${String(index+1).padStart(2,"0")}_test_verify`,
      question:`A classmate is unsure about this example. Which tip would help them check it carefully?`,
      audio_prompt:"A classmate is unsure about this example. Which tip would help them check it carefully?",
      answers:makeAnswers(goodStrategy, wrong, verifyIndex),
      correct_index:verifyIndex,
      explanation:{ summary:`${goodStrategy} is the useful check. ${hint}`, hint }
    });

    const applyIndex = index % 3;
    const weak = wrong[0] || "Guess without checking the example.";
    applyTest.push({
      ...answerItem,
      bank:"test",
      stage:"apply",
      skill:`${String(code).toLowerCase()}_${String(index+1).padStart(2,"0")}_test_apply`,
      question:`A classmate chose “${clean(weak)}”. Which answer would improve their response?`,
      audio_prompt:`A classmate chose ${clean(weak)}. Which answer would improve their response?`,
      answers:makeAnswers(goodAnswer, wrong, applyIndex),
      correct_index:applyIndex,
      explanation:{ summary:`${goodAnswer} is the stronger response because it uses the target skill. ${hint}`, hint }
    });
  }

  const test = [...genuineTest, ...verifyTest, ...applyTest].map((item, index) => ({
    ...item,
    id:`${item.curriculum_code || item.curriculumCode}-T-${String(index + 1).padStart(3,"0")}`,
    bank:"test"
  }));

  const finalItems = [...practice, ...test];
  if (practice.length !== 40 || test.length !== 16) throw new Error(`${name}: expected rebuilt 40/16 split`);
  fs.writeFileSync(file, `${JSON.stringify(finalItems, null, 2)}\n`);

  const qaPath = path.join(BANK_ROOT, name.replace(/\.json$/i, "-qa-log.json"));
  const qa = fs.existsSync(qaPath) ? JSON.parse(fs.readFileSync(qaPath, "utf8")) : {};
  qa.practice = 40;
  qa.test = 16;
  qa.items = 56;
  qa.progression = ["recognise","explain","discriminate","apply"];
  qa.source = "Existing authored Year 1 English curriculum bank and lesson model";
  qa.fixes = [
    "Rebuilt Practice as 40 three-option questions ordered from recognition to independent application.",
    "Kept Test examples on a separate genuine authored source range and removed generic Quick Read test templates.",
    "Used misconception-based distractors and child-facing hints rather than teacher-facing rubric language.",
    "Kept answer positions balanced and retained read-aloud prompts plus accessible visual organisers."
  ];
  fs.writeFileSync(qaPath, `${JSON.stringify(qa, null, 2)}\n`);
}

execFileSync(process.execPath, ["scripts/publish_year1_english_quality_banks.mjs"], { cwd:ROOT, stdio:"inherit" });

for (const name of bankFiles) {
  const code = name.replace(/\.json$/i, "");
  const route = path.join(QUIZ_ROOT, code);
  const activityPath = path.join(route, "index.html");
  if (fs.existsSync(activityPath)) {
    let html = fs.readFileSync(activityPath, "utf8");
    html = html
      .replace(/Practice draws from 24 questions, while Test uses a separate 16-question bank\./g, "Practice contains 40 progressive questions, while Test uses a separate 16-question bank.")
      .replace(/24 Practice questions/g, "40 Practice questions")
      .replace(/24 questions/g, "40 questions");
    fs.writeFileSync(activityPath, html);
  }

  const practicePath = path.join(route, "practice", "index.html");
  if (fs.existsSync(practicePath)) {
    let html = fs.readFileSync(practicePath, "utf8");
    html = html
      .replace(/Practise Year 1 ([^<\"]+) with rotating questions from a 24-question bank\./g, "Practise Year 1 $1 with 40 progressive curriculum-aligned questions.")
      .replace(/<span class="summary-number" id="questionCount">\d+<\/span><span class="summary-label">Questions this attempt<\/span>/, '<span class="summary-number" id="questionCount">40</span><span class="summary-label">Questions this attempt</span>')
      .replace(/<span class="summary-number">24<\/span><span class="summary-label">Question bank<\/span>/, '<span class="summary-number">40</span><span class="summary-label">Question bank</span>')
      .replace(/"maxQuestions":\d+/, '"maxQuestions":40')
      .replace(/"shuffleQuestions":true/, '"shuffleQuestions":false')
      .replace(/"questionCycle":true/, '"questionCycle":false')
      .replace(/24-question/gi, "40-question")
      .replace(/24 questions/gi, "40 questions")
      .replace(/rotating questions/gi, "progressive questions");
    fs.writeFileSync(practicePath, html);
  }
}

for (const name of bankFiles) {
  const json = JSON.parse(fs.readFileSync(path.join(BANK_ROOT, name), "utf8"));
  const practice = json.filter((item) => item.bank === "practice");
  const test = json.filter((item) => item.bank === "test");
  const stages = practice.map((item) => item.stage);
  if (practice.length !== 40 || test.length !== 16) throw new Error(`${name}: final bank count failed`);
  for (const [stage, start] of [["recognise",0],["explain",10],["discriminate",20],["apply",30]]) {
    if (stages.slice(start,start+10).some((value) => value !== stage)) throw new Error(`${name}: ${stage} progression block failed`);
  }
  const questionJs = path.join(QUIZ_ROOT, name.replace(/\.json$/i,""), "practice", "questions.js");
  if (!fs.existsSync(questionJs)) throw new Error(`${name}: published practice questions.js missing`);
}

console.log(JSON.stringify({ codes:bankFiles.length, practicePerCode:40, testPerCode:16, totalPractice:bankFiles.length*40, status:"YEAR1_ENGLISH_STUDENT_FACING_READY" }, null, 2));
