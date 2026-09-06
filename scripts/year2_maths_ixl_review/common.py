import json, html, math, calendar
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def txt(x,y,s,size=20):
    return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="#17324d" text-anchor="middle">{html.escape(str(s))}</text>'
def rect(x,y,w,h,fill='white'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="#17324d" stroke-width="2"/>'
def line(x,y,u,v,colour='#17324d',width=3):
    return f'<path d="M{x} {y}L{u} {v}" fill="none" stroke="{colour}" stroke-width="{width}"/>'
def q(tag,stem,a,b,c,why,visual=None):
    return dict(skill=tag,question=stem,choices=[a,b,c],summary=why,diagram=visual)
def task(tag,stem,model,note,visual=None):
    r=q(tag,stem,'Completed response','Needs revision','Not attempted',model,visual)
    r.update(grading_mode='adult-review',model_answer=model,acceptance_note=note,response_instructions='Complete the task on paper or with materials, then ask an adult to check it.',completion_label='Ready for adult review')
    return r
def cal(year,month,marks=()):
    weeks=calendar.Calendar(0).monthdayscalendar(year,month)
    s=txt(320,26,f'{calendar.month_name[month]} {year}',23)
    for c,name in enumerate(['Mon','Tue','Wed','Thu','Fri','Sat','Sun']):s+=txt(80+c*80,56,name,18)
    h=210/len(weeks)
    for r,week in enumerate(weeks):
        for c,n in enumerate(week):
            s+=rect(40+c*80,65+r*h,80,h,'#ffe29a' if n in marks else 'white')
            if n:s+=txt(80+c*80,65+r*h+h*.68,n,18)
    return s
def clock(h,m):
    s='<circle cx="320" cy="150" r="128" fill="white" stroke="#17324d" stroke-width="3"/>'
    for n in range(1,13):
        a=n*math.pi/6;s+=txt(320+106*math.sin(a),157-106*math.cos(a),n,21)
    for value,length,col,w in [(h%12+m/60,68,'#17324d',7),(m/5,95,'#087fa5',4)]:
        a=value*math.pi/6;s+=line(320,150,320+length*math.sin(a),150-length*math.cos(a),col,w)
    return s+'<circle cx="320" cy="150" r="6" fill="#17324d"/>'
def write(code,P,T,visuals):
    assert (len(P),len(T))==(24,16),(code,len(P),len(T))
    orders={'practice':[1,0,2,2,1,0,1,2,0,0,2,1,2,0,1,1,0,2,0,1,2,2,1,0],'test':[2,0,1,1,2,0,0,2,1,0,1,2,2,0,1,0]}
    out=[];symbols=[]
    for bank,specs in [('practice',P),('test',T)]:
        for i,s in enumerate(specs,1):
            ident=f'{code}-{"P" if bank=="practice" else "T"}-{i:03d}';ci=orders[bank][i-1]
            opts=s['choices'].copy();a=opts.pop(0);opts.insert(ci,a)
            visual={'type':'none','alt_text':''}
            if s['diagram']:
                body,alt=visuals[s['diagram']]
                visual={'type':'svg','alt_text':alt,'asset_path':f'/assets/assessment-visuals/year2/math/{code.lower()}.svg?v=20260906-year2-pending-release#{ident.lower()}'}
                symbols.append(f'<symbol id="{ident.lower()}" viewBox="0 0 640 300"><rect width="640" height="300" fill="#f8fbff"/>{body}</symbol>')
            tier=min(2,(i-1)//(8 if bank=='practice' else 6))
            r=dict(id=ident,subject='math',year_level='Year 2',curriculum_code=code,bank=bank,skill=s['skill'],question=s['question'],audio_prompt=s['question'],visual=visual,answers=[dict(text=t,is_correct=j==ci) for j,t in enumerate(opts)],correct_index=ci,explanation={'summary':s['summary'],'hint':s.get('acceptance_note','Use the information in the question and check each step.')},difficulty=tier+1,difficulty_tier=['recognise','apply','reason'][tier],sequence_priority=i,review={'status':'editorially-reviewed','version':'20260906-year2-pending-release','evidence_scope':'See 2026-09-06-year2-public-ixl-sweep.md. Original questions; worked examples and representative entry tasks reviewed, not exhaustive adaptive progression.'})
            for k in ('grading_mode','model_answer','acceptance_note','response_instructions','completion_label'):
                if k in s:r[k]=s[k]
            out.append(r)
    (ROOT/f'assets/assessment-banks/year2/math/{code.lower()}.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
    (ROOT/f'assets/assessment-visuals/year2/math/{code.lower()}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg">\n'+'\n'.join(symbols)+'\n</svg>\n')
