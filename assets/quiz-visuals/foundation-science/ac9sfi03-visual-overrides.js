(() => {
  "use strict";
  const updates = {
    "ac9sfi03-p-003": { image: "/assets/quiz-visuals/foundation-science/ac9sfi03-weather-chart.svg", imageAlt: "A chart records sunny weather on Monday and Tuesday and rainy weather on Wednesday." },
    "ac9sfi03-t-006": { image: "/assets/quiz-visuals/foundation-science/ac9sfi03-leaf-picture-graph.svg", imageAlt: "A picture graph has five red leaves and two yellow leaves." }
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
