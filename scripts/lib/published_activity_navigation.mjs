import fs from 'node:fs';
import path from 'node:path';

export const visibleHtml = html => html.replace(/<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, '');
export const hrefs = html => [...visibleHtml(html).matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
  .map(match => match[1].replaceAll('&amp;', '&'));

export function appBanks(root = process.cwd()) {
  return new Map(JSON.parse(fs.readFileSync(path.join(root, 'data/app-question-banks.json'), 'utf8')).codes.map(bank => [bank.code, bank]));
}

// The main card no longer requires separate Practice and Test buttons. Published
// practice uses its matching app bank; assessment is reached within that app.
// If a page retains an assessment link, it must still match verified availability.
export function validateTopicActivities(html, code, root = process.cwd()) {
  const errors = [];
  const bank = appBanks(root).get(code);
  const links = hrefs(html);
  const expected = `https://app.skillrhub.com/?${bank?.guestPractice ? 'try' : 'login'}=1&skill=${code}`;
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]?.replaceAll('&amp;', '&');
  const matchingPractice = href => {
    const url = new URL(href, 'https://skillrhub.com/');
    if (url.searchParams.has('returnTo')) {
      if (!canonical || url.searchParams.getAll('returnTo').length !== 1 || url.searchParams.get('returnTo') !== canonical) return false;
      url.searchParams.delete('returnTo');
    }
    return url.href === expected;
  };
  if (bank?.practice && !links.some(matchingPractice)) errors.push(`${code}: missing published app practice link ${expected}`);
  for (const href of links) {
    const url = new URL(href, 'https://skillrhub.com/');
    if (url.hostname === 'skillrhub.com' && /^\/quiz\/[^/]+\/[^/]+\/ac9[a-z0-9]+\/(practice|test|quiz)(?:\/|$)/i.test(url.pathname)) {
      errors.push(`${code}: link to retired activity ${href}`);
    }
    if (url.hostname !== 'app.skillrhub.com') continue;
    const target = url.searchParams.get('skill') || url.searchParams.get('assessment');
    if (!target) continue; // The catalogue is a valid destination for unavailable codes.
    if (target !== code) { errors.push(`${code}: app activity points to another code (${target})`); continue; }
    if (url.searchParams.has('assessment')) {
      if (!bank?.assessment) errors.push(`${code}: advertises an unavailable assessment`);
    } else if (!bank?.practice || !matchingPractice(href)) errors.push(`${code}: practice access does not match published availability (${href})`);
  }
  return errors;
}

// Retired URLs remain accessible as safe, noindex compatibility shims. Do not
// resurrect the old JS player merely to satisfy a historical runtime test.
export function validateRetiredActivity(html, code, root = process.cwd()) {
  const errors = [];
  const bank = appBanks(root).get(code);
  const target = bank?.practice
    ? `https://app.skillrhub.com/?${bank.guestPractice ? 'try' : 'login'}=1&skill=${code}`
    : 'https://app.skillrhub.com/';
  const decoded = html.replaceAll('&amp;', '&');
  if (!/data-legacy-quiz-retired=/.test(html)) errors.push(`${code}: missing retirement marker`);
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(html)) errors.push(`${code}: retired player must remain noindex,follow`);
  for (const [label, regex] of [
    ['canonical', /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i],
    ['HTML redirect', /<meta\b[^>]*http-equiv=["']refresh["'][^>]*content=["']0;url=([^"']+)/i],
  ]) if (decoded.match(regex)?.[1] !== target) errors.push(`${code}: incorrect retired ${label}`);
  if (!hrefs(html).includes(target)) errors.push(`${code}: missing native fallback to ${target}`);
  const active = html.replace(/<!--[\s\S]*?-->/g, '');
  if (/<script\b[^>]+src=|window\.quizConfig\s*=/i.test(active)) errors.push(`${code}: retired player was reactivated`);
  const jsTarget = active.match(/location\.replace\(("(?:[^"\\]|\\.)*")\)/)?.[1];
  if (!jsTarget || JSON.parse(jsTarget) !== target) errors.push(`${code}: incorrect script redirect`);
  return errors;
}
