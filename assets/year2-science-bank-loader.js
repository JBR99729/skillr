(() => {
  "use strict";
  const config = window.skillrYear2ScienceBankConfig || {};
  const code = String(config.code || "").toUpperCase();
  const bank = String(config.bank || "practice").toLowerCase();

  // Some upgraded Year 2 Science pages publish their authored production bank
  // directly before the shared PWA bootstrap runs. In that case there is no
  // legacy bank-loader config to resolve and the existing live bank must not be
  // replaced by an older generated bank.
  if (!code) return;
  if (code === "AC9S2U01" && Array.isArray(window.quizQuestions) && window.quizQuestions.some((item) => item?.qualitySchema === "production-v2")) return;

  const questions = window.SkillrYear2ScienceBanks?.[code]?.[bank];
  if (!Array.isArray(questions)) {
    throw new Error(`Year 2 Science bank not found: ${code} ${bank}`);
  }
  window.quizQuestions = questions;
  if (bank === "practice") window.skillrPracticeQuestions = questions;
  if (bank === "test") window.skillrTestQuestions = questions;
  if (bank === "quiz") window.skillrQuizQuestions = questions;
})();
