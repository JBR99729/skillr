(() => {
  "use strict";

  function removeLegacyBadges() {
    document.querySelectorAll(".skillr-qa-ribbon,.skillr-code-qa-badge,.skillr-qa-complete-badge,[data-skillr-qa-status]").forEach((element) => element.remove());
    document.querySelectorAll(".curriculum-chip,.menu-badge,.qa").forEach((element) => {
      if (element.textContent.trim().toLowerCase() === "qa complete") element.remove();
    });
    document.getElementById("skillr-qa-ribbon-style")?.remove();
    document.getElementById("skillr-qa-complete-badge-styles")?.remove();
  }

  removeLegacyBadges();
  const observer = new MutationObserver(removeLegacyBadges);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
})();
