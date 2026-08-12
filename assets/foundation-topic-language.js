(() => {
  "use strict";

  if (window.__skillrFoundationTopicLanguageLoaded) return;
  window.__skillrFoundationTopicLanguageLoaded = true;

  const path = window.location.pathname;
  const isFoundationOrYear1Topic = /^\/(foundation|year1)\//i.test(path);
  const year1EnglishPracticeTest = /^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/(practice|test)\/?$/i.test(path);
  const year1EnglishWorksheet = /^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/worksheet\/?$/i.test(path);
  const year1EnglishTopic = /^\/year1\/english\/ac9e1/i.test(path);

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

  if (year1EnglishPracticeTest) {
    loadScript("/assets/year1-english-practice-quick-read.js?v=1", "skillr-year1-english-quick-read");
  }

  if (year1EnglishWorksheet) {
    loadScript("/assets/year1-english-worksheet-page.js?v=1", "skillr-year1-english-worksheet");
  }

  if (year1EnglishTopic) {
    const dataScript = loadScript("/assets/year1-english-data.js?v=1", "skillr-year1-english-data");
    const loadRenderer = () => loadScript("/assets/year1-english-render.js?v=1", "skillr-year1-english-render");
    if (window.SkillrYear1EnglishData) loadRenderer();
    else dataScript?.addEventListener("load", loadRenderer, { once: true });
    setTimeout(() => { if (window.SkillrYear1EnglishData) loadRenderer(); }, 500);
  }

  function cleanHeadings() {
    document.querySelectorAll("h2,h3").forEach((heading) => {
      const text = (heading.textContent || "").trim();
      if (/^(?:⚠️\s*)?fix these$/i.test(text)) {
        heading.textContent = "Common Mix-Ups";
      }
    });
  }

  function removeWeakFallbackCopy() {
    document.querySelectorAll("p").forEach((paragraph) => {
      const text = (paragraph.textContent || "").replace(/\s+/g, " ").trim();
      if (/^If not:\s*return to the concrete\/visual teaching model\.?$/i.test(text)) {
        paragraph.remove();
      }
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
