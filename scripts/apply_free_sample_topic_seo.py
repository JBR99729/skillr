#!/usr/bin/env python3
"""Label only existing topic pages with observed, matching free TpT worksheets."""
import html
import json
import re
import sys
from collections import defaultdict
from build_free_tpt_samples import ROOT, resources
from update_topic_learning_seo import copy_for

MARKER = r'<!-- free-topic-samples:start -->[\s\S]*?<!-- free-topic-samples:end -->'


def targets():
    units = {u['code']: u for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    context = {p['productId']: p for p in json.loads((ROOT / 'data/tpt-resource-context.json').read_text())['products']}
    result = defaultdict(list)
    for p in resources():
        if p['kind'] != 'worksheets':
            continue
        codes = set(p.get('curriculumCodes', [])) | set(context.get(p['listingId'], {}).get('curriculumCodes', []))
        for code in sorted(codes & units.keys()):
            result[code].append(p)
    return {code: (units[code], sorted(rows, key=lambda p: p['listingId'])) for code, rows in sorted(result.items())}


def update(source, unit, rows):
    old_title = html.unescape(re.search(r'<title>(.*?)</title>', source, re.S)[1])
    title, description = copy_for(source, unit, sample=True)
    source = re.sub(r'<title>.*?</title>', '<title>' + html.escape(title) + '</title>', source, count=1, flags=re.S)
    def meta(m):
        tag = m[0]
        key = re.search(r'(?:name|property)=[\"\']([^\"\']+)', tag, re.I)
        if key and key[1] in ('description', 'og:description', 'twitter:description', 'og:title', 'twitter:title'):
            value = title if key[1].endswith(':title') else description
            tag = re.sub(r'content=([\"\']).*?\1', lambda _: 'content="' + html.escape(value, quote=True) + '"', tag, flags=re.S)
        return tag
    source = re.sub(r'<meta\b[^>]*>', meta, source, flags=re.I)
    # Keep authored heading, teaching sections and all existing actions intact.
    links = ' · '.join('<a href="' + html.escape(p['tptUrl'], quote=True) + '" target="_blank" rel="noopener noreferrer" data-free-tpt-sample="' + p['listingId'] + '">Get free sample worksheet: ' + html.escape(p['title']) + ' ↗</a>' for p in rows)
    block = '<!-- free-topic-samples:start --><p class="free-topic-samples"><strong>Free sample worksheet available on TpT.</strong> ' + links + ' TpT requires an account to download. Complete paid packs are optional.</p><!-- free-topic-samples:end -->'
    learning_path = next((p['topicLearningPath'] for p in rows if p.get('topicLearningPath')), None)
    if learning_path:
        block = block.replace('<!-- free-topic-samples:end -->', '<p class="free-topic-learning-path">' + html.escape(learning_path) + '</p><!-- free-topic-samples:end -->')
    if re.search(MARKER, source):
        source = re.sub(MARKER, lambda _: block, source)
    else:
        source, count = re.subn(r'(<h1\b[^>]*>[\s\S]*?</h1>\s*<p\b[^>]*>[\s\S]*?</p>)', lambda m: m[1] + block, source, count=1)
        assert count == 1, unit['code']
    canonical = 'https://skillrhub.com' + unit['url']
    def schema(m):
        obj = json.loads(m[2])
        original = json.dumps(obj, sort_keys=True)
        def visit(value):
            if isinstance(value, list):
                for x in value: visit(x)
            elif isinstance(value, dict):
                if value.get('@type') == 'LearningResource' and value.get('url') == canonical and not str(value.get('@id', '')).endswith('#curriculum-equivalents'):
                    if 'description' in value: value['description'] = description
                    if value.get('name') == old_title: value['name'] = title
                for x in value.values(): visit(x)
        visit(obj)
        if 'id="skillrhub-learning-resource-jsonld"' in m[1]:
            parts = obj.setdefault('hasPart', [])
            urls = {p['tptUrl'] for p in rows}
            parts[:] = [p for p in parts if p.get('url') not in urls]
            parts.extend({'@type': 'LearningResource', 'name': p['title'], 'url': p['tptUrl'], 'learningResourceType': 'Free sample worksheet', 'isAccessibleForFree': True} for p in rows)
        if json.dumps(obj, sort_keys=True) == original:
            return m[0]
        pretty = '\n' in m[2].strip()
        encoded = json.dumps(obj, ensure_ascii=False, indent=2 if pretty else None, separators=None if pretty else (',', ':')).replace('</', '<\\/')
        return m[1] + ('\n' if pretty else '') + encoded + ('\n' if pretty else '') + m[3]
    source = re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)([\s\S]*?)(</script>)', schema, source, flags=re.S)
    return source


def main():
    changed = 0
    for code, (unit, rows) in targets().items():
        path = ROOT / unit['url'].strip('/') / 'index.html'
        before = path.read_text(); after = update(before, unit, rows)
        if '--check' in sys.argv:
            assert before == after, 'Stale free sample SEO: ' + code
        elif before != after:
            path.write_text(after); changed += 1
    print(f'{len(targets())} verified topic pages; {changed} updated')


if __name__ == '__main__':
    main()
