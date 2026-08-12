(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[char]));
  const board = (html) => `<div class="y7-board">${html}</div>`;
  const cards = (items) => `<div class="y7-cards">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y7-flow">${(items || []).map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>`;
  const table = (rows) => {
    const cols = Math.max(1, ...(rows || []).map((row) => row.length));
    return `<div class="y7-table" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${(rows || []).flatMap((row) => row.map((cell) => `<span>${esc(cell)}</span>`)).join("")}</div>`;
  };

  function visual(spec = {}) {
    const type = spec.type || "flow";
    const data = spec.data || [];
    if (type === "flow") return flow(data);
    if (type === "cards") return cards(data);
    if (type === "table") return table(data);
    if (type === "compare") return `<div class="y7-compare">${data.map(([title, detail]) => `<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "numberline") {
      const start = Number(spec.start ?? -5), end = Number(spec.end ?? 5), range = Math.max(.00001, end - start);
      return `<div class="y7-numberline"><div class="rail">${(spec.marks || []).map(([value,label]) => `<i style="left:${Math.max(0,Math.min(100,(Number(value)-start)/range*100))}%"><span>${esc(label ?? value)}</span></i>`).join("")}</div><div class="ends"><b>${esc(spec.startLabel ?? start)}</b><b>${esc(spec.endLabel ?? end)}</b></div></div>`;
    }
    if (type === "square-array") {
      const n = Number(spec.n || 6);
      return `<div class="y7-square-array" style="grid-template-columns:repeat(${n},1fr)">${Array.from({length:n*n},()=>"<i></i>").join("")}</div><p class="y7-answer">${n}² = ${n*n} and √${n*n} = ${n}</p>`;
    }
    if (type === "factor-tree") {
      return `<div class="y7-factor-tree"><div class="root">${esc(spec.root || 360)}</div><div class="level"><span>${esc(spec.left || 36)}</span><span>${esc(spec.right || 10)}</span></div><div class="leaves">${(spec.leaves || [2,2,3,3,2,5]).map((item)=>`<i>${esc(item)}</i>`).join("")}</div><strong>${esc(spec.result || "360 = 2³ × 3² × 5")}</strong></div>`;
    }
    if (type === "fraction") return `<div class="y7-fractions">${data.map(([parts, shaded, label]) => `<div><div class="bar" style="grid-template-columns:repeat(${parts},1fr)">${Array.from({length:Number(parts)},(_,i)=>`<i class="${i < Number(shaded) ? "on" : ""}"></i>`).join("")}</div><strong>${esc(label)}</strong></div>`).join("")}</div>`;
    if (type === "ratio") return `<div class="y7-ratio">${data.map(([label,count,kind])=>`<div><strong>${esc(label)}</strong><span>${Array.from({length:Number(count)},()=>`<i class="${esc(kind||"")}"></i>`).join("")}</span></div>`).join("")}</div>`;
    if (type === "balance") return `<div class="y7-balance"><div>${esc(spec.left || "3x + 5")}</div><b>⚖</b><div>${esc(spec.right || "26")}</div><p>${esc(spec.note || "perform the same operation on both sides")}</p></div>`;
    if (type === "graph") {
      const values = (spec.values || []).map(Number), max = Math.max(1,...values);
      return `<div class="y7-graph">${values.map((value,index)=>`<div><span style="height:${value/max*100}%"><b>${esc(value)}</b></span><small>${esc((spec.labels || [])[index] || "")}</small></div>`).join("")}</div>`;
    }
    if (type === "line-graph") {
      const values = (spec.values || [2,4,7,9,12]).map(Number), max = Math.max(1,...values), min = Math.min(...values);
      const points = values.map((v,i)=>`${10+i*(80/Math.max(1,values.length-1))},${85-(v-min)/(Math.max(1,max-min))*70}`).join(" ");
      return `<svg class="y7-line-graph" viewBox="0 0 100 100" role="img" aria-label="Line graph"><line x1="8" y1="88" x2="95" y2="88"/><line x1="8" y1="8" x2="8" y2="88"/><polyline points="${points}"/><g>${values.map((v,i)=>`<circle cx="${10+i*(80/Math.max(1,values.length-1))}" cy="${85-(v-min)/(Math.max(1,max-min))*70}" r="2.5"/><text x="${10+i*(80/Math.max(1,values.length-1))}" y="97">${esc((spec.labels||[])[i]||i)}</text>`).join("")}</g></svg>`;
    }
    if (type === "area") return `<div class="y7-area"><div class="parallelogram"><i></i></div><div class="triangle"></div><p>${esc(spec.label || "triangle area = ½ × base × perpendicular height")}</p></div>`;
    if (type === "prism") return `<div class="y7-prism"><div class="solid"></div><div class="formula">${esc(spec.formula || "V = area of cross-section × length")}</div><p>${esc(spec.label || "right prism")}</p></div>`;
    if (type === "circle") return `<div class="y7-circle"><div><i class="radius"></i><i class="diameter"></i><span>r</span><b>d = 2r</b></div><p>${esc(spec.label || "circumference ≈ π × diameter")}</p></div>`;
    if (type === "parallel") return `<div class="y7-parallel"><i class="p1"></i><i class="p2"></i><i class="t"></i><span class="a">a</span><span class="b">b</span><span class="c">c</span><p>${esc(spec.label || "corresponding equal • alternate equal • co-interior sum 180°")}</p></div>`;
    if (type === "polygon") return `<div class="y7-polygons">${data.map(([name,detail,sides])=>`<div><i style="--s:${Number(sides||4)}"></i><strong>${esc(name)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "coordinate") {
      const size = Number(spec.size || 9), half = Math.floor(size/2), points = new Map((spec.points || []).map(([x,y,label])=>[`${x}-${y}`,label]));
      return `<div class="y7-coordinate"><div class="plot" style="grid-template-columns:repeat(${size},1fr)">${Array.from({length:size*size},(_,i)=>{const x=i%size-half,y=half-Math.floor(i/size);const axis=x===0||y===0;return `<span class="${axis?"axis":""} ${points.has(`${x}-${y}`)?"point":""}">${esc(points.get(`${x}-${y}`)||"")}</span>`}).join("")}</div><p>x-coordinate first • y-coordinate second</p></div>`;
    }
    if (type === "transform") return `<div class="y7-transform">${data.map(([name,detail])=>`<div><i class="${esc(name).toLowerCase()}"></i><strong>${esc(name)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    if (type === "stemleaf") return `<div class="y7-stemleaf"><div class="key">Key: ${esc(spec.key || "4 | 7 = 47")}</div>${(spec.rows || [[3,"2 5 8"],[4,"1 3 3 7 9"],[5,"0 4 6"]]).map(([stem,leaf])=>`<div><b>${esc(stem)}</b><span>${esc(leaf)}</span></div>`).join("")}</div>`;
    if (type === "chance") return `<div class="y7-chance"><div class="scale"><span>0 impossible</span><span>½ even chance</span><span>1 certain</span></div><div class="events">${data.map(([label,p])=>`<i style="left:${Number(p)*100}%"><b>${esc(label)}</b></i>`).join("")}</div></div>`;
    if (type === "taxonomy") return `<div class="y7-taxonomy"><div class="root">living things</div>${data.map(([group,items])=>`<section><strong>${esc(group)}</strong>${(items||[]).map(item=>`<span>${esc(item)}</span>`).join("")}</section>`).join("")}</div>`;
    if (type === "foodweb") return `<div class="y7-foodweb"><div class="sun">Sun</div>${data.map(([name,role,x,y])=>`<div class="node ${esc(role)}" style="left:${x}%;top:${y}%"><strong>${esc(name)}</strong><span>${esc(role)}</span></div>`).join("")}<p>arrows show matter and energy transfer from food to consumer</p></div>`;
    if (type === "celestial") return `<div class="y7-celestial"><div class="sun">Sun</div><div class="earth"><i>Moon</i></div><div class="orbit"></div><p>${esc(spec.label || "relative positions explain phases, eclipses and tides")}</p></div>`;
    if (type === "forces") return `<div class="y7-forces"><div class="object">object</div>${(spec.arrows || [["right",60,"push"],["left",35,"friction"]]).map(([dir,size,label])=>`<i class="${esc(dir)}" style="--w:${Number(size)}px"><span>${esc(label)}</span></i>`).join("")}<p>${esc(spec.label || "balanced forces: no change in motion • unbalanced forces: acceleration")}</p></div>`;
    if (type === "particles") return `<div class="y7-particles">${data.map(([name,arrangement])=>`<div class="${esc(name).toLowerCase()}"><section>${Array.from({length:20},(_,i)=>`<i style="--x:${(i*37)%91}%;--y:${(i*53)%82}%"></i>`).join("")}</section><strong>${esc(name)}</strong><span>${esc(arrangement)}</span></div>`).join("")}</div>`;
    if (type === "mixture") return `<div class="y7-mixture"><div class="sample">${(spec.parts || ["A","B","B","C","A","B"]).map(x=>`<i>${esc(x)}</i>`).join("")}</div><b>separate by property</b><div class="methods">${(spec.methods || ["filtration","evaporation","magnetism","distillation"]).map(x=>`<span>${esc(x)}</span>`).join("")}</div></div>`;
    if (type === "evidence") return `<div class="y7-evidence">${data.map(([title,detail])=>`<div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div>`).join("<b>→</b>")}</div>`;
    if (type === "sentence") return `<div class="y7-sentence">${data.map(([label,text])=>`<div><small>${esc(label)}</small><strong>${esc(text)}</strong></div>`).join("")}</div>`;
    if (type === "sequence") return `<div class="y7-sequence">${data.map(([label,detail],index)=>`<div><i>${index+1}</i><strong>${esc(label)}</strong><span>${esc(detail)}</span></div>`).join("")}</div>`;
    return cards(data);
  }

  function defaultTerms(subject, spec) {
    if (Array.isArray(spec.terms) && spec.terms.length >= 3) return spec.terms;
    if (subject === "maths") return [["representation","model showing the mathematical relationship"],["strategy","chosen process used to solve or compare"],["verification","independent check using another method"]];
    if (subject === "science") return [["evidence","relevant observation or measurement"],["model","simplified representation used to explain"],["variable","factor changed, measured or controlled"]];
    return [["feature","language, structural or visual choice"],["evidence","specific detail supporting an interpretation"],["effect","contribution to meaning, purpose or audience response"]];
  }

  function uniqueOptions(correct, alternatives) {
    return [...new Set([correct, ...(alternatives || [])])].slice(0,4);
  }

  function blankDefinition(text, fallback = "concept") {
    const words = String(text || "").split(/\s+/).filter((word) => word.length >= 5);
    const target = words[Math.min(1, Math.max(0, words.length - 1))] || fallback;
    return String(text || "").replace(new RegExp(`\\b${target.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"i"),"{{blank}}");
  }

  function questionSet(spec, subject) {
    if (Array.isArray(spec.worksheet) && spec.worksheet.length === 10) return spec.worksheet;
    const terms = defaultTerms(subject, spec).slice(0,3);
    const wrong = subject === "maths"
      ? ["A method that ignores a required condition","An unsupported guess","The opposite relationship"]
      : subject === "science"
        ? ["A claim with no relevant evidence","A method changing several variables at once","A conclusion beyond the data"]
        : ["A feature named without evidence","An unrelated personal preference","A claim that ignores audience and context"];
    const mistake = spec.mistakes?.[0] || ["The central relationship is overlooked","Return to the model and identify the deciding evidence."];
    return [
      {type:"single",question:`Which statement best defines ${terms[0][0]} in this topic?`,answers:uniqueOptions(terms[0][1],[terms[1][1],terms[2][1],wrong[0]])},
      {type:"fill-blank",question:`Complete the definition of ${terms[1][0]}.`,template:blankDefinition(terms[1][1],terms[1][0])},
      {type:"single",question:`Which statement best applies ${spec.title.toLowerCase()}?`,answers:uniqueOptions(spec.correctExample || spec.applyNote || spec.core,[...wrong])},
      {type:"text",question:`Explain ${spec.modelTitle.toLowerCase()} using the visual model, precise vocabulary and a justified check.`},
      {type:"match",question:"Match each term to its meaning or role.",matchLeft:terms.map((item)=>item[0]),matchRight:terms.map((item)=>item[1]).reverse()},
      {type:"fill-blank",question:"Complete the central idea.",template:spec.fillTemplate || `${spec.core || spec.learn} {{blank}}`},
      {type:"text",question:`Apply ${spec.applyTitle.toLowerCase()} to a new example and explain the decision or interpretation.`},
      {type:"text",question:`A student shows this misconception: “${mistake[0]}”. Explain the error and correct it using a model, evidence or counterexample.`},
      {type:"text",question:spec.enrichment1 || "Create an original example that connects every major concept in this code. Label important conditions and verify the result or interpretation.",enrichment:true},
      {type:"text",question:spec.enrichment2 || "Compare two possible strategies, explanations or representations. Evaluate which is stronger for a stated purpose and justify the judgement.",enrichment:true}
    ];
  }

  function register(subject, specs, order) {
    const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
    const units = Object.fromEntries(Object.entries(specs).map(([code,spec]) => {
      const terms = defaultTerms(subject,spec);
      const modelVisual = visual(spec.modelVisual || {type:"flow",data:spec.model || []});
      const applyVisual = visual(spec.applyVisual || {type:"compare",data:spec.apply || []});
      const mistakes = spec.mistakes || [["One example is treated as the complete rule","Test another example and explain the general relationship."],["Representation is copied without interpretation","Connect every label or feature to meaning."],["Answer is not checked","Use an independent method, evidence source or counterexample."]];
      const quick = spec.quick || [`Explain ${spec.modelTitle}.`,`Apply ${spec.applyTitle}.`,`Correct ${mistakes[0][0].toLowerCase()}.`,`Use ${terms[0][0]} accurately.`,`Verify a new example.`];
      const mastery = spec.mastery || (subject === "maths"
        ? ["Represent the relationship","Select an efficient strategy","Calculate or compare accurately","Interpret the context","Verify and justify"]
        : subject === "science"
          ? ["Identify system components","Use a model to explain","Collect or interpret evidence","Apply to a new condition","Evaluate limitations"]
          : ["Identify relevant features","Use precise textual evidence","Explain contextual effects","Apply for audience and purpose","Review and revise"]);
      const activities = (spec.activities || [
        {title:"Build and annotate",text:`Represent ${spec.title.toLowerCase()} and label every important part or relationship.`,visual:spec.modelVisual},
        {title:"Compare and reason",text:"Use a second representation, example or evidence set and explain what changes and what remains invariant.",visual:spec.applyVisual},
        {title:"Transfer and verify",text:"Apply the concept in an unfamiliar context and verify the response independently.",visual:{type:"cards",data:quick.slice(0,4)}}
      ]).map((activity,index)=>({
        title:activity.title || activity[0],
        text:activity.text || activity[1],
        visual_html:visual(activity.visual || {type:index===0?(spec.modelVisual?.type||"flow"):"cards",data:quick.slice(0,4)})
      }));

      const unit = {
        slug:spec.slug,
        title:spec.title,
        subtitle:spec.subtitle || spec.title,
        desc:spec.desc,
        routine:spec.routine || (subject === "maths" ? "Represent → Reason → Calculate → Interpret → Verify" : subject === "science" ? "Observe → Model → Investigate → Analyse → Explain → Evaluate" : "Notice → Analyse → Interpret → Apply → Create → Review"),
        learn:spec.learn || spec.core,
        model_title:spec.modelTitle,
        model_html:board(`${modelVisual}<p>${esc(spec.modelNote || spec.core)}</p>`),
        apply_title:spec.applyTitle,
        apply_html:board(`${applyVisual}<p>${esc(spec.applyNote || spec.core)}</p>`),
        hero_visual:board(`${modelVisual}${applyVisual}`),
        quick_visuals:[{label:"Model",html:modelVisual},{label:"Apply",html:applyVisual},{label:"Key terms",html:cards(terms.map((item)=>item[0]))}],
        activities,
        mistakes,
        quick,
        mastery,
        terms
      };
      unit.worksheet = questionSet({...spec,mistakes,learn:unit.learn},subject);
      return [code,unit];
    }));

    const dataKey = `SkillrYear7${subjectName}Data`;
    const orderKey = `SkillrYear7${subjectName}Order`;
    const worksheetKey = `SkillrYear7${subjectName}WorksheetData`;
    window[dataKey] = Object.assign(window[dataKey] || {},units);
    window[orderKey] = [...new Set([...(window[orderKey] || []),...order])];
    window[worksheetKey] = Object.assign(window[worksheetKey] || {},Object.fromEntries(Object.entries(units).map(([code,unit])=>[code,{title:unit.title,questions:unit.worksheet,yearLabel:`Year 7 ${subjectName}`}])));
  }

  window.SkillrYear7Register = register;
})();
