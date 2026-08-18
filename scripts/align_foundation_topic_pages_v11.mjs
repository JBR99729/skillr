#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const subjects = {
  maths: {
    data: [
      '<script src="/assets/foundation-maths-data-number.js?v=20260813-v11"></script>',
      '<script src="/assets/foundation-maths-data-other.js?v=20260813-v11"></script>',
      '<script src="/assets/foundation-ac9mfn01-visual-elaborations.js?v=20260813-v11"></script>',
      '<script src="/assets/foundation-ac9mfn02-visual-elaborations.js?v=20260813-v11"></script>',
      '<script src="/assets/foundation-maths-elaborations-n03-n05.js?v=20260813-v11"></script>',
      '<script src="/assets/foundation-maths-elaborations-n06-a01-m01.js?v=20260813-v11"></script>',
      '<script src="/assets/foundation-maths-elaborations-m02-sp01-sp02.js?v=20260813-v11"></script>'
    ],
    render: '<script src="/assets/foundation-maths-render.js?v=20260813-v11"></script>',
    preserve: new Set()
  },
  english: {
    data: ['<script src="/assets/foundation-english-data.js?v=20260813-v11"></script>'],
    render: '<script src="/assets/foundation-english-render.js?v=20260813-v11"></script>',
    preserve: new Set()
  },
  science: {
    data: ['<script src="/assets/foundation-science-data.js?v=20260813-v11"></script>'],
    render: '<script src="/assets/foundation-science-render.js?v=20260813-v11"></script>',
    preserve: new Set()
  }
};

const common = [
  '<script src="/assets/foundation-elaboration-map.js?v=20260813-v11"></script>',
  '<script src="/assets/foundation-canonical-v1.1.js?v=20260813-v11"></script>',
  '<script src="/assets/foundation-v1.1-render.js?v=20260813-v11"></script>'
];

function codeFromHtml(html) {
  const match = html.match(/curriculumCode\s*:\s*["']([A-Z0-9]+)["']/i);
  return match?.[1]?.toUpperCase() || "";
}

function removeOldScripts(html) {
  return html
    .replace(/\s*<script\s+src="\/assets\/foundation-(?:maths-data-number|maths-data-other|ac9mfn01-visual-elaborations|ac9mfn02-visual-elaborations|maths-elaborations-n03-n05|maths-elaborations-n06-a01-m01|maths-elaborations-m02-sp01-sp02|maths-render|english-data|english-render|science-data|science-render|elaboration-map|canonical-v1\.1|v1\.1-render)\.js\?v=[^"]+"><\/script>/g, "")
    .replace(/\s*<script>document\.body\.dataset\.skillrPreserveTopic="true";<\/script>/g, "");
}

function liveSlideUrl(subject, code) {
  return `/worksheets/foundation/${subject}/teacher-slides/live.html?code=${code}`;
}

const manifestPath = path.join(root, "data", "curriculum-units.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
for (const unit of manifest.units) {
  if (unit.yearNumber !== 0) continue;
  unit.teacherSlideUrl = liveSlideUrl(unit.subjectSlug, unit.code);
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

let updated = 0;
for (const [subject, config] of Object.entries(subjects)) {
  const subjectDir = path.join(root, "foundation", subject);
  for (const entry of fs.readdirSync(subjectDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^ac9/i.test(entry.name)) continue;
    const filePath = path.join(subjectDir, entry.name, "index.html");
    if (!fs.existsSync(filePath)) continue;
    let html = fs.readFileSync(filePath, "utf8");
    const code = codeFromHtml(html);
    if (!code) throw new Error(`Missing curriculum code in ${filePath}`);
    html = removeOldScripts(html);
    html = html
      .replace(new RegExp(`/worksheets/foundation/${subject}/teacher-slides/${code.toLowerCase()}-teacher-slide\\.pdf`, "g"), liveSlideUrl(subject, code))
      .replace(/Use this one-page PDF to introduce the key idea, vocabulary and teaching sequence before students begin the activities\./g, "Open the live classroom sequence to teach the key idea, vocabulary and worked examples before students begin the activities.")
      .replace(/Open teacher slide \(PDF\)/g, "Open teacher slides");
    const preserve = config.preserve.has(code)
      ? '<script>document.body.dataset.skillrPreserveTopic="true";</script>'
      : "";
    const bundle = [...config.data, ...common, preserve, config.render].filter(Boolean).join("\n");
    const accessMarker = /<script\s+src="\/assets\/access\.js\?v=[^"]+"><\/script>/;
    if (!accessMarker.test(html)) throw new Error(`Missing access script marker in ${filePath}`);
    html = html.replace(accessMarker, `${bundle}\n$&`);
    fs.writeFileSync(filePath, html, "utf8");
    updated += 1;
  }
}

console.log(`Aligned ${updated} Foundation topic pages with the v1.1 canonical renderer.`);
