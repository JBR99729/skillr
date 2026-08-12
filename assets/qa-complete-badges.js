(() => {
  "use strict";

  const BADGE_CLASS = "skillr-qa-complete-badge";
  const completedFoundationSubjects = new Set(["maths", "science", "english"]);

  function normalisePath(value) {
    const clean = String(value || "/").replace(/\/+$/, "");
    return clean || "/";
  }

  function addStyles() {
    if (document.getElementById("skillr-qa-complete-badge-styles")) return;
    const style = document.createElement("style");
    style.id = "skillr-qa-complete-badge-styles";
    style.textContent = `
      .${BADGE_CLASS}{display:inline-flex;align-items:center;align-self:flex-start;gap:.3rem;width:max-content;margin:.35rem 0 .15rem;padding:.25rem .52rem;border:1px solid #86d5aa;border-radius:999px;background:#ecfdf5;color:#116149;font-size:.67rem;font-weight:850;line-height:1;letter-spacing:.035em;text-transform:uppercase;white-space:nowrap;box-shadow:0 2px 6px rgba(17,97,73,.08)}
      .${BADGE_CLASS}::before{content:"✓";font-size:.78rem;line-height:1}
      .curriculum-hero>.${BADGE_CLASS}{margin:.1rem 0 .65rem}
      .curriculum-unit-card>.${BADGE_CLASS}{margin-top:.15rem}
      @media print{.${BADGE_CLASS}{display:none!important}}
    `;
    document.head.appendChild(style);
  }

  function makeBadge() {
    const badge = document.createElement("span");
    badge.className = BADGE_CLASS;
    badge.dataset.skillrQaStatus = "complete";
    badge.textContent = "QA complete";
    badge.title = "Question banks and relevant Daily Drills passed content QA; human QA is still pending.";
    badge.setAttribute("aria-label", "QA complete. Question banks and relevant Daily Drills passed content review. Human quality assurance is still pending.");
    return badge;
  }

  function addBadge(container, anchor, position = "after") {
    if (!container || container.querySelector(`.${BADGE_CLASS}`)) return false;
    const badge = makeBadge();
    if (anchor && position === "after") anchor.insertAdjacentElement("afterend", badge);
    else if (anchor && position === "before") anchor.insertAdjacentElement("beforebegin", badge);
    else container.prepend(badge);
    return true;
  }

  function applyFoundationHubBadges(path) {
    if (path !== "/foundation/curriculum") return 0;
    let added = 0;
    document.querySelectorAll(".subject-tile[href]").forEach((tile) => {
      const href = normalisePath(tile.getAttribute("href"));
      const match = href.match(/^\/foundation\/curriculum\/(maths|science|english)$/i);
      if (!match || !completedFoundationSubjects.has(match[1].toLowerCase())) return;
      const unitCount = tile.querySelector(".curriculum-badge");
      if (addBadge(tile, unitCount)) added += 1;
    });
    return added;
  }

  function applyFoundationSubjectBadges(path) {
    const match = path.match(/^\/foundation\/curriculum\/(maths|science|english)$/i);
    if (!match || !completedFoundationSubjects.has(match[1].toLowerCase())) return 0;

    let added = 0;
    const hero = document.querySelector(".curriculum-hero");
    if (hero && addBadge(hero, hero.querySelector(".curriculum-eyebrow"))) added += 1;

    document.querySelectorAll(".curriculum-unit-card").forEach((card) => {
      const code = card.querySelector(".curriculum-badge");
      if (addBadge(card, code)) added += 1;
    });
    return added;
  }

  function apply() {
    const path = normalisePath(window.location.pathname);
    if (!path.startsWith("/foundation/curriculum")) return false;
    addStyles();
    return applyFoundationHubBadges(path) + applyFoundationSubjectBadges(path) > 0;
  }

  if (apply()) return;

  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
})();
