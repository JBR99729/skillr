(function () {
  "use strict";

  const KEY = "skillrhubProgressV1";
  const IDLE_MS = 3 * 60 * 1000;
  const SAVE_INTERVAL_MS = 15000;
  let lastActivity = Date.now();
  let lastTick = Date.now();

  function blank() {
    return { format: "skillrhub-progress", version: 1, profile: { name: "", avatar: { type: "preset", value: "⭐" } }, activeSeconds: 0, attempts: [], updatedAt: new Date().toISOString() };
  }

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "null");
      return value && value.format === "skillrhub-progress" && value.version === 1 ? value : blank();
    } catch (_) { return blank(); }
  }

  function write(value) {
    value.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("skillr:progress-changed", { detail: value }));
    return value;
  }

  function uniqueId() {
    return (crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function cleanAttempt(attempt) {
    const total = Math.max(0, Math.min(1000, Number(attempt.total) || 0));
    const score = Math.max(0, Math.min(total, Number(attempt.score) || 0));
    const parsedDate = Date.parse(attempt.completedAt);
    return {
      id: typeof attempt.id === "string" ? attempt.id.slice(0, 100) : uniqueId(),
      curriculumCode: String(attempt.curriculumCode || "").slice(0, 100),
      quizTitle: String(attempt.quizTitle || "SkillrHub activity").slice(0, 180),
      attemptUrl: String(attempt.attemptUrl || "").slice(0, 500),
      mode: ["practice", "test", "daily-drill"].includes(attempt.mode) ? attempt.mode : "practice",
      score,
      total,
      percentage: Math.max(0, Math.min(100, Number(attempt.percentage) || 0)),
      passed: Boolean(attempt.passed),
      durationSeconds: Math.max(0, Math.min(86400, Number(attempt.durationSeconds) || 0)),
      completedAt: Number.isFinite(parsedDate) ? new Date(parsedDate).toISOString() : new Date().toISOString()
    };
  }

  function recordAttempt(attempt) {
    const state = read();
    const studentName = String(attempt.studentName || "").trim().slice(0, 60);
    if (studentName) state.profile.name = studentName;
    const item = cleanAttempt(attempt);
    if (!state.attempts.some((entry) => entry.id === item.id)) state.attempts.push(item);
    return write(state);
  }

  function setName(name) {
    const state = read();
    state.profile.name = String(name || "").trim().slice(0, 60);
    return write(state);
  }

  function setAvatar(avatar) {
    const state = read();
    const allowed = ["⭐", "🦉", "🐨", "🦊", "🐼", "🚀"];
    if (avatar?.type === "image" && /^data:image\/(png|jpeg|webp);base64,/.test(avatar.value || "") && avatar.value.length < 500000) {
      state.profile.avatar = { type: "image", value: avatar.value };
    } else {
      state.profile.avatar = { type: "preset", value: allowed.includes(avatar?.value) ? avatar.value : "⭐" };
    }
    return write(state);
  }

  function exportBackup() {
    const state = read();
    const blob = new Blob([JSON.stringify(state)], { type: "application/x-skillrhub-progress" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `My-SkillrHub-Progress-${new Date().toISOString().slice(0, 10)}.skillr`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  async function importBackup(file) {
    if (!file || file.size > 2 * 1024 * 1024) throw new Error("Choose a SkillrHub progress backup smaller than 2 MB.");
    const incoming = JSON.parse(await file.text());
    if (!incoming || incoming.format !== "skillrhub-progress" || incoming.version !== 1 || !Array.isArray(incoming.attempts)) {
      throw new Error("This is not a valid SkillrHub progress backup.");
    }
    const current = read();
    const attempts = new Map(current.attempts.map((item) => [item.id, item]));
    incoming.attempts.slice(0, 10000).forEach((item) => {
      if (item && typeof item.id === "string") attempts.set(item.id.slice(0, 100), cleanAttempt(item));
    });
    current.attempts = [...attempts.values()];
    current.activeSeconds = Math.max(0, Math.min(100000000, Math.max(Number(current.activeSeconds) || 0, Number(incoming.activeSeconds) || 0)));
    if (typeof incoming.profile?.name === "string") current.profile.name = incoming.profile.name.trim().slice(0, 60);
    if (incoming.profile?.avatar) {
      const avatar = incoming.profile.avatar;
      const allowed = ["⭐", "🦉", "🐨", "🦊", "🐼", "🚀"];
      if (avatar.type === "preset" && allowed.includes(avatar.value)) current.profile.avatar = { type: "preset", value: avatar.value };
      if (avatar.type === "image" && /^data:image\/(png|jpeg|webp);base64,/.test(avatar.value || "") && avatar.value.length < 500000) current.profile.avatar = { type: "image", value: avatar.value };
    }
    return write(current);
  }

  function markActive() { lastActivity = Date.now(); }
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((eventName) => addEventListener(eventName, markActive, { passive: true }));
  setInterval(() => {
    const now = Date.now();
    const elapsed = Math.min(30, Math.max(0, Math.round((now - lastTick) / 1000)));
    lastTick = now;
    if (!document.hidden && now - lastActivity < IDLE_MS) {
      const state = read();
      state.activeSeconds = (Number(state.activeSeconds) || 0) + elapsed;
      write(state);
    }
  }, SAVE_INTERVAL_MS);

  window.SkillrProgress = { read, setName, setAvatar, recordAttempt, exportBackup, importBackup };
})();
