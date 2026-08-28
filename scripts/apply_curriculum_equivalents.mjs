#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(ROOT, 'data', 'curriculum-equivalents.json');
const START = '<!-- skillr-curriculum-equivalents:start -->';
const END = '<!-- skillr-curriculum-equivalents:end -->';
const JSON_START = '<!-- skillr-curriculum-equivalents-jsonld:start -->';
const JSON_END = '<!-- skillr-curriculum-equivalents-jsonld:end -->';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function removeMarked(html, start, end) {
  const from = html.indexOf(start);
  if (from < 0) return html;
  const to = html.indexOf(end, from);
  if (to < 0) throw new Error(`Found ${start} without ${end}`);
  return `${html.slice(0, from)}${html.slice(to + end.length)}`;
}

function removeLegacyInternationalDetails(html) {
  const phraseIndex = html.search(/Accurate International Curriculum Mapping/i);
  if (phraseIndex < 0) return html;
  const start = html.lastIndexOf('<details', phraseIndex);
  if (start < 0 || html.lastIndexOf('</details>', phraseIndex) > start) throw new Error('Legacy international heading is not inside a details section.');
  const tags = /<details\b[^>]*>|<\/details>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let foundStart = false;
  for (let tag = tags.exec(html); tag; tag = tags.exec(html)) {
    if (/^<details\b/i.test(tag[0])) {
      depth += 1;
      foundStart = true;
    } else {
      depth -= 1;
      if (foundStart && depth === 0) return `${html.slice(0, start)}${html.slice(tags.lastIndex)}`;
    }
  }
  throw new Error('Could not balance legacy international curriculum details section.');
}

function officialLink(item, label = item.framework) {
  return `<a href="${escapeHtml(item.url)}" rel="nofollow noopener" target="_blank">${escapeHtml(label)}</a>`;
}

function tableRow(region, reference, alignment) {
  return `<tr><th scope="row">${escapeHtml(region)}</th><td>${reference}</td><td>${alignment}</td></tr>`;
}

function buildBlock(mapping) {
  const rows = [
    tableRow('Australia', officialLink(mapping.australia), `<strong>${escapeHtml(mapping.australia.code)}</strong> · ${escapeHtml(mapping.australia.level)}`),
    tableRow('Victoria', officialLink(mapping.victoria), `<strong>${escapeHtml(mapping.victoria.code)}</strong> · ${escapeHtml(mapping.victoria.level)}`),
    tableRow('New South Wales', officialLink(mapping.nsw), `<strong>${escapeHtml(mapping.nsw.code)}</strong> · ${escapeHtml(mapping.nsw.level)}`),
    tableRow('United States (USA)', officialLink(mapping.usa), escapeHtml(mapping.usa.level)),
    tableRow('Canada (Ontario)', officialLink(mapping.canada), escapeHtml(mapping.canada.level)),
    tableRow('United Kingdom (England)', officialLink(mapping.england), escapeHtml(mapping.england.level)),
    tableRow('India', officialLink(mapping.india), escapeHtml(mapping.india.level)),
  ].join('');
  return `${START}<details class="curriculum-topic-section" id="curriculum-equivalents"><summary><strong>Curriculum equivalents: Victoria, NSW and international</strong></summary><div class="curriculum-detail-body"><h2>Curriculum equivalents for ${escapeHtml(mapping.title)}</h2><p><strong>Mapped skill:</strong> ${escapeHtml(mapping.skill)}</p><p>These references identify matching or closely related learning. Curriculum sequence, terminology and depth vary, so teachers should use the mapped skill and lesson difficulty to confirm suitability.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>Curriculum framework</th><th>Closest level or code</th></tr></thead><tbody>${rows}</tbody></table></div><p><small>Australian Curriculum v9.0 is the canonical source for this SkillrHub lesson. Victoria and NSW entries name the closest published state codes or outcomes; international entries are planning references rather than claims of identical curricula.</small></p></div></details>${END}`;
}

function canonicalUrl(mapping) {
  return `https://skillrhub.com${mapping.url}`;
}

function buildJsonLd(mapping) {
  const alignments = [
    ['Australian Curriculum v9.0', `${mapping.australia.code} · ${mapping.australia.level}`, mapping.australia.url],
    [mapping.victoria.framework, `${mapping.victoria.code} · ${mapping.victoria.level}`, mapping.victoria.url],
    [mapping.nsw.framework, `${mapping.nsw.code} · ${mapping.nsw.level}`, mapping.nsw.url],
    [mapping.usa.framework, mapping.usa.level, mapping.usa.url],
    [mapping.canada.framework, mapping.canada.level, mapping.canada.url],
    [mapping.england.framework, mapping.england.level, mapping.england.url],
    [mapping.india.framework, mapping.india.level, mapping.india.url],
  ].map(([educationalFramework, targetName, targetUrl]) => ({ '@type': 'AlignmentObject', alignmentType: 'teaches', educationalFramework, targetName, targetUrl }));
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${canonicalUrl(mapping)}#curriculum-equivalents`,
    name: `${mapping.title} curriculum equivalents`,
    url: canonicalUrl(mapping),
    teaches: mapping.skill,
    educationalAlignment: alignments,
  };
  return `${JSON_START}<script type="application/ld+json" data-skillr-curriculum-equivalents>${JSON.stringify(payload)}</script>${JSON_END}`;
}

function insertBeforeFirst(html, markers, content) {
  for (const marker of markers) {
    const index = typeof marker === 'string' ? html.indexOf(marker) : html.search(marker);
    if (index >= 0) return `${html.slice(0, index)}${content}${html.slice(index)}`;
  }
  throw new Error('No safe insertion point found.');
}

function insertAfterDetailsId(html, id, content) {
  const startPattern = new RegExp(`<details\\b[^>]*id=["']${id}["'][^>]*>`, 'i');
  const startMatch = startPattern.exec(html);
  if (!startMatch) return null;
  const tags = /<details\b[^>]*>|<\/details>/gi;
  tags.lastIndex = startMatch.index;
  let depth = 0;
  for (let tag = tags.exec(html); tag; tag = tags.exec(html)) {
    if (/^<details\b/i.test(tag[0])) depth += 1;
    else {
      depth -= 1;
      if (depth === 0) return `${html.slice(0, tags.lastIndex)}${content}${html.slice(tags.lastIndex)}`;
    }
  }
  throw new Error(`Could not balance details#${id}.`);
}

const requestedStages = new Set(process.argv.slice(2).filter(arg => !arg.startsWith('--')));
const dryRun = process.argv.includes('--check');
const source = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
let changed = 0;
let checked = 0;

for (const mapping of Object.values(source.mappings)) {
  const stage = mapping.url.split('/').filter(Boolean)[0];
  if (requestedStages.size && !requestedStages.has(stage)) continue;
  const file = path.join(ROOT, mapping.url.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(file)) throw new Error(`${mapping.code}: topic page is missing at ${path.relative(ROOT, file)}`);
  const original = fs.readFileSync(file, 'utf8');
  let html = removeMarked(original, START, END);
  html = removeMarked(html, JSON_START, JSON_END);
  html = removeLegacyInternationalDetails(html);
  try {
    html = insertBeforeFirst(html, ['</head>'], buildJsonLd(mapping));
    const afterOfficialReferences = insertAfterDetailsId(html, 'official-references', buildBlock(mapping));
    html = afterOfficialReferences ?? insertBeforeFirst(html, ['<!-- skillr-facebook-feedback:start -->', '</main>', '</body>'], buildBlock(mapping));
  } catch (error) {
    throw new Error(`${mapping.code} (${path.relative(ROOT, file)}): ${error.message}`);
  }
  checked += 1;
  if (html !== original) {
    changed += 1;
    if (!dryRun) fs.writeFileSync(file, html);
  }
}

console.log(`${dryRun ? 'Would update' : 'Updated'} ${changed} of ${checked} selected curriculum topic pages.`);
