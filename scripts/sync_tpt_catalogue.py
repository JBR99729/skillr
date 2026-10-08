"""Sync the shop with a complete, browser-observed TpT store inventory.

Usage: python scripts/sync_tpt_catalogue.py path/to/observed-store.json
This changes catalogue data only; it does not generate curriculum content.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
rows = json.loads(Path(sys.argv[1]).read_text())
assert len({p['productId'] for p in rows}) == len(rows)
catalogue = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
old = {re.search(r'(\d+)$', p['tptUrl'])[1]: p for p in catalogue}
context = json.loads((ROOT / 'data/tpt-resource-context.json').read_text())
codes_by_id = {p['productId']: p['curriculumCodes'] for p in context['products']}
assert set(old) <= {p['productId'] for p in rows}, 'Review removed listings before syncing'
science_codes = ['AC9S1U01', 'AC9S1U02', 'AC9S1U03', 'AC9S1H01'] + [f'AC9S1I0{i}' for i in range(1, 7)]
science_bundles = {
    '17881671': science_codes,
    '17881669': science_codes[:3],
    '17881728': science_codes[4:],
    '17881694': ['AC9S1U01', 'AC9S1I01', 'AC9S1I02'],
    '17881702': ['AC9S1U02', 'AC9S1I03'],
    '17881706': ['AC9S1U03', 'AC9S1I04'],
    '17881716': ['AC9S1H01', 'AC9S1I05', 'AC9S1I06'],
}
math_totals = {
    '17870172': (900,244), '17870089': (360,96),
    '17870120': (120,32), '17870135': (180,48),
    '17870145': (120,32), '17870161': (120,36),
    '17870186': (240,64), '17870205': (240,64),
    '17870215': (240,64), '17870226': (180,52),
}
new_count = 0
inventory = []
for row in rows:
    pid, title, text = row['productId'], row['title'], row['text']
    assert row['url'].startswith('https://www.teacherspayteachers.com/Product/')
    assert row['image'].startswith('https://ecdn.teacherspayteachers.com/')
    free = '\nFREE\n' in text
    prices = re.findall(r'(?:Original Price|Price) \$(\d+\.\d{2})', text)
    assert free or prices, pid
    bundle = 'Bundle' in title
    discount = re.search(r'Save (\d+)%', text)
    regular = '0.00' if free else prices[0]
    # The store's crossed-out bundle price is the sum of individual products.
    # Use explicitly advertised bundle savings; omit uncertain bundle prices.
    price = f'{float(regular) * (1-int(discount[1])/100):.2f}' if bundle and discount else None if bundle else regular
    inventory.append(dict(productId=pid, title=title, url=row['url'], image=row['image'], isBundle=bundle,
                          free=free, price=prices[-1] if prices else '0.00', regularPrice=price,
                          observedAt='2026-10-08'))
    found_codes = re.findall(r'AC9(?:M|E|S)(?:F|\d{1,2})[A-Z]+\d{2}', title+' '+text)
    codes = science_bundles.get(pid, codes_by_id.get(pid, sorted(set(found_codes))))
    if pid == '17593227': codes = ['AC9M3M03', 'AC9M3M04']
    if pid not in old:
        new_count += 1
        year_match = re.search(r'Year (\d+)', title)
        year = int(year_match[1]) if year_match else 0
        subject = 'science' if any(c.startswith('AC9S') for c in codes) or 'Science' in title else 'english' if any(c.startswith('AC9E') for c in codes) or any(w in title for w in ['Reading', 'English']) else 'maths'
        resource_type = 'bundle' if bundle else 'teaching-slides' if re.search(r'\b(?:slides?|PowerPoint|presentation)\b', title+' '+text, re.I) and 'Worksheets' not in title or pid in ('17730055', '17842866') else 'worksheet'
        body = text.split('Skillrhub\n', 1)[1] if 'Skillrhub\n' in text else title
        sentences = re.findall(r'.*?[.!?](?:\s|$)', body[:600])
        description = ' '.join(s.strip() for s in sentences[:2]) or title+'. Preview the resource on Teachers Pay Teachers.'
        p = dict(id='tpt-'+pid, title=title, year=year, yearLabel='Foundation' if year==0 else f'Year {year}',
                 subject=subject, subjectLabel={'science':'Science','english':'English','maths':'Maths'}[subject],
                 topics=sorted(set(re.findall(r'[a-z]{3,}', title.lower()))), curriculumCodes=codes,
                 description=description, url=f'/products/tpt-{pid}/', image=row['image'], currency='USD',
                 available=True, resourceType=resource_type, tptUrl=row['url'])
        catalogue.append(p)
    else:
        p = old[pid]
    p.update(title=title, tptUrl=row['url'], free=free, tptObservedAt='2026-10-08')
    if not p['url'].startswith('/'):
        p['url'] = f"/products/{p['id']}/"
    if price is None:
        p.pop('price', None)
    else:
        p['price'] = price
    if bundle:
        p['listPrice'] = regular
        p['bundleFormat'] = 'teaching-slides' if 'Slides' in title and pid not in science_bundles else 'worksheet'
        pack_count = re.search(r'Bundle \((\d+) products\)', text)
        if pack_count: p['packCount'] = int(pack_count[1])
    if pid in math_totals:
        practice, test = math_totals[pid]
        p.update(practiceQuestions=practice, testQuestions=test, totalQuestions=practice+test)
        savings = 20 if pid == '17870172' else 10
        p['description'] = f"{p['packCount']} complete Year 1 Maths worksheet packs with {practice+test:,} questions: {practice} practice + {test} separate test questions. Strands → Practice → Test, with vocabulary, teacher guidance and answer keys. Save {savings}% compared with the included resources purchased separately."
        p['includes'] = [f"{practice} practice questions", f"{test} separate test questions", 'Strands → Practice → Test structure', 'Teacher guidance and complete answer keys']
    if p.get('resourceType') in ('teaching-slides','teaching-sample'):
        p.setdefault('includes', ['Teaching resource; preview the complete contents on TpT'])
        p.setdefault('learningGoals', ['Explore '+title.split('|')[0].strip()])
        p.setdefault('format', 'See the TpT listing for file format and full contents')
    local_cover = ROOT / f'assets/tpt-{pid}-cover.png'
    if local_cover.exists(): p['image'] = '/assets/'+local_cover.name
    elif p['image'].startswith('/') and not (ROOT/p['image'].lstrip('/')).exists():
        repaired = p['image'].replace('.jpg', '.png')
        p['image'] = repaired if (ROOT/repaired.lstrip('/')).exists() else row['image']
    if pid in science_bundles: p['curriculumCodes'] = codes
    if pid == '17593227': p['curriculumCodes'] = codes

(ROOT / 'data/print-and-go-products.json').write_text(json.dumps(catalogue, ensure_ascii=False, indent=2)+'\n')
(ROOT / 'data/tpt-active-product-inventory.json').write_text(json.dumps(dict(auditedAt='2026-10-08', storefront='https://www.teacherspayteachers.com/store/skillrhub', activeProductCount=len(rows), products=inventory), ensure_ascii=False, indent=2)+'\n')
(ROOT / 'data/tpt-observed-listings.tsv').write_text('\n'.join(p['title']+'\t'+p['url'].split('/Product/')[1] for p in rows)+'\n')
print(f'Added {new_count} listings; synced {len(catalogue)} unique catalogue entries.')
