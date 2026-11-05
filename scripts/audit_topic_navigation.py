#!/usr/bin/env python3
"""Source audit: navigation, breadcrumbs and content-review signals.

Signals queue editorial review; they are not Google penalties or teacher QA.
Does not modify website files. Includes noindex pages in navigation coverage,
but reports their findings separately from search-eligible pages.
"""
import argparse
import collections
import json
import re
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from lxml import html

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://skillrhub.com'
TOPIC = re.compile(r'^(foundation|year(?:[1-9]|10))/(maths|science|english)/(ac9[^/]+)/index.html$')
PHRASES = {
    'generic_english_model': 'Explain how the choice shapes meaning, relationship, purpose or reader response',
    'generic_model_answer': 'Use the worked example, name the relevant quantities/features',
    'unsupplied_comparison': 'Show two short versions of the same message',
}

def text(node):
    return ' '.join(' '.join(node.itertext()).split())

def route(path):
    return '/' + path.removesuffix('index.html')

def target(href, current):
    u = urlsplit(urljoin(ORIGIN + route(current), href))
    if u.hostname not in ('skillrhub.com', 'www.skillrhub.com'):
        return None, u
    path = unquote(u.path).lstrip('/')
    file = ROOT / path
    if u.path.endswith('/') or file.is_dir():
        file = file / 'index.html'
    return file, u

def schemas(value):
    if isinstance(value, dict):
        if value.get('@type') == 'BreadcrumbList':
            yield value
        for v in value.values():
            yield from schemas(v)
    elif isinstance(value, list):
        for v in value:
            yield from schemas(v)

def audit():
    pages = []
    for p in sorted(ROOT.rglob('*.html')):
        rel = p.relative_to(ROOT).as_posix()
        if any(part.startswith('.') or part in ('node_modules', 'preview-dist') for part in Path(rel).parts):
            continue
        src = p.read_text(errors='replace')
        try:
            d = html.fromstring(src)
        except (ValueError, html.etree.ParserError):
            continue
        robots = ','.join(d.xpath('//head/meta[translate(@name,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="robots"]/@content')).lower()
        eligible = 'noindex' not in robots and not d.xpath('//head/meta[translate(@http-equiv,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="refresh"]')
        navs = d.xpath('//nav | //*[@role="navigation"]')
        breadcrumbs = [n for n in navs if 'breadcrumb' in (n.get('aria-label','')+' '+n.get('class','')).lower()]
        errors = []
        nav_links = []
        for n in navs:
            for a in n.xpath('.//a[@href]'):
                href = a.get('href')
                file, u = target(href, rel)
                nav_links.append({'text':text(a), 'href':href})
                if file and not file.is_file():
                    errors.append({'kind':'missing_navigation_target','href':href,'label':text(a)})
                elif file and u.fragment and file.suffix == '.html':
                    td = d if file == p else html.parse(str(file))
                    if not td.xpath('//*[@id=$id or @name=$id]', id=unquote(u.fragment)):
                        errors.append({'kind':'missing_navigation_fragment','href':href,'label':text(a)})
        bc_schemas = []
        for script in d.xpath('//script[@type="application/ld+json"]'):
            try:
                bc_schemas.extend(schemas(json.loads(script.text or '')))
            except json.JSONDecodeError:
                errors.append({'kind':'invalid_jsonld'})
        if len(bc_schemas) > 1:
            errors.append({'kind':'multiple_breadcrumb_lists','count':len(bc_schemas)})
        for schema in bc_schemas:
            items = schema.get('itemListElement', [])
            if len(items) < 2 or [x.get('position') for x in items] != list(range(1,len(items)+1)):
                errors.append({'kind':'breadcrumb_positions'})
            for item in items:
                uri = item.get('item')
                if isinstance(uri, dict):
                    uri = uri.get('@id')
                if uri:
                    file, _ = target(uri,rel)
                    if file and not file.is_file():
                        errors.append({'kind':'missing_breadcrumb_schema_target','href':uri})
        match = TOPIC.match(rel)
        row = {'path':rel,'eligible':bool(eligible),'navigation_links':len(nav_links),'visible_breadcrumbs':len(breadcrumbs),'breadcrumb_schemas':len(bc_schemas),'errors':errors}
        if match and eligible:
            year, subject, slug = match.groups()
            code = slug.split('-')[0].upper()
            main = d.xpath('//main')
            body = main[0] if main else d
            # Remove non-text artwork and executable/hidden historical templates.
            body = html.fromstring(html.tostring(body))
            for node in body.xpath('.//script|.//style|.//svg|.//noscript|.//template'):
                node.drop_tree()
            body_text = text(body)
            related = set()
            for href in d.xpath('//a/@href'):
                file,u = target(href,rel)
                if file and file != p and TOPIC.match(file.relative_to(ROOT).as_posix()):
                    target_doc = html.parse(str(file)) if file.exists() else None
                    if target_doc is not None and not any('noindex' in x.lower() for x in target_doc.xpath('//meta[@name="robots"]/@content')):
                        related.add(u.path)
            hub = f'/{year}/curriculum/{subject}/'
            row.update(code=code,subject=subject,year=year,title=d.xpath('string(//head/title)'),h1s=[text(n) for n in d.xpath('//h1')],h2s=len(d.xpath('//h2')),main_words=len(body_text.split()),related=sorted(related),subject_hub_link=any(urlsplit(urljoin(ORIGIN+route(rel),h)).path == hub for h in d.xpath('//a/@href')),review_signals=[k for k,v in PHRASES.items() if v.casefold() in body_text.casefold()])
            if not breadcrumbs:
                row['errors'].append({'kind':'topic_missing_visible_breadcrumb'})
            if not bc_schemas:
                row['errors'].append({'kind':'topic_missing_breadcrumb_schema'})
        pages.append(row)
    topics = [p for p in pages if 'code' in p]
    summary = {'html_pages':len(pages),'eligible_pages':sum(p['eligible'] for p in pages),'active_topics':len(topics),'topics_without_related_links':sum(not p['related'] for p in topics),'topics_with_under_two_related':sum(len(p['related'])<2 for p in topics),'topics_without_subject_hub_link':sum(not p['subject_hub_link'] for p in topics),'topic_review_signals':dict(collections.Counter(k for p in topics for k in p['review_signals'])),'eligible_navigation_findings':dict(collections.Counter(e['kind'] for p in pages if p['eligible'] for e in p['errors'])),'excluded_navigation_findings':dict(collections.Counter(e['kind'] for p in pages if not p['eligible'] for e in p['errors']))}
    return {'summary':summary,'pages':pages}

if __name__ == '__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--output',required=True);args=ap.parse_args()
    result=audit();Path(args.output).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result['summary'],indent=2))
