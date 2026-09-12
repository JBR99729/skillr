#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ORIGIN = 'https://skillrhub.com';
const ORG_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const WRITE = process.argv.includes('--write');
const SKIP = new Set(['node_modules', '.git', 'docs', 'artifacts']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && /\.html?$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function canonical(html) {
  return html.match(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["']/i)?.[1]?.trim() || '';
}
function title(html) {
  return (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function description(html) {
  return html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]?.trim() || '';
}
function route(file) {
  const r = path.relative(ROOT, file).replaceAll(path.sep, '/');
  if (r === 'index.html') return '/';
  return `/${r.replace(/index\.html$/i, '')}`;
}
function yearLabel(slug) {
  if (slug === 'foundation') return 'Foundation';
  const m = slug.match(/^year(\d+)$/i);
  return m ? `Year ${m[1]}` : '';
}
function subjectLabel(slug) {
  return ({ maths: 'Mathematics', science: 'Science', english: 'English' })[slug] || '';
}
function cleanNode(node) {
  if (!node || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map(cleanNode).filter(Boolean);
  const type = node['@type'];
  const types = Array.isArray(type) ? type : [type];
  if (types.includes('Course') || types.includes('EducationalOccupationalCredential')) return null;

  const copy = {};
  for (const [k, v] of Object.entries(node)) {
    const cleaned = cleanNode(v);
    if (cleaned !== null) copy[k] = cleaned;
  }

  if (types.includes('Organization') && (copy.name === 'SkillrHub' || copy.url === ORIGIN || copy.url === `${ORIGIN}/`)) {
    copy['@id'] = ORG_ID;
    copy.name = 'SkillrHub';
    copy.url = `${ORIGIN}/`;
    copy.logo = { '@type': 'ImageObject', url: `${ORIGIN}/icons/skillrhub-mark.svg` };
  }
  if (types.includes('WebSite')) {
    copy['@id'] = WEBSITE_ID;
    copy.url = `${ORIGIN}/`;
    copy.name = 'SkillrHub';
    copy.publisher = { '@id': ORG_ID };
  }
  if (types.includes('LearningResource')) {
    copy.publisher = { '@id': ORG_ID };
    copy.isPartOf = { '@id': WEBSITE_ID };
  }
  return copy;
}

function parseScripts(html) {
  const re = /<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi;
  return [...html.matchAll(re)];
}

function ensureHomepageEntities(html) {
  if (!canonical(html).replace(/\/$/, '').endsWith('skillrhub.com')) return html;
  const id = 'skillrhub-site-entity-jsonld';
  const block = `<script type="application/ld+json" id="${id}">\n${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': ORG_ID, name: 'SkillrHub', url: `${ORIGIN}/`, logo: { '@type': 'ImageObject', url: `${ORIGIN}/icons/skillrhub-mark.svg` } },
      { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${ORIGIN}/`, name: 'SkillrHub', publisher: { '@id': ORG_ID }, inLanguage: 'en-AU' }
    ]
  }, null, 2)}\n</script>`;
  const byId = new RegExp(`<script\\b[^>]*id=["']${id}["'][^>]*>[\\s\\S]*?<\\/script>`, 'i');
  if (byId.test(html)) return html.replace(byId, block);
  return html.replace(/<\/head>/i, `${block}\n</head>`);
}

function curriculumResource(file, html) {
  const rel = path.relative(ROOT, file).replaceAll(path.sep, '/');
  const m = rel.match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/([^/]+)\/index\.html$/i);
  if (!m) return null;
  const [, yearSlugRaw, subjectSlugRaw] = m;
  const yearSlug = yearSlugRaw.toLowerCase();
  const subjectSlug = subjectSlugRaw.toLowerCase();
  const code = (html.match(/AC9[A-Z0-9]+/i)?.[0] || '').toUpperCase();
  const can = canonical(html) || `${ORIGIN}${route(file)}`;
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(x => x[1]);
  const parts = [];
  const seen = new Set();
  for (const href of links) {
    if (!/(worksheet|practice|test|teacher-slides|teacher-deck)/i.test(href)) continue;
    let url;
    try { url = new URL(href, can).href; } catch { continue; }
    if (!url.startsWith(ORIGIN) || seen.has(url)) continue;
    seen.add(url);
    const type = /worksheet/i.test(href) ? 'Worksheet' : /test/i.test(href) ? 'Assessment' : /practice/i.test(href) ? 'Practice' : 'Teacher resource';
    parts.push({ '@type': 'LearningResource', url, learningResourceType: type });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${can}#learning-resource`,
    name: title(html) || code || 'SkillrHub learning resource',
    description: description(html) || undefined,
    url: can,
    inLanguage: 'en-AU',
    isAccessibleForFree: true,
    educationalLevel: yearLabel(yearSlug),
    educationalSubject: subjectLabel(subjectSlug),
    learningResourceType: 'Topic guide',
    teaches: code || undefined,
    educationalAlignment: code ? {
      '@type': 'AlignmentObject',
      alignmentType: 'teaches',
      educationalFramework: 'Australian Curriculum v9.0',
      targetName: code
    } : undefined,
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(parts.length ? { hasPart: parts.slice(0, 8) } : {})
  };
}

function ensureCurriculumResource(file, html) {
  const data = curriculumResource(file, html);
  if (!data) return html;
  const id = 'skillrhub-learning-resource-jsonld';
  const block = `<script type="application/ld+json" id="${id}">\n${JSON.stringify(data, (k,v)=>v===undefined?undefined:v, 2)}\n</script>`;
  const byId = new RegExp(`<script\\b[^>]*id=["']${id}["'][^>]*>[\\s\\S]*?<\\/script>`, 'i');
  if (byId.test(html)) return html.replace(byId, block);
  return html.replace(/<\/head>/i, `${block}\n</head>`);
}

let files = walk(ROOT);
let changed = 0, invalidJson = 0, removed = 0;
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let next = html;
  const scripts = parseScripts(next).reverse();
  for (const match of scripts) {
    let parsed;
    try { parsed = JSON.parse(match[3].trim()); } catch { invalidJson += 1; continue; }
    const cleaned = cleanNode(parsed);
    let replacement = '';
    if (cleaned) {
      if (cleaned['@graph'] && Array.isArray(cleaned['@graph'])) cleaned['@graph'] = cleaned['@graph'].filter(Boolean);
      if (cleaned['@graph'] && cleaned['@graph'].length === 0) replacement = '';
      else replacement = match[0].replace(match[3], JSON.stringify(cleaned));
    }
    if (!replacement) removed += 1;
    next = next.slice(0, match.index) + replacement + next.slice(match.index + match[0].length);
  }
  next = next
    .replace(/<script\b[^>]*id=["']skillrhub-course-jsonld["'][^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<script\b[^>]*id=["']skillrhub-credential-jsonld["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
  next = ensureCurriculumResource(file, next);
  if (path.relative(ROOT, file).replaceAll(path.sep, '/') === 'index.html') next = ensureHomepageEntities(next);
  if (next !== html) {
    changed += 1;
    if (WRITE) fs.writeFileSync(file, next, 'utf8');
  }
}
console.log(`Google entity graph normalization: files=${files.length} changed=${changed} removed=${removed} invalidJson=${invalidJson} mode=${WRITE?'write':'check'}`);
if (!WRITE && changed) process.exit(1);
