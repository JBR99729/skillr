#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const outputPath = path.join(root, "assets", "foundation-elaboration-map.js");
const subjects = ["maths", "english", "science"];

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;|&#x2013;/gi, "–")
    .replace(/&#8212;|&#x2014;/gi, "—")
    .replace(/&#8220;|&#x201c;/gi, "“")
    .replace(/&#8221;|&#x201d;/gi, "”")
    .replace(/&#(d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)));
}

function plainText(value) {
  return decodeEntities(
    value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractSection(html) {
  const heading = /(?:Curriculum coverage and elaborations|Australian Curriculum description\s*(?:&amp;|&)\s*elaborations)/i.exec(html);
  if (!heading) return "";
  const sectionStart = html.lastIndexOf("<section", heading.index);
  const detailsStart = html.lastIndexOf("<details", heading.index);
  const start = Math.max(sectionStart, detailsStart);
  if (start < 0) return "";
  const closingTag = start === detailsStart ? "</details>" : "</section>";
  const end = html.indexOf(closingTag, heading.index);
  if (end < 0) return "";
  return html.slice(start, end + closingTag.length);
}

function extractEntry(subject, filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const codeMatch = html.match(/curriculumCode\s*:\s*["']([A-Z0-9]+)["']/i)
    || html.match(/<li\s+aria-current=["']page["']>\s*([A-Z0-9]+)\s*<\/li>/i);
  if (!codeMatch) throw new Error(`Could not find curriculum code in ${filePath}`);
  const code = codeMatch[1].toUpperCase();
  const section = extractSection(html);
  if (!section) throw new Error(`Could not find curriculum coverage section for ${code}`);

  const contentItems = [...section.matchAll(/<(li|p)[^>]*>([\s\S]*?)<\/\1>/gi)].map((match) => plainText(match[2]));
  const descriptionItem = contentItems.find((item) => /^Content description:/i.test(item));
  const elaborations = contentItems
    .map((item) => {
      const match = item.match(/^(E\d+(?:\s*[–-]\s*E?\d+)?):\s*(.+)$/i);
      if (!match) return null;
      return {
        id: match[1].replace(/\s+/g, "").replace(/–/g, "-").toUpperCase(),
        curriculumWording: match[2].replace(/\s*\(teaching context\)\s*$/i, "").trim(),
        teachingContext: /\(teaching context\)\s*$/i.test(match[2])
      };
    })
    .filter(Boolean);

  if (!descriptionItem) throw new Error(`Could not find content description for ${code}`);

  return {
    code,
    year: "Foundation",
    subject: subject[0].toUpperCase() + subject.slice(1),
    contentDescription: descriptionItem.replace(/^Content description:\s*/i, "").trim(),
    elaborations
  };
}

const map = {};
for (const subject of subjects) {
  const subjectDir = path.join(root, "foundation", subject);
  for (const entry of fs.readdirSync(subjectDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^ac9/i.test(entry.name)) continue;
    const filePath = path.join(subjectDir, entry.name, "index.html");
    if (!fs.existsSync(filePath)) continue;
    const item = extractEntry(subject, filePath);
    map[item.code] = item;
  }
}

const ordered = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
const output = `(() => {\n  "use strict";\n  window.SkillrFoundationElaborationMap = ${JSON.stringify(ordered, null, 2)};\n})();\n`;
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Wrote ${Object.keys(ordered).length} Foundation curriculum specifications to ${path.relative(root, outputPath)}`);
