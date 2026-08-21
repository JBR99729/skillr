"use strict";
(()=>{
  const q=(id,question,answers,correct,summary,hint)=>({
    id,
    curriculumCode:"AC9M7N04",
    bank:"practice",
    skill:"positive and negative rational numbers on number lines",
    printable:true,
    type:"single",
    question,
    audioPrompt:question,
    answers,
    correct,
    explanation:`${summary}\nHint: ${hint}`,
    structuredExplanation:{summary,hint},
    qualitySchema:"production-v2"
  });

  const extra=[
    q("ac9m7n04-p-e4-001","Which number lies furthest to the left on a number line?",["−3/4","−1/2","−5/6","−2/3"],2,"Among negative numbers, the value with the greatest magnitude is furthest left. −5/6 is less than −3/4, −2/3 and −1/2.","For negatives, farther from zero to the left means smaller."),
    q("ac9m7n04-p-e4-002","Which number is closest to zero?",["−7/8","−1/4","−3/5","−2/3"],1,"Distance from zero is absolute value. |−1/4| = 1/4 is the smallest distance.","Ignore the sign first and compare distances from zero."),
    q("ac9m7n04-p-e4-003","Which mixed numeral is equal to −7/3?",["−2 1/3","−2 2/3","−1 2/3","−3 1/3"],0,"7 ÷ 3 = 2 remainder 1, so −7/3 = −2 1/3.","Convert the improper fraction to a mixed numeral, then keep the negative sign."),
    q("ac9m7n04-p-e4-004","A number line runs from −5 to 2. Which value lies inside this interval and is closest to −5?",["−9/2","−11/3","−7/2","−13/4"],0,"−9/2 = −4.5, which lies in the interval and is only 0.5 from −5.","Convert or estimate each fraction, then compare its distance from −5."),
    q("ac9m7n04-p-e4-005","On a number line from 1 to 6, which value lies outside the displayed interval?",["7/4","2 1/3","−1/2","5 1/3"],2,"−1/2 is less than 1, so it is outside the interval from 1 to 6.","Check each value against both endpoints of the interval."),
    q("ac9m7n04-p-e4-006","Which statement is true about −5/6 and −1/4 on a number line?",["−5/6 lies to the right of −1/4","−5/6 lies to the left of −1/4","They represent the same point","Both are to the right of zero"],1,"−5/6 is more negative than −1/4, so it lies further left on the number line.","For negative fractions, the one with greater absolute value is usually further left.")
  ];

  window.skillrPracticeQuestions = window.skillrPracticeQuestions || [];
  window.skillrPracticeQuestions.push(...extra);
  window.quizQuestions = window.skillrPracticeQuestions;
})();
