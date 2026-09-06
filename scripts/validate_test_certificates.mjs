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
  assert.doesNotMatch(html, /certificateOnPass|certificateButton|Print certificate/i, `${file}: certificate feature must stay paused`);
  assert.match(html, /"?passingPercent"?\s*:\s*75/, `${file}: expected the 75% pass mark`);
}

for (const file of resultPages) {
  const html = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(html, /certificateButton|Print certificate|Completion Certificate/i, `${file}: result certificate action must stay paused`);
  assert.match(html, /\/quiz\/assets\/separate-result\.js/, `${file}: missing shared result handler`);
}

const quizScript = fs.readFileSync(path.join(quizRoot, "assets", "script.js"), "utf8");
const resultScript = fs.readFileSync(path.join(quizRoot, "assets", "separate-result.js"), "utf8");

for (const [label, source] of [["Quiz", quizScript], ["Result", resultScript]]) {
  assert.doesNotMatch(source, /certificateOnPass|certificateButton|Print certificate|Completion Certificate/i, `${label} script must not expose certificate UI`);
}

console.log(JSON.stringify({
  testPages: testPages.length,
  resultPages: resultPages.length,
  certificates: "paused",
  status: "passed"
}));
