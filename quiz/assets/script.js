"use strict";

/* =========================================================
   QUIZ SOUNDS
   ========================================================= */

const correctSound =
  new Audio("/quiz/assets/sounds/correct.wav");

const wrongSound =
  new Audio("/quiz/assets/sounds/wrong.wav");

correctSound.preload = "auto";
wrongSound.preload = "auto";

correctSound.volume = 0.7;
wrongSound.volume = 0.7;


function playQuizSound(isCorrect) {

  const sound =
    isCorrect ? correctSound : wrongSound;

  sound.pause();
  sound.currentTime = 0;

  sound.play().catch((error) => {

    console.error(
      "Quiz sound failed:",
      error
    );

  });
}
document.addEventListener("DOMContentLoaded", () => {
  const existingBreadcrumb = document.querySelector(
    "nav.breadcrumb, nav.breadcrumbs, .quiz-breadcrumb"
  );

  if (!existingBreadcrumb) {
    const main = document.querySelector("main");

    if (main) {
      const path = window.location.pathname;
      const segments = path.split("/").filter(Boolean);
      const isQuizPage = segments[0] === "quiz";

      if (isQuizPage) {
        const currentTitle =
          document.querySelector("main h1, .review-heading")?.textContent?.trim() ||
          document.title;

        const quizHubLabel =
          segments.includes("grade-k")
            ? "Foundation Maths"
            : segments.includes("year-1")
              ? "Year 1 Maths"
              : segments.includes("year-2")
                ? "Year 2 Maths"
                : segments.includes("year-3")
                  ? "Year 3 Maths"
                  : segments.includes("year-4")
                    ? "Year 4 Maths"
                    : segments.includes("year-5")
                      ? "Year 5 Maths"
                      : segments.includes("year-6")
                        ? "Year 6 Maths"
                        : "Quiz";

        const quizHubHref =
          segments.includes("grade-k")
            ? "/quiz/grade-k/math/"
            : segments.includes("year-1")
              ? "/quiz/year-1/math/"
              : "/quiz/";

        const breadcrumb = document.createElement("nav");
        breadcrumb.className = "quiz-breadcrumb";
        breadcrumb.setAttribute("aria-label", "Breadcrumb");

        const breadcrumbList = document.createElement("ol");

        const homeItem = document.createElement("li");
        const homeLink = document.createElement("a");
        homeLink.href = "/";
        homeLink.textContent = "Home";
        homeItem.appendChild(homeLink);
        breadcrumbList.appendChild(homeItem);

        const quizHubItem = document.createElement("li");

        if (quizHubHref) {
          const quizHubLink = document.createElement("a");
          quizHubLink.href = quizHubHref;
          quizHubLink.textContent = quizHubLabel;
          quizHubItem.appendChild(quizHubLink);
        } else {
          quizHubItem.textContent = quizHubLabel;
        }

        breadcrumbList.appendChild(quizHubItem);

        const currentItem = document.createElement("li");
        currentItem.setAttribute("aria-current", "page");
        currentItem.textContent = currentTitle;
        breadcrumbList.appendChild(currentItem);

        breadcrumb.appendChild(breadcrumbList);
        main.parentNode.insertBefore(breadcrumb, main);
      }
    }
  }

  const questions = Array.isArray(window.quizQuestions)
    ? window.quizQuestions
    : [];

  const config = {
    shuffleQuestions: true,
    shuffleAnswers: false,
    caseSensitiveText: false,
    storageKey: "skillrQuizBestScore",
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

  const requiredIds = [
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

  const missingIds = requiredIds.filter(
    (id) => !elements[id]
  );

  if (missingIds.length > 0) {
    console.error(
      `Quiz cannot start. Missing HTML IDs: ${missingIds.join(", ")}`
    );

    return;
  }

  if (questions.length === 0) {
    elements.questionCount.textContent = "0";
    elements.startButton.disabled = true;
    elements.startButton.textContent = "Questions not loaded";

    console.error(
      "questions.js must define window.quizQuestions."
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
  let draggedItemIndex = null;
  let imageDragAnswers = {};
  let draggedImageId = null;
  function shuffleArray(items) {
    const copy = [...items];

    for (
      let index = copy.length - 1;
      index > 0;
      index -= 1
    ) {
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

  function cloneQuestion(question) {
    return {
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

      acceptedAnswers: Array.isArray(
        question.acceptedAnswers
      )
        ? question.acceptedAnswers.map((answer) =>
            Array.isArray(answer)
              ? [...answer]
              : answer
          )
        : undefined
    };
  }

  function prepareSingleChoiceAnswers(question) {
    const type = question.type || "single";

    if (
      !config.shuffleAnswers ||
      (type !== "single" && type !== "true-false")
    ) {
      return question;
    }

    const answerObjects = question.answers.map(
      (answer, index) => ({
        answer,
        isCorrect: index === question.correct
      })
    );

    const shuffled = shuffleArray(answerObjects);

    return {
      ...question,

      answers: shuffled.map(
        (item) => item.answer
      ),

      correct: shuffled.findIndex(
        (item) => item.isCorrect
      )
    };
  }

  function prepareQuestions() {
  let prepared = questions
    .map(cloneQuestion)
    .map(prepareSingleChoiceAnswers);

  if (config.shuffleQuestions) {
    prepared = shuffleArray(prepared);
  }

  const maximumQuestions =
    Number(config.maxQuestions);

  if (
    Number.isInteger(maximumQuestions) &&
    maximumQuestions > 0
  ) {
    prepared = prepared.slice(
      0,
      maximumQuestions
    );
  }

  return prepared;
}

  function showScreen(screenToShow) {
    [
      elements.startScreen,
      elements.quizScreen,
      elements.resultScreen
    ].forEach((screen) => {
      const isActive = screen === screenToShow;

      screen.hidden = !isActive;
      screen.classList.toggle(
        "is-active",
        isActive
      );
    });
  }

  function resetQuestionState() {
    answerChecked = false;
    selectedSingleIndex = null;
    selectedMultipleIndexes = new Set();
    orderedItems = [];
    draggedItemIndex = null;
     
    imageDragAnswers = {};
    draggedImageId = null;
  }

  function startQuiz() {
    activeQuestions = prepareQuestions();

    currentQuestionIndex = 0;
    score = 0;
    quizHistory = [];

    elements.liveScore.textContent = "0";

    if (elements.reviewSection) {
      elements.reviewSection.classList.add(
        "is-hidden"
      );
    }

    if (elements.reviewButton) {
      elements.reviewButton.textContent =
        "Review answers";
    }

    showScreen(elements.quizScreen);
    renderQuestion();
  }

  function renderQuestion() {
    resetQuestionState();

    const question =
      activeQuestions[currentQuestionIndex];

    const position =
      currentQuestionIndex + 1;

    const progress =
      (position / activeQuestions.length) * 100;

    elements.questionNumber.textContent =
      `Question ${position}`;
const previousVisual =
  document.getElementById("questionVisual");

previousVisual?.remove();

if (question.visual) {
  const visual =
    document.createElement("div");

  visual.id = "questionVisual";
  visual.className = "question-visual";
  visual.textContent = question.visual;

  elements.questionText.insertAdjacentElement(
    "afterend",
    visual
  );
}
    elements.questionText.textContent =
      question.question;

    elements.progressText.textContent =
      `Question ${position} of ${activeQuestions.length}`;

    elements.progressBar.style.width =
      `${progress}%`;

    elements.feedback.textContent = "";
    elements.feedback.className = "feedback";

    elements.submitButton.disabled = true;
    elements.submitButton.hidden = false;

    elements.submitButton.classList.remove(
      "is-hidden"
    );

    elements.nextButton.hidden = true;

    elements.nextButton.classList.add(
      "is-hidden"
    );

    elements.nextButton.textContent =
      position === activeQuestions.length
        ? "See results"
        : "Next question";

    elements.answerList.replaceChildren();

    if (question.image) {
      const image =
        document.createElement("img");

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

      case "fill-blank":
        renderFillBlank(question);
        break;

      case "order":
  renderOrdering(question);
  break;

case "drag-drop":
  renderDragDrop(question);
  break;

case "drag-image":
  renderImageDragDrop(question);
  break;

default:
  elements.feedback.textContent =
    `Unsupported question type: ${type}`;

  console.error(
    `Unsupported question type: ${type}`
  );
    }
  }

  function createAnswerButton(
    answer,
    index
  ) {
    const button =
      document.createElement("button");

    const letter =
      document.createElement("span");

    const text =
      document.createElement("span");

    button.type = "button";
    button.className = "answer-option";
    button.dataset.index = String(index);

    button.setAttribute(
      "aria-pressed",
      "false"
    );

    letter.className = "answer-letter";

    letter.textContent =
      String.fromCharCode(65 + index);

    text.textContent = answer;

    button.append(letter, text);

    return button;
  }

  function renderSingleChoice(question) {
    question.answers.forEach(
      (answer, index) => {
        const button =
          createAnswerButton(
            answer,
            index
          );

        button.addEventListener(
          "click",
          () => {
            if (answerChecked) {
              return;
            }

            selectedSingleIndex = index;

            elements.submitButton.disabled =
              false;

            elements.answerList
              .querySelectorAll(
                ".answer-option"
              )
              .forEach(
                (item, itemIndex) => {
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
                }
              );
          }
        );

        elements.answerList.appendChild(
          button
        );
      }
    );
  }

  function renderMultipleChoice(question) {
    const hint =
      document.createElement("p");

    hint.className = "question-hint";

    hint.textContent =
      question.instruction ||
      "Select all correct answers.";

    elements.answerList.appendChild(hint);

    question.answers.forEach(
      (answer, index) => {
        const button =
          createAnswerButton(
            answer,
            index
          );

        button.addEventListener(
          "click",
          () => {
            if (answerChecked) {
              return;
            }

            if (
              selectedMultipleIndexes.has(
                index
              )
            ) {
              selectedMultipleIndexes.delete(
                index
              );
            } else {
              selectedMultipleIndexes.add(
                index
              );
            }

            const selected =
              selectedMultipleIndexes.has(
                index
              );

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
          }
        );

        elements.answerList.appendChild(
          button
        );
      }
    );
  }

  function renderTextInput(question) {
    const input =
      document.createElement("input");

    input.type = "text";
    input.id = "typedAnswer";
    input.className = "quiz-input";

    input.placeholder =
      question.placeholder ||
      "Type your answer";

    input.autocomplete = "off";

    input.addEventListener(
      "input",
      () => {
        elements.submitButton.disabled =
          input.value.trim() === "";
      }
    );

    elements.answerList.appendChild(input);

    input.focus();
  }

  function renderNumberInput(question) {
    const input =
      document.createElement("input");

    input.type = "number";
    input.id = "numberAnswer";
    input.className = "quiz-input";

    input.placeholder =
      question.placeholder ||
      "Enter a number";

    input.step = question.step || "any";

    input.addEventListener(
      "input",
      () => {
        elements.submitButton.disabled =
          input.value.trim() === "";
      }
    );

    elements.answerList.appendChild(input);

    input.focus();
  }

  function renderFillBlank(question) {
    const container =
      document.createElement("div");

    container.className =
      "fill-blank-container";

    const template =
      question.template || "{{blank}}";

    const parts =
      template.split("{{blank}}");

    parts.forEach((part, index) => {
      container.appendChild(
        document.createTextNode(part)
      );

      if (index < parts.length - 1) {
        const input =
          document.createElement("input");

        input.type = "text";

        input.className =
          "fill-blank-input";

        input.dataset.blankIndex =
          String(index);

        input.autocomplete = "off";

        if (
          Array.isArray(
            question.placeholders
          )
        ) {
          input.placeholder =
            question.placeholders[index] ||
            "";
        } else {
          input.placeholder =
            question.placeholder || "";
        }

        input.addEventListener(
          "input",
          updateFillBlankSubmitState
        );

        container.appendChild(input);
      }
    });

    elements.answerList.appendChild(
      container
    );

    container
      .querySelector(".fill-blank-input")
      ?.focus();
  }

  function updateFillBlankSubmitState() {
    const inputs = [
      ...elements.answerList.querySelectorAll(
        ".fill-blank-input"
      )
    ];

    elements.submitButton.disabled =
      inputs.length === 0 ||
      inputs.some(
        (input) =>
          input.value.trim() === ""
      );
  }

  function renderOrdering(question) {
    const hint =
      document.createElement("p");

    hint.className = "question-hint";

    hint.textContent =
      question.instruction ||
      "Use the arrows to arrange the items in the correct order.";

    orderedItems =
      question.shuffleItems === false
        ? [...question.items]
        : shuffleArray(question.items);

    elements.answerList.appendChild(hint);

    renderOrderList();

    elements.submitButton.disabled = false;
  }

  function renderOrderList() {
    elements.answerList
      .querySelector(".order-list")
      ?.remove();

    const list =
      document.createElement("ol");

    list.className = "order-list";

    orderedItems.forEach(
      (item, index) => {
        const row =
          document.createElement("li");

        const label =
          document.createElement("span");

        const controls =
          document.createElement("span");

        const upButton =
          document.createElement("button");

        const downButton =
          document.createElement("button");

        row.className = "order-item";

        label.textContent = item;

        controls.className =
          "order-controls";

        upButton.type = "button";

        upButton.className =
          "order-button";

        upButton.textContent = "↑";

        upButton.setAttribute(
          "aria-label",
          `Move ${item} up`
        );

        upButton.disabled =
          answerChecked ||
          index === 0;

        downButton.type = "button";

        downButton.className =
          "order-button";

        downButton.textContent = "↓";

        downButton.setAttribute(
          "aria-label",
          `Move ${item} down`
        );

        downButton.disabled =
          answerChecked ||
          index ===
            orderedItems.length - 1;

        upButton.addEventListener(
          "click",
          () => {
            moveOrderedItem(
              index,
              index - 1,
              renderOrderList
            );
          }
        );

        downButton.addEventListener(
          "click",
          () => {
            moveOrderedItem(
              index,
              index + 1,
              renderOrderList
            );
          }
        );

        controls.append(
          upButton,
          downButton
        );

        row.append(
          label,
          controls
        );

        list.appendChild(row);
      }
    );

    elements.answerList.appendChild(list);
  }

  function renderDragDrop(question) {
    const hint =
      document.createElement("p");

    hint.className = "question-hint";

    hint.textContent =
      question.instruction ||
      "Drag the items into the correct order. Use the arrows on touchscreens.";

    orderedItems =
      question.shuffleItems === false
        ? [...question.items]
        : shuffleArray(question.items);

    elements.answerList.appendChild(hint);

    renderDragList();

    elements.submitButton.disabled = false;
  }

  function renderDragList() {
    elements.answerList
      .querySelector(".drag-list")
      ?.remove();

    const list =
      document.createElement("ol");

    list.className = "drag-list";

    orderedItems.forEach(
      (item, index) => {
        const row =
          document.createElement("li");

        const handle =
          document.createElement("span");

        const label =
          document.createElement("span");

        const controls =
          document.createElement("span");

        const upButton =
          document.createElement("button");

        const downButton =
          document.createElement("button");

        row.className = "drag-item";

        row.dataset.index =
          String(index);

        row.draggable =
          !answerChecked;

        handle.className =
          "drag-handle";

        handle.textContent = "☰";

        handle.setAttribute(
          "aria-hidden",
          "true"
        );

        label.className =
          "drag-item-text";

        label.textContent = item;

        controls.className =
          "drag-fallback-controls";

        upButton.type = "button";

        upButton.className =
          "drag-move-button";

        upButton.textContent = "↑";

        upButton.setAttribute(
          "aria-label",
          `Move ${item} up`
        );

        upButton.disabled =
          answerChecked ||
          index === 0;

        downButton.type = "button";

        downButton.className =
          "drag-move-button";

        downButton.textContent = "↓";

        downButton.setAttribute(
          "aria-label",
          `Move ${item} down`
        );

        downButton.disabled =
          answerChecked ||
          index ===
            orderedItems.length - 1;

        row.addEventListener(
          "dragstart",
          (event) => {
            if (answerChecked) {
              event.preventDefault();
              return;
            }

            draggedItemIndex = index;

            row.classList.add(
              "is-dragging"
            );

            event.dataTransfer.effectAllowed =
              "move";

            event.dataTransfer.setData(
              "text/plain",
              String(index)
            );
          }
        );

        row.addEventListener(
          "dragend",
          () => {
            draggedItemIndex = null;

            row.classList.remove(
              "is-dragging"
            );
          }
        );

        row.addEventListener(
          "dragover",
          (event) => {
            if (answerChecked) {
              return;
            }

            event.preventDefault();

            event.dataTransfer.dropEffect =
              "move";

            row.classList.add(
              "drag-over"
            );
          }
        );

        row.addEventListener(
          "dragleave",
          () => {
            row.classList.remove(
              "drag-over"
            );
          }
        );

        row.addEventListener(
          "drop",
          (event) => {
            event.preventDefault();

            row.classList.remove(
              "drag-over"
            );

            const storedIndex =
              Number(
                event.dataTransfer.getData(
                  "text/plain"
                )
              );

            const sourceIndex =
              draggedItemIndex ??
              storedIndex;

            if (
              !Number.isInteger(
                sourceIndex
              )
            ) {
              return;
            }

            moveOrderedItem(
              sourceIndex,
              index,
              renderDragList
            );
          }
        );

        upButton.addEventListener(
          "click",
          () => {
            moveOrderedItem(
              index,
              index - 1,
              renderDragList
            );
          }
        );

        downButton.addEventListener(
          "click",
          () => {
            moveOrderedItem(
              index,
              index + 1,
              renderDragList
            );
          }
        );

        controls.append(
          upButton,
          downButton
        );

        row.append(
          handle,
          label,
          controls
        );

        list.appendChild(row);
      }
    );

    elements.answerList.appendChild(list);
  }

  function moveOrderedItem(
    fromIndex,
    toIndex,
    rerender
  ) {
    if (
      answerChecked ||
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= orderedItems.length ||
      toIndex >= orderedItems.length
    ) {
      return;
    }

    const [movedItem] =
      orderedItems.splice(
        fromIndex,
        1
      );

    orderedItems.splice(
      toIndex,
      0,
      movedItem
    );

    draggedItemIndex = null;

    rerender();
  }

  function normaliseText(value) {
    const cleaned = String(value)
      .trim()
      .replace(/\s+/g, " ");

    return config.caseSensitiveText
      ? cleaned
      : cleaned.toLowerCase();
  }

  function arraysEqual(
    first,
    second
  ) {
    return (
      first.length === second.length &&
      first.every(
        (value, index) =>
          value === second[index]
      )
    );
  }

  function setsEqual(
    first,
    second
  ) {
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

  function getAcceptedBlankAnswers(
    question
  ) {
    const accepted =
      question.acceptedAnswers || [];

    if (accepted.length === 0) {
      return [];
    }

    if (Array.isArray(accepted[0])) {
      return accepted.map(
        (answers) => [...answers]
      );
    }

    return [accepted];
  }

  function evaluateAnswer(question) {
    const type =
      question.type || "single";

    if (
      type === "single" ||
      type === "true-false"
    ) {
      return {
        isCorrect:
          selectedSingleIndex ===
          question.correct,

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
        document.getElementById(
          "typedAnswer"
        );

      const userAnswer =
        input?.value || "";

      const acceptedAnswers =
        question.acceptedAnswers ||
        [question.correct];

      const normalisedAccepted =
        acceptedAnswers.map(
          normaliseText
        );

      return {
        isCorrect:
          normalisedAccepted.includes(
            normaliseText(userAnswer)
          ),

        selectedAnswer:
          userAnswer,

        correctAnswer:
          String(
            acceptedAnswers[0] ?? ""
          )
      };
    }

    if (type === "number") {
      const input =
        document.getElementById(
          "numberAnswer"
        );

      const userNumber =
        Number(input?.value);

      const correctNumber =
        Number(question.correct);

      const tolerance =
        Number(
          question.tolerance || 0
        );

      return {
        isCorrect:
          Number.isFinite(userNumber) &&
          Math.abs(
            userNumber -
              correctNumber
          ) <= tolerance,

        selectedAnswer:
          input?.value || "",

        correctAnswer:
          String(question.correct)
      };
    }

    if (type === "fill-blank") {
      const inputs = [
        ...elements.answerList.querySelectorAll(
          ".fill-blank-input"
        )
      ];

      const acceptedByBlank =
        getAcceptedBlankAnswers(
          question
        );

      const userAnswers =
        inputs.map(
          (input) => input.value
        );

      const blankResults =
        userAnswers.map(
          (answer, index) => {
            const acceptedAnswers =
              acceptedByBlank[index] ||
              [];

            return acceptedAnswers
              .map(normaliseText)
              .includes(
                normaliseText(answer)
              );
          }
        );

      return {
        isCorrect:
          userAnswers.length ===
            acceptedByBlank.length &&
          blankResults.every(Boolean),

        selectedAnswer:
          userAnswers.join(" | "),

        correctAnswer:
          acceptedByBlank
            .map(
              (acceptedAnswers) =>
                String(
                  acceptedAnswers[0] ??
                    ""
                )
            )
            .join(" | "),

        blankResults
      };
    }

    if (
      type === "order" ||
      type === "drag-drop"
    ) {
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
      selectedAnswer:
        "Unsupported question type",
      correctAnswer:
        "Unsupported question type"
    };
  }

  function markAnswerVisuals(
    question,
    result
  ) {
    const type =
      question.type || "single";

    if (
      type === "single" ||
      type === "true-false"
    ) {
      elements.answerList
        .querySelectorAll(
          ".answer-option"
        )
        .forEach(
          (button, index) => {
            button.disabled = true;

            if (
              index ===
              question.correct
            ) {
              button.classList.add(
                "is-correct"
              );
            } else if (
              index ===
              selectedSingleIndex
            ) {
              button.classList.add(
                "is-wrong"
              );
            }
          }
        );
    }

    if (type === "multiple") {
      const correctSet =
        new Set(question.correct);

      elements.answerList
        .querySelectorAll(
          ".answer-option"
        )
        .forEach(
          (button, index) => {
            button.disabled = true;

            if (
              correctSet.has(index)
            ) {
              button.classList.add(
                "is-correct"
              );
            } else if (
              selectedMultipleIndexes.has(
                index
              )
            ) {
              button.classList.add(
                "is-wrong"
              );
            }
          }
        );
    }

    if (
      type === "text" ||
      type === "number"
    ) {
      const input =
        elements.answerList.querySelector(
          "input"
        );

      if (input) {
        input.disabled = true;

        input.classList.add(
          result.isCorrect
            ? "is-correct-input"
            : "is-wrong-input"
        );
      }
    }

    if (type === "fill-blank") {
      elements.answerList
        .querySelectorAll(
          ".fill-blank-input"
        )
        .forEach(
          (input, index) => {
            input.disabled = true;

            input.classList.add(
              result.blankResults?.[
                index
              ]
                ? "is-correct-input"
                : "is-wrong-input"
            );
          }
        );
    }

    if (type === "order") {
      renderOrderList();

      elements.answerList
        .querySelector(".order-list")
        ?.classList.add(
          result.isCorrect
            ? "is-correct-order"
            : "is-wrong-order"
        );
    }

    if (type === "drag-drop") {
      renderDragList();

      elements.answerList
        .querySelector(".drag-list")
        ?.classList.add(
          result.isCorrect
            ? "is-correct-order"
            : "is-wrong-order"
        );
    }
  }
/* =========================================================
   IMAGE DRAG AND DROP
   ========================================================= */

function renderImageDragDrop(question) {

  const hint =
    document.createElement("p");

  hint.className =
    "question-hint";

  hint.textContent =
    question.instruction ||
    "Drag each picture into the correct group.";

  elements.answerList.appendChild(
    hint
  );


  /* -----------------------------------------
     IMAGE BANK
     ----------------------------------------- */

  const imageBank =
    document.createElement("div");

  imageBank.className =
    "image-drag-bank";


  question.items.forEach(
    (item) => {

      const card =
        createImageDragCard(
          item
        );

      imageBank.appendChild(
        card
      );

    }
  );


  elements.answerList.appendChild(
    imageBank
  );


  /* -----------------------------------------
     CATEGORY DROP ZONES
     ----------------------------------------- */

  const categoryContainer =
    document.createElement("div");

  categoryContainer.className =
    "image-drop-categories";


  question.categories.forEach(
    (category) => {

      const zone =
        document.createElement("div");

      zone.className =
        "image-drop-zone";

      zone.dataset.target =
        category.id;


      const heading =
        document.createElement("h3");

      heading.className =
        "image-drop-title";

      heading.textContent =
        category.label;


      const itemsArea =
        document.createElement("div");

      itemsArea.className =
        "image-drop-items";


      zone.append(
        heading,
        itemsArea
      );


      /* Allow images to be dragged over */

      zone.addEventListener(
        "dragover",
        (event) => {

          if (answerChecked) {
            return;
          }

          event.preventDefault();

          zone.classList.add(
            "is-drag-over"
          );

        }
      );


      zone.addEventListener(
        "dragleave",
        () => {

          zone.classList.remove(
            "is-drag-over"
          );

        }
      );


      zone.addEventListener(
        "drop",
        (event) => {

          if (answerChecked) {
            return;
          }

          event.preventDefault();

          zone.classList.remove(
            "is-drag-over"
          );


          const itemId =
            event.dataTransfer.getData(
              "text/plain"
            ) ||
            draggedImageId;


          if (!itemId) {
            return;
          }


          moveImageToCategory(
            itemId,
            category.id,
            question
          );

        }
      );


      categoryContainer.appendChild(
        zone
      );

    }
  );


  elements.answerList.appendChild(
    categoryContainer
  );


  elements.submitButton.disabled =
    true;
}


/* =========================================================
   CREATE DRAGGABLE IMAGE CARD
   ========================================================= */

function createImageDragCard(item) {

  const card =
    document.createElement("button");

  card.type =
    "button";

  card.className =
    "image-drag-card";

  card.dataset.itemId =
    item.id;

  card.draggable =
    !answerChecked;


  const image =
    document.createElement("img");

  image.src =
    item.image;

  image.alt =
    item.alt || "";

  image.className =
    "image-drag-picture";

  image.draggable =
    false;


  const label =
    document.createElement("span");

  label.className =
    "image-drag-label";

  label.textContent =
    item.label ||
    item.alt ||
    "";


  card.append(
    image,
    label
  );


  card.addEventListener(
    "dragstart",
    (event) => {

      if (answerChecked) {

        event.preventDefault();

        return;
      }


      draggedImageId =
        item.id;


      card.classList.add(
        "is-dragging"
      );


      event.dataTransfer.effectAllowed =
        "move";


      event.dataTransfer.setData(
        "text/plain",
        item.id
      );

    }
  );


  card.addEventListener(
    "dragend",
    () => {

      draggedImageId =
        null;


      card.classList.remove(
        "is-dragging"
      );

    }
  );


  return card;
}


/* =========================================================
   MOVE IMAGE TO CATEGORY
   ========================================================= */

function moveImageToCategory(
  itemId,
  categoryId,
  question
) {

  imageDragAnswers[
    itemId
  ] =
    categoryId;


  renderImageDragState(
    question
  );


  const allPlaced =
    question.items.every(
      (item) =>
        Boolean(
          imageDragAnswers[
            item.id
          ]
        )
    );


  elements.submitButton.disabled =
    !allPlaced;
}


/* =========================================================
   REDRAW IMAGE DRAG STATE
   ========================================================= */

function renderImageDragState(
  question
) {

  const bank =
    elements.answerList.querySelector(
      ".image-drag-bank"
    );


  const zones =
    elements.answerList.querySelectorAll(
      ".image-drop-zone"
    );


  if (!bank) {
    return;
  }


  bank.replaceChildren();


  zones.forEach(
    (zone) => {

      const itemsArea =
        zone.querySelector(
          ".image-drop-items"
        );

      itemsArea?.replaceChildren();

    }
  );


  question.items.forEach(
    (item) => {

      const card =
        createImageDragCard(
          item
        );


      const categoryId =
        imageDragAnswers[
          item.id
        ];


      if (!categoryId) {

        bank.appendChild(
          card
        );

        return;
      }


      const target =
        elements.answerList.querySelector(
          `.image-drop-zone[data-target="${categoryId}"] .image-drop-items`
        );


      if (target) {

        target.appendChild(
          card
        );

      } else {

        bank.appendChild(
          card
        );

      }

    }
  );

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
    activeQuestions[
      currentQuestionIndex
    ];

  const result =
    evaluateAnswer(question);

  answerChecked = true;

  /* Play correct or incorrect sound */
  playQuizSound(result.isCorrect);

  if (result.isCorrect) {
    score += 1;

    elements.liveScore.textContent =
      String(score);
  }

  markAnswerVisuals(
    question,
    result
  );

  showFeedback(
    result.isCorrect,
    question.explanation
  );

  quizHistory.push({
    question:
      question.question,

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

  function getResultMessage(
    percentage
  ) {
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

    /* =========================================================
     RESULTS
     ========================================================= */

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

    showScreen(
      elements.resultScreen
    );
  }


  /* =========================================================
     OPEN SHARED REVIEW PAGE
     ========================================================= */

  function openReviewPage() {

    const quizTitle =
      document.getElementById(
        "quizTitle"
      )?.textContent.trim() ||
      document.title;


    const quizLabel =
      document.querySelector(
        "#startScreen .eyebrow"
      )?.textContent.trim() ||
      "Quiz review";


    const reviewData = {

      quizTitle,

      quizLabel,

      score,

      total:
        activeQuestions.length,

      quizUrl:
        window.location.href,

      answers:
        quizHistory

    };


    try {

      sessionStorage.setItem(
        "skillrQuizReview",
        JSON.stringify(
          reviewData
        )
      );


      window.location.href =
        "/quiz/review.html";


    } catch (error) {

      console.error(
        "Could not save quiz review:",
        error
      );

    }

  }


  /* =========================================================
     QUESTION COUNT
     ========================================================= */

  const displayedQuestionCount =
    Number.isInteger(
      Number(config.maxQuestions)
    ) &&
    Number(config.maxQuestions) > 0
      ? Math.min(
          Number(config.maxQuestions),
          questions.length
        )
      : questions.length;


  elements.questionCount.textContent =
    String(
      displayedQuestionCount
    );


  /* =========================================================
     BEST SCORE
     ========================================================= */

  if (elements.bestScore) {

    elements.bestScore.textContent =
      localStorage.getItem(
        config.storageKey
      ) || "0";

  }


  /* =========================================================
     INITIAL SCREEN
     ========================================================= */

  showScreen(
    elements.startScreen
  );


  /* =========================================================
     START QUIZ
     ========================================================= */

  elements.startButton.addEventListener(
    "click",
    startQuiz
  );


  /* =========================================================
     CHECK ANSWER
     ========================================================= */

  elements.submitButton.addEventListener(
    "click",
    checkAnswer
  );


  /* =========================================================
     NEXT QUESTION
     ========================================================= */

  elements.nextButton.addEventListener(
    "click",
    goToNextQuestion
  );


  /* =========================================================
     TRY AGAIN

     Reloads the actual page.
     This generates a fresh random quiz attempt.
     ========================================================= */

  elements.restartButton.addEventListener(
    "click",
    () => {

      window.location.reload();

    }
  );


  /* =========================================================
     REVIEW ANSWERS

     Saves this attempt and opens the single shared
     /quiz/review.html page.
     ========================================================= */

  if (elements.reviewButton) {

    elements.reviewButton.addEventListener(
      "click",
      openReviewPage
    );

  }


});
