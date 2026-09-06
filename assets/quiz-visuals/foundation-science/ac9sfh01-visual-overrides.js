(() => {
  "use strict";
  const updates = {
    "ac9sfh01-p-001": { image: "/assets/quiz-visuals/foundation-science/ac9sfh01-observation-question.svg", imageAlt: "A leaf with spots leads to a science question." },
    "ac9sfh01-p-004": { image: "/assets/quiz-visuals/foundation-science/ac9sfh01-nature-record.svg", imageAlt: "A three-day plant record shows the plant changing." },
    "ac9sfh01-t-001": { image: "/assets/quiz-visuals/foundation-science/ac9sfh01-observation-question.svg", imageAlt: "A leaf observation card shows spots and a related question." },
    "ac9sfh01-t-006": { image: "/assets/quiz-visuals/foundation-science/ac9sfh01-nature-record.svg", imageAlt: "A repeated plant record shows observations over time." }
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
