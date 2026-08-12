"use strict";
(() => {
  const target = window.SkillrDailyQuestionExtensions =
    window.SkillrDailyQuestionExtensions || {};
  target.F = target.F || {};
  target.F.math = target.F.math || {};

  function convert(code, skill, count, start=0){
    const source = window.SkillrFoundationRebuild.build(code, "quiz", count + start).slice(start);
    return source.map((question, index) => ({
      ...question,
      id: `daily-ext-${skill}-${code.toLowerCase()}-${String(index+1).padStart(3,"0")}`,
      year: "F",
      subject: "math",
      skill,
      set: Math.floor(index / 8),
      learningArea: code,
      bank: "daily-drill"
    }));
  }

  target.F.math["numbers-to-20"] = [
    ...convert("AC9MFN03","numbers-to-20",32)
  ];

  target.F.math["addition-subtraction"] = [
    ...convert("AC9MFN04","addition-subtraction",24),
    ...convert("AC9MFN05","addition-subtraction",32)
  ];

  target.F.math["equal-groups-sharing"] = [
    ...convert("AC9MFN06","equal-groups-sharing",40)
  ];

  target.F.math["repeating-patterns"] = [
    ...convert("AC9MFA01","repeating-patterns",40)
  ];

  target.F.math["measurement-shapes-data"] = [
    ...convert("AC9MFM01","measurement-shapes-data",12),
    ...convert("AC9MFM02","measurement-shapes-data",12),
    ...convert("AC9MFSP01","measurement-shapes-data",12),
    ...convert("AC9MFSP02","measurement-shapes-data",12),
    ...convert("AC9MFST01","measurement-shapes-data",12)
  ];
})();
