#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'year7', 'maths');
const dirs = fs.readdirSync(root, { withFileTypes:true }).filter((entry) => entry.isDirectory() && /^ac9m7/i.test(entry.name));
let changed = 0;
let createdViewers = 0;
const errors = [];

const escapeXml = (value) => String(value || '').replace(/[&<>\"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));

function createFixedViewer(dir, html) {
  const code = (html.match(/AC9M7[A-Z0-9]+/i)?.[0] || '').toUpperCase();
  const title = html.match(/<h1>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g,'').trim() || code;
  if (!code) throw new Error(`${dir}: curriculum code not found`);
  const slideDir = path.join(dir, 'teacher-slides');
  fs.mkdirSync(slideDir, { recursive:true });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(code)} teacher slide</title><desc id="desc">Fixed SkillrHub classroom slide for ${escapeXml(title)}</desc><rect width="1600" height="900" fill="#f6f9ff"/><rect x="70" y="70" width="1460" height="760" rx="36" fill="#ffffff" stroke="#cbd9ec" stroke-width="4"/><text x="120" y="150" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#2457d6">${escapeXml(code)} • Year 7 Maths</text><text x="120" y="245" font-family="Arial, sans-serif" font-size="58" font-weight="800" fill="#173968">${escapeXml(title)}</text><text x="120" y="340" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#315274">Teach the key concept → model it visually → apply it → check the reasoning.</text><rect x="120" y="405" width="1360" height="250" rx="26" fill="#eef4ff" stroke="#b9ccec" stroke-width="3"/><text x="160" y="470" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#173968">Classroom focus</text><text x="160" y="535" font-family="Arial, sans-serif" font-size="27" fill="#315274">Use the topic page’s worked examples and visual model for explicit instruction.</text><text x="160" y="590" font-family="Arial, sans-serif" font-size="27" fill="#315274">Ask students to explain the representation before calculating or generalising.</text><text x="160" y="645" font-family="Arial, sans-serif" font-size="27" fill="#315274">Finish with one independent problem and an estimate, inverse or visual check.</text><g opacity="0.08" transform="rotate(-18 800 450)"><text x="180" y="240" font-family="Arial, sans-serif" font-size="42" font-weight="800" fill="#2457d6">SkillrHub • skillrhub.com</text><text x="650" y="480" font-family="Arial, sans-serif" font-size="42" font-weight="800" fill="#2457d6">SkillrHub • skillrhub.com</text><text x="980" y="720" font-family="Arial, sans-serif" font-size="42" font-weight="800" fill="#2457d6">SkillrHub • skillrhub.com</text></g><line x1="120" y1="760" x2="1480" y2="760" stroke="#cbd9ec" stroke-width="2"/><text x="120" y="810" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#173968">${escapeXml(code)} • SkillrHub • skillrhub.com</text></svg>`;
  fs.writeFileSync(path.join(slideDir, 'slide-01.svg'), svg);
  const viewer = `<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeXml(code)} Teacher Slides | SkillrHub</title><meta name="robots" content="noindex,follow"><link rel="stylesheet" href="/style.css"><style>body{margin:0;background:#eef3f9;font-family:Arial,sans-serif;color:#173968}.viewer{max-width:1280px;margin:auto;padding:16px}.toolbar{display:flex;align-items:center;gap:10px;margin-bottom:12px}.toolbar a,.toolbar button{padding:9px 12px;border:1px solid #c9d8fb;border-radius:8px;background:#fff;color:#173968;font-weight:800;text-decoration:none}.toolbar button:disabled{opacity:.45}.count{margin-left:auto;font-weight:800}.slide{display:block;width:100%;height:auto;border:1px solid #cbd9ec;border-radius:12px;background:#fff;box-shadow:0 10px 30px rgba(23,57,104,.12)}</style></head><body><main class="viewer"><div class="toolbar"><a href="../">Back to topic</a><button type="button" disabled>Previous</button><button type="button" disabled>Next</button><span class="count">1 / 1</span></div><img class="slide" src="slide-01.svg" alt="${escapeXml(code)} fixed classroom teacher slide for ${escapeXml(title)}"></main></body></html>`;
  fs.writeFileSync(path.join(slideDir, 'index.html'), viewer);
  createdViewers += 1;
  return 'teacher-slides/';
}

for (const entry of dirs) {
  const dir = path.join(root, entry.name);
  const file = path.join(dir, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  let teacher = '';
  if (fs.existsSync(path.join(dir, 'teacher-deck', 'index.html'))) teacher = 'teacher-deck/';
  else if (fs.existsSync(path.join(dir, 'teacher-slides', 'index.html'))) teacher = 'teacher-slides/';
  else teacher = createFixedViewer(dir, html);

  const before = html;
  html = html.replace(/<a href="[^"]*">Teacher Slides<\/a>/, `<a href="${teacher}">Teacher Slides</a>`);
  if (!html.includes(`<a href="${teacher}">Teacher Slides</a>`)) errors.push(`${entry.name}: Teacher Slides link was not updated`);
  if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(html)) errors.push(`${entry.name}: direct PPTX/PDF link remains`);
  if (before !== html) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Updated ${changed} Year 7 Maths pages and created ${createdViewers} missing fixed Teacher Slides viewers.`);
