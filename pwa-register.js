(() => {
  "use strict";

  let deferredInstallPrompt = null;
  let installModal = null;
  let pendingIntentUrl = null;
  let pendingIntentTarget = null;

  const INSTALL_COOLDOWN_DAYS = 10;
  const STORAGE_KEYS = {
    acceptedAt: "skillrPwaAcceptedAt",
    dismissedAt: "skillrPwaDismissedAt",
    visitCount: "skillrPwaVisitCount"
  };
  const INTENT_SELECTORS = [
    "a[data-pwa-intent]",
    "a.download-button",
    "a[download]",
    "a.button--quiz",
    "a[href*='/quiz/']",
    "a[href*='/daily-drills/']",
    "a[href*='review.html']"
  ].join(",");


  /* =========================================================
     REGISTER SERVICE WORKER
     ========================================================= */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", {
          scope: "/",
          updateViaCache: "none"
        })
        .then((registration) => {
          registration.update();
        })
        .catch((error) => {
          console.error(
            "Skillr Education service worker registration failed:",
            error
          );
        });
    });
  }


  /* =========================================================
     DO NOT SHOW INSTALL BUTTON INSIDE INSTALLED APP
     ========================================================= */

  function isStandaloneApp() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  if (isStandaloneApp()) {
    return;
  }

  function setTimestamp(key) {
    try {
      window.localStorage.setItem(key, String(Date.now()));
    } catch (error) {
      // Ignore localStorage failures.
    }
  }

  function getTimestamp(key) {
    try {
      const rawValue = window.localStorage.getItem(key);
      if (!rawValue) {
        return 0;
      }

      const parsed = Number(rawValue);
      return Number.isFinite(parsed) ? parsed : 0;
    } catch (error) {
      return 0;
    }
  }

  function setAccepted() {
    setTimestamp(STORAGE_KEYS.acceptedAt);
  }

  function setDismissed() {
    setTimestamp(STORAGE_KEYS.dismissedAt);
  }

  function markVisit() {
    try {
      const current = Number(window.localStorage.getItem(STORAGE_KEYS.visitCount) || "0");
      const next = Number.isFinite(current) ? current + 1 : 1;
      window.localStorage.setItem(STORAGE_KEYS.visitCount, String(next));
    } catch (error) {
      // Ignore localStorage failures.
    }
  }

  function getVisitCount() {
    try {
      const value = Number(window.localStorage.getItem(STORAGE_KEYS.visitCount) || "0");
      return Number.isFinite(value) ? value : 0;
    } catch (error) {
      return 0;
    }
  }

  function shouldRespectCooldown() {
    const acceptedAt = getTimestamp(STORAGE_KEYS.acceptedAt);
    if (acceptedAt > 0) {
      return true;
    }

    const dismissedAt = getTimestamp(STORAGE_KEYS.dismissedAt);
    if (dismissedAt <= 0) {
      return false;
    }

    const cooldownWindowMs = INSTALL_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt < cooldownWindowMs;
  }

  function isIosDevice() {
    const userAgent = window.navigator.userAgent || "";
    return /iPad|iPhone|iPod/.test(userAgent);
  }

  function isIosSafari() {
    const userAgent = window.navigator.userAgent || "";
    return (
      isIosDevice() &&
      /Safari/.test(userAgent) &&
      !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent)
    );
  }

  function clearPendingIntent() {
    pendingIntentUrl = null;
    pendingIntentTarget = null;
  }

  function closeInstallModal() {
    if (installModal) {
      installModal.remove();
      installModal = null;
    }
    clearPendingIntent();
  }

  function openIntentTarget(url, target) {
    if (!url) {
      return;
    }

    if (target === "_blank") {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(url);
  }

  function getModalContent() {
    if (deferredInstallPrompt) {
      return {
        title: "Install SkillrHub for faster access",
        description: "Open drills in one tap, keep pages available offline, and make learning sessions quicker for families and classrooms.",
        primaryLabel: "Install app",
        secondaryLabel: "Continue in browser",
        primaryAction: "install"
      };
    }

    if (isIosSafari()) {
      return {
        title: "Add SkillrHub to your Home Screen",
        description: "Tap Share, then choose Add to Home Screen. It saves a clean shortcut so students can launch learning with one tap.",
        primaryLabel: "I added it",
        secondaryLabel: "Continue in browser",
        primaryAction: "ack"
      };
    }

    const bookmarkHint = /Mac|iPhone|iPad|iPod/.test(window.navigator.platform || "")
      ? "Press Cmd + D to bookmark this page."
      : "Press Ctrl + D to bookmark this page.";

    return {
      title: "Save this page for quick return",
      description: bookmarkHint,
      primaryLabel: "Done",
      secondaryLabel: "Continue in browser",
      primaryAction: "ack"
    };
  }

  async function runPrimaryAction(action) {
    if (action !== "install") {
      setDismissed();
      return;
    }

    if (!deferredInstallPrompt) {
      setDismissed();
      return;
    }

    try {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      if (choiceResult && choiceResult.outcome === "accepted") {
        setAccepted();
      } else {
        setDismissed();
      }
    } catch (error) {
      console.error("SkillrHub install prompt failed:", error);
      setDismissed();
    }

    deferredInstallPrompt = null;
  }

  function showInstallModal(intentUrl, intentTarget) {
    if (isStandaloneApp()) {
      openIntentTarget(intentUrl, intentTarget);
      return;
    }

    if (shouldRespectCooldown()) {
      openIntentTarget(intentUrl, intentTarget);
      return;
    }

    if (!deferredInstallPrompt && !isIosSafari() && getVisitCount() < 2) {
      openIntentTarget(intentUrl, intentTarget);
      return;
    }

    pendingIntentUrl = intentUrl;
    pendingIntentTarget = intentTarget;

    const modalContent = getModalContent();

    if (installModal) {
      installModal.remove();
    }

    installModal = document.createElement("div");
    installModal.className = "install-confirmation-modal";
    installModal.setAttribute("role", "dialog");
    installModal.setAttribute("aria-modal", "true");
    installModal.setAttribute("aria-label", "Install SkillrHub");
    installModal.innerHTML = `
      <div class="install-confirmation-modal__dialog">
        <h3>${modalContent.title}</h3>
        <p>${modalContent.description}</p>
        <div class="install-confirmation-modal__actions">
          <button type="button" class="install-confirmation-modal__button install-confirmation-modal__button--secondary" data-action="continue">${modalContent.secondaryLabel}</button>
          <button type="button" class="install-confirmation-modal__button install-confirmation-modal__button--primary" data-action="primary">${modalContent.primaryLabel}</button>
        </div>
      </div>
    `;

    installModal.addEventListener("click", (event) => {
      if (event.target !== installModal) {
        return;
      }

      const nextUrl = pendingIntentUrl;
      const nextTarget = pendingIntentTarget;
      setDismissed();
      closeInstallModal();
      openIntentTarget(nextUrl, nextTarget);
    });

    installModal.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();

        const action = button.getAttribute("data-action");

        if (action === "continue") {
          const nextUrl = pendingIntentUrl;
          const nextTarget = pendingIntentTarget;
          setDismissed();
          closeInstallModal();
          openIntentTarget(nextUrl, nextTarget);
          return;
        }

        const nextUrl = pendingIntentUrl;
        const nextTarget = pendingIntentTarget;
        await runPrimaryAction(modalContent.primaryAction);
        closeInstallModal();
        openIntentTarget(nextUrl, nextTarget);
      });
    });

    document.body.appendChild(installModal);
    installModal.querySelector("[data-action='continue']")?.focus();
  }

  function attachIntentIntercept() {
    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest(INTENT_SELECTORS) : null;

      if (!target) {
        return;
      }

      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href || href.startsWith("javascript:")) {
        return;
      }

      if (target.getAttribute("target") === "_blank") {
        return;
      }

      event.preventDefault();
      const intentTarget = target.getAttribute("target") || "";
      showInstallModal(href, intentTarget);
    });
  }

  function initializePwaUi() {
    markVisit();
    attachIntentIntercept();
  }

  if (document.body) {
    initializePwaUi();
  } else {
    window.addEventListener("DOMContentLoaded", initializePwaUi, { once: true });
  }


  /* =========================================================
     BROWSER SAYS PWA CAN BE INSTALLED
     ========================================================= */

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    deferredInstallPrompt = event;
  });


  /* =========================================================
     APP INSTALLED
     ========================================================= */

  window.addEventListener("appinstalled", () => {
    setAccepted();
    deferredInstallPrompt = null;
    closeInstallModal();
  });
})();
