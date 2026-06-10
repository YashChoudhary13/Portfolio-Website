"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/shared/Magnetic";
import { identity } from "@/lib/content";

const istTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

/** Footer meta row — hairline, mono, live IST clock, back-to-top. */
export default function Footer() {
  const lenis = useLenis();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(istTime());
    const id = setInterval(() => setTime(istTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t hairline">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-40">
        <span>© 2026 {identity.name}</span>
        <span className="tabular-nums">
          {identity.location} — {time ?? "--:--:--"} IST
        </span>
        <span className="hidden sm:inline">Built with Next.js + Three.js</span>
        <Magnetic strength={6}>
          <button
            type="button"
            onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
            className="flex items-center gap-2 text-ink-65 transition-colors duration-300 hover:text-ink"
          >
            Top <span className="text-accent">↑</span>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
