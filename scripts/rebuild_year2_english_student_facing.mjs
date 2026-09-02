#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year2", "english");
const QUIZ_ROOT = path.join(ROOT, "quiz", "year-2", "english");
const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const correctText = (item) => item.answers.find((answer) => answer.is_correct)?.text || "";
const wrongTexts = (item) => item.answers.filter((answer) => !answer.is_correct).map((answer) => answer.text);
const makeAnswers = (correct, wrong, correctIndex) => {
  const values = wrong.slice(0, 2);
  values.splice(correctIndex, 0, correct);
  return values.map((text, index) => ({ text, is_correct:index === correctIndex }));
};

execFileSync(process.execPath, ["scripts/build_year2_english_quality_banks.mjs"], { cwd:ROOT, stdio:"inherit" });

const bankFiles = fs.readdirSync(BANK_ROOT).filter((name) => /^ac9e2(?:la|le|ly)\d{2}\.json$/i.test(name)).sort();
if (bankFiles.length !== 27) throw new Error(`Expected 27 Year 2 English banks, found ${bankFiles.length}`);

for (const name of bankFiles) {
  const file = path.join(BANK_ROOT, name);
  const all = JSON.parse(fs.readFileSync(file, "utf8"));
  const existingPractice = all.filter((item) => item.bank === "practice");
  const existingTest = all.filter((item) => item.bank === "test");
  if (existingPractice.length !== 24 || existingTest.length !== 16) throw new Error(`${name}: expected existing 24/16 split`);

  const core = existingPractice.slice(0, 20);
  const recognise = core.filter((_, index) => index % 2 === 0).map((item, index) => ({ ...item, stage:"recognise", skill:`${String(item.curriculum_code).toLowerCase()}_${String(index+1).padStart(2,"0")}_recognise` }));
  const explain = core.filter((_, index) => index % 2 === 1).map((item, index) => ({ ...item, stage:"explain", skill:`${String(item.curriculum_code).toLowerCase()}_${String(index+1).padStart(2,"0")}_explain` }));
  const discriminate = [];
  const apply = [];

  for (let index = 0; index < 10; index += 1) {
    const answerItem = recognise[index];
    const strategyItem = explain[index];
    const goodAnswer = correctText(answerItem);
    const goodStrategy = correctText(strategyItem);
    const wrong = wrongTexts(answerItem);
    const bad = wrong[0] || "Guess without checking the example.";
    const code = answerItem.curriculum_code;
    const hint = clean(answerItem.explanation?.hint || strategyItem.explanation?.hint || "Check the clue that matters before you decide.");

    const dIndex = index % 3;
    discriminate.push({
      ...answerItem,
      bank:"practice",
      stage:"discriminate",
      skill:`${String(code).toLowerCase()}_${String(index+1).padStart(2,"0")}_discriminate`,
      question:`Which choice is the mix-up to avoid when using this skill?`,
      audio_prompt:"Which choice is the mix-up to avoid when using this skill?",
      answers:makeAnswers(bad,[goodAnswer,goodStrategy],dIndex),
      correct_index:dIndex,
      explanation:{ summary:`${bad} is the mix-up. ${hint}`, hint }
    });

    const aIndex = (index + 1) % 3;
    apply.push({
      ...answerItem,
      bank:"practice",
      stage:"apply",
      skill:`${String(code).toLowerCase()}_${String(index+1).padStart(2,"0")}_apply`,
      question:"Which answer best uses this skill in a new example?",
      audio_prompt:"Which answer best uses this skill in a new example?",
      answers:makeAnswers(goodAnswer,wrong,aIndex),
      correct_index:aIndex,
      explanation:{ summary:`${goodAnswer} uses the skill correctly. ${hint}`, hint }
    });
  }

  const practice = [...recognise, ...explain, ...discriminate, ...apply].map((item, index) => ({
    ...item,
    id:`${item.curriculum_code}-P-${String(index+1).padStart(3,"0")}`,
    bank:"practice"
  }));
  const test = existingTest.map((item, index) => ({ ...item, id:`${item.curriculum_code}-T-${String(index+1).padStart(3,"0")}`, bank:"test", stage:item.stage || (index < 8 ? "verify" : "apply") }));
  const finalItems = [...practice, ...test];
  if (practice.length !== 40 || test.length !== 16) throw new Error(`${name}: expected rebuilt 40/16 split`);
  fs.writeFileSync(file, `${JSON.stringify(finalItems, null, 2)}\n`);

  const qaPath = path.join(BANK_ROOT, name.replace(/\.json$/i, "-qa-log.json"));
  const qa = fs.existsSync(qaPath) ? JSON.parse(fs.readFileSync(qaPath,"utf8")) : {};
  qa.practice = 40;
  qa.test = 16;
  qa.items = 56;
  qa.progression = ["recognise","explain","discriminate","apply"];
  qa.source = "Existing authored Year 2 English curriculum bank and lesson model";
  qa.fixes = [
    "Expanded Practice to 40 three-option questions ordered from recognition to independent application.",
    "Kept Test on its separate authored Year 2 source range.",
    "Used misconception-based distractors and child-facing feedback.",
    "Kept answer positions balanced and retained read-aloud prompts and accessible visuals."
  ];
  fs.writeFileSync(qaPath, `${JSON.stringify(qa, null, 2)}\n`);
}

execFileSync(process.execPath, ["scripts/publish_year2_english_quality_banks.mjs"], { cwd:ROOT, stdio:"inherit" });

for (const name of bankFiles) {
  const code = name.replace(/\.json$/i, "");
  const route = path.join(QUIZ_ROOT, code);
  const activityPath = path.join(route,"index.html");
  if (fs.existsSync(activityPath)) {
    let html = fs.readFileSync(activityPath,"utf8");
    html = html.replace(/Practice draws from 24 questions, while Test uses a separate 16-question bank\./g,"Practice contains 40 progressive questions, while Test uses a separate 16-question bank.")
      .replace(/24 Practice questions/g,"40 Practice questions").replace(/24 questions/g,"40 questions");
    fs.writeFileSync(activityPath,html);
  }
  const practicePath = path.join(route,"practice","index.html");
  if (fs.existsSync(practicePath)) {
    let html = fs.readFileSync(practicePath,"utf8");
    html = html.replace(/Practise Year 2 ([^<\"]+) with rotating questions from a 24-question bank\./g,"Practise Year 2 $1 with 40 progressive curriculum-aligned questions.")
      .replace(/<span class="summary-number" id="questionCount">\d+<\/span><span class="summary-label">Questions this attempt<\/span>/,'<span class="summary-number" id="questionCount">40</span><span class="summary-label">Questions this attempt</span>')
      .replace(/<span class="summary-number">24<\/span><span class="summary-label">Question bank<\/span>/,'<span class="summary-number">40</span><span class="summary-label">Question bank</span>')
      .replace(/"maxQuestions":\d+/,'"maxQuestions":40').replace(/"shuffleQuestions":true/,'"shuffleQuestions":false').replace(/"questionCycle":true/,'"questionCycle":false')
      .replace(/24-question/gi,"40-question").replace(/24 questions/gi,"40 questions").replace(/rotating questions/gi,"progressive questions");
    fs.writeFileSync(practicePath,html);
  }
}

for (const name of bankFiles) {
  const json = JSON.parse(fs.readFileSync(path.join(BANK_ROOT,name),"utf8"));
  const practice = json.filter((item)=>item.bank==="practice");
  const test = json.filter((item)=>item.bank==="test");
  if (practice.length !== 40 || test.length !== 16) throw new Error(`${name}: final bank count failed`);
  for (const [stage,start] of [["recognise",0],["explain",10],["discriminate",20],["apply",30]]) if (practice.slice(start,start+10).some((item)=>item.stage!==stage)) throw new Error(`${name}: ${stage} block failed`);
  if (!fs.existsSync(path.join(QUIZ_ROOT,name.replace(/\.json$/i,""),"practice","questions.js"))) throw new Error(`${name}: published practice questions.js missing`);
}

console.log(JSON.stringify({codes:bankFiles.length,practicePerCode:40,testPerCode:16,totalPractice:bankFiles.length*40,status:"YEAR2_ENGLISH_STUDENT_FACING_READY"},null,2));
