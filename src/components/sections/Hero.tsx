"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import HeroCards from "./HeroCards";
import { hero, identity } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * S1 — Hero (DESIGN_ANALYSIS §2). One dominant type element; cards float
 * to the right; the whole block parallax-fades on exit.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

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
        className="container-x flex flex-1 flex-col justify-center pt-32 pb-24"
      >
        {/* eyebrow row */}
        <Reveal className="flex items-baseline justify-between gap-6 border-b hairline pb-4">
          <span className="text-eyebrow">{hero.eyebrowLeft}</span>
          <span className="text-eyebrow hidden sm:block">
            {hero.eyebrowRight}
          </span>
        </Reveal>

        <div className="relative mt-12 lg:mt-16">
          <MaskLines
            as="h1"
            lines={[...hero.lines]}
            className="text-display uppercase"
            lineClassName="text-[length:var(--text-display-xl)]"
          />
          <MaskLines
            as="p"
            delay={0.18}
            lines={[hero.subline]}
            className="text-display mt-6 max-w-[18ch] text-ink-65"
            lineClassName="text-[length:var(--text-display-md)]"
          />

          {/* floating cards — overlap the type block's right edge on desktop */}
          <motion.div
            style={{ y: cardsY }}
            className="relative mt-16 lg:absolute lg:-top-8 lg:right-0 lg:mt-0 lg:h-[30rem] lg:w-[26rem]"
          >
            <HeroCards />
          </motion.div>
        </div>

        <Reveal
          delay={0.5}
          className="mt-16 max-w-[34rem] lg:mt-24 lg:ml-[41.666%]"
        >
          <p className="text-base leading-relaxed text-ink-65 sm:text-lg">
            {hero.body}
          </p>
        </Reveal>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="container-x pointer-events-none absolute inset-x-0 bottom-8 flex items-center gap-4"
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
