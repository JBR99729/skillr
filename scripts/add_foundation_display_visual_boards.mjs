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

const wrap = (text, max = 34, lines = 5) => {
  const words = String(text).replace(/\s+/g, " ").trim().split(" ");
  const out = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      out.push(line);
      line = word;
    } else {
      line = next;
    }
    if (out.length === lines) break;
  }
  if (line && out.length < lines) out.push(line);
  if (words.join(" ").length > out.join(" ").length && out.length) out[out.length - 1] = out[out.length - 1].replace(/[.,;:]?$/, "") + "...";
  return out;
};

const firstMatch = (text, regex) => {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};

const extractExampleItems = (html) => {
  const section = firstMatch(html, /<summary><span>Elaboration examples<\/span><span>[^<]*<\/span><\/summary><div class="panel">([\s\S]*?)<\/div><\/details>/i);
  const items = [...section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => stripTags(m[1]));
  return items.filter(Boolean).slice(0, 4);
};

const icon = (subject, index, x, y) => {
  if (subject === "maths") {
    const dots = [
      `<circle cx="${x + 16}" cy="${y + 16}" r="8"/><circle cx="${x + 44}" cy="${y + 16}" r="8"/><circle cx="${x + 72}" cy="${y + 16}" r="8"/>`,
      `<rect x="${x + 4}" y="${y + 6}" width="84" height="44" rx="8" fill="#fff" stroke="#173968" stroke-width="3"/><path d="M${x + 32} ${y + 6}v44M${x + 60} ${y + 6}v44M${x + 4} ${y + 28}h84" stroke="#173968" stroke-width="2"/>`,
      `<line x1="${x + 4}" y1="${y + 30}" x2="${x + 88}" y2="${y + 30}" stroke="#173968" stroke-width="5"/><text x="${x + 18}" y="${y + 58}">0</text><text x="${x + 74}" y="${y + 58}">20</text>`,
      `<rect x="${x + 8}" y="${y + 8}" width="28" height="28" fill="#f59e0b"/><circle cx="${x + 64}" cy="${y + 22}" r="16" fill="#13795b"/>`,
    ];
    return `<g fill="#2457d6" font-family="Arial" font-size="18" font-weight="900">${dots[index % dots.length]}</g>`;
  }
  if (subject === "english") {
    return `<g fill="none" stroke="#173968" stroke-width="3"><rect x="${x + 4}" y="${y + 6}" width="84" height="56" rx="8" fill="#fff"/><line x1="${x + 18}" y1="${y + 24}" x2="${x + 76}" y2="${y + 24}"/><line x1="${x + 18}" y1="${y + 40}" x2="${x + 66}" y2="${y + 40}"/><circle cx="${x + 22}" cy="${y + 58}" r="5" fill="#2457d6" stroke="none"/></g>`;
  }
  return `<g fill="none" stroke="#173968" stroke-width="3"><circle cx="${x + 46}" cy="${y + 34}" r="27" fill="#fff"/><path d="M46 ${y + 12}v44M24 ${y + 34}h44"/><circle cx="${x + 46}" cy="${y + 34}" r="7" fill="#2457d6" stroke="none"/></g>`;
};

const buildBoard = ({ code, subject, title, items }) => {
  const cardW = 520;
  const cardH = 170;
  const positions = [[60, 118], [620, 118], [60, 320], [620, 320]];
  const cards = items.map((item, i) => {
    const [x, y] = positions[i];
    const lines = wrap(item.replace(/^E\d+:\s*/i, ""), 44, 5);
    const tspans = lines.map((line, n) => `<tspan x="${x + 126}" dy="${n ? 28 : 0}">${esc(line)}</tspan>`).join("");
    return `<g>
<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="18" fill="#fff" stroke="#d7e3f2" stroke-width="3"/>
<rect x="${x}" y="${y}" width="140" height="42" rx="14" fill="#173968"/>
<text x="${x + 70}" y="${y + 28}" text-anchor="middle" fill="#fff" font-family="Arial" font-size="20" font-weight="900">Example ${i + 1}</text>
${icon(subject, i, x + 18, y + 64)}
<text x="${x + 126}" y="${y + 56}" fill="#17243a" font-family="Arial" font-size="24" font-weight="800">${tspans}</text>
</g>`;
  }).join("");
  return `<details><summary><span>Clean visual examples</span><span>One-page board</span></summary><div class="panel"><article class="content-block visual-board-block"><h2>Clean one-page examples</h2><div class="display-model"><svg viewBox="0 0 1200 560" role="img" aria-label="${esc(code)} visual teaching examples">
<rect x="0" y="0" width="1200" height="560" rx="24" fill="#f4f8ff"/>
<rect x="34" y="30" width="1132" height="64" rx="18" fill="#173968"/>
<text x="60" y="72" fill="#fff" font-family="Arial" font-size="28" font-weight="900">${esc(code)} - ${esc(title).slice(0, 72)}</text>
${cards}
</svg></div></article></div></details>`;
};

let changed = 0;
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("<summary><span>Clean visual examples</span>")) continue;
  const items = extractExampleItems(html);
  if (!items.length) continue;
  const parts = file.split(path.sep);
  const subject = parts[1] || "maths";
  const code = firstMatch(html, /<title>([A-Z0-9]+) Teacher Display/i) || firstMatch(html, /<h1[^>]*>([A-Z0-9]+)/i) || "Foundation";
  const title = firstMatch(html, /<h1[^>]*>[^-]+-\s*([^<]+)<\/h1>/i) || code;
  const board = buildBoard({ code, subject, title, items });
  const marker = /(<details><summary><span>Elaboration examples<\/span>)/;
  html = html.replace(marker, `${board}\n$1`);
  fs.writeFileSync(file, html);
  changed++;
}

console.log(`Added clean visual boards to ${changed} Foundation teacher display pages.`);
