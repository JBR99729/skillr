#!/usr/bin/env python3
"""Original, code-scoped AC9M2M02 assessment draft. No publication."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
CODE='AC9M2M02'
def q(skill,stem,answer,b,c,explanation,hint,visual=None):
    return dict(skill=skill,question=stem,choices=[answer,b,c],summary=explanation,hint=hint,diagram=visual)
def draw(skill,stem,model,note):
    return dict(skill=skill,question=stem,choices=['Completed response','Needs revision','Not attempted'],summary=model,hint=note,diagram=None,
                grading_mode='adult-review',model_answer=model,acceptance_note=note,response_instructions='Draw and label your answer on paper, then ask an adult to check it.',completion_label='Ready for adult review')
P=[
q('half_of_object','The sandwich is divided along its diagonal. What fraction is the coloured piece?','One half','One quarter','One eighth','The diagonal divides the square sandwich into 2 equal-sized pieces. One piece is one half.','Look at the number of equal parts in the whole.','half'),
q('quarter_of_shape','The square tile has 4 equal sections. What fraction of the tile is coloured?','One quarter','One half','One eighth','One of the 4 equal sections is coloured, so it is one quarter.','Count the equal sections, including the uncoloured ones.','quarter'),
q('eighth_of_object','A fruit bar is divided into the equal pieces shown. What fraction is one coloured piece?','One eighth','One quarter','One half','The whole bar has 8 equal pieces. Each piece is one eighth.','Count all the equal pieces in the bar.','eighth'),
q('equal_parts_error','A cake is cut into the 4 pieces shown. Are all the pieces quarters?','No; the pieces are not equal in size','Yes; any 4 pieces are quarters','No; quarters need 8 pieces','Four pieces are quarters only when they are equal-sized parts of the same whole.','Compare the widths of these pieces.','unequal'),
q('make_halves','You fold a rectangular card to make 2 equal parts. Where should the fold go?','Through the middle, with opposite edges meeting','Very close to one edge','Anywhere, as long as there is one fold','Bringing opposite edges together makes a fold through the middle and two matching halves.','Both parts must cover the same amount of card.'),
q('common_use_quarters','Four people share one flatbread equally, with none left over. What fraction of the flatbread does each receive?','One quarter','One half','One eighth','Each person receives one of 4 equal shares of the whole flatbread.','The whole is one flatbread.'),
q('common_use_eighths','One tray of slice is cut into 8 equal portions for 8 people. What does “one eighth” mean here?','One person’s portion','All 8 portions together','Any 2 portions together','One eighth is one of the tray’s 8 equal portions. All 8 portions make the whole tray.','Identify the whole before naming a part.'),
q('half_hour_meaning','A music session lasts one hour. A break begins halfway through. What fraction of the hour has passed?','One half','One quarter','One eighth','Halfway divides the hour into 2 equal durations. One has passed and one remains.','Think of two equal parts of the session.'),
q('quarter_event','A game has 4 periods of equal length. What fraction of the playing time is one period?','One quarter','One half','One eighth','One period is one of 4 equal parts of the total playing time.','The periods must last equally long.'),
q('eighth_event','A dance routine has 8 sections that take equal time. One section is finished. What fraction of the routine’s time is finished?','One eighth','One quarter','One half','One completed section out of 8 equal-duration sections is one eighth of the total time.','Count equal durations, not the number of different movements.'),
q('represent_half_in_quarters','One ribbon is marked into 4 equal lengths. How many of these lengths should be coloured to show half the ribbon?','2 lengths','1 length','4 lengths','Two quarter-lengths cover half of the ribbon, leaving two quarter-lengths uncoloured.','Make two equal groups of the four lengths.'),
q('represent_quarter_in_eighths','One chocolate bar has 8 equal squares. How many squares make one quarter of the bar?','2 squares','4 squares','1 square','Divide the 8 squares into 4 equal groups. Each group has 2 squares and is one quarter.','Make four equal shares of the whole bar.'),
q('represent_half_in_eighths','A walking route is split into 8 equal lengths. How many lengths take you halfway along the route?','4 lengths','2 lengths','8 lengths','Four of the 8 equal lengths make half the route. Four equal lengths remain.','Halfway leaves the same distance still to walk.'),
q('make_eighths','A paper strip already has 4 equal sections. How can you turn it into eighths?','Divide every section into 2 equal parts','Divide just one section into 2 parts','Erase all but one dividing line','Splitting each of the 4 equal sections in half makes 8 equal parts of the original strip.','Every section needs the same change.'),
q('different_halves','Each card has one coloured part. Which cards show one half coloured?','Both A and B','Only A','Only B','A is divided vertically and B diagonally. Each division makes 2 equal-area parts, with one coloured.','Halves can have different shapes.','two_halves'),
q('different_quarters','Two identical mats are divided differently. A has 4 equal strips; B has 4 equal rectangles in two rows. Is one part of either mat a quarter?','Yes; both mats have 4 equal-sized parts','Only A, because quarters must be strips','Only B, because quarters must be in two rows','Quarters describe 4 equal parts of a whole, not one particular shape of part.','Check equal size and the number of parts.','two_quarters'),
q('event_equality','A show has 4 acts, but one act lasts much longer than the others. Is every act one quarter of the show’s time?','No; the acts do not take equal time','Yes; there are 4 acts','Yes; every act has a name','Four named stages are not quarters of the time unless their durations are equal.','Equal fractions of time need equal durations.'),
q('capacity_half','A straight-sided container has the same width and depth from bottom to top. It is filled to the middle line. What fraction of its capacity is filled?','One half','One quarter','One eighth','Because the width and depth stay the same, the middle line splits the capacity into 2 equal amounts.','The container has the same shape all the way up.','container'),
q('same_whole_comparison','Which is the smaller portion of the same loaf: one quarter or one eighth?','One eighth','One quarter','They are equal','Sharing the same loaf into 8 equal portions makes smaller portions than sharing it into 4.','Keep the whole loaf the same.'),
q('different_wholes','A half of a small cake and a half of a much larger cake are served. Must the pieces be the same size?','No; the whole cakes are different sizes','Yes; all halves are the same size','Yes; cutting always makes equal pieces across different cakes','A half depends on the size of its whole. Half of the larger cake can be larger.','Ask which whole each half belongs to.'),
q('read_event_model','The strip represents a game divided into 4 equal playing periods. The coloured periods are finished. What fraction of playing time is finished?','One half','One quarter','One eighth','Two of 4 equal periods are finished. Two quarters make one half.','Compare the finished time with the time still to play.','event'),
q('repair_eighth_claim','A pizza has 8 slices, but one slice is much bigger than the others. Why can’t every slice be called one eighth?','Eighths must be equal portions of the whole pizza','A pizza cannot have eighths','Eighths must be square','Counting 8 slices is not enough: all 8 must be equal portions for each to be one eighth.','Check the sizes as well as the count.'),
draw('represent_halves_quarters','Draw two identical rectangular flags. Divide one into halves and colour one half. Divide the other into quarters and colour one quarter.','Each flag represents one whole. The first has 2 equal parts with 1 coloured; the second has 4 equal parts with 1 coloured.','Accept different valid partitions. Require equal-area parts, exactly one part coloured in each flag and labels “half” and “quarter”.'),
draw('represent_eighth_event','Draw a strip to represent a performance with 8 stages that take equal time. Mark the end of the first stage and label the time used.','A whole strip divided into 8 equal sections, with the first section identified as one eighth of the performance’s time.','Require eight equal sections and one eighth correctly marked. Do not require minutes or fraction symbols.'),
]
T=[
q('recognise_half','A square napkin is divided into two equal rectangles. One rectangle is coloured. What fraction is coloured?','One half','One quarter','One eighth','One of 2 equal parts is one half of the whole napkin.','Include the uncoloured part when counting the whole.','test_half'),
q('recognise_quarter','The garden plan is split into the equal sections shown. What fraction is the coloured flower bed?','One quarter','One eighth','One half','The coloured bed is one of 4 equal parts of the whole garden plan.','Count all the equal sections.','test_quarter'),
q('recognise_eighth','A rectangular snack is cut into 8 equal pieces. One piece is packed for lunch. What fraction of the whole snack is packed?','One eighth','One quarter','One half','One of 8 equal pieces is one eighth of the snack.','Name one equal part of a whole divided into eight.'),
q('equal_sharing','Which cut gives two people half of one sandwich each?','A cut making 2 equal-sized pieces','A cut making 1 large and 1 small piece','A cut taking off one small corner','Each half must be the same-sized part of the whole sandwich.','Two pieces alone do not guarantee halves.'),
q('event_quarter','A practice session has 4 activities that last equally long. What fraction of the total activity time is the first activity?','One quarter','One half','One eighth','The activity uses one of 4 equal durations.','Use the equal time, not the activity’s name.'),
q('event_eighth','Eight equally long songs make up a concert. After one song, what fraction of the singing time has passed?','One eighth','One quarter','One half','One of 8 equal song durations is one eighth of the singing time.','Count equal-duration parts of the concert.'),
q('quarter_hour_meaning','A timer divides one hour into 4 equal stretches. What is one stretch called?','A quarter of an hour','Half an hour','An eighth of an hour','A quarter of an hour is one of 4 equal durations making up the hour.','The whole time is one hour.'),
q('representation_quarter','A border has 8 equal panels. How many panels should be painted to show one quarter of the border?','2 panels','1 panel','4 panels','Four equal groups of 2 panels make all 8 panels, so one group is one quarter.','Share the panels into four equal groups.'),
q('representation_half','A swimming practice has 8 equal lengths. After how many lengths is half the distance finished?','4 lengths','2 lengths','6 lengths','Four equal lengths are half of eight; four lengths remain.','Half the distance is equal to the distance left.'),
q('halves_alternative','A square is cut diagonally into 2 matching triangles. Can one triangle represent half a square?','Yes; the triangles cover equal areas','No; halves must be rectangles','No; triangles only show quarters','The two matching triangles together make the square, so each is one half.','The shape of a part does not decide its fraction.'),
q('fractions_require_equal_time','A trip has 8 stages with very different journey times. Is the first stage necessarily one eighth of the trip’s time?','No; the times are not equal','Yes; it is one of 8 stages','Yes; it happens first','With unequal stage times, counting one stage out of eight does not tell us what fraction of the total time it takes.','Check whether the measured parts are equal.'),
q('compare_same_whole','The same sheet can be cut into equal halves or equal quarters. Which cut makes smaller pieces?','Quarters','Halves','Both make pieces of the same size','Four equal parts of the same sheet are smaller than two equal parts.','The whole sheet stays the same size.'),
q('capacity_quarter','A straight-sided tank has a uniform width and depth. Its height is marked into 4 equal sections. The lowest section is full of water. What fraction of the tank’s capacity is filled?','One quarter','One half','One eighth','The 4 equal-height sections have equal capacities because the tank’s width and depth stay the same. One is filled.','One of four equal amounts is filled.','test_container'),
q('whole_from_eighths','A whole bread roll is cut into 8 equal pieces. Seven pieces are on a plate. How many more eighths are needed to complete the roll?','1 eighth','2 eighths','4 eighths','Eight eighths make the roll. Seven are present, so one more is needed.','Count the missing equal part.'),
q('equal_parts_not_count_only','A paper model has 4 parts. What must you check before labelling each part a quarter?','All 4 parts cover equal amounts of the paper','All 4 parts have different colours','All 4 parts have names','Each quarter must be one of 4 equal-area parts of the original paper.','The number of parts is only part of the check.'),
draw('represent_eighth_object','Draw one rectangular fruit bar. Divide the whole bar into eighths and colour one portion. Label that portion.','One whole rectangle split into 8 equal-area parts, with exactly one part coloured and labelled “one eighth”.','Accept eight equal strips, a 2-by-4 grid or another valid equal-area partition. Check that the whole bar is represented.'),
]

def rect(x,y,w,h,fill='white'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="#17324d" stroke-width="3"/>'
def line(x,y,u,v):
    return f'<path d="M{x} {y}L{u} {v}" stroke="#17324d" stroke-width="3"/>'
def text(x,y,s):
    return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="22" fill="#17324d">{s}</text>'
def grid(cols,rows=1,coloured=1,x=120,y=75,w=400,h=150):
    return ''.join(rect(x+(i%cols)*w/cols,y+(i//cols)*h/rows,w/cols,h/rows,'#83c6ee' if i<coloured else '#fff') for i in range(cols*rows))
def svg(key):
    if key=='half': return rect(220,50,200,200)+ '<path d="M220 50H420L220 250Z" fill="#83c6ee"/>'+rect(220,50,200,200,'none')+line(220,250,420,50)
    if key=='quarter': return grid(2,2,w=200,h=200,x=220,y=50)
    if key=='eighth': return grid(4,2)
    if key=='unequal': return rect(120,75,400,150,'#f6d797')+''.join(line(x,75,x,225) for x in (170,220,320))
    if key=='two_halves': return grid(2,1,x=75,y=55,w=200,h=200)+text(165,285,'A')+rect(365,55,200,200)+ '<path d="M365 55H565L365 255Z" fill="#83c6ee"/>'+rect(365,55,200,200,'none')+line(365,255,565,55)+text(455,285,'B')
    if key=='two_quarters': return grid(4,1,1,x=60,y=75,w=240,h=150)+text(170,270,'A')+grid(2,2,1,x=350,y=75,w=240,h=150)+text(460,270,'B')
    if key=='event': return text(140,50,'One whole game')+grid(4,1,2)+text(140,275,'Each section takes equal time')
    if key=='test_half': return grid(1,2,1,x=220,y=50,w=200,h=200)
    if key=='test_quarter': return grid(4,1)
    if key in ('container','test_container'):
        n=2 if key=='container' else 4
        return rect(220,50,200,200)+rect(220,250-200/n,200,200/n,'#83c6ee')+''.join(line(220,50+i*200/n,420,50+i*200/n) for i in range(1,n))+text(445,60,'Full')+text(445,250,'Empty')
    raise ValueError(key)

ALTS={'half':'A square sandwich is divided diagonally into two matching triangles, with one coloured.',
      'quarter':'A square has four equal square sections, one coloured.',
      'eighth':'A rectangular fruit bar has two rows of four equal pieces, one coloured.',
      'unequal':'A rectangular cake has four strips with widths in the ratio 1, 1, 2 and 4.',
      'two_halves':'Card A is split vertically into two equal rectangles, one coloured. Card B is split diagonally into two equal triangles, one coloured.',
      'two_quarters':'Identical rectangular mats: A has four equal vertical strips, B a two-by-two grid of equal rectangles. One part is coloured in each.',
      'event':'One game is represented by four equal sections; the first two are coloured.',
      'test_half':'A square napkin has two equal horizontal sections, one coloured.',
      'test_quarter':'A rectangular garden plan has four equal strips, one coloured.',
      'container':'A uniform straight-sided container is filled to the middle of its height.',
      'test_container':'A uniform tank is marked into four equal-height sections; water fills the lowest section.'}

def main():
    assert (len(P),len(T))==(24,16)
    orders={'practice':[1,0,2,2,1,0,1,2,0,0,2,1,2,0,1,1,0,2,0,1,2,2,1,0],'test':[2,0,1,1,2,0,0,2,1,0,1,2,2,0,1,0]}
    output=[];symbols=[]
    for bank,specs in [('practice',P),('test',T)]:
        for i,s in enumerate(specs,1):
            ident=f'{CODE}-{"P" if bank=="practice" else "T"}-{i:03d}'; ci=orders[bank][i-1]
            options=s['choices'].copy();correct=options.pop(0);options.insert(ci,correct)
            visual={'type':'none','alt_text':''}
            if s['diagram']:
                visual={'type':'svg','alt_text':ALTS[s['diagram']],'asset_path':f'/assets/assessment-visuals/year2/math/ac9m2m02.svg?v=20260906-year2-pending-release#{ident.lower()}'}
                symbols.append(f'<symbol id="{ident.lower()}" viewBox="0 0 640 300"><rect width="640" height="300" fill="#f8fbff"/>{svg(s["diagram"])}</symbol>')
            tier=min(2,(i-1)//(8 if bank=='practice' else 6))
            r=dict(id=ident,subject='math',year_level='Year 2',curriculum_code=CODE,bank=bank,skill=s['skill'],visual=visual,question=s['question'],audio_prompt=s['question'],
                answers=[{'text':t,'is_correct':j==ci} for j,t in enumerate(options)],correct_index=ci,explanation={'summary':s['summary'],'hint':s['hint']},
                difficulty=tier+1,difficulty_tier=['recognise','apply','reason'][tier],sequence_priority=i,
                review={'status':'editorially-reviewed','version':'20260906-m02-draft','evidence_scope':'Five IXL skill explanations and displayed entry tasks inspected; later adaptive progression not exhausted. Original wording and diagrams. See docs/question-bank-reviews/2026-09-06-year2-maths-m02.md.'})
            for k in ('grading_mode','model_answer','acceptance_note','response_instructions','completion_label'):
                if k in s:r[k]=s[k]
            output.append(r)
    (ROOT/'assets/assessment-banks/year2/math/ac9m2m02.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
    (ROOT/'assets/assessment-visuals/year2/math/ac9m2m02.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg">\n'+'\n'.join(symbols)+'\n</svg>\n')
if __name__=='__main__':main()
