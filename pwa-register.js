(() => {
  "use strict";

  let deferredInstallPrompt = null;
  let installButton = null;
  let installBanner = null;


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

  function hideInstallButton() {
    if (!installButton) {
      return;
    }

    installButton.hidden = true;
  }

  function showInstallBanner() {
    if (!installBanner) {
      return;
    }

    installBanner.hidden = false;
  }

  function hideInstallBanner() {
    if (!installBanner) {
      return;
    }

    installBanner.hidden = true;
  }

  function shouldShowInstallButton() {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      return false;
    }

    const isQuizAttemptPage = window.location.pathname.includes("/quiz/") || window.location.pathname.includes("/quiz") || document.body?.dataset?.quizPage === "true";
    return isQuizAttemptPage;
  }

  function showInstallButton() {
    if (!installButton) {
      return;
    }

    installButton.hidden = !shouldShowInstallButton();
  }

  function attachInstallButton() {
    if (!document.body) {
      return;
    }

    if (!installButton) {
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
              <path d="M12 4a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L11 15.586V5a1 1 0 0 1 1-1Zm-8 14a1 1 0 0 1 1 1v1h14v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1Z"/>
            </svg>
          </span>
        `;
        installButton.hidden = true;
        document.body.appendChild(installButton);
      }
    }

    if (!installBanner) {
      installBanner = document.getElementById("installAppBanner");

      if (!installBanner) {
        installBanner = document.createElement("div");
        installBanner.id = "installAppBanner";
        installBanner.className = "install-app-banner";
        installBanner.hidden = true;
        installBanner.innerHTML = `
          <strong>Install this app</strong>
          <span>Open your browser menu and choose Install app, Add to Home Screen, or Share → Add to Home Screen.</span>
        `;
        document.body.appendChild(installBanner);
      }
    }

    showInstallButton();
    showInstallBanner();

    installButton.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();

        try {
          const choice = await deferredInstallPrompt.userChoice;

          if (choice.outcome === "accepted") {
            hideInstallButton();
            hideInstallBanner();
          } else {
            showInstallButton();
            showInstallBanner();
          }
        } catch (error) {
          console.error("SkillrHub install prompt failed:", error);
          showInstallButton();
          showInstallBanner();
        }

        deferredInstallPrompt = null;
        return;
      }

      if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
        hideInstallButton();
        return;
      }

      showInstallBanner();
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
    showInstallBanner();
  });


  /* =========================================================
     APP INSTALLED
     ========================================================= */

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallButton();
    hideInstallBanner();
  });
})();
