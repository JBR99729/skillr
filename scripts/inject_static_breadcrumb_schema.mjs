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
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, '/');
}

function routeFromFile(file) {
  return `/${rel(file).replace(/index\.html$/i, '')}`;
}

function topicContext(file) {
  const match = rel(file).match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/(?:[^/]+\/index\.html|(?!index\.html$)[^/]+\.html)$/i);
  return match && { year: match[1].toLowerCase(), subject: match[2].toLowerCase(), url: ORIGIN + routeFromFile(file) };
}

function learnRoute(year, subject) {
  const number = year === 'foundation' ? '0' : year.slice(4);
  return `/learn/?year=${number}${subject ? `&subject=${subject}` : ''}`;
}

function topicBreadcrumbUrl(value, context) {
  const target = new URL(value.replaceAll('&amp;', '&'), context.url);
  if (target.origin !== ORIGIN) return value;
  const route = target.pathname.replace(/index\.html$/i, '').replace(/\/$/, '');
  if ([`/${context.year}`, `/${context.year}/curriculum`].includes(route)) {
    return `${learnRoute(context.year)}${target.hash}`;
  }
  if ([`/${context.year}/curriculum/${context.subject}`, `/${context.year}/${context.subject}`].includes(route)) {
    return `${learnRoute(context.year, context.subject)}${target.hash}`;
  }
  return value;
}

function migrateTopicBreadcrumbs(html, context, schema) {
  const breadcrumb = /<(nav|ol|div|p)\b(?=[^>]*(?:\baria-label\s*=\s*["']breadcrumbs?["']|\bclass\s*=\s*["'][^"']*\b(?:crumb|breadcrumbs?)\b))[^>]*>[\s\S]*?<\/\1>/gi;
  let found = false;
  let next = html.replace(breadcrumb, block => {
    found = true;
    let updated = block.replace(/(\bhref\s*=\s*)(["'])([^"']*)\2/gi, (attribute, prefix, quote, value) => {
      const destination = topicBreadcrumbUrl(value, context);
      return destination === value ? attribute : `${prefix}${quote}${destination.replaceAll('&', '&amp;')}${quote}`;
    });
    const subjectRoute = learnRoute(context.year, context.subject);
    const links = [...updated.matchAll(/\bhref\s*=\s*["']([^"']*)["']/gi)];
    if (!links.some(link => link[1].replaceAll('&amp;', '&').split('#')[0] === subjectRoute)) {
      const link = `<a href="${subjectRoute.replaceAll('&', '&amp;')}">${yearLabel(context.year)} ${SUBJECTS[context.subject]}</a>`;
      if (/<ol\b/i.test(updated)) {
        const item = `<li>${link}</li>`;
        const current = /<li\b[^>]*aria-current=["']page["'][^>]*>/i;
        updated = current.test(updated) ? updated.replace(current, opening => item + opening) : updated.replace(/<\/ol>/i, item + '</ol>');
      } else {
        const current = /<span\b[^>]*aria-current=["']page["'][^>]*>/i;
        updated = current.test(updated) ? updated.replace(current, opening => `${link} &rsaquo; ${opening}`) : updated.replace(/(<\/(?:nav|div|p)>\s*)$/i, ` &rsaquo; ${link}$1`);
      }
    }
    return updated;
  });
  if (!found) {
    const links = schema.itemListElement.slice(0, -1).map(item =>
      `<a href="${item.item.replace(ORIGIN, '').replaceAll('&', '&amp;')}">${item.name}</a>`
    );
    const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb">${links.join(' &rsaquo; ')} &rsaquo; <span aria-current="page">${schema.itemListElement.at(-1).name}</span></nav>`;
    const container = /<(?:main\b[^>]*|div\b[^>]*class=["'][^"']*\bcurriculum-page\b[^"']*["'][^>]*)>/i;
    next = next.replace(container, opening => `${opening}\n${crumb}`);
  }
  return next.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi, (block, opening, source, closing) => {
    let value;
    try { value = JSON.parse(source); } catch { return block; }
    let changed = false;
    for (const node of breadcrumbNodes(value)) {
      for (const item of node.itemListElement || []) {
        const url = typeof item.item === 'string' ? item.item : item.item?.['@id'];
        if (typeof url !== 'string') continue;
        const destination = topicBreadcrumbUrl(url, context);
        if (destination === url) continue;
        if (typeof item.item === 'string') item.item = ORIGIN + destination;
        else item.item['@id'] = ORIGIN + destination;
        changed = true;
      }
    }
    return changed ? `${opening}${JSON.stringify(value)}${closing}` : block;
  });
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
  const topic = r.match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/(?:[^/]+\/index\.html|(?!index\.html$)[^/]+\.html)$/i);
  const hub = r.match(/^(foundation|year(?:[1-9]|10))\/curriculum\/(maths|science|english)\/index\.html$/i);
  const match = topic || hub;
  if (!match) return null;

  const yearSlug = match[1].toLowerCase();
  const subjectSlug = match[2].toLowerCase();
  const year = yearLabel(yearSlug);
  const subject = SUBJECTS[subjectSlug];
  const items = [
    { name: 'Home', url: `${ORIGIN}/` },
    { name: year, url: topic ? ORIGIN + learnRoute(yearSlug) : `${ORIGIN}/${yearSlug}/` },
    { name: subject, url: topic ? ORIGIN + learnRoute(yearSlug, subjectSlug) : `${ORIGIN}/${yearSlug}/curriculum/${subjectSlug}/` },
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
  const originalHtml = html;
  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;
  const schema = schemaFor(file, html);
  if (!schema) continue;
  eligible += 1;

  const context = topicContext(file);
  if (context) html = migrateTopicBreadcrumbs(html, context, schema);

  const existing = existingBreadcrumb(html, schema);
  if (existing.valid) {
    if (html !== originalHtml) {
      changed += 1;
      if (!CHECK) fs.writeFileSync(file, html, 'utf8');
    }
    continue;
  }
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
  if (next !== originalHtml) {
    changed += 1;
    if (!CHECK) fs.writeFileSync(file, next, 'utf8');
  }
}

console.log(`Static breadcrumb schema: eligible=${eligible} changed=${changed} missing=${missing} invalid=${invalid} mode=${CHECK ? 'check' : 'write'}`);
if (invalid || missing || (CHECK && changed)) process.exit(1);
