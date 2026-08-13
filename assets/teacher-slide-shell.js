(() => {
  "use strict";

  if (window.__skillrTeacherSlideShellLoaded) return;
  window.__skillrTeacherSlideShellLoaded = true;

  const path = window.location.pathname;
  if (!/\/teacher-slides\/live\.html$/i.test(path)) return;

  // Only these older hosts need the fallback navigation and additive cluster layer.
  // Foundation v1.1 and the remaining decks own their keyboard handling directly.
  const restoreLegacyEnhancements =
    /^\/worksheets\/year1\/maths\/teacher-slides\/live\.html$/i.test(path) ||
    /^\/worksheets\/year[2-7]\/(?:maths|science|english)\/teacher-slides\/live\.html$/i.test(path);

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) {
        if (existing.dataset.skillrLoaded === "true") {
          resolve();
          return;
        }
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.addEventListener("load", () => {
        script.dataset.skillrLoaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function loadSequence(items) {
    return items.reduce((promise, src) => promise.then(() => loadScript(src)), Promise.resolve())
      .catch((error) => console.error("Skillr Teacher Slide enhancement load failed:", error));
  }

  function loadLegacyEnhancements() {
    if (!restoreLegacyEnhancements) return;
    loadSequence([
      "/assets/skillr-svg-runtime.js?v=2",
      "/assets/skillr-concept-svg.js?v=2",
      "/assets/curriculum-cluster-core.js?v=1",
      "/assets/curriculum-visual-layer.js?v=2",
      "/assets/teacher-slide-clusters.js?v=1"
    ]);
  }

  function setupSlideKeyboard() {
    if (!restoreLegacyEnhancements) return;
    document.addEventListener("keydown", (event) => {
      if (event.target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      const next = document.querySelector('[data-action="next"], .next-slide, #nextSlide, [aria-label*="Next slide" i]');
      const previous = document.querySelector('[data-action="previous"], .previous-slide, #previousSlide, [aria-label*="Previous slide" i]');
      if (event.key === "ArrowRight" && next) {
        event.preventDefault();
        next.click();
      }
      if (event.key === "ArrowLeft" && previous) {
        event.preventDefault();
        previous.click();
      }
    });
  }

  function initialiseSlideShell() {
    loadLegacyEnhancements();
    setupSlideKeyboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseSlideShell, { once: true });
  } else {
    initialiseSlideShell();
  }
})();
