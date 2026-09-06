#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets/assessment-banks/year2/math"
VERSION = "20260906-year2-maths-ixl-review-2"
REVIEW_DOC = "docs/question-bank-reviews/2026-09-06-year2-maths-n04-n06.md"

def q(skill, question, correct, wrong1, wrong2, summary, hint):
    return {"skill": skill, "question": question, "choices": [correct, wrong1, wrong2], "summary": summary, "hint": hint}

def adult(skill, question, model, note, instructions):
    return {"skill": skill, "question": question, "choices": ["Completed response", "Needs revision", "Not attempted"],
            "summary": model, "hint": note, "grading_mode": "adult-review", "model_answer": model,
            "acceptance_note": note, "response_instructions": instructions, "completion_label": "Ready for adult review"}

def build(code, practice, test):
    assert len(practice) == 24 and len(test) == 16, (code, len(practice), len(test))
    rows = []
    for bank, specs in (("practice", practice), ("test", test)):
        for i, spec in enumerate(specs, 1):
            correct_index = (i - 1) % 3
            choices = list(spec["choices"])
            correct = choices.pop(0)
            choices.insert(correct_index, correct)
            label = "P" if bank == "practice" else "T"
            row = {
                "id": f"{code}-{label}-{i:03d}", "subject": "math", "year_level": "Year 2",
                "curriculum_code": code, "bank": bank, "skill": spec["skill"],
                "visual": {"type": "none", "alt_text": ""}, "question": spec["question"],
                "audio_prompt": spec["question"],
                "answers": [{"text": text, "is_correct": j == correct_index} for j, text in enumerate(choices)],
                "correct_index": correct_index, "explanation": {"summary": spec["summary"], "hint": spec["hint"]},
                "difficulty": 1 + min(2, (i - 1) // 8),
                "difficulty_tier": ("recognise", "apply", "reason")[(i - 1) // 8 if bank == "practice" else min(2, (i - 1) // 6)],
                "sequence_priority": i,
                "review": {"version": VERSION, "status": "editorially-reviewed",
                    "ixl_reference_url": "https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-2",
                    "evidence_scope": f"All mapped IXL skill pages, live prompts and worked examples were inspected sequentially; coverage and limitations are recorded in {REVIEW_DOC}. No IXL wording or media was copied."}
            }
            for key in ("grading_mode", "model_answer", "acceptance_note", "response_instructions", "completion_label"):
                if key in spec: row[key] = spec[key]
            rows.append(row)
    (OUT / f"{code.lower()}.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n")

N04_P = [
q("add_facts", "What is 8 + 7?", "15", "14", "16", "Start at 8 and count on 7, or make 10: 8 + 2 + 5 = 15.", "Try making 10 first."),
q("sort_addition_facts", "Which sum belongs in the ‘equal to 12’ group?", "5 + 7", "4 + 7", "6 + 7", "5 + 7 equals 12; the other sums are 11 and 13.", "Calculate each sum before sorting."),
q("missing_addend", "Complete the number sentence: 9 + ___ = 16.", "7", "6", "8", "The missing part is 7 because 9 + 7 = 16.", "Count on from 9 to 16."),
q("true_equation", "Which number sentence is true?", "6 + 8 = 14", "6 + 7 = 14", "8 + 8 = 14", "Six and eight make 14.", "Check both sides of each sentence."),
q("add_several_numbers", "Find 6 + 3 + 7.", "16", "15", "17", "Combine 3 + 7 to make 10, then add 6 to get 16.", "Look for a pair that makes 10."),
q("subtract_within_20", "What is 17 − 9?", "8", "7", "9", "Count on from 9 to 17: the difference is 8.", "Use addition to check the difference."),
q("missing_subtrahend", "Complete the number sentence: 15 − ___ = 8.", "7", "6", "8", "Fifteen minus 7 leaves 8.", "Ask what must be taken from 15 to leave 8."),
q("part_part_whole", "A whole is 18 and one part is 11. What is the other part?", "7", "29", "6", "The missing part is 18 − 11 = 7.", "Subtract the known part from the whole."),
q("hundred_chart_add_tens", "On a hundred chart, start at 24 and move down 5 rows. Where do you land?", "74", "29", "64", "Each row down adds 10, so five rows add 50: 24 + 50 = 74.", "A vertical move changes the number by 10."),
q("hundred_chart_add_ones", "Start at 58 on a hundred chart and count on 6 spaces. What number do you reach?", "64", "63", "68", "Counting on six from 58 gives 59, 60, 61, 62, 63, 64.", "Cross into the next row carefully."),
q("add_model_no_regroup", "A base-ten model has 3 tens and 4 ones, then 2 tens and 3 ones are added. What total does it show?", "57", "55", "67", "Five tens and seven ones make 57.", "Combine tens with tens and ones with ones."),
q("add_model_regroup", "A model combines 4 tens 6 ones with 2 tens 7 ones. After regrouping 10 ones, what is the total?", "73", "63", "713", "Six tens and 13 ones regroup as 7 tens and 3 ones: 73.", "Trade 10 ones for 1 ten."),
q("number_line_add", "A number line starts at 36, makes four +10 jumps and then three +1 jumps. Where does it finish?", "79", "73", "83", "36 + 40 + 3 = 79.", "Add the tens jumps before the ones jumps."),
q("partition_to_add", "Which calculation correctly partitions 27 + 35?", "20 + 30 + 7 + 5", "20 + 3 + 7 + 5", "27 + 3 + 5", "Twenty-seven is 20 + 7 and 35 is 30 + 5.", "Split both numbers into tens and ones."),
q("make_friendly_number", "Use a friendly number to solve 48 + 7. Which step is helpful first?", "48 + 2 = 50", "48 + 7 = 57", "7 + 2 = 9", "Move 2 from the 7 to make 50, then add the remaining 5.", "Ask how much 48 needs to reach 50."),
q("compensation_add", "Which equivalent calculation makes 39 + 26 easier?", "40 + 26 − 1", "40 + 26 + 1", "30 + 26 − 9", "Replacing 39 with 40 adds one extra, so subtract 1 afterwards.", "Compensate for the extra one."),
q("place_value_add", "Use place value to find 46 + 38.", "84", "74", "814", "Four tens plus 3 tens is 7 tens; 6 ones plus 8 ones is 14 ones, making 84.", "Regroup 14 ones as 1 ten and 4 ones."),
q("multiple_addends", "A class counts 18 red counters, 24 blue counters and 7 yellow counters. How many counters are there?", "49", "42", "59", "18 + 24 = 42, and 42 + 7 = 49.", "Combine two amounts, then add the third."),
q("number_line_subtract", "A number line starts at 83, makes five −10 jumps and then six −1 jumps. Where does it finish?", "27", "33", "37", "83 − 50 − 6 = 27.", "Subtract the tens, then the ones."),
q("partition_to_subtract", "Which calculation correctly breaks apart 64 − 28?", "64 − 20 − 8", "64 − 2 − 8", "64 − 28 − 20", "Twenty-eight is 20 + 8, so subtract both parts.", "Partition the number being subtracted."),
q("compensation_subtract", "Which calculation is equivalent to 72 − 29?", "72 − 30 + 1", "72 − 30 − 1", "72 − 20 + 9", "Subtracting 30 removes one too many, so add 1 back.", "Compensate for the extra one removed."),
q("count_on_to_subtract", "To find 81 − 56 by counting on, which jumps reach 81 from 56?", "+4, +20, +1", "+5, +20, +1", "+4, +10, +1", "56 + 4 = 60, +20 = 80, +1 = 81; the jumps total 25.", "Count to a friendly ten, then to the target."),
q("fact_family", "If 34 + 27 = 61, which related subtraction sentence must also be true?", "61 − 27 = 34", "61 − 34 = 27 + 1", "34 − 27 = 61", "The whole 61 minus one part 27 leaves the other part 34.", "Keep the same whole and two parts."),
q("diagnose_strategy", "Sam solves 58 + 26 as 50 + 20 + 8 + 6 = 714. What did Sam forget?", "Regroup 14 ones as 1 ten and 4 ones", "Subtract the 6 ones", "Change 58 to 85", "Seventy plus 14 is 84, not 714; 14 ones must be regrouped.", "The digits 7 and 14 cannot be placed side by side."),
]

N04_T = [
q("add_facts", "Find 9 + 6.", "15", "14", "16", "Make 10 with 9 + 1, then add the remaining 5 to get 15.", "Partition 6 into 1 and 5."),
q("missing_addend", "Complete: ___ + 8 = 19.", "11", "10", "12", "Eleven plus 8 equals 19.", "Use 19 − 8."),
q("subtract_within_20", "Find 16 − 7.", "9", "8", "10", "Sixteen minus 7 leaves 9.", "Check that 9 + 7 = 16."),
q("true_mixed_equation", "Which equation is true?", "13 = 18 − 5", "13 + 5 = 17", "18 − 4 = 13", "Eighteen minus 5 equals 13.", "Evaluate each side."),
q("hundred_chart", "Start at 37 on a hundred chart. Move down 4 rows and right 2 spaces. Where do you finish?", "79", "75", "97", "Four rows add 40 and two spaces add 2: 37 + 42 = 79.", "Rows are tens; spaces are ones."),
q("add_model_regroup", "A model shows 5 tens 8 ones plus 2 tens 6 ones. What total is represented after regrouping?", "84", "74", "814", "Seven tens and 14 ones regroup as 8 tens and 4 ones.", "Trade 10 ones for a ten."),
q("number_line_add", "From 47, a number line makes +30, +5 and +2. What addition is represented?", "47 + 37 = 84", "47 + 35 = 82", "47 + 32 = 79", "The jumps total 37, and 47 + 37 = 84.", "Add the jump labels."),
q("partition_add", "Find 36 + 49 by partitioning 49 to make a friendly number.", "85", "75", "95", "Split 49 into 4 and 45: 36 + 4 = 40, then 40 + 45 = 85.", "First make 40."),
q("compensation_add", "Ninety-nine stickers and 28 stickers are combined. Which strategy gives the total efficiently?", "100 + 28 − 1 = 127", "100 + 28 + 1 = 129", "90 + 28 − 9 = 109", "Round 99 up to 100, then remove the extra one.", "Compensate after rounding."),
q("number_line_subtract", "From 92, make −40, −7 and −3 jumps. Where do you land?", "42", "52", "32", "The jumps subtract 50 altogether: 92 − 50 = 42.", "Combine the subtraction jumps."),
q("regroup_subtraction", "Find 63 − 27 using place value.", "36", "46", "44", "Regroup 63 as 5 tens and 13 ones; subtract 2 tens and 7 ones to get 36.", "Regroup one ten before subtracting ones."),
q("compensation_subtract", "Find 85 − 38 using compensation.", "47", "46", "57", "85 − 40 = 45; add 2 back because 40 is 2 more than 38, giving 47.", "Subtract 40, then compensate."),
q("missing_part", "A whole is 73. One part is 46. What is the missing part?", "27", "37", "119", "73 − 46 = 27, and 46 + 27 = 73.", "Subtract the known part."),
q("fact_family", "Which pair belongs to the same fact family as 28 + 35 = 63?", "63 − 28 = 35 and 63 − 35 = 28", "63 + 28 = 91 and 35 − 28 = 7", "35 + 63 = 98 and 63 − 7 = 56", "A fact family uses the same two parts, 28 and 35, and whole, 63.", "The whole begins both subtraction facts."),
q("choose_strategy", "Which strategy is most efficient for 54 + 19?", "Add 20, then subtract 1", "Add 10, then subtract 9", "Subtract 20, then add 1", "Nineteen is one less than 20, so 54 + 20 − 1 = 73.", "Use a nearby friendly number."),
q("diagnose_equation", "A student writes 76 − 29 = 76 − 30 − 1. What correction is needed?", "Change the final −1 to +1", "Change 30 to 20", "No correction is needed", "Subtracting 30 removes one too many, so one must be added back.", "Compensation reverses the extra subtraction."),
]

N05_P = [
q("identify_equal_groups", "Which description has equal groups?", "Four bags with 3 counters in every bag", "Four bags holding 2, 3, 3 and 4 counters", "Three bags with 4 counters altogether", "Multiplication requires every group to contain the same number.", "Check each group, not just the total."),
q("repeated_addition", "Which repeated addition represents 4 equal groups of 3?", "3 + 3 + 3 + 3", "4 + 4 + 4", "4 + 3", "Four groups of 3 means add 3 four times.", "The number of addends is the number of groups."),
q("count_equal_groups", "There are 5 plates with 2 strawberries on each. How many strawberries are there?", "10", "7", "25", "Five equal groups of 2 make 2 + 2 + 2 + 2 + 2 = 10.", "Skip-count by twos five times."),
q("array_repeated_addition", "An array has 3 rows with 4 dots in each row. Which addition sentence matches it?", "4 + 4 + 4 = 12", "3 + 3 + 3 + 3 + 3 = 15", "3 + 4 = 7", "Each of the 3 rows contributes 4 dots.", "Add the number in each row once per row."),
q("multiplication_sentence", "Complete the sentence for 6 groups of 2: ___ × 2 = 12.", "6", "10", "14", "Six groups of 2 contain 12 altogether, so 6 × 2 = 12.", "The first factor counts the groups."),
q("read_array", "An array has 2 rows and 7 objects in each row. Which multiplication expression describes it?", "2 × 7", "2 + 7", "7 − 2", "Two rows of 7 are represented by 2 × 7.", "Write rows × objects in each row."),
q("make_array", "Which array instruction models 4 × 5?", "Make 4 rows with 5 counters in each row", "Make 4 rows with 4 counters altogether", "Make 5 unequal rows", "Four times 5 means 4 equal rows of 5.", "The first factor can count rows."),
q("partition_multiplication", "To find 6 groups of 4, Ava finds 5 groups of 4 and then one more group of 4. What is the total?", "24", "20", "28", "Five groups of 4 make 20; one more group makes 24.", "Partition 6 groups into 5 groups and 1 group."),
q("division_sharing", "Share 18 counters equally among 3 children. How many counters does each child receive?", "6", "5", "15", "Eighteen shared into 3 equal groups gives 6 in each group.", "Deal one counter to each group repeatedly."),
q("division_grouping", "Pack 20 pencils with 5 pencils in each bundle. How many bundles are made?", "4", "5", "15", "Twenty contains four groups of 5.", "Count groups of 5 until reaching 20."),
q("division_sentence", "Twelve counters are arranged in 3 equal rows. Which division sentence finds the number in each row?", "12 ÷ 3 = 4", "12 ÷ 4 = 3 rows", "3 ÷ 12 = 4", "Divide the total 12 by the 3 rows to get 4 in each row.", "Start division with the total."),
q("array_division", "Which instruction models 15 ÷ 5 with an array?", "Arrange 15 dots in rows of 5 and count the rows", "Draw 15 rows of 5 dots", "Draw 5 dots and remove all of them", "Rows of 5 show how many groups of 5 fit into 15.", "Use 15 dots altogether."),
q("relate_addition_multiplication", "Which multiplication sentence matches 6 + 6 + 6?", "3 × 6 = 18", "6 × 6 = 36", "3 × 3 = 9", "There are 3 equal addends of 6, so 3 × 6 = 18.", "Count the addends, then identify their size."),
q("relate_multiplication_division", "If 4 × 5 = 20, which division fact is related?", "20 ÷ 5 = 4", "20 ÷ 4 = 6", "5 ÷ 4 = 20", "The total 20 divided into groups of 5 makes 4 groups.", "Use the same three numbers."),
q("rotation_of_array", "One array has 3 rows of 6. It is turned to show 6 rows of 3. What stays the same?", "The total of 18 objects", "The number of rows", "The number in each row", "Turning the array swaps rows and columns but keeps all 18 objects.", "No objects are added or removed."),
q("unequal_group_misconception", "A model has groups of 4, 4 and 5 counters. Why can’t 3 × 4 describe the whole model?", "The third group is not equal to the others", "There are too many groups", "Four cannot be multiplied", "Three times 4 requires all three groups to contain exactly 4.", "Compare the size of every group."),
q("find_unknown_groups", "Complete: ___ groups of 3 make 21.", "7", "6", "18", "Seven groups of 3 make 21 because 7 × 3 = 21.", "Skip-count by threes to 21."),
q("find_unknown_group_size", "Five equal groups contain 20 objects altogether. How many are in each group?", "4", "5", "15", "20 ÷ 5 = 4, so each group contains 4.", "Share the total across the five groups."),
q("partition_array", "An array has 7 rows of 3. Split it into 5 rows and 2 rows. Which calculation gives the total?", "15 + 6 = 21", "5 + 2 = 7", "15 + 2 = 17", "Five rows of 3 make 15 and two rows of 3 make 6; together they make 21.", "Keep 3 objects in every row."),
q("choose_representation", "Which representation best shows 4 bags with 6 oranges in each bag?", "Four equal groups of 6 counters", "One group of 10 counters", "Groups containing 4, 5, 6 and 7 counters", "Four equal groups of 6 preserve both quantities in the story.", "Model the groups and the amount in each."),
q("division_relationship", "Use 8 × 3 = 24 to find 24 ÷ 8.", "3", "8", "21", "Because 8 groups of 3 make 24, dividing 24 by 8 gives 3.", "Ask what multiplies by 8 to make 24."),
q("compare_models", "Which two models have the same total?", "3 groups of 4 and 2 groups of 6", "4 groups of 4 and 3 groups of 5", "5 groups of 2 and 4 groups of 3", "Both 3 × 4 and 2 × 6 equal 12.", "Calculate each model’s total."),
q("reason_about_division", "Twenty-four tiles make 6 equal rows. A student says there are 5 tiles in each row. What shows the error?", "6 × 5 is 30, not 24", "24 − 6 is 18", "There must be 6 tiles in every row", "If each row had 5, six rows would contain 30; the correct row size is 4.", "Multiply the proposed row size by the row count."),
q("complete_relationship", "Complete both facts: 5 × ___ = 30 and 30 ÷ 5 = ___.", "6 and 6", "5 and 6", "6 and 5", "Five groups of 6 make 30, so 30 divided by 5 is 6.", "The same unknown appears in the related facts."),
]

N05_T = [
q("repeated_addition", "Which addition sentence represents 5 groups of 4?", "4 + 4 + 4 + 4 + 4", "5 + 5 + 5 + 5", "5 + 4", "Five equal groups of 4 require five addends of 4.", "Count groups, then write each group size."),
q("equal_groups_total", "Seven baskets hold 3 balls each. How many balls are there?", "21", "10", "73", "Seven groups of 3 make 21.", "Skip-count by threes seven times."),
q("array_expression", "An array has 4 rows with 6 squares in each row. Which expression matches it?", "4 × 6", "4 + 6", "6 − 4", "Rows × squares per row gives 4 × 6.", "Keep rows and row size distinct."),
q("make_array", "Which array can model 18 ÷ 3?", "18 objects arranged in 3 equal rows", "18 rows with 3 objects in each", "3 objects arranged unevenly", "Dividing 18 into 3 equal rows finds the number in each row.", "The array must contain 18 objects total."),
q("sharing_division", "Twenty-eight cards are shared equally among 7 players. How many cards does each player receive?", "4", "7", "21", "28 ÷ 7 = 4.", "Use the related fact 7 × 4 = 28."),
q("grouping_division", "A baker packs 24 rolls, 6 per tray. How many trays are filled?", "4", "6", "18", "Four groups of 6 use all 24 rolls.", "Count groups of six."),
q("relate_addition_multiplication", "Which pair describes the same equal-group model?", "5 + 5 + 5 and 3 × 5", "3 + 3 + 3 and 3 × 5", "5 + 3 and 5 × 3", "Three addends of 5 are three groups of 5.", "Match the number of groups and group size."),
q("relate_multiplication_division", "If 6 × 4 = 24, what is 24 ÷ 4?", "6", "4", "20", "Twenty-four divided into groups of 4 makes 6 groups.", "Use the related multiplication fact."),
q("partition_strategy", "Which partition correctly finds 8 groups of 5?", "5 groups of 5 plus 3 groups of 5", "8 groups plus 5 groups", "5 groups of 8 plus 3", "Five groups of 5 make 25 and three groups make 15; together they make 40.", "Split only the number of groups."),
q("unknown_factor", "Complete: ___ × 4 = 28.", "7", "6", "8", "Seven groups of 4 make 28.", "Count by fours to 28."),
q("unknown_divisor_result", "Thirty objects are placed into 5 equal groups. Complete 30 ÷ 5 = ___.", "6", "5", "25", "Each of the five groups receives 6 objects.", "Check with 5 × 6."),
q("array_rotation", "Why do 2 × 9 and 9 × 2 have the same total?", "They describe the same 18-object array turned around", "Both have 9 rows", "Addition and division are identical", "Turning a 2-by-9 array makes a 9-by-2 array without changing the total.", "Imagine swapping rows and columns."),
q("unequal_groups", "Three boxes contain 5, 5 and 4 pencils. Which statement is accurate?", "The boxes are not three equal groups of 5", "The total is 3 × 5", "Each box contains 14 pencils", "One box has only 4, so 3 × 5 would count one extra pencil.", "Check every group’s size."),
q("inverse_reasoning", "A student knows 9 × 3 = 27. Which question can that fact solve directly?", "How many groups of 3 are in 27?", "How many are left after 3 is taken from 27?", "What is 27 + 9?", "The fact shows that 27 contains 9 groups of 3.", "Look for the matching division relationship."),
q("compare_strategies", "For 6 × 4, which strategy keeps equal groups visible?", "Add 4 six times or split into 5 × 4 and 1 × 4", "Add 6 and 4 once", "Make groups of 4, 4, 4, 4, 4 and 5", "Both valid methods preserve six equal groups of 4.", "The group size must remain 4."),
q("reason_from_remainder", "Seventeen counters are put into groups of 4. Which conclusion is correct?", "Four full groups can be made, with 1 counter left", "Five equal groups of 4 can be made", "Four groups contain 17 counters each", "Four groups use 16 counters, leaving 1; 17 cannot form only complete groups of 4.", "Find the largest multiple of 4 not above 17."),
]

N06_P = [
q("choose_addition_model", "The library has 26 picture books and receives 18 more. Which number sentence models the new total?", "26 + 18 = ?", "26 − 18 = ?", "26 × 18 = ?", "The collections join, so addition represents the situation.", "Look for language showing an amount is added."),
q("choose_subtraction_model", "There are 43 seedlings. Twelve are planted. Which number sentence finds how many remain?", "43 − 12 = ?", "43 + 12 = ?", "12 − 43 = ?", "The planted seedlings leave the starting group, so subtract 12 from 43.", "Start with the whole amount."),
q("choose_multiplication_model", "Five trays hold 4 muffins each. Which representation finds the total?", "4 + 4 + 4 + 4 + 4", "5 + 4", "5 − 4", "Five equal groups of 4 are represented by adding 4 five times.", "Represent every tray."),
q("choose_division_model", "Share 20 markers equally among 5 tables. Which calculation finds the amount per table?", "20 ÷ 5", "20 − 5", "20 + 5", "Equal sharing into five groups is division.", "Divide the total by the number of groups."),
q("money_total", "A puzzle costs $7 and a skipping rope costs $5. How much do they cost altogether?", "$12", "$2", "$35", "The total cost is $7 + $5 = $12.", "Add the two prices."),
q("money_change", "A book costs $13. You pay with a $20 note. How much change should you receive?", "$7", "$33", "$6", "Change is the amount left: $20 − $13 = $7.", "Subtract the cost from the amount paid."),
q("money_equal_items", "Three identical pencils cost $4 each. What is the total cost?", "$12", "$7", "$1", "Three equal costs of $4 make $4 + $4 + $4 = $12.", "Add $4 once for each pencil."),
q("money_sharing", "Four friends share a $20 game fee equally. How much does each friend pay?", "$5", "$4", "$16", "$20 shared into 4 equal parts gives $5 each.", "Use 4 × $5 = $20 to check."),
q("select_model", "A class had 35 glue sticks, used some, and has 19 left. Which part–part–whole model is useful?", "35 is the whole; the used amount and 19 are the parts", "19 is the whole; 35 is one part", "35 and 19 are both missing parts", "The starting 35 splits into the used sticks and the 19 remaining sticks.", "Identify the starting whole."),
q("solve_missing_start", "Some birds were in a tree. Six more arrived, making 21 birds. How many were there at first?", "15", "27", "14", "The missing start is 21 − 6 = 15.", "Undo the increase."),
q("comparison_problem", "Nora collected 32 shells and Eli collected 18. How many more shells did Nora collect?", "14", "50", "24", "The difference is 32 − 18 = 14.", "Comparison asks for the gap between amounts."),
q("two_step_add_subtract", "A tub has 18 blue blocks and 15 green blocks. Seven blocks are removed. How many remain?", "26", "40", "20", "First 18 + 15 = 33 blocks; then 33 − 7 = 26.", "Find the starting total before removing blocks."),
q("two_step_multiplicative", "Four packets hold 5 cards each. Three extra cards are added. How many cards are there now?", "23", "20", "12", "Four groups of 5 make 20, then 3 more make 23.", "Solve the equal groups before adding extras."),
q("interpret_solution", "A calculation gives 24 ÷ 6 = 4 for 24 biscuits shared among 6 children. What does the 4 mean?", "Each child receives 4 biscuits", "There are 4 children", "Four biscuits are left over", "The quotient describes the number in each of the six equal shares.", "Link the answer to what the question asks."),
q("check_reasonableness", "A student says 6 bags with 3 oranges each contain 63 oranges. What is the best check?", "Six groups of 3 make 18, so 63 is not reasonable", "Add 6 + 3 to get 9", "The answer is reasonable because it uses both digits", "Repeated addition gives 3 + 3 + 3 + 3 + 3 + 3 = 18.", "Model the equal groups."),
q("insufficient_information", "A toy costs some dollars. You pay with $20. Can the change be calculated?", "No; the toy’s price is needed", "Yes; the change is always $20", "Yes; the change is $0", "Change depends on both the amount paid and the item’s price.", "Check that every required quantity is known."),
q("choose_strategy", "To find 39 + 17 in a shopping total, which efficient strategy works?", "Add 20, then subtract 3", "Subtract 20, then add 3", "Multiply 39 by 17", "Seventeen is 3 less than 20, so 39 + 20 − 3 = 56.", "Use a nearby friendly number."),
q("represent_remainder", "Seventeen apples are packed 4 per bag. How should the result be communicated?", "Four full bags and 1 apple left", "Five full bags", "Four apples in 17 bags", "Four bags use 16 apples, leaving one unpacked.", "Interpret the leftover in the situation."),
adult("communicate_additive_solution", "Write a number sentence and one complete answer sentence: A stall sold 28 apples in the morning and 17 in the afternoon. How many apples were sold?", "28 + 17 = 45. The stall sold 45 apples altogether.", "Accept an equivalent correct strategy and a sentence that identifies 45 as apples sold altogether.", "Show the calculation, then state what 45 means."),
adult("communicate_money_solution", "Explain how to find the change when a $16 item is paid for with $25.", "$25 − $16 = $9, so the customer receives $9 change.", "Accept a correct model or strategy if the response names the $9 as change.", "Include a calculation and interpret the answer in the shopping situation."),
adult("create_multiplicative_model", "Draw or describe a model for 6 boxes with 4 crayons in each, then state the total.", "A valid model shows 6 equal groups of 4 and a total of 24 crayons, such as 4 + 4 + 4 + 4 + 4 + 4 = 24.", "The groups must be equal and the response must identify 24 crayons altogether.", "Use equal groups, an array or repeated addition, then write an answer sentence."),
q("compare_models", "A story says 24 stickers are shared equally among 4 children. Which model does not fit?", "Four groups containing 5, 6, 6 and 7 stickers", "Four equal groups of 6 stickers", "An array with 4 rows of 6", "Unequal groups do not represent equal sharing.", "The four shares must have the same size."),
q("revise_operation_choice", "A student adds 36 + 14 for a story where 14 of 36 tickets were used. Which correction is needed?", "Use 36 − 14 because tickets were removed", "Use 14 − 36 because 14 is mentioned second", "Keep addition because every story uses addition", "The situation separates 14 from the starting 36, so subtraction matches it.", "Decide whether quantities join or separate."),
q("reason_about_context", "Five teams need 3 bibs each, but only 12 bibs are available. What does the calculation show?", "Three more bibs are needed", "There are 15 bibs left", "Each team gets 12 bibs", "Five groups of 3 require 15 bibs; 15 − 12 = 3 more are needed.", "Compare the required total with the available amount."),
]

N06_T = [
q("model_addition", "A garden has 27 tomato plants and 16 bean plants. Which equation finds the total number of plants?", "27 + 16 = ?", "27 − 16 = ?", "27 × 16 = ?", "The two groups are combined, so addition models the total.", "Look for ‘total’ of joined groups."),
q("model_subtraction", "Fifty tickets were printed and 18 were sold. How many remain?", "32", "68", "28", "Fifty minus 18 leaves 32 tickets.", "Subtract the sold tickets from the starting number."),
q("model_equal_groups", "Seven racks hold 4 helmets each. How many helmets are there?", "28", "11", "74", "Seven equal groups of 4 make 28.", "Use repeated addition or multiplication."),
q("model_sharing", "Thirty cards are shared equally among 5 players. How many cards does each player receive?", "6", "5", "25", "Thirty divided by 5 gives 6 cards each.", "Check with 5 × 6."),
q("money_total", "A ball costs $9 and a book costs $14. What is the total cost?", "$23", "$5", "$126", "$9 + $14 = $23.", "Add the prices."),
q("money_change", "You buy a $17 puzzle with a $30 payment. What change should you receive?", "$13", "$47", "$12", "$30 − $17 = $13 change.", "Subtract the price from the payment."),
q("money_multiplication", "Four museum tickets cost $6 each. What is the total cost?", "$24", "$10", "$2", "Four equal costs of $6 make $24.", "Add $6 four times."),
q("missing_part", "After 19 students leave, 34 remain at assembly. How many students were there before anyone left?", "53", "15", "45", "The starting whole is 19 + 34 = 53.", "Join the part that left and the part that remained."),
q("comparison", "A team scored 46 points and another scored 29. What was the difference?", "17 points", "75 points", "27 points", "46 − 29 = 17, so the scores differ by 17 points.", "Find the gap, not the total."),
q("two_step", "A shelf holds 23 fiction books and 18 information books. Nine are borrowed. How many remain?", "32", "50", "14", "There are 41 books first; 41 − 9 = 32 remain.", "Combine before subtracting."),
q("choose_representation", "For 5 packets of 6 seeds and 2 loose seeds, which representation matches?", "5 × 6 + 2", "5 + 6 + 2", "5 × 8", "Five equal groups of 6 make 30, then 2 loose seeds are added.", "Keep the packets and loose seeds distinct."),
q("interpret_quotient", "The calculation 21 ÷ 3 = 7 solves a sharing problem. Which answer sentence is complete?", "Each of the 3 groups receives 7 items", "There are 7 groups of 21", "Three items are left", "The quotient 7 is the amount in each of three equal shares.", "Name what the 7 represents."),
adult("communicate_two_step", "Show and explain how to solve: Three boxes contain 8 candles each. Five candles are used. How many remain?", "3 × 8 = 24, then 24 − 5 = 19. There are 19 candles remaining.", "Accept repeated addition instead of multiplication; both steps and the meaning of 19 must be clear.", "Represent both steps and finish with an answer sentence."),
adult("communicate_money", "A customer has $40 and buys two games costing $13 each. Model the transaction and state the money left.", "2 × $13 = $26, then $40 − $26 = $14. The customer has $14 left.", "Accept $13 + $13 for the equal costs; the final $14 must be interpreted as money left.", "Show the purchase total and the remaining-money calculation."),
q("evaluate_model", "For 18 muffins shared among 4 plates, a model shows 4 equal groups of 4 and 2 muffins left. Is the model valid?", "Yes; it accounts for all 18 muffins", "No; division situations cannot have leftovers", "No; each plate must hold 18 muffins", "Four groups of 4 use 16 muffins and leave 2, accounting for all 18.", "Check the grouped and leftover amounts total 18."),
q("diagnose_modelling_error", "A student solves ‘6 bags with 5 marbles each’ using 6 + 5 = 11. What should replace that model?", "5 + 5 + 5 + 5 + 5 + 5 = 30", "6 − 5 = 1", "6 + 5 + 30 = 41", "The story has six equal groups of 5, so repeated addition gives 30.", "Represent all six bags."),
]

build("AC9M2N04", N04_P, N04_T)
build("AC9M2N05", N05_P, N05_T)
build("AC9M2N06", N06_P, N06_T)
print("Built AC9M2N04-06: 24 Practice + 16 Test each")
