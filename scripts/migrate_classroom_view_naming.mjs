import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const curriculumRoots = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];
const changed = [];

const read = (file) => fs.readFileSync(file, 'utf8');
const writeIfChanged = (file, before, after) => {
  if (after === before) return false;
  fs.writeFileSync(file, after);
  changed.push(path.relative(root, file));
  return true;
};

const walkFiles = (dir, predicate) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
};

const rewriteTeacherLinkLabels = (source) => source.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (anchor) => {
  const open = anchor.match(/^<a\b[^>]*>/i)?.[0] || '';
  if (!/href\s*=\s*["'][^"']*teacher-slides[^"']*["']/i.test(open)) return anchor;
  return anchor.replace(/Teacher\s+(?:Slides|Display(?:\s+Page)?)/gi, 'Classroom View');
});

const rewriteDisplayPage = (source, file) => {
  if (!source.includes('class="display-board"')) return rewriteTeacherLinkLabels(source);

  let html = source;
  html = html.replace(/<title>([^<]*?)\s+Teacher Display(?: Page)?\s*\|\s*SkillrHub<\/title>/i, '<title>$1 Classroom View | SkillrHub</title>');
  html = html.replace(/aria-label="Teacher display navigation"/gi, 'aria-label="Classroom View navigation"');

  const currentHeading = html.match(/<h1 id="page-title">([\s\S]*?)<\/h1>/i)?.[1]?.trim() || '';
  if (currentHeading && currentHeading !== 'Classroom View') {
    const headerPair = /<h1 id="page-title">[\s\S]*?<\/h1>\s*<small>Teacher Display Page[^<]*<\/small>/i;
    if (headerPair.test(html)) {
      html = html.replace(
        headerPair,
        `<h1 id="page-title">Classroom View</h1><small>Ready to project and teach</small><p class="display-topic-title">${currentHeading}</p><!-- Teacher Display Page -->`,
      );
    }
  }

  if (html.includes('<h1 id="page-title">Classroom View</h1>')) {
    html = html.replace(/<small>Teacher Display Page[^<]*<\/small>/i, '<small>Ready to project and teach</small><!-- Teacher Display Page -->');
    if (!html.includes('class="display-topic-title"')) {
      throw new Error(`${path.relative(root, file)}: Classroom View page lost its topic title`);
    }
    if (!html.includes('<!-- Teacher Display Page -->')) {
      html = html.replace('<small>Ready to project and teach</small>', '<small>Ready to project and teach</small><!-- Teacher Display Page -->');
    }
  }

  html = rewriteTeacherLinkLabels(html);

  const required = [
    '<h1 id="page-title">Classroom View</h1>',
    '<small>Ready to project and teach</small>',
    'class="display-topic-title"',
  ];
  for (const needle of required) {
    if (!html.includes(needle)) throw new Error(`${path.relative(root, file)}: failed to apply ${needle}`);
  }
  return html;
};

const rewriteConverter = (source) => {
  let out = source;
  out = out.replace(/Teacher Display \| SkillrHub/g, 'Classroom View | SkillrHub');
  out = out.replace(/aria-label="Teacher display navigation"/g, 'aria-label="Classroom View navigation"');
  out = out.replace(
    /<h1 id="page-title">([^<]+)<\/h1><small>Teacher Display Page - plain HTML, landscape-friendly<\/small>/g,
    '<h1 id="page-title">Classroom View</h1><small>Ready to project and teach</small><p class="display-topic-title">$1</p><!-- Teacher Display Page -->',
  );
  out = rewriteTeacherLinkLabels(out);
  return out;
};

for (const curriculumRoot of curriculumRoots) {
  const base = path.join(root, curriculumRoot);
  for (const file of walkFiles(base, (name) => name.endsWith('.html'))) {
    const before = read(file);
    const isDisplay = /[\\/]teacher-slides[\\/]index\.html$/i.test(file);
    const after = isDisplay ? rewriteDisplayPage(before, file) : rewriteTeacherLinkLabels(before);
    writeIfChanged(file, before, after);
  }
}

const scriptsDir = path.join(root, 'scripts');
for (const file of walkFiles(scriptsDir, (name) => /\.(?:mjs|js|py)$/i.test(name))) {
  if (file.endsWith('migrate_classroom_view_naming.mjs')) continue;
  const before = read(file);
  let after = before;
  if (/convert_(?:foundation|year\d+)_teacher_slides_to_display_pages\.mjs$/i.test(file)) {
    after = rewriteConverter(after);
  } else {
    after = rewriteTeacherLinkLabels(after);
  }

  if (/validate_year(?:8|9|10)_teacher_display_pages\.mjs$/i.test(file)) {
    after = after
      .replace(/<title>\$\{code\} Teacher Display \| SkillrHub<\/title>/g, '<title>${code} Classroom View | SkillrHub</title>')
      .replace(/<h1 id="page-title">\$\{code\} - /g, '<h1 id="page-title">Classroom View</h1>')
      .replace(/document title does not start with \$\{code\}/g, 'document title is not ${code} Classroom View')
      .replace(/display heading does not start with \$\{code\}/g, 'display heading is not Classroom View');
  }

  writeIfChanged(file, before, after);
}

console.log(`Classroom View naming migration complete: ${changed.length} files changed.`);
