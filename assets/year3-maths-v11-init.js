(() => {
  "use strict";
  const start = () => {
    const renderer = window.SkillrYear3MathsV11Renderer;
    const data = window.SkillrYear3MathsData || {};
    const order = window.SkillrYear3MathsOrder || [];
    if (!renderer || !Object.keys(data).length) return;
    const config = { yearLabel: "Year 3", subject: "Mathematics", pathSegment: "maths", quizSubject: "math" };
    if (/\/teacher-slides\/live\.html$/.test(location.pathname)) renderer.renderSlides({ data, order, config });
    else if (/\/year3\/maths\//.test(location.pathname)) renderer.renderTopic({ data, order, config });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
