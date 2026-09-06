#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets/assessment-banks/year2/math"
VERSION = "20260906-year2-maths-ixl-review-3"
REVIEW_DOC = "docs/question-bank-reviews/2026-09-06-year2-maths-a01-a03.md"

def q(skill, stem, correct, wrong1, wrong2, explanation, hint):
    return dict(skill=skill, question=stem, choices=[correct, wrong1, wrong2], summary=explanation, hint=hint)

def adult(skill, stem, model, note, instructions):
    return dict(skill=skill, question=stem, choices=["Completed response", "Needs revision", "Not attempted"],
        summary=model, hint=note, grading_mode="adult-review", model_answer=model,
        acceptance_note=note, response_instructions=instructions, completion_label="Ready for adult review")

def build(code, practice, test):
    assert (len(practice), len(test)) == (24, 16), (code, len(practice), len(test))
    rows=[]
    for bank, specs in (("practice", practice), ("test", test)):
        for i, spec in enumerate(specs, 1):
            ci=(i-1)%3; choices=list(spec["choices"]); correct=choices.pop(0); choices.insert(ci, correct)
            row={"id":f"{code}-{'P' if bank=='practice' else 'T'}-{i:03d}","subject":"math","year_level":"Year 2",
                "curriculum_code":code,"bank":bank,"skill":spec["skill"],"visual":{"type":"none","alt_text":""},
                "question":spec["question"],"audio_prompt":spec["question"],
                "answers":[{"text":x,"is_correct":j==ci} for j,x in enumerate(choices)],"correct_index":ci,
                "explanation":{"summary":spec["summary"],"hint":spec["hint"]},
                "difficulty":1+min(2,(i-1)//8),"difficulty_tier":("recognise","apply","reason")[min(2,(i-1)//8 if bank=="practice" else (i-1)//6)],
                "sequence_priority":i,"review":{"version":VERSION,"status":"editorially-reviewed",
                "ixl_reference_url":"https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-2",
                "evidence_scope":f"All mapped IXL pages, live entry questions and worked examples were inspected sequentially; see {REVIEW_DOC}. No IXL wording or media was copied."}}
            for k in ("grading_mode","model_answer","acceptance_note","response_instructions","completion_label"):
                if k in spec: row[k]=spec[k]
            rows.append(row)
    (OUT/f"{code.lower()}.json").write_text(json.dumps(rows,indent=2,ensure_ascii=False)+"\n")

A01_P=[
q("identify_constant_change","Which number pattern increases by the same amount each time?","4, 7, 10, 13","4, 7, 9, 13","4, 8, 11, 15","Each term is 3 more than the term before it.","Compare every neighbouring pair."),
q("continue_increasing_pattern","Continue the pattern: 12, 17, 22, __.","27","26","28","The constant change is +5, so 22 + 5 = 27.","Find the change between the first two terms."),
q("continue_decreasing_pattern","What comes next: 35, 31, 27, 23, __?","19","20","18","The pattern subtracts 4 each time; 23 − 4 = 19.","Keep the direction and amount unchanged."),
q("identify_rule","What is the rule for 6, 10, 14, 18?","Add 4","Add 6","Subtract 4","Every step increases by 4.","Subtract one term from the next."),
q("identify_decreasing_rule","What is the rule for 48, 41, 34, 27?","Subtract 7","Subtract 6","Add 7","Each term is 7 less than the previous term.","Check the rule on more than one step."),
q("missing_middle_term","Find the missing number: 9, 13, __, 21, 25.","17","16","18","Adding 4 to 13 gives 17, and adding 4 again gives 21.","The missing value must fit on both sides."),
q("missing_first_term","Find the missing first term: __, 18, 24, 30.","12","10","14","The rule is +6, so the term before 18 is 18 − 6 = 12.","Work backwards using the opposite operation."),
q("missing_decreasing_term","Complete: 70, 62, 54, __, 38.","46","48","44","Subtracting 8 from 54 gives 46, then 46 − 8 = 38.","Check both gaps around the blank."),
q("shape_growth_count","A shape pattern uses 2 squares, then 5 squares, then 8 squares. How many squares are in the next shape?","11","10","13","The number of squares grows by 3 each step, so 8 + 3 = 11.","Count the constant growth."),
q("object_decrease","Four displays contain 20, 17, 14 and 11 counters. How many counters should the next display contain?","8","9","7","Each display has 3 fewer counters; 11 − 3 = 8.","Describe what changes from display to display."),
q("match_object_rule","A tower pattern has 3 blocks, 7 blocks, 11 blocks and 15 blocks. Which rule matches it?","Start at 3 and add 4","Start at 3 and add 3","Start at 4 and add 3","The counts 3, 7, 11 and 15 increase by 4.","Test the rule against every tower."),
q("predict_later_term","A pattern starts 5, 8, 11, 14. What is the sixth term?","20","17","23","The fifth term is 17 and the sixth is 20 because the rule is +3.","Do not stop after finding only the next term."),
q("addition_table_output","A number machine adds 6. What is the output for an input of 13?","19","7","18","Apply the constant rule: 13 + 6 = 19.","Use the same change for every input."),
q("subtraction_table_output","A number machine subtracts 5. What is the output for 24?","19","29","20","The output is 24 − 5 = 19.","The rule decreases the input."),
q("infer_addition_rule","A table maps 3→10, 6→13 and 12→19. What is its rule?","Add 7","Add 6","Subtract 7","Each output is 7 greater than its input.","Compare input and output in several rows."),
q("infer_subtraction_rule","A table maps 18→14, 25→21 and 40→36. What is its rule?","Subtract 4","Add 4","Subtract 5","Every output is 4 less than its input.","Check the direction of the change."),
q("complete_table_pair","The rule is add 9. Which input-output pair belongs in the table?","16→25","16→24","25→16","Sixteen plus 9 equals 25.","Apply the stated rule to the input."),
q("find_table_input","A machine adds 8 and produces 31. What number went in?","23","39","24","Undo +8 with subtraction: 31 − 8 = 23.","Work backwards from the output."),
q("compare_pattern_rules","Pattern A is 10, 14, 18. Pattern B is 10, 16, 22. How do their rules differ?","A adds 4; B adds 6","A adds 6; B adds 4","Both add 4","The constant changes are 4 and 6 respectively.","Find each pattern’s change separately."),
q("diagnose_nonconstant_pattern","Why is 7, 11, 15, 20 not a constant additive pattern?","The last change is +5 instead of +4","It contains an even number","It increases rather than decreases","The changes are +4, +4 and +5, so they are not constant.","List every change."),
q("repair_pattern","The rule is subtract 6. Which term needs changing in 50, 44, 38, 33, 26?","33 should be 32","44 should be 45","26 should be 27","After 38, subtracting 6 gives 32; then 32 − 6 = 26.","Generate the pattern from the start."),
q("reason_from_two_terms","A constant additive pattern has 22 followed by 29. Which number must follow 29?","36","35","37","The change is +7, so 29 + 7 = 36.","Use the difference between the known consecutive terms."),
adult("create_number_pattern","Create a six-term number pattern that starts at 17 and decreases by 3. State the rule.","17, 14, 11, 8, 5, 2; rule: subtract 3 each time.","Accept the six correct terms and an explicit subtract-3 rule.","Write all six terms and name the constant change."),
adult("create_object_pattern","Draw or describe four groups of objects whose counts form a pattern starting at 2 and increasing by 4.","Valid group counts are 2, 6, 10 and 14 objects; the rule is add 4.","The objects may differ, but each group count and the +4 rule must be clear.","Show four groups, label their counts and state the rule."),
]
A01_T=[
q("constant_change","Which pattern has a constant change of +6?","7, 13, 19, 25","7, 12, 19, 25","6, 12, 19, 25","Each next term is 6 greater.","Check every step."),
q("continue_pattern","Continue: 18, 25, 32, __.","39","38","40","The rule is add 7, giving 39.","Find the constant difference."),
q("decreasing_pattern","What comes next: 63, 58, 53, 48?","43","42","44","Subtract 5 from 48 to get 43.","Continue the same decrease."),
q("missing_term","Find the blank: 16, 22, __, 34.","28","27","29","The pattern adds 6, so the missing term is 28.","It must be 6 from both neighbours."),
q("missing_start","Complete: __, 42, 36, 30.","48","46","50","The rule is subtract 6; working back gives 48.","Reverse the rule."),
q("shape_count","Successive figures contain 4, 9 and 14 triangles. How many triangles should figure 4 contain?","19","18","20","The figures gain 5 triangles each time.","Use the change in the counts."),
q("object_pattern_rule","Rows hold 30, 26, 22 and 18 beads. What is the rule?","Subtract 4","Subtract 8","Add 4","Each row has 4 fewer beads.","Compare neighbouring rows."),
q("table_output","A machine subtracts 12. What output follows input 47?","35","59","36","47 − 12 = 35.","Apply the rule once."),
q("infer_table_rule","The pairs are 8→17, 15→24 and 31→40. What is the rule?","Add 9","Add 8","Subtract 9","Each output exceeds its input by 9.","Compare more than one pair."),
q("find_input","A subtract-7 machine gives output 28. What was the input?","35","21","34","The input is 7 more than 28: 35.","Undo subtraction with addition."),
q("predict_term","A pattern is 9, 13, 17, 21. What is its seventh term?","33","29","37","Terms 5, 6 and 7 are 25, 29 and 33.","Continue the +4 rule three more times."),
q("compare_rules","Both patterns start at 12. P adds 3; Q adds 5. What are their fourth terms?","P: 21; Q: 27","P: 24; Q: 32","P: 18; Q: 22","Three changes give 12+9=21 and 12+15=27.","The starting value is term 1."),
q("identify_error","Mia follows add 8: 5, 13, 21, 28. What is the correction?","Replace 28 with 29","Replace 21 with 20","Replace 13 with 12","Twenty-one plus 8 is 29.","Apply the rule to the term before the error."),
q("choose_missing_object_count","A growing display follows +3 and has 6, 9, __, 15 counters. What fills the gap?","12","11","13","Nine plus 3 is 12 and 12 plus 3 is 15.","Check both sides."),
adult("create_and_explain","Create five terms of an additive pattern beginning at 40 with constant change −7, then explain how you checked it.","40, 33, 26, 19, 12. Each neighbouring difference is −7.","Accept equivalent wording that supplies all terms and verifies every change.","Write the terms, rule and one checking sentence."),
q("distinguish_repeat_from_additive","Why does red, blue, red, blue not by itself show an additive pattern?","It repeats categories but gives no numerical constant change","It has too many colours","Additive patterns must always decrease","An additive pattern needs quantities that change by a constant amount.","Separate repeating order from changing quantity."),
]

A02_P=[
q("recall_addition","What is 7 + 8?","15","14","16","Seven and eight make 15.","Use a known fact or make ten."),
q("doubles","Find 6 + 6.","12","11","13","The double of 6 is 12.","Both addends are equal."),
q("complete_double","Complete the doubles fact: 16 = __ + __.","8 + 8","7 + 9","6 + 10","Sixteen splits into two equal parts of 8.","A double uses equal addends."),
q("near_double","Use 7 + 7 = 14 to find 7 + 8.","15","14","16","Seven plus 8 is one more than double 7.","Use double 7, then add one."),
q("number_line_add","A number line starts at 9 and makes five +1 jumps. Where does it end?","14","13","15","Counting on five from 9 ends at 14.","Count the jumps, not the marks."),
q("count_on","To find 6 + 9 by counting on, which start is more efficient?","Start at 9 and count on 6","Start at 0 and count to 15","Start at 6 and count on 9","Starting from the larger addend requires fewer counts.","Addition can be reordered."),
q("make_ten","Which split helps calculate 8 + 7 by making ten?","Split 7 into 2 and 5","Split 7 into 3 and 4","Split 8 into 5 and 3, then stop","Eight needs 2 to reach 10; 5 remains.","Ask how much the first addend needs to make 10."),
q("missing_addend","Complete: 9 + __ = 17.","8","7","9","Nine plus 8 equals 17.","Count on from 9 to 17."),
q("true_addition","Which addition equation is true?","6 + 9 = 15","7 + 9 = 15","8 + 6 = 15","Six plus 9 equals 15.","Evaluate each sum."),
q("related_addition","Which fact is related to 5 + 13 = 18?","13 + 5 = 18","18 + 5 = 23","13 + 18 = 31","Swapping the addends keeps the same sum.","Use the same three numbers."),
q("subtract_double","Use double 8 to find 16 − 8.","8","7","9","Because 8 + 8 = 16, 16 − 8 = 8.","Think of the related double."),
q("number_line_subtract","A number line starts at 17 and moves back 6 steps. Where does it land?","11","10","12","Seventeen minus 6 is 11.","Count back exactly six jumps."),
q("count_back","What is 14 − 3?","11","12","10","Counting back three from 14 gives 11.","Say 13, 12, 11."),
q("use_ten_subtract","Which first step helps find 15 − 7 using ten?","Subtract 5 to reach 10","Subtract 7 to reach 8 and stop","Add 5 to reach 20","First reach 10, then subtract the remaining 2.","Split 7 into 5 and 2."),
q("count_on_subtract","To find 18 − 16 by counting on, how many steps are needed?","2","34","1","Count 17, 18: two steps from 16 to 18.","The difference is the gap."),
q("subtract_zero_all","Which statement is true?","13 − 13 = 0","13 − 0 = 0","0 − 13 = 13","A number minus itself leaves zero.","Distinguish subtracting zero from subtracting all."),
q("recall_subtraction","Find 19 − 8.","11","12","10","Nineteen minus 8 equals 11; check 11 + 8 = 19.","Use a related addition fact."),
q("missing_subtrahend","Complete: 18 − __ = 9.","9","8","10","Eighteen minus 9 equals 9.","Use the double 9 fact."),
q("true_subtraction","Which subtraction equation is true?","17 − 8 = 9","17 − 7 = 9","16 − 8 = 9","Seventeen minus 8 leaves 9.","Check by addition."),
q("related_subtraction","Which fact is related to 15 − 6 = 9?","15 − 9 = 6","15 + 9 = 24","9 − 6 = 15","The same whole 15 can lose either part to leave the other.","Keep the same whole and parts."),
q("mixed_operation","Choose the operation that makes this true: 12 __ 7 = 19.","+","−","÷","Twelve plus 7 equals 19.","Decide whether the result is greater or smaller."),
q("make_number","Which is not equal to 18?","16 − 0","9 + 9","20 − 2","Sixteen minus zero remains 16, not 18.","Calculate every option."),
q("fact_family","Which fact completes the family 7+11=18, 11+7=18, 18−7=11?","18 − 11 = 7","11 − 7 = 4","18 + 7 = 25","The other subtraction removes 11 from the whole 18.","A fact family uses two additions and two subtractions."),
q("strategy_reasoning","Why is 9 + 6 = 10 + 5 useful?","It makes a ten without changing the total","It adds one extra to the total","It changes addition into subtraction","Moving 1 from 6 to 9 creates 10 while preserving 15.","Track the amount moved."),
]
A02_T=[
q("addition_recall","Find 8 + 9.","17","16","18","Eight plus 9 equals 17.","Use 9+9 minus 1."),
q("double_fact","Which is a doubles fact?","7 + 7 = 14","7 + 8 = 15","6 + 8 = 14","A doubles fact has equal addends.","Compare the two parts."),
q("near_double","Use 8 + 8 to find 8 + 9.","17","16","18","Near double 8+9 is one more than 16.","Add one to the double."),
q("make_ten","Which calculation shows making ten for 9 + 7?","10 + 6","9 + 6","10 + 7","Move 1 from 7 to 9, leaving 6.","Preserve the total."),
q("missing_addend","Complete: __ + 7 = 20.","13","12","14","Thirteen plus 7 equals 20.","Use 20 − 7."),
q("related_addition","What is related to 12 + 6 = 18?","6 + 12 = 18","18 + 6 = 24","12 − 6 = 18","Addition works in either order.","Swap only the addends."),
q("subtraction_recall","Find 18 − 7.","11","10","12","Eighteen minus 7 leaves 11.","Check with 11+7."),
q("use_ten","For 16 − 9, which split of 9 reaches ten first?","6 and 3","5 and 4","7 and 2","Subtract 6 from 16 to reach 10, then subtract 3.","Find the distance from 16 to 10."),
q("count_on","Use counting on to find 17 − 14.","3","31","2","It takes three steps—15, 16, 17—to get from 14 to 17.","Count the steps."),
q("missing_subtrahend","Complete: 20 − __ = 12.","8","7","9","Twenty minus 8 equals 12.","Use 12+8=20."),
q("related_subtraction","Which belongs with 19 − 8 = 11?","19 − 11 = 8","11 − 8 = 3","19 + 8 = 27","Related subtraction facts keep 19 as the whole.","Swap the subtracted part and difference."),
q("number_line_mixed","A number line starts at 13 and ends at 19 after forward jumps. Which equation matches?","13 + 6 = 19","19 − 13 = 32","13 − 6 = 19","Six forward jumps represent adding 6.","Use the direction and endpoints."),
q("fact_family","Which set uses one fact family?","4+15=19, 15+4=19, 19−4=15, 19−15=4","4+15=19, 19−4=14, 15−4=11","4+19=23, 19−15=4, 15+4=19","All four facts use the same parts 4 and 15 and whole 19.","Check every number and operation."),
q("diagnose_near_double","A student says 6+7 equals double 6, which is 12. What was missed?","The extra 1 in the 7","The double should be 7+7 only","Six cannot be doubled","Seven is one more than 6, so the sum is 13.","Near doubles need a one adjustment."),
q("choose_efficient_strategy","Which strategy is efficient for 8 + 6?","Make 10: 8+2+4","Count all 14 objects from 1","Subtract 6 from 8","Making ten reduces the calculation to 10+4.","Look for a friendly ten."),
q("reason_equivalence","Why do 14−6 and 14−8 give answers that add to 14?","Six and eight are the two parts of 14","Subtraction always gives equal answers","Both answers are 14","The related differences are 8 and 6, the same two parts.","Use the fact family 6+8=14."),
]

A03_P=[
q("pairs_model","Four pairs of gloves contain how many gloves?","8","6","16","Four groups of 2 make 8.","Count by twos four times."),
q("multiply_by_two","Find 2 × 6.","12","8","14","Two groups of 6 make 12; equivalently, double 6.","Double the other factor."),
q("twos_fact","Complete: 7 × 2 = __.","14","9","12","Seven pairs contain 14 objects.","Skip-count by 2 seven times."),
q("array_model","An array has 2 rows of 8 dots. How many dots are there?","16","10","18","Two rows of 8 show double 8, which is 16.","Add 8+8."),
q("number_line_twos","Starting at 0, five jumps of 2 end at what number?","10","7","12","Five equal jumps of 2 total 10.","Count 2,4,6,8,10."),
q("missing_factor","Complete: __ × 2 = 18.","9","8","10","Nine groups of 2 make 18.","Count the number of pairs."),
q("double_connection","Which double helps solve 2 × 7?","7 + 7","2 + 7","2 + 2 + 2 + 2 + 2 + 2","Multiplying by 2 is doubling the other factor.","A double has two equal addends."),
q("commutative_twos","Why do 2 × 9 and 9 × 2 have the same total?","Both represent 18 objects arranged in different orientations","Both have nine rows of nine","Multiplication changes the number of objects","Turning a 2-by-9 array swaps rows and columns but keeps 18 objects.","No objects are added or removed."),
q("halve_even_set","Half of 16 is __.","8","7","32","Sixteen split into 2 equal groups gives 8 in each.","Use 2×8=16."),
q("divide_by_two","Find 14 ÷ 2.","7","6","8","Fourteen shared between 2 equal groups gives 7 each.","Use the related twos fact."),
q("pair_grouping","How many pairs can be made from 18 socks?","9","8","16","Eighteen contains nine groups of 2.","Count by twos to 18."),
q("sharing_two_groups","Twenty counters are shared equally into 2 groups. How many are in each group?","10","18","22","Halving 20 gives 10 in each group.","Both groups must be equal."),
q("related_division","If 8 × 2 = 16, which related division fact finds the number of pairs?","16 ÷ 2 = 8","16 ÷ 8 = 2 pairs","8 ÷ 2 = 16","Sixteen divided into groups of 2 makes 8 groups.","Start with the total."),
q("missing_dividend","Complete: __ ÷ 2 = 6.","12","8","3","Twelve divided into 2 equal groups gives 6.","Double the quotient."),
q("missing_quotient","Complete: 20 ÷ 2 = __.","10","9","18","Half of 20 is 10.","Use 2×10=20."),
q("identify_even_total","Which total can be divided into 2 equal whole-number groups?","18","17","19","Eighteen is 9+9, so it halves evenly.","Look for a number made of complete pairs."),
q("choose_representation","Which represents 6 × 2?","Six equal groups with 2 in each","One group with 8","Two unequal groups with 6 and 2","Six groups of 2 preserve both factors.","Identify groups and group size."),
q("interpret_quotient","For 12 pencils shared equally between 2 children, what does 6 mean?","Each child receives 6 pencils","There are 6 children","Six pencils are left over","The quotient is the amount in each equal share.","Connect the answer to the story."),
q("double_then_halve","A number is doubled to make 18. What was the number?","9","16","36","Halving 18 undoes doubling and gives 9.","Use inverse operations."),
q("fact_link","Which pair of equations shows a twos fact and its related division fact?","9×2=18 and 18÷2=9","9×2=18 and 18−2=16","9+2=11 and 11÷2=9","Both equations use the same factor, 2, total 18 and other factor 9.","Keep the same three numbers."),
q("diagnose_pair_error","Kai says 7 pairs contain 9 objects because 7+2=9. What should Kai do?","Add 2 seven times to get 14","Add 7 and 2 again to get 18","Divide 7 by 2","Seven pairs are seven equal groups of 2.","Represent every pair."),
q("diagnose_halving_error","A student halves 18 and gets 8. What check shows the error?","2 × 8 = 16, not 18","18 − 8 = 10","8 + 2 = 10","A correct half doubled must return to 18; the half is 9.","Undo halving by doubling."),
q("compare_twos_facts","How much greater is 9 × 2 than 6 × 2?","6","3","12","The difference is three groups of 2, which is 6.","Compare the number of extra pairs."),
q("reason_inverse","Why does knowing 2 × 10 = 20 help find 20 ÷ 2?","Multiplication and division use the same equal groups in reverse","Division always adds 2","Twenty is ten more than 10","The product becomes the division total and the missing factor becomes the quotient.","Use the same array in reverse."),
]
A03_T=[
q("twos_recall","Find 8 × 2.","16","10","18","Eight groups of 2 make 16.","Double 8."),
q("pairs_context","Six bicycles have how many wheels altogether?","12","8","36","Six pairs of wheels make 12.","Count two wheels per bicycle."),
q("array_twos","An array has 9 rows with 2 stars in each row. What is the total?","18","11","16","Nine equal rows of 2 contain 18 stars.","Use 9×2."),
q("missing_factor","Complete: __ × 2 = 20.","10","9","18","Ten pairs make 20.","Halve 20."),
q("halve","What is half of 14?","7","6","8","Fourteen splits into 7 and 7.","Use the double of 7."),
q("divide_two","Find 18 ÷ 2.","9","8","10","Eighteen shared into 2 equal groups gives 9.","Use 9×2=18."),
q("count_pairs","How many pairs are in 16 objects?","8","14","32","Sixteen contains eight groups of 2.","Count by twos."),
q("share_between_two","Twelve cards are shared equally between 2 players. How many cards each?","6","10","24","Half of 12 is 6.","Make two equal shares."),
q("related_fact","Which division fact is related to 7 × 2 = 14?","14 ÷ 2 = 7","14 ÷ 7 = 7","7 ÷ 2 = 14","Fourteen divided into pairs gives 7 pairs.","Use the same three numbers."),
q("missing_total","Complete: __ ÷ 2 = 8.","16","10","4","Double 8 to recover the total 16.","Division by 2 is halving."),
q("model_choice","Which model correctly shows 5 × 2?","Five rows with 2 counters in each","Two rows with 5 and 6 counters","One row with 7 counters","Multiplication requires five equal groups of 2.","Check both group count and size."),
q("interpret_division","Ten mittens are placed into pairs. What does 10 ÷ 2 = 5 tell us?","There are 5 pairs","Each pair has 5 mittens","There are 2 mittens left","The quotient counts complete groups of 2.","State what is being counted."),
q("inverse_check","A student says 20 ÷ 2 = 12. Which check corrects the answer?","2 × 10 = 20, so the quotient is 10","12 + 2 = 14","20 − 2 = 18","The related multiplication fact identifies 10 as the missing factor.","Multiply the proposed quotient by 2."),
q("compare_pairs","A box has 4 pairs and another has 9 pairs. How many more objects are in the second box?","10","5","13","The second has five extra pairs; five groups of 2 make 10.","Compare pairs, then convert to objects."),
q("reason_halving","Why must the two groups in 16 ÷ 2 each contain 8?","Eight and eight are equal and total 16","One group may have 7 and the other 9","Division by 2 means remove 2","Equal sharing requires equal groups whose total is 16.","Check equality and total."),
q("connect_operations","Which statement correctly links doubling and halving?","Doubling 9 gives 18, and halving 18 returns 9","Doubling 9 gives 11, and halving 11 returns 9","Halving 18 gives 16","The operations undo each other for this twos fact.","Follow both operations in order."),
]

build("AC9M2A01",A01_P,A01_T)
build("AC9M2A02",A02_P,A02_T)
build("AC9M2A03",A03_P,A03_T)
print("Built AC9M2A01-A03: 24 Practice + 16 Test each")
