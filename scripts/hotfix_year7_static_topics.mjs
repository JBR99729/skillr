import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const subjectRoots = ['year7/maths', 'year7/science', 'year7/english'];
let changed = 0;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const relRoot of subjectRoots) {
  const absRoot = path.join(root, relRoot);
  for (const file of walk(absRoot)) {
    if (path.basename(file) !== 'index.html') continue;
    const rel = path.relative(root, file).replaceAll('\\', '/');
    if (!/\/ac9[^/]+\/index\.html$/i.test('/' + rel)) continue;

    const before = fs.readFileSync(file, 'utf8');
    let html = before;

    // Year 7 topic guides are complete authored HTML. Remove local runtime scripts
    // so native HTML details/summary controls remain browser-managed and cannot hang.
    html = html.replace(/<script\b[^>]*\bsrc=["']\/(?:assets\/[^"']+|pwa-register\.js[^"']*)["'][^>]*><\/script>\s*/gi, '');

    // Remove now-unused Skillr runtime metadata blocks, while preserving JSON-LD,
    // analytics and advertising scripts in the document head.
    html = html.replace(/<script>\s*window\.skillrPageMeta\s*=.*?<\/script>\s*/gis, '');
    html = html.replace(/<script>\s*window\.skillrAccess\s*=.*?<\/script>\s*/gis, '');
    html = html.replace(/<script>\s*window\.skillrPageMeta\s*=.*?window\.skillrAccess\s*=.*?<\/script>\s*/gis, '');

    // Keep issue reporting useful without JavaScript.
    html = html.replace(
      /<button\b[^>]*class=["']report-issue-button["'][^>]*>\s*Report issue\s*<\/button>/gi,
      '<a class="report-issue-button" href="mailto:skillrhublearning@gmail.com?subject=SkillrHub%20Year%207%20topic%20issue">Report issue</a>'
    );

    if (html !== before) {
      fs.writeFileSync(file, html);
      changed += 1;
      console.log(`static: ${rel}`);
    }
  }
}

console.log(`Updated ${changed} Year 7 topic pages to static HTML mode.`);
if (!changed) console.log('No Year 7 topic pages required changes.');
