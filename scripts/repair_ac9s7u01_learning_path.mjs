import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const unitRoot = path.join(root, "quiz/year-7/science/ac9s7u01");
const topicUrl = "/year7/science/ac9s7u01-investigate-the-role-of-classification-in-ordering-and/";
const quickRead = `<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul><li>Classification helps scientists identify, name and organise biodiversity using observable features and shared conventions.</li><li><strong>Example:</strong> In a dichotomous key, choose one of two clear, observable features at each step, such as “has feathers / does not have feathers”.</li><li><strong>Common trap:</strong> A key is not a guess. Use mutually exclusive, evidence-based choices and check that the organism follows one complete path.</li></ul></section>`;

for (const kind of ["practice", "test"]) {
  for (const relativePath of ["index.html", "retake/index.html", "result/index.html", "review/index.html"]) {
    const file = path.join(unitRoot, kind, relativePath);
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, quickRead)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Year 7 Science AC9S7U01 ${kind}: classification, dichotomous keys and scientific naming.">`)
      .replace("AC9S7U01 Maths</a>", "AC9S7U01 Science</a>")
      .replace(/\/year7\/maths\/ac9s7u01-[^"]*?\//, topicUrl);
    if (relativePath === "index.html") {
      const bankCount = kind === "practice" ? 40 : 31;
      html = html
        .replace(/(<span class="summary-number" id="questionCount">)\d+(<\/span>)/, "$18$2")
        .replace(/(<span class="summary-number">)\d+(<\/span><span class="summary-label">Question bank<\/span>)/, `$1${bankCount}$2`);
    }
    fs.writeFileSync(file, html);
  }
}

console.log("Repaired AC9S7U01 Practice and Test learning paths.");
