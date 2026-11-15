import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePaidWorksheetNavigation as check } from '../lib/paid_worksheet_navigation.mjs';
const paid = { available:true, hasPrintables:true, free:false, curriculumCodes:['AC9M5N06'], url:'/products/multiply/', tptUrl:'https://www.teacherspayteachers.com/Product/Multiply-12345678' };
test('accepts the exact-code paid product', () => assert.deepEqual(check('<a href="/products/multiply/">Paid worksheets</a>', 'AC9M5N06', '', [paid]), []));
test('rejects a different code and a free sample as substitutes', () => {
  assert.equal(check('<a href="/products/multiply/">Paid worksheets</a>', 'AC9M5N05', '', [paid]).length, 1);
  assert.equal(check('<a href="/products/multiply/">Sample</a>', 'AC9M5N06', '', [{...paid,free:true}]).length, 1);
});
test('permits a catalogue only when no matching paid printable is available', () => {
  assert.deepEqual(check('<a href="/products/">Browse paid worksheets</a>', 'AC9M5N05', '', [paid]), []);
  assert.equal(check('<a href="/products/">Browse</a>', 'AC9M5N06', '', [paid]).length, 1);
});
test('does not accept the withdrawn free worksheet route', () => assert.equal(check('<a href="/quiz/year-5/math/ac9m5n06/worksheet/">Worksheet</a>', 'AC9M5N06', '', [paid]).length, 1));
