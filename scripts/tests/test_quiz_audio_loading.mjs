import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('feedback sources are assigned only after preload is disabled', () => {
  const sounds = [];
  class Audio {
    constructor(src) {
      assert.equal(src, undefined, 'a source in the constructor can start a download');
      sounds.push(this);
    }
    set src(value) {
      assert.equal(this.preload, 'none', 'disable fetching before assigning a source');
      this.source = value;
    }
  }
  const source = fs.readFileSync(new URL('../../quiz/assets/script-runtime-v115.js', import.meta.url), 'utf8');
  vm.runInNewContext(source.split('function playProficientSound()')[0], { Audio });
  assert.deepEqual(sounds.map(sound => sound.source), [
    '/quiz/assets/sounds/correct.wav',
    '/quiz/assets/sounds/wrong.wav',
    '/quiz/assets/sounds/proficient.mp3'
  ]);
});
