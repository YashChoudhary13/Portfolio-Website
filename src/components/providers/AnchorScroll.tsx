"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { consumePendingAnchor } from "@/lib/anchor";

/**
 * Homepage-only: performs the deferred section scroll after a cross-route
 * nav click ("/projects → About"), and honors direct deep links ("/#about").
 * Runs once the homepage is mounted and Lenis exists, after two frames so
 * layout has settled — the seam the old timeout-based approach raced over.
 */
export default function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const target =
      consumePendingAnchor() ??
      (window.location.hash.length > 1 ? window.location.hash : null);
    if (!target) return;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        lenis.resize();
        lenis.scrollTo(target, { offset: -96, duration: 1.2 });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [lenis]);

  return null;
}
