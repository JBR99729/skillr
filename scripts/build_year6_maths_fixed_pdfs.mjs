#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { execFileSync, execSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "worksheets/year6/maths/teacher-slides");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "skillr-y6-maths-pdfs-"));
const renderDir = path.join(tempDir, "renders");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(renderDir, { recursive: true });

const context = vm.createContext({ window: {}, console, Array, Object, Number, String, Math, Map, Set });
for (const relative of [
  "assets/year6-curriculum-base.js",
  "assets/year6-maths-data-n.js",
  "assets/year6-maths-data-am.js",
  "assets/year6-maths-data-spstp.js"
]) {
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
}

const units = context.window.SkillrYear6MathsData || {};
const order = context.window.SkillrYear6MathsOrder || Object.keys(units);
if (order.length < 20) throw new Error(`Expected complete Year 6 Maths data, found ${order.length} units.`);

const baseCss = fs.readFileSync(path.join(root, "assets/year6-curriculum.css"), "utf8");
const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
const list = (items, limit = items.length) => `<ul>${items.slice(0, limit).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
const watermarks = () => `<div class="watermarks" aria-hidden="true">${Array.from({ length: 12 }, () => "<span>SkillrHub • skillrhub.com</span>").join("")}</div>`;
const footer = (code) => `<footer><strong>${esc(code)}</strong><span>SkillrHub • skillrhub.com</span></footer>`;
const slide = (code, label, body) => `<section class="pdf-slide">${watermarks()}<header><div class="brand">SkillrHub <span>F–10</span></div><div>${esc(label)}</div></header><main>${body}</main>${footer(code)}</section>`;

const chrome = [process.env.CHROME_BIN, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
  .filter(Boolean)
  .find((candidate) => {
    try { execFileSync("bash", ["-lc", `command -v ${candidate}`], { stdio: "ignore" }); return true; }
    catch { return false; }
  });
if (!chrome) throw new Error("A Chromium/Chrome executable is required to build fixed PDFs.");

const customCss = `
@page { size: 13.333333in 7.5in; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; font-family: Arial, Helvetica, sans-serif; color: #203047; }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.pdf-slide { position: relative; isolation: isolate; width: 1280px; height: 720px; padding: 28px 42px 25px; overflow: hidden; page-break-after: always; background: #fff; display: grid; grid-template-rows: 45px minmax(0,1fr) 28px; }
.pdf-slide:last-child { page-break-after: auto; }
.pdf-slide > header { position: relative; z-index: 4; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 0 6px 10px; border-bottom: 2px solid #d8e2ef; color: #173968; font-size: 17px; font-weight: 800; }
.brand { color: #2457d6; font-size: 22px; font-weight: 900; }.brand span { color: #173968; }
.pdf-slide > main { position: relative; z-index: 3; min-height: 0; padding: 18px 8px 10px; overflow: hidden; }
.pdf-slide footer { position: relative; z-index: 4; display: flex; align-items: end; justify-content: space-between; gap: 20px; border-top: 1px solid #b9c8db; padding: 6px 7px 0; color: #173968; font-size: 15px; font-weight: 800; }
.watermarks { position: absolute; z-index: 0; inset: 48px 24px 34px; display: grid; grid-template-columns: repeat(3,1fr); grid-template-rows: repeat(4,1fr); align-items: center; justify-items: center; overflow: hidden; pointer-events: none; }
.watermarks span { color: rgba(36,87,214,.065); font-size: 17px; font-weight: 900; white-space: nowrap; transform: rotate(-24deg); }
h1 { margin: 0 0 13px; color: #173968; font-size: 38px; line-height: 1.08; }
h2 { margin: 0 0 10px; color: #173968; font-size: 28px; line-height: 1.12; }
h3 { margin: 0 0 7px; color: #2457d6; font-size: 21px; }
p, li { font-size: 20px; line-height: 1.35; } p { margin: 7px 0; } ul, ol { margin: 7px 0; padding-left: 28px; } li { margin: 5px 0; }
.lead { font-size: 24px; line-height: 1.35; }.small { font-size: 17px; color: #53677f; }
.two-col { display: grid; grid-template-columns: 1.1fr .9fr; gap: 22px; align-items: stretch; min-height: 0; }
.panel { border: 2px solid #d9e5f5; border-radius: 16px; padding: 18px 20px; background: rgba(248,251,255,.96); min-height: 0; overflow: hidden; }
.panel strong { color: #173968; }.routine { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }.routine span { flex: 1; min-width: 145px; border-radius: 12px; background: #173968; color: #fff; padding: 12px 10px; text-align: center; font-size: 18px; font-weight: 900; }
.model-wrap { height: 520px; min-height: 0; overflow: hidden; border: 2px solid #d9e5f5; border-radius: 18px; background: rgba(248,251,255,.97); padding: 14px 18px; }
.model-wrap .y6-board { height: 100%; max-height: 100%; overflow: hidden; display: grid; align-content: center; }
.model-wrap .y6-board > p { margin: 10px auto 0; max-width: 1080px; font-size: 18px; line-height: 1.28; text-align: center; }
.model-wrap .y6-coordinate { max-width: 590px; margin: auto; }.model-wrap .y6-coordinate .plot span { min-height: 34px; }
.model-wrap .y6-grid { width: min(100%,360px); }.model-wrap .y6-graph { height: 300px; }.model-wrap .y6-numberline { padding-top: 54px; }.model-wrap .y6-fractions { max-height: 400px; }
.model-wrap .y6-table span { padding: 8px; font-size: 17px; }.model-wrap .y6-compare > div, .model-wrap .y6-sequence > div { padding: 12px; }.model-wrap .y6-compare span, .model-wrap .y6-sequence span { font-size: 17px; }
.activity-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }.activity-grid article { border: 2px solid #d9e5f5; border-radius: 15px; background: rgba(248,251,255,.97); padding: 16px; }.activity-grid p { font-size: 17px; }
.check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }.check-grid .panel li { font-size: 18px; }
@media print { body { width: 1280px; } }
`;

for (const code of order) {
  const unit = units[code];
  if (!unit) throw new Error(`Missing data for ${code}`);
  const routineParts = String(unit.routine || "Represent → Reason → Apply → Verify").split("→").map((part) => part.trim()).filter(Boolean);
  const success = (unit.mastery || []).slice(0, 5).map((item) => `I can ${String(item).charAt(0).toLowerCase()}${String(item).slice(1)}.`);
  const mistakes = (unit.mistakes || []).slice(0, 4);
  const activities = (unit.activities || []).slice(0, 3);
  const checks = (unit.quick || []).slice(0, 5);

  const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><title>${esc(code)} ${esc(unit.title)} Teacher Slides</title><style>${baseCss}\n${customCss}</style></head><body>
${slide(code, "Slide 1 • Learning intention", `<div class="two-col"><section><p class="small">${esc(code)} • Year 6 Mathematics</p><h1>${esc(unit.title)}</h1><p class="lead">${esc(unit.subtitle)}</p><h2>We are learning to…</h2><p class="lead">${esc(unit.learn)}</p><div class="routine">${routineParts.map((part) => `<span>${esc(part)}</span>`).join("")}</div></section><aside class="panel"><h2>Success criteria</h2>${list(success)}<h3>Curriculum focus</h3><p>${esc(unit.desc)}</p></aside></div>`)}
${slide(code, "Slide 2 • Teach the central model", `<h2>${esc(unit.model_title)}</h2><div class="model-wrap">${unit.model_html}</div>`)}
${slide(code, "Slide 3 • Apply and transfer", `<h2>${esc(unit.apply_title)}</h2><div class="model-wrap">${unit.apply_html}</div>`)}
${slide(code, "Slide 4 • Practise, diagnose and check", `<div class="activity-grid">${activities.map((activity) => `<article><h3>${esc(activity.title)}</h3><p>${esc(activity.text)}</p></article>`).join("")}</div><div class="check-grid" style="margin-top:16px"><section class="panel"><h2>Common mix-ups</h2><ul>${mistakes.map(([name, fix]) => `<li><strong>${esc(name)}:</strong> ${esc(fix)}</li>`).join("")}</ul></section><section class="panel"><h2>Quick check</h2>${list(checks)}<p class="small"><strong>Teacher decision:</strong> continue when students explain the model and verify a new example; otherwise return to Slide 2.</p></section></div>`)}
</body></html>`;

  const htmlPath = path.join(tempDir, `${code.toLowerCase()}.html`);
  const pdfPath = path.join(outDir, `${code.toLowerCase()}-teacher-slide.pdf`);
  fs.writeFileSync(htmlPath, html);
  const profile = path.join(tempDir, `chrome-${code.toLowerCase()}`);
  execFileSync(chrome, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--run-all-compositor-stages-before-draw",
    "--no-pdf-header-footer",
    `--user-data-dir=${profile}`,
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href
  ], { stdio: "inherit" });

  const info = execSync(`pdfinfo ${JSON.stringify(pdfPath)}`, { encoding: "utf8" });
  const pages = Number(info.match(/^Pages:\s+(\d+)/m)?.[1] || 0);
  if (pages !== 4) throw new Error(`${code}: expected 4 PDF pages, found ${pages}`);

  const prefix = path.join(renderDir, code.toLowerCase());
  execSync(`pdftoppm -png -r 72 ${JSON.stringify(pdfPath)} ${JSON.stringify(prefix)}`, { stdio: "inherit" });
  for (let page = 1; page <= 4; page += 1) {
    const png = `${prefix}-${page}.png`;
    if (!fs.existsSync(png) || fs.statSync(png).size < 12000) throw new Error(`${code}: rendered page ${page} is missing or unexpectedly blank`);
  }
}

console.log(`Built and rendered ${order.length} fixed Year 6 Maths teacher-slide PDFs.`);
