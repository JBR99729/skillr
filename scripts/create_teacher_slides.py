#!/usr/bin/env python3
"""Generate one branded, curriculum-specific teacher slide for every unit."""

import argparse
import base64
import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, NameObject, NullObject, StreamObject

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/curriculum-units.json"
BLUE = colors.HexColor("#173B70")
LIGHT = colors.HexColor("#EEF5FF")
GREEN = colors.HexColor("#167C5A")
INK = colors.HexColor("#17243A")
MUTED = colors.HexColor("#52647C")
FONT = "SkillrSans"
FONT_BOLD = "SkillrSans-Bold"

pdfmetrics.registerFont(TTFont(FONT, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont(FONT_BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


def make_pdf_ascii_safe(path):
    """Wrap binary PDF streams so repository APIs can transport them losslessly as UTF-8."""
    reader = PdfReader(path)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)

    for obj in writer._objects:
        if not isinstance(obj, StreamObject):
            continue
        old_filter = obj.get("/Filter")
        old_parms = obj.get("/DecodeParms")
        obj._data = base64.a85encode(obj._data, adobe=False, wrapcol=100) + b"~>"
        if old_filter is None:
            obj[NameObject("/Filter")] = NameObject("/ASCII85Decode")
            continue
        filters = list(old_filter) if isinstance(old_filter, ArrayObject) else [old_filter]
        obj[NameObject("/Filter")] = ArrayObject([NameObject("/ASCII85Decode"), *filters])
        if old_parms is not None:
            parms = list(old_parms) if isinstance(old_parms, ArrayObject) else [old_parms]
            obj[NameObject("/DecodeParms")] = ArrayObject([NullObject(), *parms])

    temporary_path = path.with_suffix(".tmp.pdf")
    with temporary_path.open("wb") as output:
        writer.write(output)
    pdf_bytes = temporary_path.read_bytes().replace(b"%\xe2\xe3\xcf\xd3", b"%SAFE")
    temporary_path.write_bytes(pdf_bytes)
    temporary_path.replace(path)


def tidy(value):
    text = re.sub(r"(?:\.\.\.|…)", " ", str(value or ""))
    return re.sub(r"\s+", " ", text).strip()


def display_title(unit):
    if unit["code"].startswith("AC9MF"):
        return unit["title"]
    if unit["code"] == "AC9M10P01":
        return "Conditional probability language: if-then, given, of and knowing that"
    description = tidy(unit.get("description") or unit.get("title")).rstrip(" .")
    return description[:1].upper() + description[1:]


def output_path(unit):
    return ROOT / "worksheets" / unit["yearFolder"] / unit["subjectSlug"] / "teacher-slides" / f"{unit['code'].lower()}-teacher-slide.pdf"


def wrap_lines(text, font, size, width):
    words, lines, line = tidy(text).split(), [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def slide_summary(text, max_words=28):
    value = tidy(text)
    value = re.split(r";\s*for example\b", value, maxsplit=1, flags=re.IGNORECASE)[0]
    value = re.split(r"\bfor example,", value, maxsplit=1, flags=re.IGNORECASE)[0]
    words = value.split()
    if len(words) > max_words:
        comma_parts = [part.strip() for part in value.split(",") if part.strip()]
        selected_parts = []
        for part in comma_parts:
            candidate_parts = [*selected_parts, part]
            if len(", ".join(candidate_parts).split()) <= max_words or not selected_parts:
                selected_parts = candidate_parts
            else:
                break
        if selected_parts and len(", ".join(selected_parts).split()) >= 8:
            words = ", ".join(selected_parts).split()
        else:
            words = words[:max_words]
        trailing_connectors = {"a", "an", "and", "as", "at", "by", "for", "from", "including", "of", "or", "such", "the", "to", "using", "with"}
        while words and words[-1].lower().strip(".,;:") in trailing_connectors:
            words.pop()
        value = " ".join(words)
    value = value.rstrip(" ,;:")
    if value and value[-1] not in ".!?":
        value += "."
    return value


def wrapped(c, text, x, y, width, size=9.2, leading=11.5, colour=INK, bold=False, max_lines=7, min_size=6.2):
    font = FONT_BOLD if bold else FONT
    draw_size = size
    lines = wrap_lines(text, font, draw_size, width)
    while len(lines) > max_lines and draw_size > min_size:
        draw_size = max(min_size, draw_size - 0.25)
        lines = wrap_lines(text, font, draw_size, width)
    if len(lines) > max_lines:
        raise ValueError(f"Teacher-slide text does not fit: {tidy(text)[:120]}")
    draw_leading = leading * (draw_size / size)
    c.setFont(font, draw_size)
    c.setFillColor(colour)
    for value in lines:
        c.drawString(x, y, value)
        y -= draw_leading
    return y


def bullet_layout(bullets, width, available_height):
    """Fit a bullet group as one balanced block without clipping or ellipses."""
    values = [
        slide_summary(bullet, 42 if len(bullets) == 1 else 32)
        for bullet in bullets[:3]
        if tidy(bullet)
    ]
    gap = 4.5
    for size in (9.2, 9.0, 8.8, 8.6, 8.4, 8.2, 8.0, 7.8, 7.6, 7.4, 7.2):
        leading = size * 1.24
        groups = [wrap_lines(value, FONT, size, width) for value in values]
        needed = sum(len(group) * leading for group in groups) + gap * max(0, len(groups) - 1)
        if needed <= available_height:
            return size, leading, groups, gap
    raise ValueError(f"Teacher-slide bullet group does not fit: {values!r}")


def box(c, x, y, w, h, title, bullets):
    c.setFillColor(colors.white)
    c.setStrokeColor(colors.HexColor("#CAD9EE"))
    c.roundRect(x, y, w, h, 10, fill=1, stroke=1)
    c.setFillColor(BLUE)
    c.setFont(FONT_BOLD, 12)
    c.drawString(x + 13, y + h - 22, title)
    cursor = y + h - 44
    bottom = y + 14
    size, leading, groups, gap = bullet_layout(bullets, w - 39, cursor - bottom)
    c.setFont(FONT, size)
    for group in groups:
        c.setFillColor(GREEN)
        c.circle(x + 17, cursor + size * 0.34, 2.2, fill=1, stroke=0)
        c.setFillColor(INK)
        for line in group:
            c.drawString(x + 26, cursor, line)
            cursor -= leading
        cursor -= gap


def build_slide(unit):
    path = output_path(unit)
    path.parent.mkdir(parents=True, exist_ok=True)
    width, height = landscape(A4)
    c = canvas.Canvas(str(path), pagesize=(width, height))
    c.setTitle(f"{unit['code']} {unit['title']} - Teacher Slide")
    c.setAuthor("SkillrHub")
    c.setFillColor(LIGHT)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    c.setFillColor(BLUE)
    c.rect(0, height - 132, width, 132, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont(FONT_BOLD, 11)
    c.drawString(34, height - 28, f"SKILLRHUB  |  {unit['levelLabel'].upper()} {unit['subject'].upper()}  |  {unit['code']}")
    title_bottom = wrapped(c, unit["title"], 34, height - 57, width - 68, 20, 23, colors.white, True, 4, 10)
    if tidy(unit["title"]).casefold() != tidy(unit["description"]).casefold():
        wrapped(c, slide_summary(unit["description"], 30), 34, title_bottom - 2, width - 68, 8.8, 10, colors.white, False, 2, 7)

    eligible = [slide_summary(e.get("text"), 24) for e in unit.get("elaborations", []) if e.get("questionEligible", True)]
    examples = sorted(eligible, key=len)[:3] or [unit["description"]]
    misconception = [
        "Ask the student to explain their choice, not only state an answer.",
        "Check that key vocabulary is understood in a new example.",
        "Mix representations so the skill is transferred rather than copied."
    ]
    check = [
        "Explain the main idea and give one accurate example.",
        "Show the idea in a second way: with words, a model, a diagram or symbols.",
        "Apply the idea to a short unfamiliar situation and justify the result."
    ]

    margin, gap = 34, 14
    col = (width - margin * 2 - gap * 2) / 3
    top, upper_h = height - 150, 180
    box(c, margin, top - upper_h, col, upper_h, "Learning intention", [unit["description"]])
    box(c, margin + col + gap, top - upper_h, col, upper_h, "Teach and model", examples)
    box(c, margin + (col + gap) * 2, top - upper_h, col, upper_h, "Check understanding", check)

    lower_y, lower_h = 72, 145
    box(c, margin, lower_y, col * 1.5 + gap / 2, lower_h, "Teaching cautions", misconception)
    box(c, margin + col * 1.5 + gap * 1.5, lower_y, col * 1.5 + gap / 2, lower_h, "Quick lesson sequence", [
        "Connect to prior knowledge and introduce the key vocabulary.",
        "Model one clear example, then solve a second example together.",
        "Finish with an independent check and a short student explanation."
    ])

    # Keep the ownership mark in the open band between the two card rows so it
    # remains clear in print without competing with lesson content.
    c.saveState()
    if hasattr(c, "setFillAlpha"):
        c.setFillAlpha(0.18)
    c.setFillColor(BLUE)
    c.setFont(FONT_BOLD, 24)
    c.drawCentredString(width / 2, 232, "SKILLRHUB.COM")
    c.restoreState()

    c.setFillColor(MUTED)
    c.setFont(FONT, 9)
    c.drawString(34, 31, "skillrhub.com  |  Topic guide, worksheet, practice and test")
    c.drawRightString(width - 34, 31, "SkillrHub teacher resource")
    c.showPage()
    c.save()
    make_pdf_ascii_safe(path)


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--min-year", type=int, default=0, choices=range(0, 11), help="Lowest year to generate")
    parser.add_argument("--code", action="append", help="Generate only a curriculum code (repeatable)")
    return parser.parse_args()


def main():
    args = parse_args()
    payload = json.loads(DATA.read_text(encoding="utf-8"))
    requested_codes = {code.upper() for code in (args.code or [])}
    units = [
        unit for unit in payload["units"]
        if unit["yearNumber"] >= args.min_year
        and (not requested_codes or unit["code"] in requested_codes)
    ]
    for unit in units:
        unit["title"] = display_title(unit)
        build_slide(unit)
    print(f"Generated {len(units)} teacher slides")


if __name__ == "__main__":
    main()
