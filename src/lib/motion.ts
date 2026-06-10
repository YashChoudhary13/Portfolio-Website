import type { Transition, Variants } from "framer-motion";

/**
 * Single source of truth for motion. Two families (DESIGN_ANALYSIS §1.5):
 *  - springs: everything cursor-driven (tilt, magnetic, knob)
 *  - expo tweens: scroll-entrance choreography
 */

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const EASE_IN_OUT_SOFT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const springs = {
  /** ambient drift, idle floats */
  gentle: { type: "spring", stiffness: 120, damping: 22, mass: 1 },
  /** cursor-following: tilt, magnetic, sheen */
  responsive: { type: "spring", stiffness: 170, damping: 26, mass: 0.9 },
  /** knob detent — slight overshoot reads as a machined click */
  snap: { type: "spring", stiffness: 300, damping: 26, mass: 1 },
} satisfies Record<string, Transition>;

export const durations = {
  lineReveal: 0.9,
  fadeRise: 0.7,
  block: 1.1,
  swap: 0.45,
  navToggle: 0.6,
} as const;

export const STAGGER = 0.08;

/** body / meta entrance — pass delay via the `custom` prop */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: durations.fadeRise, ease: EASE_OUT_EXPO, delay },
  }),
};

/** masked display line — parent must be overflow-hidden */
export const maskLine: Variants = {
  hidden: { y: "110%", rotate: 1.5 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: durations.lineReveal, ease: EASE_OUT_EXPO },
  },
};

/** media / block entrance inside a clipped frame */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.block, ease: EASE_OUT_EXPO },
  },
};

export const staggerChildren = (stagger = STAGGER, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** shared whileInView viewport config — fire once, slightly before fully visible */
export const VIEWPORT_ONCE = { once: true, margin: "-15% 0px" } as const;
