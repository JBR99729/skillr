(() => {
  "use strict";

  const renderer = window.SkillrFoundationV11Renderer;
  if (!renderer?.renderSlides || window.SkillrFoundationEnglishClassroomV2) return;

  const coreHeadings = {
    "learning-intention": "Learning Intention & Success Criteria",
    "concept-refresher": "Concept Refresher & Visual Clues",
    "guided-example": "Worked Example (Guided Instruction)",
    "quick-check": "60-second Quick Check / Turn and Talk"
  };

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"
  })[character]);

  function codeFromPage() {
    const queryCode = new URLSearchParams(location.search).get("code");
    const metaCode = window.skillrPageMeta?.curriculumCode;
    const pathCode = (location.pathname.match(/ac9ef(?:la|le|ly)\d{2}/i) || [""])[0];
    return String(queryCode || metaCode || pathCode || "").toUpperCase();
  }

  function ensureStyles() {
    if (document.querySelector("#foundation-english-classroom-v2-css")) return;
    const style = document.createElement("style");
    style.id = "foundation-english-classroom-v2-css";
    style.textContent = `
      .foundation-english-intention-label{align-self:start;display:inline-flex;padding:4px 8px;border-radius:8px;background:#15345f;color:#fff;font-size:clamp(.58rem,.73vw,.72rem);font-weight:1000;letter-spacing:.05em;text-transform:uppercase}
      .foundation-english-intention-content{display:grid;gap:4px;min-width:0}
      .foundation-english-intention-content>strong{font-size:clamp(.78rem,1.08vw,1.08rem);line-height:1.2}
      .foundation-english-success-label{color:#2457d6;font-size:clamp(.61rem,.76vw,.76rem);font-weight:1000;letter-spacing:.04em;text-transform:uppercase}
      .foundation-english-success-criteria{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 18px;margin:0;padding-left:1.1rem;font-size:clamp(.61rem,.82vw,.82rem);line-height:1.2}
      @media(max-width:720px){.foundation-english-success-criteria{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function decorate(options) {
    const code = codeFromPage();
    const unit = options?.data?.[code];
    const spec = unit?.canonical || (code === "AC9EFLA01" ? window.SkillrAC9EFLA01Lesson : null);
    if (!/^AC9EF/.test(code) || !spec || spec.subject !== "English") return false;
    ensureStyles();

    const slides = [...document.querySelectorAll("[data-fcr-slide],[data-slide-index]")];
    const select = document.querySelector("#fcr-slide-select,#a01-slide-select,#v11-slide-select");
    const optionsList = select ? [...select.options] : [];
    (spec.slides || []).forEach((slide, index) => {
      const role = slide.coreRole || "optional-extension";
      const isCore = slide.sequenceRole === "core";
      const slideElement = slides[index];
      if (slideElement) {
        slideElement.dataset.slideRole = role;
        const heading = slideElement.querySelector(".fcr-slide-head h1,.a01-slide-header h1,.v11-slide-head h1");
        if (heading && coreHeadings[role]) heading.textContent = coreHeadings[role];
        const badge = slideElement.querySelector(".fcr-slide-head .fcr-free,.a01-slide-header .a01-free-badge");
        if (badge) badge.textContent = isCore ? "Core slide" : "Optional extension";
      }
      if (slide.display?.type === "elaboration" && slideElement) {
        const elaboration = (spec.elaborations || []).find((item) => slide.elaborationIds?.includes(item.id));
        const prompt = slideElement.querySelector(".fcr-ask strong,.a01-slide-ask strong,.v11-slide-prompt");
        const answer = slideElement.querySelector(".fcr-answer-text,.a01-check-answer,[data-check-answer]");
        if (prompt && elaboration?.teacherSaysOrAsks) prompt.textContent = elaboration.teacherSaysOrAsks;
        if (answer && elaboration?.workedExample) answer.textContent = elaboration.workedExample;
      }
      const option = optionsList[index];
      if (option) {
        const heading = coreHeadings[role] || option.textContent.replace(/^\s*(?:Core|Optional)\s+\d+\.\s*/i, "").replace(/^\s*\d+\.\s*/, "");
        option.textContent = `${isCore ? "Core" : "Optional"} ${index + 1}. ${heading}`;
      }
    });

    const intentionIndex = (spec.slides || []).findIndex((slide) => slide.coreRole === "learning-intention");
    const intentionSlide = slides[intentionIndex];
    if (intentionSlide) {
      const meaning = intentionSlide.querySelector(".fcr-meaning,.a01-pattern__meaning,.v11-slide-card");
      if (meaning) {
        const learningText = String(spec.learningIntention || "").replace(/^I can\s+/i, "").replace(/[.!?]+$/, "");
        const criteria = (spec.successCriteria || []).slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
        meaning.innerHTML = `<span class="foundation-english-intention-label">Learning intention</span><div class="foundation-english-intention-content"><strong>We are learning to ${escapeHtml(learningText)}.</strong><span class="foundation-english-success-label">Success criteria</span><ul class="foundation-english-success-criteria">${criteria}</ul></div>`;
      }
    }

    const quickIndex = (spec.slides || []).findIndex((slide) => slide.coreRole === "quick-check");
    const quickSlide = slides[quickIndex];
    if (quickSlide) {
      const quickChecks = (spec.masteryItems || []).filter((item) => item.type === "mastery");
      const quickCheck = quickChecks[0] || spec.masteryItems?.[0];
      const meaning = quickSlide.querySelector(".fcr-meaning span:last-child,.a01-pattern__meaning span:last-child,.v11-slide-card p");
      if (meaning) meaning.textContent = "Turn and talk for 60 seconds. Answer this check and share the evidence that supports it.";
      const prompt = quickSlide.querySelector(".fcr-ask strong,.a01-slide-ask strong,.v11-slide-prompt");
      const answer = quickSlide.querySelector(".fcr-answer-text,.a01-check-answer,[data-check-answer]");
      if (prompt && quickCheck?.prompt) prompt.textContent = quickCheck.prompt;
      if (answer && quickCheck?.expectedAnswer) answer.textContent = quickCheck.expectedAnswer;
    }
    document.documentElement.dataset.foundationEnglishCoreSlides = "true";
    return true;
  }

  function decorateTopic(options) {
    const code = codeFromPage();
    const unit = options?.data?.[code];
    const spec = unit?.canonical || (code === "AC9EFLA01" ? window.SkillrAC9EFLA01Lesson : null);
    if (!/^AC9EF/.test(code) || !spec || spec.subject !== "English") return false;
    const cards = [...document.querySelectorAll(".fcr-elaboration-card")];
    (spec.elaborations || []).forEach((elaboration, index) => {
      const card = cards[index];
      if (!card) return;
      const prompt = card.querySelector(".fcr-check>strong");
      const answer = card.querySelector(".fcr-answer__body");
      if (prompt) prompt.textContent = elaboration.teacherSaysOrAsks;
      if (answer) answer.textContent = elaboration.workedExample;
    });
    document.documentElement.dataset.foundationEnglishElaborations = "true";
    return true;
  }

  const renderSlides = renderer.renderSlides.bind(renderer);
  const renderTopic = renderer.renderTopic?.bind(renderer);
  function renderEnglishSlides(options) {
    const result = renderSlides(options);
    decorate(options);
    return result;
  }

  function renderEnglishTopic(options) {
    const result = renderTopic ? renderTopic(options) : false;
    decorateTopic(options);
    return result;
  }

  window.SkillrFoundationV11Renderer = { ...renderer, renderSlides: renderEnglishSlides, renderTopic: renderEnglishTopic };
  if (window.SkillrFoundationClassroomRollout) {
    window.SkillrFoundationClassroomRollout = {
      ...window.SkillrFoundationClassroomRollout,
      renderSlides: renderEnglishSlides,
      renderTopic: renderEnglishTopic
    };
  }
  window.SkillrFoundationEnglishClassroomV2 = { decorate, decorateTopic };
})();
