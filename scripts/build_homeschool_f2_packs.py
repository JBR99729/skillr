#!/usr/bin/env python3
"""Build Foundation-Year 2 homeschool planner and record pack pages."""

from __future__ import annotations

import html
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
MANIFEST = ROOT / "data/curriculum-units.json"

YEARS = [
    ("foundation", "Foundation", "foundation"),
    ("year1", "Year 1", "year-1"),
    ("year2", "Year 2", "year-2"),
]
SUBJECTS = [
    ("maths", "Maths"),
    ("science", "Science"),
    ("english", "English"),
]
TEACH_SUBJECT_PATH = {"maths": "maths", "science": "science", "english": "english"}


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def read_units() -> list[dict]:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return [unit for unit in data["units"] if unit["yearFolder"] in {item[0] for item in YEARS} and unit.get("questionEligible") is not False]


def head(title: str, description: str, path: str) -> str:
    schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title,
        "url": f"{SITE}{path}",
        "description": description,
        "isPartOf": {"@type": "WebSite", "name": "SkillrHub", "url": SITE},
        "audience": {"@type": "EducationalAudience", "educationalRole": "homeschool parent"},
    }
    return f"""<head>
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
  <meta name="theme-color" content="#2457d6">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/icons/skillrhub-mark.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/assets/skillr-ux-v2.css?v=20260907-1">
  <link rel="stylesheet" href="/assets/css/homeschool.css?v=20260907-1">
  <script type="application/ld+json">{json.dumps(schema, separators=(",", ":"))}</script>
</head>"""


def nav(current: str = "Homeschool") -> str:
    return f"""<header class="site-header">
  <nav class="site-header__nav" aria-label="Main navigation">
    <a class="site-header__brand" href="/" aria-label="SkillrHub home"><img src="/icons/skillrhub-mark.svg" alt="" width="38" height="38"><strong>SkillrHub</strong> <span>F-10</span></a>
    <div class="site-header__links"><a href="/learn/">Learn</a><a href="/teach/">Teach</a><a href="/products/">Products</a><a href="/homeschooling-australia/" aria-current="page">{esc(current)}</a><a href="/worksheets/">Worksheets</a><a href="/dashboard/">Dashboard</a></div>
    <details class="site-header__menu"><summary>Menu</summary><div class="site-header__menu-panel"><a href="/learn/">Learn</a><a href="/teach/">Teach</a><a href="/products/">Products</a><a href="/homeschooling-australia/" aria-current="page">{esc(current)}</a><a href="/worksheets/">Worksheets</a><a href="/dashboard/">Dashboard</a><a href="/sitemap.html">Sitemap</a></div></details>
  </nav>
</header>"""


def footer() -> str:
    return """<footer>
  <nav class="footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/homeschooling-australia/">Homeschooling</a><a href="/homeschooling-australia/foundation/">Foundation pack</a><a href="/homeschooling-australia/year-1/">Year 1 pack</a><a href="/homeschooling-australia/year-2/">Year 2 pack</a><a href="/learn/">Learn</a><a href="/teach/">Teach</a><a href="/worksheets/">Worksheets</a></nav>
  <p>© 2026 SkillrHub. All rights reserved.</p>
</footer>"""


def teach_url(unit: dict) -> str:
    subject = TEACH_SUBJECT_PATH.get(unit["subjectSlug"], unit["subjectSlug"])
    return f"/worksheets/{unit['yearFolder']}/{subject}/teacher-slides/live.html?code={unit['code']}"


def qr_card(title: str, url: str, body: str) -> str:
    full_url = f"{SITE}{url}"
    return f"""<aside class="homeschool-qr-card">
  <div>
    <p class="ux-eyebrow">Web quiz support</p>
    <h2>{esc(title)}</h2>
    <p>{esc(body)}</p>
    <a href="{esc(url)}">{esc(full_url)}</a>
  </div>
  <div class="homeschool-qr" data-qr-url="{esc(full_url)}" aria-label="QR code for {esc(full_url)}"></div>
</aside>"""


def subject_summary_cards(year_folder: str, grouped: dict[str, list[dict]]) -> str:
    cards = []
    for slug, label in SUBJECTS:
        count = len(grouped.get(slug, []))
        cards.append(
            f"""<a class="homeschool-pack-card" href="#{esc(slug)}">
  <strong>{esc(label)}</strong>
  <span>{count} mapped skills with topic pages, quizzes, tests and worksheets</span>
</a>"""
        )
    cards.append(
        f"""<a class="homeschool-pack-card" href="/homeschooling-australia/#progress-record">
  <strong>Interactive record</strong>
  <span>Tick progress online and print the current subject checklist</span>
</a>"""
    )
    cards.append(
        f"""<a class="homeschool-pack-card" href="/{esc(year_folder)}/curriculum/">
  <strong>All subjects hub</strong>
  <span>Open the standard SkillrHub curriculum hub for this year</span>
</a>"""
    )
    return "".join(cards)


def skill_rows(units: list[dict]) -> str:
    rows = []
    for unit in units:
        rows.append(
            f"""<tr>
  <td><strong>{esc(unit["code"])}</strong><br><span>{esc(unit["description"])}</span></td>
  <td><a href="{esc(unit["url"])}">Learn</a></td>
  <td><a href="{esc(teach_url(unit))}">Teach</a></td>
  <td><a href="{esc(unit["worksheetUrl"])}">Worksheet</a></td>
  <td><a href="{esc(unit["practiceUrl"])}">Practice</a></td>
  <td><a href="{esc(unit["testUrl"])}">Test</a></td>
  <td class="print-check">□ Planned<br>□ Taught<br>□ Practised<br>□ Checked</td>
</tr>"""
        )
    return "".join(rows)


def subject_sections(grouped: dict[str, list[dict]]) -> str:
    sections = []
    for slug, label in SUBJECTS:
        units = grouped.get(slug, [])
        sections.append(
            f"""<section id="{esc(slug)}" class="homeschool-subject-pack">
  <div class="homeschool-subject-pack__head">
    <h2>{esc(label)} planner</h2>
    <a class="ux-secondary" href="/{esc(units[0]["yearFolder"] if units else "foundation")}/curriculum/{esc(slug)}/">Open {esc(label)} hub</a>
  </div>
  <div class="homeschool-table-wrap">
    <table class="homeschool-table homeschool-pack-table">
      <thead><tr><th>Curriculum skill</th><th>Learn</th><th>Teach</th><th>Worksheet</th><th>Practice</th><th>Test</th><th>Record</th></tr></thead>
      <tbody>{skill_rows(units)}</tbody>
    </table>
  </div>
</section>"""
        )
    return "".join(sections)


def year_page(year_folder: str, label: str, path_segment: str, units: list[dict]) -> str:
    grouped: dict[str, list[dict]] = defaultdict(list)
    for unit in units:
        if unit["yearFolder"] == year_folder:
            grouped[unit["subjectSlug"]].append(unit)
    total = sum(len(items) for items in grouped.values())
    path = f"/homeschooling-australia/{path_segment}/"
    quiz_url = f"/homeschooling-australia/{path_segment}/"
    description = f"Free {label} homeschool planner pack with Australian Curriculum skill links, worksheets, online practice, tests and printable progress records."
    subject_links = " ".join(f'<a href="/{year_folder}/curriculum/{slug}/">{name}</a>' for slug, name in SUBJECTS)
    return f"""<!DOCTYPE html>
<html lang="en-AU">
{head(f"{label} Homeschool Planner Pack | SkillrHub", description, path)}
<body class="home-page homeschool-page">
{nav()}
<main class="container homeschool-container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/homeschooling-australia/">Homeschooling Australia</a></li><li aria-current="page">{esc(label)} planner pack</li></ol></nav>
  <section class="homeschool-hero">
    <p class="ux-eyebrow">{esc(label)} homeschool pack</p>
    <h1>{esc(label)} homeschool planner, quizzes and printable progress record</h1>
    <p>This pack organises {total} mapped {esc(label)} Maths, Science and English skills into a parent-friendly homeschool pathway. Use the links to teach, practise, test and keep printable records without a learner login.</p>
    <div class="homeschool-actions"><button class="ux-primary" type="button" onclick="window.print()">Print this pack</button><a class="ux-secondary" href="/learn/{'foundation' if year_folder == 'foundation' else year_folder.replace('year', 'year-')}/">Open Learn hub</a><a class="ux-secondary" href="/teach/{'foundation' if year_folder == 'foundation' else year_folder.replace('year', 'year-')}/">Open Teach hub</a></div>
  </section>
  <section class="homeschool-router"><h2>Start here</h2><div class="homeschool-link-grid">{subject_summary_cards(year_folder, grouped)}</div><p class="homeschool-inline-links">Subject hubs: {subject_links}</p></section>
  {qr_card(f"Scan for {label} online quizzes", quiz_url, "Print this page for your folder, then scan the QR code to return to the live SkillrHub pack with practice quizzes, tests and worksheets.")}
  <section class="homeschool-grid">
    <article><h2>Suggested weekly rhythm</h2><ul><li>Choose 1 Maths skill, 1 English skill and 1 Science skill.</li><li>Read the topic guide or classroom view with your child.</li><li>Complete a worksheet or short practice quiz.</li><li>Use the test link as a quick check when ready.</li><li>Print or save this pack with notes beside work samples.</li></ul></article>
    <article><h2>Evidence ideas</h2><ul><li>Keep one early and one later work sample for a skill.</li><li>Add a short note: independent, supported, needs review or extended.</li><li>Record practical activities, reading, discussion and projects.</li><li>Use SkillrHub test results as one evidence source, not the only source.</li><li>Check your state or territory authority for official requirements.</li></ul></article>
  </section>
  {subject_sections(grouped)}
</main>
{footer()}
<script src="/assets/vendor/qrcode.min.js" defer></script>
<script src="/assets/homeschool-qr.js?v=20260907-1" defer></script>
</body>
</html>"""


def index_page(units: list[dict]) -> str:
    totals = {folder: sum(1 for unit in units if unit["yearFolder"] == folder) for folder, _, _ in YEARS}
    cards = "".join(
        f"""<a class="homeschool-pack-card" href="/homeschooling-australia/{segment}/">
  <strong>{esc(label)} planner pack</strong>
  <span>{totals[folder]} mapped skills with Learn, Teach, Worksheet, Practice and Test links</span>
</a>"""
        for folder, label, segment in YEARS
    )
    path = "/homeschooling-australia/foundation-year-2-planner-pack/"
    description = "Free Foundation to Year 2 homeschool planner packs with curriculum links, online quizzes, worksheets, tests and printable progress records."
    return f"""<!DOCTYPE html>
<html lang="en-AU">
{head("Foundation to Year 2 Homeschool Planner Pack | SkillrHub", description, path)}
<body class="home-page homeschool-page">
{nav()}
<main class="container homeschool-container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/homeschooling-australia/">Homeschooling Australia</a></li><li aria-current="page">Foundation-Year 2 planner pack</li></ol></nav>
  <section class="homeschool-hero">
    <p class="ux-eyebrow">Ready for tomorrow</p>
    <h1>Foundation to Year 2 homeschool planner packs</h1>
    <p>Start with the early years: free curriculum-mapped SkillrHub pages, online quizzes, worksheets, tests and printable progress records for Foundation, Year 1 and Year 2.</p>
    <div class="homeschool-actions"><a class="ux-primary" href="/homeschooling-australia/foundation/">Foundation pack</a><a class="ux-secondary" href="/homeschooling-australia/year-1/">Year 1 pack</a><a class="ux-secondary" href="/homeschooling-australia/year-2/">Year 2 pack</a></div>
  </section>
  <section class="homeschool-router"><h2>Choose a pack</h2><div class="homeschool-link-grid">{cards}</div></section>
  {qr_card("Scan for F-2 web quiz support", path, "Add this QR code to the TPT preview or printed cover so families can open the live SkillrHub quiz, test and worksheet pathways.")}
  <section class="homeschool-grid"><article><h2>What families get</h2><ul><li>Mapped Maths, Science and English skill lists.</li><li>Direct links to free topic guides, practice quizzes, tests and worksheets.</li><li>Printable checklists for homeschool records.</li><li>Simple weekly rhythm for planning.</li></ul></article><article><h2>How SkillrHub helps</h2><ul><li>No learner login or subscription is required.</li><li>Families can print progress instead of uploading private work.</li><li>Parents can use free resources even if they also use another homeschool provider.</li><li>Optional premium products can sit beside the free pathway later.</li></ul></article></section>
</main>
{footer()}
<script src="/assets/vendor/qrcode.min.js" defer></script>
<script src="/assets/homeschool-qr.js?v=20260907-1" defer></script>
</body>
</html>"""


def main() -> None:
    units = read_units()
    write = lambda path, content: (path.parent.mkdir(parents=True, exist_ok=True), path.write_text(content, encoding="utf-8"))
    write(ROOT / "homeschooling-australia" / "foundation-year-2-planner-pack" / "index.html", index_page(units))
    for folder, label, segment in YEARS:
        write(ROOT / "homeschooling-australia" / segment / "index.html", year_page(folder, label, segment, units))
    print(json.dumps({"pages": 4, "skills": len(units)}, indent=2))


if __name__ == "__main__":
    main()
