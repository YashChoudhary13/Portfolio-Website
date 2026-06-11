"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { hero } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Three tilted panels scattered horizontally (reference anatomy): solid
 * raised surfaces with a header strip and a playful mini-composition.
 * Spring tilt, cursor sheen, counter-tilt shadow, desynced idle float.
 * Each whole card is a navigation target — capabilities, projects, about.
 */

const PLACEMENTS = [
  { rotate: -6, float: 6.4, delay: 0.9, className: "lg:translate-y-6 lg:z-10" },
  { rotate: 3, float: 7.8, delay: 1.05, className: "lg:-translate-y-2 lg:z-20 lg:-mx-6" },
  { rotate: 7, float: 9.2, delay: 1.2, className: "lg:translate-y-8 lg:z-10" },
] as const;

export default function HeroCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:px-4">
      {hero.cards.map((card, i) => (
        <TiltCard key={card.index} {...card} {...PLACEMENTS[i]}>
          {i === 0 && <BuildPills />}
          {i === 1 && <FocusList />}
          {i === 2 && <LifeChips />}
        </TiltCard>
      ))}
    </div>
  );
}

/* ---------- mini-compositions ---------- */

/** what I build — three stacked tinted pills */
function BuildPills() {
  const pills = [
    { label: "AI systems", className: "bg-accent/15 text-accent border-accent/25", rotate: -5, x: "6%" },
    { label: "Full-stack products", className: "bg-[#6e9bff]/15 text-[#9dbcff] border-[#6e9bff]/25", rotate: 3, x: "20%" },
    { label: "Automation tools", className: "bg-white/[0.07] text-ink border-white/15", rotate: -2, x: "11%" },
  ] as const;
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 py-2">
      {pills.map((pill, i) => (
        <motion.span
          key={pill.label}
          className={`inline-block w-fit rounded-xl border px-5 py-2.5 text-base font-semibold tracking-tight sm:text-lg ${pill.className}`}
          style={{ marginLeft: pill.x, z: 30 + i * 12 }}
          initial={{ opacity: 0, y: 16, rotate: pill.rotate - 6 }}
          animate={{ opacity: 1, y: 0, rotate: pill.rotate }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.3 + i * 0.12 }}
        >
          {pill.label}
        </motion.span>
      ))}
    </div>
  );
}

/** current focus — a working list, not a feature list */
function FocusList() {
  const rows = [
    { label: "Building products", meta: "NOW", live: true },
    { label: "Shipping real systems", meta: "ALWAYS", live: false },
    { label: "Exploring AI workflows", meta: "DAILY", live: false },
  ] as const;
  return (
    <div className="flex h-full flex-col justify-center gap-2 py-2">
      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          className="flex items-center justify-between rounded-lg border hairline bg-white/[0.03] px-3.5 py-2.5"
          style={{ z: 26 + i * 10 }}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 1.5 + i * 0.12 }}
        >
          <span className="text-[14px] font-medium tracking-tight text-ink">
            {row.label}
          </span>
          <span className="flex items-center gap-2">
            {row.live && (
              <span className="relative flex size-1.5">
                <span className="absolute size-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
            )}
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-40">
              {row.meta}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** life off screen — a sticker sheet of the non-code hours */
function LifeChips() {
  const chips = [
    { label: "Travel", className: "bg-accent/12 text-accent border-accent/25", rotate: -4 },
    { label: "Fitness", className: "bg-white/[0.07] text-ink border-white/15", rotate: 3 },
    { label: "Photography", className: "bg-[#6e9bff]/14 text-[#9dbcff] border-[#6e9bff]/25", rotate: -2 },
    { label: "Coffee", className: "bg-white/[0.05] text-ink-65 border-white/12", rotate: 5 },
    { label: "Learning", className: "bg-accent/10 text-accent/90 border-accent/20", rotate: -3 },
  ] as const;
  return (
    <div className="flex h-full flex-wrap content-center items-center gap-x-2.5 gap-y-3 py-2 pl-1">
      {chips.map((chip, i) => (
        <motion.span
          key={chip.label}
          className={`inline-block rounded-full border px-4 py-2 text-[14px] font-semibold tracking-tight sm:text-[15px] ${chip.className}`}
          style={{ z: 24 + i * 8 }}
          initial={{ opacity: 0, scale: 0.8, rotate: chip.rotate - 8 }}
          animate={{ opacity: 1, scale: 1, rotate: chip.rotate }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 1.45 + i * 0.1 }}
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- tilt panel shell ---------- */

function TiltCard({
  index,
  title,
  href,
  cta,
  rotate: rest,
  float,
  delay,
  className,
  children,
}: {
  index: string;
  title: string;
  href: string;
  cta: string;
  rotate: number;
  float: number;
  delay: number;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const isHash = href.startsWith("#");

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 170, damping: 26, mass: 0.9 };
  const rotateX = useSpring(useTransform(py, (v) => v * -7), spring);
  const rotateY = useSpring(useTransform(px, (v) => v * 9), spring);

  const sheenX = useSpring(useMotionValue(50), spring);
  const sheenY = useSpring(useMotionValue(50), spring);
  const sheenOpacity = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(320px circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.07), transparent 60%)`;

  const shadowX = useTransform(rotateY, (v) => v * -1.6);
  const shadowY = useTransform(rotateX, (v) => v * 1.6 + 34);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 70px rgba(0,0,0,0.55)`;

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
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

  const linkClass =
    "group block cursor-pointer rounded-2xl outline-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.015] focus-visible:ring-1 focus-visible:ring-accent/60";

  const card = (
    <motion.div
      animate={reduced ? undefined : { y: [0, -5, 0] }}
      transition={{
        duration: float,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 0.9,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative overflow-hidden rounded-2xl border hairline bg-[#0c0d0f] transition-colors duration-500 group-hover:border-white/[0.18]"
        style={{ rotateX, rotateY, boxShadow, transformStyle: "preserve-3d" }}
      >
        {/* header strip */}
        <div className="flex items-baseline justify-between border-b hairline bg-white/[0.025] px-5 py-3.5">
          <h3
            className="text-[15px] font-semibold tracking-tight text-ink"
            style={{ transform: "translateZ(24px)" }}
          >
            {title}
          </h3>
          <span className="text-eyebrow flex items-center gap-2">
            {index}
            <span
              aria-hidden
              className="-translate-x-1 text-accent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
            >
              {isHash ? "↓" : "→"}
            </span>
          </span>
        </div>

        {/* body */}
        <div className="h-48 px-5 py-3" style={{ transformStyle: "preserve-3d" }}>
          {children}
        </div>

        {/* footer — the whole card is the button; this names the destination */}
        <div className="flex items-baseline justify-between border-t hairline px-5 py-3">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-40 transition-colors duration-500 group-hover:text-accent">
            {cta}
          </span>
          <span className="font-mono text-[9px] tracking-[0.16em] text-ink-25">
            {isHash ? "SCROLL" : "VISIT"}
          </span>
        </div>

        {/* top edge catch-light + cursor sheen */}
        <span
          aria-hidden
          className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: sheen, opacity: sheenOpacity }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 64, rotate: rest - 4 }}
      animate={{ opacity: 1, y: 0, rotate: rest }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      style={{ perspective: 1000 }}
    >
      {isHash ? (
        <a
          href={href}
          aria-label={`${title} — ${cta}`}
          className={linkClass}
          onClick={(e) => {
            e.preventDefault();
            lenis?.scrollTo(href, { offset: -96, duration: 1.3 });
          }}
        >
          {card}
        </a>
      ) : (
        <Link href={href} aria-label={`${title} — ${cta}`} className={linkClass}>
          {card}
        </Link>
      )}
    </motion.div>
  );
}
