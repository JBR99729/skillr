#!/usr/bin/env python3
"""Upgrade canonical English F–10 topic pages without changing URLs/resources.

Preserves each page head, hero, analytics, canonical URL, resource links, sidebar
and related-topic navigation. Replaces only the generic instructional body with
static English-specific teaching derived from the exact content description and
official elaborations already embedded in each page.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR_ROOTS = [ROOT / "foundation", *[ROOT / f"year{year}" for year in range(1, 11)]]


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", value))).strip()


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def page_year(path: Path) -> int:
    folder = next(part for part in path.parts if part == "foundation" or re.fullmatch(r"year\d+", part))
    return 0 if folder == "foundation" else int(folder[4:])


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
    return [clean(x) for x in re.findall(r"<strong>E\d+:</strong>\s*(.*?)</li>", block.group(1), re.I | re.S)]


def focus_terms(description: str, elaborations: list[str]) -> list[str]:
    text = " ".join([description, *elaborations]).lower()
    candidates = ["audience", "purpose", "context", "language", "vocabulary", "pronouns", "values", "beliefs",
                  "text structure", "paragraph", "sentence", "syntax", "punctuation", "image", "visual", "multimodal",
                  "representation", "voice", "character", "theme", "literary", "rhetorical", "evidence", "argument",
                  "perspective", "point of view", "cohesion", "modality", "metaphor", "imagery", "tone", "spelling",
                  "phoneme", "grapheme", "morpheme", "reading", "writing", "speaking", "listening"]
    found = [term for term in candidates if term in text]
    return list(dict.fromkeys(found))[:6] or ["meaning", "language choices", "audience"]


def overview(description: str, elaborations: list[str], year: int) -> str:
    terms = focus_terms(description, elaborations)
    if year <= 2:
        return (f"In this outcome, students learn to {description.rstrip('.')}. Teaching should make the target visible and audible through short, familiar examples. "
                f"Useful language for the lesson includes {', '.join(terms[:4])}. Students should show the skill in a fresh example, not only repeat a modelled answer.")
    if year <= 5:
        return (f"This outcome develops students’ ability to {description.rstrip('.')}. Students connect the feature they notice to meaning and begin explaining why a writer, speaker or text uses it. "
                f"Key concepts include {', '.join(terms[:5])}. Success means identifying or using the feature accurately and supporting an explanation with a specific example.")
    return (f"This outcome requires students to {description.rstrip('.')}. Students move beyond feature spotting: they identify a precise language, structural, literary or multimodal choice, use evidence, and explain or evaluate how the choice shapes meaning, representation, audience response or purpose. "
            f"Key analytical concepts include {', '.join(terms[:6])}.")


def micro_examples(description: str, elaborations: list[str], year: int) -> list[tuple[str, str]]:
    text = " ".join([description, *elaborations]).lower()
    if "inclusive" in text or "exclusive" in text or "empower" in text or "disempower" in text:
        return [("Audience alignment", 'Compare “Obviously, we all want a safer school” with “One proposal is to improve school safety.” The first assumes agreement and pressures the reader to join the speaker’s position.'),
                ("Pronoun choice", '“We can solve this together” creates shared identity; “you people never listen” distances and labels a group.'),
                ("Shared values", '“As responsible members of our community” appeals to a value the writer expects the audience to share.'),
                ("Inclusive vs marginalising labels", 'Compare “students who need language support” with a dismissive label. Word choice can grant dignity and agency or reduce people to a stereotype.')]
    if "evaluate" in text and ("value" in text or "attitude" in text):
        return [("Explicit evaluation", '“The decision was reckless” directly states a judgement. Identify the evaluative word and the value behind it.'),
                ("Implicit evaluation", '“The council finally admitted the mistake” evaluates indirectly through “finally” and “admitted”.'),
                ("Compare wording", '“Protesters gathered” and “a mob descended” position the audience differently even when referring to a similar event.'),
                ("Evidence-based explanation", 'Strong analysis identifies the exact wording and explains the attitude, value or positioning it creates.')]
    if "text structure" in text or "structures" in text or "paragraph" in text:
        return [("Structure follows purpose", "A review may open with an overall judgement then group evidence by acting, plot and design; a news report often foregrounds the most important information first."),
                ("Paragraph focus", "A paragraph that develops one claim with evidence is more cohesive than one that jumps between unrelated ideas."),
                ("Mode changes structure", "A print article may use paragraphs and subheadings; an online version may add navigation, video and hyperlinks. Evaluate how those choices help or distract the reader."),
                ("Effect, not feature spotting", 'Do not stop at “there is a heading”. Explain how the heading predicts content, guides navigation or frames interpretation.')]
    if "sentence" in text or "syntax" in text or "punctuation" in text:
        return [("Change the syntax, change the effect", '“The storm destroyed the pier” foregrounds the storm; “The pier was destroyed” foregrounds the damage and can omit the agent.'),
                ("Sentence length", 'A long cumulative sentence can build detail; a short sentence after it can create emphasis: “The warnings continued for hours. Nobody moved.”'),
                ("Punctuation as meaning", 'Compare “Wait, Sam.” with “Wait Sam!” Punctuation helps shape rhythm, emphasis and relationships.'),
                ("Evaluate effectiveness", "A sentence choice is effective only in relation to purpose, audience and surrounding context; there is no universally best sentence form.")]
    if "image" in text or "visual" in text or "multimodal" in text:
        return [("Framing", "A close-up can make an expression dominant; a wide shot can emphasise setting or isolation. Explain what the viewer is directed to notice."),
                ("Angle and power", "A low camera angle can make a subject appear powerful, while a high angle may make the same subject appear vulnerable."),
                ("Salience and composition", "Size, placement, contrast and empty space guide attention. Identify the most salient element and explain how it shapes representation."),
                ("Modes work together", "In video, image, spoken words, music and captions can reinforce or complicate one another. Analyse the combined effect.")]
    if "vocabulary" in text or "morpheme" in text or "word" in text:
        return [("Precision", 'Replace a broad word such as “thing” with a precise noun that identifies the concept, object or process.'),
                ("Meaning from parts", "Use roots, prefixes and suffixes to test an unfamiliar word, then confirm the meaning from the sentence and wider text."),
                ("Register", '“Kids got heaps of problems” may suit informal speech; an academic response might use “adolescents experienced multiple challenges”.'),
                ("Vocabulary in context", "Choose the word whose meaning, connotation and level of formality fit the sentence, not merely a dictionary synonym.")]
    if year <= 2:
        return [("Hear or notice the feature", "Teacher models one short example and students identify the sound, word, sentence feature or text clue named in the outcome."),
                ("Compare two examples", "Students decide which of two short examples matches the target and explain the clue they noticed."),
                ("Make one together", "Teacher and students jointly create a new sentence, oral response or text example using the target feature."),
                ("Try a new example", "Students independently recognise or use the same feature in a fresh, familiar context.")]
    focus = focus_terms(description, elaborations)[0]
    return [("Identify precisely", f"Locate the language or text choice that demonstrates {focus} rather than describing the whole text vaguely."),
            ("Use evidence", "Point to a specific word, sentence, structural choice, visual feature or moment in the text."),
            ("Explain effect", "Connect the evidence to meaning, audience, purpose, representation or reader/viewer response."),
            ("Transfer", "Apply the same reasoning to a new text or deliberately use the feature in your own writing, speaking or multimodal composition.")]


def misconceptions(description: str, elaborations: list[str], year: int) -> list[tuple[str, str]]:
    text = " ".join([description, *elaborations]).lower()
    if year <= 2:
        return [("Naming without showing", "Students may repeat the teacher’s word but not identify it in an example. Ask them to point to, say or demonstrate the exact feature."),
                ("Using one memorised example", "Change the word, picture or sentence and check the same skill again."),
                ("Guessing from position", "Ask: What did you hear or see that proves it?")]
    if "image" in text or "visual" in text or "multimodal" in text:
        return [("Feature spotting", "Naming a camera angle, colour or sound is not analysis. Explain how the choice shapes attention, representation or response."),
                ("Assuming one fixed effect", "Interpret the feature in its specific context and alongside other modes."),
                ("Ignoring interaction between modes", "Explain how image, words and sound reinforce, contradict or qualify one another."),
                ("Describing content instead of construction", "Retelling what appears is not enough; analyse how the representation has been constructed.")]
    if "sentence" in text or "syntax" in text or "punctuation" in text:
        return [("Treating grammar as only right/wrong", "Analyse how choices craft meaning and style, not only whether a sentence is grammatical."),
                ("Naming a structure without effect", "Explain why the author chose the structure here."),
                ("Assuming short is always stronger", "Judge sentence length through contrast, rhythm and context."),
                ("Rewriting without preserving meaning", "Check whether emphasis, agency, logic or tone changed unintentionally.")]
    if "inclusive" in text or "exclusive" in text or "empower" in text:
        return [("Calling any positive word inclusive", "Inclusion concerns how language positions people and groups, not simply whether a word sounds pleasant."),
                ("Ignoring who has power", "Ask who is allowed to speak, belong, decide or be represented, and who is labelled or excluded."),
                ("Treating pronouns as neutral", "We, us, you and they can create solidarity or distance depending on context."),
                ("Making claims without evidence", "Identify the exact wording and explain its social effect.")]
    return [("Feature spotting without analysis", "Naming a device or structure earns little unless the student explains how it shapes meaning or response."),
            ("Retelling instead of using evidence", "Select a precise textual example and analyse it."),
            ("Assuming an effect is automatic", "Interpret choices in relation to audience, purpose, context and surrounding text."),
            ("Using vague metalanguage", 'Replace “this makes it better” with the exact feature, evidence and intended or likely effect.')]


def instructional_steps(description: str, elaborations: list[str], year: int) -> list[tuple[str, str]]:
    focus = ", ".join(focus_terms(description, elaborations)[:3])
    if year <= 2:
        return [("Step 1: Explicit Teaching & Modelling", f"Name the target in child-friendly language and model one short example. Think aloud about the clue connected to {focus}."),
                ("Step 2: Guided Analysis", "Compare two short oral, visual or written examples. Students point to or say the clue that matches the target."),
                ("Step 3: Collaborative / Independent Practice", "Create one example together, then give students a fresh familiar example to identify, say, read or make independently."),
                ("Step 4: Formative Assessment", "Use a one-minute check with a new example. A student passes when they demonstrate the feature and give an observable clue rather than guess.")]
    return [("Step 1: Explicit Teaching & Modelling", f"Define the outcome-specific metalanguage ({focus}) and model a think-aloud: identify the feature, select evidence and explain its effect or purpose."),
            ("Step 2: Guided Analysis", "Analyse a second example together: What is the choice? Where is the evidence? What does it do here?"),
            ("Step 3: Collaborative / Independent Practice", "Students annotate or compare a new example, then apply the concept independently in analysis, editing, speaking or composition as appropriate."),
            ("Step 4: Formative Assessment", "Use an unseen micro-text or creation task. Require precise evidence plus a justified explanation or deliberate crafting choice. Reteach if students can name features but cannot explain or transfer them.")]


def mapping_rows(year: int, code: str, description: str) -> list[tuple[str, str, str]]:
    if year == 0:
        us = "CCSS ELA Kindergarten — closest alignment across Reading Foundational Skills, Reading, Writing, Speaking & Listening or Language according to the outcome focus."
        uk = "Early Years / Key Stage 1 English — closest early-language, reading or writing alignment."
        ca = "Kindergarten English Language Arts — broad Ontario/BC-style closest alignment; provincial curricula vary."
        nz = "NZC English Level 1 — closest oral, written and visual language alignment."
        india = "Foundational / early primary English — closest NCERT/CBSE language and literacy alignment."
        nsw = "Early Stage 1 English — closest outcome alignment."
        vic = "Foundation English — closest Language, Literature or Literacy alignment."
    else:
        grade = f"Grade {year}"
        us_band = str(year) if year <= 8 else "9-10"
        us = f"Common Core ELA/Literacy Grade {us_band} — closest alignment selected from RL/RI, W, SL or L standards according to the outcome focus."
        uk = ("Key Stage 1 English" if year <= 2 else "Key Stage 2 English" if year <= 6 else "Key Stage 3 English" if year <= 9 else "Key Stage 4 / GCSE English Language & Literature") + " — closest reading, writing, spoken-language, grammar or literary-analysis alignment."
        ca = f"{grade} English Language Arts — broad Ontario/BC-style closest alignment; Canada has provincial rather than one national ELA standard."
        nz_level = 1 if year <= 2 else 2 if year <= 4 else 3 if year <= 6 else 4 if year <= 8 else 5
        nz = f"NZC English Level {nz_level} — closest oral, written and visual language achievement-objective alignment."
        india = f"Class {year} NCERT/CBSE English Language and Literature — closest language, reading, writing or