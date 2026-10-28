#!/usr/bin/env python3
"""Apply the explicitly selected 48-code search improvement batch.

Run with Beautiful Soup 4 available. This is deliberately a bounded patcher,
not a curriculum generator. Existing teaching, assessments, canonicals, product
claims, and resource destinations are retained.
"""
import argparse
import html
import json
import re
from pathlib import Path

from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'data/seo-priority-48-20261028.json'


def visible(source):
    soup = BeautifulSoup(source, 'html.parser')
    for comment in soup.find_all(string=lambda t: isinstance(t, Comment)):
        comment.extract()
    return soup


def replace_meta(source, key, value):
    pattern = rf'(<meta\b(?=[^>]*\b(?:name|property)=["\']{re.escape(key)}["\'])[^>]*\bcontent=)(["\'])(.*?)\2'
    source, count = re.subn(pattern, lambda m: m[1] + m[2] + html.escape(value, quote=True) + m[2], source, flags=re.S | re.I)
    if count != 1:
        raise ValueError(f'{key}: expected one tag, got {count}')
    return source


def apply(profile, by_code):
    unit = by_code[profile['code']]
    path = ROOT / unit['url'].lstrip('/') / 'index.html'
    before = path.read_text()
    soup = visible(before)
    if not soup.select_one('nav.topic-next, ul.curriculum-related-list') or not soup.select_one('.curriculum-hero__lead'):
        raise ValueError(f'{profile["code"]}: approved static shell missing')
    title = profile['title'] + ' | ' + profile['code']
    description = profile['description']
    after, count = re.subn(r'<title>.*?</title>', '<title>' + html.escape(title) + '</title>', before, count=1, flags=re.S)
    assert count == 1
    for key, value in [('description', description), ('og:title', title), ('og:description', description)]:
        after = replace_meta(after, key, value)
    after, count = re.subn(r'(<p\b[^>]*class=["\'][^"\']*\bcurriculum-hero__lead\b[^"\']*["\'][^>]*>).*?(</p>)', lambda m: m[1] + html.escape(profile['introduction']) + m[2], after, count=1, flags=re.S)
    assert count == 1

    # Make the main LearningResource description match the visible experience.
    # Preserve curriculum-equivalence and product graphs unchanged.
    def ldjson(match):
        obj = json.loads(match[2])
        if obj.get('@type') == 'LearningResource' and obj.get('url') == 'https://skillrhub.com' + unit['url'] and 'educationalAlignment' not in obj:
            obj['name'] = title
            obj['description'] = description
            return match[1] + json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + match[3]
        return match[0]
    after = re.sub(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)', ldjson, after, flags=re.S)

    # Enrich the existing related-learning navigation, keeping all its old links.
    related = []
    current_hrefs = {a.get('href') for a in soup.select('nav.topic-next a, ul.curriculum-related-list a') if not a.has_attr('data-seo-related')}
    for code in profile['related_codes']:
        target = by_code[code]
        if target['url'] not in current_hrefs:
            label = next((p['link_label'] for p in PROFILES if p['code'] == code), None)
            if label is None:
                target_page = visible((ROOT / target['url'].lstrip('/') / 'index.html').read_text())
                label = target['levelLabel'] + ': ' + re.sub(r'\s*\(' + code + r'\)', '', target_page.h1.get_text(' ', strip=True))
            related.append('<a data-seo-related="' + code + '" href="' + target['url'] + '">' + html.escape(label) + ' →</a>')
    def nav(match):
        clean = re.sub(r'<a\b[^>]*data-seo-related=["\'][^"\']+["\'][^>]*>.*?</a>', '', match[2], flags=re.S)
        # A declared owner prevents the shared helper appending competing routes.
        start = match[1]
        if 'data-skillr-learning-path' not in start:
            start = start[:-1] + ' data-skillr-learning-path="true">'
        return start + clean + ''.join(related) + match[3]
    after, count = re.subn(r'(<nav\b[^>]*class=["\'][^"\']*\btopic-next\b[^"\']*["\'][^>]*>)(.*?)(</nav>)', nav, after, count=1, flags=re.S)
    if count == 0:
        def related_list(match):
            clean = re.sub(r'<li><a\b[^>]*data-seo-related=["\'][^"\']+["\'][^>]*>.*?</a></li>', '', match[2], flags=re.S)
            return match[1] + clean + ''.join('<li>' + a + '</li>' for a in related) + match[3]
        after, count = re.subn(r'(<ul\b[^>]*class=["\'][^"\']*\bcurriculum-related-list\b[^"\']*["\'][^>]*>)(.*?)(</ul>)', related_list, after, count=1, flags=re.S)
    assert count == 1

    # The approved Year 1 pattern keeps process notes out of the learner flow.
    # Retain the text in comments for recovery; do not change research status.
    after = re.sub(r'<!-- skillr-source-evidence:start -->(.*?)<!-- skillr-source-evidence:end -->', lambda m: '<!-- Archived source-development notes; retained for recovery.\n' + m[1].replace('--', '—') + '\n-->', after, flags=re.S)
    final = visible(after)
    summary = {
        'code': profile['code'], 'path': str(path.relative_to(ROOT)),
        'title': title,
        'retained_h1': final.h1.get_text(' ', strip=True),
        'headings': [x.get_text(' ', strip=True) for x in final.select('h2, details > summary')],
        'resource_links_preserved': all(a.get('href') in {b.get('href') for b in final.find_all('a')} for a in soup.find_all('a') if not a.has_attr('data-seo-related') and not a.find_parent(class_='source-development-notes')),
        'related_codes': profile['related_codes'],
    }
    if not summary['resource_links_preserved']:
        raise ValueError(f'{profile["code"]}: resource link removed')
    path.write_text(after)
    return summary


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    payload = json.loads(MANIFEST.read_text())
    PROFILES = payload['codes']
    by_code = {u['code']: u for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    assert len(PROFILES) == len({p['code'] for p in PROFILES}) == 48
    if args.check:
        for p in PROFILES:
            s = visible((ROOT / by_code[p['code']]['url'].lstrip('/') / 'index.html').read_text())
            assert s.title.get_text() == p['title'] + ' | ' + p['code']
            assert s.select_one('.curriculum-hero__lead').get_text() == p['introduction']
        print('All 48 selected page titles and introductions match the approved batch.')
    else:
        report = [apply(p, by_code) for p in PROFILES]
        out = ROOT / 'docs/qa/seo-priority-48-20261028-inventory.json'
        out.write_text(json.dumps({'reference': 'docs/year1-topic-page-design-benchmark.md', 'retained_pattern': ['existing optional video', 'short hero and existing product/free-resource card', 'existing section navigation', 'all authored learning focuses, examples, diagrams and answers', 'existing teaching help and same-code resources', 'existing related-learning navigation with contextual topic links', 'contact'], 'pages': report}, indent=2, ensure_ascii=False) + '\n')
        print(f'Prepared {len(report)} selected guides; inventory: {out.relative_to(ROOT)}')
