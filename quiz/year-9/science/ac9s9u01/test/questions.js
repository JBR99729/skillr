"use strict";
const raw = [
[25,"Section C — Electrical impulses vs hormones","Reflex control","Reflex actions are controlled by:",["Electrical impulses","Hormones","Blood pressure","Digestive enzymes"],0,"Reflex actions are rapid nervous-system responses carried by electrical impulses through neurons.","Reflexes are nervous responses."],
[26,"Section C — Electrical impulses vs hormones","Growth control","Growth and development are mainly controlled by:",["Hormones","Electrical impulses","Reflex arcs","Muscles"],0,"Hormones help regulate longer-term processes such as growth, development and puberty.","Long-term development is hormone controlled."],
[27,"Section C — Electrical impulses vs hormones","Fight-or-flight systems","Fight-or-flight response uses:",["Both electrical impulses and hormones","Hormones only","Electrical impulses only","Digestive system"],0,"The response begins rapidly through the nervous system and is supported by hormones such as adrenaline.","Fight-or-flight uses both systems."],
[28,"Section C — Electrical impulses vs hormones","Glucose regulation system","Blood glucose regulation uses:",["Hormones","Electrical impulses","Reflex arcs","Muscles"],0,"Insulin and glucagon are hormones that help regulate blood glucose concentration.","Glucose regulation mainly uses hormones."],
[29,"Section C — Electrical impulses vs hormones","Pain signal","Pain response begins with:",["Electrical impulses","Hormones","Blood cells","Enzymes"],0,"Pain receptors send electrical impulses through sensory neurons.","Pain signals begin as nerve impulses."],
[30,"Section C — Electrical impulses vs hormones","Puberty control","Puberty is controlled by:",["Hormones","Electrical impulses","Reflex arcs","Muscles"],0,"Puberty involves hormonal changes that affect growth and reproductive development.","Puberty is hormone controlled."],
[31,"Section D — Negative feedback and regulation","Negative feedback purpose","Negative feedback aims to:",["Restore balance","Increase change","Stop all responses","Remove stimuli"],0,"Negative feedback detects a change and activates responses that return conditions toward normal.","Negative feedback restores balance."],
[32,"Section D — Negative feedback and regulation","Sweating trigger","In thermoregulation, sweating is triggered when temperature:",["Rises","Falls","Stays constant","Stops changing"],0,"Sweating helps reduce high body temperature by cooling the skin through evaporation.","Sweating responds to high temperature."],
[33,"Section D — Negative feedback and regulation","Insulin trigger","In blood glucose regulation, insulin is released when glucose:",["Rises","Falls","Is stable","Is absent"],0,"Insulin lowers high blood glucose by promoting glucose uptake and storage.","High glucose triggers insulin."],
[34,"Section D — Negative feedback and regulation","Glucagon trigger","In blood glucose regulation, glucagon is released when glucose:",["Falls","Rises","Is stable","Is too high"],0,"Glucagon raises low blood glucose by signalling the liver to release glucose.","Low glucose triggers glucagon."],
[35,"Section D — Negative feedback and regulation","Diabetes regulation issue","Diabetes occurs when the body cannot properly regulate:",["Blood glucose","Blood pressure","Temperature","Heart rate"],0,"Diabetes involves problems with insulin action or insulin production, affecting blood glucose regulation.","Diabetes is linked to blood glucose regulation."],
[36,"Section D — Negative feedback and regulation","Hypothermia","Hypothermia occurs when negative feedback:",["Fails to raise body temperature","Raises temperature too much","Stops sweating","Increases metabolism excessively"],0,"Hypothermia occurs when body temperature falls dangerously low and warming responses are not enough.","Hypothermia is dangerously low body temperature."],
[37,"Section D — Negative feedback and regulation","Insulin injection role","Insulin injections help regulate glucose by acting as:",["Artificial hormones","Electrical impulses","Enzymes","Receptors"],0,"Injected insulin replaces or supplements the hormone signal needed to lower blood glucose.","Injected insulin acts like the hormone insulin."],
[38,"Section D — Negative feedback and regulation","Sports drink purpose","Sports drinks help maintain performance by replacing:",["Electrolytes","Hormones","Enzymes","Blood cells"],0,"During prolonged sweating, the body can lose water and electrolytes such as salts.","Sports drinks can replace electrolytes."],
[39,"Section D — Negative feedback and regulation","Diabetes and vision","Diabetes-induced blindness can occur because high glucose damages:",["Blood vessels in the eye","Neurons in the spine","Skin cells","Hormone receptors"],0,"Long-term high blood glucose can damage small blood vessels in the retina.","The eye's small blood vessels can be damaged."],
[40,"Section D — Negative feedback and regulation","Thyroid feedback failure","Negative feedback failure in thyroid disorders often leads to:",["Abnormal metabolism","Improved reflexes","Faster nerve impulses","Stronger muscles"],0,"Thyroid hormones help regulate metabolic rate, so disrupted feedback can affect metabolism.","Thyroid feedback affects metabolism."]
];
window.skillrTestQuestions = raw.map(([sourceNumber, section, skill, question, answers, correct, summary, hint]) => ({
  id: `ac9s9u01-t-${String(sourceNumber - 24).padStart(3,"0")}`,
  curriculumCode: "AC9S9U01",
  bank: "test",
  section,
  sourceNumber,
  skill,
  printable: true,
  type: "single",
  question,
  audioPrompt: question,
  visual: "",
  visualHtml: "",
  visualMeta: { type: "none", alt_text: "" },
  answers,
  correct,
  explanation: `${summary}\nHint: ${hint}`,
  structuredExplanation: { summary, hint },
  qualitySchema: "production-v1"
}));
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
