import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const quizRoot = path.join(root, "quiz");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(quizRoot);
const testPages = files.filter((file) => file.endsWith(`${path.sep}test${path.sep}index.html`));
const resultPages = files.filter((file) => file.endsWith(`${path.sep}test${path.sep}result${path.sep}index.html`));

assert.ok(testPages.length > 0, "No test pages found");
assert.equal(resultPages.length, testPages.length, "Every test needs a result page");

for (const file of testPages) {
  const html = fs.readFileSync(file, "utf8");
  assert.match(html, /"certificateOnPass":true/, `${file}: certificate must be enabled`);
  assert.match(html, /"passingPercent":75/, `${file}: expected the 75% pass mark`);
}

for (const file of resultPages) {
  const html = fs.readFileSync(file, "utf8");
  assert.match(html, /id="certificateButton"/, `${file}: missing certificate action`);
  assert.match(html, /\/quiz\/assets\/separate-result\.js/, `${file}: missing shared certificate handler`);
}

const quizScript = fs.readFileSync(path.join(quizRoot, "assets", "script.js"), "utf8");
const resultScript = fs.readFileSync(path.join(quizRoot, "assets", "separate-result.js"), "utf8");

assert.match(quizScript, /percentage <= passingPercent/, "Embedded results must require a score above 75%");
assert.match(resultScript, /Number\(data\.percentage\) > 75/, "Separate results must require a score above 75%");
assert.match(quizScript, /size: Letter portrait/, "Embedded certificate must print on US Letter");
assert.match(resultScript, /size:Letter portrait/, "Separate certificate must print on US Letter");
assert.match(resultScript, /removeAttribute\("onclick"\)/, "Separate result must replace legacy page printing");

for (const [label, source] of [["Embedded", quizScript], ["Separate", resultScript]]) {
  assert.match(source, /SkillrHub Learn and Grow/, `${label} certificate needs the accessible Learn & Grow brand mark`);
  assert.match(source, /mark-s/, `${label} certificate needs the S monogram`);
  assert.match(source, /mark-h/, `${label} certificate needs the H monogram`);
  assert.match(source, /mark-book/, `${label} certificate needs the open-book motif`);
  assert.match(source, /Educational Focus/, `${label} certificate needs the educational footer item`);
  assert.match(source, /Free Resources/, `${label} certificate needs the free-resources footer item`);
  assert.match(source, /For Everyone/, `${label} certificate needs the inclusion footer item`);
  assert.match(source, /Built with Purpose/, `${label} certificate needs the purpose footer item`);
}

console.log(JSON.stringify({
  testPages: testPages.length,
  resultPages: resultPages.length,
  certificateThreshold: ">75%",
  printSize: "US Letter portrait",
  status: "passed"
}));
