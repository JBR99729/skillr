"use strict";

(() => {
  const style = document.createElement("style");
  style.textContent = `
    .question-visual.year2-english-assessment-visual{padding:.75rem;background:#f8fafc;border:1px solid #cbdcf2;border-radius:18px;font-size:1rem!important;letter-spacing:normal}
    .question-visual.year2-english-assessment-visual svg{display:block;width:min(100%,640px);height:auto;margin:auto}
    .feedback{white-space:pre-line}
  `;
  document.head.appendChild(style);

  function enhanceVisual() {
    const visual = document.getElementById("questionVisual");
    if (!visual || visual.dataset.year2EnglishReady) return;
    visual.dataset.year2EnglishReady = "true";
    visual.classList.add("year2-english-assessment-visual");
    const svg = visual.querySelector("svg[aria-label]");
    if (svg) visual.setAttribute("aria-label", svg.getAttribute("aria-label"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    enhanceVisual();
    const app = document.getElementById("quizApp");
    if (app) new MutationObserver(enhanceVisual).observe(app, { childList: true, subtree: true });
  });
})();
