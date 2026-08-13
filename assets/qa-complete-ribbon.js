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

  function removeLegacyBadges() {
    document.querySelectorAll(".skillr-qa-ribbon,.skillr-code-qa-badge,.skillr-qa-complete-badge,[data-skillr-qa-status]").forEach((element) => element.remove());
    document.querySelectorAll(".curriculum-chip,.menu-badge,.qa").forEach((element) => {
      if (element.textContent.trim().toLowerCase() === "qa complete") element.remove();
    });
    document.querySelectorAll(".skillr-qa-ribbon-host").forEach((element) => element.classList.remove("skillr-qa-ribbon-host"));
    document.getElementById("skillr-qa-ribbon-style")?.remove();
    document.getElementById("skillr-qa-complete-badge-styles")?.remove();
  }

  function addYear1CardQuizLinks() {
    if (path !== "/year1/curriculum/maths") return;
    document.querySelectorAll(".curriculum-unit-card").forEach((card) => {
      const code = codeFrom(card.querySelector(".curriculum-badge")?.textContent);
      const row = card.querySelector(".unit-action-row");
      if (!completedYear1Maths.has(code) || !row || row.querySelector('a[href*="/quiz/"]')) return;
      const link = document.createElement("a");
      link.href = `/quiz/year-1/math/${code}/quiz/`;
      link.textContent = "Quiz";
      row.appendChild(link);
    });
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
    removeLegacyBadges();
    addYear1CardQuizLinks();
    addTopicQuizLink();
  }

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 12000);
})();
