from pathlib import Path
from html.parser import HTMLParser
import re,html,json,collections
ROOT=Path(__file__).resolve().parents[1]
HEAD=re.compile(r'<head\b[^>]*>.*?</head>',re.I|re.S)
TITLE=re.compile(r'<title\b[^>]*>(.*?)</title>',re.I|re.S)
META=re.compile(r'<meta\b[^>]*>',re.I)
class Tag(HTMLParser):
 def __init__(self):super().__init__();self.attrs={}
 def handle_starttag(self,t,a):self.attrs=dict(a)
def attrs(tag):
 p=Tag();p.feed(tag);return p.attrs

def text(s):return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',s))).strip()
def compact(t,limit=70):
 # Retain complete words, curriculum code and resource type.
 t=re.sub(r'\s*[|·—–-]\s*SkillrHub\s*$','',t,flags=re.I)
 if len(t)<=limit:return t
 codes=re.findall(r'\bAC9[A-Z0-9]+\b',t,re.I)
 suffix=''
 # Protect year/subject labels and curriculum codes at the end.
 m=re.search(r'(\s*[|]\s*(?:(?:Year \d+|Foundation)\b.*|AC9[A-Z0-9]+.*)|\s*\(AC9[A-Z0-9]+\))$',t,re.I)
 if m:suffix=m.group();t=t[:m.start()]
 resource=re.search(r'\s+(Topic Practice Sheets|Topic Practice [12]|Practice|Test|Worksheet|Worksheets|Homework|Topic Guide)\s*$',t,re.I)
 if resource:suffix=' '+resource.group(1)+suffix;t=t[:resource.start()]
 # If several suffixes exceed the budget, reduce only redundant wording.
 available=limit-len(suffix)-1
 words=t.split();kept=[]
 for w in words:
  if len(' '.join(kept+[w]))>available:break
  kept.append(w)
 while kept and kept[-1].lower().strip(',;:') in {'a','an','the','and','or','of','for','to','with','in','on','including','such','as','between','through'}:kept.pop()
 new=' '.join(kept).rstrip(' ,;:.')+'…'+suffix
 assert len(new)<=limit,(t,new)
 assert all(c.lower() in new.lower() for c in codes),(t,new)
 return new

changes=[];counts=collections.Counter()
for p in ROOT.rglob('*.html'):
 rel=p.relative_to(ROOT).as_posix()
 if any(x in p.relative_to(ROOT).parts for x in ['backup','exports','artifacts','node_modules','.git']):continue
 raw=p.read_text();hm=HEAD.search(raw)
 if not hm:continue
 head=hm.group();tm=TITLE.search(head)
 if not tm:continue
 reasons=[];oldtitle=text(tm.group(1));newtitle=oldtitle
 metas=[(m,attrs(m.group())) for m in META.finditer(head)]
 desc=[(m,a) for m,a in metas if a.get('name','').lower()=='description']
 if len(desc)>1:
  for m,a in reversed(desc[1:]):head=head[:m.start()].rstrip(' \t')+head[m.end():]
  reasons.append('duplicate_description');counts['duplicate_description']+=1
 if not desc or not desc[0][1].get('content','').strip():
  label=oldtitle.removesuffix(' | SkillrHub').strip()
  if '/teacher-slides/' in rel:description=f'{label}. Teaching resource with classroom explanations and activities. Explore the linked topic guide, worksheet, practice and test on SkillrHub.'
  elif '/worksheet/' in rel:description=f'{label}. Printable learning resource with questions and working space. Explore the linked topic guide and practice activities on SkillrHub.'
  elif rel=='404.html':description='This SkillrHub page could not be found. Browse Australian Curriculum maths, English and science topic guides and learning resources.'
  elif rel=='offline.html':description='SkillrHub is currently offline. Reconnect to browse Australian Curriculum topic guides, worksheets and practice activities.'
  else:description=f'{label}. Explore this SkillrHub learning resource and linked Australian Curriculum topic guides, worksheets and practice activities.'
  tag='<meta name="description" content="'+html.escape(description,quote=True)+'">'
  if desc:head=head.replace(desc[0][0].group(),tag,1)
  else:head=re.sub(r'</title>',lambda m:m.group()+'\n'+tag,head,count=1,flags=re.I)
  reasons.append('missing_description');counts['missing_description']+=1
 # noindex legacy titles do not compete in search; preserve those titles.
 robots=[a.get('content','') for m,a in metas if a.get('name','').lower()=='robots']
 if len(oldtitle)>70 and not any('noindex' in v.lower() for v in robots):
  newtitle=compact(oldtitle)
  head=TITLE.sub(lambda m:'<title>'+html.escape(newtitle)+'</title>',head,count=1)
  for m in list(META.finditer(head))[::-1]:
   a=attrs(m.group())
   if a.get('property','').lower()=='og:title' or a.get('name','').lower()=='twitter:title':
    tag=m.group();tag=re.sub(r'\bcontent\s*=\s*("[^"]*"|\x27[^\x27]*\x27)',lambda _: 'content="'+html.escape(newtitle,quote=True)+'"',tag,flags=re.I)
    head=head[:m.start()]+tag+head[m.end():]
  reasons.append('long_title');counts['long_title']+=1
 out=raw[:hm.start()]+head+raw[hm.end():]
 # Printed sheets have one page heading; later sheet/answer headings are sections.
 if '/worksheet/' in rel and len(re.findall(r'<h1\b',out,re.I))>1:
  seen=[False]
  def heading(m):
   if not seen[0]:seen[0]=True;return m.group()
   return re.sub(r'<h1\b', '<h2 class="sheet-heading"', m.group(), count=1, flags=re.I).replace('</h1>', '</h2>')
  out=re.sub(r'<h1\b[^>]*>.*?</h1>',heading,out,flags=re.I|re.S)
  # Preserve the exact worksheet appearance after changing semantic level.
  out=out.replace('</head>','<style>.foundation-sheet h2.sheet-heading{font-size:25px;margin-block:0.67em;font-weight:bold}@media print{.foundation-sheet h2.sheet-heading{font-size:22px}}</style>\n</head>',1)
  reasons.append('multiple_h1');counts['multiple_h1']+=1
 if out!=raw:
  p.write_text(out);changes.append({'path':rel,'fixes':reasons,'title_before':oldtitle,'title_after':newtitle})
report={'source':'Bing exports dated 2026-10-02; current repository audit','summary':dict(counts),'pages_changed':len(changes),'policy':'Metadata-only repairs. Existing robots, canonicals, links and curriculum content preserved. Multiple H1s within the legacy slide deck are intentional per-slide headings.','changes':changes}
if changes:
 (ROOT/'reports/bing-seo-repairs-2026-10-03.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({**dict(counts),'pages_changed':len(changes)},indent=2))
