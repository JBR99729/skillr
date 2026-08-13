(() => {
  "use strict";

  if (window.__skillrMultiStrandWorksheetPackLoaded) return;
  window.__skillrMultiStrandWorksheetPackLoaded = true;

  const match = location.pathname.match(/^\/quiz\/(grade-k|year-\d+)\/(math|maths|science|english)\/(ac9[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;

  const levelPath = match[1].toLowerCase();
  const subjectRoute = match[2].toLowerCase();
  const subject = subjectRoute === "math" ? "maths" : subjectRoute;
  const code = match[3].toUpperCase();
  const yearNumber = levelPath === "grade-k" ? 0 : Number(levelPath.replace("year-", ""));
  const yearLabel = yearNumber === 0 ? "Foundation" : `Year ${yearNumber}`;
  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function findUnit() {
    const candidates = Object.keys(window).filter((key) => /^Skillr(?:Foundation|Year\d+).+Data$/.test(key));
    for (const key of candidates) {
      const record = window[key]?.[code];
      if (record) return record;
    }
    return null;
  }

  function topicPath(unit) {
    const year = yearNumber === 0 ? "foundation" : `year${yearNumber}`;
    return `/${year}/${subject}/${unit.slug}/`;
  }

  function ensureStyle() {
    if (document.getElementById("skillr-multi-worksheet-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-multi-worksheet-style";
    style.textContent = `
      .worksheet-pack-note{width:100%;margin:7px 0 0;color:#53677f;font-size:.79rem;line-height:1.35}.worksheet-pack-button{position:relative}.worksheet-pack-button::after{content:"New";position:absolute;right:-5px;top:-8px;border-radius:999px;background:#eef5ff;color:#2457d6;border:1px solid #bfd0ed;padding:2px 5px;font-size:.55rem;font-weight:900;text-transform:uppercase}.worksheet-pack-coverage{display:flex;flex-wrap:wrap;gap:5px;width:100%;margin-top:5px}.worksheet-pack-coverage span{border-radius:999px;background:#f7faff;border:1px solid #d7e3fb;color:#173968;padding:3px 6px;font-size:.65rem;font-weight:850}
    `;
    document.head.appendChild(style);
  }

  function compact(value, limit = 105) {
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    if (clean.length <= limit) return clean;
    return `${clean.slice(0, limit - 1).replace(/\s+\S*$/, "")}…`;
  }

  function subjectWords() {
    if (subject === "science") return { representation:"labelled scientific model", transfer:"new investigation or real-world system", evidence:"observations or measurements", verify:"evidence and a fair comparison" };
    if (subject === "english") return { representation:"short text, diagram or multimodal example", transfer:"new text, audience or purpose", evidence:"specific words, structures or image details", verify:"text evidence and an explanation of effect" };
    return { representation:"diagram, model or number sentence", transfer:"new mathematical situation", evidence:"calculations, labels or relationships", verify:"an estimate, inverse, equivalent form or counterexample" };
  }

  function optionSet(correct, clusters) {
    const choices = [correct, ...clusters.map((cluster) => cluster.title).filter((title) => title !== correct), "An unrelated detail", "A guess without evidence"];
    return [...new Set(choices)].slice(0, 4);
  }

  function makeApplicationQuestions(unit, clusters) {
    const words = subjectWords();
    const first = clusters[0];
    const second = clusters[1] || clusters[0];
    const last = clusters[clusters.length - 1] || first;
    const mistake = unit.mistakes?.[0] || ["The main relationship is ignored", "Return to the model and identify the deciding feature."];
    const matchItems = clusters.slice(0, 3);
    return [
      { type:"choice", prompt:`Which concept cluster best helps with this task: ${compact(second.summary[0] || second.connection, 95)}`, options:optionSet(second.title, clusters) },
      { type:"fill", prompt:`Complete the idea from “${first.title}”.`, text:`The important relationship is ______________________________ because ______________________________.` },
      { type:"match", prompt:"Match each concept cluster to the learning focus.", left:matchItems.map((cluster) => cluster.title), right:matchItems.map((cluster) => compact(cluster.summary[0] || cluster.connection, 72)).reverse() },
      { type:"response", prompt:`Create a ${words.representation} that demonstrates: ${compact(first.summary[0] || first.connection, 115)} Label the important parts.` , lines:yearNumber <= 2 ? 4 : 6 },
      { type:"response", prompt:`Apply the same idea in a ${words.transfer}. Explain what changes and what must stay mathematically, scientifically or linguistically the same.`, lines:yearNumber <= 2 ? 4 : 6 },
      { type:"response", prompt:`Connect “${first.title}” and “${second.title}”. Give one relationship between them and one important difference.`, lines:yearNumber <= 2 ? 4 : 6 },
      { type:"response", prompt:`A student shows this mix-up: “${mistake[0]}”. Explain the problem and correct it using ${words.evidence}.`, lines:yearNumber <= 2 ? 4 : 6 },
      { type:"response", prompt:`Use at least two concept clusters to explain or solve a new example. Finish by checking the response with ${words.verify}.`, lines:yearNumber <= 2 ? 5 : 8 }
    ];
  }

  function makeMasteryQuestions(unit, clusters) {
    const words = subjectWords();
    const first = clusters[0];
    const middle = clusters[Math.floor(clusters.length / 2)] || first;
    const last = clusters[clusters.length - 1] || first;
    const mistake = unit.mistakes?.[1] || unit.mistakes?.[0] || ["One example is treated as the complete rule", "Test the idea in another representation or context."];
    const routine = String(unit.routine || "notice → model → apply → explain").split("→").map((part) => part.trim()).filter(Boolean);
    const correctEvidence = compact(last.evidence?.replace(/ Coverage:.*/, "") || "A response that applies the idea and justifies it with relevant evidence.", 105);
    return [
      { type:"response", prompt:`Create a concept map linking ${clusters.map((cluster) => cluster.title).join(", ")}. Use arrows and short labels to show how the ideas support one another.`, lines:yearNumber <= 2 ? 5 : 7 },
      { type:"choice", prompt:"Which response gives the strongest evidence of whole-topic mastery?", options:[correctEvidence,"A correct guess with no model or explanation.","Repeating one memorised example only.","Naming a term without showing how it is used."] },
      { type:"fill", prompt:"Complete the learning routine.", text:`${routine[0] || "Notice"} → __________________ → ${routine[routine.length - 1] || "Explain"}` },
      { type:"response", prompt:`Use “${middle.title}” in an unfamiliar example. State the important condition, complete the task and interpret the result.`, lines:yearNumber <= 2 ? 4 : 7 },
      { type:"response", prompt:`Show the idea from “${first.title}” in two different representations. Explain exactly how the parts correspond.`, lines:yearNumber <= 2 ? 5 : 7 },
      { type:"response", prompt:`Compare two possible strategies, explanations or text choices for “${last.title}”. Decide which is clearer or more efficient and justify the decision.`, lines:yearNumber <= 2 ? 4 : 7 },
      { type:"response", prompt:`Correct this misconception: “${mistake[0]}”. Include a counterexample, corrected model or evidence statement.`, lines:yearNumber <= 2 ? 4 : 7 },
      { type:"response", prompt:`Write a final whole-topic explanation for another student. It must connect every concept cluster and include ${words.evidence} plus a check using ${words.verify}.`, lines:yearNumber <= 2 ? 6 : 10 }
    ];
  }

  function renderQuestion(question, index) {
    if (question.type === "choice") {
      return `<article class="question"><div class="question-line"><b>${index + 1}.</b><p>${esc(question.prompt)}</p></div><div class="options">${question.options.map((option, optionIndex) => `<span><strong>[${String.fromCharCode(65 + optionIndex)}]</strong> ${esc(option)}</span>`).join("")}</div></article>`;
    }
    if (question.type === "fill") {
      return `<article class="question"><div class="question-line"><b>${index + 1}.</b><p>${esc(question.prompt)}</p></div><p class="fill">${esc(question.text)}</p></article>`;
    }
    if (question.type === "match") {
      return `<article class="question"><div class="question-line"><b>${index + 1}.</b><p>${esc(question.prompt)}</p></div><div class="match"><div>${question.left.map((item, itemIndex) => `<p><strong>${String.fromCharCode(65 + itemIndex)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${question.right.map((item, itemIndex) => `<p><strong>${itemIndex + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-answer">Matches: ______________________________</p></article>`;
    }
    return `<article class="question"><div class="question-line"><b>${index + 1}.</b><p>${esc(question.prompt)}</p></div><div class="lines">${Array.from({length:question.lines || 5},()=>"<span></span>").join("")}</div></article>`;
  }

  function openPreview(unit, result, sheetNumber, title, questions) {
    const preview = window.open("", "_blank");
    if (!preview) return;
    const svg = window.SkillrConceptSvg?.render(unit, subject, code) || "";
    const clusterPills = result.clusters.map((cluster) => `<span>${esc(cluster.title)} (${cluster.labels.join(", ")})</span>`).join("");
    preview.document.open();
    preview.document.write(`<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(code)} ${esc(title)} Preview</title><style>
      @page{size:Letter portrait;margin:8mm}*{box-sizing:border-box}body{margin:0;background:#eef2f7;color:#203047;font-family:Arial,Helvetica,sans-serif}.toolbar{position:sticky;top:0;z-index:10;display:flex;justify-content:center;gap:8px;padding:9px;background:#173968}.toolbar button{border:0;border-radius:999px;padding:8px 13px;background:#fff;color:#173968;font-weight:900;cursor:pointer}.paper{position:relative;width:215.9mm;min-height:279.4mm;margin:12px auto;background:#fff;border:1.5px solid #2457d6;padding:10mm;box-shadow:0 10px 28px rgba(23,57,104,.15);overflow:hidden}.watermark{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none}.watermark span{display:grid;place-items:center;transform:rotate(-24deg);font-size:10px;font-weight:900;color:rgba(36,87,214,.045)}.content{position:relative}.brand{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #2457d6;padding-bottom:6px}.brand h1{margin:0;color:#2457d6;font-size:19px}.brand h1 span{color:#173968}.brand p{margin:2px 0 0;font-size:11px;font-weight:800}h2{font-size:16px;margin:9px 0 3px;color:#173968}.intro{margin:0 0 7px;font-size:10.5px;line-height:1.35}.clusters{display:flex;flex-wrap:wrap;gap:4px;margin:5px 0 8px}.clusters span{border:1px solid #cbd9eb;border-radius:999px;background:#f7faff;padding:3px 6px;font-size:8px;font-weight:850}.visual{border:1px solid #cbd9eb;border-radius:9px;background:#f8fbff;padding:4px;margin:5px 0 8px;break-inside:avoid}.visual svg{display:block;width:100%;height:auto;max-height:105px}.question{break-inside:avoid;border-bottom:1px solid #dce5ef;padding:5px 0}.question-line{display:flex;align-items:flex-start;gap:5px}.question-line>b{color:#173968}.question-line p{margin:0;flex:1;font-size:10.5px;line-height:1.32}.options{display:flex;flex-wrap:wrap;gap:4px 12px;margin:4px 0 0 16px}.options span{font-size:9.5px}.fill{margin:5px 0 0 16px;font-size:10px;font-weight:800}.match{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-left:16px}.match p,.match-answer{margin:3px 0;font-size:9.5px}.lines{margin-left:16px}.lines span{display:block;height:5.2mm;border-bottom:1px solid #93a4ba}.footer{display:flex;justify-content:space-between;border-top:1px solid #2457d6;padding-top:5px;margin-top:8px;font-size:8px;font-weight:800;color:#53677f}@media print{body{background:#fff}.toolbar{display:none}.paper{width:auto;min-height:auto;margin:0;border:1.5px solid #2457d6;box-shadow:none}.visual{background:#fff}}
    </style></head><body><div class="toolbar"><button onclick="window.print()">Print or save PDF</button><button onclick="window.close()">Close preview</button></div><main class="paper"><div class="watermark" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="content"><header class="brand"><div><h1>SkillrHub <span>F–10</span></h1><p>${esc(yearLabel)} ${esc(subjectLabel)} • ${esc(code)}</p></div></header><h2>Worksheet ${sheetNumber} — ${esc(title)}</h2><p class="intro">Name: ______________________________ &nbsp;&nbsp; Date: ______________<br>This sheet extends the existing core worksheet and checks connected curriculum ideas. Show or explain your reasoning where requested.</p><div class="clusters">${clusterPills}</div>${svg ? `<div class="visual">${svg}</div>` : ""}<section>${questions.map((question,index)=>renderQuestion(question,index)).join("")}</section><footer class="footer"><span>SkillrHub F–10 • ${esc(yearLabel)} ${esc(subjectLabel)}</span><span>Worksheet ${sheetNumber} • skillrhub.com</span></footer></div></main></body></html>`);
    preview.document.close();
  }

  function install(unit, result) {
    const actions = document.querySelector(".worksheet-actions, .worksheet-action-row, .page-actions");
    if (!actions || actions.dataset.multiStrandPack === "true") return false;
    const needsSecond = result.required.length >= 2 && result.clusters.length >= 2;
    const needsThird = result.required.length >= 5 || result.clusters.length >= 3;
    if (!needsSecond) return true;
    ensureStyle();
    actions.dataset.multiStrandPack = "true";

    const second = document.createElement("button");
    second.type = "button";
    second.className = "secondary worksheet-pack-button";
    second.textContent = "Preview Worksheet 2 — Application";
    second.addEventListener("click", () => openPreview(unit, result, 2, "Application and Connections", makeApplicationQuestions(unit, result.clusters)));
    actions.appendChild(second);

    if (needsThird) {
      const third = document.createElement("button");
      third.type = "button";
      third.className = "secondary worksheet-pack-button";
      third.textContent = "Preview Worksheet 3 — Mixed Mastery";
      third.addEventListener("click", () => openPreview(unit, result, 3, "Mixed Mastery and Reasoning", makeMasteryQuestions(unit, result.clusters)));
      actions.appendChild(third);
    }

    const note = document.createElement("p");
    note.className = "worksheet-pack-note";
    note.textContent = needsThird ? "Worksheet 1 builds the core concept. Worksheet 2 applies connected strands. Worksheet 3 checks mixed mastery." : "Worksheet 1 builds the core concept. Worksheet 2 applies the connected curriculum strands.";
    actions.appendChild(note);
    const coverage = document.createElement("div");
    coverage.className = "worksheet-pack-coverage";
    coverage.innerHTML = result.clusters.map((cluster) => `<span>${esc(cluster.title)}</span>`).join("");
    actions.appendChild(coverage);
    return true;
  }

  function start() {
    const unit = findUnit();
    const core = window.SkillrCurriculumClusterCore;
    if (!unit || !core) return false;
    fetch(topicPath(unit), { cache:"no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Topic page returned ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const elaborations = core.extractElaborations(doc);
        const result = core.clusterElaborations(elaborations, { yearLabel, subject });
        install(unit, result);
      })
      .catch((error) => console.warn("Skillr worksheet pack could not load:", error));
    return true;
  }

  if (start()) return;
  const observer = new MutationObserver(() => {
    if (start()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList:true, subtree:true });
  setTimeout(() => observer.disconnect(), 14000);
})();
