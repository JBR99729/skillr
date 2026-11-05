#!/usr/bin/env node
// Sitewide static BreadcrumbList rollout for canonical curriculum pages.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ORIGIN = 'https://skillrhub.com';
const SUBJECTS = { maths: 'Maths', science: 'Science', english: 'English' };
const CHECK = process.argv.includes('--check');
const roots = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];

function yearLabel(slug) {
  if (slug === 'foundation') return 'Foundation';
  const m = slug.match(/^year(\d+)$/i);
  return m ? `Year ${m[1]}` : slug;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name === 'index.html') out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, '/');
}

function routeFromFile(file) {
  return `/${rel(file).replace(/index\.html$/i, '')}`;
}

function extractCode(html, route) {
  const candidates = [
    html.match(/class=["'][^"']*curriculum-eyebrow[^"']*["'][^>]*>([\s\S]*?)<\//i)?.[1] || '',
    html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '',
    html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '',
    route,
  ];
  for (const raw of candidates) {
    const text = raw.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
    const m = text.match(/AC9[A-Z0-9]+/i);
    if (m) return m[0].toUpperCase();
  }
  return '';
}

function schemaFor(file, html) {
  const r = rel(file);
  const route = routeFromFile(file);
  const topic = r.match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/([^/]+)\/index\.html$/i);
  const hub = r.match(/^(foundation|year(?:[1-9]|10))\/curriculum\/(maths|science|english)\/index\.html$/i);
  const match = topic || hub;
  if (!match) return null;

  const yearSlug = match[1].toLowerCase();
  const subjectSlug = match[2].toLowerCase();
  const year = yearLabel(yearSlug);
  const subject = SUBJECTS[subjectSlug];
  const items = [
    { name: 'Home', url: `${ORIGIN}/` },
    { name: year, url: `${ORIGIN}/${yearSlug}/` },
    { name: subject, url: `${ORIGIN}/${yearSlug}/curriculum/${subjectSlug}/` },
  ];
  if (topic) {
    const code = extractCode(html, route);
    items.push({ name: code || 'Topic', url: `${ORIGIN}${route}` });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function render(schema) {
  return `<script type="application/ld+json" id="skillrhub-breadcrumb-jsonld">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

function breadcrumbNodes(value, out = []) {
  if (!value || typeof value !== 'object') return out;
  if (value['@type'] === 'BreadcrumbList') out.push(value);
  for (const child of Object.values(value)) if (child && typeof child === 'object') breadcrumbNodes(child, out);
  return out;
}

// Accept authored strand breadcrumbs and JSON formatting differences. Inspect
// complete script blocks independently: a cross-script regexp can erase an
// unrelated LearningResource or Organization graph when replacing a breadcrumb.
function existingBreadcrumb(html, expected) {
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const nodes = [];
  let owner;
  for (const block of blocks) {
    let parsed;
    try { parsed = JSON.parse(block[1]); } catch { return { valid: false, malformed: true }; }
    const found = breadcrumbNodes(parsed);
    if (found.length) { nodes.push(...found); owner = block; }
  }
  if (nodes.length !== 1) return { valid: false, owner };
  const items = nodes[0].itemListElement;
  if (!Array.isArray(items) || items.length < expected.itemListElement.length) return { valid: false, owner };
  const urls = [];
  for (const [index, item] of items.entries()) {
    const url = typeof item.item === 'string' ? item.item : item.item?.['@id'];
    if (item['@type'] !== 'ListItem' || item.position !== index + 1 || !item.name?.trim() || !url?.startsWith(ORIGIN + '/')) return { valid: false, owner };
    const target = new URL(url);
    const filename = path.join(ROOT, target.pathname, target.pathname.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(filename)) return { valid: false, owner };
    urls.push(url);
  }
  const required = expected.itemListElement.map(item => item.item);
  let cursor = -1;
  for (const url of required) { cursor = urls.indexOf(url, cursor + 1); if (cursor < 0) return { valid: false, owner }; }
  return { valid: urls.at(-1) === required.at(-1), owner };
}

const files = roots.flatMap(root => walk(path.join(ROOT, root)));
let eligible = 0;
let changed = 0;
let missing = 0;
let invalid = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
  const schema = schemaFor(file, html);
  if (!schema) continue;
  eligible += 1;

  const existing = existingBreadcrumb(html, schema);
  if (existing.valid) continue;
  if (existing.malformed) {
    invalid += 1;
    console.error(`${rel(file)}: invalid JSON-LD; leave the enclosing document untouched`);
    continue;
  }

  const block = render(schema);
  const byId = /<script\b[^>]*id=["']skillrhub-breadcrumb-jsonld["'][^>]*>[\s\S]*?<\/script>/i;
  let next;
  if (byId.test(html)) {
    next = html.replace(byId, block);
  } else {
    if (existing.owner) {
      const parsed = JSON.parse(existing.owner[1]);
      if (parsed['@type'] !== 'BreadcrumbList') {
        invalid += 1;
        console.error(`${rel(file)}: invalid nested breadcrumb; preserve its enclosing graph for manual repair`);
        continue;
      }
      next = html.replace(existing.owner[0], block);
    }
    else if (/<\/head>/i.test(html)) next = html.replace(/<\/head>/i, `${block}\n</head>`);
    else {
      invalid += 1;
      console.error(`${rel(file)}: missing </head>`);
      continue;
    }
  }

  if (!next.includes('id="skillrhub-breadcrumb-jsonld"')) missing += 1;
  if (next !== html) {
    changed += 1;
    if (!CHECK) fs.writeFileSync(file, next, 'utf8');
  }
}

console.log(`Static breadcrumb schema: eligible=${eligible} changed=${changed} missing=${missing} invalid=${invalid} mode=${CHECK ? 'check' : 'write'}`);
if (invalid || missing || (CHECK && changed)) process.exit(1);
