"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import SlideSwapLink from "@/components/shared/SlideSwapLink";
import StatusChip from "@/components/projects/StatusChip";
import { PROJECT_VISUALS } from "@/components/projects/visuals";
import { caseStudies, projectsIndex, type CaseStudy } from "@/lib/caseStudies";
import { identity } from "@/lib/content";
import { EASE_OUT_EXPO, springs } from "@/lib/motion";

/** Headline metric for the preview footer — first metric of the study. */
function keyMetric(cs: CaseStudy) {
  const m = cs.metrics[0];
  return `${m.value}${m.suffix ?? ""} — ${m.label.toLowerCase()}`;
}

/**
 * /projects — the archive as an editorial index, not a card grid.
 * Display-type rows; on fine pointers a preview panel trails the cursor
 * with the project's live visual inside.
 */
export default function ProjectsIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // cursor-trailing preview position (spring-lagged, clamped to viewport)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, springs.responsive);
  const py = useSpring(my, springs.responsive);

  const onMouseMove = (e: React.MouseEvent) => {
    const PANEL_W = 416; // w-[26rem]
    const half = 208; // half of header + 4/3 visual + footer
    const fitsRight = e.clientX + 32 + PANEL_W < window.innerWidth;
    mx.set(fitsRight ? e.clientX + 32 : e.clientX - 32 - PANEL_W);
    my.set(Math.min(Math.max(e.clientY, half + 96), window.innerHeight - half));
  };

  const hoveredCs = caseStudies.find((c) => c.slug === hovered);
  const HoveredVisual = hoveredCs ? PROJECT_VISUALS[hoveredCs.slug] : null;

  return (
    <section className="container-x pb-[clamp(5rem,10vh,8rem)] pt-36 lg:pt-44" aria-label="Projects archive">
      {/* page hero */}
      <Reveal className="flex items-baseline justify-between gap-6 border-b hairline pb-4">
        <span className="text-eyebrow">{projectsIndex.eyebrowLeft}</span>
        <span className="text-eyebrow hidden sm:block">
          {projectsIndex.eyebrowRight}
        </span>
      </Reveal>

      <MaskLines
        as="h1"
        lines={projectsIndex.lines}
        className="text-display mt-12"
        lineClassName="text-[length:var(--text-display-lg)]"
      />

      <Reveal delay={0.22} className="mt-6 max-w-[44rem]">
        <p className="text-lg leading-relaxed text-ink-65">
          {projectsIndex.sub}
        </p>
      </Reveal>

      {/* index rows */}
      <div
        ref={listRef}
        className="mt-20 border-t hairline lg:mt-24"
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        {caseStudies.map((cs, i) => {
          const Visual = PROJECT_VISUALS[cs.slug];
          return (
            <Reveal key={cs.slug} delay={0.1 + i * 0.08}>
              <Link
                href={`/projects/${cs.slug}`}
                className="group relative block border-b hairline py-10 lg:py-12"
                onMouseEnter={() => setHovered(cs.slug)}
                onFocus={() => setHovered(cs.slug)}
                onBlur={() => setHovered(null)}
              >
                {/* hover field */}
                <span
                  aria-hidden
                  className="absolute inset-y-2 -inset-x-4 rounded-2xl bg-white/[0.02] opacity-0 transition-opacity duration-500 lg:-inset-x-6 group-hover:opacity-100"
                />

                {/* mobile visual — editorial media block, lg gets the cursor preview instead */}
                <span className="relative mb-7 block overflow-hidden rounded-2xl border hairline bg-raised lg:hidden">
                  <span className="block aspect-[16/10] w-full">
                    <Visual />
                  </span>
                </span>

                <span className="relative grid items-center gap-y-4 lg:grid-cols-12 lg:gap-x-6">
                  <span className="text-eyebrow lg:col-span-1">{cs.index}</span>

                  <span className="lg:col-span-5">
                    <span className="text-display block text-[clamp(2.25rem,4.5vw,3.75rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                      {cs.name}
                    </span>
                  </span>

                  <span className="block text-[15px] leading-relaxed text-ink-40 transition-colors duration-500 lg:col-span-4 group-hover:text-ink-65">
                    {cs.outcome}
                  </span>

                  <span className="flex flex-row items-center gap-3 lg:col-span-2 lg:flex-col lg:items-end lg:gap-2.5">
                    <StatusChip status={cs.status} label={cs.statusLabel} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-25">
                      {cs.date}
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-accent opacity-0 transition-all duration-500 lg:ml-0 lg:translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
                      Open case →
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* foot note */}
      <Reveal delay={0.1} className="mt-14 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <p className="max-w-[36rem] text-[15px] leading-relaxed text-ink-40">
          {projectsIndex.footNote}
        </p>
        <SlideSwapLink
          href={`mailto:${identity.email}`}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
          label={projectsIndex.footCtaLabel}
          suffix={<span className="text-accent">↗</span>}
        />
      </Reveal>

      {/* cursor-trailing preview — fine pointers only */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[26rem] lg:block"
        style={{ x: px, y: py, translateY: "-50%" }}
      >
        <AnimatePresence>
          {hoveredCs && HoveredVisual && (
            <motion.div
              key={hoveredCs.slug}
              className="overflow-hidden rounded-2xl border hairline bg-[#0e0f11]/85 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotate: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            >
              <div className="flex items-baseline justify-between border-b hairline bg-white/[0.025] px-5 py-3">
                <span className="text-[14px] font-semibold tracking-tight text-ink">
                  {hoveredCs.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-40">
                  {hoveredCs.statusLabel}
                </span>
              </div>
              <div className="aspect-[4/3] w-full bg-raised">
                <HoveredVisual />
              </div>
              <div className="flex items-baseline justify-between border-t hairline px-5 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-40">
                  {keyMetric(hoveredCs)}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                  Open case study →
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
