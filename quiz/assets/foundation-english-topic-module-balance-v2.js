(() => {
  "use strict";

  const banks = window.SkillrFoundationEnglishWorksheetData || {};
  const normalise = (value) => String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
  const softNormalise = (value) => normalise(value).toLowerCase().replace(/[.!?]+$/g, "");
  const nextPosition = new Map();

  for (const [code, bank] of Object.entries(banks)) {
    for (const question of bank.questions || []) {
      if (question.type !== "single" || !Array.isArray(question.answers) || question.answers.length < 3) continue;
      let correct = question.answers.findIndex((answer) => normalise(answer) === normalise(question.answer));
      if (correct < 0) {
        const candidates = question.answers
          .map((answer, index) => softNormalise(answer) === softNormalise(question.answer) ? index : -1)
          .filter((index) => index >= 0);
        if (candidates.length === 1) [correct] = candidates;
      }
      if (correct < 0) continue;
      const [answer] = question.answers.splice(correct, 1);
      const hasAudioAnswers = Array.isArray(question.audio_answers) && question.audio_answers.length === question.answers.length + 1;
      const audioAnswer = hasAudioAnswers ? question.audio_answers.splice(correct, 1)[0] : null;
      const optionCount = question.answers.length + 1;
      const target = (nextPosition.get(optionCount) || 0) % optionCount;
      question.answers.splice(target, 0, answer);
      if (hasAudioAnswers) question.audio_answers.splice(target, 0, audioAnswer);
      nextPosition.set(optionCount, (nextPosition.get(optionCount) || 0) + 1);
    }
  }

  window.SkillrFoundationEnglishWorksheetBalanced = true;
})();
