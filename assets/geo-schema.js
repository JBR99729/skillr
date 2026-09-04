(() => {
  "use strict";

  const ORIGIN = "https://skillrhub.com";
  const SUBJECTS = {
    maths: "Maths",
    science: "Science",
    english: "English"
  };

  const normalisePath = (pathname) => pathname.replace(/\/index\.html$/i, "/");
  const path = normalisePath(window.location.pathname);

  const yearLabel = (slug) => {
    if (slug === "foundation") return "Foundation";
    const match = slug.match(/^year(\d+)$/i);
    return match ? `Year ${match[1]}` : slug;
  };

  const absoluteUrl = (pathname) => `${ORIGIN}${pathname}`;

  const text = (selector) => {
    const node = document.querySelector(selector);
    return node ? node.textContent.trim().replace(/\s+/g, " ") : "";
  };

  const upsertJsonLd = (id, data) => {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  };

  const extractCurriculumCode = () => {
    const candidates = [
      text(".curriculum-eyebrow"),
      text("h1"),
      document.title || "",
      path
    ];
    for (const value of candidates) {
      const match = value.match(/AC9[A-Z0-9]+/i);
      if (match) return match[0].toUpperCase();
    }
    return "";
  };

  const topicTitle = (code) => {
    const heading = text("h1") || document.title.replace(/\s*\|\s*SkillrHub.*$/i, "");
    return heading.replace(new RegExp(`^${code}:?\\s*`, "i"), "").trim() || code;
  };

  const ensureVisibleBreadcrumb = (items) => {
    const nav = document.querySelector('nav[aria-label="Breadcrumb"]');
    const list = nav ? nav.querySelector("ol") : null;
    if (!list || list.children.length >= items.length) return;

    list.innerHTML = "";
    items.forEach((item, index) => {
      const li = document.createElement("li");
      if (index === items.length - 1) {
        li.textContent = item.name;
        li.setAttribute("aria-current", "page");
      } else {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.name;
        li.appendChild(link);
      }
      list.appendChild(li);
    });
  };

  const addBreadcrumbSchema = (items) => {
    upsertJsonLd("skillrhub-breadcrumb-jsonld", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    });
  };

  const addCourseSchema = ({ yearSlug, subjectSlug }) => {
    const year = yearLabel(yearSlug);
    const subject = SUBJECTS[subjectSlug];
    if (!year || !subject) return;

    upsertJsonLd("skillrhub-course-jsonld", {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": absoluteUrl(`/${yearSlug}/curriculum/${subjectSlug}/#course`),
      name: `${year} ${subject} Course - SkillrHub`,
      description: `Free ${year} ${subject} learning resources aligned to the Australian Curriculum, with topic guides, worksheets, practice and tests.`,
      provider: {
        "@type": "Organization",
        name: "SkillrHub",
        url: ORIGIN
      },
      educationalLevel: year,
      about: subject,
      isAccessibleForFree: true,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "Self-paced"
      }
    });
  };

  const addCredentialSchema = () => {
    upsertJsonLd("skillrhub-credential-jsonld", {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      "@id": `${ORIGIN}/#australian-curriculum-alignment`,
      name: "Australian Curriculum-aligned K-10 learning resource",
      description: "SkillrHub organises free K-10 Maths, Science and English practice around Australian Curriculum codes and year-level topic pathways.",
      credentialCategory: "Curriculum-aligned learning resource",
      educationalLevel: "Foundation to Year 10",
      recognizedBy: {
        "@type": "Organization",
        name: "SkillrHub",
        url: ORIGIN
      }
    });
  };

  const enhanceCurriculumPage = () => {
    const topicMatch = path.match(/^\/(foundation|year(?:[1-9]|10))\/(maths|science|english)\/([^/]+)\/?$/i);
    const hubMatch = path.match(/^\/(foundation|year(?:[1-9]|10))\/curriculum\/(maths|science|english)\/?$/i);
    const match = topicMatch || hubMatch;
    if (!match) return;

    const [, yearSlug, subjectSlug] = match.map((part) => part && part.toLowerCase());
    const year = yearLabel(yearSlug);
    const subject = SUBJECTS[subjectSlug];
    const code = topicMatch ? extractCurriculumCode() : "";
    const currentName = topicMatch ? (code || topicTitle(code)) : subject;

    const items = [
      { name: "Home", url: absoluteUrl("/") },
      { name: year, url: absoluteUrl(`/${yearSlug}/curriculum/`) },
      { name: "Curriculum", url: absoluteUrl(`/${yearSlug}/curriculum/`) },
      { name: subject, url: absoluteUrl(`/${yearSlug}/curriculum/${subjectSlug}/`) }
    ];

    if (topicMatch) items.push({ name: currentName, url: absoluteUrl(path) });

    ensureVisibleBreadcrumb(items);
    addBreadcrumbSchema(items);
    addCourseSchema({ yearSlug, subjectSlug });
    addCredentialSchema();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceCurriculumPage, { once: true });
  } else {
    enhanceCurriculumPage();
  }
})();
