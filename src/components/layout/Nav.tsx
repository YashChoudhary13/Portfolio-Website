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
import { identity, nav, socials } from "@/lib/content";

const SOCIAL_SHORT: Record<string, string> = {
  GitHub: "GH",
  LinkedIn: "IN",
  LeetCode: "LC",
};

/**
 * Floating bar matched to reference anatomy: logo + links in the left
 * cluster, "Say hi!" + socials on the right. Hides on scroll-down past the
 * first beat, returns on scroll-up.
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
        className="fixed inset-x-0 top-4 z-40 flex justify-center"
        animate={{ y: hidden ? "-150%" : "0%" }}
        transition={{ duration: durations.navToggle, ease: EASE_OUT_EXPO }}
      >
        <nav className="flex h-14 w-[min(100%-2rem,64rem)] items-center justify-between rounded-2xl border hairline bg-[#0e0f11]/85 px-4 backdrop-blur-xl sm:px-5">
          {/* left cluster: logo + links */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              type="button"
              onClick={() => go(0)}
              aria-label="Back to top"
              className="flex size-8 items-center justify-center rounded-lg border hairline bg-white/[0.04] text-sm font-extrabold tracking-tight"
            >
              Y<span className="text-accent">.</span>
            </button>
            <div className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Magnetic key={item.label} strength={5}>
                  <a
                    href={item.target}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.target);
                    }}
                    className="block rounded-lg px-3.5 py-2 text-sm text-ink-65 transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* right cluster: say hi + socials */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Magnetic strength={6}>
              <a
                href={`mailto:${identity.email}`}
                className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
              >
                {identity.available && (
                  <span className="relative flex size-1.5">
                    <span className="absolute size-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative size-1.5 rounded-full bg-accent" />
                  </span>
                )}
                Say hi!
              </a>
            </Magnetic>

            <span aria-hidden className="hidden h-5 w-px bg-white/10 md:block" />

            <div className="hidden items-center gap-1 md:flex">
              {socials.map((social) => (
                <Magnetic key={social.label} strength={5}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="block rounded-lg px-2.5 py-2 font-mono text-[11px] tracking-[0.1em] text-ink-40 transition-colors duration-300 hover:text-ink"
                  >
                    {SOCIAL_SHORT[social.label]}
                  </a>
                </Magnetic>
              ))}
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
          </div>
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
            <div className="mt-10 flex items-center justify-between border-t hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-40">
                {identity.location} · {identity.timezone}
              </p>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <SlideSwapLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] tracking-[0.1em] text-ink-65"
                    label={SOCIAL_SHORT[social.label]}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
