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
    },
    "ac9sfu02-p-004": {
      image: "/assets/quiz-visuals/foundation-science/ac9sfu02-paper-shapes.svg",
      imageAlt: "Two equal sheets of paper, one flat and one scrunched into a ball, ready to be dropped from the same height."
    },
    "ac9sfu02-t-003": {
      image: "/assets/quiz-visuals/foundation-science/ac9sfu02-clay-ramp.svg",
      imageAlt: "A blue clay sphere and cube start at the same marked height on two matching ramps."
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
      if (update.question) question.audioPrompt = update.question;
      if (update.explanation) question.structuredExplanation = {
        summary: update.explanation,
        hint: update.hint
      };
      delete question.hint;
      delete question.visual;
    });
  });
})();
