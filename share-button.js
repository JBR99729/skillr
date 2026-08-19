(function () {
  "use strict";

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
      ["Home", "/"], ["Dashboard", "/dashboard/"], ["Blogs", "/blogs/"],
      ["Worksheets", "/worksheets/"], ["About", "/about.html"],
      ["Updates", "/updates.html"], ["Contact", "/contact.html"], ["Privacy", "/privacy-policy.html"],
      ["Facebook", "https://www.facebook.com/1139028835969651", true]
    ].forEach(function (item) {
      var link = document.createElement("a");
      link.textContent = item[0];
      link.href = item[1];
      if (item[0] === "Updates") {
        link.className = "updates-link";
        var badge = document.createElement("span");
        badge.className = "updates-link__badge";
        badge.textContent = "New";
        link.appendChild(badge);
      }
      if (item[2]) {
        link.className = "footer-facebook-link";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", "Follow SkillrHub on Facebook");
      }
      nav.appendChild(link);
    });
  }

  function ensureHomepageQaNotice() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") return;
    if (document.querySelector(".home-qa-crowd-notice")) return;

    var facts = document.querySelector(".home-hero__facts");
    if (!facts) return;

    if (!document.getElementById("skillr-home-qa-notice-styles")) {
      var style = document.createElement("style");
      style.id = "skillr-home-qa-notice-styles";
      style.textContent = [
        ".home-qa-crowd-notice{display:block;margin:14px 0 4px;padding:12px 15px;border:1px solid #e5bf35;border-radius:10px;background:#fff3a8;color:#3d3210;text-decoration:none;box-shadow:0 2px 8px rgba(108,84,0,.08);line-height:1.45}",
        ".home-qa-crowd-notice:hover,.home-qa-crowd-notice:focus-visible{background:#ffef86;border-color:#c99f12;outline:none;box-shadow:0 0 0 3px rgba(229,191,53,.24)}",
        ".home-qa-crowd-notice strong{color:#2f2708}",
        ".home-qa-crowd-notice__link{font-weight:700;text-decoration:underline;text-underline-offset:2px;white-space:nowrap}"
      ].join("");
      document.head.appendChild(style);
    }

    var notice = document.createElement("a");
    notice.className = "home-qa-crowd-notice";
    notice.href = "/updates.html";
    notice.setAttribute("aria-label", "Read SkillrHub quality assurance updates and learn how to contribute");
    notice.innerHTML = "<strong>Community QA in progress:</strong> A small group of school students is actively testing and verifying SkillrHub questions. SkillrHub is a crowd QA project, and students, teachers and parents are welcome to contribute corrections or quality-assurance feedback. <span class=\"home-qa-crowd-notice__link\">See updates &amp; contribute →</span>";

    facts.insertAdjacentElement("afterend", notice);
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

  function loadFirstVisitOnboarding() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") return;
    if (document.querySelector('script[data-skillr-onboarding]')) return;
    var script = document.createElement("script");
    script.src = "/assets/first-visit-onboarding.js?v=20260814-1";
    script.defer = true;
    script.setAttribute("data-skillr-onboarding", "");
    document.body.appendChild(script);
  }

  function initSiteHelpers() {
    if (!document.body) return;
    removeLegacyFloatingWidgets();
    ensureFooterLinks();
    ensureHomepageQaNotice();
    initSharePrompts();
    loadFirstVisitOnboarding();
  }

  window.SkillrShare = shareSkillrHub;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteHelpers, { once: true });
  } else {
    initSiteHelpers();
  }
})();
