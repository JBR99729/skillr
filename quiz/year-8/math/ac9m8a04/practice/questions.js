"use strict";
const graphVisual = (kind) => {
  const base = '<svg viewBox="0 0 220 150" role="img" aria-label="linear graph visual" style="max-width:260px;width:100%;height:auto"><rect x="0" y="0" width="220" height="150" fill="white"/><line x1="20" y1="75" x2="200" y2="75" stroke="#999"/><line x1="110" y1="20" x2="110" y2="130" stroke="#999"/><text x="202" y="79" font-size="10">x</text><text x="114" y="18" font-size="10">y</text>';
  const end = '</svg>';
  const parts = {
    up: '<line x1="35" y1="125" x2="185" y2="25" stroke="#2457d6" stroke-width="4"/><text x="38" y="34" font-size="12">positive slope</text>',
    down: '<line x1="35" y1="25" x2="185" y2="125" stroke="#2457d6" stroke-width="4"/><text x="38" y="34" font-size="12">negative slope</text>',
    horizontal: '<line x1="30" y1="48" x2="190" y2="48" stroke="#2457d6" stroke-width="4"/><text x="34" y="41" font-size="12">y = 5</text>',
    shallowDown: '<line x1="30" y1="58" x2="190" y2="98" stroke="#2457d6" stroke-width="4"/><text x="34" y="50" font-size="12">small negative slope</text>',
    shadeBelow: '<polygon points="30,75 190,20 190,130 30,130" fill="#dbeafe"/><line x1="30" y1="75" x2="190" y2="20" stroke="#2457d6" stroke-width="4"/><text x="36" y="126" font-size="12">shade below</text>'
  };
  return base + (parts[kind] || parts.up) + end;
};
const raw = [
  ["p-001","parameters","If the coefficient of x is negative, the line:",["slopes up from left to right","slopes down from left to right","is horizontal","is vertical"],1,"A negative coefficient of x gives a negative slope, so the line falls as x increases.","down"],
  ["p-002","parameters","The graph of y = 3x + 2 slopes:",["up from left to right","down from left to right","flat","vertical"],0,"The coefficient of x is positive, so the line rises from left to right.","up"],
  ["p-003","parameters","The graph of y = −4x + 1 slopes:",["up","down","flat","vertical"],1,"The coefficient of x is negative, so the graph slopes down.","down"],
  ["p-004","parameters","For positive coefficients, increasing the coefficient of x usually makes the line:",["steeper","flatter","horizontal","vertical"],0,"A larger absolute coefficient gives a steeper gradient.","up"],
  ["p-005","parameters","Changing the constant term b in y = mx + b shifts the line:",["left or right only","up or down","into a curve","into a vertical line"],1,"The constant b is the y-intercept, so changing it moves the line vertically."],
  ["p-006","parameters","The graph of y = 0x + 5 is:",["vertical","horizontal","diagonal","curved"],1,"Since y is always 5, the graph is a horizontal line.","horizontal"],
  ["p-007","parameters","The graph of y = −x passes through:",["(1, 1)","(1, −1)","(−1, −1)","(0, 1)"],1,"When x = 1, y = −1, so (1, −1) lies on the graph."],
  ["p-008","parameters","The graph of y = 2x is steeper than:",["y = 3x","y = x","y = 4x","y = −2x"],1,"For positive slopes, 2 is steeper than 1 but less steep than 3 or 4."],
  ["p-009","parameters","The graph of y = −0.5x is:",["steep","shallow","vertical","horizontal"],1,"The absolute value of the gradient is 0.5, so the slope is shallow.","shallowDown"],
  ["p-010","parameters","The graph of y = 10x is:",["very steep","very flat","horizontal","vertical"],0,"A gradient of 10 is large, so the line is very steep.","up"],
  ["p-011","inequalities","The graph of y < 2x is:",["below the line y = 2x","above the line y = 2x","left of the line y = 2x","right of the line y = 2x"],0,"For y < 2x, the solution region is below the boundary line.","shadeBelow"],
  ["p-012","inequalities","The graph of y > 2x is:",["below the line y = 2x","above the line y = 2x","left of the line y = 2x","right of the line y = 2x"],1,"For y > 2x, the solution region is above the boundary line."],
  ["p-013","inequalities","−y < 2x is equivalent to:",["y > −2x","y < −2x","y > 2x","y < 2x"],0,"Multiplying both sides by −1 reverses the inequality: y > −2x."],
  ["p-014","inequalities","The boundary line of y < −2x slopes:",["up","down","flat","vertical"],1,"The boundary line has gradient −2, so it slopes down."],
  ["p-015","inequalities","−y > −2x simplifies to:",["y < 2x","y > 2x","y < −2x","y > −2x"],0,"Multiplying by −1 reverses the inequality: y < 2x."],
  ["p-016","inequalities","The graph of y > −x is:",["above the line y = −x","below the line y = −x","left of the line y = −x","right of the line y = −x"],0,"The greater-than symbol means the region is above the boundary line."],
  ["p-017","inequalities","The graph of y < x is:",["above the line y = x","below the line y = x","left of the line y = x","right of the line y = x"],1,"The less-than symbol means the region is below the boundary line."],
  ["p-018","inequalities","−y < −x simplifies to:",["y > x","y < x","y > −x","y < −x"],0,"Multiplying both sides by −1 reverses the inequality to y > x."],
  ["p-019","inequalities","The graph of y > 0 is:",["above the x-axis","below the x-axis","left of the y-axis","right of the y-axis"],0,"y-values greater than 0 are above the x-axis."],
  ["p-020","inequalities","The graph of y < 0 is:",["above the x-axis","below the x-axis","left of the y-axis","right of the y-axis"],1,"y-values less than 0 are below the x-axis."],
  ["p-021","integer solutions","For 2x + 3y = 48, if x = 0, then y =",["12","14","16","18"],2,"Substitute x = 0: 3y = 48, so y = 16."],
  ["p-022","integer solutions","For 2x + 3y = 48, if x = 3, then y =",["12","14","15","16"],1,"2(3) + 3y = 48 gives 6 + 3y = 48, so y = 14."],
  ["p-023","integer solutions","For 2x + 3y = 48, if x = 6, then y =",["10","12","14","16"],1,"12 + 3y = 48 gives 3y = 36, so y = 12."],
  ["p-024","integer solutions","For 2x + 3y = 48, if x = 9, then y =",["8","10","12","14"],1,"18 + 3y = 48 gives 3y = 30, so y = 10."]
];
window.skillrPracticeQuestions = raw.map(([id,section,question,answers,correct,explanation,visualKey],i)=>({
  id:`ac9m8a04-${id}`, curriculumCode:"AC9M8A04", bank:"practice", section, sourceNumber:i+1,
  skill:"experimenting with linear functions, inequalities and integer solutions", printable:true, type:"single", question, audioPrompt:question,
  visual:"", visualHtml:visualKey?graphVisual(visualKey):"", visualMeta:visualKey?{type:"svg",alt_text:"Simple coordinate graph visual for a linear function or inequality"}:{type:"none",alt_text:""},
  answers, correct, explanation, structuredExplanation:{summary:explanation,hint:"Check the slope, intercept, inequality direction or substitution step."}, qualitySchema:"production-v1"
}));
window.quizQuestions = window.skillrPracticeQuestions;
