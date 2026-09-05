#!/usr/bin/env python3
"""Build compact curriculum gateways and subject hubs for Foundation–Year 10."""

from __future__ import annotations

import argparse
import html
import json
import re
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

FOUNDATION_MATHS_COPY = {
    "AC9MFN01": ("Numbers to 20", "Name, show and put numbers from 0 to 20 in order.", "12 comes after 11 and before 13."),
    "AC9MFN02": ("Recognise quantities to 5 without counting", "See a small group and know how many objects there are straight away.", "Four dots can be recognised as 4 without counting one by one."),
    "AC9MFN03": ("Count and compare groups to 20", "Count collections and decide which has more, fewer or the same number.", "A group of 12 has more objects than a group of 8."),
    "AC9MFN04": ("Make and split numbers to 10", "Explore the smaller parts that combine to make a whole number.", "7 can be split into 5 and 2, or 4 and 3."),
    "AC9MFN05": ("Model adding and taking away", "Use objects, drawings and numbers to show quantities joining or separating.", "5 birds and 2 more birds make 7 birds."),
    "AC9MFN06": ("Share and group objects equally", "Make fair shares and equal groups, then check each group has the same amount.", "Share 8 counters between 4 people: each receives 2."),
    "AC9MFA01": ("Copy and continue repeating patterns", "Spot the part that repeats, copy it and work out what comes next.", "Red, blue, red, blue … comes next with red."),
    "AC9MFM01": ("Compare length, mass, capacity and time", "Compare everyday objects and events, then explain the result.", "Line up two objects at the same starting point to compare length."),
    "AC9MFM02": ("Days of the week and times of day", "Put days and familiar daily events in order using everyday time language.", "Breakfast is in the morning; dinner is usually in the evening."),
    "AC9MFSP01": ("Sort, name and make shapes", "Recognise familiar shapes, describe their features and sort or create them.", "A triangle has 3 straight sides and 3 corners."),
    "AC9MFSP02": ("Describe position and location", "Use position words to explain where people and objects are.", "The ball is under the chair and beside the bag."),
    "AC9MFST01": ("Collect, sort and compare data", "Collect objects or images, sort them into groups and compare the results.", "Sort class pets into cats, dogs and other animals, then find the largest group."),
}

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

CURRICULUM_CARD_TITLE_OVERRIDES = {
    "AC9E1LE05": "Retell or adapt a familiar story through speaking, role-play, writing, drawing or digital tools",
    "AC9E2LY02": "Interaction skills: listening, instructions, ideas and opinions",
    "AC9E3LY05": "Comprehension strategies for literal, inferred and evaluated meaning",
    "AC9E4LA06": "Complex sentences: independent and dependent clauses",
    "AC9E5LE01": "Literary texts in historical, social and cultural contexts",
    "AC9E6LY02": "Formal and informal interaction skills for discussing and evaluating ideas",
    "AC9E6LY05": "Comprehension strategies to connect and compare sources",
    "AC9E6LY09": "Word origins, roots, prefixes, suffixes and spelling patterns",
    "AC9E8LA03": "How purpose shapes text structure, language features and hybrid genres",
    "AC9E10LE01": "How literary representations reflect historical, social and cultural contexts",
    "AC9E10LY07": "Spoken and multimodal presentations using rhetorical devices and developed ideas",
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


def strip_html(value: str) -> str:
    value = re.sub(r"<script\b[\s\S]*?</script>", " ", value, flags=re.I)
    value = re.sub(r"<style\b[\s\S]*?</style>", " ", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    return " ".join(html.unescape(value).split())


def first_match(source: str, patterns: tuple[str, ...]) -> str:
    for pattern in patterns:
        match = re.search(pattern, source, flags=re.I | re.S)
        if match:
            value = strip_html(match.group(1))
            if value:
                return value
    return ""


def concise(value: str, limit: int) -> str:
    value = " ".join(value.split()).strip(" .")
    if len(value) <= limit:
        return value
    clipped = value[: limit + 1].rsplit(" ", 1)[0].rstrip(" ,;:")
    return f"{clipped}…"


def curriculum_card_title(value: str) -> str:
    """Return a complete, compact skill label without mid-phrase clipping."""
    value = " ".join(value.split()).strip(" .")
    if len(value) <= 190:
        return value

    # Long curriculum descriptions commonly put the central skill first and
    # then add assessment/context qualifiers. Remove only at grammatical
    # boundaries so the visible title remains a complete proposition.
    boundaries = (
        r";",
        r",\s+(?=using|selecting|analysing|analyzing|organising|organizing|applying|"
        r"evaluating|experimenting|acknowledging|drawn|and\s+(?:use|apply|analyse|analyze|evaluate|create|"
        r"construct|compare|report|justify|organise|organize|develop|select)\b)",
        r"\s+(?=in\s+ways\s+that\b)",
        r"\s+(?=including\b|using\b|with\s+respect\s+to\b|depending\s+on\b|"
        r"when\s+(?:listening|viewing|reading)\b|by\s+(?:engaging|drawing)\b|"
        r"to\s+(?:record|organise|organize|fluently\s+read)\b)",
    )
    for boundary in boundaries:
        match = re.search(boundary, value, flags=re.I)
        if match and match.start() >= 45:
            candidate = value[: match.start()].rstrip(" ,;:")
            if candidate:
                return candidate

    return value


def topic_card_copy(unit: dict) -> tuple[str, str, str]:
    """Reuse published, code-specific copy without authoring new curriculum content."""
    code = str(unit["code"])
    if code in FOUNDATION_MATHS_COPY:
        return FOUNDATION_MATHS_COPY[code]

    subject_dir = ROOT / str(unit["yearFolder"]) / str(unit["subjectSlug"])
    topic_files = sorted(subject_dir.glob(f"{code.lower()}*/index.html"))
    canonical = ROOT / str(unit["url"]).lstrip("/") / "index.html"
    if canonical.exists() and canonical not in topic_files:
        topic_files.insert(0, canonical)
    sources = [(file, file.read_text(encoding="utf-8", errors="ignore")) for file in topic_files]
    heading_candidates = []
    for file, source in sources:
        heading = first_match(source, (r"<h1\b[^>]*>([\s\S]*?)</h1>",))
        heading = re.sub(rf"^{re.escape(code)}\s*[:—–-]?\s*", "", heading, flags=re.I)
        heading = re.sub(rf"\s*[—–-]\s*{re.escape(code)}$", "", heading, flags=re.I)
        if heading:
            heading_candidates.append((len(heading), file, source, heading))
    _, _, source, heading = min(heading_candidates, default=(0, canonical, "", display_title(unit)), key=lambda item: item[0])
    heading = re.sub(rf"^{re.escape(code)}\s*[:—–-]?\s*", "", heading, flags=re.I)
    heading = re.sub(rf"\s*[—–-]\s*{re.escape(code)}$", "", heading, flags=re.I)
    # Never clip a curriculum-card heading mid-idea. A complete published
    # heading is preferable to a mechanically shortened title that drops the
    # words distinguishing one skill from another.
    title = CURRICULUM_CARD_TITLE_OVERRIDES.get(code, curriculum_card_title(heading))

    summary = first_match(source, (
        r'<p\b[^>]*class="[^"]*(?:curriculum|static-topic)-hero__lead[^"]*"[^>]*>([\s\S]*?)</p>',
        r'<details\b[^>]*(?:id="learn"|open)[^>]*>[\s\S]*?<div\b[^>]*class="[^"]*curriculum-detail-body[^"]*"[^>]*>\s*<p\b[^>]*>([\s\S]*?)</p>',
    ))
    if not summary:
        summary = str(unit.get("description") or heading)
    summary = concise(summary, 170)

    example = first_match(source, (
        r'<article\b[^>]*class="[^"]*curriculum-worked-example[^"]*"[^>]*>[\s\S]*?<li\b[^>]*>([\s\S]*?)</li>',
        r'<article\b[^>]*class="[^"]*curriculum-worked-example[^"]*"[^>]*>[\s\S]*?<p\b[^>]*>([\s\S]*?)</p>',
        r'<div\b[^>]*class="[^"]*example-card[^"]*"[^>]*>[\s\S]*?<p\b[^>]*>([\s\S]*?)</p>',
        r'<div\b[^>]*class="[^"]*mini-visual[^"]*"[^>]*>[\s\S]*?<p\b[^>]*>([\s\S]*?)</p>',
    ))
    teacher_file = topic_files[0].parent / "teacher-slides" / "index.html" if topic_files else None
    teacher = teacher_file.read_text(encoding="utf-8", errors="ignore") if teacher_file and teacher_file.exists() else ""
    if (not summary or summary.casefold() == str(unit.get("description") or "").casefold()) and teacher:
        teacher_summary = first_match(teacher, (
            r'<details\b[^>]*>[\s\S]*?<summary>[\s\S]*?Learning intention[\s\S]*?</summary>[\s\S]*?<p\b[^>]*>([\s\S]*?)</p>',
            r'<details\b[^>]*>[\s\S]*?<summary>[\s\S]*?Learning intention[\s\S]*?</summary>[\s\S]*?<li\b[^>]*>([\s\S]*?)</li>',
        ))
        if teacher_summary:
            summary = concise(teacher_summary, 170)
    if not example and teacher:
        example = first_match(teacher, (r'<div\b[^>]*class="[^"]*example-card[^"]*"[^>]*>[\s\S]*?<p\b[^>]*>([\s\S]*?)</p>',))
    return title, summary, concise(example, 155) if example else ""


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
  <link rel="stylesheet" href="/assets/curriculum.css?v=4">
  <link rel="stylesheet" href="/assets/css/curriculum-skill-hub.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","{GA_ID}");</script>
  <!-- ADSENSE DISABLED PENDING APPROVAL: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE}" crossorigin="anonymous"></script> -->
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
    return f'''<div class="skill-card-actions">
  <a href="{esc(unit['url'])}">Explore skill</a>
  <details class="resource-menu"><summary>Resources</summary><div class="resource-menu__links">
    <a href="{esc(teacher_slide_url(unit))}" target="_blank" rel="noopener">Classroom View</a>
    <a href="{esc(unit['worksheetUrl'])}">Worksheet</a>
    <a href="{esc(unit['practiceUrl'])}">Practice</a>
    <a href="{esc(unit['testUrl'])}">Quick check</a>
  </div></details>
</div>'''


def unit_card(unit: dict) -> str:
    title, summary, example = topic_card_copy(unit)
    example_html = f'<p class="skill-example"><strong>Example</strong><span>{esc(example)}</span></p>\n  ' if example else ""
    return f'''<article class="curriculum-unit-card">
  <div class="skill-card-topline"><span class="curriculum-badge">{esc(unit['code'])}</span><p class="skill-strand">{esc(unit['strand'])}</p></div>
  <h3>{esc(title)}</h3>
  <p class="skill-summary">{esc(summary)}</p>
  {example_html}{action_links(unit)}
  <details class="official-wording"><summary>Official curriculum wording</summary><p>{esc(unit['description'])}</p></details>
</article>'''


def strand_group(strand: str, units: list[dict]) -> str:
    group_id = re.sub(r"[^a-z0-9]+", "-", strand.lower()).strip("-") or "curriculum"
    cards = "".join(unit_card(unit) for unit in units)
    count = len(units)
    return f'''<section class="curriculum-skill-group" id="{esc(group_id)}" aria-labelledby="{esc(group_id)}-title">
  <header class="curriculum-skill-group__header"><h2 id="{esc(group_id)}-title">{esc(strand)}</h2><span class="curriculum-skill-count">{count} {'skill' if count == 1 else 'skills'}</span></header>
  <div class="curriculum-skill-grid">{cards}</div>
</section>'''


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
        curriculum_landing = ROOT / year_folder / "curriculum" / "index.html"
        if not curriculum_landing.exists():
            write(curriculum_landing, landing)

        for name, slug, subject_label in SUBJECTS:
            subject_units = [item for item in year_units if item["learningArea"] == name]
            subject_path = f"{curriculum_path}{slug}/"
            subject_description = (
                f"Browse {label} {subject_label} curriculum units with complete topic guides, "
                "teacher slides, worksheets, practice, tests and quizzes."
            )
            subject_title = f"{label} {subject_label} Curriculum Units | SkillrHub"
            if year_folder == "foundation" and slug == "maths":
                subject_title = "Foundation Maths Skills Explained | Curriculum-Aligned Resources"
                subject_description = (
                    "Browse every Foundation Maths skill in plain English, with examples, exact Australian "
                    "Curriculum wording, Classroom Views, worksheets, practice and quick checks."
                )
            grouped: dict[str, list[dict]] = {}
            for item in subject_units:
                grouped.setdefault(str(item.get("strand") or subject_label), []).append(item)
            jump_links = "".join(
                f'<a href="#{esc(re.sub(r"[^a-z0-9]+", "-", strand.lower()).strip("-") or "curriculum")}">{esc(strand)}</a>'
                for strand in grouped
            )
            groups = "".join(strand_group(strand, items) for strand, items in grouped.items())
            page = f'''<!DOCTYPE html>
<html lang="en-AU">
{head(subject_title, subject_description, subject_path)}
<body class="curriculum-shell curriculum-skill-hub"><div class="curriculum-page">
{nav(label, year_folder, subject_label, subject_label)}
<header class="curriculum-hero"><p class="curriculum-eyebrow">{esc(label)} {esc(subject_label)}</p><h1>{esc(label)} {esc(subject_label)} skills</h1><p class="curriculum-hero__lead">Find the exact skill a learner needs, understand it clearly and open the right teaching or practice resource.</p><div class="curriculum-actions"><a class="curriculum-button" href="{curriculum_path}">All {esc(label)} subjects</a><a class="curriculum-button" href="/how-to-use-skillr.html">User guide</a></div></header>
<section class="curriculum-panel curriculum-skill-intro" aria-labelledby="choose-skill"><div><p class="curriculum-eyebrow">Skill navigator</p><h2 id="choose-skill">Choose the skill you want to teach</h2><p>Skills are grouped by curriculum strand. Exact Australian Curriculum wording remains available on every card.</p></div><nav class="strand-jump-list" aria-label="{esc(subject_label)} strands">{jump_links}</nav></section>
<main class="curriculum-skill-groups">{groups}</main>
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
