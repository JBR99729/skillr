"use strict";
const makeQuestion = ({ id, section, sourceNumber, skill, question, answers, correct, explanation }) => ({
  id,
  curriculumCode: "AC9M8M04",
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
  explanation,
  structuredExplanation: { summary: explanation, hint: "For itinerary questions, add the travel duration first, then convert to the destination UTC offset." },
  qualitySchema: "production-v1"
});

window.skillrTestQuestions = [
  makeQuestion({ id: "ac9m8m04-t-001", section: "DST and UTC language", sourceNumber: 25, skill: "recognise DST states", question: "Which state does NOT observe daylight saving time?", answers: ["NSW", "Victoria", "Queensland", "Tasmania"], correct: 2, explanation: "Queensland does not observe daylight saving time." }),
  makeQuestion({ id: "ac9m8m04-t-002", section: "DST and UTC language", sourceNumber: 26, skill: "compare Australian time zones", question: "Sydney is UTC+10 and Perth is UTC+8. What is the time difference?", answers: ["1 hour", "2 hours", "3 hours", "4 hours"], correct: 1, explanation: "UTC+10 is 2 hours ahead of UTC+8, so Sydney is 2 hours ahead of Perth." }),
  makeQuestion({ id: "ac9m8m04-t-003", section: "DST and UTC language", sourceNumber: 27, skill: "convert meeting times", question: "A meeting is at 9:00 am in Sydney, UTC+10. What time is it in Perth, UTC+8?", answers: ["6:00 am", "7:00 am", "8:00 am", "9:00 am"], correct: 2, explanation: "Perth is 2 hours behind Sydney, so 9:00 am becomes 7:00 am? Wait: UTC+8 is two hours behind UTC+10, so 9:00 am Sydney is 7:00 am Perth." }),
  makeQuestion({ id: "ac9m8m04-t-004", section: "DST and UTC language", sourceNumber: 28, skill: "compare DST offsets", question: "If Sydney moves from UTC+10 to UTC+11 and Perth remains UTC+8, what is the new time difference?", answers: ["2 hours", "3 hours", "4 hours", "5 hours"], correct: 1, explanation: "UTC+11 is 3 hours ahead of UTC+8, so the new difference is 3 hours." }),
  makeQuestion({ id: "ac9m8m04-t-005", section: "DST and UTC language", sourceNumber: 29, skill: "convert international meeting times", question: "Sydney is UTC+10 and the time is 4:00 pm. What is the time in London, UTC+0?", answers: ["4:00 am", "6:00 am", "8:00 am", "10:00 am"], correct: 1, explanation: "London is 10 hours behind Sydney, so 4:00 pm becomes 6:00 am." }),
  makeQuestion({ id: "ac9m8m04-t-006", section: "DST and UTC language", sourceNumber: 30, skill: "interpret negative UTC offsets", question: "What does UTC−5 mean?", answers: ["5 hours ahead of UTC", "5 hours behind UTC", "Same as UTC", "No offset"], correct: 1, explanation: "UTC−5 means the local time is 5 hours behind UTC." }),
  makeQuestion({ id: "ac9m8m04-t-007", section: "International itineraries", sourceNumber: 31, skill: "calculate arrival local time", question: "A flight leaves Sydney, UTC+10, at 10:00 am and arrives in Singapore, UTC+8, after 8 hours. What is the local arrival time?", answers: ["4:00 pm", "6:00 pm", "8:00 pm", "10:00 pm"], correct: 0, explanation: "After 8 hours it is 6:00 pm in Sydney. Singapore is 2 hours behind Sydney, so the local arrival time is 4:00 pm." }),
  makeQuestion({ id: "ac9m8m04-t-008", section: "International itineraries", sourceNumber: 32, skill: "calculate arrival local time", question: "A flight leaves Perth, UTC+8, at 9:00 am and arrives in Tokyo, UTC+9, after 9 hours. What is the local arrival time?", answers: ["5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"], correct: 2, explanation: "After 9 hours it is 6:00 pm in Perth. Tokyo is 1 hour ahead, so arrival is 7:00 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-009", section: "International itineraries", sourceNumber: 33, skill: "calculate arrival across midnight", question: "A flight leaves Melbourne, UTC+10, at 11:00 pm and arrives in Bangkok, UTC+7, after 9 hours. What is the local arrival time?", answers: ["4:00 am", "5:00 am", "6:00 am", "7:00 am"], correct: 1, explanation: "After 9 hours it is 8:00 am Melbourne time. Bangkok is 3 hours behind, so arrival is 5:00 am local time." }),
  makeQuestion({ id: "ac9m8m04-t-010", section: "International itineraries", sourceNumber: 34, skill: "calculate half-hour itinerary offsets", question: "A flight leaves Brisbane, UTC+10, at 8:00 am and arrives in Delhi, UTC+5:30, after 12 hours. What is the local arrival time?", answers: ["3:30 pm", "5:30 pm", "7:30 pm", "9:30 pm"], correct: 0, explanation: "After 12 hours it is 8:00 pm in Brisbane. Delhi is 4 hours 30 minutes behind, so arrival is 3:30 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-011", section: "International itineraries", sourceNumber: 35, skill: "calculate half-hour itinerary offsets", question: "A flight leaves Adelaide, UTC+9:30, at 6:00 am and arrives in Seoul, UTC+9, after 10 hours. What is the local arrival time?", answers: ["2:00 pm", "3:30 pm", "4:00 pm", "5:00 pm"], correct: 1, explanation: "After 10 hours it is 4:00 pm in Adelaide. Seoul is 30 minutes behind Adelaide, so arrival is 3:30 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-012", section: "International itineraries", sourceNumber: 36, skill: "calculate arrival across midnight", question: "A flight leaves Sydney, UTC+10, at 7:00 pm and arrives in Jakarta, UTC+7, after 7 hours. What is the local arrival time?", answers: ["9:00 pm", "10:00 pm", "11:00 pm", "12:00 am"], correct: 2, explanation: "After 7 hours it is 2:00 am in Sydney. Jakarta is 3 hours behind, so arrival is 11:00 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-013", section: "International itineraries", sourceNumber: 37, skill: "calculate arrival local time", question: "A flight leaves Canberra, UTC+10, at 6:00 am and arrives in Manila, UTC+8, after 8 hours. What is the local arrival time?", answers: ["10:00 am", "11:00 am", "12:00 pm", "2:00 pm"], correct: 2, explanation: "After 8 hours it is 2:00 pm in Canberra. Manila is 2 hours behind, so arrival is 12:00 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-014", section: "International itineraries", sourceNumber: 38, skill: "calculate arrival local time", question: "A flight leaves Hobart, UTC+10, at 1:00 pm and arrives in Hong Kong, UTC+8, after 10 hours. What is the local arrival time?", answers: ["9:00 pm", "10:00 pm", "11:00 pm", "12:00 am"], correct: 0, explanation: "After 10 hours it is 11:00 pm in Hobart. Hong Kong is 2 hours behind, so arrival is 9:00 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-015", section: "International itineraries", sourceNumber: 39, skill: "calculate half-hour itinerary offsets", question: "A flight leaves Darwin, UTC+9:30, at 3:00 pm and arrives in Kuala Lumpur, UTC+8, after 6 hours. What is the local arrival time?", answers: ["7:00 pm", "7:30 pm", "8:00 pm", "9:00 pm"], correct: 1, explanation: "After 6 hours it is 9:00 pm in Darwin. Kuala Lumpur is 1 hour 30 minutes behind, so arrival is 7:30 pm local time." }),
  makeQuestion({ id: "ac9m8m04-t-016", section: "International itineraries", sourceNumber: 40, skill: "calculate same-offset itinerary", question: "A flight leaves Perth, UTC+8, at 11:00 pm and arrives in Shanghai, UTC+8, after 9 hours. What is the local arrival time?", answers: ["6:00 am", "7:00 am", "8:00 am", "9:00 am"], correct: 2, explanation: "Perth and Shanghai use the same UTC offset in this problem, so 11:00 pm plus 9 hours is 8:00 am the next day." })
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
