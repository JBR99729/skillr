(() => {
  "use strict";

  if (window.__skillrDisplayOnlyLoaded) return;
  window.__skillrDisplayOnlyLoaded = true;

  const pagePath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isTeacherSlide = pagePath.includes("/teacher-slides/");

  if (isTeacherSlide && !document.querySelector('script[src*="/assets/teacher-slide-shell.js"]')) {
    const teacherSlideShell = document.createElement("script");
    teacherSlideShell.src = "/assets/teacher-slide-shell.js?v=2";
    teacherSlideShell.async = false;
    document.head.appendChild(teacherSlideShell);
  }

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
    ` : ""}
  `;
  document.head.appendChild(style);

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
