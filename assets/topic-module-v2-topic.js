(() => {
  "use strict";
  if (window.__skillrTopicModuleV2TopicLoaded) return;
  window.__skillrTopicModuleV2TopicLoaded = true;

  const e = value => String(value ?? "").replace(/[&<>\"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[char]));

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

  function problemHtml(module) {
    const questions = (module.practiceSheet?.questions || []).slice(0, 10);
    if (!questions.length) return "";
    return `<article class="tmv2-card tmv2-important-problems"><div class="tmv2-problems-head"><div><p class="tmv2-eyebrow">High-yield practice</p><h3>10 important problems to solve</h3><p>Attempt each problem before opening its answer. The set moves from core understanding to application and reasoning.</p></div><a href="${e(module.links.practice)}">Open Practice</a></div><ol>${questions.map((question, index) => `<li><p><strong>${index + 1}.</strong> ${e(question.prompt)}</p><details><summary>Check answer</summary><p><strong>Answer:</strong> ${e(question.answer)}</p>${question.hint ? `<p><strong>Hint:</strong> ${e(question.hint)}</p>` : ""}</details></li>`).join("")}</ol></article>`;
  }

  const numericalEvidence = /(?:\d|π|√|%|\$|°|=|<|>|÷|×|\([^)]*,[^)]*\)|\b(?:mm|cm|km|kg|ml|litres?|hours?|minutes?|seconds?|metres?|degrees?)\b)/i;

  function selectAdditionalWorkedProblems(module) {
    if (module.identity?.year !== 7 || module.identity?.subject !== "Mathematics") return [];
    const questions = [...(module.practiceSheet?.questions || [])];
    const selected = [];
    const synthesis = questions.find(question => /-PS-10$/i.test(question.id || "")) || questions[9];

    if (synthesis) selected.push(synthesis);

    const candidates = questions
      .filter(question => !selected.includes(question))
      .filter(question => numericalEvidence.test(`${question.prompt || ""} ${question.answer || ""}`))
      .sort((left, right) => {
        const tierDifference = Number(right.tier || 0) - Number(left.tier || 0);
        if (tierDifference) return tierDifference;
        return questions.indexOf(right) - questions.indexOf(left);
      });

    for (const question of candidates) {
      if (selected.length >= 2) break;
      selected.push(question);
    }

    for (const question of questions) {
      if (selected.length >= 2) break;
      if (!selected.includes(question)) selected.push(question);
    }

    return selected.slice(0, 2);
  }

  function workedExamplesHtml(module) {
    const authored = (module.topic?.workedExamples || []).slice(0, 2).map((example, index) => ({
      kind: "authored",
      number: index + 1,
      title: example.title,
      problem: "",
      steps: example.steps || [],
      answer: example.answer,
      check: example.check
    }));

    const additional = selectAdditionalWorkedProblems(module).map((question, index) => ({
      kind: "practice",
      number: authored.length + index + 1,
      title: `Worked problem ${authored.length + index + 1}`,
      problem: question.prompt,
      steps: [
        "Identify the given values, units, conditions and required result.",
        question.hint || "Choose a representation or formula that matches the chapter concept.",
        question.answer,
        question.summary || "Compare the result with the original conditions and the chapter visual."
      ],
      answer: question.answer,
      check: question.summary || "Substitute, estimate, use an inverse operation or compare with the chapter visual."
    }));

    const examples = [...authored, ...additional].slice(0, 4);
    if (!examples.length) return "";

    return `<article class="tmv2-card tmv2-worked tmv2-worked-expanded"><div class="tmv2-worked-head"><p class="tmv2-eyebrow">From concept to calculation</p><h3>${examples.length} worked numerical &amp; application examples</h3><p>Follow the setup, calculation or reasoning, interpretation and check. Numerical topics use exact values and units; spatial and statistical topics use coordinates, data, measures or diagram evidence.</p></div><div class="tmv2-worked-grid">${examples.map(example => `<section class="tmv2-worked-problem"><p class="tmv2-worked-number">Example ${example.number}</p><h4>${e(example.title)}</h4>${example.problem ? `<p class="tmv2-worked-question"><strong>Problem:</strong> ${e(example.problem)}</p>` : ""}<ol>${example.steps.map(step => `<li>${e(step)}</li>`).join("")}</ol><p class="tmv2-worked-answer"><strong>Final answer:</strong> ${e(example.answer)}</p><p class="tmv2-worked-check"><strong>Check:</strong> ${e(example.check)}</p></section>`).join("")}</div></article>`;
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
      section.innerHTML = `<p class="tmv2-eyebrow">${e(code)} • Teach</p><h2>${e(module.identity.title)}</h2><p><strong>${e(module.topic.learningIntention)}</strong></p><div class="tmv2-grid"><article class="tmv2-card"><h3>Concept deep-dive</h3>${module.topic.deepDive.map(paragraph => `<p>${e(paragraph)}</p>`).join("")}</article><article class="tmv2-card"><h3>Success criteria</h3><ul>${module.topic.successCriteria.map(item => `<li>${e(item)}</li>`).join("")}</ul>${module.topic.visuals.map(item => visual(item.id)).join("")}</article></div><article class="tmv2-card"><h3>Key vocabulary</h3><dl class="tmv2-vocab">${module.topic.vocabulary.map(item => `<div><dt>${e(item.term)}</dt><dd>${e(item.definition)}</dd></div>`).join("")}</dl></article><article class="tmv2-card tmv2-misconceptions"><h3>Common misconceptions and corrections</h3>${module.topic.misconceptions.map(item => `<p><strong>${e(item.idea)}</strong><br>${e(item.correction)}</p>`).join("")}</article>${workedExamplesHtml(module)}${problemHtml(module)}<nav class="tmv2-links" aria-label="Learning flow"><a href="#topic-module-v2" aria-current="step">Teach</a><a href="${e(module.links.practice)}">Practice</a><a href="${e(module.links.test)}">Test</a></nav>`;

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
    if (description) {
      description.content = `${code} ${module.identity.description} with visual examples, four worked numerical and application problems, 10 important problems and a clear Teach, Practice and Test learning path.`;
    }

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

  observer.observe(document.body, { childList: true, subtree: true });
  if (!routedYear7Topic || routerHasRendered()) render();
  window.setTimeout(() => render(), 4000);
  window.setTimeout(() => observer.disconnect(), 10000);
})();