#!/usr/bin/env python3
"""Retire the old browser-only player without deleting learning/history assets.

The owner authorised the site-wide navigation migration on 2 November 2026.
Only published app codes get a code-specific destination. Unavailable codes and
mixed drills go to the catalogue, never to a different code or a DEV bank.
GitHub Pages has no server redirect rules, so each retained URL has an immediate
HTML redirect and a native fallback link. No old score/query/identity is forwarded.
"""
import argparse
import html
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

ROOT = Path(__file__).resolve().parents[1]
APP = 'https://app.skillrhub.com/'
ARCHIVES = {'backup','reports','exports','docs','tests','scripts','artifacts','screenshots','.github','curriculum-question-banks','node_modules'}
COMMENTS = re.compile(r'(<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?</script>|<style\b[^>]*>[\s\S]*?</style>)',re.I)
ANCHOR = re.compile(r'(<a\b[^>]*>)([\s\S]*?)(</a>)',re.I)
ATTR = re.compile(r'(?P<lead>\b(?:href|action|data-practice-url|data-test-url)\s*=\s*)(?P<q>["\'])(?P<url>.*?)(?P=q)', re.I|re.S)
ABSOLUTE = re.compile(r'https?://(?:www\.)?skillrhub\.com/quiz/[^\s<>"\'\)\]]+', re.I)

def legacy_path(path):
    path = unquote(path)
    if not path.startswith('/quiz/') and path != '/quiz': return False
    parts = path.lower().split('/')
    if any(p in {'worksheet','homework','assets'} for p in parts): return False
    suffix = Path(path).suffix.lower()
    return not suffix or suffix == '.html'

def destination(path, banks):
    if not legacy_path(path): return None
    match = re.search(r'/(ac9[a-z0-9]+)(?:/|$)', unquote(path), re.I)
    code = match[1].upper() if match else None
    bank = banks.get(code)
    if bank and bank.get('practice'):
        return APP + ('?try=1&skill=' if bank.get('guestPractice') else '?login=1&skill=') + code
    return APP

def moved_page(path, banks):
    target = destination('/'+path, banks)
    escaped = html.escape(target, quote=True)
    match = re.search(r'/(ac9[a-z0-9]+)(?:/|$)', '/'+path, re.I)
    code = match[1].upper() if match else ''
    message = ('Continue to the matching practice in the SkillrHub app.' if target != APP
               else 'This older activity has retired. Browse the currently available practice in the SkillrHub app.')
    label = html.escape((' — '+code) if code else '')
    return f'''<!doctype html>
<html lang="en-AU" data-legacy-quiz-retired="2026-11-02"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url={escaped}">
<link rel="canonical" href="{escaped}"><title>Practice has moved{label} | SkillrHub</title>
<style>body{{font-family:Arial,sans-serif;line-height:1.6;max-width:42rem;margin:12vh auto;padding:1.5rem;color:#173968}}a{{display:inline-block;padding:.8rem 1.2rem;background:#173968;color:white;border-radius:.5rem}}</style>
</head><body><main><h1>Continue practising in the SkillrHub app</h1><p>{message}</p>
<a href="{escaped}">Open practice</a></main>
<script>location.replace({json.dumps(target)});</script></body></html>
'''

def rewrite_url(raw, relative, banks):
    value = html.unescape(raw)
    parsed = urlparse(urljoin('https://skillrhub.com/'+relative, value))
    if parsed.netloc.lower() not in {'skillrhub.com','www.skillrhub.com'}: return raw
    target = destination(parsed.path, banks)
    return html.escape(target, quote=True) if target else raw

def rewrite_html(source, relative, banks):
    # Preserve comments, teaching text, diagrams, styles and every non-player link.
    def part(text):
        if text.startswith('<!--') or re.match(r'<(?:script|style)\b',text,re.I): return text
        def anchor(match):
            opening, label, closing = match.groups()
            link = re.search(r'\bhref\s*=\s*(["\'])(.*?)\1',opening,re.I|re.S)
            if link and rewrite_url(link[2],relative,banks)!=link[2]:
                plain=html.unescape(re.sub('<[^>]+>','',label)).strip()
                # Rename action buttons, not linked lesson/card headings.
                if re.fullmatch(r'(?:start |take |open |free |go to )?(?:practice|quiz|test|assessment|retake)(?: now)?\s*[→↗]?',plain,re.I):
                    label='Browse app practice →' if rewrite_url(link[2],relative,banks)==APP else 'Practice now →'
                opening=re.sub(r'aria-label=(["\']).*?\1','aria-label="Open practice in SkillrHub"',opening,flags=re.I)
            return opening+label+closing
        text=ANCHOR.sub(anchor,text)
        return ATTR.sub(lambda m:m['lead']+m['q']+rewrite_url(m['url'],relative,banks)+m['q'],text)
    return ''.join(part(p) for p in COMMENTS.split(source))

def rewrite_json(value, banks):
    if isinstance(value, list): return [rewrite_json(v,banks) for v in value]
    if isinstance(value, dict): return {k:rewrite_json(v,banks) for k,v in value.items()}
    if isinstance(value,str) and (value.startswith('/quiz/') or re.match(r'https?://(?:www\.)?skillrhub\.com/quiz/',value,re.I)):
        parsed=urlparse(urljoin('https://skillrhub.com/',value))
        return destination(parsed.path,banks) or value
    return value

def migrate(root=ROOT, write=False):
    banks={x['code']:x for x in json.loads((root/'data/app-question-banks.json').read_text())['codes']}
    files=subprocess.check_output(['git','ls-files'],cwd=root,text=True).splitlines()
    changes=[]; retired=[]; matched=0
    for relative in files:
        path=root/relative
        if not path.is_file() or relative.split('/')[0] in ARCHIVES: continue
        out=None
        if relative.endswith('.html'):
            source=path.read_text()
            if relative.startswith('quiz/') and legacy_path('/'+relative):
                out=moved_page(relative,banks);retired.append(relative)
                matched+=destination('/'+relative,banks)!=APP
            else: out=rewrite_html(source,relative,banks)
        elif relative.startswith('sitemap') and relative.endswith('.xml'):
            source=path.read_text()
            def sitemap_node(m):
                loc=re.search(r'<loc>(.*?)</loc>',m[0],re.S)
                return '' if loc and legacy_path(urlparse(html.unescape(loc[1])).path) else m[0]
            out=re.sub(r'\s*<url>[\s\S]*?</url>',sitemap_node,source)
        elif relative=='assets/site-search-index.json':
            source=path.read_text();data=json.loads(source)
            data['items']=[item for item in data.get('items',[]) if not legacy_path(urlparse(item.get('u','')).path)]
            if len(data['items'])!=len(json.loads(source).get('items',[])):
                out=json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n'
        elif (relative.startswith('data/') and relative.count('/')==1 or '/' not in relative) and relative.endswith('.json'):
            source=path.read_text();data=json.loads(source);updated=rewrite_json(data,banks)
            if data!=updated:
                def literal(m):
                    # Keep original JSON formatting and keys. Change URL values only.
                    if source[m.end():].lstrip().startswith(':'):return m[0]
                    value=json.loads(m[0]);new=rewrite_json(value,banks)
                    return json.dumps(new,ensure_ascii=False) if new!=value else m[0]
                out=re.sub(r'"(?:[^"\\]|\\.)*"',literal,source)
        elif '/' not in relative and relative.endswith(('.txt','.md')) and (relative.startswith(('llms','ai-'))):
            source=path.read_text()
            out=ABSOLUTE.sub(lambda m:destination(urlparse(m[0].rstrip('.,;')).path,banks) or m[0],source)
        if out is not None and out!=source:
            changes.append(relative)
            if write:path.write_text(out)
    return {'retired_routes':len(retired),'matching_app_routes':matched,'catalogue_routes':len(retired)-matched,'changed':len(changes),'paths':changes}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--write',action='store_true');args=parser.parse_args()
    result=migrate(write=args.write)
    print(json.dumps({k:v for k,v in result.items() if k!='paths'}))
    if result['changed'] and not args.write:raise SystemExit(1)
