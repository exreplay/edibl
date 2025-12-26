import { type Context } from '../touch-horizontal-pan';

// taken from https://github.com/quasarframework/quasar/blob/dev/quasar/src/utils/touch-observer.js
export function setObserver(
  el: Element,
  evt: TouchEvent | MouseEvent,
  ctx: Context
) {
  const { target } = evt;
  ctx.touchTargetObserver = new MutationObserver(() => {
    if (target && el.contains(target as Element) === false) ctx.end(evt);
  });
  ctx.touchTargetObserver.observe(el, { childList: true, subtree: true });
}

export function removeObserver(ctx: Context) {
  if (ctx.touchTargetObserver !== undefined) {
    ctx.touchTargetObserver.disconnect();
    ctx.touchTargetObserver = undefined;
  }
}
