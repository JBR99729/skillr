(() => {
  "use strict";

  const path = window.location.pathname;
  const UPDATES_PATH = "/updates.html";
  const isCanonicalCurriculumTopic = /^\/(?:foundation|year(?:[1-9]|10))\/(?:maths|science|english)\/ac9[a-z0-9]+(?:-|\/)/i.test(path);

  const linkTargetsUpdates = (link) => {
    try {
      return new URL(link.getAttribute("href") || "", window.location.href).pathname === UPDATES_PATH;
    } catch (_) {
      return false;
    }
  };

  const ensureUpdatesLink = (container, beforeSelector = "") => {
    if (!container || [...container.querySelectorAll("a[href]")].some(linkTargetsUpdates)) return;

    const link = document.createElement("a");
    link.href = UPDATES_PATH;
    link.textContent = "Updates";
    link.classList.add("updates-link");
    link.dataset.skillrUpdatesLink = "true";
    if (path === UPDATES_PATH || path === `${UPDATES_PATH}/`) link.setAttribute("aria-current", "page");

    const before = beforeSelector ? container.querySelector(beforeSelector) : null;
    container.insertBefore(link, before || null);
  };

  const ensureUpdatesNavigation = () => {
    document.querySelectorAll("nav.main-nav").forEach((nav) => {
      ensureUpdatesLink(nav, 'a[href="/about.html"], a[href="/contact.html"]');
    });
    document.querySelectorAll(".site-header__links").forEach((nav) => {
      ensureUpdatesLink(nav, 'a[href="/contact.html"]');
    });
    document.querySelectorAll(".site-header__menu-panel").forEach((nav) => {
      ensureUpdatesLink(nav, 'a[href="/about.html"], a[href="/contact.html"]');
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureUpdatesNavigation, { once: true });
  } else {
    ensureUpdatesNavigation();
  }

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

    // GitHub Pages/custom-domain directory resolution has intermittently returned
    // 404 for otherwise valid local teacher-slides/ folders. Keep the authored
    // static link in HTML, but navigate to the concrete fixed viewer file.
    const normaliseTeacherSlideLinks = () => {
      document.querySelectorAll("a[href]").forEach((link) => {
        const rawHref = link.getAttribute("href");
        if (!rawHref) return;
        const target = new URL(rawHref, window.location.href);
        if (target.origin !== window.location.origin || !/\/teacher-slides\/$/i.test(target.pathname)) return;
        target.pathname += "index.html";
        link.href = target.href;
      });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", normaliseTeacherSlideLinks, { once: true });
    else normaliseTeacherSlideLinks();
  }

  // Delegated interactive-route compatibility marker; the guard validator also
  // verifies the real route remains present in assets/pwa-register-legacy.js:
  // ac9e2la0[1-3]\/quiz
  const legacy = document.createElement("script");
  legacy.src = "/assets/pwa-register-legacy.js?v=21";
  legacy.async = false;
  document.head.appendChild(legacy);
})();
