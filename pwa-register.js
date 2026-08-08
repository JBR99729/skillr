(() => {
  "use strict";

  let deferredInstallPrompt = null;
  let installButton = null;
  const installStateKey = "skillrInstallFabDismissed";


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
        .catch((error) => {
          console.error(
            "SkillrHub service worker registration failed:",
            error
          );
        });
    });
  }


  /* =========================================================
     DO NOT SHOW INSTALL BUTTON INSIDE INSTALLED APP
     ========================================================= */

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (isStandalone) {
    return;
  }

  function isInstallDismissed() {
    try {
      return window.localStorage.getItem(installStateKey) === "true";
    } catch (error) {
      return false;
    }
  }

  function hideInstallButton() {
    if (!installButton) {
      return;
    }

    installButton.hidden = true;
  }

  function shouldShowInstallButton() {
    if (isInstallDismissed()) {
      return false;
    }

    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      return false;
    }

    const hasTouch = window.matchMedia("(pointer: coarse)").matches || window.navigator.maxTouchPoints > 0;
    const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent);

    return hasTouch || mobileUserAgent || window.innerWidth <= 900;
  }

  function showInstallButton() {
    if (!installButton || isInstallDismissed()) {
      return;
    }

    installButton.hidden = !shouldShowInstallButton();
  }

  function attachInstallButton() {
    if (!document.body) {
      return;
    }

    if (installButton) {
      return;
    }

    installButton = document.getElementById("installAppButton");

    if (!installButton) {
      installButton = document.createElement("button");
      installButton.id = "installAppButton";
      installButton.className = "install-app-fab";
      installButton.type = "button";
      installButton.setAttribute("aria-label", "Install SkillrHub app");
      installButton.innerHTML = `
        <span class="install-app-fab__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1Z"/>
          </svg>
        </span>
        <span class="install-app-fab__label">Install</span>
      `;
      installButton.hidden = true;
      document.body.appendChild(installButton);
    }

    if (isInstallDismissed()) {
      installButton.hidden = true;
      return;
    }

    showInstallButton();

    installButton.addEventListener("click", async () => {
      if (!deferredInstallPrompt) {
        return;
      }

      deferredInstallPrompt.prompt();

      try {
        const choice = await deferredInstallPrompt.userChoice;

        if (choice.outcome === "accepted") {
          hideInstallButton();
        } else {
          hideInstallButton();
        }
      } catch (error) {
        console.error("SkillrHub install prompt failed:", error);
        hideInstallButton();
      }

      deferredInstallPrompt = null;
    });
  }

  if (document.body) {
    attachInstallButton();
  } else {
    window.addEventListener("DOMContentLoaded", attachInstallButton, { once: true });
  }


  /* =========================================================
     BROWSER SAYS PWA CAN BE INSTALLED
     ========================================================= */

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    deferredInstallPrompt = event;
    showInstallButton();
  });


  /* =========================================================
     APP INSTALLED
     ========================================================= */

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallButton();
  });
})();
