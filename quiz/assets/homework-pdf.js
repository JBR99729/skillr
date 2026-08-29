"use strict";

/* Compatibility wrapper for older homework pages.
   The worksheet PDF generator is the maintained implementation. */
(() => {
  const existing = document.querySelector('script[src*="/quiz/assets/worksheet-pdf.js"]');

  if (existing) return;

  const script = document.createElement("script");
  script.src = "/quiz/assets/worksheet-pdf.js?v=17";
  script.async = false;

  const current = document.currentScript;
  if (current?.parentNode) {
    current.parentNode.insertBefore(script, current.nextSibling);
  } else {
    document.head.appendChild(script);
  }
})();
