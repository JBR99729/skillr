import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = path.join(root, "foundation", "maths");

const stripTags = (value) => String(value || "")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, " ")
  .trim();

const escapeHtml = (value) => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const first = (source, expression) => source.match(expression)?.[1]?.trim() || "";

const plainLanguage = {
  AC9MFA01: ["Copy and continue repeating patterns", "Spot what repeats, copy the pattern and work out what comes next."],
  AC9MFM01: ["Compare length, mass, capacity and time", "Compare everyday objects and events, then explain which is longer, heavier, holds more or takes longer."],
  AC9MFM02: ["Days of the week and times of day", "Put days and familiar daily events in order using everyday time language."],
  AC9MFN01: ["Numbers to 20", "Name, show and put numbers from 0 to 20 in order."],
  AC9MFN02: ["Recognise quantities to 5 without counting", "See a small group and know how many objects there are straight away."],
  AC9MFN03: ["Count and compare groups to 20", "Count objects and decide which group has more, fewer or the same number."],
  AC9MFN04: ["Make and split numbers to 10", "Explore the smaller parts that can be combined to make a number."],
  AC9MFN05: ["Model adding and taking away", "Use objects, drawings and numbers to show what happens when quantities join or separate."],
  AC9MFN06: ["Share and group objects equally", "Make fair shares and equal groups, then check that every group has the same amount."],
  AC9MFSP01: ["Sort, name and make shapes", "Recognise familiar shapes, describe their features and sort or create them."],
  AC9MFSP02: ["Describe position and location", "Use words such as above, below, beside and between to describe where things are."],
  AC9MFST01: ["Collect, sort and compare data", "Answer familiar questions by collecting objects or images, sorting them and comparing the groups."],
};

const mappingPanel = (topicHtml) => {
  const block = first(topicHtml, /<!-- skillr-curriculum-equivalents:start -->([\s\S]*?)<!-- skillr-curriculum-equivalents:end -->/i);
  const body = first(block, /<div class="curriculum-detail-body">([\s\S]*?)<\/div>\s*<\/details>/i);
  if (!body) return "";
  const table = first(body, /(<div class="curriculum-table-wrap">[\s\S]*?<\/table><\/div>)/i);
  const mappedSkill = first(body, /<p><strong>Mapped skill:<\/strong>\s*([\s\S]*?)<\/p>/i);
  const disclaimer = first(body, /<p><small>([\s\S]*?)<\/small><\/p>/i);
  if (!table) return "";
  return `<details name="lesson" class="curriculum-mapping" id="curriculum-mapping"><summary><span>Curriculum mapping</span><span>Victoria · NSW · International</span></summary><div class="panel"><p class="mapping-intro"><strong>Mapped skill:</strong> ${mappedSkill}</p>${table}<p class="mapping-disclaimer">${disclaimer}</p></div></details>`;
};

const renameSummary = (block, title, kicker) => block.replace(
  /<summary>[\s\S]*?<\/summary>/i,
  `<summary><span>${title}</span><span>${kicker}</span></summary>`,
);

const rank = (block) => {
  const label = stripTags(first(block, /<summary>([\s\S]*?)<\/summary>/i)).toLowerCase();
  if (label.includes("learning intention") || label.includes("today’s goal")) return 10;
  if (label.includes("worked visual") || label.includes("i do")) return 20;
  if (label.includes("clean visual") || label.includes("we do")) return 30;
  if (label.includes("elaboration") || label.includes("more examples")) return 40;
  if (label.includes("important questions") || label.includes("check understanding")) return 50;
  if (label.includes("review hints") || label.includes("exit ticket")) return 60;
  if (label.includes("curriculum")) return 70;
  if (label.includes("related")) return 90;
  if (label.includes("need teaching")) return 100;
  return 80;
};

const relabel = (block) => {
  const label = stripTags(first(block, /<summary>([\s\S]*?)<\/summary>/i)).toLowerCase();
  if (label.includes("learning intention")) return renameSummary(block, "Today’s goal", "Start here");
  if (label.includes("worked visual")) return renameSummary(block, "I do", "Model the skill");
  if (label.includes("clean visual")) return renameSummary(block, "We do", "Explore together");
  if (label.includes("elaboration")) return renameSummary(block, "More examples", "Build understanding");
  if (label.includes("important questions")) return renameSummary(block, "Check understanding", "Questions and answers");
  if (label.includes("review hints")) return renameSummary(block, "Exit ticket", "Review and assess");
  if (label.includes("curriculum")) return renameSummary(block, "Australian Curriculum", "Exact wording and teacher focus");
  return block;
};

const topics = fs.readdirSync(base, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => fs.existsSync(path.join(base, slug, "teacher-slides", "index.html")))
  .sort();

let changed = 0;
for (const slug of topics) {
  const topicFile = path.join(base, slug, "index.html");
  const classroomFile = path.join(base, slug, "teacher-slides", "index.html");
  const topicHtml = fs.readFileSync(topicFile, "utf8");
  let html = fs.readFileSync(classroomFile, "utf8");
  const code = first(html, /<title>([A-Z0-9]+)/i) || first(topicHtml, /\b(AC9MF[A-Z0-9]+)\b/i);
  const topicHeading = stripTags(first(topicHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const fallbackTitle = first(html, /class="display-topic-title"[^>]*>[\s\S]*?-\s*([^<]+)/i);
  const plainTitle = (topicHeading || fallbackTitle || code).replace(new RegExp(`^${code}:?\\s*`, "i"), "");
  const shortTitle = plainLanguage[code]?.[0] || (plainTitle.length > 72 ? `${plainTitle.slice(0, 69).replace(/\s+\S*$/, "")}…` : plainTitle);
  const description = plainLanguage[code]?.[1] || stripTags(first(topicHtml, /<p class="topic-lead"[^>]*>([\s\S]*?)<\/p>/i)) || "Ready to project, discuss and teach.";

  const stack = first(html, /<div class="section-stack"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<\/main>/i);
  if (!stack) throw new Error(`${slug}: section stack not found`);
  let blocks = (stack.match(/<details\b[\s\S]*?<\/details>/gi) || [])
    .filter((block) => !/class="curriculum-mapping"/i.test(block));
  blocks = blocks.map(relabel).sort((a, b) => rank(a) - rank(b));
  blocks = blocks.map((block, index) => {
    let next = block.replace(/^<details\b([^>]*)>/i, (_match, attrs) => {
      const clean = attrs.replace(/\sopen\b/gi, "").replace(/\sname="[^"]*"/gi, "");
      return `<details name="lesson"${index === 0 ? " open" : ""}${clean}>`;
    });
    return next;
  });
  const mapping = mappingPanel(topicHtml);
  if (!mapping) throw new Error(`${slug}: curriculum mapping not found`);
  const curriculumIndex = blocks.findIndex((block) => /Australian Curriculum/i.test(block));
  blocks.splice(curriculumIndex >= 0 ? curriculumIndex + 1 : Math.max(0, blocks.length - 2), 0, mapping);

  html = html.replace(/<style>[\s\S]*?<\/style>/i, '<link rel="stylesheet" href="/assets/css/classroom-view.css">');
  const nav = `<nav class="display-nav" aria-label="Classroom View navigation"><a href="../">← Topic guide</a><div class="display-nav-group"><a href="#curriculum-mapping">Curriculum mapping</a><a href="/quiz/grade-k/math/${code.toLowerCase()}/practice/">Practice</a><a class="primary" href="/quiz/grade-k/math/${code.toLowerCase()}/test/">Quick check</a></div></nav>`;
  const header = `<header class="display-header"><div><p class="display-eyebrow">Foundation Maths · ${code}</p><h1 id="page-title">${escapeHtml(shortTitle)}</h1><p class="display-subtitle">${escapeHtml(description)}</p><!-- Teacher Display Page --></div><p class="display-mode">Ready to project and teach</p></header>`;
  const sectionStack = `<div class="section-stack">\n${blocks.join("\n")}\n</div></div></section></main>`;
  html = html.replace(/<nav class="display-nav"[\s\S]*?<\/nav>/i, () => nav);
  html = html.replace(/<header class="display-header">[\s\S]*?<\/header>/i, () => header);
  html = html.replace(/<div class="section-stack"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<\/main>/i, () => sectionStack);
  html = html.replace(/\s*<script>\s*document\.querySelectorAll\("\[data-single-open\][\s\S]*?<\/script>/i, "");
  fs.writeFileSync(classroomFile, html);
  changed++;
}

console.log(`Migrated ${changed} Foundation Maths Classroom Views.`);
