(() => {
  "use strict";

  const code = "AC9M3M04";
  const sheetId = (number) => `${code.toLowerCase()}-topic-practice-${number}`;
  const q = (number, sheet, tier, item) => ({
    id: `${sheetId(sheet)}-q${number}`,
    sheet_id: sheetId(sheet),
    tier,
    enrichment: tier === "extension",
    ...item
  });

  const questions = [
    q(1, 1, "warm-up", {
      type: "single",
      question: "Which digital time means five minutes past eight?",
      answers: ["8:05", "8:50", "5:08", "8:5"],
      answer: "8:05.",
      summary: "Five minutes past 8 is written with 8 as the hour and 05 as the minutes.",
      hint: "Put the hour before the colon and use two digits for the minutes."
    }),
    q(2, 1, "warm-up", {
      type: "fill-blank",
      question: "Complete the time.",
      template: "27 minutes past 3 is written {{blank}}.",
      answer: "3:27.",
      summary: "The hour stays 3 and the 27 minutes are written after the colon.",
      hint: "Write the hour first, then the exact number of minutes past the hour."
    }),
    q(3, 1, "warm-up", {
      type: "single",
      question: "At 6:35, where should the hour hand be?",
      answers: ["Between 6 and 7, past halfway toward 7", "Exactly on 7", "Exactly on 6", "Between 5 and 6"],
      answer: "Between 6 and 7, past halfway toward 7.",
      summary: "Thirty-five minutes is more than half an hour, so the hour hand has moved more than halfway from 6 toward 7.",
      hint: "At 6:30 the hour hand is halfway between 6 and 7; five more minutes moves it a little farther."
    }),
    q(4, 1, "core", {
      type: "text",
      question: "Describe exactly where both hands should be at 1:53.",
      answer: "The minute hand is on minute 53, which is three minute marks after the 10 and two marks before the 11. The hour hand is between 1 and 2, very close to 2 but not on it.",
      summary: "At 1:53, 53 minutes have passed since 1 o'clock, so the minute hand marks 53 and the hour hand is almost at 2.",
      hint: "Find minute 50 at the 10, count three more minute marks, then place the hour hand almost at 2."
    }),
    q(5, 1, "core", {
      type: "match",
      question: "Match each spoken time to its digital time.",
      matchLeft: ["18 minutes past 9", "42 minutes past 11", "4 minutes past 7"],
      matchRight: ["7:04", "11:42", "9:18"],
      answer: "18 minutes past 9 → 9:18; 42 minutes past 11 → 11:42; 4 minutes past 7 → 7:04.",
      summary: "The hour is written before the colon and the minutes past the hour are written after it.",
      hint: "Match the hour first, then check the minute digits; remember that 4 minutes is written 04."
    }),
    q(6, 1, "core", {
      type: "fill-blank",
      question: "Complete the digital notation.",
      template: "Nine minutes past 2 is 2:{{blank}}.",
      answer: "09.",
      summary: "A one-digit minute value needs a leading zero, so nine minutes past 2 is 2:09.",
      hint: "Digital clocks use two minute digits after the colon."
    }),
    q(7, 1, "core", {
      type: "text",
      question: "A student reads 10:58 as 11:58 because the hour hand is close to 11. Explain the correction.",
      answer: "The correct time is 10:58. The hour hand has passed 10 and is almost at 11 because 58 minutes of the 10 o'clock hour have elapsed; it does not become 11 until 11:00.",
      summary: "When the hour hand is between two numbers, use the hour it has already passed, not the next hour it is approaching.",
      hint: "Ask which hour the hour hand passed most recently, then read the minute hand."
    }),
    q(8, 1, "extension", {
      type: "single",
      question: "The minute hand is on minute 47 and the hour hand is between 9 and 10, close to 10. Which digital time matches?",
      answers: ["9:47", "10:47", "9:43", "10:13"],
      answer: "9:47.",
      summary: "The minute hand gives 47 minutes, while the hour hand shows that 9 is the hour that has already passed.",
      hint: "Read minute 47 exactly, then use the earlier of the two hour numbers because the hand has not reached 10 yet."
    }),
    q(9, 2, "warm-up", {
      type: "single",
      question: "The minute hand is on minute 42 and the hour hand is between 11 and 12. Which digital time matches?",
      answers: ["11:42", "12:42", "11:24", "10:42"],
      answer: "11:42.",
      summary: "Minute 42 is written after the colon, and the hour hand is still in the 11 o'clock hour.",
      hint: "Use the minute hand for 42 and the hour that has already been passed for 11."
    }),
    q(10, 2, "warm-up", {
      type: "single",
      question: "Which digital time is correctly written for four minutes past 7?",
      answers: ["7:04", "7:4", "4:07", "7:40"],
      answer: "7:04.",
      summary: "Digital time uses two digits for minutes, so four minutes is written 04.",
      hint: "The hour is 7; add a leading zero before the 4 minutes."
    }),
    q(11, 2, "core", {
      type: "text",
      question: "At 5:31, a student draws the hour hand exactly on 5. What should be changed?",
      answer: "Move the hour hand to between 5 and 6, just past halfway toward 6. At 31 minutes past 5, the hour hand has already moved a little more than half of the distance from 5 to 6.",
      summary: "The hour hand moves continuously as minutes pass; it does not remain fixed on 5 until 6:00.",
      hint: "Use 5:30 as a benchmark: the hour hand is halfway at 30 minutes, then moves slightly farther by 5:31."
    }),
    q(12, 2, "core", {
      type: "text",
      question: "Describe where both hands are at 12:59.",
      answer: "The minute hand is on minute 59, one minute mark before 12. The hour hand is between 12 and 1 and is extremely close to 1, but it has not reached 1 yet.",
      summary: "Fifty-nine minutes have nearly completed the 12 o'clock hour, so both hands are close to their next-hour positions without reaching 1:00.",
      hint: "Place the minute hand one mark before 12, then put the hour hand almost on 1."
    }),
    q(13, 2, "core", {
      type: "single",
      question: "Which ‘minutes to’ description matches 5:38?",
      answers: ["22 minutes to 6", "38 minutes to 6", "22 minutes past 6", "38 minutes to 5"],
      answer: "22 minutes to 6.",
      summary: "There are 60 − 38 = 22 minutes remaining until the next hour, which is 6.",
      hint: "Subtract the minutes past 5 from 60, then name the next hour."
    }),
    q(14, 2, "core", {
      type: "text",
      question: "Why is looking only at the numbered 5-minute positions not enough to read 4:26 accurately?",
      answer: "The numbered positions show multiples of 5 minutes, but 26 is one individual minute mark after 25. To read 4:26, count the small minute marks as well as the numbered 5-minute positions.",
      summary: "Nearest-minute reading requires the individual minute marks between the labelled 5-minute positions.",
      hint: "Find 25 minutes at the 5, then count one extra minute mark."
    }),
    q(15, 2, "extension", {
      type: "text",
      question: "Explain how the hour hand changes from 4:00 to 4:59. Where is it at 4:30 and at 4:59?",
      answer: "The hour hand moves continuously from 4 toward 5 during the whole hour. At 4:30 it is halfway between 4 and 5. At 4:59 it is just before 5, because the next hour has not started yet.",
      summary: "The hour hand's position shows how much of the current hour has passed, not only the hour number.",
      hint: "Use 30 minutes as halfway through the hour and 59 minutes as almost a full hour."
    }),
    q(16, 2, "extension", {
      type: "text",
      question: "A clock has its minute hand on minute 52 and its hour hand between 7 and 8, close to 8. State the digital time and explain how both hands confirm it.",
      answer: "7:52. The minute hand gives 52 minutes, and the hour hand has passed 7 but has not yet reached 8, which confirms that the time is still in the 7 o'clock hour.",
      summary: "Both hands must agree: the minute hand gives the exact minutes and the hour hand identifies the current hour.",
      hint: "Read the minute hand first, then choose the hour that the short hand has already passed."
    })
  ];

  const unit = window.SkillrYear3MathsData?.[code];
  if (unit) {
    unit.worksheet = questions;
    if (unit.commercial_master) {
      unit.commercial_master.sheets = [1, 2].map((number) => ({
        id: sheetId(number),
        title: `Topic Practice ${number}`,
        questions: questions.filter((item) => item.sheet_id === sheetId(number))
      }));
    }
  }

  window.SkillrYear3MathsWorksheetData = Object.assign(
    window.SkillrYear3MathsWorksheetData || {},
    {
      [code]: {
        title: unit?.title || "Analog and Digital Time to the Minute",
        questions,
        yearLabel: "Year 3 Maths"
      }
    }
  );
})();
