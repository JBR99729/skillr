"""Scoped text review of Foundation English LY06-LY08 and LY13-LY14."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9EFLY06", "AC9EFLY07", "AC9EFLY08", "AC9EFLY13", "AC9EFLY14"]

TOPIC_ACTIVITIES = {
    "AC9EFLY06": [
        ("Say the idea first", "Before writing, say the whole idea aloud: My seed grew. Does it tell one complete message?", "A clear spoken idea gives the draft a target. If the idea is unclear, repair meaning before checking capitals or punctuation."),
        ("Edit for meaning", "Read sam the cat fed. What does the writer mean? Move the words so the event makes sense.", "Meaning comes before neat copying. The repaired sentence could be Sam fed the cat. Then check the capital name and full stop."),
        ("Check sentence boundaries", "In Sam fed the cat, point to the capital beginning, the name capital and the ending mark.", "This connects shared editing to visible sentence features without turning it into a handwriting task only."),
        ("Spell and reread", "Say cat slowly, map each sound to a letter, write it, then reread the whole sentence.", "Support: use counters for the three sounds. Extend: replace cat with cot and explain how the meaning changes."),
    ],
    "AC9EFLY07": [
        ("Choose one report topic", "Pick one event or idea to report, such as how a bean seed changed. What is your opening sentence?", "The opening should name the topic so listeners know what the report is about."),
        ("Order two details", "Use two picture prompts to tell what happened first and next.", "Picture prompts keep the report in order and reduce memory load while preserving the speaking skill."),
        ("Use a voice for the audience", "Say the same report to a partner, group and whole class. What changes about your voice?", "Volume and pace should fit the audience. The report should be audible without shouting."),
        ("Rehearse and repair", "If the report is rushed or hard to hear, choose two rehearsal changes.", "Useful changes include slowing down, pausing between details, facing listeners and using a clearer volume."),
    ],
    "AC9EFLY08": [
        ("Start at the model", "Before forming a new letter, point to its modelled starting point.", "Formation improves when learners notice where to begin and which direction to move before writing."),
        ("Describe the movement", "Trace lower-case c, n and v. Which one curves, bumps or slants?", "This builds useful formation language without requiring every school to use the same handwriting script."),
        ("Compare with the model", "After copying a letter, compare its shape, size and movement with the taught model.", "The check should focus on recognisable formation, not speed or decoration."),
        ("Write a word slowly", "Copy one simple word and circle a letter whose starting point and movement you can explain.", "Support: copy one letter at a time. Extend: compare an upper-case letter with its lower-case partner."),
    ],
    "AC9EFLY13": [
        ("Say and map sounds", "Say map slowly. What sound do you hear first, in the middle and at the end?", "The learner should map heard sounds to taught letters in order before writing the word."),
        ("Use every sound", "Compare plan and pan. Which sound is missing in pan?", "This checks whether the spelling represents all heard sounds, including a consonant after the first sound."),
        ("Check a letter team", "Spell fish. Which two letters work together for the final sound?", "The final sound in fish is represented by sh. The learner should explain the team as one sound, not two separate ending sounds."),
        ("Blend back to check", "After writing drum, blend the spelling from left to right. Does it say the intended word?", "Reading the spelling back catches omitted, reordered or replaced sounds."),
    ],
    "AC9EFLY14": [
        ("Read the whole word", "Point to the in The dog is on the rug and read it as one familiar word.", "High-frequency word practice should use the complete word, not only the first letter."),
        ("Look, cover, write, check", "Look at my, cover it, write it, then compare every letter with the model.", "This builds accurate memory for short familiar words without relying on guessing."),
        ("Use sentence context", "Choose the word that fits: The dog ____ here.", "Context checks meaning and grammar. The best word is is because it completes the sentence."),
        ("Repair familiar words", "Fix Teh dog si on the rug. Which two words changed?", "The repaired sentence is The dog is on the rug. Learners should identify the and is as complete word repairs."),
    ],
}

WORKSHEET_EDITS = {
    "AC9EFLY06": {
        0: {"question": "What should a group do before writing the first draft of a class event?", "answers": ["Say the intended idea clearly", "Choose random words", "Add a full stop to an empty page", "Copy an unrelated sentence"]},
        6: {"question": "A draft has confusing word order and also lacks a full stop. Which edit should happen first?", "answers": ["Repair the meaning and word order", "Add decoration", "Copy it neatly", "Change every word"]},
        8: {"question": "The first visible draft is sam fed the cat. The edited sentence is Sam fed the cat. Explain the two visible edits.", "answer": "The name Sam begins with a capital letter and the telling sentence ends with a full stop.", "hint": "Check the first letter and the final mark."},
    },
    "AC9EFLY07": {
        0: {"question": "A student is reporting how a bean seed changed. Which opening stays on topic?", "answers": ["Our bean seed grew two green leaves", "My shoes have blue laces", "Lunch begins at noon", "I know a funny joke"]},
        4: {"question": "What is the main reason to rehearse a short spoken report?", "answers": ["To check order, clarity and volume", "To add unrelated facts", "To speak as fast as possible", "To avoid looking at listeners"]},
        8: {"question": "A report is accurate but rushed and hard to hear. Explain two rehearsal changes that would help listeners.", "answer": "The speaker can slow down, pause between details and use a clear volume that reaches the audience.", "hint": "Fix pace and volume."},
    },
    "AC9EFLY08": {
        1: {"question": "What should a writer notice before forming a newly taught letter?", "answers": ["The modelled starting point", "The page number only", "How fast a friend writes", "The pencil colour only"]},
        6: {"question": "One lower-case c sample is open on the right and follows the taught curve. Another is closed like a circle. Which sample is easier to recognise as c?", "answers": ["The open sample following the taught curve", "The closed circle sample", "Both are always identical", "Neither can be checked"]},
        8: {"question": "Compare upper-case A with lower-case a. Explain why the lower-case letter is not just a smaller capital.", "answer": "Upper-case A and lower-case a use different taught movements and shapes, so the lower-case letter is formed in its own way.", "hint": "Compare shape and movement, not just size."},
    },
    "AC9EFLY13": {
        2: {"question": "Which printed letter sequence spells ship, including the two-letter team for its beginning sound?", "answers": ["ship", "sip", "shop", "chip"], "answer": "ship"},
        5: {"question": "A learner writes pan for the spoken word plan. Identify the missing sound and letter, then rewrite the word.", "answer": "The /l/ sound after /p/ is missing; add lower-case l after p to write plan.", "hint": "Say plan slowly and listen just after the first sound."},
        8: {"question": "A child writes mip for the made-up spoken word mip. Explain why this is a plausible spelling.", "answer": "The spelling represents the heard beginning, middle and final sounds in order and blends back to mip.", "hint": "Check whether each heard sound has a matching letter."},
    },
    "AC9EFLY14": {
        0: {"question": "Read the printed word the in the sentence The dog is on the rug.", "answer": "The"},
        3: {"question": "Match each familiar word to the sentence it completes.", "hint": "Read each sentence aloud and choose the word that makes meaning and grammar fit."},
        8: {"question": "Explain why checking every letter after writing the from memory is stronger than checking only its first letter.", "answer": "Checking every letter confirms the complete printed sequence in the word the rather than accepting another word that starts with t.", "hint": "A first letter is only one clue; the whole word must match."},
    },
}


def normalise_text(value: str) -> str:
    return " ".join(value.split())


def improve_topic_pages():
    for code, activities in TOPIC_ACTIVITIES.items():
        path = next((ROOT / "foundation/english").glob(code.lower() + "*/index.html"))
        doc = html.fromstring(path.read_text())
        body = doc.xpath("//main/div")[0]
        for old in body.xpath('./details[@data-literacy-review="true"]'):
            body.remove(old)

        seen = set()
        for article in list(doc.xpath('//article[contains(@class,"curriculum-worked-example")]')):
            key = normalise_text(" ".join(article.itertext())).lower()
            if key in seen:
                article.getparent().remove(article)
            else:
                seen.add(key)

        articles = "".join(
            "<article><h3>" + escape(title) + "</h3><p>" + escape(prompt) + "</p>"
            + "<details><summary>Answer and teaching guidance</summary><p>" + escape(guidance) + "</p></details></article>"
            for title, prompt, guidance in activities
        )
        section = html.fragment_fromstring(
            '<details class="curriculum-topic-section" data-literacy-review="true">'
            '<summary><strong>Explain and apply</strong></summary>'
            '<div class="curriculum-detail-body">' + articles + "</div></details>"
        )
        body.insert(3, section)
        path.write_text("<!DOCTYPE html>\n" + html.tostring(doc, encoding="unicode", method="html") + "\n")


def write_review_asset():
    asset = ROOT / "quiz/assets/foundation-english-ly06-ly08-ly13-ly14-review.js"
    asset.write_text(
        "// Authored Literacy worksheet review; runs after the compatibility enhancer on these routes.\n"
        "(() => {\n"
        " const edits = " + json.dumps(WORKSHEET_EDITS, ensure_ascii=False) + ";\n"
        " for (const [code, changes] of Object.entries(edits)) {\n"
        "  const unit = window.SkillrFoundationEnglishWorksheetData?.[code];\n"
        "  if (!unit) continue;\n"
        "  for (const [index, edit] of Object.entries(changes)) {\n"
        "   const q = unit.questions[Number(index)];\n"
        "   if (!q) continue;\n"
        "   Object.assign(q, edit);\n"
        "   q.summary = `Check the answer: ${q.alignment.method}.`;\n"
        "  }\n"
        " }\n"
        "})();\n"
    )


def preserve_reviewed_banks():
    balance = ROOT / "quiz/assets/foundation-english-topic-module-balance-v2.js"
    source = balance.read_text()
    marker = "// Preserve authored LY06-LY08 and LY13-LY14 worksheet banks for the scoped literacy review."
    if marker in source:
        source = source[:source.index(marker)]
    source += "\n" + marker + "\n"
    source += "window.SkillrFoundationEnglishLiteracyReviewTwo = Object.fromEntries("
    source += json.dumps(CODES)
    source += ".map(code => [code, JSON.parse(JSON.stringify(window.SkillrFoundationEnglishWorksheetData[code]))]));\n"
    balance.write_text(source)


def wire_worksheet_pages():
    for code in CODES:
        worksheet_dir = ROOT / "quiz/grade-k/english" / code.lower() / "worksheet"
        for path in worksheet_dir.glob("**/index.html"):
            source = path.read_text()
            source = re.sub(
                r'foundation-english-topic-module-balance-v2.js\?[^" ]+',
                "foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2&review=20260906-literacy2",
                source,
            )
            restore = '<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishLiteracyReviewTwo);</script><script src="/quiz/assets/foundation-english-ly06-ly08-ly13-ly14-review.js?v=20260906"></script>'
            if "foundation-english-ly06-ly08-ly13-ly14-review.js" not in source:
                pattern = r'(<script src="[^" ]*foundation-english-topic-module-balance-v2.js[^" ]*"></script>)'
                source, count = re.subn(pattern, r"\1" + restore, source)
                if count != 1:
                    raise RuntimeError(f"Could not wire worksheet review asset in {path}")
            path.write_text(source)


def write_report():
    report = ROOT / "docs/foundation-english-ly06-ly08-ly13-ly14-review-2026-09-06.md"
    report.write_text(
        "# Foundation English LY06-LY08 and LY13-LY14 topic and worksheet review\n\n"
        "Text-only review of AC9EFLY06, AC9EFLY07, AC9EFLY08, AC9EFLY13 and AC9EFLY14. "
        "No classroom-view, Practice or Test content changed.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Tuned 15 worksheet questions across the base worksheet, Topic Practice 1 and Topic Practice 2 routes.\n"
        "- Preserved the existing nine-question worksheet structure and warm-up/core/challenge spread.\n"
        "- Removed only exact duplicate worked-example cards where present.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Foundation English alignment maps this area most strongly to sentence editing, "
        "phonics and spelling, letter formation, and sight-word reading. The updates keep questions short, "
        "evidence-based and Foundation-appropriate, while keeping all wording original.\n"
    )


if __name__ == "__main__":
    improve_topic_pages()
    write_review_asset()
    preserve_reviewed_banks()
    wire_worksheet_pages()
    write_report()
