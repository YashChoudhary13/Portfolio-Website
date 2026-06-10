"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import { about } from "@/lib/content";

/**
 * S7 — About (DESIGN_ANALYSIS §S7). Typographic self-portrait: a huge
 * outlined watermark drifts behind an editorial split.
 */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-clip border-t hairline"
      aria-label="About"
    >
      {/* outlined watermark */}
      <motion.span
        aria-hidden
        style={{
          y: watermarkY,
          WebkitTextStroke: "1.5px rgba(255,255,255,0.06)",
        }}
        className="text-display pointer-events-none absolute -right-[4%] top-[6%] select-none text-[38vw] leading-none text-transparent"
      >
        Y.
      </motion.span>

      <div className="container-x relative py-[clamp(6rem,14vh,12.5rem)]">
        <Eyebrow right="JECRC University · 2022 — 2026">06 — About</Eyebrow>

        <MaskLines
          as="h2"
          lines={[about.statement.split(",")[0] + ",", about.statement.split(",")[1]?.trim() ?? ""]}
          className="text-display mt-14"
          lineClassName="text-[length:var(--text-display-lg)]"
        />

        <div className="mt-16 max-w-[36rem] space-y-6 lg:ml-[41.666%]">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className="leading-relaxed text-ink-65 sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <p className="border-t hairline pt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-40">
              B.Tech CSE (AI/ML) · IBM AI & ML Specialization — 14 courses
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
