(() => {
  "use strict";

  if (window.__skillrYear7WorksheetNormalised) return;
  window.__skillrYear7WorksheetNormalised = true;

  const dataKeys = ["SkillrYear7MathsData","SkillrYear7ScienceData","SkillrYear7EnglishData"];

  function insertBlank(template, fallback = "concept") {
    const source = String(template || "").trim();
    if (source.includes("{{blank}}")) return source;
    const words = source.match(/[A-Za-z][A-Za-z'-]{4,}/g) || [];
    const target = words[Math.min(1, Math.max(0, words.length - 1))] || fallback;
    const index = source.toLowerCase().indexOf(String(target).toLowerCase());
    if (index >= 0) return `${source.slice(0,index)}{{blank}}${source.slice(index + target.length)}`;
    return `${source} {{blank}}`;
  }

  for (const key of dataKeys) {
    const units = window[key] || {};
    for (const unit of Object.values(units)) {
      for (const question of unit.worksheet || []) {
        if (question.type === "fill-blank") question.template = insertBlank(question.template, "concept");
        if (question.type === "single") {
          const options = [...new Set((question.answers || []).map((answer) => String(answer)))];
          const fallbacks = ["An unrelated statement","A method that ignores the stated condition","A claim unsupported by the model","The opposite relationship"];
          for (const fallback of fallbacks) if (options.length < 4 && !options.includes(fallback)) options.push(fallback);
          question.answers = options.slice(0,4);
        }
        if (question.type === "match") {
          question.matchLeft = [...new Set((question.matchLeft || []).map(String))];
          question.matchRight = [...new Set((question.matchRight || []).map(String))];
          const size = Math.min(question.matchLeft.length, question.matchRight.length);
          question.matchLeft = question.matchLeft.slice(0,size);
          question.matchRight = question.matchRight.slice(0,size);
        }
      }
    }
  }
})();
