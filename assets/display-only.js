(() => {
  "use strict";

  if (window.__skillrDisplayOnlyLoaded) return;
  window.__skillrDisplayOnlyLoaded = true;

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

    @media print {
      html, body {
        background: #fff !important;
      }

      body > * {
        display: none !important;
      }

      body::before {
        content: "SkillrHub resources are available for online display only.";
        display: block !important;
        padding: 32px;
        color: #173968;
        font: 700 18pt/1.4 Arial, sans-serif;
      }
    }
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

    if (modifier && ["p", "s", "c", "u"].includes(key)) {
      block(event);
      return;
    }

    if (key === "printscreen") {
      // Browsers cannot reliably stop an operating-system screenshot.
      // Prevent the page-level key event where supported.
      block(event);
    }
  }, true);

  window.addEventListener("beforeprint", () => {
    document.documentElement.dataset.skillrPrintBlocked = "true";
  });

  window.addEventListener("afterprint", () => {
    delete document.documentElement.dataset.skillrPrintBlocked;
  });
})();
