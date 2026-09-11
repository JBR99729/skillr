import assert from 'node:assert/strict';
import test from 'node:test';
import { hasTeacherDisplayPage } from '../lib/static_teacher_display.mjs';
const page = '<link rel="stylesheet" href="/assets/css/classroom-view.css"><main class="s shell"><section class="b board"><details><summary>Learning intention</summary><p>Select equipment and record precise data.</p></details></section></main>';
test('recognises existing shell/board classroom pages with additional classes', () => {
  assert.equal(hasTeacherDisplayPage(page), true);
});
test('does not mistake an ordinary topic or incomplete classroom shell for a display', () => {
  for (const html of [page.replace('s shell', 's'), page.replace('b board', 'b'), page.replace('/assets/css/classroom-view.css', '/style.css'), page.replaceAll('details', 'div'), page.replaceAll('summary', 'h2'), '<main class="shell"><section class="board"></section></main>']) {
    assert.equal(hasTeacherDisplayPage(html), false);
  }
});
test('continues to reject decorative example-icon layouts', () => {
  assert.equal(hasTeacherDisplayPage(page.replace('<p>', '<p class="example-icon">')), false);
});
