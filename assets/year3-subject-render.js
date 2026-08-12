(() => {
  "use strict";

  const match = location.pathname.match(/^\/year3\/(science|english)\/(ac9[se]3[a-z0-9]+)/i);
  if (!match) return;
  const subject = match[1].toLowerCase();
  const code = (window.skillrPageMeta?.curriculumCode || match[2]).toUpperCase();
  const subjectName = subject === "science" ? "Science" : "English";
  const data = window[`SkillrYear3${subjectName}Data`] || {};
  const order = window[`SkillrYear3${subjectName}Order`] || Object.keys(data);
  const unit = data[code];
  if (!unit) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function ensureAssets() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("year3-subject-visuals.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/year3-subject-visuals.css?v=1";
      document.head.appendChild(link);
    }
    if (q("#skillr-year3-subject-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year3-subject-css";
    style.textContent = `
      .micro-hero h1{font-size:clamp(1.8rem,4vw,2.45rem);margin-bottom:.2rem}.micro-hero__subtitle{margin:0 0 .4rem;font-size:clamp(1rem,2vw,1.16rem);font-weight:800;color:#173968}.micro-hero__goal{margin:0;max-width:920px}.hero-visual{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.hero-visual .y3-subject-board{margin:0}.lesson-layout{align-items:start}.lesson-stack{display:grid;gap:10px}.topic-menu{background:#fff;border:1px solid #dfe6f2;border-radius:14px;overflow:clip;box-shadow:0 3px 10px rgba(26,58,114,.04)}.topic-menu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;font-weight:850;user-select:none}.topic-menu>summary::-webkit-details-marker{display:none}.topic-menu>summary::after{content:'+';width:26px;height:26px;display:grid;place-items:center;border-radius:999px;background:#f2f5fa;color:#36557d}.topic-menu[open]>summary::after{content:'−'}.combined-lesson-menu>summary{cursor:default}.menu-title{font-size:1.05rem}.menu-badge{border-radius:999px;padding:4px 8px;font-size:.75rem;font-weight:850;background:#eef4ff;color:#244a87;border:1px solid #d7e3fb;margin-left:8px}.menu-content{padding:2px 15px 15px}.combined-lesson-content{display:grid;gap:14px}.lesson-part{padding:2px 0 14px;border-bottom:1px solid #e6ebf2}.lesson-part:last-child{padding-bottom:0;border-bottom:0}.lesson-part h3{margin:0 0 8px;font-size:1rem}.lesson-callout{display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:#f6f9ff;border:1px solid #dbe6fb;border-radius:11px;padding:9px 11px;font-weight:800}.curriculum-focus{border:1px solid #d7e3fb;background:#f7faff;border-radius:11px;padding:10px 12px}.curriculum-focus p{margin:5px 0 0}.mini-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.mini-grid-4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.mini-card{border:1px solid #e1e6ef;border-radius:12px;padding:12px;background:#fbfcfe}.mini-card p{margin:5px 0}.mini-label{display:inline-block;margin-bottom:5px;font-size:.76rem;font-weight:900;color:#49627f;text-transform:uppercase;letter-spacing:.04em}.activity-visual{margin-top:8px;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:8px}.mistake-card{background:#fffaf2;border-color:#f0dfbd}.check-card{background:#f7fbf8;border-color:#d7eadc}.mastery-row{display:flex;flex-wrap:wrap;gap:7px}.mastery-chip{border-radius:999px;padding:6px 9px;background:#eef8f0;border:1px solid #d0e8d5;font-size:.88rem;font-weight:750}.reference-menu>summary{background:#fafbfd}.teacher-resource-copy{max-width:760px}@media(max-width:900px){.lesson-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}.hero-visual{grid-template-columns:1fr}}@media(max-width:700px){.mini-grid-3,.mini-grid-4{grid-template-columns:1fr}.topic-menu>summary{padding:12px 13px}.menu-title{font-size:1rem}}
    `;
    document.head.appendChild(style);
  }

  function legacySection(title) {
    const heading = qa("h2").find((element) => element.textContent.trim().toLowerCase() === title.toLowerCase());
    return heading?.closest("section")?.innerHTML || "";
  }

  function menu(title, badge, html, id = "") {
    return `<details class="topic-menu reference-menu"${id ? ` id="${id}"` : ""}><summary><span><span class="menu-title">${esc(title)}</span>${badge ? `<span class="menu-badge">${esc(badge)}</span>` : ""}</span></summary><div class="menu-content">${html}</div></details>`;
  }

  function relatedLinks() {
    return order.map((unitCode) => {
      const related = data[unitCode];
      return related ? `<li><a href="/year3/${subject}/${related.slug}/">${unitCode}: ${esc(related.title)}</a></li>` : "";
    }).join("");
  }

  function render() {
    ensureAssets();
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return;

    const curriculum = legacySection("Curriculum coverage and elaborations") || `<h2>Curriculum coverage and elaborations</h2><p><strong>Content description:</strong> ${esc(unit.desc)}</p>`;
    const international = legacySection("International curriculum mapping") || `<h2>International curriculum mapping</h2><p>Use the Australian Curriculum code as the exact source. Overseas links are broad equivalents only.</p>`;
    const official = legacySection("Official curriculum references") || `<h2>Official curriculum references</h2><p><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></p>`;

    document.title = `${code} ${unit.title} | Year 3 ${subjectName}`;
    const description = q('meta[name="description"]');
    if (description) description.content = `Teach ${code} ${unit.desc} with a visual Year 3 ${subjectName} lesson, live teacher slide, authored worksheet, Practice and Test.`;

    hero.classList.add("micro-hero");
    hero.innerHTML = `<p class="curriculum-eyebrow">${code} • Year 3 ${subjectName}</p><h1>${esc(unit.title)}</h1><p class="micro-hero__subtitle">${esc(unit.subtitle)}</p><p class="micro-hero__goal">${esc(unit.learn)}</p><div class="hero-visual">${unit.hero_visual}</div><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Start lesson</a><a href="/worksheets/year3/${subject}/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Teacher slide</a><a href="/quiz/year-3/${subject}/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a href="/quiz/year-3/${subject}/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-3/${subject}/${code.toLowerCase()}/test/">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const activities = unit.activities.map((activity, index) => `<div class="mini-card"><span class="mini-label">Activity ${index + 1}</span><p><strong>${esc(activity.title)}</strong></p><p>${esc(activity.text)}</p><div class="activity-visual">${activity.visual_html}</div></div>`).join("");
    const mixups = unit.mistakes.map(([name, fix]) => `<div class="mini-card mistake-card"><span class="mini-label">${esc(name)}</span><p><strong>Fix:</strong> ${esc(fix)}</p></div>`).join("");
    const checks = unit.quick.map((text, index) => `<div class="mini-card check-card"><span class="mini-label">${index + 1}. Check</span><p>${esc(text)}</p></div>`).join("");
    const mastery = unit.mastery.map((text) => `<span class="mastery-chip">${esc(text)}</span>`).join("");

    const lessonTitle = subject === "science" ? "Teaching Lesson: Observe → Model → Investigate → Explain" : "Teaching Lesson: Notice → Model → Apply → Explain";
    const lesson = `<details class="topic-menu combined-lesson-menu" id="teaching-lesson" open><summary><span class="menu-title">${lessonTitle}</span></summary><div class="menu-content combined-lesson-content"><section class="lesson-part"><h3>Curriculum focus</h3><div class="curriculum-focus"><strong>${code}:</strong><p>${esc(unit.desc)}</p><p>This focused 30–45 minute Year 3 lesson teaches the essential concept, supports a short guided activity and leads into independent consolidation.</p></div></section><section class="lesson-part"><h3>Learn</h3><div class="lesson-callout">${esc(unit.routine)}</div><p><strong>Core idea:</strong> ${esc(unit.learn)}</p></section><section class="lesson-part"><h3>Teach It</h3><p><strong>${esc(unit.model_title)}</strong></p>${unit.model_html}</section><section class="lesson-part"><h3>Apply the Idea</h3><p><strong>${esc(unit.apply_title)}</strong></p>${unit.apply_html}</section><section class="lesson-part"><h3>Try It</h3><div class="mini-grid-3">${activities}</div></section><section class="lesson-part"><h3>Common Mix-Ups</h3><div class="mini-grid-3">${mixups}</div></section><section class="lesson-part"><h3>Quick Check</h3><div class="mini-grid-4">${checks}</div></section></div></details>`;

    main.className = "curriculum-layout lesson-layout";
    main.innerHTML = `<div class="lesson-stack">${lesson}<details class="topic-menu"><summary><span class="menu-title">Quick Mastery Check</span></summary><div class="menu-content"><p><strong>If the student can do these independently, move to Practice or Test.</strong></p><div class="mastery-row">${mastery}</div></div></details>${menu("Australian Curriculum description & elaborations","Reference",curriculum)}${menu("Teacher resource","Resource",`<div class="teacher-resource-copy"><h3>${code} live classroom teaching slide</h3><p>Project the condensed lesson with the same teaching model, example and visual language used on this topic page.</p><a class="curriculum-button primary" href="/worksheets/year3/${subject}/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Open teacher slide</a></div>`,"teacher-slide")}${menu("International curriculum mapping","Links",international)}${menu(`Related Year 3 ${subjectName} topics`,"Links",`<ul class="curriculum-related-list">${relatedLinks()}</ul>`)}${menu("Official references","Sources",official)}<section class="lesson-part" id="skillr-expansion-note"><div class="curriculum-focus"><strong>Need more detail on this topic?</strong><p>Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further. SkillrHub will use that feedback to expand this section.</p></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="/quiz/year-3/${subject}/${code.toLowerCase()}/practice/">Practice</a><a class="curriculum-button" href="/quiz/year-3/${subject}/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a class="curriculum-button" href="/quiz/year-3/${subject}/${code.toLowerCase()}/test/">Test</a></div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row"><a href="/year2/">Previous year</a><a href="/year4/">Next year</a><a href="/year3/curriculum/${subject}/">All Year 3 ${subjectName}</a></div></section></aside>`;

    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), curriculumCode: code, title: unit.title, subject: subjectName };
  }

  render();
})();
