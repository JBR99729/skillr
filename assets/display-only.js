(() => {
  "use strict";

  if (window.__skillrDisplayOnlyLoaded) return;
  window.__skillrDisplayOnlyLoaded = true;

  const pagePath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isTeacherSlide = pagePath.includes("/teacher-slides/") || pagePath.includes("/teacher-deck");
  const isStandaloneTeacherDeck = pagePath.includes("/teacher-deck");
  if (isStandaloneTeacherDeck) document.documentElement.classList.add("skillr-standalone-deck");
  const curriculumCode = (new URLSearchParams(window.location.search).get("code") || pagePath.match(/ac9[a-z0-9]+/i)?.[0] || "").toUpperCase();

  // Year 7 pages retain their existing HTML and load the connected visual layer additively.
  if (/^\/(?:year7\/(?:maths|science|english)\/ac9|quiz\/year-7\/(?:math|science|english)\/ac9)/i.test(pagePath)) {
    const router = document.createElement("script");
    router.src = "/assets/year7-router.js?v=1";
    router.async = false;
    document.head.appendChild(router);
  }

  const style = document.createElement("style");
  style.textContent = `
    html, body, body * {
      -webkit-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }

    input, textarea, select, option, [contenteditable="true"] {
      -webkit-user-select: text !important;
      user-select: text !important;
      -webkit-touch-callout: default !important;
    }

    img, svg, canvas, video {
      -webkit-user-drag: none !important;
      user-drag: none !important;
    }

    ${isTeacherSlide ? `
    .skillr-display-slide {
      position: relative !important;
      isolation: isolate !important;
      overflow: hidden !important;
      width: 100% !important;
      aspect-ratio: 16 / 9 !important;
      min-height: 0 !important;
    }

    .skillr-display-slide[hidden] {
      display: none !important;
    }

    .skillr-standalone-deck .deck {
      display: grid !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 8px !important;
      place-items: start center !important;
    }

    .skillr-standalone-deck .skillr-display-slide {
      width: min(100%, calc((100vh - 92px) * 16 / 9)) !important;
      margin: 0 !important;
    }

    .skillr-deck-controls {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .skillr-deck-controls button {
      min-height: 40px;
    }

    .skillr-deck-controls button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    .skillr-deck-progress {
      min-width: 72px;
      color: #fff;
      font-weight: 800;
      text-align: center;
      white-space: nowrap;
    }

    .skillr-display-watermark {
      position: absolute;
      inset: 0;
      z-index: 0;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-template-rows: repeat(4, minmax(0, 1fr));
      align-items: center;
      justify-items: center;
      overflow: hidden;
      pointer-events: none;
    }

    .skillr-display-watermark span {
      color: rgba(36, 87, 214, 0.065);
      font: 800 clamp(11px, 1.25vw, 18px)/1 Arial, sans-serif;
      transform: rotate(-24deg);
      white-space: nowrap;
    }

    .skillr-display-footer {
      position: absolute;
      z-index: 20;
      right: clamp(12px, 2vw, 28px);
      bottom: clamp(7px, 1vw, 14px);
      left: clamp(12px, 2vw, 28px);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding-top: 5px;
      border-top: 1px solid rgba(23, 57, 104, 0.25);
      color: #173968;
      font: 800 clamp(9px, 0.8vw, 12px)/1.2 Arial, sans-serif;
      pointer-events: none;
    }

    .skillr-display-slide > :not(.skillr-display-watermark):not(.skillr-display-footer) {
      position: relative;
      z-index: 1;
    }

    a[download], button[data-download], button[onclick*="print" i], [class*="download" i] {
      display: none !important;
    }

    @media print {
      html, body {
        background: #fff !important;
      }

      body > * {
        display: none !important;
      }

      body::before {
        content: "SkillrHub teacher resources are available for live online display only.";
        display: block !important;
        padding: 32px;
        color: #173968;
        font: 700 18pt/1.4 Arial, sans-serif;
      }
    }

    @media (max-width: 720px) {
      .skillr-deck-controls {
        width: 100%;
        justify-content: center;
        margin-left: 0;
      }
    }
    ` : ""}
  `;
  document.head.appendChild(style);

  function secureTeacherSlides() {
    if (!isTeacherSlide) return;

    let slides = Array.from(document.querySelectorAll(".fcr-slide, .core-slide, .slide"));
    if (!slides.length) {
      const sheet = document.querySelector("main.sheet, #slideRoot.sheet, #slideRoot");
      if (sheet && sheet.children.length) slides = [sheet];
    }

    slides.forEach((slide) => {
      if (slide.classList.contains("skillr-display-slide")) return;
      slide.classList.add("skillr-display-slide");

      const watermark = document.createElement("div");
      watermark.className = "skillr-display-watermark";
      watermark.setAttribute("aria-hidden", "true");
      for (let index = 0; index < 12; index += 1) {
        const mark = document.createElement("span");
        mark.textContent = "SkillrHub • skillrhub.com";
        watermark.appendChild(mark);
      }

      const footer = document.createElement("div");
      footer.className = "skillr-display-footer";
      footer.setAttribute("aria-hidden", "true");
      const brand = document.createElement("span");
      brand.textContent = "SkillrHub • Live classroom display";
      const code = document.createElement("span");
      code.textContent = curriculumCode || "SkillrHub F–10";
      footer.append(brand, code);
      slide.prepend(watermark);
      slide.appendChild(footer);
    });
  }

  function initStandaloneDeckNavigation() {
    if (!isStandaloneTeacherDeck || document.querySelector(".skillr-deck-controls")) return;
    const slides = Array.from(document.querySelectorAll(".slide"));
    if (!slides.length) return;

    const controls = document.createElement("div");
    controls.className = "skillr-deck-controls";
    controls.setAttribute("aria-label", "Slide navigation");

    const previous = document.createElement("button");
    previous.type = "button";
    previous.textContent = "Previous";

    const progress = document.createElement("span");
    progress.className = "skillr-deck-progress";
    progress.setAttribute("aria-live", "polite");

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Next";
    controls.append(previous, progress, next);

    const toolbar = document.querySelector(".nav");
    if (toolbar) toolbar.appendChild(controls);
    else document.body.insertBefore(controls, document.body.firstChild);

    let current = 0;
    const show = (index) => {
      current = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== current;
        slide.setAttribute("aria-hidden", String(slideIndex !== current));
      });
      progress.textContent = `${current + 1} / ${slides.length}`;
      previous.disabled = current === 0;
      next.disabled = current === slides.length - 1;
    };

    previous.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
    show(0);
  }

  function initTeacherSlideProtection() {
    secureTeacherSlides();
    initStandaloneDeckNavigation();
    if (!isTeacherSlide || !document.body) return;
    const observer = new MutationObserver(secureTeacherSlides);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeacherSlideProtection, { once: true });
  } else {
    initTeacherSlideProtection();
  }

  const block = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  document.addEventListener("contextmenu", block, true);
  document.addEventListener("copy", block, true);
  document.addEventListener("cut", block, true);
  document.addEventListener("dragstart", block, true);

  document.addEventListener("selectstart", (event) => {
    const target = event.target;
    if (target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]')) {
      return;
    }
    block(event);
  }, true);

  document.addEventListener("keydown", (event) => {
    const key = String(event.key || "").toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;

    if (modifier && ["c", "u"].includes(key)) {
      block(event);
      return;
    }

    if (isTeacherSlide && modifier && ["p", "s"].includes(key)) {
      block(event);
      return;
    }

    if (key === "printscreen") block(event);
  }, true);

  if (isTeacherSlide) {
    window.addEventListener("beforeprint", () => {
      document.documentElement.dataset.skillrPrintBlocked = "true";
    });

    window.addEventListener("afterprint", () => {
      delete document.documentElement.dataset.skillrPrintBlocked;
    });
  }
})();
