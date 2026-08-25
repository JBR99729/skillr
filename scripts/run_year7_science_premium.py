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
        "victoria": text.lower().count("victoria"),
        "nsw": text.lower().count("nsw"),
        "structured_data": text.count("application/ld+json"),
    }


u.preserve_snapshot = strict_snapshot
u.main()
