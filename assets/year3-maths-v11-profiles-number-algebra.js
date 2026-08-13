(() => {
  "use strict";

  // Authored profiles: every curriculum elaboration has its own teachable example,
  // visual contract and diagnostic checkpoint. Nothing in this object is inferred.
  window.SkillrYear3MathsV11NumberAlgebraProfiles = {
    "AC9M3N01:E1": {
      plainLanguageConcept: "A number keeps its value when one place-value unit is renamed as 10 of the next smaller unit, because the exchanged pieces are equivalent.",
      context: "Rename 1,574 with place-value blocks.", component: "place", parameters: { Given: "1,574", Model: "1 thousand, 5 hundreds, 7 tens, 4 ones → 15 hundreds, 7 tens, 4 ones", Result: "Both representations equal 1,574" }, contract: { value: [1000, 99999], places: [4, 5], exchangeRate: [10, 10] },
      accessibleDescription: "Two place-value representations of 1,574 linked by an exchange arrow: one thousand becomes ten hundreds.",
      teacherDoes: "Build 1,574, exchange the thousand for 10 hundreds, then recount every place.", teacherSaysOrAsks: "What changed, and why did the total stay 1,574?", studentDoes: "Rebuilds and records both equivalent place-value partitions.", whatToLookFor: "The student adds the exchanged 10 hundreds to the existing 5 hundreds.",
      checkpointPrompt: "Write 2,346 with no thousands blocks.", expectedAnswer: "23 hundreds, 4 tens and 6 ones", acceptableEvidence: ["23 hundreds + 4 tens + 6 ones", "2,300 + 40 + 6", "A correct place-value drawing"], likelyError: "Writes 20 hundreds and loses the original 3 hundreds.", remediation: "Exchange 2 thousands for 20 hundreds, then physically join the existing 3 hundreds before counting."
    },
    "AC9M3N01:E2": {
      plainLanguageConcept: "Large-number names repeat ones, tens and hundreds inside each three-digit group, so spacing digits in groups helps us read and write them accurately.",
      context: "Read and write four hundred and twenty-five thousand.", component: "table", parameters: { Given: "four hundred and twenty-five thousand", Model: "Thousands group: 425 | Ones group: 000", Result: "425 000" }, contract: { groups: [2, 3], digitsPerGroup: [3, 3], value: [10000, 99999999] },
      accessibleDescription: "A place-value table groups 425 in the thousands period and 000 in the ones period, forming 425,000.",
      teacherDoes: "Places 425 in the thousands period and fills the ones period with three zeros.", teacherSaysOrAsks: "Which three-digit group does the word thousand name?", studentDoes: "Says each group and writes the numeral with a clear group space.", whatToLookFor: "Three placeholder zeros appear after 425.",
      checkpointPrompt: "Write seventy-two thousand and six as a numeral.", expectedAnswer: "72 006", acceptableEvidence: ["72 006", "72006", "A table showing 72 thousands and 006 ones"], likelyError: "Writes 72 600 because the empty hundreds and tens places are not held.", remediation: "Use a six-place chart and place 6 only in the ones column before filling empty places with zeros."
    },
    "AC9M3N01:E3": {
      plainLanguageConcept: "Adding one can trigger exchanges through several places when a place already contains 9.",
      context: "Find one more than 19,999.", component: "workedCards", parameters: { Given: "19,999 + 1", Model: "9 ones → 0 and carry; repeat through tens and hundreds", Result: "20,000" }, contract: { start: [99, 99999], increment: [1, 100], steps: [1, 5] },
      accessibleDescription: "A sequence shows 19,999 increasing by one, with each group of ten renamed until the result is 20,000.",
      teacherDoes: "Adds one counter and exchanges each completed group of ten from right to left.", teacherSaysOrAsks: "Which digits change, and where does the exchange stop?", studentDoes: "Predicts, then verifies the next number with place value.", whatToLookFor: "The student explains the zeros as completed groups, not as digits simply disappearing.",
      checkpointPrompt: "What is one more than 10,099?", expectedAnswer: "10,100", acceptableEvidence: ["10,100", "10100", "10,099 + 1 = 10,100"], likelyError: "Answers 10,090 or 11,099 by changing the wrong place.", remediation: "Add one in the ones column and exchange only when a column reaches ten."
    },
    "AC9M3N01:E4": {
      plainLanguageConcept: "Numeral systems can use different symbols and rules; the value matters even when the written representation changes.",
      context: "Compare 2,304 with Japanese place-value symbols.", component: "table", parameters: { Given: "2,304", Model: "2 thousands, 3 hundreds, 0 tens, 4 ones | 二千三百四", Result: "Both represent two thousand three hundred and four" }, contract: { systems: [2, 2], value: [1, 99999], comparedPlaces: [1, 5] },
      accessibleDescription: "A comparison table aligns Hindu-Arabic digits and Japanese number symbols by their shared place values.",
      teacherDoes: "Matches each symbol group to its quantity without claiming the systems use identical writing rules.", teacherSaysOrAsks: "What quantity is shared even though the symbols look different?", studentDoes: "Matches representations and explains the shared value.", whatToLookFor: "The student compares mathematical value rather than visual appearance.",
      checkpointPrompt: "In a system where 三 means 3 and 百 means hundred, what value does 三百 represent?", expectedAnswer: "300", acceptableEvidence: ["300", "three hundred", "3 hundreds"], likelyError: "Reads the two symbols as 3 and 100 separately without combining their values.", remediation: "Build three groups of one hundred, then name the total before returning to the symbols."
    },
    "AC9M3N01:E5": {
      plainLanguageConcept: "Large numbers help describe long spans of time, and place value lets us compare those spans accurately and respectfully.",
      context: "Compare 60,000 years with 250 years on a timeline.", component: "numberline", parameters: { Given: "60,000 years and 250 years", Model: "0 ─ 250 ───────────────────────── 60,000", Result: "60,000 years is 59,750 years longer" }, contract: { minimum: [0, 0], maximum: [60000, 100000], markedValues: [2, 5] },
      accessibleDescription: "A not-to-scale timeline marks 250 near zero and 60,000 at the far end to emphasise the much longer period.",
      teacherDoes: "Locates both values and explicitly notes that the simple classroom line is not to scale.", teacherSaysOrAsks: "Which place first proves that 60,000 is greater than 250?", studentDoes: "Reads, orders and writes both numbers, then calculates the difference.", whatToLookFor: "The comparison uses place value and preserves the stated historical context respectfully.",
      checkpointPrompt: "Order 60,000, 6,000 and 600 from least to greatest.", expectedAnswer: "600, 6,000, 60,000", acceptableEvidence: ["600 < 6,000 < 60,000", "A correctly labelled ordered line"], likelyError: "Orders by the first digit only because every numeral begins with 6.", remediation: "Count and label the occupied places: hundreds, thousands, then tens of thousands."
    },

    "AC9M3N02:E1": {
      plainLanguageConcept: "A unit fraction is one equal part of one whole; the denominator tells how many equal parts make that whole.",
      context: "Divide one sandwich into 3 equal parts.", component: "fraction", parameters: { Given: "1 whole sandwich", Model: "3 equal pieces with 1 highlighted", Result: "The highlighted piece is 1/3" }, contract: { denominator: [2, 10], numerator: [1, 1], wholes: [1, 1] },
      accessibleDescription: "One rectangle is divided into three equal sections and exactly one section is highlighted as one-third.",
      teacherDoes: "Shows equal and unequal partitions and accepts only the equal partition as thirds.", teacherSaysOrAsks: "Why is one piece one-third rather than just one piece?", studentDoes: "Checks equal size, counts all parts and names one part.", whatToLookFor: "Both equality and the total of three parts appear in the explanation.",
      checkpointPrompt: "A whole is split into 5 equal parts. What fraction is one part?", expectedAnswer: "1/5", acceptableEvidence: ["1/5", "one-fifth", "A whole divided equally into five with one part marked"], likelyError: "Answers 5/1 by reversing the roles of numerator and denominator.", remediation: "Say 'one out of five equal parts' while pointing first to the marked part and then to all parts."
    },
    "AC9M3N02:E2": {
      plainLanguageConcept: "The same fraction can be shown with objects, a diagram, a story and symbols when every representation describes the same equal parts.",
      context: "Represent three-quarters four ways.", component: "workedCards", parameters: { Given: "3/4", Model: "3 of 4 counters; 3 shaded quarters; 3 of 4 equal apple pieces; fraction notation", Result: "Each model represents 3/4" }, contract: { denominator: [2, 10], numerator: [1, 9], representations: [3, 4] },
      accessibleDescription: "Four cards show three-quarters as counters, a shaded shape, an equal-sharing story and the notation 3/4.",
      teacherDoes: "Connects the counted total and selected parts across all four cards.", teacherSaysOrAsks: "What must stay the same when the representation changes?", studentDoes: "Labels the whole, four equal parts and the three selected parts in each model.", whatToLookFor: "The student identifies a consistent whole and equal partition in every representation.",
      checkpointPrompt: "Describe one diagram and one collection model for 2/5.", expectedAnswer: "A whole split into 5 equal parts with 2 marked, and a collection of 5 objects with 2 selected.", acceptableEvidence: ["A correct paired drawing", "A precise verbal description of both models", "Two marked parts out of five equal parts and two selected objects out of five"], likelyError: "Uses five shaded parts out of two or changes the size of the whole.", remediation: "Circle the whole first, count five equal parts, then mark exactly two."
    },
    "AC9M3N02:E3": {
      plainLanguageConcept: "When all equal fractional pieces are reassembled, their numerators count up to the denominator and the result is one whole.",
      context: "Reassemble four quarter pieces of an orange.", component: "fractionset", parameters: { Given: "1/4 + 1/4 + 1/4 + 1/4", Model: "Four equal quarter pieces join", Result: "4/4 = 1 whole" }, contract: { denominator: [2, 10], piecesUsed: [2, 10], wholes: [1, 1] },
      accessibleDescription: "Four equal orange quarters move together to form one complete circular orange.",
      teacherDoes: "Adds one equal piece at a time and counts one-quarter, two-quarters, three-quarters, four-quarters.", teacherSaysOrAsks: "How does the count tell us exactly when the whole is complete?", studentDoes: "Reassembles pieces and records the fraction total.", whatToLookFor: "The numerator reaches four because four quarters fill the whole.",
      checkpointPrompt: "How many fifths make one whole? Write the fraction equation.", expectedAnswer: "Five fifths; 1/5 + 1/5 + 1/5 + 1/5 + 1/5 = 5/5 = 1.", acceptableEvidence: ["5 fifths", "5/5 = 1", "A whole correctly assembled from five equal fifths"], likelyError: "Says four fifths because the student counts joins rather than pieces.", remediation: "Touch and count each equal piece, then compare the piece count with the denominator."
    },
    "AC9M3N02:E4": {
      plainLanguageConcept: "Equal sharing connects division and fractions: each person's share is one of the equal parts of the collection.",
      context: "Share 15 counters equally among 5 people.", component: "groups", parameters: { Given: "15 counters shared among 5 people", Model: "5 equal groups of 3", Result: "Each gets 3 counters, which is 1/5 of 15" }, contract: { total: [2, 100], groups: [2, 10], remainder: [0, 0] },
      accessibleDescription: "Fifteen counters are distributed into five equal circles, with three counters in every circle.",
      teacherDoes: "Deals counters one at a time into five labelled groups and connects 15 ÷ 5 with one-fifth of 15.", teacherSaysOrAsks: "Why is each group one-fifth even though it contains three counters?", studentDoes: "Shares, checks equality and states both the division and fraction relationship.", whatToLookFor: "The denominator names the five shares, not the number of counters in each share.",
      checkpointPrompt: "Share 12 counters equally among 3 people. What is one-third of 12?", expectedAnswer: "4 counters", acceptableEvidence: ["4", "12 ÷ 3 = 4", "Three equal groups of four"], likelyError: "Answers 3 because the denominator is copied as the share size.", remediation: "Deal all 12 counters into three groups and count one completed group."
    },

    "AC9M3N03:E1": {
      plainLanguageConcept: "Part-part-whole thinking reveals whether to join or separate quantities, and inverse operations can check the calculation.",
      context: "Find 368 − 145 and check by addition.", component: "bar", parameters: { Given: "368 total, 145 removed", Model: "145 + unknown = 368", Result: "223; check 223 + 145 = 368" }, contract: { operands: [2, 999], result: [0, 999], operations: [2, 2] },
      accessibleDescription: "A whole bar labelled 368 is split into a known part 145 and an unknown part 223, followed by an addition check.",
      teacherDoes: "Draws the whole and parts before calculating, then reverses the operation to check.", teacherSaysOrAsks: "Which value is the whole, and which inverse fact proves our answer?", studentDoes: "Partitions the numbers, calculates and records an inverse check.", whatToLookFor: "The diagram and operation agree about which quantity is unknown.",
      checkpointPrompt: "Solve 452 − 230 and give an addition check.", expectedAnswer: "222; 222 + 230 = 452", acceptableEvidence: ["222 with the correct inverse equation", "A correct part-part-whole diagram and check"], likelyError: "Checks by subtracting again instead of using addition.", remediation: "Cover the missing part on the bar and read the joining equation from the two visible parts."
    },
    "AC9M3N03:E2": {
      plainLanguageConcept: "Proportional place-value materials make each digit's value visible, so like units can be combined accurately.",
      context: "Add 214 and 325 with base-ten blocks.", component: "place", parameters: { Given: "214 + 325", Model: "2H 1T 4O + 3H 2T 5O", Result: "5H 3T 9O = 539" }, contract: { operands: [10, 999], places: [2, 3], regroupings: [0, 3] },
      accessibleDescription: "Two rows of proportional base-ten blocks combine to five hundreds, three tens and nine ones.",
      teacherDoes: "Aligns hundreds, tens and ones and combines only matching units.", teacherSaysOrAsks: "Why can ones join ones but not hundreds directly?", studentDoes: "Builds both addends, combines columns and names the result.", whatToLookFor: "Each digit is interpreted by place value rather than treated as an unlabelled count.",
      checkpointPrompt: "Use place value to find 132 + 246.", expectedAnswer: "378", acceptableEvidence: ["378", "1H+2H=3H, 3T+4T=7T, 2O+6O=8O", "A correct base-ten model"], likelyError: "Produces 3 hundreds, 6 tens and 8 ones by misaligning tens.", remediation: "Place the blocks on a labelled H-T-O mat before combining each column."
    },
    "AC9M3N03:E3": {
      plainLanguageConcept: "A helpful non-standard partition makes a friendly number first, while preserving the value of the addend.",
      context: "Calculate 485 + 365 by splitting 365 into 15 and 350.", component: "flow", parameters: { Given: "485 + 365", Model: "+15 → 500; +350 → 850", Result: "850" }, contract: { operands: [10, 999], partitionParts: [2, 4], result: [20, 1998] },
      accessibleDescription: "A two-step arrow flow moves from 485 to 500 by adding 15, then to 850 by adding the remaining 350.",
      teacherDoes: "Identifies 15 as the amount needed to reach 500 and verifies 15 + 350 = 365.", teacherSaysOrAsks: "How do we know the split addends still total 365?", studentDoes: "Chooses, records and checks a useful partition.", whatToLookFor: "No part of 365 is lost or counted twice.",
      checkpointPrompt: "Use a friendly-number partition to solve 298 + 146.", expectedAnswer: "444; for example, 298 + 2 + 144 = 444.", acceptableEvidence: ["444", "298 + 2 = 300, then +144 = 444", "Another correct partition that preserves 146"], likelyError: "Adds 2 to 298 but still adds all 146, producing 446.", remediation: "Write 146 = 2 + 144 before moving either part."
    },
    "AC9M3N03:E4": {
      plainLanguageConcept: "A difference stays unchanged when the same amount is added to both numbers, so compensation can create an easier subtraction.",
      context: "Solve 534 − 395 by adding 5 to both numbers.", component: "numberline", parameters: { Given: "534 − 395", Model: "Shift both endpoints +5: 539 − 400", Result: "139" }, contract: { minuend: [10, 999], subtrahend: [0, 999], compensation: [-100, 100] },
      accessibleDescription: "Two aligned number-line intervals, 395 to 534 and 400 to 539, have the same length of 139.",
      teacherDoes: "Shifts both endpoints equally and compares the unchanged gap.", teacherSaysOrAsks: "Why must we add 5 to both numbers, not just 395?", studentDoes: "Selects a compensation, writes the equivalent subtraction and solves it.", whatToLookFor: "The same signed change is applied to both values.",
      checkpointPrompt: "Use compensation to solve 627 − 298.", expectedAnswer: "329; 629 − 300 = 329.", acceptableEvidence: ["329", "627 + 2 − (298 + 2) = 629 − 300", "An equivalent number-line shift"], likelyError: "Calculates 627 − 300 and forgets that only the subtrahend changed.", remediation: "Move both endpoints two steps on paired number lines, then compare the equal gaps."
    },
    "AC9M3N03:E5": {
      plainLanguageConcept: "An efficient partition is chosen because it simplifies this calculation, not because one strategy is always best.",
      context: "Compare strategies for 399 + 256.", component: "workedCards", parameters: { Given: "399 + 256", Model: "Card 1: 300+200, 90+50, 9+6; Card 2: 400+255", Result: "Both give 655; compensation is shorter" }, contract: { strategies: [2, 4], operands: [10, 999], recordedSteps: [2, 8] },
      accessibleDescription: "Two solution cards reach 655; the compensation card uses fewer written steps than full place-value partitioning.",
      teacherDoes: "Solves with two valid strategies and compares the number and difficulty of steps.", teacherSaysOrAsks: "What feature of 399 makes one strategy especially useful?", studentDoes: "Chooses a strategy and justifies it using the numbers.", whatToLookFor: "The justification names proximity to 400 and preserves the total.",
      checkpointPrompt: "Which is more efficient for 497 + 238: full partitioning or making 500? Explain.", expectedAnswer: "Making 500; add 3 to 497 and then add the remaining 235 to get 735.", acceptableEvidence: ["Making 500 with a correct explanation", "497 + 3 + 235 = 735", "A different valid strategy with a convincing efficiency justification"], likelyError: "States a preference without connecting it to the values.", remediation: "Circle the number close to a hundred and calculate the exact distance to that hundred."
    },
    "AC9M3N03:E6": {
      plainLanguageConcept: "Place-value strategies scale to larger real totals because hundreds, tens and ones retain their values in context.",
      context: "Combine show crowds of 1,275 and 2,418.", component: "table", parameters: { Given: "1,275 + 2,418", Model: "Thousands 1+2; hundreds 2+4; tens 7+1; ones 5+8 with regrouping", Result: "3,693 visitors" }, contract: { operands: [100, 9999], places: [3, 4], contexts: [1, 1] },
      accessibleDescription: "A place-value table aligns two daily crowd counts and shows thirteen ones regrouped as one ten and three ones.",
      teacherDoes: "Connects each addend to its day, aligns place values and interprets the total with its unit.", teacherSaysOrAsks: "What does the 3 in 3,693 count in this situation?", studentDoes: "Calculates and communicates the answer as a crowd total.", whatToLookFor: "The numerical result includes the contextual unit and is reasonable.",
      checkpointPrompt: "A show has 1,346 visitors on Friday and 2,207 on Saturday. How many altogether?", expectedAnswer: "3,553 visitors", acceptableEvidence: ["3,553 visitors", "1346 + 2207 = 3553", "A correct place-value model with the contextual total"], likelyError: "Misaligns 1,346 and 2,207 or reports a bare number without meaning.", remediation: "Write both counts in a labelled thousands-hundreds-tens-ones table and finish with the word visitors."
    },

    "AC9M3N04:E1": {
      plainLanguageConcept: "Multiplication can describe equal groups, repeated addition, an array and a story; equivalent representations must keep both factors consistent.",
      context: "Represent 8 × 4 four ways.", component: "array", parameters: { Given: "8 × 4", Model: "8 rows of 4; 4+4+4+4+4+4+4+4; 8 bags with 4; number sentence", Result: "32" }, contract: { factors: [1, 99], representations: [3, 4], product: [1, 999] },
      accessibleDescription: "An eight-by-four dot array is paired with eight equal groups, repeated addition and the equation 8 times 4 equals 32.",
      teacherDoes: "Labels what each factor counts in every representation.", teacherSaysOrAsks: "Where can you see the 8 and the 4 in each model?", studentDoes: "Matches the array, story and equations and explains the factors.", whatToLookFor: "There are eight equal groups of four, not an unrelated 8-by-4 label.",
      checkpointPrompt: "Describe an array and a story for 6 × 3, then give the product.", expectedAnswer: "Six rows or groups of 3, totalling 18.", acceptableEvidence: ["A 6-by-3 array and 18", "Six equal groups of three in a valid story", "6 × 3 = 18 with matched representation"], likelyError: "Draws 6 + 3 objects rather than six groups of three.", remediation: "Make six circles first, then place exactly three counters in every circle."
    },
    "AC9M3N04:E2": {
      plainLanguageConcept: "The structure of a model shows whether a multiplicative problem asks for a total, a number of groups or the size of each group.",
      context: "Compare 5 packs of 6 pencils with 30 pencils shared into packs of 6.", component: "bar", parameters: { Given: "5 groups × 6; 30 ÷ 6", Model: "Five equal bar parts of 6 make 30", Result: "30 pencils; 5 packs" }, contract: { whole: [1, 999], equalParts: [1, 99], partValue: [1, 99] },
      accessibleDescription: "One bar of 30 is partitioned into five equal sections labelled 6, supporting both multiplication and division readings.",
      teacherDoes: "Covers the whole or one label in turn to make the unknown visible.", teacherSaysOrAsks: "What is unknown in this version: the whole, group count or group size?", studentDoes: "Chooses multiplication or division and explains the model's unknown.", whatToLookFor: "The operation follows the relationship shown, not a keyword guess.",
      checkpointPrompt: "There are 28 apples in bags of 4. How many bags?", expectedAnswer: "7 bags", acceptableEvidence: ["7 bags", "28 ÷ 4 = 7", "A bar or grouping model with seven groups of four"], likelyError: "Multiplies 28 by 4 because both numbers appear in the problem.", remediation: "Draw the whole 28 and repeatedly mark equal parts of 4 until the whole is partitioned."
    },
    "AC9M3N04:E3": {
      plainLanguageConcept: "A valid multiplication or division story must assign a clear meaning to every number and preserve equal groups.",
      context: "Create a story for 36 ÷ 4 = 9.", component: "workedCards", parameters: { Given: "36 ÷ 4 = 9", Model: "36 seedlings shared equally across 4 trays", Result: "9 seedlings on each tray" }, contract: { dividend: [1, 999], divisor: [1, 99], remainder: [0, 0] },
      accessibleDescription: "Thirty-six seedling icons are shown as four equal trays of nine, beside the matching division sentence.",
      teacherDoes: "Checks that the story begins with 36, creates four equal groups and asks for each share.", teacherSaysOrAsks: "What does each number mean in your story?", studentDoes: "Writes, models and solves a matching scenario.", whatToLookFor: "All groups are equal and the question genuinely asks for 9.",
      checkpointPrompt: "Create a grouping story for 24 ÷ 6 = 4.", expectedAnswer: "A valid story with 24 items arranged into groups of 6, making 4 groups.", acceptableEvidence: ["24 balls packed 6 per box gives 4 boxes", "Another equal-group story where 24 ÷ 6 = 4", "A matched labelled drawing"], likelyError: "Creates six groups of four while claiming the divisor means group size.", remediation: "Label whether 6 counts groups or items per group, then make the question match that choice."
    },
    "AC9M3N04:E4": {
      plainLanguageConcept: "Connected multiplication and division equations can record equal-group relationships described in community knowledge, provided the cultural context is taught from an authorised source.",
      context: "Use a teacher-approved local story representation showing 6 groups of 4 collected items.", component: "groups", parameters: { Given: "6 equal groups of 4", Model: "6 × 4 = 24; 24 ÷ 6 = 4", Result: "24 items altogether and 4 in each group" }, contract: { groups: [2, 20], groupSize: [1, 20], culturalSourceApproved: [1, 1] },
      accessibleDescription: "A neutral equal-groups diagram shows six groups of four; cultural imagery is included only when supplied or approved by the relevant community.",
      teacherDoes: "Uses an authorised account, separates cultural teaching from the mathematical diagram, and records connected equations.", teacherSaysOrAsks: "How do both equations describe the same equal-group relationship?", studentDoes: "Models the stated quantities and explains each factor, dividend and divisor.", whatToLookFor: "Mathematics is correct and students do not invent or generalise cultural details.",
      checkpointPrompt: "For 5 equal groups of 3, write one multiplication and one connected division equation.", expectedAnswer: "5 × 3 = 15 and 15 ÷ 5 = 3", acceptableEvidence: ["5 × 3 = 15 and 15 ÷ 5 = 3", "3 × 5 = 15 and 15 ÷ 3 = 5", "A correct fact family with a matched equal-groups model"], likelyError: "Writes a division equation not connected to the same three values.", remediation: "Circle the three fact-family numbers 5, 3 and 15 and use only those in both equations."
    },

    "AC9M3N05:E1": {
      plainLanguageConcept: "A benchmark area lets us estimate how much physical space a very large array will need before constructing it.",
      context: "Estimate paper for a 20,200-square grid using sheets that hold 100 squares.", component: "array", parameters: { Given: "20,200 squares; 100 squares per sheet", Model: "20,200 ÷ 100", Result: "About 202 sheets" }, contract: { quantity: [100, 100000], benchmark: [10, 1000], estimatePrecision: [10, 1000] },
      accessibleDescription: "A small sheet holding a ten-by-ten grid is repeated conceptually 202 times to represent 20,200 squares.",
      teacherDoes: "Measures one 100-square benchmark and scales the count before any wall construction.", teacherSaysOrAsks: "Why is one 100-square sheet a useful benchmark?", studentDoes: "Uses the benchmark to estimate sheet count and checks whether the space is realistic.", whatToLookFor: "The estimate connects the large total to a known unit area.",
      checkpointPrompt: "If one page holds 200 grid squares, about how many pages hold 10,000 squares?", expectedAnswer: "50 pages", acceptableEvidence: ["50 pages", "10,000 ÷ 200 = 50", "Five groups of 2,000 pages? no; a correct benchmark grouping"], likelyError: "Answers 500 by removing only one zero.", remediation: "Ask how many groups of 200 make 1,000 first, then scale that result to 10,000."
    },
    "AC9M3N05:E2": {
      plainLanguageConcept: "Large crowds can be estimated by counting a known section and multiplying by the number of similar sections.",
      context: "Estimate an assembly with 12 classes of about 24 students.", component: "groups", parameters: { Given: "12 classes; about 24 students each", Model: "12 × 24 ≈ 12 × 25", Result: "About 300 students" }, contract: { groups: [2, 100], benchmarkSize: [2, 1000], estimate: [10, 100000] },
      accessibleDescription: "Twelve class boxes are shown, each labelled about 24 students, with 25 used as a friendly benchmark.",
      teacherDoes: "Identifies a representative class size, counts classes and rounds to a useful benchmark.", teacherSaysOrAsks: "What assumptions make this estimate sensible?", studentDoes: "States the benchmark, calculates and labels the result as approximate.", whatToLookFor: "The student does not present 300 as an exact attendance count.",
      checkpointPrompt: "Eight teams have about 31 players each. Give a reasonable estimate of the total.", expectedAnswer: "About 240 players", acceptableEvidence: ["About 240", "8 × 30 = 240", "An estimate near 248 with a stated benchmark"], likelyError: "Adds 8 and 31 instead of scaling the group size.", remediation: "Draw eight equal team boxes and place the rounded 30 in each before calculating."
    },
    "AC9M3N05:E3": {
      plainLanguageConcept: "The useful rounding place depends on the size of the quantity and the decision the estimate needs to support.",
      context: "Choose nearest 10 for 47 dots and nearest 1,000 for a crowd of 18,620.", component: "table", parameters: { Given: "47 dots; 18,620 people", Model: "small count → nearest 10; large crowd → nearest 1,000", Result: "about 50 dots; about 19,000 people" }, contract: { values: [1, 99999], roundingPlaces: [10, 1000], scenarios: [2, 4] },
      accessibleDescription: "A decision table matches a small dot count to tens and a large venue crowd to thousands, with rounded results.",
      teacherDoes: "Compares how much detail is useful in each situation.", teacherSaysOrAsks: "Would rounding 47 dots to the nearest thousand tell us anything useful? Why not?", studentDoes: "Selects and justifies a rounding place before estimating.", whatToLookFor: "The justification considers scale and purpose, not a fixed rule for every number.",
      checkpointPrompt: "Would you round 286 library books to the nearest 10 or nearest 1,000? Give the estimate.", expectedAnswer: "Nearest 10; about 290 books.", acceptableEvidence: ["Nearest 10 and 290", "About 300 with a reasoned nearest-hundred choice", "A justified useful estimate that keeps appropriate detail"], likelyError: "Chooses nearest 1,000, making the estimate 0.", remediation: "Compare the size of one rounding unit with the whole collection and choose a unit much smaller than the total."
    },
    "AC9M3N05:E4": {
      plainLanguageConcept: "Rounding each addend gives a quick benchmark that can expose an unreasonable exact answer.",
      context: "Check 219 + 385 by rounding to hundreds.", component: "workedCards", parameters: { Given: "219 + 385", Model: "200 + 400", Result: "Estimate 600; exact 604 is reasonable" }, contract: { addends: [2, 999], roundingPlace: [10, 100], tolerance: [10, 200] },
      accessibleDescription: "One card shows the exact calculation 604 and another shows the rounded benchmark 600, with a small difference of 4.",
      teacherDoes: "Estimates first, calculates exactly, then compares the two results.", teacherSaysOrAsks: "Would 6,040 be reasonable? What does the estimate reveal?", studentDoes: "Uses the estimate to accept or reject a proposed calculation.", whatToLookFor: "The student compares magnitude rather than expecting estimate and exact answer to match.",
      checkpointPrompt: "Estimate 347 + 461 to the nearest hundred and decide whether 808 is reasonable.", expectedAnswer: "300 + 500 = 800, so 808 is reasonable.", acceptableEvidence: ["Estimate 800 and yes", "300 + 500 = 800; 808 is close", "A nearest-ten estimate supporting the same decision"], likelyError: "Rejects 808 because it is not exactly 800.", remediation: "Label 800 as approximately equal and compare how far 808 is from that benchmark."
    },

    "AC9M3N06:E1": {
      plainLanguageConcept: "A practical additive model must show what changes, connect every number to the situation and choose joining, separating or both.",
      context: "A class has 126 pencils, receives 48 and gives away 35.", component: "flow", parameters: { Given: "126 + 48 − 35", Model: "126 → 174 → 139", Result: "139 pencils remain" }, contract: { steps: [1, 4], values: [0, 9999], operations: [1, 2] },
      accessibleDescription: "A labelled flow begins with 126 pencils, adds 48 delivered pencils, then subtracts 35 given away, ending at 139.",
      teacherDoes: "Annotates every operation with the event that causes it.", teacherSaysOrAsks: "Which action makes the amount grow, and which makes it shrink?", studentDoes: "Formulates, solves and interprets the number sentence.", whatToLookFor: "All three numbers have explicit contextual roles.",
      checkpointPrompt: "There are 85 books; 27 arrive and 16 are borrowed. How many remain?", expectedAnswer: "96 books", acceptableEvidence: ["96 books", "85 + 27 − 16 = 96", "A correct two-step model and contextual answer"], likelyError: "Adds both changes because all numbers are treated as amounts received.", remediation: "Act out each event with counters and draw an up or down arrow beside it before choosing the operation."
    },
    "AC9M3N06:E2": {
      plainLanguageConcept: "A bar model exposes an unknown added part by showing that the starting amount and increase combine to make the final amount.",
      context: "Start with 75 tomatoes and finish with 138 after picking more.", component: "bar", parameters: { Given: "75 + unknown = 138", Model: "Whole 138 split into 75 and unknown", Result: "63 tomatoes picked" }, contract: { whole: [1, 9999], knownPart: [0, 9999], unknownParts: [1, 1] },
      accessibleDescription: "A bar of 138 tomatoes contains a labelled first part of 75 and a second unknown part resolved as 63.",
      teacherDoes: "Draws the final total as the whole and subtracts the known starting part.", teacherSaysOrAsks: "Why is 138 the whole even though it appears at the end of the story?", studentDoes: "Labels the bar, writes 75 + □ = 138 and solves.", whatToLookFor: "The unknown represents only the newly picked tomatoes.",
      checkpointPrompt: "Mia had 46 stickers and then had 91. How many did she gain?", expectedAnswer: "45 stickers", acceptableEvidence: ["45 stickers", "46 + 45 = 91", "91 − 46 = 45 with a correct bar model"], likelyError: "Adds 46 and 91 because the word gain suggests addition.", remediation: "Mark 91 as the whole bar and 46 as the known part; find only the missing section."
    },
    "AC9M3N06:E3": {
      plainLanguageConcept: "A multiplicative situation repeats an equal group, and multiplication efficiently records the same structure as repeated addition.",
      context: "Four tomato plants each have 6 tomatoes.", component: "groups", parameters: { Given: "4 equal groups of 6", Model: "6 + 6 + 6 + 6 = 4 × 6", Result: "24 tomatoes" }, contract: { groups: [1, 99], groupSize: [1, 99], product: [1, 9999] },
      accessibleDescription: "Four plant circles each contain six tomato dots, alongside repeated addition and multiplication equations.",
      teacherDoes: "Builds equal groups and labels which number counts plants and which counts tomatoes per plant.", teacherSaysOrAsks: "What makes multiplication suitable here?", studentDoes: "Models, chooses an equation and explains both factors.", whatToLookFor: "Every group is equal and the final unit is tomatoes.",
      checkpointPrompt: "Seven trays each hold 5 seedlings. How many seedlings?", expectedAnswer: "35 seedlings", acceptableEvidence: ["35 seedlings", "7 × 5 = 35", "5+5+5+5+5+5+5=35 with seven equal groups"], likelyError: "Adds 7 + 5 to get 12.", remediation: "Draw seven tray boxes and place five marks in each before recounting the total."
    },
    "AC9M3N06:E4": {
      plainLanguageConcept: "Division can ask either how many equal groups can be made or how many items belong in each group; multiplication checks both forms.",
      context: "Share 32 counters into 4 equal groups.", component: "groups", parameters: { Given: "32 ÷ 4", Model: "4 groups of 8", Result: "8 per group; check 4 × 8 = 32" }, contract: { dividend: [1, 9999], divisor: [1, 99], remainder: [0, 0] },
      accessibleDescription: "Thirty-two counters are distributed evenly into four circles, eight per circle, with the multiplication check.",
      teacherDoes: "Contrasts four given groups with groups of four, then records the appropriate question.", teacherSaysOrAsks: "Does 4 name the number of groups or the size of each group here?", studentDoes: "Builds, divides and checks with multiplication.", whatToLookFor: "The interpretation matches the wording and model.",
      checkpointPrompt: "Forty biscuits are packed 5 per bag. How many bags, and what multiplication checks it?", expectedAnswer: "8 bags; 8 × 5 = 40", acceptableEvidence: ["8 bags and 8 × 5 = 40", "40 ÷ 5 = 8 with a matched grouping model"], likelyError: "Makes five bags of eight, changing what 5 means.", remediation: "Write '5 biscuits per bag' inside each bag before making groups until all 40 are used."
    },
    "AC9M3N06:E5": {
      plainLanguageConcept: "Different equal group counts create different share sizes, and each proposed sharing can be verified with a connected multiplication fact.",
      context: "Share 48 horses equally among 2, 4, 6 or 8 paddocks.", component: "table", parameters: { Given: "48 horses", Model: "2→24, 4→12, 6→8, 8→6", Result: "Each row gives an equal sharing and a factor pair of 48" }, contract: { total: [1, 9999], groupChoices: [2, 8], exactShares: [1, 999] },
      accessibleDescription: "A table pairs paddock counts 2, 4, 6 and 8 with equal shares 24, 12, 8 and 6 horses.",
      teacherDoes: "Models one row, asks students to complete others, and checks each product equals 48.", teacherSaysOrAsks: "What happens to each share as the number of paddocks increases?", studentDoes: "Calculates, represents and compares all four equal shares.", whatToLookFor: "Each quotient is exact and the inverse product is 48.",
      checkpointPrompt: "Share 36 animals equally among 3, 4 or 6 pens. Give each share.", expectedAnswer: "3 pens: 12 each; 4 pens: 9 each; 6 pens: 6 each.", acceptableEvidence: ["12, 9 and 6 with correct pen labels", "36÷3=12, 36÷4=9, 36÷6=6", "Correct equal-group drawings for all three"], likelyError: "Assumes more pens means more animals in each pen.", remediation: "Use the same 36 counters for each trial and physically compare the resulting group sizes."
    },

    "AC9M3N07:E1": {
      plainLanguageConcept: "An algorithm applies the same ordered rule repeatedly; recording each output makes doubling and halving patterns visible.",
      context: "Start at 3, double three times, then reverse by halving.", component: "flow", parameters: { Given: "Start 3", Model: "3 → 6 → 12 → 24 → 12 → 6 → 3", Result: "Halving reverses doubling for these whole-number outputs" }, contract: { start: [1, 1000], iterations: [1, 10], operations: [1, 2] },
      accessibleDescription: "A bidirectional arrow sequence doubles 3 to 6, 12 and 24, then halves back to 3.",
      teacherDoes: "Executes each instruction separately and records the ordered outputs.", teacherSaysOrAsks: "What stays predictable from one output to the next?", studentDoes: "Follows the algorithm, checks each step and describes the pattern.", whatToLookFor: "No step is skipped and the pattern statement refers to values, not just appearance.",
      checkpointPrompt: "Start at 5 and double three times. What outputs appear?", expectedAnswer: "10, 20, 40", acceptableEvidence: ["10, 20, 40", "5 → 10 → 20 → 40", "A correct three-step table"], likelyError: "Adds 2 each time instead of multiplying by 2.", remediation: "At every arrow, make a second equal copy of the current quantity and combine the copies."
    },
    "AC9M3N07:E2": {
      plainLanguageConcept: "A decision algorithm tests divisibility in a fixed order, and final digits reveal reliable patterns for multiples of 2, 5 and 10.",
      context: "Classify 30, 42 and 55.", component: "flow", parameters: { Given: "30, 42, 55", Model: "Ends 0? multiple of 10 and also 5,2; otherwise ends even? multiple of 2; ends 5? multiple of 5", Result: "30: 2,5,10; 42: 2; 55: 5" }, contract: { values: [0, 99999], decisions: [2, 5], categories: [3, 3] },
      accessibleDescription: "A decision tree sorts 30, 42 and 55 by last-digit tests into overlapping multiple-of-2, multiple-of-5 and multiple-of-10 categories.",
      teacherDoes: "Tests each number and emphasises that categories can overlap.", teacherSaysOrAsks: "Why must every multiple of 10 also be a multiple of 2 and 5?", studentDoes: "Runs the decisions and explains emerging last-digit patterns.", whatToLookFor: "30 is not forced into only one category.",
      checkpointPrompt: "Which of 24, 35 and 70 are multiples of 2, 5 and 10?", expectedAnswer: "24: 2; 35: 5; 70: 2, 5 and 10.", acceptableEvidence: ["Correct labels for all three numbers", "A correct decision-tree trace", "24→2, 35→5, 70→2/5/10"], likelyError: "Labels 70 only as a multiple of 10.", remediation: "Write 70 = 7×10, then split each ten into 2×5 to expose both other factors."
    },
    "AC9M3N07:E3": {
      plainLanguageConcept: "The rule 'double a number, then add one more copy' constructs three equal copies and therefore multiplies by 3.",
      context: "Use the rule for 3 × 7.", component: "workedCards", parameters: { Given: "Input 7", Model: "Double: 7+7=14; add one more 7: 14+7", Result: "21" }, contract: { input: [1, 999], steps: [2, 2], multiplier: [3, 3] },
      accessibleDescription: "Two worked cards show seven doubled to fourteen, then a third group of seven added to make twenty-one.",
      teacherDoes: "Links each instruction to one, two and then three copies of the input.", teacherSaysOrAsks: "Where are the three sevens in this algorithm?", studentDoes: "Writes clear instructions, swaps inputs with a peer and verifies outputs.", whatToLookFor: "The added value is the original input, not the doubled result.",
      checkpointPrompt: "Follow 'double, then add one more of the starting number' for an input of 8.", expectedAnswer: "24", acceptableEvidence: ["24", "8+8=16, then 16+8=24", "3×8=24"], likelyError: "Doubles 16 again and gets 32.", remediation: "Box the original input 8 and point back to that box for the final addition."
    },
    "AC9M3N07:E4": {
      plainLanguageConcept: "A sorting-and-total algorithm separates coin types, counts each group in cents and then combines the subtotals.",
      context: "Sort four 5-cent coins and three 10-cent coins.", component: "table", parameters: { Given: "4 × 5c and 3 × 10c", Model: "5c subtotal 20c; 10c subtotal 30c", Result: "50c total" }, contract: { coinTypes: [2, 2], coinCounts: [0, 100], centValues: [5, 10] },
      accessibleDescription: "A two-row table separates four five-cent coins from three ten-cent coins and combines subtotals of twenty and thirty cents.",
      teacherDoes: "Runs the instructions sort, count, multiply, subtotal and combine in order.", teacherSaysOrAsks: "Why calculate two subtotals before finding the total?", studentDoes: "Creates and tests precise instructions on a mixed coin collection.", whatToLookFor: "Coin count is not confused with cent value.",
      checkpointPrompt: "What total does the algorithm give for six 5-cent coins and two 10-cent coins?", expectedAnswer: "50 cents", acceptableEvidence: ["50c", "6×5c + 2×10c = 30c + 20c = 50c", "Correct sorted subtotals and total"], likelyError: "Adds the coin counts 6+2 and reports 8 cents.", remediation: "Label each row 'number of coins × value of each coin' before finding its subtotal."
    },

    "AC9M3A01:E1": {
      plainLanguageConcept: "A part-part-whole model generates a connected addition and subtraction fact family because the same three quantities can be joined or separated.",
      context: "Use parts 16 and 8 with whole 24.", component: "bar", parameters: { Given: "Parts 16 and 8; whole 24", Model: "16+8=24; 8+16=24; 24−8=16; 24−16=8", Result: "Four connected facts" }, contract: { whole: [1, 9999], parts: [2, 2], facts: [3, 4] },
      accessibleDescription: "A bar of twenty-four is split into parts sixteen and eight, beside its two addition and two subtraction facts.",
      teacherDoes: "Keeps one model visible while reading each equation from it.", teacherSaysOrAsks: "What role does 24 play in every fact?", studentDoes: "Builds, records and explains the complete fact family.", whatToLookFor: "Subtraction begins with the whole and all equations use the same three values.",
      checkpointPrompt: "Write the four connected facts for parts 13 and 9.", expectedAnswer: "13+9=22, 9+13=22, 22−13=9, 22−9=13", acceptableEvidence: ["All four correct equations", "A correct part-part-whole diagram with its fact family", "Equivalent equations using the same values 13, 9 and 22"], likelyError: "Writes 13−9=4 as part of the fact family.", remediation: "Point to the whole 22 and begin both subtraction facts with that number."
    },
    "AC9M3A01:E2": {
      plainLanguageConcept: "Inverse operations uncover an unknown by undoing the known change; the result can be checked in the original equation.",
      context: "Solve 27 + □ = 63.", component: "bar", parameters: { Given: "27 + unknown = 63", Model: "unknown = 63 − 27", Result: "36; check 27 + 36 = 63" }, contract: { values: [0, 9999], unknowns: [1, 1], calculatorUse: [0, 1] },
      accessibleDescription: "A whole bar of sixty-three contains a known part twenty-seven and a missing part thirty-six, followed by the original-equation check.",
      teacherDoes: "Identifies the operation that undoes adding 27, calculates and substitutes the result.", teacherSaysOrAsks: "Which operation isolates the missing addend, and how will you verify it?", studentDoes: "Solves with subtraction or counting on and checks by addition.", whatToLookFor: "The check makes the original sentence true.",
      checkpointPrompt: "Solve □ − 48 = 75 and check your answer.", expectedAnswer: "123; 123 − 48 = 75", acceptableEvidence: ["123 with the correct check", "48 + 75 = 123 then substitution", "A correct bar model showing whole 123"], likelyError: "Calculates 75−48 because the visible subtraction sign drives the operation choice.", remediation: "Mark the unknown as the whole; join the known removed part and remainder to reconstruct it."
    },
    "AC9M3A01:E3": {
      plainLanguageConcept: "Addition and subtraction can express balance and change within an authorised story or dance representation, while the cultural meaning remains grounded in its source.",
      context: "Use a teacher-approved local account represented mathematically as 18 participants, 7 move away and 11 remain.", component: "bar", parameters: { Given: "18 − 7 = 11", Model: "Whole 18 split into moved 7 and remaining 11", Result: "7 + 11 = 18 restores the whole" }, contract: { values: [0, 999], culturalSourceApproved: [1, 1], operations: [2, 2] },
      accessibleDescription: "A neutral part-part-whole diagram represents eighteen participants as groups of seven and eleven; any cultural visual is community-authorised.",
      teacherDoes: "Uses only an authorised account, identifies the quantities it provides and models their inverse relationship.", teacherSaysOrAsks: "How do the two equations preserve the balance of the same whole?", studentDoes: "Explains the number sentence without inventing cultural information.", whatToLookFor: "The mathematical connection is clear and source boundaries are respected.",
      checkpointPrompt: "A whole group of 20 separates into 8 and 12. Write connected addition and subtraction equations.", expectedAnswer: "8 + 12 = 20 and 20 − 8 = 12", acceptableEvidence: ["8+12=20 and 20−8=12", "12+8=20 and 20−12=8", "A complete fact family for 8, 12 and 20"], likelyError: "Changes the whole between the two equations.", remediation: "Keep one whole bar labelled 20 visible while reading both equations from its parts."
    },

    "AC9M3A02:E1": {
      plainLanguageConcept: "Known addition facts immediately provide related subtraction facts because subtraction undoes the joining.",
      context: "Use 8 + 7 = 15.", component: "bar", parameters: { Given: "8 + 7 = 15", Model: "Whole 15, parts 8 and 7", Result: "15−7=8 and 15−8=7" }, contract: { whole: [1, 20], parts: [2, 2], derivedFacts: [2, 3] },
      accessibleDescription: "A fifteen-unit bar splits into eight and seven, with arrows to the two related subtraction facts.",
      teacherDoes: "Covers each part in turn and reads the missing-part subtraction.", teacherSaysOrAsks: "If you know the addition fact, which subtraction facts cost no new counting?", studentDoes: "Derives and records both inverse facts.", whatToLookFor: "The student starts subtraction from 15, the whole.",
      checkpointPrompt: "From 9 + 6 = 15, write both related subtraction facts.", expectedAnswer: "15 − 9 = 6 and 15 − 6 = 9", acceptableEvidence: ["Both correct subtraction facts", "A correct fact-family triangle", "A part-part-whole model with both facts"], likelyError: "Writes 9−6=3 and treats it as the inverse fact.", remediation: "Label 15 as the whole and begin each take-away equation with the whole."
    },
    "AC9M3A02:E2": {
      plainLanguageConcept: "A systematic partition list changes one part by one and the other oppositely, ensuring every pair for the whole is included once.",
      context: "List all two-part partitions of 12.", component: "table", parameters: { Given: "Whole 12", Model: "0+12, 1+11, 2+10, …, 12+0", Result: "13 ordered partitions; 7 unordered pairs if reversals count once" }, contract: { whole: [1, 100], changePerRow: [1, 1], partsPerRow: [2, 2] },
      accessibleDescription: "A two-column table increases the first part from zero to twelve while the second decreases from twelve to zero.",
      teacherDoes: "Records adjacent rows and highlights the invariant sum of 12.", teacherSaysOrAsks: "How does your pattern prove there is no missing partition?", studentDoes: "Generates the list in order and explains its completeness.", whatToLookFor: "One part increases by one as the other decreases by one.",
      checkpointPrompt: "List all unordered two-part partitions of 6, counting reversals once.", expectedAnswer: "0+6, 1+5, 2+4, 3+3", acceptableEvidence: ["The four pairs 0/6, 1/5, 2/4, 3/3", "A complete systematic table stopping at the reversal point"], likelyError: "Omits zero or lists reversed pairs as new unordered partitions.", remediation: "Start with zero, change both parts by one each row and stop when the first part would exceed the second."
    },
    "AC9M3A02:E3": {
      plainLanguageConcept: "A known fact can be extended when place value or a nearby addend changes predictably, so mental calculation reuses rather than restarts knowledge.",
      context: "Extend 6 + 6 = 12 to 16 + 6 and 60 + 60.", component: "workedCards", parameters: { Given: "6+6=12", Model: "Add 10 to one addend → 16+6=22; make each addend ten times larger → 60+60=120", Result: "22 and 120" }, contract: { baseFacts: [0, 20], scaleFactors: [1, 100], offsets: [0, 100] },
      accessibleDescription: "Three cards connect six plus six to sixteen plus six and sixty plus sixty using labelled place-value changes.",
      teacherDoes: "Names precisely whether an addend is offset or both addends are scaled.", teacherSaysOrAsks: "Why does adding ten to one addend increase the sum by ten?", studentDoes: "States the known fact, the transformation and the derived fact.", whatToLookFor: "The result changes consistently with the transformation.",
      checkpointPrompt: "Use 7 + 7 = 14 to solve 17 + 7 and 70 + 70.", expectedAnswer: "24 and 140", acceptableEvidence: ["17+7=24 and 70+70=140", "Correct reasoning from the known double 7"], likelyError: "Adds a zero to 14 for both extensions, giving 140 for 17+7.", remediation: "Distinguish adding 10 to one addend from multiplying both addends by 10 with separate arrows."
    },

    "AC9M3A03:E1": {
      plainLanguageConcept: "Equal groups and repeated addition establish multiplication facts, and the same model generates related division facts.",
      context: "Build 4 groups of 5.", component: "groups", parameters: { Given: "4 groups of 5", Model: "5+5+5+5 = 4×5", Result: "20; 20÷4=5 and 20÷5=4" }, contract: { factors: [1, 10], targetTables: [3, 10], product: [1, 100] },
      accessibleDescription: "Four equal circles each contain five counters, followed by multiplication, repeated-addition and division facts.",
      teacherDoes: "Builds equal groups, counts the total and rearranges the same counters for division readings.", teacherSaysOrAsks: "What does each number count in 4 × 5 = 20?", studentDoes: "Models, says and records connected facts.", whatToLookFor: "Groups stay equal and division uses the same three fact-family values.",
      checkpointPrompt: "Model 3 groups of 10 and write one multiplication and one division fact.", expectedAnswer: "3 × 10 = 30 and 30 ÷ 3 = 10", acceptableEvidence: ["3×10=30 and 30÷3=10", "30÷10=3 with the matched multiplication", "A correct equal-groups model and connected facts"], likelyError: "Writes 3+10=13 because the factors are treated as addends.", remediation: "Make three separate groups and place ten counters in every group before counting all."
    },
    "AC9M3A03:E2": {
      plainLanguageConcept: "Multiples of five alternate between final digits 5 and 0 because adding five toggles between halfway to the next ten and a complete ten.",
      context: "Generate the first ten multiples of 5.", component: "table", parameters: { Given: "5×1 to 5×10", Model: "5,10,15,20,25,30,35,40,45,50", Result: "Every product ends in 5 or 0" }, contract: { multiplier: [1, 100], factor: [5, 5], rows: [5, 100] },
      accessibleDescription: "A two-column table lists multipliers one to ten and products five to fifty, with final digits five and zero highlighted alternately.",
      teacherDoes: "Generates values with a calculator or spreadsheet, then asks students to explain rather than merely notice the pattern.", teacherSaysOrAsks: "Why can no multiple of 5 in this list end in 3?", studentDoes: "Predicts later multiples and verifies them.", whatToLookFor: "The prediction uses the final-digit rule and the equal step of five.",
      checkpointPrompt: "Without calculating fully, could 235 be a multiple of 5? Explain.", expectedAnswer: "Yes, because it ends in 5; 5 × 47 = 235.", acceptableEvidence: ["Yes, it ends in 5", "235÷5=47", "A correct continuation of the multiples-of-5 pattern"], likelyError: "Says only numbers ending in 0 are multiples of 5.", remediation: "Count by fives aloud through two tens and highlight the alternating 5, 0 final digits."
    },
    "AC9M3A03:E3": {
      plainLanguageConcept: "Patterns in the 3, 4, 5 and 10 facts support fluent recall, while inverse division facts recover a missing factor.",
      context: "Use 4 × 7 = 28 to derive division facts.", component: "factfamily", parameters: { Given: "4×7=28", Model: "7×4=28; 28÷4=7; 28÷7=4", Result: "A complete multiplication-division fact family" }, contract: { targetFactors: [3, 10], otherFactor: [1, 12], familyFacts: [3, 4] },
      accessibleDescription: "A triangular fact-family model places 4, 7 and 28 at its corners and shows two multiplication and two division equations.",
      teacherDoes: "Practises recall, then covers one factor to make a division question.", teacherSaysOrAsks: "How can a multiplication fact answer a division question instantly?", studentDoes: "Recalls, derives and explains the connected facts.", whatToLookFor: "The quotient is the missing factor, not the product.",
      checkpointPrompt: "Use 5 × 8 = 40 to write both related division facts.", expectedAnswer: "40 ÷ 5 = 8 and 40 ÷ 8 = 5", acceptableEvidence: ["Both correct division facts", "A complete fact family using 5, 8 and 40"], likelyError: "Writes 8÷5 or 5÷8 because factor order is copied directly.", remediation: "Put the product 40 at the top of the fact triangle and begin both division facts with it."
    },
    "AC9M3A03:E4": {
      plainLanguageConcept: "A repeated-addition algorithm must state its starting value, repeat step and stopping decision; the outputs form a multiplication sequence.",
      context: "Generate the 4-times sequence to 40.", component: "flow", parameters: { Given: "Start 0; add 4; stop after 10 additions", Model: "0→4→8→12→…→40", Result: "The outputs are multiples of 4" }, contract: { increment: [3, 10], iterations: [1, 100], outputs: [2, 101] },
      accessibleDescription: "A flow sequence starts at zero and advances by four to forty, with a stop-after-ten decision box.",
      teacherDoes: "Compares a clear algorithm with one missing its stopping rule and traces every output.", teacherSaysOrAsks: "Which instruction prevents the algorithm from continuing forever?", studentDoes: "Follows, debugs and describes the emerging pattern.", whatToLookFor: "The rule, starting point and stopping decision are all explicit.",
      checkpointPrompt: "Write an algorithm that generates 5, 10, 15, 20 and then stops.", expectedAnswer: "Start at 5; output the number; if it is 20 stop, otherwise add 5 and repeat.", acceptableEvidence: ["A complete equivalent instruction sequence", "Start 0, add 5 four times, recording each output from 5 to 20", "A correct flowchart with a stopping decision"], likelyError: "States only 'count by fives' without a start or stop condition.", remediation: "Use three labelled boxes: START value, REPEAT action and STOP decision."
    }
  };
})();
