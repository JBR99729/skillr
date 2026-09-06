(() => {
  "use strict";
  const updates = {
    "ac9sfi05-p-005": { image: "/assets/quiz-visuals/foundation-science/ac9sfi05-labelled-shadow.svg", imageAlt: "A labelled drawing shows torch, block and shadow." },
    "ac9sfi05-p-023": { image: "/assets/quiz-visuals/foundation-science/ac9sfi05-share-card.svg", imageAlt: "A science share card includes a question, prediction and observation." },
    "ac9sfi05-t-003": { image: "/assets/quiz-visuals/foundation-science/ac9sfi05-share-card.svg", imageAlt: "A labelled science card communicates results clearly." },
    "ac9sfi05-t-008": { image: "/assets/quiz-visuals/foundation-science/ac9sfi05-labelled-shadow.svg", imageAlt: "A labelled shadow diagram helps others understand the observation." }
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
