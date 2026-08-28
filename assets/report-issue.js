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

  function loadSharedEnhancement(src, dataAttribute) {
    if (!window.skillrPageMeta?.curriculumCode || document.querySelector(`script[${dataAttribute}]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.setAttribute(dataAttribute, "true");
    document.head.appendChild(script);
  }

  function loadCurriculumEnhancements() {
    loadSharedEnhancement("/assets/international-curriculum-seo.js?v=1", "data-skillr-international-alignment");
    loadSharedEnhancement("/assets/curriculum-progression.js?v=1", "data-skillr-curriculum-progression");
    loadSharedEnhancement("/assets/f10-learning-path-links-loader.js?v=1", "data-skillr-learning-path-links");
  }

  function applyTargetedTopicFixes() {
    const meta = window.skillrPageMeta || {};
    if (meta.curriculumCode !== "AC9S5U03") return;

    document.body.dataset.ac9s5u03LayoutFix = "true";

    const layout = document.querySelector(".curriculum-layout");
    if (layout) layout.classList.add("curriculum-layout--single");

    const sidebar = document.querySelector(".curriculum-sidebar");
    if (sidebar) sidebar.hidden = true;

    const actionRow = document.querySelector(".topic-action-row");
    if (actionRow) {
      actionRow.style.gridTemplateColumns = "repeat(auto-fit, minmax(128px, 1fr))";
      actionRow.style.maxWidth = "920px";
    }

    const fixedSlidesHref = "/year5/science/ac9s5u03-sources-of-light-recognise-that-light-travels-in-a-straight/teacher-slides.html";
    document.querySelectorAll('a[href="teacher-slides/"], a[href="./teacher-slides/"], a[href="#teacher-slide"]').forEach((link) => {
      if (/teacher slides/i.test(link.textContent || "")) link.setAttribute("href", fixedSlidesHref);
    });

    if (!document.querySelector("style[data-ac9s5u03-layout-fix]")) {
      const style = document.createElement("style");
      style.dataset.ac9s5u03LayoutFix = "true";
      style.textContent = `
        body[data-ac9s5u03-layout-fix="true"] .curriculum-layout--single {
          grid-template-columns: minmax(0, 1fr);
          width: 100%;
          max-width: 980px;
          margin-inline: auto;
        }
        body[data-ac9s5u03-layout-fix="true"] .curriculum-sidebar[hidden] { display: none !important; }
        body[data-ac9s5u03-layout-fix="true"] .y5-board { overflow-x: auto; }
        body[data-ac9s5u03-layout-fix="true"] .y5-table span {
          background: #fff;
          font-weight: 400;
        }
        body[data-ac9s5u03-layout-fix="true"] .y5-table[style*="repeat(3"] span:nth-child(-n+3) {
          background: #f7faff;
          font-weight: 800;
        }
        @media (max-width: 720px) {
          body[data-ac9s5u03-layout-fix="true"] .topic-action-row {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 430px) {
          body[data-ac9s5u03-layout-fix="true"] .topic-action-row {
            grid-template-columns: 1fr !important;
          }
        }
      `;
      document.head.appendChild(style);
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
    applyTargetedTopicFixes();
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
