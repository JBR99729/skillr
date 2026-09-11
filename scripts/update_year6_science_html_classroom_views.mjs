import fs from 'node:fs';
import path from 'node:path';
import { writeYear6ScienceClassroomView } from './year6_science_html_classroom_view.mjs';

const root = path.resolve(import.meta.dirname, '..');
const requestedCodes = process.argv.slice(2).map((code) => code.toUpperCase());
if (!requestedCodes.length) throw new Error('Pass one or more Year 6 Science curriculum codes.');

for (const code of requestedCodes) {
  const directory = fs.readdirSync(path.join(root, 'year6/science')).find((entry) => entry.startsWith(`${code.toLowerCase()}-`));
  if (!directory) throw new Error(`${code}: topic directory not found`);
  writeYear6ScienceClassroomView(root, code, directory);
  console.log(`${code}: HTML Classroom View updated from its static Topic Guide.`);
}
