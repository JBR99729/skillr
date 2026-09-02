(() => {
  "use strict";

  if (window.__skillrFoundationTopicLanguageLoaded) return;
  window.__skillrFoundationTopicLanguageLoaded = true;

  const path = window.location.pathname;

  if (!document.querySelector('link[href*="/assets/multi-audience-ux.css"]')) {
    const uxStyle = document.createElement("link");
    uxStyle.rel = "stylesheet";
    uxStyle.href = "/assets/multi-audience-ux.css?v=2";
    document.head.appendChild(uxStyle);
  }
  if (!document.querySelector('script[src*="/assets/multi-audience-ux.js"]')) {
    const uxScript = document.createElement("script");
    uxScript.src = "/assets/multi-audience-ux.js?v=1";
    uxScript.async = false;
    document.head.appendChild(uxScript);
  }

  const standardQuiz = /^\/quiz\/(?:grade-k|year-\d+)\/(?:math|science|english)\/[^/]+\/(?:practice|test)\/?$/i.test(path);
  if (standardQuiz && !document.querySelector('script[src*="/quiz/assets/production-question-ui.js"]')) {
    const analyticsBase = "/quiz/assets/learning-analytics.js";
    const analyticsLoaded = [...document.scripts].some((script) => script.src.includes(analyticsBase));
    if (!analyticsLoaded) {
      const analytics = document.createElement("script");
      analytics.src = `${analyticsBase}?v=20260820-ga4-runtime-2`;
      analytics.async = false;
      document.head.appendChild(analytics);
    }
  }

  const isFoundationOrYear1Topic = /^\/(foundation|year1)\//i.test(path);
  const year1EnglishPracticeTest = /^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/(practice|test)\/?$/i.test(path);
  const year1EnglishWorksheet = /^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/worksheet\/?$/i.test(path);

  if (!isFoundationOrYear1Topic && !year1EnglishPracticeTest && !year1EnglishWorksheet) return;

  function loadScript(src, datasetName) {
    const existingByDataset = datasetName ? document.querySelector(`script[data-${datasetName}]`) : null;
    if (existingByDataset) return existingByDataset;
    const existingBySrc = [...document.scripts].find((script) => script.src.includes(src.split("?")[0]));
    if (existingBySrc) return existingBySrc;
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    if (datasetName) script.dataset[datasetName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = "true";
    document.head.appendChild(script);
    return script;
  }

  function withYear1EnglishStudentFacing(callback) {
    const loadOverlay = () => {
      if (window.SkillrYear1EnglishStudentFacing) { callback(); return; }
      const overlay = loadScript("/assets/year1-english-student-facing.js?v=20260902", "skillr-year1-english-student-facing");
      overlay?.addEventListener("load", callback, { once:true });
      setTimeout(() => { if (window.SkillrYear1EnglishStudentFacing) callback(); }, 350);
    };
    if (window.SkillrYear1EnglishData) { loadOverlay(); return; }
    const data = loadScript("/assets/year1-english-data.js?v=2", "skillr-year1-english-data");
    data?.addEventListener("load", loadOverlay, { once:true });
    setTimeout(() => { if (window.SkillrYear1EnglishData) loadOverlay(); }, 350);
  }

  if (year1EnglishPracticeTest) {
    withYear1EnglishStudentFacing(() => loadScript("/assets/year1-english-practice-quick-read.js?v=3", "skillr-year1-english-quick-read"));
  }

  if (year1EnglishWorksheet) {
    withYear1EnglishStudentFacing(() => loadScript("/assets/year1-english-worksheet-page.js?v=3", "skillr-year1-english-worksheet"));
  }

  // Year 1 English Topic Guides are fixed static curriculum pages. Do not load
  // the legacy runtime renderer here; the authored static rebuild owns them.

  function cleanHeadings() {
    document.querySelectorAll("h2,h3").forEach((heading) => {
      const text = (heading.textContent || "").trim();
      if (/^(?:⚠️\s*)?fix these$/i.test(text)) heading.textContent = "Common Mix-Ups";
    });
  }

  function removeWeakFallbackCopy() {
    document.querySelectorAll("p").forEach((paragraph) => {
      const text = (paragraph.textContent || "").replace(/\s+/g, " ").trim();
      if (/^If not:\s*return to the concrete\/visual teaching model\.?$/i.test(text)) paragraph.remove();
    });
  }

  function apply() {
    cleanHeadings();
    removeWeakFallbackCopy();
  }

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 3500);
})();