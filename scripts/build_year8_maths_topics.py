#!/usr/bin/env python3
"""Build the Year 8 Maths canonical topic-guide and teacher-slide data."""
from __future__ import annotations

import html
import json
from pathlib import Path

from upper_maths_authored import HEADINGS
from upper_maths_authoring import build_spec

ROOT = Path(__file__).resolve().parents[1]

# Code-specific teaching decisions. Curriculum wording and elaborations are
# joined from data/curriculum-units.json so the workbook-derived source remains
# authoritative.
T = {
"AC9M8N01":("Irrational Numbers in Context","Some lengths and circle measures cannot be written as a fraction; their decimals continue without terminating or repeating.","Locate √2 and π on the real number line","1.4² < 2 < 1.5², so 1.4 < √2 < 1.5","Use a square diagonal and a circle","A unit-square diagonal is √2; circumference ÷ diameter is π.","Why is 1.414 an approximation, not √2 itself?","√2 has an infinite non-recurring decimal; 1.414 is a nearby terminating rational number."),
"AC9M8N02":("Exponent Laws","Exponent laws describe repeated multiplication; they apply only when the base and operation meet the law's conditions.","Build laws from expanded products","2³×2⁴=(2×2×2)(2×2×2×2)=2⁷","Distinguish multiply, divide and power rules","aᵐaⁿ=aᵐ⁺ⁿ; aᵐ÷aⁿ=aᵐ⁻ⁿ; (aᵐ)ⁿ=aᵐⁿ; a⁰=1 for a≠0.","Which law justifies (3²)⁴=3⁸?","A power of a power multiplies the exponents: 2×4=8."),
"AC9M8N03":("Terminating and Recurring Decimals","A rational number's decimal either terminates or eventually repeats; fraction structure can predict which occurs.","Compare fraction and decimal forms","3/8=0.375; 2/11=0.181818…","Use prime factors of the denominator","In simplest form, denominators with only factors 2 and 5 terminate; other prime factors recur.","Will 7/30 terminate or recur? Explain without dividing.","It recurs because 30=2×3×5 contains a factor 3 after the fraction is simplified."),
"AC9M8N04":("Operations with Integers and Rational Numbers","Efficient calculation depends on number structure, operation order and checking sign and magnitude.","Represent signed operations","−6−(−9)=−6+9=3","Choose an efficient strategy","Use equivalence, common denominators, distributivity and estimation before or alongside digital tools.","Why is −3² different from (−3)²?","Exponentiation occurs before the leading negative: −3²=−9, while brackets make the base −3, so (−3)²=9."),
"AC9M8N05":("Modelling Rational Numbers and Percentages","A useful model identifies quantities, assumptions and operations, then interprets and reviews the result in context.","Model percentage change","$240 increased by 15%: 240×1.15=$276","Compare financial strategies","Percentage multipliers support discounts, mark-ups, profit/loss and repeated change; rounding belongs at the end.","Why does a 20% decrease not undo a 20% increase?","The percentages use different base amounts: 1.2×0.8=0.96, so the final amount is 4% below the start."),
"AC9M8A01":("Linear Expressions","Equivalent expressions can look different while producing the same value for every permitted substitution.","Connect structure and properties","3(x+4)−2x=3x+12−2x=x+12","Expand, factorise and rearrange","Distributivity links expanded and factorised forms; like terms combine only when variable parts match.","Is 4x+8 equivalent to 4(x+8)? Justify.","No. 4(x+8)=4x+32. The factorised form of 4x+8 is 4(x+2)."),
"AC9M8A02":("Linear Relations, Equations and Inequalities","Tables, graphs and algebra are connected representations of the same linear relationship.","Connect table, graph and rule","For y=2x−1, first differences are constant at 2 and plotted points form a straight line.","Solve and verify","Inverse operations preserve equality; inequality solutions form a region on a number line; substitute to check.","How can the graph verify the solution of 3x+7=6x−9?","Graph y=3x+7 and y=6x−9. Their intersection has x=16/3, which makes both expressions equal."),
"AC9M8A03":("Modelling with Linear Relations","A linear model represents constant change plus a starting value, within a stated and defensible domain.","Form a cost model","C=4.50n+12 models a $12 fixed fee plus $4.50 per item.","Choose and critique representations","Use a table for discrete cases, a graph for comparison and an equation for exact calculation; check assumptions.","What does the intercept 12 mean in C=4.50n+12?","It is the fixed cost when n=0, provided zero items is meaningful in the context."),
"AC9M8A04":("Experimenting with Linear Functions","Systematic variation reveals what coefficients and constants control in a linear relation.","Vary one parameter at a time","In y=mx+b, changing m changes steepness; changing b shifts the line vertically.","Make, test and refine conjectures","Use digital graphs and tables, test more than one case, then state the domain and any exceptions.","What stays invariant when b changes in y=3x+b?","The gradient remains 3, so all resulting lines are parallel; only the vertical intercept changes."),
"AC9M8M01":("Area and Perimeter of Composite Shapes","Composite-shape problems require a deliberate decomposition and separate attention to boundary length and enclosed area.","Decompose without overlap","Split an L-shape into two rectangles, calculate each area, then add.","Track units and missing lengths","Perimeter follows only the outside boundary; area uses square units; infer unlabelled lengths from aligned sides.","Why can two shapes have equal area but different perimeter?","Area measures enclosed surface while perimeter measures boundary; rearranging the same area can change exposed boundary length."),
"AC9M8M02":("Volume and Capacity of Right Prisms","A right prism's volume is its constant cross-sectional area multiplied by its perpendicular length.","Connect volume and capacity","V=A_cross-section×length; 1000 cm³=1 L","Solve multi-step prism problems","Find a composite cross-section first, keep dimensions compatible, then convert cubic units to capacity units.","A tank is 80% full. When should 0.8 be applied?","After finding total capacity (or equivalently to one factor); state that the result is the occupied volume, not full capacity."),
"AC9M8M03":("Circumference and Area of Circles","Radius, diameter, circumference and area are linked by d=2r, C=2πr and A=πr².","Distinguish boundary and surface","For r=6 cm, C=12π cm and A=36π cm².","Solve forward and inverse problems","Select the formula from the required measure, retain π precision, and use linear or square units correctly.","If radius doubles, what happens to circumference and area?","Circumference doubles because it is proportional to r; area quadruples because it is proportional to r²."),
"AC9M8M04":("Duration and Time Zones","Elapsed time is an interval; time-zone calculations require a signed offset and careful handling of date changes.","Use a common timeline","Convert departure and arrival to UTC or one shared zone before subtracting.","Move between 12- and 24-hour time","Separate local clock time, UTC offset and duration; note crossings of midnight and the International Date Line.","Why is subtracting displayed local times often invalid?","The clocks may use different UTC offsets and dates. Convert both moments to the same reference zone first."),
"AC9M8M05":("Rates and Unit Rates","A rate compares unlike units; a unit rate expresses the comparison per one unit and supports fair comparison.","Normalise before comparing","180 km in 3 h = 60 km/h; $14.40 for 6 kg = $2.40/kg.","Convert compound units","Use dimensional reasoning so unwanted units cancel; identify whether the relationship is proportional.","Which is faster: 5 m/s or 16 km/h?","5 m/s=18 km/h, so 5 m/s is faster. The units must match before comparison."),
"AC9M8M06":("Pythagoras’ Theorem","In a right-angled triangle, the square on the hypotenuse equals the sum of the squares on the other two sides.","Identify the hypotenuse first","For legs 6 and 8, c=√(6²+8²)=10.","Solve and interpret","Use a²+b²=c² only for right triangles; rearrange for a shorter side and round only as context requires.","Can sides 7, 8 and 10 form a right triangle?","No: 7²+8²=113, not 10²=100. The largest side must be tested as the hypotenuse."),
"AC9M8M07":("Modelling Ratios and Rates","Ratio and rate models compare quantities multiplicatively and must preserve units, assumptions and context.","Scale a multi-part ratio","In 2:3:5 with total 80, one part is 8, so quantities are 16, 24 and 40.","Model costs and performance","Use tables, double number lines, unit rates or equations; interpret and review whether proportionality is reasonable.","Why is adding the same number to both ratio terms invalid?","Equivalent ratios are created by multiplying or dividing every term by the same non-zero factor, not by equal additive change."),
"AC9M8SP01":("Congruence and Similarity","Congruent figures match exactly; similar figures preserve angles and scale every corresponding length by one factor.","Test triangle conditions","Congruence: SSS, SAS, ASA/AAS, RHS; similarity: AAA, SSS proportional, SAS proportional.","Use transformations and counterexamples","Rigid transformations preserve congruence; dilation produces similarity; correspondence order matters.","Why does AAA prove similarity but not congruence?","AAA fixes shape but not size. Triangles can share all angles while having different corresponding side lengths."),
"AC9M8SP02":("Properties of Quadrilaterals","Quadrilateral properties can be established by drawing diagonals and using congruent triangles and angle relationships.","Turn a quadrilateral into triangles","A parallelogram diagonal creates congruent triangles, establishing opposite sides and angles equal.","Build a reasoned proof chain","State givens, identify congruence conditions, then derive only properties that follow; do not rely on appearance.","How can a diagonal help prove a rhombus bisects opposite angles?","The diagonal forms two triangles with equal sides and a shared side; SSS congruence gives equal corresponding angles."),
"AC9M8SP03":("Position in Three Dimensions","A 3D coordinate system locates a point with an ordered triple referenced to three mutually perpendicular axes.","Read and plot (x,y,z)","Point P(3,−2,5) is located by x first, then y, then z.","Compare views and locations","Plans, elevations, layers and dynamic models show different projections; define origin, orientation and scale.","Why can two points share the same plan-view location?","A plan view can omit height, so points with equal x and y but different z overlap in that projection."),
"AC9M8SP04":("Algorithms for Congruence and Similarity","A geometric decision algorithm needs ordered tests, explicit conditions and outputs that work for examples and counterexamples.","Design a decision tree","Same shape and size? Test valid congruence conditions; otherwise test equal angles and a common scale factor.","Trace and debug the algorithm","Use diverse orientations, insufficient-information cases and near-matches; explain why each branch is necessary.","Why must the algorithm test corresponding order?","Mismatched correspondence can compare the wrong sides or angles and produce a false positive."),
"AC9M8ST01":("Data Collection Techniques","Census, sample, experiment and observation answer different questions and create different practical and ethical implications.","Match method to question","A census studies all members; a sample studies part; an experiment imposes a condition; observation records without intervention.","Evaluate collection quality","Consider cost, access, bias, measurement, consent, privacy and whether causal claims are justified.","When is a census still capable of bias?","If questions, non-response, measurement or coverage are flawed, collecting from the intended whole population does not remove bias."),
"AC9M8ST02":("Sampling and Data Distributions","A sample distribution supports inference only when selection and context make it reasonably representative of the population.","Compare random and non-random samples","Simple random selection gives each member a known chance; convenience selection favours easy-to-reach members.","Describe distribution, not isolated values","Compare centre, spread, shape and unusual values, and connect differences to sampling method.","Why can a large convenience sample still mislead?","Size reduces random variation but does not repair systematic selection bias."),
"AC9M8ST03":("Sampling Variation and Sample Size","Random samples from one population vary; larger samples usually produce less variable estimates, not guaranteed identical results.","Simulate repeated samples","Plot sample proportions from repeated n=20 and n=200 samples; the larger-sample distribution is typically tighter.","Separate population and sample quantities","Use repeated random sampling to study variability and avoid treating one sample result as exact.","Does doubling sample size halve sampling variation?","Not generally. Standard sampling error often changes roughly with 1/√n, so four times the sample is needed to halve it."),
"AC9M8ST04":("Statistical Investigations and Inference","A sound investigation links a clear question, population, fair sample, ethical data, appropriate analysis and cautious inference.","Plan the investigation cycle","Question → population → sample → collect → analyse → infer → report uncertainty.","Report evidence and limitations","Use transparent methods, de-identify data, distinguish association from causation and qualify population claims.","What makes an inference appropriately cautious?","It connects the claim to the sampled population and method, reports variability or limitations, and avoids certainty beyond the evidence."),
"AC9M8P01":("Complementary Events","An event and its complement cover all outcomes without overlap, so their probabilities sum to one.","Use P(Aᶜ)=1−P(A)","If P(rain)=0.35, P(no rain)=0.65.","Define the sample space carefully","Complement means ‘not A’ within the same sample space; it is not merely an opposite-sounding event.","If P(not late)=0.92, what is P(late)?","0.08, because complementary probabilities sum to 1."),
"AC9M8P02":("Representing Two Events","Two-way tables, tree diagrams and Venn diagrams organise combinations and reveal different probability relationships.","Choose a representation","Trees show sequential branches; two-way tables show paired categories; Venn diagrams show overlap.","Count without omission or duplication","Label totals, intersections and complements; use the complete sample space as the probability denominator.","In a Venn diagram, where does ‘A or B’ lie?","In the union: every outcome in A, in B, or in both. The intersection is counted once."),
"AC9M8P03":("Compound Chance Experiments and Simulations","Repeated trials estimate compound-event probabilities; relative frequency tends to stabilise with more trials but still varies.","Simulate a compound event","Two coin tosses have HH, HT, TH, TT; P(exactly one head)=2/4.","Compare experimental and theoretical probability","Use enough trials, inspect random variation, validate digital simulation rules and report results rather than promising convergence.","Why might 100 simulated trials not give exactly the theoretical probability?","Simulation is random. Relative frequency fluctuates; more trials usually reduce, but do not eliminate, sampling variation."),
}

TEACHING_SLIDES = {
    "AC9M8N01": [
        {
            "heading": "Where does π live?",
            "lead": "Irrational numbers have exact positions even though their decimals never end or repeat.",
            "visual": {"type": "numberline", "left": "3.141", "point": "π", "right": "3.142", "caption": "3.141 < π < 3.142"},
            "highlight": "A decimal bound locates π; it does not replace π.",
            "ask": "If we zoom in again, which two decimals could bound π more closely?",
            "answer": "For example, 3.1415 < π < 3.1416. Both endpoints are rational approximations; π is the exact irrational value between them.",
            "notes": {
                "teacherDoes": "Reveal 3.141 and 3.142 first, then place π between them. Zoom to the next decimal place.",
                "teacherAsks": "How can π have one exact location if its decimal never finishes?",
                "studentDoes": "Places π between successive decimal bounds and explains that the bounds are approximations.",
                "expectedEvidence": "Uses inequality notation correctly and distinguishes the exact number π from a rounded decimal.",
                "ifIncorrect": "Compare a map coordinate with a rounded coordinate: rounding changes the description, not the actual location.",
                "shortCheck": "Write a tighter pair of decimal bounds for π."
            }
        },
        {
            "heading": "Where does √2 appear?",
            "lead": "A one-unit square creates √2 on its diagonal, and A-series paper preserves a 1:√2 side ratio when folded.",
            "visual": {"type": "square-paper", "side": "1", "diagonal": "√2", "ratio": "1 : √2"},
            "highlight": "1² + 1² = d², so d = √2 ≈ 1.414.",
            "ask": "Why is the diagonal not exactly 1.4 units?",
            "answer": "Because 1.4² = 1.96, not 2. The exact diagonal is √2; 1.4 is only a one-decimal approximation.",
            "notes": {
                "teacherDoes": "Trace the two one-unit sides, then draw the diagonal. Fold the paper model to show the same long-side:short-side ratio.",
                "teacherAsks": "Which equation connects the two sides and the diagonal?",
                "studentDoes": "Labels the right triangle, applies Pythagoras and connects the exact length √2 to its decimal approximation.",
                "expectedEvidence": "States d²=2 and d=√2, with the positive root justified as a length.",
                "ifIncorrect": "Build the diagonal from a right triangle and calculate 1²+1² before taking the square root.",
                "shortCheck": "Between which two tenths does √2 lie?"
            }
        },
        {
            "heading": "Two famous irrational ratios",
            "lead": "The golden ratio appears in design, while societies have developed useful approximations for π throughout history.",
            "visual": {"type": "golden-history", "phi": "φ ≈ 1.618", "archimedes": "223/71 < π < 22/7", "egypt": "π ≈ 256/81"},
            "highlight": "Historical fractions are clever approximations, not exact equalities.",
            "ask": "Why should each historical value use ≈ or an inequality instead of =?",
            "answer": "Each value is rational, while π is irrational. A fraction can approach π closely but cannot equal it exactly.",
            "notes": {
                "teacherDoes": "Compare the golden rectangle ratio with the two historical π estimates. Keep exact and approximate notation visible.",
                "teacherAsks": "What makes an approximation useful even when it is not exact?",
                "studentDoes": "Compares the estimates, identifies the notation and explains why none is exactly π.",
                "expectedEvidence": "Recognises φ and π as irrational and interprets ≈ and < correctly.",
                "ifIncorrect": "Convert one historical fraction to a decimal and compare its digits with π≈3.14159.",
                "shortCheck": "Which is closer to π: 22/7 or 3.14? Explain how you checked."
            }
        },
        {
            "heading": "Measure π with any circle",
            "lead": "For every circle, circumference divided by diameter gives the same irrational ratio: π.",
            "visual": {"type": "circle-roll", "diameter": "d", "circumference": "C", "equation": "C ÷ d = π"},
            "highlight": "The circle changes size, but C ÷ d stays close to 3.14159…",
            "ask": "What should stay nearly constant when different circles are measured?",
            "answer": "The ratio circumference ÷ diameter. Measurement error may change the experimental decimal slightly, but the exact ratio is π.",
            "notes": {
                "teacherDoes": "Wrap string around two circular objects, straighten it, and compare each circumference with its diameter.",
                "teacherAsks": "Which measurements change, and which ratio remains invariant?",
                "studentDoes": "Measures, calculates C÷d and compares results across circles.",
                "expectedEvidence": "Explains that circumference and diameter scale together and that experimental variation comes from measurement error.",
                "ifIncorrect": "Use a table with C, d and C÷d; compare the raw measures separately from the calculated ratios.",
                "shortCheck": "A circle has C=31.4 cm and d=10 cm. Estimate C÷d."
            }
        }
    ]
}

TERMS={
"N":["representation","equivalence","estimate"],"A":["variable","relation","verify"],
"M":["unit","measurement","accuracy"],"SP":["correspondence","condition","transformation"],
"ST":["population","sample","variation"],"P":["event","sample space","probability"]}

def strand_key(code):
    return "SP" if "SP" in code else "ST" if "ST" in code else code[5]

def build():
    units={u["code"]:u for u in json.loads((ROOT/"data/curriculum-units.json").read_text())["units"] if u["code"] in T}
    assert len(units)==len(T)==27
    out={}
    for code,row in T.items():
        title,anchor,model_title,model,apply_title,apply,ask,answer=row
        u=units[code]
        out[code]=build_spec(u,title,anchor,HEADINGS[code],TEACHING_SLIDES.get(code))
    payload=json.dumps(out,ensure_ascii=False,separators=(",",":"))
    js="window.SkillrUpperMathsData="+payload+";window.SkillrYear8MathsData=window.SkillrUpperMathsData;\n"
    (ROOT/"assets/year8-maths-data.js").write_text(js)
    for code,u in units.items():
        p=ROOT/u["url"].lstrip("/")/"index.html"
        spec=out[code]
        desc=html.escape(u["description"],quote=True); title=html.escape(spec["title"],quote=True)
        page=f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>{code} {title} | Year 8 Maths Topic Guide</title><meta name="description" content="{code} Year 8 Maths topic guide: {desc}"><meta name="robots" content="index,follow"><link rel="canonical" href="https://skillrhub.com{u['url']}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/year8-maths.css?v=3"></head><body><main id="year8Topic"><p class="loading">Loading {code} topic guide…</p></main><script>window.skillrPageMeta={{curriculumCode:"{code}",pageType:"topic guide",year:"Year 8",subject:"Maths"}};</script><script src="/assets/year8-maths-data.js?v=3"></script><script src="/assets/year8-maths-render.js?v=3"></script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>'''
        p.write_text(page)
    hub=ROOT/"year8/curriculum/maths/index.html"
    hub_text=hub.read_text()
    for code in units:
        old=f'/worksheets/year8/maths/teacher-slides/{code.lower()}-teacher-slide.pdf'
        new=f'/worksheets/year8/maths/teacher-slides/live.html?code={code}'
        hub_text=hub_text.replace(old,new).replace('>Worksheet<','>Practice Sheet<')
    hub.write_text(hub_text)
    live=ROOT/"worksheets/year8/maths/teacher-slides/live.html"
    live.write_text(live.read_text().replace("?v=2","?v=3"))

if __name__=="__main__": build()
