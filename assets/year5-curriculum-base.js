(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const board = (html) => `<div class="y5-board">${html}</div>`;
  const cards = (items) => `<div class="y5-cards">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y5-flow">${(items || []).map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>`;
  const table = (rows) => {
    const cols = Math.max(1, ...(rows || []).map((row) => row.length));
    return `<div class="y5-table" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${(rows || []).flatMap((row) => row.map((cell) => `<span>${esc(cell)}</span>`)).join("")}</div>`;
  };

  function visual(spec = {}) {
    const type = spec.type || "flow";
    const data = spec.data || [];
    if (type === "flow") return flow(data);
    if (type === "cards") return cards(data);
    if (type === "table") return table(data);
    if (type === "compare") return `<div class="y5-compare">${data.map(([title, detail]) => `<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "numberline") {
      const start = Number(spec.start ?? 0), end = Number(spec.end ?? 1), range = Math.max(.00001, end - start);
      return `<div class="y5-numberline"><div class="rail">${(spec.marks || []).map(([value,label]) => `<i style="left:${Math.max(0,Math.min(100,(Number(value)-start)/range*100))}%"><span>${esc(label ?? value)}</span></i>`).join("")}</div><div class="ends"><b>${esc(spec.startLabel ?? start)}</b><b>${esc(spec.endLabel ?? end)}</b></div></div>`;
    }
    if (type === "fraction") {
      return `<div class="y5-fraction-set">${data.map(([parts, shaded, label]) => `<div><div class="bar" style="grid-template-columns:repeat(${parts},1fr)">${Array.from({length:Number(parts)},(_,i)=>`<i class="${i < Number(shaded) ? "on" : ""}"></i>`).join("")}</div><strong>${esc(label)}</strong></div>`).join("")}</div>`;
    }
    if (type === "grid") {
      const rows = Number(spec.rows || 10), cols = Number(spec.cols || 10), on = Number(spec.on || 0);
      return `<div class="y5-grid" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({length:rows*cols},(_,i)=>`<i class="${i < on ? "on" : ""}"></i>`).join("")}</div>${spec.label ? `<p class="answer">${esc(spec.label)}</p>` : ""}`;
    }
    if (type === "array") {
      const rows = Number(spec.rows || 4), cols = Number(spec.cols || 6), split = Number(spec.split || 0);
      return `<div class="y5-array" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({length:rows*cols},(_,i)=>`<i class="${split && i % cols === split ? "split" : ""}"></i>`).join("")}</div>${spec.label ? `<p class="answer">${esc(spec.label)}</p>` : ""}`;
    }
    if (type === "graph") {
      const values = (spec.values || []).map(Number), max = Math.max(1,...values);
      return `<div class="y5-graph">${values.map((value,index)=>`<div><span style="height:${value/max*100}%"><b>${esc(value)}</b></span><small>${esc((spec.labels || [])[index] || "")}</small></div>`).join("")}</div>`;
    }
    if (type === "particles") {
      return `<div class="y5-particles">${data.map(([name, arrangement]) => `<div class="${esc(name).toLowerCase()}"><section>${Array.from({length:18},(_,i)=>`<i style="--x:${(i*37)%93}%;--y:${(i*53)%82}%"></i>`).join("")}</section><strong>${esc(name)}</strong><span>${esc(arrangement)}</span></div>`).join("")}</div>`;
    }
    if (type === "rays") {
      return `<div class="y5-rays"><div class="source">light source</div><div class="ray-lines"><i></i><i></i><i></i></div><div class="object">object</div><div class="shadow">shadow</div>${spec.note ? `<strong>${esc(spec.note)}</strong>` : ""}</div>`;
    }
    if (type === "erosion") {
      return `<div class="y5-erosion">${data.map((item,index)=>`<div><i>${index + 1}</i><strong>${esc(item)}</strong></div>`).join("<b>→</b>")}</div>`;
    }
    if (type === "coordinate") {
      const points = new Map((spec.points || []).map(([x,y,label])=>[`${x}-${y}`,label]));
      return `<div class="y5-coordinate"><div class="labels x">${Array.from({length:6},(_,i)=>`<b>${i}</b>`).join("")}</div><div class="plot">${Array.from({length:36},(_,i)=>{const x=i%6,y=5-Math.floor(i/6);return `<span class="${points.has(`${x}-${y}`)?"point":""}">${esc(points.get(`${x}-${y}`)||"")}</span>`}).join("")}</div></div>`;
    }
    if (type === "transform") return `<div class="y5-transform">${data.map(([name, detail]) => `<div><div class="shape ${esc(name).toLowerCase()}"></div><strong>${esc(name)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "sentence") return `<div class="y5-sentence">${data.map(([label,text])=>`<div><small>${esc(label)}</small><strong>${esc(text)}</strong></div>`).join("")}</div>`;
    if (type === "evidence") return `<div class="y5-evidence">${data.map(([title,detail])=>`<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("<b>→</b>")}</div>`;
    if (type === "sequence") return `<div class="y5-sequence">${data.map(([label, detail],index)=>`<div><i>${index+1}</i><strong>${esc(label)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "net") return `<div class="y5-net"><div class="net-shape">${Array.from({length:6},(_,i)=>`<i class="n${i+1}"></i>`).join("")}</div><b>fold</b><div class="cube"><i></i></div><strong>${esc(spec.label || "net ↔ object")}</strong></div>`;
    return cards(data);
  }

  function autoQuestionSet(spec, subjectName) {
    const terms = (spec.terms || []).slice(0,3);
    const q = spec.questions || {};
    const firstMistake = spec.mistakes?.[0] || ["The main relationship is overlooked", "Return to the model and identify the deciding evidence."];
    return [
      {type:"single",question:q.choice1?.[0] || `Which statement best describes ${spec.title.toLowerCase()}?`,answers:q.choice1?.[1] || [spec.core,"An unrelated statement","A guess without evidence","The opposite relationship"]},
      {type:"fill-blank",question:q.fill1?.[0] || "Complete the key relationship.",template:q.fill1?.[1] || `${spec.keySentence || spec.core} {{blank}}`},
      {type:"single",question:q.choice2?.[0] || `Which example applies ${spec.title.toLowerCase()} correctly?`,answers:q.choice2?.[1] || [spec.correctExample || spec.applyTitle,"An example that changes the rule","An unsupported opinion","A mismatched representation"]},
      {type:"text",question:q.explain || `Explain ${spec.modelTitle.toLowerCase()} using the visual model, precise vocabulary and a check.`},
      {type:"match",question:"Match each term to its meaning or role.",matchLeft:terms.map((item)=>item[0]),matchRight:terms.map((item)=>item[1]).reverse()},
      {type:"fill-blank",question:q.fill2?.[0] || "Complete the application statement.",template:q.fill2?.[1] || `${spec.applySentence || spec.applyNote} {{blank}}`},
      {type:"text",question:q.apply || `Apply ${spec.applyTitle.toLowerCase()} to a new example and justify the response.`},
      {type:"text",question:`A student shows this misconception: “${firstMistake[0]}”. Explain the error and correct it using a model, evidence or counterexample.`},
      {type:"text",question:q.enrichment1 || `Create an original example connecting the model and application. Label important features and verify every condition.`,enrichment:true},
      {type:"text",question:q.enrichment2 || `Compare two possible strategies or explanations for this topic. Evaluate which is stronger and justify the decision.`,enrichment:true}
    ];
  }

  function register(subject, specs, order) {
    const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
    const units = Object.fromEntries(Object.entries(specs).map(([code,spec]) => {
      const modelVisual = visual(spec.modelVisual || {type:"flow",data:spec.model || []});
      const applyVisual = visual(spec.applyVisual || {type:"flow",data:spec.apply || []});
      const activities = (spec.activities || []).map((activity, index) => ({
        title:activity.title || activity[0],
        text:activity.text || activity[1],
        visual_html:visual(activity.visual || {type:index === 0 ? (spec.modelVisual?.type || "flow") : "flow",data:activity.steps || spec.apply || []})
      }));
      const mistakes = spec.mistakes || [["Rule used without meaning","Return to the visual model and explain the relationship."],["One example treated as proof","Test another example or use a general property."],["Answer not checked","Use estimation, evidence, an inverse or a counterexample."]];
      const quick = spec.quick || [`Explain ${spec.modelTitle}.`,`Apply ${spec.applyTitle}.`,`Correct ${mistakes[0][0].toLowerCase()}.`,`Use the key vocabulary accurately.`,`Verify a new example.`];
      const mastery = spec.mastery || ["Represent the concept","Explain the relationship","Apply an efficient strategy","Transfer to a new context","Justify and verify"];
      const worksheet = autoQuestionSet({...spec,mistakes}, subjectName);
      return [code,{
        slug:spec.slug,
        title:spec.title,
        subtitle:spec.subtitle,
        desc:spec.desc,
        routine:spec.routine || (subject === "maths" ? "Represent → Reason → Calculate → Interpret → Verify" : subject === "science" ? "Observe → Model → Investigate → Analyse → Explain → Evaluate" : "Notice → Analyse → Interpret → Apply → Create → Review"),
        learn:spec.learn,
        model_title:spec.modelTitle,
        model_html:board(`${modelVisual}<p>${esc(spec.modelNote)}</p>`),
        apply_title:spec.applyTitle,
        apply_html:board(`${applyVisual}<p>${esc(spec.applyNote)}</p>`),
        hero_visual:board(`${modelVisual}${applyVisual}`),
        quick_visuals:[{label:"Model",html:modelVisual},{label:"Apply",html:applyVisual},{label:"Key terms",html:cards((spec.terms||[]).map((item)=>item[0]))}],
        activities,
        mistakes,
        quick,
        mastery,
        worksheet
      }];
    }));

    const dataKey = `SkillrYear5${subjectName}Data`;
    const orderKey = `SkillrYear5${subjectName}Order`;
    const worksheetKey = `SkillrYear5${subjectName}WorksheetData`;
    window[dataKey] = Object.assign(window[dataKey] || {}, units);
    window[orderKey] = [...new Set([...(window[orderKey] || []), ...order])];
    window[worksheetKey] = Object.assign(window[worksheetKey] || {}, Object.fromEntries(Object.entries(units).map(([code,unit])=>[code,{title:unit.title,questions:unit.worksheet,yearLabel:`Year 5 ${subjectName}`}])));
  }

  window.SkillrYear5Register = register;
})();
