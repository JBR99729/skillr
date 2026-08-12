(() => {
  "use strict";

  if (window.__skillrWorksheetPackEnhancerLoaded) return;
  window.__skillrWorksheetPackEnhancerLoaded = true;

  const route = location.pathname.match(/^\/quiz\/(grade-k|year-\d+)\/(math|science|english)\/(ac9[a-z0-9]+)\/worksheet\/?$/i);
  if (!route) return;

  const gradeRoute = route[1].toLowerCase();
  const subjectRoute = route[2].toLowerCase();
  const code = route[3].toUpperCase();
  const sheetParam = (new URLSearchParams(location.search).get("sheet") || "core").toLowerCase();
  const gradeNumber = gradeRoute === "grade-k" ? 0 : Number(gradeRoute.replace("year-", ""));
  const gradeLabel = gradeNumber === 0 ? "Foundation" : `Year ${gradeNumber}`;
  const subjectLabel = subjectRoute === "math" ? "Maths" : subjectRoute.charAt(0).toUpperCase() + subjectRoute.slice(1);
  const topicSubject = subjectRoute === "math" ? "maths" : subjectRoute;
  const dataPrefix = gradeNumber === 0 ? "Foundation" : `Year${gradeNumber}`;
  const dataName = `Skillr${dataPrefix}${subjectLabel}Data`;

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const short = (value, limit = 95) => {
    const clean = String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (clean.length <= limit) return clean;
    return `${clean.slice(0, limit - 1).replace(/\s+\S*$/, "")}…`;
  };
  const cleanHtmlText = (value) => short(String(value || "").replace(/<br\s*\/?>/gi, " • ").replace(/<[^>]+>/g, " "), 120);

  const DATA_FILES = {
    "0-math": ["/assets/foundation-maths-data-number.js?v=1", "/assets/foundation-maths-data-other.js?v=1"],
    "0-science": ["/assets/foundation-science-data.js?v=1"],
    "0-english": ["/assets/foundation-english-data.js?v=1"],
    "1-math": ["/assets/year1-maths-data.js?v=1"],
    "1-science": ["/assets/year1-science-data.js?v=1"],
    "1-english": ["/assets/year1-english-data.js?v=1"],
    "2-math": ["/assets/year2-maths-data.js?v=2", "/assets/year2-maths-data-extra.js?v=1"],
    "2-science": ["/assets/year2-science-data.js?v=1"],
    "2-english": ["/assets/year2-english-data.js?v=1"],
    "3-math": ["/assets/year3-maths-data-base.js?v=1", "/assets/year3-maths-data-n1.js?v=1", "/assets/year3-maths-data-n2.js?v=1", "/assets/year3-maths-data-n3.js?v=1", "/assets/year3-maths-data-a.js?v=1", "/assets/year3-maths-data-m1.js?v=1", "/assets/year3-maths-data-m2.js?v=1", "/assets/year3-maths-data-sp.js?v=1", "/assets/year3-maths-data-st.js?v=1", "/assets/year3-maths-data-p.js?v=1"],
    "3-science": ["/assets/year3-subject-data-base.js?v=1", "/assets/year3-science-data.js?v=1"],
    "3-english": ["/assets/year3-subject-data-base.js?v=1", "/assets/year3-english-data-la1.js?v=1", "/assets/year3-english-data-la2.js?v=1", "/assets/year3-english-data-la3a.js?v=1", "/assets/year3-english-data-la3b.js?v=1", "/assets/year3-english-data-le.js?v=1", "/assets/year3-english-data-ly1.js?v=1", "/assets/year3-english-data-ly2.js?v=1"],
    "4-math": ["/assets/year4-maths-data-base.js?v=4", "/assets/year4-maths-data-n1.js?v=4", "/assets/year4-maths-data-n2.js?v=4", "/assets/year4-maths-data-n3.js?v=4", "/assets/year4-maths-data-a.js?v=4", "/assets/year4-maths-data-m1.js?v=4", "/assets/year4-maths-data-m2.js?v=4", "/assets/year4-maths-data-sp.js?v=4", "/assets/year4-maths-data-st.js?v=4", "/assets/year4-maths-data-p.js?v=4"]
  };

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) { setTimeout(resolve, 160); return; }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function ensureData() {
    if (!window.SkillrConceptSvg) await loadScript("/assets/skillr-concept-svg.js?v=1");
    if (window[dataName]?.[code]) return;
    for (const file of DATA_FILES[`${gradeNumber}-${subjectRoute}`] || []) {
      if (!window[dataName]?.[code]) await loadScript(file);
    }
  }

  const getUnit = () => window[dataName]?.[code] || null;

  function topicUrl(unit) {
    const existing = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href") || "").find((href) => href.includes(`/${topicSubject}/`) && !href.includes("/quiz/"));
    if (existing) return existing;
    const yearPath = gradeNumber === 0 ? "foundation" : `year${gradeNumber}`;
    return unit?.slug ? `/${yearPath}/${topicSubject}/${unit.slug}/` : `/${yearPath}/curriculum/${topicSubject}/`;
  }

  function isFirstNations(text) {
    return /first nations|aboriginal|torres strait|indigenous knowledge|cultural knowledge/i.test(text || "");
  }

  async function elaborations(url) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) return [];
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const heading = [...doc.querySelectorAll("h2")].find((item) => item.textContent.trim().toLowerCase() === "curriculum coverage and elaborations");
      const scope = heading?.closest("section") || heading?.parentElement;
      if (!scope) return [];
      return [...scope.querySelectorAll("li")].map((li) => {
        const full = li.textContent.replace(/\s+/g, " ").trim();
        const match = full.match(/^(E\d+):\s*(.+)$/i);
        return match ? { label: match[1].toUpperCase(), text: match[2].trim() } : null;
      }).filter((item) => item && !isFirstNations(item.text));
    } catch {
      return [];
    }
  }

  function clusterElaborations(items, unit) {
    const groups = new Map();
    const definitions = [
      ["represent", "Models and representations", /represent|model|diagram|image|visual|material|number line|array|grid|chart|map|fold|construct|symbol|notation|layout|illustration/i],
      ["strategy", "Strategies and procedures", /calculate|strategy|algorithm|partition|regroup|solve|count|measure|convert|sequence|procedure|read fluently|spell|edit/i],
      ["application", "Applications and contexts", /money|financial|measurement|metre|litre|gram|time|daily|season|habitat|environment|practical|real-life|context|audience|purpose/i],
      ["investigate", "Investigation, data and tools", /investigat|experiment|survey|collect|data|observe|predict|digital|software|spreadsheet|record|evidence/i],
      ["reason", "Reasoning and communication", /explain|justify|compare|classif|order|interpret|discuss|communicat|evaluate|reason|relationship|effect/i]
    ];
    items.forEach((item) => {
      const found = definitions.find(([, , regex]) => regex.test(item.text)) || ["core", "Core concept and vocabulary"];
      const [key, title] = found;
      if (!groups.has(key)) groups.set(key, { key, title, labels: [], texts: [] });
      groups.get(key).labels.push(item.label);
      groups.get(key).texts.push(item.text);
    });
    if (!groups.size) {
      groups.set("core", { key:"core", title:"Core concept and vocabulary", labels:[code], texts:[unit.learn || unit.desc || unit.title] });
      groups.set("represent", { key:"represent", title:"Model and representation", labels:["Model"], texts:[unit.model_title || "Use the topic model"] });
      groups.set("application", { key:"application", title:"Application and transfer", labels:["Apply"], texts:[unit.apply_title || "Apply the concept in a new example"] });
    }
    return [...groups.values()].slice(0, 5);
  }

  function activities(unit) {
    return (unit.activities || []).map((activity, index) => typeof activity === "string" ? { title:`Activity ${index + 1}`, text:activity, visual:null } : activity);
  }

  function mistakes(unit) {
    return (unit.mistakes || []).map((item) => Array.isArray(item) ? item : [String(item), "Check the topic model and try again."]);
  }

  function routineFill(unit) {
    const parts = String(unit.routine || "Observe → Model → Apply → Check").split(/→|->/).map((part) => part.trim()).filter(Boolean);
    const index = Math.min(parts.length - 1, Math.max(1, Math.floor(parts.length / 2)));
    const answer = parts[index] || "Apply";
    const template = parts.map((part, i) => i === index ? "{{blank}}" : part).join(" → ");
    return { answer, template };
  }

  function learnFill(unit) {
    const sentence = String(unit.learn || unit.desc || "").split(/[.!?]/)[0].trim();
    const stop = new Set(["about","after","again","all","also","because","being","between","different","from","have","into","more","other","should","their","these","they","this","through","using","when","where","which","with","without"]);
    const candidates = String(unit.title || "").toLowerCase().match(/[a-z]{5,}/g) || [];
    const term = candidates.find((word) => !stop.has(word) && new RegExp(`\\b${word}\\b`, "i").test(sentence));
    if (!term) return routineFill(unit);
    return { answer:term, template:sentence.replace(new RegExp(`\\b${term}\\b`, "i"), "{{blank}}") };
  }

  function activityVisual(unit, activity) {
    if (activity?.visual_html) return activity.visual_html;
    if (typeof activity?.visual === "number" && unit.visuals?.[activity.visual]) {
      const image = unit.visuals[activity.visual];
      return `<figure class="pack-photo"><img src="${esc(image.src)}" alt="${esc(image.alt || activity.title)}"><figcaption>${esc(image.title || activity.title)}</figcaption></figure>`;
    }
    if (typeof activity?.visual === "string") return `<div class="pack-mini-model">${esc(activity.visual)}</div>`;
    return "";
  }

  const q = (type, question, extra = {}) => ({ type, question, ...extra });

  function uniqueOptions(correct, candidates) {
    const options = [correct, ...candidates].map((item) => short(item, 110)).filter(Boolean);
    return [...new Set(options)].slice(0, 4).concat(["Use a different rule without checking the model.", "Only the final answer matters."]).slice(0, 4);
  }

  function applicationQuestions(unit, clusters) {
    const acts = activities(unit);
    const mixups = mistakes(unit);
    const fill = routineFill(unit);
    const firstActivity = acts[0] || { title:"Use the model", text:(unit.quick || [])[0] || "Use the topic model in a new example." };
    const secondActivity = acts[1] || { title:"Apply the idea", text:(unit.quick || [])[1] || "Apply the idea in a different context." };
    const thirdActivity = acts[2] || { title:"Explain the idea", text:(unit.quick || [])[2] || "Explain how you know." };
    const correct = short(unit.learn || unit.desc || unit.title, 105);
    const distractors = mixups.slice(0,3).map(([name]) => name);
    const matchLeft = [firstActivity.title, secondActivity.title, thirdActivity.title];
    const matchRight = [short(thirdActivity.text,65), short(firstActivity.text,65), short(secondActivity.text,65)];
    const clusterNames = clusters.slice(0,3).map((cluster) => cluster.title).join(", ");
    return [
      q("single","Which statement best explains the topic model?",{answers:uniqueOptions(correct,distractors),visual:"concept"}),
      q("fill-blank","Complete the topic routine.",{template:fill.template}),
      q("match","Match each activity to what the student does.",{matchLeft,matchRight}),
      q("text",short(firstActivity.text,150),{visualHtml:activityVisual(unit,firstActivity)}),
      q("text",short(secondActivity.text,150),{visualHtml:activityVisual(unit,secondActivity)}),
      q("text",`Use the application model: ${short(unit.apply_title || "Apply the idea",100)}. Show a new example.`,{visualHtml:unit.apply_html || ""}),
      q("text",`Correct this mix-up: “${short(mixups[0]?.[0] || "the model changes the rule",90)}”. Explain the correct idea.`),
      q("text",`How are “${short(unit.model_title || "the model",65)}” and “${short(unit.apply_title || "the application",65)}” connected?`),
      q("text",`Create one visual example that connects ${clusterNames || "the main topic ideas"}. Label the important parts.`,{enrichment:true}),
      q("text","Change one part or condition in the model. Predict what changes, what stays the same and how you would check.",{enrichment:true})
    ];
  }

  function masteryQuestions(unit, clusters) {
    const quick = [...(unit.quick || [])];
    while (quick.length < 4) quick.push(`Use the topic model to show ${unit.title || "the concept"}.`);
    const mixups = mistakes(unit);
    const second = mixups[1] || mixups[0] || ["a common mix-up","Use the topic model and evidence."];
    const otherFixes = mixups.filter((item) => item !== second).map(([,fix]) => fix);
    const fill = learnFill(unit);
    const matchClusters = clusters.slice(0,4);
    const left = matchClusters.map((cluster) => cluster.title);
    const right = matchClusters.map((cluster) => short(cluster.texts.join(" "),72)).reverse();
    const clusterNames = clusters.map((cluster) => cluster.title).join(" → ");
    return [
      q("text",short(quick[0],150),{visual:"concept"}),
      q("text",short(quick[1],150)),
      q("text",short(quick[2],150)),
      q("text",short(quick[3],150)),
      q("single",`Which response best corrects “${short(second[0],80)}”?`,{answers:uniqueOptions(second[1],otherFixes)}),
      q("match","Match each connected concept cluster to its curriculum focus.",{matchLeft:left.length ? left : ["Core concept","Model","Application"],matchRight:right.length ? right : ["new context","visual representation","main relationship"]}),
      q("fill-blank","Complete the key idea.",{template:fill.template}),
      q("text",`Use one example to connect the full pathway: ${clusterNames || "model → apply → explain"}. Show how you know.`),
      q("text","Create a new challenge that tests more than one concept cluster. Solve it and justify the check you used.",{enrichment:true}),
      q("text","Write an incorrect solution that contains one believable misconception. Then diagnose and correct every error.",{enrichment:true})
    ];
  }

  function ensureStyle() {
    if (document.getElementById("skillr-worksheet-pack-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-worksheet-pack-style";
    style.textContent = `
      .skillr-pack-links{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:9px}.skillr-pack-links strong{width:100%;font-size:.8rem;letter-spacing:.03em;text-transform:uppercase}.skillr-pack-link{display:inline-flex;align-items:center;justify-content:center;border:1px solid currentColor;border-radius:999px;padding:9px 13px;font-weight:900;text-decoration:none}.skillr-pack-meta{margin-top:9px;font-size:.84rem;font-weight:750}.pack-preview-shell{max-width:1020px;margin:0 auto;padding:16px;color:#203047;font-family:Arial,Helvetica,sans-serif}.pack-preview-actions{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 13px}.pack-preview-actions button,.pack-preview-actions a{border:0;border-radius:999px;padding:9px 13px;background:#2457d6;color:#fff;text-decoration:none;font-weight:900;cursor:pointer}.pack-preview-actions a{background:#edf2f7;color:#173968;border:1px solid #cbd8e8}.pack-paper{position:relative;margin:0 auto 16px;background:#fff;border:2px solid #2457d6;border-radius:13px;padding:14px;overflow:hidden}.pack-paper+.pack-paper{break-before:page;page-break-before:always}.pack-watermark{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none}.pack-watermark span{display:grid;place-items:center;transform:rotate(-25deg);color:rgba(36,87,214,.055);font-size:.72rem;font-weight:900}.pack-paper>*:not(.pack-watermark){position:relative;z-index:1}.pack-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin:-14px -14px 10px;padding:10px 14px;background:#173968;color:#fff}.pack-head h1{margin:2px 0;font-size:1.2rem;color:#fff}.pack-head p{margin:2px 0}.pack-brand{font-weight:900;color:#dce9ff}.pack-sheet-label{font-size:.78rem;font-weight:900;text-transform:uppercase}.pack-clusters{display:flex;gap:5px;flex-wrap:wrap;margin:7px 0 9px}.pack-clusters span{border:1px solid #b8cbea;border-radius:999px;padding:4px 7px;font-size:.69rem;font-weight:850;color:#173968}.pack-visual-reference{display:grid;grid-template-columns:1.25fr 1fr;gap:8px;margin:8px 0 10px;break-inside:avoid}.pack-concept-svg{border:1px solid #c9d9ee;border-radius:10px;padding:5px;background:#f8fbff;overflow:hidden}.pack-concept-svg .skillr-concept-svg{display:block;width:100%;height:auto;max-height:190px}.pack-existing-model{display:grid;gap:6px;border:1px solid #d8e2ef;border-radius:10px;padding:7px;background:#fff;overflow:hidden}.pack-existing-model h3{margin:0;font-size:.72rem;color:#2457d6;text-transform:uppercase}.pack-existing-model .model,.pack-existing-model .math-model-board,.pack-existing-model .science-model-board,.pack-existing-model .y3-vector-board,.pack-existing-model .y3-subject-board,.pack-existing-model .y4-maths-board{margin:0!important;padding:7px!important;border:1px solid #d9e5f5!important;border-radius:8px!important;background:#fff!important;font-size:.76rem!important}.pack-existing-model p{margin:3px 0;font-size:.72rem}.pack-question-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 16px}.pack-question{padding:8px 0 10px;border-bottom:1px solid #dbe4ef;break-inside:avoid}.pack-question-line{display:flex;align-items:flex-start;gap:6px}.pack-question-number{font-weight:900;color:#173968}.pack-question-prompt{margin:0;font-size:.9rem;font-weight:800;line-height:1.34}.pack-question-visual{margin:6px 0 5px 23px}.pack-mini-model{border:1px solid #cbd9eb;border-radius:8px;background:#f8fbff;padding:7px;font-weight:800;text-align:center}.pack-photo{margin:0;display:grid;grid-template-columns:88px 1fr;gap:7px;align-items:center}.pack-photo img{width:88px;height:62px;object-fit:cover;border-radius:7px}.pack-photo figcaption{font-size:.74rem;font-weight:800}.pack-options{display:flex;flex-wrap:wrap;gap:5px 12px;margin:6px 0 0 23px;font-size:.8rem}.pack-fill{margin:7px 0 0 23px;font-weight:800}.pack-blank{display:inline-block;min-width:55px;border-bottom:2px solid #64748b}.pack-match{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:6px 0 0 23px;font-size:.76rem}.pack-match p{margin:2px 0}.pack-lines{display:grid;gap:5px;margin:6px 0 0 23px}.pack-lines span{height:12px;border-bottom:1px solid #8090a6}.pack-enrichment-label{display:inline-block;border-radius:999px;background:#eef5ff;border:1px solid #9db9e4;padding:2px 6px;font-size:.62rem;font-weight:900;color:#173968}.pack-footer{display:flex;justify-content:space-between;gap:10px;margin:10px -14px -14px;padding:8px 14px;border-top:1px solid #a9c1e5;font-size:.72rem}.pack-extension-note{margin:5px 0 9px;border-left:4px solid #2457d6;padding:6px 8px;background:#f8fbff;font-size:.78rem;font-weight:750}@media(max-width:720px){.pack-visual-reference,.pack-question-grid,.pack-match{grid-template-columns:1fr}.pack-head{display:block}}@page{size:Letter portrait;margin:8mm}@media print{body{background:#fff!important}.pack-preview-actions{display:none!important}.pack-preview-shell{padding:0;max-width:none}.pack-paper{border-radius:0;box-shadow:none;margin:0;min-height:250mm}.print-core .pack-extension{display:none!important}.print-extension .pack-core{display:none!important}.pack-existing-model,.pack-concept-svg{background:#fff!important}}
    `;
    document.head.appendChild(style);
  }

  function questionHtml(question, index) {
    let response = "";
    if (question.type === "single") response = `<div class="pack-options">${(question.answers || []).map((answer,i)=>`<span><strong>[${String.fromCharCode(65+i)}]</strong> ${esc(answer)}</span>`).join("")}</div>`;
    else if (question.type === "fill-blank") response = `<div class="pack-fill">${esc(question.template || "").replaceAll("{{blank}}",'<span class="pack-blank"></span>')}</div>`;
    else if (question.type === "match") response = `<div class="pack-match"><div>${(question.matchLeft||[]).map((item,i)=>`<p><strong>${String.fromCharCode(65+i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight||[]).map((item,i)=>`<p><strong>${i+1}.</strong> ${esc(item)}</p>`).join("")}</div></div>`;
    else response = `<div class="pack-lines">${Array.from({length:question.enrichment ? 6 : (gradeNumber <= 1 ? 2 : 3)},()=>"<span></span>").join("")}</div>`;
    const visual = question.visualHtml ? `<div class="pack-question-visual">${question.visualHtml}</div>` : "";
    return `<article class="pack-question"><div class="pack-question-line"><span class="pack-question-number">${index+1}.</span>${question.enrichment?'<span class="pack-enrichment-label">Enrichment</span>':""}<p class="pack-question-prompt">${esc(question.question)}</p></div>${visual}${response}</article>`;
  }

  const watermark = () => `<div class="pack-watermark" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div>`;

  function paperHtml(unit, kind, questions, clusters, url) {
    const isExtension = kind === "extension";
    const title = sheetParam === "mastery" ? "Mixed Mastery Worksheet" : "Visual Application Worksheet";
    const conceptSvg = window.SkillrConceptSvg?.render(unit, subjectLabel, code) || "";
    const model = unit.model_html || "";
    const apply = unit.apply_html || "";
    const list = isExtension ? questions.filter((item)=>item.enrichment) : questions.filter((item)=>!item.enrichment);
    const start = isExtension ? 8 : 0;
    return `<section class="pack-paper ${isExtension?"pack-extension":"pack-core"}">${watermark()}<header class="pack-head"><div><div class="pack-brand">SkillrHub F–10</div><h1>${esc(code)} — ${esc(unit.title || "Curriculum Worksheet")}</h1><div class="pack-sheet-label">${isExtension?`${title} • Enrichment extension`:title}</div></div><p>Name: ____________________<br>Date: ____________</p></header>${isExtension?'<p class="pack-extension-note">Optional extension: compare, create, generalise and justify using the same topic concepts.</p>':`<div class="pack-clusters">${clusters.map((cluster)=>`<span>${esc(cluster.title)}</span>`).join("")}</div><div class="pack-visual-reference"><div class="pack-concept-svg">${conceptSvg}</div><div class="pack-existing-model"><h3>Topic-page model</h3>${sheetParam==="mastery"?(apply||model):(model||apply)}</div></div>`}<div class="pack-question-grid">${list.map((question,i)=>questionHtml(question,start+i)).join("")}</div><footer class="pack-footer"><span><strong>SkillrHub F–10</strong> • ${esc(gradeLabel)} ${esc(subjectLabel)}</span><span>skillrhub.com</span></footer></section>`;
  }

  function renderPreview(unit, questions, clusters, url) {
    ensureStyle();
    const title = sheetParam === "mastery" ? "Mixed Mastery Worksheet" : "Visual Application Worksheet";
    document.title = `${code} ${title} | SkillrHub`;
    document.body.innerHTML = `<div class="pack-preview-shell"><nav class="pack-preview-actions"><button type="button" data-print="core">Print or save core PDF</button><button type="button" data-print="extension">Print or save enrichment PDF</button><a href="${esc(location.pathname)}">Back to worksheet pack</a><a href="${esc(url)}">Back to topic</a></nav>${paperHtml(unit,"core",questions,clusters,url)}${paperHtml(unit,"extension",questions,clusters,url)}</div>`;
    const print = (mode) => {
      document.body.classList.remove("print-core","print-extension");
      document.body.classList.add(mode === "extension" ? "print-extension" : "print-core");
      window.print();
    };
    document.querySelectorAll("[data-print]").forEach((button)=>button.addEventListener("click",()=>print(button.dataset.print)));
    window.addEventListener("afterprint",()=>document.body.classList.remove("print-core","print-extension"));
  }

  function enhanceCore(unit, clusters, hasMastery) {
    const actions = document.querySelector(".worksheet-actions");
    if (!actions || document.querySelector(".skillr-pack-links")) return false;
    ensureStyle();
    const wrapper = document.createElement("div");
    wrapper.className = "skillr-pack-links";
    wrapper.innerHTML = `<strong>Worksheet pack</strong><a class="skillr-pack-link" href="${location.pathname}?sheet=application" target="_blank" rel="noopener">Preview visual application</a>${hasMastery?`<a class="skillr-pack-link" href="${location.pathname}?sheet=mastery" target="_blank" rel="noopener">Preview mixed mastery</a>`:""}`;
    actions.insertAdjacentElement("afterend",wrapper);
    const meta = document.querySelector(".worksheet-meta");
    if (meta && !meta.querySelector("[data-pack-count]")) {
      const pill = document.createElement("span");
      pill.dataset.packCount = "true";
      pill.textContent = `${hasMastery ? 3 : 2}-worksheet pack`;
      meta.appendChild(pill);
    }
    const note = document.createElement("p");
    note.className = "skillr-pack-meta";
    note.textContent = `Core stays unchanged. Additional sheets connect ${clusters.map((cluster)=>cluster.title).join(", ")}.`;
    wrapper.insertAdjacentElement("afterend",note);
    return true;
  }

  async function waitForPage() {
    for (let i=0;i<60;i++) {
      if (getUnit() && document.querySelector(".worksheet-hero,.worksheet-paper")) return true;
      await new Promise((resolve)=>setTimeout(resolve,100));
    }
    return Boolean(getUnit());
  }

  async function init() {
    try {
      await ensureData();
      await waitForPage();
      const unit = getUnit();
      if (!unit) return;
      const url = topicUrl(unit);
      const strands = await elaborations(url);
      const clusters = clusterElaborations(strands,unit);
      const hasMastery = strands.length >= 4 || (gradeNumber >= 2 && clusters.length >= 3) || (gradeNumber >= 3 && (unit.mastery || []).length >= 5);
      if (sheetParam === "application") renderPreview(unit,applicationQuestions(unit,clusters),clusters,url);
      else if (sheetParam === "mastery" && hasMastery) renderPreview(unit,masteryQuestions(unit,clusters),clusters,url);
      else enhanceCore(unit,clusters,hasMastery);
    } catch (error) {
      console.error("Skillr worksheet pack setup failed:",error);
    }
  }

  init();
})();
