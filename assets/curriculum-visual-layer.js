(() => {
  "use strict";

  if (window.__skillrCurriculumVisualLayerLoaded) return;
  window.__skillrCurriculumVisualLayerLoaded = true;

  const path = location.pathname;
  const topicMatch = path.match(/^\/(foundation|year\d+)\/(maths|science|english)\/(ac9[a-z0-9]+)/i);
  const quizMatch = path.match(/^\/quiz\/(grade-k|year-\d+)\/(math|maths|science|english)\/(ac9[a-z0-9]+)\/(practice|test|worksheet)\/?$/i);
  const slideMatch = path.match(/^\/worksheets\/(foundation|year\d+)\/(maths|science|english)\/teacher-slides\/live\.html$/i);
  if (!topicMatch && !quizMatch && !slideMatch) return;

  const normaliseSubject = (value) => value === "math" ? "maths" : String(value || "").toLowerCase();
  const subject = normaliseSubject(topicMatch?.[2] || quizMatch?.[2] || slideMatch?.[2]);
  const code = (topicMatch?.[3] || quizMatch?.[3] || new URLSearchParams(location.search).get("code") || "").toUpperCase();
  const yearToken = topicMatch?.[1]?.toLowerCase() || quizMatch?.[1]?.toLowerCase() || slideMatch?.[1]?.toLowerCase() || "";
  if (!code || !subject) return;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) {
        if (existing.dataset.skillrLoaded === "true") { resolve(); return; }
        existing.addEventListener("load", resolve, {once:true});
        existing.addEventListener("error", reject, {once:true});
        setTimeout(resolve,250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.addEventListener("load",()=>{script.dataset.skillrLoaded="true";resolve();},{once:true});
      script.addEventListener("error",reject,{once:true});
      document.head.appendChild(script);
    });
  }

  function loadSequence(items) {
    return items.reduce((promise,src)=>promise.then(()=>loadScript(src)),Promise.resolve())
      .catch((error)=>console.error("Skillr curriculum route load failed:",error));
  }

  function dataFilesFor(year, subjectName) {
    if (year === 5) {
      if (subjectName === "maths") return [
        "/assets/year5-curriculum-base.js?v=2",
        "/assets/year5-maths-data-n1.js?v=2",
        "/assets/year5-maths-data-n2.js?v=2",
        "/assets/year5-maths-data-am.js?v=2",
        "/assets/year5-maths-data-spstp.js?v=2"
      ];
      if (subjectName === "science") return ["/assets/year5-curriculum-base.js?v=2","/assets/year5-science-data.js?v=2"];
      return [
        "/assets/year5-curriculum-base.js?v=2",
        "/assets/year5-english-data-la.js?v=2",
        "/assets/year5-english-data-le.js?v=2",
        "/assets/year5-english-data-ly1.js?v=2",
        "/assets/year5-english-data-ly2.js?v=2"
      ];
    }
    if (year === 6) {
      if (subjectName === "maths") return [
        "/assets/year6-curriculum-base.js?v=1",
        "/assets/year6-maths-data-n.js?v=1",
        "/assets/year6-maths-data-am.js?v=1",
        "/assets/year6-maths-data-spstp.js?v=1"
      ];
      if (subjectName === "science") return ["/assets/year6-curriculum-base.js?v=1","/assets/year6-science-data.js?v=1"];
      return [
        "/assets/year6-curriculum-base.js?v=1",
        "/assets/year6-english-data-la.js?v=1",
        "/assets/year6-english-data-le.js?v=1",
        "/assets/year6-english-data-ly.js?v=1"
      ];
    }
    return [];
  }

  function loadAdvancedYearAssets() {
    const topicYear = topicMatch ? Number(topicMatch[1].replace("year","")) : null;
    const quizYear = quizMatch && /^year-\d+$/.test(yearToken) ? Number(yearToken.replace("year-","")) : null;
    const year = topicYear || quizYear;
    if (![5,6].includes(year)) return;
    const files = dataFilesFor(year,subject);
    if (!files.length) return;
    const mode = quizMatch?.[4]?.toLowerCase();
    const finalScript = topicMatch
      ? `/assets/year${year}-curriculum-render.js?v=${year === 6 ? 1 : 2}`
      : mode === "worksheet"
        ? `/assets/year${year}-curriculum-worksheet-page.js?v=${year === 6 ? 1 : 2}`
        : `/assets/year${year}-curriculum-quick-read.js?v=${year === 6 ? 1 : 2}`;
    loadSequence([...files,finalScript]);
  }

  loadAdvancedYearAssets();

  if (quizMatch?.[1]?.toLowerCase() === "grade-k" && quizMatch?.[4]?.toLowerCase() === "test" && ![...document.scripts].some((script) => script.src.includes("/assets/foundation-test-quick-read.js"))) {
    loadScript("/assets/foundation-test-quick-read.js?v=1");
  }

  function findUnit() {
    const candidates = Object.keys(window).filter((key) => /^Skillr(?:Foundation|Year\d+).+Data$/.test(key));
    for (const key of candidates) {
      const record = window[key]?.[code];
      if (record) return record;
    }
    return null;
  }

  function ensureStyle() {
    if (document.getElementById("skillr-curriculum-visual-layer-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-curriculum-visual-layer-style";
    style.textContent = `
      .skillr-concept-picture{border:1px solid #cbd9eb;border-radius:14px;background:#f8fbff;padding:7px;overflow:hidden}.skillr-concept-picture .skillr-concept-svg{display:block;width:100%;height:auto;max-height:245px}.skillr-concept-picture__caption{margin:5px 4px 1px!important;color:#52657e;font-size:.8rem;font-weight:750;line-height:1.35}.skillr-concept-picture--slide{margin:0 0 8px;padding:5px}.skillr-concept-picture--slide .skillr-concept-svg{max-height:180px}.skillr-concept-picture--quick{margin:6px 0 8px;padding:5px}.skillr-concept-picture--quick .skillr-concept-svg{max-height:155px}.skillr-concept-picture--worksheet{margin:0 0 9px;padding:5px;break-inside:avoid}.skillr-concept-picture--worksheet .skillr-concept-svg{max-height:165px}.skillr-concept-picture--worksheet .skillr-concept-picture__caption{display:none}@media(max-width:680px){.skillr-concept-picture .skillr-concept-svg{max-height:none}}@media print{.skillr-concept-picture{background:#fff!important;border-color:#9dbcf6!important}.skillr-concept-picture--worksheet .skillr-concept-svg{max-height:145px}}
    `;
    document.head.appendChild(style);
  }

  function caption() {
    if (subject === "science") return "Observe the model. Name the parts, explain the relationship and identify evidence that would test it.";
    if (subject === "english") return "Read the visual from left to right. Explain how the language, structure or multimodal choice shapes meaning.";
    return "Use the model to identify quantities and relationships, then explain why the strategy or property works.";
  }

  function visualHtml(current,modifier) {
    const svg = window.SkillrConceptSvg?.render(current,subject,code);
    if (!svg) return "";
    return `<div class="skillr-concept-picture skillr-concept-picture--${modifier}">${svg}<p class="skillr-concept-picture__caption">${caption()}</p></div>`;
  }

  function applyTopic(current) {
    if (document.querySelector(".curriculum-cluster-visual .skillr-concept-svg") || document.getElementById("skillr-topic-concept-picture")) return true;
    const lesson = document.querySelector("#teaching-lesson .combined-lesson-content");
    if (!lesson) return false;
    const section = document.createElement("section");
    section.className = "lesson-part";
    section.id = "skillr-topic-concept-picture";
    section.innerHTML = `<h3>See the concept</h3>${visualHtml(current,"topic")}`;
    const learn = [...lesson.querySelectorAll(":scope > .lesson-part")].find((part)=>/learn|learning intention/i.test(part.querySelector("h3")?.textContent || ""));
    if (learn?.nextSibling) lesson.insertBefore(section,learn.nextSibling);
    else lesson.insertBefore(section,lesson.firstChild);
    return true;
  }

  function applySlide(current) {
    const root = document.getElementById("slideRoot");
    const activePanel = root?.querySelector(".teacher-slide-panel:not([hidden])") || root;
    const hero = activePanel?.querySelector(".hero, .strand-slide-hero, .cluster-slide-hero");
    if (!root || !hero || document.getElementById("skillr-slide-concept-picture")) return false;
    const visual = document.createElement("div");
    visual.id = "skillr-slide-concept-picture";
    visual.innerHTML = visualHtml(current,"slide");
    hero.insertAdjacentElement("afterend",visual);
    return true;
  }

  function applyQuick(current) {
    const notes = document.querySelector("#startScreen .pre-read-notes");
    if (!notes || document.getElementById("skillr-quick-concept-picture")) return false;
    const visual = document.createElement("div");
    visual.id = "skillr-quick-concept-picture";
    visual.innerHTML = visualHtml(current,"quick");
    const heading = notes.querySelector("h2");
    heading ? heading.insertAdjacentElement("afterend",visual) : notes.prepend(visual);
    return true;
  }

  function applyWorksheet(current) {
    const paper = document.querySelector(".worksheet-core-paper, .worksheet-core, main.worksheet-paper, #worksheetRoot .worksheet-paper");
    if (!paper || document.getElementById("skillr-worksheet-concept-picture")) return false;
    const visual = document.createElement("div");
    visual.id = "skillr-worksheet-concept-picture";
    visual.innerHTML = visualHtml(current,"worksheet");
    const head = paper.querySelector(".worksheet-paper__head");
    head ? head.insertAdjacentElement("afterend",visual) : paper.prepend(visual);
    return true;
  }

  function apply() {
    const current = findUnit();
    if (!current || !window.SkillrConceptSvg) return false;
    ensureStyle();
    if (topicMatch) return applyTopic(current);
    if (slideMatch) return applySlide(current);
    if (quizMatch?.[4]?.toLowerCase() === "worksheet") return applyWorksheet(current);
    return applyQuick(current);
  }

  if (apply()) return;
  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),18000);
})();
