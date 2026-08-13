(() => {
  "use strict";

  const match = location.pathname.match(/^\/year5\/(maths|science|english)\/(ac9[mse]5[a-z0-9]+)/i);
  if (!match) return;
  const subject = match[1].toLowerCase();
  const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
  const routeSubject = subject === "maths" ? "math" : subject;
  const code = (window.skillrPageMeta?.curriculumCode || match[2]).toUpperCase();
  const units = window[`SkillrYear5${subjectName}Data`] || {};
  const order = window[`SkillrYear5${subjectName}Order`] || Object.keys(units);
  const unit = units[code];
  if (!unit) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function ensureAssets() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("year5-curriculum.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/year5-curriculum.css?v=1";
      document.head.appendChild(link);
    }
    if (q("#skillr-year5-page-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year5-page-css";
    style.textContent = `
      .micro-hero h1{font-size:clamp(1.9rem,4vw,2.65rem);margin-bottom:.2rem}.micro-hero__subtitle{margin:0 0 .45rem;font-size:clamp(1rem,2vw,1.2rem);font-weight:800;color:#173968}.micro-hero__goal{margin:0;max-width:960px;line-height:1.5}.hero-visual{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.hero-visual .y5-board{margin:0}.lesson-layout{align-items:start}.lesson-stack{display:grid;gap:11px}.topic-menu{background:#fff;border:1px solid #dfe6f2;border-radius:15px;overflow:clip;box-shadow:0 3px 12px rgba(26,58,114,.05)}.topic-menu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;font-weight:850;user-select:none}.topic-menu>summary::-webkit-details-marker{display:none}.topic-menu>summary::after{content:'+';width:27px;height:27px;display:grid;place-items:center;border-radius:999px;background:#f2f5fa;color:#36557d}.topic-menu[open]>summary::after{content:'−'}.combined-lesson-menu>summary{cursor:default}.menu-title{font-size:1.06rem}.menu-badge{border-radius:999px;padding:4px 8px;font-size:.75rem;font-weight:850;background:#eef4ff;color:#244a87;border:1px solid #d7e3fb;margin-left:8px}.menu-content{padding:2px 16px 16px}.combined-lesson-content{display:grid;gap:15px}.lesson-part{padding:2px 0 15px;border-bottom:1px solid #e6ebf2}.lesson-part:last-child{padding-bottom:0;border-bottom:0}.lesson-part h3{margin:0 0 8px;font-size:1.02rem;color:#173968}.lesson-callout{background:#f6f9ff;border:1px solid #dbe6fb;border-radius:11px;padding:10px 12px;font-weight:800}.curriculum-focus{border:1px solid #d7e3fb;background:#f7faff;border-radius:11px;padding:11px 13px}.curriculum-focus p{margin:5px 0 0}.success-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.success-card{border:1px solid #d9e5f5;border-radius:11px;background:#fff;padding:10px}.success-card h4{margin:0 0 5px;color:#2457d6}.success-card p,.success-card li{font-size:.91rem}.success-card ul{margin:5px 0 0;padding-left:1.1rem}.reasoning-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.reasoning-strip>div{border:1px solid #d9e5f5;border-radius:11px;background:#fbfcfe;padding:9px}.reasoning-strip strong{display:block;color:#2457d6;margin-bottom:4px}.mini-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.mini-grid-4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.mini-card{border:1px solid #e1e6ef;border-radius:12px;padding:12px;background:#fbfcfe}.mini-card p{margin:5px 0}.mini-label{display:inline-block;margin-bottom:5px;font-size:.76rem;font-weight:900;color:#49627f;text-transform:uppercase;letter-spacing:.04em}.activity-visual{margin-top:8px;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:8px}.mistake-card{background:#fffaf2;border-color:#f0dfbd}.check-card{background:#f7fbf8;border-color:#d7eadc}.mastery-row{display:flex;flex-wrap:wrap;gap:7px}.mastery-chip{border-radius:999px;padding:6px 9px;background:#eef8f0;border:1px solid #d0e8d5;font-size:.88rem;font-weight:750}.reference-menu>summary{background:#fafbfd}.lesson-timing{display:flex;flex-wrap:wrap;gap:7px}.lesson-timing span{border-radius:999px;background:#fff;border:1px solid #d7e3fb;padding:5px 8px;font-weight:800;font-size:.82rem}@media(max-width:920px){.lesson-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}.hero-visual,.success-grid{grid-template-columns:1fr}}@media(max-width:720px){.mini-grid-3,.mini-grid-4,.reasoning-strip{grid-template-columns:1fr}.topic-menu>summary{padding:12px 13px}.menu-title{font-size:1rem}}
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
      const related = units[unitCode];
      return related ? `<li><a href="/year5/${subject}/${related.slug}/">${unitCode}: ${esc(related.title)}</a></li>` : "";
    }).join("");
  }

  function render() {
    ensureAssets();
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return;
    const curriculum = legacySection("Curriculum coverage and elaborations") || `<h2>Curriculum coverage and elaborations</h2><p><strong>Content description:</strong> ${esc(unit.desc)}</p>`;
    const international = legacySection("International curriculum mapping") || `<h2>International curriculum mapping</h2><p>Use the Australian Curriculum code as the exact source. International mappings are broad equivalents only.</p>`;
    const official = legacySection("Official curriculum references") || `<h2>Official curriculum references</h2><p><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></p>`;

    document.title = `${code} ${unit.title} | Year 5 ${subjectName}`;
    const description = q('meta[name="description"]');
    if (description) description.content = `Teach ${code} ${unit.desc} with a visual Year 5 ${subjectName} lesson, teacher slides, worksheets, Practice and Test.`;
    hero.classList.add("micro-hero");
    hero.innerHTML = `<p class="curriculum-eyebrow">${code} • Year 5 ${subjectName}</p><h1>${esc(unit.title)}</h1><p class="micro-hero__subtitle">${esc(unit.subtitle)}</p><p class="micro-hero__goal">${esc(unit.learn)}</p><div class="hero-visual" id="skillr-topic-concept-picture">${unit.hero_visual}</div><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Start lesson</a><a href="/worksheets/year5/${subject}/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Teacher slides</a><a href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/worksheet/?sheet=topic-practice-1">Topic Practice 1</a><a href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/worksheet/?sheet=topic-practice-2">Topic Practice 2</a><a href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/test/">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const activities = unit.activities.map((activity,index)=>`<div class="mini-card"><span class="mini-label">Activity ${index+1}</span><p><strong>${esc(activity.title)}</strong></p><p>${esc(activity.text)}</p><div class="activity-visual">${activity.visual_html}</div></div>`).join("");
    const mixups = unit.mistakes.map(([name,fix])=>`<div class="mini-card mistake-card"><span class="mini-label">${esc(name)}</span><p><strong>Fix:</strong> ${esc(fix)}</p></div>`).join("");
    const checks = unit.quick.map((text,index)=>`<div class="mini-card check-card"><span class="mini-label">${index+1}. Check</span><p>${esc(text)}</p></div>`).join("");
    const mastery = unit.mastery.map((text)=>`<span class="mastery-chip">${esc(text)}</span>`).join("");
    const deepDive = (unit.deep_dive || []).map((text)=>`<p>${esc(text)}</p>`).join("");
    const vocabulary = (unit.terms || []).map(([term,definition])=>`<div class="mini-card"><h4>${esc(term)}</h4><p>${esc(definition)}</p></div>`).join("");
    const successItems = unit.mastery.slice(0,5).map((item)=>`<li>${esc(item)}</li>`).join("");
    const lessonTitle = subject === "maths" ? "Teaching Lesson: Represent → Reason → Apply → Verify" : subject === "science" ? "Teaching Lesson: Observe → Model → Investigate → Explain → Evaluate" : "Teaching Lesson: Notice → Analyse → Apply → Create → Review";
    const reasoning = subject === "maths"
      ? [["Represent","What quantities and relationships are visible?"],["Reason","Why does the method or property work?"],["Verify","Which estimate, inverse or alternate representation checks it?"]]
      : subject === "science"
        ? [["Observe","What can be measured, classified or compared?"],["Explain","How does the model account for evidence?"],["Evaluate","What variables, limitations or questions remain?"]]
        : [["Notice","Which structures, words or visual choices matter?"],["Explain","How do they shape meaning and audience response?"],["Transfer","How can the feature be applied and reviewed in a new text?"]];

    const lesson = `<details class="topic-menu combined-lesson-menu" id="teaching-lesson" open><summary><span class="menu-title">${lessonTitle}</span></summary><div class="menu-content combined-lesson-content"><section class="lesson-part"><h3>Curriculum focus and lesson scope</h3><div class="curriculum-focus"><strong>${code}:</strong><p>${esc(unit.desc)}</p><div class="lesson-timing"><span>Visual model: 10–15 min</span><span>Guided reasoning: 10 min</span><span>Activity/investigation: 15 min</span><span>Independent check: 5–10 min</span></div></div></section><section class="lesson-part"><h3>Concept deep-dive</h3>${deepDive}</section><section class="lesson-part"><h3>Key vocabulary</h3><div class="mini-grid-3">${vocabulary}</div></section><section class="lesson-part"><h3>Learning intention and success criteria</h3><div class="success-grid"><div class="success-card"><h4>We are learning to…</h4><p>${esc(unit.learn)}</p></div><div class="success-card"><h4>I can…</h4><ul>${successItems}</ul></div></div></section><section class="lesson-part"><h3>Learning routine</h3><div class="lesson-callout">${esc(unit.routine)}</div></section><section class="lesson-part"><h3>Worked example 1: ${esc(unit.model_title)}</h3>${unit.model_html}<div class="reasoning-strip">${reasoning.map(([title,text])=>`<div><strong>${title}</strong><span>${text}</span></div>`).join("")}</div></section><section class="lesson-part"><h3>Worked example 2: ${esc(unit.apply_title)}</h3>${unit.apply_html}</section><section class="lesson-part"><h3>Guided and collaborative activities</h3><div class="mini-grid-3">${activities}</div></section><section class="lesson-part"><h3>Common misconceptions and corrections</h3><div class="mini-grid-4">${mixups}</div></section><section class="lesson-part"><h3>Quick Check</h3><div class="mini-grid-4">${checks}</div></section></div></details>`;

    main.className = "curriculum-layout lesson-layout";
    main.innerHTML = `<div class="lesson-stack">${lesson}<details class="topic-menu"><summary><span class="menu-title">Quick Mastery Check</span></summary><div class="menu-content"><p><strong>Move to Practice or Test when the student can use the concept independently and justify the response with an appropriate model, evidence or text feature.</strong></p><div class="mastery-row">${mastery}</div></div></details>${menu("Australian Curriculum description & elaborations","Reference",curriculum)}${menu("Teacher resource","Resource",`<h3>${code} live classroom teaching slides</h3><p>Open the core visual lesson and additional connected-concept summaries when the code contains several curriculum strands.</p><a class="curriculum-button primary" href="/worksheets/year5/${subject}/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Open teacher slides</a>`,"teacher-slide")}${menu("International curriculum mapping","Links",international)}${menu(`Related Year 5 ${subjectName} topics`,"Links",`<ul class="curriculum-related-list">${relatedLinks()}</ul>`)}${menu("Official references","Sources",official)}<section class="lesson-part"><div class="curriculum-focus"><strong>Need more detail on this topic?</strong><p>Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further. SkillrHub will use that feedback to expand this section.</p></div></section></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/practice/">Practice</a><a class="curriculum-button" href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheets</a><a href="/quiz/year-5/${routeSubject}/${code.toLowerCase()}/test/">Test</a></div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row"><a href="/year4/">Previous year</a><a href="/year6/">Next year</a><a href="/year5/curriculum/${subject}/">All Year 5 ${subjectName}</a></div></section></aside>`;
    window.skillrPageMeta = {...(window.skillrPageMeta || {}),curriculumCode:code,title:unit.title,subject:subjectName};
  }
  render();
})();
