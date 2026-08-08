"use strict";

/* =========================================================
   SKILLRHUB WORKSHEET PDF — ONE PAGE / 8 QUESTIONS
   Save as: /quiz/assets/worksheet-pdf.js
   - Uses the SAME active 8 questions as the online practice.
   - Fits all 8 questions onto one US Letter page.
   - Includes the mastery recommendation.
   - Supports all current quiz question types.
   ========================================================= */

(() => {
  const PDF_LIB =
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
  const BRAND = "SkillrHub";
  const WEBSITE = "www.skillrhub.com";

  const $ = (selector, root = document) => root.querySelector(selector);

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getTitle() {
    return $("#quizTitle, main h1, h1")?.textContent?.trim() ||
      document.title ||
      "Practice Worksheet";
  }

  function getEyebrow() {
    return $(".start-card .eyebrow, .eyebrow")?.textContent?.trim() ||
      "Foundation Mathematics";
  }

  function getQuestions() {
    if (
      Array.isArray(window.skillrActiveQuestions) &&
      window.skillrActiveQuestions.length
    ) {
      return window.skillrActiveQuestions.slice(0, 8);
    }

    const bank = Array.isArray(window.quizQuestions)
      ? window.quizQuestions
      : [];

    return bank.slice(0, 8);
  }

  function answerLine(width = "100%") {
    return `<div style="width:${width};height:12px;border-bottom:1px solid #8a94a6;margin-top:3px"></div>`;
  }

  function questionImage(question) {
    if (!question.image) return "";

    return `
      <div style="text-align:center;margin:3px 0 4px">
        <img
          src="${esc(question.image)}"
          alt="${esc(question.imageAlt || "")}"
          style="max-width:125px;max-height:82px;object-fit:contain"
        >
      </div>`;
  }

  function visual(question) {
    if (!question.visual) return "";

    return `
      <div style="margin:3px 0 5px;text-align:center;white-space:pre-line;font-size:18px;line-height:1.28;font-weight:800;letter-spacing:.03em">
        ${esc(question.visual)}
      </div>`;
  }

  function renderSingle(question) {
    const options = (question.answers || [])
      .map((answer, index) => `
        <span style="display:inline-block;margin:2px 12px 2px 0;white-space:nowrap">
          <strong>${String.fromCharCode(65 + index)}.</strong> ${esc(answer)}
        </span>`)
      .join("");

    return `${questionImage(question)}${visual(question)}<div style="margin-top:2px;font-size:10.3px;line-height:1.3">${options}</div>`;
  }

  function renderMultiple(question) {
    const options = (question.answers || [])
      .map(answer => `<span style="display:inline-block;margin:2px 12px 2px 0;white-space:nowrap">☐ ${esc(answer)}</span>`)
      .join("");

    return `${questionImage(question)}${visual(question)}
      <div style="font-size:9.2px;color:#667085;font-weight:700;margin-top:2px">Select all correct answers.</div>
      <div style="font-size:10.2px;line-height:1.3">${options}</div>`;
  }

  function renderText(question) {
    return `${questionImage(question)}${visual(question)}${answerLine("72%")}`;
  }

  function renderFillBlank(question) {
    const template = esc(question.template || "{{blank}}")
      .replace(/\{\{blank\}\}/g, "__________");

    return `${questionImage(question)}${visual(question)}
      <div style="margin-top:3px;font-size:10.8px;line-height:1.35">${template}</div>`;
  }

  function renderOrder(question) {
    const items = (question.items || [])
      .map(item => typeof item === "string" ? esc(item) : esc(item?.label || item?.alt || item?.id || ""))
      .join("  •  ");

    return `${questionImage(question)}${visual(question)}
      <div style="margin-top:3px;padding:4px 6px;border:1px solid #d8e0ea;border-radius:5px;text-align:center;font-size:9.8px;line-height:1.3">${items}</div>
      ${answerLine()}`;
  }

  function renderDragImage(question) {
    const groups = (question.categories || [])
      .map(category => esc(category.label || category.id || ""))
      .join(" / ");

    const rows = (question.items || [])
      .map(item => `
        <span style="display:inline-flex;align-items:center;gap:4px;margin:3px 10px 3px 0;vertical-align:middle">
          ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.alt || "")}" style="width:38px;height:38px;object-fit:contain">` : ""}
          <span style="font-size:9.4px">${esc(item.label || item.alt || item.id || "")}: ______</span>
        </span>`)
      .join("");

    return `<div style="margin-top:2px;font-size:8.8px;color:#667085;font-weight:700">Groups: ${groups}</div><div>${rows}</div>`;
  }

  function renderBody(question) {
    const type = question.type || "single";

    if (type === "single" || type === "true-false") return renderSingle(question);
    if (type === "multiple") return renderMultiple(question);
    if (type === "text" || type === "number") return renderText(question);
    if (type === "fill-blank") return renderFillBlank(question);
    if (type === "order" || type === "drag-drop") return renderOrder(question);
    if (type === "drag-image") return renderDragImage(question);

    return `${questionImage(question)}${visual(question)}${answerLine()}`;
  }

  function questionBlock(question, index) {
    const section = document.createElement("section");
    section.className = "skillr-pdf-question";
    section.style.cssText = [
      "padding:2.2mm 0",
      "border-bottom:1px solid #edf0f5",
      "break-inside:avoid",
      "page-break-inside:avoid"
    ].join(";");

    section.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:5px">
        <strong style="min-width:18px;font-size:11.5px;line-height:1.3">${index + 1}.</strong>
        <div style="flex:1;min-width:0">
          <div style="font-size:11.3px;font-weight:800;line-height:1.3">${esc(question.question)}</div>
          ${renderBody(question)}
        </div>
      </div>`;

    return section;
  }

  function buildOnePage(items) {
    const page = document.createElement("section");
    page.id = "skillrWorksheetPdf";
    page.style.cssText = [
      "width:215.9mm",
      "height:279.4mm",
      "box-sizing:border-box",
      "position:relative",
      "display:flex",
      "flex-direction:column",
      "padding:7mm 9mm 6mm",
      "background:#fff",
      "color:#172033",
      "font-family:Arial,Helvetica,sans-serif",
      "overflow:hidden"
    ].join(";");

    const watermark = document.createElement("div");
    watermark.textContent = "SkillrHub.com";
    watermark.style.cssText = [
      "position:absolute",
      "left:50%",
      "top:52%",
      "transform:translate(-50%,-50%) rotate(-32deg)",
      "font-size:50px",
      "font-weight:900",
      "color:#2457d6",
      "opacity:.045",
      "white-space:nowrap",
      "z-index:0",
      "pointer-events:none"
    ].join(";");

    const header = document.createElement("header");
    header.style.cssText = "position:relative;z-index:2;flex:0 0 auto;border-bottom:2px solid #2457d6;padding-bottom:2.5mm";
    header.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8mm">
        <div style="min-width:0;flex:1">
          <div style="font-size:21px;line-height:1;font-weight:900;color:#2457d6">${BRAND}</div>
          <div style="margin-top:1.5mm;font-size:14px;line-height:1.15;font-weight:800">${esc(getTitle())}</div>
          <div style="margin-top:1mm;font-size:8.5px;color:#667085;font-weight:700;text-transform:uppercase">${esc(getEyebrow())}</div>
        </div>
        <div style="text-align:right;flex:0 0 auto">
          <div style="font-size:13px;font-weight:900;color:#2457d6">${WEBSITE}</div>
          <div style="margin-top:1mm;font-size:8px;color:#667085">8-question practice</div>
        </div>
      </div>`;

    const meta = document.createElement("div");
    meta.style.cssText = "position:relative;z-index:2;flex:0 0 auto;display:flex;justify-content:space-between;gap:8mm;margin-top:2.5mm;font-size:9.5px;font-weight:700";
    meta.innerHTML = `
      <div style="flex:1">Name: ______________________________</div>
      <div>Date: ________________</div>`;

    const note = document.createElement("aside");
    note.style.cssText = [
      "position:relative",
      "z-index:2",
      "flex:0 0 auto",
      "margin-top:2mm",
      "padding:2mm 3mm",
      "border:1px solid #cdd9f6",
      "border-radius:6px",
      "background:#f6f8ff",
      "font-size:8.5px",
      "line-height:1.3",
      "color:#344054"
    ].join(";");
    note.innerHTML = `<strong style="color:#2457d6">Mastery recommendation:</strong> Repeat this skill across one week and aim to work through the full question bank over multiple attempts. Repeated practice provides different examples and question formats while strengthening the same skill.`;

    const viewport = document.createElement("div");
    viewport.style.cssText = [
      "position:relative",
      "z-index:2",
      "flex:1 1 auto",
      "min-height:0",
      "overflow:hidden",
      "margin-top:1.5mm"
    ].join(";");

    const content = document.createElement("div");
    content.className = "skillr-pdf-content";
    content.style.cssText = "transform-origin:top left;width:100%";

    items.forEach((question, index) => {
      content.appendChild(questionBlock(question, index));
    });

    const score = document.createElement("div");
    score.style.cssText = "padding-top:2mm;font-size:10.5px;font-weight:800";
    score.textContent = `Score: ______ / ${items.length}`;
    content.appendChild(score);
    viewport.appendChild(content);

    const footer = document.createElement("footer");
    footer.style.cssText = "position:relative;z-index:2;flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #d8e0ea;padding-top:2mm;margin-top:1.5mm;font-size:8.5px;color:#667085;font-weight:700";
    footer.innerHTML = `<span>${BRAND} • Free learning resources</span><span style="font-size:11px;color:#2457d6;font-weight:900">${WEBSITE}</span><span>Page 1 of 1</span>`;

    page.append(watermark, header, meta, note, viewport, footer);

    return { page, viewport, content };
  }

  function fitContentToOnePage(viewport, content) {
    // Reset before measuring.
    content.style.transform = "none";
    content.style.width = "100%";

    const availableHeight = viewport.clientHeight;
    const neededHeight = content.scrollHeight;

    if (!availableHeight || !neededHeight) return;

    const scale = Math.min(1, availableHeight / neededHeight);

    if (scale < 0.999) {
      content.style.transform = `scale(${scale})`;
      content.style.width = `${100 / scale}%`;
    }
  }

  function collectImageUrls(items) {
    const urls = new Set();

    items.forEach(question => {
      if (question.image) urls.add(question.image);
      (question.items || []).forEach(item => {
        if (item && typeof item === "object" && item.image) {
          urls.add(item.image);
        }
      });
    });

    return [...urls];
  }

  function preloadImages(items) {
    return Promise.all(
      collectImageUrls(items).map(url => new Promise(resolve => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = url;
        if (image.complete) resolve();
      }))
    );
  }

  function loadPdfLibrary() {
    if (typeof window.html2pdf === "function") {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existing = $("script[data-skillr-html2pdf='true']");

      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = PDF_LIB;
      script.async = true;
      script.dataset.skillrHtml2pdf = "true";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function downloadWorksheet() {
    const items = getQuestions();

    if (!items.length) {
      alert("Questions are not loaded yet.");
      return;
    }

    const button = $("#downloadPdfButton");
    const oldText = button?.textContent || "Download PDF worksheet";
    let layer;

    if (button) {
      button.disabled = true;
      button.textContent = "Preparing PDF…";
    }

    try {
      await loadPdfLibrary();
      await preloadImages(items);

      layer = document.createElement("div");
      layer.style.cssText = [
        "position:fixed",
        "inset:0",
        "z-index:2147483647",
        "overflow:auto",
        "background:#fff",
        "pointer-events:none"
      ].join(";");
      document.body.appendChild(layer);

      const { page, viewport, content } = buildOnePage(items);
      layer.appendChild(page);

      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      fitContentToOnePage(viewport, content);
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const safeName = getTitle()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || "skillrhub-worksheet";

      await window.html2pdf()
        .set({
          margin: 0,
          filename: `${safeName}-worksheet.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0
          },
          jsPDF: {
            unit: "mm",
            format: "letter",
            orientation: "portrait"
          },
          pagebreak: { mode: ["avoid-all"] }
        })
        .from(page)
        .save();
    } catch (error) {
      console.error("Worksheet PDF failed:", error);
      alert("The PDF could not be created. Please refresh and try again.");
    } finally {
      layer?.remove();

      if (button) {
        button.disabled = false;
        button.textContent = oldText;
      }
    }
  }

  function setupButton() {
    let button = $("#downloadPdfButton");

    if (!button) {
      const start = $("#startButton");
      if (!start) return;

      button = document.createElement("button");
      button.id = "downloadPdfButton";
      button.type = "button";
      button.className = "button button-secondary";
      button.textContent = "Download PDF worksheet";
      start.insertAdjacentElement("afterend", button);
    }

    button.addEventListener("click", downloadWorksheet);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupButton, { once: true });
  } else {
    setupButton();
  }
})();
