"""Build canonical v1.1 Maths lesson specifications from authored headings."""
from __future__ import annotations

import re


ACTION_WORDS = {
    "investigating": "Explore", "using": "Use", "applying": "Apply",
    "recognising": "Recognise", "identifying": "Identify", "comparing": "Compare",
    "constructing": "Construct", "analysing": "Analyse", "calculating": "Calculate",
    "solving": "Solve", "representing": "Represent", "conducting": "Conduct",
    "describing": "Describe", "experimenting": "Experiment with", "considering": "Consider",
    "planning": "Plan", "choosing": "Choose", "interpreting": "Interpret",
    "examining": "Examine", "discussing": "Discuss", "testing": "Test",
    "creating": "Create", "connecting": "Connect", "determining": "Determine",
    "developing": "Develop", "exploring": "Explore", "relating": "Connect",
    "understanding": "Understand", "establishing": "Establish", "finding": "Find",
    "modelling": "Model", "designing": "Design", "assigning": "Assign",
    "recording": "Record", "distinguishing": "Distinguish", "estimating": "Estimate",
}

MODEL_OVERRIDES = {
    "Write recurring decimals clearly": "1/3 = 0.3̅; the bar shows that the digit 3 repeats without end.",
    "Explain why two expressions are equivalent": "2(x + 3) = 2x + 6: an area model shows the same total area in grouped and expanded form.",
    "Connect cubic units and capacity": "1 L = 1000 cm³; volume and capacity describe the same space using different units.",
    "Design a similarity decision tree": "Equal corresponding angles and one common side scale factor establish similarity; equal lengths establish congruence.",
    "Read orders of magnitude": "Moving one step on a base-10 logarithmic scale multiplies the value by 10; two steps multiply it by 100.",
    "Model elevation and depression": "A horizontal sight line creates equal alternate angles, so an angle of depression can label the matching angle of elevation.",
    "Read an equation from a graph": "Graph y = ax + b and y = c; the x-coordinate of their intersection solves ax + b = c.",
    "Solve and check an inequality": "Solve ax + b < c using inverse operations when a > 0, then test a value from the solution interval.",
    "Test parallel-line conjectures": "y = 2x is a boundary line; y > 2x and y < 2x shade opposite half-planes.",
    "Recognise practical data limits": "A convenience survey at one location over-represents people who were available there and then.",
    "Build a two-way table": "The four disjoint cells—A and B, A and not B, not A and B, neither—must total the whole sample space.",
    "Represent changing motion or temperature": "Plot time against speed or temperature; label intervals of increase, decrease and no change before choosing a model.",
    "Interpret real logarithmic scales": "On a base-10 logarithmic scale, equal axis gaps can represent 1, 10, 100 and 1000—not equal additive changes.",
    "Model competing animal populations": "Compare two population rules over equal time steps; identify whether each changes by a constant amount or constant ratio.",
    "Separate association from causation": "A scatterplot can show association between two variables, but it cannot by itself rule out confounding variables or prove causation.",
    "Use a line of good fit cautiously": "A line of good fit summarises a trend inside the observed data range; extrapolation beyond that range needs new justification.",
    "Track signs through powers": "(−1)⁴ = 1 but (−1)⁵ = −1: an even number of negative factors pairs off; one remains for an odd power.",
    "Graph an inequality interval": "1.2x − 5.4 > 10.8 gives x > 13.5, shown with an open point at 13.5 and an arrow to the right.",
    "Model rectangle dimensions": "If the width is w and the length is w + 5, then the area is A = w(w + 5).",
    "Bisect to locate a quadratic root": "For f(x) = 2x² − 3x − 7, opposite signs at two endpoints trap a root; repeatedly halve that interval.",
    "See why a²+b²=c²": "In a right triangle, the areas of the two smaller side-squares combine exactly to equal the hypotenuse square: a² + b² = c².",
    "Use parameter variation in predictive models": "Hold the input data fixed, vary one parameter at a time, and compare how the model's graph and prediction change.",
    "Critique a population-growth model": "P(t) = P₀(1 + r)ᵗ assumes a constant growth rate; habitat, food and changing reproduction can limit that assumption.",
    "Zoom in on function intersections": "Find an interval where two graphs swap vertical order, zoom in, then refine the interval around their intersection.",
    "Graph horizontal and vertical boundaries": "x = a is a vertical boundary and y = a is horizontal; use a solid line for ≤ or ≥ and shade the solution side.",
    "Transform y=x²": "Start with y = x²; a multiplier changes vertical scale or reflection, while y = a(x − h)² + k translates the parabola by (h, k).",
}


def math_text(value: str) -> str:
    text = str(value or "")
    for _ in range(3):
        text = re.sub(r"\\frac\s*([^\s{}])\s*\{([^{}]+)\}", r"(\1)/(\2)", text)
        text = re.sub(r"\\frac\s*\{([^{}]+)\}\s*([^\s{}])", r"(\1)/(\2)", text)
        text = re.sub(r"\\frac\s*([^\s{}])\s*([^\s{}])", r"(\1)/(\2)", text)
        text = re.sub(r"\\frac\{([^{}]+)\}\{([^{}]+)\}", r"(\1)/(\2)", text)
        text = re.sub(r"\\sqrt\{([^{}]+)\}", r"√(\1)", text)
    text = re.sub(r"\\sqrt\s*([0-9A-Za-z])", r"√\1", text)
    text = re.sub(r"\\overset\\?_\s*([0-9])", lambda m: m.group(1) + "̅", text)
    text = re.sub(r"\\overset\{?[^}]*\}?\s*\{?([^{}]+)\}?", lambda m: m.group(1) + "̅", text)
    text = re.sub(r"\\mathrm\{([^{}]+)\}", r"\1", text)
    text = text.replace(r"\mathrm", "")
    text = re.sub(r"\^\{([^{}]+)\}", r"^(\1)", text)
    text = re.sub(r"_\{([^{}]+)\}", r"_(\1)", text)
    replacements = {
        r"\times": "×", r"\div": "÷", r"\leq": "≤", r"\geq": "≥",
        r"\neq": "≠", r"\pi": "π", r"\rightarrow": " → ", r"\Rightarrow": " ⇒ ",
        r"\lt": "<", r"\gt": ">", r"\;": " ", r"\,": " ",
        "…": " and so on", "\\": "", "  ": " ",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r"\(([0-9A-Za-z]+)\)/\(([0-9A-Za-z]+)\)", r"\1/\2", text)
    text = text.replace("^2", "²").replace("^3", "³")
    text = re.sub(r"\s+", " ", text).strip(" ,;.")
    return text


def concise_focus(text: str, heading: str) -> str:
    value = math_text(text)
    value = re.split(r";\s*for example|\bfor example\b", value, maxsplit=1, flags=re.I)[0]
    first = value.split()[0].lower() if value.split() else ""
    if first in ACTION_WORDS:
        value = ACTION_WORDS[first] + value[len(value.split()[0]):]
    value = value.replace("recognise that ", "Recognise ").replace("understand that ", "Understand ")
    words = value.split()
    if len(words) > 28:
        candidates = [m.start() for m in re.finditer(r", | and | by | including ", value)]
        cut = max((p for p in candidates if 60 <= p <= 185), default=0)
        value = value[:cut] if cut else "Use the labelled model to investigate " + heading.lower()
    return value.strip(" ,;.") + "."


def example_model(text: str, heading: str, focus: str) -> str:
    if heading in MODEL_OVERRIDES:
        return MODEL_OVERRIDES[heading]
    value = math_text(text)
    match = re.search(r"\bfor example\b[:,]?\s*(.+)", value, re.I)
    if not match:
        match = re.search(r"\bsuch as\b\s+(.+)", value, re.I)
    model = match.group(1) if match else focus.rstrip(".")
    model = re.split(r";|\. ", model, maxsplit=1)[0]
    words = model.split()
    if len(words) > 32 or len(model) > 200:
        model = focus.rstrip(".")
    if len(model) < 12:
        model = f"{heading}: {focus.rstrip('.')}"
    if model[:1].islower():
        model = model[:1].upper() + model[1:]
    return model.strip(" ,;.") + "."


def component_type(text: str) -> str:
    t = text.lower()
    if "number line" in t or "interval" in t or "inequalit" in t:
        return "numberline"
    if any(k in t for k in ("algorithm", "pseudocode", "flow chart", "test cases", "bisection")):
        return "algorithm"
    if any(k in t for k in ("network", "node", "vertex", "vertices", "connectedness")):
        return "network"
    if any(k in t for k in ("probability", "chance", "replacement", "sample space", "venn", "tree diagram", "outcomes")):
        return "probability"
    if any(k in t for k in ("scatter", "boxplot", "box plot", "histogram", "dot plot", "stem-and-leaf", "distribution", "survey", "sample", "statistical", "data", "infographic")):
        return "data"
    if any(k in t for k in ("time zone", "duration", "12-hour", "24-hour", "timeline")):
        return "timeline"
    if any(k in t for k in ("surface area", "volume", "capacity", "measurement", "error", "accuracy", "instrument", "scientific notation", "logarithmic")):
        return "measurement"
    if any(k in t for k in ("triangle", "circle", "quadrilateral", "shape", "angle", "pythagoras", "trigon", "coordinate", "spatial", "enlargement", "congruen", "similar")):
        return "geometry"
    if re.search(r"\b(ratio|ratios|rate|rates|proportion|proportional|percentage|percentages|gradient|scale factor)\b", t):
        return "ratio"
    if any(k in t for k in ("graph", "function", "parabola", "linear", "quadratic", "exponential", "intercept", "turning point", "intersection")):
        return "graph"
    if any(k in t for k in ("table", "array", "values")):
        return "table"
    if any(k in t for k in ("equation", "expression", "factor", "expand", "exponent", "formula", "algebra", "decimal", "power of ten")):
        return "equation"
    return "relationship"


def checkpoint_question(kind: str, heading: str) -> str:
    prompts = {
        "numberline": "Which bound or interval is justified by the model?",
        "algorithm": "Which test case could expose an error in the steps?",
        "network": "What do the vertices and edges represent, and is the network connected?",
        "probability": "Which outcomes belong in the denominator, and why?",
        "data": "What claim is supported, and what limitation remains?",
        "timeline": "Which time reference must be made common before calculating?",
        "measurement": "Which units, bounds or accuracy statement belong in the result?",
        "geometry": "Which labelled relationship justifies the conclusion?",
        "ratio": "Which quantities must scale or compare by the same factor?",
        "graph": "Which graph feature is direct evidence for the conclusion?",
        "table": "Which pattern in the table supports the conclusion?",
        "equation": "Which algebraic step preserves equivalence, and why?",
        "relationship": "What changes, what stays invariant, and why?",
    }
    return f"For {heading.lower()}, {prompts[kind][0].lower() + prompts[kind][1:]}"


def build_teaching_slides(unit: dict, headings: list[str], authored: list[dict] | None = None) -> list[dict]:
    if authored:
        normalised = []
        for index, slide in enumerate(authored, 1):
            item = dict(slide)
            item["id"] = item.get("id", f"elaboration-{index}")
            item["elaborationId"] = unit["elaborations"][index - 1]["number"]
            item["visual"] = dict(item["visual"])
            item["visual"].setdefault("label", item["highlight"])
            item["visual"].setdefault("index", index)
            normalised.append(item)
        return normalised
    elaborations = unit.get("elaborations", [])
    if len(headings) != len(elaborations):
        raise ValueError(f"{unit['code']}: {len(headings)} headings for {len(elaborations)} elaborations")
    slides = []
    for index, (elab, heading) in enumerate(zip(elaborations, headings), 1):
        focus = concise_focus(elab["text"], heading)
        model = example_model(elab["text"], heading, focus)
        kind = component_type(heading)
        if kind == "relationship":
            kind = component_type(f"{heading} {focus} {model}")
        ask = checkpoint_question(kind, heading)
        answer = f"Use the model evidence: {model} Then name the deciding relationship or limitation in a complete mathematical sentence."
        slide_id = f"elaboration-{index}"
        slides.append({
            "id": slide_id,
            "heading": heading,
            "lead": focus,
            "visual": {"type": kind, "label": model, "index": index},
            "highlight": model,
            "ask": ask,
            "answer": answer,
            "notes": {
                "teacherDoes": f"Build the {kind} model for ‘{heading}’ one labelled step at a time.",
                "teacherAsks": ask,
                "studentDoes": "Annotates the model, names the deciding relationship and gives a complete mathematical explanation.",
                "expectedEvidence": answer,
                "ifIncorrect": f"Return to the labelled model ‘{model}’ and identify the quantity, condition or comparison that decides the result.",
                "shortCheck": ask,
            },
            "elaborationId": elab["number"],
        })
    return slides


def build_spec(unit: dict, title: str, anchor: str, headings: list[str], authored: list[dict] | None = None) -> dict:
    year = unit["yearNumber"]
    code = unit["code"]
    slides = build_teaching_slides(unit, headings, authored)
    strand = unit["strand"]
    material_by_strand = {
        "Number": ["calculator or spreadsheet", "number-line strip", "mini-whiteboard"],
        "Algebra": ["graphing tool", "mini-whiteboard", "coordinate grid"],
        "Measurement": ["calculator", "metric measuring tools", "diagram paper"],
        "Space": ["dynamic geometry tool", "ruler", "diagram paper"],
        "Statistics": ["spreadsheet or graphing tool", "sample data", "mini-whiteboard"],
        "Probability": ["random-number tool", "outcome cards", "mini-whiteboard"],
    }
    routine_by_strand = {
        "Number": "Represent → Calculate → Interpret → Verify",
        "Algebra": "Notice → Represent → Solve → Connect → Verify",
        "Measurement": "Model → Label → Calculate → Interpret → Check",
        "Space": "Draw → Identify conditions → Reason → Justify",
        "Statistics": "Question → Collect → Display → Compare → Infer",
        "Probability": "Define outcomes → Represent → Calculate → Simulate → Interpret",
    }
    misconception = {
        "Number": ["Exact and approximate values are treated as interchangeable", "Keep exact notation until the requested approximation step."],
        "Algebra": ["A rule is applied without preserving equivalence or its conditions", "Return to the linked table, graph or expanded form and verify by substitution."],
        "Measurement": ["Dimensions, units or accuracy are mixed", "Label every measure and convert before calculating."],
        "Space": ["A diagram is trusted by appearance instead of stated conditions", "Mark givens and name the theorem or transformation used."],
        "Statistics": ["A display or sample is treated as proof of a stronger claim", "Link the inference to sampling, variation, context and uncertainty."],
        "Probability": ["The sample space or dependency changes without being noticed", "Rebuild the outcomes and label replacement or conditioning explicitly."],
    }[strand]
    model_records = []
    mastery_items = []
    elaboration_records = []
    slide_records = []
    for index, (elab, slide) in enumerate(zip(unit["elaborations"], slides), 1):
        model_id = f"model-{index}"
        checkpoint_id = f"checkpoint-{index}"
        model_records.append({
            "id": model_id, "component": slide["visual"]["type"],
            "purpose": slide["heading"], "parameters": slide["visual"],
            "validRanges": {"labelLength": [1, 220]},
            "colourSemantics": {"navy": "structure or reference", "amber": "relationship currently examined", "red": "boundary, error or comparison point"},
            "accessibleDescription": slide["visual"].get("label", slide["lead"]),
            "usedBy": ["topic", slide["id"], checkpoint_id],
            "reviewed": {"conceptAccurate": True, "labelsClear": True, "noOverlap": True},
        })
        elaboration_records.append({
            "id": elab["number"], "curriculumWording": elab["text"],
            "plainLanguageConcept": slide["lead"], "teachingPurpose": slide["heading"],
            "modelIds": [model_id], "teacherDoes": slide["notes"]["teacherDoes"],
            "teacherSaysOrAsks": slide["notes"]["teacherAsks"], "studentDoes": slide["notes"]["studentDoes"],
            "whatToLookFor": slide["notes"]["expectedEvidence"], "ifIncorrect": slide["notes"]["ifIncorrect"],
            "checkpointIds": [checkpoint_id], "masteryEvidence": slide["answer"],
        })
        slide_records.append({
            "id": slide["id"], "title": slide["heading"], "purpose": slide["lead"],
            "display": {"modelIds": [model_id], "studentPrompt": slide["ask"], "keyText": [slide["highlight"]]},
            "teacherLayer": {
                "teacherDoes": slide["notes"]["teacherDoes"], "teacherSaysOrAsks": slide["notes"]["teacherAsks"],
                "studentDoes": slide["notes"]["studentDoes"], "whatToLookFor": slide["notes"]["expectedEvidence"],
                "ifIncorrect": slide["notes"]["ifIncorrect"],
            },
            "checkpointIds": [checkpoint_id], "differentiationRefs": ["support", "core", "extend"],
            "elaborationIds": [elab["number"]],
        })
        mastery_items.append({
            "id": checkpoint_id, "type": "formative", "after": slide["id"], "prompt": slide["ask"],
            "expectedAnswer": slide["answer"], "acceptableRepresentations": ["labelled model", "equation or calculation", "complete mathematical sentence"],
            "evidenceOfMastery": slide["notes"]["expectedEvidence"], "likelyMisconception": misconception[0],
            "remediation": slide["notes"]["ifIncorrect"],
            "decision": {"continueWhen": "The deciding relationship is named and justified.", "reteachWhen": "The response relies on appearance, an unlabelled procedure or an unsupported claim."},
        })

    first, last = slides[0], slides[-1]
    qp = f"/quiz/year-{year}/math/{code.lower()}"
    return {
        "schemaVersion": "1.1", "code": code, "year": year, "subject": "Mathematics",
        "slug": unit["unitSlug"], "strand": strand, "title": title,
        "subtitle": anchor, "contentDescription": unit["description"], "curriculum": unit["description"],
        "lessonTime": f"{45 + min(20, len(slides) * 3)}–{60 + min(20, len(slides) * 3)} minutes",
        "learningIntention": anchor,
        "successCriteria": [f"Explain {first['heading'].lower()} using the approved model.", f"Apply {last['heading'].lower()} to a new case.", "Verify a conclusion with a second representation, estimate or test case."],
        "materials": material_by_strand[strand],
        "conceptBoundary": {
            "mustTeach": [unit["description"]],
            "prerequisites": [f"Relevant Year {year-1} {strand.lower()} representations and vocabulary."],
            "maySupportInformally": ["Digital tools may test, visualise and verify after the mathematical structure is explicit."],
            "mustNotOverteach": ["Do not introduce later-year formalism that is unnecessary for this content description."],
        },
        "teachingProgression": {
            "name": routine_by_strand[strand], "reason": f"This progression makes the Year {year} {strand.lower()} relationship visible before independent application.",
            "steps": [{"id": s["id"], "purpose": s["heading"], "teacherAction": s["notes"]["teacherDoes"], "studentAction": s["notes"]["studentDoes"], "modelIds": [f"model-{i}"]} for i, s in enumerate(slides, 1)],
        },
        "models": model_records, "elaborations": elaboration_records,
        "workedExamples": [{"title": s["heading"], "modelId": f"model-{i}", "example": s["highlight"], "teacherLanguage": s["notes"]["teacherAsks"]} for i, s in enumerate(slides, 1)],
        "misconceptions": [[misconception[0], misconception[1]], [f"The {title.lower()} model is copied without interpretation", f"Connect every label in ‘{first['highlight']}’ to its mathematical role."], ["The result is not verified", "Use a second representation, boundary case, inverse operation or simulation check."]],
        "warmUp": {"title": first["heading"], "prompt": first["ask"], "expectedAnswer": first["answer"], "time": "3 minutes"},
        "differentiation": {
            "support": {"adaptation": "Reduce numerical or representational load while retaining the same decision and explanation.", "modelIds": ["model-1"], "boundaryCheck": "The target relationship is unchanged."},
            "core": {"adaptation": "Connect at least two representations, justify the method and verify independently.", "modelIds": [m["id"] for m in model_records], "boundaryCheck": "Matches the content description."},
            "extend": {"adaptation": "Test a boundary case, counterexample or model limitation without introducing later-year procedures.", "modelIds": [model_records[-1]["id"]], "boundaryCheck": "Deepens reasoning inside the stated boundary."},
        },
        "slides": slide_records, "masteryItems": mastery_items,
        "references": [{"title": "Australian Curriculum Version 9.0", "url": "https://www.australiancurriculum.edu.au/"}],
        "resourceLinks": {"topic": unit["url"], "slides": f"/worksheets/year{year}/maths/teacher-slides/live.html?code={code}", "worksheet": f"{qp}/worksheet/", "practice": f"{qp}/practice/", "test": f"{qp}/test/"},
        "review": {"automaticValidation": "pending", "conceptReview": "author review required", "visualQA": "browser review required", "parity": "same canonical specification"},
        # Flattened compatibility view for the locked renderers.
        "anchor": anchor, "modelTitle": first["heading"], "model": first["highlight"],
        "applyTitle": last["heading"], "application": last["highlight"], "highlight": first["highlight"],
        "ask": last["ask"], "answer": last["answer"],
        "terms": [strand.lower(), "representation", "verification"],
        "boundary": {"mustTeach": unit["description"], "prerequisites": f"Year {year-1} {strand.lower()} knowledge.", "maySupportInformally": "Use digital tools after the structure is explicit.", "mustNotOverteach": "Keep later-year formality outside the target."},
        "levels": {"support": "Reduce calculation load but preserve the reasoning goal.", "core": "Connect representations, justify and verify.", "extend": "Test a boundary case, counterexample or limitation."},
        "teachingSlides": slides,
    }
