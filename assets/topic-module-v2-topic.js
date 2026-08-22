(() => {
  "use strict";
  const e = value => String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const routedYear7Topic = /^\/year7\/(maths|science|english)\/ac9/i.test(location.pathname);
  const routerHasRendered = () => Boolean(document.querySelector("#skillr-year7-page-css"));

  function normalizeLearningFlow(module) {
    if (!module) return;
    const practice = e(module.links.practice);
    const test = e(module.links.test);

    const hero = document.querySelector(".curriculum-hero");
    if (hero) {
      const row = hero.querySelector(".topic-action-row");
      if (row && row.dataset.skillrFlow !== "tpt") {
        row.dataset.skillrFlow = "tpt";
        row.innerHTML = `<a class="primary" href="#topic-module-v2">Teach</a><a href="${practice}">Practice</a><a href="${test}">Test</a>`;
      }
    }

    const sidebar = document.querySelector(".curriculum-sidebar");
    if (sidebar) {
      const panels = [...sidebar.querySelectorAll(".curriculum-panel")];
      const next = panels.find(panel => /next step|quick links|learning flow/i.test(panel.querySelector("h2")?.textContent || ""));
      if (next && next.dataset.skillrFlow !== "tpt") {
        next.dataset.skillrFlow = "tpt";
        next.innerHTML = `<h2>Learning flow</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="#topic-module-v2">Teach</a><a class="curriculum-button" href="${practice}">Practice</a><a class="curriculum-button" href="${test}">Test</a></div>`;
      }
    }
  }

  function render() {
    const code = (window.skillrPageMeta?.curriculumCode || "").toUpperCase();
    const module = window.SkillrTopicModulesV2?.get(code);
    if (!module) return false;

    if (!document.querySelector("#topic-module-v2")) {
      const visual = id => window.SkillrTopicModuleV2Visuals.render(module.topic.visuals.find(item => item.id === id));
      const section = document.createElement("section");
      section.className = "tmv2-module";
      section.id = "topic-module-v2";
      section.innerHTML = `<p class="tmv2-eyebrow">${e(code)} • Teach</p><h2>${e(module.identity.title)}</h2><p><strong>${e(module.topic.learningIntention)}</strong></p><div class="tmv2-grid"><article class="tmv2-card"><h3>Concept deep-dive</h3>${module.topic.deepDive.map(p=>`<p>${e(p)}</p>`).join("")}</article><article class="tmv2-card"><h3>Success criteria</h3><ul>${module.topic.successCriteria.map(x=>`<li>${e(x)}</li>`).join("")}</ul>${module.topic.visuals.map(x=>visual(x.id)).join("")}</article></div><article class="tmv2-card"><h3>Key vocabulary</h3><dl class="tmv2-vocab">${module.topic.vocabulary.map(x=>`<div><dt>${e(x.term)}</dt><dd>${e(x.definition)}</dd></div>`).join("")}</dl></article><div class="tmv2-grid"><article class="tmv2-card"><h3>Common misconceptions and corrections</h3>${module.topic.misconceptions.map(x=>`<p><strong>${e(x.idea)}</strong><br>${e(x.correction)}</p>`).join("")}</article><article class="tmv2-card tmv2-worked"><h3>Two worked examples</h3>${module.topic.workedExamples.map(x=>`<section><h4>${e(x.title)}</h4><ol>${x.steps.map(s=>`<li>${e(s)}</li>`).join("")}</ol><p><strong>Answer:</strong> ${e(x.answer)}</p><p><strong>Check:</strong> ${e(x.check)}</p></section>`).join("")}</article></div><nav class="tmv2-links" aria-label="Learning flow"><a href="#topic-module-v2" aria-current="step">Teach</a><a href="${e(module.links.practice)}">Practice</a><a href="${e(module.links.test)}">Test</a></nav>`;

      const layout = document.querySelector("main.curriculum-layout");
      const target = layout?.firstElementChild || document.querySelector(".curriculum-main") || document.querySelector("main") || document.body;
      const legacyNodes = [...target.children];
      if (legacyNodes.length && !target.querySelector(".tmv2-retained-reference")) {
        const retained = document.createElement("details");
        retained.className = "tmv2-retained-reference tmv2-module";
        retained.innerHTML = `<summary><strong>Teacher resources, worksheets and curriculum references</strong></summary><div class="tmv2-retained-content"><p><em>Supporting resources are kept here so the main student journey stays Teach → Practice → Test.</em></p></div>`;
        const content = retained.querySelector(".tmv2-retained-content");
        legacyNodes.forEach(node => content.appendChild(node));
        target.appendChild(retained);
      }
      target.prepend(section);
    }

    document.title = `${code} ${module.identity.title} | Year 7 Maths`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${code} ${module.identity.description} with a clear Teach, Practice and Test learning path.`;

    const hero = document.querySelector(".curriculum-hero");
    if (hero) {
      const heading = hero.querySelector("h1");
      if (heading) heading.textContent = module.identity.title;
      const subtitle = hero.querySelector(".micro-hero__subtitle, .curriculum-hero__lead");
      if (subtitle) subtitle.textContent = module.identity.description;
      const goal = hero.querySelector(".micro-hero__goal");
      if (goal) goal.textContent = module.topic.learningIntention;
    }

    normalizeLearningFlow(module);
    return true;
  }

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued || (routedYear7Topic && !routerHasRendered())) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      render();
    });
  });
  observer.observe(document.body, {childList:true, subtree:true});
  if (!routedYear7Topic || routerHasRendered()) render();
  window.setTimeout(() => render(), 4000);
  window.setTimeout(() => observer.disconnect(), 10000);
})();
