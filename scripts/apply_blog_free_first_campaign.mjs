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

function inferHub(file) {
  const base = path.basename(file, ".html").toLowerCase();
  const yearSubject = base.match(/(?:^|-)(?:free-)?year-?(10|[1-9])-(english|maths|science)(?:-|$)/);
  if (yearSubject) {
    const [, year, subject] = yearSubject;
    const label = subject[0].toUpperCase() + subject.slice(1);
    return { href: `/year${year}/curriculum/${subject}/`, label: `Browse free Year ${year} ${label} resources` };
  }
  const foundationSubject = base.match(/(?:^|-)foundation-(english|maths|science)(?:-|$)/);
  if (foundationSubject && !base.includes("year-10")) {
    const subject = foundationSubject[1];
    const label = subject[0].toUpperCase() + subject.slice(1);
    return { href: `/foundation/curriculum/${subject}/`, label: `Browse free Foundation ${label} resources` };
  }
  if (/year-?3-time/.test(base)) {
    return { href: "/year3/curriculum/maths/", label: "Browse free Year 3 Maths resources" };
  }
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

function tightenKnownClaims(file, html) {
  if (!file.endsWith("free-year-8-english-worksheets-australia-practice-tests.html")) return html;
  return html
    .replace(/No-Subscription Learning Path/g, "Free-First Learning Path")
    .replace(/without a monthly learning subscription/g, "with a free-first learning path")
    .replace("<h2>Why you may not need another monthly or yearly learning subscription</h2>", "<h2>Try free resources before committing to a subscription</h2>")
    .replace("But many families are paying recurring fees when what they mainly need is much simpler:", "Some families may find that what they mainly need is much simpler:")
    .replace("Large subscription platforms often organise learning into courses, levels or proprietary sequences. That can work well, but it can also make it harder to answer a very simple question:", "Different learning platforms organise content in different ways. For school revision, students may still have a very specific question:")
    .replace("This is the same basic learning loop many families are looking for when they subscribe to an education app:", "This creates a straightforward learning loop:")
    .replace("Pay for a service when the additional feature is genuinely valuable — not simply because the useful resources are hidden behind a familiar subscription model.", "If the free resources are being fully used and the learner still needs more support or volume, compare paid options based on that specific need.")
    .replace("For many Year 8 English learners, the immediate need is not another platform. It is a clear next topic and enough focused practice to master it.", "For some Year 8 English learners, the immediate need may simply be a clear next topic and enough focused practice to master it.");
}

let changed = 0;
let checked = 0;
for (const file of articleFiles()) {
  const html = fs.readFileSync(file, "utf8");
  checked++;
  let next = tightenKnownClaims(file, html);
  next = replaceOrInsert(next, campaignBlock(inferHub(file)), file);
  next = next.replace(/("dateModified"\s*:\s*")\d{4}-\d{2}-\d{2}("?)/g, `$1${TODAY}$2`);
  if (next !== html) {
    fs.writeFileSync(file, next);
    changed++;
  }
}

console.log(`Blog free-first campaign: ${checked} articles checked, ${changed} changed.`);