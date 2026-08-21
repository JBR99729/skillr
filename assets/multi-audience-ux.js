(() => {
  "use strict";
  if (window.__skillrMultiAudienceUXLoaded) return;
  window.__skillrMultiAudienceUXLoaded = true;

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const yearMatch = path.match(/^\/(foundation|year(?:[1-9]|10))$/i);
  const subjectMatch = path.match(/^\/(foundation|year(?:[1-9]|10))\/curriculum\/(maths|science|english)$/i);

  document.querySelectorAll('.y10-ad-slot, .ad[aria-label="Advertisement area"]').forEach((node) => node.remove());

  const labelFor = (folder) => folder.toLowerCase() === "foundation" ? "Foundation" : `Year ${folder.replace(/\D/g, "")}`;

  function addAudienceStrip(folder) {
    if (document.querySelector(".skillr-audience-strip")) return;
    const hero = document.querySelector(".curriculum-hero, header");
    if (!hero) return;
    const label = labelFor(folder);
    const curriculum = `/${folder}/curriculum/`;
    const section = document.createElement("section");
    section.className = "skillr-audience-strip";
    section.setAttribute("aria-label", `${label} learning pathways`);
    section.innerHTML = `
      <div class="skillr-audience-strip__head">
        <h2>Use SkillrHub your way</h2>
        <p>One curriculum path for independent learning, home learning, classroom teaching and tutoring.</p>
      </div>
      <div class="skillr-audience-grid">
        <a class="skillr-audience-card" href="${curriculum}"><strong>Students</strong><small>Learn a topic, practise it, then test yourself.</small></a>
        <a class="skillr-audience-card" href="${curriculum}"><strong>Parents & homeschool</strong><small>Find the right skill and support learning step by step.</small></a>
        <a class="skillr-audience-card" href="${curriculum}"><strong>Teachers</strong><small>Open curriculum-aligned guides, slides, homework and checks.</small></a>
        <a class="skillr-audience-card" href="${curriculum}"><strong>Tutors</strong><small>Target one skill, assign practice and check progress.</small></a>
      </div>`;
    hero.insertAdjacentElement("afterend", section);
  }

  function addSubjectFlow() {
    if (document.querySelector(".skillr-use-flow")) return;
    const matrix = document.querySelector(".unit-matrix");
    if (!matrix) return;
    const flow = document.createElement("div");
    flow.className = "skillr-use-flow";
    flow.innerHTML = `<div><strong>For each topic: learn → practise → test.</strong><p>Teacher slides, homework and worksheets stay available as supporting resources.</p></div><div class="skillr-use-flow__steps" aria-label="Learning sequence"><span>1 Learn</span><span>2 Practice</span><span>3 Test</span><span>4 Review</span></div>`;
    matrix.insertAdjacentElement("beforebegin", flow);
  }

  function improveActionLabels() {
    document.querySelectorAll(".unit-action-row a.primary").forEach((link) => {
      if (/topic guide/i.test(link.textContent || "")) link.textContent = "Learn";
    });
    document.querySelectorAll(".topic-action-row a.primary").forEach((link) => {
      if (/topic guide/i.test(link.textContent || "")) link.textContent = "Learn";
    });
  }

  function init() {
    if (yearMatch) addAudienceStrip(yearMatch[1]);
    if (subjectMatch) addSubjectFlow();
    if (yearMatch || subjectMatch || document.body.classList.contains("curriculum-shell")) improveActionLabels();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
