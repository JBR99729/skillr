(() => {
  "use strict";

  let deferredInstallPrompt = null;


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


  /* =========================================================
     CREATE FLOATING INSTALL BUTTON
     ========================================================= */

  const installButton =
    document.createElement("button");

  installButton.id =
    "installAppButton";

  installButton.className =
    "install-app-fab";

  installButton.type =
    "button";

  installButton.textContent =
    "📱 Install SkillrHub";

  installButton.hidden =
    true;

  document.body.appendChild(
    installButton
  );


  /* =========================================================
     BROWSER SAYS PWA CAN BE INSTALLED
     ========================================================= */

  window.addEventListener(
    "beforeinstallprompt",
    (event) => {

      event.preventDefault();

      deferredInstallPrompt =
        event;

      installButton.hidden =
        false;

    }
  );


  /* =========================================================
     INSTALL BUTTON CLICK
     ========================================================= */

  installButton.addEventListener(
    "click",
    async () => {

      if (!deferredInstallPrompt) {
        return;
      }

      deferredInstallPrompt.prompt();

      try {
        await deferredInstallPrompt.userChoice;
      } catch (error) {
        console.error(
          "SkillrHub install prompt failed:",
          error
        );
      }

      deferredInstallPrompt =
        null;

      installButton.hidden =
        true;

    }
  );


  /* =========================================================
     APP INSTALLED
     ========================================================= */

  window.addEventListener(
    "appinstalled",
    () => {

      deferredInstallPrompt =
        null;

      installButton.hidden =
        true;

    }
  );

})();
