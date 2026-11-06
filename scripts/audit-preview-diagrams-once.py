from collections import Counter, defaultdict
from html.parser import HTMLParser
import json, re, subprocess, sys

root, sha = sys.argv[1:]
def git(*args):
    return subprocess.check_output(['git','-C',root,*args])
paths = []
pattern = re.compile(r'^(foundation|year[1-9]|year10)/(maths|english|science)/ac9[^/]+/index\.html$')
for row in git('ls-tree','-r',sha).decode().splitlines():
    meta, path = row.split('\t',1)
    if pattern.fullmatch(path):
        paths.append((meta.split()[2], path))
data = git('cat-file','--batch', '--buffer',) if False else subprocess.check_output(['git','-C',root,'cat-file','--batch'],input=''.join(oid+'\n' for oid,_ in paths).encode())

class Inventory(HTMLParser):
    def __init__(self,html):
        super().__init__()
        self.preview=[]
        self.elsewhere=set()
        self.stack=[]
        self.feed(html)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        classes=set((a.get('class') or '').split())
        if classes & {'lesson-preview-example','cb-example'}:
            self.preview.append(set())
            self.stack.append(tag)
            return
        if tag in {'img','svg','table','canvas','picture','math'}:
            if self.stack:
                self.preview[-1].add(tag)
            else:
                self.elsewhere.add(tag)
        if self.stack and tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:
            self.stack.append(tag)
    def handle_startendtag(self,tag,attrs):
        self.handle_starttag(tag,attrs)
        self.handle_endtag(tag)
    def handle_endtag(self,tag):
        if self.stack and tag in self.stack:
            idx=len(self.stack)-1-self.stack[::-1].index(tag)
            del self.stack[idx:]

pos=0
counts=Counter()
by_subject=defaultdict(Counter)
entries=[]
for oid,path in paths:
    end=data.index(b'\n',pos)
    header=data[pos:end].decode().split()
    if len(header)!=3 or header[0]!=oid or header[1]!='blob':
        raise ValueError((path,header))
    size=int(header[-1]); start=end+1
    html=data[start:start+size].decode()
    pos=start+size+1
    if re.search(r'http-equiv=["\']refresh', html, re.I) and 'noindex' in html:
        counts['redirect']+=1
        continue
    doc=Inventory(html)
    markers=set().union(*doc.preview)
    if not doc.preview: kind='missing preview'
    elif markers & {'img','svg','canvas','picture'}: kind='pictorial'
    elif 'table' in markers: kind='table only'
    else: kind='text only'
    counts[kind]+=1
    by_subject[path.split('/')[1]][kind]+=1
    entries.append({'path':path,'kind':kind,'preview_elements':sorted(markers),'visual_element_elsewhere':bool(doc.elsewhere & {'svg','img','canvas','picture'})})
assert pos==len(data)
assert len(entries)==676,(counts,len(entries))
with open('diagram-audit-results.json','w') as out:
    json.dump({'commit':sha,'counts':counts,'subjects':by_subject,'pages':entries},out,indent=2)
print(json.dumps({'counts':counts,'subjects':by_subject,'non_text': [e for e in entries if e['kind']!='text only']},indent=2))
