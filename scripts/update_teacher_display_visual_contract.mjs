import fs from 'node:fs';

const helperFiles = [
  'scripts/validate_foundation_maths_static_topic_pages.mjs',
  'scripts/validate_foundation_science_static_topic_pages.mjs',
  'scripts/validate_static_curriculum_architecture.mjs',
  'scripts/audit_static_teacher_slides.mjs',
];

const assertionFiles = [
  'scripts/validate_year1_maths_static_topic_pages.mjs',
  'scripts/validate_year1_science_static_topic_pages.mjs',
  'scripts/validate_year2_maths_static_topic_pages.mjs',
  'scripts/validate_year2_science_static_topic_pages.mjs',
  'scripts/validate_year3_maths_static_topic_pages.mjs',
  'scripts/validate_year3_science_static_topic_pages.mjs',
  'scripts/validate_year4_maths_static_topic_pages.mjs',
  'scripts/validate_year4_science_static_topic_pages.mjs',
];

const fillerGuard = `!/class=["'][^"']*\\bexample-icon\\b[^"']*["']/i.test(html)`;
let changed = 0;

for (const file of helperFiles) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before.replace('&& /<svg\\b/i.test(html)', `&& ${fillerGuard}`);
  if (after === before && !after.includes('example-icon')) {
    throw new Error(`${file}: expected Teacher Display SVG helper requirement was not found`);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

for (const file of assertionFiles) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.split(/\r?\n/).map((line) => {
    if (line.includes('teacher display page must include inline SVG teaching examples')) {
      const indent = line.match(/^\s*/)?.[0] || '';
      return `${indent}if (/class=["'][^"']*\\bexample-icon\\b[^"']*["']/i.test(viewer)) failures.push(\`${'${code}'}: teacher display page must not include generated filler example icons\`);`;
    }
    if (line.includes('teacher display examples must include inline SVG teaching icons')) {
      const indent = line.match(/^\s*/)?.[0] || '';
      return `${indent}if (/class=["'][^"']*\\bexample-icon\\b[^"']*["']/i.test(viewer)) failures.push(\`${'${code}'}: teacher display page must not include generated filler example icons\`);`;
    }
    return line;
  }).join('\n');

  if (after === before && !after.includes('must not include generated filler example icons')) {
    throw new Error(`${file}: expected inline-SVG Teacher Display assertion was not found`);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

const allFiles = [...helperFiles, ...assertionFiles];
for (const file of allFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('teacher display examples must include inline SVG teaching icons') ||
      source.includes('teacher display page must include inline SVG teaching examples')) {
    throw new Error(`${file}: obsolete generic-inline-SVG requirement remains`);
  }
}

for (const file of helperFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('example-icon')) throw new Error(`${file}: filler-icon prohibition was not installed`);
}

console.log(`Updated Teacher Display visual contract in ${changed} validator/audit files.`);
console.log('PASS: text-only example cards are valid; generated .example-icon filler is forbidden; unrelated meaningful SVG validation is untouched.');
