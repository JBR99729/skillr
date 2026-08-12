(() => {
  "use strict";

  if (window.__skillrYear4MathsSlideStrandsLoaded) return;
  window.__skillrYear4MathsSlideStrandsLoaded = true;

  const root = document.getElementById("slideRoot");
  const toolbar = document.querySelector(".toolbar");
  const params = new URLSearchParams(location.search);
  const code = (params.get("code") || "AC9M4N01").toUpperCase();
  const unit = window.SkillrYear4MathsData?.[code];
  if (!root || !toolbar || !unit) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[char]));

  function ensureStyle() {
    if (document.getElementById("skillr-year4-slide-strands-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year4-slide-strands-style";
    style.textContent = `
      .slide-controls{display:inline-flex;align-items:center;gap:7px;margin-left:8px;vertical-align:middle}.slide-controls button{border:1px solid #cbd8e8;background:#fff;color:#173968;border-radius:999px;padding:8px 11px;font-weight:850;cursor:pointer}.slide-controls button:disabled{opacity:.4;cursor:default}.slide-controls span{min-width:90px;text-align:center;font-size:.78rem;font-weight:850;color:#5d6c80}.teacher-slide-panel[hidden]{display:none!important}.teacher-slide-panel{min-height:620px}.strand-slide-hero{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;background:#173968;color:#fff;border-radius:12px;padding:13px;margin-bottom:10px}.strand-slide-hero h1{margin:0;font-size:1.45rem}.strand-slide-hero p{margin:4px 0 0;font-size:.82rem}.strand-slide-hero strong{display:block;font-size:.76rem;text-transform:uppercase;letter-spacing:.04em}.teacher-strand-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.teacher-strand-card{border:1px solid #d8e2ef;border-radius:12px;background:#fff;padding:10px}.teacher-strand-card__head{display:flex;gap:7px;align-items:flex-start;margin-bottom:5px}.teacher-strand-card__code{display:grid;place-items:center;min-width:34px;height:26px;border-radius:999px;background:#2457d6;color:#fff;font-size:.69rem;font-weight:900}.teacher-strand-card h2{margin:1px 0 0;font-size:.87rem;color:#173968;line-height:1.28}.teacher-strand-card p{margin:5px 0;font-size:.72rem;line-height:1.35}.teacher-strand-card .emphasis{border-left:3px solid #9dbcf6;padding-left:7px}.teacher-strand-card .evidence{background:#f7fbf8;border:1px solid #d7eadc;border-radius:8px;padding:6px}.teacher-strand-footer{margin-top:9px;border:1px solid #ead9ae;background:#fffaf0;border-radius:10px;padding:8px 10px;font-size:.72rem;line-height:1.35}.teacher-strand-footer strong{color:#815d00}.teacher-slide-watermark{position:absolute;inset:0;z-index:-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(5,minmax(0,1fr));align-items:center;justify-items:center;overflow:hidden;pointer-events:none}.teacher-slide-watermark span{transform:rotate(-24deg);white-space:nowrap;font:900 15px/1 Arial,Helvetica,sans-serif;color:rgba(36,87,214,.05)}@media(max-width:900px){.teacher-strand-grid{grid-template-columns:1fr}.teacher-slide-panel{min-height:auto}.slide-controls{display:flex;margin:8px 0 0}}
    `;
    document.head.appendChild(style);
  }

  function extractElaborations(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const heading = [...doc.querySelectorAll("h2")].find((element) => element.textContent.trim().toLowerCase() === "curriculum coverage and elaborations");
    const scope = heading?.closest("section") || heading?.parentElement;
    if (!scope) return [];
    return [...scope.querySelectorAll("li")].map((li) => {
      const text = li.textContent.replace(/\s+/g, " ").trim();
      const match = text.match(/^(E\d+):\s*(.+)$/i);
      return match ? { label: match[1].toUpperCase(), text: match[2].trim() } : null;
    }).filter(Boolean);
  }

  function shortText(text) {
    const clean = text.replace(/\s*\(teaching context\)\s*/gi, "").trim();
    const first = clean.split(/;\s*(?:for example|including)|\.\s+/i)[0];
    return first.length > 145 ? `${first.slice(0, 142).replace(/\s+\S*$/, "")}…` : first;
  }

  function emphasis(text) {
    const lower = text.toLowerCase();
    if (/first nations|aboriginal|torres strait/.test(lower)) return "Retain the exact Australian cultural context. Use authorised, respectful sources and avoid treating one example as representative of every community.";
    if (/money|dollars|cents|coins|notes|financial|price|cost|budget/.test(lower)) return "Make the place-value or operation structure explicit. AUD can remain as the curriculum example; a local-currency example may be added in parallel.";
    if (/digital tool|spreadsheet|software|virtual/.test(lower)) return "Establish the mathematics first, then use the tool to test, display or verify the relationship.";
    if (/investigat|experiment|collect|survey|data/.test(lower)) return "Use a clear question, consistent method, recorded evidence and a conclusion limited to the data.";
    if (/estimate|round|approximat|reasonable/.test(lower)) return "Ask students to select the level of accuracy, state the method and compare the estimate with an exact or measured result.";
    if (/compare|order|classif|sort/.test(lower)) return "Compare at least two examples and name the mathematical feature that decides the order or classification.";
    if (/bar|grid|number line|array|material|model|diagram|representation|fold|tile|counter|straw/.test(lower)) return "Connect each part of the concrete or visual model directly to the notation, vocabulary and numerical relationship.";
    if (/create|design|construct|generate|make/.test(lower)) return "Include a transfer task where students create an example and verify that it satisfies the conditions.";
    if (/solve|problem|modelling|context/.test(lower)) return "Formulate the context mathematically, solve, check constraints and interpret the answer with units.";
    return "Teach this elaboration through a worked example, a student explanation and a new transfer example rather than leaving it as reference wording.";
  }

  function evidence(text) {
    const lower = text.toLowerCase();
    if (/compare|order|classif|sort/.test(lower)) return "Student compares, records and justifies using a stated feature.";
    if (/investigat|experiment|collect|survey|data/.test(lower)) return "Student records evidence and gives a conclusion supported by the investigation.";
    if (/create|design|construct|generate|make/.test(lower)) return "Student creates, labels and verifies an original example.";
    if (/estimate|round|approximat/.test(lower)) return "Student states precision, estimates and explains reasonableness.";
    if (/digital tool|spreadsheet|software|virtual/.test(lower)) return "Student explains the setup and validates the digital output independently.";
    if (/model|represent|diagram|number line|array|grid|material/.test(lower)) return "Student connects at least two representations and explains correspondence.";
    return "Student applies the idea to a new example and justifies the relationship.";
  }

  function chunk(items, size) {
    const result = [];
    for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size));
    return result;
  }

  function installPanels(elaborations) {
    if (!elaborations.length || root.dataset.strandSlidesReady === "true") return;
    ensureStyle();
    root.dataset.strandSlidesReady = "true";

    const core = document.createElement("section");
    core.className = "teacher-slide-panel is-active";
    core.dataset.slideTitle = "Core lesson";
    while (root.firstChild) core.appendChild(root.firstChild);
    root.appendChild(core);

    const groups = chunk(elaborations, 4);
    groups.forEach((group, groupIndex) => {
      const panel = document.createElement("section");
      panel.className = "teacher-slide-panel";
      panel.hidden = true;
      panel.dataset.slideTitle = `Curriculum strands ${groupIndex * 4 + 1}–${groupIndex * 4 + group.length}`;
      panel.innerHTML = `<div class="teacher-slide-watermark" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="brandbar"><div class="brand">SkillrHub <span>F–10</span></div><small>Year 4 Maths • Curriculum strand summary</small></div><section class="strand-slide-hero"><div><strong>${code} • Additional teacher slide ${groupIndex + 2}</strong><h1>Important concepts from all curriculum elaborations</h1><p>Strands ${groupIndex * 4 + 1}–${groupIndex * 4 + group.length} of ${elaborations.length}. The topic page retains the full wording and expanded explanation.</p></div><div><strong>Teacher use</strong><p>Use after the core model or select only the strands needed for the current lesson sequence.</p></div></section><div class="teacher-strand-grid">${group.map(({label,text})=>`<article class="teacher-strand-card"><div class="teacher-strand-card__head"><span class="teacher-strand-card__code">${esc(label)}</span><h2>${esc(shortText(text))}</h2></div><p class="emphasis"><strong>Teacher emphasis:</strong> ${esc(emphasis(text))}</p><p class="evidence"><strong>Look for:</strong> ${esc(evidence(text))}</p></article>`).join("")}</div><div class="teacher-strand-footer"><strong>Worldwide classroom note:</strong> The Australian Curriculum wording and Australian-specific contexts remain intact. Add local currency, names, environments or comparison examples in parallel; do not delete, merge or generalise culturally specific content.</div><div class="footer"><span>Additional strand summary • use with the core teacher slide</span><span>skillrhub.com • ${code}</span></div>`;
      root.appendChild(panel);
    });

    const panels = [...root.querySelectorAll(".teacher-slide-panel")];
    let active = 0;
    const controls = document.createElement("div");
    controls.className = "slide-controls";
    controls.innerHTML = `<button type="button" data-slide-prev>Previous</button><span data-slide-status></span><button type="button" data-slide-next>Next</button>`;
    toolbar.appendChild(controls);
    const previous = controls.querySelector("[data-slide-prev]");
    const next = controls.querySelector("[data-slide-next]");
    const status = controls.querySelector("[data-slide-status]");

    function show(index) {
      active = Math.max(0, Math.min(panels.length - 1, index));
      panels.forEach((panel, panelIndex) => {
        panel.hidden = panelIndex !== active;
        panel.classList.toggle("is-active", panelIndex === active);
      });
      previous.disabled = active === 0;
      next.disabled = active === panels.length - 1;
      status.textContent = `Slide ${active + 1} of ${panels.length}`;
      root.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    previous.addEventListener("click", () => show(active - 1));
    next.addEventListener("click", () => show(active + 1));
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(active - 1);
      if (event.key === "ArrowRight") show(active + 1);
    });
    show(0);
  }

  fetch(`/year4/maths/${unit.slug}/`, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`Topic page returned ${response.status}`);
      return response.text();
    })
    .then((html) => installPanels(extractElaborations(html)))
    .catch((error) => console.warn("Skillr Year 4 strand slides could not load:", error));
})();
