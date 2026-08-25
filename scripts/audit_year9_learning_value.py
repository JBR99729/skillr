#!/usr/bin/env python3
from pathlib import Path
import re, json, sys

ROOT = Path(__file__).resolve().parents[1]
SUBJECTS = ("maths","english","science")
GENERIC = (
    "what changes, what stays invariant",
    "then name the deciding relationship or limitation",
    "use the model evidence:",
    "relevant year 8",
)


def text(p):
    return p.read_text(encoding="utf-8", errors="ignore")


def count(html, pattern):
    return len(re.findall(pattern, html, re.I|re.S))


def audit(path):
    html = text(path)
    lower = html.lower()
    reasons=[]
    worked=count(html, r'class="curriculum-worked-example"')
    questions=count(html, r'<h3>\s*\d+\.')
    misconceptions=count(html, r'<strong>[^<]+</strong>\s*[—-]')
    if len(re.sub(r'<[^>]+>',' ',html)) < 2200: reasons.append("too little student-facing teaching content")
    if worked < 4: reasons.append(f"fewer than 4 worked/example blocks ({worked})")
    if questions < 8: reasons.append(f"fewer than 8 important mastery questions ({questions})")
    if misconceptions < 3: reasons.append(f"fewer than 3 explicit misconception fixes ({misconceptions})")
    for phrase in GENERIC:
        if lower.count(phrase) >= 2: reasons.append(f"template language repeated: {phrase}")
    if "revision notes" not in lower: reasons.append("missing revision notes")
    if "quick check" not in lower and "exit ticket" not in lower: reasons.append("missing mastery/exit check")
    # A page must contain concrete teaching evidence, not only curriculum wording.
    concrete = bool(re.search(r'(step\s*1|for example|because|therefore|⇒|=|\bexample\b)', html, re.I))
    if not concrete: reasons.append("no concrete worked reasoning detected")
    return reasons

records=[]
for subject in SUBJECTS:
    root=ROOT/"year9"/subject
    if not root.exists(): continue
    for d in sorted(root.iterdir()):
        p=d/"index.html"
        if p.exists() and re.match(r'ac9[a-z]9', d.name, re.I):
            reasons=audit(p)
            records.append({"subject":subject,"page":str(p.relative_to(ROOT)),"pass":not reasons,"reasons":reasons})

summary={
    "pages":len(records),
    "pass":sum(r["pass"] for r in records),
    "fail":sum(not r["pass"] for r in records),
    "minimum_standard":"8/10 student learning value gate"
}
out=ROOT/"tmp"/"year9-learning-value-audit.json"
out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps({"summary":summary,"records":records},indent=2)+"\n")
print(json.dumps(summary,indent=2))
for r in records:
    if not r["pass"]:
        print(f"FAIL {r['page']}: " + "; ".join(r["reasons"]))
sys.exit(1 if summary["fail"] else 0)
