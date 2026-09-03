#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://skillrhub.com";
const years = [
  ["foundation", "Foundation", "Foundation/Kindergarten", "F"],
  ["year1", "Year 1", "Year 1", "1"],
  ["year2", "Year 2", "Year 2", "2"],
  ["year3", "Year 3", "Year 3", "3"],
  ["year4", "Year 4", "Year 4", "4"],
  ["year5", "Year 5", "Year 5", "5"],
  ["year6", "Year 6", "Year 6", "6"],
  ["year7", "Year 7", "Year 7", "7"],
  ["year8", "Year 8", "Year 8", "8"],
  ["year9", "Year 9", "Year 9", "9"],
  ["year10", "Year 10", "Year 10", "10"],
];
const subjects = [
  ["maths", "Maths", "Mathematics", "number, algebra, measurement, space and statistics"],
  ["science", "Science", "Science", "science understanding, inquiry skills and real-world investigation"],
  ["english", "English", "English", "reading, writing, language, literature and communication"],
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function curriculumPath(yearSlug, subjectSlug = "") {
  const base = yearSlug === "foundation" ? "/foundation/curriculum/" : `/${yearSlug}/curriculum/`;
  return subjectSlug ? `${base}${subjectSlug}/` : base;
}

function worksheetKind(yearSlug) {
  return ["foundation", "year1", "year2", "year3", "year4", "year5"].includes(yearSlug)
    ? "worksheets"
    : "homework sheets";
}

function titleCaseResourceKind(kind) {
  return kind
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function renderPage(year, subject) {
  const [yearSlug, yearLabel, longYearLabel, shortYear] = year;
  const [subjectSlug, subjectLabel, schemaSubject, subjectScope] = subject;
  const kind = worksheetKind(yearSlug);
  const title = `Free ${yearLabel} ${subjectLabel} ${titleCaseResourceKind(kind)} | SkillrHub`;
  const description = `Free Australian Curriculum-aligned ${yearLabel} ${subjectLabel} ${kind} with topic guides, practice, tests and printable learning resources.`;
  const url = `${SITE}/worksheets/${yearSlug}/${subjectSlug}/`;
  const curriculum = curriculumPath(yearSlug, subjectSlug);
  const yearHub = curriculumPath(yearSlug);
  const siblingLinks = subjects
    .map(([slug, label]) => `<a href="/worksheets/${yearSlug}/${slug}/"${slug === subjectSlug ? ' aria-current="page"' : ""}>${escapeHtml(yearLabel)} ${escapeHtml(label)}</a>`)
    .join("");
  const stageLinks = years
    .map(([slug, label]) => `<a href="/worksheets/${slug}/${subjectSlug}/"${slug === yearSlug ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`)
    .join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${yearLabel} ${subjectLabel} free ${kind}`,
    url,
    description,
    inLanguage: "en-AU",
    isPartOf: { "@type": "WebSite", name: "SkillrHub", url: SITE },
    about: [
      { "@type": "DefinedTerm", name: "Australian Curriculum" },
      { "@type": "DefinedTerm", name: longYearLabel },
      { "@type": "DefinedTerm", name: schemaSubject },
    ],
    hasPart: [
      {
        "@type": "LearningResource",
        name: `${yearLabel} ${subjectLabel} curriculum hub`,
        url: `${SITE}${curriculum}`,
        educationalLevel: yearLabel,
        educationalSubject: schemaSubject,
        learningResourceType: ["Topic guide", "Worksheet", "Practice", "Test"],
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="SkillrHub">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/icons/skillrhub-mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/style.css?v=20260813-4">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <meta name="google-adsense-account" content="ca-pub-7734963540104771">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8P22BET45N");</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script>
</head>
<body>
  <div class="container">
    <nav class="main-nav" aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/worksheets/" aria-current="page">Worksheets</a>
      <a href="/dashboard/">Dashboard</a>
      <a href="/blogs/">Blogs</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
    </nav>

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/worksheets/">Worksheets</a></li>
        <li><a href="${yearHub}">${escapeHtml(yearLabel)}</a></li>
        <li aria-current="page">${escapeHtml(subjectLabel)}</li>
      </ol>
    </nav>

    <main>
      <header class="page-hero">
        <p class="eyebrow">Free Australian Curriculum resources • ${escapeHtml(longYearLabel)}</p>
        <h1>Free ${escapeHtml(yearLabel)} ${escapeHtml(subjectLabel)} ${escapeHtml(kind)}</h1>
        <p>Browse ${escapeHtml(yearLabel)} ${escapeHtml(subjectLabel)} resources for ${escapeHtml(subjectScope)}. Each topic keeps the guide, teacher slides, worksheet or homework sheet, practice and test links together.</p>
        <p><a class="button" href="${curriculum}">Open ${escapeHtml(yearLabel)} ${escapeHtml(subjectLabel)} curriculum hub</a></p>
      </header>

      <section class="content-section" aria-labelledby="included-heading">
        <h2 id="included-heading">What you can find</h2>
        <ul>
          <li>Australian Curriculum-aligned topic guides written as static, indexable pages.</li>
          <li>Printable ${escapeHtml(kind)} and practice activities where available.</li>
          <li>Separate practice and test routes for students who need feedback and review.</li>
          <li>Teacher slide viewers linked from the matching curriculum topic.</li>
        </ul>
      </section>

      <section class="content-section" aria-labelledby="browse-heading">
        <h2 id="browse-heading">Browse related free resources</h2>
        <p>Stay within ${escapeHtml(yearLabel)} or switch year levels for ${escapeHtml(subjectLabel)}.</p>
        <div class="worksheet-year-grid">${siblingLinks}</div>
        <div class="worksheet-year-grid">${stageLinks}</div>
      </section>

      <section class="content-section" aria-labelledby="canonical-heading">
        <h2 id="canonical-heading">Canonical resource path</h2>
        <p>For the full list of ${escapeHtml(yearLabel)} ${escapeHtml(subjectLabel)} curriculum codes and resource links, use the <a href="${curriculum}">${escapeHtml(yearLabel)} ${escapeHtml(subjectLabel)} curriculum hub</a>.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Skillr Education. All rights reserved.</p>
      <p><a href="/sitemap.html">Sitemap</a> · <a href="/privacy-policy.html">Privacy</a> · <a href="/contact.html">Contact</a></p>
    </footer>
  </div>
  <script src="/share-button.js"></script>
  <script src="/pwa-register.js?v=6"></script>
</body>
</html>
`;
}

for (const year of years) {
  for (const subject of subjects) {
    const target = path.join(ROOT, "worksheets", year[0], subject[0], "index.html");
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, renderPage(year, subject), "utf8");
  }
}

console.log(`Generated ${years.length * subjects.length} worksheet landing pages.`);
