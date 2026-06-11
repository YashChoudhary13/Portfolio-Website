"use client";

import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import Eyebrow from "@/components/shared/Eyebrow";
import type { CaseStudy } from "@/lib/caseStudies";

/** Hand-off to the next study — the archive keeps moving. */
export default function NextProject({ next }: { next: CaseStudy }) {
  return (
    <section className="container-x py-[clamp(5rem,12vh,9rem)]" aria-label="Next case study">
      <Eyebrow right={next.category}>Next case study</Eyebrow>

      <Reveal delay={0.1}>
        <Link href={`/projects/${next.slug}`} className="group mt-10 block">
          <span className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="text-eyebrow">{next.index}</span>
            <span className="text-display text-[length:var(--text-display-md)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
              {next.name}
            </span>
            <span
              aria-hidden
              className="text-display text-[length:var(--text-display-md)] text-accent opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:opacity-100"
            >
              →
            </span>
          </span>
          <span className="mt-4 block max-w-[36rem] text-[15px] leading-relaxed text-ink-40 transition-colors duration-500 group-hover:text-ink-65">
            {next.outcome}
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
