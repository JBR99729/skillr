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
        output[code] = build_spec(unit, title, anchor, HEADINGS[code], AUTHORED.get(code))
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

        # Every curriculum elaboration is a student-facing worked model.  The old
        # first/last-only rule made pages look complete while omitting most of the
        # actual learning sequence.
        spec["workedExamples"] = [
            {
                "title": slide["heading"],
                "example": slide["highlight"],
                "teacherLanguage": slide["ask"],
                "answer": slide["answer"],
            }
            for slide in slides
        ]

        # Revision notes must cover the full learning progression rather than just
        # repeat the anchor and two end points.
        notes = [anchor] + [slide["highlight"] for slide in slides]
        spec["revisionNotes"] = list(dict.fromkeys(notes))[:8]

        # A useful topic page needs enough retrieval practice to check mastery.
        # Keep the central-concept question, then turn each authored teaching check
        # into an explicit Q&A. Add transfer/check questions where fewer than eight
        # authored prompts exist.
        questions = [
            {"question": f"What is the central idea in {title}?", "answer": anchor},
            *[
                {"question": slide["ask"], "answer": slide["answer"]}
                for slide in slides
            ],
        ]
        if len(questions) < 8:
            questions.extend([
                {
                    "question": "How can you check that your answer is reasonable without simply repeating the same calculation?",
                    "answer": "Use an independent check such as estimation, substitution, an inverse operation, a graph, a table or another representation appropriate to the problem.",
                },
                {
                    "question": "What is one common error a student could make in this topic, and how would you correct it?",
                    "answer": "Name a specific misconception from the topic, identify the mathematical relationship it breaks, then redo the step using the correct relationship.",
                },
                {
                    "question": "How would you explain the method to a student who has never seen this type of problem before?",
                    "answer": "State what is known, identify the relationship or rule that connects the quantities, apply it one step at a time, and finish by checking the result.",
                },
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
