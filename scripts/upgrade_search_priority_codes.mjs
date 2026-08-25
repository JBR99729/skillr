import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const profiles = [
  { year: 3, subject: "math", code: "ac9m3m04", title: "Telling Time: Analogue and Digital Clocks", description: "Read analogue and digital clocks to the nearest minute, including the moving hour hand.", notes: ["Read the minute hand first: count by fives, then count the extra minute marks.", "Use the hour that has just started. At 3:23, the hour hand is between 3 and 4, so the hour is 3.", "Common trap: the hour hand moves continuously; it is not fixed on 3 for the whole hour."] },
  { year: 3, subject: "math", code: "ac9m3m03", title: "Time Units, Estimation and Duration", description: "Choose sensible units of time, estimate and compare duration, and plan events.", notes: ["Choose a sensible unit before estimating: seconds for a sprint, minutes for reading, hours for a long activity.", "Estimate first, measure with a timer, then compare and explain whether the estimate was reasonable.", "Common trap: one hour is 60 minutes, not 100 minutes."] },
  { year: 8, subject: "science", code: "ac9s8i06", title: "Evaluate Methods, Conclusions and Claims", description: "Analyse assumptions, error, conflicting evidence and unanswered questions in scientific claims.", notes: ["Separate the claim from the evidence: ask what result actually supports the conclusion.", "Check the method for controlled variables, sample size, precision and possible sources of error.", "Common trap: a result can be consistent with a claim without proving it beyond doubt."] },
  { year: 1, subject: "math", code: "ac9m1m03", title: "Time Duration and Event Sequences", description: "Compare and sequence familiar events using everyday time language and duration.", notes: ["Describe events as shorter, longer or about the same, using familiar routines as evidence.", "Put events in a sensible order and explain what happens first, next and last.", "Common trap: a clock time tells when something starts; duration tells how long it lasts."] },
  { year: 4, subject: "math", code: "ac9m4m03", title: "Duration, Timetables and Time Conversions", description: "Solve practical duration problems using units of time, timetables and am/pm.", notes: ["Write the start and finish times, then bridge across the hour or use a timeline.", "Convert to a common unit only when it makes comparison or calculation clearer.", "Common trap: 1:30 can mean one minute 30 seconds on a timer, but half past one on a clock—use the context."] },
  { year: 7, subject: "science", code: "ac9s7i06", title: "Evaluate Methods, Conclusions and Claims", description: "Evaluate data quality, assumptions, error and conflicting evidence in science investigations.", notes: ["Identify the conclusion, then point to the specific data or observation used as evidence.", "Ask what could make the method less fair, precise or reliable, and propose a targeted improvement.", "Common trap: do not call a method unreliable without explaining which feature creates the problem."] },
  { year: 5, subject: "english", code: "ac9e5ly06", title: "Create, Edit and Publish Multimodal Texts", description: "Plan, create, edit and publish written and multimodal texts for a clear purpose and audience.", notes: ["Decide the purpose and audience before choosing a text structure, words, images or layout.", "Edit for one clear improvement at a time: ideas, organisation, sentences, vocabulary, spelling or visual design.", "Common trap: adding images is not automatically multimodal communication—each choice should help the audience understand."] },
  { year: 2, subject: "math", code: "ac9m2n03", title: "Fractions: Halves, Quarters and Eighths", description: "Recognise equal parts and connect halves, quarters and eighths through repeated halving.", notes: ["A fraction describes equal parts of one whole; check that every part is the same size.", "Repeated halving connects one whole to halves, quarters and eighths.", "Common trap: more pieces do not mean more of the whole—eighths are smaller than quarters."] },
];

function bankCount(file, name) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context);
  const questions = context.window[name] ?? context.window.quizQuestions;
  if (!Array.isArray(questions) || !questions.length) throw new Error(`Could not count ${file}`);
  return questions.length;
}

function notes(profile) {
  return `<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul>${profile.notes.map((note) => `<li>${note}</li>`).join("")}</ul></section>`;
}

for (const profile of profiles) {
  const route = path.join(root, "quiz", `year-${profile.year}`, profile.subject, profile.code);
  const practiceCount = bankCount(path.join(route, "practice/questions.js"), "skillrPracticeQuestions");
  const testCount = bankCount(path.join(route, "test/questions.js"), "skillrTestQuestions");
  const subjectName = profile.subject === "math" ? "Maths" : profile.subject[0].toUpperCase() + profile.subject.slice(1);

  for (const [kind, count] of [["practice", practiceCount], ["test", testCount]]) {
    const file = path.join(route, kind, "index.html");
    const relative = path.relative(root, file).replaceAll(path.sep, "/");
    const baseline = execFileSync("git", ["show", `HEAD:${relative}`], { cwd: root, encoding: "utf8" });
    const originalBank = baseline.match(/<span class="summary-number">(\d+)<\/span><span class="summary-label">([^<]*question bank)<\/span>/i);
    const displayedCount = Number(originalBank?.[1] ?? count);
    let html = fs.readFileSync(file, "utf8");
    const activity = kind === "practice" ? "Practice" : "Test";
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${profile.code.toUpperCase()} ${profile.title} ${activity} | Free Year ${profile.year} ${subjectName} | SkillrHub</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Free Year ${profile.year} ${subjectName} ${profile.code.toUpperCase()} ${activity.toLowerCase()}: ${profile.description} ${displayedCount} curriculum-aligned questions with feedback.">`)
      .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, notes(profile));
    if (originalBank) {
      html = html.replace(/(<span class="summary-number">)\d+(<\/span><span class="summary-label">[^<]*question bank<\/span>)/i, `$1${originalBank[1]}$2`);
    }
    fs.writeFileSync(file, html);
  }
}

console.log(`Upgraded ${profiles.length} search-priority code learning paths.`);
