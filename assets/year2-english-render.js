(() => {
  "use strict";

  const UNITS = window.SkillrYear2EnglishData || {};
  const ORDER = window.SkillrYear2EnglishOrder || Object.keys(UNITS);
  const QA_COMPLETE = new Set(["AC9E2LA01", "AC9E2LA02", "AC9E2LA03"]);
  const match = location.pathname.match(/\/year2\/english\/(ac9e2[a-z0-9]+)/i);
  const code = (window.skillrPageMeta?.curriculumCode || match?.[1] || "").toUpperCase();
  const unit = UNITS[code];
  if (!unit) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  function legacySection(title) {
    const heading = qa("h2").find((element) => element.textContent.trim().toLowerCase() === title.toLowerCase());
    return heading?.closest("section")?.innerHTML || "";
  }

  function ensureCss() {
    if (q("#skillr-year2-english-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year2-english-css";
    style.textContent = `
      .micro-hero h1{font-size:clamp(1.8rem,4vw,2.45rem);margin-bottom:.2rem}.micro-hero__subtitle{margin:0 0 .4rem;font-size:clamp(1rem,2vw,1.15rem);font-weight:800;color:#173968}.micro-hero__goal{margin:0;max-width:900px}.hero-visual{margin-top:12px}.lesson-layout{align-items:start}.lesson-stack{display:grid;gap:10px}.topic-menu{background:#fff;border:1px solid #dfe6f2;border-radius:14px;overflow:clip;box-shadow:0 3px 10px rgba(26,58,114,.04)}.topic-menu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;font-weight:900;user-select:none}.topic-menu>summary::-webkit-details-marker{display:none}.topic-menu>summary::after{content:'+';width:26px;height:26px;display:grid;place-items:center;border-radius:999px;background:#f2f5fa;color:#36557d}.topic-menu[open]>summary::after{content:'−'}.combined-lesson-menu>summary{cursor:default}.menu-title{font-size:1.05rem}.menu-badge{border-radius:999px;padding:4px 8px;font-size:.75rem;font-weight:900;background:#eef4ff;color:#244a87;border:1px solid #d7e3fb;margin-left:8px}.menu-content{padding:2px 15px 15px}.combined-lesson-content{display:grid;gap:14px}.lesson-part{padding:2px 0 14px;border-bottom:1px solid #e6ebf2}.lesson-part:last-child{padding-bottom:0;border-bottom:0}.lesson-part h3{margin:0 0 8px;font-size:1rem}.lesson-callout,.curriculum-focus{background:#f6f9ff;border:1px solid #dbe6fb;border-radius:11px;padding:10px 12px}.lesson-callout{display:flex;flex-wrap:wrap;gap:8px;font-weight:850}.curriculum-focus p{margin:5px 0 0}.english-model-board{border:1px dashed #b9c8db;background:#f8fafc;border-radius:12px;padding:11px;margin:8px 0;overflow:hidden}.english-model-board p{margin:7px 0 0}.english-card-row{display:flex;flex-wrap:wrap;gap:7px;margin:7px 0}.english-card-row span{display:inline-flex;align-items:center;justify-content:center;min-height:40px;border:1px solid #d9e5f5;border-radius:10px;background:#fff;padding:8px 10px;color:#173968;font-weight:900;text-align:center}.english-flow{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px}.english-flow span{border:1px solid #d7e3fb;background:#fff;border-radius:10px;padding:8px 10px;font-weight:900;color:#173968}.english-flow b{color:#2457d6}.english-sentence-strip{display:flex;align-items:stretch;justify-content:center;flex-wrap:wrap;gap:4px;margin:7px 0}.english-sentence-strip span{display:grid;place-items:center;min-height:48px;border:1px solid #cbdaf0;background:#fff;padding:9px 11px;font-weight:900;color:#173968}.english-sentence-strip span:first-child{border-radius:10px 3px 3px 10px}.english-sentence-strip span:last-child{border-radius:3px 10px 10px 3px}.english-panels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.english-panels>div{position:relative;min-height:95px;border:1px solid #d9e5f5;border-radius:11px;background:#fff;padding:24px 10px 10px;display:grid;place-items:center;text-align:center}.english-panels small{position:absolute;top:7px;left:8px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:#2457d6;color:#fff;font-weight:900}.english-panels strong{color:#173968}.english-sound-boxes{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:5px}.english-sound-boxes span{min-width:42px;min-height:42px;display:grid;place-items:center;border:2px solid #9fbbe0;border-radius:9px;background:#fff;color:#173968;font-weight:900}.mini-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.mini-grid-4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.mini-card{border:1px solid #e1e6ef;border-radius:11px;padding:11px;background:#fbfcfe}.mini-card p{margin:4px 0}.mini-label{display:inline-block;margin-bottom:5px;font-size:.75rem;font-weight:900;color:#49627f;text-transform:uppercase;letter-spacing:.04em}.activity-visual{margin-top:8px}.mistake-card{background:#fffaf2;border-color:#f0dfbd}.check-card{background:#f7fbf8;border-color:#d7eadc}.mastery-row{display:flex;flex-wrap:wrap;gap:7px}.mastery-chip{border-radius:999px;padding:6px 9px;background:#eef8f0;border:1px solid #d0e8d5;font-size:.88rem;font-weight:800}.reference-menu>summary{background:#fafbfd}@media(max-width:900px){.lesson-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}}@media(max-width:700px){.mini-grid-3,.mini-grid-4,.english-panels{grid-template-columns:1fr}.topic-menu>summary{padding:12px 13px}.menu-title{font-size:1rem}}
    `;
    document.head.appendChild(style);
  }

  function menu(title, badge, html, id = "") {
    return `<details class="topic-menu reference-menu"${id ? ` id="${id}"` : ""}><summary><span><span class="menu-title">${title}</span>${badge ? `<span class="menu-badge">${badge}</span>` : ""}</span></summary><div class="menu-content">${html}</div></details>`;
  }

  function relatedLinks() {
    return ORDER.map((item) => `<li><a href="/year2/english/${UNITS[item].slug}/">${item}: ${esc(UNITS[item].title)}</a></li>`).join("");
  }

  function render() {
    ensureCss();
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return;

    const curriculum = legacySection("Curriculum coverage and elaborations") || `<h2>Curriculum coverage and elaborations</h2><p><strong>Content description:</strong> ${esc(unit.desc)}</p>`;
    const international = legacySection("International curriculum mapping") || `<h2>International curriculum mapping</h2><p>Use the Australian Curriculum code as the exact source. Overseas links are broad equivalents only.</p>`;
    const official = legacySection("Official curriculum references") || `<h2>Official curriculum references</h2><p><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></p>`;
    const index = ORDER.indexOf(code);
    const previous = ORDER[index - 1];
    const next = ORDER[index + 1];

    document.title = `${code} ${unit.title} | Year 2 English`;
    const description = q('meta[name="description"]');
    if (description) description.content = `Teach ${code} ${unit.desc} with a visual Year 2 English lesson, teacher slide, authored worksheet, Practice and Test.`;

    hero.classList.add("micro-hero");
    const qaBadge = QA_COMPLETE.has(code) ? '<span class="menu-badge" title="Content QA complete; human QA pending.">QA complete</span>' : '';
    const quizLink = QA_COMPLETE.has(code) ? `<a href="/quiz/year-2/english/${code.toLowerCase()}/quiz/">Quiz</a>` : '';
    hero.innerHTML = `<p class="curriculum-eyebrow">${code} • Year 2 English ${qaBadge}</p><h1>${esc(unit.title)}</h1><p class="micro-hero__subtitle">${esc(unit.subtitle)}</p><p class="micro-hero__goal">${esc(unit.learn)}</p><div class="hero-visual">${unit.hero_visual || unit.model_html}</div><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Start lesson</a><a href="/worksheets/year2/english/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Teacher slide</a><a href="/quiz/year-2/english/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a href="/quiz/year-2/english/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-2/english/${code.toLowerCase()}/test/">Test</a>${quizLink}</div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const activities = unit.activities.map((activity, activityIndex) => `<div class="mini-card"><span class="mini-label">Activity ${activityIndex + 1}</span><p><strong>${esc(activity.title)}</strong></p><p>${esc(activity.text)}</p><div class="activity-visual">${activity.visual_html || ""}</div></div>`).join("");
    const mixups = unit.mistakes.map(([name, fix]) => `<div class="mini-card mistake-card"><span class="mini-label">${esc(name)}</span><p><strong>Better thinking:</strong> ${esc(fix)}</p></div>`).join("");
    const checks = unit.quick.map((text, checkIndex) => `<div class="mini-card check-card"><span class="mini-label">${checkIndex + 1}. Check</span><p>${esc(text)}</p></div>`).join("");
    const mastery = unit.mastery.map((text) => `<span class="mastery-chip">${esc(text)}</span>`).join("");

    const lesson = `<details class="topic-menu combined-lesson-menu" id="teaching-lesson" open><summary><span class="menu-title">Teaching Lesson: Notice → Model → Create</span></summary><div class="menu-content combined-lesson-content"><section class="lesson-part"><h3>Curriculum focus</h3><div class="curriculum-focus"><strong>${code}:</strong><p>${esc(unit.desc)}</p><p>This 30–45 minute Year 2 lesson introduces the idea, models it clearly, includes guided practice and finishes with independent application.</p></div></section><section class="lesson-part"><h3>Learn</h3><div class="lesson-callout">${esc(unit.routine)}</div><p><strong>Core idea:</strong> ${esc(unit.learn)}</p></section><section class="lesson-part"><h3>Teach It</h3><p><strong>${esc(unit.model_title)}</strong></p>${unit.model_html}</section><section class="lesson-part"><h3>Apply the Idea</h3><p><strong>${esc(unit.apply_title)}</strong></p>${unit.apply_html}</section><section class="lesson-part"><h3>Try It</h3><div class="mini-grid-3">${activities}</div></section><section class="lesson-part"><h3>Common Mix-Ups</h3><div class="mini-grid-3">${mixups}</div></section><section class="lesson-part"><h3>Quick Check</h3><div class="mini-grid-4">${checks}</div></section></div></details>`;
    const pathLinks = `${previous ? `<a href="/year2/english/${UNITS[previous].slug}/">Previous English unit</a>` : ""}${next ? `<a href="/year2/english/${UNITS[next].slug}/">Next English unit</a>` : ""}<a href="/year2/curriculum/english/">All Year 2 English</a>`;

    main.className = "curriculum-layout lesson-layout";
    main.innerHTML = `<div class="lesson-stack">${lesson}<details class="topic-menu"><summary><span class="menu-title">Quick Mastery Check</span></summary><div class="menu-content"><p><strong>If the student can do these independently, move to Practice or Test.</strong></p><div class="mastery-row">${mastery}</div></div></details>${menu("Australian Curriculum description & elaborations", "Reference", curriculum)}${menu("Teacher resource", "Resource", `<h3>${code} classroom teaching slide</h3><p>Project the matching SkillrHub display. It condenses this lesson and repeats the same models, examples and language sequence.</p><a class="curriculum-button primary" href="/worksheets/year2/english/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Open teacher slide</a>`, "teacher-slide")}${menu("International curriculum mapping", "Links", international)}${menu("Related Year 2 English topics", "Links", `<ul class="curriculum-related-list">${relatedLinks()}</ul>`)}${menu("Official references", "Sources", official)}<section class="lesson-part" id="skillr-expansion-note"><div class="curriculum-focus"><strong>Need more detail on this topic?</strong><p>Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further. SkillrHub will use that feedback to expand this section.</p></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="/quiz/year-2/english/${code.toLowerCase()}/practice/">Practice</a><a class="curriculum-button" href="/quiz/year-2/english/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a class="curriculum-button" href="/quiz/year-2/english/${code.toLowerCase()}/test/">Test</a>${quizLink}</div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row">${pathLinks}</div></section></aside>`;
    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), curriculumCode: code, title: unit.title, subject: "English" };
  }

  render();
})();
