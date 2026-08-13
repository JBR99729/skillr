#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { access, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const title = "Read This Before You Start!";
const codes = [
  "AC9MFA01",
  "AC9MFM01",
  "AC9MFM02",
  "AC9MFN01",
  "AC9MFN02",
  "AC9MFN03",
  "AC9MFN04",
  "AC9MFN05",
  "AC9MFN06",
  "AC9MFSP01",
  "AC9MFSP02",
  "AC9MFST01"
];
const desktop = { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false };
const mobileChecks = [
  { code: "AC9MFN01", mode: "practice", viewport: { width: 375, height: 812, deviceScaleFactor: 1, mobile: true } },
  { code: "AC9MFST01", mode: "test", viewport: { width: 320, height: 568, deviceScaleFactor: 1, mobile: true } }
];

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".wav", "audio/wav"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
]);

function routeFor(code, mode) {
  return `/quiz/grade-k/math/${code.toLowerCase()}/${mode}/`;
}

async function loadExpectedRecords() {
  const source = await readFile(
    path.join(root, "quiz/assets/foundation-maths-pre-module-notes.js"),
    "utf8"
  );
  const context = vm.createContext({ window: {} });
  new vm.Script(source, {
    filename: "quiz/assets/foundation-maths-pre-module-notes.js"
  }).runInContext(context);
  return JSON.parse(JSON.stringify(context.window.SkillrPreModuleNotes || {}));
}

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      let relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "");
      if (!relativePath || relativePath.endsWith("/")) relativePath += "index.html";

      const filePath = path.resolve(root, relativePath);
      const rootPrefix = `${root}${path.sep}`;
      if (filePath !== root && !filePath.startsWith(rootPrefix)) {
        response.writeHead(403).end("Forbidden");
        return;
      }

      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) throw new Error("Not a file");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-length": String(body.length),
        "content-type": mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream"
      });
      if (request.method === "HEAD") response.end();
      else response.end(body);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address === "object", "Static server did not expose a port");
  return { server, origin: `http://127.0.0.1:${address.port}` };
}

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next known installation path.
    }
  }
  throw new Error("Chrome or Chromium was not found. Set CHROME_PATH to its executable.");
}

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      else pending.resolve(message.result || {});
    });
    socket.addEventListener("close", () => {
      for (const pending of this.pending.values()) {
        pending.reject(new Error(`CDP connection closed while waiting for ${pending.method}`));
      }
      this.pending.clear();
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const message = { id, method, params };
    if (sessionId) message.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { method, resolve, reject });
      this.socket.send(JSON.stringify(message));
    });
  }

  close() {
    this.socket.close();
  }
}

async function openWebSocket(url) {
  assert.equal(typeof WebSocket, "function", "Node 22 or newer is required for the built-in WebSocket client");
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timed out connecting to Chrome CDP")), 10_000);
    socket.addEventListener("open", () => {
      clearTimeout(timeout);
      resolve();
    }, { once: true });
    socket.addEventListener("error", () => {
      clearTimeout(timeout);
      reject(new Error("Could not connect to Chrome CDP"));
    }, { once: true });
  });
  return socket;
}

async function startChrome() {
  const executable = await findChrome();
  const profileDir = await mkdtemp(path.join(tmpdir(), "skillr-foundation-flow-"));
  const stderr = [];
  const browser = spawn(executable, [
    "--headless=new",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--disable-gpu",
    "--disable-sync",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-first-run",
    "--no-sandbox",
    "--remote-debugging-address=127.0.0.1",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: ["ignore", "ignore", "pipe"] });
  browser.stderr.on("data", (chunk) => {
    stderr.push(String(chunk));
    if (stderr.length > 20) stderr.shift();
  });

  const portFile = path.join(profileDir, "DevToolsActivePort");
  let portDetails;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (browser.exitCode !== null) {
      throw new Error(`Chrome exited before CDP was ready. ${stderr.join("").trim()}`);
    }
    try {
      const [port, browserPath] = (await readFile(portFile, "utf8")).trim().split(/\r?\n/);
      if (port && browserPath) {
        portDetails = { port, browserPath };
        break;
      }
    } catch {
      // Chrome creates DevToolsActivePort after startup.
    }
    await delay(50);
  }
  if (!portDetails) throw new Error(`Timed out starting Chrome CDP. ${stderr.join("").trim()}`);

  const socket = await openWebSocket(`ws://127.0.0.1:${portDetails.port}${portDetails.browserPath}`);
  return { browser, client: new CdpClient(socket), profileDir };
}

async function evaluate(client, sessionId, expression) {
  const response = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  }, sessionId);
  if (response.exceptionDetails) {
    const detail = response.exceptionDetails.exception?.description || response.exceptionDetails.text;
    throw new Error(`Browser evaluation failed: ${detail}`);
  }
  return response.result?.value;
}

async function waitFor(client, sessionId, predicateExpression, description, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      if (await evaluate(client, sessionId, predicateExpression)) return;
    } catch (error) {
      lastError = error;
    }
    await delay(40);
  }
  throw new Error(`Timed out waiting for ${description}${lastError ? `: ${lastError.message}` : ""}`);
}

function assertRouteState(condition, code, mode, message) {
  assert(condition, `${code} ${mode}: ${message}`);
}

async function setViewport(client, sessionId, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height
  }, sessionId);
}

async function validateRoute({ client, sessionId, origin, records, code, mode, viewport, label }) {
  const route = routeFor(code, mode);
  const expected = records[code];
  const expectedCount = mode === "practice" ? 8 : 12;
  assert(expected, `${code}: pre-module source record is missing`);
  await setViewport(client, sessionId, viewport);
  await client.send("Page.navigate", { url: `${origin}${route}` }, sessionId);
  await waitFor(
    client,
    sessionId,
    `location.pathname === ${JSON.stringify(route)} && document.readyState !== "loading" && Boolean(document.querySelector("#startScreen.is-active"))`,
    `${code} ${mode} start screen`
  );

  const initial = await evaluate(client, sessionId, `(() => {
    const visible = (element) => Boolean(element && !element.hidden && getComputedStyle(element).display !== "none" && element.getBoundingClientRect().width > 0);
    const input = document.getElementById("studentName");
    return {
      startVisible: visible(document.getElementById("startScreen")),
      gateVisible: visible(document.getElementById("preModuleScreen")),
      quizVisible: visible(document.getElementById("quizScreen")),
      startLabel: document.getElementById("startButton")?.textContent.trim(),
      displayedCount: Number(document.getElementById("questionCount")?.textContent),
      hasNameInput: Boolean(input),
      nameValue: input?.value || "",
      skillCode: window.quizConfig?.skillCode,
      required: window.quizConfig?.preModuleNotesRequired,
      configuredCount: window.quizConfig?.maxQuestions,
      activePrepared: Array.isArray(window.skillrActiveQuestions)
    };
  })()`);
  assertRouteState(initial.startVisible, code, mode, "initial Start screen is not visible");
  assertRouteState(!initial.gateVisible && !initial.quizVisible, code, mode, "gate or questions bypassed the initial Start screen");
  assertRouteState(initial.skillCode === code && initial.required === true, code, mode, "route is not wired to its mandatory note source");
  assertRouteState(initial.startLabel === `Start ${mode}`, code, mode, "Start button label is incorrect");
  assertRouteState(initial.configuredCount === expectedCount && initial.displayedCount === expectedCount, code, mode, `expected a ${expectedCount}-question launch`);
  assertRouteState(!initial.activePrepared, code, mode, "questions were prepared before Start");

  if (mode === "test") {
    assertRouteState(initial.hasNameInput && initial.nameValue === "", code, mode, "student-name field is not initially blank");
    await evaluate(client, sessionId, `document.getElementById("startButton").click()`);
    await delay(80);
    const blocked = await evaluate(client, sessionId, `(() => {
      const visible = (element) => Boolean(element && !element.hidden && getComputedStyle(element).display !== "none" && element.getBoundingClientRect().width > 0);
      return {
        startVisible: visible(document.getElementById("startScreen")),
        gateVisible: visible(document.getElementById("preModuleScreen")),
        quizVisible: visible(document.getElementById("quizScreen")),
        alert: document.getElementById("startScreenMessage")?.textContent.trim(),
        focusedName: document.activeElement?.id === "studentName",
        activePrepared: Array.isArray(window.skillrActiveQuestions)
      };
    })()`);
    assertRouteState(blocked.startVisible && !blocked.gateVisible && !blocked.quizVisible, code, mode, "blank student name did not block launch");
    assertRouteState(blocked.alert === "Please enter the student name before starting.", code, mode, "blank-name validation message is missing");
    assertRouteState(blocked.focusedName, code, mode, "blank-name validation did not focus the name field");
    assertRouteState(!blocked.activePrepared, code, mode, "blank-name attempt prepared questions");
    await evaluate(client, sessionId, `(() => {
      const input = document.getElementById("studentName");
      input.value = "Browser Flow Student";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      document.getElementById("startButton").click();
    })()`);
  } else {
    assertRouteState(!initial.hasNameInput, code, mode, "Practice unexpectedly requires a student name");
    await evaluate(client, sessionId, `document.getElementById("startButton").click()`);
  }

  await waitFor(
    client,
    sessionId,
    `document.getElementById("preModuleScreen")?.classList.contains("is-active") && document.activeElement?.id === "preModuleTitle"`,
    `${code} ${mode} mandatory note and heading focus`
  );

  const gate = await evaluate(client, sessionId, `(() => {
    const screen = document.getElementById("preModuleScreen");
    const visible = (element) => Boolean(element && !element.hidden && getComputedStyle(element).display !== "none" && element.getBoundingClientRect().width > 0);
    const text = (selector) => document.querySelector(selector)?.textContent.trim() || "";
    const speechNodes = [...screen.querySelectorAll("[data-pre-module-speech]")];
    const clipped = [...screen.querySelectorAll("*")].filter((element) => {
      const style = getComputedStyle(element);
      const clips = ["hidden", "clip"].includes(style.overflow) || ["hidden", "clip"].includes(style.overflowX) || ["hidden", "clip"].includes(style.overflowY);
      const overflows = element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1;
      return (clips && overflows) || (style.textOverflow === "ellipsis" && element.scrollWidth > element.clientWidth + 1);
    }).map((element) => element.id || element.className || element.tagName);
    const card = screen.querySelector(".pre-module-card");
    const cardRect = card.getBoundingClientRect();
    const continueButton = document.getElementById("preModuleContinueButton");
    const continueRect = continueButton.getBoundingClientRect();
    return {
      screenVisible: visible(screen),
      startVisible: visible(document.getElementById("startScreen")),
      quizVisible: visible(document.getElementById("quizScreen")),
      focusedHeading: document.activeElement?.id === "preModuleTitle",
      context: text(".pre-module-context"),
      title: text("#preModuleTitle"),
      sectionHeadings: [...screen.querySelectorAll(".pre-module-section h2")].map((element) => element.textContent.trim()),
      bigIdea: text(".pre-module-big-idea p"),
      rules: [...screen.querySelectorAll(".pre-module-section ol > li")].map((element) => element.textContent.trim()),
      memoryClue: text(".pre-module-memory-clue p"),
      visibleSpeech: speechNodes.map((element) => element.innerText).join(" ").replace(/\\s+/g, " ").trim(),
      source: window.SkillrPreModuleNotes?.[${JSON.stringify(code)}]?.source,
      sourceRecord: window.SkillrPreModuleNotes?.[${JSON.stringify(code)}]?.pre_module_notes,
      activePrepared: Array.isArray(window.skillrActiveQuestions),
      questionNumber: text("#questionNumber"),
      questionText: text("#questionText"),
      answerCount: document.getElementById("answerList")?.children.length || 0,
      preReadSeconds: window.quizConfig?.preReadSeconds,
      timerPresent: Boolean(document.querySelector("#preReadPanel, [role='timer'], .countdown, [class*='countdown']")) || /seconds remaining|countdown/i.test(screen.innerText),
      readButtonVisible: visible(screen.querySelector(".pre-module-actions .button-secondary")),
      continueLabel: continueButton?.textContent.trim(),
      horizontalOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > document.documentElement.clientWidth + 1,
      cardOutsideViewport: cardRect.left < -1 || cardRect.right > innerWidth + 1,
      continueOutsideViewport: continueRect.left < -1 || continueRect.right > innerWidth + 1,
      clipped
    };
  })()`);

  const notes = expected.pre_module_notes;
  assertRouteState(gate.screenVisible && !gate.startVisible && !gate.quizVisible, code, mode, "mandatory note is not a distinct screen before questions");
  assertRouteState(gate.focusedHeading, code, mode, "note heading does not hold keyboard focus");
  assertRouteState(gate.context === `${code} • ${expected.topic}`, code, mode, "code/topic context differs from the shared source");
  assertRouteState(gate.title === title, code, mode, "required title is incorrect");
  assertRouteState(JSON.stringify(gate.sectionHeadings) === JSON.stringify(["The Big Idea", "Key Rules", "Visual Memory Clue"]), code, mode, "visible prose schema is incomplete or out of order");
  assertRouteState(gate.bigIdea === notes.big_idea, code, mode, "Big Idea differs from the shared source");
  assertRouteState(JSON.stringify(gate.rules) === JSON.stringify(notes.key_rules), code, mode, "Key Rules differ from the shared source");
  assertRouteState(gate.memoryClue === notes.memory_clue, code, mode, "Visual Memory Clue differs from the shared source");
  assertRouteState(JSON.stringify(gate.source) === JSON.stringify(expected.source), code, mode, "Teacher Slide source references differ from the shared source");
  assertRouteState(JSON.stringify(gate.sourceRecord) === JSON.stringify(notes), code, mode, "browser source record differs from the validated data asset");
  assertRouteState(!gate.activePrepared && !gate.questionNumber && !gate.questionText && gate.answerCount === 0, code, mode, "a question was prepared or rendered before Continue");
  assertRouteState(gate.preReadSeconds === 0 && !gate.timerPresent, code, mode, "an artificial countdown is present");
  assertRouteState(gate.readButtonVisible, code, mode, "read-aloud control is unavailable");
  assertRouteState(gate.continueLabel === `Continue to ${mode === "practice" ? "Practice" : "Test"}`, code, mode, "Continue control is incorrectly labelled");
  assertRouteState(!gate.horizontalOverflow && !gate.cardOutsideViewport && !gate.continueOutsideViewport, code, mode, `${label} layout overflows horizontally`);
  assertRouteState(gate.clipped.length === 0, code, mode, `${label} layout clips or truncates: ${gate.clipped.join(", ")}`);

  await evaluate(client, sessionId, `document.querySelector("#preModuleScreen .button-secondary").click()`);
  const speech = await evaluate(client, sessionId, `(() => ({
    calls: window.__skillrSpeechStub?.spoken || [],
    speaking: window.__skillrSpeechStub?.speaking,
    buttonLabel: document.querySelector("#preModuleScreen .button-secondary")?.textContent.trim()
  }))()`);
  assertRouteState(speech.calls.length === 1, code, mode, "read-aloud did not call speech synthesis exactly once");
  assertRouteState(speech.calls[0]?.text === gate.visibleSpeech, code, mode, "read-aloud speech does not match the visible Big Idea, Key Rules and Visual Memory Clue");
  assertRouteState(speech.calls[0]?.lang === "en-AU" && speech.speaking === true && speech.buttonLabel === "Stop reading", code, mode, "read-aloud language or control state is incorrect");

  await evaluate(client, sessionId, `document.getElementById("preModuleContinueButton").click()`);
  await waitFor(
    client,
    sessionId,
    `document.getElementById("quizScreen")?.classList.contains("is-active") && Array.isArray(window.skillrActiveQuestions) && window.skillrActiveQuestions.length > 0`,
    `${code} ${mode} Question 1`
  );
  const question = await evaluate(client, sessionId, `(() => {
    const visible = (element) => Boolean(element && !element.hidden && getComputedStyle(element).display !== "none" && element.getBoundingClientRect().width > 0);
    return {
      gateVisible: visible(document.getElementById("preModuleScreen")),
      quizVisible: visible(document.getElementById("quizScreen")),
      questionNumber: document.getElementById("questionNumber")?.textContent.trim(),
      progress: document.getElementById("progressText")?.textContent.trim(),
      questionText: document.getElementById("questionText")?.textContent.trim(),
      answerCount: document.getElementById("answerList")?.children.length || 0,
      activeCount: window.skillrActiveQuestions?.length,
      speechSpeaking: window.__skillrSpeechStub?.speaking,
      speechCancelCount: window.__skillrSpeechStub?.cancelCount
    };
  })()`);
  assertRouteState(question.quizVisible && !question.gateVisible, code, mode, "Continue did not open the live question screen");
  assertRouteState(question.questionNumber === "Question 1" && question.progress === `Question 1 of ${expectedCount}`, code, mode, "Continue did not lead to Question 1 with the required count");
  assertRouteState(Boolean(question.questionText) && question.answerCount > 0, code, mode, "Question 1 content did not render");
  assertRouteState(question.activeCount === expectedCount, code, mode, `live selection contains ${question.activeCount}, expected ${expectedCount}`);
  assertRouteState(question.speechSpeaking === false && question.speechCancelCount >= 1, code, mode, "Continue did not stop pre-module read-aloud");

  return {
    fingerprint: JSON.stringify({
      context: gate.context,
      title: gate.title,
      bigIdea: gate.bigIdea,
      rules: gate.rules,
      memoryClue: gate.memoryClue,
      source: gate.source
    })
  };
}

async function closeServer(server) {
  server.closeIdleConnections?.();
  server.closeAllConnections?.();
  await new Promise((resolve) => server.close(() => resolve()));
}

async function stopChrome(chrome) {
  if (!chrome) return;
  try {
    await chrome.client.send("Browser.close");
  } catch {
    // The process may already have exited after a failed run.
  }
  chrome.client.close();
  if (chrome.browser.exitCode === null) {
    await Promise.race([
      new Promise((resolve) => chrome.browser.once("exit", resolve)),
      delay(2_000)
    ]);
  }
  if (chrome.browser.exitCode === null) chrome.browser.kill("SIGKILL");
  await rm(chrome.profileDir, { recursive: true, force: true });
}

async function main() {
  assert(Number(process.versions.node.split(".")[0]) >= 22, "Node 22 or newer is required");
  const records = await loadExpectedRecords();
  assert.deepEqual(Object.keys(records).sort(), [...codes].sort(), "Shared note source must contain exactly the 12 completed Foundation Maths codes");

  let staticServer;
  let chrome;
  const failures = [];
  const fingerprints = new Map();
  let passed = 0;

  try {
    staticServer = await startStaticServer();
    chrome = await startChrome();
    const { targetId } = await chrome.client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await chrome.client.send("Target.attachToTarget", { targetId, flatten: true });
    await chrome.client.send("Page.enable", {}, sessionId);
    await chrome.client.send("Runtime.enable", {}, sessionId);
    await chrome.client.send("Network.enable", {}, sessionId);
    await chrome.client.send("Network.setBlockedURLs", {
      urls: [
        "*://*.doubleclick.net/*",
        "*://*.googlesyndication.com/*",
        "*://*.googletagmanager.com/*",
        "*://*.google-analytics.com/*"
      ]
    }, sessionId);
    await chrome.client.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `(() => {
        const state = { spoken: [], speaking: false, cancelCount: 0 };
        class StubSpeechSynthesisUtterance {
          constructor(text) {
            this.text = String(text ?? "");
            this.lang = "";
            this.listeners = new Map();
          }
          addEventListener(type, listener) { this.listeners.set(type, listener); }
        }
        const synthesis = {
          get speaking() { return state.speaking; },
          speak(utterance) {
            state.spoken.push({ text: utterance.text, lang: utterance.lang });
            state.speaking = true;
          },
          cancel() {
            state.cancelCount += 1;
            state.speaking = false;
          }
        };
        Object.defineProperty(window, "__skillrSpeechStub", { value: state, configurable: true });
        Object.defineProperty(window, "SpeechSynthesisUtterance", { value: StubSpeechSynthesisUtterance, configurable: true });
        Object.defineProperty(window, "speechSynthesis", { value: synthesis, configurable: true });
      })();`
    }, sessionId);

    const checks = [
      ...codes.flatMap((code) => ["practice", "test"].map((mode) => ({
        code,
        mode,
        viewport: desktop,
        label: "desktop"
      }))),
      ...mobileChecks.map((check) => ({ ...check, label: `${check.viewport.width}x${check.viewport.height} mobile` }))
    ];

    for (const check of checks) {
      try {
        const result = await validateRoute({
          client: chrome.client,
          sessionId,
          origin: staticServer.origin,
          records,
          ...check
        });
        const pairKey = `${check.code}:${check.label === "desktop" ? "desktop" : check.label}`;
        const prior = fingerprints.get(pairKey);
        if (check.label === "desktop" && prior) {
          assert.equal(result.fingerprint, prior, `${check.code}: Practice and Test do not render the same shared note`);
        } else {
          fingerprints.set(pairKey, result.fingerprint);
        }
        passed += 1;
        console.log(`PASS ${check.code} ${check.mode} (${check.label})`);
      } catch (error) {
        failures.push(error.message);
        console.error(`FAIL ${error.message}`);
      }
    }
  } finally {
    await stopChrome(chrome);
    if (staticServer) await closeServer(staticServer.server);
  }

  if (failures.length) {
    console.error(`\nFoundation Maths pre-module browser flow: ${passed}/${passed + failures.length} checks passed`);
    process.exitCode = 1;
    return;
  }
  console.log(`\nFoundation Maths pre-module browser flow: ${passed}/${passed} checks passed`);
  console.log("PASS: all 24 desktop Practice/Test launches, Test name gate, mandatory shared note, focus, no timer or early question preparation, visible-source TTS parity, 8/12 question launch counts, and representative mobile overflow/truncation checks.");
}

main().catch((error) => {
  console.error(`FAIL ${error.stack || error.message}`);
  process.exitCode = 1;
});
