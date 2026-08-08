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

    try {
      window.localStorage.setItem(installStateKey, "true");
    } catch (error) {
      console.warn("Unable to save install button state", error);
    }
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

    return hasTouch && (mobileUserAgent || window.innerWidth <= 900);
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
      installButton.textContent = "📱 Install SkillrHub";
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
