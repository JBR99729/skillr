"""Build only the second reviewed Science batch; reuse the simple SVG renderer."""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('science_bank_builder', HERE.parent / 'build.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
builder.HERE = HERE
builder.VERSION = '20260906-science-review-2'
builder.ID_TAG = 'r2'
builder.ASSET_FOLDER = 'ixl-review-2'
builder.ASSETS = builder.ROOT / 'assets/assessment-visuals/year1/science/ixl-review-2'
builder.ASSETS.mkdir(parents=True, exist_ok=True)
builder.AUDIT_PATH = 'docs/question-bank-reviews/2026-09-06-year1-science-h01-i01-i02.md'
builder.SKILLS = {
    'h01': 'science in daily life and pattern-based predictions',
    'i01': 'questions about patterns and experience-based predictions',
    'i02': 'safe procedures to investigate questions and test predictions',
}
builder.REFS = {
    'h01': 'design-a-race-car-track',
    'i01': 'investigate-pushes-and-pulls',
    'i02': 'design-a-race-car-track',
}
builder.EVIDENCE_SCOPES = {
    'i02': 'Related procedural-sequencing reference only: IXL lists no direct AC9S1I02 skill in its Year 1 plan. Safety coverage follows QCAA/ACARA. See '+builder.AUDIT_PATH+'. Not a direct IXL equivalence claim.',
}

def card(rows):
    return builder.cards(rows), '. '.join(label+': '+detail for label,detail in rows)+'.'

builder.visuals = {
    'h01': {
        11: card([('Warm, breezy days','Washing dried quickly: 3 days'),('Cool, still days','Washing dried slowly: 3 days')]),
        17: card([('Warm days','Bucket water fell quickly'),('Cool days','Bucket water fell slowly')]),
        31: card([('Same journey, first test','Drink cooler in Bag B'),('Same journey, second test','Drink cooler in Bag B')]),
        35: card([('After sunny days','Lights stayed on longer'),('After cloudy days','Lights stayed on for less time')]),
    },
    'i01': {
        9: card([('Trial 1, same car and floor','Stronger push: farther travel'),('Trial 2, same car and floor','Stronger push: farther travel')]),
        17: card([('First week','More growth in Place A than B'),('Second week','More growth in Place A than B')]),
        21: card([('Gentle breeze','Spinner turned slowly'),('Stronger breeze','Spinner turned faster')]),
        28: card([('First similar day','Sunny puddle dried first'),('Second similar day','Sunny puddle dried first')]),
        35: card([('Test 1','Boat A held more counters'),('Test 2','Boat A held more counters')]),
    },
    'i02': {
        9: card([('First','Set up paper in the tray'),('Next','?'),('Last','Record what happened to the paper')]),
        17: card([('First','Check lane; release the car'),('Next','Observe and mark its stopping place'),('Before another roll','?')]),
        23: card([('Planned location','Beside a plugged-in device'),('Planned equipment','Tray, paper and cups of water'),('Planned action','Pour water onto paper in the tray')]),
        29: card([('Set up','Put paper in the tray'),('Add drops','Use the instructed amount'),('Observe','Look at what happens to the paper')]),
        35: card([('Start','Adult prepares damp worm tray'),('During','Observe briefly without handling'),('Finish','?')]),
    },
}
builder.build()
