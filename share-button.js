(function () {
  "use strict";

  function loadFirstVisitHelp() {
    var path = window.location.pathname.toLowerCase();
    if (window.self !== window.top || path.indexOf("/teacher-slides/") !== -1) return;
    if (window.__skillrFirstVisitHelpLoaded || document.querySelector('script[src*="/assets/first-visit-help.js"]')) return;
    var script = document.createElement("script");
    script.src = "/assets/first-visit-help.js?v=4";
    script.defer = true;
    document.head.appendChild(script);
  }

  function fallbackCopy(value) {
    var input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    var copied = document.execCommand("copy");
    input.remove();
    return copied;
  }

  async function copyPageLink(value) {
    var link = value || window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(link);
      return true;
    }
    return fallbackCopy(link);
  }

  async function shareSkillrHub(options) {
    var details = options || {};
    var url = details.url || window.location.href;
    var title = details.title || document.title || "SkillrHub learning resources";
    var message = details.text || "Free Foundation to Year 10 practice, drills and printable worksheets—no learner login required.";

    if (navigator.share) {
      try {
        await navigator.share({ title: title, text: message, url: url });
        return "shared";
      } catch (error) {
        if (error && error.name === "AbortError") return "cancelled";
        console.error("Could not share this page:", error);
      }
    }

    return await copyPageLink(url) ? "copied" : "unavailable";
  }

  function ensureFooterLinks() {
    var footer = document.querySelector("footer");
    if (!footer) return;

    var nav = footer.querySelector(".footer-nav");
    if (!nav) {
      nav = document.createElement("nav");
      nav.className = "footer-nav";
      nav.setAttribute("aria-label", "Footer navigation");
      footer.insertBefore(nav, footer.firstChild);
    }

    nav.replaceChildren();
    [
      ["Home", "/"], ["Start here", "/start/"], ["Dashboard", "/dashboard/"], ["Blogs", "/blogs/"],
      ["Worksheets", "/worksheets/"], ["About", "/about.html"],
      ["Contact", "/contact.html"], ["Privacy", "/privacy-policy.html"]
    ].forEach(function (item) {
      var link = document.createElement("a");
      link.textContent = item[0];
      link.href = item[1];
      nav.appendChild(link);
    });
  }

  function removeLegacyFloatingWidgets() {
    document.querySelectorAll(".skillr-share-btn,.worksheet-float-btn,.worksheet-modal").forEach(function (element) {
      element.remove();
    });
    document.body.classList.remove("worksheet-modal-open");
    document.getElementById("skillr-worksheet-widget-styles")?.remove();
  }

  function initSharePrompts() {
    document.querySelectorAll("[data-skillr-share]").forEach(function (button) {
      button.addEventListener("click", async function () {
        var original = button.textContent;
        var outcome = await shareSkillrHub({
          title: button.dataset.shareTitle,
          text: button.dataset.shareText,
          url: button.dataset.shareUrl
        });
        if (outcome === "copied") {
          button.textContent = "Link copied";
          window.setTimeout(function () { button.textContent = original; }, 1800);
        }
      });
    });
  }

  function initSiteHelpers() {
    if (!document.body) return;
    removeLegacyFloatingWidgets();
    ensureFooterLinks();
    initSharePrompts();
  }

  window.SkillrShare = shareSkillrHub;
  loadFirstVisitHelp();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteHelpers, { once: true });
  } else {
    initSiteHelpers();
  }
})();
