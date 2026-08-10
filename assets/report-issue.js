"use strict";

/* =========================================================
   Lightweight issue reporting.
   Uses mailto instead of embedded third-party forms so topic
   pages stay fast for SEO and mobile users.
   ========================================================= */

(function initialiseSkillrIssueReporter() {
  const DEFAULT_EMAIL = "skillrhublearning@gmail.com";

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
      "Hi SkillrHub team,",
      "",
      "I found an issue on this page:",
      meta.pageUrl,
      "",
      `Page title: ${meta.pageTitle}`,
      meta.year ? `Year: ${meta.year}` : "",
      meta.subject ? `Subject: ${meta.subject}` : "",
      code ? `Curriculum code: ${code}` : "",
      meta.questionId ? `Question ID: ${meta.questionId}` : "",
      meta.pageType ? `Page type: ${meta.pageType}` : "",
      "",
      "Issue found:",
      "",
      "Suggested correction, if known:",
      "",
      "Thanks."
    ]);

    return `mailto:${meta.supportEmail || DEFAULT_EMAIL}?subject=${subject}&body=${body}`;
  }

  function wireButton(button) {
    button.addEventListener("click", () => {
      const meta = getPageMeta();
      window.location.href = buildMailtoHref(meta);
    });
  }

  function createFloatingButton() {
    const existingFloating = document.querySelector(".floating-learning-links");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "report-issue-button";
    button.textContent = "Report issue";
    button.setAttribute("aria-label", "Report an issue with this SkillrHub page");
    wireButton(button);

    if (existingFloating) {
      existingFloating.appendChild(button);
      return;
    }

    const container = document.createElement("div");
    container.className = "floating-learning-links";
    container.appendChild(button);
    document.body.appendChild(container);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[data-report-issue]");

    if (buttons.length) {
      buttons.forEach(wireButton);
      return;
    }

    createFloatingButton();
  });
}());
