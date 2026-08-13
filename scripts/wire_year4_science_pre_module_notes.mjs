import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const context = vm.createContext({ window: {} });
for (const relativePath of [
  "assets/year4-subject-data-base.js",
  "assets/year4-science-data.js",
  "assets/year4-science-topic-modules.js"
]) {
  vm.runInContext(fs.readFileSync(path.join(root, relativePath), "utf8"), context, { filename: relativePath });
}
const codes = Object.keys(context.window.SkillrYear4ScienceTopicSource || {}).sort();
const noteAsset = '<script src="/quiz/assets/year4-science-pre-module-notes.js?v=20260814-1"></script>';

if (codes.length !== 12) throw new Error(`Expected 12 completed Year 4 Science modules, found ${codes.length}`);

function parseConfig(html, relativePath) {
  const match = html.match(/window\.quizConfig=(\{.*?\});<\/script>/s);
  if (!match) throw new Error(`${relativePath}: quiz config not found`);
  return JSON.parse(match[1]);
}

function assertProtectedConfig(config, code, mode, relativePath) {
  const isPractice = mode === "practice";
  if (
    config.skillCode !== code ||
    config.maxQuestions !== (isPractice ? 8 : 12) ||
    config.shuffleQuestions !== true ||
    config.shuffleAnswers !== true ||
    config.questionCycle !== true ||
    config.preReadSeconds !== 0 ||
    config.requireStudentName !== !isPractice ||
    config.certificateOnPass !== !isPractice
  ) throw new Error(`${relativePath}: protected quiz configuration differs from the completed release`);
}

function assertBank(code, mode) {
  const relativePath = `quiz/year-4/science/${code.toLowerCase()}/${mode}/questions.js`;
  const bankWindow = { location: { pathname: `/${relativePath}` } };
  vm.runInNewContext(fs.readFileSync(path.join(root, relativePath), "utf8"), { window: bankWindow }, { filename: relativePath });
  const bank = mode === "practice" ? bankWindow.skillrPracticeQuestions : bankWindow.skillrTestQuestions;
  const expectedLength = mode === "practice" ? 24 : 16;
  if (!Array.isArray(bank) || bank.length !== expectedLength || bank.some((question) => question.curriculumCode !== code)) {
    throw new Error(`${relativePath}: protected ${expectedLength}-question source bank is invalid`);
  }
}

for (const code of codes) {
  for (const mode of ["practice", "test"]) {
    const relativePath = `quiz/year-4/science/${code.toLowerCase()}/${mode}/index.html`;
    const filePath = path.join(root, relativePath);
    let html = fs.readFileSync(filePath, "utf8");
    assertProtectedConfig(parseConfig(html, relativePath), code, mode, relativePath);
    assertBank(code, mode);
    if (!html.includes('"preModuleNotesRequired":true')) {
      html = html.replace(/"preReadSeconds":0,/, '"preReadSeconds":0,"preModuleNotesRequired":true,');
    }
    if (!html.includes(noteAsset)) {
      html = html.replace(
        /<script src="\/quiz\/assets\/script\.js\?v=\d+"><\/script>/,
        `${noteAsset}<script src="/quiz/assets/script.js?v=114"></script>`
      );
    }
    html = html
      .replace(/\/quiz\/assets\/style\.css\?v=\d+/, "/quiz/assets/style.css?v=114")
      .replace(/\/quiz\/assets\/script\.js\?v=\d+/, "/quiz/assets/script.js?v=114");
    const finalConfig = parseConfig(html, relativePath);
    assertProtectedConfig(finalConfig, code, mode, relativePath);
    if (
      finalConfig.preModuleNotesRequired !== true ||
      (html.match(/year4-science-pre-module-notes\.js\?v=20260814-1/g) || []).length !== 1
    ) throw new Error(`${relativePath}: pre-module wiring could not be applied`);
    fs.writeFileSync(filePath, html, "utf8");
  }
}

console.log(`Wired shared pre-module notes into ${codes.length * 2} Year 4 Science Practice/Test routes.`);
