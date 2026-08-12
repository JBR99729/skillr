(() => {
  "use strict";

  if (window.__skillrFoundationTopicLanguageLoaded) return;
  window.__skillrFoundationTopicLanguageLoaded = true;

  if (!/^\/foundation\//i.test(window.location.pathname)) return;

  function apply() {
    document.querySelectorAll("h2,h3").forEach((heading) => {
      const text = (heading.textContent || "").trim();
      if (/^(?:⚠️\s*)?fix these$/i.test(text)) {
        heading.textContent = "Common Mix-Ups";
      }
    });
  }

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
