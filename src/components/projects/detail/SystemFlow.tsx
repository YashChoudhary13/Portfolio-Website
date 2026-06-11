"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FlowStage } from "@/lib/caseStudies";
import { EASE_OUT_EXPO } from "@/lib/motion";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/** Traveling data pulse on a connector — the system is always running. */
function Pulse({ delay, vertical }: { delay: number; vertical?: boolean }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.span
      aria-hidden
      className={`absolute rounded-full bg-accent shadow-[0_0_8px_rgba(102,240,194,0.8)] ${
        vertical
          ? "left-1/2 size-[5px] -translate-x-1/2"
          : "top-1/2 size-[5px] -translate-y-1/2"
      }`}
      animate={
        vertical
          ? { top: ["-6%", "102%"], opacity: [0, 1, 1, 0] }
          : { left: ["-6%", "102%"], opacity: [0, 1, 1, 0] }
      }
      transition={{
        duration: 1.7,
        times: [0, 0.18, 0.82, 1],
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatDelay: 0.6,
      }}
    />
  );
}

function StageDetail({
  stage,
  index,
  id,
}: {
  stage: FlowStage;
  index: number;
  id: string;
}) {
  return (
    <motion.div
      key={stage.id}
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="grid gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-8"
    >
      <div className="lg:col-span-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          Stage {pad(index)} — {stage.label}
        </p>
        <p className="mt-3 leading-relaxed text-ink-65">{stage.detail.body}</p>
      </div>
      <motion.ul
        className="lg:col-span-7"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        {stage.detail.points.map((point) => (
          <motion.li
            key={point}
            variants={{
              hidden: { opacity: 0, x: 14 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: EASE_OUT_EXPO },
              },
            }}
            className="flex items-start gap-4 border-b hairline py-3 text-[14px] leading-relaxed text-ink-65 last:border-b-0"
          >
            <span aria-hidden className="mt-[0.72em] h-px w-4 shrink-0 bg-accent/60" />
            {point}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/**
 * The system, explorable. Stages connected by always-running data pulses;
 * selecting a stage opens its internals. Horizontal pipeline on desktop,
 * vertical on mobile — same data, same behavior.
 */
export default function SystemFlow({ flow }: { flow: readonly FlowStage[] }) {
  const [active, setActive] = useState(0);
  const stage = flow[active];

  return (
    <div>
      {/* ── desktop pipeline ─────────────────────────────────── */}
      <div className="hidden lg:block">
        <div className="flex items-stretch">
          {flow.map((s, i) => (
            <div key={s.id} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className="relative mt-[2.4rem] h-px w-6 flex-none self-start bg-white/10 lg:w-10"
                >
                  <Pulse delay={i * 0.4} />
                </span>
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={active === i}
                aria-controls="systemflow-detail"
                className={`min-w-0 flex-1 rounded-xl border px-3.5 py-4 text-left transition-all duration-500 lg:px-4 ${
                  active === i
                    ? "border-accent/40 bg-white/[0.05] shadow-[0_0_50px_rgba(102,240,194,0.07)]"
                    : "hairline bg-white/[0.02] hover:bg-white/[0.045]"
                }`}
              >
                <span
                  className={`block font-mono text-[9px] tracking-[0.2em] transition-colors duration-500 ${
                    active === i ? "text-accent" : "text-ink-25"
                  }`}
                >
                  {pad(i)}
                </span>
                <span
                  className={`mt-2 block truncate text-[13px] font-semibold tracking-tight transition-colors duration-500 lg:text-[15px] ${
                    active === i ? "text-ink" : "text-ink-65"
                  }`}
                >
                  {s.label}
                </span>
                <span className="mt-1 block truncate font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-40">
                  {s.sub}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 min-h-[15rem] overflow-hidden rounded-2xl border hairline bg-raised">
          <AnimatePresence mode="wait" initial={false}>
            <StageDetail
              key={stage.id}
              stage={stage}
              index={active}
              id="systemflow-detail"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* ── mobile pipeline ──────────────────────────────────── */}
      <div className="lg:hidden">
        {flow.map((s, i) => (
          <div key={s.id}>
            {i > 0 && (
              <span
                aria-hidden
                className="relative ml-7 block h-7 w-px bg-white/10"
              >
                <Pulse delay={i * 0.4} vertical />
              </span>
            )}
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={active === i}
              aria-controls={`sysflow-m-${s.id}`}
              className={`flex w-full items-baseline gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-500 ${
                active === i
                  ? "border-accent/40 bg-white/[0.05]"
                  : "hairline bg-white/[0.02]"
              }`}
            >
              <span
                className={`font-mono text-[9px] tracking-[0.2em] ${
                  active === i ? "text-accent" : "text-ink-25"
                }`}
              >
                {pad(i)}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-[15px] font-semibold tracking-tight ${
                    active === i ? "text-ink" : "text-ink-65"
                  }`}
                >
                  {s.label}
                </span>
                <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-ink-40">
                  {s.sub}
                </span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div
                  id={`sysflow-m-${s.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-2 pt-4">
                    <p className="text-[14px] leading-relaxed text-ink-65">
                      {s.detail.body}
                    </p>
                    <ul className="mt-3">
                      {s.detail.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 border-b hairline py-2.5 text-[13px] leading-relaxed text-ink-65 last:border-b-0"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.7em] h-px w-3.5 shrink-0 bg-accent/60"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
