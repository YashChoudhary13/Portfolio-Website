"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import { MaskLines } from "@/components/shared/Reveal";
import KnobAccordion from "./KnobAccordion";
import { springs } from "@/lib/motion";

const KnobCanvas = dynamic(() => import("./KnobCanvas"), {
  ssr: false,
  loading: () => <StaticDisc />,
});

/** CSS stand-in while the three.js chunk streams in. */
function StaticDisc() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 38% 30%, #d6dade 0%, #aeb4ba 35%, #7c8288 70%, #555a60 100%)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
      }}
    />
  );
}

/**
 * Detents sit at the diagonals, like the reference:
 * 1 = bottom-left (-135°), 2 = top-left (-45°), 3 = top-right (45°),
 * 4 = bottom-right (135°). Angles measured clockwise from 12 o'clock.
 */
const nearestDetent = (deg: number) => Math.round((deg - 45) / 90) * 90 + 45;
const stateOf = (deg: number) =>
  ((Math.round((deg - 45) / 90) + 2) % 4 + 4) % 4;
const angleOfState = (i: number) => -135 + i * 90;

const NUMBER_POSITIONS = [
  "left-[10%] top-[90%]", // 1 — bottom-left
  "left-[10%] top-[10%]", // 2 — top-left
  "left-[90%] top-[10%]", // 3 — top-right
  "left-[90%] top-[90%]", // 4 — bottom-right
] as const;

/** fine tick ring with emphasized diagonals, drawn in the page like the reference */
function TickRing({ activeIndex }: { activeIndex: number }) {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angleDeg = i * 5; // clockwise from 12 o'clock
    // diagonal tick slots → state index: 45°=TR(3rd), 135°=BR(4th),
    // 225°=BL(1st), 315°=TL(2nd)
    const stateAt = { 9: 2, 27: 3, 45: 0, 63: 1 }[i];
    const major = stateAt !== undefined;
    const active = major && stateAt === activeIndex;
    const r1 = major ? 44.5 : 46.5;
    const r2 = 48.5;
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    // round to avoid SSR/client float drift in the last digit (hydration)
    const fix = (n: number) => Math.round(n * 1000) / 1000;
    const x1 = fix(50 + r1 * Math.cos(rad));
    const y1 = fix(50 + r1 * Math.sin(rad));
    const x2 = fix(50 + r2 * Math.cos(rad));
    const y2 = fix(50 + r2 * Math.sin(rad));
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={
          active
            ? "rgba(255,255,255,0.85)"
            : major
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.12)"
        }
        strokeWidth={major ? 0.5 : 0.25}
      />
    );
  });
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
      {ticks}
    </svg>
  );
}

/**
 * S3 — the control knob. Click advances one detent; drag rotates freely
 * with momentum then snaps; accordion rows steer it; arrow keys work.
 */
export default function KnobSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const near = useInView(sectionRef, { margin: "600px 0px", once: true });
  const active = useInView(sectionRef, { margin: "120px 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (near) setMounted(true);
  }, [near]);

  const target = useMotionValue(angleOfState(0));
  const rotation = useSpring(target, springs.snap);
  const [index, setIndex] = useState(0);
  useMotionValueEvent(target, "change", (v) => setIndex(stateOf(v)));

  const lightX = useSpring(useMotionValue(0), springs.responsive);
  const lightY = useSpring(useMotionValue(0), springs.responsive);
  const lightBoost = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });

  const pulse = useAnimationControls();
  const firePulse = () =>
    pulse.start({
      scale: [1, 0.985, 1],
      transition: { duration: 0.35, times: [0, 0.45, 1], delay: 0.1 },
    });

  const drag = useRef({ on: false, last: 0, moved: 0, start: 0, acc: 0 });

  const angleAt = (e: PointerEvent) => {
    const rect = stageRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    stageRef.current?.setPointerCapture(e.pointerId);
    drag.current = {
      on: true,
      last: angleAt(e),
      moved: 0,
      start: target.get(),
      acc: 0,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (rect) {
      lightX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      lightY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }
    const d = drag.current;
    if (!d.on) return;
    const a = angleAt(e);
    const delta = ((a - d.last + 540) % 360) - 180;
    d.acc += delta;
    d.moved += Math.abs(delta);
    d.last = a;
    target.set(d.start + d.acc);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    stageRef.current?.releasePointerCapture(e.pointerId);
    const d = drag.current;
    if (!d.on) return;
    d.on = false;

    if (d.moved < 5) {
      target.set(nearestDetent(target.get()) + 90);
    } else {
      const projected = target.get() + target.getVelocity() * 0.12;
      target.set(nearestDetent(projected));
    }
    firePulse();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      target.set(nearestDetent(target.get()) + 90);
      firePulse();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      target.set(nearestDetent(target.get()) - 90);
      firePulse();
    }
  };

  const selectState = (i: number) => {
    const current = target.get();
    const desired = angleOfState(i);
    const delta = (((desired - current) % 360) + 540) % 360 - 180;
    if (Math.abs(delta) < 1) return;
    target.set(current + delta);
    firePulse();
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="border-t hairline bg-raised"
      aria-label="Capabilities — interactive control"
    >
      <div className="container-x py-[clamp(6rem,14vh,12.5rem)]">
        <Eyebrow right="Click or drag — it's a real knob">
          01 — Capabilities
        </Eyebrow>

        <MaskLines
          as="h2"
          lines={["What I actually build"]}
          className="text-display mt-12"
          lineClassName="text-[length:var(--text-display-lg)]"
        />

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* accordion — left, like the reference */}
          <KnobAccordion index={index} onSelect={selectState} />

          {/* stage — tick ring + numbers live in the page around the dial */}
          <div className="relative mx-auto w-full max-w-[30rem]">
            <div
              aria-hidden
              className="absolute inset-[-18%] rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(102,240,194,0.05), rgba(255,255,255,0.03) 45%, transparent 72%)",
              }}
            />

            <motion.div
              ref={stageRef}
              animate={pulse}
              role="slider"
              tabIndex={0}
              aria-label="Capability selector"
              aria-valuemin={1}
              aria-valuemax={4}
              aria-valuenow={index + 1}
              aria-valuetext={`State ${index + 1} of 4`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerEnter={() => lightBoost.set(1)}
              onPointerLeave={() => lightBoost.set(0)}
              onKeyDown={onKeyDown}
              className="relative aspect-square w-full cursor-grab touch-none select-none rounded-full outline-none focus-visible:ring-1 focus-visible:ring-accent/60 active:cursor-grabbing"
            >
              <TickRing activeIndex={index} />

              {/* numbers at the diagonals */}
              {NUMBER_POSITIONS.map((pos, i) => (
                <span
                  key={i}
                  className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-mono text-sm transition-colors duration-500 ${pos} ${
                    i === index ? "text-ink" : "text-ink-25"
                  }`}
                >
                  {i + 1}
                </span>
              ))}

              {/* the dial itself, inset from the tick ring */}
              <div className="absolute inset-[9%]">
                {mounted ? (
                  <KnobCanvas
                    rotation={rotation}
                    lightX={lightX}
                    lightY={lightY}
                    lightBoost={lightBoost}
                    active={active}
                  />
                ) : (
                  <StaticDisc />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
