(() => {
  "use strict";

  const api = window.SkillrFoundationEnglishStudentFacing || (window.SkillrFoundationEnglishStudentFacing = { configs: {} });
  api.register = (configs) => Object.assign(api.configs, configs || {});

  const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const letters = ["A", "B", "C"];
  const genericWhyWrong = [
    "It only uses the longest words.",
    "It guesses without using the clue.",
    "It changes the topic instead of using the skill."
  ];

  function item(code, index, question, answers, correct, explanation, stage) {
    const shift = index % 3;
    const rotated = answers.slice(shift).concat(answers.slice(0, shift));
    const rotatedCorrect = (correct - shift + answers.length) % answers.length;
    return {
      id: `${code.toLowerCase()}-p${String(index + 1).padStart(2, "0")}`,
      curriculumCode: code,
      bank: "practice",
      sourceType: "Multiple choice",
      printable: true,
      type: "single",
      stage,
      question: clean(question),
      answers: rotated.map(clean),
      correct: rotatedCorrect,
      explanation: `${letters[rotatedCorrect]} — ${clean(explanation)}`
    };
  }

  api.buildPractice = (code) => {
    code = String(code || "").toUpperCase();
    const cfg = api.configs[code];
    if (!cfg || !Array.isArray(cfg.seeds) || cfg.seeds.length < 10) return null;
    const seeds = cfg.seeds.slice(0, 10);
    const out = [];

    seeds.forEach((s) => out.push(item(code, out.length, s.q, [s.a, s.w1, s.w2], 0, s.why, "recognise")));
    seeds.forEach((s) => out.push(item(code, out.length, `Why is “${s.a}” a good answer here?`, [s.why, genericWhyWrong[0], genericWhyWrong[1]], 0, s.why, "explain")));
    seeds.forEach((s, i) => {
      const next = seeds[(i + 1) % seeds.length];
      out.push(item(code, out.length, `Which choice does NOT show the skill “${cfg.childGoal}”?`, [s.a, next.a, s.w1], 2, `“${s.w1}” does not fit this skill. ${s.why}`, "discriminate"));
    });
    seeds.forEach((s, i) => {
      const next = seeds[(i + 1) % seeds.length];
      out.push(item(code, out.length, `Which pair both show the skill “${cfg.childGoal}”?`, [`${s.a} / ${next.a}`, `${s.w1} / ${next.a}`, `${s.a} / ${next.w1}`], 0, "Both choices use the target skill in a clear example.", "apply"));
    });
    return out;
  };

  api.buildWorksheet = (code) => {
    code = String(code || "").toUpperCase();
    const cfg = api.configs[code];
    if (!cfg || !Array.isArray(cfg.seeds)) return null;
    return {
      title: cfg.worksheetTitle || cfg.shortTitle || cfg.childGoal,
      method: cfg.routine.join(" → "),
      vocabulary: cfg.vocabulary || [],
      questions: cfg.seeds.slice(0, 10).map((s, i) => {
        const options = [s.a, s.w1, s.w2];
        const shift = i % 3;
        const answers = options.slice(shift).concat(options.slice(0, shift));
        return {
          type: "single",
          question: s.q,
          answers,
          answer: s.a,
          reason: s.why,
          summary: s.why,
          hint: cfg.hint || `Think about: ${cfg.routine.join(" → ")}.`,
          vocabulary: (cfg.vocabulary || [])[i % Math.max(1, (cfg.vocabulary || []).length)] || "skill",
          enrichment: i >= 8
        };
      })
    };
  };

  api.applyData = (data, worksheetData) => {
    for (const [code, cfg] of Object.entries(api.configs)) {
      const unit = data?.[code];
      if (unit) {
        unit.subtitle = cfg.childGoal;
        unit.learn = cfg.bigIdea;
        unit.routine = cfg.routine.join(" → ");
        unit.model_title = cfg.modelTitle || "See the skill in action";
        unit.cards = cfg.seeds.slice(0, 3).map((s) => s.a);
        unit.use = cfg.use || cfg.childGoal;
        unit.mix = [cfg.misconception || "Choosing an answer because it sounds familiar", cfg.fix || `Use the routine: ${cfg.routine.join(" → ")}.`];
        unit.quick = cfg.quick || cfg.seeds.slice(0, 4).map((s) => s.q);
        unit.quickAnswers = cfg.seeds.slice(0, 4).map((s) => s.a);
        unit.studentFacing = cfg;
      }
      if (worksheetData) {
        const ws = api.buildWorksheet(code);
        if (ws) worksheetData[code] = Object.assign(worksheetData[code] || {}, ws);
      }
    }
    return data;
  };

  api.enhancePractice = () => {
    const code = String(window.quizConfig?.skillCode || "").toUpperCase();
    if (!/^AC9EF(?:LA|LE|LY)\d{2}$/.test(code) || code === "AC9EFLA01") return false;
    const questions = api.buildPractice(code);
    if (!questions) return false;
    window.skillrPracticeQuestions = questions;
    window.quizQuestions = questions;
    if (window.quizConfig) {
      window.quizConfig.maxQuestions = 40;
      window.quizConfig.shuffleQuestions = false;
      window.quizConfig.questionCycle = false;
    }
    const count = document.getElementById("questionCount");
    if (count) count.textContent = "40";
    document.querySelectorAll(".intro-text, .adsense-learning-support p, .adsense-learning-support li").forEach((node) => {
      node.textContent = node.textContent.replace(/\b8-question\b/gi, "40-question").replace(/\b8 practice questions\b/gi, "40 practice questions").replace(/\bserves 8 practice questions\b/gi, "serves 40 practice questions");
    });
    return true;
  };

  api.enhanceWorksheet = () => {
    const code = String((location.pathname.match(/ac9ef(?:la|le|ly)\d{2}/i) || [""])[0]).toUpperCase();
    if (!code || code === "AC9EFLA01" || !window.SkillrFoundationEnglishWorksheetData) return false;
    const ws = api.buildWorksheet(code);
    if (!ws) return false;
    window.SkillrFoundationEnglishWorksheetData[code] = Object.assign(window.SkillrFoundationEnglishWorksheetData[code] || {}, ws);
    return true;
  };
})();
