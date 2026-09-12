#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ORIGIN = 'https://skillrhub.com';
const ORG_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const errors = [];
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
function rel(file) { return path.relative(ROOT, file).replaceAll(path.sep, '/'); }
function canonical(html) { return html.match(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["']/i)?.[1]?.trim() || ''; }
function isNoindex(html) { return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html); }
function jsonScripts(html) {
  const re = /<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi;
  return [...html.matchAll(re)];
}
function flattenTypes(node, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) { for (const x of node) flattenTypes(x, out); return out; }
  const t = node['@type'];
  if (Array.isArray(t)) out.push(...t); else if (t) out.push(t);
  for (const v of Object.values(node)) flattenTypes(v, out);
  return out;
}
function findNodes(node, type, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) { for (const x of node) findNodes(x, type, out); return out; }
  const t = node['@type'];
  const ts = Array.isArray(t) ? t : [t];
  if (ts.includes(type)) out.push(node);
  for (const v of Object.values(node)) findNodes(v, type, out);
  return out;
}

for (const file of walk(ROOT)) {
  const name = rel(file);
  const html = fs.readFileSync(file, 'utf8');
  const parsed = [];
  for (const match of jsonScripts(html)) {
    try { parsed.push(JSON.parse(match[3].trim())); }
    catch { errors.push(`${name}: invalid JSON-LD`); }
  }
  const types = parsed.flatMap(x => flattenTypes(x));
  if (types.includes('EducationalOccupationalCredential')) errors.push(`${name}: misleading EducationalOccupationalCredential schema remains`);
  if (types.includes('Course')) errors.push(`${name}: Course schema remains; SkillrHub self-paced resources must use LearningResource unless a real instructor-led course is introduced`);

  const can = canonical(html);
  if (!isNoindex(html) && can && !can.startsWith(ORIGIN)) errors.push(`${name}: canonical is outside SkillrHub: ${can}`);

  const topic = name.match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/[^/]+\/index\.html$/i);
  if (topic && !isNoindex(html)) {
    if (!can) errors.push(`${name}: curriculum topic missing canonical`);
    const crumbs = parsed.flatMap(x => findNodes(x, 'BreadcrumbList'));
    if (!crumbs.length) errors.push(`${name}: curriculum topic missing BreadcrumbList`);
    else {
      const items = crumbs[0].itemListElement || [];
      const last = items.at(-1)?.item || '';
      if (can && last && last.replace(/\/$/, '') !== can.replace(/\/$/, '')) errors.push(`${name}: breadcrumb final URL does not match canonical`);
    }

    const resources = parsed.flatMap(x => findNodes(x, 'LearningResource'))
      .filter(x => x.url === can || x['@id'] === `${can}#learning-resource`);
    const primary = resources.find(x => x['@id'] === `${can}#learning-resource`)
      || resources.find(x =>
        x.url === can
        && x.publisher?.['@id'] === ORG_ID
        && x.isPartOf?.['@id'] === WEBSITE_ID
      );

    if (!primary) errors.push(`${name}: canonical topic missing primary LearningResource schema`);
    else {
      if (primary.publisher?.['@id'] !== ORG_ID) errors.push(`${name}: LearningResource publisher must reference ${ORG_ID}`);
      if (primary.isPartOf?.['@id'] !== WEBSITE_ID) errors.push(`${name}: LearningResource isPartOf must reference ${WEBSITE_ID}`);
      if (!primary.educationalAlignment) errors.push(`${name}: LearningResource missing educationalAlignment`);
    }
  }
}

const home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const homeParsed = jsonScripts(home).map(m => { try { return JSON.parse(m[3].trim()); } catch { return null; } }).filter(Boolean);
const orgs = homeParsed.flatMap(x => findNodes(x, 'Organization'));
const sites = homeParsed.flatMap(x => findNodes(x, 'WebSite'));
if (!orgs.some(x => x['@id'] === ORG_ID)) errors.push(`index.html: missing canonical Organization entity ${ORG_ID}`);
if (!sites.some(x => x['@id'] === WEBSITE_ID)) errors.push(`index.html: missing canonical WebSite entity ${WEBSITE_ID}`);

if (errors.length) {
  console.error(`Google entity graph audit failed (${errors.length} issue(s)):`);
  for (const e of errors.slice(0, 250)) console.error(`- ${e}`);
  if (errors.length > 250) console.error(`... ${errors.length - 250} more`);
  process.exit(1);
}
console.log('Google entity graph audit: PASS');
