#!/usr/bin/env python3
"""Maintain a small, observed-free TpT selection on the existing worksheet hub."""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SELECTED = ['17881847', '17881887', '17273749', '17592010',
            '17492537', '18139845', '17526065', '17881935']
MARKER = r'<!-- free-tpt-samples:start -->[\s\S]*?<!-- free-tpt-samples:end -->'


def build():
    products = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
    observed = json.loads((ROOT / 'data/tpt-active-product-inventory.json').read_text())
    listings = {p['productId']: p for p in observed['products']}
    catalogue = {re.search(r'-(\d+)$', p['tptUrl']).group(1): p for p in products}
    units = json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']
    lessons = {u['code']: u['url'] for u in units}
    cards = []
    for pid in SELECTED:
        listing, p = listings[pid], catalogue[pid]
        assert listing.get('price') == '0.00', f'{pid}: no observed free price'
        assert p.get('available') and p.get('market') == 'au' and p.get('hasPrintables')
        assert listing['url'] == p['tptUrl'], f'{pid}: listing URL mismatch'
        code = next(c for c in p['curriculumCodes'] if c in lessons)
        e = html.escape
        cards.append(f'''<article class="worksheet-year-card"><p class="eyebrow">{e(p['yearLabel'])} · {e(p['subjectLabel'])} · {e(code)}</p><h3>{e(p['title'])}</h3><p>{e(p['description'])}</p><div class="worksheet-resource-actions"><a href="{e(listing['url'], quote=True)}" target="_blank" rel="noopener noreferrer" data-free-tpt-sample="{pid}">Get free worksheet on TpT ↗</a><a href="{e(lessons[code], quote=True)}">Read the free topic guide</a></div></article>''')
    return '''<!-- free-tpt-samples:start --><section class="content-section" id="free-tpt-samples" aria-labelledby="free-samples-heading"><p class="eyebrow">Try before choosing a pack</p><h2 id="free-samples-heading">Free Australian Curriculum worksheets on TpT</h2><p>Start with a free SkillrHub worksheet for the skill your child is learning. These are separately listed free resources on Teachers Pay Teachers, not the complete paid packs. Open the listing to check the included pages, answers and current availability; a TpT account may be required to download.</p><p>Prefer online practice? <a href="https://app.skillrhub.com/?try=1">Try free practice in the app</a>. The free topic guides below explain each skill before you practise.</p><div class="worksheet-year-grid">''' + '\n'.join(cards) + '''</div><p><a href="https://www.teacherspayteachers.com/store/skillrhub/free" target="_blank" rel="noopener noreferrer">Browse more free SkillrHub resources on TpT ↗</a> · <a href="#worksheets-heading">Browse complete paid worksheet packs</a></p></section><!-- free-tpt-samples:end -->'''


def main():
    path = ROOT / 'worksheets/index.html'
    before = path.read_text()
    block = build()
    if re.search(MARKER, before):
        after = re.sub(MARKER, lambda _: block, before)
    else:
        anchor = '    <section class="content-section" aria-labelledby="worksheets-heading">'
        assert before.count(anchor) == 1
        after = before.replace(anchor, block + '\n\n' + anchor)
    if '--check' in sys.argv:
        assert before == after, 'Free sample directory is stale'
        print('PASS: eight observed-free worksheet listings, exact code links, no duplicate section')
    else:
        path.write_text(after)
        print('Updated existing worksheet hub with eight verified free TpT worksheets')


if __name__ == '__main__':
    main()
