"use strict";

/* =========================================================
   SKILLRHUB WORKSHEET PDF - DIRECT PDF v18.4
   File path: /quiz/assets/worksheet-pdf.js

   IMPORTANT
   - Direct jsPDF drawing only. No html2canvas/html2pdf capture.
   - Uses as many US Letter pages as needed; never clips question text.
   - Creates a worksheet using the page's configured question count.
   - Future practice/exam pages can provide a dedicated worksheet bank.
   - Replaces the PDF button node during setup so stale listeners
     from older worksheet-pdf.js versions cannot also fire.
   ========================================================= */

(() => {
  const VERSION = "18.4";
  const JSPDF_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  const BRAND = "SkillrHub";
  const WEBSITE = "www.skillrhub.com";
  const WORKSHEET_LIMIT = Math.max(
    1,
    Number(window.quizConfig?.worksheetQuestionLimit) || 10
  );
  const PAPER_FRIENDLY_TYPES = new Set([
    "single",
    "true-false",
    "multiple",
    "text",
    "self-check",
    "number",
    "fill-blank",
    "order",
    "drag-drop",
    "drag-image"
  ]);

  const BLUE = [36, 87, 214];
  const TEXT = [23, 32, 51];
  const MUTED = [102, 112, 133];
  const LINE = [216, 224, 234];
  const NOTE_FILL = [246, 248, 255];
  const NOTE_BORDER = [205, 217, 246];

  // Normalise common punctuation and damaged encodings before printing.
  // The first two patterns also repair common UTF-8 mojibake forms of U+2212.
  const MOJIBAKE_MINUS = /\u00E2(?:\u02C6\u2019|\u0088\u0092)/g;
  const MINUS_OR_DASH = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;

  const $ = (selector, root = document) => root.querySelector(selector);

  function normaliseText(value) {
    return String(value ?? "")
      .replace(MOJIBAKE_MINUS, "-")
      .replace(MINUS_OR_DASH, "-")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\u2026/g, "...")
      .replace(/\u00A0/g, " ")
      .trim();
  }

  function getTitle() {
    return (
      $("#quizTitle, main h1, h1")?.textContent?.trim() ||
      document.title ||
      "Practice Worksheet"
    );
  }

  function getEyebrow() {
    return (
      $(".start-card .eyebrow, .eyebrow")?.textContent?.trim() ||
      "Foundation Mathematics"
    );
  }

  function getSkillCode() {
    const config = window.quizConfig || {};
    const configuredCode =
      config.skillCode ||
      config.curriculumCode ||
      config.code;

    if (configuredCode) {
      return normaliseText(configuredCode).toUpperCase();
    }

    const firstQuestion = getWorksheetQuestionBank()[0] || {};
    const questionCode =
      firstQuestion.curriculumCode ||
      firstQuestion.skillCode ||
      firstQuestion.code;

    if (questionCode) {
      return normaliseText(questionCode).toUpperCase();
    }

    const pageText = `${getEyebrow()} ${getTitle()}`;
    const curriculumMatch = pageText.match(/\bAC9[A-Z0-9]+\b/i);

    if (curriculumMatch) {
      return curriculumMatch[0].toUpperCase();
    }

    const dailyYear = window.SKILLR_DAILY_YEAR;
    const dailySubject = window.SKILLR_DAILY_SUBJECT;
    const dailySkill = window.SKILLR_DAILY_SKILL;

    if (dailyYear && dailySubject && dailySkill) {
      return normaliseText(
        `Y${dailyYear}-${dailySubject}-${dailySkill}`
      ).toUpperCase();
    }

    return "";
  }

  function getGlobalQuestionArray(name) {
    return Array.isArray(window[name]) ? window[name] : [];
  }

  function getWorksheetQuestionBank() {
    const explicitWorksheetBank = [
      ...getGlobalQuestionArray("skillrWorksheetQuestions"),
      ...getGlobalQuestionArray("quizWorksheetQuestions")
    ];

    if (explicitWorksheetBank.length) {
      return explicitWorksheetBank;
    }

    const practiceExamBanks = [
      ...getGlobalQuestionArray("skillrPracticeQuestions"),
      ...getGlobalQuestionArray("skillrExamQuestions"),
      ...getGlobalQuestionArray("quizPracticeQuestions"),
      ...getGlobalQuestionArray("quizExamQuestions")
    ];

    if (practiceExamBanks.length) {
      return practiceExamBanks;
    }

    const fullQuizBank = getGlobalQuestionArray("quizQuestions");

    if (fullQuizBank.length) {
      return fullQuizBank;
    }

    return getGlobalQuestionArray("skillrActiveQuestions");
  }

  function questionKey(question) {
    return normaliseText(
      question?.id ||
        `${question?.curriculumCode || ""}|${question?.question || ""}`
    );
  }

  function uniqueQuestions(questions) {
    const seen = new Set();

    return questions.filter((question) => {
      const key = questionKey(question);

      if (!key || seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  function shuffleArray(items) {
    const copy = [...items];

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));

      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }

    return copy;
  }

  function isPaperFriendly(question) {
    if (
      !question ||
      question.printable === false ||
      question.worksheet === false ||
      question.excludeFromWorksheet === true
    ) {
      return false;
    }

    const type = question?.type || "single";

    if (!PAPER_FRIENDLY_TYPES.has(type)) {
      return false;
    }

    if (type === "single" || type === "true-false" || type === "multiple") {
      return (question.answers || []).map(optionText).filter(Boolean).length >= 2;
    }

    if (type === "fill-blank") {
      return Boolean(question.template || question.question);
    }

    if (type === "order" || type === "drag-drop") {
      return (question.items || []).map(itemText).filter(Boolean).length >= 2;
    }

    if (type === "drag-image") {
      return (
        (question.items || []).length > 0 &&
        (question.categories || []).length > 0
      );
    }

    return true;
  }

  function getPrintableQuestions() {
    const practiceLimit = Math.max(
      0,
      Number(window.quizConfig?.worksheetPracticeSelection) || 0
    );
    const examLimit = Math.max(
      0,
      Number(window.quizConfig?.worksheetExamSelection) || 0
    );
    const practiceBank = uniqueQuestions([
      ...getGlobalQuestionArray("skillrPracticeQuestions"),
      ...getGlobalQuestionArray("quizPracticeQuestions")
    ]).filter(isPaperFriendly);
    const examBank = uniqueQuestions([
      ...getGlobalQuestionArray("skillrExamQuestions"),
      ...getGlobalQuestionArray("quizExamQuestions")
    ]).filter(isPaperFriendly);

    if (
      practiceLimit + examLimit === WORKSHEET_LIMIT &&
      practiceBank.length >= practiceLimit &&
      examBank.length >= examLimit
    ) {
      return [
        ...shuffleArray(practiceBank).slice(0, practiceLimit),
        ...shuffleArray(examBank).slice(0, examLimit)
      ];
    }

    const printablePool = uniqueQuestions(getWorksheetQuestionBank())
      .filter(isPaperFriendly);

    return shuffleArray(printablePool).slice(0, WORKSHEET_LIMIT);
  }

  function setText(doc, rgb) {
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  }

  function setDraw(doc, rgb) {
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  }

  function setFill(doc, rgb) {
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  }

  function wrap(doc, text, width) {
    const value = normaliseText(text);
    if (!value) return [];
    const lines = doc.splitTextToSize(value, width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function optionText(value) {
    if (typeof value === "string" || typeof value === "number") {
      return normaliseText(value);
    }
    if (value && typeof value === "object") {
      return normaliseText(value.label || value.alt || value.id || "");
    }
    return "";
  }

  function itemText(value) {
    return optionText(value);
  }

  function loadJsPdf() {
    // jsPDF from html2pdf bundles is still capable of direct drawing.
    if (window.jspdf?.jsPDF) {
      return Promise.resolve(window.jspdf.jsPDF);
    }

    return new Promise((resolve, reject) => {
      const previous = document.querySelector(
        'script[data-skillr-direct-jspdf="true"]'
      );

      const finish = () => {
        if (window.jspdf?.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error("jsPDF did not initialise."));
        }
      };

      if (previous) {
        previous.addEventListener("load", finish, { once: true });
        previous.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = JSPDF_URL;
      script.async = true;
      script.dataset.skillrDirectJspdf = "true";
      script.addEventListener("load", finish, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function imageToDataUrl(url) {
    if (!url) return null;
    try {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) return null;
      const blob = await response.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  async function preloadImages(questions) {
    const urls = [...new Set(questions.map((q) => q.image).filter(Boolean))];
    const map = new Map();
    await Promise.all(
      urls.map(async (url) => {
        map.set(url, await imageToDataUrl(url));
      })
    );
    return map;
  }

  let fontFilesPromise;
  async function loadPrintFonts(doc) {
    fontFilesPromise ||= Promise.all(["DejaVuSans.ttf", "DejaVuSans-Bold.ttf"].map(async (file) => {
      const response = await fetch(`/quiz/assets/fonts/${file}`, { credentials: "same-origin" });
      if (!response.ok) throw new Error("The worksheet font could not load. Please try again.");
      const bytes = new Uint8Array(await response.arrayBuffer());
      let binary = "";
      for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
      return { file, data: btoa(binary) };
    })).catch((error) => { fontFilesPromise = null; throw error; });
    const files = await fontFilesPromise;
    files.forEach(({file, data}, index) => {
      doc.addFileToVFS(file, data);
      doc.addFont(file, "Worksheet", index ? "bold" : "normal");
    });
  }

  // Resolve authored SVG symbols before rasterising: an SVG loaded as an image
  // cannot reliably fetch a separate <use> file. Never print its alt text as a
  // substitute: alt text may reveal the answer to a visual question.
  const svgSources = new Map();
  async function printableSvg(markup) {
    const xml = new DOMParser().parseFromString(markup, "image/svg+xml");
    const svg = xml.documentElement;
    if (svg.localName !== "svg" || xml.querySelector("parsererror")) throw new Error("A worksheet diagram could not be read.");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    for (const use of [...svg.querySelectorAll("use")]) {
      const href = use.getAttribute("href") || use.getAttribute("xlink:href") || "";
      const split = href.lastIndexOf("#");
      if (split < 0) throw new Error("A worksheet diagram reference is incomplete.");
      const source = href.slice(0, split), id = href.slice(split + 1);
      let owner = xml;
      if (source) {
        if (!svgSources.has(source)) svgSources.set(source, fetch(source, { credentials: "same-origin" }).then(async response => {
          if (!response.ok) throw new Error("A worksheet diagram could not load. Please try again.");
          return new DOMParser().parseFromString(await response.text(), "image/svg+xml");
        }).catch(error => { svgSources.delete(source); throw error; }));
        owner = await svgSources.get(source);
      }
      const symbol = owner.getElementById(id);
      if (!symbol) throw new Error("A worksheet diagram is missing its labelled shape.");
      const nested = xml.createElementNS("http://www.w3.org/2000/svg", "svg");
      for (const attribute of ["x", "y", "width", "height", "transform"]) {
        if (use.hasAttribute(attribute)) nested.setAttribute(attribute, use.getAttribute(attribute));
      }
      if (symbol.hasAttribute("viewBox")) nested.setAttribute("viewBox", symbol.getAttribute("viewBox"));
      for (const child of [...symbol.childNodes]) nested.appendChild(xml.importNode(child, true));
      use.replaceWith(nested);
    }
    const view = (svg.getAttribute("viewBox") || "0 0 640 300").split(/[ ,]+/).map(Number);
    svg.setAttribute("width", String(view[2] || 640));
    svg.setAttribute("height", String(view[3] || 300));
    return new XMLSerializer().serializeToString(svg);
  }

  async function rasteriseSvg(markup) {
    const svg = await printableSvg(markup);
    const objectUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    try {
      const picture = new Image();
      await new Promise((resolve, reject) => { picture.onload = resolve; picture.onerror = () => reject(new Error("A worksheet diagram could not render.")); picture.src = objectUrl; });
      const canvas = document.createElement("canvas");
      const scale = Math.min(3, 1600 / Math.max(picture.naturalWidth, 1));
      canvas.width = Math.ceil(picture.naturalWidth * scale);
      canvas.height = Math.ceil(picture.naturalHeight * scale);
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(picture, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    } finally { URL.revokeObjectURL(objectUrl); }
  }

  async function loadQuestionVisuals(questions) {
    const result = new Map();
    await Promise.all(questions.map(async (question) => {
      let data;
      if (question.visualHtml && /^\s*<svg\b/.test(question.visualHtml)) data = await rasteriseSvg(question.visualHtml);
      else if (question.image) {
        if (/\.svg(?:[?#]|$)/i.test(question.image)) {
          const response = await fetch(question.image, {credentials:"same-origin"});
          if (!response.ok) throw new Error("A worksheet image could not load.");
          data = await rasteriseSvg(await response.text());
        } else data = await imageToDataUrl(question.image);
        if (!data) throw new Error("A worksheet image could not load. Please try again.");
      }
      if (data) result.set(question, data);
    }));
    return result;
  }

  function answerFor(question) {
    const type = question.type || "single";
    const answers = question.answers || [];
    const correct = question.correct;
    const choice = index => Number.isInteger(index) && index >= 0 && index < answers.length ? `${String.fromCharCode(65 + index)}. ${optionText(answers[index])}` : "";
    if (["single", "true-false"].includes(type)) return choice(correct);
    if (type === "multiple" && Array.isArray(correct)) return correct.map(choice).filter(Boolean).join("; ");
    if (type === "order" || type === "drag-drop") {
      if (!Array.isArray(correct)) return "";
      return correct.map(value => itemText((question.items || []).find(item => typeof item === "object" && item.id === value) || value)).join(" → ");
    }
    if (type === "drag-image") {
      if (!correct || Array.isArray(correct) || typeof correct !== "object") return "";
      return (question.items || []).map(item => {
        const category = (question.categories || []).find(group => group.id === correct[item.id]);
        return category ? `${itemText(item)}: ${optionText(category)}` : "";
      }).filter(Boolean).join("; ");
    }
    if (question.modelAnswer) return normaliseText(question.modelAnswer);
    if (Array.isArray(question.acceptedAnswers)) return question.acceptedAnswers.map(normaliseText).join(" / ");
    return (typeof correct === "string" || typeof correct === "number") ? normaliseText(correct) : "";
  }

  async function createPdf(questions) {
    const JsPDF = await loadJsPdf();
    const doc = new JsPDF({ orientation:"portrait", unit:"mm", format:"letter", compress:true, putOnlyUsedFonts:true });
    await loadPrintFonts(doc);
    const images = await loadQuestionVisuals(questions);
    doc.setProperties({ title:`${getTitle()} - Worksheet and answer guide`, subject:`SkillrHub direct worksheet PDF v${VERSION}`, author:BRAND, creator:`SkillrHub worksheet-pdf.js v${VERSION}` });
    const pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight();
    const margin = 15, width = pageW - margin * 2, bottom = pageH - 20;
    let y = 20, section = "Worksheet", activeQuestion = "";
    const font = (size = 12, bold = false, color = TEXT) => { doc.setFont("Worksheet", bold ? "bold" : "normal"); doc.setFontSize(size); setText(doc, color); };
    function newPage() {
      doc.addPage(); y = 17;
      font(9, true, BLUE); doc.text(`${BRAND} · ${getSkillCode()} · ${section}${activeQuestion ? " · " + activeQuestion + " continued" : ""}`, margin, y);
      setDraw(doc, LINE); doc.line(margin, y + 3, pageW - margin, y + 3); y += 12;
    }
    function ensure(height) { if (y + height > bottom) newPage(); }
    function paragraph(text, {size=12, bold=false, indent=0, after=3, color=TEXT} = {}) {
      font(size, bold, color);
      const lines = wrap(doc, text, width - indent), lineHeight = size * 0.3528 * 1.4;
      for (const line of lines) { ensure(lineHeight); font(size, bold, color); doc.text(line, margin + indent, y); y += lineHeight; }
      y += after;
    }
    function writingLines(count = 2) {
      for (let i = 0; i < count; i++) { ensure(9); setDraw(doc, LINE); doc.setLineWidth(0.2); doc.line(margin, y + 5, pageW - margin, y + 5); y += 9; }
    }
    paragraph(BRAND, {size:22,bold:true,color:BLUE});
    paragraph(getTitle(), {size:16,bold:true});
    paragraph(`${getEyebrow()} · ${getSkillCode()}`, {size:10,color:MUTED});
    paragraph("Name: __________________________   Date: ______________", {size:11,after:5});
    paragraph(`Complete ${questions.length} questions. Show working or explain your choice where useful. Try the questions before using the separate answer guide.`, {size:10,after:7});
    questions.forEach((question, index) => {
      activeQuestion = "";
      const stem = `${index + 1}. ${question.question || ""}`;
      font(12,true);
      const stemHeight = wrap(doc,stem,width).length * 5.93;
      // These authored Year 4 tasks need all four writing lines
      // beside their prompt, even when the worksheet order is shuffled.
      const keepWrittenWorkspace = question.type === "self-check"
        && /^(?:AC9M4(?:N0[6-9]|A0[12]|M0[1-4]|SP0[1-3]|ST0[1-3]|P0[12])|AC9S4U0[123])$/.test(getSkillCode())
        && question.curriculumCode === getSkillCode()
        && new RegExp(`^${getSkillCode().toLowerCase()}-w-\\d{3}$`).test(question.id || "");
      const writingAllowance = keepWrittenWorkspace ? 46 : 28;
      let contentAllowance = images.has(question) ? 60 : writingAllowance;
      if (keepWrittenWorkspace && images.has(question)) {
        const imageProps = doc.getImageProperties(images.get(question));
        const printedImageHeight = Math.min(width / imageProps.width, 75 / imageProps.height) * imageProps.height;
        // Keep the authored measurement prompt, its actual diagram and writing
        // space together, rather than leaving the diagram on the next page.
        contentAllowance = printedImageHeight + 5 + writingAllowance;
      }
      ensure(Math.min(stemHeight + contentAllowance, bottom - 35));
      activeQuestion = `Question ${index + 1}`;
      paragraph(stem, {bold:true});
      const picture = images.get(question);
      if (picture) {
        const props = doc.getImageProperties(picture);
        const scale = Math.min(width / props.width, 75 / props.height);
        const imageW = props.width * scale, imageH = props.height * scale;
        ensure(imageH + 5); doc.addImage(picture, props.fileType || "PNG", margin + (width-imageW)/2, y, imageW, imageH); y += imageH + 5;
      } else if (question.visual && normaliseText(question.visual) !== normaliseText(question.question)) {
        paragraph(question.visual, {size:12,indent:4});
      }
      const type = question.type || "single";
      if (["single","true-false","multiple"].includes(type)) {
        if (type === "multiple") paragraph("Select all correct answers.", {size:10,bold:true});
        (question.answers || []).forEach((answer, option) => paragraph(`${String.fromCharCode(65+option)}. ${optionText(answer)}`, {indent:5,after:1}));
        writingLines(1);
      } else if (type === "fill-blank") {
        paragraph((question.template || "{{blank}}").replace(/\{\{blank\}\}/g,"____________")); writingLines(1);
      } else if (type === "order" || type === "drag-drop") {
        paragraph("Put these in order: " + (question.items || []).map(itemText).join(" · ")); writingLines(2);
      } else if (type === "drag-image") {
        paragraph("Groups: " + (question.categories || []).map(optionText).join(" / "));
        (question.items || []).forEach(item => paragraph(`${itemText(item)}: ____________________`));
      } else writingLines(type === "self-check" ? 4 : 2);
      y += 7;
    });
    activeQuestion = "";
    section = "Answer guide"; newPage();
    paragraph("Answer guide", {size:18,bold:true,color:BLUE});
    paragraph("These answers match this worksheet's question order. Use an error to choose what to practise next.", {size:10,after:6});
    questions.forEach((question, index) => {
      activeQuestion = ""; ensure(26); activeQuestion = `Answer ${index + 1}`;
      const answer = answerFor(question);
      paragraph(`${index + 1}. ${answer || "Check this response with your teacher; no answer is supplied in this question bank."}`, {bold:true});
      const explanation = question.explanation || question.structuredExplanation?.summary;
      if (explanation && normaliseText(explanation) !== normaliseText(answer)) paragraph(explanation, {size:11,after:6});
    });
    const pages = doc.getNumberOfPages();
    for (let page = 1; page <= pages; page++) {
      doc.setPage(page); setDraw(doc, LINE); doc.line(margin, pageH-15, pageW-margin, pageH-15);
      font(9,false,MUTED); doc.text(WEBSITE, margin, pageH-9); doc.text(`Page ${page} of ${pages}`, pageW-margin, pageH-9, {align:"right"});
    }
    const safeName = getTitle().replace(/[^a-z0-9]+/gi,"-").replace(/^-+|-+$/g,"").toLowerCase() || "skillrhub-worksheet";
    doc.save(`${safeName}-worksheet.pdf`);
  }

  async function downloadWorksheet() {
    const questions = getPrintableQuestions();

    if (questions.length < WORKSHEET_LIMIT) {
      alert(`This homework needs ${WORKSHEET_LIMIT} unique printable questions. Please add more paper-friendly questions to this set.`);
      return;
    }

    const button = $("#downloadPdfButton");
    const original = button?.textContent || "Homework";

    if (button) {
      button.disabled = true;
      button.textContent = "Preparing PDF...";
    }

    try {
      await createPdf(questions);
    } catch (error) {
      console.error(`SkillrHub direct PDF v${VERSION} failed:`, error);
      alert(error?.message || "The PDF could not be created. Please refresh the page and try again.");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = original;
      }
    }
  }

  function setup() {
    let button = $("#downloadPdfButton");

    if (!button) {
      const startButton = $("#startButton");
      if (!startButton) return;

      button = document.createElement("button");
      button.id = "downloadPdfButton";
      button.type = "button";
      button.className = "button button-secondary";
      button.textContent = "Homework";
      startButton.insertAdjacentElement("afterend", button);
    }

    // Critical: cloning removes event listeners attached by any old cached
    // worksheet-pdf.js. This prevents two generators firing from one click.
    const fresh = button.cloneNode(true);
    fresh.dataset.pdfGenerator = `direct-v${VERSION}`;
    button.replaceWith(fresh);
    fresh.addEventListener("click", downloadWorksheet);

    window.skillrWorksheetPdfVersion = VERSION;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
