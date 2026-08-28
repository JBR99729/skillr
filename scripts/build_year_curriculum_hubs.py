#!/usr/bin/env python3
"""Build compact curriculum gateways and subject hubs for Foundation–Year 10."""

from __future__ import annotations

import argparse
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
GA_ID = "G-8P22BET45N"
ADSENSE = "ca-pub-7734963540104771"
MANIFEST = ROOT / "data/curriculum-units.json"
SUBJECTS = (
    ("Mathematics", "maths", "Maths"),
    ("Science", "science", "Science"),
    ("English", "english", "English"),
)

YEAR3_MATHS_DISPLAY_TITLES = {
    "AC9M3N01": "Numbers beyond 10,000",
    "AC9M3N02": "Unit fractions and completing a whole",
    "AC9M3N03": "Addition and subtraction with place value",
    "AC9M3N04": "Multiplication and division strategies",
    "AC9M3N05": "Estimation and checking reasonableness",
    "AC9M3N06": "Mathematical modelling with practical and money problems",
    "AC9M3N07": "Number algorithms and patterns",
    "AC9M3A01": "Addition and subtraction as inverse operations",
    "AC9M3A02": "Mental addition and subtraction strategies",
    "AC9M3A03": "Multiplication and division facts: 3, 4, 5 and 10",
    "AC9M3M01": "Choosing metric units and estimating measurements",
    "AC9M3M02": "Measuring length, mass and capacity",
    "AC9M3M03": "Time units and duration",
    "AC9M3M04": "Analog and digital time to the nearest minute",
    "AC9M3M05": "Angles and turns",
    "AC9M3M06": "Dollars and cents",
    "AC9M3SP01": "Classifying objects by features and uses",
    "AC9M3SP02": "Maps, landmarks and relative position",
    "AC9M3ST01": "Collecting and recording data",
    "AC9M3ST02": "Creating and comparing graphs",
    "AC9M3ST03": "Statistical investigations",
    "AC9M3P01": "Chance: likely, unlikely, certain and impossible",
    "AC9M3P02": "Repeated chance experiments and variation",
}


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def display_title(unit: dict) -> str:
    code = unit["code"]
    if code in YEAR3_MATHS_DISPLAY_TITLES:
        return YEAR3_MATHS_DISPLAY_TITLES[code]
    if code.startswith("AC9MF"):
        return unit["title"]
    if code == "AC9M10P01":
        return "Conditional probability language: if-then, given, of and knowing that"
    description = str(unit.get("description") or unit.get("title") or "").strip().rstrip(" .")
    return description[:1].upper() + description[1:]


def head(title: str, description: str, path: str) -> str:
    return f'''<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-adsense-account" content="{ADSENSE}">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{SITE}{path}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{SITE}{path}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#1a3a72">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/assets/curriculum.css?v=3">
  <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","{GA_ID}");</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE}" crossorigin="anonymous"></script>
</head>'''


def nav(label: str, year_folder: str, current: str, subject: str | None = None) -> str:
    year_url = f"/{year_folder}/"
    curriculum_url = f"/{year_folder}/curriculum/"
    subject_crumb = f'<li aria-current="page">{esc(subject)}</li>' if subject else ""
    curriculum_crumb = (
        f'<li><a href="{curriculum_url}">Curriculum</a></li>'
        if subject
        else '<li aria-current="page">Curriculum</li>'
    )
    return f'''<nav class="main-nav" aria-label="Main navigation"><a href="/">Home</a><a href="{curriculum_url}">Curriculum</a><a href="/how-to-use-skillr.html">User guide</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="{year_url}">{esc(label)}</a></li>{curriculum_crumb}{subject_crumb}</ol></nav>'''


def teacher_slide_url(unit: dict) -> str:
    """Return the live slide route that actually exists for this topic.

    Static HTML decks take precedence. Embedded decks are used only when the
    topic page contains the matching anchor. This prevents stale manifest URLs
    from generating curriculum-card links to missing fragments.
    """
    topic_url = str(unit["url"]).rstrip("/") + "/"
    topic_dir = ROOT / topic_url.lstrip("/")
    static_deck = topic_dir / "teacher-slides" / "index.html"
    topic_page = topic_dir / "index.html"

    if static_deck.exists():
        return topic_url + "teacher-slides/"

    if topic_page.exists():
        topic_html = topic_page.read_text(encoding="utf-8", errors="ignore")
        if 'id="teacher-slide"' in topic_html or "id='teacher-slide'" in topic_html:
            return topic_url + "#teacher-slide"

    return str(unit["teacherSlideUrl"])


def action_links(unit: dict) -> str:
    return f'''<div class="unit-action-row">
  <a class="primary" href="{esc(unit['url'])}">Topic guide</a>
  <a href="{esc(teacher_slide_url(unit))}" target="_blank" rel="noopener">Teacher slide</a>
  <a href="{esc(unit['worksheetUrl'])}">Worksheet</a>
  <a href="{esc(unit['practiceUrl'])}">Practice</a>
  <a href="{esc(unit['testUrl'])}">Test</a>
  <a href="{esc(unit.get('quizUrl') or unit['testUrl'].replace('/test/', '/quiz/'))}">Quiz</a>
</div>'''


def unit_card(unit: dict) -> str:
    eligible = sum(1 for item in unit.get("elaborations", []) if item.get("questionEligible"))
    coverage = len(unit.get("questionCoverage", []))
    return f'''<article class="curriculum-unit-card">
  <span class="curriculum-live-badge">Live</span>
  <span class="curriculum-badge">{esc(unit['code'])}</span>
  <h3>{esc(display_title(unit))}</h3>
  <p class="unit-context">{esc(unit['strand'])}{' · ' + esc(unit['subStrand']) if unit.get('subStrand') else ''}</p>
  <div class="unit-meta"><span class="curriculum-chip">{eligible} elaborations</span><span class="curriculum-chip">{coverage} coverage points</span></div>
  {action_links(unit)}
</article>'''


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def build_curriculum_hubs(units: list[dict]) -> None:
    year_groups: dict[int, list[dict]] = {}
    for unit in units:
        year_groups.setdefault(unit["yearNumber"], []).append(unit)

    for year_number in sorted(year_groups):
        year_units = year_groups[year_number]
        sample = year_units[0]
        label = sample["levelLabel"]
        year_folder = sample["yearFolder"]
        curriculum_path = f"/{year_folder}/curriculum/"
        counts = {
            name: sum(1 for item in year_units if item["learningArea"] == name)
            for name, _, _ in SUBJECTS
        }
        tiles = "".join(
            f'''<a class="subject-tile" href="{curriculum_path}{slug}/"><span class="curriculum-badge">{counts[name]} units</span><h2>{subject_label}</h2><p>Browse {label} {subject_label} topic guides, teacher slides, worksheets, practice and tests.</p><span class="curriculum-button primary">Open {subject_label}</span></a>'''
            for name, slug, subject_label in SUBJECTS
        )
        description = (
            f"Choose {label} Maths, Science or English curriculum units with topic guides, "
            "teacher slides, worksheets, practice and tests."
        )
        landing = f'''<!DOCTYPE html>
<html lang="en-AU">
{head(f"{label} Curriculum | Maths, Science and English", description, curriculum_path)}
<body class="curriculum-shell"><div class="curriculum-page">
{nav(label, year_folder, "Curriculum")}
<header class="curriculum-hero"><p class="curriculum-eyebrow">{esc(label)} learning hub</p><h1>Choose a {esc(label)} subject</h1><p class="curriculum-hero__lead">Open one subject to browse complete curriculum units. Every Live unit includes a topic guide, teacher slide, worksheet, Practice and Test.</p><a class="curriculum-button" href="/how-to-use-skillr.html">How to use this hub</a></header>
<section class="subject-tile-grid" aria-label="{esc(label)} subjects">{tiles}</section>
<section class="curriculum-panel"><h2>What the labels mean</h2><p><strong>Elaborations</strong> are curriculum examples showing how a skill may be taught. <strong>Coverage points</strong> count the main description and eligible elaborations covered by the unit.</p></section>
</div><script src="/pwa-register.js"></script></body></html>'''
        write(ROOT / year_folder / "curriculum" / "index.html", landing)

        for name, slug, subject_label in SUBJECTS:
            subject_units = [item for item in year_units if item["learningArea"] == name]
            subject_path = f"{curriculum_path}{slug}/"
            subject_description = (
                f"Browse {label} {subject_label} curriculum units with complete topic guides, "
                "teacher slides, worksheets, practice, tests and quizzes."
            )
            cards = "".join(unit_card(item) for item in subject_units)
            page = f'''<!DOCTYPE html>
<html lang="en-AU">
{head(f"{label} {subject_label} Curriculum Units | SkillrHub", subject_description, subject_path)}
<body class="curriculum-shell"><div class="curriculum-page">
{nav(label, year_folder, subject_label, subject_label)}
<header class="curriculum-hero"><p class="curriculum-eyebrow">{esc(label)} {esc(subject_label)}</p><h1>{esc(label)} {esc(subject_label)} curriculum units</h1><p class="curriculum-hero__lead">Choose a unit below. Every green Live label marks a complete path from teaching and printable resources to student Practice and Test.</p><div class="curriculum-actions"><a class="curriculum-button" href="{curriculum_path}">All {esc(label)} subjects</a><a class="curriculum-button" href="/how-to-use-skillr.html">User guide</a></div></header>
<section class="curriculum-panel"><p><strong>Elaborations</strong> are curriculum teaching examples. <strong>Coverage points</strong> show how many curriculum ideas guide the unit.</p><div class="unit-matrix">{cards}</div></section>
</div><script src="/pwa-register.js"></script></body></html>'''
            write(ROOT / year_folder / "curriculum" / slug / "index.html", page)


def build_missing_year_homes(units: list[dict]) -> None:
    samples = {unit["yearNumber"]: unit for unit in units}
    for year_number, sample in sorted(samples.items()):
        year_folder = sample["yearFolder"]
        output = ROOT / year_folder / "index.html"
        if output.exists():
            continue
        label = sample["levelLabel"]
        year_path = f"/{year_folder}/"
        curriculum_path = f"/{year_folder}/curriculum/"
        tiles = "".join(
            f'''<a class="subject-tile" href="{curriculum_path}{slug}/"><h2>{subject_label}</h2><p>Open {label} {subject_label} curriculum units.</p><span class="curriculum-button primary">Browse {subject_label}</span></a>'''
            for _, slug, subject_label in SUBJECTS
        )
        description = f"Free {label} curriculum topic guides, teacher slides, worksheets, practice and tests."
        page = f'''<!DOCTYPE html>
<html lang="en-AU">
{head(f"{label} Learning Resources | SkillrHub", description, year_path)}
<body class="curriculum-shell"><div class="curriculum-page">
<nav class="main-nav" aria-label="Main navigation"><a href="/">Home</a><a href="{curriculum_path}">Curriculum</a><a href="/how-to-use-skillr.html">User guide</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">{esc(label)}</li></ol></nav>
<header class="curriculum-hero"><p class="curriculum-eyebrow">{esc(label)} learning resources</p><h1>{esc(label)} topic guides and activities</h1><p class="curriculum-hero__lead">Choose Maths, Science or English to open complete curriculum learning paths.</p><div class="curriculum-actions"><a class="curriculum-button primary" href="{curriculum_path}">Open {esc(label)} curriculum</a><a class="curriculum-button" href="/how-to-use-skillr.html">User guide</a></div></header>
<section class="subject-tile-grid" aria-label="{esc(label)} subjects">{tiles}</section>
</div><script src="/pwa-register.js"></script></body></html>'''
        write(output, page)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--min-year", type=int, default=0, choices=range(0, 11), help="Lowest year to regenerate")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    units = [unit for unit in data["units"] if unit["yearNumber"] >= args.min_year]
    build_curriculum_hubs(units)
    build_missing_year_homes(units)
    print(json.dumps({"years": len({unit['yearNumber'] for unit in units}), "units": len(units)}, indent=2))


if __name__ == "__main__":
    main()
