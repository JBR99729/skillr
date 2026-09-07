"""Check static catalogue links and SEO data before release."""
import json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / 'print-and-go.html', *sorted((ROOT / 'print-and-go').rglob('index.html'))]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.schemas, self.canonicals = [], [], []
        self.schema = None
        self.headings = 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1':
            self.headings += 1
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema = ''
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs['href'])
        if tag in ('a', 'link', 'script', 'img'):
            self.links.append(attrs.get('href', attrs.get('src', '')))
        if 'unavailable' in attrs.get('class', '').split():
            assert tag != 'a' and 'tabindex' not in attrs

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None


sitemap = {node.text for node in ET.parse(ROOT / 'sitemap-site.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
for path in PAGES:
    page = Page(path.read_text())
    url = 'https://skillrhub.com/' + str(path.relative_to(ROOT)).replace('/index.html', '/')
    assert page.headings == 1 and page.canonicals == [url], path
    assert url in sitemap, url
    payload = page.schemas[0]
    graph = payload.get('@graph', [payload])
    if path != ROOT / 'print-and-go.html':
        assert any(item['@type'] == 'BreadcrumbList' for item in graph)
    for link in page.links:
        parsed = urlsplit(link)
        if link.startswith('/') or parsed.netloc == 'skillrhub.com':
            target = ROOT / parsed.path.lstrip('/')
            assert target.exists(), (path, link)
products = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
for product in products:
    if not product.get('available'):
        continue
    parsed = urlsplit(product['url'])
    if parsed.path == '/product.html':
        assert (ROOT / 'product.html').exists(), product['url']
        assert parsed.query == f"id={product['id']}", product['url']
        continue
    target = ROOT / parsed.path.lstrip('/') / 'index.html'
    graph = Page(target.read_text()).schemas[0]['@graph']
    schema = next(item for item in graph if item['@type'] == 'Product')
    assert schema['offers']['price'] == product['price']
    assert schema['offers']['url'] == product['tptUrl']
print(f'Checked {len(PAGES)} catalogue pages: links, canonicals, breadcrumbs, sitemap and product offers.')
