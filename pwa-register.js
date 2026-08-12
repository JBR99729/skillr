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

  if (!document.querySelector('script[data-skillr-foundation-science-quick-read]')) {
    const scienceQuickReadScript = document.createElement("script");
    scienceQuickReadScript.src = "/assets/foundation-science-practice-quick-read.js?v=1";
    scienceQuickReadScript.dataset.skillrFoundationScienceQuickRead = "true";
    document.head.appendChild(scienceQuickReadScript);
  }

  if (!document.querySelector('script[data-skillr-foundation-science-worksheet]')) {
    const scienceWorksheetScript = document.createElement("script");
    scienceWorksheetScript.src = "/assets/foundation-science-worksheet-page.js?v=1";
    scienceWorksheetScript.dataset.skillrFoundationScienceWorksheet = "true";
    document.head.appendChild(scienceWorksheetScript);
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

  const foundationScienceTopic = /^\/foundation\/science\/ac9s/i.test(window.location.pathname);

  if (foundationScienceTopic && !document.querySelector('script[data-skillr-foundation-science-render]')) {
    const scienceScripts = [
      "/assets/foundation-science-data.js?v=1",
      "/assets/foundation-science-render.js?v=1",
      "/assets/foundation-science-curriculum-scope.js?v=1"
    ];
    const loadScienceScript = (index) => {
      if (index >= scienceScripts.length) return;
      const script = document.createElement("script");
      script.src = scienceScripts[index];
      script.async = false;
      script.dataset.skillrFoundationScienceRender = "true";
      script.addEventListener("load", () => loadScienceScript(index + 1), { once: true });
      document.head.appendChild(script);
    };
    loadScienceScript(0);
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
