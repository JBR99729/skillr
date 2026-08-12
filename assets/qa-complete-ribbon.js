(() => {
  "use strict";

  if (window.__skillrQaCompleteRibbonLoaded) return;
  window.__skillrQaCompleteRibbonLoaded = true;

  const path = location.pathname.toLowerCase();

  function isCompletedResource() {
    if (/^\/(foundation|year[1-4])\/(maths|science|english)\//.test(path)) return true;
    if (/^\/quiz\/(grade-k|year-[1-4])\/(math|maths|science|english)\//.test(path)) return true;
    if (/^\/worksheets\/(foundation|year[1-4])\/(maths|science|english)\//.test(path)) return true;
    return false;
  }

  if (!isCompletedResource()) return;

  function ensureStyle() {
    if (document.getElementById("skillr-qa-ribbon-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-qa-ribbon-style";
    style.textContent = `
      .skillr-qa-ribbon-host{position:relative!important;overflow:visible!important}.skillr-qa-ribbon{position:absolute;z-index:40;right:8px;top:-13px;display:inline-flex;align-items:center;justify-content:center;min-width:92px;height:24px;padding:0 12px;border:1px solid #9eb9e8;border-radius:4px;background:#2457d6;color:#fff;font:900 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.035em;text-transform:uppercase;box-shadow:0 3px 8px rgba(23,57,104,.18);transform:rotate(-4deg);pointer-events:none;white-space:nowrap}.skillr-qa-ribbon::before,.skillr-qa-ribbon::after{content:"";position:absolute;top:5px;width:9px;height:12px;background:#173968;z-index:-1}.skillr-qa-ribbon::before{left:-6px;clip-path:polygon(100% 0,100% 100%,0 50%)}.skillr-qa-ribbon::after{right:-6px;clip-path:polygon(0 0,0 100%,100% 50%)}@media(max-width:600px){.skillr-qa-ribbon{right:4px;top:-11px;min-width:82px;height:22px;font-size:10px}}
    `;
    document.head.appendChild(style);
  }

  function findHost() {
    const selectors = [
      ".topic-action-row",
      ".worksheet-actions",
      "#startScreen .quiz-summary",
      ".slide-controls",
      ".toolbar",
      ".curriculum-link-row"
    ];
    return selectors.map((selector) => document.querySelector(selector)).find(Boolean) || null;
  }

  function apply() {
    if (document.querySelector(".skillr-qa-ribbon")) return true;
    const host = findHost();
    if (!host) return false;
    ensureStyle();
    host.classList.add("skillr-qa-ribbon-host");
    const ribbon = document.createElement("span");
    ribbon.className = "skillr-qa-ribbon";
    ribbon.textContent = "QA complete";
    ribbon.setAttribute("aria-label", "QA complete");
    host.appendChild(ribbon);
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList:true, subtree:true });
  setTimeout(() => observer.disconnect(), 15000);
})();
