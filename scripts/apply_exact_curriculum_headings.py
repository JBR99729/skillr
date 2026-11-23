#!/usr/bin/env python3
"""Apply the owner's four-page exact curriculum wording pilot without rebuilding."""
import argparse
import html
import json
import re

from update_topic_learning_seo import ROOT, EXACT_CURRICULUM_HEADINGS, CCSS_EXPERIMENT, metadata


def update(source, unit, profile):
    assert profile['path'] == unit['url'].strip('/') + '/index.html', unit['code']
    assert profile['descriptor'] == unit['description'], unit['code']
    assert profile['h1'] == profile['description'] == unit['code'] + ': ' + profile['descriptor']
    headings = list(re.finditer(r'(<h1\b[^>]*>)([\s\S]*?)(</h1>)', source))
    assert len(headings) == 1, (unit['code'], 'Expected one existing H1')
    heading = headings[0]
    existing = html.unescape(re.sub(r'<[^>]+>', '', heading[2]))
    assert existing in (profile['previous_h1'], profile['h1']), unit['code']
    source = source[:heading.start(2)] + html.escape(profile['h1']) + source[heading.end(2):]
    return metadata(source, unit)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    assert not set(EXACT_CURRICULUM_HEADINGS) & {p['code'] for p in CCSS_EXPERIMENT['population']}
    units = {u['code']: u for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    changed = []
    for code, profile in EXACT_CURRICULUM_HEADINGS.items():
        path = ROOT / profile['path']
        before = path.read_text()
        after = update(before, units[code], profile)
        if before != after:
            changed.append(code)
            if not args.check:
                path.write_text(after)
    print(json.dumps({'selected': len(EXACT_CURRICULUM_HEADINGS), 'needing_update' if args.check else 'updated': len(changed), 'codes': changed}))
    if args.check and changed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
