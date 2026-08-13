#!/usr/bin/env python3
"""Build Year 9 and 10 Maths topic guides and live teacher slides."""
from __future__ import annotations

import html
import json
from pathlib import Path

from upper_maths_authored import CORE, HEADINGS
from upper_maths_authoring import build_spec

ROOT = Path(__file__).resolve().parents[1]


def page_shell(unit: dict, spec: dict, year: int) -> str:
    code = unit["code"]
    title = html.escape(spec["title"], quote=True)
    description = html.escape(unit["description"], quote=True)
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
        output[code] = build_spec(unit, title, anchor, HEADINGS[code])
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
    for year in (9, 10):
        build_year(source["units"], year)


if __name__ == "__main__":
    build()
