import re
import upgrade_year7_science_premium as u


def strict_snapshot(text: str):
    canonical = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', text, re.I)
    return {
        "canonical": canonical.group(1) if canonical else None,
        "teacher_slides": text.lower().count("teacher-slides"),
        "homework_routes": text.lower().count("/homework/"),
        "practice_routes": text.lower().count("/practice/"),
        "test_routes": text.lower().count("/test/"),
        "report_issue": text.lower().count("report issue"),
        "victoria": len(re.findall(r"\bVictoria\b", text, re.I)),
        "nsw": len(re.findall(r"\bNSW\b", text, re.I)),
        "structured_data": text.count("application/ld+json"),
    }


# Keep diagram headings concise enough to remain legible at 640 px.
for code, title in {
    "AC9S7U01": "Dichotomous classification key",
    "AC9S7U02": "Food-web energy pathways",
    "AC9S7U03": "Eclipse alignment",
    "AC9S7U04": "Balanced and unbalanced forces",
    "AC9S7U05": "Particle model of states",
    "AC9S7U06": "Choosing a separation method",
}.items():
    u.CONTENT[code]["title"] = title

u.preserve_snapshot = strict_snapshot
u.main()
