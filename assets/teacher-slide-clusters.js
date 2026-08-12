(() => {
  "use strict";

  if (window.__skillrTeacherSlideClustersLoaded) return;
  window.__skillrTeacherSlideClustersLoaded = true;

  const match = location.pathname.match(/^\/worksheets\/(foundation|year\d+)\/(maths|science|english)\/teacher-slides\/live\.html$/i);
  if (!match) return;

  const yearRaw = match[1].toLowerCase();
  const subject = match[2].toLowerCase();
  const yearLabel = yearRaw === "foundation" ? "Foundation" : `Year ${yearRaw.replace("year", "")}`;
  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const code = (new URLSearchParams(location.search).get("code") || "").toUpperCase();
  const root = document.getElementById("slideRoot");
  const toolbar = document.querySelector(".toolbar");
  if (!code || !root || !toolbar) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function findUnit() {
    const candidates = Object.keys(window).filter((key) => /^Skillr(?:Foundation|Year\d+).+Data$/.test(key));
    for (const key of candidates) {
      const record = window[key]?.[code];
      if (record) return record;
    }
    return null;
  }

  function ensureStyle() {
    if (document.getElementById("skillr-teacher-cluster-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-teacher-cluster-style";
    style.textContent = `
      .slide-controls{display:inline-flex;align-items:center;gap:7px;margin-left:8px;vertical-align:middle}.slide-controls button{border:1px solid #cbd8e8;background:#fff;color:#173968;border-radius:999px;padding:8px 11px;font-weight:850;cursor:pointer}.slide-controls button:disabled{opacity:.4;cursor:default}.slide-controls span{min-width:92px;text-align:center;font-size:.78rem;font-weight:850;color:#5d6c80}.teacher-slide-panel[hidden]{display:none!important}.teacher-slide-panel{min-height:600px;position:relative}.cluster-slide-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:10px;background:#173968;color:#fff;border-radius:12px;padding:13px;margin-bottom:8px}.cluster-slide-hero h1{margin:0;font-size:1.4rem}.cluster-slide-hero p{margin:4px 0 0;font-size:.8rem}.cluster-slide-hero strong{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em}.cluster-slide-visual{border:1px solid #d8e2ef;border-radius:11px;background:#f8fbff;padding:5px;margin-bottom:8px}.cluster-slide-visual .skillr-concept-svg{display:block;width:100%;height:auto;max-height:205px}.teacher-cluster-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.teacher-cluster-card{border:1px solid #d8e2ef;border-radius:12px;background:#fff;padding:10px}.teacher-cluster-card__head{display:flex;gap:7px;align-items:flex-start;margin-bottom:5px}.teacher-cluster-card__number{display:grid;place-items:center;min-width:32px;height:26px;border-radius:999px;background:#2457d6;color:#fff;font-size:.68rem;font-weight:900}.teacher-cluster-card h2{margin:1px 0 0;font-size:.88rem;color:#173968;line-height:1.28}.teacher-cluster-card .labels{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}.teacher-cluster-card .labels span{border-radius:999px;background:#eef5ff;padding:2px 5px;font-size:.61rem;font-weight:900;color:#2457d6}.teacher-cluster-card ul{margin:5px 0;padding-left:1rem}.teacher-cluster-card li{margin:2px 0;font-size:.7rem;line-height:1.32}.teacher-cluster-card p{margin:5px 0;font-size:.7rem;line-height:1.35}.teacher-cluster-card .look-for{background:#f7fbf8;border:1px solid #d7eadc;border-radius:8px;padding:6px}.teacher-cluster-footer{margin-top:8px;border:1px solid #cbd9eb;background:#f7faff;border-radius:9px;padding:7px 9px;font-size:.69rem;line-height:1.35}.teacher-slide-watermark{position:absolute;inset:0;z-index:-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(5,minmax(0,1fr));align-items:center;justify-items:center;overflow:hidden;pointer-events:none}.teacher-slide-watermark span{transform:rotate(-24deg);white-space:nowrap;font:900 15px/1 Arial,Helvetica,sans-serif;color:rgba(36,87,214,.05)}@media(max-width:900px){.teacher-cluster-grid,.cluster-slide-hero{grid-template-columns:1fr}.teacher-slide-panel{min-height:auto}.slide-controls{display:flex;margin:8px 0 0}}
    `;
    document.head.appendChild(style);
  }

  function topicPath(unit) {
    const yearPath = yearRaw;
    return `/${yearPath}/${subject}/${unit.slug}/`;
  }

  function chunk(items, size) {
    const result = [];
    for (let index = 0; index < items.length; index += size) result.push(items.slice(index, index + size));
    return result;
  }

  function install(unit, result) {
    if (root.dataset.clusterSlidesReady === "true" || !result.clusters.length) return;
    root.dataset.clusterSlidesReady = "true";
    ensureStyle();

    const corePanel = document.createElement("section");
    corePanel.className = "teacher-slide-panel is-active";
    corePanel.dataset.slideTitle = "Core lesson";
    while (root.firstChild) corePanel.appendChild(root.firstChild);
    root.appendChild(corePanel);

    const visual = window.SkillrConceptSvg?.render(unit, subject, code) || "";
    const groups = chunk(result.clusters, 3);
    groups.forEach((group, groupIndex) => {
      const panel = document.createElement("section");
      panel.className = "teacher-slide-panel";
      panel.hidden = true;
      panel.dataset.slideTitle = `Concept clusters ${groupIndex * 3 + 1}–${groupIndex * 3 + group.length}`;
      panel.innerHTML = `<div class="teacher-slide-watermark" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="brandbar"><div class="brand">SkillrHub <span>F–10</span></div><small>${yearLabel} ${subjectLabel} • Connected concept summary</small></div><section class="cluster-slide-hero"><div><strong>${code} • Additional teacher slide ${groupIndex + 2}</strong><h1>Connect the curriculum ideas</h1><p>Teach related elaborations together, then check that students can transfer the idea to a new representation or context.</p></div><div><strong>Use after the core slide</strong><p>Select only the clusters needed today. The topic page remains the complete lesson and reference.</p></div></section>${visual ? `<div class="cluster-slide-visual">${visual}</div>` : ""}<div class="teacher-cluster-grid">${group.map((cluster, index) => `<article class="teacher-cluster-card"><div class="teacher-cluster-card__head"><span class="teacher-cluster-card__number">${groupIndex * 3 + index + 1}</span><h2>${esc(cluster.title)}</h2></div><div class="labels">${cluster.labels.map((label) => `<span>${esc(label)}</span>`).join("")}</div><ul>${cluster.summary.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><p><strong>Connection:</strong> ${esc(cluster.connection)}</p><p class="look-for"><strong>Look for:</strong> ${esc(cluster.evidence.replace(/ Coverage:.*/, ""))}</p></article>`).join("")}</div><div class="teacher-cluster-footer"><strong>Worldwide classroom use:</strong> Keep the curriculum meaning and metric or language conventions exact. Add local names, currencies or settings in parallel where useful.</div><div class="footer"><span>Additional concept-cluster summary • use with the core teacher slide</span><span>skillrhub.com • ${code}</span></div>`;
      root.appendChild(panel);
    });

    const panels = [...root.querySelectorAll(".teacher-slide-panel")];
    if (panels.length <= 1) return;
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
      window.dispatchEvent(new CustomEvent("skillr:teacher-slide-change", { detail: { index: active } }));
    }

    previous.addEventListener("click", () => show(active - 1));
    next.addEventListener("click", () => show(active + 1));
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(active - 1);
      if (event.key === "ArrowRight") show(active + 1);
    });
    show(0);
  }

  function start() {
    const unit = findUnit();
    const core = window.SkillrCurriculumClusterCore;
    if (!unit || !core) return false;
    fetch(topicPath(unit), { cache: "no-store" })
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
      .catch((error) => console.warn("Skillr concept-cluster slides could not load:", error));
    return true;
  }

  if (start()) return;
  const observer = new MutationObserver(() => {
    if (start()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 12000);
})();
