(() => {
  "use strict";

  if (!document.querySelector('script[data-skillr-display-only]')) {
    const displayOnlyScript = document.createElement("script");
    displayOnlyScript.src = "/assets/display-only.js?v=1";
    displayOnlyScript.dataset.skillrDisplayOnly = "true";
    document.head.appendChild(displayOnlyScript);
  }

  if (!document.querySelector('script[data-skillr-foundation-topic-language]')) {
    const foundationTopicLanguageScript = document.createElement("script");
    foundationTopicLanguageScript.src = "/assets/foundation-topic-language.js?v=1";
    foundationTopicLanguageScript.dataset.skillrFoundationTopicLanguage = "true";
    document.head.appendChild(foundationTopicLanguageScript);
  }

  if (!document.querySelector('script[data-skillr-foundation-professional-ui]')) {
    const professionalUiScript = document.createElement("script");
    professionalUiScript.src = "/assets/foundation-maths-professional-ui.js?v=5";
    professionalUiScript.dataset.skillrFoundationProfessionalUi = "true";
    document.head.appendChild(professionalUiScript);
  }

  if (!document.querySelector('script[data-skillr-foundation-maths-quick-read]')) {
    const mathsQuickReadScript = document.createElement("script");
    mathsQuickReadScript.src = "/assets/foundation-maths-practice-quick-read.js?v=3";
    mathsQuickReadScript.dataset.skillrFoundationMathsQuickRead = "true";
    document.head.appendChild(mathsQuickReadScript);
  }

  if (!document.querySelector('script[data-skillr-foundation-science-prototype-ui]')) {
    const sciencePrototypeScript = document.createElement("script");
    sciencePrototypeScript.src = "/assets/foundation-science-prototype-ui.js?v=2";
    sciencePrototypeScript.dataset.skillrFoundationSciencePrototypeUi = "true";
    document.head.appendChild(sciencePrototypeScript);
  }

  const foundationMathsTopic =
    /^\/foundation\/maths\/ac9mf/i.test(window.location.pathname) &&
    !document.getElementById("teaching-lesson");

  if (foundationMathsTopic && !window.SkillrFoundationMaths) {
    const lessonScripts = [
      "/assets/foundation-maths-data-number.js?v=1",
      "/assets/foundation-maths-data-other.js?v=1",
      "/assets/foundation-maths-render.js?v=1"
    ];

    const loadLessonScript = (index) => {
      if (index >= lessonScripts.length) return;
      const script = document.createElement("script");
      script.src = lessonScripts[index];
      script.async = false;
      script.dataset.skillrFoundationMaths = "true";
      script.addEventListener("load", () => loadLessonScript(index + 1), { once: true });
      document.head.appendChild(script);
    };

    loadLessonScript(0);
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
