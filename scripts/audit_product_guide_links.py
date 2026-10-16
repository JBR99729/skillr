#!/usr/bin/env python3
"""Check matching free-guide links without changing products or teaching content."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json,subprocess,re
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='a' and a.get('href'):self.links.append(urlparse(a['href']).path)
ROOT = Path(__file__).resolve().parents[1]
import os
os.chdir(ROOT)
files=subprocess.check_output(['git','ls-files','-z']).decode().split('\0');topics={}
for f in files:
 if not re.fullmatch(r'(?:foundation|year[0-9]+)/curriculum/(?:maths|english|science)/index.html',f):continue
 parser=Links();parser.feed(Path(f).read_text())
 for route in parser.links:
  m=re.fullmatch(r'/(?:foundation|year[0-9]+)/(?:maths|english|science)/(ac9[a-z0-9]+)-[^/]+/',route)
  if m:topics[m[1].upper()]=route
products=json.load(open('data/print-and-go-products.json'));missing=[]
for x in products:
 p=Path(x.get('url','').strip('/'))/'index.html'
 if not x.get('available') or not p.is_file():continue
 parser=Links();parser.feed(p.read_text());codes=x.get('curriculumCodes',[]);expected=[topics[c] for c in codes if c in topics];absent=[u for u in expected if u not in parser.links]
 if absent:missing.append({'file':str(p),'title':x['title'],'missing':absent,'id':x['id']})
print(f'Product guide link audit: {len(products)} catalogue entries; {len(missing)} products missing matching guide links.')
for item in missing:
 print(item['file'] + ': ' + ', '.join(item['missing']))
raise SystemExit(1 if missing else 0)
