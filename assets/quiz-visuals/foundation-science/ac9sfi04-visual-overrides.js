(() => {
  "use strict";
  const updates = {
    "ac9sfi04-p-001": { image: "/assets/quiz-visuals/foundation-science/ac9sfi04-prediction-result.svg", imageAlt: "Prediction and observation cards both show ice getting smaller." },
    "ac9sfi04-p-014": { image: "/assets/quiz-visuals/foundation-science/ac9sfi04-chart-compare.svg", imageAlt: "A chart compares a prediction of three snails with an observation of one snail." },
    "ac9sfi04-t-001": { image: "/assets/quiz-visuals/foundation-science/ac9sfi04-prediction-result.svg", imageAlt: "A prediction card and observation card show the same result." },
    "ac9sfi04-t-005": { image: "/assets/quiz-visuals/foundation-science/ac9sfi04-chart-compare.svg", imageAlt: "A chart compares different predicted and observed counts." }
  };
  const banks = [window.skillrPracticeQuestions, window.skillrTestQuestions, window.skillrExamQuestions, window.quizQuestions];
  const visited = new Set();
  banks.forEach((bank) => {
    if (!Array.isArray(bank) || visited.has(bank)) return;
    visited.add(bank);
    bank.forEach((question) => {
      const update = updates[question?.id];
      if (!update) return;
      Object.assign(question, update);
      delete question.visual;
    });
  });
})();
