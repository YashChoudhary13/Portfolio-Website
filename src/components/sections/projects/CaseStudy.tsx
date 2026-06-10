"use client";

import { motion } from "framer-motion";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import SlideSwapLink from "@/components/shared/SlideSwapLink";
import DeepVerifyVisual from "./DeepVerifyVisual";
import RevoVisual from "./RevoVisual";
import type { projects } from "@/lib/content";
import { scaleIn, VIEWPORT_ONCE } from "@/lib/motion";

type Project = (typeof projects)[number];

const VISUALS: Record<string, React.ComponentType> = {
  deepverify: DeepVerifyVisual,
  revo: RevoVisual,
};

/** One large case study: hero visual + problem / architecture / results. */
export default function CaseStudy({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const Visual = VISUALS[project.id];

  return (
    <article className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
      {/* hero visual */}
      <motion.div
        className={`group relative overflow-hidden rounded-2xl border hairline bg-raised lg:col-span-7 ${
          flip ? "lg:order-2" : ""
        }`}
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="aspect-[4/3] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
          <Visual />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-eyebrow">{project.tagline}</span>
          <span className="text-eyebrow">{project.date}</span>
        </div>
      </motion.div>

      {/* narrative */}
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          <span className="text-eyebrow">
            {project.index} — {project.date}
          </span>
        </Reveal>

        <MaskLines
          as="h3"
          lines={[project.name]}
          className="text-display mt-4"
          lineClassName="text-[length:var(--text-display-md)]"
          delay={0.08}
        />

        <Reveal delay={0.16} className="mt-8 space-y-6">
          <div>
            <p className="text-eyebrow mb-2">Problem</p>
            <p className="leading-relaxed text-ink-65">{project.problem}</p>
          </div>
          <div>
            <p className="text-eyebrow mb-2">Architecture</p>
            <p className="leading-relaxed text-ink-65">{project.architecture}</p>
          </div>
        </Reveal>

        {/* results */}
        <Reveal delay={0.24}>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y hairline py-5">
            {project.results.map((r) => (
              <div key={r.label}>
                <p className="text-display text-2xl tabular-nums sm:text-3xl">
                  {r.value}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink-40">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-40">
            {project.stack.join(" · ")}
          </p>
          <span className="ml-auto flex gap-5">
            {project.links.map((link) => (
              <SlideSwapLink
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
                label={link.label}
                suffix={<span className="text-accent">↗</span>}
              />
            ))}
          </span>
        </Reveal>
      </div>
    </article>
  );
}
