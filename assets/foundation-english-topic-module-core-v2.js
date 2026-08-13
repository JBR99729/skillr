(() => {
  "use strict";

  const data = window.SkillrFoundationEnglishData || {};
  const canonical = window.SkillrFoundationCanonical;
  if (!canonical?.buildCollection) return;

  const coreRoles = {
    "slide-intro": "learning-intention",
    "slide-model": "concept-refresher",
    "slide-application": "guided-example",
    "slide-mastery": "quick-check"
  };

  const learnerAction = (rich) => rich?.studentDoes || `Complete the modelled response and use the example to show: ${String(rich?.check || "the response matches the lesson idea.").replace(/^The learner\s+/i, "")}`;

  function decorate(specs) {
    for (const spec of Object.values(specs || {})) {
      if (spec?.subject !== "English" || spec?.year !== "Foundation") continue;
      const unit = data[spec.code];
      const quickAnswers = Array.isArray(unit?.quickAnswers) ? unit.quickAnswers : [];
      const richElaborations = Array.isArray(unit?.elaborations) ? unit.elaborations : [];
      (spec.elaborations || []).forEach((elaboration) => {
        const rich = richElaborations.find((item) => String(item.label || item.id || "").toUpperCase() === String(elaboration.id || "").toUpperCase());
        if (!rich?.steps?.length) return;
        elaboration.studentDoes = learnerAction(rich);
        const slide = (spec.slides || []).find((candidate) => candidate.elaborationIds?.includes(elaboration.id));
        if (slide?.teacherLayer) slide.teacherLayer.studentDoes = elaboration.studentDoes;
      });
      (spec.masteryItems || []).forEach((item, index) => {
        if (quickAnswers[index]) item.expectedAnswer = quickAnswers[index];
      });
      for (const slide of spec.slides || []) {
        if (coreRoles[slide.id]) slide.coreRole = coreRoles[slide.id];
      }
      const quickCheck = (spec.slides || []).find((slide) => slide.id === "slide-mastery");
      if (!quickCheck) continue;
      quickCheck.title = "60-second Quick Check / Turn and Talk";
      quickCheck.purpose = "Use a short partner check to gather evidence before moving to Practice or Test.";
      quickCheck.display.studentPrompt = "Turn and talk for 60 seconds. Share one answer and the evidence that supports it.";
      quickCheck.teacherLayer.teacherDoes = "Choose one quick check for a 60-second Turn and Talk, then sample two responses without revealing the answer first.";
      quickCheck.teacherLayer.teacherSaysOrAsks = "Show your answer and tell your partner what proves it.";
      quickCheck.teacherLayer.studentDoes = "Respond orally, physically, visually or in writing, then listen to a partner's evidence.";
    }
    return specs;
  }

  // Topic and slide renderers build the collection after this enhancer loads.
  // Wrap that public entry point so every later build receives the same four
  // Foundation English core roles without changing the shared canonical builder.
  const buildCollection = canonical.buildCollection.bind(canonical);
  canonical.buildCollection = (collection = data, config = {}) => decorate(buildCollection(collection, config));

  if (window.SkillrFoundationCanonicalLessons) decorate(window.SkillrFoundationCanonicalLessons);
})();
