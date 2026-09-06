"""Scoped text review of Foundation English LY01-LY05 topic pages and worksheets."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9EFLY01", "AC9EFLY02", "AC9EFLY03", "AC9EFLY04", "AC9EFLY05"]

TOPIC_ACTIVITIES = {
    "AC9EFLY01": [
        ("Use clues to name the text", "Show a story cover, fact page, recipe or sign. Ask: What kind of text is this? Which clue tells you?", "A strong answer names the text type and one visible clue such as characters, facts, numbered steps, labels, arrows or symbols."),
        ("Separate topic from purpose", "Compare an animal story and an animal fact page. What are both about? What is each one made to do?", "Both may share the same topic, but their purposes differ. The story usually entertains with characters and events; the fact page informs with checkable details."),
        ("Choose the helpful evidence", "A green sign has a running figure, arrow and doorway. What job does the sign do?", "The sign guides people to an exit. Ask learners to use the visual symbols as evidence, not just guess from colour or page position."),
        ("Explain the purpose", "Complete: I think this text is made to ____ because ____.", "Support: offer the purpose words entertain, inform, instruct or guide. Extend: compare two texts on the same topic with different purposes."),
    ],
    "AC9EFLY02": [
        ("Listen for the whole message", "A partner tells how their seed grew. What should you do before speaking?", "Wait until the speaker finishes, face them and listen for one detail you can respond to. This protects the speaker's turn."),
        ("Match voice to audience", "Practise the same sentence for one partner, a small group and the whole class. What changes?", "The words can stay similar, but the volume changes so the intended audience can hear without shouting."),
        ("Stay on topic", "A classmate says, I found a smooth shell at the beach. Give one connected reply or question.", "The response should reuse a detail from the message, such as shell or beach, and add a related comment or question."),
        ("Repair an interaction", "Sam interrupts and then talks about lunch when the classmate is explaining a pet. What two things should Sam fix?", "He should wait for his turn and respond to the pet topic. This checks turn-taking and relevance together."),
    ],
    "AC9EFLY03": [
        ("Check real or imagined", "Compare: A frog king invited the moon to tea. Frogs hatch from eggs. Which could be checked in real life?", "The egg sentence is informative because it can be checked. The frog king event is imaginative because it creates an unreal character and event."),
        ("Use more than one clue", "Can a picture alone prove whether a whale page is a story or information text?", "Usually no. Ask for words, labels, facts, characters or author purpose as extra evidence before deciding."),
        ("Name the purpose", "Which text is mainly made to entertain? Which is mainly made to inform?", "Imaginative texts often entertain through characters and events. Informative texts teach real-world facts, labels or explanations."),
        ("Make both versions", "Write or say one created rain event and one checkable rain fact.", "This makes the difference concrete: a rain cloud singing is imaginative; rain filling a tank is an informative fact if it can be checked."),
    ],
    "AC9EFLY04": [
        ("Blend through the word", "Point under mat from left to right and say each taught sound, then blend the whole word.", "The learner should use all printed letters in order. If they guess from the picture, ask them to return to the letters."),
        ("Reread to check meaning", "After blending den in A fox hid in a den, reread the sentence. Does the word fit?", "Den fits because it is a place a fox can hide. Rereading checks both sentence meaning and grammar."),
        ("Compare close words", "Read mud and mad. Which word fits The pig sat in the ____?", "Mud fits the sentence meaning and the printed vowel. This mirrors IXL-style short-vowel discrimination while keeping context in view."),
        ("Repair a misread word", "If hen is read as hat, what should the reader check?", "Look through every letter, blend again, reread the sentence and check whether the idea makes sense."),
    ],
    "AC9EFLY05": [
        ("Predict with evidence", "A cover shows muddy pawprints beside a missing boot. What might happen, and what clue supports it?", "A useful prediction uses the pawprints and missing boot as evidence, such as a dog may have moved it."),
        ("Visualise while listening", "Close your eyes while an adult reads a forest sentence. What mind picture do you make?", "The learner should describe an image built from the words, not count print or copy the title."),
        ("Ask a useful question", "A story says the nest is empty. What question would help you read on?", "A useful question targets missing information, such as Where did the birds go? or Will they come back?"),
        ("Revise after new evidence", "You predicted the dog took the boot. The next page shows a child carrying it. What should you do?", "A good reader updates the prediction when stronger evidence appears. This keeps comprehension flexible and evidence based."),
    ],
}

WORKSHEET_EDITS = {
    "AC9EFLY01": {
        0: {"question": "What is a story about a wombat's lost sock most likely made to do?", "answers": ["entertain with characters and events", "list true wombat body facts", "show the emergency exit"]},
        3: {"question": "Which cover clue most strongly suggests an informative animal book?", "answers": ["a labelled photograph and the title Animal Facts", "a dragon character searching for treasure", "a speech bubble saying Once upon a time"]},
        7: {"question": "You find a story, a fact page and care instructions about rabbits. Name each text's purpose and one clue that proves it.", "answer": "The story entertains using characters and events, the fact page informs using facts or labels, and the care instructions guide actions using ordered steps.", "hint": "For each text, say its job and the clue that shows that job."},
    },
    "AC9EFLY02": {
        0: {"question": "Zoe is telling a partner how her seed grew. What should the partner do before speaking?", "answers": ["Listen until Zoe finishes", "Begin a different story", "Call across the room", "Turn away and pack up"]},
        5: {"question": "Match the speaking situation to the best voice volume.", "hint": "Think about how far away the listener is and how many people need to hear."},
        8: {"question": "Sam interrupts, then answers with an unrelated lunch story. Explain how he can repair both problems.", "answer": "Sam should wait until the speaker finishes, then give a response about the same topic.", "hint": "Fix the timing first, then fix the topic."},
    },
    "AC9EFLY03": {
        0: {"question": "Which clue most strongly suggests an imaginative text?", "answers": ["A tiny dragon searches for a striped sock", "A diagram labels a frog's legs", "A page lists facts about rain", "A sign gives a safety rule"]},
        5: {"question": "A page shows a whale picture. What else helps decide whether it is imaginative or informative?", "answers": ["words, facts, labels or characters", "only the page number", "only the size of the picture", "only the colour blue"], "answer": "words, facts, labels or characters"},
        8: {"question": "Create two rain sentences: one imaginative event and one informative fact. Label each purpose.", "answer": "A valid pair includes a created entertaining event and a checkable informative fact, such as The rain cloud sang to the moon and Rain fills the water tank.", "hint": "One sentence can be made up; the other should be checkable."},
    },
    "AC9EFLY04": {
        0: {"question": "In the sentence The cat sat on the mat, point under mat and blend from left to right. Which whole word should you say?", "answers": ["mat", "cat", "sat", "map"], "answer": "mat"},
        3: {"question": "A reader says din for the printed word den in A fox hid in a den. How does the sentence meaning help repair the word?", "answer": "A den is a place where a fox can hide, so den fits the sentence meaning while din does not.", "hint": "Ask which word names a hiding place."},
        8: {"question": "A reader guesses a word from the picture only. Explain one problem with guessing and one thing decoding checks.", "answer": "A picture can suggest several words, but decoding checks the printed letters in order and then rereading checks the meaning.", "hint": "Name what the picture cannot prove and what the letters can prove."},
    },
    "AC9EFLY05": {
        0: {"question": "A cover shows muddy pawprints beside a missing boot. Which prediction uses the clue?", "answers": ["A dog may have moved the boot", "The moon will turn green", "The book has ten pages", "All boots can fly"]},
        5: {"question": "Match each reader thought to the strategy it shows.", "hint": "Connect remembers an experience, question wonders about something unclear, and predict says what may happen."},
        8: {"question": "You predicted that the dog took the boot. The next page shows a child carrying it. What should a thoughtful reader do?", "answer": "The reader should revise the prediction because the new page gives stronger evidence that the child has the boot.", "hint": "Use the newest evidence, even if it changes your first idea."},
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
    asset = ROOT / "quiz/assets/foundation-english-ly01-ly05-review.js"
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
    marker = "// Preserve authored LY01-LY05 worksheet banks for the scoped literacy review."
    if marker in source:
        source = source[:source.index(marker)]
    source += "\n" + marker + "\n"
    source += "window.SkillrFoundationEnglishLiteracyReview = Object.fromEntries("
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
                "foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2&review=20260906-literacy",
                source,
            )
            restore = '<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishLiteracyReview);</script><script src="/quiz/assets/foundation-english-ly01-ly05-review.js?v=20260906"></script>'
            if "foundation-english-ly01-ly05-review.js" not in source:
                pattern = r'(<script src="[^" ]*foundation-english-topic-module-balance-v2.js[^" ]*"></script>)'
                source, count = re.subn(pattern, r"\1" + restore, source)
                if count != 1:
                    raise RuntimeError(f"Could not wire worksheet review asset in {path}")
            path.write_text(source)


def write_report():
    report = ROOT / "docs/foundation-english-ly01-ly05-review-2026-09-06.md"
    report.write_text(
        "# Foundation English LY01-LY05 topic and worksheet review\n\n"
        "Text-only review of AC9EFLY01, AC9EFLY02, AC9EFLY03, AC9EFLY04 and AC9EFLY05. "
        "No classroom-view, Practice or Test content changed.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Tuned 15 worksheet questions across the base worksheet, Topic Practice 1 and Topic Practice 2 routes.\n"
        "- Preserved the existing nine-question worksheet structure and warm-up/core/challenge spread.\n"
        "- Removed only exact duplicate worked-example cards where present.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Foundation English alignment maps AC9EFLY03 to real-life/imaginative text decisions, "
        "AC9EFLY04 to phonics, decoding and context checks, and AC9EFLY05 to picture meaning, feelings and prediction. "
        "AC9EFLY01 and AC9EFLY02 have no direct mapped IXL skill in the public alignment, so their updates focus on the same instructional standard: "
        "short prompts, observable evidence, clear listening or text-purpose decisions, and original wording.\n"
    )


if __name__ == "__main__":
    improve_topic_pages()
    write_review_asset()
    preserve_reviewed_banks()
    wire_worksheet_pages()
    write_report()
