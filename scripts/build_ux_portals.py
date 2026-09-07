#!/usr/bin/env python3
"""Build year-first Learn, Teach and Products portals for SkillrHub."""

from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
MANIFEST = ROOT / "data/curriculum-units.json"
YEARS = [
    ("foundation", "Foundation", "F"),
    ("year1", "Year 1", "1"),
    ("year2", "Year 2", "2"),
    ("year3", "Year 3", "3"),
    ("year4", "Year 4", "4"),
    ("year5", "Year 5", "5"),
    ("year6", "Year 6", "6"),
    ("year7", "Year 7", "7"),
    ("year8", "Year 8", "8"),
    ("year9", "Year 9", "9"),
    ("year10", "Year 10", "10"),
]
SUBJECTS = [
    ("maths", "Maths", "Number, algebra, measurement, space and statistics"),
    ("science", "Science", "Science understanding, inquiry and human endeavour"),
    ("english", "English", "Language, literature, literacy, reading and writing"),
]


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def pretty_year_path(folder: str) -> str:
    return "foundation" if folder == "foundation" else folder.replace("year", "year-")


def title_year_path(pretty: str) -> str:
    return "Foundation" if pretty == "foundation" else pretty.title().replace("-", " ")


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def head(title: str, description: str, path: str) -> str:
    schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title,
        "url": f"{SITE}{path}",
        "description": description,
        "isPartOf": {"@type": "WebSite", "name": "SkillrHub", "url": SITE},
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
  <link rel="stylesheet" href="/assets/css/ux-portals.css?v=20260907-1">
  <script type="application/ld+json">{json.dumps(schema, separators=(",", ":"))}</script>
</head>"""


def nav(current: str) -> str:
    links = [
        ("/learn/", "Learn"),
        ("/teach/", "Teach"),
        ("/products/", "Products"),
        ("/worksheets/", "Worksheets"),
        ("/dashboard/", "Dashboard"),
        ("/sitemap.html", "Sitemap"),
    ]
    items = "".join(
        f'<a href="{href}"{" aria-current=\"page\"" if label == current else ""}>{label}</a>'
        for href, label in links
    )
    return f"""<header class="site-header">
  <nav class="site-header__nav" aria-label="Main navigation">
    <a class="site-header__brand" href="/" aria-label="SkillrHub home"><img src="/icons/skillrhub-mark.svg" alt="" width="38" height="38"><strong>SkillrHub</strong> <span>F-10</span></a>
    <div class="site-header__links">{items}</div>
    <details class="site-header__menu"><summary>Menu</summary><div class="site-header__menu-panel">{items}</div></details>
  </nav>
</header>"""


def footer() -> str:
    return """<footer>
  <nav class="footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/learn/">Learn</a><a href="/teach/">Teach</a><a href="/products/">Products</a><a href="/worksheets/">Worksheets</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav>
  <p>© 2026 SkillrHub. All rights reserved.</p>
  <p>Core learning resources are free to use. Optional books and bundles are separate premium resources.</p>
</footer>"""


def year_cards(prefix: str, counts: dict[str, dict[str, int]]) -> str:
    cards = []
    for folder, label, short in YEARS:
        count = counts.get(folder, {}).get("total", 0)
        cards.append(
            f"""<a class="portal-year-card" href="/{prefix}/{pretty_year_path(folder)}/">
  <span class="portal-year-card__mark">{esc(short)}</span>
  <span><strong>{esc(label)}</strong><small>{count} curriculum skills across Maths, Science and English</small></span>
</a>"""
        )
    return "".join(cards)


def subject_cards(folder: str, prefix: str, counts: dict[str, dict[str, int]]) -> str:
    cards = []
    for slug, label, copy in SUBJECTS:
        total = counts.get(folder, {}).get(slug, 0)
        href = f"/{folder}/curriculum/{slug}/"
        if prefix == "teach":
            caption = f"{total} skills with topic guides, classroom views and teaching resources"
        else:
            caption = f"{total} skills with topic guides, worksheets, practice and tests"
        cards.append(
            f"""<a class="portal-subject-card portal-subject-card--{slug}" href="{href}">
  <span class="portal-subject-card__kicker">{esc(total)} skills</span>
  <h2>{esc(label)}</h2>
  <p>{esc(copy)}</p>
  <small>{esc(caption)}</small>
</a>"""
        )
    return "".join(cards)


def product_cards() -> str:
    products = [
        ("/worksheets/", "Free Worksheets", "Printable practice and homework pages from the free SkillrHub learning library."),
        ("/print-and-go.html", "Print & Go", "Classroom-ready printable resources for teachers and parents who want quick practice."),
        ("/teach-and-explain.html", "Teach & Explain", "Teaching slides and explanation resources that sit beside the free topic guides."),
        ("/support-skillrhub.html", "Support SkillrHub", "Optional support for keeping the free resource library growing."),
    ]
    return "".join(
        f"""<a class="portal-product-card" href="{href}">
  <h2>{esc(title)}</h2>
  <p>{esc(copy)}</p>
  <span>Open resource</span>
</a>"""
        for href, title, copy in products
    )


def counts_by_year(units: list[dict]) -> dict[str, dict[str, int]]:
    counts: dict[str, dict[str, int]] = {}
    for unit in units:
        folder = str(unit["yearFolder"])
        subject = str(unit["subjectSlug"])
        counts.setdefault(folder, {"total": 0, "maths": 0, "science": 0, "english": 0})
        counts[folder]["total"] += 1
        counts[folder][subject] += 1
    return counts


def landing(prefix: str, counts: dict[str, dict[str, int]]) -> str:
    title_map = {
        "learn": "Learn by Year | SkillrHub",
        "teach": "Teach by Year | SkillrHub",
    }
    lead_map = {
        "learn": "Choose a year, then choose Maths, Science or English. Each subject links to individual curriculum skill pages with topic guides, worksheets, practice and tests.",
        "teach": "Choose a year, then open Maths, Science or English teaching pathways. Skill pages connect topic guides, classroom views, worksheets and assessment practice.",
    }
    action = "Start Learning" if prefix == "learn" else "Start Teaching"
    path = f"/{prefix}/"
    return f"""<!DOCTYPE html>
<html lang="en-AU">
{head(title_map[prefix], lead_map[prefix], path)}
<body class="home-page portal-page">
{nav("Learn" if prefix == "learn" else "Teach")}
<main class="container portal-container">
  <section class="portal-hero">
    <p class="ux-eyebrow">Foundation to Year 10</p>
    <h1>{esc(action)} by year</h1>
    <p>{esc(lead_map[prefix])}</p>
  </section>
  <section class="portal-band" aria-labelledby="choose-year">
    <h2 id="choose-year">Choose a year</h2>
    <div class="portal-year-grid">{year_cards(prefix, counts)}</div>
  </section>
</main>
{footer()}
</body>
</html>"""


def year_page(prefix: str, folder: str, label: str, counts: dict[str, dict[str, int]]) -> str:
    pretty = pretty_year_path(folder)
    path = f"/{prefix}/{pretty}/"
    title = f"{label} {'Learning' if prefix == 'learn' else 'Teaching'} Hub | SkillrHub"
    description = (
        f"Choose {label} Maths, Science or English skill pages with topic guides, worksheets, practice and tests."
        if prefix == "learn"
        else f"Choose {label} Maths, Science or English teaching resources with topic guides, classroom views, worksheets and tests."
    )
    current = "Learn" if prefix == "learn" else "Teach"
    h1 = f"{label} {'learning' if prefix == 'learn' else 'teaching'} hub"
    secondary = "Open the subject, then choose the individual curriculum skill that matches the learner's need."
    return f"""<!DOCTYPE html>
<html lang="en-AU">
{head(title, description, path)}
<body class="home-page portal-page">
{nav(current)}
<main class="container portal-container">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/{prefix}/">{current}</a></li><li aria-current="page">{esc(label)}</li></ol></nav>
  <section class="portal-hero portal-hero--compact">
    <p class="ux-eyebrow">{esc(label)} • Maths, Science and English</p>
    <h1>{esc(h1)}</h1>
    <p>{esc(secondary)}</p>
  </section>
  <section class="portal-band" aria-label="{esc(label)} subjects">
    <div class="portal-subject-grid">{subject_cards(folder, prefix, counts)}</div>
  </section>
  <section class="portal-next">
    <a href="/{folder}/curriculum/">Browse all {esc(label)} curriculum</a>
    <a href="/worksheets/">Find printable worksheets</a>
    <a href="/dashboard/">Open progress dashboard</a>
  </section>
</main>
{footer()}
</body>
</html>"""


def products_page(counts: dict[str, dict[str, int]]) -> str:
    total = sum(year.get("total", 0) for year in counts.values())
    description = "Browse SkillrHub free worksheets, print-and-go resources, teaching packs and optional premium products."
    return f"""<!DOCTYPE html>
<html lang="en-AU">
{head("Products | SkillrHub", description, "/products/")}
<body class="home-page portal-page">
{nav("Products")}
<main class="container portal-container">
  <section class="portal-hero">
    <p class="ux-eyebrow">Free first • Optional premium extras</p>
    <h1>SkillrHub products and downloads</h1>
    <p>Start with free resources, then use optional printable bundles or teaching packs when they save time. The free core library currently indexes {total} curriculum skills.</p>
  </section>
  <section class="portal-band" aria-labelledby="product-types">
    <h2 id="product-types">Choose a product type</h2>
    <div class="portal-product-grid">{product_cards()}</div>
  </section>
  <section class="portal-band" aria-labelledby="products-by-year">
    <h2 id="products-by-year">Browse by year</h2>
    <div class="portal-year-grid">{year_cards("learn", counts)}</div>
  </section>
</main>
{footer()}
</body>
</html>"""


def main() -> None:
    units = json.loads(MANIFEST.read_text(encoding="utf-8"))["units"]
    counts = counts_by_year(units)
    write(ROOT / "learn" / "index.html", landing("learn", counts))
    write(ROOT / "teach" / "index.html", landing("teach", counts))
    write(ROOT / "products" / "index.html", products_page(counts))
    for folder, label, _ in YEARS:
        write(ROOT / "learn" / pretty_year_path(folder) / "index.html", year_page("learn", folder, label, counts))
        write(ROOT / "teach" / pretty_year_path(folder) / "index.html", year_page("teach", folder, label, counts))
    print(json.dumps({"portalPages": 25, "curriculumSkills": sum(v["total"] for v in counts.values())}, indent=2))


if __name__ == "__main__":
    main()
