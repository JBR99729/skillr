"use strict";

(() => {
  const style = document.createElement("style");
  style.textContent = `
    .question-visual.production-question-visual{padding:.8rem;background:#f7fbff;border:1px solid #b8ddf2;border-radius:18px}
    .question-visual.production-question-visual svg{display:block;width:min(100%,640px);height:auto;margin:auto}
    .production-read-aloud{display:inline-flex;align-items:center;gap:.45rem;margin:.65rem 0;padding:.58rem .9rem;border:1px solid #1a91c7;border-radius:999px;background:#effaff;color:#124f70;font:700 .95rem/1 system-ui,sans-serif;cursor:pointer}
    .production-read-aloud:hover,.production-read-aloud:focus-visible{background:#dff5ff;outline:3px solid rgba(26,145,199,.22);outline-offset:2px}
    .feedback{white-space:pre-line}
  `;
  document.head.appendChild(style);

  function addReadAloudButton() {
    const heading = document.getElementById("questionText");
    if (!heading || !heading.textContent.trim()) return;
    document.querySelector(".production-read-aloud")?.remove();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "production-read-aloud";
    button.setAttribute("aria-label", "Read this question aloud");
    button.textContent = "🔊 Read aloud";
    button.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const visualDescription = document.getElementById("questionVisual")?.getAttribute("aria-label") || "";
      const utterance = new SpeechSynthesisUtterance([heading.textContent.trim(), visualDescription].filter(Boolean).join(" "));
      utterance.lang = "en-AU";
      window.speechSynthesis.speak(utterance);
    });
    const visual = document.getElementById("questionVisual");
    (visual || heading).insertAdjacentElement("afterend", button);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("questionText");
    if (!heading) return;
    new MutationObserver(() => queueMicrotask(addReadAloudButton)).observe(heading, { childList: true, characterData: true, subtree: true });
    const app = document.getElementById("quizApp");
    if (app) {
      new MutationObserver(() => {
        const visual = document.getElementById("questionVisual");
        if (!visual || visual.dataset.productionReady) return;
        visual.dataset.productionReady = "true";
        visual.classList.add("production-question-visual");
        const svg = visual.querySelector("svg[aria-label]");
        if (svg) visual.setAttribute("aria-label", svg.getAttribute("aria-label"));
      }).observe(app, { childList: true, subtree: true });
    }
  });
})();
