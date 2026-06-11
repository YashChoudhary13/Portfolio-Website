"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/shared/CountUp";
import type { Metric } from "@/lib/caseStudies";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Outcomes in the homepage Metrics rhythm: hairline columns, numbers that
 * roll in once, mono source lines. Strings render still; numbers count.
 */
export default function MetricsBand({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          className="group px-0 lg:border-l lg:hairline lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.08 * i }}
        >
          <span className="text-eyebrow">0{i + 1}</span>
          <p className="text-display mt-4 text-4xl tabular-nums sm:text-5xl">
            {typeof m.value === "number" ? (
              <CountUp
                value={m.value}
                suffix={m.suffix ?? ""}
                decimals={m.decimals ?? 0}
              />
            ) : (
              m.value
            )}
          </p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-ink">
            {m.label}
          </p>
          <p className="mt-1.5 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-ink-40 transition-colors duration-500 group-hover:text-ink-65">
            {m.note}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
