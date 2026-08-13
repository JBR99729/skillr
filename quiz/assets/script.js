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

const CURRICULUM_READ_ALOUD_STORAGE_KEY =
  "skillrCurriculumReadAloudEnabled";

function isCurriculumReadAloudPath(pathname) {
  return /^\/quiz\/(?:grade-k|year-\d+)\/(?:math|maths|english|science)\/ac9[a-z0-9]+\/(?:practice|test)\/(?:index\.html)?$/i.test(
    pathname
  );
}

function normaliseSpeechText(value) {
  return String(value ?? "")
    .replace(/≤/g, " less than or equal to ")
    .replace(/≥/g, " greater than or equal to ")
    .replace(/≠/g, " not equal to ")
    .replace(/[×✕]/g, " multiplied by ")
    .replace(/÷/g, " divided by ")
    .replace(/[−–]/g, " minus ")
    .replace(/\+/g, " plus ")
    .replace(/=/g, " equals ")
    .replace(/</g, " less than ")
    .replace(/>/g, " greater than ")
    .replace(/%/g, " percent ")
    .replace(/²/g, " squared ")
    .replace(/³/g, " cubed ")
    .replace(/\s+/g, " ")
    .trim();
}

function getQuestionSpeechText(question) {
  const parts = [
    question.audio_prompt ||
      question.audioPrompt ||
      question.question ||
      ""
  ];
  const choices = Array.isArray(question.answers)
    ? question.answers
    : Array.isArray(question.options)
      ? question.options
      : Array.isArray(question.items) &&
          question.items.every(
            (item) => typeof item === "string"
          )
        ? question.items
        : [];

  choices.forEach((choice, index) => {
    parts.push(
      `Option ${String.fromCharCode(65 + index)}. ${choice}`
    );
  });

  if (Array.isArray(question.categories)) {
    question.categories.forEach((category) => {
      parts.push(category.label || category.name || "");
    });
  }

  return normaliseSpeechText(
    parts
      .filter(Boolean)
      .map((part) => {
        const text = String(part).trim();
        return /[.!?]$/.test(text)
          ? text
          : `${text}.`;
      })
      .join(" ")
  );
}

function getYearLabel(yearSegment) {
  const labels = {
    "grade-k": "Foundation",
    "year-1": "Year 1",
    "year-2": "Year 2",
    "year-3": "Year 3",
    "year-4": "Year 4",
    "year-5": "Year 5",
    "year-6": "Year 6",
    "year-7": "Year 7",
    "year-8": "Year 8",
    "year-9": "Year 9",
    "year-10": "Year 10"
  };

  return labels[yearSegment] || "Quiz";
}

function capitaliseSegment(segment) {
  if (!segment) {
    return "";
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getQuizHubInfo(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const isQuizPage = segments[0] === "quiz";

  if (!isQuizPage) {
    return null;
  }

  const yearSegment = segments.find((segment) => segment.startsWith("year-"));
  const gradeSegment = segments.includes("grade-k") ? "grade-k" : null;
  const isDailyDrills = segments.includes("daily-drills");
  const subjectSegment = segments.find((segment) => ["english", "math", "maths", "science"].includes(segment));

  if (gradeSegment) {
    return {
      label: isDailyDrills ? "Foundation Daily Drills" : "Foundation Maths",
      href: isDailyDrills ? "/quiz/grade-k/daily-drills/" : "/quiz/grade-k/math/"
    };
  }

  if (yearSegment) {
    const yearLabel = getYearLabel(yearSegment);

    if (isDailyDrills) {
      const subjectHref = subjectSegment ? `/quiz/${yearSegment}/daily-drills/${subjectSegment}/` : null;
      const label = subjectSegment
        ? `${yearLabel} ${capitaliseSegment(subjectSegment)} Drills`
        : `${yearLabel} Daily Drills`;

      return {
        label,
        href: subjectHref || `/quiz/${yearSegment}/daily-drills/`
      };
    }

    if (subjectSegment && (subjectSegment === "math" || subjectSegment === "maths")) {
      return {
        label: `${yearLabel} Maths`,
        href: `/quiz/${yearSegment}/math/`
      };
    }

    if (subjectSegment === "science") {
      return {
        label: `${yearLabel} Science`,
        href: `/quiz/${yearSegment}/science/`
      };
    }

    return {
      label: `${yearLabel} Quizzes`,
      href: `/quiz/${yearSegment}/`
    };
  }

  return {
    label: "Quiz",
    href: "/quiz/"
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const existingBreadcrumb = document.querySelector(
    "nav.breadcrumb, nav.breadcrumbs, .quiz-breadcrumb"
  );

  if (!existingBreadcrumb) {
    const main = document.querySelector("main");

    if (main) {
      const path = window.location.pathname;
      const isQuizPage = path.split("/").filter(Boolean)[0] === "quiz";

      if (isQuizPage) {
        const currentTitle =
          document.querySelector("main h1, .review-heading")?.textContent?.trim() ||
          document.title;
        const quizHub = getQuizHubInfo(path);
        const quizHubLabel = quizHub?.label || "Quiz";
        const quizHubHref = quizHub?.href || "/quiz/";

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
    passingPercent: 75,
    questionCycle: false,
    avoidSameCorrectPosition: false,
    preReadSeconds: 0,
    requireStudentName: false,
    certificateOnPass: false,
    storageKey: "skillrQuizBestScore",
    ...(window.quizConfig || {})
  };

  const isPracticePage =
    /\/practice\/(?:index\.html)?$/.test(
      window.location.pathname
    );

  const readAloudAvailable =
    isCurriculumReadAloudPath(
      window.location.pathname
    ) &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance ===
      "function";
  let readAloudEnabled = true;
  let readAloudControls = null;

  if (readAloudAvailable) {
    try {
      readAloudEnabled =
        localStorage.getItem(
          CURRICULUM_READ_ALOUD_STORAGE_KEY
        ) !== "false";
    } catch (error) {
      console.warn(
        "Read-aloud preference could not be loaded:",
        error
      );
    }
  }

  if (isPracticePage) {
    config.preReadSeconds = 0;

    const preparationNotes =
      document.querySelector(".pre-read-notes");
    const teacherSlideSummary =
      preparationNotes?.querySelector("li");
    const introduction =
      document.querySelector(".intro-text");

    if (teacherSlideSummary && introduction) {
      introduction.textContent =
        teacherSlideSummary.textContent;
    }

    preparationNotes?.remove();
  }

  const passMarkLabel =
    Array.from(
      document.querySelectorAll(
        ".quiz-summary .summary-label"
      )
    ).find(
      (label) =>
        label.textContent.trim().toLowerCase() ===
        "pass mark"
    );
  const passMarkTile =
    passMarkLabel?.closest("div");
  const quizSummary =
    passMarkTile?.closest(".quiz-summary");

  if (passMarkTile && isPracticePage) {
    passMarkTile.remove();
    quizSummary?.classList.add(
      "is-practice-summary"
    );
  } else if (
    passMarkLabel &&
    config.certificateOnPass
  ) {
    passMarkLabel.textContent =
      "For certificate";
  }

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

  if (config.certificateOnPass) {
    const certificateAttemptNote =
      document.createElement("p");
    certificateAttemptNote.className =
      "certificate-attempt-note";
    certificateAttemptNote.textContent =
      `Certificate target: ${Number(config.passingPercent) || 75}% or higher unlocks printing.`;
    certificateAttemptNote.style.cssText =
      "margin:.35rem 0 .75rem;font-size:.875rem;font-weight:600;color:#334155;";
    elements.quizScreen
      .querySelector(".quiz-header")
      ?.insertAdjacentElement(
        "afterend",
        certificateAttemptNote
      );
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
  let quizStartedAt = 0;
  let answerChecked = false;
  let quizHistory = [];
  let studentNameInput = null;
  let preReadPanel = null;
  let preReadComplete = false;
  let preReadTimerId = null;
  let cycleProgressElement = null;
  let currentCycleKey = null;
  let currentCycleTotalSets = null;

  let selectedSingleIndex = null;
  let selectedMultipleIndexes = new Set();
  let orderedItems = [];
  let draggedItemIndex = null;
  let imageDragAnswers = {};
  let draggedImageId = null;

  function stopReadAloud() {
    if (readAloudAvailable) {
      window.speechSynthesis.cancel();
    }
  }

  function updateReadAloudControls() {
    if (!readAloudControls) {
      return;
    }

    readAloudControls.toggle.textContent =
      readAloudEnabled ? "🔊 Sound on" : "🔇 Sound off";
    readAloudControls.toggle.setAttribute(
      "aria-pressed",
      String(readAloudEnabled)
    );
    readAloudControls.readAgain.disabled =
      !readAloudEnabled;
  }

  function readCurrentQuestion() {
    if (
      !readAloudAvailable ||
      !readAloudEnabled
    ) {
      return;
    }

    const question =
      activeQuestions[currentQuestionIndex];
    const speechText = question
      ? getQuestionSpeechText(question)
      : "";

    if (!speechText) {
      return;
    }

    stopReadAloud();
    const utterance =
      new window.SpeechSynthesisUtterance(
        speechText
      );
    utterance.lang = "en-AU";
    window.speechSynthesis.speak(utterance);
  }

  function ensureReadAloudControls() {
    if (
      !readAloudAvailable ||
      readAloudControls
    ) {
      return;
    }

    const container = document.createElement("div");
    const readAgain = document.createElement("button");
    const toggle = document.createElement("button");

    container.className = "read-aloud-controls";
    container.setAttribute(
      "aria-label",
      "Question audio controls"
    );
    readAgain.type = "button";
    readAgain.className = "button button-secondary";
    readAgain.textContent = "🔊 Read again";
    toggle.type = "button";
    toggle.className = "button button-secondary";

    readAgain.addEventListener(
      "click",
      readCurrentQuestion
    );
    toggle.addEventListener("click", () => {
      readAloudEnabled = !readAloudEnabled;

      try {
        localStorage.setItem(
          CURRICULUM_READ_ALOUD_STORAGE_KEY,
          String(readAloudEnabled)
        );
      } catch (error) {
        console.warn(
          "Read-aloud preference could not be saved:",
          error
        );
      }

      updateReadAloudControls();

      if (readAloudEnabled) {
        readCurrentQuestion();
      } else {
        stopReadAloud();
      }
    });

    container.append(readAgain, toggle);
    elements.questionText.insertAdjacentElement(
      "afterend",
      container
    );
    readAloudControls = {
      container,
      readAgain,
      toggle
    };
    updateReadAloudControls();
  }

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
        ? question.items.map((item) =>
            item && typeof item === "object"
              ? { ...item }
              : item
          )
        : undefined,

      categories: Array.isArray(question.categories)
        ? question.categories.map((category) => ({
            ...category
          }))
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

  function getQuestionIdentity(question) {
    return String(
      question.id ||
        question.questionId ||
        [
          question.curriculumCode,
          question.elaboration,
          question.question
        ]
          .filter(Boolean)
          .join("|") ||
        question.question
    );
  }

  function storageGetJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);

      if (!value) {
        return fallback;
      }

      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function storageSetJson(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.warn(
        "Could not save quiz state:",
        error
      );
    }
  }

  function getAnswerPositionKey() {
    return `${
      config.answerPositionStorageKey ||
      config.storageKey
    }:answerPositions`;
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

    const previousPositions = storageGetJson(
      getAnswerPositionKey(),
      {}
    );

    const questionKey = getQuestionIdentity(
      question
    );

    let shuffled = shuffleArray(answerObjects);
    let correctIndex = shuffled.findIndex(
      (item) => item.isCorrect
    );

    if (
      config.avoidSameCorrectPosition &&
      question.answers.length > 1 &&
      previousPositions[questionKey] !== undefined
    ) {
      const previousIndex =
        previousPositions[questionKey];

      for (
        let attempt = 0;
        attempt < 12 && correctIndex === previousIndex;
        attempt += 1
      ) {
        shuffled = shuffleArray(answerObjects);
        correctIndex = shuffled.findIndex(
          (item) => item.isCorrect
        );
      }

      if (correctIndex === previousIndex) {
        const swapIndex =
          previousIndex === 0 ? 1 : 0;

        [
          shuffled[previousIndex],
          shuffled[swapIndex]
        ] = [
          shuffled[swapIndex],
          shuffled[previousIndex]
        ];

        correctIndex = swapIndex;
      }
    }

    if (config.avoidSameCorrectPosition) {
      previousPositions[questionKey] = correctIndex;
      storageSetJson(
        getAnswerPositionKey(),
        previousPositions
      );
    }

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

  function getQuestionCycleKey() {
    return `${
      config.questionCycleStorageKey ||
      config.storageKey
    }:questionCycle`;
  }

  function renderCycleProgress() {
    if (!config.questionCycle) {
      return;
    }

    if (!cycleProgressElement) {
      cycleProgressElement =
        document.getElementById(
          "practiceSetProgress"
        );
    }

    if (!cycleProgressElement) {
      cycleProgressElement =
        document.createElement("p");
      cycleProgressElement.id =
        "practiceSetProgress";
      cycleProgressElement.className =
        "practice-set-progress";

      const startCard =
        elements.startScreen.querySelector(
          ".start-card, .card"
        );

      const summary =
        elements.startScreen.querySelector(
          ".quiz-summary"
        );

      if (summary?.parentNode) {
        summary.insertAdjacentElement(
          "afterend",
          cycleProgressElement
        );
      } else if (startCard) {
        startCard.appendChild(
          cycleProgressElement
        );
      }
    }

    const state = storageGetJson(
      getQuestionCycleKey(),
      {}
    );

    const totalSets =
      currentCycleTotalSets ||
      state.totalSets ||
      Math.max(
        1,
        Math.ceil(
          questions.length /
            Math.max(
              1,
              Number(config.maxQuestions) || 1
            )
        )
      );

    const completedSets = Math.min(
      Number(state.completedSets) || 0,
      totalSets
    );

    cycleProgressElement.textContent =
      `${completedSets}/${totalSets} sets completed`;
  }

  function selectQuestionCycle(
    prepared,
    maximumQuestions
  ) {
    const allIds = prepared.map(
      getQuestionIdentity
    );

    const signature =
      allIds.join("||");

    const totalSets = Math.max(
      1,
      Math.ceil(
        allIds.length / maximumQuestions
      )
    );

    const key = getQuestionCycleKey();
    let state = storageGetJson(key, {});

    const shouldReset =
      state.signature !== signature ||
      !Array.isArray(state.remainingIds) ||
      (
        state.remainingIds.length === 0 &&
        Number(state.completedSets) >= totalSets
      );

    if (shouldReset) {
      state = {
        signature,
        remainingIds: shuffleArray(allIds),
        completedSets: 0,
        totalSets
      };
    }

    const selectedIds = [];

    while (
      selectedIds.length < maximumQuestions &&
      state.remainingIds.length > 0
    ) {
      selectedIds.push(
        state.remainingIds.shift()
      );
    }

    currentCycleKey = key;
    currentCycleTotalSets = totalSets;

    state.totalSets = totalSets;
    storageSetJson(key, state);

    const questionById = new Map(
      prepared.map((question) => [
        getQuestionIdentity(question),
        question
      ])
    );

    return selectedIds
      .map((id) => questionById.get(id))
      .filter(Boolean);
  }

  function markCurrentCycleSetComplete() {
    if (
      !config.questionCycle ||
      !currentCycleKey
    ) {
      return;
    }

    const state = storageGetJson(
      currentCycleKey,
      {}
    );

    const totalSets =
      currentCycleTotalSets ||
      state.totalSets ||
      1;

    state.completedSets = Math.min(
      totalSets,
      (Number(state.completedSets) || 0) + 1
    );
    state.totalSets = totalSets;

    storageSetJson(
      currentCycleKey,
      state
    );

    renderCycleProgress();
  }

  function prepareQuestions() {
  let prepared = questions
    .map(cloneQuestion);


  const maximumQuestions =
    Number(config.maxQuestions);

  if (
    Number.isInteger(maximumQuestions) &&
    maximumQuestions > 0
  ) {
    if (
      config.questionCycle &&
      prepared.length > maximumQuestions
    ) {
      prepared = selectQuestionCycle(
        prepared,
        maximumQuestions
      );
    } else {
      if (config.shuffleQuestions) {
        prepared = shuffleArray(prepared);
      }

      prepared = prepared.slice(
        0,
        maximumQuestions
      );
    }
  } else if (config.shuffleQuestions) {
    prepared = shuffleArray(prepared);
  }

  return prepared.map(
    prepareSingleChoiceAnswers
  );
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

  function ensureStudentNameInput() {
    if (!config.requireStudentName) {
      return null;
    }

    if (studentNameInput) {
      return studentNameInput;
    }

    studentNameInput =
      document.getElementById(
        "studentName"
      );

    if (studentNameInput) {
      return studentNameInput;
    }

    const label =
      document.createElement("label");
    label.className =
      "student-name-field";
    label.textContent =
      "Student name";

    studentNameInput =
      document.createElement("input");
    studentNameInput.id =
      "studentName";
    studentNameInput.type =
      "text";
    studentNameInput.autocomplete =
      "name";
    studentNameInput.placeholder =
      "Enter student name";
    studentNameInput.required =
      true;

    label.appendChild(studentNameInput);

    elements.startButton.insertAdjacentElement(
      "beforebegin",
      label
    );

    return studentNameInput;
  }

  function getStudentName() {
    return (
      ensureStudentNameInput()?.value.trim() ||
      ""
    );
  }

  function showStartMessage(message) {
    let messageElement =
      document.getElementById(
        "startScreenMessage"
      );

    if (!messageElement) {
      messageElement =
        document.createElement("p");
      messageElement.id =
        "startScreenMessage";
      messageElement.className =
        "feedback incorrect";

      elements.startButton.insertAdjacentElement(
        "beforebegin",
        messageElement
      );
    }

    messageElement.textContent = message;
  }

  function ensurePreReadPanel() {
    if (preReadPanel) {
      return preReadPanel;
    }

    preReadPanel =
      document.getElementById(
        "preReadPanel"
      );

    if (preReadPanel) {
      return preReadPanel;
    }

    preReadPanel =
      document.createElement("div");
    preReadPanel.id =
      "preReadPanel";
    preReadPanel.className =
      "pre-read-panel";

    elements.startButton.insertAdjacentElement(
      "beforebegin",
      preReadPanel
    );

    return preReadPanel;
  }

  function startPreReadCountdown() {
    const seconds =
      Number(config.preReadSeconds);

    if (
      !Number.isFinite(seconds) ||
      seconds <= 0 ||
      preReadComplete
    ) {
      beginQuiz();
      return;
    }

    const panel =
      ensurePreReadPanel();

    let remaining =
      Math.ceil(seconds);

    elements.startButton.disabled = true;

    const intro =
      config.preReadText ||
      "Read the topic guide carefully before attempting the practice questions.";

    const updatePanel = () => {
      const heading =
        document.createElement("strong");
      heading.textContent =
        "Pre-read time: ";

      const introText =
        document.createTextNode(
          `${intro} `
        );

      const timer =
        document.createElement("span");
      timer.textContent =
        `${remaining} seconds remaining.`;

      panel.replaceChildren(
        heading,
        introText,
        timer
      );
    };

    updatePanel();

    window.clearInterval(
      preReadTimerId
    );

    preReadTimerId = window.setInterval(
      () => {
        remaining -= 1;

        if (remaining <= 0) {
          window.clearInterval(
            preReadTimerId
          );

          preReadComplete = true;
          elements.startButton.disabled =
            false;
          beginQuiz();
          return;
        }

        updatePanel();
      },
      1000
    );
  }

  function startQuiz() {
    if (
      config.requireStudentName &&
      !getStudentName()
    ) {
      showStartMessage(
        "Please enter the student name before starting."
      );
      ensureStudentNameInput()?.focus();
      return;
    }

    if (
      Number(config.preReadSeconds) > 0 &&
      !preReadComplete
    ) {
      startPreReadCountdown();
      return;
    }

    beginQuiz();
  }

  function beginQuiz() {
    quizStartedAt = Date.now();
    activeQuestions = prepareQuestions();
    window.skillrActiveQuestions = activeQuestions.map(
      cloneQuestion
    );

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

  function focusFirstQuestionControl() {
    const firstControl =
      elements.answerList.querySelector(
        [
          "input:not([disabled])",
          "textarea:not([disabled])",
          ".answer-option:not([disabled])",
          ".order-button:not([disabled])",
          ".drag-move-button:not([disabled])",
          ".image-drag-card:not([disabled])"
        ].join(", ")
      );

    firstControl?.focus();
  }

  function renderQuestion() {
    stopReadAloud();
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

if (question.visual || question.visualHtml) {
  const visual =
    document.createElement("div");

  visual.id = "questionVisual";
  visual.className = "question-visual";
  if (question.visualHtml) {
    visual.innerHTML = question.visualHtml;
  } else {
    visual.textContent = question.visual;
  }

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

      case "self-check":
        renderSelfCheck(question);
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

    ensureReadAloudControls();
    readCurrentQuestion();
    focusFirstQuestionControl();
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

  function renderSelfCheck(question) {
    const instructions = document.createElement("p");
    instructions.className = "question-hint";
    instructions.textContent =
      question.instruction ||
      "Write or complete the task, compare your work with the model answer, then check the box when the important ideas match.";

    const input = document.createElement("textarea");
    input.id = "selfCheckAnswer";
    input.className = "quiz-input self-check-input";
    input.rows = 4;
    input.placeholder = question.placeholder || "Write what you did or explain your answer";

    const model = document.createElement("details");
    model.className = "self-check-model";
    const summary = document.createElement("summary");
    summary.textContent = "Show model answer and marking guidance";
    const modelText = document.createElement("p");
    modelText.textContent = question.modelAnswer || question.correct || "Check with a teacher.";
    model.append(summary, modelText);

    const label = document.createElement("label");
    label.className = "self-check-confirmation";
    const checkbox = document.createElement("input");
    checkbox.id = "selfCheckConfirmed";
    checkbox.type = "checkbox";
    const labelText = document.createElement("span");
    labelText.textContent = "My response includes the required idea or evidence.";
    label.append(checkbox, labelText);

    const updateSubmitState = () => {
      elements.submitButton.disabled =
        input.value.trim() === "" || !checkbox.checked;
    };
    input.addEventListener("input", updateSubmitState);
    checkbox.addEventListener("change", updateSubmitState);

    elements.answerList.append(instructions, input, model, label);
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

    if (type === "self-check") {
      const input = document.getElementById("selfCheckAnswer");
      const confirmed = document.getElementById("selfCheckConfirmed");
      const modelAnswer = String(
        question.modelAnswer || question.correct || "Check with a teacher."
      );

      return {
        isCorrect: Boolean(input?.value.trim() && confirmed?.checked),
        selectedAnswer: input?.value || "",
        correctAnswer: modelAnswer
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

    if (type === "drag-image") {

      const isCorrect =
        question.items.every(
          (item) =>
            imageDragAnswers[item.id] ===
            item.target
        );

      const selectedAnswer =
        question.items
          .map((item) => {

            const categoryId =
              imageDragAnswers[item.id];

            const category =
              question.categories.find(
                (entry) =>
                  entry.id === categoryId
              );

            return (
              `${item.label || item.alt || item.id} → ` +
              `${category?.label || "Not placed"}`
            );

          })
          .join(", ");

      const correctAnswer =
        question.items
          .map((item) => {

            const category =
              question.categories.find(
                (entry) =>
                  entry.id === item.target
              );

            return (
              `${item.label || item.alt || item.id} → ` +
              `${category?.label || item.target}`
            );

          })
          .join(", ");

      return {
        isCorrect,
        selectedAnswer,
        correctAnswer
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

    if (type === "self-check") {
      const input = document.getElementById("selfCheckAnswer");
      const confirmed = document.getElementById("selfCheckConfirmed");

      if (input) {
        input.disabled = true;
        input.classList.add("is-correct-input");
      }
      if (confirmed) {
        confirmed.disabled = true;
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

    if (type === "drag-image") {

      question.items.forEach(
        (item) => {

          const card =
            elements.answerList.querySelector(
              `.image-drag-card[data-item-id="${item.id}"]`
            );

          if (!card) {
            return;
          }

          card.draggable = false;

          const itemIsCorrect =
            imageDragAnswers[item.id] ===
            item.target;

          card.classList.add(
            itemIsCorrect
              ? "is-correct-image"
              : "is-wrong-image"
          );

        }
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

  stopReadAloud();

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

    stopReadAloud();

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
    const passingPercent =
      Number(config.passingPercent) || 75;

    if (percentage === 100) {
      return "Excellent work — every answer was correct.";
    }

    if (percentage >= passingPercent) {
      return `Passed. You reached the ${passingPercent}% pass mark. Review any missed questions and try for full marks.`;
    }

    return `Not passed yet. The pass mark is ${passingPercent}%, so review the explanations and practise the tricky parts again.`;
  }

  function getQuizTitle() {
    return (
      document.getElementById("quizTitle")
        ?.textContent.trim() ||
      document.title
    );
  }

  function printCertificate(percentage) {
    const studentName =
      getStudentName() || "Student";

    const escapeCertificateText = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const certificateWindow =
      window.open("", "_blank");

    if (!certificateWindow) {
      alert(
        "Please allow pop-ups to print the certificate."
      );
      return;
    }

    certificateWindow.document.write(
      `<!DOCTYPE html>
      <html lang="en-AU">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SkillrHub Completion Certificate</title>
        <style>
          @page {
            size: Letter portrait;
            margin: 0.35in;
          }
          * {
            box-sizing: border-box;
          }
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            color: #1f2937;
            background: #f4f7fb;
          }
          body {
            padding: 0.25in;
          }
          .certificate {
            width: 100%;
            max-width: 7.8in;
            min-height: 9.75in;
            margin: 0 auto;
            padding: 0.55in;
            border: 8px solid #1a3a72;
            background: #fff;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .certificate p {
            margin: 0.12in 0;
          }
          .brand {
            color: #1a3a72;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          h1 {
            margin: 0.2in 0;
            font-size: 34px;
          }
          h2 {
            margin: 0.16in 0;
            font-size: 24px;
            line-height: 1.2;
          }
          .student {
            margin: 0.2in 0;
            font-size: 30px;
            font-weight: 800;
          }
          .score {
            font-size: 20px;
          }
          @media print {
            html,
            body {
              width: 7.8in;
              height: 10.3in;
              background: #fff;
            }
            body {
              padding: 0;
            }
            .certificate {
              width: 7.8in;
              min-height: 9.75in;
              max-height: 10.3in;
              box-shadow: none;
              overflow: hidden;
            }
          }
        </style>
      </head>
      <body>
        <section class="certificate">
          <p class="brand">SkillrHub Learning</p>
          <h1>Completion Certificate</h1>
          <p>This certifies that</p>
          <p class="student">${escapeCertificateText(studentName)}</p>
          <p>successfully completed</p>
          <h2>${escapeCertificateText(getQuizTitle())}</h2>
          <p class="score">Score: ${percentage}%</p>
          <p>skillrhub.com</p>
        </section>
      </body>
      </html>`
    );

    certificateWindow.document.close();
    certificateWindow.focus();
    certificateWindow.print();
  }

  function updateCertificateAction(percentage) {
    const existing =
      document.getElementById(
        "certificateButton"
      );

    existing?.remove();

    const passingPercent =
      Number(config.passingPercent) || 75;

    if (
      !config.certificateOnPass ||
      percentage < passingPercent
    ) {
      return;
    }

    const button =
      document.createElement("button");
    button.id =
      "certificateButton";
    button.type =
      "button";
    button.className =
      "button button-secondary";
    button.textContent =
      "Print certificate";

    button.addEventListener(
      "click",
      () => printCertificate(percentage)
    );

    const actions =
      elements.resultScreen.querySelector(
        ".result-actions"
      );

    actions?.appendChild(button);
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

    markCurrentCycleSetComplete();
    updateCertificateAction(percentage);

    const quizTitle = document.getElementById("quizTitle")?.textContent.trim() || document.title;
    const resultData = {
        quizTitle,
        quizLabel: document.querySelector("#startScreen .eyebrow")?.textContent.trim() || "Quiz result",
        studentName: getStudentName(),
        score,
        total,
        percentage,
        passed: percentage >= (Number(config.passingPercent) || 75),
        answers: quizHistory,
        attemptUrl: window.location.href,
        reviewUrl: config.reviewUrl || "review/",
        retakeUrl: config.retakeUrl || "retake/",
        completedAt: new Date().toISOString()
    };

    try {
      document.dispatchEvent(
        new CustomEvent("skillr:quiz-complete", {
          detail: {
            questionIds: activeQuestions.map(getQuestionIdentity),
            score,
            total,
            percentage
          }
        })
      );
    } catch (error) {
      console.error("Could not record the completed question round:", error);
    }

    const dailyMeta = window.skillrDailyDrillMeta;
    const isDailyDrill = Boolean(dailyMeta) || window.location.pathname.includes("/daily-drills/");
    const progressAttempt = {
      ...resultData,
      curriculumCode: String(
        config.skillCode ||
        (dailyMeta ? `DRILL:${dailyMeta.year}:${dailyMeta.subject}:${dailyMeta.skill}` : "")
      ).toUpperCase(),
      mode: isDailyDrill ? "daily-drill" : (/test/i.test(resultData.quizLabel) ? "test" : "practice"),
      durationSeconds: quizStartedAt ? Math.max(0, Math.round((Date.now() - quizStartedAt) / 1000)) : 0
    };

    if (window.SkillrProgress) {
      window.SkillrProgress.recordAttempt(progressAttempt);
    } else {
      let progressScript = document.querySelector('script[data-skillr-progress]');
      if (!progressScript) {
        progressScript = document.createElement("script");
        progressScript.src = "/assets/progress-store.js?v=2";
        progressScript.dataset.skillrProgress = "true";
        document.head.appendChild(progressScript);
      }
      progressScript.addEventListener("load", () => window.SkillrProgress?.recordAttempt(progressAttempt), { once: true });
    }

    if (config.resultUrl) {
      try {
        sessionStorage.setItem(config.resultStorageKey || "skillrQuizResult", JSON.stringify(resultData));
        window.location.href = config.resultUrl;
        return;
      } catch (error) {
        console.error("Could not open the separate result page:", error);
      }
    }

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

  ensureStudentNameInput();
  renderCycleProgress();

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
     KEYBOARD SUPPORT

     Enter should work for students who are not using a mouse
     or touchscreen. Answer buttons still keep their normal
     keyboard behaviour, so students can change/select options
     before submitting.
     ========================================================= */

  function isCurrentScreen(screen) {
    return Boolean(
      screen &&
        !screen.hidden &&
        screen.classList.contains(
          "is-active"
        )
    );
  }

  function isAnswerOption(element) {
    return Boolean(
      element?.closest?.(
        ".answer-option"
      )
    );
  }

  function shouldLetAnswerButtonHandleEnter(
    event
  ) {
    if (answerChecked) {
      return false;
    }

    const button =
      event.target?.closest?.(
        ".answer-option"
      );

    if (!button) {
      return false;
    }

    const question =
      activeQuestions[
        currentQuestionIndex
      ];

    const type =
      question?.type || "single";

    if (type === "multiple") {
      return true;
    }

    if (
      type === "single" ||
      type === "true-false"
    ) {
      return !button.classList.contains(
        "is-selected"
      );
    }

    return true;
  }

  function shouldLetMoveButtonHandleEnter(
    event
  ) {
    return Boolean(
      event.target?.closest?.(
        ".order-button, .drag-move-button"
      )
    );
  }

  function handleQuizKeyboard(event) {
    if (
      event.key !== "Enter" ||
      event.isComposing
    ) {
      return;
    }

    if (
      isCurrentScreen(
        elements.startScreen
      ) &&
      !elements.startButton.disabled &&
      !event.target?.closest?.(
        "a, button, input, textarea, select"
      )
    ) {
      event.preventDefault();
      startQuiz();
      return;
    }

    if (
      !isCurrentScreen(
        elements.quizScreen
      )
    ) {
      return;
    }

    if (!answerChecked) {
      if (
        isAnswerOption(event.target) &&
        shouldLetAnswerButtonHandleEnter(
          event
        )
      ) {
        return;
      }

      if (
        shouldLetMoveButtonHandleEnter(
          event
        )
      ) {
        return;
      }

      if (
        !elements.submitButton.hidden &&
        !elements.submitButton.disabled
      ) {
        event.preventDefault();
        checkAnswer();
      }

      return;
    }

    if (!elements.nextButton.hidden) {
      event.preventDefault();
      goToNextQuestion();
    }
  }

  document.addEventListener(
    "keydown",
    handleQuizKeyboard
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

  window.addEventListener(
    "pagehide",
    stopReadAloud
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
