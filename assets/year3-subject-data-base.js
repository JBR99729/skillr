(() => {
  "use strict";
  const esc=(v)=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const q=(type,question,extra={})=>({type,question,...extra});
  const board=(html)=>`<div class="y3-subject-board">${html}</div>`;
  const cards=(items)=>`<div class="y3-subject-cards">${(items||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</div>`;
  const flow=(items)=>`<div class="y3-subject-flow">${(items||[]).map((x,i)=>`<span>${esc(x)}</span>${i<items.length-1?"<b>→</b>":""}`).join("")}</div>`;
  const table=(rows)=>{const cols=Math.max(1,...(rows||[]).map(r=>r.length));return `<div class="y3-subject-table" style="grid-template-columns:repeat(${cols},1fr)">${(rows||[]).flatMap(r=>r.map(x=>`<span>${esc(x)}</span>`)).join("")}</div>`};
  function visual(v={}){
    const t=v.type||"cards";
    if(t==="cards")return cards(v.items||[]);
    if(t==="flow")return flow(v.items||[]);
    if(t==="cycle")return `<div class="y3-subject-cycle">${(v.items||[]).map((x,i)=>`<span>${esc(x)}</span>${i<v.items.length-1?"<b>→</b>":""}`).join("")}</div>`;
    if(t==="compare")return `<div class="y3-subject-compare">${cards(v.items||[])}${v.note?`<strong>${esc(v.note)}</strong>`:""}</div>`;
    if(t==="table")return table(v.rows||[]);
    if(t==="life")return `<div class="y3-life-cycle">${(v.items||[]).map((x,i)=>`<div><i>${i+1}</i><strong>${esc(x)}</strong></div>`).join("")}</div>`;
    if(t==="soil")return `<div class="y3-soil">${(v.layers||[]).map(([a,b])=>`<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div>`;
    if(t==="heat")return `<div class="y3-heat"><div class="hot">${esc(v.hot||"warm")}</div><div class="arrows">→ heat energy →</div><div class="cool">${esc(v.cool||"cool")}</div>${v.note?`<strong>${esc(v.note)}</strong>`:""}</div>`;
    if(t==="states")return `<div class="y3-states"><div class="solid">${Array.from({length:16},()=>"<i></i>").join("")}<strong>solid</strong></div><b>+ heat →</b><div class="liquid">${Array.from({length:16},()=>"<i></i>").join("")}<strong>liquid</strong></div>${v.reverse?"<b>← remove heat</b>":""}</div>`;
    if(t==="graph"){const vals=(v.values||[]).map(Number),max=Math.max(1,...vals);return `<div class="y3-subject-graph">${vals.map((x,i)=>`<div><span style="height:${x/max*100}%"><b>${esc(x)}</b></span><small>${esc((v.labels||[])[i]||"")}</small></div>`).join("")}</div>`}
    if(t==="evidence")return `<div class="y3-evidence"><div><strong>Claim</strong><span>${esc(v.claim||"")}</span></div><div><strong>Evidence</strong><span>${esc(v.evidence||"")}</span></div><div><strong>Reasoning</strong><span>${esc(v.reasoning||"")}</span></div></div>`;
    if(t==="conversation")return `<div class="y3-conversation">${(v.turns||[]).map(([a,b])=>`<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div>`;
    if(t==="sentence")return `<div class="y3-sentence">${(v.parts||[]).map(([a,b])=>`<div><small>${esc(a)}</small><strong>${esc(b)}</strong></div>`).join("")}</div>`;
    if(t==="paragraph")return `<div class="y3-paragraph"><strong>${esc(v.heading||"Paragraph")}</strong>${(v.sentences||[]).map(x=>`<p>${esc(x)}</p>`).join("")}</div>`;
    if(t==="layout")return `<div class="y3-layout"><header>${esc(v.title||"Title")}</header><aside>${esc(v.side||"menu")}</aside><main>${(v.features||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</main><footer>${esc(v.footer||"link")}</footer></div>`;
    if(t==="timeline")return `<div class="y3-word-timeline">${(v.items||[]).map(([a,b])=>`<div><small>${esc(a)}</small><strong>${esc(b)}</strong></div>`).join("")}</div>`;
    if(t==="scene")return `<div class="y3-scene"><div class="sky">${esc(v.sky||"")}</div><div class="setting">${esc(v.setting||"")}</div><div class="character">${esc(v.character||"")}</div><strong>${esc(v.mood||"")}</strong></div>`;
    if(t==="word")return `<div class="y3-word-build">${(v.parts||[]).map(x=>`<span>${esc(x)}</span>`).join("<b>+</b>")}<strong>${esc(v.result||"")}</strong></div>`;
    if(t==="apostrophe")return `<div class="y3-apostrophe">${(v.items||[]).map(([a,b,c])=>`<div><span>${esc(a)}</span><b>→</b><strong>${esc(b)}</strong><small>${esc(c)}</small></div>`).join("")}</div>`;
    if(t==="presentation")return `<div class="y3-presentation">${(v.items||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</div>`;
    if(t==="handwriting")return `<div class="y3-handwriting">${(v.words||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</div>`;
    return cards(v.items||[]);
  }
  function register(subject,specs,order){
    const name=subject==="science"?"Science":"English";
    const units=Object.fromEntries(Object.entries(specs).map(([code,s])=>{
      const model=visual(s.mv),apply=visual(s.av),terms=s.k||[],first=terms[0]?.[0]||"the key idea",second=terms[1]?.[0]||"evidence",third=terms[2]?.[0]||"application";
      const activities=[
        {title:"Model and notice",text:`Use the visual model to identify ${first}, then explain the important features.`,visual_html:model},
        {title:"Apply and compare",text:`Apply ${second} to a new example and compare the result.`,visual_html:apply},
        {title:"Create and explain",text:`Create an example using ${first}, ${second} and ${third}.`,visual_html:cards(terms.map(x=>x[0]))}
      ];
      const worksheet=[
        q("single",s.c.question,{answers:s.c.answers}),
        q("fill-blank",s.f.question,{template:s.f.template}),
        q("single",s.e.question,{answers:s.e.answers}),
        q("text",`Explain ${s.m.toLowerCase()} using the visual model and precise vocabulary.`),
        q("match","Match each term to its meaning.",{matchLeft:terms.slice(0,3).map(x=>x[0]),matchRight:terms.slice(0,3).map(x=>x[1]).reverse()}),
        q("fill-blank",s.f2.question,{template:s.f2.template}),
        q("text",`Apply ${s.a.toLowerCase()} to a new example and explain your reasoning.`),
        q("text",`A student shows the misconception “${s.mi?.[0]||"the common misconception"}”. Correct the thinking.`),
        q("text",`Create an original example or representation that clearly demonstrates ${first}. Explain your choices.`,{enrichment:true}),
        q("text",`Compare two examples of ${s.t} and justify which one demonstrates the concept more clearly.`,{enrichment:true})
      ];
      const learn=`Students learn to ${s.d}. They use the visual model, precise vocabulary and evidence to explain and apply the concept.`;
      return [code,{slug:s.s,title:s.t,subtitle:s.u,desc:s.d,routine:subject==="science"?"Observe → Model → Investigate → Record → Explain":"Notice → Read/View → Discuss → Apply → Explain",learn,model_title:s.m,model_html:board(`${model}<p>Use the labels and relationships in the model to explain the central idea.</p>`),apply_title:s.a,apply_html:board(`${apply}<p>Transfer the idea to a new example and justify the choice with evidence.</p>`),hero_visual:board(`${model}${apply}`),quick_visuals:[{label:"Model",html:model},{label:"Apply",html:apply},{label:"Key terms",html:cards(terms.map(x=>x[0]))}],activities,mistakes:[s.mi||["Common misconception","Check the evidence and definition."],["Feature named without effect","Explain how the feature changes meaning or outcome."],["One example treated as a rule","Test the idea with another example."]],quick:[s.c.question,s.f.question,`Explain ${s.m.toLowerCase()}.`,`Correct: ${s.mi?.[0]||"the misconception"}.`],mastery:[`Recognise ${first}`,`Use ${second}`,`Explain ${third}`,"Apply in a new context","Justify with evidence"],worksheet}];
    }));
    const dk=`SkillrYear3${name}Data`,ok=`SkillrYear3${name}Order`,wk=`SkillrYear3${name}WorksheetData`;
    window[dk]=Object.assign(window[dk]||{},units);window[ok]=[...new Set([...(window[ok]||[]),...order])];window[wk]=Object.assign(window[wk]||{},Object.fromEntries(Object.entries(units).map(([c,u])=>[c,{title:u.title,questions:u.worksheet,yearLabel:`Year 3 ${name}`}])));
  }
  window.SkillrYear3SubjectRegister=register;
})();