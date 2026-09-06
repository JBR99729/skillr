"""Build only AC9S1I03-I05 with original evidence and simple SVG models."""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('science_bank_builder', HERE.parent / 'build.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
builder.HERE = HERE
builder.VERSION = '20260906-science-review-3'
builder.ID_TAG = 'r3'
builder.ASSET_FOLDER = 'ixl-review-3'
builder.ASSETS = builder.ROOT / 'assets/assessment-visuals/year1/science/ixl-review-3'
builder.ASSETS.mkdir(parents=True, exist_ok=True)
builder.AUDIT_PATH = 'docs/question-bank-reviews/2026-09-06-year1-science-i03-i04-i05.md'
builder.SKILLS = {
    'i03':'making and recording observations and informal measurements',
    'i04':'sorting and ordering science data and representing patterns',
    'i05':'comparing evidence, considering fairness and identifying further questions',
}
builder.REFS = {'i03':'what-objects-can-a-magnet-pull','i04':'identify-plants-and-animals','i05':'design-a-race-car-track'}
builder.EVIDENCE_SCOPES = {
    'i05':'Representative related design/sequencing and evidence comparisons inspected; no full IXL fairness or adaptive-progression equivalence claimed. Official AC9S1I05 determines fairness and further-question coverage. See '+builder.AUDIT_PATH+'.',
}

def card(rows):
    return builder.cards(rows), '. '.join(label+': '+detail for label,detail in rows)+'.'

def units(name, count):
    x=100; width=count*72
    body=builder.text(40,40,name+' length model',28)
    body+=f'<path d="M{x} 115 Q{x+width/2} 48 {x+width} 115 Q{x+width/2} 166 {x} 115Z" fill="#b9d8b5" stroke="#315c39" stroke-width="3"/>'
    body+=f'<path d="M{x} 90 V242 M{x+width} 90 V242" stroke="#17324d" stroke-dasharray="5 5"/>'
    for i in range(count):
        body+=f'<rect x="{x+i*72}" y="180" width="72" height="72" fill="#e4eef5" stroke="#315574" stroke-width="2"/>'
    unit = 'cubes' if name == 'Leaf' else 'blocks'
    body+=builder.text(90,285,'Equal '+unit+'; no gaps or overlaps',25)
    return body, f'{name} spans {count} equal {unit}, placed end to end with no gaps or overlaps.'

def graph(rows):
    body=builder.text(30,35,'Key: each circle = one animal',27)
    for i,(label,n) in enumerate(rows):
        y=110+i*100;body+=builder.text(30,y+8,label,29)
        for j in range(n):body+=f'<circle cx="{255+j*65}" cy="{y}" r="20" fill="#397aa3" stroke="#17324d" stroke-width="2"/>'
    return body, 'Each circle represents one animal. '+'. '.join(f'{label}: {n} circles' for label,n in rows)+'.'

builder.visuals={
 'i03':{
  9:units('Leaf',4),
  17:card([('Tuesday morning','3 snails on the wall')]),
  21:card([('First observation','2 leaves'),('Later observation','4 leaves')]),
  28:card([('Friday','5 ants beside the pot')]),
  33:units('Feather',5),
  39:card([('Before lunch','Larger puddle'),('After lunch','Smaller puddle')]),
 },
 'i04':{
  4:graph([('Ducks',4),('Magpies',2)]),
  9:card([('Smooth edge','6 leaves'),('Jagged edge','2 leaves')]),
  17:card([('Ants','4'),('Beetles','4'),('Worms','2')]),
  21:card([('Weeks 1 and 2','1 rainy day; then 3 rainy days'),('Weeks 3 and 4','1 rainy day; then 3 rainy days')]),
  27:graph([('Frogs',5),('Ducks',3)]),
  33:card([('Monday','2 seedlings with open leaves'),('Tuesday','3 seedlings with open leaves'),('Wednesday','5 seedlings with open leaves')]),
  37:card([('Damp soil','5 samples'),('Dry soil','2 samples')]),
 },
 'i05':{
  9:card([('Prediction','Towel A will hold more water.'),('Result','Towel B held more water.')]),
  17:card([('Observer 1','4 snails on the wall'),('Observer 2','4 snails beside the gate')]),
  21:card([('Trial 1','Car A went farther.'),('Trial 2','Car B went farther.'),('Trial 3','Car A went farther.')]),
  27:card([('Observer A: Tuesday, Plant 1','3 leaves'),('Observer B: Tuesday, Plant 1','4 leaves')]),
  33:card([('First trial','Cover B kept the paper drier.'),('Second trial','Cover B kept the paper drier.')]),
 }
}
builder.build()
