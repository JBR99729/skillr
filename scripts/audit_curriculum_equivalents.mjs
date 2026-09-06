#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { curriculumEquivalents as source } from './build_curriculum_equivalents.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expectedRegions = ['Australia', 'Victoria', 'New South Wales', 'United States (USA)', 'Canada (Ontario)', 'United Kingdom (England)', 'India'];
const failures = [];
const counts = new Map();
const mappedUrls = new Set();

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

for (const mapping of Object.values(source.mappings)) {
  const file = path.join(ROOT, mapping.url.replace(/^\//, ''), 'index.html');
  const stage = mapping.url.split('/').filter(Boolean)[0];
  const key = `${stage}/${mapping.subject.toLowerCase()}`;
  counts.set(key, (counts.get(key) || 0) + 1);
  if (!fs.existsSync(file)) {
    failures.push(`${mapping.code}: missing topic page ${path.relative(ROOT, file)}`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  if (mappedUrls.has(mapping.url)) failures.push(`${mapping.code}: duplicate canonical mapping URL ${mapping.url}`);
  mappedUrls.add(mapping.url);
  const expectedCanonical = `https://skillrhub.com${mapping.url}`;
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}"`)) failures.push(`${mapping.code}: topic page does not self-canonicalise to ${mapping.url}`);
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) failures.push(`${mapping.code}: mapped topic page is noindex`);
  if (count(html, '<!-- skillr-curriculum-equivalents:start -->') !== 1) failures.push(`${mapping.code}: expected one static equivalence block`);
  if (count(html, '<!-- skillr-curriculum-equivalents-jsonld:start -->') !== 1) failures.push(`${mapping.code}: expected one equivalence JSON-LD block`);
  if (count(html, 'id="curriculum-equivalents"') !== 1) failures.push(`${mapping.code}: expected one curriculum-equivalents id`);
  if (/Accurate International Curriculum Mapping/i.test(html)) failures.push(`${mapping.code}: legacy generic international mapping remains`);
  for (const region of expectedRegions) if (!html.includes(region)) failures.push(`${mapping.code}: missing ${region} row`);
  if (!html.includes(mapping.victoria.code)) failures.push(`${mapping.code}: missing Victorian code ${mapping.victoria.code}`);
  if (!html.includes(mapping.nsw.code)) failures.push(`${mapping.code}: missing NSW code ${mapping.nsw.code}`);
  if (!html.includes(mapping.skill.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'))) failures.push(`${mapping.code}: mapped skill is not present in static HTML`);
  const schemaMatch = html.match(/<script type="application\/ld\+json" data-skillr-curriculum-equivalents>([\s\S]*?)<\/script>/);
  if (!schemaMatch) failures.push(`${mapping.code}: equivalence JSON-LD script is missing`);
  else {
    try {
      const schema = JSON.parse(schemaMatch[1]);
      if (schema['@type'] !== 'LearningResource') failures.push(`${mapping.code}: equivalence schema is not a LearningResource`);
      if (!Array.isArray(schema.educationalAlignment) || schema.educationalAlignment.length !== 7) failures.push(`${mapping.code}: expected 7 structured educational alignments`);
      if (schema.teaches !== mapping.skill) failures.push(`${mapping.code}: JSON-LD skill differs from mapping data`);
      if (schema.url !== expectedCanonical) failures.push(`${mapping.code}: JSON-LD URL differs from canonical topic URL`);
    } catch (error) {
      failures.push(`${mapping.code}: invalid equivalence JSON-LD (${error.message})`);
    }
  }
  if (mapping.legacyUrl) {
    const legacyFile = path.join(ROOT, mapping.legacyUrl.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(legacyFile)) failures.push(`${mapping.code}: legacy redirect page is missing`);
    else {
      const legacyHtml = fs.readFileSync(legacyFile, 'utf8');
      if (legacyHtml.includes('<!-- skillr-curriculum-equivalents:start -->') || legacyHtml.includes('<!-- skillr-curriculum-equivalents-jsonld:start -->')) {
        failures.push(`${mapping.code}: curriculum mapping remains on legacy redirect ${mapping.legacyUrl}`);
      }
    }
  }
}

const mappings = Object.values(source.mappings);
if (mappings.length !== 676) failures.push(`Expected 676 mapping records, found ${mappings.length}`);
for (const mapping of mappings) {
  if (!/^VC2[A-Z0-9]+(?: \+ VC2[A-Z0-9]+)*$/.test(mapping.victoria.code)) failures.push(`${mapping.code}: invalid Victorian code expression ${mapping.victoria.code}`);
  if (!/^(?:MA|EN|ST|SC)[A-Z0-9-]+(?: \+ (?:MA|EN|ST|SC)[A-Z0-9-]+)*(?: \(supporting prior-stage alignment\))?$/.test(mapping.nsw.code)) failures.push(`${mapping.code}: invalid NSW code expression ${mapping.nsw.code}`);
}

console.log(`CURRICULUM EQUIVALENCE AUDIT: ${mappings.length} F–10 topic mappings.`);
for (const [key, value] of [...counts.entries()].sort()) console.log(`${key}: ${value}`);
if (failures.length) {
  console.error(`FAIL ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200) console.error(`- ... ${failures.length - 200} more`);
  process.exit(1);
}
console.log('PASS: every topic has one static 7-region mapping table, exact VIC/NSW references and valid structured data.');
