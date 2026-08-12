(() => {
  "use strict";
  if (window.__skillrQaCompleteRibbonLoaded) return;
  window.__skillrQaCompleteRibbonLoaded = true;

  const path = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const completedYear1Maths = new Set(["ac9m1n01","ac9m1n02","ac9m1n03","ac9m1n04","ac9m1n05","ac9m1n06","ac9m1a01","ac9m1a02","ac9m1m01","ac9m1m02","ac9m1m03","ac9m1sp01","ac9m1sp02","ac9m1st01","ac9m1st02"]);

  function codeFrom(value) {
    const match = String(value || "").toLowerCase().match(/ac9m1[a-z0-9]+/);
    return match ? match[0] : "";
  }

  function isCompletedResource() {
    if (["/year1/curriculum/maths","/year1/maths","/quiz/year-1/math"].includes(path)) return true;
    if (/^\/(foundation|quiz\/grade-k|worksheets\/foundation)(\/|$)/.test(path)) return true;
    const code = codeFrom(path);
    if (code && completedYear1Maths.has(code) && /^\/(year1\/maths|quiz\/year-1\/math|worksheets\/year1\/maths)(\/|$)/.test(path)) return true;
    if (/^\/year4\/maths\/ac9m4/.test(path)) return true;
    if (/^\/quiz\/year-4\/math\/ac9m4/.test(path)) return true;
    if (/^\/worksheets\/year4\/maths\/teacher-slides\//.test(path)) return true;
    if (/^\/year[1-7]\/(maths|science|english)\//.test(path)) return true;
    if (/^\/quiz\/(grade-k|year-[1-7])\/(math|maths|science|english)\//.test(path)) return true;
    if (/^\/worksheets\/(foundation|year[1-7])\/(maths|science|english)\//.test(path)) return true;
    return false;
  }

  function ensureStyle() {
    if (document.getElementById("skillr-qa-ribbon-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-qa-ribbon-style";
    style.textContent = `
      .skillr-qa-ribbon-host{position:relative!important;overflow:visible!important}.skillr-qa-ribbon{position:absolute;z-index:40;right:8px;top:-13px;display:inline-flex;align-items:center;justify-content:center;min-width:92px;height:24px;padding:0 12px;border:1px solid #9eb9e8;border-radius:4px;background:#2457d6;color:#fff;font:900 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.035em;text-transform:uppercase;box-shadow:0 3px 8px rgba(23,57,104,.18);transform:rotate(-4deg);pointer-events:none;white-space:nowrap}.skillr-qa-ribbon::before,.skillr-qa-ribbon::after{content:"";position:absolute;top:5px;width:9px;height:12px;background:#173968;z-index:-1}.skillr-qa-ribbon::before{left:-6px;clip-path:polygon(100% 0,100% 100%,0 50%)}.skillr-qa-ribbon::after{right:-6px;clip-path:polygon(0 0,0 100%,100% 50%)}.skillr-code-qa-badge{display:inline-flex;align-items:center;gap:.25rem;margin:.25rem 0;padding:.25rem .5rem;border:1px solid #86d5aa;border-radius:999px;background:#ecfdf5;color:#116149;font:850 10px/1 Arial,Helvetica,sans-serif;text-transform:uppercase}.skillr-code-qa-badge::before{content:"✓"}@media(max-width:600px){.skillr-qa-ribbon{right:4px;top:-11px;min-width:82px;height:22px;font-size:10px}}@media print{.skillr-qa-ribbon,.skillr-code-qa-badge{display:none!important}}`;
    document.head.appendChild(style);
  }

  function applyYear1SubjectBadge() {
    if (path !== "/year1/curriculum") return;
    ensureStyle();
    const tile = [...document.querySelectorAll(".subject-tile")].find(item => item.getAttribute("href")?.includes("/year1/curriculum/maths/"));
    if (!tile || tile.querySelector(".skillr-code-qa-badge")) return;
    const badge = document.createElement("span");
    badge.className = "skillr-code-qa-badge";
    badge.textContent = "QA complete";
    badge.title = "Content QA complete; human QA pending.";
    tile.prepend(badge);
  }

  function applyCardBadges() {
    if (path !== "/year1/curriculum/maths") return;
    ensureStyle();
    document.querySelectorAll(".curriculum-unit-card").forEach((card) => {
      const codeEl = card.querySelector(".curriculum-badge");
      const code = codeFrom(codeEl?.textContent);
      if (!completedYear1Maths.has(code) || card.querySelector(".skillr-code-qa-badge")) return;
      const badge = document.createElement("span");
      badge.className = "skillr-code-qa-badge";
      badge.textContent = "QA complete";
      badge.title = "Content QA complete; human QA pending.";
      codeEl?.insertAdjacentElement("afterend", badge);
      const row = card.querySelector(".unit-action-row");
      if (row && !row.querySelector('a[href*="/quiz/"]')) {
        const link = document.createElement("a");
        link.href = `/quiz/year-1/math/${code}/quiz/`;
        link.textContent = "Quiz";
        row.appendChild(link);
      }
    });
  }

  function findHost() {
    const selectors = [".topic-action-row",".worksheet-actions","#startScreen .quiz-summary",".slide-controls",".toolbar",".curriculum-link-row",".result-actions"];
    return selectors.map((selector) => document.querySelector(selector)).find(Boolean) || null;
  }

  function addTopicQuizLink() {
    const code = codeFrom(path);
    if (!completedYear1Maths.has(code) || !/^\/year1\/maths\//.test(path)) return;
    const row = document.querySelector(".topic-action-row");
    if (!row || row.querySelector('a[href$="/quiz/"]')) return;
    const link = document.createElement("a");
    link.href = `/quiz/year-1/math/${code}/quiz/`;
    link.textContent = "Quiz";
    row.appendChild(link);
  }

  function apply() {
    applyYear1SubjectBadge();
    applyCardBadges();
    addTopicQuizLink();
    if (!isCompletedResource() || document.querySelector(".skillr-qa-ribbon")) return Boolean(document.querySelector(".skillr-qa-ribbon"));
    const host = findHost();
    if (!host) return false;
    ensureStyle();
    host.classList.add("skillr-qa-ribbon-host");
    const ribbon = document.createElement("span");
    ribbon.className = "skillr-qa-ribbon";
    ribbon.textContent = "QA complete";
    ribbon.title = "Content QA complete; human QA pending.";
    ribbon.setAttribute("aria-label", "Content QA complete; human QA pending.");
    host.appendChild(ribbon);
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 12000);
})();
