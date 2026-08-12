(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const board = (html) => `<div class="y4-subject-board">${html}</div>`;
  const cards = (items) => `<div class="y4-subject-cards">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y4-subject-flow">${(items || []).map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>`;
  const table = (rows) => {
    const cols = Math.max(1, ...(rows || []).map((row) => row.length));
    return `<div class="y4-subject-table" style="grid-template-columns:repeat(${cols},1fr)">${(rows || []).flatMap((row) => row.map((cell) => `<span>${esc(cell)}</span>`)).join("")}</div>`;
  };

  function visual(type, value) {
    if (type === "table") return table(value || []);
    if (type === "cycle") return `<div class="y4-subject-cycle">${(value || []).map((item, index) => `<div><i>${index + 1}</i><strong>${esc(item)}</strong></div>`).join("")}</div>`;
    if (type === "chain") return `<div class="y4-subject-chain">${(value || []).map((item, index) => `<div><strong>${esc(item)}</strong></div>${index < value.length - 1 ? "<b>feeds / causes / connects</b>" : ""}`).join("")}</div>`;
    if (type === "compare") return `<div class="y4-subject-compare">${(value || []).map(([title, detail]) => `<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "sentence") return `<div class="y4-subject-sentence">${(value || []).map(([label, text]) => `<div><small>${esc(label)}</small><strong>${esc(text)}</strong></div>`).join("")}</div>`;
    if (type === "evidence") return `<div class="y4-subject-evidence">${(value || []).map(([title, detail]) => `<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("<b>→</b>")}</div>`;
    return flow(value || []);
  }

  function buildQuestions(spec, subjectName) {
    const terms = spec.terms || [];
    const q = spec.questions;
    const firstMistake = spec.mistakes?.[0] || ["The key relationship is ignored", "Return to the model and use precise evidence."];
    return [
      { type:"single", question:q.choice1[0], answers:q.choice1[1] },
      { type:"fill-blank", question:q.fill1[0], template:q.fill1[1] },
      { type:"single", question:q.choice2[0], answers:q.choice2[1] },
      { type:"text", question:q.explain || `Explain ${spec.modelTitle.toLowerCase()} using the visual model, precise ${subjectName === "Science" ? "scientific" : "language"} vocabulary and evidence.` },
      { type:"match", question:"Match each term to its meaning or role.", matchLeft:terms.slice(0,3).map((item) => item[0]), matchRight:terms.slice(0,3).map((item) => item[1]).reverse() },
      { type:"fill-blank", question:q.fill2[0], template:q.fill2[1] },
      { type:"text", question:q.apply || `Apply ${spec.applyTitle.toLowerCase()} to a new example and explain why the response is appropriate.` },
      { type:"text", question:`A student shows this misconception: “${firstMistake[0]}”. Explain the error and correct it using the topic model or evidence.` },
      { type:"text", question:q.enrichment1 || `Create an original example that connects the main model and application. Label important features and justify every choice.`, enrichment:true },
      { type:"text", question:q.enrichment2 || `Compare two possible explanations or solutions for this topic. Decide which is stronger and justify using evidence, structure or a counterexample.`, enrichment:true }
    ];
  }

  function register(subject, specs, order) {
    const subjectName = subject === "science" ? "Science" : "English";
    const units = Object.fromEntries(Object.entries(specs).map(([code, spec]) => {
      const modelVisual = visual(spec.modelType || "flow", spec.model);
      const applyVisual = visual(spec.applyType || "flow", spec.apply);
      const activities = (spec.activities || []).map((activity, index) => ({
        title:activity[0],
        text:activity[1],
        visual_html:visual(activity[2] || (index === 0 ? spec.modelType : "flow"), activity[3] || (index === 0 ? spec.model : spec.apply))
      }));
      const worksheet = buildQuestions(spec, subjectName);
      return [code, {
        slug:spec.slug,
        title:spec.title,
        subtitle:spec.subtitle,
        desc:spec.desc,
        routine:spec.routine || (subject === "science" ? "Observe → Model → Investigate → Record → Explain → Evaluate" : "Notice → Analyse → Model → Apply → Create → Review"),
        learn:spec.learn,
        model_title:spec.modelTitle,
        model_html:board(`${modelVisual}<p>${esc(spec.modelNote)}</p>`),
        apply_title:spec.applyTitle,
        apply_html:board(`${applyVisual}<p>${esc(spec.applyNote)}</p>`),
        hero_visual:board(`${modelVisual}${applyVisual}`),
        quick_visuals:[
          { label:"Model", html:modelVisual },
          { label:"Apply", html:applyVisual },
          { label:"Key vocabulary", html:cards((spec.terms || []).map((item) => item[0])) }
        ],
        activities,
        mistakes:spec.mistakes,
        quick:spec.quick,
        mastery:spec.mastery,
        worksheet
      }];
    }));

    const dataKey = `SkillrYear4${subjectName}Data`;
    const orderKey = `SkillrYear4${subjectName}Order`;
    const worksheetKey = `SkillrYear4${subjectName}WorksheetData`;
    window[dataKey] = Object.assign(window[dataKey] || {}, units);
    window[orderKey] = [...new Set([...(window[orderKey] || []), ...order])];
    window[worksheetKey] = Object.assign(window[worksheetKey] || {}, Object.fromEntries(Object.entries(units).map(([code, unit]) => [code, { title:unit.title, questions:unit.worksheet, yearLabel:`Year 4 ${subjectName}` }])));
  }

  window.SkillrYear4SubjectRegister = register;
})();
