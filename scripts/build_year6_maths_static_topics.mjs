#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({ window: {}, console, Array, Object, Number, String, Math, Map, Set });
for (const relative of [
  "assets/year6-curriculum-base.js",
  "assets/year6-maths-data-n.js",
  "assets/year6-maths-data-am.js",
  "assets/year6-maths-data-spstp.js"
]) {
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
}

const units = context.window.SkillrYear6MathsData || {};
const order = context.window.SkillrYear6MathsOrder || Object.keys(units);
if (order.length !== 24) throw new Error(`Expected 24 Year 6 Maths units, found ${order.length}.`);

const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
const lower = (code) => code.toLowerCase();
const viewerUrl = (code) => `/worksheets/year6/maths/teacher-slides/viewer/?code=${encodeURIComponent(code)}`;
const quizUrl = (code, mode) => `/quiz/year-6/math/${lower(code)}/${mode}/`;
const pageUrl = (unit) => `/year6/maths/${unit.slug}/`;
const list = (items, className = "") => `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
const splitRoutine = (routine) => String(routine || "Represent → Reason → Calculate → Interpret → Verify").split("→").map((part) => part.trim()).filter(Boolean);

const nav = `<nav class="main-nav"><a href="/">Home</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/how-to-use-skillr.html">How to use Skillr</a><a href="/privacy-policy.html">Privacy Policy</a></nav>`;

for (let index = 0; index < order.length; index += 1) {
  const code = order[index];
  const unit = units[code];
  if (!unit?.slug || !unit?.title || !unit?.model_html || !unit?.apply_html) throw new Error(`${code}: incomplete static topic source.`);

  const success = (unit.mastery || []).slice(0, 5).map((item) => `I can ${String(item).charAt(0).toLowerCase()}${String(item).slice(1)}.`);
  const routine = splitRoutine(unit.routine);
  const activities = (unit.activities || []).slice(0, 3);
  const mistakes = (unit.mistakes || []).slice(0, 5);
  const checks = (unit.quick || []).slice(0, 6);
  const previousCode = order[index - 1];
  const nextCode = order[index + 1];
  const previousUnit = previousCode ? units[previousCode] : null;
  const nextUnit = nextCode ? units[nextCode] : null;
  const canonical = `https://skillrhub.com${pageUrl(unit)}`;
  const description = `${code} Year 6 Maths topic guide for ${unit.title}, with a static lesson, worked visual models, teacher slides, practice sheet, Practice and Test.`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${code} ${unit.title} | Year 6 Maths Topic Guide`,
    description,
    url: canonical,
    educationalLevel: "Year 6",
    learningResourceType: "Topic guide",
    teaches: unit.desc,
    isPartOf: { "@type": "WebSite", name: "SkillrHub", url: "https://skillrhub.com" }
  }).replace(/</g, "\\u003c");

  const relatedLinks = [
    previousUnit ? `<a href="${pageUrl(previousUnit)}">← ${esc(previousCode)}: ${esc(previousUnit.title)}</a>` : "",
    nextUnit ? `<a href="${pageUrl(nextUnit)}">${esc(nextCode)}: ${esc(nextUnit.title)} →</a>` : ""
  ].filter(Boolean).join("");

  const html = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="google-adsense-account" content="ca-pub-7734963540104771">
  <title>${esc(code)} ${esc(unit.title)} | Year 6 Maths Topic Guide</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(code)} ${esc(unit.title)} | Year 6 Maths">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="SkillrHub">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#173968">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/assets/curriculum.css?v=3">
  <link rel="stylesheet" href="/assets/year6-curriculum.css?v=1">
  <link rel="stylesheet" href="/assets/static-topic.css?v=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8P22BET45N");</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script>
  <script type="application/ld+json">${schema}</script>
</head>
<body class="static-topic-shell">
<div class="static-topic-page">
  ${nav}
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year6/curriculum/">Year 6 curriculum</a></li><li><a href="/year6/curriculum/maths/">Maths</a></li><li aria-current="page">${esc(code)}</li></ol></nav>

  <header class="static-topic-hero">
    <p class="curriculum-eyebrow">${esc(code)} • Year 6 Mathematics</p>
    <h1>${esc(unit.title)}</h1>
    <p class="static-topic-hero__lead">${esc(unit.subtitle || unit.learn)}</p>
    <div class="static-topic-actions">
      <a class="primary" href="#topic-guide">Topic Guide</a>
      <a href="${viewerUrl(code)}">Teacher Slides</a>
      <a href="${quizUrl(code, "worksheet")}">Practice Sheet</a>
      <a href="${quizUrl(code, "practice")}">Practice</a>
      <a href="${quizUrl(code, "test")}">Test</a>
    </div>
  </header>

  <main class="static-topic-grid" id="topic-guide">
    <div class="static-topic-content">
      <details class="static-topic-summary" open>
        <summary>What students learn</summary>
        <div class="static-topic-panel">
          <h2>Learning goal</h2>
          <p>${esc(unit.learn)}</p>
          <h3>Success criteria</h3>
          ${list(success)}
          <h3>Teaching routine</h3>
          <ol class="static-topic-routine">${routine.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
          <div class="static-topic-note"><strong>Curriculum focus:</strong> ${esc(unit.desc)}</div>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Key concept and central model</summary>
        <div class="static-topic-panel">
          <h2>${esc(unit.model_title)}</h2>
          <p>Use the visual model first. Ask students to identify the quantities, structure or conditions before calculating or explaining.</p>
          <div class="static-topic-model">${unit.model_html}</div>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Worked application and transfer</summary>
        <div class="static-topic-panel">
          <h2>${esc(unit.apply_title)}</h2>
          <p>Connect the central relationship to a new context, then verify the conclusion with a second representation, estimate, inverse operation or reasonableness check.</p>
          <div class="static-topic-model">${unit.apply_html}</div>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Classroom activities</summary>
        <div class="static-topic-panel">
          <div class="static-topic-cards">${activities.map((activity) => `<article class="static-topic-card"><h3>${esc(activity.title)}</h3><p>${esc(activity.text)}</p></article>`).join("")}</div>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Common mistakes and rapid fixes</summary>
        <div class="static-topic-panel">
          <div class="static-topic-mistakes">${mistakes.map(([name, fix]) => `<div class="static-topic-mistake"><strong>${esc(name)}</strong><span>${esc(fix)}</span></div>`).join("")}</div>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Quick mastery check</summary>
        <div class="static-topic-panel">
          <h2>Check understanding</h2>
          ${list(checks)}
          <h3>Evidence of mastery</h3>
          ${list(unit.mastery || [])}
          <p class="static-topic-note"><strong>Decision:</strong> continue when students can explain the model, apply it to a new example and justify their check. Otherwise return to the central model and reduce the numerical or representational load.</p>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Curriculum wording and references</summary>
        <div class="static-topic-panel">
          <h2>Australian Curriculum v9.0</h2>
          <p><strong>${esc(code)}:</strong> ${esc(unit.desc)}</p>
          <p>The Australian Curriculum code and wording are exact. International teachers can use the underlying mathematical concept while matching the lesson to their local grade or year outcomes.</p>
          <ul><li><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></li><li><a href="https://curriculum.nsw.edu.au/" target="_blank" rel="nofollow noopener">NSW Curriculum</a></li><li><a href="https://f10.vcaa.vic.edu.au/" target="_blank" rel="nofollow noopener">Victorian Curriculum F–10</a></li></ul>
        </div>
      </details>

      <details class="static-topic-summary">
        <summary>Resources and next steps</summary>
        <div class="static-topic-panel">
          <div class="static-topic-cards">
            <article class="static-topic-card"><h3>Teacher Slides</h3><p>Project the fixed, branded four-page teaching sequence.</p><a href="${viewerUrl(code)}">Open Teacher Slides</a></article>
            <article class="static-topic-card"><h3>Practice Sheet</h3><p>Use the printable activity for written practice.</p><a href="${quizUrl(code, "worksheet")}">Open Practice Sheet</a></article>
            <article class="static-topic-card"><h3>Practice and Test</h3><p>Use supported Practice first, then the separate Test when ready.</p><a href="${quizUrl(code, "practice")}">Open Practice</a><br><a href="${quizUrl(code, "test")}">Open Test</a></article>
          </div>
        </div>
      </details>
    </div>

    <aside class="static-topic-sidebar">
      <section class="static-topic-sidecard"><h2>Quick links</h2><a href="${viewerUrl(code)}">Teacher Slides</a><a href="${quizUrl(code, "worksheet")}">Practice Sheet</a><a href="${quizUrl(code, "practice")}">Practice</a><a href="${quizUrl(code, "test")}">Test</a></section>
      <section class="static-topic-sidecard"><h2>Nearby topics</h2>${relatedLinks || `<a href="/year6/curriculum/maths/">All Year 6 Maths topics</a>`}<a href="/year6/curriculum/maths/">All Year 6 Maths topics</a></section>
      <section class="static-topic-sidecard"><h2>Page format</h2><p>This Topic Guide is stored directly in HTML. Open the sections you need; no curriculum renderer is required.</p></section>
    </aside>
  </main>

  <footer class="static-topic-footer">${esc(code)} • SkillrHub • skillrhub.com</footer>
</div>
<script src="/assets/report-issue.js?v=1"></script>
<script src="/pwa-register.js"></script>
</body>
</html>`;

  const target = path.join(root, "year6/maths", unit.slug, "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

const viewerMeta = Object.fromEntries(order.map((code) => [code, { title: units[code].title, slug: units[code].slug }]));
const firstCode = order[0];
const viewer = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#173968">
  <title>Year 6 Maths Teacher Slides | SkillrHub</title>
  <style>
    *{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,Helvetica,sans-serif;background:#e7edf5;color:#173968}.viewer-shell{min-height:100vh;display:grid;grid-template-rows:auto 1fr;padding:10px}.viewer-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;max-width:1400px;width:100%;margin:0 auto 10px;padding:9px 11px;border-radius:12px;background:#173968;color:#fff}.viewer-toolbar a,.viewer-toolbar button{min-height:40px;border:1px solid rgba(255,255,255,.45);border-radius:9px;background:#fff;color:#173968;padding:8px 12px;font:inherit;font-weight:850;text-decoration:none;cursor:pointer}.viewer-toolbar .title{flex:1;min-width:240px;font-weight:900}.viewer-toolbar .progress{min-width:70px;text-align:center;font-weight:900}.viewer-stage{display:grid;place-items:start center;min-height:0}.teacher-slide-page{display:block;width:min(100%,calc((100vh - 92px)*16/9));max-height:calc(100vh - 92px);aspect-ratio:16/9;object-fit:contain;background:#fff;border-radius:8px;box-shadow:0 12px 42px rgba(23,57,104,.24)}button:disabled{opacity:.45;cursor:not-allowed}.blocked-print{display:none}@media(max-width:720px){.viewer-toolbar .title{order:-1;width:100%;min-width:0}.teacher-slide-page{width:100%;height:auto;max-height:none}}@media print{body>*{display:none!important}body::before{content:"SkillrHub Teacher Slides are available for live classroom display.";display:block;padding:32px;font-size:20pt;font-weight:800}}
  </style>
</head>
<body>
<div class="viewer-shell">
  <nav class="viewer-toolbar" aria-label="Teacher slide navigation">
    <a id="topicLink" href="/year6/maths/${units[firstCode].slug}/">Topic Guide</a>
    <span class="title" id="deckTitle">${esc(firstCode)} • ${esc(units[firstCode].title)}</span>
    <button type="button" id="previous">Previous</button><span class="progress" id="progress">1 / 4</span><button type="button" id="next">Next</button><button type="button" id="fullscreen">Fullscreen</button>
  </nav>
  <main class="viewer-stage"><img id="teacherSlidePage" class="teacher-slide-page" src="/worksheets/year6/maths/teacher-slides/pages/${lower(firstCode)}-1.png" alt="${esc(firstCode)} teacher slide 1 of 4"></main>
</div>
<script>
(() => {
  "use strict";
  const decks = ${JSON.stringify(viewerMeta).replace(/</g, "\\u003c")};
  const requested = (new URLSearchParams(location.search).get("code") || "${firstCode}").toUpperCase();
  const code = decks[requested] ? requested : "${firstCode}";
  const total = 4;
  let page = 1;
  const image = document.getElementById("teacherSlidePage");
  const progress = document.getElementById("progress");
  const previous = document.getElementById("previous");
  const next = document.getElementById("next");
  const title = document.getElementById("deckTitle");
  const topicLink = document.getElementById("topicLink");
  const show = (value) => {
    page = Math.max(1, Math.min(total, value));
    image.src = "/worksheets/year6/maths/teacher-slides/pages/" + code.toLowerCase() + "-" + page + ".png";
    image.alt = code + " teacher slide " + page + " of " + total;
    progress.textContent = page + " / " + total;
    previous.disabled = page === 1;
    next.disabled = page === total;
  };
  title.textContent = code + " • " + decks[code].title;
  document.title = code + " " + decks[code].title + " Teacher Slides | SkillrHub";
  topicLink.href = "/year6/maths/" + decks[code].slug + "/";
  previous.addEventListener("click", () => show(page - 1));
  next.addEventListener("click", () => show(page + 1));
  document.getElementById("fullscreen").addEventListener("click", () => document.documentElement.requestFullscreen?.());
  document.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") show(page - 1); if (event.key === "ArrowRight") show(page + 1); });
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  show(1);
})();
</script>
</body></html>`;
const viewerPath = path.join(root, "worksheets/year6/maths/teacher-slides/viewer/index.html");
fs.mkdirSync(path.dirname(viewerPath), { recursive: true });
fs.writeFileSync(viewerPath, viewer);

const hubPath = path.join(root, "year6/curriculum/maths/index.html");
let hub = fs.readFileSync(hubPath, "utf8");
hub = hub.replace(/href=(["'])\/worksheets\/year6\/maths\/teacher-slides\/(ac9m6[a-z0-9]+)-teacher-slide\.pdf\1/gi, (_match, quote, code) => `href=${quote}/worksheets/year6/maths/teacher-slides/viewer/?code=${code.toUpperCase()}${quote}`);
hub = hub.replace(/Open teacher slide \(PDF\)/gi, "Open Teacher Slides").replace(/Teacher slide PDF/gi, "Teacher Slides");
fs.writeFileSync(hubPath, hub);

console.log(`Built ${order.length} static Year 6 Maths Topic Guides and the fixed slide viewer.`);
