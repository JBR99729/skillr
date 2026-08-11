#!/usr/bin/env python3
"""Generate Year 3 Maths and Science pass-1 question banks."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data" / "curriculum-units.json").read_text())
BANK_ROOT = ROOT / "curriculum-question-banks" / "banks" / "year-3"


MATH_CODES = [
    "AC9M3N02",
    "AC9M3N03",
    "AC9M3N04",
    "AC9M3N05",
    "AC9M3N06",
    "AC9M3N07",
    "AC9M3A01",
    "AC9M3A02",
    "AC9M3A03",
    "AC9M3M01",
    "AC9M3M02",
    "AC9M3M03",
    "AC9M3M04",
    "AC9M3M05",
    "AC9M3M06",
    "AC9M3SP01",
    "AC9M3SP02",
    "AC9M3ST01",
    "AC9M3ST02",
    "AC9M3ST03",
    "AC9M3P01",
    "AC9M3P02",
]

SCIENCE_CODES = [
    "AC9S3U01",
    "AC9S3U02",
    "AC9S3U03",
    "AC9S3U04",
    "AC9S3H01",
    "AC9S3H02",
    "AC9S3I01",
    "AC9S3I02",
    "AC9S3I03",
    "AC9S3I04",
    "AC9S3I05",
    "AC9S3I06",
]


MATH_SPECS = {
    "AC9M3N02": {
        "topic": "unit fractions",
        "rule": "A unit fraction has numerator 1. The denominator tells how many equal parts make one whole.",
        "example": "If a sandwich is cut into 4 equal parts, one part is 1/4 and three parts are 3/4.",
        "trap": "Unequal parts do not make correct fractions, even if there are the right number of pieces.",
        "practice": [
            ("Short response", "A pizza is cut into 5 equal slices. What fraction is one slice?", "1/5. One equal part out of 5 is one-fifth."),
            ("Multiple choice", "Which picture would show 3/4 correctly: 3 of 4 equal parts shaded, 3 of 5 equal parts shaded, or 4 of 3 equal parts shaded?", "3 of 4 equal parts shaded."),
            ("Matching", "Match 1/2, 1/3, 1/4 and 1/10 to wholes split into 2, 3, 4 and 10 equal parts.", "1/2 -> 2 parts; 1/3 -> 3 parts; 1/4 -> 4 parts; 1/10 -> 10 parts."),
            ("Short response", "How many fifths make one whole?", "5 fifths."),
            ("Short response", "Sam has 2/4 of a strip and adds 2/4 more. What fraction of the strip does Sam have?", "4/4, which is 1 whole."),
            ("Sequencing", "Order these fractions of the same whole from smallest to largest: 1/2, 1/10, 1/4, 1/3.", "1/10, 1/4, 1/3, 1/2."),
            ("Extended response", "Explain why 1/3 of a small cake can be less food than 1/4 of a large cake.", "Fractions depend on the size of the whole; the wholes are different sizes."),
            ("Short response", "Twelve counters are shared equally between 3 children. What fraction and how many counters does each child get?", "Each gets 1/3 of the collection, which is 4 counters."),
        ],
        "exam": [
            ("Short response", "Draw or describe 4/5 of a rectangle.", "A rectangle split into 5 equal parts with 4 shaded."),
            ("Short response", "How many tenths make one whole?", "10 tenths."),
            ("Multiple choice", "Which is equivalent to one whole: 2/2, 3/4 or 4/5?", "2/2."),
            ("Extended response", "A rope is cut into 3 equal parts. Ava keeps 2 parts. Explain the fraction Ava keeps.", "She keeps 2/3 because she has 2 of the 3 equal parts."),
            ("Short response", "Complete the whole: 3/5 + ___ = 5/5.", "2/5."),
            ("Matching", "Match each situation to 1/2, 1/4 or 1/5: one of 2 equal teams, one of 4 equal pieces, one of 5 equal bags.", "Teams -> 1/2; pieces -> 1/4; bags -> 1/5."),
            ("Extended response", "Why is a shape split into 4 unequal pieces not a correct model of fourths?", "Fourths must be equal parts of the same whole."),
            ("Short response", "Fifteen shells are shared equally between 5 groups. What fraction of the shells is one group and how many shells is that?", "One group is 1/5, which is 3 shells."),
        ],
    },
    "AC9M3N03": {
        "topic": "two- and three-digit addition and subtraction",
        "rule": "Use place value to add or subtract hundreds, tens and ones. Regroup when ones or tens cross a ten or hundred.",
        "example": "247 + 38 = 247 + 30 + 8 = 277 + 8 = 285.",
        "trap": "Line up digits by place value; ones under ones, tens under tens and hundreds under hundreds.",
        "practice": [
            ("Short response", "Calculate 236 + 47 using a place-value strategy.", "283; for example 236 + 40 = 276, then +7 = 283."),
            ("Short response", "Calculate 402 - 58.", "344."),
            ("Matching", "Match each expression to its answer: 125 + 70, 125 + 7, 125 - 70, 125 - 7.", "195, 132, 55, 118 respectively."),
            ("Short response", "What number is 90 more than 368?", "458."),
            ("Short response", "Find the missing number: 276 + ___ = 300.", "24."),
            ("Multiple choice", "Which estimate is best for 498 + 203: 500, 700 or 900?", "700."),
            ("Extended response", "A school has 184 blue pencils and 129 red pencils. How many pencils altogether? Show your strategy.", "313 pencils; valid addition strategy shown."),
            ("Extended response", "Mia says 503 - 196 = 407. Explain the error and give the correct answer.", "She likely subtracted 100 only or mis-regrouped; 503 - 196 = 307."),
        ],
        "exam": [
            ("Short response", "Calculate 375 + 268.", "643."),
            ("Short response", "Calculate 610 - 274.", "336."),
            ("Short response", "Complete: 489 + ___ = 700.", "211."),
            ("Multiple choice", "Which number sentence checks 812 - 459 = 353?", "459 + 353 = 812."),
            ("Extended response", "A library lends 257 books on Monday and 186 on Tuesday. How many more books are needed to reach 500 loans?", "57 more; 257 + 186 = 443 and 500 - 443 = 57."),
            ("Short response", "Use compensation to solve 399 + 246.", "645; 400 + 246 - 1."),
            ("Extended response", "Explain why 702 - 48 is not 746.", "Subtraction decreases the number; 702 - 48 = 654."),
            ("Short response", "A number is 135 less than 520. What is it?", "385."),
        ],
    },
    "AC9M3N04": {
        "topic": "multiplication and division problems",
        "rule": "Multiplication joins equal groups. Division either shares a total equally or finds how many equal groups fit.",
        "example": "6 bags with 4 apples each is 6 x 4 = 24 apples; 24 shared between 6 bags is 4 each.",
        "trap": "Only use multiplication when the groups are equal.",
        "practice": [
            ("Short response", "There are 7 rows of 4 chairs. How many chairs?", "28 chairs."),
            ("Short response", "Share 36 counters equally into 4 groups. How many in each group?", "9 counters."),
            ("Matching", "Match 5 x 6, 30 / 5, 4 x 8 and 32 / 4 to 30, 6, 32 and 8.", "5 x 6 -> 30; 30 / 5 -> 6; 4 x 8 -> 32; 32 / 4 -> 8."),
            ("Short response", "Write a multiplication sentence for 3 equal groups of 9.", "3 x 9 = 27."),
            ("Short response", "How many groups of 5 are in 45?", "9 groups."),
            ("Multiple choice", "Which array shows 6 x 3: 6 rows of 3, 6 unequal piles, or 3 dots total?", "6 rows of 3."),
            ("Extended response", "A sticker sheet has 8 stickers in each row and 4 rows. Explain two ways to find the total.", "32; examples include 8+8+8+8 and 4 x 8."),
            ("Extended response", "A student divides 24 by 3 and gets 6. Explain the correct answer.", "24 / 3 = 8 because 3 equal groups of 8 make 24."),
        ],
        "exam": [
            ("Short response", "Calculate 9 x 4.", "36."),
            ("Short response", "Calculate 42 / 6.", "7."),
            ("Short response", "There are 5 packets with 8 cards each. How many cards?", "40 cards."),
            ("Multiple choice", "Which fact helps solve 56 / 7: 7 x 8 = 56, 6 x 7 = 42 or 5 x 7 = 35?", "7 x 8 = 56."),
            ("Extended response", "A class has 32 students in equal teams of 4. How many teams are there? Show the related multiplication fact.", "8 teams; 8 x 4 = 32."),
            ("Short response", "Write a division sentence for 6 rows of 5 making 30.", "30 / 6 = 5 or 30 / 5 = 6."),
            ("Extended response", "Explain why 4 x 7 and 7 x 4 have the same total but can describe different arrays.", "Both make 28; rows and columns are swapped."),
            ("Short response", "How many legs on 9 spiders if each has 8 legs?", "72 legs."),
        ],
    },
    "AC9M3N05": {
        "topic": "estimation",
        "rule": "An estimate is a sensible close answer. Use benchmarks, grouping, rounding and known facts to judge reasonableness.",
        "example": "If each row has about 10 shells and there are about 6 rows, estimate about 60 shells.",
        "trap": "An estimate should be close enough to be useful, not a wild guess.",
        "practice": [
            ("Short response", "A jar has about 9 rows of 8 beads. Estimate the total.", "About 72 beads, or about 70."),
            ("Multiple choice", "Which is the best estimate for 398 + 205: 400, 600 or 900?", "600."),
            ("Short response", "Round 347 to the nearest hundred.", "300."),
            ("Matching", "Match 49, 203 and 781 to the nearest benchmark: 50, 200, 800.", "49 -> 50; 203 -> 200; 781 -> 800."),
            ("Short response", "Estimate 6 groups of 21.", "About 120."),
            ("Short response", "Is 52 a reasonable estimate for 8 rows of 7? Explain.", "Yes; exact is 56, so 52 is close."),
            ("Extended response", "Estimate the number of counters in a tray with 4 sections of about 25 counters each.", "About 100 counters; 4 x 25 = 100."),
            ("Extended response", "Tom estimates 92 + 88 as 300. Explain why this is not reasonable.", "Each number is near 90; total is about 180, not 300."),
        ],
        "exam": [
            ("Short response", "Give a reasonable estimate for 298 + 401.", "About 700."),
            ("Short response", "Estimate 49 x 6.", "About 300."),
            ("Multiple choice", "A crowd has 10 rows of about 12 people. Best estimate: 22, 120 or 1000?", "120."),
            ("Short response", "Round 672 to the nearest ten.", "670."),
            ("Extended response", "A shelf has 8 stacks with about 15 books each. Estimate the books and explain.", "About 120 books; 8 x 15 = 120."),
            ("Short response", "Is 250 a reasonable estimate for 126 + 119?", "Yes; exact is 245."),
            ("Extended response", "Explain one method for estimating a large collection without counting every object.", "Use equal groups, rows or a sample area, then multiply by the number of groups."),
            ("Short response", "Estimate 803 - 397.", "About 400."),
        ],
    },
    "AC9M3N06": {
        "topic": "mathematical modelling with number",
        "rule": "A model turns a practical situation into a number sentence. Choose operations that match the story and check whether the answer makes sense.",
        "example": "Four teams of 6 students and 3 extra students is 4 x 6 + 3 = 27 students.",
        "trap": "Read the question carefully; some problems need more than one operation.",
        "practice": [
            ("Extended response", "A picnic has 5 tables with 6 students at each and 4 teachers. How many people? Show a model.", "5 x 6 + 4 = 34 people."),
            ("Short response", "There are 48 pencils packed equally into 6 cups. How many pencils in each cup?", "8 pencils."),
            ("Short response", "A bus has 42 seats. If 29 are filled, how many are empty?", "13 seats."),
            ("Matching", "Match the story to +, -, x or /: join groups, find difference, equal groups, share equally.", "Join -> +; difference -> -; equal groups -> x; share -> /."),
            ("Short response", "A ticket costs $4. How much for 7 tickets?", "$28."),
            ("Extended response", "A class needs 30 paper flowers. They have made 18 and make 4 each day. How many more days are needed?", "3 days; 30 - 18 = 12 and 12 / 4 = 3."),
            ("Multiple choice", "Which number sentence matches 3 boxes of 8 plus 5 loose crayons: 3 + 8 + 5, 3 x 8 + 5 or 8 - 3 + 5?", "3 x 8 + 5."),
            ("Extended response", "Explain how you would check whether an answer to a word problem is reasonable.", "Use estimation, inverse operation or reread the story context."),
        ],
        "exam": [
            ("Extended response", "A garden has 6 rows of 7 plants. Five plants do not grow. How many grow?", "6 x 7 - 5 = 37 plants."),
            ("Short response", "Sixty stickers are shared between 5 students. How many each?", "12 stickers."),
            ("Short response", "A game score starts at 125 and increases by 35. What is the new score?", "160."),
            ("Multiple choice", "Which operation finds how many groups of 4 are in 36?", "Division."),
            ("Extended response", "A shop sells 8 muffins in a tray. How many full trays are needed for 34 muffins?", "5 trays, because 4 trays hold 32 and one more tray is needed."),
            ("Short response", "Write a number sentence for 9 bags with 3 marbles each, then 6 more marbles.", "9 x 3 + 6 = 33."),
            ("Extended response", "A student adds in a sharing problem. Explain when addition would be wrong.", "If the problem asks for equal shares or number of groups, division is needed."),
            ("Short response", "There are 100 tickets. 47 are sold in the morning and 28 in the afternoon. How many remain?", "25 tickets."),
        ],
    },
    "AC9M3N07": {
        "topic": "algorithms",
        "rule": "An algorithm is a clear sequence of steps that can be followed to solve a problem or complete a task.",
        "example": "To make 36: start at 4, multiply by 8, add 4 gives 36.",
        "trap": "Steps must be in order; changing the order can change the result.",
        "practice": [
            ("Sequencing", "Order these steps to add 248 + 36: add 30, start at 248, add 6, record 284.", "Start at 248; add 30; add 6; record 284."),
            ("Short response", "Follow the rule: start at 5, double it, add 3. What is the result?", "13."),
            ("Short response", "Write two steps to check 315 - 128 using addition.", "Find the difference 187, then check 128 + 187 = 315."),
            ("Matching", "Match algorithm words to meanings: input, step, output, repeat.", "Input -> starting value; step -> instruction; output -> result; repeat -> do again."),
            ("Short response", "A rule says add 4 each time. Starting at 6, list the next four numbers.", "10, 14, 18, 22."),
            ("Extended response", "Explain why 'add 5 then multiply by 2' is different from 'multiply by 2 then add 5' for a starting number of 3.", "First gives 16; second gives 11, so order matters."),
            ("Multiple choice", "Which instruction is clearest: 'make it bigger', 'add 10', or 'do something'?", "add 10."),
            ("Extended response", "Create a three-step algorithm that starts at 20 and finishes at 50.", "Answers vary; for example add 15, add 10, add 5."),
        ],
        "exam": [
            ("Short response", "Follow: start at 12, subtract 4, multiply by 3.", "24."),
            ("Sequencing", "Order the steps for rounding 367 to the nearest ten.", "Look at ones digit; ones is 7; round tens up; answer 370."),
            ("Short response", "What is the output if the input is 9 and the rule is multiply by 4 then subtract 6?", "30."),
            ("Multiple choice", "Which step would cause an algorithm to be unreliable: precise instruction, missing instruction, or checked output?", "missing instruction."),
            ("Extended response", "Write an algorithm for finding the perimeter of a rectangle from its side lengths.", "Add length + width + length + width, or double length and double width then add."),
            ("Short response", "A pattern algorithm adds 8 each time. What follows 24, 32, 40?", "48."),
            ("Extended response", "Debug this rule: start at 100, subtract 20, subtract 30, answer 60. What is wrong?", "100 - 20 - 30 = 50, not 60."),
            ("Short response", "Create a rule that changes 7 into 28.", "For example, multiply by 4."),
        ],
    },
    "AC9M3A01": {
        "topic": "addition and subtraction as inverse operations",
        "rule": "Addition and subtraction undo each other. Use fact families to check missing numbers.",
        "example": "37 + 18 = 55, so 55 - 18 = 37 and 55 - 37 = 18.",
        "trap": "The total belongs in a different place in subtraction than in addition.",
    },
    "AC9M3A02": {
        "topic": "addition and subtraction facts",
        "rule": "Known facts to 20 can be extended to larger numbers by place value.",
        "example": "8 + 7 = 15 helps with 80 + 70 = 150 and 38 + 7 = 45.",
        "trap": "Do not forget the place value when extending a basic fact.",
    },
    "AC9M3A03": {
        "topic": "multiplication facts for 3, 4, 5 and 10",
        "rule": "Use skip counting, arrays and known facts to recall multiplication facts efficiently.",
        "example": "4 x 6 can be doubled twice: 6 doubled is 12, doubled again is 24.",
        "trap": "Counting all objects one by one is slow and can hide the equal-group structure.",
    },
    "AC9M3M01": {
        "topic": "choosing metric units",
        "rule": "Choose units that fit the object: millimetres, centimetres, metres, kilometres, grams, kilograms, millilitres and litres.",
        "example": "Measure a pencil in centimetres, a room in metres and a road trip in kilometres.",
        "trap": "A unit can be correct for one object but silly for another.",
    },
    "AC9M3M02": {
        "topic": "measuring and comparing length, mass and capacity",
        "rule": "Use the same unit when comparing measurements. Read scales carefully from zero or from the marked starting point.",
        "example": "45 cm is longer than 38 cm because both are in centimetres.",
        "trap": "Do not compare numbers alone when the units are different.",
    },
    "AC9M3M03": {
        "topic": "formal units of time",
        "rule": "Time units are connected: 60 seconds = 1 minute, 60 minutes = 1 hour, 24 hours = 1 day and 7 days = 1 week.",
        "example": "2 hours 15 minutes is 120 + 15 = 135 minutes.",
        "trap": "Time is not base ten; 1 hour is 60 minutes, not 100 minutes.",
    },
    "AC9M3M04": {
        "topic": "analog and digital time",
        "rule": "On an analog clock, the minute hand shows minutes past the hour and the hour hand sits between hours.",
        "example": "3:45 means 45 minutes past 3, or quarter to 4.",
        "trap": "At half past, the hour hand is halfway to the next hour.",
    },
    "AC9M3M05": {
        "topic": "angles as measures of turn",
        "rule": "An angle measures the amount of turn. A right angle is a quarter turn.",
        "example": "A half turn has 2 right angles; a full turn has 4 right angles.",
        "trap": "Longer arms do not make a bigger angle; the opening or turn matters.",
    },
    "AC9M3M06": {
        "topic": "dollars and cents",
        "rule": "One dollar equals 100 cents. Money amounts can be represented with coins, notes and decimal notation.",
        "example": "$3.45 is 3 dollars and 45 cents, or 345 cents.",
        "trap": "$3.05 needs a zero in the cents place.",
    },
    "AC9M3SP01": {
        "topic": "classifying 3D objects",
        "rule": "Classify objects by features such as faces, edges, vertices, curved surfaces and whether faces are flat.",
        "example": "A cube has 6 square faces, 12 edges and 8 vertices.",
        "trap": "A cylinder has curved surface; it is not a prism.",
    },
    "AC9M3SP02": {
        "topic": "maps and two-dimensional representations",
        "rule": "A map is a top-view representation. Use symbols, labels, directions and grid references to locate places.",
        "example": "On a grid, B3 means column B and row 3 when that convention is given.",
        "trap": "Always check the map key and direction arrow before deciding left, right, north or south.",
    },
    "AC9M3ST01": {
        "topic": "collecting categorical and numerical data",
        "rule": "Categorical data uses names or groups; discrete numerical data uses countable numbers.",
        "example": "Favourite fruit is categorical; number of siblings is discrete numerical.",
        "trap": "A survey question must match the data needed.",
    },
    "AC9M3ST02": {
        "topic": "comparing data displays",
        "rule": "Different graphs can show the same data. Compare labels, scales and category heights before interpreting.",
        "example": "A column graph and picture graph can both show that soccer has the most votes.",
        "trap": "A picture graph key may mean each picture stands for more than one item.",
    },
    "AC9M3ST03": {
        "topic": "guided statistical investigations",
        "rule": "A statistical investigation asks a question, collects data, represents it, interprets it and reports what was found.",
        "example": "Question: How do Year 3 students travel to school? Collect tallies, draw a graph and describe the most common method.",
        "trap": "Do not make a conclusion that the data does not support.",
    },
    "AC9M3P01": {
        "topic": "chance outcomes",
        "rule": "Chance words describe how likely outcomes are: impossible, unlikely, equally likely, likely and certain.",
        "example": "Rolling an even number on a fair six-sided die is equally likely to rolling an odd number.",
        "trap": "Possible does not mean certain.",
    },
    "AC9M3P02": {
        "topic": "repeated chance experiments",
        "rule": "Repeated trials help show patterns in chance, but results can vary from the expected outcome.",
        "example": "A coin might land heads 6 times in 10 flips, even though heads and tails are equally likely.",
        "trap": "Small experiments do not always match the expected pattern exactly.",
    },
}


SCIENCE_SPECS = {
    "AC9S3U01": {
        "topic": "living and non-living things",
        "concept": "Living things grow, need energy or nutrients, respond to changes and reproduce. Once-living things came from living things but are no longer alive.",
        "vocab": "living, non-living, once living, life cycle, offspring",
        "example": "A seedling is living, a wooden ruler is once living, and a metal spoon is non-living.",
        "misconception": "Moving does not always mean living; wind-up toys move but are not alive.",
    },
    "AC9S3U02": {
        "topic": "soils, rocks and minerals",
        "concept": "Rocks and minerals have observable properties such as colour, texture, hardness, grain size and layering. Soil is a mixture of tiny rock pieces, minerals and once-living material.",
        "vocab": "rock, mineral, soil, texture, hardness, grain",
        "example": "Sandy soil feels gritty and drains quickly; clay soil feels sticky and holds water.",
        "misconception": "All rocks are not the same just because they are hard.",
    },
    "AC9S3U03": {
        "topic": "heat energy and temperature",
        "concept": "Heat energy can move from warmer objects to cooler objects. Temperature measures how hot or cold something is.",
        "vocab": "heat, temperature, thermometer, insulator, conductor",
        "example": "A metal spoon in warm soup heats faster than a wooden spoon because metal conducts heat well.",
        "misconception": "Heat and temperature are related, but they are not exactly the same idea.",
    },
    "AC9S3U04": {
        "topic": "solids and liquids",
        "concept": "Solids keep their own shape. Liquids flow and take the shape of their container while keeping the same amount unless added or removed.",
        "vocab": "solid, liquid, flow, container, property",
        "example": "Water changes shape in a cup or bowl, but a wooden block keeps its shape.",
        "misconception": "A soft solid, such as playdough, is still a solid because it does not flow like a liquid.",
    },
    "AC9S3H01": {
        "topic": "using data to explain",
        "concept": "Scientists use observations and data as evidence to develop explanations about patterns in the world.",
        "vocab": "data, evidence, observation, explanation, pattern",
        "example": "If plants near sunlight grow taller in repeated observations, the data supports an explanation about light and growth.",
        "misconception": "One observation is useful, but repeated data is stronger evidence.",
    },
    "AC9S3H02": {
        "topic": "science meeting needs",
        "concept": "Scientific explanations can help people design solutions, choose materials and solve everyday problems.",
        "vocab": "need, solution, material, design, explanation",
        "example": "Knowing that dark surfaces warm faster can help design warmer winter clothing.",
        "misconception": "Science is not only facts in a book; it helps people make decisions.",
    },
    "AC9S3I01": {
        "topic": "questions and predictions",
        "concept": "A testable question can be investigated with observations or measurements. A prediction says what you think will happen and why.",
        "vocab": "question, prediction, pattern, relationship, testable",
        "example": "Question: Does the surface affect how far a toy car rolls? Prediction: It will roll farther on smooth card.",
        "misconception": "A prediction is not a random guess; it should connect to what you already know.",
    },
    "AC9S3I02": {
        "topic": "planning fair investigations",
        "concept": "A fair investigation changes one thing, measures one result and keeps other important things the same.",
        "vocab": "fair test, variable, method, equipment, measure",
        "example": "To test ramp height, change only the height and keep the same car and surface.",
        "misconception": "Changing two things at once makes it hard to know what caused the result.",
    },
    "AC9S3I03": {
        "topic": "observing and recording",
        "concept": "Scientists follow procedures and record observations carefully, often using formal measurements and labelled notes.",
        "vocab": "procedure, observation, measurement, record, label",
        "example": "Record a plant's height as 18 cm on Monday, not just 'bigger'.",
        "misconception": "Memory is not as reliable as a written record made during the investigation.",
    },
    "AC9S3I04": {
        "topic": "tables, graphs and diagrams",
        "concept": "Representations organise information so patterns are easier to see. Tables, column graphs and labelled diagrams each have a purpose.",
        "vocab": "table, column graph, diagram, label, scale",
        "example": "A column graph can show which soil held the most water.",
        "misconception": "A graph without labels or a scale is hard to interpret accurately.",
    },
    "AC9S3I05": {
        "topic": "comparing findings and fairness",
        "concept": "Scientists compare results with others and decide whether the investigation was fair enough to trust.",
        "vocab": "finding, compare, fair, reliable, improve",
        "example": "If two groups get very different results, they should check whether they used the same method.",
        "misconception": "Different results do not always mean someone is wrong; the method may have changed.",
    },
    "AC9S3I06": {
        "topic": "communicating findings",
        "concept": "A science text explains what was investigated, what evidence was found and what conclusion the evidence supports.",
        "vocab": "communicate, finding, evidence, conclusion, audience",
        "example": "A poster about plant growth should include the question, graph, conclusion and useful labels.",
        "misconception": "A conclusion should come from evidence, not from what you hoped would happen.",
    },
}


def unit_description(code: str) -> str:
    matches = []

    def walk(value):
        if isinstance(value, dict):
            if value.get("code") == code:
                matches.append(value)
            for child in value.values():
                walk(child)
        elif isinstance(value, list):
            for child in value:
                walk(child)

    walk(DATA.get("units", DATA))
    if matches:
        for key in ("description", "contentDescription", "title", "name"):
            if matches[0].get(key):
                return str(matches[0][key])
    return ""


def _legacy_unit_description(code: str) -> str:
    matches = []
    for item in DATA:
        if isinstance(item, dict):
            if item.get("code") == code:
                matches.append(item)
            for key in ("units", "children"):
                for child in item.get(key, []) if isinstance(item.get(key), list) else []:
                    if isinstance(child, dict) and child.get("code") == code:
                        matches.append(child)
    if matches:
        for key in ("description", "contentDescription", "title", "name"):
            if matches[0].get(key):
                return str(matches[0][key])
    return ""


def front_matter(code: str, subject: str, description: str) -> str:
    return f"""---
curriculum_code: {code}
subject: {subject}
year_level: Year 3
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


def render_questions(items: list[tuple[str, str, str]], prefix: str) -> str:
    out = []
    tier_names = [
        "Knowledge and terms",
        "Core skill practice",
        "Guided application",
        "Problem solving and reasoning",
    ]
    for i, (qtype, question, key) in enumerate(items, 1):
        if i in (1, 3, 5, 7):
            out.append(f"## Tier {(i + 1) // 2} - {tier_names[(i - 1) // 2]}\n")
        out.append(f"### {prefix}{i:02d} - {question[:42].rstrip(' ?.')}\n")
        out.append(f"**Type:** {qtype}\n")
        if qtype in {"Matching", "Sequencing"}:
            out.append("**Delivery:** Online, provide drag, tap-to-place and keyboard controls. On paper, students draw lines, number the items or rewrite the ordered answer.\n")
        elif qtype == "Multiple choice":
            out.append("**Delivery:** Online, shuffle options and support keyboard selection. On paper, students circle the best answer.\n")
        out.append(f"**Question:** {question}\n")
        out.append(f"**Marking key:** {key}\n")
        out.append("**Coverage:** Applies the unit concept with Year 3 vocabulary, reasoning and a visible model where useful.\n")
    return "\n".join(out)


def generic_math_items(code: str, topic: str) -> tuple[list[tuple[str, str, str]], list[tuple[str, str, str]]]:
    if code == "AC9M3A01":
        p = [
            ("Short response", "Complete the fact family for 28 + 17 = 45. Write two subtraction facts.", "45 - 28 = 17 and 45 - 17 = 28."),
            ("Multiple choice", "Which equation checks 63 - 25 = 38: 38 + 25 = 63, 63 + 25 = 38 or 38 - 25 = 63?", "38 + 25 = 63."),
            ("Matching", "Match 46 + 19, 65 - 19, 65 - 46 and 19 + 46 to 65, 46, 19 and 65.", "46 + 19 -> 65; 65 - 19 -> 46; 65 - 46 -> 19; 19 + 46 -> 65."),
            ("Short response", "Find the missing number: ___ + 34 = 82.", "48."),
            ("Short response", "Use the inverse operation to check 91 - 57 = 34.", "34 + 57 = 91."),
            ("Extended response", "Explain how a bar model can show 36 + 49 = 85 and 85 - 49 = 36.", "The whole is 85 and the parts are 36 and 49; subtracting one part leaves the other."),
            ("Short response", "Find the missing number: 120 - ___ = 75.", "45."),
            ("Extended response", "A student says subtraction has no connection to addition. Explain why this is incorrect.", "They are inverse operations; addition joins parts and subtraction separates a part from the whole."),
        ]
        e = [
            ("Short response", "Complete: 249 + ___ = 400.", "151."),
            ("Short response", "Complete: 500 - ___ = 236.", "264."),
            ("Multiple choice", "Which fact checks 712 - 348 = 364?", "348 + 364 = 712."),
            ("Matching", "Match each missing number: 56 + __ = 90; 90 - __ = 56; __ - 56 = 34; 34 + __ = 90.", "34; 34; 90; 56."),
            ("Extended response", "A shop had 325 apples and sold 178. Explain how addition can check the remaining apples.", "325 - 178 = 147, and 147 + 178 = 325."),
            ("Short response", "Write a related subtraction fact for 146 + 275 = 421.", "421 - 146 = 275 or 421 - 275 = 146."),
            ("Extended response", "Explain why the missing number in 85 + __ = 130 can be found by subtraction.", "The missing addend is a part; subtract known part from whole: 130 - 85 = 45."),
            ("Short response", "Find the missing number: ___ - 128 = 260.", "388."),
        ]
        return p, e
    if code == "AC9M3A02":
        p = [
            ("Short response", "Use 8 + 7 to solve 48 + 7.", "55."),
            ("Short response", "Use 13 - 6 to solve 83 - 6.", "77."),
            ("Matching", "Match 6 + 9, 60 + 90, 16 - 9 and 160 - 90 to 15, 150, 7 and 70.", "6+9 -> 15; 60+90 -> 150; 16-9 -> 7; 160-90 -> 70."),
            ("Multiple choice", "Which known fact helps with 57 + 8: 7 + 8, 5 + 8 or 50 + 8?", "7 + 8."),
            ("Short response", "Calculate 29 + 6 by bridging to 30.", "35."),
            ("Short response", "Calculate 42 - 7 by bridging through 40.", "35."),
            ("Extended response", "Explain how knowing 9 + 6 = 15 helps solve 190 + 60.", "The 9 tens + 6 tens pattern gives 15 tens, so 190 + 60 = 250."),
            ("Extended response", "A student says 70 + 80 = 1500 because 7 + 8 = 15. Fix the place-value error.", "70 + 80 is 15 tens, which is 150, not 1500."),
        ]
        e = [
            ("Short response", "Calculate 36 + 8.", "44."),
            ("Short response", "Calculate 91 - 7.", "84."),
            ("Multiple choice", "Best mental strategy for 58 + 9: add 10 then subtract 1, subtract 10, or double 58?", "Add 10 then subtract 1."),
            ("Matching", "Match 14 - 8, 34 - 8, 140 - 80 and 340 - 80 to 6, 26, 60 and 260.", "14-8 -> 6; 34-8 -> 26; 140-80 -> 60; 340-80 -> 260."),
            ("Extended response", "Use a known fact to solve 67 + 8 and explain.", "75; 7 + 8 = 15, so 67 + 8 bridges to 75."),
            ("Short response", "Complete: 48 + ___ = 60.", "12."),
            ("Extended response", "Why is 500 - 70 connected to 50 - 7?", "Both use the same tens pattern: 50 tens - 7 tens = 43 tens, so 430."),
            ("Short response", "Calculate 260 + 90.", "350."),
        ]
        return p, e
    if code == "AC9M3A03":
        facts = [("3 x 7", "21"), ("4 x 8", "32"), ("5 x 9", "45"), ("10 x 6", "60")]
        p = [
            ("Short response", "Calculate 3 x 8.", "24."),
            ("Short response", "Calculate 4 x 7.", "28."),
            ("Matching", "Match 3 x 7, 4 x 8, 5 x 9 and 10 x 6 to 21, 32, 45 and 60.", "; ".join(f"{a} -> {b}" for a, b in facts) + "."),
            ("Multiple choice", "Which skip-counting pattern matches 4s: 4, 8, 12, 16 or 4, 7, 10, 13?", "4, 8, 12, 16."),
            ("Short response", "Use doubling to find 4 x 6.", "24."),
            ("Short response", "What related division fact matches 5 x 8 = 40?", "40 / 5 = 8 or 40 / 8 = 5."),
            ("Extended response", "Explain how an array helps prove 3 x 9 = 27.", "Three rows of 9 or nine rows of 3 show 27 objects arranged in equal groups."),
            ("Extended response", "A student answers 4 x 9 as 49. Explain the mistake.", "They joined the digits instead of multiplying; 4 groups of 9 is 36."),
        ]
        e = [
            ("Short response", "Calculate 3 x 12.", "36."),
            ("Short response", "Calculate 40 / 4.", "10."),
            ("Multiple choice", "Which fact is missing from 5, 10, 15, 20, __?", "25."),
            ("Matching", "Match 24 / 3, 24 / 4, 30 / 5 and 70 / 10 to 8, 6, 6 and 7.", "24/3 -> 8; 24/4 -> 6; 30/5 -> 6; 70/10 -> 7."),
            ("Extended response", "Use known facts to find the total wheels on 9 cars.", "36 wheels; 9 x 4 = 36."),
            ("Short response", "How many fingers on 7 hands if each hand has 5 fingers?", "35."),
            ("Extended response", "Explain why 10 x 8 can help solve 5 x 8.", "5 groups is half of 10 groups; half of 80 is 40."),
            ("Short response", "Complete: 3 x ___ = 27.", "9."),
        ]
        return p, e
    if code.startswith("AC9M3M"):
        return measurement_items(code, topic)
    if code.startswith("AC9M3SP"):
        return space_items(code, topic)
    if code.startswith("AC9M3ST"):
        return stats_items(code, topic)
    if code.startswith("AC9M3P"):
        return chance_items(code, topic)
    return ([], [])


def measurement_items(code: str, topic: str):
    if code == "AC9M3M01":
        p = [
            ("Short response", "Choose the best metric unit for measuring a pencil length.", "Centimetres."),
            ("Multiple choice", "Which is most sensible for the distance between Canberra and Sydney: 3 m, 300 km or 300 g?", "300 km."),
            ("Matching", "Match mm, cm, m and km to: ant length, pencil length, classroom length and distance between towns.", "mm -> ant length; cm -> pencil; m -> classroom; km -> towns."),
            ("Short response", "Choose the best unit for the mass of a school bag.", "Kilograms."),
            ("Short response", "Choose the best unit for water in a drink bottle.", "Millilitres or litres."),
            ("Sequencing", "Order these units from shortest to longest: kilometre, centimetre, metre, millimetre.", "Millimetre, centimetre, metre, kilometre."),
            ("Extended response", "Explain why measuring a classroom in millimetres is not sensible.", "It would create a very large awkward number; metres are easier and suitable."),
            ("Extended response", "A student says a watermelon has a mass of 5 grams. Explain why this unit choice is unreasonable.", "A watermelon is much heavier; kilograms would be sensible."),
        ]
        e = [
            ("Short response", "Choose the best unit for the width of a fingernail.", "Millimetres."),
            ("Short response", "Choose the best unit for the capacity of a bucket.", "Litres."),
            ("Multiple choice", "Which unit measures mass: kilogram, kilometre or litre?", "Kilogram."),
            ("Matching", "Match g, kg, mL and L to: paperclip mass, child mass, spoon of medicine, jug of water.", "g -> paperclip; kg -> child; mL -> spoon of medicine; L -> jug."),
            ("Extended response", "A recipe uses 250 mL of milk. Explain why millilitres are suitable.", "Milk capacity/volume is measured in mL and 250 mL is a practical amount."),
            ("Short response", "Which unit would you use for the length of an oval?", "Metres."),
            ("Extended response", "Explain why units help people compare measurements fairly.", "The same unit gives a common scale, so numbers can be compared meaningfully."),
            ("Short response", "Choose the best unit for the distance from your desk to the door.", "Metres."),
        ]
        return p, e
    if code == "AC9M3M02":
        p = [
            ("Short response", "Which is longer: 85 cm or 1 m? Explain.", "1 m is longer because 1 m = 100 cm."),
            ("Multiple choice", "Which mass is heavier: 950 g, 1 kg or 500 g?", "1 kg."),
            ("Matching", "Match each comparison: 2 L vs 1500 mL, 40 cm vs 400 mm, 3 kg vs 2500 g, 1 m vs 75 cm.", "2 L greater; equal; 3 kg greater; 1 m greater."),
            ("Short response", "Convert 4 m to centimetres.", "400 cm."),
            ("Short response", "A bottle has 750 mL. How much more to make 1 L?", "250 mL."),
            ("Sequencing", "Order from lightest to heaviest: 500 g, 2 kg, 1200 g, 1 kg.", "500 g, 1 kg, 1200 g, 2 kg."),
            ("Extended response", "Explain why you must check units before comparing two measurements.", "Different units use different scales; convert or reason about the units first."),
            ("Extended response", "A student says 90 cm is longer than 2 m because 90 is greater than 2. Explain the error.", "2 m = 200 cm, so 2 m is longer."),
        ]
        e = [
            ("Short response", "Convert 150 cm to metres and centimetres.", "1 m 50 cm."),
            ("Short response", "Which holds more: 1250 mL or 1 L?", "1250 mL."),
            ("Multiple choice", "Which is closest to the mass of an apple: 150 g, 150 kg or 150 L?", "150 g."),
            ("Matching", "Match 1000 mL, 100 cm, 1000 g and 10 mm to 1 L, 1 m, 1 kg and 1 cm.", "1000 mL -> 1 L; 100 cm -> 1 m; 1000 g -> 1 kg; 10 mm -> 1 cm."),
            ("Extended response", "A ribbon is 2 m. You cut off 65 cm. How much remains?", "135 cm or 1 m 35 cm."),
            ("Short response", "Add 450 mL and 300 mL.", "750 mL."),
            ("Extended response", "Explain how to use a ruler accurately.", "Start at zero, align the object, read the endpoint and include the unit."),
            ("Short response", "Which is heavier: 3 kg or 2800 g?", "3 kg."),
        ]
        return p, e
    if code == "AC9M3M03":
        p = [
            ("Short response", "How many minutes are in 2 hours?", "120 minutes."),
            ("Multiple choice", "How many days are in 3 weeks: 10, 21 or 30?", "21."),
            ("Matching", "Match 60 seconds, 60 minutes, 24 hours and 7 days to 1 minute, 1 hour, 1 day and 1 week.", "60 seconds -> 1 minute; 60 minutes -> 1 hour; 24 hours -> 1 day; 7 days -> 1 week."),
            ("Short response", "How many seconds are in 3 minutes?", "180 seconds."),
            ("Short response", "A lesson starts at 9:00 and lasts 45 minutes. What time does it finish?", "9:45."),
            ("Sequencing", "Order from shortest to longest: day, minute, second, hour.", "Second, minute, hour, day."),
            ("Extended response", "Explain why 1 hour 20 minutes is not 1.20 hours in school time.", "Time uses 60 minutes per hour, not 100 minutes."),
            ("Extended response", "A student says 90 minutes is less than 1 hour because 90 is less than 100. Explain.", "1 hour is 60 minutes, so 90 minutes is 1 hour 30 minutes."),
        ]
        e = [
            ("Short response", "How many hours are in 2 days?", "48 hours."),
            ("Short response", "How many minutes are in 1 hour 15 minutes?", "75 minutes."),
            ("Multiple choice", "Which equals one week: 5 days, 7 days or 10 days?", "7 days."),
            ("Matching", "Match 180 seconds, 3 hours, 14 days and 90 minutes to 3 minutes, 180 minutes, 2 weeks and 1 hour 30 minutes.", "180 seconds -> 3 minutes; 3 hours -> 180 minutes; 14 days -> 2 weeks; 90 minutes -> 1 hour 30 minutes."),
            ("Extended response", "A movie is 1 hour 40 minutes. How many minutes is that?", "100 minutes."),
            ("Short response", "A bus trip takes 75 minutes. Write this as hours and minutes.", "1 hour 15 minutes."),
            ("Extended response", "Explain how formal time units help plan a school day.", "They let people compare durations and schedule events accurately."),
            ("Short response", "How many minutes from 10:20 to 11:00?", "40 minutes."),
        ]
        return p, e
    if code == "AC9M3M04":
        p = [
            ("Short response", "Write quarter past 4 in digital time.", "4:15."),
            ("Multiple choice", "At 6:30, where is the minute hand: on 6, on 12 or on 3?", "On 6."),
            ("Matching", "Match 2:15, 2:30, 2:45 and 3:00 to quarter past 2, half past 2, quarter to 3 and 3 o'clock.", "2:15 -> quarter past 2; 2:30 -> half past; 2:45 -> quarter to 3; 3:00 -> 3 o'clock."),
            ("Short response", "What time is 20 minutes after 7:10?", "7:30."),
            ("Short response", "What time is 15 minutes before 5:00?", "4:45."),
            ("Sequencing", "Order these times from earliest to latest: 8:45, 8:15, 9:00, 8:30.", "8:15, 8:30, 8:45, 9:00."),
            ("Extended response", "Explain why the hour hand is between 3 and 4 at 3:30.", "Half the hour has passed, so the hour hand has moved halfway toward 4."),
            ("Extended response", "A student reads 10:45 as quarter past 10. Explain the correct reading.", "10:45 is quarter to 11 because 45 minutes have passed and 15 minutes remain."),
        ]
        e = [
            ("Short response", "Write half past 9 in digital time.", "9:30."),
            ("Short response", "Write 12:45 in words.", "Quarter to 1, or 45 minutes past 12."),
            ("Multiple choice", "Which digital time matches quarter to 6: 5:45, 6:15 or 6:45?", "5:45."),
            ("Matching", "Match minute hand positions 12, 3, 6 and 9 to o'clock, quarter past, half past and quarter to.", "12 -> o'clock; 3 -> quarter past; 6 -> half past; 9 -> quarter to."),
            ("Extended response", "A train leaves at 2:35 and arrives 25 minutes later. What time does it arrive?", "3:00."),
            ("Short response", "How many minutes from 1:20 to 1:50?", "30 minutes."),
            ("Extended response", "Explain how analog and digital clocks show the same time differently.", "Analog uses hand positions; digital uses numbers for hour and minutes."),
            ("Short response", "What time is 10 minutes after 11:55?", "12:05."),
        ]
        return p, e
    if code == "AC9M3M05":
        p = [
            ("Short response", "How many right angles are in a half turn?", "2 right angles."),
            ("Multiple choice", "Which turn is a right angle: quarter turn, half turn or full turn?", "Quarter turn."),
            ("Matching", "Match quarter turn, half turn, three-quarter turn and full turn to 1, 2, 3 and 4 right angles.", "Quarter -> 1; half -> 2; three-quarter -> 3; full -> 4."),
            ("Short response", "Is an angle smaller than a right angle acute or obtuse?", "Acute."),
            ("Short response", "Is an angle larger than a right angle but smaller than a straight angle acute or obtuse?", "Obtuse."),
            ("Sequencing", "Order from smallest turn to largest: full turn, quarter turn, half turn, three-quarter turn.", "Quarter, half, three-quarter, full."),
            ("Extended response", "Explain why longer angle arms do not make a larger angle.", "The amount of opening or turn matters, not arm length."),
            ("Extended response", "A student calls a straight angle a right angle. Explain the difference.", "A right angle is a quarter turn; a straight angle is a half turn, or two right angles."),
        ]
        e = [
            ("Short response", "How many right angles are in a full turn?", "4 right angles."),
            ("Short response", "Name an object in the classroom that shows a right angle.", "Valid example such as a book corner, table corner or page corner."),
            ("Multiple choice", "A door opened halfway from closed to fully open usually shows about: no turn, quarter turn or full turn?", "Quarter turn."),
            ("Matching", "Match acute, right, obtuse and straight to smaller than 90 degrees, 90 degrees, between 90 and 180 degrees, and 180 degrees.", "Acute -> smaller; right -> 90; obtuse -> between; straight -> 180."),
            ("Extended response", "Explain how to compare two angles without measuring degrees.", "Compare the amount of opening or use a right-angle tester."),
            ("Short response", "A robot turns right by one quarter turn. How many right angles is that?", "1 right angle."),
            ("Extended response", "Why is angle a measure of turn?", "It describes how far one arm or direction turns from another."),
            ("Short response", "How many quarter turns make three-quarters of a turn?", "3 quarter turns."),
        ]
        return p, e
    if code == "AC9M3M06":
        p = [
            ("Short response", "Write $3.45 in cents.", "345 cents."),
            ("Multiple choice", "Which amount equals 205 cents: $2.05, $20.05 or $0.25?", "$2.05."),
            ("Matching", "Match $1, $2, 50c and 20c to 100c, 200c, half a dollar and one-fifth of a dollar.", "$1 -> 100c; $2 -> 200c; 50c -> half a dollar; 20c -> one-fifth of a dollar."),
            ("Short response", "How much is $4.00 - $1.35?", "$2.65."),
            ("Short response", "Add $2.75 and $3.40.", "$6.15."),
            ("Sequencing", "Order from least to greatest: $2.05, $2.50, 250c, $2.15.", "$2.05, $2.15, $2.50 and 250c are equal."),
            ("Extended response", "Explain why $3.05 must be written with a zero in the cents place.", "The zero shows 5 cents, not 50 cents."),
            ("Extended response", "A student says 375 cents is $37.50. Explain the error.", "100 cents is $1, so 375 cents is $3.75."),
        ]
        e = [
            ("Short response", "Write 640 cents in dollars.", "$6.40."),
            ("Short response", "How much change from $10 after spending $6.75?", "$3.25."),
            ("Multiple choice", "Which is the same as $1.20: 12c, 120c or 102c?", "120c."),
            ("Matching", "Match $5.00, $0.75, $3.10 and $12.05 to 500c, 75c, 310c and 1205c.", "$5.00 -> 500c; $0.75 -> 75c; $3.10 -> 310c; $12.05 -> 1205c."),
            ("Extended response", "A snack costs $2.80. You buy 3. How much is the total?", "$8.40."),
            ("Short response", "Write $7 and 9 cents using decimal notation.", "$7.09."),
            ("Extended response", "Explain how dollars and cents are connected.", "100 cents make $1; amounts can be converted by grouping cents into hundreds."),
            ("Short response", "Add $1.95 and $0.80.", "$2.75."),
        ]
        return p, e
    p = [
        ("Short response", f"Choose a sensible unit for this {topic} task: measuring a classroom doorway.", "Metres or centimetres, depending on the precision needed."),
        ("Multiple choice", f"Which answer is most sensible for {topic}: a pencil is 15 cm long, 15 m long or 15 km long?", "15 cm long."),
        ("Matching", "Match mm, cm, m and km to: ant length, pencil length, room length and distance between towns.", "mm -> ant length; cm -> pencil; m -> room; km -> towns."),
        ("Short response", "Convert 3 m to centimetres.", "300 cm."),
        ("Short response", "Which is greater: 750 mL or 1 L? Explain.", "1 L is greater because 1 L = 1000 mL."),
        ("Sequencing", "Order these from shortest to longest: 90 cm, 1 m, 120 cm, 75 cm.", "75 cm, 90 cm, 1 m, 120 cm."),
        ("Extended response", f"Explain why choosing the right unit matters when working with {topic}.", "A suitable unit makes the measurement easy to read and compare; very large or tiny units create awkward numbers."),
        ("Extended response", "A student says 2 kg is less than 900 g because 2 is less than 900. Explain the error.", "The units differ; 2 kg = 2000 g, which is greater than 900 g."),
    ]
    e = [
        ("Short response", "How many minutes are in 2 hours?", "120 minutes."),
        ("Short response", "Write $4.25 in cents.", "425 cents."),
        ("Multiple choice", "Which angle is a right angle: quarter turn, half turn or full turn?", "Quarter turn."),
        ("Matching", "Match 100 cm, 1000 mL, 60 minutes and 100 cents to 1 m, 1 L, 1 hour and $1.", "100 cm -> 1 m; 1000 mL -> 1 L; 60 minutes -> 1 hour; 100 cents -> $1."),
        ("Extended response", "A clock shows 2:45. Explain this time in words.", "Quarter to 3, or 45 minutes past 2."),
        ("Short response", "A bottle holds 600 mL. How much more is needed to make 1 L?", "400 mL."),
        ("Extended response", "Explain why arm length does not decide the size of an angle.", "The amount of turn/opening decides angle size, not how long the arms are."),
        ("Short response", "Add $3.40 and $2.75.", "$6.15."),
    ]
    return p, e


def space_items(code: str, topic: str):
    p = [
        ("Short response", f"Name one key feature you would use when working with {topic}.", "A valid feature such as faces, edges, vertices, curved surfaces, labels, symbols, directions or grid references."),
        ("Multiple choice", f"For {topic}, which object has 6 square faces: cube, sphere or cone?", "Cube."),
        ("Matching", f"For {topic}, match cube, cylinder, sphere and rectangular prism to: all curved, two circular faces, six square faces, rectangular faces.", "Sphere -> all curved; cylinder -> two circular faces; cube -> six square faces; rectangular prism -> rectangular faces."),
        ("Short response", f"For {topic}, how many vertices does a cube have?", "8 vertices."),
        ("Short response", f"For {topic}, on a map grid, what does C4 usually tell you?", "Column C and row 4, if the map uses that convention."),
        ("Sequencing", f"For {topic}, follow the path: start at the library, move north, then east, then east. Describe the final direction moved.", "East."),
        ("Extended response", f"For {topic}, explain why a map key is useful.", "It explains what symbols mean so the map can be interpreted correctly."),
        ("Extended response", f"For {topic}, a student calls a cylinder a prism. Explain why that is incorrect.", "A prism has matching polygon faces and flat side faces; a cylinder has a curved surface."),
    ]
    e = [
        ("Short response", f"For {topic}, name a 3D object with one curved surface and no vertices.", "Sphere."),
        ("Short response", f"For {topic}, name a 3D object with two circular faces.", "Cylinder."),
        ("Multiple choice", f"For {topic}, which map feature helps show north, south, east and west?", "A direction arrow or compass rose."),
        ("Matching", f"For {topic}, match face, edge, vertex and key to: flat surface, line where faces meet, corner, symbol explanation.", "Face -> flat surface; edge -> line; vertex -> corner; key -> symbol explanation."),
        ("Extended response", f"For {topic}, describe two differences between a cube and a rectangular prism.", "A cube has all square faces and equal edges; a rectangular prism may have rectangular faces and different edge lengths."),
        ("Short response", f"For {topic}, if the canteen is two squares east of the hall, which direction do you move from the hall?", "East."),
        ("Extended response", f"For {topic}, explain why a top-view plan of a classroom may not show object height.", "A top-view map shows positions from above, not vertical height."),
        ("Short response", f"For {topic}, how many faces does a rectangular prism have?", "6 faces."),
    ]
    return p, e


def stats_items(code: str, topic: str):
    p = [
        ("Short response", f"For {topic}, classify this data: favourite sport. Is it categorical or numerical?", "Categorical."),
        ("Short response", f"For {topic}, classify this data: number of books read. Is it categorical or discrete numerical?", "Discrete numerical."),
        ("Matching", f"For {topic}, match tally, table, column graph and title to: count marks, organised rows, bars for categories, graph name.", "Tally -> count marks; table -> rows; column graph -> bars; title -> graph name."),
        ("Multiple choice", f"For {topic}, which question is best for categorical data: What pet do you have, how many pets, or how tall are you?", "What pet do you have?"),
        ("Short response", f"For {topic}, a picture graph key says each picture = 2 votes. Three pictures means how many votes?", "6 votes."),
        ("Short response", f"For {topic}, in a column graph, which category has the highest column?", "The category with the tallest column."),
        ("Extended response", f"For {topic}, explain why graph labels are important.", "Labels tell what the categories and numbers mean, making the graph interpretable."),
        ("Extended response", f"For {topic}, a student concludes most people like apples after asking only two friends. Explain the problem.", "The sample is too small and may not represent the group."),
    ]
    e = [
        ("Short response", f"For {topic}, write one survey question to find how students travel to school.", "For example: How do you usually travel to school?"),
        ("Short response", f"For {topic}, if cat has 8 votes and dog has 11 votes, which category has more?", "Dog."),
        ("Multiple choice", f"For {topic}, which display best compares categories: column graph, thermometer or clock?", "Column graph."),
        ("Matching", f"For {topic}, match category, frequency, scale and conclusion to their meanings.", "Category -> group; frequency -> count; scale -> number markings; conclusion -> statement supported by data."),
        ("Extended response", f"For {topic}, a graph shows soccer 12, netball 8 and tennis 5. Write two findings.", "Soccer is most popular; tennis is least popular; soccer has 4 more than netball."),
        ("Short response", f"For {topic}, what is the total frequency for 6, 4 and 9?", "19."),
        ("Extended response", f"For {topic}, explain how to improve a messy data table.", "Add a clear title, labels, aligned rows and accurate counts."),
        ("Short response", f"For {topic}, a picture graph shows 4 symbols and each symbol equals 5 students. How many students?", "20 students."),
    ]
    return p, e


def chance_items(code: str, topic: str):
    p = [
        ("Short response", f"For {topic}, describe the chance of rolling a number from 1 to 6 on a normal die.", "Certain."),
        ("Multiple choice", f"For {topic}, what is the chance of rolling a 7 on a normal six-sided die: impossible, likely or certain?", "Impossible."),
        ("Matching", f"For {topic}, match impossible, unlikely, equally likely and certain to suitable examples.", "Examples should correctly pair chance words with events that cannot happen, probably will not happen, have the same chance, or must happen."),
        ("Short response", f"For {topic}, list all possible outcomes when flipping one coin.", "Heads and tails."),
        ("Short response", f"For {topic}, a bag has 9 red counters and 1 blue counter. Which colour is more likely?", "Red."),
        ("Sequencing", f"For {topic}, order from least likely to most likely: impossible, unlikely, likely, certain.", "Impossible, unlikely, likely, certain."),
        ("Extended response", f"For {topic}, explain why possible does not mean certain.", "Possible means it can happen; certain means it must happen."),
        ("Extended response", f"For {topic}, a coin lands heads 4 times in a row. Does that prove it will always land heads? Explain.", "No; chance results vary, especially in small numbers of trials."),
    ]
    e = [
        ("Short response", f"For {topic}, list the possible outcomes for spinning red, blue or green.", "Red, blue and green."),
        ("Short response", f"For {topic}, in 20 coin flips, heads occurs 11 times. How many tails occurred?", "9 tails."),
        ("Multiple choice", f"For {topic}, if a spinner has equal red and blue sections, red and blue are impossible, equally likely or certain?", "Equally likely."),
        ("Matching", f"For {topic}, match outcome, trial, result and frequency to meanings.", "Outcome -> possible event; trial -> one go; result -> what happened; frequency -> how many times."),
        ("Extended response", f"For {topic}, a student expected exactly 5 heads in 10 flips but got 7. Explain why this can happen.", "Expected patterns do not always appear exactly in a small experiment."),
        ("Short response", f"For {topic}, a cube has faces numbered 1 to 6. What is the chance word for rolling an even number compared with odd?", "Equally likely."),
        ("Extended response", f"For {topic}, explain why recording results helps in a chance experiment.", "It gives data to compare outcomes and describe patterns."),
        ("Short response", f"For {topic}, a spinner has 3 red sections and 1 yellow section. Which colour is less likely?", "Yellow."),
    ]
    return p, e


def render_math(code: str) -> str:
    spec = MATH_SPECS[code]
    desc = unit_description(code) or spec["topic"]
    practice = spec.get("practice")
    exam = spec.get("exam")
    if practice is None or exam is None:
        practice, exam = generic_math_items(code, spec["topic"])
    return (
        front_matter(code, "Mathematics", desc)
        + f"\n# {code} - Pass 1 question bank\n\n"
        + "## 60-second Quick Read\n\n"
        + f"- **Key idea:** {spec['rule']}\n"
        + f"- **Worked example:** {spec['example']}\n"
        + f"- **Common trap:** {spec['trap']}\n"
        + "- **Visual model:** Use arrays, number lines, clocks, maps, measuring tools, graph cards or manipulatives that match the question. Online tasks must include tap and keyboard alternatives to drag-and-drop.\n\n"
        + "## Practice questions\n\n"
        + render_questions(practice, "P")
        + "\n## Exam questions\n\n"
        + render_questions(exam, "E")
    )


def science_items(code: str, spec: dict[str, str]):
    topic = spec["topic"]
    p = [
        ("Short response", f"What is the main science idea in {topic}?", spec["concept"]),
        ("Multiple choice", f"Which vocabulary word best fits this unit: {spec['vocab'].split(', ')[0]}, perimeter or apostrophe?", spec["vocab"].split(", ")[0] + "."),
        ("Matching", f"Match four key words from this unit to their meanings: {spec['vocab']}.", "Award 1 mark for each accurate match using the unit vocabulary."),
        ("Short response", f"Give one classroom or outdoor example of {topic}.", spec["example"]),
        ("Short response", f"Write one observation you could record for {topic}.", "A relevant, observable detail that can be seen, measured or recorded."),
        ("Sequencing", f"When investigating {topic}, order these steps: record data, ask a question, make a prediction, observe or measure.", "Ask a question; make a prediction; observe or measure; record data."),
        ("Extended response", f"Explain a common mistake students make about {topic}.", spec["misconception"]),
        ("Extended response", f"Design a simple fair observation or investigation about {topic}.", "A valid plan with one clear question, observable evidence, and at least one controlled condition where relevant."),
    ]
    e = [
        ("Short response", f"State one useful piece of evidence for learning about {topic}.", "A relevant observation, measurement, comparison, table entry, labelled diagram or repeated result."),
        ("Short response", f"Why should students use precise vocabulary when explaining {topic}?", "Precise vocabulary makes the explanation clear and scientifically accurate."),
        ("Multiple choice", f"For {topic}, which answer is strongest science evidence: a careful measurement, a guess, or what a friend likes?", "A careful measurement."),
        ("Matching", f"For {topic}, match question, prediction, evidence and conclusion to their roles in an investigation.", "Question -> what is being investigated; prediction -> expected result; evidence -> data/observations; conclusion -> answer supported by evidence."),
        ("Extended response", f"Use this example to explain the concept: {spec['example']}", "Award marks for linking the example to the key concept and using correct vocabulary."),
        ("Short response", f"Name one tool or representation that could help communicate this science idea about {topic}.", "A suitable answer such as table, column graph, labelled diagram, photograph, thermometer, hand lens or poster."),
        ("Extended response", f"During a {topic} investigation, a group changed two things at once and made a strong conclusion. Explain the problem.", "Changing two things makes the evidence unclear because students cannot tell which change affected the result."),
        ("Extended response", f"Write a conclusion sentence about {topic} that is supported by evidence.", "A valid conclusion that refers to evidence and avoids unsupported claims."),
    ]
    return p, e


def render_science(code: str) -> str:
    spec = SCIENCE_SPECS[code]
    desc = unit_description(code) or spec["topic"]
    practice, exam = science_items(code, spec)
    return (
        front_matter(code, "Science", desc)
        + f"\n# {code} - Pass 1 question bank\n\n"
        + "## 60-second Quick Read\n\n"
        + f"- **Concept answer:** {spec['concept']}\n"
        + f"- **Key vocabulary:** {spec['vocab']}.\n"
        + f"- **Example:** {spec['example']}\n"
        + f"- **Common misconception:** {spec['misconception']}\n"
        + "- **Visual model:** Use real objects, labelled diagrams, simple data tables, photos or short investigation cards. Drag tasks must also work with tap and keyboard controls.\n\n"
        + "## Practice questions\n\n"
        + render_questions(practice, "P")
        + "\n## Exam questions\n\n"
        + render_questions(exam, "E")
    )


def write_bank(subject_dir: str, code: str, content: str) -> None:
    path = BANK_ROOT / subject_dir / code.lower() / "batch-1.md"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n")


def main() -> None:
    for code in MATH_CODES:
        write_bank("mathematics", code, render_math(code))
    for code in SCIENCE_CODES:
        write_bank("science", code, render_science(code))
    print(f"Wrote {len(MATH_CODES)} Maths banks and {len(SCIENCE_CODES)} Science banks.")


if __name__ == "__main__":
    main()
