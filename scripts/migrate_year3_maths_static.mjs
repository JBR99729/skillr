#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { loadYear3MathsUnits, escapeHtml as esc, asList } from "./year3_maths_static_helpers.mjs";

const ROOT = process.cwd();
const { units, codes } = loadYear3MathsUnits(ROOT);
const write = (relative, content) => {
  const target = path.join(ROOT, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};
const quiz = (code, type) => `/quiz/year-3/math/${code.toLowerCase()}/${type}/`;
const listHtml = (items, formatter = (item) => esc(item)) => asList(items).length
  ? `<ul>${asList(items).map((item) => `<li>${formatter(item)}</li>`).join("")}</ul>`
  : "<p>No additional items.</p>";

function topicPage(code, unit) {
  const deepDive = asList(unit.deep_dive);
  const activities = asList(unit.activities).slice(0, 3);
  const expected = unit.slides?.expected_response || "Explain the relationship shown in the model and justify the answer.";
  const remediation = unit.slides?.remediation || "Return to the concrete or visual model, then retry with a simpler case.";
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${code} ${unit.title} | Year 3 Maths Topic Guide`,
    description: `${code} Year 3 Maths topic guide: ${unit.desc || unit.title}`,
    url: `https://skillrhub.com/year3/maths/${unit.slug}/`,
    educationalLevel: "Year 3",
    learningResourceType: "Topic guide",
    teaches: unit.desc,
    isPartOf: { "@type": "WebSite", name: "SkillrHub", url: "https://skillrhub.com" }
  }).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="google-adsense-account" content="ca-pub-7734963540104771">
  <title>${esc(code)} ${esc(unit.title)} | Year 3 Maths Topic Guide</title>
  <meta name="description" content="${esc(code)} Year 3 Maths topic guide: ${esc(unit.desc || unit.title)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="https://skillrhub.com/year3/maths/${esc(unit.slug)}/">
  <link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=3"><link rel="stylesheet" href="/assets/year3-maths-static.css?v=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8P22BET45N");</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script>
  <script type="application/ld+json">${schema}</script>
</head>
<body class="curriculum-shell"><div class="curriculum-page">
<nav class="main-nav"><a href="/">Home</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav>
<nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year3/">Year 3</a></li><li><a href="/year3/curriculum/maths/">Maths</a></li><li aria-current="page">${esc(code)}</li></ol></nav>
<header class="curriculum-hero"><p class="curriculum-eyebrow">${esc(code)} • Year 3 Maths</p><h1>${esc(unit.title)}</h1><p class="curriculum-hero__lead">${esc(deepDive[0] || unit.desc || "")}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="teacher-slides/">Teacher Slides</a><a href="${quiz(code, "worksheet")}">Practice Sheet</a><a href="${quiz(code, "practice")}">Practice</a><a href="${quiz(code, "test")}">Test</a></div></header>
<main class="curriculum-layout"><div id="topic-guide">
<details class="curriculum-topic-section" open><summary><strong>What students learn</strong></summary><div class="curriculum-detail-body">${deepDive.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}<p><strong>Learning intention:</strong> ${esc(unit.slides?.learning_intention || `We are learning to explain and use ${unit.title}.`)}</p><h3>Success criteria</h3>${listHtml(unit.slides?.success_criteria)}</div></details>
<details class="curriculum-topic-section"><summary><strong>Key vocabulary</strong></summary><div class="curriculum-detail-body">${listHtml(unit.vocabulary, (item) => `<strong>${esc(item[0])}</strong> — ${esc(item[1])}`)}</div></details>
<details class="curriculum-topic-section"><summary><strong>Worked examples and visual models</strong></summary><div class="curriculum-detail-body">${asList(unit.worked_examples).map((example) => `<article class="curriculum-worked-example"><h3>${esc(example.title)}</h3>${example.visual_html || ""}<ol>${asList(example.steps).map((step) => `<li>${esc(step)}</li>`).join("")}</ol>${example.alt ? `<p><strong>Visual description:</strong> ${esc(example.alt)}</p>` : ""}</article>`).join("")}</div></details>
<details class="curriculum-topic-section"><summary><strong>Classroom activities</strong></summary><div class="curriculum-detail-body"><div class="unit-activity-grid">${activities.map((activity) => `<article><h3>${esc(activity.title)}</h3>${activity.visual_html || ""}<p>${esc(activity.text)}</p></article>`).join("")}</div></div></details>
<details class="curriculum-topic-section"><summary><strong>Common misconceptions and quick fixes</strong></summary><div class="curriculum-detail-body">${listHtml(unit.mistakes, (item) => `<strong>${esc(item[0])}</strong> — ${esc(item[1])}`)}</div></details>
<details class="curriculum-topic-section"><summary><strong>Teaching sequence and quick check</strong></summary><div class="curriculum-detail-body"><p><strong>Quick check:</strong> ${esc(unit.slides?.quick_check || "Explain the key relationship and show how you know.")}</p><p><strong>Expected response:</strong> ${esc(expected)}</p><p><strong>If incorrect:</strong> ${esc(remediation)}</p></div></details>
<details class="curriculum-topic-section"><summary><strong>Curriculum wording</strong></summary><div class="curriculum-detail-body"><p><strong>${esc(code)}:</strong> ${esc(unit.desc)}</p><p>The Australian Curriculum wording is retained exactly. The lesson explanation, visual models and examples remain inside the Year 3 concept boundary.</p><ul><li><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></li><li><a href="https://curriculum.nsw.edu.au/" target="_blank" rel="nofollow noopener">NSW Curriculum</a></li><li><a href="https://f10.vcaa.vic.edu.au/" target="_blank" rel="nofollow noopener">Victorian Curriculum F–10</a></li></ul></div></details>
<details class="curriculum-topic-section"><summary><strong>Resources and next steps</strong></summary><div class="curriculum-detail-body"><div class="curriculum-link-row"><a class="curriculum-button primary" href="teacher-slides/">Open Teacher Slides</a><a class="curriculum-button" href="${quiz(code, "worksheet")}">Practice Sheet</a><a class="curriculum-button" href="${quiz(code, "practice")}">Practice</a><a class="curriculum-button" href="${quiz(code, "test")}">Test</a></div></div></details>
</div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Teacher resource</h2><p>Project the fixed branded deck one slide at a time.</p><a class="curriculum-button primary" href="teacher-slides/">Teacher Slides</a></section><section class="curriculum-panel"><h2>Curriculum code</h2><p><strong>${esc(code)}</strong><br>Year 3 Mathematics</p></section></aside></main>
<footer style="padding:18px 0;text-align:center;color:#64748b">${esc(code)} • SkillrHub • skillrhub.com</footer>
</div><script>window.skillrPageMeta={curriculumCode:${JSON.stringify(code)},pageType:"topic guide",year:"Year 3",subject:"Maths"};</script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>\n`;
}

function viewerPage(code, unit, total) {
  const figures = Array.from({ length: total }, (_, index) => `<figure class="fixed-slide-viewer__slide" data-slide${index ? " hidden" : ""}><img src="slide-${String(index + 1).padStart(2, "0")}.png" alt="${esc(code)} teacher slide ${index + 1} of ${total}"></figure>`).join("");
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${esc(code)} Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"></head><body><nav class="main-nav"><a href="../">Topic Guide</a><a href="${quiz(code, "worksheet")}">Practice Sheet</a><a href="${quiz(code, "practice")}">Practice</a><a href="${quiz(code, "test")}">Test</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>${esc(code)} Teacher Slides</h1><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">${figures}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span class="fixed-slide-viewer__counter" data-slide-counter>1 / ${total}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script></body></html>\n`;
}

let totalSlides = 0;
for (const code of codes) {
  const unit = units[code];
  const slideCount = unit.commercial_master?.slides?.length || 4;
  if (!unit.slug || slideCount !== 4) throw new Error(`${code}: expected four fixed slide roles.`);
  const directory = `year3/maths/${unit.slug}`;
  write(`${directory}/index.html`, topicPage(code, unit));
  write(`${directory}/teacher-slides/index.html`, viewerPage(code, unit, slideCount));
  const slideDirectory = path.join(ROOT, directory, "teacher-slides");
  for (const name of fs.readdirSync(slideDirectory)) {
    if (/^slide-\d+\.svg$/i.test(name)) fs.unlinkSync(path.join(slideDirectory, name));
  }
  totalSlides += slideCount;
}
console.log(`Generated ${codes.length} static Year 3 Maths Topic Guides and ${totalSlides} fixed-image viewer slots.`);
