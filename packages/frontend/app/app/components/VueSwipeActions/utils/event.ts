/* eslint-disable @typescript-eslint/no-empty-function */
// adpoted from https://github.com/quasarframework/quasar/blob/dev/quasar/src/utils/event.js
export const listenOpts: { passive?: { passive: boolean } } = {};
Object.defineProperty(listenOpts, 'passive', {
  configurable: true,
  get() {
    let passive;

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          passive = { passive: true };
        }
      });
      window.addEventListener('qtest', () => {}, opts);
      window.removeEventListener('qtest', () => {}, opts);
    } catch {
      // do nothing
    }

    listenOpts.passive = passive;
    return passive;
  },
  set(val) {
    Object.defineProperty(this, 'passive', {
      value: val
    });
  }
});

export function leftClick(e: MouseEvent) {
  return e.button === 0;
}

export function position(e: MouseEvent | TouchEvent) {
  let touch: MouseEvent | Touch = e as MouseEvent;

  if ('touches' in e && e.touches[0])
    // eslint-disable-next-line prefer-destructuring
    touch = e.touches[0];
  else if ('changedTouches' in e && e.changedTouches[0])
    // eslint-disable-next-line prefer-destructuring
    touch = e.changedTouches[0];

  return {
    top: touch.clientY,
    left: touch.clientX
  };
}

export default {
  position,
  leftClick,
  listenOpts
};
