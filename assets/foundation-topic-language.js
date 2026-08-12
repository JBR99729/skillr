(() => {
  "use strict";

  if (window.__skillrFoundationTopicLanguageLoaded) return;
  window.__skillrFoundationTopicLanguageLoaded = true;

  if (!/^\/(foundation|year1)\//i.test(window.location.pathname)) return;

  function cleanHeadings() {
    document.querySelectorAll("h2,h3").forEach((heading) => {
      const text = (heading.textContent || "").trim();
      if (/^(?:⚠️\s*)?fix these$/i.test(text)) {
        heading.textContent = "Common Mix-Ups";
      }
    });
  }

  function removeWeakFallbackCopy() {
    document.querySelectorAll("p").forEach((paragraph) => {
      const text = (paragraph.textContent || "").replace(/\s+/g, " ").trim();
      if (/^If not:\s*return to the concrete\/visual teaching model\.?$/i.test(text)) {
        paragraph.remove();
      }
    });
  }

  function apply() {
    cleanHeadings();
    removeWeakFallbackCopy();
  }

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 3500);
})();
