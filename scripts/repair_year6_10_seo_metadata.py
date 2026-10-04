#!/usr/bin/env python3
"""Apply/check scoped SEO copy and Open Graph repairs without changing lesson HTML.

Canonical URLs, curriculum descriptors, JSON-LD, resource links and non-indexable
routes are preserved. Curated topic labels are retained as explicit overrides so
the existing metadata normaliser cannot restore cut-off descriptor fragments.
"""
import argparse
import html
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OVERRIDES = ROOT / 'data/year6-10-seo-metadata.json'
REPORT = ROOT / 'reports/year6-10-seo-metadata-2026-10-04.json'
HEAD = re.compile(r'(<head\b[^>]*>)([\s\S]*?)(</head>)', re.I)
META = re.compile(r'<meta\b[^>]*>', re.I)
TITLE = re.compile(r'<title\b[^>]*>[\s\S]*?</title>', re.I)
ALLOWED = {'description', 'og:title', 'og:description', 'og:url', 'twitter:title', 'twitter:description'}


class Tag(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.attrs = {}
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.attrs = dict(attrs)


def key(tag):
    attrs = Tag(tag).attrs
    return (attrs.get('name') or attrs.get('property') or '').lower()


def values(head):
    return {key(m[0]): Tag(m[0]).attrs.get('content', '') for m in META.finditer(head)}


def set_meta(head, name, value):
    attribute = 'property' if name.startswith('og:') else 'name'
    tag = f'<meta {attribute}="{name}" content="{html.escape(value, quote=True)}">'
    count = 0

    def replace(match):
        nonlocal count
        if key(match[0]) != name:
            return match[0]
        count += 1
        return tag

    out = META.sub(replace, head)
    if count > 1:
        raise ValueError(f'Multiple {name} tags')
    return out if count else out.rstrip() + '\n  ' + tag + '\n'


def neutral(head):
    text = TITLE.sub('', head)
    text = META.sub(lambda m: '' if key(m[0]) in ALLOWED else m[0], text)
    return re.sub(r'\s+', ' ', text).strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    overrides = json.loads(OVERRIDES.read_text())['overrides']
    seen = set()
    changes = []
    counts = Counter()
    scanned = 0
    for year in range(6, 11):
        for page in sorted((ROOT / f'year{year}').rglob('*.html')):
            raw = page.read_text()
            match = HEAD.search(raw)
            if not match:
                continue
            head = match[2]
            meta = values(head)
            if 'noindex' in meta.get('robots', '').lower():
                continue
            relative = page.relative_to(ROOT).as_posix()
            url = 'https://skillrhub.com/' + (relative[:-10] if relative.endswith('index.html') else relative)
            canonical = next((Tag(t[0]).attrs.get('href') for t in re.finditer(r'<link\b[^>]*>', head, re.I) if Tag(t[0]).attrs.get('rel') == 'canonical'), None)
            if canonical != url:
                continue
            scanned += 1
            topic = re.match(r'year\d+/(maths|english|science)/(ac9[a-z0-9]+)[^/]*/index.html$', relative, re.I)
            code = topic[2].upper() if topic else ''
            old_title = html.unescape(re.sub(r'^<title[^>]*>|</title>$', '', TITLE.search(head)[0], flags=re.I))
            title = old_title
            description = meta['description']
            if code in overrides:
                override = overrides[code]
                assert override['url'] == url, (code, url)
                seen.add(code)
                title = override['title']
                description = override['description']
                assert code in title and code in description and len(title) <= 70, code
                for state_code in re.findall(r'\b(?:VC2[A-Z0-9]+|(?:MA|SC|EN)[A-Z0-9-]+)\b', meta['description']):
                    assert state_code in description, (code, state_code)
                head = TITLE.sub(lambda m: f'<title>{html.escape(title, quote=True)}</title>', head, count=1)
                if description != meta['description']:
                    head = set_meta(head, 'description', description)
            for name, value in [('og:title', title), ('og:description', description), ('og:url', url)]:
                if meta.get(name) != value:
                    head = set_meta(head, name, value)
            for name, value in [('twitter:title', title), ('twitter:description', description)]:
                if name in meta and meta[name] != value:
                    head = set_meta(head, name, value)
            assert neutral(match[2]) == neutral(head), relative
            updated = raw[:match.start(2)] + head + raw[match.end(2):]
            if updated != raw:
                changes.append({'path': relative, 'code': code or None, 'year': year,
                                'title_before': old_title, 'title_after': title,
                                'description_before': meta['description'], 'description_after': description,
                                'og_url_added': 'og:url' not in meta})
                counts[year] += 1
                if args.write:
                    page.write_text(updated)
    assert seen == set(overrides), f'Unused overrides: {set(overrides)-seen}'
    result = {'mode': 'write' if args.write else 'check', 'pages_scanned': scanned,
              'pages_changed' if args.write else 'pages_needing_changes': len(changes),
              'by_year': dict(counts), 'curated_topic_overrides': len(overrides),
              'preservation': 'Only HTML head title/description and OG/Twitter metadata changed; complete lesson body, JSON-LD, canonical, robots, resource links and sitemap strategy preserved.',
              'changes': changes}
    if args.write:
        REPORT.write_text(json.dumps(result, indent=2, ensure_ascii=False) + '\n')
    print(json.dumps({k: v for k, v in result.items() if k != 'changes'}, indent=2))
    return 0 if args.write or not changes else 1


if __name__ == '__main__':
    raise SystemExit(main())
