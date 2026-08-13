(() => {
  "use strict";

  const DATA = window.SkillrFoundationScienceData || {};
  const ORDER = ["AC9SFU01","AC9SFU02","AC9SFU03","AC9SFH01","AC9SFI01","AC9SFI02","AC9SFI03","AC9SFI04","AC9SFI05"];
  const q = (s,r=document) => r.querySelector(s);
  const qa = (s,r=document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));

  function codeFromPage(){
    const meta = window.skillrPageMeta?.curriculumCode;
    if (meta && DATA[meta]) return meta;
    const m = location.pathname.match(/(ac9s[a-z0-9]+)/i);
    if (!m) return null;
    const code = m[1].toUpperCase();
    return DATA[code] ? code : null;
  }

  function legacySection(title){
    const h = qa("h2").find(el => el.textContent.trim().toLowerCase() === title.toLowerCase());
    return h?.closest("section")?.innerHTML || "";
  }

  function ensureCss(){
    if (q("#skillr-foundation-science-css")) return;
    const s = document.createElement("style");
    s.id = "skillr-foundation-science-css";
    s.textContent = `
      .micro-hero h1{font-size:clamp(1.75rem,4vw,2.35rem);margin-bottom:.2rem}
      .micro-hero__subtitle{margin:0 0 .4rem;font-size:clamp(1rem,2vw,1.15rem);font-weight:700}
      .micro-hero__goal{margin:0;max-width:820px}
      .lesson-layout{align-items:start}.lesson-stack{display:grid;gap:10px}
      .topic-menu{background:#fff;border:1px solid #dfe6f2;border-radius:14px;overflow:clip;box-shadow:0 3px 10px rgba(26,58,114,.04)}
      .topic-menu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;font-weight:800;user-select:none}
      .topic-menu>summary::-webkit-details-marker{display:none}.topic-menu>summary::after{content:'+';width:26px;height:26px;display:grid;place-items:center;border-radius:999px;background:#f2f5fa;color:#36557d}
      .topic-menu[open]>summary::after{content:'−'}.combined-lesson-menu>summary{cursor:default}.menu-title{font-size:1.05rem}.menu-badge{border-radius:999px;padding:4px 8px;font-size:.75rem;font-weight:800;background:#eef4ff;color:#244a87;border:1px solid #d7e3fb;margin-left:8px}
      .menu-content{padding:2px 15px 15px}.combined-lesson-content{display:grid;gap:14px}.lesson-part{padding:2px 0 14px;border-bottom:1px solid #e6ebf2}.lesson-part:last-child{padding-bottom:0;border-bottom:0}.lesson-part h3{margin:0 0 8px;font-size:1rem}
      .lesson-callout{display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:#f6f9ff;border:1px solid #dbe6fb;border-radius:11px;padding:9px 11px;font-weight:700}
      .science-visual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.science-visual-grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.science-visual{border:1px solid #dde6f0;border-radius:12px;overflow:hidden;background:#fff}.science-visual img{display:block;width:100%;height:190px;object-fit:cover}.science-visual__body{padding:10px}.science-visual h4{margin:0 0 5px;font-size:.98rem;color:#173968}.science-visual p{margin:4px 0;font-size:.9rem}.science-credit{font-size:.72rem!important;color:#69788c}.science-credit a{color:inherit}
      .mini-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.mini-grid-4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.mini-card{border:1px solid #e1e6ef;border-radius:11px;padding:11px;background:#fbfcfe}.mini-card p{margin:4px 0}.mini-card.visual-activity{padding:0;overflow:hidden}.mini-card.visual-activity img{display:block;width:100%;height:125px;object-fit:cover}.mini-card.visual-activity .activity-body{padding:10px}.mini-label{display:inline-block;margin-bottom:5px;font-size:.76rem;font-weight:800;color:#49627f;text-transform:uppercase;letter-spacing:.04em}.mistake-card{background:#fffaf2;border-color:#f0dfbd}.check-card{background:#f7fbf8;border-color:#d7eadc}
      .mastery-row{display:flex;flex-wrap:wrap;gap:7px}.mastery-chip{border-radius:999px;padding:6px 9px;background:#eef8f0;border:1px solid #d0e8d5;font-size:.88rem;font-weight:700}.reference-menu>summary{background:#fafbfd}
      .expansion-note{border:1px solid #d7e3fb;background:#f7faff;border-radius:11px;padding:10px 12px}.expansion-note p{margin:5px 0 0}
      @media(max-width:900px){.lesson-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}.science-visual-grid,.science-visual-grid.two{grid-template-columns:1fr 1fr}}
      @media(max-width:680px){.science-visual-grid,.science-visual-grid.two,.mini-grid-3,.mini-grid-4{grid-template-columns:1fr}.science-visual img{height:210px}.mini-card.visual-activity img{height:160px}}
    `;
    document.head.appendChild(s);
  }

  function visualCard(v){
    return `<article class="science-visual"><img src="${esc(v.src)}" alt="${esc(v.alt)}" loading="lazy"><div class="science-visual__body"><h4>${esc(v.title)}</h4><p>${esc(v.body)}</p><p class="science-credit">Photo: ${esc(v.credit)} / <a href="${esc(v.source)}" target="_blank" rel="nofollow noopener">Unsplash</a></p></div></article>`;
  }

  function activityCard(a,u,i){
    const v = u.visuals[a.visual ?? 0] || u.visuals[0];
    return `<div class="mini-card visual-activity"><img src="${esc(v.src)}" alt="${esc(v.alt)}" loading="lazy"><div class="activity-body"><span class="mini-label">Activity ${i+1}: ${esc(a.title)}</span><p>${esc(a.text)}</p></div></div>`;
  }

  function menu(title,badge,html,id=""){
    return `<details class="topic-menu reference-menu"${id?` id="${id}"`:""}><summary><span><span class="menu-title">${title}</span>${badge?`<span class="menu-badge">${badge}</span>`:""}</span></summary><div class="menu-content">${html}</div></details>`;
  }

  function relatedLinks(){
    return ORDER.map(code => `<li><a href="/foundation/science/${DATA[code].slug}/">${code}: ${esc(DATA[code].title)}</a></li>`).join("");
  }

  function render(){
    const code = codeFromPage();
    if (!code) return;
    if (window.SkillrFoundationV11Renderer && window.SkillrFoundationCanonical) {
      window.SkillrFoundationV11Renderer.renderTopic({
        data: DATA,
        order: ORDER,
        config: { subject: "Science", pathSegment: "science", quizSubject: "science" }
      });
      return;
    }
    const u = DATA[code];
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return;
    ensureCss();

    const curriculum = legacySection("Curriculum coverage and elaborations");
    const international = legacySection("International curriculum mapping");
    const official = legacySection("Official curriculum references");
    document.title = `${code} ${u.title} | Foundation Science`;
    const d = q('meta[name="description"]');
    if (d) d.content = `Teach ${code} ${u.title} with a focused visual Foundation Science lesson, teacher slide, worksheet, Practice and Test.`;

    hero.classList.add("micro-hero");
    hero.innerHTML = `<p class="curriculum-eyebrow">${code} • Foundation Science</p><h1>${esc(u.title)}</h1><p class="micro-hero__subtitle">${esc(u.subtitle)}</p><p class="micro-hero__goal">${esc(u.learn)}</p><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Start lesson</a><a href="/worksheets/foundation/science/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Teacher slide</a><a href="/quiz/grade-k/science/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a href="/quiz/grade-k/science/${code.toLowerCase()}/practice/">Practice</a><a href="/quiz/grade-k/science/${code.toLowerCase()}/test/">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const visuals = `<div class="science-visual-grid${u.visuals.length===2?" two":""}">${u.visuals.map(visualCard).join("")}</div>`;
    const activities = `<div class="mini-grid-3">${u.activities.map((a,i)=>activityCard(a,u,i)).join("")}</div>`;
    const mixups = `<div class="mini-grid-3">${u.mistakes.map(([n,f])=>`<div class="mini-card mistake-card"><span class="mini-label">${esc(n)}</span><p><strong>Try this:</strong> ${esc(f)}</p></div>`).join("")}</div>`;
    const checks = `<div class="mini-grid-4">${u.quick.map((x,i)=>`<div class="mini-card check-card"><span class="mini-label">${i+1}. Check</span><p>${esc(x)}</p></div>`).join("")}</div>`;
    const mastery = u.mastery.map(x=>`<span class="mastery-chip">${esc(x)}</span>`).join("");

    const lesson = `<details class="topic-menu combined-lesson-menu" id="teaching-lesson" open><summary><span class="menu-title">Teaching Lesson: Learn → Quick Check</span></summary><div class="menu-content combined-lesson-content">
      <section class="lesson-part"><h3>Learn</h3><div class="lesson-callout">${esc(u.routine)}</div><p><strong>Goal:</strong> ${esc(u.learn)}</p></section>
      <section class="lesson-part"><h3>Teach It</h3><h4>${esc(u.model_title)}</h4>${visuals}<div class="mini-card" style="margin-top:9px">${u.model_html}</div></section>
      <section class="lesson-part"><h3>Apply the Idea</h3><h4>${esc(u.apply_title)}</h4><div class="mini-card">${u.apply_html}</div></section>
      <section class="lesson-part"><h3>Try It</h3>${activities}</section>
      <section class="lesson-part"><h3>Common Mix-Ups</h3>${mixups}</section>
      <section class="lesson-part"><h3>Quick Check</h3>${checks}</section>
      <section class="lesson-part"><div class="expansion-note"><strong>Need more detail on this topic?</strong><p>Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further. SkillrHub will use that feedback to expand this section.</p></div></section>
    </div></details>`;

    const curriculumHtml = curriculum || `<h2>Curriculum coverage and elaborations</h2><p><strong>Content description:</strong> ${esc(u.desc)}</p>`;
    const intlHtml = international || `<h2>International curriculum mapping</h2><p>Use the Australian Curriculum code as the exact reference and map to the closest local Foundation/Kindergarten outcome.</p>`;
    const officialHtml = official || `<h2>Official curriculum references</h2><p><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></p>`;
    const index = ORDER.indexOf(code);
    const prev = ORDER[index-1], next = ORDER[index+1];

    main.className = "curriculum-layout lesson-layout";
    main.innerHTML = `<div class="lesson-stack">${lesson}
      <details class="topic-menu"><summary><span class="menu-title">Quick Mastery Check</span></summary><div class="menu-content"><p><strong>If the student can do these independently, move to Practice or Test.</strong></p><div class="mastery-row">${mastery}</div></div></details>
      ${menu("Australian Curriculum description & elaborations","Reference",curriculumHtml)}
      ${menu("Teacher resource","Resource",`<h3>Classroom teaching slide</h3><p>Open the condensed classroom notes with the exact same teaching visuals used in this topic lesson.</p><a class="curriculum-button primary" href="/worksheets/foundation/science/teacher-slides/live.html?code=${code}" target="_blank" rel="noopener">Open teaching slide</a>`,"teacher-slide")}
      ${menu("International curriculum mapping","Links",intlHtml)}
      ${menu("Related Foundation Science topics","Links",`<ul class="curriculum-related-list">${relatedLinks()}</ul>`)}
      ${menu("Official references","Sources",officialHtml)}
    </div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="/quiz/grade-k/science/${code.toLowerCase()}/practice/">Practice</a><a class="curriculum-button" href="/quiz/grade-k/science/${code.toLowerCase()}/worksheet/" target="_blank" rel="noopener">Worksheet</a><a class="curriculum-button" href="/quiz/grade-k/science/${code.toLowerCase()}/test/">Test</a></div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row">${next?`<a href="/foundation/science/${DATA[next].slug}/">Next Science unit</a>`:""}${prev?`<a href="/foundation/science/${DATA[prev].slug}/">Previous Science unit</a>`:""}<a href="/year1/">Next year</a></div></section></aside>`;
    window.skillrPageMeta = {...(window.skillrPageMeta||{}),curriculumCode:code,title:u.title,subject:"Science"};
  }

  render();
})();
