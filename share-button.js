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

  async function copyPageLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    }
    return fallbackCopy(window.location.href);
  }

  function ensureBlogsFooterLink() {
    var footer = document.querySelector("footer");
    if (!footer || footer.querySelector('a[href="/blogs/"]')) return;

    var nav = footer.querySelector(".footer-nav");
    if (!nav) {
      nav = document.createElement("nav");
      nav.className = "footer-nav";
      nav.setAttribute("aria-label", "Footer navigation");
      footer.insertBefore(nav, footer.firstChild);
    }

    var link = document.createElement("a");
    link.href = "/blogs/";
    link.textContent = "Blogs";
    nav.insertBefore(link, nav.firstChild);
  }

  function initShareButton() {
    if (!document.body) return;
    ensureBlogsFooterLink();
    if (window.__skillrShareWidgetInitialized) return;

    var button = document.createElement("button");
    button.className = "skillr-share-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Share this page");
    button.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.39l7.05-4.11A3 3 0 1 0 15 5c0 .23.03.45.08.66L8.03 9.78a3 3 0 1 0 0 4.44l7.12 4.16c-.04.2-.07.41-.07.62A2.92 2.92 0 1 0 18 16.08z"/></svg></span><span class="skillr-share-label">Share</span>';

    button.addEventListener("click", async function () {
      if (navigator.share) {
        try {
          await navigator.share({ title: document.title, url: window.location.href });
        } catch (error) {
          if (error && error.name !== "AbortError") console.error("Could not share this page:", error);
        }
        return;
      }

      try {
        var copied = await copyPageLink();
        if (!copied) throw new Error("Copy command was unavailable");
        var label = button.querySelector(".skillr-share-label");
        if (label) {
          label.textContent = "Copied";
          window.setTimeout(function () { label.textContent = "Share"; }, 1800);
        }
      } catch (error) {
        console.error("Could not copy this page link:", error);
      }
    });

    document.body.appendChild(button);
    window.__skillrShareWidgetInitialized = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShareButton, { once: true });
  } else {
    initShareButton();
  }
})();
