"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { GalleryFrame } from "@/lib/caseStudies";
import { EASE_OUT_EXPO, scaleIn, VIEWPORT_ONCE } from "@/lib/motion";

const TONE: Record<string, string> = {
  dim: "text-ink-25",
  default: "text-ink-40",
  bright: "text-ink",
  accent: "text-accent",
};

/** Minimal JSON syntax tint inside the palette — keys quiet, numbers accent. */
function JsonCode({ code }: { code: string }) {
  const nodes: ReactNode[] = [];
  const re =
    /("[^"]*")(\s*:)|("[^"]*")|(-?\d+\.?\d*)|([{}[\],])|(true|false|null)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = re.exec(code)) !== null) {
    if (match.index > last) {
      nodes.push(<span key={k++}>{code.slice(last, match.index)}</span>);
    }
    if (match[1] !== undefined) {
      nodes.push(
        <span key={k++} className="text-ink-65">
          {match[1]}
        </span>,
        <span key={k++} className="text-ink-25">
          {match[2]}
        </span>,
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <span key={k++} className="text-ink">
          {match[3]}
        </span>,
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <span key={k++} className="text-accent">
          {match[4]}
        </span>,
      );
    } else if (match[5] !== undefined) {
      nodes.push(
        <span key={k++} className="text-ink-25">
          {match[5]}
        </span>,
      );
    } else {
      nodes.push(
        <span key={k++} className="text-ink-65">
          {match[6]}
        </span>,
      );
    }
    last = re.lastIndex;
  }
  if (last < code.length) nodes.push(<span key={k++}>{code.slice(last)}</span>);

  return (
    <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-[1.9] text-ink-40">
      {nodes}
    </pre>
  );
}

function FrameContent({ frame }: { frame: GalleryFrame }) {
  switch (frame.kind) {
    case "board":
      return (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${frame.columns.length}, minmax(0,1fr))`,
          }}
        >
          {frame.columns.map((col) => (
            <div key={col.name}>
              <p className="font-mono text-[8.5px] tracking-[0.2em] text-ink-40">
                {col.name}
              </p>
              <div className="mt-3 space-y-2">
                {col.tickets.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-lg border px-3 py-2 ${
                      t.live
                        ? "border-accent/25 bg-accent/[0.04]"
                        : "hairline bg-white/[0.03]"
                    }`}
                  >
                    <p className="flex items-center justify-between font-mono text-[10px] text-ink">
                      {t.id}
                      {t.live && (
                        <span className="relative flex size-1">
                          <span className="absolute size-full animate-ping rounded-full bg-accent opacity-60" />
                          <span className="relative size-1 rounded-full bg-accent" />
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.06em] text-ink-40">
                      {t.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "bars":
      return (
        <div>
          <div className="space-y-4">
            {frame.bars.map((bar, i) => (
              <div key={bar.label} className="flex items-center gap-4">
                <span className="w-32 shrink-0 truncate font-mono text-[9.5px] tracking-[0.14em] text-ink-65">
                  {bar.label}
                </span>
                <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.span
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      bar.accent ? "bg-accent/90" : "bg-white/45"
                    }`}
                    style={{ width: `${bar.value * 100}%`, originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{
                      duration: 1.1,
                      ease: EASE_OUT_EXPO,
                      delay: 0.25 + i * 0.1,
                    }}
                  />
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink-40">
                  {bar.display}
                </span>
              </div>
            ))}
          </div>
          {frame.footer && (
            <div className="mt-6 flex items-baseline justify-between gap-6 border-t hairline pt-4">
              <span className="font-mono text-[9px] tracking-[0.2em] text-ink-40">
                {frame.footer.label}
              </span>
              <span className="text-[15px] font-bold tracking-tight text-ink">
                {frame.footer.value}
              </span>
              {frame.footer.meta && (
                <span className="font-mono text-[10px] tracking-[0.12em] text-accent">
                  {frame.footer.meta}
                </span>
              )}
            </div>
          )}
        </div>
      );

    case "log":
      return (
        <motion.ul
          className="space-y-2.5"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
        >
          {frame.lines.map((line, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: 10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.45, ease: EASE_OUT_EXPO },
                },
              }}
              className="flex gap-4 font-mono text-[10.5px] leading-relaxed"
            >
              <span className="w-14 shrink-0 tabular-nums text-ink-25">
                {line.time}
              </span>
              <span className={TONE[line.tone]}>{line.text}</span>
            </motion.li>
          ))}
        </motion.ul>
      );

    case "json":
      return <JsonCode code={frame.code} />;
  }
}

function Frame({ frame, index }: { frame: GalleryFrame; index: number }) {
  return (
    <motion.figure
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <div className="group overflow-hidden rounded-2xl border hairline bg-raised transition-colors duration-700 hover:border-white/[0.16]">
        <div className="flex items-baseline justify-between border-b hairline bg-white/[0.025] px-5 py-3">
          <span className="text-[13px] font-semibold tracking-tight text-ink">
            {frame.title}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-ink-25">
            VIEW {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="p-5 lg:p-6">
          <FrameContent frame={frame} />
        </div>
      </div>
      <figcaption className="mt-3 flex gap-3 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-ink-40">
        <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
        {frame.caption}
      </figcaption>
    </motion.figure>
  );
}

/**
 * Product views — crafted frames, not screenshots in a grid. One leads,
 * two follow staggered; the offset column drifts on scroll for depth.
 */
export default function Gallery({ frames }: { frames: readonly GalleryFrame[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftRange = reduced ? [0, 0] : [36, -36];
  const drift = useTransform(scrollYProgress, [0, 1], driftRange);

  if (!frames.length) return null;
  const left = frames.filter((_, i) => i % 2 === 0);
  const right = frames.filter((_, i) => i % 2 === 1);

  return (
    <div ref={ref} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="flex flex-col gap-10 lg:col-span-7 lg:gap-14">
        {left.map((frame) => (
          <Frame key={frame.title} frame={frame} index={frames.indexOf(frame)} />
        ))}
      </div>
      <motion.div
        className="flex flex-col gap-10 lg:col-span-5 lg:mt-28 lg:gap-14"
        style={{ y: drift }}
      >
        {right.map((frame) => (
          <Frame key={frame.title} frame={frame} index={frames.indexOf(frame)} />
        ))}
      </motion.div>
    </div>
  );
}
