#!/usr/bin/env python3
"""Generate one branded, curriculum-specific teacher slide for every unit."""

import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

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


def tidy(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def output_path(unit):
    return ROOT / "worksheets" / unit["yearFolder"] / unit["subjectSlug"] / "teacher-slides" / f"{unit['code'].lower()}-teacher-slide.pdf"


def wrapped(c, text, x, y, width, size=9.2, leading=11.5, colour=INK, bold=False, max_lines=7):
    font = FONT_BOLD if bold else FONT
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
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        lines[-1] = lines[-1].rstrip(".,;:") + "..."
    c.setFont(font, size)
    c.setFillColor(colour)
    for value in lines:
        c.drawString(x, y, value)
        y -= leading
    return y


def box(c, x, y, w, h, title, bullets):
    c.setFillColor(colors.white)
    c.setStrokeColor(colors.HexColor("#CAD9EE"))
    c.roundRect(x, y, w, h, 10, fill=1, stroke=1)
    c.setFillColor(BLUE)
    c.setFont(FONT_BOLD, 12)
    c.drawString(x + 13, y + h - 22, title)
    cursor = y + h - 44
    for bullet in bullets[:3]:
        c.setFillColor(GREEN)
        c.circle(x + 17, cursor - 3, 2.2, fill=1, stroke=0)
        cursor = wrapped(c, bullet, x + 26, cursor, w - 39, max_lines=4) - 5


def build_slide(unit):
    path = output_path(unit)
    path.parent.mkdir(parents=True, exist_ok=True)
    width, height = landscape(A4)
    c = canvas.Canvas(str(path), pagesize=(width, height))
    c.setTitle(f"{unit['code']} {unit['title']} - Teacher Slide")
    c.setAuthor("SkillrHub")
    c.setFillColor(LIGHT)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    c.saveState()
    c.setFillColor(colors.Color(0.09, 0.23, 0.44, alpha=0.05))
    c.setFont(FONT_BOLD, 60)
    c.translate(width / 2, height / 2)
    c.rotate(28)
    c.drawCentredString(0, 0, "SKILLRHUB")
    c.restoreState()

    c.setFillColor(BLUE)
    c.rect(0, height - 132, width, 132, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont(FONT_BOLD, 11)
    c.drawString(34, height - 28, f"SKILLRHUB  |  {unit['levelLabel'].upper()} {unit['subject'].upper()}  |  {unit['code']}")
    title_bottom = wrapped(c, unit["title"], 34, height - 57, width - 68, 20, 23, colors.white, True, 2)
    wrapped(c, unit["description"], 34, title_bottom - 2, width - 68, 8.8, 10, colors.white, False, 2)

    eligible = [tidy(e.get("text")) for e in unit.get("elaborations", []) if e.get("questionEligible", True)]
    examples = eligible[:3] or [unit["description"]]
    misconception = [
        "Ask the student to explain their choice, not only state an answer.",
        "Check that key vocabulary is understood in a new example.",
        "Mix representations so the skill is transferred rather than copied."
    ]
    check = [
        f"Explain the main idea in {unit['title'].lower()} using an example.",
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

    c.setFillColor(MUTED)
    c.setFont(FONT, 9)
    c.drawString(34, 31, "skillrhub.com  |  Topic guide, worksheet, practice and test")
    c.drawRightString(width - 34, 31, "SkillrHub teacher resource")
    c.showPage()
    c.save()


def main():
    payload = json.loads(DATA.read_text(encoding="utf-8"))
    units = payload["units"]
    for unit in units:
        build_slide(unit)
    print(f"Generated {len(units)} teacher slides")


if __name__ == "__main__":
    main()
