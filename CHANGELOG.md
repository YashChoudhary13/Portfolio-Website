# CHANGELOG

All notable changes to this project. Newest first.

## 2026-06-11 — Milestone 10: Projects expansion (/projects + case studies)

- New route /projects: editorial archive index — display-type rows, status/
  live chips, cursor-trailing preview panel (project visual + key metric),
  mobile editorial media rows; no card grid
- New routes /projects/[slug] (deepverify · revo · themex), SSG via
  generateStaticParams + per-page metadata. Case-study anatomy: hero
  (display name, why-it-matters, meta grid) → live-product access (inline
  glass panel + floating pill that appears when the inline panel scrolls
  off) → interactive SystemFlow pipeline (always-running connector pulses,
  click-to-inspect stages, vertical variant on mobile) → challenge →
  solution decisions w/ explicit tradeoffs → expandable ArchStack (rail
  pulse, single-open layers) → MetricsBand (CountUp) → Gallery (crafted
  board/bars/log/json frames, scroll-drift column) → learnings → next-case
  hand-off
- src/lib/caseStudies.ts: all case-study content, serializable, traces to
  CONTENT_MAP; TheMexVisual (kitchen order board) joins the visual set
- Nav: Projects item + route-aware behavior (hash links defer through a
  navigation back to /), active-route dot, SmoothScroll Lenis reset on
  route change, opacity-only route fade (template.tsx), SlideSwapLink
  internal-href support via next/link
- Homepage workflow section (S5 Architecture) made explorable: nodes are
  buttons (mouse + keyboard); selecting one lights its data paths, dims the
  rest, and opens an internals panel (flow chips + facts) — same visual
  language, deeper interaction; mobile list expands inline
- Homepage case studies now link into /projects/[slug] (frame + footer +
  "Case study →" link)

- Visual QA loop via dev-browser (scripts/qa-*.js): all sections verified
  at 1440×900 and 390×844, knob detent interaction verified by click test
- Knob rendering root-caused and fixed: lathe normals broke env reflection
  → primitives rebuild (cylinder cap + rings); procedural equirect studio
  as scene.environment; radial UV-space anisotropyMap → starburst; physical
  light units; exposure tuned (envMapIntensity 0.8, key 22cd +30 hover)
- Fixes from QA: TickRing SSR float-drift hydration mismatch (rounded
  coords), About 12ch-container collapse, hero subline orphan, mobile
  sticker/headline collision, missing *.css TS declaration
- Added opengraph-image.tsx (1200×630), metadataBase (env-derived), favicon
- Lighthouse (prod, headless chromium): Perf 90 · A11y 95 · BP 100 ·
  SEO 100 · CLS 0 · TBT 140ms · LCP 3.3s (throttled lab)
- Commits: 74253e0 → 63e8f99 → 6c64a83 → (this)

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
