"use strict";

/* =========================================================
   Lightweight issue reporting.
   Uses mailto instead of embedded third-party forms so topic
   pages stay fast for SEO and mobile users.
   Also loads shared curriculum enhancements on curriculum
   topic guides, avoiding hundreds of duplicated edits.
   ========================================================= */

(function initialiseSkillrIssueReporter() {
  const DEFAULT_EMAIL = "skillrhublearning@gmail.com";

  function loadSharedEnhancement(src, dataAttribute, requireMeta = true) {
    if ((requireMeta && !window.skillrPageMeta?.curriculumCode) || document.querySelector(`script[${dataAttribute}]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.setAttribute(dataAttribute, "true");
    document.head.appendChild(script);
  }

  function loadCurriculumEnhancements() {
    loadSharedEnhancement("/assets/international-curriculum-seo.js?v=1", "data-skillr-international-alignment");
    loadSharedEnhancement("/assets/curriculum-progression.js?v=1", "data-skillr-curriculum-progression");
    if (/^\/year8\/science\/ac9s8[a-z]\d{2}/i.test(window.location.pathname)) {
      loadSharedEnhancement("/assets/year8-science-related-topics.js?v=1", "data-skillr-year8-related-topics", false);
    }
  }

  function getPageMeta() {
    return {
      pageTitle: document.title || "SkillrHub page",
      pageUrl: window.location.href,
      ...(window.skillrPageMeta || {})
    };
  }

  function encodeLines(lines) {
    return encodeURIComponent(lines.filter(Boolean).join("\n"));
  }

  function buildMailtoHref(meta) {
    const code = meta.curriculumCode || meta.code || "general";
    const pageType = meta.pageType || "page";
    const subject = encodeURIComponent(`SkillrHub issue: ${code} ${pageType}`);
    const body = encodeLines([
      "Hi SkillrHub team,", "", "I found an issue on this page:", meta.pageUrl, "",
      `Page title: ${meta.pageTitle}`,
      meta.year ? `Year: ${meta.year}` : "", meta.subject ? `Subject: ${meta.subject}` : "",
      code ? `Curriculum code: ${code}` : "", meta.questionId ? `Question ID: ${meta.questionId}` : "",
      meta.pageType ? `Page type: ${meta.pageType}` : "", "", "Issue found:", "", "Suggested correction, if known:", "", "Thanks."
    ]);
    return `mailto:${meta.supportEmail || DEFAULT_EMAIL}?subject=${subject}&body=${body}`;
  }

  function createFloatingButton() {
    loadCurriculumEnhancements();
    if (document.querySelector("[data-report-issue], .report-issue-button")) return;
    const existingFloating = document.querySelector(".floating-learning-links");
    const button = document.createElement("button");
    button.type = "button"; button.className = "report-issue-button"; button.dataset.reportIssue = "true";
    button.textContent = "Report issue"; button.setAttribute("aria-label", "Report an issue with this SkillrHub page");
    if (existingFloating) { existingFloating.appendChild(button); return; }
    const container = document.createElement("div"); container.className = "floating-learning-links";
    container.appendChild(button); document.body.appendChild(container);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-report-issue], .report-issue-button");
    if (!button) return;
    window.location.href = buildMailtoHref(getPageMeta());
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", createFloatingButton, {once:true});
  else createFloatingButton();
}());
