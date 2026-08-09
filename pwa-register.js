(() => {
  "use strict";

  let deferredInstallPrompt = null;
  let installModal = null;
  let pendingDownloadUrl = null;
  let pendingDownloadTarget = null;
  const ENABLE_INSTALL_DOWNLOAD_INTERCEPT = false;


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

  function isHomePage() {
    const pathname = window.location.pathname;
    return pathname === "/" || pathname === "/index.html";
  }

  if (isStandaloneApp()) {
    return;
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
    if (!deferredInstallPrompt || isStandaloneApp() || isHomePage()) {
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
    installModal.setAttribute("aria-label", "Install Skillr Education");
    installModal.innerHTML = `
      <div class="install-confirmation-modal__dialog">
        <h3>Install Skillr Education?</h3>
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
          await deferredInstallPrompt.userChoice;
        } catch (error) {
          console.error("Skillr Education install prompt failed:", error);
        }

        deferredInstallPrompt = null;
        closeInstallModal();
        openDownloadTarget(pendingDownloadUrl, pendingDownloadTarget);
      });
    });

    document.body.appendChild(installModal);
    installModal.querySelector("[data-action='cancel']")?.focus();
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
    if (ENABLE_INSTALL_DOWNLOAD_INTERCEPT) {
      attachDownloadIntercept();
    }
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
    deferredInstallPrompt = null;
    closeInstallModal();
  });
})();
