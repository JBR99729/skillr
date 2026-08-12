(() => {
  "use strict";
  const config = window.skillrYear2ScienceBankConfig || {};
  const code = String(config.code || "").toUpperCase();
  const bank = String(config.bank || "practice").toLowerCase();
  const questions = window.SkillrYear2ScienceBanks?.[code]?.[bank];
  if (!Array.isArray(questions)) {
    throw new Error(`Year 2 Science bank not found: ${code} ${bank}`);
  }
  window.quizQuestions = questions;
  if (bank === "practice") window.skillrPracticeQuestions = questions;
  if (bank === "test") window.skillrTestQuestions = questions;
  if (bank === "quiz") window.skillrQuizQuestions = questions;
})();
