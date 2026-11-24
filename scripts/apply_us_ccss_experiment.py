#!/usr/bin/env python3
"""Apply the registered 16-page CCSS pilot; leave all controls untouched."""
import argparse
import html
import json
import re

from update_topic_learning_seo import ROOT, CCSS_EXPERIMENT, metadata

MARKER = r'<!-- us-ccss-reference:start -->[\s\S]*?<!-- us-ccss-reference:end -->'
PRIMARY = r'(<script\b(?=[^>]*\bid="skillrhub-learning-resource-jsonld")[^>]*>)([\s\S]*?)(</script>)'


def alignment(profile):
    full_code = ('CCSS.ELA-Literacy.' if profile['code'].startswith('AC9E') else 'CCSS.Math.Content.') + profile['standard']
    return {
        '@type': 'AlignmentObject',
        'alignmentType': 'educationalSubject',
        'educationalFramework': profile['framework'],
        'targetName': full_code,
        'targetDescription': profile['skill'],
        'targetUrl': profile['url'],
        'description': 'Related US ' + profile['grade'] + ' skill; selected support. ' + profile['scope'],
    }


def update(source, unit, profile):
    code = unit['code']
    assert profile['path'] == unit['url'].strip('/') + '/index.html', code
    source = metadata(source, unit)

    def schema(match):
        obj = json.loads(match[2])
        assert obj.get('@id') == 'https://skillrhub.com' + unit['url'] + '#learning-resource', code
        old = obj.get('educationalAlignment', [])
        entries = old if isinstance(old, list) else [old]
        new = alignment(profile)
        entries = [entry for entry in entries if not (entry.get('targetName') == new['targetName'] and entry.get('targetUrl') == new['targetUrl'])]
        entries.append(new)
        obj['educationalAlignment'] = entries
        pretty = '\n' in match[2].strip()
        encoded = json.dumps(obj, ensure_ascii=False, indent=2 if pretty else None,
                             separators=None if pretty else (',', ':')).replace('</', '<\\/')
        return match[1] + ('\n' if pretty else '') + encoded + ('\n' if pretty else '') + match[3]

    source, count = re.subn(PRIMARY, schema, source, flags=re.S)
    assert count == 1, (code, 'Primary LearningResource missing or duplicated')
    block = (
        '<!-- us-ccss-reference:start --><p class="us-ccss-reference">'
        '<strong>Related US skill · ' + html.escape(profile['grade']) + ':</strong> '
        '<a href="' + html.escape(profile['url'], quote=True) + '">CCSS '
        + html.escape(profile['standard']) + '</a> — ' + html.escape(profile['skill']) + '. '
        + html.escape(profile['scope']) + ' This is selected support, not a claim of full US standard or grade coverage.'
        '</p><!-- us-ccss-reference:end -->'
    )
    if re.search(MARKER, source):
        return re.sub(MARKER, lambda _: block, source)
    pattern = (r'(<details\b[^>]*\bid=["\']resource-review-' + re.escape(code)
               + r'["\'][^>]*>[\s\S]*?<div\b[^>]*class=["\']curriculum-detail-body["\'][^>]*>)')
    source, count = re.subn(pattern, lambda match: match[1] + block, source, count=1)
    assert count == 1, (code, 'Existing resource disclosure missing')
    return source


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    assert CCSS_EXPERIMENT['status'] == 'active'
    units = {unit['code']: unit for unit in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    changed = []
    for profile in CCSS_EXPERIMENT['treatments']:
        path = ROOT / profile['path']
        source = path.read_text()
        after = update(source, units[profile['code']], profile)
        if source != after:
            changed.append(profile['code'])
            if not args.check:
                path.write_text(after)
    print(json.dumps({'treatment_pages': 16, 'updated' if not args.check else 'needing_update': len(changed), 'codes': changed}))
    if args.check and changed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
