"""Build original AC9S1I06 communication questions only."""
import importlib.util
from pathlib import Path
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('science_bank_builder', HERE.parent / 'build.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
builder.HERE = HERE
builder.VERSION = '20260906-science-review-4'
builder.ID_TAG = 'r4'
builder.ASSET_FOLDER = 'ixl-review-4'
builder.ASSETS = builder.ROOT / 'assets/assessment-visuals/year1/science/ixl-review-4'
builder.ASSETS.mkdir(parents=True, exist_ok=True)
builder.AUDIT_PATH = 'docs/question-bank-reviews/2026-09-06-year1-science-i06.md'
builder.SKILLS = {'i06':'communicating observations, findings and ideas using everyday and scientific vocabulary'}
builder.REFS = {'i06':'what-objects-can-a-magnet-pull'}
builder.EVIDENCE_SCOPES = {'i06':'Representative IXL evidence-to-sentence and observation-label tasks inspected. Original curriculum-led communication items; selected responses do not assess independent text creation. No measured cognitive-load or full adaptive-progression equivalence. See '+builder.AUDIT_PATH+'.'}
def card(rows):
    return builder.cards(rows), '. '.join(label+': '+detail for label,detail in rows)+'.'
builder.visuals = {'i06':{
    9:card([('Monday','2 leaves'),('Friday','4 leaves')]),
    17:card([('Flat paper','Held 2 counters'),('Folded paper','Held 6 counters')]),
    21:card([('Monday','5 birds'),('Tuesday','2 birds')]),
    27:card([('Before lunch','Large puddle'),('After lunch','Small puddle')]),
    33:card([('Gentle push','Shorter travel'),('Stronger push','Longer travel')]),
    37:card([('Beside the log','6 insects'),('Beside the path','3 insects')]),
}}
builder.build()
