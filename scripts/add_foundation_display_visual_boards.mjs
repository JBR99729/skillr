import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const files = execFileSync("find", ["foundation", "-path", "*/teacher-slides/index.html"], { encoding: "utf8" })
  .trim()
  .split(/\n/)
  .filter(Boolean)
  .sort();

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const stripTags = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const firstMatch = (text, regex) => {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};

const extractExampleItems = (html) => {
  const section = firstMatch(html, /<summary><span>Elaboration examples<\/span><span>[^<]*<\/span><\/summary><div class="panel">([\s\S]*?)<\/div><\/details>/i);
  const items = [...section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => stripTags(m[1]));
  return items.filter(Boolean).slice(0, 4);
};

const icon = (subject, index) => {
  if (subject === "maths") {
    const dots = [
      `<circle cx="34" cy="40" r="10"/><circle cx="66" cy="40" r="10"/><circle cx="98" cy="40" r="10"/><circle cx="50" cy="70" r="10"/><circle cx="82" cy="70" r="10"/>`,
      `<rect x="22" y="24" width="92" height="60" rx="8" fill="#fff" stroke="#173968" stroke-width="4"/><path d="M53 24v60M84 24v60M22 54h92" stroke="#173968" stroke-width="3"/>`,
      `<line x1="20" y1="58" x2="116" y2="58" stroke="#173968" stroke-width="6"/><circle cx="44" cy="58" r="9"/><circle cx="92" cy="58" r="9"/><text x="18" y="92">0</text><text x="104" y="92">20</text>`,
      `<rect x="26" y="32" width="34" height="34" fill="#f59e0b"/><circle cx="90" cy="49" r="20" fill="#13795b"/><path d="M34 86h72" stroke="#173968" stroke-width="6"/>`,
    ];
    return `<svg viewBox="0 0 136 108" role="img" aria-hidden="true"><g fill="#2457d6" font-family="Arial" font-size="18" font-weight="900">${dots[index % dots.length]}</g></svg>`;
  }
  if (subject === "english") {
    return `<svg viewBox="0 0 136 108" role="img" aria-hidden="true"><g fill="none" stroke="#173968" stroke-width="4"><rect x="24" y="18" width="88" height="68" rx="9" fill="#fff"/><line x1="40" y1="40" x2="96" y2="40"/><line x1="40" y1="58" x2="88" y2="58"/><circle cx="48" cy="82" r="7" fill="#2457d6" stroke="none"/></g></svg>`;
  }
  return `<svg viewBox="0 0 136 108" role="img" aria-hidden="true"><g fill="none" stroke="#173968" stroke-width="4"><circle cx="68" cy="52" r="32" fill="#fff"/><path d="M68 20v64M36 52h64"/><circle cx="68" cy="52" r="9" fill="#2457d6" stroke="none"/></g></svg>`;
};

const buildBoard = ({ code, subject, title, items }) => {
  const cards = items.map((item, i) => {
    const text = item.replace(/^E\d+:\s*/i, "");
    return `<article class="example-card"><div class="example-label">Example ${i + 1}</div><div class="example-row"><div class="example-icon">${icon(subject, i)}</div><p>${esc(text)}</p></div></article>`;
  }).join("");
  return `<details><summary><span>Clean visual examples</span><span>One-page board</span></summary><div class="panel"><article class="content-block visual-board-block"><h2>Clean one-page examples</h2><div class="example-board" aria-label="${esc(code)} visual teaching examples"><div class="example-board-title">${esc(code)} - ${esc(title)}</div><div class="example-grid">${cards}</div></div></article></div></details>`;
};

const exampleCss = ".visual-board-block{overflow:visible}.example-board{width:min(980px,100%);margin:8px auto 0;padding:18px;border-radius:18px;background:#f4f8ff;border:1px solid var(--line)}.example-board-title{margin:0 0 14px;padding:12px 16px;border-radius:12px;background:var(--blue);color:#fff;font-size:clamp(18px,1.6vw,24px);font-weight:900;line-height:1.2}.example-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:14px}.example-card{position:relative;min-height:168px;padding:52px 16px 16px;border:1px solid var(--line);border-radius:14px;background:#fff}.example-label{position:absolute;top:0;left:0;padding:9px 16px;border-radius:14px 0 12px 0;background:var(--blue);color:#fff;font-size:15px;font-weight:900}.example-row{display:grid;grid-template-columns:118px minmax(0,1fr);gap:16px;align-items:start}.example-icon{display:grid;place-items:center;min-height:106px;border-radius:12px;background:#eef5ff}.example-icon svg{width:112px;height:auto;max-height:none}.example-card p{margin:0;color:var(--ink)!important;font-size:clamp(17px,1.35vw,22px)!important;line-height:1.28!important;font-weight:800;overflow-wrap:anywhere}@media(max-width:760px){.example-grid{grid-template-columns:1fr}.example-row{grid-template-columns:1fr}.example-icon{min-height:90px}}";

const ensureExampleCss = (html) => {
  if (html.includes(".example-board{")) return html;
  return html.replace("@media(max-width:900px)", `${exampleCss}@media(max-width:900px)`);
};

let changed = 0;
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const items = extractExampleItems(html);
  if (!items.length) continue;
  const parts = file.split(path.sep);
  const subject = parts[1] || "maths";
  const code = firstMatch(html, /<title>([A-Z0-9]+) Teacher Display/i) || firstMatch(html, /<h1[^>]*>([A-Z0-9]+)/i) || "Foundation";
  const title = firstMatch(html, /<h1[^>]*>[^-]+-\s*([^<]+)<\/h1>/i) || code;
  const board = buildBoard({ code, subject, title, items });
  const marker = /(<details><summary><span>Elaboration examples<\/span>)/;
  html = html.replace(/<details><summary><span>Clean visual examples<\/span><span>One-page board<\/span><\/summary><div class="panel"><article class="content-block visual-board-block">[\s\S]*?<\/article><\/div><\/details>\n?/i, "");
  html = ensureExampleCss(html).replace(marker, `${board}\n$1`);
  fs.writeFileSync(file, html);
  changed++;
}

console.log(`Added clean visual boards to ${changed} Foundation teacher display pages.`);