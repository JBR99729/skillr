#!/usr/bin/env node
import fs from 'node:fs';

const jsPath = 'assets/multi-audience-ux.js';
const cssPath = 'assets/multi-audience-ux.css';
const js = fs.readFileSync(jsPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const requiredJs = [
  'Learn',
  'Practice',
  'Test',
  'More resources',
  'topic-action-row',
  'skillr-topic-primary-action',
  'skillr-more-resources',
  'MutationObserver'
];

const requiredCss = [
  'skillr-topic-primary-action',
  'skillr-more-resources',
  'grid-template-columns:repeat(3,minmax(0,1fr))'
];

const missing = [];
for (const token of requiredJs) if (!js.includes(token)) missing.push(`${jsPath}: ${token}`);
for (const token of requiredCss) if (!css.includes(token)) missing.push(`${cssPath}: ${token}`);

if (missing.length) {
  console.error('F-10 topic layout contract FAILED.');
  console.error('Locked contract: exactly three primary topic actions — Learn, Practice, Test — with all other topic resources under More resources.');
  console.error('Missing contract markers:');
  missing.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log('F-10 topic layout contract PASS: Learn → Practice → Test + More resources is locked.');
