/**
 * The register of text currently cut into lines.
 *
 * SplitText replaces a block's markup with one element per line and remembers
 * the original so it can put it back. That memory is the hazard: if React
 * re-renders the block with different text while it is split, React writes the
 * new text in and the later revert restores the text SplitText memorised —
 * silently reinstating the old copy.
 *
 * The language toggle is exactly that case. So the toggle reverts everything
 * first, through this register, and only then changes the language: by the time
 * React re-renders, no split holds a memory of the old wording.
 *
 * Kept apart from Motion.tsx so that LanguageProvider can call it without
 * pulling GSAP into its module graph.
 */

/** Each entry finishes one block: kills its animation and restores its markup. */
const live = new Set<() => void>();

export function registerSplit(finish: () => void): () => void {
  live.add(finish);
  return () => live.delete(finish);
}

/** Put every split block back before something else rewrites its contents. */
export function revertLiveText() {
  live.forEach((finish) => finish());
  live.clear();
}
