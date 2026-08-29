import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseDirs = ["year2/english", "year2/maths", "year2/science"];

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

const cleanTopicContent = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<article\b/gi, "<div")
  .replace(/<\/article>/gi, "</div>")
  .replace(/\s*class="curriculum-detail-body"/g, "")
  .replace(/\s*class="curriculum-worked-example"/g, ' class="nested-block"')
  .replace(/\s*class="unit-activity-grid"/g, ' class="display-activity-grid"')
  .replace(/\s*class="english-model-board"/g, ' class="display-model-board"')
  .replace(/\s*class="english-card-row"/g, ' class="display-card-row"')
  .replace(/\s*class="curriculum-visual-cue"/g, ' class="visual-cue"')
  .replace(/\s*class="math-model-board"/g, ' class="display-model-board"')
  .replace(/\s*class="math-card-row"/g, ' class="display-card-row"')
  .replace(/\s*class="curriculum-link-row"/g, ' class="display-link-row"')
  .replace(/\s*class="curriculum-button primary"/g, ' class="display-button primary"')
  .replace(/\s*class="curriculum-button"/g, ' class="display-button"')
  .replace(/\s+/g, " ")
  .replace(/>\s+</g, "><")
  .trim();

const findSection = (html, label) => {
  const detailsMarker = new RegExp(`<details[^>]*>\\s*<summary>\\s*<strong>${label}<\\/strong>\\s*<\\/summary>\\s*<div class="curriculum-detail-body">`, "i");
  const detailsMatch = detailsMarker.exec(html);
  if (detailsMatch) {
    const start = detailsMatch.index + detailsMatch[0].length;
    const rest = html.slice(start);
    const end = rest.search(/<\/div>\s*<\/details>/i);
    return end >= 0 ? rest.slice(0, end) : "";
  }

  const sectionMarker = new RegExp(`<section\\b[^>]*class="[^"]*\\bcurriculum-topic-section\\b[^"]*"[^>]*>\\s*(?:<p[^>]*>[^<]*<\\/p>\\s*)?<h2[^>]*>${label}<\\/h2>`, "i");
  const sectionMatch = sectionMarker.exec(html);
  if (!sectionMatch) return "";
  const start = sectionMatch.index + sectionMatch[0].length;
  const rest = html.slice(start);
  const end = rest.search(/<\/section>/i);
  return end >= 0 ? rest.slice(0, end) : "";
};

const findSectionAny = (html, labels) => {
  for (const label of labels) {
    const found = findSection(html, label);
    if (found) return found;
  }
  return "";
};

const section = (title, kicker, bodies) => {
  const body = bodies
    .filter(Boolean)
    .map((item) => `<article class="content-block">${cleanTopicContent(item)}</article>`)
    .join("");
  if (!body) return "";
  return `<details><summary><span>${esc(title)}</span><span>${esc(kicker)}</span></summary><div class="panel">${body}</div></details>`;
};

const icon = (subject, index) => {
  if (subject === "maths") {
    const shapes = [
      `<circle cx="34" cy="40" r="10"/><circle cx="66" cy="40" r="10"/><circle cx="98" cy="40" r="10"/><circle cx="50" cy="70" r="10"/><circle cx="82" cy="70" r="10"/>`,
      `<rect x="22" y="24" width="92" height="60" rx="8" fill="#fff" stroke="#173968" stroke-width="4"/><path d="M53 24v60M84 24v60M22 54h92" stroke="#173968" stroke-width="3"/>`,
      `<line x1="20" y1="58" x2="116" y2="58" stroke="#173968" stroke-width="6"/><circle cx="44" cy="58" r="9"/><circle cx="92" cy="58" r="9"/><text x="18" y="92">0</text><text x="100" y="92">1000</text>`,
      `<rect x="26" y="32" width="34" height="34" fill="#f59e0b"/><circle cx="90" cy="49" r="20" fill="#13795b"/><path d="M34 86h72" stroke="#173968" stroke-width="6"/>`,
    ];
    return `<svg viewBox="0 0 136 108" role="img" aria-hidden="true"><g fill="#2457d6" font-family="Arial" font-size="16" font-weight="900">${shapes[index % shapes.length]}</g></svg>`;
  }
  if (subject === "english") {
    return `<svg viewBox="0 0 136 108" role="img" aria-hidden="true"><g fill="none" stroke="#173968" stroke-width="4"><rect x="24" y="18" width="88" height="68" rx="9" fill="#fff"/><line x1="40" y1="40" x2="96" y2="40"/><line x1="40" y1="58" x2="88" y2="58"/><circle cx="48" cy="82" r="7" fill="#2457d6" stroke="none"/></g></svg>`;
  }
  return `<svg viewBox="0 0 136 108" role="img" aria-hidden="true"><g fill="none" stroke="#173968" stroke-width="4"><circle cx="68" cy="52" r="32" fill="#fff"/><path d="M68 20v64M36 52h64"/><circle cx="68" cy="52" r="9" fill="#2457d6" stroke="none"/></g></svg>`;
};

const extractExamples = (topicHtml) => {
  const sections = [
    findSectionAny(topicHtml, ["Concept model and worked application", "2\\. Subject-Specific Content &amp; Key Examples", "Worked examples", "Core lesson.*", "Different actions.*", "Loud/soft.*", "Muffling.*", "Designing.*", "First Nations.*"]),
    findSectionAny(topicHtml, ["Guided learning activities", "Guided activities", "Support, core and extension", "Quick check for understanding"]),
    findSectionAny(topicHtml, ["Australian Curriculum elaborations", "Curriculum Coverage &amp; Elaborations", "Curriculum coverage and elaborations"]),
    findSectionAny(topicHtml, ["High-value classroom investigations", "Suggested teaching sequence", "Student self-check"]),
  ].join(" ");
  const articles = [...sections.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  const modelText = [...sections.matchAll(/<div class="[^"]*(?:math-model-board|english-model-board|science-key|science-caution|curriculum-visual-cue|concept-card|example-card)[^"]*">([\s\S]*?)<\/div>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  const listText = [...sections.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  const paragraphText = [...sections.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  const candidates = [...modelText, ...articles, ...listText, ...paragraphText];
  return candidates
    .map((item) => item.replace(/^E\d+\s*/i, "").trim())
    .filter((item) => item.length > 24)
    .filter(Boolean)
    .slice(0, 4);
};

const buildExampleBoard = ({ code, subject, title, examples }) => {
  if (!examples.length) return "";
  const cards = examples.map((item, index) => `<article class="example-card"><div class="example-label">Example ${index + 1}</div><div class="example-row"><p>${esc(item)}</p></div></article>`).join("");
  return `<details><summary><span>Clean visual examples</span><span>One-page board</span></summary><div class="panel"><article class="content-block visual-board-block"><h2>Clean one-page examples</h2><div class="example-board" aria-label="${esc(code)} visual teaching examples"><div class="example-board-title">${esc(code)} - ${esc(title)}</div><div class="example-grid">${cards}</div></div></article></div></details>`;
};

const contactSection = `<details><summary><span>Need teaching slides or worksheets?</span><span>Contact SkillrHub</span></summary><div class="panel"><article class="content-block"><h2>Need professional classroom resources?</h2><p>Teachers and parents: if you need professional, ready-to-display 16:9 teaching slides and matching worksheets for this curriculum code/topic, please email <a href="mailto:skillrhublearning@gmail.com?subject=Resource%20request%3A%20curriculum%20code%20-%20topic">skillrhublearning@gmail.com</a>.</p><p>Please include the curriculum code and topic name in your email so we can prepare the right resource pack. These can be delivered at a small cost.</p></article></div></details>`;

const styles = `:root{--blue:#173968;--bright:#2457d6;--ink:#17243a;--muted:#53657d;--line:#d7e3f2;--soft:#f4f8ff;--green:#13795b;--gold:#9a6700}
*{box-sizing:border-box}body{margin:0;background:#edf2f8;color:var(--ink);font-family:Arial,Helvetica,sans-serif}.display-shell{width:min(1320px,100%);margin:0 auto;padding:16px}.display-nav{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px}.display-nav a{min-height:40px;display:inline-flex;align-items:center;padding:8px 13px;border:1px solid #c7d5e8;border-radius:9px;background:#fff;color:var(--blue);font-weight:800;text-decoration:none}.display-board{aspect-ratio:16/9;min-height:620px;display:grid;grid-template-rows:auto minmax(0,1fr);overflow:hidden;border:2px solid var(--blue);border-radius:14px;background:#fff;box-shadow:0 18px 48px rgba(15,23,42,.13)}.display-header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px 34px;background:var(--blue);color:#fff}.display-header p,.display-header h1{margin:0;color:#fff}.display-header h1{font-size:clamp(24px,2.3vw,38px);line-height:1.05}.display-header p{font-weight:800}.display-header small{display:block;margin-top:3px;font-weight:700;opacity:.9;color:#fff}.display-content{min-height:0;padding:24px 32px 28px;overflow:auto}.section-stack{display:grid;gap:12px}details{border:1px solid var(--line);border-radius:12px;background:#fff;overflow:hidden}summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:16px 18px;color:var(--blue);font-size:clamp(20px,1.9vw,30px);font-weight:900;background:#fff}summary::-webkit-details-marker{display:none}summary::before{content:">";width:30px;height:30px;display:grid;place-items:center;border-radius:50%;background:#eef5ff;color:var(--bright);font-size:22px;transition:transform .16s ease}details[open] summary::before{transform:rotate(90deg)}summary span:last-child{color:var(--muted);font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}.panel{padding:0 20px 20px}.content-block{border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:16px}.content-block+.content-block{margin-top:12px}.content-block h2{margin:0 0 12px;color:var(--blue);font-size:clamp(28px,3vw,46px);line-height:1.05}.content-block h3{margin:0 0 8px;color:var(--bright);font-size:clamp(20px,2vw,29px)}.content-block p,.content-block li,.content-block dt,.content-block dd{color:var(--ink)!important;opacity:1!important;text-shadow:none!important;font-size:clamp(17px,1.45vw,24px);font-weight:700;line-height:1.38}.content-block ul,.content-block ol{margin:0;padding-left:1.25em}.content-block li+li{margin-top:9px}.content-block li{padding:10px 12px;border-left:5px solid var(--bright);border-radius:10px;background:#fff}.content-block dl{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:12px 18px;margin:0}.content-block dt{color:var(--blue)!important;font-weight:900}.content-block dd{margin:0;padding:10px 12px;border-radius:10px;background:#fff}.nested-block{margin-top:12px;padding:14px;border:1px solid var(--line);border-radius:12px;background:#fff}.display-activity-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}.visual-cue,.display-model-board{padding:14px;border:1px solid var(--line);border-radius:12px;background:var(--soft)}.display-card-row{display:flex;gap:10px;flex-wrap:wrap}.display-card-row span{display:inline-flex;padding:10px 13px;border-radius:10px;background:#fff;border:1px solid var(--line);color:var(--blue);font-weight:900}.display-link-row{display:flex;gap:10px;flex-wrap:wrap}.display-button{display:inline-flex;padding:10px 13px;border-radius:9px;border:1px solid var(--line);color:var(--blue);font-weight:900;text-decoration:none}.display-button.primary{background:var(--blue);color:#fff}.visual-board-block{overflow:visible}.example-board{width:min(980px,100%);margin:8px auto 0;padding:18px;border-radius:18px;background:#f4f8ff;border:1px solid var(--line)}.example-board-title{margin:0 0 14px;padding:12px 16px;border-radius:12px;background:var(--blue);color:#fff;font-size:clamp(18px,1.6vw,24px);font-weight:900;line-height:1.2}.example-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:14px}.example-card{position:relative;min-height:168px;padding:52px 16px 16px;border:1px solid var(--line);border-radius:14px;background:#fff}.example-label{position:absolute;top:0;left:0;padding:9px 16px;border-radius:14px 0 12px 0;background:var(--blue);color:#fff;font-size:15px;font-weight:900}.example-row{display:block}.example-card p{margin:0;color:var(--ink)!important;font-size:clamp(17px,1.35vw,22px)!important;line-height:1.28!important;font-weight:800;overflow-wrap:anywhere}@media(max-width:760px){.example-grid{grid-template-columns:1fr}.example-row{grid-template-columns:1fr}}@media(max-width:900px){.display-board{aspect-ratio:auto;min-height:0}.display-header,summary{grid-template-columns:1fr}.content-block dl{grid-template-columns:1fr}}`;

const openFirstSection = (html) => html.replace("<details>", "<details open>");

const buildPage = ({ code, subject, title, canonical, links, sections }) => `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow">
<title>${esc(code)} Classroom View | SkillrHub</title>
<link rel="canonical" href="${esc(canonical)}">
<link rel="stylesheet" href="../../../../style.css">
<style>${styles}</style>
</head>
<body>
<main class="display-shell">
<nav class="display-nav" aria-label="Classroom View navigation"><a href="../">Topic Guide</a>${links.practice ? `<a href="${esc(links.practice)}">Practice</a>` : ""}${links.test ? `<a href="${esc(links.test)}">Test</a>` : ""}</nav>
<section class="display-board" aria-labelledby="page-title">
<header class="display-header"><div><p>Year 2 ${esc(titleCaseSubject(subject))}</p><h1 id="page-title">Classroom View</h1><small>Ready to project and teach</small><p class="display-topic-title">${esc(code)} - ${esc(title)}</p><!-- Teacher Display Page --></div><p>Open one section at a time</p></header>
<div class="display-content"><div class="section-stack" data-single-open>
${openFirstSection(sections)}
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
  const topicPath = path.join(path.dirname(path.dirname(file)), "index.html");
  if (!fs.existsSync(topicPath)) {
    skipped++;
    continue;
  }
  const topicHtml = fs.readFileSync(topicPath, "utf8");
  const subject = rel.split(path.sep)[1] || "maths";
  const code = firstMatch(topicHtml, /<p class="curriculum-eyebrow">([^<\s•]+)/) || firstMatch(topicHtml, /"curriculumCode":"([^"]+)"/) || firstMatch(fs.readFileSync(file, "utf8"), /<title>([A-Z0-9]+)/) || "Year2";
  const title = stripTags(firstMatch(topicHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/i)) || code;
  const cleanTitle = title.replace(new RegExp(`^${code}:?\\s*`, "i"), "");
  const canonical = firstMatch(topicHtml, /<link rel="canonical" href="([^"]+)"/i) || `https://skillrhub.com/${path.dirname(path.dirname(rel)).replace(/\\/g, "/")}/`;
  const practice = firstMatch(topicHtml, /href="([^"]+\/practice\/)"/i);
  const test = firstMatch(topicHtml, /href="([^"]+\/test\/)"/i);
  const examples = extractExamples(topicHtml);
  const blocks = [
    section("Curriculum", "Start here", [findSectionAny(topicHtml, ["What students learn", "What students learn in [^<]+"]), findSectionAny(topicHtml, ["Official curriculum reference", "Official curriculum references"])]),
    section("Learning intention", "Say it simply", [findSectionAny(topicHtml, ["What students learn", "What students learn in [^<]+"])]),
    buildExampleBoard({ code, subject, title: cleanTitle, examples }),
    section("Concept model", "Teach from the board", [findSectionAny(topicHtml, ["Concept model and worked application", "2\\. Subject-Specific Content &amp; Key Examples", "Worked examples", "Core lesson.*", "Different actions.*", "Loud/soft.*", "Muffling.*", "Designing.*", "First Nations.*"])]),
    section("Elaboration examples", "Copied content", [findSectionAny(topicHtml, ["Australian Curriculum elaborations", "Curriculum Coverage &amp; Elaborations", "Curriculum coverage and elaborations"])]),
    section("Important questions", "With answers", [findSectionAny(topicHtml, ["Revision Notes", "Practice Thought &amp; Formative Assessment", "Quick check for understanding"])]),
    section("Assessment and review", "Ready for practice", [findSectionAny(topicHtml, ["Common misconceptions and traps", "Common mistakes to watch for", "Common misconceptions and quick fixes", "3\\. Common Student Misconceptions"]), findSectionAny(topicHtml, ["Practice, test and teacher resources", "How to use this unit", "Practice Thought &amp; Formative Assessment"])]),
  ].filter(Boolean);
  if (!blocks.length) {
    skipped++;
    continue;
  }
  fs.writeFileSync(file, buildPage({ code, subject, title: cleanTitle, canonical, links: { practice, test }, sections: blocks.join("\n") }));
  changed++;
}

console.log(`Converted ${changed} Year 2 teacher slide files to display pages. Skipped ${skipped}.`);

const { buildClassroomViewTopicLinks } = await import("./build_classroom_view_topic_links.mjs");
buildClassroomViewTopicLinks({ patchGenerators: false });
