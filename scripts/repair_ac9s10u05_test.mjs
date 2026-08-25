import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const testRoot = path.join(root, "quiz/year-10/science/ac9s10u05/test");
const quickRead = `<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul><li>A non-zero net force causes acceleration; use <strong>F<sub>net</sub> = ma</strong> to relate force, mass and acceleration.</li><li><strong>Example:</strong> A 4 kg trolley with a net force of 12 N accelerates at 3 m/s².</li><li><strong>Common trap:</strong> Action–reaction forces are equal and opposite, but they act on different objects, so they do not cancel on one object.</li></ul></section>`;

for (const relativePath of ["index.html", "retake/index.html", "result/index.html", "review/index.html"]) {
  const file = path.join(testRoot, relativePath);
  let html = fs.readFileSync(file, "utf8");
  html = html
    .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, quickRead)
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Year 10 Science AC9S10U05 test: 8 rotating questions from a 16-question Newton’s Laws bank.">')
    .replace("AC9S10U05 Maths</a>", "AC9S10U05 Science</a>")
    .replace("/year10/maths/ac9s10u05-situations-including-financial-contexts-that-use-integers/", "/year10/science/ac9s10u05-investigate-newton-s-laws-of-motion-and-quantitatively-analyse/");
  if (relativePath === "index.html") {
    html = html
      .replace(/(<span class="summary-number" id="questionCount">)\d+(<\/span>)/, "$18$2")
      .replace(/(<span class="summary-number">)\d+(<\/span><span class="summary-label">Question bank<\/span>)/, "$116$2");
  }
  fs.writeFileSync(file, html);
}

console.log("Repaired AC9S10U05 assessment path.");
