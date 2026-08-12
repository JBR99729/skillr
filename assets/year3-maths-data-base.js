(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const board = (html) => `<div class="y3-vector-board">${html}</div>`;
  const cards = (items) => `<div class="y3-card-row">${(items || []).map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y3-flow">${(items || []).map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>`;
  const fractionBar = (parts, shaded, label = "") => `<div class="y3-fraction-wrap"><div class="y3-fraction-bar" style="grid-template-columns:repeat(${parts},1fr)">${Array.from({length:parts},(_,i)=>`<i class="${i < shaded ? "is-shaded" : ""}"></i>`).join("")}</div>${label ? `<strong>${esc(label)}</strong>` : ""}</div>`;

  function visual(v = {}) {
    const type = v.type || "cards";
    if (type === "cards") return cards(v.items || []);
    if (type === "flow" || type === "partition") return flow(v.items || v.steps || []);
    if (type === "place") {
      return `<div class="y3-place">${(v.digits || []).map((digit, i) => `<div><small>${esc((v.labels || [])[i] || "")}</small><strong>${esc(digit)}</strong></div>`).join("")}</div>`;
    }
    if (type === "compare") {
      return `<div class="y3-compare">${cards(v.items || [])}${v.answer ? `<p>${esc(v.answer)}</p>` : ""}</div>`;
    }
    if (type === "numberline") {
      const start = Number(v.start || 0), end = Number(v.end || 100), range = Math.max(1, end - start);
      return `<div class="y3-number-line"><div class="rail">${(v.marks || []).map((mark) => `<i style="left:${Math.max(0,Math.min(100,(Number(mark)-start)/range*100))}%"><span>${esc(mark)}</span></i>`).join("")}</div><div class="ends"><b>${esc(start)}</b><b>${esc(end)}</b></div></div>`;
    }
    if (type === "fraction") return fractionBar(Number(v.parts || 2), Number(v.shaded || 1), v.label || "");
    if (type === "fractionpair") {
      return `<div class="y3-fraction-pair">${fractionBar(Number(v.parts || 2), Number(v.left || 0))}<b>+</b>${fractionBar(Number(v.parts || 2), Number(v.right || 0))}${v.label ? `<strong>${esc(v.label)}</strong>` : ""}</div>`;
    }
    if (type === "fractionset") {
      return `<div class="y3-fraction-set">${(v.items || []).map(([parts,shaded]) => fractionBar(Number(parts),Number(shaded),`${shaded}/${parts}`)).join("")}</div>`;
    }
    if (type === "array") {
      const rows = Number(v.rows || 2), cols = Number(v.cols || 2);
      return `<div class="y3-array-wrap"><div class="y3-array" style="grid-template-columns:repeat(${cols},minmax(5px,1fr))">${Array.from({length:Math.min(rows*cols,120)},(_,i)=>`<i${v.split && (i % cols) === Number(v.split) ? ' class="split-start"' : ""}></i>`).join("")}</div>${v.label ? `<strong>${esc(v.label)}</strong>` : ""}</div>`;
    }
    if (type === "groups") {
      return `<div class="y3-groups">${Array.from({length:Number(v.groups || 1)},(_,i)=>`<div><b>Group ${i+1}</b><span>${esc(v.each)} each</span></div>`).join("")}<strong>${esc(v.total)} total</strong></div>`;
    }
    if (type === "factfamily") {
      return `<div class="y3-fact-family"><div class="triangle">${(v.values || []).map((x)=>`<span>${esc(x)}</span>`).join("")}</div>${cards(v.facts || [])}</div>`;
    }
    if (type === "bar") {
      return `<div class="y3-part-whole"><div class="whole">${esc(v.whole)}</div><div class="parts">${(v.parts || []).map((x)=>`<span>${esc(x)}</span>`).join("")}</div>${v.label ? `<small>${esc(v.label)}</small>` : ""}</div>`;
    }
    if (type === "estimate") {
      return `<div class="y3-estimate">${(v.groups || []).map((count)=>`<div>${Array.from({length:Math.min(Number(count),12)},()=>"<i></i>").join("")}<b>${esc(count)}</b></div>`).join("")}${v.label ? `<strong>${esc(v.label)}</strong>` : ""}</div>`;
    }
    if (type === "money") {
      return `<div class="y3-money">${(v.values || []).map((x)=>`<span>${esc(x)}</span>`).join("")}${v.total ? `<strong>Total ${esc(v.total)}</strong>` : ""}</div>`;
    }
    if (type === "moneyproblem") {
      return `<div class="y3-money-problem">${(v.items || []).map(([name,price,qty])=>`<div><b>${esc(qty)} × ${esc(name)}</b><span>${esc(qty)} × $${esc(price)}</span></div>`).join("")}<strong>Total ${esc(v.total || "")}</strong></div>`;
    }
    if (type === "algorithm") {
      return `<div class="y3-algorithm">${(v.steps || []).map((x,i)=>`<span class="${String(x).includes("?") ? "decision" : ""}">${esc(x)}</span>${i < v.steps.length-1 ? "<b>↓</b>" : ""}`).join("")}</div>`;
    }
    if (type === "table") {
      const rows = v.rows || [];
      const cols = Math.max(1,...rows.map((r)=>r.length));
      return `<div class="y3-table" style="grid-template-columns:repeat(${cols},1fr)">${rows.flatMap((row)=>row.map((cell)=>`<span>${esc(cell)}</span>`)).join("")}</div>`;
    }
    if (type === "units") {
      return `<div class="y3-units">${(v.items || []).map(([item,unit])=>`<div><strong>${esc(item)}</strong><span>${esc(unit)}</span></div>`).join("")}</div>`;
    }
    if (type === "ruler") {
      const start=Number(v.start||0), end=Number(v.end||20), value=Number(v.value||0);
      return `<div class="y3-ruler"><div class="ticks">${Array.from({length:end-start+1},(_,i)=>`<i class="${start+i===value?"value":""}"><span>${start+i}</span></i>`).join("")}</div><strong>${esc(value)} ${esc(v.unit||"")}</strong></div>`;
    }
    if (type === "scales") {
      return `<div class="y3-scales">${(v.items || []).map(([name,value,unit,step])=>`<div><strong>${esc(name)}</strong><span>${esc(value)} ${esc(unit)}</span><small>interval ${esc(step)} ${esc(unit)}</small></div>`).join("")}</div>`;
    }
    if (type === "timeunits") return `<div class="y3-time-units">${(v.items || []).map(([a,b])=>`<div><strong>${esc(a)}</strong><b>=</b><strong>${esc(b)}</strong></div>`).join("")}</div>`;
    if (type === "timeline") {
      return `<div class="y3-timeline">${(v.items || []).map(([name,duration])=>`<div><i></i><strong>${esc(name)}</strong><span>${esc(duration)}</span></div>`).join("")}</div>`;
    }
    if (type === "timer") {
      const seconds=Number(v.seconds||60), deg=Math.min(360,seconds/60*360);
      return `<div class="y3-timer" style="--timer-deg:${deg}deg"><strong>${seconds}s</strong></div>`;
    }
    if (type === "clock") {
      const hour=Number(v.hour||0), minute=Number(v.minute||0);
      const hdeg=(hour%12)*30+minute*.5, mdeg=minute*6;
      return `<div class="y3-clock-wrap"><div class="y3-clock" style="--h:${hdeg}deg;--m:${mdeg}deg"><span class="h-hand"></span><span class="m-hand"></span><b>12</b><b>3</b><b>6</b><b>9</b></div><strong>${esc(v.digital || `${hour}:${String(minute).padStart(2,"0")}`)}</strong></div>`;
    }
    if (type === "clockpair") return `<div class="y3-clock-pair">${(v.times || []).map(([h,m,d])=>visual({type:"clock",hour:h,minute:m,digital:d})).join("")}</div>`;
    if (type === "angle") {
      return `<div class="y3-angle"><span></span><i style="transform:rotate(${Number(v.degrees||90)}deg)"></i><strong>${esc(v.label || `${v.degrees}°`)}</strong></div>`;
    }
    if (type === "angleset") return `<div class="y3-angle-set">${(v.angles || []).map((a,i)=>visual({type:"angle",degrees:a,label:(v.labels||[])[i]||`${a}°`})).join("")}</div>`;
    if (type === "solids") {
      return `<div class="y3-solids">${(v.items || []).map(([name,feature])=>`<div class="solid ${esc(name).toLowerCase().replace(/\s+/g,"-")}"><i></i><strong>${esc(name)}</strong><span>${esc(feature)}</span></div>`).join("")}</div>`;
    }
    if (type === "map") {
      const grid=v.grid || [], cols=Math.max(1,...grid.map(r=>r.length));
      const pathSet=new Set((v.path||[]).map(([r,c])=>`${r}-${c}`));
      return `<div class="y3-map" style="grid-template-columns:repeat(${cols},1fr)">${grid.flatMap((row,r)=>row.map((cell,c)=>`<span class="${pathSet.has(`${r}-${c}`)?"path":""}">${esc(cell || "·")}</span>`)).join("")}</div>`;
    }
    if (type === "bargraph") {
      const vals=(v.values||[]).map(Number), max=Math.max(1,...vals);
      return `<div class="y3-bargraph">${vals.map((value,i)=>`<div><span style="height:${value/max*100}%"><b>${esc(value)}</b></span><small>${esc((v.labels||[])[i]||"")}</small></div>`).join("")}</div>`;
    }
    if (type === "cycle") {
      return `<div class="y3-cycle">${(v.items || []).map((x,i)=>`<span>${esc(x)}</span>${i<v.items.length-1?"<b>→</b>":""}`).join("")}</div>`;
    }
    if (type === "chance") {
      return `<div class="y3-chance-scale"><div class="rail">${(v.items || []).map(([label,p])=>`<i style="left:${Number(p)}%"><span>${esc(label)}</span></i>`).join("")}</div></div>`;
    }
    if (type === "bag") {
      return `<div class="y3-bag"><div class="bag-shape">${(v.items || []).map(([name,count])=>`<span>${esc(name)} × ${esc(count)}</span>`).join("")}</div></div>`;
    }
    if (type === "spinner") {
      const n=Math.max(1,(v.sections||[]).length);
      const palette=["#dbeafe","#dcfce7","#fef3c7","#fee2e2","#ede9fe","#cffafe"];
      const stops=(v.sections||[]).map((_,i)=>`${palette[i%palette.length]} ${i/n*100}% ${(i+1)/n*100}%`).join(",");
      return `<div class="y3-spinner-wrap"><div class="y3-spinner" style="background:conic-gradient(${stops})"></div>${cards(v.sections||[])}</div>`;
    }
    if (type === "numbergrid") return `<div class="y3-number-grid">${(v.values || []).map((x)=>`<span>${esc(x)}</span>`).join("")}</div>`;
    return cards(v.items || v.steps || []);
  }

  function register(raw, orderPart) {
    const units = Object.fromEntries(Object.entries(raw).map(([code, s]) => {
      const model = visual(s.model_visual);
      const apply = visual(s.apply_visual);
      const activities = (s.activities || []).map((activity) => ({
        title: activity.title,
        text: activity.text,
        visual_html: visual(activity.visual)
      }));
      return [code, {
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        desc: s.desc,
        routine: s.routine,
        learn: s.learn,
        model_title: s.model_title,
        model_html: board(`${model}<p>${esc(s.model_note)}</p>`),
        apply_title: s.apply_title,
        apply_html: board(`${apply}<p>${esc(s.apply_note)}</p>`),
        hero_visual: board(`${model}${apply}`),
        quick_visuals: [
          { label: "Model", html: model },
          { label: "Apply", html: apply },
          { label: "Try", html: activities[0]?.visual_html || cards(s.quick?.slice(0,3) || []) }
        ],
        activities,
        mistakes: s.mistakes,
        quick: s.quick,
        mastery: s.mastery,
        worksheet: s.worksheet
      }];
    }));

    window.SkillrYear3MathsData = Object.assign(window.SkillrYear3MathsData || {}, units);
    window.SkillrYear3MathsOrder = [...new Set([...(window.SkillrYear3MathsOrder || []), ...orderPart])];
    window.SkillrYear3MathsWorksheetData = Object.assign(
      window.SkillrYear3MathsWorksheetData || {},
      Object.fromEntries(Object.entries(units).map(([code, unit]) => [
        code,
        { title: unit.title, questions: unit.worksheet, yearLabel: "Year 3 Maths" }
      ]))
    );
  }

  window.SkillrYear3MathsRegister = register;
})();