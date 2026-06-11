"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ArchLayer } from "@/lib/caseStudies";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The architecture as a vertical stack you can open. A data pulse runs the
 * rail top to bottom — the direction everything in the system flows —
 * and each layer expands to show what actually lives inside it.
 */
export default function ArchStack({ layers }: { layers: readonly ArchLayer[] }) {
  const [open, setOpen] = useState<string | null>(layers[0]?.id ?? null);
  const reduced = useReducedMotion();

  return (
    <div className="relative pl-8 lg:pl-12">
      {/* rail + traveling pulse */}
      <span aria-hidden className="absolute inset-y-2 left-[7px] w-px bg-hairline" />
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute left-[5px] size-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(102,240,194,0.8)]"
          animate={{ top: ["1%", "97%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3.6,
            times: [0, 0.12, 0.88, 1],
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.8,
          }}
        />
      )}

      {layers.map((layer, i) => {
        const isOpen = open === layer.id;
        return (
          <div key={layer.id} className="relative border-b hairline last:border-b-0">
            {/* rail node */}
            <span
              aria-hidden
              className="absolute -left-[29px] top-[2.05rem] flex size-[15px] items-center justify-center rounded-full border hairline bg-base lg:-left-[45px]"
            >
              <span
                className={`size-[5px] rounded-full transition-colors duration-500 ${
                  isOpen ? "bg-accent" : "bg-white/30"
                }`}
              />
            </span>

            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : layer.id)}
              aria-expanded={isOpen}
              aria-controls={`archstack-${layer.id}`}
              className="group grid w-full grid-cols-12 items-baseline gap-x-4 py-6 text-left"
            >
              <span className="col-span-1 font-mono text-[10px] tracking-[0.2em] text-ink-25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`col-span-7 text-xl font-semibold tracking-tight transition-colors duration-500 sm:col-span-5 lg:text-2xl ${
                  isOpen ? "text-ink" : "text-ink-65 group-hover:text-ink"
                }`}
              >
                {layer.name}
              </span>
              <span className="col-span-3 hidden font-mono text-[10px] tracking-[0.16em] text-ink-40 sm:block lg:col-span-5">
                {layer.tech}
              </span>
              <span className="col-span-4 flex justify-end sm:col-span-3 lg:col-span-1">
                <motion.span
                  aria-hidden
                  className={`relative block size-4 transition-colors duration-500 ${
                    isOpen ? "text-accent" : "text-ink-40 group-hover:text-ink"
                  }`}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                </motion.span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`archstack-${layer.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pr-2">
                    <p className="max-w-[36rem] text-[15px] leading-relaxed text-ink-65">
                      {layer.body}
                    </p>
                    <motion.div
                      className="mt-5 grid gap-3 sm:grid-cols-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: { staggerChildren: 0.06, delayChildren: 0.15 },
                        },
                      }}
                    >
                      {layer.items.map((item) => (
                        <motion.div
                          key={item.label}
                          variants={{
                            hidden: { opacity: 0, y: 12 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5, ease: EASE_OUT_EXPO },
                            },
                          }}
                          className="rounded-xl border hairline bg-white/[0.02] p-4 transition-colors duration-500 hover:bg-white/[0.04]"
                        >
                          <p className="text-sm font-medium tracking-tight text-ink">
                            {item.label}
                          </p>
                          <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-40">
                            {item.note}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
