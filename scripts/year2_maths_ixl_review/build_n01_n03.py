#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets/assessment-banks/year2/math"
VERSION = "20260906-year2-maths-ixl-review-1"

REFS = {
    "AC9M2N01": "https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-2",
    "AC9M2N02": "https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-2",
    "AC9M2N03": "https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-2",
}

def spec(skill, question, correct, wrong1, wrong2, summary, hint, visual=None):
    return dict(skill=skill, question=question, choices=[correct, wrong1, wrong2], summary=summary, hint=hint, visual=visual)

def build(code, practice, test):
    assert len(practice) == 24 and len(test) == 16
    items = []
    for bank, specs in (("practice", practice), ("test", test)):
        for i, row in enumerate(specs, 1):
            correct_index = (i - 1) % 3
            choices = list(row["choices"])
            correct = choices.pop(0)
            choices.insert(correct_index, correct)
            label = "P" if bank == "practice" else "T"
            item_id = f"{code}-{label}-{i:03d}"
            visual = row.get("visual")
            visual_meta = {"type": "none", "alt_text": ""}
            if visual:
                visual_meta = {
                    "type": "svg",
                    "asset_path": f"/assets/assessment-visuals/year2/math/{code.lower()}.svg#{visual}",
                    "alt_text": row["question"],
                }
            items.append({
                "id": item_id,
                "subject": "math",
                "year_level": "Year 2",
                "curriculum_code": code,
                "bank": bank,
                "skill": row["skill"],
                "question": row["question"],
                "audio_prompt": row["question"],
                "visual": visual_meta,
                "answers": [{"text": text, "is_correct": j == correct_index} for j, text in enumerate(choices)],
                "correct_index": correct_index,
                "explanation": {"summary": row["summary"], "hint": row["hint"]},
                "difficulty": 1 + min(2, (i - 1) // 8),
                "difficulty_tier": ("recognise", "apply", "reason")[(i - 1) // 8 if bank == "practice" else min(2, (i - 1) // 6)],
                "sequence_priority": i,
                "review": {
                    "version": VERSION,
                    "status": "editorially-reviewed",
                    "ixl_reference_url": REFS[code],
                    "evidence_scope": "All in-scope IXL pages mapped to this descriptor were inspected; task types and limitations are recorded in docs/question-bank-reviews/2026-09-06-year2-maths-n01-n03.md. No wording or media was copied.",
                },
            })
    (OUT / f"{code.lower()}.json").write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n")

N01_P = [
spec("read_place_value_model","A model has 4 hundred flats, 5 ten rods and 6 one blocks. Which numeral does it show?","456","465","406","Four hundreds, five tens and six ones make 456.","Read the model in hundreds, tens, ones order.","ac9m2n01-p-017"),
spec("write_number_in_words","Which is the correct way to write 308 in words?","three hundred and eight","three hundred and eighty","thirty-eight","The zero shows there are no tens, so 308 is three hundred and eight.","Check whether the tens place is zero."),
spec("number_line_missing_value","The marks are equally spaced: 540, 560, ___, 600. Which number is missing?","580","570","590","The line increases by 20 each step: 540, 560, 580, 600.","Find the equal jump between labelled marks."),
spec("compare_numbers","Complete the statement: 709 ___ 790.","<",">","=","Both have 7 hundreds; 0 tens is less than 9 tens, so 709 < 790.","Compare hundreds first, then tens."),
spec("order_numbers","Put 615, 561 and 651 in order from smallest to largest.","561, 615, 651","651, 615, 561","561, 651, 615","561 has 5 hundreds. Of the two 600s, 615 comes before 651.","Compare the hundreds, then the tens and ones."),
spec("count_forwards","Count forwards from 897. Which list continues correctly?","898, 899, 900, 901","898, 899, 990, 991","907, 917, 927, 937","After 899 comes 900, then 901.","Say each next whole number, including the new hundred."),
spec("locate_on_number_line","A number line runs from 300 to 400 with marks every 10. Which number is on the seventh mark after 300?","370","307","360","Seven jumps of 10 from 300 land on 370.","Count jumps, not the starting mark."),
spec("word_to_numeral","Which numeral matches ‘nine hundred and forty-two’?","942","924","902","Nine hundreds, four tens and two ones make 942.","Place each stated value in H, T and O."),
spec("hundred_chart_pattern","On a hundred chart, what is directly below 47?","57","48","37","Moving down one row adds 10, so 47 + 10 = 57.","A row has ten numbers."),
spec("represent_with_materials","Which collection represents 530?","5 hundreds, 3 tens, 0 ones","5 hundreds, 0 tens, 3 ones","3 hundreds, 5 tens, 0 ones","530 is 5 hundreds, 3 tens and no ones.","Match each digit to its place."),
spec("compare_using_number_line","On a number line, 675 is left of 725. Which statement is true?","675 is less than 725","675 is greater than 725","675 is equal to 725","Numbers farther left are smaller, so 675 < 725.","Left means less on a number line."),
spec("order_using_bounds","Which number belongs between 449 and 451?","450","440","452","450 comes after 449 and before 451.","Count forward one from 449."),
spec("read_zero_places","What number has 6 hundreds, no tens and 9 ones?","609","690","69","The zero must hold the tens place: 609.","Write H, T, O, including zero."),
spec("number_line_scale","A line has 200 at one end and 800 at the other. There are 6 equal jumps. What is each jump?","100","60","200","The total change is 600; 600 split into 6 equal jumps is 100.","Subtract the endpoints, then share across the jumps."),
spec("compare_close_numbers","Which number is greatest: 882, 828 or 880?","882","880","828","All have 8 hundreds. 882 and 880 have 8 tens, and 2 ones is greater than 0 ones.","Keep comparing until a place differs."),
spec("descending_order","Arrange 999, 909, 990 and 900 from largest to smallest.","999, 990, 909, 900","900, 909, 990, 999","999, 909, 990, 900","After 999, 990 has more tens than 909; 900 is smallest.","Compare hundreds, then tens, then ones."),
spec("count_by_tens","Which number completes the count? 763, 773, 783, ___","793","784","803","Each term is 10 more, so 783 + 10 = 793.","A jump of 10 changes the tens digit."),
spec("identify_misplaced_number","Which number is misplaced in this increasing list: 268, 286, 278, 296?","286","278","296","278 should come before 286, so 286 is the first misplaced number.","Check each neighbouring pair."),
spec("reason_about_range","A mystery number has 8 hundreds, is greater than 850 and has 3 ones. Which number can it be?","863","843","853","863 has 8 hundreds, is above 850 and ends in 3.","Test every clue, not just one."),
spec("choose_number_line_point","The midpoint between 600 and 700 is marked. Which number is it?","650","610","750","650 is 50 more than 600 and 50 less than 700.","A midpoint is equally far from both ends."),
spec("digit_words_consistency","Which pair names the same number?","704 and seven hundred and four","740 and seven hundred and four","714 and seven hundred and forty","704 has 7 hundreds, no tens and 4 ones.","Check the zero place carefully."),
spec("order_with_equal_hundreds","Three cards show 437, 473 and 347. Which card is in the middle when ordered?","437","473","347","347 is smallest and 473 is largest, leaving 437 in the middle.","Order all three before choosing the middle."),
spec("justify_comparison","Why is 498 less than 501?","498 has 4 hundreds while 501 has 5 hundreds","98 is less than 1","498 has fewer digits","The hundreds place decides: 4 hundreds is less than 5 hundreds.","Use the highest place where the numbers differ."),
spec("reason_from_multiple_representations","A model shows 7 hundreds and 15 ones. Which numeral names its total?","715","750","705","Seven hundreds and fifteen ones total 700 + 15 = 715.","Combine the ones into the final two places."),
]

N01_T = [
spec("read_place_value_model","A virtual model shows 8 hundred tiles, no ten rods and 4 ones. What number is shown?","804","840","84","Eight hundreds, zero tens and four ones make 804.","Keep the zero as the tens placeholder."),
spec("write_number_in_words","Which wording names 671?","six hundred and seventy-one","six hundred and seventeen","seven hundred and sixty-one","671 has 6 hundreds, 7 tens and 1 one.","Read the places from left to right."),
spec("number_line_missing_value","Complete the equally spaced line: 250, 300, ___, 400.","350","325","450","The marks increase by 50, so the missing value is 350.","Use the difference between the first two marks."),
spec("compare_numbers","Which comparison is true?","906 > 869","906 < 869","906 = 869","906 has 9 hundreds; 869 has 8 hundreds.","Compare hundreds first."),
spec("order_numbers","Order 702, 720, 207 and 270 from smallest to largest.","207, 270, 702, 720","270, 207, 720, 702","207, 702, 270, 720","The 200s come before the 700s; then compare tens.","Group by hundreds before comparing tens."),
spec("count_forwards","What comes next? 996, 997, 998, 999, ___","1000","990","1001","The whole number after 999 is 1000.","Cross the hundreds boundary carefully."),
spec("locate_on_number_line","A line is marked 420, 440, 460, 480. Where would 450 lie?","halfway between 440 and 460","on the 460 mark","halfway between 420 and 440","450 is 10 from both 440 and 460.","Compare the distances to nearby labels."),
spec("word_to_numeral","Write ‘five hundred and ninety’ as a numeral.","590","509","950","Five hundreds and nine tens make 590.","There are no ones, so the ones digit is zero."),
spec("hundred_chart_pattern","What is two rows below 36 on a hundred chart?","56","38","46","Each row down adds 10; two rows add 20: 36 + 20 = 56.","Add 10 for each row."),
spec("compare_using_number_line","Which number would appear farthest right: 325, 352 or 253?","352","325","253","352 is the greatest, so it is farthest right.","Farther right means greater."),
spec("read_zero_places","Which numeral has 4 hundreds, 0 tens and 7 ones?","407","470","47","A zero holds the tens place in 407.","Write all three places."),
spec("reason_about_range","A number is between 680 and 700 and has 9 ones. What is it?","689","679","699","689 is above 680, below 700 and ends in 9.","Check both bounds and the ones clue."),
spec("descending_order","Which list is ordered greatest to least?","845, 805, 584, 548","548, 584, 805, 845","845, 584, 805, 548","The 800s come first, then the 500s; tens order each pair.","Compare hundreds, then tens."),
spec("number_line_scale","From 100 to 700 there are 3 equal jumps. What are the intermediate labels?","300 and 500","200 and 400","400 and 600","The total change is 600, so each of 3 jumps is 200: 100, 300, 500, 700.","Divide the total change by the jump count."),
spec("justify_comparison","A student says 620 is greater than 602 because 2 is greater than 0. What is the correct explanation?","620 is greater because it has 2 tens while 602 has 0 tens","The student is wrong; 602 is greater","They are equal because both have 6 hundreds","After equal hundreds, compare tens: 2 tens is greater than 0 tens.","Compare digits only when they are in the same place."),
spec("multiple_representations","Which representation does not show 386?","3 hundreds, 6 tens and 8 ones","three hundred and eighty-six","300 + 80 + 6","3 hundreds, 6 tens and 8 ones is 368, not 386.","Translate each representation into a numeral."),
]

N02_P = [
spec("standard_partition","Which is the standard partition of 472?","4 hundreds + 7 tens + 2 ones","4 hundreds + 2 tens + 7 ones","47 hundreds + 2 ones","The digits in 472 show 4 hundreds, 7 tens and 2 ones.","Match each digit to its place."),
spec("value_of_digit","What is the value of the 6 in 364?","60","6","600","The 6 is in the tens place, so its value is 60.","A digit's value depends on its place."),
spec("identify_place","Which digit is in the hundreds place in 591?","5","9","1","The hundreds place is the third place from the right, containing 5.","Read ones, tens, hundreds from the right."),
spec("regroup_ten_as_ones","Complete the regrouping: 4 tens + 17 ones = ___ tens + 7 ones.","5","4","6","17 ones regroup as 1 ten and 7 ones; 4 tens + 1 ten = 5 tens.","Trade 10 ones for 1 ten."),
spec("nonstandard_partition","Which is another way to make 238?","1 hundred + 13 tens + 8 ones","2 hundreds + 3 tens + 18 ones","23 hundreds + 8 ones","1 hundred + 13 tens + 8 ones is 100 + 130 + 8 = 238.","Find the total value of each grouping."),
spec("rename_hundred_as_tens","3 hundreds are equal to how many tens?","30 tens","3 tens","300 tens","Each hundred is 10 tens, so 3 hundreds are 30 tens.","Use 1 hundred = 10 tens."),
spec("rename_hundred_as_ones","How many ones have the same value as 5 hundreds?","500","50","5","One hundred is 100 ones; five hundreds are 500 ones.","Multiply the hundreds count by 100."),
spec("zero_placeholder","What does the zero do in 406?","It shows there are no tens and keeps 4 in the hundreds place","It shows there are no ones","It makes the number equal to 46","The zero records 0 tens and preserves the place of the 4 hundreds.","Name the place occupied by zero."),
spec("expanded_to_number","What number is 600 + 20 + 9?","629","692","609","600 + 20 + 9 combines to 629.","Write the hundreds, tens and ones digits."),
spec("number_to_expanded","Which expanded form equals 704?","700 + 4","70 + 4","700 + 40","704 has 7 hundreds, 0 tens and 4 ones.","Do not add tens that the zero excludes."),
spec("regroup_hundreds_tens_ones","2 hundreds + 14 tens + 3 ones equals which standard grouping?","3 hundreds + 4 tens + 3 ones","2 hundreds + 4 tens + 3 ones","4 hundreds + 1 ten + 3 ones","14 tens regroup as 1 hundred and 4 tens, giving 343.","Trade 10 tens for 1 hundred."),
spec("find_missing_group","5 hundreds + ___ tens + 6 ones = 586.","8","80","6","586 contains 5 hundreds, 8 tens and 6 ones.","Read the tens digit."),
spec("verify_equivalence","Which grouping has the same value as 451?","3 hundreds + 15 tens + 1 one","4 hundreds + 5 tens + 11 ones","4 hundreds + 15 tens + 1 one","300 + 150 + 1 = 451.","Calculate the value of every group."),
spec("identify_non_equivalence","Which does not equal 320?","2 hundreds + 2 tens","3 hundreds + 2 tens","32 tens","2 hundreds + 2 tens is 220, not 320.","Convert each choice to a numeral."),
spec("rearrange_partition","A model for 267 has 2 hundred blocks, 6 ten rods and 7 ones. One hundred block is traded for tens. What remains?","1 hundred, 16 tens, 7 ones","2 hundreds, 16 tens, 7 ones","1 hundred, 6 tens, 17 ones","Trading 1 hundred adds 10 tens: 1 hundred, 16 tens, 7 ones.","Only the traded place changes."),
spec("reason_from_clues","I have 4 hundreds. After one ten is traded for ones, I have 2 tens and 15 ones. What number am I?","435","425","445","Before the trade there were 3 tens and 5 ones, so the number is 435.","Reverse the trade: 2 tens + 15 ones = 3 tens + 5 ones."),
spec("multiple_regroupings","Which pair shows two equal amounts?","6 hundreds + 12 tens; 7 hundreds + 2 tens","6 hundreds + 2 tens; 7 hundreds + 2 tens","5 hundreds + 12 tens; 7 hundreds + 12 tens","600 + 120 and 700 + 20 both equal 720.","Find each total before comparing."),
spec("zero_in_different_places","How are 502 and 520 different?","502 has no tens; 520 has no ones","502 has no ones; 520 has no tens","Both zeroes have the same place value","The zero in 502 is in the tens place; the zero in 520 is in the ones place.","Locate the zero from the right."),
spec("correct_regrouping_process","Which trade keeps the value of 684 unchanged?","Trade 1 hundred for 10 tens","Trade 1 hundred for 100 tens","Trade 1 ten for 1 one","One hundred and 10 tens have equal value.","A valid trade must exchange equal amounts."),
spec("diagnose_regrouping_error","Mia writes 347 = 2 hundreds + 14 tens + 7 ones. What should be corrected?","Nothing; both sides equal 347","Use 13 tens instead of 14 tens","Use 3 hundreds instead of 2 hundreds and keep 14 tens","2 hundreds + 14 tens + 7 ones = 200 + 140 + 7 = 347.","Add the values before deciding there is an error."),
spec("partition_with_constraints","Which partition of 615 uses no hundreds?","61 tens + 5 ones","6 tens + 15 ones","60 tens + 5 ones","61 tens is 610; plus 5 ones makes 615.","Convert hundreds into tens."),
spec("choose_all_standard_digits","Regroup 7 hundreds + 3 tens + 26 ones so every place has a digit from 0 to 9.","7 hundreds + 5 tens + 6 ones","7 hundreds + 3 tens + 16 ones","8 hundreds + 5 tens + 6 ones","26 ones become 2 tens and 6 ones, so the standard form is 756.","Trade groups of 10 ones."),
spec("inverse_rename","How many hundreds can be made from 900 ones?","9","90","900","Every 100 ones makes 1 hundred, so 900 ones make 9 hundreds.","Group the ones into sets of 100."),
spec("reason_about_zero","A number has 8 hundreds and 7 ones. Why must its numeral include a zero?","The zero shows the empty tens place","All three-digit numbers need a zero","The zero shows 7 tens","Without the zero, 87 would mean 8 tens and 7 ones; 807 needs 0 tens.","Ask which place has no groups."),
]

N02_T = [
spec("standard_partition","Which partition equals 639?","6 hundreds + 3 tens + 9 ones","6 hundreds + 9 tens + 3 ones","63 hundreds + 9 ones","639 has 6 hundreds, 3 tens and 9 ones.","Match digits to places."),
spec("value_of_digit","What is the value of the 7 in 275?","70","7","700","The 7 is in the tens place, so it is worth 70.","Use the digit's place."),
spec("regroup_ten_as_ones","Regroup 6 tens + 24 ones into standard form.","8 tens + 4 ones","6 tens + 4 ones","7 tens + 14 ones","24 ones make 2 tens and 4 ones; 6 + 2 = 8 tens.","Trade 20 ones for 2 tens."),
spec("nonstandard_partition","Which non-standard grouping equals 507?","4 hundreds + 10 tens + 7 ones","5 hundreds + 7 tens","50 hundreds + 7 ones","400 + 100 + 7 = 507.","Convert each group to its value."),
spec("rename_between_places","7 hundreds equal how many tens?","70","700","7","Each hundred contains 10 tens, so 7 hundreds contain 70 tens.","Use 1 hundred = 10 tens."),
spec("expanded_to_number","What number is 800 + 3?","803","830","83","There are 8 hundreds, no tens and 3 ones: 803.","Keep the empty tens place."),
spec("regroup_hundreds_tens_ones","4 hundreds + 19 tens + 2 ones equals:","5 hundreds + 9 tens + 2 ones","4 hundreds + 9 tens + 2 ones","6 hundreds + 9 tens + 2 ones","19 tens become 1 hundred and 9 tens, giving 592.","Trade 10 tens for 1 hundred."),
spec("identify_non_equivalence","Which is not another name for 460?","4 hundreds + 5 tens","46 tens","3 hundreds + 16 tens","4 hundreds + 5 tens equals 450, not 460.","Calculate each total."),
spec("zero_placeholder","Why is 9 hundreds and 2 ones written 902, not 92?","The zero holds the empty tens place","The zero means 2 tens","Every number above 100 ends with zero","902 records 9 hundreds, 0 tens and 2 ones.","Write H, T and O."),
spec("rearrange_partition","Trade 2 hundreds in 731 for tens. Which grouping results?","5 hundreds + 23 tens + 1 one","7 hundreds + 21 tens + 1 one","5 hundreds + 3 tens + 21 ones","Two hundreds add 20 tens; 7 hundreds becomes 5 hundreds.","Subtract the traded hundreds and add equivalent tens."),
spec("partition_with_constraints","Which name for 842 uses exactly 7 hundreds?","7 hundreds + 14 tens + 2 ones","7 hundreds + 4 tens + 2 ones","7 hundreds + 142 ones","700 + 140 + 2 = 842.","The missing hundred must be represented by 10 tens."),
spec("reason_from_clues","A number can be named 3 hundreds + 25 tens + 4 ones. What is its usual numeral?","554","354","524","300 + 250 + 4 = 554.","Regroup 25 tens into hundreds and tens."),
spec("diagnose_error","Noah says 6 hundreds + 12 ones = 612, so 5 hundreds + 12 tens also equals 612. Is he correct?","No; 5 hundreds + 12 tens is 620","Yes; both equal 612","No; 6 hundreds + 12 ones is 602","500 + 120 = 620, while 600 + 12 = 612.","Calculate both expressions separately."),
spec("multiple_regroupings","Which chain keeps the same value throughout?","480 = 48 tens = 4 hundreds + 8 tens","480 = 480 tens = 4 hundreds + 8 ones","480 = 4 tens + 80 ones = 48 hundreds","480 equals 48 tens and also 4 hundreds + 8 tens.","Check the value at every equals sign."),
spec("standardise_large_ones","2 hundreds + 7 tens + 34 ones in standard form is:","3 hundreds + 0 tens + 4 ones","2 hundreds + 10 tens + 4 ones","3 hundreds + 4 tens + 0 ones","34 ones add 3 tens and 4 ones; 7 tens + 3 tens makes 1 hundred, leaving 304.","Regroup ones, then regroup tens if needed."),
spec("explain_place_value","In 707, the two 7s have different values. Which statement is correct?","The first 7 is 700 and the last 7 is 7","Both 7s are worth 7","The first 7 is 70 and the last 7 is 700","The left 7 is in the hundreds place; the right 7 is in the ones place.","Name each 7's place."),
]

N03_P = [
spec("equal_parts","Which description shows a whole divided into equal parts?","Four pieces that are all the same size","Four pieces with two large and two small","Three pieces labelled ‘quarters’","Fraction parts must be equal in size.","Count alone is not enough; compare sizes."),
spec("identify_half","One of two equal parts of a whole is called:","one-half","one-quarter","one-eighth","A half is one of 2 equal parts.","The denominator tells how many equal parts.","ac9m2n03-p-001"),
spec("make_halves","A rectangular card must be cut into halves. Which cut works?","One straight cut through its centre","One cut close to an edge","Two cuts making three strips","A centre cut can make 2 equal parts.","Halves require exactly two equal pieces."),
spec("identify_quarter","A sandwich is shared into 4 equal pieces. What is each piece?","one-quarter","one-half","one-eighth","One of 4 equal parts is one-quarter.","Use the number of equal parts.","ac9m2n03-p-002"),
spec("make_quarters","Which instruction makes quarters from a rectangular strip?","Divide it into 4 equal lengths","Divide it into 4 pieces of any size","Divide it into 2 equal lengths","Quarters are 4 equal parts.","Both the number and equality matter."),
spec("identify_eighth","A ribbon is marked into 8 equal sections. One section is:","one-eighth","one-quarter","one-half","One of 8 equal parts is one-eighth.","Eight equal parts name eighths."),
spec("make_eighths","How can you turn 4 equal quarters into 8 equal parts?","Halve every quarter","Halve only one quarter","Join two quarters","Halving each of 4 quarters produces 8 equal eighths.","Each quarter must be split in two."),
spec("recognise_unequal_parts","A circle has 2 pieces, but one is much larger. Does either piece show one-half?","No, because the pieces are not equal","Yes, because there are 2 pieces","Yes, but only the larger piece","Two pieces are halves only when they are equal.","Check equal size before naming the fraction.","ac9m2n03-p-006"),
spec("repeated_halving","Start with one whole. Halve it, then halve each new part. How many equal parts are there?","4 quarters","3 thirds","8 eighths","One halving gives 2 halves; halving both halves gives 4 quarters.","Track every part after each halving."),
spec("repeated_halving_twice","Start with 4 quarters and halve each quarter. What are the new parts called?","8 eighths","4 halves","6 sixths","Halving each of 4 quarters makes 8 equal eighths.","Each old part creates two new parts."),
spec("connect_half_quarters","How many quarters have the same area as one-half of the same whole?","2 quarters","1 quarter","4 quarters","Two of 4 equal quarters cover half the whole.","Think of a whole split into four.","ac9m2n03-p-007"),
spec("connect_quarter_eighths","How many eighths have the same area as one-quarter of the same whole?","2 eighths","4 eighths","1 eighth","Two of 8 equal parts cover the same amount as one of 4 equal parts.","Halving one quarter makes two eighths.","ac9m2n03-p-008"),
spec("compare_unit_fractions","For equal-sized wholes, which piece is larger?","one-half","one-quarter","one-eighth","When a whole is split into fewer equal parts, each part is larger.","Compare the number of equal pieces."),
spec("compare_quarter_eighth","For the same whole, how does one-quarter compare with one-eighth?","One-quarter is twice as large","One-quarter is half as large","They are the same size","One quarter contains 2 eighths, so it is twice as large.","Convert the quarter into eighths."),
spec("identify_fraction_from_shaded_count","A strip has 8 equal boxes and 1 is shaded. What fraction is shaded?","one-eighth","one-quarter","one-half","One out of 8 equal parts is one-eighth.","Count all equal parts, then the shaded parts.","ac9m2n03-p-016"),
spec("identify_half_multiple_representation","A shape has 4 equal sections and 2 are shaded. What part of the whole is shaded?","one-half","one-quarter","one-eighth","Two quarters make one-half.","Compare 2 of 4 with the whole.","ac9m2n03-p-023"),
spec("judge_partition","Two students cut equal paper strips. Ari makes 8 equal pieces. Ben makes 8 pieces of different lengths. Who made eighths?","Ari only","Ben only","Both students","Eighths must be 8 equal parts, so only Ari made eighths.","Check equality as well as the count."),
spec("different_ways_same_fraction","A square is split into 4 equal rows. Another is split into 4 equal small squares. What do both show?","quarters","halves","eighths","The shapes of the pieces differ, but each whole has 4 equal parts.","Equal parts need not have the same orientation across different wholes."),
spec("reason_whole_size","Half of a large sheet and half of a small sheet are compared. Must the pieces be the same size?","No; each is half of a different whole","Yes; all halves are the same size","Only if both are rectangles","Fraction size depends on the size of the whole.","Identify the whole for each fraction."),
spec("find_missing_step","Whole → 2 halves → 4 quarters → ___. What comes next by repeated halving?","8 eighths","6 sixths","16 quarters","Halving 4 quarters produces 8 eighths.","Double the number of equal parts."),
spec("correct_false_claim","Luca says, ‘Any one of four pieces is a quarter.’ What is missing from his rule?","The four pieces must be equal","The whole must be a circle","One piece must be shaded","Four pieces are quarters only when all four are equal.","State the equality condition."),
spec("partition_action","A tray is already divided into halves. What single action will make quarters?","Divide each half into 2 equal parts","Divide one half into 3 parts","Join the two halves","Two equal parts in each half make 4 equal parts overall.","Halve both halves."),
spec("combine_eighths","Four eighths of a strip are shaded. What familiar fraction is shaded?","one-half","one-quarter","one-eighth","Four of 8 equal parts is half of the strip.","Half of 8 parts is 4 parts.","ac9m2n03-p-021"),
spec("explain_fraction_name","Why is one part called an eighth?","The whole has been divided into 8 equal parts","The part has 8 sides","Eight parts are shaded","The name eighth describes one of 8 equal parts of the whole.","The denominator counts equal parts in the whole."),
]

N03_T = [
spec("equal_parts","Which statement is necessary before pieces can be called halves, quarters or eighths?","The pieces are equal in size","The pieces are the same colour","The whole is a rectangle","Fractional parts must be equal parts of one whole.","Focus on size, not appearance."),
spec("identify_half","A paper strip has 2 equal sections. One section is what fraction?","one-half","one-quarter","one-eighth","One of 2 equal sections is one-half.","Use the total equal-part count.","ac9m2n03-t-001"),
spec("make_halves","Which action fails to make halves?","Cutting a strip into two unequal lengths","Folding a square exactly in two","Sharing 10 counters into two groups of 5","Two unequal pieces are not halves.","Halves must have equal amounts."),
spec("identify_quarter","One piece from 4 equal pieces is:","one-quarter","one-eighth","one-half","One of 4 equal parts is one-quarter.","Four equal parts are quarters."),
spec("identify_eighth","One part of a shape is one-eighth. How many equal parts form the whole?","8","4","2","The denominator 8 means 8 equal parts in the whole.","Use the fraction name."),
spec("repeated_halving","A whole is halved three times, with every piece halved each time. How many equal pieces result?","8","6","4","The numbers of parts are 1 → 2 → 4 → 8.","Double the parts at each halving."),
spec("connect_half_quarters","Which statement is true for the same whole?","one-half = two-quarters","one-half = one-quarter","one-half = four-quarters","Two of 4 equal quarters cover half the whole.","Picture four equal parts and shade two.","ac9m2n03-t-007"),
spec("connect_quarter_eighths","Complete the relationship: one-quarter = ___.","two-eighths","four-eighths","one-eighth","Each quarter splits into 2 eighths.","Halve the quarter.","ac9m2n03-t-008"),
spec("compare_unit_fractions","For the same-sized whole, order the pieces largest to smallest.","one-half, one-quarter, one-eighth","one-eighth, one-quarter, one-half","one-quarter, one-half, one-eighth","Splitting into more equal parts makes smaller pieces.","Fewer equal parts means a larger unit fraction."),
spec("judge_partition","A cake is cut into 8 slices: 6 equal thin slices and 2 larger slices. Are the slices eighths?","No, because all 8 slices are not equal","Yes, because there are 8 slices","Only the thin slices are eighths","Every part must be equal for the pieces to be eighths.","Count and compare sizes."),
spec("different_ways_same_fraction","Can a diagonal cut and a vertical cut both make halves of equal squares?","Yes, if each cut makes 2 equal areas","No, halves must be vertical","Only the diagonal cut makes halves","Halves can have different shapes or orientations as long as the two areas are equal.","The equality of the parts matters."),
spec("reason_whole_size","A quarter of a large pizza looks bigger than half of a small pizza. Is that possible?","Yes, because the wholes are different sizes","No, a half is always the largest piece","No, quarters and halves can never be compared","A fraction describes a part relative to its own whole; a larger whole can give a larger quarter.","Compare the wholes before the fractions."),
spec("find_missing_step","After making halves, then quarters, what operation makes eighths?","Halve each quarter","Join pairs of quarters","Halve only one quarter","Each of the 4 quarters must split into 2 equal parts to make 8 eighths.","Apply the halving to every part."),
spec("combine_eighths","Which amount equals one-half of the same whole?","four-eighths","two-eighths","six-eighths","Half of 8 equal parts is 4 parts.","Divide 8 parts into two equal groups.","ac9m2n03-t-013"),
spec("diagnose_fraction_error","A diagram has 4 equal parts and 1 shaded. A student calls it one-eighth. What should it be called?","one-quarter","one-half","four-eighths","One of 4 equal parts is one-quarter.","Name the fraction from the total equal parts."),
spec("reason_about_sequence","Why do the names change from halves to quarters to eighths during repeated halving?","The number of equal parts doubles each time","The whole becomes larger each time","The pieces stop being equal","Repeated halving doubles 2 to 4 to 8 equal parts.","Track the number of equal parts."),
]

build("AC9M2N01", N01_P, N01_T)
build("AC9M2N02", N02_P, N02_T)
build("AC9M2N03", N03_P, N03_T)

for code in ("ac9m2n01", "ac9m2n02", "ac9m2n03"):
    route = ROOT / "quiz/year-2/math" / code
    for relative in ("index.html", "practice/index.html"):
        page = route / relative
        html = page.read_text()
        html = html.replace("Practice draws from 48 questions", "Practice draws from 24 questions")
        html = html.replace("from a 48-question bank", "from a 24-question bank")
        html = html.replace("from a 48-question practice bank", "from a 24-question practice bank")
        html = html.replace('<span class="summary-number">48</span><span class="summary-label">Question bank</span>', '<span class="summary-number">24</span><span class="summary-label">Question bank</span>')
        page.write_text(html)
print("Built AC9M2N01-03: 24 Practice + 16 Test each")
