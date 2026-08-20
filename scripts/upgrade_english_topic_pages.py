#!/usr/bin/env python3
"""Upgrade canonical English F–10 topic pages without changing URLs or resources.

The upgrader preserves each page's head, hero, analytics, canonical URL, resource
links, sidebar and related-topic navigation. It replaces only the generic lesson
body with an English-specific static instructional layer derived from the exact
content description and official elaborations already present on the page.

It intentionally uses original micro-examples rather than copyrighted extracts.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR_ROOTS = [ROOT / "foundation", *[ROOT / f"year{year}" for year in range(1, 11)]]


def clean(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def page_year(path: Path) -> int:
    name = path.parts[-4]
    if name == "foundation":
        return 0
    return int(name.removeprefix("year"))


def extract_code(source: str) -> str:
    match = re.search(r"AC9E[A-Z0-9]+", source)
    if not match:
        raise ValueError("English code not found")
    return match.group(0)


def extract_description(source: str) -> str:
    match = re.search(r"<strong>Content description:</strong>\s*(.*?)</li>", source, re.I | re.S)
    if match:
        return clean(match.group(1))
    match = re.search(r'<p class="curriculum-hero__lead">(.*?)</p>', source, re.I | re.S)
    if not match:
        raise ValueError("content description not found")
    return clean(match.group(1))


def extract_elaborations(source: str) -> list[str]:
    block = re.search(r"<h2>Curriculum coverage and elaborations</h2>(.*?)</section>", source, re.I | re.S)
    if not block:
        return []
    return [clean(text) for text in re.findall(r"<strong>E\d+:</strong>\s*(.*?)</li>", block.group(1), re.I | re.S)]


def focus_terms(description: str, elaborations: list[str]) -> list[str]:
    text = " ".join([description, *elaborations]).lower()
    candidates = [
        "audience", "purpose", "context", "language", "vocabulary", "pronouns", "values", "beliefs",
        "text structure", "paragraph", "sentence", "syntax", "punctuation", "image", "visual", "multimodal",
        "representation", "voice", "character", "theme", "literary", "rhetorical", "evidence", "argument",
        "perspective", "point of view", "cohesion", "modality", "metaphor", "imagery", "tone", "spelling",
        "phoneme", "grapheme", "morpheme", "word", "sentence", "reading", "writing", "speaking", "listening",
    ]
    found: list[str] = []
    for term in candidates:
        if term in text and term not in found:
            found.append(term)
    return found[:6] or ["meaning", "language choices", "audience"]


def micro_examples(description: str, elaborations: list[str], year: int) -> list[tuple[str, str]]:
    text = " ".join([description, *elaborations]).lower()
    if "inclusive" in text or "exclusive" in text or "empower" in text or "disempower" in text:
        return [
            ("Audience alignment", 'Compare “Obviously, we all want a safer school” with “One proposal is to improve school safety.” The first assumes agreement and pressures the reader to join the speaker’s position.'),
            ("Pronoun choice", '“We can solve this together” creates shared identity; “you people never listen” distances and labels a group.'),
            ("Shared values", 'A phrase such as “as responsible members of our community” appeals to a value the writer expects the audience to share.'),
            ("Inclusive vs marginalising labels", 'Compare “students who need language support” with a dismissive label. Word choice can grant dignity and agency or reduce people to a stereotype.'),
        ]
    if "evaluate" in text and ("value" in text or "attitude" in text):
        return [
            ("Explicit evaluation", '“The decision was reckless” directly states a judgement. Ask which value makes “reckless” a negative evaluation.'),
            ("Implicit evaluation", '“The council finally admitted the mistake” evaluates the council indirectly through “finally” and “admitted”.'),
            ("Compare wording", '“Protesters gathered” and “a mob descended” describe a similar event but position the audience differently.'),
            ("Evidence-based explanation", 'A strong analysis names the evaluative word, quotes or identifies it precisely, and explains the attitude or value it reveals.'),
        ]
    if "text structure" in text or "structures" in text or "paragraph" in text:
        return [
            ("Structure follows purpose", 'A review may open with an overall judgement, then group evidence by acting, plot and design; a news report often foregrounds the most important information first.'),
            ("Paragraph focus", 'Compare a paragraph that develops one claim with evidence to one that jumps between unrelated ideas. Cohesion depends on controlled sequencing.'),
            ("Mode changes structure", 'A print article may use paragraphs and subheadings; an online version may add navigation, embedded video and hyperlinks. Evaluate how those choices help or distract the reader.'),
            ("Effect, not feature spotting", 'Do not stop at “there is a heading”. Explain how the heading predicts content, guides navigation or frames interpretation.'),
        ]
    if "sentence" in text or "syntax" in text or "punctuation" in text:
        return [
            ("Change the syntax, change the effect", '“The storm destroyed the pier” foregrounds the storm; “The pier was destroyed” foregrounds the damage and can omit the agent.'),
            ("Sentence length", 'A long cumulative sentence can build detail; a short sentence after it can create emphasis: “The warnings continued for hours. Nobody moved.”'),
            ("Punctuation as meaning", 'Compare “Wait, Sam.” with “Wait Sam!” Punctuation helps shape rhythm, emphasis and the relationship between speaker and listener.'),
            ("Evaluate effectiveness", 'A sentence choice is effective only in relation to purpose, audience and surrounding context; there is no universally “best” sentence form.'),
        ]
    if "image" in text or "visual" in text or "multimodal" in text:
        return [
            ("Framing", 'A close-up can make an expression dominant; a wide shot can emphasise setting or isolation. Explain what the viewer is directed to notice.'),
            ("Angle and power", 'A low camera angle can make a subject appear powerful, while a high angle may make the same subject appear vulnerable.'),
            ("Salience and composition", 'Size, placement, contrast and empty space guide attention. Identify the most salient element and explain how it shapes representation.'),
            ("Modes work together", 'In a video, image, spoken words, music and captions can reinforce or complicate one another. Analyse the combined effect rather than treating each mode separately.'),
        ]
    if "vocabulary" in text or "word" in text or "morpheme" in text:
        return [
            ("Precision", 'Replace a broad word such as “thing” with a precise noun that identifies the concept, object or process the reader needs.'),
            ("Meaning from parts", 'Use roots, prefixes and suffixes to test an unfamiliar word, then confirm the meaning from the sentence and wider text.'),
            ("Register", '“Kids got heaps of problems” may suit informal speech; an academic response might use “adolescents experienced multiple challenges”.'),
            ("Vocabulary in context", 'Knowing a definition is not enough. Choose the word whose meaning, connotation and level of formality fit the sentence.'),
        ]
    if year <= 2:
        return [
            ("Hear or notice the feature", 'Teacher models one short example aloud and students identify the sound, word, sentence feature or text clue named in the outcome.'),
            ("Compare two examples", 'Students decide which of two short examples matches the target and explain the clue they noticed.'),
            ("Make one together", 'Teacher and students jointly create a new sentence, oral response or text example using the target feature.'),
            ("Try a new example", 'Students independently recognise or use the same feature in a fresh, familiar context.'),
        ]
    return [
        ("Identify precisely", f'Locate the language or text choice that demonstrates {focus_terms(description, elaborations)[0]} rather than describing the whole text vaguely.'),
        ("Use evidence", 'Point to a specific word, sentence, structural choice, visual feature or moment in the text as evidence.'),
        ("Explain effect", 'Connect the evidence to meaning, audience, purpose, representation or reader/viewer response.'),
        ("Transfer", 'Apply the same reasoning to a new text or deliberately use the feature in your own writing, speaking or multimodal composition.'),
    ]


def misconceptions(description: str, elaborations: list[str], year: int) -> list[tuple[str, str]]:
    text = " ".join([description, *elaborations]).lower()
    if year <= 2:
        return [
            ("Naming without showing", "Students may repeat the teacher’s word but not identify it in an example. Ask them to point to, say or demonstrate the exact feature."),
            ("Using one memorised example", "A student may recognise only the classroom example. Change the word, picture or sentence and check the same skill again."),
            ("Guessing from position", "Students may choose the first/last option rather than use a sound or text clue. Ask: What did you hear or see that proves it?"),
        ]
    if "image" in text or "visual" in text or "multimodal" in text:
        return [
            ("Feature spotting", "Naming a camera angle, colour or sound is not analysis. Explain how the choice shapes attention, representation or response."),
            ("Assuming one fixed effect", "A low angle does not always mean power. Interpret the feature in its specific context and alongside other modes."),
            ("Ignoring interaction between modes", "Do not analyse image, words and sound as unrelated lists. Explain how they reinforce, contradict or qualify one another."),
            ("Describing content instead of construction", "Retelling what appears in the image is not enough; analyse how the image has been constructed."),
        ]
    if "sentence" in text or "syntax" in text or "punctuation" in text:
        return [
            ("Treating grammar as only right/wrong", "This outcome asks how choices craft meaning and style. A grammatically possible sentence can still be ineffective for the purpose."),
            ("Naming a structure without effect", "After identifying passive voice, fragments, clause patterns or punctuation, explain why the author chose it here."),
            ("Assuming short is always stronger", "Sentence length works through contrast, rhythm and context. Judge the choice in the passage, not by a fixed rule."),
            ("Rewriting without preserving meaning", "When experimenting with syntax, check whether emphasis, agency, logic or tone changed unintentionally."),
        ]
    if "inclusive" in text or "exclusive" in text or "empower" in text:
        return [
            ("Calling any positive word inclusive", "Inclusion concerns how language positions people and groups, not simply whether a word sounds pleasant."),
            ("Ignoring who has power", "Ask who is allowed to speak, belong, decide or be represented, and who is labelled or excluded."),
            ("Treating pronouns as neutral", "Pronouns such as we, us, you and they can create solidarity or distance depending on context."),
            ("Making claims without evidence", "Identify the exact wording and explain its social effect rather than asserting that a text is empowering or offensive."),
        ]
    return [
        ("Feature spotting without analysis", "Naming a device or structure earns little unless the student explains how it shapes meaning or response."),
        ("Retelling instead of using evidence", "Summarising what happens is not the same as selecting a precise textual example and analysing it."),
        ("Assuming an effect is automatic", "Language choices do not have one universal effect; interpret them in relation to audience, purpose, context and surrounding text."),
        ("Using vague metalanguage", "Replace comments such as “this makes it better” with the exact feature, evidence and intended/likely effect."),
    ]


def instructional_steps(description: str, elaborations: list[str], year: int) -> list[tuple[str, str]]:
    terms = focus_terms(description, elaborations)
    focus = ", ".join(terms[:3])
    if year <= 2:
        return [
            ("Step 1: Explicit Teaching & Modelling", f"Name the target in child-friendly language and model one short example. Think aloud about the clue connected to {focus}."),
            ("Step 2: Guided Analysis", "Compare two short oral, visual or written examples. Students point to or say the clue that matches the target."),
            ("Step 3: Collaborative / Independent Practice", "Create one example together, then give students a fresh familiar example to identify, say, read or make independently."),
            ("Step 4: Formative Assessment", "Use a one-minute check with a new example. A student passes when they demonstrate the feature and give an observable clue rather than guess."),
        ]
    return [
        ("Step 1: Explicit Teaching & Modelling", f"Define the outcome-specific metalanguage ({focus}) and model a short think-aloud: identify the feature, select evidence and explain its effect or purpose."),
        ("Step 2: Guided Analysis", "Analyse a second example together. Prompt students to move from What is the choice? to Where is the evidence? to What does it do here?"),
        ("Step 3: Collaborative / Independent Practice", "Students annotate or compare a new example, then apply the same concept independently in analysis, editing, speaking or composition as appropriate to the outcome."),
        ("Step 4: Formative Assessment", "Give an unseen micro-text or creation task. Require a precise feature/evidence plus a justified explanation or deliberate crafting choice. Reteach if students can name features but cannot explain or transfer them."),
    ]


def mapping_rows(year: int, description: str) -> list[tuple[str, str, str]]:
    if year == 0:
        grade_band = "Kindergarten"
        us = "CCSS ELA Kindergarten — closest alignment across Reading Foundational Skills, Reading, Writing, Speaking & Listening or Language according to the outcome focus."
        uk = "Early Years / Key Stage 1 English — closest early-language, reading or writing alignment."
        ca = "Kindergarten English Language Arts — broad Ontario/BC-style closest alignment; provincial curricula vary."
        nz = "NZC English Level 1 — closest oral, written and visual language alignment."
        india = "Foundational / early primary English — closest NCERT/CBSE language and literacy alignment."
    else:
        grade_band = f"Grade {year}"
        if year <= 2:
            us_band = str(year)
        elif year <= 5:
            us_band = str(year)
        elif year <= 8:
            us_band = f"{max(6, year)}"
        else:
            us_band = "9-10"
        us = f"Common Core ELA/Literacy Grade {us_band} — closest alignment selected from Reading Literature/Informational Text, Writing, Speaking & Listening or Language according to the outcome focus."
        if year <= 2:
            uk = "Key Stage 1 English — closest reading, writing, spoken language or vocabulary/grammar alignment."
        elif year <= 6:
            uk = "Key Stage 2 English — closest reading, writing, spoken language or vocabulary/grammar alignment."
        elif year <= 9:
            uk = "Key Stage 3 English — closest reading, writing, spoken English, grammar or literary analysis alignment."
        else:
            uk = "Key Stage 4 / GCSE English Language & Literature — closest analysis, comparison, writing or spoken-language alignment."
        ca = f"{grade_band} English Language Arts — broad Ontario/BC-style closest alignment; Canada has provincial rather