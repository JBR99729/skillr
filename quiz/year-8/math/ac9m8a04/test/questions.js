"use strict";
const regressionVisual = (kind) => {
  const base = '<svg viewBox="0 0 220 150" role="img" aria-label="linear regression visual" style="max-width:260px;width:100%;height:auto"><rect x="0" y="0" width="220" height="150" fill="white"/><line x1="25" y1="125" x2="195" y2="125" stroke="#999"/><line x1="25" y1="20" x2="25" y2="125" stroke="#999"/>';
  const points = '<circle cx="55" cy="102" r="4" fill="#111"/><circle cx="85" cy="84" r="4" fill="#111"/><circle cx="118" cy="72" r="4" fill="#111"/><circle cx="150" cy="50" r="4" fill="#111"/><circle cx="178" cy="42" r="4" fill="#111"/>';
  const line = '<line x1="45" y1="104" x2="185" y2="35" stroke="#2457d6" stroke-width="4"/>';
  const end = '</svg>';
  return base + (kind === 'scatter' ? points + line : line) + end;
};
const raw = [
  ["t-001","integer solutions","For 2x + 3y = 48, if x = 12, then y =",["6","8","10","12"],1,"24 + 3y = 48 gives 3y = 24, so y = 8."],
  ["t-002","integer solutions","Which pair is a solution of 2x + 3y = 48?",["(6, 12)","(4, 10)","(8, 8)","(3, 15)"],0,"For (6, 12), 2×6 + 3×12 = 12 + 36 = 48."],
  ["t-003","integer solutions","Which pair is NOT a solution of 2x + 3y = 48?",["(0, 16)","(3, 14)","(6, 12)","(10, 6)"],3,"For (10, 6), 2×10 + 3×6 = 38, not 48."],
  ["t-004","integer solutions","For 2x + 3y = 48, if y must be an integer, x must be chosen so:",["x is any integer with no condition","x is a multiple of 2 only","48 − 2x is divisible by 3","48 − 3x is divisible by 2"],2,"Since y = (48 − 2x)/3, the numerator must be divisible by 3."],
  ["t-005","integer solutions","For 2x + 3y = 48, if x = 15, then y =",["4","6","8","10"],1,"30 + 3y = 48 gives 3y = 18, so y = 6."],
  ["t-006","integer solutions","How many non-negative integer solution pairs does 2x + 3y = 48 have?",["7","8","9","16"],2,"x must be 0, 3, 6, 9, 12, 15, 18, 21 or 24, giving 9 non-negative integer pairs."],
  ["t-007","regression","Linear regression models:",["curved relationships only","straight-line relationships","random data only","unrelated variables only"],1,"Linear regression fits a straight-line model to data.","scatter"],
  ["t-008","regression","In linear regression, the line is used to:",["predict values from a trend","create random noise","ignore variables","only produce negative values"],0,"A regression line can be used for prediction within a suitable context.","scatter"],
  ["t-009","regression","In AI and data modelling, linear regression can be used to:",["predict a numerical value from related input data","draw pictures only","translate languages only","play music only"],0,"Linear regression is a simple prediction model for numerical relationships."],
  ["t-010","regression","In the model y = mx + b, m represents:",["intercept","slope","output only","input only"],1,"m is the slope or rate of change."],
  ["t-011","regression","In the model y = mx + b, b represents:",["intercept","slope","output only","input only"],0,"b is the y-intercept, the value when x = 0."],
  ["t-012","regression","Linear regression finds a line that:",["maximises total error","minimises error as much as possible","ignores all error","makes all data points exactly equal"],1,"The fitted line is chosen to minimise overall error under a chosen rule."],
  ["t-013","regression","AI can use linear functions to:",["model relationships between variables","remove all relationships","hide patterns deliberately","create only random outputs"],0,"Linear functions can model simple relationships between input and output variables."],
  ["t-014","regression","A house-price prediction using floor area and price is an example of:",["linear regression if a straight-line trend is suitable","coin flipping","no mathematical modelling","only image analysis"],0,"A straight-line model can estimate a numerical output from an input such as floor area."],
  ["t-015","regression","A stock-price trend model may use:",["linear regression as one possible model","no modelling","only images","only sound"],0,"Linear regression is one possible model, though real stock prices can be much more complex."],
  ["t-016","regression","Linear regression is most useful when:",["the data show an approximately straight-line trend","the data are completely unrelated","the relationship is always vertical","there are no measurements"],0,"Regression is useful when a straight-line trend is a reasonable approximation.","scatter"]
];
window.skillrTestQuestions = raw.map(([id,section,question,answers,correct,explanation,visualKey],i)=>({
  id:`ac9m8a04-${id}`, curriculumCode:"AC9M8A04", bank:"test", section, sourceNumber:i+25,
  skill:"integer solutions and linear regression", printable:true, type:"single", question, audioPrompt:question,
  visual:"", visualHtml:visualKey?regressionVisual(visualKey):"", visualMeta:visualKey?{type:"svg",alt_text:"Scatterplot with a fitted straight regression line"}:{type:"none",alt_text:""},
  answers, correct, explanation, structuredExplanation:{summary:explanation,hint:"Substitute carefully or interpret the slope, intercept and regression trend."}, qualitySchema:"production-v1"
}));
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
