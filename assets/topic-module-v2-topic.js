(() => {
  "use strict";
  const e = value => String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  function render() {
    if (document.querySelector("#topic-module-v2")) return true;
    const code = (window.skillrPageMeta?.curriculumCode || "").toUpperCase();
    const module = window.SkillrTopicModulesV2?.get(code);
    if (!module) return false;
    const visual = id => window.SkillrTopicModuleV2Visuals.render(module.topic.visuals.find(item => item.id === id));
    const section = document.createElement("section");
    section.className = "tmv2-module";
    section.id = "topic-module-v2";
    section.innerHTML = `<p class="tmv2-eyebrow">${e(code)} • Complete topic module</p><h2>${e(module.identity.title)}</h2><p><strong>${e(module.topic.learningIntention)}</strong></p><div class="tmv2-grid"><article class="tmv2-card"><h3>Concept deep-dive</h3>${module.topic.deepDive.map(p=>`<p>${e(p)}</p>`).join("")}</article><article class="tmv2-card"><h3>Success criteria</h3><ul>${module.topic.successCriteria.map(x=>`<li>${e(x)}</li>`).join("")}</ul>${module.topic.visuals.map(x=>visual(x.id)).join("")}</article></div><article class="tmv2-card"><h3>Key vocabulary</h3><dl class="tmv2-vocab">${module.topic.vocabulary.map(x=>`<div><dt>${e(x.term)}</dt><dd>${e(x.definition)}</dd></div>`).join("")}</dl></article><div class="tmv2-grid"><article class="tmv2-card"><h3>Common misconceptions and corrections</h3>${module.topic.misconceptions.map(x=>`<p><strong>${e(x.idea)}</strong><br>${e(x.correction)}</p>`).join("")}</article><article class="tmv2-card tmv2-worked"><h3>Two worked examples</h3>${module.topic.workedExamples.map(x=>`<section><h4>${e(x.title)}</h4><ol>${x.steps.map(s=>`<li>${e(s)}</li>`).join("")}</ol><p><strong>Answer:</strong> ${e(x.answer)}</p><p><strong>Check:</strong> ${e(x.check)}</p></section>`).join("")}</article></div><nav class="tmv2-links" aria-label="Aligned resources"><a href="${e(module.links.slides)}">Teacher slides</a><a href="${e(module.links.topicPractice1||module.links.practiceSheet)}">Topic Practice 1</a><a href="${e(module.links.topicPractice2||`${module.links.practiceSheet}?sheet=2`)}">Topic Practice 2</a><a href="${e(module.links.practice)}">Practice</a><a href="${e(module.links.test)}">Test</a></nav>`;
    const layout = document.querySelector("main.curriculum-layout");
    const target = layout?.firstElementChild || document.querySelector(".curriculum-main") || document.querySelector("main") || document.body;
    const legacyNodes = [...target.children];
    if (legacyNodes.length && !target.querySelector(".tmv2-retained-reference")) {
      const retained = document.createElement("details");
      retained.className = "tmv2-retained-reference tmv2-module";
      retained.innerHTML = `<summary><strong>Archived curriculum references and prior teaching material (retained for review)</strong></summary><div class="tmv2-retained-content"><p><em>This preserved legacy layer may pre-date the current module. Use the complete topic module above for aligned instruction.</em></p></div>`;
      const content = retained.querySelector(".tmv2-retained-content");
      legacyNodes.forEach(node => content.appendChild(node));
      target.appendChild(retained);
    }
    target.prepend(section);

    // Keep the live Year 7 hero aligned with the canonical module as well. This
    // prevents an older compatibility title or model from contradicting the
    // current guide (notably practical ratio modelling in AC9M7M06).
    document.title = `${code} ${module.identity.title} | Year 7 Maths`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${code} ${module.identity.description} with an aligned topic guide, teacher slides and two printable practice sheets.`;
    const hero = document.querySelector(".curriculum-hero");
    if (hero) {
      const heading = hero.querySelector("h1");
      if (heading) heading.textContent = module.identity.title;
      const subtitle = hero.querySelector(".micro-hero__subtitle, .curriculum-hero__lead");
      if (subtitle) subtitle.textContent = module.identity.description;
      const goal = hero.querySelector(".micro-hero__goal");
      if (goal) goal.textContent = module.topic.learningIntention;
      const heroVisual = hero.querySelector(".hero-visual");
      if (heroVisual) heroVisual.innerHTML = module.topic.visuals.map(item => visual(item.id)).join("");
      const actions = [...hero.querySelectorAll(".topic-action-row a")];
      const start = actions.find(link => /start lesson|topic guide/i.test(link.textContent));
      if (start) { start.textContent = "Topic guide"; start.href = "#topic-module-v2"; }
      const worksheet = actions.find(link => /^worksheets?$/i.test(link.textContent.trim()));
      if (worksheet) {
        worksheet.textContent = "Topic Practice 1";
        worksheet.href = module.links.topicPractice1 || module.links.practiceSheet;
        worksheet.removeAttribute("target");
        worksheet.removeAttribute("rel");
        if (!actions.some(link => /topic practice 2/i.test(link.textContent))) {
          const second = worksheet.cloneNode(true);
          second.textContent = "Topic Practice 2";
          second.href = module.links.topicPractice2 || `${module.links.practiceSheet}?sheet=2`;
          worksheet.after(second);
        }
      }
    }
    return true;
  }

  // Year 7's compatibility router is loaded asynchronously by pwa-register.js and
  // repaints the topic main after this script first runs. Re-apply the v2 module
  // after that repaint so the complete guide remains the primary live content.
  const routedYear7Topic = /^\/year7\/(maths|science|english)\/ac9/i.test(location.pathname);
  const routerHasRendered = () => Boolean(document.querySelector("#skillr-year7-page-css"));
  let queued = false;
  const observer = new MutationObserver(() => {
    if (document.querySelector("#topic-module-v2") || queued || (routedYear7Topic && !routerHasRendered())) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      render();
    });
  });
  observer.observe(document.body, {childList:true, subtree:true});
  if (!routedYear7Topic || routerHasRendered()) render();
  window.setTimeout(() => {
    render();
    observer.disconnect();
  }, 4000);
})();
