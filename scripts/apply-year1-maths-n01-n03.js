"use strict";

const fs = require("fs");
const path = require("path");

const codes = {
  AC9M1N01: {
    slug: "ac9m1n01-numbers-to-120",
    title: "Numbers to 120"
  },
  AC9M1N02: {
    slug: "ac9m1n02-partitioning-tens-and-ones",
    title: "Partitioning Tens and Ones"
  },
  AC9M1N03: {
    slug: "ac9m1n03-skip-counting-and-equal-groups",
    title: "Skip Counting and Equal Groups"
  }
};

function updateFile(file, transform) {
  if (!fs.existsSync(file)) {
    throw new Error(`Required file not found: ${file}`);
  }
  const before = fs.readFileSync(file, "utf8");
  const after = transform(before);
  if (before === after) {
    console.log(`No content change needed: ${file}`);
    return;
  }
  fs.writeFileSync(file, after);
  console.log(`Updated ${file}`);
}

for (const [code, meta] of Object.entries(codes)) {
  const low = code.toLowerCase();
  const topic = path.join("year1", "maths", meta.slug, "index.html");

  updateFile(topic, (html) => {
    const quizHref = `/quiz/year-1/math/${low}/quiz/`;
    if (!html.includes(quizHref)) {
      const testLink = `<a href="/quiz/year-1/math/${low}/test/">Test</a>`;
      const quizLink = `${testLink}<a href="${quizHref}">Quiz</a>`;
      if (!html.includes(testLink)) {
        throw new Error(`${topic}: Test action link marker not found`);
      }
      html = html.replace(testLink, quizLink);
    }

    html = html.replace(
      "Students can then use the worksheet for written work, open Practice for supported feedback, or take the Test when they are ready.",
      "Students can then use the worksheet for written work, open Practice for supported feedback, take the Test when they are ready, or use the Quiz for a larger mixed review."
    );
    return html;
  });
}

const extensionScript = '<script src="/quiz/assets/daily-drills/year1-maths-n01-n03-extensions.js?v=1"></script>\n';
for (const drill of [
  "quiz/year-1/daily-drills/math/numbers-place-value-to-120/index.html",
  "quiz/year-1/daily-drills/math/skip-counting-equal-groups/index.html"
]) {
  updateFile(drill, (html) => {
    if (html.includes("year1-maths-n01-n03-extensions.js")) return html;
    const marker = '<script src="/quiz/assets/daily-drills/daily-drill-selector.js';
    const index = html.indexOf(marker);
    if (index < 0) throw new Error(`${drill}: Daily Drill selector marker not found`);
    return html.slice(0, index) + extensionScript + html.slice(index);
  });
}

updateFile("service-worker.js", (source) => {
  source = source
    .replace(/skillrhub-pwa-v\d+/g, "skillrhub-pwa-v9")
    .replace(/skillrhub-static-v\d+/g, "skillrhub-static-v7");

  const extensionPath =
    '      url.pathname === "/quiz/assets/daily-drills/year1-maths-n01-n03-extensions.js" ||\n';

  if (!source.includes("year1-maths-n01-n03-extensions.js")) {
    const marker =
      '      url.pathname === "/quiz/assets/daily-drills/science-master-questions.js" ||\n';
    if (!source.includes(marker)) {
      throw new Error("service-worker.js: network-first insertion marker not found");
    }
    source = source.replace(marker, marker + extensionPath);
  }
  return source;
});
