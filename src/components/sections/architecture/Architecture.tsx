"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { architecture } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * S5 — How I build (DESIGN_ANALYSIS §S5). System diagram: scroll draws the
 * connections, then accent pulses run the data paths forever.
 */

const NODES = [
  { id: "frontend", x: 40, y: 218 },
  { id: "backend", x: 370, y: 218 },
  { id: "database", x: 700, y: 96 },
  { id: "ai", x: 700, y: 340 },
  { id: "deploy", x: 960, y: 218 },
] as const;

const W = 200;
const H = 84;

const PATHS = [
  { id: "arch-p1", d: "M 240 260 C 290 260, 320 260, 370 260", window: [0, 0.35], caption: { text: "REST · WS", x: 282, y: 246 }, dur: "2.6s", begin: "0s" },
  { id: "arch-p2", d: "M 570 246 C 640 230, 650 160, 700 142", window: [0.18, 0.55], caption: { text: "SQL · CACHE", x: 600, y: 174 }, dur: "3s", begin: "0.6s" },
  { id: "arch-p3", d: "M 570 274 C 640 290, 650 360, 700 378", window: [0.3, 0.65], caption: { text: "RAG · INFERENCE", x: 588, y: 352 }, dur: "3.2s", begin: "1.1s" },
  { id: "arch-p4", d: "M 900 142 C 940 160, 930 230, 960 246", window: [0.48, 0.85], caption: null, dur: "2.8s", begin: "0.3s" },
  { id: "arch-p5", d: "M 900 378 C 940 360, 930 290, 960 274", window: [0.58, 1], caption: { text: "CI/CD", x: 918, y: 330 }, dur: "2.9s", begin: "1.5s" },
] as const;

function FlowPath({
  p,
  progress,
}: {
  p: (typeof PATHS)[number];
  progress: MotionValue<number>;
}) {
  const pathLength = useTransform(progress, [p.window[0], p.window[1]], [0, 1]);
  const pulseOpacity = useTransform(
    progress,
    [p.window[1], Math.min(1, p.window[1] + 0.08)],
    [0, 1],
  );

  return (
    <g>
      <path id={p.id} d={p.d} fill="none" stroke="none" />
      <motion.path
        d={p.d}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1.5}
        style={{ pathLength }}
      />
      {p.caption && (
        <text
          x={p.caption.x}
          y={p.caption.y}
          fill="rgba(255,255,255,0.25)"
          fontSize={9}
          letterSpacing={1.8}
          style={{ fontFamily: "var(--font-plex-mono)" }}
        >
          {p.caption.text}
        </text>
      )}
      {/* data pulse, runs forever once the path exists */}
      <motion.g style={{ opacity: pulseOpacity }}>
        <circle r="4" fill="rgba(102,240,194,0.25)">
          <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite">
            <mpath href={`#${p.id}`} />
          </animateMotion>
        </circle>
        <circle r="2" fill="#66f0c2">
          <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite">
            <mpath href={`#${p.id}`} />
          </animateMotion>
        </circle>
      </motion.g>
    </g>
  );
}

export default function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "center 40%"],
  });

  return (
    <section
      ref={ref}
      className="container-x py-[clamp(6rem,14vh,12.5rem)]"
      aria-label="How I build"
    >
      <Eyebrow right="One system, end to end">04 — How I build</Eyebrow>

      {/* desktop diagram */}
      <div className="mt-14 hidden md:block">
        <svg viewBox="0 0 1200 520" className="w-full" role="img" aria-label="System architecture: frontend through backend to database and AI layer, shipped via deployment">
          {/* dotted field */}
          <defs>
            <pattern id="arch-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
            </pattern>
          </defs>
          <rect width="1200" height="520" fill="url(#arch-dots)" />

          {/* connections — drawn by scroll */}
          {PATHS.map((p) => (
            <FlowPath key={p.id} p={p} progress={scrollYProgress} />
          ))}

          {/* nodes */}
          {NODES.map((pos, i) => {
            const node = architecture.nodes[i];
            return (
              <motion.g
                key={node.id}
                className="group cursor-default"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 * i }}
              >
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={W}
                  height={H}
                  rx={14}
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.1)"
                  className="transition-colors duration-500 group-hover:stroke-[rgba(102,240,194,0.4)]"
                />
                <text
                  x={pos.x + 20}
                  y={pos.y + 34}
                  fill="#ffffff"
                  fontSize={16}
                  fontWeight={650}
                  letterSpacing={-0.3}
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {node.label}
                </text>
                <text
                  x={pos.x + 20}
                  y={pos.y + 58}
                  fill="rgba(255,255,255,0.4)"
                  fontSize={9.5}
                  letterSpacing={1.4}
                  style={{ fontFamily: "var(--font-plex-mono)" }}
                >
                  {node.tech.join(" · ").toUpperCase()}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* mobile: vertical flow */}
      <div className="mt-12 md:hidden">
        <div className="relative ml-2 border-l border-dashed border-white/15 pl-6">
          {architecture.nodes.map((node, i) => (
            <Reveal key={node.id} delay={0.08 * i} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[27.5px] top-1.5 size-[7px] rounded-full bg-accent/80" />
              <p className="text-lg font-semibold tracking-tight">{node.label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-40">
                {node.tech.join(" · ")}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
