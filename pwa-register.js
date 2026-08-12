(() => {
  "use strict";

  if (!document.querySelector('script[data-skillr-display-only]')) {
    const displayOnlyScript = document.createElement("script");
    displayOnlyScript.src = "/assets/display-only.js?v=1";
    displayOnlyScript.dataset.skillrDisplayOnly = "true";
    document.head.appendChild(displayOnlyScript);
  }

  if (!document.querySelector('script[data-skillr-progress]')) {
    const progressScript = document.createElement("script");
    progressScript.src = "/assets/progress-store.js?v=3";
    progressScript.dataset.skillrProgress = "true";
    document.head.appendChild(progressScript);
  }

  let deferredInstallPrompt = null;
  const ACCEPTED_AT_KEY = "skillrPwaAcceptedAt";

  function isStandaloneApp() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function setAccepted() {
    try {
      window.localStorage.setItem(ACCEPTED_AT_KEY, String(Date.now()));
    } catch (error) {
      // Installation still succeeds when storage is unavailable.
    }
  }

  async function promptInstall() {
    if (isStandaloneApp()) {
      return { outcome: "installed" };
    }

    if (!deferredInstallPrompt) {
      return { outcome: "unavailable" };
    }

    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;

    if (choice?.outcome === "accepted") {
      setAccepted();
    }

    return choice || { outcome: "dismissed" };
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => registration.update())
        .catch((error) => {
          console.error("Skillr Education service worker registration failed:", error);
        });
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    window.dispatchEvent(new CustomEvent("skillr:install-ready"));
  });

  window.addEventListener("appinstalled", () => {
    setAccepted();
    deferredInstallPrompt = null;
    window.dispatchEvent(new CustomEvent("skillr:installed"));
  });

  window.SkillrPwa = {
    isStandaloneApp,
    isInstallAvailable: () => Boolean(deferredInstallPrompt),
    promptInstall
  };
})();
