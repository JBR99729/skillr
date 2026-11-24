#!/usr/bin/env python3
"""Owner-requested topic-specific SEO and AI discovery copy; retain lessons."""
import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import urlparse
from repair_medium_seo import ROOT, REVIEW_BLOCK, HOME_DESCRIPTION, homepage, review_block

SUMMARY = 'Free Australian Curriculum topic guides and worked examples for students, parents and teachers. Practise online, then take a free assessment on the same topic where available. Free printable samples are available for selected topics; complete paid worksheet packs on Teachers Pay Teachers (TpT) are optional.'
ACCESS = 'Topic guides are free without signing in. Online practice and assessments are available only for published banks. On supported skills, guests can try up to 20 practice questions a day. Use a free account to save progress. To take a topic assessment, sign in with a free account, select a learner profile and accept the test rules. Start at https://skillrhub.com/free-k-10-question-bank.html#available-banks and choose the same curriculum code. Check https://skillrhub.com/faq.html#free-practice for access details and https://skillrhub.com/worksheets/#free-tpt-samples for printable samples. TpT requires an account to download its samples; no worksheet purchase is needed for online practice or assessment.'


def pages():
    seen = set()
    for unit in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']:
        path = ROOT / unit['url'].lstrip('/') / 'index.html'
        source = path.read_text()
        for _ in range(4):
            if '</main>' in source:
                break
            target = re.search(r'<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"', source)[1]
            assert urlparse(target).netloc == 'skillrhub.com'
            path = ROOT / urlparse(target).path.lstrip('/') / 'index.html'
            source = path.read_text()
        assert path not in seen and unit['code'].lower() in str(path).lower()
        seen.add(path)
        yield unit, path, source


def topic_description(unit, source, banks):
    topic = html.unescape(re.sub('<[^>]+>', '', re.search(r'<h1\b[^>]*>(.*?)</h1>', source, re.S)[1]))
    topic = re.sub(r'\s+', ' ', topic).strip()
    topic = re.sub(r'\s*\b' + unit['code'] + r'\b', '', topic).strip()
    if len(topic) > 60:
        topic = topic[:60].rsplit(' ', 1)[0].rstrip('.,;:') + '…'
    practice = 'Free practice questions' if banks.get(unit['code'], {}).get('practice') else 'Find available free practice questions'
    return (f'{topic} ({unit["code"]}): Australian Curriculum free learning resources and examples. '
            f'{practice}; save progress with a free account. Optional paid worksheets.')


def metadata(source, description):
    def meta_tag(m):
        if re.search(r'(?:name|property)="(?:description|og:description|twitter:description)"', m[0]):
            return re.sub(r'(content=")[^"]*(")', lambda c: c[1] + html.escape(description, quote=True) + c[2], m[0])
        return m[0]
    source = re.sub(r'<meta\b[^>]*>', meta_tag, source)
    if 'name="twitter:description"' not in source and 'property="twitter:description"' not in source:
        source = source.replace('</head>', '<meta name="twitter:description" content="' + html.escape(description, quote=True) + '">\n</head>', 1)
    def schema(m):
        if 'data-skillr-curriculum-equivalents' in m[1]:
            return m[0]
        obj = json.loads(m[2]); changed = False
        def visit(node):
            nonlocal changed
            if isinstance(node, list):
                for child in node: visit(child)
            elif isinstance(node, dict):
                types = node.get('@type', [])
                if isinstance(types, str): types = [types]
                if set(types) & {'LearningResource', 'WebPage', 'Article'} and 'description' in node:
                    node['description'] = description; changed = True
                for child in node.values():
                    if isinstance(child, (dict, list)): visit(child)
        visit(obj)
        return m[1] + json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + m[3] if changed else m[0]
    return re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', schema, source, flags=re.S)


def ai_copy(source):
    block = '## Learning offer and access\n\n' + SUMMARY + '\n\n' + ACCESS
    pattern = r'^## Learning offer and access\n\n.*?(?=\n+(?:^<!-- free-tpt-resources:start -->|^## |\Z))'
    source, count = re.subn(pattern, lambda _: block, source, count=1, flags=re.M | re.S)
    if count:
        return source
    index = source.index('\n## ') + 1 if '\n## ' in source else len(source)
    return source[:index] + block + '\n\n' + source[index:]


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--check', action='store_true'); args = parser.parse_args()
    banks = {x['code']: x for x in json.loads((ROOT / 'data/app-question-banks.json').read_text())['codes']}
    records = json.loads((ROOT / 'data/resource-review-records.json').read_text())['records']
    targets = []
    for unit, path, source in pages():
        after = metadata(source, topic_description(unit, source, banks))
        assert len(REVIEW_BLOCK.findall(after)) == 1
        after = REVIEW_BLOCK.sub(lambda _: review_block(unit['code'], records), after)
        assert REVIEW_BLOCK.sub('', after.split('</head>', 1)[1]) == REVIEW_BLOCK.sub('', source.split('</head>', 1)[1]), path
        targets.append((path, after))
    targets.append((ROOT / 'index.html', homepage((ROOT / 'index.html').read_text())))
    for name in ['llms.txt', 'llms-full.txt']:
        targets.append((ROOT / name, ai_copy((ROOT / name).read_text())))
    changed = []
    for path, after in targets:
        if path.read_text() != after:
            changed.append(str(path.relative_to(ROOT)))
            if not args.check: path.write_text(after)
    print(json.dumps({'canonical_topics': len(targets)-3, 'changed_files': len(changed), 'examples': changed[:3]}))
    if args.check and changed: raise SystemExit(1)


if __name__ == '__main__': main()
