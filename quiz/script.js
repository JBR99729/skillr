"use strict";

/*
  QUIZ QUESTION FORMAT
  --------------------
  {
    question: "Your question",
    answers: ["Option A", "Option B", "Option C", "Option D"],
    correct: 1, // zero-based index: 0 = A, 1 = B, 2 = C, 3 = D
    explanation: "Why the answer is correct."
  }
*/

const quizQuestions = [
  {
    question: "Which number is 100 more than 347?",
    answers: ["357", "447", "437", "3470"],
    correct: 1,
    explanation: "Adding 100 increases the hundreds digit by 1, so 347 becomes 447."
  },
  {
    question: "Which equation shows 4 equal groups of 3?",
    answers: ["4 + 3", "4 × 3", "4 − 3", "4 ÷ 3"],
    correct: 1,
    explanation: "Four equal groups of three can be represented as 4 × 3 = 12."
  },
  {
    question: "What is the missing number: 250, 260, 270, ___, 290?",
    answers: ["271", "275", "280", "300"],
    correct: 2,
    explanation: "The pattern increases by 10 each time, so the missing number is 280."
  },
  {
    question: "Which fraction represents one of four equal parts?",
    answers: ["1/2", "1/3", "1/4", "4/1"],
    correct: 2,
    explanation: "One out of four equal parts is written as 1/4."
  },
  {
    question: "Sam has 18 stickers and gives away 7. How many remain?",
    answers: ["10", "11", "12", "25"],
    correct: 1,
    explanation: "18 − 7 = 11, so Sam has 11 stickers remaining."
  }
];

const quizConfig = {
  shuffleQuestions: true,
  shuffleAnswers: false,
  storageKey: "skillrQuizBestScore"
};

const elements = {
  startScreen: document.getElementById("startScreen"),
  quizScreen: document.getElementById("quizScreen"),
  resultScreen: document.getElementById("resultScreen"),
  startButton: document.getElementById("startButton"),
  submitButton: document.getElementById("submitButton"),
  nextButton: document.getElementById("nextButton"),
  restartButton: document.getElementById("restartButton"),
  reviewButton: document.getElementById("reviewButton"),
  questionCount: document.getElementById("questionCount"),
  bestScore: document.getElementById("bestScore"),
  questionNumber: document.getElementById("questionNumber"),
  questionText: document.getElementById("questionText"),
  answerList: document.getElementById("answerList"),
  feedback: document.getElementById("feedback"),
  progressText: document.getElementById("progressText"),
  progressBar: document.getElementById("progressBar"),
  liveScore: document.getElementById("liveScore"),
  percentageScore: document.getElementById("percentageScore"),
  finalScore: document.getElementById("finalScore"),
  finalTotal: document.getElementById("finalTotal"),
  resultMessage: document.getElementById("resultMessage"),
  reviewSection: document.getElementById("reviewSection"),
  reviewList: document.getElementById("reviewList")
};

let activeQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let score = 0;
let quizHistory = [];
let answerHasBeenChecked = false;

function shuffleArray(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function prepareQuestions() {
  const questions = quizConfig.shuffleQuestions
    ? shuffleArray(quizQuestions)
    : [...quizQuestions];

  return questions.map((question) => {
    if (!quizConfig.shuffleAnswers) {
      return { ...question, answers: [...question.answers] };
    }

    const answerObjects = question.answers.map((answer, index) => ({
      answer,
      isCorrect: index === question.correct
    }));

    const shuffledAnswers = shuffleArray(answerObjects);

    return {
      ...question,
      answers: shuffledAnswers.map((item) => item.answer),
      correct: shuffledAnswers.findIndex((item) => item.isCorrect)
    };
  });
}

function showScreen(screenToShow) {
  [elements.startScreen, elements.quizScreen, elements.resultScreen].forEach((screen) => {
    screen.classList.toggle("is-active", screen === screenToShow);
  });
}

function startQuiz() {
  activeQuestions = prepareQuestions();
  currentQuestionIndex = 0;
  selectedAnswerIndex = null;
  score = 0;
  quizHistory = [];
  answerHasBeenChecked = false;

  elements.liveScore.textContent = "0";
  elements.reviewSection.classList.add("is-hidden");
  elements.reviewButton.textContent = "Review answers";

  showScreen(elements.quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const question = activeQuestions[currentQuestionIndex];
  const questionPosition = currentQuestionIndex + 1;
  const progressPercentage = (questionPosition / activeQuestions.length) * 100;

  selectedAnswerIndex = null;
  answerHasBeenChecked = false;

  elements.questionNumber.textContent = `Question ${questionPosition}`;
  elements.questionText.textContent = question.question;
  elements.progressText.textContent = `Question ${questionPosition} of ${activeQuestions.length}`;
  elements.progressBar.style.width = `${progressPercentage}%`;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.submitButton.disabled = true;
  elements.submitButton.classList.remove("is-hidden");
  elements.nextButton.classList.add("is-hidden");
  elements.nextButton.textContent = questionPosition === activeQuestions.length
    ? "See results"
    : "Next question";

  elements.answerList.replaceChildren();

  question.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button");
    const answerLetter = document.createElement("span");
    const answerText = document.createElement("span");

    answerButton.type = "button";
    answerButton.className = "answer-option";
    answerButton.setAttribute("role", "radio");
    answerButton.setAttribute("aria-checked", "false");
    answerButton.dataset.index = String(index);

    answerLetter.className = "answer-letter";
    answerLetter.textContent = String.fromCharCode(65 + index);

    answerText.textContent = answer;

    answerButton.append(answerLetter, answerText);
    answerButton.addEventListener("click", () => selectAnswer(index));

    elements.answerList.appendChild(answerButton);
  });

  const firstAnswer = elements.answerList.querySelector(".answer-option");
  firstAnswer?.focus();
}

function selectAnswer(answerIndex) {
  if (answerHasBeenChecked) {
    return;
  }

  selectedAnswerIndex = answerIndex;
  elements.submitButton.disabled = false;

  const answerButtons = elements.answerList.querySelectorAll(".answer-option");
  answerButtons.forEach((button, index) => {
    button.setAttribute("aria-checked", String(index === answerIndex));
  });
}

function checkAnswer() {
  if (selectedAnswerIndex === null || answerHasBeenChecked) {
    return;
  }

  answerHasBeenChecked = true;

  const question = activeQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswerIndex === question.correct;
  const answerButtons = elements.answerList.querySelectorAll(".answer-option");

  if (isCorrect) {
    score += 1;
    elements.liveScore.textContent = String(score);
    elements.feedback.className = "feedback correct";
    elements.feedback.innerHTML = `<strong>Correct.</strong> ${question.explanation}`;
  } else {
    elements.feedback.className = "feedback incorrect";
    elements.feedback.innerHTML = `<strong>Not quite.</strong> ${question.explanation}`;
  }

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("is-correct");
    } else if (index === selectedAnswerIndex) {
      button.classList.add("is-wrong");
    }
  });

  quizHistory.push({
    question: question.question,
    selectedAnswer: question.answers[selectedAnswerIndex],
    correctAnswer: question.answers[question.correct],
    explanation: question.explanation,
    isCorrect
  });

  elements.submitButton.classList.add("is-hidden");
  elements.nextButton.classList.remove("is-hidden");
  elements.nextButton.focus();
}

function goToNextQuestion() {
  if (!answerHasBeenChecked) {
    return;
  }

  currentQuestionIndex += 1;

  if (currentQuestionIndex < activeQuestions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const total = activeQuestions.length;
  const percentage = Math.round((score / total) * 100);
  const bestScore = Number(localStorage.getItem(quizConfig.storageKey) || 0);

  if (score > bestScore) {
    localStorage.setItem(quizConfig.storageKey, String(score));
  }

  elements.percentageScore.textContent = `${percentage}%`;
  elements.finalScore.textContent = String(score);
  elements.finalTotal.textContent = String(total);
  elements.resultMessage.textContent = getResultMessage(percentage);
  elements.bestScore.textContent = String(Math.max(score, bestScore));

  buildReview();
  showScreen(elements.resultScreen);
  elements.restartButton.focus();
}

function getResultMessage(percentage) {
  if (percentage === 100) {
    return "Excellent work — every answer was correct.";
  }

  if (percentage >= 80) {
    return "Great result. Review the missed question and try for full marks.";
  }

  if (percentage >= 60) {
    return "Good effort. Use the answer review to strengthen the tricky parts.";
  }

  return "Keep practising. Read each explanation, then try the quiz again.";
}

function buildReview() {
  elements.reviewList.replaceChildren();

  quizHistory.forEach((item, index) => {
    const reviewItem = document.createElement("article");
    const title = document.createElement("h4");
    const status = document.createElement("p");
    const selected = document.createElement("p");
    const correct = document.createElement("p");
    const explanation = document.createElement("p");

    reviewItem.className = `review-item ${item.isCorrect ? "correct" : "incorrect"}`;
    title.textContent = `${index + 1}. ${item.question}`;

    status.className = "review-status";
    status.textContent = item.isCorrect ? "Correct" : "Incorrect";

    selected.innerHTML = `<strong>Your answer:</strong> ${escapeHtml(item.selectedAnswer)}`;
    correct.innerHTML = `<strong>Correct answer:</strong> ${escapeHtml(item.correctAnswer)}`;
    explanation.innerHTML = `<strong>Explanation:</strong> ${escapeHtml(item.explanation)}`;

    reviewItem.append(title, status, selected, correct, explanation);
    elements.reviewList.appendChild(reviewItem);
  });
}

function toggleReview() {
  const isHidden = elements.reviewSection.classList.toggle("is-hidden");
  elements.reviewButton.textContent = isHidden ? "Review answers" : "Hide review";

  if (!isHidden) {
    elements.reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function escapeHtml(value) {
  const temporary = document.createElement("div");
  temporary.textContent = value;
  return temporary.innerHTML;
}

function handleKeyboardShortcuts(event) {
  if (!elements.quizScreen.classList.contains("is-active")) {
    return;
  }

  const numericChoice = Number(event.key);

  if (!answerHasBeenChecked && numericChoice >= 1 && numericChoice <= 9) {
    const answerIndex = numericChoice - 1;

    if (answerIndex < activeQuestions[currentQuestionIndex].answers.length) {
      selectAnswer(answerIndex);
      elements.answerList.querySelector(`[data-index="${answerIndex}"]`)?.focus();
    }
  }

  if (event.key === "Enter" && !elements.submitButton.disabled && !answerHasBeenChecked) {
    checkAnswer();
  } else if (event.key === "Enter" && answerHasBeenChecked) {
    goToNextQuestion();
  }
}

function initialiseQuiz() {
  const bestScore = Number(localStorage.getItem(quizConfig.storageKey) || 0);

  elements.questionCount.textContent = String(quizQuestions.length);
  elements.bestScore.textContent = String(bestScore);

  elements.startButton.addEventListener("click", startQuiz);
  elements.submitButton.addEventListener("click", checkAnswer);
  elements.nextButton.addEventListener("click", goToNextQuestion);
  elements.restartButton.addEventListener("click", startQuiz);
  elements.reviewButton.addEventListener("click", toggleReview);
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

initialiseQuiz();
