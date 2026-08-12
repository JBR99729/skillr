(() => {
  "use strict";

  if (window.__skillrScienceVisualLayerLoaded) return;
  window.__skillrScienceVisualLayerLoaded = true;

  const path = location.pathname;
  const topicMatch = path.match(/^\/(foundation|year\d+)\/science\/(ac9s[a-z0-9]+)/i);
  const quizMatch = path.match(/^\/quiz\/(grade-k|year-\d+)\/science\/(ac9s[a-z0-9]+)\/(practice|test|worksheet)\/?$/i);
  const slideMatch = path.match(/^\/worksheets\/(foundation|year\d+)\/science\/teacher-slides\/live\.html$/i);
  if (!topicMatch && !quizMatch && !slideMatch) return;

  const code = (topicMatch?.[2] || quizMatch?.[2] || new URLSearchParams(location.search).get("code") || "").toUpperCase();
  if (!code) return;

  const sources = () => [
    window.SkillrFoundationScienceData,
    window.SkillrYear1ScienceData,
    window.SkillrYear2ScienceData,
    window.SkillrYear3ScienceData,
    window.SkillrYear4ScienceData
  ];

  function unit() {
    return sources().map((source) => source?.[code]).find(Boolean) || null;
  }

  function ensureStyle() {
    if (document.getElementById("skillr-science-visual-layer-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-science-visual-layer-style";
    style.textContent = `
      .skillr-science-visual{border:1px solid #cbd9eb;border-radius:14px;background:#f8fbff;padding:8px;overflow:hidden}.skillr-science-visual .skillr-concept-svg{display:block;width:100%;height:auto;max-height:245px}.skillr-science-visual__caption{margin:5px 4px 1px!important;color:#52657e;font-size:.82rem;font-weight:750}.skillr-science-topic-visual{margin:2px 0 4px}.skillr-science-slide-visual{margin:0 0 8px;padding:5px}.skillr-science-slide-visual .skillr-concept-svg{max-height:170px}.skillr-science-quick-visual{margin:6px 0 8px;padding:5px}.skillr-science-quick-visual .skillr-concept-svg{max-height:155px}.skillr-science-worksheet-visual{margin:0 0 9px;padding:5px;break-inside:avoid}.skillr-science-worksheet-visual .skillr-concept-svg{max-height:165px}.skillr-science-worksheet-visual .skillr-science-visual__caption{display:none}@media(max-width:680px){.skillr-science-visual .skillr-concept-svg{max-height:none}}@media print{.skillr-science-visual{background:#fff!important;border-color:#9dbcf6!important}.skillr-science-worksheet-visual .skillr-concept-svg{max-height:145px}}
    `;
    document.head.appendChild(style);
  }

  function visualHtml(current, className) {
    const svg = window.SkillrConceptSvg?.render(current, "science", code);
    if (!svg) return "";
    return `<div class="skillr-science-visual ${className}">${svg}<p class="skillr-science-visual__caption">Observe the model. Name the parts, describe the relationship, then explain what evidence would check it.</p></div>`;
  }

  function applyTopic(current) {
    const lesson = document.querySelector("#teaching-lesson .combined-lesson-content");
    if (!lesson || document.getElementById("skillr-science-concept-picture")) return false;
    const section = document.createElement("section");
    section.className = "lesson-part";
    section.id = "skillr-science-concept-picture";
    section.innerHTML = `<h3>See the concept</h3>${visualHtml(current, "skillr-science-topic-visual")}`;
    const parts = [...lesson.querySelectorAll(":scope > .lesson-part")];
    const target = parts.find((part) => /learn|learning intention/i.test(part.querySelector("h3")?.textContent || ""));
    if (target?.nextSibling) lesson.insertBefore(section, target.nextSibling);
    else lesson.insertBefore(section, lesson.firstChild);
    return true;
  }

  function applySlide(current) {
    const root = document.getElementById("slideRoot");
    const hero = root?.querySelector(".hero");
    if (!root || !hero || document.getElementById("skillr-science-slide-picture")) return false;
    const visual = document.createElement("div");
    visual.id = "skillr-science-slide-picture";
    visual.innerHTML = visualHtml(current, "skillr-science-slide-visual");
    hero.insertAdjacentElement("afterend", visual);
    return true;
  }

  function applyQuick(current) {
    const notes = document.querySelector("#startScreen .pre-read-notes");
    if (!notes || document.getElementById("skillr-science-quick-picture")) return false;
    const visual = document.createElement("div");
    visual.id = "skillr-science-quick-picture";
    visual.innerHTML = visualHtml(current, "skillr-science-quick-visual");
    const heading = notes.querySelector("h2");
    heading ? heading.insertAdjacentElement("afterend", visual) : notes.prepend(visual);
    return true;
  }

  function applyWorksheet(current) {
    const paper = document.querySelector(".worksheet-core-paper, .worksheet-core, main.worksheet-paper, #worksheetRoot .worksheet-paper");
    if (!paper || document.getElementById("skillr-science-worksheet-picture")) return false;
    const visual = document.createElement("div");
    visual.id = "skillr-science-worksheet-picture";
    visual.innerHTML = visualHtml(current, "skillr-science-worksheet-visual");
    const head = paper.querySelector(".worksheet-paper__head");
    head ? head.insertAdjacentElement("afterend", visual) : paper.prepend(visual);
    return true;
  }

  function apply() {
    const current = unit();
    if (!current || !window.SkillrConceptSvg) return false;
    ensureStyle();
    if (topicMatch) return applyTopic(current);
    if (slideMatch) return applySlide(current);
    if (quizMatch?.[3]?.toLowerCase() === "worksheet") return applyWorksheet(current);
    return applyQuick(current);
  }

  if (apply()) return;
  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 15000);
})();
