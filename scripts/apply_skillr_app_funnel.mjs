import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const supported = {
  maths: new Set([
    "AC9M1N01", "AC9M1N02", "AC9M1N03", "AC9M1N04", "AC9M1N05", "AC9M1N06",
    "AC9M1A01", "AC9M1A02", "AC9M1M01", "AC9M1M02", "AC9M1M03",
    "AC9M1SP01", "AC9M1SP02", "AC9M1ST01",
  ]),
  science: new Set(["AC9S1U01", "AC9S1U02", "AC9S1U03", "AC9S1H01"]),
};

const funnelCss = '<link rel="stylesheet" href="/assets/css/app-funnel.css?v=20260923-1">';
const funnelJs = '<script src="/assets/app-funnel.js?v=20260923-1" defer></script>';

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function snapshot(source) {
  const get = (pattern) => source.match(pattern)?.[1]?.replace(/\s+/g, " ").trim() || "";
  return {
    title: get(/<title>([\s\S]*?)<\/title>/i),
    description: get(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i),
    canonical: get(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i),
    h1: get(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  };
}

function ensureAssets(source) {
  let output = source;
  if (!output.includes("/assets/css/app-funnel.css")) output = output.replace(/<\/head>/i, `${funnelCss}\n</head>`);
  if (!output.includes("/assets/app-funnel.js")) output = output.replace(/<\/body>/i, `${funnelJs}\n</body>`);
  return output;
}

function appUrl(subject, code = "") {
  const params = new URLSearchParams({
    year: "1",
    ...(code ? { code, topic: "1" } : {}),
    utm_source: "skillrhub",
    utm_medium: "curriculum",
    utm_campaign: "year1_app_funnel",
    utm_content: code || `${subject}_hub`,
  });
  return `https://app.skillrhub.com/student/${subject}/?${params}`;
}

function topicBlock(subject, code, title) {
  const subjectLabel = subject === "maths" ? "Maths" : "Science";
  return `<aside class="skillr-app-funnel" aria-labelledby="skillr-app-title-${code.toLowerCase()}">
  <div><p class="skillr-app-funnel__eyebrow">Skillr App · Year 1</p><h2 id="skillr-app-title-${code.toLowerCase()}">Keep this skill and progress together</h2><p class="skillr-app-funnel__copy">Open ${esc(title)} in Skillr App to move from teaching to purposeful practice, a separate test and saved learner progress.</p><ul class="skillr-app-funnel__proof"><li>Exact curriculum code</li><li>Practice + separate test</li><li>Progress tracking</li></ul></div>
  <a class="skillr-app-funnel__action" href="${esc(appUrl(subject, code))}" data-skillr-app-cta data-curriculum-code="${code}" data-curriculum-subject="${subjectLabel}" data-funnel-location="topic-hero">Open ${code} in Skillr App →</a>
</aside>`;
}

function hubBlock(subject, heading, copy) {
  const subjectLabel = subject === "maths" ? "Maths" : "Science";
  return `<aside class="skillr-app-funnel" aria-labelledby="skillr-app-hub-${subject}">
  <div><p class="skillr-app-funnel__eyebrow">Skillr App · Year 1</p><h2 id="skillr-app-hub-${subject}">${esc(heading)}</h2><p class="skillr-app-funnel__copy">${esc(copy)}</p><ul class="skillr-app-funnel__proof"><li>Teach → Practise → Test</li><li>Saved learner progress</li><li>Free account</li></ul></div>
  <a class="skillr-app-funnel__action" href="${esc(appUrl(subject))}" data-skillr-app-cta data-curriculum-subject="${subjectLabel}" data-funnel-location="subject-hub">Open Year 1 ${subjectLabel} in Skillr App →</a>
</aside>`;
}

function yearHubBlock() {
  const url = "https://app.skillrhub.com/?utm_source=skillrhub&utm_medium=curriculum&utm_campaign=year1_app_funnel&utm_content=year1_hub";
  return `<aside class="skillr-app-funnel" aria-labelledby="skillr-app-year1-hub">
  <div><p class="skillr-app-funnel__eyebrow">Skillr App · Public beta</p><h2 id="skillr-app-year1-hub">Turn Year 1 curriculum choices into saved progress</h2><p class="skillr-app-funnel__copy">Use the Year 1 Maths path and reviewed Science topics currently released in Skillr App. Teach, practise, test and review each supported skill in one place.</p><ul class="skillr-app-funnel__proof"><li>Year 1 Maths</li><li>Selected Year 1 Science</li><li>Free account</li></ul></div>
  <a class="skillr-app-funnel__action" href="${esc(url)}" data-skillr-app-cta data-funnel-location="year-hub">Explore the Year 1 Skillr App →</a>
</aside>`;
}

const targets = [];
for (const [subject, codes] of Object.entries(supported)) {
  const directory = path.join(root, "year1", subject);
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(directory, entry.name, "index.html");
    if (!fs.existsSync(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    const code = (source.match(/\bAC9[A-Z0-9]+\b/i)?.[0] || "").toUpperCase();
    if (codes.has(code)) targets.push({ type: "topic", subject, code, file });
  }
  targets.push({ type: "hub", subject, file: path.join(root, "year1", "curriculum", subject, "index.html") });
}
targets.push({ type: "year-hub", file: path.join(root, "year1", "curriculum", "index.html") });

const failures = [];
let changed = 0;
for (const target of targets) {
  const before = fs.readFileSync(target.file, "utf8");
  const beforeSeo = snapshot(before);
  let after = before.replace(/<aside\b[^>]*class=["'][^"']*\bskillr-app-funnel\b[^"']*["'][^>]*>[\s\S]*?<\/aside>/i, "");
  if (target.type === "topic") {
    const title = beforeSeo.h1 || target.code;
    const block = topicBlock(target.subject, target.code, title);
    const lead = /(<p\b[^>]*class=["'][^"']*curriculum-hero__lead[^"']*["'][^>]*>[\s\S]*?<\/p>)/i;
    if (!lead.test(after)) {
      failures.push(`${path.relative(root, target.file)}: topic hero lead not found`);
      continue;
    }
    after = after.replace(lead, `$1${block}`);
  } else {
    const block = target.type === "hub"
      ? (target.subject === "maths"
        ? hubBlock("maths", "Turn curriculum browsing into a learning plan", "Choose the matching Maths skill in Skillr App, then teach, practise, test and review progress in one connected path.")
        : hubBlock("science", "Continue available Year 1 Science in the app", "Open the reviewed Science skills currently available in Skillr App and keep practice, tests and learner progress together."))
      : yearHubBlock();
    const hero = /(<header\b[^>]*class=["'][^"']*\bcurriculum-hero\b[^"']*["'][^>]*>[\s\S]*?)(<\/header>)/i;
    if (!hero.test(after)) {
      failures.push(`${path.relative(root, target.file)}: curriculum hero not found`);
      continue;
    }
    after = after.replace(hero, `$1${block}$2`);
  }
  after = ensureAssets(after);
  if (JSON.stringify(snapshot(after)) !== JSON.stringify(beforeSeo)) {
    failures.push(`${path.relative(root, target.file)}: protected SEO signal changed`);
    continue;
  }
  if (after !== before) {
    changed++;
    if (checkOnly) failures.push(`${path.relative(root, target.file)}: app funnel is not current`);
    else fs.writeFileSync(target.file, after);
  }
}

console.log(JSON.stringify({ mode: checkOnly ? "check" : "apply", targets: targets.length, changed, failures: failures.length }, null, 2));
if (failures.length) {
  console.error(failures.slice(0, 50).join("\n"));
  process.exitCode = 1;
}
