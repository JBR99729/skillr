"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const questions = Array.isArray(window.quizQuestions)
    ? window.quizQuestions
    : [];

  const config = {
    shuffleQuestions: true,
    storageKey: "skillrQuizBestScore",
    caseSensitiveText: false,
    ...(window.quizConfig || {})
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

  const requiredElements = [
    "startScreen",
    "quizScreen",
    "resultScreen",
    "startButton",
    "submitButton",
    "nextButton",
    "restartButton",
    "questionCount",
    "questionNumber",
    "questionText",
    "answerList",
    "feedback",
    "progressText",
    "progressBar",
    "liveScore",
    "percentageScore",
    "finalScore",
    "finalTotal",
    "resultMessage"
  ];

  const missingElements = requiredElements.filter(
    (name) => !elements[name]
  );

  if (missingElements.length > 0) {
    console.error(
      `Quiz could not start. Missing HTML IDs: ${missingElements.join(", ")}`
    );

    return;
  }

  if (questions.length === 0) {
    elements.questionCount.textContent = "0";
    elements.startButton.disabled = true;
    elements.startButton.textContent = "Questions not loaded";

    console.error(
      "Quiz could not start. window.quizQuestions is empty or questions.js did not load."
    );

    return;
  }

  let activeQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let answerChecked = false;
  let quizHistory = [];

  let selectedSingleIndex = null;
  let selectedMultipleIndexes = new Set();
  let orderedItems = [];

  function shuffleArray(items) {
    const copy = [...items];

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(
        Math.random() * (index + 1)
      );

      [copy[index], copy[randomIndex]] = [
        copy[randomIndex],
        copy[index]
      ];
    }

    return copy;
  }

  function prepareQuestions() {
    const prepared = questions.map((question) => ({
      ...question,

      answers: Array.isArray(question.answers)
        ? [...question.answers]
        : undefined,

      items: Array.isArray(question.items)
        ? [...question.items]
        : undefined,

      correct: Array.isArray(question.correct)
        ? [...question.correct]
        : question.correct,

      acceptedAnswers: Array.isArray(question.acceptedAnswers)
        ? [...question.acceptedAnswers]
        : undefined
    }));

    return config.shuffleQuestions
      ? shuffleArray(prepared)
      : prepared;
  }

  function showScreen(screenToShow) {
    [
      elements.startScreen,
      elements.quizScreen,
      elements.resultScreen
    ].forEach((screen) => {
      const active = screen === screenToShow;

      screen.hidden = !active;
      screen.classList.toggle("is-active", active);
    });
  }

  function startQuiz() {
    activeQuestions = prepareQuestions();

    currentQuestionIndex = 0;
    score = 0;
    answerChecked = false;
    quizHistory = [];

    elements.liveScore.textContent = "0";

    if (elements.reviewSection) {
      elements.reviewSection.classList.add("is-hidden");
    }

    if (elements.reviewButton) {
      elements.reviewButton.textContent = "Review answers";
    }

    showScreen(elements.quizScreen);
    renderQuestion();
  }

  function renderQuestion() {
    const question = activeQuestions[currentQuestionIndex];
    const position = currentQuestionIndex + 1;

    const progressPercentage =
      (position / activeQuestions.length) * 100;

    answerChecked = false;
    selectedSingleIndex = null;
    selectedMultipleIndexes = new Set();
    orderedItems = [];

    elements.questionNumber.textContent =
      `Question ${position}`;

    elements.questionText.textContent =
      question.question;

    elements.progressText.textContent =
      `Question ${position} of ${activeQuestions.length}`;

    elements.progressBar.style.width =
      `${progressPercentage}%`;

    elements.feedback.textContent = "";
    elements.feedback.className = "feedback";

    elements.submitButton.disabled = true;
    elements.submitButton.hidden = false;
    elements.submitButton.classList.remove("is-hidden");

    elements.nextButton.hidden = true;
    elements.nextButton.classList.add("is-hidden");

    elements.nextButton.textContent =
      position === activeQuestions.length
        ? "See results"
        : "Next question";

    elements.answerList.replaceChildren();

    if (question.image) {
      const image = document.createElement("img");

      image.src = question.image;
      image.alt = question.imageAlt || "";
      image.className = "question-image";

      elements.answerList.appendChild(image);
    }

    const type = question.type || "single";

    switch (type) {
      case "single":
      case "true-false":
        renderSingleChoice(question);
        break;

      case "multiple":
        renderMultipleChoice(question);
        break;

      case "text":
        renderTextInput(question);
        break;

      case "number":
        renderNumberInput(question);
        break;

      case "order":
        renderOrdering(question);
        break;

      default:
        elements.feedback.textContent =
          `Unsupported question type: ${type}`;

        console.error(
          `Unknown question type: ${type}`
        );
    }
  }

  function createAnswerButton(answer, index) {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const text = document.createElement("span");

    button.type = "button";
    button.className = "answer-option";
    button.dataset.index = String(index);
    button.setAttribute("aria-pressed", "false");

    letter.className = "answer-letter";
    letter.textContent =
      String.fromCharCode(65 + index);

    text.textContent = answer;

    button.append(letter, text);

    return button;
  }

  function renderSingleChoice(question) {
    question.answers.forEach((answer, index) => {
      const button =
        createAnswerButton(answer, index);

      button.addEventListener("click", () => {
        if (answerChecked) {
          return;
        }

        selectedSingleIndex = index;
        elements.submitButton.disabled = false;

        elements.answerList
          .querySelectorAll(".answer-option")
          .forEach((item, itemIndex) => {
            const selected =
              itemIndex === index;

            item.classList.toggle(
              "is-selected",
              selected
            );

            item.setAttribute(
              "aria-pressed",
              String(selected)
            );
          });
      });

      elements.answerList.appendChild(button);
    });
  }

  function renderMultipleChoice(question) {
    const hint = document.createElement("p");

    hint.className = "question-hint";
    hint.textContent =
      question.instruction ||
      "Select all correct answers.";

    elements.answerList.appendChild(hint);

    question.answers.forEach((answer, index) => {
      const button =
        createAnswerButton(answer, index);

      button.addEventListener("click", () => {
        if (answerChecked) {
          return;
        }

        if (selectedMultipleIndexes.has(index)) {
          selectedMultipleIndexes.delete(index);
        } else {
          selectedMultipleIndexes.add(index);
        }

        const selected =
          selectedMultipleIndexes.has(index);

        button.classList.toggle(
          "is-selected",
          selected
        );

        button.setAttribute(
          "aria-pressed",
          String(selected)
        );

        elements.submitButton.disabled =
          selectedMultipleIndexes.size === 0;
      });

      elements.answerList.appendChild(button);
    });
  }

  function renderTextInput(question) {
    const input = document.createElement("input");

    input.type = "text";
    input.id = "typedAnswer";
    input.className = "quiz-input";

    input.placeholder =
      question.placeholder ||
      "Type your answer";

    input.autocomplete = "off";

    input.addEventListener("input", () => {
      elements.submitButton.disabled =
        input.value.trim() === "";
    });

    elements.answerList.appendChild(input);
    input.focus();
  }

  function renderNumberInput(question) {
    const input = document.createElement("input");

    input.type = "number";
    input.id = "numberAnswer";
    input.className = "quiz-input";

    input.placeholder =
      question.placeholder ||
      "Enter a number";

    input.step = question.step || "any";

    input.addEventListener("input", () => {
      elements.submitButton.disabled =
        input.value.trim() === "";
    });

    elements.answerList.appendChild(input);
    input.focus();
  }

  function renderOrdering(question) {
    const hint = document.createElement("p");

    hint.className = "question-hint";

    hint.textContent =
      question.instruction ||
      "Use the arrows to arrange the items in the correct order.";

    orderedItems =
      question.shuffleItems === false
        ? [...question.items]
        : shuffleArray(question.items);

    elements.answerList.appendChild(hint);

    renderOrderItems();

    elements.submitButton.disabled = false;
  }

  function renderOrderItems() {
    const existingList =
      elements.answerList.querySelector(".order-list");

    if (existingList) {
      existingList.remove();
    }

    const list = document.createElement("ol");

    list.className = "order-list";

    orderedItems.forEach((item, index) => {
      const row = document.createElement("li");
      const label = document.createElement("span");
      const controls = document.createElement("span");

      const upButton =
        document.createElement("button");

      const downButton =
        document.createElement("button");

      row.className = "order-item";
      label.textContent = item;

      controls.className = "order-controls";

      upButton.type = "button";
      upButton.className = "order-button";
      upButton.textContent = "↑";

      upButton.setAttribute(
        "aria-label",
        `Move ${item} up`
      );

      upButton.disabled =
        index === 0 || answerChecked;

      downButton.type = "button";
      downButton.className = "order-button";
      downButton.textContent = "↓";

      downButton.setAttribute(
        "aria-label",
        `Move ${item} down`
      );

      downButton.disabled =
        index === orderedItems.length - 1 ||
        answerChecked;

      upButton.addEventListener("click", () => {
        [
          orderedItems[index - 1],
          orderedItems[index]
        ] = [
          orderedItems[index],
          orderedItems[index - 1]
        ];

        renderOrderItems();
      });

      downButton.addEventListener("click", () => {
        [
          orderedItems[index],
          orderedItems[index + 1]
        ] = [
          orderedItems[index + 1],
          orderedItems[index]
        ];

        renderOrderItems();
      });

      controls.append(
        upButton,
        downButton
      );

      row.append(
        label,
        controls
      );

      list.appendChild(row);
    });

    elements.answerList.appendChild(list);
  }

  function normaliseText(value) {
    const cleaned = String(value)
      .trim()
      .replace(/\s+/g, " ");

    return config.caseSensitiveText
      ? cleaned
      : cleaned.toLowerCase();
  }

  function arraysEqual(first, second) {
    return (
      first.length === second.length &&
      first.every(
        (value, index) =>
          value === second[index]
      )
    );
  }

  function setsEqual(first, second) {
    if (first.size !== second.size) {
      return false;
    }

    for (const value of first) {
      if (!second.has(value)) {
        return false;
      }
    }

    return true;
  }

  function evaluateAnswer(question) {
    const type = question.type || "single";

    if (
      type === "single" ||
      type === "true-false"
    ) {
      return {
        isCorrect:
          selectedSingleIndex === question.correct,

        selectedAnswer:
          selectedSingleIndex === null
            ? "No answer"
            : question.answers[
                selectedSingleIndex
              ],

        correctAnswer:
          question.answers[
            question.correct
          ]
      };
    }

    if (type === "multiple") {
      const correctSet =
        new Set(question.correct);

      return {
        isCorrect:
          setsEqual(
            selectedMultipleIndexes,
            correctSet
          ),

        selectedAnswer:
          [...selectedMultipleIndexes]
            .sort((a, b) => a - b)
            .map(
              (index) =>
                question.answers[index]
            )
            .join(", "),

        correctAnswer:
          [...question.correct]
            .sort((a, b) => a - b)
            .map(
              (index) =>
                question.answers[index]
            )
            .join(", ")
      };
    }

    if (type === "text") {
      const input =
        document.getElementById("typedAnswer");

      const userAnswer = input.value;

      const acceptedAnswers =
        question.acceptedAnswers ||
        [question.correct];

      const normalisedAccepted =
        acceptedAnswers.map(normaliseText);

      return {
        isCorrect:
          normalisedAccepted.includes(
            normaliseText(userAnswer)
          ),

        selectedAnswer: userAnswer,

        correctAnswer:
          String(acceptedAnswers[0])
      };
    }

    if (type === "number") {
      const input =
        document.getElementById("numberAnswer");

      const userNumber =
        Number(input.value);

      const correctNumber =
        Number(question.correct);

      const tolerance =
        Number(question.tolerance || 0);

      return {
        isCorrect:
          Number.isFinite(userNumber) &&
          Math.abs(
            userNumber - correctNumber
          ) <= tolerance,

        selectedAnswer: input.value,

        correctAnswer:
          String(question.correct)
      };
    }

    if (type === "order") {
      return {
        isCorrect:
          arraysEqual(
            orderedItems,
            question.correct
          ),

        selectedAnswer:
          orderedItems.join(" → "),

        correctAnswer:
          question.correct.join(" → ")
      };
    }

    return {
      isCorrect: false,
      selectedAnswer: "Unsupported",
      correctAnswer: "Unsupported"
    };
  }

  function markAnswerVisuals(question) {
    const type = question.type || "single";

    if (
      type === "single" ||
      type === "true-false"
    ) {
      elements.answerList
        .querySelectorAll(".answer-option")
        .forEach((button, index) => {
          button.disabled = true;

          if (index === question.correct) {
            button.classList.add(
              "is-correct"
            );
          } else if (
            index === selectedSingleIndex
          ) {
            button.classList.add(
              "is-wrong"
            );
          }
        });
    }

    if (type === "multiple") {
      const correctSet =
        new Set(question.correct);

      elements.answerList
        .querySelectorAll(".answer-option")
        .forEach((button, index) => {
          button.disabled = true;

          if (correctSet.has(index)) {
            button.classList.add(
              "is-correct"
            );
          } else if (
            selectedMultipleIndexes.has(index)
          ) {
            button.classList.add(
              "is-wrong"
            );
          }
        });
    }

    if (
      type === "text" ||
      type === "number"
    ) {
      const input =
        elements.answerList.querySelector("input");

      if (input) {
        input.disabled = true;
      }
    }

    if (type === "order") {
      renderOrderItems();
    }
  }

  function showFeedback(
    isCorrect,
    explanation
  ) {
    elements.feedback.replaceChildren();

    const heading =
      document.createElement("strong");

    heading.textContent =
      isCorrect
        ? "Correct. "
        : "Not quite. ";

    elements.feedback.append(
      heading,
      document.createTextNode(
        explanation || ""
      )
    );

    elements.feedback.className =
      `feedback ${
        isCorrect
          ? "correct"
          : "incorrect"
      }`;
  }

  function checkAnswer() {
    if (answerChecked) {
      return;
    }

    const question =
      activeQuestions[currentQuestionIndex];

    const result =
      evaluateAnswer(question);

    answerChecked = true;

    if (result.isCorrect) {
      score += 1;

      elements.liveScore.textContent =
        String(score);
    }

    markAnswerVisuals(question);

    showFeedback(
      result.isCorrect,
      question.explanation
    );

    quizHistory.push({
      question: question.question,
      selectedAnswer:
        result.selectedAnswer,
      correctAnswer:
        result.correctAnswer,
      explanation:
        question.explanation || "",
      isCorrect:
        result.isCorrect
    });

    elements.submitButton.hidden = true;

    elements.submitButton.classList.add(
      "is-hidden"
    );

    elements.nextButton.hidden = false;

    elements.nextButton.classList.remove(
      "is-hidden"
    );

    elements.nextButton.focus();
  }

  function goToNextQuestion() {
    if (!answerChecked) {
      return;
    }

    currentQuestionIndex += 1;

    if (
      currentQuestionIndex <
      activeQuestions.length
    ) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  function getResultMessage(percentage) {
    if (percentage === 100) {
      return "Excellent work — every answer was correct.";
    }

    if (percentage >= 80) {
      return "Great result. Review the missed questions and try for full marks.";
    }

    if (percentage >= 60) {
      return "Good effort. Use the answer review to strengthen the tricky parts.";
    }

    return "Keep practising. Read each explanation, then try the quiz again.";
  }

  function addReviewLine(
    container,
    label,
    value
  ) {
    const paragraph =
      document.createElement("p");

    const strong =
      document.createElement("strong");

    strong.textContent =
      `${label}: `;

    paragraph.append(
      strong,
      document.createTextNode(value)
    );

    container.appendChild(paragraph);
  }

  function buildReview() {
    if (!elements.reviewList) {
      return;
    }

    elements.reviewList.replaceChildren();

    quizHistory.forEach((item, index) => {
      const reviewItem =
        document.createElement("article");

      const title =
        document.createElement("h4");

      const status =
        document.createElement("p");

      reviewItem.className =
        `review-item ${
          item.isCorrect
            ? "correct"
            : "incorrect"
        }`;

      title.textContent =
        `${index + 1}. ${item.question}`;

      status.className =
        "review-status";

      status.textContent =
        item.isCorrect
          ? "Correct"
          : "Incorrect";

      reviewItem.append(
        title,
        status
      );

      addReviewLine(
        reviewItem,
        "Your answer",
        item.selectedAnswer
      );

      addReviewLine(
        reviewItem,
        "Correct answer",
        item.correctAnswer
      );

      addReviewLine(
        reviewItem,
        "Explanation",
        item.explanation
      );

      elements.reviewList.appendChild(
        reviewItem
      );
    });
  }

  function showResults() {
    const total =
      activeQuestions.length;

    const percentage =
      Math.round(
        (score / total) * 100
      );

    const previousBest =
      Number(
        localStorage.getItem(
          config.storageKey
        ) || 0
      );

    const newBest =
      Math.max(
        score,
        previousBest
      );

    localStorage.setItem(
      config.storageKey,
      String(newBest)
    );

    elements.percentageScore.textContent =
      `${percentage}%`;

    elements.finalScore.textContent =
      String(score);

    elements.finalTotal.textContent =
      String(total);

    elements.resultMessage.textContent =
      getResultMessage(percentage);

    if (elements.bestScore) {
      elements.bestScore.textContent =
        String(newBest);
    }

    buildReview();
    showScreen(elements.resultScreen);
  }

  function toggleReview() {
    if (
      !elements.reviewSection ||
      !elements.reviewButton
    ) {
      return;
    }

    const hidden =
      elements.reviewSection.classList.toggle(
        "is-hidden"
      );

    elements.reviewButton.textContent =
      hidden
        ? "Review answers"
        : "Hide review";
  }

  elements.questionCount.textContent =
    String(questions.length);

  if (elements.bestScore) {
    elements.bestScore.textContent =
      localStorage.getItem(
        config.storageKey
      ) || "0";
  }

  showScreen(elements.startScreen);

  elements.startButton.addEventListener(
    "click",
    startQuiz
  );

  elements.submitButton.addEventListener(
    "click",
    checkAnswer
  );

  elements.nextButton.addEventListener(
    "click",
    goToNextQuestion
  );

  elements.restartButton.addEventListener(
    "click",
    startQuiz
  );

  if (elements.reviewButton) {
    elements.reviewButton.addEventListener(
      "click",
      toggleReview
    );
  }
});
