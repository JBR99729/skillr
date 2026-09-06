#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const YEARS = [8, 9, 10];

function loadRegistry(year) {
  const file = path.join(ROOT, 'assets', `year${year}-maths-data.js`);
  const source = fs.readFileSync(file, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: file });
  const registry = context.window.SkillrUpperMathsData;
  if (!registry || typeof registry !== 'object') throw new Error(`No SkillrUpperMathsData in ${file}`);
  return registry;
}

let replaced = 0;
for (const year of YEARS) {
  const registry = loadRegistry(year);
  const indexFile = path.join(ROOT, `year${year}`, 'curriculum', 'maths', 'index.html');
  let html = fs.readFileSync(indexFile, 'utf8');

  for (const unit of Object.values(registry)) {
    if (!unit?.code || !unit?.slug || Number(unit.year) !== year) continue;
    const legacy = `/worksheets/year${year}/maths/teacher-slides/live.html?code=${unit.code}`;
    const fixed = `/year${year}/maths/${unit.slug}/teacher-slides/`;
    if (html.includes(legacy)) {
      html = html.split(legacy).join(fixed);
      replaced++;
    }
  }

  if (/\/worksheets\/year(?:8|9|10)\/maths\/teacher-slides\/live\.html\?code=/i.test(html)) {
    throw new Error(`Legacy Teacher Slide route remains in ${indexFile}`);
  }
  fs.writeFileSync(indexFile, html);
}

if (replaced === 0) console.log('Upper Maths curriculum indexes already use fixed Teacher Slide routes.');
else console.log(`Replaced ${replaced} legacy Years 8-10 Maths Teacher Slide links.`);
