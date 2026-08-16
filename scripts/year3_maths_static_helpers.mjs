import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

// This helper is a watched input for the full static Topic Guide and fixed-slide validation workflow.
const DATA_PARTS = ["base", "n1", "n2", "n3", "a", "m1", "m2", "sp", "st", "p"];

export function loadYear3MathsUnits(root = process.cwd()) {
  const context = vm.createContext({ window: {}, console, Array, Object, Number, String, Math, Map, Set });
  for (const part of DATA_PARTS) {
    const relative = `assets/year3-maths-data-${part}.js`;
    vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  }
  const units = context.window.SkillrYear3MathsData || {};
  const codes = Object.keys(units).filter((code) => /^AC9M3/.test(code)).sort();
  if (codes.length !== 23) throw new Error(`Expected 23 Year 3 Maths codes, found ${codes.length}.`);
  applyYear3MathsCorrections(units);
  return { units, codes };
}

export function applyYear3MathsCorrections(units) {
  const duration = units.AC9M3M03;
  if (duration) {
    duration.mistakes = [
      ["Using 100 seconds per minute", "One minute equals 60 seconds, so 2 minutes equals 120 seconds."],
      ["Using 100 minutes per hour", "One hour equals 60 minutes."],
      ["Wrong unit for an event", "Seconds suit very short events; days suit long events."],
      ["Comparing numbers without units", "Convert to the same unit before comparing, because 2 hours is longer than 90 minutes."]
    ];
    if (duration.slides) duration.slides.remediation = "Use the relationship 1 minute = 60 seconds, then count two groups of 60 seconds.";
    const quickSlide = duration.commercial_master?.slides?.find((slide) => slide.role === "quick-check") || duration.commercial_master?.slides?.at(-1);
    if (quickSlide) quickSlide.remediation = duration.slides?.remediation;
    if (duration.commercial_master?.topic) duration.commercial_master.topic.misconceptions = duration.mistakes;
  }

  const clock = units.AC9M3M04;
  if (clock) {
    const response = "The clock shows 3:27: twenty-seven minutes past three. The minute hand is on the 27th minute mark and the hour hand is just past 3.";
    if (clock.slides) clock.slides.expected_response = response;
    const quickSlide = clock.commercial_master?.slides?.find((slide) => slide.role === "quick-check") || clock.commercial_master?.slides?.at(-1);
    if (quickSlide) quickSlide.expected_response = response;
  }
}

export const escapeHtml = (value = "") => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

export const asList = (value) => Array.isArray(value) ? value : value ? [value] : [];
