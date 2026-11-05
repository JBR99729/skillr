// A cited official curriculum PDF is a reference, not a SkillrHub teacher deck.
// Teacher viewers retain their separate blanket no-PDF/PPTX rule.
const officialReferenceHosts = new Set([
  'www.qcaa.qld.edu.au',
  'digital-classroom.nma.gov.au',
]);

function decodeAttribute(value) {
  const named = { amp:'&', AMP:'&', period:'.', sol:'/', colon:':', quest:'?', num:'#', equals:'=', Tab:'\t', NewLine:'\n' };
  return value.replace(/&(#(?:x|X)[\da-fA-F]+;?|#\d+;?|(?:amp|AMP|period|sol|colon|quest|num|equals|Tab|NewLine);)/g, (entity, raw) => {
    const name = raw.endsWith(';') ? raw.slice(0,-1) : raw;
    if (name[0] !== '#') return named[name] ?? entity;
    const code = /^#x/i.test(name) ? parseInt(name.slice(2),16) : Number(name.slice(1));
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '\ufffd';
  });
}

function attributesOf(raw) {
  const attributes = new Map();
  const tokens = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const token of raw.matchAll(tokens)) {
    const name = token[1].toLowerCase();
    // HTML uses the first occurrence of a duplicated attribute.
    if (!attributes.has(name)) attributes.set(name, decodeAttribute(token[2] ?? token[3] ?? token[4] ?? ''));
  }
  return attributes;
}

export function hasUnapprovedTopicDownload(source) {
  const anchors = /<a(?=[\s/>])((?:[^"'<>]|"[^"]*"|'[^']*')*)>/gi;
  for (const match of source.matchAll(anchors)) {
    const attributes = attributesOf(match[1]);
    if (!attributes.has('href')) continue;
    let url;
    try { url = new URL(attributes.get('href'), 'https://skillrhub.com/'); }
    catch { continue; }
    // Extension checks concern ASCII bytes. Decode valid escapes independently
    // so an unrelated malformed escape cannot hide a PDF/PPTX filename.
    const address = url.href.replace(/%([\da-f]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex,16)));
    // Preserve detection of download filenames carried in queries/fragments.
    if (/\.pptx(?=$|[?&#])/i.test(address)) return true;
    if (!/\.pdf(?=$|[?&#])/i.test(address)) continue;
    const labelledReference = attributes.get('data-curriculum-reference') === 'true';
    if (!(labelledReference && url.protocol === 'https:' && officialReferenceHosts.has(url.hostname))) return true;
  }
  return false;
}
