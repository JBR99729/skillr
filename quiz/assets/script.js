"use strict";

const foundationEnglishPractice = /\/quiz\/grade-k\/english\/ac9ef(?:la|le|ly)\d{2}\/practice\/?(?:index\.html)?$/i.test(window.location.pathname);

if (foundationEnglishPractice) {
  document.write('<script src="/assets/foundation-english-student-facing-core.js?v=20260902"><\/script>');
  document.write('<script src="/assets/foundation-english-student-facing-la.js?v=20260902"><\/script>');
  document.write('<script src="/assets/foundation-english-student-facing-le.js?v=20260902"><\/script>');
  document.write('<script src="/assets/foundation-english-student-facing-ly1.js?v=20260902"><\/script>');
  document.write('<script src="/assets/foundation-english-student-facing-ly2.js?v=20260902"><\/script>');
  document.write('<script>window.SkillrFoundationEnglishStudentFacing?.enhancePractice();<\/script>');
} else if (!Array.isArray(window.quizQuestions) || window.quizQuestions.length === 0) {
  if (Array.isArray(window.skillrPracticeQuestions) && window.skillrPracticeQuestions.length > 0) {
    window.quizQuestions = window.skillrPracticeQuestions;
  } else if (Array.isArray(window.skillrTestQuestions) && window.skillrTestQuestions.length > 0) {
    window.quizQuestions = window.skillrTestQuestions;
  }
}

// Store Review/Retake as absolute activity paths. Result pages live one level
// deeper under /result/, so relative values such as review/ and retake/ would
// otherwise resolve to /result/review/ and /result/retake/.
if (window.quizConfig && /\/(?:practice|test)(?:\/index\.html|\/?)$/i.test(window.location.pathname)) {
  const activityPath = window.location.pathname
    .replace(/index\.html$/i, "")
    .replace(/\/?$/, "/");
  window.quizConfig.reviewUrl = `${activityPath}review/`;
  window.quizConfig.retakeUrl = `${activityPath}retake/`;
}

document.write('<script src="/quiz/assets/script-runtime-v115.js?v=20260905-foundation-visual-prompts"><\/script>');
