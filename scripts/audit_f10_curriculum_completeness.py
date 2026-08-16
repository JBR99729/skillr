#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import urlsplit
import json, re, sys

ROOT = Path(__file__).resolve().parents[1]
STAGES = ['foundation'] + [f'year{i}' for i in range(1, 11)]
SUBJECTS = ['maths', 'english', 'science']
CODE_RE = re.compile(r'\bAC9[A-Z0-9]+\b', re.I)
RUNTIME_RE = re.compile(r'(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render|foundation-[^"\']*render)\.js', re.I)
LOADING_RE = re.compile(r'id=["\'](?:topicRoot|year\d+Topic|slideRoot)["\'][^>]*>\s*(?:<p[^>]*>)?\s*Loading', re.I)
PUBLIC_DECK_RE = re.compile(r'href=["\'][^"\']+\.(?:pptx|pdf)(?:[?#][^"\']*)?["\']', re.I)
TEACHING_RE = re.compile(r'What students learn|Key concept|Learning intention|Learning goal', re.I)
VIEWER_LINK_RE = re.compile(r'href=["\']([^"\']*(?:teacher-deck|teacher-slides)[^"\']*)["\']', re.I)
RUNTIME_DECK_RE = re.compile(r'(?:teachingSlides|\.slides\.forEach|render.*slide|lower-materials-render|year\d+.*slides\.js|topic-modules-render|lesson-render)', re.I)

def read(path):
    return path.read_text(encoding='utf-8', errors='ignore')

def inventory_codes(stage, subject):
    idx = ROOT / stage / 'curriculum' / subject / 'index.html'
    if not idx.exists():
        return [], f'missing curriculum index: {idx.relative_to(ROOT)}'
    codes = sorted({m.group(0).upper() for m in CODE_RE.finditer(read(idx))})
    return codes, None

def find_topic(stage, subject, code):
    base = ROOT / stage / subject
    if not base.exists():
        return None, 'subject topic root missing'
    prefix = code.lower()
    matches = [d for d in base.iterdir() if d.is_dir() and (d.name.lower() == prefix or d.name.lower().startswith(prefix + '-')) and (d/'index.html').exists()]
    if len(matches) == 1:
        return matches[0], None
    if not matches:
        return None, 'no code-prefixed topic directory with index.html'
    return None, f'ambiguous topic directories: {[d.name for d in matches]}'

def validate_topic(path):
    html = read(path)
    issues = []
    if not re.search(r'<details\b', html, re.I) or not re.search(r'<summary\b', html, re.I):
        issues.append('missing native <details>/<summary> dropdown structure')
    if LOADING_RE.search(html):
        issues.append('runtime Loading shell')
    if RUNTIME_RE.search(html):
        issues.append('depends on curriculum renderer JS')
    visible = re.sub(r'<script[\s\S]*?</script>', '', html, flags=re.I)
    visible = re.sub(r'<style[\s\S]*?</style>', '', visible, flags=re.I)
    if not TEACHING_RE.search(visible):
        issues.append('static teaching content marker missing')
    if PUBLIC_DECK_RE.search(html):
        issues.append('direct PDF/PPTX download link exposed')
    return html, issues

def resolve_viewer(topic_dir, html):
    links = [m.group(1) for m in VIEWER_LINK_RE.finditer(html)]
    links = [x for x in links if not re.search(r'\.(?:pdf|pptx)(?:[?#]|$)', x, re.I)]
    if not links:
        return None, 'no Teacher Slides viewer link'
    href = links[0]
    parts = urlsplit(href)
    p = parts.path
    if p.startswith('/'):
        candidate = ROOT / p.lstrip('/')
    else:
        candidate = topic_dir / p
    if candidate.suffix.lower() == '.html':
        viewer = candidate
    else:
        viewer = candidate / 'index.html'
    try:
        viewer = viewer.resolve()
        viewer.relative_to(ROOT.resolve())
    except Exception:
        return None, f'viewer resolves outside repository: {href}'
    if not viewer.exists():
        return None, f'viewer target missing: {href}'
    return viewer, None

def validate_viewer(path):
    html = read(path)
    issues = []
    if RUNTIME_DECK_RE.search(html):
        issues.append('viewer assembles curriculum slides at runtime')
    if PUBLIC_DECK_RE.search(html) or re.search(r'download\s*=', html, re.I):
        issues.append('viewer exposes PDF/PPTX download')
    if not re.search(r'<img\b[^>]*(?:slide|teacher)', html, re.I) and not re.search(r'data-slide-(?:src|image)', html, re.I):
        issues.append('no pre-rendered slide images detected')
    if not re.search(r'Previous|Next|aria-label=["\']Next slide|data-next-slide', html, re.I):
        issues.append('no page-by-page navigation detected')
    return issues

def source_decks(code):
    c = code.lower()
    out = []
    worksheets = ROOT / 'worksheets'
    if worksheets.exists():
        for p in worksheets.rglob('*'):
            if p.is_file() and p.suffix.lower() in {'.pdf', '.pptx'} and c in p.name.lower() and ('teacher' in p.name.lower() or 'slide' in str(p.parent).lower()):
                out.append(str(p.relative_to(ROOT)))
    return sorted(out)

records = []
meta_issues = []
for stage in STAGES:
    for subject in SUBJECTS:
        codes, err = inventory_codes(stage, subject)
        if err:
            meta_issues.append({'stage': stage, 'subject': subject, 'issue': err})
            continue
        for code in codes:
            rec = {'stage': stage, 'subject': subject, 'code': code, 'topic': None, 'viewer': None, 'source_decks': [], 'issues': []}
            topic, terr = find_topic(stage, subject, code)
            if terr:
                rec['issues'].append('topic: ' + terr)
            else:
                rec['topic'] = str((topic/'index.html').relative_to(ROOT))
                html, topic_issues = validate_topic(topic/'index.html')
                rec['issues'] += ['topic: ' + x for x in topic_issues]
                viewer, verr = resolve_viewer(topic, html)
                if verr:
                    rec['issues'].append('slides: ' + verr)
                else:
                    rec['viewer'] = str(viewer.relative_to(ROOT))
                    rec['issues'] += ['slides: ' + x for x in validate_viewer(viewer)]
            rec['source_decks'] = source_decks(code)
            if not rec['source_decks']:
                rec['issues'].append('slides: no fixed PDF/PPTX source deck found under worksheets')
            records.append(rec)

summary = {
    'curriculum_codes': len(records),
    'valid_topic_guides': sum(1 for r in records if r['topic'] and not any(x.startswith('topic:') for x in r['issues'])),
    'valid_teacher_viewers': sum(1 for r in records if r['viewer'] and not any(x.startswith('slides:') and 'source deck' not in x for x in r['issues'])),
    'codes_with_source_deck': sum(1 for r in records if r['source_decks']),
    'fully_valid': sum(1 for r in records if not r['issues']),
    'invalid_or_missing': sum(1 for r in records if r['issues']),
    'metadata_issues': len(meta_issues),
}
report = {'summary': summary, 'metadata_issues': meta_issues, 'records': records}
out = ROOT / 'tmp' / 'f10-curriculum-completeness-audit.json'
out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps(report, indent=2), encoding='utf-8')

print('F-10 CURRICULUM COMPLETENESS AUDIT')
print(json.dumps(summary, indent=2))
if meta_issues:
    print('\nCURRICULUM INDEX ISSUES')
    for x in meta_issues:
        print(f"- {x['stage']}/{x['subject']}: {x['issue']}")

bad = [r for r in records if r['issues']]
if bad:
    print(f'\nINVALID OR MISSING ({len(bad)})')
    for r in bad:
        print(f"- {r['stage']}/{r['subject']} {r['code']}")
        for issue in r['issues']:
            print(f'    * {issue}')
        if r['source_decks']:
            print('    * source: ' + ', '.join(r['source_decks']))
else:
    print('\nPASS: every indexed F-10 Maths/English/Science curriculum code has a valid static HTML Topic Guide, fixed Teacher Slides viewer, and fixed PDF/PPTX source deck.')

sys.exit(1 if bad or meta_issues else 0)
