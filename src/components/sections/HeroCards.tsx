"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
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
 * Three tilted panels scattered horizontally (reference anatomy): solid
 * raised surfaces with a header strip and a playful mini-composition.
 * Spring tilt, cursor sheen, counter-tilt shadow, desynced idle float.
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
          {i === 0 && <PillStack />}
          {i === 1 && <FlowDoodle />}
          {i === 2 && <DeployBoard />}
        </TiltCard>
      ))}
    </div>
  );
}

/* ---------- mini-compositions ---------- */

/** stacked tinted pills, like the reference's Sales/Growth/Product chips */
function PillStack() {
  const pills = [
    { label: "RAG", className: "bg-accent/15 text-accent border-accent/25", rotate: -5, x: "6%" },
    { label: "Function calling", className: "bg-[#6e9bff]/15 text-[#9dbcff] border-[#6e9bff]/25", rotate: 3, x: "22%" },
    { label: "PyTorch", className: "bg-white/[0.07] text-ink border-white/15", rotate: -2, x: "12%" },
  ] as const;
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 py-2">
      {pills.map((pill, i) => (
        <motion.span
          key={pill.label}
          className={`inline-block w-fit rounded-xl border px-5 py-2.5 text-base font-semibold tracking-tight sm:text-lg ${pill.className}`}
          style={{ rotate: pill.rotate, marginLeft: pill.x, transform: `translateZ(${30 + i * 12}px)` }}
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

/** squiggle path with system nodes riding it */
function FlowDoodle() {
  const nodes = [
    { label: "UI", x: "4%", y: "8%" },
    { label: "API", x: "38%", y: "44%" },
    { label: "DB", x: "68%", y: "12%" },
  ] as const;
  return (
    <div className="relative h-full py-2">
      <svg viewBox="0 0 280 150" className="absolute inset-0 h-full w-full" aria-hidden>
        <motion.path
          d="M 20 30 C 90 110, 120 110, 150 80 S 210 10, 260 40"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 1.45 }}
        />
      </svg>
      {nodes.map((node, i) => (
        <motion.span
          key={node.label}
          className="absolute rounded-lg border hairline bg-white/[0.05] px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-ink-65"
          style={{ left: node.x, top: node.y, transform: `translateZ(${28 + i * 10}px)` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 1.5 + i * 0.14 }}
        >
          {node.label}
        </motion.span>
      ))}
      <span className="absolute bottom-1 right-0 font-mono text-[9px] tracking-[0.16em] text-ink-25">
        WS · REST · SQL
      </span>
    </div>
  );
}

/** tiny deploy dashboard — everything on it is really live */
function DeployBoard() {
  const rows = [
    { name: "deepverify", status: "live", on: true },
    { name: "the-mex", status: "production", on: true },
    { name: "revo", status: "shipped", on: false },
  ] as const;
  return (
    <div className="flex h-full flex-col justify-center gap-2 py-2">
      {rows.map((row, i) => (
        <motion.div
          key={row.name}
          className="flex items-center justify-between rounded-lg border hairline bg-white/[0.03] px-3.5 py-2.5"
          style={{ transform: `translateZ(${26 + i * 10}px)` }}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 1.6 + i * 0.12 }}
        >
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink">
            {row.name}
          </span>
          <span className="flex items-center gap-2">
            {row.on && (
              <span className="relative flex size-1.5">
                <span className="absolute size-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
            )}
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-40">
              {row.status}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- tilt panel shell ---------- */

function TiltCard({
  index,
  title,
  rotate: rest,
  float,
  delay,
  className,
  children,
}: {
  index: string;
  title: string;
  rotate: number;
  float: number;
  delay: number;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 64, rotate: rest - 4 }}
      animate={{ opacity: 1, y: 0, rotate: rest }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      style={{ perspective: 1000 }}
    >
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
          className="relative overflow-hidden rounded-2xl border hairline bg-[#0c0d0f]"
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
            <span className="text-eyebrow">{index}</span>
          </div>

          {/* body */}
          <div className="h-48 px-5 py-3" style={{ transformStyle: "preserve-3d" }}>
            {children}
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
    </motion.div>
  );
}
