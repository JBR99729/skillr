#!/usr/bin/env python3
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "curriculum-question-banks" / "year10-gifted-math-reviewed.txt"
MARKER = "YEAR10_GIFTED_APPEND_V1"

CODES = [
"AC9M10N01","AC9M10A01","AC9M10A02","AC9M10A03","AC9M10A04","AC9M10A05",
"AC9M10M01","AC9M10M02","AC9M10M03","AC9M10M04","AC9M10M05",
"AC9M10SP01","AC9M10SP02","AC9M10SP03",
"AC9M10ST01","AC9M10ST02","AC9M10ST03","AC9M10ST04","AC9M10ST05",
"AC9M10P01","AC9M10P02"
]

OVERRIDES = {
("AC9M10N01",10): {"q":"A model estimates doubling time using t = ln(2)/k for a fixed positive growth constant k. If ln(2) is approximated as 0.700 instead of 0.693..., is the predicted doubling time too short or too long?","a":"Too long","h":"With k fixed, a larger numerator gives a larger predicted doubling time."},
("AC9M10N01",11): {"q":"A rotation algorithm repeatedly applies a matrix whose sine and cosine entries are rounded to 2 decimal places. Over 1000 rotations, what is the main numerical risk?","a":"Position and length errors can accumulate","h":"Rounded matrix entries may no longer preserve lengths and angles exactly at every step."},
("AC9M10M01",4): {"q":"A cube of side 4 cm has a cone of radius 2 cm and height 5 cm centred on its top face. Find the external surface area, excluding the bottom face of the cube.","a":"80 - 4π + 2π√29 cm²","h":"Keep the uncovered part of the cube's top face: subtract only the circular contact area, then add the cone's lateral area."},
("AC9M10M01",6): {"q":"A 5 cm × 3 cm × 2 cm rectangular prism has a half-cylinder of radius 1.5 cm and length 5 cm attached along its 5 cm × 3 cm top face. Find the external surface area, excluding the prism's bottom face.","a":"32 + 9.75π cm²","h":"For the prism exclude both the bottom and shared top; for the half-cylinder include its curved surface and two semicircular ends."},
("AC9M10M01",7): {"q":"A tank consists of a cylinder of radius 4 m and height 6 m with a hemisphere of radius 4 m on each end. Find its volume.","a":"544π/3 m³","h":"Two hemispheres make one sphere, so add πr²h + (4/3)πr³."},
("AC9M10M01",12): {"q":"A triangular prism has base area 12 cm² and length 10 cm. A cylinder is attached to one face. Why is this information alone insufficient to determine the exact external surface area of the composite object?","a":"The triangle's side lengths and the exact shared contact area are also needed","h":"Base area determines volume, but surface area requires face dimensions and the area hidden at the join."},
("AC9M10M01",14): {"q":"A cone of radius 3 cm and height 4 cm sits on a cylinder of radius 3 cm and height 6 cm, with their circular faces exactly joined. Find the external surface area excluding the cylinder's bottom base.","a":"51π cm²","h":"The cone slant height is 5 cm. Add cylinder curved area 36π and cone lateral area 15π; the joined circle is hidden."},
("AC9M10M01",16): {"q":"Two identical cylinders, each radius 2 cm and height 5 cm, are joined end-to-end along a circular face. Find the external surface area of the resulting solid.","a":"48π cm²","h":"The result has total length 10 cm, curved area 2πr(10), plus two exposed circular ends."},
("AC9M10M01",20): {"q":"A cube is attached to the curved side of a cylinder. Which extra measurement is essential before the exact external surface area of the composite object can be calculated?","a":"The exact contact area hidden where the two solids join","h":"External surface area equals the exposed areas, so the hidden overlap must be known."},
("AC9M10M01",21): {"q":"A rectangular prism 10 cm × 4 cm × 4 cm has a hemisphere of radius 2 cm attached centrally to one 4 cm × 4 cm end. Find the total volume.","a":"160 + 16π/3 cm³","h":"Add prism volume and hemisphere volume."},
("AC9M10M01",22): {"q":"For the solid in Q21, find the external surface area excluding the 10 cm × 4 cm bottom face.","a":"152 + 4π cm²","h":"Start with the prism surface area, remove the bottom face and circular contact area, then add the hemisphere's curved area."},
("AC9M10M04",9): {"q":"A thermometer reading is 25°C ± 0.5°C. Numerically, 0.5/25 = 2%. Why should this not be interpreted as a physically meaningful 2% relative temperature uncertainty?","a":"The Celsius scale has an arbitrary zero, so temperature ratios in °C are not physically meaningful","h":"Relative comparisons of absolute temperature require an absolute scale such as kelvin."},
}
for n in (3,6,10,14,17,20,23):
    OVERRIDES[("AC9M10ST04",n)] = {"a":"No observed difference in proportions for these groups; causation or 'no effect' cannot be concluded","h":"Equal sample proportions show no observed association in this table, not proof that the variable has no causal effect."}

def compact(s): return re.sub(r"\s+", " ", s).strip()
def parse_source(text):
    headers=list(re.finditer(r"={20,}\s*(AC9M10[A-Z0-9]+)", text)); result={}
    for i,m in enumerate(headers):
        code=m.group(1); end=headers[i+1].start() if i+1<len(headers) else len(text); sec=text[m.end():end]; qs=[]
        rx=r"(?:^|\n)\s*Q(\d+)\s+(.*?)\s+Answer:\s*(.*?)\s+Hint:\s*(.*?)(?=(?:\n\s*Q\d+\s)|(?:\n\s*={20,})|\Z)"
        for qm in re.finditer(rx, sec, re.S):
            n=int(qm.group(1)); q=compact(qm.group(2)); a=compact(qm.group(3)); h=compact(qm.group(4)); ov=OVERRIDES.get((code,n),{})
            q=ov.get("q",q); a=ov.get("a",a); h=ov.get("h",h)
            q=q.replace("(x^(3y)2 / x^(−1y)4)^2","(x^3 y^2 / (x^−1 y^4))^2").replace("(3x^(−2y)3)/(9x^−4y)","(3x^−2 y^3)/(9x^−4 y)").replace("(a^(2b)−3)^−2","(a^2 b^−3)^−2").replace("(2x^(3y)−1)/(4x^(−1y)2)","(2x^3 y^−1)/(4x^−1 y^2)").replace("(x^(−2y)3)^3","(x^−2 y^3)^3")
            a=a.replace("x^(2(x)2 + 1)","x^2(x^2 + 1)"); qs.append({"n":n,"q":q,"a":a,"h":h})
        result[code]=qs
    return result

def norm(s): return re.sub(r"[^a-z0-9]+","",s.lower())
def numeric_variants(answer):
    out=[]; m=re.fullmatch(r"([≈~]?\s*)?(-?\d+(?:\.\d+)?)(%|°|(?:\s*[a-zA-Z]+(?:²|³)?)?)", answer.strip())
    if m:
        val=float(m.group(2)); suffix=m.group(3) or ""; candidates=[val+1,val-1,-val if val else 2,val*2 if val else 1]
        for c in candidates:
            out.append((f"{c:.3g}" if not float(c).is_integer() else str(int(c)))+suffix)
    m=re.fullmatch(r"x\s*=\s*(-?\d+(?:/\d+)?|-?\d+(?:\.\d+)?)",answer.strip())
    if m:
        token=m.group(1); out += [f"x = {token.lstrip('-')}" if token.startswith('-') else f"x = -{token}","No real solution","All real x"]
    return out

def build_options(item,pool):
    correct=item["a"]; candidates=numeric_variants(correct); q=item["q"].lower(); a=correct.lower()
    if "overestimate" in q or "underestimate" in q or "too short" in a or "too long" in a: candidates += ["Overestimate","Underestimate","No systematic effect","The direction cannot be determined"]
    if "linear" in a or "exponential" in a: candidates += ["Linear growth","Linear decay","Exponential growth","Exponential decay","Quadratic model"]
    if "independ" in a or "depend" in a: candidates += ["Independent","Dependent","Mutually exclusive","Not enough information"]
    if "right skew" in a or "left skew" in a or "symmetric" in a: candidates += ["Right skew","Left skew","Approximately symmetric","No conclusion about shape is possible"]
    candidates += [o["a"] for o in pool if o["n"]!=item["n"]]
    uniq=[]; seen={norm(correct)}
    for c in candidates:
        c=compact(c)
        if not c or norm(c) in seen: continue
        if len(correct)<35 and len(c)>90: continue
        if len(correct)>80 and len(c)<8: continue
        seen.add(norm(c)); uniq.append(c)
        if len(uniq)>=3: break
    for c in ["Not enough information","None of these conclusions follows","A different result is required"]:
        if len(uniq)>=3: break
        if norm(c) not in seen: seen.add(norm(c)); uniq.append(c)
    idx=(item["n"]-1)%4; opts=uniq[:3]; opts.insert(idx,correct); return opts,idx

def js_obj(code,mode,item,pool):
    options,correct=build_options(item,pool); ident=f"{code.lower()}-g-{'p' if mode=='practice' else 't'}-{item['n']:03d}"
    return {"id":ident,"curriculumCode":code,"bank":mode,"section":"Gifted challenge","sourceNumber":item["n"],"skill":"gifted challenge","printable":True,"type":"single","question":item["q"],"answers":options,"correct":correct,"explanation":f"{item['a']}. {item['h']}","structuredExplanation":{"summary":item["a"],"hint":item["h"]},"qualitySchema":"gifted-reviewed-v1","difficulty":"gifted","gifted":True}

def append_bank(path,code,mode,items,pool):
    raw=path.read_text()
    if MARKER in raw: return False
    arr=[js_obj(code,mode,x,pool) for x in items]; var="skillrPracticeQuestions" if mode=="practice" else "skillrTestQuestions"
    block="\n\n// "+MARKER+" — reviewed gifted extension; appended after core bank.\n"+f"window.{var}.push(..."+json.dumps(arr,ensure_ascii=False,separators=(",",":"))+");\n"
    if mode=="test": block+="window.skillrExamQuestions=window.skillrTestQuestions;\n"
    block+=f"window.quizQuestions=window.{var};\n"; path.write_text(raw.rstrip()+block); return True

def main():
    if not SOURCE.exists(): raise SystemExit(f"Missing source: {SOURCE}")
    data=parse_source(SOURCE.read_text()); errors=[]
    for code in CODES:
        if len(data.get(code,[]))!=24: errors.append(f"{code}: expected 24 source questions, got {len(data.get(code,[]))}")
    if errors: raise SystemExit("\n".join(errors))
    changed=0
    for code in CODES:
        base=ROOT/"quiz"/"year-10"/"math"/code.lower(); p=base/"practice"/"questions.js"; t=base/"test"/"questions.js"
        if not p.exists() or not t.exists(): errors.append(f"{code}: missing bank file(s)"); continue
        pool=data[code]; changed += int(append_bank(p,code,"practice",pool[:16],pool)); changed += int(append_bank(t,code,"test",pool[16:],pool))
    if errors: raise SystemExit("\n".join(errors))
    for code in CODES:
        base=ROOT/"quiz"/"year-10"/"math"/code.lower(); ptxt=(base/"practice"/"questions.js").read_text(); ttxt=(base/"test"/"questions.js").read_text()
        if ptxt.count(f"{code.lower()}-g-p-") != 16: raise SystemExit(f"{code}: gifted practice count verification failed")
        if ttxt.count(f"{code.lower()}-g-t-") != 8: raise SystemExit(f"{code}: gifted test count verification failed")
    print(f"Year 10 gifted layer complete: {changed} bank files updated; 21 codes × (16 practice + 8 test) = 504 gifted questions.")
if __name__=="__main__": main()
