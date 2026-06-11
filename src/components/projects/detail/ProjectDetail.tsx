"use client";

import Eyebrow from "@/components/shared/Eyebrow";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import ProjectHero from "./ProjectHero";
import SystemFlow from "./SystemFlow";
import ArchStack from "./ArchStack";
import MetricsBand from "./MetricsBand";
import Gallery from "./Gallery";
import NextProject from "./NextProject";
import type { CaseStudy } from "@/lib/caseStudies";

const SECTION = "container-x py-[clamp(4.5rem,10vh,8rem)]";

/**
 * One case study, structured like a product launch page: hero → live
 * access → the system you can explore → why it was hard → how it was
 * solved → the layers → the numbers → the product → what it taught.
 */
export default function ProjectDetail({
  cs,
  next,
}: {
  cs: CaseStudy;
  next: CaseStudy;
}) {
  return (
    <>
      <ProjectHero cs={cs} />

      {/* 01 — the system, explorable */}
      <section className={SECTION} aria-label="How the system works">
        <Eyebrow right="Select a stage to inspect">01 — The system</Eyebrow>
        <div className="mt-12">
          <SystemFlow flow={cs.flow} />
        </div>
      </section>

      {/* 02 — challenge */}
      <section className={SECTION} aria-label="The challenge">
        <Eyebrow right="What stood in the way">02 — Challenge</Eyebrow>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <MaskLines
              as="h3"
              lines={[cs.challenge.statement]}
              className="text-display"
              lineClassName="text-[clamp(1.75rem,3vw,2.75rem)]"
            />
            <Reveal delay={0.15} className="mt-6">
              <p className="leading-relaxed text-ink-65">{cs.challenge.body}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            {cs.challenge.points.map((point, i) => (
              <Reveal key={point} delay={0.1 + i * 0.08}>
                <div className="flex items-start gap-6 border-b hairline py-5 first:border-t first:hairline lg:first:border-t-0">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed text-ink-65">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — solution */}
      <section className={SECTION} aria-label="The solution">
        <Eyebrow right="Decisions and tradeoffs">03 — Solution</Eyebrow>
        <Reveal delay={0.1} className="mt-12">
          <p className="max-w-[40rem] text-lg leading-relaxed text-ink-65">
            {cs.solution.intro}
          </p>
        </Reveal>
        <div className="mt-10">
          {cs.solution.decisions.map((d, i) => (
            <Reveal key={d.title} delay={0.08 * i}>
              <div className="grid gap-4 border-t hairline py-8 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-baseline gap-5 lg:col-span-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {d.title}
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="max-w-[42rem] leading-relaxed text-ink-65">
                    {d.body}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em]">
                    <span className="text-accent">Tradeoff — </span>
                    <span className="normal-case text-ink-40">{d.tradeoff}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — architecture */}
      <section className={SECTION} aria-label="Architecture">
        <Eyebrow right="Expand the layers">04 — Architecture</Eyebrow>
        <div className="mt-12">
          <ArchStack layers={cs.archLayers} />
        </div>
      </section>

      {/* 05 — outcomes */}
      <section className={SECTION} aria-label="Outcomes">
        <Eyebrow right="Measured, not promised">05 — Outcomes</Eyebrow>
        <div className="mt-14">
          <MetricsBand metrics={cs.metrics} />
        </div>
      </section>

      {/* 06 — interface */}
      <section className={SECTION} aria-label="Product views">
        <Eyebrow right="Product views">06 — Interface</Eyebrow>
        <div className="mt-12">
          <Gallery frames={cs.gallery} />
        </div>
      </section>

      {/* 07 — learnings */}
      <section className={SECTION} aria-label="Learnings">
        <Eyebrow right="What the build taught">07 — Learnings</Eyebrow>
        <div className="mt-12">
          {cs.learnings.map((l, i) => (
            <Reveal key={l.title} delay={0.08 * i}>
              <div className="grid gap-3 border-t hairline py-8 lg:grid-cols-12 lg:gap-10">
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold tracking-tight lg:col-span-4">
                  {l.title}
                </h3>
                <p className="max-w-[42rem] leading-relaxed text-ink-65 lg:col-span-7">
                  {l.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <NextProject next={next} />
    </>
  );
}
