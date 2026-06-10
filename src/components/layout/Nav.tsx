"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/shared/Magnetic";
import SlideSwapLink from "@/components/shared/SlideSwapLink";
import { durations, EASE_OUT_EXPO } from "@/lib/motion";
import { identity, nav } from "@/lib/content";

/**
 * Floating glass pill (DESIGN_ANALYSIS §S0). Hides on scroll-down past the
 * hero's first beat, returns on scroll-up. Never intrusive.
 */
export default function Nav() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120 && !open);
  });

  const go = (target: string | number) => {
    setOpen(false);
    lenis?.start();
    lenis?.scrollTo(target, { offset: -96, duration: 1.3 });
  };

  const toggleMenu = () => {
    setOpen((v) => {
      const next = !v;
      if (next) lenis?.stop();
      else lenis?.start();
      return next;
    });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-5 z-40 flex justify-center"
        animate={{ y: hidden ? "-150%" : "0%" }}
        transition={{ duration: durations.navToggle, ease: EASE_OUT_EXPO }}
      >
        <nav className="glass-panel flex h-14 w-[min(100%-2.5rem,52rem)] items-center justify-between rounded-full pl-6 pr-3">
          <SlideSwapLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              go(0);
            }}
            label={
              <span className="font-mono text-xs font-medium tracking-[0.18em] uppercase">
                Yash Choudhary<span className="text-ink-40">©</span>
              </span>
            }
          />

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Magnetic key={item.label} strength={6}>
                <a
                  href={item.target}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.target);
                  }}
                  className="block rounded-full px-4 py-2 text-sm text-ink-65 transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </a>
              </Magnetic>
            ))}
            {identity.available && (
              <span className="ml-3 flex items-center gap-2 rounded-full border hairline px-4 py-2">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-65">
                  Available
                </span>
              </span>
            )}
          </div>

          {/* mobile trigger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={toggleMenu}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              className="block h-px w-5 bg-ink"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            />
            <motion.span
              className="block h-px w-5 bg-ink"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            />
          </button>
        </nav>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-end bg-base/80 px-7 pb-16 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <div className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <span key={item.label} className="block overflow-hidden">
                  <motion.a
                    href={item.target}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.target);
                    }}
                    className="text-display block text-5xl"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.7,
                      ease: EASE_OUT_EXPO,
                      delay: 0.06 * i,
                    }}
                  >
                    {item.label}
                  </motion.a>
                </span>
              ))}
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-ink-40">
              {identity.location} · {identity.timezone}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
