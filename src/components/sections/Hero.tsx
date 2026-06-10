"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import HeroCards from "./HeroCards";
import { hero, identity } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * S1 — Hero, matched to reference anatomy: one-line name (display-xl),
 * gray body subline, three tilted panels scattered horizontally below.
 * The whole block parallax-fades on exit.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-x-clip"
      aria-label="Introduction"
    >
      {/* ambient glow field, top-right */}
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/4 h-[80vmin] w-[80vmin] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(102,240,194,0.07), transparent 70%)",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x flex flex-1 flex-col justify-center pb-28 pt-32"
      >
        {/* eyebrow row */}
        <Reveal className="flex items-baseline justify-between gap-6 border-b hairline pb-4">
          <span className="text-eyebrow">{hero.eyebrowLeft}</span>
          <span className="text-eyebrow hidden sm:block">
            {hero.eyebrowRight}
          </span>
        </Reveal>

        <MaskLines
          as="h1"
          lines={[hero.name]}
          className="text-display mt-12"
          lineClassName="text-[length:var(--text-display-xl)]"
        />

        <Reveal delay={0.25} className="mt-6 max-w-[44rem]">
          <p className="text-lg leading-relaxed text-ink-65 sm:text-xl">
            {hero.subline}
          </p>
        </Reveal>

        {/* tilted panel scatter */}
        <motion.div style={{ y: cardsY }} className="mt-14 lg:mt-16">
          <HeroCards />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="container-x pointer-events-none absolute inset-x-0 bottom-7 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1, ease: EASE_OUT_EXPO }}
      >
        <span className="text-eyebrow">Scroll</span>
        <span className="relative h-px w-16 overflow-hidden bg-hairline">
          <motion.span
            className="absolute inset-y-0 left-0 w-6 bg-accent"
            animate={{ x: ["-1.5rem", "4rem"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.6,
            }}
          />
        </span>
        <span className="text-eyebrow ml-auto hidden sm:block">
          {identity.role}
        </span>
      </motion.div>
    </section>
  );
}
