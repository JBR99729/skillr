#!/usr/bin/env python3
"""Verify the registered CCSS treatment and exact preservation of 32 controls/holdouts."""
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
MARKER = r'<!-- us-ccss-reference:start -->[\s\S]*?<!-- us-ccss-reference:end -->'
JSON_LD = r'(<script\b[^>]*type="application/ld\+json"[^>]*>)([\s\S]*?)(</script>)'
DESCRIPTION_KEYS = {'description', 'og:description', 'twitter:description'}


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.ids = []
        self.canonical = []
        self.hidden = 0
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            self.meta.setdefault(attrs.get('name', attrs.get('property')), []).append(attrs.get('content'))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href'))
        if tag in ('script', 'style'):
            self.hidden += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden = max(0, self.hidden - 1)

    def handle_data(self, data):
        if not self.hidden:
            self.text.append(data)


def primary(source):
    pattern = r'<script\b(?=[^>]*\bid="skillrhub-learning-resource-jsonld")[^>]*>([\s\S]*?)</script>'
    matches = re.findall(pattern, source)
    assert len(matches) == 1
    return json.loads(matches[0])


def normalised(source, canonical, original_alignment):
    source = re.sub(MARKER, '', source)

    def meta(match):
        parsed = Page()
        parsed.feed(match[0])
        return '' if set(parsed.meta) & DESCRIPTION_KEYS else match[0]

    source = re.sub(r'<meta\b[^>]*>', meta, source, flags=re.I)

    def schema(match):
        obj = json.loads(match[2])
        if 'id="skillrhub-learning-resource-jsonld"' in match[1]:
            obj['educationalAlignment'] = original_alignment

        def visit(value):
            if isinstance(value, list):
                for item in value:
                    visit(item)
            elif isinstance(value, dict):
                if (value.get('@type') == 'LearningResource' and value.get('url') == canonical
                        and not str(value.get('@id', '')).endswith('#curriculum-equivalents')
                        and 'description' in value):
                    value['description'] = 'SEO description'
                for item in value.values():
                    visit(item)

        visit(obj)
        return match[1] + json.dumps(obj, sort_keys=True, ensure_ascii=False) + match[3]

    return re.sub(JSON_LD, schema, source, flags=re.S)


def validate():
    experiment = json.loads((ROOT / 'data/us-ccss-experiment-20261123.json').read_text())
    regional = json.loads((ROOT / 'data/state-topic-seo-20261123.json').read_text())['pages']
    population = experiment['population']
    treatments = {p['code']: p for p in experiment['treatments']}
    assert len(population) == len({p['code'] for p in population}) == 48
    assert {p['code'] for p in population} == {p['code'] for p in regional}
    assert Counter(p['arm'] for p in population) == {'treatment': 16, 'control': 16, 'held_out': 16}
    assert set(treatments) == {p['code'] for p in population if p['arm'] == 'treatment'}
    for pair in experiment['pairs']:
        expected = sorted((pair['treatment'], pair['control']),
                          key=lambda code: hashlib.sha256((experiment['allocation_seed'] + ':' + code).encode()).hexdigest())
        assert expected[0] == pair['treatment']
    assert len(experiment['pairs']) == 16
    assert len({p['description'] for p in treatments.values()}) == 16
    inventory = ''.join(p.read_text() for p in ROOT.glob('sitemap-*.xml'))
    rows = []
    for page in population:
        code, path = page['code'], page['path']
        before = subprocess.check_output(['git', 'show', experiment['base_commit'] + ':' + path], cwd=ROOT, text=True)
        assert hashlib.sha256(before.encode()).hexdigest() == page['base_sha256'], code
        after = (ROOT / path).read_text()
        row = dict(code=code, path=path, arm=page['arm'], sha256=hashlib.sha256(after.encode()).hexdigest())
        if page['arm'] != 'treatment':
            assert before == after, (code, 'Control/holdout changed')
            row['byte_identical_to_baseline'] = True
            rows.append(row)
            continue
        profile = treatments[code]
        a, b = Page(), Page()
        a.feed(before)
        b.feed(after)
        title_before = re.search(r'<title>(.*?)</title>', before, re.S)[1]
        assert re.search(r'<title>(.*?)</title>', after, re.S)[1] == title_before, (code, 'Australian title changed')
        canonical = 'https://skillrhub.com/' + path.removesuffix('index.html')
        assert a.canonical == b.canonical == [canonical] and canonical in inventory, code
        assert a.meta.get('robots') == b.meta.get('robots'), code
        assert 'noindex' not in str(b.meta.get('robots', [])).lower(), code
        assert Counter(a.ids) == Counter(b.ids), code
        for key in ('og:title', 'twitter:title'):
            assert a.meta.get(key) == b.meta.get(key), code
        for key in DESCRIPTION_KEYS:
            if key in a.meta:
                assert b.meta.get(key) == [profile['description']], (code, key)
        assert 'NSW/Victorian links' in profile['description'] and len(profile['description']) <= 160
        assert 'related US ' in profile['description'] and 'CCSS ' + profile['standard'] in profile['description']
        assert profile['evidence']['anchor'] in html.unescape(re.sub(r'<[^>]+>', ' ', before)) or profile['evidence']['anchor'] in ' '.join(a.text), code
        blocks = re.findall(MARKER, after)
        assert len(blocks) == 1 and profile['url'] in blocks[0]
        assert html.escape(profile['scope']) in blocks[0] and 'selected support' in blocks[0]
        assert profile['standard'] in ' '.join(b.text), code
        old_alignment = primary(before).get('educationalAlignment', [])
        old_entries = old_alignment if isinstance(old_alignment, list) else [old_alignment]
        new_entries = primary(after)['educationalAlignment']
        assert isinstance(new_entries, list) and len(new_entries) == len(old_entries) + 1, code
        assert new_entries[:-1] == old_entries, (code, 'Existing Australian mapping changed')
        new = new_entries[-1]
        prefix = 'CCSS.ELA-Literacy.' if code.startswith('AC9E') else 'CCSS.Math.Content.'
        assert new == {'@type': 'AlignmentObject', 'alignmentType': 'educationalSubject',
                       'educationalFramework': profile['framework'], 'targetName': prefix + profile['standard'],
                       'targetDescription': profile['skill'], 'targetUrl': profile['url'],
                       'description': 'Related US ' + profile['grade'] + ' skill; selected support. ' + profile['scope']}, code
        # All other HTML and JSON-LD content, including the existing regional
        # equivalence graphs and resource offers, must exactly match baseline.
        assert normalised(before, canonical, old_alignment) == normalised(after, canonical, old_alignment), (code, 'Unapproved change')
        row.update(standard=profile['standard'], scope=profile['scope'], australian_title_and_all_existing_content_preserved=True,
                   indexable_self_canonical_in_sitemap=True)
        rows.append(row)
    return {'base': experiment['base_commit'], 'experiment': experiment['id'], 'passed': 48,
            'treatment': 16, 'controls': 16, 'held_out': 16, 'search_volume_rankings': None,
            'baseline_analytics': 'unavailable, not zero', 'pages': rows}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--report')
    args = parser.parse_args()
    report = validate()
    if args.report:
        (ROOT / args.report).write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print('PASS: 16 bounded CCSS treatments; 32 byte-identical comparison/held-out pages; Australian titles, lessons and indexing preserved.')


if __name__ == '__main__':
    main()
