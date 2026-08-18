#!/usr/bin/env node
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, c) => fs.writeFileSync(p, c);
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

// Foundation English: extend the already-tested standing QA sections to every code.
{
  const p = 'scripts/migrate_foundation_english_static.mjs';
  let s = read(p);
  s = s.replace(/const QA_SPRINT_1 = new Set\(\[[^\n]+\]\);/, 'const QA_SPRINT_1 = new Set(codes);');
  if (!s.includes('const QA_SPRINT_1 = new Set(codes);')) throw new Error('Could not enable all Foundation English QA standing sections.');
  write(p, s);
}

// Foundation Maths: add the same standing QA sections to the durable static generator.
{
  const p = 'scripts/migrate_foundation_maths_static.mjs';
  let s = read(p);
  if (!s.includes('function standingHtml(code,u)')) {
    const marker = "const quiz=(c,t)=>`/quiz/grade-k/math/${c.toLowerCase()}/${t}/`;const ul=(xs,fn=x=>esc(x))=>list(xs).length?`<ul>${list(xs).map(x=>`<li>${fn(x)}</li>`).join('')}</ul>`:'<p>No additional items.</p>';";
    if (!s.includes(marker)) throw new Error('Foundation Maths helper marker changed.');
    const addition = `${marker}\nfunction standingHtml(code,u){const peers=codes.filter(c=>c!==code).slice(0,8);const related=peers.map(c=>\`<li><a href=\"/foundation/maths/\${data[c].slug}/\">\${esc(c)}: \${esc(data[c].title)}</a></li>\`).join('');return \`<details class=\"curriculum-topic-section\"><summary><strong>International curriculum mapping</strong></summary><div class=\"curriculum-detail-body\"><div class=\"curriculum-table-wrap\"><table class=\"curriculum-map-table\"><thead><tr><th>Region</th><th>Curriculum</th><th>Closest mapping</th></tr></thead><tbody><tr><td>Australia</td><td>Australian Curriculum v9.0</td><td>\${esc(code)} — \${esc(u.desc||u.title)}</td></tr><tr><td>Victoria</td><td>Victorian Curriculum F–10</td><td>Foundation Mathematics closest matching content focus; use current VCAA wording for exact local outcomes.</td></tr><tr><td>NSW</td><td>NSW Curriculum</td><td>Early Stage 1 Mathematics closest matching content focus; use current NSW curriculum wording for exact local outcomes.</td></tr><tr><td>United States</td><td>Common Core State Standards</td><td>Kindergarten Mathematics closest-topic alignment.</td></tr><tr><td>England</td><td>National Curriculum</td><td>Key Stage 1 / early Mathematics closest programme-of-study alignment.</td></tr><tr><td>New Zealand</td><td>New Zealand Curriculum</td><td>Early Mathematics closest achievement-objective alignment.</td></tr></tbody></table></div></div></details><details class=\"curriculum-topic-section\"><summary><strong>Related Topics</strong></summary><div class=\"curriculum-detail-body\"><ul class=\"curriculum-related-list\">\${related}</ul></div></details><details class=\"curriculum-topic-section\"><summary><strong>Official Curriculum References</strong></summary><div class=\"curriculum-detail-body\"><ul class=\"curriculum-source-list\"><li><a href=\"https://www.australiancurriculum.edu.au/\" rel=\"nofollow noopener\" target=\"_blank\">Australian Curriculum Version 9.0</a></li><li><a href=\"https://f10.vcaa.vic.edu.au/\" rel=\"nofollow noopener\" target=\"_blank\">Victorian Curriculum F–10</a></li><li><a href=\"https://curriculum.nsw.edu.au/\" rel=\"nofollow noopener\" target=\"_blank\">NSW Curriculum</a></li><li><a href=\"https://www.thecorestandards.org/Math/\" rel=\"nofollow noopener\" target=\"_blank\">Common Core Mathematics</a></li><li><a href=\"https://www.gov.uk/government/collections/national-curriculum\" rel=\"nofollow noopener\" target=\"_blank\">England National Curriculum</a></li><li><a href=\"https://newzealandcurriculum.tahurangi.education.govt.nz/\" rel=\"nofollow noopener\" target=\"_blank\">New Zealand Curriculum</a></li></ul></div></details>\`;}`;
    s = s.replace(marker, addition);
  }
  s = s.replace('<p class="curriculum-eyebrow">${esc(code)} • Foundation Maths</p>', '<p class="curriculum-eyebrow">SkillrHub • ${esc(code)} • Foundation Maths</p>');
  s = s.replace('</div></header><main class="curriculum-layout">', '</div><button class="report-issue-button" type="button" data-report-issue>Report Issue</button></header><main class="curriculum-layout">');
  s = s.replace('</div></div></details></div><aside class="curriculum-sidebar">', '</div></div></details>${standingHtml(code,u)}</div><aside class="curriculum-sidebar">');
  if (!s.includes('function standingHtml(code,u)') || !s.includes('data-report-issue>Report Issue')) throw new Error('Could not complete Foundation Maths static generator QA sections.');
  write(p, s);
}

// Foundation Science: preserve the already-authored static content while removing legacy runtime renderers.
{
  const p = 'scripts/migrate_foundation_science_fixed_slides.py';
  let s = read(p);
  if (!s.includes('import re')) s = s.replace('import subprocess, shutil', 'import subprocess, shutil, re');
  const old = "    for old in old_urls(code):\n        text=text.replace(old,'teacher-slides/')\n    f.write_text(text,encoding='utf-8')";
  const replacement = "    for old in old_urls(code):\n        text=text.replace(old,'teacher-slides/')\n    text=re.sub(r'<script[^>]+src=[\\\"\\\']/assets/foundation-[^\\\"\\\']*render\\.js[^\\\"\\\']*[\\\"\\\'][^>]*></script>\\s*','',text,flags=re.I)\n    f.write_text(text,encoding='utf-8')";
  if (s.includes(old)) s = s.replace(old, replacement);
  if (!s.includes("re.sub(r'<script[^>]+src=")) throw new Error('Could not add Foundation Science runtime-renderer cleanup.');
  write(p, s);
}

run(process.execPath, ['scripts/migrate_foundation_english_static.mjs']);
run(process.execPath, ['scripts/migrate_foundation_maths_static.mjs']);
run('python3', ['scripts/migrate_foundation_science_fixed_slides.py']);
run(process.execPath, ['scripts/validate_static_curriculum_architecture.mjs']);
console.log('Foundation English, Maths and Science QA migration complete.');
