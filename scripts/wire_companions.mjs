#!/usr/bin/env node
// Add only shared utility hooks. Never reserialise, regenerate or remove lesson HTML.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const check = process.argv.includes('--check');
const files = execFileSync('git', ['ls-files'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).trim().split('\n');
const hooks = ['pwa-register.js', 'assets/resource-links.js', 'share-button.js', 'quiz/assets/script.js', 'assets/homework-page-runtime.js'];
const marker = '// skillr-companions: shared brand and optional learning navigation';
const bootstrap = `\n${marker}\n(function () {\n  if (window.__skillrCompanionLoaderRequested) return;\n  window.__skillrCompanionLoaderRequested = true;\n  var script = document.createElement('script');\n  script.src = '/assets/companions/loader.js?v=20260909-1';\n  script.defer = true;\n  document.head.appendChild(script);\n}());\n`;
const changes = [], failures = [];
for (const file of hooks) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(marker)) continue;
  if (check) failures.push(file + ': shared hook missing');
  else { fs.appendFileSync(file, bootstrap); changes.push(file); }
}
let eligible = 0, covered = 0, redirects = 0;
for (const file of files) {
  if (!file.endsWith('.html') || /^(backup|artifacts|reports|screenshots)\//.test(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  const html = source.replace(/<!--[\s\S]*?-->/g, '');
  if (/<meta[^>]+http-equiv\s*=\s*["']?refresh/i.test(html)) { redirects++; continue; }
  if (!/<body[\s>]/i.test(html)) continue;
  eligible++;
  const scripts = Array.from(html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)/gi), m => m[1]);
  const hasLoader = scripts.some(src => {
    const url = new URL(src, 'https://skillrhub.com/' + file);
    return url.origin === 'https://skillrhub.com' && [...hooks, 'pwa-register-loader.js', 'assets/companions/loader.js'].includes(url.pathname.slice(1));
  });
  if (hasLoader) { covered++; continue; }
  if (!/<\/body\s*>/i.test(source)) { failures.push(file + ': closing body missing'); continue; }
  if (check) failures.push(file + ': companion hook missing');
  else {
    const addition = '<!-- skillr-companions: shared utility only -->\n<script defer src="/assets/companions/loader.js?v=20260909-1"></script>\n';
    fs.writeFileSync(file, source.replace(/<\/body\s*>/i, addition + '$&'));
    changes.push(file); covered++;
  }
}
console.log(JSON.stringify({ eligible, covered, redirects, changed: changes.length, changes, failures }, null, 2));
if (failures.length) process.exitCode = 1;
