"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import CountUp from "@/components/shared/CountUp";
import { metrics } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * S2 — Metrics, matched to reference rhythm: columns split by vertical
 * hairlines, number-led bold titles, gray source lines. Numbers stay
 * substantial (spec) and roll in once.
 */
export default function Metrics() {
  const rows = [metrics.slice(0, 3), metrics.slice(3)];

  return (
    <section
      className="container-x py-[clamp(6rem,14vh,12.5rem)]"
      aria-label="Results"
    >
      <Eyebrow right="Source: shipped work">01 — Proof, not promises</Eyebrow>

      <div className="mt-14">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`grid gap-y-10 py-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-0 ${
              r > 0 ? "border-t hairline pt-12 lg:mt-12" : ""
            }`}
          >
            {row.map((m, i) => (
              <motion.div
                key={m.label}
                className="group px-0 lg:border-l lg:hairline lg:px-10 lg:first:border-l-0 lg:first:pl-0"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT_EXPO,
                  delay: 0.08 * (r * 3 + i),
                }}
              >
                <span className="text-eyebrow">
                  0{r * 3 + i + 1}
                </span>
                <p className="text-display mt-4 text-5xl tabular-nums sm:text-6xl">
                  <CountUp
                    value={m.value}
                    suffix={m.suffix}
                    decimals={"decimals" in m ? m.decimals : 0}
                  />
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-ink">
                  {m.label}
                </p>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-ink-40 transition-colors duration-500 group-hover:text-ink-65">
                  {m.source}
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
