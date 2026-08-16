(() => {
  "use strict";
  const lessons = window.skillrLowerMaterialsLessons;
  const code = document.body.dataset.lessonCode;
  const lesson = lessons?.[code];
  if (!lesson) return;
  const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const checks = Object.fromEntries(lesson.masteryItems.map((item) => [item.id, item]));
  const checkHtml = (id) => { const item = checks[id]; return item ? `<details class="lower-check"><summary>${esc(item.prompt)}</summary><p><strong>Expected:</strong> ${esc(item.expectedAnswer)}</p><p><strong>Look for:</strong> ${esc(item.evidenceOfMastery)}</p><p><strong>Repair:</strong> ${esc(item.remediation)}</p></details>` : ""; };
  const visual = `<div class="materials-visual" role="img" aria-label="A spoon, shoe and saucepan labelled as objects with metal, wood, plastic and fabric labelled as materials"><div><strong>spoon</strong><span>metal / wood / plastic</span></div><div><strong>shoe</strong><span>fabric / rubber</span></div><div><strong>saucepan</strong><span>metal / plastic</span></div></div>`;

  if (document.body.classList.contains("lower-materials-deck")) {
    document.querySelector("main.deck").innerHTML = lesson.slides.map((slide, index) => `<section class="slide" data-slide="${index + 1}"><p class="slide-kicker">${code} · ${esc(slide.purpose)}</p><h2>${esc(slide.title)}</h2>${index === 0 ? visual : ""}<div class="student-prompt"><strong>Think and explain</strong><p>${esc(slide.display.studentPrompt)}</p></div><ul>${slide.display.keyText.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>${slide.checkpointIds.map(checkHtml).join("")}<details class="teacher-notes"><summary>Teacher guidance</summary><dl>${Object.entries(slide.teacherLayer).map(([key, value]) => `<dt>${esc(key.replace(/([A-Z])/g, " $1"))}</dt><dd>${esc(value)}</dd>`).join("")}</dl></details></section>`).join("");
    return;
  }

  const root = document.querySelector("main.curriculum-layout > div");
  if (!root) return;
  root.insertAdjacentHTML("afterbegin", `<section class="curriculum-topic-section lower-materials-guide"><p class="curriculum-eyebrow">Topic Guide + Teacher Slide v1.1</p><h2>${esc(lesson.title)}</h2><p class="lesson-intention">${esc(lesson.learningIntention)}</p>${visual}<h3>Success criteria</h3><ul class="curriculum-check-list">${lesson.successCriteria.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><h3>Teaching sequence</h3><div class="lower-sequence">${lesson.slides.map((slide) => `<article><span>${esc(slide.id.replace("slide-", ""))}</span><div><h4>${esc(slide.title)}</h4><p>${esc(slide.display.studentPrompt)}</p></div></article>`).join("")}</div><h3>Quick checks</h3>${lesson.masteryItems.map((item) => checkHtml(item.id)).join("")}<h3>Support, Core and Extend</h3><div class="lower-adapt">${Object.entries(lesson.differentiation).map(([name, item]) => `<article><strong>${esc(name)}</strong><p>${esc(item.adaptation)}</p></article>`).join("")}</div><p><a class="curriculum-button primary" href="${lesson.resourceLinks.teacherSlides}">Open matching live teacher deck</a></p></section>`);
  const old = document.querySelector("#teacher-slide");
  if (old) old.remove();
})();