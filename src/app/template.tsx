"use client";

import { motion } from "framer-motion";
import { EASE_OUT_QUART } from "@/lib/motion";

/**
 * Route transition: a quiet opacity-only fade on every navigation.
 * Opacity (not transform) on purpose — fixed-position children
 * (LivePanel, nav) must keep the viewport as their containing block.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE_OUT_QUART }}
    >
      {children}
    </motion.div>
  );
}
