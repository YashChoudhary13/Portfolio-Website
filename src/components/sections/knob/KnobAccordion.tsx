"use client";

import { motion } from "framer-motion";
import { knobStates } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Left column of S3, matched to reference: bold hairline-separated titles;
 * the active one expands its body. Selecting a row drives the knob.
 */
export default function KnobAccordion({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div role="tablist" aria-label="Capabilities">
      {knobStates.map((state, i) => {
        const active = i === index;
        return (
          <div key={state.title} className="border-b hairline first:border-t">
            <button
              type="button"
              role="tab"
              aria-selected={active}
              aria-expanded={active}
              onClick={() => onSelect(i)}
              className="group flex w-full items-baseline justify-between py-6 text-left outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
            >
              <span
                className={`text-xl font-semibold tracking-tight transition-colors duration-400 sm:text-2xl ${
                  active ? "text-ink" : "text-ink-40 group-hover:text-ink-65"
                }`}
              >
                {state.title}
              </span>
              <span
                className={`font-mono text-[10px] tracking-[0.16em] transition-colors duration-400 ${
                  active ? "text-accent" : "text-ink-25"
                }`}
              >
                0{i + 1}
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: active ? "auto" : 0,
                opacity: active ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="overflow-hidden"
            >
              <p className="max-w-[34rem] pb-4 leading-relaxed text-ink-65">
                {state.body}
              </p>
              <div className="flex flex-wrap gap-2 pb-7">
                {state.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border hairline px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-65"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
