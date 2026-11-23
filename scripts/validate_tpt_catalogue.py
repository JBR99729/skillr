#!/usr/bin/env python3
"""Validate live-store coverage, curriculum metadata and the no-price policy."""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

from discovery_navigation import ROOT, sitemap_urls

PRICE_KEYS = {'price','listPrice','regularPrice','salePrice','originalPrice','discountPrice','priceCurrency'}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.meta,self.links,self.schemas,self.cards={},[],[],[]
        self.canonical,self.lang,self.title,self.h1='','','',''
        self.in_title,self.in_h1,self.script=False,False,None
        self.price_nodes=0;self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html':self.lang=a.get('lang','')
        if tag=='title':self.in_title=True
        if tag=='h1':self.in_h1=True
        if tag=='meta':self.meta[a.get('name',a.get('property','')).lower()]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
        if tag=='a' and a.get('href'):self.links.append(a['href'])
        if tag=='article' and a.get('data-product-id'):self.cards.append(a['data-product-id'])
        if 'price' in a.get('class','').split() or a.get('itemprop')=='price':self.price_nodes+=1
        if tag=='script' and a.get('type')=='application/ld+json':self.script=[]
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='h1':self.in_h1=False
        if tag=='script' and self.script is not None:self.schemas.append(json.loads(''.join(self.script)));self.script=None
    def handle_data(self,text):
        if self.in_title:self.title+=text
        if self.in_h1:self.h1+=text
        if self.script is not None:self.script.append(text)


def nodes(value):
    if isinstance(value,dict):
        yield value
        for child in value.values():yield from nodes(child)
    elif isinstance(value,list):
        for child in value:yield from nodes(child)


def validate():
    products=json.loads((ROOT/'data/print-and-go-products.json').read_text())
    inventory=json.loads((ROOT/'data/tpt-active-product-inventory.json').read_text())
    stamp=inventory['auditedAt'].replace('-','')
    snapshot=json.loads((ROOT/f'data/tpt-observed-store-{stamp}.json').read_text())
    observed={p['productId']:p for p in snapshot['products']}
    active=[p for p in products if p.get('available')]
    ident=lambda p:re.search(r'-(\d+)$',p['tptUrl'])[1]
    errors=[];sitemap=sitemap_urls();static=[]
    if len(products)!=len({ident(p) for p in products}):errors.append('Duplicate TpT IDs')
    if {ident(p) for p in active}!=set(observed):errors.append('Active catalogue differs from observed store')
    if len(active)!=inventory['activeProductCount'] or len(active)!=snapshot['expectedCount']:errors.append('Inventory count mismatch')
    if any(PRICE_KEYS & p.keys() for p in products):errors.append('Numerical price fields in public catalogue')
    if any(PRICE_KEYS & p.keys() for p in inventory['products']):errors.append('Numerical price fields in current inventory')
    units={u['code']:u for u in json.loads((ROOT/'data/curriculum-units.json').read_text())['units']}
    for p in active:
        row=observed[ident(p)]
        if p['title']!=row['title'] or p['tptUrl']!=row['url'] or p['image']!=row['image'] or p.get('free')!=row['free']:errors.append(p['id']+': stale observed listing facts')
        if p['market']=='us':
            if any(c.startswith('AC9') for c in p.get('curriculumCodes',[])):errors.append(p['id']+': Australian code on US product')
            if re.search(r'Australian|AC9|\bYear\s+\d',p['seoTitle']+' '+p['metaDescription']):errors.append(p['id']+': Australian metadata on US product')
            if not p['yearLabel'].startswith(('Grade ','Kindergarten')):errors.append(p['id']+': wrong US grade label')
        else:
            for c in p.get('curriculumCodes',[]):
                if c in units and (p['year']!=units[c]['yearNumber'] or p['subject']!=units[c]['subjectSlug']):errors.append(p['id']+': curriculum folder mismatch '+c)
        if not (p['url'].startswith('/') and p['url'].endswith('/')):continue
        path=ROOT/p['url'].lstrip('/')/'index.html'
        if not path.is_file():errors.append(p['id']+': missing static product page');continue
        page=Page(path.read_text());static.append((p,page))
        if page.h1!=p['title'] or page.title!=p['seoTitle'] or page.meta.get('description')!=p['metaDescription']:errors.append(p['id']+': page/data metadata mismatch')
        if len(page.title)>=70 or len(page.meta.get('description',''))>159:errors.append(p['id']+': overlong search metadata')
        if page.canonical!='https://skillrhub.com'+p['url'] or page.canonical not in sitemap:errors.append(p['id']+': canonical/sitemap mismatch')
        if 'noindex' in page.meta.get('robots',''):errors.append(p['id']+': active product is noindex')
        if page.lang!=('en-US' if p['market']=='us' else 'en-AU'):errors.append(p['id']+': wrong language locale')
        if p['tptUrl'] not in page.links:errors.append(p['id']+': missing TpT checkout link')
        all_nodes=[n for value in page.schemas for n in nodes(value)]
        resources=[n for n in all_nodes if n.get('@type')=='LearningResource' and n.get('url')==page.canonical]
        crumbs=[n for n in all_nodes if n.get('@type')=='BreadcrumbList']
        if len(resources)!=1 or resources[0].get('sameAs')!=p['tptUrl']:errors.append(p['id']+': missing/mismatched LearningResource')
        if len(crumbs)!=1 or crumbs[0].get('itemListElement',[])[-1].get('name')!=p['title']:errors.append(p['id']+': missing/mismatched breadcrumbs')
        if any(PRICE_KEYS & n.keys() or n.get('@type') in ('Product','Offer','AggregateOffer') for n in all_nodes):errors.append(p['id']+': stale retail/price schema')
        if page.price_nodes or any(k.startswith('product:price') for k in page.meta):errors.append(p['id']+': visible/metadata price remains')
        for href in page.links:
            u=urlsplit(href)
            if href.startswith('/') and not (ROOT/u.path.lstrip('/')).exists():errors.append(p['id']+': missing internal destination '+href)
    duplicates=[t for t,n in Counter(page.title for _,page in static).items() if n>1]
    if duplicates:errors.append('Duplicate product search titles: '+str(duplicates))
    for relative,market,kind in [('products/index.html',None,None),('us-resources/index.html','us',None),('teach-and-explain.html',None,'slides')]:
        page=Page((ROOT/relative).read_text())
        resource_type=lambda p:'bundle' if p.get('isBundle') or p['resourceType']=='bundle' else 'slides' if p.get('hasSlides') or p['resourceType'] in ('teaching-slides','teaching-sample') else 'worksheets'
        expected={ident(p) for p in active if (not market or p['market']==market) and (not kind or resource_type(p)==kind)}
        if len(page.cards)!=len(set(page.cards)) or set(page.cards)!=expected:errors.append(relative+': missing/duplicate folder cards')
        for p,_ in static:
            if ident(p) in expected and p['url'] not in page.links:errors.append(relative+': missing internal product-details link '+p['url'])
    for directory in ['products','print-and-go','teach-and-explain']:
        for path in (ROOT/directory).rglob('*.html'):
            page=Page(path.read_text())
            if page.price_nodes or any(PRICE_KEYS & n.keys() for value in page.schemas for n in nodes(value)):errors.append(str(path.relative_to(ROOT))+': price remains in commerce page')
    free=json.loads((ROOT/'data/tpt-free-resources-20261116.json').read_text())['products']
    if {x['productId'] for x in free}!={ident(p) for p in active if p.get('free')}:errors.append('Verified free collection differs from live free listings')
    print(json.dumps({'activeListings':len(active),'staticProductPages':len(static),'freeSamples':sum(p.get('free',False) for p in active),'activeByMarket':dict(Counter(p['market'] for p in active)),'errors':len(errors)},indent=2))
    for error in errors:print(error)
    return not errors


if __name__=='__main__':raise SystemExit(0 if validate() else 1)
