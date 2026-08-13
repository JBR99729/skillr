import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const topicRoot = path.join(ROOT, "year4", "science");
const quizRoot = path.join(ROOT, "quiz", "year-4", "science");
const topicScripts = `<script src="/assets/year4-subject-data-base.js?v=1"></script>\n<script src="/assets/year4-science-data.js?v=1"></script>\n<script src="/assets/year4-science-topic-modules.js?v=2"></script>\n<script src="/assets/year4-science-topic-render.js?v=2"></script>\n`;
const worksheetScripts = `<script src="/assets/year4-subject-data-base.js?v=1"></script>\n<script src="/assets/year4-science-data.js?v=1"></script>\n<script src="/assets/year4-science-topic-modules.js?v=2"></script>\n<script src="/assets/year4-science-worksheet.js?v=2"></script>\n`;

const topicFiles = fs.readdirSync(topicRoot, { withFileTypes:true }).filter((entry) => entry.isDirectory() && /^ac9s4/i.test(entry.name)).map((entry) => path.join(topicRoot, entry.name, "index.html"));
for (const file of topicFiles) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/year4-science-topic-modules\.js\?v=\d+/g, "year4-science-topic-modules.js?v=2").replace(/year4-science-topic-render\.js\?v=\d+/g, "year4-science-topic-render.js?v=2");
  if (!html.includes("year4-science-topic-render.js")) html = html.replace('<script src="/pwa-register.js"></script>', `${topicScripts}<script src="/pwa-register.js"></script>`);
  fs.writeFileSync(file, html);
}

const codes = fs.readdirSync(quizRoot, { withFileTypes:true }).filter((entry) => entry.isDirectory() && /^ac9s4/i.test(entry.name)).map((entry) => entry.name);
for (const code of codes) {
  const file = path.join(quizRoot, code, "worksheet", "index.html");
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/year4-science-topic-modules\.js\?v=\d+/g, "year4-science-topic-modules.js?v=2").replace(/year4-science-worksheet\.js\?v=\d+/g, "year4-science-worksheet.js?v=2");
  html = html
    .replace(/Generate an 8-question worksheet for ([A-Z0-9]+)\./, "Printable 9-question tiered practice sheet for $1 with a complete answer key, summaries and hints.")
    .replace("Download an eight-question worksheet drawn from the Practice bank.", "Open a separate nine-question practice sheet with Warm-Up, Core Practice and Extension tiers.")
    .replace("Download PDF worksheet", "Open printable practice sheet")
    .replace(/<script>window\.quizConfig=\{skillCode:"[A-Z0-9]+",worksheetQuestionLimit:8\};<\/script>/, "")
    .replace(new RegExp(`<script src="/quiz/year-4/science/${code}/practice/questions\\.js"></script>`, "i"), "")
    .replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>', "")
    .replace('<script src="/quiz/assets/worksheet-pdf.js?v=17"></script>', "");
  if (!html.includes("year4-science-worksheet.js")) html = html.replace('<script src="/pwa-register.js"></script>', `${worksheetScripts}<script src="/pwa-register.js"></script>`);
  fs.writeFileSync(file, html);
}

console.log(`Wired ${topicFiles.length} Year 4 Science topic routes and ${codes.length} practice-sheet routes.`);
