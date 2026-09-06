"""Materialise only the three independently authored Year 1 Science review banks.

Run from the repository root. Publishing and review-ledger recording are separate.
The text files are authored items, not templates or IXL question extracts.
"""
from pathlib import Path
import html
import json
import textwrap

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
VERSION = '20260906-science-review-1'
ID_TAG = 'r1'
ASSET_FOLDER = 'ixl-review-1'
AUDIT_PATH = 'docs/question-bank-reviews/2026-09-06-year1-science-u01-u03.md'
EVIDENCE_SCOPES = {}
ASSETS = ROOT / 'assets/assessment-visuals/year1/science/ixl-review-1'
ASSETS.mkdir(parents=True, exist_ok=True)

def text(x, y, value, size=22):
    return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="#17324d">{html.escape(value)}</text>'

def cards(rows):
    """Wide, large-type evidence cards, readable at phone width."""
    body = ''
    y = 12
    for label, detail in rows:
        body += f'<rect x="12" y="{y}" width="616" height="92" rx="12" fill="#eef6fa" stroke="#7895aa"/>'
        body += text(28, y+29, label, 28)
        lines = textwrap.wrap(detail, width=33)
        assert len(lines) <= 2, detail
        for j, line in enumerate(lines):
            body += text(28, y+58+j*28, line, 28)
        y += 96
    return body

def arrow(x1, x2, y):
    tip = x2 - 16 if x2 > x1 else x2 + 16
    return (f'<path d="M{x1} {y} H{x2}" stroke="#155b87" stroke-width="8"/>'
            f'<path d="M{tip} {y-12} L{x2} {y} L{tip} {y+12}" fill="none" stroke="#155b87" stroke-width="8"/>')

def directions(rows, target=''):
    body = text(28, 36, target, 23) if target else ''
    for i, (label, direction) in enumerate(rows):
        y = 104+i*105
        body += text(28, y+8, label)
        body += f'<rect x="288" y="{y-28}" width="60" height="56" rx="7" fill="#efb34e" stroke="#704b17" stroke-width="3"/>'
        body += arrow(375, 565, y) if direction == 'right' else arrow(260, 160, y)
    return body

def squash():
    return (text(70, 48, 'Before') + text(425, 48, 'After') +
            '<ellipse cx="150" cy="180" rx="58" ry="75" fill="#d0a4dc" stroke="#5a3565" stroke-width="3"/>'+
            '<ellipse cx="480" cy="215" rx="110" ry="30" fill="#d0a4dc" stroke="#5a3565" stroke-width="3"/>'+
            '<path d="M480 83 V164 M467 150 L480 164 L493 150" fill="none" stroke="#155b87" stroke-width="7"/>'+
            text(410, 76, 'Press down', 20))

def travel(rows):
    body = text(130, 35, 'Start', 20) + text(380, 35, 'Travel from the same line', 19)
    body += '<path d="M165 47 V280" stroke="#17324d" stroke-width="3" stroke-dasharray="7 5"/>'
    for i, (label, end) in enumerate(rows):
        y = 105+i*105
        body += text(20, y+7, label, 21) + arrow(172, end, y)
        body += f'<circle cx="{end}" cy="{y+25}" r="8" fill="#704b17"/>'
    return body

# The alt text contains the same evidence as the drawing, never the answer.
visuals = {
 'u01': {
  15: (cards([('Place A','Seeds; open ground; no shelter'),('Place B','Seeds; protected resting place'),('Place C','Water; protected resting place; no seeds')]), 'Place A: seeds, open ground, no shelter. Place B: seeds and a protected resting place. Place C: water and a protected resting place, no seeds.'),
  16: (cards([('Plant A','Water: yes. Light: no.'),('Plant B','Water: no. Light: yes.'),('Plant C','Water: yes. Light: yes.')]), 'Plant A has water but no light. Plant B has light but no water. Plant C has water and light.'),
  33: (cards([('Butterfly needs','Flowers for food; leaves for shelter'),('Garden A','Flowers and leaves'),('Gardens B / C','B: flowers only. C: leaves only.')]), 'The butterfly needs flowers for food and leaves for shelter. Garden A has both. Garden B has flowers only. Garden C has leaves only.'),
  34: (cards([('Setup A','Light, space and moist soil'),('Setup B','Light and space; dry soil'),('Setup C','Light, space and moist soil')]), 'Setup A: light, space, moist soil. Setup B: light, space, dry soil. Setup C: light, space, moist soil.'),
 },
 'u02': {
  5:(cards([('Morning','Rain falling'),('Afternoon','No rain falling')]),'Morning: rain falling. Afternoon: no rain falling.'),
  6:(cards([('Day A, at 6 pm','Dark outside'),('Day B, at 6 pm','Light outside')]),'At 6 pm on Day A it is dark outside. At 6 pm on Day B it is light outside.'),
  9:(cards([('Morning shade','Seat A: shaded. Seat B: sunny.'),('Afternoon shade','Seat A: sunny. Seat B: shaded.')]),'Morning: Seat A shaded and Seat B sunny. Afternoon: Seat A sunny and Seat B shaded.'),
  13:(cards([('Monday','Dry'),('Tuesday','Rainy'),('Wednesday','Dry')]),'Monday dry. Tuesday rainy. Wednesday dry.'),
  20:(cards([('Winter photo, at 6 pm','Dark outside'),('Summer photo, at 6 pm','Light outside')]),'At 6 pm the winter photo is dark outside and the summer photo is light outside.'),
  21:(cards([('Before the rainy weeks','Grass: dry and brown'),('After the rainy weeks','Grass: green')]),'Before the rainy weeks, grass is dry and brown. After the rainy weeks, grass is green.'),
  24:(cards([('Morning observation','Dry'),('Afternoon forecast','Rain expected')]),'The morning is dry. The forecast says rain is expected in the afternoon.'),
  29:(cards([('First observation','Warm air'),('Later observation','Cool air')]),'First observation: warm air. Later observation: cool air.'),
  30:(cards([('Morning','Bench A: sunny. Bench B: shaded.'),('Lunchtime','Bench A: shaded. Bench B: sunny.')]),'Morning: Bench A sunny and Bench B shaded. Lunchtime: Bench A shaded and Bench B sunny.'),
  33:(cards([('Wednesday','Dry'),('Thursday','Rainy'),('Friday','Dry')]),'Wednesday dry. Thursday rainy. Friday dry.'),
 },
 'u03': {
  5:(directions([('Push','right')]),'A block with a force arrow pointing right.'),
  9:(directions([('Push A','left'),('Push B','right')],'The ramp is to the RIGHT.'),'The ramp is to the right. Push A points left. Push B points right.'),
  14:(squash(),'Before: a tall rounded piece of purple dough. After a downward press: a wider, flatter purple piece.'),
  17:(travel([('Push A',340),('Push B',560)]),'Both trials start at the same line. Push A ends nearer the line; Push B ends farther from it.'),
  21:(cards([('Test 1: gentle push','Same car and floor: shorter travel'),('Test 2: stronger push','Same car and floor: longer travel')]),'Test 1, gentle push: shorter travel. Test 2, stronger push: longer travel. Same car, floor and starting line.'),
  24:(squash(),'Before squeezing: a tall rounded purple ball. After squeezing: a wider, flatter purple ball.'),
  28:(directions([('Force','left')]),'A block with its force arrow pointing left.'),
  32:(squash(),'Before pressing: tall rounded purple dough. After pressing: wider and flatter purple dough.'),
  34:(travel([('Trial A',565),('Trial B',355)]),'Both trials start at the same line. Trial A ends farther from the line than Trial B.'),
  38:(directions([('Pull A','right'),('Pull B','left')],'The star is to the RIGHT.'),'The star is to the right of the box. Pull A points right; Pull B points left.'),
 }
}

SKILLS = {'u01':'needs of plants and animals','u02':'daily and seasonal changes','u03':'pushes and pulls'}
REFS = {'u01':'what-do-animals-need-to-survive','u02':'weather-patterns','u03':'investigate-pushes-and-pulls'}
def build():
    for short in SKILLS:
        code = 'AC9S1'+short.upper()
        lines = [line.split('|') for line in (HERE/f'{short}.txt').read_text().splitlines() if line and not line.startswith('#')]
        assert len(lines) == 40, (code, len(lines))
        assert len({row[0] for row in lines}) == 40
        bank = []
        for index, row in enumerate(lines):
            assert len(row) == 5, row
            question, correct, wrong1, wrong2, explanation = row
            answers = [correct, wrong1, wrong2]
            position = index % 3
            answers = answers[-position:]+answers[:-position] if position else answers
            assert len(set(answers)) == 3
            is_practice = index < 24
            number = index+1 if is_practice else index-23
            stage = ['recognise','apply','reason'][min(index//8,2)] if is_practice else 'independent'
            visual = {'type':'none','alt_text':''}
            if index+1 in visuals[short]:
                body, alt = visuals[short][index+1]
                asset = f'{code.lower()}-{index+1:02}.svg'
                # Publisher consumes the named symbol; standalone asset supports visual QA.
                svg = f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 300" role="img" aria-label="{html.escape(alt,quote=True)}"><defs><symbol id="model" viewBox="0 0 640 300">{body}</symbol></defs><use href="#model" xlink:href="#model" width="640" height="300"/></svg>\n'
                (ASSETS/asset).write_text(svg)
                visual = {'type':'svg','alt_text':alt,'asset_path':f'/assets/assessment-visuals/year1/science/{ASSET_FOLDER}/{asset}#model'}
            bank.append({
                'id':f'{code.lower()}-{ID_TAG}-{"p" if is_practice else "t"}-{number:03}',
                'curriculum_code':code,'year_level':'Year 1','subject':'science',
                'bank':'practice' if is_practice else 'test','skill':SKILLS[short],
                'question':question,'audio_prompt':question,
                'answers':[{'text':a,'is_correct':j==position} for j,a in enumerate(answers)],
                'correct_index':position,'explanation':{'summary':explanation,'hint':'Look for the observation that supports your answer.'},
                'visual':visual,'difficulty':min(index//8+1,3) if is_practice else 3,
                'difficulty_tier':stage,'sequence_priority':number,
                'review':{'version':VERSION,'status':'editorially-reviewed','ixl_reference_url':f'https://au.ixl.com/science/year-1/{REFS[short]}','evidence_scope':EVIDENCE_SCOPES.get(short, f'Representative observed questions; see {AUDIT_PATH}. Not an IXL endorsement or measured equivalence.')}
            })
        dest = ROOT/f'assets/assessment-banks/year1/science/{code.lower()}.json'
        dest.write_text(json.dumps(bank,indent=2,ensure_ascii=False)+'\n')
        print(code,'24 Practice + 16 Test;',len(visuals[short]),'visuals')

if __name__ == "__main__":
    build()
