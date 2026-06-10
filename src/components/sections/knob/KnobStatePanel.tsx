"use client";

import { AnimatePresence, motion } from "framer-motion";
import { knobStates } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Right panel of S3 — content keyed to the knob's detent. Transitions share
 * the knob's spring timing so the section reads as one machine.
 */
export default function KnobStatePanel({ index }: { index: number }) {
  const state = knobStates[index];

  return (
    <div className="relative min-h-[16rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <p className="text-eyebrow">
            State 0{index + 1} <span className="text-ink-25">/ 04</span>
          </p>

          <span className="mt-5 block overflow-hidden">
            <motion.h3
              className="text-display block text-[length:var(--text-display-md)]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-110%" }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            >
              {state.title}
            </motion.h3>
          </span>

          <motion.p
            className="mt-6 max-w-[36rem] text-base leading-relaxed text-ink-65 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.08 }}
          >
            {state.body}
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-2">
            {state.chips.map((chip, i) => (
              <motion.span
                key={chip}
                className="rounded-full border hairline px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-65"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                  delay: 0.14 + i * 0.06,
                }}
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
