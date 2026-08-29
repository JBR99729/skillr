import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseDirs = ["foundation/english", "foundation/maths", "foundation/science"];

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const stripTags = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const titleCaseSubject = (subject) => subject[0].toUpperCase() + subject.slice(1);

const findFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findFiles(full));
    if (entry.isFile() && full.endsWith("/teacher-slides/index.html")) out.push(full);
  }
  return out;
};

const firstMatch = (text, regex) => {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};

const extractFigures = (html) => {
  const figures = [];
  const re = /<figure\b([^>]*)data-slide\b[^>]*>([\s\S]*?)<\/figure>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1];
    const full = match[0];
    const kind = firstMatch(attrs, /data-slide-kind="([^"]+)"/i) || firstMatch(full, /data-slide-kind="([^"]+)"/i) || "section";
    const content = firstMatch(full, /<div class="slide-content">([\s\S]*?)<\/div>\s*<footer/i);
    if (content) figures.push({ kind, content });
  }
  return figures;
};

const cleanSlideContent = (html) => html
  .replace(/\s*class="slide-visual"/g, ' class="display-model"')
  .replace(/\s*class="two-column"/g, ' class="two-column"')
  .replace(/\s*class="math-model"/g, ' class="math-model"')
  .replace(/\s*class="number-line-model"/g, ' class="number-line-model"')
  .replace(/\s+/g, " ")
  .replace(/>\s+</g, "><")
  .trim();

const section = (title, kicker, items) => {
  const body = items.filter(Boolean).map((item) => `<article class="content-block">${cleanSlideContent(item)}</article>`).join("");
  if (!body) return "";
  return `<details><summary><span>${esc(title)}</span><span>${esc(kicker)}</span></summary><div class="panel">${body}</div></details>`;
};

const contactSection = `<details><summary><span>Need teaching slides or worksheets?</span><span>Contact SkillrHub</span></summary><div class="panel"><article class="content-block"><h2>Need professional classroom resources?</h2><p>Teachers and parents: if you need professional, ready-to-display 16:9 teaching slides and matching worksheets for this curriculum code/topic, please email <a href="mailto:skillrhublearning@gmail.com?subject=Resource%20request%3A%20curriculum%20code%20-%20topic">skillrhublearning@gmail.com</a>.</p><p>Please include the curriculum code and topic name in your email so we can prepare the right resource pack. These can be delivered at a small cost.</p></article></div></details>`;

const buildPage = ({ code, subject, topicTitle, canonical, sections, links }) => `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow">
<title>${esc(code)} Classroom View | SkillrHub</title>
<link rel="canonical" href="${esc(canonical)}">
<link rel="stylesheet" href="../../../../style.css">
<style>
:root{--blue:#173968;--bright:#2457d6;--ink:#17243a;--muted:#53657d;--line:#d7e3f2;--soft:#f4f8ff;--green:#13795b;--gold:#9a6700}
*{box-sizing:border-box}body{margin:0;background:#edf2f8;color:var(--ink);font-family:Arial,Helvetica,sans-serif}.display-shell{width:min(1320px,100%);margin:0 auto;padding:16px}.display-nav{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px}.display-nav a{min-height:40px;display:inline-flex;align-items:center;padding:8px 13px;border:1px solid #c7d5e8;border-radius:9px;background:#fff;color:var(--blue);font-weight:800;text-decoration:none}.display-board{aspect-ratio:16/9;min-height:620px;display:grid;grid-template-rows:auto minmax(0,1fr);overflow:hidden;border:2px solid var(--blue);border-radius:14px;background:#fff;box-shadow:0 18px 48px rgba(15,23,42,.13)}.display-header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px 34px;background:var(--blue);color:#fff}.display-header p,.display-header h1{margin:0}.display-header h1{font-size:clamp(24px,2.3vw,38px);line-height:1.05}.display-header p{font-weight:800}.display-header small{display:block;margin-top:3px;font-weight:700;opacity:.9}.display-content{min-height:0;padding:24px 32px 28px;overflow:auto}.section-stack{display:grid;gap:12px}details{border:1px solid var(--line);border-radius:12px;background:#fff;overflow:hidden}summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:16px 18px;color:var(--blue);font-size:clamp(20px,1.9vw,30px);font-weight:900}summary{background:#fff;color:var(--blue)}summary::-webkit-details-marker{display:none}summary::before{content:">";width:30px;height:30px;display:grid;place-items:center;border-radius:50%;background:#eef5ff;color:var(--bright);font-size:22px;transition:transform .16s ease}details[open] summary::before{transform:rotate(90deg)}summary span:last-child{color:var(--muted);font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}.panel{padding:0 20px 20px}.content-block{border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:16px}.content-block+.content-block{margin-top:12px}.content-block h2{margin:0 0 12px;color:var(--blue);font-size:clamp(28px,3vw,46px);line-height:1.05}.content-block h3{margin:0 0 8px;color:var(--bright);font-size:clamp(20px,2vw,29px)}.content-block p,.content-block li,.content-block dt,.content-block dd{color:var(--ink)!important;opacity:1!important;text-shadow:none!important;font-size:clamp(17px,1.45vw,24px);font-weight:700;line-height:1.38}.content-block ul,.content-block ol{margin:0;padding-left:1.25em}.content-block li+li{margin-top:9px}.content-block li{padding:10px 12px;border-left:5px solid var(--bright);border-radius:10px;background:#fff}.content-block dl{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:12px 18px;margin:0}.content-block dt{color:var(--blue)!important;font-weight:900}.content-block dd{margin:0;padding:10px 12px;border-radius:10px;background:#fff}.two-column{display:grid;grid-template-columns:1fr 1fr;gap:18px}.display-model{display:grid;place-items:center;margin:8px 0 12px}.display-model svg,.content-block svg{display:block;width:100%;height:auto;max-height:330px}.content-block .number-line-model{max-height:230px}.footer-note{margin-top:14px;color:var(--muted);font-size:14px;font-weight:800}@media(max-width:900px){.display-board{aspect-ratio:auto;min-height:0}.display-header,summary{grid-template-columns:1fr}.two-column,.content-block dl{grid-template-columns:1fr}}
</style>
</head>
<body>
<main class="display-shell">
<nav class="display-nav" aria-label="Classroom View navigation"><a href="../">Topic Guide</a>${links.practice ? `<a href="${esc(links.practice)}">Practice</a>` : ""}${links.test ? `<a href="${esc(links.test)}">Test</a>` : ""}</nav>
<section class="display-board" aria-labelledby="page-title">
<header class="display-header"><div><p>Foundation ${esc(titleCaseSubject(subject))}</p><h1 id="page-title">Classroom View</h1><small>Ready to project and teach</small><p class="display-topic-title">${esc(code)} - ${esc(topicTitle)}</p><!-- Teacher Display Page --></div><p>Open one section at a time</p></header>
<div class="display-content"><div class="section-stack" data-single-open>
${sections}
${contactSection}
</div></div>
</section>
</main>
<script>
document.querySelectorAll("[data-single-open] details").forEach((section)=>{section.addEventListener("toggle",()=>{if(!section.open)return;section.parentElement.querySelectorAll("details").forEach((other)=>{if(other!==section)other.open=false})})});
</script>
</body>
</html>
`;

const files = baseDirs.flatMap((dir) => findFiles(path.join(root, dir))).sort();
let changed = 0;
let skipped = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  if (rel.includes("ac9mfn01-name-represent-and-order")) {
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const figures = extractFigures(html);
  if (!figures.length) {
    skipped++;
    continue;
  }
  const topicPath = path.join(path.dirname(path.dirname(file)), "index.html");
  const topicHtml = fs.existsSync(topicPath) ? fs.readFileSync(topicPath, "utf8") : "";
  const code = firstMatch(html, /Foundation [^<]*?•\s*([A-Z0-9]+)/) || firstMatch(topicHtml, /<p class="curriculum-eyebrow">([^<\s•]+)/) || "Foundation";
  const subject = rel.split(path.sep)[1] || "maths";
  const canonical = firstMatch(html, /<link rel="canonical" href="([^"]+)"/i) || `https://skillrhub.com/${path.dirname(path.dirname(rel)).replace(/\\/g, "/")}/`;
  const title = firstMatch(topicHtml, /<h1[^>]*>([^<]+)<\/h1>/i) || code;
  const practice = firstMatch(topicHtml, /href="([^"]+\/practice\/)"/i);
  const test = firstMatch(topicHtml, /href="([^"]+\/test\/)"/i);
  const byKind = (kind) => figures.filter((figure) => figure.kind === kind).map((figure) => figure.content);
  const blocks = [
    section("Curriculum", "Start here", byKind("curriculum")),
    section("Learning intention", "Say it simply", byKind("learning-intention")),
    section("Worked visual model", "Teach from the board", byKind("elaboration-visual")),
    section("Elaboration examples", "Copied content", byKind("elaboration-examples")),
    section("Important questions", "With answers", byKind("important-questions")),
    section("Review hints and exit ticket", "Ready for practice", [...byKind("assessment"), ...byKind("exit-ticket")]),
  ].filter(Boolean);
  if (!blocks.length) {
    skipped++;
    continue;
  }
  const output = buildPage({
    code,
    subject,
    topicTitle: stripTags(title),
    canonical,
    sections: blocks.join("\n"),
    links: { practice, test },
  });
  fs.writeFileSync(file, output);
  changed++;
}

console.log(`Converted ${changed} Foundation teacher slide files to display pages. Skipped ${skipped}.`);

const { buildClassroomViewTopicLinks } = await import("./build_classroom_view_topic_links.mjs");
buildClassroomViewTopicLinks({ patchGenerators: false });
