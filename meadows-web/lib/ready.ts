/**
 * "The page is on screen now."
 *
 * The loading panel covers the viewport while the document finishes, which
 * means any authored intro underneath it would otherwise play to nobody. This
 * is the one signal that says the curtain is going up, so an intro can start
 * against it rather than after it.
 *
 * Module state, so it survives client-side navigation: the panel is shown once
 * per document load, not once per route.
 */

let ready = false;
const waiting = new Set<() => void>();

/** Called by the loading panel as its curtain starts to lift. */
export function markReady() {
  if (ready) return;
  ready = true;
  waiting.forEach((cb) => cb());
  waiting.clear();
}

/**
 * Run `cb` when the curtain lifts — immediately if it already has.
 * Returns an unsubscribe, so an effect that unmounts first leaves nothing behind.
 */
export function whenReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  waiting.add(cb);
  return () => {
    waiting.delete(cb);
  };
}
