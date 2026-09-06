"""Shared age-progressive authoring profiles for SkillrHub Maths and Science topic pages.

These profiles are deliberately instructional, not page copy. Subject-specific authored
content can use them to decide the expected depth for each year level while preserving
one common rendering/SEO shell.
"""

from __future__ import annotations


def maths_depth(year: int) -> dict[str, object]:
    if year <= 2:
        return {
            "label": "concrete-foundation",
            "worked_examples": 2,
            "priorities": ["concrete materials", "pictures", "familiar contexts", "one-step reasoning", "oral mathematical language"],
            "transfer": "one new familiar-context example",
        }
    if year <= 5:
        return {
            "label": "representation-connection",
            "worked_examples": 3,
            "priorities": ["concrete-pictorial-symbolic links", "strategy explanation", "word problems", "mathematical vocabulary"],
            "transfer": "choose a method in a varied example",
        }
    if year == 6:
        return {
            "label": "formal-reasoning-transition",
            "worked_examples": 3,
            "priorities": ["formal notation", "connected reasoning", "justification", "multi-step examples", "less-familiar contexts"],
            "transfer": "one multi-step or interpretation task",
        }
    if year <= 8:
        return {
            "label": "concept-procedure-transfer",
            "worked_examples": 4,
            "priorities": ["conceptual meaning", "procedural fluency", "connected representations", "method selection", "error analysis", "unfamiliar application"],
            "transfer": "unseen application requiring method choice",
        }
    return {
        "label": "analysis-modelling-justification",
        "worked_examples": 4,
        "priorities": ["multi-step reasoning", "modelling", "interpretation", "justification", "assumptions", "limitations", "equivalent methods"],
        "transfer": "non-routine Year-level application without senior-secondary drift",
    }


def science_depth(year: int) -> dict[str, object]:
    if year <= 2:
        return {
            "label": "observe-describe",
            "worked_examples": 2,
            "priorities": ["direct observation", "sorting/comparing", "simple cause-effect language", "familiar phenomena"],
            "transfer": "new familiar observation",
        }
    if year <= 5:
        return {
            "label": "patterns-and-evidence",
            "worked_examples": 2,
            "priorities": ["patterns", "comparisons", "basic evidence", "simple models", "scientific vocabulary"],
            "transfer": "apply the idea to a new example",
        }
    if year == 6:
        return {
            "label": "connected-scientific-reasoning",
            "worked_examples": 3,
            "priorities": ["cause-effect reasoning", "models", "evidence", "prediction", "explanation"],
            "transfer": "new evidence or model interpretation",
        }
    if year <= 8:
        return {
            "label": "mechanism-evidence-transfer",
            "worked_examples": 3,
            "priorities": ["mechanisms", "models", "evidence interpretation", "misconceptions", "model limitations", "unfamiliar application"],
            "transfer": "unseen scientific context",
        }
    return {
        "label": "analysis-evaluation",
        "worked_examples": 3,
        "priorities": ["connected mechanisms", "evidence quality", "model evaluation", "limitations", "multi-step reasoning", "scientific argument"],
        "transfer": "unfamiliar evidence requiring analysis/evaluation",
    }


def profile(subject: str, year: int) -> dict[str, object]:
    subject_key = subject.lower()
    if subject_key in {"maths", "mathematics", "math"}:
        return maths_depth(year)
    if subject_key == "science":
        return science_depth(year)
    raise ValueError(f"No topic-quality profile for {subject}")
