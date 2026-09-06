import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const curriculumRoots = ["foundation", ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];

// Search Console opportunities observed in the settled 2026-07-30..2026-08-26 window.
// These weights only break ties inside the same year/subject cluster; they never create unrelated cross-subject links.
const gscPriority = new Map([
  ["AC9M3M04", 500],
  ["AC9M3M03", 420],
  ["AC9S8I06", 360],
  ["AC9S7I06", 300],
  ["AC9S2U01", 260],
  ["AC9S1U01", 240],
  ["AC9E5LY06", 220],
  ["AC9M1N05", 210],
  ["AC9M1N04", 190],
  ["AC9E1LY05", 170],
  ["AC9MFN01", 160],
  ["AC9MFM01", 140],
  ["AC9SFU01", 140],
]);

const stopWords = new Set([
  "about", "after", "again", "against", "along", "also", "among", "and", "apply", "are", "been", "being", "between", "can", "compare", "describe", "develop", "different", "explain", "from", "have", "how", "identify", "including", "into", "investigate", "make", "more", "other", "recognise", "represent", "that", "the", "their", "them", "these", "they", "this", "through", "understand", "using", "with", "within", "year",
]);

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const decodeEntities = (value) => String(value ?? "")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));

const text = (html) => decodeEntities(String(html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

const findFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findFiles(full));
    else if (entry.isFile() && full.endsWith(`${path.sep}teacher-slides${path.sep}index.html`)) out.push(full);
  }
  return out;
};

const parseFamily = (code) => {
  const patterns = [
    /^AC9E(?:F|\d+)(LA|LE|LY)(\d+)$/,
    /^AC9M(?:F|\d+)(SP|ST|N|A|M|P)(\d+)$/,
    /^AC9S(?:F|\d+)(H|I|U)(\d+)$/,
  ];
  for (const regex of patterns) {
    const match = code.match(regex);
    if (match) return { strand: match[1], number: Number(match[2]) };
  }
  return { strand: "", number: Number.NaN };
};

const tokens = (value) => new Set(
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !stopWords.has(word)),
);

const similarity = (a, b) => {
  const left = tokens(a);
  const right = tokens(b);
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const word of left) if (right.has(word)) intersection++;
  return intersection / (left.size + right.size - intersection);
};

const parsePage = (file) => {
  const html = fs.readFileSync(file, "utf8");
  if (!/<h1 id="page-title">Classroom View<\/h1>/i.test(html)) return null;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? "";
  const titleHtml = html.match(/<p class="display-topic-title">([\s\S]*?)<\/p>/i)?.[1] ?? "";
  const topicTitle = text(titleHtml);
  const code = (topicTitle.match(/\bAC9[A-Z0-9]+\b/i)?.[0] ?? canonical.match(/\bAC9[A-Z0-9]+\b/i)?.[0] ?? "").toUpperCase();
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const [year, subject] = rel.split("/");
  if (!canonical || !code || !year || !subject) return null;
  const topicName = topicTitle.replace(new RegExp(`^${code}\\s*[-–—:]\\s*`, "i"), "").trim() || code;
  const classroomPath = `/${path.dirname(rel).replace(/\\/g, "/")}/`;
  const classroomUrl = `https://skillrhub.com${classroomPath}`;
  const yearLabel = year === "foundation" ? "Foundation" : `Year ${year.replace(/^year/, "")}`;
  const subjectLabel = subject === "maths" ? "Maths" : subject[0].toUpperCase() + subject.slice(1);
  const family = parseFamily(code);
  return { file, html, canonical, classroomUrl, classroomPath, year, yearLabel, subject, subjectLabel, code, topicName, ...family };
};

const preferredRepresentative = (pages) => [...pages].sort((a, b) => {
  const aCanonicalPath = new URL(a.canonical).pathname.replace(/\/+$/, "/");
  const bCanonicalPath = new URL(b.canonical).pathname.replace(/\/+$/, "/");
  const aPreferred = a.classroomPath === `${aCanonicalPath}teacher-slides/` ? 1 : 0;
  const bPreferred = b.classroomPath === `${bCanonicalPath}teacher-slides/` ? 1 : 0;
  if (aPreferred !== bPreferred) return bPreferred - aPreferred;
  if (a.classroomPath.length !== b.classroomPath.length) return a.classroomPath.length - b.classroomPath.length;
  return a.classroomPath.localeCompare(b.classroomPath);
})[0];

const scoreCandidate = (from, candidate) => {
  let score = 100;
  const sameStrand = Boolean(from.strand && candidate.strand && from.strand === candidate.strand);
  if (sameStrand) {
    score += 1200;
    if (Number.isFinite(from.number) && Number.isFinite(candidate.number)) {
      const distance = Math.abs(from.number - candidate.number);
      score += Math.max(0, 450 - distance * 70);
      if (distance === 1) score += 250;
    }
  }
  score += similarity(from.topicName, candidate.topicName) * 350;
  const priority = gscPriority.get(candidate.code) ?? 0;
  score += sameStrand ? priority : priority * 0.2;
  return score;
};

const buildRelatedSection = (page, candidates) => {
  const hubUrl = `https://skillrhub.com/${page.year}/curriculum/${page.subject}/`;
  const items = candidates.map((candidate) =>
    `<li><a href="${esc(candidate.canonical)}"><strong>${esc(candidate.code)}</strong> — ${esc(candidate.topicName)}</a><span aria-hidden="true"> · </span><a href="${esc(candidate.classroomUrl)}">Classroom View →</a></li>`,
  ).join("");
  return `<details class="classroom-related" data-classroom-related><summary><span>Related Classroom Views</span><span>Keep teaching</span></summary><div class="panel"><article class="content-block"><h2>Related Classroom Views</h2><p>Continue through closely related ${esc(page.yearLabel)} ${esc(page.subjectLabel)} concepts.</p><ul class="classroom-related-list">${items}</ul><p class="classroom-related-hub"><a class="display-button" href="${esc(hubUrl)}">Explore all ${esc(page.yearLabel)} ${esc(page.subjectLabel)} topics</a></p></article></div></details>`;
};

const patchGeneratorScripts = () => {
  const scriptsDir = path.join(root, "scripts");
  if (!fs.existsSync(scriptsDir)) return 0;
  let changed = 0;
  for (const name of fs.readdirSync(scriptsDir)) {
    if (!/^convert_.*teacher_slides_to_display_pages\.mjs$/.test(name)) continue;
    const file = path.join(scriptsDir, name);
    const source = fs.readFileSync(file, "utf8");
    if (source.includes("build_classroom_view_topic_links.mjs")) continue;
    const addition = `\n\nconst { buildClassroomViewTopicLinks } = await import("./build_classroom_view_topic_links.mjs");\nbuildClassroomViewTopicLinks({ patchGenerators: false });\n`;
    fs.writeFileSync(file, source.replace(/\s*$/, "") + addition);
    changed++;
  }
  return changed;
};

export function buildClassroomViewTopicLinks({ patchGenerators = false } = {}) {
  const files = curriculumRoots.flatMap((dir) => findFiles(path.join(root, dir)));
  const pages = files.map(parsePage).filter(Boolean);
  const byCode = new Map();
  for (const page of pages) {
    if (!byCode.has(page.code)) byCode.set(page.code, []);
    byCode.get(page.code).push(page);
  }
  const representatives = [...byCode.values()].map(preferredRepresentative);

  let changed = 0;
  for (const page of pages) {
    const candidates = representatives
      .filter((candidate) => candidate.code !== page.code && candidate.year === page.year && candidate.subject === page.subject)
      .map((candidate) => ({ candidate, score: scoreCandidate(page, candidate) }))
      .sort((a, b) => b.score - a.score || a.candidate.code.localeCompare(b.candidate.code))
      .slice(0, 4)
      .map(({ candidate }) => candidate);
    if (!candidates.length) continue;

    const section = buildRelatedSection(page, candidates);
    let next = page.html.replace(/\s*<details class="classroom-related" data-classroom-related>[\s\S]*?<\/details>\s*/i, "\n");
    const needHelp = /(<details><summary><span>Need extra information\?<\/span>)/i;
    if (needHelp.test(next)) next = next.replace(needHelp, `${section}\n$1`);
    else next = next.replace(/(<\/div><\/div>\s*<\/section>)/i, `${section}\n$1`);
    if (next !== page.html) {
      fs.writeFileSync(page.file, next);
      changed++;
    }
  }

  const generatorChanges = patchGenerators ? patchGeneratorScripts() : 0;
  console.log(`Classroom View topical links: ${pages.length} pages checked, ${changed} pages changed, ${generatorChanges} generators future-proofed.`);
  return { pages: pages.length, changed, generatorChanges };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) buildClassroomViewTopicLinks({ patchGenerators: true });
