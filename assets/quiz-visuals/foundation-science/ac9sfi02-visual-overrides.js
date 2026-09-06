(() => {
  "use strict";
  const updates = {
    "ac9sfi02-p-020": { image: "/assets/quiz-visuals/foundation-science/ac9sfi02-magnifying-seed.svg", imageAlt: "A magnifying glass makes the tiny lines on a seed easier to see." },
    "ac9sfi02-t-012": { image: "/assets/quiz-visuals/foundation-science/ac9sfi02-ramp-safety.svg", imageAlt: "A ball rolls down a ramp inside a marked clear zone while two hands stay behind the safety line." }
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
