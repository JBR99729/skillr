(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const board = (html) => `<div class="y4-maths-board">${html}</div>`;
  const cards = (items) => `<div class="y4-card-row">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y4-flow">${(items || []).map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>`;
  const table = (rows) => {
    const cols = Math.max(1, ...(rows || []).map((row) => row.length));
    return `<div class="y4-table" style="grid-template-columns:repeat(${cols},1fr)">${(rows || []).flatMap((row) => row.map((cell) => `<span>${esc(cell)}</span>`)).join("")}</div>`;
  };

  function fractionBar(parts, shaded, label = "") {
    return `<div class="y4-fraction-wrap"><div class="y4-fraction-bar" style="grid-template-columns:repeat(${parts},1fr)">${Array.from({length:parts},(_,i)=>`<i class="${i < shaded ? "is-shaded" : ""}"></i>`).join("")}</div>${label ? `<strong>${esc(label)}</strong>` : ""}</div>`;
  }

  function visual(v = {}) {
    const type = v.type || "cards";
    if (type === "cards") return cards(v.items || []);
    if (type === "flow") return flow(v.items || []);
    if (type === "table") return table(v.rows || []);
    if (type === "decimal-place") {
      const labels = v.labels || ["hundreds","tens","ones","tenths","hundredths"];
      return `<div class="y4-decimal-place">${labels.map((label, i) => `<div class="${label === "ones" ? "ones" : ""}"><small>${esc(label)}</small><strong>${esc((v.digits || [])[i] ?? "")}</strong></div>`).join("")}<b class="decimal-point">.</b></div>${v.value ? `<p class="y4-visual-answer">${esc(v.value)}</p>` : ""}`;
    }
    if (type === "hundred-grid") {
      const shaded = Number(v.shaded || 0);
      return `<div class="y4-hundred-grid">${Array.from({length:100},(_,i)=>`<i class="${i < shaded ? "is-shaded" : ""}"></i>`).join("")}</div>${v.label ? `<p class="y4-visual-answer">${esc(v.label)}</p>` : ""}`;
    }
    if (type === "parity") {
      const n = Number(v.number || 7);
      return `<div class="y4-parity">${Array.from({length:n},(_,i)=>`<i class="${i === n-1 && n%2 ? "unpaired" : ""}"></i>`).join("")}<strong>${n % 2 ? "odd: one unpaired" : "even: all paired"}</strong></div>`;
    }
    if (type === "fraction-equivalent") {
      return `<div class="y4-equivalent">${(v.items || []).map(([parts,shaded,label])=>fractionBar(Number(parts),Number(shaded),label)).join("<b>=</b>")}</div>`;
    }
    if (type === "fraction-set") {
      return `<div class="y4-fraction-set">${(v.items || []).map(([parts,shaded,label])=>fractionBar(Number(parts),Number(shaded),label)).join("")}</div>`;
    }
    if (type === "numberline") {
      const start = Number(v.start || 0), end = Number(v.end || 1), range = Math.max(.0001, end - start);
      return `<div class="y4-number-line"><div class="rail">${(v.marks || []).map(([value,label]) => `<i style="left:${Math.max(0,Math.min(100,(Number(value)-start)/range*100))}%"><span>${esc(label ?? value)}</span></i>`).join("")}</div><div class="ends"><b>${esc(v.startLabel ?? start)}</b><b>${esc(v.endLabel ?? end)}</b></div></div>`;
    }
    if (type === "place-shift") {
      return `<div class="y4-place-shift">${table(v.rows || [])}${flow(v.steps || [])}</div>`;
    }
    if (type === "array") {
      const rows = Number(v.rows || 2), cols = Number(v.cols || 2), split = Number(v.split || 0);
      return `<div class="y4-array-wrap"><div class="y4-array" style="grid-template-columns:repeat(${cols},minmax(4px,1fr))">${Array.from({length:Math.min(rows*cols,180)},(_,i)=>`<i class="${split && i % cols === split ? "split-start" : ""}"></i>`).join("")}</div>${v.label ? `<strong>${esc(v.label)}</strong>` : ""}</div>`;
    }
    if (type === "strategy") {
      return `<div class="y4-strategy">${(v.items || []).map(([name,example])=>`<div><strong>${esc(name)}</strong><span>${esc(example)}</span></div>`).join("")}</div>`;
    }
    if (type === "rounding") {
      return `<div class="y4-rounding">${visual({type:"numberline",start:v.start,end:v.end,marks:v.marks,startLabel:v.start,endLabel:v.end})}${v.answer ? `<strong>${esc(v.answer)}</strong>` : ""}</div>`;
    }
    if (type === "money-model") {
      return `<div class="y4-money-model">${(v.items || []).map(([name,price,qty])=>`<div><strong>${esc(qty)} × ${esc(name)}</strong><span>${esc(qty)} × $${esc(price)}</span></div>`).join("")}<p>${esc(v.operation || "")}</p><b>${esc(v.total || "")}</b></div>`;
    }
    if (type === "algorithm") {
      return `<div class="y4-algorithm">${(v.steps || []).map((step,i)=>`<span class="${String(step).includes("?") ? "decision" : ""}">${esc(step)}</span>${i<v.steps.length-1?"<b>↓</b>":""}`).join("")}</div>`;
    }
    if (type === "balance") {
      return `<div class="y4-balance"><div>${esc(v.left || "")}</div><span>⚖</span><div>${esc(v.right || "")}</div>${v.note ? `<strong>${esc(v.note)}</strong>` : ""}</div>`;
    }
    if (type === "fact-network") {
      return `<div class="y4-fact-network"><div class="centre">${esc(v.centre || "")}</div>${(v.facts || []).map((fact)=>`<span>${esc(fact)}</span>`).join("")}</div>`;
    }
    if (type === "scale") {
      const min = Number(v.min || 0), max = Number(v.max || 10), intervals = Number(v.intervals || 10), value = Number(v.value || min);
      return `<div class="y4-scale"><div class="ticks">${Array.from({length:intervals+1},(_,i)=>{const n=min+(max-min)*i/intervals;return `<i class="${Math.abs(n-value)<.0001?"value":""}"><span>${Number.isInteger(n)?n:n.toFixed(1)}</span></i>`}).join("")}</div><strong>${esc(v.label || value)}</strong></div>`;
    }
    if (type === "area-grid") {
      const rows=Number(v.rows||4),cols=Number(v.cols||6);
      return `<div class="y4-area-wrap"><div class="y4-area-grid" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({length:rows*cols},()=>"<i></i>").join("")}</div><div><span>perimeter ${esc(v.perimeter ?? 2*(rows+cols))} units</span><span>area ${esc(v.area ?? rows*cols)} square units</span></div></div>`;
    }
    if (type === "time-line") {
      return `<div class="y4-time-line">${(v.items || []).map(([time,label])=>`<div><strong>${esc(time)}</strong><span>${esc(label)}</span></div>`).join("<b>→</b>")}</div>${v.duration ? `<p class="y4-visual-answer">${esc(v.duration)}</p>` : ""}`;
    }
    if (type === "angle-set") {
      return `<div class="y4-angle-set">${(v.items || []).map(([degrees,label])=>`<div class="y4-angle"><span></span><i style="transform:rotate(${Number(degrees)}deg)"></i><strong>${esc(label)}</strong><small>${esc(degrees)}°</small></div>`).join("")}</div>`;
    }
    if (type === "composite") {
      return `<div class="y4-composite">${(v.parts || []).map(([shape,x,y,w,h])=>`<i class="${esc(shape)}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></i>`).join("")}<strong>${esc(v.label || "composite shape")}</strong></div>`;
    }
    if (type === "grid-ref") {
      const rows=v.rows||5,cols=v.cols||5,marks=new Map((v.marks||[]).map(([r,c,label])=>[`${r}-${c}`,label]));
      return `<div class="y4-grid-wrap"><div class="y4-grid-head">${Array.from({length:cols},(_,i)=>`<b>${String.fromCharCode(65+i)}</b>`).join("")}</div><div class="y4-grid-body" style="grid-template-columns:28px repeat(${cols},1fr)">${Array.from({length:rows},(_,r)=>`<b>${rows-r}</b>${Array.from({length:cols},(_,c)=>`<span>${esc(marks.get(`${rows-r}-${c+1}`)||"")}</span>`).join("")}`).join("")}</div></div>`;
    }
    if (type === "symmetry") {
      return `<div class="y4-symmetry"><div class="shape ${esc(v.shape||"kite")}"></div><i class="${v.axis||"vertical"}"></i>${v.order ? `<strong>rotational order ${esc(v.order)}</strong>` : ""}</div>`;
    }
    if (type === "pictograph") {
      const key=Number(v.key||2);
      return `<div class="y4-pictograph">${(v.items||[]).map(([label,count])=>`<div><strong>${esc(label)}</strong><span>${Array.from({length:Math.floor(count/key)},()=>"●").join(" ")}${count%key?" ◐":""}</span><small>${esc(count)}</small></div>`).join("")}<b>Key: ● = ${key}</b></div>`;
    }
    if (type === "bargraph") {
      const vals=(v.values||[]).map(Number), max=Math.max(1,...vals);
      return `<div class="y4-bargraph">${vals.map((value,i)=>`<div><span style="height:${value/max*100}%"><b>${esc(value)}</b></span><small>${esc((v.labels||[])[i]||"")}</small></div>`).join("")}</div>`;
    }
    if (type === "dotplot") {
      const values=v.values||[],min=Math.min(...values),max=Math.max(...values);
      return `<div class="y4-dotplot">${Array.from({length:max-min+1},(_,i)=>{const n=min+i,c=values.filter(x=>x===n).length;return `<div><span>${Array.from({length:c},()=>"●").join("<br>")}</span><b>${n}</b></div>`}).join("")}</div>`;
    }
    if (type === "investigation") {
      return `<div class="y4-investigation">${(v.items||[]).map((item,i)=>`<div><i>${i+1}</i><strong>${esc(item)}</strong></div>`).join("")}</div>`;
    }
    if (type === "chance-scale") {
      return `<div class="y4-chance-scale"><div class="rail">${(v.items||[]).map(([label,p])=>`<i style="left:${Number(p)}%"><span>${esc(label)}</span></i>`).join("")}</div></div>`;
    }
    if (type === "chance-tree") {
      return `<div class="y4-chance-tree"><div>${esc(v.start||"start")}</div>${(v.first||[]).map(([a,second])=>`<section><strong>${esc(a)}</strong>${(second||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</section>`).join("")}</div>`;
    }
    if (type === "trial-compare") {
      return `<div class="y4-trial-compare">${(v.sets||[]).map(([name,a,b])=>`<div><strong>${esc(name)}</strong><span>A: ${esc(a)}</span><span>B: ${esc(b)}</span></div>`).join("")}</div>`;
    }
    return cards(v.items || v.steps || []);
  }

  function register(specs, orderPart) {
    const units = Object.fromEntries(Object.entries(specs).map(([code,s]) => {
      const model = visual(s.model_visual);
      const apply = visual(s.apply_visual);
      return [code, {
        slug:s.slug,title:s.title,subtitle:s.subtitle,desc:s.desc,routine:s.routine,learn:s.learn,
        model_title:s.model_title,model_html:board(`${model}<p>${esc(s.model_note)}</p>`),
        apply_title:s.apply_title,apply_html:board(`${apply}<p>${esc(s.apply_note)}</p>`),
        hero_visual:board(`${model}${apply}`),
        quick_visuals:[{label:"Model",html:model},{label:"Apply",html:apply},{label:"Reason",html:visual(s.quick_visual || {type:"cards",items:(s.quick||[]).slice(0,3)})}],
        activities:(s.activities||[]).map(a=>({title:a.title,text:a.text,visual_html:visual(a.visual)})),
        mistakes:s.mistakes,quick:s.quick,mastery:s.mastery,worksheet:s.worksheet
      }];
    }));
    window.SkillrYear4MathsData = Object.assign(window.SkillrYear4MathsData || {}, units);
    window.SkillrYear4MathsOrder = [...new Set([...(window.SkillrYear4MathsOrder || []), ...orderPart])];
    window.SkillrYear4MathsWorksheetData = Object.assign(window.SkillrYear4MathsWorksheetData || {}, Object.fromEntries(Object.entries(units).map(([code,unit])=>[code,{title:unit.title,questions:unit.worksheet,yearLabel:"Year 4 Maths"}])));
  }

  window.SkillrYear4MathsRegister = register;
})();
