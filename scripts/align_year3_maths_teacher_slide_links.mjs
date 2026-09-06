import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "data", "curriculum-units.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const replacements = [];
const customDeckCodes = new Set(["AC9M3M03", "AC9M3M04"]);
let pages = 0;

for (const unit of manifest.units) {
  if (unit.yearNumber !== 3 || unit.subjectSlug !== "maths") continue;
  const oldUrl = `/worksheets/year3/maths/teacher-slides/${unit.code.toLowerCase()}-teacher-slide.pdf`;
  const sharedUrl = `/worksheets/year3/maths/teacher-slides/live.html?code=${unit.code}`;
  const customUrl = `${unit.url}teacher-deck/`;
  const nextUrl = customDeckCodes.has(unit.code) ? customUrl : sharedUrl;
  replacements.push([oldUrl, nextUrl]);
  replacements.push([sharedUrl, nextUrl]);
  unit.teacherSlideUrl = nextUrl;

  const topicPath = path.join(root, unit.url.replace(/^\//, ""), "index.html");
  let html = fs.readFileSync(topicPath, "utf8");
  html = html
    .replaceAll(oldUrl, nextUrl)
    .replaceAll(`href="teacher-deck/"`, `href="${nextUrl}"`)
    .replaceAll(`href='teacher-deck/'`, `href='${nextUrl}'`)
    .replace(/Open teacher slide \(PDF\)/g, "Open teacher slides");
  fs.writeFileSync(topicPath, html, "utf8");
  pages += 1;
}

const hubPath = path.join(root, "year3", "curriculum", "maths", "index.html");
let hubHtml = fs.readFileSync(hubPath, "utf8");
for (const [oldUrl, nextUrl] of replacements) hubHtml = hubHtml.replaceAll(oldUrl, nextUrl);
fs.writeFileSync(hubPath, hubHtml, "utf8");
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Aligned ${pages} Year 3 Maths topic pages, curriculum hub links and manifest records to live teacher slides.`);