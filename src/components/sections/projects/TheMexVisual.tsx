"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

const COLUMNS = [
  {
    name: "NEW",
    tickets: [
      { id: "#1042", meta: "2 items · paid", live: true },
      { id: "#1043", meta: "1 item · paid", live: true },
    ],
  },
  {
    name: "IN PREP",
    tickets: [
      { id: "#1040", meta: "4 items", live: false },
      { id: "#1041", meta: "3 items", live: false },
    ],
  },
  {
    name: "READY",
    tickets: [{ id: "#1038", meta: "handed off", live: false }],
  },
] as const;

/**
 * The MEX hero visual — the kitchen order board the WebSocket layer drives:
 * paid orders land in NEW the instant Stripe confirms, no polling anywhere.
 */
export default function TheMexVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full overflow-hidden rounded-xl border hairline bg-raised">
        {/* board chrome */}
        <div className="flex items-center justify-between border-b hairline px-4 py-3">
          <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ink">
            THE MEX — ORDERS
          </span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative size-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[8px] tracking-[0.16em] text-ink-40">
              WS LIVE
            </span>
          </span>
        </div>

        {/* columns */}
        <div className="grid grid-cols-3">
          {COLUMNS.map((col, c) => (
            <div
              key={col.name}
              className="border-r hairline p-3 last:border-r-0 sm:p-4"
            >
              <p className="font-mono text-[8px] tracking-[0.2em] text-ink-40">
                {col.name}
              </p>
              <div className="mt-3 space-y-2">
                {col.tickets.map((t, i) => (
                  <motion.div
                    key={t.id}
                    className={`rounded-lg border px-2.5 py-2 sm:px-3 ${
                      t.live
                        ? "border-accent/25 bg-accent/[0.04]"
                        : "hairline bg-white/[0.03]"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{
                      duration: 0.6,
                      ease: EASE_OUT_EXPO,
                      delay: 0.25 + c * 0.12 + i * 0.08,
                    }}
                  >
                    <p className="flex items-center justify-between font-mono text-[10px] text-ink">
                      {t.id}
                      {t.live && (
                        <span className="size-1 rounded-full bg-accent" />
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] tracking-[0.08em] text-ink-40">
                      {t.meta}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* confirmation strip */}
        <div className="flex items-baseline justify-between border-t hairline px-4 py-3">
          <span className="font-mono text-[8px] tracking-[0.16em] text-ink-40">
            ORDER CONFIRMATION
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em]">
            <span className="text-ink-25 line-through">polling</span>
            <span className="mx-2 text-ink-25">→</span>
            <span className="text-accent">push · 60% faster</span>
          </span>
        </div>
      </div>
    </div>
  );
}
