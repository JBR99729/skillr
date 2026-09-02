#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const errors = [];
const context = { window:{} };
vm.createContext(context);
for (const file of ["assets/year1-english-data.js","assets/year1-english-student-facing.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT,file),"utf8"), context, { filename:file });
}

const units = context.window.SkillrYear1EnglishData || {};
const worksheets = context.window.SkillrYear1EnglishWorksheetData || {};
const codes = Object.keys(units).filter((code) => /^AC9E1(?:LA|LE|LY)\d{2}$/.test(code)).sort();
if (codes.length !== 30) errors.push(`Expected 30 Year 1 English codes, found ${codes.length}`);

const teacherFacing = /\b(?:rubric|marking key|teacher should|teacher does|students must demonstrate|award \d+ marks?|criterion)\b/i;
for (const code of codes) {
  const unit = units[code];
  const worksheet = worksheets[code];
  if (!/^I can\b/i.test(unit.childGoal || "")) errors.push(`${code}: missing child-facing I can goal`);
  if (!Array.isArray(unit.studentFacingFocus) || unit.studentFacingFocus.length < 1) errors.push(`${code}: missing curriculum focus points`);
  if (teacherFacing.test(`${unit.childGoal} ${(unit.studentFacingFocus || []).join(" ")}`)) errors.push(`${code}: teacher/rubric language in student-facing topic source`);
  if (!worksheet || !Array.isArray(worksheet.questions) || worksheet.questions.length !== 10) errors.push(`${code}: worksheet must contain 10 questions`);
  if (worksheet?.questions?.filter((item) => item.enrichment).length !== 2) errors.push(`${code}: worksheet must contain 2 extension questions`);

  const bankFile = path.join(ROOT,"assets","assessment-banks","year1","english",`${code.toLowerCase()}.json`);
  if (!fs.existsSync(bankFile)) { errors.push(`${code}: bank JSON missing`); continue; }
  const items = JSON.parse(fs.readFileSync(bankFile,"utf8"));
  const practice = items.filter((item) => item.bank === "practice");
  const test = items.filter((item) => item.bank === "test");
  if (practice.length !== 40) errors.push(`${code}: expected 40 practice questions, found ${practice.length}`);
  if (test.length !== 16) errors.push(`${code}: expected 16 test questions, found ${test.length}`);
  const expected = [["recognise",0],["explain",10],["discriminate",20],["apply",30]];
  for (const [stage,start] of expected) if (practice.slice(start,start+10).some((item) => item.stage !== stage)) errors.push(`${code}: ${stage} stage is not a 10-question block`);
  for (const item of practice) {
    if (!Array.isArray(item.answers) || item.answers.length !== 3) errors.push(`${code}/${item.id}: practice item must have 3 answers`);
    if (item.answers?.filter((answer) => answer.is_correct).length !== 1) errors.push(`${code}/${item.id}: practice item must have exactly 1 correct answer`);
    const text = `${item.question || ""} ${item.explanation?.summary || ""} ${item.explanation?.hint || ""}`;
    if (teacherFacing.test(text)) errors.push(`${code}/${item.id}: teacher/rubric language found`);
  }
  const practiceQuestions = new Set(practice.map((item) => String(item.question).trim().toLowerCase()));
  const duplicates = test.filter((item) => practiceQuestions.has(String(item.question).trim().toLowerCase()));
  if (duplicates.length) errors.push(`${code}: ${duplicates.length} test prompts exactly duplicate practice prompts`);
}

if (errors.length) {
  console.error(`Year 1 English student-facing validation failed (${errors.length} issue${errors.length===1?"":"s"}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Year 1 English student-facing validation: PASS (${codes.length} codes, ${codes.length*40} practice questions, ${codes.length*10} worksheet questions).`);
