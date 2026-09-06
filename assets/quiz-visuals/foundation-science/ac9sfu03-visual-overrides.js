(() => {
  "use strict";
  const updates = {
    "ac9sfu03-p-003": { image: "/assets/quiz-visuals/foundation-science/ac9sfu03-boot-materials.svg", imageAlt: "A boot with a brown leather top and a dark rubber sole." },
    "ac9sfu03-t-014": { image: "/assets/quiz-visuals/foundation-science/ac9sfu03-see-through-rulers.svg", imageAlt: "The word SUN can be seen through a clear plastic ruler but is hidden by a wooden ruler." }
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
