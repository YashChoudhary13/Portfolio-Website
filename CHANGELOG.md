# CHANGELOG

All notable changes to this project. Newest first.

## 2026-06-11 — Phase 0 deliverables + Milestones 0–8 code-complete

- docs/DESIGN_ANALYSIS.md: all five analysis deliverables (design analysis,
  section breakdown, implementation plan, asset list, milestone plan) +
  verification queue for recording/live-site checks (deferred: tooling outage)
- M0: globals.css token system; lib/motion.ts (two motion families);
  lib/content.ts (all copy ← CONTENT_MAP); SmoothScroll (Lenis + GSAP ticker,
  context); Nav (glass pill, hide-on-down/show-on-up, magnetic links, mobile
  overlay); Grain (SVG turbulence overlay); layout.tsx (Archivo var +
  IBM Plex Mono via next/font); icon.svg
- M1: Hero — mask-line display reveals, scrub exit parallax, scroll cue;
  HeroCards — spring tilt ±8/10°, cursor sheen, counter-tilt shadow,
  desynced idle float, translateZ layering
- M2: Metrics — hairline ledger, CountUp (rolls once in view), accent
  underline hover
- M3 ★: Knob — lathe-profiled aluminum, procedural concentric-brush
  roughness + RG-encoded tangential anisotropy maps, Lightformer studio,
  cursor-tracked key light, 72 instanced grip ridges, accent index dot;
  input: click = +90° detent, drag = free rotation + momentum snap,
  arrow-key support, ARIA slider; AnimatePresence state panel; ssr:false
  dynamic chunk, frameloop gated by viewport
- M4: Projects — alternating editorial case studies; DeepVerify SVG
  detection console (scanline, ensemble vote bars, verdict); REVO browser
  mock (injected panel, 10:00→0:30 collapse)
- M5: Architecture — SVG node diagram, scroll-scrubbed path drawing, SMIL
  data pulses, flow captions, mobile vertical fallback
- M6: Experience — scroll-grown accent spine, dot nodes w/ CURRENT ping,
  editorial entries
- M7: About — 38vw outlined "Y." watermark w/ parallax, editorial split,
  credentials row
- M8: Contact + Footer — display-xl CTA, magnetic email pill, slide-swap
  socials, live IST clock, back-to-top
- Self-review fixes: Reveal delay via variant custom (transition-precedence
  bug), motion.create memoization, hooks-in-map → FlowPath
- NOTE: build/visual verification + git init queued behind permission
  classifier outage; no commits possible yet this session

## 2026-06-11 — Phase 0 start

- Parsed resume → `docs/CONTENT_MAP.md` (identity, metrics, case studies, timeline — all site copy traces here)
- Installed full stack: next@15.5, react@19.2, framer-motion@12.40, gsap@3.15, lenis@1.3, three@0.184, @react-three/fiber@9.6, @react-three/drei@10.7, tailwindcss@4 (+postcss), typescript
- Wrote configs: `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`
- Wrote `src/app/globals.css` first-draft design tokens (base #050505, ink scale, accent #66f0c2, fluid display type scale, expensive easings, lenis/glass/eyebrow utilities)
- Created persistence docs: PROJECT_STATE.md, TODO.md, CHANGELOG.md
- Received reference materials (hiartem.com recording + resume); implementation paused for full design analysis per spec
