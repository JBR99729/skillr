// Retain authored resource links when the existing catalogue maintenance builder runs.
function preserveProductGuideLinks(existing, generated) {
  const block = existing.match(/<!-- skillr-product-guides:start -->[\s\S]*?<!-- skillr-product-guides:end -->/)?.[0];
  if (!block) return generated;
  if (!generated.includes('</main>')) throw new Error('Product template is missing </main>');
  return generated.replace('</main>', block + '</main>');
}
module.exports = { preserveProductGuideLinks };
