(() => {
  "use strict";

  const match = location.pathname.match(/\/year2\/maths\/(ac9m2[a-z0-9]+)/i);
  const requestedCode = (window.skillrPageMeta?.curriculumCode || match?.[1] || "").toUpperCase();
  if (!requestedCode) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function loadData() {
    if (!window.SkillrYear2MathsData?.[requestedCode]) await loadScript("/assets/year2-maths-data.js?v=3");
    if (!window.SkillrYear2MathsData?.[requestedCode]) await loadScript("/assets/year2-maths-data-extra.js?v=2");
  }

  function legacySection(title) {
    const heading = qa("h2").find((element) => element.textContent.trim().toLowerCase() === title.toLowerCase());
    return heading?.closest("section")?.innerHTML || "";
  }

  function ensureCss() {
    if (q("#skillr-year2-maths-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year2-maths-css";
    style.textContent = `
      .micro-hero{position:relative;overflow:hidden}.micro-hero::after{content:'';position:absolute;right:-72px;top:-72px;width:190px;height:190px;border-radius:50%;border:24px solid rgba(36,87,214,.07);pointer-events:none}.skillr-topic-brand{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:0 0 9px;padding:8px 11px;border:1px solid #d7e3fb;border-radius:12px;background:linear-gradient(90deg,#f8fbff,#eef5ff);font-weight:900;color:#2457d6}.skillr-topic-brand span{color:#173968}.skillr-topic-brand small{color:#5d6c80;font-size:.76rem}.micro-hero h1{font-size:clamp(1.75rem,4vw,2.4rem);margin:.15rem 0 .25rem}.micro-hero__subtitle{margin:0 0 .4rem;font-size:clamp(1rem,2vw,1.15rem);font-weight:800;color:#173968}.micro-hero__goal{margin:0;max-width:880px}.lesson-layout{align-items:start}.lesson-stack{display:grid;gap:10px}.topic-menu{background:#fff;border:1px solid #dfe6f2;border-radius:14px;overflow:clip;box-shadow:0 3px 10px rgba(26,58,114,.04)}.topic-menu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;font-weight:850;user-select:none}.topic-menu>summary::-webkit-details-marker{display:none}.topic-menu>summary::after{content:'+';width:26px;height:26px;display:grid;place-items:center;border-radius:999px;background:#f2f5fa;color:#36557d}.topic-menu[open]>summary::after{content:'−'}.combined-lesson-menu>summary{cursor:default}.menu-title{font-size:1.05rem}.menu-badge{border-radius:999px;padding:4px 8px;font-size:.75rem;font-weight:850;background:#eef4ff;color:#244a87;border:1px solid #d7e3fb;margin-left:8px}.menu-content{padding:2px 15px 15px}.combined-lesson-content{display:grid;gap:14px}.lesson-part{padding:2px 0 14px;border-bottom:1px solid #e6ebf2}.lesson-part:last-child{padding-bottom:0;border-bottom:0}.lesson-part h3{margin:0 0 8px;font-size:1rem}.lesson-callout{display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:#f6f9ff;border:1px solid #dbe6fb;border-radius:11px;padding:9px 11px;font-weight:800}.curriculum-focus{border:1px solid #d7e3fb;background:#f7faff;border-radius:11px;padding:10px 12px}.curriculum-focus p{margin:5px 0 0}.math-model-board{border:1px dashed #bdc9da;background:#f8fafc;border-radius:12px;padding:10px;margin:8px 0}.math-card-row{display:flex;flex-wrap:wrap;gap:7px;margin:7px 0}.math-card-row span{display:inline-flex;align-items:center;justify-content:center;min-height:38px;border:1px solid #d9e5f5;border-radius:10px;background:linear-gradient(180deg,#fff,#f7fbff);padding:8px 10px;font-weight:900;color:#173968;box-shadow:0 2px 5px rgba(23,57,104,.05)}.y2-base-ten{display:grid;grid-template-columns:1.1fr 1fr .9fr;gap:8px;margin:8px 0}.y2-block{display:grid;place-items:center;min-height:76px;border-radius:12px;border:1px solid #d8e5f4;background:#fff}.y2-block strong{font-size:1.65rem;color:#2457d6}.y2-block span{font-size:.76rem;font-weight:800;color:#49627f;text-transform:uppercase}.y2-hundreds{background:linear-gradient(90deg,rgba(36,87,214,.08) 1px,transparent 1px),linear-gradient(rgba(36,87,214,.08) 1px,transparent 1px),#fff;background-size:12px 12px}.y2-tens{background:repeating-linear-gradient(90deg,#fff 0 9px,#edf5ff 9px 18px)}.y2-ones{background:radial-gradient(circle at 18px 18px,rgba(36,87,214,.22) 0 5px,transparent 6px),#fff;background-size:30px 30px}.y2-place-table{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #d9e5f5;border-radius:12px;overflow:hidden;background:#fff;margin:8px 0}.y2-place-table span,.y2-place-table strong{text-align:center;padding:8px;border-right:1px solid #e3ebf6}.y2-place-table span:nth-child(3),.y2-place-table strong:nth-child(6){border-right:0}.y2-place-table span{font-size:.75rem;font-weight:900;background:#eef5ff;color:#173968;text-transform:uppercase}.y2-place-table strong{font-size:1.4rem;color:#203047}.y2-number-line{margin:8px 0;border:1px solid #d9e5f5;background:#fff;border-radius:12px;padding:12px}.y2-number-line__rail{position:relative;height:16px;border-bottom:3px solid #173968;margin:2px 8px 4px}.y2-number-line__rail::before,.y2-number-line__rail::after{content:'';position:absolute;bottom:-7px;width:2px;height:12px;background:#173968}.y2-number-line__rail::before{left:0}.y2-number-line__rail::after{right:0}.y2-number-line__rail span{position:absolute;bottom:-7px;width:14px;height:14px;border-radius:999px;background:#2457d6;transform:translateX(-50%)}.y2-number-line__labels{display:flex;justify-content:space-between;font-size:.75rem;color:#49627f}.y2-number-line p{margin:6px 0 0;font-size:.86rem}.y2-chart-puzzle{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;background:#eef5ff;border:1px solid #d9e5f5;border-radius:12px;padding:8px;margin:8px 0}.y2-chart-puzzle span{background:#fff;border:1px solid #d9e5f5;border-radius:8px;text-align:center;padding:9px 5px;font-weight:900;color:#173968}.y2-recycle-visual{display:flex;flex-wrap:wrap;gap:7px;margin:8px 0}.y2-recycle-visual span{width:44px;height:44px;display:grid;place-items:center;border-radius:999px;background:#eef8f0;border:1px solid #cfe7d5;color:#17663a;font-weight:900}.hero-visual{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin-top:12px}.hero-visual>.math-model-board{margin:0}.mini-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.mini-grid-4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.mini-card{border:1px solid #e1e6ef;border-radius:12px;padding:12px;background:#fbfcfe}.mini-card p{margin:5px 0}.mini-label{display:inline-block;margin-bottom:5px;font-size:.76rem;font-weight:900;color:#49627f;text-transform:uppercase;letter-spacing:.04em}.activity-visual{margin-top:8px;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:8px}.mistake-card{background:#fffaf2;border-color:#f0dfbd}.check-card{background:#f7fbf8;border-color:#d7eadc}.mastery-row{display:flex;flex-wrap:wrap;gap:7px}.mastery-chip{border-radius:999px;padding:6px 9px;background:#eef8f0;border:1px solid #d0e8d5;font-size:.88rem;font-weight:750}.reference-menu>summary{background:#fafbfd}.teacher-resource-copy{max-width:760px}@media(max-width:900px){.lesson-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}}@media(max-width:700px){.skillr-topic-brand{display:block}.skillr-topic-brand small{display:block;margin-top:3px}.mini-grid-3,.mini-grid-4,.y2-base-ten{grid-template-columns:1fr}.topic-menu>summary{padding:12px 13px}.menu-title{font-size:1rem}}
    `;
    document.head.appendChild(style);
  }

  function menu(title, badge, html, id = "") {
    return `<details class="topic-menu reference-menu"${id ? ` id="${id}"` : ""}><summary><span><span class="menu-title">${title}</span>${badge ? `<span class="menu-badge">${badge}</span>` : ""}</span></summary><div class="menu-content">${html}</div></details>`;
  }

  function render() {
    const UNITS = window.SkillrYear2MathsData || {};
    const ORDER = window.SkillrYear2MathsOrder || Object.keys(UNITS);
    const code = requestedCode;
    const unit = UNITS[code];
    if (!unit) return false;

    ensureCss();
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return false;

    const curriculum = legacySection("Curriculum coverage and elaborations") || `<h2>Curriculum coverage and elaborations</h2><p><strong>Content description:</strong> ${esc(unit.desc)}</p>`;
    const international = legacySection("International curriculum mapping") || `<h2>International curriculum mapping</h2><p>Use the Australian Curriculum code as the exact source. Overseas links are broad equivalents only.</p>`;
    const official = legacySection("Official curriculum references") || `<h2>Official curriculum references</h2><p><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></p>`;
    const index = ORDER.indexOf(code);
    const previousCode = index > 0 ? ORDER[index - 1] : null;
    const nextCode = index >= 0 && index < ORDER.length - 1 ? ORDER[index + 1] : null;
    const relatedLinks = ORDER.map((unitCode) => `<li><a href="/year2/maths/${UNITS[unitCode].slug}/">${unitCode}: ${esc(UNITS[unitCode].title)}</a></li>`).join("");

    document.title = `${code} ${unit.title} | Year 2 Maths`;
    const description = q('meta[name="description"]');
    if (description) description.content = `Teach ${code} ${unit.desc} with a visual Year 2 Maths lesson, teacher slide, authored worksheet, Practice and Test.`;

    hero.classList.add("micro-hero");
    hero.innerHTML = `<div class="skillr-topic-brand"><strong>SkillrHub <span>F–10</span></strong><small>Year 2 Maths • Visual learning lesson</small></div><p class="curriculum-eyebrow">${code} • Year 2 Maths</p><h1>${esc(unit.title)}</h1><p class="micro-hero__subtitle">${esc(unit.subtitle)}</p><p class="micro-hero__goal">${esc(unit.learn)}</p><div class="hero-visual">${unit.hero_visual || unit.model_html}</div><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Start lesson</a><a href="/worksheets/year2/maths/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Teacher slide</a><a href="/quiz/year-2/math/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a href="/quiz/year-2/math/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-2/math/${code.toLowerCase()}/test/">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const activities = (unit.activities || []).map((activity, i) => `<div class="mini-card"><span class="mini-label">Activity ${i + 1}</span><p><strong>${esc(activity.title)}</strong></p><p>${esc(activity.text)}</p><div class="activity-visual">${activity.visual_html || esc(activity.visual || "")}</div></div>`).join("");
    const mixups = (unit.mistakes || []).map(([name, fix]) => `<div class="mini-card mistake-card"><span class="mini-label">${esc(name)}</span><p><strong>Fix:</strong> ${esc(fix)}</p></div>`).join("");
    const checks = (unit.quick || []).map((text, i) => `<div class="mini-card check-card"><span class="mini-label">${i + 1}. Check</span><p>${esc(text)}</p></div>`).join("");
    const mastery = (unit.mastery || []).map((text) => `<span class="mastery-chip">${esc(text)}</span>`).join("");

    const lesson = `<details class="topic-menu combined-lesson-menu" id="teaching-lesson" open><summary><span class="menu-title">Teaching Lesson: Learn → Model → Apply → Check</span></summary><div class="menu-content combined-lesson-content"><section class="lesson-part"><h3>Curriculum focus</h3><div class="curriculum-focus"><strong>${code}:</strong><p>${esc(unit.desc)}</p><p>This focused lesson uses concrete and 2D vector models, guided activities and short reasoning tasks to teach this curriculum concept clearly.</p></div></section><section class="lesson-part"><h3>Learn</h3><div class="lesson-callout">${esc(unit.routine)}</div><p><strong>Core idea:</strong> ${esc(unit.learn)}</p></section><section class="lesson-part"><h3>Teach It</h3><p><strong>${esc(unit.model_title)}</strong></p>${unit.model_html}</section><section class="lesson-part"><h3>Apply the Idea</h3><p><strong>${esc(unit.apply_title)}</strong></p>${unit.apply_html}</section><section class="lesson-part"><h3>Try It</h3><div class="mini-grid-3">${activities}</div></section><section class="lesson-part"><h3>Common Mix-Ups</h3><div class="mini-grid-4">${mixups}</div></section><section class="lesson-part"><h3>Quick Check</h3><div class="mini-grid-4">${checks}</div></section></div></details>`;

    const previousLink = previousCode ? `<a href="/year2/maths/${UNITS[previousCode].slug}/">Previous Maths unit</a>` : `<a href="/year1/">Previous year</a>`;
    const nextLink = nextCode ? `<a href="/year2/maths/${UNITS[nextCode].slug}/">Next Maths unit</a>` : `<a href="/year3/">Next year</a>`;

    main.className = "curriculum-layout lesson-layout";
    main.innerHTML = `<div class="lesson-stack">${lesson}<details class="topic-menu"><summary><span class="menu-title">Quick Mastery Check</span></summary><div class="menu-content"><p><strong>If the student can do these independently, move to Practice or Test.</strong></p><div class="mastery-row">${mastery}</div></div></details>${menu("Australian Curriculum description & elaborations", "Reference", curriculum)}${menu("Teacher resource", "Resource", `<div class="teacher-resource-copy"><h3>${code} classroom teaching slide</h3><p>Open the matching SkillrHub classroom display. It condenses the lesson and reuses the same core 2D teaching models from this topic page.</p><a class="curriculum-button primary" href="/worksheets/year2/maths/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Open teacher slide</a></div>`, "teacher-slide")}${menu("International curriculum mapping", "Links", international)}${menu("Related Year 2 Maths topics", "Links", `<ul class="curriculum-related-list">${relatedLinks}</ul>`)}${menu("Official references", "Sources", official)}<section class="lesson-part" id="skillr-expansion-note"><div class="curriculum-focus"><strong>Need more detail on this topic?</strong><p>Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further. SkillrHub will use that feedback to expand this section.</p></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="/quiz/year-2/math/${code.toLowerCase()}/practice/">Practice</a><a class="curriculum-button" href="/quiz/year-2/math/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a class="curriculum-button" href="/quiz/year-2/math/${code.toLowerCase()}/test/">Test</a></div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row">${previousLink}${nextLink}<a href="/year2/curriculum/maths/">All Year 2 Maths</a></div></section></aside>`;
    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), curriculumCode: code, title: unit.title, subject: "Maths" };
    return true;
  }

  loadData()
    .then(() => {
      if (render()) return;
      const observer = new MutationObserver(() => { if (render()) observer.disconnect(); });
      observer.observe(document.documentElement, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 3000);
    })
    .catch((error) => console.error("Skillr Year 2 Maths topic render failed:", error));
})();