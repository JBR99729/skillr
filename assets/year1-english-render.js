(() => {
  "use strict";

  const UNITS = window.SkillrYear1EnglishData || {};
  const ORDER = Object.keys(UNITS);
  const path = window.location.pathname;
  const match = path.match(/\/year1\/english\/(ac9e1[a-z0-9]+)/i);
  const code = (window.skillrPageMeta?.curriculumCode || match?.[1] || "").toUpperCase();
  const unit = UNITS[code];
  if (!unit) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));

  function ensureCss() {
    if (q("#skillr-year1-english-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year1-english-css";
    style.textContent = `
      .micro-hero h1{font-size:clamp(1.8rem,4vw,2.5rem);margin-bottom:.25rem}.micro-hero__subtitle{margin:0 0 .45rem;font-size:clamp(1rem,2vw,1.16rem);font-weight:800}.micro-hero__goal{margin:0;max-width:850px}.lesson-layout{align-items:start}.lesson-stack{display:grid;gap:10px}.topic-menu{background:#fff;border:1px solid #dfe6f2;border-radius:14px;overflow:clip;box-shadow:0 3px 10px rgba(26,58,114,.04)}.topic-menu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;font-weight:900;user-select:none}.topic-menu>summary::-webkit-details-marker{display:none}.topic-menu>summary::after{content:'+';width:26px;height:26px;display:grid;place-items:center;border-radius:999px;background:#f2f5fa;color:#36557d}.topic-menu[open]>summary::after{content:'−'}.combined-lesson-menu>summary{cursor:default}.menu-title{font-size:1.05rem}.menu-content{padding:2px 15px 15px}.combined-lesson-content{display:grid;gap:14px}.lesson-part{padding:2px 0 14px;border-bottom:1px solid #e6ebf2}.lesson-part:last-child{border-bottom:0}.lesson-part h3{margin:0 0 8px;font-size:1rem}.curriculum-focus,.lesson-callout{background:#f6f9ff;border:1px solid #dbe6fb;border-radius:11px;padding:10px 12px}.lesson-callout{font-weight:850}.english-card-row{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.english-card-row span{display:inline-flex;align-items:center;justify-content:center;min-height:38px;border:1px solid #d9e5f5;border-radius:10px;background:#fff;padding:8px 10px;font-weight:850;color:#173968}.english-model-board{border:1px dashed #bdc9da;border-radius:12px;background:#f8fafc;padding:10px;margin:8px 0}.mini-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.mini-grid-4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.mini-card{border:1px solid #e1e6ef;border-radius:11px;padding:11px;background:#fbfcfe}.mini-card p{margin:4px 0}.mini-label{display:inline-block;margin-bottom:5px;font-size:.76rem;font-weight:850;color:#49627f;text-transform:uppercase;letter-spacing:.04em}.mistake-card{background:#fffaf2;border-color:#f0dfbd}.check-card{background:#f7fbf8;border-color:#d7eadc}.solved-card{background:#eef8ff;border-color:#cfe1f8}.mastery-row{display:flex;flex-wrap:wrap;gap:7px}.mastery-chip{border-radius:999px;padding:6px 9px;background:#eef8f0;border:1px solid #d0e8d5;font-size:.88rem;font-weight:750}@media(max-width:900px){.lesson-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}}@media(max-width:720px){.mini-grid-3,.mini-grid-4{grid-template-columns:1fr}.topic-menu>summary{padding:12px 13px}}
    `;
    document.head.appendChild(style);
  }

  function legacySection(title) {
    const heading = qa("h2").find((el) => el.textContent.trim().toLowerCase() === title.toLowerCase());
    return heading?.closest("section")?.innerHTML || "";
  }

  function relatedLinks() {
    return ORDER.map((c) => `<li><a href="/year1/english/${UNITS[c].slug}/">${c}: ${esc(UNITS[c].title)}</a></li>`).join("");
  }

  function menu(title, html, id = "") {
    return `<details class="topic-menu"${id ? ` id="${id}"` : ""}><summary><span class="menu-title">${title}</span></summary><div class="menu-content">${html}</div></details>`;
  }

  function render() {
    ensureCss();
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return;

    document.title = `${code} ${unit.title} | Year 1 English`;
    const meta = q('meta[name="description"]');
    if (meta) meta.content = `Teach ${code} ${unit.desc} with a focused Year 1 English lesson, teacher slide, worksheet, Practice and Test.`;

    hero.classList.add("micro-hero");
    hero.innerHTML = `<p class="curriculum-eyebrow">${code} • Year 1 English</p><h1>${esc(unit.title)}</h1><p class="micro-hero__subtitle">${esc(unit.subtitle)}</p><p class="micro-hero__goal">${esc(unit.learn)}</p><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Start lesson</a><a href="/worksheets/year1/english/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Teacher slide</a><a href="/quiz/year-1/english/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a href="/quiz/year-1/english/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-1/english/${code.toLowerCase()}/test/">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const activities = unit.activities.map((activity) => `<div class="mini-card"><span class="mini-label">${esc(activity.title)}</span><p>${esc(activity.text)}</p><div class="english-card-row"><span>${esc(activity.visual)}</span></div></div>`).join("");
    const mixups = unit.mistakes.map(([name, fix]) => `<div class="mini-card mistake-card"><span class="mini-label">${esc(name)}</span><p><strong>Fix:</strong> ${esc(fix)}</p></div>`).join("");
    const checks = unit.quick.map((text, index) => `<div class="mini-card check-card"><span class="mini-label">${index + 1}. Check</span><p>${esc(text)}</p></div>`).join("");
    const mastery = unit.mastery.map((text) => `<span class="mastery-chip">${esc(text)}</span>`).join("");

    const i = ORDER.indexOf(code);
    const prev = ORDER[i - 1];
    const next = ORDER[i + 1];
    const pathLinks = `${next ? `<a href="/year1/english/${UNITS[next].slug}/">Next English unit</a>` : ""}<a href="/year2/">Next year</a>${prev ? `<a href="/year1/english/${UNITS[prev].slug}/">Previous English unit</a>` : ""}`;

    const curriculum = legacySection("Curriculum coverage and elaborations") || `<h2>Curriculum coverage and elaborations</h2><p><strong>Content description:</strong> ${esc(unit.desc)}</p>`;
    const lesson = `<details class="topic-menu combined-lesson-menu" id="teaching-lesson" open><summary><span class="menu-title">Teaching Lesson: Learn → Quick Check</span></summary><div class="menu-content combined-lesson-content"><section class="lesson-part"><h3>Curriculum focus</h3><div class="curriculum-focus"><strong>${code}:</strong><p>${esc(unit.desc)}</p><p>This 30–45 minute lesson teaches this code directly. Examples and activities are chosen to make this specific code clear.</p></div></section><section class="lesson-part"><h3>Learn</h3><div class="lesson-callout">${esc(unit.routine)}</div><p><strong>Core idea:</strong> ${esc(unit.learn)}</p></section><section class="lesson-part"><h3>Teach It</h3><p><strong>${esc(unit.model_title)}</strong></p>${unit.model_html}</section><section class="lesson-part"><h3>Solved Example</h3><div class="mini-card solved-card"><p>${esc(unit.solved_example)}</p></div></section><section class="lesson-part"><h3>Apply the Idea</h3><p><strong>${esc(unit.apply_title)}</strong></p>${unit.apply_html}</section><section class="lesson-part"><h3>Try It</h3><div class="mini-grid-3">${activities}</div></section><section class="lesson-part"><h3>Common Mix-Ups</h3><div class="mini-grid-3">${mixups}</div></section><section class="lesson-part"><h3>Quick Check</h3><div class="mini-grid-4">${checks}</div></section></div></details>`;

    main.className = "curriculum-layout lesson-layout";
    main.innerHTML = `<div class="lesson-stack">${lesson}${menu("Quick Mastery Check", `<p><strong>If the student can do these independently, move to Practice or Test.</strong></p><div class="mastery-row">${mastery}</div>`)}${menu("Australian Curriculum description & elaborations", curriculum)}${menu("Teacher resource", `<h3>${code} classroom teaching slide</h3><p>Open the matching SkillrHub classroom display. It condenses this lesson and uses the same text cards, model and solved example.</p><a class="curriculum-button primary" href="/worksheets/year1/english/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Open teacher slide</a>`, "teacher-slide")}${menu("Related Year 1 English topics", `<ul class="curriculum-related-list">${relatedLinks()}</ul>`)}<section class="lesson-part"><div class="curriculum-focus"><strong>Need more detail on this topic?</strong><p>Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further.</p></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="/quiz/year-1/english/${code.toLowerCase()}/practice/">Practice</a><a class="curriculum-button" href="/quiz/year-1/english/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a class="curriculum-button" href="/quiz/year-1/english/${code.toLowerCase()}/test/">Test</a></div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row">${pathLinks}</div></section></aside>`;
    window.skillrPageMeta = {...(window.skillrPageMeta || {}), curriculumCode: code, title: unit.title, subject: "English"};
  }

  render();
})();