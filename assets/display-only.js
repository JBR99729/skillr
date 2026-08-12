(() => {
  "use strict";

  if (window.__skillrDisplayOnlyLoaded) return;
  window.__skillrDisplayOnlyLoaded = true;

  const pagePath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isTeacherSlide = pagePath.includes("/teacher-slides/");

  // Temporary internal tracking badge for completed Foundation content QA.
  // Remove this loader and /assets/qa-complete-badges.js after human QA is finished.
  if (/^\/foundation\/curriculum(?:\/(?:maths|science|english))?$/.test(pagePath)) {
    const qaScript = document.createElement("script");
    qaScript.src = "/assets/qa-complete-badges.js?v=1";
    qaScript.async = false;
    document.head.appendChild(qaScript);
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

  // Whole-site deterrents against direct copying/saving of page content.
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

    // Direct copy/source shortcuts are deterred across the site.
    if (modifier && ["c", "u"].includes(key)) {
      block(event);
      return;
    }

    // Teacher slides are deliberately live-display only.
    if (isTeacherSlide && modifier && ["p", "s"].includes(key)) {
      block(event);
      return;
    }

    if (key === "printscreen") {
      // A normal webpage cannot reliably prevent an operating-system screenshot.
      // This only suppresses the browser-level key event where supported.
      block(event);
    }
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
