(() => {
  "use strict";

  if (window.__skillrCurriculumStrandCoverageLoaded) return;
  window.__skillrCurriculumStrandCoverageLoaded = true;

  const pathMatch = location.pathname.match(/^\/(foundation|year\d+)\/(maths|science|english)\/(ac9[a-z0-9]+)/i);
  if (!pathMatch) return;

  const yearRaw = pathMatch[1].toLowerCase();
  const subject = pathMatch[2].toLowerCase();
  const code = pathMatch[3].toUpperCase();
  const yearLabel = yearRaw === "foundation" ? "Foundation" : `Year ${yearRaw.replace("year", "")}`;
  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function ensureStyle() {
    if (document.getElementById("skillr-curriculum-strand-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-curriculum-strand-style";
    style.textContent = `
      .curriculum-cluster-section{border-top:1px solid #e6ebf2;padding-top:4px}.curriculum-cluster-intro{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(260px,.85fr);gap:10px;align-items:center;border:1px solid #c9d9ee;background:linear-gradient(135deg,#f7faff,#eef5ff);border-radius:13px;padding:11px 13px;margin-bottom:10px}.curriculum-cluster-intro strong{color:#173968}.curriculum-cluster-intro p{margin:4px 0;line-height:1.42}.curriculum-cluster-visual{min-width:0}.curriculum-cluster-visual .skillr-concept-svg{display:block;width:100%;height:auto;max-height:205px}.curriculum-cluster-flow{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;margin:0 0 10px}.curriculum-cluster-flow span{display:inline-grid;place-items:center;min-height:36px;padding:7px 10px;border:1px solid #cbd9eb;border-radius:999px;background:#fff;color:#173968;font-size:.78rem;font-weight:850;text-align:center}.curriculum-cluster-flow b{color:#2457d6}.curriculum-cluster-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.curriculum-cluster-card{border:1px solid #dce5ef;border-radius:13px;background:#fff;padding:12px;box-shadow:0 2px 7px rgba(28,55,91,.035)}.curriculum-cluster-card__head{display:flex;align-items:flex-start;gap:8px;margin-bottom:7px}.curriculum-cluster-number{flex:0 0 auto;display:inline-grid;place-items:center;min-width:32px;height:28px;border-radius:999px;background:#2457d6;color:#fff;font-size:.75rem;font-weight:900}.curriculum-cluster-card h4{margin:2px 0 0;color:#173968;font-size:.96rem;line-height:1.3}.curriculum-cluster-labels{display:flex;flex-wrap:wrap;gap:5px;margin:0 0 7px}.curriculum-cluster-labels span{border-radius:999px;background:#eef5ff;border:1px solid #d7e3fb;padding:3px 6px;color:#2457d6;font-size:.68rem;font-weight:900}.curriculum-cluster-card ul{margin:4px 0 8px;padding-left:1.05rem}.curriculum-cluster-card li{margin:3px 0;font-size:.84rem;line-height:1.35}.curriculum-cluster-connect,.curriculum-cluster-evidence{margin:6px 0 0;padding:7px 8px;border-radius:9px;font-size:.8rem;line-height:1.38}.curriculum-cluster-connect{background:#f8fafc;border-left:3px solid #9dbcf6}.curriculum-cluster-evidence{background:#f7fbf8;border:1px solid #d7eadc}.curriculum-cluster-exclusion{margin-top:9px;padding:8px 10px;border:1px solid #ead9ae;background:#fffaf0;border-radius:10px;font-size:.78rem;line-height:1.4;color:#5f4a16}.curriculum-worldwide-note{font-size:.81rem;color:#53677f}.curriculum-reference-note{margin-top:8px;font-size:.76rem;color:#64748b}@media(max-width:840px){.curriculum-cluster-intro,.curriculum-cluster-grid{grid-template-columns:1fr}.curriculum-cluster-visual .skillr-concept-svg{max-height:none}}@media(max-width:560px){.curriculum-cluster-flow b{display:none}.curriculum-cluster-flow span{width:100%;border-radius:9px}}
    `;
    document.head.appendChild(style);
  }

  function findUnit() {
    const candidates = Object.keys(window).filter((key) => /^Skillr(?:Foundation|Year\d+).+Data$/.test(key));
    for (const key of candidates) {
      const record = window[key]?.[code];
      if (record) return record;
    }
    return null;
  }

  function fallbackVisual(clusters) {
    const nodeWidth = 190;
    const gap = 28;
    const totalWidth = clusters.length * nodeWidth + Math.max(0, clusters.length - 1) * gap;
    const offset = Math.max(20, (960 - totalWidth) / 2);
    const nodes = clusters.map((cluster, index) => {
      const x = offset + index * (nodeWidth + gap);
      const arrow = index < clusters.length - 1 ? `<line x1="${x + nodeWidth}" y1="145" x2="${x + nodeWidth + gap - 7}" y2="145" stroke="#2457d6" stroke-width="4"/><polygon points="${x + nodeWidth + gap},145 ${x + nodeWidth + gap - 10},139 ${x + nodeWidth + gap - 10},151" fill="#2457d6"/>` : "";
      return `<rect x="${x}" y="88" width="${nodeWidth}" height="114" rx="16" fill="#fff" stroke="#9dbcf6" stroke-width="2"/><circle cx="${x + 28}" cy="116" r="15" fill="#2457d6"/><text x="${x + 28}" y="121" fill="#fff" font-family="Arial" font-size="12" font-weight="900" text-anchor="middle">${index + 1}</text><text x="${x + 52}" y="119" fill="#173968" font-family="Arial" font-size="13" font-weight="900">${esc(cluster.title.slice(0, 21))}</text><text x="${x + 18}" y="153" fill="#52657e" font-family="Arial" font-size="11">${esc(cluster.summary[0]?.slice(0, 27) || "Learn the key idea")}</text><text x="${x + 18}" y="174" fill="#52657e" font-family="Arial" font-size="11">${esc(cluster.labels.join(" • "))}</text>${arrow}`;
    }).join("");
    return `<svg class="skillr-concept-svg" viewBox="0 0 960 280" role="img" aria-label="Connected curriculum concept clusters" xmlns="http://www.w3.org/2000/svg"><rect width="960" height="280" rx="18" fill="#f8fbff"/><text x="24" y="34" fill="#173968" font-family="Arial" font-size="18" font-weight="900">How the ideas connect</text>${nodes}</svg>`;
  }

  function apply() {
    const lesson = document.querySelector("#teaching-lesson .combined-lesson-content");
    const core = window.SkillrCurriculumClusterCore;
    if (!lesson || !core || document.getElementById("skillr-all-curriculum-strands")) return false;

    const elaborations = core.extractElaborations(document);
    const result = core.clusterElaborations(elaborations, { yearLabel, subject });
    if (!result.clusters.length && !result.excluded.length) return false;
    ensureStyle();

    window.SkillrCurriculumClusters = window.SkillrCurriculumClusters || {};
    window.SkillrCurriculumClusters[code] = result;

    const current = findUnit();
    const conceptSvg = current && window.SkillrConceptSvg ? window.SkillrConceptSvg.render(current, subject, code) : "";
    const visual = conceptSvg || fallbackVisual(result.clusters);
    const countText = result.required.length === 1 ? "1 required elaboration" : `${result.required.length} required elaborations`;

    const section = document.createElement("section");
    section.className = "lesson-part curriculum-cluster-section";
    section.id = "skillr-all-curriculum-strands";
    section.innerHTML = `<h3>How the curriculum ideas connect</h3><div class="curriculum-cluster-intro"><div><strong>${code}: ${countText} organised into ${result.clusters.length} connected concept ${result.clusters.length === 1 ? "cluster" : "clusters"}.</strong><p>Related elaborations are taught together so students build one connected understanding rather than memorising isolated examples.</p><p class="curriculum-worldwide-note"><strong>Worldwide use:</strong> Keep the Australian Curriculum code exact. Local names, currencies and settings may be added in parallel while the underlying concept, units and evidence stay unchanged.</p><p class="curriculum-reference-note">The full official wording remains unchanged in the curriculum reference section below.</p></div><div class="curriculum-cluster-visual">${visual}</div></div><div class="curriculum-cluster-flow">${result.clusters.map((cluster, index) => `<span>${index + 1}. ${esc(cluster.title)}</span>${index < result.clusters.length - 1 ? "<b>→</b>" : ""}`).join("")}</div><div class="curriculum-cluster-grid">${result.clusters.map((cluster, index) => `<article class="curriculum-cluster-card"><div class="curriculum-cluster-card__head"><span class="curriculum-cluster-number">${index + 1}</span><h4>${esc(cluster.title)}</h4></div><div class="curriculum-cluster-labels">${cluster.labels.map((label) => `<span>${esc(label)}</span>`).join("")}</div><ul>${cluster.summary.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><p class="curriculum-cluster-connect"><strong>Connection:</strong> ${esc(cluster.connection)}</p><p class="curriculum-cluster-evidence"><strong>Student evidence:</strong> ${esc(cluster.evidence)}</p></article>`).join("")}</div>${result.excluded.length ? `<div class="curriculum-cluster-exclusion"><strong>Australian-specific cultural context:</strong> ${result.excluded.map((item) => item.label).join(", ")} remains unchanged in the official curriculum reference. It is not included in the required Skillr mastery or worksheet sequence; teachers using it should follow accurate, authorised and locally appropriate guidance.</div>` : ""}`;

    const focus = [...lesson.querySelectorAll(":scope > .lesson-part")].find((part) => /curriculum focus|lesson scope/i.test(part.querySelector("h3")?.textContent || ""));
    if (focus?.nextSibling) lesson.insertBefore(section, focus.nextSibling);
    else lesson.insertBefore(section, lesson.firstChild);
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 12000);
})();
