"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { hero } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Three floating glass cards (DESIGN_ANALYSIS §S1): independent idle float,
 * cursor tilt with translateZ layering, cursor-tracking sheen, and a shadow
 * that shifts against the tilt. Springs only — no tweened cursor response.
 */

const PLACEMENTS = [
  // desktop scatter — overlapping depths, deliberate asymmetry
  { className: "lg:absolute lg:right-0 lg:top-0 lg:w-72", rest: -3, float: 6.2, delay: 1.0 },
  { className: "lg:absolute lg:left-0 lg:top-44 lg:w-64", rest: 2, float: 7.6, delay: 1.12 },
  { className: "lg:absolute lg:right-8 lg:top-80 lg:w-60", rest: -1.5, float: 9.0, delay: 1.24 },
] as const;

export default function HeroCards() {
  return (
    <div className="relative grid gap-4 lg:block lg:h-full">
      {hero.cards.map((card, i) => (
        <TiltCard key={card.index} {...card} {...PLACEMENTS[i]} />
      ))}
    </div>
  );
}

function TiltCard({
  index,
  title,
  meta,
  className,
  rest,
  float,
  delay,
}: {
  index: string;
  title: string;
  meta: string;
  className: string;
  rest: number;
  float: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // pointer position normalized to [-1, 1] from card center
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 170, damping: 26, mass: 0.9 };
  const rotateX = useSpring(useTransform(py, (v) => v * -8), spring);
  const rotateY = useSpring(useTransform(px, (v) => v * 10), spring);

  // sheen tracks the cursor in % of card size
  const sheenX = useSpring(useMotionValue(50), spring);
  const sheenY = useSpring(useMotionValue(50), spring);
  const sheenOpacity = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(280px circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.10), transparent 60%)`;

  // shadow leans opposite the tilt and deepens with it
  const shadowX = useTransform(rotateY, (v) => v * -1.6);
  const shadowY = useTransform(rotateX, (v) => v * 1.6 + 30);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.5)`;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    px.set(Math.max(-1, Math.min(1, nx)));
    py.set(Math.max(-1, Math.min(1, ny)));
    sheenX.set(((nx + 1) / 2) * 100);
    sheenY.set(((ny + 1) / 2) * 100);
    sheenOpacity.set(1);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    sheenX.set(50);
    sheenY.set(50);
    sheenOpacity.set(0);
  };

  return (
    // entrance shell
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      style={{ rotate: rest, perspective: 1000 }}
    >
      {/* independent idle float */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: float,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.8,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* tilt body */}
        <motion.div
          ref={ref}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="glass-panel relative rounded-2xl p-6"
          style={{
            rotateX,
            rotateY,
            boxShadow,
            transformStyle: "preserve-3d",
          }}
        >
          {/* top edge catch-light */}
          <span
            aria-hidden
            className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
          {/* cursor sheen */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{ background: sheen, opacity: sheenOpacity }}
          />

          <div style={{ transform: "translateZ(30px)" }}>
            <span className="text-eyebrow">{index}</span>
          </div>
          <div style={{ transform: "translateZ(45px)" }}>
            <h3 className="mt-10 text-xl font-semibold tracking-tight text-ink">
              {title}
            </h3>
          </div>
          <div style={{ transform: "translateZ(20px)" }}>
            <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-ink-40">
              {meta}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
