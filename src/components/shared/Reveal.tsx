"use client";

import { motion } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import {
  fadeRise,
  maskLine,
  staggerChildren,
  VIEWPORT_ONCE,
} from "@/lib/motion";

/** Fade-rise entrance for body copy / meta / blocks. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeRise}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal for display type (DESIGN_ANALYSIS §1.5):
 * each line rises from behind its own baseline mask with a 1.5° settle.
 * Line breaks are intentional — pass them explicitly.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: readonly ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);
  return (
    <MotionTag
      className={className}
      variants={staggerChildren(0.08, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block origin-left will-change-transform ${lineClassName ?? ""}`}
            variants={maskLine}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
