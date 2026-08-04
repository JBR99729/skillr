#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://skillrhub.com}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPO_ROOT"

html_files=()
while IFS= read -r file; do
  html_files+=("$file")
done < <(git ls-files -- '*.html' | sort)

to_path() {
  local file="$1"
  if [[ "$file" == "index.html" ]]; then
    printf "/"
  elif [[ "$file" == */index.html ]]; then
    local dir="${file%/index.html}"
    printf "/%s/" "$dir"
  else
    printf "/%s" "$file"
  fi
}

capitalize_first() {
  local value="$1"
  if [[ -z "$value" ]]; then
    printf ''
    return
  fi
  python3 - "$value" <<'PY'
import sys
value = sys.argv[1]
if not value:
    sys.exit(0)
print(value[0].upper() + value[1:])
PY
}

to_title() {
  local file="$1"
  local base
  base="${file##*/}"
  if [[ "$base" == "index.html" ]]; then
    local dir="${file%/index.html}"
    if [[ -z "$dir" || "$dir" == "$file" ]]; then
      printf "Home"
    else
      dir="${dir##*/}"
      printf "%s" "$(capitalize_first "$dir")"
    fi
  else
    base="${base%.html}"
    base="${base//-/ }"
    printf "%s" "$(capitalize_first "$base")"
  fi
}

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  for file in "${html_files[@]}"; do
    path="$(to_path "$file")"

    echo '  <url>'
    echo "    <loc>${BASE_URL}${path}</loc>"
    echo '  </url>'
  done

  echo '</urlset>'
} > sitemap.xml

{
  cat <<'HTML_HEADER'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="google-adsense-account" content="ca-pub-7734963540104771">
    <meta charset="UTF-8">
    <title>Sitemap | Skillr Education</title>
    <meta name="description" content="Complete sitemap for Skillr Education pages.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="preconnect" href="https://www.google-analytics.com">
    <link rel="preconnect" href="https://pagead2.googlesyndication.com">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
    <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">
    <link rel="canonical" href="https://skillrhub.com/sitemap.html">
    <meta name="robots" content="index, follow">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8P22BET45N');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771"
     crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">

    <nav class="main-nav">
        <a href="./">Home</a>
        <a href="sitemap.html">Sitemap</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="usefulresources.html">Useful Resources</a>
        <a href="privacy-policy.html">Privacy Policy</a>
    </nav>

    <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
            <li><a href="./">Home</a></li>
            <li aria-current="page">Sitemap</li>
        </ol>
    </nav>

    <h1>Website Sitemap</h1>
    <p>This page is automatically generated from tracked HTML files in the repository.</p>

    <h2>All Pages</h2>
    <ul>
HTML_HEADER

  for file in "${html_files[@]}"; do
    path="$(to_path "$file")"
    title="$(to_title "$file")"
    href="${path#/}"
    if [[ -z "$href" ]]; then
      href="./"
    fi
    printf '        <li><a href="%s">%s</a></li>\n' "$href" "$title"
  done

  cat <<'HTML_FOOTER'
    </ul>

    <footer>
        <p>© 2026 Skillr Education. All rights reserved.</p>
        <p>
            Educational resources are provided for students, parents and teachers for learning purposes only.
            Commercial use, redistribution or resale is strictly prohibited without written permission.
        </p>
    </footer>

</div>
</body>
</html>
HTML_FOOTER
} > sitemap.html

echo "Updated sitemap.xml and sitemap.html with ${#html_files[@]} URLs."
