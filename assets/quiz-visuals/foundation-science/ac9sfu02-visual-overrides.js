(() => {
  "use strict";

  const updates = {
    "ac9sfu02-p-003": {
      question: "Look at the toy top. How does it mainly move?",
      explanation: "A spinning top turns around and around its pointed base. This movement is called spinning.",
      hint: "Follow the curved arrows around the toy top.",
      answers: ["slides in a straight line", "bounces", "spins"],
      correct: 2,
      image: "/assets/quiz-visuals/foundation-science/ac9sfu02-spinning-top.svg",
      imageAlt: "A colourful toy top turning around its pointed base, with curved arrows showing the spinning movement."
    }
  };

  const banks = [
    window.skillrPracticeQuestions,
    window.skillrTestQuestions,
    window.skillrExamQuestions,
    window.quizQuestions
  ];
  const visited = new Set();

  banks.forEach((bank) => {
    if (!Array.isArray(bank) || visited.has(bank)) return;
    visited.add(bank);

    bank.forEach((question) => {
      const update = updates[question?.id];
      if (!update) return;
      Object.assign(question, update);
      question.audioPrompt = update.question;
      question.structuredExplanation = {
        summary: update.explanation,
        hint: update.hint
      };
      delete question.hint;
      delete question.visual;
    });
  });
})();
