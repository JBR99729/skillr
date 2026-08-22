#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'year7', 'maths');
const analytics = `  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag("js", new Date());\n    gtag("config", "G-8P22BET45N");\n  </script>\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script>\n`;

let updated = 0;
const errors = [];
for (const entry of fs.readdirSync(root, { withFileTypes:true })) {
  if (!entry.isDirectory() || !/^ac9m7/i.test(entry.name)) continue;
  const file = path.join(root, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  if (!html.includes('G-8P22BET45N')) {
    const marker = '  <script type="application/ld+json">';
    if (!html.includes(marker)) errors.push(`${entry.name}: JSON-LD insertion marker not found`);
    else html = html.replace(marker, `${analytics}${marker}`);
  }
  if (!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    errors.push(`${entry.name}: AdSense script missing after patch`);
  }
  if (!html.includes('G-8P22BET45N')) errors.push(`${entry.name}: GA4 script missing after patch`);
  if (before !== html) {
    fs.writeFileSync(file, html);
    updated += 1;
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Restored GA4 and AdSense wiring on ${updated} Year 7 Maths Learn pages.`);
