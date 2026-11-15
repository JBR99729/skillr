// Owner clarification, 15 November 2026: paper worksheets are paid packs.
// Validate the new destination instead of requiring retired free PDF links.
import fs from 'node:fs';
import path from 'node:path';
import { hrefs } from './published_activity_navigation.mjs';

export function validatePaidWorksheetNavigation(html, code, root = process.cwd(), catalogue) {
  const products = catalogue ?? JSON.parse(fs.readFileSync(path.join(root, 'data/print-and-go-products.json'), 'utf8'));
  const matches = products.filter(p => p.available && p.hasPrintables && !p.free && (p.curriculumCodes || []).includes(code));
  const links = hrefs(html);
  const destinations = new Set(matches.flatMap(p => [p.url, p.tptUrl]).filter(Boolean));
  const valid = matches.length
    ? links.some(href => destinations.has(href))
    : links.some(href => href === '/print-and-go.html' || href === '/products/');
  if (!valid) return [`${code}: missing matching paid worksheet link${matches.length ? '' : ' or paid catalogue fallback'}`];
  return [];
}
