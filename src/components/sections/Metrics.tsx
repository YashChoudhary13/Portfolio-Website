"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import CountUp from "@/components/shared/CountUp";
import { metrics } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * S2 — Metrics (DESIGN_ANALYSIS §2). Hairline ledger of shipped results:
 * huge tabular numbers left, what/where right. Numbers roll in once.
 */
export default function Metrics() {
  return (
    <section
      className="container-x py-[clamp(6rem,14vh,12.5rem)]"
      aria-label="Results"
    >
      <Eyebrow right="Source: shipped work">01 — Proof, not promises</Eyebrow>

      <div className="mt-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="group relative grid grid-cols-12 items-baseline gap-x-6 border-b hairline py-7 sm:py-9"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: 0.8,
              ease: EASE_OUT_EXPO,
              delay: 0.06 * i,
            }}
          >
            {/* accent underline grows on hover */}
            <span
              aria-hidden
              className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />

            <span className="text-display col-span-12 text-[length:var(--text-display-lg)] tabular-nums sm:col-span-5">
              <CountUp
                value={m.value}
                suffix={m.suffix}
                decimals={"decimals" in m ? m.decimals : 0}
              />
            </span>

            <span className="col-span-7 mt-2 text-base text-ink sm:col-span-4 sm:mt-0 sm:text-lg">
              {m.label}
            </span>

            <span className="col-span-5 mt-2 text-right font-mono text-[11px] leading-relaxed tracking-[0.06em] text-ink-40 transition-colors duration-500 group-hover:text-ink-65 sm:col-span-3 sm:mt-0">
              {m.source}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
