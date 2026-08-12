(() => {
  "use strict";

  const path = window.location.pathname;
  const foundationMathsPractice = /^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/practice\/?$/i.test(path);
  const foundationSciencePractice = /^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/practice\/?$/i.test(path);
  const foundationScienceWorksheet = /^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/worksheet\/?$/i.test(path);
  const foundationScienceTopic = /^\/foundation\/science\/ac9s/i.test(path);
  const foundationEnglishPractice = /^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/practice\/?$/i.test(path);
  const foundationEnglishWorksheet = /^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/worksheet\/?$/i.test(path);
  const foundationEnglishTopic = /^\/foundation\/english\/ac9ef/i.test(path);
  const year1MathsPracticeTest = /^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/(practice|test)\/?$/i.test(path);
  const year1MathsWorksheet = /^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/worksheet\/?$/i.test(path);
  const year1MathsTopic = /^\/year1\/maths\/ac9m1/i.test(path);
  const year1SciencePracticeTest = /^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/(practice|test)\/?$/i.test(path);
  const year1ScienceWorksheet = /^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/worksheet\/?$/i.test(path);
  const year1ScienceTopic = /^\/year1\/science\/ac9s1/i.test(path);
  const year2MathsPracticeTest = /^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/(practice|test)\/?$/i.test(path);
  const year2MathsWorksheet = /^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/worksheet\/?$/i.test(path);
  const year2MathsTopic = /^\/year2\/maths\/ac9m2/i.test(path);

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

  if (foundationMathsPractice && !document.querySelector('script[data-skillr-foundation-maths-quick-read]')) {
    const mathsQuickReadScript = document.createElement("script");
    mathsQuickReadScript.src = "/assets/foundation-maths-practice-quick-read.js?v=5";
    mathsQuickReadScript.dataset.skillrFoundationMathsQuickRead = "true";
    document.head.appendChild(mathsQuickReadScript);
  }

  if (foundationSciencePractice && !document.querySelector('script[data-skillr-foundation-science-quick-read]')) {
    const scienceQuickReadScript = document.createElement("script");
    scienceQuickReadScript.src = "/assets/foundation-science-practice-quick-read.js?v=4";
    scienceQuickReadScript.dataset.skillrFoundationScienceQuickRead = "true";
    document.head.appendChild(scienceQuickReadScript);
  }

  if (foundationScienceWorksheet && !document.querySelector('script[data-skillr-foundation-science-worksheet]')) {
    const scienceWorksheetScript = document.createElement("script");
    scienceWorksheetScript.src = "/assets/foundation-science-worksheet-page.js?v=2";
    scienceWorksheetScript.dataset.skillrFoundationScienceWorksheet = "true";
    document.head.appendChild(scienceWorksheetScript);
  }

  if (foundationEnglishPractice && !document.querySelector('script[data-skillr-foundation-english-quick-read]')) {
    const englishQuickReadScript = document.createElement("script");
    englishQuickReadScript.src = "/assets/foundation-english-practice-quick-read.js?v=1";
    englishQuickReadScript.dataset.skillrFoundationEnglishQuickRead = "true";
    document.head.appendChild(englishQuickReadScript);
  }

  if (foundationEnglishWorksheet && !document.querySelector('script[data-skillr-foundation-english-worksheet]')) {
    const englishWorksheetScript = document.createElement("script");
    englishWorksheetScript.src = "/assets/foundation-english-worksheet-page.js?v=2";
    englishWorksheetScript.dataset.skillrFoundationEnglishWorksheet = "true";
    document.head.appendChild(englishWorksheetScript);
  }

  if (year1MathsPracticeTest && !document.querySelector('script[data-skillr-year1-maths-quick-read]')) {
    const year1QuickReadScript = document.createElement("script");
    year1QuickReadScript.src = "/assets/year1-maths-practice-quick-read.js?v=2";
    year1QuickReadScript.dataset.skillrYear1MathsQuickRead = "true";
    document.head.appendChild(year1QuickReadScript);
  }

  if (year1MathsWorksheet && !document.querySelector('script[data-skillr-year1-maths-worksheet]')) {
    const year1WorksheetScript = document.createElement("script");
    year1WorksheetScript.src = "/assets/year1-maths-worksheet-page.js?v=2";
    year1WorksheetScript.dataset.skillrYear1MathsWorksheet = "true";
    document.head.appendChild(year1WorksheetScript);
  }

  if (year2MathsPracticeTest && !document.querySelector('script[data-skillr-year2-maths-quick-read]')) {
    const year2QuickReadScript = document.createElement("script");
    year2QuickReadScript.src = "/assets/year2-maths-practice-quick-read.js?v=1";
    year2QuickReadScript.dataset.skillrYear2MathsQuickRead = "true";
    document.head.appendChild(year2QuickReadScript);
  }

  if (year2MathsWorksheet && !document.querySelector('script[data-skillr-year2-maths-worksheet]')) {
    const year2WorksheetScript = document.createElement("script");
    year2WorksheetScript.src = "/assets/year2-maths-worksheet-page.js?v=1";
    year2WorksheetScript.dataset.skillrYear2MathsWorksheet = "true";
    document.head.appendChild(year2WorksheetScript);
  }

  if (year1SciencePracticeTest && !document.querySelector('script[data-skillr-year1-science-quick-read]')) {
    const year1ScienceQuickReadScript = document.createElement("script");
    year1ScienceQuickReadScript.src = "/assets/year1-science-practice-quick-read.js?v=1";
    year1ScienceQuickReadScript.dataset.skillrYear1ScienceQuickRead = "true";
    document.head.appendChild(year1ScienceQuickReadScript);
  }

  if (year1ScienceWorksheet && !document.querySelector('script[data-skillr-year1-science-worksheet]')) {
    const year1ScienceWorksheetScript = document.createElement("script");
    year1ScienceWorksheetScript.src = "/assets/year1-science-worksheet-page.js?v=1";
    year1ScienceWorksheetScript.dataset.skillrYear1ScienceWorksheet = "true";
    document.head.appendChild(year1ScienceWorksheetScript);
  }

  const foundationMathsTopic =
    /^\/foundation\/maths\/ac9mf/i.test(path) &&
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

  if (foundationEnglishTopic && !document.querySelector('script[data-skillr-foundation-english-render]')) {
    const englishScripts = [
      "/assets/foundation-english-data.js?v=1",
      "/assets/foundation-english-render.js?v=1"
    ];
    const loadEnglishScript = (index) => {
      if (index >= englishScripts.length) return;
      const script = document.createElement("script");
      script.src = englishScripts[index];
      script.async = false;
      script.dataset.skillrFoundationEnglishRender = "true";
      script.addEventListener("load", () => loadEnglishScript(index + 1), { once: true });
      document.head.appendChild(script);
    };
    loadEnglishScript(0);
  }

  if (year1MathsTopic && !document.querySelector('script[data-skillr-year1-maths-render]')) {
    const year1MathsScripts = [
      "/assets/year1-maths-data.js?v=1",
      "/assets/year1-maths-render.js?v=1"
    ];
    const loadYear1MathsScript = (index) => {
      if (index >= year1MathsScripts.length) return;
      const script = document.createElement("script");
      script.src = year1MathsScripts[index];
      script.async = false;
      script.dataset.skillrYear1MathsRender = "true";
      script.addEventListener("load", () => loadYear1MathsScript(index + 1), { once: true });
      document.head.appendChild(script);
    };
    loadYear1MathsScript(0);
  }

  if (year2MathsTopic && !document.querySelector('script[data-skillr-year2-maths-render]')) {
    const year2MathsScripts = [
      "/assets/year2-maths-data.js?v=1",
      "/assets/year2-maths-render.js?v=1"
    ];
    const loadYear2MathsScript = (index) => {
      if (index >= year2MathsScripts.length) return;
      const script = document.createElement("script");
      script.src = year2MathsScripts[index];
      script.async = false;
      script.dataset.skillrYear2MathsRender = "true";
      script.addEventListener("load", () => loadYear2MathsScript(index + 1), { once: true });
      document.head.appendChild(script);
    };
    loadYear2MathsScript(0);
  }

  if (year1ScienceTopic && !document.querySelector('script[data-skillr-year1-science-render]')) {
    const year1ScienceScripts = [
      "/assets/year1-science-data.js?v=1",
      "/assets/year1-science-render.js?v=1"
    ];
    const loadYear1ScienceScript = (index) => {
      if (index >= year1ScienceScripts.length) return;
      const script = document.createElement("script");
      script.src = year1ScienceScripts[index];
      script.async = false;
      script.dataset.skillrYear1ScienceRender = "true";
      script.addEventListener("load", () => loadYear1ScienceScript(index + 1), { once: true });
      document.head.appendChild(script);
    };
    loadYear1ScienceScript(0);
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