"use client";

import { motion } from "framer-motion";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import StatusChip from "@/components/projects/StatusChip";
import { PROJECT_VISUALS } from "@/components/projects/visuals";
import LivePanel from "./LivePanel";
import type { CaseStudy } from "@/lib/caseStudies";
import { scaleIn, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Case-study hero: name in display type, the why-it-matters line, meta
 * column, live-product access, then the product visual full width.
 * Visual first, paragraphs never.
 */
export default function ProjectHero({ cs }: { cs: CaseStudy }) {
  const Visual = PROJECT_VISUALS[cs.slug];

  return (
    <header className="container-x pt-36 lg:pt-44" aria-label={`${cs.name} case study`}>
      <Reveal className="flex items-baseline justify-between gap-6 border-b hairline pb-4">
        <span className="text-eyebrow">Case study — {cs.index}</span>
        <span className="text-eyebrow hidden sm:block">{cs.category}</span>
      </Reveal>

      <MaskLines
        as="h1"
        lines={[cs.name]}
        className="text-display mt-10"
        lineClassName="text-[length:var(--text-display-lg)]"
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal delay={0.18} className="lg:col-span-7">
          <p className="max-w-[40rem] text-lg leading-relaxed text-ink-65 sm:text-xl">
            {cs.heroSub}
          </p>
        </Reveal>

        <Reveal delay={0.26} className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t hairline pt-5 lg:border-t-0 lg:pt-1">
            <div>
              <dt className="text-eyebrow">Status</dt>
              <dd className="mt-2.5">
                <StatusChip status={cs.status} label={cs.statusLabel} />
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Timeline</dt>
              <dd className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-65">
                {cs.timeline}
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Role</dt>
              <dd className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-65">
                {cs.role}
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Stack</dt>
              <dd className="mt-2.5 font-mono text-[11px] leading-relaxed tracking-[0.08em] text-ink-65">
                {cs.stack.join(" · ")}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* live product access — inline now, floating pill once this scrolls */}
      <div className="mt-10">
        <LivePanel cs={cs} />
      </div>

      {/* product visual */}
      <motion.div
        className="group mt-12 overflow-hidden rounded-2xl border hairline bg-raised lg:mt-16"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="flex items-baseline justify-between border-b hairline bg-white/[0.025] px-5 py-3.5">
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            {cs.name}
          </span>
          <span className="text-eyebrow">{cs.date}</span>
        </div>
        <div className="aspect-[4/3] w-full sm:aspect-[16/9]">
          <Visual />
        </div>
        <div className="flex items-baseline justify-between border-t hairline px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-40">
            {cs.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-25">
            {cs.timeline}
          </span>
        </div>
      </motion.div>
    </header>
  );
}
