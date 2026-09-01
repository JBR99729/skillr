#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const original = path.join(root, 'scripts/migrate_foundation_english_static.mjs');
let source = fs.readFileSync(original, 'utf8');

source = source.replace(
  "  'assets/foundation-english-data.js',\n",
  "  'assets/foundation-english-data.js',\n  'assets/foundation-english-student-facing-core.js',\n  'assets/foundation-english-student-facing-la.js',\n  'assets/foundation-english-student-facing-le.js',\n  'assets/foundation-english-student-facing-ly1.js',\n  'assets/foundation-english-student-facing-ly2.js',\n"
);
source = source.replace(
  "const data = context.window.SkillrFoundationEnglishData;\n",
  "const data = context.window.SkillrFoundationEnglishData;\ncontext.window.SkillrFoundationEnglishStudentFacing?.applyData(data, context.window.SkillrFoundationEnglishWorksheetData);\n"
);
source = source.replace(
  "run('assets/foundation-ac9efla01-lesson.js');\n",
  "run('assets/foundation-ac9efla01-lesson.js');\nrun('assets/foundation-ac9efla01-alignment.js');\n"
);

const temp = path.join(root, 'scripts', `.tmp-foundation-english-student-facing-${process.pid}.mjs`);
fs.writeFileSync(temp, source);
const result = spawnSync(process.execPath, [temp], { cwd: root, stdio: 'inherit' });
fs.rmSync(temp, { force: true });
if (result.status !== 0) process.exit(result.status || 1);

const englishRoot = path.join(root, 'foundation/english');
const topicDirs = fs.readdirSync(englishRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^ac9ef(?:la|le|ly)\d{2}-/i.test(entry.name));

for (const entry of topicDirs) {
  const index = path.join(englishRoot, entry.name, 'index.html');
  if (!fs.existsSync(index)) continue;
  let html = fs.readFileSync(index, 'utf8');
  html = html
    .replace(/<summary><strong>What students learn<\/strong><\/summary>/g, '<summary><strong>What this skill means</strong></summary>')
    .replace(/<strong>Learning intention:<\/strong>/g, '<strong>Learning goal: I can</strong>')
    .replace(/<h3>Success criteria<\/h3>/g, '<h3>I am ready when I can</h3>')
    .replace(/<summary><strong>Model and guided application<\/strong><\/summary>/g, '<summary><strong>See it, then try it</strong></summary>')
    .replace(/<summary><strong>Learning activities<\/strong><\/summary>/g, '<summary><strong>Try these</strong></summary>')
    .replace(/<summary><strong>Common misconceptions and quick fixes<\/strong><\/summary>/g, '<summary><strong>Common mix-ups</strong></summary>')
    .replace(/<summary><strong>Quick checks and mastery<\/strong><\/summary>/g, '<summary><strong>Check your understanding</strong></summary>')
    .replace(/<p><strong>Teacher:<\/strong>/g, '<p><strong>Think:</strong>')
    .replace(/<p><strong>Ask:<\/strong>/g, '<p><strong>Try:</strong>')
    .replace(/<p><strong>Students:<\/strong>/g, '<p><strong>A strong answer:</strong>')
    .replace(/<p><strong>Look for:<\/strong>/g, '<p><strong>Check:</strong>')
    .replace(/<p><strong>If incorrect:<\/strong>/g, '<p><strong>If you are stuck:</strong>')
    .replace(/>Practice Sheet</g, '>Printable Worksheet<')
    .replace(/>Practice<\/a>/g, '>40-question Practice</a>')
    .replace(/<h2>Teacher resource<\/h2><p>Project the fixed branded deck one slide at a time\.<\/p>/g, '<h2>Classroom display</h2><p>Open the fixed SkillrHub display for whole-class modelling and guided practice.</p>');

  if (/^ac9efla01-/i.test(entry.name) && !/What students learn|Key concept|Learning intention|Learning goal|Teaching Lesson/i.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) {
    const learningGoal = '<section class="curriculum-topic-section"><div class="curriculum-detail-body"><h2>Learning goal</h2><p><strong>I can choose words that suit who I am talking to.</strong></p><p>Ask a relevant question, make a clear request or share an opinion, then choose words that fit the person and situation.</p></div></section>';
    html = html.includes('</main>') ? html.replace('</main>', `${learningGoal}</main>`) : html.replace('</body>', `${learningGoal}</body>`);
  }

  fs.writeFileSync(index, html);
}

console.log(`Rebuilt ${topicDirs.length} Foundation English topic/classroom sets with the student-facing source.`);
