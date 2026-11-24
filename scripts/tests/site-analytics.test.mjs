import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../../assets/site-analytics.js', import.meta.url), 'utf8');
function visit(href, {disabled = false, existing = []} = {}) {
  const scripts = [...existing];
  const listeners = {};
  const document = {
    scripts, title: 'Public topic | SkillrHub',
    referrer: 'https://search.google.com/search-console?secret=hidden',
    createElement: () => ({}), head: {appendChild: script => scripts.push(script)},
    addEventListener: (name, callback) => { listeners[name] = callback; }
  };
  const window = {location: {href}, 'ga-disable-G-8P22BET45N': disabled};
  const context = vm.createContext({window, document, URL, Date});
  vm.runInContext(source, context);
  return {window, document, listeners, context, scripts};
}

test('initializes once, preserves campaign attribution and strips private URL/referrer data', () => {
  const result = visit('https://skillrhub.com/learn/?year=4&subject=maths&utm_source=google&utm_medium=organic&email=private&token=secret#access_token=secret');
  const commands = result.window.dataLayer.map(args => Array.from(args));
  const configs = commands.filter(args => args[0] === 'config');
  assert.equal(configs.length, 1);
  assert.equal(configs[0][1], 'G-8P22BET45N');
  const values = configs[0][2];
  assert.equal(values.page_location, 'https://skillrhub.com/learn/?utm_source=google&utm_medium=organic&year=4&subject=maths');
  assert.equal(values.page_referrer, 'https://search.google.com/search-console');
  assert.equal(values.allow_google_signals, false);
  assert.equal(values.allow_ad_personalization_signals, false);
  assert.equal(result.scripts.length, 1);
  vm.runInContext(source, result.context);
  assert.equal(result.scripts.length, 1);
  assert.equal(result.window.dataLayer.length, 2);
});

test('does not measure local, QA, disabled or already tagged visits', () => {
  for (const url of ['http://localhost:8000/learn/', 'https://preview.example/learn/', 'https://skillrhub.com/learn/?qa=1', 'https://skillrhub.com/learn/?analytics_off=1']) {
    assert.equal(visit(url).window.dataLayer, undefined);
  }
  assert.equal(visit('https://skillrhub.com/learn/', {disabled: true}).window.dataLayer, undefined);
  const existing = [{src: 'https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N'}];
  assert.equal(visit('https://skillrhub.com/learn/', {existing}).window.dataLayer, undefined);
});

test('records navigation destinations without link text, learner IDs or auth queries', () => {
  const result = visit('https://skillrhub.com/learn/');
  result.listeners.click({target: {closest: () => ({href: 'https://app.skillrhub.com/?learner=private&token=secret'})}});
  const command = Array.from(result.window.dataLayer.at(-1));
  assert.equal(command[0], 'event');
  assert.equal(command[1], 'site_navigation_click');
  assert.equal(command[2].destination_host, 'app.skillrhub.com');
  assert.equal(command[2].destination_path, '/');
  assert.equal(JSON.stringify(command).includes('private'), false);
  assert.equal(JSON.stringify(command).includes('secret'), false);
});
