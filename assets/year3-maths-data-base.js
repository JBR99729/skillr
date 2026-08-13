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
    const vocabulary = {
      AC9M3N01:[["place value","the value a digit has because of its position"],["numeral","a written symbol or group of digits that names a number"],["natural number","a whole number used for counting"]],
      AC9M3N02:[["unit fraction","a fraction with 1 as its numerator"],["denominator","the number showing how many equal parts make one whole"],["equivalent whole","all equal parts combined to make one"]],
      AC9M3N03:[["partition","split a number into useful place-value parts"],["regroup","rename a quantity without changing its value"],["inverse","an operation that undoes another operation"]],
      AC9M3N04:[["array","objects arranged in equal rows and columns"],["factor","a number multiplied by another number"],["quotient","the result of a division"]],
      AC9M3N05:[["estimate","a sensible approximate value based on evidence"],["benchmark","a known amount used for comparison"],["reasonable","making sense for the size of the numbers and situation"]],
      AC9M3N06:[["mathematical model","a diagram, number sentence or representation of a situation"],["strategy","a chosen method for solving a problem"],["interpret","explain what an answer means in its situation"]],
      AC9M3N07:[["algorithm","an ordered set of steps and decisions"],["decision","a choice that changes the next step"],["pattern","a regularity that can be noticed and described"]],
      AC9M3A01:[["inverse operations","operations that undo each other"],["unknown","a value that has not yet been found"],["number sentence","a mathematical statement using numbers and symbols"]],
      AC9M3A02:[["mental strategy","a way to calculate without writing every step"],["compensation","adjust numbers to calculate, then correct the adjustment"],["friendly number","a nearby number that is easier to use"]],
      AC9M3A03:[["multiplication fact","a known multiplication statement"],["related division fact","a division statement made from the same fact family"],["proficiency","being accurate, efficient and flexible"]],
      AC9M3M01:[["metric unit","a standard unit such as metre, kilogram or litre"],["attribute","the feature being measured, such as length, mass or capacity"],["estimate","a sensible measurement made before measuring exactly"]],
      AC9M3M02:[["scale","the ordered markings on a measuring instrument"],["interval","the value between neighbouring scale marks"],["capacity","the amount a container can hold"]],
      AC9M3M03:[["duration","how long an event lasts"],["formal unit","a standard time unit such as second, minute, hour or day"],["convert","express the same duration using a different unit"]],
      AC9M3M04:[["analog clock","a clock that shows time with hands on a dial"],["digital time","time written using digits separated by a colon"],["minute hand","the longer hand that shows minutes past the hour"]],
      AC9M3M05:[["angle","a measure of turn between two directions"],["right angle","a quarter turn"],["vertex","the point where the two arms of an angle meet"]],
      AC9M3M06:[["dollar","a money unit equal to 100 cents"],["cent","one hundredth of a dollar"],["equivalent value","a different representation of the same amount"]],
      AC9M3SP01:[["feature","a property used to describe or compare an object"],["classify","sort into groups using a stated rule"],["suitable","having features that fit a particular use"]],
      AC9M3SP02:[["representation","a drawing or model that shows a place"],["landmark","an important object or place used to locate position"],["relative position","where something is compared with something else"]],
      AC9M3ST01:[["categorical data","information sorted into named groups"],["discrete numerical data","counted number data with separate values"],["frequency table","a table showing how often each value occurs"]],
      AC9M3ST02:[["data display","a visual representation of collected information"],["scale","the values marked along a graph axis"],["interpret","use a display to explain what the data shows"]],
      AC9M3ST03:[["statistical investigation","a process of asking, collecting, displaying and interpreting data"],["question of interest","the focused question an investigation answers"],["conclusion","a statement supported by the collected data"]],
      AC9M3P01:[["outcome","a possible result of a chance event"],["likely","more likely to happen than not happen"],["impossible","an event that cannot happen"]],
      AC9M3P02:[["chance experiment","a repeatable action with an uncertain result"],["trial","one performance of a chance experiment"],["variation","differences in results between repeated sets of trials"]]
    };
    const resolved = {
      AC9M3N01:{fill:["6, 3, 4, 0 and 9","300"],match:"23 006 → twenty-three thousand and six; 32 060 → thirty-two thousand and sixty; 230 006 → two hundred and thirty thousand and six.",quick:"42 507 means forty-two thousand five hundred and seven."},
      AC9M3N02:{fill:["5","3"],match:"2/3 → 2 of 3 equal parts; 4/5 → 4 of 5 equal parts; 3/4 → 3 of 4 equal parts.",quick:"One-third is 1 of 3 equal parts."},
      AC9M3N03:{fill:["7","286"],match:"399 + 246 → 645; 721 − 286 → 435; 503 − 198 → 305.",quick:"268 + 157 = 425."},
      AC9M3N04:{fill:["4","11"],match:"4 × 18 → 72; 75 ÷ 5 → 15; 96 ÷ 8 → 12.",quick:"6 × 14 = 84 because 6 × 10 + 6 × 4 = 60 + 24."},
      AC9M3N05:{fill:["300 and 300","100"],match:"198 + 304 → about 500; 602 − 198 → about 400; 49 × 6 → about 300.",quick:"398 + 205 is about 600."},
      AC9M3N06:{fill:["24 and 8","9"],match:"four bags of 7 → multiplication; $30 minus $12 → subtraction; 24 shared by 6 → division.",quick:"Three notebooks at $4 each cost $12."},
      AC9M3N07:{fill:["9","1"],match:"2 → 7; 4 → 13; 6 → 19.",quick:"The output is 16: 5 + 3 = 8, then 8 × 2 = 16."},
      AC9M3A01:{fill:["36","57"],match:"29 + □ = 84 → 55; □ − 18 = 42 → 60; 96 − □ = 39 → 57.",quick:"62 − 37 = 25 is related to 37 + 25 = 62."},
      AC9M3A02:{fill:["5","70"],match:"68 + 7 → bridge to next ten; 49 + 50 → near doubles; 198 + 34 → compensation.",quick:"70 + 80 = 150."},
      AC9M3A03:{fill:["9","8"],match:"8 × 3 → 24; 6 × 4 → 24; 7 × 5 → 35.",quick:"7 × 4 = 28."},
      AC9M3M01:{fill:["metres","millilitres"],match:"bucket capacity → litres; bag of rice mass → kilograms; room length → metres.",quick:"Centimetres are suitable for measuring a pencil's length."},
      AC9M3M02:{fill:["13","400"],match:"ruler → length; balance scale → mass; measuring jug → capacity.",quick:"Begin an object at the ruler's zero mark."},
      AC9M3M03:{fill:["180","9:45"],match:"120 seconds → 2 minutes; 180 minutes → 3 hours; 48 hours → 2 days.",quick:"2 minutes equals 120 seconds."},
      AC9M3M04:{fill:["3:27","09"],match:"18 past 9 → 9:18; 42 past 11 → 11:42; 4 past 7 → 7:04.",quick:"Five minutes past eight is 8:05."},
      AC9M3M05:{fill:["quarter","half"],match:"45° → less than a right angle; 90° → right angle; 180° → half turn.",quick:"A quarter turn is a right angle."},
      AC9M3M06:{fill:["250","10"],match:"$4.05 → 405c; $0.80 → 80c; $5.00 → 500c.",quick:"$3 equals 300 cents."},
      AC9M3SP01:{fill:["6","edge"],match:"box → flat faces stack; ball → curved surface rolls; can → stable flat base with curved side.",quick:"Flat faces help a box stack."},
      AC9M3SP02:{fill:["between","key"],match:"beside → next to; between → in the middle of two landmarks; north of → above on a north-up map.",quick:"A map key explains the meaning of symbols."},
      AC9M3ST01:{fill:["7","13"],match:"category → labelled group; frequency → count in a group; tally → quick recording marks.",quick:"Favourite fruit is categorical data because responses are names, not counts."},
      AC9M3ST02:{fill:["2","greatest"],match:"frequency table → exact listed values; picture graph → visual symbols; column graph → quick height comparison.",quick:"Category frequencies must remain unchanged when data moves from a table to a graph."},
      AC9M3ST03:{fill:["interpret","3"],match:"collect → record responses; represent → create a table or graph; interpret → look for patterns.",quick:"First ask a clear statistical question."},
      AC9M3P01:{fill:["certain","0"],match:"Sun rises tomorrow → certain; roll 9 on a standard die → impossible; pick blue from 9 red and 1 blue → unlikely.",quick:"Rolling 7 on a standard six-sided die is impossible."},
      AC9M3P02:{fill:["20","3"],match:"trial → one performance; frequency → number of times an outcome occurs; variation → difference across results.",quick:"The possible coin-toss outcomes are heads and tails."}
    };
    const units = Object.fromEntries(Object.entries(raw).map(([code, s]) => {
      const model = visual(s.model_visual);
      const apply = visual(s.apply_visual);
      const activities = (s.activities || []).map((activity) => ({
        title: activity.title,
        text: activity.text,
        visual_html: visual(activity.visual)
      }));
      let fillIndex=0;
      const selectedWorksheet = (s.worksheet || []).filter((item, index) => index < 6 || index === 7 || item.enrichment).slice(0, 9);
      const questions = selectedWorksheet.map((item, index) => {
        const tier = index < 3 ? "warm-up" : index < 7 ? "core" : "extension";
        const alignment = index === 6
          ? {kind:"misconception", target:s.mistakes[0][0]}
          : index === 3 || index === 7
            ? {kind:"model", target:s.model_title}
            : index === 5 || index === 8
              ? {kind:"model", target:s.apply_title}
              : index === 1 || index === 4
                ? {kind:"vocabulary", target:vocabulary[code][index === 1 ? 0 : 1][0]}
                : {kind:"concept", target:s.title};
        const answer = item.answer || (item.type === "single" ? item.answers?.[0] : item.type === "match" ? resolved[code].match : item.type === "fill-blank" ? resolved[code].fill[fillIndex++] : `A complete response should ${item.question.charAt(0).toLowerCase()}${item.question.slice(1).replace(/[?.]$/,"")}, show a correct representation or calculation, and justify the conclusion using ${vocabulary[code][0][0]}.`);
        return {...item, enrichment:tier === "extension", tier, alignment, answer,
          summary:item.summary || `For “${item.question}”, ${answer} This follows the ${vocabulary[code][0][0]} relationship shown by the given information.`,
          hint:item.hint || `Underline the information in “${item.question}”, then use ${index < 3 ? s.model_title.toLowerCase() : s.apply_title.toLowerCase()} to complete one step at a time.`};
      });
      const workedExamples = [
        {title:s.model_title, visual_html:model, alt:`Visual model for ${s.model_title.toLowerCase()} in ${s.title.toLowerCase()}.`, steps:[`Set up the quantities and labels shown in “${s.model_title}”.`, s.model_note, `Use ${vocabulary[code][0][0]} to check that the model answers ${s.quick[0].toLowerCase()}`]},
        {title:s.apply_title, visual_html:apply, alt:`Application model for ${s.apply_title.toLowerCase()} in ${s.title.toLowerCase()}.`, steps:[`Use the new values and relationships shown in “${s.apply_title}”.`, s.apply_note, `Explain the result using the terms ${vocabulary[code][1][0]} and ${vocabulary[code][2][0]}.`]}
      ];
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
        hero_visual: `<div role="img" aria-label="Two visual models for ${esc(s.title)}">${board(`${model}${apply}`)}</div>`,
        quick_visuals: [
          { label: "Model", html: model },
          { label: "Apply", html: apply },
          { label: "Try", html: activities[0]?.visual_html || cards(s.quick?.slice(0,3) || []) }
        ],
        activities,
        mistakes: s.mistakes,
        quick: s.quick,
        mastery: s.mastery,
        vocabulary: vocabulary[code],
        deep_dive: [`${s.learn} This matters because ${s.model_note.charAt(0).toLowerCase()}${s.model_note.slice(1)}`, `${s.apply_note} Use this idea when a problem asks you to ${s.apply_title.toLowerCase()}, and explain the result with ${vocabulary[code].map(x=>x[0]).join(", ")}.`],
        worked_examples: workedExamples,
        worksheet: questions,
        slides: {
          learning_intention:`We are learning to ${s.desc}.`,
          success_criteria:(s.mastery || []).slice(0,3).map((text)=>`I can ${text.charAt(0).toLowerCase()}${text.slice(1)}.`),
          quick_check:s.quick?.[0] || questions[0]?.question,
          expected_response:resolved[code].quick,
          remediation:s.mistakes?.[0]?.[1] || "Return to the visual model and explain one step at a time."
        }
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
