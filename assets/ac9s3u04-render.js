(() => {
  "use strict";

  const lesson = window.skillrLesson;
  if (!lesson) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const byId = (items) => Object.fromEntries(items.map((item) => [item.id, item]));
  const models = byId(lesson.models);
  const checks = byId(lesson.masteryItems);

  function renderModel(modelId) {
    const model = models[modelId];
    if (!model) return "";
    if (model.component === "objectMaterialSort") {
      return `<figure class="matter-model" aria-label="${escapeHtml(model.accessibleDescription)}"><div class="object-grid">${model.parameters.examples.map((example) => `<div class="object-example"><strong>${escapeHtml(example.object)}</strong><span>object</span><p>${example.materials.map(escapeHtml).join(" / ")}</p><small>material choices</small></div>`).join("")}</div><figcaption>One kind of object can be made from different materials.</figcaption></figure>`;
    }
    if (model.component === "stateContainerCompare") {
      return `<figure class="matter-model state-compare" aria-label="${escapeHtml(model.accessibleDescription)}"><div class="state-panel solid"><span class="state-label">SOLID</span><div class="container"><i class="block"></i></div><div class="container bowl"><i class="block"></i></div><strong>Keeps its own shape</strong></div><div class="state-panel liquid"><span class="state-label">LIQUID</span><div class="container"><i class="water"></i></div><div class="container bowl"><i class="water"></i></div><strong>Flows and fills the bottom</strong></div><figcaption>Classify by observable behaviour when the substance changes container.</figcaption></figure>`;
    }
    if (model.component === "sealedBagStateChange") {
      return `<figure class="matter-model" aria-label="${escapeHtml(model.accessibleDescription)}"><div class="change-flow"><div class="bag"><i class="ice"></i><strong>solid water</strong></div><span class="heat add">heat added<br>melting →</span><div class="bag"><i class="bag-water"></i><strong>liquid water</strong></div><span class="heat remove">← heat removed<br>freezing</span></div><figcaption>The sealed bag helps us track the same water through the change.</figcaption></figure>`;
    }
    if (model.component === "stateChangeCycle") {
      return `<figure class="matter-model cycle" aria-label="${escapeHtml(model.accessibleDescription)}"><div class="state-node">SOLID</div><div class="cycle-arrows"><p class="heat add">heat added → <strong>melting</strong></p><p class="heat remove">← heat removed <strong>freezing</strong></p></div><div class="state-node liquid-node">LIQUID</div></figure>`;
    }
    return `<figure class="matter-model" aria-label="${escapeHtml(model.accessibleDescription)}"><div class="application-grid">${model.parameters.examples.map((example) => `<article><strong>${escapeHtml(example.material)}</strong><p>${escapeHtml(example.change)}</p><span>${escapeHtml(example.use)}</span></article>`).join("")}</div><figcaption>Controlled heating and cooling can make materials useful.</figcaption></figure>`;
  }

  const renderCheck = (checkId) => {
    const check = checks[checkId];
    if (!check) return "";
    return `<details class="checkpoint"><summary>20–30 second checkpoint: ${escapeHtml(check.prompt)}</summary><p><strong>Expected:</strong> ${escapeHtml(check.expectedAnswer)}</p><p><strong>Evidence:</strong> ${escapeHtml(check.evidenceOfMastery)}</p><p><strong>Likely error:</strong> ${escapeHtml(check.likelyMisconception)}</p><p><strong>Respond:</strong> ${escapeHtml(check.remediation)}</p></details>`;
  };

  function renderTopic() {
    const root = document.querySelector("main.curriculum-layout > div");
    if (!root) return;
    root.innerHTML = `
      <section class="curriculum-topic-section lesson-overview" id="topic-guide">
        <p class="curriculum-eyebrow">Shared lesson specification v${lesson.schemaVersion}</p>
        <h2>${escapeHtml(lesson.title)}</h2><p class="lesson-lead">${escapeHtml(lesson.learningIntention)}</p>
        <div class="lesson-facts"><div><strong>Lesson time</strong><span>${escapeHtml(lesson.lessonTime)}</span></div><div><strong>Materials</strong><span>${lesson.materials.map(escapeHtml).join(", ")}</span></div></div>
        <h3>Success criteria</h3><ul class="curriculum-check-list">${lesson.successCriteria.map((criterion) => `<li>${escapeHtml(criterion)}</li>`).join("")}</ul>
      </section>
      <section class="curriculum-topic-section"><h2>Observe and compare</h2><p>An <strong>object</strong> is a thing; a <strong>material</strong> is what it is made from. For this Year 3 investigation, classify substances by what they do when moved between containers.</p>${renderModel("object-material-sort")}${renderModel("solid-liquid-compare")}${renderCheck("checkpoint-properties")}</section>
      <section class="curriculum-topic-section"><h2>Investigate a reversible change</h2><p>Ice is solid water. When heat energy is added, it can melt into liquid water. When heat energy is removed from liquid water, it can freeze into solid ice. The state changes; the material remains water.</p>${renderModel("sealed-bag-change")}${renderModel("heat-direction-cycle")}${renderCheck("checkpoint-heat")}${renderCheck("checkpoint-change")}</section>
      <section class="curriculum-topic-section"><h2>Sealed-bag investigation</h2><ol class="teaching-steps"><li>Place equal ice pieces in labelled seal-lock bags and seal them.</li><li>Put one bag in a teacher-selected warmer location and one in a cooler location.</li><li>Predict, then record state and visible change at equal time intervals.</li><li>Compare evidence. Keep sample size, bag type and observation times the same.</li><li>Freeze the liquid water again and explain the full reversible cycle.</li></ol><p class="safety-note"><strong>Safety:</strong> use intact bags on trays, wipe spills promptly, and let the teacher manage food materials or heating.</p>${renderCheck("checkpoint-investigation")}</section>
      <section class="curriculum-topic-section"><h2>Useful controlled changes</h2><p>Careful warming can soften or melt some materials so they can be shaped, joined or formed. Cooling can help them become solid and hold a form. When teaching First Nations examples, use an authoritative or locally attributed source and avoid presenting one practice as shared by all communities.</p>${renderModel("useful-state-changes")}${renderCheck("checkpoint-applications")}</section>
      <section class="curriculum-topic-section"><h2>Teach every elaboration</h2><div class="elaboration-list">${lesson.elaborations.map((item) => `<article><span>${item.id}</span><div><h3>${escapeHtml(item.plainLanguageConcept)}</h3><p>${escapeHtml(item.curriculumWording)}</p><p><strong>Teacher asks:</strong> ${escapeHtml(item.teacherSaysOrAsks)}</p><p><strong>Mastery evidence:</strong> ${escapeHtml(item.masteryEvidence)}</p></div></article>`).join("")}</div></section>
      <section class="curriculum-topic-section"><h2>Worked examples</h2>${lesson.workedExamples.map((example) => `<article class="worked-example"><h3>${escapeHtml(example.title)}</h3><p>${escapeHtml(example.prompt)}</p><ol>${example.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol><p><strong>Teacher language:</strong> ${escapeHtml(example.teacherLanguage)}</p></article>`).join("")}</section>
      <section class="curriculum-topic-section"><h2>Misconceptions and rapid fixes</h2><div class="misconception-grid">${lesson.misconceptions.map((item) => `<article><h3>${escapeHtml(item.misconception)}</h3><p>${escapeHtml(item.evidence)}</p><p><strong>Repair:</strong> ${escapeHtml(item.remediation)}</p></article>`).join("")}</div></section>
      <section class="curriculum-topic-section"><h2>Support, Core and Extend</h2><div class="adaptation-grid">${Object.entries(lesson.differentiation).map(([level, item]) => `<article><h3>${escapeHtml(level)}</h3><p>${escapeHtml(item.adaptation)}</p><small>${escapeHtml(item.boundaryCheck)}</small></article>`).join("")}</div></section>
      <section class="curriculum-topic-section"><h2>Quick mastery check</h2>${renderCheck("mastery-final")}</section>
      <section class="curriculum-topic-section teacher-resource" id="teacher-slide"><p class="curriculum-eyebrow">Live teacher resource</p><h2>Matching 12-slide classroom deck</h2><p>The deck uses this page's lesson source, terminology, models, examples and checks. It shows one protected 16:9 slide at a time.</p><a class="curriculum-button primary" href="${lesson.resourceLinks.teacherSlides}">Open live teacher deck</a></section>
      <section class="curriculum-topic-section"><h2>Student resources</h2><div class="resource-grid"><a href="${lesson.resourceLinks.worksheet}">Worksheet</a><a href="${lesson.resourceLinks.practice}">Practice: 28-question bank</a><a href="${lesson.resourceLinks.test}">Test: separate 28-question bank</a></div></section>
      <section class="curriculum-topic-section"><h2>Curriculum boundary and references</h2><details><summary>Must teach and must not overteach</summary><h3>Must teach</h3><ul>${lesson.conceptBoundary.mustTeach.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Must not overteach</h3><ul>${lesson.conceptBoundary.mustNotOverteach.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></details><ul class="curriculum-source-list">${lesson.references.map((reference) => `<li><a href="${reference.url}" rel="nofollow noopener" target="_blank">${escapeHtml(reference.title)}</a> — ${escapeHtml(reference.purpose)}</li>`).join("")}</ul></section>`;
  }

  function renderDeck() {
    const root = document.querySelector("main.deck");
    if (!root) return;
    root.innerHTML = lesson.slides.map((slide, index) => {
      const checkpoint = slide.checkpointIds.map(renderCheck).join("");
      return `<section class="slide" data-slide="${index + 1}" data-elaborations="${escapeHtml(slide.elaborationIds.join(" "))}"><p class="slide-kicker">${lesson.code} · ${escapeHtml(slide.purpose)}</p><h2>${escapeHtml(slide.title)}</h2>${slide.display.modelIds.map(renderModel).join("")}<div class="student-prompt"><strong>Think and explain</strong><p>${escapeHtml(slide.display.studentPrompt)}</p></div><ul class="key-text">${slide.display.keyText.map((text) => `<li>${escapeHtml(text)}</li>`).join("")}</ul>${checkpoint}<details class="teacher-notes"><summary>Teacher guidance</summary><dl><dt>Teacher does</dt><dd>${escapeHtml(slide.teacherLayer.teacherDoes)}</dd><dt>Teacher says / asks</dt><dd>${escapeHtml(slide.teacherLayer.teacherSaysOrAsks)}</dd><dt>Student does</dt><dd>${escapeHtml(slide.teacherLayer.studentDoes)}</dd><dt>Look for</dt><dd>${escapeHtml(slide.teacherLayer.whatToLookFor)}</dd><dt>If incorrect</dt><dd>${escapeHtml(slide.teacherLayer.ifIncorrect)}</dd></dl></details></section>`;
    }).join("");
  }

  if (document.body.classList.contains("ac9s3u04-deck")) renderDeck();
  else renderTopic();
})();