#!/usr/bin/env python3
"""Generate Year 4 Maths and Science pass-1 question banks."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data" / "curriculum-units.json").read_text())["units"]
BANK_ROOT = ROOT / "curriculum-question-banks" / "banks" / "year-4"


def slug(code: str) -> str:
    return code.lower()


UNITS = {unit["code"]: unit for unit in DATA if unit.get("levelLabel") == "Year 4"}


def topic_from(unit: dict) -> str:
    text = unit["description"].strip()
    text = re.sub(r"\s+", " ", text)
    return text[:90].rstrip(" ,;.")


def ascii_text(value: str) -> str:
    return value.translate(str.maketrans({"\u201c": '"', "\u201d": '"', "\u2019": "'", "\u2013": "-", "\u00d7": "x"}))


MATH_HINTS = {
    "N01": ("decimal place value", "Tenths and hundredths extend place value to the right of the ones place."),
    "N02": ("odd and even numbers", "Even numbers can be split into two equal whole-number groups; odd numbers have one left over."),
    "N03": ("equivalent fractions and decimals", "Equivalent fractions name the same amount, and tenths or hundredths can connect to decimal notation."),
    "N04": ("fractions on number lines", "Fractions and mixed numerals can be counted and placed on number lines between whole numbers."),
    "N05": ("multiplying and dividing by powers of 10", "Multiplying or dividing by 10, 100 or 1000 changes the place value of digits."),
    "N06": ("efficient whole-number operations", "Choose efficient strategies for addition, subtraction, multiplication and division with no remainder."),
    "N07": ("estimation, rounding and financial checks", "Rounding and estimation help check whether calculations and money results are reasonable."),
    "N08": ("mathematical modelling with number and money", "A model turns practical additive and multiplicative situations into number sentences."),
    "N09": ("algorithms and number patterns", "Algorithms use ordered steps and decisions to generate numbers and reveal patterns."),
    "A01": ("unknown values in equations", "Use equality, inverse operations and number properties to find missing values."),
    "A02": ("multiplication and division facts to 10 x 10", "Recall multiplication facts and related division facts, then extend them to larger numbers."),
    "M01": ("scaled measurement instruments", "Read marked, unmarked and partial units on scaled or digital instruments."),
    "M02": ("area and perimeter", "Measure boundaries and surfaces using appropriate units and strategies."),
    "M03": ("time and duration", "Convert between units of time and solve elapsed-time problems."),
    "M04": ("angles and turns", "Compare angles to right angles and describe the amount of turn."),
    "SP01": ("composite shapes and objects", "Composite shapes and objects can be represented by combining familiar shapes."),
    "SP02": ("grid references and directions", "Grid references and directions locate positions and describe pathways."),
    "SP03": ("line and rotational symmetry", "Symmetry can be recognised and created using flips, turns and matching parts."),
    "ST01": ("data collection", "Design questions and collect categorical or numerical data."),
    "ST02": ("data displays", "Read, compare and interpret graphs, tables and displays."),
    "ST03": ("statistical investigations", "Pose questions, collect data, represent it and make supported conclusions."),
    "P01": ("chance events", "Describe possible outcomes and compare likelihood using chance language."),
    "P02": ("chance experiments", "Run repeated trials and compare expected and observed results."),
}


SCIENCE_HINTS = {
    "U01": ("food chains in habitats", "Producers, consumers and decomposers interact in habitats, and food chains show feeding relationships."),
    "U02": ("water cycle processes", "Water moves through sky, land and ocean by processes such as evaporation, condensation and precipitation."),
    "U03": ("contact and non-contact forces", "Objects can affect each other through friction, gravity, magnetism and other forces."),
    "U04": ("properties and uses of materials", "Natural and made materials are chosen because properties such as strength, flexibility and transparency suit a purpose."),
    "H01": ("science as evidence", "Science explanations are built from observations, data and repeated evidence."),
    "H02": ("science solutions", "Science knowledge helps people design solutions and make community decisions."),
    "I01": ("questioning and predicting", "A testable question can be investigated and a prediction should give a reason."),
    "I02": ("planning investigations", "A fair investigation changes one factor and keeps key conditions controlled."),
    "I03": ("conducting investigations", "Procedures must be followed safely and observations recorded accurately."),
    "I04": ("representing data", "Tables, labelled diagrams and graphs organise evidence so patterns are visible."),
    "I05": ("analysing results", "Compare results, look for patterns and decide if the method was fair."),
    "I06": ("communicating findings", "Use evidence, diagrams and clear language to explain science findings."),
}


def hint_for(code: str, subject: str) -> tuple[str, str]:
    suffix = code.replace("AC9M4", "").replace("AC9S4", "")
    hints = MATH_HINTS if subject == "Mathematics" else SCIENCE_HINTS
    return hints.get(suffix, (topic_from(UNITS[code]), f"Apply {topic_from(UNITS[code])} in a Year 4 task."))


def front_matter(code: str, subject: str, description: str) -> str:
    description = ascii_text(description)
    return f"""---
curriculum_code: {code}
subject: {subject}
year_level: Year 4
description: {description}
batch: 1
practice_questions: 8
exam_questions: 8
worksheet_questions: 10
worksheet_practice_selection: 8
worksheet_exam_selection: 2
quick_read_status: authored
review_status: authored
---
"""


def delivery(qtype: str) -> str:
    if qtype in {"Matching", "Sequencing"}:
        return "\n**Delivery:** Online, provide drag, tap-to-place and keyboard controls. On paper, students draw lines, number the items or rewrite the ordered answer.\n"
    if qtype == "Multiple choice":
        return "\n**Delivery:** Online, shuffle options and support keyboard selection. On paper, students circle the best answer.\n"
    if qtype in {"Diagram", "Data display"}:
        return "\n**Delivery:** Include a labelled diagram, table or simple visual model with alt text. On paper, students annotate or write the answer.\n"
    return "\n"


def render_questions(items: list[tuple[str, str, str]], prefix: str, topic: str) -> str:
    out: list[str] = []
    tiers = ["Knowledge and terms", "Core skill practice", "Guided application", "Problem solving and reasoning"]
    for i, (qtype, question, key) in enumerate(items, 1):
        if i in (1, 3, 5, 7):
            out.append(f"## Tier {(i + 1) // 2} - {tiers[(i - 1) // 2]}\n")
        title = re.sub(r"[^A-Za-z0-9 /$.-]", "", question)[:42].rstrip(" ?.")
        out.append(f"### {prefix}{i:02d} - {title}\n")
        out.append(f"**Type:** {qtype}{delivery(qtype)}")
        out.append(f"**Question:** {question}\n")
        out.append(f"**Marking key:** {key}\n")
        out.append(f"**Coverage:** Assesses Year 4 {topic} through application, reasoning or a purposeful visual model.\n")
    return "\n".join(out)


def math_questions(code: str, topic: str) -> tuple[list[tuple[str, str, str]], list[tuple[str, str, str]]]:
    p = [
        ("Short response", f"For {code} {topic}, solve a warm-up example using the key skill: 4,806 + 2,090.", "6,896; align place values and add thousands, hundreds, tens and ones."),
        ("Multiple choice", f"In a {topic} task, which answer is most reasonable for 398 x 6: 2388, 238 or 23,880?", "2,388."),
        ("Matching", f"Match each {topic} representation to its meaning: number sentence, diagram, estimate, exact answer.", "Number sentence -> calculation; diagram -> visual model; estimate -> approximate check; exact answer -> calculated result."),
        ("Short response", f"Use the Year 4 {topic} idea to complete: 7 x ___ = 84.", "12."),
        ("Data display", f"A small table for {topic} shows 4 groups with 125, 150, 175 and 200 items. What is the total?", "650 items."),
        ("Sequencing", f"Order the {topic} solution steps: check reasonableness, read the question, calculate, choose a strategy.", "Read the question; choose a strategy; calculate; check reasonableness."),
        ("Extended response", f"Explain how a diagram or table could help solve a Year 4 {topic} problem without guessing.", "A diagram or table organises values, shows relationships and helps choose the correct operation."),
        ("Extended response", f"A student gets an answer that does not fit the {topic} context. Explain two checks they should make.", "Check operation choice, place value/units, estimate, and whether the answer fits the story."),
    ]
    e = [
        ("Short response", f"Complete this {topic} calculation: 3,750 - 1,485.", "2,265."),
        ("Short response", f"Use a mental strategy for {topic}: 99 + 248.", "347; add 100 then subtract 1."),
        ("Multiple choice", f"Which model best supports {topic}: a labelled number line, a random list, or an unrelated picture?", "A labelled number line."),
        ("Matching", f"Match the {topic} terms: factor, product, difference, sum.", "Factor -> multiplied number; product -> multiplication result; difference -> subtraction result; sum -> addition result."),
        ("Data display", f"In a {topic} chart, four classes collect 86, 94, 77 and 103 cans. Estimate the total to the nearest hundred.", "About 400 cans."),
        ("Short response", f"Find the missing value in a {topic} equation: ___ + 368 = 1,000.", "632."),
        ("Extended response", f"Create a short Year 4 {topic} word problem that needs two steps, then solve it.", "Answers vary; must include a valid two-step problem and correct solution."),
        ("Extended response", f"Explain why reading units, labels or the whole carefully matters in {topic}.", "The labels define what the numbers mean; using the wrong unit, whole or category changes the answer."),
    ]
    overrides = {
        "N01": (
            ("Short response", "For AC9M4N01, write 4 tenths and 7 hundredths as a decimal.", "0.47."),
            ("Short response", "For AC9M4N01, which digit is in the hundredths place in 6.38?", "8."),
            ("Multiple choice", "For AC9M4N01, which number is greater: 3.08, 3.8 or 3.18?", "3.8."),
            ("Short response", "For AC9M4N01, explain why 0.5 and 0.50 name the same amount.", "Both show five tenths; 0.50 also shows fifty hundredths, which is equivalent."),
        ),
        "N02": (
            ("Short response", "For AC9M4N02, explain why 4,368 is even.", "Its ones digit is 8, so it can be split into two equal whole-number groups."),
            ("Multiple choice", "For AC9M4N02, which sum must be odd: odd + odd, odd + even, or even + even?", "Odd + even."),
            ("Short response", "For AC9M4N02, sort 217, 304, 555 and 908 into odd and even numbers.", "Odd: 217, 555. Even: 304, 908."),
            ("Extended response", "For AC9M4N02, prove that the sum of two even numbers is even using a simple example.", "Examples vary; both numbers make equal pairs, so the combined total still makes equal pairs."),
        ),
        "N03": (
            ("Diagram", "For AC9M4N03, shade or describe a model showing that 1/2 is equivalent to 5/10.", "The same half of the whole is shaded; in tenths this is 5 out of 10 equal parts."),
            ("Short response", "For AC9M4N03, write 7/10 as a decimal.", "0.7."),
            ("Short response", "For AC9M4N03, complete the equivalent fraction: 3/5 = ___/10.", "6/10."),
            ("Extended response", "For AC9M4N03, explain why equivalent fractions must use the same whole.", "The parts only compare fairly when they refer to the same-sized whole."),
        ),
        "N04": (
            ("Diagram", "For AC9M4N04, place 1 1/2 on a number line from 1 to 2.", "Halfway between 1 and 2."),
            ("Short response", "For AC9M4N04, count by quarters after 2: 2, 2 1/4, ___, ___.", "2 1/2, 2 3/4."),
            ("Short response", "For AC9M4N04, which is greater on a number line: 5/4 or 1?", "5/4."),
            ("Extended response", "For AC9M4N04, explain why 6/4 is the same point as 1 1/2.", "Six quarters are four quarters plus two quarters, so the value is 1 and a half."),
        ),
        "N05": (
            ("Short response", "For AC9M4N05, calculate 46 x 100 without a calculator.", "4,600."),
            ("Short response", "For AC9M4N05, calculate 7,200 divided by 10.", "720."),
            ("Multiple choice", "For AC9M4N05, which is equal to 35 x 1,000: 350, 3,500 or 35,000?", "35,000."),
            ("Extended response", "For AC9M4N05, explain the digit movement when 508 is multiplied by 10.", "Each digit becomes worth ten times as much, so 508 becomes 5,080."),
        ),
        "N06": (
            ("Short response", "For AC9M4N06, use an efficient strategy to solve 399 + 248.", "647; for example, add 400 then subtract 1."),
            ("Short response", "For AC9M4N06, solve 84 divided by 7.", "12."),
            ("Short response", "For AC9M4N06, solve 27 x 6 using a split strategy.", "162; for example, 20 x 6 plus 7 x 6."),
            ("Extended response", "For AC9M4N06, choose a strategy for 1,002 - 398 and explain why it is efficient.", "Answers vary; compensation such as 1,004 - 400 = 604 is efficient."),
        ),
        "N07": (
            ("Short response", "For AC9M4N07, estimate 398 + 602 by rounding to the nearest hundred.", "About 1,000."),
            ("Short response", "For AC9M4N07, an item costs $3.75. Estimate the change from $10 before calculating exactly.", "About $6; exact change is $6.25."),
            ("Multiple choice", "For AC9M4N07, which answer is reasonable for 51 x 19: about 100, about 1,000, or about 10,000?", "About 1,000."),
            ("Extended response", "For AC9M4N07, explain how estimation can catch a calculator entry error.", "An estimate gives a rough expected size, so an answer far away can be checked."),
        ),
        "N08": (
            ("Short response", "For AC9M4N08, write a number sentence for 4 packs of pencils with 12 pencils in each pack.", "4 x 12 = 48."),
            ("Short response", "For AC9M4N08, three tickets cost $8 each and snacks cost $14. Write the total calculation.", "3 x 8 + 14 = 38."),
            ("Matching", "For AC9M4N08, match story parts to operations: equal groups, more added, change from money, total cost.", "Equal groups -> multiplication; more added -> addition; change -> subtraction; total cost -> addition/multiplication."),
            ("Extended response", "For AC9M4N08, explain why the final answer must be interpreted in the situation.", "The number needs a meaning such as dollars, items, groups or leftover amount."),
        ),
        "N09": (
            ("Sequencing", "For AC9M4N09, follow the rule: start at 3, multiply by 2, then add 1. What are the first 4 terms?", "3, 7, 15, 31."),
            ("Short response", "For AC9M4N09, create the next two numbers: 5, 9, 17, 33, __, __.", "65, 129 if the rule is multiply by 2 then subtract 1."),
            ("Matching", "For AC9M4N09, match algorithm words to meanings: start, repeat, decision, output.", "Start -> first value; repeat -> do again; decision -> choose based on a condition; output -> result."),
            ("Extended response", "For AC9M4N09, write an algorithm that generates multiples of 6 less than 40.", "Examples vary; start at 6, add 6 repeatedly, stop before 40."),
        ),
        "A01": (
            ("Short response", "For AC9M4A01, find the missing value: ___ + 368 = 1,000.", "632."),
            ("Short response", "For AC9M4A01, find n: 742 - n = 215.", "527."),
            ("Multiple choice", "For AC9M4A01, which inverse operation helps solve n + 45 = 120?", "Subtract 45 from 120."),
            ("Extended response", "For AC9M4A01, explain why both sides of an equation must stay balanced.", "An equation states equal values; changing one side only breaks the equality."),
        ),
        "A02": (
            ("Short response", "For AC9M4A02, recall 8 x 7.", "56."),
            ("Short response", "For AC9M4A02, use a known fact to solve 80 x 7.", "560."),
            ("Short response", "For AC9M4A02, solve 63 divided by 9.", "7."),
            ("Extended response", "For AC9M4A02, explain how 6 x 8 helps solve 60 x 8.", "60 is ten times 6, so the product is ten times 48, which is 480."),
        ),
        "M01": (
            ("Diagram", "For AC9M4M01, a scale has marks at 0 L and 1 L with 4 equal spaces. What does each space show?", "0.25 L or 250 mL."),
            ("Short response", "For AC9M4M01, a thermometer rises from 18 degrees C to 27 degrees C. How much did it rise?", "9 degrees C."),
            ("Multiple choice", "For AC9M4M01, which unit best measures a classroom door height: mm, cm or km?", "cm."),
            ("Extended response", "For AC9M4M01, explain why unmarked intervals on a scale must be equal.", "Equal intervals let you calculate the missing values between labelled marks."),
        ),
        "M02": (
            ("Diagram", "For AC9M4M02, a rectangle is 8 cm long and 5 cm wide. Find its perimeter.", "26 cm."),
            ("Diagram", "For AC9M4M02, a rectangle is 7 m by 6 m. Find its area.", "42 square metres."),
            ("Short response", "For AC9M4M02, which measures the boundary of a shape: area or perimeter?", "Perimeter."),
            ("Extended response", "For AC9M4M02, explain why square units are used for area.", "Area counts how many unit squares cover a surface."),
        ),
        "M03": (
            ("Short response", "For AC9M4M03, a lesson starts at 10:35 am and lasts 50 minutes. What time does it finish?", "11:25 am."),
            ("Short response", "For AC9M4M03, how many minutes are in 2 hours 20 minutes?", "140 minutes."),
            ("Short response", "For AC9M4M03, how many hours from 9:00 am to 2:00 pm?", "5 hours."),
            ("Extended response", "For AC9M4M03, explain why am/pm matters when finding a duration.", "The same clock time can occur twice in a day, so am/pm tells which part of the day is meant."),
        ),
        "M04": (
            ("Diagram", "For AC9M4M04, a turn is greater than a right angle but less than a straight angle. Name the angle.", "Obtuse angle."),
            ("Short response", "For AC9M4M04, how many right angles make a full revolution?", "4."),
            ("Multiple choice", "For AC9M4M04, which angle is larger: acute, right, or reflex?", "Reflex."),
            ("Extended response", "For AC9M4M04, compare a straight angle and a revolution using right angles.", "A straight angle is 2 right angles; a revolution is 4 right angles."),
        ),
        "SP01": (
            ("Diagram", "For AC9M4SP01, describe a composite shape made from a rectangle and two triangles.", "A valid description names the combined parts and how they join."),
            ("Short response", "For AC9M4SP01, name two familiar shapes that could model the front of a house.", "Examples include rectangle and triangle."),
            ("Matching", "For AC9M4SP01, match object parts to shapes: roof, window, wheel, door.", "Roof -> triangle or trapezium; window -> rectangle/square; wheel -> circle; door -> rectangle."),
            ("Extended response", "For AC9M4SP01, explain why approximating an object with familiar shapes can help draw or measure it.", "It breaks a complex object into simpler parts that can be represented and compared."),
        ),
        "SP02": (
            ("Diagram", "For AC9M4SP02, on a grid map the library is at C4. What information does C4 give?", "Column C and row 4, using the map convention."),
            ("Short response", "For AC9M4SP02, a path moves north 2 squares then east 3 squares. Describe the movement.", "Move up 2 squares and right 3 squares, if north is up."),
            ("Multiple choice", "For AC9M4SP02, which is a grid reference: left, C4, or near the tree?", "C4."),
            ("Extended response", "For AC9M4SP02, explain why a map needs a key or direction marker.", "It tells users how to interpret symbols, scale and directions accurately."),
        ),
        "SP03": (
            ("Diagram", "For AC9M4SP03, describe one line of symmetry in a square.", "A vertical, horizontal or diagonal line through matching halves."),
            ("Short response", "For AC9M4SP03, how many quarter-turns make a full turn?", "4."),
            ("Multiple choice", "For AC9M4SP03, which shape has rotational symmetry: a scalene triangle, a square or a random blob?", "A square."),
            ("Extended response", "For AC9M4SP03, explain the difference between line symmetry and rotational symmetry.", "Line symmetry uses a mirror line; rotational symmetry matches after a turn."),
        ),
    }
    suffix = code.replace("AC9M4", "")
    if suffix in overrides:
        p[0], p[3], e[0], e[5] = overrides[suffix]
    elif "chance" in topic:
        if code.endswith("P01"):
            p[0] = ("Multiple choice", "For AC9M4P01 chance language, a bag has 9 blue counters and 1 red counter. Which colour is more likely?", "Blue.")
            e[0] = ("Short response", "For AC9M4P01, describe the likelihood of choosing red from a bag with 1 red and 9 blue counters.", "Possible but unlikely.")
        else:
            p[0] = ("Data display", "For AC9M4P02 repeated trials, a spinner lands on green 13 times and yellow 7 times in 20 spins. Which outcome occurred more often?", "Green.")
            e[0] = ("Short response", "For AC9M4P02, if a fair coin is tossed 20 times, must it land heads exactly 10 times? Explain.", "No. That is expected, but actual results can vary.")
    elif "data" in topic or "statistical" in topic:
        if code.endswith("ST01"):
            p[0] = ("Data display", "For AC9M4ST01 data collection, a tally shows 6 cats, 9 dogs and 5 birds. Which category has the highest count?", "Dogs.")
            e[0] = ("Short response", "For AC9M4ST01, write a survey question that would collect data about favourite playground games.", "Answers vary; must ask one clear, collectable question such as 'Which playground game do you like best?'")
        elif code.endswith("ST02"):
            p[0] = ("Data display", "For AC9M4ST02 data displays, a column graph shows 6 cats, 9 dogs and 5 birds. Which pet has the highest count?", "Dogs.")
            e[0] = ("Data display", "For AC9M4ST02, a table shows scores 12, 15, 15 and 18. What value appears most often?", "15.")
        else:
            p[0] = ("Data display", "For AC9M4ST03 investigations, a class graph shows 6 walk, 9 bus and 5 bike responses. What conclusion is supported?", "Bus was the most common response in this class data.")
            e[0] = ("Extended response", "For AC9M4ST03, a table shows scores 12, 15, 15 and 18. Write one conclusion and one limitation.", "15 appears most often; the data set is small, so conclusions should be limited.")
    return p, e


def science_questions(code: str, topic: str) -> tuple[list[tuple[str, str, str]], list[tuple[str, str, str]]]:
    p = [
        ("Diagram", f"Inspect a labelled Year 4 {topic} diagram. Which label shows the evidence most directly connected to the main idea?", "The label that points to the observed feature or measured result, not a decorative part."),
        ("Multiple choice", f"Which statement is best for {topic}: evidence supports explanations, guesses are always enough, or labels do not matter?", "Evidence supports explanations."),
        ("Matching", f"Match {topic} investigation parts: question, prediction, observation, conclusion.", "Question -> what to find out; prediction -> expected result with reason; observation -> what is noticed/measured; conclusion -> claim supported by evidence."),
        ("Short response", f"Write one measurable or observable feature that would help compare two examples of {topic}.", "Any relevant observable feature, such as size, temperature, mass, growth, texture, position or count."),
        ("Data display", f"A Year 4 {topic} table has results 12, 15, 15 and 18. What pattern or repeated result can be reported?", "15 appears twice; results are between 12 and 18."),
        ("Sequencing", f"Order the {topic} investigation steps: collect data, ask a question, plan a fair method, communicate findings.", "Ask a question; plan a fair method; collect data; communicate findings."),
        ("Extended response", f"Explain why a labelled diagram or photograph would help students answer a {topic} question.", "It gives visible evidence that students can inspect, compare and refer to in their answer."),
        ("Extended response", f"A group changes two things at once in a {topic} investigation. Explain why this is a problem.", "It becomes unclear which change caused the result, so the test is less fair."),
    ]
    e = [
        ("Short response", f"Name one type of evidence that could support a Year 4 explanation about {topic}.", "A measured result, repeated observation, labelled diagram, table, photograph or graph."),
        ("Diagram", f"Use a simple labelled diagram for {topic}. What should a good label include?", "The feature name and enough detail to connect it to the science idea."),
        ("Multiple choice", f"Which {topic} result is strongest: one quick guess, repeated similar measurements, or an unlabelled drawing?", "Repeated similar measurements."),
        ("Matching", f"Match {topic} words to roles: variable, fair test, data, evidence.", "Variable -> factor that can change; fair test -> controlled method; data -> recorded results; evidence -> data used to support a claim."),
        ("Data display", f"A graph for {topic} shows Trial 1 = 8 cm, Trial 2 = 9 cm, Trial 3 = 9 cm. What conclusion is safest?", "The measured value is usually about 9 cm, with one lower result."),
        ("Short response", f"Write a prediction sentence for a {topic} investigation using 'because'.", "Answers vary but must state expected result and a reason."),
        ("Extended response", f"Compare two possible explanations for a {topic} result and choose the one better supported by evidence.", "The chosen explanation must refer to the provided observations or measurements."),
        ("Extended response", f"Explain how to communicate a Year 4 {topic} finding clearly to another class.", "State the question, show the data/diagram, give the conclusion and use clear science vocabulary."),
    ]
    overrides = {
        "U01": (
            ("Diagram", "For AC9S4U01 food chains, order these roles: producer, consumer, decomposer.", "Producer first, consumer feeds on producer/other consumers, decomposer breaks down dead material."),
            ("Matching", "For AC9S4U01, match roles to examples: grass, caterpillar, bird, fungus.", "Grass -> producer; caterpillar -> primary consumer; bird -> consumer; fungus -> decomposer."),
            ("Short response", "For AC9S4U01, explain what the arrows in a food chain show.", "They show the direction of energy or food transfer."),
            ("Extended response", "For AC9S4U01, predict what could happen to a food chain if one producer disappears.", "Consumers depending on it may have less food, affecting other connected organisms."),
        ),
        "U02": (
            ("Diagram", "For AC9S4U02 water cycle processes, match evaporation, condensation and precipitation to a labelled diagram.", "Evaporation -> liquid water to vapour; condensation -> vapour to droplets/clouds; precipitation -> rain, hail or snow falling."),
            ("Short response", "For AC9S4U02, name two sources of water in the environment.", "Examples include oceans, rivers, lakes, groundwater, clouds, ice or rain."),
            ("Multiple choice", "For AC9S4U02, which process forms clouds: evaporation, condensation or collection?", "Condensation."),
            ("Extended response", "For AC9S4U02, explain how water can move from the ocean to land.", "Water evaporates, condenses into clouds, moves with wind and falls as precipitation."),
        ),
        "U03": (
            ("Diagram", "For AC9S4U03 forces, identify whether a magnet pulling a paperclip is contact or non-contact.", "Non-contact force."),
            ("Short response", "For AC9S4U03, name one force that can slow a moving object.", "Friction."),
            ("Multiple choice", "For AC9S4U03, which force pulls objects toward Earth: friction, gravity or magnetism?", "Gravity."),
            ("Extended response", "For AC9S4U03, compare friction on smooth tiles and rough carpet for a toy car.", "More friction on rough carpet slows the car more than smooth tiles."),
        ),
        "U04": (
            ("Matching", "For AC9S4U04 materials, match properties to uses: waterproof, flexible, transparent, strong.", "Waterproof -> raincoat; flexible -> rubber band; transparent -> window; strong -> bridge support."),
            ("Short response", "For AC9S4U04, why is glass useful for windows but risky for a lunchbox drink bottle?", "It is transparent but can break; a safer material may be chosen for carrying."),
            ("Multiple choice", "For AC9S4U04, which property matters most for an umbrella fabric: magnetic, waterproof or transparent?", "Waterproof."),
            ("Extended response", "For AC9S4U04, choose a material for a school bag strap and justify it using two properties.", "Answers vary; should name properties such as strong, flexible, comfortable or durable."),
        ),
        "H01": (
            ("Data display", "For AC9S4H01, repeated plant-height data shows similar growth each week. What makes this stronger than one guess?", "Repeated data gives evidence that can support an explanation."),
            ("Short response", "For AC9S4H01, name one way data helps scientists explain a pattern.", "It shows observations or measurements that can be compared and checked."),
            ("Multiple choice", "For AC9S4H01, which is best evidence: a repeated measurement, a decoration, or a guess?", "A repeated measurement."),
            ("Extended response", "For AC9S4H01, explain why scientists may change an explanation when new data appears.", "New evidence can support a better or more accurate explanation."),
        ),
        "H02": (
            ("Short response", "For AC9S4H02, give one example of science helping solve a community problem.", "Examples include water filtering, safe materials, weather warnings, habitat care or recycling decisions."),
            ("Multiple choice", "For AC9S4H02, which solution uses science: testing water quality, choosing by guessing, or ignoring evidence?", "Testing water quality."),
            ("Matching", "For AC9S4H02, match needs to science knowledge: clean water, safe bridge, warmer clothes.", "Clean water -> filtering/testing; safe bridge -> material strength; warmer clothes -> insulation/material properties."),
            ("Extended response", "For AC9S4H02, explain how evidence should guide a solution choice.", "Evidence shows which option works, is safe and meets the need."),
        ),
    }
    suffix = code.replace("AC9S4", "")
    if suffix in overrides:
        p[0], p[3], e[0], e[5] = overrides[suffix]
    return p, e


def write_bank(code: str) -> None:
    unit = UNITS[code]
    subject = unit["subject"]
    topic, rule = hint_for(code, subject)
    example = f"For {topic}, use the numbers, labels, diagram or data in the task before choosing an answer."
    trap = "Do not answer from a keyword alone; check the full context and any labels, units or evidence."
    questions = math_questions(code, topic) if subject == "Mathematics" else science_questions(code, topic)
    folder_subject = "mathematics" if subject == "Mathematics" else "science"
    target = BANK_ROOT / folder_subject / slug(code) / "batch-1.md"
    target.parent.mkdir(parents=True, exist_ok=True)
    body = [
        front_matter(code, subject, unit["description"]),
        f"# {code} - Pass 1 question bank\n",
        "## 60-second Quick Read\n",
        f"- **Key idea:** {rule}",
        f"- **Worked example:** {example}",
        f"- **Common trap:** {trap}",
        "- **Visual model:** Use diagrams, maps, graphs, tables, measurement tools, apparatus drawings or real images only when they carry information needed for the question. Online tasks must include tap and keyboard alternatives to drag-and-drop.\n",
        "## Practice questions\n",
        render_questions(questions[0], "P", topic),
        "## Exam questions\n",
        render_questions(questions[1], "E", topic),
    ]
    target.write_text("\n".join(body))


def main() -> None:
    codes = [
        unit["code"]
        for unit in DATA
        if unit.get("levelLabel") == "Year 4" and unit.get("subject") in {"Mathematics", "Science"} and unit.get("questionEligible", True)
    ]
    for code in codes:
        write_bank(code)
    print(f"Generated {len(codes)} Year 4 Maths/Science banks.")


if __name__ == "__main__":
    main()
