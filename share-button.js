(function () {
  "use strict";

  var WHATSAPP_CHANNEL_URL =
    "https://whatsapp.com/channel/0029VbDC39DHbFV8rruaoN0A";
  var WORKSHEET_PICKS = [
    {
      title: "100 Square Practice",
      detail: "Number patterns and place value",
      href: "/worksheets/usefulresources/math-100-square-practice-MATH-100S-01.pdf"
    },
    {
      title: "Number of the Day",
      detail: "Daily number sense warm-up",
      href: "/worksheets/usefulresources/math-number-of-the-day-MATH-NOTD-01.pdf"
    },
    {
      title: "Multiplication Tables 1–5",
      detail: "Printable facts reference and practice",
      href: "/worksheets/usefulresources/math-multiplication-table-1-5-MATH-TABLE-05.pdf"
    },
    {
      title: "Read, Draw and Solve",
      detail: "Visual maths problem-solving scaffold",
      href: "/worksheets/usefulresources/math-read-draw-solve-MATH-RDS-01pdf.pdf"
    },
    {
      title: "Phonics Writing Grid",
      detail: "Sound, spelling and handwriting practice",
      href: "/worksheets/usefulresources/lit-phonics-writing-grid-LIT-PHON-01.pdf"
    }
  ];

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

  window.SkillrShare = shareSkillrHub;

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
      ["Contact", "/contact.html"], ["Privacy", "/privacy-policy.html"]
    ].forEach(function (item) {
      var link = document.createElement("a");
      link.textContent = item[0];
      link.href = item[1];
      nav.appendChild(link);
    });
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

  function ensureWorksheetStyles() {
    if (document.getElementById("skillr-worksheet-widget-styles")) return;

    var styles = document.createElement("style");
    styles.id = "skillr-worksheet-widget-styles";
    styles.textContent =
      ".worksheet-float-btn{" +
      "position:fixed;right:16px;bottom:92px;z-index:9998;" +
      "display:inline-flex;align-items:center;justify-content:center;gap:8px;" +
      "min-height:46px;padding:11px 17px;border:1px solid rgba(0,0,0,.08);" +
      "border-radius:999px;background:#25d366;color:#fff;" +
      "font:800 14px/1 \"Segoe UI\",Arial,sans-serif;white-space:nowrap;" +
      "box-shadow:0 12px 26px rgba(18,140,76,.34);cursor:pointer;" +
      "transition:transform .2s ease,box-shadow .2s ease,background-color .2s ease;" +
      "-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;" +
      "touch-action:manipulation}" +
      ".worksheet-float-btn:focus-visible{outline:3px solid #f5b700;outline-offset:3px}" +
      ".worksheet-float-btn:active{transform:scale(.98)}" +
      ".worksheet-float-btn__icon{font-size:20px;line-height:1}" +
      "@media (hover:hover) and (pointer:fine){" +
      ".worksheet-float-btn:hover{background:#1fbd59;" +
      "transform:translateY(-2px);box-shadow:0 16px 32px rgba(18,140,76,.42)}}" +
      ".worksheet-modal[hidden]{display:none}" +
      ".worksheet-modal{position:fixed;inset:0;z-index:10001;display:grid;" +
      "place-items:center;padding:20px;background:rgba(15,23,42,.62);" +
      "backdrop-filter:blur(4px)}" +
      ".worksheet-modal__dialog{width:min(680px,100%);max-height:min(760px,calc(100vh - 40px));" +
      "overflow:auto;border:1px solid #dbe3ee;border-radius:20px;background:#fff;" +
      "color:#172033;box-shadow:0 28px 80px rgba(15,23,42,.3)}" +
      ".worksheet-modal__header{display:flex;align-items:flex-start;justify-content:space-between;" +
      "gap:18px;padding:22px 22px 14px}" +
      ".worksheet-modal__eyebrow{margin:0 0 5px;color:#13795b;font:800 12px/1.4 \"Segoe UI\",Arial,sans-serif;" +
      "letter-spacing:.08em;text-transform:uppercase}" +
      ".worksheet-modal h2{margin:0;color:#172033;font:800 clamp(22px,4vw,30px)/1.15 \"Segoe UI\",Arial,sans-serif}" +
      ".worksheet-modal__close{display:grid;flex:0 0 40px;width:40px;height:40px;place-items:center;" +
      "border:1px solid #dbe3ee;border-radius:50%;background:#f8fafc;color:#334155;" +
      "font:700 24px/1 Arial,sans-serif;cursor:pointer}" +
      ".worksheet-modal__close:hover{background:#eef2f7}" +
      ".worksheet-modal__intro{margin:0;padding:0 22px 16px;color:#5b687a;" +
      "font:400 15px/1.55 \"Segoe UI\",Arial,sans-serif}" +
      ".worksheet-modal__list{display:grid;gap:9px;margin:0;padding:0 22px;list-style:none}" +
      ".worksheet-modal__item a{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 16px;" +
      "padding:13px 14px;align-items:center;border:1px solid #dbe3ee;border-radius:12px;" +
      "background:#fbfdff;color:#172033;text-decoration:none}" +
      ".worksheet-modal__item a:hover,.worksheet-modal__item a:focus-visible{" +
      "border-color:#6bbf9d;background:#f0fbf6;outline:none}" +
      ".worksheet-modal__item strong,.worksheet-modal__item small{display:block}" +
      ".worksheet-modal__item strong{font:750 15px/1.35 \"Segoe UI\",Arial,sans-serif}" +
      ".worksheet-modal__item small{margin-top:3px;color:#64748b;font:400 13px/1.4 \"Segoe UI\",Arial,sans-serif}" +
      ".worksheet-modal__pdf{grid-column:2;grid-row:1;color:#13795b;font:800 12px/1 \"Segoe UI\",Arial,sans-serif}" +
      ".worksheet-modal__actions{display:flex;flex-wrap:wrap;gap:9px;padding:18px 22px 22px}" +
      ".worksheet-modal__actions a,.worksheet-modal__actions button{display:inline-flex;min-height:42px;padding:10px 14px;align-items:center;" +
      "justify-content:center;border-radius:10px;font:750 14px/1.2 \"Segoe UI\",Arial,sans-serif;text-decoration:none}" +
      ".worksheet-modal__browse{background:#2457d6;color:#fff}" +
      ".worksheet-modal__channel{border:1px solid #b7e1cc;background:#effbf5;color:#11613f}" +
      ".worksheet-modal__share{border:1px solid #cbd5e1;background:#fff;color:#334155;cursor:pointer}" +
      "body.worksheet-modal-open{overflow:hidden}" +
      "@media (max-width:720px){" +
      ".worksheet-float-btn{right:calc(14px + env(safe-area-inset-right));" +
      "bottom:calc(158px + env(safe-area-inset-bottom));width:56px;height:56px;" +
      "min-height:56px;padding:0;border-radius:50%}" +
      ".worksheet-float-btn__label{position:absolute;width:1px;height:1px;padding:0;margin:-1px;" +
      "overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}" +
      ".worksheet-modal{padding:10px}.worksheet-modal__dialog{max-height:calc(100vh - 20px);border-radius:16px}" +
      ".worksheet-modal__header{padding:18px 16px 12px}.worksheet-modal__intro{padding:0 16px 13px}" +
      ".worksheet-modal__list{padding:0 16px}.worksheet-modal__actions{padding:15px 16px 18px}" +
      ".worksheet-modal__actions a,.worksheet-modal__actions button{width:100%}}" +
      "@media print{.worksheet-float-btn,.worksheet-modal{display:none!important}}";

    document.head.appendChild(styles);
  }

  function trackWorksheetEvent(name, details) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", name, Object.assign({
      page_path: window.location.pathname
    }, details || {}));
  }

  function initWorksheetButton() {
    if (
      !document.body ||
      window.__skillrWorksheetWidgetInitialized
    ) {
      return;
    }

    ensureWorksheetStyles();

    var button = document.createElement("button");
    var modal = document.createElement("div");
    var dialog = document.createElement("section");
    var header = document.createElement("header");
    var headingWrap = document.createElement("div");
    var eyebrow = document.createElement("p");
    var heading = document.createElement("h2");
    var closeButton = document.createElement("button");
    var intro = document.createElement("p");
    var list = document.createElement("ol");
    var actions = document.createElement("div");
    var browse = document.createElement("a");
    var channel = document.createElement("a");
    var share = document.createElement("button");
    var previousFocus = null;

    button.type = "button";
    button.className = "worksheet-float-btn";
    button.title = "Open free printable worksheets";
    button.setAttribute(
      "aria-label",
      "Open popular free printable worksheets"
    );
    button.innerHTML =
      '<span class="worksheet-float-btn__icon" aria-hidden="true">📄</span>' +
      '<span class="worksheet-float-btn__label">Free Worksheets</span>';

    modal.className = "worksheet-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "worksheet-modal-title");
    dialog.className = "worksheet-modal__dialog";
    header.className = "worksheet-modal__header";
    eyebrow.className = "worksheet-modal__eyebrow";
    eyebrow.textContent = "Ready to print";
    heading.id = "worksheet-modal-title";
    heading.textContent = "Quick printable worksheet picks";
    closeButton.type = "button";
    closeButton.className = "worksheet-modal__close";
    closeButton.setAttribute("aria-label", "Close worksheet picks");
    closeButton.textContent = "×";
    intro.className = "worksheet-modal__intro";
    intro.textContent = "Open a ready-to-print PDF now, or browse the complete worksheet library.";
    list.className = "worksheet-modal__list";

    WORKSHEET_PICKS.forEach(function (item) {
      var row = document.createElement("li");
      var link = document.createElement("a");
      var copy = document.createElement("span");
      var title = document.createElement("strong");
      var detail = document.createElement("small");
      var pdf = document.createElement("span");

      row.className = "worksheet-modal__item";
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener";
      title.textContent = item.title;
      detail.textContent = item.detail;
      pdf.className = "worksheet-modal__pdf";
      pdf.textContent = "PDF ↗";
      copy.append(title, detail);
      link.append(copy, pdf);
      link.addEventListener("click", function () {
        trackWorksheetEvent("worksheet_pdf_open", {
          worksheet_title: item.title,
          link_url: item.href
        });
      });
      row.appendChild(link);
      list.appendChild(row);
    });

    actions.className = "worksheet-modal__actions";
    browse.className = "worksheet-modal__browse";
    browse.href = "/worksheets/";
    browse.textContent = "Browse all worksheets";
    channel.className = "worksheet-modal__channel";
    channel.href = WHATSAPP_CHANNEL_URL;
    channel.target = "_blank";
    channel.rel = "noopener noreferrer";
    channel.textContent = "Get new worksheets on WhatsApp";
    share.type = "button";
    share.className = "worksheet-modal__share";
    share.textContent = "Share free worksheets";
    browse.addEventListener("click", function () {
      trackWorksheetEvent("worksheet_library_open");
    });
    channel.addEventListener("click", function () {
      trackWorksheetEvent("whatsapp_channel_click", {
        link_url: WHATSAPP_CHANNEL_URL
      });
    });
    share.addEventListener("click", async function () {
      var outcome = await shareSkillrHub({
        title: "Free printable worksheets from SkillrHub",
        text: "Saving time on lesson prep? Share these free printable worksheets with your teaching team.",
        url: new URL("/worksheets/", window.location.href).href
      });
      if (outcome === "copied") {
        share.textContent = "Worksheet link copied";
        window.setTimeout(function () { share.textContent = "Share free worksheets"; }, 1800);
      }
    });

    function openModal() {
      previousFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("worksheet-modal-open");
      closeButton.focus();
      trackWorksheetEvent("free_worksheets_open");
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("worksheet-modal-open");
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    }

    button.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });
    modal.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    });

    headingWrap.append(eyebrow, heading);
    header.append(headingWrap, closeButton);
    actions.append(browse, share, channel);
    dialog.append(header, intro, list, actions);
    modal.appendChild(dialog);
    document.body.append(modal, button);
    window.__skillrWorksheetWidgetInitialized = true;
  }

  function initSiteWidgets() {
    if (!document.body) return;
    ensureFooterLinks();
    initWorksheetButton();
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteWidgets, { once: true });
  } else {
    initSiteWidgets();
  }
})();
