// Keep search titles concise; full product names and pack contents stay visible.
function productSeoTitle(product) {
  const raw = (product.seoTitle || `${product.title} | SkillrHub`).replace(/\s+/g, ' ').trim();
  if ([...raw].length < 70) return raw;
  const parts = raw.split(/\s*\|\s*/).filter(x => !/^SkillrHub$/i.test(x));
  let core = parts[0].replace(/\s+\d+-Day\b/gi, '').replace(/Worksheets and Test/gi, 'Worksheets & Test');
  const part = raw.match(/\bPart\s+\d+\b/i)?.[0];
  if (part && !core.includes(part)) core += ` ${part}`;
  const code = raw.match(/\bAC9[A-Z0-9]+(?:[-–][A-Z0-9]+)?\b/)?.[0];
  const brand = ' | SkillrHub';
  if (code && !core.includes(code) && [...(core + ' | ' + code + brand)].length < 70) {
    return core + ' | ' + code + brand;
  }
  const budget = 69 - [...brand].length;
  if ([...core].length > budget) core = core.replace(/ Worksheets & Test$/, ' Worksheets');
  if ([...core].length > budget) {
    core = [...core].slice(0, budget - 1).join('').replace(/\s+\S*$/, '').replace(/[\s,:;&-]+$/, '') + '…';
  }
  return core + brand;
}
module.exports = {productSeoTitle};
