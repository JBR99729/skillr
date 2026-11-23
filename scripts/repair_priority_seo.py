#!/usr/bin/env python3
"""Repair verified product facts, access copy and worksheet activity navigation.

Preserves authored lessons, routes, offers and curriculum availability. Safe to
run after either product builder or the legacy quiz-route maintenance script.
"""
import html
import json
import re
from pathlib import Path
from urllib.parse import urlencode

ROOT = Path(__file__).resolve().parents[1]
ESC = html.escape
ACCESS = ('Topic guides are free to read without an account. Try up to 20 questions a day as a guest, on supported skills. '
          'Create a free parent account to save progress and see the practice options available to your family. No card needed. '
          'Some skills require an account. Paid worksheet packs are optional, separate purchases on Teachers Pay Teachers.')


def listing_body(row):
    return row['text'].split('Created by\nSkillrhub\n', 1)[-1].split('\n')[0].strip()


def listing_description(row):
    # Decimal points (v9.0, 0.25) are not sentence boundaries.
    return ' '.join(re.split(r'(?<=[.!?])\s+(?=[A-Z])', listing_body(row))[:2])


def activity_links(code, banks):
    bank = banks.get(code, {})
    if not bank.get('practice'):
        return '<span class="worksheet-resource-status">Online practice not yet available for this topic</span>'
    query = {'try' if bank.get('guestPractice') else 'login': '1', 'skill': code}
    practice = 'https://app.skillrhub.com/?' + urlencode(query)
    result = '<a href="' + ESC(practice, quote=True) + '">Practise this topic' + ('' if bank.get('guestPractice') else ' (free account)') + ' →</a>'
    if bank.get('assessment'):
        result += '<a href="https://app.skillrhub.com/?assessment=' + code + '">Assessment →</a>'
    return result


def repair_actions(source, banks):
    def group(m):
        code = m[2].upper()
        # Only replace app activity actions; retain guide, slides and paid packs.
        body = re.sub(r'<a\b[^>]*href=["\']https://app\.skillrhub\.com/[^"\']*["\'][^>]*>[\s\S]*?</a>', '', m[3], flags=re.I)
        body = re.sub(r'<span class="worksheet-resource-status">.*?</span>', '', body)
        return m[1] + body + activity_links(code, banks) + m[4]
    return re.sub(r'(<div\b[^>]*class="worksheet-resource-actions"[^>]*aria-label="(AC9[A-Z0-9]+) resources"[^>]*>)([\s\S]*?)(</div>)', group, source)


def product_facts(p, row):
    facts = dict(p.get('verifiedListingFacts', {}))
    body = listing_body(row) if row else ''
    # Do not infer bundle totals or convert a slide count into a page count.
    for key, pattern in [('pages', r'\b(\d+)[- ]page\b'), ('slides', r'\b(\d+)[- ]slides?\b'),
                         ('practiceQuestions', r'\b(\d+)\s+Practice questions\b'),
                         ('testQuestions', r'\b(\d+)[- ]question[^.]{0,40}\bTest\b')]:
        match = re.search(pattern, body + '\n' + p['title'], re.I)
        if match and not p.get('isBundle'):
            facts.setdefault(key, int(match[1]))
    for old, key in [('pageCount', 'pages'), ('slideCount', 'slides'), ('practiceQuestions', 'practiceQuestions'), ('testQuestions', 'testQuestions')]:
        if p.get(old):
            facts.setdefault(key, p[old])
    if re.search(r'\b(?:complete )?answer keys?\b', body, re.I):
        facts.setdefault('answers', 'Answer keys included')
    if re.search(r'\bPDF\b', body):
        facts.setdefault('fileFormat', 'PDF')
    return facts


def product_block(p, source):
    facts = p.get('verifiedListingFacts', {})
    labels = {'pages': 'Pages', 'slides': 'Slides', 'practiceQuestions': 'Practice questions',
              'testQuestions': 'Separate test questions', 'answers': 'Answers', 'fileFormat': 'File format'}
    rows = ''.join('<div><dt>' + labels[k] + '</dt><dd>' + ESC(str(v)) + '</dd></div>' for k, v in facts.items() if k in labels)
    # The supplied format label is authoritative even when no PDF/PPTX claim exists.
    if 'fileFormat' not in facts and p.get('format'):
        rows += '<div><dt>Resource format</dt><dd>' + ESC(p['format']) + '</dd></div>'
    includes = [x for x in p.get('includes', []) if ESC(x) not in source and x not in html.unescape(source)]
    body = '<section class="support product-verified-details" aria-label="Pack contents"><h2>Inside this resource</h2><dl class="product-facts">' + rows + '</dl>'
    if includes:
        body += '<ul>' + ''.join('<li>' + ESC(x) + '</li>' for x in includes) + '</ul>'
    previews = p.get('previewImages', [])
    if previews:
        body += '<h3>Look inside</h3><p>Selected pages from this resource. The complete pack is sold separately.</p><div class="product-page-previews">'
        for image in previews:
            assert (ROOT / image['src'].lstrip('/')).is_file(), image
            body += '<figure><a href="' + ESC(image['src'], quote=True) + '"><img src="' + ESC(image['src'], quote=True) + '" alt="' + ESC(image['alt'], quote=True) + '" width="620" height="877" loading="lazy"></a><figcaption>' + ESC(image['alt']) + '</figcaption></figure>'
        body += '</div>'
    body += '<p><a href="' + ESC(p['tptUrl'], quote=True) + '" target="_blank" rel="noopener noreferrer">View the full preview and current price on TpT →</a></p></section>'
    return '<!-- priority-product-details:start -->' + body + '<!-- priority-product-details:end -->'


def repair_products():
    path = ROOT / 'data/print-and-go-products.json'
    original = path.read_text()
    products = json.loads(original)
    observed = {r['productId']: r for r in json.loads((ROOT / 'data/tpt-observed-store-20261115.json').read_text())['products']}
    changed = 0
    for p in products:
        if not p.get('available'):
            continue
        row = observed.get(p['tptUrl'].rsplit('-', 1)[-1])
        old = p['description']
        if re.match(r'^0\s*[—–-]', old) and row:
            p['description'] = listing_description(row)
        p['verifiedListingFacts'] = product_facts(p, row)
        target = ROOT / p['url'].lstrip('/') / 'index.html'
        if not target.is_file():
            continue
        before = target.read_text(); source = before
        if p['id'] in ('tpt-18319518', 'tpt-18318601'):
            # Assign whole fields once. Replacing a substring twice would also
            # replace the decimal's "0 — CODE" inside the corrected sentence.
            source = re.sub(r'(<meta\b[^>]*(?:name|property)="(?:description|og:description|twitter:description)"[^>]*content=")[^"]*(")',
                            lambda m: m[1] + ESC(p['description'], quote=True) + m[2], source)
            source = re.sub(r'(<h1\b[^>]*>.*?</h1>\s*<p\b[^>]*>).*?(</p>)',
                            lambda m: m[1] + ESC(p['description']) + m[2], source, count=1, flags=re.S)
            def product_schema(m):
                obj = json.loads(m[2]); before_json = json.dumps(obj)
                for node in obj.get('@graph', [obj]):
                    if node.get('@type') == 'Product':
                        node['description'] = p['description']
                return m[0] if before_json == json.dumps(obj) else m[1] + json.dumps(obj, ensure_ascii=False).replace('</', '<\\/') + m[3]
            source = re.sub(r'(<script[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', product_schema, source, flags=re.S)
        source = re.sub(r'<!-- priority-product-details:start -->[\s\S]*?<!-- priority-product-details:end -->', '', source)
        source = source.replace('Free learning stays free', 'Topic guides and online access')
        source = source.replace('SkillrHub’s online lessons, practice and question banks remain free.', 'Topic guides are free to read. Online practice has a free allowance; printable packs are purchased separately. See the access details in our FAQ.')
        block = product_block(p, source)
        if '<section class="support">' in source:
            source = source.replace('<section class="support">', block + '<section class="support">', 1)
        else:
            source = source.replace('</main>', block + '</main>', 1)
        if before != source:
            target.write_text(source); changed += 1
    updated = json.dumps(products, ensure_ascii=False, indent=2) + '\n'
    if json.loads(original) != products:
        path.write_text(updated)
    return changed


def main():
    banks = {b['code']: b for b in json.loads((ROOT / 'data/app-question-banks.json').read_text())['codes']}
    products = repair_products()
    hubs = 0
    for path in (ROOT / 'worksheets').rglob('index.html'):
        before = path.read_text(); after = repair_actions(before, banks)
        if after != before:
            path.write_text(after); hubs += 1
    faq = ROOT / 'faq.html'
    source = faq.read_text()
    answer = ACCESS + ' An account saves online progress in separate learner profiles.'
    source = re.sub(r'(<section[^>]*id="free-practice"[^>]*><h2[^>]*>.*?</h2><p>).*?(</p>)', lambda m: m[1] + answer + m[2], source, flags=re.S)
    def faq_schema(m):
        obj = json.loads(m[2])
        for question in obj.get('mainEntity', []):
            if question.get('name') == 'How does free practice work?':
                question['acceptedAnswer']['text'] = answer
        return m[1] + json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + m[3]
    source = re.sub(r'(<script[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', faq_schema, source, flags=re.S)
    source = source.replace('No. topic guides', 'No. Topic guides')
    faq.write_text(source)
    for name in ['index.html', 'about.html', 'teach/index.html', 'homeschooling-australia/index.html']:
        path = ROOT / name; source = path.read_text()
        block = '<!-- priority-access:start --><details class="support" id="online-access"><summary>What is free on SkillrHub?</summary><p>' + ACCESS + '</p><p><a href="/faq.html#free-practice">Read the access details</a></p></details><!-- priority-access:end -->'
        source = re.sub(r'<!-- priority-access:start -->[\s\S]*?<!-- priority-access:end -->', '', source)
        source = source.replace('</main>', block + '</main>', 1)
        if name == 'index.html':
            source = source.replace('Free parent account</a> · No card needed', 'Free parent account</a> · No card needed · <a href="/faq.html#free-practice">Access details</a>')
            # Repeated maintenance must not duplicate the access link.
            source = source.replace(' · <a href="/faq.html#free-practice">Access details</a> · <a href="/faq.html#free-practice">Access details</a>', ' · <a href="/faq.html#free-practice">Access details</a>')
        path.write_text(source)
    print(json.dumps({'product_pages_updated': products, 'worksheet_hubs_updated': hubs}))


if __name__ == '__main__':
    main()
