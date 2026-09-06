import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const context = vm.createContext({ window: {} });

for (const name of ["base", "n1", "n2", "n3", "a", "m1", "m2", "sp", "st", "p"]) {
  const relativePath = `assets/year3-maths-data-${name}.js`;
  vm.runInContext(
    fs.readFileSync(path.join(root, relativePath), "utf8"),
    context,
    { filename: relativePath }
  );
}

const codes = Object.keys(context.window.SkillrYear3MathsData || {})
  .filter((code) => /^AC9M3/.test(code))
  .sort();
const noteAsset = '<script src="/quiz/assets/year3-maths-pre-module-notes.js?v=20260814-1"></script>';

function parseConfig(html, relativePath) {
  const match = html.match(/window\.quizConfig=(\{.*?\});<\/script>/s);
  if (!match) throw new Error(`${relativePath}: quiz config not found`);
  return JSON.parse(match[1]);
}

function assertPreservedConfig(config, code, mode, relativePath) {
  const isPractice = mode === "practice";
  const expectedCount = isPractice ? 8 : 12;
  if (
    config.skillCode !== code ||
    config.maxQuestions !== expectedCount ||
    config.shuffleQuestions !== true ||
    config.shuffleAnswers !== true ||
    config.questionCycle !== true ||
    config.preReadSeconds !== 0 ||
    config.requireStudentName !== !isPractice ||
    config.certificateOnPass !== !isPractice
  ) {
    throw new Error(`${relativePath}: protected quiz configuration differs from the completed release`);
  }
}

function assertBank(code, mode) {
  const relativePath = `quiz/year-3/math/${code.toLowerCase()}/${mode}/questions.js`;
  const bankWindow = { location: { pathname: `/${relativePath}` } };
  vm.runInNewContext(
    fs.readFileSync(path.join(root, relativePath), "utf8"),
    { window: bankWindow },
    { filename: relativePath }
  );
  const bank = mode === "practice"
    ? bankWindow.skillrPracticeQuestions
    : bankWindow.skillrTestQuestions;
  const expectedLength = mode === "practice" ? 24 : 16;
  if (
    !Array.isArray(bank) ||
    bank.length !== expectedLength ||
    bank.some((question) => question.curriculumCode !== code)
  ) {
    throw new Error(`${relativePath}: protected ${expectedLength}-question source bank is invalid`);
  }
}

if (codes.length !== 23) {
  throw new Error(`Expected 23 completed Year 3 Maths modules, found ${codes.length}`);
}

for (const code of codes) {
  for (const mode of ["practice", "test"]) {
    const relativePath = `quiz/year-3/math/${code.toLowerCase()}/${mode}/index.html`;
    const filePath = path.join(root, relativePath);
    let html = fs.readFileSync(filePath, "utf8");
    assertPreservedConfig(parseConfig(html, relativePath), code, mode, relativePath);
    assertBank(code, mode);

    if (!html.includes('"preModuleNotesRequired":true')) {
      html = html.replace(
        /"preReadSeconds":0,/,
        '"preReadSeconds":0,"preModuleNotesRequired":true,'
      );
    }
    if (!html.includes(noteAsset)) {
      html = html.replace(
        /<script src="\/quiz\/assets\/script\.js\?v=\d+"><\/script>/,
        `${noteAsset}<script src="/quiz/assets/script.js?v=115"></script>`
      );
    }

    html = html
      .replace(/\/quiz\/assets\/style\.css\?v=\d+/, "/quiz/assets/style.css?v=115")
      .replace(/\/quiz\/assets\/script\.js\?v=\d+/, "/quiz/assets/script.js?v=115");

    const finalConfig = parseConfig(html, relativePath);
    assertPreservedConfig(finalConfig, code, mode, relativePath);
    if (
      finalConfig.preModuleNotesRequired !== true ||
      (html.match(/year3-maths-pre-module-notes\.js\?v=20260814-1/g) || []).length !== 1
    ) {
      throw new Error(`${relativePath}: pre-module wiring could not be applied`);
    }
    fs.writeFileSync(filePath, html, "utf8");
  }
}

console.log(`Wired shared pre-module notes into ${codes.length * 2} Year 3 Maths Practice/Test routes.`);
