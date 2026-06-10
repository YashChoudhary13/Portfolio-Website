"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

const MODELS = [
  { label: "EFFICIENTNET-B0", score: 0.82 },
  { label: "RESNET-50", score: 0.74 },
  { label: "XCEPTION", score: 0.9 },
  { label: "MOBILENET-V2", score: 0.66 },
  { label: "CUSTOM CNN", score: 0.87 },
] as const;

const TILE_TONES = [
  0.05, 0.08, 0.04,
  0.07, 0.1, 0.05,
  0.04, 0.06, 0.09,
] as const;

/**
 * DeepVerify hero visual — a detection console: image grid under an accent
 * scanline, five ensemble members voting, verdict line below.
 */
export default function DeepVerifyVisual() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      role="img"
      aria-label="DeepVerify detection console"
    >
      {/* ---- tile grid being scanned ---- */}
      <g>
        {TILE_TONES.map((tone, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const flagged = i === 4;
          return (
            <rect
              key={i}
              x={56 + col * 122}
              y={96 + row * 122}
              width={108}
              height={108}
              rx={10}
              fill={`rgba(255,255,255,${tone})`}
              stroke={flagged ? "rgba(102,240,194,0.55)" : "rgba(255,255,255,0.08)"}
            />
          );
        })}

        {/* scanline sweep */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: [0, 330, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x={48} y={96} width={382} height={36} fill="url(#dv-scan)" />
          <rect x={48} y={130} width={382} height={1.5} fill="rgba(102,240,194,0.7)" />
        </motion.g>
      </g>

      {/* ---- ensemble votes ---- */}
      <g style={{ fontFamily: "var(--font-plex-mono)" }}>
        <text x={488} y={108} fill="rgba(255,255,255,0.4)" fontSize={11} letterSpacing={2.2}>
          ENSEMBLE — 5 MODELS
        </text>
        {MODELS.map((m, i) => {
          const y = 140 + i * 56;
          return (
            <g key={m.label}>
              <text x={488} y={y} fill="rgba(255,255,255,0.65)" fontSize={11} letterSpacing={1.6}>
                {m.label}
              </text>
              <rect x={488} y={y + 12} width={256} height={3} rx={1.5} fill="rgba(255,255,255,0.08)" />
              <motion.rect
                x={488}
                y={y + 12}
                width={256 * m.score}
                height={3}
                rx={1.5}
                fill={i === 2 ? "rgba(102,240,194,0.9)" : "rgba(255,255,255,0.45)"}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.1 }}
                style={{ transformBox: "fill-box", transformOrigin: "left center" }}
              />
              <text x={760} y={y + 16} fill="rgba(255,255,255,0.4)" fontSize={10} textAnchor="end">
                {m.score.toFixed(2)}
              </text>
            </g>
          );
        })}
      </g>

      {/* ---- verdict ---- */}
      <g>
        <line x1={56} y1={488} x2={744} y2={488} stroke="rgba(255,255,255,0.08)" />
        <text
          x={56}
          y={524}
          fill="rgba(255,255,255,0.4)"
          fontSize={11}
          letterSpacing={2.2}
          style={{ fontFamily: "var(--font-plex-mono)" }}
        >
          VERDICT
        </text>
        <text
          x={56}
          y={556}
          fill="#ffffff"
          fontSize={26}
          fontWeight={700}
          letterSpacing={-0.5}
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          SYNTHETIC — 96.8% CONFIDENCE
        </text>
        <text
          x={744}
          y={556}
          fill="rgba(102,240,194,0.9)"
          fontSize={12}
          textAnchor="end"
          letterSpacing={1.6}
          style={{ fontFamily: "var(--font-plex-mono)" }}
        >
          1.8s
        </text>
      </g>

      <defs>
        <linearGradient id="dv-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(102,240,194,0)" />
          <stop offset="100%" stopColor="rgba(102,240,194,0.12)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
