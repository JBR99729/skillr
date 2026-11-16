#!/usr/bin/env python3
"""Describe existing free topic examples/practice; preserve access and authored lessons."""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Page-specific copy reviewed against Bing's reported >70-character title warning.
# Preserve unrelated topic titles during this focused maintenance change.
REVIEWED_TITLES = {
    'AC9E4LA10': 'Year 4 Framing, Placement & Salience | Free Examples | AC9E4LA10',
    'AC9E6LA06': 'Year 6 Verbs & Adverb Groups | Free Examples & Practice | AC9E6LA06',
}


def copy_for(source, unit, sample=False):
    old = html.unescape(re.search(r'<title>(.*?)</title>', source, re.S)[1])
    core = re.split(r'\s+\|\s+', old)[0]
    suffix = 'Free Examples, Practice & Sample Worksheet' if sample else 'Free Examples & Practice'
    title = REVIEWED_TITLES.get(unit['code'], core + ' | ' + suffix + ' | ' + unit['code'])
    topic = html.unescape(re.sub('<[^>]+>', '', re.search(r'<h1[^>]*>(.*?)</h1>', source, re.S)[1]))
    year = unit['levelLabel']
    subject = {'maths': 'Maths', 'english': 'English', 'science': 'Science'}[unit['subjectSlug']]
    description = f"Free examples and practice for {year} {subject}: {topic} ({unit['code']})."
    description += ' Free sample worksheet on TpT; account needed to download. Complete paid packs are optional.' if sample else ' Read the topic guide, try learning activities and explore available online practice. Paid worksheet packs are optional.'
    return title, description


def metadata(source, unit, sample=False):
    old_title = html.unescape(re.search(r'<title>(.*?)</title>', source, re.S)[1])
    title, description = copy_for(source, unit, sample)
    source = re.sub(r'<title>.*?</title>', lambda _: '<title>' + html.escape(title) + '</title>', source, count=1, flags=re.S)
    def meta(m):
        tag = m[0]
        key = re.search(r'(?:name|property)=[\"\']([^\"\']+)', tag, re.I)
        if key and key[1] in ('description', 'og:description', 'twitter:description', 'og:title', 'twitter:title'):
            value = title if key[1].endswith(':title') else description
            tag = re.sub(r'content=([\"\']).*?\1', lambda _: 'content="' + html.escape(value, quote=True) + '"', tag, flags=re.S)
        return tag
    source = re.sub(r'<meta\b[^>]*>', meta, source, flags=re.I)
    canonical = 'https://skillrhub.com' + unit['url']
    def schema(m):
        obj = json.loads(m[2]); original = json.dumps(obj, sort_keys=True)
        def visit(value):
            if isinstance(value, list):
                for x in value: visit(x)
            elif isinstance(value, dict):
                if value.get('@type') == 'LearningResource' and value.get('url') == canonical and not str(value.get('@id', '')).endswith('#curriculum-equivalents'):
                    if 'description' in value: value['description'] = description
                    if value.get('name') == old_title: value['name'] = title
                for x in value.values(): visit(x)
        visit(obj)
        if json.dumps(obj, sort_keys=True) == original: return m[0]
        pretty = '\n' in m[2].strip()
        text = json.dumps(obj, ensure_ascii=False, indent=2 if pretty else None, separators=None if pretty else (',', ':')).replace('</', '<\\/')
        return m[1] + ('\n' if pretty else '') + text + ('\n' if pretty else '') + m[3]
    return re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)([\s\S]*?)(</script>)', schema, source, flags=re.S)


def topic_units():
    for original in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']:
        unit = dict(original)
        source = (ROOT / unit['url'].strip('/') / 'index.html').read_text()
        canonical = re.search(r'<link[^>]*rel="canonical"[^>]*href="([^"]+)"', source)
        if canonical and canonical[1].startswith('https://skillrhub.com/'):
            url = canonical[1].removeprefix('https://skillrhub.com')
            assert unit['code'].lower() in url.lower(), (unit['code'], url)
            unit['url'] = url
        yield unit


def main():
    from apply_free_sample_topic_seo import targets, update
    from generate_sitemap import page_title, visible_search_text
    samples = targets(); pages = {}
    for unit in topic_units():
        name = unit['url'].strip('/') + '/index.html'; path = ROOT / name
        before = path.read_text()
        assert re.search('example|worked|try it', before, re.I), unit['code']
        after = update(before, unit, samples[unit['code']][1]) if unit['code'] in samples else metadata(before, unit)
        assert re.findall(r'<meta[^>]*name="robots"[^>]*>', before) == re.findall(r'<meta[^>]*name="robots"[^>]*>', after)
        assert re.findall(r'<link[^>]*rel="canonical"[^>]*>', before) == re.findall(r'<link[^>]*rel="canonical"[^>]*>', after)
        if '--check' in sys.argv: assert before == after, unit['code']
        else: path.write_text(after)
        pages[unit['url']] = (path, after)
    if '--check' not in sys.argv:
        path = ROOT / 'assets/site-search-index.json'; data = json.loads(path.read_text())
        for item in data['items']:
            if item.get('e') or item['u'] not in pages: continue
            page, source = pages[item['u']]
            item['t'] = page_title(source, page); item['x'] = visible_search_text(source)
        path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n')
    print(f'{len(pages)} topic pages: free examples/practice; {len(samples)} with verified free sample worksheets')


if __name__ == '__main__':
    main()

