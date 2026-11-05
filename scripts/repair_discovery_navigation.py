#!/usr/bin/env python3
"""Repair the audited HTML discovery gaps without rebuilding lessons.

Dry-run by default. --write changes only owned navigation blocks and their CSS
reference. Existing lesson HTML, metadata, resource links and scripts stay intact.
"""
import argparse
from collections import defaultdict
from html import escape
import json
import re
from discovery_navigation import ROOT, ORIGIN, STYLE, OWNED, Document, graph, inventory, insert_block, subject_hub


def clean(source):
    source = OWNED.sub('', source)
    return source.replace(f'<link rel="stylesheet" href="{STYLE}">', '')


def link(doc, label=None):
    path = doc.url.removeprefix(ORIGIN)
    return f'<a href="/{escape(path, quote=True)}">{escape(label or doc.name)}</a>'


def directory(title, documents, note=''):
    items = ''.join(f'<li>{link(doc)}</li>' for doc in sorted(documents, key=lambda d: d.name.lower()))
    return ('<details class="skillr-discovery-directory"><summary>' + escape(title) + '</summary>'
            + (f'<p>{escape(note)}</p>' if note else '') + '<ul>' + items + '</ul></details>')


def plan(root=ROOT):
    current = inventory(root)
    docs = {url: Document(doc.relative, clean(doc.source)) for url, doc in current.items()}
    lessons = {doc.code: doc for doc in docs.values() if doc.code and doc.indexable}
    code_for_url = {doc.url: code for code, doc in lessons.items()}
    related = json.loads((root / 'data/topic-related-links.json').read_text())
    units = {u['code'].upper(): u for u in json.loads((root / 'data/curriculum-units.json').read_text())['units']}
    blocks = defaultdict(list)
    for code, doc in sorted(lessons.items()):
        links = []
        hub = subject_hub(doc)
        year, subject = doc.relative.split('/')[:2]
        year_label = 'Foundation' if year == 'foundation' else 'Year ' + year[4:]
        subject_label = {'maths': 'Maths', 'english': 'English', 'science': 'Science'}[subject]
        if hub not in doc.links:
            links.append(link(docs[hub], f'All {year_label} {subject_label} topics'))
        # Resolve retired slugs without counting the same lesson twice.
        destinations = doc.links | {docs[target].canonical for target in doc.links if target in docs}
        existing = {code_for_url[target] for target in destinations if target in code_for_url and code_for_url[target] != code}
        if len(existing) < 2:
            if code not in related: raise ValueError(f'{code}: needs reviewed related-lesson choices')
            for target in related[code]:
                if target == code or target not in lessons: raise ValueError(f'{code}: invalid related code {target}')
                if units[code]['subjectSlug'] != units[target]['subjectSlug'] or abs(units[code]['yearNumber'] - units[target]['yearNumber']) > 1:
                    raise ValueError(f'{code}: related lesson outside the reviewed subject/year range')
                if target not in existing:
                    links.append(link(lessons[target]))
                    existing.add(target)
                if len(existing) >= 2: break
            if len(existing) < 2: raise ValueError(f'{code}: insufficient related lessons')
        for path, label in [('about.html', 'About SkillrHub'), ('editorial-standards.html', 'Editorial standards')]:
            if ORIGIN + path not in doc.links: links.append(link(docs[ORIGIN + path], label))
        if links:
            blocks[doc.url].append('<nav class="skillr-discovery-links" aria-label="Related learning and site information">' + ''.join(links) + '</nav>')

    # Existing public product guides supplement the current TpT catalogue. This
    # adds no prices, availability promises, purchase flows or new product pages.
    products = [d for d in docs.values() if d.indexable and d.relative.startswith('products/') and d.relative != 'products/index.html']
    active = json.loads((root / 'data/tpt-active-product-inventory.json').read_text())['products']
    markets = {str(p['productId']): p.get('market') for p in active}
    groups = defaultdict(list)
    for doc in products:
        product_id = doc.relative.split('/')[1].removeprefix('tpt-')
        market = markets.get(product_id)
        is_us = market == 'us' or (market != 'au' and bool(re.search(r'\b(?:grade|kindergarten|CCSS|Common Core|\d(?:st|nd|rd|th) Grade)\b', doc.name, re.I)))
        year = re.search(r'\b(?:Year|Grade)\s+(\d+)', doc.name, re.I)
        year_label = ('Grade ' if is_us else 'Year ') + year.group(1) if year else ('Kindergarten' if is_us and 'kindergarten' in doc.name.lower() else 'Foundation' if not is_us and 'foundation' in doc.name.lower() else 'More guides')
        groups[('US resources' if is_us else 'Australian resources', year_label)].append(doc)
    product_body = ''.join(directory(market + ' · ' + year, group) for (market, year), group in sorted(groups.items()))
    blocks[ORIGIN + 'products/'].append('<details class="skillr-discovery-directory"><summary>Explore resource guides</summary><p>Read about each resource’s scope and contents. Check its linked TpT listing for current availability and price.</p>' + product_body + '</details>')
    blocks[ORIGIN + 'products/'].append('<nav class="skillr-discovery-links" aria-label="US resource collection">' + link(docs[ORIGIN + 'us-resources/'], 'Browse US worksheets and teaching slides') + '</nav>')

    # Put supporting activities alongside the subject they teach, rather than
    # attaching a flat SEO link list to the homepage.
    supplements = defaultdict(list)
    for doc in docs.values():
        parts = doc.relative.split('/')
        if doc.indexable and not doc.code and len(parts) >= 3 and re.fullmatch(r'foundation|year\d+', parts[0]) and parts[1] in {'maths', 'science', 'english'}:
            hub = ORIGIN + parts[0] + '/curriculum/' + parts[1] + '/'
            if hub in docs and doc.url not in docs[hub].links: supplements[hub].append(doc)
    for hub, group in supplements.items(): blocks[hub].append(directory('Worksheets and teaching ideas', group))

    teaching = [d for d in docs.values() if d.indexable and d.relative.startswith('teach-and-explain/')]
    blocks[ORIGIN + 'teach-and-explain.html'].append(directory('Teaching resource guides by year', teaching))
    blocks[ORIGIN + 'blogs/'].append(directory('More teaching and learning resources', [docs[ORIGIN + 'foundation/blogs/'], docs[ORIGIN + 'amazon-resources/']]))
    blocks[ORIGIN + 'contact.html'].append('<nav class="skillr-discovery-links" aria-label="Custom resource requests">' + link(docs[ORIGIN + 'custom-resources/'], 'Explore custom worksheets, assessments and teaching slides') + '</nav>')
    blocks[ORIGIN + 'homeschooling-australia/'].append('<nav class="skillr-discovery-links" aria-label="Homeschool planning resource">' + link(docs[ORIGIN + 'homeschooling-australia/foundation-year-2-planner-pack/'], 'Foundation–Year 2 homeschool planner pack') + '</nav>')

    updates = {}
    for url, content in blocks.items():
        doc = docs[url]
        output = insert_block(doc.source, doc.relative, ''.join(content))
        if clean(output) != clean(current[url].source): raise ValueError(f'{doc.relative}: non-navigation content changed')
        if output != current[url].source: updates[doc.relative] = output
    return updates


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    updates = plan()
    if args.write:
        for relative, source in updates.items(): (ROOT / relative).write_text(source, encoding='utf-8')
    print(('Updated' if args.write else 'Would update') + f' {len(updates)} pages; lesson content and metadata preserved.')
    if not args.write:
        for relative in sorted(updates): print(relative)


if __name__ == '__main__': main()
