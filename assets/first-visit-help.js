(() => {
  "use strict";

  const path = window.location.pathname.toLowerCase();
  const isEmbedded = window.self !== window.top;
  const isTeacherSlide = path.includes("/teacher-slides/") || path.endsWith("/teacher-slides/live.html");

  if (isEmbedded || isTeacherSlide || window.__skillrFirstVisitHelpLoaded) {
    return;
  }

  window.__skillrFirstVisitHelpLoaded = true;

  const SEEN_KEY = "skillrFirstVisitHelpV1Seen";
  const CURRENT_STYLE_URL = "/assets/first-visit-help.css?v=2";
  let activeLayer = null;
  let returnFocus = null;

  function ensureCurrentStyles() {
    const existing = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .find((link) => link.getAttribute("href") === CURRENT_STYLE_URL);
    const link = existing || document.createElement("link");

    if (existing?.sheet) {
      return Promise.resolve();
    }

    if (!existing) {
      link.rel = "stylesheet";
      link.href = CURRENT_STYLE_URL;
      document.head.appendChild(link);
    }

    return new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      link.addEventListener("load", finish, { once: true });
      link.addEventListener("error", finish, { once: true });
      window.setTimeout(finish, 1500);
    });
  }

  function hasBeenSeen() {
    const containsSeenFlag = (storageName) => {
      try {
        return window[storageName]?.getItem(SEEN_KEY) === "true";
      } catch {
        return false;
      }
    };
    return containsSeenFlag("localStorage") || containsSeenFlag("sessionStorage");
  }

  function markSeen() {
    try {
      window.localStorage.setItem(SEEN_KEY, "true");
    } catch {
      try {
        window.sessionStorage.setItem(SEEN_KEY, "true");
      } catch {}
    }
  }

  function focusableElements(container) {
    return [...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hidden && element.getAttribute("aria-hidden") !== "true");
  }

  function closeHelp() {
    if (!activeLayer) {
      return;
    }

    const layer = activeLayer;
    activeLayer = null;
    layer.remove();
    document.body.classList.remove("skillr-help-open");
    markSeen();
    returnFocus?.focus?.();
  }

  function openHelp(trigger, automatic = false) {
    if (activeLayer) {
      return;
    }

    returnFocus = trigger || document.activeElement;
    if (automatic) {
      markSeen();
    }

    const layer = document.createElement("div");
    layer.className = "skillr-help-layer";
    layer.setAttribute("role", "presentation");
    layer.innerHTML = `
      <section class="skillr-help-panel" role="dialog" aria-modal="true" aria-labelledby="skillr-help-title" aria-describedby="skillr-help-description">
        <header class="skillr-help-header">
          <div>
            <span class="skillr-help-kicker">Welcome to SkillrHub</span>
            <h2 id="skillr-help-title">Start learning — no login required</h2>
          </div>
          <button class="skillr-help-close" type="button" aria-label="Close start guide">×</button>
        </header>
        <div class="skillr-help-no-login" role="note">
          <strong>No account. No password. No student details required.</strong>
          <span>Open a resource and begin immediately. Progress stays on this device.</span>
        </div>
        <p id="skillr-help-description">Choose how you’re using SkillrHub and we’ll point you to the right resources.</p>
        <div class="skillr-help-roles">
          <a href="/start/?role=student"><strong>Student</strong><span>Practise or test a topic</span></a>
          <a href="/start/?role=teacher"><strong>Teacher</strong><span>Plan and teach a lesson</span></a>
          <a href="/start/?role=substitute"><strong>Substitute teacher</strong><span>Run a lesson now</span></a>
          <a href="/start/?role=family"><strong>Parent or homeschool</strong><span>Choose a home-learning path</span></a>
        </div>
        <footer class="skillr-help-footer">
          <button class="skillr-help-browse" type="button">I’ll browse on my own</button>
          <a href="/privacy-policy.html">How local progress protects privacy</a>
        </footer>
      </section>`;

    const panel = layer.querySelector(".skillr-help-panel");
    const closeButton = layer.querySelector(".skillr-help-close");
    const browseButton = layer.querySelector(".skillr-help-browse");

    layer.addEventListener("click", (event) => {
      if (event.target === layer) {
        closeHelp();
      }
    });
    closeButton.addEventListener("click", closeHelp);
    browseButton.addEventListener("click", closeHelp);
    layer.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeHelp));
    layer.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeHelp();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = focusableElements(panel);
      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    activeLayer = layer;
    document.body.appendChild(layer);
    document.body.classList.add("skillr-help-open");
    window.requestAnimationFrame(() => closeButton.focus());
  }

  function init() {
    const launcher = document.createElement("button");
    launcher.className = "skillr-help-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-haspopup", "dialog");
    launcher.innerHTML = '<span aria-hidden="true">?</span><strong>Start here</strong>';
    launcher.addEventListener("click", () => openHelp(launcher));
    document.body.appendChild(launcher);

    if (!hasBeenSeen() && !path.startsWith("/start/")) {
      window.setTimeout(() => openHelp(null, true), 850);
    }
  }

  const stylesReady = ensureCurrentStyles();
  const start = () => stylesReady.then(init);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
