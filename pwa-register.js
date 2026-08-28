(() => {
  "use strict";

  const path = window.location.pathname;
  const isCanonicalCurriculumTopic = /^\/(?:foundation|year(?:[1-9]|10))\/(?:maths|science|english)\/ac9[a-z0-9]+(?:-|\/)/i.test(path);

  // STATIC_CURRICULUM_TOPIC_GUARD: canonical F-10 topic pages are complete static HTML.
  // Keep PWA/general utilities, but never allow shared loaders to fetch or inject
  // year/foundation curriculum data, renderers, topic modules or visual lesson layers.
  if (isCanonicalCurriculumTopic) {
    window.__skillrStaticCurriculumTopic = true;
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function guardedAppendChild(node) {
      if (node instanceof HTMLScriptElement) {
        const src = new URL(node.src || node.getAttribute("src") || "", window.location.href).pathname;
        const blockedCurriculumAsset = /^\/assets\/(?:foundation-|year(?:[1-9]|10)-)/i.test(src)
          || /^\/assets\/(?:skillr-svg-runtime|skillr-concept-svg|curriculum-cluster-core|curriculum-strand-coverage|curriculum-visual-layer|teacher-slide-clusters|multi-strand-worksheet-pack)\.js$/i.test(src)
          || /\/(?:topic-modules-render|lesson-render|lower-materials-render)\.js$/i.test(src);
        if (blockedCurriculumAsset) {
          Promise.resolve().then(() => node.dispatchEvent(new Event("load")));
          return node;
        }
      }
      return originalAppendChild.call(this, node);
    };
  }

  const legacy = document.createElement("script");
  legacy.src = "/assets/pwa-register-legacy.js?v=1";
  legacy.async = false;
  document.head.appendChild(legacy);
})();
