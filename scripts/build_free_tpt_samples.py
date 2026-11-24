#!/usr/bin/env python3
"""Build the complete, browser-verified free TpT directory on the worksheet hub."""
import html
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / 'data/tpt-free-resources-20261116.json'
MARKER = r'<!-- free-tpt-samples:start -->[\s\S]*?<!-- free-tpt-samples:end -->'
E = html.escape


def resources():
    catalogue = {re.search(r'-(\d+)$', p['tptUrl']).group(1): p
                 for p in json.loads((ROOT / 'data/print-and-go-products.json').read_text())}
    observed = json.loads(SNAPSHOT.read_text())
    rows = observed['products']
    assert len(rows) == len({r['productId'] for r in rows}) == observed['expectedCount']
    result = []
    for row in rows:
        p = catalogue[row['productId']]
        assert p.get('available') and p['tptUrl'] == row['url']
        assert '\nFREE\n' in row['text'], f"{row['productId']}: missing live FREE label"
        kind = 'slides' if not p.get('hasPrintables') else 'worksheets'
        # The reading starter is explicitly a PowerPoint in its observed listing.
        assert kind == 'worksheets' or re.search(r'slides|PowerPoint', row['text'], re.I)
        result.append(dict(p, title=row['title'], listingId=row['productId'], liveText=row['text'], kind=kind))
    return result


def summary(p):
    body = p['liveText'].split('Created by\nSkillrhub\n', 1)[-1].split('\n')[0]
    sentences = re.findall(r'.+?[.!?](?:\s|$)', body)
    return ' '.join(s.strip() for s in sentences[:2]) or p['description']


def card(p, lessons):
    year = ('Foundation' if p['year'] == 0 else 'Year ' + str(p['year'])) if p['market'] == 'au' else ('Kindergarten' if p['year'] == 0 else 'Grade ' + str(p['year']))
    codes = [c for c in p.get('curriculumCodes', []) if c in lessons] if p['market'] == 'au' else []
    label = year + ' · ' + p['subjectLabel'] + ((' · ' + ', '.join(codes)) if codes else '')
    if codes:
        guide = '<a href="' + E(lessons[codes[0]], quote=True) + '">Read the free topic guide</a>'
    else:
        target = '/learn/?year=' + str(p['year']) + '&subject=' + p['subject'] if p['market'] == 'au' else '/us-resources/'
        guide = '<a href="' + E(target, quote=True) + '">Browse related learning resources</a>'
    action = 'Get free worksheet on TpT' if p['kind'] == 'worksheets' else 'Get free teaching resource on TpT'
    if p.get('topicLearningPath') and p.get('url', '').startswith('/products/'):
        # Newly published samples have real, indexable contents pages as well as
        # the external download. Keep them reachable through native HTML.
        assert (ROOT / p['url'].strip('/') / 'index.html').is_file()
        guide += '<a href="' + E(p['url'], quote=True) + '">See sample contents</a>'
    return f'<article class="worksheet-year-card"><p class="eyebrow">{E(label)}</p><h4>{E(p["title"])}</h4><p>{E(summary(p))}</p><div class="worksheet-resource-actions"><a href="{E(p["tptUrl"], quote=True)}" target="_blank" rel="noopener noreferrer" data-free-tpt-sample="{p["listingId"]}">{action} ↗</a>{guide}</div></article>'


def build():
    items = resources()
    lessons = {u['code']: u['url'] for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    au = [p for p in items if p['kind'] == 'worksheets' and p['market'] == 'au']
    us = [p for p in items if p['kind'] == 'worksheets' and p['market'] == 'us']
    slides = [p for p in items if p['kind'] == 'slides']
    assert len(au) + len(us) + len(slides) == len(items)
    groups = defaultdict(list)
    for p in au:
        groups[p['year']].append(p)
    body = []
    for year, rows in sorted(groups.items()):
        rows.sort(key=lambda p: (p['subject'], p['title']))
        label = 'Foundation' if year == 0 else 'Year ' + str(year)
        body.append(f'<details class="free-sample-year"><summary>{label} · {len(rows)} free worksheet resources</summary><div class="worksheet-year-grid">' + ''.join(card(p, lessons) for p in rows) + '</div></details>')
    return f'''<!-- free-tpt-samples:start --><section class="content-section" id="free-tpt-samples" aria-labelledby="free-samples-heading"><p class="eyebrow">Free resources to start learning</p><h2 id="free-samples-heading">Free worksheets and teaching resources on TpT</h2><p><strong>{len(items)} free SkillrHub resources: {len(au) + len(us)} printable worksheet resources and {len(slides)} teaching resources.</strong> Choose a year and skill, read the matching free topic explanation where available, and download the resource on Teachers Pay Teachers.</p><p>These are separately listed free resources. Complete paid packs are optional and have their own contents. TpT requires an account to download. Free status was checked on 16 November 2026; check the listing for current availability.</p><nav class="worksheet-resource-actions" aria-label="Free resource collections"><a href="#free-worksheets-au">Australian worksheets ({len(au)})</a><a href="#free-worksheets-us">US worksheets ({len(us)})</a><a href="#free-teaching-resources">Teaching resources ({len(slides)})</a></nav><p>Prefer online practice? <a href="https://app.skillrhub.com/?try=1">Try free practice in the app</a>.</p><section id="free-worksheets-au"><h3>Australian Curriculum worksheet resources</h3><p>Open a year level to see its available Maths, English or Science resources. The subjects available vary by year.</p>{''.join(body)}</section><section id="free-worksheets-us"><h3>US worksheet resources</h3><p>These listings are labelled for US grades. Check each resource for its curriculum focus.</p><div class="worksheet-year-grid">{''.join(card(p, lessons) for p in us)}</div></section><section id="free-teaching-resources"><h3>Free teaching slides and reading resources</h3><p>These are teaching resources, separate from the printable worksheet collection above. Check each listing for its file format.</p><div class="worksheet-year-grid">{''.join(card(p, lessons) for p in slides)}</div></section><p><a href="https://www.teacherspayteachers.com/store/skillrhub/free" target="_blank" rel="noopener noreferrer">See all free SkillrHub resources on TpT ↗</a> · <a href="#worksheets-heading">Browse complete paid worksheet packs</a></p></section><!-- free-tpt-samples:end -->'''


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
        assert before == after, 'Free resource directory is stale'
        print(f'PASS: {len(resources())} live-verified free resources, no duplicates')
    else:
        path.write_text(after)
        print(f'Updated worksheet hub with all {len(resources())} verified free resources')


if __name__ == '__main__':
    main()
