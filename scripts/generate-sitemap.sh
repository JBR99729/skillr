#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://skillrhub.com}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPO_ROOT"

mapfile -t html_files < <(git ls-files -- '*.html' | sort)

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  for file in "${html_files[@]}"; do
    if [[ "$file" == "index.html" ]]; then
      path="/"
    elif [[ "$file" == */index.html ]]; then
      dir="${file%/index.html}"
      path="/${dir}/"
    else
      path="/${file}"
    fi

    echo '  <url>'
    echo "    <loc>${BASE_URL}${path}</loc>"
    echo '  </url>'
  done

  echo '</urlset>'
} > sitemap.xml

echo "Updated sitemap.xml with ${#html_files[@]} URLs."
