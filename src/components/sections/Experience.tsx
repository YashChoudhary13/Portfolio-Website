"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { experience } from "@/lib/content";

/**
 * S6 — Experience (DESIGN_ANALYSIS §S6). A spine grows with scroll; entries
 * reveal as it passes them. Not a resume table.
 */
export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <section
      ref={ref}
      className="container-x py-[clamp(6rem,14vh,12.5rem)]"
      aria-label="Experience"
    >
      <Eyebrow right="2025 — present">05 — Experience</Eyebrow>

      <div className="relative mt-6">
        {/* spine track + scroll-grown progress */}
        <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-hairline" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent/50"
          style={{ scaleY: scrollYProgress }}
        />

        {experience.map((entry) => (
          <Reveal key={entry.org} className="relative border-b hairline py-14 pl-12 last:border-b-0">
            {/* node dot */}
            <span className="absolute left-0 top-[4.2rem] flex size-[15px] items-center justify-center rounded-full border hairline bg-base">
              {entry.current ? (
                <>
                  <span className="absolute size-[7px] animate-ping rounded-full bg-accent opacity-50" />
                  <span className="size-[7px] rounded-full bg-accent" />
                </>
              ) : (
                <span className="size-[5px] rounded-full bg-white/30" />
              )}
            </span>

            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  {entry.period}
                </p>
                {entry.current && (
                  <p className="mt-2 inline-block rounded-full border border-accent/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                    Current
                  </p>
                )}
              </div>

              <div className="md:col-span-9">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {entry.role}
                </h3>
                <p className="mt-1.5 text-ink-65">
                  {entry.org}
                  <span className="mx-3 text-ink-25">·</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-40">
                    {entry.mode}
                  </span>
                </p>

                <ul className="mt-6 max-w-[44rem] space-y-3">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-4 leading-relaxed text-ink-65">
                      <span aria-hidden className="mt-[0.85em] h-px w-5 shrink-0 bg-white/25" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {entry.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border hairline px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-65"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
