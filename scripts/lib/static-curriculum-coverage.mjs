export function hasStaticCurriculumCoverage(html, expectedElaborations) {
  const source = html.replace(/<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, "");
  const text = (value) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (/(?:Content description:|Australian Curriculum coverage|curriculum mapping)/i.test(text(source))) return true;

  // Current topic-first guides group the descriptor into authored teaching
  // focuses rather than repeat a formal curriculum label. Empty summaries or
  // text hidden in comments/scripts cannot satisfy this content gate.
  const focuses = [...source.matchAll(/<details\b(?=[^>]*id=["']focus-\d+["'])[^>]*class=["'][^"']*\btopic-focus\b[^"']*["'][^>]*>/gi)];
  if (focuses.length >= 3 && focuses.every((match, index) => {
    const block = source.slice(match.index, focuses[index + 1]?.index ?? source.length);
    return /<summary\b[^>]*>[\s\S]*?\w[\s\S]*?<\/summary>/i.test(block)
      && /<h3\b[^>]*>Worked example:/i.test(block)
      && /class=["'][^"']*\btopic-answer\b/i.test(block)
      && /<p\b[^>]*>[^<]*\w[\s\S]*?<\/p>/i.test(block);
  })) return true;

  // The current English guides teach the curriculum through static elaboration
  // articles. Check their content as well as the heading; an empty label fails.
  for (const section of source.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)) {
    const heading = section[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!heading || !/^Australian Curriculum elaborations$/i.test(text(heading[1]))) continue;
    const articles = [...section[1].matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)];
    if (expectedElaborations > 0 && articles.length === expectedElaborations && articles.every((article) => {
      const title = article[1].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i);
      const description = article[1].match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
      return title && /^E\d+\b/.test(text(title[1])) && description && text(description[1]).length > 0;
    })) return true;
  }
  return false;
}
