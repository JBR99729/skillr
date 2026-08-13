(function () {
  "use strict";

  // Paste the published WhatsApp channel URL here before releasing the button.
  // Expected format: https://www.whatsapp.com/channel/CHANNEL_ID
  var WHATSAPP_CHANNEL_URL = "";

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

  async function copyPageLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    }
    return fallbackCopy(window.location.href);
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

    if (!nav.querySelector('a[href="/blogs/"]')) {
      var blogs = document.createElement("a");
      blogs.href = "/blogs/";
      blogs.textContent = "Blogs";
      nav.insertBefore(blogs, nav.firstChild);
    }

    if (!nav.querySelector('a[href="/why-skillrhub.html"]')) {
      var why = document.createElement("a");
      why.href = "/why-skillrhub.html";
      why.textContent = "Why SkillrHub";
      var blogLink = nav.querySelector('a[href="/blogs/"]');
      if (blogLink && blogLink.nextSibling) {
        nav.insertBefore(why, blogLink.nextSibling);
      } else {
        nav.appendChild(why);
      }
    }
  }

  function initShareButton() {
    if (window.__skillrShareWidgetInitialized) return;

    var button = document.createElement("button");
    button.className = "skillr-share-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Share this page");
    button.innerHTML =
      '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.39l7.05-4.11A3 3 0 1 0 15 5c0 .23.03.45.08.66L8.03 9.78a3 3 0 1 0 0 4.44l7.12 4.16c-.04.2-.07.41-.07.62A2.92 2.92 0 1 0 18 16.08z"/></svg></span>' +
      '<span class="skillr-share-label">Share</span>';

    button.addEventListener("click", async function () {
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            url: window.location.href
          });
        } catch (error) {
          if (error && error.name !== "AbortError") {
            console.error("Could not share this page:", error);
          }
        }
        return;
      }

      try {
        var copied = await copyPageLink();
        if (!copied) throw new Error("Copy command was unavailable");
        var label = button.querySelector(".skillr-share-label");
        if (label) {
          label.textContent = "Copied";
          window.setTimeout(function () {
            label.textContent = "Share";
          }, 1800);
        }
      } catch (error) {
        console.error("Could not copy this page link:", error);
      }
    });

    document.body.appendChild(button);
    window.__skillrShareWidgetInitialized = true;
  }

  function isValidWhatsAppChannelUrl(value) {
    if (!value || typeof value !== "string") return false;

    try {
      var url = new URL(value);
      var validHost =
        url.hostname === "whatsapp.com" || url.hostname === "www.whatsapp.com";
      var validPath = /^\/channel\/[A-Za-z0-9_-]+\/?$/.test(url.pathname);
      return url.protocol === "https:" && validHost && validPath;
    } catch (error) {
      return false;
    }
  }

  function normalisePath(path) {
    var cleanPath = (path || "/").toLowerCase().replace(/\/index\.html$/, "/");
    if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }
    return cleanPath || "/";
  }

  function isWhatsAppButtonExcludedPage() {
    var path = normalisePath(window.location.pathname);
    var exactExclusions = [
      "/",
      "/about",
      "/contact",
      "/privacy-policy",
      "/privacy",
      "/disclaimer",
      "/terms",
      "/faq",
      "/feedback",
      "/thank-you",
      "/thankyou"
    ];

    if (exactExclusions.indexOf(path) !== -1) return true;

    // Keep learning sessions, Daily Drills and the private progress dashboard uncluttered.
    return /(^|\/)(quiz|daily-drills|dashboard)(\/|$)/.test(path);
  }

  function ensureWhatsAppButtonStyles() {
    if (document.getElementById("skillr-wa-channel-styles")) return;

    var style = document.createElement("style");
    style.id = "skillr-wa-channel-styles";
    style.textContent =
      ".skillr-wa-channel-btn{" +
      "position:fixed;" +
      "right:calc(16px + env(safe-area-inset-right));" +
      "bottom:calc(94px + env(safe-area-inset-bottom));" +
      "z-index:9998;" +
      "display:inline-flex;" +
      "align-items:center;" +
      "justify-content:center;" +
      "gap:8px;" +
      "min-height:46px;" +
      "padding:10px 16px;" +
      "border:0;" +
      "border-radius:999px;" +
      "background:#25D366;" +
      "color:#fff;" +
      "font-family:\"Segoe UI\",Arial,Helvetica,sans-serif;" +
      "font-size:14px;" +
      "font-weight:800;" +
      "line-height:1.1;" +
      "text-decoration:none;" +
      "box-shadow:0 12px 28px rgba(18,140,78,.34);" +
      "transition:transform .2s ease,box-shadow .2s ease,background-color .2s ease;" +
      "-webkit-tap-highlight-color:transparent;" +
      "-webkit-user-select:none;" +
      "user-select:none;" +
      "}" +
      ".skillr-wa-channel-btn:visited{color:#fff;}" +
      ".skillr-wa-channel-btn:hover{" +
      "background:#20bd5a;" +
      "color:#fff;" +
      "transform:translateY(-2px);" +
      "box-shadow:0 16px 32px rgba(18,140,78,.42);" +
      "}" +
      ".skillr-wa-channel-btn:active{transform:scale(.98);}" +
      ".skillr-wa-channel-btn:focus-visible{" +
      "outline:4px solid rgba(37,211,102,.3);" +
      "outline-offset:4px;" +
      "}" +
      ".skillr-wa-channel-icon{" +
      "display:inline-flex;" +
      "width:21px;" +
      "height:21px;" +
      "flex:0 0 auto;" +
      "}" +
      ".skillr-wa-channel-icon svg{" +
      "display:block;" +
      "width:100%;" +
      "height:100%;" +
      "fill:currentColor;" +
      "}" +
      "@media(max-width:720px){" +
      ".skillr-wa-channel-btn{" +
      "right:calc(14px + env(safe-area-inset-right));" +
      "bottom:calc(156px + env(safe-area-inset-bottom));" +
      "min-height:48px;" +
      "padding:10px 14px;" +
      "font-size:13px;" +
      "}" +
      "}" +
      "@media(prefers-reduced-motion:reduce){" +
      ".skillr-wa-channel-btn{transition:none;}" +
      "}" +
      "@media print{" +
      ".skillr-wa-channel-btn{display:none!important;}" +
      "}";

    document.head.appendChild(style);
  }

  function initWhatsAppChannelButton() {
    if (window.__skillrWhatsAppChannelInitialized) return;
    if (!isValidWhatsAppChannelUrl(WHATSAPP_CHANNEL_URL)) return;
    if (isWhatsAppButtonExcludedPage()) return;

    ensureWhatsAppButtonStyles();

    var link = document.createElement("a");
    link.className = "skillr-wa-channel-btn";
    link.href = WHATSAPP_CHANNEL_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "Get free worksheets on WhatsApp";
    link.setAttribute(
      "aria-label",
      "Follow SkillrHub on WhatsApp for free worksheets"
    );
    link.innerHTML =
      '<span class="skillr-wa-channel-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 2a9.75 9.75 0 0 0-8.42 14.65L2.4 21.6l5.08-1.16A9.75 9.75 0 1 0 12 2Zm0 17.75a7.97 7.97 0 0 1-4.08-1.12l-.29-.17-3.01.69.72-2.93-.19-.3A8 8 0 1 1 12 19.75Zm4.39-5.98c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg>' +
      "</span>" +
      '<span class="skillr-wa-channel-label">Free Worksheets</span>';

    link.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_channel_click", {
          link_url: WHATSAPP_CHANNEL_URL,
          page_path: window.location.pathname
        });
      }
    });

    document.body.appendChild(link);
    window.__skillrWhatsAppChannelInitialized = true;
  }

  function initWidgets() {
    if (!document.body) return;
    ensureFooterLinks();
    initShareButton();
    initWhatsAppChannelButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidgets, { once: true });
  } else {
    initWidgets();
  }
})();
