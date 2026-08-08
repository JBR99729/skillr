"use strict";

/* =========================================================
   SKILLRHUB WORKSHEET PDF
   Save as: /quiz/assets/worksheet-pdf.js
   US Letter • repeated headers • watermark • page numbers
   ========================================================= */

(() => {
  const PDF_LIB =
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
  const BRAND = "SkillrHub";
  const WEBSITE = "www.skillrhub.com";

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function title() {
    return (
      $("#quizTitle, main h1, h1")
        ?.textContent
        ?.trim() ||
      document.title ||
      "Practice Worksheet"
    );
  }

  function eyebrow() {
    return (
      $(".start-card .eyebrow, .eyebrow")
        ?.textContent
        ?.trim() ||
      "Foundation Mathematics"
    );
  }

  function questions() {
    if (
      Array.isArray(window.skillrActiveQuestions) &&
      window.skillrActiveQuestions.length
    ) {
      return window.skillrActiveQuestions;
    }

    const bank =
      Array.isArray(window.quizQuestions)
        ? window.quizQuestions
        : [];

    const max =
      Number(
        window.quizConfig?.maxQuestions || 5
      );

    return bank.slice(
      0,
      Number.isInteger(max) && max > 0
        ? max
        : 5
    );
  }

  function line(width = "100%") {
    return `
      <div
        style="
          width:${width};
          height:22px;
          border-bottom:1px solid #667085;
          margin-top:7px;
        "
      ></div>
    `;
  }

  function questionImage(question) {
    if (!question.image) {
      return "";
    }

    return `
      <div
        style="
          text-align:center;
          margin:8px 0 10px;
        "
      >
        <img
          src="${esc(question.image)}"
          alt="${esc(question.imageAlt || "")}"
          style="
            max-width:220px;
            max-height:145px;
            object-fit:contain;
          "
        >
      </div>
    `;
  }

  function visual(question) {
    if (!question.visual) {
      return "";
    }

    return `
      <div
        style="
          margin:8px 0 10px;
          text-align:center;
          white-space:pre-line;
          font-size:17px;
          line-height:1.4;
        "
      >
        ${esc(question.visual)}
      </div>
    `;
  }

  function single(question) {
    const options =
      (question.answers || [])
        .map(
          (answer, i) => `
            <div
              style="
                margin:5px 0;
                line-height:1.35;
              "
            >
              <span
                style="
                  display:inline-block;
                  width:24px;
                  font-weight:700;
                "
              >
                ${String.fromCharCode(65 + i)}.
              </span>

              ${esc(answer)}
            </div>
          `
        )
        .join("");

    return `
      ${questionImage(question)}
      ${visual(question)}

      <div style="margin-top:6px;">
        ${options}
      </div>
    `;
  }

  function multiple(question) {
    const options =
      (question.answers || [])
        .map(
          answer => `
            <div style="margin:6px 0;">
              ☐ ${esc(answer)}
            </div>
          `
        )
        .join("");

    return `
      ${questionImage(question)}
      ${visual(question)}

      <div
        style="
          margin-top:6px;
          color:#667085;
          font-size:11px;
          font-weight:700;
        "
      >
        Select all correct answers.
      </div>

      ${options}
    `;
  }

  function fillBlank(question) {
    const template =
      esc(
        question.template ||
        "{{blank}}"
      )
        .replace(
          /\{\{blank\}\}/g,
          "__________"
        );

    return `
      ${questionImage(question)}
      ${visual(question)}

      <div
        style="
          margin-top:9px;
          font-size:15px;
          line-height:1.7;
        "
      >
        ${template}
      </div>
    `;
  }

  function order(question) {
    const items =
      (question.items || [])
        .map(esc)
        .join("   •   ");

    return `
      ${questionImage(question)}
      ${visual(question)}

      <div
        style="
          margin-top:8px;
          padding:8px;
          border:1px solid #d8e0ea;
          border-radius:7px;
          text-align:center;
        "
      >
        ${items}
      </div>

      ${line()}
    `;
  }

  function dragImage(question) {
    const groups =
      (question.categories || [])
        .map(
          category =>
            esc(category.label)
        )
        .join(" / ");

    const rows =
      (question.items || [])
        .map(
          item => `
            <div
              style="
                display:flex;
                align-items:center;
                gap:10px;
                margin:8px 0;
                break-inside:avoid;
                page-break-inside:avoid;
              "
            >

              <img
                src="${esc(item.image)}"
                alt="${esc(item.alt || "")}"
                style="
                  width:54px;
                  height:54px;
                  object-fit:contain;
                "
              >

              <div
                style="
                  flex:1;
                  min-width:0;
                "
              >
                <strong>
                  ${esc(
                    item.label ||
                    item.alt ||
                    item.id
                  )}
                </strong>

                <div
                  style="
                    margin-top:2px;
                    color:#667085;
                    font-size:10px;
                  "
                >
                  Choose: ${groups}
                </div>

                ${line("82%")}
              </div>

            </div>
          `
        )
        .join("");

    return `
      <div
        style="
          margin-top:6px;
          color:#667085;
          font-size:11px;
          font-weight:700;
        "
      >
        Write the correct group for each picture.
      </div>

      ${rows}
    `;
  }

  function body(question) {
    const type =
      question.type || "single";

    if (
      type === "single" ||
      type === "true-false"
    ) {
      return single(question);
    }

    if (type === "multiple") {
      return multiple(question);
    }

    if (type === "fill-blank") {
      return fillBlank(question);
    }

    if (
      type === "order" ||
      type === "drag-drop"
    ) {
      return order(question);
    }

    if (type === "drag-image") {
      return dragImage(question);
    }

    if (
      type === "text" ||
      type === "number"
    ) {
      return `
        ${questionImage(question)}
        ${visual(question)}
        ${line("72%")}
      `;
    }

    return `
      ${questionImage(question)}
      ${visual(question)}
      ${line()}
    `;
  }

  function questionBlock(
    question,
    index
  ) {
    const section =
      document.createElement(
        "section"
      );

    section.className =
      "skillr-pdf-question";

    section.style.cssText = [
      "padding:3.5mm 0",
      "border-bottom:1px solid #e7ebf1",
      "break-inside:avoid",
      "page-break-inside:avoid"
    ].join(";");

    section.innerHTML = `
      <div
        style="
          display:flex;
          align-items:flex-start;
          gap:8px;
        "
      >

        <strong
          style="
            min-width:24px;
            font-size:15px;
            line-height:1.4;
          "
        >
          ${index + 1}.
        </strong>

        <div
          style="
            flex:1;
            min-width:0;
          "
        >

          <div
            style="
              font-size:15px;
              font-weight:700;
              line-height:1.4;
            "
          >
            ${esc(question.question)}
          </div>

          ${body(question)}

        </div>

      </div>
    `;

    return section;
  }

  function makeHeader() {
    const header =
      document.createElement(
        "header"
      );

    header.style.cssText = [
      "position:relative",
      "z-index:2",
      "flex:0 0 auto",
      "padding-bottom:4mm",
      "border-bottom:2px solid #2457d6",
      "break-inside:avoid",
      "page-break-inside:avoid"
    ].join(";");

    header.innerHTML = `
      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:10mm;
        "
      >

        <div
          style="
            flex:1;
            min-width:0;
          "
        >

          <div
            style="
              color:#2457d6;
              font-size:28px;
              line-height:1;
              font-weight:900;
              letter-spacing:-.03em;
            "
          >
            ${BRAND}
          </div>

          <div
            style="
              margin-top:2.5mm;
              color:#172033;
              font-size:18px;
              line-height:1.2;
              font-weight:800;
            "
          >
            ${esc(title())}
          </div>

          <div
            style="
              margin-top:1.5mm;
              color:#667085;
              font-size:10.5px;
              line-height:1.3;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:.04em;
            "
          >
            ${esc(eyebrow())}
          </div>

        </div>

        <div
          style="
            flex:0 0 auto;
            text-align:right;
          "
        >

          <div
            style="
              color:#2457d6;
              font-size:18px;
              line-height:1.15;
              font-weight:900;
            "
          >
            ${WEBSITE}
          </div>

          <div
            style="
              margin-top:2mm;
              color:#667085;
              font-size:10px;
              font-weight:700;
            "
          >
            Free printable practice
          </div>

        </div>

      </div>
    `;

    return header;
  }

  function studentRow() {
    const row =
      document.createElement(
        "div"
      );

    row.style.cssText = [
      "position:relative",
      "z-index:2",
      "flex:0 0 auto",
      "display:flex",
      "justify-content:space-between",
      "gap:10mm",
      "margin-top:4mm",
      "font-size:12px",
      "font-weight:700"
    ].join(";");

    row.innerHTML = `
      <div style="flex:1;">
        Name:
        <span style="font-weight:400;">
          __________________________________
        </span>
      </div>

      <div>
        Date:
        <span style="font-weight:400;">
          __________________
        </span>
      </div>
    `;

    return row;
  }

  function makeFooter() {
    const footer =
      document.createElement(
        "footer"
      );

    footer.style.cssText = [
      "position:relative",
      "z-index:2",
      "flex:0 0 auto",
      "display:flex",
      "justify-content:space-between",
      "align-items:center",
      "gap:8mm",
      "padding-top:3mm",
      "border-top:1px solid #d8e0ea",
      "color:#667085",
      "font-size:10.5px",
      "font-weight:700"
    ].join(";");

    footer.innerHTML = `
      <div>
        ${BRAND} • Free learning resources
      </div>

      <div
        style="
          color:#2457d6;
          font-size:14px;
          font-weight:900;
        "
      >
        ${WEBSITE}
      </div>

      <div class="skillr-page-number">
        Page
      </div>
    `;

    return footer;
  }

  function watermark() {
    const mark =
      document.createElement(
        "div"
      );

    mark.textContent =
      "SkillrHub.com";

    mark.setAttribute(
      "aria-hidden",
      "true"
    );

    mark.style.cssText = [
      "position:absolute",
      "left:50%",
      "top:53%",
      "z-index:0",
      "transform:translate(-50%,-50%) rotate(-32deg)",
      "color:#2457d6",
      "font-size:58px",
      "font-weight:900",
      "letter-spacing:.02em",
      "opacity:.05",
      "white-space:nowrap",
      "pointer-events:none",
      "user-select:none"
    ].join(";");

    return mark;
  }

  function newPage(
    firstPage = false
  ) {
    const page =
      document.createElement(
        "section"
      );

    page.className =
      "skillr-pdf-page";

    page.style.cssText = [
      "width:215.9mm",
      "height:279.4mm",
      "box-sizing:border-box",
      "position:relative",
      "display:flex",
      "flex-direction:column",
      "padding:9mm 12mm 8mm",
      "background:#fff",
      "color:#172033",
      "font-family:Arial,Helvetica,sans-serif",
      "font-size:14px",
      "line-height:1.4",
      "overflow:hidden",
      "break-after:page",
      "page-break-after:always"
    ].join(";");

    const header =
      makeHeader();

    const content =
      document.createElement(
        "div"
      );

    content.className =
      "skillr-pdf-content";

    content.style.cssText = [
      "position:relative",
      "z-index:2",
      "flex:1 1 auto",
      "min-height:0",
      "overflow:hidden",
      "padding-top:2mm"
    ].join(";");

    const footer =
      makeFooter();

    page.append(
      watermark(),
      header
    );

    if (firstPage) {
      page.append(
        studentRow()
      );
    }

    page.append(
      content,
      footer
    );

    return {
      page,
      content,
      footer
    };
  }

  function collectImageUrls(items) {
    const urls =
      new Set();

    items.forEach(
      question => {

        if (question.image) {
          urls.add(
            question.image
          );
        }

        (question.items || [])
          .forEach(
            item => {

              if (
                item &&
                typeof item === "object" &&
                item.image
              ) {
                urls.add(
                  item.image
                );
              }

            }
          );

      }
    );

    return [...urls];
  }

  function preloadImages(items) {
    const urls =
      collectImageUrls(items);

    return Promise.all(
      urls.map(
        url =>
          new Promise(
            resolve => {

              const img =
                new Image();

              img.onload =
                resolve;

              img.onerror =
                resolve;

              img.src =
                url;

              if (img.complete) {
                resolve();
              }

            }
          )
      )
    );
  }

  function buildPagedWorksheet(
    items
  ) {
    const wrapper =
      document.createElement(
        "div"
      );

    wrapper.id =
      "skillrWorksheetPdf";

    wrapper.style.cssText =
      "width:215.9mm;margin:0;padding:0;background:#fff";

    const pages = [];

    function addPage(
      first = false
    ) {
      const data =
        newPage(first);

      wrapper.appendChild(
        data.page
      );

      pages.push(data);

      return data;
    }

    let current =
      addPage(true);

    items.forEach(
      (question, index) => {

        const block =
          questionBlock(
            question,
            index
          );

        current.content.appendChild(
          block
        );

        if (
          current.content.scrollHeight >
          current.content.clientHeight + 1
        ) {
          block.remove();

          current =
            addPage(false);

          current.content.appendChild(
            block
          );
        }

      }
    );

    const score =
      document.createElement(
        "div"
      );

    score.style.cssText =
      "padding:5mm 0 2mm;font-size:14px;font-weight:800;break-inside:avoid;page-break-inside:avoid";

    score.textContent =
      `Score: ______ / ${items.length}`;

    current.content.appendChild(
      score
    );

    if (
      current.content.scrollHeight >
      current.content.clientHeight + 1
    ) {
      score.remove();

      current =
        addPage(false);

      current.content.appendChild(
        score
      );
    }

    pages.forEach(
      (data, index) => {

        const number =
          $(
            ".skillr-page-number",
            data.footer
          );

        if (number) {
          number.textContent =
            `Page ${index + 1} of ${pages.length}`;
        }

        if (
          index ===
          pages.length - 1
        ) {
          data.page.style.breakAfter =
            "auto";

          data.page.style.pageBreakAfter =
            "auto";
        }

      }
    );

    return wrapper;
  }

  function loadPdfLibrary() {
    if (
      typeof window.html2pdf ===
      "function"
    ) {
      return Promise.resolve();
    }

    return new Promise(
      (resolve, reject) => {

        const existing =
          $(
            "script[data-skillr-html2pdf='true']"
          );

        if (existing) {
          existing.addEventListener(
            "load",
            resolve,
            {
              once: true
            }
          );

          existing.addEventListener(
            "error",
            reject,
            {
              once: true
            }
          );

          return;
        }

        const script =
          document.createElement(
            "script"
          );

        script.src =
          PDF_LIB;

        script.async =
          true;

        script.dataset.skillrHtml2pdf =
          "true";

        script.onload =
          resolve;

        script.onerror =
          reject;

        document.head.appendChild(
          script
        );

      }
    );
  }

  async function downloadWorksheet() {
    const items =
      questions();

    if (!items.length) {
      alert(
        "Questions are not loaded yet."
      );

      return;
    }

    const button =
      $("#downloadPdfButton");

    const oldText =
      button?.textContent ||
      "Download PDF worksheet";

    if (button) {
      button.disabled =
        true;

      button.textContent =
        "Preparing PDF…";
    }

    let layer;

    try {
      await loadPdfLibrary();

      await preloadImages(
        items
      );

      layer =
        document.createElement(
          "div"
        );

      layer.id =
        "skillrWorksheetRenderLayer";

      layer.style.cssText = [
        "position:fixed",
        "inset:0",
        "z-index:2147483647",
        "overflow:auto",
        "background:#fff",
        "pointer-events:none"
      ].join(";");

      document.body.appendChild(
        layer
      );

      const worksheet =
        buildPagedWorksheet(
          items
        );

      layer.appendChild(
        worksheet
      );

      await new Promise(
        resolve =>
          requestAnimationFrame(
            () =>
              requestAnimationFrame(
                resolve
              )
          )
      );

      const safeName =
        title()
          .replace(
            /[^a-z0-9]+/gi,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          )
          .toLowerCase() ||
        "skillrhub-worksheet";

      await window
        .html2pdf()
        .set({
          margin: 0,

          filename:
            `${safeName}-worksheet.pdf`,

          image: {
            type: "jpeg",
            quality: 0.98
          },

          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor:
              "#ffffff",
            scrollX: 0,
            scrollY: 0
          },

          jsPDF: {
            unit: "mm",
            format: "letter",
            orientation: "portrait"
          },

          pagebreak: {
            mode: [
              "css"
            ],
            avoid: [
              ".skillr-pdf-question",
              ".skillr-pdf-page header",
              ".skillr-pdf-page footer"
            ]
          }
        })
        .from(
          worksheet
        )
        .save();

    } catch (error) {
      console.error(
        "Worksheet PDF failed:",
        error
      );

      alert(
        "The PDF could not be created. Please refresh and try again."
      );

    } finally {
      layer?.remove();

      if (button) {
        button.disabled =
          false;

        button.textContent =
          oldText;
      }
    }
  }

  function setupButton() {
    let button =
      $("#downloadPdfButton");

    if (!button) {
      const start =
        $("#startButton");

      if (!start) {
        return;
      }

      button =
        document.createElement(
          "button"
        );

      button.id =
        "downloadPdfButton";

      button.type =
        "button";

      button.className =
        "button button-secondary";

      button.textContent =
        "Download PDF worksheet";

      start.insertAdjacentElement(
        "afterend",
        button
      );
    }

    button.addEventListener(
      "click",
      downloadWorksheet
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      setupButton,
      {
        once: true
      }
    );
  } else {
    setupButton();
  }
})();
