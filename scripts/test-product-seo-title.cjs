const test = require('node:test');
const assert = require('node:assert/strict');
const {productSeoTitle} = require('./lib/product-seo-title.cjs');

test('Bing titles retain meaningful product identity and free/sample/part distinctions', () => {
  for (const [title, words] of [
    ['Year 1 Science Inquiry Skills | Questioning, Planning & Processing | Part 2', ['Year 1', 'Science Inquiry', 'Part 2']],
    ['FREE Year 3 Time Teaching Slides Sample | Analogue Clocks & Duration', ['FREE', 'Year 3', 'Slides', 'Sample']],
    ['Year 1 Place Value & Number Partitioning Worksheets | Tens and Ones | AC9M1N02', ['Place Value', 'Partitioning', 'Worksheets']],
  ]) {
    const result = productSeoTitle({title});
    assert([...result].length < 70);
    for (const word of words) assert(result.includes(word), result);
    assert(result.endsWith(' | SkillrHub'));
    assert.equal(productSeoTitle({seoTitle: result}), result);
  }
});

test('short titles are preserved and long unicode titles end at a whole word', () => {
  assert.equal(productSeoTitle({title:'Year 1 Counting'}), 'Year 1 Counting | SkillrHub');
  const result = productSeoTitle({title:'Foundation Maths worksheets for comparing measuring describing and explaining everyday objects and events'});
  assert([...result].length < 70);
  assert(result.endsWith('… | SkillrHub'));
});
