"""Verify additive links, catalogue evidence and preservation of authored lessons."""
import json,re,subprocess,sys,hashlib
from pathlib import Path
from html.parser import HTMLParser
class Links(HTMLParser):
 def __init__(self):
  super().__init__();self.links=[]
 def handle_starttag(self,tag,attrs):
  if tag=="a":self.links.append(dict(attrs))
root=Path(__file__).resolve().parents[1]
base=sys.argv[1] if len(sys.argv)>1 else 'origin/main'
report=json.loads((root/'data/topic-print-options.json').read_text())['topics']
catalog=json.loads((root/'data/print-and-go-products.json').read_text());catalog=catalog if isinstance(catalog,list) else catalog['products']
products={p['tptUrl']:p for p in catalog if p.get('available') and not p.get('free') and p.get('tptUrl')}
def strip(s):
 s=re.sub(r'<!-- skillr-print-options:(?:top|worksheet):start -->.*?<!-- skillr-print-options:(?:top|worksheet):end -->','',s,flags=re.S)
 return s.replace('<link rel="stylesheet" href="/assets/css/topic-print-options.css">','')
for row in report:
 path=row['topicUrl'].strip('/')+'/index.html';text=(root/path).read_text();before=subprocess.check_output(['git','show',base+':'+path],cwd=root).decode()
 assert strip(text)==before,(row['code'],'authored HTML changed')
 assert text.count('class="print-options"')==1
 offertext=re.search(r'<!-- skillr-print-options:top:start -->(.*?)<!-- skillr-print-options:top:end -->',text,re.S).group(1)
 assert text.index(offertext)<text.index('</header>',re.search(r'<header[^>]*curriculum-hero',text).start()),row['code']
 parser=Links();parser.feed(offertext)
 for url in [row['individual']]+row['bundles']:
  if url:
   assert url in products,url
   assert any(a.get('href')==url for a in parser.links),url
 for a in parser.links:
  if a.get('href','').startswith('/'):
   assert (root/a['href'].strip('/')/'index.html').exists(),a['href']
 if row['individual']:
  parser=Links();parser.feed(text)
  paid=[(i,a) for i,a in enumerate(parser.links) if a.get('class')=='print-options__paid-link'];assert len(paid)==1
  i,a=paid[0];assert a['href']==row['individual']
  assert '/worksheet/' in parser.links[i-1]['href'],row['code']
paths=[root/r['topicUrl'].strip('/')/'index.html' for r in report]
hashes=lambda:[hashlib.sha256(p.read_bytes()).hexdigest() for p in paths]
first=hashes();subprocess.run([sys.executable,str(root/'scripts/link_topic_print_options.py')],check=True,cwd=root);assert hashes()==first,'builder not idempotent'
print(f'PASS: {len(report)} pages preserve all original HTML outside owned additions; mapped links, free→paid order, local routes and idempotence verified.')
