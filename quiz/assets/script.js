"use strict";

// Compatibility bridge for mixed question-bank formats.
// Older pages expose window.quizQuestions directly; newer authored banks may
// expose window.skillrPracticeQuestions or window.skillrTestQuestions instead.
if (!Array.isArray(window.quizQuestions) || window.quizQuestions.length === 0) {
  if (Array.isArray(window.skillrPracticeQuestions) && window.skillrPracticeQuestions.length > 0) {
    window.quizQuestions = window.skillrPracticeQuestions;
  } else if (Array.isArray(window.skillrTestQuestions) && window.skillrTestQuestions.length > 0) {
    window.quizQuestions = window.skillrTestQuestions;
  }
}

document.write('<script src="/quiz/assets/script-runtime-v115.js?v=20260821-compat1"><\/script>');
