#!/usr/bin/env python3
"""Build Year 9 and 10 Maths topic guides and live teacher slides."""
from __future__ import annotations

import html
import json
import sys
from pathlib import Path

from upper_maths_authored import AUTHORED, CORE, HEADINGS
from upper_maths_authoring import build_spec

ROOT = Path(__file__).resolve().parents[1]

YEAR9_AUTHORED_OVERRIDES = {
    "AC9M9N01": [
        {
            "heading": "Map the real number system",
            "lead": "Real numbers split into rational and irrational numbers. Natural numbers sit inside integers, which sit inside rational numbers.",
            "highlight": "Natural ⊂ Integer ⊂ Rational ⊂ Real; irrational numbers such as √2 and π are real but not rational.",
            "visual": {"type": "relationship", "label": "Natural ⊂ Integer ⊂ Rational ⊂ Real; Irrational ⊂ Real and separate from Rational"},
            "ask": "Where do 7, −3, 2/5, 0.125, √2 and π belong in the real number system?",
            "answer": "7 is natural, integer, rational and real; −3 is integer, rational and real; 2/5 and 0.125 are rational and real; √2 and π are irrational and real.",
            "notes": {"teacherDoes": "Build the nested number sets, then classify one example at a time.", "teacherAsks": "Why can one number belong to more than one set?", "studentDoes": "Classifies each number into the smallest set and all containing sets.", "expectedEvidence": "Uses the nesting Natural ⊂ Integer ⊂ Rational ⊂ Real correctly.", "ifIncorrect": "Start with the smallest set that describes the number, then move outward through the nesting.", "shortCheck": "Classify 0 and √9."}
        },
        {
            "heading": "Recognise rational and irrational decimals",
            "lead": "A rational number can be written as a fraction of integers and has a terminating or recurring decimal expansion. Irrational decimals neither terminate nor repeat in a fixed pattern.",
            "highlight": "1/8 = 0.125 and 1/3 = 0.333… are rational; √2 = 1.4142135… is irrational because its decimal is non-terminating and non-recurring.",
            "visual": {"type": "table", "label": "terminating decimal → rational | recurring decimal → rational | non-terminating non-recurring decimal → irrational"},
            "ask": "Is 0.272727… rational or irrational, and what evidence proves it?",
            "answer": "It is rational because the block 27 repeats forever; in fact 0.272727… = 3/11.",
            "notes": {"teacherDoes": "Contrast terminating, recurring and non-recurring decimal forms.", "teacherAsks": "What feature of a decimal tells you it can be rational?", "studentDoes": "Uses terminating or recurring structure as evidence rather than decimal length.", "expectedEvidence": "States that terminating and recurring decimals are rational.", "ifIncorrect": "Compare 0.333… with √2 and ask which has a repeating block.", "shortCheck": "Is 0.1010010001… rational? Explain."}
        },
        {
            "heading": "Keep exact values exact",
            "lead": "Exact notation preserves the full value. A decimal approximation is useful for measurement or reporting but introduces rounding error.",
            "highlight": "For diameter 5, circumference = 5π exactly. Using π ≈ 3.14159 gives C ≈ 15.71 to 2 d.p.; 15.71 is not equal to 5π.",
            "visual": {"type": "equation", "label": "5π exact → calculate → 15.707963… → 15.71 to 2 d.p."},
            "ask": "Why should π or √2 usually be kept exact until the final requested approximation?",
            "answer": "Rounding early discards information and can make later calculations less accurate; exact notation preserves the value until a decimal is actually required.",
            "notes": {"teacherDoes": "Run the same calculation once with π and once with 3.14, then compare the results.", "teacherAsks": "Where does rounding error first enter?", "studentDoes": "Identifies the first replacement of an exact value by a rounded decimal.", "expectedEvidence": "Distinguishes = from ≈ and delays rounding.", "ifIncorrect": "Mark every step as exact or approximate.", "shortCheck": "Which is exact: 3√5 or 6.708?"}
        },
        {
            "heading": "Locate √2 on the real number line",
            "lead": "The diagonal of a 1-by-1 square has length √2, so geometry gives an exact way to place √2 on a number line.",
            "highlight": "A unit square has diagonal √(1²+1²)=√2. Transfer that diagonal length with an arc from 0 to locate √2 between 1 and 2.",
            "visual": {"type": "numberline", "label": "1 < √2 < 2; unit-square diagonal transferred to the number line"},
            "ask": "Without a calculator, how can you justify that √2 lies between 1 and 2?",
            "answer": "Because 1² < 2 < 2², taking positive square roots gives 1 < √2 < 2; the unit-square construction locates the exact length geometrically.",
            "notes": {"teacherDoes": "Draw a unit square, its diagonal, then transfer the diagonal length to the number line.", "teacherAsks": "Why is the point exact even though its decimal is non-terminating?", "studentDoes": "Links the Pythagorean length √2 to its number-line position.", "expectedEvidence": "Uses 1² < 2 < 2² and the geometric construction.", "ifIncorrect": "Compare squares of the neighbouring integers.", "shortCheck": "Between which integers does √7 lie?"}
        },
        {
            "heading": "Use real numbers in unfamiliar problems",
            "lead": "Choose exact or approximate form to suit the question, then check that the final representation and accuracy make sense.",
            "highlight": "Area of a circle with radius 2.5: A = π(2.5)² = 6.25π exactly ≈ 19.63 square units to 2 d.p.",
            "visual": {"type": "equation", "label": "substitute exact values → simplify exact form → approximate once if requested → state accuracy"},
            "ask": "A question asks for an exact answer and then a value to 2 decimal places. What should your working look like?",
            "answer": "Keep the exact form through the algebra, state it first, then evaluate and round once at the end using ≈ and the requested accuracy.",
            "notes": {"teacherDoes": "Model exact-to-approximate working with a formula and explicitly distinguish = from ≈.", "teacherAsks": "Which line should contain the first rounded value?", "studentDoes": "Substitutes, simplifies exactly, approximates once and labels the accuracy.", "expectedEvidence": "Shows an exact result followed by a correctly rounded approximation.", "ifIncorrect": "Return to the first decimal in the working and replace it with the exact value.", "shortCheck": "Give exact and 2 d.p. values for 4√3."}
        }
    ]
}


def page_shell(unit: dict, spec: dict, year: int) -> str:
    code = unit["code"]
    title = html.escape(spec["title"], quote=True)
    description = html.escape(
        "Year 10 exact surds and decimal approximations: simplify entire surds, combine like surds, avoid rounding error and apply AC9M10N01."
        if code == "AC9M10N01" else unit["description"],
        quote=True,
    )
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>{code} {title} | Year {year} Maths Topic Guide</title><meta name="description" content="{code} Year {year} Maths topic guide: {description}"><meta name="robots" content="index,follow"><link rel="canonical" href="https://skillrhub.com{unit['url']}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/year8-maths.css?v=3"></head><body><main id="year8Topic"><p class="loading">Loading {code} topic guide…</p></main><script>window.skillrPageMeta={{curriculumCode:"{code}",pageType:"topic guide",year:"Year {year}",subject:"Maths"}};</script><script src="/assets/year{year}-maths-data.js?v=3"></script><script src="/assets/year8-maths-render.js?v=3"></script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>'''


def slide_shell(year: int) -> str:
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Year {year} Maths Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/assets/year8-maths.css?v=3"><link rel="stylesheet" href="/assets/year8-maths-slides.css?v=3"></head><body class="slide-page"><a class="back" id="backLink" href="/year{year}/curriculum/maths/">Back to topic</a><main id="slideRoot"><p>Loading teacher slides…</p></main><script src="/assets/year{year}-maths-data.js?v=3"></script><script src="/assets/year8-maths-slides.js?v=3"></script></body></html>'''


def build_year(all_units: list[dict], year: int) -> None:
    units = {u["code"]: u for u in all_units if u.get("subject") == "Mathematics" and u.get("yearNumber") == year}
    expected = {9: 23, 10: 21}[year]
    assert len(units) == expected
    output = {}
    for code, unit in units.items():
        title, anchor = CORE[code]
        authored = YEAR9_AUTHORED_OVERRIDES.get(code) or AUTHORED.get(code)
        output[code] = build_spec(unit, title, anchor, HEADINGS[code], authored)
        spec = output[code]
        slides = spec["teachingSlides"]
        first = slides[0]
        last = slides[-1]
        spec["successCriteria"] = [
            f"Explain the central relationship in {title.lower()} using correct mathematical language.",
            f"Apply the worked methods for {first['heading'].lower()} and {last['heading'].lower()} to unfamiliar examples.",
            "Show enough mathematical working that another student can follow the method.",
            "Check the result using substitution, estimation, an inverse operation or another representation.",
        ]
        spec["workedExamples"] = [
            {"title": slide["heading"], "example": slide["highlight"], "teacherLanguage": slide["ask"], "answer": slide["answer"]}
            for slide in slides
        ]
        notes = [anchor] + [slide["highlight"] for slide in slides]
        spec["revisionNotes"] = list(dict.fromkeys(notes))[:8]
        questions = [
            {"question": f"What is the central idea in {title}?", "answer": anchor},
            *[{"question": slide["ask"], "answer": slide["answer"]} for slide in slides],
        ]
        if len(questions) < 8:
            questions.extend([
                {"question": "How can you check that your answer is reasonable without simply repeating the same calculation?", "answer": "Use an independent check such as estimation, substitution, an inverse operation, a graph, a table or another representation appropriate to the problem."},
                {"question": "What is one common error a student could make in this topic, and how would you correct it?", "answer": "Name a specific misconception from the topic, identify the mathematical relationship it breaks, then redo the step using the correct relationship."},
                {"question": "How would you explain the method to a student who has never seen this type of problem before?", "answer": "State what is known, identify the relationship or rule that connects the quantities, apply it one step at a time, and finish by checking the result."},
            ])
        spec["importantQuestions"] = questions[:10]

    payload = json.dumps(output, ensure_ascii=False, separators=(",", ":"))
    (ROOT / f"assets/year{year}-maths-data.js").write_text(f"window.SkillrUpperMathsData={payload};\n")
    for code, unit in units.items():
        topic = ROOT / unit["url"].lstrip("/") / "index.html"
        topic.parent.mkdir(parents=True, exist_ok=True)
        topic.write_text(page_shell(unit, output[code], year))
    slide_path = ROOT / f"worksheets/year{year}/maths/teacher-slides/live.html"
    slide_path.parent.mkdir(parents=True, exist_ok=True)
    slide_path.write_text(slide_shell(year))
    hub = ROOT / f"year{year}/curriculum/maths/index.html"
    hub_text = hub.read_text()
    for code in units:
        hub_text = hub_text.replace(
            f'/worksheets/year{year}/maths/teacher-slides/{code.lower()}-teacher-slide.pdf',
            f'/worksheets/year{year}/maths/teacher-slides/live.html?code={code}',
        )
    hub_text = hub_text.replace('target="_blank" rel="noopener">Teacher slide</a>', '>Teacher slides</a>')
    hub_text = hub_text.replace('>Worksheet</a>', '>Practice Sheet</a>')
    hub.write_text(hub_text)


def build() -> None:
    source = json.loads((ROOT / "data/curriculum-units.json").read_text())
    requested = next((int(arg.split("=", 1)[1]) for arg in sys.argv[1:] if arg.startswith("--year=")), None)
    if requested not in (None, 9, 10):
        raise ValueError("Use --year=9 or --year=10")
    for year in ((requested,) if requested else (9, 10)):
        build_year(source["units"], year)


if __name__ == "__main__":
    build()
