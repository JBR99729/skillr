// Shared recognition of existing static classroom-view layouts.
export function hasTeacherDisplayPage(html) {
  const legacy = /data-single-open/i.test(html) && /(?:Clean visual examples|Worked examples)/i.test(html);
  const topicFirst = /name=["']lesson["']/i.test(html)
    && /id=["']curriculum-mapping["']/i.test(html)
    && /\/assets\/css\/classroom-view\.css/i.test(html)
    && /We do/i.test(html);
  const sharedClassroomCss = /\/assets\/css\/classroom-view\.css/i.test(html);
  const currentWrapper = (
    /class=["'][^"']*\bclassroom-view(?:-v2)?\b[^"']*["']/i.test(html)
    && /class=["'][^"']*\b(?:display-board|classroom-shell)\b[^"']*["']/i.test(html)
  ) || (
    /class=["'][^"']*\bshell\b[^"']*["']/i.test(html)
    && /class=["'][^"']*\bboard\b[^"']*["']/i.test(html)
  );
  const staticClassroomView = sharedClassroomCss && currentWrapper;
  return (/(?:Teacher Display Page)/i.test(html) || staticClassroomView)
    && (legacy || topicFirst || staticClassroomView)
    && /<details\b/i.test(html)
    && /<summary\b/i.test(html)
    && !/class=["'][^"']*\bexample-icon\b[^"']*["']/i.test(html);
}
