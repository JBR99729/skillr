(() => {
  "use strict";
  const updates = {
    "ac9sfi01-p-014": { image: "/assets/quiz-visuals/foundation-science/ac9sfi01-shadow-times.svg", imageAlt: "A short shadow beside a post in the morning and a longer shadow beside the same post in the afternoon." },
    "ac9sfi01-p-015": { image: "/assets/quiz-visuals/foundation-science/ac9sfi01-paper-plane-test.svg", imageAlt: "The same paper plane travels a short distance after a gentle throw and farther after a stronger throw." }
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
