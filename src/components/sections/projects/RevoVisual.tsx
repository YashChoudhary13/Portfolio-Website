"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

const FILES = [
  "src/",
  "manifest.json",
  "vite.config.ts",
  "content-script.tsx",
  "background.ts",
  "package.json",
] as const;

const STATS = [
  { label: "API calls", value: "−70%" },
  { label: "Cache hits", value: "94%" },
  { label: "Export", value: "JSON" },
] as const;

/**
 * REVO hero visual — a GitHub page with the extension's analysis panel
 * injected on the right; ten minutes of repo reading collapsed to thirty
 * seconds.
 */
export default function RevoVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full overflow-hidden rounded-xl border hairline bg-[#0a0b0c]">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b hairline px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
          </span>
          <span className="flex-1 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-ink-40">
            github.com/yashchoudhary13/REVO
          </span>
        </div>

        <div className="grid grid-cols-5">
          {/* repo file list */}
          <div className="col-span-3 border-r hairline">
            {FILES.map((file, i) => (
              <div
                key={file}
                className="flex items-center justify-between border-b hairline px-4 py-2.5 last:border-b-0"
              >
                <span className="font-mono text-[10px] tracking-[0.06em] text-ink-40">
                  {file}
                </span>
                <span className="h-px w-10 bg-white/10" />
              </div>
            ))}
          </div>

          {/* injected panel */}
          <div className="col-span-2 border-l border-accent/30 bg-white/[0.02] p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ink">
                REVO
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-accent" />
                <span className="font-mono text-[8px] tracking-[0.16em] text-ink-40">
                  DONE
                </span>
              </span>
            </div>

            {/* analysis progress */}
            <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full rounded-full bg-accent/80"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.4 }}
                style={{ originX: 0 }}
              />
            </div>

            <div className="mt-4 space-y-2.5">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-baseline justify-between"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.6 + i * 0.1 }}
                >
                  <span className="font-mono text-[9px] tracking-[0.12em] text-ink-40">
                    {stat.label}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-ink">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* time collapse */}
            <div className="mt-5 border-t hairline pt-4">
              <span className="font-mono text-[9px] tracking-[0.16em] text-ink-25 line-through">
                10:00
              </span>
              <p className="text-display mt-1 text-3xl text-ink">0:30</p>
              <span className="font-mono text-[8px] tracking-[0.16em] text-ink-40">
                FULL REPO ANALYSIS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
