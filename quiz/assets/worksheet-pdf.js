"use strict";

/* =========================================================
   SKILLR WORKSHEET PDF
   Shared file: /quiz/assets/worksheet-pdf.js

   PURPOSE
   - Uses the SAME 5 questions selected for the quiz attempt
     when window.skillrActiveQuestions is available.
   - Creates a simple A4 worksheet.
   - Downloads it as a PDF.
   - Includes www.skillrhub.com branding.
   - Supports:
       single
       true-false
       multiple
       text
       number
       fill-blank
       order
       drag-drop
       drag-image

   IMPORTANT
   Add ONE line to shared script.js immediately after:
       activeQuestions = prepareQuestions();

   Add:
       window.skillrActiveQuestions = activeQuestions;

   Load this file AFTER questions.js and AFTER script.js:
       <script src="/quiz/assets/worksheet-pdf.js?v=1"></script>

   If html2pdf is not already loaded, this script loads it
   automatically from cdnjs.
   ========================================================= */

(() => {

  const PDF_LIBRARY_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

  const WEBSITE =
    "www.skillrhub.com";


  /* =======================================================
     HELPERS
     ======================================================= */

  function escapeHtml(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function getPageTitle() {

    const heading =
      document.querySelector(
        "#quizTitle, main h1, h1"
      );

    return (
      heading?.textContent?.trim() ||
      document.title ||
      "Practice Worksheet"
    );

  }


  function getEyebrow() {

    const eyebrow =
      document.querySelector(
        ".start-card .eyebrow, .eyebrow"
      );

    return (
      eyebrow?.textContent?.trim() ||
      "SkillrHub Practice"
    );

  }


  function getWorksheetQuestions() {

    if (
      Array.isArray(
        window.skillrActiveQuestions
      ) &&
      window.skillrActiveQuestions.length > 0
    ) {
      return window.skillrActiveQuestions;
    }


    /*
      Fallback:
      This is only used if the tiny script.js integration
      line has not been added yet.
    */

    const bank =
      Array.isArray(window.quizQuestions)
        ? window.quizQuestions
        : [];

    const maximum =
      Number(
        window.quizConfig?.maxQuestions || 5
      );

    return bank.slice(
      0,
      Number.isInteger(maximum) &&
      maximum > 0
        ? maximum
        : 5
    );

  }


  function blankLine(
    width = "100%"
  ) {

    return `
      <div
        style="
          width:${width};
          min-height:28px;
          margin-top:10px;
          border-bottom:1px solid #667085;
        "
      ></div>
    `;

  }


  function renderQuestionImage(question) {

    if (!question.image) {
      return "";
    }

    return `
      <div style="text-align:center; margin:12px 0 14px;">
        <img
          src="${escapeHtml(question.image)}"
          alt="${escapeHtml(question.imageAlt || "")}"
          style="
            max-width:240px;
            max-height:180px;
            object-fit:contain;
          "
        >
      </div>
    `;

  }


  function renderVisual(question) {

    if (!question.visual) {
      return "";
    }

    return `
      <div
        style="
          margin:10px 0 14px;
          padding:10px;
          text-align:center;
          white-space:pre-line;
          font-size:18px;
          line-height:1.5;
        "
      >
        ${escapeHtml(question.visual)}
      </div>
    `;

  }


  /* =======================================================
     QUESTION TYPE → PAPER FORMAT
     ======================================================= */

  function renderSingle(
    question
  ) {

    const options =
      (question.answers || [])
        .map(
          (answer, index) => `
            <div style="margin:6px 0;">
              <span style="display:inline-block; width:22px;">
                ${String.fromCharCode(65 + index)}.
              </span>
              ${escapeHtml(answer)}
            </div>
          `
        )
        .join("");

    return `
      ${renderQuestionImage(question)}
      ${renderVisual(question)}
      <div style="margin-top:8px;">
        ${options}
      </div>
    `;

  }


  function renderMultiple(
    question
  ) {

    const options =
      (question.answers || [])
        .map(
          (answer) => `
            <div style="margin:7px 0;">
              ☐ ${escapeHtml(answer)}
            </div>
          `
        )
        .join("");

    return `
      ${renderQuestionImage(question)}
      ${renderVisual(question)}
      <div
        style="
          margin:8px 0 6px;
          color:#667085;
          font-size:12px;
        "
      >
        Select all correct answers.
      </div>
      ${options}
    `;

  }


  function renderTextOrNumber(
    question
  ) {

    return `
      ${renderQuestionImage(question)}
      ${renderVisual(question)}
      ${blankLine("70%")}
    `;

  }


  function renderFillBlank(
    question
  ) {

    const template =
      escapeHtml(
        question.template || "______"
      )
        .replace(
          /\{\{blank\}\}/g,
          "__________"
        );

    return `
      ${renderQuestionImage(question)}
      ${renderVisual(question)}
      <div
        style="
          margin-top:12px;
          font-size:16px;
          line-height:1.8;
        "
      >
        ${template}
      </div>
    `;

  }


  function renderOrder(
    question
  ) {

    const items =
      (question.items || [])
        .map(escapeHtml)
        .join("&nbsp;&nbsp;&nbsp;&nbsp;");

    return `
      ${renderQuestionImage(question)}
      ${renderVisual(question)}

      <div
        style="
          margin-top:10px;
          padding:10px;
          border:1px solid #d8e0ea;
          border-radius:8px;
          text-align:center;
        "
      >
        ${items}
      </div>

      ${blankLine()}
    `;

  }


  function renderDragImage(
    question
  ) {

    const categoryLabels =
      (question.categories || [])
        .map(
          (category) =>
            escapeHtml(category.label)
        )
        .join(" / ");


    const itemRows =
      (question.items || [])
        .map(
          (item) => {

            const label =
              escapeHtml(
                item.label ||
                item.alt ||
                item.id
              );

            return `
              <div
                style="
                  display:flex;
                  align-items:center;
                  gap:12px;
                  margin:10px 0;
                  page-break-inside:avoid;
                "
              >

                <img
                  src="${escapeHtml(item.image)}"
                  alt="${escapeHtml(item.alt || "")}"
                  style="
                    width:62px;
                    height:62px;
                    object-fit:contain;
                  "
                >

                <div style="flex:1;">
                  <strong>${label}</strong>
                  <div
                    style="
                      margin-top:5px;
                      color:#667085;
                      font-size:12px;
                    "
                  >
                    Group: ${categoryLabels}
                  </div>
                  ${blankLine("85%")}
                </div>

              </div>
            `;

          }
        )
        .join("");

    return `
      <div
        style="
          margin-top:8px;
          color:#667085;
          font-size:12px;
        "
      >
        Write the correct group for each picture.
      </div>

      ${itemRows}
    `;

  }


  function renderQuestionBody(
    question
  ) {

    const type =
      question.type || "single";


    if (
      type === "single" ||
      type === "true-false"
    ) {
      return renderSingle(question);
    }


    if (type === "multiple") {
      return renderMultiple(question);
    }


    if (
      type === "text" ||
      type === "number"
    ) {
      return renderTextOrNumber(
        question
      );
    }


    if (type === "fill-blank") {
      return renderFillBlank(
        question
      );
    }


    if (
      type === "order" ||
      type === "drag-drop"
    ) {
      return renderOrder(question);
    }


    if (type === "drag-image") {
      return renderDragImage(
        question
      );
    }


    return `
      ${renderQuestionImage(question)}
      ${renderVisual(question)}
      ${blankLine()}
    `;

  }


  /* =======================================================
     BUILD WORKSHEET
     ======================================================= */

  function buildWorksheet(
    questions
  ) {

    const wrapper =
      document.createElement("div");

    wrapper.id =
      "skillrWorksheetPdf";

    wrapper.style.cssText = `
      width: 190mm;
      padding: 12mm 13mm 14mm;
      background: #ffffff;
      color: #172033;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.45;
    `;


    const questionsHtml =
      questions
        .map(
          (question, index) => `
            <section
              style="
                margin-top:22px;
                padding-top:6px;
                page-break-inside:avoid;
              "
            >

              <div
                style="
                  display:flex;
                  align-items:flex-start;
                  gap:9px;
                "
              >

                <strong
                  style="
                    min-width:22px;
                    font-size:15px;
                  "
                >
                  ${index + 1}.
                </strong>

                <div style="flex:1;">

                  <div
                    style="
                      font-size:15px;
                      font-weight:700;
                    "
                  >
                    ${escapeHtml(question.question)}
                  </div>

                  ${renderQuestionBody(question)}

                </div>

              </div>

            </section>
          `
        )
        .join("");


    wrapper.innerHTML = `

      <header
        style="
          padding-bottom:12px;
          border-bottom:2px solid #2457d6;
        "
      >

        <div
          style="
            font-size:12px;
            font-weight:700;
            color:#2457d6;
            text-transform:uppercase;
            letter-spacing:0.06em;
          "
        >
          ${escapeHtml(getEyebrow())}
        </div>

        <h1
          style="
            margin:5px 0 4px;
            font-size:24px;
            line-height:1.2;
          "
        >
          ${escapeHtml(getPageTitle())}
        </h1>

        <div
          style="
            color:#667085;
            font-size:12px;
          "
        >
          ${WEBSITE}
        </div>

      </header>


      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:24px;
          margin-top:16px;
        "
      >

        <div style="flex:1;">
          Name:
          <span>
            __________________________________
          </span>
        </div>

        <div>
          Date:
          <span>
            __________________
          </span>
        </div>

      </div>


      ${questionsHtml}


      <div
        style="
          margin-top:30px;
          font-weight:700;
        "
      >
        Score: ______ / ${questions.length}
      </div>


      <footer
        style="
          margin-top:28px;
          padding-top:10px;
          border-top:1px solid #d8e0ea;
          color:#667085;
          font-size:10px;
          text-align:center;
        "
      >
        Free learning resources • ${WEBSITE}
      </footer>
    `;


    return wrapper;

  }


  /* =======================================================
     PDF LIBRARY
     ======================================================= */

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
          document.querySelector(
            'script[data-skillr-html2pdf="true"]'
          );


        if (existing) {

          existing.addEventListener(
            "load",
            () => resolve(),
            { once: true }
          );

          existing.addEventListener(
            "error",
            () => reject(
              new Error(
                "PDF library failed to load."
              )
            ),
            { once: true }
          );

          return;
        }


        const script =
          document.createElement(
            "script"
          );

        script.src =
          PDF_LIBRARY_URL;

        script.async =
          true;

        script.dataset.skillrHtml2pdf =
          "true";


        script.addEventListener(
          "load",
          () => resolve(),
          { once: true }
        );


        script.addEventListener(
          "error",
          () => reject(
            new Error(
              "PDF library failed to load."
            )
          ),
          { once: true }
        );


        document.head.appendChild(
          script
        );

      }
    );

  }


  /* =======================================================
     DOWNLOAD
     ======================================================= */

  async function downloadWorksheetPdf() {

    const questions =
      getWorksheetQuestions();


    if (questions.length === 0) {

      alert(
        "Questions are not loaded yet."
      );

      return;
    }


    const button =
      document.getElementById(
        "downloadPdfButton"
      );


    const originalText =
      button?.textContent || "";


    if (button) {

      button.disabled = true;

      button.textContent =
        "Preparing PDF…";

    }


    try {

      await loadPdfLibrary();


      const worksheet =
        buildWorksheet(
          questions
        );


      worksheet.style.position =
        "fixed";

      worksheet.style.left =
        "-10000px";

      worksheet.style.top =
        "0";


      document.body.appendChild(
        worksheet
      );


      /*
        Wait briefly so browser-loaded SVG/PNG images
        have a chance to render before capture.
      */

      const images =
        [
          ...worksheet.querySelectorAll(
            "img"
          )
        ];


      await Promise.all(
        images.map(
          (image) => {

            if (image.complete) {
              return Promise.resolve();
            }

            return new Promise(
              (resolve) => {

                image.addEventListener(
                  "load",
                  resolve,
                  { once: true }
                );

                image.addEventListener(
                  "error",
                  resolve,
                  { once: true }
                );

              }
            );

          }
        )
      );


      const safeTitle =
        getPageTitle()
          .replace(
            /[^a-z0-9]+/gi,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          )
          .toLowerCase() ||
        "skillr-worksheet";


      await window
        .html2pdf()
        .set({
          margin: 0,
          filename:
            `${safeTitle}-worksheet.pdf`,

          image: {
            type: "jpeg",
            quality: 0.98
          },

          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
          },

          jsPDF: {
            unit: "mm",
            format: "letter",
            orientation: "portrait"
          },

          pagebreak: {
            mode: [
              "css",
              "legacy"
            ]
          }
        })
        .from(worksheet)
        .save();


      worksheet.remove();

    } catch (error) {

      console.error(
        "Worksheet PDF failed:",
        error
      );

      alert(
        "The PDF could not be created. Please refresh the page and try again."
      );

    } finally {

      if (button) {

        button.disabled = false;

        button.textContent =
          originalText ||
          "Download PDF Worksheet";

      }

    }

  }


  /* =======================================================
     BUTTON SETUP
     ======================================================= */

  function setupWorksheetButton() {

    let button =
      document.getElementById(
        "downloadPdfButton"
      );


    /*
      If index.html does not already contain the button,
      create it beside Start Quiz automatically.
    */

    if (!button) {

      const startButton =
        document.getElementById(
          "startButton"
        );


      if (!startButton) {
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
        "Download PDF Worksheet";


      startButton.insertAdjacentElement(
        "afterend",
        button
      );

    }


    button.addEventListener(
      "click",
      downloadWorksheetPdf
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      setupWorksheetButton,
      { once: true }
    );

  } else {

    setupWorksheetButton();

  }

})();
