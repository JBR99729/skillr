import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = "blogs";
const START = "<!-- BLOG_FREE_FIRST_CAMPAIGN_START -->";
const END = "<!-- BLOG_FREE_FIRST_CAMPAIGN_END -->";
const TODAY = "2026-08-29";

function articleFiles() {
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html") && entry.name !== "index.html")
    .map((entry) => path.join(BLOG_DIR, entry.name))
    .sort();
}

function inferHub(file, html) {
  const haystack = `${file} ${html.slice(0, 8000)}`.toLowerCase();
  const subject = ["maths", "science", "english"].find((item) => haystack.includes(item));
  const foundation = haystack.includes("foundation");
  const yearMatch = haystack.match(/year[\s-]?(10|[1-9])/i);
  const subjectLabel = subject ? subject[0].toUpperCase() + subject.slice(1) : "";
  if (foundation && subject) return { href: `/foundation/curriculum/${subject}/`, label: `Browse free Foundation ${subjectLabel} resources` };
  if (yearMatch && subject) return { href: `/year${yearMatch[1]}/curriculum/${subject}/`, label: `Browse free Year ${yearMatch[1]} ${subjectLabel} resources` };
  if (foundation) return { href: "/foundation/curriculum/", label: "Browse free Foundation curriculum resources" };
  if (yearMatch) return { href: `/year${yearMatch[1]}/curriculum/`, label: `Browse free Year ${yearMatch[1]} curriculum resources` };
  return { href: "/#curriculum", label: "Browse free curriculum resources" };
}

function campaignBlock(hub) {
  return `${START}\n<section class="blog-free-first" data-free-first-campaign aria-labelledby="free-first-title" style="margin:28px 0;padding:20px;border:1px solid #d8e3f2;border-radius:16px;background:#f7faff">\n  <p style="margin:0 0 6px;font-weight:900;color:#2457d6">Free-first learning</p>\n  <h2 id="free-first-title" style="margin-top:0">Try the free resources first</h2>\n  <p>Before committing to another monthly or yearly learning subscription, use the free curriculum-linked resources available for the student’s current topic. Start with the Topic Guide, use Practice, review mistakes and then take the separate Test.</p>\n  <p>A larger paid question bank or learning program can be useful, but paying for more volume does not guarantee that a student will use it consistently. If the learner is already working through the free resources and still needs extra tutoring, marking, adaptive practice, reporting or more question volume, compare paid options for that specific need.</p>\n  <p><strong>Free-first check:</strong> establish a consistent Learn → Practice → Test routine before deciding whether an additional paid service offers something the learner will genuinely use.</p>\n  <p><a href="${hub.href}"><strong>${hub.label}</strong></a> · <a href="/dashboard/">Open My Progress</a></p>\n</section>\n${END}`;
}

function replaceOrInsert(html, block, file) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if ((start >= 0) !== (end >= 0)) throw new Error(`Unbalanced campaign markers in ${file}`);
  if (start >= 0) {
    if (end < start) throw new Error(`Campaign end marker precedes start in ${file}`);
    return html.slice(0, start) + block + html.slice(end + END.length);
  }
  if (html.includes("</article>")) return html.replace("</article>", `${block}\n</article>`);
  if (html.includes("</main>")) return html.replace("</main>", `${block}\n</main>`);
  if (html.includes("</body>")) return html.replace("</body>", `${block}\n</body>`);
  throw new Error(`No safe insertion point for ${file}`);
}

let changed = 0;
let checked = 0;
for (const file of articleFiles()) {
  const html = fs.readFileSync(file, "utf8");
  checked++;
  let next = replaceOrInsert(html, campaignBlock(inferHub(file, html)), file);
  next = next.replace(/("dateModified"\s*:\s*")\d{4}-\d{2}-\d{2}("?)/g, `$1${TODAY}$2`);
  if (next !== html) {
    fs.writeFileSync(file, next);
    changed++;
  }
}

console.log(`Blog free-first campaign: ${checked} articles checked, ${changed} changed.`);