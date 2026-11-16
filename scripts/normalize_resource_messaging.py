#!/usr/bin/env python3
"""Owner-authorised site-wide SEO copy correction, 15 November 2026.

Keep routes, canonicals, authored lessons, questions, prices and real TpT sample
listings intact. Correct the public resource promise: online practice and paid
printable packs, with no free worksheet/PDF or worksheet-generator promotion.
Run after a legacy page generator; --check detects copy that it would restore.
"""
import argparse
import html
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SKIP = {'backup', 'reports', 'artifacts', 'exports', 'screenshots', 'docs',
        'tests', 'scripts', '.github', 'curriculum-question-banks', 'node_modules'}
CATALOGUE = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
BANKS = {b['code']: b for b in json.loads((ROOT / 'data/app-question-banks.json').read_text())['codes']}
PAID = [p for p in CATALOGUE if p.get('available') and p.get('hasPrintables')
        and not p.get('free') and str(p.get('price', '')) != '0'
        and p.get('tptUrl', '').startswith('https://www.teacherspayteachers.com/Product/')]
SAMPLE_ROUTES = {p['url'].rstrip('/') + '/index.html' for p in CATALOGUE
                 if p.get('free') or str(p.get('price', '')) == '0'}
PRODUCT_COPY = {html.unescape(p.get(k, '')).strip() for p in CATALOGUE
                for k in ('title', 'description') if p.get(k)}
TOKEN = re.compile(r'<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?</script>|<style\b[^>]*>[\s\S]*?</style>|<[^>]+>', re.I)
ANCHOR = re.compile(r'(<a\b[^>]*>)([\s\S]*?)(</a>)', re.I)
ATTR = re.compile(r'\b(href)=("|\')([^"\']+)\2', re.I)
META = re.compile(r'(\bcontent=)("|\')([^"\']*)\2', re.I)
CODE = re.compile(r'AC9[EMS][A-Z0-9]+', re.I)


def pack_for(code):
    matches = [p for p in PAID if code in p.get('curriculumCodes', [])]
    # Prefer an exact-code worksheet/workbook over a mixed bundle or slide pack.
    matches.sort(key=lambda p: (len(p.get('curriculumCodes', [])) != 1,
                               p.get('hasSlides', False), p.get('isBundle', False),
                               not p.get('tptObservedAt'), p['id']))
    return matches[0] if matches else None


def pack_url(code):
    product = pack_for(code)
    if not product:
        return '/print-and-go.html'
    local = ROOT / urlparse(product.get('url', '')).path.lstrip('/')
    if product.get('url', '').startswith('/') and (local.is_file() or (local / 'index.html').is_file()):
        return product['url']
    return product['tptUrl']


def practice_url(code):
    bank = BANKS.get(code)
    if bank and bank.get('practice'):
        return 'https://app.skillrhub.com/?' + ('try=1' if bank.get('guestPractice') else 'login=1') + '&skill=' + code
    return 'https://app.skillrhub.com/'


def wording(value):
    """Only resource-promise copy; never run against URLs or question banks."""
    sample_copy = {
        'Free TpT Samples & Paid Worksheets | SkillrHub',
        'Free TpT samples',
        'Try a free TpT sample',
        'SkillrHub free TpT samples and paid worksheet packs',
        'Browse 67 free SkillrHub resources on Teachers Pay Teachers: printable worksheets, teaching slides and matching topic guides. Complete paid worksheet packs are optional.',
    }
    if html.unescape(value).strip() in PRODUCT_COPY | sample_copy:
        return value
    value = value.replace('free topic guides, worksheets, practice and tests', 'topic guides and online practice, with paid worksheets sold separately')
    value = value.replace('Free topic guides, worksheets, practice and tests', 'Topic guides and online practice, with paid worksheets sold separately')
    value = value.replace('free public Australian Curriculum topic guides, selected worksheets and available practice', 'public Australian Curriculum topic guides, paid worksheets and available online practice')
    value = value.replace('free core topic guides, worksheet pages, practice resources, tests, sitemaps or AI discovery files', 'topic guides and online practice; worksheet packs are paid products')
    value = value.replace('Generating a separate worksheet in the app requires a free account.', 'Printable worksheets are purchased as packs on Teachers Pay Teachers.')
    value = value.replace('Families can access topic guides, worksheet and homework paths, short quizzes, Practice routes and Test routes without a learner login.', 'Families can read topic guides and use online practice. Printable worksheets are sold separately in paid packs.')
    value = value.replace('Use available free worksheet resources or choose a separately purchased printable pack for home or classroom learning.', 'Use online practice or purchase a paid worksheet pack for paper learning at home or in class.')
    value = value.replace('free alternative to paid worksheet sites', 'online practice alongside paid worksheets')
    fixed = {
        'Free written worksheet': 'Paid printable pack',
        'Free website worksheet': 'Paid printable pack',
        'free printable worksheet': 'paid printable pack',
        'Free printable learning resources': 'Paid printable packs and online practice',
        'free worksheet remain available': 'online practice remains available',
        'free worksheet remains available': 'online practice remains available',
        'free written worksheet remain available': 'online practice remains available',
        'free written worksheet remains available': 'online practice remains available',
        'free worksheet and homework resources': 'online practice resources',
        'core online worksheets and homework resources remain free': 'online practice is available separately from paid printable packs',
        'Free topic guide, worksheets, practice and tests': 'Topic guide and online practice; printable packs sold separately',
        'Free Australian Curriculum v9 guide, worksheet, practice and test': 'Australian Curriculum v9 guide and online practice; printable packs sold separately',
        'free core worksheets': 'online practice',
        'free worksheet pathways': 'online practice and paid printable packs',
        'free worksheet hub': 'practice and printable-pack hub',
        'Free Worksheets &amp; Homework Sheets': 'Printable Packs &amp; Online Practice',
        'Free Worksheets & Homework Sheets': 'Printable Packs & Online Practice',
        'Free Worksheets and Homework Sheets': 'Printable Packs and Online Practice',
        'free worksheets and homework sheets': 'paid printable packs and online practice',
        'Free Australian Curriculum homework': 'Australian Curriculum practice and paid printable packs',
        'Free Worksheets': 'Paid Printable Packs',
        'Free worksheets': 'Paid printable packs',
        'free worksheets': 'paid printable packs',
        'Free worksheet': 'Paid printable pack',
        'free worksheet': 'paid printable pack',
        'Free homework sheets': 'Paid printable packs',
        'free homework sheets': 'paid printable packs',
        'free homework': 'online practice',
        'All free worksheets': 'Browse paid printable packs',
        'static, indexable pages': 'readable topic pages',
        'canonical resource path': 'full curriculum',
        'Canonical resource path': 'Full curriculum',
    }
    for old, new in fixed.items():
        value = value.replace(old, new)
    # Natural-language year/topic headings and descriptions, not URL slugs.
    value = re.sub(r'\b[Ff]ree\s+((?:(?!\b(?:and|or|with|is|are|remain|paid|packs)\b)[\w /–&;+-]){1,110}?)\s+(?:[Ww]orksheets?|[Hh]omework [Ss]heets?)\b',
                   lambda m: 'Paid ' + re.sub(r'^[Pp]rintable\s+', '', m[1]) + ' worksheets', value)
    value = value.replace('free topic guides, worksheet routes and practice links', 'topic guides and online practice; printable packs are sold separately')
    value = value.replace('Free topic guides, worksheets and quizzes', 'Topic guides and online practice; paid printable packs')
    value = value.replace('free topic guides, worksheets, quizzes, Practice and Tests', 'topic guides and online practice')
    value = value.replace('core topic guides, worksheets, quizzes, Practice and Tests', 'topic guides and online practice')
    value = value.replace('free topic guides, worksheets, homework sheets, practice and tests', 'topic guides and online practice')
    value = value.replace('core online topic guides, worksheets, homework sheets, practice and tests are free to use', 'online practice and topic guides are available separately from paid printable packs')
    value = value.replace('free written worksheet', 'paid printable pack')
    value = value.replace('the page title and URL use natural language for Google search', 'learners can connect the explanation with the matching online practice')
    value = value.replace('The code remains visible for teachers, tutors and AI citation, while ', 'Use the curriculum code to check the topic and year level; ')
    value = re.sub(r'This page links the human-search topic to Australian Curriculum code (AC9[A-Z0-9]+) and related SkillrHub resources\.',
                   r'This topic supports Australian Curriculum code \1. Check each printable listing for its specific contents.', value)
    value = value.replace('free worksheet', 'paid printable pack')
    # Remaining year/topic titles may contain commas and "and". A resource
    # list containing teaching/practice is mixed access, not a paid lesson.
    def remaining(m):
        lead, middle, ending = m[1], m[2], m[3]
        if re.search(r'\b(?:guide|guides|practice|notes|learning|access|question bank)\b', middle, re.I):
            return middle + 'paid ' + ending.lower()
        return ('Paid ' if lead[0].isupper() else 'paid ') + middle + ending
    value = re.sub(r'\b([Ff]ree)\s+((?:(?!\b(?:paid|optional|price|sample|preview)\b)[\w ,/–&;+-]){0,160}?)([Ww]orksheets?|[Hh]omework [Ss]heets?)\b', remaining, value)
    value = value.replace('Paid Printable Packs', 'Paid Worksheets').replace('Paid printable packs', 'Paid worksheets').replace('paid printable packs', 'paid worksheets')
    value = value.replace('Printable Packs &amp; Online Practice', 'Paid Worksheets &amp; Online Practice').replace('Printable Packs & Online Practice', 'Paid Worksheets & Online Practice')
    value = value.replace('Paid printable pack', 'Paid worksheet pack').replace('paid printable pack', 'paid worksheet pack')
    value = value.replace('Free resources for this topic', 'Online practice and paid worksheets')
    value = value.replace('Free Maths resources', 'Online maths practice and paid worksheets')
    value = value.replace('Free Australian Curriculum resources', 'Australian Curriculum practice and paid worksheets')
    value = value.replace('SkillrHub • Free Australian Curriculum learning resources •', 'SkillrHub • Paid worksheet packs •')
    value = value.replace('Free, no learner login required.', 'Online practice and paid worksheets are separate options.')
    value = value.replace('Students can use SkillrHub’s topic guides and online practice without paying or creating a learner account.', 'Students can read the topic guides and use online practice. Printable worksheet packs are purchased separately; account and access requirements are shown in the app.')
    value = value.replace('Are these resources free?', 'Are the worksheets paid?')
    value = re.sub(r'Are these (.*?) (?:worksheets|homework sheets) free\?', r'Are the \1 worksheets paid?', value)
    value = re.sub(r'Yes\. These (.*?) resources are free to access without a learner login\. Optional premium books are separate and do not block access to the core online resources\.', r'Yes. \1 printable worksheet packs are paid resources. Check the listing for its preview, contents and current price. Online practice is available separately.', value)
    value = value.replace('Yes. SkillrHub provides topic guides and online practice; printable packs are sold separately for this learning area.', 'Printable worksheet packs are paid resources. Topic guides and online practice are available separately. Check each listing for its preview, contents and current price.')
    return value


def json_copy(obj):
    if isinstance(obj, list):
        return [json_copy(v) for v in obj]
    if not isinstance(obj, dict):
        return obj
    # The actual store catalogue is authoritative, including genuine free samples.
    if obj.get('@type') in ('Product', 'Offer', 'AggregateOffer'):
        return obj
    if obj.get('isAccessibleForFree') is True and re.search(r'/(?:worksheet|homework)/', str(obj.get('url', ''))):
        obj = dict(obj, isAccessibleForFree=False)
    return {k: wording(v) if isinstance(v, str) and k in {
        'name', 'headline', 'description', 'text', 'articleBody', 'learningResourceType'
    } else json_copy(v) for k, v in obj.items()}


def transform(source, name):
    is_sample = '/' + name in SAMPLE_ROUTES
    # Preserve real product names, prices, pack contents and sample claims.
    is_product = name.startswith('products/tpt-') or name.startswith('products/year-')
    protected = []
    def protect(m):
        protected.append(m[0]); return f'<!-- RESOURCE-CATALOGUE-COPY-{len(protected)-1} -->'
    # These are real store listings, not generic claims about website access.
    # The owned sample block is built only from observed zero-price TpT listings.
    source = re.sub(r'<!-- free-tpt-samples:start -->[\s\S]*?<!-- free-tpt-samples:end -->', protect, source)
    source = re.sub(r'<article\b[^>]*class=["\'][^"\']*\bproduct-card\b[^"\']*["\'][^>]*>[\s\S]*?</article>', protect, source, flags=re.I)
    source = re.sub(r'<a\b[^>]*href=["\']https://www\.teacherspayteachers\.com/[^"\']+["\'][^>]*>[\s\S]*?</a>', protect, source, flags=re.I)
    pieces = []; pos = 0
    for token in TOKEN.finditer(source):
        text = source[pos:token.start()]
        pieces.append(text if is_sample or is_product else wording(text))
        tag = token[0]
        if re.match(r'<script\b', tag, re.I):
            if 'application/ld+json' in tag.lower() and not is_sample:
                m = re.match(r'(<script\b[^>]*>)([\s\S]*?)(</script>)', tag, re.I)
                try:
                    obj = json.loads(m[2]); updated = json_copy(obj)
                    if updated != obj:
                        tag = m[1] + json.dumps(updated, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + m[3]
                except (ValueError, TypeError):
                    pass
        elif re.match(r'<meta\b', tag, re.I) and not is_sample and not is_product:
            if re.search(r'(?:name|property)=["\'](?:description|og:title|og:description|twitter:title|twitter:description)["\']', tag, re.I):
                tag = META.sub(lambda m: m[1] + m[2] + html.escape(wording(html.unescape(m[3])), quote=True) + m[2], tag)
        pieces.append(tag); pos = token.end()
    pieces.append(source[pos:] if is_sample or is_product else wording(source[pos:]))
    after = ''.join(pieces)
    if is_sample or is_product:
        for i, block in enumerate(protected):
            after = after.replace(f'<!-- RESOURCE-CATALOGUE-COPY-{i} -->', block)
        return after

    def link(m):
        a = ATTR.search(m[1])
        if not a:
            return m[0]
        href = html.unescape(a[3]); u = urlparse(href)
        if u.netloc and u.netloc not in ('skillrhub.com', 'www.skillrhub.com'):
            return m[0]
        code = CODE.search(u.path)
        if code and re.search(r'/(?:worksheet|homework)/?(?:index\.html)?$', u.path):
            code = code[0].upper()
            start = m[1][:a.start(3)] + html.escape(pack_url(code), quote=True) + m[1][a.end(3):]
            return start + ('View paid worksheets' if pack_for(code) else 'Browse paid worksheets') + m[3]
        topic_code = CODE.search(name)
        if href == '/print-and-go.html' and 'Browse paid worksheets' in m[2] and topic_code and pack_for(topic_code[0].upper()):
            target = pack_url(topic_code[0].upper())
            start = m[1][:a.start(3)] + html.escape(target, quote=True) + m[1][a.end(3):]
            return start + 'View paid worksheets' + m[3]
        if u.path == '/worksheets/' and u.fragment == 'free-tpt-samples':
            return m[0]
        if u.path == '/worksheets/' and re.search(r'free|worksheet|homework', m[2], re.I):
            return m[1] + 'Paid worksheets' + m[3]
        return m[0]
    after = ANCHOR.sub(link, after)
    # These boxes describe SEO implementation rather than helping a learner.
    after = re.sub(r'<div class="answer-box"><strong>Direct answer:</strong> This is the human-search page for [\s\S]*?</div>',
                   '<div class="answer-box"><strong>Online practice or paid worksheets:</strong> Read the topic explanation and try online practice. For paper learning, preview the paid worksheet pack and check its contents before purchasing.</div>', after)
    if name.startswith('worksheets/') or 'class="container seo-pillar"' in after:
        after = re.sub(r'<h2>Free resources for this topic</h2>', '<h2>Online practice and paid worksheets</h2>', after)
        after = after.replace('Free, no learner login required.', 'Online practice and paid worksheets are separate options.')
        after = after.replace('then open its worksheet or homework sheet', 'then choose online practice or a paid worksheet pack')
        after = after.replace('Complete the free worksheet.', 'Choose a paid worksheet pack for paper practice.')
        after = after.replace('These resources are free to access without a learner login.', 'Printable worksheets are paid resources; online practice is available separately.')
        after = after.replace('Optional premium books are separate and do not block access to the core online resources.', 'Check each paid listing for its preview, contents and current price.')
        after = re.sub(r'(<p>)(?:Each year card opens a free worksheet|Each year card opens a paid worksheet)[\s\S]*?(</p>)',
                       r'\1Choose a year and subject, read the matching topic guide, then use online practice or browse paid worksheet packs. Check the product listing before purchasing; pack availability and contents vary by topic.\2', after)
        after = after.replace('Core resources stay free; optional books are separate premium bundles.', 'Online practice and paid worksheet packs are separate options.')
        after = after.replace('choose the free worksheet, quiz, practice or test pathway you need', 'choose online practice or browse the paid worksheets available for that topic')
        after = after.replace('choose the homework sheet, topic guide, quiz, practice or test resource you need', 'choose a topic guide, online practice or an available paid worksheet pack')
    # Shared resource headings must not describe a purchase link as free.
    after = after.replace('<h2>Free resources for this topic</h2>', '<h2>Online practice and paid worksheets</h2>')
    if name.startswith('year2/maths/ac9') and 'id="skillr-topic-practice-now"' in after:
        # Retain the one verified floating entrance; the older shortcut creates
        # a second competing Practice action and fails the existing layout gate.
        after = re.sub(r'(<nav\b[^>]*class="shortcuts"[^>]*>)([\s\S]*?)(</nav>)',
                       lambda m: m[1] + re.sub(r'<a\b[^>]*data-floating-practice=["\'][^"\']+["\'][^>]*>[\s\S]*?</a>', '', m[2]) + m[3], after)
    for i, block in enumerate(protected):
        after = after.replace(f'<!-- RESOURCE-CATALOGUE-COPY-{i} -->', block)
    if re.fullmatch(r'quiz/.+/(?:worksheet|homework)/index\.html', name) or name == 'year1/maths/ac9m1n03-skip-counting-and-equal-groups/quick-check/index.html':
        # Retain withdrawn PDF URLs for old bookmarks, but stop submitting them
        # as search destinations after removing their free-worksheet promotion.
        after = re.sub(r'(<meta\b[^>]*name=["\']robots["\'][^>]*content=["\'])[^"\']+', r'\g<1>noindex, follow', after, flags=re.I)
        if not re.search(r'<meta\b[^>]*name=["\']robots["\']', after, re.I):
            after = re.sub(r'(<head\b[^>]*>)', r'\1<meta name="robots" content="noindex, follow">', after, count=1, flags=re.I)
    from repair_priority_seo import repair_actions
    return repair_actions(after, BANKS)


def files():
    for name in subprocess.check_output(['git', 'ls-files', '*.html'], cwd=ROOT, text=True).splitlines():
        if not set(Path(name).parts) & SKIP:
            yield name


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--check', action='store_true')
    args = parser.parse_args(); changed = []
    for name in files():
        path = ROOT / name; before = path.read_text(); after = transform(before, name)
        if after != before:
            changed.append(name)
            if not args.check:
                path.write_text(after)
    print(json.dumps({'pages_needing_update' if args.check else 'pages_updated': len(changed), 'examples': changed[:15]}))
    if args.check and changed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
