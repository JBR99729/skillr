"""Scoped text review of Foundation English LA01-LA04 and LY15."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9EFLA01", "AC9EFLA02", "AC9EFLA03", "AC9EFLA04", "AC9EFLY15"]

TOPIC_ACTIVITIES = {
    "AC9EFLA01": [
        ("Notice who is listening", "A child needs help opening a paint jar. How would the words change for a teacher, friend or visiting adult?", "A strong answer keeps the same purpose but adjusts the words to fit the relationship and place."),
        ("Keep it respectful", "Change Move! into words that could be used with a librarian.", "For example: Excuse me, may I please get past? The request stays clear and becomes more suitable for the listener."),
        ("Compare home and school talk", "Name one phrase you might use at home and one you might use at school for asking for help.", "Both can be correct. The learner explains why each fits its context rather than ranking one as better."),
        ("Choose for purpose", "Complete: I chose these words because I was talking to ____ and I needed ____.", "Support: offer person and purpose cards. Extend: ask how the words would change for a different listener."),
    ],
    "AC9EFLA02": [
        ("Name the choice", "Choose between reading and drawing. Start with I prefer and name one choice.", "A preference needs a clear choice. The learner can answer orally if writing load gets in the way."),
        ("Add because", "Finish: I prefer drawing because ____.", "The reason should explain why the speaker likes that choice. Because links the preference to its reason."),
        ("Separate fact and preference", "Compare: The cup is blue. I like the blue cup best. Which one tells a personal choice?", "The second sentence is a preference because another person may choose differently."),
        ("Disagree politely", "A friend likes apples best. You prefer pears. What could you say?", "For example: I prefer pears because they are juicy. This shares a preference without dismissing the friend."),
    ],
    "AC9EFLA03": [
        ("Find the message", "Look at a sign, food label, picture book or weather page. What message does it communicate?", "A text is made to communicate. The learner should name the message, not only the object."),
        ("Name the form", "A red road sign says STOP. What form of text is it?", "It is a sign. The form helps readers know how to use the text quickly."),
        ("Match form and purpose", "Match picture book, food label and weather page to the job each one usually does.", "Picture books can tell stories, food labels name or describe food, and weather pages share forecasts."),
        ("Change speech into print", "Turn Pack away now into a simple printed classroom text.", "A valid answer keeps the message but changes the form, such as a classroom sign with words and a picture cue."),
    ],
    "AC9EFLA04": [
        ("Use book clues", "Before opening a book, point to the front cover and title. What do they help you know?", "The cover and title help identify the book and predict what it may be about."),
        ("Follow the reading path", "On a familiar English picture-book page, where do you usually begin reading and where do you move next?", "Begin at the top-left word, move left to right across the line, then move down when the line is finished."),
        ("Use screen navigation", "A screen has a speaker icon and a Next button. What does each feature help a reader do?", "The speaker icon usually plays audio; the Next button moves forward. The learner explains the job of each feature."),
        ("Compare print and screen", "Name one way a book page and screen page are organised differently.", "Accept differences such as turning a page versus tapping a button, or printed title versus screen title and icons."),
    ],
    "AC9EFLY15": [
        ("Find the base meaning", "Compare dog and dogs. What meaning stays in both words?", "Dog remains the base meaning. The added s changes number, not the animal meaning."),
        ("Add more-than-one", "Make cup mean more than one by adding the ending s.", "Cups keeps the base cup and adds an ending that means more than one."),
        ("Split a compound", "Split raincoat into two complete words and explain how the meanings work together.", "Rain and coat are meaningful parts. Together they name a coat used for rainy weather."),
        ("Correct the split", "A learner says every letter in dogs is a meaningful part. How would you fix that?", "Dogs is one whole word with the base dog and the ending s. Individual letters help spell the word but are not each separate meanings."),
    ],
}

WORKSHEET_EDITS = {
    "AC9EFLA01": {
        0: {"question": "You need help during class. Which words best fit talking with your teacher?", "answers": ["May I please have help?", "Give it now!", "Want to race me?"]},
        4: {"question": "Change Move! into words you could use when asking the librarian to let you pass.", "answer": "For example: Excuse me, may I please get past?", "hint": "Keep the same purpose, but choose words for a school adult."},
        8: {"question": "Write two ways to ask for help: one for a close friend during play and one for a teacher during class. Explain why the words change.", "answer": "A valid response keeps both requests respectful and explains that the words change because the listener and place change.", "hint": "Name who is listening in each situation."},
    },
    "AC9EFLA02": {
        0: {"question": "Which sentence clearly shares a preference and a reason?", "answers": ["I prefer pears because they are juicy.", "Pears are on the plate.", "Put the pear here."]},
        3: {"question": "Which statement is a preference rather than a fact?", "answers": ["I like the blue cup best.", "There are two cups.", "The cup is on the table."]},
        8: {"question": "A friend prefers apples. You prefer pears. Share your preference politely and give a reason.", "answer": "For example: I prefer pears because they are juicy. Other polite preference sentences with a reason are acceptable.", "hint": "Use I prefer and because."},
    },
    "AC9EFLA03": {
        0: {"question": "Which item was made to communicate a message?", "answers": ["A classroom sign that says Wash your hands", "An unmarked pebble", "An empty patch of carpet"], "answer": "A classroom sign that says Wash your hands"},
        3: {"question": "Which change turns a plain lunchbox into a text that communicates ownership?", "answers": ["Add a label that says Noah", "Move it to another shelf", "Put an apple inside it"], "answer": "Add a label that says Noah"},
        8: {"question": "Choose a familiar message, such as Pack away now. Show how it could become a sign, label or screen message, and explain its purpose.", "answer": "A valid response keeps the message, chooses a text form and explains what the reader should understand or do.", "hint": "Name the form and the job of the text."},
    },
    "AC9EFLA04": {
        0: {"question": "Which feature usually helps you identify a book before opening it?", "answers": ["Its front cover and title", "A speaker button", "A scrolling bar"]},
        3: {"question": "On a familiar English picture-book page, where would you usually begin reading?", "answers": ["At the top-left word", "At the last word at the bottom", "In the middle of the picture"]},
        8: {"question": "Compare a printed book page and a simple screen page. Name one organisation feature from each and explain how it helps the reader.", "answer": "A valid response names a book feature such as cover, title or page turn and a screen feature such as icon, button or scroll, with each feature's job.", "hint": "Use one print clue and one screen clue."},
    },
    "AC9EFLY15": {
        1: {"question": "Which printed word is made from cup plus an ending that means more than one?", "answers": ["cups", "cup", "cub", "cap"], "answer": "cups"},
        4: {"question": "What stays the same when cat changes to cats?", "answers": ["The base meaning cat", "The number of animals", "The whole printed ending", "Nothing at all"]},
        8: {"question": "A learner says every letter in dogs is a separate meaningful part. Correct the mix-up using whole word, base word and ending.", "answer": "Dogs is one whole word with the meaningful base dog and the added ending s, which means more than one.", "hint": "Split the word into dog plus s, not into every letter."},
    },
}


def normalise_text(value: str) -> str:
    return " ".join(value.split())


def improve_topic_pages():
    for code, activities in TOPIC_ACTIVITIES.items():
        path = next((ROOT / "foundation/english").glob(code.lower() + "*/index.html"))
        doc = html.fromstring(path.read_text())
        body = doc.xpath("//main/div")[0]
        attr = "data-language-review" if code.startswith("AC9EFLA") else "data-literacy-review"
        for old in body.xpath(f'./details[@{attr}="true"]'):
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
            f'<details class="curriculum-topic-section" {attr}="true">'
            '<summary><strong>Explain and apply</strong></summary>'
            '<div class="curriculum-detail-body">' + articles + "</div></details>"
        )
        body.insert(3, section)
        path.write_text("<!DOCTYPE html>\n" + html.tostring(doc, encoding="unicode", method="html") + "\n")


def write_review_asset():
    asset = ROOT / "quiz/assets/foundation-english-la01-la04-ly15-review.js"
    asset.write_text(
        "// Authored worksheet review; runs after the compatibility enhancer on these routes.\n"
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
    marker = "// Preserve authored LA01-LA04 and LY15 worksheet banks for the scoped review."
    if marker in source:
        source = source[:source.index(marker)]
    source += "\n" + marker + "\n"
    source += "window.SkillrFoundationEnglishFinalReview = Object.fromEntries("
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
                "foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2&review=20260906-final",
                source,
            )
            restore = '<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishFinalReview);</script><script src="/quiz/assets/foundation-english-la01-la04-ly15-review.js?v=20260906"></script>'
            if "foundation-english-la01-la04-ly15-review.js" not in source:
                pattern = r'(<script src="[^" ]*foundation-english-topic-module-balance-v2.js[^" ]*"></script>)'
                source, count = re.subn(pattern, r"\1" + restore, source)
                if count != 1:
                    raise RuntimeError(f"Could not wire worksheet review asset in {path}")
            path.write_text(source)


def write_report():
    report = ROOT / "docs/foundation-english-la01-la04-ly15-review-2026-09-06.md"
    report.write_text(
        "# Foundation English LA01-LA04 and LY15 topic and worksheet review\n\n"
        "Text-only review of AC9EFLA01, AC9EFLA02, AC9EFLA03, AC9EFLA04 and AC9EFLY15. "
        "No classroom-view, Practice or Test content changed.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Tuned 15 worksheet questions across the base worksheet, Topic Practice 1 and Topic Practice 2 routes.\n"
        "- Preserved the existing nine-question worksheet structure and warm-up/core/challenge spread.\n"
        "- Removed only exact duplicate worked-example cards where present.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Foundation English alignment maps this group most directly to book/text features, print/screen conventions and singular/plural word work. "
        "Language-interaction and preference items were reviewed against the same short-prompt standard, with original wording and clear Foundation-level reasoning.\n"
    )


if __name__ == "__main__":
    improve_topic_pages()
    write_review_asset()
    preserve_reviewed_banks()
    wire_worksheet_pages()
    write_report()
