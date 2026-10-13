#!/usr/bin/env python3
"""Maintain the owner's 13 Oct 2026 public topic/quiz discovery policy.

Only metadata and existing H1 text change. Redirect aliases, result/review/retake
states, slide viewers and paused drills are not standalone learning destinations.
"""
import argparse
import html
import json
import subprocess
from functools import lru_cache
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://skillrhub.com'
TOPIC = re.compile(r'^(foundation|year(?:[1-9]|10))/(maths|science|english)/(ac9[a-z0-9]+)[^/]*/index\.html$', re.I)
QUIZ = re.compile(r'^quiz/(?:grade-k|year-(?:[1-9]|10))/(?:math|english|science)/(ac9[a-z0-9]+)/(?:((?:practice|test|quiz))/)?index\.html$', re.I)
ROBOTS = re.compile(r'<meta\b(?=[^>]*\bname=["\'](?:robots|googlebot)["\'])[^>]*>', re.I)
CANONICAL = re.compile(r'<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>', re.I)
H1 = re.compile(r'(<h1\b[^>]*>)([\s\S]*?)(</h1>)', re.I)
TITLE = re.compile(r'(<title\b[^>]*>)([\s\S]*?)(</title>)', re.I)
DESC = re.compile(r'(<meta\b[^>]*name=["\']description["\'][^>]*content=)(["\'])(.*?)(\2)', re.I)

def clean(source):
    return re.sub(r'<!--[\s\S]*?-->', '', source)

def eligible(relative, source):
    m = TOPIC.fullmatch(relative) or QUIZ.fullmatch(relative)
    if not m or re.search(r'http-equiv=["\']refresh["\']', clean(source), re.I):
        return None
    code = re.search(r'/((?:ac9)[a-z0-9]+)', relative, re.I).group(1).upper()
    route = '/' + relative[:-len('index.html')]
    if TOPIC.fullmatch(relative):
        tag = CANONICAL.search(clean(source))
        href = re.search(r'href=["\']([^"\']+)', tag.group() if tag else '', re.I)
        if href and urlparse(html.unescape(href.group(1))).path.rstrip('/') != route.rstrip('/'):
            return None
    return code, route

@lru_cache(maxsize=1)
def state_mappings():
    # Use the same curriculum references as the visible topic alignment tables.
    # Relationships are closest/related outcomes, not identical curricula.
    output = subprocess.check_output([
        'node', '--input-type=module', '-e',
        "import { curriculumEquivalents as s } from './scripts/build_curriculum_equivalents.mjs'; console.log(JSON.stringify(s.mappings));"
    ], cwd=ROOT, text=True)
    return json.loads(output)

def state_description(value, code):
    mapping = state_mappings().get(code, {})
    additions = []
    for region, label in [('victoria', 'VIC'), ('nsw', 'NSW')]:
        reference = mapping.get(region, {}).get('code', '')
        # Keep qualifications such as supporting prior-stage alignment.
        codes = re.findall(r'VC2[A-Z0-9]+|(?:MA|EN|SC|ST)[A-Z0-9]*-[A-Z0-9]+(?:-[A-Z0-9]+)+', reference)
        if codes and not all(item in value for item in codes):
            additions.append(label + ' ' + reference.replace(' + ', ' / '))
    if additions:
        value = value.rstrip() + ' Related curriculum: ' + '; '.join(additions) + '.'
    return value

def rewrite(source, code, route):
    # NESA MA1-NSM-01 is mass measurement, not a money outcome.
    if code == 'AC9M1N05':
        source = source.replace('MA1-CSQ-01 / MA1-NSM-01', 'MA1-CSQ-01').replace('MA1-CSQ-01 + MA1-NSM-01', 'MA1-CSQ-01')
    if code == 'AC9M2N06':
        source = source.replace('MA1-CSQ-01 / MA1-FG-01 / MA1-NSM-01', 'MA1-CSQ-01 / MA1-FG-01').replace('MA1-CSQ-01 + MA1-FG-01 + MA1-NSM-01', 'MA1-CSQ-01 + MA1-FG-01')
    # Keep archived recovery comments byte-for-byte intact.
    def metadata_part(text):
        if text.startswith('<!--'):
            return text
        text = ROBOTS.sub('<meta name="robots" content="index, follow">', text)
        text = CANONICAL.sub(f'<link rel="canonical" href="{SITE}{route}">', text)
        def add_code(m):
            if code in html.unescape(re.sub('<[^>]+>', '', m.group(2))).upper():
                return m.group()
            return m.group(1) + m.group(2).rstrip() + ' (' + code + ')' + m.group(3)
        text = TITLE.sub(add_code, text, count=1)
        def concise_title(m):
            value = html.unescape(re.sub('<[^>]+>', '', m.group(2))).strip()
            if len(value) <= 70:
                return m.group()
            mapping = state_mappings().get(code, {})
            topic = mapping.get('title') or value.replace(code, '').split('|')[0].strip(' ():-')
            mode = ' Practice' if '/practice/' in route else ' Test' if '/test/' in route else ' Quiz' if '/quiz/' in route else ''
            suffix = mode + ' | ' + mapping.get('year', '') + ' | ' + code
            budget = 70 - len(suffix)
            if len(topic) > budget:
                topic = topic[:budget + 1].rsplit(' ', 1)[0].rstrip(' ,;:-')
                while topic.split()[-1].lower() in {'and','or','of','for','to','with','in','a','the'}:
                    topic = topic.rsplit(' ', 1)[0]
            return m.group(1) + html.escape(topic + suffix) + m.group(3)
        text = TITLE.sub(concise_title, text, count=1)
        def description(m):
            value = html.unescape(m.group(3))
            if code not in value.upper():
                value = value.rstrip() + f' Australian Curriculum v9 {code}.'
            value = state_description(value, code)
            return m.group(1)+m.group(2)+html.escape(value, quote=True)+m.group(4)
        return DESC.sub(description, text, count=1)
    def head(match):
        return ''.join(metadata_part(x) for x in re.split(r'(<!--[\s\S]*?-->)', match.group()))
    out = re.sub(r'<head\b[^>]*>[\s\S]*?</head>', head, source, count=1, flags=re.I)
    heading_done = False
    def heading_part(text):
        nonlocal heading_done
        if text.startswith('<!--') or heading_done:
            return text
        def heading(m):
            nonlocal heading_done
            heading_done = True
            if code in html.unescape(re.sub('<[^>]+>', '', m.group(2))).upper():
                return m.group()
            return m.group(1) + m.group(2).rstrip() + ' (' + code + ')' + m.group(3)
        return H1.sub(heading, text, count=1)
    out = ''.join(heading_part(x) for x in re.split(r'(<!--[\s\S]*?-->)', out))
    if not ROBOTS.search(clean(out)):
        out = out.replace('</head>', '<meta name="robots" content="index, follow"></head>', 1)
    if not CANONICAL.search(clean(out)):
        out = out.replace('</head>', f'<link rel="canonical" href="{SITE}{route}"></head>', 1)
    return out

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--write',action='store_true');args=parser.parse_args()
    scanned=0;changed=[];unblocked=[]
    for root in ['foundation',*[f'year{i}' for i in range(1,11)],'quiz']:
        for path in sorted((ROOT/root).rglob('index.html')):
            relative=path.relative_to(ROOT).as_posix();source=path.read_text();info=eligible(relative,source)
            if not info:continue
            scanned+=1;out=rewrite(source,*info)
            if out!=source:
                changed.append(relative)
                if any('noindex' in m.group().lower() for m in ROBOTS.finditer(clean(source))):unblocked.append(relative)
                if args.write:path.write_text(out)
    print(f'Public learning discovery: {scanned} pages checked, {len(changed)} changes, {len(unblocked)} indexing blocks removed; write={args.write}')
    if not args.write and changed:
        print('\n'.join(changed[:20]));raise SystemExit(1)

if __name__=='__main__':main()
