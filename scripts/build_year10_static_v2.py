#!/usr/bin/env python3
"""Materialise the remaining Year 10 Maths Static Curriculum Architecture v2 pages.

This is intentionally additive: existing authored explanations, worked examples,
questions, solutions, analytics, feedback cards and resource links are preserved.
The builder adds the missing v2 learning architecture, state alignment, schema,
breadcrumbs and crawlable state hubs without creating duplicate state lessons.
"""
from __future__ import annotations

import html as h
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-26"
ACARA = "https://www.australiancurriculum.edu.au/"
VCAA = "https://victoriancurriculum.vcaa.vic.edu.au/mathematics/mathematics-version-2-0/curriculum/f-10"
NSW = "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/overview/course"
START = "<!-- skillr-year10-v2:start -->"
END = "<!-- skillr-year10-v2:end -->"
SCHEMA_START = "<!-- skillr-year10-v2-schema:start -->"
SCHEMA_END = "<!-- skillr-year10-v2-schema:end -->"

cfg = {}
for name in ("config-1.json", "config-2.json"):
    cfg.update(json.loads((ROOT / "data/year10-maths-v2" / name).read_text()))

# Verified against VCAA Mathematics Version 2.0. Where AC v9 separates content
# that Victoria combines, the public wording explains the overlap rather than
# pretending a one-to-one descriptor exists.
VIC = {
    "AC9M10A05": "VC2M10A11 and VC2M10A16 support the investigation; optional Level 10A VC2M10AA10 closely mirrors the digital-conjecture intent",
    "AC9M10M01": "VC2M10M01 — Level 10 Measurement",
    "AC9M10M02": "VC2M10M02 — Level 10 Measurement",
    "AC9M10M03": "VC2M10M03 — Level 10 Measurement",
    "AC9M10M04": "VC2M10M04 — Level 10 Measurement combines measurement error with modelling, so this lesson covers the error-and-accuracy component",
    "AC9M10M05": "VC2M10M04 — Level 10 Measurement covers direct/inverse proportion, scaling and model evaluation",
    "AC9M10SP01": "VC2M10SP01 — Level 10 Space",
    "AC9M10SP02": "VC2M10SP02 — Level 10 Space",
    "AC9M10SP03": "optional Level 10A VC2M10ASP06 closely matches spatial algorithms and digital-tool design; Level 10 geometry/networks provide supporting knowledge",
    "AC9M10ST01": "VC2M10ST04 — Level 10 Statistics",
    "AC9M10ST02": "VC2M10ST01 — Level 10 Statistics",
    "AC9M10ST03": "VC2M10ST02 — Level 10 Statistics",
    "AC9M10ST04": "VC2M10ST03 — Level 10 Statistics",
    "AC9M10ST05": "VC2M10ST05 — Level 10 Statistics",
    "AC9M10P01": "VC2M10P01 — Level 10 Probability",
    "AC9M10P02": "VC2M10P01 and VC2M10P02 — Level 10 Probability; the first explicitly includes conditional-probability simulation",
}

# NSW uses Stage 5 Core + Paths rather than a one-code-per-Year-10 structure.
# Use verified content-group terminology and do not invent an outcome code when
# a clean one-to-one outcome was not established from the official syllabus.
NSW_MAP = {
    "AC9M10A05": "Stage 5 Path — Functions and graphs; Working mathematically",
    "AC9M10M01": "Stage 5 Core — Length, area and volume; Path — Further area and volume",
    "AC9M10M02": "Stage 5 supporting links across Number and finance and Path — Functions and graphs; no forced one-to-one logarithmic-scale outcome",
    "AC9M10M03": "Stage 5 Core — Pythagoras and trigonometry; Path — Further trigonometry",
    "AC9M10M04": "Stage 5 measurement and space applications with Working mathematically; accuracy is embedded rather than treated as a direct standalone equivalent",
    "AC9M10M05": "Stage 5 Core — Ratios and rates; Path — Variation and rates of change",
    "AC9M10SP01": "Stage 5 Core — Geometrical properties and figures; Path — Geometrical figures and proof",
    "AC9M10SP02": "Stage 5 Path — Introduction to networks",
    "AC9M10SP03": "Stage 5 Paths — Geometrical figures and proof / Introduction to networks, with Working mathematically; no forced one-to-one spatial-algorithm outcome",
    "AC9M10ST01": "Stage 5 Core — Data classification, visualisation and analysis; Path — Data analysis and statistical enquiry",
    "AC9M10ST02": "Stage 5 Core — Data classification, visualisation and analysis; Path — Data analysis and statistical enquiry",
    "AC9M10ST03": "Stage 5 Core — Data classification, visualisation and analysis; Path — Data analysis and statistical enquiry",
    "AC9M10ST04": "Stage 5 Core — Data classification, visualisation and analysis; Path — Data analysis and statistical enquiry",
    "AC9M10ST05": "Stage 5 Path — Data analysis and statistical enquiry, supported by Core data analysis",
    "AC9M10P01": "Stage 5 Core — Probability; Path — Further probability",
    "AC9M10P02": "Stage 5 Core — Probability; Path — Further probability",
}

GUIDED = {
    "AC9M10A05": "Graph y=x², y=(x-2)² and y=x²+2. Before using a digital tool, predict each transformation. Then test, record one point that confirms each shift, and explain why changing the graph window can affect what you notice.",
    "AC9M10M01": "A solid is a 10 cm × 6 cm × 4 cm prism with a 2 cm-radius, 5 cm-high cylinder attached on top. First find total volume. Then list exactly which surfaces are external before attempting surface area.",
    "AC9M10M02": "Place 10, 100, 1000 and 10,000 on both a linear axis and a base-10 logarithmic axis. Explain what equal spacing means on each display and which one better shows multiplicative change.",
    "AC9M10M03": "A 5 m ladder reaches 4 m up a wall. Draw and label the triangle, decide whether Pythagoras or trigonometry is the most direct method for the ground distance, calculate it, then find the ladder angle to the ground.",
    "AC9M10M04": "A rectangle is measured as 8.0 cm by 5.0 cm, each to the nearest 0.1 cm. State plausible bounds for each length, then explain why the calculated area has greater uncertainty than simply quoting 40.0 cm².",
    "AC9M10M05": "A scale drawing uses 1:50. A wall is 7.2 cm on the plan. Find the real length, then predict how area changes if every drawing length is enlarged by factor 2 and justify the square relationship.",
    "AC9M10SP01": "In an isosceles triangle AB=AC. Draw a line from A to the midpoint of BC. Identify a pair of congruent triangles, name a valid congruence test and use it to justify one equal-angle conclusion.",
    "AC9M10SP02": "Create a five-vertex network with at least six edges. Label what each vertex and edge represent, find each vertex degree, decide whether the network is connected and identify one bridge-like link whose loss would matter.",
    "AC9M10SP03": "Write an algorithm that reflects any point (x,y) in the y-axis and then translates it 3 units right. Test three points including one on an axis, refine any ambiguous instruction, and state the final coordinate rule.",
    "AC9M10ST01": "A headline says 'Study app users score 25% higher'. List the minimum information needed before accepting the claim: sample, comparison group, baseline, measure, graph/summary and possible confounders. Then rewrite the claim cautiously.",
    "AC9M10ST02": "For the ordered data 4,5,6,7,8,9,10,12,14,18, find the median, Q1, Q3 and IQR using your school's quartile convention. Sketch a boxplot and describe centre, spread and the role of 18.",
    "AC9M10ST03": "Sketch three scatterplots: strong positive linear, weak negative and strong curved association. For each, write a complete contextual sentence using direction, strength and form, without claiming causation.",
    "AC9M10ST04": "In a survey, 40 of 60 Year 10 students and 30 of 90 Year 9 students play school sport. Build a two-way table and compare within-year percentages. Explain why comparing raw counts alone would be misleading.",
    "AC9M10ST05": "Plan a small investigation of study time and test score. Define population, paired variables and units; choose a sampling method and graph; name one confounder; and write the type of conclusion the design could legitimately support.",
    "AC9M10P01": "A table shows 30 bus users, of whom 12 are late, and 70 non-bus users, of whom 14 are late. Find P(late | bus) and P(bus | late). Explain why the two denominators differ.",
    "AC9M10P02": "Simulate two draws without replacement from 3 red and 2 blue counters. Describe how the second-draw probabilities must be updated, what trials are retained for estimating P(second red | first blue), and why 10,000 trials should be more stable than 20.",
}

ASSESS = {
    "AC9M10A05": "A graphing tool suggests x²=2ˣ has more than one real solution. Describe a systematic zoom/bisection strategy for locating all visible intersections, explain why the answers are approximate, and state one check that guards against missing a solution. [6 marks]",
    "AC9M10M01": "A rainwater tank is modelled as a rectangular prism 1.8 m × 1.2 m × 0.7 m with a half-cylinder roof of radius 0.6 m and length 1.8 m. Develop an expression for total capacity, calculate it and state two modelling assumptions. [6 marks]",
    "AC9M10M02": "A chart compares quantities from 10^-3 to 10^6. Explain why a logarithmic axis may be appropriate, determine the factor between 10^-1 and 10^4, and identify one way the chart could mislead if the axis were poorly labelled. [5 marks]",
    "AC9M10M03": "From a point 55 m from a tower, the angle of elevation to the top is 41°. The observer's eye is 1.65 m above ground. Calculate the tower height and explain how a 1° angle error would affect confidence in the result. [6 marks]",
    "AC9M10M04": "A speed is calculated from a measured distance of 100.0±0.5 m and time of 12.0±0.2 s. Estimate the reported speed, identify both uncertainty sources and explain which measurement should be improved first if greater accuracy is required. [6 marks]",
    "AC9M10M05": "A model car is built at scale 1:8. The real car has volume 11.5 m³. Determine the model's theoretical volume and explain why mass would not necessarily scale by the same factor if different materials are used. [6 marks]",
    "AC9M10SP01": "Two parallel lines are cut by a transversal. Construct a deductive argument proving that alternate interior angles are equal, clearly naming each angle fact used. [5 marks]",
    "AC9M10SP02": "A delivery network has six depots and weighted road links. Explain how connectedness, vertex degree and edge weights answer three different operational questions, and why a visually short edge need not have the smallest weight. [5 marks]",
    "AC9M10SP03": "Design, test and refine an algorithm that generates the four vertices of a square centred at (a,b) with sides parallel to the axes and side length s. Communicate the final coordinate rules and justify that the shape is a square. [7 marks]",
    "AC9M10ST01": "A media report claims a treatment 'cuts risk by 50%' because risk fell from 2 in 1000 to 1 in 1000. Explain relative and absolute change, identify two questions about study design and write a more informative headline. [6 marks]",
    "AC9M10ST02": "Two classes have equal medians, but Class A IQR=8 and Class B IQR=22. Compare consistency, explain what the median alone misses, and state what additional display information you would inspect before declaring one class 'better'. [5 marks]",
    "AC9M10ST03": "A scatterplot shows a strong positive association between exercise minutes and fitness score. Describe the association precisely, explain why causation is not established and name a plausible lurking variable. [5 marks]",
    "AC9M10ST04": "A two-way table compares course choice by gender with unequal group totals. Explain why conditional percentages are preferable to raw counts, calculate the relevant percentages from a table of your own construction and state a cautious conclusion. [6 marks]",
    "AC9M10ST05": "Design a bivariate investigation suitable for Year 10. Your plan must include a clear question, population/sample, variable definitions, collection method, display/analysis, ethics, confounders and a limitation on inference. [8 marks]",
    "AC9M10P01": "In a cohort, 45 students study Chemistry, 30 of those study Physics, and 55 of the 75 non-Chemistry students study Physics. Calculate P(Physics | Chemistry) and P(Chemistry | Physics), then explain why reversing a condition changes the probability. [6 marks]",
    "AC9M10P02": "Design a digital simulation to estimate a conditional probability for drawing two cards without replacement. Specify the sample-space model, condition filter, statistic recorded, trial count and one validation check against an exact small case. [7 marks]",
}

# All 21 canonical lessons for state hubs and related links.
ALL = {
    "AC9M10N01": ("Exact Values, Approximation and Rounding Error", "ac9m10n01-the-effect-of-using-approximations-of-real-numbers-in-repeated", "VC2M10N01 — Level 10 Number", "Stage 5 Core Number and finance / Working mathematically; accuracy is also used across measurement contexts"),
    "AC9M10A01": ("Expressions, Factorisation and Exponent Laws", "ac9m10a01-expand-factorise-and-simplify-expressions-and-solve-equations", "VC2M10A01–A07 and A12–A13 — Level 10 Algebra, with scope split across several descriptors", "Stage 5 Core Algebra and equations; Path Further algebra and equations"),
    "AC9M10A02": ("Linear Inequalities and Simultaneous Equations", "ac9m10a02-solve-linear-inequalities-and-simultaneous-linear-equations-in", "VC2M10A08–A09 — Level 10 Algebra", "Stage 5 Core Algebra and equations / Linear and non-linear relationships"),
    "AC9M10A03": ("Exponential Relations, Graphs and Equations", "ac9m10a03-the-connection-between-algebraic-and-graphical-representations", "VC2M10A11 and VC2M10A14 — Level 10 Algebra", "Stage 5 Core Linear and non-linear relationships; Path Functions and graphs"),
    "AC9M10A04": ("Growth, Decay and Financial Modelling", "ac9m10a04-mathematical-modelling-to-solve-applied-problems-involving", "VC2M10A15 — Level 10 Algebra", "Stage 5 Number and finance with Path Variation and rates of change / Functions and graphs"),
}
for code, item in cfg.items():
    ALL[code] = (item["title"], item["path"].split("/")[-1], VIC[code], NSW_MAP[code])


def strip_block(text: str, start: str, end: str) -> str:
    return re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", text)


def esc(s: str) -> str:
    return h.escape(s, quote=True)


def details(title: str, body: str, opened: bool = False) -> str:
    return f'<details class="curriculum-topic-section"{" open" if opened else ""}><summary><strong>{title}</strong></summary><div class="curriculum-detail-body">{body}</div></details>'


def related_html(codes: list[str]) -> str:
    items = []
    for c in codes:
        if c not in ALL:
            continue
        title, slug, _, _ = ALL[c]
        items.append(f'<li><a href="/year10/maths/{slug}/"><strong>{c}</strong> — {esc(title)}</a></li>')
    return '<ul class="curriculum-related-list">' + ''.join(items) + '</ul>'


def schema(code: str, item: dict, canonical: str) -> str:
    data = {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": f'{item["title"]} — {code}',
        "url": canonical,
        "inLanguage": "en-AU",
        "isAccessibleForFree": True,
        "educationalLevel": "Year 10",
        "learningResourceType": ["Lesson", "Worked examples", "Guided practice", "Assessment practice"],
        "educationalAlignment": [
            {"@type": "AlignmentObject", "alignmentType": "teaches", "educationalFramework": "Australian Curriculum v9.0", "targetName": code, "targetUrl": ACARA},
            {"@type": "AlignmentObject", "alignmentType": "educationalSubject", "educationalFramework": "Victorian Curriculum F–10 Version 2.0", "targetName": VIC[code], "targetUrl": VCAA},
            {"@type": "AlignmentObject", "alignmentType": "educationalSubject", "educationalFramework": "NSW Mathematics K–10 Syllabus (2022)", "targetName": NSW_MAP[code], "targetUrl": NSW},
        ],
    }
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://skillrhub.com/"},
            {"@type": "ListItem", "position": 2, "name": "Year 10", "item": "https://skillrhub.com/year10/"},
            {"@type": "ListItem", "position": 3, "name": "Mathematics", "item": "https://skillrhub.com/year10/curriculum/maths/"},
            {"@type": "ListItem", "position": 4, "name": code, "item": canonical},
        ],
    }
    return (f'{SCHEMA_START}<script type="application/ld+json">{json.dumps(data, ensure_ascii=False, separators=(",", ":"))}</script>'
            f'<script type="application/ld+json">{json.dumps(breadcrumb, ensure_ascii=False, separators=(",", ":"))}</script>{SCHEMA_END}')


def enhancement(code: str, item: dict) -> str:
    hints = ''.join(f'<li>{esc(x)}</li>' for x in item["hints"])
    core = esc(item["meaning"])
    vic = esc(VIC[code])
    nsw = esc(NSW_MAP[code])
    goals = f'''<ul class="curriculum-check-list">
<li>explain the central idea: {core}</li>
<li>choose and apply an appropriate method without relying on keyword matching</li>
<li>check results using units, substitution, estimation, a second representation or contextual reasonableness</li>
<li>justify a conclusion and communicate limitations where the context requires them</li></ul>'''
    guided = f'<p>{esc(GUIDED[code])}</p><p><strong>Teacher check:</strong> require a written method choice and one verification step before revealing the worked solution.</p>'
    reasoning = f'<p>{esc(item["reason"])}</p>'
    assess = f'<p>{esc(ASSESS[code])}</p><p><strong>Marking focus:</strong> method selection, mathematically correct working, interpretation and justification.</p>'
    mastery = '''<ul class="curriculum-check-list"><li>I can explain the concept without copying a formula sheet.</li><li>I can solve a routine example and check the result.</li><li>I can choose a method in an unfamiliar problem.</li><li>I can explain a common error and correct it.</li><li>I can connect the answer back to the context, including units or limitations.</li></ul>'''
    alignment = f'''<p><strong>Australian Curriculum:</strong> {code} — Year 10 {esc(item["strand"])}. {core}</p>
<p><strong>Victoria:</strong> {vic}</p>
<p><strong>NSW:</strong> {nsw}</p>
<p><strong>Alignment explanation:</strong> The explicit teaching and worked examples address the Australian Curriculum concept directly. The Victorian mapping follows the current Version 2.0 descriptor structure; where Victoria combines or extends content, that difference is stated rather than hidden. NSW uses a Stage 5 Core–Paths structure, so this page maps to the relevant content group(s) and Working mathematically processes instead of inventing a Year 10 one-to-one code.</p>
<div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Lesson component</th><th>Australian Curriculum</th><th>Victoria</th><th>NSW</th></tr></thead><tbody>
<tr><td>Explicit concept teaching and worked examples</td><td>{code}</td><td>{vic}</td><td>{nsw}</td></tr>
<tr><td>Guided and independent practice</td><td>Builds fluency and application for {code}</td><td>Practises the mapped Level 10/10A knowledge as applicable</td><td>Practises the mapped Stage 5 Core/Path content</td></tr>
<tr><td>Reasoning and assessment tasks</td><td>Applies reasoning/problem solving in the descriptor context</td><td>Supports Victorian reasoning and modelling expectations</td><td>Embeds Working mathematically: reasoning, problem solving and communication</td></tr>
</tbody></table></div>'''
    official = f'''<ul class="curriculum-source-list"><li><a href="{ACARA}" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9 — ACARA</a></li><li><a href="{VCAA}" target="_blank" rel="nofollow noopener">Victorian Curriculum Mathematics Version 2.0 — VCAA</a></li><li><a href="{NSW}" target="_blank" rel="nofollow noopener">NSW Mathematics K–10 Syllabus (2022) — NSW Curriculum/NESA</a></li></ul><p>Official wording is paraphrased on SkillrHub; use the linked curriculum sites as the source of record.</p>'''
    audience = f'''<div class="unit-activity-grid"><article><h3>For teachers</h3><p>{esc(item["teacher"])}</p></article><article><h3>For parents and carers</h3><p>{esc(item["parent"])}</p></article></div><button type="button" class="report-issue-button" data-report-issue="true">Report issue</button>'''
    return START + ''.join([
        details("Learning goals: what you will learn", goals, True),
        details("Prerequisite knowledge", f'<p>{esc(item["prereq"])}</p>', True),
        details("Guided practice", guided, True),
        details("Reasoning and problem-solving task", reasoning),
        details("Assessment-style question", assess),
        details("Review hints", '<ul>' + hints + '</ul>'),
        details("Exit ticket / mastery check", mastery),
        details("Teacher and parent guidance", audience),
        details("Curriculum alignment", alignment, True),
        details("Related Year 10 Maths topics", related_html(item["related"])),
        details("Official curriculum references", official),
    ]) + END


def upgrade_page(code: str, item: dict) -> None:
    path = ROOT / item["path"] / "index.html"
    text = path.read_text()
    text = text.replace('/assets/curriculum.css?v=4', '/assets/curriculum.css?v=5')
    text = text.replace('class="curriculum-layout"', 'class="curriculum-layout curriculum-layout--single"', 1)
    text = strip_block(text, START, END)
    text = strip_block(text, SCHEMA_START, SCHEMA_END)
    canonical = f'https://skillrhub.com/{item["path"]}/'

    # Strong, unique metadata while preserving the canonical URL.
    title = f'Year 10 {item["title"]} | {code}'
    desc = f'Year 10 Maths {code}: {item["meaning"]} Worked examples, guided practice, assessment and Victoria/NSW curriculum alignment.'
    if len(desc) > 160:
        desc = desc[:157].rsplit(' ', 1)[0] + '…'
    text = re.sub(r'<title>[\s\S]*?</title>', f'<title>{esc(title)}</title>', text, count=1)
    if re.search(r'<meta\s+name=["\']description["\']', text, re.I):
        text = re.sub(r'<meta\s+name=["\']description["\'][^>]*>', f'<meta name="description" content="{esc(desc)}">', text, count=1, flags=re.I)
    else:
        text = text.replace('</title>', f'</title><meta name="description" content="{esc(desc)}">', 1)

    # H1 must contain topic and code.
    def h1fix(m):
        body = m.group(1)
        return m.group(0) if code.lower() in re.sub('<[^>]+>', '', body).lower() else f'<h1>{body} — {code}</h1>'
    text = re.sub(r'<h1[^>]*>([\s\S]*?)</h1>', h1fix, text, count=1, flags=re.I)

    # Visible breadcrumb if missing.
    if 'aria-label="Breadcrumb"' not in text and "aria-label='Breadcrumb'" not in text:
        crumb = f'<nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year10/">Year 10</a></li><li><a href="/year10/curriculum/maths/">Maths</a></li><li aria-current="page">{code}</li></ol></nav>'
        text = re.sub(r'(<nav class="main-nav"[\s\S]*?</nav>)', r'\1' + crumb, text, count=1)

    # Homework is the single visible written-work resource. Legacy worksheet
    # routes remain noindex redirects to Homework for old links and bookmarks.
    text = re.sub(
        r'<a\b[^>]*href=["\']/quiz/year-10/math/' + re.escape(code.lower()) + r'/worksheet/["\'][^>]*>\s*Worksheet\s*</a>',
        '',
        text,
        flags=re.I,
    )

    # Existing 10-question bank becomes the explicit independent-practice section.
    text = text.replace('<summary><strong>10 important questions to solve</strong></summary>', '<summary><strong>Independent practice — 10 important questions to solve</strong></summary>')

    text = text.replace('</head>', schema(code, item, canonical) + '</head>', 1)
    text = text.replace('<!-- skillr-facebook-feedback:start -->', enhancement(code, item) + '<!-- skillr-facebook-feedback:start -->', 1)

    if 'window.skillrPageMeta' not in text:
        meta = f'<script>window.skillrPageMeta={{curriculumCode:"{code}",pageType:"topic guide",year:"Year 10",subject:"Maths"}};</script>'
        if '<script src="/assets/report-issue.js' in text:
            text = text.replace('<script src="/assets/report-issue.js', meta + '<script src="/assets/report-issue.js', 1)
        else:
            text = text.replace('</body>', meta + '<script src="/assets/report-issue.js?v=1"></script></body>', 1)
    path.write_text(text)


def state_rows(which: str) -> str:
    rows = []
    for code, (title, slug, vic, nsw) in ALL.items():
        align = vic if which == 'vic' else nsw
        rows.append(f'<tr><td><strong>{code}</strong></td><td><a href="/year10/maths/{slug}/">{esc(title)}</a></td><td>{esc(align)}</td></tr>')
    return ''.join(rows)


def write_hubs() -> None:
    common_head = '<link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=4">'
    vic_year = f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Victorian Curriculum Level 10 Mathematics | SkillrHub</title><meta name="description" content="Victorian Curriculum Mathematics Version 2.0 Level 10 and Level 10A mapping to SkillrHub Year 10 Australian Curriculum mathematics lessons."><link rel="canonical" href="https://skillrhub.com/victoria/year-10/mathematics/">{common_head}</head><body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/victoria/mathematics/">Victoria Maths</a><a href="/year10/curriculum/maths/">Year 10 Maths</a></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">Victoria • Mathematics Version 2.0 • Level 10</p><h1>Victorian Curriculum Level 10 Mathematics</h1><p class="curriculum-hero__lead">Use this mapping to find one complete SkillrHub lesson for each Australian Curriculum Year 10 topic while seeing how that learning relates to Victorian Curriculum Mathematics Version 2.0. Victoria does not always organise content one-to-one with ACARA, and optional Level 10A content is identified where it genuinely provides the closest match.</p></header><main><section class="curriculum-topic-section"><h2>How the Victorian mapping works</h2><p>SkillrHub keeps the Australian Curriculum lesson as the canonical learning page. This Victoria hub uses Level terminology, current VCAA codes and the structure of Version 2.0 to point teachers, students and families to those lessons without duplicating them.</p><p>Some Australian descriptors split concepts that Victoria combines, and some digital/spatial extension content aligns most closely with optional Level 10A. Those differences are stated explicitly.</p></section><section class="curriculum-topic-section"><h2>Level 10 mapping</h2><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Australian code</th><th>Canonical SkillrHub lesson</th><th>Victorian Curriculum alignment</th></tr></thead><tbody>{state_rows('vic')}</tbody></table></div></section><section class="curriculum-topic-section"><h2>Official reference</h2><p><a href="{VCAA}" target="_blank" rel="nofollow noopener">Victorian Curriculum Mathematics Version 2.0 — VCAA</a></p></section></main></div></body></html>'''
    vic_root = f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Victorian Curriculum Mathematics Resources | SkillrHub</title><meta name="description" content="Navigate SkillrHub mathematics resources using Victorian Curriculum F–10 Version 2.0 Levels and current VCAA terminology."><link rel="canonical" href="https://skillrhub.com/victoria/mathematics/">{common_head}</head><body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/year10/curriculum/maths/">Australian Year 10 Maths</a></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">Victoria • Mathematics Version 2.0</p><h1>Victorian Curriculum Mathematics resources</h1><p class="curriculum-hero__lead">Find SkillrHub's free mathematics lessons through Victorian Curriculum Levels while keeping one authoritative lesson page for each Australian Curriculum concept.</p></header><main><section class="curriculum-topic-section"><h2>Level 10 Mathematics</h2><p>The Level 10 guide maps all 21 SkillrHub Year 10 Mathematics lessons to current VCAA Version 2.0 content and flags optional Level 10A connections where appropriate.</p><p><a class="curriculum-button primary" href="/victoria/year-10/mathematics/">Open Level 10 Mathematics mapping</a></p></section><section class="curriculum-topic-section"><h2>Why SkillrHub does not duplicate lessons by state</h2><p>Mathematical explanations, worked examples and practice remain on one canonical lesson URL. The Victorian hub contributes unique Level organisation, VCAA terminology and mapping so teachers and families can navigate by their state curriculum without creating duplicate doorway pages.</p></section><section class="curriculum-topic-section"><p><a href="{VCAA}" target="_blank" rel="nofollow noopener">Official Victorian Curriculum Mathematics Version 2.0</a></p></section></main></div></body></html>'''
    nsw_stage = f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NSW Stage 5 Mathematics Core and Paths | SkillrHub</title><meta name="description" content="NSW Mathematics K–10 (2022) Stage 5 Core and Paths mapping to SkillrHub Year 10 Australian Curriculum mathematics lessons."><link rel="canonical" href="https://skillrhub.com/nsw/stage-5/mathematics/">{common_head}</head><body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/nsw/mathematics/">NSW Maths</a><a href="/year10/curriculum/maths/">Year 10 Maths</a></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">NSW • Mathematics K–10 (2022) • Stage 5</p><h1>NSW Stage 5 Mathematics — Core and Paths</h1><p class="curriculum-hero__lead">NSW Stage 5 is not a simple list of Year 10 equivalents. The syllabus uses mandatory Core learning plus optional Paths that extend students towards Stage 6. This guide maps SkillrHub's canonical Year 10 lessons to the relevant Stage 5 content groups without inventing one-to-one outcome codes.</p></header><main><section class="curriculum-topic-section"><h2>How Stage 5 is organised</h2><p>Core groups include Number and finance, Algebra and equations, Ratios and rates, Linear and non-linear relationships, Pythagoras and trigonometry, Length, area and volume, Geometrical properties and figures, Data classification, visualisation and analysis, and Probability. Paths extend into further algebra, functions and graphs, further trigonometry, proof, networks, statistical enquiry and further probability.</p><p>Working mathematically — communicating, reasoning, understanding and fluency, and problem solving — is embedded across these groups.</p></section><section class="curriculum-topic-section"><h2>Stage 5 mapping</h2><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Australian code</th><th>Canonical SkillrHub lesson</th><th>NSW Stage 5 alignment</th></tr></thead><tbody>{state_rows('nsw')}</tbody></table></div></section><section class="curriculum-topic-section"><h2>Official reference</h2><p><a href="{NSW}" target="_blank" rel="nofollow noopener">NSW Mathematics K–10 Syllabus (2022) — NSW Curriculum/NESA</a></p></section></main></div></body></html>'''
    nsw_root = f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NSW Mathematics Curriculum Resources | SkillrHub</title><meta name="description" content="Navigate SkillrHub mathematics lessons using the current NSW Mathematics K–10 syllabus, Stages, Core and Paths terminology."><link rel="canonical" href="https://skillrhub.com/nsw/mathematics/">{common_head}</head><body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/year10/curriculum/maths/">Australian Year 10 Maths</a></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">New South Wales • Mathematics K–10 (2022)</p><h1>NSW Mathematics curriculum resources</h1><p class="curriculum-hero__lead">Navigate SkillrHub lessons using NSW Stages and the current Core–Paths organisation while keeping one canonical Australian lesson for each mathematical concept.</p></header><main><section class="curriculum-topic-section"><h2>Stage 5 Mathematics</h2><p>The Stage 5 guide explains Core and Paths terminology and maps all 21 Year 10 Australian Curriculum lessons to the relevant NSW content groups.</p><p><a class="curriculum-button primary" href="/nsw/stage-5/mathematics/">Open Stage 5 Mathematics mapping</a></p></section><section class="curriculum-topic-section"><h2>One lesson, multiple curriculum views</h2><p>NSW curriculum navigation should help users find the lesson, not create another copy of it. SkillrHub's state hub therefore adds genuinely NSW-specific organisation and terminology, then links to the same complete static lesson used nationally.</p></section><section class="curriculum-topic-section"><p><a href="{NSW}" target="_blank" rel="nofollow noopener">Official NSW Mathematics K–10 Syllabus (2022)</a></p></section></main></div></body></html>'''
    outputs = {
        ROOT / 'victoria/mathematics/index.html': vic_root,
        ROOT / 'victoria/year-10/mathematics/index.html': vic_year,
        ROOT / 'nsw/mathematics/index.html': nsw_root,
        ROOT / 'nsw/stage-5/mathematics/index.html': nsw_stage,
    }
    for p, text in outputs.items():
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(text)


def update_sitemaps() -> None:
    y10 = ROOT / 'sitemap-year10.xml'
    text = y10.read_text()
    # Refresh the 21 canonical Maths lesson modification dates after the full v2 pass.
    text = re.sub(r'(<loc>https://skillrhub\.com/year10/maths/[^<]+</loc>\s*<lastmod>)[^<]+(</lastmod>)', rf'\g<1>{TODAY}\2', text)
    y10.write_text(text)

    site = ROOT / 'sitemap-site.xml'
    text = site.read_text()
    urls = [
        'https://skillrhub.com/victoria/mathematics/',
        'https://skillrhub.com/victoria/year-10/mathematics/',
        'https://skillrhub.com/nsw/mathematics/',
        'https://skillrhub.com/nsw/stage-5/mathematics/',
    ]
    additions = ''.join(f'  <url>\n    <loc>{u}</loc>\n    <lastmod>{TODAY}</lastmod>\n  </url>\n' for u in urls if f'<loc>{u}</loc>' not in text)
    text = text.replace('</urlset>', additions + '</urlset>')
    site.write_text(text)


for code, item in cfg.items():
    upgrade_page(code, item)
write_hubs()
update_sitemaps()
from normalize_year10_math_section_order import normalize_all
normalize_all()
print(f'Year 10 Static Curriculum v2 materialised for {len(cfg)} remaining lessons + 4 state hubs in the AC9M10N01 section order.')
