#!/usr/bin/env python3
"""Build compact year and subject curriculum hubs from the checked-in manifest."""

from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
MANIFEST = ROOT / "data" / "curriculum-units.json"
SUBJECTS = (("Mathematics", "maths", "Maths"), ("Science", "science", "Science"), ("English", "english", "English"))


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def head(title: str, description: str, path: str) -> str:
    return f'''<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{SITE}{path}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{SITE}{path}">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/assets/curriculum.css?v=2">
</head>'''


def nav(current: str) -> str:
    return f'''<nav class="main-nav"><a href="/">Home</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/how-to-use-skillr.html">User guide</a></nav>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year1/">Year 1</a></li><li aria-current="page">{esc(current)}</li></ol></nav>'''


def action_links(unit: dict) -> str:
    live = unit["code"] == "AC9M1N01"
    topic = unit["url"]
    if live:
        teacher = "/worksheets/year1/maths/year-1-numbers-to-120/ac9m1n01-teacher-slide.pdf"
        worksheet = "/quiz/year-1/math/ac9m1n01/worksheet/"
        practice = "/quiz/year-1/math/ac9m1n01/practice/"
        test = "/quiz/year-1/math/ac9m1n01/test/"
        return f'''<div class="unit-action-row"><a class="primary" href="{topic}">Topic guide</a><a href="{teacher}">Teacher slide</a><a href="{worksheet}">Worksheet</a><a href="{practice}">Practice</a><a href="{test}">Test</a></div>'''
    return f'''<div class="unit-action-row"><a class="primary" href="{topic}">Topic guide</a></div>'''


def unit_card(unit: dict) -> str:
    live = '<span class="curriculum-live-badge">Live</span>' if unit["code"] == "AC9M1N01" else ""
    eligible = sum(1 for item in unit.get("elaborations", []) if item.get("questionEligible"))
    coverage = len(unit.get("questionCoverage", []))
    return f'''<article class="curriculum-unit-card">{live}<span class="curriculum-badge">{esc(unit['code'])}</span><h3>{esc(unit['title'])}</h3><p>{esc(unit['description'])}</p><div class="unit-meta"><span class="curriculum-chip">{eligible} elaborations</span><span class="curriculum-chip">{coverage} coverage points</span></div>{action_links(unit)}</article>'''


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    units = [item for item in data["units"] if item["level"] == "Year 1"]
    counts = {name: sum(1 for item in units if item["learningArea"] == name) for name, _, _ in SUBJECTS}
    cards = "".join(f'''<a class="subject-tile" href="/year1/curriculum/{slug}/"><span class="curriculum-badge">{counts[name]} units</span><h2>{label}</h2><p>Browse Year 1 {label} topic guides and open completed worksheets, practice and tests.</p><span class="curriculum-button primary">Open {label}</span></a>''' for name, slug, label in SUBJECTS)
    landing_path = "/year1/curriculum/"
    landing = f'''<!DOCTYPE html><html lang="en-AU">{head("Year 1 Curriculum | Maths, Science and English", "Choose Year 1 Maths, Science or English curriculum units, topic guides, worksheets, practice and tests.", landing_path)}<body class="curriculum-shell"><div class="curriculum-page">{nav("Curriculum")}<header class="curriculum-hero"><p class="curriculum-eyebrow">Year 1 learning hub</p><h1>Choose a Year 1 subject</h1><p class="curriculum-hero__lead">Open one subject to browse its curriculum units. Completed units are marked <strong>Live</strong>.</p><a class="curriculum-button" href="/how-to-use-skillr.html">How to use this hub</a></header><section class="subject-tile-grid" aria-label="Year 1 subjects">{cards}</section><section class="curriculum-panel"><h2>What the labels mean</h2><p><strong>Elaborations</strong> are curriculum examples showing how a skill may be taught. <strong>Coverage points</strong> count the main content description and eligible elaborations that the question bank covers.</p></section></div><script src="/pwa-register.js"></script></body></html>'''
    write(ROOT / "year1/curriculum/index.html", landing)

    for name, slug, label in SUBJECTS:
        subject_units = [item for item in units if item["learningArea"] == name]
        path = f"/year1/curriculum/{slug}/"
        page = f'''<!DOCTYPE html><html lang="en-AU">{head(f"Year 1 {label} Curriculum Units | SkillrHub", f"Browse Year 1 {label} curriculum units with topic guides and completed worksheets, practice and tests.", path)}<body class="curriculum-shell"><div class="curriculum-page">{nav(label)}<header class="curriculum-hero"><p class="curriculum-eyebrow">Year 1 {label}</p><h1>Year 1 {label} curriculum units</h1><p class="curriculum-hero__lead">Choose a unit below. A green Live label means its complete learning path is ready.</p><div class="curriculum-actions"><a class="curriculum-button" href="/year1/curriculum/">All Year 1 subjects</a><a class="curriculum-button" href="/how-to-use-skillr.html">User guide</a></div></header><section class="curriculum-panel"><p><strong>Elaborations</strong> are curriculum teaching examples. <strong>Coverage points</strong> show how many curriculum ideas the completed question bank must address.</p><div class="unit-matrix">{''.join(unit_card(item) for item in subject_units)}</div></section></div><script src="/pwa-register.js"></script></body></html>'''
        write(ROOT / f"year1/curriculum/{slug}/index.html", page)


if __name__ == "__main__":
    main()
