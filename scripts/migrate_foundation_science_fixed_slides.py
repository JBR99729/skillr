#!/usr/bin/env python3
from pathlib import Path
import re, subprocess, shutil

ROOT=Path(__file__).resolve().parents[1]
TOPIC_ROOT=ROOT/'foundation'/'science'
PDF_ROOT=ROOT/'worksheets'/'foundation'/'science'/'teacher-slides'
CODES=['AC9SFH01','AC9SFI01','AC9SFI02','AC9SFI03','AC9SFI04','AC9SFI05','AC9SFU01','AC9SFU02','AC9SFU03']

def topic_dir_for(code):
    for d in TOPIC_ROOT.iterdir():
        if not d.is_dir(): continue
        f=d/'index.html'
        if f.exists() and code.lower() in f.read_text(encoding='utf-8',errors='ignore').lower():
            return d
    raise RuntimeError(f'No topic directory found for {code}')

def viewer(code,count):
    slides=''.join([f'<figure class="fixed-slide-viewer__slide" data-slide{" hidden" if i else ""}><img draggable="false" src="slide-{i+1:02d}.png" alt="{code} teacher slide {i+1} of {count}"></figure>' for i in range(count)])
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>{code} Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"></head><body oncontextmenu="return false"><nav class="main-nav"><a href="../">Topic Guide</a><a href="/foundation/curriculum/science/">Foundation Science</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>{code} Teacher Slides</h1><p>Present one fixed branded slide at a time. Use Previous/Next, arrow keys or fullscreen.</p><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">{slides}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span data-slide-counter>1 / {count}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script><script>document.addEventListener('copy',e=>e.preventDefault());document.addEventListener('dragstart',e=>e.preventDefault());document.addEventListener('keydown',e=>{{if((e.ctrlKey||e.metaKey)&&['c','s','p'].includes(e.key.toLowerCase()))e.preventDefault()}});</script></body></html>\n'''

def patch_links(topic,code):
    f=topic/'index.html'
    text=f.read_text(encoding='utf-8')
    patterns=[
        rf'/worksheets/foundation/science/teacher-slides/{code.lower()}-teacher-slide\.html',
        rf'/worksheets/foundation/science/teacher-slides/live\.html\?code={code}'
    ]
    # The patterns above are normal Python regex strings after interpolation. Normalize
    # doubled escapes so they match real URLs, not literal backslashes.
    patterns=[p.replace('\\\\.','\\.').replace('\\\\?','\\?') for p in patterns]
    for p in patterns:
        text=re.sub(p,'teacher-slides/',text,flags=re.I)
    f.write_text(text,encoding='utf-8')

if not shutil.which('pdftoppm'):
    raise RuntimeError('pdftoppm is required (install poppler-utils)')

pages=0
for code in CODES:
    topic=topic_dir_for(code)
    pdf=PDF_ROOT/f'{code.lower()}-teacher-slide.pdf'
    if not pdf.exists(): raise RuntimeError(f'Missing fixed PDF for {code}: {pdf}')
    out=topic/'teacher-slides'
    out.mkdir(exist_ok=True)
    for old in out.glob('slide-*.png'): old.unlink()
    prefix=out/'page'
    subprocess.run(['pdftoppm','-png','-r','150',str(pdf),str(prefix)],check=True,stdout=subprocess.DEVNULL)
    generated=sorted(out.glob('page-*.png'))
    if not generated: raise RuntimeError(f'No pages rendered for {code}')
    for i,p in enumerate(generated,1): p.rename(out/f'slide-{i:02d}.png')
    (out/'index.html').write_text(viewer(code,len(generated)),encoding='utf-8')
    patch_links(topic,code)
    pages+=len(generated)

idx=ROOT/'foundation'/'curriculum'/'science'/'index.html'
if idx.exists():
    text=idx.read_text(encoding='utf-8')
    for code in CODES:
        topic=topic_dir_for(code)
        slug=topic.name
        html_pat=rf'/worksheets/foundation/science/teacher-slides/{code.lower()}-teacher-slide\.html'.replace('\\\\.','\\.')
        live_pat=rf'/worksheets/foundation/science/teacher-slides/live\.html\?code={code}'.replace('\\\\.','\\.').replace('\\\\?','\\?')
        text=re.sub(html_pat,f'/foundation/science/{slug}/teacher-slides/',text,flags=re.I)
        text=re.sub(live_pat,f'/foundation/science/{slug}/teacher-slides/',text,flags=re.I)
    idx.write_text(text,encoding='utf-8')

legacy=re.compile(r'/worksheets/foundation/science/teacher-slides/(?:live\.html|ac9sf[a-z0-9]+-teacher-slide\.html)',re.I)
for f in TOPIC_ROOT.glob('*/index.html'):
    text=f.read_text(encoding='utf-8',errors='ignore')
    if legacy.search(text):
        raise RuntimeError(f'Legacy Foundation Science Teacher Slide link remains in {f}')

print(f'Migrated {len(CODES)} Foundation Science teacher decks into {pages} fixed page images.')
