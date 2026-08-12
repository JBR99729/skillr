(() => {
  "use strict";

  const updates = {
    "ac9sfu02-p-003": {
      question: "Look at the toy top. How does it mainly move?",
      explanation: "A spinning top turns around and around its pointed base. This movement is called spinning.",
      answers: ["spins", "slides in a straight line", "bounces", "stays still"],
      correct: 0,
      image: "/assets/quiz-visuals/foundation-science/ac9sfu02-spinning-top.svg",
      imageAlt: "A colourful toy top turning around its pointed base, with curved arrows showing the spinning movement."
    },
    "ac9sfu02-p-015": {
      question: "Which movement word matches the toy top?",
      explanation: "The top turns around a point, so its movement is spinning.",
      answers: ["spinning", "rolling forward", "sliding", "bouncing"],
      correct: 0,
      image: "/assets/quiz-visuals/foundation-science/ac9sfu02-spinning-top.svg",
      imageAlt: "A colourful toy top turning around its pointed base, with curved arrows showing the spinning movement."
    },
    "ac9sfu02-t-005": {
      question: "A flat-faced wooden block is gently released at the top of the ramp. What is most likely to happen?",
      explanation: "The block has a flat face touching the ramp, so it is most likely to slide down rather than roll.",
      answers: [
        "It slides down on its flat face.",
        "It rolls like a ball.",
        "It bounces straight up.",
        "It stays at the top even though the ramp slopes down."
      ],
      correct: 0,
      image: "/assets/quiz-visuals/foundation-science/ac9sfu02-block-on-ramp.svg",
      imageAlt: "A yellow rectangular wooden block resting with a flat face on the upper part of a blue sloping ramp."
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
      delete question.visual;
    });
  });
})();
