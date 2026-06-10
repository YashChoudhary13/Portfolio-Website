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
import KnobStatePanel from "./KnobStatePanel";
import { knobStates } from "@/lib/content";
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
      className="absolute inset-[12%] rounded-full"
      style={{
        background:
          "radial-gradient(circle at 38% 30%, #d6dade 0%, #aeb4ba 35%, #7c8288 70%, #555a60 100%)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
      }}
    />
  );
}

const LABEL_POSITIONS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
] as const;

const nearestDetent = (deg: number) => Math.round(deg / 90) * 90;
const stateOf = (deg: number) => ((Math.round(deg / 90) % 4) + 4) % 4;

/**
 * S3 — the control knob (DESIGN_ANALYSIS §1.7/§S3). Click advances one
 * detent; drag rotates freely with momentum, then snaps. The spring target
 * is the source of truth; content follows the detent.
 */
export default function KnobSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // mount the canvas just-in-time, pause its loop off-screen
  const near = useInView(sectionRef, { margin: "600px 0px", once: true });
  const active = useInView(sectionRef, { margin: "120px 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (near) setMounted(true);
  }, [near]);

  // rotation: target detents/drag → mechanical spring follows
  const target = useMotionValue(0);
  const rotation = useSpring(target, springs.snap);
  const [index, setIndex] = useState(0);
  useMotionValueEvent(target, "change", (v) => setIndex(stateOf(v)));

  // cursor-driven lighting
  const lightX = useSpring(useMotionValue(0), springs.responsive);
  const lightY = useSpring(useMotionValue(0), springs.responsive);
  const lightBoost = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });

  // detent "click" pulse
  const pulse = useAnimationControls();
  const firePulse = () =>
    pulse.start({
      scale: [1, 0.985, 1],
      transition: { duration: 0.35, times: [0, 0.45, 1], delay: 0.1 },
    });

  // drag state (refs — no re-renders during drag)
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
    // lighting follows the cursor whenever it's over the stage
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
      // a click: advance exactly one detent
      target.set(nearestDetent(target.get()) + 90);
    } else {
      // momentum, then snap to the nearest detent
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

  return (
    <section
      ref={sectionRef}
      className="border-y hairline bg-raised"
      aria-label="Capabilities — interactive control"
    >
      <div className="container-x py-[clamp(6rem,14vh,12.5rem)]">
        <Eyebrow right="Click or drag — it's a real knob">
          02 — Capabilities
        </Eyebrow>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* stage */}
          <div className="relative mx-auto w-full max-w-[30rem]">
            {/* glow behind the metal */}
            <div
              aria-hidden
              className="absolute inset-[-20%] rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(102,240,194,0.06), rgba(255,255,255,0.03) 45%, transparent 72%)",
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
              aria-valuetext={knobStates[index].title}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerEnter={() => lightBoost.set(1)}
              onPointerLeave={() => lightBoost.set(0)}
              onKeyDown={onKeyDown}
              className="relative aspect-square w-full cursor-grab touch-none select-none outline-none focus-visible:ring-1 focus-visible:ring-accent/60 active:cursor-grabbing rounded-full"
            >
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

              {/* compass labels */}
              {knobStates.map((s, i) => (
                <span
                  key={s.label}
                  className={`pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${LABEL_POSITIONS[i]} ${
                    i === index ? "text-ink" : "text-ink-25"
                  }`}
                >
                  {s.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* state content */}
          <KnobStatePanel index={index} />
        </div>
      </div>
    </section>
  );
}
