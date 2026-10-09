"""Add catalogue-backed buying links without regenerating curriculum content."""
import json,re,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
escape=html.escape
products=json.loads((ROOT/'data/print-and-go-products.json').read_text())
if isinstance(products,dict): products=products['products']
units=json.loads((ROOT/'data/curriculum-units.json').read_text())['units']
CSS='<link rel="stylesheet" href="/assets/css/topic-print-options.css">'

def codes(p):
    result=set(c for c in p.get('curriculumCodes',[]) if re.fullmatch(r'AC9[A-Z0-9]+',c))
    # Previously verified full-year workbook coverage (existing resource-context crosswalk).
    if p['id']=='year-2-maths-workbook':
        result.update(u['code'] for u in units if u['yearNumber']==2 and u['subjectSlug']=='maths')
    return result

def category(p):
    title=p['title'].lower()
    if 'full year' in title or 'full-year' in title: return 'year'
    if re.search(r'\bterm\s*[1-4]\b',title): return 'term'
    if p.get('resourceType')=='bundle' or p.get('isBundle'): return 'strand'
    return 'individual'

def link(p,label,cls=''):
    return f'<a class="{cls}" href="{escape(p["tptUrl"],quote=True)}" target="_blank" rel="noopener">{escape(label)} <span aria-hidden="true">↗</span></a>'

def strip(s):
    s=re.sub(r'<!-- skillr-print-options:(?:top|worksheet):start -->.*?<!-- skillr-print-options:(?:top|worksheet):end -->','',s,flags=re.S)
    return s.replace(CSS,'')

rows=[]
for u in units:
    found=[p for p in products if p.get('available') and not p.get('free') and p.get('tptUrl') and p.get('resourceType') in ('worksheet','workbook','unit','assessment-pack','bundle') and u['code'] in codes(p) and p.get('year')==u['yearNumber'] and p.get('subject')==u['subjectSlug']]
    # Slides-only bundles stay in the existing teaching-download section.
    found=[p for p in found if not (category(p)=='strand' and 'slides' in p['title'].lower() and not any(w in p['title'].lower() for w in ('workbook','worksheets')))]
    unique={p['tptUrl'].rsplit('-',1)[-1]:p for p in found}; found=list(unique.values())
    if not found: continue
    path=ROOT/u['url'].strip('/')/'index.html'
    assert path.exists(),path
    original=path.read_text();s=strip(original)
    individuals=sorted([p for p in found if category(p)=='individual'],key=lambda p:(len(codes(p)),p['resourceType']!='worksheet'))
    individual=individuals[0] if individuals else None
    options=[]
    if individual: options.append(link(individual,'Individual worksheet pack','print-options__primary'))
    for p in sorted((p for p in found if category(p)!='individual'),key=lambda p:({'term':0,'year':1,'strand':2}[category(p)],p['title'])):
        kind=category(p)
        label=(re.search(r'Term\s*[1-4]',p['title'],re.I).group(0)+' bundle') if kind=='term' else ('Full-year '+u['subject']+(' workbook' if p['resourceType']=='workbook' else ' bundle')) if kind=='year' else 'Related '+('worksheet bundle' if 'worksheet' in p['title'].lower() else 'workbook & slides bundle' if 'slides' in p['title'].lower() else 'bundle')
        options.append(link(p,label))
    free=u['worksheetUrl']
    top='<!-- skillr-print-options:top:start --><aside class="print-options" aria-label="Print and Go buying options"><p class="print-options__heading">Print &amp; Go: choose your pack</p><p>Start with the <a href="'+escape(free)+'">free printable worksheet</a>, or choose a paid pack for more structured practice.</p><nav class="print-options__links" aria-label="Paid worksheet packs">'+''.join(options)+'</nav>'
    if individual:
        top+='<p class="print-options__detail"><strong>Carefully curated paid pack for '+escape(u['code'])+'.</strong>'+' '+escape(individual.get('description',''))+'</p>'
    top+='<p class="print-options__note">Preview the contents and current price on Teachers Pay Teachers. Choose the individual pack for this topic, or a listed bundle for broader coverage.</p></aside><!-- skillr-print-options:top:end -->'
    # Place the offer near the top; keep the authored lesson and resource flow byte-for-byte.
    anchor=re.search(r'<p class="curriculum-hero__lead">.*?</p>',s,re.S)
    if not anchor:
        anchor=re.search(r'<h1\b[^>]*>.*?</h1>',s,re.S)
    assert anchor,(u['code'],'hero missing')
    s=s[:anchor.end()]+top+s[anchor.end():]
    if individual:
        # Paid link immediately follows the first existing free worksheet resource link.
        matches=list(re.finditer(r'<a\b[^>]*href="(?:https://skillrhub.com)?'+re.escape(free)+r'"[^>]*>.*?</a>',s,re.S))
        matches=[m for m in matches if not s[max(0,m.start()-400):m.start()].endswith('Start with the ')]
        # Explicitly use the preserved resource-actions link, rather than the new offer's free link.
        candidates=[m for m in matches if m.start()>s.index('<!-- skillr-print-options:top:end -->')]
        assert candidates,(u['code'],'free worksheet link missing')
        m=candidates[0]
        paid='<!-- skillr-print-options:worksheet:start -->'+link(individual,'Paid Print & Go pack','print-options__paid-link')+'<!-- skillr-print-options:worksheet:end -->'
        s=s[:m.end()]+paid+s[m.end():]
    s=s.replace('</head>',CSS+'</head>',1)
    assert strip(s)==strip(original),(u['code'],'unexpected curriculum mutation')
    path.write_text(s)
    rows.append({'code':u['code'],'topicUrl':u['url'],'individual':individual['tptUrl'] if individual else None,'bundles':[p['tptUrl'] for p in found if category(p)!='individual']})
(ROOT/'data/topic-print-options.json').write_text(json.dumps({'catalogue':'data/print-and-go-products.json','topics':rows},indent=2)+'\n')
print(f'Updated {len(rows)} topics; {sum(bool(r["individual"]) for r in rows)} individual packs; {sum(bool(r["bundles"]) for r in rows)} topics with bundles/yearly workbooks.')
