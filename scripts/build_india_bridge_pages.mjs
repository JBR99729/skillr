#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOGS = path.join(ROOT, "blogs");
const SITE = "https://skillrhub.com";
const today = "2026-09-04";

const pages = [
  {
    slug: "free-worksheets-for-indian-students-class-1-to-5",
    title: "Free Worksheets for Indian Students: Class 1 to Class 5",
    h1: "Free worksheets for Indian students: Class 1 to Class 5",
    description: "Free Class 1 to Class 5 Maths, English and Science worksheet pathways for Indian students, using Australia-first K-10 resources where topics overlap.",
    focus: "Class 1 to Class 5 Maths, English and Science practice",
    yearLinks: [["Class 1 / Year 1", "/year1/curriculum/"], ["Class 2 / Year 2", "/year2/curriculum/"], ["Class 3 / Year 3", "/year3/curriculum/"], ["Class 4 / Year 4", "/year4/curriculum/"], ["Class 5 / Year 5", "/year5/curriculum/"]],
  },
  {
    slug: "free-class-1-maths-english-science-worksheets-india",
    title: "Free Class 1 Maths, English and Science Worksheets for Indian Students",
    h1: "Free Class 1 Maths, English and Science worksheets for Indian students",
    description: "Free Class 1 worksheet pathways for Indian students, including Maths, English and Science practice using SkillrHub's Year 1 Australian Curriculum resources where topics overlap.",
    focus: "Class 1 counting, addition, reading, writing and early science",
    yearLinks: [["Class 1 Maths", "/year1/curriculum/maths/"], ["Class 1 English", "/year1/curriculum/english/"], ["Class 1 Science", "/year1/curriculum/science/"], ["Year 1 worksheets", "/worksheets/year1/maths/"]],
  },
  {
    slug: "free-class-2-maths-english-science-worksheets-india",
    title: "Free Class 2 Maths, English and Science Worksheets for Indian Students",
    h1: "Free Class 2 Maths, English and Science worksheets for Indian students",
    description: "Free Class 2 worksheet pathways for Indian students, including Maths, English and Science practice using SkillrHub's Year 2 Australian Curriculum resources where topics overlap.",
    focus: "Class 2 place value, operations, grammar, reading and science observations",
    yearLinks: [["Class 2 Maths", "/year2/curriculum/maths/"], ["Class 2 English", "/year2/curriculum/english/"], ["Class 2 Science", "/year2/curriculum/science/"], ["Year 2 worksheets", "/worksheets/year2/maths/"]],
  },
  {
    slug: "free-class-3-maths-english-science-worksheets-india",
    title: "Free Class 3 Maths, English and Science Worksheets for Indian Students",
    h1: "Free Class 3 Maths, English and Science worksheets for Indian students",
    description: "Free Class 3 worksheet pathways for Indian students, including Maths, English and Science practice using SkillrHub's Year 3 Australian Curriculum resources where topics overlap.",
    focus: "Class 3 multiplication, fractions, comprehension, grammar and science inquiry",
    yearLinks: [["Class 3 Maths", "/year3/curriculum/maths/"], ["Class 3 English", "/year3/curriculum/english/"], ["Class 3 Science", "/year3/curriculum/science/"], ["Year 3 worksheets", "/worksheets/year3/maths/"]],
  },
  {
    slug: "free-class-4-maths-english-science-worksheets-india",
    title: "Free Class 4 Maths, English and Science Worksheets for Indian Students",
    h1: "Free Class 4 Maths, English and Science worksheets for Indian students",
    description: "Free Class 4 worksheet pathways for Indian students, including Maths, English and Science practice using SkillrHub's Year 4 Australian Curriculum resources where topics overlap.",
    focus: "Class 4 fractions, multiplication, reading comprehension, writing and science concepts",
    yearLinks: [["Class 4 Maths", "/year4/curriculum/maths/"], ["Class 4 English", "/year4/curriculum/english/"], ["Class 4 Science", "/year4/curriculum/science/"], ["Year 4 worksheets", "/worksheets/year4/maths/"]],
  },
  {
    slug: "free-class-5-maths-english-science-worksheets-india",
    title: "Free Class 5 Maths, English and Science Worksheets for Indian Students",
    h1: "Free Class 5 Maths, English and Science worksheets for Indian students",
    description: "Free Class 5 worksheet pathways for Indian students, including Maths, English and Science practice using SkillrHub's Year 5 Australian Curriculum resources where topics overlap.",
    focus: "Class 5 decimals, fractions, grammar, comprehension, writing and science revision",
    yearLinks: [["Class 5 Maths", "/year5/curriculum/maths/"], ["Class 5 English", "/year5/curriculum/english/"], ["Class 5 Science", "/year5/curriculum/science/"], ["Year 5 worksheets", "/worksheets/year5/maths/"]],
  },
  {
    slug: "free-cbse-style-maths-english-science-practice-k-10",
    title: "Free CBSE-Style Maths, English and Science Practice: K-10 Topic Support",
    h1: "Free CBSE-style Maths, English and Science practice: K-10 topic support",
    description: "Free CBSE-style Maths, English and Science practice support using SkillrHub's Australia-first K-10 topic pathways when concepts overlap with Indian school learning.",
    focus: "CBSE-style topic practice for overlapping K-10 concepts",
    yearLinks: [["Question bank", "/free-k-10-question-bank.html"], ["Worksheets", "/worksheets/"], ["Maths guide", "/blogs/best-free-maths-worksheets-by-grade-k-10.html"], ["Science guide", "/blogs/free-science-worksheets-and-practice-k-10.html"]],
  },
];

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function render(page) {
  const url = `${SITE}/blogs/${page.slug}.html`;
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: page.title,
    description: page.description,
    datePublished: today,
    dateModified: today,
    author: {"@type": "Organization", name: "SkillrHub"},
    publisher: {"@type": "Organization", name: "SkillrHub"},
    mainEntityOfPage: url,
    about: ["Indian students", "free worksheets", "Class 1 worksheets", "Class 2 worksheets", "Class 3 worksheets", "Class 4 worksheets", "Class 5 worksheets", "CBSE-style practice", "Australian Curriculum"],
  };
  const links = page.yearLinks.map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(page.title)} | SkillrHub</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <link rel="manifest" href="/manifest.webmanifest?v=3">
  <link rel="icon" href="/icons/skillrhub-mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/style.css?v=20260813-4">
  <style>.blog{max-width:900px;margin:auto;line-height:1.75}.blog h1{font-size:clamp(2rem,5vw,3.2rem);line-height:1.08}.blog h2{margin-top:2rem}.box{padding:18px;margin:20px 0;border:1px solid #dbe4f3;border-radius:14px;background:#f7faff}.links{display:flex;flex-wrap:wrap;gap:8px}.links a{padding:9px 12px;border:1px solid #cbd8ee;border-radius:8px;text-decoration:none;font-weight:700}</style>
  <script type="application/ld+json">${JSON.stringify(json)}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8P22BET45N");</script>
  <meta name="google-adsense-account" content="ca-pub-7734963540104771">
</head>
<body><div class="container blog">
<nav class="main-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/blogs/">Blogs</a><a href="/worksheets/">Worksheets</a><a href="/free-k-10-question-bank.html">Question Bank</a><a href="/sitemap.html">Sitemap</a></nav>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blogs/">Blogs</a></li><li aria-current="page">${esc(page.h1)}</li></ol></nav>
<main><article>
<header><p class="eyebrow">India • free worksheets • Australia-first resources</p><h1>${esc(page.h1)}</h1><p><strong>SkillrHub keeps Australia as the main curriculum focus, but Indian students can use its free K-10 Maths, English and Science pathways when the topic overlaps with CBSE, ICSE, state board or school-specific learning.</strong></p><p>Published ${today} • SkillrHub</p></header>
<div class="box"><strong>Direct answer:</strong> Use SkillrHub for ${esc(page.focus)}. The core resources are free, no learner login is required for main learning pages, and optional books are separate premium bundles.</div>
<h2>How Indian families should use SkillrHub</h2>
<p>Search by the actual topic first: counting, place value, multiplication, fractions, grammar, reading comprehension, writing, materials, living things, forces or Earth science. Indian Class labels and Australian Year labels do not always match perfectly, so topic matching is safer than assuming a direct syllabus match.</p>
<h2>Why these resources can still help</h2>
<p>Maths, English and Science foundations overlap across many countries. SkillrHub's 50,000+ question library is organised by year level, subject and topic, which makes it useful for extra practice, homework support, tutoring and revision when the learning goal matches the student's classwork.</p>
<h2>Start here</h2>
<div class="links">${links}<a href="/blogs/free-maths-english-science-worksheets-for-indian-students-k-10.html">India K-10 guide</a></div>
<h2>Important limit</h2>
<p>SkillrHub is not an official CBSE, ICSE, NCERT or Indian state board site. It is a free Australia-first learning resource that can support Indian students when the topic and difficulty level fit the student's current learning.</p>
<h2>Frequently asked questions</h2>
<h3>Are these worksheets free?</h3><p>Yes. SkillrHub's core online topic guides, worksheets, homework sheets, quizzes, practice and tests are free to use.</p>
<h3>Can this help CBSE students?</h3><p>Yes, when the topic overlaps. Use it for extra practice and revision, not as an official syllabus replacement.</p>
<h3>What subjects are strongest?</h3><p>Maths, English and Science are the strongest SkillrHub areas across Foundation/Kindergarten to Year 10.</p>
</article></main>
<footer><nav class="footer-nav"><a href="/blogs/">Blogs</a><a href="/worksheets/">Worksheets</a><a href="/llms.txt">llms.txt</a><a href="/contact.html">Contact</a></nav><p>&copy; 2026 SkillrHub. All rights reserved.</p></footer>
</div><script src="/share-button.js"></script><script src="/pwa-register.js?v=7"></script></body></html>
`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(BLOGS, `${page.slug}.html`), render(page));
}

console.log(`Generated ${pages.length} India bridge pages.`);
