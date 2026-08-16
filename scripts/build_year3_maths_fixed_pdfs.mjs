#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, execSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadYear3MathsUnits, escapeHtml as esc, asList } from "./year3_maths_static_helpers.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { units, codes } = loadYear3MathsUnits(ROOT);
const PDF_DIR = path.join(ROOT, "worksheets/year3/maths/teacher-slides");
const TEMP = fs.mkdtempSync(path.join(os.tmpdir(), "skillr-y3-maths-fixed-"));
fs.mkdirSync(PDF_DIR, { recursive: true });
const modelCss = fs.readFileSync(path.join(ROOT, "assets/year3-maths-static.css"), "utf8");
const chrome = [process.env.CHROME_BIN, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
  .filter(Boolean)
  .find((candidate) => {
    try { execFileSync("bash", ["-lc", `command -v ${candidate}`], { stdio: "ignore" }); return true; }
    catch { return false; }
  });
if (!chrome) throw new Error("Chrome or Chromium is required to build fixed Year 3 Maths PDFs.");

const watermarks = () => `<div class="watermarks" aria-hidden="true">${Array.from({ length: 12 }, () => "<span>SkillrHub • skillrhub.com</span>").join("")}</div>`;
const footer = (code) => `<footer><strong>${esc(code)}</strong><span>SkillrHub • skillrhub.com</span></footer>`;
const slide = (code, label, body) => `<section class="pdf-slide">${watermarks()}<header><div class="brand">SkillrHub <span>F–10</span></div><div>${esc(label)}</div></header><main>${body}</main>${footer(code)}</section>`;
const listHtml = (items) => `<ul>${asList(items).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

const slideCss = `
@page{size:13.333333in 7.5in;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;color:#203047;font-family:Arial,Helvetica,sans-serif}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.pdf-slide{position:relative;isolation:isolate;width:1280px;height:720px;padding:26px 40px 24px;overflow:hidden;page-break-after:always;background:#fff;display:grid;grid-template-rows:45px minmax(0,1fr) 27px}.pdf-slide:last-child{page-break-after:auto}.pdf-slide>header{position:relative;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 6px 9px;border-bottom:2px solid #d8e2ef;color:#173968;font-size:17px;font-weight:850}.brand{color:#2457d6;font-size:22px;font-weight:900}.brand span{color:#173968}.pdf-slide>main{position:relative;z-index:3;min-height:0;padding:16px 8px 9px;overflow:hidden}.pdf-slide footer{position:relative;z-index:4;display:flex;align-items:end;justify-content:space-between;gap:18px;border-top:1px solid #b9c8db;padding:5px 7px 0;color:#173968;font-size:15px;font-weight:850}.watermarks{position:absolute;z-index:0;inset:48px 22px 33px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);align-items:center;justify-items:center;overflow:hidden;pointer-events:none}.watermarks span{color:rgba(36,87,214,.06);font-size:16px;font-weight:900;white-space:nowrap;transform:rotate(-24deg)}h1{margin:0 0 11px;color:#173968;font-size:36px;line-height:1.08}h2{margin:0 0 9px;color:#173968;font-size:27px;line-height:1.12}h3{margin:0 0 6px;color:#2457d6;font-size:20px}p,li{font-size:19px;line-height:1.32}p{margin:6px 0}ul,ol{margin:6px 0;padding-left:27px}li{margin:4px 0}.lead{font-size:23px;line-height:1.33}.small{font-size:16px;color:#53677f}.two-col{display:grid;grid-template-columns:1.12fr .88fr;gap:20px;height:100%;align-items:stretch}.panel{border:2px solid #d9e5f5;border-radius:15px;padding:16px 18px;background:rgba(248,251,255,.96);overflow:hidden}.routine{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}.routine span{flex:1;min-width:125px;border-radius:10px;background:#173968;color:#fff;padding:9px;text-align:center;font-size:16px;font-weight:900}.model-shell{height:520px;overflow:hidden;border:2px solid #d9e5f5;border-radius:17px;background:rgba(248,251,255,.97);padding:13px 17px}.quick-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:18px;height:100%}.prompt-box{border:3px solid #f0b429;border-radius:17px;background:#fff8e8;padding:20px}.prompt-box .question{color:#173968;font-size:28px;font-weight:900;line-height:1.22}.answer-box{border:2px solid #b9ddcf;border-radius:17px;background:#edf9f3;padding:18px}.answer-box p{font-size:18px}.remediation{margin-top:13px;border-left:6px solid #cf5d54;border-radius:9px;background:#fff0ef;padding:12px 14px}.vocab{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}.vocab span{padding:7px 10px;border-radius:999px;background:#eef5ff;color:#173968;font-size:15px;font-weight:850}
${modelCss}
.y3-pdf .model-shell .y3-vector-board{height:100%;min-height:0;margin:0;align-content:center;border:0;background:transparent;padding:0}.y3-pdf .model-shell .y3-vector-board>p{font-size:16px;line-height:1.22}.y3-pdf .model-shell .y3-place strong{font-size:1.7rem}.y3-pdf .model-shell .y3-clock{width:215px}.y3-pdf .model-shell .y3-clock-pair{gap:30px}.y3-pdf .model-shell .y3-angle{width:185px;height:137px}.y3-pdf .model-shell .y3-bargraph{height:235px}.y3-pdf .model-shell .y3-map{max-height:360px}.y3-pdf .model-shell .y3-map span{min-height:38px}.y3-pdf .model-shell .y3-number-line{padding-top:38px}.y3-pdf .model-shell .y3-ruler .ticks{height:72px}.y3-pdf .model-shell .y3-table span{padding:6px;font-size:15px}.y3-pdf .model-shell .y3-array{max-width:430px;gap:6px}.y3-pdf .model-shell .y3-fraction-bar{height:50px}.y3-pdf .model-shell .y3-money-problem>div{padding:10px}.y3-pdf .model-shell .y3-solids>div{padding:10px}.y3-pdf .model-shell .y3-spinner{width:200px}@media print{body{width:1280px}}
`;

for (const code of codes) {
  const unit = units[code];
  if (!unit?.slug || !unit?.model_html || !unit?.apply_html) throw new Error(`${code}: incomplete fixed-slide source.`);
  const success = asList(unit.slides?.success_criteria).slice(0, 4);
  const routine = String(unit.routine || "Model → Practise → Apply → Check").split("→").map((part) => part.trim()).filter(Boolean);
  const vocabulary = asList(unit.vocabulary).slice(0, 4);
  const expected = unit.slides?.expected_response || "Explain the model and justify the answer.";
  const remediation = unit.slides?.remediation || "Return to the visual model and retry with a simpler example.";
  const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><title>${esc(code)} ${esc(unit.title)} Teacher Slides</title><style>${slideCss}</style></head><body class="y3-pdf">
${slide(code, "Slide 1 • Learning intention", `<div class="two-col"><section><p class="small">${esc(code)} • Year 3 Mathematics</p><h1>${esc(unit.title)}</h1><p class="lead">${esc(unit.learn)}</p><h2>We are learning to…</h2><p>${esc(unit.desc)}</p><div class="routine">${routine.map((part) => `<span>${esc(part)}</span>`).join("")}</div></section><aside class="panel"><h2>Success criteria</h2>${listHtml(success)}<h3>Key vocabulary</h3><div class="vocab">${vocabulary.map((item) => `<span>${esc(item[0])}</span>`).join("")}</div></aside></div>`)}
${slide(code, "Slide 2 • Central model", `<h2>${esc(unit.model_title)}</h2><div class="model-shell">${unit.model_html}</div>`)}
${slide(code, "Slide 3 • Apply the idea", `<h2>${esc(unit.apply_title)}</h2><div class="model-shell">${unit.apply_html}</div>`)}
${slide(code, "Slide 4 • Quick check", `<div class="quick-grid"><section class="prompt-box"><h2>Show what you know</h2><p class="question">${esc(unit.slides?.quick_check || unit.quick?.[0] || "Explain the key relationship.")}</p><p class="small">Think silently, show your reasoning, then explain it to a partner.</p></section><section class="answer-box"><h2>Expected response</h2><p>${esc(expected)}</p><div class="remediation"><h3>If students are unsure</h3><p>${esc(remediation)}</p></div><div class="vocab">${vocabulary.map((item) => `<span>${esc(item[0])}</span>`).join("")}</div></section></div>`)}
</body></html>`;

  const htmlPath = path.join(TEMP, `${code.toLowerCase()}.html`);
  const pdfPath = path.join(PDF_DIR, `${code.toLowerCase()}-teacher-slide.pdf`);
  fs.writeFileSync(htmlPath, html);
  const profile = path.join(TEMP, `chrome-${code.toLowerCase()}`);
  execFileSync(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--run-all-compositor-stages-before-draw", "--no-pdf-header-footer", `--user-data-dir=${profile}`, `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href], { stdio: "inherit" });
  const info = execSync(`pdfinfo ${JSON.stringify(pdfPath)}`, { encoding: "utf8" });
  const pages = Number(info.match(/^Pages:\s+(\d+)/m)?.[1] || 0);
  if (pages !== 4) throw new Error(`${code}: expected 4 PDF pages, found ${pages}.`);
  const text = execSync(`pdftotext ${JSON.stringify(pdfPath)} -`, { encoding: "utf8" });
  if ((text.match(new RegExp(code, "g")) || []).length < 4 || (text.match(/skillrhub\.com/gi) || []).length < 4) throw new Error(`${code}: branding/footer text is missing from one or more pages.`);

  const slideDir = path.join(ROOT, "year3/maths", unit.slug, "teacher-slides");
  fs.mkdirSync(slideDir, { recursive: true });
  for (const name of fs.readdirSync(slideDir)) if (/^slide-\d+\.(?:svg|png)$/i.test(name)) fs.unlinkSync(path.join(slideDir, name));
  const prefix = path.join(slideDir, "slide");
  execSync(`pdftoppm -png -r 120 ${JSON.stringify(pdfPath)} ${JSON.stringify(prefix)}`, { stdio: "inherit" });
  for (let page = 1; page <= 4; page += 1) {
    const generated = path.join(slideDir, `slide-${page}.png`);
    const finalPath = path.join(slideDir, `slide-${String(page).padStart(2, "0")}.png`);
    fs.renameSync(generated, finalPath);
    if (fs.statSync(finalPath).size < 18000) throw new Error(`${code}: slide ${page} is blank or unexpectedly small.`);
  }
}
console.log(`Built ${codes.length} branded four-page Year 3 Maths PDFs and ${codes.length * 4} fixed slide images.`);
