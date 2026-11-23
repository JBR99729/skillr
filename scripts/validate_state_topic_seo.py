#!/usr/bin/env python3
"""Compare the bounded regional SEO patch with its complete Git base.

The preservation checks are independent of the patcher: teaching, navigation,
resource actions, script dependencies and existing alignments must match base.
"""
import argparse
from collections import Counter
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'data/state-topic-seo-20261123.json'
STATE_BLOCK = r'<!-- state-curriculum-links:start -->[\s\S]*?<!-- state-curriculum-links:end -->'
JSON_LD = r'(<script\b[^>]*type="application/ld\+json"[^>]*>)([\s\S]*?)(</script>)'
META_KEYS = {'description', 'og:title', 'og:description', 'twitter:title', 'twitter:description'}


class Facts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonicals = []
        self.ids = []
        self.hidden = 0
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            key = attrs.get('name', attrs.get('property'))
            self.meta.setdefault(key, []).append(attrs.get('content'))
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag in ('script', 'style'):
            self.hidden += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden = max(0, self.hidden - 1)

    def handle_data(self, data):
        if not self.hidden:
            self.text.append(data)


def normalised(source, canonical, old_title, new_title):
    source = re.sub(STATE_BLOCK, '', source)
    source = re.sub(r'<title>.*?</title>', '<title>SEO title</title>', source, flags=re.S)

    def meta(match):
        facts = Facts()
        facts.feed(match[0])
        return '' if set(facts.meta) & META_KEYS else match[0]

    source = re.sub(r'<meta\b[^>]*>', meta, source, flags=re.I)

    def schema(match):
        obj = json.loads(match[2])

        def visit(value):
            if isinstance(value, list):
                for item in value:
                    visit(item)
            elif isinstance(value, dict):
                if (value.get('@type') == 'LearningResource'
                        and value.get('url') == canonical
                        and not str(value.get('@id', '')).endswith('#curriculum-equivalents')):
                    if 'description' in value:
                        value['description'] = 'SEO description'
                    if value.get('name') in (old_title, new_title):
                        value['name'] = 'SEO title'
                for item in value.values():
                    visit(item)

        visit(obj)
        return match[1] + json.dumps(obj, sort_keys=True, ensure_ascii=False) + match[3]

    return re.sub(JSON_LD, schema, source, flags=re.S)


def validate(base):
    profiles = json.loads(MANIFEST.read_text())['pages']
    shortlist = json.loads((ROOT / 'data/seo-priority-48-20261028.json').read_text())['codes']
    assert len(profiles) == len({p['code'] for p in profiles}) == 48
    assert {p['code'] for p in profiles} == {p['code'] for p in shortlist}
    assert len({p['title'] for p in profiles}) == len({p['description'] for p in profiles}) == 48
    inventory = ''.join(p.read_text() for p in ROOT.glob('sitemap-*.xml'))
    rows = []
    for profile in profiles:
        code, name = profile['code'], profile['path']
        before = subprocess.check_output(['git', 'show', base + ':' + name], cwd=ROOT, text=True)
        after = (ROOT / name).read_text()
        a, b = Facts(), Facts()
        a.feed(before)
        b.feed(after)
        canonical = 'https://skillrhub.com/' + name.removesuffix('index.html')
        assert a.canonicals == b.canonicals == [canonical], code
        assert a.meta.get('robots') == b.meta.get('robots'), code
        assert not any('noindex' in str(v).lower() for v in b.meta.get('robots', [])), code
        assert canonical in inventory, code
        old_title = html.unescape(re.search(r'<title>(.*?)</title>', before, re.S)[1])
        title = html.unescape(re.search(r'<title>(.*?)</title>', after, re.S)[1])
        assert title == profile['title'] and code in title and 'NSW & VIC Curriculum' in title, code
        assert len(title) <= 70 and 100 <= len(profile['description']) <= 160, code
        for key in META_KEYS:
            if key in a.meta or key == 'description':
                expected = title if key.endswith(':title') else profile['description']
                assert b.meta.get(key) == [expected], (code, key)
        text = ' '.join(b.text)
        assert re.search(r'Victori(?:a|an)', text) and re.search(r'NSW|New South Wales', text), code
        assert Counter(a.ids) == Counter(b.ids), (code, 'Section IDs changed')
        assert len(re.findall(STATE_BLOCK, after)) <= 1, code
        # An exact comparison catches removed examples, headings, disclosures,
        # assets, app routes, samples, product offers and changed state mappings.
        assert normalised(before, canonical, old_title, title) == normalised(after, canonical, old_title, title), (code, 'Unapproved content change')
        rows.append({'code': code, 'path': name, 'sha256': hashlib.sha256(after.encode()).hexdigest(),
                     'title_length': len(title), 'description_length': len(profile['description']),
                     'new_reference_paragraph': bool(re.search(STATE_BLOCK, after)),
                     'teaching_navigation_assets_and_alignments_preserved': True,
                     'indexable_self_canonical_in_sitemap': True})
    return {'base': base, 'passed': len(rows), 'reference': 'docs/year1-topic-page-design-benchmark.md',
            'retained_pattern': ['All existing headings and native disclosure summaries', 'Complete authored teaching, models and answers',
                                 'All existing navigation, matching resource actions and sample/paid offers',
                                 'Unchanged canonical URLs, robots directives, section IDs and state outcome metadata'],
            'pages': rows}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', required=True)
    parser.add_argument('--report')
    args = parser.parse_args()
    report = validate(args.base)
    if args.report:
        (ROOT / args.report).write_text(json.dumps(report, indent=2) + '\n')
    print('PASS: 48 regional SEO pages; exact teaching/navigation/asset/alignment preservation, unique metadata and indexability.')


if __name__ == '__main__':
    main()
