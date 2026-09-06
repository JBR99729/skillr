// Static worksheet release checks: content, numbering, tiers and print delivery.
export function hasCompleteStaticWorksheet(source, code, expectedCount = 9) {
  const html = source.replace(/<!--[\s\S]*?-->/g, "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const text = (s) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const tasks = [...html.matchAll(/<article\b[^>]*class="task"[^>]*>([\s\S]*?)<\/article>/g)].map((m) => m[1]);
  const key = html.match(/<section\b[^>]*class="foundation-sheet answer-sheet"[^>]*>([\s\S]*?)<\/section>/)?.[1] || "";
  const answers = [...key.matchAll(/<li\s+value="(\d+)"[^>]*>([\s\S]*?)<\/li>/g)];
  return tasks.length === expectedCount && answers.length === expectedCount
    && tasks.every((task, i) => text(task).startsWith(`${i + 1}. `) && text(task).length > 10)
    && answers.every((answer, i) => Number(answer[1]) === i + 1 && text(answer[2]).length > 10)
    && ["Warm-up", "Core", "Challenge"].every((tier, i) => tasks.filter((t) => t.includes(`>${tier}<`)).length === [3, 4, 2][i])
    && key.includes(code) && html.includes(`/math/${code.toLowerCase()}/practice/`)
    && html.includes(`/math/${code.toLowerCase()}/test/`)
    && /<button\b[^>]*onclick="[^"]*classList\.remove\('print-answers'\);window\.print\(\)"/.test(html)
    && /<button\b[^>]*onclick="[^"]*classList\.add\('print-answers'\);window\.print\(\)"/.test(html)
    && /<link\b[^>]*href="\/assets\/foundation-three-packages\.css\?/.test(html);
}
