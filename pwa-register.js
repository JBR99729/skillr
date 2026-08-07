(() => {
  "use strict";

  if (!("serviceWorker" in navigator)) {
    return;
  }

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
})();
