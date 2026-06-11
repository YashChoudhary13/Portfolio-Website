/**
 * Cross-route anchor hand-off. Nav stores the target here before pushing
 * to "/"; AnchorScroll (mounted only on the homepage) consumes it AFTER
 * the homepage has actually mounted — no timers, no races.
 */
let pending: string | null = null;

export function setPendingAnchor(target: string) {
  pending = target;
}

export function consumePendingAnchor(): string | null {
  const target = pending;
  pending = null;
  return target;
}
