(() => {
  "use strict";
  const updates = {
    "ac9sfu01-p-001": { image: "/assets/quiz-visuals/foundation-science/ac9sfu01-plant-parts.svg", imageAlt: "A young plant with broad green leaves, a stem and roots in soil." },
    "ac9sfu01-p-011": { image: "/assets/quiz-visuals/foundation-science/ac9sfu01-leaf-shapes.svg", imageAlt: "One long thin leaf and one broad round leaf shown side by side." }
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
