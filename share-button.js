(function () {
  "use strict";

  var WHATSAPP_CHANNEL_URL =
    "https://whatsapp.com/channel/0029VbDC39DHbFV8rruaoN0A";

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
    if (!document.body || window.__skillrShareWidgetInitialized) return;

    var button = document.createElement("button");
    button.className = "skillr-share-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Share this page");
    button.innerHTML =
      '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.39l7.05-4.11A3 3 0 1 0 15 5c0 .23.03.45.08.66L8.03 9.78a3 3 0 1 0 0 4.44l7.12 4.16c-.04.2-.07.41-.07.62A2.92 2.92 0 1 0 18 16.08z"/></svg></span><span class="skillr-share-label">Share</span>';

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

  function isQuizArea() {
    return /^\/quiz(?:\/|$)/.test(window.location.pathname);
  }

  function ensureWhatsAppStyles() {
    if (document.getElementById("skillr-whatsapp-channel-styles")) return;

    var styles = document.createElement("style");
    styles.id = "skillr-whatsapp-channel-styles";
    styles.textContent =
      ".wa-float-btn{" +
      "position:fixed;right:16px;bottom:92px;z-index:9998;" +
      "display:inline-flex;align-items:center;justify-content:center;gap:8px;" +
      "min-height:46px;padding:11px 17px;border:1px solid rgba(0,0,0,.08);" +
      "border-radius:999px;background:#25d366;color:#fff;" +
      "font:800 14px/1 \"Segoe UI\",Arial,sans-serif;white-space:nowrap;" +
      "box-shadow:0 12px 26px rgba(18,140,76,.34);text-decoration:none;" +
      "transition:transform .2s ease,box-shadow .2s ease,background-color .2s ease;" +
      "-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;" +
      "touch-action:manipulation}" +
      ".wa-float-btn:visited{color:#fff}" +
      ".wa-float-btn:focus-visible{outline:3px solid #f5b700;outline-offset:3px}" +
      ".wa-float-btn:active{transform:scale(.98)}" +
      ".wa-float-btn__icon{font-size:20px;line-height:1}" +
      "@media (hover:hover) and (pointer:fine){" +
      ".wa-float-btn:hover{background:#1fbd59;color:#fff;" +
      "transform:translateY(-2px);box-shadow:0 16px 32px rgba(18,140,76,.42)}}" +
      "@media (max-width:720px){" +
      ".wa-float-btn{right:calc(14px + env(safe-area-inset-right));" +
      "bottom:calc(158px + env(safe-area-inset-bottom));width:56px;height:56px;" +
      "min-height:56px;padding:0;border-radius:50%}" +
      ".wa-float-btn__label{position:absolute;width:1px;height:1px;padding:0;margin:-1px;" +
      "overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}}" +
      "@media print{.wa-float-btn{display:none!important}}";

    document.head.appendChild(styles);
  }

  function trackWhatsAppClick() {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "whatsapp_channel_click", {
      link_url: WHATSAPP_CHANNEL_URL,
      page_path: window.location.pathname
    });
  }

  function initWhatsAppButton() {
    if (
      !document.body ||
      isQuizArea() ||
      window.__skillrWhatsAppChannelInitialized
    ) {
      return;
    }

    ensureWhatsAppStyles();

    var link = document.createElement("a");
    link.href = WHATSAPP_CHANNEL_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "wa-float-btn";
    link.title = "Get free worksheets on WhatsApp";
    link.setAttribute(
      "aria-label",
      "Follow the Free School Resources and Worksheets channel on WhatsApp; opens in a new tab"
    );
    link.innerHTML =
      '<span class="wa-float-btn__icon" aria-hidden="true">💬</span>' +
      '<span class="wa-float-btn__label">Free Worksheets</span>';
    link.addEventListener("click", trackWhatsAppClick);

    document.body.appendChild(link);
    window.__skillrWhatsAppChannelInitialized = true;
  }

  function initSiteWidgets() {
    if (!document.body) return;
    ensureFooterLinks();
    initShareButton();
    initWhatsAppButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteWidgets, { once: true });
  } else {
    initSiteWidgets();
  }
})();
