"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
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
 * connections, then accent pulses run the data paths forever. The graph is
 * explorable — selecting a layer lights its data paths and opens the
 * internals: request flows, caches, pipelines.
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
  { id: "arch-p1", d: "M 240 260 C 290 260, 320 260, 370 260", window: [0, 0.35], caption: { text: "REST · WS", x: 282, y: 246 }, dur: "2.6s", begin: "0s", between: ["frontend", "backend"] },
  { id: "arch-p2", d: "M 570 246 C 640 230, 650 160, 700 142", window: [0.18, 0.55], caption: { text: "SQL · CACHE", x: 600, y: 174 }, dur: "3s", begin: "0.6s", between: ["backend", "database"] },
  { id: "arch-p3", d: "M 570 274 C 640 290, 650 360, 700 378", window: [0.3, 0.65], caption: { text: "RAG · INFERENCE", x: 588, y: 352 }, dur: "3.2s", begin: "1.1s", between: ["backend", "ai"] },
  { id: "arch-p4", d: "M 900 142 C 940 160, 930 230, 960 246", window: [0.48, 0.85], caption: null, dur: "2.8s", begin: "0.3s", between: ["database", "deploy"] },
  { id: "arch-p5", d: "M 900 378 C 940 360, 930 290, 960 274", window: [0.58, 1], caption: { text: "CI/CD", x: 918, y: 330 }, dur: "2.9s", begin: "1.5s", between: ["ai", "deploy"] },
] as const;

type Node = (typeof architecture.nodes)[number];

function FlowPath({
  p,
  progress,
  lit,
  dimmed,
}: {
  p: (typeof PATHS)[number];
  progress: MotionValue<number>;
  /** path touches the selected node */
  lit: boolean;
  /** a node is selected and this path doesn't touch it */
  dimmed: boolean;
}) {
  // SMIL pulses ignore the global CSS reduced-motion kill — gate them here
  const reduced = useReducedMotion();
  const pathLength = useTransform(progress, [p.window[0], p.window[1]], [0, 1]);
  const pulseOpacity = useTransform(
    progress,
    [p.window[1], Math.min(1, p.window[1] + 0.08)],
    [0, 1],
  );

  return (
    <motion.g
      animate={{ opacity: dimmed ? 0.35 : 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <path id={p.id} d={p.d} fill="none" stroke="none" />
      <motion.path
        d={p.d}
        fill="none"
        strokeWidth={1.5}
        style={{
          pathLength,
          transition: "stroke 0.5s",
          stroke: lit ? "var(--color-accent-dim)" : "var(--color-ink-25)",
        }}
      />
      {p.caption && (
        <text
          x={p.caption.x}
          y={p.caption.y}
          fontSize={9}
          letterSpacing={1.8}
          style={{
            fontFamily: "var(--font-plex-mono)",
            transition: "fill 0.5s",
            fill: lit ? "var(--color-accent)" : "var(--color-ink-25)",
          }}
        >
          {p.caption.text}
        </text>
      )}
      {/* data pulse, runs forever once the path exists */}
      {!reduced && (
        <motion.g style={{ opacity: pulseOpacity }}>
          <circle r={lit ? 5 : 4} style={{ fill: "var(--color-accent-dim)" }}>
            <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite">
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>
          <circle r={lit ? 2.5 : 2} style={{ fill: "var(--color-accent)" }}>
            <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite">
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>
        </motion.g>
      )}
    </motion.g>
  );
}

/** Expanded internals for a selected layer — shared by desktop and mobile. */
function NodeDetail({ node }: { node: Node }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          {node.label}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-65">
          {node.detail.summary}
        </p>
      </div>
      <div className="lg:col-span-8">
        <motion.div
          className="flex flex-wrap items-center gap-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
          }}
        >
          {node.detail.flow.map((step, i) => (
            <motion.span
              key={step}
              className="flex items-center"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: EASE_OUT_EXPO },
                },
              }}
            >
              {i > 0 && (
                <span aria-hidden className="mx-2.5 text-ink-25">
                  →
                </span>
              )}
              <span className="rounded-lg border hairline bg-glass px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-ink-65">
                {step}
              </span>
            </motion.span>
          ))}
        </motion.div>
        <div className="mt-5 flex flex-wrap gap-2 border-t hairline pt-5">
          {node.detail.facts.map((fact) => (
            <span
              key={fact}
              className="rounded-full border hairline px-3.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-40"
            >
              {fact}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "center 40%"],
  });
  // backend starts selected — the panel is never an empty reservation and
  // the diagram announces that it can be explored
  const [active, setActive] = useState<string | null>("backend");

  const activeNode = architecture.nodes.find((n) => n.id === active) ?? null;
  const litPaths = new Set(
    active
      ? PATHS.filter((p) =>
          (p.between as readonly string[]).includes(active),
        ).map((p) => p.id)
      : [],
  );

  const toggle = (id: string) => setActive((cur) => (cur === id ? null : id));

  return (
    <section
      ref={ref}
      className="container-x py-[clamp(6rem,14vh,12.5rem)]"
      aria-label="How I build"
    >
      <Eyebrow right="One system, end to end">02 — How I build</Eyebrow>

      {/* desktop diagram */}
      <div className="mt-14 hidden md:block">
        <svg viewBox="0 40 1200 412" className="w-full" role="img" aria-label="System architecture: frontend through backend to database and AI layer, shipped via deployment. Select a layer to see its internals.">
          {/* dotted field */}
          <defs>
            <pattern id="arch-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" style={{ fill: "var(--color-glass)" }} />
            </pattern>
          </defs>
          <rect y="40" width="1200" height="412" fill="url(#arch-dots)" />

          {/* connections — drawn by scroll */}
          {PATHS.map((p) => (
            <FlowPath
              key={p.id}
              p={p}
              progress={scrollYProgress}
              lit={litPaths.has(p.id)}
              dimmed={active !== null && !litPaths.has(p.id)}
            />
          ))}

          {/* nodes */}
          {NODES.map((pos, i) => {
            const node = architecture.nodes[i];
            const isActive = active === node.id;
            const isDimmed = active !== null && !isActive;
            return (
              <motion.g
                key={node.id}
                className="group cursor-pointer outline-none"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 * i }}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${node.label} — show internals`}
                onClick={() => toggle(node.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(node.id);
                  }
                }}
              >
                <motion.g
                  animate={{ opacity: isDimmed ? 0.45 : 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={W}
                    height={H}
                    rx={14}
                    style={{
                      transition: "stroke 0.5s, fill 0.5s",
                      fill: isActive
                        ? "color-mix(in oklab, var(--color-accent) 7%, transparent)"
                        : "var(--color-glass)",
                      stroke: isActive
                        ? "color-mix(in oklab, var(--color-accent) 60%, transparent)"
                        : "var(--color-hairline)",
                    }}
                    className="group-hover:stroke-[color:var(--color-accent-dim)] group-focus-visible:stroke-2 group-focus-visible:stroke-[color:var(--color-accent)]"
                  />
                  <text
                    x={pos.x + 20}
                    y={pos.y + 34}
                    fontSize={16}
                    fontWeight={650}
                    letterSpacing={-0.3}
                    style={{
                      fontFamily: "var(--font-display)",
                      fill: "var(--color-ink)",
                    }}
                  >
                    {node.label}
                  </text>
                  <text
                    x={pos.x + 20}
                    y={pos.y + 58}
                    fontSize={8.5}
                    letterSpacing={0.6}
                    style={{
                      fontFamily: "var(--font-plex-mono)",
                      fill: "var(--color-ink-40)",
                    }}
                  >
                    {node.tech.join(" · ").toUpperCase()}
                  </text>
                  {/* expand affordance */}
                  <text
                    x={pos.x + W - 22}
                    y={pos.y + 32}
                    fontSize={13}
                    textAnchor="middle"
                    style={{
                      transition: "fill 0.5s",
                      fill: isActive
                        ? "var(--color-accent)"
                        : "var(--color-ink-25)",
                    }}
                  >
                    {isActive ? "−" : "+"}
                  </text>
                </motion.g>
              </motion.g>
            );
          })}
        </svg>

        {/* internals panel */}
        <div className="mt-2 min-h-[10rem]">
          <AnimatePresence mode="wait" initial={false}>
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="rounded-2xl border hairline bg-raised p-6 lg:p-7"
              >
                <NodeDetail node={activeNode} />
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="px-1 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-25"
              >
                {architecture.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* mobile: vertical flow, tap to expand */}
      <div className="mt-12 md:hidden">
        <div className="relative ml-2 border-l border-dashed hairline pl-6">
          {architecture.nodes.map((node, i) => {
            const isActive = active === node.id;
            return (
              <Reveal key={node.id} delay={0.08 * i} className="relative pb-8 last:pb-0">
                <span
                  className={`absolute -left-[27.5px] top-1.5 size-[7px] rounded-full transition-colors duration-500 ${
                    isActive ? "bg-accent" : "bg-accent/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggle(node.id)}
                  aria-expanded={isActive}
                  aria-controls={`arch-m-${node.id}`}
                  className="block w-full text-left"
                >
                  <p className="flex items-baseline justify-between text-lg font-semibold tracking-tight">
                    {node.label}
                    <span
                      aria-hidden
                      className={`font-mono text-sm transition-colors duration-500 ${
                        isActive ? "text-accent" : "text-ink-25"
                      }`}
                    >
                      {isActive ? "−" : "+"}
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-40">
                    {node.tech.join(" · ")}
                  </p>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`arch-m-${node.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <p className="text-[14px] leading-relaxed text-ink-65">
                          {node.detail.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-y-2">
                          {node.detail.flow.map((step, s) => (
                            <span key={step} className="flex items-center">
                              {s > 0 && (
                                <span aria-hidden className="mx-2 text-ink-25">
                                  →
                                </span>
                              )}
                              <span className="rounded-md border hairline bg-glass px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-ink-65">
                                {step}
                              </span>
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {node.detail.facts.map((fact) => (
                            <span
                              key={fact}
                              className="rounded-full border hairline px-2.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-40"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
