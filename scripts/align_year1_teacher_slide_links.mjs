import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "data", "curriculum-units.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let pages = 0;
const hubUpdates = new Map();

const liveUrl = (unit) => `/worksheets/year1/${unit.subjectSlug}/teacher-slides/live.html?code=${unit.code}`;
const legacyUrl = (unit) => `/worksheets/year1/${unit.subjectSlug}/teacher-slides/${unit.code.toLowerCase()}-teacher-slide.pdf`;
for (const unit of manifest.units) {
  if (unit.yearNumber !== 1) continue;
  const oldUrl = legacyUrl(unit);
  const nextUrl = liveUrl(unit);
  if (!hubUpdates.has(unit.subjectSlug)) hubUpdates.set(unit.subjectSlug, []);
  hubUpdates.get(unit.subjectSlug).push([oldUrl, nextUrl]);
  unit.teacherSlideUrl = nextUrl;
  const topicPath = path.join(root, unit.url.replace(/^\//, ""), "index.html");
  let html = fs.readFileSync(topicPath, "utf8");
  html = html
    .replaceAll(oldUrl, nextUrl)
    .replace(/Use this one-page PDF to introduce the key idea, vocabulary and teaching sequence before students begin the activities\./g, "Open the live classroom sequence to teach the key idea, vocabulary and worked examples before students begin the activities.")
    .replace(/Open teacher slide \(PDF\)/g, "Open teacher slides");
  fs.writeFileSync(topicPath, html, "utf8");
  pages += 1;
}
for (const [subject, replacements] of hubUpdates) {
  const hubPath = path.join(root, "year1", "curriculum", subject, "index.html");
  let html = fs.readFileSync(hubPath, "utf8");
  for (const [oldUrl, nextUrl] of replacements) html = html.replaceAll(oldUrl, nextUrl);
  fs.writeFileSync(hubPath, html, "utf8");
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Aligned ${pages} Year 1 topic pages, three curriculum hubs and manifest records to live teacher slides.`);
