import test from 'node:test';
import assert from 'node:assert/strict';
import { hasUnapprovedTopicDownload } from '../lib/topic_reference_downloads.mjs';

test('labelled HTTPS references to inspected official PDFs are permitted on topic pages', () => {
  assert.equal(hasUnapprovedTopicDownload('<a data-curriculum-reference="true" href="https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr5_comp.pdf#page=1">Comparison</a>'), false);
  assert.equal(hasUnapprovedTopicDownload('<a href="https://digital-classroom.nma.gov.au/sites/default/files/2023-10/teacher-guide-year-1.pdf" data-curriculum-reference="true">Museum reference</a>'), false);
});

test('a reference label cannot expose a first-party PDF or any PPTX', () => {
  for (const href of ['/assets/teacher-slides/deck.pdf', 'https://skillrhub.com/deck.pdf', 'https://www.qcaa.qld.edu.au/deck.pptx', '/deck.pd%66']) {
    assert.equal(hasUnapprovedTopicDownload(`<a data-curriculum-reference="true" href="${href}">Reference</a>`), true, href);
  }
});

test('unlabelled, non-HTTPS and unapproved external PDF links remain blocked', () => {
  for (const link of [
    '<a href="https://www.qcaa.qld.edu.au/file.pdf">Reference</a>',
    '<a data-curriculum-reference="true" href="http://www.qcaa.qld.edu.au/file.pdf">Reference</a>',
    '<a data-curriculum-reference="true" href="https://example.com/file.pdf">Reference</a>',
    '<a data-curriculum-reference="true" href="https://www.qcaa.qld.edu.au.example.com/file.pdf">Reference</a>',
  ]) assert.equal(hasUnapprovedTopicDownload(link), true, link);
});

test('data-href and marker-looking text cannot override real attributes', () => {
  for (const link of [
    '<a href="/assets/teacher-slides/deck.pptx" data-href="https://www.qcaa.qld.edu.au/file.pdf" data-curriculum-reference="true">Deck</a>',
    '<a href="/assets/teacher-slides/deck.pdf" data-href="https://www.qcaa.qld.edu.au/file.pdf" data-curriculum-reference="true">Deck</a>',
    '<a href="https://www.qcaa.qld.edu.au/file.pdf" title=\'data-curriculum-reference="true"\'>Reference</a>',
    '<a title=\'href="https://www.qcaa.qld.edu.au/file.pdf"\' data-curriculum-reference="true" href="/deck.pdf">Deck</a>',
    '<a href="/deck.pdf" href="https://www.qcaa.qld.edu.au/file.pdf" data-curriculum-reference="true">Deck</a>',
  ]) assert.equal(hasUnapprovedTopicDownload(link), true, link);
});

test('unquoted, entity-encoded and query-carried downloads remain blocked', () => {
  for (const link of [
    '<a href=/deck.pdf>Deck</a>',
    '<a href="/deck&#46;pdf">Deck</a>',
    '<a href="/deck&period;pdf">Deck</a>',
    '<a href="/deck.pd&#102;">Deck</a>',
    '<a href="/download?file=deck.pdf">Deck</a>',
    '<a href="/download?file=deck.pptx">Deck</a>',
    '<a href="/download?file=deck.pdf&amp;view=1">Deck</a>',
    '<a data-curriculum-reference="true" href="https&COLON;//www.qcaa.qld.edu.au/file.pdf">Deck</a>',
    '<a href="/deck&#46pdf">Deck</a>',
    '<a href="/deck.ppt&#120">Deck</a>',
    '<a href="/deck.ppt%78?unused=%">Deck</a>',
    '<a href="/deck.pd%66?unused=%">Deck</a>',
  ]) assert.equal(hasUnapprovedTopicDownload(link), true, link);
  assert.equal(hasUnapprovedTopicDownload('<a data-curriculum-reference=true href=https://www.qcaa.qld.edu.au/file.pdf>Reference</a>'), false);
});
