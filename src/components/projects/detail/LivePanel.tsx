"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Magnetic from "@/components/shared/Magnetic";
import { Reveal } from "@/components/shared/Reveal";
import type { CaseStudy } from "@/lib/caseStudies";
import { EASE_OUT_EXPO, springs } from "@/lib/motion";

/**
 * Live product access. Two forms of the same element: a prominent inline
 * panel in the hero, and — once that scrolls away — a floating pill pinned
 * bottom-right so the way into the product never leaves the screen.
 */
export default function LivePanel({ cs }: { cs: CaseStudy }) {
  const inlineRef = useRef<HTMLDivElement>(null);
  const inlineVisible = useInView(inlineRef, { margin: "-64px 0px 0px 0px" });
  // step aside before the next-case link / footer — don't cover them
  const { scrollY } = useScroll();
  const [nearEnd, setNearEnd] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const doc = document.documentElement;
    setNearEnd(y + window.innerHeight > doc.scrollHeight - 420);
  });
  const { live } = cs;
  const linkProps = live.external
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <>
      {/* inline hero panel */}
      <Reveal delay={0.35}>
        <div
          ref={inlineRef}
          className="glass-panel flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-center gap-4">
            <span className="relative flex size-2 shrink-0">
              <span
                className={`absolute size-full rounded-full bg-accent opacity-60 ${
                  cs.status === "live" ? "animate-ping" : ""
                }`}
              />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-40">
                {live.badge}
              </p>
              <p className="mt-1 text-[17px] font-semibold tracking-tight text-ink">
                {live.label}
              </p>
            </div>
          </div>
          <Magnetic strength={6}>
            <a
              href={live.href}
              {...linkProps}
              className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/[0.08] px-6 py-3 text-sm font-medium text-accent transition-colors duration-500 hover:bg-accent hover:text-base"
            >
              {live.cta}
              <span aria-hidden>{live.external ? "↗" : "→"}</span>
            </a>
          </Magnetic>
        </div>
      </Reveal>

      {/* floating pill — appears when the inline panel scrolls away */}
      <AnimatePresence>
        {!inlineVisible && !nearEnd && (
          <motion.div
            className="fixed bottom-5 right-5 z-30"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={springs.gentle}
          >
            <a
              href={live.href}
              {...linkProps}
              className="glass-panel group flex items-center gap-3 rounded-full py-2 pl-4 pr-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
            >
              <span className="relative flex size-1.5 shrink-0">
                <span
                  className={`absolute size-full rounded-full bg-accent opacity-60 ${
                    cs.status === "live" ? "animate-ping" : ""
                  }`}
                />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-ink-65 sm:block">
                {live.badge}
              </span>
              <span className="rounded-full bg-accent px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-base transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                {live.external ? "Open ↗" : "Contact →"}
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
