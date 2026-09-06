(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const board = (html) => `<div class="y6-board">${html}</div>`;
  const cards = (items) => `<div class="y6-cards">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y6-flow">${(items || []).map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>`;
  const table = (rows) => {
    const cols = Math.max(1, ...(rows || []).map((row) => row.length));
    return `<div class="y6-table" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${(rows || []).flatMap((row) => row.map((cell) => `<span>${esc(cell)}</span>`)).join("")}</div>`;
  };

  function fractionBars(items) {
    return `<div class="y6-fractions">${(items || []).map(([parts, shaded, label]) => `<div><div class="bar" style="grid-template-columns:repeat(${Number(parts)},1fr)">${Array.from({length:Number(parts)},(_,i)=>`<i class="${i < Number(shaded) ? "on" : ""}"></i>`).join("")}</div><strong>${esc(label)}</strong></div>`).join("")}</div>`;
  }

  function visual(spec = {}) {
    const type = spec.type || "flow";
    const data = spec.data || [];
    if (type === "flow") return flow(data);
    if (type === "cards") return cards(data);
    if (type === "table") return table(data);
    if (type === "compare") return `<div class="y6-compare">${data.map(([title, detail]) => `<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "numberline") {
      const start = Number(spec.start ?? -5), end = Number(spec.end ?? 5), range = Math.max(.000001, end - start);
      return `<div class="y6-numberline"><div class="rail"><i class="zero" style="left:${Math.max(0,Math.min(100,(0-start)/range*100))}%"></i>${(spec.marks || []).map(([value,label]) => `<i class="mark" style="left:${Math.max(0,Math.min(100,(Number(value)-start)/range*100))}%"><span>${esc(label ?? value)}</span></i>`).join("")}</div><div class="ends"><b>${esc(spec.startLabel ?? start)}</b><b>${esc(spec.endLabel ?? end)}</b></div></div>`;
    }
    if (type === "fraction") return fractionBars(data);
    if (type === "grid") {
      const rows = Number(spec.rows || 10), cols = Number(spec.cols || 10), on = Number(spec.on || 0);
      return `<div class="y6-grid" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({length:rows*cols},(_,i)=>`<i class="${i < on ? "on" : ""}"></i>`).join("")}</div>${spec.label ? `<p class="answer">${esc(spec.label)}</p>` : ""}`;
    }
    if (type === "graph") {
      const values = (spec.values || []).map(Number), max = Math.max(1,...values);
      return `<div class="y6-graph">${values.map((value,index)=>`<div><span style="height:${Math.max(3,value/max*100)}%"><b>${esc(value)}</b></span><small>${esc((spec.labels || [])[index] || "")}</small></div>`).join("")}</div>`;
    }
    if (type === "sequence") return `<div class="y6-sequence">${data.map(([label,detail],index)=>`<div><i>${index+1}</i><strong>${esc(label)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "cycle") return `<div class="y6-cycle">${data.map((item,index)=>`<div><i>${index+1}</i><strong>${esc(item)}</strong></div>`).join("")}</div>`;
    if (type === "coordinate") {
      const points = new Map((spec.points || []).map(([x,y,label])=>[`${x}-${y}`,label]));
      const min = Number(spec.min ?? -5), max = Number(spec.max ?? 5), size = max - min + 1;
      return `<div class="y6-coordinate"><div class="plot" style="grid-template-columns:repeat(${size},1fr)">${Array.from({length:size*size},(_,i)=>{const x=min+(i%size),y=max-Math.floor(i/size);return `<span class="${points.has(`${x}-${y}`)?"point":""} ${x===0?"yaxis":""} ${y===0?"xaxis":""}">${esc(points.get(`${x}-${y}`)||"")}</span>`}).join("")}</div><p>x first, then y</p></div>`;
    }
    if (type === "angles") return `<div class="y6-angle-set">${data.map(([degrees,label])=>`<div class="angle"><span></span><i style="transform:rotate(${Number(degrees)}deg)"></i><strong>${esc(label)}</strong><small>${esc(degrees)}°</small></div>`).join("")}</div>`;
    if (type === "cross-section") return `<div class="y6-cross-section"><div class="solid ${esc(spec.shape || "prism")}"><i></i><b></b></div><span>parallel slice</span><div class="section ${esc(spec.section || "rectangle")}"></div><strong>${esc(spec.label || "cross-section matches the base")}</strong></div>`;
    if (type === "tessellation") return `<div class="y6-tessellation">${Array.from({length:24},(_,i)=>`<i class="${i%2?"b":"a"}"></i>`).join("")}</div>${spec.label ? `<p class="answer">${esc(spec.label)}</p>` : ""}`;
    if (type === "circuit") return `<div class="y6-circuit"><div class="cell">cell</div><i class="wire top"></i><div class="switch ${spec.open ? "open" : "closed"}">switch</div><i class="wire right"></i><div class="load">${esc(spec.load || "lamp")}</div><i class="wire bottom"></i><i class="wire left"></i><strong>${esc(spec.label || "closed path transfers energy")}</strong></div>`;
    if (type === "orbit") return `<div class="y6-orbit"><div class="sun">Sun</div>${(spec.orbits || [["Earth",52],["Mars",78]]).map(([name,r],index)=>`<div class="track" style="width:${r*2}px;height:${r*2}px"><i style="transform:rotate(${index*95+35}deg) translateX(${r}px)"><b>${esc(name)}</b></i></div>`).join("")}<p>${esc(spec.label || "planets orbit the Sun; rotation and revolution are different motions")}</p></div>`;
    if (type === "particles") return `<div class="y6-particles">${data.map(([name,description])=>`<div class="${esc(name).toLowerCase()}"><section>${Array.from({length:18},(_,i)=>`<i style="--x:${(i*37)%92}%;--y:${(i*53)%80}%"></i>`).join("")}</section><strong>${esc(name)}</strong><span>${esc(description)}</span></div>`).join("")}</div>`;
    if (type === "habitat") return `<div class="y6-habitat"><div class="sun">light</div><div class="water">water</div><div class="soil">soil</div><div class="plant">plant</div><div class="animal">animal</div><p>${esc(spec.label || "physical conditions influence growth, behaviour and survival")}</p></div>`;
    if (type === "evidence") return `<div class="y6-evidence">${data.map(([title,detail])=>`<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("<b>→</b>")}</div>`;
    if (type === "sentence") return `<div class="y6-sentence">${data.map(([label,text])=>`<div><small>${esc(label)}</small><strong>${esc(text)}</strong></div>`).join("")}</div>`;
    if (type === "scale") return `<div class="y6-scale"><div class="rail">${(spec.items || []).map(([label,p])=>`<i style="left:${Number(p)}%"><span>${esc(label)}</span></i>`).join("")}</div></div>`;
    if (type === "map") return `<div class="y6-map">${data.map(([label,x,y])=>`<span style="left:${Number(x)}%;top:${Number(y)}%">${esc(label)}</span>`).join("")}</div>`;
    return cards(data);
  }

  function choices(correct, distractors = []) {
    return [...new Set([correct, ...distractors, "An unrelated statement", "A claim without evidence"])].slice(0,4);
  }

  function autoQuestions(spec, subjectName) {
    const q = spec.questions || {};
    const terms = (spec.terms || []).slice(0,3);
    const misconception = spec.mistakes?.[0] || ["The key relationship is ignored", "Return to the model and identify the deciding condition."];
    const q1 = q.choice1 || [`Which statement best represents ${spec.title.toLowerCase()}?`, choices(spec.correctStatement || spec.learn, spec.distractors || [])];
    const q3 = q.choice2 || [`Which example applies the concept correctly?`, choices(spec.correctExample || spec.applyTitle, spec.exampleDistractors || [])];
    return [
      {type:"single",question:q1[0],answers:q1[1]},
      {type:"fill-blank",question:(q.fill1 || ["Complete the key relationship.",`${spec.fillSentence || spec.keySentence || spec.learn} {{blank}}`])[0],template:(q.fill1 || ["",`${spec.fillSentence || spec.keySentence || spec.learn} {{blank}}`])[1]},
      {type:"single",question:q3[0],answers:q3[1]},
      {type:"text",question:q.explain || `Explain ${spec.modelTitle.toLowerCase()} using the model, precise ${subjectName === "Maths" ? "mathematical" : subjectName === "Science" ? "scientific" : "language"} vocabulary and an independent check.`},
      {type:"match",question:"Match each term to its meaning or role.",matchLeft:terms.map((item)=>item[0]),matchRight:terms.map((item)=>item[1]).reverse()},
      {type:"fill-blank",question:(q.fill2 || ["Complete the application statement.",`${spec.applySentence || spec.applyNote} {{blank}}`])[0],template:(q.fill2 || ["",`${spec.applySentence || spec.applyNote} {{blank}}`])[1]},
      {type:"text",question:q.apply || `Apply ${spec.applyTitle.toLowerCase()} to a new example, state the important conditions and justify the result.`},
      {type:"text",question:`A student shows this misconception: “${misconception[0]}”. Explain the error and correct it using a model, evidence or counterexample.`},
      {type:"text",question:q.enrichment1 || `Create an original example that connects the main model and application. Label important features and verify every condition.`,enrichment:true},
      {type:"text",question:q.enrichment2 || `Compare two possible strategies or explanations for this topic. Evaluate which is stronger and justify the decision.`,enrichment:true}
    ];
  }

  function register(subject, specs, order) {
    const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
    const units = Object.fromEntries(Object.entries(specs).map(([code,spec]) => {
      const modelVisual = visual(spec.modelVisual || {type:"flow",data:spec.model || []});
      const applyVisual = visual(spec.applyVisual || {type:"flow",data:spec.apply || []});
      const activities = (spec.activities || [
        {title:"Build and annotate the model",text:`Represent ${spec.title.toLowerCase()} and label the important parts, quantities or choices.`,visual:spec.modelVisual || {type:"flow",data:spec.model || []}},
        {title:"Compare and reason",text:"Use the application model to compare two cases, explain the relationship and identify a likely error.",visual:spec.applyVisual || {type:"flow",data:spec.apply || []}},
        {title:"Transfer and verify",text:"Apply the idea in an unfamiliar context and use a second method, evidence source or text feature to check it.",visual:{type:"cards",data:(spec.quick || []).slice(0,4)}}
      ]).map((activity) => ({title:activity.title,text:activity.text,visual_html:visual(activity.visual)}));
      const mistakes = spec.mistakes || [["Rule used without meaning","Return to the model and explain the relationship."],["One example treated as proof","Test a second case or use a general property."],["Answer accepted without checking","Use an estimate, inverse, evidence comparison or rereading."]];
      const quick = spec.quick || [`Explain ${spec.modelTitle}.`,`Apply ${spec.applyTitle}.`,`Correct ${mistakes[0][0].toLowerCase()}.`,`Use the key vocabulary accurately.`,`Verify a new example.`];
      const mastery = spec.mastery || ["Represent or identify the concept","Explain the underlying relationship","Select an appropriate strategy or feature","Apply it in a new context","Justify and verify the response"];
      const worksheet = autoQuestions({...spec,mistakes},subjectName);
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
    const dataKey = `SkillrYear6${subjectName}Data`;
    const orderKey = `SkillrYear6${subjectName}Order`;
    const worksheetKey = `SkillrYear6${subjectName}WorksheetData`;
    window[dataKey] = Object.assign(window[dataKey] || {}, units);
    window[orderKey] = [...new Set([...(window[orderKey] || []), ...order])];
    window[worksheetKey] = Object.assign(window[worksheetKey] || {}, Object.fromEntries(Object.entries(units).map(([code,unit])=>[code,{title:unit.title,questions:unit.worksheet,yearLabel:`Year 6 ${subjectName}`}])));
  }

  window.SkillrYear6Register = register;
})();
