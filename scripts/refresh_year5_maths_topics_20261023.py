"""Scoped static refresh authorised on 23 October 2026. No bank/viewer edits."""
import json,re,html,sys,subprocess
from pathlib import Path
from lib.static_html_parts import Parts,text
R=Path(__file__).resolve().parents[1]
E=html.escape
LESSONS=json.loads((R/'data/topic-guides/year5-maths-20261023.json').read_text())
UNITS=[u for u in json.loads((R/'data/curriculum-units.json').read_text())['units'] if u['yearNumber']==5 and u['subjectSlug']=='maths']
PRODUCTS=json.loads((R/'data/print-and-go-products.json').read_text())
BASE='5850580d'
def old(path):return subprocess.check_output(['git','show',BASE+':'+str(path.relative_to(R))],cwd=R,text=True)
def detail(ident,label,body,opened=False,cls=''):
 return f'<details class="curriculum-topic-section {cls}" id="{ident}"'+(' open' if opened else '')+f'><summary><strong>{E(label)}</strong></summary><div class="curriculum-detail-body">{body}</div></details>'
def svg(name,body,desc,w=640,h=300):
 p=R/'assets/teaching-models/year5'/f'{name}.svg';p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc"><title id="title">{E(name.replace("-"," ").title())}</title><desc id="desc">{E(desc)}</desc><rect width="{w}" height="{h}" fill="#fff"/><g font-family="Arial,sans-serif" font-size="18" fill="#17344b">{body}</g></svg>\n')
 return f'<figure class="topic-model" tabindex="0" aria-label="Mathematical diagram"><img src="/assets/teaching-models/year5/{name}.svg" alt="{E(desc,quote=True)}" width="{w}" height="{h}" loading="lazy"><figcaption>{E(desc)}</figcaption></figure>'
def t(x,y,s,**kw):return f'<text x="{x}" y="{y}"'+''.join(f' {k.replace("_","-")}="{v}"' for k,v in kw.items())+'>'+E(str(s))+'</text>'
def line(x1,y1,x2,y2,stroke='#17344b',extra=''):return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" {("" if "stroke-width=" in extra else chr(32)+"stroke-width="+chr(34)+"2"+chr(34))} {extra}/>'
VIS={}
b=line(60,140,580,140)
for i in range(11):
 b+=line(60+i*52,130,60+i*52,150)
 if i in (0,10):b+=t(60+i*52,180,f'{2.330+i*.001:.3f}',font_size='20',text_anchor='middle')
b+='<circle cx="320" cy="140" r="7" fill="#12695f"/>'+t(320,100,'2.335',text_anchor='middle')
VIS['decimal-line']=svg('decimal-thousandths',b,'Ten equal thousandth intervals run from 2.330 to 2.340. A point at the fifth interval marks 2.335.')
b=''
for y,d in [(90,3),(200,6)]:
 b+=line(60,y,580,y)
 for i in range(d+1):b+=line(60+i*520/d,y-8,60+i*520/d,y+8)+t(60+i*520/d,y+38,f'{i}/{d}',font_size='20',text_anchor='middle')
 b+='<circle cx="406.667" cy="'+str(y)+'" r="7" fill="#12695f"/>'
b+='<circle cx="493.333" cy="200" r="7" fill="#bb6826"/>'
VIS['fraction-lines']=svg('related-fraction-lines',b,'Two aligned number lines have endpoints zero and one. The marked two thirds and four sixths share a position. Five sixths is marked farther right on the lower line.')
b=''
for i in range(100):
 x=130+i%10*28;y=20+i//10*25;b+=f'<rect x="{x}" y="{y}" width="28" height="25" fill="'+('#12695f' if i<35 else '#fff')+'" stroke="#8ba59b"/>'
VIS['percent-grid']=svg('thirty-five-percent',b,'A whole grid contains 100 equal cells; 35 are shaded and 65 are unshaded.')
b='<path d="M100 30H460V270H220V210H100Z" fill="#d9eee4" stroke="#17344b" stroke-width="3"/>'
b+=line(220,210,220,270,extra='stroke-dasharray="5 5"')+t(280,24,'6 m',text_anchor='middle')+t(480,155,'4 m')+t(105,238,'removed',font_size='14')+t(105,260,'2 m × 1 m',font_size='14')
VIS['irregular-area']=svg('irregular-area',b,'A 6 m by 4 m rectangle has a 2 m by 1 m corner removed at the lower left. The shaded region is the remaining area.')
import math
b='<circle cx="250" cy="150" r="110" fill="#f5faf7" stroke="#17344b" stroke-width="2"/>'
for n in range(1,13):
 a=math.radians(n*30-90);b+=t(round(250+90*math.cos(a),2),round(157+90*math.sin(a),2),n,text_anchor='middle')
b+=line(250,150,250,233,extra='stroke-width="5"')+line(250,150,250+62*math.cos(math.radians(45)),150+62*math.sin(math.radians(45)),extra='stroke-width="7"')+'<circle cx="250" cy="150" r="5" fill="#17344b"/>'+t(410,130,'4:30 PM')+t(410,175,'16:30')
VIS['clock']=svg('time-four-thirty',b,'The minute hand is at 6. The hour hand is halfway between 4 and 5. The stated afternoon time is 4:30 PM or 16:30.')
b=line(150,230,480,230)+line(150,230,315,65)+t(230,200,'45°')+'<path d="M225 230 A75 75 0 0 0 203 177" fill="none" stroke="#12695f" stroke-width="3"/>'+t(155,265,'vertex')
VIS['angle']=svg('angle-opening',b,'Two rays meet at a vertex. The marked smaller opening is 45 degrees, an acute angle. Extending either ray would not change the opening.')
b='<path d="M100 270A220 220 0 0 1 540 270" fill="#f5faf7" stroke="#17344b" stroke-width="2"/>'+line(90,270,550,270)
for deg in range(0,181,5):
 rad=math.radians(deg);r1=210 if deg%10==0 else 215
 b+=line(320+r1*math.cos(rad),270-r1*math.sin(rad),320+220*math.cos(rad),270-220*math.sin(rad))
 if deg%10==0:
  b+=t(round(320+193*math.cos(rad),2),round((294 if deg in (0,180) else 275-193*math.sin(rad)+(13 if deg==50 else 0)),2),deg,font_size='14',text_anchor='middle')
  b+=t(round(320+245*math.cos(rad),2),round((294 if deg in (0,180) else 275-245*math.sin(rad)),2),180-deg,font_size='14',text_anchor='middle')
b+=line(320,270,540,270,'#12695f',extra='stroke-width="4"')+line(320,270,320+220*math.cos(math.radians(50)),270-220*math.sin(math.radians(50)),'#12695f',extra='stroke-width="4"')+'<circle cx="320" cy="270" r="5" fill="#12695f"/>'+t(320,315,'Start at the right-hand zero; follow that scale.',font_size='16',text_anchor='middle')
VIS['protractor']=svg('aligned-protractor',b,'A semicircular protractor is centred on the vertex. The starting ray follows the right-hand zero. The other ray crosses the inner 50-degree and outer 130-degree marks. Minor ticks are 5 degrees.',640,340)
b=''
for label,x,y in [('A',110,110),('B',200,110),('C',290,110),('D',380,110),('E',200,20),('F',200,200)]:
 b+=f'<rect x="{x}" y="{y}" width="90" height="90" fill="#e4f1e9" stroke="#17344b" stroke-width="2"/>'+t(x+45,y+53,label,text_anchor='middle')
VIS['cube-net']=svg('labelled-cube-net',b,'Six equal squares: the row is A, B, C, D; E is directly above B and F directly below B. Shared square edges are fold lines.',640,300)
def grid():
 b=''
 for i in range(7):
  x=90+i*55;y=355-i*50
  b+=line(x,55,x,355,'#d4e3da')+line(90,y,420,y,'#d4e3da')+t(x,382,i,text_anchor='middle')+t(65,y+6,i,text_anchor='middle')
 b+=line(90,355,445,355)+line(90,355,90,30)+t(455,360,'x')+t(80,25,'y')
 return b
b=grid()
for name,x,y in [('P',2,4),('Q',4,2)]:b+=f'<circle cx="{90+x*55}" cy="{355-y*50}" r="6" fill="#12695f"/>'+t(105+x*55,350-y*50,f'{name}({x}, {y})')
VIS['coordinate-grid']=svg('ordered-coordinates',b,'Axes x and y start at zero with equal unit intervals. P is at (2, 4) and Q is at (4, 2).',640,410)
b=grid()+line(255,40,255,355,'#12695f',extra='stroke-dasharray="6 5"')
for coords,col in [('145,305 200,305 145,205','#176b9b'),('365,305 310,305 365,205','#bb6826')]:b+=f'<polygon points="{coords}" fill="{col}" fill-opacity=".2" stroke="{col}" stroke-width="3"/>'
b+=t(265,45,'mirror line x = 3',font_size='15')
VIS['reflection']=svg('reflection-in-vertical-line',b,'A triangle with vertices (1, 1), (2, 1), (1, 3) and its reflection with vertices (5, 1), (4, 1), (5, 3) lie equally far from the vertical mirror line x = 3.',640,410)
b=''
for val,n in enumerate([1,2,3,1,1]):
 x=120+val*85;b+=f'<rect x="{x}" y="{250-n*60}" width="45" height="{n*60}" fill="#12695f"/>'+t(x+22,278,val,text_anchor='middle')
for i in range(4):b+=line(90,250-i*60,535,250-i*60,'#d5e5dc')+t(70,256-i*60,i)
b+=t(320,315,'Number of pets',text_anchor='middle')+t(320,30,'Number of respondents (frequency)',text_anchor='middle')
VIS['frequency-graph']=svg('pet-count-frequencies',b,'Illustrative frequency graph: zero pets has frequency 1, one pet 2, two pets 3, three pets 1 and four pets 1. Total 8 respondents.',640,340)
b=''
for i in range(6):b+=line(90,290-i*40,550,290-i*40,'#d4e3da')+t(65,296-i*40,i*4,text_anchor='middle')
points=[]
for i,v in enumerate([10,14,14,8,12]):
 x=100+i*105;y=290-v*10;points.append(f'{x},{y}');b+=t(x,320,i,text_anchor='middle')+f'<circle cx="{x}" cy="{y}" r="5" fill="#12695f"/>'
b+='<polyline points="'+' '.join(points)+'" fill="none" stroke="#12695f" stroke-width="3"/>'+t(320,355,'Time (hours)',text_anchor='middle')+t(320,38,'Tank volume (litres)',text_anchor='middle')
VIS['line-graph']=svg('tank-volume-over-time',b,'Illustrative tank volumes at hours 0, 1, 2, 3 and 4 are 10, 14, 14, 8 and 12 litres. The vertical axis runs from 0 to 20 litres in equal 4-litre intervals.',640,380)
def a(url,label,cls=''):return f'<a class="{cls}" href="{E(url,quote=True)}">{E(label)}</a>'
def external(url,label,cls=''):return f'<a class="{cls}" href="{E(url,quote=True)}" target="_blank" rel="noopener noreferrer">{E(label)} ↗</a>'
def body_of(t,n):
 if not n:return ''
 child=next((x for x in t.nodes if x['parent'] is n and x['tag']=='div'),None)
 return t.inner(child) if child else ''
retained=[]
for u in UNITS:
 code=u['code'];l=LESSONS[code];path=R/u['url'].strip('/')/'index.html';s=old(path);t0=Parts(s)
 head=s[:s.index('<body')]
 head=head.replace('</head>','<link rel="stylesheet" href="/assets/css/topic-learning-page.css?v=20261009-1"><link rel="stylesheet" href="/assets/css/year5-topic-refresh.css?v=20261023"></head>')
 # Existing unrelated SEO/JSON-LD is retained. Visible lesson chrome is replaced in scope.
 header=t0.outer(t0.find('header',**{'class':'site-header skillr-site-header'}))
 header=re.sub(r'<div class="site-header__links">.*?</div>',f'<div class="site-header__links">{a("/year5/","Year 5 topics")}{a("/print-and-go.html","Worksheet packs")}</div>',header,flags=re.S)
 menu=t0.find('details',**{'class':'site-header__menu'})
 if menu:header=header.replace(t0.outer(menu),'<details class="site-header__menu"><summary>Menu</summary><div class="site-header__menu-panel">'+a('/year5/','Year 5 topics')+a('/print-and-go.html','Worksheet packs')+'</div></details>')
 breadcrumb='<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li>'+a('/','Home')+'</li><li>'+a('/year5/','Year 5')+'</li><li>'+a('/year5/curriculum/maths/','Maths')+f'</li><li aria-current="page">{E(l["title"])}</li></ol></nav>'
 video='';vn=t0.section('Recommended:')
 if vn:
  vs=t0.outer(vn);m=re.search(r'https://www.youtube-nocookie.com/embed/([A-Za-z0-9_-]+)',vs)
  summary=next(x for x in t0.nodes if x['tag']=='summary' and x['parent'] is vn);name=text(t0.inner(summary)).removeprefix('Recommended: ')
  if m:
   video=f'<section class="topic-video-lesson" id="video-lesson" aria-labelledby="topic-video-title"><p class="topic-kicker">Optional video lesson</p><h2 id="topic-video-title">Watch the idea in action</h2><details class="topic-video-player"><summary>Watch: {E(name)}</summary><div class="topic-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/{m[1]}?rel=0" title="{E(name,quote=True)}" width="800" height="450" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><p class="topic-small">An optional independent video supporting part of the topic. Rights remain with its creator. YouTube’s <a href="https://www.youtube.com/static?template=terms" target="_blank" rel="noopener noreferrer">terms</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> apply. Use the written guide for the full lesson.</p></details></section>'
 pack=next((p for p in PRODUCTS if p.get('available') and not p.get('free') and code in p.get('curriculumCodes',[]) and p.get('year')==5),None)
 worksheet=f'/quiz/year-5/math/{code.lower()}/worksheet/'
 if pack:
  image=pack.get('image');cover=f'<img src="{E(image)}" alt="{E(pack["title"],quote=True)} cover" width="88" loading="lazy">' if image and (R/image.lstrip('/')).exists() else ''
  card=f'<p class="topic-kicker">Matching worksheet pack · Optional paid resource</p><h2 id="pack-title">{E(pack["title"])}</h2><div class="topic-pack__contents">{cover}<p>{E(pack["description"])}</p></div>'+external(pack['tptUrl'],'View pack preview and current price on TpT','topic-pack__link')
  free=next((p for p in PRODUCTS if p.get('free') and code in p.get('curriculumCodes',[])),None)
  if free:card+='<p>'+external(free['tptUrl'],'Free decimal sample on TpT')+'</p>'
 else:card=f'<p class="topic-kicker">Matching learning resources</p><h2 id="pack-title">Practise this skill</h2><p>Use the free worksheet for {code}, then try the online practice or topic test.</p>'+a(worksheet,'Open matching worksheet','topic-button topic-button--buy')
 card+='<p class="topic-pack__note">The topic guide, worksheet, digital practice and test are free to use without a purchase.</p><p>'+a('teacher-slides/','Open Classroom View →')+'</p>'
 if pack:card+='<p>'+a(worksheet,'Open free worksheet →')+'</p>'
 hero=f'<header class="curriculum-hero topic-hero"><div class="topic-hero__copy"><p class="curriculum-eyebrow">Year 5 Maths / {E(u["strand"])}</p><h1>{E(l["title"])} ({code})</h1><p class="curriculum-hero__lead">{E(l["lead"])}</p><div class="topic-hero__actions">'+a('#topic-guide','Start learning ↓','topic-button topic-button--outline')+'</div><p class="topic-hero__note">Free teaching support for students, parents, teachers and tutors.</p></div><aside class="topic-pack" aria-labelledby="pack-title">'+card+'</aside></header>'
 nav='<nav class="topic-section-nav" aria-label="On this page">'+a('#topic-guide','Learn the skill')+a('#focus-1','Worked examples')+a('#learning-support','Teaching help')+a('#resources','Worksheets and checks')+'</nav>'
 # Preserve useful previously authored models, correcting scoped defects. Git retains all prior bodies.
 modelnode=t0.section('Concept models and worked thinking');articles=[]
 if modelnode:
  for n in t0.nodes:
   if n['tag']=='article' and modelnode['start']<n['start']<modelnode['end']:
    article=t0.outer(n)
    article=re.sub(r'<div role="img" aria-label="[^"]+">','<div>',article)
    article=re.sub(r'<li>(?:Read every label.*?|Explain the relationship shown.*?|Check the conclusion against.*?)</li>','',article,flags=re.S)
    article=re.sub(r'<p>Now transfer the same relationship.*?</p>','',article,flags=re.S)
    article=re.sub(r'<ol>\s*</ol>','',article)
    articles.append(article)
 if code in ['AC9M5SP02','AC9M5SP03','AC9M5ST01','AC9M5P02']:articles=[]
 if code=='AC9M5N05':
  extra='<div class="bar" style="grid-template-columns:repeat(8,1fr)">'+''.join('<i class="on"></i>' if i<3 else '<i class=""></i>' for i in range(8))+'</div>'
  articles=[x.replace('<strong>11/8 = 1 3/8</strong>',extra+'<strong>11/8 = 1 3/8</strong>') for x in articles]
 if code=='AC9M5P01':articles=articles[1:]
 if code=='AC9M5N09':articles=articles[1:]
 if code=='AC9M5M02':articles=[x.replace('24 m</span>','28 m</span>').replace('For area, subtract the missing rectangle.','The 3 m × 2 m rectangle is removed from one corner. For area, subtract that missing rectangle.') for x in articles]
 if code=='AC9M5M01':articles=[] # unrelated temperature rows are superseded by scoped metric teaching
 if code=='AC9M5M04':articles=[x.replace('Construct angles from a stated measure','Connect angle measures and names') for x in articles]
 if code=='AC9M5M03':articles=[x.replace('For pm times after 12:59','For PM hours 1 to 11') for x in articles]
 if code=='AC9M5SP01':articles=articles[:1]
 # Previously worked two-model examples remain inside the corresponding learning focuses.
 focuses=[]
 for i,f in enumerate(l['focuses'],1):
  body='<p>'+E(f['explain'])+'</p><article class="curriculum-worked-example"><h3>'+E(f['example'])+'</h3>'
  if f.get('visual'):body+=VIS[f['visual']]
  body+='<ol>'+''.join('<li>'+E(x)+'</li>' for x in f['steps'])+'</ol></article><p><strong>Watch for this:</strong> '+E(f['watch'])+'</p>'
  if articles and i in [2,4]:
   idx=0 if i==2 else 1
   if idx<len(articles):body+='<details class="topic-answer"><summary>Another worked model</summary>'+articles[idx]+'</details>'
  body+='<p class="topic-try"><strong>Try it:</strong> '+E(f['tryit'])+'</p><details class="topic-answer"><summary>Check the answer</summary><p>'+E(f['answer'])+'</p></details>'
  focuses.append(detail(f'focus-{i}',f'{i}. {f["title"]}',body,i==1,'topic-focus'))
 # Copy correct authored vocabulary and useful misconceptions; source/marketing panels are removed.
 vocab=body_of(t0,t0.section('Key vocabulary'));errors=body_of(t0,t0.section('Common misconceptions'))
 if code in ['AC9M5SP02','AC9M5SP03','AC9M5ST01','AC9M5P02']:vocab=errors=''
 if code=='AC9M5M01':vocab=re.sub(r'<dt>.*?temperature.*?</dd>','',vocab,flags=re.S)
 support='<p><strong>Before this lesson:</strong> '+E(l['before'])+'</p>'
 if vocab:support+='<h3>Useful vocabulary</h3>'+vocab
 support+='<h3>Help a learner get started</h3><p>Open one focus at a time. Read the worked steps together, ask the learner to explain what each quantity means, then let them try the short check before opening its answer. Use paper, objects or a drawing when that makes the idea clearer.</p>'
 if errors:support+='<h3>Common errors and quick fixes</h3>'+errors
 support+='<p><strong>Keep the challenge meaningful:</strong> A practical construction, investigation or digital activity needs the learner’s actual work. A correct spoken answer alone does not demonstrate that practical skill.</p>'
 # Keep original official elaborations recoverable, without another competing visible reference panel.
 coverage=t0.section('Curriculum coverage and elaborations');archive=t0.outer(coverage).replace('--','—') if coverage else ''
 references='<!-- Previous curriculum coverage retained for recovery.\n'+archive+'\n-->'
 resources='<section class="topic-resources" id="resources" aria-labelledby="resources-title"><h2 id="resources-title">Practise and check this skill</h2><div class="topic-free-links">'+a(worksheet,'Free worksheet')+a('teacher-slides/','Classroom View')+a(f'/quiz/year-5/math/{code.lower()}/practice/','Topic practice')+a(f'/quiz/year-5/math/{code.lower()}/test/','Topic test')+'</div><p class="topic-small">Choose the worksheet for paper practice, the Classroom View for shared teaching, and the online practice or test to check understanding.</p></section>'
 main='<main class="curriculum-layout topic-learning-main" id="main-content"><div class="topic-learning-guide" id="topic-guide"><span id="skillr-written-lesson"></span><div class="topic-section-heading"><p class="topic-kicker">Learn the skill</p><h2>Four focused steps</h2><p><strong>Learning goal:</strong> '+E(l['lead'])+'</p><p>Study a worked example, explain the reasoning and try its short check before moving on.</p></div>'+''.join(focuses)+detail('learning-support','Vocabulary and teaching help',support)+references+resources+'<nav class="topic-next" aria-label="More Year 5 Maths" data-skillr-learning-path="true">'+a('/year5/curriculum/maths/','← All Year 5 Maths topics')+a('/contact.html','Contact SkillrHub')+'</nav></div></main>'
 tail=f'<script>window.skillrPageMeta={{pageType:"topic guide",year:"Year 5",subject:"Maths",curriculumCode:"{code}"}};</script><script src="/assets/access.js?v=1"></script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script>'
 result=head+'<body class="curriculum-shell skillr-resource skillr-resource--topic topic-learning-page year5-maths-learning">'+header+'<div class="curriculum-page">'+breadcrumb+'<a class="topic-skip" href="#topic-guide">Skip to the learning guide</a>'+hero+nav+video+main+'</div>'+tail+'</body></html>\n'
 path.write_text(result)
 retained.append({'code':code,'path':str(path.relative_to(R)),'retainedModelArticles':len(articles),'focuses':4,'sourceInventory':'Video (if previously available), hero and single resource card, compact navigation, four focus disclosures with worked example/Try/answer, one support disclosure, resource path and return navigation. Previous formal coverage archived.'})
def hub(path,body):
 s=old(path);head=s[:s.index('<body')]
 head=head.replace('</head>','<link rel="stylesheet" href="/assets/css/year1-learning-hubs.css?v=20261009-2"></head>')
 header='<header class="hub-header skillr-site-header"><nav aria-label="Main navigation"><a class="hub-brand" href="/"><img src="/icons/skillrhub-mark.svg" width="32" height="32" alt=""><strong>SkillrHub</strong></a><div>'+a('/year5/','Year 5 topics')+a('/print-and-go.html','Worksheet packs')+'</div></nav></header>'
 footer='<aside class="hub-contact"><p><strong>Need help choosing a resource?</strong> Contact <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> for classroom or home-learning support.</p></aside><div class="hub-footer" role="contentinfo">'+a('/','Home')+a('/about.html','About')+a('/contact.html','Contact')+a('/privacy-policy.html','Privacy')+'</div>'
 path.write_text(head+'<body class="year1-learning-hub"><a class="hub-skip" href="#hub-main">Skip to topics</a>'+header+'<div class="hub-page">'+body+footer+'</div><script src="/pwa-register.js"></script></body></html>\n')
hero='<header class="hub-hero"><div><p class="hub-eyebrow">Year 5 · Maths</p><h1>Year 5 Maths teaching resources</h1><p>Clear explanations, worked examples and short checks for number, algebra, measurement, space, statistics and probability. Choose a topic and teach one skill at a time.</p></div><aside class="hub-offer"><p class="hub-eyebrow">Learn, practise, check</p><h2>A clear starting point</h2><p>Open a topic guide, follow a worked example and use the matching worksheet or Classroom View. Free digital practice and tests are also available.</p>'+a('#number','Browse Maths topics','hub-button hub-button--primary')+'</aside></header>'
jumps='<nav class="hub-jumps" aria-label="Maths learning areas">'+''.join(a('#'+s.lower(),s) for s in ['Number','Algebra','Measurement','Space','Statistics','Probability'])+'</nav>'
sections=''
for strand in ['Number','Algebra','Measurement','Space','Statistics','Probability']:
 us=[u for u in UNITS if u['strand'].lower()==strand.lower()];cards=''
 for u in us:
  l=LESSONS[u['code']];q='/quiz/year-5/math/'+u['code'].lower()+'/'
  cards+=f'<article class="hub-topic"><p class="hub-topic__code">{u["code"]}</p><h3>'+a(u['url'],l['title'])+'</h3><p class="hub-topic__summary">'+E(l['lead'])+'</p><div class="hub-topic__actions">'+a(u['url'],'Topic guide')+a(q+'practice/','Practice')+a(q+'test/','Test')+'</div><details class="hub-more"><summary>More resources</summary><div>'+a(u['url']+'teacher-slides/','Classroom View')+a(q+'worksheet/','Worksheet')+'</div></details></article>'
 sections+=f'<section class="hub-group" id="{strand.lower()}" aria-labelledby="{strand.lower()}-heading"><header><h2 id="{strand.lower()}-heading">{strand}</h2><span>{len(us)} topics</span></header><div class="hub-topic-grid">{cards}</div></section>'
hub(R/'year5/curriculum/maths/index.html','<nav class="hub-breadcrumb" aria-label="Breadcrumb">'+a('/','Home')+' / '+a('/year5/','Year 5')+' / <span aria-current="page">Maths</span></nav><main id="hub-main">'+hero+'<div class="hub-list-heading"><h2>Choose a topic</h2><p>24 curriculum topics, grouped by learning area. All guides use the same compact learning format.</p></div>'+jumps+sections+'</main>')
allunits=json.loads((R/'data/curriculum-units.json').read_text())['units'];cards=''
for subj,label in [('maths','Maths'),('english','English'),('science','Science')]:
 count=sum(u['yearNumber']==5 and u['subjectSlug']==subj for u in allunits)
 cards+='<article class="hub-topic"><h2>'+a('/year5/curriculum/'+subj+'/',label)+'</h2><p>'+str(count)+' curriculum topics with teaching guides and linked learning resources.</p>'+a('/year5/curriculum/'+subj+'/','Browse '+label+' topics','hub-button hub-button--primary')+'</article>'
hub(R/'year5/index.html','<main id="hub-main"><header class="hub-hero"><div><p class="hub-eyebrow">Year 5 learning</p><h1>Year 5 teaching and learning resources</h1><p>Choose a subject, then a curriculum topic. Use clear teaching, worked examples and practice to support learning at school or at home.</p></div><aside class="hub-offer"><h2>One skill at a time</h2><p>Start with what the learner needs today. Digital teaching notes, practice and tests are free. Any listed paid printable pack is optional.</p>'+a('/year5/curriculum/maths/','Explore Year 5 Maths','hub-button hub-button--primary')+'</aside></header><div class="hub-topic-grid">'+cards+'</div></main>')
qa={'date':'2026-10-23','base':BASE,'reference':'year1/maths/ac9m1n01-numbers-to-120/index.html','scope':'24 Year 5 Maths guides plus Maths hub and Year 5 entry. No question banks, teacher viewers or print artifacts edited.','pages':retained,'limitations':'Saved research is used within its recorded scope. Earlier SP03/statistics/probability dossiers do not become current-audit complete. No new live-source inspection, learner validation or question-bank verification is claimed.','correctedLegacyModels':['M02 corner-cut rectangle perimeter corrected from 24 m to 28 m','M01 unrelated temperature table removed; unit/accuracy content replaced','SP02 transformation/negative-coordinate lesson replaced with grid-coordinate content','SP03 coordinate lesson replaced with transformation and symmetry content','ST01 continuous-height lesson replaced with nominal/ordinal/discrete data','P02 expected-frequency-led lesson replaced with conduct/record/relative-frequency core'],'retainedPatternComparison':'All 24 page source inventories match the explicit retained pattern; no resource-facts, Quick Learning, process, equivalence, repeated resource or promotional panels remain.'}
(R/'docs/qa/year5-maths-topic-refresh-2026-10-23.json').write_text(json.dumps(qa,indent=2)+'\n')
print('Refreshed 24 static guides, two hubs and 12 original mathematical SVGs.')
