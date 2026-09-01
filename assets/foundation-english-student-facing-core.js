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

  function item(code, index, question, answers, correct, explanation) {
    return {
      id: `${code.toLowerCase()}-p${String(index + 1).padStart(2, "0")}`,
      curriculumCode: code,
      bank: "practice",
      sourceType: "Multiple choice",
      printable: true,
      type: "single",
      question: clean(question),
      answers: answers.map(clean),
      correct,
      explanation: `${letters[correct]} — ${clean(explanation)}`
    };
  }

  api.buildPractice = (code) => {
    const cfg = api.configs[String(code || "").toUpperCase()];
    if (!cfg || !Array.isArray(cfg.seeds) || cfg.seeds.length < 10) return null;
    const seeds = cfg.seeds.slice(0, 10);
    const out = [];

    seeds.forEach((s, i) => {
      out.push(item(code, out.length, s.q, [s.a, s.w1, s.w2], 0, s.why));
    });

    seeds.forEach((s) => {
      out.push(item(
        code,
        out.length,
        `Why is “${s.a}” a good answer here?`,
        [s.why, genericWhyWrong[0], genericWhyWrong[1]],
        0,
        s.why
      ));
    });

    seeds.forEach((s, i) => {
      const next = seeds[(i + 1) % seeds.length];
      out.push(item(
        code,
        out.length,
        `Which choice does NOT show the skill “${cfg.childGoal}”?`,
        [s.a, next.a, s.w1],
        2,
        `“${s.w1}” does not fit this skill. ${s.why}`
      ));
    });

    seeds.forEach((s, i) => {
      const next = seeds[(i + 1) % seeds.length];
      out.push(item(
        code,
        out.length,
        `Which pair both show the skill “${cfg.childGoal}”?`,
        [`${s.a} / ${next.a}`, `${s.w1} / ${next.a}`, `${s.a} / ${next.w1}`],
        0,
        `Both choices use the target skill in a clear example.`
      ));
    });

    return out;
  };

  api.buildWorksheet = (code) => {
    const cfg = api.configs[String(code || "").toUpperCase()];
    if (!cfg || !Array.isArray(cfg.seeds)) return null;
    return {
      title: cfg.worksheetTitle || cfg.shortTitle || cfg.childGoal,
      method: cfg.routine.join(" → "),
      vocabulary: cfg.vocabulary || [],
      questions: cfg.seeds.slice(0, 10).map((s) => ({
        type: "single",
        question: s.q,
        answers: [s.a, s.w1, s.w2],
        answer: s.a,
        reason: s.why,
        hint: cfg.hint || `Think about: ${cfg.routine.join(" → ")}.`,
        vocabulary: (cfg.vocabulary || [])[0] || "skill"
      }))
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
    return true;
  };

  api.enhanceWorksheet = () => {
    const code = String((location.pathname.match(/ac9ef(?:la|le|ly)\d{2}/i) || [""])[0]).toUpperCase();
    if (!code || code === "AC9EFLA01") return false;
    if (!window.SkillrFoundationEnglishWorksheetData) return false;
    const ws = api.buildWorksheet(code);
    if (!ws) return false;
    window.SkillrFoundationEnglishWorksheetData[code] = Object.assign(window.SkillrFoundationEnglishWorksheetData[code] || {}, ws);
    return true;
  };
})();
