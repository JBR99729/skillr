#!/usr/bin/env python3
"""Create the branded one-page AC9M1N01 teacher slide PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "worksheets/year1/maths/year-1-numbers-to-120/ac9m1n01-teacher-slide.pdf"
BLUE = colors.HexColor("#173B70")
LIGHT = colors.HexColor("#EEF5FF")
GREEN = colors.HexColor("#167C5A")
INK = colors.HexColor("#17243A")
MUTED = colors.HexColor("#52647C")
FONT = "SkillrSans"
FONT_BOLD = "SkillrSans-Bold"

pdfmetrics.registerFont(TTFont(FONT, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont(FONT_BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


def wrapped(c, text, x, y, width, size=11, leading=14, colour=INK, bold=False):
    font = FONT_BOLD if bold else FONT
    c.setFont(font, size)
    c.setFillColor(colour)
    words, lines, line = text.split(), [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    for value in lines:
        c.drawString(x, y, value)
        y -= leading
    return y


def box(c, x, y, w, h, title, bullets):
    c.setFillColor(colors.white)
    c.setStrokeColor(colors.HexColor("#CAD9EE"))
    c.roundRect(x, y, w, h, 10, fill=1, stroke=1)
    c.setFillColor(BLUE)
    c.setFont(FONT_BOLD, 13)
    c.drawString(x + 14, y + h - 23, title)
    cursor = y + h - 48
    for bullet in bullets:
        c.setFillColor(GREEN)
        c.circle(x + 18, cursor - 3, 2.3, fill=1, stroke=0)
        cursor = wrapped(c, bullet, x + 27, cursor, w - 42, 9.5, 12, INK) - 6


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    width, height = landscape(A4)
    c = canvas.Canvas(str(OUTPUT), pagesize=(width, height))
    c.setTitle("AC9M1N01 Numbers to 120 - Teacher Slide")
    c.setAuthor("SkillrHub")
    c.setFillColor(LIGHT)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    c.saveState()
    c.setFillColor(colors.Color(0.09, 0.23, 0.44, alpha=0.05))
    c.setFont(FONT_BOLD, 62)
    c.translate(width / 2, height / 2)
    c.rotate(28)
    c.drawCentredString(0, 0, "SKILLRHUB")
    c.restoreState()

    c.setFillColor(BLUE)
    c.rect(0, height - 108, width, 108, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont(FONT_BOLD, 12)
    c.drawString(34, height - 31, "SKILLRHUB  |  YEAR 1 MATHEMATICS  |  AC9M1N01")
    c.setFont(FONT_BOLD, 27)
    c.drawString(34, height - 67, "Numbers to 120")
    c.setFont(FONT, 11)
    c.drawString(34, height - 90, "Recognise, represent and order numbers using numerals, number lines and charts")

    margin, gap = 34, 14
    col = (width - margin * 2 - gap * 2) / 3
    top, box_h = height - 132, 190
    box(c, margin, top - box_h, col, box_h, "Learning intention", [
        "Read, write and name numbers from 0 to at least 120.",
        "Locate and order numbers on tracks, number lines and hundreds charts.",
        "Explain a number using tens and ones."
    ])
    box(c, margin + col + gap, top - box_h, col, box_h, "Teach and model", [
        "Build a number with bundles of ten and single objects.",
        "Compare the tens first, then compare the ones when the tens match.",
        "Move one space left or right on a chart for one less or one more; move a row for ten less or ten more."
    ])
    box(c, margin + (col + gap) * 2, top - box_h, col, box_h, "Check understanding", [
        "What comes before and after 99?", "Order 16, 61 and 66 and explain your choice.",
        "Place 74 on an empty number line and justify its position."
    ])

    lower_y, lower_h = 74, 150
    box(c, margin, lower_y, col * 1.5 + gap / 2, lower_h, "Common misconceptions", [
        "Reversing similar numerals such as 16 and 61.",
        "Thinking 100 is followed by 200 instead of 101.",
        "Comparing only the final digit instead of checking tens first."
    ])
    box(c, margin + col * 1.5 + gap * 1.5, lower_y, col * 1.5 + gap / 2, lower_h, "Quick classroom routine", [
        "Say it: teacher names a number and students show its numeral.",
        "Build it: represent the number with tens and ones.",
        "Place it: mark the number on a line or chart and name its neighbours."
    ])

    c.setFillColor(MUTED)
    c.setFont(FONT, 9)
    c.drawString(34, 32, "skillrhub.com  |  Free topic guide, worksheet, practice and test")
    c.drawRightString(width - 34, 32, "SkillrHub teacher resource")
    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    main()
