(function () {
  "use strict";

  function trackEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    else window.dataLayer.push(Object.assign({ event: name }, params || {}));
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
    var message = details.text || "Free Foundation to Year 10 practice and printable worksheets—no learner login required.";

    if (navigator.share) {
      try {
        await navigator.share({ title: title, text: message, url: url });
        trackEvent("resource_share", { share_method: "native", page_path: window.location.pathname });
        return "shared";
      } catch (error) {
        if (error && error.name === "AbortError") return "cancelled";
        console.error("Could not share this page:", error);
      }
    }

    var copied = await copyPageLink(url);
    if (copied) trackEvent("resource_share", { share_method: "copy_link", page_path: window.location.pathname });
    return copied ? "copied" : "unavailable";
  }

  function commercialType(link) {
    var text = (link.textContent || "").toLowerCase();
    if (/workbook|subject pack|mastery pack/.test(text)) return "subject_pack";
    if (/book|paperback/.test(text)) return "book";
    if (/suppl|equipment|manipulative/.test(text)) return "learning_supply";
    return "affiliate_resource";
  }

  function initCommercialTracking() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href") || "";
      var isSponsored = /(?:^|\s)sponsored(?:\s|$)/i.test(link.getAttribute("rel") || "");
      var isAffiliate = isSponsored || /^https?:\/\/(?:www\.)?(?:link\.amazon|amazon\.)/i.test(href);
      if (isAffiliate) {
        var destination = "external";
        try { destination = new URL(href, window.location.href).hostname; } catch (_) {}
        trackEvent("affiliate_click", {
          product_type: commercialType(link),
          outbound_domain: destination,
          page_path: window.location.pathname
        });
        return;
      }
      if (link.matches("[data-skillr-product]") || /\/(?:books?|products?|subject-packs?|mastery-packs?)\//i.test(href)) {
        trackEvent("subject_pack_interest", {
          product_name: link.dataset.skillrProduct || (link.textContent || "subject pack").trim().slice(0, 80),
          page_path: window.location.pathname
        });
      }
      if (/^mailto:skillrhublearning@gmail\.com/i.test(href)) {
        trackEvent("resource_request_click", { page_path: window.location.pathname });
      }
    });
  }

  function removePublicDashboardReferences() {
    document.querySelectorAll('a[href="/dashboard/"],a[href="/dashboard"],a[href*="skillrhub.com/dashboard/"]').forEach(function (link) {
      link.remove();
    });
  }

  function watchForDashboardReferences() {
    if (!document.body || window.__skillrDashboardReferenceObserver) return;
    var observer = new MutationObserver(function () {
      removePublicDashboardReferences();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.__skillrDashboardReferenceObserver = observer;
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
      ["Home", "/"], ["Blogs", "/blogs/"],
      ["Worksheets", "/worksheets/"], ["Print & Go", "/print-and-go.html"], ["Teach & Explain", "/teach-and-explain.html"], ["Physical Books", "/amazon-resources/"], ["About", "/about.html"],
      ["Updates", "/updates.html"], ["Contact", "/contact.html"],
      ["Support SkillrHub", "/support-skillrhub.html"], ["Privacy", "/privacy-policy.html"],
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

  function addFreeFirstHomepageHighlight() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") return;
    if (document.getElementById("free-first-highlight")) return;

    var hero = document.querySelector(".ux-hero");
    if (!hero) return;

    var highlight = document.createElement("aside");
    highlight.id = "free-first-highlight";
    highlight.setAttribute("aria-label", "Request professional teaching slides and worksheets");
    highlight.style.margin = "clamp(14px, 2vw, 22px) 0";
    highlight.style.padding = "clamp(16px, 2.5vw, 24px)";
    highlight.style.border = "1px solid #d9e2ff";
    highlight.style.borderRadius = "16px";
    highlight.style.background = "#f7f9ff";
    highlight.style.boxShadow = "0 6px 18px rgba(36, 87, 214, 0.06)";

    var heading = document.createElement("h2");
    heading.textContent = "Teachers and parents: need professional, ready-to-display 16:9 teaching slides and matching worksheets?";
    heading.style.margin = "0";
    heading.style.fontSize = "clamp(1.15rem, 2.4vw, 1.55rem)";
    heading.style.lineHeight = "1.3";

    var supporting = document.createElement("p");
    supporting.textContent = "Explore classroom-ready teaching slides and matching worksheets. Product previews and purchases are available securely through our TPT store.";
    supporting.style.margin = "8px 0 0";

    var link = document.createElement("a");
    link.href = "/teach-and-explain.html";
    link.textContent = "Explore Teach & Explain →";
    link.style.display = "inline-block";
    link.style.marginTop = "10px";
    link.style.fontWeight = "700";

    highlight.appendChild(heading);
    highlight.appendChild(supporting);
    highlight.appendChild(link);
    hero.insertAdjacentElement("afterend", highlight);
  }

  function addHomepagePhysicalBooksLink() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") return;
    if (document.getElementById("skillr-physical-books-home")) return;

    var target = document.querySelector(".ux-utility-grid") || document.querySelector(".ux-start") || document.querySelector("main");
    if (!target) return;

    var panel = document.createElement("section");
    panel.id = "skillr-physical-books-home";
    panel.className = "ux-panel";
    panel.setAttribute("aria-label", "SkillrHub physical books");
    panel.style.margin = "clamp(14px, 2vw, 22px) 0";

    var link = document.createElement("a");
    link.href = "/amazon-resources/";
    link.style.display = "block";
    link.style.textDecoration = "none";

    var heading = document.createElement("h2");
    heading.textContent = "Physical Books";
    heading.style.marginBottom = "6px";

    var text = document.createElement("p");
    text.textContent = "SkillrHub workbooks and educational books available on Amazon.";
    text.style.margin = "0 0 8px";

    var cta = document.createElement("strong");
    cta.textContent = "Browse physical books →";

    link.appendChild(heading);
    link.appendChild(text);
    link.appendChild(cta);
    panel.appendChild(link);
    target.insertAdjacentElement("afterend", panel);
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
    removePublicDashboardReferences();
    watchForDashboardReferences();
    removeLegacyFloatingWidgets();
    ensureFooterLinks();
    initSharePrompts();
    initCommercialTracking();
    addFreeFirstHomepageHighlight();
    addHomepagePhysicalBooksLink();
    loadFirstVisitOnboarding();
  }

  window.SkillrShare = shareSkillrHub;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteHelpers, { once: true });
  } else {
    initSiteHelpers();
  }
})();

// Shared optional resource navigation; guarded across multiple page helpers.
(function () {
  if (window.__skillrResourceLinksLoading) return;
  window.__skillrResourceLinksLoading = true;
  var script = document.createElement('script');
  script.src = '/assets/resource-links.js?v=3';
  script.defer = true;
  document.head.appendChild(script);
}());

// skillr-companions: shared brand and optional learning navigation
(function () {
  if (window.__skillrCompanionLoaderRequested) return;
  window.__skillrCompanionLoaderRequested = true;
  var script = document.createElement('script');
  script.src = '/assets/companions/loader.js?v=20260909-1';
  script.defer = true;
  document.head.appendChild(script);
}());
