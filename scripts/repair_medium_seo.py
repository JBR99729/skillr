#!/usr/bin/env python3
"""Synchronize homepage entities and add truthful per-code review attribution.

Only owned metadata blocks are changed; authored lesson HTML is retained byte
for byte. Ledger dates mean the date a review was recorded, not a newly
performed review of the topic guide.
"""
import argparse
import datetime
import html
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HOME_DESCRIPTION = ('Australian Curriculum Maths, English and Science topic guides and online practice, '
                    'with optional paid worksheet packs. Start with free practice.')
REVIEW_BLOCK = re.compile(r'<!-- resource-review:start -->[\s\S]*?<!-- resource-review:end -->\n?')


def ledger_records():
    reviewed = set(json.loads((ROOT / 'data/content-verification-status.json').read_text())['reviewedCodes'])
    history = subprocess.check_output(['git', 'log', '--reverse', '--format=@@REVIEW:%cs:%H', '-p', '--',
                                       'data/content-verification-status.json'], cwd=ROOT, text=True)
    records = {}; date = commit = None
    for line in history.splitlines():
        if line.startswith('@@REVIEW:'):
            _, date, commit = line.split(':')
        elif line.startswith('+') and not line.startswith('+++'):
            for code in re.findall(r'"(AC9[A-Z0-9]+)"', line):
                if code in reviewed:
                    records.setdefault(code, {'recordedAt': date, 'recordedInCommit': commit})
    return {code: records.get(code, {}) for code in sorted(reviewed)}


def review_block(code, records):
    recorded = records.get(code)
    if recorded is None:
        status = '<p>Matching question-bank review: a completed review is not yet recorded for this code.</p>'
    else:
        date = recorded.get('recordedAt')
        when = ''
        if date:
            label = datetime.date.fromisoformat(date).strftime('%d %B %Y').lstrip('0')
            when = ' on <time datetime="' + date + '">' + label + '</time>'
        status = '<p>Matching Practice and Test question-bank review recorded' + when + ' by the SkillrHub content team. This record applies to the question banks.</p>'
    return ('<!-- resource-review:start --><details class="curriculum-topic-section resource-review" id="resource-review-' + code + '">'
            '<summary><strong>About this resource and its review</strong></summary><div class="curriculum-detail-body">'
            '<p>Published and maintained by <a href="/about.html">SkillrHub</a>. Australian Curriculum v9 code: <strong>' + code + '</strong>.</p>'
            + status + '<p><a href="/editorial-standards.html">Read our editorial standards</a> · '
            '<a href="/contact.html#contact-email">Report a correction for ' + code + '</a></p>'
            '</div></details><!-- resource-review:end -->\n')


def homepage(source):
    title = html.unescape(re.search(r'<title>(.*?)</title>', source, re.S)[1])
    source = re.sub(r'(<meta\b[^>]*(?:name|property)="(?:description|og:description|twitter:description)"[^>]*content=")[^"]*(")',
                    lambda m: m[1] + html.escape(HOME_DESCRIPTION, quote=True) + m[2], source)
    def update(m):
        obj = json.loads(m[2]); nodes = obj.get('@graph', [obj])
        for node in nodes:
            if node.get('@type') in ('WebSite', 'WebPage'):
                node['description'] = HOME_DESCRIPTION
            if node.get('@type') == 'WebPage':
                node['name'] = title
                for about in node.get('about', []):
                    if about.get('name') == 'Maths practice':
                        about['name'] = 'Maths, English and Science practice'
        return m[1] + json.dumps(obj, ensure_ascii=False, indent=2).replace('</', '<\\/') + m[3]
    return re.sub(r'(<script\b[^>]*id="skillrhub-site-entity-jsonld"[^>]*>)(.*?)(</script>)', update, source, flags=re.S)


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--check', action='store_true')
    args = parser.parse_args(); records = ledger_records(); changes = []
    targets = [(ROOT / 'index.html', homepage((ROOT / 'index.html').read_text()))]
    units = json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']
    seen = set()
    for unit in units:
        path = ROOT / unit['url'].lstrip('/') / 'index.html'
        source = path.read_text()
        for _ in range(4):
            if '</main>' in source:
                break
            target = re.search(r'<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"', source)
            assert target and urlparse(target[1]).netloc == 'skillrhub.com', unit['code']
            path = ROOT / urlparse(target[1]).path.lstrip('/') / 'index.html'
            assert unit['code'].lower() in str(path).lower(), unit['code']
            source = path.read_text()
        assert path not in seen, str(path)
        seen.add(path)
        retained = REVIEW_BLOCK.sub('', source)
        assert '</main>' in retained, str(path)
        after = retained.replace('</main>', review_block(unit['code'], records) + '</main>', 1)
        assert REVIEW_BLOCK.sub('', after) == retained, ('Lesson content changed', unit['code'])
        targets.append((path, after))
    targets.append((ROOT / 'data/resource-review-records.json', json.dumps({'schemaVersion': 1,
                    'scope': 'Recorded internal Practice/Test question-bank review; not topic-guide certification',
                    'records': records}, ensure_ascii=False, indent=2) + '\n'))
    for path, after in targets:
        before = path.read_text() if path.exists() else None
        if before != after:
            changes.append(str(path.relative_to(ROOT)))
            if not args.check:
                path.write_text(after)
    print(json.dumps({'topic_pages': len(units), 'recorded_reviews': len(records),
                      'changes_required' if args.check else 'updated_files': len(changes), 'examples': changes[:5]}))
    if args.check and changes:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
