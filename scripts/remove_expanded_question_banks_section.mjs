#!/usr/bin/env node
import fs from 'node:fs';

const file = 'year7/maths/ac9m7n06-the-4-operations-with-positive-rational-numbers-including/index.html';
let html = fs.readFileSync(file, 'utf8');

const section = /<details\s+class="curriculum-topic-section"><summary><strong>Expanded question banks<\/strong><\/summary><div class="curriculum-detail-body"><p><strong>Practice:<\/strong>[\s\S]*?<\/div><\/details>/;
if (!section.test(html)) throw new Error('Expanded question banks section not found');

html = html.replace(section, '');
html = html.replace(
  'Fractions, decimals, percentages, efficient strategies, worked examples and expanded question banks.',
  'Fractions, decimals, percentages, efficient strategies and worked examples.'
);

if (/Expanded question banks/i.test(html)) throw new Error('Expanded question banks text still present');
fs.writeFileSync(file, html);
console.log('Removed Expanded question banks from AC9M7N06.');
