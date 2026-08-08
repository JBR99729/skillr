(() => {
  "use strict";

  let deferredInstallPrompt = null;
  let installButton = null;
  let installModal = null;
  let pendingDownloadUrl = null;
  let pendingDownloadTarget = null;


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

  function isStandaloneApp() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  if (isStandaloneApp()) {
    return;
  }

  function hideInstallButton() {
    if (!installButton) {
      return;
    }

    installButton.hidden = true;
  }

  function shouldShowInstallButton() {
    if (isStandaloneApp()) {
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

  function clearPendingDownload() {
    pendingDownloadUrl = null;
    pendingDownloadTarget = null;
  }

  function closeInstallModal() {
    if (!installModal) {
      return;
    }

    installModal.remove();
    installModal = null;
    clearPendingDownload();
  }

  function openDownloadTarget(url, target) {
    if (!url) {
      return;
    }

    if (target === "_blank") {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(url);
  }

  function showInstallModal(downloadUrl, downloadTarget) {
    if (!deferredInstallPrompt || isStandaloneApp()) {
      openDownloadTarget(downloadUrl, downloadTarget);
      return;
    }

    pendingDownloadUrl = downloadUrl;
    pendingDownloadTarget = downloadTarget;

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
        <h3>Install SkillrHub?</h3>
        <p>Would you like to install this app for quicker access? You can still continue to the download if you prefer not to install it.</p>
        <div class="install-confirmation-modal__actions">
          <button type="button" class="install-confirmation-modal__button install-confirmation-modal__button--secondary" data-action="cancel">No</button>
          <button type="button" class="install-confirmation-modal__button install-confirmation-modal__button--primary" data-action="install">Yes</button>
        </div>
      </div>
    `;

    installModal.addEventListener("click", (event) => {
      if (event.target !== installModal) {
        return;
      }

      closeInstallModal();
      openDownloadTarget(pendingDownloadUrl, pendingDownloadTarget);
    });

    installModal.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();

        const action = button.getAttribute("data-action");

        if (action === "cancel") {
          closeInstallModal();
          openDownloadTarget(pendingDownloadUrl, pendingDownloadTarget);
          return;
        }

        if (!deferredInstallPrompt) {
          closeInstallModal();
          openDownloadTarget(pendingDownloadUrl, pendingDownloadTarget);
          return;
        }

        try {
          deferredInstallPrompt.prompt();
          const choice = await deferredInstallPrompt.userChoice;

          if (choice.outcome === "accepted") {
            hideInstallButton();
          } else {
            showInstallButton();
          }
        } catch (error) {
          console.error("SkillrHub install prompt failed:", error);
          showInstallButton();
        }

        deferredInstallPrompt = null;
        closeInstallModal();
        openDownloadTarget(pendingDownloadUrl, pendingDownloadTarget);
      });
    });

    document.body.appendChild(installModal);
    installModal.querySelector("[data-action='cancel']")?.focus();
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

    showInstallButton();

    installButton.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();

        try {
          const choice = await deferredInstallPrompt.userChoice;

          if (choice.outcome === "accepted") {
            hideInstallButton();
          } else {
            showInstallButton();
          }
        } catch (error) {
          console.error("SkillrHub install prompt failed:", error);
          showInstallButton();
        }

        deferredInstallPrompt = null;
        return;
      }

      if (isStandaloneApp()) {
        hideInstallButton();
        return;
      }
    });
  }

  function attachDownloadIntercept() {
    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest("a.download-button, a[download], button.download-button") : null;

      if (!target) {
        return;
      }

      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href) {
        return;
      }

      if (isStandaloneApp() || !deferredInstallPrompt) {
        return;
      }

      event.preventDefault();
      const downloadTarget = target.getAttribute("target") || "";
      showInstallModal(href, downloadTarget);
    });
  }

  function initializePwaUi() {
    attachInstallButton();
    attachDownloadIntercept();
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
    showInstallButton();
  });


  /* =========================================================
     APP INSTALLED
     ========================================================= */

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallButton();
    closeInstallModal();
  });
})();
