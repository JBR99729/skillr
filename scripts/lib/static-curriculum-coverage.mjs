export function hasStaticCurriculumCoverage(html, expectedElaborations) {
  const source = html.replace(/<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, "");
  const text = (value) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (/(?:Content description:|Australian Curriculum coverage|curriculum mapping)/i.test(text(source))) return true;

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
