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

// Hotfix legacy quiz configs whose Review/Retake routes point one directory too high.
// On /practice/ and /test/ pages the review and retake folders are children of the
// current directory, so use review/ and retake/ rather than ../review/ and ../retake/.
if (window.quizConfig && /\/(?:practice|test)\/(?:index\.html)?$/i.test(window.location.pathname)) {
  if (window.quizConfig.reviewUrl === "../review/") window.quizConfig.reviewUrl = "review/";
  if (window.quizConfig.retakeUrl === "../retake/") window.quizConfig.retakeUrl = "retake/";
}

document.write('<script src="/quiz/assets/script-runtime-v115.js?v=20260822-hotfix1"><\/script>');
