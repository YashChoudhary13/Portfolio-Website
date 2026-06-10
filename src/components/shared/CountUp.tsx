"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Rolls a number into place once, on scroll entry (DESIGN_ANALYSIS §S2).
 * Tabular numerals upstream keep the layout still while digits change.
 */
export default function CountUp({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: EASE_OUT_EXPO,
    });
    return controls.stop;
  }, [inView, mv, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}
