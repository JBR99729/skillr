#!/usr/bin/env python3
"""Materialise all canonical Year 9 Maths topic pages as Static Curriculum Architecture v2.

The builder keeps the existing canonical URLs and resource routes, replaces generic
legacy teaching boilerplate with authored Year 9 pedagogy, retains concise existing
Australian Curriculum elaboration evidence, adds defensible Victoria/NSW alignment,
and emits all essential lesson content as static HTML.
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

from year9_maths_v2_profiles_number_algebra import PROFILES as NA
from year9_maths_v2_profiles_measurement_space import PROFILES as MS
from year9_maths_v2_profiles_statistics_probability import PROFILES as SP

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "year9/curriculum/maths/index.html"
ACARA = "https://www.australiancurriculum.edu.au/curriculum-information/understand-this-learning-area/mathematics"
VCAA = "https://victoriancurriculum.vcaa.vic.edu.au/mathematics/mathematics-version-2-0/curriculum/f-10"
NSW = "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/overview"
PROFILES = {**NA, **MS, **SP}
EXPECTED_CODES = {
    "AC9M9N01",
    *{f"AC9M9A0{i}" for i in range(1, 7)},
    *{f"AC9M9M0{i}" for i in range(1, 6)},
    *{f"AC9M9SP0{i}" for i in range(1, 4)},
    *{f"AC9M9ST0{i}" for i in range(1, 6)},
    *{f"AC9M9P0{i}" for i in range(1, 4)},
}


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def strip_tags(value: str) -> str:
    value = re.sub(r"<script[\s\S]*?</script>", " ", value, flags=re.I)
    value = re.sub(r"<style[\s\S]*?</style>", " ", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def find_meta(source: str, name: str) -> str:
    match = re.search(rf'<meta\b[^>]*name=["\']{re.escape(name)}["\'][^>]*content=["\']([^"\']*)["\']', source, re.I)
    return html.unescape(match.group(1)) if match else ""


def find_canonical(source: str) -> str:
    match = re.search(r'<link\b[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', source, re.I)
    return html.unescape(match.group(1)) if match else ""


def anchor_hrefs(source: str) -> list[tuple[str, str]]:
    out = []
    for match in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</a>', source, re.I):
        out.append((html.unescape(match.group(1)), strip_tags(match.group(2))))
    return out


def href_for(source: str, *labels: str) -> str:
    labels_l = tuple(label.lower() for label in labels)
    for href, label in anchor_hrefs(source):
        low = label.lower()
        if any(key in low for key in labels_l):
            return href
    return ""


def detail_block(source: str, heading_pattern: str) -> str:
    for match in re.finditer(r'<details\b[\s\S]*?</details>', source, re.I):
        block = match.group(0)
        summary = re.search(r'<summary\b[^>]*>([\s\S]*?)</summary>', block, re.I)
        if summary and re.search(heading_pattern, strip_tags(summary.group(1)), re.I):
            body = block[summary.end():]
            body = re.sub(r'</details>\s*$', '', body, flags=re.I)
            body = re.sub(r'^\s*<div\b[^>]*class=["\'][^"\']*curriculum-detail-body[^"\']*["\'][^>]*>', '', body, flags=re.I)
            body = re.sub(r'</div>\s*$', '', body, flags=re.I)
            return body.strip()
    return ""


def legacy_elaborations(source: str) -> list[tuple[str, str]]:
    body = detail_block(source, r'Australian Curriculum elaborations')
    if not body:
        return []
    items = []
    for article in re.findall(r'<article\b[\s\S]*?</article>', body, re.I):
        h3 = re.search(r'<h3\b[^>]*>([\s\S]*?)</h3>', article, re.I)
        curriculum = re.search(r'<p\b[^>]*>\s*<strong>Curriculum:</strong>\s*([\s\S]*?)</p>', article, re.I)
        if not curriculum:
            continue
        label = strip_tags(h3.group(1)) if h3 else "Elaboration"
        text = strip_tags(curriculum.group(1))
        if text and all(text != prior for _, prior in items):
            items.append((label, text))
    return items


def feedback_block(source: str) -> str:
    match = re.search(r'<!--\s*skillr-facebook-feedback:start\s*-->[\s\S]*?<!--\s*skillr-facebook-feedback:end\s*-->', source, re.I)
    return match.group(0) if match else ""


def section(section_id: str, heading: str, body: str, opened: bool = False) -> str:
    return (
        f'<details class="curriculum-topic-section" id="{esc(section_id)}"{" open" if opened else ""}>'
        f'<summary><strong>{esc(heading)}</strong></summary><div class="curriculum-detail-body">{body}</div></details>'
    )


def bullets(items: list[str]) -> str:
    return '<ul>' + ''.join(f'<li>{esc(item)}</li>' for item in items) + '</ul>'


def numbered(items: list[str]) -> str:
    return '<ol>' + ''.join(f'<li>{esc(item)}</li>' for item in items) + '</ol>'


def parse_units() -> dict[str, dict[str, str]]:
    source = INDEX.read_text(encoding="utf-8")
    card_re = re.compile(
        r'<span class="curriculum-badge">(AC9M9(?:N01|A0[1-6]|M0[1-5]|SP0[1-3]|ST0[1-5]|P0[1-3]))</span>'
        r'[\s\S]*?<h3>([\s\S]*?)</h3>'
        r'[\s\S]*?<p class="unit-context">([\s\S]*?)</p>'
        r'[\s\S]*?<a class="primary" href="/year9/maths/([^/]+)/">Topic guide</a>',
        re.I,
    )
    units = {}
    for code, descriptor, strand, slug in card_re.findall(source):
        units[code] = {
            "code": code,
            "descriptor": strip_tags(descriptor),
            "strand": strip_tags(strand),
            "slug": slug,
        }
    if set(units) != EXPECTED_CODES:
        missing = sorted(EXPECTED_CODES - set(units))
        extra = sorted(set(units) - EXPECTED_CODES)
        raise SystemExit(f"Year 9 Maths inventory mismatch. found={len(units)} missing={missing} extra={extra}")
    if set(PROFILES) != EXPECTED_CODES:
        missing = sorted(EXPECTED_CODES - set(PROFILES))
        extra = sorted(set(PROFILES) - EXPECTED_CODES)
        raise SystemExit(f"Year 9 Maths profile mismatch. found={len(PROFILES)} missing={missing} extra={extra}")
    return units


def diagram(code: str, key: str | None) -> str:
    if not key:
        return ""
    title_id = f"math-diagram-{code.lower()}"
    if key == "real-number-line":
        return f'''<figure class="math-concept-diagram"><div class="math-flow" role="img" aria-label="Nested real number system"><span>Natural numbers</span><span class="math-flow-arrow">⊂</span><span>Integers</span><span class="math-flow-arrow">⊂</span><span>Rational numbers</span><span class="math-flow-arrow">+</span><span>Irrational numbers</span><span class="math-flow-arrow">=</span><span>Real numbers</span></div><figcaption>Rational and irrational numbers are disjoint parts of the real number system; natural numbers and integers are nested inside the rationals.</figcaption></figure>'''
    if key == "area-model":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 760 300" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Area model for multiplying x plus 3 by x plus 5</title><rect x="120" y="60" width="500" height="180" fill="#fff" stroke="#2457d6" stroke-width="3"/><line x1="420" y1="60" x2="420" y2="240" stroke="#64748b" stroke-width="2"/><line x1="120" y1="160" x2="620" y2="160" stroke="#64748b" stroke-width="2"/><text x="270" y="118" text-anchor="middle" font-size="24">x²</text><text x="520" y="118" text-anchor="middle" font-size="24">5x</text><text x="270" y="210" text-anchor="middle" font-size="24">3x</text><text x="520" y="210" text-anchor="middle" font-size="24">15</text><text x="270" y="45" text-anchor="middle" font-size="21">x</text><text x="520" y="45" text-anchor="middle" font-size="21">5</text><text x="95" y="118" text-anchor="middle" font-size="21">x</text><text x="95" y="210" text-anchor="middle" font-size="21">3</text></svg><figcaption>The four partial areas show why (x+3)(x+5)=x²+8x+15.</figcaption></figure>'''
    if key == "coordinate-segment":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 760 360" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Coordinate segment showing rise, run and distance</title><line x1="80" y1="300" x2="700" y2="300" stroke="#64748b" stroke-width="2"/><line x1="120" y1="330" x2="120" y2="40" stroke="#64748b" stroke-width="2"/><circle cx="240" cy="250" r="8" fill="#2457d6"/><circle cx="560" cy="90" r="8" fill="#2457d6"/><line x1="240" y1="250" x2="560" y2="90" stroke="#2457d6" stroke-width="4"/><line x1="240" y1="250" x2="560" y2="250" stroke="#d97706" stroke-width="3"/><line x1="560" y1="250" x2="560" y2="90" stroke="#d97706" stroke-width="3"/><text x="400" y="278" text-anchor="middle" font-size="20">run Δx</text><text x="592" y="175" font-size="20">rise Δy</text><text x="225" y="235" font-size="20">A</text><text x="575" y="82" font-size="20">B</text></svg><figcaption>Gradient uses rise/run; distance uses the same changes as perpendicular legs in Pythagoras.</figcaption></figure>'''
    if key == "parabola-roots":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 760 360" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Parabola crossing the x axis at two roots</title><line x1="70" y1="235" x2="700" y2="235" stroke="#64748b" stroke-width="2"/><line x1="380" y1="320" x2="380" y2="35" stroke="#64748b" stroke-width="2"/><path d="M150 70 Q380 430 610 70" fill="none" stroke="#2457d6" stroke-width="5"/><circle cx="252" cy="235" r="7" fill="#d97706"/><circle cx="508" cy="235" r="7" fill="#d97706"/><text x="252" y="265" text-anchor="middle" font-size="20">root</text><text x="508" y="265" text-anchor="middle" font-size="20">root</text><text x="400" y="310" font-size="18">turning point</text></svg><figcaption>Solving a quadratic equation means finding x-values where the graph has y=0—the x-intercepts.</figcaption></figure>'''
    if key == "parameter-graphs":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 760 350" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Family of straight lines with common intercept and different gradients</title><line x1="70" y1="280" x2="700" y2="280" stroke="#64748b"/><line x1="160" y1="330" x2="160" y2="40" stroke="#64748b"/><line x1="90" y1="250" x2="680" y2="70" stroke="#2457d6" stroke-width="4"/><line x1="90" y1="305" x2="680" y2="125" stroke="#7c3aed" stroke-width="4"/><line x1="90" y1="150" x2="680" y2="330" stroke="#d97706" stroke-width="4"/><circle cx="160" cy="228" r="6" fill="#111827"/><text x="182" y="218" font-size="19">same y-intercept</text></svg><figcaption>Keeping c fixed while changing m in y=mx+c changes gradient but not the y-intercept.</figcaption></figure>'''
    if key == "cylinder":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 700 380" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Cylinder labelled with radius and height</title><ellipse cx="350" cy="85" rx="150" ry="45" fill="#eef5ff" stroke="#2457d6" stroke-width="3"/><line x1="200" y1="85" x2="200" y2="285" stroke="#2457d6" stroke-width="3"/><line x1="500" y1="85" x2="500" y2="285" stroke="#2457d6" stroke-width="3"/><ellipse cx="350" cy="285" rx="150" ry="45" fill="#f8fbff" stroke="#2457d6" stroke-width="3"/><line x1="350" y1="85" x2="500" y2="85" stroke="#d97706" stroke-width="4"/><text x="420" y="70" text-anchor="middle" font-size="22">r</text><line x1="540" y1="85" x2="540" y2="285" stroke="#d97706" stroke-width="4"/><text x="560" y="190" font-size="22">h</text></svg><figcaption>Volume uses the circular base area πr² multiplied by height h; surface area requires interpreting which circular and curved surfaces are exposed.</figcaption></figure>'''
    if key == "right-triangle":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 720 390" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Right triangle labelled opposite adjacent and hypotenuse</title><polygon points="150,310 590,310 150,80" fill="#f8fbff" stroke="#2457d6" stroke-width="4"/><rect x="150" y="280" width="30" height="30" fill="none" stroke="#64748b"/><path d="M220 310 A70 70 0 0 1 212 278" fill="none" stroke="#d97706" stroke-width="3"/><text x="225" y="285" font-size="22">θ</text><text x="370" y="338" text-anchor="middle" font-size="22">adjacent</text><text x="116" y="200" text-anchor="middle" font-size="22" transform="rotate(-90 116 200)">opposite</text><text x="390" y="175" text-anchor="middle" font-size="22" transform="rotate(-28 390 175)">hypotenuse</text></svg><figcaption>Label sides relative to the reference angle before choosing Pythagoras or a trigonometric ratio.</figcaption></figure>'''
    if key == "similar-triangles":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 780 330" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Two similar right triangles with proportional sides</title><polygon points="80,260 300,260 80,130" fill="#f8fbff" stroke="#2457d6" stroke-width="4"/><polygon points="400,260 730,260 400,65" fill="#f8fbff" stroke="#2457d6" stroke-width="4"/><text x="155" y="285" font-size="20">adj</text><text x="40" y="200" font-size="20">opp</text><text x="520" y="285" font-size="20">2× adj</text><text x="342" y="175" font-size="20">2× opp</text><text x="118" y="245" font-size="20">θ</text><text x="440" y="245" font-size="20">θ</text></svg><figcaption>All corresponding lengths scale together, so opposite/hypotenuse, adjacent/hypotenuse and opposite/adjacent stay constant for the same angle.</figcaption></figure>'''
    if key == "enlargement":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 760 390" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Triangle enlarged from a centre by a common scale factor</title><circle cx="90" cy="300" r="7" fill="#111827"/><text x="65" y="330" font-size="20">centre</text><polygon points="220,255 300,275 255,185" fill="#eef5ff" stroke="#2457d6" stroke-width="3"/><polygon points="350,210 510,250 420,70" fill="none" stroke="#d97706" stroke-width="4"/><line x1="90" y1="300" x2="510" y2="250" stroke="#cbd5e1"/><line x1="90" y1="300" x2="420" y2="70" stroke="#cbd5e1"/><line x1="90" y1="300" x2="350" y2="210" stroke="#cbd5e1"/></svg><figcaption>Each image vertex lies on the same ray from the centre as its original vertex, at a distance multiplied by the common scale factor.</figcaption></figure>'''
    if key == "distributions":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 800 360" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Two distributions with similar centre but different spread</title><line x1="70" y1="150" x2="740" y2="150" stroke="#64748b"/><line x1="70" y1="310" x2="740" y2="310" stroke="#64748b"/><path d="M120 150 C210 145 255 80 330 70 C405 60 455 140 520 148 C600 155 650 150 700 150" fill="none" stroke="#2457d6" stroke-width="5"/><path d="M110 310 C190 300 230 240 330 215 C430 190 525 255 610 295 C650 306 685 310 720 310" fill="none" stroke="#d97706" stroke-width="5"/><text x="80" y="45" font-size="20">narrower spread</text><text x="80" y="205" font-size="20">wider spread</text></svg><figcaption>Similar centres do not imply similar distributions. Compare centre, spread and shape together.</figcaption></figure>'''
    if key == "tree":
        return f'''<figure class="math-concept-diagram"><svg viewBox="0 0 800 420" role="img" aria-labelledby="{title_id}"><title id="{title_id}">Two-stage probability tree</title><circle cx="90" cy="210" r="7" fill="#111827"/><line x1="98" y1="205" x2="300" y2="105" stroke="#2457d6" stroke-width="3"/><line x1="98" y1="215" x2="300" y2="315" stroke="#2457d6" stroke-width="3"/><text x="210" y="135" font-size="20">R</text><text x="210" y="300" font-size="20">B</text><line x1="300" y1="105" x2="600" y2="55" stroke="#64748b"/><line x1="300" y1="105" x2="600" y2="155" stroke="#64748b"/><line x1="300" y1="315" x2="600" y2="265" stroke="#64748b"/><line x1="300" y1="315" x2="600" y2="365" stroke="#64748b"/><text x="620" y="62" font-size="19">RR</text><text x="620" y="162" font-size="19">RB</text><text x="620" y="272" font-size="19">BR</text><text x="620" y="372" font-size="19">BB</text></svg><figcaption>Multiply probabilities along each path. Without replacement, second-stage branch probabilities must be updated after the first result.</figcaption></figure>'''
    return ""


def page_for(unit: dict[str, str]) -> str:
    code = unit["code"]
    profile = PROFILES[code]
    path = ROOT / f'year9/maths/{unit["slug"]}/index.html'
    legacy = path.read_text(encoding="utf-8")
    canonical = find_canonical(legacy) or f'https://skillrhub.com/year9/maths/{unit["slug"]}/'
    teacher = href_for(legacy, "teacher slides") or "teacher-slides/"
    worksheet = href_for(legacy, "practice sheet", "worksheet") or f'/quiz/year-9/math/{code.lower()}/worksheet/'
    homework = href_for(legacy, "homework") or f'/quiz/year-9/math/{code.lower()}/homework/'
    practice = href_for(legacy, "practice") or f'/quiz/year-9/math/{code.lower()}/practice/'
    if practice == worksheet:
        practice = f'/quiz/year-9/math/{code.lower()}/practice/'
    test = href_for(legacy, "test") or f'/quiz/year-9/math/{code.lower()}/test/'

    title = f'{profile["title"]} | {code} Year 9 Maths'
    description = f'{code} Year 9 Maths: {profile["title"]}. Worked examples, misconceptions, practice, assessment and Australian/VIC/NSW curriculum mapping.'
    if len(description) > 170:
        description = description[:166].rsplit(' ', 1)[0] + '…'

    alignments = [
        {"@type":"AlignmentObject","alignmentType":"teaches","educationalFramework":"Australian Curriculum v9.0","targetName":f'{code} — {unit["descriptor"]}',"targetUrl":ACARA},
        {"@type":"AlignmentObject","alignmentType":"teaches","educationalFramework":"Victorian Curriculum F–10 Version 2.0","targetName":profile["vic"],"targetUrl":VCAA},
        {"@type":"AlignmentObject","alignmentType":"teaches","educationalFramework":"NSW Mathematics K–10 Syllabus (2022)","targetName":profile["nsw"],"targetUrl":NSW},
    ]
    learning_schema = {
        "@context":"https://schema.org","@type":"LearningResource","name":f'{profile["title"]} — {code}',
        "url":canonical,"inLanguage":"en-AU","isAccessibleForFree":True,"educationalLevel":"Year 9",
        "learningResourceType":["Lesson","Worked examples","Practice"],"teaches":unit["descriptor"],
        "educationalAlignment":alignments,
    }
    breadcrumb_schema = {
        "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://skillrhub.com/"},
            {"@type":"ListItem","position":2,"name":"Year 9","item":"https://skillrhub.com/year9/"},
            {"@type":"ListItem","position":3,"name":"Mathematics","item":"https://skillrhub.com/year9/curriculum/maths/"},
            {"@type":"ListItem","position":4,"name":code,"item":canonical},
        ],
    }

    learn_body = f'<p>{esc(profile["summary"])}</p><h3>By the end of this lesson, you should be able to:</h3>{bullets(profile["goals"])}'
    teaching_body = ''.join(f'<h3>{esc(name)}</h3><p>{esc(text)}</p>' for name, text in profile["teaching"])
    examples_body = diagram(code, profile.get("diagram")) + ''.join(
        f'<article class="curriculum-worked-example"><h3>{esc(name)}</h3><p>{esc(text)}</p></article>' for name, text in profile["examples"]
    )
    misconceptions_body = '<ul>' + ''.join(f'<li><strong>{esc(a)}:</strong> {esc(b)}</li>' for a,b in profile["misconceptions"]) + '</ul>'
    guided_body = numbered(profile["guided"]) + '<p class="math-v2-note"><strong>Guided method:</strong> Name the mathematical structure first, show the calculation or representation, then verify with an estimate, inverse operation, second representation or digital check.</p>'
    independent_body = numbered(profile["independent"])
    reasoning_body = f'<p>{esc(profile["reasoning"])}</p><p class="math-v2-note"><strong>Reasoning standard:</strong> Make a claim, show the relevant mathematical evidence, explain why it supports the conclusion and state any condition or limitation.</p>'
    qa_body = '<dl>' + ''.join(f'<dt><strong>{esc(q)}</strong></dt><dd>{esc(a)}</dd>' for q,a in profile["qa"]) + '</dl>'
    assessment_body = numbered(profile["assessment"]) + '<p><strong>Review hint:</strong> A full-mark response shows the method, keeps units and restrictions visible, interprets the result in context and checks whether the answer is reasonable.</p>'
    mastery_body = '<ul class="curriculum-check-list">' + ''.join(f'<li>{esc(item)}</li>' for item in profile["mastery"]) + '</ul><p><strong>Exit ticket:</strong> Solve one unfamiliar example and explain the key decision in words, not just symbols.</p>'
    guidance_body = f'<div class="math-v2-grid"><article class="math-v2-card"><h3>For teachers</h3><p>{esc(profile["teacher"])}</p></article><article class="math-v2-card"><h3>For parents and carers</h3><p>{esc(profile["parent"])}</p></article></div>'

    elaborations = legacy_elaborations(legacy)
    elaboration_html = ""
    if elaborations:
        elaboration_html = '<details class="curriculum-subsection"><summary><strong>Australian Curriculum elaboration examples retained from the existing lesson</strong></summary><ul>' + ''.join(
            f'<li><strong>{esc(label)}:</strong> {esc(text)}</li>' for label,text in elaborations
        ) + '</ul></details>'
    international = detail_block(legacy, r'International curriculum')
    international_html = f'<details class="curriculum-subsection"><summary><strong>International curriculum comparison retained from the existing lesson</strong></summary>{international}</details>' if international else ""
    alignment_body = f'''<p><strong>Australian Curriculum v9.0 — {esc(code)}:</strong> {esc(unit["descriptor"])}</p>
<p><strong>Victoria:</strong> {esc(profile["vic"])}. The mapping names direct Level 9 content where available and explicitly identifies supporting content where the Victorian structure separates an idea differently.</p>
<p><strong>NSW:</strong> {esc(profile["nsw"])}. NSW organises Years 7–10 Mathematics through Stage 5 Core content groups and Paths rather than a one-code-per-Year-9 structure, so this lesson does not force a false one-to-one outcome.</p>
<div class="curriculum-table-wrap"><table class="math-map-table"><thead><tr><th>Lesson component</th><th>Australian Curriculum</th><th>Victoria</th><th>NSW</th></tr></thead><tbody><tr><td>Concept teaching + worked examples</td><td>{esc(code)}</td><td>{esc(profile["vic"])}</td><td>{esc(profile["nsw"])}</td></tr><tr><td>Guided + independent practice</td><td>Applies the descriptor through progressively less-scaffolded problems</td><td>Builds the corresponding Level 9 mathematical knowledge and fluency</td><td>Supports Stage 5 Core/Path application and Working mathematically</td></tr><tr><td>Reasoning + assessment + mastery</td><td>Checks transfer, justification, interpretation and model limits</td><td>Checks Level 9 reasoning at the mapped content depth</td><td>Checks relevant Stage 5 reasoning without claiming a false Year 9 equivalent</td></tr></tbody></table></div>{elaboration_html}{international_html}'''

    resource_links = [
        (teacher, "Teacher Slides", True),
        (homework, "Homework", False),
        (worksheet, "Practice Sheet", False),
        (practice, "Practice", False),
        (test, "Test", False),
    ]
    resources_body = '<div class="curriculum-link-row">' + ''.join(
        f'<a class="curriculum-button{" primary" if primary else ""}" href="{esc(href)}">{esc(label)}</a>' for href,label,primary in resource_links
    ) + '</div>'

    related_items = []
    for related_code in profile["related"]:
        related_unit = UNITS.get(related_code)
        if related_unit:
            related_items.append(f'<li><a href="/year9/maths/{esc(related_unit["slug"])}/">{esc(related_code)} — {esc(PROFILES[related_code]["title"])}</a></li>')
    related_body = '<p>Use these links to move through the Year 9 learning sequence rather than studying the code in isolation.</p><ul>' + ''.join(related_items) + '</ul>'
    refs_body = f'''<ul class="curriculum-source-list"><li><a href="{ACARA}" rel="nofollow noopener" target="_blank">Australian Curriculum v9.0 — Mathematics</a></li><li><a href="{VCAA}" rel="nofollow noopener" target="_blank">Victorian Curriculum F–10 Version 2.0 — Mathematics</a></li><li><a href="{NSW}" rel="nofollow noopener" target="_blank">NSW Mathematics K–10 Syllabus (2022)</a></li></ul>'''

    lesson = ''.join([
        section("learn", "Learning goals: What you will learn", learn_body, True),
        section("prerequisites", "Prerequisite knowledge", f'<p>{esc(profile["prereq"])}</p>', True),
        section("teaching", "Concept teaching", teaching_body),
        section("examples", "Worked and modelled examples", examples_body),
        section("misconceptions", "Common misconceptions and corrections", misconceptions_body),
        section("guided-practice", "Guided practice", guided_body),
        section("independent-practice", "Independent practice", independent_body),
        section("reasoning", "Reasoning and problem-solving", reasoning_body),
        section("important-questions", "Important questions and answers", qa_body),
        section("assessment", "Assessment-style questions and review hints", assessment_body),
        section("mastery", "Exit ticket and mastery check", mastery_body),
        section("guidance", "Teacher and parent guidance", guidance_body),
        section("alignment", "Curriculum alignment", alignment_body),
        section("resources", "Practice and teaching resources", resources_body),
        section("related", "Related Year 9 Maths topics", related_body),
        section("official-references", "Official curriculum references", refs_body),
    ])

    feedback = feedback_block(legacy)
    hero_actions = ''.join([
        '<a class="primary" href="#learn">Learn</a>',
        f'<a href="{esc(teacher)}">Teacher Slides</a>',
        f'<a href="{esc(homework)}">Homework</a>',
        f'<a href="{esc(worksheet)}">Practice Sheet</a>',
        f'<a href="{esc(practice)}">Practice</a>',
        f'<a href="{esc(test)}">Test</a>',
    ])
    return f'''<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>{esc(title)}</title><meta name="description" content="{esc(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="{esc(canonical)}"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(description)}"><meta property="og:url" content="{esc(canonical)}"><meta property="og:type" content="article"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=5"><link rel="stylesheet" href="/assets/year9-maths-topic-v2.css?v=1"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-8P22BET45N');</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script><script type="application/ld+json">{json.dumps(learning_schema, ensure_ascii=False, separators=(',', ':'))}</script><script type="application/ld+json">{json.dumps(breadcrumb_schema, ensure_ascii=False, separators=(',', ':'))}</script></head>
<body class="curriculum-shell year9-maths-v2"><div class="curriculum-page"><nav class="main-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/year9/curriculum/maths/">Maths</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav><nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year9/">Year 9</a></li><li><a href="/year9/curriculum/maths/">Maths</a></li><li aria-current="page">{esc(code)}</li></ol></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">{esc(code)} • Year 9 Maths • {esc(unit["strand"])}</p><h1>{esc(profile["title"])} — {esc(code)}</h1><p class="curriculum-hero__lead">{esc(profile["summary"])}</p><div class="topic-action-row">{hero_actions}</div><button class="report-issue-button" type="button" data-report-issue>Report issue</button></header><main class="curriculum-layout curriculum-layout--single"><div id="topic-guide">{lesson}</div>{feedback}</main></div><script>window.skillrPageMeta={{curriculumCode:{json.dumps(code)},pageType:'topic guide',year:'Year 9',subject:'Maths'}};</script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>'''


UNITS = parse_units()
for unit in UNITS.values():
    output = ROOT / f'year9/maths/{unit["slug"]}/index.html'
    output.write_text(page_for(unit), encoding="utf-8")

print(f"Built {len(UNITS)} Year 9 Maths Static Curriculum Architecture v2 topic pages.")
